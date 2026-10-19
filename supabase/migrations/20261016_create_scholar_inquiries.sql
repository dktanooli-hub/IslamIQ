-- =============================================================================
-- Migration: 20261016_create_scholar_inquiries.sql
-- Description: Create public.scholar_inquiries, public.scholar_inquiry_rate_limits,
--              and zero-trust RPC functions for IslamIQ Ask a Scholar feature
--              (Offline Scholar Liaison Architecture)
-- Compatibility: Supabase PostgreSQL (Postgres 15+)
-- Security Controls:
--   1. Zero-trust direct table access: Direct public and anon SELECT/INSERT/UPDATE/DELETE is blocked.
--   2. Direct client UPDATE and DELETE are blocked. All workflow transitions and answer entry
--      MUST pass through public.admin_update_scholar_inquiry() RPC.
--   3. Direct client DELETE is completely revoked to maintain audit trails and status tracking.
--   4. Submissions strictly funneled through public.submit_scholar_inquiry() RPC.
--   5. High-entropy access tokens stored only as SHA-256 cryptographic hashes.
--   6. Anonymous seeker lookup strictly filtered through public.get_scholar_inquiry() RPC.
--   7. Administrative access (review, edit, dispatch, publish) strictly gated via public.is_admin().
--   8. Answers hidden from seekers until explicitly marked as 'answered'.
--   9. Internal admin notes NEVER exposed to public or seekers under any condition.
--  10. Concurrency-safe server-enforced rate limiting using PostgreSQL transaction advisory locks.
--  11. Database-level CHECK constraints prevent publishing empty answers or reasons.
--  12. Explicit state transition matrix prevents invalid lifecycle jumps.
-- =============================================================================

-- Ensure cryptographic extensions are enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. SCHOLAR INQUIRIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.scholar_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_number TEXT UNIQUE NOT NULL,
    access_token_hash TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    madhhab_preference TEXT NOT NULL DEFAULT 'General',
    subject TEXT NOT NULL,
    question_text TEXT NOT NULL,
    seeker_name TEXT DEFAULT 'Anonymous Seeker',
    seeker_email TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Workflow Statuses:
    -- 'pending_review'   : Initial submission, awaiting admin triage & sanitization
    -- 'sent_to_scholar'  : Sanitized slip printed/taken physically to offline scholar
    -- 'answer_received'  : Scholar's written answer transcribed into admin draft
    -- 'answered'         : Admin approved and published privately to seeker
    -- 'rejected'         : Deemed out of scope / inappropriate / closed
    status TEXT NOT NULL DEFAULT 'pending_review' 
        CONSTRAINT chk_scholar_inquiry_status 
        CHECK (status IN ('pending_review', 'sent_to_scholar', 'answer_received', 'answered', 'rejected')),
    
    -- Scholarly Attribution & Fatwa
    scholar_name TEXT,
    scholar_qualification TEXT,
    answer_text TEXT,
    answer_arabic TEXT,
    reference TEXT,
    
    -- Confidential Administration
    admin_notes TEXT,
    rejection_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    sent_to_scholar_at TIMESTAMPTZ,
    answered_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),

    -- Taxonomy & Structural Constraints (Preserves Urdu/Arabic Unicode)
    CONSTRAINT chk_inquiry_category CHECK (
        category IN ('General', 'Pillars', 'Quran', 'Hadith', 'Salah', 'Taharah', 'Sawm', 'Zakat', 'Hajj', 'Family', 'Halal', 'Manners', 'Aqeedah', 'Masail')
    ),
    CONSTRAINT chk_inquiry_madhhab CHECK (
        madhhab_preference IN ('General', 'Hanafi', 'Shafi''i', 'Maliki', 'Hanbali')
    ),
    CONSTRAINT chk_inquiry_subject_length CHECK (
        length(btrim(subject)) >= 3 AND length(subject) <= 150
    ),
    CONSTRAINT chk_inquiry_question_length CHECK (
        length(btrim(question_text)) >= 10 AND length(question_text) <= 4000
    ),
    CONSTRAINT chk_seeker_name_length CHECK (
        seeker_name IS NULL OR (length(seeker_name) >= 2 AND length(seeker_name) <= 60)
    ),
    CONSTRAINT chk_seeker_email_length CHECK (
        seeker_email IS NULL OR (length(seeker_email) <= 100)
    ),
    CONSTRAINT chk_scholar_name_length CHECK (
        scholar_name IS NULL OR (length(btrim(scholar_name)) >= 2 AND length(scholar_name) <= 120)
    ),
    CONSTRAINT chk_scholar_qual_length CHECK (
        scholar_qualification IS NULL OR (length(scholar_qualification) <= 200)
    ),
    CONSTRAINT chk_answer_text_length CHECK (
        answer_text IS NULL OR (length(btrim(answer_text)) >= 10 AND length(answer_text) <= 12000)
    ),
    CONSTRAINT chk_answer_arabic_length CHECK (
        answer_arabic IS NULL OR (length(answer_arabic) <= 6000)
    ),
    CONSTRAINT chk_reference_length CHECK (
        reference IS NULL OR (length(reference) <= 1500)
    ),
    CONSTRAINT chk_admin_notes_length CHECK (
        admin_notes IS NULL OR (length(admin_notes) <= 3000)
    ),
    CONSTRAINT chk_rejection_reason_length CHECK (
        rejection_reason IS NULL OR (length(btrim(rejection_reason)) >= 3 AND length(rejection_reason) <= 1000)
    ),

    -- Workflow Integrity Constraints (Prevents accidental premature publishing of empty answers)
    CONSTRAINT chk_answered_integrity CHECK (
        status != 'answered' OR (
            answer_text IS NOT NULL AND length(btrim(answer_text)) >= 10
            AND scholar_name IS NOT NULL AND length(btrim(scholar_name)) >= 2
            AND answered_at IS NOT NULL
        )
    ),
    CONSTRAINT chk_rejected_integrity CHECK (
        status != 'rejected' OR (
            rejection_reason IS NOT NULL AND length(btrim(rejection_reason)) >= 3
        )
    )
);

-- =============================================================================
-- 2. SCHOLAR INQUIRY RATE LIMITS AUDIT TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.scholar_inquiry_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_or_fingerprint TEXT NOT NULL,
    action TEXT NOT NULL DEFAULT 'submit_inquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- =============================================================================
-- 3. INDEXES
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_inquiry_num ON public.scholar_inquiries(inquiry_number);
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_token_hash ON public.scholar_inquiries(access_token_hash);
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_status ON public.scholar_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_created_at ON public.scholar_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_user_id ON public.scholar_inquiries(user_id);

CREATE INDEX IF NOT EXISTS idx_scholar_rate_limits_lookup 
    ON public.scholar_inquiry_rate_limits(ip_or_fingerprint, action, created_at DESC);

-- =============================================================================
-- 4. PERMISSIONS & ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.scholar_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholar_inquiry_rate_limits ENABLE ROW LEVEL SECURITY;

-- Deny all direct table operations to PUBLIC and anon
REVOKE ALL ON public.scholar_inquiries FROM PUBLIC, anon;
REVOKE ALL ON public.scholar_inquiry_rate_limits FROM PUBLIC, anon;

-- Direct INSERT, UPDATE, and DELETE are completely blocked for all client roles
-- Submissions MUST pass through the validated submit_scholar_inquiry() RPC
-- Admin status transitions and edits MUST pass through admin_update_scholar_inquiry() RPC
-- Direct client-side DELETE is strictly revoked to preserve audit trails and status tracking
REVOKE INSERT, UPDATE, DELETE ON public.scholar_inquiries FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.scholar_inquiry_rate_limits FROM authenticated;

-- Direct SELECT permission granted only to authenticated users (evaluated by RLS below)
GRANT SELECT ON public.scholar_inquiries TO authenticated;
GRANT SELECT ON public.scholar_inquiry_rate_limits TO authenticated;

-- Drop legacy/unwanted delete policy if it exists
DROP POLICY IF EXISTS "Admin can delete scholar inquiries" ON public.scholar_inquiries;
DROP POLICY IF EXISTS "Admin can view scholar inquiries" ON public.scholar_inquiries;

-- Single Admin SELECT policy: Gated exclusively by public.is_admin()
CREATE POLICY "Admin can view scholar inquiries"
    ON public.scholar_inquiries FOR SELECT
    TO authenticated
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin view rate limits" ON public.scholar_inquiry_rate_limits;
CREATE POLICY "Admin view rate limits"
    ON public.scholar_inquiry_rate_limits FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- 5. SECURE SUBMISSION RPC: public.submit_scholar_inquiry(...)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.submit_scholar_inquiry(
    p_subject TEXT,
    p_question_text TEXT,
    p_category TEXT DEFAULT 'General',
    p_madhhab_preference TEXT DEFAULT 'General',
    p_seeker_name TEXT DEFAULT NULL,
    p_seeker_email TEXT DEFAULT NULL
)
RETURNS TABLE (
    inquiry_number TEXT,
    access_token TEXT,
    status TEXT,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_clean_subject TEXT;
    v_clean_question TEXT;
    v_clean_category TEXT;
    v_clean_madhhab TEXT;
    v_clean_name TEXT;
    v_clean_email TEXT;
    v_user_id UUID;
    v_inquiry_number TEXT;
    v_raw_token TEXT;
    v_token_hash TEXT;
    v_created_at TIMESTAMPTZ;
    v_recent_count INT;
    v_anon_burst_count INT;
    v_anon_recent_count INT;
    v_attempts INT := 0;
BEGIN
    -- 1. Input sanitization & trimming (Preserves Arabic & Urdu Unicode)
    v_clean_subject := btrim(COALESCE(p_subject, ''));
    v_clean_question := btrim(COALESCE(p_question_text, ''));
    v_clean_category := btrim(COALESCE(p_category, 'General'));
    v_clean_madhhab := btrim(COALESCE(p_madhhab_preference, 'General'));
    v_clean_name := btrim(COALESCE(p_seeker_name, ''));
    v_clean_email := lower(btrim(COALESCE(p_seeker_email, '')));

    -- 2. Strict Unicode character length validations
    IF length(v_clean_subject) < 3 OR length(v_clean_subject) > 150 THEN
        RAISE EXCEPTION 'Inquiry subject must be between 3 and 150 characters.';
    END IF;

    IF length(v_clean_question) < 10 OR length(v_clean_question) > 4000 THEN
        RAISE EXCEPTION 'Question details must be between 10 and 4000 characters.';
    END IF;

    -- Normalize & validate Madhhab preference
    IF v_clean_madhhab ILIKE 'hanafi' THEN
        v_clean_madhhab := 'Hanafi';
    ELSIF v_clean_madhhab ILIKE 'shafi%' THEN
        v_clean_madhhab := 'Shafi''i';
    ELSIF v_clean_madhhab ILIKE 'maliki' THEN
        v_clean_madhhab := 'Maliki';
    ELSIF v_clean_madhhab ILIKE 'hanbali' THEN
        v_clean_madhhab := 'Hanbali';
    ELSE
        v_clean_madhhab := 'General';
    END IF;

    -- Normalize & validate Category
    IF v_clean_category ILIKE 'pillars' THEN
        v_clean_category := 'Pillars';
    ELSIF v_clean_category ILIKE 'quran' THEN
        v_clean_category := 'Quran';
    ELSIF v_clean_category ILIKE 'hadith' THEN
        v_clean_category := 'Hadith';
    ELSIF v_clean_category ILIKE 'salah' THEN
        v_clean_category := 'Salah';
    ELSIF v_clean_category ILIKE 'taharah' THEN
        v_clean_category := 'Taharah';
    ELSIF v_clean_category ILIKE 'sawm' OR v_clean_category ILIKE 'fasting' THEN
        v_clean_category := 'Sawm';
    ELSIF v_clean_category ILIKE 'zakat' THEN
        v_clean_category := 'Zakat';
    ELSIF v_clean_category ILIKE 'hajj' THEN
        v_clean_category := 'Hajj';
    ELSIF v_clean_category ILIKE 'family' THEN
        v_clean_category := 'Family';
    ELSIF v_clean_category ILIKE 'halal' THEN
        v_clean_category := 'Halal';
    ELSIF v_clean_category ILIKE 'manners' THEN
        v_clean_category := 'Manners';
    ELSIF v_clean_category ILIKE 'aqeedah' THEN
        v_clean_category := 'Aqeedah';
    ELSIF v_clean_category ILIKE 'masail' THEN
        v_clean_category := 'Masail';
    ELSE
        v_clean_category := 'General';
    END IF;

    -- Seeker Name formatting
    IF v_clean_name = '' THEN
        v_clean_name := 'Anonymous Seeker';
    ELSE
        v_clean_name := substring(v_clean_name from 1 for 60);
    END IF;

    -- Seeker Email formatting (optional)
    IF v_clean_email = '' THEN
        v_clean_email := NULL;
    ELSE
        IF length(v_clean_email) > 100 OR v_clean_email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
            RAISE EXCEPTION 'Invalid email address format.';
        END IF;
    END IF;

    -- 3. Concurrency-Safe Server-Side Rate Limiting & Anti-Flood Controls
    -- Primary enforcement: in-engine advisory locks & indexed window queries on public.scholar_inquiries.
    v_user_id := auth.uid();
    IF v_user_id IS NOT NULL THEN
        -- Concurrency-Safe Per-User Lock: Serialize submissions per authenticated user ID
        PERFORM pg_advisory_xact_lock(hashtext(v_user_id::TEXT));

        -- Authenticated user velocity limit: Max 5 submissions in 5 minutes
        SELECT count(*) INTO v_recent_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id = v_user_id
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '5 minutes');
        IF v_recent_count >= 5 THEN
            RAISE EXCEPTION 'Rate limit exceeded: Please wait a few minutes before submitting another inquiry.';
        END IF;
    ELSE
        -- Concurrency-Safe Global Anonymous Lock:
        -- Key 8941720 is a unique deterministic lock key for anonymous scholar inquiries.
        -- Serializes the count and insert atomically across concurrent database connections,
        -- preventing race conditions from exceeding the global anonymous thresholds.
        PERFORM pg_advisory_xact_lock(8941720);

        -- Anonymous guest velocity limits:
        -- Burst protection: max 5 anonymous submissions per minute globally
        SELECT count(*) INTO v_anon_burst_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id IS NULL
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '1 minute');
        IF v_anon_burst_count >= 5 THEN
            RAISE EXCEPTION 'System busy: Anonymous inquiry burst limit reached (max 5 per minute). Please wait a minute before retrying.';
        END IF;

        -- Sustained protection: max 25 anonymous submissions per 10 minutes globally
        SELECT count(*) INTO v_anon_recent_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id IS NULL
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '10 minutes');
        IF v_anon_recent_count >= 25 THEN
            RAISE EXCEPTION 'System busy: Anonymous inquiry capacity reached (max 25 per 10 minutes). Please try again shortly.';
        END IF;
    END IF;

    -- Content-level deduplication: Reject rapid resubmission of identical question text
    SELECT count(*) INTO v_recent_count
    FROM public.scholar_inquiries
    WHERE public.scholar_inquiries.question_text = v_clean_question
      AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '15 minutes');
    IF v_recent_count > 0 THEN
        RAISE EXCEPTION 'Duplicate inquiry detected: This question was recently submitted and is currently under review.';
    END IF;

    -- 4. Generate unique human-readable tracking ID (e.g. IQ-2026-X8K9M2)
    LOOP
        v_attempts := v_attempts + 1;
        v_inquiry_number := 'IQ-' || to_char(pg_catalog.now(), 'YYYY') || '-' || upper(substring(encode(extensions.gen_random_bytes(4), 'hex') from 1 for 6));
        
        EXIT WHEN NOT EXISTS (
            SELECT 1 FROM public.scholar_inquiries WHERE public.scholar_inquiries.inquiry_number = v_inquiry_number
        );

        IF v_attempts > 10 THEN
            RAISE EXCEPTION 'System busy: Unable to allocate a unique inquiry number. Please retry in a moment.';
        END IF;
    END LOOP;

    -- 5. Generate high-entropy access token (48 hex chars = 192 bits of cryptographic entropy)
    v_raw_token := 'iq_sec_' || encode(extensions.gen_random_bytes(24), 'hex');
    -- Compute SHA-256 hash
    v_token_hash := encode(extensions.digest(v_raw_token, 'sha256'), 'hex');
    v_created_at := pg_catalog.now();

    -- 6. Insert record into public.scholar_inquiries
    INSERT INTO public.scholar_inquiries (
        inquiry_number,
        access_token_hash,
        category,
        madhhab_preference,
        subject,
        question_text,
        seeker_name,
        seeker_email,
        user_id,
        status,
        created_at,
        updated_at
    ) VALUES (
        v_inquiry_number,
        v_token_hash,
        v_clean_category,
        v_clean_madhhab,
        v_clean_subject,
        v_clean_question,
        v_clean_name,
        v_clean_email,
        v_user_id,
        'pending_review',
        v_created_at,
        v_created_at
    );

    -- 7. Audit log in rate limits table
    INSERT INTO public.scholar_inquiry_rate_limits (
        ip_or_fingerprint,
        action,
        created_at
    ) VALUES (
        COALESCE(v_user_id::TEXT, 'anonymous_guest'),
        'submit_inquiry',
        v_created_at
    );

    -- 8. Return safe credentials (raw token is displayed ONLY once here)
    inquiry_number := v_inquiry_number;
    access_token := v_raw_token;
    status := 'pending_review'::TEXT;
    created_at := v_created_at;
    RETURN NEXT;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_scholar_inquiry(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_scholar_inquiry(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

-- =============================================================================
-- 6. SECURE LOOKUP RPC: public.get_scholar_inquiry(...)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.get_scholar_inquiry(
    p_inquiry_number TEXT,
    p_access_token TEXT
)
RETURNS TABLE (
    inquiry_number TEXT,
    category TEXT,
    madhhab_preference TEXT,
    subject TEXT,
    question_text TEXT,
    status TEXT,
    scholar_name TEXT,
    scholar_qualification TEXT,
    answer_text TEXT,
    answer_arabic TEXT,
    reference TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ,
    sent_to_scholar_at TIMESTAMPTZ,
    answered_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_clean_inquiry_num TEXT;
    v_clean_token TEXT;
    v_token_hash TEXT;
    v_row public.scholar_inquiries%ROWTYPE;
BEGIN
    -- 1. Input trimming & validation
    v_clean_inquiry_num := upper(btrim(COALESCE(p_inquiry_number, '')));
    v_clean_token := btrim(COALESCE(p_access_token, ''));

    IF v_clean_inquiry_num = '' OR v_clean_token = '' THEN
        RETURN;
    END IF;

    -- 2. Compute SHA-256 hash of provided access token
    v_token_hash := encode(extensions.digest(v_clean_token, 'sha256'), 'hex');

    -- 3. Exact matching lookup (Column qualified to eliminate output parameter ambiguity)
    SELECT * INTO v_row
    FROM public.scholar_inquiries
    WHERE public.scholar_inquiries.inquiry_number = v_clean_inquiry_num
      AND public.scholar_inquiries.access_token_hash = v_token_hash;

    IF NOT FOUND THEN
        RETURN;
    END IF;

    -- 4. Leak-proof projection
    inquiry_number := v_row.inquiry_number;
    category := v_row.category;
    madhhab_preference := v_row.madhhab_preference;
    subject := v_row.subject;
    question_text := v_row.question_text;
    status := v_row.status;
    created_at := v_row.created_at;
    sent_to_scholar_at := v_row.sent_to_scholar_at;

    IF v_row.status = 'answered' THEN
        scholar_name := v_row.scholar_name;
        scholar_qualification := v_row.scholar_qualification;
        answer_text := v_row.answer_text;
        answer_arabic := v_row.answer_arabic;
        reference := v_row.reference;
        rejection_reason := NULL;
        answered_at := v_row.answered_at;
        RETURN NEXT;
    ELSIF v_row.status = 'rejected' THEN
        scholar_name := NULL;
        scholar_qualification := NULL;
        answer_text := NULL;
        answer_arabic := NULL;
        reference := NULL;
        rejection_reason := v_row.rejection_reason;
        answered_at := v_row.answered_at;
        RETURN NEXT;
    ELSE
        -- Status is 'pending_review', 'sent_to_scholar', or 'answer_received' (draft)
        -- Scholarly answer, notes, and unapproved drafts MUST REMAIN HIDDEN from seeker
        scholar_name := NULL;
        scholar_qualification := NULL;
        answer_text := NULL;
        answer_arabic := NULL;
        reference := NULL;
        rejection_reason := NULL;
        answered_at := NULL;
        RETURN NEXT;
    END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.get_scholar_inquiry(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_scholar_inquiry(TEXT, TEXT) TO anon, authenticated;

-- =============================================================================
-- 7. SECURE ADMIN TRANSITION RPC: public.admin_update_scholar_inquiry(...)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.admin_update_scholar_inquiry(
    p_id UUID,
    p_status TEXT DEFAULT NULL,
    p_scholar_name TEXT DEFAULT NULL,
    p_scholar_qualification TEXT DEFAULT NULL,
    p_answer_text TEXT DEFAULT NULL,
    p_answer_arabic TEXT DEFAULT NULL,
    p_reference TEXT DEFAULT NULL,
    p_admin_notes TEXT DEFAULT NULL,
    p_rejection_reason TEXT DEFAULT NULL
)
RETURNS public.scholar_inquiries
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_row public.scholar_inquiries%ROWTYPE;
    v_clean_status TEXT;
    v_target_answer_text TEXT;
    v_target_scholar_name TEXT;
    v_target_rejection_reason TEXT;
    v_sent_at TIMESTAMPTZ;
    v_answered_at TIMESTAMPTZ;
BEGIN
    -- 1. Strict admin authorization check
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied: Administrator privileges required.' USING ERRCODE = '42501';
    END IF;

    -- 2. Fetch existing inquiry
    SELECT * INTO v_row
    FROM public.scholar_inquiries
    WHERE public.scholar_inquiries.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Inquiry not found with ID %', p_id;
    END IF;

    -- 3. Validate target status (preserves existing status if NULL passed)
    v_clean_status := btrim(COALESCE(p_status, v_row.status));
    IF v_clean_status NOT IN ('pending_review', 'sent_to_scholar', 'answer_received', 'answered', 'rejected') THEN
        RAISE EXCEPTION 'Invalid inquiry status: %', v_clean_status;
    END IF;

    -- 4. Enforce explicit status transition matrix
    -- Prevents invalid jumps while preserving valid offline liaison workflow steps.
    IF v_clean_status != v_row.status THEN
        IF v_row.status = 'pending_review' THEN
            IF v_clean_status NOT IN ('sent_to_scholar', 'rejected') THEN
                RAISE EXCEPTION 'Invalid status transition: Inquiry in pending_review can only transition to sent_to_scholar or rejected (attempted: %)', v_clean_status;
            END IF;
        ELSIF v_row.status = 'sent_to_scholar' THEN
            IF v_clean_status NOT IN ('answer_received', 'pending_review', 'rejected') THEN
                RAISE EXCEPTION 'Invalid status transition: Inquiry sent_to_scholar can only transition to answer_received, pending_review, or rejected (attempted: %)', v_clean_status;
            END IF;
        ELSIF v_row.status = 'answer_received' THEN
            IF v_clean_status NOT IN ('answered', 'sent_to_scholar', 'rejected') THEN
                RAISE EXCEPTION 'Invalid status transition: Inquiry in answer_received can only transition to answered, sent_to_scholar, or rejected (attempted: %)', v_clean_status;
            END IF;
        ELSIF v_row.status = 'answered' THEN
            IF v_clean_status NOT IN ('answer_received') THEN
                RAISE EXCEPTION 'Invalid status transition: Published inquiry can only be unpublished to answer_received for revisions (attempted: %)', v_clean_status;
            END IF;
        ELSIF v_row.status = 'rejected' THEN
            IF v_clean_status NOT IN ('pending_review') THEN
                RAISE EXCEPTION 'Invalid status transition: Rejected inquiry can only be reopened to pending_review (attempted: %)', v_clean_status;
            END IF;
        END IF;
    END IF;

    -- 5. Compute target fields for validation & optional field resolution:
    -- Rules:
    -- - Parameter IS NULL: Retain existing database column value (parameter omitted).
    -- - Parameter IS NOT NULL and btrim is empty string: Intentionally clear optional field to NULL.
    -- - Parameter IS NOT NULL and non-empty: Update to trimmed value.
    v_target_scholar_name := CASE
        WHEN p_scholar_name IS NULL THEN v_row.scholar_name
        WHEN btrim(p_scholar_name) = '' THEN NULL
        ELSE btrim(p_scholar_name)
    END;

    v_target_answer_text := CASE
        WHEN p_answer_text IS NULL THEN v_row.answer_text
        WHEN btrim(p_answer_text) = '' THEN NULL
        ELSE btrim(p_answer_text)
    END;

    v_target_rejection_reason := CASE
        WHEN p_rejection_reason IS NOT NULL AND btrim(p_rejection_reason) = '' THEN NULL
        WHEN p_rejection_reason IS NOT NULL THEN btrim(p_rejection_reason)
        WHEN v_clean_status = 'pending_review' AND v_row.status = 'rejected' THEN NULL
        ELSE v_row.rejection_reason
    END;

    -- 6. Strict validation of required fields on transition
    IF v_clean_status = 'answered' THEN
        IF v_target_answer_text IS NULL OR length(v_target_answer_text) < 10 THEN
            RAISE EXCEPTION 'A verified answer text of at least 10 characters is required to mark an inquiry as answered.';
        END IF;
        IF v_target_scholar_name IS NULL OR length(v_target_scholar_name) < 2 THEN
            RAISE EXCEPTION 'Scholar name of at least 2 characters is required to mark an inquiry as answered.';
        END IF;
    ELSIF v_clean_status = 'rejected' THEN
        IF v_target_rejection_reason IS NULL OR length(v_target_rejection_reason) < 3 THEN
            RAISE EXCEPTION 'A rejection reason of at least 3 characters is required to reject or close an inquiry.';
        END IF;
    END IF;

    -- 7. Automatically handle workflow timestamps
    v_sent_at := v_row.sent_to_scholar_at;
    IF v_clean_status = 'sent_to_scholar' AND v_sent_at IS NULL THEN
        v_sent_at := pg_catalog.now();
    END IF;

    IF v_clean_status = 'answered' THEN
        v_answered_at := COALESCE(v_row.answered_at, pg_catalog.now());
    ELSE
        v_answered_at := NULL;
    END IF;

    -- 8. Perform validated update (preserves existing field values if NULL passed, clears optional fields if '' passed)
    UPDATE public.scholar_inquiries
    SET status = v_clean_status,
        scholar_name = v_target_scholar_name,
        scholar_qualification = CASE
            WHEN p_scholar_qualification IS NULL THEN v_row.scholar_qualification
            WHEN btrim(p_scholar_qualification) = '' THEN NULL
            ELSE btrim(p_scholar_qualification)
        END,
        answer_text = v_target_answer_text,
        answer_arabic = CASE
            WHEN p_answer_arabic IS NULL THEN v_row.answer_arabic
            WHEN btrim(p_answer_arabic) = '' THEN NULL
            ELSE btrim(p_answer_arabic)
        END,
        reference = CASE
            WHEN p_reference IS NULL THEN v_row.reference
            WHEN btrim(p_reference) = '' THEN NULL
            ELSE btrim(p_reference)
        END,
        admin_notes = CASE
            WHEN p_admin_notes IS NULL THEN v_row.admin_notes
            WHEN btrim(p_admin_notes) = '' THEN NULL
            ELSE btrim(p_admin_notes)
        END,
        rejection_reason = v_target_rejection_reason,
        sent_to_scholar_at = v_sent_at,
        answered_at = v_answered_at,
        updated_at = pg_catalog.now()
    WHERE public.scholar_inquiries.id = p_id
    RETURNING * INTO v_row;

    RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_scholar_inquiry(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_scholar_inquiry(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

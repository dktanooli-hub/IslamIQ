-- =============================================================================
-- Migration: Add Privacy Choice & Public Q&A Section to Scholar Inquiries (Safely Revised)
-- File: supabase/migrations/20261026_add_scholar_inquiry_privacy_and_public_qa.sql
-- Description:
--   1. Ensures audit table public.scholar_inquiry_rate_limits exists with RLS.
--   2. Adds mutually exclusive privacy preference fields to public.scholar_inquiries:
--        - share_publicly BOOLEAN NOT NULL DEFAULT false
--        - consent_timestamp TIMESTAMPTZ
--        - published_at TIMESTAMPTZ
--      Strictly defaults all legacy and new inquiries to false (Private).
--   3. Creates partial performance index for public answered inquiries.
--   4. Safely replaces public.submit_scholar_inquiry() RPC:
--        - Preserves exact 7-parameter signature with p_share_publicly BOOLEAN DEFAULT false.
--        - DOES NOT drop the existing RPC function.
--        - Preserves concurrency-safe advisory locks, Unicode validation, rate limiting,
--          deduplication, 192-bit token hashing, and audit logging in scholar_inquiry_rate_limits.
--   5. Safely replaces public.admin_update_scholar_inquiry() RPC:
--        - DOES NOT drop the existing RPC function.
--        - Strictly enforces public.is_admin() and state transition matrix.
--        - Unpublishing or revising an answer immediately clears published_at and removes it from public results.
--        - Automatically sets published_at only if status = 'answered' AND share_publicly is true.
--   6. Creates public.get_public_answered_scholar_inquiries() RPC:
--        - Returns ONLY records where status = 'answered' AND share_publicly = true AND published_at IS NOT NULL.
--        - Excludes all sensitive seeker information (names, emails, user IDs, inquiry numbers, access token hashes, admin notes, rejection reasons).
--   7. Creates public.get_public_answered_scholar_inquiries_count() RPC:
--        - Returns the accurate total count for any category / search query even when a requested page has zero rows.
--   8. Safely replaces public.get_scholar_inquiries_answered_count() RPC:
--        - Gated with public.is_admin() so anonymous / public callers receive ONLY public answered counts.
--        - Prevents public callers from discovering the volume of private inquiries.
--   9. Establishes explicit and safe function grants.
-- =============================================================================

-- 1. Ensure Rate Limits Audit Table Exists & Is Secured
CREATE TABLE IF NOT EXISTS public.scholar_inquiry_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_or_fingerprint TEXT NOT NULL,
    action TEXT NOT NULL DEFAULT 'submit_inquiry',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

ALTER TABLE public.scholar_inquiry_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.scholar_inquiry_rate_limits FROM PUBLIC, anon;
CREATE INDEX IF NOT EXISTS idx_scholar_rate_limits_lookup 
    ON public.scholar_inquiry_rate_limits(ip_or_fingerprint, action, created_at DESC);

-- 2. Add privacy consent and publication columns (Idempotent)
ALTER TABLE public.scholar_inquiries
  ADD COLUMN IF NOT EXISTS share_publicly BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Backfill legacy records to guarantee strict private-by-default behavior
UPDATE public.scholar_inquiries
SET share_publicly = false
WHERE share_publicly IS NULL;

-- 3. Create partial performance index for public answered inquiries
CREATE INDEX IF NOT EXISTS idx_scholar_inquiries_public_answered 
  ON public.scholar_inquiries (category, published_at DESC)
  WHERE status = 'answered' AND share_publicly = true AND published_at IS NOT NULL;

-- 4. Safely Replace public.submit_scholar_inquiry
-- Drop obsolete 6-parameter signature if present from legacy schema to avoid PostgreSQL error 42725 (function not unique)
DROP FUNCTION IF EXISTS public.submit_scholar_inquiry(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);

-- Primary 7-parameter function with default for p_share_publicly (preserves existing 7-arg function without dropping)
CREATE OR REPLACE FUNCTION public.submit_scholar_inquiry(
    p_subject TEXT,
    p_question_text TEXT,
    p_category TEXT DEFAULT 'General',
    p_madhhab_preference TEXT DEFAULT 'General',
    p_seeker_name TEXT DEFAULT NULL,
    p_seeker_email TEXT DEFAULT NULL,
    p_share_publicly BOOLEAN DEFAULT false
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
    v_share_publicly BOOLEAN;
    v_consent_timestamp TIMESTAMPTZ;
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
    v_share_publicly := COALESCE(p_share_publicly, false);

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
    v_user_id := auth.uid();
    IF v_user_id IS NOT NULL THEN
        -- Concurrency-Safe Per-User Lock: Serialize submissions per authenticated user ID
        PERFORM pg_advisory_xact_lock(hashtext(v_user_id::TEXT));

        SELECT count(*) INTO v_recent_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id = v_user_id
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '5 minutes');
        IF v_recent_count >= 5 THEN
            RAISE EXCEPTION 'Rate limit exceeded: Please wait a few minutes before submitting another inquiry.';
        END IF;
    ELSE
        -- Concurrency-Safe Global Anonymous Lock (Key: 8941720)
        PERFORM pg_advisory_xact_lock(8941720);

        SELECT count(*) INTO v_anon_burst_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id IS NULL
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '1 minute');
        IF v_anon_burst_count >= 5 THEN
            RAISE EXCEPTION 'System busy: Anonymous inquiry burst limit reached (max 5 per minute). Please wait a minute before retrying.';
        END IF;

        SELECT count(*) INTO v_anon_recent_count
        FROM public.scholar_inquiries
        WHERE public.scholar_inquiries.user_id IS NULL
          AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '10 minutes');
        IF v_anon_recent_count >= 25 THEN
            RAISE EXCEPTION 'System busy: Anonymous inquiry capacity reached (max 25 per 10 minutes). Please try again shortly.';
        END IF;
    END IF;

    -- Content deduplication
    SELECT count(*) INTO v_recent_count
    FROM public.scholar_inquiries
    WHERE public.scholar_inquiries.question_text = v_clean_question
      AND public.scholar_inquiries.created_at > (pg_catalog.now() - INTERVAL '15 minutes');
    IF v_recent_count > 0 THEN
        RAISE EXCEPTION 'Duplicate inquiry detected: This question was recently submitted and is currently under review.';
    END IF;

    -- 4. Unique tracking ID (e.g. IQ-2026-X8K9M2)
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

    -- 5. High-entropy access token (48 hex chars = 192 bits of entropy)
    v_raw_token := 'iq_sec_' || encode(extensions.gen_random_bytes(24), 'hex');
    v_token_hash := encode(extensions.digest(v_raw_token, 'sha256'), 'hex');
    v_created_at := pg_catalog.now();
    v_consent_timestamp := CASE WHEN v_share_publicly THEN v_created_at ELSE NULL END;

    -- 6. Insert record with privacy settings
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
        share_publicly,
        consent_timestamp,
        published_at,
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
        v_share_publicly,
        v_consent_timestamp,
        NULL,
        'pending_review',
        v_created_at,
        v_created_at
    );

    -- 7. Audit log in rate limits table (Preserved)
    INSERT INTO public.scholar_inquiry_rate_limits (
        ip_or_fingerprint,
        action,
        created_at
    ) VALUES (
        COALESCE(v_user_id::TEXT, 'anonymous_guest'),
        'submit_inquiry',
        v_created_at
    );

    -- 8. Return safe credentials
    inquiry_number := v_inquiry_number;
    access_token := v_raw_token;
    status := 'pending_review'::TEXT;
    created_at := v_created_at;
    RETURN NEXT;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_scholar_inquiry(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_scholar_inquiry(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN) TO anon, authenticated;

-- 5. Safely Replace public.admin_update_scholar_inquiry (No DROP statement)
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
    v_published_at TIMESTAMPTZ;
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

    -- 3. Validate target status
    v_clean_status := btrim(COALESCE(p_status, v_row.status));
    IF v_clean_status NOT IN ('pending_review', 'sent_to_scholar', 'answer_received', 'answered', 'rejected') THEN
        RAISE EXCEPTION 'Invalid inquiry status: %', v_clean_status;
    END IF;

    -- 4. Enforce status transition matrix
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

    -- 5. Compute target fields
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

    -- If answer text is modified while inquiry was already answered, and the admin did not explicitly pass
    -- p_status = 'answered' to re-verify publication, automatically unpublish to 'answer_received' for safety review.
    IF v_row.status = 'answered' 
       AND p_status IS NULL 
       AND p_answer_text IS NOT NULL 
       AND btrim(p_answer_text) != btrim(COALESCE(v_row.answer_text, '')) THEN
        v_clean_status := 'answer_received';
    END IF;

    -- 6. Strict validation on transitions
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

    -- 7. Automatically handle timestamps & unpublishing/publishing rules
    v_sent_at := v_row.sent_to_scholar_at;
    IF v_clean_status = 'sent_to_scholar' AND v_sent_at IS NULL THEN
        v_sent_at := pg_catalog.now();
    END IF;

    IF v_clean_status = 'answered' THEN
        v_answered_at := COALESCE(v_row.answered_at, pg_catalog.now());
        -- Automatic Publication Rule:
        -- Only publish if seeker consented in advance to public sharing.
        -- Otherwise, keep strictly private (published_at remains NULL).
        IF v_row.share_publicly IS TRUE THEN
            v_published_at := COALESCE(v_row.published_at, v_answered_at);
        ELSE
            v_published_at := NULL;
        END IF;
    ELSE
        -- UNPUBLISHING / REVISION RULE:
        -- Any status other than 'answered' (e.g. unpublishing to 'answer_received' for revisions,
        -- rejecting, or sending to scholar) immediately removes the entry from public results.
        v_answered_at := NULL;
        v_published_at := NULL;
    END IF;

    -- 8. Perform update
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
        published_at = v_published_at,
        updated_at = pg_catalog.now()
    WHERE public.scholar_inquiries.id = p_id
    RETURNING * INTO v_row;

    RETURN v_row;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_update_scholar_inquiry(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_scholar_inquiry(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- 6. SECURE PUBLIC Q&A QUERY RPC: public.get_public_answered_scholar_inquiries(...)
CREATE OR REPLACE FUNCTION public.get_public_answered_scholar_inquiries(
    p_limit INT DEFAULT 20,
    p_offset INT DEFAULT 0,
    p_category TEXT DEFAULT NULL,
    p_search TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    category TEXT,
    madhhab_preference TEXT,
    subject TEXT,
    question_text TEXT,
    scholar_name TEXT,
    scholar_qualification TEXT,
    answer_text TEXT,
    answer_arabic TEXT,
    reference TEXT,
    answered_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    total_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_limit INT := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);
    v_offset INT := GREATEST(COALESCE(p_offset, 0), 0);
    v_clean_cat TEXT := btrim(COALESCE(p_category, ''));
    v_clean_search TEXT := btrim(COALESCE(p_search, ''));
BEGIN
    RETURN QUERY
    WITH filtered AS (
        SELECT 
            si.id,
            si.category,
            si.madhhab_preference,
            si.subject,
            si.question_text,
            si.scholar_name,
            si.scholar_qualification,
            si.answer_text,
            si.answer_arabic,
            si.reference,
            si.answered_at,
            si.published_at
        FROM public.scholar_inquiries si
        WHERE si.status = 'answered'
          AND si.share_publicly = true
          AND si.published_at IS NOT NULL
          AND (v_clean_cat = '' OR v_clean_cat = 'all' OR si.category ILIKE v_clean_cat)
          AND (
              v_clean_search = '' 
              OR si.subject ILIKE ('%' || v_clean_search || '%')
              OR si.question_text ILIKE ('%' || v_clean_search || '%')
              OR si.answer_text ILIKE ('%' || v_clean_search || '%')
          )
    ),
    counted AS (
        SELECT count(*)::BIGINT AS full_count FROM filtered
    )
    SELECT 
        f.id,
        f.category,
        f.madhhab_preference,
        f.subject,
        f.question_text,
        f.scholar_name,
        f.scholar_qualification,
        f.answer_text,
        f.answer_arabic,
        f.reference,
        f.answered_at,
        f.published_at,
        c.full_count AS total_count
    FROM filtered f
    CROSS JOIN counted c
    ORDER BY f.published_at DESC
    LIMIT v_limit
    OFFSET v_offset;
END;
$$;

REVOKE ALL ON FUNCTION public.get_public_answered_scholar_inquiries(INT, INT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_answered_scholar_inquiries(INT, INT, TEXT, TEXT) TO anon, authenticated;

-- 7. SECURE PUBLIC Q&A COUNT RPC (For Accurate Pagination Even When Page Has Zero Rows)
CREATE OR REPLACE FUNCTION public.get_public_answered_scholar_inquiries_count(
    p_category TEXT DEFAULT NULL,
    p_search TEXT DEFAULT NULL
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_clean_cat TEXT := btrim(COALESCE(p_category, ''));
    v_clean_search TEXT := btrim(COALESCE(p_search, ''));
    v_count BIGINT;
BEGIN
    SELECT count(*)::BIGINT INTO v_count
    FROM public.scholar_inquiries si
    WHERE si.status = 'answered'
      AND si.share_publicly = true
      AND si.published_at IS NOT NULL
      AND (v_clean_cat = '' OR v_clean_cat = 'all' OR si.category ILIKE v_clean_cat)
      AND (
          v_clean_search = '' 
          OR si.subject ILIKE ('%' || v_clean_search || '%')
          OR si.question_text ILIKE ('%' || v_clean_search || '%')
          OR si.answer_text ILIKE ('%' || v_clean_search || '%')
      );
    RETURN COALESCE(v_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.get_public_answered_scholar_inquiries_count(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_answered_scholar_inquiries_count(TEXT, TEXT) TO anon, authenticated;

-- 8. PUBLIC ANSWERED INQUIRIES STATS & COUNTER RPC: public.get_scholar_inquiries_answered_count()
-- Strictly gates private counts behind public.is_admin(); public callers receive ONLY public counts.
CREATE OR REPLACE FUNCTION public.get_scholar_inquiries_answered_count()
RETURNS TABLE (
    total_answered BIGINT,
    total_public_answered BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_is_admin BOOLEAN := false;
BEGIN
    -- Safely check admin status without raising unhandled exceptions
    BEGIN
        v_is_admin := public.is_admin();
    EXCEPTION WHEN OTHERS THEN
        v_is_admin := false;
    END;

    IF v_is_admin THEN
        -- Authenticated administrators can audit total volume across both private & public
        RETURN QUERY
        SELECT 
            (SELECT count(*)::BIGINT FROM public.scholar_inquiries WHERE status = 'answered') AS total_answered,
            (SELECT count(*)::BIGINT FROM public.scholar_inquiries WHERE status = 'answered' AND share_publicly = true AND published_at IS NOT NULL) AS total_public_answered;
    ELSE
        -- Public and anonymous visitors: strictly report ONLY public answered counts
        -- Never leak or reveal the count of private inquiries to public callers
        RETURN QUERY
        SELECT 
            (SELECT count(*)::BIGINT FROM public.scholar_inquiries WHERE status = 'answered' AND share_publicly = true AND published_at IS NOT NULL) AS total_answered,
            (SELECT count(*)::BIGINT FROM public.scholar_inquiries WHERE status = 'answered' AND share_publicly = true AND published_at IS NOT NULL) AS total_public_answered;
    END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.get_scholar_inquiries_answered_count() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_scholar_inquiries_answered_count() TO anon, authenticated;

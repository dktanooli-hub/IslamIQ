-- =============================================================================
-- IslamIQ Supabase Database Schema & Row-Level Security (RLS) Migration Script
-- Version: 2.3 (Fully Hardened Production Schema & Audited Security Suite)
-- Target Project: https://udlunwwubmskgdbbjwee.supabase.co
-- Compatibility: IslamIQ Web, Android PWA, and Administrative Management Suite
-- Security Standards:
--   - Hardened SECURITY DEFINER search_path (pg_catalog, public, auth, pg_temp)
--   - Schema-qualified function & table calls
--   - Strict verified-only admin bootstrap with user_id immutable locking
--   - Explicit, safe admin bootstrap setup procedure (No auto-grant trigger)
--   - Direct public INSERT blocked on quiz_attempts (Sanitized via RPC)
--   - Duplicate-ID false success prevention & strict bounds validation
--   - Truly admin-restricted statistics view and RPC
--   - Fully idempotent (safe to run and re-run without duplicate errors)
-- =============================================================================

-- Enable required cryptographic extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. ADMIN AUTHORIZATION & ROLES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.app_admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT DEFAULT 'Authorized IslamIQ Administrator',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- Seed designated primary super-administrator (initial unlinked bootstrap record)
INSERT INTO public.app_admins (email, role, is_active, notes)
VALUES ('dk.tanooli97@gmail.com', 'super_admin', TRUE, 'Primary IslamIQ Administrator')
ON CONFLICT (email) DO UPDATE 
    SET role = 'super_admin',
        is_active = TRUE,
        updated_at = pg_catalog.now();

-- Indexes for lightning-fast authorization lookups
CREATE INDEX IF NOT EXISTS idx_app_admins_user_id ON public.app_admins(user_id);
CREATE INDEX IF NOT EXISTS idx_app_admins_email_lower ON public.app_admins(pg_catalog.lower(email));
CREATE INDEX IF NOT EXISTS idx_app_admins_is_active ON public.app_admins(is_active);

-- =============================================================================
-- 2. HARDENED AUTHORIZATION FUNCTIONS & SAFE SETUP PROCEDURE
-- =============================================================================

-- Function: public.is_admin()
-- Verifies whether current caller has an authenticated session linked to an
-- active admin record in public.app_admins.
-- CRITICAL SECURITY CONTROLS:
-- 1. Fixed search_path = pg_catalog, public, auth, pg_temp protects against search_path hijacking.
-- 2. Requires a valid auth.uid() from Supabase Auth.
-- 3. Case A (Post-Setup): Direct match on immutable auth.uid() linked to an active admin.
-- 4. Case B (Initial Bootstrap ONLY): Permitted ONLY when user_id is NOT YET LINKED (user_id IS NULL),
--    strictly restricted to 'dk.tanooli97@gmail.com' with an explicitly verified email.
--    Once user_id is linked, Case B is permanently deactivated.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_user_id UUID;
    v_email TEXT;
    v_email_verified BOOLEAN;
    v_is_authorized BOOLEAN := FALSE;
BEGIN
    -- 1. Extract caller's authenticated user ID
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- 2. Extract JWT email claim & verification status
    v_email := pg_catalog.lower(COALESCE(auth.jwt() ->> 'email', ''));
    IF v_email = '' THEN
        RETURN FALSE;
    END IF;

    v_email_verified := COALESCE((auth.jwt() ->> 'email_verified')::BOOLEAN, FALSE);

    -- 3. Authorization verification
    SELECT EXISTS (
        SELECT 1 
        FROM public.app_admins
        WHERE is_active = TRUE
          AND (
            -- Case A: Primary authorized path via immutable auth.uid()
            user_id = v_user_id
            -- Case B: Temporary bootstrap check strictly pinned to primary admin before user_id link
            OR (
                user_id IS NULL 
                AND pg_catalog.lower(email) = 'dk.tanooli97@gmail.com'
                AND v_email = 'dk.tanooli97@gmail.com'
                AND v_email_verified = TRUE
            )
          )
    ) INTO v_is_authorized;

    RETURN v_is_authorized;
END;
$$;

-- Function: public.is_super_admin()
-- Restricts administrator management (adding, modifying, or deleting other admins).
-- Pinned strictly to dk.tanooli97@gmail.com.
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_user_id UUID;
    v_email TEXT;
    v_email_verified BOOLEAN;
    v_is_super BOOLEAN := FALSE;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN FALSE;
    END IF;

    v_email := pg_catalog.lower(COALESCE(auth.jwt() ->> 'email', ''));
    IF v_email = '' THEN
        RETURN FALSE;
    END IF;

    v_email_verified := COALESCE((auth.jwt() ->> 'email_verified')::BOOLEAN, FALSE);

    SELECT EXISTS (
        SELECT 1 
        FROM public.app_admins
        WHERE is_active = TRUE
          AND role = 'super_admin'
          AND (
            -- Primary authorized path via immutable auth.uid()
            user_id = v_user_id
            -- Bootstrap check strictly pinned to dk.tanooli97@gmail.com
            OR (
                user_id IS NULL 
                AND pg_catalog.lower(email) = 'dk.tanooli97@gmail.com'
                AND v_email = 'dk.tanooli97@gmail.com'
                AND v_email_verified = TRUE
            )
          )
    ) INTO v_is_super;

    RETURN v_is_super;
END;
$$;

-- Explicit Admin Bootstrap Setup Function:
-- Safe, explicit procedure to bind the verified administrator's auth.uid() to public.app_admins.
-- SECURITY CONTROLS:
-- 1. No automatic trigger guessing user linking; requires explicit authenticated invocation.
-- 2. Restricts claim exclusively to 'dk.tanooli97@gmail.com' with verified email status.
-- 3. Cannot claim or overwrite an admin record if user_id is already bound to another user.
CREATE OR REPLACE FUNCTION public.claim_admin_bootstrap()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_user_id UUID;
    v_email TEXT;
    v_email_verified BOOLEAN;
    v_updated_count INTEGER := 0;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to claim administrator bootstrap.';
    END IF;

    v_email := pg_catalog.lower(COALESCE(auth.jwt() ->> 'email', ''));
    v_email_verified := COALESCE((auth.jwt() ->> 'email_verified')::BOOLEAN, FALSE);

    IF v_email <> 'dk.tanooli97@gmail.com' THEN
        RAISE EXCEPTION 'Unauthorized: Only the designated primary administrator can execute bootstrap claim.';
    END IF;

    IF NOT v_email_verified THEN
        RAISE EXCEPTION 'Unauthorized: Email address must be verified in Supabase Auth before claiming admin status.';
    END IF;

    -- Atomically bind user_id only if currently NULL
    UPDATE public.app_admins
    SET user_id = v_user_id,
        updated_at = pg_catalog.now()
    WHERE pg_catalog.lower(email) = 'dk.tanooli97@gmail.com'
      AND is_active = TRUE
      AND user_id IS NULL;

    GET DIAGNOSTICS v_updated_count = ROW_COUNT;

    IF v_updated_count = 0 THEN
        IF EXISTS (
            SELECT 1 FROM public.app_admins 
            WHERE pg_catalog.lower(email) = 'dk.tanooli97@gmail.com' 
              AND user_id = v_user_id
        ) THEN
            RETURN jsonb_build_object(
                'success', true, 
                'message', 'Administrator already claimed by your verified account.', 
                'user_id', v_user_id
            );
        ELSE
            RAISE EXCEPTION 'Bootstrap claim failed: Administrator account has already been claimed by another user ID or is inactive.';
        END IF;
    END IF;

    RETURN jsonb_build_object(
        'success', true, 
        'message', 'Administrator privileges successfully claimed and securely bound to your verified auth.uid().', 
        'user_id', v_user_id
    );
END;
$$;

-- Explicit Execution Privileges for Authorization Functions
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE ALL ON FUNCTION public.is_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

REVOKE ALL ON FUNCTION public.claim_admin_bootstrap() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_admin_bootstrap() TO authenticated;

-- =============================================================================
-- 3. QUIZ QUESTIONS TABLE (Adult & Kids)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id TEXT PRIMARY KEY,
    question_urdu TEXT NOT NULL,
    question_en TEXT NOT NULL,
    options_urdu JSONB NOT NULL DEFAULT '[]'::jsonb,
    options_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_index INTEGER NOT NULL DEFAULT 0 CHECK (correct_index >= 0 AND correct_index <= 5),
    explanation_urdu TEXT NOT NULL DEFAULT '',
    explanation_en TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    for_kids BOOLEAN NOT NULL DEFAULT FALSE,
    kids_hint_urdu TEXT,
    kids_hint_en TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_forkids ON public.quiz_questions(for_kids);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_category ON public.quiz_questions(category);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_is_active ON public.quiz_questions(is_active);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_difficulty ON public.quiz_questions(difficulty);

-- =============================================================================
-- 4. QURAN VERSES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quran_verses (
    id TEXT PRIMARY KEY,
    arabic TEXT NOT NULL,
    translation_urdu TEXT NOT NULL,
    translation_en TEXT NOT NULL,
    surah_name_arabic TEXT NOT NULL DEFAULT '',
    surah_name_en TEXT NOT NULL DEFAULT '',
    surah_number INTEGER NOT NULL DEFAULT 1 CHECK (surah_number >= 1 AND surah_number <= 114),
    ayah_number INTEGER NOT NULL DEFAULT 1 CHECK (ayah_number >= 1),
    theme TEXT NOT NULL DEFAULT 'General',
    explanation_urdu TEXT,
    explanation_en TEXT,
    lesson_urdu TEXT,
    lesson_en TEXT,
    reference TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_quran_verses_theme ON public.quran_verses(theme);
CREATE INDEX IF NOT EXISTS idx_quran_verses_surah ON public.quran_verses(surah_number);

-- =============================================================================
-- 5. AUTHENTIC HADITHS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.hadiths (
    id TEXT PRIMARY KEY,
    arabic TEXT NOT NULL,
    text_urdu TEXT NOT NULL,
    text_en TEXT NOT NULL,
    narrator TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL,
    hadith_number TEXT NOT NULL DEFAULT '',
    grade TEXT NOT NULL DEFAULT 'Sahih' CHECK (grade IN ('Sahih', 'Hasan')),
    lesson_urdu TEXT,
    lesson_en TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_hadiths_source ON public.hadiths(source);
CREATE INDEX IF NOT EXISTS idx_hadiths_grade ON public.hadiths(grade);

-- =============================================================================
-- 6. MASNOON DUAS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.duas (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_urdu TEXT NOT NULL,
    arabic TEXT NOT NULL,
    transliteration TEXT NOT NULL,
    translation_urdu TEXT NOT NULL,
    translation_en TEXT NOT NULL,
    reference TEXT NOT NULL,
    occasion_urdu TEXT NOT NULL DEFAULT '',
    occasion_en TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_duas_title_en ON public.duas(title_en);
CREATE INDEX IF NOT EXISTS idx_duas_occasion ON public.duas(occasion_en);

-- =============================================================================
-- 7. ISLAMIC REMINDERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.reminders (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_urdu TEXT NOT NULL,
    body_en TEXT NOT NULL,
    body_urdu TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    practical_tip_urdu TEXT,
    practical_tip_en TEXT,
    reference TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_reminders_category ON public.reminders(category);

-- =============================================================================
-- 8. VERIFIED ISLAMIC Q&A TABLE (Islamic Q&A Hub)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.verified_qas (
    id TEXT PRIMARY KEY,
    question_urdu TEXT NOT NULL,
    question_en TEXT NOT NULL,
    answer_urdu TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    reference TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    explanation_urdu TEXT,
    explanation_en TEXT,
    related_guide_path TEXT,
    related_guide_title_en TEXT,
    related_guide_title_urdu TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_verified_qas_category ON public.verified_qas(category);

-- =============================================================================
-- 9. SYSTEM TAXONOMY & CATEGORIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- =============================================================================
-- 10. QUIZ ATTEMPTS & PROGRESS LOGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    timestamp BIGINT NOT NULL CHECK (timestamp > 1600000000000),
    date TEXT NOT NULL CHECK (length(date) <= 20),
    mode TEXT NOT NULL DEFAULT 'adult' CHECK (mode IN ('adult', 'kids')),
    difficulty TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    category TEXT NOT NULL DEFAULT 'General' CHECK (length(category) <= 50),
    score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
    total_questions INTEGER NOT NULL DEFAULT 5 CHECK (total_questions >= 1 AND total_questions <= 100),
    accuracy NUMERIC NOT NULL DEFAULT 0 CHECK (accuracy >= 0 AND accuracy <= 100),
    user_name TEXT NOT NULL DEFAULT 'Seeker' CHECK (length(user_name) <= 50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    CONSTRAINT chk_score_within_total CHECK (score <= total_questions)
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_timestamp ON public.quiz_attempts(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_mode ON public.quiz_attempts(mode);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_date ON public.quiz_attempts(date);

-- Server-Side RPC Function for Sanitized Quiz Attempt Logging:
-- Enforces input sanitization, bounds validation, duplicate prevention, and server-side safety.
CREATE OR REPLACE FUNCTION public.record_quiz_attempt(
    p_id TEXT,
    p_timestamp BIGINT,
    p_date TEXT,
    p_mode TEXT,
    p_difficulty TEXT,
    p_category TEXT,
    p_score INTEGER,
    p_total_questions INTEGER,
    p_accuracy NUMERIC,
    p_user_name TEXT DEFAULT 'Seeker'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
DECLARE
    v_clean_id TEXT;
    v_clean_name TEXT;
    v_clean_category TEXT;
    v_clean_date TEXT;
    v_clean_mode TEXT;
    v_clean_difficulty TEXT;
    v_clean_accuracy NUMERIC;
    v_clean_timestamp BIGINT;
    v_now_ms BIGINT;
    v_inserted_id TEXT;
BEGIN
    -- 1. Validate & Sanitize ID: reject invalid characters or empty string
    v_clean_id := pg_catalog.trim(COALESCE(p_id, ''));
    IF v_clean_id = '' OR v_clean_id !~ '^[A-Za-z0-9_-]{1,64}$' THEN
        v_clean_id := 'att-' || gen_random_uuid()::TEXT;
    END IF;

    -- 2. Duplicate ID Prevention: Never return false success on duplicate attempt ID
    IF EXISTS (SELECT 1 FROM public.quiz_attempts WHERE id = v_clean_id) THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Attempt record with this ID already exists',
            'id', v_clean_id
        );
    END IF;

    -- 3. Validate timestamp: must be within realistic window (2024 to now + 1 day)
    v_now_ms := (extract(epoch FROM now()) * 1000)::BIGINT;
    IF p_timestamp IS NULL OR p_timestamp < 1704067200000 OR p_timestamp > (v_now_ms + 86400000) THEN
        v_clean_timestamp := v_now_ms;
    ELSE
        v_clean_timestamp := p_timestamp;
    END IF;

    -- 4. Sanitize text inputs & prevent oversized payload
    v_clean_name := coalesce(nullif(trim(p_user_name), ''), 'Seeker');
    IF length(v_clean_name) > 50 THEN
        v_clean_name := substring(v_clean_name, 1, 50);
    END IF;

    v_clean_category := coalesce(nullif(trim(p_category), ''), 'General');
    IF length(v_clean_category) > 50 THEN
        v_clean_category := substring(v_clean_category, 1, 50);
    END IF;

    -- 5. Validate date: strictly require YYYY-MM-DD format
    v_clean_date := pg_catalog.trim(COALESCE(p_date, ''));
    IF v_clean_date !~ '^\d{4}-\d{2}-\d{2}$' THEN
        v_clean_date := pg_catalog.to_char(pg_catalog.now(), 'YYYY-MM-DD');
    END IF;

    -- 6. Validate and clamp mode & difficulty
    v_clean_mode := CASE 
        WHEN pg_catalog.lower(pg_catalog.trim(COALESCE(p_mode, ''))) IN ('adult', 'kids') 
        THEN pg_catalog.lower(pg_catalog.trim(p_mode)) 
        ELSE 'adult' 
    END;

    v_clean_difficulty := CASE 
        WHEN pg_catalog.lower(pg_catalog.trim(COALESCE(p_difficulty, ''))) IN ('beginner', 'intermediate', 'advanced') 
        THEN pg_catalog.lower(pg_catalog.trim(p_difficulty)) 
        ELSE 'beginner' 
    END;

    -- 7. Validate numerical bounds strictly
    IF p_total_questions IS NULL OR p_total_questions < 1 OR p_total_questions > 100 THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Invalid total_questions count (must be between 1 and 100)'
        );
    END IF;

    IF p_score IS NULL OR p_score < 0 OR p_score > p_total_questions THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Invalid score (must be between 0 and total_questions)'
        );
    END IF;

    -- 8. Server-calculated accuracy derived strictly from verified score / total_questions
    v_clean_accuracy := pg_catalog.round(((p_score::NUMERIC / p_total_questions::NUMERIC) * 100), 2);

    -- 9. Insert with SECURITY DEFINER privileges and verify insertion result
    INSERT INTO public.quiz_attempts (
        id, timestamp, date, mode, difficulty, category,
        score, total_questions, accuracy, user_name
    )
    VALUES (
        v_clean_id,
        v_clean_timestamp,
        v_clean_date,
        v_clean_mode,
        v_clean_difficulty,
        v_clean_category,
        p_score,
        p_total_questions,
        v_clean_accuracy,
        v_clean_name
    )
    RETURNING id INTO v_inserted_id;

    IF v_inserted_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Failed to insert attempt record'
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true, 
        'id', v_inserted_id
    );
END;
$$;

-- Explicit Execution Privileges for Quiz Attempt RPC
REVOKE ALL ON FUNCTION public.record_quiz_attempt(TEXT, BIGINT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, NUMERIC, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_quiz_attempt(TEXT, BIGINT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, NUMERIC, TEXT) TO anon, authenticated;

-- =============================================================================
-- 11. IDEMPOTENT REAL-TIME REPLICATION
-- =============================================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'quiz_questions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_questions;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'quran_verses') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.quran_verses;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'hadiths') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.hadiths;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'duas') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.duas;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'reminders') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.reminders;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'categories') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'verified_qas') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.verified_qas;
    END IF;
END $$;

-- =============================================================================
-- 12. DCL PERMISSIONS & ZERO-TRUST ROW-LEVEL SECURITY (RLS) FOR ALL 9 TABLES
-- =============================================================================

-- Table-level DCL grants:
-- Public content tables: Read-only to anon, full management to authenticated
GRANT SELECT ON public.quiz_questions TO anon, authenticated;
GRANT SELECT ON public.quran_verses TO anon, authenticated;
GRANT SELECT ON public.hadiths TO anon, authenticated;
GRANT SELECT ON public.duas TO anon, authenticated;
GRANT SELECT ON public.reminders TO anon, authenticated;
GRANT SELECT ON public.verified_qas TO anon, authenticated;
GRANT SELECT ON public.categories TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON public.quiz_questions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.quran_verses TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hadiths TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.duas TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reminders TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.verified_qas TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;

-- Admin table: Deny direct access to anon completely
REVOKE ALL ON public.app_admins FROM PUBLIC, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.app_admins TO authenticated;

-- Quiz attempts: Direct INSERT completely blocked for all client roles
REVOKE ALL ON public.quiz_attempts FROM PUBLIC, anon;
REVOKE INSERT, UPDATE ON public.quiz_attempts FROM authenticated;
GRANT SELECT, DELETE ON public.quiz_attempts TO authenticated;

-- Enable RLS across all 9 tables
ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hadiths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verified_qas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- TABLE 1: public.app_admins
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view admins list" ON public.app_admins;
DROP POLICY IF EXISTS "Super Admin can insert admins" ON public.app_admins;
DROP POLICY IF EXISTS "Super Admin can update admins" ON public.app_admins;
DROP POLICY IF EXISTS "Super Admin can delete admins" ON public.app_admins;

CREATE POLICY "Admins can view admins list"
    ON public.app_admins FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Super Admin can insert admins"
    ON public.app_admins FOR INSERT
    TO authenticated
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Super Admin can update admins"
    ON public.app_admins FOR UPDATE
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Super Admin can delete admins"
    ON public.app_admins FOR DELETE
    TO authenticated
    USING (public.is_super_admin());

-- -----------------------------------------------------------------------------
-- TABLE 2: public.quiz_questions (Adults & Kids)
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Public can view active quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Admin can insert quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Admin can update quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Admin can delete quiz questions" ON public.quiz_questions;

CREATE POLICY "Public can view active quiz questions"
    ON public.quiz_questions FOR SELECT
    TO anon, authenticated
    USING (
        is_active = TRUE 
        OR (auth.role() = 'authenticated' AND public.is_admin())
    );

CREATE POLICY "Admin can insert quiz questions"
    ON public.quiz_questions FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update quiz questions"
    ON public.quiz_questions FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete quiz questions"
    ON public.quiz_questions FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 3: public.quran_verses
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view quran verses" ON public.quran_verses;
DROP POLICY IF EXISTS "Admin can insert quran verses" ON public.quran_verses;
DROP POLICY IF EXISTS "Admin can update quran verses" ON public.quran_verses;
DROP POLICY IF EXISTS "Admin can delete quran verses" ON public.quran_verses;
DROP POLICY IF EXISTS "Admin can manage quran verses" ON public.quran_verses;

CREATE POLICY "Public can view quran verses"
    ON public.quran_verses FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert quran verses"
    ON public.quran_verses FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update quran verses"
    ON public.quran_verses FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete quran verses"
    ON public.quran_verses FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 4: public.hadiths
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view hadiths" ON public.hadiths;
DROP POLICY IF EXISTS "Admin can insert hadiths" ON public.hadiths;
DROP POLICY IF EXISTS "Admin can update hadiths" ON public.hadiths;
DROP POLICY IF EXISTS "Admin can delete hadiths" ON public.hadiths;
DROP POLICY IF EXISTS "Admin can manage hadiths" ON public.hadiths;

CREATE POLICY "Public can view hadiths"
    ON public.hadiths FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert hadiths"
    ON public.hadiths FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update hadiths"
    ON public.hadiths FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete hadiths"
    ON public.hadiths FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 5: public.duas
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view duas" ON public.duas;
DROP POLICY IF EXISTS "Admin can insert duas" ON public.duas;
DROP POLICY IF EXISTS "Admin can update duas" ON public.duas;
DROP POLICY IF EXISTS "Admin can delete duas" ON public.duas;
DROP POLICY IF EXISTS "Admin can manage duas" ON public.duas;

CREATE POLICY "Public can view duas"
    ON public.duas FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert duas"
    ON public.duas FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update duas"
    ON public.duas FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete duas"
    ON public.duas FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 6: public.reminders
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view reminders" ON public.reminders;
DROP POLICY IF EXISTS "Admin can insert reminders" ON public.reminders;
DROP POLICY IF EXISTS "Admin can update reminders" ON public.reminders;
DROP POLICY IF EXISTS "Admin can delete reminders" ON public.reminders;
DROP POLICY IF EXISTS "Admin can manage reminders" ON public.reminders;

CREATE POLICY "Public can view reminders"
    ON public.reminders FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert reminders"
    ON public.reminders FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update reminders"
    ON public.reminders FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete reminders"
    ON public.reminders FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 7: public.verified_qas
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view verified qas" ON public.verified_qas;
DROP POLICY IF EXISTS "Admin can insert verified qas" ON public.verified_qas;
DROP POLICY IF EXISTS "Admin can update verified qas" ON public.verified_qas;
DROP POLICY IF EXISTS "Admin can delete verified qas" ON public.verified_qas;
DROP POLICY IF EXISTS "Admin can manage verified qas" ON public.verified_qas;

CREATE POLICY "Public can view verified qas"
    ON public.verified_qas FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert verified qas"
    ON public.verified_qas FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update verified qas"
    ON public.verified_qas FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete verified qas"
    ON public.verified_qas FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 8: public.categories
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admin can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admin can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admin can delete categories" ON public.categories;
DROP POLICY IF EXISTS "Admin can manage categories" ON public.categories;

CREATE POLICY "Public can view categories"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can insert categories"
    ON public.categories FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update categories"
    ON public.categories FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can delete categories"
    ON public.categories FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- TABLE 9: public.quiz_attempts
-- -----------------------------------------------------------------------------
-- CRITICAL SECURITY RULE:
-- Direct public/anon INSERT is COMPLETELY BLOCKED.
-- Public clients MUST submit progress via the secure RPC function:
--   public.record_quiz_attempt(...)
--
-- Direct access policies:
--   - Direct INSERT: Blocked (No INSERT policy for any client role; managed exclusively via SECURITY DEFINER RPC).
--   - SELECT: Only authenticated Admin.
--   - DELETE: Only authenticated Admin.
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can submit quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Public can submit valid quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can insert quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can view quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can delete quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Admin can view quiz attempts"
    ON public.quiz_attempts FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admin can delete quiz attempts"
    ON public.quiz_attempts FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- 13. ADMIN-ONLY DIAGNOSTICS: SECURE VIEW & RPC FUNCTION
-- =============================================================================
-- Genuinely restricted to verified administrators:
-- 1. The view public.v_database_statistics enforces WHERE public.is_admin() = TRUE,
--    so non-admin callers return zero rows.
-- 2. The function public.get_database_statistics() raises an explicit 'Access denied'
--    exception if the caller does not possess administrator privileges.
-- =============================================================================

CREATE OR REPLACE VIEW public.v_database_statistics AS
SELECT 
    (SELECT count(*) FROM public.quiz_questions) AS total_quiz_questions,
    (SELECT count(*) FROM public.quiz_questions WHERE for_kids = true) AS kids_quiz_questions,
    (SELECT count(*) FROM public.quiz_questions WHERE for_kids = false) AS adult_quiz_questions,
    (SELECT count(*) FROM public.quran_verses) AS total_quran_verses,
    (SELECT count(*) FROM public.hadiths) AS total_hadiths,
    (SELECT count(*) FROM public.duas) AS total_duas,
    (SELECT count(*) FROM public.reminders) AS total_reminders,
    (SELECT count(*) FROM public.verified_qas) AS total_verified_qas,
    (SELECT count(*) FROM public.categories) AS total_categories,
    (SELECT count(*) FROM public.app_admins) AS total_registered_admins
WHERE public.is_admin() = TRUE;

-- Strict DCL control: Revoke public and anon read on the statistics view
REVOKE ALL ON public.v_database_statistics FROM PUBLIC, anon;
GRANT SELECT ON public.v_database_statistics TO authenticated;

-- Admin Diagnostic RPC Function
CREATE OR REPLACE FUNCTION public.get_database_statistics()
RETURNS TABLE (
    total_quiz_questions BIGINT,
    kids_quiz_questions BIGINT,
    adult_quiz_questions BIGINT,
    total_quran_verses BIGINT,
    total_hadiths BIGINT,
    total_duas BIGINT,
    total_reminders BIGINT,
    total_verified_qas BIGINT,
    total_categories BIGINT,
    total_registered_admins BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = pg_catalog, public, auth, pg_temp
AS $$
BEGIN
    -- Strict admin authorization check
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied: Administrator privileges required.';
    END IF;

    RETURN QUERY
    SELECT 
        (SELECT count(*) FROM public.quiz_questions) AS total_quiz_questions,
        (SELECT count(*) FROM public.quiz_questions WHERE for_kids = true) AS kids_quiz_questions,
        (SELECT count(*) FROM public.quiz_questions WHERE for_kids = false) AS adult_quiz_questions,
        (SELECT count(*) FROM public.quran_verses) AS total_quran_verses,
        (SELECT count(*) FROM public.hadiths) AS total_hadiths,
        (SELECT count(*) FROM public.duas) AS total_duas,
        (SELECT count(*) FROM public.reminders) AS total_reminders,
        (SELECT count(*) FROM public.verified_qas) AS total_verified_qas,
        (SELECT count(*) FROM public.categories) AS total_categories,
        (SELECT count(*) FROM public.app_admins) AS total_registered_admins;
END;
$$;

REVOKE ALL ON FUNCTION public.get_database_statistics() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_database_statistics() TO authenticated;

-- =============================================================================
-- END OF AUDITED & HARDENED PRODUCTION SCHEMA SCRIPT (v2.3)
-- =============================================================================

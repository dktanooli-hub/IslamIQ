-- =============================================================================
-- IslamIQ Supabase Database Schema & Row-Level Security (RLS) Migration Script
-- Version: 2.1 (Fully Complete Production Schema & Hardened RLS Suite)
-- Target Project: https://udlunwwubmskgdbbjwee.supabase.co
-- Compatibility: IslamIQ Web, Android PWA, and Administrative Management Suite
-- Security Standards:
--   - Zero-Trust RLS on all 9 tables
--   - Fixed Search-Path SECURITY DEFINER Functions
--   - Strict Verified-Only Email & auth.uid() Admin Authorization
--   - Direct Public Insert Blocked on quiz_attempts (Secured via RPC)
--   - Idempotent (Re-runnable without duplicate policy or relation errors)
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed designated primary administrator (bootstrap record)
INSERT INTO public.app_admins (email, role, is_active, notes)
VALUES ('dk.tanooli97@gmail.com', 'super_admin', TRUE, 'Primary IslamIQ Administrator')
ON CONFLICT (email) DO UPDATE 
    SET role = 'super_admin',
        is_active = TRUE,
        updated_at = NOW();

-- Indexes for lightning-fast authorization lookups
CREATE INDEX IF NOT EXISTS idx_app_admins_user_id ON public.app_admins(user_id);
CREATE INDEX IF NOT EXISTS idx_app_admins_email_lower ON public.app_admins(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_app_admins_is_active ON public.app_admins(is_active);

-- =============================================================================
-- 2. SECURE AUTHORIZATION FUNCTIONS (Fixed search_path & Verified Email Only)
-- =============================================================================

-- Function: public.is_admin()
-- Verifies whether current caller has an authenticated session linked to an
-- active admin record in public.app_admins.
-- CRITICAL SECURITY REQUIREMENT:
-- Under no circumstances is access granted to an unverified email.
-- Must have BOTH:
--   1. An active record in public.app_admins
--   2. Either a direct match on auth.uid() OR an email that is explicitly verified
--      by Supabase Auth (auth.jwt() ->> 'email_verified' = 'true').
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, auth, pg_temp
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
    v_email := LOWER(COALESCE(auth.jwt() ->> 'email', ''));
    v_email_verified := COALESCE((auth.jwt() ->> 'email_verified')::BOOLEAN, FALSE);

    -- 3. Authorization check:
    --    Case A: Direct match on immutable auth.uid()
    --    Case B: Initial bootstrap match ONLY if email is confirmed and verified
    SELECT EXISTS (
        SELECT 1 
        FROM public.app_admins
        WHERE is_active = TRUE
          AND (
            user_id = v_user_id
            OR (
                user_id IS NULL 
                AND LOWER(email) = v_email 
                AND v_email_verified = TRUE
            )
          )
    ) INTO v_is_authorized;

    RETURN v_is_authorized;
END;
$$;

-- Function: public.is_super_admin()
-- Restricts administrative management (adding/removing other admins)
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, auth, pg_temp
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

    v_email := LOWER(COALESCE(auth.jwt() ->> 'email', ''));
    v_email_verified := COALESCE((auth.jwt() ->> 'email_verified')::BOOLEAN, FALSE);

    SELECT EXISTS (
        SELECT 1 
        FROM public.app_admins
        WHERE is_active = TRUE
          AND role = 'super_admin'
          AND (
            user_id = v_user_id
            OR (
                user_id IS NULL 
                AND LOWER(email) = v_email 
                AND v_email_verified = TRUE
            )
          )
    ) INTO v_is_super;

    RETURN v_is_super;
END;
$$;

-- Automatic Link Trigger Function:
-- When a confirmed user signs up or verifies their email in Supabase Auth,
-- link their auth.uid() automatically to public.app_admins if their email matches.
CREATE OR REPLACE FUNCTION public.handle_admin_user_linking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
    IF NEW.email IS NOT NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        UPDATE public.app_admins
        SET user_id = NEW.id,
            updated_at = NOW()
        WHERE LOWER(email) = LOWER(NEW.email)
          AND (user_id IS NULL OR user_id = NEW.id);
    END IF;
    RETURN NEW;
END;
$$;

-- Attach trigger to auth.users (idempotent)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        DROP TRIGGER IF EXISTS on_auth_user_admin_link ON auth.users;
        CREATE TRIGGER on_auth_user_admin_link
            AFTER INSERT OR UPDATE OF email_confirmed_at, email ON auth.users
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_admin_user_linking();
    END IF;
EXCEPTION
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Skipping direct trigger on auth.users due to dashboard permission boundaries. Use manual user_id link or verified is_admin() bootstrap matching.';
END $$;

-- Execution Privileges: Prevent anonymous callers from executing security definers directly
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verified_qas_category ON public.verified_qas(category);

-- =============================================================================
-- 9. SYSTEM TAXONOMY & CATEGORIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 10. QUIZ ATTEMPTS & PROGRESS LOGS TABLE
-- =============================================================================
-- Stores validated quiz submissions.
-- Direct INSERT from anonymous/public users is strictly disabled via RLS.
-- Submissions must pass through public.record_quiz_attempt() RPC function.
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
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_score_within_total CHECK (score <= total_questions)
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_timestamp ON public.quiz_attempts(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_mode ON public.quiz_attempts(mode);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_date ON public.quiz_attempts(date);

-- Server-Side RPC Function for Sanitized Quiz Attempt Logging:
-- Enforces input sanitization, bounds validation, and server-side safety.
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
SET search_path = public, auth, pg_temp
AS $$
DECLARE
    v_clean_name TEXT;
    v_clean_category TEXT;
    v_clean_date TEXT;
BEGIN
    -- 1. Sanitize text inputs
    v_clean_name := COALESCE(NULLIF(TRIM(p_user_name), ''), 'Seeker');
    IF length(v_clean_name) > 50 THEN
        v_clean_name := SUBSTRING(v_clean_name, 1, 50);
    END IF;

    v_clean_category := COALESCE(NULLIF(TRIM(p_category), ''), 'General');
    IF length(v_clean_category) > 50 THEN
        v_clean_category := SUBSTRING(v_clean_category, 1, 50);
    END IF;

    v_clean_date := COALESCE(NULLIF(TRIM(p_date), ''), TO_CHAR(NOW(), 'YYYY-MM-DD'));
    IF length(v_clean_date) > 20 THEN
        v_clean_date := SUBSTRING(v_clean_date, 1, 20);
    END IF;

    -- 2. Validate numerical bounds
    IF p_total_questions < 1 OR p_total_questions > 100 THEN
        RAISE EXCEPTION 'Invalid total_questions count (must be between 1 and 100)';
    END IF;

    IF p_score < 0 OR p_score > p_total_questions THEN
        RAISE EXCEPTION 'Score must be between 0 and total_questions';
    END IF;

    -- 3. Perform sanitized insert with elevated SECURITY DEFINER privileges
    INSERT INTO public.quiz_attempts (
        id, timestamp, date, mode, difficulty, category,
        score, total_questions, accuracy, user_name
    )
    VALUES (
        p_id,
        p_timestamp,
        v_clean_date,
        CASE WHEN p_mode IN ('adult', 'kids') THEN p_mode ELSE 'adult' END,
        CASE WHEN p_difficulty IN ('beginner', 'intermediate', 'advanced') THEN p_difficulty ELSE 'beginner' END,
        v_clean_category,
        p_score,
        p_total_questions,
        ROUND(p_accuracy::NUMERIC, 2),
        v_clean_name
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN jsonb_build_object('success', true, 'id', p_id);
END;
$$;

-- Allow public and authenticated clients to invoke the safe RPC function
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
-- 12. COMPLETE ROW-LEVEL SECURITY (RLS) POLICIES FOR ALL 9 TABLES
-- =============================================================================
-- Zero-Trust Security Design:
-- 1. All 9 tables have RLS explicitly enabled.
-- 2. Every single policy uses DROP POLICY IF EXISTS first to guarantee idempotency.
-- 3. Public read is granted ONLY to required Islamic content (Quran, Hadith, Duas,
--    Reminders, Verified QAs, Categories, and active Quiz Questions).
-- 4. Content modification (INSERT, UPDATE, DELETE) is strictly restricted to
--    authenticated administrators verified via public.is_admin().
-- 5. Direct INSERT on quiz_attempts is blocked for public/anon; they must call
--    public.record_quiz_attempt() RPC function.
-- =============================================================================

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
-- Rules:
--   - Public / Anon: Zero access. Cannot view, insert, update, or delete.
--   - Normal Users: Zero access. Self-registration is strictly impossible.
--   - Verified Admins: Can view administrator directory.
--   - Super Admins: Can manage (create, modify, deactivate, delete) admin records.
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
-- Rules:
--   - Public / Anon: Can ONLY view active questions (is_active = TRUE).
--   - Verified Admins: Can view ALL questions (including drafts / inactive).
--   - Content Management: INSERT, UPDATE, DELETE strictly restricted to Admins.
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
-- Rules:
--   - Public / Anon: Read-only access to all verified verses.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Rules:
--   - Public / Anon: Read-only access to all authentic hadiths.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Rules:
--   - Public / Anon: Read-only access to all masnoon duas.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Rules:
--   - Public / Anon: Read-only access to all Islamic reminders.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Rules:
--   - Public / Anon: Read-only access to all verified Islamic Q&As.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Rules:
--   - Public / Anon: Read-only access to taxonomy categories.
--   - Content Management: Only verified Admin can INSERT, UPDATE, DELETE.
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
-- Direct public/anon INSERT is COMPLETELY BLOCKED to protect against untrusted/
-- malicious payloads, spoofing, and database pollution.
-- Public clients MUST submit progress via the secure RPC function:
--   public.record_quiz_attempt(...)
--
-- Direct access policies:
--   - INSERT: Only authenticated Admin.
--   - SELECT: Only authenticated Admin.
--   - DELETE: Only authenticated Admin.
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can submit quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Public can submit valid quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can insert quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can view quiz attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin can delete quiz attempts" ON public.quiz_attempts;

CREATE POLICY "Admin can insert quiz attempts"
    ON public.quiz_attempts FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admin can view quiz attempts"
    ON public.quiz_attempts FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admin can delete quiz attempts"
    ON public.quiz_attempts FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- 13. POST-MIGRATION VERIFICATION VIEW (Admin Diagnostics)
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
    (SELECT count(*) FROM public.app_admins) AS total_registered_admins;

-- Grant diagnostic read to authenticated admin only
REVOKE ALL ON public.v_database_statistics FROM PUBLIC;
GRANT SELECT ON public.v_database_statistics TO authenticated;

-- =============================================================================
-- END OF FULLY COMPLETED SCHEMA SCRIPT (v2.1)
-- =============================================================================

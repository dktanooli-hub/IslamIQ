-- =============================================================================
-- IslamIQ Supabase Database Schema & Row-Level Security (RLS) Migration Script
-- Project: https://udlunwwubmskgdbbjwee.supabase.co
-- Designed for: IslamIQ Web & Android Progressive Web Application
-- Security: Zero-Trust RLS, Admin Server-Side JWT Validation
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. ADMIN AUTHORIZATION & ROLES TABLE
-- =============================================================================
-- Maps authenticated users or email addresses to administrative roles.
CREATE TABLE IF NOT EXISTS public.app_admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed designated primary administrator
INSERT INTO public.app_admins (email, role)
VALUES ('dk.tanooli97@gmail.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Security Definer Function to verify whether caller is an authorized Admin.
-- This function runs with elevated database privileges to check the user's JWT
-- against the app_admins registry and primary admin email securely on the server.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.app_admins
    WHERE LOWER(email) = LOWER(COALESCE(auth.jwt() ->> 'email', ''))
  ) OR (
    LOWER(COALESCE(auth.jwt() ->> 'email', '')) = 'dk.tanooli97@gmail.com'
  );
$$;

-- =============================================================================
-- 2. QUIZ QUESTIONS TABLE (Adult & Kids)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id TEXT PRIMARY KEY,
    question_urdu TEXT NOT NULL,
    question_en TEXT NOT NULL,
    options_urdu JSONB NOT NULL DEFAULT '[]'::jsonb,
    options_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    correct_index INTEGER NOT NULL DEFAULT 0,
    explanation_urdu TEXT NOT NULL DEFAULT '',
    explanation_en TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    difficulty TEXT NOT NULL DEFAULT 'beginner',
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

-- =============================================================================
-- 3. QURAN VERSES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quran_verses (
    id TEXT PRIMARY KEY,
    arabic TEXT NOT NULL,
    translation_urdu TEXT NOT NULL,
    translation_en TEXT NOT NULL,
    surah_name_arabic TEXT NOT NULL DEFAULT '',
    surah_name_en TEXT NOT NULL DEFAULT '',
    surah_number INTEGER NOT NULL DEFAULT 1,
    ayah_number INTEGER NOT NULL DEFAULT 1,
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
-- 4. AUTHENTIC HADITHS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.hadiths (
    id TEXT PRIMARY KEY,
    arabic TEXT NOT NULL,
    text_urdu TEXT NOT NULL,
    text_en TEXT NOT NULL,
    narrator TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL,
    hadith_number TEXT NOT NULL DEFAULT '',
    grade TEXT NOT NULL DEFAULT 'Sahih',
    lesson_urdu TEXT,
    lesson_en TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hadiths_source ON public.hadiths(source);

-- =============================================================================
-- 5. MASNOON DUAS TABLE
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

-- =============================================================================
-- 6. ISLAMIC REMINDERS TABLE
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
-- 7. VERIFIED ISLAMIC Q&A TABLE (Islamic Q&A Hub)
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
-- 8. SYSTEM TAXONOMY & CATEGORIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- 9. QUIZ ATTEMPTS & PROGRESS LOGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id TEXT PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    date TEXT NOT NULL,
    mode TEXT NOT NULL DEFAULT 'adult',
    difficulty TEXT NOT NULL DEFAULT 'beginner',
    category TEXT NOT NULL DEFAULT 'General',
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 5,
    accuracy NUMERIC NOT NULL DEFAULT 0,
    user_name TEXT NOT NULL DEFAULT 'Seeker',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_timestamp ON public.quiz_attempts(timestamp DESC);

-- =============================================================================
-- 10. REAL-TIME REPLICATION
-- =============================================================================
-- Add tables to supabase_realtime publication to enable instant client updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_questions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quran_verses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hadiths;
ALTER PUBLICATION supabase_realtime ADD TABLE public.duas;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reminders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.categories;

-- =============================================================================
-- 11. ROW-LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on every table
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
-- Policies for: app_admins
-- -----------------------------------------------------------------------------
CREATE POLICY "Admins can view admins list"
    ON public.app_admins FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Primary Admin can manage admins"
    ON public.app_admins FOR ALL
    TO authenticated
    USING (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: quiz_questions
-- -----------------------------------------------------------------------------
-- Public / anon users can read questions for interactive study and quizzes
CREATE POLICY "Public can view quiz questions"
    ON public.quiz_questions FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only verified Admin can create, modify, or delete questions
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
-- Policies for: quran_verses
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view quran verses"
    ON public.quran_verses FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage quran verses"
    ON public.quran_verses FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: hadiths
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view hadiths"
    ON public.hadiths FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage hadiths"
    ON public.hadiths FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: duas
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view duas"
    ON public.duas FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage duas"
    ON public.duas FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: reminders
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view reminders"
    ON public.reminders FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage reminders"
    ON public.reminders FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: verified_qas
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view verified qas"
    ON public.verified_qas FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage verified qas"
    ON public.verified_qas FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: categories
-- -----------------------------------------------------------------------------
CREATE POLICY "Public can view categories"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Admin can manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- Policies for: quiz_attempts
-- -----------------------------------------------------------------------------
-- Any user can submit their completed quiz progress
CREATE POLICY "Public can submit quiz attempts"
    ON public.quiz_attempts FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only Admin can review, audit or clear quiz attempts
CREATE POLICY "Admin can view quiz attempts"
    ON public.quiz_attempts FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admin can delete quiz attempts"
    ON public.quiz_attempts FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- END OF MIGRATION SCRIPT
-- =============================================================================

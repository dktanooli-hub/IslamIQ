-- =============================================================================
-- Migration: Public Scholars Library Table & Zero-Trust RLS Policies
-- File: supabase/migrations/20261024_create_scholar_qa_library.sql
-- Description:
--   Creates the public.scholar_qa_library table for admin-managed Islamic Q&A.
--   Enforces Row Level Security (RLS) such that:
--     - Anonymous visitors and non-admin users can ONLY SELECT published records.
--     - Drafts, unpublished records, and admin metadata are strictly hidden.
--     - Only authenticated admins (verified via public.is_admin()) can INSERT, UPDATE, or DELETE.
--   Fully idempotent and safe to run multiple times.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.scholar_qa_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    references_details TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT 'General',
    language TEXT NOT NULL DEFAULT 'english' CHECK (language IN ('english', 'urdu')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    views_count INTEGER NOT NULL DEFAULT 0 CHECK (views_count >= 0),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    
    -- Unicode & Content Length Validation
    CONSTRAINT chk_scholar_qa_title_length CHECK (length(btrim(title)) >= 3 AND length(title) <= 300),
    CONSTRAINT chk_scholar_qa_question_length CHECK (length(btrim(question)) >= 5 AND length(question) <= 6000),
    CONSTRAINT chk_scholar_qa_answer_length CHECK (length(btrim(answer)) >= 5 AND length(answer) <= 20000),
    CONSTRAINT chk_scholar_qa_slug_length CHECK (length(btrim(slug)) >= 3 AND length(slug) <= 150)
);

-- Optimized Performance Indexes
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_status ON public.scholar_qa_library(status);
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_slug ON public.scholar_qa_library(slug);
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_category ON public.scholar_qa_library(category);
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_language ON public.scholar_qa_library(language);
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_published_at ON public.scholar_qa_library(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_scholar_qa_library_created_at ON public.scholar_qa_library(created_at DESC);

-- =============================================================================
-- DCL PERMISSIONS & ZERO-TRUST ROW-LEVEL SECURITY (RLS)
-- =============================================================================

GRANT SELECT ON public.scholar_qa_library TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.scholar_qa_library TO authenticated;

ALTER TABLE public.scholar_qa_library ENABLE ROW LEVEL SECURITY;

-- 1. Anonymous visitors: Can ONLY read published entries
DROP POLICY IF EXISTS "Anon can view published scholar qas" ON public.scholar_qa_library;
CREATE POLICY "Anon can view published scholar qas"
    ON public.scholar_qa_library FOR SELECT
    TO anon
    USING (status = 'published');

-- 2. Authenticated users: Can read published entries, or all entries (including drafts) if verified Admin
DROP POLICY IF EXISTS "Authenticated can view scholar qas" ON public.scholar_qa_library;
CREATE POLICY "Authenticated can view scholar qas"
    ON public.scholar_qa_library FOR SELECT
    TO authenticated
    USING (status = 'published' OR public.is_admin());

-- 3. Only verified admins may insert new entries
DROP POLICY IF EXISTS "Admin can insert scholar qas" ON public.scholar_qa_library;
CREATE POLICY "Admin can insert scholar qas"
    ON public.scholar_qa_library FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- 4. Only verified admins may update existing entries
DROP POLICY IF EXISTS "Admin can update scholar qas" ON public.scholar_qa_library;
CREATE POLICY "Admin can update scholar qas"
    ON public.scholar_qa_library FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 5. Only verified admins may delete entries
DROP POLICY IF EXISTS "Admin can delete scholar qas" ON public.scholar_qa_library;
CREATE POLICY "Admin can delete scholar qas"
    ON public.scholar_qa_library FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- REAL-TIME REPLICATION
-- =============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
          AND schemaname = 'public' 
          AND tablename = 'scholar_qa_library'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.scholar_qa_library;
    END IF;
END $$;

-- =============================================================================
-- SEED FOUNDATION DATA (Idempotent initial verified published rulings)
-- =============================================================================
INSERT INTO public.scholar_qa_library (
    slug,
    title,
    question,
    answer,
    references_details,
    category,
    language,
    status,
    published_at
) VALUES 
(
    'is-fasting-valid-if-one-forgets-intention-before-fajr',
    'Is a Voluntary or Obligatory Fast Valid If Intention (Niyyah) Was Not Formed Before Fajr?',
    'If a person wakes up after Fajr without having made the intention to fast the night before, is their fast legally valid in Islamic Shari''ah?',
    'There is an important distinction between obligatory (Fard) fasts, such as those in Ramadan, and voluntary (Nafl) fasts:

1. Obligatory Fast (Ramadan, Qada, or Kaffarah):
The majority of classical scholars (Maliki, Shafi''i, and Hanbali) hold that for an obligatory fast, the intention (Niyyah) must be formed at night before the break of true dawn (Fajr). In the Hanafi school, for Ramadan specifically, the intention may be formed up until Dahwat al-Kubra (Islamic midday, approximately an hour before Dhuhr), provided one has not consumed food, drink, or engaged in any invalidator since dawn. However, to be safe and observe all schools, one should always form the intention before Fajr.

2. Voluntary Fast (Nafl):
All four major schools agree that for voluntary fasts, the intention may be formed during the morning before midday, provided the person has not eaten, drunk, or engaged in anything that breaks the fast since Fajr, in accordance with the authentic practice of Prophet Muhammad ﷺ.',
    'Hadith References:
1. Sahih Muslim 1154: Mother of the Believers Aisha (RA) reported that the Prophet ﷺ came to her one morning and asked: "Do you have anything [to eat]?" She said: "No." He said: "Then indeed I am fasting."
2. Sunan Abi Dawud 2454, Jami` at-Tirmidhi 730: Hafsah (RA) reported that the Prophet ﷺ said: "Whoever does not determine to fast before dawn has no fast [for obligatory fasts]."',
    'Sawm',
    'english',
    'published',
    pg_catalog.now()
),
(
    'forgetting-rakat-in-salah-sujud-sahw',
    'What Should a Worshipper Do If They Forget a Rakat or Posture in Salah?',
    'If someone is praying Salah and becomes uncertain whether they prayed 3 or 4 rakats, how should they rectify the prayer according to the Sunnah?',
    'When uncertainty (Shakk) occurs during Salah regarding the number of rakats performed:

1. Build upon Certainty (The Minimum Number):
The Prophet ﷺ established the golden rule that one should discard doubt and base the prayer upon what is certain (which is the smaller number). If you are uncertain whether you prayed 3 or 4 rakats, consider it 3 rakats, perform the 4th rakat, sit for Tashahhud, and perform Sujud as-Sahw (two prostrations of forgetfulness).

2. Timing of Sujud as-Sahw:
According to authentic traditions, Sujud as-Sahw can be performed either before the Salam or immediately after the Salam, followed by another Salam. Both methods are authentic and valid according to the Sunnah.',
    'Hadith References:
1. Sahih Muslim 571: Abu Sa''id al-Khudri (RA) narrated that the Messenger of Allah ﷺ said: "When one of you is in doubt during prayer and does not know whether he has prayed three or four rakats, let him cast away doubt and build upon what is certain, then perform two prostrations before uttering the Salam."
2. Sahih al-Bukhari 401, 1226: Hadith of Dhu al-Yadayn regarding rectifying additions or omissions in prayer.',
    'Salah',
    'english',
    'published',
    pg_catalog.now()
),
(
    'taharah-wudu-nail-polish-and-barrier-rules',
    'Does Nail Polish or Water-Resistant Cosmetics Invalidate Wudu (Ablution)?',
    'Can a Muslim woman or man perform Wudu while wearing waterproof nail polish, makeup, or oil-based barriers on the nails and skin?',
    'In Islamic jurisprudence, a foundational condition (Shart) for the validity of Wudu is that water must physically make contact with and wash the required limbs, including the entirety of the face, arms including elbows, wiping the head, and feet including ankles (Surah Al-Ma''idah 5:6).

1. Impermeable Barriers:
Standard commercial nail polish forms a waterproof plastic coating that prevents water from reaching the nail bed. Therefore, Wudu performed over non-permeable nail polish is invalid by consensus of the four Sunni schools of jurisprudence.

2. Permeable / Halal Polishes:
Cosmetics marketed as "breathable" or "halal" are only valid if scientifically proven to allow water to permeate through to the nail within the standard time of ritual washing. Many scholars advise removing any chemical coating before prayer to ensure certain validity.',
    'Quranic & Scholarly References:
1. Surah Al-Ma''idah (5:6): "O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles..."
2. Al-Majmu'' Sharh al-Muhadhdhab (Imam an-Nawawi, 1/492): "If there is upon any part of the limb wax, dough, pitch, or similar substance which prevents water from reaching the surface of the skin, the purification is not valid."',
    'Taharah',
    'english',
    'published',
    pg_catalog.now()
)
ON CONFLICT (slug) DO NOTHING;

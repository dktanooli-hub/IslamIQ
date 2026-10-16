import { supabase, isSupabaseConfigured } from '../supabase/config';
import {
  QuizQuestion,
  QuranVerse,
  HadithItem,
  DuaItem,
  IslamicReminder,
  QuizAttemptRecord,
  VerifiedQA
} from '../types';

export interface DatabaseStats {
  totalQuizQuestions: number;
  kidsQuizQuestions: number;
  adultQuizQuestions: number;
  totalQuranVerses: number;
  totalHadiths: number;
  totalDuas: number;
  totalReminders: number;
  totalVerifiedQAs: number;
  totalCategories: number;
  totalRegisteredAdmins: number;
}

/**
 * =============================================================================
 * IslamIQ Supabase Service Layer (v2.0 - Production Data Layer)
 * =============================================================================
 * Mirrors and expands the interface of firestoreService.ts.
 * Communicates with PostgreSQL tables and Realtime channels in Supabase.
 * Strictly adheres to schema.sql naming (e.g., public.app_admins, public.verified_qas).
 */

export const SupabaseService = {
  // ---------------------------------------------------------------------------
  // 1. QUIZ QUESTIONS (Adults & Kids)
  // ---------------------------------------------------------------------------
  async getQuestions(): Promise<QuizQuestion[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
  console.error('[Supabase] getQuestions failed:', {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  });
  return [];
}

console.info(
  '[Supabase] getQuestions success:',
  (data || []).length,
  'rows'
);

      return (data || []).map((row: any) => ({
        id: row.id,
        questionUrdu: row.question_urdu,
        questionEn: row.question_en,
        optionsUrdu: row.options_urdu || [],
        optionsEn: row.options_en || [],
        correctIndex: row.correct_index,
        explanationUrdu: row.explanation_urdu || '',
        explanationEn: row.explanation_en || '',
        category: row.category,
        difficulty: row.difficulty,
        forKids: !!row.for_kids,
        kidsHintUrdu: row.kids_hint_urdu,
        kidsHintEn: row.kids_hint_en,
        isActive: row.is_active !== false
      }));
    } catch (err: any) {
      console.warn('[Supabase] getQuestions exception:', err?.message || err);
      return [];
    }
  },

  listenQuestions(
    callback: (questions: QuizQuestion[]) => void,
    onError?: (error: any) => void
  ): () => void {
    if (!isSupabaseConfigured()) {
  console.error('[IslamIQ Debug] Supabase is NOT configured');
  return [];
}

console.info('[IslamIQ Debug] Supabase is configured');

try {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .order('id', { ascending: true });
    }

    try {
      const channel = supabase
        .channel('quiz_questions_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'quiz_questions' },
          async () => {
            const updated = await this.getQuestions();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR' && onError) {
            onError(new Error('Supabase Realtime subscription error for quiz_questions'));
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err: any) {
      if (onError) onError(err);
      return () => {};
    }
  },

  async saveQuestion(question: QuizQuestion): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: question.id,
        question_urdu: question.questionUrdu,
        question_en: question.questionEn,
        options_urdu: question.optionsUrdu,
        options_en: question.optionsEn,
        correct_index: question.correctIndex,
        explanation_urdu: question.explanationUrdu,
        explanation_en: question.explanationEn,
        category: question.category,
        difficulty: question.difficulty,
        for_kids: !!question.forKids,
        kids_hint_urdu: question.kidsHintUrdu || null,
        kids_hint_en: question.kidsHintEn || null,
        is_active: question.isActive !== false,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('quiz_questions')
        .upsert(row, { onConflict: 'id' });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to save question' };
    }
  },

  async deleteQuestion(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to delete question' };
    }
  },

  // ---------------------------------------------------------------------------
  // 2. QURAN VERSES
  // ---------------------------------------------------------------------------
  async getQuranVerses(): Promise<QuranVerse[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('quran_verses')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getQuranVerses notice:', error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        arabic: row.arabic,
        translationUrdu: row.translation_urdu,
        translationEn: row.translation_en,
        surahNameArabic: row.surah_name_arabic,
        surahNameEn: row.surah_name_en,
        surahNumber: row.surah_number,
        ayahNumber: row.ayah_number,
        theme: row.theme,
        explanationUrdu: row.explanation_urdu,
        explanationEn: row.explanation_en,
        lessonUrdu: row.lesson_urdu,
        lessonEn: row.lesson_en,
        reference: row.reference
      }));
    } catch {
      return [];
    }
  },

  listenQuranVerses(
    callback: (verses: QuranVerse[]) => void
  ): () => void {
    if (!isSupabaseConfigured()) return () => {};
    try {
      const channel = supabase
        .channel('quran_verses_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'quran_verses' },
          async () => {
            const updated = await this.getQuranVerses();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {};
    }
  },

  async saveQuranVerse(verse: QuranVerse): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: verse.id,
        arabic: verse.arabic,
        translation_urdu: verse.translationUrdu,
        translation_en: verse.translationEn,
        surah_name_arabic: verse.surahNameArabic || '',
        surah_name_en: verse.surahNameEn || '',
        surah_number: verse.surahNumber || 1,
        ayah_number: verse.ayahNumber || 1,
        theme: verse.theme || 'General',
        explanation_urdu: verse.explanationUrdu || null,
        explanation_en: verse.explanationEn || null,
        lesson_urdu: verse.lessonUrdu || null,
        lesson_en: verse.lessonEn || null,
        reference: verse.reference || '',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('quran_verses')
        .upsert(row, { onConflict: 'id' });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  async deleteQuranVerse(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('quran_verses').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 3. HADITHS
  // ---------------------------------------------------------------------------
  async getHadiths(): Promise<HadithItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('hadiths')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getHadiths notice:', error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        arabic: row.arabic,
        textUrdu: row.text_urdu,
        textEn: row.text_en,
        narrator: row.narrator,
        source: row.source,
        hadithNumber: row.hadith_number,
        grade: row.grade,
        lessonUrdu: row.lesson_urdu,
        lessonEn: row.lesson_en
      }));
    } catch {
      return [];
    }
  },

  listenHadiths(callback: (hadiths: HadithItem[]) => void): () => void {
    if (!isSupabaseConfigured()) return () => {};
    try {
      const channel = supabase
        .channel('hadiths_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'hadiths' },
          async () => {
            const updated = await this.getHadiths();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {};
    }
  },

  async saveHadith(hadith: HadithItem): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: hadith.id,
        arabic: hadith.arabic,
        text_urdu: hadith.textUrdu,
        text_en: hadith.textEn,
        narrator: hadith.narrator || '',
        source: hadith.source || '',
        hadith_number: hadith.hadithNumber || '',
        grade: hadith.grade || 'Sahih',
        lesson_urdu: hadith.lessonUrdu || null,
        lesson_en: hadith.lessonEn || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('hadiths').upsert(row, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  async deleteHadith(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('hadiths').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 4. DUAS
  // ---------------------------------------------------------------------------
  async getDuas(): Promise<DuaItem[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('duas')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getDuas notice:', error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        titleEn: row.title_en,
        titleUrdu: row.title_urdu,
        arabic: row.arabic,
        transliteration: row.transliteration,
        translationUrdu: row.translation_urdu,
        translationEn: row.translation_en,
        reference: row.reference,
        occasionUrdu: row.occasion_urdu,
        occasionEn: row.occasion_en
      }));
    } catch {
      return [];
    }
  },

  listenDuas(callback: (duas: DuaItem[]) => void): () => void {
    if (!isSupabaseConfigured()) return () => {};
    try {
      const channel = supabase
        .channel('duas_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'duas' },
          async () => {
            const updated = await this.getDuas();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {};
    }
  },

  async saveDua(dua: DuaItem): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: dua.id,
        title_en: dua.titleEn,
        title_urdu: dua.titleUrdu,
        arabic: dua.arabic,
        transliteration: dua.transliteration || '',
        translation_urdu: dua.translationUrdu,
        translation_en: dua.translationEn,
        reference: dua.reference,
        occasion_urdu: dua.occasionUrdu || '',
        occasion_en: dua.occasionEn || '',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('duas').upsert(row, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  async deleteDua(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('duas').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 5. REMINDERS
  // ---------------------------------------------------------------------------
  async getReminders(): Promise<IslamicReminder[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getReminders notice:', error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        titleEn: row.title_en,
        titleUrdu: row.title_urdu,
        bodyEn: row.body_en,
        bodyUrdu: row.body_urdu,
        category: row.category,
        practicalTipUrdu: row.practical_tip_urdu,
        practicalTipEn: row.practical_tip_en,
        reference: row.reference
      }));
    } catch {
      return [];
    }
  },

  listenReminders(callback: (reminders: IslamicReminder[]) => void): () => void {
    if (!isSupabaseConfigured()) return () => {};
    try {
      const channel = supabase
        .channel('reminders_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'reminders' },
          async () => {
            const updated = await this.getReminders();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {};
    }
  },

  async saveReminder(reminder: IslamicReminder): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: reminder.id,
        title_en: reminder.titleEn,
        title_urdu: reminder.titleUrdu,
        body_en: reminder.bodyEn,
        body_urdu: reminder.bodyUrdu,
        category: reminder.category || 'General',
        practical_tip_urdu: reminder.practicalTipUrdu || null,
        practical_tip_en: reminder.practicalTipEn || null,
        reference: reminder.reference || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('reminders').upsert(row, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  async deleteReminder(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('reminders').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 6. VERIFIED ISLAMIC Q&A HUB (public.verified_qas)
  // ---------------------------------------------------------------------------
  async getVerifiedQAs(): Promise<VerifiedQA[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('verified_qas')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getVerifiedQAs notice:', error.message);
        return [];
      }

      return (data || []).map((row: any) => ({
        id: row.id,
        questionUrdu: row.question_urdu,
        questionEn: row.question_en,
        answerUrdu: row.answer_urdu,
        answerEn: row.answer_en,
        category: row.category,
        reference: row.reference,
        tags: Array.isArray(row.tags) ? row.tags : [],
        explanationUrdu: row.explanation_urdu || undefined,
        explanationEn: row.explanation_en || undefined,
        relatedGuidePath: row.related_guide_path || undefined,
        relatedGuideTitleEn: row.related_guide_title_en || undefined,
        relatedGuideTitleUrdu: row.related_guide_title_urdu || undefined
      }));
    } catch (err: any) {
      console.warn('[Supabase] getVerifiedQAs exception:', err?.message || err);
      return [];
    }
  },

  listenVerifiedQAs(callback: (qas: VerifiedQA[]) => void): () => void {
    if (!isSupabaseConfigured()) return () => {};
    try {
      const channel = supabase
        .channel('verified_qas_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'verified_qas' },
          async () => {
            const updated = await this.getVerifiedQAs();
            if (updated.length > 0) callback(updated);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch {
      return () => {};
    }
  },

  async saveVerifiedQA(qa: VerifiedQA): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const row = {
        id: qa.id,
        question_urdu: qa.questionUrdu,
        question_en: qa.questionEn,
        answer_urdu: qa.answerUrdu,
        answer_en: qa.answerEn,
        category: qa.category || 'General',
        reference: qa.reference,
        tags: qa.tags || [],
        explanation_urdu: qa.explanationUrdu || null,
        explanation_en: qa.explanationEn || null,
        related_guide_path: qa.relatedGuidePath || null,
        related_guide_title_en: qa.relatedGuideTitleEn || null,
        related_guide_title_urdu: qa.relatedGuideTitleUrdu || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('verified_qas').upsert(row, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to save QA record' };
    }
  },

  async deleteVerifiedQA(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('verified_qas').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 7. CATEGORIES (public.categories)
  // ---------------------------------------------------------------------------
  async getCategories(): Promise<string[] | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name', { ascending: true });

      if (error || !data) return null;
      return data.map((r: any) => r.name);
    } catch {
      return null;
    }
  },

  async saveCategories(list: string[]): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };
    try {
      const rows = list.map(name => ({
        id: `cat-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'id' });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message };
    }
  },

  // ---------------------------------------------------------------------------
  // 7B. SAFE ONE-TIME MIGRATION UTILITY
  // Migrates existing local Admin content to Supabase tables in idempotent batches.
  // Requires administrator authorization (RLS enforced).
  // ---------------------------------------------------------------------------
  async migrateLocalContentToSupabase(data: {
    questions?: QuizQuestion[];
    quranVerses?: QuranVerse[];
    hadiths?: HadithItem[];
    duas?: DuaItem[];
    reminders?: IslamicReminder[];
    categories?: string[];
    verifiedQAs?: VerifiedQA[];
  }): Promise<{ success: boolean; migratedCount: number; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, migratedCount: 0, error: 'Supabase is not configured' };
    }
    try {
      let count = 0;

      // 1. Questions
      if (Array.isArray(data.questions) && data.questions.length > 0) {
        const rows = data.questions.map(q => ({
          id: q.id,
          question_urdu: q.questionUrdu,
          question_en: q.questionEn,
          options_urdu: q.optionsUrdu,
          options_en: q.optionsEn,
          correct_index: q.correctIndex,
          explanation_urdu: q.explanationUrdu,
          explanation_en: q.explanationEn,
          category: q.category,
          difficulty: q.difficulty,
          for_kids: !!q.forKids,
          kids_hint_urdu: q.kidsHintUrdu || null,
          kids_hint_en: q.kidsHintEn || null,
          is_active: q.isActive !== false,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('quiz_questions').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 2. Quran Verses
      if (Array.isArray(data.quranVerses) && data.quranVerses.length > 0) {
        const rows = data.quranVerses.map(verse => ({
          id: verse.id,
          arabic: verse.arabic,
          translation_urdu: verse.translationUrdu,
          translation_en: verse.translationEn,
          surah_name_arabic: verse.surahNameArabic || '',
          surah_name_en: verse.surahNameEn || '',
          surah_number: verse.surahNumber || 1,
          ayah_number: verse.ayahNumber || 1,
          theme: verse.theme || 'General',
          explanation_urdu: verse.explanationUrdu || null,
          explanation_en: verse.explanationEn || null,
          lesson_urdu: verse.lessonUrdu || null,
          lesson_en: verse.lessonEn || null,
          reference: verse.reference || '',
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('quran_verses').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 3. Hadiths
      if (Array.isArray(data.hadiths) && data.hadiths.length > 0) {
        const rows = data.hadiths.map(hadith => ({
          id: hadith.id,
          arabic: hadith.arabic,
          text_urdu: hadith.textUrdu,
          text_en: hadith.textEn,
          narrator: hadith.narrator || '',
          source: hadith.source || '',
          hadith_number: hadith.hadithNumber || '',
          grade: hadith.grade || 'Sahih',
          lesson_urdu: hadith.lessonUrdu || null,
          lesson_en: hadith.lessonEn || null,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('hadiths').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 4. Duas
      if (Array.isArray(data.duas) && data.duas.length > 0) {
        const rows = data.duas.map(dua => ({
          id: dua.id,
          title_en: dua.titleEn,
          title_urdu: dua.titleUrdu,
          arabic: dua.arabic,
          transliteration: dua.transliteration || '',
          translation_urdu: dua.translationUrdu,
          translation_en: dua.translationEn,
          reference: dua.reference,
          occasion_urdu: dua.occasionUrdu || '',
          occasion_en: dua.occasionEn || '',
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('duas').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 5. Reminders
      if (Array.isArray(data.reminders) && data.reminders.length > 0) {
        const rows = data.reminders.map(reminder => ({
          id: reminder.id,
          title_en: reminder.titleEn,
          title_urdu: reminder.titleUrdu,
          body_en: reminder.bodyEn,
          body_urdu: reminder.bodyUrdu,
          category: reminder.category || 'General',
          practical_tip_urdu: reminder.practicalTipUrdu || null,
          practical_tip_en: reminder.practicalTipEn || null,
          reference: reminder.reference || null,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('reminders').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 6. Categories
      if (Array.isArray(data.categories) && data.categories.length > 0) {
        const rows = data.categories.map(name => ({
          id: `cat-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
          name,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      // 7. Verified Q&As
      if (Array.isArray(data.verifiedQAs) && data.verifiedQAs.length > 0) {
        const rows = data.verifiedQAs.map(qa => ({
          id: qa.id,
          question_urdu: qa.questionUrdu,
          question_en: qa.questionEn,
          answer_urdu: qa.answerUrdu,
          answer_en: qa.answerEn,
          category: qa.category || 'General',
          reference: qa.reference,
          tags: qa.tags || [],
          explanation_urdu: qa.explanationUrdu || null,
          explanation_en: qa.explanationEn || null,
          related_guide_path: qa.relatedGuidePath || null,
          related_guide_title_en: qa.relatedGuideTitleEn || null,
          related_guide_title_urdu: qa.relatedGuideTitleUrdu || null,
          updated_at: new Date().toISOString()
        }));
        const { error } = await supabase.from('verified_qas').upsert(rows, { onConflict: 'id' });
        if (error) throw error;
        count += rows.length;
      }

      return { success: true, migratedCount: count };
    } catch (e: any) {
      return { success: false, migratedCount: 0, error: e?.message || 'Migration to Supabase failed' };
    }
  },

  // ---------------------------------------------------------------------------
  // 8. QUIZ ATTEMPTS & PROGRESS LOGS (public.quiz_attempts)
  // ---------------------------------------------------------------------------
  async logQuizAttempt(attempt: QuizAttemptRecord): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      // 1. Invoke secure server-side RPC function with sanitization, duplicate checks & accuracy bounds
      const { error: rpcError } = await supabase.rpc('record_quiz_attempt', {
        p_id: attempt.id,
        p_timestamp: attempt.timestamp,
        p_date: attempt.date,
        p_mode: attempt.mode,
        p_difficulty: attempt.difficulty,
        p_category: attempt.category,
        p_score: attempt.score,
        p_total_questions: attempt.totalQuestions,
        p_accuracy: attempt.accuracy,
        p_user_name: attempt.userName || 'Seeker'
      });

      if (!rpcError) return true;

      // Direct client inserts are strictly prohibited by zero-trust RLS policies
      console.warn('[Supabase] Quiz attempt submission note:', rpcError.message);
      return false;
    } catch {
      return false;
    }
  },

  async getQuizAttempts(): Promise<QuizAttemptRecord[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error || !data) return [];
      return data.map((row: any) => ({
        id: row.id,
        timestamp: Number(row.timestamp),
        date: row.date,
        mode: row.mode,
        difficulty: row.difficulty,
        category: row.category,
        score: row.score,
        totalQuestions: row.total_questions,
        accuracy: Number(row.accuracy),
        userName: row.user_name
      }));
    } catch {
      return [];
    }
  },

  // ---------------------------------------------------------------------------
  // 9. ADMIN SECURITY & STATISTICAL DIAGNOSTICS (RPC)
  // ---------------------------------------------------------------------------
  /**
   * Calls the secure claim_admin_bootstrap RPC to bind auth.uid() to public.app_admins.
   */
  async claimAdminBootstrap(): Promise<{ success: boolean; message?: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase configuration is not active.' };
    }
    try {
      const { data, error } = await supabase.rpc('claim_admin_bootstrap');
      if (error) {
        return { success: false, error: error.message };
      }
      return {
        success: data?.success !== false,
        message: data?.message || 'Bootstrap claimed successfully'
      };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to claim admin bootstrap' };
    }
  },

  /**
   * Calls public.is_admin() RPC to verify current caller authorization
   */
  async checkIsAdmin(): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) return false;
      return !!data;
    } catch {
      return false;
    }
  },

  /**
   * Calls public.is_super_admin() RPC
   */
  async checkIsSuperAdmin(): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const { data, error } = await supabase.rpc('is_super_admin');
      if (error) return false;
      return !!data;
    } catch {
      return false;
    }
  },

  /**
   * Admin-restricted diagnostic metrics
   */
  async getDatabaseStatistics(): Promise<DatabaseStats | null> {
    if (!isSupabaseConfigured()) return null;
    try {
      const { data, error } = await supabase.rpc('get_database_statistics');
      if (error || !data || data.length === 0) return null;
      const row = data[0];
      return {
        totalQuizQuestions: Number(row.total_quiz_questions || 0),
        kidsQuizQuestions: Number(row.kids_quiz_questions || 0),
        adultQuizQuestions: Number(row.adult_quiz_questions || 0),
        totalQuranVerses: Number(row.total_quran_verses || 0),
        totalHadiths: Number(row.total_hadiths || 0),
        totalDuas: Number(row.total_duas || 0),
        totalReminders: Number(row.total_reminders || 0),
        totalVerifiedQAs: Number(row.total_verified_qas || 0),
        totalCategories: Number(row.total_categories || 0),
        totalRegisteredAdmins: Number(row.total_registered_admins || 0)
      };
    } catch {
      return null;
    }
  }
};

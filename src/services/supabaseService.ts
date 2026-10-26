import { supabase, isSupabaseConfigured } from '../supabase/config';
import {
  QuizQuestion,
  QuranVerse,
  HadithItem,
  DuaItem,
  IslamicReminder,
  QuizAttemptRecord,
  VerifiedQA,
  ScholarInquirySubmission,
  ScholarSubmissionResult,
  PublicScholarInquiry,
  ScholarInquiry,
  ScholarInquiryStatus,
  ScholarQALibraryItem,
  ScholarQAFormData,
  ScholarQALanguage,
  PublicAnsweredInquiry
} from '../types';
import { INITIAL_SCHOLAR_LIBRARY } from '../data/scholarLibraryData';

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

let lastQuestionsError: string | null = null;
let lastQuestionsCount: number = 0;

export const SupabaseService = {
  // Diagnostic method for safe UI inspection
  getLastQuestionsDiagnostic(): { isConfigured: boolean; lastError: string | null; lastCount: number } {
    return {
      isConfigured: isSupabaseConfigured(),
      lastError: lastQuestionsError,
      lastCount: lastQuestionsCount
    };
  },

  // ---------------------------------------------------------------------------
  // 1. QUIZ QUESTIONS (Adults & Kids)
  // ---------------------------------------------------------------------------
  async getQuestions(): Promise<QuizQuestion[]> {
    if (!isSupabaseConfigured()) {
      lastQuestionsError = 'Supabase anon key (VITE_SUPABASE_ANON_KEY) is not active in this build';
      console.warn('[IslamIQ Debug]', lastQuestionsError);
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        lastQuestionsError = error.message;
        console.error('[Supabase] getQuestions query error:', error.message);
        return [];
      }

      lastQuestionsError = null;
      lastQuestionsCount = data ? data.length : 0;

      const parseOptions = (opts: any): string[] => {
        if (Array.isArray(opts)) return opts;
        if (typeof opts === 'string') {
          try {
            const parsed = JSON.parse(opts);
            if (Array.isArray(parsed)) return parsed;
          } catch {}
        }
        return [];
      };

      return (data || []).map((row: any) => ({
        id: String(row.id),
        questionUrdu: row.question_urdu || '',
        questionEn: row.question_en || '',
        optionsUrdu: parseOptions(row.options_urdu),
        optionsEn: parseOptions(row.options_en),
        correctIndex: typeof row.correct_index === 'number' ? row.correct_index : 0,
        explanationUrdu: row.explanation_urdu || '',
        explanationEn: row.explanation_en || '',
        category: row.category || 'General',
        difficulty: row.difficulty || 'beginner',
        forKids: Boolean(row.for_kids),
        kidsHintUrdu: row.kids_hint_urdu || null,
        kidsHintEn: row.kids_hint_en || null,
        isActive: row.is_active !== false,
      }));
    } catch (err: any) {
      lastQuestionsError = err?.message || 'Network error fetching questions';
      console.error('[Supabase] getQuestions exception:', lastQuestionsError);
      return [];
    }
  },

listenQuestions(
  callback: (questions: QuizQuestion[]) => void,
  onError?: (error: any) => void
): () => void {
  if (!isSupabaseConfigured()) {
    onError?.(new Error('Supabase is not configured'));
    return () => {};
  }

  try {
    const channel = supabase
      .channel('quiz_questions_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quiz_questions' },
        async () => {
          try {
            const updated = await this.getQuestions();
            callback(updated);
          } catch (err) {
            onError?.(err);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          onError?.(
            new Error('Supabase Realtime subscription error for quiz_questions')
          );
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  } catch (err: any) {
    onError?.(err);
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
  },

  // ---------------------------------------------------------------------------
  // 10. ASK A SCHOLAR (Offline Scholar Consultation Architecture)
  // ---------------------------------------------------------------------------

  /**
   * Submit an Islamic inquiry securely without requiring account registration.
   * Invokes public.submit_scholar_inquiry RPC.
   * Returns generated inquiryNumber and the one-time high-entropy accessToken.
   */
  async submitScholarInquiry(
    submission: ScholarInquirySubmission
  ): Promise<{ success: boolean; data?: ScholarSubmissionResult; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Database service is currently unconfigured' };
    }

    try {
      const { data, error } = await supabase.rpc('submit_scholar_inquiry', {
        p_subject: submission.subject,
        p_question_text: submission.questionText,
        p_category: submission.category || 'General',
        p_madhhab_preference: submission.madhhabPreference || 'General',
        p_seeker_name: submission.seekerName || null,
        p_seeker_email: submission.seekerEmail || null,
        p_share_publicly: submission.sharePublicly ?? false
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || data.length === 0) {
        return { success: false, error: 'Failed to record inquiry. Please retry.' };
      }

      const row = data[0];
      return {
        success: true,
        data: {
          inquiryNumber: row.inquiry_number,
          accessToken: row.access_token,
          status: row.status as ScholarInquiryStatus,
          createdAt: row.created_at
        }
      };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to submit inquiry' };
    }
  },

  /**
   * Look up an inquiry privately using the inquiryNumber and the raw accessToken.
   * Invokes public.get_scholar_inquiry RPC.
   * Returns ONLY public-safe projected fields.
   */
  async getScholarInquiry(
    inquiryNumber: string,
    accessToken: string
  ): Promise<{ success: boolean; data?: PublicScholarInquiry | null; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Database service is currently unconfigured' };
    }

    try {
      const { data, error } = await supabase.rpc('get_scholar_inquiry', {
        p_inquiry_number: inquiryNumber.trim().toUpperCase(),
        p_access_token: accessToken.trim()
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (!data || data.length === 0) {
        return { success: true, data: null }; // Not found or invalid credentials
      }

      const row = data[0];
      const inquiry: PublicScholarInquiry = {
        inquiryNumber: row.inquiry_number,
        category: row.category,
        madhhabPreference: row.madhhab_preference,
        subject: row.subject,
        questionText: row.question_text,
        status: row.status as ScholarInquiryStatus,
        scholarName: row.scholar_name,
        scholarQualification: row.scholar_qualification,
        answerText: row.answer_text,
        answerArabic: row.answer_arabic,
        reference: row.reference || row.references || null,
        references: row.reference || row.references || null,
        rejectionReason: row.rejection_reason,
        createdAt: row.created_at,
        sentToScholarAt: row.sent_to_scholar_at,
        answeredAt: row.answered_at
      };

      return { success: true, data: inquiry };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to retrieve inquiry' };
    }
  },

  /**
   * Admin-only: Fetch all scholar inquiries with optional status filtering.
   * Enforced via Row Level Security (public.is_admin()).
   */
  async adminGetScholarInquiries(
    statusFilter?: ScholarInquiryStatus | 'all'
  ): Promise<{ success: boolean; data?: ScholarInquiry[]; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Database service is currently unconfigured' };
    }

    try {
      let query = supabase
        .from('scholar_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      const inquiries: ScholarInquiry[] = (data || []).map((row: any) => ({
        id: row.id,
        inquiryNumber: row.inquiry_number,
        category: row.category,
        madhhabPreference: row.madhhab_preference,
        subject: row.subject,
        questionText: row.question_text,
        seekerName: row.seeker_name,
        seekerEmail: row.seeker_email,
        userId: row.user_id,
        sharePublicly: Boolean(row.share_publicly),
        consentTimestamp: row.consent_timestamp,
        publishedAt: row.published_at,
        status: row.status as ScholarInquiryStatus,
        scholarName: row.scholar_name,
        scholarQualification: row.scholar_qualification,
        answerText: row.answer_text,
        answerArabic: row.answer_arabic,
        reference: row.reference || row.references || null,
        references: row.reference || row.references || null,
        adminNotes: row.admin_notes,
        rejectionReason: row.rejection_reason,
        createdAt: row.created_at,
        sentToScholarAt: row.sent_to_scholar_at,
        answeredAt: row.answered_at,
        updatedAt: row.updated_at
      }));

      return { success: true, data: inquiries };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to fetch scholar inquiries' };
    }
  },

  /**
   * Admin-only: Update inquiry status, transcription of offline scholar fatwa, or admin notes.
   * Enforces server-side transition checks and workflow timestamps.
   */
  async adminUpdateScholarInquiry(
    id: string,
    updates: Partial<{
      status: ScholarInquiryStatus;
      scholarName: string | null;
      scholarQualification: string | null;
      answerText: string | null;
      answerArabic: string | null;
      reference: string | null;
      references: string | null;
      adminNotes: string | null;
      rejectionReason: string | null;
      sentToScholarAt: string | null;
      answeredAt: string | null;
    }>
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Database service is currently unconfigured' };
    }

    try {
      // Exclusively invoke secure admin RPC function:
      // Validates admin role via public.is_admin(), prevents workflow skips,
      // handles transition timestamps automatically, and prevents premature publishing.
      const { error } = await supabase.rpc('admin_update_scholar_inquiry', {
        p_id: id,
        p_status: updates.status ?? null,
        p_scholar_name: updates.scholarName ?? null,
        p_scholar_qualification: updates.scholarQualification ?? null,
        p_answer_text: updates.answerText ?? null,
        p_answer_arabic: updates.answerArabic ?? null,
        p_reference: updates.reference ?? updates.references ?? null,
        p_admin_notes: updates.adminNotes ?? null,
        p_rejection_reason: updates.rejectionReason ?? null
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update scholar inquiry' };
    }
  },

  /**
   * Admin-only: Deletion of scholar inquiries is unsupported via database RPC.
   * Direct table deletion is disabled to preserve audit integrity. Inquiries that cannot
   * be answered should be closed using adminUpdateScholarInquiry with status='rejected'.
   */
  async adminDeleteScholarInquiry(_id: string): Promise<{ success: boolean; error?: string }> {
    return {
      success: false,
      error: 'Direct deletion of scholar inquiries is disabled to maintain audit integrity. Please reject the inquiry using adminUpdateScholarInquiry with a rejection reason.'
    };
  },

  /**
   * Fetch sanitized public answered inquiries where the user granted public-sharing consent.
   * Invokes public.get_public_answered_scholar_inquiries RPC.
   * Excludes identifying details (seekerName, email, inquiryNumber, access tokens, admin notes).
   */
  async getPublicAnsweredScholarInquiries(options?: {
    limit?: number;
    offset?: number;
    category?: string;
    search?: string;
  }): Promise<{ success: boolean; data: PublicAnsweredInquiry[]; totalCount: number; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true, data: [], totalCount: 0 };
    }

    try {
      const { data, error } = await supabase.rpc('get_public_answered_scholar_inquiries', {
        p_limit: options?.limit ?? 20,
        p_offset: options?.offset ?? 0,
        p_category: options?.category && options.category !== 'all' ? options.category : null,
        p_search: options?.search && options.search.trim() ? options.search.trim() : null
      });

      if (error) {
        console.warn('[Supabase] getPublicAnsweredScholarInquiries error:', error.message);
        return { success: false, data: [], totalCount: 0, error: error.message };
      }

      if (!data || data.length === 0) {
        let totalCount = 0;
        // If an offset beyond available records was requested, fetch accurate total count
        if ((options?.offset ?? 0) > 0) {
          try {
            const { data: countVal, error: countErr } = await supabase.rpc('get_public_answered_scholar_inquiries_count', {
              p_category: options?.category && options.category !== 'all' ? options.category : null,
              p_search: options?.search && options.search.trim() ? options.search.trim() : null
            });
            if (!countErr && countVal !== null && countVal !== undefined) {
              totalCount = Number(countVal);
            } else {
              // Fallback to offset 0 query
              const probe = await supabase.rpc('get_public_answered_scholar_inquiries', {
                p_limit: 1,
                p_offset: 0,
                p_category: options?.category && options.category !== 'all' ? options.category : null,
                p_search: options?.search && options.search.trim() ? options.search.trim() : null
              });
              if (probe.data && probe.data.length > 0) {
                totalCount = Number(probe.data[0].total_count || 0);
              }
            }
          } catch {
            totalCount = 0;
          }
        }
        return { success: true, data: [], totalCount };
      }

      const totalCount = Number(data[0]?.total_count || data.length);
      const items: PublicAnsweredInquiry[] = data.map((row: any) => ({
        id: row.id,
        category: row.category,
        madhhabPreference: row.madhhab_preference,
        subject: row.subject,
        questionText: row.question_text,
        scholarName: row.scholar_name,
        scholarQualification: row.scholar_qualification,
        answerText: row.answer_text,
        answerArabic: row.answer_arabic,
        reference: row.reference,
        answeredAt: row.answered_at,
        publishedAt: row.published_at
      }));

      return { success: true, data: items, totalCount };
    } catch (err: any) {
      console.warn('[Supabase] getPublicAnsweredScholarInquiries fallback:', err);
      return { success: false, data: [], totalCount: 0, error: err?.message || 'Failed to fetch public inquiries' };
    }
  },

  /**
   * Fetch real verified counts for the answered-questions counter.
   * Invokes public.get_scholar_inquiries_answered_count RPC.
   */
  async getScholarInquiriesAnsweredCount(): Promise<{ totalAnswered: number; totalPublicAnswered: number }> {
    if (!isSupabaseConfigured()) {
      return { totalAnswered: 0, totalPublicAnswered: 0 };
    }

    try {
      const { data, error } = await supabase.rpc('get_scholar_inquiries_answered_count');
      if (error || !data || data.length === 0) {
        return { totalAnswered: 0, totalPublicAnswered: 0 };
      }
      return {
        totalAnswered: Number(data[0].total_answered || 0),
        totalPublicAnswered: Number(data[0].total_public_answered || 0)
      };
    } catch {
      return { totalAnswered: 0, totalPublicAnswered: 0 };
    }
  },

  // ---------------------------------------------------------------------------
  // 12. PUBLIC SCHOLARS LIBRARY (public.scholar_qa_library)
  // ---------------------------------------------------------------------------

  /**
   * Helper to normalize database row into ScholarQALibraryItem with full bilingual support.
   */
  mapScholarQARow(row: any): ScholarQALibraryItem {
    const isUrduOnly = row.language === 'urdu';

    // English fields with backward-compatible fallback
    const titleEn = row.title_en || (!isUrduOnly ? row.title : null) || null;
    const questionEn = row.question_en || (!isUrduOnly ? row.question : null) || null;
    const answerEn = row.answer_en || (!isUrduOnly ? row.answer : null) || null;
    const referencesDetailsEn = row.references_details_en || (!isUrduOnly ? (row.references_details || '') : null) || '';

    // Urdu fields with backward-compatible fallback
    const titleUrdu = row.title_ur || (isUrduOnly ? row.title : null) || null;
    const questionUrdu = row.question_ur || (isUrduOnly ? row.question : null) || null;
    const answerUrdu = row.answer_ur || (isUrduOnly ? row.answer : null) || null;
    const referencesDetailsUrdu = row.references_details_ur || (isUrduOnly ? (row.references_details || '') : null) || '';

    const hasEn = Boolean(titleEn && questionEn && answerEn);
    const hasUr = Boolean(titleUrdu && questionUrdu && answerUrdu);
    let resolvedLang: ScholarQALanguage = 'english';
    if (hasEn && hasUr) {
      resolvedLang = 'both';
    } else if (hasUr) {
      resolvedLang = 'urdu';
    } else {
      resolvedLang = 'english';
    }

    return {
      id: row.id,
      slug: row.slug,
      title: titleEn || titleUrdu || row.title,
      question: questionEn || questionUrdu || row.question,
      answer: answerEn || answerUrdu || row.answer,
      referencesDetails: referencesDetailsEn || referencesDetailsUrdu || row.references_details || '',
      titleEn,
      questionEn,
      answerEn,
      referencesDetailsEn,
      titleUrdu,
      questionUrdu,
      answerUrdu,
      referencesDetailsUrdu,
      category: row.category || 'General',
      language: row.language === 'both' || row.language === 'bilingual' ? 'both' : resolvedLang,
      status: row.status,
      viewsCount: row.views_count || 0,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  },

  /**
   * Fetch all published scholar library Q&As.
   * RLS strictly ensures only status='published' is returned for public queries.
   */
  async getPublicScholarQALibrary(): Promise<ScholarQALibraryItem[]> {
    if (!isSupabaseConfigured()) {
      return INITIAL_SCHOLAR_LIBRARY;
    }

    try {
      const { data, error } = await supabase
        .from('scholar_qa_library')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.warn('[Supabase] getPublicScholarQALibrary error:', error.message);
        return INITIAL_SCHOLAR_LIBRARY;
      }

      if (!data || data.length === 0) {
        return INITIAL_SCHOLAR_LIBRARY;
      }

      return data.map((row: any) => this.mapScholarQARow(row));
    } catch (err) {
      console.warn('[Supabase] getPublicScholarQALibrary fallback:', err);
      return INITIAL_SCHOLAR_LIBRARY;
    }
  },

  /**
   * Fetch a single published scholar Q&A by its SEO slug or UUID id.
   */
  async getPublicScholarQABySlugOrId(identifier: string): Promise<ScholarQALibraryItem | null> {
    const clean = identifier.trim();
    if (!clean) return null;

    if (isSupabaseConfigured()) {
      try {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clean);
        let query = supabase.from('scholar_qa_library').select('*');
        if (isUuid) {
          query = query.or(`slug.eq.${clean},id.eq.${clean}`);
        } else {
          query = query.eq('slug', clean);
        }

        const { data, error } = await query.maybeSingle();
        if (!error && data) {
          return this.mapScholarQARow(data);
        }
      } catch {}
    }

    const found = INITIAL_SCHOLAR_LIBRARY.find(item => item.slug === clean || item.id === clean);
    return found || null;
  },

  /**
   * Admin-only: Fetch all scholar library items (both published and drafts).
   * RLS strictly verifies public.is_admin() before returning drafts.
   */
  async adminGetAllScholarQAs(): Promise<{ success: boolean; data?: ScholarQALibraryItem[]; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true, data: INITIAL_SCHOLAR_LIBRARY };
    }

    try {
      const { data, error } = await supabase
        .from('scholar_qa_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      const items: ScholarQALibraryItem[] = (data || []).map((row: any) => this.mapScholarQARow(row));
      return { success: true, data: items };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to fetch scholar QA library' };
    }
  },

  /**
   * Admin-only: Save (Insert or Update) a scholar Q&A entry.
   * Supports bilingual English and Urdu content in the same linked record.
   */
  async adminSaveScholarQA(item: Partial<ScholarQALibraryItem> & Partial<ScholarQAFormData>): Promise<{ success: boolean; data?: ScholarQALibraryItem; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase configuration is not active.' };
    }

    try {
      const titleEn = (item.titleEn || (!item.titleUrdu ? item.title : '') || '').trim();
      const questionEn = (item.questionEn || (!item.questionUrdu ? item.question : '') || '').trim();
      const answerEn = (item.answerEn || (!item.answerUrdu ? item.answer : '') || '').trim();
      const referencesDetailsEn = (item.referencesDetailsEn !== undefined ? item.referencesDetailsEn : (item.referencesDetails || '')).trim();

      const titleUrdu = (item.titleUrdu || (item.language === 'urdu' ? item.title : '') || '').trim();
      const questionUrdu = (item.questionUrdu || (item.language === 'urdu' ? item.question : '') || '').trim();
      const answerUrdu = (item.answerUrdu || (item.language === 'urdu' ? item.answer : '') || '').trim();
      const referencesDetailsUrdu = (item.referencesDetailsUrdu !== undefined ? item.referencesDetailsUrdu : '').trim();

      const hasEnglish = Boolean(titleEn || questionEn || answerEn);
      const hasUrdu = Boolean(titleUrdu || questionUrdu || answerUrdu);

      if (!hasEnglish && !hasUrdu) {
        return { success: false, error: 'Please provide at least English or Urdu content for the Q&A.' };
      }

      if (hasEnglish) {
        if (!titleEn || titleEn.length < 3) {
          return { success: false, error: 'English Title must be at least 3 characters.' };
        }
        if (!questionEn || questionEn.length < 5) {
          return { success: false, error: 'English Question must be at least 5 characters.' };
        }
        if (!answerEn || answerEn.length < 5) {
          return { success: false, error: 'English Answer must be at least 5 characters.' };
        }
      }

      if (hasUrdu) {
        if (!titleUrdu || titleUrdu.length < 3) {
          return { success: false, error: 'Urdu Title must be at least 3 characters.' };
        }
        if (!questionUrdu || questionUrdu.length < 5) {
          return { success: false, error: 'Urdu Question must be at least 5 characters.' };
        }
        if (!answerUrdu || answerUrdu.length < 5) {
          return { success: false, error: 'Urdu Answer must be at least 5 characters.' };
        }
      }

      const primaryTitle = titleEn || titleUrdu;
      const primaryQuestion = questionEn || questionUrdu;
      const primaryAnswer = answerEn || answerUrdu;
      const primaryRef = referencesDetailsEn || referencesDetailsUrdu || '';

      let resolvedLang: 'english' | 'urdu' | 'both' = 'english';
      if (hasEnglish && hasUrdu) {
        resolvedLang = 'both';
      } else if (hasUrdu) {
        resolvedLang = 'urdu';
      } else {
        resolvedLang = 'english';
      }

      const category = (item.category || 'General').trim();
      const status = item.status || 'draft';

      // Generate or clean slug
      let slug = (item.slug && item.slug.trim()) ? item.slug.trim().toLowerCase().replace(/[\s_]+/g, '-') : '';
      if (!slug || slug.length < 3) {
        slug = (titleEn || primaryTitle)
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 100);
        if (!slug || slug.length < 3) {
          slug = `qa-${Date.now().toString(36)}`;
        }
      }

      const now = new Date().toISOString();
      const row: any = {
        title: primaryTitle,
        question: primaryQuestion,
        answer: primaryAnswer,
        references_details: primaryRef,
        title_en: titleEn || null,
        question_en: questionEn || null,
        answer_en: answerEn || null,
        references_details_en: referencesDetailsEn || null,
        title_ur: titleUrdu || null,
        question_ur: questionUrdu || null,
        answer_ur: answerUrdu || null,
        references_details_ur: referencesDetailsUrdu || null,
        category,
        language: resolvedLang,
        status,
        slug,
        updated_at: now
      };

      if (item.id) {
        row.id = item.id;
      }

      if (status === 'published') {
        row.published_at = item.publishedAt || now;
      } else {
        row.published_at = null;
      }

      const { data, error } = await supabase
        .from('scholar_qa_library')
        .upsert(row)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: this.mapScholarQARow(data) };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to save scholar QA entry.' };
    }
  },

  /**
   * Admin-only: Delete a scholar Q&A entry.
   */
  async adminDeleteScholarQA(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase configuration is not active.' };
    }

    try {
      const { error } = await supabase
        .from('scholar_qa_library')
        .delete()
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete entry.' };
    }
  },

  /**
   * Admin-only: Toggle publication status of a scholar Q&A.
   */
  async adminToggleScholarQAPublication(id: string, newStatus: 'published' | 'draft'): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase configuration is not active.' };
    }

    try {
      const updates: any = {
        status: newStatus,
        updated_at: new Date().toISOString()
      };
      if (newStatus === 'published') {
        updates.published_at = new Date().toISOString();
      } else {
        updates.published_at = null;
      }

      const { error } = await supabase
        .from('scholar_qa_library')
        .update(updates)
        .eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to update publication status.' };
    }
  }
};

export const supabaseService = SupabaseService;


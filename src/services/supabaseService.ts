import { supabase, isSupabaseConfigured } from '../supabase/config';
import {
  QuizQuestion,
  QuranVerse,
  HadithItem,
  DuaItem,
  IslamicReminder,
  QuizAttemptRecord
} from '../types';

/**
 * =============================================================================
 * IslamIQ Supabase Service Layer
 * =============================================================================
 * Mirrors the interface of firestoreService.ts for seamless drop-in capability.
 * Uses Supabase PostgreSQL tables and Realtime channels.
 */

export const SupabaseService = {
  // ---------------------------------------------------------------------------
  // 1. QUIZ QUESTIONS
  // ---------------------------------------------------------------------------
  async getQuestions(): Promise<QuizQuestion[]> {
    if (!isSupabaseConfigured()) return [];
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('[Supabase] getQuestions error:', error.message);
        return [];
      }

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
        forKids: row.for_kids,
        kidsHintUrdu: row.kids_hint_urdu,
        kidsHintEn: row.kids_hint_en,
        isActive: row.is_active
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
      return () => {};
    }

    try {
      const channel = supabase
        .channel('quiz_questions_changes')
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
            onError(new Error('Supabase Realtime subscription error'));
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

      if (error) return [];
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

      if (error) return [];
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

      if (error) return [];
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

      if (error) return [];
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
  // 6. CATEGORIES
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
  // 7. QUIZ ATTEMPTS & PROGRESS LOGS
  // ---------------------------------------------------------------------------
  async logQuizAttempt(attempt: QuizAttemptRecord): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    try {
      const row = {
        id: attempt.id,
        timestamp: attempt.timestamp,
        date: attempt.date,
        mode: attempt.mode,
        difficulty: attempt.difficulty,
        category: attempt.category,
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        accuracy: attempt.accuracy,
        user_name: attempt.userName || 'Seeker'
      };

      const { error } = await supabase.from('quiz_attempts').insert(row);
      return !error;
    } catch {
      return false;
    }
  }
};

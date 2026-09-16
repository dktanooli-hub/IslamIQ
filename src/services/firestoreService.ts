import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  QuizQuestion,
  QuranVerse,
  HadithItem,
  DuaItem,
  IslamicReminder,
  QuizAttemptRecord
} from '../types';

/**
 * Firestore Service Layer for IslamIQ
 * Central source of truth for questions, daily feeds, categories, and attempts.
 * 
 * Collections:
 * - `quiz_questions`: All questions (Adult & Kids) with isActive flag
 * - `quran_verses`: Daily Quran verses
 * - `hadiths`: Daily Hadiths
 * - `duas`: Daily Duas
 * - `reminders`: Islamic reminders
 * - `categories`: Topic category names
 * - `quiz_attempts`: Logged quiz attempts
 * - `system_config`: Central settings, categories array & admin auth metadata
 */

export const FirestoreService = {
  // ---------------------------------------------------------------------------
  // QUIZ QUESTIONS
  // ---------------------------------------------------------------------------
  async getQuestions(): Promise<QuizQuestion[]> {
    try {
      const qCol = collection(db, 'quiz_questions');
      const snap = await getDocs(qCol);
      const list: QuizQuestion[] = [];
      snap.forEach(d => {
        list.push({ id: d.id, ...d.data() } as QuizQuestion);
      });
      return list;
    } catch (err) {
      console.warn('[Firestore] Failed to getQuestions:', err);
      return [];
    }
  },

  listenQuestions(
    callback: (questions: QuizQuestion[]) => void,
    onError?: (error: any) => void
  ): () => void {
    try {
      const qCol = collection(db, 'quiz_questions');
      return onSnapshot(
        qCol,
        snapshot => {
          const list: QuizQuestion[] = [];
          snapshot.forEach(d => {
            list.push({ id: d.id, ...d.data() } as QuizQuestion);
          });
          callback(list);
        },
        error => {
          console.warn('[Firestore] Questions snapshot error:', error);
          if (onError) onError(error);
        }
      );
    } catch (e) {
      console.warn('[Firestore] listenQuestions init error:', e);
      if (onError) onError(e);
      return () => {};
    }
  },

  async saveQuestion(question: QuizQuestion): Promise<{ success: boolean; error?: string }> {
    try {
      const docRef = doc(db, 'quiz_questions', question.id);
      await setDoc(docRef, { ...question, updatedAt: Date.now() }, { merge: true });
      return { success: true };
    } catch (e: any) {
      console.error('[Firestore] saveQuestion error:', e);
      return { success: false, error: e.message || 'Failed to save question to Firestore' };
    }
  },

  async deleteQuestion(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, 'quiz_questions', id));
      return { success: true };
    } catch (e: any) {
      console.error('[Firestore] deleteQuestion error:', e);
      return { success: false, error: e.message || 'Failed to delete question from Firestore' };
    }
  },

  // ---------------------------------------------------------------------------
  // QURAN VERSES
  // ---------------------------------------------------------------------------
  async getQuranVerses(): Promise<QuranVerse[]> {
    try {
      const col = collection(db, 'quran_verses');
      const snap = await getDocs(col);
      const list: QuranVerse[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as QuranVerse));
      return list;
    } catch (e) {
      console.warn('[Firestore] getQuranVerses error:', e);
      return [];
    }
  },

  async saveQuranVerse(verse: QuranVerse): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(doc(db, 'quran_verses', verse.id), verse, { merge: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async deleteQuranVerse(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, 'quran_verses', id));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ---------------------------------------------------------------------------
  // HADITHS
  // ---------------------------------------------------------------------------
  async getHadiths(): Promise<HadithItem[]> {
    try {
      const col = collection(db, 'hadiths');
      const snap = await getDocs(col);
      const list: HadithItem[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as HadithItem));
      return list;
    } catch (e) {
      console.warn('[Firestore] getHadiths error:', e);
      return [];
    }
  },

  async saveHadith(hadith: HadithItem): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(doc(db, 'hadiths', hadith.id), hadith, { merge: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async deleteHadith(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, 'hadiths', id));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ---------------------------------------------------------------------------
  // DUAS
  // ---------------------------------------------------------------------------
  async getDuas(): Promise<DuaItem[]> {
    try {
      const col = collection(db, 'duas');
      const snap = await getDocs(col);
      const list: DuaItem[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as DuaItem));
      return list;
    } catch (e) {
      console.warn('[Firestore] getDuas error:', e);
      return [];
    }
  },

  async saveDua(dua: DuaItem): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(doc(db, 'duas', dua.id), dua, { merge: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async deleteDua(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, 'duas', id));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ---------------------------------------------------------------------------
  // REMINDERS
  // ---------------------------------------------------------------------------
  async getReminders(): Promise<IslamicReminder[]> {
    try {
      const col = collection(db, 'reminders');
      const snap = await getDocs(col);
      const list: IslamicReminder[] = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() } as IslamicReminder));
      return list;
    } catch (e) {
      console.warn('[Firestore] getReminders error:', e);
      return [];
    }
  },

  async saveReminder(reminder: IslamicReminder): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(doc(db, 'reminders', reminder.id), reminder, { merge: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  async deleteReminder(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await deleteDoc(doc(db, 'reminders', id));
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ---------------------------------------------------------------------------
  // CATEGORIES & SYSTEM CONFIG
  // ---------------------------------------------------------------------------
  async getCategories(): Promise<string[] | null> {
    try {
      const configRef = doc(db, 'system_config', 'categories');
      const snap = await getDoc(configRef);
      if (snap.exists() && Array.isArray(snap.data()?.list)) {
        return snap.data().list;
      }
      return null;
    } catch (e) {
      console.warn('[Firestore] getCategories error:', e);
      return null;
    }
  },

  async saveCategories(list: string[]): Promise<{ success: boolean; error?: string }> {
    try {
      await setDoc(doc(db, 'system_config', 'categories'), { list, updatedAt: Date.now() }, { merge: true });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  },

  // ---------------------------------------------------------------------------
  // ADMIN AUTHENTICATION METADATA (CLOUD SYNCED FOR VERCEL & PREVIEWS)
  // ---------------------------------------------------------------------------
  async getAdminAuthConfig(): Promise<{ isSetupComplete: boolean; passwordHash?: string; salt?: string; adminUid?: string; email?: string } | null> {
    try {
      const authDoc = doc(db, 'system_config', 'admin_auth');
      const snap = await getDoc(authDoc);
      if (snap.exists()) {
        const d = snap.data();
        return {
          isSetupComplete: !!d.isSetupComplete,
          passwordHash: d.passwordHash,
          salt: d.salt,
          adminUid: d.adminUid,
          email: d.email
        };
      }
      return null;
    } catch (e) {
      console.warn('[Firestore] getAdminAuthConfig error:', e);
      return null;
    }
  },

  async saveAdminAuthConfig(config: { isSetupComplete: boolean; passwordHash?: string; salt?: string; adminUid?: string; email?: string }): Promise<boolean> {
    try {
      const authDoc = doc(db, 'system_config', 'admin_auth');
      await setDoc(authDoc, { ...config, updatedAt: Date.now() }, { merge: true });
      return true;
    } catch (e) {
      console.error('[Firestore] saveAdminAuthConfig error:', e);
      return false;
    }
  },

  /**
   * Registers or updates an authorized Admin UID document in `/admins/{uid}`.
   * Required for Firestore Security Rules to permit writes by this UID.
   */
  async registerAdminUid(uid: string, email: string): Promise<boolean> {
    try {
      const adminDocRef = doc(db, 'admins', uid);
      await setDoc(
        adminDocRef,
        {
          uid,
          email,
          role: 'admin',
          authorizedAt: Date.now()
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      console.warn('[Firestore] Failed to register admin UID:', err);
      return false;
    }
  },

  async isAdminUidRegistered(uid: string): Promise<boolean> {
    try {
      const snap = await getDoc(doc(db, 'admins', uid));
      return snap.exists();
    } catch {
      return false;
    }
  },

  // ---------------------------------------------------------------------------
  // SAFE ONE-TIME MIGRATION UTILITY
  // Migrates existing local Admin content to Firestore in batches
  // Does not overwrite or delete existing Firestore data.
  // ---------------------------------------------------------------------------
  async migrateLocalContentToFirestore(data: {
    questions?: QuizQuestion[];
    quranVerses?: QuranVerse[];
    hadiths?: HadithItem[];
    duas?: DuaItem[];
    reminders?: IslamicReminder[];
    categories?: string[];
  }): Promise<{ success: boolean; migratedCount: number; error?: string }> {
    try {
      let count = 0;
      const batch = writeBatch(db);

      if (Array.isArray(data.questions)) {
        for (const q of data.questions) {
          if (q.id) {
            batch.set(doc(db, 'quiz_questions', q.id), q, { merge: true });
            count++;
          }
        }
      }

      if (Array.isArray(data.quranVerses)) {
        for (const v of data.quranVerses) {
          if (v.id) {
            batch.set(doc(db, 'quran_verses', v.id), v, { merge: true });
            count++;
          }
        }
      }

      if (Array.isArray(data.hadiths)) {
        for (const h of data.hadiths) {
          if (h.id) {
            batch.set(doc(db, 'hadiths', h.id), h, { merge: true });
            count++;
          }
        }
      }

      if (Array.isArray(data.duas)) {
        for (const d of data.duas) {
          if (d.id) {
            batch.set(doc(db, 'duas', d.id), d, { merge: true });
            count++;
          }
        }
      }

      if (Array.isArray(data.reminders)) {
        for (const r of data.reminders) {
          if (r.id) {
            batch.set(doc(db, 'reminders', r.id), r, { merge: true });
            count++;
          }
        }
      }

      if (Array.isArray(data.categories) && data.categories.length > 0) {
        batch.set(doc(db, 'system_config', 'categories'), { list: data.categories, updatedAt: Date.now() }, { merge: true });
      }

      await batch.commit();
      return { success: true, migratedCount: count };
    } catch (e: any) {
      console.error('[Firestore] Migration error:', e);
      return { success: false, migratedCount: 0, error: e.message || 'Migration failed' };
    }
  }
};

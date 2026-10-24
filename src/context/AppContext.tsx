import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserMode,
  ContentLanguage,
  UserStats,
  SalahDayRecord,
  DhikrType,
  Badge,
  TasbihRecord,
  ModeProgress,
  QuizQuestion,
  QuranVerse,
  HadithItem,
  DuaItem,
  IslamicReminder,
  QuizCategory,
  QuizDifficulty,
  QuizAttemptRecord,
  AppTab,
  ScholarQALibraryItem,
  ScholarQAFormData
} from '../types';
import {
  DHIKR_LIST,
  INITIAL_BADGES,
  VERIFIED_QUESTIONS,
  VERIFIED_QURAN_VERSES,
  VERIFIED_HADITHS,
  VERIFIED_DUAS,
  ISLAMIC_REMINDERS,
  VERIFIED_QA_DATABASE
} from '../data/verifiedContent';
import { INITIAL_SCHOLAR_LIBRARY } from '../data/scholarLibraryData';
import { sounds } from '../utils/audio';
import { getLocalDateStr, normalizeSalahHistory } from '../utils/dateUtils';
import { AdminAuthService, PRIMARY_ADMIN_EMAIL } from '../services/adminAuth';
import { FirestoreService } from '../services/firestoreService';
import { SupabaseService, DatabaseStats } from '../services/supabaseService';
import { isSupabaseConfigured } from '../supabase/config';
import { VerifiedQA } from '../types';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  contentLang: ContentLanguage;
  setContentLang: (lang: ContentLanguage) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isMoreOpen: boolean;
  setIsMoreOpen: (open: boolean) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  
  // User Profile & Gamification
  userStats: UserStats;
  addXP: (points: number, reason?: string) => void;
  recordQuizCompleted: (score: number, totalQuestions: number, difficulty?: QuizDifficulty, category?: string) => void;
  badges: Badge[];
  unlockBadge: (badgeId: string) => void;
  linkAccount: (name: string, email: string) => void;
  logoutToGuest: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;

  // Mode summaries for comparison
  adultProgress: ModeProgress;
  kidsProgress: ModeProgress;

  // Salah Tracker
  todayDateStr: string;
  todaySalah: SalahDayRecord;
  toggleSalahPrayer: (prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud', targetDate?: string) => void;
  salahHistory: Record<string, SalahDayRecord>;

  // Tasbih
  currentDhikr: DhikrType;
  setCurrentDhikr: (dhikr: DhikrType) => void;
  tasbihCount: number;
  tasbihTarget: number;
  tasbihLaps: number;
  incrementTasbih: () => void;
  resetTasbih: () => void;
  setTasbihTarget: (target: number) => void;
  tasbihHistory: TasbihRecord[];
  addTasbihHistoryRecord: (record: Omit<TasbihRecord, 'id'>) => void;
  clearTasbihHistory: () => void;
  customDhikrData: { transliteration: string; arabic: string; meaningUrdu: string; meaningEn: string };
  setCustomDhikrData: (data: { transliteration: string; arabic: string; meaningUrdu: string; meaningEn: string }) => void;

  // Quiz non-repetition tracking
  recentQuestionIds: string[];
  markQuestionsAsUsed: (ids: string[]) => void;

  // Bookmarks
  bookmarkedQAs: string[];
  toggleBookmarkQA: (id: string) => void;

  // Audio State
  isSpeaking: boolean;
  setIsSpeaking: (speaking: boolean) => void;

  // In-App Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Admin Panel & Database Management
  activeBackend: 'supabase' | 'firebase' | 'local';
  questions: QuizQuestion[];
  quranVerses: QuranVerse[];
  hadiths: HadithItem[];
  duas: DuaItem[];
  reminders: IslamicReminder[];
  verifiedQAs: VerifiedQA[];
  categories: string[];
  quizAttempts: QuizAttemptRecord[];
  databaseStats: DatabaseStats | null;
  fetchDatabaseStats: () => Promise<void>;

  // Admin Security
  isAdminAuthenticated: boolean;
  isAdminSetupComplete: boolean;
  adminEmail: string;
  adminUid: string | null;
  verifyAdminPasskey: (key: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  setupAdminMasterPassword: (password: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  updateAdminPasskey: (currentKey: string, newKey: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;
  checkAdminStatus: () => Promise<void>;
  syncAdminAuthorization: () => Promise<{ success: boolean; isAuthorized: boolean; error?: string }>;
  claimAdminBootstrap: () => Promise<{ success: boolean; message?: string; error?: string }>;

  // Admin Question CRUD
  addQuestion: (q: Omit<QuizQuestion, 'id'>) => void;
  updateQuestion: (id: string, q: Partial<QuizQuestion>) => void;
  deleteQuestion: (id: string) => void;
  toggleQuestionActive: (id: string) => void;

  // Admin Content CRUD
  addQuranVerse: (v: Omit<QuranVerse, 'id'>) => void;
  updateQuranVerse: (id: string, v: Partial<QuranVerse>) => void;
  deleteQuranVerse: (id: string) => void;
  addHadith: (h: Omit<HadithItem, 'id'>) => void;
  updateHadith: (id: string, h: Partial<HadithItem>) => void;
  deleteHadith: (id: string) => void;
  addDua: (d: Omit<DuaItem, 'id'>) => void;
  updateDua: (id: string, d: Partial<DuaItem>) => void;
  deleteDua: (id: string) => void;
  addReminder: (r: Omit<IslamicReminder, 'id'>) => void;
  updateReminder: (id: string, r: Partial<IslamicReminder>) => void;
  deleteReminder: (id: string) => void;
  addVerifiedQA: (qa: Omit<VerifiedQA, 'id'>) => void;
  updateVerifiedQA: (id: string, qa: Partial<VerifiedQA>) => void;
  deleteVerifiedQA: (id: string) => void;
  addCategory: (cat: string) => void;
  deleteCategory: (cat: string) => void;
  resetAllContentToDefaults: () => void;
  migrateLocalToFirestore: () => Promise<{ success: boolean; migratedCount: number; error?: string }>;
  migrateLocalToSupabase: () => Promise<{ success: boolean; migratedCount: number; error?: string }>;
  isCloudSyncing: boolean;
  cloudSyncError: string | null;

  // Public & Admin Scholars Library
  publicScholarLibrary: ScholarQALibraryItem[];
  adminScholarLibrary: ScholarQALibraryItem[];
  isLoadingScholarLibrary: boolean;
  fetchPublicScholarLibrary: () => Promise<void>;
  fetchAdminScholarLibrary: () => Promise<void>;
  adminSaveScholarQA: (item: Partial<ScholarQALibraryItem> & ScholarQAFormData) => Promise<{ success: boolean; data?: ScholarQALibraryItem; error?: string }>;
  adminDeleteScholarQA: (id: string) => Promise<{ success: boolean; error?: string }>;
  adminToggleScholarQAPublish: (id: string, newStatus: 'published' | 'draft') => Promise<{ success: boolean; error?: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'islamiq_state_v2';
const LOCAL_STORAGE_ADMIN_KEY = 'islamiq_admin_db_v2';

const getTodayStr = () => getLocalDateStr();

const INITIAL_CATEGORIES = ['Pillars', 'Quran', 'Prophets', 'Manners', 'Seerah', 'Duas', 'Salah', 'Aqeedah'];

const initialSampleAttempts: QuizAttemptRecord[] = [
  {
    id: 'att-1',
    timestamp: Date.now() - 1800000,
    date: getTodayStr(),
    mode: 'adult',
    difficulty: 'beginner',
    category: 'Pillars',
    score: 5,
    totalQuestions: 5,
    accuracy: 100,
    userName: 'Guest Seeker'
  },
  {
    id: 'att-2',
    timestamp: Date.now() - 7200000,
    date: getTodayStr(),
    mode: 'kids',
    difficulty: 'beginner',
    category: 'Prophets',
    score: 4,
    totalQuestions: 5,
    accuracy: 80,
    userName: 'Little Believer'
  },
  {
    id: 'att-3',
    timestamp: Date.now() - 86400000,
    date: 'Yesterday',
    mode: 'adult',
    difficulty: 'intermediate',
    category: 'Quran',
    score: 4,
    totalQuestions: 5,
    accuracy: 80,
    userName: 'Guest Seeker'
  }
];

const defaultAdultProgress: ModeProgress = {
  xp: 150,
  streakDays: 3,
  lastActiveDate: getTodayStr(),
  quizzesCompleted: 2,
  correctAnswersCount: 8,
  tasbihTotalLifetime: 99,
  salahCompletedTotal: 12,
  unlockedBadgeIds: ['b-first-step'],
  recentQuizQuestionIds: []
};

const defaultKidsProgress: ModeProgress = {
  xp: 80,
  streakDays: 2,
  lastActiveDate: getTodayStr(),
  quizzesCompleted: 1,
  correctAnswersCount: 4,
  tasbihTotalLifetime: 33,
  salahCompletedTotal: 5,
  unlockedBadgeIds: ['b-first-step'],
  recentQuizQuestionIds: []
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & General Preferences
  const [userMode, setUserModeState] = useState<UserMode>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'kids-islamic-quiz') {
        return 'kids';
      }
      const savedMode = localStorage.getItem('islamiq_user_mode');
      if (savedMode === 'kids' || savedMode === 'adult') return savedMode;
    }
    return 'adult';
  });
  const [contentLang, setContentLangState] = useState<ContentLanguage>('urdu'); // Urdu by default as requested
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        const tabParam = url.searchParams.get('tab')?.toLowerCase();
        if (tabParam === 'salah' || tabParam === 'salah-tracker') return 'salah';
        if (tabParam === 'quiz') return 'quiz';
        if (tabParam === 'qibla') return 'qibla';
        if (tabParam === 'tasbih') return 'tasbih';
        if (tabParam === 'search') return 'search';
        if (tabParam === 'status') return 'status';
        if (tabParam === 'ask-a-scholar') return 'ask-a-scholar';
        if (tabParam === 'scholars-library') return 'scholars-library';
        if (tabParam === 'daily' || tabParam === 'home') return 'home';

        const path = url.pathname.replace(/^\//, '').toLowerCase();
        const validCleanTabs: AppTab[] = [
          'about',
          'contact',
          'privacy-policy',
          'terms',
          'disclaimer',
          'islamic-quiz',
          'kids-islamic-quiz',
          'islamic-questions-answers',
          'daily-quran-verse',
          'daily-hadith',
          'daily-dua',
          'salah-learning',
          'islamic-general-knowledge',
          'how-to-perform-salah',
          'how-to-perform-wudu',
          '5-pillars-of-islam',
          'six-articles-of-faith',
          'salah-for-beginners',
          'islamic-manners-for-kids',
          'quran-learning-guide',
          'hadith-learning-guide',
          'ramadan-guide',
          'zakat-basics',
          'zakat-calculator',
          'islamic-calendar',
          'seerah-of-prophet-muhammad',
          'ghusl-taharah-guide',
          'tayammum-guide',
          'hajj-umrah-guide',
          'stories-of-the-prophets',
          'rights-in-islam',
          'ask-a-scholar',
          'scholars-library',
          'nearby-mosques',
          'islamic-daily-life'
        ];
        if (validCleanTabs.includes(path as AppTab)) {
          return path as AppTab;
        }
        if (path === 'salah') return 'salah';
        if (path === 'quiz') return 'quiz';
        if (path === 'qibla') return 'qibla';
        if (path === 'tasbih') return 'tasbih';
        if (path === 'search') return 'search';
        if (path === 'scholars-library') return 'scholars-library';
        if (path === 'ask-a-scholar') return 'ask-a-scholar';
      } catch {
        // Fallback to home
      }
    }
    return 'home';
  });

  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  // Dates (strictly tracks the user's local calendar date)
  const [todayDateStr, setTodayDateStr] = useState<string>(getLocalDateStr());

  // Midnight / Date-rollover watcher: continuously updates todayDateStr when local midnight crosses
  useEffect(() => {
    const updateTodayIfChanged = () => {
      const currentLocal = getLocalDateStr();
      setTodayDateStr(prev => (prev !== currentLocal ? currentLocal : prev));
    };

    // Check every 10 seconds
    const intervalId = setInterval(updateTodayIfChanged, 10000);

    // Also check immediately when window / tab regains focus or visibility
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        updateTodayIfChanged();
      }
    };

    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', updateTodayIfChanged);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', updateTodayIfChanged);
    };
  }, []);

  // Account identity
  const [accountInfo, setAccountInfo] = useState<{ isGuest: boolean; userName: string; email?: string }>({
    isGuest: true,
    userName: 'Guest Seeker (مہمان طالب)'
  });

  // Separate Progress for Adult and Kids
  const [adultProgress, setAdultProgress] = useState<ModeProgress>(defaultAdultProgress);
  const [kidsProgress, setKidsProgress] = useState<ModeProgress>(defaultKidsProgress);

  // Bookmarks (shared)
  const [bookmarkedQAIds, setBookmarkedQAIds] = useState<string[]>(['qa-1']);

  // Separate Salah Tracking History: initialized from localStorage with normalized YYYY-MM-DD keys
  const [adultSalahHistory, setAdultSalahHistory] = useState<Record<string, SalahDayRecord>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedV2 = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedV2) {
          const parsed = JSON.parse(savedV2);
          if (parsed.adultSalahHistory) {
            return normalizeSalahHistory(parsed.adultSalahHistory, getLocalDateStr());
          }
        }
        const savedV1 = localStorage.getItem('islamiq_state_v1');
        if (savedV1) {
          const parsedV1 = JSON.parse(savedV1);
          if (parsedV1.salahHistory) {
            return normalizeSalahHistory(parsedV1.salahHistory, getLocalDateStr());
          }
        }
      } catch {}
    }
    return {};
  });

  const [kidsSalahHistory, setKidsSalahHistory] = useState<Record<string, SalahDayRecord>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedV2 = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedV2) {
          const parsed = JSON.parse(savedV2);
          if (parsed.kidsSalahHistory) {
            return normalizeSalahHistory(parsed.kidsSalahHistory, getLocalDateStr());
          }
        }
      } catch {}
    }
    return {};
  });

  // Separate Tasbih History for Adult and Kids
  const [adultTasbihHistory, setAdultTasbihHistory] = useState<TasbihRecord[]>([
    {
      id: 'rec-1',
      date: getTodayStr(),
      timestamp: Date.now() - 3600000,
      dhikrId: 'subhanallah',
      dhikrName: 'SubhanAllah',
      arabic: 'سُبْحَانَ اللَّهِ',
      count: 33,
      target: 33,
      completed: true
    },
    {
      id: 'rec-2',
      date: getTodayStr(),
      timestamp: Date.now() - 7200000,
      dhikrId: 'alhamdulillah',
      dhikrName: 'Alhamdulillah',
      arabic: 'الْحَمْدُ لِلَّهِ',
      count: 33,
      target: 33,
      completed: true
    }
  ]);

  const [kidsTasbihHistory, setKidsTasbihHistory] = useState<TasbihRecord[]>([
    {
      id: 'rec-k1',
      date: getTodayStr(),
      timestamp: Date.now() - 1800000,
      dhikrId: 'subhanallah',
      dhikrName: 'SubhanAllah',
      arabic: 'سُبْحَانَ اللَّهِ',
      count: 33,
      target: 33,
      completed: true
    }
  ]);

  // Tasbih active counters
  const [currentDhikr, setCurrentDhikr] = useState<DhikrType>(DHIKR_LIST[0]);
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTargetState] = useState<number>(33);
  const [tasbihLaps, setTasbihLaps] = useState<number>(0);

  // Custom Dhikr parameters
  const [customDhikrData, setCustomDhikrData] = useState<{
    transliteration: string;
    arabic: string;
    meaningUrdu: string;
    meaningEn: string;
  }>({
    transliteration: 'HasbunAllahu wa Ni\'mal Wakeel',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    meaningUrdu: 'ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے',
    meaningEn: 'Allah is sufficient for us, and He is the best disposer of affairs'
  });

  // Audio & Toast Feedback
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Content Management State
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    VERIFIED_QUESTIONS.map(q => ({ ...q, isActive: q.isActive !== false }))
  );
  const [quranVerses, setQuranVerses] = useState<QuranVerse[]>(VERIFIED_QURAN_VERSES);
  const [hadiths, setHadiths] = useState<HadithItem[]>(VERIFIED_HADITHS);
  const [duas, setDuas] = useState<DuaItem[]>(VERIFIED_DUAS);
  const [reminders, setReminders] = useState<IslamicReminder[]>(ISLAMIC_REMINDERS);
  const [verifiedQAs, setVerifiedQAs] = useState<VerifiedQA[]>(VERIFIED_QA_DATABASE);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>(initialSampleAttempts);
  const [activeBackend, setActiveBackend] = useState<'supabase' | 'firebase' | 'local'>(
    isSupabaseConfigured() ? 'supabase' : 'firebase'
  );
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats | null>(null);

  // Admin Security (Server-backed & Token-based)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminSetupComplete, setIsAdminSetupComplete] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState<string>(PRIMARY_ADMIN_EMAIL);
  const [adminUid, setAdminUid] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);

  // Public & Admin Scholars Library State
  const [publicScholarLibrary, setPublicScholarLibrary] = useState<ScholarQALibraryItem[]>(INITIAL_SCHOLAR_LIBRARY);
  const [adminScholarLibrary, setAdminScholarLibrary] = useState<ScholarQALibraryItem[]>(INITIAL_SCHOLAR_LIBRARY);
  const [isLoadingScholarLibrary, setIsLoadingScholarLibrary] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  // Check admin session and setup status on app startup
  const checkAdminStatus = async () => {
    try {
      const status = await AdminAuthService.getStatus();
      setIsAdminSetupComplete(status.isSetupComplete);
      setIsAdminAuthenticated(status.isAuthenticated);
      if (status.adminEmail) setAdminEmail(status.adminEmail);
      if (status.adminUid) setAdminUid(status.adminUid);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    checkAdminStatus();

    // Subscribe to Firebase Auth state changes for instant cross-tab and refresh persistence
    const unsubAuth = AdminAuthService.onAuthStateChanged((user) => {
      if (user) {
        setIsAdminAuthenticated(true);
        setIsAdminSetupComplete(true);
        setAdminEmail(user.email || PRIMARY_ADMIN_EMAIL);
        setAdminUid(user.uid || null);
        // Automatically check & ensure admin authorization in Firestore (no error thrown)
        AdminAuthService.ensureAdminAuthorization(user).catch(() => {});
      } else {
        const token = AdminAuthService.getToken();
        if (!token || token.startsWith('firebase_')) {
          setIsAdminAuthenticated(false);
          setAdminUid(null);
        }
      }
    });

    // Clean up any legacy exposed key in localStorage
    try {
      localStorage.removeItem('islamiq_admin_passkey_v1');
    } catch {}

    return () => {
      unsubAuth();
    };
  }, []);

  // 1. Initial load from LocalStorage as fast local cache/fallback
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY);
      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin);
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          const qMap = new Map<string, QuizQuestion>();
          VERIFIED_QUESTIONS.forEach(q => qMap.set(q.id, { ...q, isActive: true }));
          parsed.questions.forEach((q: QuizQuestion) => qMap.set(q.id, q));
          setQuestions(Array.from(qMap.values()));
        }
        if (Array.isArray(parsed.quranVerses) && parsed.quranVerses.length > 0) {
          const vMap = new Map<string, QuranVerse>();
          VERIFIED_QURAN_VERSES.forEach(v => vMap.set(v.id, v));
          parsed.quranVerses.forEach((v: QuranVerse) => vMap.set(v.id, v));
          setQuranVerses(Array.from(vMap.values()));
        }
        if (Array.isArray(parsed.hadiths) && parsed.hadiths.length > 0) {
          const hMap = new Map<string, HadithItem>();
          VERIFIED_HADITHS.forEach(h => hMap.set(h.id, h));
          parsed.hadiths.forEach((h: HadithItem) => hMap.set(h.id, h));
          setHadiths(Array.from(hMap.values()));
        }
        if (Array.isArray(parsed.duas) && parsed.duas.length > 0) {
          const dMap = new Map<string, DuaItem>();
          VERIFIED_DUAS.forEach(d => dMap.set(d.id, d));
          parsed.duas.forEach((d: DuaItem) => dMap.set(d.id, d));
          setDuas(Array.from(dMap.values()));
        }
        if (Array.isArray(parsed.reminders) && parsed.reminders.length > 0) {
          const rMap = new Map<string, IslamicReminder>();
          ISLAMIC_REMINDERS.forEach(r => rMap.set(r.id, r));
          parsed.reminders.forEach((r: IslamicReminder) => rMap.set(r.id, r));
          setReminders(Array.from(rMap.values()));
        }
        if (Array.isArray(parsed.categories) && parsed.categories.length > 0) {
          setCategories(parsed.categories);
        }
        if (Array.isArray(parsed.quizAttempts)) {
          setQuizAttempts(parsed.quizAttempts);
        }
      }
    } catch {
      // Storage parse fallback
    }
  }, []);

  // 2. Real-time / Cloud sync with Supabase (Primary) or Firestore (Fallback)
  useEffect(() => {
    setIsCloudSyncing(true);
    let unsubscribeQuestions: () => void = () => {};
    let unsubscribeQAs: () => void = () => {};

    if (isSupabaseConfigured()) {
      setActiveBackend('supabase');

      // Realtime subscription to Supabase quiz_questions table
      unsubscribeQuestions = SupabaseService.listenQuestions(
        (remoteQuestions) => {
          if (remoteQuestions && remoteQuestions.length > 0) {
            setQuestions(prev => {
              const map = new Map<string, QuizQuestion>();
              VERIFIED_QUESTIONS.forEach(q => map.set(q.id, { ...q, isActive: true }));
              prev.forEach(q => map.set(q.id, q));
              remoteQuestions.forEach(q => map.set(q.id, q));
              return Array.from(map.values());
            });
          }
          setIsCloudSyncing(false);
          setCloudSyncError(null);
        },
        (err: any) => {
          console.warn('[Supabase] Questions sync notice:', err);
          setIsCloudSyncing(false);
          setCloudSyncError(err?.message || 'Using local verified cache');
        }
      );

      // Realtime subscription to Supabase verified_qas table
      unsubscribeQAs = SupabaseService.listenVerifiedQAs((remoteQAs) => {
        if (remoteQAs && remoteQAs.length > 0) {
          setVerifiedQAs(remoteQAs);
        }
      });

      // Initial Fetch from Supabase tables (using Promise.allSettled so individual failures don't block others)
      const fetchSupabaseFeeds = async () => {
        try {
          const results = await Promise.allSettled([
            SupabaseService.getQuestions(),
            SupabaseService.getQuranVerses(),
            SupabaseService.getHadiths(),
            SupabaseService.getDuas(),
            SupabaseService.getReminders(),
            SupabaseService.getVerifiedQAs(),
            SupabaseService.getCategories()
          ]);

          const remoteQuestions = results[0].status === 'fulfilled' ? results[0].value : [];
          const verses = results[1].status === 'fulfilled' ? results[1].value : [];
          const hadithsList = results[2].status === 'fulfilled' ? results[2].value : [];
          const duasList = results[3].status === 'fulfilled' ? results[3].value : [];
          const remindersList = results[4].status === 'fulfilled' ? results[4].value : [];
          const remoteQAs = results[5].status === 'fulfilled' ? results[5].value : [];
          const remoteCats = results[6].status === 'fulfilled' ? results[6].value : null;

          if (remoteQuestions && remoteQuestions.length > 0) {
            setQuestions(prev => {
              const map = new Map<string, QuizQuestion>();
              VERIFIED_QUESTIONS.forEach(q => map.set(q.id, { ...q, isActive: true }));
              prev.forEach(q => map.set(q.id, q));
              remoteQuestions.forEach(q => map.set(q.id, q));
              return Array.from(map.values());
            });
          }
          if (verses.length > 0) setQuranVerses(verses);
          if (hadithsList.length > 0) setHadiths(hadithsList);
          if (duasList.length > 0) setDuas(duasList);
          if (remindersList.length > 0) setReminders(remindersList);
          if (remoteQAs.length > 0) setVerifiedQAs(remoteQAs);
          if (remoteCats && remoteCats.length > 0) setCategories(remoteCats);

          setIsCloudSyncing(false);
          setCloudSyncError(null);
        } catch (err: any) {
          console.warn('[Supabase] Initial fetch notice:', err);
          setCloudSyncError('Supabase connected with local fallback');
          setIsCloudSyncing(false);
        }
      };

      fetchSupabaseFeeds();
    } else {
      setActiveBackend('firebase');

      // Preserved legacy Firebase Firestore sync
      unsubscribeQuestions = FirestoreService.listenQuestions(
        (remoteQuestions) => {
          if (remoteQuestions && remoteQuestions.length > 0) {
            setQuestions(prev => {
              if (remoteQuestions.length >= 50) {
                return remoteQuestions;
              }
              const map = new Map<string, QuizQuestion>();
              VERIFIED_QUESTIONS.forEach(q => map.set(q.id, { ...q, isActive: true }));
              prev.forEach(q => map.set(q.id, q));
              remoteQuestions.forEach(q => map.set(q.id, q));
              return Array.from(map.values());
            });
          }
          setIsCloudSyncing(false);
          setCloudSyncError(null);
        },
        (err: any) => {
          console.warn('[Firestore] Questions sync notice:', err);
          setIsCloudSyncing(false);
          setCloudSyncError(err?.message || 'Using local verified cache');
        }
      );

      const fetchRemoteFeeds = async () => {
        try {
          const [verses, hadithsList, duasList, remindersList, remoteCats] = await Promise.all([
            FirestoreService.getQuranVerses(),
            FirestoreService.getHadiths(),
            FirestoreService.getDuas(),
            FirestoreService.getReminders(),
            FirestoreService.getCategories()
          ]);
          if (verses.length > 0) {
            const vMap = new Map<string, QuranVerse>();
            VERIFIED_QURAN_VERSES.forEach(v => vMap.set(v.id, v));
            verses.forEach(v => vMap.set(v.id, v));
            setQuranVerses(Array.from(vMap.values()));
          }
          if (hadithsList.length > 0) {
            const hMap = new Map<string, HadithItem>();
            VERIFIED_HADITHS.forEach(h => hMap.set(h.id, h));
            hadithsList.forEach(h => hMap.set(h.id, h));
            setHadiths(Array.from(hMap.values()));
          }
          if (duasList.length > 0) {
            const dMap = new Map<string, DuaItem>();
            VERIFIED_DUAS.forEach(d => dMap.set(d.id, d));
            duasList.forEach(d => dMap.set(d.id, d));
            setDuas(Array.from(dMap.values()));
          }
          if (remindersList.length > 0) {
            const rMap = new Map<string, IslamicReminder>();
            ISLAMIC_REMINDERS.forEach(r => rMap.set(r.id, r));
            remindersList.forEach(r => rMap.set(r.id, r));
            setReminders(Array.from(rMap.values()));
          }
          if (remoteCats && remoteCats.length > 0) setCategories(remoteCats);
        } catch (err: any) {
          console.warn('[Firestore] Sync warning:', err);
          setCloudSyncError('Operating in offline/cached mode');
        }
      };

      fetchRemoteFeeds();
    }

    return () => {
      unsubscribeQuestions();
      unsubscribeQAs();
    };
  }, []);

  // Load Public Scholars Library on startup
  useEffect(() => {
    fetchPublicScholarLibrary();
  }, []);

  // Fetch full Admin Scholars Library (including drafts) when admin is authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAdminScholarLibrary();
    }
  }, [isAdminAuthenticated]);

  // Save Admin DB to LocalStorage as offline cache (does not overwrite or replace cloud databases)
  useEffect(() => {
    try {
      const adminData = {
        questions,
        quranVerses,
        hadiths,
        duas,
        reminders,
        verifiedQAs,
        categories,
        quizAttempts
      };
      localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, JSON.stringify(adminData));
    } catch {
      // Storage save error
    }
  }, [questions, quranVerses, hadiths, duas, reminders, categories, quizAttempts]);

  // Admin Security Methods
  const verifyAdminPasskey = async (key: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    const targetEmail = email || adminEmail || PRIMARY_ADMIN_EMAIL;
    const res = await AdminAuthService.login(targetEmail, key);
    if (res.success) {
      setIsAdminAuthenticated(true);
      if (res.user) {
        setAdminEmail(res.user.email || targetEmail);
        setAdminUid(res.user.uid);
      }
      showToast('Admin access granted via Firebase Auth! 🔐 (خوش آمدید)');
      return { success: true };
    }
    const err = res.error || 'Incorrect admin credentials. Access denied.';
    showToast(err);
    return { success: false, error: err };
  };

  const setupAdminMasterPassword = async (password: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    const targetEmail = email || adminEmail || PRIMARY_ADMIN_EMAIL;
    const res = await AdminAuthService.setupOwnerPassword(password, targetEmail);
    if (res.success) {
      setIsAdminSetupComplete(true);
      setIsAdminAuthenticated(true);
      showToast('Owner account configured & authorized via Firebase! 🛡️');
      return { success: true };
    }
    const err = res.error || 'Failed to initialize master password.';
    showToast(err);
    return { success: false, error: err };
  };

  const updateAdminPasskey = async (currentKey: string, newKey: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    const targetEmail = email || adminEmail || PRIMARY_ADMIN_EMAIL;
    const res = await AdminAuthService.changePassword(currentKey, newKey, targetEmail);
    if (res.success) {
      showToast('Admin password updated securely! 🛡️');
      return { success: true };
    }
    const err = res.error || 'Failed to update passkey.';
    showToast(err);
    return { success: false, error: err };
  };

  const adminLogout = async () => {
    await AdminAuthService.logout();
    setIsAdminAuthenticated(false);
    setAdminUid(null);
    showToast('Logged out of Admin Panel.');
  };

  const syncAdminAuthorization = async (): Promise<{ success: boolean; isAuthorized: boolean; error?: string }> => {
    const res = await AdminAuthService.ensureAdminAuthorization();
    if (res.isAuthorized) {
      setIsAdminAuthenticated(true);
      const currentUser = AdminAuthService.getCurrentUser();
      if (currentUser) {
        setAdminEmail(currentUser.email || PRIMARY_ADMIN_EMAIL);
        setAdminUid(currentUser.uid || null);
      }
      showToast('Admin authorization confirmed with Firestore! 🛡️');
    }
    return res;
  };

  // Safe One-Time Migration: Local Storage -> Firestore
  const migrateLocalToFirestore = async (): Promise<{ success: boolean; migratedCount: number; error?: string }> => {
    if (!isAdminAuthenticated) {
      return { success: false, migratedCount: 0, error: 'Authentication required for migration' };
    }
    setIsCloudSyncing(true);
    const res = await FirestoreService.migrateLocalContentToFirestore({
      questions,
      quranVerses,
      hadiths,
      duas,
      reminders,
      categories
    });
    setIsCloudSyncing(false);
    if (res.success) {
      showToast(`Successfully synced ${res.migratedCount} items to Firestore! ☁️`);
    } else {
      showToast(`Migration error: ${res.error || 'Check network'}`);
    }
    return res;
  };

  // Safe One-Time Migration: Local Content -> Supabase PostgreSQL
  const migrateLocalToSupabase = async (): Promise<{ success: boolean; migratedCount: number; error?: string }> => {
    if (!isAdminAuthenticated) {
      return { success: false, migratedCount: 0, error: 'Authentication required for migration' };
    }
    setIsCloudSyncing(true);
    const res = await SupabaseService.migrateLocalContentToSupabase({
      questions,
      quranVerses,
      hadiths,
      duas,
      reminders,
      categories,
      verifiedQAs
    });
    setIsCloudSyncing(false);
    if (res.success) {
      showToast(`Successfully synced ${res.migratedCount} items to Supabase! ⚡`);
      fetchDatabaseStats().catch(() => {});
    } else {
      showToast(`Supabase migration notice: ${res.error || 'Check admin authorization'}`);
    }
    return res;
  };

  // Admin Question CRUD with Supabase (Primary) and Firestore (Fallback)
  const addQuestion = (q: Omit<QuizQuestion, 'id'>) => {
    const newId = `q-adm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newQuestion: QuizQuestion = {
      ...q,
      id: newId,
      isActive: true
    };
    setQuestions(prev => [newQuestion, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Creating quiz question in Supabase... ⚡');
      SupabaseService.saveQuestion(newQuestion).then(res => {
        if (res.success) {
          showToast('Question live on Supabase! ✅');
        } else {
          showToast(`Supabase write notice: ${res.error || 'Failed'}`);
        }
      });
    } else {
      showToast('Quiz question created! Syncing to Firestore... ☁️');
      FirestoreService.saveQuestion(newQuestion).then(res => {
        if (res.success) {
          showToast('Question live across all users (Firebase)! ✅');
        }
      });
    }
  };

  const updateQuestion = (id: string, updated: Partial<QuizQuestion>) => {
    const existing = questions.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...updated };
    setQuestions(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Updating question in Supabase... ⚡');
      SupabaseService.saveQuestion(merged).then(res => {
        if (res.success) showToast('Question updated in Supabase! ✅');
      });
    } else {
      showToast('Updating question in Firestore... ✏️');
      FirestoreService.saveQuestion(merged).then(res => {
        if (res.success) showToast('Question updated in Firestore! ✅');
      });
    }
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Deleting question from Supabase... 🗑️');
      SupabaseService.deleteQuestion(id).then(res => {
        if (res.success) showToast('Question deleted from Supabase.');
      });
    } else {
      showToast('Deleting question from Firestore... 🗑️');
      FirestoreService.deleteQuestion(id).then(res => {
        if (res.success) showToast('Question deleted from Firestore.');
      });
    }
  };

  const toggleQuestionActive = (id: string) => {
    const existing = questions.find(item => item.id === id);
    if (!existing) return;
    const nextState = existing.isActive === false;
    const merged = { ...existing, isActive: nextState };
    setQuestions(prev => prev.map(item => item.id === id ? merged : item));
    showToast(nextState ? 'Question activated ✅' : 'Question deactivated ⏸️');

    if (isSupabaseConfigured()) {
      SupabaseService.saveQuestion(merged);
    } else {
      FirestoreService.saveQuestion(merged);
    }
  };

  // Admin Quran Verses CRUD
  const addQuranVerse = (v: Omit<QuranVerse, 'id'>) => {
    const id = `verse-adm-${Date.now()}`;
    const newVerse: QuranVerse = { ...v, id };
    setQuranVerses(prev => [newVerse, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Quran verse added to Supabase! 📖');
      SupabaseService.saveQuranVerse(newVerse);
    } else {
      showToast('Quran verse added to Firestore! 📖');
      FirestoreService.saveQuranVerse(newVerse);
    }
  };

  const updateQuranVerse = (id: string, v: Partial<QuranVerse>) => {
    const existing = quranVerses.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...v };
    setQuranVerses(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Quran verse updated in Supabase!');
      SupabaseService.saveQuranVerse(merged);
    } else {
      showToast('Quran verse updated in Firestore!');
      FirestoreService.saveQuranVerse(merged);
    }
  };

  const deleteQuranVerse = (id: string) => {
    setQuranVerses(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Quran verse deleted from Supabase.');
      SupabaseService.deleteQuranVerse(id);
    } else {
      showToast('Quran verse deleted from Firestore.');
      FirestoreService.deleteQuranVerse(id);
    }
  };

  // Admin Hadith CRUD
  const addHadith = (h: Omit<HadithItem, 'id'>) => {
    const id = `hadith-adm-${Date.now()}`;
    const newHadith: HadithItem = { ...h, id };
    setHadiths(prev => [newHadith, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Hadith added to Supabase! 📜');
      SupabaseService.saveHadith(newHadith);
    } else {
      showToast('Hadith added to Firestore! 📜');
      FirestoreService.saveHadith(newHadith);
    }
  };

  const updateHadith = (id: string, h: Partial<HadithItem>) => {
    const existing = hadiths.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...h };
    setHadiths(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Hadith updated in Supabase!');
      SupabaseService.saveHadith(merged);
    } else {
      showToast('Hadith updated in Firestore!');
      FirestoreService.saveHadith(merged);
    }
  };

  const deleteHadith = (id: string) => {
    setHadiths(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Hadith deleted from Supabase.');
      SupabaseService.deleteHadith(id);
    } else {
      showToast('Hadith deleted from Firestore.');
      FirestoreService.deleteHadith(id);
    }
  };

  // Admin Dua CRUD
  const addDua = (d: Omit<DuaItem, 'id'>) => {
    const id = `dua-adm-${Date.now()}`;
    const newDua: DuaItem = { ...d, id };
    setDuas(prev => [newDua, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Dua added to Supabase! 🤲');
      SupabaseService.saveDua(newDua);
    } else {
      showToast('Dua added to Firestore! 🤲');
      FirestoreService.saveDua(newDua);
    }
  };

  const updateDua = (id: string, d: Partial<DuaItem>) => {
    const existing = duas.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...d };
    setDuas(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Dua updated in Supabase!');
      SupabaseService.saveDua(merged);
    } else {
      showToast('Dua updated in Firestore!');
      FirestoreService.saveDua(merged);
    }
  };

  const deleteDua = (id: string) => {
    setDuas(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Dua deleted from Supabase.');
      SupabaseService.deleteDua(id);
    } else {
      showToast('Dua deleted from Firestore.');
      FirestoreService.deleteDua(id);
    }
  };

  // Admin Reminder CRUD
  const addReminder = (r: Omit<IslamicReminder, 'id'>) => {
    const id = `rem-adm-${Date.now()}`;
    const newReminder: IslamicReminder = { ...r, id };
    setReminders(prev => [newReminder, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Reminder added to Supabase! 💡');
      SupabaseService.saveReminder(newReminder);
    } else {
      showToast('Reminder added to Firestore! 💡');
      FirestoreService.saveReminder(newReminder);
    }
  };

  const updateReminder = (id: string, r: Partial<IslamicReminder>) => {
    const existing = reminders.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...r };
    setReminders(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Reminder updated in Supabase!');
      SupabaseService.saveReminder(merged);
    } else {
      showToast('Reminder updated in Firestore!');
      FirestoreService.saveReminder(merged);
    }
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Reminder deleted from Supabase.');
      SupabaseService.deleteReminder(id);
    } else {
      showToast('Reminder deleted from Firestore.');
      FirestoreService.deleteReminder(id);
    }
  };

  // Admin Verified Islamic Q&A CRUD (public.verified_qas)
  const addVerifiedQA = (qa: Omit<VerifiedQA, 'id'>) => {
    const id = `qa-adm-${Date.now()}`;
    const newQA: VerifiedQA = { ...qa, id };
    setVerifiedQAs(prev => [newQA, ...prev]);

    if (isSupabaseConfigured()) {
      showToast('Verified Q&A created! Syncing to Supabase... ⚡');
      SupabaseService.saveVerifiedQA(newQA).then(res => {
        if (res.success) showToast('Q&A live on Supabase! ✅');
        else showToast(`Supabase write notice: ${res.error || 'Failed'}`);
      });
    } else {
      showToast('Verified Q&A saved locally! ✅');
    }
  };

  const updateVerifiedQA = (id: string, qa: Partial<VerifiedQA>) => {
    const existing = verifiedQAs.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...qa };
    setVerifiedQAs(prev => prev.map(item => item.id === id ? merged : item));

    if (isSupabaseConfigured()) {
      showToast('Updating Q&A in Supabase... ⚡');
      SupabaseService.saveVerifiedQA(merged).then(res => {
        if (res.success) showToast('Q&A updated in Supabase! ✅');
      });
    } else {
      showToast('Q&A updated locally! ✅');
    }
  };

  const deleteVerifiedQA = (id: string) => {
    setVerifiedQAs(prev => prev.filter(item => item.id !== id));

    if (isSupabaseConfigured()) {
      showToast('Deleting Q&A from Supabase... 🗑️');
      SupabaseService.deleteVerifiedQA(id).then(res => {
        if (res.success) showToast('Q&A deleted from Supabase.');
      });
    } else {
      showToast('Q&A deleted locally.');
    }
  };

  // Admin Categories CRUD
  const addCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const nextList = [...categories, trimmed];
    setCategories(nextList);

    if (isSupabaseConfigured()) {
      showToast(`Category "${trimmed}" added to Supabase! 🏷️`);
      SupabaseService.saveCategories(nextList);
    } else {
      showToast(`Category "${trimmed}" added! 🏷️`);
      FirestoreService.saveCategories(nextList);
    }
  };

  const deleteCategory = (cat: string) => {
    const nextList = categories.filter(c => c !== cat);
    setCategories(nextList);

    if (isSupabaseConfigured()) {
      showToast(`Category "${cat}" removed from Supabase.`);
      SupabaseService.saveCategories(nextList);
    } else {
      showToast(`Category "${cat}" removed.`);
      FirestoreService.saveCategories(nextList);
    }
  };

  // Explicit Supabase Admin Bootstrap & Diagnostics
  const claimAdminBootstrap = async (): Promise<{ success: boolean; message?: string; error?: string }> => {
    return AdminAuthService.claimAdminBootstrap();
  };

  // ---------------------------------------------------------------------------
  // Public & Admin Scholars Library (Admin-managed Q&A)
  // ---------------------------------------------------------------------------
  const fetchPublicScholarLibrary = async () => {
    setIsLoadingScholarLibrary(true);
    try {
      const items = await SupabaseService.getPublicScholarQALibrary();
      if (items && items.length > 0) {
        setPublicScholarLibrary(items);
      }
    } catch (err) {
      console.warn('Failed to load public scholar library:', err);
    } finally {
      setIsLoadingScholarLibrary(false);
    }
  };

  const fetchAdminScholarLibrary = async () => {
    setIsLoadingScholarLibrary(true);
    try {
      const res = await SupabaseService.adminGetAllScholarQAs();
      if (res.success && res.data) {
        setAdminScholarLibrary(res.data);
      }
    } catch (err) {
      console.warn('Failed to load admin scholar library:', err);
    } finally {
      setIsLoadingScholarLibrary(false);
    }
  };

  const adminSaveScholarQA = async (item: Partial<ScholarQALibraryItem> & ScholarQAFormData) => {
    const res = await SupabaseService.adminSaveScholarQA(item);
    if (res.success && res.data) {
      const saved = res.data;
      setAdminScholarLibrary(prev => {
        const idx = prev.findIndex(x => x.id === saved.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = saved;
          return next;
        }
        return [saved, ...prev];
      });

      if (saved.status === 'published') {
        setPublicScholarLibrary(prev => {
          const idx = prev.findIndex(x => x.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else {
        setPublicScholarLibrary(prev => prev.filter(x => x.id !== saved.id));
      }
      showToast(item.id ? 'Scholar Q&A updated! ✅' : 'Scholar Q&A created! ✅');
    } else {
      showToast(res.error || 'Failed to save Scholar Q&A');
    }
    return res;
  };

  const adminDeleteScholarQA = async (id: string) => {
    const res = await SupabaseService.adminDeleteScholarQA(id);
    if (res.success) {
      setAdminScholarLibrary(prev => prev.filter(x => x.id !== id));
      setPublicScholarLibrary(prev => prev.filter(x => x.id !== id));
      showToast('Scholar Q&A deleted.');
    } else {
      showToast(res.error || 'Failed to delete Scholar Q&A');
    }
    return res;
  };

  const adminToggleScholarQAPublish = async (id: string, newStatus: 'published' | 'draft') => {
    const res = await SupabaseService.adminToggleScholarQAPublication(id, newStatus);
    if (res.success) {
      setAdminScholarLibrary(prev => prev.map(x => {
        if (x.id === id) {
          return {
            ...x,
            status: newStatus,
            publishedAt: newStatus === 'published' ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString()
          };
        }
        return x;
      }));

      if (newStatus === 'published') {
        fetchPublicScholarLibrary();
      } else {
        setPublicScholarLibrary(prev => prev.filter(x => x.id !== id));
      }
      showToast(newStatus === 'published' ? 'Entry published to Public Library! 🌐' : 'Entry moved to Drafts 🔒');
    } else {
      showToast(res.error || 'Failed to update publication status');
    }
    return res;
  };

  const fetchDatabaseStats = async (): Promise<void> => {
    if (isSupabaseConfigured()) {
      const stats = await SupabaseService.getDatabaseStatistics();
      if (stats) setDatabaseStats(stats);
    }
  };

  const resetAllContentToDefaults = () => {
    const defQuestions = VERIFIED_QUESTIONS.map(q => ({ ...q, isActive: true }));
    setQuestions(defQuestions);
    setQuranVerses(VERIFIED_QURAN_VERSES);
    setHadiths(VERIFIED_HADITHS);
    setDuas(VERIFIED_DUAS);
    setReminders(ISLAMIC_REMINDERS);
    setCategories(INITIAL_CATEGORIES);
    showToast('Database reset to verified initial content! 🔄');
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      // First check v2 storage
      const savedV2 = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        if (parsed.userMode) setUserModeState(parsed.userMode);
        if (parsed.contentLang) setContentLangState(parsed.contentLang);
        if (parsed.accountInfo) setAccountInfo(parsed.accountInfo);
        if (parsed.adultProgress) setAdultProgress(parsed.adultProgress);
        if (parsed.kidsProgress) setKidsProgress(parsed.kidsProgress);
        if (parsed.adultSalahHistory) setAdultSalahHistory(normalizeSalahHistory(parsed.adultSalahHistory, getLocalDateStr()));
        if (parsed.kidsSalahHistory) setKidsSalahHistory(normalizeSalahHistory(parsed.kidsSalahHistory, getLocalDateStr()));
        if (parsed.adultTasbihHistory) setAdultTasbihHistory(parsed.adultTasbihHistory);
        if (parsed.kidsTasbihHistory) setKidsTasbihHistory(parsed.kidsTasbihHistory);
        if (parsed.customDhikrData) setCustomDhikrData(parsed.customDhikrData);
        if (parsed.bookmarkedQAIds) setBookmarkedQAIds(parsed.bookmarkedQAIds);
        if (parsed.tasbihCount !== undefined) setTasbihCount(parsed.tasbihCount);
        if (parsed.tasbihTarget !== undefined) setTasbihTargetState(parsed.tasbihTarget);
        if (parsed.tasbihLaps !== undefined) setTasbihLaps(parsed.tasbihLaps);
        return;
      }

      // Check migration from v1
      const savedV1 = localStorage.getItem('islamiq_state_v1');
      if (savedV1) {
        const parsedV1 = JSON.parse(savedV1);
        if (parsedV1.userMode) setUserModeState(parsedV1.userMode);
        if (parsedV1.contentLang) setContentLangState(parsedV1.contentLang);
        if (parsedV1.userStats) {
          setAdultProgress(prev => ({
            ...prev,
            xp: parsedV1.userStats.xp || prev.xp,
            streakDays: parsedV1.userStats.streakDays || prev.streakDays,
            quizzesCompleted: parsedV1.userStats.quizzesCompleted || prev.quizzesCompleted,
            correctAnswersCount: parsedV1.userStats.correctAnswersCount || prev.correctAnswersCount,
            tasbihTotalLifetime: parsedV1.userStats.tasbihTotalLifetime || prev.tasbihTotalLifetime,
            salahCompletedTotal: parsedV1.userStats.salahCompletedTotal || prev.salahCompletedTotal,
            unlockedBadgeIds: parsedV1.userStats.unlockedBadgeIds || prev.unlockedBadgeIds
          }));
          if (parsedV1.userStats.userName) {
            setAccountInfo({
              isGuest: parsedV1.userStats.isGuest ?? true,
              userName: parsedV1.userStats.userName,
              email: parsedV1.userStats.email
            });
          }
        }
        if (parsedV1.salahHistory) {
          setAdultSalahHistory(prev => ({
            ...prev,
            ...normalizeSalahHistory(parsedV1.salahHistory, getLocalDateStr())
          }));
        }
      }
    } catch {
      // Storage parse error fallback
    }
  }, []);

  // Save to LocalStorage on updates
  useEffect(() => {
    try {
      const toSave = {
        userMode,
        contentLang,
        accountInfo,
        adultProgress,
        kidsProgress,
        adultSalahHistory,
        kidsSalahHistory,
        adultTasbihHistory,
        kidsTasbihHistory,
        customDhikrData,
        bookmarkedQAIds,
        tasbihCount,
        tasbihTarget,
        tasbihLaps
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Storage full or private mode
    }
  }, [
    userMode,
    contentLang,
    accountInfo,
    adultProgress,
    kidsProgress,
    adultSalahHistory,
    kidsSalahHistory,
    adultTasbihHistory,
    kidsTasbihHistory,
    customDhikrData,
    bookmarkedQAIds,
    tasbihCount,
    tasbihTarget,
    tasbihLaps
  ]);

  // Mode switching preserving all data
  const setUserMode = React.useCallback((mode: UserMode) => {
    setUserModeState(mode);
    setTasbihCount(0);
    showToast(mode === 'kids' ? 'Kids Mode activated! 🎈 (بچوں کا موڈ)' : 'Adult Mode activated 🌿 (بڑوں کا موڈ)');
  }, []);

  const setContentLang = (lang: ContentLanguage) => {
    setContentLangState(lang);
    showToast(lang === 'urdu' ? 'اردو مواد منتخب کیا گیا' : 'English Islamic content selected');
  };

  // Active mode progress pointers
  const isKids = userMode === 'kids';
  const activeProgress = isKids ? kidsProgress : adultProgress;
  const setActiveProgress = isKids ? setKidsProgress : setAdultProgress;

  const currentSalahHistory = isKids ? kidsSalahHistory : adultSalahHistory;
  const setCurrentSalahHistory = isKids ? setKidsSalahHistory : setAdultSalahHistory;

  const currentTasbihHistory = isKids ? kidsTasbihHistory : adultTasbihHistory;
  const setCurrentTasbihHistory = isKids ? setKidsTasbihHistory : setAdultTasbihHistory;

  // Constructed UserStats for current active mode
  const userStats: UserStats = {
    isGuest: accountInfo.isGuest,
    userName: isKids ? `${accountInfo.userName} [Kids]` : accountInfo.userName,
    email: accountInfo.email,
    xp: activeProgress.xp,
    streakDays: activeProgress.streakDays,
    lastActiveDate: activeProgress.lastActiveDate,
    quizzesCompleted: activeProgress.quizzesCompleted,
    correctAnswersCount: activeProgress.correctAnswersCount,
    tasbihTotalLifetime: activeProgress.tasbihTotalLifetime,
    salahCompletedTotal: activeProgress.salahCompletedTotal,
    unlockedBadgeIds: activeProgress.unlockedBadgeIds,
    bookmarkedQAIds: bookmarkedQAIds
  };

  // Gamification XP & Badges for active mode
  const addXP = (points: number, reason?: string) => {
    setActiveProgress(prev => ({
      ...prev,
      xp: prev.xp + points
    }));
    if (reason) {
      showToast(`+${points} XP: ${reason}! 🌟`);
    }
  };

  const unlockBadge = (badgeId: string) => {
    setActiveProgress(prev => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev;
      showToast('🎉 New Badge Unlocked! (نیا اعزاز حاصل ہوا)');
      sounds.playComplete();
      return {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId]
      };
    });
  };

  const badges = INITIAL_BADGES.map(b => ({
    ...b,
    unlocked: activeProgress.unlockedBadgeIds.includes(b.id)
  }));

  const recordQuizCompleted = (
    score: number,
    totalQuestions: number,
    difficulty?: QuizDifficulty,
    category?: string
  ) => {
    const isPerfect = score === totalQuestions;
    const earnedXP = score * 20 + (isPerfect ? 60 : 25);

    setActiveProgress(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      correctAnswersCount: prev.correctAnswersCount + score,
      xp: prev.xp + earnedXP
    }));

    if (isPerfect) {
      unlockBadge('b-quiz-champion');
    }
    unlockBadge('b-first-step');
    showToast(`Quiz Completed! +${earnedXP} XP Earned! 🏆`);

    // Log attempt for Admin Analytics
    const newAttempt: QuizAttemptRecord = {
      id: `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: Date.now(),
      date: getTodayStr(),
      mode: userMode,
      difficulty: difficulty || 'beginner',
      category: category || 'General',
      score,
      totalQuestions,
      accuracy: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
      userName: userStats.userName
    };
    setQuizAttempts(prev => [newAttempt, ...prev].slice(0, 150));

    if (isSupabaseConfigured()) {
      SupabaseService.logQuizAttempt(newAttempt);
    }
  };

  // Salah Tracker Logic
  const todaySalah = currentSalahHistory[todayDateStr] || {
    date: todayDateStr,
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
    tahajjud: false
  };

  const toggleSalahPrayer = (
    prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud',
    targetDate?: string
  ) => {
    const dateToUse = targetDate || todayDateStr;

    // Future dates are not editable
    if (dateToUse > todayDateStr) {
      showToast('Future dates cannot be edited.');
      return;
    }

    const currentRecord: SalahDayRecord = currentSalahHistory[dateToUse] || {
      date: dateToUse,
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
      tahajjud: false
    };

    const currentStatus = !!currentRecord[prayer];
    const newStatus = !currentStatus;

    const updatedRecord: SalahDayRecord = {
      ...currentRecord,
      [prayer]: newStatus
    };

    setCurrentSalahHistory(prev => ({
      ...prev,
      [dateToUse]: updatedRecord
    }));

    if (newStatus) {
      sounds.playCorrect();
      addXP(10, `${prayer.toUpperCase()} Prayer logged`);
      setActiveProgress(prev => ({
        ...prev,
        salahCompletedTotal: prev.salahCompletedTotal + 1
      }));

      // Check if all 5 prayers logged for that date
      const allFive = updatedRecord.fajr && updatedRecord.dhuhr && updatedRecord.asr && updatedRecord.maghrib && updatedRecord.isha;
      if (allFive) {
        unlockBadge('b-salah-guardian');
        addXP(50, `All 5 daily prayers completed for ${dateToUse === todayDateStr ? 'today' : dateToUse}! Alhamdulillah`);
      }
    }
  };

  // Tasbih Logic
  const incrementTasbih = () => {
    sounds.playTasbihBead();

    // Haptic vibration if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(22);
    }

    const nextCount = tasbihCount + 1;
    setActiveProgress(prev => {
      const nextTotal = prev.tasbihTotalLifetime + 1;
      if (nextTotal >= 100) {
        unlockBadge('b-tasbih-master');
      }
      return { ...prev, tasbihTotalLifetime: nextTotal };
    });

    if (tasbihTarget > 0 && nextCount >= tasbihTarget) {
      sounds.playComplete();
      setTasbihCount(0);
      setTasbihLaps(prev => prev + 1);
      
      const dhikrDisplayName = currentDhikr.isCustom
        ? customDhikrData.transliteration
        : currentDhikr.transliteration;
      const dhikrArabic = currentDhikr.isCustom
        ? customDhikrData.arabic
        : currentDhikr.arabic;

      // Add to Tasbih History automatically upon target completion
      addTasbihHistoryRecord({
        date: getTodayStr(),
        timestamp: Date.now(),
        dhikrId: currentDhikr.id,
        dhikrName: dhikrDisplayName,
        arabic: dhikrArabic,
        count: tasbihTarget,
        target: tasbihTarget,
        completed: true
      });

      addXP(20, `Completed ${tasbihTarget}x ${dhikrDisplayName}`);
      showToast(`MashaAllah! Target of ${tasbihTarget} reached! 🎉`);
    } else {
      setTasbihCount(nextCount);
    }
  };

  const resetTasbih = () => {
    if (tasbihCount > 0) {
      const dhikrDisplayName = currentDhikr.isCustom
        ? customDhikrData.transliteration
        : currentDhikr.transliteration;
      const dhikrArabic = currentDhikr.isCustom
        ? customDhikrData.arabic
        : currentDhikr.arabic;

      // If user had a meaningful session before resetting, log it to history
      if (tasbihCount >= 10) {
        addTasbihHistoryRecord({
          date: getTodayStr(),
          timestamp: Date.now(),
          dhikrId: currentDhikr.id,
          dhikrName: dhikrDisplayName,
          arabic: dhikrArabic,
          count: tasbihCount,
          target: tasbihTarget,
          completed: false
        });
      }
    }
    setTasbihCount(0);
    showToast('Tasbih counter reset');
  };

  const setTasbihTarget = (target: number) => {
    setTasbihTargetState(target);
    setTasbihCount(0);
    showToast(`Target set to ${target}`);
  };

  const addTasbihHistoryRecord = (record: Omit<TasbihRecord, 'id'>) => {
    const newRecord: TasbihRecord = {
      ...record,
      id: `tasbih-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    };
    setCurrentTasbihHistory(prev => [newRecord, ...prev]);
  };

  const clearTasbihHistory = () => {
    setCurrentTasbihHistory([]);
    showToast('Tasbih history cleared');
  };

  // Quiz non-repetition tracking
  const recentQuestionIds = activeProgress.recentQuizQuestionIds || [];
  const markQuestionsAsUsed = (ids: string[]) => {
    setActiveProgress(prev => {
      const existing = prev.recentQuizQuestionIds || [];
      const updated = Array.from(new Set([...existing, ...ids])).slice(-35); // Keep up to 35 recent question IDs
      return {
        ...prev,
        recentQuizQuestionIds: updated
      };
    });
  };

  // Bookmarking Q&As
  const toggleBookmarkQA = (id: string) => {
    setBookmarkedQAIds(prev => {
      const exists = prev.includes(id);
      const updated = exists
        ? prev.filter(item => item !== id)
        : [...prev, id];
      showToast(exists ? 'Removed from bookmarks' : 'Added to bookmarks ⭐');
      return updated;
    });
  };

  // Account Linking / Sync
  const linkAccount = (name: string, email: string) => {
    setAccountInfo({
      isGuest: false,
      userName: name,
      email: email
    });
    addXP(50, 'Account connected');
    showToast('Account synced successfully! Progress preserved.');
  };

  const logoutToGuest = () => {
    setAccountInfo({
      isGuest: true,
      userName: 'Guest Seeker (مہمان طالب)',
      email: undefined
    });
    showToast('Switched back to Guest Mode.');
  };

  const exportData = (): string => {
    const backup = {
      version: 2,
      userMode,
      contentLang,
      accountInfo,
      adultProgress,
      kidsProgress,
      adultSalahHistory,
      kidsSalahHistory,
      adultTasbihHistory,
      kidsTasbihHistory,
      customDhikrData,
      bookmarkedQAIds,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.adultProgress) setAdultProgress(parsed.adultProgress);
      if (parsed.kidsProgress) setKidsProgress(parsed.kidsProgress);
      if (parsed.accountInfo) setAccountInfo(parsed.accountInfo);
      if (parsed.adultSalahHistory) setAdultSalahHistory(parsed.adultSalahHistory);
      if (parsed.kidsSalahHistory) setKidsSalahHistory(parsed.kidsSalahHistory);
      if (parsed.adultTasbihHistory) setAdultTasbihHistory(parsed.adultTasbihHistory);
      if (parsed.kidsTasbihHistory) setKidsTasbihHistory(parsed.kidsTasbihHistory);
      if (parsed.customDhikrData) setCustomDhikrData(parsed.customDhikrData);
      if (parsed.userMode) setUserModeState(parsed.userMode);
      if (parsed.contentLang) setContentLangState(parsed.contentLang);
      if (parsed.bookmarkedQAIds) setBookmarkedQAIds(parsed.bookmarkedQAIds);
      showToast('Data restored successfully! 📥');
      return true;
    } catch {
      showToast('Invalid backup file. Could not import.');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        userMode,
        setUserMode,
        contentLang,
        setContentLang,
        activeTab,
        setActiveTab,
        isMoreOpen,
        setIsMoreOpen,
        isShareOpen,
        setIsShareOpen,
        userStats,
        addXP,
        recordQuizCompleted,
        badges,
        unlockBadge,
        linkAccount,
        logoutToGuest,
        exportData,
        importData,
        adultProgress,
        kidsProgress,
        todayDateStr,
        todaySalah,
        toggleSalahPrayer,
        salahHistory: currentSalahHistory,
        currentDhikr,
        setCurrentDhikr,
        tasbihCount,
        tasbihTarget,
        tasbihLaps,
        incrementTasbih,
        resetTasbih,
        setTasbihTarget,
        tasbihHistory: currentTasbihHistory,
        addTasbihHistoryRecord,
        clearTasbihHistory,
        customDhikrData,
        setCustomDhikrData,
        recentQuestionIds,
        markQuestionsAsUsed,
        bookmarkedQAs: bookmarkedQAIds,
        toggleBookmarkQA,
        isSpeaking,
        setIsSpeaking,
        toastMessage,
        showToast,

        // Admin Panel & Database Management
        activeBackend,
        questions,
        quranVerses,
        hadiths,
        duas,
        reminders,
        verifiedQAs,
        categories,
        quizAttempts,
        databaseStats,
        fetchDatabaseStats,

        // Admin Security
        isAdminAuthenticated,
        isAdminSetupComplete,
        adminEmail,
        adminUid,
        verifyAdminPasskey,
        setupAdminMasterPassword,
        updateAdminPasskey,
        adminLogout,
        checkAdminStatus,
        syncAdminAuthorization,
        claimAdminBootstrap,

        // Admin Question CRUD
        addQuestion,
        updateQuestion,
        deleteQuestion,
        toggleQuestionActive,

        // Admin Content CRUD
        addQuranVerse,
        updateQuranVerse,
        deleteQuranVerse,
        addHadith,
        updateHadith,
        deleteHadith,
        addDua,
        updateDua,
        deleteDua,
        addReminder,
        updateReminder,
        deleteReminder,
        addVerifiedQA,
        updateVerifiedQA,
        deleteVerifiedQA,
        addCategory,
        deleteCategory,
        resetAllContentToDefaults,
        migrateLocalToFirestore,
        migrateLocalToSupabase,
        isCloudSyncing,
        cloudSyncError,

        // Public & Admin Scholars Library
        publicScholarLibrary,
        adminScholarLibrary,
        isLoadingScholarLibrary,
        fetchPublicScholarLibrary,
        fetchAdminScholarLibrary,
        adminSaveScholarQA,
        adminDeleteScholarQA,
        adminToggleScholarQAPublish
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

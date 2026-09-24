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
  AppTab
} from '../types';
import {
  DHIKR_LIST,
  INITIAL_BADGES,
  VERIFIED_QUESTIONS,
  VERIFIED_QURAN_VERSES,
  VERIFIED_HADITHS,
  VERIFIED_DUAS,
  ISLAMIC_REMINDERS
} from '../data/verifiedContent';
import { sounds } from '../utils/audio';
import { AdminAuthService, PRIMARY_ADMIN_EMAIL } from '../services/adminAuth';
import { FirestoreService } from '../services/firestoreService';

interface AppContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  contentLang: ContentLanguage;
  setContentLang: (lang: ContentLanguage) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  
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

  // Notification / Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Admin Panel & Database Management
  questions: QuizQuestion[];
  quranVerses: QuranVerse[];
  hadiths: HadithItem[];
  duas: DuaItem[];
  reminders: IslamicReminder[];
  categories: string[];
  quizAttempts: QuizAttemptRecord[];

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
  addCategory: (cat: string) => void;
  deleteCategory: (cat: string) => void;
  resetAllContentToDefaults: () => void;
  migrateLocalToFirestore: () => Promise<{ success: boolean; migratedCount: number; error?: string }>;
  isCloudSyncing: boolean;
  cloudSyncError: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'islamiq_state_v2';
const LOCAL_STORAGE_ADMIN_KEY = 'islamiq_admin_db_v2';

const getTodayStr = () => new Date().toISOString().split('T')[0];

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
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
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
        'zakat-basics'
      ];
      if (validCleanTabs.includes(path as AppTab)) {
        return path as AppTab;
      }
    }
    return 'home';
  });

  // Dates
  const [todayDateStr] = useState<string>(getTodayStr());

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

  // Separate Salah Tracking History
  const [adultSalahHistory, setAdultSalahHistory] = useState<Record<string, SalahDayRecord>>({
    [getTodayStr()]: {
      date: getTodayStr(),
      fajr: true,
      dhuhr: true,
      asr: false,
      maghrib: false,
      isha: false,
      tahajjud: false
    }
  });

  const [kidsSalahHistory, setKidsSalahHistory] = useState<Record<string, SalahDayRecord>>({
    [getTodayStr()]: {
      date: getTodayStr(),
      fajr: true,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
      tahajjud: false
    }
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
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>(initialSampleAttempts);

  // Admin Security (Server-backed & Token-based)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminSetupComplete, setIsAdminSetupComplete] = useState<boolean>(true);
  const [adminEmail, setAdminEmail] = useState<string>(PRIMARY_ADMIN_EMAIL);
  const [adminUid, setAdminUid] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [cloudSyncError, setCloudSyncError] = useState<string | null>(null);

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
        setAdminUid(user.uid);
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

  // 2. Real-time / Cloud sync with Firestore for questions and shared content
  useEffect(() => {
    setIsCloudSyncing(true);
    // Realtime subscription to Firestore questions collection
    const unsubscribeQuestions = FirestoreService.listenQuestions(
      (remoteQuestions) => {
        if (remoteQuestions && remoteQuestions.length > 0) {
          setQuestions(prev => {
            // If remote questions have full dataset (>= 50), use remote directly
            if (remoteQuestions.length >= 50) {
              return remoteQuestions;
            }
            // Otherwise, merge remote questions over local/verified questions by ID
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

    // Fetch initial daily feeds & categories from Firestore
    const fetchRemoteFeeds = async () => {
      try {
        const [verses, hadithsList, duasList, remindersList, remoteCats] = await Promise.all([
          FirestoreService.getQuranVerses(),
          FirestoreService.getHadiths(),
          FirestoreService.getDuas(),
          FirestoreService.getReminders(),
          FirestoreService.getCategories()
        ]);
        if (verses.length > 0) setQuranVerses(verses);
        if (hadithsList.length > 0) setHadiths(hadithsList);
        if (duasList.length > 0) setDuas(duasList);
        if (remindersList.length > 0) setReminders(remindersList);
        if (remoteCats && remoteCats.length > 0) setCategories(remoteCats);
      } catch (err: any) {
        console.warn('[Firestore] Sync warning:', err);
        setCloudSyncError('Operating in offline/cached mode');
      }
    };

    fetchRemoteFeeds();

    return () => {
      unsubscribeQuestions();
    };
  }, []);

  // Save Admin DB to LocalStorage as offline cache (does not overwrite or replace Firestore)
  useEffect(() => {
    try {
      const adminData = {
        questions,
        quranVerses,
        hadiths,
        duas,
        reminders,
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
        setAdminUid(currentUser.uid);
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

  // Admin Question CRUD with Firestore Cloud Persistence
  const addQuestion = (q: Omit<QuizQuestion, 'id'>) => {
    const newId = `q-adm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newQuestion: QuizQuestion = {
      ...q,
      id: newId,
      isActive: true
    };
    // Optimistic local update
    setQuestions(prev => [newQuestion, ...prev]);
    showToast('Quiz question created! Syncing to Firestore... ☁️');

    // Async Firestore write
    FirestoreService.saveQuestion(newQuestion).then(res => {
      if (res.success) {
        showToast('Question live across all users! ✅');
      } else {
        console.warn('Firestore write warning:', res.error);
      }
    });
  };

  const updateQuestion = (id: string, updated: Partial<QuizQuestion>) => {
    const existing = questions.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...updated };

    // Optimistic local update
    setQuestions(prev => prev.map(item => item.id === id ? merged : item));
    showToast('Updating question in Firestore... ✏️');

    // Async Firestore update
    FirestoreService.saveQuestion(merged).then(res => {
      if (res.success) {
        showToast('Question updated in Firestore! ✅');
      }
    });
  };

  const deleteQuestion = (id: string) => {
    // Optimistic local update
    setQuestions(prev => prev.filter(item => item.id !== id));
    showToast('Deleting question from Firestore... 🗑️');

    // Async Firestore delete
    FirestoreService.deleteQuestion(id).then(res => {
      if (res.success) {
        showToast('Question deleted from Firestore.');
      }
    });
  };

  const toggleQuestionActive = (id: string) => {
    const existing = questions.find(item => item.id === id);
    if (!existing) return;
    const nextState = existing.isActive === false;
    const merged = { ...existing, isActive: nextState };

    // Optimistic local update
    setQuestions(prev => prev.map(item => item.id === id ? merged : item));
    showToast(nextState ? 'Question activated ✅' : 'Question deactivated ⏸️');

    // Async Firestore update
    FirestoreService.saveQuestion(merged);
  };

  // Admin Content CRUD with Firestore
  const addQuranVerse = (v: Omit<QuranVerse, 'id'>) => {
    const id = `verse-adm-${Date.now()}`;
    const newVerse: QuranVerse = { ...v, id };
    setQuranVerses(prev => [newVerse, ...prev]);
    showToast('Quran verse added! 📖');
    FirestoreService.saveQuranVerse(newVerse);
  };

  const updateQuranVerse = (id: string, v: Partial<QuranVerse>) => {
    const existing = quranVerses.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...v };
    setQuranVerses(prev => prev.map(item => item.id === id ? merged : item));
    showToast('Quran verse updated!');
    FirestoreService.saveQuranVerse(merged);
  };

  const deleteQuranVerse = (id: string) => {
    setQuranVerses(prev => prev.filter(item => item.id !== id));
    showToast('Quran verse deleted.');
    FirestoreService.deleteQuranVerse(id);
  };

  const addHadith = (h: Omit<HadithItem, 'id'>) => {
    const id = `hadith-adm-${Date.now()}`;
    const newHadith: HadithItem = { ...h, id };
    setHadiths(prev => [newHadith, ...prev]);
    showToast('Hadith added! 📜');
    FirestoreService.saveHadith(newHadith);
  };

  const updateHadith = (id: string, h: Partial<HadithItem>) => {
    const existing = hadiths.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...h };
    setHadiths(prev => prev.map(item => item.id === id ? merged : item));
    showToast('Hadith updated!');
    FirestoreService.saveHadith(merged);
  };

  const deleteHadith = (id: string) => {
    setHadiths(prev => prev.filter(item => item.id !== id));
    showToast('Hadith deleted.');
    FirestoreService.deleteHadith(id);
  };

  const addDua = (d: Omit<DuaItem, 'id'>) => {
    const id = `dua-adm-${Date.now()}`;
    const newDua: DuaItem = { ...d, id };
    setDuas(prev => [newDua, ...prev]);
    showToast('Dua added! 🤲');
    FirestoreService.saveDua(newDua);
  };

  const updateDua = (id: string, d: Partial<DuaItem>) => {
    const existing = duas.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...d };
    setDuas(prev => prev.map(item => item.id === id ? merged : item));
    showToast('Dua updated!');
    FirestoreService.saveDua(merged);
  };

  const deleteDua = (id: string) => {
    setDuas(prev => prev.filter(item => item.id !== id));
    showToast('Dua deleted.');
    FirestoreService.deleteDua(id);
  };

  const addReminder = (r: Omit<IslamicReminder, 'id'>) => {
    const id = `rem-adm-${Date.now()}`;
    const newReminder: IslamicReminder = { ...r, id };
    setReminders(prev => [newReminder, ...prev]);
    showToast('Islamic reminder added! 💡');
    FirestoreService.saveReminder(newReminder);
  };

  const updateReminder = (id: string, r: Partial<IslamicReminder>) => {
    const existing = reminders.find(item => item.id === id);
    if (!existing) return;
    const merged = { ...existing, ...r };
    setReminders(prev => prev.map(item => item.id === id ? merged : item));
    showToast('Reminder updated!');
    FirestoreService.saveReminder(merged);
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(item => item.id !== id));
    showToast('Reminder deleted.');
    FirestoreService.deleteReminder(id);
  };

  const addCategory = (cat: string) => {
    const trimmed = cat.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const nextList = [...categories, trimmed];
    setCategories(nextList);
    showToast(`Category "${trimmed}" added! 🏷️`);
    FirestoreService.saveCategories(nextList);
  };

  const deleteCategory = (cat: string) => {
    const nextList = categories.filter(c => c !== cat);
    setCategories(nextList);
    showToast(`Category "${cat}" removed.`);
    FirestoreService.saveCategories(nextList);
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
        if (parsed.adultSalahHistory) setAdultSalahHistory(parsed.adultSalahHistory);
        if (parsed.kidsSalahHistory) setKidsSalahHistory(parsed.kidsSalahHistory);
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
        if (parsedV1.salahHistory) setAdultSalahHistory(parsedV1.salahHistory);
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
  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
    setTasbihCount(0);
    showToast(mode === 'kids' ? 'Kids Mode activated! 🎈 (بچوں کا موڈ)' : 'Adult Mode activated 🌿 (بڑوں کا موڈ)');
  };

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
        questions,
        quranVerses,
        hadiths,
        duas,
        reminders,
        categories,
        quizAttempts,

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
        addCategory,
        deleteCategory,
        resetAllContentToDefaults,
        migrateLocalToFirestore,
        isCloudSyncing,
        cloudSyncError
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

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QuizQuestion, QuizCategory, QuizDifficulty, QuranVerse, HadithItem, DuaItem, IslamicReminder, UserMode } from '../types';
import {
  Lock,
  Key,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Power,
  RefreshCw,
  BarChart3,
  BookOpen,
  Layers,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  ArrowLeft,
  LogOut,
  Check,
  AlertTriangle,
  Sparkles,
  Award,
  ChevronDown,
  DollarSign,
  Globe,
  Smartphone,
  ExternalLink,
  Cloud,
  CloudOff,
  Database,
  Mail
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const {
    isAdminAuthenticated,
    isAdminSetupComplete,
    adminEmail,
    adminUid,
    verifyAdminPasskey,
    setupAdminMasterPassword,
    updateAdminPasskey,
    adminLogout,
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleQuestionActive,
    quranVerses,
    addQuranVerse,
    updateQuranVerse,
    deleteQuranVerse,
    hadiths,
    addHadith,
    updateHadith,
    deleteHadith,
    duas,
    addDua,
    updateDua,
    deleteDua,
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    categories,
    addCategory,
    deleteCategory,
    quizAttempts,
    resetAllContentToDefaults,
    showToast,
    adultProgress,
    kidsProgress,
    migrateLocalToFirestore,
    isCloudSyncing,
    cloudSyncError
  } = useApp();

  // Migration running state
  const [isMigrating, setIsMigrating] = useState(false);

  // Login State
  const [emailInput, setEmailInput] = useState(adminEmail || 'dk.tanooli97@gmail.com');
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPasskeyText, setShowPasskeyText] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Admin Navigation Tabs
  const [activeAdminTab, setActiveAdminTab] = useState<'questions' | 'daily' | 'categories' | 'analytics' | 'monetization'>('questions');
  const [dailySubTab, setDailySubTab] = useState<'quran' | 'hadith' | 'dua' | 'reminder'>('quran');

  // Question Filters
  const [questionSearch, setQuestionSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'adult' | 'kids'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Question Edit / Add Modal State
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionFormData, setQuestionFormData] = useState<{
    forKids: boolean;
    difficulty: QuizDifficulty;
    category: QuizCategory;
    questionUrdu: string;
    questionEn: string;
    optionsUrdu: [string, string, string, string];
    optionsEn: [string, string, string, string];
    correctIndex: number;
    explanationUrdu: string;
    explanationEn: string;
    kidsHintUrdu: string;
    kidsHintEn: string;
    isActive: boolean;
  }>({
    forKids: false,
    difficulty: 'beginner',
    category: 'Pillars',
    questionUrdu: '',
    questionEn: '',
    optionsUrdu: ['', '', '', ''],
    optionsEn: ['', '', '', ''],
    correctIndex: 0,
    explanationUrdu: '',
    explanationEn: '',
    kidsHintUrdu: '',
    kidsHintEn: '',
    isActive: true
  });

  // Daily Content Modals State
  const [contentModalType, setContentModalType] = useState<'quran' | 'hadith' | 'dua' | 'reminder' | null>(null);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);

  // Form states for Content
  const [verseForm, setVerseForm] = useState<Omit<QuranVerse, 'id'>>({
    surahNameArabic: 'البقرة',
    surahNameEn: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 286,
    arabic: '',
    translationUrdu: '',
    translationEn: '',
    theme: 'Mercy & Ease'
  });

  const [hadithForm, setHadithForm] = useState<Omit<HadithItem, 'id'>>({
    narrator: 'Abu Hurairah (R.A)',
    arabic: '',
    textUrdu: '',
    textEn: '',
    source: 'Sahih al-Bukhari',
    hadithNumber: '1',
    grade: 'Sahih',
    lessonUrdu: 'اخلاق کی اہمیت',
    lessonEn: 'Importance of good character'
  });

  const [duaForm, setDuaForm] = useState<Omit<DuaItem, 'id'>>({
    titleUrdu: '',
    titleEn: '',
    arabic: '',
    transliteration: '',
    translationUrdu: '',
    translationEn: '',
    occasionUrdu: 'صبح اور شام',
    occasionEn: 'Morning & Evening',
    reference: 'Sunan Abu Dawud'
  });

  const [reminderForm, setReminderForm] = useState<Omit<IslamicReminder, 'id'>>({
    titleUrdu: '',
    titleEn: '',
    bodyUrdu: '',
    bodyEn: '',
    category: 'Akhlaq',
    practicalTipUrdu: 'مسکراہٹ بھی صدقہ ہے',
    practicalTipEn: 'Smiling is charity'
  });

  // Security / Passkey Change State
  const [isChangingPasskey, setIsChangingPasskey] = useState(false);
  const [currentPasskeyInput, setCurrentPasskeyInput] = useState('');
  const [newPasskey, setNewPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [isSubmittingPasskeyChange, setIsSubmittingPasskeyChange] = useState(false);

  // First-time owner setup state
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');
  const [setupError, setSetupError] = useState('');
  const [isSubmittingSetup, setIsSubmittingSetup] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // New Category Input
  const [newCategoryInput, setNewCategoryInput] = useState('');

  // Confirmation dialogs
  const [confirmDeleteId, setConfirmDeleteId] = useState<{ type: string; id: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Mode filter
      if (filterMode === 'adult' && q.forKids) return false;
      if (filterMode === 'kids' && !q.forKids) return false;

      // Category filter
      if (filterCategory !== 'all' && q.category !== filterCategory) return false;

      // Status filter
      if (filterStatus === 'active' && q.isActive === false) return false;
      if (filterStatus === 'inactive' && q.isActive !== false) return false;

      // Search filter
      if (questionSearch.trim()) {
        const query = questionSearch.toLowerCase().trim();
        const matchesUrdu = q.questionUrdu.toLowerCase().includes(query);
        const matchesEn = q.questionEn.toLowerCase().includes(query);
        const matchesCat = q.category.toLowerCase().includes(query);
        return matchesUrdu || matchesEn || matchesCat;
      }

      return true;
    });
  }, [questions, filterMode, filterCategory, filterStatus, questionSearch]);

  // Statistics calculation
  const totalQCount = questions.length;
  const activeQCount = questions.filter(q => q.isActive !== false).length;
  const kidsQCount = questions.filter(q => q.forKids).length;
  const adultQCount = questions.filter(q => !q.forKids).length;

  const totalAttempts = quizAttempts.length;
  const avgAccuracy = totalAttempts > 0
    ? Math.round(quizAttempts.reduce((acc, a) => acc + (a.accuracy || 0), 0) / totalAttempts)
    : 85;

  // Handle Setup Submit (First-time initialization by authorized owner)
  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError('');
    if (!setupPassword || setupPassword.length < 8) {
      setSetupError('Master password must be at least 8 characters.');
      return;
    }
    if (setupPassword !== setupConfirmPassword) {
      setSetupError('Passwords do not match.');
      return;
    }
    setIsSubmittingSetup(true);
    try {
      const res = await setupAdminMasterPassword(setupPassword, emailInput.trim());
      if (res.success) {
        setSetupPassword('');
        setSetupConfirmPassword('');
      } else {
        setSetupError(res.error || 'Failed to initialize owner master password.');
      }
    } finally {
      setIsSubmittingSetup(false);
    }
  };

  // Handle Login Submit (Firebase Authentication)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!passkeyInput.trim()) {
      setLoginError('Please enter admin password.');
      return;
    }
    setIsLoggingIn(true);
    try {
      const res = await verifyAdminPasskey(passkeyInput.trim(), emailInput.trim());
      if (!res.success) {
        setLoginError(res.error || 'Invalid credentials. Access denied.');
      } else {
        setPasskeyInput('');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Open Question Modal (Create or Edit)
  const handleOpenAddQuestion = () => {
    setEditingQuestionId(null);
    setQuestionFormData({
      forKids: filterMode === 'kids',
      difficulty: 'beginner',
      category: (categories[0] as QuizCategory) || 'Pillars',
      questionUrdu: '',
      questionEn: '',
      optionsUrdu: ['', '', '', ''],
      optionsEn: ['', '', '', ''],
      correctIndex: 0,
      explanationUrdu: '',
      explanationEn: '',
      kidsHintUrdu: '',
      kidsHintEn: '',
      isActive: true
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: QuizQuestion) => {
    setEditingQuestionId(q.id);
    setQuestionFormData({
      forKids: q.forKids,
      difficulty: q.difficulty,
      category: q.category,
      questionUrdu: q.questionUrdu,
      questionEn: q.questionEn,
      optionsUrdu: [...q.optionsUrdu] as [string, string, string, string],
      optionsEn: [...q.optionsEn] as [string, string, string, string],
      correctIndex: q.correctIndex,
      explanationUrdu: q.explanationUrdu,
      explanationEn: q.explanationEn,
      kidsHintUrdu: q.kidsHintUrdu || '',
      kidsHintEn: q.kidsHintEn || '',
      isActive: q.isActive !== false
    });
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionFormData.questionUrdu.trim() && !questionFormData.questionEn.trim()) {
      showToast('Please provide question text.');
      return;
    }

    if (editingQuestionId) {
      updateQuestion(editingQuestionId, questionFormData);
    } else {
      addQuestion(questionFormData);
    }
    setIsQuestionModalOpen(false);
  };

  // Content Add/Edit Handlers
  const handleOpenAddContent = (type: 'quran' | 'hadith' | 'dua' | 'reminder') => {
    setEditingContentId(null);
    setContentModalType(type);
    if (type === 'quran') {
      setVerseForm({
        surahNameArabic: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        surahNumber: 2,
        ayahNumber: 286,
        arabic: '',
        translationUrdu: '',
        translationEn: '',
        theme: 'Mercy & Ease'
      });
    } else if (type === 'hadith') {
      setHadithForm({
        narrator: 'Abu Hurairah (R.A)',
        arabic: '',
        textUrdu: '',
        textEn: '',
        source: 'Sahih al-Bukhari',
        hadithNumber: '1',
        grade: 'Sahih',
        lessonUrdu: 'اخلاق کی اہمیت',
        lessonEn: 'Importance of good character'
      });
    } else if (type === 'dua') {
      setDuaForm({
        titleUrdu: '',
        titleEn: '',
        arabic: '',
        transliteration: '',
        translationUrdu: '',
        translationEn: '',
        occasionUrdu: 'صبح اور شام',
        occasionEn: 'Morning & Evening',
        reference: 'Sunan Abu Dawud'
      });
    } else if (type === 'reminder') {
      setReminderForm({
        titleUrdu: '',
        titleEn: '',
        bodyUrdu: '',
        bodyEn: '',
        category: 'Akhlaq',
        practicalTipUrdu: 'مسکراہٹ بھی صدقہ ہے',
        practicalTipEn: 'Smiling is charity'
      });
    }
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentModalType) return;

    if (contentModalType === 'quran') {
      if (editingContentId) {
        updateQuranVerse(editingContentId, verseForm);
      } else {
        addQuranVerse(verseForm);
      }
    } else if (contentModalType === 'hadith') {
      if (editingContentId) {
        updateHadith(editingContentId, hadithForm);
      } else {
        addHadith(hadithForm);
      }
    } else if (contentModalType === 'dua') {
      if (editingContentId) {
        updateDua(editingContentId, duaForm);
      } else {
        addDua(duaForm);
      }
    } else if (contentModalType === 'reminder') {
      if (editingContentId) {
        updateReminder(editingContentId, reminderForm);
      } else {
        addReminder(reminderForm);
      }
    }

    setContentModalType(null);
    setEditingContentId(null);
  };

  // Change passkey (Requires current master password verification)
  const handleChangePasskeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPasskeyInput) {
      showToast('Please enter your current master password.');
      return;
    }
    if (!newPasskey || newPasskey.length < 8) {
      showToast('New password must be at least 8 characters.');
      return;
    }
    if (newPasskey !== confirmPasskey) {
      showToast('Passwords do not match!');
      return;
    }
    setIsSubmittingPasskeyChange(true);
    try {
      const res = await updateAdminPasskey(currentPasskeyInput, newPasskey);
      if (res.success) {
        setIsChangingPasskey(false);
        setCurrentPasskeyInput('');
        setNewPasskey('');
        setConfirmPasskey('');
      }
    } finally {
      setIsSubmittingPasskeyChange(false);
    }
  };

  // Add Category
  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryInput.trim()) return;
    addCategory(newCategoryInput.trim());
    setNewCategoryInput('');
  };

  /* -------------------------------------------------------------------------- */
  /* SCREEN 1: SECURE FIRST-TIME OWNER SETUP (IF NOT INITIALIZED YET)           */
  /* -------------------------------------------------------------------------- */
  if (!isAdminAuthenticated && !isAdminSetupComplete) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 border border-slate-200 animate-scaleUp">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-3xl mx-auto flex items-center justify-center mb-3 shadow-inner">
              <Key className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Admin Portal Setup
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Initialize your private Owner Master Password. No default or public passwords exist. Only you, the application owner, can establish access.
            </p>
          </div>

          <form onSubmit={handleSetupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Create Owner Master Password (کم از کم 8 حروف)
              </label>
              <input
                type="password"
                value={setupPassword}
                onChange={(e) => setSetupPassword(e.target.value)}
                placeholder="Choose a strong master password (min 8 chars)..."
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 focus:bg-white"
                autoFocus
                required
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirm Master Password
              </label>
              <input
                type="password"
                value={setupConfirmPassword}
                onChange={(e) => setSetupConfirmPassword(e.target.value)}
                placeholder="Re-enter your master password..."
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-600 focus:bg-white"
                required
                minLength={8}
              />
            </div>

            {setupError && (
              <p className="text-rose-600 text-xs font-semibold mt-1.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{setupError}</span>
              </p>
            )}

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Backend Salted PBKDF2 Hashing</span>
              </div>
              <p className="text-emerald-700">Your password is encrypted and verified only by the server. It is never exposed in client JavaScript, page source, or public logs.</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all"
              >
                Cancel & Return
              </button>
              <button
                type="submit"
                disabled={isSubmittingSetup}
                className="w-1/2 py-3 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmittingSetup ? 'Securing...' : 'Set & Authorize'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* SCREEN 1B: SECURE LOGIN SCREEN IF NOT AUTHENTICATED                         */
  /* -------------------------------------------------------------------------- */
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 border border-slate-200 animate-scaleUp">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-3xl mx-auto flex items-center justify-center mb-3 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              IslamIQ Admin Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              محفوظ ایڈمن پینل • Secure access to manage questions, verified Islamic database, and system configurations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Authorized Admin Email (ای میل)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="admin@learnislamiq.com"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Password (پاس ورڈ)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPasskeyText ? 'text' : 'password'}
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasskeyText(!showPasskeyText)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPasskeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginError && (
                <p className="text-rose-600 text-xs font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Secured by Firebase Authentication & zero-trust Firestore Security Rules for authorized Admin UID.</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all"
              >
                Cancel & Return
              </button>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-1/2 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoggingIn ? 'Verifying...' : 'Authorize & Enter'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* SCREEN 2: AUTHENTICATED FULL ADMIN DASHBOARD                               */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm overflow-y-auto flex flex-col justify-start p-2 sm:p-5">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl shadow-2xl max-w-5xl w-full mx-auto my-auto overflow-hidden flex flex-col min-h-[85vh] max-h-[94vh]">
        
        {/* Top Navbar */}
        <div className="bg-white border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              title="Return to App"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-base font-black text-slate-900 tracking-tight">
                  IslamIQ Admin Console
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Verified Control
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Manage questions, Kids & Adult modes, categories, daily Islamic feeds, and user analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Authenticated Admin Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-800" title={`Authorized UID: ${adminUid || 'Verified'}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold">{adminEmail}</span>
              {adminUid && <span className="text-[9px] bg-emerald-200/70 px-1.5 py-0.2 rounded-md font-mono text-emerald-900">{adminUid.slice(0, 6)}...</span>}
            </div>

            {/* Cloud Firestore Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700">
              <Cloud className={`w-3.5 h-3.5 ${isCloudSyncing ? 'text-amber-500 animate-pulse' : 'text-emerald-600'}`} />
              <span>{isCloudSyncing ? 'Syncing...' : 'Firestore Connected'}</span>
            </div>

            <button
              onClick={() => setIsChangingPasskey(true)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Passkey</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Logout from admin mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="bg-slate-100/70 border-b border-slate-200/80 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs shrink-0">
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Questions</span>
              <div className="text-base font-black text-slate-900">{totalQCount} <span className="text-[11px] font-normal text-emerald-600">({activeQCount} active)</span></div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">Q</div>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Kids / Adult</span>
              <div className="text-base font-black text-slate-900">{kidsQCount} <span className="text-slate-400 font-normal">/</span> {adultQCount}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">🎈</div>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Daily Feeds</span>
              <div className="text-base font-black text-slate-900">{quranVerses.length + hadiths.length + duas.length + reminders.length} items</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">📖</div>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium">Quiz Attempts</span>
              <div className="text-base font-black text-slate-900">{totalAttempts} <span className="text-[11px] font-normal text-amber-600">({avgAccuracy}% avg)</span></div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">📊</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-slate-200 px-5 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveAdminTab('questions')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeAdminTab === 'questions'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Quiz Questions ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('daily')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeAdminTab === 'daily'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Daily Content (Quran/Hadith/Dua)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('categories')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeAdminTab === 'categories'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories & Security</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeAdminTab === 'analytics'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Quiz Attempts & Stats</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('monetization')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeAdminTab === 'monetization'
                ? 'border-amber-600 text-amber-800 font-black'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>Google Ads & Earning 💰</span>
          </button>
        </div>

        {/* TAB CONTENTS (Scrollable area) */}
        <div className="flex-1 overflow-y-auto p-5">

          {/* ================================================================ */}
          {/* TAB 1: QUIZ QUESTIONS MANAGEMENT                                */}
          {/* ================================================================ */}
          {activeAdminTab === 'questions' && (
            <div className="space-y-4">
              
              {/* Controls & Filters Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                
                <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                  {/* Search input */}
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={questionSearch}
                      onChange={(e) => setQuestionSearch(e.target.value)}
                      placeholder="Search questions by text or topic..."
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                    />
                  </div>

                  {/* Filter: Mode */}
                  <select
                    value={filterMode}
                    onChange={(e) => setFilterMode(e.target.value as any)}
                    className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  >
                    <option value="all">All Audiences</option>
                    <option value="adult">Adult Mode Only</option>
                    <option value="kids">Kids Mode Only 🎈</option>
                  </select>

                  {/* Filter: Category */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>

                  {/* Filter: Status */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Deactivated Only</option>
                  </select>
                </div>

                {/* Add Question Button */}
                <button
                  onClick={handleOpenAddQuestion}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Question (نیا سوال)</span>
                </button>

              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-xs font-semibold">No questions matched the current filters.</p>
                  </div>
                ) : (
                  filteredQuestions.map((q) => {
                    const isActive = q.isActive !== false;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isActive
                            ? 'bg-white border-slate-200 shadow-2xs hover:border-emerald-300'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              q.forKids
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-teal-50 text-teal-800 border border-teal-200'
                            }`}>
                              {q.forKids ? '🎈 Kids Quiz' : '🌿 Adult Quiz'}
                            </span>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                              {q.category}
                            </span>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md uppercase">
                              {q.difficulty}
                            </span>
                            {!isActive && (
                              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                                Deactivated
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1">
                            {/* Toggle Active */}
                            <button
                              onClick={() => toggleQuestionActive(q.id)}
                              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                              title={isActive ? 'Click to Deactivate' : 'Click to Activate'}
                            >
                              <Power className="w-3.5 h-3.5" />
                              <span className="text-[11px]">{isActive ? 'Active' : 'Inactive'}</span>
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEditQuestion(q)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                              title="Edit Question"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setConfirmDeleteId({ type: 'question', id: q.id })}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all"
                              title="Delete Question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Question Titles */}
                        <div className="mb-2">
                          <p className="urdu-text text-base font-bold text-slate-900 leading-snug">
                            {q.questionUrdu}
                          </p>
                          <p className="text-xs text-slate-600 font-medium mt-0.5">
                            {q.questionEn}
                          </p>
                        </div>

                        {/* Options preview */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] mt-2 pt-2 border-t border-slate-100">
                          {q.optionsUrdu.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-1.5 rounded-lg border ${
                                oIdx === q.correctIndex
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              <span className="font-mono text-[9px] mr-1">{oIdx + 1}.</span>
                              <span className="urdu-text">{opt}</span>
                              {oIdx === q.correctIndex && ' ✓'}
                            </div>
                          ))}
                        </div>

                        {/* Explanation preview */}
                        {q.explanationUrdu && (
                          <p className="text-[11px] text-slate-500 mt-2 italic urdu-text line-clamp-1">
                            تفصیل: {q.explanationUrdu}
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: DAILY ISLAMIC CONTENT                                    */}
          {/* ================================================================ */}
          {activeAdminTab === 'daily' && (
            <div className="space-y-4">
              
              {/* Daily Sub-tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDailySubTab('quran')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dailySubTab === 'quran'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Quran Verses ({quranVerses.length})
                  </button>
                  <button
                    onClick={() => setDailySubTab('hadith')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dailySubTab === 'hadith'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Hadiths ({hadiths.length})
                  </button>
                  <button
                    onClick={() => setDailySubTab('dua')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dailySubTab === 'dua'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Duas ({duas.length})
                  </button>
                  <button
                    onClick={() => setDailySubTab('reminder')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      dailySubTab === 'reminder'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Reminders ({reminders.length})
                  </button>
                </div>

                <button
                  onClick={() => handleOpenAddContent(dailySubTab)}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add {dailySubTab.toUpperCase()}</span>
                </button>
              </div>

              {/* Sub-tab 1: Quran Verses */}
              {dailySubTab === 'quran' && (
                <div className="space-y-3">
                  {quranVerses.map(v => (
                    <div key={v.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          Surah {v.surahNameEn} ({v.surahNumber}:{v.ayahNumber})
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingContentId(v.id);
                              setContentModalType('quran');
                              setVerseForm({
                                surahNameArabic: v.surahNameArabic,
                                surahNameEn: v.surahNameEn,
                                surahNumber: v.surahNumber,
                                ayahNumber: v.ayahNumber,
                                arabic: v.arabic,
                                translationUrdu: v.translationUrdu,
                                translationEn: v.translationEn,
                                theme: v.theme
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId({ type: 'quran', id: v.id })}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="quran-arabic text-lg text-slate-900 leading-relaxed text-right mb-2">
                        {v.arabic}
                      </p>
                      <p className="urdu-text text-sm text-slate-800 mb-1">
                        {v.translationUrdu}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        "{v.translationEn}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-tab 2: Hadiths */}
              {dailySubTab === 'hadith' && (
                <div className="space-y-3">
                  {hadiths.map(h => (
                    <div key={h.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                          {h.source} #{h.hadithNumber} • {h.narrator}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingContentId(h.id);
                              setContentModalType('hadith');
                              setHadithForm({
                                narrator: h.narrator,
                                arabic: h.arabic,
                                textUrdu: h.textUrdu,
                                textEn: h.textEn,
                                source: h.source,
                                hadithNumber: h.hadithNumber,
                                grade: h.grade,
                                lessonUrdu: h.lessonUrdu,
                                lessonEn: h.lessonEn
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId({ type: 'hadith', id: h.id })}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="quran-arabic text-base text-slate-900 leading-relaxed text-right mb-2">
                        {h.arabic}
                      </p>
                      <p className="urdu-text text-sm text-slate-800 mb-1">
                        {h.textUrdu}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        "{h.textEn}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-tab 3: Duas */}
              {dailySubTab === 'dua' && (
                <div className="space-y-3">
                  {duas.map(d => (
                    <div key={d.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                          {d.titleUrdu} ({d.titleEn})
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingContentId(d.id);
                              setContentModalType('dua');
                              setDuaForm({
                                titleUrdu: d.titleUrdu,
                                titleEn: d.titleEn,
                                arabic: d.arabic,
                                transliteration: d.transliteration,
                                translationUrdu: d.translationUrdu,
                                translationEn: d.translationEn,
                                occasionUrdu: d.occasionUrdu,
                                occasionEn: d.occasionEn,
                                reference: d.reference
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId({ type: 'dua', id: d.id })}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="quran-arabic text-base text-slate-900 leading-relaxed text-right mb-1">
                        {d.arabic}
                      </p>
                      <p className="urdu-text text-sm text-slate-800 mb-1">
                        {d.translationUrdu}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        "{d.translationEn}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-tab 4: Reminders */}
              {dailySubTab === 'reminder' && (
                <div className="space-y-3">
                  {reminders.map(r => (
                    <div key={r.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-purple-900 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
                          {r.category} • {r.titleUrdu}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingContentId(r.id);
                              setContentModalType('reminder');
                              setReminderForm({
                                titleUrdu: r.titleUrdu,
                                titleEn: r.titleEn,
                                bodyUrdu: r.bodyUrdu,
                                bodyEn: r.bodyEn,
                                category: r.category,
                                practicalTipUrdu: r.practicalTipUrdu,
                                practicalTipEn: r.practicalTipEn
                              });
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId({ type: 'reminder', id: r.id })}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="urdu-text text-sm font-bold text-slate-900 mb-1">
                        {r.titleUrdu}
                      </p>
                      <p className="urdu-text text-xs text-slate-700 mb-1 leading-relaxed">
                        {r.bodyUrdu}
                      </p>
                      <p className="text-xs text-slate-500 italic">
                        {r.bodyEn}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: CATEGORIES & SECURITY SETTINGS                           */}
          {/* ================================================================ */}
          {activeAdminTab === 'categories' && (
            <div className="space-y-6 max-w-2xl">
              
              {/* Category Management */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Quiz Categories (موضوعات)</h3>
                    <p className="text-xs text-slate-500">Add or manage question categories available in the app</p>
                  </div>
                </div>

                <form onSubmit={handleAddCategorySubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    placeholder="New category name (e.g. Islamic History)..."
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold"
                  >
                    Add Category
                  </button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                    >
                      <span>{cat}</span>
                      <button
                        onClick={() => deleteCategory(cat)}
                        className="text-slate-400 hover:text-rose-600"
                        title="Delete category"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Passkey Management */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Admin Security & Passkey</h3>
                  <p className="text-xs text-slate-500">Update the master passkey required to access this console</p>
                </div>

                <form onSubmit={handleChangePasskeySubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        New Passkey (کم از کم 4 حروف)
                      </label>
                      <input
                        type="password"
                        value={newPasskey}
                        onChange={(e) => setNewPasskey(e.target.value)}
                        placeholder="Enter new passkey..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Confirm Passkey
                      </label>
                      <input
                        type="password"
                        value={confirmPasskey}
                        onChange={(e) => setConfirmPasskey(e.target.value)}
                        placeholder="Confirm new passkey..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Save New Passkey 🔐
                  </button>
                </form>
              </div>

              {/* Cloud Firestore Integration & Migration */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <h3 className="text-sm font-bold">Cloud Firestore Central Database</h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Project: islamiq-35329
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Questions and Islamic content are automatically synchronized with Firebase Cloud Firestore in real-time. Any questions added, edited, or removed here are instantly visible to all users on <span className="font-semibold text-emerald-900">https://learnislamiq.com</span>.
                </p>

                {cloudSyncError && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{cloudSyncError}</span>
                  </div>
                )}

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    onClick={async () => {
                      setIsMigrating(true);
                      try {
                        const res = await migrateLocalToFirestore();
                        if (res.success) {
                          showToast(`Successfully migrated ${res.migratedCount} items to Firestore! ☁️`);
                        }
                      } finally {
                        setIsMigrating(false);
                      }
                    }}
                    disabled={isMigrating || isCloudSyncing}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <Cloud className={`w-3.5 h-3.5 ${isMigrating ? 'animate-spin' : ''}`} />
                    <span>{isMigrating ? 'Migrating to Cloud...' : 'Sync Local Content to Firestore ☁️'}</span>
                  </button>

                  <span className="text-[11px] text-slate-500">
                    Safely copies questions, verses, hadiths, and duas from local cache into the Firestore database without overwriting.
                  </span>
                </div>
              </div>

              {/* Database Factory Reset */}
              <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-sm font-bold">Reset Verified Content Database</h3>
                </div>
                <p className="text-xs text-slate-600">
                  Restore all questions, verses, hadiths, and reminders back to the default verified content shipped with IslamIQ.
                </p>
                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Factory Verified Content</span>
                </button>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: QUIZ ATTEMPTS & ANALYTICS                                */}
          {/* ================================================================ */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-4">
              
              {/* Stats overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Total Attempts Logged</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{totalAttempts}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Recorded across all modes</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Average Quiz Accuracy</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">{avgAccuracy}%</div>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">High comprehension rate</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Adult vs Kids Quizzes</span>
                  <div className="text-2xl font-black text-teal-800 mt-1">
                    {adultProgress.quizzesCompleted} / {kidsProgress.quizzesCompleted}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Active session balance</p>
                </div>
              </div>

              {/* Quiz Attempts History Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800">Recent Quiz Sessions Log</h3>
                  <span className="text-[11px] text-slate-400">Latest {quizAttempts.length} attempts</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2.5">Date</th>
                        <th className="px-4 py-2.5">User</th>
                        <th className="px-4 py-2.5">Mode</th>
                        <th className="px-4 py-2.5">Category</th>
                        <th className="px-4 py-2.5">Level</th>
                        <th className="px-4 py-2.5">Score</th>
                        <th className="px-4 py-2.5">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {quizAttempts.map((att) => (
                        <tr key={att.id} className="hover:bg-slate-50/70 transition-all">
                          <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500">{att.date}</td>
                          <td className="px-4 py-2.5 font-medium text-slate-900">{att.userName || 'Seeker'}</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              att.mode === 'kids' ? 'bg-amber-100 text-amber-900' : 'bg-teal-50 text-teal-800'
                            }`}>
                              {att.mode === 'kids' ? 'Kids' : 'Adult'}
                            </span>
                          </td>
                          <td className="px-4 py-2.5">{att.category}</td>
                          <td className="px-4 py-2.5 uppercase text-[10px] font-semibold text-slate-500">{att.difficulty}</td>
                          <td className="px-4 py-2.5 font-bold text-slate-900">{att.score} / {att.totalQuestions}</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              att.accuracy >= 80
                                ? 'bg-emerald-100 text-emerald-800'
                                : att.accuracy >= 50
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {att.accuracy}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: GOOGLE ADSENSE & ADMOB EARNING MANAGEMENT                 */}
          {/* ================================================================ */}
          {activeAdminTab === 'monetization' && (
            <div className="space-y-5">
              
              {/* Header Info Card */}
              <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      Earning Setup • گوگل ایڈز سیٹ اپ
                    </span>
                    <span className="text-xs text-amber-100 font-bold">100% Ready</span>
                  </div>
                  <h2 className="text-xl font-black">Google AdSense & AdMob Monetization Center</h2>
                  <p className="text-xs text-amber-100 mt-1 max-w-xl leading-relaxed">
                    آپ کی ایپ میں تمام ایڈ سلاٹس (Ad Slots) کوڈ کر دیے گئے ہیں۔ آپ یہاں سے اپنی گوگل پبلشر آئی ڈی چیک کر سکتے ہیں اور براہِ راست ایڈسینس یا ایڈموب اکاؤنٹ کھول سکتے ہیں۔
                  </p>
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Ad Engine Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-base font-black text-emerald-700">Active (Test Mode Ready)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Safe preview mode enabled</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Integrated Ad Placements</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">4 High-CTR Units</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Home, Quiz End, Tasbih, Qibla</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Halal / Kids Protection</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 mt-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Kids Mode Ad-Free (100% Safe)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Children mode is strictly protected</p>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>ارننگ شروع کرنے کے 3 آسان ترین مراحل (Quick Monetization Steps)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Web AdSense Path */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-black text-slate-800">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span>طریقہ نمبر 1: ویب سائٹ (Google AdSense)</span>
                      </div>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">سستا ترین</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                      <li>اپنا فری گوگل ایڈسینس اکاؤنٹ بنائیں (adsense.google.com)۔</li>
                      <li>اپنی ویب سائٹ کا لنک ایڈ کریں (پریویو لنک یا کسٹم ڈومین)۔</li>
                      <li>ایڈسینس سے اپنی <strong>Publisher ID</strong> (مثلاً: <code>ca-pub-123456789...</code>) کاپی کریں۔</li>
                      <li>فائل <code>src/config/adConfig.ts</code> میں اپنی پبلشر آئی ڈی پیسٹ کر دیں۔ اشتہارات فوری لائیو ہو جائیں گے!</li>
                    </ol>
                    <a
                      href="https://adsense.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[11px] transition-all"
                    >
                      <span>Google AdSense لاگ ان کریں</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Android AdMob Path */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-black text-slate-800">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>طریقہ نمبر 2: موبائل ایپ (Google AdMob)</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">زیادہ آمدنی</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                      <li>فری گوگل ایڈموب اکاؤنٹ بنائیں (admob.google.com)۔</li>
                      <li>نیا اینڈرائیڈ ایپ شامل کریں اور <strong>Banner</strong> اور <strong>Interstitial</strong> یونٹس بنائیں۔</li>
                      <li>جب آپ ایپ کو Capacitor کے ذریعے Android Studio میں بلڈ کریں گے تو یہ ایڈ یونٹس ایڈ کر دیں۔</li>
                      <li>پلے اسٹور کے صارفین سے براہِ راست ایڈموب کی ڈالرز میں آمدنی ہوگی۔</li>
                    </ol>
                    <a
                      href="https://admob.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-[11px] transition-all"
                    >
                      <span>Google AdMob لاگ ان کریں</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Islamic Ad Filtering Tip */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>ضروری شرعی احتیاط (حلال ایڈز فلٹر):</span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    گوگل ایڈسینس یا ایڈموب کے کنٹرول پینل میں جا کر <strong>Blocking Controls ➔ Sensitive Categories</strong> میں جوئے (Gambling)، ڈیٹنگ، اور موسیقی والے اشتہارات کو بلاک کر دیں تاکہ آپ کی آمدنی 100% حلال اور باوقار رہے۔
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* ================================================================ */}
      {/* MODAL: ADD / EDIT QUESTION                                       */}
      {/* ================================================================ */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {editingQuestionId ? 'Edit Quiz Question (سوال ترمیم کریں)' : 'Add New Quiz Question (نیا سوال شامل کریں)'}
                </h2>
                <p className="text-xs text-slate-500">Configure question, options, answer key, and mode</p>
              </div>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              
              {/* Row 1: Mode & Level & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Mode</label>
                  <select
                    value={questionFormData.forKids ? 'kids' : 'adult'}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, forKids: e.target.value === 'kids' })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="adult">🌿 Adult Quiz</option>
                    <option value="kids">🎈 Kids Quiz (with audio hint)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Difficulty Level</label>
                  <select
                    value={questionFormData.difficulty}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, difficulty: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="beginner">Beginner (آسان)</option>
                    <option value="intermediate">Intermediate (درمیانہ)</option>
                    <option value="advanced">Advanced (اعلیٰ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={questionFormData.category}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, category: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question text in Urdu & English */}
              <div className="space-y-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Question in Urdu (اردو میں سوال) *
                  </label>
                  <input
                    type="text"
                    value={questionFormData.questionUrdu}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, questionUrdu: e.target.value })}
                    placeholder="مثلاً: ارکانِ اسلام کتنے ہیں؟"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl urdu-text text-sm font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Question in English (انگریزی میں سوال) *
                  </label>
                  <input
                    type="text"
                    value={questionFormData.questionEn}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, questionEn: e.target.value })}
                    placeholder="e.g. How many pillars of Islam are there?"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    required
                  />
                </div>
              </div>

              {/* 4 Options */}
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">4 Quiz Options & Correct Answer</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Select the green radio for the correct answer</span>
                </div>

                {[0, 1, 2, 3].map((optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={questionFormData.correctIndex === optIdx}
                      onChange={() => setQuestionFormData({ ...questionFormData, correctIndex: optIdx })}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 shrink-0"
                    />
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <input
                        type="text"
                        value={questionFormData.optionsUrdu[optIdx]}
                        onChange={(e) => {
                          const newOpts = [...questionFormData.optionsUrdu] as [string, string, string, string];
                          newOpts[optIdx] = e.target.value;
                          setQuestionFormData({ ...questionFormData, optionsUrdu: newOpts });
                        }}
                        placeholder={`Option ${optIdx + 1} Urdu`}
                        className="p-2 bg-white border border-slate-200 rounded-xl urdu-text text-xs"
                        required
                      />
                      <input
                        type="text"
                        value={questionFormData.optionsEn[optIdx]}
                        onChange={(e) => {
                          const newOpts = [...questionFormData.optionsEn] as [string, string, string, string];
                          newOpts[optIdx] = e.target.value;
                          setQuestionFormData({ ...questionFormData, optionsEn: newOpts });
                        }}
                        placeholder={`Option ${optIdx + 1} English`}
                        className="p-2 bg-white border border-slate-200 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanation in Urdu & English */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Explanation (Urdu)</label>
                  <textarea
                    rows={2}
                    value={questionFormData.explanationUrdu}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, explanationUrdu: e.target.value })}
                    placeholder="تفصیل یا حدیث کا حوالہ..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl urdu-text text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Explanation (English)</label>
                  <textarea
                    rows={2}
                    value={questionFormData.explanationEn}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, explanationEn: e.target.value })}
                    placeholder="Authentic explanation or reference..."
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Kids Hint (Optional) */}
              {questionFormData.forKids && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-2xl border border-amber-200">
                  <div>
                    <label className="block font-bold text-amber-900 mb-1">Kids Hint (Urdu)</label>
                    <input
                      type="text"
                      value={questionFormData.kidsHintUrdu}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, kidsHintUrdu: e.target.value })}
                      placeholder="اشارہ بچوں کے لیے..."
                      className="w-full p-2 bg-white border border-amber-200 rounded-xl urdu-text text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-amber-900 mb-1">Kids Hint (English)</label>
                    <input
                      type="text"
                      value={questionFormData.kidsHintEn}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, kidsHintEn: e.target.value })}
                      placeholder="Helpful hint for young seekers..."
                      className="w-full p-2 bg-white border border-amber-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Status active toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={questionFormData.isActive}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, isActive: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <label htmlFor="isActiveToggle" className="font-bold text-slate-700 cursor-pointer">
                  Activate question immediately in quiz rotation
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md"
                >
                  Save Question
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD / EDIT DAILY CONTENT (QURAN / HADITH / DUA / REMINDER)*/}
      {/* ================================================================ */}
      {contentModalType && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingContentId ? 'Edit Content' : 'Add Content'} ({contentModalType.toUpperCase()})
              </h2>
              <button
                onClick={() => setContentModalType(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveContent} className="space-y-3 text-xs">
              {contentModalType === 'quran' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Surah Name (English)</label>
                      <input
                        type="text"
                        value={verseForm.surahNameEn}
                        onChange={(e) => setVerseForm({ ...verseForm, surahNameEn: e.target.value })}
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Surah Name (Arabic)</label>
                      <input
                        type="text"
                        value={verseForm.surahNameArabic}
                        onChange={(e) => setVerseForm({ ...verseForm, surahNameArabic: e.target.value })}
                        className="w-full p-2 bg-slate-50 border rounded-xl text-right quran-arabic"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Surah Number</label>
                      <input
                        type="number"
                        value={verseForm.surahNumber}
                        onChange={(e) => setVerseForm({ ...verseForm, surahNumber: parseInt(e.target.value) || 1 })}
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ayah Number</label>
                      <input
                        type="number"
                        value={verseForm.ayahNumber}
                        onChange={(e) => setVerseForm({ ...verseForm, ayahNumber: parseInt(e.target.value) || 1 })}
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Arabic Text</label>
                    <textarea
                      rows={2}
                      value={verseForm.arabic}
                      onChange={(e) => setVerseForm({ ...verseForm, arabic: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl quran-arabic text-base text-right"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Urdu Translation</label>
                    <textarea
                      rows={2}
                      value={verseForm.translationUrdu}
                      onChange={(e) => setVerseForm({ ...verseForm, translationUrdu: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl urdu-text text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">English Translation</label>
                    <textarea
                      rows={2}
                      value={verseForm.translationEn}
                      onChange={(e) => setVerseForm({ ...verseForm, translationEn: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </>
              )}

              {contentModalType === 'hadith' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Source Book</label>
                      <input
                        type="text"
                        value={hadithForm.source}
                        onChange={(e) => setHadithForm({ ...hadithForm, source: e.target.value })}
                        placeholder="Sahih al-Bukhari"
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Hadith Number</label>
                      <input
                        type="text"
                        value={hadithForm.hadithNumber}
                        onChange={(e) => setHadithForm({ ...hadithForm, hadithNumber: e.target.value })}
                        placeholder="1"
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Narrator</label>
                    <input
                      type="text"
                      value={hadithForm.narrator}
                      onChange={(e) => setHadithForm({ ...hadithForm, narrator: e.target.value })}
                      placeholder="Abu Hurairah (R.A)"
                      className="w-full p-2 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Arabic Text</label>
                    <textarea
                      rows={2}
                      value={hadithForm.arabic}
                      onChange={(e) => setHadithForm({ ...hadithForm, arabic: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl quran-arabic text-base text-right"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Urdu Translation</label>
                    <textarea
                      rows={2}
                      value={hadithForm.textUrdu}
                      onChange={(e) => setHadithForm({ ...hadithForm, textUrdu: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl urdu-text text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">English Translation</label>
                    <textarea
                      rows={2}
                      value={hadithForm.textEn}
                      onChange={(e) => setHadithForm({ ...hadithForm, textEn: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </>
              )}

              {contentModalType === 'dua' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title (Urdu)</label>
                      <input
                        type="text"
                        value={duaForm.titleUrdu}
                        onChange={(e) => setDuaForm({ ...duaForm, titleUrdu: e.target.value })}
                        placeholder="صبح کی دعا"
                        className="w-full p-2 bg-slate-50 border rounded-xl urdu-text"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={duaForm.titleEn}
                        onChange={(e) => setDuaForm({ ...duaForm, titleEn: e.target.value })}
                        placeholder="Morning Dua"
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Arabic Dua</label>
                    <textarea
                      rows={2}
                      value={duaForm.arabic}
                      onChange={(e) => setDuaForm({ ...duaForm, arabic: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl quran-arabic text-base text-right"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Urdu Translation</label>
                    <textarea
                      rows={2}
                      value={duaForm.translationUrdu}
                      onChange={(e) => setDuaForm({ ...duaForm, translationUrdu: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl urdu-text text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">English Translation</label>
                    <textarea
                      rows={2}
                      value={duaForm.translationEn}
                      onChange={(e) => setDuaForm({ ...duaForm, translationEn: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </>
              )}

              {contentModalType === 'reminder' && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title (Urdu)</label>
                      <input
                        type="text"
                        value={reminderForm.titleUrdu}
                        onChange={(e) => setReminderForm({ ...reminderForm, titleUrdu: e.target.value })}
                        placeholder="نرم کلامی"
                        className="w-full p-2 bg-slate-50 border rounded-xl urdu-text"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={reminderForm.titleEn}
                        onChange={(e) => setReminderForm({ ...reminderForm, titleEn: e.target.value })}
                        placeholder="Gentle Speech"
                        className="w-full p-2 bg-slate-50 border rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reminder Text (Urdu)</label>
                    <textarea
                      rows={2}
                      value={reminderForm.bodyUrdu}
                      onChange={(e) => setReminderForm({ ...reminderForm, bodyUrdu: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl urdu-text text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reminder Text (English)</label>
                    <textarea
                      rows={2}
                      value={reminderForm.bodyEn}
                      onChange={(e) => setReminderForm({ ...reminderForm, bodyEn: e.target.value })}
                      className="w-full p-2 bg-slate-50 border rounded-xl text-xs"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setContentModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE DIALOG */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-70 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full text-center space-y-3 border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Confirm Deletion</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently remove this {confirmDeleteId.type}?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmDeleteId.type === 'question') {
                    deleteQuestion(confirmDeleteId.id);
                  } else if (confirmDeleteId.type === 'quran') {
                    deleteQuranVerse(confirmDeleteId.id);
                  } else if (confirmDeleteId.type === 'hadith') {
                    deleteHadith(confirmDeleteId.id);
                  } else if (confirmDeleteId.type === 'dua') {
                    deleteDua(confirmDeleteId.id);
                  } else if (confirmDeleteId.type === 'reminder') {
                    deleteReminder(confirmDeleteId.id);
                  }
                  setConfirmDeleteId(null);
                }}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM RESET FACTORY DIALOG */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-70 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-3 border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Reset Content Database?</h3>
            <p className="text-xs text-slate-500">
              This will restore all questions, verses, hadiths, and categories back to original defaults. User streaks and scores will remain intact.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllContentToDefaults();
                  setIsResetConfirmOpen(false);
                }}
                className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PASSKEY */}
      {isChangingPasskey && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-emerald-700" />
                <span>Update Master Password</span>
              </h3>
              <button onClick={() => { setIsChangingPasskey(false); setCurrentPasskeyInput(''); setNewPasskey(''); setConfirmPasskey(''); }} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleChangePasskeySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Master Password</label>
                <input
                  type="password"
                  value={currentPasskeyInput}
                  onChange={(e) => setCurrentPasskeyInput(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Master Password (min 8 chars)</label>
                <input
                  type="password"
                  value={newPasskey}
                  onChange={(e) => setNewPasskey(e.target.value)}
                  placeholder="Enter new strong password..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPasskey}
                  onChange={(e) => setConfirmPasskey(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl"
                  required
                  minLength={8}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsChangingPasskey(false); setCurrentPasskeyInput(''); setNewPasskey(''); setConfirmPasskey(''); }}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPasskeyChange}
                  className="w-1/2 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-md"
                >
                  {isSubmittingPasskeyChange ? 'Saving...' : 'Save Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

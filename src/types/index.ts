export type UserMode = 'adult' | 'kids';
export type ContentLanguage = 'urdu' | 'english';
export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuizCategory = 'Pillars' | 'Quran' | 'Prophets' | 'Manners' | 'Seerah' | 'Duas' | 'Salah' | 'Aqeedah' | string;
export type AppTab = 
  | 'home' 
  | 'quiz' 
  | 'salah' 
  | 'tasbih' 
  | 'kids-namaz'
  | 'kids-tasbih'
  | 'search' 
  | 'status' 
  | 'qibla' 
  | 'share' 
  | 'about' 
  | 'contact' 
  | 'privacy-policy' 
  | 'terms' 
  | 'disclaimer'
  | 'islamic-quiz'
  | 'kids-islamic-quiz'
  | 'islamic-questions-answers'
  | 'daily-quran-verse'
  | 'daily-hadith'
  | 'daily-dua'
  | 'salah-learning'
  | 'islamic-general-knowledge'
  | 'how-to-perform-salah'
  | 'how-to-perform-wudu'
  | '5-pillars-of-islam'
  | 'six-articles-of-faith'
  | 'salah-for-beginners'
  | 'islamic-manners-for-kids'
  | 'quran-learning-guide'
  | 'hadith-learning-guide'
  | 'ramadan-guide'
  | 'zakat-basics'
  | 'zakat-calculator'
  | 'islamic-calendar'
  | 'seerah-of-prophet-muhammad'
  | 'ghusl-taharah-guide'
  | 'tayammum-guide'
  | 'hajj-umrah-guide'
  | 'stories-of-the-prophets'
  | 'rights-in-islam'
  | 'ask-a-scholar';

export interface QuizQuestion {
  id: string;
  questionUrdu: string;
  questionEn: string;
  optionsUrdu: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationUrdu: string;
  explanationEn: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  forKids: boolean;
  kidsHintUrdu?: string;
  kidsHintEn?: string;
  isActive?: boolean;
}

export interface QuranVerse {
  id: string;
  arabic: string;
  translationUrdu: string;
  translationEn: string;
  surahNameArabic: string;
  surahNameEn: string;
  surahNumber: number;
  ayahNumber: number;
  theme: string;
  explanationUrdu?: string;
  explanationEn?: string;
  lessonUrdu?: string;
  lessonEn?: string;
  reference?: string;
}

export interface HadithItem {
  id: string;
  arabic: string;
  textUrdu: string;
  textEn: string;
  narrator: string;
  source: string;
  hadithNumber: string;
  grade: 'Sahih' | 'Hasan';
  lessonUrdu: string;
  lessonEn: string;
}

export interface DuaItem {
  id: string;
  titleEn: string;
  titleUrdu: string;
  arabic: string;
  transliteration: string;
  translationUrdu: string;
  translationEn: string;
  reference: string;
  occasionUrdu: string;
  occasionEn: string;
}

export interface IslamicReminder {
  id: string;
  titleEn: string;
  titleUrdu: string;
  bodyEn: string;
  bodyUrdu: string;
  category: string;
  practicalTipUrdu: string;
  practicalTipEn: string;
  reference?: string;
}

export interface VerifiedQA {
  id: string;
  questionUrdu: string;
  questionEn: string;
  answerUrdu: string;
  answerEn: string;
  category: 'Aqeedah' | 'Salah' | 'Manners' | 'Quran' | 'Fasting' | 'Family' | 'Wudu' | 'Taharah' | 'Zakat' | 'Hajj' | 'Hadith' | 'Halal' | 'Kids' | string;
  reference: string;
  tags: string[];
  explanationUrdu?: string;
  explanationEn?: string;
  relatedGuidePath?: string;
  relatedGuideTitleEn?: string;
  relatedGuideTitleUrdu?: string;
}

export interface SalahDayRecord {
  date: string; // YYYY-MM-DD
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  tahajjud?: boolean;
}

export interface DhikrType {
  id: string;
  arabic: string;
  transliteration: string;
  meaningEn: string;
  meaningUrdu: string;
  recommendedCount: number;
  benefitUrdu: string;
  benefitEn: string;
  isCustom?: boolean;
}

export interface TasbihRecord {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  dhikrId: string;
  dhikrName: string;
  arabic: string;
  count: number;
  target: number;
  completed: boolean;
}

export interface ModeProgress {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  quizzesCompleted: number;
  correctAnswersCount: number;
  tasbihTotalLifetime: number;
  salahCompletedTotal: number;
  unlockedBadgeIds: string[];
  recentQuizQuestionIds: string[];
}

export interface Badge {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  icon: string;
  unlocked: boolean;
  category: 'prayer' | 'quiz' | 'tasbih' | 'streak';
}

export interface UserStats {
  isGuest: boolean;
  userName: string;
  email?: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  quizzesCompleted: number;
  correctAnswersCount: number;
  tasbihTotalLifetime: number;
  salahCompletedTotal: number;
  unlockedBadgeIds: string[];
  bookmarkedQAIds: string[];
}

export interface QuizAttemptRecord {
  id: string;
  timestamp: number;
  date: string;
  mode: UserMode;
  difficulty: QuizDifficulty;
  category: string;
  score: number;
  totalQuestions: number;
  accuracy: number;
  userName: string;
}

// =============================================================================
// Ask a Scholar Types (Offline Scholar Liaison Architecture)
// =============================================================================

export type ScholarInquiryStatus =
  | 'pending_review'
  | 'sent_to_scholar'
  | 'answer_received'
  | 'answered'
  | 'rejected';

export type ScholarInquiryCategory =
  | 'General'
  | 'Pillars'
  | 'Quran'
  | 'Hadith'
  | 'Salah'
  | 'Taharah'
  | 'Sawm'
  | 'Zakat'
  | 'Hajj'
  | 'Family'
  | 'Halal'
  | 'Manners'
  | 'Aqeedah'
  | 'Masail';

export type MadhhabPreference =
  | 'General'
  | 'Hanafi'
  | 'Shafi\'i'
  | 'Maliki'
  | 'Hanbali';

export interface ScholarInquirySubmission {
  subject: string;
  questionText: string;
  category?: ScholarInquiryCategory | string;
  madhhabPreference?: MadhhabPreference | string;
  seekerName?: string;
  seekerEmail?: string;
}

export interface ScholarSubmissionResult {
  inquiryNumber: string;
  accessToken: string;
  status: ScholarInquiryStatus;
  createdAt: string;
}

/**
 * Seeker public-safe projection returned by get_scholar_inquiry RPC.
 * Critical security guarantee: adminNotes, accessTokenHash, and seekerEmail are excluded.
 */
export interface PublicScholarInquiry {
  inquiryNumber: string;
  category: ScholarInquiryCategory | string;
  madhhabPreference: MadhhabPreference | string;
  subject: string;
  questionText: string;
  status: ScholarInquiryStatus;
  scholarName?: string | null;
  scholarQualification?: string | null;
  answerText?: string | null;
  answerArabic?: string | null;
  reference?: string | null;
  references?: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  sentToScholarAt?: string | null;
  answeredAt?: string | null;
}

/**
 * Full inquiry model for authenticated Admin Console management
 */
export interface ScholarInquiry extends PublicScholarInquiry {
  id: string;
  seekerName?: string;
  seekerEmail?: string | null;
  userId?: string | null;
  adminNotes?: string | null;
  updatedAt: string;
}



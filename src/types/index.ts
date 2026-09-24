export type UserMode = 'adult' | 'kids';
export type ContentLanguage = 'urdu' | 'english';
export type QuizDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuizCategory = 'Pillars' | 'Quran' | 'Prophets' | 'Manners' | 'Seerah' | 'Duas' | 'Salah' | 'Aqeedah' | string;
export type AppTab = 
  | 'home' 
  | 'quiz' 
  | 'salah' 
  | 'tasbih' 
  | 'search' 
  | 'status' 
  | 'qibla' 
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
  | 'islamic-manners-for-kids';

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
}

export interface VerifiedQA {
  id: string;
  questionUrdu: string;
  questionEn: string;
  answerUrdu: string;
  answerEn: string;
  category: 'Aqeedah' | 'Salah' | 'Manners' | 'Quran' | 'Fasting' | 'Family';
  reference: string;
  tags: string[];
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


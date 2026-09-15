import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VERIFIED_QURAN_VERSES, VERIFIED_HADITHS, VERIFIED_DUAS, ISLAMIC_REMINDERS } from '../data/verifiedContent';
import { BookOpen, Sparkles, Share2, Copy, Check, Heart, Volume2, ShieldCheck, Flame, ChevronRight, Layers, Award, Compass } from 'lucide-react';
import { SpeechEngine } from '../utils/audio';
import { AdBanner } from './AdBanner';
import { AD_CONFIG } from '../config/adConfig';
import { ContentHubCard } from './seo/ContentHubCard';

interface DailyFeedProps {
  onNavigateToStatusWithText: (text: string, ref: string) => void;
}

export const DailyFeed: React.FC<DailyFeedProps> = ({ onNavigateToStatusWithText }) => {
  const {
    userMode,
    contentLang,
    todaySalah,
    setActiveTab,
    showToast,
    isSpeaking,
    setIsSpeaking,
    userStats,
    quranVerses,
    hadiths,
    duas,
    reminders
  } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pick deterministic daily items based on day-of-year so every day has fresh verified content
  const activeVerses = quranVerses && quranVerses.length > 0 ? quranVerses : VERIFIED_QURAN_VERSES;
  const activeHadiths = hadiths && hadiths.length > 0 ? hadiths : VERIFIED_HADITHS;
  const activeDuas = duas && duas.length > 0 ? duas : VERIFIED_DUAS;
  const activeReminders = reminders && reminders.length > 0 ? reminders : ISLAMIC_REMINDERS;

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const dailyVerse = activeVerses[dayIndex % activeVerses.length];
  const dailyHadith = activeHadiths[dayIndex % activeHadiths.length];
  const dailyDua = activeDuas[dayIndex % activeDuas.length];
  const dailyReminder = activeReminders[dayIndex % activeReminders.length];

  const isKids = userMode === 'kids';

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard! (کاپی کر لیا گیا)');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      SpeechEngine.stop();
      setIsSpeaking(false);
    } else {
      SpeechEngine.speak(
        text,
        contentLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  // Count prayed today
  const prayedCount = [
    todaySalah.fajr,
    todaySalah.dhuhr,
    todaySalah.asr,
    todaySalah.maghrib,
    todaySalah.isha
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Banner */}
      <div className={`rounded-3xl p-5 sm:p-6 transition-all relative overflow-hidden ${
        isKids
          ? 'kids-bg-pattern text-white shadow-lg border-2 border-teal-400'
          : 'islamic-bg-pattern text-white shadow-xl border border-emerald-700/60'
      }`}>
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isKids ? 'bg-amber-300 text-teal-950 font-bold' : 'bg-goldAccent/20 text-goldAccent border border-goldAccent/30'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              {isKids ? 'خوش آمدید ننھے ساتھی! 🌟 Welcome Little Believer!' : 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
            </span>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-200">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{userStats.streakDays} Days Streak</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1">
            {isKids ? 'آج کا پیارا اسلامی سبق • Today\'s Fun Lesson' : 'Daily Islamic Inspiration'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            {isKids
              ? 'ہر روز نیا اسلامی علم سیکھیں، نماز ادا کریں اور کوئز جیت کر انعامات حاصل کریں!'
              : 'Nourish your soul with verified Quranic verses, Sahih Hadith, and authentic Sunnah supplications.'}
          </p>

          {/* Quick Dashboard Action Cards */}
          <div className={`grid gap-2.5 mt-5 pt-4 border-t border-white/10 ${
            isKids ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
          }`}>
            <button
              onClick={() => setActiveTab('salah')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm rounded-2xl p-2.5 text-left border border-white/10"
            >
              <div className="text-[11px] text-emerald-200 font-medium">Daily Salah</div>
              <div className="text-base font-bold flex items-center justify-between">
                <span>{prayedCount}/5</span>
                <span className="text-[10px] bg-emerald-500/40 text-emerald-100 px-1.5 py-0.5 rounded-full">
                  {prayedCount === 5 ? 'Completed' : 'Track'}
                </span>
              </div>
            </button>

            {!isKids && (
              <button
                onClick={() => setActiveTab('qibla')}
                className="bg-gradient-to-br from-amber-500/20 to-emerald-500/20 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm rounded-2xl p-2.5 text-left border border-amber-300/30"
              >
                <div className="text-[11px] text-amber-200 font-medium">{contentLang === 'urdu' ? 'قبلہ رخ' : 'Qibla Finder'}</div>
                <div className="text-base font-bold flex items-center justify-between">
                  <span>{contentLang === 'urdu' ? 'کمپاس' : 'Compass'}</span>
                  <Compass className="w-4 h-4 text-goldAccent animate-pulse" />
                </div>
              </button>
            )}

            <button
              onClick={() => setActiveTab('quiz')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm rounded-2xl p-2.5 text-left border border-white/10"
            >
              <div className="text-[11px] text-amber-200 font-medium">{isKids ? 'Kids Quiz 🎈' : 'Daily Quiz'}</div>
              <div className="text-base font-bold flex items-center justify-between">
                <span>Play Now</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tasbih')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm rounded-2xl p-2.5 text-left border border-white/10"
            >
              <div className="text-[11px] text-emerald-200 font-medium">Digital Tasbih</div>
              <div className="text-base font-bold flex items-center justify-between">
                <span>{userStats.tasbihTotalLifetime} Dhikr</span>
                <Sparkles className="w-3.5 h-3.5 text-goldAccent" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('status')}
              className="bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm rounded-2xl p-2.5 text-left border border-white/10"
            >
              <div className="text-[11px] text-emerald-200 font-medium">Status Creator</div>
              <div className="text-base font-bold flex items-center justify-between">
                <span>Design Post</span>
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Islamic Content Hub Quick Access */}
      <ContentHubCard />

      {/* 1. DAILY QURAN VERSE */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 transition-all hover:shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Daily Quran Ayah • آیت مبارکہ
              </h2>
              <p className="text-[11px] text-slate-500">
                Surah {dailyVerse.surahNameEn} ({dailyVerse.surahNameArabic}) • {dailyVerse.surahNumber}:{dailyVerse.ayahNumber}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full">
            {dailyVerse.theme}
          </span>
        </div>

        {/* Arabic Calligraphy Text */}
        <div className="my-5 p-4 rounded-2xl bg-amber-50/50 border border-amber-100/60 text-center">
          <p className="arabic-text text-xl sm:text-2xl text-slate-900 leading-loose">
            {dailyVerse.arabic}
          </p>
        </div>

        {/* Translation with proper RTL for Urdu */}
        <div className="space-y-3">
          {contentLang === 'urdu' ? (
            <div className="urdu-text text-base sm:text-lg text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {dailyVerse.translationUrdu}
            </div>
          ) : (
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              "{dailyVerse.translationEn}"
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => handleSpeak(contentLang === 'urdu' ? dailyVerse.translationUrdu : dailyVerse.translationEn)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 px-3 py-1.5 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? 'Stop Audio' : 'Listen Translation'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy(dailyVerse.id, `${dailyVerse.arabic}\n\n${contentLang === 'urdu' ? dailyVerse.translationUrdu : dailyVerse.translationEn}\n— Surah ${dailyVerse.surahNameEn} (${dailyVerse.surahNumber}:${dailyVerse.ayahNumber})`)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
              title="Copy to clipboard"
            >
              {copiedId === dailyVerse.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onNavigateToStatusWithText(
                `${dailyVerse.arabic}\n\n${contentLang === 'urdu' ? dailyVerse.translationUrdu : dailyVerse.translationEn}`,
                `Surah ${dailyVerse.surahNameEn} (${dailyVerse.surahNumber}:${dailyVerse.ayahNumber})`
              )}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-700 text-white px-3 py-1.5 rounded-xl hover:bg-emerald-800 active:scale-95 transition-all shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Create Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. DAILY HADITH */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 transition-all hover:shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Daily Hadith • حدیث مبارکہ
              </h2>
              <p className="text-[11px] text-slate-500">
                {dailyHadith.source} #{dailyHadith.hadithNumber} • {dailyHadith.grade}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
            Narrated by {dailyHadith.narrator}
          </span>
        </div>

        {/* Arabic Hadith */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-50 text-center">
          <p className="arabic-text text-lg sm:text-xl text-slate-900 leading-relaxed">
            {dailyHadith.arabic}
          </p>
        </div>

        {/* Translation */}
        <div className="mb-4">
          {contentLang === 'urdu' ? (
            <p className="urdu-text text-base text-slate-800">
              {dailyHadith.textUrdu}
            </p>
          ) : (
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              "{dailyHadith.textEn}"
            </p>
          )}
        </div>

        {/* Practical Lesson Box */}
        <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-2xl">
          <div className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{contentLang === 'urdu' ? 'عملی سبق (Life Lesson):' : 'Key Lesson:'}</span>
          </div>
          <p className={`text-xs text-emerald-800 ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
            {contentLang === 'urdu' ? dailyHadith.lessonUrdu : dailyHadith.lessonEn}
          </p>
        </div>

        {/* Hadith Share Action */}
        <div className="flex items-center justify-end space-x-2 pt-3 mt-3 border-t border-slate-100">
          <button
            onClick={() => handleCopy(dailyHadith.id, `${dailyHadith.arabic}\n\n${contentLang === 'urdu' ? dailyHadith.textUrdu : dailyHadith.textEn}\n— ${dailyHadith.source} #${dailyHadith.hadithNumber}`)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
            title="Copy Hadith"
          >
            {copiedId === dailyHadith.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onNavigateToStatusWithText(
              `${dailyHadith.arabic}\n\n${contentLang === 'urdu' ? dailyHadith.textUrdu : dailyHadith.textEn}`,
              `${dailyHadith.source} #${dailyHadith.hadithNumber}`
            )}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-xl active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Hadith</span>
          </button>
        </div>
      </div>

      {/* 3. DAILY DUA (Hisn al-Muslim) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 transition-all hover:shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Daily Dua • مسنون دعا
              </h2>
              <p className="text-[11px] text-slate-500">
                {contentLang === 'urdu' ? dailyDua.titleUrdu : dailyDua.titleEn}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold bg-teal-100/70 text-teal-800 px-2 py-0.5 rounded-full">
            {dailyDua.reference}
          </span>
        </div>

        {/* Arabic Dua */}
        <div className="my-4 p-4 rounded-2xl bg-teal-50/40 border border-teal-100/50 text-center">
          <p className="arabic-text text-xl sm:text-2xl text-teal-950 leading-loose">
            {dailyDua.arabic}
          </p>
        </div>

        {/* Transliteration */}
        <div className="mb-3 text-xs italic text-slate-500 bg-slate-50 p-2.5 rounded-xl">
          <span className="font-semibold not-italic text-slate-700">Pronunciation: </span>
          {dailyDua.transliteration}
        </div>

        {/* Translation */}
        <div className="mb-3">
          {contentLang === 'urdu' ? (
            <p className="urdu-text text-base text-slate-800">
              {dailyDua.translationUrdu}
            </p>
          ) : (
            <p className="text-sm text-slate-700 leading-relaxed">
              "{dailyDua.translationEn}"
            </p>
          )}
        </div>

        {/* Occasion / Benefit */}
        <p className="text-xs text-slate-500 mb-2">
          <strong className="text-slate-700">When to recite: </strong>
          {contentLang === 'urdu' ? dailyDua.occasionUrdu : dailyDua.occasionEn}
        </p>

        {/* Dua Action */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => handleCopy(dailyDua.id, `${dailyDua.arabic}\n\n${dailyDua.transliteration}\n\n${contentLang === 'urdu' ? dailyDua.translationUrdu : dailyDua.translationEn}\n— ${dailyDua.reference}`)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
            title="Copy Dua"
          >
            {copiedId === dailyDua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onNavigateToStatusWithText(
              `${dailyDua.arabic}\n\n${contentLang === 'urdu' ? dailyDua.translationUrdu : dailyDua.translationEn}`,
              dailyDua.reference
            )}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-700 text-white hover:bg-teal-800 px-3 py-1.5 rounded-xl active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Dua</span>
          </button>
        </div>
      </div>

      {/* QIBLA DIRECTION BANNER CARD (ADULT / ALL MODES) */}
      {!isKids && (
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 rounded-3xl p-5 sm:p-6 text-white border-2 border-emerald-500/30 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    {contentLang === 'urdu' ? 'اسلامی ٹول' : 'Islamic Tool'}
                  </span>
                  <span className="text-xs text-goldAccent font-bold">
                    {contentLang === 'urdu' ? 'کعبۃ اللہ شریف کی سمت' : 'Direction to Kaaba'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mt-1">
                  {contentLang === 'urdu' ? 'قبلہ رخ معلوم کریں (Qibla Direction)' : 'Find Qibla Direction with Compass'}
                </h3>
                <p className="text-xs text-emerald-200/90 mt-0.5 max-w-md">
                  {contentLang === 'urdu'
                    ? 'فون کے سینسر اور جی پی ایس کی مدد سے نماز کے لیے کعبہ شریف کی بالکل درست سمت معلوم کریں۔'
                    : 'Accurately align your prayer direction with device compass sensors and live GPS.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('qibla')}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>{contentLang === 'urdu' ? 'قبلہ کمپاس کھولیں' : 'Open Qibla Compass'}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}

      {/* 4. DAILY ISLAMIC REMINDER */}
      <div className="bg-gradient-to-br from-emerald-900 to-[#064e3b] rounded-3xl p-5 sm:p-6 text-white shadow-md border border-emerald-700/50">
        <div className="flex items-center space-x-2 mb-3">
          <Award className="w-4 h-4 text-goldAccent" />
          <span className="text-xs font-bold uppercase tracking-wider text-goldAccent">
            Daily Islamic Reminder • نصیحت و بصیرت
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2">
          {contentLang === 'urdu' ? dailyReminder.titleUrdu : dailyReminder.titleEn}
        </h3>
        <p className={`text-sm text-emerald-100/90 leading-relaxed mb-4 ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
          {contentLang === 'urdu' ? dailyReminder.bodyUrdu : dailyReminder.bodyEn}
        </p>
        <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
          <div className="text-[11px] font-bold text-goldAccent mb-1">
            {contentLang === 'urdu' ? 'آج کا عملی اقدام (Action Step):' : 'Today\'s Practical Step:'}
          </div>
          <p className={`text-xs text-white ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
            {contentLang === 'urdu' ? dailyReminder.practicalTipUrdu : dailyReminder.practicalTipEn}
          </p>
        </div>
      </div>

      {/* Strategic Monitization Ad Banner */}
      {!isKids && (
        <AdBanner
          slotId={AD_CONFIG.SLOTS.HOME_BANNER}
          labelUrdu="سپانسرڈ اشتہار (Google AdSense)"
          labelEn="Sponsored Ad (Google AdSense)"
        />
      )}

    </div>
  );
};

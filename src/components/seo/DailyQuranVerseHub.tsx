import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QURAN_VERSES } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { BookOpen, Copy, Share2, Volume2, ShieldCheck, Heart, Sparkles, Filter } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyQuranVerseHub: React.FC = () => {
  const { contentLang, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  // Deterministic verse for today
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayVerse = VERIFIED_QURAN_VERSES[dayIndex % VERIFIED_QURAN_VERSES.length];

  const filteredVerses = selectedTheme === 'all'
    ? VERIFIED_QURAN_VERSES
    : VERIFIED_QURAN_VERSES.filter((v) => v.theme.toLowerCase().includes(selectedTheme.toLowerCase()));

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Ayah copied! (آیت کاپی کر لی گئی)');
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

  const seoTitle = isUrdu
    ? 'روزانہ کی قرآنی آیت بمعہ اردو ترجمہ و تفسیر • Daily Quran Verse | IslamIQ'
    : 'Daily Quran Verse with Translation and Meaning | IslamIQ';

  const seoDescription = isUrdu
    ? 'روزانہ کی خوبصورت قرآنی آیات، عربی تلاوت، آسان اردو اور انگلش ترجمہ اور سورہ کے حوالہ جات کے ساتھ مطالعہ فرمائیں۔'
    : 'Read inspiring Daily Quran Verses with Arabic text, authentic Urdu and English translations, Surah and Ayah numbers, and thematic reflections.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-quran-verse"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Quran Verse', url: '/daily-quran-verse' }
        ]}
        article={{
          headline: `Daily Quran Verse: Surah ${todayVerse.surahNameEn} (${todayVerse.surahNumber}:${todayVerse.ayahNumber})`,
          description: todayVerse.translationUrdu,
        }}
      />

      {/* Featured Today's Verse */}
      <header className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آج کی منتخب قرآنی آیت' : "Today's Featured Verse"}</span>
          </div>
          <span className="text-xs text-emerald-200/80 font-mono">
            Surah {todayVerse.surahNameEn} ({todayVerse.surahNumber}:{todayVerse.ayahNumber})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی قرآنی آیت (Daily Quran Verse)' : 'Daily Quran Verse with Authentic Meaning'}
        </h1>

        {/* Featured Ayah Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <p className="font-arabic text-xl sm:text-2xl leading-loose text-center text-amber-100 font-bold selection:bg-emerald-700">
            {todayVerse.arabic}
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4 text-center">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-medium">
              {todayVerse.translationUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayVerse.translationEn}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-emerald-300 font-semibold">
              {todayVerse.theme}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayVerse.translationUrdu : todayVerse.translationEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Audio Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayVerse.id, `${todayVerse.arabic}\n\n${todayVerse.translationUrdu}\n[سورۃ ${todayVerse.surahNameArabic} : ${todayVerse.ayahNumber}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Verse"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Archive / Curated Quranic Verses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>
              {isUrdu ? 'قرآنی آیات کا منتخب گلدستہ (Thematic Verses)' : 'Curated Quranic Verses for Reflection'}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredVerses.map((verse) => (
            <div
              key={verse.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  Surah {verse.surahNameEn} ({verse.surahNameArabic}) • {verse.surahNumber}:{verse.ayahNumber}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {verse.theme}
                </span>
              </div>

              <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-slate-900 font-semibold py-1">
                {verse.arabic}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {verse.translationUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {verse.translationEn}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'مستند قرآنی متن' : 'Authentic Quranic Text'}</span>
                </span>

                <button
                  onClick={() => handleCopy(verse.id, `${verse.arabic}\n\n${verse.translationUrdu}\n[Surah ${verse.surahNameEn} : ${verse.ayahNumber}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === verse.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-quran-verse" />
    </article>
  );
};

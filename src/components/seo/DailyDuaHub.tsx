import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_DUAS } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Sparkles, Copy, Volume2, ShieldCheck, BookOpen, Heart } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyDuaHub: React.FC = () => {
  const { contentLang, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayDua = VERIFIED_DUAS[dayIndex % VERIFIED_DUAS.length];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Dua copied! (دعا کاپی کر لی گئی)');
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
    ? 'روزانہ کی مسنون دعائیں بمعہ اردو ترجمہ و فضیلت • Daily Dua | IslamIQ'
    : 'Daily Dua with Meaning and Reference – Masnoon Duas | IslamIQ';

  const seoDescription = isUrdu
    ? 'صبح و شام اور روزمرہ کی مسنون دعائیں عربی متن، تلفظ، اردو اور انگلش ترجمے اور صحیح حدیث کے حوالوں کے ساتھ۔'
    : 'Essential daily Islamic supplications (Duas) with Arabic text, transliteration, authentic Urdu & English translations, and references from Hisn al-Muslim and Hadith.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-dua"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Dua', url: '/daily-dua' }
        ]}
        article={{
          headline: `Daily Dua: ${todayDua.titleEn} - ${todayDua.titleUrdu}`,
          description: todayDua.translationUrdu,
        }}
      />

      {/* Featured Today's Dua */}
      <header className="bg-gradient-to-br from-indigo-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آج کی مسنون دعا' : "Today's Featured Dua"}</span>
          </div>
          <span className="text-xs text-indigo-200/90 font-medium">
            {todayDua.reference}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی مسنون دعا (Daily Masnoon Dua)' : 'Daily Dua with Meaning & Authentic Reference'}
        </h1>

        {/* Featured Dua Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-amber-200">
              {isUrdu ? todayDua.titleUrdu : todayDua.titleEn}
            </h2>
            <span className="text-xs text-indigo-100 bg-indigo-900/60 px-2 py-0.5 rounded-md">
              {isUrdu ? todayDua.occasionUrdu : todayDua.occasionEn}
            </span>
          </div>

          <p className="font-arabic text-xl sm:text-2xl leading-loose text-center text-amber-50 font-bold py-2">
            {todayDua.arabic}
          </p>

          <p className="text-xs text-indigo-200 text-center font-mono italic">
            "{todayDua.transliteration}"
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4 text-center">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-medium">
              {todayDua.translationUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayDua.translationEn}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-emerald-300 font-semibold">
              {todayDua.reference}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayDua.translationUrdu : todayDua.translationEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Listen Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayDua.id, `${todayDua.arabic}\n\n${todayDua.translationUrdu}\n[حوالہ: ${todayDua.reference}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Dua"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Masnoon Duas Collection */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'روزمرہ مسنون دعاؤں کا مجموعہ (Masnoon Duas Collection)' : 'Essential Daily Duas & Adhkar'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {VERIFIED_DUAS.map((dua) => (
            <div
              key={dua.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {isUrdu ? dua.titleUrdu : dua.titleEn}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isUrdu ? dua.occasionUrdu : dua.occasionEn}
                </span>
              </div>

              <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-slate-900 font-semibold py-1">
                {dua.arabic}
              </p>

              <p className="text-xs text-slate-400 italic">
                {dua.transliteration}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {dua.translationUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {dua.translationEn}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dua.reference}</span>
                </span>

                <button
                  onClick={() => handleCopy(dua.id, `${dua.arabic}\n\n${dua.translationUrdu}\n[${dua.reference}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === dua.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-dua" />
    </article>
  );
};

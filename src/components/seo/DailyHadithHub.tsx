import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_HADITHS } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Heart, Copy, ShieldCheck, Sparkles, BookOpen, Volume2, Award } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyHadithHub: React.FC = () => {
  const { contentLang, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayHadith = VERIFIED_HADITHS[dayIndex % VERIFIED_HADITHS.length];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Hadith copied! (حدیث مبارکہ کاپی کر لی گئی)');
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
    ? 'روزانہ کی حدیث مبارکہ مستند حوالہ کے ساتھ • Daily Hadith | IslamIQ'
    : 'Daily Hadith – Authentic Sahih Hadith with Lessons | IslamIQ';

  const seoDescription = isUrdu
    ? 'صحیح بخاری و صحیح مسلم سے روزانہ کی احادیث مبارکہ، راوی کا نام، اردو و انگلش ترجمہ اور زندگی بدلنے والے عملی اسباق۔'
    : 'Daily authentic Hadiths from Sahih al-Bukhari and Sahih Muslim. Learn practical daily lessons, authentic narrators, and Islamic teachings with verified sources.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-hadith"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Hadith', url: '/daily-hadith' }
        ]}
        article={{
          headline: `Daily Hadith: ${todayHadith.source} - Narrated by ${todayHadith.narrator}`,
          description: todayHadith.textUrdu,
        }}
      />

      {/* Featured Today's Hadith */}
      <header className="bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
            <span>{isUrdu ? 'آج کی منتخب حدیث مبارکہ' : "Today's Sahih Hadith"}</span>
          </div>
          <span className="text-xs bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
            {todayHadith.source} #{todayHadith.hadithNumber} ({todayHadith.grade})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی حدیث مبارکہ (Daily Hadith)' : 'Daily Hadith – Words of Prophet Muhammad ﷺ'}
        </h1>

        {/* Featured Hadith Box */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <p className="text-xs text-amber-200 font-semibold">
            {isUrdu ? `راوی: ${todayHadith.narrator}` : `Narrator: ${todayHadith.narrator}`}
          </p>

          <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-amber-50 font-semibold">
            {todayHadith.arabic}
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-semibold">
              {todayHadith.textUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayHadith.textEn}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-600/30 text-xs text-emerald-100">
            <strong>{isUrdu ? 'عملی سبق: ' : 'Practical Lesson: '}</strong>
            <span>{isUrdu ? todayHadith.lessonUrdu : todayHadith.lessonEn}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-slate-300 font-medium">
              Source: {todayHadith.source}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayHadith.textUrdu : todayHadith.textEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Listen Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayHadith.id, `${todayHadith.textUrdu}\n[${todayHadith.source}: ${todayHadith.hadithNumber}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Hadith"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Curated Hadiths List */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'صحیح احادیث کا منتخب ذخیرہ (Sahih Hadith Archive)' : 'Verified Sahih Hadith Collection'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {VERIFIED_HADITHS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {item.source} #{item.hadithNumber} • {item.grade}
                </span>
                <span className="text-[11px] text-slate-400">
                  {item.narrator}
                </span>
              </div>

              <p className="font-arabic text-base sm:text-lg leading-relaxed text-right text-slate-900 font-semibold py-1">
                {item.arabic}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {item.textUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {item.textEn}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs leading-relaxed">
                <strong className="text-emerald-800">{isUrdu ? 'سبق: ' : 'Takeaway: '}</strong>
                <span>{isUrdu ? item.lessonUrdu : item.lessonEn}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'صحیح سند کے ساتھ' : 'Verified Chain & Text'}</span>
                </span>

                <button
                  onClick={() => handleCopy(item.id, `${item.textUrdu}\n[${item.source} : ${item.hadithNumber}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === item.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-hadith" />
    </article>
  );
};

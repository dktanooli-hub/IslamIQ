import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { QURAN_LEARNING_GUIDE_DATA } from '../../data/guide/quran-learning-data';
import {
  BookOpen,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Heart,
  Volume2,
  Layers,
  ArrowRight,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const QuranLearningGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = QURAN_LEARNING_GUIDE_DATA;

  const [activeStageTab, setActiveStageTab] = useState<number>(1);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isUrdu ? data.seoTitleUrdu : data.seoTitleEn,
        text: isUrdu ? data.seoDescUrdu : data.seoDescEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی کر لیا گیا!' : 'Link copied to clipboard!');
    }
  };

  const seoTitle = isUrdu ? data.seoTitleUrdu : data.seoTitleEn;
  const seoDescription = isUrdu ? data.seoDescUrdu : data.seoDescEn;

  const faqsForSchema = data.faqs.map((f) => ({
    question: isUrdu ? f.questionUrdu : f.questionEn,
    answer: isUrdu ? `${f.answerUrdu} (حوالہ: ${f.reference || 'مستند کتب'})` : `${f.answerEn} (Ref: ${f.reference || 'Authentic sources'})`,
  }));

  const breadcrumbs = [
    { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
    { name: isUrdu ? 'قرآن سیکھیں' : 'Quran Learning', url: data.canonicalPath }
  ];

  const currentStage = data.stages.find((s) => s.stageNumber === activeStageTab) || data.stages[0];

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={data.canonicalPath}
        isUrdu={isUrdu}
        breadcrumbs={breadcrumbs}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: seoDescription,
          datePublished: '2026-09-24',
          dateModified: '2026-09-24'
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-emerald-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-400/20">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Virtue Hadith */}
        <div className="bg-emerald-900/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'قرآن سیکھنے اور سکھانے کی سنہری فضیلت' : 'The Prophetic Golden Standard of Excellence'}</span>
          </div>
          <p className="text-right text-lg sm:text-2xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «{data.virtueHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isUrdu ? data.virtueHadithUrdu : data.virtueHadithEn}
          </p>
          <span className="inline-block text-[11px] text-emerald-300/80 font-mono">
            {data.virtueHadithRef}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('daily-quran-verse')}
            className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isUrdu ? 'روزانہ کی آیت و تلاوت سنیں' : 'Explore Daily Quran Verse'}</span>
          </button>
          <button
            onClick={() => setActiveTab('how-to-perform-salah')}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-white/20 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>{isUrdu ? 'نماز میں قرآنی تلاوت' : 'Quran Recitation in Salah'}</span>
          </button>
        </div>
      </header>

      {/* 3 Progressive Stages Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'قرآن سیکھنے کے ۳ مرحلہ وار مدارج' : 'The 3 Progressive Stages of Quran Mastery'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'بنیادی حروف شناسی سے لے کر روانی اور فہمِ قرآن تک کا سفر'
              : 'From foundational phonetics to reading fluency, Tajweed rules, and contemplation'}
          </p>
        </div>

        {/* Stage selection tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
          {data.stages.map((stage) => (
            <button
              key={stage.stageNumber}
              onClick={() => setActiveStageTab(stage.stageNumber)}
              className={`py-2 sm:py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                activeStageTab === stage.stageNumber
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span className="text-[10px] opacity-80">Stage {stage.stageNumber}</span>
              <span className="truncate max-w-full">
                {isUrdu ? stage.badgeUrdu.split(':')[1] || stage.badgeUrdu : stage.badgeEn.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                {isUrdu ? currentStage.badgeUrdu : currentStage.badgeEn}
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                {isUrdu ? currentStage.titleUrdu : currentStage.titleEn}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{isUrdu ? currentStage.recommendedDailyCommitmentUrdu : currentStage.recommendedDailyCommitmentEn}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
            <strong>{isUrdu ? 'کس کے لیے موزوں ہے: ' : 'Target Audience: '}</strong>
            <span>{isUrdu ? currentStage.targetAudienceUrdu : currentStage.targetAudienceEn}</span>
          </div>

          {/* Learning Goals */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isUrdu ? 'اس مرحلے کے بنیادی اہداف:' : 'Key Learning Milestones:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(isUrdu ? currentStage.learningGoalsUrdu : currentStage.learningGoalsEn).map((goal, gIdx) => (
                <div key={gIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Tips */}
          <div className="space-y-2 pt-2 border-t border-slate-200/70">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isUrdu ? 'عملی رہنمائی و تجاویز:' : 'Pedagogical Advice & Tips:'}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {(isUrdu ? currentStage.practicalTipsUrdu : currentStage.practicalTipsEn).map((tip, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Essential Tajweed Rules */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'ضروری احکامِ تجوید (Essential Tajweed Rules)' : 'Essential Tajweed Rules Explained Simply'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'تلاوت کو سنوارنے والے بنیادی قواعد: قلقلہ، اخفاء، ادغام اور مد'
              : 'The four fundamental phonetic mechanisms every reader should know'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.essentialTajweedRules.map((rule, rIdx) => (
            <div
              key={rIdx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {isUrdu ? rule.ruleNameUrdu : rule.ruleNameEn}
                  </h3>
                  <span className="font-arabic font-bold text-emerald-800 text-sm px-2 py-0.5 rounded-md bg-emerald-100">
                    {rule.ruleNameArabic}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isUrdu ? rule.explanationUrdu : rule.explanationEn}
                </p>
              </div>

              {/* Example box */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 mt-2">
                <span className="text-[10px] font-bold text-emerald-900 block uppercase">
                  {isUrdu ? 'قرآنی مثال:' : 'Quranic Example:'}
                </span>
                <p className="text-right text-base sm:text-lg font-arabic font-semibold text-emerald-950" dir="rtl">
                  {rule.exampleArabic}
                </p>
                <p className="text-[11px] text-emerald-800 font-medium">
                  {rule.exampleTransliteration}
                </p>
                <p className="text-[11px] text-slate-600 mt-1 italic">
                  {isUrdu ? rule.applicationGuideUrdu : rule.applicationGuideEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes to Avoid */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {isUrdu ? 'تلاوت کی عام غلطیاں اور ان کی اصلاح' : 'Common Recitation Mistakes to Avoid (Lahn Jali)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isUrdu
                ? 'حروف کے مخارج اور اعراب کے بگاڑ سے بچنے کی عملی تجاویز'
                : 'Preventing major phonetic errors that alter the sacred meaning of the text'}
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {data.commonMistakes.map((m, mIdx) => (
            <div
              key={mIdx}
              className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2"
            >
              <div className="flex items-start gap-2 text-red-700 font-bold text-xs sm:text-sm">
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] uppercase shrink-0">
                  {isUrdu ? 'عام غلطی' : 'Mistake'}
                </span>
                <span>{isUrdu ? m.mistakeUrdu : m.mistakeEn}</span>
              </div>

              <div className="flex items-start gap-2 text-emerald-800 font-semibold text-xs sm:text-sm">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] uppercase shrink-0">
                  {isUrdu ? 'صحیح طریقہ' : 'Correction'}
                </span>
                <span>{isUrdu ? m.correctionUrdu : m.correctionEn}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-1 pl-1">
                {isUrdu ? m.explanationUrdu : m.explanationEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Routine Advice */}
      <section className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
          {isUrdu ? 'روزانہ تلاوت کا نبوی معمول کیسے بنائیں؟' : 'Building a Consistent Daily Quran Habit'}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          {isUrdu
            ? 'رسول اللہ ﷺ نے فرمایا کہ اللہ کو سب سے زیادہ وہ عمل پسند ہے جو مداومت کے ساتھ ہو چاہے تھوڑا ہی کیوں نہ ہو (صحیح بخاری: ۶۴۶۴)۔'
            : 'Prophet Muhammad ﷺ taught: "The most beloved of deeds to Allah are those that are most consistent, even if small" (Sahih al-Bukhari 6464).'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {(isUrdu ? data.dailyRoutineAdviceUrdu : data.dailyRoutineAdviceEn).map((advice, aIdx) => (
            <div
              key={aIdx}
              className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs sm:text-sm text-emerald-50 flex items-start gap-3"
            >
              <Heart className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{advice}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'قرآن سیکھنے سے متعلق سوالات (FAQs)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'تجوید کی فرضیت اور بالغوں کے قرآن سیکھنے کے متعلق شرعی رہنمائی'
              : 'Answers on learning as an adult, Tajweed obligation, and reading from digital devices'}
          </p>
        </div>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {isUrdu ? faq.questionUrdu : faq.questionEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white space-y-2 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {isUrdu ? faq.answerUrdu : faq.answerEn}
                    </p>
                    {faq.reference && (
                      <span className="text-[11px] text-emerald-700 font-mono block">
                        {isUrdu ? 'حوالہ: ' : 'Reference: '} {faq.reference}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
          {isUrdu ? 'اسلام آئی کیو کے متعلقہ ٹولز' : 'Interactive Learning Tools on IslamIQ'}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/80">
          {isUrdu
            ? 'روزانہ کی تلاوت، نماز کی ادائی اور تسبیح کے ٹولز سے فائدہ اٹھائیں:'
            : 'Enhance your daily worship with our dedicated utilities:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {data.internalLinks.map((link, lIdx) => (
            <button
              key={lIdx}
              onClick={() => setActiveTab(link.tabId as AppTab)}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-emerald-300 group-hover:text-emerald-200">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>{isUrdu ? 'شروع کریں' : 'Open Tool'}</span>
                {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Cross Links */}
      <RelatedIslamicLearning currentTab="quran-learning-guide" />
    </article>
  );
};

export default QuranLearningGuide;

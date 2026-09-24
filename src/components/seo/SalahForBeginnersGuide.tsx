import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { SALAH_FOR_BEGINNERS_DATA } from '../../data/guide/salah-beginners-data';
import {
  Compass,
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const SalahForBeginnersGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = SALAH_FOR_BEGINNERS_DATA;

  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const seoTitle = isUrdu ? data.seoTitleUrdu : data.seoTitleEn;
  const seoDescription = isUrdu ? data.seoDescUrdu : data.seoDescEn;

  const faqsForSchema = data.faqs.map((f) => ({
    question: isUrdu ? f.questionUrdu : f.questionEn,
    answer: isUrdu ? f.answerUrdu : f.answerEn,
  }));

  const breadcrumbs = [
    { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
    { name: isUrdu ? 'نماز سیکھیں' : 'Salah Learning', url: '/salah-learning' },
    { name: isUrdu ? 'ابتدائی نماز گائیڈ' : 'Salah for Beginners', url: data.canonicalPath }
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn">
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
          dateModified: '2026-09-24',
        }}
      />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Hadith of Ease */}
        <div className="mt-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>{isUrdu ? 'دین میں آسانی کی نبوی تسلی' : 'Prophetic Comfort: Religion is Ease'}</span>
          </div>
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 text-right leading-loose font-bold" dir="rtl">
            «{data.comfortHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {isUrdu ? data.comfortHadithUrdu : data.comfortHadithEn}
          </p>
          <span className="inline-block text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
            {data.comfortHadithRef}
          </span>
        </div>
      </header>

      {/* Section 1: Pre-Prayer Checklist */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUrdu ? 'نماز شروع کرنے سے پہلے' : 'Pre-Prayer Checklist'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'چار بنیادی شرائط جن کا خیال رکھنا ضروری ہے' : '4 Simple Things to Prepare Before You Pray'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.essentialChecklist.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isUrdu ? item.itemUrdu : item.itemEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? item.whyImportantUrdu : item.whyImportantEn}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900">{isUrdu ? 'رکعت کیا ہے؟ ' : 'What is a Rakat? '}</span>
          <span>{isUrdu ? data.unitsExplainedUrdu : data.unitsExplainedEn}</span>
        </div>
      </section>

      {/* Section 2: Step-by-Step Flow */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آسان مرحلہ وار طریقہ' : 'Simple Step-by-Step Walkthrough'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'ایک مکمل رکعت کا عملی مسنون طریقہ' : 'The Postures & Recitations Explained for Beginners'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'تکبیر سے سلام تک آسان تلفظ، ترجمہ اور نوآموزوں کے لیے خصوصی مفید نکات۔'
              : 'Clear phonetics, English/Urdu translations, and comforting beginner tips for each action.'}
          </p>
        </div>

        <div className="space-y-4">
          {data.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-4 transition-all hover:border-emerald-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold font-serif text-sm sm:text-base shrink-0 shadow-sm shadow-emerald-700/30">
                  {step.stepNumber}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {isUrdu ? step.postureUrdu : step.postureEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isUrdu ? step.whatToDoUrdu : step.whatToDoEn}
                  </p>
                </div>
              </div>

              {step.arabicText && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2.5">
                  <p className="font-arabic text-xl sm:text-2xl text-emerald-950 text-right leading-loose font-semibold" dir="rtl">
                    {step.arabicText}
                  </p>
                  {step.transliteration && (
                    <p className="text-xs sm:text-sm text-slate-700 italic font-mono">
                      {step.transliteration}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-800 font-medium border-t border-emerald-200/60 pt-2">
                    {isUrdu ? step.meaningUrdu : step.meaningEn}
                  </p>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{isUrdu ? 'نوآموزوں کے لیے آسانی: ' : 'Beginner Friendly Tip: '}</span>
                  <span>{isUrdu ? step.beginnerTipUrdu : step.beginnerTipEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Summary of the 5 Daily Prayers */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'پانچوں فرض نمازوں کی رکعتوں کا جدول' : 'The 5 Daily Prayers & Fard Rakats'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          {isUrdu
            ? 'ابتدائی مرحلے میں لازمی فرض رکعتوں پر توجہ دیں اور آہستہ آہستہ سنتوں کو معمول بنائیں۔'
            : 'As a beginner, focus primarily on fulfilling the obligatory (Fard) units as you build the daily habit.'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800">
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'نماز' : 'Prayer'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'فرض رکعتیں' : 'Fard Rakats'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'وقت' : 'Time Window'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'سنتِ مؤکدہ' : 'Sunnah Muakkadah'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.prayersTable.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-bold text-slate-900">
                    {isUrdu ? p.prayerNameUrdu : p.prayerNameEn}
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-black text-emerald-700">
                    {p.totalFardRakats}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-700">
                    {isUrdu ? p.timeWindowUrdu : p.timeWindowEn}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600">
                    {isUrdu ? p.sunnahMuakkadahUrdu : p.sunnahMuakkadahEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Common Beginner Worries Reassured */}
      <section className="bg-teal-50/60 rounded-3xl p-6 sm:p-8 border border-teal-200/80 space-y-4">
        <div className="flex items-center gap-2 text-teal-900">
          <Heart className="w-5 h-5 text-teal-700" />
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {isUrdu ? 'ابتدائی سیکھنے والوں کے عام خدشات اور ان کا حل' : 'Overcoming Common Beginner Fears & Anxieties'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {data.commonBeginnerWorries.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-teal-200/70 space-y-2">
              <div className="flex items-start gap-2 text-xs font-bold text-teal-900">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-600" />
                <span>{isUrdu ? item.worryUrdu : item.worryEn}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isUrdu ? item.reassuranceUrdu : item.reassuranceEn}
              </p>
              {item.hadithProof && (
                <span className="inline-block text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {item.hadithProof}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'نوآموزوں کے اہم سوالات اور جوابات (FAQs)' : 'Frequently Asked Questions by Beginners'}
          </h2>
        </div>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {isUrdu ? faq.questionUrdu : faq.questionEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white space-y-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{isUrdu ? faq.answerUrdu : faq.answerEn}</p>
                    {faq.reference && (
                      <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {faq.reference}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 6: Internal Links */}
      <section className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'نماز اور طہارت کے مزید عملی ٹولز' : 'Interactive Tools to Boost Your Daily Prayer'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200">
            {isUrdu
              ? 'وضو کا طریقہ، قبلہ رخ اور روزانہ نماز کا معمول بنانے کے لیے ٹریکر استعمال کریں۔'
              : 'Continue strengthening your Salah with our Wudu guide, Qibla compass, and daily tracker.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {data.internalLinks.map((link) => (
            <a
              key={link.tabId}
              href={link.path}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(link.tabId as AppTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/15 flex items-center justify-between group"
            >
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              {isUrdu ? (
                <ArrowLeft className="w-4 h-4 text-emerald-300 shrink-0 ml-2 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-emerald-300 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};

export default SalahForBeginnersGuide;

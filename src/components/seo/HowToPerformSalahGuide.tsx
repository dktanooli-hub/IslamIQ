import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { SALAH_GUIDE_DATA } from '../../data/guide/salah-guide-data';
import {
  CheckSquare,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const HowToPerformSalahGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = SALAH_GUIDE_DATA;

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
    { name: isUrdu ? 'نماز کا طریقہ' : 'How to Perform Salah', url: data.canonicalPath }
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
          datePublished: '2026-09-15',
          dateModified: '2026-09-24',
        }}
      />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Hadith Quote Banner */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
          <p className="font-arabic text-xl sm:text-2xl text-amber-200 text-right leading-loose font-bold" dir="rtl">
            «{data.keyHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium">
            {isUrdu ? data.keyHadithUrdu : data.keyHadithEn}
          </p>
          <span className="inline-block text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
            {data.keyHadithRef}
          </span>
        </div>
      </header>

      {/* Section 1: Prerequisites of Salah (Shuroot) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{isUrdu ? 'نماز کی ضروری شرائط' : 'Essential Conditions (Shuroot)'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'نماز شروع کرنے سے پہلے کی شرائط' : 'Prerequisites: What Must Precede Salah'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isUrdu
              ? 'نماز کی صحت کے لیے ۶ بنیادی شرائط ہیں جن کے بغیر نماز ادا نہیں ہوتی۔'
              : 'Before commencing prayer, these six foundational prerequisites must be verified for the Salah to be valid.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.prerequisites.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isUrdu ? item.titleUrdu : item.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? item.descUrdu : item.descEn}
              </p>
              {item.reference && (
                <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                  {item.reference}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Step-by-Step Method */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مرحلہ وار طریقہ' : 'Step-by-Step Procedure'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'نماز کا مکمل مسنون طریقہ کار' : 'How to Pray: Detailed Step-by-Step Breakdown'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'تکبیرِ تحریمہ سے لے کر سلام تک ہر رکن، دعا اور مستند حوالہ کی تفصیل۔'
              : 'From the opening Takbir to the concluding Tasleem, follow the authentic Sunnah method.'}
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
                    {isUrdu ? step.titleUrdu : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isUrdu ? step.descUrdu : step.descEn}
                  </p>
                </div>
              </div>

              {/* Recitation Box if available */}
              {step.arabic && (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
                  <p className="font-arabic text-xl sm:text-2xl text-emerald-950 text-right leading-loose font-semibold" dir="rtl">
                    {step.arabic}
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

              {step.reference && (
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{step.reference}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Summary of the 5 Daily Prayers & Rakats */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'پانچوں نمازوں کی رکعتوں کا مکمل چارٹ' : 'The 5 Daily Prayers & Rakats Breakdown'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          {isUrdu
            ? 'ہر نماز کے وقت اور رکعتوں (سنت، فرض، نفل اور وتر) کی مفصل تقسیم۔'
            : 'Overview of the five obligatory daily prayers, their time windows, and total rakat distribution.'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-800">
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'نماز' : 'Prayer'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'کل رکعتیں' : 'Total'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'رکعتوں کی تقسیم' : 'Breakdown'}</th>
                <th className="py-3 px-3 sm:px-4 font-bold">{isUrdu ? 'شرعی وقت' : 'Time Window'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.prayersSummary.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-bold text-slate-900">
                    {isUrdu ? p.nameUrdu : p.nameEn}
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-semibold text-emerald-700">
                    {p.totalRakats}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-700">
                    {isUrdu ? p.breakdownUrdu : p.breakdownEn}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600">
                    {isUrdu ? p.timeUrdu : p.timeEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Common Mistakes in Salah */}
      <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {isUrdu ? 'نماز میں عام غلطیاں اور ان کی اصلاح' : 'Common Mistakes in Prayer & How to Avoid Them'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-950/80">
          {isUrdu
            ? 'احادیثِ صحیحہ میں نماز کے دوران ان کوتاہیوں سے بچنے کی خصوصی تلقین فرمائی گئی ہے۔'
            : 'The Prophet ﷺ cautioned against several common errors that detract from prayer\'s acceptance and reward.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {data.commonMistakes.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200/70 space-y-2">
              <div className="flex items-start gap-2 text-xs font-bold text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{isUrdu ? item.mistakeUrdu : item.mistakeEn}</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isUrdu ? item.correctionUrdu : item.correctionEn}</span>
              </div>
              {item.hadithReference && (
                <span className="inline-block text-[10px] font-semibold text-slate-500 pt-1">
                  {item.hadithReference}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Frequently Asked Questions (Accordion) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'نماز کے متعلق اہم سوال و جواب (FAQs)' : 'Frequently Asked Questions About Performing Salah'}
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

      {/* Section 6: Internal IslamIQ Links */}
      <section className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'مزید متعلقہ اسلامی رہنما صفحات' : 'Explore Related Islamic Learning Tools on IslamIQ'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200">
            {isUrdu
              ? 'وضو، قبلہ رخ، روزانہ نماز ٹریکر اور بنیادی اسلامی ارکان کی مستند معلومات۔'
              : 'Continue your learning journey with our interactive tools and comprehensive educational guides.'}
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

      {/* Standard SEO Cross-Linking */}
      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};

export default HowToPerformSalahGuide;

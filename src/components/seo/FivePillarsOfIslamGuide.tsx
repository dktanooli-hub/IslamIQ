import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { FIVE_PILLARS_GUIDE_DATA } from '../../data/guide/five-pillars-data';
import {
  Compass,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Heart,
  Scale
} from 'lucide-react';

export const FivePillarsOfIslamGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = FIVE_PILLARS_GUIDE_DATA;

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
    { name: isUrdu ? 'اسلامی معلومات' : 'General Knowledge', url: '/islamic-general-knowledge' },
    { name: isUrdu ? 'ارکانِ اسلام' : '5 Pillars of Islam', url: data.canonicalPath }
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
      <header className="bg-gradient-to-br from-indigo-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
          <Compass className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Hadith Quote Banner */}
        <div className="mt-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{isUrdu ? 'بنیادِ اسلام کی حدیثِ مبارکہ' : 'Foundational Hadith on the Five Pillars'}</span>
          </div>
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 text-right leading-loose font-bold" dir="rtl">
            «{data.foundationalHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {isUrdu ? data.foundationalHadithUrdu : data.foundationalHadithEn}
          </p>
          <span className="inline-block text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
            {data.foundationalHadithRef}
          </span>
        </div>
      </header>

      {/* Section 1: Distinction between Islam and Iman */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'اسلام اور ایمان کا فرق' : 'Core Distinction: Islam vs. Iman'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
          {isUrdu ? 'ارکانِ اسلام (ظاہری اعمال) اور ارکانِ ایمان (باطنی یقین)' : 'The 5 Pillars of Islam vs. The 6 Articles of Iman'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
          {isUrdu ? data.pillarsVsImanExplanationUrdu : data.pillarsVsImanExplanationEn}
        </p>
      </section>

      {/* Section 2: Detailed Breakdown of Each of the 5 Pillars */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'پانچوں ارکان کی تفصیل' : 'The Five Foundations'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'اسلام کے پانچوں ستونوں کی تفصیلی تشریح' : 'In-Depth Exploration of Each Pillar'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'شہادت، نماز، زکوٰۃ، روزہ اور حج کے احکام، شرعی دلائل اور روحانی ثمرات۔'
              : 'Detailed Quranic basis, Hadith evidence, practical requirements, and spiritual elevation.'}
          </p>
        </div>

        <div className="space-y-6">
          {data.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5 transition-all hover:border-emerald-300"
            >
              {/* Header with Number & Names */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-sm shadow-emerald-700/30">
                    {pillar.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {isUrdu ? `رکن نمبر ${pillar.number}` : `PILLAR #${pillar.number}`}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {isUrdu ? pillar.nameUrdu : pillar.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="font-arabic text-2xl text-emerald-950 font-bold self-end sm:self-center" dir="rtl">
                  {pillar.nameArabic}
                </div>
              </div>

              {/* Meaning */}
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {isUrdu ? pillar.meaningUrdu : pillar.meaningEn}
              </p>

              {/* Quranic Ayah Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'قرآنی دلیل' : 'Quranic Foundation'}</span>
                </div>
                <p className="font-arabic text-lg sm:text-xl text-emerald-950 text-right leading-loose font-semibold" dir="rtl">
                  {pillar.quranAyahArabic}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isUrdu ? pillar.quranAyahUrdu : pillar.quranAyahEn}
                </p>
                <span className="inline-block text-[11px] font-mono text-emerald-700 font-semibold">
                  {pillar.quranRef}
                </span>
              </div>

              {/* Hadith Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Heart className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isUrdu ? 'حدیثِ رسول ﷺ' : 'Prophetic Guidance'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {isUrdu ? pillar.hadithTextUrdu : pillar.hadithTextEn}
                </p>
                <span className="inline-block text-[11px] text-slate-500 font-mono">
                  {pillar.hadithRef}
                </span>
              </div>

              {/* Key Details List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isUrdu ? 'بنیادی شرعی تقاضے اور احکام:' : 'Essential Rules & Requirements:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                  {(isUrdu ? pillar.keyDetailsUrdu : pillar.keyDetailsEn).map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spiritual Impact */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{isUrdu ? 'روحانی ثمرہ: ' : 'Spiritual Fruit: '}</span>
                  <span>{isUrdu ? pillar.spiritualImpactUrdu : pillar.spiritualImpactEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Common Misconceptions */}
      <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {isUrdu ? 'ارکانِ اسلام کے بارے میں عام مغالطے اور حقیقت' : 'Common Misconceptions About the 5 Pillars'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {data.commonMisconceptions.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-amber-200/70 space-y-2">
              <div className="flex items-start gap-2 text-xs font-bold text-rose-700">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{isUrdu ? item.misconceptionUrdu : item.misconceptionEn}</span>
              </div>
              <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{isUrdu ? item.realityUrdu : item.realityEn}</span>
              </div>
              {item.reference && (
                <span className="inline-block text-[10px] font-semibold text-slate-500 pt-1">
                  {item.reference}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'ارکانِ اسلام کے بارے میں اہم سوالات (FAQs)' : 'Frequently Asked Questions About the 5 Pillars of Islam'}
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

      {/* Section 5: Internal IslamIQ Links */}
      <section className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'ارکانِ اسلام کو عملاً سیکھنے کے ٹولز' : 'Practice the Pillars with IslamIQ Interactive Tools'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200">
            {isUrdu
              ? 'نماز اور وضو کے تفصیلی طریقے، قبلہ رخ معلوم کرنے اور علم کی جانچ کے لیے کوئز کھیلیں۔'
              : 'Turn knowledge into daily action with our interactive tools, prayer guides, and quizzes.'}
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

      <RelatedIslamicLearning currentTab="islamic-general-knowledge" />
    </article>
  );
};

export default FivePillarsOfIslamGuide;

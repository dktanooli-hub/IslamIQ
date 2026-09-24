import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { WUDU_GUIDE_DATA } from '../../data/guide/wudu-guide-data';
import {
  Droplets,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Heart
} from 'lucide-react';

export const HowToPerformWuduGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = WUDU_GUIDE_DATA;

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
    { name: isUrdu ? 'وضو کا طریقہ' : 'How to Perform Wudu', url: data.canonicalPath }
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
      <header className="bg-gradient-to-br from-teal-800 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-400/30">
          <Droplets className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Quranic Proof Card */}
        <div className="mt-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{isUrdu ? 'قرآنی حکم (سورۃ المائدہ: ۶)' : 'The Quranic Command (Surah Al-Ma\'idah 5:6)'}</span>
          </div>
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 text-right leading-loose font-bold" dir="rtl">
            «{data.quranAyahArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {isUrdu ? data.quranAyahUrdu : data.quranAyahEn}
          </p>
          <span className="inline-block text-[11px] text-teal-300 font-semibold">
            {data.quranRef}
          </span>
        </div>
      </header>

      {/* Section 1: The 4 Obligatory Fard Acts */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUrdu ? 'وضو کے ۴ بنیادی فرائض' : 'The 4 Obligatory (Fard) Acts'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'وضو کے وہ ارکان جن کے بغیر وضو نہیں ہوتا' : 'The 4 Obligatory Pillars of Wudu (Fara\'id)'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isUrdu
              ? 'قرآن مجید کی سورۃ المائدہ کی آیت ۶ کے مطابق درج ذیل چار اعضاء کا دھونا اور مسح کرنا فرضِ قطعی ہے۔ اگر ان میں سے ایک بال برابر جگہ بھی خشک رہ جائے تو وضو ادا نہیں ہوتا۔'
              : 'Directly mandated in Surah Al-Ma\'idah (5:6), leaving any of these four areas unwashed completely invalidates the ablution.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.fardSummary.map((fard) => (
            <div
              key={fard.number}
              className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 border border-teal-200/70 space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                  {fard.number}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-md">
                  {isUrdu ? 'فرض' : 'FARD'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isUrdu ? fard.titleUrdu : fard.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? fard.descUrdu : fard.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Complete Sunnah Step-by-Step Method */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'کامل طریقہ' : 'Complete Sunnah Method'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'وضو کا مکمل اور مسنون طریقہ کار' : 'Step-by-Step Sunnah Procedure for Wudu'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'رسول اللہ ﷺ کی سنت کے مطابق نیت اور بسم اللہ سے لے کر پاؤں دھونے تک ترتیب وار وضاحت۔'
              : 'Follow the authentic Sunnah of Prophet Muhammad ﷺ with recitations and precise physical boundaries.'}
          </p>
        </div>

        <div className="space-y-4">
          {data.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-3 transition-all hover:border-teal-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-bold font-serif text-sm sm:text-base shrink-0 shadow-sm shadow-teal-700/30">
                  {step.stepNumber}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {isUrdu ? step.titleUrdu : step.titleEn}
                    </h3>
                    {step.isFard ? (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                        {isUrdu ? 'لازمی فرض' : 'FARD OBLIGATION'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        {isUrdu ? 'سنتِ مؤکدہ' : 'SUNNAH'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isUrdu ? step.descUrdu : step.descEn}
                  </p>
                </div>
              </div>

              {step.arabic && (
                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/60 space-y-2">
                  <p className="font-arabic text-xl sm:text-2xl text-teal-950 text-right leading-loose font-semibold" dir="rtl">
                    {step.arabic}
                  </p>
                  {step.transliteration && (
                    <p className="text-xs sm:text-sm text-slate-700 italic font-mono">
                      {step.transliteration}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-800 font-medium border-t border-teal-200/50 pt-2">
                    {isUrdu ? step.meaningUrdu : step.meaningEn}
                  </p>
                </div>
              )}

              {step.reference && (
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>{step.reference}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: The Post-Wudu Dua & Virtue */}
      <section className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4" />
          <span>{isUrdu ? 'وضو کے بعد کی مسنون دعا اور فضیلت' : 'Supplication After Wudu & Its Sublime Virtue'}</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
          {isUrdu ? 'جنت کے آٹھوں دروازے کھلنے والی مبارک دعا' : 'The Dua That Opens the Eight Gates of Jannah'}
        </h2>

        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
          <p className="font-arabic text-xl sm:text-2xl text-amber-200 text-right leading-loose font-bold" dir="rtl">
            {data.postWuduDua.arabic}
          </p>
          <p className="text-xs sm:text-sm text-emerald-100 italic font-mono">
            {data.postWuduDua.transliteration}
          </p>
          <p className="text-xs sm:text-sm text-white font-medium border-t border-white/15 pt-2">
            {isUrdu ? data.postWuduDua.translationUrdu : data.postWuduDua.translationEn}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-700/50 border border-emerald-500/30 text-xs sm:text-sm text-emerald-100 leading-relaxed">
          <p className="font-semibold">{isUrdu ? data.postWuduDua.virtueUrdu : data.postWuduDua.virtueEn}</p>
          <span className="block text-[11px] text-emerald-300 font-mono mt-1">{data.postWuduDua.reference}</span>
        </div>
      </section>

      {/* Section 4: What Nullifies Wudu (Nawaqid al-Wudu) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2 text-rose-700">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
            {isUrdu ? 'نواقضِ وضو (وضو کو توڑنے والی چیزیں)' : 'What Nullifies Wudu (Nawaqid al-Wudu)'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          {isUrdu
            ? 'درج ذیل امور پیش آنے سے وضو ختم ہو جاتا ہے اور دوبارہ نماز کے لیے نیا وضو کرنا لازمی ہو جاتا ہے۔'
            : 'Experiencing any of the following bodily events breaks ritual purity and necessitates performing a fresh ablution before prayer.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.nullifiers.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/60 space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isUrdu ? item.titleUrdu : item.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? item.descUrdu : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Common Mistakes */}
      <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {isUrdu ? 'وضو کے دوران عام غلطیاں اور ان کا حل' : 'Common Mistakes in Wudu & How to Avoid Them'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
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
              {item.reference && (
                <span className="inline-block text-[10px] font-semibold text-slate-500 pt-1">
                  {item.reference}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'وضو اور طہارت کے متعلق اہم سوالات (FAQs)' : 'Frequently Asked Questions About Wudu'}
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
                      <span className="inline-block text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
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

      {/* Section 7: Internal IslamIQ Links */}
      <section className="bg-teal-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'وضو کے بعد نماز اور دیگر اسلامی رہنمائی' : 'Put Your Purity into Practice on IslamIQ'}
          </h3>
          <p className="text-xs sm:text-sm text-teal-200">
            {isUrdu
              ? 'نماز کا مکمل مسنون طریقہ، روزانہ کی مسنون دعائیں اور اسلامی ارکان کی مستند تفصیلات۔'
              : 'Transition from physical purification into spiritual elevation through our comprehensive guides.'}
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
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              {isUrdu ? (
                <ArrowLeft className="w-4 h-4 text-teal-300 shrink-0 ml-2 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-teal-300 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};

export default HowToPerformWuduGuide;

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { SIX_ARTICLES_OF_FAITH_DATA } from '../../data/guide/six-articles-faith-data';
import {
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Heart,
  Scale
} from 'lucide-react';

export const SixArticlesOfFaithGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = SIX_ARTICLES_OF_FAITH_DATA;

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
    { name: isUrdu ? 'ارکانِ ایمان' : '6 Articles of Faith', url: data.canonicalPath }
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
      <header className="bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Quran Ayah Banner */}
        <div className="mt-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{isUrdu ? 'قرآنی دلیل (سورۃ البقرۃ: ۲۸۵)' : 'Foundational Quranic Proof (Surah Al-Baqarah 2:285)'}</span>
          </div>
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 text-right leading-loose font-bold" dir="rtl">
            «{data.foundationalQuranArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {isUrdu ? data.foundationalQuranUrdu : data.foundationalQuranEn}
          </p>
          <span className="inline-block text-[11px] text-blue-300 font-semibold uppercase tracking-wider">
            {data.foundationalQuranRef}
          </span>
        </div>
      </header>

      {/* Section 1: Hadith Jibreel Definition of Iman */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-blue-600" />
          <span>{isUrdu ? 'حدیثِ جبریل میں ایمان کی تعریف' : 'The Prophetic Definition (Hadith Jibreel)'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
          {isUrdu ? 'ایمان کا مفہوم اور رسول اللہ ﷺ کا ارشادات' : 'What is Iman? The 6 Inward Foundations of Faith'}
        </h2>
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
          <p className="font-arabic text-lg sm:text-xl text-blue-950 text-right leading-loose font-bold" dir="rtl">
            {data.hadithJibreelArabic}
          </p>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {isUrdu ? data.hadithJibreelUrdu : data.hadithJibreelEn}
          </p>
          <span className="inline-block text-[11px] font-mono text-blue-700 font-semibold">
            {data.hadithJibreelRef}
          </span>
        </div>
      </section>

      {/* Section 2: In-Depth Breakdown of the 6 Articles */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'چھ ارکان کی تفصیل' : 'The 6 Core Pillars'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'ایمان کے چھ بنیادی عقائد کی تفصیلی تشریح' : 'Detailed Exploration of Each Article of Faith'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'ہر رکن کا قرآنی حوالہ، نبوی حدیث، بنیادی تقاضے اور مومن کی زندگی پر روحانی اثرات۔'
              : 'Quranic evidence, authentic Hadith, core theological points, and moral transformation.'}
          </p>
        </div>

        <div className="space-y-6">
          {data.articles.map((article) => (
            <div
              key={article.number}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5 transition-all hover:border-blue-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-sm shadow-blue-700/30">
                    {article.number}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                      {isUrdu ? `رکن نمبر ${article.number}` : `ARTICLE #${article.number}`}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {isUrdu ? article.nameUrdu : article.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="font-arabic text-2xl text-blue-950 font-bold self-end sm:self-center" dir="rtl">
                  {article.nameArabic}
                </div>
              </div>

              {/* Meaning */}
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {isUrdu ? article.meaningUrdu : article.meaningEn}
              </p>

              {/* Quran Ayah Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'قرآنی دلیل' : 'Quranic Foundation'}</span>
                </div>
                <p className="font-arabic text-lg sm:text-xl text-blue-950 text-right leading-loose font-semibold" dir="rtl">
                  {article.quranAyahArabic}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isUrdu ? article.quranAyahUrdu : article.quranAyahEn}
                </p>
                <span className="inline-block text-[11px] font-mono text-blue-700 font-semibold">
                  {article.quranRef}
                </span>
              </div>

              {/* Hadith Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Heart className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isUrdu ? 'حدیثِ نبوی ﷺ' : 'Prophetic Guidance'}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {isUrdu ? article.hadithTextUrdu : article.hadithTextEn}
                </p>
                <span className="inline-block text-[11px] text-slate-500 font-mono">
                  {article.hadithRef}
                </span>
              </div>

              {/* Key Beliefs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isUrdu ? 'بنیادی ایمانی تقاضے اور احکام:' : 'Core Beliefs & Practical Demands:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600">
                  {(isUrdu ? article.keyBeliefsUrdu : article.keyBeliefsEn).map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
                  <span>{isUrdu ? article.spiritualImpactUrdu : article.spiritualImpactEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Misconceptions */}
      <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 space-y-4">
        <div className="flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-black font-serif">
            {isUrdu ? 'عقائد و ایمانیات کے متعلق عام مغالطے اور حقائق' : 'Common Misconceptions About the Articles of Faith'}
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
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
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
          <HelpCircle className="w-5 h-5 text-blue-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'ارکانِ ایمان کے متعلق کثرت سے پوچھے گئے سوالات (FAQs)' : 'Frequently Asked Questions About the 6 Articles of Faith'}
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
                      <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
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

      {/* Section 5: Internal Links */}
      <section className="bg-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'ایمان و عمل کو مضبوط بنانے کے وسائل' : 'Turn Faith Into Action with IslamIQ Tools'}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200">
            {isUrdu
              ? 'اسلام کے ۵ بنیادی ارکان، نماز کا طریقہ اور علم کی جانچ کے لیے تفاعلی کوئز۔'
              : 'Connect your internal conviction to daily practice through prayer guides, daily duas, and quizzes.'}
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
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              {isUrdu ? (
                <ArrowLeft className="w-4 h-4 text-blue-300 shrink-0 ml-2 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-blue-300 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="islamic-general-knowledge" />
    </article>
  );
};

export default SixArticlesOfFaithGuide;

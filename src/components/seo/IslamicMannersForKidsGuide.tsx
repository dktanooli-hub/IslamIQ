import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { ISLAMIC_MANNERS_FOR_KIDS_DATA } from '../../data/guide/kids-manners-data';
import {
  Smile,
  Heart,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Award,
  BookOpen,
  MessageCircle,
  Utensils,
  HeartHandshake
} from 'lucide-react';

export const IslamicMannersForKidsGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ISLAMIC_MANNERS_FOR_KIDS_DATA;

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
    { name: isUrdu ? 'بچوں کا سیکشن' : 'Kids Zone', url: '/kids-islamic-quiz' },
    { name: isUrdu ? 'اسلامی آداب' : 'Islamic Manners for Kids', url: data.canonicalPath }
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-emerald-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

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
      <header className="bg-gradient-to-br from-amber-700 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
          <Smile className="w-3.5 h-3.5" />
          <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-sm sm:text-base text-amber-50 leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Hadith on Akhlaq */}
        <div className="mt-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>{isUrdu ? 'پیارے نبی ﷺ کا مقصدِ بعثت' : 'The Mission of Prophet Muhammad ﷺ: Perfecting Noble Manners'}</span>
          </div>
          <p className="font-arabic text-xl sm:text-2xl text-amber-100 text-right leading-loose font-bold" dir="rtl">
            «{data.heroHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {isUrdu ? data.heroHadithUrdu : data.heroHadithEn}
          </p>
          <span className="inline-block text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
            {data.heroHadithRef}
          </span>
        </div>
      </header>

      {/* Section 1: Categories of Kids Manners */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isUrdu ? 'روزمرہ کے آداب' : 'Daily Islamic Etiquette'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {isUrdu ? 'بچوں کے اہم اسلامی آداب اور پیاری سنتیں' : 'Essential Islamic Manners for Everyday Life'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'کھانے پینے، سلام، والدین کے احترام اور صفائی کے نبوی طریقے بچوں کے لیے آسان انداز میں۔'
              : 'Practical, loving Sunnah habits designed for children and families to practice together.'}
          </p>
        </div>

        <div className="space-y-8">
          {data.categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-200/60">
                  {getCategoryIcon(category.categoryIconName)}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
                  {isUrdu ? category.titleUrdu : category.titleEn}
                </h3>
              </div>

              <div className="space-y-6">
                {category.manners.map((manner, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-4 transition-all hover:bg-slate-50/80"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {mIdx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {isUrdu ? manner.titleUrdu : manner.titleEn}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {isUrdu ? manner.whatKidsShouldDoUrdu : manner.whatKidsShouldDoEn}
                        </p>
                      </div>
                    </div>

                    {/* Sunnah Phrase Card if present */}
                    {manner.sunnahPhraseArabic && (
                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          {isUrdu ? 'مسنون کلمات:' : 'Sunnah Phrase to Say:'}
                        </span>
                        <p className="font-arabic text-lg sm:text-xl text-emerald-950 text-right leading-loose font-bold" dir="rtl">
                          {manner.sunnahPhraseArabic}
                        </p>
                        {manner.sunnahPhraseTransliteration && (
                          <p className="text-xs text-slate-700 font-mono italic">
                            {manner.sunnahPhraseTransliteration}
                          </p>
                        )}
                        <p className="text-xs text-slate-800 font-medium">
                          {isUrdu ? manner.sunnahPhraseUrdu : manner.sunnahPhraseEn}
                        </p>
                      </div>
                    )}

                    {/* Hadith Quote */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isUrdu ? 'پیارے نبی ﷺ کا فرمان:' : 'Prophetic Teaching:'}</span>
                      </div>
                      <p className="text-slate-800 italic">
                        "{isUrdu ? manner.propheticHadithQuoteUrdu : manner.propheticHadithQuoteEn}"
                      </p>
                      <span className="block text-[10px] font-mono text-slate-500 pt-0.5">
                        {manner.hadithRef}
                      </span>
                    </div>

                    {/* Kid Friendly Tip */}
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                      <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">{isUrdu ? 'بچوں کے لیے سنہری نکتہ: ' : 'Fun Kid Tip: '}</span>
                        <span>{isUrdu ? manner.kidFriendlyTipUrdu : manner.kidFriendlyTipEn}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: 5-Day Good Character Challenge for Kids */}
      <section className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>{isUrdu ? 'بچوں کا ۵ روزہ اخلاق چیلنج' : '5-Day Good Character Challenge'}</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black font-serif text-white">
            {isUrdu ? 'آئیں ہر دن ایک نیا پیارا ادب اپنائیں!' : 'Put Sunnah Manners into Action this Week!'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isUrdu
              ? 'بچے اور والدین مل کر یہ تفریحی روزانہ چیلنج پورا کریں اور نیک عادتوں کے چیمپیئن بنیں۔'
              : 'A fun checklist for children and parents to build positive habits one day at a time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {data.dailyMannersChallenge.map((ch) => (
            <div
              key={ch.dayNumber}
              className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2 backdrop-blur-md"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isUrdu ? ch.challengeTitleUrdu : ch.challengeTitleEn}</span>
              </div>
              <p className="text-xs text-slate-100 leading-relaxed">
                {isUrdu ? ch.descriptionUrdu : ch.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            {isUrdu ? 'والدین اور بچوں کے اہم سوالات (FAQs)' : 'Frequently Asked Questions by Parents & Teachers'}
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

      {/* Section 4: Internal Links */}
      <section className="bg-amber-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black font-serif">
            {isUrdu ? 'بچوں کی اسلامی تعلیم کے مزید وسائل' : 'Explore More Islamic Learning for Kids & Family'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-200">
            {isUrdu
              ? 'بچوں کا اسلامی کوئز کھیلیں، روزانہ کی دعائیں یاد کریں اور نماز سیکھیں۔'
              : 'Continue learning through playful quizzes, daily supplications, and beginner prayer guides.'}
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
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              {isUrdu ? (
                <ArrowLeft className="w-4 h-4 text-amber-300 shrink-0 ml-2 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-amber-300 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </a>
          ))}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="kids-islamic-quiz" />
    </article>
  );
};

export default IslamicMannersForKidsGuide;

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { HADITH_GUIDE_DATA } from '../../data/guide/hadith-guide-data';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { AppTab } from '../../types';

export const HadithLearningGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = HADITH_GUIDE_DATA;

  const [activeTabClassification, setActiveTabClassification] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const seoTitle = isUrdu
    ? "حدیث سیکھنے کی گائیڈ • اسناد، کتبِ ستہ اور اقسام | IslamIQ"
    : "Hadith Learning Guide: Traditions, Authenticity & Books | IslamIQ";

  const seoDescription = isUrdu
    ? "حدیث نبوی ﷺ کے بنیادی اصول، اسناد و متن کی تحقیق، صحیح، حسن اور ضعیف کی تعریف، کتبِ ستہ کا تعارف اور عام غلطیوں سے بچنے کی تفصیلی گائیڈ۔"
    : "Comprehensive beginner to intermediate Hadith guide. Understand Isnad and Matn, Sahih/Hasan/Da'if grading, Kutub al-Sittah compilers, and authenticity rules with verified references.";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/hadith-learning-guide"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی رہنمائی' : 'Guides', url: '/daily-hadith' },
          { name: isUrdu ? 'حدیث گائیڈ' : 'Hadith Learning Guide', url: '/hadith-learning-guide' }
        ]}
        faqs={data.faqs.map((f) => ({
          question: isUrdu ? f.questionUrdu : f.questionEn,
          answer: isUrdu ? f.answerUrdu : f.answerEn
        }))}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: seoDescription,
          datePublished: '2026-09-24',
          dateModified: '2026-09-24'
        }}
      />

      {/* Header Banner */}
      <header className="text-center space-y-4 border-b border-emerald-100 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'علوم الحدیث کی تعلیمی گائیڈ' : 'Sciences of Prophetic Hadith (Mustalah al-Hadith)'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>
      </header>

      {/* Section 1: Definition & Role */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'حدیث کیا ہے؟ مفہوم اور اہمیت' : 'What is Hadith? Definition & Islamic Authority'}</span>
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.definitionUrdu : data.definitionEn}
        </p>

        <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-sm leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 mb-1">
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span>{isUrdu ? 'قرآنی فرمان' : 'Quranic Foundation'}</span>
          </p>
          <p className="font-arabic text-base text-right mb-1">
            وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا
          </p>
          <p className="italic text-xs sm:text-sm">
            {isUrdu
              ? "اور جو کچھ رسول تمہیں عطا فرمائیں اسے لے لو اور جس سے منع فرمائیں اس سے رک جاؤ (سورۃ الحشر: ۷)"
              : "'And whatever the Messenger has given you - take; and what he has forbidden you - refrain from.' (Quran 59:7)"}
          </p>
        </div>
      </section>

      {/* Section 2: Isnad and Matn */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'حدیث کے دو ستون: اسناد اور متن' : 'The Two Pillars: Isnad (Chain) and Matn (Text)'}</span>
        </h2>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {isUrdu ? data.isnadMatnUrdu : data.isnadMatnEn}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              {isUrdu ? '۱. اسناد (سلسلہ روات)' : '1. Isnad (The Chain)'}
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              {isUrdu ? 'راویوں کی دیانت اور حافظہ' : 'Chain of Direct Narrators'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'عبداللہ بن مبارکؒ فرماتے ہیں: "اسناد دین کا حصہ ہے۔ اگر اسناد نہ ہوتی تو جو چاہتا جو منہ میں آتا کہہ دیتا۔"'
                : "Imam Ibn al-Mubarak said: 'The Isnad is part of the religion. Had it not been for the Isnad, anyone would say whatever they wished.' (Muqaddimah Sahih Muslim)"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              {isUrdu ? '۲. متن (کلامِ نبوی)' : '2. Matn (The Text)'}
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              {isUrdu ? 'حدیث کے اصل الفاظ اور معنی' : 'The Actual Prophetic Wording'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'متن وہ اصل کلام ہے جو رسول اللہ ﷺ کے ارشادات، عمل یا واقعے کو الفاظ میں بیان کرتا ہے۔'
                : 'The substance, moral instruction, or legal ruling spoken or demonstrated by the Prophet ﷺ without contradicting the Quran.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Hadith Classifications */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {isUrdu ? 'حدیث کی بنیادی درجات اور اقسام' : 'Core Classifications of Hadith Authenticity'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'محدثین نے روایات کو پرکھنے کے لیے چار بنیادی درجات میں تقسیم کیا:'
              : 'Scholars of Mustalah al-Hadith classify narrations based on verification rigor:'}
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {data.classifications.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTabClassification(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                activeTabClassification === idx
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.termAr}
            </button>
          ))}
        </div>

        {/* Active classification details */}
        {data.classifications[activeTabClassification] && (
          <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isUrdu
                    ? data.classifications[activeTabClassification].termUrdu
                    : data.classifications[activeTabClassification].termEn}
                </h3>
                <p className="text-xs text-emerald-700 font-medium">
                  {data.classifications[activeTabClassification].termAr}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p className="font-semibold text-slate-800">
                {isUrdu ? 'تعریف اور مفہوم:' : 'Definition & Requirements:'}
              </p>
              <p className="leading-relaxed">
                {isUrdu
                  ? data.classifications[activeTabClassification].meaningUrdu
                  : data.classifications[activeTabClassification].meaningEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{isUrdu ? 'شرعی حکم: ' : 'Legal Application: '}</span>
              {data.classifications[activeTabClassification].criterion}
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Kutub al-Sittah (The Six Books) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'صحاحِ ستہ: حدیث کے ۶ مستند مجموعے' : 'Kutub al-Sittah: The Six Major Compilations'}</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.majorCompilations.map((book, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-xs hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {isUrdu ? book.titleUrdu : book.titleEn}
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">{book.compiler}</p>
                </div>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {book.era}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? book.significanceUrdu : book.significanceEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Ethics & Verification Rules */}
      <section className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-emerald-700" />
          <span>{isUrdu ? 'حدیث کو سمجھنے اور شیئر کرنے کے سنہری اصول' : 'Practical Ethics: Sharing & Interpreting Hadith'}</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.verificationEthics.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs space-y-1.5">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isUrdu ? item.ruleUrdu : item.ruleEn}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">
                {isUrdu ? item.explanationUrdu : item.explanationEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: FAQs Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'اکثر پوچھے جانے والے سوالات (FAQs)' : 'Frequently Asked Questions about Hadith'}</span>
        </h2>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">
                    {isUrdu ? faq.questionUrdu : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>{isUrdu ? faq.answerUrdu : faq.answerEn}</p>
                    <p className="text-[11px] text-emerald-700 font-mono font-medium pt-1">
                      {isUrdu ? 'حوالہ: ' : 'Reference: '}
                      {faq.reference}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Interactive Links */}
      <section className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">
              {isUrdu ? 'روزانہ کی صحیح حدیث مبارکہ پڑھیں' : 'Read Today\'s Authentic Daily Hadith'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isUrdu
                ? 'بخاری و مسلم سے روزانہ کی صحیح احادیث اور ان سے حاصل ہونے والے اسباق حاصل کریں۔'
                : 'Explore daily authentic narrations with translations, narrator details, and practical lessons.'}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('daily-hadith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <span>{isUrdu ? 'روزانہ کی حدیث کھولیں' : 'Open Daily Hadith'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          {data.relatedLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(link.tab as AppTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
            >
              {isUrdu ? link.titleUrdu : link.titleEn}
            </button>
          ))}
        </div>
      </section>

      {/* Cross-linking to related guides */}
      <RelatedIslamicLearning currentTab="daily-hadith" />
    </article>
  );
};

export default HadithLearningGuide;

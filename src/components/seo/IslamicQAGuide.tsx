import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { ISLAMIC_QA_GUIDE_DATA } from '../../data/guide/qa-guide-data';
import {
  HelpCircle,
  BookOpen,
  Search,
  Scale,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const IslamicQAGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ISLAMIC_QA_GUIDE_DATA;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(data.questions[0]?.id || null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleQuestion = (id: string) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqIndex((prev) => (prev === idx ? null : idx));
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
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const filteredQuestions = data.questions.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.categoryEn === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      q.questionEn.toLowerCase().includes(query) ||
      q.questionUrdu.toLowerCase().includes(query) ||
      q.answerShortEn.toLowerCase().includes(query) ||
      q.answerShortUrdu.toLowerCase().includes(query) ||
      q.detailedExplanationEn.toLowerCase().includes(query) ||
      q.detailedExplanationUrdu.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const seoTitle = isUrdu ? data.seoTitleUrdu : data.seoTitleEn;
  const seoDescription = isUrdu ? data.seoDescUrdu : data.seoDescEn;

  const faqsForSchema = [
    ...data.questions.slice(0, 5).map((q) => ({
      question: isUrdu ? q.questionUrdu : q.questionEn,
      answer: isUrdu ? `${q.answerShortUrdu} (دلیل: ${q.primaryProofRef})` : `${q.answerShortEn} (Proof: ${q.primaryProofRef})`,
    })),
    ...data.faqs.map((f) => ({
      question: isUrdu ? f.questionUrdu : f.questionEn,
      answer: isUrdu ? f.answerUrdu : f.answerEn,
    }))
  ];

  const breadcrumbs = [
    { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
    { name: isUrdu ? 'سوال و جواب' : 'Islamic Q&A', url: data.canonicalPath }
  ];

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
          datePublished: '2026-09-15',
          dateModified: '2026-09-24'
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-teal-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs sm:text-sm font-semibold border border-teal-400/20">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share Q&A guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Quran Ayah Banner */}
        <div className="bg-teal-900/60 border border-teal-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-teal-300 text-xs font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'اہل علم سے سوال کرنے کا قرآنی حکم' : 'Divine Command to Consult Scholars'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            {data.foundationalAyahArabic}
          </p>
          <p className="text-xs sm:text-sm text-teal-100">
            {isUrdu ? data.foundationalAyahUrdu : data.foundationalAyahEn}
          </p>
          <span className="inline-block text-[11px] text-teal-300/80 font-mono">
            {data.foundationalAyahRef}
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'مسئلہ یا سوال تلاش کریں (مثلاً: سجدہ سہو، خون، انہیلر)...' : 'Search questions (e.g. Sujud Sahw, inhaler, blood, zakat)...'}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-teal-500/40 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:border-teal-400"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-xl transition-colors"
            >
              {isUrdu ? 'ختم کریں' : 'Clear'}
            </button>
          )}
        </div>
      </header>

      {/* Scholarly Ethics & Differences Banner */}
      <section className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-blue-900 leading-relaxed">
          <h2 className="font-bold text-sm sm:text-base text-blue-950">
            {isUrdu ? 'فقہی آداب اور مذاہبِ اربعہ کے معتبر اختلافات' : 'Scholarly Ethics: Navigating Juristic Divergence (Ikhtilaf)'}
          </h2>
          <p>
            {isUrdu ? data.scholarlyDifferencesGuidelineUrdu : data.scholarlyDifferencesGuidelineEn}
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <nav className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-wrap gap-2" aria-label="Question categories">
        {data.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isUrdu ? cat.nameUrdu : cat.nameEn}
          </button>
        ))}
      </nav>

      {/* Questions Accordion List */}
      <section className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-bold text-slate-700 text-sm sm:text-base">
              {isUrdu ? 'کوئی سوال نہیں ملا۔' : 'No matching questions found.'}
            </p>
            <p className="text-xs text-slate-500">
              {isUrdu ? 'براہ کرم کوئی دوسرا لفظ تلاش کریں یا زمرہ تبدیل کریں۔' : 'Try searching another keyword or switch category filter.'}
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;
            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200 hover:border-teal-300"
              >
                <button
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full text-left p-5 sm:p-6 bg-white hover:bg-slate-50/80 flex items-start justify-between gap-4 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-900 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-wider text-teal-700 uppercase block">
                        {isUrdu ? q.categoryUrdu : q.categoryEn}
                      </span>
                      <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                        {isUrdu ? q.questionUrdu : q.questionEn}
                      </h2>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 space-y-5 border-t border-slate-100 pt-4">
                    {/* Concise Ruling Box */}
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-1">
                      <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>{isUrdu ? 'خلاصہ حکم:' : 'Concise Ruling:'}</span>
                      </span>
                      <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                        {isUrdu ? q.answerShortUrdu : q.answerShortEn}
                      </p>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {isUrdu ? 'تفصیلی شرعی وضاحت:' : 'Detailed Scholarly Analysis:'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {isUrdu ? q.detailedExplanationUrdu : q.detailedExplanationEn}
                      </p>
                    </div>

                    {/* Primary Proof Text */}
                    {q.primaryProofArabic && (
                      <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl p-4 space-y-2">
                        <span className="text-[11px] font-bold text-amber-900 block">
                          {isUrdu ? 'اصل شرعی دلیل (قرآن / حدیث):' : 'Primary Textual Proof:'}
                        </span>
                        <p className="text-right text-base sm:text-lg font-arabic text-amber-950 leading-relaxed font-semibold" dir="rtl">
                          {q.primaryProofArabic}
                        </p>
                        <p className="text-xs sm:text-sm text-amber-900">
                          {isUrdu ? q.primaryProofUrdu : q.primaryProofEn}
                        </p>
                        <span className="text-[11px] text-amber-800 font-mono block">
                          {q.primaryProofRef}
                        </span>
                      </div>
                    )}

                    {/* Scholarly Views & Differences if applicable */}
                    {(q.scholarlyViewsEn || q.scholarlyViewsUrdu) && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs sm:text-sm text-slate-800">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Scale className="w-4 h-4 text-slate-600" />
                          <span>{isUrdu ? 'مذاہبِ فقہاء کی آراء:' : 'Schools of Jurisprudence (Madhahib):'}</span>
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {isUrdu ? q.scholarlyViewsUrdu : q.scholarlyViewsEn}
                        </p>
                      </div>
                    )}

                    {/* Practical Takeaway */}
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-medium border border-emerald-200/60">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">{isUrdu ? 'عملی نصیحت: ' : 'Practical Guidance: '}</strong>
                        <span>{isUrdu ? q.practicalTakeawayUrdu : q.practicalTakeawayEn}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* General Methodology FAQs */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'اصولِ فتویٰ اور دینی سوالات کے بنیادی اصول (FAQs)' : 'Jurisprudential Principles & Inquiry FAQs'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'دینی رہنمائی اور اختلافِ رائے کو سمجھنے کے سنہری اصول'
              : 'Principles for approaching legal rulings and scholarly differences with balance'}
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
                    <ChevronUp className="w-5 h-5 text-teal-600 shrink-0" />
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
                      <span className="text-[11px] text-teal-700 font-mono block">
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

      {/* Internal Curated Links */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
          {isUrdu ? 'مزید دینی رہنمائی حاصل کریں' : 'Deepen Your Islamic Practice'}
        </h3>
        <p className="text-xs sm:text-sm text-teal-100/80">
          {isUrdu
            ? 'نماز، دعاؤں اور اسلامی معلومات کے جامع ابواب کا مطالعہ کریں:'
            : 'Explore complementary guides on prayer, supplications, and general knowledge:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {data.internalLinks.map((link, lIdx) => (
            <button
              key={lIdx}
              onClick={() => setActiveTab(link.tabId as AppTab)}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-teal-300 group-hover:text-teal-200">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-400">
                <span>{isUrdu ? 'مطالعہ کریں' : 'Open Guide'}</span>
                {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Cross Links */}
      <RelatedIslamicLearning currentTab="islamic-questions-answers" />
    </article>
  );
};

export default IslamicQAGuide;

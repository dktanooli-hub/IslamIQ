import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QA_DATABASE } from '../../data/verifiedContent';
import { VerifiedQA } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { HelpCircle, Search, ShieldCheck, Tag, ChevronDown, ChevronUp, Share2, BookOpen } from 'lucide-react';

export const IslamicQAHub: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(VERIFIED_QA_DATABASE[0]?.id || null);

  const categories = ['all', 'Aqeedah', 'Salah', 'Quran', 'Manners', 'Fasting', 'Family'];

  const filteredQA = VERIFIED_QA_DATABASE.filter((item: VerifiedQA) => {
    const matchesCat = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' ||
      item.questionUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answerUrdu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answerEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const seoTitle = isUrdu
    ? 'اسلامی سوال و جواب مستند حوالہ جات کے ساتھ • Islamic Questions & Answers | IslamIQ'
    : 'Islamic Questions and Answers – Authentic Q&A with References | IslamIQ';

  const seoDescription = isUrdu
    ? 'عقائد، نماز، قرآن و سنت اور روزمرہ اخلاقیات پر اسلامی سوال و جواب۔ قرآن و صحیح احادیث کے مستند حوالوں کے ساتھ۔'
    : 'Authentic Islamic questions and answers on Aqeedah, Salah, Fasting, Quran, and daily manners. Supported by verified references from the Quran and Sahih Sunnah.';

  const faqs = filteredQA.slice(0, 10).map((qa: VerifiedQA) => ({
    question: isUrdu ? qa.questionUrdu : qa.questionEn,
    answer: isUrdu ? `${qa.answerUrdu} (حوالہ: ${qa.reference})` : `${qa.answerEn} (Reference: ${qa.reference})`,
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/islamic-questions-answers"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Islamic Questions & Answers', url: '/islamic-questions-answers' }
        ]}
        faqs={faqs}
      />

      {/* Header */}
      <header className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مستند سوال و جواب ڈیٹا بیس' : 'Verified Islamic Knowledge Base'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'اسلامی سوالات و جوابات (Islamic Q&A)' : 'Islamic Questions and Answers with Verified References'}
          </h1>

          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {isUrdu
              ? 'روزمرہ عبادات، ایمان، نماز، قرآن فہمی اور اخلاقیات سے متعلق عام فہم اور مستند سوال و جواب۔ تمام جوابات قرآن و سنت کے حوالوں کے ساتھ درج ہیں۔'
              : 'Browse essential Islamic questions across major areas of faith, prayer, manners, and daily life. Verified references provided for authentic learning.'}
          </p>
        </div>
      </header>

      {/* Search & Category Filter */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'سوال یا موضوع تلاش کریں...' : 'Search questions by keyword...'}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? (isUrdu ? 'تمام موضوعات' : 'All Categories') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Q&A Accordion Items */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu
              ? `دستیاب سوالات و جوابات (${filteredQA.length})`
              : `Islamic Questions & Answers (${filteredQA.length})`}
          </span>
        </h2>

        <div className="space-y-3">
          {filteredQA.map((qa) => {
            const isExpanded = expandedId === qa.id;
            const question = isUrdu ? qa.questionUrdu : qa.questionEn;
            const answer = isUrdu ? qa.answerUrdu : qa.answerEn;

            return (
              <div
                key={qa.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(qa.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {qa.category}
                      </span>
                      {qa.reference && (
                        <span className="text-[11px] text-slate-400 font-medium">
                          {qa.reference}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 bg-slate-50/40">
                    <div className="p-4 rounded-xl bg-white border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                      <p className="font-medium">{answer}</p>
                      
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-800 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{isUrdu ? `مستند حوالہ: ${qa.reference}` : `Source: ${qa.reference}`}</span>
                        </span>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${question}\n\n${answer}\n\nحوالہ: ${qa.reference}\nhttps://learnislamiq.com`);
                            showToast('Copied question & answer! (کاپی ہو گیا)');
                          }}
                          className="hover:text-emerald-700 font-semibold flex items-center gap-1"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{isUrdu ? 'کاپی' : 'Share'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="islamic-questions-answers" />
    </article>
  );
};

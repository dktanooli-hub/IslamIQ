import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QUESTIONS } from '../../data/verifiedContent';
import { QuizQuestion } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Award, Sparkles, Filter, RefreshCw } from 'lucide-react';

export const IslamicQuizHub: React.FC = () => {
  const { contentLang, setActiveTab, userMode, setUserMode } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const adultQuestions = VERIFIED_QUESTIONS.filter((q: QuizQuestion) => !q.forKids);
  const categories = ['all', 'Pillars', 'Quran', 'Prophets', 'Salah', 'Seerah', 'Duas'];

  const filteredQuestions = selectedCategory === 'all'
    ? adultQuestions
    : adultQuestions.filter((q: QuizQuestion) => q.category.toLowerCase() === selectedCategory.toLowerCase());

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const seoTitle = isUrdu
    ? 'اسلامی کوئز سوالات و جوابات • Islamic Quiz Online | IslamIQ'
    : 'Islamic Quiz – Test Your Islamic Knowledge Online | IslamIQ';

  const seoDescription = isUrdu
    ? 'آن لائن مستند اسلامی کوئز سوالات و جوابات۔ ارکانِ اسلام، قرآن مجید، انبیاء کرام اور سیرت النبیﷺ پر مبنی سوالات کے ساتھ اپنا دینی علم آزمائیں۔'
    : 'Test your Islamic knowledge with authentic multiple choice quiz questions on Quran, Pillars of Islam, Prophets, Salah, and Seerah with verified references.';

  const faqs = filteredQuestions.slice(0, 5).map((q) => ({
    question: isUrdu ? q.questionUrdu : q.questionEn,
    answer: isUrdu
      ? `درست جواب: ${q.optionsUrdu[q.correctIndex]}۔ تفصیل: ${q.explanationUrdu}`
      : `Correct answer: ${q.optionsEn[q.correctIndex]}. Explanation: ${q.explanationEn}`,
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/islamic-quiz"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Islamic Quiz', url: '/islamic-quiz' }
        ]}
        faqs={faqs}
      />

      {/* Hero Banner */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مستند اسلامی امتحانات' : 'Authentic Islamic Knowledge Hub'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'اسلامی کوئز (Islamic Quiz Online)' : 'Islamic Quiz – Test Your Islamic Knowledge'}
          </h1>

          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {isUrdu
              ? 'ارکانِ اسلام، قرآنِ کریم، انبیاء علیہم السلام، سیرتِ طیبہ اور احادیثِ نبویہ پر مبنی مستند سوالات کے ذریعے اپنا دینی فہم بڑھائیں۔ ہر سوال کا حوالہ اور تشریح ساتھ دی گئی ہے۔'
              : 'Explore verified multiple choice Islamic questions with authentic Quran and Sahih Hadith explanations. Practice directly online or launch the interactive gamified quiz mode.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (userMode !== 'adult') setUserMode('adult');
                setActiveTab('quiz');
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isUrdu ? 'انٹرایکٹو کوئز موڈ شروع کریں' : 'Launch Interactive Quiz Mode'}</span>
            </button>
            <button
              onClick={() => {
                setUserMode('kids');
                setActiveTab('kids-islamic-quiz');
              }}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold text-xs rounded-xl transition-all border border-emerald-400/20"
            >
              {isUrdu ? 'بچوں کا اسلامی کوئز دیکھیں' : 'Looking for Kids Quiz?'}
            </button>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'موضوع کے لحاظ سے فلٹر کریں:' : 'Filter by Category:'}</span>
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
              {cat === 'all' ? (isUrdu ? 'تمام سوالات' : 'All Questions') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Questions List */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu
              ? `منتخب اسلامی سوالات و جوابات (${filteredQuestions.length})`
              : `Curated Islamic Quiz Questions (${filteredQuestions.length})`}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {filteredQuestions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];
            const options = isUrdu ? q.optionsUrdu : q.optionsEn;
            const questionText = isUrdu ? q.questionUrdu : q.questionEn;
            const explanation = isUrdu ? q.explanationUrdu : q.explanationEn;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {q.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 capitalize">
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {questionText}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                          isRevealed
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                              : 'bg-slate-50/50 border-slate-200 text-slate-500'
                            : 'bg-slate-50 border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-[10px] font-bold flex items-center justify-center text-slate-600">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Answer reveal toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>{isRevealed ? (isUrdu ? 'جواب چھپائیں' : 'Hide Answer') : (isUrdu ? 'جواب اور حوالہ دیکھیں' : 'Show Answer & Reference')}</span>
                  </button>
                </div>

                {/* Detailed Explanation */}
                {isRevealed && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-950 space-y-1 animate-fadeIn">
                    <p className="font-bold flex items-center gap-1 text-emerald-900">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{isUrdu ? 'مستند تشریح اور حوالہ:' : 'Explanation & Reference:'}</span>
                    </p>
                    <p className="leading-relaxed text-emerald-900/90">{explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Educational Notice */}
      <aside className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1">
        <p className="font-bold">{isUrdu ? 'علمی وضاحت:' : 'Scholarly Verification Notice:'}</p>
        <p className="leading-relaxed">
          {isUrdu
            ? 'تمام سوالات قرآن مجید، احادیثِ صحیحہ اور معروف اسلامی کتب سے اخذ کیے گئے ہیں۔ دینی فتاویٰ کے لیے ہمیشہ مستند مفتیانِ کرام سے رجوع فرمائیں۔'
            : 'All quiz items are derived from canonical Quranic verses and Sahih hadiths. For personal fatwas, consult qualified Islamic scholars.'}
        </p>
      </aside>

      {/* Internal Linking Component */}
      <RelatedIslamicLearning currentTab="islamic-quiz" />
    </article>
  );
};

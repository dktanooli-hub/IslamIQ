import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QUESTIONS } from '../../data/verifiedContent';
import { QuizQuestion } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Sparkles, CheckCircle2, Award, Lightbulb, Star, Heart, ArrowRight } from 'lucide-react';

export const KidsIslamicQuizHub: React.FC = () => {
  const { contentLang, setActiveTab, setUserMode } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const kidsQuestions = VERIFIED_QUESTIONS.filter((q: QuizQuestion) => q.forKids);

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const seoTitle = isUrdu
    ? 'بچوں کے اسلامی سوالات و جوابات • Kids Islamic Quiz | IslamIQ'
    : 'Islamic Quiz for Kids – Fun Islamic Questions & Answers | IslamIQ';

  const seoDescription = isUrdu
    ? 'بچوں کے لیے آسان اور دلچسپ اسلامی سوالات اور کہانیاں۔ ارکانِ اسلام، حضرت محمدﷺ اور اخلاقی آداب پر مبنی اسلامی کوئز۔'
    : 'Fun, engaging and educational Islamic quiz for Muslim children. Learn about Allah, Prophet Muhammad (PBUH), 5 Pillars of Islam, and good manners with hints and explanations.';

  const faqs = kidsQuestions.slice(0, 5).map((q) => ({
    question: isUrdu ? q.questionUrdu : q.questionEn,
    answer: isUrdu
      ? `درست جواب: ${q.optionsUrdu[q.correctIndex]}۔ وضاحت: ${q.explanationUrdu}`
      : `Correct answer: ${q.optionsEn[q.correctIndex]}. Explanation: ${q.explanationEn}`,
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/kids-islamic-quiz"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Islamic Quiz', url: '/islamic-quiz' },
          { name: 'Kids Islamic Quiz', url: '/kids-islamic-quiz' }
        ]}
        faqs={faqs}
      />

      {/* Playful Hero Banner */}
      <header className="bg-gradient-to-br from-amber-400 via-teal-500 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{isUrdu ? 'ننھے مسلمانوں کے لیے آسان سیکھنا' : 'Little Muslim Learners'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            {isUrdu ? 'بچوں کا اسلامی کوئز (Kids Islamic Quiz)' : 'Islamic Quiz for Kids – Fun & Friendly Questions'}
          </h1>

          <p className="text-teal-50 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            {isUrdu
              ? 'پیارے بچوں کے لیے اللہ تعالیٰ، ہمارے پیارے نبی حضرت محمدﷺ، نماز، روزے اور اچھے اخلاق کے متعلق پیارے پیارے سوالات اور انعامات۔'
              : 'Designed with friendly language, encouraging hints, and verified teachings of Islam to inspire a lifelong love for Deen in young hearts.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setUserMode('kids');
                setActiveTab('quiz');
              }}
              className="px-4 py-2.5 bg-white text-teal-900 hover:bg-amber-100 font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isUrdu ? 'بچوں کا کوئز گیم کھیلیں' : 'Play Kids Quiz Game'}</span>
            </button>
            <button
              onClick={() => {
                setUserMode('kids');
                setActiveTab('home');
              }}
              className="px-3.5 py-2 bg-teal-900/30 hover:bg-teal-900/50 text-white font-bold text-xs rounded-xl transition-all border border-white/20"
            >
              {isUrdu ? 'کڈز ہوم دیکھیں' : 'Visit Kids Wonderland'}
            </button>
          </div>
        </div>
      </header>

      {/* Kids Questions List */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-teal-950 flex items-center gap-2">
          <Heart className="w-5 h-5 text-amber-500 fill-current" />
          <span>
            {isUrdu
              ? `بچوں کے خصوصی سوالات (${kidsQuestions.length})`
              : `Fun Questions for Kids (${kidsQuestions.length})`}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {kidsQuestions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];
            const options = isUrdu ? q.optionsUrdu : q.optionsEn;
            const questionText = isUrdu ? q.questionUrdu : q.questionEn;
            const hint = isUrdu ? q.kidsHintUrdu : q.kidsHintEn;
            const explanation = isUrdu ? q.explanationUrdu : q.explanationEn;

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-5 border-2 border-amber-200/90 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-2xl bg-amber-400 text-teal-950 font-black text-xs flex items-center justify-center shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                      {q.category}
                    </span>
                  </div>
                  {hint && (
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg flex items-center gap-1 border border-amber-200">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      <span>{isUrdu ? 'اشارہ موجود ہے' : 'Hint'}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                  {questionText}
                </h3>

                {/* Hint Card */}
                {hint && !isRevealed && (
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>{isUrdu ? 'مددگار اشارہ:' : 'Kid Hint:'}</strong> {hint}</span>
                  </div>
                )}

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between transition-all ${
                          isRevealed
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-[1.01]'
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-80'
                            : 'bg-amber-50/50 border-amber-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-xl bg-white border border-amber-300 text-[11px] font-black flex items-center justify-center text-teal-900">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="text-xs font-extrabold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    {isRevealed ? (isUrdu ? 'جواب چھپائیں' : 'Hide Answer') : (isUrdu ? 'درست جواب دیکھیں' : 'See Correct Answer')}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-950 space-y-1 animate-fadeIn">
                    <p className="font-extrabold text-teal-900">
                      {isUrdu ? 'تفصیل و سبق:' : 'Child Lesson:'}
                    </p>
                    <p className="leading-relaxed">{explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="kids-islamic-quiz" />
    </article>
  );
};

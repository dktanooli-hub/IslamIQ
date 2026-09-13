import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { VERIFIED_QUESTIONS } from '../data/verifiedContent';
import { QuizQuestion, QuizDifficulty, QuizCategory } from '../types';
import { Volume2, VolumeX, CheckCircle, XCircle, Award, Sparkles, RefreshCw, HelpCircle, ArrowRight, BookOpen, Filter, Zap } from 'lucide-react';
import { sounds, SpeechEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import { AnimatedKidsQuizView } from './kids/AnimatedKidsQuizView';
import { KidsCharacter } from './kids/KidsCharacter';
import { AdBanner } from './AdBanner';
import { AD_CONFIG } from '../config/adConfig';

export const QuizSection: React.FC = () => {
  const {
    userMode,
    contentLang,
    recordQuizCompleted,
    showToast,
    isSpeaking,
    setIsSpeaking,
    recentQuestionIds,
    markQuestionsAsUsed,
    questions: contextQuestions
  } = useApp();

  const isKids = userMode === 'kids';

  // Quiz filters & state
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>('beginner');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | 'all'>('all');
  const [isDailyChallenge, setIsDailyChallenge] = useState<boolean>(false);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ question: QuizQuestion; selected: number; isCorrect: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [autoSpeakKids, setAutoSpeakKids] = useState<boolean>(isKids);
  const [speakingStep, setSpeakingStep] = useState<number | null>(null);

  // Fisher-Yates non-repeating algorithm with recent history tracking & dynamic DB
  const startQuiz = useCallback((
    difficulty: QuizDifficulty = selectedDifficulty,
    isDaily: boolean = false,
    category: QuizCategory | 'all' = selectedCategory
  ) => {
    SpeechEngine.stop();
    setIsSpeaking(false);
    setSpeakingStep(null);
    setSelectedDifficulty(difficulty);
    setIsDailyChallenge(isDaily);
    setSelectedCategory(category);

    const questionPoolSource = contextQuestions && contextQuestions.length > 0
      ? contextQuestions
      : VERIFIED_QUESTIONS;

    // 1. Filter by active status and mode (Kids vs Adult)
    let pool = questionPoolSource.filter(q => {
      if (q.isActive === false) return false;
      if (isKids) return q.forKids;
      return !q.forKids;
    });

    // 2. Filter by difficulty if not daily challenge
    if (!isKids && !isDaily) {
      const diffPool = pool.filter(q => q.difficulty === difficulty);
      if (diffPool.length >= 3) {
        pool = diffPool;
      }
    }

    // 3. Filter by category if specific category chosen
    if (category !== 'all') {
      const catPool = pool.filter(q => q.category === category);
      if (catPool.length >= 3) {
        pool = catPool;
      }
    }

    if (pool.length === 0) {
      pool = questionPoolSource.filter(q => q.isActive !== false && (isKids ? q.forKids : !q.forKids));
    }
    if (pool.length === 0) {
      pool = questionPoolSource.filter(q => q.isActive !== false);
    }

    // 4. Exclude recently seen question IDs to prevent repetition
    const freshQuestions = pool.filter(q => !recentQuestionIds.includes(q.id));
    const candidatePool = freshQuestions.length >= 5 ? freshQuestions : pool;

    // 5. Shuffle candidate pool without any duplicates (Fisher-Yates)
    const shuffled = [...candidatePool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Pick 5 unique questions
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));

    // Register these IDs as recently used
    markQuestionsAsUsed(selected.map(q => q.id));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setUserAnswers([]);
    setQuizFinished(false);
  }, [contextQuestions, isKids, selectedDifficulty, selectedCategory, recentQuestionIds, markQuestionsAsUsed, setIsSpeaking]);

  // Restart on mode change
  useEffect(() => {
    startQuiz(isKids ? 'beginner' : 'beginner', false, 'all');
  }, [userMode]);

  const currentQ = activeQuestions[currentIndex];

  // Auto-speak question for Kids Mode
  useEffect(() => {
    if (isKids && autoSpeakKids && currentQ && !hasSubmitted && !quizFinished) {
      const qText = contentLang === 'urdu' ? currentQ.questionUrdu : currentQ.questionEn;
      const opts = contentLang === 'urdu' ? currentQ.optionsUrdu : currentQ.optionsEn;
      SpeechEngine.speakQuizQuestion(
        qText,
        opts,
        contentLang,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setSpeakingStep(null);
        },
        (step) => setSpeakingStep(step)
      );
    }
    return () => {
      SpeechEngine.stop();
      setIsSpeaking(false);
      setSpeakingStep(null);
    };
  }, [currentIndex, isKids, autoSpeakKids, contentLang, currentQ, hasSubmitted, quizFinished, setIsSpeaking]);

  const handleSpeakToggle = () => {
    if (!currentQ) return;
    if (isSpeaking) {
      SpeechEngine.stop();
      setIsSpeaking(false);
      setSpeakingStep(null);
    } else {
      const qText = contentLang === 'urdu' ? currentQ.questionUrdu : currentQ.questionEn;
      const opts = contentLang === 'urdu' ? currentQ.optionsUrdu : currentQ.optionsEn;
      SpeechEngine.speakQuizQuestion(
        qText,
        opts,
        contentLang,
        () => setIsSpeaking(true),
        () => {
          setIsSpeaking(false);
          setSpeakingStep(null);
        },
        (step) => setSpeakingStep(step)
      );
    }
  };

  const processAnswerSubmission = (idx: number) => {
    if (!currentQ || hasSubmitted) return;
    SpeechEngine.stop();
    setIsSpeaking(false);
    setSpeakingStep(null);

    const isCorrect = idx === currentQ.correctIndex;
    setSelectedOption(idx);
    setHasSubmitted(true);

    if (isCorrect) {
      if (isKids) {
        sounds.playKidsCheerful();
      } else {
        sounds.playCorrect();
      }
      setScore(prev => prev + 1);
    } else {
      sounds.playIncorrect();
    }

    // Friendly spoken feedback after answer (Urdu or English)
    SpeechEngine.speakFeedback(isCorrect, contentLang);

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQ,
        selected: idx,
        isCorrect
      }
    ]);
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    if (isKids) {
      // Direct friendly evaluation for Kids
      processAnswerSubmission(idx);
    } else {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ || hasSubmitted) return;
    processAnswerSubmission(selectedOption);
  };

  const handleNextQuestion = () => {
    SpeechEngine.stop();
    setIsSpeaking(false);
    setSpeakingStep(null);
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      // Finished
      setQuizFinished(true);
      recordQuizCompleted(
        score,
        activeQuestions.length,
        selectedDifficulty,
        selectedCategory === 'all' ? 'Mixed Topics' : selectedCategory
      );

      if (score >= Math.ceil(activeQuestions.length * 0.7)) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto pb-12">
      
      {/* Quiz Header & Filters */}
      <div className={`p-5 rounded-3xl transition-all ${
        isKids
          ? 'bg-amber-100/90 border-2 border-amber-300 text-teal-950 shadow-sm'
          : 'bg-white border border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${isKids ? 'text-teal-900' : 'text-slate-900'}`}>
                {isKids ? 'بچوں کا اسلامی کوئز 🎈 Kids Islamic Quiz' : 'Islamic Knowledge Quiz'}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isKids ? 'bg-amber-300 text-amber-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isDailyChallenge ? 'Daily Challenge 🌟' : `${selectedDifficulty.toUpperCase()}`}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isKids
                ? 'سوالات اور تمام آپشنز سنیں، صحیح جواب چنیں اور پیارے تمغے جیتیں!'
                : 'Test and expand your understanding of Quran, Sunnah, and Islamic heritage.'}
            </p>
          </div>

          {/* Difficulty & Voice Switchers */}
          {!isKids ? (
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              {(['beginner', 'intermediate', 'advanced'] as QuizDifficulty[]).map(diff => (
                <button
                  key={diff}
                  onClick={() => startQuiz(diff, false, selectedCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                    selectedDifficulty === diff && !isDailyChallenge
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              ))}
              <button
                onClick={() => startQuiz('intermediate', true, 'all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  isDailyChallenge
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-amber-700 hover:bg-amber-50'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Daily</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Kids Level Switcher */}
              <div className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-amber-300/80 shadow-2xs">
                {([
                  { id: 'beginner' as QuizDifficulty, urdu: 'آسان ⭐', en: 'Easy ⭐' },
                  { id: 'intermediate' as QuizDifficulty, urdu: 'درمیانہ 🌟', en: 'Medium 🌟' },
                  { id: 'advanced' as QuizDifficulty, urdu: 'ہوشیار 🏆', en: 'Hard 🏆' }
                ]).map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => startQuiz(lvl.id, false, 'all')}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all active:scale-95 ${
                      selectedDifficulty === lvl.id
                        ? 'bg-amber-400 text-amber-950 shadow-xs scale-102'
                        : 'text-teal-900 hover:bg-amber-100'
                    }`}
                  >
                    {contentLang === 'urdu' ? lvl.urdu : lvl.en}
                  </button>
                ))}
              </div>

              {/* Kids Voice Toggle */}
              <button
                onClick={() => setAutoSpeakKids(!autoSpeakKids)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 border transition-all active:scale-95 shadow-2xs ${
                  autoSpeakKids
                    ? 'bg-teal-600 text-white border-teal-700'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
                title="Toggle automatic voice read-out for questions"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Voice: {autoSpeakKids ? 'ON' : 'OFF'}</span>
              </button>

              {/* Fresh Quiz Regenerate Button */}
              <button
                onClick={() => startQuiz(selectedDifficulty, false, 'all')}
                className="p-1.5 rounded-xl bg-amber-300 text-amber-950 hover:bg-amber-400 active:scale-95 transition-all shadow-2xs"
                title="Next Fresh Quiz (نیا کوئز)"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Category selector row for Adult mode */}
        {!isKids && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 text-xs no-scrollbar border-t border-slate-100 pt-2.5">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Topic:
            </span>
            {(['all', 'Quran', 'Salah', 'Prophets', 'Pillars', 'Seerah'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => startQuiz(selectedDifficulty, isDailyChallenge, cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {!quizFinished && activeQuestions.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
              <span className="font-semibold text-emerald-700">Score: {score}/{currentIndex + (hasSubmitted ? 1 : 0)}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isKids ? 'bg-teal-500' : 'bg-emerald-600'
                }`}
                style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* QUIZ FINISHED SUMMARY SCREEN */}
      {quizFinished ? (
        <div className={`p-6 sm:p-8 rounded-3xl text-center space-y-5 transition-all ${
          isKids
            ? 'bg-gradient-to-b from-amber-50 to-teal-50 border-2 border-teal-300 shadow-lg'
            : 'bg-white border border-slate-200 shadow-lg'
        }`}>
          {isKids ? (
            <div className="flex justify-center mb-2">
              <KidsCharacter
                type="zayd"
                mood={score >= 3 ? 'celebrating' : 'reacting'}
                contentLang={contentLang}
                size="md"
              />
            </div>
          ) : (
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-md ${
              score >= 4 ? 'bg-amber-100 text-amber-600 animate-bounce' : 'bg-emerald-100 text-emerald-700'
            }`}>
              <Award className="w-10 h-10" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {score === activeQuestions.length
                ? (isKids ? 'شاباش! کمال کر دیا! 🌟 Perfect Score!' : 'MashaAllah! Outstanding!')
                : score >= 3
                ? (isKids ? 'بہت اچھے! Very Good!' : 'Well Done!')
                : 'Good Effort! Keep Learning!'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              You answered <span className="font-bold text-slate-900">{score}</span> out of{' '}
              <span className="font-bold text-slate-900">{activeQuestions.length}</span> questions correctly.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-6 py-4 border-y border-slate-100">
            <div>
              <div className="text-2xl font-black text-emerald-700">+{score * 20}</div>
              <div className="text-xs text-slate-500 font-semibold">XP Earned</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-2xl font-black text-amber-600">{Math.round((score / activeQuestions.length) * 100)}%</div>
              <div className="text-xs text-slate-500 font-semibold">Accuracy</div>
            </div>
          </div>

          {/* Action Buttons: Next Quiz produces completely fresh question set */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(selectedDifficulty, isDailyChallenge, selectedCategory)}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 ${
                isKids
                  ? 'bg-teal-600 hover:bg-teal-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Quiz • New Questions (اگلا نیا کوئز)</span>
            </button>
          </div>

          {/* High Conversion Google Ad Placement after Quiz Completion */}
          {!isKids && (
            <AdBanner
              slotId={AD_CONFIG.SLOTS.QUIZ_COMPLETION}
              labelUrdu="اشتہار (Google Ad)"
              labelEn="Google Sponsored Ad"
              className="my-4"
            />
          )}

          {/* Review Answers section */}
          <div className="text-left mt-6 pt-5 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Review Questions & Authenticity:</span>
            </h3>
            <div className="space-y-3">
              {userAnswers.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    item.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-bold text-slate-800">
                      {idx + 1}. {contentLang === 'urdu' ? item.question.questionUrdu : item.question.questionEn}
                    </span>
                    {item.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-slate-600 mt-1">
                    <strong className="text-slate-700">Correct: </strong>
                    {contentLang === 'urdu'
                      ? item.question.optionsUrdu[item.question.correctIndex]
                      : item.question.optionsEn[item.question.correctIndex]}
                  </p>
                  <p className="text-slate-500 mt-1 italic">
                    {contentLang === 'urdu' ? item.question.explanationUrdu : item.question.explanationEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : currentQ ? (
        /* ACTIVE QUIZ QUESTION CONTAINER */
        isKids ? (
          /* ANIMATED KIDS QUIZ INTERFACE */
          <AnimatedKidsQuizView
            currentQ={currentQ}
            currentIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            score={score}
            contentLang={contentLang}
            selectedOption={selectedOption}
            hasSubmitted={hasSubmitted}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            autoSpeak={autoSpeakKids}
            onToggleAutoSpeak={() => setAutoSpeakKids(!autoSpeakKids)}
            speakingStep={speakingStep}
            isSpeaking={isSpeaking}
            onSpeakToggle={handleSpeakToggle}
          />
        ) : (
          /* ADULT MODE: SOPHISTICATED M3 CARD */
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 transition-all">
            
            {/* Question Top Meta */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {currentQ.category}
              </span>

              {/* Read Aloud Audio Speaker Button */}
              <button
                onClick={handleSpeakToggle}
                className={`p-2.5 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 ${
                  isSpeaking
                    ? 'bg-amber-400 text-amber-950 animate-pulse'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
                title="Speak Question & Options Aloud (سوال اور تمام جوابات سنیں)"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeaking ? 'Listening...' : 'Listen Question'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className={`mb-6 p-4 rounded-2xl transition-all ${
              speakingStep === 0 ? 'bg-amber-50/90 border border-amber-300 ring-2 ring-amber-400/40' : ''
            }`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                {speakingStep === 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full animate-pulse">
                    <Volume2 className="w-3 h-3" />
                    <span>{contentLang === 'urdu' ? 'سوال پڑھا جا رہا ہے...' : 'Reading question...'}</span>
                  </span>
                )}
              </div>
              {contentLang === 'urdu' ? (
                <h2 className="urdu-text text-xl sm:text-2xl text-slate-900 leading-relaxed font-bold">
                  {currentQ.questionUrdu}
                </h2>
              ) : (
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {currentQ.questionEn}
                </h2>
              )}
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {(contentLang === 'urdu' ? currentQ.optionsUrdu : currentQ.optionsEn).map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectAnswer = idx === currentQ.correctIndex;
                const isOptionBeingSpoken = speakingStep === idx + 1;
                
                let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';
                if (isSelected && !hasSubmitted) {
                  style = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/40';
                } else if (hasSubmitted) {
                  if (isCorrectAnswer) {
                    style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500';
                  } else if (isSelected && !isCorrectAnswer) {
                    style = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold';
                  } else {
                    style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isOptionBeingSpoken) {
                  style = 'bg-amber-100/80 border-amber-400 text-amber-950 font-semibold ring-2 ring-amber-400/70 scale-[1.01]';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasSubmitted}
                    className={`w-full p-4 rounded-2xl border text-left transition-all active:scale-[0.98] flex items-center justify-between ${style}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-white text-slate-900 shadow-xs' : (isOptionBeingSpoken ? 'bg-amber-300 text-amber-950' : 'bg-slate-200 text-slate-700')
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`text-sm sm:text-base ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
                        {opt}
                      </span>
                    </div>

                    {isOptionBeingSpoken && !hasSubmitted && (
                      <Volume2 className="w-4 h-4 text-amber-600 animate-pulse shrink-0 ml-2" />
                    )}

                    {hasSubmitted && isCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {hasSubmitted && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box (Revealed after submit) */}
            {hasSubmitted && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6 animate-fadeIn">
                <div className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{contentLang === 'urdu' ? 'تفصیل و حوالہ (Explanation):' : 'Authentic Explanation:'}</span>
                </div>
                <p className={`text-xs sm:text-sm text-slate-700 ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
                  {contentLang === 'urdu' ? currentQ.explanationUrdu : currentQ.explanationEn}
                </p>
              </div>
            )}

            {/* Bottom Action Button: Manual advancement */}
            <div className="flex items-center justify-end pt-2">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className={`w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                    selectedOption === null
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  Submit Answer (تصدیق کریں)
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  <span>{currentIndex + 1 === activeQuestions.length ? 'See Results 🏆' : 'Next Question (اگلا سوال)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )
      ) : null}

    </div>
  );
};

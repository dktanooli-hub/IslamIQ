import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, ArrowRight, RotateCcw, Check, X, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../../types';
import { KidsCharacter, KidsCharacterMood, KidsCharacterType } from './KidsCharacter';
import { KidsEnvironment, KidsEnvironmentType } from './KidsEnvironment';
import { SpeechEngine, sounds } from '../../utils/audio';

interface AnimatedKidsQuizViewProps {
  currentQ: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  contentLang: 'urdu' | 'english';
  selectedOption: number | null;
  hasSubmitted: boolean;
  onSelectOption: (idx: number) => void;
  onNextQuestion: () => void;
  autoSpeak: boolean;
  onToggleAutoSpeak: () => void;
  speakingStep: number | null;
  isSpeaking: boolean;
  onSpeakToggle: () => void;
}

export const AnimatedKidsQuizView: React.FC<AnimatedKidsQuizViewProps> = ({
  currentQ,
  currentIndex,
  totalQuestions,
  score,
  contentLang,
  selectedOption,
  hasSubmitted,
  onSelectOption,
  onNextQuestion,
  autoSpeak,
  onToggleAutoSpeak,
  speakingStep,
  isSpeaking,
  onSpeakToggle
}) => {
  const isUrdu = contentLang === 'urdu';

  // Kids Customization State
  const [characterType, setCharacterType] = useState<KidsCharacterType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('islamiq_kids_character');
      if (saved === 'zayd' || saved === 'maryam') return saved;
    }
    return 'zayd';
  });
  const [environment, setEnvironment] = useState<KidsEnvironmentType>('madrasa');
  const [characterMood, setCharacterMood] = useState<KidsCharacterMood>('intro');
  const [showHint, setShowHint] = useState(false);
  const isAnswerEvaluated = hasSubmitted;

  // Sound and voice playback lock
  const lastQIdRef = useRef<string | null>(null);

  // When question changes, trigger short friendly greeting/intro animation
  useEffect(() => {
    if (lastQIdRef.current !== currentQ.id) {
      lastQIdRef.current = currentQ.id;
      setShowHint(false);

      // Character starts with short cheerful intro/wave, then transitions to thinking/speaking
      setCharacterMood('intro');
      const timer = setTimeout(() => {
        if (!hasSubmitted) {
          setCharacterMood(isSpeaking ? 'speaking' : 'thinking');
        }
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [currentQ.id]);

  // Synchronize character mood with speech reading state
  useEffect(() => {
    if (hasSubmitted) return;
    if (isSpeaking) {
      setCharacterMood('speaking');
    } else {
      setCharacterMood('thinking');
    }
  }, [isSpeaking, hasSubmitted]);

  // Update mood when user submits answer
  useEffect(() => {
    if (hasSubmitted && selectedOption !== null) {
      const isCorrect = selectedOption === currentQ.correctIndex;
      if (isCorrect) {
        setCharacterMood('celebrating');
        // Confetti burst for kid celebration
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } else {
        setCharacterMood('reacting');
      }
    }
  }, [hasSubmitted, selectedOption, currentQ.correctIndex]);

  // Toggle character between Zayd and Maryam
  const handleToggleCharacter = () => {
    setCharacterType(prev => {
      const next = prev === 'zayd' ? 'maryam' : 'zayd';
      if (typeof window !== 'undefined') {
        localStorage.setItem('islamiq_kids_character', next);
      }
      return next;
    });
  };

  const currentOptions = isUrdu ? currentQ.optionsUrdu : currentQ.optionsEn;
  const currentQuestionText = isUrdu ? currentQ.questionUrdu : currentQ.questionEn;
  const currentHint = isUrdu ? currentQ.kidsHintUrdu : currentQ.kidsHintEn;
  const currentExplanation = isUrdu ? currentQ.explanationUrdu : currentQ.explanationEn;

  // Badges and icons for the 4 options
  const optionBadges = [
    { num: '۱', en: 'A', icon: '⭐', color: 'from-amber-400 to-amber-500' },
    { num: '۲', en: 'B', icon: '🌙', color: 'from-teal-400 to-teal-500' },
    { num: '۳', en: 'C', icon: '📖', color: 'from-sky-400 to-sky-500' },
    { num: '۴', en: 'D', icon: '🌺', color: 'from-rose-400 to-rose-500' }
  ];

  return (
    <div className="space-y-3 sm:space-y-4">

      {/* TOP KIDS HUD: SCORE, PROGRESS & CONTROLS */}
      <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-3 sm:p-4 border-2 border-amber-200/90 shadow-sm flex items-center justify-between gap-2">
        {/* Star Progress Counter */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md animate-kids-float text-amber-950 font-black text-lg">
            ⭐
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-black text-amber-900">
              <span>{isUrdu ? 'ستارے (Stars):' : 'Stars:'}</span>
              <span className="text-sm text-emerald-700 bg-amber-100 px-2 py-0.5 rounded-full font-black">
                {score} / {totalQuestions}
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              {isUrdu ? `سوال ${currentIndex + 1} از ${totalQuestions}` : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </div>
          </div>
        </div>

        {/* Action Controls: Voice Aloud, Auto-Speak & Hint */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Read aloud trigger */}
          <button
            onClick={onSpeakToggle}
            className={`p-2 sm:px-3 sm:py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-xs ${
              isSpeaking
                ? 'bg-amber-400 text-amber-950 animate-pulse border-2 border-amber-300'
                : 'bg-teal-100 text-teal-800 hover:bg-teal-200 border border-teal-200'
            }`}
            title="Listen to question and all options (سنیں)"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isSpeaking ? (isUrdu ? 'پڑھا جا رہا ہے...' : 'Reading...') : (isUrdu ? 'آواز سے سنیں' : 'Listen')}
            </span>
          </button>

          {/* Hint button */}
          {currentHint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className={`p-2 rounded-2xl text-xs font-black transition-all active:scale-95 border ${
                showHint
                  ? 'bg-amber-400 text-amber-950 border-amber-300'
                  : 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200'
              }`}
              title="Show Hint (اشارہ دیکھیں)"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar (Color coded beads) */}
      <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden p-0.5 shadow-inner">
        <div
          className="bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-xs"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* MAIN INTERACTIVE ISLAMIC LEARNING ENVIRONMENT CONTAINER */}
      <KidsEnvironment
        environment={environment}
        onSwitchEnvironment={setEnvironment}
        contentLang={contentLang}
      >
        <div className="space-y-4">
          
          {/* TOP STAGE: CHARACTER + ANIMATED QUESTION BLACKBOARD */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Cartoon Child Character (Zayd or Maryam) */}
            <div className="md:col-span-4 flex justify-center order-2 md:order-1 pt-2 md:pt-0">
              <KidsCharacter
                type={characterType}
                mood={characterMood}
                contentLang={contentLang}
                size="md"
                onClick={handleToggleCharacter}
              />
            </div>

            {/* Interactive Question Board (School Blackboard / Illuminated Arched Card) */}
            <div className={`md:col-span-8 order-1 md:order-2 rounded-3xl p-4 sm:p-6 transition-all duration-300 border-3 ${
              speakingStep === 0
                ? 'bg-amber-50/95 border-amber-400 ring-4 ring-amber-300/40 shadow-xl'
                : 'bg-white/95 border-amber-200/80 shadow-md'
            }`}>
              
              {/* Board Header Bar */}
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
                  <span>🕌</span>
                  <span>{currentQ.category}</span>
                </div>

                {speakingStep === 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded-full animate-pulse border border-amber-300">
                    <Volume2 className="w-3 h-3" />
                    <span>{isUrdu ? 'سوال پڑھا جا رہا ہے...' : 'Reading question...'}</span>
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="py-2">
                {isUrdu ? (
                  <h2 className="urdu-text text-xl sm:text-2xl text-slate-900 font-extrabold leading-loose text-right">
                    {currentQuestionText}
                  </h2>
                ) : (
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                    {currentQuestionText}
                  </h2>
                )}
              </div>

              {/* Revealable Hint Box */}
              {showHint && currentHint && (
                <div className="mt-2 p-2.5 rounded-2xl bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-bold animate-kids-pop flex items-center gap-2">
                  <span className="text-base">💡</span>
                  <span>{isUrdu ? `اشارہ: ${currentHint}` : `Hint: ${currentHint}`}</span>
                </div>
              )}

            </div>
          </div>

          {/* 4 DYNAMIC ANSWER OPTIONS (GRID) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {currentOptions.map((optText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === currentQ.correctIndex;
              const isBeingSpoken = speakingStep === idx + 1;
              const badge = optionBadges[idx];

              let cardStyle = 'bg-white/95 border-amber-200 hover:border-amber-300 hover:bg-white text-slate-800 shadow-xs hover:shadow-md';

              if (hasSubmitted) {
                if (isCorrectAnswer) {
                  // CORRECT ANSWER: Emerald Glow & Bounce
                  cardStyle = 'bg-emerald-100/95 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-400/60 shadow-lg scale-[1.02]';
                } else if (isSelected && !isCorrectAnswer) {
                  // SELECTED WRONG: Coral Rose
                  cardStyle = 'bg-rose-100/95 border-rose-400 text-rose-950 font-bold opacity-90';
                } else {
                  cardStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-50';
                }
              } else if (isBeingSpoken) {
                // AUDIO READING HIGHLIGHT
                cardStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-black ring-4 ring-amber-400/60 scale-[1.02] shadow-md';
              } else if (isSelected) {
                cardStyle = 'bg-teal-100 border-teal-500 text-teal-950 font-black ring-4 ring-teal-400/50 shadow-md';
              }

              return (
                <button
                  key={idx}
                  onClick={() => onSelectOption(idx)}
                  disabled={hasSubmitted}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-97 flex items-center justify-between gap-3 ${cardStyle}`}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* Badge number/letter */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-2xs ${
                      hasSubmitted && isCorrectAnswer
                        ? 'bg-emerald-500 text-white animate-bounce'
                        : isBeingSpoken
                        ? 'bg-amber-400 text-amber-950'
                        : isSelected
                        ? 'bg-teal-600 text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {hasSubmitted && isCorrectAnswer ? (
                        <Check className="w-5 h-5 stroke-[3]" />
                      ) : hasSubmitted && isSelected && !isCorrectAnswer ? (
                        <X className="w-5 h-5 stroke-[3]" />
                      ) : (
                        <span>{isUrdu ? badge.num : badge.en}</span>
                      )}
                    </div>

                    {/* Option Text */}
                    <span className={`text-sm sm:text-base font-bold flex-1 ${isUrdu ? 'urdu-text' : ''}`}>
                      {optText}
                    </span>
                  </div>

                  {/* Audio Speaker Icon when being spoken */}
                  {isBeingSpoken && !hasSubmitted && (
                    <Volume2 className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
                  )}

                  {/* Celebration Star Icon for correct */}
                  {hasSubmitted && isCorrectAnswer && (
                    <span className="text-xl animate-bounce shrink-0">⭐</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* EXPLANATION & CELEBRATION CARD (REVEALED AFTER ANSWERING) */}
          {hasSubmitted && (
            <div className={`p-4 sm:p-5 rounded-3xl border-2 animate-kids-pop shadow-md ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/95 border-amber-300 text-amber-950'
            }`}>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {selectedOption === currentQ.correctIndex ? '🎉' : '💡'}
                  </span>
                  <span className="text-sm font-black">
                    {selectedOption === currentQ.correctIndex
                      ? (isUrdu ? 'دُرست جواب! بہت خوب!' : 'Correct Answer! Well Done!')
                      : (isUrdu ? 'غلط جواب۔ کوئی بات نہیں، دوبارہ کوشش کریں!' : 'Incorrect Answer. No worries, keep trying!')}
                  </span>
                </div>

                <div className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white/80 border border-current">
                  {selectedOption === currentQ.correctIndex ? '+1 Star ⭐' : '+0 Star'}
                </div>
              </div>

              {/* Short Child-Friendly Explanation */}
              <div className="mt-2 text-xs sm:text-sm text-slate-800 bg-white/70 p-3 rounded-2xl border border-black/5">
                <div className="font-extrabold text-amber-900 mb-0.5 flex items-center gap-1 text-xs">
                  <span>📖</span>
                  <span>{isUrdu ? 'سبق و معلومات (Explanation):' : 'Key Lesson:'}</span>
                </div>
                <p className={isUrdu ? 'urdu-text text-sm' : 'font-medium'}>
                  {currentExplanation}
                </p>
              </div>

            </div>
          )}

          {/* BOTTOM ADVANCEMENT BAR: STRICTLY MANUAL "NEXT" BUTTON */}
          {hasSubmitted && (
            <div className="flex items-center justify-end pt-2">
              <button
                onClick={onNextQuestion}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base text-white shadow-lg hover:shadow-xl transition-all active:scale-95 bg-gradient-to-r from-amber-500 via-teal-600 to-emerald-600 hover:brightness-105 flex items-center justify-center gap-2"
              >
                <span>
                  {currentIndex + 1 === totalQuestions
                    ? (isUrdu ? 'نتائج دیکھیں 🏆 View Results' : 'View Results 🏆')
                    : (isUrdu ? 'اگلا سوال ➡️ Next Question' : 'Next Question ➡️')}
                </span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </KidsEnvironment>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { KidsCharacter, KidsCharacterMood, KidsCharacterType } from './KidsCharacter';
import { KidsEnvironment, KidsEnvironmentType } from './KidsEnvironment';
import { SpeechEngine, sounds } from '../../utils/audio';
import { kidsVoiceListener, isSpeechRecognitionSupported, VoiceActivityType } from '../../utils/speechRecognition';
import { Mic, MicOff, Volume2, VolumeX, RotateCcw, Sparkles, HelpCircle, CheckSquare, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KidsHomeProps {
  onSelectActivity: (tab: 'quiz' | 'salah' | 'tasbih' | 'home' | 'search' | 'status') => void;
}

export const KidsHome: React.FC<KidsHomeProps> = ({ onSelectActivity }) => {
  const { contentLang } = useApp();
  const isUrdu = contentLang === 'urdu';

  // Character and Environment state with localStorage persistence
  const [characterType, setCharacterType] = useState<KidsCharacterType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('islamiq_kids_character');
      if (saved === 'zayd' || saved === 'maryam') return saved;
    }
    return 'zayd';
  });

  const [environment, setEnvironment] = useState<KidsEnvironmentType>('madrasa');
  const [characterMood, setCharacterMood] = useState<KidsCharacterMood>('intro');
  const [customBubble, setCustomBubble] = useState<string>('');
  const [activeVoiceStep, setActiveVoiceStep] = useState<number | null>(null);

  // Audio / Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Voice Recognition State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceFeedback, setVoiceFeedback] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);
  const isVoiceSupported = isSpeechRecognitionSupported();

  // Voice stop reference
  const stopVoiceRef = useRef<(() => void) | null>(null);

  // Save character preference
  const handleSwitchCharacter = (newType: KidsCharacterType) => {
    setCharacterType(newType);
    if (typeof window !== 'undefined') {
      localStorage.setItem('islamiq_kids_character', newType);
    }
    sounds.buttonClick();
    
    // Friendly character switch greeting
    const name = newType === 'zayd' ? (isUrdu ? 'زید' : 'Zayd') : (isUrdu ? 'مریم' : 'Maryam');
    const bubbleMsg = isUrdu ? `میں ${name} ہوں! السلام علیکم!` : `I am ${name}! Assalamu Alaikum!`;
    setCustomBubble(bubbleMsg);
    setCharacterMood('happy');
    
    if (!isSoundMuted) {
      SpeechEngine.speakSingle(bubbleMsg, isUrdu ? 'urdu' : 'english');
    }

    setTimeout(() => {
      setCharacterMood('idle');
    }, 2400);
  };

  // Run initial spoken greeting
  const playGreeting = () => {
    if (isSoundMuted) return;

    sounds.chime();
    setIsSpeaking(true);
    setCharacterMood('intro');
    setActiveVoiceStep(0);

    const greetingPhrases = isUrdu ? [
      'السلام علیکم! آج آپ کیا کرنا چاہتے ہیں؟',
      'Quiz کرنا ہے؟',
      'نماز سیکھنی ہے؟',
      'تسبیح کرنی ہے؟'
    ] : [
      'Assalamu Alaikum! What would you like to do today?',
      'Play Quiz?',
      'Learn Salah?',
      'Do Tasbih?'
    ];

    setCustomBubble(greetingPhrases[0]);

    SpeechEngine.speakKidsGreeting(
      isUrdu ? 'urdu' : 'english',
      (step) => {
        setActiveVoiceStep(step);
        setCustomBubble(greetingPhrases[step] || '');
        setCharacterMood(step === 0 ? 'intro' : 'talking');
      },
      () => {
        setIsSpeaking(false);
        setActiveVoiceStep(null);
        setCharacterMood('idle');
        setCustomBubble(isUrdu ? 'بول کر بتائیں یا بٹن دبائیں! 👇' : 'Speak or tap a button below! 👇');
      }
    );
  };

  // Auto trigger greeting on mount (delayed slightly for smooth animation entry)
  useEffect(() => {
    const timer = setTimeout(() => {
      playGreeting();
    }, 600);

    return () => {
      clearTimeout(timer);
      SpeechEngine.stop();
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
      }
    };
  }, [contentLang]);

  // Handle direct tap on character
  const handleCharacterTap = () => {
    sounds.buttonClick();
    const greetings = isUrdu ? [
      'السلام علیکم! آئیے کچھ نیا سیکھیں!',
      'کوئز، نماز یا تسبیح — آپ کیا پسند کریں گے؟',
      'ماشاءاللہ! آپ بہت اچھے بچے ہیں!',
      'مائیکروفون کا بٹن دبا کر بولیں بھی!'
    ] : [
      'Assalamu Alaikum! Let\'s learn something good today!',
      'Quiz, Salah or Tasbih — what would you like?',
      'Masha\'Allah! You are a wonderful learner!',
      'Tap the mic button and speak to me!'
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setCustomBubble(randomGreeting);
    setCharacterMood('happy');

    if (!isSoundMuted) {
      SpeechEngine.speakSingle(randomGreeting, isUrdu ? 'urdu' : 'english', () => {
        setCharacterMood('idle');
      });
    } else {
      setTimeout(() => setCharacterMood('idle'), 2000);
    }
  };

  // Trigger activity navigation with audio guidance & animation
  const triggerActivity = (activity: 'quiz' | 'salah' | 'tasbih') => {
    sounds.correct();
    SpeechEngine.stop();
    if (stopVoiceRef.current) {
      stopVoiceRef.current();
    }

    setCharacterMood('happy');
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    const guidanceMessages = {
      quiz: {
        urdu: 'ماشاءاللہ! چلیں اسلامک کوئز کھیلتے ہیں!',
        en: 'Masha\'Allah! Let\'s play the Islamic Quiz!'
      },
      salah: {
        urdu: 'ماشاءاللہ! چلیں نماز کا طریقہ سیکھتے ہیں!',
        en: 'Masha\'Allah! Let\'s learn how to pray Salah!'
      },
      tasbih: {
        urdu: 'سبحان اللہ! چلیں تسبیح پڑھتے ہیں!',
        en: 'SubhanAllah! Let\'s do Tasbih together!'
      }
    };

    const text = isUrdu ? guidanceMessages[activity].urdu : guidanceMessages[activity].en;
    setCustomBubble(text);

    if (!isSoundMuted) {
      SpeechEngine.speakActivityGuidance(activity, isUrdu ? 'urdu' : 'english', () => {
        onSelectActivity(activity);
      });
      // Safety navigation timeout
      setTimeout(() => {
        onSelectActivity(activity);
      }, 1600);
    } else {
      setTimeout(() => {
        onSelectActivity(activity);
      }, 700);
    }
  };

  // Start / Stop Speech Recognition
  const toggleVoiceRecognition = () => {
    if (isListening) {
      if (stopVoiceRef.current) {
        stopVoiceRef.current();
        stopVoiceRef.current = null;
      }
      setIsListening(false);
      setVoiceFeedback(null);
      setCharacterMood('idle');
      return;
    }

    SpeechEngine.stop();
    sounds.buttonClick();
    setVoiceTranscript('');
    setVoiceFeedback({
      text: isUrdu ? 'سن رہا ہوں... بولیے "کوئز"، "نماز" یا "تسبیح"' : 'Listening... Say "Quiz", "Salah", or "Tasbih"',
      type: 'info'
    });
    setCharacterMood('thinking');
    setCustomBubble(isUrdu ? 'میں سن رہا ہوں... 🎙️' : 'I am listening... 🎙️');

    const stopFn = kidsVoiceListener.listen(
      isUrdu ? 'urdu' : 'english',
      (result) => {
        setVoiceTranscript(result.transcript);
        if (result.matchedActivity !== 'unknown') {
          // Matched recognized activity!
          setVoiceFeedback({
            text: isUrdu ? `پہچان لیا: ${result.transcript} ✨` : `Understood: ${result.transcript} ✨`,
            type: 'success'
          });
          triggerActivity(result.matchedActivity as 'quiz' | 'salah' | 'tasbih');
        } else if (result.transcript) {
          // Heard something not matched yet
          setVoiceFeedback({
            text: `"${result.transcript}" — ${isUrdu ? 'کہیے: کوئز، نماز، یا تسبیح' : 'Say: Quiz, Salah, or Tasbih'}`,
            type: 'info'
          });
        }
      },
      (err) => {
        setIsListening(false);
        setCharacterMood('reacting');
        if (err === 'not-allowed') {
          setVoiceFeedback({
            text: isUrdu ? 'مائیکروفون کی اجازت نہیں ملی۔ آپ بٹن دبا سکتے ہیں!' : 'Microphone permission denied. Tap a button!',
            type: 'warning'
          });
        } else if (err === 'no-speech') {
          setVoiceFeedback({
            text: isUrdu ? 'آواز نہیں سنی گئی۔ دوبارہ کوشش کریں!' : 'No voice heard. Please try again!',
            type: 'info'
          });
        } else {
          setVoiceFeedback({
            text: isUrdu ? 'کوئی بات نہیں! آپ بٹن دبا کر بھی منتخب کر سکتے ہیں!' : 'You can also tap the buttons below!',
            type: 'info'
          });
        }
        setTimeout(() => setVoiceFeedback(null), 3500);
      },
      (status) => {
        setIsListening(status);
        if (!status && characterMood === 'thinking') {
          setCharacterMood('idle');
        }
      }
    );

    stopVoiceRef.current = stopFn;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Interactive Companion Room with Islamic Environment */}
      <KidsEnvironment
        environment={environment}
        onSwitchEnvironment={setEnvironment}
        contentLang={isUrdu ? 'urdu' : 'english'}
      >
        <div className="px-4 py-5 sm:py-6 flex flex-col items-center justify-center relative">
          {/* Top Bar Controls inside Room */}
          <div className="w-full flex items-center justify-between mb-2 z-20">
            {/* Character Selector Pill */}
            <div className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs border border-amber-200">
              <span className="text-xs">👦👧</span>
              <button
                onClick={() => handleSwitchCharacter('zayd')}
                className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${
                  characterType === 'zayd'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                {isUrdu ? 'زید' : 'Zayd'}
              </button>
              <button
                onClick={() => handleSwitchCharacter('maryam')}
                className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${
                  characterType === 'maryam'
                    ? 'bg-pink-500 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-pink-600'
                }`}
              >
                {isUrdu ? 'مریم' : 'Maryam'}
              </button>
            </div>

            {/* Audio Controls (Replay / Mute) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={playGreeting}
                disabled={isSpeaking}
                title={isUrdu ? 'دوبارہ سنیں' : 'Listen again'}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white text-teal-800 border border-teal-200 shadow-2xs flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50"
              >
                <RotateCcw className={`w-4 h-4 ${isSpeaking ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => {
                  if (isSpeaking) SpeechEngine.stop();
                  setIsSoundMuted(!isSoundMuted);
                }}
                title={isSoundMuted ? 'Unmute' : 'Mute'}
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-white text-teal-800 border border-teal-200 shadow-2xs flex items-center justify-center transition-transform active:scale-95"
              >
                {isSoundMuted ? (
                  <VolumeX className="w-4 h-4 text-rose-500" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                )}
              </button>
            </div>
          </div>

          {/* Prominent Companion Character */}
          <div className="py-2 sm:py-3 flex flex-col items-center">
            <KidsCharacter
              type={characterType}
              mood={characterMood}
              contentLang={isUrdu ? 'urdu' : 'english'}
              size="xl"
              customBubbleText={customBubble}
              showSpeechBubble={true}
              onClick={handleCharacterTap}
              className="transform hover:scale-105 transition-transform"
            />
            <p className="text-[11px] text-teal-900/70 font-medium mt-1 select-none">
              {isUrdu ? '👆 بات کرنے کے لیے مجھے چھوئیں!' : '👆 Tap me to talk!'}
            </p>
          </div>

          {/* Spoken Dialog Bar / Prominent Question Card */}
          <div className="w-full max-w-md mt-2 mb-1 bg-white/95 backdrop-blur-sm rounded-2xl p-3 border-2 border-amber-300 shadow-sm text-center animate-kids-pop">
            <h2 className="text-base sm:text-lg font-black text-amber-950 flex items-center justify-center gap-1.5">
              <span>🌟</span>
              <span className={isUrdu ? 'urdu-text' : ''}>
                {isUrdu ? 'السلام علیکم! آج آپ کیا کرنا چاہتے ہیں؟' : 'Assalamu Alaikum! What would you like to do?'}
              </span>
            </h2>
            <p className="text-xs text-amber-900/80 font-bold mt-0.5">
              {isUrdu ? 'نیچے دیے گئے بٹن دبائیں یا بول کر بتائیں!' : 'Tap a button below or speak with your voice!'}
            </p>
          </div>
        </div>
      </KidsEnvironment>

      {/* VOICE ACTIVITY SELECTION (بول کر بھی بتائیں 🎤) */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="text-center sm:text-right flex-1">
            <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-0.5 rounded-full text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>{isUrdu ? 'صوتی معاون (Kids Voice Guide)' : 'Kids Voice Companion'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              {isUrdu ? 'بول کر بھی بتائیں 🎤' : 'Tell me with your voice 🎤'}
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 font-medium mt-0.5">
              {isUrdu
                ? 'کہیے: "کوئز"، "نماز"، یا "تسبیح" — اور جادو دیکھیں!'
                : 'Say: "Quiz", "Salah", or "Tasbih" — and watch the magic!'}
            </p>
          </div>

          {/* Big Child-Friendly Microphone Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={toggleVoiceRecognition}
              className={`relative group px-5 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center gap-2.5 shadow-lg transition-all duration-300 transform active:scale-95 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-300'
                  : 'bg-white text-amber-950 hover:bg-amber-100 hover:scale-105'
              }`}
            >
              {/* Mic Icon with radiating waves if listening */}
              <div className="relative">
                {isListening ? (
                  <>
                    <Mic className="w-6 h-6 text-white animate-bounce" />
                    <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping" />
                  </>
                ) : (
                  <Mic className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
                )}
              </div>

              <span>
                {isListening
                  ? (isUrdu ? 'سن رہا ہوں... 🎙️' : 'Listening... 🎙️')
                  : (isUrdu ? 'مائیک دبائیں 🎤' : 'Tap to Speak 🎤')}
              </span>
            </button>

            {!isVoiceSupported && (
              <span className="text-[10px] text-amber-200 mt-1">
                {isUrdu ? 'براؤزر بٹنز کو ترجیح دیں' : 'Use the cards below'}
              </span>
            )}
          </div>
        </div>

        {/* Live Voice Feedback Banner */}
        {voiceFeedback && (
          <div className={`mt-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            voiceFeedback.type === 'success'
              ? 'bg-emerald-500/90 text-white border border-emerald-300'
              : voiceFeedback.type === 'warning'
              ? 'bg-rose-500/90 text-white border border-rose-300'
              : 'bg-white/25 text-white border border-white/30 backdrop-blur-xs'
          }`}>
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{voiceFeedback.text}</span>
          </div>
        )}
      </div>

      {/* 3 LARGE CHILD-FRIENDLY ACTIVITY BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1">
        
        {/* 1. QUIZ BUTTON (کوئز) */}
        <button
          onClick={() => triggerActivity('quiz')}
          className={`group relative overflow-hidden rounded-3xl p-5 text-right transition-all duration-300 transform active:scale-98 hover:-translate-y-1 shadow-md border-3 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
            activeVoiceStep === 1
              ? 'border-amber-400 bg-gradient-to-br from-amber-400 via-amber-300 to-yellow-200 ring-4 ring-amber-300 scale-102'
              : 'border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 hover:border-amber-400 hover:shadow-xl'
          }`}
        >
          {/* Decorative Corner Star */}
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-amber-200/50 rounded-full blur-xs pointer-events-none" />

          <div className="flex items-start justify-between w-full relative z-10">
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
              🧠
            </span>
            <span className="bg-amber-500 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
              {isUrdu ? 'مرحلہ ۱' : 'Activity 1'}
            </span>
          </div>

          <div className="mt-4 relative z-10">
            <h4 className="text-lg sm:text-xl font-black text-amber-950 flex items-center gap-1.5">
              <span>{isUrdu ? 'کوئز کھیلیں' : 'Play Quiz'}</span>
              <span className="text-amber-600 text-sm group-hover:translate-x-1 transition-transform">⭐</span>
            </h4>
            <p className="text-xs text-amber-900/80 font-medium mt-1">
              {isUrdu ? 'دلچسپ اسلامی سوالات، ستارے اور پوائنٹس جیتیں!' : 'Fun Islamic questions, stars and points!'}
            </p>
          </div>

          {/* Action indicator */}
          <div className="mt-3 flex items-center justify-between text-xs font-bold text-amber-800 pt-2 border-t border-amber-200/60">
            <span>{isUrdu ? 'شروع کریں' : 'Start'}</span>
            <span className="text-base font-black">←</span>
          </div>
        </button>

        {/* 2. SALAH BUTTON (نماز) */}
        <button
          onClick={() => triggerActivity('salah')}
          className={`group relative overflow-hidden rounded-3xl p-5 text-right transition-all duration-300 transform active:scale-98 hover:-translate-y-1 shadow-md border-3 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
            activeVoiceStep === 2
              ? 'border-emerald-400 bg-gradient-to-br from-emerald-400 via-teal-300 to-teal-200 ring-4 ring-emerald-300 scale-102'
              : 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 hover:border-emerald-400 hover:shadow-xl'
          }`}
        >
          {/* Decorative Corner Pattern */}
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-emerald-200/50 rounded-full blur-xs pointer-events-none" />

          <div className="flex items-start justify-between w-full relative z-10">
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-transform">
              🕌
            </span>
            <span className="bg-emerald-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
              {isUrdu ? 'مرحلہ ۲' : 'Activity 2'}
            </span>
          </div>

          <div className="mt-4 relative z-10">
            <h4 className="text-lg sm:text-xl font-black text-emerald-950 flex items-center gap-1.5">
              <span>{isUrdu ? 'نماز سیکھیں' : 'Learn Salah'}</span>
              <span className="text-emerald-600 text-sm group-hover:translate-x-1 transition-transform">✨</span>
            </h4>
            <p className="text-xs text-emerald-900/80 font-medium mt-1">
              {isUrdu ? 'وضو اور پانچوں نمازوں کا خوبصورت و آسان طریقہ!' : 'Easy step-by-step Wudu and 5 prayers!'}
            </p>
          </div>

          {/* Action indicator */}
          <div className="mt-3 flex items-center justify-between text-xs font-bold text-emerald-800 pt-2 border-t border-emerald-200/60">
            <span>{isUrdu ? 'نماز ٹریکر' : 'Salah Tracker'}</span>
            <span className="text-base font-black">←</span>
          </div>
        </button>

        {/* 3. TASBIH BUTTON (تسبیح) */}
        <button
          onClick={() => triggerActivity('tasbih')}
          className={`group relative overflow-hidden rounded-3xl p-5 text-right transition-all duration-300 transform active:scale-98 hover:-translate-y-1 shadow-md border-3 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] ${
            activeVoiceStep === 3
              ? 'border-violet-400 bg-gradient-to-br from-violet-400 via-purple-300 to-indigo-200 ring-4 ring-violet-300 scale-102'
              : 'border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 hover:border-violet-400 hover:shadow-xl'
          }`}
        >
          {/* Decorative Corner Pattern */}
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-violet-200/50 rounded-full blur-xs pointer-events-none" />

          <div className="flex items-start justify-between w-full relative z-10">
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
              📿
            </span>
            <span className="bg-violet-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
              {isUrdu ? 'مرحلہ ۳' : 'Activity 3'}
            </span>
          </div>

          <div className="mt-4 relative z-10">
            <h4 className="text-lg sm:text-xl font-black text-violet-950 flex items-center gap-1.5">
              <span>{isUrdu ? 'تسبیح کریں' : 'Do Tasbih'}</span>
              <span className="text-violet-600 text-sm group-hover:translate-x-1 transition-transform">💫</span>
            </h4>
            <p className="text-xs text-violet-900/80 font-medium mt-1">
              {isUrdu ? 'سبحان اللہ، الحمدللہ اور مسنون دعائیں!' : 'SubhanAllah, Alhamdulillah & daily Dhikr!'}
            </p>
          </div>

          {/* Action indicator */}
          <div className="mt-3 flex items-center justify-between text-xs font-bold text-violet-800 pt-2 border-t border-violet-200/60">
            <span>{isUrdu ? 'ڈیجیٹل تسبیح' : 'Digital Tasbih'}</span>
            <span className="text-base font-black">←</span>
          </div>
        </button>

      </div>

      {/* Helpful Parent / Child Note */}
      <div className="bg-amber-100/60 border border-amber-200/70 rounded-2xl p-3 text-center text-xs text-amber-900 flex items-center justify-center gap-2">
        <span>🕌</span>
        <span>
          {isUrdu
            ? 'بچوں کے لیے باحیا اور محفوظ اسلامی ماحول — کسی بھی وقت اوپر والے مینو سے ایڈلٹ موڈ میں تبدیل ہو سکتے ہیں!'
            : 'Safe, respectful Islamic environment for children — switch back to standard mode anytime from the header!'}
        </span>
      </div>
    </div>
  );
};

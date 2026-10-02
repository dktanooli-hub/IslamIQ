import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SpeechEngine, sounds } from '../../utils/audio';
import { Volume2, ArrowLeft, RotateCcw, Star, Award, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KidsDhikrItem {
  id: string;
  arabic: string;
  transliteration: string;
  meaningUrdu: string;
  meaningEn: string;
  virtueUrdu: string;
  virtueEn: string;
  colorBg: string;
  colorBorder: string;
  colorRing: string;
  badgeEmoji: string;
}

export const KIDS_DHIKR_ITEMS: KidsDhikrItem[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaningUrdu: 'اللہ تعالیٰ ہر عیب، نقص اور کمزوری سے پاک ہے۔',
    meaningEn: 'Glory be to Allah, free from all imperfections.',
    virtueUrdu: 'میزان میں بہت وزنی ہے اور گناہوں کو مٹاتا ہے۔',
    virtueEn: 'Heavy on the scale of good deeds.',
    colorBg: 'from-emerald-500 to-teal-700',
    colorBorder: 'border-emerald-300',
    colorRing: 'ring-emerald-200',
    badgeEmoji: '🌱'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    meaningUrdu: 'تمام تعریفیں اور شکر صرف اور صرف اللہ ہی کے لیے ہیں۔',
    meaningEn: 'All praise and gratitude belong to Allah alone.',
    virtueUrdu: 'نیکیوں کے ترازو کو بھر دیتا ہے اور نعمتوں میں برکت پیدا کرتا ہے۔',
    virtueEn: 'Fills the scale with rewards and increases blessings.',
    colorBg: 'from-amber-500 to-orange-600',
    colorBorder: 'border-amber-300',
    colorRing: 'ring-amber-200',
    badgeEmoji: '☀️'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaningUrdu: 'اللہ تعالیٰ ہر چیز سے سب سے بڑا اور سب سے عظیم ہے۔',
    meaningEn: 'Allah is the Greatest, supreme above all things.',
    virtueUrdu: 'دل میں اللہ کی عظمت اور شجاعت پیدا کرتا ہے۔',
    virtueEn: 'Instills confidence and reverence for the Almighty.',
    colorBg: 'from-blue-500 to-indigo-700',
    colorBorder: 'border-blue-300',
    colorRing: 'ring-blue-200',
    badgeEmoji: '👑'
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    meaningUrdu: 'اللہ کے سوا کوئی سچا معبود اور بندگی کے لائق نہیں۔',
    meaningEn: 'There is no deity worthy of worship except Allah.',
    virtueUrdu: 'سب سے افضل ترین ذکر اور جنت کی کنجی ہے۔',
    virtueEn: 'The most virtuous remembrance and the key to Jannah.',
    colorBg: 'from-purple-500 to-violet-700',
    colorBorder: 'border-purple-300',
    colorRing: 'ring-purple-200',
    badgeEmoji: '💎'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    meaningUrdu: 'میں اپنے پیارے رب اللہ سے اپنے تمام گناہوں کی بخشش مانگتا ہوں۔',
    meaningEn: 'I seek forgiveness from Allah, my Lord.',
    virtueUrdu: 'پریشانیاں دور کرتا ہے اور رحمت و خوشحالی لاتا ہے۔',
    virtueEn: 'Erases sins, brings peace, and opens doors of provision.',
    colorBg: 'from-rose-500 to-pink-700',
    colorBorder: 'border-rose-300',
    colorRing: 'ring-rose-200',
    badgeEmoji: '🌧️'
  },
  {
    id: 'bismillah',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ',
    transliteration: 'Bismillahir-Rahmanir-Rahim',
    meaningUrdu: 'اللہ کے نام سے جو نہایت مہربان، بہت رحم فرمانے والا ہے۔',
    meaningEn: 'In the Name of Allah, the Entirely Merciful, the Especially Merciful.',
    virtueUrdu: 'ہر نیک کام سے پہلے پڑھنے سے اس میں برکت اور شیطان سے حفاظت ہوتی ہے۔',
    virtueEn: 'Blesses every action and shields against harm.',
    colorBg: 'from-teal-600 to-emerald-800',
    colorBorder: 'border-teal-300',
    colorRing: 'ring-teal-200',
    badgeEmoji: '✨'
  }
];

interface KidsTasbihLearningProps {
  onBackToKidsMenu: () => void;
}

export const KidsTasbihLearning: React.FC<KidsTasbihLearningProps> = ({ onBackToKidsMenu }) => {
  const { contentLang, addXP, incrementTasbih } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [activeDhikrId, setActiveDhikrId] = useState<string>('subhanallah');
  const [targetCount, setTargetCount] = useState<number>(10);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [completedDhikrs, setCompletedDhikrs] = useState<string[]>([]);
  const [isSpeakingArabic, setIsSpeakingArabic] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const activeDhikr = KIDS_DHIKR_ITEMS.find(d => d.id === activeDhikrId) || KIDS_DHIKR_ITEMS[0];

  const handleSelectDhikr = (id: string) => {
    sounds.buttonClick();
    SpeechEngine.stop();
    setIsSpeakingArabic(false);
    setActiveDhikrId(id);
    setCurrentCount(0);
  };

  const handlePlayArabic = () => {
    if (isSpeakingArabic) {
      SpeechEngine.stop();
      setIsSpeakingArabic(false);
      return;
    }

    sounds.buttonClick();
    setIsSpeakingArabic(true);
    // Explicitly pronounce Arabic with native Arabic voice (ar-SA)
    SpeechEngine.speakArabic(
      activeDhikr.arabic,
      () => setIsSpeakingArabic(true),
      () => setIsSpeakingArabic(false)
    );
  };

  const handleCountTap = () => {
    sounds.playTasbihBead();
    incrementTasbih();

    const nextCount = currentCount + 1;
    setCurrentCount(nextCount);

    if (nextCount >= targetCount) {
      sounds.playComplete();
      sounds.playKidsCheerful();
      addXP(25);

      if (!completedDhikrs.includes(activeDhikr.id)) {
        setCompletedDhikrs(prev => [...prev, activeDhikr.id]);
      }

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setShowCelebration(true);
    }
  };

  const handleReset = () => {
    sounds.buttonClick();
    setCurrentCount(0);
  };

  const progressPercent = Math.min(100, Math.round((currentCount / targetCount) * 100));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white p-4 sm:p-5 rounded-3xl shadow-lg border-2 border-violet-400">
        <button
          onClick={() => {
            SpeechEngine.stop();
            onBackToKidsMenu();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'ہوم مینو' : 'Back to Menu'}</span>
        </button>

        <div className="text-center">
          <h2 className="text-base sm:text-xl font-black flex items-center justify-center gap-2">
            <span>📿</span>
            <span>{isUrdu ? 'پیارے بچو! تسبیح سیکھیں' : 'Kids Tasbih Learning'}</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-purple-100 font-medium">
            {isUrdu ? 'مبارک اذکار، درست عربی تلفظ اور کاؤنٹر' : 'Blessed Dhikr, proper Arabic voice & kids counter'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-300 text-purple-950 px-3 py-1 rounded-full text-xs font-black shadow-xs">
          <Star className="w-3.5 h-3.5 fill-purple-950" />
          <span>{completedDhikrs.length}/6</span>
        </div>
      </div>

      {/* 6 Dhikr Selector Carousel */}
      <div className="bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-purple-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-purple-900 px-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isUrdu ? '۶ مبارک کلماتِ ذکر منتخب کریں' : 'Choose from 6 Blessed Words of Dhikr'}</span>
          </span>
          <span className="text-[11px] text-purple-700">
            {isUrdu ? 'کوئی بھی ذکر منتخب کر کے پڑھیں' : 'Tap any Dhikr to practice'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          {KIDS_DHIKR_ITEMS.map(dhikr => {
            const isSelected = dhikr.id === activeDhikrId;
            const isDone = completedDhikrs.includes(dhikr.id);

            return (
              <button
                key={dhikr.id}
                onClick={() => handleSelectDhikr(dhikr.id)}
                className={`p-2.5 rounded-2xl text-center border-2 transition-all transform active:scale-95 flex flex-col items-center justify-between ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-950 ring-2 ring-purple-400 font-black shadow-md scale-102'
                    : isDone
                    ? 'border-emerald-300 bg-emerald-50/70 text-slate-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full text-xs">
                  <span>{dhikr.badgeEmoji}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />}
                </div>

                <div className="arabic-text text-sm sm:text-base font-bold my-1 truncate w-full">
                  {dhikr.arabic}
                </div>

                <div className="text-[10px] sm:text-xs font-extrabold truncate w-full text-purple-900">
                  {dhikr.transliteration}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Child-Friendly Tasbih Counter Box */}
      <div className="bg-gradient-to-b from-white to-purple-50/40 rounded-3xl p-5 sm:p-7 border-3 border-purple-300 shadow-md space-y-6 text-center">
        {/* Dhikr Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-black">
            <span>{activeDhikr.badgeEmoji}</span>
            <span>{activeDhikr.transliteration}</span>
          </div>

          <div className="arabic-text text-3xl sm:text-5xl font-bold text-slate-900 py-2 leading-relaxed">
            {activeDhikr.arabic}
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-700 urdu-text max-w-lg mx-auto">
            {isUrdu ? activeDhikr.meaningUrdu : activeDhikr.meaningEn}
          </p>

          <p className="text-[11px] text-purple-800 font-semibold max-w-md mx-auto">
            ✨ {isUrdu ? activeDhikr.virtueUrdu : activeDhikr.virtueEn}
          </p>
        </div>

        {/* Audio Speaker & Target Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={handlePlayArabic}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
              isSpeakingArabic
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
            title="Listen to native Arabic voice"
          >
            <Volume2 className={`w-4 h-4 ${isSpeakingArabic ? 'animate-bounce' : ''}`} />
            <span>{isSpeakingArabic ? (isUrdu ? 'سن رہے ہیں...' : 'Listening...') : (isUrdu ? 'عربی تلفظ سنیں (Speaker 🔊)' : 'Listen in Arabic (ar-SA)')}</span>
          </button>

          {/* Target Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
            <span className="px-2 text-slate-500">{isUrdu ? 'ہدف:' : 'Target:'}</span>
            <button
              onClick={() => {
                setTargetCount(10);
                setCurrentCount(0);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                targetCount === 10 ? 'bg-purple-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              10
            </button>
            <button
              onClick={() => {
                setTargetCount(33);
                setCurrentCount(0);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                targetCount === 33 ? 'bg-purple-600 text-white shadow-xs font-black' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              33
            </button>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-all active:scale-95"
            title="Reset counter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'شروع سے' : 'Reset'}</span>
          </button>
        </div>

        {/* Large Prominent Child-Friendly Counter Circle */}
        <div className="flex flex-col items-center justify-center py-2">
          <button
            onClick={handleCountTap}
            className={`w-60 h-60 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center text-center relative transition-transform active:scale-90 focus:outline-none select-none cursor-pointer bg-gradient-to-tr ${activeDhikr.colorBg} border-8 ${activeDhikr.colorBorder} text-white ring-8 ${activeDhikr.colorRing} shadow-2xl group`}
            aria-label="Tap to count Dhikr"
          >
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90">
              {activeDhikr.transliteration}
            </span>

            {/* Huge Number */}
            <span className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-md my-1 group-active:scale-95 transition-transform">
              {currentCount}
            </span>

            <span className="text-xs sm:text-sm font-bold text-white/90">
              {isUrdu ? `ہدف: ${targetCount}` : `of ${targetCount}`}
            </span>

            {/* Tap Prompt Badge */}
            <span className="mt-2 px-3 py-1 rounded-full bg-white/25 text-[10px] sm:text-[11px] font-black tracking-wider uppercase backdrop-blur-2xs shadow-xs animate-pulse">
              {isUrdu ? '👆 دبائیں اور پڑھیں' : '👆 TAP TO COUNT'}
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xs mx-auto space-y-1">
          <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden border border-purple-200">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-purple-900">
            <span>{progressPercent}% {isUrdu ? 'مکمل' : 'Complete'}</span>
            <span>{currentCount} / {targetCount}</span>
          </div>
        </div>
      </div>

      {/* Celebration Modal on Target Completion */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-4 border-purple-400 shadow-2xl space-y-4 animate-kids-pop">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 border-4 border-purple-300 flex items-center justify-center text-4xl shadow-inner">
              🎉
            </div>

            <div>
              <h3 className="text-xl font-black text-purple-950">
                {isUrdu ? 'سبحان اللہ! مبارک ہو!' : 'SubhanAllah! Well Done!'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">
                {isUrdu
                  ? `آپ نے ${targetCount} بار "${activeDhikr.transliteration}" پڑھ لیا!`
                  : `You completed ${targetCount} counts of "${activeDhikr.transliteration}"!`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {isUrdu ? 'اللہ آپ کے علم و عمل میں برکت عطا فرمائے!' : 'May Allah bless your Dhikr and good deeds!'}
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs font-black text-purple-900 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>+25 XP حاصل ہوئے! ⭐</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setShowCelebration(false);
                  setCurrentCount(0);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                {isUrdu ? 'دوبارہ کریں' : 'Count Again'}
              </button>

              <button
                onClick={() => {
                  setShowCelebration(false);
                  // Advance to next dhikr
                  const currentIndex = KIDS_DHIKR_ITEMS.findIndex(d => d.id === activeDhikr.id);
                  const nextIndex = (currentIndex + 1) % KIDS_DHIKR_ITEMS.length;
                  setActiveDhikrId(KIDS_DHIKR_ITEMS[nextIndex].id);
                  setCurrentCount(0);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md"
              >
                {isUrdu ? 'اگلا ذکر پڑھیں →' : 'Next Dhikr →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

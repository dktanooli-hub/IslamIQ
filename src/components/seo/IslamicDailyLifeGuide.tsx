import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_DUAS } from '../../data/duaLibrary';
import { VERIFIED_HADITHS } from '../../data/hadithLibrary';
import { VERIFIED_QURAN_VERSES } from '../../data/quranLibrary';
import { ISLAMIC_REMINDERS } from '../../data/reminderLibrary';
import { SeoHead, FAQItem } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { SpeechEngine } from '../../utils/audio';
import { getLocalDateStr } from '../../utils/dateUtils';
import {
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Share2,
  ShieldCheck,
  Heart,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckSquare,
  HelpCircle,
  Award,
  Compass,
  Smile,
  Coffee,
  Briefcase,
  Home
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  phase: 'morning' | 'daytime' | 'evening' | 'night';
  isFard: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'fajr_prayer',
    titleEn: 'Fajr Prayer (2 Sunnah + 2 Fard)',
    titleUrdu: 'نمازِ فجر (۲ سنت + ۲ فرض)',
    descEn: 'Offer Fajr on time; the 2 Sunnah rakats are better than the world and all in it.',
    descUrdu: 'فجر وقت پر ادا کریں؛ فجر کی دو سنتیں دنیا اور اس کی تمام چیزوں سے بہتر ہیں۔',
    phase: 'morning',
    isFard: true
  },
  {
    id: 'morning_adhkar',
    titleEn: 'Morning Protection Adhkar & Sayyid al-Istighfar',
    titleUrdu: 'صبح کے مسنون اذکار اور سید الاستغفار',
    descEn: 'Recite morning supplications for barakah and protection against harm throughout the day.',
    descUrdu: 'دن بھر کی حفاظت اور خیر و برکت کے لیے صبح کے مسنون اذکار کی تلاوت کریں۔',
    phase: 'morning',
    isFard: false
  },
  {
    id: 'halal_work_intention',
    titleEn: 'Pure Intention for Halal Earnings & Honesty',
    titleUrdu: 'حلال کمائی اور دیانت داری کی نیت',
    descEn: 'Strive with honesty in your studies or job, guarding your speech and transactions.',
    descUrdu: 'اپنے کام اور کاروبار میں سچائی اور دیانت داری کا التزام کریں، جھوٹ اور فریب سے بچیں۔',
    phase: 'daytime',
    isFard: true
  },
  {
    id: 'dhuhr_asr_prayers',
    titleEn: 'Dhuhr & Asr Prayers During the Day',
    titleUrdu: 'ظہر اور عصر کی بروقت ادائیگی',
    descEn: 'Pause worldly busywork to stand before Allah during the middle and late afternoon.',
    descUrdu: 'دن کی مصروفیات میں نماز کا وقفہ کریں اور وقت پر ظہر و عصر ادا کریں۔',
    phase: 'daytime',
    isFard: true
  },
  {
    id: 'family_kindness_maghrib',
    titleEn: 'Maghrib Prayer & Family Kindness (Huqooq)',
    titleUrdu: 'نمازِ مغرب اور اہل خانہ کے ساتھ حسنِ سلوک',
    descEn: 'Greet family with Salam, smile, assist at home, and fulfill filial/spousal duties.',
    descUrdu: 'گھر میں سلام کے ساتھ داخل ہوں، والدین اور اہل خانہ کے ساتھ نرمی و محبت سے پیش آئیں۔',
    phase: 'evening',
    isFard: true
  },
  {
    id: 'evening_adhkar',
    titleEn: 'Evening Protective Supplications',
    titleUrdu: 'شام کے مسنون حفاظتی اذکار',
    descEn: 'Recite evening Duas before nightfall to seek Allah’s continuous protection.',
    descUrdu: 'غروب آفتاب کے بعد شام کے مسنون اذکار پڑھیں تاکہ رات بھر اللہ کی حفاظت میں رہیں۔',
    phase: 'evening',
    isFard: false
  },
  {
    id: 'isha_witr',
    titleEn: 'Isha Prayer & Witr',
    titleUrdu: 'نمازِ عشاء اور وتر',
    descEn: 'Complete the final obligatory prayer of the day and seal with Witr.',
    descUrdu: 'دن کی آخری فرض نماز ادا کریں اور وتر کے ساتھ دن کا اختتام کریں۔',
    phase: 'night',
    isFard: true
  },
  {
    id: 'bedtime_muhasabah_dua',
    titleEn: 'Bedtime Muhasabah & Sunnah Sleep Dua',
    titleUrdu: 'سونے سے پہلے محاسبہ اور مسنون دعا',
    descEn: 'Forgive anyone who wronged you, seek Allah’s forgiveness, and sleep on right side with Wudu.',
    descUrdu: 'دل کو کینے سے پاک کریں، توبہ و استغفار کریں اور باوضو دائیں کروٹ پر مسنون دعا پڑھ کر سوئیں۔',
    phase: 'night',
    isFard: false
  }
];

export const IslamicDailyLifeGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState<'all' | 'morning' | 'daytime' | 'evening' | 'night'>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Lightweight Client-Side Daily Practice Checklist
  const todayStr = getLocalDateStr();
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('islamiq_daily_routine_checklist');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === todayStr && typeof parsed.items === 'object') {
          setCompletedItems(parsed.items);
        } else {
          // New day: reset checklist
          setCompletedItems({});
          localStorage.setItem('islamiq_daily_routine_checklist', JSON.stringify({ date: todayStr, items: {} }));
        }
      }
    } catch {
      setCompletedItems({});
    }
  }, [todayStr]);

  const toggleChecklistItem = (id: string) => {
    const updated = { ...completedItems, [id]: !completedItems[id] };
    setCompletedItems(updated);
    try {
      localStorage.setItem('islamiq_daily_routine_checklist', JSON.stringify({ date: todayStr, items: updated }));
    } catch {}
    showToast(updated[id] ? (isUrdu ? 'ماشاء اللہ! مکمل نشان زد ہوا' : 'Marked completed! (Alhamdulillah)') : (isUrdu ? 'نشان ہٹا دیا گیا' : 'Unchecked'));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(isUrdu ? 'متن کاپی کر لیا گیا!' : 'Text copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      SpeechEngine.stop();
      setIsSpeaking(false);
    } else {
      SpeechEngine.speak(
        text,
        contentLang,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleShare = () => {
    const shareTitle = isUrdu
      ? 'اسلامی روزمرہ زندگی: چوبیس گھنٹے کا مسنون معمول اور اخلاق | IslamIQ'
      : 'Islamic Daily Life: 24-Hour Sunnah Routine & Everyday Etiquette | IslamIQ';
    const shareUrl = 'https://www.learnislamiq.com/islamic-daily-life';

    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: shareTitle, url: shareUrl }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Page link copied to clipboard!');
    }
  };

  // Reused Verified Data Snippets
  const duaWaking = VERIFIED_DUAS.find(d => d.id === 'dua-5') || VERIFIED_DUAS[0];
  const duaSayyidIstighfar = VERIFIED_DUAS.find(d => d.id === 'dua-18') || VERIFIED_DUAS[1];
  const duaMorning = VERIFIED_DUAS.find(d => d.id === 'dua-36') || VERIFIED_DUAS[2];
  const duaEvening = VERIFIED_DUAS.find(d => d.id === 'dua-37') || VERIFIED_DUAS[3];
  const duaEating = VERIFIED_DUAS.find(d => d.id === 'dua-9') || VERIFIED_DUAS[4];
  const duaHome = VERIFIED_DUAS.find(d => d.id === 'dua-11') || VERIFIED_DUAS[5];
  const duaParents = VERIFIED_DUAS.find(d => d.id === 'dua-2') || VERIFIED_DUAS[6];
  const duaSleeping = VERIFIED_DUAS.find(d => d.id === 'dua-4') || VERIFIED_DUAS[7];

  const hadithIntentions = VERIFIED_HADITHS.find(h => h.id === 'hadith-1') || VERIFIED_HADITHS[0];
  const hadithSmile = VERIFIED_HADITHS.find(h => h.id === 'hadith-28' || h.lessonEn.includes('smile')) || VERIFIED_HADITHS[1];
  const reminderTongue = ISLAMIC_REMINDERS.find(r => r.id === 'rem-2') || ISLAMIC_REMINDERS[0];
  const reminderHalal = ISLAMIC_REMINDERS.find(r => r.id === 'rem-17') || ISLAMIC_REMINDERS[1];
  const versePatience = VERIFIED_QURAN_VERSES.find(v => v.id === 'verse-1') || VERIFIED_QURAN_VERSES[0];

  const faqs: FAQItem[] = [
    {
      question: isUrdu
        ? 'کیا روزمرہ کے تمام مسنون اذکار پڑھنا فرض ہے؟'
        : 'Are all daily Sunnah supplications and Adhkar obligatory (Fard)?',
      answer: isUrdu
        ? 'نہیں، پانچ وقت کی فرض نمازیں، حلال روزی کا اہتمام اور والدین و اہل خانہ کے حقوق ادا کرنا فرض ہیں۔ صبح و شام کے اذکار، مسنون دعائیں اور نوافل مستحب اور سنتِ نبوی ﷺ ہیں جن پر بے پناہ اجر و برکت ہے، لیکن ان کے چھوٹ جانے سے گناہ نہیں ہوتا۔'
        : 'No. The five daily prayers, earning Halal income, and fulfilling family/social obligations are obligatory (Fard). Morning/evening Adhkar and daily situational duas are highly rewarding Sunnah and Mustahabb (recommended) practices that bring immense barakah, but omitting them does not incur sin.'
    },
    {
      question: isUrdu
        ? 'اگر کام کی مصروفیات کے دوران اذکار چھوٹ جائیں تو کیا قضا کر سکتے ہیں؟'
        : 'If someone misses their morning Adhkar due to work, can they recite them later?',
      answer: isUrdu
        ? 'جی ہاں، صبح کے اذکار کا افضل ترین وقت فجر سے طلوعِ آفتاب تک ہے، لیکن زوالِ آفتاب (دوپہر) تک بھی پڑھے جا سکتے ہیں۔ اسی طرح شام کے اذکار عصر کے بعد سے لے کر رات تک پڑھے جا سکتے ہیں۔'
        : 'Yes. The prime time for morning Adhkar is between Fajr and sunrise, but scholars state they may be recited until midday. Similarly, evening Adhkar start after Asr and may be recited into the early night.'
    },
    {
      question: isUrdu
        ? 'دفتر یا بازار میں نماز ادا کرنے کے لیے کیا طہارت کافی ہے؟'
        : 'What are the minimum conditions for praying at the workplace or market?',
      answer: isUrdu
        ? 'نماز کی درستگی کے لیے باوضو ہونا، ستر کا ڈھانپا ہونا، جائے نماز کا پاک ہونا (کوئی بھی پاک چٹائی یا فرش) اور قبلہ رخ ہونا شرط ہے۔ اگر مسجد میسر نہ ہو تو دفتر میں صاف جگہ پر نماز ادا کی جا سکتی ہے۔'
        : 'The essential requirements are ritual purity (Wudu), covering the Awrah, ensuring the prayer spot is physically clean (any clean floor, mat, or jacket suffices), and facing the Qiblah. A formal mosque is not required if one is unavailable.'
    },
    {
      question: isUrdu
        ? 'سونے سے پہلے کا شرعی محاسبہ (Muhasabah) کیسے کیا جائے؟'
        : 'How does a Muslim practice bedtime self-reflection (Muhasabah)?',
      answer: isUrdu
        ? 'سونے سے قبل چند منٹ دن بھر کے اعمال پر غور کریں: فرائض کی ادائیگی پر اللہ کا شکر ادا کریں، دانستہ یا نادانستہ کوتاہی پر سچے دل سے استغفار کریں اور جن مسلمانوں سے تلخی ہوئی ہو انہیں اللہ کی خاطر معاف کر کے دل کو صاف کریں۔'
        : 'Spend 2-3 minutes reviewing the day: praise Allah for prayers and good deeds performed, seek forgiveness (Istighfar) for shortcomings or harsh words, and intentionally forgive anyone who offended you to sleep with a heart free of malice.'
    }
  ];

  const seoTitle = isUrdu
    ? 'اسلامی روزمرہ زندگی: چوبیس گھنٹے کا مسنون معمول، اذکار اور اخلاق | IslamIQ'
    : 'Islamic Daily Life: 24-Hour Sunnah Routine, Adhkar & Daily Etiquette | IslamIQ';

  const seoDescription = isUrdu
    ? 'صبح سے رات تک چوبیس گھنٹے کا مستند مسنون معمول: فجر، اذکار، حلال معیشت، خاندانی حقوق، شام کی دعائیں اور سنتِ نوم بمعہ چیک لسٹ۔'
    : 'Complete, authentic 24-hour Islamic daily routine covering Fajr, morning/evening Adhkar, Halal livelihood, family rights, Maghrib, and Sunnah sleep etiquette with verified references.';

  const completedCount = Object.values(completedItems).filter(Boolean).length;

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-14 animate-fadeIn font-sans">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/islamic-daily-life"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی روزمرہ زندگی' : 'Islamic Daily Life', url: '/islamic-daily-life' }
        ]}
        faqs={faqs}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-700/50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{isUrdu ? '۲۴ گھنٹے کا مسنون لائف اسٹائل' : '24-Hour Sunnah Lifestyle Hub'}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border border-white/10"
                title={isUrdu ? 'گائیڈ شیئر کریں' : 'Share Guide'}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {isUrdu
              ? 'اسلامی روزمرہ زندگی • چوبیس گھنٹے کا مسنون معمول'
              : 'Islamic Daily Life: 24-Hour Sunnah Routine & Everyday Etiquette'}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            {isUrdu
              ? 'صبح بیداری سے لے کر رات کے آرام تک ایک مومن کا پورا دن عبادت بن سکتا ہے۔ مستند احادیث، مسنون دعاؤں، حلال معیشت اور خاندانی حقوق کے ساتھ اپنی روزمرہ زندگی کو نبوی طریقے کے مطابق سنواریں۔'
              : 'From awakening to bedtime, every moment of a believer’s day can be transformed into continuous worship. Walk through verified prophetic routines across morning dawn, workplace ethics, family duties, and peaceful sleep.'}
          </p>

          {/* Quick Notice: Fard vs Sunnah distinction */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-emerald-200/90">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {isUrdu
                ? 'واضح شرعی فرق: پانچ فرض نمازیں اور حلال کمائی لازم ہیں، جبکہ اذکار و مسنون دعائیں اجر و برکت کی سنتیں ہیں۔'
                : 'Clarity of rulings: The 5 daily prayers and Halal earnings are obligatory (Fard), while situational Duas & Adhkar are blessed Sunnahs.'}
            </span>
          </div>
        </div>
      </header>

      {/* Lightweight Daily Practice Checklist */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-700" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {isUrdu ? 'آج کا ذاتی تربیتی جائزہ (Daily Reflection Checklist)' : 'Daily Practice & Sunnah Habits Checklist'}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isUrdu
                ? 'مقامی تقویم کے مطابق روزانہ خودکار ری سیٹ۔ یہ عادت سازی کے لیے ہے، فرض نمازوں کا خودکار ریکارڈ نہیں۔'
                : `Local calendar reset for ${todayStr}. Designed for personal habit tracking without replacing the Salah Tracker.`}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {completedCount} / {CHECKLIST_ITEMS.length} {isUrdu ? 'مکمل' : 'Checked'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CHECKLIST_ITEMS.map((item) => {
            const isDone = !!completedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/80 text-slate-700 hover:bg-slate-100/70'
                }`}
              >
                <button
                  type="button"
                  aria-label={item.titleEn}
                  className="mt-0.5 shrink-0 focus:outline-none"
                >
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-bold leading-tight ${isDone ? 'line-through text-emerald-800/80' : 'text-slate-800'}`}>
                      {isUrdu ? item.titleUrdu : item.titleEn}
                    </span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                      item.isFard ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                    }`}>
                      {item.isFard ? (isUrdu ? 'فرض' : 'Fard') : (isUrdu ? 'سنت' : 'Sunnah')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 leading-normal">
                    {isUrdu ? item.descUrdu : item.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative theological notice */}
        <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          {isUrdu
            ? 'توجہ: یہ چیک لسٹ محض ذاتی یاددہانی اور اخلاقی تربیت کا ٹول ہے۔ تقویٰ دل کی کیفیت کا نام ہے اور یہ فہرست کسی کی نیکی کا شرعی پیمانہ نہیں ہے۔'
            : 'Note: This checklist is solely a personal habit tool. Piety resides in the heart and this list is not an official measure of faith.'}
        </p>
      </section>

      {/* 4-Phase Filter Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        {[
          { key: 'all', labelEn: 'All 24 Hours', labelUrdu: 'تمام معمولات' },
          { key: 'morning', labelEn: '1. Morning (صبح و فجر)', labelUrdu: '۱. صبح و فجر' },
          { key: 'daytime', labelEn: '2. Daytime & Work (دن و کام کاج)', labelUrdu: '۲. دن و کام کاج' },
          { key: 'evening', labelEn: '3. Evening & Family (شام و اہل خانہ)', labelUrdu: '۳. شام و اہل خانہ' },
          { key: 'night', labelEn: '4. Night & Sleep (رات و سنتِ نوم)', labelUrdu: '۴. رات و سنتِ نوم' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActivePhaseFilter(tab.key as any)}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activePhaseFilter === tab.key
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isUrdu ? tab.labelUrdu : tab.labelEn}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 1. MORNING PHASE */}
      {/* ========================================================================= */}
      {(activePhaseFilter === 'all' || activePhaseFilter === 'morning') && (
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Sunrise className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {isUrdu ? 'مرحلہ اول • صبح و فجر' : 'Phase 1 • Dawn to Mid-Morning'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {isUrdu ? 'صبح کی بیداری، وضو اور نمازِ فجر' : 'Awakening, Purity & Fajr Prayer'}
                </h2>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              {isUrdu
                ? 'صبح کا آغاز رب کے شکر سے کریں۔ نبی اکرم ﷺ نے فرمایا: "ہماری امت کے لیے صبح کے ابتدائی اوقات میں برکت رکھی گئی ہے" (سنن الترمذی: ۱۲۱۲)۔ آنکھ کھلتے ہی کلمہ شکر ادا کرنا مومن کی پہلی سنت ہے۔'
                : 'Begin your day with grateful remembrance. The Messenger of Allah ﷺ supplicated: "O Allah, bless my Ummah in their early mornings" (Sunan at-Tirmidhi 1212). Awakening with remembrance anchors the soul in peace.'}
            </p>

            {/* Dua Card: Waking Up */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-600" />
                  {isUrdu ? duaWaking.titleUrdu : duaWaking.titleEn}
                </span>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                  {duaWaking.reference}
                </span>
              </div>
              <p className="arabic-text text-lg sm:text-xl text-slate-900 text-center py-2">
                {duaWaking.arabic}
              </p>
              <p className="text-xs text-slate-600 italic">
                {duaWaking.transliteration}
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {isUrdu ? duaWaking.translationUrdu : duaWaking.translationEn}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200/50">
                <button
                  onClick={() => handleSpeak(`${duaWaking.arabic}. ${isUrdu ? duaWaking.translationUrdu : duaWaking.translationEn}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>{isUrdu ? 'سنیں' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => handleCopy('dua-waking', `${duaWaking.arabic}\n\n${isUrdu ? duaWaking.translationUrdu : duaWaking.translationEn}\n— ${duaWaking.reference}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-amber-200 text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                >
                  {copiedId === 'dua-waking' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'dua-waking' ? (isUrdu ? 'کاپی شدہ' : 'Copied') : (isUrdu ? 'کاپی' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Quick Practical Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-extrabold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'وضو اور طہارت' : 'Wudu Purity'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? 'مسواک اور سنت کے مطابق وضو مکمل کریں تاکہ سستی دور ہو۔' : 'Perform thorough Sunnah Wudu with Miswak to dispel sluggishness.'}
                </p>
                <a
                  href="/how-to-perform-wudu"
                  onClick={(e) => { e.preventDefault(); setActiveTab('how-to-perform-wudu'); }}
                  className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 mt-2"
                >
                  <span>{isUrdu ? 'وضو گائیڈ کھولیں' : 'Wudu Guide'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-extrabold uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'نمازِ فجر (فرض)' : 'Fajr Prayer (Fard)'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? '۲ سنتِ موکدہ ادا کریں، پھر باجماعت یا وقت پر ۲ فرض ادا کریں۔' : 'Offer 2 Sunnah Muakkadah followed by the 2 obligatory Fard rakats.'}
                </p>
                <a
                  href="/salah"
                  onClick={(e) => { e.preventDefault(); setActiveTab('salah'); }}
                  className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 mt-2"
                >
                  <span>{isUrdu ? 'نماز ٹریکر کھولیں' : 'Salah Tracker'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-extrabold uppercase text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'صبح کے اذکار' : 'Morning Adhkar'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? 'آیت الکرسی، معوذتین اور سید الاستغفار کے ساتھ دن کی شروعات کریں۔' : 'Recite Ayat al-Kursi, the Muawwidhat, and Sayyid al-Istighfar.'}
                </p>
                <a
                  href="/daily-dua"
                  onClick={(e) => { e.preventDefault(); setActiveTab('daily-dua'); }}
                  className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 mt-2"
                >
                  <span>{isUrdu ? 'دعاؤں کا سیکشن' : 'Daily Duas Hub'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. DAYTIME & WORK PHASE */}
      {/* ========================================================================= */}
      {(activePhaseFilter === 'all' || activePhaseFilter === 'daytime') && (
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {isUrdu ? 'مرحلہ دوم • دن و معیشت' : 'Phase 2 • Midday, Work & Ethics'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {isUrdu ? 'حلال روزی، زبان کی حفاظت اور اخلاقیات' : 'Halal Livelihood, Speech & Integrity'}
                </h2>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              {isUrdu
                ? 'اسلام میں حلال روزی کمانا عبادت کا درجہ رکھتا ہے۔ رسول اللہ ﷺ نے فرمایا کہ سب سے پاکیزہ کمائی وہ ہے جو انسان اپنے ہاتھ سے محنت کر کے حاصل کرے اور جس میں دیانت داری ہو۔ سچی بات بولنا، وعدہ پورا کرنا اور ناپ تول میں کمی سے بچنا ہر مسلمان پر لازم ہے۔'
                : 'In Islam, working diligently for Halal sustenance is a form of worship. The Prophet ﷺ taught that the purest earnings come through honest labor and truthful dealings. Speaking the truth, honoring agreements, and treating clients and coworkers with integrity are essential duties.'}
            </p>

            {/* Hadith Banner: Intention in Daily Deeds */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  {isUrdu ? 'اعمال کا دارومدار نیتوں پر ہے' : 'Actions are Judged by Intentions'}
                </span>
                <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
                  {hadithIntentions.source} #{hadithIntentions.hadithNumber} ({hadithIntentions.grade})
                </span>
              </div>
              <p className="arabic-text text-base sm:text-lg text-slate-900 text-center py-1">
                {hadithIntentions.arabic}
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {isUrdu ? hadithIntentions.textUrdu : hadithIntentions.textEn}
              </p>
              <p className="text-xs text-slate-600 italic">
                {isUrdu ? hadithIntentions.lessonUrdu : hadithIntentions.lessonEn}
              </p>
            </div>

            {/* Eating Manners & Guarding the Tongue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>{isUrdu ? 'کھانے پینے کے مسنون آداب' : 'Sunnah Etiquettes of Meals'}</span>
                </div>
                <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                  <li>{isUrdu ? 'کھانے سے پہلے ہاتھ دھونا اور "بسم اللہ" پڑھنا۔' : 'Wash hands and recite Bismillah before eating.'}</li>
                  <li>{isUrdu ? 'دائیں ہاتھ سے کھانا اور اپنے سامنے سے لقمہ اٹھانا۔' : 'Eat with the right hand from what is closest to you.'}</li>
                  <li>{isUrdu ? 'کھانے میں عیب نہ نکالنا؛ پسند آئے تو کھائیں ورنہ خاموش رہیں۔' : 'Never criticize food; eat if desired or leave it graciously.'}</li>
                  <li>{isUrdu ? 'کھانے کے بعد اللہ کا شکر ادا کرنا اور مسنون دعا پڑھنا۔' : 'Conclude with praise and Alhamdulillah.'}</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Smile className="w-4 h-4 text-emerald-600" />
                  <span>{isUrdu ? 'زبان کی حفاظت اور مسکراہٹ' : 'Guarding the Tongue & Pleasantness'}</span>
                </div>
                <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                  <li>{isUrdu ? 'غیبت، چغلی، تمسخر اور جھوٹ سے مکمل پرہیز۔' : 'Abstain completely from backbiting, rumors, and mockery.'}</li>
                  <li>{isUrdu ? '"اپنے بھائی کے سامنے مسکرانا بھی صدقہ ہے" (الترمذی: ۱۹۵۶)۔' : 'Your smile for your brother is charity (Tirmidhi 1956).'}</li>
                  <li>{isUrdu ? 'غصے کے وقت خاموشی اختیار کرنا اور تعوذ پڑھنا۔' : 'Remain silent and seek refuge in Allah during anger.'}</li>
                  <li>{isUrdu ? 'ظہر اور عصر کی نماز وقت پر ادا کرنا۔' : 'Keep prompt prayer appointments for Dhuhr and Asr.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. EVENING & HOME LIFE PHASE */}
      {/* ========================================================================= */}
      {(activePhaseFilter === 'all' || activePhaseFilter === 'evening') && (
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Sunset className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  {isUrdu ? 'مرحلہ سوم • شام و اہل خانہ' : 'Phase 3 • Evening, Home & Family'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {isUrdu ? 'گھر واپسی، والدین کی خدمت اور حقوق العباد' : 'Home Return, Family Rights & Maghrib'}
                </h2>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              {isUrdu
                ? 'کام کے بعد گھر واپس آنا محبت اور سکون کا باعث ہونا چاہیے۔ گھر میں داخل ہوتے وقت سلام کرنا برکت لاتا ہے۔ والدین کے سامنے عاجزی، شریکِ حیات کے ساتھ شفقت اور بچوں کو وقت دینا عبادت کے برابر ہے۔'
                : 'Returning home should be a sanctuary of peace. The Sunnah teaches greeting your family with Salam upon entry to invite barakah. Honoring parents, speaking tenderly with your spouse, and listening patiently to children are sacred duties.'}
            </p>

            {/* Dua Card: Parents */}
            <div className="bg-teal-50/50 border border-teal-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-950 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-teal-700" />
                  {isUrdu ? duaParents.titleUrdu : duaParents.titleEn}
                </span>
                <span className="text-[10px] bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-full font-semibold">
                  {duaParents.reference}
                </span>
              </div>
              <p className="arabic-text text-lg sm:text-xl text-slate-900 text-center py-1">
                {duaParents.arabic}
              </p>
              <p className="text-xs text-slate-600 italic">
                {duaParents.transliteration}
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {isUrdu ? duaParents.translationUrdu : duaParents.translationEn}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-teal-200/50">
                <button
                  onClick={() => handleSpeak(`${duaParents.arabic}. ${isUrdu ? duaParents.translationUrdu : duaParents.translationEn}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isUrdu ? 'سنیں' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => handleCopy('dua-parents', `${duaParents.arabic}\n\n${isUrdu ? duaParents.translationUrdu : duaParents.translationEn}\n— ${duaParents.reference}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-teal-200 text-teal-900 hover:bg-teal-100 flex items-center gap-1"
                >
                  {copiedId === 'dua-parents' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'dua-parents' ? (isUrdu ? 'کاپی شدہ' : 'Copied') : (isUrdu ? 'کاپی' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Cross-Link to Rights in Islam Guide */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {isUrdu ? 'اسلام میں حقوق العباد کی جامع گائیڈ' : 'Rights in Islam (Huqooq-ul-Ibad) Guide'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isUrdu
                    ? 'والدین، اولاد، شریکِ حیات، پڑوسیوں اور مزدوروں کے حقوق قرآن و سنت کی روشنی میں۔'
                    : 'Detailed guidance on sacred obligations toward parents, spouses, children, neighbors, and workers.'}
                </p>
              </div>
              <a
                href="/rights-in-islam"
                onClick={(e) => { e.preventDefault(); setActiveTab('rights-in-islam'); }}
                className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95"
              >
                <span>{isUrdu ? 'حقوق العباد گائیڈ پڑھیں' : 'Explore Rights Guide'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. NIGHT & SLEEP PHASE */}
      {/* ========================================================================= */}
      {(activePhaseFilter === 'all' || activePhaseFilter === 'night') && (
        <section className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Moon className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                  {isUrdu ? 'مرحلہ چہارم • رات و سنتِ نوم' : 'Phase 4 • Isha, Rest & Muhasabah'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {isUrdu ? 'نمازِ عشاء، احتساب اور نیند کی مسنون سنتیں' : 'Isha Prayer, Self-Reflection & Sleep Sunnahs'}
                </h2>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>
              {isUrdu
                ? 'نمازِ عشاء اور وتر کے ساتھ دن کا شرعی اختتام کریں۔ بلاضرورت دیر تک جاگنے سے پرہیز کریں تاکہ فجر کی نماز آسانی سے ادا ہو سکے۔ سونے سے قبل اپنے بستر کو جھاڑنا، باوضو دائیں کروٹ سونا اور آیت الکرسی کی تلاوت کرنا نبوی سنت ہے۔'
                : 'Conclude your daily acts of worship with Isha and Witr. Avoid unproductive late-night idling to protect your Fajr awakening. The Sunnah teaches dusting the bed, sleeping in a state of Wudu on the right side, and reciting Ayat al-Kursi before sleep.'}
            </p>

            {/* Dua Card: Sleeping */}
            <div className="bg-indigo-50/50 border border-indigo-200/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-700" />
                  {isUrdu ? duaSleeping.titleUrdu : duaSleeping.titleEn}
                </span>
                <span className="text-[10px] bg-indigo-200/80 text-indigo-900 px-2 py-0.5 rounded-full font-semibold">
                  {duaSleeping.reference}
                </span>
              </div>
              <p className="arabic-text text-lg sm:text-xl text-slate-900 text-center py-1">
                {duaSleeping.arabic}
              </p>
              <p className="text-xs text-slate-600 italic">
                {duaSleeping.transliteration}
              </p>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                {isUrdu ? duaSleeping.translationUrdu : duaSleeping.translationEn}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-indigo-200/50">
                <button
                  onClick={() => handleSpeak(`${duaSleeping.arabic}. ${isUrdu ? duaSleeping.translationUrdu : duaSleeping.translationEn}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-indigo-200 text-indigo-900 hover:bg-indigo-100 flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{isUrdu ? 'سنیں' : 'Listen'}</span>
                </button>
                <button
                  onClick={() => handleCopy('dua-sleeping', `${duaSleeping.arabic}\n\n${isUrdu ? duaSleeping.translationUrdu : duaSleeping.translationEn}\n— ${duaSleeping.reference}`)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white border border-indigo-200 text-indigo-900 hover:bg-indigo-100 flex items-center gap-1"
                >
                  {copiedId === 'dua-sleeping' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'dua-sleeping' ? (isUrdu ? 'کاپی شدہ' : 'Copied') : (isUrdu ? 'کاپی' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Bedtime Sunnah Practices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'طہارت اور دائیں کروٹ' : 'Wudu & Right Side'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? 'باوضو بستر پر جائیں اور دایاں ہاتھ رخسار کے نیچے رکھ کر دائیں جانب لیٹیں۔' : 'Sleep with Wudu and place the right hand under the cheek.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'حفاظتی سورتیں' : 'Protective Surahs'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? 'سورۃ الاخلاص، الفلق اور الناس ۳ بار پڑھ کر ہاتھوں پر دم کر کے جسم پر پھیریں۔' : 'Recite Surahs Ikhlas, Falaq, and Naas 3 times, blowing over the body.'}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  {isUrdu ? 'معافی اور نیتِ فجر' : 'Forgiveness & Fajr'}
                </span>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                  {isUrdu ? 'سب کو دل سے معاف کریں اور فجر کی بروقت بیداری کی پختہ نیت کریں۔' : 'Forgive all who wronged you and set a firm intention for Fajr.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      {/* ========================================================================= */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {isUrdu ? 'اکثر پوچھے گئے سوالات (Daily Life FAQs)' : 'Frequently Asked Questions on Daily Islamic Life'}
          </h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedFaqIndex(isExpanded ? null : idx)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {faq.question}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-3.5 text-xs sm:text-sm text-slate-600 bg-white border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Islamic Learning Navigation Links */}
      <RelatedIslamicLearning currentTab="islamic-daily-life" />
    </article>
  );
};

export default IslamicDailyLifeGuide;

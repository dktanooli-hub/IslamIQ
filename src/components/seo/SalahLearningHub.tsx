import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { CheckSquare, Clock, Heart, ShieldCheck, Sparkles, BookOpen, Compass, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Droplets } from 'lucide-react';

export const SalahLearningHub: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const prayers = [
    {
      nameUrdu: 'فجر (Fajr)',
      nameEn: 'Fajr',
      rakats: isUrdu ? '2 سنت مؤکدہ + 2 فرض = 4 رکعتیں' : '2 Sunnah Muakkadah + 2 Fard = 4 Rakats',
      timeUrdu: 'صبح صادق سے طلوع آفتاب سے پہلے تک',
      timeEn: 'From true dawn until just before sunrise',
      descUrdu: 'دن کا آغاز اللہ تعالیٰ کے حضور سجدہ شکر سے ہوتا ہے، جس سے پورے دن میں برکت اور حفاظت نصیب ہوتی ہے۔',
      descEn: 'The dawn prayer marks the beginning of the day in devotion to Allah, granting divine peace and light for the day.',
    },
    {
      nameUrdu: 'ظہر (Dhuhr)',
      nameEn: 'Dhuhr',
      rakats: isUrdu ? '4 سنت مؤکدہ + 4 فرض + 2 سنت مؤکدہ + 2 نفل = 12 رکعتیں' : '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl = 12 Rakats',
      timeUrdu: 'زوالِ آفتاب کے فوراً بعد سے شروع ہوتا ہے',
      timeEn: 'Shortly after the sun passes its zenith until Asr',
      descUrdu: 'دن کے مصروف اوقات میں دنیاوی کاموں سے وقفہ لے کر خالقِ کائنات کی یاد دل کو سکون عطا کرتی ہے۔',
      descEn: 'A midday spiritual pause reminding believers of their ultimate purpose amidst daily busy routines.',
    },
    {
      nameUrdu: 'عصر (Asr)',
      nameEn: 'Asr',
      rakats: isUrdu ? '4 سنت غیر مؤکدہ + 4 فرض = 8 رکعتیں' : '4 Sunnah Ghair-Muakkadah + 4 Fard = 8 Rakats',
      timeUrdu: 'ہر چیز کا سایہ دوگنا ہونے سے غروب آفتاب تک',
      timeEn: 'Late afternoon until shortly before sunset',
      descUrdu: 'قرآن کریم میں صلاۃِ وسطیٰ (درمیانی نماز) کی خصوصی تاکید فرمائی گئی ہے، جو کہ نمازِ عصر ہے۔',
      descEn: 'The middle prayer highlighted in Surah Al-Baqarah for special steadfastness and protection from neglect.',
    },
    {
      nameUrdu: 'مغرب (Maghrib)',
      nameEn: 'Maghrib',
      rakats: isUrdu ? '3 فرض + 2 سنت مؤکدہ + 2 نفل = 7 رکعتیں' : '3 Fard + 2 Sunnah + 2 Nafl = 7 Rakats',
      timeUrdu: 'غروب آفتاب کے فوراً بعد سے شفق غائب ہونے تک',
      timeEn: 'Immediately after sunset until the twilight disappears',
      descUrdu: 'سورج غروب ہونے کے بعد اللہ تعالیٰ کی نعمتوں اور دن کے اختتام پر شکر گزاری کا بہترین ذریعہ۔',
      descEn: 'Offered right after the sun sets, expressing gratitude for the day’s blessings and sustaining guidance.',
    },
    {
      nameUrdu: 'عشاء (Isha) و وتر',
      nameEn: 'Isha & Witr',
      rakats: isUrdu ? '4 سنت + 4 فرض + 2 سنت + 2 نفل + 3 وتر + 2 نفل = 17 رکعتیں' : '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl = 17 Rakats',
      timeUrdu: 'شفق غائب ہونے سے لے کر آدھی رات تک (فجر سے پہلے)',
      timeEn: 'Nighttime after twilight until the early dawn',
      descUrdu: 'رات کے وقت عشاء اور وتر کی ادائیگی دن کا پرسکون اور بابرکت اختتام ہے۔',
      descEn: 'The final night prayer concluding the day with serenity, followed by the Witr prayer.',
    },
  ];

  const essentials = [
    {
      titleUrdu: 'نماز کی شرائط (Pre-requisites / Shuroot):',
      titleEn: 'Prerequisites of Salah (Shuroot):',
      pointsUrdu: [
        'طہارت (وضو یا ضرورت کی صورت میں غسل)',
        'بدن، کپڑوں اور جائے نماز کی پاکیزگی',
        'ستر کا چھپانا (لباس کا باحیاء ہونا)',
        'قبلہ رخ ہونا (کعبۃ اللہ کی سمت)',
        'نماز کا وقت ہونا',
        'دل سے نیت کرنا',
      ],
      pointsEn: [
        'Purification (Wudu or Ghusl when required)',
        'Cleanliness of body, clothes, and prayer spot',
        'Covering the Awrah appropriately',
        'Facing the Qiblah (Direction of the Kaaba)',
        'Ascertaining the entry of the prayer time',
        'Sincere intention (Niyyah) in the heart',
      ],
    },
    {
      titleUrdu: 'نماز کے بنیادی ارکان و فرائض (Arkaan of Salah):',
      titleEn: 'Core Pillars (Arkan) of Salah:',
      pointsUrdu: [
        'تکبیرِ تحریمہ (اللہ اکبر کہہ کر نماز شروع کرنا)',
        'قیام (طاقت ہو تو سیدھا کھڑا ہونا)',
        'قراءت (سورۃ الفاتحہ اور قرآن کی تلاوت)',
        'رکوع اور اطمینان کے ساتھ اٹھنا',
        'دونوں سجدے اور دونوں کے درمیان بیٹھنا (جلسہ)',
        'قعدہ اخیرہ اور تشہد پڑھنا',
        'سلام پھیرنا',
      ],
      pointsEn: [
        'Takbirat al-Ihram (commencing with Allahu Akbar)',
        'Qiyam (standing upright for those capable)',
        'Recitation of Surah Al-Fatihah and Quran',
        'Ruku (bowing down with composure)',
        'Sujud (prostration upon the 7 bones) & Jalsah',
        'Final Sitting (Qa\'dah) and Tashahhud',
        'Tasleem (concluding greetings of peace)',
      ],
    },
  ];

  const educationalFaqs = [
    {
      qEn: "What is the distinction between Fard, Sunnah Mu'akkadah, and Nafl prayers?",
      qUrdu: "فرض، سنت مؤکدہ اور نفل نمازوں میں کیا فرق ہے؟",
      aEn: "Fard prayers are strictly obligatory by divine command; neglecting them without a valid excuse is a major sin. Sunnah Mu'akkadah prayers were continuously observed by Prophet Muhammad ﷺ without abandonment except on rare journeys; performing them earns great reward, while habitual neglect is blameworthy. Nafl (voluntary) prayers are optional acts of devotion that earn immense extra rewards and compensate for deficiencies in obligatory worship on the Day of Judgment.",
      aUrdu: "فرض نمازیں قطعی حکمِ خداوندی ہیں، جن کا جان بوجھ کر چھوڑنا کبیرہ گناہ ہے۔ سنتِ مؤکدہ وہ نمازیں ہیں جن پر رسول اللہ ﷺ نے ہمیشہ ہمیشگی فرمائی اور بغیر عذر کبھی ترک نہیں کیں؛ ان کا پڑھنا باعثِ عظیم اجر اور مستقل چھوڑنا سخت ناپسندیدہ ہے۔ نفل نمازیں اختیاری نیکی ہیں جن کے پڑھنے پر بے پایاں ثواب ملتا ہے اور قیامت کے دن یہ فرائض کی کوتاہیوں کا ازالہ کریں گی۔",
      ref: "Sharh Sahih Muslim by Imam al-Nawawi; Jami' at-Tirmidhi 413"
    },
    {
      qEn: "What should a believer do if they accidentally missed a prayer time (Qada)?",
      qUrdu: "اگر کسی عذر سے نماز قضا ہو جائے تو کیا حکم ہے؟",
      aEn: "If a prayer was missed due to genuine sleep or forgetfulness, the Prophet ﷺ commanded: 'Whoever forgets a prayer or sleeps through it, its expiation is to pray it as soon as he remembers it' (Sahih al-Bukhari 597; Sahih Muslim 684). One must offer the missed Fard rakats promptly without undue delay.",
      aUrdu: "اگر نیند یا بھول چوک کی وجہ سے نماز کا وقت نکل جائے، تو نبی کریم ﷺ کا ارشاد ہے: 'جو شخص نماز بھول جائے یا سوتا رہ جائے، تو اس کا کفارہ یہ ہے کہ جب بھی یاد آئے فوراً اسے ادا کرے' (صحیح بخاری: ۵۹۷، صحیح مسلم: ۶۸۴)۔ بیدار ہوتے یا یاد آتے ہی قضا فرض ادا کرنا ضروری ہے۔",
      ref: "Sahih al-Bukhari 597; Sahih Muslim 684"
    },
    {
      qEn: "What are the prohibited times for voluntary prayers (Awqat al-Nahy)?",
      qUrdu: "کن اوقات میں نفل نماز پڑھنا منع ہے (مکروہ اوقات)؟",
      aEn: "Voluntary prayers (Nawafil) are prohibited during three specific intervals: 1) From dawn until the sun has completely risen by a spear's length (about 15-20 minutes post-sunrise), 2) When the sun is directly at its zenith (Istawa/Zawal) until it begins to decline, and 3) After the Asr prayer until the sun has fully set.",
      aUrdu: "احادیثِ مبارکہ کے مطابق تین اوقات میں نفل نماز ادا کرنا ممنوع ہے: ۱) طلوعِ آفتاب کے وقت سے لے کر سورج کے ایک نیزہ بلند ہونے تک (طلوع کے بعد تقریباً ۱۵ سے ۲۰ منٹ)، ۲) عین دوپہر (زوال کے وقت) جب سورج نصف النہار پر ہو، اور ۳) نمازِ عصر کے بعد سے لے کر سورج کے مکمل غروب ہونے تک۔",
      ref: "Sahih Muslim 831, 832; Sunan Abi Dawud 1277"
    },
    {
      qEn: "How does a traveler pray when on a journey (Qasr and Jam')?",
      qUrdu: "سفر کے دوران نماز میں قصر اور جمع کرنے کا کیا شرعی طریقہ ہے؟",
      aEn: "Islam provides divine leniency for travelers. Four-rakat obligatory prayers (Dhuhr, Asr, and Isha) are shortened to two rakats (Qasr), based on Surah An-Nisa (4:101) and established Sunnah. Fajr (2 rakats) and Maghrib (3 rakats) are never shortened. Under conditions of active travel, combining Dhuhr with Asr, and Maghrib with Isha (Jam') is also permissible according to the authentic practice of the Prophet ﷺ.",
      aUrdu: "شریعت نے مسافر کے لیے خصوصی آسانی فرمائی ہے۔ سفرِ شرعی کے دوران چار رکعت والی فرض نمازیں (ظہر، عصر اور عشاء) دو دو رکعت (قصر) پڑھی جاتی ہیں، جیسا کہ سورۃ النساء (۴:۱۰۱) میں ارشاد ہے۔ فجر (۲ رکعت) اور مغرب (۳ رکعت) میں کوئی کمی نہیں ہوتی۔ حالتِ سفر میں حسبِ ضرورت ظہر و عصر اور مغرب و عشاء کو جمع کرنا بھی سنتِ نبوی سے ثابت ہے۔",
      ref: "Surah An-Nisa 4:101; Sahih al-Bukhari 1090; Sahih Muslim 686"
    }
  ];

  const seoTitle = isUrdu
    ? 'نماز سیکھیں • اوقات، ارکان، فرائض اور طریقہ | IslamIQ'
    : 'Namaz & Salah Learning – How to Pray, Rakats & Timings | IslamIQ';

  const seoDescription = isUrdu
    ? 'نماز کا مکمل طریقہ، 5 وقت کی نماز کی رکعتیں، شرائط، فرائض، وضو کے احکام اور روزانہ کی نماز کی پابندی کا آسان طریقہ۔'
    : 'Comprehensive Islamic guide to learning Namaz (Salah). Discover step-by-step prayer methods, rakats for all 5 daily prayers, prerequisites, and our daily interactive prayer tracker.';

  const faqsForSchema = educationalFaqs.map((p) => ({
    question: isUrdu ? p.qUrdu : p.qEn,
    answer: isUrdu ? `${p.aUrdu} (حوالہ: ${p.ref})` : `${p.aEn} (Reference: ${p.ref})`,
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/salah-learning"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'نماز سیکھیں' : 'Salah Learning', url: '/salah-learning' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'نماز سیکھیں: اوقات، ارکان، فرائض اور مکمل رہنمائی' : 'Namaz & Salah Learning: Timings, Rakats, Prerequisites & Essential Rites',
          description: seoDescription,
          datePublished: '2026-09-15',
          dateModified: '2026-10-02',
        }}
      />

      {/* Hero */}
      <header className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'دین کا دوسرا ستون' : 'The Second Pillar of Islam'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'نماز سیکھیں (Namaz & Salah Learning)' : 'Namaz & Salah Learning Hub – Essential Prayer Reference'}
        </h1>

        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl">
          {isUrdu
            ? 'نماز دین کا ستون اور مؤمن کی معراج ہے۔ پانچ وقت کی فرض نمازوں کی رکعتیں، اوقات، شرائط اور روزانہ کی پابندی کے لیے رہنمائی حاصل کریں۔'
            : 'Explore the foundations, rakats, prerequisites, and spiritual discipline of the five daily prayers in Islam. Use our interactive daily tracker to never miss a prayer.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('salah')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <CheckSquare className="w-4 h-4" />
            <span>{isUrdu ? 'نماز ٹریکر کھولیں (Track Salah)' : 'Open Interactive Salah Tracker'}</span>
          </button>
          <a
            href="/qibla"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('qibla');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 font-semibold text-xs rounded-xl transition-all border border-emerald-400/20 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'قبلہ رخ معلوم کریں' : 'Find Qibla Direction'}</span>
          </a>
        </div>
      </header>

      {/* Educational Introduction & What This Page Provides */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'صفحے کا مقصد اور تعلیمی خاکہ' : 'What This Salah Learning Hub Provides'}</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
          {isUrdu
            ? 'نماز اسلام کا سب سے اہم عملی رکن اور بندے کا اپنے رب سے براہ راست تعلق ہے۔ اس لرننگ ہب کا مقصد مسلمانوں کو پانچ وقت کی فرض، سنت اور نفل نمازوں کی مکمل رکعتوں، اوقات، نماز کی صحت کی شرائط اور ارکان کی مستند معلومات فراہم کرنا ہے۔ ذیل میں ہر نماز کی تفصیل اور مکمل عملی گائیڈز کے لنکس دیے گئے ہیں۔'
            : 'Welcome to the IslamIQ Salah Learning Hub. Salah (the formal Islamic prayer) is the second pillar of Islam and the direct spiritual conversation between a servant and their Creator. This educational hub provides a structured breakdown of all five daily prayers, distinguishing obligatory (Fard) units from emphasized Sunnah (Muakkadah) and optional voluntary (Nafl) units. Below you will also find step-by-step guides for physical postures, ablution (Wudu), and beginners.'}
        </p>

        {/* Foundational Quran & Hadith Citation Box */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
          <p className="font-arabic text-right text-base sm:text-lg text-emerald-950 font-bold leading-relaxed" dir="rtl">
            «وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ»
          </p>
          <p className="text-xs sm:text-sm text-emerald-900 font-medium">
            {isUrdu
              ? 'اور نماز قائم کرو اور زکوٰۃ ادا کرو اور رکوع کرنے والوں کے ساتھ رکوع کرو۔'
              : 'And establish prayer and give Zakat and bow with those who bow [in worship and obedience].'}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Surah Al-Baqarah (2:43) • سورۃ البقرۃ: ۴۳
          </span>
        </div>
      </section>

      {/* Crawlable High-Value Deep Guide Links */}
      <section className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مکمل نماز و وضو گائیڈز' : 'Complete Prayer & Ablution Guides'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'نماز اور طہارت کے مکمل عملی طریقے دریافت کریں' : 'Master Prayer Postures, Wudu & Beginner Rites'}
          </h2>
          <p className="text-xs text-emerald-100 max-w-xl">
            {isUrdu
              ? 'تکبیر تحریمہ سے سلام تک نماز کا مسنون طریقہ، مکمل وضو کی سنتیں اور نو مسلموں کے لیے ابتدائی رہنمائی۔'
              : 'Access our specialized reference guides with verified Hadith citations and phonetic transliterations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="/how-to-perform-salah"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('how-to-perform-salah');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
                <span>{isUrdu ? 'جامع ریفرنس' : 'Reference Manual'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? 'نماز کا مکمل طریقہ' : 'How to Perform Salah'}
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'ارکان، واجبات، سنتوں اور سجدہ سہو کا تفصیلی بیان۔' : 'Full manual covering Arkan, Wajibat, Sunan postures, and corrections.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 underline mt-3">
              {isUrdu ? 'گائیڈ پڑھیں ←' : 'Read Guide →'}
            </span>
          </a>

          <a
            href="/how-to-perform-wudu"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('how-to-perform-wudu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-teal-300 font-bold mb-1">
                <span>{isUrdu ? 'طہارت و وضو' : 'Purification'}</span>
                <Droplets className="w-3.5 h-3.5 text-teal-400" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? 'وضو کا مسنون طریقہ' : 'How to Perform Wudu'}
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'وضو کے ۴ فرائض، سنتیں، دعائیں اور وضو توڑنے والی چیزیں۔' : 'The 4 Quranic obligations, complete Sunnah steps, and nullifiers.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-200 underline mt-3">
              {isUrdu ? 'وضو گائیڈ پڑھیں ←' : 'Read Wudu Guide →'}
            </span>
          </a>

          <a
            href="/salah-for-beginners"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('salah-for-beginners');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-1">
                <span>{isUrdu ? 'ابتدائی سیکھنے والے' : 'Beginners / Reverts'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? 'ابتدائی نماز گائیڈ' : 'Salah for Beginners'}
              </h3>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'نو مسلموں کے لیے آسان صوتی تلفظ اور تسلی بخش رہنمائی۔' : 'Phonetic transliterations, reassurance for worries, and simple steps.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-200 underline mt-3">
              {isUrdu ? 'ابتدائی گائیڈ پڑھیں ←' : 'Beginner Guide →'}
            </span>
          </a>
        </div>
      </section>

      {/* 5 Daily Prayers Breakdown */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'پانچوں نمازوں کی تفصیل و رکعتیں' : 'The Five Daily Prayers & Rakats Breakdown'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-3.5">
          {prayers.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-black">
                    {idx + 1}
                  </span>
                  <span>{isUrdu ? p.nameUrdu : p.nameEn}</span>
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                  {p.rakats}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p>
                  <strong>{isUrdu ? 'اوقات: ' : 'Time Window: '}</strong>
                  <span className="text-slate-700">{isUrdu ? p.timeUrdu : p.timeEn}</span>
                </p>
                <p className="leading-relaxed text-slate-500">
                  {isUrdu ? p.descUrdu : p.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prerequisites & Arkan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {essentials.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-emerald-900 border-b border-slate-100 pb-2">
              {isUrdu ? item.titleUrdu : item.titleEn}
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
              {(isUrdu ? item.pointsUrdu : item.pointsEn).map((pt, pIdx) => (
                <li key={pIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Useful Fiqh FAQ Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'اکثر پوچھے جانے والے شرعی سوالات (Salah FAQs)' : 'Frequently Asked Questions on Prayer (Salah FAQs)'}</span>
        </div>

        <div className="space-y-3">
          {educationalFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 transition-colors"
                >
                  <span>{isUrdu ? faq.qUrdu : faq.qEn}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
                      {isUrdu ? 'شرعی حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};

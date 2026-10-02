import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Compass,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Share2,
  Heart,
  Layers,
  MapPin
} from 'lucide-react';

export const HajjUmrahGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isUrdu
          ? 'حج اور عمرہ کی مکمل گائیڈ • احرام، طواف، سعی اور ارکانِ حج'
          : 'Hajj & Umrah Complete Guide: Step-by-Step Rites, Rules & Duas | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const hajjStages = [
    {
      dayEn: "1. Entering Ihram at the Miqat",
      dayUrdu: "۱. میقات سے احرام باندھنا",
      timingEn: "Before crossing the designated boundary (Miqat)",
      timingUrdu: "میقات کی سرحد پار کرنے سے پہلے",
      descEn: "Cleanse yourself by performing Ghusl, clipping nails, and applying perfume to the body (not the garments). Men wear two white unstitched sheets (Izar and Rida); women wear modest, regular clothes without covering their faces or hands with Niqab/gloves. Make the formal intention (Niyyah) for Hajj/Umrah and chant the sacred Talbiyah continuously.",
      descUrdu: "غسل کر کے بدن پر خوشبو لگائیں (کپڑوں پر نہیں)۔ مرد دو سفید غیر سلے چادروں (تہبند اور چادر) کا احرام پہنیں اور خواتین عام باوقار لباس زیب تن کریں لیکن چہرے اور ہاتھوں پر نقاب و دستانے نہ پہنیں۔ دل سے نیت کر کے بلند آواز سے تلبیہ پکاریں۔",
      keyRef: "Sahih al-Bukhari 1524; Sahih Muslim 1177"
    },
    {
      dayEn: "2. Day of Tarwiyah in Mina (8th Dhul Hijjah)",
      dayUrdu: "۲. یوم الترویہ: منیٰ کی خیمہ بستی میں قیام (۸ ذوالحجہ)",
      timingEn: "8th Dhul Hijjah",
      timingUrdu: "۸ ذوالحجہ",
      descEn: "Pilgrims move to the tent city of Mina in the morning. Offer Dhuhr, Asr, Maghrib, Isha, and the next day's Fajr prayers shortened (Qasr, 2 rakats each for 4-rakat prayers) but not combined, spending the night in prayer, contemplation, and reciting the Talbiyah.",
      descUrdu: "حجاج کرام صبح منیٰ کی طرف روانہ ہوتے ہیں۔ ظہر، عصر، مغرب، عشاء اور اگلے دن کی فجر کی نمازیں اپنے اپنے اوقات میں قصر کے ساتھ ادا کرتے ہیں اور رات ذکر و دعا میں گزارتے ہیں۔",
      keyRef: "Sahih Muslim 1218 (Hadith of Jabir RA)"
    },
    {
      dayEn: "3. Day of Arafah — The Climax of Hajj (9th Dhul Hijjah)",
      dayUrdu: "۳. یومِ عرفہ: حج کا سب سے بڑا رکن (۹ ذوالحجہ)",
      timingEn: "9th Dhul Hijjah (From zenith to sunset)",
      timingUrdu: "۹ ذوالحجہ (زوال سے لے کر غروبِ آفتاب تک)",
      descEn: "The essential pillar of Hajj without which Hajj is invalid («الْحَجُّ عَرَفَةُ»). Pilgrims gather on the plains of Arafah after sunrise. Combine Dhuhr and Asr in the early afternoon, then stand (Wuquf) in humble, tearful supplication facing Qibla until sunset, seeking Allah's complete forgiveness.",
      descUrdu: "رسول اللہ ﷺ نے فرمایا: 'حج تو بس عرفات ہی ہے'۔ حجاج میدانِ عرفات پہنچ کر ظہر اور عصر ملا کر پڑھتے ہیں، پھر غروبِ آفتاب تک قبلہ رخ کھڑے ہو کر گڑگڑا کر توبہ اور دعاؤں میں مشغول رہتے ہیں۔",
      keyRef: "Jami' at-Tirmidhi 889 (Graded Sahih); Sahih Muslim 1348"
    },
    {
      dayEn: "4. Night in Muzdalifah & Gathering Pebbles",
      dayUrdu: "۴. مزدلفہ کی کھلے آسمان تلے رات اور کنکریاں چننا",
      timingEn: "Evening of 9th to Dawn of 10th Dhul Hijjah",
      timingUrdu: "۹ ذوالحجہ کی شام تا ۱۰ ذوالحجہ کی فجر",
      descEn: "After sunset, without praying Maghrib in Arafah, pilgrims proceed with calm dignity to Muzdalifah. Combine Maghrib (3 rakats) and Isha (2 rakats) with one Adhan and two Iqamahs upon arrival. Sleep under the open sky and collect 49-70 small pea-sized pebbles for the stoning ritual (Rami).",
      descUrdu: "غروبِ آفتاب کے بعد وقار کے ساتھ مزدلفہ پہنچتے ہیں اور مغرب و عشاء کی نمازیں ایک اذان اور دو اقامتوں سے ملا کر ادا کرتے ہیں۔ کھلے آسمان تلے رات بسر کرتے ہیں اور رمی کے لیے چنے کے برابر کنکریاں چنتے ہیں۔",
      keyRef: "Sahih al-Bukhari 1674; Sahih Muslim 1280"
    },
    {
      dayEn: "5. Day of Nahr (Eid al-Adha, 10th Dhul Hijjah)",
      dayUrdu: "۵. یوم النحر: عید الاضحیٰ، رمی، قربانی اور حلق (۱۰ ذوالحجہ)",
      timingEn: "10th Dhul Hijjah",
      timingUrdu: "۱۰ ذوالحجہ",
      descEn: "The busiest day of Hajj: 1) Stone Jamrat al-Aqabah (the Big Pillar) with 7 pebbles reciting 'Allahu Akbar' with each throw, 2) Offer the sacrificial animal (Hady/Qurbani), 3) Shave the head (Halq, for men - most rewarded) or trim one inch (Qasr, for men/women), which grants First Tahallul (releasing all Ihram restrictions except marital intimacy), 4) Perform Tawaf al-Ifadah and Sa'i in Makkah.",
      descUrdu: "حج کا سب سے اہم دن: ۱) جمرۂ عقبہ (بڑے شیطان) کو تکبیر کے ساتھ ۷ کنکریاں مارنا، ۲) قربانی کرنا، ۳) سر منڈوانا (حلق) یا بال کتروانا (قصر)، جس سے احرام کھل جاتا ہے (تحللِ اصغر)، اور ۴) مکہ مکرمہ جا کر طوافِ زیارت اور سعی ادا کرنا۔",
      keyRef: "Sahih al-Bukhari 1727; Sahih Muslim 1302"
    },
    {
      dayEn: "6. Days of Tashreeq in Mina & Farewell Tawaf (11th – 13th)",
      dayUrdu: "۶. ایامِ تشریق: منیٰ میں تینوں جمرات کی رمی اور طوافِ وداع",
      timingEn: "11th, 12th, and optional 13th Dhul Hijjah",
      timingUrdu: "۱۱، ۱۲ اور ۱۳ ذوالحجہ",
      descEn: "Stay in Mina. Each afternoon after Zawal, stone all three pillars (Jamrat al-Sughra, al-Wusta, and al-Aqabah) with 7 pebbles each (21 total per day), making dua after the first two. Before departing Makkah to return home, perform Tawaf al-Wada' (Farewell Tawaf) around the Ka'bah.",
      descUrdu: "منیٰ میں قیام کے دوران ہر روز زوال کے بعد تینوں جمرات (چھوٹا، درمیانہ اور بڑا شیطان) کو ۷، ۷ کنکریاں مارنا۔ مکہ مکرمہ سے وطن واپسی سے قبل کعبۃ اللہ کا الوداعی طواف (طوافِ وداع) کرنا واجب ہے۔",
      keyRef: "Surah Al-Baqarah 2:203; Sahih al-Bukhari 1751"
    }
  ];

  const umrahSteps = [
    {
      step: 1,
      titleEn: "Ihram from Miqat",
      titleUrdu: "میقات سے احرام باندھنا",
      descEn: "Ghusl, wearing Ihram garments, making Niyyah: 'Labbayka Allahumma Umrah', and chanting Talbiyah.",
      descUrdu: "غسل، احرام کی چادریں، عمرہ کی نیت اور تلبیہ کا ورد کرنا۔"
    },
    {
      step: 2,
      titleEn: "Tawaf al-Umrah (7 Circuits)",
      titleUrdu: "طوافِ عمرہ (کعبہ کے ۷ چکر)",
      descEn: "Walk 7 circuits around the Ka'bah counter-clockwise starting from the Black Stone line, praying 2 rakats behind Maqam Ibrahim.",
      descUrdu: "حجرِ اسود سے شروع کر کے کعبۃ اللہ کے ۷ چکر لگانا اور مقامِ ابراہیم کے پیچھے دو رکعت نماز پڑھنا۔"
    },
    {
      step: 3,
      titleEn: "Sa'i Between Safa & Marwah (7 Rounds)",
      titleUrdu: "صفا اور مروہ کے درمیان سعی (۷ چکر)",
      descEn: "Begin at Mount Safa and finish at Marwah (7 trips: Safa to Marwah is 1, Marwah to Safa is 2).",
      descUrdu: "صفا سے شروع کر کے مروہ تک جانا ایک چکر؛ مروہ سے صفا دوسرا، یوں ساتویں چکر پر مروہ پر سعی مکمل ہوتی ہے۔"
    },
    {
      step: 4,
      titleEn: "Halq or Qasr (Shaving / Trimming)",
      titleUrdu: "حلق یا قصر (سر کے بال کٹوانا)",
      descEn: "Men shave (Halq) or cut hair evenly (Qasr); women cut a fingertip length (approx 1 inch) from the bottom of their hair. Umrah is complete.",
      descUrdu: "مرد سر منڈوائیں یا بال کتروائیں؛ خواتین بالوں کی لٹ سے انگلی کے پورے برابر کٹوائیں، جس سے عمرہ مکمل اور احرام ختم ہو جاتا ہے۔"
    }
  ];

  const hajjFaqs = [
    {
      qEn: "What are the core prohibited acts while in the state of Ihram?",
      qUrdu: "حالتِ احرام میں کون سے اعمال سخت ممنوع اور حرام ہیں؟",
      aEn: "While in Ihram, pilgrims must avoid: 1) Cutting hair or clipping nails, 2) Applying perfume or scented soaps to body or garments, 3) For men: wearing sewn/fitted garments (like shirts, pants, underwear) and covering the head, 4) For women: covering the face with a tight Niqab or wearing gloves, 5) Engaging in marital intimacy or flirting (Rafath), 6) Committing sins or arguing/quarreling (Fusuq and Jidal), and 7) Hunting wild land animals or uprooting native flora in the sacred Haram sanctuary.",
      aUrdu: "حالتِ احرام میں نو چیزیں ممنوع ہیں: ۱) بال کاٹنا یا ناخن تراشنا، ۲) خوشبو لگانا، ۳) مردوں کے لیے سلے ہوئے کپڑے (پینٹ، قمیص، انڈرویئر) پہننا اور سر ڈھانپنا، ۴) عورتوں کے لیے چہرے پر نقاب باندھنا اور دستانے پہننا، ۵) میاں بیوی کے ازدواجی تعلقات، ۶) لڑائی جھگڑا، گالی گلوچ اور فحش گفتگو، اور ۷) حدودِ حرم میں شکار کرنا یا درخت کاٹنا۔",
      ref: "Surah Al-Baqarah 2:197; Sahih al-Bukhari 1838"
    },
    {
      qEn: "What is the difference between Hajj Tamattu, Qiran, and Ifrad?",
      qUrdu: "حج تمتع، حج قران اور حج افراد میں کیا فرق ہے؟",
      aEn: "1) Hajj Tamattu (most recommended for international pilgrims): Performing Umrah first during the Hajj months, completely exiting Ihram, and then re-entering Ihram for Hajj on the 8th of Dhul Hijjah (requires Qurbani sacrifice). 2) Hajj Qiran: Entering Ihram for both Umrah and Hajj together without exiting Ihram between them (requires Qurbani). 3) Hajj Ifrad: Entering Ihram solely for Hajj without Umrah (no obligatory Qurbani required, common for Makkah residents).",
      aUrdu: "۱) حجِ تمتع (بیرونِ ملک کے حجاج کے لیے سب سے افضل): حج کے مہینوں میں پہلے عمرہ کر کے احرام کھول دینا اور پھر ۸ ذوالحجہ کو نیا احرام باندھ کر حج ادا کرنا (اس میں دمِ شکر واجب ہے)۔ ۲) حجِ قران: ایک ہی احرام میں عمرہ اور حج دونوں کی نیت کرنا اور درمیان میں احرام نہ کھولنا (قربانی واجب ہے)۔ ۳) حجِ افراد: صرف حج کا احرام باندھنا (اس میں شکرانے کی قربانی واجب نہیں ہے، اہل مکہ یہی کرتے ہیں)۔",
      ref: "Sahih Muslim 1218; Al-Mawsu'ah al-Fiqhiyyah"
    },
    {
      qEn: "Is visiting the Prophet's Mosque in Madinah an obligatory pillar of Hajj?",
      qUrdu: "کیا مدینہ منورہ اور مسجدِ نبوی کی زیارت حج کا لازمی رکن ہے؟",
      aEn: "Visiting Madinah al-Munawwarah and praying in the Prophet's Mosque (Al-Masjid an-Nabawi) is a highly recommended, deeply beloved Sunnah of immense spiritual virtue, carrying the reward of 1,000 prayers elsewhere (Sahih al-Bukhari 1190). However, it is not an obligatory pillar (Rukn) or prerequisite of Hajj itself; a person's Hajj is fully valid even if travel logistics prevent visiting Madinah.",
      aUrdu: "مدینہ منورہ جانا اور مسجدِ نبوی میں نماز پڑھنا ایک انتہائی بابرکت اور افضل ترین سنت ہے جس میں ایک نماز کا ثواب دوسری مساجد سے ۱۰۰۰ گنا زیادہ ہے (صحیح بخاری: ۱۱۹۰)۔ تاہم یہ حج کا قانونی رکن یا فرض نہیں ہے؛ اگر کوئی مجبوری سے مدینہ نہ جا سکے تو بھی اس کا حج شرعاً بالکل مکمل اور درست ادا ہو جاتا ہے۔",
      ref: "Sahih al-Bukhari 1190; Sahih Muslim 1394"
    }
  ];

  const seoTitle = isUrdu
    ? "حج اور عمرہ کی مکمل گائیڈ • احرام، طواف، عرفات، سعی اور مسائل | IslamIQ"
    : "Hajj & Umrah Complete Guide: Step-by-Step Rites, Rules & Duas | IslamIQ";

  const seoDescription = isUrdu
    ? "حج اور عمرہ کا مکمل مسنون طریقہ، احرام کی شرائط، میقات، طواف، سعی، میدانِ عرفات، مزدلفہ، منیٰ، قربانی اور حلق کے شرعی احکام مع مستند حوالہ جات۔"
    : "Comprehensive authentic guide to Hajj and Umrah in Islam. Learn the 5th Pillar of Islam: Ihram rules, Miqat boundaries, Talbiyah, Tawaf, Sa'i, Mina, Day of Arafah, Muzdalifah, Rami, Halq/Qasr, common mistakes, and authentic duas.";

  const faqsForSchema = hajjFaqs.map(f => ({
    question: isUrdu ? f.qUrdu : f.qEn,
    answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/hajj-umrah-guide"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? '۵ ارکانِ اسلام' : '5 Pillars of Islam', url: '/5-pillars-of-islam' },
          { name: isUrdu ? 'حج و عمرہ گائیڈ' : 'Hajj & Umrah Guide', url: '/hajj-umrah-guide' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'حج اور عمرہ کی مکمل گائیڈ: احرام، طواف، عرفات اور ارکانِ حج' : 'Hajj and Umrah Complete Guide: Pilgrimage Rites, Miqat, Arafah & Sunnah Rules',
          description: seoDescription,
          datePublished: '2026-10-02',
          dateModified: '2026-10-02',
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-emerald-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-400/30">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{isUrdu ? 'اسلام کا پانچواں رکن' : 'The Fifth Pillar of Islam'}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share Hajj guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? 'حج اور عمرہ کی مکمل گائیڈ (Hajj & Umrah Guide)' : 'Hajj & Umrah Complete Guide: Step-by-Step Pilgrimage Manual'}
        </h1>

        <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu
            ? 'بیت اللہ شریف کا سفر زندگی کا سب سے مقدس اور پرنور سفر ہے۔ جانیے احرام، میقات، طواف، صفا و مروہ کی سعی، میدانِ عرفات کا وقوف، مزدلفہ کی رات، قربانی اور طوافِ وداع کا مکمل مسنون طریقہ مع حوالہ جات۔'
            : 'The sacred pilgrimage to the House of Allah is the journey of a lifetime. Explore the step-by-step rituals of both Hajj and Umrah: entering Ihram at the Miqat, circumambulating the Ka\'bah, Sa\'i, standing at Arafah, Muzdalifah, the stoning of Jamarat, and farewell rites according to the authentic Sunnah.'}
        </p>

        {/* Foundational Talbiyah Banner */}
        <div className="bg-emerald-900/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isUrdu ? 'حج و عمرہ کا ابدی ترانہ (تلبیہ)' : 'The Timeless Anthem of Pilgrimage (Talbiyah)'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ»
          </p>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isUrdu
              ? 'میں حاضر ہوں، اے اللہ میں حاضر ہوں! میں حاضر ہوں، تیرا کوئی شریک نہیں، میں حاضر ہوں! بے شک تمام تعریفیں اور تمام نعمتیں تیرے ہی لیے ہیں اور تمام بادشاہی تیری ہی ہے، تیرا کوئی شریک نہیں!'
              : 'Here I am at Your service, O Allah, here I am! Here I am, You have no partner, here I am! Truly all praise, grace, and sovereignty belong to You; You have no partner!'}
          </p>
          <span className="inline-block text-[11px] text-emerald-300/80 font-mono">
            Sahih al-Bukhari 1549; Sahih Muslim 1184
          </span>
        </div>
      </header>

      {/* Quick Summary: Umrah in 4 Steps */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isUrdu ? 'آسان عمرہ' : 'Umrah Rites'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {isUrdu ? 'عمرہ کا طریقہ ۴ آسان مراحل میں' : 'How to Perform Umrah in 4 Simple Steps'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'عمرہ چند گھنٹوں میں مکمل ہو جاتا ہے اور سال کے کسی بھی دن ادا کیا جا سکتا ہے۔'
              : 'Umrah is the lesser pilgrimage that can be performed at any time of the year in just a few hours.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {umrahSteps.map((s) => (
            <div
              key={s.step}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-emerald-700 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUrdu ? s.titleUrdu : s.titleEn}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? s.descUrdu : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The 6 Chronological Stages of Hajj */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{isUrdu ? 'حج کا تاریخی سفر' : 'Complete Hajj Timeline'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {isUrdu ? 'حج کے ارکان و ایام کی مکمل تفصیل (۸ تا ۱۳ ذوالحجہ)' : 'The Complete Step-by-Step Stages of Hajj (8th – 13th Dhul Hijjah)'}
          </h2>
        </div>

        <div className="space-y-4">
          {hajjStages.map((stage, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  {isUrdu ? stage.dayUrdu : stage.dayEn}
                </h3>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200/60">
                  {isUrdu ? stage.timingUrdu : stage.timingEn}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isUrdu ? stage.descUrdu : stage.descEn}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-emerald-800">
                  {isUrdu ? 'شرعی ماخذ: ' : 'Authentic Reference: '} {stage.keyRef}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Mistakes to Avoid During Hajj */}
      <section className="bg-rose-50/70 border border-rose-200 rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{isUrdu ? 'حج و عمرہ میں عام غلطیاں جن سے بچنا لازمی ہے' : 'Common Mistakes to Avoid During Pilgrimage'}</span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc list-inside">
          <li>
            <strong>{isUrdu ? 'میقات بغیر احرام کے پار کرنا: ' : 'Crossing Miqat Without Ihram: '}</strong>
            {isUrdu
              ? 'جو شخص ہوائی جہاز یا سڑک سے میقات پار کرے اس پر احرام پہلے سے باندھنا فرض ہے؛ بغیر احرام پار کرنے پر دم (قربانی کا کفارہ) لازم ہو جاتا ہے۔'
              : 'Passing the designated geographic boundary (Miqat) without being in Ihram is prohibited and incurs a penalty sacrifice (Dam).'}
          </li>
          <li>
            <strong>{isUrdu ? 'دھکم پیل اور دوسروں کو ایذا پہنچانا: ' : 'Pushing & Harming Fellow Pilgrims: '}</strong>
            {isUrdu
              ? 'حجرِ اسود چومنے کے لیے دوسروں کو دھکے دینا حرام ہے؛ دور سے ہاتھ کے اشارے سے استلام کر لینا ہی مسنون اور کافی ہے۔'
              : 'Violently pushing through crowds to kiss the Black Stone is sinful; gesturing toward it from afar (Istilam) is the valid Sunnah.'}
          </li>
          <li>
            <strong>{isUrdu ? 'عرفات کے حدود سے باہر ٹھہرنا: ' : 'Standing Outside Arafah Boundaries: '}</strong>
            {isUrdu
              ? 'مسجد نمرہ کا کچھ حصہ وادی عُرنہ میں ہے جو عرفات سے باہر ہے۔ زوال کے بعد حدودِ عرفات کے اندر قیام کرنا ہی حج کا فرض ہے۔'
              : 'The western part of Masjid Namirah lies in Wadi Urana outside Arafah; one must confirm being inside the marked Arafah boundaries.'}
          </li>
        </ul>
      </section>

      {/* Crawlable Internal Links */}
      <section className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دیگر اسلامی ارکان' : 'Core Pillars of Islam'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'اسلام کے دیگر بنیادی ارکان کی رہنمائی حاصل کریں' : 'Explore Complementary Guides on Islamic Pillars & Worship'}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {isUrdu
              ? 'پانچ ارکانِ اسلام، زکوٰۃ کا حساب، اور رمضان المبارک کے روزوں کا مطالعہ کریں۔'
              : 'Continue your learning journey with our guides on the 5 Pillars, Zakat calculation, and Ramadan fasting.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="/5-pillars-of-islam"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('5-pillars-of-islam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-emerald-300 font-bold block mb-1">
                {isUrdu ? 'ارکانِ اسلام' : 'The 5 Pillars'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? '۵ ارکانِ اسلام کی تفصیل' : 'The 5 Pillars of Islam'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'شہادتین، نماز، زکوٰۃ، روزہ اور حج کے تفصیلی احکام۔' : 'Shahadah, Salah, Zakat, Sawm, and Hajj explained with proofs.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 underline mt-3">
              {isUrdu ? 'گائیڈ پڑھیں ←' : 'Read Guide →'}
            </span>
          </a>

          <a
            href="/zakat-basics"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('zakat-basics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-amber-300 font-bold block mb-1">
                {isUrdu ? 'تیسرا رکن' : 'Third Pillar'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'زکوٰۃ کے بنیادی احکام' : 'Zakat Basics Guide'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'نصاب، سونے چاندی کی زکوٰۃ اور مستحقین کے مصارف۔' : 'Nisab thresholds, 2.5% rate, and 8 Quranic recipient categories.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-200 underline mt-3">
              {isUrdu ? 'زکوٰۃ گائیڈ دیکھیں ←' : 'Read Zakat Guide →'}
            </span>
          </a>

          <a
            href="/ramadan-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('ramadan-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-teal-300 font-bold block mb-1">
                {isUrdu ? 'چوتھا رکن' : 'Fourth Pillar'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'رمضان المبارک گائیڈ' : 'Ramadan & Fasting Guide'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'روزے کے فرائض، سحر و افطار، دعائیں اور شبِ قدر۔' : 'Sawm essentials, Suhoor, Iftar duas, and Laylat al-Qadr.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-200 underline mt-3">
              {isUrdu ? 'رمضان گائیڈ دیکھیں ←' : 'Read Ramadan Guide →'}
            </span>
          </a>
        </div>
      </section>

      {/* Useful Fiqh FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'حج و عمرہ کے متعلق اہم سوالات کے جوابات' : 'Frequently Asked Questions on Hajj & Umrah'}</span>
        </div>

        <div className="space-y-3">
          {hajjFaqs.map((faq, idx) => {
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
                      {isUrdu ? 'مستند حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="hajj-umrah-guide" />
    </article>
  );
};

export default HajjUmrahGuide;

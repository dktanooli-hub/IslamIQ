import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Sparkles,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Share2,
  Compass,
  Layers
} from 'lucide-react';

export const TayammumGuide: React.FC = () => {
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
          ? 'تیمم کا مکمل شرعی طریقہ • پاک مٹی سے طہارت، شرائط اور مسائل'
          : 'Tayammum Guide: Dry Ablution in Islam, Method & Rules | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const permissibleReasons = [
    {
      titleEn: "Total Absence of Water",
      titleUrdu: "پانی کی مکمل عدم دستیابی",
      descEn: "When water cannot be found within a reasonable searching distance (e.g. while traveling in arid deserts or due to total utility disruption), or the only available water is strictly needed for human or animal drinking.",
      descUrdu: "جب تلاش کے باوجود شرعی حد تک پانی دستیاب نہ ہو، یا جو پانی موجود ہو وہ صرف انسانوں یا جانوروں کے پینے کے لیے ناگزیر ہو۔",
      proof: "Surah Al-Ma'idah 5:6; Sahih al-Bukhari 335"
    },
    {
      titleEn: "Illness or Fear of Harm from Water",
      titleUrdu: "بیماری یا پانی کے استعمال سے نقصان کا اندیشہ",
      descEn: "When a qualified physician advises against using water, or a person reasonably fears that using water on wounds, burns, or severe illness will cause death, delay healing, or aggravate disease.",
      descUrdu: "جب انسان شدید بیمار ہو، زخم یا جلنے کی وجہ سے ڈاکٹر نے پانی کے استعمال سے روکا ہو، یا پانی سے بیماری بڑھنے اور تاخیر سے شفایاب ہونے کا قوی اندیشہ ہو۔",
      proof: "Sunan Abi Dawud 336 (Hadith of the wounded companion)"
    },
    {
      titleEn: "Extreme Cold Without Heating Means",
      titleUrdu: "شدید ترین سردی اور پانی گرم کرنے کا ذریعہ نہ ہونا",
      descEn: "In freezing temperatures where water is dangerously cold and no heating source exists, and a person genuinely fears severe illness or hypothermia from using it, as practiced by Amr ibn al-Aas (RA) and affirmed by the Prophet ﷺ.",
      descUrdu: "جب ایسی شدید سردی ہو کہ ٹھنڈے پانی سے نہانے یا وضو کرنے پر ہلاکت یا فالج کا اندیشہ ہو اور پانی گرم کرنے کا کوئی بھی انتظام موجود نہ ہو۔",
      proof: "Sunan Abi Dawud 334; Sahih al-Bukhari 345"
    },
    {
      titleEn: "Imminent Danger to Life or Safety",
      titleUrdu: "پانی تک پہنچنے میں جان و مال کو خطرہ",
      descEn: "When water exists nearby but accessing it would expose a person to lethal danger from wild animals, enemy combatants, armed criminals, or perilous terrain.",
      descUrdu: "جب پانی تو موجود ہو لیکن راستے میں درندے، دشمن، ڈاکو یا گہری کھائی جیسا خطرہ ہو جس سے جان و مال داؤ پر لگنے کا اندیشہ ہو۔",
      proof: "Al-Mughni by Ibn Qudamah"
    }
  ];

  const tayammumSteps = [
    {
      stepNumber: 1,
      titleEn: "Make Sincere Intention (Niyyah) in the Heart",
      titleUrdu: "دل میں پاکی کی نیت کرنا",
      descEn: "Intend in your heart that you are performing Tayammum to attain ritual purity for Salah for the sake of Allah. Unlike Wudu, Niyyah is a mandatory condition across all schools of Islamic law.",
      descUrdu: "دل میں پختہ ارادہ کریں کہ پانی نہ ملنے یا عذر کی بنا پر نماز جائز کرنے کے لیے پاک مٹی سے طہارت حاصل کر رہا ہوں۔"
    },
    {
      stepNumber: 2,
      titleEn: "Say Bismillah & Strike Clean Earth Once",
      titleUrdu: "بسم اللہ پڑھ کر پاک مٹی یا پتھر پر دونوں ہتھیلیاں مارنا",
      descEn: "Say 'Bismillah' and lightly strike clean, pure earth (soil, dust, sand, or natural unglazed stone) once with both palms, spreading the fingers slightly.",
      descUrdu: "زبان سے 'بِسْمِ اللَّهِ' پڑھیں اور دونوں کھلی ہتھیلیوں کو پاک مٹی، ریت یا قدرتی صاف پتھر پر ایک مرتبہ ہلکے سے ماریں۔"
    },
    {
      stepNumber: 3,
      titleEn: "Lightly Shake or Blow Away Excess Dust",
      titleUrdu: "ہاتھوں کو جھاڑنا یا پھونک مار کر زائد مٹی اڑانا",
      descEn: "Shake your hands together or blow lightly onto your palms to remove excess dust so as not to smear mud onto your face, following the Sunnah of Prophet Muhammad ﷺ.",
      descUrdu: "دونوں ہاتھوں کو آپس میں ہلکا سا جھاڑیں یا ہتھیلیوں پر پھونک ماریں تاکہ زائد مٹی اڑ جائے اور چہرہ میلا نہ ہو۔"
    },
    {
      stepNumber: 4,
      titleEn: "Wipe the Entire Face Once",
      titleUrdu: "ایک بار پورے چہرے کا مسح کرنا",
      descEn: "Wipe your palms across your entire face from the hairline to the chin and from ear to ear, ensuring the palms touch every reachable portion of facial skin.",
      descUrdu: "دونوں ہاتھوں سے پورے چہرے کا ایک مرتبہ اس طرح مسح کریں کہ پیشانی سے تھوڑی تک اور ایک کان کی لو سے دوسرے کان تک کوئی جگہ نہ چھوٹے۔"
    },
    {
      stepNumber: 5,
      titleEn: "Wipe Both Hands and Arms",
      titleUrdu: "دونوں ہاتھوں اور کلائیوں کا مسح کرنا",
      descEn: "Wipe your left palm over the back of your right hand and wrist (up to the elbow in the Hanafi and Shafi'i schools, or up to the wrists in the Hanbali and Hadith narration of Ammar ibn Yasir RA), then wipe the right palm over your left hand similarly.",
      descUrdu: "بائیں ہاتھ سے دائیں ہاتھ کی پشت اور کلائی کا مسح کریں (اور کہنیوں تک احناف و شوافع کے نزدیک)، پھر دائیں ہاتھ سے بائیں ہاتھ اور کلائی کا مسح کریں۔"
    }
  ];

  const tayammumFaqs = [
    {
      qEn: "What natural materials are permissible to use for Tayammum?",
      qUrdu: "تیمم کے لیے کون کون سی پاک چیزیں استعمال کی جا سکتی ہیں؟",
      aEn: "Allah commands in Surah Al-Ma'idah (5:6) to use 'Sa'eedan Tayyiban' (clean surface of the earth). This includes clean natural soil, sand, dust, rocks, unglazed stone, or clean clay bricks. Synthetic, painted, or chemically treated materials (such as synthetic plastic, glossy painted walls, or carpet without dust) cannot be used.",
      aUrdu: "قرآنِ مجید میں 'صَعِيدًا طَيِّبًا' یعنی پاک مٹی کا حکم ہے۔ اس میں ہر وہ چیز شامل ہے جو زمین کی جنس سے ہو جیسے پاک مٹی، ریت، دھول، غیر پالش شدہ قدرتی پتھر اور پکی ہوئی سرخ اینٹ۔ پلاسٹک، روغن شدہ (پینٹ والی) دیواریں یا کپڑے جن پر مٹی نہ ہو، ان سے تیمم جائز نہیں۔",
      ref: "Surah Al-Ma'idah 5:6; Al-Hidayah; Bada'i al-Sana'i"
    },
    {
      qEn: "What actions invalidate Tayammum?",
      qUrdu: "تیمم کن چیزوں سے ٹوٹ جاتا ہے؟",
      aEn: "Tayammum is invalidated by: 1) Everything that invalidates normal Wudu (such as passing wind, using the bathroom, or bleeding) or Ghusl, 2) The availability of water before or during the prayer for one whose excuse was absence of water, and 3) The disappearance of the medical excuse (such as healing of the wound or recovery of health that allows safe water usage).",
      aUrdu: "تیمم تین چیزوں سے ٹوٹ جاتا ہے: ۱) ہر وہ چیز جس سے عام وضو یا غسل ٹوٹتا ہے (جیسے ریاح کا خارج ہونا، پیشاب و پاخانہ وغیرہ)، ۲) نماز سے پہلے یا نماز کے دوران پانی کا مل جانا (جب پانی نہ ہونے کی وجہ سے تیمم کیا ہو)، اور ۳) بیماری یا عذر کا ختم ہو جانا (جیسے زخم کا ٹھیک ہو جانا اور پانی کے استعمال کی قدرت حاصل ہو جانا)۔",
      ref: "Sahih al-Bukhari 335; Fiqh as-Sunnah by Sayyid Sabiq"
    },
    {
      qEn: "Can a single Tayammum suffice for both Wudu and Ghusl?",
      qUrdu: "کیا ایک ہی تیمم سے وضو اور بڑے غسل دونوں کی طہارت حاصل ہو سکتی ہے؟",
      aEn: "Yes. When water is unavailable or harmful, Tayammum replaces both minor ablution (Wudu) and major ritual bath (Ghusl) using the exact same physical procedure (wiping face and hands). The only difference is the internal intention (Niyyah) in the heart to be purified from major ritual impurity (Janabah/Hayd) or minor impurity.",
      aUrdu: "جی ہاں! پانی نہ ملنے یا عذر کی صورت میں تیمم وضو اور غسل دونوں کا قائم مقام بنتا ہے، اور دونوں کا طریقہ بالکل ایک جیسا (چہرے اور ہاتھوں کا مسح) ہے۔ فرق صرف دل کی نیت کا ہوتا ہے کہ دل میں غسلِ جنابت یا حیض کی پاکی کا ارادہ کیا جائے۔",
      ref: "Sahih al-Bukhari 347 (Hadith of Imran ibn Husayn RA)"
    },
    {
      qEn: "If someone prayed with Tayammum and then found water later, must they repeat the prayer?",
      qUrdu: "اگر کسی نے تیمم سے نماز پڑھ لی اور بعد میں پانی مل گیا، تو کیا وہ نماز دہرانا پڑے گی؟",
      aEn: "No. If a Muslim performed Tayammum legitimately, prayed within the valid time, and completed the prayer, the prayer is 100% valid and does not need to be repeated if water is found afterwards. Abu Sa'id al-Khudri (RA) narrated that two companions prayed with Tayammum, then found water within the prayer time; one repeated with Wudu and the other did not. When they asked the Prophet ﷺ, he told the one who did not repeat: 'You followed the Sunnah, and your prayer was sufficient for you' (Sunan Abi Dawud 338).",
      aUrdu: "جی نہیں! اگر وقت پر شرعی عذر کے تحت تیمم کر کے نماز مکمل ادا کر لی جائے، تو بعد میں پانی مل جانے پر اس نماز کو دہرانا واجب نہیں ہے۔ حضرت ابو سعید خدری رضی اللہ عنہ کی روایت ہے کہ دو صحابہ نے پانی نہ ملنے پر تیمم سے نماز پڑھی، بعد میں وقت کے اندر پانی مل گیا؛ ایک نے وضو کر کے نماز دہرائی اور دوسرے نے نہ دہرائی۔ نبی کریم ﷺ نے نہ دہرانے والے سے فرمایا: 'تم نے سنت کے مطابق عمل کیا اور تمہاری نماز درست ہو گئی' (سنن ابی داؤد: ۳۳۸)۔",
      ref: "Sunan Abi Dawud 338; Sunan an-Nasa'i 433 (Graded Sahih)"
    }
  ];

  const seoTitle = isUrdu
    ? "تیمم کا مکمل شرعی طریقہ • پاک مٹی سے طہارت، شرائط اور مسائل | IslamIQ"
    : "Tayammum Guide: Dry Ablution in Islam, Method & Rules | IslamIQ";

  const seoDescription = isUrdu
    ? "تیمم کا مکمل طریقہ، کن حالات میں تیمم جائز ہوتا ہے، تیمم کے فرائض، پاک مٹی کے احکام، کن چیزوں سے تیمم ٹوٹتا ہے، اور فقہی سوالات کے مستند جوابات۔"
    : "Complete step-by-step guide to Tayammum (dry ablution) in Islam. Understand valid excuses (absence of water, illness, severe cold), what materials can be used, nullifiers, and Quranic evidence with authentic Hadith citations.";

  const faqsForSchema = tayammumFaqs.map(f => ({
    question: isUrdu ? f.qUrdu : f.qEn,
    answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/tayammum-guide"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'طہارت و نماز' : 'Purification & Salah', url: '/salah-learning' },
          { name: isUrdu ? 'تیمم گائیڈ' : 'Tayammum Guide', url: '/tayammum-guide' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'تیمم کا مکمل طریقہ: شرائط، ارکان، فرائض اور فقہی مسائل' : 'Tayammum Guide: Step-by-Step Method, Conditions & Quranic Evidence',
          description: seoDescription,
          datePublished: '2026-10-02',
          dateModified: '2026-10-02',
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-amber-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-amber-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isUrdu ? 'دین میں آسانی کا تحفہ' : 'Divine Facilitation: Dry Ablution'}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share Tayammum guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? 'تیمم کا مکمل شرعی طریقہ (Tayammum Guide)' : 'Tayammum Guide: Dry Ablution Method & Fiqh Rules'}
        </h1>

        <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu
            ? 'تیمم اللہ تعالیٰ کی طرف سے امتِ محمدیہ کے لیے ایک عظیم آسانی ہے جس کے ذریعے پانی نہ ملنے یا بیماری کی حالت میں پاک مٹی سے طہارت حاصل کی جاتی ہے۔ جانیے تیمم کا درست مسنون طریقہ، کن چیزوں سے تیمم ہو سکتا ہے اور کن سے ٹوٹتا ہے۔'
            : 'Tayammum is the divine dispensation granted by Allah Almighty permitting believers to achieve ritual purification using clean earth when water is unavailable or medically harmful. Discover the step-by-step method, permissible materials, and authentic rulings from the Quran and Sunnah.'}
        </p>

        {/* Foundational Quran Ayah Banner */}
        <div className="bg-amber-900/60 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-amber-300 text-xs font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>{isUrdu ? 'تیمم کی شرعی رخصت کا قرآنی حکم' : 'Divine Quranic Exemption for Tayammum'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُم مِّنْهُ»
          </p>
          <p className="text-xs sm:text-sm text-amber-100">
            {isUrdu
              ? 'پھر اگر تمہیں پانی نہ ملے تو پاک مٹی کا قصد کرو اور اس سے اپنے چہروں اور اپنے ہاتھوں پر مسح کرو۔'
              : 'And you find no water, then take for yourselves clean earth and wipe over your faces and hands with it.'}
          </p>
          <span className="inline-block text-[11px] text-amber-300/80 font-mono">
            Surah Al-Ma'idah (5:6) • سورۃ المائدۃ: ۶
          </span>
        </div>
      </header>

      {/* When is Tayammum Permitted */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>{isUrdu ? 'تیمم کن حالات میں جائز ہوتا ہے؟' : 'When is Tayammum Permitted in Islamic Law?'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {permissibleReasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2.5 hover:border-amber-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUrdu ? item.titleUrdu : item.titleEn}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? item.descUrdu : item.descEn}
              </p>
              <span className="inline-block text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md">
                {isUrdu ? 'دلیل: ' : 'Proof: '} {item.proof}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Method */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آسان طریقہ' : 'Step-by-Step Procedure'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {isUrdu ? 'تیمم کرنے کا مسنون طریقہ' : 'How to Perform Tayammum Step-by-Step'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'حضرت عمار بن یاسر رضی اللہ عنہ کی صحیح بخاری و مسلم کی متفقہ حدیث سے ثابت شدہ طریقہ۔'
              : 'Derived directly from the authenticated practice recorded by Ammar ibn Yasir (RA) in Sahih al-Bukhari and Sahih Muslim.'}
          </p>
        </div>

        <div className="space-y-3">
          {tayammumSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex items-start gap-4 hover:border-amber-300 transition-colors"
            >
              <span className="w-8 h-8 rounded-2xl bg-amber-700 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {step.stepNumber}
              </span>
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUrdu ? step.titleUrdu : step.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {isUrdu ? step.descUrdu : step.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Materials Can Be Used & Common Mistakes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{isUrdu ? 'کن چیزوں سے تیمم ہو سکتا ہے؟' : 'Valid Materials for Tayammum'}</span>
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside leading-relaxed">
            <li>{isUrdu ? 'پاک اور خشک مٹی (سب سے افضل)' : 'Clean, dry natural soil (most preferred)'}</li>
            <li>{isUrdu ? 'ریت اور قدرتی صحرائی گرد' : 'Clean desert sand and naturally settled dust'}</li>
            <li>{isUrdu ? 'غیر پالش شدہ پتھر یا چٹان' : 'Natural unglazed stones, granite, or clean rocks'}</li>
            <li>{isUrdu ? 'بغیر رنگ یا پینٹ کی مٹی کی پکی اینٹ' : 'Natural unpainted baked clay bricks'}</li>
          </ul>
        </div>

        <div className="bg-rose-50/70 rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-xs space-y-3">
          <h3 className="font-bold text-base text-rose-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>{isUrdu ? 'عام غلطیاں جن سے بچیں' : 'Common Mistakes to Avoid'}</span>
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li>{isUrdu ? 'پانی موجود اور قابلِ استعمال ہوتے ہوئے محض سستی سے تیمم کرنا' : 'Using Tayammum purely out of laziness when water is accessible'}</li>
            <li>{isUrdu ? 'تیمم میں پاؤں کا مسح کرنا (تیمم میں پاؤں کا کوئی مسح نہیں ہے)' : 'Attempting to wipe feet during Tayammum (feet are never wiped)'}</li>
            <li>{isUrdu ? 'پلاسٹک، پینٹ شدہ دیوار یا قالین پر بغیر مٹی کے ہاتھ مارنا' : 'Striking synthetic plastics or glossy painted walls without dust'}</li>
          </ul>
        </div>
      </section>

      {/* Crawlable Internal Links to Related Islamic Learning */}
      <section className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-amber-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'طہارت و نماز کے دیگر ابواب' : 'Explore Purification Guides'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'وضو، غسل اور نماز کے مکمل رہنما مضامین' : 'Explore Wudu, Ghusl & Prayer Guides on IslamIQ'}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {isUrdu
              ? 'پانی ملنے پر وضو کا مکمل طریقہ، غسل کے فرائض، اور نماز کا طریقہ دیکھیں۔'
              : 'Continue strengthening your understanding with our complete guides on Wudu, Ghusl, and Salah.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
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
              <span className="text-xs text-teal-300 font-bold block mb-1">
                {isUrdu ? 'وضو کا طریقہ' : 'Wudu Guide'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'وضو کا مکمل طریقہ' : 'How to Perform Wudu'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? '۴ فرائض، مسنون دعائیں اور وضو کے احکام۔' : 'The 4 Quranic obligations, complete Sunnah steps, and nullifiers.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-200 underline mt-3">
              {isUrdu ? 'وضو گائیڈ پڑھیں ←' : 'Read Wudu Guide →'}
            </span>
          </a>

          <a
            href="/ghusl-taharah-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('ghusl-taharah-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-emerald-300 font-bold block mb-1">
                {isUrdu ? 'غسل کے احکام' : 'Ghusl Manual'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'غسل و طہارت گائیڈ' : 'Ghusl & Taharah Guide'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'جنابت و حیض سے طہارت اور غسل کا مسنون طریقہ۔' : 'Obligatory occasions, 3 Faraid, and complete Sunnah bath method.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 underline mt-3">
              {isUrdu ? 'غسل گائیڈ پڑھیں ←' : 'Read Ghusl Guide →'}
            </span>
          </a>

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
              <span className="text-xs text-amber-300 font-bold block mb-1">
                {isUrdu ? 'نماز کا طریقہ' : 'Salah Manual'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'نماز کا جامع طریقہ' : 'How to Perform Salah'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'تکبیر سے سلام تک ارکان، واجبات اور درست طریقہ۔' : 'Learn exact postures, recitations, corrections, and authentic proofs.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-200 underline mt-3">
              {isUrdu ? 'نماز گائیڈ پڑھیں ←' : 'Read Salah Guide →'}
            </span>
          </a>
        </div>
      </section>

      {/* Useful Fiqh FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>{isUrdu ? 'تیمم کے متعلق اہم فقہی سوالات کے جوابات' : 'Frequently Asked Questions on Tayammum'}</span>
        </div>

        <div className="space-y-3">
          {tayammumFaqs.map((faq, idx) => {
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
                    <ChevronUp className="w-4 h-4 text-amber-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-amber-800 font-semibold block pt-1">
                      {isUrdu ? 'مستند حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="tayammum-guide" />
    </article>
  );
};

export default TayammumGuide;

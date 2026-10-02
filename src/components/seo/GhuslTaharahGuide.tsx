import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Droplets,
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
  Compass
} from 'lucide-react';

export const GhuslTaharahGuide: React.FC = () => {
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
          ? 'غسل اور طہارت کا مکمل طریقہ • فرائض، سنتیں اور مسائل'
          : 'Complete Ghusl & Taharah Guide: Step-by-Step, Faraid & Sunnah | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const obligatoryOccasions = [
    {
      titleEn: "Janabah (Major Ritual Impurity)",
      titleUrdu: "جنابت (ازدواجی تعلق یا احتلام وغیرہ)",
      descEn: "Occurs through intimate marital relations (regardless of emission) or any nocturnal emission (wet dream) / ejaculation accompanied by desire while asleep or awake.",
      descUrdu: "میاں بیوی کے ازدواجی تعلق یا بیداری و نیند (احتلام) میں شہوت کے ساتھ منی کے اخراج سے غسل واجب ہو جاتا ہے۔",
      proof: "Sahih Muslim 348; Sahih al-Bukhari 291"
    },
    {
      titleEn: "Cessation of Hayd (Menstruation)",
      titleUrdu: "حیض (ماہواری) کا ختم ہونا",
      descEn: "Upon the complete cessation of menstrual bleeding, performing Ghusl is strictly obligatory before prayer, fasting, or touching the physical Quran becomes permissible.",
      descUrdu: "ماہواری کا خون مکمل طور پر بند ہونے کے بعد نماز پڑھنے، روزہ رکھنے اور قرآن کریم کو چھونے کے لیے غسل فرض ہو جاتا ہے۔",
      proof: "Surah Al-Baqarah 2:222; Sahih al-Bukhari 314"
    },
    {
      titleEn: "Cessation of Nifas (Postnatal Bleeding)",
      titleUrdu: "نفاس (ولادت کے بعد کا خون) ختم ہونا",
      descEn: "Following childbirth, once postnatal bleeding ceases entirely (up to a maximum scholarly threshold of 40 days according to the Sunnah), Ghusl must be performed.",
      descUrdu: "ولادت کے بعد جب نفاس کا خون بند ہو جائے (جس کی زیادہ سے زیادہ شرعی مدت عام طور پر ۴۰ دن ہے)، تو طہارت کے لیے غسل فرض ہے۔",
      proof: "Sunan Abi Dawud 311; Jami' at-Tirmidhi 139"
    },
    {
      titleEn: "Embracing Islam (New Muslim)",
      titleUrdu: "دائرۂ اسلام میں داخل ہونا (نو مسلم کا غسل)",
      descEn: "When a person enters Islam by pronouncing the Shahadah, the Prophet ﷺ instructed converts like Qays ibn Asim (RA) to perform a full purificatory Ghusl with water and Sidr.",
      descUrdu: "جب کوئی شخص کلمہ پڑھ کر دائرۂ اسلام میں داخل ہوتا ہے تو نبی کریم ﷺ نے نو مسلم صحابہ (جیسے قیس بن عاصم رضی اللہ عنہ) کو غسل فرمانے کا حکم دیا۔",
      proof: "Sunan Abi Dawud 355; Jami' at-Tirmidhi 605"
    }
  ];

  const ghuslSteps = [
    {
      stepNumber: 1,
      titleEn: "Intention (Niyyah) in the Heart",
      titleUrdu: "دل سے پاکی حاصل کرنے کی نیت کرنا",
      descEn: "Make the sincere intention in your heart to remove major ritual impurity (Hadath Akbar) to perform prayer solely for the sake of Allah. Stating it aloud is not a requirement.",
      descUrdu: "دل میں پختہ ارادہ کریں کہ اللہ کی رضا اور نماز کی حلت کے لیے ناپاکی (حدثِ اکبر) دور کر کے پاکی حاصل کر رہا ہوں۔ زبان سے الفاظ ادا کرنا شرط نہیں ہے۔"
    },
    {
      stepNumber: 2,
      titleEn: "Washing the Hands Three Times & Cleansing Private Parts",
      titleUrdu: "دونوں ہاتھوں کو گٹوں تک تین بار دھونا اور نجاست دور کرنا",
      descEn: "Wash both hands up to the wrists three times. Then with the left hand, wash the private areas thoroughly to remove all traces of physical impurity (Najasah).",
      descUrdu: "پہلے دونوں ہاتھوں کو گٹوں تک تین بار دھوئیں، پھر بائیں ہاتھ سے استنجاء کر کے جسم پر لگی ہر قسم کی ظاہری ناپاکی کو اچھی طرح دھو کر صاف کریں۔"
    },
    {
      stepNumber: 3,
      titleEn: "Perform Complete Wudu (Ablution)",
      titleUrdu: "نماز جیسا مکمل وضو کرنا",
      descEn: "Perform complete Wudu exactly like that for Salah, including rinsing the mouth (Madmadah) and washing the nostrils (Istinshaq). Washing the feet may be done now or deferred until the end if standing in pooling water.",
      descUrdu: "نماز جیسا مکمل وضو کریں جس میں تین بار کلی کرنا اور ناک میں نرم ہڈی تک پانی چڑھا کر صاف کرنا شامل ہے۔ اگر پاؤں کے نیچے پانی جمع ہو رہا ہو تو پاؤں غسل کے آخر میں بھی دھوئے جا سکتے ہیں۔"
    },
    {
      stepNumber: 4,
      titleEn: "Pouring Water Over the Head & Thoroughly Rubbing Hair Roots",
      titleUrdu: "سر پر تین بار پانی ڈالنا اور بالوں کی جڑوں تک پہنچانا",
      descEn: "Pour water over the head three times, running fingers through the hair thoroughly (Takhlil) so water reaches the scalp skin and roots completely without missing a single hair.",
      descUrdu: "سر پر تین بار پانی ڈالیں اور انگلیوں سے بالوں کا خلال کریں تاکہ پانی سر کی کھال اور ہر بال کی جڑ تک مکمل طور پر پہنچ جائے اور کوئی بال خشک نہ رہے۔"
    },
    {
      stepNumber: 5,
      titleEn: "Washing the Entire Body (Right Side First, Then Left)",
      titleUrdu: "پورے جسم پر پانی بہانا (پہلے دائیں طرف، پھر بائیں طرف)",
      descEn: "Pour water generously over the entire body, beginning with the right side from shoulder to foot, then the left side. Rub the skin (Dalk) where possible and ensure water reaches the navel, underarms, ear contours, and between toes.",
      descUrdu: "پورے جسم پر اس طرح پانی بہائیں کہ سر سے پاؤں تک کوئی جگہ خشک نہ رہے۔ سنت طریقہ یہ ہے کہ پہلے دائیں طرف پھر بائیں طرف پانی بہائیں، بغلوں، ناف اور کانوں کے موڑ کا خصوصی خیال رکھیں۔"
    }
  ];

  const ghuslFaqs = [
    {
      qEn: "What are the obligatory minimums (Faraid) of Ghusl according to Islamic jurisprudence?",
      qUrdu: "غسل کے بنیادی فرائض کیا ہیں جن کے بغیر غسل ادا نہیں ہوتا؟",
      aEn: "According to the Hanafi school, the three obligatory acts (Faraid) are: 1) Rinsing the entire mouth thoroughly (Madmadah), 2) Rinsing the nostrils up to the soft bone (Istinshaq), and 3) Washing the entire body without leaving a single hair or millimeter of skin dry. In the Shafi'i, Maliki, and Hanbali schools, the two core pillars are: 1) Sincere intention (Niyyah) in the heart, and 2) Washing the entire body thoroughly including hair and skin. To ensure universal validity across all schools, a Muslim should always make the intention, rinse the mouth and nose thoroughly, and wash the entire body completely.",
      aUrdu: "فقہِ حنفی کے نزدیک غسل کے تین فرائض ہیں: ۱) منہ بھر کر کلی کرنا، ۲) ناک میں نرم ہڈی تک پانی پہنچانا، اور ۳) پورے جسم پر اس طرح پانی بہانا کہ بال برابر بھی کوئی جگہ سوکھی نہ رہے۔ جمہور فقہاء (شافعی، مالکی، حنبلی) کے نزدیک بنیادی فرائض نیت اور پورے جسم کا دھونا ہیں۔ احتیاط کا تقاضا ہے کہ نیت کے ساتھ کلی، ناک کی صفائی اور پورے جسم پر مکمل پانی بہایا جائے۔",
      ref: "Al-Fiqh al-Islami wa Adillatuh by Wahbah Zuhayli; Al-Hidayah"
    },
    {
      qEn: "Does a routine daily shower count as ritual Ghusl?",
      qUrdu: "کیا عام روزمرہ کا نہانا (شاور لینا) شرعی غسل کے قائم مقام ہو سکتا ہے؟",
      aEn: "A normal shower only removes ritual impurity if accompanied by two conditions: 1) A sincere intention (Niyyah) in the heart to remove ritual impurity for worship, and 2) Ensuring water reaches all required areas including thorough mouth and nasal rinsing and the scalp. If a person showers simply to cool down or get clean without intention or mouth/nose rinsing, ritual purity is not attained.",
      aUrdu: "عام شاور صرف اس صورت میں شرعی غسل بن سکتا ہے جب: ۱) دل میں ناپاکی دور کرنے کی نیت ہو، اور ۲) پورے جسم کے ساتھ ساتھ کلی کرنا اور ناک میں پانی پہنچانا بھی شامل ہو۔ اگر صرف گرمی دور کرنے یا صفائی کی غرض سے بغیر نیت اور بغیر کلی/ناک کی صفائی کے نہایا جائے تو شرعی ناپاکی دور نہیں ہوتی۔",
      ref: "Sahih al-Bukhari 1 ('Actions are by intentions'); Fatawa al-Lajnah al-Da'imah"
    },
    {
      qEn: "Do women have to untie braided hair when performing Ghusl?",
      qUrdu: "کیا عورت کے لیے غسلِ جنابت میں بالوں کی مینڈھیاں (چوٹیا) کھولنا ضروری ہے؟",
      aEn: "No, a woman does not need to undo tightly braided hair for Ghusl following Janabah (marital relations), provided water reaches the roots and scalp thoroughly. Umm Salamah (RA) asked Prophet Muhammad ﷺ: 'O Messenger of Allah, I am a woman who braids her hair firmly; should I undo it for Ghusl from Janabah?' He replied: 'No, it is sufficient for you to pour three handfuls of water over your head, then pour water over your whole body, and you will be purified' (Sahih Muslim 330). However, following menses (Hayd), several classical scholars recommended untying braids to guarantee complete water penetration.",
      aUrdu: "جی نہیں، غسلِ جنابت میں عورت کے لیے مینڈھیاں یا گندھے ہوئے بال کھولنا ضروری نہیں، بشرطیکہ پانی بالوں کی جڑوں اور کھال تک پہنچ جائے۔ ام المؤمنین حضرت ام سلمہ رضی اللہ عنہا نے عرض کیا تو رسول اللہ ﷺ نے فرمایا: 'نہیں، تمہارے لیے یہی کافی ہے کہ تم اپنے سر پر تین لپ بھر کر پانی ڈال لو، پھر اپنے سارے بدن پر پانی بہا لو، تم پاک ہو جاؤ گی' (صحیح مسلم: ۳۳۰)۔ البتہ حیض کے غسل میں بعض فقہاء نے کھولنے کو افضل قرار دیا ہے۔",
      ref: "Sahih Muslim 330; Jami' at-Tirmidhi 105"
    },
    {
      qEn: "Does waterproof nail polish or thick cosmetic wax prevent valid Ghusl and Wudu?",
      qUrdu: "کیا واٹر پروف نیل پالش یا لوشن غسل اور وضو کی راہ میں رکاوٹ بنتے ہیں؟",
      aEn: "Yes. Any impermeable substance that forms a physical barrier preventing water from touching the nail or skin surface (such as standard cosmetic nail polish, heavy waterproof makeup, or petroleum wax) invalidates both Wudu and Ghusl. Such barriers must be completely removed using nail polish remover or cleansing oil before performing ritual purification.",
      aUrdu: "جی ہاں! ہر ایسی تہہ دار چیز جو ناخن یا جلد تک پانی پہنچنے سے روکتی ہو (جیسے عام واٹر پروف نیل پالش یا گوند) اس کی موجودگی میں وضو اور غسل دونوں ادا نہیں ہوتے۔ غسل سے قبل نیل پالش ریموور سے ناخنوں کو صاف کرنا لازمی ہے۔",
      ref: "Al-Majmu' Sharh al-Muhadhdhab by Imam al-Nawawi"
    }
  ];

  const seoTitle = isUrdu
    ? "غسل کا مکمل مسنون طریقہ • فرائض، واجبات، سنتیں اور مسائل | IslamIQ"
    : "Ghusl & Taharah Guide: Step-by-Step, Faraid, Sunnah & FAQs | IslamIQ";

  const seoDescription = isUrdu
    ? "غسل کا مکمل مسنون طریقہ، غسل کن صورتوں میں فرض ہوتا ہے، تین بنیادی فرائض، حیض و جنابت کی طہارت کے احکام، خواتین کے مسائل اور روزمرہ فقہی سوالات کے مستند جوابات۔"
    : "Complete authentic guide to Ghusl (ritual bath) and Taharah in Islam. Learn when Ghusl becomes obligatory, core Faraid across Islamic jurisprudence, step-by-step Sunnah method, common mistakes, and everyday practical rulings with verified Hadith citations.";

  const faqsForSchema = ghuslFaqs.map(f => ({
    question: isUrdu ? f.qUrdu : f.qEn,
    answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/ghusl-taharah-guide"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'طہارت و نماز' : 'Purification & Salah', url: '/salah-learning' },
          { name: isUrdu ? 'غسل و طہارت گائیڈ' : 'Ghusl & Taharah Guide', url: '/ghusl-taharah-guide' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'غسل اور طہارت کا مکمل طریقہ: فرائض، سنتیں اور مسائل' : 'Ghusl & Taharah Guide: Complete Method, Obligations & Scholarly Rulings',
          description: seoDescription,
          datePublished: '2026-10-02',
          dateModified: '2026-10-02',
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-teal-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-teal-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs sm:text-sm font-semibold border border-teal-400/30">
            <Droplets className="w-4 h-4 text-teal-400" />
            <span>{isUrdu ? 'کامل شرعی طہارت' : 'Complete Ritual Purity (Taharah)'}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share Ghusl guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? 'غسل اور طہارت کا مکمل طریقہ (Ghusl Guide)' : 'Ghusl & Taharah Guide: Step-by-Step Method & Fiqh Rules'}
        </h1>

        <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu
            ? 'غسل اسلام میں ناپاکی دور کرنے اور عبادت کے لیے پاکیزگی حاصل کرنے کا لازمی فریضہ ہے۔ جانیے غسل کب فرض ہوتا ہے، اس کے بنیادی فرائض، مکمل مسنون طریقہ، اور روزمرہ فقہی مسائل مع قرآن و صحیح حدیث کے دلائل۔'
            : 'Explore the complete Islamic jurisprudence of Ghusl (full ritual bath). Understand when major purification is obligatory, the core obligatory pillars (Faraid) across Sunni schools, the step-by-step Sunnah method, and practical answers to common modern situations.'}
        </p>

        {/* Foundational Quran Ayah Banner */}
        <div className="bg-teal-900/60 border border-teal-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-teal-300 text-xs font-semibold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'طہارت کا قرآنی حکم' : 'Divine Quranic Mandate of Purification'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «وَإِن كُنتُمْ جُنُبًا فَاطَّهَّرُوا»
          </p>
          <p className="text-xs sm:text-sm text-teal-100">
            {isUrdu
              ? 'اور اگر تم حالتِ جنابت میں ہو تو اچھی طرح نہا کر پاکیزگی حاصل کرو۔'
              : 'And if you are in a state of Janabah (major ritual impurity), then purify yourselves.'}
          </p>
          <span className="inline-block text-[11px] text-teal-300/80 font-mono">
            Surah Al-Ma'idah (5:6) • سورۃ المائدۃ: ۶
          </span>
        </div>
      </header>

      {/* When Ghusl Becomes Obligatory */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-700" />
          <span>{isUrdu ? 'غسل کن صورتوں میں فرض ہوتا ہے؟' : 'When Does Ghusl Become Obligatory?'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {obligatoryOccasions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2.5 hover:border-teal-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-xl bg-teal-100 text-teal-900 text-xs font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUrdu ? item.titleUrdu : item.titleEn}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? item.descUrdu : item.descEn}
              </p>
              <span className="inline-block text-[11px] font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md">
                {isUrdu ? 'دلیل: ' : 'Proof: '} {item.proof}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Step-by-Step Complete Sunnah Method */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مسنون طریقہ' : 'Complete Sunnah Workflow'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            {isUrdu ? 'غسل کا مکمل مسنون طریقہ مرحلہ وار' : 'Step-by-Step Complete Sunnah Method of Ghusl'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'ام المؤمنین حضرت عائشہ اور حضرت میمونہ رضی اللہ عنہما کی صحیح روایات سے ماخوذ نبوی طریقہ۔'
              : 'Derived from authenticated narrations of Lady Aisha and Lady Maymunah (may Allah be pleased with them) in Sahih al-Bukhari and Sahih Muslim.'}
          </p>
        </div>

        <div className="space-y-3">
          {ghuslSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex items-start gap-4 hover:border-teal-300 transition-colors"
            >
              <span className="w-8 h-8 rounded-2xl bg-teal-700 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
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

      {/* Common Mistakes to Avoid */}
      <section className="bg-rose-50/70 border border-rose-200 rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-rose-900 font-bold text-sm sm:text-base">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{isUrdu ? 'غسل کے دوران عام غلطیاں جن سے بچنا ضروری ہے' : 'Common Mistakes That May Invalidate Ghusl'}</span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc list-inside">
          <li>
            <strong>{isUrdu ? 'واٹر پروف نیل پالش یا موم: ' : 'Impermeable Barriers: '}</strong>
            {isUrdu
              ? 'ناخنوں پر واٹر پروف نیل پالش یا بالوں پر واٹر پروف لوشن کے ہوتے ہوئے غسل نہیں ہوتا کیونکہ پانی جلد تک نہیں پہنچتا۔'
              : 'Nail polish, thick wax, or waterproof substances that prevent water from touching the skin or nails must be fully removed.'}
          </li>
          <li>
            <strong>{isUrdu ? 'کلی اور ناک میں پانی نہ پہنچانا: ' : 'Neglecting Mouth and Nose: '}</strong>
            {isUrdu
              ? 'صرف جسم پر پانی بہا دینا کافی نہیں؛ حنفی فقہ کے مطابق منہ بھر کر کلی کرنا اور ناک میں نرم ہڈی تک پانی پہنچانا فرض ہے۔'
              : 'Thoroughly rinsing the mouth and nostrils is obligatory in the Hanafi school and a confirmed Sunnah in others.'}
          </li>
          <li>
            <strong>{isUrdu ? 'بالوں کی جڑوں اور موڑوں کی غفلت: ' : 'Missing Hidden Body Contours: '}</strong>
            {isUrdu
              ? 'ناف کا اندرونی حصہ، بغلیں، کانوں کے موڑ اور گھنے بالوں کی جڑوں تک پانی نہ پہنچنے سے غسل نامکمل رہ جاتا ہے۔'
              : 'Failing to ensure water reaches the inside of the navel, underarms, ear folds, and scalp hair roots leaves Ghusl incomplete.'}
          </li>
        </ul>
      </section>

      {/* Crawlable Internal Links */}
      <section className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-teal-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'طہارت و نماز کی دیگر گائیڈز' : 'Related Purification Guides'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'وضو اور نماز کی مکمل شرعی رہنمائی' : 'Explore Wudu, Tayammum & Prayer Guides'}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {isUrdu
              ? 'وضو کے ۴ فرائض، پانی نہ ہونے پر تیمم کا طریقہ، اور نماز کا مکمل طریقہ دیکھیں۔'
              : 'Strengthen your daily worship with our step-by-step guides on Wudu ablution, dry purification (Tayammum), and Salah.'}
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
                {isUrdu ? 'وضو کا مکمل مسنون طریقہ' : 'How to Perform Wudu'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? '۴ قرآنی فرائض، سنتیں اور وضو توڑنے والی چیزیں۔' : 'The 4 Quranic obligations, complete Sunnah steps, and nullifiers.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-200 underline mt-3">
              {isUrdu ? 'وضو گائیڈ پڑھیں ←' : 'Read Wudu Guide →'}
            </span>
          </a>

          <a
            href="/tayammum-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('tayammum-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-amber-300 font-bold block mb-1">
                {isUrdu ? 'پاکی کا متبادل' : 'Dry Ablution'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'تیمم کا مکمل شرعی طریقہ' : 'Tayammum Guide'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'پانی کی عدم دستیابی یا بیماری میں پاک مٹی سے طہارت۔' : 'Purification with clean earth when water is absent or harmful.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-200 underline mt-3">
              {isUrdu ? 'تیمم گائیڈ پڑھیں ←' : 'Read Tayammum Guide →'}
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
              <span className="text-xs text-emerald-300 font-bold block mb-1">
                {isUrdu ? 'نماز کا طریقہ' : 'Salah Manual'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'نماز کا جامع فقہی ریفرنس' : 'How to Perform Salah'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'تکبیر سے سلام تک ارکان، واجبات اور دعائیں۔' : 'Complete manual covering prayer postures, recitations, and corrections.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 underline mt-3">
              {isUrdu ? 'نماز گائیڈ پڑھیں ←' : 'Read Salah Guide →'}
            </span>
          </a>
        </div>
      </section>

      {/* Useful Fiqh FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>{isUrdu ? 'غسل کے متعلق اہم فقہی سوالات کے جوابات' : 'Frequently Asked Questions on Ghusl & Taharah'}</span>
        </div>

        <div className="space-y-3">
          {ghuslFaqs.map((faq, idx) => {
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
                    <ChevronUp className="w-4 h-4 text-teal-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-teal-700 font-semibold block pt-1">
                      {isUrdu ? 'مستند حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="ghusl-taharah-guide" />
    </article>
  );
};

export default GhuslTaharahGuide;

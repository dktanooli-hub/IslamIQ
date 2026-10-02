import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_HADITHS } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Heart, Copy, ShieldCheck, Sparkles, BookOpen, Volume2, Award, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Compass } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyHadithHub: React.FC = () => {
  const { contentLang, setActiveTab, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayHadith = VERIFIED_HADITHS[dayIndex % VERIFIED_HADITHS.length];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Hadith copied! (حدیث مبارکہ کاپی کر لی گئی)');
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

  const faqs = [
    {
      qEn: "How do Hadith scholars determine if a narration is Sahih (authentic)?",
      qUrdu: "محدثین کے نزدیک کسی حدیث کے 'صحیح' ہونے کی کیا شرائط ہیں؟",
      aEn: "A Hadith is classified as Sahih only when five strict criteria are fulfilled: 1) Continuous unbroken chain of narrators (Ittisal al-Sanad), 2) Impeccable moral uprightness and honesty of each narrator ('Adalah), 3) Flawless accuracy and memory of each narrator (Dabt), 4) Absence of contradictory anomaly against established stronger evidence (Adam al-Shudhudh), and 5) Complete freedom from obscure hidden defects (Adam al-'Illa).",
      aUrdu: "کسی بھی حدیث کو صحیح قرار دینے کے لیے علمِ حدیث کے پانچ کڑے اصول ہیں: ۱) متصل سند (ہر راوی نے اپنے استاد سے براہ راست سنا ہو)، ۲) راویوں کا عادل، پرہیزگار اور سچا ہونا، ۳) ہر راوی کا قوی حافظہ اور ضبط ہونا، ۴) کسی قوی روایت کے خلاف شذوذ نہ ہونا، اور ۵) حدیث کا کسی مخفی علت یا عیب سے پاک ہونا۔",
      ref: "Muqaddimah Ibn al-Salah; Tadrib al-Rawi"
    },
    {
      qEn: "What is the difference between Hadith Qudsi and Hadith Nabawi?",
      qUrdu: "حدیثِ قدسی اور حدیثِ نبوی میں کیا فرق ہے؟",
      aEn: "In Hadith Qudsi, the meaning and authority is directly from Allah Almighty ('Allah says...'), while the phrasing is transmitted by Prophet Muhammad ﷺ. In regular Hadith Nabawi, both the sacred teachings and the phrasing originate from the inspired Sunnah of the Prophet ﷺ. Neither Hadith Qudsi nor Hadith Nabawi can be recited as the Quran inside Salah.",
      aUrdu: "حدیثِ قدسی وہ مبارک کلام ہے جس کا مضمون اور مفہوم براہِ راست اللہ سبحانہ و تعالیٰ کی طرف سے ہو اور الفاظ رسول اللہ ﷺ کے ہوں۔ جبکہ حدیثِ نبوی میں تعلیم اور الفاظ دونوں نبی کریم ﷺ کے ارشادات، افعال یا خاموش تائیدات پر مشتمل ہوتے ہیں۔ دونوں میں سے کسی کو بھی نماز میں قرآن کی طرح بطور قراءت نہیں پڑھا جا سکتا۔",
      ref: "Sharh Sahih Muslim by Imam al-Nawawi"
    },
    {
      qEn: "Can a weak (Da'if) hadith be used as evidence for Islamic law?",
      qUrdu: "کیا ضعیف حدیث سے شرعی حکم یا حلال و حرام ثابت کیا جا سکتا ہے؟",
      aEn: "The scholarly consensus across the major schools is that weak (Da'if) hadiths cannot be used to establish Islamic creed (Aqeedah), legal obligations (Faraid), or prohibitions (Haram). A minority of classical scholars permitted citing lightly weak hadiths solely for encouraging virtuous deeds (Fada'il al-A'mal), provided the narration is not fabricated and conforms to a general established principle of the Quran or Sunnah.",
      aUrdu: "تمام جمہور محدثین اور فقہاء کا متفقہ فیصلہ ہے کہ عقائد اور حلال و حرام کے احکام صرف قرآن اور صحیح یا حسن احادیث سے ثابت ہوتے ہیں، ضعیف روایت سے نہیں۔ بعض ائمہ نے صرف فضائلِ اعمال میں ضعیف حدیث کے بیان کی مشروط اجازت دی ہے بشرطیکہ وہ سخت ضعیف یا من گھڑت نہ ہو اور شریعت کے کسی عمومی اصل کے تحت ہو۔",
      ref: "Al-Khatib al-Baghdadi; Imam al-Nawawi (Al-Adhkar)"
    },
    {
      qEn: "What are the Six Canonical Books of Hadith (Al-Kutub al-Sittah)?",
      qUrdu: "صحاحِ ستہ (حدیث کی چھ معتبر ترین کتابیں) کون سی ہیں؟",
      aEn: "The six universally recognized collections of the Sunnah are: 1) Sahih al-Bukhari, 2) Sahih Muslim, 3) Sunan Abi Dawud, 4) Jami' at-Tirmidhi, 5) Sunan al-Nasa'i, and 6) Sunan Ibn Majah. Together they represent the most rigorously vetted repository of Prophetic traditions.",
      aUrdu: "امتِ مسلمہ میں حدیث کی چھ مستند ترین کتابوں کو 'صحاحِ ستہ' کہا جاتا ہے: ۱) صحیح بخاری، ۲) صحیح مسلم، ۳) سنن ابی داؤد، ۴) جامع ترمذی، ۵) سنن نسائی، اور ۶) سنن ابن ماجہ۔ ان کتب میں رسول اللہ ﷺ کے ارشادات اور اسوہ حسنہ کو نہایت باریک بینی کے ساتھ محفوظ کیا گیا ہے۔",
      ref: "Siyar A'lam al-Nubala by Al-Dhahabi"
    }
  ];

  const seoTitle = isUrdu
    ? 'روزانہ کی حدیث مبارکہ مستند حوالہ کے ساتھ • Daily Hadith | IslamIQ'
    : 'Daily Hadith – Authentic Sahih Hadith with Lessons | IslamIQ';

  const seoDescription = isUrdu
    ? 'صحیح بخاری و صحیح مسلم سے روزانہ کی احادیث مبارکہ، راوی کا نام، اردو و انگلش ترجمہ اور زندگی بدلنے والے عملی اسباق۔'
    : 'Daily authentic Hadiths from Sahih al-Bukhari and Sahih Muslim. Learn practical daily lessons, authentic narrators, and Islamic teachings with verified sources.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-hadith"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Hadith', url: '/daily-hadith' }
        ]}
        faqs={faqs.map(f => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? f.aUrdu : f.aEn
        }))}
        article={{
          headline: `Daily Hadith: ${todayHadith.source} - Narrated by ${todayHadith.narrator}`,
          description: todayHadith.textUrdu,
        }}
      />

      {/* Featured Today's Hadith */}
      <header className="bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-400" />
            <span>{isUrdu ? 'آج کی منتخب حدیث مبارکہ' : "Today's Sahih Hadith"}</span>
          </div>
          <span className="text-xs bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
            {todayHadith.source} #{todayHadith.hadithNumber} ({todayHadith.grade})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی حدیث مبارکہ (Daily Hadith)' : 'Daily Hadith – Words of Prophet Muhammad ﷺ'}
        </h1>

        {/* Featured Hadith Box */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <p className="text-xs text-amber-200 font-semibold">
            {isUrdu ? `راوی: ${todayHadith.narrator}` : `Narrator: ${todayHadith.narrator}`}
          </p>

          <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-amber-50 font-semibold">
            {todayHadith.arabic}
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-semibold">
              {todayHadith.textUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayHadith.textEn}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-600/30 text-xs text-emerald-100">
            <strong>{isUrdu ? 'عملی سبق: ' : 'Practical Lesson: '}</strong>
            <span>{isUrdu ? todayHadith.lessonUrdu : todayHadith.lessonEn}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-slate-300 font-medium">
              Source: {todayHadith.source}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayHadith.textUrdu : todayHadith.textEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Listen Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayHadith.id, `${todayHadith.textUrdu}\n[${todayHadith.source}: ${todayHadith.hadithNumber}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Hadith"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Educational Context & Hadith Science Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>{isUrdu ? 'حدیث نبوی کی اہمیت اور فہمِ دین' : 'Educational Context: The Role of Prophetic Sunnah'}</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
          {isUrdu
            ? 'سنتِ نبوی ﷺ قرآنِ کریم کی عملی تشریح اور اسلام کا دوسرا بنیادی ماخذ ہے۔ نبی کریم ﷺ کے ارشادات، افعال اور خاموش تصدیقات ہماری عبادات، اخلاقیات اور روزمرہ زندگی کے لیے کامل نمونہ ہیں۔ اس صفحے کا مقصد صحیح احادیث کو مستند حوالہ جات، راوی کے تعارف اور زندگی بدلنے والے عملی اسباق کے ساتھ پیش کرنا ہے۔'
            : 'The Sunnah of Prophet Muhammad ﷺ constitutes the authoritative living exposition of the Holy Quran and the secondary foundational pillar of Islamic law and ethics. This Daily Hadith hub curates rigorously verified narrations from the most respected classical compilations, providing exact volume citations, narrator context, and concrete moral applications that guide our personal character, family life, and societal interactions.'}
        </p>

        {/* Foundational Hadith Quote */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 space-y-2">
          <p className="font-arabic text-right text-base sm:text-lg text-teal-950 font-bold leading-relaxed" dir="rtl">
            «نَضَّرَ اللَّهُ امْرَأً سَمِعَ مِنَّا حَدِيثًا فَحَفِظَهُ حَتَّى يُبَلِّغَهُ»
          </p>
          <p className="text-xs sm:text-sm text-teal-900 font-medium">
            {isUrdu
              ? 'رسول اللہ ﷺ نے دعا فرمائی: "اللہ اس شخص کے چہرے کو ترو تازہ رکھے جس نے ہم سے کوئی حدیث سنی، اسے یاد رکھا اور آگے پہنچایا۔"'
              : 'The Messenger of Allah ﷺ prayed: "May Allah brighten the face of a person who hears a hadith from us, preserves it, and conveys it to others."'}
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block">
            Reference: Jami' at-Tirmidhi 2658 (جامع ترمذی: ۲۶۵۸ - حدیث حسن صحیح)
          </span>
        </div>
      </section>

      {/* Crawlable High-Value Internal Link to Full Hadith Learning Guide */}
      <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'حدیث سائنس کا مطالعہ' : 'Hadith Sciences'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'حدیث گائیڈ: اصولِ حدیث اور صحاح ستہ کی مکمل تفصیل' : 'Explore the Full Hadith Learning & Verification Guide'}
          </h3>
          <p className="text-xs text-emerald-100 max-w-xl">
            {isUrdu
              ? 'علم الاسناد، راویوں کی جانچ پڑتال، صحیح اور ضعیف احادیث میں فرق اور امام بخاری و مسلم کے طریقہ تدوین کا تحقیقی مطالعہ۔'
              : 'Understand how Hadith scholars verified chains (Isnad), distinguished authentic narrations from fabrications, and compiled the Six Canonical Books.'}
          </p>
        </div>

        <a
          href="/hadith-learning-guide"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('hadith-learning-guide');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <span>{isUrdu ? 'حدیث گائیڈ پڑھیں' : 'Read Hadith Guide'}</span>
          <ArrowRight className="w-4 h-4 text-emerald-800" />
        </a>
      </section>

      {/* Curated Hadiths List */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'صحیح احادیث کا منتخب ذخیرہ (Sahih Hadith Archive)' : 'Verified Sahih Hadith Collection'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {VERIFIED_HADITHS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {item.source} #{item.hadithNumber} • {item.grade}
                </span>
                <span className="text-[11px] text-slate-400">
                  {item.narrator}
                </span>
              </div>

              <p className="font-arabic text-base sm:text-lg leading-relaxed text-right text-slate-900 font-semibold py-1">
                {item.arabic}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {item.textUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {item.textEn}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs leading-relaxed">
                <strong className="text-emerald-800">{isUrdu ? 'سبق: ' : 'Takeaway: '}</strong>
                <span>{isUrdu ? item.lessonUrdu : item.lessonEn}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'صحیح سند کے ساتھ' : 'Verified Chain & Text'}</span>
                </span>

                <button
                  onClick={() => handleCopy(item.id, `${item.textUrdu}\n[${item.source} : ${item.hadithNumber}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === item.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Useful Educational FAQs Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>{isUrdu ? 'علومِ حدیث اور اسوہ حسنہ کے متعلق ضروری سوال و جواب' : 'Frequently Asked Questions on Hadith Sciences'}</span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {isUrdu ? faq.qUrdu : faq.qEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-teal-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-teal-700 font-semibold block pt-1 border-t border-slate-100">
                      Scholarly Reference / معتبر مآخذ: {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-hadith" />
    </article>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QURAN_VERSES } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { BookOpen, Copy, Share2, Volume2, ShieldCheck, Heart, Sparkles, Filter, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Compass } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyQuranVerseHub: React.FC = () => {
  const { contentLang, setActiveTab, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // Deterministic verse for today
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayVerse = VERIFIED_QURAN_VERSES[dayIndex % VERIFIED_QURAN_VERSES.length];

  const filteredVerses = selectedTheme === 'all'
    ? VERIFIED_QURAN_VERSES
    : VERIFIED_QURAN_VERSES.filter((v) => v.theme.toLowerCase().includes(selectedTheme.toLowerCase()));

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Ayah copied! (آیت کاپی کر لی گئی)');
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
      qEn: "Is it permissible to recite the Quran without Wudu?",
      qUrdu: "کیا بغیر وضو کے قرآن پاک کی تلاوت کی جا سکتی ہے؟",
      aEn: "Yes, you may recite the Quran from memory or read on digital screens without Wudu, provided one is free from major ritual impurity (Janabah). However, touching the physical printed Arabic Mushaf requires ritual purification according to the consensus of the majority of classical scholars based on Surah Al-Waqi'ah (56:79).",
      aUrdu: "جی ہاں! زبانی تلاوت کرنا یا موبائل اور کمپیوٹر اسکرین سے دیکھ کر پڑھنا بغیر وضو جائز ہے (بشرطیکہ غسل واجب نہ ہو)۔ البتہ اصل کاغذی مصحف (قرآن مجید) کو چھونے کے لیے وضو کا ہونا جمہور فقہاء کے نزدیک ضروری ہے جیسا کہ سورۃ الواقعہ (۵۶:۷۹) میں اشارہ ہے۔",
      ref: "Surah Al-Waqi'ah 56:79; Al-Mawsu'ah al-Fiqhiyyah"
    },
    {
      qEn: "What is the difference between reciting in Arabic and reading translations?",
      qUrdu: "عربی تلاوت اور ترجمہ پڑھنے میں کیا فرق اور فضیلت ہے؟",
      aEn: "Reciting the original Arabic text carries direct divine reward of 10 good deeds (Hasanat) per letter, as affirmed by the Prophet ﷺ (Jami' at-Tirmidhi 2910). Reading reliable translations in Urdu or English is essential for non-Arabic speakers to understand Allah's commands, moral guidance, and legal rulings. A complete daily relationship with the Quran combines both Arabic recitation and thoughtful translation study.",
      aUrdu: "عربی زبان میں اصل کلامِ الٰہی کی تلاوت پر ہر ہر حرف کے بدلے ۱۰ نیکیوں کا وعدہ ہے (ترمذی: ۲۹۱۰)۔ دوسری طرف اپنی مادری زبان (اردو یا انگریزی) میں ترجمہ و تفسیر پڑھنا احکامِ الٰہی، حلال و حرام اور اخلاقی ہدایات کو سمجھنے کے لیے ناگزیر ہے۔ کامل طریقہ یہ ہے کہ دونوں کو روزمرہ معمول کا حصہ بنایا جائے۔",
      ref: "Jami' at-Tirmidhi 2910 (Graded Hasan Sahih)"
    },
    {
      qEn: "What is Tadabbur (Quranic Reflection) and why is it essential?",
      qUrdu: "تدبرِ قرآن سے کیا مراد ہے اور اس کی کیا اہمیت ہے؟",
      aEn: "Tadabbur means pausing over the verses, contemplating their deep meanings, and asking how each divine reminder applies to one's personal character, decisions, and worship. Allah states in Surah Sad (38:29): '[This is] a blessed Book which We have revealed to you, [O Muhammad], that they might reflect upon its verses and that those of understanding would be reminded.'",
      aUrdu: "تدبر کا مطلب آیات کے معانی میں غور و فکر کرنا، اللہ کی نصیحت کو دل میں اتارنا اور اپنی عملی زندگی کا محاسبہ کرنا ہے۔ اللہ تعالیٰ کا فرمان ہے: 'یہ ایک برکت والی کتاب ہے جو ہم نے آپ کی طرف نازل کی تاکہ وہ اس کی آیات پر تدبر کریں اور عقل والے نصیحت حاصل کریں' (سورۃ ص: ۲۹)۔",
      ref: "Surah Sad 38:29; Tafsir Ibn Kathir"
    },
    {
      qEn: "What should one do when encountering a verse of Sajdah (Sajdah Tilawah)?",
      qUrdu: "دورانِ تلاوت سجدہ تلاوت کی آیت آئے تو کیا حکم ہے؟",
      aEn: "When reciting or listening to one of the 14-15 designated verses of prostration in the Quran, it is a confirmed Sunnah (and Wajib according to the Hanafi school) to immediately make a single prostration facing Qibla, praising Allah, without needing to raise hands for Takbeer Tahreemah or pronounce the closing Salam.",
      aUrdu: "قرآنِ مجید میں سجدہ تلاوت کے ۱۴ یا ۱۵ مقامات ہیں۔ تلاوت کرتے وقت یا سننے پر قبلہ رخ ہو کر فوراً ایک سجدہ کرنا مسنون اور واجب (احناف کے نزدیک) ہے، جس میں اللہ کی حمد و تسبیح بیان کی جاتی ہے۔ اس کے لیے تشہد یا سلام کی ضرورت نہیں ہوتی۔",
      ref: "Sahih Muslim 81; Sunan Abi Dawud 1414"
    }
  ];

  const seoTitle = isUrdu
    ? 'روزانہ کی قرآنی آیت بمعہ اردو ترجمہ و تفسیر • Daily Quran Verse | IslamIQ'
    : 'Daily Quran Verse with Translation and Meaning | IslamIQ';

  const seoDescription = isUrdu
    ? 'روزانہ کی خوبصورت قرآنی آیات، عربی تلاوت، آسان اردو اور انگلش ترجمہ اور سورہ کے حوالہ جات کے ساتھ مطالعہ فرمائیں۔'
    : 'Read inspiring Daily Quran Verses with Arabic text, authentic Urdu and English translations, Surah and Ayah numbers, and thematic reflections.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-quran-verse"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Quran Verse', url: '/daily-quran-verse' }
        ]}
        faqs={faqs.map(f => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? f.aUrdu : f.aEn
        }))}
        article={{
          headline: `Daily Quran Verse: Surah ${todayVerse.surahNameEn} (${todayVerse.surahNumber}:${todayVerse.ayahNumber})`,
          description: todayVerse.translationUrdu,
        }}
      />

      {/* Featured Today's Verse */}
      <header className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آج کی منتخب قرآنی آیت' : "Today's Featured Verse"}</span>
          </div>
          <span className="text-xs text-emerald-200/80 font-mono">
            Surah {todayVerse.surahNameEn} ({todayVerse.surahNumber}:{todayVerse.ayahNumber})
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی قرآنی آیت (Daily Quran Verse)' : 'Daily Quran Verse with Authentic Meaning'}
        </h1>

        {/* Featured Ayah Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <p className="font-arabic text-xl sm:text-2xl leading-loose text-center text-amber-100 font-bold selection:bg-emerald-700">
            {todayVerse.arabic}
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4 text-center">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-medium">
              {todayVerse.translationUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayVerse.translationEn}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-emerald-300 font-semibold">
              {todayVerse.theme}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayVerse.translationUrdu : todayVerse.translationEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Audio Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayVerse.id, `${todayVerse.arabic}\n\n${todayVerse.translationUrdu}\n[سورۃ ${todayVerse.surahNameArabic} : ${todayVerse.ayahNumber}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Verse"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Educational Context & Purpose Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'قرآنی رہنمائی اور روزانہ تلاوت کے فضائل' : 'Educational Context: The Role of Daily Quranic Reflection'}</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
          {isUrdu
            ? 'قرآنِ مجید اللہ سبحانہ و تعالیٰ کا آخری اور ابدی کلام ہے، جو تمام انسانیت کے لیے ہدایت، شفا اور نور بنا کر نازل کیا گیا۔ اس صفحے کا مقصد ہر مسلمان کو روزانہ کم از کم ایک آیتِ مبارکہ کے عربی متن، مستند ترجمہ اور مفہوم کے ساتھ تدبر کرنے کا موقع فراہم کرنا ہے تاکہ قرآنی تعلیمات ہماری عملی زندگی کا حصہ بن سکیں۔'
            : 'The Noble Quran is the eternal speech of Allah Almighty, revealed to guide humanity from darkness into light. This Daily Quran Verse hub provides believers with an accessible daily connection to divine revelation, combining authentic Arabic calligraphy, verified translations in Urdu and English, and focused thematic reflections (Tadabbur) that nurture moral conscience, resilience, and inner tranquility.'}
        </p>

        {/* Foundational Hadith Quote */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
          <p className="font-arabic text-right text-base sm:text-lg text-emerald-950 font-bold leading-relaxed" dir="rtl">
            «خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ»
          </p>
          <p className="text-xs sm:text-sm text-emerald-900 font-medium">
            {isUrdu
              ? 'رسول اللہ ﷺ نے فرمایا: "تم میں سے سب سے بہترین شخص وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔"'
              : 'The Messenger of Allah ﷺ said: "The best among you are those who learn the Quran and teach it to others."'}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Reference: Sahih al-Bukhari 5027 (صحیح بخاری: ۵۰۲۷)
          </span>
        </div>
      </section>

      {/* Crawlable High-Value Internal Link to Full Quran Learning Guide */}
      <section className="bg-gradient-to-r from-teal-800 via-emerald-800 to-emerald-900 text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مکمل قرآنی رہنمائی' : 'In-Depth Learning'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'قرآن مجید سیکھنے کی جامع گائیڈ کا مطالعہ کریں' : 'Explore the Full Quran Learning & Tajweed Guide'}
          </h3>
          <p className="text-xs text-emerald-100 max-w-xl">
            {isUrdu
              ? 'تجوید کے بنیادی اصول، تلاوت کے آداب، جمع و تدوینِ قرآن کی تاریخ اور سورہ حفظ کرنے کے آسان طریقے۔'
              : 'Master Tajweed fundamentals, Tilawah etiquette, the history of Quranic preservation under the Caliphs, and memorization methods.'}
          </p>
        </div>

        <a
          href="/quran-learning-guide"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('quran-learning-guide');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <span>{isUrdu ? 'قرآن گائیڈ پڑھیں' : 'Read Quran Guide'}</span>
          <ArrowRight className="w-4 h-4 text-emerald-800" />
        </a>
      </section>

      {/* Archive / Curated Quranic Verses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>
              {isUrdu ? 'قرآنی آیات کا منتخب گلدستہ (Thematic Verses)' : 'Curated Quranic Verses for Reflection'}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredVerses.map((verse) => (
            <div
              key={verse.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  Surah {verse.surahNameEn} ({verse.surahNameArabic}) • {verse.surahNumber}:{verse.ayahNumber}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {verse.theme}
                </span>
              </div>

              <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-slate-900 font-semibold py-1">
                {verse.arabic}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {verse.translationUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {verse.translationEn}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'مستند قرآنی متن' : 'Authentic Quranic Text'}</span>
                </span>

                <button
                  onClick={() => handleCopy(verse.id, `${verse.arabic}\n\n${verse.translationUrdu}\n[Surah ${verse.surahNameEn} : ${verse.ayahNumber}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === verse.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Useful Educational FAQs Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'روزانہ کی تلاوت سے متعلق اہم سوالات و جوابات' : 'Frequently Asked Questions on Daily Quran Recitation'}</span>
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
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-1 border-t border-slate-100">
                      Evidence / حوالہ: {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-quran-verse" />
    </article>
  );
};

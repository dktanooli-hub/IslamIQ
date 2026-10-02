import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_DUAS } from '../../data/verifiedContent';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Sparkles, Copy, Volume2, ShieldCheck, BookOpen, Heart, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Compass } from 'lucide-react';
import { SpeechEngine } from '../../utils/audio';

export const DailyDuaHub: React.FC = () => {
  const { contentLang, setActiveTab, showToast, isSpeaking, setIsSpeaking } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const todayDua = VERIFIED_DUAS[dayIndex % VERIFIED_DUAS.length];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Dua copied! (دعا کاپی کر لی گئی)');
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
      qEn: "What are the most virtuous times when Duas are readily accepted (Awqat al-Ijabah)?",
      qUrdu: "دعاؤں کی قبولیت کے سب سے خاص اور بابرکت اوقات کون سے ہیں؟",
      aEn: "Authentic Hadith narrations highlight several golden moments for answered prayer: 1) The last third of the night before dawn (Tahajjud), 2) Between the Adhan and the Iqamah (Sunan Abi Dawud 521), 3) While in prostration (Sajdah) in prayer (Sahih Muslim 482), 4) The final hour of Friday before Maghrib, 5) While fasting and at the time of breaking the fast (Iftar), 6) During rainfall, and 7) While on a journey.",
      aUrdu: "احادیثِ مبارکہ میں دعاؤں کی قبولیت کے چند مخصوص اوقات بیان ہوئے ہیں: ۱) رات کا آخری تہائی حصہ (تہجد کا وقت)، ۲) اذان اور اقامت کے درمیانی لمحات (سنن ابی داؤد: ۵۲۱)، ۳) نماز میں سجدے کی حالت (صحیح مسلم: ۴۸۲)، ۴) جمعہ کے دن عصر کے بعد آخری گھڑی، ۵) حالتِ روزہ اور افطار کا وقت، ۶) بارش برستے وقت، اور ۷) مسافرت کے دوران۔",
      ref: "Sahih Muslim 482; Sunan Abi Dawud 521; Jami' at-Tirmidhi 3595"
    },
    {
      qEn: "Why does a sincere Dua sometimes seem delayed or unanswered?",
      qUrdu: "مخلصانہ دعا کے باوجود فوری اثر کیوں ظاہر نہیں ہوتا؟",
      aEn: "Prophet Muhammad ﷺ explained that every sincere believer's prayer is answered in one of three ways: 1) Allah grants the exact request in this life, 2) Allah averts an equal calamity or evil from the person, or 3) Allah reserves the reward as eternal treasure for the Hereafter. Thus, no genuine supplication is ever wasted.",
      aUrdu: "رسول اللہ ﷺ نے تسلی دیتے ہوئے فرمایا کہ مسلمان کی ہر جائز دعا تین طریقوں میں سے ایک طریقے سے ضرور قبول ہوتی ہے: ۱) یا تو اسے دنیا میں وہی چیز عطا کر دی جاتی ہے، ۲) یا اس کے بدلے کوئی آنے والی مصیبت یا بلا ٹال دی جاتی ہے، ۳) یا پھر اس کا عظیم اجر آخرت کے لیے ذخیرہ کر دیا جاتا ہے۔ پس مومن کی کوئی دعا رائیگاں نہیں جاتی۔",
      ref: "Musnad Ahmad 11133 (Graded Sahih)"
    },
    {
      qEn: "What are the essential etiquettes (Adab) of making Dua?",
      qUrdu: "دعا مانگنے کے بنیادی اور مسنون آداب کیا ہیں؟",
      aEn: "Essential etiquettes include: ensuring Halal earnings and food, facing the Qiblah, raising both hands with open palms, beginning by praising Allah (Hamd) and sending blessings upon the Prophet ﷺ (Durood), supplicating with firm conviction without using conditional phrases like 'if You will', and persisting with patient humility.",
      aUrdu: "دعا کے اہم ترین آداب یہ ہیں: لقمہ حلال کا اہتمام، باوضو اور قبلہ رخ ہونا، دونوں ہاتھ عاجزی سے سینے کے سامنے اٹھانا، دعا کا آغاز اللہ کی حمد و ثناء اور رسول اللہ ﷺ پر درودِ پاک سے کرنا، پختہ یقین کے ساتھ مانگنا اور جلد بازی یا مایوسی سے بچنا۔",
      ref: "Jami' at-Tirmidhi 3477; Riyadh al-Salihin"
    },
    {
      qEn: "Can I make Dua in Urdu or English, or must it be in Arabic?",
      qUrdu: "کیا اپنی مادری زبان (اردو/انگریزی) میں دعا مانگی جا سکتی ہے؟",
      aEn: "Outside of the formal obligatory prayer (Salah), you may supplicate to Allah in any language from the depths of your heart, as Allah understands all languages and hears the secret whispers of every soul. While the Arabic wording transmitted in the Sunnah is the most concise and blessed, sincere personal prayers in Urdu or English are fully valid and beloved to Allah.",
      aUrdu: "نماز کے علاوہ عام اوقات میں اپنی مادری زبان (اردو، انگریزی وغیرہ) میں دل کی گہرائیوں سے دعا مانگنا بالکل جائز ہے، کیونکہ اللہ تعالیٰ ہر زبان کا جاننے والا اور دلوں کے بھیدوں سے باخبر ہے۔ البتہ جو دعائیں نبی کریم ﷺ سے عربی میں منقول ہیں ان کا پڑھنا زیادہ باعثِ اجر و برکت ہے۔",
      ref: "Majmu' al-Fatawa by Ibn Taymiyyah"
    }
  ];

  const seoTitle = isUrdu
    ? 'روزانہ کی مسنون دعائیں بمعہ اردو ترجمہ و فضیلت • Daily Dua | IslamIQ'
    : 'Daily Dua with Meaning and Reference – Masnoon Duas | IslamIQ';

  const seoDescription = isUrdu
    ? 'صبح و شام اور روزمرہ کی مسنون دعائیں عربی متن، تلفظ، اردو اور انگلش ترجمے اور صحیح حدیث کے حوالوں کے ساتھ۔'
    : 'Essential daily Islamic supplications (Duas) with Arabic text, transliteration, authentic Urdu & English translations, and references from Hisn al-Muslim and Hadith.';

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/daily-dua"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: 'Daily Dua', url: '/daily-dua' }
        ]}
        faqs={faqs.map(f => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? f.aUrdu : f.aEn
        }))}
        article={{
          headline: `Daily Dua: ${todayDua.titleEn} - ${todayDua.titleUrdu}`,
          description: todayDua.translationUrdu,
        }}
      />

      {/* Featured Today's Dua */}
      <header className="bg-gradient-to-br from-indigo-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'آج کی مسنون دعا' : "Today's Featured Dua"}</span>
          </div>
          <span className="text-xs text-indigo-200/90 font-medium">
            {todayDua.reference}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
          {isUrdu ? 'روزانہ کی مسنون دعا (Daily Masnoon Dua)' : 'Daily Dua with Meaning & Authentic Reference'}
        </h1>

        {/* Featured Dua Card */}
        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-amber-200">
              {isUrdu ? todayDua.titleUrdu : todayDua.titleEn}
            </h2>
            <span className="text-xs text-indigo-100 bg-indigo-900/60 px-2 py-0.5 rounded-md">
              {isUrdu ? todayDua.occasionUrdu : todayDua.occasionEn}
            </span>
          </div>

          <p className="font-arabic text-xl sm:text-2xl leading-loose text-center text-amber-50 font-bold py-2">
            {todayDua.arabic}
          </p>

          <p className="text-xs text-indigo-200 text-center font-mono italic">
            "{todayDua.transliteration}"
          </p>

          <div className="space-y-1.5 border-t border-white/10 pt-4 text-center">
            <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-urdu font-medium">
              {todayDua.translationUrdu}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {todayDua.translationEn}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-emerald-300 font-semibold">
              {todayDua.reference}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSpeak(isUrdu ? todayDua.translationUrdu : todayDua.translationEn)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Audio Voice"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(todayDua.id, `${todayDua.arabic}\n\n${todayDua.translationUrdu}\n[حوالہ: ${todayDua.reference}]\nhttps://learnislamiq.com`)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                title="Copy Dua"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Educational Context & Virtue of Dua Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-2 text-indigo-900 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>{isUrdu ? 'دعا کی فضیلت اور عبادت کی روح' : 'Educational Context: Dua as the Essence of Worship'}</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
          {isUrdu
            ? 'دعا اللہ تعالیٰ کے حضور بندے کی بندگی، عاجزی اور محتاجی کا سب سے عظیم اظہار ہے۔ رسول اللہ ﷺ نے فرمایا: "الدُّعَاءُ هُوَ الْعِبَادَةُ" یعنی دعا ہی اصل عبادت ہے (ترمذی: ۲۹۶۹)۔ اس صفحے کا مقصد صبح و شام اور روزمرہ زندگی کے تمام مراحل کے لیے صحیح اور مسنون دعائیں تلفظ اور ترجمے کے ساتھ فراہم کرنا ہے تاکہ ہر عمل اللہ کے ذکر سے معطر رہے۔'
            : 'Supplication (Dua) is the direct, intimate channel of communication between the servant and the Creator. It embodies complete reliance (Tawakkul), humility, and recognition of divine omnipotence. This Daily Dua hub compiles authentic supplications derived directly from the Prophetic Sunnah and the classical reference Hisn al-Muslim (Fortress of the Muslim), helping believers maintain constant spiritual mindfulness throughout daily routines.'}
        </p>

        {/* Foundational Quran Quote on Dua */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/70 space-y-2">
          <p className="font-arabic text-right text-base sm:text-lg text-indigo-950 font-bold leading-relaxed" dir="rtl">
            «وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ»
          </p>
          <p className="text-xs sm:text-sm text-indigo-900 font-medium">
            {isUrdu
              ? 'اور تمہارے رب نے فرمایا: "تم مجھ سے دعا مانگو، میں تمہاری دعا قبول کروں گا۔"'
              : 'And your Lord says: "Call upon Me; I will respond to you."'}
          </p>
          <span className="text-[11px] text-indigo-700 font-semibold block">
            Surah Ghafir (40:60) • سورۃ غافر: ۶۰
          </span>
        </div>
      </section>

      {/* Crawlable High-Value Internal Links to Related Islamic Learning */}
      <section className="bg-gradient-to-r from-indigo-900 via-teal-900 to-emerald-950 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-3">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-indigo-200 text-xs font-bold w-fit">
          <Compass className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'متعلقہ دعاؤں کی گائیڈز' : 'Deeper Dua Guides'}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-white">
          {isUrdu ? 'عبادات اور روزمرہ زندگی کی خصوصی دعائیں' : 'Explore Thematic Supplication & Worship Guides'}
        </h3>
        <p className="text-xs text-indigo-100 max-w-xl">
          {isUrdu
            ? 'نماز کی رکوع و سجود کی دعائیں، رمضان المبارک کی سحر و افطار کی مسنون دعائیں اور بچوں کے روزمرہ آداب کا مطالعہ کریں۔'
            : 'Access authentic prayer recitations from Takbeer to Salam, Ramadan Suhoor & Iftar Duas, and daily etiquette for young learners.'}
        </p>

        <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
          <a
            href="/ramadan-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('ramadan-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 font-bold transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>{isUrdu ? 'رمضان المبارک اور افطار دعائیں' : 'Ramadan & Iftar Duas'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-700" />
          </a>
          <a
            href="/how-to-perform-salah"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('how-to-perform-salah');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>{isUrdu ? 'نماز اور سجدے کے اذکار' : 'Salah Prayers & Adhkar'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
          </a>
          <a
            href="/islamic-manners-for-kids"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('islamic-manners-for-kids');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>{isUrdu ? 'بچوں کے روزمرہ آداب و دعائیں' : 'Kids Daily Manners'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
          </a>
        </div>
      </section>

      {/* Masnoon Duas Collection */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>
            {isUrdu ? 'روزمرہ مسنون دعاؤں کا مجموعہ (Masnoon Duas Collection)' : 'Essential Daily Duas & Adhkar'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {VERIFIED_DUAS.map((dua) => (
            <div
              key={dua.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {isUrdu ? dua.titleUrdu : dua.titleEn}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isUrdu ? dua.occasionUrdu : dua.occasionEn}
                </span>
              </div>

              <p className="font-arabic text-lg sm:text-xl leading-relaxed text-right text-slate-900 font-semibold py-1">
                {dua.arabic}
              </p>

              <p className="text-xs text-slate-400 italic">
                {dua.transliteration}
              </p>

              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm">
                <p className="font-urdu text-slate-800 leading-relaxed font-semibold">
                  {dua.translationUrdu}
                </p>
                <p className="text-slate-500 font-sans text-xs">
                  {dua.translationEn}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{dua.reference}</span>
                </span>

                <button
                  onClick={() => handleCopy(dua.id, `${dua.arabic}\n\n${dua.translationUrdu}\n[${dua.reference}]\nhttps://learnislamiq.com`)}
                  className="text-slate-500 hover:text-emerald-700 font-medium flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId === dua.id ? (isUrdu ? 'کاپی ہو گئی' : 'Copied!') : (isUrdu ? 'کاپی کریں' : 'Copy')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Useful Educational FAQs Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-indigo-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>{isUrdu ? 'دعا کے آداب اور قبولیت کے متعلق اہم سوالات و جوابات' : 'Frequently Asked Questions on Dua & Supplications'}</span>
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
                    <ChevronUp className="w-4 h-4 text-indigo-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-indigo-700 font-semibold block pt-1 border-t border-slate-100">
                      Evidence / حوالہ: {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="daily-dua" />
    </article>
  );
};

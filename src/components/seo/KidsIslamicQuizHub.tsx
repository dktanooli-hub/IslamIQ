import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VERIFIED_QUESTIONS } from '../../data/verifiedContent';
import { QuizQuestion } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { Sparkles, CheckCircle2, Award, Lightbulb, Star, Heart, ArrowRight, BookOpen, Compass, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const KidsIslamicQuizHub: React.FC = () => {
  const { contentLang, setActiveTab, setUserMode } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const kidsQuestions = VERIFIED_QUESTIONS.filter((q: QuizQuestion) => q.forKids);

  const toggleReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const parentFaqs = [
    {
      qEn: "At what age should children begin learning about Islamic beliefs and prayer?",
      qUrdu: "بچوں کو اسلامی عقائد اور نماز کی تعلیم کس عمر میں شروع کروانی چاہیے؟",
      aEn: "Prophet Muhammad ﷺ instructed parents: 'Command your children to pray when they are seven years old, and discipline them gently concerning it at ten, and separate them in their sleeping arrangements' (Sunan Abi Dawud 495). Basic concepts of Allah's love, kindness, truthfulness, and simple Quranic recitations (such as Surah Al-Fatihah and Surah Al-Ikhlas) can be warmly introduced from the ages of 3 to 5 through daily habits and bedtime stories.",
      aUrdu: "رسول اللہ ﷺ کا مبارک فرمان ہے: 'اپنی اولاد کو سات سال کی عمر میں نماز کا حکم دو، اور دس سال کی عمر میں اس پر نرمی سے سختی کرو اور ان کے بستر الگ کر دو' (سنن ابی داؤد: ۴۹۵)۔ بنیادی عقائد، اللہ تعالیٰ کی رحمت، کلمہ طیبہ اور چھوٹی سورتیں ۳ سے ۵ سال کی عمر سے ہی محبت اور روزمرہ کہانیوں کے ذریعے سکھانا مستحب ہے۔",
      ref: "Sunan Abi Dawud 495 (Graded Hasan Sahih by Al-Albani)"
    },
    {
      qEn: "How do interactive quiz questions benefit young Muslim learners?",
      qUrdu: "انٹرایکٹو اسلامی کوئز بچوں کی تربیت میں کس طرح مددگار ثابت ہوتے ہیں؟",
      aEn: "Gamified and interactive questions engage a child's natural curiosity and cognitive problem-solving abilities. Rather than passive memorization, children actively think through foundational Islamic concepts—such as the names of the Prophets, the pillars of faith, and Sunnah manners—with instant positive reinforcement, building strong confidence and enthusiasm for Islamic education.",
      aUrdu: "انٹرایکٹو سوالات بچوں میں تجسس، فہم اور سیکھنے کا مثبت شوق بیدار کرتے ہیں۔ رٹا لگانے کے بجائے جب بچے خوشگوار انداز میں سوال کا حل تلاش کرتے ہیں اور درست جواب پر حوصلہ افزائی پاتے ہیں، تو ان کے دل میں دینِ اسلام، نبی کریم ﷺ اور اسلامی شعائر کے لیے پائیدار محبت پیدا ہوتی ہے۔",
      ref: "Educational Child Development in Islamic Thought"
    },
    {
      qEn: "What are the most essential topics to teach a Muslim child first?",
      qUrdu: "بچے کو سب سے پہلے کن اسلامی بنیادی باتوں کی تعلیم دینی چاہیے؟",
      aEn: "Classical scholars emphasize prioritizing: 1) Tawheed (Allah is the One loving Creator who sees and protects us), 2) Love for Prophet Muhammad ﷺ and his gentle character, 3) The 5 Pillars of Islam (especially regular daily prayer and good charity), and 4) Daily Adab (saying Bismillah before eating, Alhamdulillah after finishing, and speaking the truth).",
      aUrdu: "علماء و ائمہ نے چار بنیادی امور کو اولین ترجیح قرار دیا ہے: ۱) توحید (اللہ ایک ہے، وہی ہمارا خالق و رازق ہے اور ہر جگہ ہمارے ساتھ ہے)، ۲) رسول اللہ ﷺ کی محبت اور پیاری سنتیں، ۳) اسلام کے پانچ ارکان (خاص طور پر نماز کی عادت)، اور ۴) روزمرہ آداب (کھانے سے پہلے بسم اللہ، بعد میں الحمد للہ، اور سچ بولنے کی اخلاقی عادت)۔",
      ref: "Tuhfat al-Mawdud bi-Ahkam al-Mawlud by Ibn al-Qayyim"
    }
  ];

  const seoTitle = isUrdu
    ? 'بچوں کے اسلامی سوالات و جوابات • Kids Islamic Quiz | IslamIQ'
    : 'Islamic Quiz for Kids – Fun Islamic Questions & Answers | IslamIQ';

  const seoDescription = isUrdu
    ? 'بچوں کے لیے آسان اور دلچسپ اسلامی سوالات اور کہانیاں۔ ارکانِ اسلام، حضرت محمدﷺ اور اخلاقی آداب پر مبنی اسلامی کوئز۔'
    : 'Fun, engaging and educational Islamic quiz for Muslim children. Learn about Allah, Prophet Muhammad (PBUH), 5 Pillars of Islam, and good manners with hints and explanations.';

  const faqsForSchema = [
    ...kidsQuestions.slice(0, 5).map((q) => ({
      question: isUrdu ? q.questionUrdu : q.questionEn,
      answer: isUrdu
        ? `درست جواب: ${q.optionsUrdu[q.correctIndex]}۔ وضاحت: ${q.explanationUrdu}`
        : `Correct answer: ${q.optionsEn[q.correctIndex]}. Explanation: ${q.explanationEn}`,
    })),
    ...parentFaqs.map((f) => ({
      question: isUrdu ? f.qUrdu : f.qEn,
      answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
    }))
  ];

  return (
    <article className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/kids-islamic-quiz"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی کوئز' : 'Islamic Quiz', url: '/islamic-quiz' },
          { name: isUrdu ? 'بچوں کا اسلامی کوئز' : 'Kids Islamic Quiz', url: '/kids-islamic-quiz' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'بچوں کا اسلامی کوئز: آسان سوالات، جوابات اور اخلاقی اسباق' : 'Islamic Quiz for Kids: Engaging Questions, Lessons & Parent Guide',
          description: seoDescription,
          datePublished: '2026-09-15',
          dateModified: '2026-10-02',
        }}
      />

      {/* Playful Hero Banner */}
      <header className="bg-gradient-to-br from-amber-400 via-teal-500 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{isUrdu ? 'ننھے مسلمانوں کے لیے آسان سیکھنا' : 'Little Muslim Learners'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            {isUrdu ? 'بچوں کا اسلامی کوئز (Kids Islamic Quiz)' : 'Islamic Quiz for Kids – Fun & Friendly Questions'}
          </h1>

          <p className="text-teal-50 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            {isUrdu
              ? 'پیارے بچوں کے لیے اللہ تعالیٰ، ہمارے پیارے نبی حضرت محمدﷺ، نماز، روزے اور اچھے اخلاق کے متعلق پیارے پیارے سوالات اور انعامات۔'
              : 'Designed with friendly language, encouraging hints, and verified teachings of Islam to inspire a lifelong love for Deen in young hearts.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setUserMode('kids');
                setActiveTab('quiz');
              }}
              className="px-4 py-2.5 bg-white text-teal-900 hover:bg-amber-100 font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{isUrdu ? 'بچوں کا کوئز گیم کھیلیں' : 'Play Kids Quiz Game'}</span>
            </button>
            <button
              onClick={() => {
                setUserMode('kids');
                setActiveTab('home');
              }}
              className="px-3.5 py-2 bg-teal-900/30 hover:bg-teal-900/50 text-white font-bold text-xs rounded-xl transition-all border border-white/20"
            >
              {isUrdu ? 'کڈز ہوم دیکھیں' : 'Visit Kids Wonderland'}
            </button>
          </div>
        </div>
      </header>

      {/* Educational Context & Prophetic Methodology */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 text-slate-800">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600" />
          <span>{isUrdu ? 'نبوی طریقہ تعلیم: بچوں کی تربیت محبت اور مکالمے سے' : 'Educational Context: The Prophetic Pedagogy with Children'}</span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
          {isUrdu
            ? 'رسول اللہ ﷺ نے ننھے صحابہ کرام (جیسے حضرت عبد اللہ بن عباس اور حضرت انس بن مالک رضی اللہ عنہما) کی تربیت ہمیشہ انتہائی شفقت، محبت اور دوستانہ سوال و جواب کے ذریعے فرمائی۔ اسلام آئی کیو کا کڈز کوئز حب اسی نبوی طرز پر تیار کیا گیا ہے تاکہ بچے بغیر کسی خوف یا دباؤ کے عقیدہ، ارکانِ اسلام اور اچھے اخلاق کو دلچسپ انداز میں سمجھ سکیں۔'
            : 'Prophet Muhammad ﷺ exemplified the highest form of educational pedagogy with young companions like Abdullah ibn Abbas and Anas ibn Malik (may Allah be pleased with them)—speaking at their level of understanding, welcoming questions, and reinforcing moral principles through warm conversation. This Kids Islamic Quiz Hub employs interactive inquiry to instill foundational knowledge of Allah, the Prophets, prayer, and daily manners.'}
        </p>

        {/* Foundational Hadith Quote */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 space-y-2">
          <p className="font-arabic text-right text-base sm:text-lg text-teal-950 font-bold leading-relaxed" dir="rtl">
            «يَا غُلَامُ إِنِّي أُعَلِّمُكَ كَلِمَاتٍ: احْفَظِ اللَّهَ يَحْفَظْكَ، احْفَظِ اللَّهَ تَجِدْهُ تُجَاهَكَ...»
          </p>
          <p className="text-xs sm:text-sm text-teal-900 font-medium">
            {isUrdu
              ? 'رسول اللہ ﷺ نے بچے (عبد اللہ بن عباس) سے فرمایا: "اے لڑکے! میں تمہیں چند اہم باتیں سکھاتا ہوں: اللہ کے احکام کی حفاظت کرو، اللہ تمہاری حفاظت فرمائے گا؛ اللہ کو یاد رکھو، تم اسے اپنے سامنے پاؤ گے..."'
              : 'The Messenger of Allah ﷺ said to the young boy (Ibn Abbas): "O boy, I shall teach you words of wisdom: Be mindful of Allah and He will protect you; be mindful of Allah and you will find Him before you..."'}
          </p>
          <span className="text-[11px] text-teal-700 font-semibold block">
            Jami' at-Tirmidhi 2516 (جامع ترمذی: ۲۵۱۶ - حدیث حسن صحیح)
          </span>
        </div>
      </section>

      {/* Crawlable High-Value Deep Guide Links for Kids & Parents */}
      <section className="bg-gradient-to-r from-teal-800 via-emerald-800 to-amber-700 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-teal-100 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'بچوں کے اہم اسلامی موضوعات' : 'Foundational Topics for Kids'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'بچوں کے اخلاق، ارکانِ اسلام اور ایمان کی مکمل گائیڈز' : 'Explore Complete Manners & Faith Guides for Young Learners'}
          </h2>
          <p className="text-xs text-teal-100 max-w-xl">
            {isUrdu
              ? 'روزمرہ کھانے پینے کے آداب، سلام کرنے کا طریقہ، پانچ ارکانِ اسلام اور چھ ارکانِ ایمان کا بچوں کے لیے آسان مطالعہ کریں۔'
              : 'Complement your quiz practice with detailed articles covering daily Sunnah etiquette, pillars of Islam, and core articles of faith.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="/islamic-manners-for-kids"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('islamic-manners-for-kids');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-200 font-bold mb-1">
                <span>{isUrdu ? 'اخلاق و آداب' : 'Manners & Adab'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? 'بچوں کے اسلامی آداب' : 'Islamic Manners for Kids'}
              </h3>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                {isUrdu ? 'کھانے، سلام، والدین کے احترام اور سچائی کے مسنون آداب۔' : 'Eating etiquette, greetings, honoring parents, and kindness to friends.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-100 underline mt-3">
              {isUrdu ? 'آداب گائیڈ پڑھیں ←' : 'Read Manners Guide →'}
            </span>
          </a>

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
              <div className="flex items-center justify-between text-xs text-teal-200 font-bold mb-1">
                <span>{isUrdu ? 'دین کے ستون' : 'Core Pillars'}</span>
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? '۵ ارکانِ اسلام کی تفصیل' : '5 Pillars of Islam'}
              </h3>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                {isUrdu ? 'شہادت، نماز، زکوٰۃ، روزہ اور حج کا مستند بیان۔' : 'Shahadah, Salah, Zakat, Sawm, and Hajj explained with proofs.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-100 underline mt-3">
              {isUrdu ? 'ارکان گائیڈ پڑھیں ←' : 'Read 5 Pillars Guide →'}
            </span>
          </a>

          <a
            href="/six-articles-of-faith"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('six-articles-of-faith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-200 font-bold mb-1">
                <span>{isUrdu ? 'ایمانیات' : 'Articles of Faith'}</span>
                <Star className="w-3.5 h-3.5 text-amber-300" />
              </div>
              <h3 className="font-bold text-sm text-white">
                {isUrdu ? '۶ ارکانِ ایمان' : '6 Articles of Faith'}
              </h3>
              <p className="text-[11px] text-slate-200 mt-1 leading-relaxed">
                {isUrdu ? 'اللہ، فرشتوں، کتب، انبیاء، آخرت اور تقدیر پر ایمان۔' : 'Belief in Allah, Angels, Divine Books, Prophets, the Day of Judgment, and Qadr.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-100 underline mt-3">
              {isUrdu ? 'ایمان گائیڈ پڑھیں ←' : 'Read Faith Guide →'}
            </span>
          </a>
        </div>
      </section>

      {/* Kids Questions List */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-teal-950 flex items-center gap-2">
          <Heart className="w-5 h-5 text-amber-500 fill-current" />
          <span>
            {isUrdu
              ? `بچوں کے خصوصی سوالات (${kidsQuestions.length})`
              : `Fun Questions for Kids (${kidsQuestions.length})`}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {kidsQuestions.map((q, idx) => {
            const isRevealed = revealedAnswers[q.id];
            const options = isUrdu ? q.optionsUrdu : q.optionsEn;
            const questionText = isUrdu ? q.questionUrdu : q.questionEn;
            const hint = isUrdu ? q.kidsHintUrdu : q.kidsHintEn;
            const explanation = isUrdu ? q.explanationUrdu : q.explanationEn;

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200/70 shadow-xs space-y-4 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-2xl bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {q.category}
                    </span>
                  </div>
                  {q.difficulty && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      {q.difficulty}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {questionText}
                </h3>

                {hint && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>{isUrdu ? 'پیارا اشارہ: ' : 'Friendly Hint: '}</strong>
                      {hint}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-2xl border-2 text-xs font-bold flex items-center justify-between transition-all ${
                          isRevealed
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-[1.01]'
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-80'
                            : 'bg-amber-50/50 border-amber-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-xl bg-white border border-amber-300 text-[11px] font-black flex items-center justify-center text-teal-900">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="text-xs font-extrabold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    {isRevealed ? (isUrdu ? 'جواب چھپائیں' : 'Hide Answer') : (isUrdu ? 'درست جواب دیکھیں' : 'See Correct Answer')}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-950 space-y-1 animate-fadeIn">
                    <p className="font-extrabold text-teal-900">
                      {isUrdu ? 'تفصیل و سبق:' : 'Child Lesson:'}
                    </p>
                    <p className="leading-relaxed">{explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Useful Parent & Teacher FAQ Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-teal-600" />
          <span>{isUrdu ? 'والدین اور اساتذہ کے لیے سوال و جواب (Parent & Teacher Guide)' : 'Parent & Teacher Guide: Nurturing Faith in Kids'}</span>
        </div>

        <div className="space-y-3">
          {parentFaqs.map((faq, idx) => {
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
                      {isUrdu ? 'حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="kids-islamic-quiz" />
    </article>
  );
};

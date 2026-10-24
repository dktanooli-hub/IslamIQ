import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Compass,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Share2,
  Award,
  Scroll,
  Search,
  Flame,
  ExternalLink,
  ListFilter
} from 'lucide-react';
import { PROPHETS_DATA, PROPHET_FAQS, ProphetStory } from '../../data/guide/prophets-data';

export const StoriesOfTheProphetsGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ulul-azm'>('all');

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isUrdu
          ? 'قصص الانبیاء: قرآن مجید کے تمام ۲۵ برگزیدہ انبیاء کرام کے مستند تاریخی واقعات اور اسباق'
          : 'Stories of the 25 Prophets in the Quran: Authentic Accounts & Lessons | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const filteredProphets = useMemo(() => {
    return PROPHETS_DATA.filter((p) => {
      if (filterType === 'ulul-azm' && !p.isUlulAzm) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.nameEn.toLowerCase().includes(q) ||
        p.nameUrdu.includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.titleUrdu.includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [filterType, searchQuery]);

  const scrollToProphet = (id: string) => {
    const el = document.getElementById(`prophet-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      <SeoHead
        title={
          isUrdu
            ? 'قصص الانبیاء: قرآن مجید کے تمام ۲۵ انبیاء کے مستند واقعات اور اسباق | IslamIQ'
            : 'Stories of the 25 Prophets in the Quran: Authentic Accounts & Lessons | IslamIQ'
        }
        description={
          isUrdu
            ? 'قرآن کریم میں مذکور تمام ۲۵ جلیل القدر انبیاء علیہم السلام (حضرت آدم تا حضرت محمد ﷺ) کے مستند تاریخی واقعات، قرآنی نصوص اور بصیرت انگیز اسباق۔'
            : 'Comprehensive educational guide to all 25 Prophets explicitly named in the Quran (from Adam to Muhammad ﷺ). Authentic Quranic verses, life milestones, and moral lessons.'
        }
        canonicalPath="/stories-of-the-prophets"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'صفحہ اول' : 'Home', url: '/' },
          { name: isUrdu ? 'قصص الانبیاء' : 'Stories of the Prophets', url: '/stories-of-the-prophets' }
        ]}
        faqs={PROPHET_FAQS.map((f) => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
        }))}
        article={{
          headline: isUrdu
            ? 'قصص الانبیاء: قرآن مجید کے تمام ۲۵ انبیاء کے مستند واقعات اور اسباق'
            : 'Stories of the 25 Prophets in the Quran: Authentic Accounts & Lessons',
          description: isUrdu
            ? 'قرآن کریم میں مذکور تمام ۲۵ جلیل القدر انبیاء علیہم السلام (حضرت آدم تا حضرت محمد ﷺ) کے مستند تاریخی واقعات، قرآنی نصوص اور بصیرت انگیز اسباق۔'
            : 'Comprehensive educational guide to all 25 Prophets explicitly named in the Quran (from Adam to Muhammad ﷺ). Authentic Quranic verses, life milestones, and moral lessons.'
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
          }}
          className="hover:text-emerald-700 transition-colors"
        >
          {isUrdu ? 'صفحہ اول' : 'Home'}
        </a>
        <span>/</span>
        <a
          href="/islamic-questions-answers"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('islamic-questions-answers');
          }}
          className="hover:text-emerald-700 transition-colors"
        >
          {isUrdu ? 'اسلامی رہنمائی' : 'Islamic Guides'}
        </a>
        <span>/</span>
        <span className="text-emerald-800 font-semibold">
          {isUrdu ? 'قصص الانبیاء (۲۵ انبیاء)' : 'Stories of the Prophets (25 Prophets)'}
        </span>
      </nav>

      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-emerald-950 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
            <Scroll className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'قرآن مجید کے تمام ۲۵ انبیاء کا تذکرہ' : 'Complete Series of All 25 Quranic Prophets'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {isUrdu
              ? 'قصص الانبیاء علیہم السلام: قرآن کریم کے تمام ۲۵ انبیاء کے مستند واقعات اور اسباق'
              : 'Stories of the Prophets: All 25 Quranic Prophets & Timeless Lessons'}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            {isUrdu
              ? 'قرآن مجید میں جن ۲۵ برگزیدہ پیغمبروں کے نام صراحتاً آئے ہیں (حضرت آدم علیہ السلام سے لے کر خاتم النبیین حضرت محمد ﷺ تک)، ان تمام کے مستند قرآنی واقعات، نصوص اور زندگی بدل دینے والے اسباق کا جامع علمی انسائیکلوپیڈیا۔'
              : 'Explore the complete, verified collection of all 25 Prophets and Messengers explicitly named in the Holy Quran—from Adam (AS) to the Seal of the Prophets Muhammad ﷺ. Documented with authentic Surah and Ayah citations.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium backdrop-blur-sm transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{isUrdu ? 'شیئر کریں' : 'Share Guide'}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-amber-200 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isUrdu ? 'خالص قرآنی نصوص اور صحیح احادیث پر مبنی' : '100% Based on Quran & Sahih Hadith'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isUrdu ? '۲۵ / ۲۵ قرآنی انبیاء مکمل' : '25 of 25 Prophets Documented'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Methodology Note */}
      <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed">
          <p className="font-bold text-amber-900">
            {isUrdu ? 'اسلامک ریسرچ اور طریقہ کار (Methodology):' : 'Editorial Standard & Quranic Rigor:'}
          </p>
          <p>
            {isUrdu
              ? 'یہ مقالہ من گھڑت اسرائیلی داستانوں یا غیر مستند روایات سے مکمل طور پر پاک ہے۔ تمام تفصیلات قرآن مجید کی آیاتِ بینات اور معتبر کتبِ تفسیر (تفسیر ابن کثیر، طبری وغیرہ) اور کتبِ حدیث (صحیح بخاری، صحیح مسلم) کی تخریج کے ساتھ پیش کی گئی ہیں۔'
              : 'This educational guide adheres strictly to the text of the Holy Quran and verified Hadith literature. Fabricated folklore, mythic exaggerations, and unverified Isra\'iliyyat are purposefully omitted in compliance with classical scholarly criteria.'}
          </p>
        </div>
      </section>

      {/* Interactive Navigation Index & Search */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ListFilter className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isUrdu ? 'فہرست و تلاش: تمام ۲۵ انبیاء علیہم السلام' : 'Index & Search: All 25 Quranic Prophets'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isUrdu ? 'تمام ۲۵ انبیاء' : 'All 25 Prophets'}
            </button>
            <button
              onClick={() => setFilterType('ulul-azm')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                filterType === 'ulul-azm'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{isUrdu ? '۵ اولوا العزم رسول' : '5 Arch-Prophets (Ulul \'Azm)'}</span>
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'نام سے تلاش کریں (مثلاً: یوسف، ابراہیم، ایوب، موسیٰ)...'
                : 'Search prophet by name (e.g. Adam, Yusuf, Yunus, Musa, Ayyub)...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Quick-Jump Chips Grid */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {isUrdu ? 'فوری رسائی (Quick Jump):' : 'Quick Jump to Prophet Story:'}
          </p>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {PROPHETS_DATA.map((p) => {
              const shortNameEn = p.nameEn.split('—')[0].replace(/^\d+\.\s*/, '').trim();
              const shortNameUrdu = p.nameUrdu.split('—')[0].replace(/^[\d۱-۹]+\.\s*/, '').trim();
              return (
                <button
                  key={p.id}
                  onClick={() => scrollToProphet(p.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all text-left ${
                    p.isUlulAzm
                      ? 'bg-amber-50/80 border-amber-300 text-amber-900 font-semibold hover:bg-amber-100'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="opacity-60 mr-1">{p.number}.</span>
                  {isUrdu ? shortNameUrdu : shortNameEn}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prophet Deep Dives */}
      <div className="space-y-8">
        {filteredProphets.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              {isUrdu ? 'کوئی پیغمبر تلاش کے مطابق نہیں ملا۔' : 'No prophets found matching your search.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
              }}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              {isUrdu ? 'تمام ۲۵ انبیاء دکھائیں' : 'Reset filters and view all 25'}
            </button>
          </div>
        ) : (
          filteredProphets.map((p) => (
            <section
              key={p.id}
              id={`prophet-${p.id}`}
              className={`bg-white rounded-3xl p-5 sm:p-8 border shadow-sm space-y-6 scroll-mt-24 transition-all ${
                p.isUlulAzm
                  ? 'border-amber-300/80 hover:border-amber-400 ring-1 ring-amber-100'
                  : 'border-slate-200/90 hover:border-emerald-300'
              }`}
            >
              {/* Header */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-800 tracking-wide bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/90">
                      {p.arabicHonorific}
                    </span>
                    {p.isUlulAzm && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/70 border border-amber-300 px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>{isUrdu ? 'اولوا العزم رسول' : 'Ulul \'Azm Arch-Prophet'}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {p.quranMentionsCount}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {isUrdu ? p.nameUrdu : p.nameEn}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                  {isUrdu ? p.titleUrdu : p.titleEn}
                </p>

                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">
                    {isUrdu ? 'مستند مصادر و کتب: ' : 'Authentic Sources: '}
                  </span>
                  <span>{p.authenticSources}</span>
                </div>
              </div>

              {/* Dedicated Guide Callout for Prophet Muhammad ﷺ */}
              {p.dedicatedGuideUrl && (
                <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {isUrdu ? 'مکمل تفصیلی سیرت گائیڈ' : 'Dedicated In-Depth Seerah Guide'}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {isUrdu
                        ? 'سیرت النبی ﷺ: ولادت تا رحلت مکمل تاریخی دستاویز'
                        : 'Seerah of Prophet Muhammad ﷺ: Complete Chronological Biography'}
                    </h3>
                    <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl">
                      {isUrdu
                        ? 'مکی دور، مدنی دور، غزوات، میثاقِ مدینہ اور خطبۂ حجۃ الوداع کے مفصل مطالعے کے لیے ہماری خصوصی سیرت گائیڈ ملاحظہ فرمائیں۔'
                        : 'Explore full chronological milestones, Makkah & Madinah eras, pivotal battles, ethics, and the Farewell Pilgrimage in our dedicated Seerah portal.'}
                    </p>
                  </div>
                  <a
                    href={p.dedicatedGuideUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab('seerah-of-prophet-muhammad');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shrink-0 transition-all shadow-sm"
                  >
                    <span>{isUrdu ? 'مکمل سیرت گائیڈ پڑھیں' : 'Read Full Seerah Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Quran Citations */}
              <div className="grid grid-cols-1 gap-3.5">
                {p.keyQuranVerses.map((verse, vIdx) => (
                  <div
                    key={vIdx}
                    className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 space-y-2.5 text-left"
                  >
                    <p className="text-right font-serif text-lg sm:text-xl text-emerald-950 font-bold leading-loose tracking-wide">
                      {verse.arabic}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                      "{isUrdu ? verse.transUrdu : verse.transEn}"
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-emerald-200/40 text-[11px] text-emerald-800 font-bold">
                      <span>{verse.ref}</span>
                      <span className="text-slate-400 font-normal">Quranic Foundation</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Narrative */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/60">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>{isUrdu ? 'مستند قرآنی خلاصۂ واقعہ' : 'Quranic Event Overview'}</span>
                </h3>
                <p className="leading-relaxed">{isUrdu ? p.coreNarrativeUrdu : p.coreNarrativeEn}</p>
              </div>

              {/* Key Lessons */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>
                    {isUrdu
                      ? 'ہماری روزمرہ زندگی کے لیے اہم اسباق (Practical Lessons):'
                      : 'Key Takeaways for Daily Life:'}
                  </span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(isUrdu ? p.keyLessonsUrdu : p.keyLessonsEn).map((lesson, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))
        )}
      </div>

      {/* Authentic FAQ Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isUrdu ? 'عام پوچھے جانے والے علمی سوالات (FAQ)' : 'Frequently Asked Scholarly Questions'}
          </h2>
        </div>

        <div className="space-y-3">
          {PROPHET_FAQS.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 bg-slate-50/60 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors"
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

      {/* Internal Navigation to Related Guides */}
      <section className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-emerald-200">
          <Compass className="w-5 h-5" />
          <span>{isUrdu ? 'مزید متعلقہ اسلامی مطالعہ' : 'Continue Your Islamic Study'}</span>
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          {isUrdu
            ? 'سیرت النبی ﷺ کے مبارک سفر اور اسلامی عقائد کے دیگر بنیادی ستونوں کے مطالعے کے لیے درج ذیل گائیڈز ملاحظہ فرمائیں:'
            : 'Deepen your knowledge of prophetic history and foundational creed with our other comprehensive study guides:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <a
            href="/seerah-of-prophet-muhammad"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('seerah-of-prophet-muhammad');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'سیرت النبی ﷺ گائیڈ' : 'Seerah of Prophet Muhammad ﷺ'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'ولادت تا حجۃ الوداع مکمل تاریخ' : 'Complete life, milestones & lessons'}
            </span>
          </a>
          <a
            href="/six-articles-of-faith"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('six-articles-of-faith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'اسلام کے ۶ ارکانِ ایمان' : '6 Articles of Faith (Iman)'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'انبیاء، کتب، ملائکہ پر ایمان' : 'Belief in Prophets, Books & Qadr'}
            </span>
          </a>
          <a
            href="/5-pillars-of-islam"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('5-pillars-of-islam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'اسلام کے ۵ بنیادی ارکان' : '5 Pillars of Islam Explained'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'توحید، نماز، زکوٰۃ، روزہ، حج' : 'Shahadah, Salah, Zakat, Sawm, Hajj'}
            </span>
          </a>
        </div>
      </section>

      <RelatedIslamicLearning currentTab="stories-of-the-prophets" />
    </article>
  );
};

export default StoriesOfTheProphetsGuide;

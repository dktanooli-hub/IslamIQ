import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import { ISLAMIC_GENERAL_KNOWLEDGE_DATA } from '../../data/guide/general-knowledge-data';
import {
  Compass,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Share2
} from 'lucide-react';

export const IslamicGeneralKnowledgeGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ISLAMIC_GENERAL_KNOWLEDGE_DATA;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isUrdu ? data.seoTitleUrdu : data.seoTitleEn,
        text: isUrdu ? data.seoDescUrdu : data.seoDescEn,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی کر لیا گیا!' : 'Link copied to clipboard!');
    }
  };

  const seoTitle = isUrdu ? data.seoTitleUrdu : data.seoTitleEn;
  const seoDescription = isUrdu ? data.seoDescUrdu : data.seoDescEn;

  const faqsForSchema = data.faqs.map((f) => ({
    question: isUrdu ? f.questionUrdu : f.questionEn,
    answer: isUrdu ? `${f.answerUrdu} (حوالہ: ${f.reference || 'مستند کتب'})` : `${f.answerEn} (Ref: ${f.reference || 'Authentic sources'})`,
  }));

  const breadcrumbs = [
    { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
    { name: isUrdu ? 'اسلامی معلومات' : 'General Knowledge', url: data.canonicalPath }
  ];

  const filteredSections = activeFilter === 'all'
    ? data.sections
    : data.sections.filter((s) => s.id === activeFilter);

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={data.canonicalPath}
        isUrdu={isUrdu}
        breadcrumbs={breadcrumbs}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: seoDescription,
          datePublished: '2026-09-15',
          dateModified: '2026-09-24'
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-emerald-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-400/20">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>{isUrdu ? data.heroBadgeUrdu : data.heroBadgeEn}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>

        <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>

        {/* Foundational Hadith Banner */}
        <div className="bg-emerald-900/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'فضیلتِ علم کی بنیادی حدیث' : 'Prophetic Mandate on Seeking Knowledge'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «{data.coreHadithArabic}»
          </p>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isUrdu ? data.coreHadithUrdu : data.coreHadithEn}
          </p>
          <span className="inline-block text-[11px] text-emerald-300/80 font-mono">
            {data.coreHadithRef}
          </span>
        </div>

        {/* Action CTA */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('islamic-quiz')}
            className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>{isUrdu ? 'کوئز میں معلومات کا امتحان لیں' : 'Test Yourself in Islamic Quiz'}</span>
          </button>
        </div>
      </header>

      {/* Category Navigation Pills */}
      <nav className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-wrap gap-2" aria-label="Sections navigation">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isUrdu ? 'تمام ابواب' : 'All Sections'}
        </button>
        {data.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveFilter(section.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === section.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isUrdu ? section.badgeUrdu : section.badgeEn}
          </button>
        ))}
      </nav>

      {/* Main Educational Sections */}
      <section className="space-y-8">
        {filteredSections.map((section, idx) => (
          <div
            key={section.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-base">
                {idx + 1}
              </span>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  {isUrdu ? section.badgeUrdu : section.badgeEn}
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-slate-900">
                  {isUrdu ? section.titleUrdu : section.titleEn}
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {isUrdu ? section.overviewUrdu : section.overviewEn}
            </p>

            {/* Ayah or Hadith Evidence Box if present */}
            {section.quranAyahArabic && (
              <div className="bg-amber-50/60 border-l-4 border-amber-500 rounded-r-2xl p-4 sm:p-5 space-y-2">
                <p className="text-right text-base sm:text-lg font-arabic text-amber-950 leading-relaxed font-semibold" dir="rtl">
                  {section.quranAyahArabic}
                </p>
                <p className="text-xs sm:text-sm text-amber-900 font-medium">
                  {isUrdu ? section.quranAyahUrdu : section.quranAyahEn}
                </p>
                {section.quranRef && (
                  <span className="text-[11px] text-amber-800/80 font-mono block">
                    {section.quranRef}
                  </span>
                )}
              </div>
            )}

            {section.hadithArabic && (
              <div className="bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-2xl p-4 sm:p-5 space-y-2">
                <p className="text-right text-base sm:text-lg font-arabic text-emerald-950 leading-relaxed font-semibold" dir="rtl">
                  «{section.hadithArabic}»
                </p>
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                  {isUrdu ? section.hadithUrdu : section.hadithEn}
                </p>
                {section.hadithRef && (
                  <span className="text-[11px] text-emerald-800/80 font-mono block">
                    {section.hadithRef}
                  </span>
                )}
              </div>
            )}

            {/* Fact items list */}
            <div className="space-y-3.5 pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isUrdu ? 'تفصیلی حقائق و نکات:' : 'Key Verified Insights:'}
              </h3>
              {section.facts.map((f, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isUrdu ? f.labelUrdu : f.labelEn}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {isUrdu ? f.detailUrdu : f.detailEn}
                  </p>

                  {/* Scholarly difference note */}
                  {(f.scholarlyNoteEn || f.scholarlyNoteUrdu) && (
                    <div className="p-3 bg-blue-50/80 border border-blue-200/70 rounded-xl text-xs text-blue-900 font-medium">
                      <span className="font-bold block mb-1">
                        {isUrdu ? 'فقہی/علمی وضاحت:' : 'Scholarly Context & Consensus:'}
                      </span>
                      {isUrdu ? f.scholarlyNoteUrdu : f.scholarlyNoteEn}
                    </div>
                  )}

                  {f.reference && (
                    <span className="text-[11px] text-slate-500 font-mono block">
                      Ref: {f.reference}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Islamic Historical Milestones Timeline */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <Calendar className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'اسلامی تاریخ کے درخشاں سنگ میل' : 'Chronology of Pivotal Islamic Milestones'}
          </h2>
        </div>

        <div className="relative border-l-2 border-emerald-200 ml-4 sm:ml-6 space-y-6 pl-4 sm:pl-6 py-2">
          {data.timelineMilestones.map((m, mIdx) => (
            <div key={mIdx} className="relative space-y-1">
              <span className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-emerald-200" />
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
                {m.year}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isUrdu ? m.eventUrdu : m.eventEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? m.significanceUrdu : m.significanceEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isUrdu ? 'عام پوچھے جانے والے سوالات (FAQs)' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isUrdu
              ? 'اسلامی معلومات سے متعلق اہم استفسارات کے مستند جوابات'
              : 'Authentic answers to frequent queries on Islamic facts and history'}
          </p>
        </div>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {isUrdu ? faq.questionUrdu : faq.questionEn}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-white space-y-2 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {isUrdu ? faq.answerUrdu : faq.answerEn}
                    </p>
                    {faq.reference && (
                      <span className="text-[11px] text-emerald-700 font-mono block">
                        {isUrdu ? 'حوالہ: ' : 'Reference: '} {faq.reference}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Curated Links */}
      <section className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
          {isUrdu ? 'متعلقہ اسلامی رہنمائی و کوئز' : 'Deepen Your Islamic Learning on IslamIQ'}
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/80">
          {isUrdu
            ? 'اسلام آئی کیو کے دیگر ٹولز اور رہنمائیوں سے فیض یاب ہوں:'
            : 'Continue your learning path with verified interactive guides and tools:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {data.internalLinks.map((link, lIdx) => (
            <button
              key={lIdx}
              onClick={() => setActiveTab(link.tabId as AppTab)}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-emerald-300 group-hover:text-emerald-200">
                  {isUrdu ? link.titleUrdu : link.titleEn}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isUrdu ? link.descUrdu : link.descEn}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <span>{isUrdu ? 'مطالعہ فرمائیں' : 'Explore Guide'}</span>
                {isUrdu ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Cross Links */}
      <RelatedIslamicLearning currentTab="islamic-general-knowledge" />
    </article>
  );
};

export default IslamicGeneralKnowledgeGuide;

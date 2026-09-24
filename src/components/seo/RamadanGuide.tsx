import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RAMADAN_GUIDE_DATA } from '../../data/guide/ramadan-guide-data';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Moon,
  Sun,
  Sparkles,
  Heart,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Bookmark
} from 'lucide-react';
import { AppTab } from '../../types';

export const RamadanGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = RAMADAN_GUIDE_DATA;

  const [filterCategory, setFilterCategory] = useState<'all' | 'essential' | 'nullifier' | 'exemption'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredRules = filterCategory === 'all'
    ? data.practicalRules
    : data.practicalRules.filter((r) => r.category === filterCategory);

  const seoTitle = isUrdu
    ? "رمضان المبارک گائیڈ • روزے کے مسائل، سحر و افطار اور دعائیں | IslamIQ"
    : "Ramadan Guide: Fasting Rules, Suhoor, Iftar & Worship | IslamIQ";

  const seoDescription = isUrdu
    ? "رمضان المبارک کے بنیادی احکام، روزے کی نیت، سحری و افطار کی مسنون دعائیں، روزہ توڑنے اور نہ توڑنے والی چیزیں، شبِ قدر اور صدقۃ الفطر کے مسائل۔"
    : "Complete Ramadan guide covering fasting obligations, Suhoor/Iftar Sunnahs, authentic duas, medical exemptions (drops/inhalers), Laylat al-Qadr, and Zakat al-Fitr.";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/ramadan-guide"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی رہنمائی' : 'Guides', url: '/salah-learning' },
          { name: isUrdu ? 'رمضان گائیڈ' : 'Ramadan Guide', url: '/ramadan-guide' }
        ]}
        faqs={data.faqs.map((f) => ({
          question: isUrdu ? f.questionUrdu : f.questionEn,
          answer: isUrdu ? f.answerUrdu : f.answerEn
        }))}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: seoDescription,
          datePublished: '2026-09-24',
          dateModified: '2026-09-24'
        }}
      />

      {/* Header Banner */}
      <header className="text-center space-y-4 border-b border-emerald-100 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Moon className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'رمضان المبارک اور روزے کی شرعی رہنمائی' : 'Fasting & Ramadan Educational Guide'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>
      </header>

      {/* Section 1: Spiritual Wisdom & Quranic Foundation */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'روزے کا مقصد: تقویٰ اور روحانی پاکیزگی' : 'Purpose of Fasting: Spiritual Attainment of Taqwa'}</span>
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.spiritualWisdomUrdu : data.spiritualWisdomEn}
        </p>

        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-sm leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 mb-1 text-emerald-900">
            <Bookmark className="w-4 h-4 text-emerald-700" />
            <span>{isUrdu ? 'فرمانِ الٰہی (سورۃ البقرہ: ۱۸۳)' : 'Quranic Proof (Surah Al-Baqarah 2:183)'}</span>
          </p>
          <p className="font-arabic text-base text-right mb-1">
            يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ
          </p>
          <p className="italic text-xs sm:text-sm text-emerald-800">
            {isUrdu
              ? 'اے ایمان والو! تم پر روزے فرض کیے گئے ہیں جیسا کہ تم سے پہلے لوگوں پر فرض کیے گئے تھے تاکہ تم پرہیزگار بن جاؤ۔'
              : "'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.'"}
          </p>
        </div>
      </section>

      {/* Section 2: Two Pillars of Fasting & Suhoor/Iftar */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500" />
            <span>{isUrdu ? 'روزے کے دو بنیادی ارکان' : 'The Two Pillars (Arkan) of Sawm'}</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-2">
            {isUrdu ? data.fastingPillarsUrdu : data.fastingPillarsEn}
          </p>
        </div>

        <div className="border-t border-slate-200 pt-5 space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Moon className="w-5 h-5 text-emerald-600" />
            <span>{isUrdu ? 'سحری اور افطار کے مسنون آداب' : 'Sunnah Etiquette of Suhoor and Iftar'}</span>
          </h3>
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
            {isUrdu ? data.suhoorIftarGuideUrdu : data.suhoorIftarGuideEn}
          </p>
        </div>
      </section>

      {/* Section 3: Authentic Ramadan Duas */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-emerald-600" />
            <span>{isUrdu ? 'افطار اور رمضان کی مستند مسنون دعائیں' : 'Authentic Supplications for Ramadan & Iftar'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'نبی کریم ﷺ سے افطار اور شبِ قدر کے لیے ثابت شدہ دعائیں ترجمہ اور اسناد کے ساتھ:'
              : 'Prophetic invocations documented in classical Hadith collections with verifiable grading:'}
          </p>
        </div>

        <div className="grid gap-4">
          {data.duas.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-emerald-200/80 p-5 sm:p-6 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {isUrdu ? item.occasionUrdu : item.occasionEn}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {item.reference}
                </span>
              </div>

              <p className="font-arabic text-xl sm:text-2xl text-right text-slate-900 leading-loose py-1">
                {item.arabic}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 space-y-1.5 text-xs sm:text-sm">
                <p className="font-mono text-emerald-800 text-xs">
                  {item.transliteration}
                </p>
                <p className="text-slate-700 font-medium">
                  {isUrdu ? item.translationUrdu : item.translationEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Practical Rules Filterable */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {isUrdu ? 'روزمرہ مسائل: کیا روزہ ٹوٹتا ہے؟' : 'Fasting Rules: Nullifiers & Modern Inquiries'}
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { key: 'all', labelEn: 'All Rules', labelUrdu: 'تمام مسائل' },
              { key: 'nullifier', labelEn: 'Nullifiers', labelUrdu: 'توڑنے والی چیزیں' },
              { key: 'essential', labelEn: 'Forgetfulness', labelUrdu: 'بھول چوک' },
              { key: 'exemption', labelEn: 'Medical & Exemptions', labelUrdu: 'علاج و رخصت' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterCategory(tab.key as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterCategory === tab.key
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isUrdu ? tab.labelUrdu : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filteredRules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-2 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  {isUrdu ? rule.titleUrdu : rule.titleEn}
                </h3>
                {rule.category === 'nullifier' ? (
                  <span className="p-1 rounded bg-rose-50 text-rose-600">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1 rounded bg-emerald-50 text-emerald-600">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isUrdu ? rule.descriptionUrdu : rule.descriptionEn}
              </p>
              <p className="text-[11px] text-emerald-700 font-mono pt-1">
                {rule.evidence}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Last 10 Nights & Zakat al-Fitr */}
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="bg-indigo-950 text-white rounded-2xl p-6 space-y-3 shadow-md">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            {isUrdu ? 'آخری عشرہ اور شبِ قدر' : 'Laylat al-Qadr (Night of Decree)'}
          </span>
          <h3 className="text-lg font-bold">
            {isUrdu ? 'ہزار مہینوں سے افضل مبارک رات' : 'Better than 1,000 Months'}
          </h3>
          <p className="text-xs text-indigo-100 leading-relaxed">
            {isUrdu ? data.lastTenNightsUrdu : data.lastTenNightsEn}
          </p>
        </div>

        <div className="bg-emerald-900 text-white rounded-2xl p-6 space-y-3 shadow-md">
          <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
            {isUrdu ? 'صدقۃ الفطر کا حکم' : 'Zakat al-Fitr (Purifying Charity)'}
          </span>
          <h3 className="text-lg font-bold">
            {isUrdu ? 'عید کی خوشیوں میں غریبوں کی شرکت' : 'Obligatory Eid Almsgiving'}
          </h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            {isUrdu ? data.zakatAlFitrUrdu : data.zakatAlFitrEn}
          </p>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'رمضان کے عام فقہی سوالات (FAQs)' : 'Frequently Asked Questions about Fasting'}</span>
        </h2>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base">
                    {isUrdu ? faq.questionUrdu : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>{isUrdu ? faq.answerUrdu : faq.answerEn}</p>
                    <p className="text-[11px] text-emerald-700 font-mono font-medium pt-1">
                      {isUrdu ? 'حوالہ: ' : 'Reference: '}
                      {faq.reference}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Navigation CTA */}
      <section className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">
              {isUrdu ? 'روزانہ کی مسنون دعائیں اور اذکار دیکھیں' : 'Explore Daily Masnoon Duas & Adhkar'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isUrdu
                ? 'صبح و شام اور روزمرہ کی دعائیں مستند عربی متن اور اردو ترجمے کے ساتھ پڑھیں۔'
                : 'Access verified daily prayers, fasting duas, and morning/evening remembrances.'}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('daily-dua');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <span>{isUrdu ? 'دعائیں کھولیں' : 'Open Daily Duas'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          {data.relatedLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(link.tab as AppTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
            >
              {isUrdu ? link.titleUrdu : link.titleEn}
            </button>
          ))}
        </div>
      </section>

      {/* Cross-linking to related guides */}
      <RelatedIslamicLearning currentTab="salah-learning" />
    </article>
  );
};

export default RamadanGuide;

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { ZAKAT_BASICS_DATA } from '../../data/guide/zakat-basics-data';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Coins,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  Users,
  ChevronDown,
  ArrowRight,
  Calculator,
  Bookmark
} from 'lucide-react';
import { AppTab } from '../../types';

export const ZakatBasicsGuide: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ZAKAT_BASICS_DATA;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const seoTitle = isUrdu
    ? "زکوٰۃ کے بنیادی احکام • نصاب، حساب اور مستحقین | IslamIQ"
    : "Zakat Basics: Nisab, Calculation & Eligible Recipients | IslamIQ";

  const seoDescription = isUrdu
    ? "اسلام کا تیسرا رکن زکوٰۃ: سونے چاندی کا نصاب، حولانِ حول (ایک سال کی شرط)، قابلِ زکوٰۃ اثاثے، حساب کا ۴ مرحلہ وار طریقہ اور قرآن کے ۸ مصارف۔"
    : "Comprehensive guide to Zakat in Islam. Learn gold and silver Nisab thresholds, 2.5% calculation rules on cash/investments, Hawl, and 8 Quranic recipient categories (Surah Tawbah 9:60).";

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/zakat-basics"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی رہنمائی' : 'Guides', url: '/5-pillars-of-islam' },
          { name: isUrdu ? 'زکوٰۃ گائیڈ' : 'Zakat Basics', url: '/zakat-basics' }
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
          <Coins className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'اسلام کا تیسرا بنیادی رکن' : 'Third Pillar of Islam (Al-Zakah)'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.introUrdu : data.introEn}
        </p>
      </header>

      {/* Section 1: Definition & Wisdom */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'زکوٰۃ کا مفہوم اور معاشی برکت' : 'What is Zakat? Purification & Growth'}</span>
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {isUrdu ? data.definitionUrdu : data.definitionEn}
        </p>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-sm leading-relaxed">
          <p className="font-semibold flex items-center gap-1.5 mb-1 text-amber-900">
            <Bookmark className="w-4 h-4 text-amber-700" />
            <span>{isUrdu ? 'فرمانِ باری تعالیٰ (سورۃ التوبہ: ۱۰۳)' : 'Quranic Command (Surah At-Tawbah 9:103)'}</span>
          </p>
          <p className="font-arabic text-base text-right mb-1">
            خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا
          </p>
          <p className="italic text-xs sm:text-sm text-amber-800">
            {isUrdu
              ? 'ان کے اموال میں سے صدقہ لیجیے جس کے ذریعے آپ انہیں پاک اور بابرکت بنائیں گے۔'
              : "'Take from their wealth a charity by which you purify them and cause them to increase.'"}
          </p>
        </div>
      </section>

      {/* Section 2: Nisab & Hawl Explained */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {isUrdu ? 'نصابِ زکوٰۃ اور حولانِ حول (ایک سال کی شرط)' : 'Nisab Threshold & The One Lunar Year Rule (Hawl)'}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-2">
            {isUrdu ? data.nisabExplainedUrdu : data.nisabExplainedEn}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
              {isUrdu ? 'سونے کا نصاب' : 'Gold Nisab Standard'}
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              {isUrdu ? '۸۵ گرام / ساڑھے ۷ تولے سونا' : '85 Grams (approx 7.5 Tolas)'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'اگر کسی کے پاس صرف سونا ہو تو ۸۵ گرام یا اس سے زائد پر سال مکمل ہونے پر ڈھائی فیصد زکوٰۃ ہے۔'
                : 'Applicable when one holds only gold and no other trade commodities or mixed cash.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              {isUrdu ? 'چاندی کا نصاب' : 'Silver Nisab Standard'}
            </span>
            <h3 className="font-bold text-slate-900 text-base">
              {isUrdu ? '۵۹۵ گرام / ساڑھے ۵۲ تولے چاندی' : '595 Grams (approx 52.5 Tolas)'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'نقد رقم، بینک بچت اور مالِ تجارت کے لیے اکثر فقہاء چاندی کے نصاب کو بنیاد بناتے ہیں۔'
                : 'Widely used for liquid cash, savings, and trade inventory to maximize welfare for the poor.'}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">{isUrdu ? 'سال مکمل ہونے کا قاعدہ: ' : 'Hawl Condition: '}</span>
          {isUrdu ? data.hawlRuleUrdu : data.hawlRuleEn}
        </div>
      </section>

      {/* Section 3: Zakatable Assets Table */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          {isUrdu ? 'قابلِ زکوٰۃ اثاثے اور ان کی شرح' : 'Zakatable Assets & Calculation Ratios'}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {data.assets.map((asset, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-2.5 shadow-xs"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-base text-slate-900">
                  {isUrdu ? asset.assetUrdu : asset.assetEn}
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {isUrdu ? asset.rateUrdu : asset.rateEn}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu ? asset.detailsUrdu : asset.detailsEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: 4-Step Practical Calculation */}
      <section className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-emerald-700" />
          <span>{isUrdu ? 'زکوٰۃ معلوم کرنے کا آسان ۴ مرحلہ وار طریقہ' : '4-Step Practical Calculation Method'}</span>
        </h2>

        <div className="space-y-3">
          {(isUrdu ? data.calculationStepsUrdu : data.calculationStepsEn).map((step, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: The 8 Eligible Quranic Recipients */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <span>{isUrdu ? 'زکوٰۃ کے ۸ مستحقین (مصارفِ زکوٰۃ)' : 'The 8 Quranic Categories of Zakat Recipients'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isUrdu
              ? 'اللہ تعالیٰ نے قرآن مجید میں خود زکوٰۃ کے مصارف متعین فرمائے ہیں:'
              : 'Stipulated directly by Allah Almighty in Surah At-Tawbah (9:60):'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center space-y-2">
          <p className="font-arabic text-base sm:text-lg text-slate-800 leading-loose">
            {data.recipientsVerse.arabic}
          </p>
          <span className="text-xs text-emerald-700 font-mono font-medium">
            {data.recipientsVerse.reference}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
          {data.eightRecipients.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">
                  {isUrdu ? rec.titleUrdu : rec.titleEn}
                </h3>
                <span className="font-arabic text-xs text-emerald-700 font-medium">
                  {rec.arabicTerm}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu ? rec.descriptionUrdu : rec.descriptionEn}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs sm:text-sm space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{isUrdu ? 'وہ افراد جنہیں زکوٰۃ نہیں دی جا سکتی' : 'Who Cannot Receive Zakat'}</span>
          </p>
          <p className="leading-relaxed text-rose-800">
            {isUrdu ? data.ineligibleRecipientsUrdu : data.ineligibleRecipientsEn}
          </p>
        </div>
      </section>

      {/* Section 6: FAQs */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <span>{isUrdu ? 'زکوٰۃ کے اہم فقہی سوال و جواب (FAQs)' : 'Frequently Asked Questions about Zakat'}</span>
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
              {isUrdu ? 'اسلام کے ۵ بنیادی ارکان کا تفصیلی جائزہ لیں' : 'Explore the 5 Pillars of Islam'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isUrdu
                ? 'شہادتین، نماز، زکوٰۃ، روزہ اور حج کے احکام و فضائل پڑھیں۔'
                : 'Discover detailed guides on the foundation of Islamic worship and practice.'}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('5-pillars-of-islam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0"
          >
            <span>{isUrdu ? '۵ ارکانِ اسلام کھولیں' : 'Open 5 Pillars Guide'}</span>
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
      <RelatedIslamicLearning currentTab="5-pillars-of-islam" />
    </article>
  );
};

export default ZakatBasicsGuide;

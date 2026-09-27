import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from '../seo/SeoHead';
import { RelatedIslamicLearning } from '../seo/RelatedIslamicLearning';
import { ZAKAT_CALCULATOR_DATA } from '../../data/tools/zakat-calculator-data';
import {
  Coins,
  Calculator,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  CreditCard,
  Building,
  DollarSign,
  ShieldCheck,
  Scale,
  Sparkles,
  BookOpen,
  ArrowRight,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { AppTab } from '../../types';

interface ZakatFormState {
  currency: string;
  weightUnit: 'grams' | 'tolas';
  nisabStandard: 'silver' | 'gold';
  // User-entered market prices
  goldPricePerUnit: string;
  silverPricePerUnit: string;
  // Assets
  cashInHand: string;
  bankBalance: string;
  goldWeight: string;
  silverWeight: string;
  businessGoods: string;
  moneyOwedToYou: string;
  otherZakatableAssets: string;
  // Liabilities
  immediateDebts: string;
  unpaidBills: string;
}

const DEFAULT_STATE: ZakatFormState = {
  currency: 'PKR',
  weightUnit: 'grams',
  nisabStandard: 'silver',
  goldPricePerUnit: '',
  silverPricePerUnit: '',
  cashInHand: '',
  bankBalance: '',
  goldWeight: '',
  silverWeight: '',
  businessGoods: '',
  moneyOwedToYou: '',
  otherZakatableAssets: '',
  immediateDebts: '',
  unpaidBills: ''
};

const CURRENCIES = [
  { code: 'PKR', symbol: 'Rs', nameEn: 'Pakistani Rupee (PKR)', nameUrdu: 'پاکستانی روپیہ' },
  { code: 'USD', symbol: '$', nameEn: 'US Dollar (USD)', nameUrdu: 'امریکی ڈالر' },
  { code: 'GBP', symbol: '£', nameEn: 'British Pound (GBP)', nameUrdu: 'برطانوی پاؤنڈ' },
  { code: 'EUR', symbol: '€', nameEn: 'Euro (EUR)', nameUrdu: 'یورو' },
  { code: 'SAR', symbol: 'SR', nameEn: 'Saudi Riyal (SAR)', nameUrdu: 'سعودی ریال' },
  { code: 'AED', symbol: 'AED', nameEn: 'UAE Dirham (AED)', nameUrdu: 'اماراتی درہم' },
  { code: 'INR', symbol: '₹', nameEn: 'Indian Rupee (INR)', nameUrdu: 'بھارتی روپیہ' },
  { code: 'CAD', symbol: 'CA$', nameEn: 'Canadian Dollar (CAD)', nameUrdu: 'کینیڈین ڈالر' },
  { code: 'AUD', symbol: 'AU$', nameEn: 'Australian Dollar (AUD)', nameUrdu: 'آسٹریلین ڈالر' }
];

export const ZakatCalculator: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ZAKAT_CALCULATOR_DATA;

  const [form, setForm] = useState<ZakatFormState>(() => {
    try {
      const saved = localStorage.getItem('islamiq_zakat_calc_state');
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_STATE;
  });

  const [copiedBreakdown, setCopiedBreakdown] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('islamiq_zakat_calc_state', JSON.stringify(form));
    } catch {
      // Ignore
    }
  }, [form]);

  const updateField = (field: keyof ZakatFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setForm(DEFAULT_STATE);
    try {
      localStorage.removeItem('islamiq_zakat_calc_state');
    } catch {
      // Ignore
    }
    if (showToast) {
      showToast(isUrdu ? 'کیلکولیٹر کو دوبارہ ترتیب دیا گیا' : 'Calculator inputs reset successfully');
    }
  };

  // Safe float parsing helper
  const num = (val: string) => {
    const parsed = parseFloat(val.replace(/,/g, ''));
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  };

  // Standard Nisab thresholds:
  // Gold: 85 grams or 7.5 tolas
  // Silver: 595 grams or 52.5 tolas
  const isGrams = form.weightUnit === 'grams';
  const goldNisabWeight = isGrams ? 85 : 7.5;
  const silverNisabWeight = isGrams ? 595 : 52.5;

  const goldPrice = num(form.goldPricePerUnit);
  const silverPrice = num(form.silverPricePerUnit);

  // Nisab monetary values
  const goldNisabValue = goldPrice > 0 ? goldNisabWeight * goldPrice : 0;
  const silverNisabValue = silverPrice > 0 ? silverNisabWeight * silverPrice : 0;
  const activeNisabThreshold = form.nisabStandard === 'gold' ? goldNisabValue : silverNisabValue;

  // Asset values
  const cashTotal = num(form.cashInHand) + num(form.bankBalance);
  const goldValue = num(form.goldWeight) * goldPrice;
  const silverValue = num(form.silverWeight) * silverPrice;
  const businessTotal = num(form.businessGoods);
  const receivablesTotal = num(form.moneyOwedToYou);
  const otherTotal = num(form.otherZakatableAssets);

  // Gross Zakatable Assets
  const totalGrossAssets =
    cashTotal + goldValue + silverValue + businessTotal + receivablesTotal + otherTotal;

  // Liabilities
  const totalLiabilities = num(form.immediateDebts) + num(form.unpaidBills);

  // Net Zakatable Wealth
  const netZakatableWealth = Math.max(0, totalGrossAssets - totalLiabilities);

  // Is Zakat due?
  const isNisabProvided = activeNisabThreshold > 0;
  const isZakatDue = isNisabProvided && netZakatableWealth >= activeNisabThreshold;

  // Zakat Amount (2.5%)
  const zakatRate = 0.025; // 2.5%
  const payableZakat = isZakatDue ? netZakatableWealth * zakatRate : 0;

  const currencyObj = CURRENCIES.find((c) => c.code === form.currency) || CURRENCIES[0];

  const formatMoney = (amount: number) => {
    return `${currencyObj.symbol} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const copyBreakdownText = () => {
    const text = isUrdu
      ? `اسلام آئی کیو زکوٰۃ کیلکولیشن خلاصہ:\nکل قابلِ زکوٰۃ اثاثے: ${formatMoney(totalGrossAssets)}\nمنہا واجبات/قرضے: ${formatMoney(totalLiabilities)}\nخالص قابلِ زکوٰۃ مالیت: ${formatMoney(netZakatableWealth)}\nنصاب کی حد (${form.nisabStandard === 'gold' ? 'سونا' : 'چاندی'}): ${formatMoney(activeNisabThreshold)}\nزکوٰۃ کی شرح: 2.5%\nواجب الادا زکوٰۃ: ${formatMoney(payableZakat)}\nhttps://learnislamiq.com/zakat-calculator`
      : `IslamIQ Zakat Calculation Breakdown:\nTotal Zakatable Assets: ${formatMoney(totalGrossAssets)}\nImmediate Deductible Liabilities: ${formatMoney(totalLiabilities)}\nNet Zakatable Wealth: ${formatMoney(netZakatableWealth)}\nNisab Threshold (${form.nisabStandard.toUpperCase()} standard): ${formatMoney(activeNisabThreshold)}\nZakat Rate: 2.5% (1/40th)\nTotal Zakat Payable: ${formatMoney(payableZakat)}\nhttps://learnislamiq.com/zakat-calculator`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedBreakdown(true);
      setTimeout(() => setCopiedBreakdown(false), 2500);
      if (showToast) {
        showToast(isUrdu ? 'خلاصہ کاپی کر لیا گیا' : 'Breakdown copied to clipboard');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <SeoHead
        title={isUrdu ? "زکوٰۃ کیلکولیٹر • نصاب، سونا، چاندی اور نقد مال کا حساب | IslamIQ" : "Zakat Calculator (Nisab, Cash, Gold, Silver & Trade Assets) | IslamIQ"}
        description={isUrdu ? data.subtitleUrdu : data.subtitleEn}
        canonicalPath="/zakat-calculator"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی ٹولز' : 'Tools', url: '/zakat-calculator' },
          { name: isUrdu ? 'زکوٰۃ کیلکولیٹر' : 'Zakat Calculator', url: '/zakat-calculator' }
        ]}
        faqs={data.faqs.map((f) => ({
          question: isUrdu ? f.questionUrdu : f.questionEn,
          answer: isUrdu ? f.answerUrdu : f.answerEn
        }))}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: isUrdu ? data.subtitleUrdu : data.subtitleEn,
          datePublished: '2026-09-27',
          dateModified: '2026-09-27'
        }}
      />

      {/* Header Banner */}
      <header className="text-center space-y-3 sm:space-y-4 border-b border-slate-200 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Coins className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'اسلام کا تیسرا رکن • فرض زکوٰۃ' : 'Third Pillar of Islam • Zakat Calculation'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          {isUrdu ? data.subtitleUrdu : data.subtitleEn}
        </p>
      </header>

      {/* Quick Settings Bar (Currency, Unit, Nisab Standard) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>{isUrdu ? 'بنیادی ترتیبات (کرنسی و نصاب کا معیار)' : 'Calculator Settings (Currency & Nisab)'}</span>
          </h2>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>{isUrdu ? 'ری سیٹ' : 'Reset'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Currency */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isUrdu ? 'کرنسی منتخب کریں:' : 'Select Currency:'}
            </label>
            <select
              value={form.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} — {isUrdu ? c.nameUrdu : c.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Weight Unit */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isUrdu ? 'وزن کی اکائی:' : 'Weight Unit:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => updateField('weightUnit', 'grams')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  form.weightUnit === 'grams'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUrdu ? 'گرام (Grams)' : 'Grams (g)'}
              </button>
              <button
                type="button"
                onClick={() => updateField('weightUnit', 'tolas')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  form.weightUnit === 'tolas'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUrdu ? 'تولہ (Tolas)' : 'Tolas'}
              </button>
            </div>
          </div>

          {/* Nisab Standard */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {isUrdu ? 'نصاب کا پیمانہ:' : 'Nisab Standard:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => updateField('nisabStandard', 'silver')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  form.nisabStandard === 'silver'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUrdu ? 'چاندی (مستحب)' : 'Silver (Recommended)'}
              </button>
              <button
                type="button"
                onClick={() => updateField('nisabStandard', 'gold')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  form.nisabStandard === 'gold'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isUrdu ? 'سونا (Gold)' : 'Gold'}
              </button>
            </div>
          </div>
        </div>

        {/* Informational tip on Nisab Standard */}
        <p className="text-[11px] sm:text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed">
          <span className="font-semibold text-emerald-800">
            {isUrdu ? 'شرعی رہنمائی: ' : 'Scholarly Advice: '}
          </span>
          {isUrdu
            ? 'نقد رقم اور بچت کے لیے اکثر معاصر فقہاء چاندی کا نصاب (۵۹۵ گرام / ۵۲.۵ تولے) لاگو کرنے کو ترجیح دیتے ہیں کیونکہ اس سے غریبوں کو زیادہ فائدہ پہنچتا ہے۔ اگر صرف سونا موجود ہو تو سونے کا نصاب (۸۵ گرام / ۷.۵ تولے) اختیار کیا جاتا ہے۔'
            : 'For liquid savings and cash, modern scholars widely recommend the Silver standard (595g / 52.5 tolas) as it maximally benefits the poor. The Gold standard (85g / 7.5 tolas) is standard when possessing exclusively gold.'}
        </p>
      </section>

      {/* Gold & Silver Market Prices (User-Entered) */}
      <section className="bg-white rounded-3xl border border-amber-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>{isUrdu ? 'موجودہ مارکیٹ ریٹ (صارف کے درج کردہ ریٹ)' : 'Current Market Prices (User-Entered)'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isUrdu
                ? 'اپنے شہر یا ملک کے آج کے سونے اور چاندی کے فی گرام/تولہ ریٹ درج فرمائیں۔'
                : 'Enter today\'s local spot bullion price per gram or tola in your currency.'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-bold uppercase">
            {isUrdu ? 'مارکیٹ ریٹ' : 'Market Price'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Gold Price Input */}
          <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span>{isUrdu ? `سونے کی قیمت (فی ${isGrams ? 'گرام' : 'تولہ'})` : `Gold Price (per ${isGrams ? 'gram' : 'tola'})`}</span>
              <span className="text-[11px] text-amber-800">
                {isUrdu ? `نصاب: ${goldNisabWeight} ${isGrams ? 'گرام' : 'تولہ'}` : `Nisab: ${goldNisabWeight} ${form.weightUnit}`}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder={isUrdu ? 'مثلاً: 25000' : 'e.g. 80'}
                value={form.goldPricePerUnit}
                onChange={(e) => updateField('goldPricePerUnit', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-amber-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <p className="text-[11px] text-amber-900">
              {isUrdu ? 'سونے کا نصاب:' : 'Gold Nisab Value:'}{' '}
              <span className="font-bold">{formatMoney(goldNisabValue)}</span>
            </p>
          </div>

          {/* Silver Price Input */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>{isUrdu ? `چاندی کی قیمت (فی ${isGrams ? 'گرام' : 'تولہ'})` : `Silver Price (per ${isGrams ? 'gram' : 'tola'})`}</span>
              <span className="text-[11px] text-slate-600">
                {isUrdu ? `نصاب: ${silverNisabWeight} ${isGrams ? 'گرام' : 'تولہ'}` : `Nisab: ${silverNisabWeight} ${form.weightUnit}`}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder={isUrdu ? 'مثلاً: 350' : 'e.g. 1.05'}
                value={form.silverPricePerUnit}
                onChange={(e) => updateField('silverPricePerUnit', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <p className="text-[11px] text-slate-700">
              {isUrdu ? 'چاندی کا نصاب:' : 'Silver Nisab Value:'}{' '}
              <span className="font-bold">{formatMoney(silverNisabValue)}</span>
            </p>
          </div>
        </div>

        {/* Selected Nisab Threshold Alert */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isUrdu
                ? `فعال نصاب کا معیار: ${form.nisabStandard === 'gold' ? 'سونا' : 'چاندی'} (${activeNisabThreshold > 0 ? formatMoney(activeNisabThreshold) : 'ریٹ درج کریں'})`
                : `Active Nisab Threshold: ${form.nisabStandard.toUpperCase()} Standard (${activeNisabThreshold > 0 ? formatMoney(activeNisabThreshold) : 'Enter price above'})`}
            </span>
          </div>
        </div>
      </section>

      {/* Assets Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-600" />
            <span>{isUrdu ? '۱. قابلِ زکوٰۃ اثاثے (Zakatable Assets)' : '1. Zakatable Assets'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isUrdu
              ? 'اپنے تمام نقد، بینک ڈپازٹ، سونا چاندی اور تجارتی اموال درج فرمائیں۔'
              : 'Enter current value of all cash, precious metals, trade inventory, and receivables.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Cash in Hand */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'نقد رقم (گھر یا جیب میں)' : 'Cash in Hand & at Home'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Cash</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.cashInHand}
                onChange={(e) => updateField('cashInHand', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Bank Balances */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'بینک بیلنس (کرنٹ، سیونگز، ڈپازٹ)' : 'Bank Balances (Checking / Savings)'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Bank</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.bankBalance}
                onChange={(e) => updateField('bankBalance', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Gold Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? `سونے کا وزن (${isGrams ? 'گرام' : 'تولے'})` : `Gold Weight (${form.weightUnit})`}</span>
              <span className="text-[11px] text-amber-700 font-semibold">
                {goldValue > 0 ? formatMoney(goldValue) : '0.00'}
              </span>
            </label>
            <input
              type="number"
              placeholder={`0.00 ${form.weightUnit}`}
              value={form.goldWeight}
              onChange={(e) => updateField('goldWeight', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Silver Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? `چاندی کا وزن (${isGrams ? 'گرام' : 'تولے'})` : `Silver Weight (${form.weightUnit})`}</span>
              <span className="text-[11px] text-slate-700 font-semibold">
                {silverValue > 0 ? formatMoney(silverValue) : '0.00'}
              </span>
            </label>
            <input
              type="number"
              placeholder={`0.00 ${form.weightUnit}`}
              value={form.silverWeight}
              onChange={(e) => updateField('silverWeight', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Business Inventory / Trade Assets */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'کاروباری مالِ تجارت / اسٹاک' : 'Business Stock & Merchandise for Sale'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Trade Goods</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.businessGoods}
                onChange={(e) => updateField('businessGoods', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Money Owed to You (Receivables) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'وصول طلب رقوم (قرضہ جس کی واپسی کی امید ہو)' : 'Money Owed to You (Strong Receivables)'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Receivables</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.moneyOwedToYou}
                onChange={(e) => updateField('moneyOwedToYou', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Total Assets Summary Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-900">
            {isUrdu ? 'کل قابلِ زکوٰۃ اثاثے (Gross Assets):' : 'Total Zakatable Assets:'}
          </span>
          <span className="text-sm sm:text-base font-black text-emerald-900">
            {formatMoney(totalGrossAssets)}
          </span>
        </div>
      </section>

      {/* Deductible Liabilities Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-rose-600" />
            <span>{isUrdu ? '۲. منہا کرنے کے قابل فوری واجبات (Deductible Liabilities)' : '2. Deductible Immediate Liabilities'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isUrdu
              ? 'صرف فوری واجب الادا قرضے، بل اور ضروری اخراجات درج کریں۔ طویل مدتی قرضوں کی صرف موجودہ قسط منہا ہوتی ہے۔'
              : 'Deduct short-term debts and due bills. Long-term loans (e.g. mortgages) are not fully deductible.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Immediate Debts */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'فوری واجب الادا قرضے' : 'Immediate Debts Due Now'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Debts</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.immediateDebts}
                onChange={(e) => updateField('immediateDebts', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Unpaid Pending Bills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>{isUrdu ? 'واجب الادا بل، کرایہ اور ملازمین کی تنخواہیں' : 'Due Rent, Utilities & Salaries'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Pending Bills</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                {currencyObj.symbol}
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={form.unpaidBills}
                onChange={(e) => updateField('unpaidBills', e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Total Liabilities Banner */}
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
          <span className="text-xs font-bold text-rose-900">
            {isUrdu ? 'کل منہا واجبات (Total Liabilities):' : 'Total Deductible Liabilities:'}
          </span>
          <span className="text-sm sm:text-base font-black text-rose-900">
            − {formatMoney(totalLiabilities)}
          </span>
        </div>
      </section>

      {/* Results & Final Calculation Card */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>{isUrdu ? 'حتمی زکوٰۃ کا حساب' : 'Zakat Calculation Summary'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {isUrdu ? 'خالص قابلِ زکوٰۃ مالیت اور نتیجہ' : 'Net Zakatable Wealth & Result'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyBreakdownText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-all active:scale-95 border border-slate-700"
            >
              {copiedBreakdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBreakdown ? (isUrdu ? 'کاپی ہو گیا' : 'Copied!') : (isUrdu ? 'خلاصہ کاپی کریں' : 'Copy Summary')}</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <p className="text-[11px] text-slate-400 font-semibold">
              {isUrdu ? 'خالص مالیت (اثاثے − قرضے)' : 'Net Zakatable Wealth'}
            </p>
            <p className="text-lg sm:text-xl font-black text-white">
              {formatMoney(netZakatableWealth)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <p className="text-[11px] text-slate-400 font-semibold">
              {isUrdu ? `نصاب کی حد (${form.nisabStandard === 'gold' ? 'سونا' : 'چاندی'})` : `Nisab Threshold (${form.nisabStandard})`}
            </p>
            <p className="text-lg sm:text-xl font-black text-emerald-300">
              {activeNisabThreshold > 0 ? formatMoney(activeNisabThreshold) : (isUrdu ? 'ریٹ درج کریں' : 'Price needed')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <p className="text-[11px] text-slate-400 font-semibold">
              {isUrdu ? 'زکوٰۃ کی شرعی حیثیت' : 'Zakat Status'}
            </p>
            {activeNisabThreshold === 0 ? (
              <p className="text-sm font-bold text-amber-300">
                {isUrdu ? 'ریٹ درج فرمائیں' : 'Enter gold/silver price'}
              </p>
            ) : isZakatDue ? (
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isUrdu ? 'زکوٰۃ واجب ہے' : 'Zakat is Obligatory'}</span>
              </p>
            ) : (
              <p className="text-sm font-bold text-slate-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-slate-400" />
                <span>{isUrdu ? 'نصاب سے کم (زکوٰۃ نہیں)' : 'Below Nisab Threshold'}</span>
              </p>
            )}
          </div>
        </div>

        {/* Big Highlight Card: Final Payable Zakat Amount */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-100">
              {isUrdu ? 'کل واجب الادا زکوٰۃ کی رقم (شرح: ۲.۵٪)' : 'Total Payable Zakat (Rate: 2.5% / 1/40th)'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
              2.5%
            </span>
          </div>

          <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            {formatMoney(payableZakat)}
          </div>

          <p className="text-xs text-emerald-100 leading-relaxed pt-1">
            {isZakatDue
              ? (isUrdu
                  ? 'یہ رقم سال گزرنے پر قرآنی مصارف (سورۃ التوبہ: ۶۰) کے مستحقین میں تقسیم فرمائیں۔'
                  : 'Payable to the 8 Quranic recipient categories (Surah At-Tawbah 9:60) after the completion of one lunar year (Hawl).')
              : (isUrdu
                  ? 'آپ کی خالص مالیت مقررہ نصاب سے کم ہے، لہٰذا اس پر زکوٰۃ واجب نہیں ہے۔'
                  : 'Your net wealth is below the Nisab threshold. No obligatory Zakat is due on this amount.')}
          </p>
        </div>

        {/* Detailed Calculation Breakdown Table */}
        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2.5 text-xs">
          <p className="font-bold text-slate-300 pb-1 border-b border-slate-700">
            {isUrdu ? 'حساب کی تفصیلی تقسیم (Calculation Breakdown):' : 'Complete Calculation Breakdown:'}
          </p>

          <div className="flex justify-between py-1 text-slate-300 border-b border-slate-800">
            <span>{isUrdu ? 'نقد رقم و بینک بیلنس' : 'Total Cash & Bank Deposits'}</span>
            <span className="font-semibold">{formatMoney(cashTotal)}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300 border-b border-slate-800">
            <span>{isUrdu ? 'سونے چاندی کی مالیت' : 'Precious Metals (Gold + Silver)'}</span>
            <span className="font-semibold">{formatMoney(goldValue + silverValue)}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300 border-b border-slate-800">
            <span>{isUrdu ? 'کاروباری مالِ تجارت' : 'Business Merchandise & Inventory'}</span>
            <span className="font-semibold">{formatMoney(businessTotal)}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300 border-b border-slate-800">
            <span>{isUrdu ? 'وصول طلب رقوم' : 'Receivables Owed to You'}</span>
            <span className="font-semibold">{formatMoney(receivablesTotal)}</span>
          </div>
          <div className="flex justify-between py-1 text-emerald-400 font-bold border-b border-slate-800">
            <span>{isUrdu ? 'مجموعی اثاثے (Gross Assets)' : 'Total Gross Assets'}</span>
            <span>{formatMoney(totalGrossAssets)}</span>
          </div>
          <div className="flex justify-between py-1 text-rose-400 font-bold border-b border-slate-800">
            <span>{isUrdu ? 'منہا: فوری واجبات (Deductible Liabilities)' : 'Less: Immediate Liabilities'}</span>
            <span>− {formatMoney(totalLiabilities)}</span>
          </div>
          <div className="flex justify-between py-1.5 text-white font-black text-sm border-t border-slate-700">
            <span>{isUrdu ? 'خالص قابلِ زکوٰۃ رقم (Net Zakatable Wealth)' : 'Net Zakatable Wealth'}</span>
            <span>{formatMoney(netZakatableWealth)}</span>
          </div>
          <div className="flex justify-between py-1 text-slate-300">
            <span>{isUrdu ? `نصاب کی حد (${form.nisabStandard})` : `Nisab Benchmark (${form.nisabStandard.toUpperCase()})`}</span>
            <span>{formatMoney(activeNisabThreshold)}</span>
          </div>
          {isZakatDue && (
            <div className="flex justify-between py-1 text-emerald-300 font-semibold">
              <span>{isUrdu ? 'نصاب سے زائد فاضل مالیت' : 'Surplus Wealth Above Nisab'}</span>
              <span>{formatMoney(Math.max(0, netZakatableWealth - activeNisabThreshold))}</span>
            </div>
          )}
        </div>
      </section>

      {/* Educational Nisab & Hawl Guidance Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>{isUrdu ? 'نصاب اور حولانِ حول کے اہم شرعی احکام' : 'Understanding Nisab and Hawl in Islam'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isUrdu
              ? 'زکوٰۃ ادا کرنے کے شرعی قواعد اور بنیادی شرائط کی وضاحت۔'
              : 'Key criteria governing when Zakat becomes an obligation upon wealth.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? '۱. نصاب کا تصور (Nisab Concept)' : '1. What is Nisab?'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu ? data.nisabExplanationUrdu : data.nisabExplanationEn}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? '۲. حولانِ حول (Hawl - ایک سال کی شرط)' : '2. What is Hawl (1 Lunar Year)?'}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu ? data.hawlExplanationUrdu : data.hawlExplanationEn}
            </p>
          </div>
        </div>

        {/* Scholarly Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{isUrdu ? 'شرعی تنبیہ و وضاحتی بیان' : 'Important Scholarly Notice & Disclaimer'}</span>
          </p>
          <p>
            {isUrdu ? data.scholarlyDisclaimerUrdu : data.scholarlyDisclaimerEn}
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {isUrdu ? 'زکوٰۃ کے حساب کے بارے میں عمومی سوالات' : 'Frequently Asked Questions (Zakat Calculation)'}
        </h2>
        <div className="space-y-2.5">
          {data.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800"
              >
                <span>{isUrdu ? faq.questionUrdu : faq.questionEn}</span>
                <span className="text-slate-400 font-light text-base">
                  {openFaqIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  {isUrdu ? faq.answerUrdu : faq.answerEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Internal Navigation Card */}
      <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold">
              {isUrdu ? 'زکوٰۃ کے بنیادی احکام اور اسلامی کیلنڈر دیکھیں' : 'Learn More: Zakat Basics & Islamic Calendar'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isUrdu
                ? 'زکوٰۃ کے مصارف، احادیث اور اسلامی مہینوں کی مکمل معلومات حاصل کریں۔'
                : 'Explore detailed scholarly explanations of the 8 Quranic recipients and the Hijri lunar calendar.'}
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('zakat-basics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{isUrdu ? 'زکوٰۃ گائیڈ کھولیں' : 'Open Zakat Basics'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              setActiveTab('islamic-calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
          >
            {isUrdu ? 'اسلامی کیلنڈر' : 'Islamic Calendar'}
          </button>
          <button
            onClick={() => {
              setActiveTab('5-pillars-of-islam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
          >
            {isUrdu ? '۵ ارکانِ اسلام' : '5 Pillars of Islam'}
          </button>
          <button
            onClick={() => {
              setActiveTab('ramadan-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
          >
            {isUrdu ? 'رمضان گائیڈ' : 'Ramadan Guide'}
          </button>
          <button
            onClick={() => {
              setActiveTab('how-to-perform-salah');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
          >
            {isUrdu ? 'نماز کا طریقہ' : 'How to Pray (Salah)'}
          </button>
        </div>
      </section>

      {/* Related Islamic Learning */}
      <RelatedIslamicLearning currentTab="zakat-calculator" />
    </div>
  );
};

export default ZakatCalculator;

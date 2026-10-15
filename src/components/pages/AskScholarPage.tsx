import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Lock,
  BookOpen,
  HelpCircle,
  Scale,
  Award,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Compass,
  FileText,
  AlertCircle,
  ExternalLink,
  Info
} from 'lucide-react';

export const AskScholarPage: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';

  const benefits = [
    {
      id: 'benefit-everyday',
      icon: CheckCircle2,
      titleEn: 'Everyday Islamic Matters',
      titleUrdu: 'روزمرہ دینی و شرعی امور',
      descEn: 'Comprehensive guidance on Salah, fasting (Sawm), Zakat calculations, halal commerce, food ethics, and practical daily Islamic worship.',
      descUrdu: 'نماز، روزہ، زکوٰۃ، حلال روزگار اور روزمرہ زندگی کے عملی عباداتی مسائل پر مستند اور واضح رہنمائی۔',
      badge: 'Core Topics',
      badgeUrdu: 'بنیادی احکام'
    },
    {
      id: 'benefit-private-access',
      icon: Lock,
      titleEn: 'Private Access to Q&A',
      titleUrdu: 'سوال و جواب تک ذاتی رسائی',
      descEn: 'Confidential consultation where each questioner receives private access to their questions and answers without public visibility.',
      descUrdu: 'مکمل رازداری کے ساتھ سوالات اور جوابات تک صرف سائل کی ذاتی رسائی، عوامی نمائش کے بغیر۔',
      badge: 'Confidential',
      badgeUrdu: 'خفیہ و ذاتی'
    },
    {
      id: 'benefit-privacy-protection',
      icon: ShieldCheck,
      titleEn: 'Personal Information Protection',
      titleUrdu: 'ذاتی معلومات کا مکمل تحفظ',
      descEn: 'Strict privacy-by-design architecture. Questions are sanitized of identifying personal details before scholarly review to guarantee safety.',
      descUrdu: 'شناخت اور ذاتی تفصیلات کا مکمل تحفظ۔ سوالات کا جائزہ لیتے وقت سائل کی شناخت مکمل طور پر پوشیدہ رکھی جاتی ہے۔',
      badge: 'Zero Tracking',
      badgeUrdu: 'رازداری کی ضمانت'
    },
    {
      id: 'benefit-scholarly-guidance',
      icon: Award,
      titleEn: 'Qualified Scholarly Guidance',
      titleUrdu: 'مستند علمائے کرام کی رہنمائی',
      descEn: 'Direct guidance from recognized, traditionally accredited scholars and certified Muftis for sensitive and nuanced religious matters.',
      descUrdu: 'حساس اور پیچیدہ شرعی مسائل پر مستند دار الافتاء اور ثقہ علمائے کرام و مفتیانِ عظام کے ذریعے براہ راست رہنمائی۔',
      badge: 'Verified Scholars',
      badgeUrdu: 'اہلِ علم و مفتیان'
    }
  ];

  const categories = [
    {
      id: 'cat-qa',
      titleEn: '1. Islamic Q&A',
      titleUrdu: '۱۔ عام اسلامی سوال و جواب',
      badgeEn: 'Coming Soon • Informational',
      badgeUrdu: 'عنقریب • تعلیمی',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: HelpCircle,
      accentColor: 'border-emerald-500/40 hover:border-emerald-500',
      headerBg: 'bg-emerald-50/80',
      scopeEn: 'General religious inquiries, understanding Quranic verses, Sahih Hadith explanations, Seerah (prophetic life), Islamic history, and personal character development (Akhlaq).',
      scopeUrdu: 'عام دینی معلومات، قرآنی آیات کا فہم، صحیح احادیث کی تشریح، سیرت النبی ﷺ، اسلامی تاریخ اور اخلاق و آداب سے متعلق سوالات۔',
      examplesEn: [
        'Meaning and context of a specific Quranic verse',
        'Authenticity and lessons from a particular Hadith',
        'Sunnah etiquettes of sleep, eating, and travel',
        'Islamic perspective on gratitude and patience'
      ],
      examplesUrdu: [
        'کسی مخصوص قرآنی آیت کا مفہوم اور سیاق و سباق',
        'کسی حدیث کی صحت اور اس سے حاصل ہونے والے اسباق',
        'سونے، کھانے پینے اور سفر کے مسنون آداب',
        'صبر، شکر اور استقامت کے فضائل و احکام'
      ]
    },
    {
      id: 'cat-masail',
      titleEn: '2. Masail (Practical Rulings)',
      titleUrdu: '۲۔ فقہی مسائل و احکام',
      badgeEn: 'Coming Soon • Jurisprudence',
      badgeUrdu: 'عنقریب • فقہی احکام',
      tagColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: BookOpen,
      accentColor: 'border-teal-500/40 hover:border-teal-500',
      headerBg: 'bg-teal-50/80',
      scopeEn: 'Applied day-to-day jurisprudential rulings for Taharah (purification, wudu, ghusl, tayammum), Salah invalidators, fasting exemptions (illness, travel, pregnancy), Zakat Nisab, and permissible trade transactions.',
      scopeUrdu: 'روزمرہ عملی فقہی مسائل جیسے طہارت (وضو، غسل، تیمم)، نماز کے مفسدات، روزے کی شرعی رخصتیں (بیماری، سفر)، زکوٰۃ کا نصاب اور حلال تجارت۔',
      examplesEn: [
        'Rulings on missed prayers (Qada) and Sajdah Sahw',
        'Medical injections or inhalers while fasting',
        'Zakat calculation on mixed gold, silver, and business inventory',
        'Purification rules when clean water is difficult to access'
      ],
      examplesUrdu: [
        'قضا نمازوں اور سجدہ سہو کے احکام و شرائط',
        'روزے کی حالت میں انہیلر، ڈراپس یا انجیکشن کا شرعی حکم',
        'مخلوط سونے چاندی اور تجارتی مال پر زکوٰۃ کا حساب',
        'پانی کی عدم دستیابی یا عذر کی صورت میں طہارت کے مسائل'
      ]
    },
    {
      id: 'cat-fatwa',
      titleEn: '3. Fatwa (Formal Religious Decrees)',
      titleUrdu: '۳۔ شرعی فتاویٰ و استفسارات',
      badgeEn: 'Coming Soon • Formal Ifta\'',
      badgeUrdu: 'عنقریب • دار الافتاء',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Scale,
      accentColor: 'border-amber-500/40 hover:border-amber-500',
      headerBg: 'bg-amber-50/80',
      scopeEn: 'Formal legal verdicts for complex, sensitive, interpersonal, matrimonial (Nikah, Talaq, Khula), inheritance distribution, contractual agreements, and contemporary financial jurisprudence requiring certified Ifta\' review.',
      scopeUrdu: 'پیچیدہ، حساس، عائلی و ازدواجی تنازعات (نکاح، طلاق، خلع)، ترکہ و وراثت کی تقسیم، مالیاتی معاہدات اور عصرِ حاضر کے جدید معاملات پر باضابطہ دار الافتاء کی تحریری رائے۔',
      examplesEn: [
        'Islamic inheritance calculations according to specific heirs',
        'Matrimonial disputes and conditions within marriage contracts',
        'Commercial partnerships (Mudarabah/Musharakah) and ethical contracts',
        'Contemporary bioethical and medical jurisprudence questions'
      ],
      examplesUrdu: [
        'وارثین کے شرعی حصص کے مطابق ترکہ کی تقسیم',
        'ازدواجی تنازعات اور نکاح نامے کی شقوں کی شرعی حیثیت',
        'مضاربت اور شراکت داری کے تجارتی معاہدات کی توثیق',
        'جدید طبی اور سائنسی معاملات پر شرعی رہنمائی'
      ]
    }
  ];

  const fiqhOptions = [
    {
      id: 'fiqh-hanafi',
      nameEn: 'Hanafi (فقہ حنفی)',
      eponym: 'Imam Abu Hanifa (d. 150 AH)',
      descEn: 'Emphasizes juristic consistency, analogical deduction (Qiyas), and public welfare (Istihsan). Predominant across South Asia, Turkey, Central Asia, and the Levant.',
      descUrdu: 'امام اعظم ابو حنیفہ رحمہ اللہ کا فقہی مکتبہ فکر، جو قیاس، استحسان اور قواعدِ فقہ پر مبنی ہے۔ برصغیر، ترکی اور وسطی ایشیا میں رائج۔'
    },
    {
      id: 'fiqh-shafii',
      nameEn: 'Shafi\'i (فقہ شافعی)',
      eponym: 'Imam Muhammad ibn Idris al-Shafi\'i (d. 204 AH)',
      descEn: 'Emphasizes systematic methodology (Usul al-Fiqh) and direct Sunnah textual harmonization. Predominant across Southeast Asia, East Africa, Yemen, and Egypt.',
      descUrdu: 'امام محمد بن ادریس الشافعی رحمہ اللہ کا مکتبہ فکر، جس نے اصولِ فقہ کی تدوین کی۔ جنوب مشرقی ایشیا، مشرقی افریقہ اور یمن میں رائج۔'
    },
    {
      id: 'fiqh-maliki',
      nameEn: 'Maliki (فقہ مالکی)',
      eponym: 'Imam Malik ibn Anas (d. 179 AH)',
      descEn: 'Emphasizes the established practice of the people of Madinah (\'Amal Ahl al-Madinah) and public interest (Maslahah Mursalah). Predominant in North and West Africa.',
      descUrdu: 'امام دار الہجرۃ مالک بن انس رحمہ اللہ کا مکتبہ فکر، جو عملِ اہلِ مدینہ اور مصالحِ مرسلہ پر قائم ہے۔ شمالی و مغربی افریقہ میں رائج۔'
    },
    {
      id: 'fiqh-hanbali',
      nameEn: 'Hanbali (فقہ حنبلی)',
      eponym: 'Imam Ahmad ibn Hanbal (d. 241 AH)',
      descEn: 'Emphasizes primary adherence to explicit Quranic texts, Sahih Hadith, and Companions\' narrations (Athar). Predominant in the Arabian Peninsula.',
      descUrdu: 'امام احمد بن حنبل رحمہ اللہ کا مکتبہ فکر، جو نصوصِ کتاب و سنت اور آثارِ صحابہ کے سخت اتباع پر زور دیتا ہے۔ جزیرہ نما عرب میں رائج۔'
    },
    {
      id: 'fiqh-unsure',
      nameEn: '“I am unsure / need guidance” (مجھے رہنمائی درکار ہے)',
      eponym: 'General Scholarly Consensus (Jumhur)',
      descEn: 'Designed for seekers who do not strictly follow a single school or who require the scholar to provide the consensus opinion (Jumhur) most suitable for their circumstance.',
      descUrdu: 'ان سائلین کے لیے جو کسی خاص فقہ کے پابند نہیں یا جنہیں جمہور علمائے امت کی متفقہ رائے اور عام فہم شرعی رہنمائی درکار ہے۔'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16 px-4 sm:px-6">
      
      {/* Top Breadcrumb & Return to Home */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3.5 py-2 rounded-xl transition-all shadow-2xs active:scale-95"
          title="Return to IslamIQ Homepage"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>{isUrdu ? '← ہوم پیج پر واپس جائیں' : '← Back to Homepage'}</span>
        </button>

        <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
          IslamIQ • {isUrdu ? 'شرعی رہنمائی کا تعارف' : 'Ask a Scholar Hub'}
        </span>
      </div>

      {/* Hero Header Section with Photographic Islamic Architecture Background */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-10 shadow-xl border border-amber-400/30 min-h-[320px] flex flex-col justify-end">
        {/* Fallback CSS Islamic Geometric Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 opacity-90" />
        
        {/* High-Quality Islamic Architecture Photographic Background */}
        <img
          src="/assets/images/islamic_scholar_arch.jpg"
          alt="Islamic Architecture Mosque Archway"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          loading="eager"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Sophisticated Dark Emerald & Teal Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/30 sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/90 sm:to-slate-950/40 pointer-events-none" />

        {/* Subtle Golden Ambient Accent Glow */}
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black tracking-wider uppercase shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Coming Soon • عنقریب دستیاب ہوگا</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 text-emerald-200 border border-emerald-500/40 text-[11px] font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-goldAccent" />
              <span>Authentic Scholarly Consultation</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-serif drop-shadow-md">
              Ask a Scholar
            </h1>
            <p className="text-amber-300 text-lg sm:text-2xl font-bold font-urdu mt-1 drop-shadow-sm" dir="rtl">
              عالمِ دین سے رہنمائی حاصل کریں
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium drop-shadow-xs">
            {isUrdu
              ? 'اسلام آئی کیو کا آئندہ آنے والا پلیٹ فارم، جس کے ذریعے آپ اپنے دینی، فقہی، عائلی اور روزمرہ مسائل پر مستند علمائے کرام اور دار الافتاء سے مکمل رازداری کے ساتھ مستند شرعی رہنمائی حاصل کر سکیں گے۔'
              : 'IslamIQ’s upcoming dedicated portal connecting seekers with qualified Islamic scholars and accredited Muftis for authentic, confidential guidance on everyday worship, jurisprudence, and personal religious matters.'}
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-xs text-emerald-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white font-semibold">
                {isUrdu ? 'اہم وضاحتی نوٹ:' : 'Informational Overview:'}
              </strong>{' '}
              {isUrdu
                ? 'یہ صفحہ سروس کے مقاصد اور تعلیمی خدوخال کی وضاحت کے لیے ہے۔ فی الحال سائلین کی رازداری اور علمائے کرام کے پینل کی توثیق کا عمل جاری ہے، اس لیے فارم یا سوال جمع کرنے کا آپشن عنقریب باضابطہ آغاز پر فعال کیا جائے گا۔'
                : 'This page is informational and outlines the planned scholarly consultation architecture. Question submissions are not active yet while scholar accreditation, end-to-end question encryption, and peer-review protocols are being finalized.'}
            </p>
          </div>
        </div>
      </div>

      {/* The Four Key Benefits Section */}
      <div className="space-y-4">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>Four Pillars of Service • اہم خصوصیات و فوائد</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Why Ask a Scholar on IslamIQ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Built upon four core promises to ensure authentic guidance without compromising seeker dignity, safety, or theological rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-100">
                      <Icon className="w-5 h-5 text-emerald-700" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {isUrdu ? benefit.badgeUrdu : benefit.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {benefit.titleEn}
                    </h3>
                    <p className="text-xs font-bold text-emerald-800 font-urdu mt-0.5" dir="rtl">
                      {benefit.titleUrdu}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isUrdu ? benefit.descUrdu : benefit.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed in Upcoming Service</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Three Clearly Separated Categories */}
      <div className="space-y-4">
        <div className="text-center sm:text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Three Structured Tracks • تین واضح شعبہ جات</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Consultation Categories: Q&A, Masail & Fatwa
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            To ensure each inquiry receives the exact level of theological scrutiny it requires, inquiries will be categorized into three distinct tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`bg-white rounded-3xl border-2 ${cat.accentColor} shadow-sm transition-all overflow-hidden flex flex-col justify-between`}
              >
                <div>
                  {/* Category Header */}
                  <div className={`${cat.headerBg} p-5 border-b border-slate-100 space-y-2`}>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-slate-800">
                        <Icon className="w-5 h-5 text-emerald-800" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.tagColor}`}>
                        {isUrdu ? cat.badgeUrdu : cat.badgeEn}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900">
                        {cat.titleEn}
                      </h3>
                      <p className="text-xs font-bold text-emerald-900 font-urdu mt-0.5" dir="rtl">
                        {cat.titleUrdu}
                      </p>
                    </div>
                  </div>

                  {/* Category Scope & Description */}
                  <div className="p-5 space-y-3.5">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isUrdu ? cat.scopeUrdu : cat.scopeEn}
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                        {isUrdu ? 'مثالی سوالات:' : 'Example Topics Handled:'}
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {(isUrdu ? cat.examplesUrdu : cat.examplesEn).map((ex, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Coming Soon Notice Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {isUrdu ? 'عنقریب فعال ہوگا • رجسٹریشن زیرِ تکمیل' : 'Status: Roadmap Preview (No Forms Yet)'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Future Fiqh Choices for Fatwa */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Jurisprudential Schools • فقہی مکاتبِ فکر</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Future Fiqh Choices for Fatwa Requests
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            When submitting a formal Fatwa or complex Mas’alah in the future, questioners will be able to select their preferred school of jurisprudence (Madhhab) so answers directly reflect their traditional community practice:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {fiqhOptions.map((fiqh, index) => (
            <div
              key={fiqh.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                index === 4
                  ? 'sm:col-span-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-emerald-200'
                  : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-sm font-bold text-slate-900">
                  {fiqh.nameEn}
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  Option {index + 1}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-emerald-800 mb-1">
                {fiqh.eponym}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isUrdu ? fiqh.descUrdu : fiqh.descEn}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{isUrdu ? 'فتاویٰ اور فقہی اعتدال:' : 'Scholarly Integrity & Mutual Respect:'}</strong>{' '}
            {isUrdu
              ? 'تمام چاروں ائمہ کرام (احناف، شوافع، مالکیہ، حنابلہ) اہلِ سنت والجماعت کے برحق اور معتبر مکاتبِ فکر ہیں۔ ہر فقہ کے مسائل معتمد اور اصل متون سے تحقیق کے بعد ہی بیان کیے جائیں گے۔'
              : 'All four classical Sunni schools of jurisprudence are recognized and respected within orthodox Islamic tradition. Inquiries directed under a specific school will be examined through the authoritative legal compendiums of that respective tradition.'}
          </p>
        </div>
      </div>

      {/* How the Process Will Work (Informational Roadmap) */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Consultation Workflow • طریقہ کار کا خاکہ</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            How Consultations Will Work (Launch Roadmap)
          </h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            A preview of the secure, three-step journey from inquiry to verified scholarly response once launched.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-sm font-bold text-white">
              {isUrdu ? '۱۔ سوال کا اندراج' : '1. Submit Privately'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isUrdu
                ? 'اپنا سوال یا مسئلہ منتخب کریں اور مطلوبہ فقہ کا انتخاب کریں۔ سوال کو رازداری کے کوڈ سے محفوظ کیا جائے گا۔'
                : 'Select your track (Q&A, Masail, or Fatwa) and preferred Fiqh. Receive a private reference key with zero public tracking.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-sm font-bold text-white">
              {isUrdu ? '۲۔ علمائے کرام کا جائزہ' : '2. Scholarly Review'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isUrdu
                ? 'مستند مفتیان اور اہلِ علم قرآن و سنت اور فقہی نصوص کی روشنی میں مدلل جواب تیار کریں گے۔'
                : 'Inquiries are assigned to verified scholars and accredited Muftis for authentic investigation with classical textual citations.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-sm font-bold text-white">
              {isUrdu ? '۳۔ محفوظ تحریری جواب' : '3. Secure Delivery'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isUrdu
                ? 'سائل اپنے نجی کوڈ کے ذریعے مکمل اور مستند تحریری جواب حاصل کر سکے گا۔'
                : 'Access your signed, certified scholarly response directly within your private consultation dashboard.'}
            </p>
          </div>
        </div>
      </div>

      {/* Existing Verified Islamic Knowledge Hub Banner */}
      <div className="bg-emerald-50 rounded-3xl p-6 sm:p-7 border border-emerald-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950">
              {isUrdu ? 'فوری رہنمائی کے لیے ہمارے موجودہ مستند وسائل ملاحظہ کریں' : 'Need Immediate Guidance on Everyday Questions?'}
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed max-w-xl">
              {isUrdu
                ? 'جبکہ اسکالر سروس عنقریب لانچ ہو رہی ہے، آپ اسلام آئی کیو کے تصدیق شدہ سوال و جواب کے ذخیرے اور عملی گائیڈز سے ابھی مستفید ہو سکتے ہیں۔'
                : 'While Ask a Scholar is being prepared, you can browse over 50+ verified Islamic questions & answers with complete Quran and Hadith citations right now on IslamIQ.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('islamic-questions-answers');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isUrdu ? 'مستند سوال و جواب دیکھیں' : 'Browse Verified Q&A Hub'}</span>
          </button>
        </div>
      </div>

      {/* Return to Homepage Button */}
      <div className="pt-2 text-center">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'ہوم اسکرین پر واپس جائیں' : 'Back to IslamIQ Homepage'}</span>
        </button>
      </div>

    </div>
  );
};

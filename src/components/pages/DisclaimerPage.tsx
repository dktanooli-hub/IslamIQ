import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertOctagon, BookOpen, ShieldCheck, Mail, Globe, ArrowLeft } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Breadcrumb */}
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-all w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'واپس ہوم اسکرین' : 'Back to Home'}</span>
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Islamic Knowledge Notice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'وضاحتی بیان (Disclaimer)' : 'Disclaimer'}
          </h1>
          <p className="text-emerald-200 text-xs font-medium">
            Official Guidance &amp; Scholar Relationship Statement
          </p>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
            https://learnislamiq.com • learnislamiq@gmail.com
          </p>
        </div>
      </div>

      {/* Primary Verbatim Disclaimer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>Official IslamIQ Islamic Educational Disclaimer</span>
        </div>

        <blockquote className="border-l-4 border-amber-500 pl-4 py-2 text-slate-800 text-sm sm:text-base leading-relaxed font-serif bg-amber-50/50 rounded-r-2xl pr-4">
          “IslamIQ is an educational Islamic learning platform. The information provided through IslamIQ is intended for general educational and informational purposes.
          <br /><br />
          Islamic questions can sometimes involve detailed evidence, scholarly differences and matters of jurisprudence. IslamIQ should not be considered a Mufti or a substitute for a qualified and trusted Islamic scholar.
          <br /><br />
          Where a question involves a personal, complex or disputed religious matter, users should consult a qualified Islamic scholar or Mufti.
          <br /><br />
          We make reasonable efforts to use reliable and verified Islamic sources, but users should verify important matters with qualified scholars and original sources.”
        </blockquote>

        {isUrdu && (
          <div className="pt-3 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2 border-t border-slate-100 font-urdu" dir="rtl">
            <h3 className="font-bold text-slate-900 text-sm">
              اہم شرعی و فتاویٰ وضاحت:
            </h3>
            <p>
              اسلام آئی کیو (IslamIQ) ایک تعلیمی و معلوماتی پلیٹ فارم ہے جس کا مقصد روزمرہ کی بنیادی دینی معلومات، قرآنی آیات، احادیثِ صحیحہ اور دعاؤں کو عام فہم انداز میں پیش کرنا ہے۔
            </p>
            <p>
              فقہی و اختلافی مسائل یا مخصوص ذاتی حالات میں فتویٰ اور رہنمائی کے لیے کسی مستند دارالافتاء، قابلِ اعتماد مفتی یا مستند عالمِ دین سے براہِ راست رجوع فرمائیں۔ اسلام آئی کیو کو مفتی کا متبادل نہ سمجھا جائے۔
            </p>
          </div>
        )}
      </div>

      {/* Verification & Accuracy Efforts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'مستند مآخذ کی فراہمی' : 'Verified References'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'ہم حتی الامکان قرآن، صحیح بخاری، صحیح مسلم اور سنن اربعہ کی تصدیق شدہ نصوص فراہم کرتے ہیں۔'
              : 'Our questions and daily reminders are backed by canonical references with Surah, Ayah, and Hadith numbers clearly marked.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'علمی تصحیح کی دعوت' : 'Report an Inaccuracy'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'اگر آپ کو کسی حوالے، ترجمے یا املا میں کوئی غلطی محسوس ہو تو براہ کرم ہمیں مطلع فرمائیں تاکہ فوراً درست کیا جا سکے۔'
              : 'If you identify any textual, typographical, or reference typo, please contact our team immediately for prompt correction.'}
          </p>
        </div>
      </div>

      {/* Official Contact Footer */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 text-center space-y-2">
        <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
          Official Contact
        </div>
        <p className="text-xs text-slate-300">
          For any clarifications regarding Islamic content references or this disclaimer:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs pt-1">
          <a href="mailto:learnislamiq@gmail.com" className="text-emerald-300 hover:text-emerald-200 flex items-center gap-1 font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>learnislamiq@gmail.com</span>
          </a>
          <a href="https://learnislamiq.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>https://learnislamiq.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

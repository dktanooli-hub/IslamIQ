import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, HelpCircle, CheckSquare, Sparkles, Compass, Search, Heart, ShieldCheck, Globe, Mail, ArrowLeft, Users, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
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
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official IslamIQ Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            IslamIQ
          </h1>
          <p className="text-emerald-300 font-bold text-sm tracking-wide">
            Learn • Quiz • Grow
          </p>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
            https://www.learnislamiq.com • learnislamiq@gmail.com
          </p>
        </div>
      </div>

      {/* Primary Mission Card with verbatim requested statement */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>{isUrdu ? 'ہمارا تعارف اور مقصد' : 'About IslamIQ'}</span>
        </div>

        <blockquote className="border-l-4 border-emerald-600 pl-4 py-1 text-slate-800 text-sm sm:text-base leading-relaxed font-serif bg-slate-50/70 rounded-r-xl pr-3">
          “IslamIQ is an Islamic learning and educational platform designed to make Islamic knowledge easier, simpler and more engaging for Kids and Adults.
          <br /><br />
          Our goal is to provide Islamic quizzes, educational content and useful daily Islamic tools in an easy-to-use environment.
          <br /><br />
          IslamIQ may include Islamic Quiz, Kids Islamic Learning, Salah Tracker, Tasbih Counter, Qibla Direction, Islamic Questions & Answers, Daily Quran, Hadith, Duas and Islamic Reminders.
          <br /><br />
          We aim to provide reliable and educational content and, where appropriate, include references or sources.
          <br /><br />
          IslamIQ is an educational platform and is not a replacement for a qualified Islamic scholar or Mufti.”
        </blockquote>

        {isUrdu && (
          <div className="pt-2 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-2 border-t border-slate-100 font-urdu" dir="rtl">
            <p>
              اسلام آئی کیو (IslamIQ) ایک مستند اسلامی تعلیمی پلیٹ فارم ہے جس کا مقصد بچوں اور بڑوں دونوں کے لیے اسلامی معلومات کو آسان، پرکشش اور روزمرہ زندگی کا حصہ بنانا ہے۔
            </p>
            <p>
              یہ پلیٹ فارم روزانہ اسلامی کوئز، نماز ٹریکر، ڈیجیٹل تسبیح، قبلہ سمت، روزانہ قرآنی آیات اور احادیثِ مبارکہ پر مشتمل ہے۔ یاد رہے کہ یہ تعلیمی مقاصد کے لیے ہے اور کسی مستند مفتی یا عالمِ دین کا متبادل نہیں ہے۔
            </p>
          </div>
        )}
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'بڑوں اور بچوں کے الگ موڈز' : 'Adult & Kids Dedicated Modes'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'بچوں کے لیے آسان اور خوشگوار انداز جبکہ بڑوں کے لیے تفصیلی اور تحقیقی کوئز اور مضامین۔'
              : 'Tailored interfaces ensuring appropriate difficulty, child-safe language, and engaging gamification.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'مستند اور حوالہ جاتی مواد' : 'Verified References'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'قرآنِ کریم کی سورتوں اور صحیح بخاری، مسلم، ترمذی اور ابو داؤد کے مستند حوالہ جات۔'
              : 'Authentic Quranic ayat and verified Sahih hadith references cited clearly for accurate learning.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'روزمرہ اسلامی معمولات' : 'Daily Islamic Routine'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'نمازوں کی پابندی کے لیے ٹریکر اور صبح و شام کے اذکار کے لیے ڈیجیٹل تسبیح۔'
              : 'Salah habit building, digital tasbih counters, and daily authentic duas at your fingertips.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUrdu ? 'قبلہ فائنڈر اور معلومات' : 'Qibla Finder & Q&A'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isUrdu
              ? 'دُنیا کے کسی بھی مقام سے کعبہ شریف کی درست سمت معلوم کریں اور اسلامی سوالات تلاش کریں۔'
              : 'Precise compass bearing to the Kaabah and a searchable library of verified Islamic questions.'}
          </p>
        </div>
      </div>

      {/* Editorial Methodology & Sources */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>{isUrdu ? 'تحقیقی و ادارتی طریقہ کار' : 'Editorial & Verification Methodology'}</span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            {isUrdu
              ? 'اسلام آئی کیو کا ادارتی اصول کتبِ سلف اور معتبر مآخذ کی مکمل پاسداری پر مبنی ہے۔ ہمارا مواد مندرجہ ذیل اصولوں کے تحت مرتب کیا جاتا ہے:'
              : 'IslamIQ adheres to a rigorous editorial standard grounded in primary classical Islamic sources and mainstream scholarly consensus:'}
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1">
            <li>
              <strong>{isUrdu ? 'قرآنِ مجید:' : 'The Holy Quran:'}</strong>{' '}
              {isUrdu
                ? 'رسم عثمانی کے مطابق آیات اور معتبر اردو و انگریزی تراجم (جیسے صحیح انٹرنیشنل) کے ساتھ۔'
                : 'Canonical Uthmani script with recognized translations (including Saheeh International) and exact Surah/Ayah citations.'}
            </li>
            <li>
              <strong>{isUrdu ? 'کتبِ احادیث:' : 'Hadith Verification:'}</strong>{' '}
              {isUrdu
                ? 'صحاح ستہ بالخصوص صحیح بخاری اور صحیح مسلم کی روایات، مع باب اور حدیث نمبر۔'
                : 'Primary Hadith collections, prioritizing Sahih al-Bukhari and Sahih Muslim, followed by the four Sunan (Abu Dawud, at-Tirmidhi, an-Nasa\'i, Ibn Majah), with clear book and hadith numbering.'}
            </li>
            <li>
              <strong>{isUrdu ? 'فقہی تنوع اور مذاہب اربعہ:' : 'Handling Scholarly Differences (Ikhtilaf):'}</strong>{' '}
              {isUrdu
                ? 'فروعی اور اجتہادی مسائل میں مذاہب اربعہ (حنفی، شافعی، مالکی، حنبلی) کے مسلمہ علمی اختلاف کا احترام کیا جاتا ہے۔'
                : 'On subsidiary matters of jurisprudence where classical scholars differed, IslamIQ presents established positions across the four major Sunni schools of thought (Hanafi, Shafi\'i, Maliki, Hanbali) impartially without partisanship.'}
            </li>
            <li>
              <strong>{isUrdu ? 'غیر جانبدارانہ تعلیمی کردار:' : 'Educational Scope:'}</strong>{' '}
              {isUrdu
                ? 'ہم کسی نئے مسلک یا فرقہ وارانہ بحث کی ترویج نہیں کرتے بلکہ امت کے متفقہ علمی ورثے کو آسان انداز میں پیش کرتے ہیں۔'
                : 'The platform serves purely educational objectives and refrains from sectarian controversies or issuing binding religious edicts.'}
            </li>
          </ul>
        </div>
      </div>

      {/* Official Identity Badge */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 text-center space-y-3">
        <div className="text-xs uppercase font-bold tracking-widest text-emerald-400">
          Official Domain & Contact
        </div>
        <div className="text-xl font-black font-serif">
          IslamIQ — Learn • Quiz • Grow
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <a href="https://www.learnislamiq.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>https://www.learnislamiq.com</span>
          </a>
          <a href="mailto:learnislamiq@gmail.com" className="hover:text-white flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>learnislamiq@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

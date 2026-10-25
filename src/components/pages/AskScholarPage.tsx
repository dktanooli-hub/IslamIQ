import React, { useState } from 'react';
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
  AlertCircle,
  Info,
  Send,
  Search,
  Key,
  Copy,
  Check,
  Eye,
  EyeOff,
  User,
  Mail,
  FileText,
  BookmarkCheck,
  RotateCcw,
  Library
} from 'lucide-react';
import { supabaseService } from '../../services/supabaseService';
import {
  ScholarInquiryCategory,
  MadhhabPreference,
  PublicScholarInquiry,
  ScholarSubmissionResult
} from '../../types';

export const AskScholarPage: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  // Active view: 'submit' (Submit Question) | 'status' (Check Inquiry Status)
  const [activeView, setActiveView] = useState<'submit' | 'status'>('submit');

  // ---------------------------------------------------------------------------
  // SUBMISSION FORM STATE
  // ---------------------------------------------------------------------------
  const [subject, setSubject] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState<ScholarInquiryCategory>('General');
  const [madhhabPreference, setMadhhabPreference] = useState<MadhhabPreference>('General');
  const [seekerName, setSeekerName] = useState('');
  const [seekerEmail, setSeekerEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ScholarSubmissionResult | null>(null);
  const [copiedField, setCopiedField] = useState<'number' | 'token' | 'both' | null>(null);

  // ---------------------------------------------------------------------------
  // STATUS CHECK FORM STATE
  // ---------------------------------------------------------------------------
  const [statusInquiryNumber, setStatusInquiryNumber] = useState('');
  const [statusAccessToken, setStatusAccessToken] = useState('');
  const [showStatusToken, setShowStatusToken] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [inquiryDetails, setInquiryDetails] = useState<PublicScholarInquiry | null>(null);

  // Categories list with Urdu & English labels
  const categoriesList: { value: ScholarInquiryCategory; en: string; urdu: string }[] = [
    { value: 'General', en: 'General Islamic Guidance', urdu: 'عام دینی رہنمائی' },
    { value: 'Pillars', en: 'Pillars of Islam (Arkan)', urdu: 'ارکانِ اسلام' },
    { value: 'Quran', en: 'Quran & Tafsir', urdu: 'قرآن و تفسیر' },
    { value: 'Hadith', en: 'Hadith & Sunnah', urdu: 'حدیث و سنت' },
    { value: 'Salah', en: 'Salah & Prayer Times', urdu: 'نماز و اوقات' },
    { value: 'Taharah', en: 'Taharah & Purification', urdu: 'طہارت، وضو و غسل' },
    { value: 'Sawm', en: 'Sawm & Fasting (Ramadan)', urdu: 'روزہ، اعتکاف و رمضان' },
    { value: 'Zakat', en: 'Zakat & Sadaqah', urdu: 'زکوٰۃ و صدقات' },
    { value: 'Hajj', en: 'Hajj & Umrah', urdu: 'حج و عمرہ' },
    { value: 'Family', en: 'Family, Marriage & Social', urdu: 'عائلی و خاندانی مسائل' },
    { value: 'Halal', en: 'Halal Trade & Finance', urdu: 'حلال روزگار، تجارت و مال' },
    { value: 'Manners', en: 'Manners & Character (Akhlaq)', urdu: 'اخلاق و آدابِ زندگی' },
    { value: 'Aqeedah', en: 'Aqeedah & Faith Articles', urdu: 'عقائد و ایمانیات' },
    { value: 'Masail', en: 'Contemporary Fiqh Issues', urdu: 'جدید فقہی مسائل' }
  ];

  // Madhhab preference list
  const madhhabList: { value: MadhhabPreference; en: string; urdu: string }[] = [
    { value: 'General', en: 'General (All Classical Schools)', urdu: 'عمومی (تمام معتبر ائمہ)' },
    { value: 'Hanafi', en: 'Hanafi (فقہ حنفی)', urdu: 'فقہ حنفی (امام ابو حنیفہؒ)' },
    { value: 'Shafi\'i', en: 'Shafi\'i (فقہ شافعی)', urdu: 'فقہ شافعی (امام شافعیؒ)' },
    { value: 'Maliki', en: 'Maliki (فقہ مالکی)', urdu: 'فقہ مالکی (امام مالکؒ)' },
    { value: 'Hanbali', en: 'Hanbali (فقہ حنبلی)', urdu: 'فقہ حنبلی (امام احمد بن حنبلؒ)' }
  ];

  // Copy helper
  const copyToClipboard = async (text: string, type: 'number' | 'token' | 'both') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(type);
      showToast(isUrdu ? 'کامیابی سے کاپی ہو گیا' : 'Copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      showToast(isUrdu ? 'کاپی کرنے میں دشواری پیش آئی' : 'Failed to copy to clipboard');
    }
  };

  // ---------------------------------------------------------------------------
  // SUBMIT INQUIRY HANDLER
  // ---------------------------------------------------------------------------
  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    const cleanSubject = subject.trim();
    const cleanQuestion = questionText.trim();

    if (cleanSubject.length < 3) {
      setSubmitError(
        isUrdu
          ? 'موضوع کم از کم ۳ حروف پر مشتمل ہونا چاہیے۔'
          : 'Subject must be at least 3 characters long.'
      );
      return;
    }
    if (cleanSubject.length > 150) {
      setSubmitError(
        isUrdu
          ? 'موضوع زیادہ سے زیادہ ۱۵۰ حروف پر مشتمل ہو سکتا ہے۔'
          : 'Subject cannot exceed 150 characters.'
      );
      return;
    }
    if (cleanQuestion.length < 10) {
      setSubmitError(
        isUrdu
          ? 'سوال کی تفصیل کم از کم ۱۰ حروف پر مشتمل ہونی چاہیے۔'
          : 'Question details must be at least 10 characters long.'
      );
      return;
    }
    if (cleanQuestion.length > 4000) {
      setSubmitError(
        isUrdu
          ? 'سوال کی تفصیل ۴۰۰۰ حروف سے زیادہ نہیں ہو سکتی۔'
          : 'Question cannot exceed 4000 characters.'
      );
      return;
    }
    if (seekerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(seekerEmail.trim())) {
      setSubmitError(
        isUrdu
          ? 'براہ کرم درست ای میل پتہ درج کریں۔'
          : 'Please provide a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Secure submission through verified RPC only
      const res = await supabaseService.submitScholarInquiry({
        subject: cleanSubject,
        questionText: cleanQuestion,
        category,
        madhhabPreference,
        seekerName: seekerName.trim() || undefined,
        seekerEmail: seekerEmail.trim() || undefined
      });

      if (!res.success || !res.data) {
        setSubmitError(res.error || (isUrdu ? 'سوال جمع کرنے میں دشواری پیش آئی۔' : 'Failed to submit inquiry.'));
        setIsSubmitting(false);
        return;
      }

      // Record result (Do NOT console.log raw secret token!)
      setSubmissionResult(res.data);
      setIsSubmitting(false);
      showToast(isUrdu ? 'آپ کا استفسار بحفاظت موصول ہو گیا' : 'Inquiry submitted successfully!');
    } catch (err: any) {
      setSubmitError(err?.message || (isUrdu ? 'نیٹ ورک یا سرور میں مسئلہ پیش آیا۔' : 'An unexpected error occurred.'));
      setIsSubmitting(false);
    }
  };

  // Reset submit form
  const handleResetForm = () => {
    setSubject('');
    setQuestionText('');
    setCategory('General');
    setMadhhabPreference('General');
    setSeekerName('');
    setSeekerEmail('');
    setSubmitError(null);
    setSubmissionResult(null);
  };

  // Switch to status view with prefilled credentials
  const handleViewStatusWithCredentials = (inquiryNum: string, token: string) => {
    setStatusInquiryNumber(inquiryNum);
    setStatusAccessToken(token);
    setActiveView('status');
    setInquiryDetails(null);
    setStatusError(null);
  };

  // ---------------------------------------------------------------------------
  // STATUS CHECK HANDLER
  // ---------------------------------------------------------------------------
  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusError(null);
    setInquiryDetails(null);

    const cleanNumber = statusInquiryNumber.trim().toUpperCase();
    const cleanToken = statusAccessToken.trim();

    if (!cleanNumber) {
      setStatusError(
        isUrdu ? 'براہ کرم انکوائری نمبر درج کریں۔' : 'Please provide your Inquiry Number.'
      );
      return;
    }
    if (!cleanToken) {
      setStatusError(
        isUrdu ? 'براہ کرم خفیہ رسائی ٹوکن درج کریں۔' : 'Please provide your Secret Access Token.'
      );
      return;
    }

    setIsCheckingStatus(true);

    try {
      const res = await supabaseService.getScholarInquiry(cleanNumber, cleanToken);

      if (!res.success) {
        setStatusError(res.error || (isUrdu ? 'معلومات حاصل کرنے میں دشواری پیش آئی۔' : 'Error retrieving inquiry.'));
        setIsCheckingStatus(false);
        return;
      }

      if (!res.data) {
        setStatusError(
          isUrdu
            ? 'کوئی استفسار نہیں ملا۔ براہ کرم اپنا انکوائری نمبر اور خفیہ ٹوکن درست درج کریں۔'
            : 'No inquiry found matching this Inquiry Number and Secret Token. Please check for typos and verify your credentials.'
        );
        setIsCheckingStatus(false);
        return;
      }

      setInquiryDetails(res.data);
      setIsCheckingStatus(false);
    } catch (err: any) {
      setStatusError(err?.message || (isUrdu ? 'سرور سے رابطہ ممکن نہ ہو سکا۔' : 'Failed to connect to server.'));
      setIsCheckingStatus(false);
    }
  };

  // Status visual badge formatting
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return {
          labelEn: 'Pending Review',
          labelUrdu: 'زیرِ جائزہ (منتظر)',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500'
        };
      case 'sent_to_scholar':
        return {
          labelEn: 'Sent to Scholar',
          labelUrdu: 'عالمِ دین کو ارسال شدہ',
          bg: 'bg-sky-100 text-sky-900 border-sky-300',
          dot: 'bg-sky-500'
        };
      case 'answer_received':
        return {
          labelEn: 'Under Final Audit',
          labelUrdu: 'جواب موصول (زیرِ تصدیق)',
          bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          dot: 'bg-indigo-500'
        };
      case 'answered':
        return {
          labelEn: 'Answered & Verified',
          labelUrdu: 'مستند شرعی جواب تیار ہے',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-500'
        };
      case 'rejected':
        return {
          labelEn: 'Inquiry Closed',
          labelUrdu: 'معذرت کے ساتھ بند شدہ',
          bg: 'bg-rose-100 text-rose-900 border-rose-300',
          dot: 'bg-rose-500'
        };
      default:
        return {
          labelEn: status,
          labelUrdu: status,
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-400'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8" dir={isUrdu ? 'rtl' : 'ltr'}>
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors p-2 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className={`w-4 h-4 ${isUrdu ? 'rotate-180' : ''}`} />
          <span>{isUrdu ? 'مرکزی صفحہ پر واپس جائیں' : 'Back to Home'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('scholars-library');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-bold text-xs transition-colors cursor-pointer"
          >
            <Library className="w-3.5 h-3.5 text-teal-700" />
            <span>{isUrdu ? 'عوامی لائبریری' : 'Public Scholars Library'}</span>
          </button>

          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
            IslamIQ • {isUrdu ? 'مستند شرعی استفسار' : 'Ask a Scholar Portal'}
          </span>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-10 shadow-xl border border-amber-400/30">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 opacity-90" />
        <img
          src="/assets/images/islamic_scholar_arch.jpg"
          alt="Islamic Architecture Mosque Archway"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          loading="eager"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/30 sm:bg-gradient-to-r sm:from-slate-950 sm:via-slate-950/90 sm:to-slate-950/40 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isUrdu ? 'مستند دار الافتاء و علماء' : 'Traditional Scholar Review'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 border border-amber-400/30 text-[11px] font-semibold backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isUrdu ? 'غیر خودکار • انسانی تحقیق' : 'Zero AI Fatwas • Human Research'}</span>
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-serif drop-shadow-md">
              Ask a Scholar
            </h1>
            <p className="text-amber-300 text-lg sm:text-2xl font-bold font-urdu mt-1 drop-shadow-sm" dir="rtl">
              عالمِ دین سے مستند شرعی رہنمائی
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {isUrdu
              ? 'اپنے دینی، عباداتی، عائلی اور فقہی مسائل پر مستند ثقہ علمائے کرام اور دار الافتاء سے مکمل رازداری کے ساتھ رہنمائی حاصل کریں۔ تمام جوابات قرآن و سنت اور معتمد فقہی کتب سے تحقیق کے بعد دیے جاتے ہیں۔'
              : 'Submit your personal religious, jurisprudential, and worship inquiries for confidential review by traditionally accredited Islamic scholars and certified Muftis.'}
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/15 text-xs text-amber-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white font-semibold">
                {isUrdu ? 'شرعی ضابطہ و احتیاط:' : 'Theological Integrity & Verification:'}
              </strong>{' '}
              {isUrdu
                ? 'اسلام آئی کیو پر کوئی بھی فتویٰ یا شرعی جواب خودکار کمپیوٹر یا مصنوعی ذہانت (AI) کے ذریعے تیار نہیں کیا جاتا۔ علمائے کرام باقاعدہ تحقیق کے بعد تحریری جواب دیتے ہیں، اس لیے جواب کی تیاری میں مناسب وقت درکار ہوتا ہے۔'
                : 'All answers are diligently researched and formulated offline by qualified Islamic scholars and accredited Muftis with authentic classical citations. IslamIQ does not generate automated or AI fatwas.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Dual Tab Switcher */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1.5 border border-slate-200">
        <button
          onClick={() => {
            setActiveView('submit');
            setSubmitError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeView === 'submit'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>{isUrdu ? 'نیا سوال جمع کروائیں' : 'Submit an Inquiry'}</span>
        </button>

        <button
          onClick={() => {
            setActiveView('status');
            setStatusError(null);
          }}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeView === 'status'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{isUrdu ? 'اسٹیٹس اور جواب دیکھیں' : 'Check Status & Read Answer'}</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: SUBMIT INQUIRY                                                */}
      {/* ===================================================================== */}
      {activeView === 'submit' && (
        <div className="space-y-6">
          {/* If inquiry was just submitted, show credential confirmation card */}
          {submissionResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-6 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {isUrdu ? 'استفسار کامیابی سے موصول ہو گیا' : 'Inquiry Submitted Successfully'}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {isUrdu
                      ? 'آپ کا سوال بحفاظت ہمارے اسکالر پینل تک پہنچا دیا گیا ہے۔'
                      : 'Your question has been securely queued for scholarly review.'}
                  </p>
                </div>
              </div>

              {/* CRITICAL WARNING NOTICE */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>
                    {isUrdu
                      ? 'انتہائی اہم: اپنے خفیہ رسائی کوڈ اور نمبر کو فوراً محفوظ کر لیں!'
                      : 'CRITICAL: Save Your Secret Access Token Immediately!'}
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  {isUrdu
                    ? 'آپ کی مکمل رازداری کے پیشِ نظر یہ خفیہ ٹوکن ڈیٹابیس میں صرف خفیہ ہیش کی شکل میں محفوظ ہے اور سادہ متن میں کہیں محفوظ نہیں ہوتا۔ اگر آپ یہ کوڈ کھو دیں گے تو دوبارہ حاصل نہیں کیا جا سکے گا۔ اپنے عالمِ دین کا جواب دیکھنے کے لیے آپ کو ان دونوں چیزوں کی ضرورت ہوگی۔'
                    : 'For zero-knowledge seeker privacy, this high-entropy secret token is displayed ONLY ONCE and is never stored in plain text. It cannot be recovered or reset. You must retain both credentials to look up your answer.'}
                </p>
              </div>

              {/* Credentials Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Inquiry Number */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {isUrdu ? 'انکوائری نمبر (Inquiry Number)' : 'Inquiry Number'}
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
                    <span className="font-mono font-bold text-sm sm:text-base text-slate-900 select-all">
                      {submissionResult.inquiryNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(submissionResult.inquiryNumber, 'number')}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-all"
                      title="Copy Inquiry Number"
                    >
                      {copiedField === 'number' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Secret Access Token */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isUrdu ? 'خفیہ رسائی ٹوکن (Secret Access Token)' : 'Secret Access Token'}</span>
                  </span>
                  <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-emerald-300">
                    <span className="font-mono font-bold text-xs sm:text-sm text-emerald-950 break-all select-all">
                      {submissionResult.accessToken}
                    </span>
                    <button
                      onClick={() => copyToClipboard(submissionResult.accessToken, 'token')}
                      className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs flex items-center gap-1 shrink-0 transition-all"
                      title="Copy Secret Token"
                    >
                      {copiedField === 'token' ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() =>
                    copyToClipboard(
                      `IslamIQ Scholar Inquiry\nInquiry Number: ${submissionResult.inquiryNumber}\nSecret Token: ${submissionResult.accessToken}`,
                      'both'
                    )
                  }
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  {copiedField === 'both' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{isUrdu ? 'دونوں کوڈز کاپی کریں' : 'Copy All Credentials'}</span>
                </button>

                <button
                  onClick={() =>
                    handleViewStatusWithCredentials(
                      submissionResult.inquiryNumber,
                      submissionResult.accessToken
                    )
                  }
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  <span>{isUrdu ? 'اسٹیٹس چیک کے صفحے پر جائیں' : 'Check Status Now'}</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{isUrdu ? 'نیا سوال پوچھیں' : 'Ask Another Question'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Submissions Active Form */
            <form onSubmit={handleSubmitInquiry} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 pb-4 space-y-1">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {isUrdu ? 'استفسار برائے علمائے کرام' : 'Submit Religious Inquiry'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isUrdu
                    ? 'کوئی اکاؤنٹ یا لاگ ان لازمی نہیں۔ سوال جمع کروانے پر آپ کو نجی رسائی کوڈ فراہم کیا جائے گا۔'
                    : 'Guest submissions welcome. No account required. You will receive a private access token upon submission.'}
                </p>
              </div>

              {submitError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-semibold">{submitError}</p>
                </div>
              )}

              {/* Row 1: Category & Madhhab Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    {isUrdu ? 'شعبہ / موضوعِ استفسار *' : 'Inquiry Category *'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ScholarInquiryCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    required
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {isUrdu ? `${cat.urdu} (${cat.en})` : `${cat.en} • ${cat.urdu}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Madhhab Preference */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    {isUrdu ? 'فقہی ترجیح (اختیاری)' : 'Jurisprudential School (Madhhab) Preference'}
                  </label>
                  <select
                    value={madhhabPreference}
                    onChange={(e) => setMadhhabPreference(e.target.value as MadhhabPreference)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {madhhabList.map((m) => (
                      <option key={m.value} value={m.value}>
                        {isUrdu ? `${m.urdu} (${m.en})` : `${m.en}`}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 2: Subject */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    {isUrdu ? 'سوال کا خلاصہ / عنوان *' : 'Subject / Question Summary *'}
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {subject.length}/150
                  </span>
                </div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    isUrdu
                      ? 'مثلاً: دورانِ سفر نمازِ قصر کے احکام اور مدت کی شرعی وضاحت'
                      : 'e.g., Short prayer (Qasr) rulings during a temporary business stay'
                  }
                  maxLength={150}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Row 3: Question Details */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    {isUrdu ? 'تفصیلی سوال و صورتِ حال *' : 'Detailed Question & Circumstances *'}
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {questionText.length}/4000
                  </span>
                </div>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={5}
                  placeholder={
                    isUrdu
                      ? 'اپنے سوال کی تمام متعلقہ شرعی تفصیلات یہاں تحریر کریں۔ اگر کوئی خاص صورتِ حال یا مجبوری ہو تو واضح فرمائیں۔ (اردو، انگریزی، عربی سب قبول ہیں)'
                      : 'Provide full details, context, and specific situation. (Urdu, English, and Arabic text are all preserved and supported).'
                  }
                  maxLength={4000}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                  required
                />
              </div>

              {/* Row 4: Seeker Optional Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isUrdu ? 'آپ کا نام یا کنیت (اختیاری)' : 'Your Name / Kunya (Optional)'}</span>
                  </label>
                  <input
                    type="text"
                    value={seekerName}
                    onChange={(e) => setSeekerName(e.target.value)}
                    placeholder={isUrdu ? 'مثلاً: عبداللہ یا گمنام سائل' : 'e.g., Abdullah or Anonymous'}
                    maxLength={60}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isUrdu ? 'ای میل پتہ (اختیاری - برائے ضرورت)' : 'Email Address (Optional)'}</span>
                  </label>
                  <input
                    type="email"
                    value={seekerEmail}
                    onChange={(e) => setSeekerEmail(e.target.value)}
                    placeholder="email@example.com"
                    maxLength={100}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {isUrdu
                  ? '🔒 رازداری کی ضمانت: ای میل کبھی بھی عوامی طور پر ظاہر نہیں کی جاتی اور نہ ہی غیر متعلقہ افراد کو دی جاتی ہے۔'
                  : '🔒 Confidentiality: Your email is strictly confidential, never exposed publicly, and used only by administration if clarification is required.'}
              </p>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{isUrdu ? 'ارسال ہو رہا ہے...' : 'Submitting to Scholars...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{isUrdu ? 'استفسار بحفاظت جمع کروائیں' : 'Submit Inquiry Privately'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: CHECK INQUIRY STATUS & READ ANSWER                            */}
      {/* ===================================================================== */}
      {activeView === 'status' && (
        <div className="space-y-6">
          
          {/* Lookup Form */}
          <form onSubmit={handleCheckStatus} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {isUrdu ? 'استفسار کا اسٹیٹس اور جواب تلاش کریں' : 'Look Up Your Inquiry & Scholarly Answer'}
              </h2>
              <p className="text-xs text-slate-500">
                {isUrdu
                  ? 'اپنا دیا گیا انکوائری نمبر اور خفیہ رسائی ٹوکن درج کریں تاکہ آپ کا نجی ریکارڈ تلاش کیا جا سکے۔'
                  : 'Enter your assigned Inquiry Number and Secret Access Token to view status or verified response.'}
              </p>
            </div>

            {statusError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-semibold">{statusError}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Inquiry Number Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  {isUrdu ? 'انکوائری نمبر *' : 'Inquiry Number *'}
                </label>
                <input
                  type="text"
                  value={statusInquiryNumber}
                  onChange={(e) => setStatusInquiryNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. IQ-20261017-ABC12345"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Secret Access Token Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>{isUrdu ? 'خفیہ رسائی ٹوکن *' : 'Secret Access Token *'}</span>
                  <button
                    type="button"
                    onClick={() => setShowStatusToken(!showStatusToken)}
                    className="text-[11px] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
                  >
                    {showStatusToken ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showStatusToken ? 'Hide' : 'Show'}</span>
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showStatusToken ? 'text' : 'password'}
                    value={statusAccessToken}
                    onChange={(e) => setStatusAccessToken(e.target.value)}
                    placeholder="e.g. 48-character secret token"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isCheckingStatus}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                {isCheckingStatus ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{isUrdu ? 'تلاش جاری ہے...' : 'Checking Inquiry Status...'}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>{isUrdu ? 'اسٹیٹس و تفصیلات دیکھیں' : 'Retrieve Inquiry'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Inquiry Details Display Card */}
          {inquiryDetails && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fade-in">
              
              {/* Header with Status Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      #{inquiryDetails.inquiryNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-emerald-800">
                      {inquiryDetails.category}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      {inquiryDetails.madhhabPreference}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {inquiryDetails.subject}
                  </h3>
                </div>

                <div>
                  {(() => {
                    const badge = getStatusBadge(inquiryDetails.status);
                    return (
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${badge.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{isUrdu ? badge.labelUrdu : badge.labelEn}</span>
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Seeker Question Details */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {isUrdu ? 'آپ کا سوال (Question Submitted)' : 'Question Submitted'}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-medium">
                  {inquiryDetails.questionText}
                </p>
                <div className="pt-2 text-[10px] text-slate-400">
                  {isUrdu ? 'تاریخِ اندراج:' : 'Submitted on:'}{' '}
                  {new Date(inquiryDetails.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Status Specific Explanations & Content */}
              {inquiryDetails.status === 'answered' ? (
                /* Verified Scholarly Answer Section */
                <div className="rounded-3xl bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-white p-6 sm:p-7 border-2 border-emerald-400/80 shadow-md space-y-5">
                  
                  {/* Verified Scholar Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Award className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-black text-emerald-950">
                            {inquiryDetails.scholarName || 'Verified Scholar'}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                            {isUrdu ? 'مستند مفتی' : 'Accredited Mufti'}
                          </span>
                        </div>
                        {inquiryDetails.scholarQualification && (
                          <p className="text-xs font-semibold text-emerald-800">
                            {inquiryDetails.scholarQualification}
                          </p>
                        )}
                      </div>
                    </div>

                    {inquiryDetails.answeredAt && (
                      <span className="text-xs text-emerald-800 font-medium">
                        {isUrdu ? 'تاریخِ توثیق:' : 'Answered on:'}{' '}
                        {new Date(inquiryDetails.answeredAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Scholarly Answer Text */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                      {isUrdu ? 'شرعی فتویٰ و تفصیلی جواب:' : 'Scholarly Rulings & Answer:'}
                    </span>
                    <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed font-normal bg-white/90 p-4 rounded-2xl border border-emerald-200/70 shadow-xs">
                      {inquiryDetails.answerText}
                    </div>
                  </div>

                  {/* Arabic Text & Textual Evidence */}
                  {inquiryDetails.answerArabic && (
                    <div className="space-y-1.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80" dir="rtl">
                      <span className="text-xs font-bold text-amber-900 block font-urdu">
                        الادلة الشرعية والنصوص (عربی عبارات و حوالہ جات):
                      </span>
                      <p className="text-sm sm:text-base font-serif text-slate-900 leading-loose text-right">
                        {inquiryDetails.answerArabic}
                      </p>
                    </div>
                  )}

                  {/* Textual Citations and References */}
                  {(inquiryDetails.reference || inquiryDetails.references) && (
                    <div className="p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <strong>{isUrdu ? 'فقہی حوالہ جات و مراجع:' : 'References & Primary Sources:'}</strong>{' '}
                        <span>{inquiryDetails.reference || inquiryDetails.references}</span>
                      </div>
                    </div>
                  )}

                  {/* Theological Authenticity Stamp */}
                  <div className="p-3 rounded-xl bg-white border border-emerald-300/80 flex items-center justify-between text-[11px] text-emerald-900">
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{isUrdu ? 'ثقہ عالمِ دین کے قلم سے تصدیق شدہ' : 'Verified by Traditional Islamic Scholar'}</span>
                    </span>
                    <span className="text-slate-500 font-semibold">
                      {isUrdu ? 'غیر خودکار شرعی تحقیق' : 'Human Verified • Zero AI Generation'}
                    </span>
                  </div>

                </div>
              ) : inquiryDetails.status === 'rejected' ? (
                /* Rejected / Closed Inquiry Notice */
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span>{isUrdu ? 'استفسار بند کر دیا گیا ہے' : 'Inquiry Closed / Out of Scope'}</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    {inquiryDetails.rejectionReason ||
                      (isUrdu
                        ? 'یہ سوال ہمارے دائرہ کار سے باہر یا پہلے سے طے شدہ ضوابط کے خلاف ہونے کی بنا پر بند کر دیا گیا ہے۔'
                        : 'This inquiry was closed due to scope limitations or guidelines.')}
                  </p>
                </div>
              ) : (
                /* In-Progress Scholarly Workflow Indicator */
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                    <h4 className="text-sm font-bold text-slate-900">
                      {isUrdu ? 'استفسار پر شرعی کام جاری ہے' : 'Scholarly Work in Progress'}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {inquiryDetails.status === 'pending_review'
                      ? isUrdu
                        ? 'آپ کا سوال موصول ہو چکا ہے اور انتظامی جائزے کے بعد موزوں عالمِ دین یا مفتی صاحب کو ارسال کیا جا رہا ہے۔'
                        : 'Your inquiry has been logged securely and is awaiting admin triage before assignment to an offline Islamic scholar.'
                      : inquiryDetails.status === 'sent_to_scholar'
                      ? isUrdu
                        ? 'آپ کا سوال عالمِ دین کو ارسال کر دیا گیا ہے۔ وہ فقہی مراجع اور نصوص کی روشنی میں جواب تیار فرما رہے ہیں۔'
                        : 'Your inquiry is currently in the hands of an offline scholar for textual research and formal drafting.'
                      : isUrdu
                      ? 'عالمِ دین کا جواب موصول ہو چکا ہے اور اشاعت سے قبل آخری تصدیقی مرحلے میں ہے۔ جلد یہاں دستیاب ہو جائے گا۔'
                      : 'The preliminary scholarly response has been transcribed and is undergoing final editorial verification.'}
                  </p>

                  {/* Workflow steps visualization */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className={`p-2.5 rounded-xl border text-[11px] font-bold ${
                      inquiryDetails.status === 'pending_review'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      1. {isUrdu ? 'موصول' : 'Received'}
                    </div>
                    <div className={`p-2.5 rounded-xl border text-[11px] font-bold ${
                      inquiryDetails.status === 'sent_to_scholar'
                        ? 'bg-sky-100 text-sky-900 border-sky-300'
                        : inquiryDetails.status === 'answer_received'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      2. {isUrdu ? 'عالمِ دین کے پاس' : 'With Scholar'}
                    </div>
                    <div className={`p-2.5 rounded-xl border text-[11px] font-bold ${
                      inquiryDetails.status === 'answer_received'
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                      3. {isUrdu ? 'حتمی تصدیق' : 'Final Audit'}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* Information & Theological Guidelines Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            <span>{isUrdu ? 'خدمت کے بنیادی اصول' : 'Four Core Service Pillars'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {isUrdu ? 'اسلام آئی کیو شرعی رہنمائی کی خصوصیات' : 'Why Consult Qualified Scholars on IslamIQ?'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'مکمل رازداری اور ذاتی رسائی' : 'Private & Confidential Access'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'ہر سائل کو منفرد خفیہ ٹوکن ملتا ہے۔ سوال اور جواب عوامی فورم پر ظاہر نہیں کیے جاتے۔'
                : 'Each questioner receives a private access key. Responses remain confidential without public exposure.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'مستند اہل علم اور دار الافتاء' : 'Verified Traditional Scholars'}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isUrdu
                ? 'تمام جوابات معتبر مدارس و دار الافتاء کے فارغ التحصیل مفتیانِ عظام اور علماء تحریر کرتے ہیں۔'
                : 'Inquiries are examined by traditionally accredited scholars and certified Muftis.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

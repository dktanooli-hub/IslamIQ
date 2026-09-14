import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Globe, Send, CheckCircle, MessageSquare, AlertCircle, HelpCircle, Shield, ArrowLeft } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / رائے');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast(isUrdu ? 'براہ کرم تمام خانے پُر کریں۔' : 'Please fill all required fields.');
      return;
    }

    // In client-side mode, construct email link and display clear confirmation
    const mailtoUrl = `mailto:learnislamiq@gmail.com?subject=${encodeURIComponent(`[IslamIQ Contact] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`)}`;
    
    // Open user's mail client or confirm message logged
    try {
      window.open(mailtoUrl, '_blank');
    } catch {
      // Fallback
    }

    setIsSubmitted(true);
    showToast(isUrdu ? 'آپ کا پیغام موصول ہو گیا ہے! شکریہ۔' : 'Thank you! Your message has been prepared.');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Breadcrumb / Back */}
      <button
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition-all w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isUrdu ? 'واپس ہوم اسکرین' : 'Back to Home'}</span>
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-wide">
            <Mail className="w-3.5 h-3.5" />
            <span>Official IslamIQ Contact Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'ہم سے رابطہ کریں (Contact Us)' : 'Contact Us'}
          </h1>
          <p className="text-emerald-100/90 text-sm leading-relaxed max-w-xl">
            {isUrdu
              ? 'ہم آپ کی آراء، تجاویز، تکنیکی مسائل یا قرآنی و علمی تصحیح کے لیے ہمیشہ حاضر ہیں۔ براہ کرم نیچے دیے گئے فارم یا آفیشل ای میل کے ذریعے رابطہ فرمائیں۔'
              : 'We welcome your valuable feedback, feature suggestions, technical issue reports, or Islamic reference corrections.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Mail className="w-4 h-4 text-emerald-300" />
              <span>learnislamiq@gmail.com</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>https://learnislamiq.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Side: Contact Topics */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>{isUrdu ? 'آپ کس بارے میں رابطہ کر سکتے ہیں؟' : 'How We Can Help'}</span>
            </h2>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>{isUrdu ? 'ایپ اور ویب سائٹ فیڈ بیک' : 'Website & App Feedback'}:</strong> {isUrdu ? 'تجربہ اور تجاویز' : 'Share your user experience'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>{isUrdu ? 'تکنیکی مسائل' : 'Technical Problems'}:</strong> {isUrdu ? 'کسی خرابی یا بگ کی اطلاع' : 'Report bugs or display issues'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>{isUrdu ? 'علمی و تفسیری تصحیح' : 'Islamic Source Corrections'}:</strong> {isUrdu ? 'حوالہ جات کی تصحیح یا بہتری' : 'Submit reference or translation notes'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>{isUrdu ? 'نئے فیچرز کی تجاویز' : 'Feature Suggestions'}:</strong> {isUrdu ? 'اسلامی تعلیمات کو بہتر بنانے کے خیالات' : 'Propose educational ideas'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>{isUrdu ? 'عام سوالات' : 'General Enquiries'}:</strong> {isUrdu ? 'پلیٹ فارم سے متعلق عام معلومات' : 'Ask questions about IslamIQ'}</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'رازداری کی ضمانت' : 'Privacy Assured'}</span>
            </div>
            <p className="text-emerald-800 leading-relaxed">
              {isUrdu
                ? 'آپ کا ای میل اور معلومات محفوظ ہیں اور صرف آپ کے سوال کا جواب دینے کے لیے استعمال کی جاتی ہیں۔'
                : 'Your contact details are strictly kept confidential and only used to respond to your inquiry.'}
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {isUrdu ? 'پیغام تیار ہو گیا ہے' : 'Thank you for reaching out!'}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                {isUrdu
                  ? 'آپ کا پیغام ای میل کلائنٹ کے ذریعے learnislamiq@gmail.com پر بھیجنے کے لیے تیار کر دیا گیا ہے۔ ہم جلد از جلد جائزہ لے کر جواب دیں گے۔'
                  : 'Your inquiry has been compiled for learnislamiq@gmail.com. We review all feedback diligently.'}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
              >
                {isUrdu ? 'ایک اور پیغام بھیجیں' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>{isUrdu ? 'آن لائن رابطہ فارم' : 'Send us a Message'}</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'آپ کا نام (Your Name) *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isUrdu ? 'اپنا نام درج کریں...' : 'Enter your name...'}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'ای میل ایڈریس (Email Address) *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'موضوع (Subject) *' : 'Subject *'}
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                >
                  <option value="Website & App Feedback">{isUrdu ? 'ایپ اور ویب سائٹ فیڈ بیک (Feedback)' : 'Website & App Feedback'}</option>
                  <option value="Technical Problems">{isUrdu ? 'تکنیکی خرابی / بگ رپورٹ (Technical Problem)' : 'Technical Problems'}</option>
                  <option value="Content & Reference Corrections">{isUrdu ? 'قرآنی یا حدیث حوالہ تصحیح (Content Correction)' : 'Content & Reference Corrections'}</option>
                  <option value="Feature Suggestions">{isUrdu ? 'نئے فیچر کی تجویز (Feature Suggestion)' : 'Feature Suggestions'}</option>
                  <option value="General Enquiries">{isUrdu ? 'عام معلومات (General Enquiry)' : 'General Enquiries'}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isUrdu ? 'پیغام (Message) *' : 'Message *'}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder={isUrdu ? 'اپنا تفصیلی پیغام یا تجویز یہاں تحریر فرمائیں...' : 'Write your detailed message or feedback here...'}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isUrdu ? 'پیغام ارسال کریں' : 'Send Message'}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                {isUrdu ? 'براہِ راست ای میل کے لیے: learnislamiq@gmail.com' : 'Direct contact: learnislamiq@gmail.com'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

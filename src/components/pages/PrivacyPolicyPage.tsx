import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Eye, Database, Cookie, Smartphone, Users, Globe, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'پرائیویسی پالیسی (Privacy Policy)' : 'Privacy Policy'}
          </h1>
          <p className="text-emerald-200 text-xs font-medium">
            Last Updated: September 2026 • Effective Date: September 2026
          </p>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
            IslamIQ (https://learnislamiq.com) is committed to protecting your privacy and being transparent about our data handling practices.
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{isUrdu ? 'اہم خلاصہ: آف لائن فرسٹ اور مقامی پرائیویسی' : 'Quick Summary: Offline-First & Privacy by Design'}</span>
        </div>
        <p className="text-emerald-800 leading-relaxed">
          {isUrdu
            ? 'اسلام آئی کیو آپ کی کوئز کی پیش رفت، نماز کا ریکارڈ اور تسبیح کاؤنٹر براہِ راست آپ کے اپنے براؤزر یا ڈیوائس کی لوکل اسٹوریج (Local Storage) میں محفوظ کرتا ہے۔ ہم آپ کی ذاتی معلومات یا پاس ورڈز فروخت نہیں کرتے۔'
            : 'IslamIQ stores quiz progress, Salah tracking logs, and Tasbih counts locally on your device via browser Local Storage. We never sell your personal information.'}
        </p>
      </div>

      {/* Detailed Sections */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>1. Account Information & Guest Mode</span>
          </h2>
          <p>
            By default, IslamIQ operates in <strong>Guest Mode</strong>. You can enjoy all features, including Adult and Kids quizzes, Salah Tracking, and Tasbih, completely anonymously without creating an account or providing an email address.
          </p>
          <p>
            If you optionally choose to link a profile name or email for progress synchronization across sessions, this profile information is saved within your local client state and only transmitted if explicit cloud backup services are configured.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>2. Local Device Storage (Local Storage)</span>
          </h2>
          <p>
            IslamIQ uses your web browser’s standard <code>localStorage</code> API to persist:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Quiz Progress & XP:</strong> Unlocked badges, total correct answers, completed quiz attempts, and difficulty settings.</li>
            <li><strong>Salah Tracker Records:</strong> Daily five-prayer checkmarks to help you maintain your prayer habit.</li>
            <li><strong>Tasbih History & Counter:</strong> Active dhikr counts, lap targets, and timestamps of completed dhikr sessions.</li>
            <li><strong>Preferences:</strong> Preferred language (Urdu or English) and selected mode (Adult or Kids).</li>
            <li><strong>Bookmarks:</strong> Islamic Q&amp;As saved for offline revision.</li>
          </ul>
          <p className="text-[11px] text-slate-500">
            You can clear all this data at any time by clearing your browser cache/cookies or clicking "Reset All Progress" inside your Profile settings.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>3. Contact Form Information</span>
          </h2>
          <p>
            When you contact us through our Contact Us page or email us directly at <strong>learnislamiq@gmail.com</strong>, we collect your name, email address, inquiry topic, and message content. This information is used strictly to respond to your inquiry, correct reported Islamic references, or troubleshoot technical problems. We never use your contact inquiries for marketing spam or third-party sharing.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>4. Device &amp; Browser Information</span>
          </h2>
          <p>
            Like virtually all modern web applications, when you visit https://learnislamiq.com, our web hosting servers may automatically receive basic technical data such as your IP address, browser type, operating system, and timestamp of access to ensure server security, prevent malicious attacks, and maintain uptime.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cookie className="w-4 h-4 text-emerald-700" />
            <span>5. Cookies &amp; Advertising (Google AdSense &amp; Google AdMob)</span>
          </h2>
          <p>
            <strong>Website Advertising (Google AdSense):</strong> When Google AdSense is enabled on https://learnislamiq.com, Google and its advertising partners use cookies (such as the DoubleClick cookie) to serve relevant advertisements to users based on prior visits to this website or other websites on the Internet.
          </p>
          <p>
            <strong>Mobile Application (Google AdMob):</strong> If you use IslamIQ via our mobile app, Google AdMob may use device advertising identifiers (such as Google Advertising ID) to serve non-intrusive advertisements.
          </p>
          <p className="text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
            <strong>Your Choices:</strong> You can opt out of personalized advertising by visiting Google's Ads Settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">adssettings.google.com</a> or via <a href="https://aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">aboutads.info</a>.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>6. Kids Mode &amp; Children’s Privacy</span>
          </h2>
          <p>
            IslamIQ features a dedicated <strong>Kids Mode</strong> designed specifically for younger learners with age-appropriate questions, child-friendly themes, and motivational rewards.
          </p>
          <p>
            We take children’s privacy very seriously. In Kids Mode:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>We do not collect personal identifying information (PII) from children.</li>
            <li>All quiz scores and badges are saved strictly on the local device via local storage.</li>
            <li>No public social profiles or chat rooms exist for children.</li>
            <li>We comply with the principles of COPPA (Children’s Online Privacy Protection Act) and international child safety standards.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>7. Data Security &amp; Admin Protection</span>
          </h2>
          <p>
            We implement high-grade technical safeguards to protect system integrity:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>HTTPS encryption across the entire platform.</li>
            <li>Server-side PBKDF2 cryptographic hashing (100,000 iterations with 16-byte random salts) for admin portal authentication.</li>
            <li>No admin credentials or private passwords are ever exposed in public client scripts or HTML.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>8. Data Retention &amp; User Control</span>
          </h2>
          <p>
            Because user learning records are saved locally in your browser's storage, you maintain 100% control over your data. You can delete your progress at any time directly in the app or by clearing your browser site data.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-700" />
            <span>9. Policy Updates</span>
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect improvements to IslamIQ, new features, or regulatory requirements. Any updates will be published on this page with a revised effective date.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>10. Contact Us About Privacy</span>
          </h2>
          <p>
            If you have questions, feedback, or requests regarding this Privacy Policy or your data, please contact our team:
          </p>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
            <p><strong>Brand:</strong> IslamIQ — Learn • Quiz • Grow</p>
            <p><strong>Website:</strong> <a href="https://learnislamiq.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">https://learnislamiq.com</a></p>
            <p><strong>Email:</strong> <a href="mailto:learnislamiq@gmail.com" className="text-emerald-700 underline">learnislamiq@gmail.com</a></p>
          </div>
        </section>

      </div>
    </div>
  );
};

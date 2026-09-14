import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, ShieldAlert, CheckCircle2, AlertTriangle, Scale, Lock, Globe, Mail, ArrowLeft, HelpCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
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
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
            {isUrdu ? 'شرائط و ضوابط (Terms & Conditions)' : 'Terms & Conditions'}
          </h1>
          <p className="text-emerald-200 text-xs font-medium">
            Last Updated: September 2026 • Platform: https://learnislamiq.com
          </p>
          <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
            Please read these Terms and Conditions carefully before using the IslamIQ website or mobile application.
          </p>
        </div>
      </div>

      {/* Crucial Scholar Notice Card */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Educational Purpose &amp; Scholarly Consultation Notice</span>
        </div>
        <p className="text-amber-800 leading-relaxed font-serif text-xs sm:text-sm">
          <strong>IslamIQ is an educational platform and is not a Mufti or a replacement for personalized advice from a qualified Islamic scholar.</strong> All materials, quizzes, and Islamic Q&amp;As are intended strictly for general learning and informational purposes. For complex personal legal rulings (Fatwas), please consult a trusted scholar.
        </p>
      </div>

      {/* Terms Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>1. Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or using IslamIQ (available at <a href="https://learnislamiq.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">https://learnislamiq.com</a> or via our mobile apps), you confirm that you have read, understood, and agreed to be bound by these Terms &amp; Conditions and our Privacy Policy. If you do not agree, please discontinue using the service.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>2. Educational Purpose &amp; Content Reliability</span>
          </h2>
          <p>
            IslamIQ provides interactive Islamic quizzes, daily Quran verses, verified Sahih hadiths, authentic duas, and religious utilities (such as a Salah Tracker, Tasbih Counter, and Qibla Finder).
          </p>
          <p>
            We make every reasonable effort to ensure content is authentic, cited properly, and aligned with orthodox Islamic scholarship. However, IslamIQ makes no warranties of complete infallibility. Users are encouraged to verify references with qualified teachers and original texts.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>3. Guest Mode, User Accounts &amp; Data Responsibility</span>
          </h2>
          <p>
            You may use IslamIQ freely in Guest Mode. Because your scores, Salah history, and Tasbih logs are stored locally on your device via browser local storage, you are responsible for maintaining your device's backup. Clearing your browser data or cache will erase local learning progress.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            <span>4. Prohibited Activities</span>
          </h2>
          <p>
            When utilizing IslamIQ, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Attempt to breach or bypass the administrative portal security or authentication systems.</li>
            <li>Submit abusive, defamatory, or unlawful content through the Contact Us form.</li>
            <li>Scrape, reverse engineer, or exploit the platform's proprietary codebase for malicious intent.</li>
            <li>Misrepresent the educational materials as formal binding Fatwas.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>5. Intellectual Property</span>
          </h2>
          <p>
            The Quran and Hadith texts themselves belong to the Islamic heritage. However, the custom design, interface layout, source code, logos, badge graphics, and software compilations of IslamIQ are protected by intellectual property laws.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-700" />
            <span>6. Third-Party Services &amp; Advertisements</span>
          </h2>
          <p>
            IslamIQ may display advertising served by Google AdSense (on web) or Google AdMob (in mobile apps). These third-party services are subject to their respective terms and privacy policies. IslamIQ does not endorse the specific external goods or services promoted by third-party advertisers.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-emerald-700" />
            <span>7. Limitation of Liability</span>
          </h2>
          <p>
            To the maximum extent permitted by applicable law, IslamIQ, its founders, and contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the platform, prayer time calculations, or interpretation of Islamic educational materials.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>8. Changes to Service and Terms</span>
          </h2>
          <p>
            We reserve the right to modify, suspend, or improve features of IslamIQ at any time without prior notice. Continuing to use the platform after revised terms are posted constitutes your acceptance of the updated conditions.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>9. Contact Information</span>
          </h2>
          <p>
            For questions or legal inquiries regarding these Terms &amp; Conditions, please reach out to us:
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

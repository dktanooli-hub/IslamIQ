import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { Globe, Mail, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { activeTab, setActiveTab, contentLang, userMode } = useApp();
  const isUrdu = contentLang === 'urdu';
  const isKids = userMode === 'kids';

  const hubLinks: { id: AppTab; label: string; labelUrdu: string }[] = [
    { id: 'islamic-quiz', label: 'Islamic Quiz', labelUrdu: 'اسلامی کوئز' },
    { id: 'kids-islamic-quiz', label: 'Kids Islamic Quiz', labelUrdu: 'بچوں کے سوالات' },
    { id: 'islamic-questions-answers', label: 'Islamic Q&A', labelUrdu: 'اسلامی سوال جواب' },
    { id: 'daily-quran-verse', label: 'Daily Quran Verse', labelUrdu: 'روزانہ کی قرآنی آیت' },
    { id: 'daily-hadith', label: 'Daily Hadith', labelUrdu: 'روزانہ کی حدیث' },
    { id: 'daily-dua', label: 'Daily Dua', labelUrdu: 'روزانہ کی دعا' },
    { id: 'salah-learning', label: 'Salah Learning', labelUrdu: 'نماز سیکھیں' },
    { id: 'how-to-perform-salah', label: 'How to Pray (Salah)', labelUrdu: 'نماز کا طریقہ' },
    { id: 'how-to-perform-wudu', label: 'How to do Wudu', labelUrdu: 'وضو کا طریقہ' },
    { id: '5-pillars-of-islam', label: '5 Pillars of Islam', labelUrdu: '۵ ارکانِ اسلام' },
    { id: 'six-articles-of-faith', label: '6 Articles of Faith', labelUrdu: '۶ ارکانِ ایمان' },
    { id: 'salah-for-beginners', label: 'Salah for Beginners', labelUrdu: 'ابتدائی نماز' },
    { id: 'islamic-manners-for-kids', label: 'Manners for Kids', labelUrdu: 'بچوں کے آداب' },
    { id: 'islamic-general-knowledge', label: 'General Knowledge', labelUrdu: 'اسلامی معلومات' },
  ];

  const navLinks: { id: AppTab; label: string; labelUrdu: string }[] = [
    { id: 'about', label: 'About Us', labelUrdu: 'ہمارے متعلق' },
    { id: 'contact', label: 'Contact Us', labelUrdu: 'رابطہ کریں' },
    { id: 'privacy-policy', label: 'Privacy Policy', labelUrdu: 'پرائیویسی پالیسی' },
    { id: 'terms', label: 'Terms & Conditions', labelUrdu: 'شرائط و ضوابط' },
    { id: 'disclaimer', label: 'Disclaimer', labelUrdu: 'وضاحتی بیان' },
  ];

  return (
    <footer className={`mt-auto border-t transition-colors ${
      isKids
        ? 'bg-amber-100/70 border-amber-200/80 text-amber-950'
        : 'bg-white border-slate-200 text-slate-700'
    } pb-20 sm:pb-8 pt-8 px-4`}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top brand row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-serif font-black text-lg shadow-md shadow-emerald-600/20">
              IQ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-base text-slate-900 tracking-tight">
                  IslamIQ
                </span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Learn • Quiz • Grow
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'بچوں اور بڑوں کے لیے مستند اسلامی سیکھنے کا پلیٹ فارم' : 'Authentic Islamic Learning for Kids & Adults'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://learnislamiq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>https://learnislamiq.com</span>
            </a>
            <a
              href="mailto:learnislamiq@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>learnislamiq@gmail.com</span>
            </a>
          </div>
        </div>

        {/* SEO Content Hub Links */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-center uppercase tracking-wider text-emerald-800">
            {isUrdu ? 'اسلامی سیکھنے کے رہنما عنوانات (Islamic Learning Hub)' : 'Islamic Learning Guides'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-semibold">
            {hubLinks.map((link) => {
              const isSelected = activeTab === link.id;
              return (
                <a
                  key={link.id}
                  href={`/${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`py-1 px-2.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-100'
                  }`}
                >
                  {isUrdu ? link.labelUrdu : link.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Legal & Information Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium border-t border-slate-200/50 pt-3">
          {navLinks.map((link) => {
            const isSelected = activeTab === link.id;
            return (
              <a
                key={link.id}
                href={`/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-0.5 px-2 rounded-md transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {isUrdu ? link.labelUrdu : link.label}
              </a>
            );
          })}
        </div>

        {/* Bottom copyright notice */}
        <div className="text-center space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <p className="font-medium text-slate-700">
            © 2026 IslamIQ — Learn • Quiz • Grow
          </p>
          <p className="text-[11px] text-slate-400">
            Official Portal: <a href="https://learnislamiq.com" className="hover:underline text-emerald-700">https://learnislamiq.com</a> • Contact: <a href="mailto:learnislamiq@gmail.com" className="hover:underline text-emerald-700">learnislamiq@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import { Globe, Mail, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { activeTab, setActiveTab, contentLang, userMode } = useApp();
  const isUrdu = contentLang === 'urdu';
  const isKids = userMode === 'kids';

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

        {/* Legal & Information Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold">
          {navLinks.map((link) => {
            const isSelected = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
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
              </button>
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

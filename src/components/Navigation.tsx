import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, HelpCircle, CheckSquare, Sparkles, Search, Share2, Compass } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, userMode, contentLang } = useApp();
  const isKids = userMode === 'kids';
  const isUrdu = contentLang === 'urdu';

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      labelUrdu: 'ہوم',
      icon: Home,
    },
    {
      id: 'quiz' as const,
      label: isKids ? 'Kids Quiz' : 'Quiz',
      labelUrdu: 'کوئز',
      icon: HelpCircle,
    },
    {
      id: 'salah' as const,
      label: 'Salah',
      labelUrdu: 'نماز',
      icon: CheckSquare,
    },
    ...(!isKids ? [{
      id: 'qibla' as const,
      label: 'Qibla',
      labelUrdu: 'قبلہ',
      icon: Compass,
    }] : []),
    {
      id: 'tasbih' as const,
      label: 'Tasbih',
      labelUrdu: 'تسبیح',
      icon: Sparkles,
    },
    {
      id: 'search' as const,
      label: 'Q&A',
      labelUrdu: 'معلومات',
      icon: Search,
    },
    {
      id: 'status' as const,
      label: 'Status',
      labelUrdu: 'کارڈ',
      icon: Share2,
    },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors ${
      isKids
        ? 'bg-amber-50/95 border-amber-200 text-teal-900 shadow-lg'
        : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
    }`}>
      <div className="max-w-2xl mx-auto px-1 sm:px-2 py-1 flex items-center justify-around pb-[calc(env(safe-area-inset-bottom,0px)+6px)]">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const IconComp = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-1 sm:px-1.5 rounded-2xl transition-all active:scale-90 min-w-[42px] sm:min-w-[48px] ${
                isActive
                  ? isKids
                    ? 'text-teal-700 font-extrabold'
                    : 'text-emerald-800 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className={`p-1 sm:p-1.5 rounded-xl transition-all ${
                isActive
                  ? isKids
                    ? 'bg-amber-200 shadow-xs scale-105'
                    : 'bg-emerald-100/70 shadow-xs scale-105'
                  : ''
              }`}>
                <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 ${isUrdu ? 'font-urdu font-semibold' : ''}`}>
                {isUrdu ? item.labelUrdu : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

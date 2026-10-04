import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, HelpCircle, CheckSquare, Search, LayoutGrid } from 'lucide-react';
import { AppTab } from '../types';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, userMode, contentLang, isMoreOpen, setIsMoreOpen } = useApp();
  const isKids = userMode === 'kids';
  const isUrdu = contentLang === 'urdu';

  const isSalahActive =
    activeTab === 'salah' ||
    activeTab === 'kids-namaz' ||
    activeTab === 'salah-learning' ||
    activeTab === 'how-to-perform-salah' ||
    activeTab === 'salah-for-beginners';

  const isQuizActive =
    activeTab === 'quiz' ||
    activeTab === 'islamic-quiz' ||
    activeTab === 'kids-islamic-quiz';

  const isSearchActive = activeTab === 'search';
  const isHomeActive = activeTab === 'home';

  const navItems = [
    {
      id: 'home' as AppTab,
      path: '/',
      label: 'Home',
      labelUrdu: 'ہوم',
      icon: Home,
      isActive: isHomeActive && !isMoreOpen,
    },
    {
      id: 'quiz' as AppTab,
      path: '/quiz',
      label: isKids ? 'Kids Quiz' : 'Quiz',
      labelUrdu: 'کوئز',
      icon: HelpCircle,
      isActive: isQuizActive && !isMoreOpen,
    },
    {
      id: 'search' as AppTab,
      path: '/search',
      label: 'Search',
      labelUrdu: 'تلاش',
      icon: Search,
      isActive: isSearchActive && !isMoreOpen,
    },
    {
      id: (isKids ? 'kids-namaz' : 'salah') as AppTab,
      path: '/salah',
      label: isKids ? 'Namaz' : 'Salah',
      labelUrdu: isKids ? 'نماز' : 'نماز',
      icon: CheckSquare,
      isActive: isSalahActive && !isMoreOpen,
    },
  ];

  return (
    <nav
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors ${
        isKids
          ? 'bg-amber-50/95 border-amber-200 text-teal-900 shadow-lg'
          : 'bg-white/95 border-slate-200 text-slate-700 shadow-lg'
      }`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto px-2 py-1 flex items-center justify-around pb-[calc(env(safe-area-inset-bottom,0px)+6px)]">
        {navItems.map((item) => {
          const IconComp = item.icon;
          return (
            <a
              key={item.id}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
                if (isMoreOpen) setIsMoreOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all active:scale-95 min-w-[56px] min-h-[48px] ${
                item.isActive
                  ? isKids
                    ? 'text-teal-700 font-extrabold'
                    : 'text-emerald-800 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  item.isActive
                    ? isKids
                      ? 'bg-amber-200 shadow-xs scale-105'
                      : 'bg-emerald-100/80 shadow-xs scale-105 text-emerald-900'
                    : ''
                }`}
              >
                <IconComp className={`w-5 h-5 ${item.isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${isUrdu ? 'font-urdu font-semibold' : ''}`}>
                {isUrdu ? item.labelUrdu : item.label}
              </span>
            </a>
          );
        })}

        {/* 5th Item: More Button */}
        <button
          onClick={() => setIsMoreOpen(!isMoreOpen)}
          aria-expanded={isMoreOpen}
          aria-label="Open Directory of Guides and Tools"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all active:scale-95 min-w-[56px] min-h-[48px] ${
            isMoreOpen
              ? isKids
                ? 'text-teal-900 font-extrabold'
                : 'text-emerald-900 font-extrabold'
              : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              isMoreOpen
                ? isKids
                  ? 'bg-amber-300 shadow-xs scale-105 text-teal-950'
                  : 'bg-emerald-700 text-white shadow-xs scale-105'
                : ''
            }`}
          >
            <LayoutGrid className={`w-5 h-5 ${isMoreOpen ? 'stroke-[2.5]' : 'stroke-2'}`} />
          </div>
          <span className={`text-[10px] tracking-tight mt-0.5 ${isUrdu ? 'font-urdu font-semibold' : ''}`}>
            {isUrdu ? 'مزید' : 'More'}
          </span>
        </button>
      </div>
    </nav>
  );
};

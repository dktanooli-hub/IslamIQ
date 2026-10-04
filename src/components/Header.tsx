import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Star,
  User,
  Baby,
  Moon,
  Globe,
  ShieldCheck,
  Home,
  HelpCircle,
  Search,
  CheckSquare,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenAdmin }) => {
  const {
    userMode,
    setUserMode,
    contentLang,
    setContentLang,
    userStats,
    isAdminAuthenticated,
    activeTab,
    setActiveTab,
    isMoreOpen,
    setIsMoreOpen
  } = useApp();

  const isKids = userMode === 'kids';
  const isUrdu = contentLang === 'urdu';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-md ${
      isKids
        ? 'bg-amber-50/95 border-amber-200 text-teal-900 shadow-xs'
        : 'bg-[#064e3b]/95 border-emerald-800 text-white shadow-md'
    }`}>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        
        {/* Brand & Tagline - Crawlable Link to Home */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-2.5 sm:space-x-3 shrink-0 group focus:outline-none"
          title="IslamIQ Home"
        >
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm transition-transform group-hover:scale-105 active:scale-95 ${
            isKids
              ? 'bg-gradient-to-tr from-amber-400 to-teal-400 text-white rotate-3'
              : 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-goldAccent border border-goldAccent/30'
          }`}>
            <span>IQ</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className={`text-lg sm:text-xl font-extrabold tracking-tight ${isKids ? 'text-teal-800 font-sans' : 'text-white'}`}>
                Islam<span className={isKids ? 'text-amber-600' : 'text-goldAccent'}>IQ</span>
              </span>
              {isKids && (
                <span className="bg-amber-200 text-amber-900 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Baby className="w-3 h-3" /> Kids
                </span>
              )}
            </div>
            <p className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${isKids ? 'text-teal-600' : 'text-emerald-200/80'}`}>
              Learn • Quiz • Grow
            </p>
          </div>
        </a>

        {/* Clean Primary Navigation for Desktop (Home, Quiz, Search, Salah, More ▾) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Primary Navigation">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? isKids
                  ? 'bg-amber-300 text-teal-950 shadow-xs'
                  : 'bg-emerald-950/80 text-goldAccent border border-goldAccent/40 shadow-xs'
                : isKids
                  ? 'text-teal-800 hover:bg-amber-100/70'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'ہوم' : 'Home'}</span>
          </a>

          <a
            href="/quiz"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz' || activeTab === 'islamic-quiz' || activeTab === 'kids-islamic-quiz'
                ? isKids
                  ? 'bg-amber-300 text-teal-950 shadow-xs'
                  : 'bg-emerald-950/80 text-goldAccent border border-goldAccent/40 shadow-xs'
                : isKids
                  ? 'text-teal-800 hover:bg-amber-100/70'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isKids ? (isUrdu ? 'کوئز' : 'Kids Quiz') : (isUrdu ? 'کوئز' : 'Quiz')}</span>
          </a>

          <a
            href="/search"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'search'
                ? isKids
                  ? 'bg-amber-300 text-teal-950 shadow-xs'
                  : 'bg-emerald-950/80 text-goldAccent border border-goldAccent/40 shadow-xs'
                : isKids
                  ? 'text-teal-800 hover:bg-amber-100/70'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تلاش' : 'Search'}</span>
          </a>

          <a
            href="/salah"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(isKids ? 'kids-namaz' : 'salah');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'salah' || activeTab === 'kids-namaz' || activeTab === 'salah-learning' || activeTab === 'how-to-perform-salah' || activeTab === 'salah-for-beginners'
                ? isKids
                  ? 'bg-amber-300 text-teal-950 shadow-xs'
                  : 'bg-emerald-950/80 text-goldAccent border border-goldAccent/40 shadow-xs'
                : isKids
                  ? 'text-teal-800 hover:bg-amber-100/70'
                  : 'text-emerald-100 hover:text-white hover:bg-emerald-800/60'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{isKids ? (isUrdu ? 'نماز' : 'Namaz') : (isUrdu ? 'نماز' : 'Salah')}</span>
          </a>

          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isMoreOpen
                ? isKids
                  ? 'bg-amber-400 text-teal-950 border-amber-500 shadow-sm'
                  : 'bg-emerald-950 text-goldAccent border-goldAccent/50 shadow-sm'
                : isKids
                  ? 'bg-amber-100/70 text-teal-900 border-amber-300 hover:bg-amber-200/80'
                  : 'bg-emerald-900/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800 hover:text-white'
            }`}
            title="Open Directory of Guides, Tools & Topics (مزید عنوانات)"
            aria-expanded={isMoreOpen}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-goldAccent" />
            <span>{isUrdu ? 'مزید' : 'More'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
          </button>
        </nav>

        {/* Action Controls: Mode Switch, Lang Toggle, Streak, Admin & Profile */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
          
          {/* Kids / Adult Mode Switcher */}
          <button
            onClick={() => setUserMode(isKids ? 'adult' : 'kids')}
            className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 border ${
              isKids
                ? 'bg-teal-600 text-white border-teal-700 shadow-sm hover:bg-teal-700'
                : 'bg-emerald-900/80 text-emerald-100 border-emerald-700 hover:bg-emerald-800 hover:text-white'
            }`}
            title={isKids ? "Switch to Adult Mode" : "Switch to Kids Mode"}
          >
            {isKids ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Switch to Adult</span>
                <span className="sm:hidden">Adult</span>
              </>
            ) : (
              <>
                <Baby className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Kids Mode</span>
                <span className="sm:hidden">Kids</span>
              </>
            )}
          </button>

          {/* Language Selector: Urdu / English */}
          <button
            onClick={() => setContentLang(contentLang === 'urdu' ? 'english' : 'urdu')}
            className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
              isKids
                ? 'bg-white text-teal-800 border-amber-300 hover:bg-amber-100'
                : 'bg-emerald-950/60 text-goldAccent border-emerald-700 hover:bg-emerald-900'
            }`}
            title="Switch Islamic Content Language (Urdu / English)"
          >
            <Globe className="w-3.5 h-3.5 opacity-80" />
            <span>{contentLang === 'urdu' ? 'اردو' : 'English'}</span>
          </button>

          {/* Admin Panel Quick Access Button - Strictly restricted to authenticated owner in adult mode */}
          {onOpenAdmin && !isKids && isAdminAuthenticated && (
            <button
              onClick={onOpenAdmin}
              className="p-1.5 rounded-xl text-xs font-bold flex items-center border transition-all active:scale-95 bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300/40 shadow-sm"
              title="Secure Admin Portal (ایڈمن پورٹل)"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          {/* Streak Counter - Hidden on small mobile screens */}
          <div className={`hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
            isKids
              ? 'bg-orange-100 text-orange-800 border-orange-200'
              : 'bg-emerald-950/70 text-orange-300 border-emerald-700/80'
          }`}>
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>{userStats.streakDays}d</span>
          </div>

          {/* XP Badge & Profile */}
          <button
            onClick={onOpenProfile}
            className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all active:scale-95 ${
              isKids
                ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-500/50 shadow'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{userStats.xp} XP</span>
            <div className="w-px h-3 bg-current opacity-30" />
            <User className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </header>
  );
};

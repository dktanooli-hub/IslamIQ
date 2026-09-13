import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Star, Sparkles, User, Baby, Moon, Globe, ShieldCheck, Compass } from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile, onOpenAdmin }) => {
  const { userMode, setUserMode, contentLang, setContentLang, userStats, isAdminAuthenticated, activeTab, setActiveTab } = useApp();

  const isKids = userMode === 'kids';

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-300 border-b backdrop-blur-md ${
      isKids
        ? 'bg-amber-50/90 border-amber-200 text-teal-900'
        : 'bg-[#064e3b]/95 border-emerald-800 text-white shadow-md'
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xl shadow-sm transition-transform active:scale-95 ${
            isKids
              ? 'bg-gradient-to-tr from-amber-400 to-teal-400 text-white rotate-3'
              : 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-goldAccent border border-goldAccent/30'
          }`}>
            <span>IQ</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-xl font-extrabold tracking-tight ${isKids ? 'text-teal-800 font-sans' : 'text-white'}`}>
                Islam<span className={isKids ? 'text-amber-600' : 'text-goldAccent'}>IQ</span>
              </span>
              {isKids && (
                <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Baby className="w-3 h-3" /> Kids Mode
                </span>
              )}
            </div>
            <p className={`text-[11px] font-medium tracking-wide ${isKids ? 'text-teal-600' : 'text-emerald-200/80'}`}>
              Learn • Quiz • Grow
            </p>
          </div>
        </div>

        {/* Action Controls: Mode Switch, Lang Toggle, Admin & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Kids / Adult Mode Switcher */}
          <button
            onClick={() => setUserMode(isKids ? 'adult' : 'kids')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 border ${
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
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
              isKids
                ? 'bg-white text-teal-800 border-amber-300 hover:bg-amber-100'
                : 'bg-emerald-950/60 text-goldAccent border-emerald-700 hover:bg-emerald-900'
            }`}
            title="Switch Islamic Content Language (Urdu / English)"
          >
            <Globe className="w-3.5 h-3.5 opacity-80" />
            <span>{contentLang === 'urdu' ? 'اردو' : 'English'}</span>
          </button>

          {/* Quick Qibla Compass Button in Adult Mode */}
          {!isKids && (
            <button
              onClick={() => setActiveTab('qibla')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
                activeTab === 'qibla'
                  ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-sm font-black'
                  : 'bg-emerald-950/60 text-emerald-100 border-emerald-700 hover:bg-emerald-900 hover:text-white'
              }`}
              title={contentLang === 'urdu' ? 'قبلہ رخ کمپاس' : 'Qibla Compass'}
            >
              <Compass className={`w-3.5 h-3.5 ${activeTab === 'qibla' ? 'animate-spin' : 'text-goldAccent'}`} />
              <span className="hidden sm:inline">{contentLang === 'urdu' ? 'قبلہ' : 'Qibla'}</span>
            </button>
          )}

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

          {/* Streak Counter */}
          <div className={`hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
            isKids
              ? 'bg-orange-100 text-orange-800 border-orange-200'
              : 'bg-emerald-950/70 text-orange-300 border-emerald-700/80'
          }`}>
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>{userStats.streakDays}d Streak</span>
          </div>

          {/* XP Badge & Profile */}
          <button
            onClick={onOpenProfile}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all active:scale-95 ${
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

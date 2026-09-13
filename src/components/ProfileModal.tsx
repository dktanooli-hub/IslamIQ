import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trophy, Flame, Star, Sparkles, User, ShieldCheck, Download, Upload, LogOut, CheckCircle2, Lock, Smile, Compass, Globe } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const {
    userMode,
    setUserMode,
    contentLang,
    setContentLang,
    userStats,
    adultProgress,
    kidsProgress,
    badges,
    linkAccount,
    logoutToGuest,
    exportData,
    importData,
    showToast,
    isAdminAuthenticated
  } = useApp();

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showSyncForm, setShowSyncForm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  if (!isOpen) return null;

  const handleSyncSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) {
      showToast('Please enter name and email');
      return;
    }
    linkAccount(nameInput.trim(), emailInput.trim());
    setShowSyncForm(false);
  };

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IslamIQ-Backup-${Date.now()}.json`;
    a.click();
    showToast('Data exported successfully! 📁');
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const success = importData(importJsonText);
    if (success) {
      setShowImportBox(false);
      setImportJsonText('');
    }
  };

  // Calculate Level based on active mode XP
  const level = Math.floor(userStats.xp / 100) + 1;
  const currentLevelXP = userStats.xp % 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center space-x-2.5">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              userMode === 'kids' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {userMode === 'kids' ? <Smile className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {userStats.userName}
              </h2>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500">
                <span className={`inline-block w-2 h-2 rounded-full ${userStats.isGuest ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                <span>{userStats.isGuest ? 'Guest Mode (Local Storage)' : 'Account Synced'}</span>
                <span>•</span>
                <span className="font-semibold text-emerald-700 capitalize">{userMode} Mode</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">

          {/* MODE & LANGUAGE SETTINGS CARD */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                App Mode Switch (موڈ منتخب کریں)
              </span>
              <span className="text-[11px] text-slate-400">Separate progress saved</span>
            </div>

            {/* Kids / Adults Switch Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserMode('adult')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  userMode === 'adult'
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-500/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  userMode === 'adult' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
                }`}>
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold">Adult Mode</div>
                  <div className={`text-[10px] ${userMode === 'adult' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    بڑوں کا موڈ • In-depth
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserMode('kids')}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  userMode === 'kids'
                    ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm ring-2 ring-amber-400/40'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  userMode === 'kids' ? 'bg-amber-300 text-amber-950' : 'bg-amber-50 text-amber-700'
                }`}>
                  <Smile className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold">Kids Mode 🎈</div>
                  <div className={`text-[10px] ${userMode === 'kids' ? 'text-amber-900' : 'text-slate-400'}`}>
                    بچوں کا موڈ • Audio + Hints
                  </div>
                </div>
              </button>
            </div>

            {/* Language Selection: Urdu by default, changes Islamic content only */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Islamic Content Language</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Questions, options & explanations (UI stays in English)
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setContentLang('urdu')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    contentLang === 'urdu'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  اردو (Default)
                </button>
                <button
                  onClick={() => setContentLang('english')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    contentLang === 'english'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
          
          {/* Level & XP Progress Card */}
          <div className={`rounded-3xl p-5 text-white shadow-md relative overflow-hidden ${
            userMode === 'kids'
              ? 'bg-gradient-to-r from-teal-700 to-teal-900'
              : 'bg-gradient-to-r from-emerald-800 to-emerald-950'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Level {level} Seeker</span>
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full text-goldAccent">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{userStats.xp} Total XP</span>
              </div>
            </div>

            <div className="space-y-1.5 mt-3">
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-goldAccent h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentLevelXP}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-emerald-200">
                <span>{currentLevelXP} / 100 XP to Level {level + 1}</span>
                <span>{100 - currentLevelXP} XP needed</span>
              </div>
            </div>

            {/* Quick Stat Counters */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
              <div>
                <div className="text-lg font-black text-amber-300">{userStats.streakDays}d</div>
                <div className="text-[10px] text-emerald-200">Daily Streak</div>
              </div>
              <div>
                <div className="text-lg font-black text-emerald-100">{userStats.quizzesCompleted}</div>
                <div className="text-[10px] text-emerald-200">Quizzes Played</div>
              </div>
              <div>
                <div className="text-lg font-black text-goldAccent">{userStats.tasbihTotalLifetime}</div>
                <div className="text-[10px] text-emerald-200">Total Dhikr</div>
              </div>
            </div>
          </div>

          {/* Mode Progress Comparison Snapshot */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Mode Progress Isolation
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="font-bold text-emerald-800">Adult Records</div>
                <div className="text-slate-600 mt-1 space-y-0.5 text-[11px]">
                  <div>XP: <span className="font-semibold text-slate-800">{adultProgress.xp}</span></div>
                  <div>Quizzes: <span className="font-semibold text-slate-800">{adultProgress.quizzesCompleted}</span></div>
                  <div>Dhikr: <span className="font-semibold text-slate-800">{adultProgress.tasbihTotalLifetime}</span></div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="font-bold text-amber-900">Kids Records 🎈</div>
                <div className="text-slate-600 mt-1 space-y-0.5 text-[11px]">
                  <div>XP: <span className="font-semibold text-slate-800">{kidsProgress.xp}</span></div>
                  <div>Quizzes: <span className="font-semibold text-slate-800">{kidsProgress.quizzesCompleted}</span></div>
                  <div>Dhikr: <span className="font-semibold text-slate-800">{kidsProgress.tasbihTotalLifetime}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Sync / Guest Options */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  {userStats.isGuest ? 'Sync Progress with Account' : 'Account Connected'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {userStats.isGuest
                    ? 'Optional: Connect an account to backup and sync your streak & badges.'
                    : `Linked as ${userStats.email}`}
                </p>
              </div>

              {userStats.isGuest ? (
                <button
                  onClick={() => setShowSyncForm(!showSyncForm)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-xs"
                >
                  {showSyncForm ? 'Hide' : 'Connect'}
                </button>
              ) : (
                <button
                  onClick={logoutToGuest}
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                  title="Disconnect and switch back to Guest"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sync Form */}
            {showSyncForm && userStats.isGuest && (
              <form onSubmit={handleSyncSubmit} className="pt-3 border-t border-slate-200 space-y-2.5">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Abdullah)"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <input
                  type="email"
                  placeholder="Your Email (e.g. user@example.com)"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 shadow-sm"
                >
                  Save & Sync Account
                </button>
              </form>
            )}
          </div>

          {/* Badges & Achievements Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Badges & Achievements ({badges.filter(b => b.unlocked).length}/{badges.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {badges.map(b => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border flex items-start space-x-3 transition-all ${
                    b.unlocked
                      ? 'bg-amber-50/60 border-amber-200/80 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked ? 'bg-amber-400 text-amber-950 font-bold shadow-xs' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {b.unlocked ? <Sparkles className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900">{b.title}</span>
                      <span className="text-[10px] text-slate-500">({b.titleUrdu})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Backup & Restore */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={handleExport}
              className="flex-1 py-2.5 px-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export Backup (JSON)</span>
            </button>
            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="flex-1 py-2.5 px-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-amber-600" />
              <span>Restore Backup</span>
            </button>
          </div>

          {showImportBox && (
            <form onSubmit={handleImportSubmit} className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <textarea
                rows={3}
                value={importJsonText}
                onChange={e => setImportJsonText(e.target.value)}
                placeholder="Paste backup JSON data here..."
                className="w-full p-2 text-xs border rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
              >
                Import Data
              </button>
            </form>
          )}

          {/* Secure Admin Portal Entry (Strictly Adult Mode only, completely hidden in Kids Mode) */}
          {onOpenAdmin && userMode !== 'kids' && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-between transition-all active:scale-98 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Control Portal (ایڈمن پورٹل)</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                  {isAdminAuthenticated ? 'Unlocked 🔓' : 'Protected 🔒'}
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

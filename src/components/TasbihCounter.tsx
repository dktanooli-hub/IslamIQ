import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DHIKR_LIST } from '../data/verifiedContent';
import { RotateCcw, Volume2, Sparkles, ChevronDown, Check, Trophy, Heart, History, PlusCircle, Trash2, Calendar, Clock, Edit3 } from 'lucide-react';
import { DhikrType } from '../types';
import { AdBanner } from './AdBanner';
import { AD_CONFIG } from '../config/adConfig';

export const TasbihCounter: React.FC = () => {
  const {
    tasbihCount,
    tasbihTarget,
    tasbihLaps,
    incrementTasbih,
    resetTasbih,
    setTasbihTarget,
    currentDhikr,
    setCurrentDhikr,
    contentLang,
    userStats,
    userMode,
    tasbihHistory,
    clearTasbihHistory,
    customDhikrData,
    setCustomDhikrData
  } = useApp();

  const isKids = userMode === 'kids';
  const [showDhikrDropdown, setShowDhikrDropdown] = useState(false);
  const [customTargetInput, setCustomTargetInput] = useState('');
  const [showCustomTargetModal, setShowCustomTargetModal] = useState(false);
  const [showCustomDhikrModal, setShowCustomDhikrModal] = useState(false);
  const [historyTab, setHistoryTab] = useState<'all' | 'today' | 'week'>('all');
  const [showHistorySection, setShowHistorySection] = useState(false);

  // Form state for Custom Dhikr editor
  const [editCustomTitle, setEditCustomTitle] = useState(customDhikrData.transliteration);
  const [editCustomArabic, setEditCustomArabic] = useState(customDhikrData.arabic);
  const [editCustomMeaningUrdu, setEditCustomMeaningUrdu] = useState(customDhikrData.meaningUrdu);
  const [editCustomMeaningEn, setEditCustomMeaningEn] = useState(customDhikrData.meaningEn);

  const targets = [33, 99, 100];

  const handleCustomTargetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customTargetInput, 10);
    if (!isNaN(val) && val > 0) {
      setTasbihTarget(val);
      setShowCustomTargetModal(false);
      setCustomTargetInput('');
    }
  };

  const handleSaveCustomDhikr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCustomTitle.trim()) return;
    setCustomDhikrData({
      transliteration: editCustomTitle.trim(),
      arabic: editCustomArabic.trim() || 'ذِكْرٌ مُبَارَكٌ',
      meaningUrdu: editCustomMeaningUrdu.trim() || 'اپنی پسند کا ذکر',
      meaningEn: editCustomMeaningEn.trim() || 'Personal Dhikr'
    });
    // Set active dhikr to custom-dhikr
    const customObj = DHIKR_LIST.find(d => d.id === 'custom-dhikr') || DHIKR_LIST[0];
    setCurrentDhikr(customObj);
    setShowCustomDhikrModal(false);
  };

  // Filter history records
  const now = Date.now();
  const oneDayAgo = now - 24 * 60 * 60 * 1000;
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const filteredHistory = tasbihHistory.filter(rec => {
    if (historyTab === 'today') return rec.timestamp >= oneDayAgo;
    if (historyTab === 'week') return rec.timestamp >= oneWeekAgo;
    return true;
  });

  const totalFilteredCount = filteredHistory.reduce((sum, item) => sum + item.count, 0);

  // Display active Dhikr details
  const displayArabic = currentDhikr.isCustom ? customDhikrData.arabic : currentDhikr.arabic;
  const displayTitle = currentDhikr.isCustom ? customDhikrData.transliteration : currentDhikr.transliteration;
  const displayMeaning = currentDhikr.isCustom
    ? (contentLang === 'urdu' ? customDhikrData.meaningUrdu : customDhikrData.meaningEn)
    : (contentLang === 'urdu' ? currentDhikr.meaningUrdu : currentDhikr.meaningEn);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-12">
      
      {/* Tasbih Header & Dhikr Selector Card */}
      <div className={`p-5 sm:p-6 rounded-3xl transition-all ${
        isKids
          ? 'bg-amber-100/90 border-2 border-amber-300 text-teal-950 shadow-sm'
          : 'bg-white border border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Selected Dhikr • منتخب ذکر
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Lifetime: {userStats.tasbihTotalLifetime}</span>
          </div>
        </div>

        {/* Dhikr Selector Button */}
        <div className="relative">
          <button
            onClick={() => setShowDhikrDropdown(!showDhikrDropdown)}
            className="w-full p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between transition-all active:scale-[0.99]"
          >
            <div>
              <div className="arabic-text text-xl sm:text-2xl text-slate-900 font-bold mb-1">
                {displayArabic}
              </div>
              <div className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <span>{displayTitle}</span>
                {currentDhikr.isCustom && (
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    Custom (اپنا ذکر)
                  </span>
                )}
              </div>
              <div className={`text-xs text-slate-500 mt-0.5 ${contentLang === 'urdu' ? 'urdu-text' : ''}`}>
                {displayMeaning}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showDhikrDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dhikr Dropdown Menu */}
          {showDhikrDropdown && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 max-h-80 overflow-y-auto p-2 space-y-1">
              {DHIKR_LIST.map(dhikr => {
                const isSelected = currentDhikr.id === dhikr.id;
                const itemArabic = dhikr.isCustom ? customDhikrData.arabic : dhikr.arabic;
                const itemTitle = dhikr.isCustom ? customDhikrData.transliteration : dhikr.transliteration;
                const itemMeaning = dhikr.isCustom
                  ? (contentLang === 'urdu' ? customDhikrData.meaningUrdu : customDhikrData.meaningEn)
                  : (contentLang === 'urdu' ? dhikr.meaningUrdu : dhikr.meaningEn);

                return (
                  <div
                    key={dhikr.id}
                    className={`p-3 rounded-xl text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setCurrentDhikr(dhikr);
                        setShowDhikrDropdown(false);
                        setTasbihTarget(dhikr.recommendedCount);
                      }}
                      className="flex-1 text-left"
                    >
                      <span className="arabic-text text-lg block">{itemArabic}</span>
                      <span className="text-xs font-semibold text-slate-700 block">{itemTitle}</span>
                      <span className="text-[11px] text-slate-400 block">{itemMeaning}</span>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {dhikr.isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDhikrDropdown(false);
                            setShowCustomDhikrModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs flex items-center gap-1"
                          title="Edit Custom Dhikr"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="text-[10px]">Edit</span>
                        </button>
                      )}
                      {isSelected && (
                        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Button to quickly open Custom Dhikr modal */}
              <button
                onClick={() => {
                  setShowDhikrDropdown(false);
                  setShowCustomDhikrModal(true);
                }}
                className="w-full p-2.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all mt-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Custom Dhikr / Durood (اپنا ذکر لکھیں)</span>
              </button>
            </div>
          )}
        </div>

        {/* Target Buttons */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500">Target (ہدف):</span>
          <div className="flex items-center space-x-1.5">
            {targets.map(t => (
              <button
                key={t}
                onClick={() => setTasbihTarget(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
                  tasbihTarget === t
                    ? isKids
                      ? 'bg-teal-600 text-white'
                      : 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
            <button
              onClick={() => setShowCustomTargetModal(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 ${
                !targets.includes(tasbihTarget)
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {!targets.includes(tasbihTarget) ? `${tasbihTarget}` : 'Custom'}
            </button>
          </div>
        </div>
      </div>

      {/* BIG INTERACTIVE DIGITAL TASBIH TAP SURFACE */}
      <div className="flex flex-col items-center justify-center pt-2">
        <button
          onClick={incrementTasbih}
          className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full flex flex-col items-center justify-center text-center relative transition-all active:scale-90 shadow-2xl focus:outline-none select-none cursor-pointer border-8 ${
            isKids
              ? 'bg-gradient-to-tr from-teal-500 via-teal-600 to-amber-400 border-amber-200 text-white ring-8 ring-teal-100'
              : 'bg-gradient-to-b from-[#064e3b] to-emerald-950 border-[#d4af37]/40 text-white ring-8 ring-emerald-900/20'
          }`}
          title="Tap anywhere on the circle to count Dhikr"
        >
          {/* Subtle Islamic pattern background layer */}
          <div className="absolute inset-0 rounded-full opacity-10 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Laps counter badge */}
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-1">
            Laps: <span className="text-amber-300 font-black">{tasbihLaps}</span>
          </div>

          {/* Main Counter Number */}
          <div className="text-6xl sm:text-7xl font-black tracking-tight text-white drop-shadow-md">
            {tasbihCount}
          </div>

          {/* Target subtitle */}
          <div className="text-xs font-bold text-emerald-200/90 mt-1">
            of <span className="text-amber-300">{tasbihTarget}</span>
          </div>

          {/* Tap hint */}
          <div className="mt-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-bold text-amber-200">
            TAP TO COUNT (ذکر کریں)
          </div>
        </button>

        {/* Reset & History Controls */}
        <div className="flex items-center space-x-3 mt-6">
          <button
            onClick={resetTasbih}
            className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Counter</span>
          </button>

          <button
            onClick={() => setShowHistorySection(!showHistorySection)}
            className={`px-4 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all ${
              showHistorySection
                ? 'bg-emerald-700 text-white border-emerald-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({tasbihHistory.length})</span>
          </button>
        </div>
      </div>

      {/* Benefit & Reward of current Dhikr */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs mb-1.5">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span>{contentLang === 'urdu' ? 'اس ذکر کی فضیلت و برکت:' : 'Virtue of this Dhikr:'}</span>
        </div>
        <p className={`text-xs text-slate-600 leading-relaxed ${contentLang === 'urdu' ? 'urdu-text text-sm' : ''}`}>
          {contentLang === 'urdu' ? currentDhikr.benefitUrdu : currentDhikr.benefitEn}
        </p>
      </div>

      {/* TASBIH HISTORY & LOGS SECTION */}
      {showHistorySection && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-700" />
                <span>Tasbih History Log (تسبیح کا ریکارڈ)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Track your daily, weekly, and monthly Dhikr milestones.
              </p>
            </div>

            {tasbihHistory.length > 0 && (
              <button
                onClick={clearTasbihHistory}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 flex items-center gap-1 transition-all"
                title="Clear History"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Period Filter Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
              {(['all', 'today', 'week'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setHistoryTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize ${
                    historyTab === tab
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'All Time' : tab === 'today' ? 'Past 24h' : 'This Week'}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Sum: {totalFilteredCount} beads
            </span>
          </div>

          {/* History List */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No Tasbih records found for this period. Start counting above!
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {filteredHistory.map(rec => (
                <div
                  key={rec.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="arabic-text text-sm font-normal text-emerald-800">{rec.arabic}</span>
                      <span>• {rec.dhikrName}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {rec.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-700 block">
                      +{rec.count}
                    </span>
                    {rec.completed && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">
                        Target Met ✓
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Target Modal */}
      {showCustomTargetModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Set Custom Target</h3>
            <p className="text-xs text-slate-500">
              Enter any target number of repetitions you wish to complete (e.g. 50, 500, 1000).
            </p>
            <form onSubmit={handleCustomTargetSubmit} className="space-y-4">
              <input
                type="number"
                min="1"
                max="100000"
                value={customTargetInput}
                onChange={e => setCustomTargetInput(e.target.value)}
                placeholder="e.g. 70"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-bold"
                autoFocus
              />
              <div className="flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCustomTargetModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow"
                >
                  Set Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Dhikr / Personal Salawat Modal */}
      {showCustomDhikrModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Custom Dhikr & Salawat (ذکرِ مخصّص)
            </h3>
            <p className="text-xs text-slate-500">
              Customize your own Dhikr, Salawat, or Quranic supplication to count on IslamIQ.
            </p>

            <form onSubmit={handleSaveCustomDhikr} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Title / Transliteration (عنوان / تلفّظ) *
                </label>
                <input
                  type="text"
                  required
                  value={editCustomTitle}
                  onChange={e => setEditCustomTitle(e.target.value)}
                  placeholder="e.g. HasbunAllahu wa Ni'mal Wakeel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Arabic Text (عربی متن - اختیاری)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={editCustomArabic}
                  onChange={e => setEditCustomArabic(e.target.value)}
                  placeholder="حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-arabic focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Urdu Meaning (اردو ترجمہ)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={editCustomMeaningUrdu}
                  onChange={e => setEditCustomMeaningUrdu(e.target.value)}
                  placeholder="ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs urdu-text focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  English Meaning
                </label>
                <input
                  type="text"
                  value={editCustomMeaningEn}
                  onChange={e => setEditCustomMeaningEn(e.target.value)}
                  placeholder="Allah is sufficient for us, and He is the best disposer of affairs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomDhikrModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 shadow"
                >
                  Save & Select Dhikr
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Strategic Bottom Ad Placement */}
      {!isKids && (
        <AdBanner
          slotId={AD_CONFIG.SLOTS.TASBIH_BANNER}
          labelUrdu="اشتہار (Google AdSense)"
          labelEn="Google Sponsored Ad"
          className="mt-4"
        />
      )}

    </div>
  );
};

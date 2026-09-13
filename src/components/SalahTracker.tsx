import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Circle, Flame, Sun, Sunrise, Sunset, Moon, Sparkles, Award, Compass, ChevronRight } from 'lucide-react';

export const SalahTracker: React.FC = () => {
  const { todaySalah, toggleSalahPrayer, salahHistory, contentLang, userMode, setActiveTab } = useApp();

  const isKids = userMode === 'kids';

  const prayers = [
    {
      id: 'fajr' as const,
      nameEn: 'Fajr',
      nameUrdu: 'فجر',
      nameArabic: 'الفجر',
      timeDesc: 'Dawn to Sunrise (طلوع آفتاب سے پہلے)',
      units: '2 Farz (2 فرض)',
      icon: Sunrise,
      iconColor: 'text-amber-500 bg-amber-50'
    },
    {
      id: 'dhuhr' as const,
      nameEn: 'Dhuhr',
      nameUrdu: 'ظہر',
      nameArabic: 'الظهر',
      timeDesc: 'After Midday (زوال آفتاب کے بعد)',
      units: '4 Farz (4 فرض)',
      icon: Sun,
      iconColor: 'text-yellow-500 bg-yellow-50'
    },
    {
      id: 'asr' as const,
      nameEn: 'Asr',
      nameUrdu: 'عصر',
      nameArabic: 'العصر',
      timeDesc: 'Late Afternoon (غروب سے پہلے کا وقت)',
      units: '4 Farz (4 فرض)',
      icon: Sun,
      iconColor: 'text-orange-500 bg-orange-50'
    },
    {
      id: 'maghrib' as const,
      nameEn: 'Maghrib',
      nameUrdu: 'مغرب',
      nameArabic: 'المغرب',
      timeDesc: 'Sunset (غروب آفتاب کے فوراً بعد)',
      units: '3 Farz (3 فرض)',
      icon: Sunset,
      iconColor: 'text-rose-500 bg-rose-50'
    },
    {
      id: 'isha' as const,
      nameEn: 'Isha',
      nameUrdu: 'عشاء',
      nameArabic: 'العشاء',
      timeDesc: 'Night (رات کے وقت)',
      units: '4 Farz + 3 Witr (4 فرض، 3 وتر)',
      icon: Moon,
      iconColor: 'text-indigo-500 bg-indigo-50'
    }
  ];

  const completedCount = [
    todaySalah.fajr,
    todaySalah.dhuhr,
    todaySalah.asr,
    todaySalah.maghrib,
    todaySalah.isha
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedCount / 5) * 100);

  // 7-day past days array for weekly consistency indicator
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const past7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const record = salahHistory[dateStr];
    const done = record
      ? [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha].filter(Boolean).length
      : (i === 6 ? completedCount : 0);
    return {
      dayName: daysOfWeek[d.getDay()],
      dateNum: d.getDate(),
      dateStr,
      completed: done
    };
  });

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      
      {/* Tracker Hero Header */}
      <div className={`p-6 rounded-3xl text-white shadow-lg relative overflow-hidden transition-all ${
        isKids
          ? 'bg-gradient-to-r from-teal-600 to-teal-800 border-2 border-teal-400'
          : 'bg-gradient-to-br from-[#064e3b] to-emerald-900 border border-emerald-700/60'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{contentLang === 'urdu' ? 'نماز دین کا ستون ہے' : 'Prayer is the Pillar of Faith'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {isKids ? 'میری روزانہ نمازیں 🕌 Daily Salah' : 'Daily Salah Tracker'}
            </h1>
          </div>
          
          {/* Progress Circular Badge */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center font-bold">
            <span className="text-xl leading-none text-goldAccent font-black">{completedCount}/5</span>
            <span className="text-[10px] text-emerald-200 mt-0.5">Prayed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-500 shadow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-emerald-200">
            <span>{progressPercent}% Completed Today</span>
            <span>{completedCount === 5 ? 'All 5 Prayed! Alhamdulillah 🌟' : `${5 - completedCount} Prayers remaining`}</span>
          </div>
        </div>
      </div>

      {/* Quick Qibla Finder Banner for Salah */}
      <button
        onClick={() => setActiveTab('qibla')}
        className="w-full bg-gradient-to-r from-emerald-800 to-teal-900 hover:from-emerald-700 hover:to-teal-800 text-white p-3.5 rounded-3xl shadow-xs border border-emerald-600/40 flex items-center justify-between active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 text-goldAccent flex items-center justify-center shrink-0 border border-white/10">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left rtl:text-right">
            <h3 className="text-xs sm:text-sm font-black text-white">
              {contentLang === 'urdu' ? 'نماز کے لیے قبلہ رخ معلوم کریں' : 'Find Qibla Direction for Prayer'}
            </h3>
            <p className="text-[11px] text-emerald-200">
              {contentLang === 'urdu' ? 'فون سینسر اور کمپاس سے کعبہ شریف کی سمت دیکھیں' : 'Accurate Kaaba compass with live sensors'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-yellow-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
          <span>{contentLang === 'urdu' ? 'قبلہ رخ' : 'Qibla'}</span>
          <ChevronRight className="w-4 h-4 rtl:rotate-180" />
        </div>
      </button>

      {/* 5 Daily Obligatory Prayers */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 px-1 flex items-center justify-between">
          <span>{contentLang === 'urdu' ? 'پانچ وقت کی فرض نمازیں:' : 'Five Obligatory Prayers:'}</span>
          <span className="text-xs text-slate-500 font-normal">Tap to mark completed</span>
        </h2>

        {prayers.map(prayer => {
          const isDone = !!todaySalah[prayer.id];
          const IconComp = prayer.icon;

          return (
            <button
              key={prayer.id}
              onClick={() => toggleSalahPrayer(prayer.id)}
              className={`w-full p-4 rounded-3xl border transition-all active:scale-[0.98] text-left flex items-center justify-between ${
                isDone
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDone ? 'bg-emerald-600 text-white shadow-xs' : prayer.iconColor
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold text-slate-900">
                      {contentLang === 'urdu' ? prayer.nameUrdu : prayer.nameEn}
                    </span>
                    <span className="arabic-text text-sm font-semibold text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded-md">
                      {prayer.nameArabic}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {prayer.timeDesc} • <span className="font-semibold text-slate-700">{prayer.units}</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                {isDone ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-7 h-7 text-slate-300 hover:text-slate-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional Voluntary Prayers: Tahajjud */}
      <div className="pt-2">
        <h3 className="text-sm font-bold text-slate-900 px-1 mb-2">
          {contentLang === 'urdu' ? 'نفلی عبادات (Voluntary Prayers):' : 'Voluntary Prayers:'}
        </h3>
        <button
          onClick={() => toggleSalahPrayer('tahajjud')}
          className={`w-full p-4 rounded-3xl border transition-all active:scale-[0.98] text-left flex items-center justify-between ${
            todaySalah.tahajjud
              ? 'bg-indigo-50/90 border-indigo-300 shadow-xs'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center space-x-3.5">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
              todaySalah.tahajjud ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'
            }`}>
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-slate-900">
                  {contentLang === 'urdu' ? 'نمازِ تہجد' : 'Salat al-Tahajjud'}
                </span>
                <span className="arabic-text text-sm font-semibold text-indigo-800 bg-indigo-100/60 px-2 py-0.5 rounded-md">
                  التهجد
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Night vigil before dawn (آخر شب کی مسنون نماز)
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-2">
            {todaySalah.tahajjud ? (
              <CheckCircle2 className="w-7 h-7 text-indigo-600 fill-indigo-100" />
            ) : (
              <Circle className="w-7 h-7 text-slate-300" />
            )}
          </div>
        </button>
      </div>

      {/* 7-Day Consistency History Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>7-Day Prayer Consistency (ہفتہ وار استقامت)</span>
        </h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {past7Days.map((item, idx) => {
            const isFull = item.completed === 5;
            const isPartial = item.completed > 0 && item.completed < 5;
            return (
              <div
                key={idx}
                className={`p-2 rounded-2xl border flex flex-col items-center ${
                  isFull
                    ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900 font-bold'
                    : isPartial
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-slate-50 border-slate-100 text-slate-400'
                }`}
              >
                <span className="text-[11px] font-semibold">{item.dayName}</span>
                <span className="text-sm font-extrabold my-0.5">{item.dateNum}</span>
                <span className="text-[10px] font-bold">
                  {item.completed}/5
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

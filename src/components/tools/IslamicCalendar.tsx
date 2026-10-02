import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from '../seo/SeoHead';
import { RelatedIslamicLearning } from '../seo/RelatedIslamicLearning';
import {
  HIJRI_MONTHS,
  WEEKDAYS,
  MAJOR_ISLAMIC_EVENTS,
  getHijriDate,
  formatHijriDate,
  getHijriMonthDays,
  CalendarDayItem,
  IslamicEvent
} from '../../utils/hijriCalendar';
import { ISLAMIC_CALENDAR_DATA } from '../../data/tools/islamic-calendar-data';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Star,
  Info,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { AppTab } from '../../types';

export const IslamicCalendar: React.FC = () => {
  const { contentLang, setActiveTab } = useApp();
  const isUrdu = contentLang === 'urdu';
  const data = ISLAMIC_CALENDAR_DATA;

  // Local storage for moon sighting adjustment offset (-2 to +2 days)
  const [dayOffset, setDayOffset] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('islamiq_hijri_offset');
      return saved !== null ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const handleOffsetChange = (newOffset: number) => {
    setDayOffset(newOffset);
    try {
      localStorage.setItem('islamiq_hijri_offset', newOffset.toString());
    } catch {
      // Ignore localStorage error
    }
  };

  // Current real-time Hijri date for "Today"
  const todayHijri = useMemo(() => {
    return getHijriDate(new Date(), dayOffset);
  }, [dayOffset]);

  // Selected calendar view month & year
  const [selectedMonth, setSelectedMonth] = useState<number>(todayHijri.month);
  const [selectedYear, setSelectedYear] = useState<number>(todayHijri.year);

  // Selected day for detailed preview
  const [selectedDayItem, setSelectedDayItem] = useState<CalendarDayItem | null>(null);

  // Keep selected month/year in sync if user changes offset
  useEffect(() => {
    // If user changes offset, update today reference
  }, [dayOffset]);

  // Generate calendar days for selected month & year
  const monthDays = useMemo(() => {
    return getHijriMonthDays(selectedYear, selectedMonth, dayOffset);
  }, [selectedYear, selectedMonth, dayOffset]);

  // Default selected day item on month load
  useEffect(() => {
    const todayItem = monthDays.find((d) => d.isToday);
    if (todayItem) {
      setSelectedDayItem(todayItem);
    } else if (monthDays.length > 0) {
      setSelectedDayItem(monthDays[0]);
    }
  }, [monthDays]);

  const currentMonthInfo = HIJRI_MONTHS.find((m) => m.number === selectedMonth) || HIJRI_MONTHS[0];

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  const handleJumpToToday = () => {
    setSelectedMonth(todayHijri.month);
    setSelectedYear(todayHijri.year);
    const todayItem = monthDays.find((d) => d.isToday);
    if (todayItem) setSelectedDayItem(todayItem);
  };

  // Events in this selected month
  const thisMonthEvents = useMemo(() => {
    return MAJOR_ISLAMIC_EVENTS.filter((e) => e.month === selectedMonth);
  }, [selectedMonth]);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Gregorian month names for display
  const gregFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(isUrdu ? 'ur-PK' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [isUrdu]);

  const todayGregorianStr = useMemo(() => {
    return gregFormatter.format(new Date());
  }, [gregFormatter]);

  // Padding cells before the first day of the month
  const firstDayOfWeek = monthDays.length > 0 ? monthDays[0].dayOfWeek : 0;
  const paddingEmptyDays = Array.from({ length: firstDayOfWeek });

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-10">
      <SeoHead
        title={isUrdu ? "اسلامی کیلنڈر • آج کی ہجری تاریخ اور اہم ایام | IslamIQ" : "Islamic Calendar (Hijri Date Today & Monthly Calendar) | IslamIQ"}
        description={isUrdu ? data.subtitleUrdu : data.subtitleEn}
        canonicalPath="/islamic-calendar"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی ٹولز' : 'Tools', url: '/islamic-calendar' },
          { name: isUrdu ? 'اسلامی کیلنڈر' : 'Islamic Calendar', url: '/islamic-calendar' }
        ]}
        faqs={data.faqs.map((f) => ({
          question: isUrdu ? f.questionUrdu : f.questionEn,
          answer: isUrdu ? f.answerUrdu : f.answerEn
        }))}
        article={{
          headline: isUrdu ? data.h1Urdu : data.h1En,
          description: isUrdu ? data.subtitleUrdu : data.subtitleEn,
          datePublished: '2026-09-27',
          dateModified: '2026-09-27'
        }}
      />

      {/* Header Banner */}
      <header className="text-center space-y-3 sm:space-y-4 border-b border-slate-200 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Moon className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'مستند اسلامی تقویم و ہجری تاریخ' : 'Official Islamic Hijri Calendar'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {isUrdu ? data.h1Urdu : data.h1En}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
          {isUrdu ? data.subtitleUrdu : data.subtitleEn}
        </p>
      </header>

      {/* Today's Highlight Banner */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg shadow-emerald-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none blur-xl"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isUrdu ? 'آج کی اسلامی تاریخ' : 'Today\'s Hijri Date'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {formatHijriDate(todayHijri, isUrdu ? 'urdu' : 'english')}
            </div>
            <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{todayGregorianStr}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:self-center">
            <button
              onClick={handleJumpToToday}
              className="px-3.5 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <CalendarIcon className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'آج پر جائیں' : 'Go to Today'}</span>
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/60 border border-emerald-600/40 text-xs text-emerald-100">
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {currentMonthInfo.isSacred
                  ? (isUrdu ? 'حرمت والا مہینہ' : 'Sacred Month')
                  : (isUrdu ? 'قمری تقویم' : 'Lunar Calendar')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sighting Adjustment Notice & Settings */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            <span className="font-bold">
              {isUrdu ? 'رویتِ ہلال کی ایڈجسٹمنٹ: ' : 'Moon Sighting Adjustment: '}
            </span>
            {isUrdu
              ? 'مقامی رویت کے مطابق تاریخ ۱ یا ۲ دن مختلف ہو سکتی ہے۔ اگر آپ کے ملک میں تاریخ مختلف ہو تو یہاں تبدیل کریں:'
              : 'Hijri dates may vary by 1–2 days based on local moon sighting. Synchronize with your local authority:'}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center bg-white/90 p-1 rounded-xl border border-amber-300 shadow-xs">
          {[-2, -1, 0, 1, 2].map((offsetVal) => (
            <button
              key={offsetVal}
              onClick={() => handleOffsetChange(offsetVal)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                dayOffset === offsetVal
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-900 hover:bg-amber-100'
              }`}
            >
              {offsetVal > 0 ? `+${offsetVal}` : offsetVal}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-7 shadow-xs space-y-6">
        {/* Month Navigation & Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={handlePrevMonth}
              aria-label={isUrdu ? 'پچھلا مہینہ' : 'Previous Month'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                <span>{isUrdu ? currentMonthInfo.nameUrdu : currentMonthInfo.nameEn}</span>
                <span className="text-sm sm:text-base font-normal text-slate-500">
                  {selectedYear} {isUrdu ? 'ھ' : 'AH'}
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-emerald-700 font-medium">
                {currentMonthInfo.nameArabic} • {currentMonthInfo.isSacred ? (isUrdu ? 'حرمت والا مہینہ' : 'Sacred Month') : (isUrdu ? 'اسلامی مہینہ' : 'Islamic Month')}
              </p>
            </div>

            <button
              onClick={handleNextMonth}
              aria-label={isUrdu ? 'اگلا مہینہ' : 'Next Month'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Selectors */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
              aria-label={isUrdu ? 'مہینہ منتخب کریں' : 'Select Month'}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {HIJRI_MONTHS.map((m) => (
                <option key={m.number} value={m.number}>
                  {m.number}. {isUrdu ? m.nameUrdu : m.nameEn}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
              aria-label={isUrdu ? 'سال منتخب کریں' : 'Select Year'}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {[1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451].map((yr) => (
                <option key={yr} value={yr}>
                  {yr} {isUrdu ? 'ھ' : 'AH'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider pb-1">
            {WEEKDAYS.map((wd) => (
              <div
                key={wd.dayIndex}
                className={`py-1.5 rounded-lg ${
                  wd.dayIndex === 5 ? 'text-emerald-700 bg-emerald-50/60 font-black' : ''
                }`}
              >
                {isUrdu ? wd.shortUrdu : wd.shortEn}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty padding cells for start of month */}
            {paddingEmptyDays.map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="min-h-[58px] sm:min-h-[78px] rounded-xl sm:rounded-2xl bg-slate-50/40 border border-transparent"
              />
            ))}

            {/* Days in Month */}
            {monthDays.map((dayItem) => {
              const isSelected = selectedDayItem?.hijriDay === dayItem.hijriDay;
              const hasEvents = dayItem.events.length > 0;
              const gregDateStr = `${dayItem.gregorianDate.getDate()} ${dayItem.gregorianDate.toLocaleString(
                isUrdu ? 'ur-PK' : 'en-US',
                { month: 'short' }
              )}`;

              return (
                <button
                  key={`day-${dayItem.hijriDay}`}
                  onClick={() => setSelectedDayItem(dayItem)}
                  className={`min-h-[58px] sm:min-h-[78px] p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border text-left flex flex-col justify-between transition-all relative group ${
                    dayItem.isToday
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/50'
                      : isSelected
                      ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                      : dayItem.isJumuah
                      ? 'bg-emerald-50/30 border-emerald-200/60 hover:bg-emerald-50/60 text-slate-800'
                      : 'bg-white border-slate-200/70 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  {/* Top row: Hijri Day number & special badge */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-sm sm:text-lg font-black leading-none ${
                        dayItem.isToday
                          ? 'text-white'
                          : isSelected
                          ? 'text-emerald-800'
                          : 'text-slate-800'
                      }`}
                    >
                      {dayItem.hijriDay}
                    </span>

                    {/* Small badges for event / fasting */}
                    <div className="flex items-center gap-0.5">
                      {hasEvents && (
                        <span
                          title={isUrdu ? dayItem.events[0].titleUrdu : dayItem.events[0].titleEn}
                          className={`w-2 h-2 rounded-full ${
                            dayItem.isToday ? 'bg-amber-300' : 'bg-amber-500'
                          }`}
                        />
                      )}
                      {dayItem.isSunnahFasting && (
                        <span
                          title={isUrdu ? dayItem.sunnahFastingReasonUrdu : dayItem.sunnahFastingReasonEn}
                          className={`w-1.5 h-1.5 rounded-full ${
                            dayItem.isToday ? 'bg-teal-200' : 'bg-emerald-500'
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Bottom row: Gregorian Day */}
                  <div className="w-full flex items-center justify-between mt-1">
                    <span
                      className={`text-[9px] sm:text-[11px] font-medium truncate ${
                        dayItem.isToday
                          ? 'text-emerald-100'
                          : isSelected
                          ? 'text-emerald-700 font-semibold'
                          : 'text-slate-500'
                      }`}
                    >
                      {gregDateStr}
                    </span>

                    {dayItem.isWhiteDay && (
                      <span
                        title={isUrdu ? 'ایامِ بیض' : 'White Day'}
                        className={`text-[9px] px-1 py-0.2 rounded font-bold hidden sm:inline ${
                          dayItem.isToday
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isUrdu ? 'بیض' : '13-15'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-3 border-t border-slate-100 text-[11px] sm:text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>{isUrdu ? 'آج کا دن' : 'Today'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>{isUrdu ? 'اہم اسلامی دن / عید' : 'Islamic Event / Holiday'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>{isUrdu ? 'مسنون روزہ (پیر، جمعرات، ایامِ بیض)' : 'Sunnah Fasting (Mon/Thu/13-15)'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-100 border border-emerald-300"></span>
            <span>{isUrdu ? 'جمعۃ المبارک' : 'Friday (Jumuʻah)'}</span>
          </div>
        </div>
      </section>

      {/* Selected Day Details Panel */}
      {selectedDayItem && (
        <section className="bg-white rounded-3xl border border-emerald-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {selectedDayItem.isToday
                    ? (isUrdu ? 'آج کا منتخب دن' : 'Selected Date • Today')
                    : (isUrdu ? 'منتخب اسلامی تاریخ' : 'Selected Date')}
                </span>
                {selectedDayItem.isJumuah && (
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-bold">
                    {isUrdu ? 'جمعۃ المبارک' : 'Friday Jumuʻah'}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {selectedDayItem.hijriDay} {isUrdu ? currentMonthInfo.nameUrdu : currentMonthInfo.nameEn} {selectedDayItem.hijriYear} {isUrdu ? 'ھ' : 'AH'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                {gregFormatter.format(selectedDayItem.gregorianDate)}
              </p>
            </div>

            {selectedDayItem.events.length > 0 && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 sm:max-w-xs">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>{isUrdu ? selectedDayItem.events[0].titleUrdu : selectedDayItem.events[0].titleEn}</span>
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  {isUrdu ? selectedDayItem.events[0].descUrdu : selectedDayItem.events[0].descEn}
                </p>
              </div>
            )}
          </div>

          {/* Observances & Sunnah recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isUrdu ? 'روزے کی شرعی حیثیت' : 'Fasting Guidance'}</span>
              </p>
              {selectedDayItem.isForbiddenFasting ? (
                <p className="text-xs text-rose-700 font-semibold">
                  {isUrdu ? 'اس دن روزہ رکھنا ممنوع (حرام) ہے۔' : 'Fasting is strictly prohibited (Haram) on this day.'}
                </p>
              ) : selectedDayItem.isSunnahFasting ? (
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {isUrdu ? selectedDayItem.sunnahFastingReasonUrdu : selectedDayItem.sunnahFastingReasonEn}
                </p>
              ) : (
                <p className="text-xs text-slate-600">
                  {isUrdu ? 'عام دن (نفلی روزہ رکھنا جائز ہے)۔' : 'Regular day. Voluntary voluntary fast is permissible.'}
                </p>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{isUrdu ? 'مسنون اعمال و ذکر' : 'Recommended Sunnah Acts'}</span>
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedDayItem.isJumuah
                  ? (isUrdu
                      ? 'سورۃ الکہف کی تلاوت، غسل، درود شریف کی کثرت اور قبولیت کی گھڑی میں دعا۔'
                      : 'Recitation of Surah Al-Kahf, Salawat upon Prophet Muhammad ﷺ, Ghusl, and sincere dua.')
                  : (isUrdu
                      ? 'پانچ وقت باجماعت نماز، صبح و شام کے اذکار اور قرآن پاک کی تلاوت کا معمول۔'
                      : 'Punctual 5 daily prayers, morning & evening adhkar, and daily Quran recitation.')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Events in Selected Month Section */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
            <span>
              {isUrdu
                ? `ماہِ ${currentMonthInfo.nameUrdu} کے اہم اسلامی ایام`
                : `Important Events in ${currentMonthInfo.nameEn}`}
            </span>
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {thisMonthEvents.length} {isUrdu ? 'واقعات' : 'Events'}
          </span>
        </div>

        {thisMonthEvents.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs sm:text-sm">
            <p>
              {isUrdu
                ? 'اس مہینے میں کوئی بڑا تاریخی اسلامی تہوار نہیں ہے۔ عمومی عبادات و مسنون روزوں کا اہتمام فرمائیں۔'
                : 'No major annual festive holiday occurs in this month. Maintain regular voluntary fasts and prayers.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {thisMonthEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 transition-all space-y-2 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {evt.day} {isUrdu ? currentMonthInfo.nameUrdu : currentMonthInfo.nameEn}
                  </span>
                  {evt.reference && (
                    <span className="text-[11px] text-slate-500 italic">
                      {evt.reference}
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {isUrdu ? evt.titleUrdu : evt.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isUrdu ? evt.descUrdu : evt.descEn}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Major Annual Islamic Events Reference */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-600" />
            <span>{isUrdu ? 'سال بھر کے اہم اسلامی ایام کی فہرست' : 'Key Islamic Dates Throughout the Year'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isUrdu
              ? 'رمضان، عیدین، حج اور دیگر مسنون و تاریخی ایام کا فوری جائزہ۔'
              : 'Quick reference for Ramadan, Eid al-Fitr, Eid al-Adha, Day of Arafah, and sacred months.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MAJOR_ISLAMIC_EVENTS.map((evt) => {
            const mInfo = HIJRI_MONTHS.find((m) => m.number === evt.month);
            return (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-emerald-500 hover:shadow-xs transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700">
                    {evt.day} {isUrdu ? mInfo?.nameUrdu : mInfo?.nameEn}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-medium">
                    {evt.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {isUrdu ? evt.titleUrdu : evt.titleEn}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {isUrdu ? evt.descUrdu : evt.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sacred Months Educational Card */}
      <section className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-amber-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-700" />
          <span>{isUrdu ? data.sacredMonthsHeaderUrdu : data.sacredMonthsHeaderEn}</span>
        </h2>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          {isUrdu ? data.sacredMonthsDetailUrdu : data.sacredMonthsDetailEn}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {HIJRI_MONTHS.filter((m) => m.isSacred).map((m) => (
            <div
              key={m.number}
              className="p-3 rounded-xl bg-white border border-amber-200 text-center space-y-1 shadow-2xs"
            >
              <span className="text-[10px] text-amber-700 font-bold uppercase">
                {isUrdu ? `مہینہ نمبر ${m.number}` : `Month #${m.number}`}
              </span>
              <p className="text-xs sm:text-sm font-black text-slate-800">
                {isUrdu ? m.nameUrdu : m.nameEn}
              </p>
              <p className="text-[11px] text-slate-500">{m.nameArabic}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Educational FAQs Section */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900">
          {isUrdu ? 'اسلامی کیلنڈر کے بارے میں عمومی سوالات' : 'Frequently Asked Questions (Islamic Calendar)'}
        </h2>
        <div className="space-y-2.5">
          {data.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800"
              >
                <span>{isUrdu ? faq.questionUrdu : faq.questionEn}</span>
                <span className="text-slate-400 font-light text-base">
                  {openFaqIndex === idx ? '−' : '+'}
                </span>
              </button>
              {openFaqIndex === idx && (
                <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                  {isUrdu ? faq.answerUrdu : faq.answerEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Internal Cross-Linking to other IslamIQ tools */}
      <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold">
              {isUrdu ? 'زکوٰۃ کیلکولیٹر اور دیگر ٹولز آزمائیں' : 'Calculate Your Zakat & Explore Tools'}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {isUrdu
                ? 'اپنے مال، سونے اور چاندی کا نصاب اور زکوٰۃ معلوم کرنے کے لیے مفت زکوٰۃ کیلکولیٹر استعمال کریں۔'
                : 'Accurately determine Nisab and 2.5% Zakat on cash, gold, silver, and trade assets with our offline tool.'}
            </p>
          </div>
          <a
            href="/zakat-calculator"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('zakat-calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{isUrdu ? 'زکوٰۃ کیلکولیٹر کھولیں' : 'Open Zakat Calculator'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
          <a
            href="/ramadan-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('ramadan-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors block"
          >
            {isUrdu ? 'رمضان المبارک گائیڈ' : 'Ramadan & Fasting Guide'}
          </a>
          <a
            href="/how-to-perform-salah"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('how-to-perform-salah');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors block"
          >
            {isUrdu ? 'نماز کا مکمل طریقہ' : 'How to Perform Salah'}
          </a>
          <a
            href="/daily-hadith"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('daily-hadith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors block"
          >
            {isUrdu ? 'روزانہ کی حدیث' : 'Daily Hadith Hub'}
          </a>
          <a
            href="/zakat-basics"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('zakat-basics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 transition-colors block"
          >
            {isUrdu ? 'زکوٰۃ کے بنیادی احکام' : 'Zakat Basics Guide'}
          </a>
        </div>
      </section>

      {/* Related Islamic Learning Component */}
      <RelatedIslamicLearning currentTab="islamic-calendar" />
    </div>
  );
};

export default IslamicCalendar;

import { SalahDayRecord } from '../types';

/**
 * Returns strictly the user's LOCAL calendar date in YYYY-MM-DD format.
 * NEVER uses UTC toISOString() to prevent midnight date skew across timezones.
 */
export const getLocalDateStr = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parses a YYYY-MM-DD string into a local Date object without UTC displacement.
 */
export const parseLocalDateStr = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

export interface LocalPastDayItem {
  dateStr: string;
  dateNum: number;
  dayName: string;
  isToday: boolean;
  isFuture: boolean;
}

/**
 * Generates an array of the past N calendar days ending on referenceDate (inclusive).
 * All calculated using strict local calendar date arithmetic.
 */
export const getPastNDaysLocal = (numDays: number = 7, referenceDate: Date = new Date()): LocalPastDayItem[] => {
  const todayStr = getLocalDateStr(referenceDate);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return Array.from({ length: numDays }).map((_, i) => {
    const d = new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate() - (numDays - 1 - i)
    );
    const dateStr = getLocalDateStr(d);
    return {
      dateStr,
      dateNum: d.getDate(),
      dayName: daysOfWeek[d.getDay()],
      isToday: dateStr === todayStr,
      isFuture: dateStr > todayStr
    };
  });
};

/**
 * Normalizes and sanitizes historical Salah tracking records without losing data.
 * Migrates any legacy keys (e.g. "today", ISO timestamps) to valid local YYYY-MM-DD keys.
 */
export const normalizeSalahHistory = (
  rawHistory: Record<string, any> | undefined | null,
  currentLocalDateStr: string
): Record<string, SalahDayRecord> => {
  if (!rawHistory || typeof rawHistory !== 'object') {
    return {};
  }

  const result: Record<string, SalahDayRecord> = {};

  for (const [key, val] of Object.entries(rawHistory)) {
    if (!val || typeof val !== 'object') continue;

    let normalizedDate = '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      normalizedDate = key;
    } else if (val.date && /^\d{4}-\d{2}-\d{2}$/.test(val.date)) {
      normalizedDate = val.date;
    } else if (/^\d{4}-\d{2}-\d{2}T/.test(key)) {
      normalizedDate = key.substring(0, 10);
    } else if (val.date && /^\d{4}-\d{2}-\d{2}T/.test(val.date)) {
      normalizedDate = val.date.substring(0, 10);
    } else if (key === 'today' || key === 'currentDay') {
      normalizedDate = currentLocalDateStr;
    }

    if (!normalizedDate) continue;

    result[normalizedDate] = {
      date: normalizedDate,
      fajr: Boolean(val.fajr),
      dhuhr: Boolean(val.dhuhr),
      asr: Boolean(val.asr),
      maghrib: Boolean(val.maghrib),
      isha: Boolean(val.isha),
      tahajjud: Boolean(val.tahajjud)
    };
  }

  return result;
};

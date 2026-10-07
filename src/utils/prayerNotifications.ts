import { useEffect } from 'react';
import { sounds } from './audio';

export type PrayerId = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud';

export interface PrayerNotificationSettings {
  enabled: boolean; // Master toggle
  prayers: Record<PrayerId, boolean>;
  sound: boolean;
  vibrate: boolean;
  advanceMinutes: number; // 0 = at exact time, 10 = 10 mins before, 15 = 15 mins before
}

export const STORAGE_KEY_PRAYER_NOTIFICATIONS = 'islamiq_salah_notifications_v1';

export const DEFAULT_PRAYER_NOTIFICATION_SETTINGS: PrayerNotificationSettings = {
  enabled: true,
  prayers: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    tahajjud: false
  },
  sound: true,
  vibrate: true,
  advanceMinutes: 0
};

// Standard daily prayer times schedule (24-hour format)
export interface PrayerTimeSchedule {
  id: PrayerId;
  nameEn: string;
  nameUrdu: string;
  nameArabic: string;
  time24: string; // "HH:MM"
  time12: string; // "h:mm A"
}

export const DEFAULT_PRAYER_SCHEDULE: PrayerTimeSchedule[] = [
  {
    id: 'fajr',
    nameEn: 'Fajr',
    nameUrdu: 'فجر',
    nameArabic: 'الفجر',
    time24: '05:15',
    time12: '5:15 AM'
  },
  {
    id: 'dhuhr',
    nameEn: 'Dhuhr',
    nameUrdu: 'ظہر',
    nameArabic: 'الظهر',
    time24: '12:30',
    time12: '12:30 PM'
  },
  {
    id: 'asr',
    nameEn: 'Asr',
    nameUrdu: 'عصر',
    nameArabic: 'العصر',
    time24: '16:30',
    time12: '4:30 PM'
  },
  {
    id: 'maghrib',
    nameEn: 'Maghrib',
    nameUrdu: 'مغرب',
    nameArabic: 'المغرب',
    time24: '18:15',
    time12: '6:15 PM'
  },
  {
    id: 'isha',
    nameEn: 'Isha',
    nameUrdu: 'عشاء',
    nameArabic: 'العشاء',
    time24: '19:45',
    time12: '7:45 PM'
  },
  {
    id: 'tahajjud',
    nameEn: 'Tahajjud',
    nameUrdu: 'تہجد',
    nameArabic: 'التهجد',
    time24: '04:00',
    time12: '4:00 AM'
  }
];

/**
 * Load prayer notification settings safely from localStorage
 */
export function loadPrayerNotificationSettings(): PrayerNotificationSettings {
  if (typeof window === 'undefined') return DEFAULT_PRAYER_NOTIFICATION_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRAYER_NOTIFICATIONS);
    if (!raw) return DEFAULT_PRAYER_NOTIFICATION_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_PRAYER_NOTIFICATION_SETTINGS.enabled,
      prayers: {
        ...DEFAULT_PRAYER_NOTIFICATION_SETTINGS.prayers,
        ...(parsed.prayers || {})
      },
      sound: typeof parsed.sound === 'boolean' ? parsed.sound : DEFAULT_PRAYER_NOTIFICATION_SETTINGS.sound,
      vibrate: typeof parsed.vibrate === 'boolean' ? parsed.vibrate : DEFAULT_PRAYER_NOTIFICATION_SETTINGS.vibrate,
      advanceMinutes: typeof parsed.advanceMinutes === 'number' ? parsed.advanceMinutes : DEFAULT_PRAYER_NOTIFICATION_SETTINGS.advanceMinutes
    };
  } catch {
    return DEFAULT_PRAYER_NOTIFICATION_SETTINGS;
  }
}

/**
 * Save prayer notification settings to localStorage
 */
export function savePrayerNotificationSettings(settings: PrayerNotificationSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PRAYER_NOTIFICATIONS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save prayer notification settings', e);
  }
}

/**
 * Check if the browser supports the Notifications API
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Current notification permission state
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Safely request browser permission for notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (e) {
    console.error('Error requesting notification permission:', e);
    return Notification.permission;
  }
}

/**
 * Dispatches an audible and/or tactile notification alert
 */
export function triggerPrayerNotificationAlert(
  title: string,
  body: string,
  settings: PrayerNotificationSettings,
  tag = 'prayer-notification'
): boolean {
  // 1. Play serene notification sound if enabled
  if (settings.sound) {
    try {
      sounds.playPrayerNotificationChime();
    } catch {}
  }

  // 2. Vibrate phone if enabled and supported
  if (settings.vibrate && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([250, 100, 250]);
    } catch {}
  }

  // 3. Display native system/browser notification if permission granted
  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      const notif = new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag,
        badge: '/favicon.ico',
        silent: !settings.sound
      });
      notif.onclick = () => {
        window.focus();
        notif.close();
      };
      return true;
    } catch (e) {
      console.warn('Browser prevented Notification instantiation:', e);
    }
  }

  return false;
}

/**
 * Sends an immediate test notification to verify audio and alert delivery
 */
export function sendTestPrayerNotification(
  settings: PrayerNotificationSettings,
  isUrdu: boolean
): { success: boolean; message: string } {
  const title = isUrdu
    ? '🕌 نماز کا وقت • اسلام آئی کیو ٹیسٹ الرٹ'
    : '🕌 Prayer Time • IslamIQ Test Alert';
  const body = isUrdu
    ? 'الحمدللہ! نماز کے اوقات کے نوٹیفیکیشن کامیابی سے کام کر رہے ہیں۔'
    : 'Alhamdulillah! Prayer time notifications are active and working smoothly.';

  const nativeShown = triggerPrayerNotificationAlert(title, body, settings, 'test-alert');

  if (nativeShown) {
    return {
      success: true,
      message: isUrdu
        ? 'ٹیسٹ نوٹیفکیشن کامیابی سے بھیج دیا گیا!'
        : 'Test notification sent successfully!'
    };
  }

  if (Notification.permission === 'denied') {
    return {
      success: false,
      message: isUrdu
        ? 'براؤزر نے نوٹیفکیشن بلاک کیا ہوا ہے۔ ترتیبات میں اجازت دیں۔'
        : 'Notifications are blocked by your browser. Please allow in site permissions.'
    };
  }

  if (Notification.permission === 'default') {
    return {
      success: false,
      message: isUrdu
        ? 'براہ کرم پہلے "اجازت دیں" پر ٹیپ کر کے نوٹیفکیشن کی منظوری دیں۔'
        : 'Please tap "Allow Notifications" first to approve system alerts.'
    };
  }

  return {
    success: true,
    message: isUrdu
      ? 'آواز اور الرٹ کامیابی سے بجائی گئی!'
      : 'Notification sound and chime played successfully!'
  };
}

/**
 * Hook to run background checks for scheduled prayer notifications
 */
export function usePrayerNotificationScheduler(todayDateStr: string, isUrdu: boolean) {
  useEffect(() => {
    const checkSchedule = () => {
      const settings = loadPrayerNotificationSettings();
      if (!settings.enabled) return;

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      DEFAULT_PRAYER_SCHEDULE.forEach(prayer => {
        if (!settings.prayers[prayer.id]) return;

        const [schedHours, schedMins] = prayer.time24.split(':').map(Number);

        // Target minute taking advanceMinutes into account
        let targetTotalMins = schedHours * 60 + schedMins - (settings.advanceMinutes || 0);
        if (targetTotalMins < 0) targetTotalMins += 24 * 60;

        const currentTotalMins = currentHours * 60 + currentMinutes;

        if (currentTotalMins === targetTotalMins) {
          const sessionKey = `islamiq_salah_alert_${prayer.id}_${todayDateStr}_${targetTotalMins}`;
          if (typeof window !== 'undefined' && !sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');

            const title = isUrdu
              ? `🕌 وقتِ نماز: ${prayer.nameUrdu} (${prayer.nameArabic})`
              : `🕌 Prayer Time: ${prayer.nameEn} (${prayer.nameArabic})`;

            const body = isUrdu
              ? settings.advanceMinutes > 0
                ? `نمازِ ${prayer.nameUrdu} کا وقت ${settings.advanceMinutes} منٹ میں شروع ہونے والا ہے۔ تیاری فرمائیں۔`
                : `نمازِ ${prayer.nameUrdu} کا وقت ہو گیا ہے۔ حی علی الصلاۃ، حی علی الفلاح۔`
              : settings.advanceMinutes > 0
                ? `${prayer.nameEn} prayer begins in ${settings.advanceMinutes} minutes. Prepare for Salah.`
                : `It is now time for ${prayer.nameEn} prayer (${prayer.time12}). Come to prayer, come to success.`;

            triggerPrayerNotificationAlert(title, body, settings, `prayer-${prayer.id}`);
          }
        }
      });
    };

    checkSchedule();
    const interval = setInterval(checkSchedule, 30000);
    return () => clearInterval(interval);
  }, [todayDateStr, isUrdu]);
}

/**
 * IslamIQ — Notification Service
 * Fully local/offline browser notification scheduler & preferences manager.
 * No Firebase, Firestore, backend, CMS, or paid external notification APIs.
 */

import { AppNotificationSettings, DailyContentTypeOption, ContentLanguage } from '../types';
import {
  VERIFIED_QURAN_VERSES,
  VERIFIED_HADITHS,
  VERIFIED_DUAS,
  ISLAMIC_REMINDERS
} from '../data/verifiedContent';

const STORAGE_KEY = 'islamiq_notification_settings';
const LAST_DAILY_NOTIF_KEY = 'islamiq_last_daily_notif_date';
const LAST_SALAH_NOTIF_PREFIX = 'islamiq_last_salah_';

export const DEFAULT_NOTIFICATION_SETTINGS: AppNotificationSettings = {
  enabled: false,
  dailyContentEnabled: true,
  dailyContentTime: '09:00',
  dailyContentType: 'all',
  salahEnabled: true,
  prayers: {
    fajr: { enabled: true, time: '05:15' },
    dhuhr: { enabled: true, time: '12:45' },
    asr: { enabled: true, time: '16:30' },
    maghrib: { enabled: true, time: '18:15' },
    isha: { enabled: true, time: '20:00' }
  }
};

export interface NotificationResult {
  success: boolean;
  error?: 'unsupported' | 'permission_denied' | 'failed';
  message?: string;
}

class NotificationService {
  constructor() {
    this.initServiceWorker();
  }

  /**
   * Register local client-side Service Worker for PWA / Android Chrome notification support
   */
  initServiceWorker(): void {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service workers may be blocked in some sandboxed environments; fail gracefully
        });
      } catch {
        // Fail silently
      }
    }
  }

  /**
   * Check if browser Notification API or Service Worker Notification is supported
   */
  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'Notification' in window;
  }

  /**
   * Get current browser notification permission
   */
  getPermission(): NotificationPermission | 'unsupported' {
    if (!this.isSupported()) return 'unsupported';
    return Notification.permission;
  }

  /**
   * Request notification permission from browser
   */
  async requestPermission(): Promise<NotificationPermission | 'unsupported'> {
    if (!this.isSupported()) return 'unsupported';
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch {
      return Notification.permission;
    }
  }

  /**
   * Load notification settings from localStorage
   */
  getSettings(): AppNotificationSettings {
    if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_NOTIFICATION_SETTINGS,
          ...parsed,
          prayers: {
            ...DEFAULT_NOTIFICATION_SETTINGS.prayers,
            ...(parsed.prayers || {})
          }
        };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_NOTIFICATION_SETTINGS;
  }

  /**
   * Save notification settings to localStorage
   */
  saveSettings(settings: AppNotificationSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore localStorage quotas
    }
  }

  /**
   * Dispatch local browser notification directly without any server or backend.
   * Uses ServiceWorker showNotification if available (for Android Chrome / PWA compliance),
   * and falls back to standard new Notification() on desktop browsers.
   */
  async sendNotification(title: string, options?: NotificationOptions): Promise<NotificationResult> {
    if (!this.isSupported()) {
      return {
        success: false,
        error: 'unsupported',
        message: 'Notification API is not supported in this browser environment.'
      };
    }

    // 1. Ensure permission is granted, or request it on demand
    let currentPerm = Notification.permission;
    if (currentPerm !== 'granted') {
      try {
        currentPerm = await Notification.requestPermission();
      } catch (err: any) {
        return {
          success: false,
          error: 'permission_denied',
          message: err?.message || 'Notification permission request failed.'
        };
      }
    }

    if (currentPerm !== 'granted') {
      return {
        success: false,
        error: 'permission_denied',
        message: 'Notification permission was denied by user or browser.'
      };
    }

    // Clean options with valid existing app icon and navigation target metadata
    const cleanOptions: NotificationOptions = {
      icon: '/app-icon.png',
      badge: '/app-icon.png',
      silent: false,
      ...options,
      data: {
        tab: options?.data?.tab || 'home',
        section: options?.data?.section || '',
        url: options?.data?.url || '/?tab=home',
        ...(options?.data || {})
      }
    };

    // Strategy A: If Service Worker is registered, use reg.showNotification()
    // This is mandatory for Android Chrome where new Notification() throws TypeError (Illegal Constructor).
    if ('serviceWorker' in navigator) {
      try {
        const reg =
          (await navigator.serviceWorker.ready.catch(() => null)) ||
          (await navigator.serviceWorker.getRegistration().catch(() => null));

        if (reg && typeof reg.showNotification === 'function') {
          await reg.showNotification(title, cleanOptions);
          return { success: true };
        }
      } catch {
        // Fall back to Strategy B
      }
    }

    // Strategy B: Standard new Notification() constructor (Desktop Chrome, Firefox, Safari, Edge)
    try {
      const notif = new Notification(title, cleanOptions);
      notif.onclick = () => {
        window.focus();
        notif.close();
        const targetTab = cleanOptions.data?.tab || 'home';
        const targetSection = cleanOptions.data?.section || '';
        window.dispatchEvent(
          new CustomEvent('islamiq-navigate-tab', {
            detail: { tab: targetTab, section: targetSection }
          })
        );
      };
      return { success: true };
    } catch (notifErr: any) {
      // If direct constructor fails (e.g. in some mobile browsers), try registering SW dynamically
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          await reg.showNotification(title, cleanOptions);
          return { success: true };
        } catch (regErr: any) {
          return {
            success: false,
            error: 'failed',
            message: regErr?.message || notifErr?.message || 'Could not display local notification.'
          };
        }
      }

      return {
        success: false,
        error: 'failed',
        message: notifErr?.message || 'Could not display local notification.'
      };
    }
  }

  /**
   * Helper to format current date string YYYY-MM-DD
   */
  private getTodayDateStr(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Helper to get current local HH:MM (24-hour)
   */
  private getCurrentTimeString(): string {
    const d = new Date();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Trigger Daily Content Notification according to selected language and type
   */
  async triggerDailyContentNotification(
    lang: ContentLanguage,
    type?: DailyContentTypeOption
  ): Promise<boolean> {
    const todayStr = this.getTodayDateStr();
    const isUrdu = lang === 'urdu';
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    const verse = VERIFIED_QURAN_VERSES[dayIndex % VERIFIED_QURAN_VERSES.length];
    const hadith = VERIFIED_HADITHS[dayIndex % VERIFIED_HADITHS.length];
    const dua = VERIFIED_DUAS[dayIndex % VERIFIED_DUAS.length];
    const reminder = ISLAMIC_REMINDERS[dayIndex % ISLAMIC_REMINDERS.length];

    let title = '';
    let body = '';

    const selectedType = type || this.getSettings().dailyContentType;

    switch (selectedType) {
      case 'verse':
        title = isUrdu ? '📖 آج کی قرآنی آیت • IslamIQ' : '📖 Daily Quran Verse • IslamIQ';
        body = isUrdu
          ? `سورۃ ${verse.surahNameArabic} (${verse.surahNumber}:${verse.ayahNumber})\n"${verse.translationUrdu}"`
          : `Surah ${verse.surahNameEn} (${verse.surahNumber}:${verse.ayahNumber})\n"${verse.translationEn}"`;
        break;

      case 'hadith':
        title = isUrdu ? '📜 روزانہ کی حدیثِ مبارکہ • IslamIQ' : '📜 Daily Hadith • IslamIQ';
        body = isUrdu
          ? `${hadith.source} (${hadith.hadithNumber})\n"${hadith.textUrdu}"`
          : `${hadith.source} (${hadith.hadithNumber})\n"${hadith.textEn}"`;
        break;

      case 'dua':
        title = isUrdu ? '🤲 روزانہ کی مسنون دعا • IslamIQ' : '🤲 Daily Masnoon Dua • IslamIQ';
        body = isUrdu
          ? `${dua.titleUrdu} (${dua.reference})\n"${dua.translationUrdu}"`
          : `${dua.titleEn} (${dua.reference})\n"${dua.translationEn}"`;
        break;

      case 'reminder':
        title = isUrdu ? '✨ اسلامی نصیحت و عمل • IslamIQ' : '✨ Daily Islamic Reminder • IslamIQ';
        body = isUrdu
          ? `${reminder.titleUrdu}\n${reminder.practicalTipUrdu}`
          : `${reminder.titleEn}\n${reminder.practicalTipEn}`;
        break;

      case 'all':
      default:
        title = isUrdu ? '🌙 آج کا اسلامی پیغام • IslamIQ' : "🌙 Today's IslamIQ Reminder";
        body = isUrdu
          ? 'آج کی قرآنی آیت، حدیثِ مبارکہ اور مسنون دعا IslamIQ پر ملاحظہ فرمائیں۔'
          : "Read today's Quran Ayah, Hadith and Dua on IslamIQ.";
        break;
    }

    const res = await this.sendNotification(title, {
      body,
      tag: `islamiq-daily-${todayStr}`,
      data: {
        tab: 'home',
        section: 'daily',
        url: '/?tab=daily'
      }
    });

    if (res.success) {
      try {
        localStorage.setItem(LAST_DAILY_NOTIF_KEY, todayStr);
      } catch {}
      return true;
    }
    return false;
  }

  /**
   * Trigger Prayer Notification according to selected language
   */
  async triggerSalahNotification(
    prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha',
    lang: ContentLanguage
  ): Promise<boolean> {
    const todayStr = this.getTodayDateStr();
    const isUrdu = lang === 'urdu';

    const prayerDetails: Record<
      string,
      { titleUrdu: string; titleEn: string; bodyUrdu: string; bodyEn: string }
    > = {
      fajr: {
        titleUrdu: '🕌 وقتِ نمازِ فجر',
        titleEn: '🕌 Fajr Prayer Time',
        bodyUrdu: 'نمازِ فجر کا وقت ہو گیا ہے۔ الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ (نماز نیند سے بہتر ہے)۔',
        bodyEn: 'It is time for Fajr prayer. As-Salatu Khayrun Minan-Nawm (Prayer is better than sleep).'
      },
      dhuhr: {
        titleUrdu: '🕌 وقتِ نمازِ ظہر',
        titleEn: '🕌 Dhuhr Prayer Time',
        bodyUrdu: 'نمازِ ظہر کا وقت ہو گیا ہے۔ باجماعت نماز کا اہتمام فرمائیں۔',
        bodyEn: 'It is time for Dhuhr prayer. Take a break to connect with Allah.'
      },
      asr: {
        titleUrdu: '🕌 وقتِ نمازِ عصر',
        titleEn: '🕌 Asr Prayer Time',
        bodyUrdu: 'نمازِ عصر کا وقت ہو گیا ہے۔ حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ۔',
        bodyEn: 'It is time for Asr prayer. Guard strictly your middle prayer.'
      },
      maghrib: {
        titleUrdu: '🕌 وقتِ نمازِ مغرب',
        titleEn: '🕌 Maghrib Prayer Time',
        bodyUrdu: 'نمازِ مغرب کا وقت ہو گیا ہے۔ بروقت ادائیگی فرمائیں۔',
        bodyEn: 'It is time for Maghrib prayer. Sunset prayer has arrived.'
      },
      isha: {
        titleUrdu: '🕌 وقتِ نمازِ عشاء',
        titleEn: '🕌 Isha Prayer Time',
        bodyUrdu: 'نمازِ عشاء کا وقت ہو گیا ہے۔ سونے سے قبل نماز و وتر ادا فرمائیں۔',
        bodyEn: 'It is time for Isha prayer. Complete your day with worship.'
      }
    };

    const details = prayerDetails[prayerKey];
    if (!details) return false;

    const title = isUrdu ? details.titleUrdu : details.titleEn;
    const body = isUrdu ? details.bodyUrdu : details.bodyEn;

    const res = await this.sendNotification(title, {
      body,
      tag: `islamiq-salah-${prayerKey}-${todayStr}`,
      data: {
        tab: 'salah',
        section: 'salah',
        url: '/?tab=salah'
      }
    });

    if (res.success) {
      try {
        localStorage.setItem(`${LAST_SALAH_NOTIF_PREFIX}${prayerKey}`, todayStr);
      } catch {}
      return true;
    }
    return false;
  }

  /**
   * Immediate test notification with automatic permission request and direct browser delivery
   */
  async sendTestNotification(lang: ContentLanguage): Promise<NotificationResult> {
    const isUrdu = lang === 'urdu';
    const title = isUrdu ? '🔔 ٹیسٹ نوٹیفکیشن • IslamIQ' : '🔔 Test Notification • IslamIQ';
    const body = isUrdu
      ? 'ماشاءاللہ! آپ کے براؤزر کے نوٹیفکیشن درست طریقے سے فعال ہیں۔'
      : 'MashaAllah! Your IslamIQ browser notifications are working successfully.';

    return this.sendNotification(title, {
      body,
      tag: `islamiq-test-${Date.now()}`,
      data: {
        tab: 'home',
        section: 'home',
        url: '/?tab=home'
      }
    });
  }

  /**
   * Periodic scheduler: runs every minute while tab is active to check for due notifications
   */
  checkScheduled(lang: ContentLanguage): void {
    const settings = this.getSettings();
    if (!settings.enabled) return;
    if (this.getPermission() !== 'granted') return;

    const todayStr = this.getTodayDateStr();
    const currentHHMM = this.getCurrentTimeString();

    // 1. Check Daily Content Notification
    if (settings.dailyContentEnabled && settings.dailyContentTime === currentHHMM) {
      try {
        const lastSent = localStorage.getItem(LAST_DAILY_NOTIF_KEY);
        if (lastSent !== todayStr) {
          this.triggerDailyContentNotification(lang, settings.dailyContentType);
        }
      } catch {}
    }

    // 2. Check Salah Notifications
    if (settings.salahEnabled) {
      const prayers = settings.prayers;
      const prayerKeys: Array<'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'> = [
        'fajr',
        'dhuhr',
        'asr',
        'maghrib',
        'isha'
      ];

      for (const pKey of prayerKeys) {
        const pSetting = prayers[pKey];
        if (pSetting && pSetting.enabled && pSetting.time === currentHHMM) {
          try {
            const lastSent = localStorage.getItem(`${LAST_SALAH_NOTIF_PREFIX}${pKey}`);
            if (lastSent !== todayStr) {
              this.triggerSalahNotification(pKey, lang);
            }
          } catch {}
        }
      }
    }
  }
}

export const notificationService = new NotificationService();

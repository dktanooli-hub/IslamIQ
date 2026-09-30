import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { notificationService, DEFAULT_NOTIFICATION_SETTINGS } from '../services/notificationService';
import { AppNotificationSettings, DailyContentTypeOption } from '../types';
import {
  Bell,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Volume2,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  BookOpen,
  Send,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const { contentLang, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  const [settings, setSettings] = useState<AppNotificationSettings>(() =>
    notificationService.getSettings()
  );
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(() =>
    notificationService.getPermission()
  );
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  // Sync settings when modal opens
  useEffect(() => {
    if (isOpen) {
      setSettings(notificationService.getSettings());
      setPermission(notificationService.getPermission());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isSupported = notificationService.isSupported();

  const handleSave = (updated: AppNotificationSettings) => {
    setSettings(updated);
    notificationService.saveSettings(updated);
  };

  const handleMasterToggle = async () => {
    const nextState = !settings.enabled;

    // If enabling and permission is not granted yet, ask for permission
    if (nextState && permission !== 'granted') {
      setIsRequestingPermission(true);
      const permResult = await notificationService.requestPermission();
      setPermission(permResult);
      setIsRequestingPermission(false);

      if (permResult !== 'granted') {
        showToast(
          isUrdu
            ? 'نوٹیفکیشن کی اجازت نہیں دی گئی۔ براؤزر سیٹنگز چیک فرمائیں۔'
            : 'Notification permission was not granted by browser.'
        );
        return;
      }
    }

    const updated: AppNotificationSettings = {
      ...settings,
      enabled: nextState
    };
    handleSave(updated);
    showToast(
      nextState
        ? isUrdu
          ? 'نوٹیفکیشن کامیابی سے فعال ہو گئے'
          : 'Notifications enabled successfully'
        : isUrdu
        ? 'نوٹیفکیشن غیر فعال کر دیے گئے'
        : 'Notifications disabled'
    );
  };

  const handleRequestPermissionDirect = async () => {
    setIsRequestingPermission(true);
    const permResult = await notificationService.requestPermission();
    setPermission(permResult);
    setIsRequestingPermission(false);

    if (permResult === 'granted') {
      handleSave({ ...settings, enabled: true });
      showToast(isUrdu ? 'اجازت مل گئی! نوٹیفکیشن فعال ہیں' : 'Permission granted! Notifications active');
    } else {
      showToast(isUrdu ? 'براؤزر نے اجازت مسترد کر دی' : 'Permission was denied by browser');
    }
  };

  const handleDailyContentToggle = () => {
    handleSave({
      ...settings,
      dailyContentEnabled: !settings.dailyContentEnabled
    });
  };

  const handleDailyTimeChange = (time: string) => {
    handleSave({
      ...settings,
      dailyContentTime: time
    });
  };

  const handleDailyTypeChange = (type: DailyContentTypeOption) => {
    handleSave({
      ...settings,
      dailyContentType: type
    });
  };

  const handleSalahMasterToggle = () => {
    handleSave({
      ...settings,
      salahEnabled: !settings.salahEnabled
    });
  };

  const handlePrayerToggle = (prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha') => {
    handleSave({
      ...settings,
      prayers: {
        ...settings.prayers,
        [prayerKey]: {
          ...settings.prayers[prayerKey],
          enabled: !settings.prayers[prayerKey].enabled
        }
      }
    });
  };

  const handlePrayerTimeChange = (
    prayerKey: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha',
    time: string
  ) => {
    handleSave({
      ...settings,
      prayers: {
        ...settings.prayers,
        [prayerKey]: {
          ...settings.prayers[prayerKey],
          time
        }
      }
    });
  };

  const handleTestNotification = () => {
    if (permission !== 'granted') {
      showToast(
        isUrdu
          ? 'پہلے نوٹیفکیشن کی اجازت فعال فرمائیں'
          : 'Please enable notification permission first'
      );
      return;
    }
    const sent = notificationService.sendTestNotification(contentLang);
    if (sent) {
      showToast(isUrdu ? 'ٹیسٹ نوٹیفکیشن بھیج دیا گیا!' : 'Test notification sent!');
    } else {
      showToast(isUrdu ? 'نوٹیفکیشن بھیجنے میں رکاوٹ پیش آئی' : 'Failed to send test notification');
    }
  };

  const handleResetDefaults = () => {
    handleSave(DEFAULT_NOTIFICATION_SETTINGS);
    showToast(isUrdu ? 'ترتیبات دوبارہ اصل حالت پر بحال ہو گئیں' : 'Notification settings reset to defaults');
  };

  const prayerConfig: Array<{
    key: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
    nameEn: string;
    nameUrdu: string;
    icon: React.ElementType;
    iconColor: string;
  }> = [
    {
      key: 'fajr',
      nameEn: 'Fajr',
      nameUrdu: 'نمازِ فجر',
      icon: Sunrise,
      iconColor: 'text-amber-500 bg-amber-50'
    },
    {
      key: 'dhuhr',
      nameEn: 'Dhuhr',
      nameUrdu: 'نمازِ ظہر',
      icon: Sun,
      iconColor: 'text-yellow-600 bg-yellow-50'
    },
    {
      key: 'asr',
      nameEn: 'Asr',
      nameUrdu: 'نمازِ عصر',
      icon: Sun,
      iconColor: 'text-orange-500 bg-orange-50'
    },
    {
      key: 'maghrib',
      nameEn: 'Maghrib',
      nameUrdu: 'نمازِ مغرب',
      icon: Sunset,
      iconColor: 'text-rose-500 bg-rose-50'
    },
    {
      key: 'isha',
      nameEn: 'Isha',
      nameUrdu: 'نمازِ عشاء',
      icon: Moon,
      iconColor: 'text-indigo-500 bg-indigo-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-5">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                {isUrdu ? 'نوٹیفکیشن ترتیبات (Notification Settings)' : 'Notification Settings'}
              </h2>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'روزانہ اسلامی مواد اور اوقاتِ نماز کے یاد دہانی الرٹس' : 'Daily Islamic Reminders & Prayer Alerts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-6 pb-6 space-y-6">
          {/* Permission & Master Switch Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-slate-900 block">
                  {isUrdu ? 'نوٹیفکیشن الرٹس فعال کریں' : 'Enable Notifications'}
                </span>
                <span className="text-xs text-slate-500 block">
                  {settings.enabled && permission === 'granted'
                    ? isUrdu
                      ? 'الرٹس فعال ہیں'
                      : 'Active and scheduled'
                    : isUrdu
                    ? 'الرٹس غیر فعال ہیں'
                    : 'Currently disabled'}
                </span>
              </div>

              {/* Master Switch */}
              <button
                type="button"
                onClick={handleMasterToggle}
                disabled={isRequestingPermission}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  settings.enabled && permission === 'granted' ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    settings.enabled && permission === 'granted' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Permission Status Feedback */}
            {!isSupported ? (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  {isUrdu
                    ? 'آپ کے براؤزر میں نوٹیفکیشن سپورٹ دستیاب نہیں ہے۔'
                    : 'Your browser environment does not support the Web Notification API.'}
                </span>
              </div>
            ) : permission === 'denied' ? (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    {isUrdu ? 'براؤزر نے نوٹیفکیشن بلاک کر رکھی ہے' : 'Notifications Blocked by Browser'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isUrdu
                    ? 'براؤزر کے ایڈریس بار میں لاک (Lock) کے نشان پر کلک کر کے نوٹیفکیشن کی اجازت فعال فرمائیں۔'
                    : 'Click the lock icon in your browser address bar and change Notification permission to "Allow".'}
                </p>
              </div>
            ) : permission === 'default' ? (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    {isUrdu
                      ? 'نماز اور روزانہ اذکار کے لیے براؤزر کی اجازت درکار ہے۔'
                      : 'Browser permission is required to send prayer & daily alerts.'}
                  </span>
                </div>
                <button
                  onClick={handleRequestPermissionDirect}
                  disabled={isRequestingPermission}
                  className="px-3 py-1 rounded-lg bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-600 transition-colors shrink-0"
                >
                  {isUrdu ? 'اجازت دیں' : 'Allow Permission'}
                </button>
              </div>
            ) : null}

            {/* Test Notification Button */}
            {permission === 'granted' && (
              <div className="pt-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isUrdu ? 'ٹیسٹ نوٹیفکیشن بھیجیں' : 'Send Test Notification'}</span>
                </button>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isUrdu ? 'اجازت فعال ہے' : 'Permission Active'}</span>
                </span>
              </div>
            )}
          </div>

          {/* 1. Daily Islamic Content Notification */}
          <div className="p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isUrdu ? '۱. روزانہ کا اسلامی پیغام (Daily Content)' : '1. Daily Islamic Content Alert'}
                </h3>
              </div>

              <input
                type="checkbox"
                checked={settings.dailyContentEnabled}
                onChange={handleDailyContentToggle}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <p className="text-xs text-slate-500">
              {isUrdu
                ? 'ہر روز مقررہ وقت پر آج کی قرآنی آیت، حدیثِ مبارکہ، دعا یا نصیحت کا ایک الرٹ موصول کریں۔'
                : 'Receive a fresh daily reminder for today\'s Quran Ayah, Hadith, Dua, or Islamic advice.'}
            </p>

            {settings.dailyContentEnabled && (
              <div className="space-y-3 pt-1">
                {/* Time Picker */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{isUrdu ? 'اطلاع کا وقت (وقتِ یاد دہانی):' : 'Notification Time:'}</span>
                  </div>
                  <input
                    type="time"
                    value={settings.dailyContentTime}
                    onChange={(e) => handleDailyTimeChange(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Content Category Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    {isUrdu ? 'مواد کی قسم منتخب کریں:' : 'Content Type Selection:'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {[
                      { id: 'all' as const, labelEn: 'All (Combined)', labelUrdu: 'مکمل پیغام' },
                      { id: 'verse' as const, labelEn: 'Quran Ayah', labelUrdu: 'قرآنی آیت' },
                      { id: 'hadith' as const, labelEn: 'Hadith', labelUrdu: 'حدیثِ مبارکہ' },
                      { id: 'dua' as const, labelEn: 'Masnoon Dua', labelUrdu: 'مسنون دعا' },
                      { id: 'reminder' as const, labelEn: 'Reminder', labelUrdu: 'نصیحت' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleDailyTypeChange(opt.id)}
                        className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all border ${
                          settings.dailyContentType === opt.id
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isUrdu ? opt.labelUrdu : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Box */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                  <span className="font-bold text-amber-900 block">
                    {isUrdu ? 'نمونہ الرٹ (Example Preview):' : 'Notification Preview:'}
                  </span>
                  <p className="text-amber-950 font-semibold">
                    {isUrdu ? '🌙 آج کا اسلامی پیغام • IslamIQ' : "🌙 Today's IslamIQ Reminder"}
                  </p>
                  <p className="text-amber-800 text-[11px]">
                    {isUrdu
                      ? 'آج کی قرآنی آیت، حدیثِ مبارکہ اور مسنون دعا IslamIQ پر ملاحظہ فرمائیں۔'
                      : "Read today's Quran Ayah, Hadith and Dua on IslamIQ."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Salah Prayer Notifications */}
          <div className="p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isUrdu ? '۲. اوقاتِ نماز کے الرٹس (Salah Notifications)' : '2. Salah Prayer Notifications'}
                </h3>
              </div>

              <input
                type="checkbox"
                checked={settings.salahEnabled}
                onChange={handleSalahMasterToggle}
                className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            <p className="text-xs text-slate-500">
              {isUrdu
                ? 'ہر نماز کے لیے انفرادی وقت اور الرٹ مقرر کریں۔ آپ اپنی مقامی مسجد کے مطابق وقت تبدیل کر سکتے ہیں۔'
                : 'Enable or disable each prayer alert individually and set the exact time according to your local mosque.'}
            </p>

            {settings.salahEnabled && (
              <div className="space-y-2 pt-1">
                {prayerConfig.map((p) => {
                  const pSetting = settings.prayers[p.key];
                  const IconComp = p.icon;
                  return (
                    <div
                      key={p.key}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg ${p.iconColor}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {isUrdu ? p.nameUrdu : p.nameEn}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">
                            {pSetting.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="time"
                          value={pSetting.time}
                          onChange={(e) => handlePrayerTimeChange(p.key, e.target.value)}
                          disabled={!pSetting.enabled}
                          className={`px-2 py-1 rounded-lg border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            pSetting.enabled
                              ? 'bg-white border-slate-300 text-slate-800 cursor-pointer'
                              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        />
                        <input
                          type="checkbox"
                          checked={pSetting.enabled}
                          onChange={() => handlePrayerToggle(p.key)}
                          className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 cursor-pointer"
                          aria-label={`Toggle ${p.nameEn}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Important Web Limitation Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isUrdu ? 'اہم تکنیکی وضاحت (Browser Limitation)' : 'Browser Notification Notice'}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              {isUrdu
                ? 'یہ ویب نوٹیفکیشنز اس وقت بروقت موصول ہوں گے جب IslamIQ آپ کے براؤزر کے کسی ٹیب میں کھلا ہو یا پس منظر میں چل رہا ہو۔ اگر براؤزر مکمل بند ہو تو ویب پلیٹ فارم کی حدود کے باعث نوٹیفکیشن رک سکتے ہیں۔'
                : 'Web notifications trigger reliably while IslamIQ is open in a browser tab or running in the browser background. When the browser is completely terminated, background scheduling pauses until the browser is reopened.'}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'پہلے جیسے کریں' : 'Reset Defaults'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
            >
              {isUrdu ? 'محفوظ کریں' : 'Done'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

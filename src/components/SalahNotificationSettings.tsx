import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  BellOff,
  Volume2,
  VolumeX,
  Vibrate,
  Clock,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import {
  PrayerId,
  PrayerNotificationSettings,
  DEFAULT_PRAYER_SCHEDULE,
  loadPrayerNotificationSettings,
  savePrayerNotificationSettings,
  getNotificationPermission,
  requestNotificationPermission,
  sendTestPrayerNotification,
  DEFAULT_PRAYER_NOTIFICATION_SETTINGS
} from '../utils/prayerNotifications';
import { sounds } from '../utils/audio';

interface Props {
  contentLang: 'urdu' | 'english';
  isKids?: boolean;
  onClose?: () => void;
}

export const SalahNotificationSettings: React.FC<Props> = ({
  contentLang,
  isKids = false,
  onClose
}) => {
  const isUrdu = contentLang === 'urdu';
  const [settings, setSettings] = useState<PrayerNotificationSettings>(loadPrayerNotificationSettings);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>(getNotificationPermission);
  const [testStatus, setTestStatus] = useState<{ message: string; success: boolean } | null>(null);
  const [isPlayingAudioPreview, setIsPlayingAudioPreview] = useState(false);

  // Update permission state on mount and window focus
  useEffect(() => {
    setPermission(getNotificationPermission());
    const onFocus = () => setPermission(getNotificationPermission());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Save settings on changes
  const updateSettings = (updater: (prev: PrayerNotificationSettings) => PrayerNotificationSettings) => {
    setSettings(prev => {
      const next = updater(prev);
      savePrayerNotificationSettings(next);
      return next;
    });
  };

  const toggleMaster = () => {
    updateSettings(prev => {
      const newEnabled = !prev.enabled;
      // If user enables notifications and permission is default, ask for permission
      if (newEnabled && permission === 'default') {
        requestNotificationPermission().then(setPermission);
      }
      return { ...prev, enabled: newEnabled };
    });
  };

  const togglePrayer = (id: PrayerId) => {
    updateSettings(prev => ({
      ...prev,
      prayers: {
        ...prev.prayers,
        [id]: !prev.prayers[id]
      }
    }));
  };

  const toggleSound = () => {
    updateSettings(prev => ({ ...prev, sound: !prev.sound }));
  };

  const toggleVibrate = () => {
    updateSettings(prev => ({ ...prev, vibrate: !prev.vibrate }));
  };

  const setAdvanceMinutes = (mins: number) => {
    updateSettings(prev => ({ ...prev, advanceMinutes: mins }));
  };

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
  };

  const handleTestNotification = () => {
    const res = sendTestPrayerNotification(settings, isUrdu);
    setTestStatus(res);
    setTimeout(() => {
      setTestStatus(null);
    }, 4500);
  };

  const handlePlaySoundPreview = () => {
    setIsPlayingAudioPreview(true);
    sounds.playPrayerNotificationChime();
    setTimeout(() => {
      setIsPlayingAudioPreview(false);
    }, 1200);
  };

  const handleResetDefaults = () => {
    setSettings(DEFAULT_PRAYER_NOTIFICATION_SETTINGS);
    savePrayerNotificationSettings(DEFAULT_PRAYER_NOTIFICATION_SETTINGS);
    setTestStatus({
      success: true,
      message: isUrdu ? 'ترتیبات کو اصل حالت پر بحال کر دیا گیا' : 'Settings restored to defaults'
    });
    setTimeout(() => setTestStatus(null), 3000);
  };

  const prayerIcons: Record<PrayerId, React.ComponentType<{ className?: string }>> = {
    fajr: Sunrise,
    dhuhr: Sun,
    asr: Sun,
    maghrib: Sunset,
    isha: Moon,
    tahajjud: Sparkles
  };

  return (
    <div className={`rounded-3xl border transition-all shadow-md overflow-hidden ${
      isKids
        ? 'bg-teal-50/90 border-teal-300'
        : 'bg-white border-emerald-200/90'
    }`}>
      {/* Panel Header */}
      <div className={`p-5 sm:p-6 border-b flex items-center justify-between ${
        isKids
          ? 'bg-gradient-to-r from-teal-700 to-teal-800 text-white border-teal-600'
          : 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white border-emerald-700/60'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20 text-amber-300">
            {settings.enabled ? (
              <BellRing className="w-6 h-6 animate-pulse" />
            ) : (
              <BellOff className="w-6 h-6 text-slate-300" />
            )}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              <span>{isUrdu ? 'نماز کے اوقات کے نوٹیفیکیشن' : 'Prayer Time Notifications'}</span>
            </h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              {isUrdu
                ? 'نماز کے وقت بروقت یاد دہانی اور الرٹس'
                : 'Timely reminders for every prayer on your device'}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Master Toggle Banner */}
        <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
          settings.enabled
            ? 'bg-emerald-50/90 border-emerald-300 shadow-2xs'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              settings.enabled
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-200 text-slate-600'
            }`}>
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {isUrdu ? 'تمام نمازوں کے نوٹیفیکیشن' : 'Prayer Reminders Master'}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  settings.enabled
                    ? 'bg-emerald-200 text-emerald-900'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {settings.enabled ? (isUrdu ? 'فعال' : 'ACTIVE') : (isUrdu ? 'بند' : 'OFF')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {settings.enabled
                  ? (isUrdu ? 'مقررہ اوقات پر الرٹس بھیجے جائیں گے' : 'Notifications will trigger at scheduled times')
                  : (isUrdu ? 'تمام نمازوں کے الرٹس موقوف ہیں' : 'All prayer alerts are currently muted')}
              </p>
            </div>
          </div>

          {/* Master Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            onClick={toggleMaster}
            className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
              settings.enabled ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                settings.enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Browser Permission Alert Banner */}
        {settings.enabled && (
          <div>
            {permission === 'default' && (
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      {isUrdu ? 'ڈیوائس کی اجازت درکار ہے:' : 'Browser Permission Needed:'}
                    </span>
                    <p className="text-amber-800 text-[11px] mt-0.5">
                      {isUrdu
                        ? 'فون یا لیپ ٹاپ پر نوٹیفکیشن دکھانے کے لیے براہ کرم اجازت دیں۔'
                        : 'Allow notifications so IslamIQ can notify you when prayer time begins.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shrink-0 shadow-2xs"
                >
                  {isUrdu ? 'اجازت دیں (Allow)' : 'Allow Notifications'}
                </button>
              </div>
            )}

            {permission === 'denied' && (
              <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {isUrdu ? 'نوٹیفیکیشن بلاک ہیں:' : 'Notifications Blocked by Browser:'}
                  </span>
                  <p className="text-rose-800 text-[11px] mt-0.5">
                    {isUrdu
                      ? 'آپ کے براؤزر نے نوٹیفیکیشنز روک رکھی ہیں۔ ویب سائٹ ایڈریس بار میں تالے (Lock) کے نشان پر کلک کر کے Notifications کی اجازت دیں۔'
                      : 'Notifications are blocked in your browser settings. Please click the lock icon in the address bar to allow notifications for this site.'}
                  </p>
                </div>
              </div>
            )}

            {permission === 'granted' && (
              <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">
                    {isUrdu
                      ? 'ڈیوائس اور براؤزر الرٹس فعال ہیں'
                      : 'Device and system alerts are enabled'}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  {isUrdu ? 'منظور شدہ' : 'Granted'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Individual Prayer Toggles */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isUrdu ? 'انفرادی نمازوں کے نوٹیفیکیشن:' : 'Individual Prayer Toggles:'}</span>
            </h3>
            <span className="text-[11px] text-slate-500">
              {isUrdu ? 'مخصوص نماز کو آن یا آف کریں' : 'Customize per prayer'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEFAULT_PRAYER_SCHEDULE.map(prayer => {
              const IconComp = prayerIcons[prayer.id] || Sun;
              const isPrayerOn = settings.enabled && !!settings.prayers[prayer.id];

              return (
                <div
                  key={prayer.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isPrayerOn
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isPrayerOn
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {isUrdu ? prayer.nameUrdu : prayer.nameEn}
                        </span>
                        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded-sm arabic-text">
                          {prayer.nameArabic}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                        {prayer.time12}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    disabled={!settings.enabled}
                    aria-checked={isPrayerOn}
                    onClick={() => togglePrayer(prayer.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden disabled:opacity-40 disabled:cursor-not-allowed ${
                      isPrayerOn ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        isPrayerOn ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timing, Sound & Vibration Preferences */}
        <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 space-y-3.5">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {isUrdu ? 'الرٹ ترتیبات اور ترجیحات' : 'Reminder Preferences'}
          </h3>

          {/* Advance Reminder Option */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 block">
              {isUrdu ? 'یاد دہانی کا وقت:' : 'Reminder Timing:'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { mins: 0, labelEn: 'Exact Time', labelUrdu: 'عین وقت پر' },
                { mins: 10, labelEn: '10m Before', labelUrdu: '10 منٹ پہلے' },
                { mins: 15, labelEn: '15m Before', labelUrdu: '15 منٹ پہلے' }
              ].map(opt => (
                <button
                  key={opt.mins}
                  type="button"
                  onClick={() => setAdvanceMinutes(opt.mins)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                    settings.advanceMinutes === opt.mins
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isUrdu ? opt.labelUrdu : opt.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {/* Sound alert toggle */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${settings.sound ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                  {settings.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {isUrdu ? 'آواز / چائم' : 'Sound / Chime'}
                  </span>
                  <button
                    type="button"
                    onClick={handlePlaySoundPreview}
                    className="text-[10px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 mt-0.5"
                  >
                    <Play className={`w-2.5 h-2.5 ${isPlayingAudioPreview ? 'animate-spin' : ''}`} />
                    <span>{isUrdu ? 'آواز سنیں' : 'Preview audio'}</span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.sound}
                onClick={toggleSound}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  settings.sound ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    settings.sound ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Vibration toggle */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${settings.vibrate ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}`}>
                  <Vibrate className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {isUrdu ? 'موبائل وائبریشن' : 'Vibration'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isUrdu ? 'سپورٹ شدہ فونز' : 'Supported phones'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.vibrate}
                onClick={toggleVibrate}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  settings.vibrate ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    settings.vibrate ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Test Notification & Actions */}
        <div className="space-y-2 pt-1">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              type="button"
              onClick={handleTestNotification}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <BellRing className="w-4 h-4" />
              <span>{isUrdu ? 'ٹیسٹ نوٹیفکیشن بھیجیں' : 'Send Test Notification'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'اصل بحال کریں' : 'Reset'}</span>
            </button>
          </div>

          {testStatus && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 transition-all ${
              testStatus.success
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}>
              {testStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              <span>{testStatus.message}</span>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-[11px] text-slate-500 text-center px-2">
          {isUrdu
            ? 'نوٹ: نماز کے الرٹس آپ کے براؤزر اور فون پر کام کرتے ہیں۔ ایپلیکیشن کھولے رکھنے پر باقاعدہ یاد دہانی ملتی ہے۔'
            : 'Note: Prayer reminders work via your browser and device. Keeping IslamIQ open in background ensures continuous alerts.'}
        </p>
      </div>
    </div>
  );
};

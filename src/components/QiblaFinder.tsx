import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  calculateQiblaBearing,
  calculateDistanceToKaaba,
  getCompassDirectionLabel,
  getAngularDifference,
  POPULAR_CITIES,
  CityData,
  Coordinates,
  KAABA_COORDINATES,
  requestOrientationPermission
} from '../utils/qibla';
import {
  Compass,
  MapPin,
  RotateCcw,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Search,
  Sparkles,
  Sliders,
  HelpCircle,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { AdBanner } from './AdBanner';
import { AD_CONFIG } from '../config/adConfig';

interface QiblaFinderProps {
  onBack?: () => void;
}

export const QiblaFinder: React.FC<QiblaFinderProps> = ({ onBack }) => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  // Location State
  const [coords, setCoords] = useState<Coordinates | null>(() => {
    // Default fallback to Karachi for initial rendering if waiting for GPS
    return { latitude: 24.8607, longitude: 67.0011 };
  });
  const [locationName, setLocationName] = useState<string>('Karachi (Default / طے شدہ)');
  const [locationSource, setLocationSource] = useState<'gps' | 'city' | 'default'>('default');
  const [locationStatus, setLocationStatus] = useState<'prompt' | 'granted' | 'denied' | 'loading' | 'unsupported'>('prompt');
  const [locationError, setLocationError] = useState<string | null>(null);

  // Compass Sensor State
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [hasCompassSensor, setHasCompassSensor] = useState<boolean | null>(null);
  const [isDeviceFlat, setIsDeviceFlat] = useState<boolean>(true);
  const [manualHeading, setManualHeading] = useState<number>(0);
  const [isManualHeadingMode, setIsManualHeadingMode] = useState<boolean>(false);
  const [needsPermission, setNeedsPermission] = useState<boolean>(false);

  // UI Modals / Toggles
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isCalibrationOpen, setIsCalibrationOpen] = useState<boolean>(false);
  const [searchCityQuery, setSearchCityQuery] = useState<string>('');
  const [customLat, setCustomLat] = useState<string>('');
  const [customLon, setCustomLon] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Ref to prevent continuous haptic / sound triggers
  const lastVibrationTimeRef = useRef<number>(0);
  const watchIdRef = useRef<number | null>(null);

  // Computed Qibla Values
  const qiblaBearing = coords ? calculateQiblaBearing(coords.latitude, coords.longitude) : 0;
  const distanceKm = coords ? calculateDistanceToKaaba(coords.latitude, coords.longitude) : 0;
  const qiblaDirectionLabel = getCompassDirectionLabel(qiblaBearing, isUrdu ? 'urdu' : 'english');

  // Effective Heading
  const effectiveHeading = (hasCompassSensor && deviceHeading !== null && !isManualHeadingMode)
    ? deviceHeading
    : manualHeading;

  // Angular difference between current heading and Qibla (-180 to +180)
  const angleDiff = getAngularDifference(qiblaBearing, effectiveHeading);
  const isAligned = Math.abs(angleDiff) <= 3.5;

  // Trigger haptic & sound when aligned
  useEffect(() => {
    if (isAligned) {
      const now = Date.now();
      if (now - lastVibrationTimeRef.current > 3000) {
        lastVibrationTimeRef.current = now;
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([40, 40, 40]);
          } catch {}
        }
        if (soundEnabled) {
          try {
            sounds.playKidsCheerful();
          } catch {}
        }
      }
    }
  }, [isAligned, soundEnabled]);

  // Request GPS Location
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      setLocationError(
        isUrdu
          ? 'اس براؤزر میں جیو لوکیشن سپورٹ دستیاب نہیں ہے۔ برائے مہربانی نیچے سے اپنا شہر منتخب کریں۔'
          : 'Geolocation is not supported by your browser. Please select your city manually below.'
      );
      return;
    }

    setLocationStatus('loading');
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
        setLocationStatus('granted');
        setLocationSource('gps');
        setLocationName(
          isUrdu
            ? `موجودہ مقام (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`
            : `Current GPS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`
        );
        showToast(isUrdu ? 'مقام کامیابی سے حاصل ہو گیا!' : 'GPS Location detected successfully!');
      },
      (error) => {
        setLocationStatus('denied');
        let errMsg = isUrdu
          ? 'لوکیشن کی اجازت نہیں ملی۔ آپ اپنا شہر دستی طور پر منتخب کر سکتے ہیں۔'
          : 'Location permission was denied. You can select your city manually.';
        if (error.code === error.TIMEOUT) {
          errMsg = isUrdu
            ? 'لوکیشن ٹائم آؤٹ ہو گیا۔ براہ کرم شہر منتخب کریں۔'
            : 'Location request timed out. Please choose your city manually.';
        }
        setLocationError(errMsg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [isUrdu, showToast]);

  // Automatic initial location prompt attempt
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Set manual city
  const handleSelectCity = (city: CityData) => {
    setCoords({ latitude: city.latitude, longitude: city.longitude });
    setLocationName(isUrdu ? `${city.nameUrdu}، ${city.countryUrdu}` : `${city.nameEn}, ${city.countryEn}`);
    setLocationSource('city');
    setLocationStatus('granted');
    setLocationError(null);
    setIsCityModalOpen(false);
    showToast(isUrdu ? `${city.nameUrdu} کا قبلہ رخ سیٹ ہو گیا` : `Qibla set for ${city.nameEn}`);
  };

  // Custom coordinates submit
  const handleCustomCoordsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lon = parseFloat(customLon);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      showToast(isUrdu ? 'براہ کرم درست نقاط (Latitude / Longitude) درج کریں' : 'Please enter valid coordinates');
      return;
    }
    setCoords({ latitude: lat, longitude: lon });
    setLocationName(isUrdu ? `کسٹم مقام (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)` : `Custom (${lat.toFixed(2)}°, ${lon.toFixed(2)}°)`);
    setLocationSource('city');
    setLocationStatus('granted');
    setIsCityModalOpen(false);
    showToast(isUrdu ? 'نئے نقاط کا قبلہ رخ سیٹ ہو گیا' : 'Custom coordinates applied');
  };

  // Setup Device Orientation Listener
  useEffect(() => {
    let hasReceivedEvent = false;

    // Check if iOS 13+ permission required
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as any) !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsPermission(true);
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      hasReceivedEvent = true;
      setHasCompassSensor(true);

      // Check tilt: beta (front-to-back tilt in [-180, 180]), gamma (left-to-right tilt in [-90, 90])
      if (e.beta !== null && e.gamma !== null) {
        const isFlat = Math.abs(e.beta) <= 45 && Math.abs(e.gamma) <= 45;
        setIsDeviceFlat(isFlat);
      }

      let heading: number | null = null;

      // 1. iOS compass heading
      if ((e as any).webkitCompassHeading !== undefined && (e as any).webkitCompassHeading !== null) {
        heading = (e as any).webkitCompassHeading;
      }
      // 2. Standard absolute alpha orientation (Chrome / Android)
      else if (e.alpha !== null && e.absolute) {
        // When screen is facing sky, alpha rotates counter-clockwise from North
        heading = (360 - e.alpha) % 360;
      } else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        // Smooth rounding to nearest integer to avoid minute vibration flicker
        setDeviceHeading(Math.round(heading));
      }
    };

    // Try absolute event first, fallback to regular
    const win = window as any;
    if ('ondeviceorientationabsolute' in win) {
      win.addEventListener('deviceorientationabsolute', handleOrientation, true);
    } else if ('ondeviceorientation' in win) {
      win.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Timeout check: if no event received within 1.5 seconds, device likely lacks hardware sensor
    const timer = setTimeout(() => {
      if (!hasReceivedEvent) {
        setHasCompassSensor(false);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      const win = window as any;
      if ('ondeviceorientationabsolute' in win) {
        win.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      }
      if ('ondeviceorientation' in win) {
        win.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Request iOS 13+ motion permission
  const handleRequestMotionPermission = async () => {
    const result = await requestOrientationPermission();
    if (result === 'granted') {
      setNeedsPermission(false);
      showToast(isUrdu ? 'کمپاس سینسر فعال ہو گیا!' : 'Compass sensor enabled!');
    } else {
      showToast(isUrdu ? 'سینسر کی اجازت مسترد کر دی گئی' : 'Sensor permission denied');
    }
  };

  // Filter popular cities
  const filteredCities = POPULAR_CITIES.filter((city) => {
    const q = searchCityQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      city.nameEn.toLowerCase().includes(q) ||
      city.nameUrdu.includes(q) ||
      city.countryEn.toLowerCase().includes(q) ||
      city.countryUrdu.includes(q)
    );
  });

  // Calculate needle and compass rotation styles
  // When device rotates, the dial rotates counter to heading so North stays pointing to true North,
  // OR the needle points toward the Kaaba relative to the phone's top.
  // Standard phone compass representation:
  // Top of phone is user's current heading.
  // Kaaba angle relative to phone top = (qiblaBearing - effectiveHeading)
  const relativeKaabaAngle = (qiblaBearing - effectiveHeading + 360) % 360;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 pb-20">
      
      {/* Top App Bar with Back & Helper Actions */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
              title={isUrdu ? 'واپس جائیں' : 'Go Back'}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-goldAccent flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {isUrdu ? 'قبلہ رخ کمپاس' : 'Qibla Compass'}
              </h1>
              <p className="text-[11px] text-emerald-800 font-bold">
                {isUrdu ? 'کعبۃ اللہ شریف کی درست سمت' : 'Direction to Holy Kaaba'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Sound & Calibration */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all border border-slate-200"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
          <button
            onClick={() => setIsCalibrationOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all border border-slate-200 flex items-center gap-1"
            title={isUrdu ? 'کیلیبریشن رہنمائی' : 'Calibration Guide'}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span className="text-[11px] font-bold hidden sm:inline">
              {isUrdu ? 'کیلیبریشن' : 'Calibrate'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Instruction Banner (MANDATORY REQUIREMENT) */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 text-center relative overflow-hidden shadow-xs ${
          isAligned
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border-emerald-400 ring-4 ring-emerald-200/50'
            : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 text-emerald-950 border-emerald-200'
        }`}
      >
        {isAligned ? (
          <div className="flex flex-col items-center justify-center animate-bounce duration-700">
            <div className="flex items-center gap-2 text-base sm:text-lg font-black tracking-wide">
              <CheckCircle2 className="w-6 h-6 text-yellow-300 fill-emerald-800" />
              <span>{isUrdu ? 'ماشاءاللہ! آپ قبلہ رخ ہیں!' : "Masha'Allah! You are facing the Qibla!"}</span>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="text-xs text-emerald-100 font-semibold mt-0.5">
              {isUrdu ? 'نماز اور دعا کے لیے رخ بالکل درست ہے' : 'Your device is accurately aligned towards the Holy Kaaba'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm sm:text-base font-black text-emerald-950 flex items-center justify-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>
                {isUrdu
                  ? 'اپنا فون سیدھا رکھیں اور Qibla کی سمت گھمائیں۔'
                  : 'Hold your phone flat and rotate towards the Qibla.'}
              </span>
            </p>
            {hasCompassSensor && !isDeviceFlat && (
              <p className="text-xs font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-3 py-0.5 rounded-full mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {isUrdu
                    ? 'بہترین نتائج کے لیے فون کو بالکل سیدھا اور ہموار (Flat) رکھیں'
                    : 'For highest accuracy, keep your phone flat horizontally'}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* iOS Motion Permission Request Banner */}
      {needsPermission && (
        <div className="bg-amber-50 border-2 border-amber-300 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-amber-950">
          <div className="text-xs sm:text-sm font-semibold">
            {isUrdu
              ? 'iOS ڈیوائسز پر کمپاس سینسر کے لیے اجازت درکار ہوتی ہے۔'
              : 'iOS requires permission to access the device compass sensor.'}
          </div>
          <button
            onClick={handleRequestMotionPermission}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 shrink-0"
          >
            {isUrdu ? 'اجازت دیں' : 'Allow Sensor'}
          </button>
        </div>
      )}

      {/* Location Status Bar & City Switcher */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`p-2 rounded-xl shrink-0 ${
            locationStatus === 'loading'
              ? 'bg-amber-100 text-amber-700 animate-spin'
              : locationSource === 'gps'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-teal-100 text-teal-800'
          }`}>
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 truncate">
                {locationName}
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                locationSource === 'gps'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {locationSource === 'gps' ? 'GPS Live' : isUrdu ? 'دستی' : 'Manual'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {isUrdu ? 'مکہ مکرمہ سے فاصلہ:' : 'Distance to Kaaba:'}{' '}
              <strong className="text-slate-700">{distanceKm.toLocaleString()} km</strong>
            </p>
          </div>
        </div>

        {/* Change City or Refresh GPS */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-1 border border-slate-200"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'شہر تبدیل کریں' : 'Change City'}</span>
          </button>
          <button
            onClick={requestLocation}
            disabled={locationStatus === 'loading'}
            title={isUrdu ? 'GPS دوبارہ چیک کریں' : 'Refresh GPS'}
            className="p-2 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 rounded-xl transition-all border border-emerald-200 disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${locationStatus === 'loading' ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Location Error Notice with Quick Action */}
      {locationError && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{locationError}</p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                {isUrdu
                  ? 'پریشان نہ ہوں، آپ اوپر "شہر تبدیل کریں" سے پاکستان یا دنیا کے کسی بھی شہر کا انتخاب کر سکتے ہیں!'
                  : "Don't worry, select your city from the button above to get accurate Qibla!"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg text-xs shrink-0 active:scale-95"
          >
            {isUrdu ? 'شہر چنیں' : 'Select City'}
          </button>
        </div>
      )}

      {/* SENSOR STATUS NOTICE: IF NO COMPASS SENSOR ON DEVICE (e.g. Desktop PC) */}
      {hasCompassSensor === false && !isManualHeadingMode && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 text-xs text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600 shrink-0" />
            <div>
              <p className="font-bold">
                {isUrdu
                  ? 'اس ڈیوائس پر کمپاس سینسر دستیاب نہیں ہے (ڈیسک ٹاپ / بغیر میگنیٹومیٹر)'
                  : 'Compass sensor not detected on this device (Desktop / Laptop)'}
              </p>
              <p className="text-[11px] text-sky-800">
                {isUrdu
                  ? `آپ کا قبلہ رخ بالکل درست ${qiblaBearing}° (${qiblaDirectionLabel.label}) پر واقع ہے۔`
                  : `Your exact Qibla bearing is ${qiblaBearing}° (${qiblaDirectionLabel.label}) from True North.`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsManualHeadingMode(true)}
            className="px-3 py-1 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold rounded-xl text-xs flex items-center gap-1 shrink-0"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'دستی موڈ آزمائیں' : 'Manual Heading Slider'}</span>
          </button>
        </div>
      )}

      {/* Manual Heading Slider Mode for Desktop Testing or Orientation Tuning */}
      {isManualHeadingMode && (
        <div className="bg-slate-100 rounded-2xl p-3 border border-slate-300 text-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              {isUrdu ? 'دستی اینگل ایڈجسٹر (Manual Heading Mode)' : 'Manual Heading Simulator'}
            </span>
            <button
              onClick={() => setIsManualHeadingMode(false)}
              className="text-slate-500 hover:text-slate-800 text-[11px] underline"
            >
              {isUrdu ? 'بند کریں' : 'Reset to Sensor'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 w-10 text-right">{manualHeading}°</span>
            <input
              type="range"
              min="0"
              max="359"
              value={manualHeading}
              onChange={(e) => setManualHeading(parseInt(e.target.value))}
              className="flex-1 accent-emerald-600 cursor-pointer"
            />
            <button
              onClick={() => setManualHeading(Math.round(qiblaBearing))}
              className="px-2 py-1 text-[10px] font-bold bg-emerald-600 text-white rounded-lg active:scale-95"
            >
              {isUrdu ? 'قبلہ پر لائیں' : 'Align Qibla'}
            </button>
          </div>
        </div>
      )}

      {/* THE PROMINENT INTERACTIVE QIBLA COMPASS */}
      <div className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl border-2 border-emerald-700/50 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
        
        {/* Subtle Ambient Radial Glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isAligned
              ? 'opacity-80 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35)_0%,rgba(6,78,59,0.1)_60%,transparent_100%)]'
              : 'opacity-40 bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.15)_0%,transparent_70%)]'
          }`}
        />

        {/* Top Direction Indicator of the Phone */}
        <div className="relative z-10 flex flex-col items-center mb-3">
          <div className={`w-3 h-3 rotate-45 border-t-2 border-l-2 transition-colors duration-300 ${
            isAligned ? 'border-yellow-300 shadow-[0_0_12px_#FDE047]' : 'border-emerald-400'
          }`} />
          <span className="text-[10px] uppercase font-black tracking-widest text-emerald-300 mt-1">
            {isUrdu ? 'فون کا رخ' : 'Device Facing'}
          </span>
        </div>

        {/* The Giant Compass Disc */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
          
          {/* Glowing Alignment Outer Halo Ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isAligned
                ? 'border-4 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.8)] scale-105 animate-pulse'
                : 'border border-emerald-600/30'
            }`}
          />

          {/* SVG Rotating Dial: Rotates opposite to effectiveHeading so North stays true */}
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `rotate(${-effectiveHeading}deg)`,
            }}
          >
            {/* Outer Circular Rim */}
            <circle cx="150" cy="150" r="144" fill="none" stroke="#059669" strokeWidth="2" strokeOpacity="0.4" />
            <circle cx="150" cy="150" r="138" fill="#064E3B" fillOpacity="0.3" stroke="#047857" strokeWidth="1" />

            {/* 360 Degree Tick Marks (every 5° small, every 30° major) */}
            {Array.from({ length: 72 }).map((_, i) => {
              const deg = i * 5;
              const isMajor = deg % 30 === 0;
              const isCardinal = deg % 90 === 0;
              const r1 = 138;
              const r2 = isCardinal ? 122 : isMajor ? 126 : 132;
              const rad = (deg * Math.PI) / 180;
              const x1 = 150 + r1 * Math.sin(rad);
              const y1 = 150 - r1 * Math.cos(rad);
              const x2 = 150 + r2 * Math.sin(rad);
              const y2 = 150 - r2 * Math.cos(rad);

              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isCardinal ? '#FBBF24' : isMajor ? '#34D399' : '#059669'}
                  strokeWidth={isCardinal ? 2.5 : isMajor ? 1.8 : 1}
                  strokeOpacity={isMajor ? 0.9 : 0.4}
                />
              );
            })}

            {/* Degree Number Labels every 30° */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              // Position slightly inside
              const rad = (deg * Math.PI) / 180;
              const x = 150 + 112 * Math.sin(rad);
              const y = 150 - 112 * Math.cos(rad);

              // Don't draw numbers over cardinal points N, E, S, W
              if (deg % 90 === 0) return null;

              return (
                <text
                  key={`num-${deg}`}
                  x={x}
                  y={y + 3}
                  fill="#6EE7B7"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  transform={`rotate(${deg}, ${x}, ${y})`}
                >
                  {deg}°
                </text>
              );
            })}

            {/* Cardinal Markers: North (شمال / N in Red/Gold), East, South, West */}
            {/* North (0°) */}
            <g transform="translate(150, 42)">
              <circle cx="0" cy="0" r="14" fill="#DC2626" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="11" fontWeight="900" textAnchor="middle">
                N
              </text>
              <text x="0" y="-18" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle">
                {isUrdu ? 'شمال' : 'North'}
              </text>
            </g>

            {/* East (90°) */}
            <g transform="translate(258, 150)">
              <circle cx="0" cy="0" r="12" fill="#047857" fillOpacity="0.8" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">
                E
              </text>
              <text x="18" y="4" fill="#6EE7B7" fontSize="8" fontWeight="bold" textAnchor="middle">
                {isUrdu ? 'مشرق' : ''}
              </text>
            </g>

            {/* South (180°) */}
            <g transform="translate(150, 258)">
              <circle cx="0" cy="0" r="12" fill="#047857" fillOpacity="0.8" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">
                S
              </text>
              <text x="0" y="16" fill="#6EE7B7" fontSize="8" fontWeight="bold" textAnchor="middle">
                {isUrdu ? 'جنوب' : ''}
              </text>
            </g>

            {/* West (270°) */}
            <g transform="translate(42, 150)">
              <circle cx="0" cy="0" r="12" fill="#047857" fillOpacity="0.8" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="900" textAnchor="middle">
                W
              </text>
              <text x="-18" y="4" fill="#6EE7B7" fontSize="8" fontWeight="bold" textAnchor="middle">
                {isUrdu ? 'مغرب' : ''}
              </text>
            </g>

            {/* THE SACRED KAABA INDICATOR ON THE DIAL AT EXACT QIBLA BEARING */}
            <g transform={`rotate(${qiblaBearing}, 150, 150)`}>
              {/* Radial Pointer Line extending to edge */}
              <line
                x1="150"
                y1="150"
                x2="150"
                y2="28"
                stroke={isAligned ? '#FBBF24' : '#10B981'}
                strokeWidth={isAligned ? '3' : '2'}
                strokeDasharray="4 2"
              />

              {/* Kaaba Marker Bubble */}
              <g transform="translate(150, 26)">
                {/* Glowing halo when aligned */}
                {isAligned && (
                  <circle cx="0" cy="0" r="22" fill="#FBBF24" fillOpacity="0.35" className="animate-ping" />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r="18"
                  fill="#000000"
                  stroke={isAligned ? '#FDE047' : '#FBBF24'}
                  strokeWidth="2.5"
                />

                {/* Kaaba Vector Representation */}
                {/* Cube body */}
                <rect x="-8" y="-7" width="16" height="15" fill="#18181B" rx="1.5" />
                {/* Kiswah Gold Belt (حزام الكعبة) */}
                <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#FBBF24" strokeWidth="2" />
                {/* Kaaba Door in Gold */}
                <rect x="0" y="0" width="4" height="7" fill="#FBBF24" rx="0.5" />
                {/* Golden Roof Edge */}
                <line x1="-8" y1="-7" x2="8" y2="-7" stroke="#CA8A04" strokeWidth="1" />
              </g>

              {/* Label above Kaaba Marker */}
              <text
                x="150"
                y="54"
                fill="#FDE047"
                fontSize="8.5"
                fontWeight="900"
                textAnchor="middle"
                className="select-none"
              >
                QIBLA
              </text>
            </g>

            {/* Center Decorative Crosshair */}
            <circle cx="150" cy="150" r="6" fill="#10B981" />
            <circle cx="150" cy="150" r="3" fill="#FFFFFF" />
          </svg>

          {/* Central Golden Arrow Overlay pointing directly to Kaaba */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-200 ease-out"
            style={{
              transform: `rotate(${relativeKaabaAngle}deg)`,
            }}
          >
            {/* Elegant Pointer Needle */}
            <div className="relative w-8 h-48 sm:w-10 sm:h-56 flex flex-col items-center justify-between">
              {/* Top Qibla Needle Head */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[28px] transition-all duration-300 ${
                    isAligned
                      ? 'border-b-yellow-400 filter drop-shadow-[0_0_10px_#FDE047]'
                      : 'border-b-emerald-400 filter drop-shadow-[0_0_6px_#10B981]'
                  }`}
                />
                <div
                  className={`w-1.5 h-16 ${
                    isAligned ? 'bg-yellow-400' : 'bg-emerald-400'
                  }`}
                />
              </div>

              {/* Center Ring */}
              <div
                className={`w-10 h-10 rounded-full border-2 bg-slate-950 flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isAligned ? 'border-yellow-300 ring-4 ring-yellow-400/40' : 'border-emerald-400'
                }`}
              >
                <Compass
                  className={`w-5 h-5 ${isAligned ? 'text-yellow-300 animate-spin' : 'text-emerald-300'}`}
                />
              </div>

              {/* Bottom Counterweight Pointer */}
              <div className="flex flex-col items-center">
                <div className="w-1.5 h-12 bg-slate-600/70" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[14px] border-t-slate-600/70" />
              </div>
            </div>
          </div>

        </div>

        {/* Live Bearing Telemetry Card */}
        <div className="relative z-10 mt-5 w-full max-w-sm grid grid-cols-2 gap-2.5">
          {/* Target Qibla Bearing */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
            <span className="text-[10px] uppercase font-extrabold text-emerald-300 block">
              {isUrdu ? 'مطلوبہ قبلہ رخ' : 'Qibla Bearing'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-yellow-300 mt-0.5">
              {qiblaBearing}°
            </div>
            <span className="text-[11px] text-emerald-100 font-bold">
              {qiblaDirectionLabel.label}
            </span>
          </div>

          {/* Current Device Heading */}
          <div className={`backdrop-blur-md rounded-2xl p-3 text-center border transition-all ${
            isAligned
              ? 'bg-emerald-500/30 border-yellow-400'
              : 'bg-white/10 border-white/10'
          }`}>
            <span className="text-[10px] uppercase font-extrabold text-emerald-300 block">
              {isUrdu ? 'آپ کا موجودہ رخ' : 'Current Heading'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {Math.round(effectiveHeading)}°
            </div>
            <span className="text-[11px] text-emerald-100 font-bold">
              {getCompassDirectionLabel(effectiveHeading, isUrdu ? 'urdu' : 'english').label}
            </span>
          </div>
        </div>

        {/* Live Alignment Distance Angle Offset */}
        <div className="relative z-10 mt-2 text-center text-xs font-semibold text-emerald-200">
          {isAligned ? (
            <span className="text-yellow-300 font-black flex items-center justify-center gap-1">
              <span>⭐</span>
              <span>{isUrdu ? 'کعبہ شریف کی بالکل سیدھ میں' : 'Directly aligned with Holy Kaaba'}</span>
              <span>⭐</span>
            </span>
          ) : (
            <span>
              {isUrdu
                ? `قبلہ رخ کے لیے فون کو ${Math.abs(Math.round(angleDiff))}° ${angleDiff > 0 ? 'دائیں (Right)' : 'بائیں (Left)'} گھمائیں`
                : `Rotate phone ${Math.abs(Math.round(angleDiff))}° ${angleDiff > 0 ? 'Right' : 'Left'} towards Qibla`}
            </span>
          )}
        </div>

      </div>

      {/* QUICK CITY SELECTION PILLS (When GPS is off or user wants to browse) */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            {isUrdu ? 'نمایاں شہروں کا قبلہ رخ (فوری انتخاب):' : 'Popular Cities (Quick Pick):'}
          </span>
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
          >
            {isUrdu ? 'تمام شہر دیکھیں ←' : 'View All →'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {POPULAR_CITIES.slice(0, 7).map((city) => (
            <button
              key={city.id}
              onClick={() => handleSelectCity(city)}
              className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-all active:scale-95 border ${
                coords && Math.abs(coords.latitude - city.latitude) < 0.1 && Math.abs(coords.longitude - city.longitude) < 0.1
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                  : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
              }`}
            >
              {isUrdu ? city.nameUrdu : city.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* CALIBRATION & ACCURACY GUIDELINES CARD */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-amber-950 space-y-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <h3 className="text-xs sm:text-sm font-black text-amber-950">
            {isUrdu ? 'کمپاس کی درستگی اور احتیاطی تدابیر' : 'Compass Accuracy & Tips'}
          </h3>
        </div>
        <ul className="text-xs text-amber-900/90 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            {isUrdu
              ? 'موبائل کو دھاتی اشیاء، لیپ ٹاپ چارجر، اور مقناطیسی کور (Magnetic cover) سے دور رکھیں۔'
              : 'Keep your phone away from metallic objects, chargers, and magnetic phone cases.'}
          </li>
          <li>
            {isUrdu
              ? 'اگر سوئی غلط اشارہ کرے تو فون کو ہوا میں انگریزی کے 8 (Figure-8) کے ہندسے کی طرح 2 سے 3 بار گھمائیں۔'
              : 'If the compass seems off, wave your phone in a Figure-8 motion in the air to recalibrate.'}
          </li>
          <li>
            {isUrdu
              ? 'IslamIQ کا قبلہ کمپاس سائنسی اور کروی مثلثیات (Spherical Trigonometry) کے ذریعے بالکل درست حساب لگاتا ہے۔'
              : 'IslamIQ uses precise Great-Circle spherical calculations based on Kaaba coordinates.'}
          </li>
        </ul>
      </div>

      {/* Strategic Qibla Page Google Ad Placement */}
      <AdBanner
        slotId={AD_CONFIG.SLOTS.QIBLA_BANNER}
        labelUrdu="اشتہار (Google AdSense)"
        labelEn="Google Sponsored Ad"
        className="my-3"
      />

      {/* MODAL: ALL POPULAR CITIES & CUSTOM COORDINATES */}
      {isCityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {isUrdu ? 'شہر یا مقام منتخب کریں' : 'Select City / Location'}
                </h3>
              </div>
              <button
                onClick={() => setIsCityModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input & Live GPS button */}
            <div className="p-4 border-b border-slate-100 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 rtl:left-auto rtl:right-3" />
                <input
                  type="text"
                  value={searchCityQuery}
                  onChange={(e) => setSearchCityQuery(e.target.value)}
                  placeholder={isUrdu ? 'شہر تلاش کریں (مثلاً: لاہور، کراچی، لندن)...' : 'Search city (e.g. Lahore, Dubai, London)...'}
                  className="w-full bg-slate-100 focus:bg-white pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={() => {
                  requestLocation();
                  setIsCityModalOpen(false);
                }}
                className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-emerald-200 active:scale-95 transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isUrdu ? 'میرا موجودہ جی پی ایس (GPS) استعمال کریں' : 'Use Current Device GPS'}</span>
              </button>
            </div>

            {/* City List Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 max-h-[40vh]">
              {filteredCities.map((city) => {
                const bearing = calculateQiblaBearing(city.latitude, city.longitude);
                const dist = calculateDistanceToKaaba(city.latitude, city.longitude);

                return (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCity(city)}
                    className="w-full p-3 rounded-2xl hover:bg-emerald-50 active:bg-emerald-100 border border-slate-100 hover:border-emerald-200 flex items-center justify-between transition-all text-left rtl:text-right group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">
                        {isUrdu ? city.nameUrdu : city.nameEn}
                        <span className="text-xs text-slate-400 font-normal mx-1">
                          ({isUrdu ? city.countryUrdu : city.countryEn})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {isUrdu ? 'قبلہ رخ:' : 'Qibla:'} <strong className="text-emerald-700">{bearing}°</strong> • {dist.toLocaleString()} km
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {isUrdu ? 'منتخب کریں' : 'Select'}
                    </span>
                  </button>
                );
              })}

              {filteredCities.length === 0 && (
                <div className="text-center py-6 text-slate-400 text-xs">
                  {isUrdu ? 'کوئی شہر نہیں ملا۔ نیچے کسٹم نقاط درج کریں۔' : 'No city matched. Enter custom coordinates below.'}
                </div>
              )}
            </div>

            {/* Custom Coordinates Collapsible Accordion */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <details className="group">
                <summary className="text-xs font-bold text-slate-700 cursor-pointer flex items-center justify-between">
                  <span>{isUrdu ? 'مقام کے کسٹم نقاط (Latitude / Longitude) درج کریں' : 'Enter Custom Coordinates (Lat/Long)'}</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <form onSubmit={handleCustomCoordsSubmit} className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Latitude (مثلاً 24.86)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="24.86"
                      value={customLat}
                      onChange={(e) => setCustomLat(e.target.value)}
                      className="w-full p-2 text-xs bg-white rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Longitude (مثلاً 67.00)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="67.00"
                      value={customLon}
                      onChange={(e) => setCustomLon(e.target.value)}
                      className="w-full p-2 text-xs bg-white rounded-xl border border-slate-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="col-span-2 mt-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95"
                  >
                    {isUrdu ? 'قبلہ رخ سیٹ کریں' : 'Apply Coordinates'}
                  </button>
                </form>
              </details>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: COMPASS CALIBRATION STEP-BY-STEP */}
      {isCalibrationOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {isUrdu ? 'کمپاس کیلیبریشن رہنمائی' : 'Compass Calibration Guide'}
                </h3>
              </div>
              <button
                onClick={() => setIsCalibrationOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Figure-8 Graphic */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-amber-200 text-center">
              <div className="text-4xl animate-pulse mb-1">
                ♾️
              </div>
              <span className="text-xs font-extrabold text-amber-900">
                {isUrdu ? 'ہندسہ 8 (Figure-8) موشن' : 'Figure-8 Calibration Motion'}
              </span>
              <p className="text-[11px] text-amber-800 mt-1 max-w-xs">
                {isUrdu
                  ? 'اپنے فون کو ہاتھ میں پکڑیں اور ہوا میں انگریزی کے 8 (یا لامتناہی علامت ♾️) کے مطابق 3 سے 5 بار گھمائیں۔'
                  : 'Hold your device and wave it in the air following a figure-8 infinity loop 3 to 5 times.'}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-[11px] shrink-0">
                  1
                </span>
                <p>
                  {isUrdu
                    ? 'فون کو بالکل سیدھا اور ہتھیلی پر ہموار (Flat) رکھیں۔'
                    : 'Place the phone flat on your palm or a level horizontal surface.'}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-[11px] shrink-0">
                  2
                </span>
                <p>
                  {isUrdu
                    ? 'بڑے اسپیکرز، کار کے ڈیش بورڈ، یا مقناطیسی کور سے دور رہیں۔'
                    : 'Move away from large metal objects, speakers, and magnetic cases.'}
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-[11px] shrink-0">
                  3
                </span>
                <p>
                  {isUrdu
                    ? 'جب تیر کا رخ کعبہ شریف سے مل جائے گا تو کمپاس سبز ہو جائے گا اور فون وائبریٹ کرے گا۔'
                    : 'When aligned with Kaaba, the compass will glow emerald gold and vibrate gently.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCalibrationOpen(false)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              {isUrdu ? 'سمجھ آ گیا (Done)' : 'Got it! Return to Compass'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

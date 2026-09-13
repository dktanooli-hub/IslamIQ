// Qibla Direction & Geodesic Calculation Utility for IslamIQ
// Uses Great-Circle bearing formula and Haversine distance.
// No external or paid APIs required.

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface CityData {
  id: string;
  nameEn: string;
  nameUrdu: string;
  countryEn: string;
  countryUrdu: string;
  latitude: number;
  longitude: number;
}

// Holy Kaaba in Makkah al-Mukarramah
export const KAABA_COORDINATES: Coordinates = {
  latitude: 21.422487,
  longitude: 39.826206,
};

/**
 * Calculate Great-Circle forward azimuth (initial bearing) from point A to Kaaba
 * @param lat Current latitude in degrees
 * @param lon Current longitude in degrees
 * @returns Qibla bearing in degrees (0° - 359.9°) clockwise from True North
 */
export function calculateQiblaBearing(lat: number, lon: number): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const phi1 = toRadians(lat);
  const phi2 = toRadians(KAABA_COORDINATES.latitude);
  const deltaLambda = toRadians(KAABA_COORDINATES.longitude - lon);

  const y = Math.sin(deltaLambda);
  const x =
    Math.cos(phi1) * Math.tan(phi2) -
    Math.sin(phi1) * Math.cos(deltaLambda);

  let bearing = toDegrees(Math.atan2(y, x));
  // Normalize to 0° - 360°
  bearing = (bearing + 360) % 360;

  return Math.round(bearing * 10) / 10;
}

/**
 * Calculate Haversine distance in kilometers from user location to Kaaba
 */
export function calculateDistanceToKaaba(lat: number, lon: number): number {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's mean radius in km

  const phi1 = toRadians(lat);
  const phi2 = toRadians(KAABA_COORDINATES.latitude);
  const deltaPhi = toRadians(KAABA_COORDINATES.latitude - lat);
  const deltaLambda = toRadians(KAABA_COORDINATES.longitude - lon);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Get 16-point cardinal direction label in English or Urdu
 */
export function getCompassDirectionLabel(degrees: number, lang: 'urdu' | 'english'): { code: string; label: string } {
  const normalized = (degrees % 360 + 360) % 360;
  const index = Math.round(normalized / 22.5) % 16;

  const directions = [
    { code: 'N', en: 'North', ur: 'شمال' },
    { code: 'NNE', en: 'North-Northeast', ur: 'شمال-شمال مشرق' },
    { code: 'NE', en: 'Northeast', ur: 'شمال مشرق' },
    { code: 'ENE', en: 'East-Northeast', ur: 'مشرق-شمال مشرق' },
    { code: 'E', en: 'East', ur: 'مشرق' },
    { code: 'ESE', en: 'East-Southeast', ur: 'مشرق-جنوب مشرق' },
    { code: 'SE', en: 'Southeast', ur: 'جنوب مشرق' },
    { code: 'SSE', en: 'South-Southeast', ur: 'جنوب-جنوب مشرق' },
    { code: 'S', en: 'South', ur: 'جنوب' },
    { code: 'SSW', en: 'South-Southwest', ur: 'جنوب-جنوب مغرب' },
    { code: 'SW', en: 'Southwest', ur: 'جنوب مغرب' },
    { code: 'WSW', en: 'West-Southwest', ur: 'مغرب-جنوب مغرب' },
    { code: 'W', en: 'West', ur: 'مغرب' },
    { code: 'WNW', en: 'West-Northwest', ur: 'مغرب-شمال مغرب' },
    { code: 'NW', en: 'Northwest', ur: 'شمال مغرب' },
    { code: 'NNW', en: 'North-Northwest', ur: 'شمال-شمال مغرب' },
  ];

  const dir = directions[index];
  return {
    code: dir.code,
    label: lang === 'urdu' ? dir.ur : dir.en,
  };
}

/**
 * Helper to compute shortest angular difference between two bearings (-180 to +180)
 */
export function getAngularDifference(target: number, current: number): number {
  let diff = (target - current + 180) % 360 - 180;
  return diff < -180 ? diff + 360 : diff;
}

/**
 * Comprehensive list of popular Islamic and global cities for instant manual fallback
 */
export const POPULAR_CITIES: CityData[] = [
  // Pakistan
  { id: 'pk-karachi', nameEn: 'Karachi', nameUrdu: 'کراچی', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 24.8607, longitude: 67.0011 },
  { id: 'pk-lahore', nameEn: 'Lahore', nameUrdu: 'لاہور', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 31.5204, longitude: 74.3587 },
  { id: 'pk-islamabad', nameEn: 'Islamabad', nameUrdu: 'اسلام آباد', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 33.6844, longitude: 73.0479 },
  { id: 'pk-rawalpindi', nameEn: 'Rawalpindi', nameUrdu: 'راولپنڈی', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 33.5651, longitude: 73.0169 },
  { id: 'pk-peshawar', nameEn: 'Peshawar', nameUrdu: 'پشاور', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 34.0151, longitude: 71.5249 },
  { id: 'pk-quetta', nameEn: 'Quetta', nameUrdu: 'کوئٹہ', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 30.1798, longitude: 66.9750 },
  { id: 'pk-multan', nameEn: 'Multan', nameUrdu: 'ملتان', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 30.1575, longitude: 71.5249 },
  { id: 'pk-faisalabad', nameEn: 'Faisalabad', nameUrdu: 'فیصل آباد', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 31.4504, longitude: 73.1350 },
  { id: 'pk-hyderabad', nameEn: 'Hyderabad', nameUrdu: 'حیدرآباد', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 25.3960, longitude: 68.3578 },
  { id: 'pk-gujranwala', nameEn: 'Gujranwala', nameUrdu: 'گوجرانوالہ', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 32.1877, longitude: 74.1945 },
  { id: 'pk-sialkot', nameEn: 'Sialkot', nameUrdu: 'سیالکوٹ', countryEn: 'Pakistan', countryUrdu: 'پاکستان', latitude: 32.4945, longitude: 74.5229 },

  // Middle East & Sacred Sites
  { id: 'sa-makkah', nameEn: 'Makkah', nameUrdu: 'مکہ مکرمہ', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', latitude: 21.4225, longitude: 39.8262 },
  { id: 'sa-madinah', nameEn: 'Madinah', nameUrdu: 'مدینہ منورہ', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', latitude: 24.5247, longitude: 39.5692 },
  { id: 'sa-riyadh', nameEn: 'Riyadh', nameUrdu: 'ریاض', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', latitude: 24.7136, longitude: 46.6753 },
  { id: 'sa-jeddah', nameEn: 'Jeddah', nameUrdu: 'جدہ', countryEn: 'Saudi Arabia', countryUrdu: 'سعودی عرب', latitude: 21.5433, longitude: 39.1728 },
  { id: 'ae-dubai', nameEn: 'Dubai', nameUrdu: 'دبئی', countryEn: 'UAE', countryUrdu: 'متحدہ عرب امارات', latitude: 25.2048, longitude: 55.2708 },
  { id: 'ae-abudhabi', nameEn: 'Abu Dhabi', nameUrdu: 'ابوظہبی', countryEn: 'UAE', countryUrdu: 'متحدہ عرب امارات', latitude: 24.4539, longitude: 54.3773 },
  { id: 'qa-doha', nameEn: 'Doha', nameUrdu: 'دوحہ', countryEn: 'Qatar', countryUrdu: 'قطر', latitude: 25.2854, longitude: 51.5310 },
  { id: 'kw-kuwait', nameEn: 'Kuwait City', nameUrdu: 'کویت سٹی', countryEn: 'Kuwait', countryUrdu: 'کویت', latitude: 29.3759, longitude: 47.9774 },
  { id: 'om-muscat', nameEn: 'Muscat', nameUrdu: 'مسقط', countryEn: 'Oman', countryUrdu: 'عمان', latitude: 23.5859, longitude: 58.4059 },
  { id: 'bh-manama', nameEn: 'Manama', nameUrdu: 'منامہ', countryEn: 'Bahrain', countryUrdu: 'بحرین', latitude: 26.2285, longitude: 50.5860 },
  { id: 'tr-istanbul', nameEn: 'Istanbul', nameUrdu: 'استنبول', countryEn: 'Turkey', countryUrdu: 'ترکی', latitude: 41.0082, longitude: 28.9784 },
  { id: 'tr-ankara', nameEn: 'Ankara', nameUrdu: 'انقرہ', countryEn: 'Turkey', countryUrdu: 'ترکی', latitude: 39.9334, longitude: 32.8597 },
  { id: 'eg-cairo', nameEn: 'Cairo', nameUrdu: 'قاہرہ', countryEn: 'Egypt', countryUrdu: 'مصر', latitude: 30.0444, longitude: 31.2357 },
  { id: 'jo-amman', nameEn: 'Amman', nameUrdu: 'عمان', countryEn: 'Jordan', countryUrdu: 'اردن', latitude: 31.9454, longitude: 35.9284 },
  { id: 'ps-jerusalem', nameEn: 'Jerusalem (Al-Quds)', nameUrdu: 'القدس شریف', countryEn: 'Palestine', countryUrdu: 'فلسطین', latitude: 31.7683, longitude: 35.2137 },

  // South & Southeast Asia
  { id: 'in-delhi', nameEn: 'New Delhi', nameUrdu: 'نئی دہلی', countryEn: 'India', countryUrdu: 'بھارت', latitude: 28.6139, longitude: 77.2090 },
  { id: 'in-mumbai', nameEn: 'Mumbai', nameUrdu: 'ممبئی', countryEn: 'India', countryUrdu: 'بھارت', latitude: 19.0760, longitude: 72.8777 },
  { id: 'bd-dhaka', nameEn: 'Dhaka', nameUrdu: 'ڈھاکہ', countryEn: 'Bangladesh', countryUrdu: 'بنگلہ دیش', latitude: 23.8103, longitude: 90.4125 },
  { id: 'my-kl', nameEn: 'Kuala Lumpur', nameUrdu: 'کوالالمپور', countryEn: 'Malaysia', countryUrdu: 'ملائیشیا', latitude: 3.1390, longitude: 101.6869 },
  { id: 'id-jakarta', nameEn: 'Jakarta', nameUrdu: 'جکارتہ', countryEn: 'Indonesia', countryUrdu: 'انڈونیشیا', latitude: -6.2088, longitude: 106.8456 },

  // Europe
  { id: 'uk-london', nameEn: 'London', nameUrdu: 'لندن', countryEn: 'United Kingdom', countryUrdu: 'برطانیہ', latitude: 51.5074, longitude: -0.1278 },
  { id: 'uk-birmingham', nameEn: 'Birmingham', nameUrdu: 'برمنگھم', countryEn: 'United Kingdom', countryUrdu: 'برطانیہ', latitude: 52.4862, longitude: -1.8904 },
  { id: 'fr-paris', nameEn: 'Paris', nameUrdu: 'پیرس', countryEn: 'France', countryUrdu: 'فرانس', latitude: 48.8566, longitude: 2.3522 },
  { id: 'de-berlin', nameEn: 'Berlin', nameUrdu: 'برلن', countryEn: 'Germany', countryUrdu: 'جرمنی', latitude: 52.5200, longitude: 13.4050 },
  { id: 'de-frankfurt', nameEn: 'Frankfurt', nameUrdu: 'فرینکفرٹ', countryEn: 'Germany', countryUrdu: 'جرمنی', latitude: 50.1109, longitude: 8.6821 },

  // North America
  { id: 'us-nyc', nameEn: 'New York', nameUrdu: 'نیویارک', countryEn: 'USA', countryUrdu: 'امریکہ', latitude: 40.7128, longitude: -74.0060 },
  { id: 'us-chicago', nameEn: 'Chicago', nameUrdu: 'شکاگو', countryEn: 'USA', countryUrdu: 'امریکہ', latitude: 41.8781, longitude: -87.6298 },
  { id: 'us-houston', nameEn: 'Houston', nameUrdu: 'ہیوسٹن', countryEn: 'USA', countryUrdu: 'امریکہ', latitude: 29.7604, longitude: -95.3698 },
  { id: 'us-la', nameEn: 'Los Angeles', nameUrdu: 'لاس اینجلس', countryEn: 'USA', countryUrdu: 'امریکہ', latitude: 34.0522, longitude: -118.2437 },
  { id: 'ca-toronto', nameEn: 'Toronto', nameUrdu: 'ٹورنٹو', countryEn: 'Canada', countryUrdu: 'کینیڈا', latitude: 43.6532, longitude: -79.3832 },

  // Australasia & Africa
  { id: 'au-sydney', nameEn: 'Sydney', nameUrdu: 'سڈنی', countryEn: 'Australia', countryUrdu: 'آسٹریلیا', latitude: -33.8688, longitude: 151.2093 },
  { id: 'za-johannesburg', nameEn: 'Johannesburg', nameUrdu: 'جوہانسبرگ', countryEn: 'South Africa', countryUrdu: 'جنوبی افریقہ', latitude: -26.2041, longitude: 28.0473 },
];

/**
 * Request device orientation permission for iOS 13+ devices
 */
export async function requestOrientationPermission(): Promise<'granted' | 'denied' | 'not-required'> {
  if (
    typeof window !== 'undefined' &&
    typeof (DeviceOrientationEvent as any) !== 'undefined' &&
    typeof (DeviceOrientationEvent as any).requestPermission === 'function'
  ) {
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission();
      return response === 'granted' ? 'granted' : 'denied';
    } catch {
      return 'denied';
    }
  }
  return 'not-required';
}

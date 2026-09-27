/**
 * IslamIQ — Local Hijri Calendar Utility
 * Fully offline, static calculation using Intl.DateTimeFormat (Umm al-Qura standard)
 * with robust tabular fallback and configurable moon sighting day-offset (-2 to +2).
 */

export interface HijriMonthInfo {
  number: number; // 1 to 12
  nameEn: string;
  nameUrdu: string;
  nameArabic: string;
  isSacred: boolean; // Al-Ashhur al-Hurum
  descriptionEn: string;
  descriptionUrdu: string;
}

export interface HijriDate {
  day: number;
  month: number;
  year: number;
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  date: Date;
}

export interface IslamicEvent {
  id: string;
  month: number; // 1 to 12
  day: number;
  endDay?: number;
  titleEn: string;
  titleUrdu: string;
  titleArabic?: string;
  descEn: string;
  descUrdu: string;
  type: 'eid' | 'fasting' | 'night' | 'hajj' | 'historic' | 'sacred';
  reference?: string;
}

export interface CalendarDayItem {
  hijriDay: number;
  hijriMonth: number;
  hijriYear: number;
  gregorianDate: Date;
  dayOfWeek: number; // 0 to 6
  isToday: boolean;
  events: IslamicEvent[];
  isSunnahFasting: boolean;
  sunnahFastingReasonEn?: string;
  sunnahFastingReasonUrdu?: string;
  isForbiddenFasting: boolean;
  isJumuah: boolean;
  isWhiteDay: boolean; // 13, 14, 15
}

export const HIJRI_MONTHS: HijriMonthInfo[] = [
  {
    number: 1,
    nameEn: 'Muharram',
    nameUrdu: 'محرم الحرام',
    nameArabic: 'مُحَرَّم',
    isSacred: true,
    descriptionEn: 'The first month of the Islamic year. One of the four sacred months. Features the Day of Ashura (10th Muharram).',
    descriptionUrdu: 'اسلامی سال کا پہلا مہینہ اور چار حرمت والے مہینوں میں سے ایک۔ اس میں عاشوراء (۱۰ محرم) کا متبرک روزہ ہے۔'
  },
  {
    number: 2,
    nameEn: 'Safar',
    nameUrdu: 'صفر المظفر',
    nameArabic: 'صَفَر',
    isSacred: false,
    descriptionEn: 'The second month. In Islam, no month brings bad omen or misfortune (Ref: Sahih al-Bukhari 5707).',
    descriptionUrdu: 'اسلامی سال کا دوسرا مہینہ۔ اسلام میں کسی مہینے یا دن کو منحوس سمجھنا باطل ہے (صحیح بخاری: ۵۷۰۷)۔'
  },
  {
    number: 3,
    nameEn: 'Rabiʻ al-Awwal',
    nameUrdu: 'ربیع الاول',
    nameArabic: 'رَبِيع الأَوَّل',
    isSacred: false,
    descriptionEn: 'The third month. Commemorates the blessed birth and life of the Prophet Muhammad ﷺ.',
    descriptionUrdu: 'تیسرا مہینہ جس میں خاتم النبیین حضرت محمد مصطفیٰ ﷺ کی ولادتِ با سعادت اور سیرتِ طیبہ یاد کی جاتی ہے۔'
  },
  {
    number: 4,
    nameEn: 'Rabiʻ al-Thani',
    nameUrdu: 'ربیع الثانی',
    nameArabic: 'رَبِيع الآخِر',
    isSacred: false,
    descriptionEn: 'The fourth month, also known as Rabiʻ al-Akhir.',
    descriptionUrdu: 'چوتھا اسلامی مہینہ، جسے ربیع الآخر بھی کہا جاتا ہے۔'
  },
  {
    number: 5,
    nameEn: 'Jumada al-Ula',
    nameUrdu: 'جمادی الاولیٰ',
    nameArabic: 'جُمَادَى الأُولَى',
    isSacred: false,
    descriptionEn: 'The fifth month of the Islamic lunar calendar.',
    descriptionUrdu: 'اسلامی قمری سال کا پانچواں مہینہ۔'
  },
  {
    number: 6,
    nameEn: 'Jumada al-Thaniyah',
    nameUrdu: 'جمادی الثانیہ',
    nameArabic: 'جُمَادَى الآخِرَة',
    isSacred: false,
    descriptionEn: 'The sixth month of the Islamic calendar, preceding the sacred month of Rajab.',
    descriptionUrdu: 'چھٹا مہینہ، جس کے بعد حرمت والا مہینہ رجب آتا ہے۔'
  },
  {
    number: 7,
    nameEn: 'Rajab',
    nameUrdu: 'رجب المرجب',
    nameArabic: 'رَجَب',
    isSacred: true,
    descriptionEn: 'A sacred month (Shahrullah). Known historically for Al-Isra\' wal-Mi\'raj (27th Rajab).',
    descriptionUrdu: 'چار حرمت والے مہینوں میں سے ایک متبرک مہینہ جس میں واقعہ اسراء و معراج (۲۷ رجب) واقع ہوا۔'
  },
  {
    number: 8,
    nameEn: 'Shaʻban',
    nameUrdu: 'شعبان المعظم',
    nameArabic: 'شَعْبَان',
    isSacred: false,
    descriptionEn: 'The month preceding Ramadan. The Prophet ﷺ frequently fasted voluntarily during Shaʻban.',
    descriptionUrdu: 'رمضان کی تیاری کا بابرکت مہینہ جس میں نبی کریم ﷺ کثرت سے نفلی روزے رکھتے تھے۔'
  },
  {
    number: 9,
    nameEn: 'Ramadan',
    nameUrdu: 'رمضان المبارک',
    nameArabic: 'رَمَضَان',
    isSacred: false,
    descriptionEn: 'The holy month of obligatory fasting (Sawm), revelation of the Holy Quran, and Laylat al-Qadr.',
    descriptionUrdu: 'فرض روزوں، نزولِ قرآن اور لیلۃ القدر کا عظیم الشان اور بابرکت مہینہ۔'
  },
  {
    number: 10,
    nameEn: 'Shawwal',
    nameUrdu: 'شوال المکرم',
    nameArabic: 'شَوَّال',
    isSacred: false,
    descriptionEn: 'The tenth month. Begins with Eid al-Fitr (1st Shawwal). Contains the Sunnah of fasting six days.',
    descriptionUrdu: 'دسواں مہینہ، یکم شوال کو عید الفطر منائی جاتی ہے اور اس کے ۶ نفلی روزوں کی فضیلت احادیث میں وارد ہے۔'
  },
  {
    number: 11,
    nameEn: 'Dhul-Qiʻdah',
    nameUrdu: 'ذوالقعدہ',
    nameArabic: 'ذُو القَعْدَة',
    isSacred: true,
    descriptionEn: 'One of the four sacred months. Marks the prelude to Hajj season and pilgrimage travel.',
    descriptionUrdu: 'حرمت والا مہینہ جس میں حج کے سفر اور عبادات کی تیاریاں شروع ہوتی ہیں۔'
  },
  {
    number: 12,
    nameEn: 'Dhul-Hijjah',
    nameUrdu: 'ذوالحجہ',
    nameArabic: 'ذُو الحِجَّة',
    isSacred: true,
    descriptionEn: 'Sacred month of the annual Hajj pilgrimage, the first 10 blessed days, Day of Arafah (9th), and Eid al-Adha (10th).',
    descriptionUrdu: 'حج کا مقدس اور حرمت والا مہینہ، جس کے پہلے دس دن سال کے افضل ترین ایام ہیں، ۹ کو یومِ عرفہ اور ۱۰ کو عید الاضحیٰ ہے۔'
  }
];

export const WEEKDAYS = [
  { dayIndex: 0, nameEn: 'Sunday', nameUrdu: 'اتوار', shortEn: 'Sun', shortUrdu: 'اتوار' },
  { dayIndex: 1, nameEn: 'Monday', nameUrdu: 'پیر', shortEn: 'Mon', shortUrdu: 'پیر' },
  { dayIndex: 2, nameEn: 'Tuesday', nameUrdu: 'منگل', shortEn: 'Tue', shortUrdu: 'منگل' },
  { dayIndex: 3, nameEn: 'Wednesday', nameUrdu: 'بدھ', shortEn: 'Wed', shortUrdu: 'بدھ' },
  { dayIndex: 4, nameEn: 'Thursday', nameUrdu: 'جمعرات', shortEn: 'Thu', shortUrdu: 'جمعرات' },
  { dayIndex: 5, nameEn: 'Friday', nameUrdu: 'جمعہ', shortEn: 'Fri', shortUrdu: 'جمعہ' },
  { dayIndex: 6, nameEn: 'Saturday', nameUrdu: 'ہفتہ', shortEn: 'Sat', shortUrdu: 'ہفتہ' },
];

export const MAJOR_ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    id: 'islamic-new-year',
    month: 1,
    day: 1,
    titleEn: 'Islamic New Year (1st Muharram)',
    titleUrdu: 'نیا اسلامی سال (یکم محرم الحرام)',
    titleArabic: 'رَأْسُ السَّنَةِ الهِجْرِيَّة',
    descEn: 'Marks the start of the new Hijri lunar calendar established during the Caliphate of Umar ibn al-Khattab (RA).',
    descUrdu: 'نئے ہجری سال کا آغاز، جس کی بنیاد خلیفہ ثانی حضرت عمر فاروق رضی اللہ عنہ کے دورِ خلافت میں رکھی گئی۔',
    type: 'historic',
    reference: 'Tarikh at-Tabari'
  },
  {
    id: 'tasua',
    month: 1,
    day: 9,
    titleEn: 'Tasuʻa (9th Muharram)',
    titleUrdu: 'تاسوعاء (۹ محرم)',
    titleArabic: 'تَاسُوعَاء',
    descEn: 'Sunnah fasting day paired with Ashura. The Prophet ﷺ expressed intent to fast the 9th alongside the 10th.',
    descUrdu: 'عاشوراء کے ساتھ نویں محرم کا نفلی روزہ رکھنا نبی کریم ﷺ کی مرغوب سنت ہے۔',
    type: 'fasting',
    reference: 'Sahih Muslim 1134'
  },
  {
    id: 'ashura',
    month: 1,
    day: 10,
    titleEn: 'Day of Ashura (10th Muharram)',
    titleUrdu: 'یومِ عاشوراء (۱۰ محرم الحرام)',
    titleArabic: 'يَوْمُ عَاشُورَاء',
    descEn: 'The day Allah saved Prophet Musa (AS) and Bani Israel from Pharaoh. Highly recommended Sunnah fast expiating sins of the previous year.',
    descUrdu: 'وہ مبارک دن جب اللہ تعالیٰ نے حضرت موسیٰؑ اور بنی اسرائیل کو فرعون سے نجات دی۔ اس دن کے روزے سے پچھلے سال کے گناہ معاف ہوتے ہیں۔',
    type: 'fasting',
    reference: 'Sahih al-Bukhari 2004; Sahih Muslim 1162'
  },
  {
    id: 'mawlid-prophet',
    month: 3,
    day: 12,
    titleEn: 'Mawlid an-Nabi (12th Rabiʻ al-Awwal)',
    titleUrdu: 'ولادت و سیرتِ رسول ﷺ (۱۲ ربیع الاول)',
    titleArabic: 'ذِكْرَى المَوْلِدِ النَّبَوِيّ',
    descEn: 'Remembrance of the birth, noble character, and sublime message of the Messenger of Allah ﷺ (Mercy to all Worlds).',
    descUrdu: 'حضور رحمتِ عالم ﷺ کی ولادتِ باسعادت اور سیرتِ طیبہ کی تعلیمات پر تفکر و عمل کی یاد دہانی۔',
    type: 'historic',
    reference: 'Surah Al-Anbiya 21:107'
  },
  {
    id: 'isra-miraj',
    month: 7,
    day: 27,
    titleEn: 'Al-Isra\' wal-Miʻraj (27th Rajab)',
    titleUrdu: 'شبِ معراج (۲۷ رجب المرجب)',
    titleArabic: 'الإِسْرَاءُ وَالمِعْرَاج',
    descEn: 'The Miraculous Night Journey of Prophet Muhammad ﷺ from Makkah to Jerusalem and ascent through the Heavens where 5 daily prayers were gifted.',
    descUrdu: 'نبی کریم ﷺ کا مسجد حرام سے مسجد اقصی اور آسمانوں کی سیر کا معجزانہ سفر جس میں پانچ نمازوں کا عظیم تحفہ ملا۔',
    type: 'night',
    reference: 'Surah Al-Isra 17:1; Sahih al-Bukhari 3887'
  },
  {
    id: 'shab-e-barat',
    month: 8,
    day: 15,
    titleEn: 'Laylat al-Bara\'ah / Nisf Shaʻban (15th Shaʻban)',
    titleUrdu: 'شبِ برأت / نصف شعبان (۱۵ شعبان)',
    titleArabic: 'لَيْلَةُ النِّصْفِ مِنْ شَعْبَان',
    descEn: 'The 15th night of Shaʻban. A blessed night for seeking forgiveness, repentance, and sincere supplication.',
    descUrdu: 'پندرہویں شعبان کی رات جس میں توبہ و استغفار اور مغفرت طلب کرنے کی ترغیب ملتی ہے۔',
    type: 'night',
    reference: 'Sunan Ibn Majah 1390'
  },
  {
    id: 'start-ramadan',
    month: 9,
    day: 1,
    titleEn: '1st Ramadan: Fasting Begins',
    titleUrdu: 'یکم رمضان المبارک: آغازِ صیام',
    titleArabic: 'أَوَّلُ أَيَّامِ شَهْرِ رَمَضَان',
    descEn: 'First day of the holy month of Ramadan. Fasting is obligatory for every mature, healthy Muslim.',
    descUrdu: 'ماہِ صیام کا پہلا دن۔ ہر عاقل و بالغ تندرست مسلمان پر روزے رکھنا فرض ہے۔',
    type: 'fasting',
    reference: 'Surah Al-Baqarah 2:183-185'
  },
  {
    id: 'badr-day',
    month: 9,
    day: 17,
    titleEn: 'Ghazwah Badr (17th Ramadan)',
    titleUrdu: 'یوم الفرقان / غزوۂ بدر (۱۷ رمضان)',
    titleArabic: 'غَزْوَةُ بَدْرٍ الكُبْرَى',
    descEn: 'The decisive Battle of Badr (Yawm al-Furqan), the day of distinction between truth and falsehood.',
    descUrdu: 'حق و باطل کا پہلا فیصلہ کن معرکہ (غزوۂ بدر) جس میں مسلمانوں کو فتحِ عظیم نصیب ہوئی۔',
    type: 'historic',
    reference: 'Surah Al-Anfal 8:41'
  },
  {
    id: 'laylat-al-qadr',
    month: 9,
    day: 27,
    titleEn: 'Laylat al-Qadr (27th Ramadan)',
    titleUrdu: 'شبِ قدر (۲۷ رمضان المبارک)',
    titleArabic: 'لَيْلَةُ القَدْر',
    descEn: 'The Night of Decree and Power, better than 1,000 months of worship. Sought on odd nights of the last 10 days of Ramadan (21, 23, 25, 27, 29).',
    descUrdu: 'ہزار مہینوں سے افضل رات۔ آخری عشرے کی طاق راتوں (۲۱، ۲۳، ۲۵، ۲۷، ۲۹) میں تلاش کرنے کا حکم ہے۔',
    type: 'night',
    reference: 'Surah Al-Qadr 97:1-5'
  },
  {
    id: 'eid-al-fitr',
    month: 10,
    day: 1,
    titleEn: 'Eid al-Fitr (1st Shawwal)',
    titleUrdu: 'عید الفطر (یکم شوال)',
    titleArabic: 'عِيدُ الفِطْرِ المُبَارَك',
    descEn: 'The joyous Islamic festival celebrating the completion of Ramadan fasting. Fasting on this day is strictly forbidden.',
    descUrdu: 'رمضان المبارک کے روزوں کی تکمیل پر اللہ تعالیٰ کی نعمتوں کے شکرانے کی عید۔ اس دن روزہ رکھنا حرام ہے۔',
    type: 'eid',
    reference: 'Sahih al-Bukhari 1991'
  },
  {
    id: 'yawm-tarwiyah',
    month: 12,
    day: 8,
    titleEn: 'Yawm at-Tarwiyah (8th Dhul-Hijjah)',
    titleUrdu: 'یوم الترویہ (۸ ذوالحجہ)',
    titleArabic: 'يَوْمُ التَّرْوِيَة',
    descEn: 'The first day of Hajj rites. Pilgrims move to Mina in preparation for Arafah.',
    descUrdu: 'مناسکِ حج کا پہلا دن، حجاج کرام منیٰ تشریف لے جاتے ہیں۔',
    type: 'hajj',
    reference: 'Sahih Muslim 1218'
  },
  {
    id: 'yawm-arafah',
    month: 12,
    day: 9,
    titleEn: 'Day of Arafah (9th Dhul-Hijjah)',
    titleUrdu: 'یومِ عرفہ (۹ ذوالحجہ)',
    titleArabic: 'يَوْمُ عَرَفَة',
    descEn: 'The pinnacle of Hajj. For non-pilgrims, fasting on this day expiates sins of the previous year and the coming year.',
    descUrdu: 'حج کا عظیم ترین رکن (وقوفِ عرفہ)۔ غیر حجاج کے لیے اس دن کا نفلی روزہ دو سال کے گناہوں کا کفارہ ہے۔',
    type: 'fasting',
    reference: 'Sahih Muslim 1162'
  },
  {
    id: 'eid-al-adha',
    month: 12,
    day: 10,
    titleEn: 'Eid al-Adha (10th Dhul-Hijjah)',
    titleUrdu: 'عید الاضحیٰ (۱۰ ذوالحجہ)',
    titleArabic: 'عِيدُ الأَضْحَى المُبَارَك',
    descEn: 'The Festival of Sacrifice commemorating the devotion of Prophet Ibrahim (AS) and Ismail (AS). Fasting on this day is forbidden.',
    descUrdu: 'حضرت ابراہیمؑ اور حضرت اسماعیلؑ کی عظیم قربانی کی یاد میں عید۔ اس دن روزہ رکھنا حرام ہے۔',
    type: 'eid',
    reference: 'Surah As-Saffat 37:102-107'
  },
  {
    id: 'ayyam-tashreeq',
    month: 12,
    day: 11,
    endDay: 13,
    titleEn: 'Days of Tashreeq (11th–13th Dhul-Hijjah)',
    titleUrdu: 'ایامِ تشریق (۱۱ تا ۱۳ ذوالحجہ)',
    titleArabic: 'أَيَّامُ التَّشْرِيق',
    descEn: 'Days of eating, drinking, and remembrance of Allah (Takbeerat). Fasting is prohibited during Tashreeq.',
    descUrdu: 'کھانے پینے اور تکبیراتِ تشریق کے ایام۔ ان دنوں میں روزہ رکھنا منع ہے۔',
    type: 'hajj',
    reference: 'Sahih Muslim 1141'
  }
];

/**
 * Tabular approximation fallback when Intl is unavailable
 */
function tabularHijriFallback(date: Date, dayOffset: number): { day: number; month: number; year: number } {
  const d = new Date(date.getTime() + dayOffset * 86400000);
  const day = d.getUTCDate();
  const month = d.getUTCMonth() + 1;
  let year = d.getUTCFullYear();
  let m = month;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
  let z = jd - 1948440 + 10632;
  const n = Math.floor((z - 1) / 10631);
  z = z - 10631 * n + 354;
  const j = Math.floor((10985 - z) / 5316) * Math.floor((50 * z) / 17719) + Math.floor(z / 5670) * Math.floor((43 * z) / 15238);
  z = z - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hMonth = Math.floor((24 * z) / 709);
  const hDay = z - Math.floor((709 * hMonth) / 24);
  const hYear = 30 * n + j - 30;
  return { day: hDay, month: hMonth, year: hYear };
}

/**
 * Convert any Gregorian Date to Hijri Date with moon-sighting day offset.
 */
export function getHijriDate(date: Date, dayOffset = 0): HijriDate {
  const adjusted = new Date(date.getTime() + dayOffset * 86400000);
  const dayOfWeek = adjusted.getDay();

  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
    const parts = formatter.formatToParts(adjusted);
    let day = 1;
    let month = 1;
    let year = 1448;

    for (const p of parts) {
      if (p.type === 'day') day = parseInt(p.value, 10);
      if (p.type === 'month') month = parseInt(p.value, 10);
      if (p.type === 'year') year = parseInt(p.value, 10);
    }

    if (day >= 1 && day <= 30 && month >= 1 && month <= 12 && year >= 1000) {
      return { day, month, year, dayOfWeek, date: adjusted };
    }
    throw new Error('Fallback needed');
  } catch {
    const fb = tabularHijriFallback(date, dayOffset);
    return {
      day: Math.max(1, Math.min(30, fb.day)),
      month: Math.max(1, Math.min(12, fb.month)),
      year: fb.year,
      dayOfWeek,
      date: adjusted
    };
  }
}

/**
 * Formats a Hijri date as a string (Urdu or English)
 */
export function formatHijriDate(
  hijri: { day: number; month: number; year: number },
  lang: 'urdu' | 'english'
): string {
  const mInfo = HIJRI_MONTHS.find((m) => m.number === hijri.month) || HIJRI_MONTHS[0];
  if (lang === 'urdu') {
    return `${hijri.day} ${mInfo.nameUrdu} ${hijri.year} ھ`;
  }
  return `${hijri.day} ${mInfo.nameEn} ${hijri.year} AH`;
}

/**
 * Finds all Islamic events for a specific Hijri day & month.
 */
export function getEventsForHijriDay(month: number, day: number): IslamicEvent[] {
  return MAJOR_ISLAMIC_EVENTS.filter((e) => {
    if (e.month !== month) return false;
    if (e.endDay) {
      return day >= e.day && day <= e.endDay;
    }
    return e.day === day;
  });
}

/**
 * Evaluates whether a date is a recommended Sunnah fasting day
 * or forbidden fasting day (Eids, Tashreeq).
 */
export function evaluateFastingStatus(
  dayOfWeek: number,
  hijriMonth: number,
  hijriDay: number
): {
  isSunnahFasting: boolean;
  sunnahReasonEn?: string;
  sunnahReasonUrdu?: string;
  isForbiddenFasting: boolean;
  isWhiteDay: boolean;
} {
  // Forbidden fasting days:
  // 1 Shawwal (Eid al-Fitr)
  // 10 Dhul-Hijjah (Eid al-Adha)
  // 11, 12, 13 Dhul-Hijjah (Days of Tashreeq)
  if (hijriMonth === 10 && hijriDay === 1) {
    return { isSunnahFasting: false, isForbiddenFasting: true, isWhiteDay: false };
  }
  if (hijriMonth === 12 && (hijriDay === 10 || hijriDay === 11 || hijriDay === 12 || hijriDay === 13)) {
    return { isSunnahFasting: false, isForbiddenFasting: true, isWhiteDay: false };
  }

  // White days (Ayyam al-Beed) - 13, 14, 15 of every lunar month
  const isWhiteDay = hijriDay === 13 || hijriDay === 14 || hijriDay === 15;

  // Specific special fasts:
  if (hijriMonth === 1 && hijriDay === 9) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'Sunnah Fast (Tasuʻa - 9th Muharram)',
      sunnahReasonUrdu: 'سنت روزہ (تاسوعاء - ۹ محرم)',
      isForbiddenFasting: false,
      isWhiteDay
    };
  }
  if (hijriMonth === 1 && hijriDay === 10) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'Sunnah Fast (Day of Ashura - 10th Muharram)',
      sunnahReasonUrdu: 'سنت روزہ (یومِ عاشوراء - ۱۰ محرم)',
      isForbiddenFasting: false,
      isWhiteDay
    };
  }
  if (hijriMonth === 12 && hijriDay === 9) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'Sunnah Fast (Day of Arafah - Expiates 2 years)',
      sunnahReasonUrdu: 'سنت روزہ (یومِ عرفہ - دو سال کے گناہوں کا کفارہ)',
      isForbiddenFasting: false,
      isWhiteDay
    };
  }

  if (isWhiteDay) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'White Days (Ayyam al-Beed Sunnah)',
      sunnahReasonUrdu: 'ایامِ بیض کا مسنون روزہ (۱۳، ۱۴، ۱۵)',
      isForbiddenFasting: false,
      isWhiteDay: true
    };
  }

  // Mondays and Thursdays voluntary fasting
  if (dayOfWeek === 1) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'Monday Sunnah Fast (Deeds presented to Allah)',
      sunnahReasonUrdu: 'پیر کا مسنون روزہ (اعمال اللہ کے حضور پیش ہوتے ہیں)',
      isForbiddenFasting: false,
      isWhiteDay: false
    };
  }
  if (dayOfWeek === 4) {
    return {
      isSunnahFasting: true,
      sunnahReasonEn: 'Thursday Sunnah Fast (Deeds presented to Allah)',
      sunnahReasonUrdu: 'جمعرات کا مسنون روزہ (اعمال اللہ کے حضور پیش ہوتے ہیں)',
      isForbiddenFasting: false,
      isWhiteDay: false
    };
  }

  return {
    isSunnahFasting: false,
    isForbiddenFasting: false,
    isWhiteDay: false
  };
}

/**
 * Generates all calendar days for a specific Hijri Year and Month.
 */
export function getHijriMonthDays(
  hYear: number,
  hMonth: number,
  dayOffset = 0
): CalendarDayItem[] {
  // Approximate Gregorian date for (hYear, hMonth, 1)
  // Anchor: 1 Muharram 1448 AH is approximately June 16, 2026
  const anchorGreg = new Date(Date.UTC(2026, 5, 16));
  const monthsDiff = (hYear - 1448) * 12 + (hMonth - 1);
  const approxMs = anchorGreg.getTime() + monthsDiff * 29.530588 * 86400000;
  let curr = new Date(approxMs);

  // Search backward/forward to align to day 1 of (hYear, hMonth)
  let h = getHijriDate(curr, dayOffset);
  let step = (h.year > hYear || (h.year === hYear && h.month > hMonth)) ? -1 : 1;
  let iterations = 0;

  while (!(h.year === hYear && h.month === hMonth && h.day === 1) && iterations < 70) {
    curr = new Date(curr.getTime() + step * 86400000);
    h = getHijriDate(curr, dayOffset);
    if (
      (step === 1 && (h.year > hYear || (h.year === hYear && h.month > hMonth))) ||
      (step === -1 && (h.year < hYear || (h.year === hYear && h.month < hMonth)))
    ) {
      step = -step;
    }
    iterations++;
  }

  // Today reference (without hours)
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const days: CalendarDayItem[] = [];
  let dIter = 0;

  while (h.year === hYear && h.month === hMonth && dIter < 31) {
    const isToday =
      curr.getFullYear() === todayYear &&
      curr.getMonth() === todayMonth &&
      curr.getDate() === todayDate;

    const events = getEventsForHijriDay(h.month, h.day);
    const fasting = evaluateFastingStatus(h.dayOfWeek, h.month, h.day);

    days.push({
      hijriDay: h.day,
      hijriMonth: h.month,
      hijriYear: h.year,
      gregorianDate: new Date(curr),
      dayOfWeek: h.dayOfWeek,
      isToday,
      events,
      isSunnahFasting: fasting.isSunnahFasting,
      sunnahFastingReasonEn: fasting.sunnahReasonEn,
      sunnahFastingReasonUrdu: fasting.sunnahReasonUrdu,
      isForbiddenFasting: fasting.isForbiddenFasting,
      isJumuah: h.dayOfWeek === 5,
      isWhiteDay: fasting.isWhiteDay
    });

    curr = new Date(curr.getTime() + 86400000);
    h = getHijriDate(curr, dayOffset);
    dIter++;
  }

  return days;
}

/**
 * IslamIQ — Islamic Calendar Educational Data & SEO Information
 */

export interface CalendarFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  reference?: string;
}

export interface IslamicCalendarData {
  h1En: string;
  h1Urdu: string;
  subtitleEn: string;
  subtitleUrdu: string;
  lunarSystemExplanationEn: string;
  lunarSystemExplanationUrdu: string;
  sacredMonthsHeaderEn: string;
  sacredMonthsHeaderUrdu: string;
  sacredMonthsDetailEn: string;
  sacredMonthsDetailUrdu: string;
  moonSightingGuidelineEn: string;
  moonSightingGuidelineUrdu: string;
  faqs: CalendarFAQ[];
}

export const ISLAMIC_CALENDAR_DATA: IslamicCalendarData = {
  h1En: 'Islamic Calendar (Hijri Date Today & Monthly Calendar)',
  h1Urdu: 'اسلامی کیلنڈر • آج کی ہجری تاریخ، قمری مہینے اور اہم اسلامی ایام',
  subtitleEn: 'Accurate Hijri lunar calendar with Gregorian synchronization, moon sighting adjustments, Sunnah fasting days, and major Islamic milestones.',
  subtitleUrdu: 'مستند اسلامی قمری تقویم: عیسوی تاریخ کے ساتھ موازنہ، چاند دیکھنے کے مطابق تاریخ میں رد و بدل، مسنون روزے اور اہم اسلامی تاریخوں کی تفاصیل۔',
  lunarSystemExplanationEn: 'The Islamic calendar (at-Taqwīm al-Hijrī) is a purely lunar calendar consisting of 12 months in a year of 354 or 355 days. It was officially initiated during the caliphate of Umar ibn al-Khattab (RA) in 17 AH, counting from the monumental Hijrah (migration) of the Prophet Muhammad ﷺ from Makkah to Madinah in 622 CE. Because the lunar year is approximately 10 to 11 days shorter than the solar Gregorian year, Islamic holy seasons, including Ramadan and Hajj, rotate smoothly through all seasons of the solar year.',
  lunarSystemExplanationUrdu: 'اسلامی تقویم ایک خالص قمری کیلنڈر ہے جو چاند کے حساب پر چلتا ہے اور اس کے سال میں ۳۵۴ یا ۳۵۵ دن ہوتے ہیں۔ خلیفہ راشد حضرت عمر فاروق رضی اللہ عنہ نے ۱۷ ہجری میں صحابہ کرام کے مشورے سے حضور نبی کریم ﷺ کی مکہ سے مدینہ منورہ ہجرت کے مبارک سال سے اس تقویم کی ابتدا فرمائی۔ چونکہ قمری سال شمسی سال سے تقریباً ۱۰ تا ۱۱ دن چھوٹا ہوتا ہے، اس لیے رمضان المبارک اور ایامِ حج مختلف موسموں میں گھومتے رہتے ہیں۔',
  sacredMonthsHeaderEn: 'The Four Sacred Months (Al-Ashhur al-Hurum)',
  sacredMonthsHeaderUrdu: 'چار حرمت والے مہینے (الأشهر الحرم)',
  sacredMonthsDetailEn: 'Allah says in the Holy Quran: "Indeed, the number of months with Allah is twelve [lunar] months in the register of Allah [from] the day He created the heavens and the earth; of these, four are sacred" (Surah At-Tawbah 9:36). The Messenger of Allah ﷺ clarified them: "Three are consecutive: Dhul-Qiʻdah, Dhul-Hijjah, and Muharram; and the single one is Rajab of Mudar, which is between Jumada and Shaʻban" (Sahih al-Bukhari 3197, Sahih Muslim 1679). In these months, transgressions carry greater gravity, while righteous deeds and good works yield magnified rewards.',
  sacredMonthsDetailUrdu: 'قرآن مجید میں ارشادِ باری تعالیٰ ہے: "حقیقت یہ ہے کہ مہینوں کی گنتی جب سے اللہ نے آسمانوں اور زمین کو پیدا کیا ہے، اللہ کے نوشتے میں بارہ ہی ہے، جن میں سے چار مہینے حرمت والے ہیں" (سورۃ التوبہ: ۳۶)۔ رسول اللہ ﷺ نے فرمایا: "تین مہینے مسلسل ہیں: ذوالقعدہ، ذوالحجہ اور محرم، اور چوتھا رجب ہے جو جمادی اور شعبان کے درمیان ہے" (صحیح بخاری: ۳۱۹۷)۔ ان مہینوں میں گناہوں سے بچنے اور نیک اعمال میں سبقت لے جانے کی خصوصی تاکید کی گئی ہے۔',
  moonSightingGuidelineEn: 'The start of each Islamic month depends on physical sighting of the crescent moon (Ru\'yat al-Hilal). The Prophet ﷺ stated: "Fast when you see it (the new moon) and break your fast when you see it, and if it is cloudy, complete thirty days" (Sahih al-Bukhari 1909). Because geographic location and weather conditions affect crescent visibility, local authorities around the world (e.g., Pakistan, Saudi Arabia, Egypt, Turkey, North America, UK) may announce month starts 1 or 2 days apart. IslamIQ provides an interactive offset toggle so you can synchronize the calendar with your local religious authority.',
  moonSightingGuidelineUrdu: 'اسلامی مہینے کا آغاز نئے چاند (ہلال) کی رویت پر موقوف ہے۔ رسول اللہ ﷺ نے فرمایا: "چاند دیکھ کر روزہ رکھو اور چاند دیکھ کر ہی افطار (عید) کرو، اور اگر تم پر بادل چھا جائیں تو تیس دن پورے کرو" (صحیح بخاری: ۱۹۰۹)۔ چونکہ موسم اور جغرافیائی حدود کے باعث رویت میں ایک دو دن کا فرق ممکن ہے، اس لیے اسلام آئی کیو میں ایک یا دو دن آگے پیچھے کرنے کی سہولت دی گئی ہے تاکہ آپ اپنی مقامی رویتِ ہلال کمیٹی کے مطابق تاریخ ایڈجسٹ کر سکیں۔',
  faqs: [
    {
      questionEn: 'How does the Islamic lunar calendar differ from the solar Gregorian calendar?',
      questionUrdu: 'اسلامی قمری کیلنڈر اور عیسوی شمسی کیلنڈر میں کیا فرق ہے؟',
      answerEn: 'The Gregorian calendar is solar and follows the Earth\'s orbit around the sun (~365.24 days). The Islamic Hijri calendar follows the moon\'s phases around the Earth (~29.53 days per month, totalling ~354.36 days per year). Consequently, Hijri dates advance approximately 10–11 days earlier in the Gregorian calendar each year.',
      answerUrdu: 'عیسوی کیلنڈر سورج کے گرد زمین کی گردش (تقریباً ۳۶۵ دن) پر مبنی ہے، جبکہ اسلامی ہجری کیلنڈر چاند کے مدار (تقریباً ۲۹ یا ۳۰ دن فی مہینہ، سال کے ۳۵۴ دن) پر مبنی ہے۔ اسی لیے ہجری سال شمسی سال کے مقابلے میں ہر سال تقریباً ۱۰ تا ۱۱ دن پہلے آ جاتا ہے۔'
    },
    {
      questionEn: 'What are the White Days (Ayyam al-Beed) and why are they recommended for fasting?',
      questionUrdu: 'ایامِ بیض کیا ہیں اور ان کے روزوں کی کیا فضیلت ہے؟',
      answerEn: 'Ayyam al-Beed (the "White Days") are the 13th, 14th, and 15th nights of every lunar month when the full moon shines brightest. The Prophet Muhammad ﷺ recommended fasting these three days, equating their regular practice to fasting an entire lifetime because each good deed is rewarded tenfold (Sahih al-Bukhari 1975, Sunan an-Nasa\'i 2420).',
      answerUrdu: 'ایامِ بیض قمری مہینے کی ۱۳، ۱۴ اور ۱۵ تاریخوں کو کہا جاتا ہے کیونکہ ان راتوں میں چاند پورا اور روشن ہوتا ہے۔ رسول اللہ ﷺ نے ہر ماہ ان تین دنوں کے روزے رکھنے کی نصیحت فرمائی، اور فرمایا کہ ہر نیکی کا بدلہ دس گنا ہے لہٰذا یہ پورے زمانے کے روزوں کے برابر ہے (صحیح بخاری: ۱۹۷۵)۔'
    },
    {
      questionEn: 'On which days is fasting forbidden (Haram) in Islam?',
      questionUrdu: 'اسلام میں کن دنوں میں روزہ رکھنا ممنوع اور حرام ہے؟',
      answerEn: 'Fasting is strictly prohibited on two Eid days: Eid al-Fitr (1st Shawwal) and Eid al-Adha (10th Dhul-Hijjah). Additionally, fasting is prohibited during the three Days of Tashreeq (11th, 12th, and 13th Dhul-Hijjah), as they are designated as days of eating, drinking, and remembering Allah (Sahih Muslim 1141).',
      answerUrdu: 'سال میں پانچ دنوں میں روزہ رکھنا شرعاً حرام ہے: ۱) عید الفطر کا دن (یکم شوال)، ۲) عید الاضحیٰ کا دن (۱۰ ذوالحجہ)، اور ۳ تا ۵) ایامِ تشریق یعنی ۱۱، ۱۲ اور ۱۳ ذوالحجہ۔ نبی کریم ﷺ نے فرمایا کہ یہ دن کھانے پینے اور اللہ کا ذکر کرنے کے دن ہیں (صحیح مسلم: ۱۱۴۱)۔'
    },
    {
      questionEn: 'Why do Islamic dates occasionally vary between countries?',
      questionUrdu: 'مختلف ممالک میں اسلامی تاریخوں میں ایک دو دن کا فرق کیوں ہوتا ہے؟',
      answerEn: 'Because Islam prescribes crescent sighting (Ru\'yat al-Hilal) as the primary determinant for new months, variations in moon birth time, sunset timing, geographical coordinates, atmospheric clarity, and varying scholarly jurisprudence (global vs. local sighting) lead local moonsighting committees to occasionally start months 1 day apart.',
      answerUrdu: 'کیونکہ اسلامی مہینے کی بنیاد چاند دیکھنے (رویتِ ہلال) پر ہے۔ مختلف علاقوں میں مطلع کے صاف ہونے، غروبِ آفتاب کے اوقات اور مقامی رویت کے فقہی اختلافات کی وجہ سے دنیا کے مختلف خطوں میں ایک دن کا فرق واقع ہو سکتا ہے جو کہ شرعاً فطری امر ہے۔'
    }
  ]
};

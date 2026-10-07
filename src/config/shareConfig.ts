/**
 * Central Configuration for "Share IslamIQ" feature
 * 
 * Future-ready requirement:
 * The QR destination URL is kept in this single central value.
 * After the IslamIQ Android app is published on Google Play, update
 * QR_DESTINATION_URL here (e.g. to the Google Play Store link)
 * without needing to modify or redesign any components.
 */
export const SHARE_CONFIG = {
  // Official destination encoded in the scannable QR Code
  // Future update target: 'https://play.google.com/store/apps/details?id=com.learnislamiq.app'
  QR_DESTINATION_URL: 'https://learnislamiq.com',

  // App Branding & Identity
  APP_NAME: 'IslamIQ',
  APP_DOMAIN: 'learnislamiq.com',
  TAGLINE: 'Learn • Quiz • Grow',
  
  // Card Typography & Titles
  CARD_HEADING: 'SHARE ISLAMIQ',
  CARD_SUBHEADING_URDU: 'صدقہ جاریہ میں حصہ ڈالیں',
  CARD_SUBHEADING_EN: 'Earn Continuous Rewards (Sadaqah Jariyah)',

  // Exact Urdu message requested by the user
  MAIN_URDU_MESSAGE:
    'اگر آپ اس ایپ کو اپنے 10 جاننے والوں کے ساتھ اور گروپس میں شیئر کریں تو سیکنڑوں پڑھنے والوں کو قرآن، سیکھنے والوں اور لاکھوں نیکیوں کا ثواب آپ کو بھی اور ہمیں بھی ملے گا۔ نیکی کے کام میں دیر کیسی؟ ابھی شیئر کریں اور قیامت تک جاری صدقہ جاریہ میں مفت حصہ ڈالیں۔',

  // QR Code labels
  QR_LABEL_EN: 'Scan to Open IslamIQ',
  QR_LABEL_URDU: 'اسکین کر کے اسلام آئی کیو کھولیں',

  // Buttons & CTAs
  BUTTON_SHARE_NOW_EN: 'SHARE NOW',
  BUTTON_SHARE_NOW_URDU: 'ابھی شیئر کریں',
  BUTTON_DOWNLOAD_EN: 'Download Image',
  BUTTON_DOWNLOAD_URDU: 'تصویر ڈاؤن لوڈ کریں',
  BUTTON_COPY_LINK: 'Copy Link',

  // Fallback social share message
  SHARE_TEXT_FULL:
    'اگر آپ اس ایپ کو اپنے 10 جاننے والوں کے ساتھ اور گروپس میں شیئر کریں تو سیکنڑوں پڑھنے والوں کو قرآن، سیکھنے والوں اور لاکھوں نیکیوں کا ثواب آپ کو بھی اور ہمیں بھی ملے گا۔ نیکی کے کام میں دیر کیسی؟ ابھی شیئر کریں اور قیامت تک جاری صدقہ جاریہ میں مفت حصہ ڈالیں۔\n\n📲 اوپن یا ڈاؤن لوڈ کریں: https://learnislamiq.com'
};

/**
 * Google AdSense & AdMob Configuration and Placement Utility
 * 
 * Instructions for Monetization:
 * 1. For Google AdSense (Web):
 *    - Sign up at https://adsense.google.com
 *    - Replace ADSENSE_CLIENT_ID with your Publisher ID (e.g., 'ca-pub-1234567890123456')
 *    - Replace ad slot IDs with your created Ad Units.
 * 
 * 2. For Google AdMob (Android App):
 *    - Sign up at https://admob.google.com
 *    - Replace ADMOB_BANNER_SLOT_ID with your AdMob Banner Unit ID.
 * 
 * 3. Test Mode:
 *    - While in development/review, keep ENABLE_ADS = true and IS_TEST_MODE = true.
 *    - When your AdSense or AdMob account is approved, set IS_TEST_MODE = false.
 */

export const AD_CONFIG = {
  // Toggle ads on or off globally
  ENABLE_ADS: true,

  // When false, loads real Google AdSense units for approved domains
  IS_TEST_MODE: false,

  // Google AdSense Publisher ID
  ADSENSE_CLIENT_ID: 'ca-pub-9108925465688012',

  // Google AdSense Unit Slots
  SLOTS: {
    HOME_BANNER: '1234567890',
    QUIZ_COMPLETION: '2345678901',
    TASBIH_BANNER: '3456789012',
    QIBLA_BANNER: '4567890123',
    SALAH_FOOTER: '5678901234',
  },

  // AdMob Ad Units (for Capacitor Android app export)
  ADMOB: {
    APP_ID_ANDROID: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
    BANNER_HOME: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    INTERSTITIAL_QUIZ: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  }
};

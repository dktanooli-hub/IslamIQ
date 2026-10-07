/**
 * Google AdSense & AdMob Configuration and Placement Utility
 * Production verified for IslamIQ (Publisher ID: pub-9108925465688012)
 *
 * Monetization & Policy Compliance Rules:
 * 1. Google AdMob (Android App & Web):
 *    - Publisher Account: pub-9108925465688012
 *    - App ID: ca-app-pub-9108925465688012~2468135790
 *    - Banner Ad Unit ID: ca-app-pub-9108925465688012/4729630144
 *    - Verified via app-ads.txt on learnislamiq.com
 *    - Strictly no interstitial or rewarded ad units created (per user request).
 *
 * 2. Placements:
 *    - Non-intrusive placement at the bottom of the main app screens.
 *    - Strictly disabled on utility tools (Tasbih, Qibla compass, Salah tracker, Active quizzes).
 * 
 * 3. Google Play Families & Child-Directed (Kids Mode) Policy:
 *    - Ads are 100% disabled in Kids Mode to comply with Google Play Families Policy & COPPA.
 *    - Child-directed flags enforced: tagForChildDirectedTreatment=true, maxAdContentRating='G'.
 */

// Helper to safely access environment variables in Vite/client
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {} as Record<string, string | undefined>;

export const AD_CONFIG = {
  // Toggle ads on or off globally
  ENABLE_ADS: true,

  // Test mode flag: when true, renders safe preview cards without invoking live ad requests
  IS_TEST_MODE: env.VITE_ADS_TEST_MODE === 'true' || false,

  // Google AdSense Publisher Client ID
  ADSENSE_CLIENT_ID: env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-9108925465688012',

  // Google AdSense / AdMob Unit Slots
  // Single verified production banner unit: ca-app-pub-9108925465688012/4729630144
  SLOTS: {
    HOME_BANNER: env.VITE_ADSENSE_SLOT_HOME || '4729630144',
  },

  // Google AdMob configuration (Mobile App)
  ADMOB: {
    PUBLISHER_ID: 'pub-9108925465688012',
    APP_ID_ANDROID: env.VITE_ADMOB_APP_ID || 'ca-app-pub-9108925465688012~2468135790',
    BANNER_HOME: env.VITE_ADMOB_BANNER_ID || 'ca-app-pub-9108925465688012/4729630144',
  },

  // Google Play Families Policy & COPPA Child-Directed Safeguards
  KIDS_MODE_POLICY: {
    // Zero commercial ads in Kids Mode guarantees 100% child-safe, distraction-free environment
    ADS_ENABLED_FOR_KIDS: false,
    TAG_FOR_CHILD_DIRECTED_TREATMENT: true,
    TAG_FOR_UNDER_AGE_OF_CONSENT: true,
    MAX_AD_CONTENT_RATING: 'G' as const, // General audiences only
  }
};

/**
 * Validates whether an ad slot ID is a placeholder or unconfigured test value.
 */
export const isPlaceholderSlot = (slotId?: string): boolean => {
  if (!slotId) return true;
  return (
    slotId === '1234567890' ||
    slotId.includes('XXXX') ||
    slotId.includes('PLACEHOLDER') ||
    slotId.trim().length === 0
  );
};

/**
 * Determines whether ads should be displayed based on global configuration and current user mode.
 * Strictly adheres to Google Play Families Policy by blocking all ads for children.
 */
export const shouldServeAds = (userMode?: string): boolean => {
  if (!AD_CONFIG.ENABLE_ADS) return false;
  if (userMode === 'kids' && !AD_CONFIG.KIDS_MODE_POLICY.ADS_ENABLED_FOR_KIDS) {
    return false;
  }
  return true;
};

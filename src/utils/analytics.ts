/**
 * Google Analytics 4 (GA4) Integration Helper
 * Measurement ID: G-0NQ964NQ6V
 * Production Domain: https://learnislamiq.com
 */

export const GA_MEASUREMENT_ID = 'G-0NQ964NQ6V';

// Declare gtag on window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track page view including SPA client-side tab/route changes
 * @param path URL path or virtual path (e.g. '/', '/about', '/quiz')
 * @param title Page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: path.startsWith('/') ? path : `/${path}`,
    });
  }
};

/**
 * Track custom user events (e.g. quiz completed, mode switched, tasbih clicked)
 */
export const trackEvent = (action: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
};

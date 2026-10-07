import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG, shouldServeAds, isPlaceholderSlot } from '../config/adConfig';
import { useApp } from '../context/AppContext';
import { Sparkles, Info } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle';
  className?: string;
  labelUrdu?: string;
  labelEn?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = AD_CONFIG.SLOTS.HOME_BANNER,
  format = 'auto',
  className = '',
  labelUrdu = 'اشتہار (Google Ad)',
  labelEn = 'Sponsored / Google Ad'
}) => {
  const { contentLang, userMode } = useApp();
  const isUrdu = contentLang === 'urdu';
  const adRef = useRef<HTMLDivElement>(null);
  const [isUnfilled, setIsUnfilled] = useState(false);

  // 1. STRICT KIDS PROTECTION & GLOBAL TOGGLE
  // Fully compliant with Google Play Families Policy & COPPA: zero ads in Kids Mode
  if (!shouldServeAds(userMode) || userMode === 'kids') {
    return null;
  }

  const placeholder = isPlaceholderSlot(slotId);

  // 2. PRODUCTION AD INITIALIZATION & OBSERVER
  useEffect(() => {
    if (!AD_CONFIG.IS_TEST_MODE && !placeholder && typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch {
        // Silently handle adblock or network restrictions without crashing
      }

      // Check for unfilled status to prevent blank space
      const checkUnfilled = () => {
        if (adRef.current) {
          const insElement = adRef.current.querySelector('ins.adsbygoogle');
          if (insElement) {
            const status = insElement.getAttribute('data-ad-status');
            if (status === 'unfilled') {
              setIsUnfilled(true);
            }
          }
        }
      };

      const timer = setTimeout(checkUnfilled, 2500);
      return () => clearTimeout(timer);
    }
  }, [placeholder, slotId]);

  // If Google AdSense / AdMob reports unfilled or blocked, collapse smoothly without leaving blank space
  if (isUnfilled) {
    return null;
  }

  // 3. SAFE PREVIEW / TEST / PENDING SLOT MODE
  if (AD_CONFIG.IS_TEST_MODE || placeholder) {
    return (
      <div
        className={`w-full my-3 p-3 rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border border-dashed border-slate-300 text-slate-500 text-center transition-all ${className}`}
      >
        <div className="flex items-center justify-between px-1 mb-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {isUrdu ? labelUrdu : labelEn}
          </span>
          <span className="bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded text-[9px]">
            {isUrdu ? 'گوگل ایڈز سلاٹ' : 'AdSense / AdMob Slot'}
          </span>
        </div>

        <div className="py-2 px-3 bg-white/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="font-semibold text-slate-700">
            {isUrdu
              ? 'یہاں آپ کے گوگل اشتہارات (Google AdSense / AdMob) لائیو ہوں گے'
              : 'Your Google AdSense / AdMob live ads will appear here'}
          </p>
          <span className="text-[11px] text-slate-400">
            (Slot ID: {slotId})
          </span>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-slate-400">
          <Info className="w-3 h-3" />
          <span>
            {isUrdu
              ? 'ارننگ شروع کرنے کے لیے src/config/adConfig.ts میں اپنی AdSense/AdMob Unit ID درج کریں۔'
              : 'Live ads will display once your Unit ID is configured in src/config/adConfig.ts'}
          </span>
        </div>
      </div>
    );
  }

  // 4. PRODUCTION LIVE GOOGLE ADS
  return (
    <div ref={adRef} className={`w-full overflow-hidden my-3 text-center transition-all ${className}`}>
      <div className="text-[9px] text-slate-400 uppercase tracking-widest text-center mb-1 select-none">
        {isUrdu ? 'اشتہار' : 'Advertisement'}
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '60px' }}
        data-ad-client={AD_CONFIG.ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

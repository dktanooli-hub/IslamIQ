import React, { useEffect, useRef, useState } from 'react';
import { AD_CONFIG, shouldServeAds, isPlaceholderSlot } from '../config/adConfig';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  slotId?: string;
  adUnitId?: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle';
  className?: string;
  labelUrdu?: string;
  labelEn?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = AD_CONFIG.SLOTS.HOME_BANNER,
  adUnitId = AD_CONFIG.ADMOB.BANNER_HOME,
  format = 'auto',
  className = '',
  labelUrdu = 'سپانسرڈ اشتہار (Google AdMob)',
  labelEn = 'Sponsored / Google AdMob'
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

  // If Google AdMob reports unfilled or blocked, collapse gracefully
  if (isUnfilled) {
    return null;
  }

  // 3. SAFE PREVIEW / TEST / PENDING SLOT MODE
  if (AD_CONFIG.IS_TEST_MODE || placeholder) {
    return (
      <div
        className={`w-full my-4 p-3 rounded-2xl bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border border-dashed border-slate-300 text-slate-500 text-center transition-all min-h-[90px] flex flex-col justify-center ${className}`}
      >
        <div className="flex items-center justify-between px-1 mb-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {isUrdu ? labelUrdu : labelEn}
          </span>
          <span className="bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded text-[9px]">
            Google AdMob Banner
          </span>
        </div>

        <div className="py-2 px-3 bg-white/90 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="font-semibold text-slate-700">
            {isUrdu
              ? 'یہاں آپ کا گوگل ایڈموب بینر اشتہار لائیو ہوگا'
              : 'Google AdMob Live Banner Ad'}
          </p>
          <span className="text-[10px] text-slate-400 font-mono">
            ({adUnitId})
          </span>
        </div>
      </div>
    );
  }

  // 4. DEDICATED RESERVED ADMOB BANNER SPACE
  // Proper reserved space with minHeight ensures no layout shift (CLS) or overlap with buttons
  return (
    <div
      ref={adRef}
      className={`w-full my-4 p-2.5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs text-center transition-all overflow-hidden ${className}`}
      style={{ minHeight: '90px' }}
    >
      <div className="flex items-center justify-between px-1.5 mb-1 text-[9px] text-slate-400 uppercase tracking-wider select-none">
        <span className="flex items-center gap-1 font-semibold">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          {isUrdu ? 'سپانسرڈ اشتہار (Google AdMob)' : 'Sponsored / Google AdMob'}
        </span>
        <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">
          AdMob: {adUnitId}
        </span>
      </div>
      <div className="flex items-center justify-center min-h-[50px] w-full">
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '100%', minHeight: '50px' }}
          data-ad-client={AD_CONFIG.ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

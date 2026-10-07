import React, { useEffect, useRef } from 'react';
import { AD_CONFIG, shouldServeAds } from '../config/adConfig';
import { useApp } from '../context/AppContext';

interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle';
  className?: string;
  label?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = AD_CONFIG.SLOTS.HOME_BANNER,
  format = 'auto',
  className = '',
  label = 'Advertisement'
}) => {
  const { contentLang, userMode } = useApp();
  const isUrdu = contentLang === 'urdu';
  const adRef = useRef<HTMLDivElement>(null);

  // 1. Strict Kids Protection & Global Toggle: zero ads in Kids Mode
  if (!shouldServeAds(userMode) || userMode === 'kids') {
    return null;
  }

  // 2. Existing Google AdSense integration on the website
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
        adsbygoogle.push({});
      } catch {
        // Silently ignore script or network errors (e.g. ad blockers)
      }
    }
  }, [slotId]);

  return (
    <div className={`w-full my-4 ${className}`}>
      {/* Visible "Advertisement" label */}
      <div className="flex items-center justify-center mb-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest select-none">
          {isUrdu ? 'اشتہار • Advertisement' : label}
        </span>
      </div>

      {/* Empty advertisement space/container underneath for Google AdSense */}
      <div
        ref={adRef}
        className="w-full min-h-[90px] sm:min-h-[100px] rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs flex items-center justify-center overflow-hidden p-2 text-center"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={AD_CONFIG.ADSENSE_CLIENT_ID}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

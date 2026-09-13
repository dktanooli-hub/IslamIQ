import React from 'react';

export type KidsEnvironmentType = 'madrasa' | 'mosque' | 'night';

interface KidsEnvironmentProps {
  environment: KidsEnvironmentType;
  children: React.ReactNode;
  onSwitchEnvironment?: (env: KidsEnvironmentType) => void;
  contentLang?: 'urdu' | 'english';
}

export const KidsEnvironment: React.FC<KidsEnvironmentProps> = ({
  environment,
  children,
  onSwitchEnvironment,
  contentLang = 'urdu'
}) => {
  const isUrdu = contentLang === 'urdu';

  const envInfo = {
    madrasa: {
      nameUrdu: 'مدرسہ / کلاس روم',
      nameEn: 'Madrasa Classroom',
      icon: '🏫',
      gradient: 'from-amber-100/90 via-emerald-50/70 to-teal-100/80',
      border: 'border-amber-200'
    },
    mosque: {
      nameUrdu: 'مسجد کا صحن',
      nameEn: 'Mosque Courtyard',
      icon: '🕌',
      gradient: 'from-sky-100/90 via-teal-50/70 to-emerald-100/80',
      border: 'border-teal-200'
    },
    night: {
      nameUrdu: 'تاروں بھری رات',
      nameEn: 'Starry Crescent Night',
      icon: '🌙',
      gradient: 'from-slate-900 via-indigo-950 to-teal-950 text-white',
      border: 'border-indigo-800/80'
    }
  }[environment];

  return (
    <div className={`relative rounded-3xl overflow-hidden border-2 transition-all duration-500 shadow-md ${envInfo.border} bg-gradient-to-b ${envInfo.gradient}`}>
      
      {/* BACKGROUND VECTOR SCENERY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {environment === 'madrasa' && (
          <div className="w-full h-full relative opacity-60">
            {/* Islamic Arched Window in center */}
            <svg className="absolute top-0 right-4 sm:right-10 w-28 sm:w-36 h-36" viewBox="0 0 100 120" fill="none">
              {/* Window Arch Frame */}
              <path d="M 10 120 L 10 45 C 10 20 50 5 50 5 C 50 5 90 20 90 45 L 90 120 Z" fill="#E0F2FE" stroke="#F59E0B" strokeWidth="4" />
              {/* Glass Panes */}
              <line x1="50" y1="20" x2="50" y2="120" stroke="#BAE6FD" strokeWidth="2" />
              <line x1="10" y1="70" x2="90" y2="70" stroke="#BAE6FD" strokeWidth="2" />
              {/* Distant Palm Silhouette in window */}
              <path d="M 45 100 Q 50 85 48 70 Q 55 60 62 65" stroke="#10B981" strokeWidth="2" fill="none" />
            </svg>

            {/* Bookshelf on left with colorful Quran/books */}
            <svg className="absolute top-4 left-3 sm:left-6 w-24 sm:w-32 h-32" viewBox="0 0 100 100" fill="none">
              {/* Shelf Wooden plank */}
              <rect x="5" y="65" width="90" height="7" rx="2" fill="#D97706" />
              <rect x="15" y="25" width="10" height="40" rx="1.5" fill="#059669" />
              <rect x="27" y="22" width="12" height="43" rx="1.5" fill="#DC2626" />
              <rect x="41" y="28" width="10" height="37" rx="1.5" fill="#2563EB" />
              <rect x="53" y="20" width="14" height="45" rx="1.5" fill="#D97706" />
              {/* Gold lettering strip on books */}
              <line x1="17" y1="45" x2="23" y2="45" stroke="#FEF08A" strokeWidth="2" />
              <line x1="29" y1="42" x2="37" y2="42" stroke="#FEF08A" strokeWidth="2" />
              <line x1="56" y1="38" x2="64" y2="38" stroke="#FEF08A" strokeWidth="2" />
            </svg>

            {/* Traditional Rehal (Wooden Bookstand) */}
            <svg className="absolute bottom-2 right-6 w-16 sm:w-20 h-16" viewBox="0 0 80 60" fill="none">
              {/* Crossed wooden legs */}
              <path d="M 15 50 L 65 20" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
              <path d="M 65 50 L 15 20" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
              {/* Open Quran pages resting */}
              <path d="M 20 22 Q 40 28 40 18 Q 40 28 60 22 L 60 26 Q 40 32 40 22 Q 40 32 20 26 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
            </svg>
          </div>
        )}

        {environment === 'mosque' && (
          <div className="w-full h-full relative opacity-50">
            {/* Mosque Domes and Minarets Silhouette */}
            <svg className="absolute bottom-0 inset-x-0 w-full h-36" preserveAspectRatio="none" viewBox="0 0 400 120" fill="none">
              {/* Main Central Onion Dome */}
              <path d="M 150 120 L 150 80 C 150 45 200 25 200 10 C 200 25 250 45 250 80 L 250 120 Z" fill="#0D9488" fillOpacity="0.25" />
              {/* Golden Crescent on top of dome */}
              <path d="M 200 6 C 203 6 206 9 206 13 C 206 17 202 19 198 18 C 202 17 204 14 204 12 C 204 9 202 7 200 6 Z" fill="#F59E0B" />
              {/* Left Minaret */}
              <rect x="70" y="20" width="16" height="100" fill="#0D9488" fillOpacity="0.3" rx="2" />
              <path d="M 66 20 L 78 2 L 90 20 Z" fill="#0F766E" fillOpacity="0.4" />
              {/* Right Minaret */}
              <rect x="314" y="20" width="16" height="100" fill="#0D9488" fillOpacity="0.3" rx="2" />
              <path d="M 310 20 L 322 2 L 334 20 Z" fill="#0F766E" fillOpacity="0.4" />
              {/* Courtyard Arches */}
              <path d="M 10 120 L 10 95 C 10 80 35 70 35 70 C 35 70 60 80 60 95 L 60 120 Z" fill="#14B8A6" fillOpacity="0.2" />
              <path d="M 340 120 L 340 95 C 340 80 365 70 365 70 C 365 70 390 80 390 95 L 390 120 Z" fill="#14B8A6" fillOpacity="0.2" />
            </svg>

            {/* Soft Drifting Clouds */}
            <div className="absolute top-3 left-10 w-16 h-7 bg-white/70 rounded-full blur-[1px] animate-pulse" />
            <div className="absolute top-6 right-20 w-24 h-9 bg-white/60 rounded-full blur-[1px] animate-pulse" />
          </div>
        )}

        {environment === 'night' && (
          <div className="w-full h-full relative">
            {/* Glowing Golden Crescent Moon */}
            <svg className="absolute top-3 right-6 sm:right-12 w-14 sm:w-18 h-14 sm:h-18 animate-kids-float" viewBox="0 0 50 50" fill="none">
              <path
                d="M 35 8 C 42 16 40 28 32 35 C 24 42 12 40 8 32 C 18 36 28 30 32 20 C 34 14 34 10 35 8 Z"
                fill="#FBBF24"
                stroke="#FDE68A"
                strokeWidth="1.5"
                className="filter drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]"
              />
              <circle cx="28" cy="14" r="1.5" fill="#FEF08A" />
            </svg>

            {/* Twinkling Stars */}
            <div className="absolute top-4 left-10 text-yellow-200 text-xs animate-kids-twinkle">✦</div>
            <div className="absolute top-12 left-28 text-yellow-100 text-base animate-kids-twinkle" style={{ animationDelay: '0.6s' }}>★</div>
            <div className="absolute top-7 left-1/2 text-yellow-300 text-xs animate-kids-twinkle" style={{ animationDelay: '1.2s' }}>✦</div>
            <div className="absolute top-14 right-28 text-amber-200 text-sm animate-kids-twinkle" style={{ animationDelay: '0.9s' }}>★</div>
            <div className="absolute top-20 left-16 text-yellow-200 text-xs animate-kids-twinkle" style={{ animationDelay: '1.5s' }}>✦</div>

            {/* Traditional Hanging Fanous (Lanterns) */}
            <svg className="absolute top-0 left-6 sm:left-12 w-8 sm:w-10 h-24 animate-kids-lantern" viewBox="0 0 40 90" fill="none">
              {/* String */}
              <line x1="20" y1="0" x2="20" y2="35" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Top Cap */}
              <path d="M 12 35 L 28 35 L 24 42 L 16 42 Z" fill="#D97706" />
              {/* Glass Lantern Body with warm glow */}
              <polygon points="12,42 28,42 25,65 15,65" fill="#FEF08A" fillOpacity="0.85" stroke="#B45309" strokeWidth="1.5" className="filter drop-shadow-[0_0_8px_rgba(254,240,138,0.9)]" />
              {/* Flame inside */}
              <ellipse cx="20" cy="53" rx="2" ry="4" fill="#EA580C" />
              {/* Bottom Tassel */}
              <path d="M 16 65 L 24 65 L 20 72 Z" fill="#D97706" />
              <line x1="20" y1="72" x2="20" y2="82" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* TOP HEADER CONTROLS: ENVIRONMENT SELECTOR */}
      <div className="relative z-10 px-4 pt-3 pb-1 flex items-center justify-between gap-2 border-b border-black/5">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{envInfo.icon}</span>
          <span className="text-xs font-bold tracking-tight opacity-90">
            {isUrdu ? envInfo.nameUrdu : envInfo.nameEn}
          </span>
        </div>

        {/* Environment Switcher Pills */}
        {onSwitchEnvironment && (
          <div className="flex items-center bg-white/70 backdrop-blur-xs p-1 rounded-2xl border border-white/40 shadow-2xs gap-1">
            {(['madrasa', 'mosque', 'night'] as KidsEnvironmentType[]).map((env) => {
              const active = environment === env;
              const icons = { madrasa: '🏫', mosque: '🕌', night: '🌙' };
              const labels = {
                madrasa: isUrdu ? 'مدرسہ' : 'School',
                mosque: isUrdu ? 'مسجد' : 'Mosque',
                night: isUrdu ? 'رات' : 'Night'
              };

              return (
                <button
                  key={env}
                  onClick={() => onSwitchEnvironment(env)}
                  className={`px-2 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition-all active:scale-95 ${
                    active
                      ? 'bg-amber-400 text-amber-950 shadow-xs scale-102'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                  title={labels[env]}
                >
                  <span>{icons[env]}</span>
                  <span className="hidden sm:inline">{labels[env]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 p-3 sm:p-5">
        {children}
      </div>

    </div>
  );
};

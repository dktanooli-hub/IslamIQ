import React from 'react';

export type KidsCharacterType = 'zayd' | 'maryam';
export type KidsCharacterMood = 'idle' | 'intro' | 'speaking' | 'talking' | 'thinking' | 'celebrating' | 'happy' | 'reacting';

interface KidsCharacterProps {
  type: KidsCharacterType;
  mood: KidsCharacterMood;
  contentLang?: 'urdu' | 'english';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customBubbleText?: string;
  showSpeechBubble?: boolean;
  className?: string;
  onClick?: () => void;
}

export const KidsCharacter: React.FC<KidsCharacterProps> = ({
  type,
  mood,
  contentLang = 'urdu',
  size = 'md',
  customBubbleText,
  showSpeechBubble = true,
  className = '',
  onClick
}) => {
  const isZayd = type === 'zayd';
  const isUrdu = contentLang === 'urdu';

  // Normalize moods
  const isSpeakingMood = mood === 'speaking' || mood === 'talking';
  const isHappyMood = mood === 'celebrating' || mood === 'happy';
  const isThinkingMood = mood === 'thinking';
  const isIntroMood = mood === 'intro';
  const isReactingMood = mood === 'reacting';
  const isIdleMood = mood === 'idle';

  // Dimension scaling
  const dimensions = {
    sm: { w: 120, h: 140 },
    md: { w: 160, h: 185 },
    lg: { w: 200, h: 230 },
    xl: { w: 230, h: 265 }
  }[size];

  // Animation wrapper classes depending on mood
  let moodAnimationClass = 'animate-kids-float';
  if (isSpeakingMood) moodAnimationClass = 'transition-transform duration-300 scale-102';
  else if (isThinkingMood) moodAnimationClass = 'animate-kids-thinking';
  else if (isHappyMood) moodAnimationClass = 'animate-kids-jump';
  else if (isIdleMood) moodAnimationClass = 'animate-kids-float';

  return (
    <div
      onClick={onClick}
      className={`relative select-none inline-flex flex-col items-center justify-center cursor-pointer transition-all ${className}`}
      title={isUrdu ? (isZayd ? 'زید (ہم جماعت)' : 'مریم (ہم جماعت)') : (isZayd ? 'Zayd (Classmate)' : 'Maryam (Classmate)')}
    >
      {/* Speech / Mood Bubble above character */}
      {showSpeechBubble && (
        <div className="absolute -top-9 sm:-top-10 z-20 transition-all transform duration-300 max-w-[280px] sm:max-w-xs text-center">
          {customBubbleText ? (
            <div className="bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-black text-xs sm:text-sm px-4 py-1.5 rounded-2xl shadow-lg border-2 border-amber-200 animate-kids-pop flex items-center justify-center gap-1.5 leading-snug">
              <span className={isUrdu ? 'urdu-text' : ''}>{customBubbleText}</span>
            </div>
          ) : (
            <>
              {isIntroMood && (
                <div className="bg-amber-400 text-amber-950 font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full shadow-md border-2 border-amber-200 animate-kids-pop whitespace-nowrap flex items-center gap-1">
                  <span>👋</span>
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'السلام علیکم! چلیں مل کر سیکھیں!' : 'Assalamu Alaikum! Let\'s learn!'}
                  </span>
                </div>
              )}

              {isSpeakingMood && (
                <div className="bg-teal-500 text-white font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-md border border-teal-300 animate-pulse whitespace-nowrap flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'غور سے سنیں...' : 'Listen carefully...'}
                  </span>
                </div>
              )}

              {isThinkingMood && (
                <div className="bg-sky-100 text-sky-950 font-bold text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md border border-sky-300 whitespace-nowrap flex items-center gap-1">
                  <span>💭</span>
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'سوچیے اور بتائیے...' : 'Thinking...'}
                  </span>
                </div>
              )}

              {isHappyMood && (
                <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 font-black text-xs sm:text-sm px-3.5 py-1 rounded-full shadow-lg border-2 border-amber-300 animate-bounce whitespace-nowrap flex items-center gap-1.5">
                  <span>⭐</span>
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'ماشاءاللہ! بہت خوب!' : 'Masha\'Allah! Well done!'}
                  </span>
                  <span>🎉</span>
                </div>
              )}

              {isReactingMood && (
                <div className="bg-emerald-100 text-emerald-950 font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-md border border-emerald-300 whitespace-nowrap flex items-center gap-1">
                  <span>💪</span>
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'کوئی بات نہیں، دوبارہ کوشش کریں!' : 'Good try! Keep going!'}
                  </span>
                </div>
              )}

              {isIdleMood && (
                <div className="bg-amber-100 text-amber-950 font-bold text-[11px] sm:text-xs px-3 py-0.5 rounded-full shadow-sm border border-amber-200 whitespace-nowrap flex items-center gap-1">
                  <span>😊</span>
                  <span className={isUrdu ? 'urdu-text' : ''}>
                    {isUrdu ? 'السلام علیکم! کیا کرنا چاہتے ہیں؟' : 'Assalamu Alaikum! What would you like to do?'}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Main SVG Character Graphic */}
      <div className={`relative ${moodAnimationClass}`}>
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 160 185"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md overflow-visible"
        >
          {/* Subtle Shadow underneath feet */}
          <ellipse cx="80" cy="178" rx="42" ry="7" fill="#000000" fillOpacity="0.14" />

          {/* CELEBRATION PARTICLES / STARS */}
          {isHappyMood && (
            <g className="animate-pulse">
              <path d="M 20 40 L 23 48 L 31 48 L 25 53 L 27 61 L 20 56 L 13 61 L 15 53 L 9 48 L 17 48 Z" fill="#FBBF24" />
              <path d="M 140 35 L 142 42 L 149 42 L 144 46 L 146 53 L 140 49 L 134 53 L 136 46 L 131 42 L 138 42 Z" fill="#FBBF24" />
              <circle cx="28" cy="24" r="3" fill="#34D399" />
              <circle cx="132" cy="20" r="4" fill="#F472B6" />
              <circle cx="18" cy="75" r="3.5" fill="#60A5FA" />
              <circle cx="145" cy="70" r="3" fill="#A78BFA" />
            </g>
          )}

          {/* THINKING THOUGHT BUBBLE CIRCLES */}
          {isThinkingMood && (
            <g className="animate-pulse opacity-90">
              <circle cx="126" cy="52" r="3.5" fill="#BAE6FD" />
              <circle cx="134" cy="40" r="6" fill="#BAE6FD" />
              <circle cx="146" cy="25" r="10" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
              <text x="146" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0284C7">?</text>
            </g>
          )}

          {/* BODY / TORSO */}
          <g id="body">
            {/* White/Cream Kurta / Dress Base */}
            <path
              d="M 52 110 C 52 100 108 100 108 110 L 118 168 C 118 172 112 174 100 174 L 60 174 C 48 174 42 172 42 168 Z"
              fill={isZayd ? "#F8FAFC" : "#FFF7ED"}
              stroke="#E2E8F0"
              strokeWidth="1.5"
            />

            {/* Zayd: Teal/Mint Vest over Kurta with gold trim */}
            {isZayd && (
              <g id="zayd-vest">
                {/* Left Vest panel */}
                <path
                  d="M 52 110 L 68 112 L 64 165 L 45 163 C 43 155 45 125 52 110 Z"
                  fill="#0D9488"
                />
                {/* Right Vest panel */}
                <path
                  d="M 108 110 L 92 112 L 96 165 L 115 163 C 117 155 115 125 108 110 Z"
                  fill="#0D9488"
                />
                {/* Golden Buttons */}
                <circle cx="80" cy="125" r="2" fill="#D97706" />
                <circle cx="80" cy="138" r="2" fill="#D97706" />
                <circle cx="80" cy="151" r="2" fill="#D97706" />
                {/* Golden Vest Border Trim */}
                <path d="M 68 112 L 64 165" stroke="#F59E0B" strokeWidth="1.5" />
                <path d="M 92 112 L 96 165" stroke="#F59E0B" strokeWidth="1.5" />
              </g>
            )}

            {/* Maryam: Soft Peach / Lavender Vest & Floral Pattern */}
            {!isZayd && (
              <g id="maryam-attire">
                <path
                  d="M 54 114 C 65 118 95 118 106 114 L 112 166 C 100 170 60 170 48 166 Z"
                  fill="#FDF2F8"
                  stroke="#FBCFE8"
                  strokeWidth="1"
                />
                {/* Small cute flower brooch */}
                <circle cx="68" cy="124" r="3.5" fill="#F472B6" />
                <circle cx="68" cy="124" r="1.5" fill="#FEF08A" />
              </g>
            )}

            {/* Collar neckline */}
            <path
              d="M 70 106 Q 80 114 90 106"
              stroke={isZayd ? "#0F766E" : "#DB2777"}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* ARMS & HANDS DEPENDING ON MOOD */}
          <g id="arms">
            {/* CELEBRATING / HAPPY: BOTH ARMS RAISED IN VICTORY 🙌 */}
            {isHappyMood ? (
              <g id="celebrating-arms">
                {/* Left Arm raised high */}
                <path
                  d="M 52 112 C 34 95 24 72 20 54"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Left Hand */}
                <circle cx="18" cy="50" r="7.5" fill="#FED7AA" />
                {/* Right Arm raised high */}
                <path
                  d="M 108 112 C 126 95 136 72 140 54"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Right Hand */}
                <circle cx="142" cy="50" r="7.5" fill="#FED7AA" />
              </g>
            ) : isIntroMood ? (
              /* INTRO: RIGHT HAND WAVING 👋 */
              <g id="waving-arms">
                {/* Left Arm relaxed */}
                <path
                  d="M 52 112 C 40 126 36 142 38 152"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="38" cy="154" r="6.5" fill="#FED7AA" />
                {/* Right Arm waving up */}
                <path
                  d="M 108 112 C 124 98 136 82 136 68"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Hand waving */}
                <circle cx="136" cy="62" r="7.5" fill="#FED7AA" />
              </g>
            ) : isThinkingMood ? (
              /* THINKING: HAND ON CHIN 🤔 */
              <g id="thinking-arms">
                {/* Left Arm relaxed */}
                <path
                  d="M 52 112 C 40 126 36 142 38 152"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="38" cy="154" r="6.5" fill="#FED7AA" />
                {/* Right Arm bent towards chin */}
                <path
                  d="M 108 112 C 122 125 115 142 98 118 L 92 98"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="92" cy="95" r="6.5" fill="#FED7AA" />
              </g>
            ) : isReactingMood ? (
              /* REACTING: HAND ON HEART IN COMFORT / ENCOURAGEMENT 💖 */
              <g id="reacting-arms">
                {/* Left arm bent to heart */}
                <path
                  d="M 52 112 C 55 125 65 130 75 125"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="78" cy="124" r="6.5" fill="#FED7AA" />
                {/* Right arm gentle relaxed */}
                <path
                  d="M 108 112 C 120 126 122 142 120 152"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="154" r="6.5" fill="#FED7AA" />
              </g>
            ) : isIdleMood ? (
              /* IDLE / RELAXED ARMS */
              <g id="idle-arms">
                <path
                  d="M 52 112 C 44 126 42 142 44 154"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="44" cy="156" r="6.5" fill="#FED7AA" />
                <path
                  d="M 108 112 C 116 126 118 142 116 154"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="116" cy="156" r="6.5" fill="#FED7AA" />
              </g>
            ) : (
              /* SPEAKING / DEFAULT: GESTURING TOWARDS QUESTION BOARD 👉 */
              <g id="speaking-arms">
                {/* Left arm pointing/presenting */}
                <path
                  d="M 52 112 C 32 108 20 98 14 90"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="88" r="6.5" fill="#FED7AA" />
                {/* Right arm relaxed */}
                <path
                  d="M 108 112 C 120 126 122 142 120 152"
                  stroke={isZayd ? "#0D9488" : "#F472B6"}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="154" r="6.5" fill="#FED7AA" />
              </g>
            )}
          </g>

          {/* HEAD & FACE */}
          <g id="head-group">
            {/* Neck */}
            <rect x="73" y="94" width="14" height="14" rx="4" fill="#FED7AA" />

            {/* Zayd Hair (Background layer) */}
            {isZayd && (
              <path
                d="M 46 68 C 42 42 118 42 114 68 C 114 80 46 80 46 68 Z"
                fill="#334155"
              />
            )}

            {/* Maryam Hijab (Back wrap) */}
            {!isZayd && (
              <path
                d="M 38 68 C 36 34 124 34 122 68 C 122 110 114 125 80 125 C 46 125 38 110 38 68 Z"
                fill="#E879F9"
                stroke="#C026D3"
                strokeWidth="1.5"
              />
            )}

            {/* Face Oval */}
            <ellipse cx="80" cy="68" rx="30" ry="32" fill="#FED7AA" />

            {/* Maryam Inner Hijab / Undercap */}
            {!isZayd && (
              <path
                d="M 52 50 Q 80 42 108 50 Q 106 60 102 66 Q 80 58 58 66 Q 54 60 52 50 Z"
                fill="#FDF2F8"
                opacity="0.9"
              />
            )}

            {/* Zayd: Cute Islamic Kufi / Prayer Cap with Gold Embroidery */}
            {isZayd && (
              <g id="zayd-kufi">
                {/* Cap base dome */}
                <path
                  d="M 48 54 C 48 30 112 30 112 54 Z"
                  fill="#FFFFFF"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                />
                {/* Gold Embroidery Band */}
                <path
                  d="M 48 52 Q 80 56 112 52 L 112 56 Q 80 60 48 56 Z"
                  fill="#F59E0B"
                />
                {/* Cap decorative stitches */}
                <circle cx="64" cy="46" r="1.5" fill="#D97706" />
                <circle cx="80" cy="42" r="1.5" fill="#D97706" />
                <circle cx="96" cy="46" r="1.5" fill="#D97706" />
                {/* Front cute hair bangs */}
                <path d="M 52 56 Q 64 63 72 58 Q 78 64 88 57" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Maryam Hijab Front drape framing face */}
            {!isZayd && (
              <g id="maryam-front-hijab">
                <path
                  d="M 44 65 C 44 40 116 40 116 65 C 116 88 108 105 80 105 C 52 105 44 88 44 65 Z"
                  fill="none"
                  stroke="#E879F9"
                  strokeWidth="12"
                />
                {/* Hijab bottom gentle knot */}
                <circle cx="80" cy="106" r="5" fill="#D946EF" />
              </g>
            )}

            {/* Cute Rosy Cheeks */}
            <circle cx="60" cy="74" r="5" fill="#FB7185" fillOpacity="0.4" />
            <circle cx="100" cy="74" r="5" fill="#FB7185" fillOpacity="0.4" />

            {/* EYES & EYEBROWS */}
            {isHappyMood ? (
              /* Joyful closed squinting smiling eyes ^_^ */
              <g id="celebrating-eyes">
                <path d="M 62 66 Q 68 59 74 66" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M 86 66 Q 92 59 98 66" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                {/* Raised happy eyebrows */}
                <path d="M 61 58 Q 68 53 74 58" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 86 58 Q 92 53 99 58" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            ) : isThinkingMood ? (
              /* Thinking curious eyes looking up to the side */
              <g id="thinking-eyes">
                <ellipse cx="68" cy="65" rx="5" ry="6" fill="#1E293B" />
                <circle cx="70" cy="63" r="1.8" fill="#FFFFFF" />
                <ellipse cx="92" cy="65" rx="5" ry="6" fill="#1E293B" />
                <circle cx="94" cy="63" r="1.8" fill="#FFFFFF" />
                {/* One eyebrow raised, one lowered */}
                <path d="M 61 56 Q 68 51 74 56" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M 86 59 Q 92 61 98 58" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              /* Normal bright friendly eyes with sparkles */
              <g id="normal-eyes">
                <ellipse cx="67" cy="67" rx="5.2" ry="6.5" fill="#1E293B" />
                <circle cx="69" cy="65" r="2" fill="#FFFFFF" />
                <circle cx="65.5" cy="68.5" r="1" fill="#FFFFFF" />
                <ellipse cx="93" cy="67" rx="5.2" ry="6.5" fill="#1E293B" />
                <circle cx="95" cy="65" r="2" fill="#FFFFFF" />
                <circle cx="91.5" cy="68.5" r="1" fill="#FFFFFF" />
                {/* Friendly curved eyebrows */}
                <path d="M 61 58 Q 67 54 73 58" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M 87 58 Q 93 54 99 58" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Little Cute Button Nose */}
            <circle cx="80" cy="73" r="1.8" fill="#FDBA74" />

            {/* MOUTH DEPENDING ON MOOD */}
            {isSpeakingMood ? (
              /* Animated Speaking Mouth */
              <g id="speaking-mouth" className="animate-kids-mouth">
                <ellipse cx="80" cy="82" rx="4.5" ry="4" fill="#E11D48" />
                <path d="M 77 80 Q 80 81 83 80" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            ) : isHappyMood ? (
              /* Big Joyful Smile with visible teeth and tongue */
              <g id="celebrating-mouth">
                <path
                  d="M 72 79 Q 80 92 88 79 Z"
                  fill="#BE123C"
                  stroke="#BE123C"
                  strokeWidth="1"
                />
                <path d="M 74 80 Q 80 82 86 80" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
                <ellipse cx="80" cy="85" rx="3" ry="2" fill="#FB7185" />
              </g>
            ) : isReactingMood ? (
              /* Gentle Encouraging Smile */
              <path
                d="M 74 80 Q 80 86 86 80"
                stroke="#BE123C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            ) : isThinkingMood ? (
              /* Small thoughtful 'o' or tilted smile */
              <path
                d="M 76 81 Q 81 80 85 82"
                stroke="#BE123C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              /* Warm friendly smile */
              <path
                d="M 73 80 Q 80 87 87 80"
                stroke="#BE123C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        </svg>
      </div>

      {/* Character Name Tag & Switch Affordance */}
      <div className="mt-1 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-200/80 shadow-2xs hover:bg-white transition-all">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-extrabold text-teal-900">
          {isZayd ? (isUrdu ? 'زید' : 'Zayd') : (isUrdu ? 'مریم' : 'Maryam')}
        </span>
        <span className="text-[10px] text-amber-600 font-bold ml-0.5">
          {isUrdu ? 'تبدیل کریں ⇄' : 'Switch ⇄'}
        </span>
      </div>
    </div>
  );
};

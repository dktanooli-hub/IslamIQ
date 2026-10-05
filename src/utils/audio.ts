// Web Audio API Sound Generator (zero external audio file dependencies)
class SoundPlayer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Tactile soft click / wooden bead click for Tasbih
  playTasbihBead() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay may be blocked until user interacts
    }
  }

  // Gentle chime for correct answer
  playCorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => { // C5, E5, G5, C6
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.36);
      });
    } catch {}
  }

  // Soft low tone for incorrect
  playIncorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.2);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {}
  }

  // Celebration gentle chime for completing a lap or quiz
  playComplete() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.2, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.55);
      });
    } catch {}
  }

  // Playful cheerful celebratory chime for kids correct answers
  playKidsCheerful() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      // Cheerful ascending arpeggio (C5 -> E5 -> G5 -> B5 -> C6)
      const pitches = [523.25, 659.25, 783.99, 987.77, 1046.50];
      pitches.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.22, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.36);
      });
    } catch {}
  }

  // Convenient aliases for UI actions
  buttonClick() {
    this.playTasbihBead();
  }

  chime() {
    this.playKidsCheerful();
  }

  correct() {
    this.playKidsCheerful();
  }
}

export const sounds = new SoundPlayer();

export interface SpeechSegment {
  text: string;
  lang: 'arabic' | 'urdu' | 'english';
  pauseAfterMs?: number;
}

/**
 * Robust Arabic text and Islamic terms detector.
 * Identifies Arabic script, Tashkeel/harakat, Quranic phrases, and canonical Islamic terms,
 * and segments mixed text into discrete utterances for proper TTS voice dispatch.
 */
export class ArabicDetector {
  // Arabic Tashkeel / Harakat (diacritics)
  static readonly TASHKEEL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/;

  // Urdu-only characters that do not exist in standard Arabic
  static readonly URDU_ONLY_CHARS_REGEX = /[ٹڈڑںےۓہھچپژگ]/;

  // English Latin characters
  static readonly ENGLISH_CHARS_REGEX = /[a-zA-Z]/;

  // Arabic alphabet script block
  static readonly ARABIC_SCRIPT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  // Canonical Islamic Arabic phrases patterns
  static readonly ARABIC_PHRASE_PATTERNS: RegExp[] = [
    // Bismillah
    /بِسْمِ\s*اللَّهِ\s*الرَّحْمٰنِ\s*الرَّحِيمِ/gui,
    /بسم\s*[اأ]لله\s*الرحمن\s*الرحيم/gui,
    /بسم\s*اللہ\s*الرحمن\s*الرحیم/gui,
    /بِسْمِ\s*اللَّهِ/gui,
    /بسم\s*[اأ]لله/gui,
    /بسم\s*اللہ/gui,

    // Alhamdulillah
    /الْحَمْدُ\s*لِلَّهِ\s*رَبِّ\s*الْعَالَمِينَ/gui,
    /الْحَمْدُ\s*لِلَّهِ/gui,
    /الحمد\s*لله\s*رب\s*العالمين/gui,
    /الحمد\s*للہ\s*رب\s*العالمین/gui,
    /الحمد\s*لله/gui,
    /الحمد\s*للہ/gui,
    /الحمدللہ/gui,
    /الحمدلله/gui,

    // SubhanAllah
    /سُبْحَانَ\s*اللَّهِ\s*وَبِحَمْدِهِ/gui,
    /سبحان\s*[اأ]لله\s*وبحمده/gui,
    /سبحان\s*اللہ\s*وبحمدہ/gui,
    /سُبْحَانَ\s*اللَّهِ/gui,
    /سبحان\s*[اأ]لله/gui,
    /سبحان\s*اللہ/gui,

    // Allahu Akbar
    /اللَّهُ\s*أَكْبَرُ/gui,
    /الله\s*[أا]كبر/gui,
    /اللہ\s*اکبر/gui,

    // Masha'Allah (must be treated as Arabic)
    /مَاشَاءَ\s*اللَّهُ/gui,
    /مَا\s*شَاءَ\s*اللَّهُ/gui,
    /ماشاء\s*الله/gui,
    /ما\s*شاء\s*الله/gui,
    /ماشاءالله/gui,
    /ماشاء\s*اللہ/gui,
    /ما\s*شاء\s*اللہ/gui,
    /ماشاءاللہ/gui,

    // Insha'Allah
    /إِنْ\s*شَاءَ\s*اللَّهُ/gui,
    /إن\s*شاء\s*الله/gui,
    /ان\s*شاء\s*اللہ/gui,
    /إنشاء\s*الله/gui,
    /انشاء\s*اللہ/gui,
    /انشاءاللہ/gui,
    /انشاءالله/gui,

    // JazakAllah
    /جَزَاكَ\s*اللَّهُ\s*خَيْرًا/gui,
    /جزاك\s*الله\s*خيرا/gui,
    /جزاک\s*اللہ\s*خیرا/gui,
    /جَزَاكَ\s*اللَّهُ/gui,
    /جزاك\s*الله/gui,
    /جزاک\s*اللہ/gui,

    // Astaghfirullah
    /أَسْتَغْفِرُ\s*اللَّهَ/gui,
    /أستغفر\s*الله/gui,
    /استغفر\s*الله/gui,
    /استغفر\s*اللہ/gui,

    // La ilaha illallah
    /لَا\s*إِلٰهَ\s*إِلَّا\s*اللَّهُ/gui,
    /لا\s*إله\s*إلا\s*الله/gui,
    /لا\s*الہ\s*الا\s*اللہ/gui,

    // Hawqala
    /لَا\s*حَوْلَ\s*وَلَا\s*قُوَّةَ\s*إِلَّا\s*بِاللَّهِ/gui,
    /لا\s*حول\s*ولا\s*قوة\s*إلا\s*بالله/gui,
    /لا\s*حول\s*ولا\s*قوۃ\s*الا\s*باللہ/gui,

    // Istirja
    /إِنَّا\s*لِلَّهِ\s*وَإِنَّا\s*إِلَيْهِ\s*رَاجِعُونَ/gui,
    /إنا\s*لله\s*وإنا\s*إليه\s*راجعون/gui,
    /انا\s*للہ\s*وانا\s*الیہ\s*راجعون/gui,

    // Salam Greetings
    /السَّلَامُ\s*عَلَيْكُمْ\s*وَرَحْمَةُ\s*اللَّهِ/gui,
    /السلام\s*عليكم\s*ورحمة\s*الله/gui,
    /السلام\s*علیکم\s*ورحمۃ\s*اللہ/gui,
    /السَّلَامُ\s*عَلَيْكُمْ/gui,
    /السلام\s*عليكم/gui,
    /السلام\s*علیکم/gui,
    /وَعَلَيْكُمُ\s*السَّلَامُ/gui,
    /وعليكم\s*السلام/gui,
    /وعلیکم\s*السلام/gui,

    // Salawat
    /صَلَّى\s*اللَّهُ\s*عَلَيْهِ\s*وَسَلَّمَ/gui,
    /صلى\s*الله\s*عليه\s*وسلم/gui,
    /صلی\s*اللہ\s*علیہ\s*وسلم/gui,
    /اللَّهُمَّ\s*صَلِّ\s*عَلَى\s*مُحَمَّدٍ/gui,
    /اللهم\s*صل\s*على\s*محمد/gui,
    /اللہم\s*صل\s*علی\s*محمد/gui,

    // Salah & Supplications
    /سُبْحَانَ\s*رَبِّيَ\s*الْعَظِيمِ/gui,
    /سبحان\s*ربي\s*العظيم/gui,
    /سبحان\s*ربی\s*العظیم/gui,
    /سُبْحَانَ\s*رَبِّيَ\s*الْأَعْلَى/gui,
    /سبحان\s*ربي\s*الأعلى/gui,
    /سبحان\s*ربی\s*الاعلی/gui,
    /سَمِعَ\s*اللَّهُ\s*لِمَنْ\s*حَمِدَهُ/gui,
    /سمع\s*الله\s*لمن\s*حمده/gui,
    /سمع\s*اللہ\s*لمن\s*حمدہ/gui,
    /رَبَّنَا\s*وَلَكَ\s*الْحَمْدُ/gui,
    /ربنا\s*ولك\s*الحمد/gui,
    /ربنا\s*ولک\s*الحمد/gui,
    /التَّحِيَّاتُ\s*لِلَّهِ/gui,
    /التحيات\s*لله/gui,
    /التحیات\s*للہ/gui,
    /رَبِّ\s*زِدْنِي\s*عِلْمًا/gui,
    /رب\s*زدنی\s*علما/gui,
    /لَا\s*إِلٰهَ\s*إِلَّا\s*أَنْتَ\s*سُبْحَانَكَ\s*إِنِّي\s*كُنْتُ\s*مِنَ\s*الظَّالِمِينَ/gui,
    /اللَّهُمَّ\s*بِاسْمِكَ\s*أَمُوتُ\s*وَأَحْيَا/gui,
    /رَبَّنَا\s*آتِنَا\s*فِي\s*الدُّنْيَا\s*حَسَنَةً/gui
  ];

  /**
   * Normalizes keyboard-variant characters in Arabic phrases so Arabic speech synthesizers
   * pronounce them with standard, natural Arabic phonetics rather than failing or spelling them out.
   */
  static normalizeForArabicTTS(text: string): string {
    return text
      .replace(/\u06C1/g, '\u0647')  // Urdu Goal Heh -> Arabic Heh
      .replace(/\u06A9/g, '\u0643')  // Urdu Keheh -> Arabic Kaf
      .replace(/\u06CC/g, '\u064A'); // Urdu Farsi Yeh -> Arabic Yeh
  }

  /**
   * Determine the language of a discrete text segment
   */
  static detectSegmentLang(str: string, fallbackLang: 'urdu' | 'english' = 'urdu'): 'arabic' | 'urdu' | 'english' {
    const s = str.trim();
    if (!s) return fallbackLang;

    // English characters present
    if (this.ENGLISH_CHARS_REGEX.test(s)) {
      return 'english';
    }

    // Has Arabic Tashkeel / Harakat without Urdu letters
    if (this.TASHKEEL_REGEX.test(s) && !this.URDU_ONLY_CHARS_REGEX.test(s)) {
      return 'arabic';
    }

    // Has explicit Urdu characters
    if (this.URDU_ONLY_CHARS_REGEX.test(s)) {
      return 'urdu';
    }

    // Check if matches any canonical Islamic phrase
    for (const pat of this.ARABIC_PHRASE_PATTERNS) {
      pat.lastIndex = 0;
      if (pat.test(s)) {
        return 'arabic';
      }
    }

    return fallbackLang === 'english' ? 'english' : 'urdu';
  }

  /**
   * Determine if text is primarily or purely Arabic
   */
  static isArabicText(text: string): boolean {
    if (!text || typeof text !== 'string') return false;
    const trimmed = text.trim();
    if (!trimmed) return false;

    // Has Tashkeel without Urdu-only letters
    if (this.TASHKEEL_REGEX.test(trimmed) && !this.URDU_ONLY_CHARS_REGEX.test(trimmed)) {
      return true;
    }

    // Matches any known Islamic term
    for (const pat of this.ARABIC_PHRASE_PATTERNS) {
      pat.lastIndex = 0;
      if (pat.test(trimmed)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Segment input text into separate language chunks (Arabic vs Urdu vs English).
   * For mixed-language sentences, splits into exact sequential utterances so each
   * is spoken with its proper native voice.
   */
  static segmentText(rawText: string, baseLang: 'urdu' | 'english' = 'urdu'): SpeechSegment[] {
    if (!rawText || typeof rawText !== 'string') return [];
    const text = rawText.trim();
    if (!text) return [];

    interface MatchRegion {
      start: number;
      end: number;
      text: string;
      lang: 'arabic' | 'urdu' | 'english';
    }

    const matches: MatchRegion[] = [];

    // 1. Find Arabic phrases
    for (const pat of this.ARABIC_PHRASE_PATTERNS) {
      pat.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pat.exec(text)) !== null) {
        let endPos = m.index + m[0].length;
        // Include immediate trailing punctuation (!?,.،:)
        const trailingSub = text.substring(endPos);
        const punc = trailingSub.match(/^[!?,.،؛:]+/);
        if (punc) {
          endPos += punc[0].length;
        }
        matches.push({
          start: m.index,
          end: endPos,
          text: text.substring(m.index, endPos),
          lang: 'arabic'
        });
      }
    }

    // 2. Find bracketed / quoted Tashkeel Arabic e.g. «...» or (...)
    const quotePat = /["«(]([\u0600-\u06FF\s]+)["»)]/g;
    let qm: RegExpExecArray | null;
    while ((qm = quotePat.exec(text)) !== null) {
      if (this.TASHKEEL_REGEX.test(qm[1]) && !this.URDU_ONLY_CHARS_REGEX.test(qm[1])) {
        matches.push({
          start: qm.index,
          end: qm.index + qm[0].length,
          text: qm[0].trim(),
          lang: 'arabic'
        });
      }
    }

    // 3. Find English sequences (words, punctuation)
    const engPat = /[A-Za-z][A-Za-z0-9\s.,!?:;\x27"-]*/g;
    let em: RegExpExecArray | null;
    while ((em = engPat.exec(text)) !== null) {
      const matchText = em[0];
      if (this.ENGLISH_CHARS_REGEX.test(matchText)) {
        matches.push({
          start: em.index,
          end: em.index + matchText.length,
          text: matchText.trim(),
          lang: 'english'
        });
      }
    }

    // Sort matches by start position, preferring longer match in case of tie
    matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

    // Remove overlapping matches
    const filtered: MatchRegion[] = [];
    let lastEnd = 0;
    for (const m of matches) {
      if (m.start >= lastEnd) {
        filtered.push(m);
        lastEnd = m.end;
      }
    }

    // Build segments including interstitial text
    const segments: SpeechSegment[] = [];
    let cur = 0;

    for (const m of filtered) {
      if (m.start > cur) {
        const interstitial = text.substring(cur, m.start);
        const clean = interstitial.replace(/^[\s,،؛:]+/, '').replace(/[\s,،؛:]+$/, '').trim();
        if (clean) {
          segments.push({
            text: clean,
            lang: this.detectSegmentLang(clean, baseLang)
          });
        }
      }

      let spokenText = m.text.trim();
      if (m.lang === 'arabic') {
        spokenText = this.normalizeForArabicTTS(spokenText);
      }

      segments.push({
        text: spokenText,
        lang: m.lang
      });
      cur = m.end;
    }

    if (cur < text.length) {
      const trailing = text.substring(cur);
      const clean = trailing.replace(/^[\s,،؛:]+/, '').trim();
      if (clean) {
        segments.push({
          text: clean,
          lang: this.detectSegmentLang(clean, baseLang)
        });
      }
    }

    return segments.length > 0 ? segments : [{ text, lang: this.detectSegmentLang(text, baseLang) }];
  }
}

// Text-to-Speech (TTS) engine for questions, options, and friendly feedback
export class SpeechEngine {
  private static isSpeaking = false;
  private static currentRunId = 0;
  private static pauseTimeout: ReturnType<typeof setTimeout> | null = null;
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static activeUtterance: SpeechSynthesisUtterance | null = null;

  static init() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  static getVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    const live = window.speechSynthesis.getVoices();
    if (live.length > 0) {
      this.cachedVoices = live;
      return live;
    }
    return this.cachedVoices;
  }

  static stop() {
    this.currentRunId++;
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
    }
    this.activeUtterance = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.isSpeaking = false;
  }

  static getSpeakingStatus(): boolean {
    return this.isSpeaking;
  }

  /**
   * Find the best Arabic voice available on the device.
   * Strictly prioritizes ar-SA, then any standard Arabic voice.
   * NEVER returns Urdu or English voices for Arabic.
   */
  public static getBestArabicVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. High-quality ar-SA (Saudi Arabia / Standard Arabic)
    const arSaPremium = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      const n = v.name.toLowerCase();
      return (l === 'ar-sa' || l.startsWith('ar-sa')) &&
        (n.includes('natural') || n.includes('google') || n.includes('premium') || n.includes('siri') || n.includes('tarik') || n.includes('maged') || n.includes('laila') || n.includes('salma') || n.includes('zayd'));
    });
    if (arSaPremium) return arSaPremium;

    // 2. Any ar-SA voice
    const arSa = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'ar-sa' || l.startsWith('ar-sa');
    });
    if (arSa) return arSa;

    // 3. Any standard Arabic voice (ar, ar-EG, ar-AE, ar-QA, ar-KW, etc.)
    const anyAr = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'ar' || l.startsWith('ar-') || v.name.toLowerCase().includes('arabic');
    });
    if (anyAr) return anyAr;

    return null;
  }

  /**
   * Find the best Urdu voice available on the device.
   * Strictly prioritizes ur-PK, then any Urdu voice.
   * NEVER returns an Arabic or English voice for Urdu text.
   */
  public static getBestUrduVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. High-quality ur-PK (Pakistan Urdu)
    const urPkPremium = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      const n = v.name.toLowerCase();
      return (l === 'ur-pk' || l.startsWith('ur-pk')) &&
        (n.includes('natural') || n.includes('google') || n.includes('premium') || n.includes('siri') || n.includes('asad') || n.includes('uzma'));
    });
    if (urPkPremium) return urPkPremium;

    // 2. Any ur-PK voice
    const urPk = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'ur-pk' || l.startsWith('ur-pk');
    });
    if (urPk) return urPk;

    // 3. Any Urdu voice (ur, ur-IN, or name containing 'urdu')
    const anyUr = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'ur' || l.startsWith('ur-') || v.name.toLowerCase().includes('urdu');
    });
    if (anyUr) return anyUr;

    return null;
  }

  /**
   * Find the best English voice available on the device.
   * Strictly prioritizes en-US / en-GB.
   * NEVER returns Arabic or Urdu voice for English.
   */
  public static getBestEnglishVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. High-quality en-US or en-GB
    const enPremium = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      const n = v.name.toLowerCase();
      return (l === 'en-us' || l === 'en-gb') &&
        (n.includes('natural') || n.includes('google') || n.includes('samantha') || n.includes('premium') || n.includes('jenny') || n.includes('guy'));
    });
    if (enPremium) return enPremium;

    // 2. Any en-US
    const enUs = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'en-us' || l.startsWith('en-us');
    });
    if (enUs) return enUs;

    // 3. Any en-GB
    const enGb = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'en-gb' || l.startsWith('en-gb');
    });
    if (enGb) return enGb;

    // 4. Any English voice
    const anyEn = voices.find(v => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l === 'en' || l.startsWith('en-') || v.name.toLowerCase().includes('english');
    });
    if (anyEn) return anyEn;

    return null;
  }

  private static configureUtterance(
    utterance: SpeechSynthesisUtterance,
    lang: 'arabic' | 'urdu' | 'english'
  ) {
    if (lang === 'arabic') {
      const arVoice = this.getBestArabicVoice();
      if (arVoice) {
        utterance.voice = arVoice;
        utterance.lang = arVoice.lang;
      } else {
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.82; // Clear, deliberate speed for accurate tajweed and pronunciation for kids
      utterance.pitch = 1.05; // Friendly, engaging pitch for kids
    } else if (lang === 'urdu') {
      const urduVoice = this.getBestUrduVoice();
      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else {
        // Fallback to ur-PK locale; NEVER assign an Arabic voice to Urdu!
        utterance.lang = 'ur-PK';
      }
      utterance.rate = 0.86; // Clear, deliberate speed for Urdu vocabulary
      utterance.pitch = 1.05;
    } else {
      const enVoice = this.getBestEnglishVoice();
      if (enVoice) {
        utterance.voice = enVoice;
        utterance.lang = enVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
    }
  }

  /**
   * Sequential segment runner that plays an array of SpeechSegment objects.
   * Handles per-segment language configuration (Arabic vs Urdu vs English)
   * sequentially so that the next segment starts strictly after the previous finishes.
   */
  private static playSegmentSequence(
    segments: SpeechSegment[],
    baseLang: 'urdu' | 'english',
    runId: number,
    onStart?: () => void,
    onEnd?: () => void,
    onStepChange?: (stepIndex: number) => void,
    getStepForSegment?: (segmentIndex: number) => number
  ) {
    if (segments.length === 0) {
      this.isSpeaking = false;
      onEnd?.();
      return;
    }

    let currentIndex = 0;

    const playNext = () => {
      if (this.currentRunId !== runId) return;

      if (currentIndex >= segments.length) {
        this.isSpeaking = false;
        this.activeUtterance = null;
        onEnd?.();
        return;
      }

      const segment = segments[currentIndex];
      if (!segment.text || segment.text.trim().length === 0) {
        currentIndex++;
        playNext();
        return;
      }

      if (onStepChange && getStepForSegment) {
        onStepChange(getStepForSegment(currentIndex));
      }

      const utterance = new SpeechSynthesisUtterance(segment.text);
      this.configureUtterance(utterance, segment.lang);
      this.activeUtterance = utterance;

      let hasEnded = false;
      const advance = () => {
        if (hasEnded) return;
        hasEnded = true;
        if (this.currentRunId !== runId) return;

        currentIndex++;
        if (currentIndex < segments.length) {
          const pause = segment.pauseAfterMs ?? 100;
          if (pause > 0) {
            this.pauseTimeout = setTimeout(() => {
              playNext();
            }, pause);
          } else {
            playNext();
          }
        } else {
          this.isSpeaking = false;
          this.activeUtterance = null;
          onEnd?.();
        }
      };

      utterance.onend = advance;

      utterance.onerror = (err) => {
        if (this.currentRunId !== runId) return;
        console.warn('SpeechSynthesis segment issue:', err);
        // Advance to next segment without cross-language voice contamination
        advance();
      };

      try {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.speak(utterance);
        } else {
          advance();
        }
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
        advance();
      }
    };

    playNext();
  }

  static speak(
    text: string,
    lang: 'urdu' | 'english',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    this.speakSingle(text, lang, onStart, onEnd);
  }

  /**
   * Speak Arabic text using native ar-SA / Arabic voice specifically.
   * Guarantees that Arabic is pronounced with proper Arabic phonetics rather than Urdu/English.
   */
  static speakArabic(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;
    this.isSpeaking = true;
    onStart?.();

    const utterance = new SpeechSynthesisUtterance(text);
    this.configureUtterance(utterance, 'arabic');

    let hasEnded = false;
    const finish = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (this.currentRunId === runId) {
        this.isSpeaking = false;
        onEnd?.();
      }
    };

    utterance.onend = finish;
    utterance.onerror = (err) => {
      console.warn('SpeechSynthesis Arabic error:', err);
      finish();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('SpeechSynthesis speak error:', err);
      finish();
    }
  }

  /**
   * Sequential speech runner that reads question then options 1-4
   * one by one with a clear audible pause between each item.
   * Accurately dispatches Arabic TTS voice for Arabic text / Islamic terms.
   */
  static speakQuizQuestion(
    questionText: string,
    options: string[],
    lang: 'urdu' | 'english',
    onStart?: () => void,
    onEnd?: () => void,
    onStepChange?: (stepIndex: number) => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;
    this.isSpeaking = true;
    onStart?.();

    const allSegments: SpeechSegment[] = [];
    const stepMap: number[] = [];

    // Step 0: Question
    const qPrefix = lang === 'urdu' ? 'سوال:' : 'Question:';
    allSegments.push({ text: qPrefix, lang, pauseAfterMs: 150 });
    stepMap.push(0);

    const qBodySegments = ArabicDetector.segmentText(questionText, lang);
    qBodySegments.forEach((seg, idx) => {
      if (idx === qBodySegments.length - 1) {
        seg.pauseAfterMs = 700; // Natural pause after full question
      }
      allSegments.push(seg);
      stepMap.push(0);
    });

    // Steps 1 to 4: Options
    const optPrefixesUrdu = ['نمبر ایک:', 'نمبر دو:', 'نمبر تین:', 'نمبر چار:'];
    const optPrefixesEn = ['Option 1:', 'Option 2:', 'Option 3:', 'Option 4:'];

    options.forEach((optText, optIdx) => {
      const stepNum = optIdx + 1;
      const prefix = lang === 'urdu' ? optPrefixesUrdu[optIdx] : optPrefixesEn[optIdx];

      allSegments.push({ text: prefix, lang, pauseAfterMs: 120 });
      stepMap.push(stepNum);

      const optBodySegments = ArabicDetector.segmentText(optText, lang);
      optBodySegments.forEach((seg, idx) => {
        if (idx === optBodySegments.length - 1) {
          seg.pauseAfterMs = optIdx < options.length - 1 ? 550 : 300;
        }
        allSegments.push(seg);
        stepMap.push(stepNum);
      });
    });

    this.playSegmentSequence(
      allSegments,
      lang,
      runId,
      onStart,
      onEnd,
      onStepChange,
      (idx) => stepMap[idx] ?? 0
    );
  }

  /**
   * Spoken friendly feedback immediately after child selects an answer.
   * Pronounces Arabic phrases (مَاشَاءَ اللَّهُ) using genuine Arabic voice,
   * followed sequentially by Urdu or English praise in its proper native voice.
   */
  static speakFeedback(
    isCorrect: boolean,
    lang: 'urdu' | 'english',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;
    this.isSpeaking = true;
    onStart?.();

    let segments: SpeechSegment[] = [];
    if (lang === 'urdu') {
      if (isCorrect) {
        segments = [
          { text: 'مَاشَاءَ اللَّهُ!', lang: 'arabic', pauseAfterMs: 300 },
          { text: 'آپ نے بالکل صحیح جواب دیا۔ بہت خوب!', lang: 'urdu', pauseAfterMs: 150 }
        ];
      } else {
        segments = [
          { text: 'کوئی بات نہیں، دوبارہ کوشش کریں!', lang: 'urdu', pauseAfterMs: 150 }
        ];
      }
    } else {
      if (isCorrect) {
        segments = [
          { text: 'مَاشَاءَ اللَّهُ!', lang: 'arabic', pauseAfterMs: 300 },
          { text: 'Correct! You got the right answer. Very well done!', lang: 'english', pauseAfterMs: 150 }
        ];
      } else {
        segments = [
          { text: "No worries, keep trying!", lang: 'english', pauseAfterMs: 150 }
        ];
      }
    }

    this.playSegmentSequence(segments, lang, runId, onStart, onEnd);
  }

  /**
   * Speak question explanation aloud with full language segmentation
   * (Arabic verses/phrases in Arabic voice, Urdu in Urdu voice, English in English voice).
   */
  public static speakExplanation(
    explanationText: string,
    lang: 'urdu' | 'english' = 'urdu',
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!explanationText || !explanationText.trim()) {
      onEnd?.();
      return;
    }
    this.speakSingle(explanationText, lang, onStart, onEnd);
  }

  /**
   * Speak a single phrase with speech synthesis, seamlessly routing
   * any Arabic portions to the Arabic TTS voice.
   */
  public static speakSingle(
    text: string,
    lang: 'urdu' | 'english' = 'urdu',
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;
    this.isSpeaking = true;
    onStart?.();

    const segments = ArabicDetector.segmentText(text, lang);
    this.playSegmentSequence(segments, lang, runId, onStart, onEnd);
  }

  /**
   * Character Voice Activity Transition Guidance
   */
  public static speakActivityGuidance(
    activity: 'quiz' | 'salah' | 'tasbih',
    lang: 'urdu' | 'english' = 'urdu',
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    let message = '';
    if (lang === 'urdu') {
      if (activity === 'quiz') message = 'چلو! آج کچھ سوال کرتے ہیں!';
      else if (activity === 'salah') message = 'چلو! نماز کے بارے میں سیکھتے ہیں!';
      else if (activity === 'tasbih') message = 'آؤ، آج اللہ کا ذکر کرتے ہیں!';
    } else {
      if (activity === 'quiz') message = "Let's answer some questions today!";
      else if (activity === 'salah') message = "Let's learn about Salah!";
      else if (activity === 'tasbih') message = "Come, let's do Dhikr of Allah today!";
    }

    this.speakSingle(message, lang, onStart, onEnd);
  }

  /**
   * Sequential Kids Greeting on Home screen.
   * Speaks Islamic greeting in Arabic voice, followed by prompt in Urdu/English.
   */
  public static speakKidsGreeting(
    lang: 'urdu' | 'english' = 'urdu',
    onStepChange?: (step: number) => void,
    onEnd?: () => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;
    this.isSpeaking = true;

    const phrases = lang === 'urdu' ? [
      'السلام علیکم! آج آپ کیا سیکھنا چاہتے ہیں؟',
      'کوئز کھیلنا ہے؟',
      'نماز سیکھنی ہے؟',
      'تسبیح سیکھنی ہے؟'
    ] : [
      'Assalamu Alaikum! What would you like to learn today?',
      'Play Quiz?',
      'Learn Namaz?',
      'Learn Tasbih?'
    ];

    const allSegments: SpeechSegment[] = [];
    const stepMap: number[] = [];

    phrases.forEach((phrase, stepIdx) => {
      const segs = ArabicDetector.segmentText(phrase, lang);
      segs.forEach((seg, i) => {
        if (i === segs.length - 1) {
          seg.pauseAfterMs = 500;
        } else {
          seg.pauseAfterMs = 150;
        }
        allSegments.push(seg);
        stepMap.push(stepIdx);
      });
    });

    this.playSegmentSequence(
      allSegments,
      lang,
      runId,
      undefined,
      onEnd,
      onStepChange,
      (idx) => stepMap[idx] ?? 0
    );
  }
}

// Auto-initialize voices on startup
if (typeof window !== 'undefined') {
  SpeechEngine.init();
}

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
 * Identifies Arabic script, Tashkeel/harakat, Quranic phrases, and Islamic terms,
 * and segments mixed text into discrete utterances for proper TTS voice dispatch.
 */
export class ArabicDetector {
  // Arabic Tashkeel / Harakat
  static readonly TASHKEEL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED]/;

  // Urdu-only characters that do not exist in Arabic
  static readonly URDU_ONLY_CHARS_REGEX = /[ٹڈڑںےۓہھچپژگ]/;

  // Arabic alphabet characters
  static readonly ARABIC_SCRIPT_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  private static makeTermRegex(pattern: string): RegExp {
    return new RegExp(`(^|[^\\p{L}\\p{M}])(${pattern})(?=$|[^\\p{L}\\p{M}])`, 'gui');
  }

  // Canonical Islamic Arabic phrases with authentic tajweed vocalization
  static readonly ISLAMIC_TERMS = [
    // Bismillah
    {
      regex: ArabicDetector.makeTermRegex('bismillah\\s*(?:ir|ar)?-?rahman\\s*(?:ir|ar)?-?rahim|بسم\\s*اللہ\\s*الرحمن\\s*الرحیم|بسم\\s*الله\\s*الرحمن\\s*الرحيم|بِسْمِ\\s*اللَّهِ\\s*الرَّحْمٰنِ\\s*الرَّحِيمِ'),
      vocalized: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('bismillah|بسم\\s*اللہ|بسم\\s*الله|بِسْمِ\\s*اللَّهِ'),
      vocalized: 'بِسْمِ اللَّهِ'
    },
    // Alhamdulillah
    {
      regex: ArabicDetector.makeTermRegex('al-?hamdulillahi\\s*rabbil\\s*[\'a-z]*alameen|الحمد\\s*للہ\\s*رب\\s*العالمین|الحمد\\s*لله\\s*رب\\s*العالمين|الْحَمْدُ\\s*لِلَّهِ\\s*رَبِّ\\s*الْعَالَمِينَ'),
      vocalized: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ'
    },
    {
      regex: ArabicDetector.makeTermRegex('al-?hamdulillah|الحمد\\s*للہ|الحمد\\s*لله|الْحَمْدُ\\s*لِلَّهِ'),
      vocalized: 'الْحَمْدُ لِلَّهِ'
    },
    // SubhanAllah
    {
      regex: ArabicDetector.makeTermRegex('subhanallahi\\s*wa\\s*bihamdihi|سبحان\\s*اللہ\\s*وبحمدہ|سبحان\\s*الله\\s*وبحمده|سُبْحَانَ\\s*اللَّهِ\\s*وَبِحَمْدِهِ'),
      vocalized: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('subhana\\s*rabbiyal\\s*[\'a-z]*azeem|سبحان\\s*ربی\\s*العظیم|سبحان\\s*ربي\\s*العظيم|سُبْحَانَ\\s*رَبِّيَ\\s*الْعَظِيمِ'),
      vocalized: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('subhana\\s*rabbiyal\\s*[\'a-z]*a[\'a-z]*la|سبحان\\s*ربی\\s*الاعلی|سبحان\\s*ربي\\s*الأعلى|سُبْحَانَ\\s*رَبِّيَ\\s*الْأَعْلَى'),
      vocalized: 'سُبْحَانَ رَبِّيَ الْأَعْلَى'
    },
    {
      regex: ArabicDetector.makeTermRegex('subhanallah|subhan\\s*allah|سبحان\\s*اللہ|سبحان\\s*الله|سُبْحَانَ\\s*اللَّهِ'),
      vocalized: 'سُبْحَانَ اللَّهِ'
    },
    // Allahu Akbar
    {
      regex: ArabicDetector.makeTermRegex('allahu\\s*akbar|اللہ\\s*اکبر|الله\\s*أكبر|اللَّهُ\\s*أَكْبَرُ'),
      vocalized: 'اللَّهُ أَكْبَرُ'
    },
    // Tawheed / Dua of Yunus (AS)
    {
      regex: ArabicDetector.makeTermRegex('la\\s*ilaha\\s*illa\\s*anta\\s*subhanaka\\s*inni\\s*kuntu\\s*mina\\s*zalimeen|لا\\s*الہ\\s*الا\\s*انت\\s*سبحانک\\s*انی\\s*کنت\\s*من\\s*الظالمین|لا\\s*إله\\s*إلا\\s*أنت\\s*سبحانك\\s*إني\\s*كنت\\s*من\\s*الظالمين|لَا\\s*إِلٰهَ\\s*إِلَّا\\s*أَنْتَ\\s*سُبْحَانَكَ\\s*إِنِّي\\s*كُنْتُ\\s*مِنَ\\s*الظَّالِمِينَ'),
      vocalized: 'لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ'
    },
    {
      regex: ArabicDetector.makeTermRegex('la\\s*ilaha\\s*illallah|لا\\s*الہ\\s*الا\\s*اللہ|لا\\s*إله\\s*إلا\\s*الله|لَا\\s*إِلٰهَ\\s*إِلَّا\\s*اللَّهُ'),
      vocalized: 'لَا إِلٰهَ إِلَّا اللَّهُ'
    },
    // Astaghfirullah
    {
      regex: ArabicDetector.makeTermRegex('astaghfirullah|استغفر\\s*اللہ|استغفر\\s*الله|أَسْتَغْفِرُ\\s*اللَّهَ'),
      vocalized: 'أَسْتَغْفِرُ اللَّهَ'
    },
    // Masha'Allah
    {
      regex: ArabicDetector.makeTermRegex('masha[\'’]?allah|mashaallah|ماشاء\\s*اللہ|ماشاءاللہ|ما\\s*شاء\\s*الله|مَا\\s*شَاءَ\\s*اللَّهُ'),
      vocalized: 'مَا شَاءَ اللَّهُ'
    },
    // Insha'Allah
    {
      regex: ArabicDetector.makeTermRegex('insha[\'’]?allah|inshallah|ان\\s*شاء\\s*اللہ|إن\\s*شاء\\s*الله|إِنْ\\s*شَاءَ\\s*اللَّهُ'),
      vocalized: 'إِنْ شَاءَ اللَّهُ'
    },
    // JazakAllah
    {
      regex: ArabicDetector.makeTermRegex('jazakallahu\\s*khair(?:an)?|jazakallah|جزاک\\s*اللہ\\s*خیرا|جزاک\\s*اللہ|جزاك\\s*الله\\s*خيرا|جزاك\\s*الله|جَزَاكَ\\s*اللَّهُ\\s*خَيْرًا'),
      vocalized: 'جَزَاكَ اللَّهُ خَيْرًا'
    },
    // Salam Greetings
    {
      regex: ArabicDetector.makeTermRegex('as-?salamu\\s*[\'a-z]*alaykum\\s*wa\\s*rahmatullah|السلام\\s*علیکم\\s*ورحمۃ\\s*اللہ|السلام\\s*عليكم\\s*ورحمة\\s*الله|السَّلَامُ\\s*عَلَيْكُمْ\\s*وَرَحْمَةُ\\s*اللَّهِ'),
      vocalized: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('as-?salamu\\s*[\'a-z]*alaykum|assalamu\\s*alaikum|assalam-?o-?alaikum|السلام\\s*علیکم|السلام\\s*عليكم|السَّلَامُ\\s*عَلَيْكُمْ'),
      vocalized: 'السَّلَامُ عَلَيْكُمْ'
    },
    {
      regex: ArabicDetector.makeTermRegex('wa\\s*[\'a-z]*alaykum\\s*as-?salam|walaikum\\s*assalam|وعلیکم\\s*السلام|وعليكم\\s*السلام|وَعَلَيْكُمُ\\s*السَّلَامُ'),
      vocalized: 'وَعَلَيْكُمُ السَّلَامُ'
    },
    // Salawat
    {
      regex: ArabicDetector.makeTermRegex('sallallahu\\s*[\'a-z]*alayhi\\s*wa\\s*sallam|صلی\\s*اللہ\\s*علیہ\\s*وسلم|صلى\\s*الله\\s*عليه\\s*وسلم|صَلَّى\\s*اللَّهُ\\s*عَلَيْهِ\\s*وَسَلَّمَ'),
      vocalized: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ'
    },
    {
      regex: ArabicDetector.makeTermRegex('allahumma\\s*salli\\s*[\'a-z]*ala\\s*muhammad|اللہم\\s*صل\\s*علی\\s*محمد|اللهم\\s*صل\\s*على\\s*محمد|اللَّهُمَّ\\s*صَلِّ\\s*عَلَى\\s*مُحَمَّدٍ'),
      vocalized: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ'
    },
    // Common Duas
    {
      regex: ArabicDetector.makeTermRegex('(?:allahumma\\s*)?bismika\\s*am[o|u]+tu\\s*wa-?\\s*ahya|اللہم\\s*باسمک\\s*اموت\\s*واحیا|اللهم\\s*باسمك\\s*أموت\\s*وأحيا|باسمک\\s*اللہم\\s*اموت\\s*واحیا|اللَّهُمَّ\\s*بِاسْمِكَ\\s*أَمُوتُ\\s*وَأَحْيَا|بِاسْمِكَ\\s*اللَّهُمَّ\\s*أَمُوتُ\\s*وَأَحْيَا'),
      vocalized: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا'
    },
    {
      regex: ArabicDetector.makeTermRegex('rabbi\\s*zidni\\s*[\'a-z]*ilma|رب\\s*زدنی\\s*علما|رَبِّ\\s*زِدْنِي\\s*عِلْمًا'),
      vocalized: 'رَبِّ زِدْنِي عِلْمًا'
    },
    {
      regex: ArabicDetector.makeTermRegex('rabbana\\s*atina\\s*fid\\s*dunya\\s*hasanatan|ربنا\\s*آتنا\\s*فی\\s*الدنیا\\s*حسنۃ|رَبَّنَا\\s*آتِنَا\\s*فِي\\s*الدُّنْيَا\\s*حَسَنَةً'),
      vocalized: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً'
    },
    // Salah recitation terms
    {
      regex: ArabicDetector.makeTermRegex('sami\\s*allahu\\s*liman\\s*hamidah|سمع\\s*اللہ\\s*لمن\\s*حمدہ|سمع\\s*الله\\s*لمن\\s*حمده|سَمِعَ\\s*اللَّهُ\\s*لِمَنْ\\s*حَمِدَهُ'),
      vocalized: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ'
    },
    {
      regex: ArabicDetector.makeTermRegex('rabbana\\s*wa\\s*lakal\\s*hamd|ربنا\\s*ولک\\s*الحمد|ربنا\\s*ولك\\s*الحمد|رَبَّنَا\\s*وَلَكَ\\s*الْحَمْدُ'),
      vocalized: 'رَبَّنَا وَلَكَ الْحَمْدُ'
    },
    {
      regex: ArabicDetector.makeTermRegex('at-?tahiyyaatu\\s*lillahi|التحیات\\s*للہ|التحيات\\s*لله|التَّحِيَّاتُ\\s*لِلَّهِ'),
      vocalized: 'التَّحِيَّاتُ لِلَّهِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('la\\s*hawla\\s*wa\\s*la\\s*quwwata\\s*illa\\s*billah|لا\\s*حول\\s*ولا\\s*قوۃ\\s*الا\\s*باللہ|لا\\s*حول\\s*ولا\\s*قوة\\s*إلا\\s*بالله|لَا\\s*حَوْلَ\\s*وَلَا\\s*قُوَّةَ\\s*إِلَّا\\s*بِاللَّهِ'),
      vocalized: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ'
    },
    {
      regex: ArabicDetector.makeTermRegex('inna\\s*lillahi\\s*wa\\s*inna\\s*ilayhi\\s*raji[\'a-z]*un|انا\\s*للہ\\s*وانا\\s*الیہ\\s*راجعون|إنا\\s*لله\\s*وإنا\\s*إليه\\s*راجعون|إِنَّا\\s*لِلَّهِ\\s*وَإِنَّا\\s*إِلَيْهِ\\s*رَاجِعُونَ'),
      vocalized: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ'
    }
  ];

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
    for (const item of this.ISLAMIC_TERMS) {
      item.regex.lastIndex = 0;
      if (item.regex.test(trimmed)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Segment input text into language chunks (Arabic vs baseLang)
   */
  static segmentText(text: string, baseLang: 'urdu' | 'english'): SpeechSegment[] {
    if (!text || typeof text !== 'string') return [];
    const raw = text.trim();
    if (!raw) return [];

    // 1. Pure Arabic with diacritics
    if (this.TASHKEEL_REGEX.test(raw) && !this.URDU_ONLY_CHARS_REGEX.test(raw)) {
      return [{ text: raw, lang: 'arabic' }];
    }

    // 2. Exact match of Islamic term
    for (const item of this.ISLAMIC_TERMS) {
      item.regex.lastIndex = 0;
      const m = item.regex.exec(raw);
      if (m && m[0].trim() === raw) {
        return [{ text: item.vocalized, lang: 'arabic' }];
      }
    }

    const segments: SpeechSegment[] = [];
    let remaining = raw;

    while (remaining.trim()) {
      let earliestIndex = Infinity;
      let matchedVocalized = '';
      let matchedLength = 0;

      // Check quotes or parens containing Arabic
      const quoteMatch = /["'«(]([\u0600-\u06FF\s]+)["'»)]/.exec(remaining);
      if (quoteMatch && (this.TASHKEEL_REGEX.test(quoteMatch[1]) || !this.URDU_ONLY_CHARS_REGEX.test(quoteMatch[1]))) {
        earliestIndex = quoteMatch.index;
        matchedVocalized = quoteMatch[1].trim();
        matchedLength = quoteMatch[0].length;
      }

      // Check inline Islamic terms
      for (const item of this.ISLAMIC_TERMS) {
        item.regex.lastIndex = 0;
        const m = item.regex.exec(remaining);
        if (m) {
          const actualIndex = m.index + m[1].length;
          const actualMatchedStr = m[2];
          if (actualIndex < earliestIndex) {
            earliestIndex = actualIndex;
            matchedVocalized = item.vocalized;
            matchedLength = actualMatchedStr.length;
          }
        }
      }

      if (earliestIndex < Infinity) {
        const before = remaining.substring(0, earliestIndex).replace(/^[!?,.،؛:\s]+/, '').replace(/[\s]+$/, '').trim();
        if (before) {
          segments.push({ text: before, lang: baseLang });
        }
        segments.push({ text: matchedVocalized, lang: 'arabic' });
        remaining = remaining.substring(earliestIndex + matchedLength).replace(/^[!?,.،؛:\s]+/, '').trim();
      } else {
        const trimmed = remaining.replace(/^[!?,.،؛:\s]+/, '').trim();
        if (trimmed) {
          const isAr = this.TASHKEEL_REGEX.test(trimmed) || (!this.URDU_ONLY_CHARS_REGEX.test(trimmed) && this.ARABIC_SCRIPT_REGEX.test(trimmed) && baseLang === 'english');
          segments.push({ text: trimmed, lang: isAr ? 'arabic' : baseLang });
        }
        break;
      }
    }

    return segments.length > 0 ? segments : [{ text: raw, lang: baseLang }];
  }
}

// Text-to-Speech (TTS) engine for questions, options, and friendly feedback
export class SpeechEngine {
  private static isSpeaking = false;
  private static currentRunId = 0;
  private static pauseTimeout: ReturnType<typeof setTimeout> | null = null;
  private static cachedVoices: SpeechSynthesisVoice[] = [];

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
   * Prioritize ar-SA (Saudi Arabia / Standard Arabic),
   * then any Arabic locale (ar-*), then any voice with 'arabic' in the name.
   */
  public static getBestArabicVoice(): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. High-quality ar-SA (Natural, Google, Premium, Siri, Tarik, Maged, Laila, Salma, etc.)
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
      return l === 'ar' || l.startsWith('ar-');
    });
    if (anyAr) return anyAr;

    // 4. Any voice with 'arabic' in the name
    const namedAr = voices.find(v => v.name.toLowerCase().includes('arabic'));
    if (namedAr) return namedAr;

    return null;
  }

  private static configureUtterance(
    utterance: SpeechSynthesisUtterance,
    lang: 'arabic' | 'urdu' | 'english'
  ) {
    const voices = this.getVoices();

    if (lang === 'arabic') {
      const arVoice = this.getBestArabicVoice();
      if (arVoice) {
        utterance.voice = arVoice;
        utterance.lang = arVoice.lang;
      } else {
        // Safest fallback: request ar-SA locale
        utterance.lang = 'ar-SA';
      }
      utterance.rate = 0.82; // Clear, deliberate speed for accurate tajweed and pronunciation for kids
      utterance.pitch = 1.05; // Friendly, engaging pitch for kids
    } else if (lang === 'urdu') {
      // Keep existing Urdu voice selection unchanged
      const urduVoice = voices.find(
        v => v.lang.toLowerCase().startsWith('ur') ||
             v.lang.toLowerCase().includes('ur-') ||
             v.name.toLowerCase().includes('urdu')
      ) || voices.find(
        v => v.lang.toLowerCase().startsWith('hi') ||
             v.name.toLowerCase().includes('hindi')
      ) || voices.find(
        v => v.lang.toLowerCase().startsWith('ar')
      );

      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else {
        utterance.lang = 'ur-PK';
      }
      utterance.rate = 0.86; // Clear, deliberate speed for Quranic/Urdu vocabulary
      utterance.pitch = 1.05;
    } else {
      // Keep existing English voice selection unchanged
      const enVoice = voices.find(
        v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
      ) || voices.find(v => v.lang.startsWith('en'));

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
   * Handles per-segment language configuration (Arabic vs Urdu vs English),
   * provides resilient error fallback (if Arabic voice fails on a platform, falls back safely to baseLang),
   * and invokes onStepChange, onStart, onEnd appropriately.
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
          onEnd?.();
        }
      };

      utterance.onend = advance;

      utterance.onerror = (err) => {
        // If an Arabic utterance fails (e.g. platform has missing synthesizer),
        // safely fallback to baseLang to prevent breaking the speaker feature.
        if (segment.lang === 'arabic') {
          console.warn('Arabic TTS voice encountered issue, falling back safely to base voice:', err);
          try {
            const fallbackUtterance = new SpeechSynthesisUtterance(segment.text);
            this.configureUtterance(fallbackUtterance, baseLang);
            fallbackUtterance.onend = advance;
            fallbackUtterance.onerror = advance;
            window.speechSynthesis.speak(fallbackUtterance);
            return;
          } catch {
            advance();
            return;
          }
        }
        advance();
      };

      try {
        window.speechSynthesis.speak(utterance);
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
   * Pronounces Islamic phrases (e.g. Masha'Allah) using genuine Arabic voice.
   */
  static speakFeedback(
    isCorrect: boolean,
    lang: 'urdu' | 'english',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
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
          { text: 'مَا شَاءَ اللَّهُ!', lang: 'arabic', pauseAfterMs: 250 },
          { text: 'بہت خوب!', lang: 'urdu', pauseAfterMs: 100 }
        ];
      } else {
        segments = [
          { text: 'کوئی بات نہیں، دوبارہ کوشش کرتے ہیں!', lang: 'urdu', pauseAfterMs: 100 }
        ];
      }
    } else {
      if (isCorrect) {
        segments = [
          { text: 'مَا شَاءَ اللَّهُ!', lang: 'arabic', pauseAfterMs: 250 },
          { text: 'Very well done!', lang: 'english', pauseAfterMs: 100 }
        ];
      } else {
        segments = [
          { text: "No worries, let's try again!", lang: 'english', pauseAfterMs: 100 }
        ];
      }
    }

    this.playSegmentSequence(segments, lang, runId, onStart, onEnd);
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
      'السلام علیکم! آج آپ کیا کرنا چاہتے ہیں؟',
      'کوئز کرنا ہے؟',
      'نماز سیکھنی ہے؟',
      'تسبیح کرنی ہے؟'
    ] : [
      'Assalamu Alaikum! What would you like to do today?',
      'Play Quiz?',
      'Learn Salah?',
      'Do Tasbih?'
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

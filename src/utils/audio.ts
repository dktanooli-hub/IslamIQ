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

  private static configureUtterance(utterance: SpeechSynthesisUtterance, lang: 'urdu' | 'english') {
    const voices = this.getVoices();

    if (lang === 'urdu') {
      // Find Urdu voice, or fallback to Hindi (phonetically identical for Urdu text) or Arabic
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

  static speak(
    text: string,
    lang: 'urdu' | 'english',
    onStart?: () => void,
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    this.stop();
    const runId = ++this.currentRunId;

    const utterance = new SpeechSynthesisUtterance(text);
    this.configureUtterance(utterance, lang);

    utterance.onstart = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    utterance.onerror = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Sequential speech runner that reads question then options 1-4
   * one by one with a clear audible pause between each item.
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

    // Prepare sequential segments with actual text from the question and 4 options
    const segments: { text: string; pauseAfterMs: number }[] = lang === 'urdu' ? [
      { text: `سوال: ${questionText}`, pauseAfterMs: 700 },
      { text: `نمبر ایک: ${options[0] || ''}`, pauseAfterMs: 550 },
      { text: `نمبر دو: ${options[1] || ''}`, pauseAfterMs: 550 },
      { text: `نمبر تین: ${options[2] || ''}`, pauseAfterMs: 550 },
      { text: `نمبر چار: ${options[3] || ''}`, pauseAfterMs: 300 }
    ] : [
      { text: `Question: ${questionText}`, pauseAfterMs: 700 },
      { text: `Option 1: ${options[0] || ''}`, pauseAfterMs: 550 },
      { text: `Option 2: ${options[1] || ''}`, pauseAfterMs: 550 },
      { text: `Option 3: ${options[2] || ''}`, pauseAfterMs: 550 },
      { text: `Option 4: ${options[3] || ''}`, pauseAfterMs: 300 }
    ];

    let currentStep = 0;

    const playNext = () => {
      if (this.currentRunId !== runId) return;

      if (currentStep >= segments.length) {
        this.isSpeaking = false;
        onEnd?.();
        return;
      }

      const segment = segments[currentStep];
      onStepChange?.(currentStep);

      const utterance = new SpeechSynthesisUtterance(segment.text);
      this.configureUtterance(utterance, lang);

      utterance.onend = () => {
        if (this.currentRunId !== runId) return;

        currentStep++;
        if (currentStep < segments.length) {
          // Pause between question and options
          this.pauseTimeout = setTimeout(() => {
            playNext();
          }, segment.pauseAfterMs);
        } else {
          this.isSpeaking = false;
          onEnd?.();
        }
      };

      utterance.onerror = () => {
        if (this.currentRunId !== runId) return;
        currentStep++;
        if (currentStep < segments.length) {
          playNext();
        } else {
          this.isSpeaking = false;
          onEnd?.();
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
        onEnd?.();
      }
    };

    playNext();
  }

  /**
   * Spoken friendly feedback immediately after child selects an answer
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

    let textToSpeak = '';
    if (lang === 'urdu') {
      textToSpeak = isCorrect
        ? 'ماشاءاللہ! بہت خوب!'
        : 'کوئی بات نہیں، دوبارہ کوشش کرتے ہیں!';
    } else {
      textToSpeak = isCorrect
        ? "Masha'Allah! Very well done!"
        : "No worries, let's try again!";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    this.configureUtterance(utterance, lang);

    utterance.onstart = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    utterance.onerror = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  /**
   * Speak a custom single phrase with speech synthesis
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

    const utterance = new SpeechSynthesisUtterance(text);
    this.configureUtterance(utterance, lang);

    utterance.onstart = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    utterance.onerror = () => {
      if (this.currentRunId !== runId) return;
      this.isSpeaking = false;
      onEnd?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
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
   * Sequential Kids Greeting on Home screen
   * 1. Greeting: “السلام علیکم! آج آپ کیا کرنا چاہتے ہیں؟”
   * 2. Question: “Quiz کرنا ہے؟”
   * 3. Question: “نماز سیکھنی ہے؟”
   * 4. Question: “تسبیح کرنی ہے؟”
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

    let currentStep = 0;

    const speakNextStep = () => {
      if (this.currentRunId !== runId) return;

      if (currentStep >= phrases.length) {
        this.isSpeaking = false;
        onEnd?.();
        return;
      }

      onStepChange?.(currentStep);
      const text = phrases[currentStep];
      const utterance = new SpeechSynthesisUtterance(text);
      this.configureUtterance(utterance, lang);

      utterance.onstart = () => {
        if (this.currentRunId !== runId) return;
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        if (this.currentRunId !== runId) return;
        currentStep++;
        // Natural child-friendly pause between suggestions
        setTimeout(() => {
          if (this.currentRunId === runId) {
            speakNextStep();
          }
        }, 500);
      };

      utterance.onerror = () => {
        if (this.currentRunId !== runId) return;
        currentStep++;
        speakNextStep();
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
        onEnd?.();
      }
    };

    speakNextStep();
  }
}

// Auto-initialize voices on startup
if (typeof window !== 'undefined') {
  SpeechEngine.init();
}

// Lightweight browser speech recognition utility for Kids Voice Activity Selection
// Zero paid API, purely uses native Web Speech Recognition (webkitSpeechRecognition or SpeechRecognition)

export type VoiceActivityType = 'quiz' | 'salah' | 'tasbih' | 'unknown';

export interface SpeechRecognitionResultState {
  transcript: string;
  matchedActivity: VoiceActivityType;
  confidence: number;
}

// Check if browser supports Web Speech API
export const isSpeechRecognitionSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

// Match spoken words tolerant to Urdu, English and transliterated roman pronunciation
export const matchVoiceActivity = (spokenText: string): VoiceActivityType => {
  if (!spokenText) return 'unknown';

  const lower = spokenText.toLowerCase().trim();

  // 1. SALAH MATCHES (نماز, Salah, Prayer, Namaz)
  const salahPatterns = [
    'نماز', 'نمازیں', 'نماز سکھاؤ', 'نماز سیکھنی', 'صلاۃ', 'صلوۃ', 'صلات',
    'salah', 'namaz', 'salat', 'prayer', 'pray', 'namaz time', 'nimaz',
    'nmaz', 'namazein', 'namaz parhni', 'namaz sikhni', 'salat'
  ];
  for (const pattern of salahPatterns) {
    if (lower.includes(pattern) || spokenText.includes(pattern)) {
      return 'salah';
    }
  }

  // 2. TASBIH MATCHES (تسبیح, Tasbih, ذکر, Zikr)
  const tasbihPatterns = [
    'تسبیح', 'تسبیحات', 'ذکر', 'اذکار', 'سبحان اللہ', 'تسبیح کرنی', 'درود',
    'tasbih', 'tasbeeh', 'tasbi', 'tasbeh', 'zikr', 'dhikr', 'zikir',
    'beads', 'azkar', 'subhanallah', 'tasbih karni', 'tasbeeh karni'
  ];
  for (const pattern of tasbihPatterns) {
    if (lower.includes(pattern) || spokenText.includes(pattern)) {
      return 'tasbih';
    }
  }

  // 3. QUIZ MATCHES (کوئز, Quiz, سوال جواب, Questions)
  const quizPatterns = [
    'کوئز', 'کویز', 'سوال', 'سوالات', 'سوال جواب', 'جواب', 'امتحان', 'کھیل',
    'quiz', 'quize', 'kweez', 'koyz', 'questions', 'question', 'sawal',
    'sawalat', 'trivia', 'quiz karna', 'khel', 'answers'
  ];
  for (const pattern of quizPatterns) {
    if (lower.includes(pattern) || spokenText.includes(pattern)) {
      return 'quiz';
    }
  }

  return 'unknown';
};

export class KidsVoiceListener {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isListening = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;
      }
    }
  }

  public listen(
    lang: 'urdu' | 'english',
    onResult: (result: SpeechRecognitionResultState) => void,
    onError: (err: string) => void,
    onStatusChange: (isListening: boolean) => void
  ): () => void {
    if (!this.recognition) {
      onError('unsupported');
      return () => {};
    }

    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
    }

    // Use Urdu for ur-PK, or en-US for English
    this.recognition.lang = lang === 'urdu' ? 'ur-PK' : 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onstart = () => {
      this.isListening = true;
      onStatusChange(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onend = () => {
      this.isListening = false;
      onStatusChange(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onStatusChange(false);
      onError(event.error || 'error');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let highestConfidence = 0;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal || item[0].transcript) {
          finalTranscript += item[0].transcript + ' ';
          if (item[0].confidence > highestConfidence) {
            highestConfidence = item[0].confidence;
          }
        }
      }

      finalTranscript = finalTranscript.trim();
      if (finalTranscript) {
        const matched = matchVoiceActivity(finalTranscript);
        onResult({
          transcript: finalTranscript,
          matchedActivity: matched,
          confidence: highestConfidence
        });
      }
    };

    try {
      this.recognition.start();
    } catch (e) {
      this.isListening = false;
      onStatusChange(false);
      onError('start_failed');
    }

    return () => {
      try {
        this.recognition?.stop();
      } catch {}
      this.isListening = false;
      onStatusChange(false);
    };
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }
}

export const kidsVoiceListener = new KidsVoiceListener();

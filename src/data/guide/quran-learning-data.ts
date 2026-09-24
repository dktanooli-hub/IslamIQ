export interface TajweedRuleItem {
  ruleNameEn: string;
  ruleNameUrdu: string;
  ruleNameArabic: string;
  explanationEn: string;
  explanationUrdu: string;
  exampleArabic: string;
  exampleTransliteration: string;
  applicationGuideEn: string;
  applicationGuideUrdu: string;
}

export interface QuranStageItem {
  stageNumber: number;
  badgeEn: string;
  badgeUrdu: string;
  titleEn: string;
  titleUrdu: string;
  targetAudienceEn: string;
  targetAudienceUrdu: string;
  learningGoalsEn: string[];
  learningGoalsUrdu: string[];
  practicalTipsEn: string[];
  practicalTipsUrdu: string[];
  recommendedDailyCommitmentEn: string;
  recommendedDailyCommitmentUrdu: string;
}

export interface QuranLearningGuideData {
  seoTitleEn: string;
  seoTitleUrdu: string;
  seoDescEn: string;
  seoDescUrdu: string;
  canonicalPath: string;
  heroBadgeEn: string;
  heroBadgeUrdu: string;
  h1En: string;
  h1Urdu: string;
  introEn: string;
  introUrdu: string;
  virtueHadithArabic: string;
  virtueHadithUrdu: string;
  virtueHadithEn: string;
  virtueHadithRef: string;
  stages: QuranStageItem[];
  essentialTajweedRules: TajweedRuleItem[];
  commonMistakes: Array<{
    mistakeEn: string;
    mistakeUrdu: string;
    correctionEn: string;
    correctionUrdu: string;
    explanationEn: string;
    explanationUrdu: string;
  }>;
  dailyRoutineAdviceEn: string[];
  dailyRoutineAdviceUrdu: string[];
  faqs: Array<{
    questionEn: string;
    questionUrdu: string;
    answerEn: string;
    answerUrdu: string;
    reference?: string;
  }>;
  internalLinks: Array<{
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
    path: string;
    tabId: string;
  }>;
}

export const QURAN_LEARNING_GUIDE_DATA: QuranLearningGuideData = {
  seoTitleEn: "Quran Learning Guide: Tajweed, Reading & Daily Routine | IslamIQ",
  seoTitleUrdu: "قرآن سیکھنے کی مکمل رہنمائی: تجوید، تلاوت اور حفظ کا رہنما | اسلام آئی کیو",
  seoDescEn: "Step-by-step Quran learning guide for beginners and intermediate students. Master Noorani Qaida, essential Tajweed rules, correct pronunciation, and daily Quran routine.",
  seoDescUrdu: "شروع سے قرآنِ مجید سیکھنے کی جامع گائیڈ: نورانی قاعدہ، ضروری تجوید کے قواعد (نون ساکن، مد، قلقلہ)، درست مخارج اور روزانہ حفظ و تلاوت کا نبوی طریقہ۔",
  canonicalPath: "/quran-learning-guide",
  heroBadgeEn: "Step-by-Step Learning Road Map • دليل تعلم القرآن وتجويده",
  heroBadgeUrdu: "قرآن فہمی و تجوید کا نصاب • دليل تعلم القرآن وتجويده",
  h1En: "Quran Learning Guide: How to Read, Recite with Tajweed & Understand",
  h1Urdu: "قرآن سیکھنے کا مکمل رہنما: ناظرہ، تجوید، تفہیم اور روزانہ کا معمول",
  introEn: "Learning to recite and understand the Holy Quran is among the highest honors and most rewarding spiritual journeys a Muslim can undertake. Whether starting from the basic Arabic alphabet or striving to refine articulation with melodic Tajweed and heartfelt comprehension, this guide outlines an authentic, progressive roadmap rooted in classical Islamic pedagogical tradition.",
  introUrdu: "قرآنِ کریم کی درست تلاوت اور اس کی تفہیم حاصل کرنا ہر مسلمان کی روحانی زندگی کا سب سے افضل اور بابرکت سفر ہے۔ چاہے آپ بنیادی حروفِ تہجی سے آغاز کر رہے ہوں یا تجوید کے حسین قواعد کے ساتھ اپنی قراءت کو سنوارنا چاہتے ہوں، یہ گائیڈ ایک مرحلہ وار اور مستند راستہ فراہم کرتی ہے۔",
  virtueHadithArabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  virtueHadithUrdu: "تم میں سب سے بہترین شخص وہ ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔",
  virtueHadithEn: "The best among you are those who learn the Quran and teach it to others.",
  virtueHadithRef: "Sahih al-Bukhari, Hadith 5027",
  stages: [
    {
      stageNumber: 1,
      badgeEn: "Foundation Level",
      badgeUrdu: "پہلا مرحلہ: بنیاد",
      titleEn: "Arabic Alphabet & Phonetics (Noorani Qaida)",
      titleUrdu: "عربی حروفِ تہجی اور مخارج کی پہچان (نورانی قاعدہ)",
      targetAudienceEn: "Complete beginners, children, and reverts who cannot read Arabic script yet.",
      targetAudienceUrdu: "نوآموز، بچے اور وہ احباب جنہوں نے ابھی عربی رسم الخط نہیں پڑھا۔",
      learningGoalsEn: [
        "Recognize all 28 Arabic letters in isolated, beginning, middle, and end forms.",
        "Learn accurate articulation points (Makharij) from throat, tongue, and lips.",
        "Master the short vowels (Harakat): Fatha (Zabar), Kasra (Zer), Damma (Pesh).",
        "Understand Tanween (double vowels) and Sukoon (Jazm) connecting letters."
      ],
      learningGoalsUrdu: [
        "عربی کے ۲۸ حروف کی مفرد اور مرکب (شروع، درمیان، آخر) شکلوں کی پہچان۔",
        "حلق، زبان اور ہونٹوں سے حروف کے درست مخارج کی مشق۔",
        "حرکاتِ ثلاثہ: زبر، زیر، اور پیش کی درست ادائیگی بغیر کھینچے۔",
        "تنوین اور سکون (جزم) کے ساتھ حروف کو باہم ملانے کا طریقہ۔"
      ],
      practicalTipsEn: [
        "Practice daily for 15-20 minutes with audio repetition rather than cramming once a week.",
        "Differentiate carefully between heavy letters (Kha, Saad, Daad, Ta, Za, Ghayn, Qaf) and light letters (Ta, Seen, Dal, Kaaf)."
      ],
      practicalTipsUrdu: [
        "ہفتے میں ایک بار طویل پڑھنے کے بجائے روزانہ ۱۵ سے ۲۰ منٹ سننے اور دہرانے کی مشق کریں۔",
        "موٹے حروف (خ، ص، ض، ط، ظ، غ، ق) اور باریک حروف (ت، س، د، ک) کے فرق کو خاص طور پر واضح رکھیں۔"
      ],
      recommendedDailyCommitmentEn: "15 to 25 minutes daily",
      recommendedDailyCommitmentUrdu: "روزانہ ۱۵ سے ۲۵ منٹ"
    },
    {
      stageNumber: 2,
      badgeEn: "Fluency Level",
      badgeUrdu: "دوسرا مرحلہ: روانی",
      titleEn: "Nazirah (Reading Fluency & Connecting Words)",
      titleUrdu: "ناظرہ قرآن: الفاظ جوڑنا اور روانی پیدا کرنا",
      targetAudienceEn: "Students who have finished Qaida and are starting to read direct Quranic text (Juz Amma).",
      targetAudienceUrdu: "وہ طلبہ جو قاعدہ مکمل کر چکے ہیں اور پارہ عم (تیسویں پارے) سے ناظرہ شروع کر رہے ہیں۔",
      learningGoalsEn: [
        "Read multi-syllable Quranic words smoothly without stuttering or breaking syllables.",
        "Recognize Shaddah (Tashdeed) and give doubled letters their due emphasis.",
        "Observe standard Quranic stop signs (Waqf) such as Meem (mandatory stop) and La (do not stop).",
        "Recite short Surahs (Surah Al-Fatihah, Surah Al-Ikhlas, Surah Al-Falaq, Surah An-Nas) fluently for daily Salah."
      ],
      learningGoalsUrdu: [
        "قرآنی الفاظ کو بغیر اٹکے اور بغیر کلمہ توڑے روانی کے ساتھ جوڑ کر پڑھنا۔",
        "تشدید (شد) والے حروف کو دباؤ اور مضبوطی کے ساتھ ادا کرنا۔",
        "رموزِ اوقاف (وقف کے نشانات جیسے م، ط، ج، لا) کی بنیادی پابندی۔",
        "نماز کے لیے چھوٹی سورتوں (فاتحہ، اخلاص، فلق، ناس) کی درست تلفظ کے ساتھ مشق۔"
      ],
      practicalTipsEn: [
        "Listen to a master reciter (such as Sheikh Mahmud Khalil Al-Husary or Mishary Rashid Alafasy) while tracking the text with your finger.",
        "Record your own recitation on your phone and listen back to identify where you stumble."
      ],
      practicalTipsUrdu: [
        "کسی مستند قاری (جیسے شیخ محمود خلیل الحصری) کی تلاوت سنیں اور ساتھ انگلی رکھ کر دیکھیں۔",
        "اپنے موبائل پر اپنی آواز ریکارڈ کر کے سنیں تاکہ اپنی غلطیوں اور ہچکچاہٹ کا اندازہ ہو سکے۔"
      ],
      recommendedDailyCommitmentEn: "20 to 35 minutes daily",
      recommendedDailyCommitmentUrdu: "روزانہ ۲۰ سے ۳۵ منٹ"
    },
    {
      stageNumber: 3,
      badgeEn: "Mastery Level",
      badgeUrdu: "تیسرا مرحلہ: تجوید و تفہیم",
      titleEn: "Tajweed Rules & Contemplation (Tadabbur)",
      titleUrdu: "احکامِ تجوید، خوبصورت قراءت اور تدبرِ قرآن",
      targetAudienceEn: "Learners seeking to elevate recitation to the Sunnah standard and understand the meaning.",
      targetAudienceUrdu: "وہ قارئین جو نبوی طریقے کے مطابق تجوید سے پڑھنے اور قرآنی پیغام کو سمجھنے کے متمنی ہیں۔",
      learningGoalsEn: [
        "Master the 4 rules of Noon Sakinah and Tanween: Izhar, Idgham, Iqlab, and Ikhfa.",
        "Master rules of Meem Sakinah and Ghunnah (nasalization).",
        "Learn Qalqalah (echoing sound on Qaf, Taa, Baa, Jeem, Daal when with Sukoon).",
        "Comprehend Madd (prolongation) rules: Natural Madd (2 counts) vs. Derived Madd (4-6 counts).",
        "Pair recitation with verified translation and brief Tafsir to cultivate heart presence."
      ],
      learningGoalsUrdu: [
        "نون ساکن اور تنوین کے چار بنیادی احکام: اظہار، ادغام، اقلاب اور اخفاء کا عملی اطلاق۔",
        "میم ساکن کے احکام اور غنہ (ناک سے آواز نکالنے) کی دو رکعت مقدار۔",
        "حروفِ قلقلہ (ق، ط، ب، ج، د) پر جمبش اور گونج دار آواز جب وہ ساکن ہوں۔",
        "مد کے احکام: مد اصلی (۲ حرکات) اور مد فرعی (۴ سے ۶ حرکات) کا درست ناپ۔",
        "تلاوت کے ساتھ ساتھ آسان ترجمہ اور خلاصہ تفسیر کا مطالعہ تاکہ دل پر اثر ہو۔"
      ],
      practicalTipsEn: [
        "Study under a qualified teacher (Qari) who can hear your recitation and grant immediate oral feedback.",
        "Recite slowly (Tartil) as commanded by Allah: 'And recite the Quran with measured recitation' (73:4)."
      ],
      practicalTipsUrdu: [
        "کسی باقاعدہ استاد یا قاری کو سنائیں تاکہ وہ غلطی کی فوری اصلاح کر سکیں۔",
        "قرآن کو ٹھہر ٹھہر کر اور ترتیل کے ساتھ پڑھیں جیسا کہ سورۃ المزمل (۷۳:۴) میں حکم دیا گیا ہے۔"
      ],
      recommendedDailyCommitmentEn: "30 to 45 minutes daily",
      recommendedDailyCommitmentUrdu: "روزانہ ۳۰ سے ۴۵ منٹ"
    }
  ],
  essentialTajweedRules: [
    {
      ruleNameEn: "Qalqalah (Echoing Vibrancy)",
      ruleNameUrdu: "قلقلہ (آواز کی گونج)",
      ruleNameArabic: "الْقَلْقَلَة",
      explanationEn: "When any of the five letters of Qutb Jad (ق, ط, ب, ج, د) carries a Sukoon (or is stopped upon), an echoing bounce is produced without adding an extra vowel.",
      explanationUrdu: "جب حروفِ قلقلہ (قطب جد: ق، ط، ب، ج، د) ساکن ہوں یا وقف کی وجہ سے ساکن ہو جائیں، تو مخرج سے آواز میں ایک ہلکی سی گونج پیدا کی جاتی ہے۔",
      exampleArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ",
      exampleTransliteration: "Qul Huwa-llahu Ahad (echo on Daal), Allahus-Samad (echo on Daal)",
      applicationGuideEn: "Ensure the bounce does not sound like a Fatha, Kasra, or Damma; it is an organic release of blocked air pressure.",
      applicationGuideUrdu: "خیال رہے کہ قلقلہ کرتے وقت زبر، زیر یا پیش کی آواز نہ بنے بلکہ صرف مخرج کی قدرتی جنبش ہو۔"
    },
    {
      ruleNameEn: "Ikhfa (Light Nasal Concealment)",
      ruleNameUrdu: "اخفاء (ناک میں آواز چھپانا)",
      ruleNameArabic: "الإِخْفَاء",
      explanationEn: "When Noon Sakinah or Tanween is followed by any of the 15 Ikhfa letters (such as Ta, Tha, Jeem, Dal, etc.), the sound of the 'N' is gently concealed in the nasal cavity with a 2-beat Ghunnah.",
      explanationUrdu: "نون ساکن یا تنوین کے بعد حروفِ اخفاء (۱۵ حروف) میں سے کوئی حرف آئے تو نون کی آواز کو ناک میں ہلکا سا چھپا کر دو حرکات کی مقدار غنہ کیا جاتا ہے۔",
      exampleArabic: "مِن قَبْلُ • أَنفُسَكُمْ • رِجَالًا كَثِيرًا",
      exampleTransliteration: "Min qabli (heavy nasalization), Anfusakum (light nasalization)",
      applicationGuideEn: "If the following letter is heavy (like Qaf or Saad), the Ghunnah is pronounced heavy. If light (like Ta or Seen), the Ghunnah is light.",
      applicationGuideUrdu: "اگر بعد والا حرف موٹا ہو تو غنہ بھی موٹا ہوگا، اور اگر باریک ہو تو غنہ بھی باریک آواز میں ادا ہوگا۔"
    },
    {
      ruleNameEn: "Idgham (Merging Letters)",
      ruleNameUrdu: "ادغام (حروف کا ایک دوسرے میں مدغم ہونا)",
      ruleNameArabic: "الإِدْغَام",
      explanationEn: "When Noon Sakinah or Tanween is followed by any letter of Yarmaloon (ي، ر، م، ل، و، ن), the Noon merges into the following letter. With letters (ی، ن، م، و) it includes Ghunnah, while with (ر، ل) it is without Ghunnah.",
      explanationUrdu: "نون ساکن یا تنوین کے بعد یرملون (ی، ر، م، ل، و، ن) کے حروف آئیں تو نون کو اگلے حرف میں ملا دیا جاتا ہے۔ (ر، ل) میں بغیر غنہ جبکہ باقی چار میں غنہ کے ساتھ ادغام ہوتا ہے۔",
      exampleArabic: "مَن يَقُولُ • مِن رَّبِّهِمْ",
      exampleTransliteration: "May-yaqool (with Ghunnah), Mir-Rabbihim (without Ghunnah)",
      applicationGuideEn: "In 'Mir-Rabbihim', the 'N' disappears completely into the 'R' with no nasal sound at all.",
      applicationGuideUrdu: "جیسے 'مِنْ رَبِّهِمْ' کو 'مِرَّبِّهِمْ' پڑھا جائے گا، نون کی کوئی آواز باقی نہیں رہے گی۔"
    },
    {
      ruleNameEn: "Madd (Vocal Elongation)",
      ruleNameUrdu: "مد کے قواعد (آواز کو کھینچنا)",
      ruleNameArabic: "الْمَدّ",
      explanationEn: "Lengthening the sound of the three Madd letters (Alif preceded by Fatha, Waw preceded by Damma, Ya preceded by Kasra). Natural elongation is 2 counts, while encountering a Hamzah or Sukoon extends it to 4 or 6 counts.",
      explanationUrdu: "حروفِ مدہ (الف، واو، یا) کی آواز کو لمبا کرنا۔ اصلی مد ۲ حرکات ہے، جبکہ ہمزہ یا سکون کے آنے پر مد متصل، منفصل یا لازم کے تحت ۴ سے ۶ حرکات تک کھینچا جاتا ہے۔",
      exampleArabic: "جَآءَ • الضَّآلِّينَ • قَالَ",
      exampleTransliteration: "Qala (2 beats), Jaaa'a (4-5 beats), Ad-Daaalleen (6 beats mandatory)",
      applicationGuideEn: "Count beats evenly using the time it takes to gently close or open a finger at a moderate reading pace.",
      applicationGuideUrdu: "حرکات کا ناپ انگلی کھولنے یا بند کرنے کی درمیانی رفتار سے معلوم کیا جاتا ہے۔"
    }
  ],
  commonMistakes: [
    {
      mistakeEn: "Confusing similar-sounding Arabic letters",
      mistakeUrdu: "ہم آواز لگنے والے عربی حروف میں خلط ملط کرنا",
      correctionEn: "Distinguish strictly between Ha (ح - deep throat) and Haa (ه - chest), 'Ayn (ع - mid-throat) and Hamzah (أ - vocal cord click), and Saad (ص - thick whistle) and Seen (س - light whistle).",
      correctionUrdu: "ح اور ہ، ع اور ء، ص اور س، ط اور ت، ض اور د کے مابین واضح فرق رکھیں۔ مثلاً 'قلب' (دل) اور 'کلب' (کتا) میں فرق کرنا فرض ہے۔",
      explanationEn: "A mistake in letter pronunciation can completely alter the meaning of an Ayah, which is known in Tajweed as Lahn Jali (obvious grammatical corruption).",
      explanationUrdu: "حروف کی غلط ادائیگی سے معنی میں فاحش بگاڑ پیدا ہو جاتا ہے جسے تجوید میں لحنِ جلی کہتے ہیں اور اس سے بچنا فرض ہے۔"
    },
    {
      mistakeEn: "Stretching short vowels into long vowels",
      mistakeUrdu: "حرکات (زبر، زیر، پیش) کو بلاوجہ کھینچ کر حروفِ مدہ بنا دینا",
      correctionEn: "Pronounce Fatha, Kasra, and Damma briskly without elongation unless a Madd letter is explicitly written.",
      correctionUrdu: "زبر، زیر اور پیش کو جھٹکے بغیر مگر تیزی سے ادا کریں، انہیں بلاوجہ کھینچ کر الف، یا اور واو نہ بنائیں۔",
      explanationEn: "For example, saying 'An'amtu' instead of 'An'amta' changes the pronoun from 'You [Allah] blessed' to 'I blessed'.",
      explanationUrdu: "مثلاً 'أَنْعَمْتَ' کی ت پر زبر کو کھینچنے سے لفظی و معنوی غلطی پیدا ہو سکتی ہے۔"
    },
    {
      mistakeEn: "Stopping at improper places without sufficient breath",
      mistakeUrdu: "سانس ٹوٹنے پر نامناسب جگہ پر وقف کرنا اور بغیر دہرائے آگے بڑھ جانا",
      correctionEn: "If out of breath, stop naturally, but re-commence your recitation by repeating the previous word or two to preserve coherent sentence grammar.",
      correctionUrdu: "اگر درمیان میں سانس ٹوٹ جائے تو وقف کر لیں، مگر دوبارہ شروع کرتے وقت ایک دو لفظ پیچھے سے ملا کر پڑھیں تاکہ معنی کا تسلسل قائم رہے۔",
      explanationEn: "Stopping in the middle of a conditional clause can invert the meaning. Re-starting smoothly ensures reverent comprehension.",
      explanationUrdu: "نامناسب وقف سے قرآنی مفہوم بدل سکتا ہے، اس لیے اچھے طریقے سے پچھلے کلمے کو ملا کر پڑھنا چاہیے۔"
    }
  ],
  dailyRoutineAdviceEn: [
    "Commit to consistency over volume: 15 focused minutes every morning after Fajr yields far deeper retention than 2 hours once a week.",
    "Always recite out loud at a comfortable volume; silent reading in the heart does not train the mouth, tongue, and throat muscles.",
    "Pair every 5 verses of Arabic recitation with reading their authentic translation to keep your heart alive to the divine message.",
    "Review previously memorized Surahs every single day in your daily Sunnah and Nawafil prayers."
  ],
  dailyRoutineAdviceUrdu: [
    "مقدار سے زیادہ تسلسل کو ترجیح دیں: روزانہ نمازِ فجر کے بعد ۱۵ منٹ کی تلاوت ہفتے میں ایک دن طویل پڑھنے سے بدرجہا بہتر ہے۔",
    "تلاوت ہمیشہ دھیمی مگر بلند آواز سے کریں، صرف دل میں پڑھنے سے زبان اور مخارج کی درست تربیت نہیں ہوتی۔",
    "پانچ آیات کی تلاوت کے بعد ان کا ترجمہ ضرور دیکھیں تاکہ دل میں اللہ کے کلام کا زندہ شعور پیدا ہو۔",
    "جو سورتیں یاد ہیں ان کا روزانہ سنن و نوافل میں باقاعدگی سے اعادہ کریں۔"
  ],
  faqs: [
    {
      questionEn: "Can an adult learn to read the Quran with proper Tajweed from scratch?",
      questionUrdu: "کیا کوئی بڑی عمر کا شخص شروع سے صحیح تجوید کے ساتھ قرآن سیکھ سکتا ہے؟",
      answerEn: "Absolutely. The Sahabah (companions of the Prophet ﷺ) were adults when the Quran was revealed to them, and they mastered its recitation. Prophet Muhammad ﷺ explicitly gave glad tidings: 'The one who recites the Quran and stumbles over it, finding it difficult, will have a double reward' (Sahih Muslim 798).",
      answerUrdu: "یقیناً! صحابہ کرام رضی اللہ عنہم نے بڑی عمر میں اسلام قبول کیا اور کلام اللہ کو کامل مہارت سے سیکھا۔ نبی کریم ﷺ نے فرمایا کہ جو شخص مشقت اور اٹکنے کے باوجود کوشش سے قرآن پڑھتا ہے اس کے لیے دہرا اجر ہے (صحیح مسلم: ۷۹۸)۔",
      reference: "Sahih Muslim 798"
    },
    {
      questionEn: "Is learning Tajweed strictly obligatory (Fard) for every Muslim?",
      questionUrdu: "کیا ہر مسلمان پر تجوید سیکھنا فرض ہے؟",
      answerEn: "Scholars distinguish between two levels: 1) Reciting letters correctly so that words and meanings are not altered (avoiding Lahn Jali) is Fard 'Ayn (obligatory upon every individual). 2) Mastering intricate technical terminology and nuanced aesthetic rules (such as detailed degrees of Madd and subtle stops) is Fard Kifayah (communal obligation) and Sunnah Mustahabbah for the individual.",
      answerUrdu: "علماء کے مطابق حروف کو اس حد تک درست پڑھنا کہ معنی نہ بدلیں اور نماز صحیح رہے (لحنِ جلی سے بچنا) ہر مسلمان پر فرضِ عین ہے۔ جبکہ تجوید کی تفصیلی باریکیاں اور اصطلاحات جاننا فرضِ کفایہ اور مستحب ہے۔",
      reference: "Al-Muqaddimah al-Jazariyyah, Imam Ibn al-Jazari"
    },
    {
      questionEn: "Can a menstruating woman read the Quran from a phone or recite from memory?",
      questionUrdu: "کیا ایامِ مخصوصہ میں خواتین موبائل فون سے قرآن پڑھ سکتی ہیں یا زبانی تلاوت کر سکتی ہیں؟",
      answerEn: "There is a recognized scholarly difference. The majority of jurists (including Hanafis, Shafi'is, and Hanbalis) traditionally held that a menstruating woman should not recite long passages from the Quran, though she may recite verses intended as supplications, remembrance (Dhikr), or teaching. However, Imam Malik and many prominent contemporary scholars (including Sheikh Ibn Taymiyyah and Ibn Baz) allowed women to recite from memory or from digital screens without touching the physical paper Mushaf, especially when studying or fearing forgetfulness.",
      answerUrdu: "اس میں ائمہ کا علمی اختلاف ہے: جمہور ائمہ کے نزدیک تلاوت سے گریز کیا جائے البتہ دعائیہ آیات اور اذکار پڑھے جا سکتے ہیں۔ جبکہ امام مالک، امام ابن تیمیہ اور متعدد معاصرین کے نزدیک حفظ قائم رکھنے یا تعلیم کے لیے موبائل اسکرین سے یا زبانی تلاوت کرنا جائز ہے بشرطیکہ کاغذی مصحف کو بغیر غلاف کے ہاتھ نہ لگایا جائے۔",
      reference: "Majmoo' al-Fatawa (Ibn Taymiyyah), Al-Mudawwanah (Imam Malik)"
    }
  ],
  internalLinks: [
    {
      titleEn: "Read Daily Quran Verse with Reflection",
      titleUrdu: "روزانہ کی قرآنی آیت مع اردو ترجمہ و تفسیر",
      descEn: "Explore today's featured verse with Arabic audio recitation, authentic Urdu translation, and life lessons.",
      descUrdu: "آج کی منتخب آیت سنیں، مفہوم سمجھیں اور روزمرہ زندگی میں اس پر عمل کریں۔",
      path: "/daily-quran-verse",
      tabId: "daily-quran-verse"
    },
    {
      titleEn: "How to Perform Salah (Complete Guide)",
      titleUrdu: "نماز کا طریقہ اور تلاوت کی ترتیب",
      descEn: "Learn how to recite Surah Al-Fatihah and additional Surahs correctly within the daily prayers.",
      descUrdu: "نماز کے اندر قیام، رکوع اور سجدے میں مسنون تلاوت و اذکار کی رہنمائی۔",
      path: "/how-to-perform-salah",
      tabId: "how-to-perform-salah"
    },
    {
      titleEn: "Digital Tasbih Counter & Dhikr",
      titleUrdu: "ڈیجیٹل تسبیح کاؤنٹر اور اذکار",
      descEn: "Count SubhanAllah, Alhamdulillah, and Allahu Akbar with haptic vibrations and lifetime tracking.",
      descUrdu: "تلاوتِ قرآن کے بعد مسنون اذکار اور درودِ پاک کے ورد کے لیے ڈیجیٹل کاؤنٹر۔",
      path: "/tasbih",
      tabId: "tasbih"
    }
  ]
};

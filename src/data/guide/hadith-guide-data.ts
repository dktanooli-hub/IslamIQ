export interface HadithBookInfo {
  titleEn: string;
  titleUrdu: string;
  compiler: string;
  era: string;
  significanceEn: string;
  significanceUrdu: string;
}

export interface HadithClassification {
  termAr: string;
  termEn: string;
  termUrdu: string;
  meaningEn: string;
  meaningUrdu: string;
  criterion: string;
}

export interface HadithPracticalEtiquette {
  ruleEn: string;
  ruleUrdu: string;
  explanationEn: string;
  explanationUrdu: string;
}

export interface HadithFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  reference: string;
}

export interface HadithLearningGuideData {
  h1En: string;
  h1Urdu: string;
  introEn: string;
  introUrdu: string;
  definitionEn: string;
  definitionUrdu: string;
  isnadMatnEn: string;
  isnadMatnUrdu: string;
  classifications: HadithClassification[];
  majorCompilations: HadithBookInfo[];
  verificationEthics: HadithPracticalEtiquette[];
  faqs: HadithFAQ[];
  relatedLinks: { titleEn: string; titleUrdu: string; tab: string }[];
}

export const HADITH_GUIDE_DATA: HadithLearningGuideData = {
  h1En: "Hadith Learning Guide: Understanding Prophetic Traditions & Authenticity",
  h1Urdu: "حدیث سیکھنے کی جامع گائیڈ: حدیث کا مفہوم، اسناد، اقسام اور مستند کتب",
  introEn: "The Sunnah of Prophet Muhammad ﷺ is the second divine source of Islamic guidance alongside the Holy Quran. Hadith constitutes the recorded sayings, actions, silent approvals (Taqreer), and physical and moral descriptions of the Prophet ﷺ. This comprehensive guide introduces how Hadith was preserved, how scholars verify authenticity, major compilations (Kutub al-Sittah), and how everyday Muslims should respectfully approach Hadith literature without falling into misquotations.",
  introUrdu: "قرآن مجید کے ساتھ ساتھ نبی کریم ﷺ کی سنت مطہرہ دینِ اسلام کا دوسرا بنیادی ماخذ ہے۔ حدیث ان مبارک اقوال، افعال، تقریرات (خاموش تائید) اور اوصافِ جمیلہ کے مجموعے کو کہتے ہیں جو رسول اللہ ﷺ سے منسوب ہیں۔ یہ گائیڈ حدیث کے بنیادی اصول، اسناد و متن کی تحقیق، کتبِ ستہ کا تعارف اور عام مسلمانوں کے لیے حدیث کو سمجھنے کے سنہری اصول پیش کرتی ہے۔",
  definitionEn: "Linguistically, 'Hadith' means new, recent, or a piece of news. In Islamic jurisprudence (Usul al-Hadith), it refers specifically to whatever is attributed to the Messenger of Allah ﷺ in word, action, approval, or characteristic. Together with the Quran, it clarifies obligations, details worship like Salah and Zakat, and provides a timeless moral blueprint.",
  definitionUrdu: "لغت میں حدیث کے معنی نئی بات یا خبر کے ہیں۔ اصطلاحِ شریعت میں حدیث سے مراد وہ تمام اقوال، افعال، تقریر (کسی کام کو دیکھ کر خاموشی اختیار کرنا) اور احوال ہیں جو رسول اللہ ﷺ کی طرف منسوب ہیں۔ قرآن مجید کے احکام کی تفصیلی عملی تشریح سنت اور حدیث مبارکہ سے ہی ملتی ہے۔",
  isnadMatnEn: "Every authentic Hadith contains two indispensable components: 1) Isnad (the Sanad or chain of transmission linking modern readers back through generations of narrators to the Prophet ﷺ), and 2) Matn (the actual text or message of the tradition). Scholars of Hadith subjected every narrator to meticulous scrutiny regarding truthfulness, memory, piety, and historical continuity before accepting a report.",
  isnadMatnUrdu: "ہر حدیث کے دو بنیادی اجزاء ہوتے ہیں: ۱) اسناد (راویوں کا سلسلہ جو مؤلفِ کتاب سے رسول اللہ ﷺ تک پہنچتا ہے) اور ۲) متن (حدیث کے اصل الفاظ یا کلام)۔ محدثین نے ہر راوی کے تقویٰ، حافظے اور ملاقات کی سخت ترین جانچ پڑتال کے بعد ہی حدیث کو قبول کیا۔",
  classifications: [
    {
      termAr: "صَحِيح (Sahih)",
      termEn: "Sound / Rigorously Authentic",
      termUrdu: "صحیح حدیث",
      meaningEn: "A continuous chain of upright narrators possessing exceptional precision and memory, free from hidden defects ('Illah) and irregularity (Shudhudh).",
      meaningUrdu: "جس کی سند متصل ہو، تمام راوی عادل، باکردار اور قوی حافظے والے ہوں، اور اس میں کوئی مخالفت یا پوشیدہ عیب نہ ہو۔",
      criterion: "Highest level of evidentiary authority in Islamic creed and rulings (e.g., Sahih al-Bukhari & Sahih Muslim)."
    },
    {
      termAr: "حَسَن (Hasan)",
      termEn: "Good / Reliable",
      termUrdu: "حسن حدیث",
      meaningEn: "Meets the conditions of Sahih except that one or more narrators have slightly lesser precision, though their truthfulness and piety remain unimpeached.",
      meaningUrdu: "وہ حدیث جس کے تمام راوی سچے اور عادل ہوں، لیکن ان کا حافظہ اور ضبط صحیح حدیث کے راویوں سے معمولی کم درجے کا ہو۔",
      criterion: "Fully acceptable and legally binding for practical rulings in Islamic Fiqh."
    },
    {
      termAr: "ضَعِيف (Da'if)",
      termEn: "Weak",
      termUrdu: "ضعیف حدیث",
      meaningEn: "Fails to meet the rigorous criteria of Sahih or Hasan due to a broken chain, narrator with poor memory, or unknown identity.",
      meaningUrdu: "جس میں صحیح یا حسن کی شرائط پوری نہ ہوں (جیسے سند میں انقطاع ہو یا راوی کے حافظے میں کمزوری ہو)۔",
      criterion: "Cannot be used to establish core creed or legal prohibitions. Many classical jurists permitted quoting weak hadiths only for virtuous encouragement (Fada'il al-A'mal) under strict conditions."
    },
    {
      termAr: "مَوْضُوع (Mawdu')",
      termEn: "Fabricated / Forged",
      termUrdu: "موضوع (من گھڑت)",
      meaningEn: "Invented statements falsely ascribed to the Prophet ﷺ. Fabricating hadith is among the gravest sins in Islam.",
      meaningUrdu: "جھوٹی بات جو دانستہ طور پر گھڑ کر نبی کریم ﷺ کی طرف منسوب کی گئی ہو۔",
      criterion: "Completely rejected. It is forbidden to narrate or share a fabricated hadith except when explicitly warning others against it."
    }
  ],
  majorCompilations: [
    {
      titleEn: "Sahih al-Bukhari",
      titleUrdu: "صحیح البخاری",
      compiler: "Imam Muhammad ibn Isma'il al-Bukhari (d. 256 AH)",
      era: "3rd Century AH (Central Asia / Hijaz)",
      significanceEn: "Universally acknowledged by Muslim scholars as the most authentic book after the Holy Quran, famous for ultra-strict narrator validation conditions.",
      significanceUrdu: "امتِ مسلمہ کا اجماع ہے کہ قرآن مجید کے بعد روئے زمین پر سب سے صحیح ترین کتاب صحیح بخاری ہے، جس کے راویوں کی جانچ کڑی ترین تھی۔"
    },
    {
      titleEn: "Sahih Muslim",
      titleUrdu: "صحیح مسلم",
      compiler: "Imam Muslim ibn al-Hajjaj al-Naysaburi (d. 261 AH)",
      era: "3rd Century AH (Nishapur / Khorasan)",
      significanceEn: "Celebrated for masterful thematic organization and grouping all transmission routes of a Hadith together in one place for clear comparison.",
      significanceUrdu: "حسنِ ترتیب اور تمام اسناد کو ایک ہی باب کے تحت یکجا کرنے میں بے مثال شاہکار، جس میں فقہی ابواب کی اعلیٰ درجہ بندی ہے۔"
    },
    {
      titleEn: "Sunan Abu Dawud",
      titleUrdu: "سنن ابی داؤد",
      compiler: "Imam Abu Dawud Sulayman ibn al-Ash'ath al-Sijistani (d. 275 AH)",
      era: "3rd Century AH",
      significanceEn: "Primary reference work for legal rulings (Ahkam) used across all major schools of Islamic jurisprudence.",
      significanceUrdu: "فقہی احکام اور مسائل کے استنباط کے لیے بنیادی ترین کتاب، جس میں شرعی احکام سے متعلق احادیث جمع کی گئی ہیں۔"
    },
    {
      titleEn: "Jami' al-Tirmidhi",
      titleUrdu: "جامع الترمذی",
      compiler: "Imam Muhammad ibn 'Isa al-Tirmidhi (d. 279 AH)",
      era: "3rd Century AH",
      significanceEn: "Distinguished by grading each Hadith (e.g., 'Hasan Sahih') and documenting differences among the Sahaba and early jurists.",
      significanceUrdu: "احادیث کے تحقیقی درجات (صحیح، حسن، غریب) اور صحابہ و فقہاء کے اختلافی اقوال بیان کرنے والی جامع کتاب۔"
    },
    {
      titleEn: "Sunan an-Nasa'i",
      titleUrdu: "سنن النسائی (المجتبى)",
      compiler: "Imam Ahmad ibn Shu'ayb an-Nasa'i (d. 303 AH)",
      era: "3rd - 4th Century AH",
      significanceEn: "Famous for exceptionally rigorous critique of subtle narrator defects ('Ilal) and second only to Bukhari/Muslim in narrator strength.",
      significanceUrdu: "راویوں کی باریک خامیوں (علل) کی چھان بین میں ممتاز، اس کی روایات کی اسناد کا معیار نہایت بلند ہے۔"
    },
    {
      titleEn: "Sunan Ibn Majah",
      titleUrdu: "سنن ابن ماجہ",
      compiler: "Imam Muhammad ibn Yazid Ibn Majah (d. 273 AH)",
      era: "3rd Century AH",
      significanceEn: "Completes the six canonical collections (al-Kutub al-Sittah), renowned for unique narrations and excellent chapter divisions.",
      significanceUrdu: "صحاح ستہ کی چھٹی کتاب، ابواب کی خوبصورت ترتیب اور نایاب احادیث کے شمول کے لیے معروف ہے۔"
    }
  ],
  verificationEthics: [
    {
      ruleEn: "Always verify before sharing on social media",
      ruleUrdu: "سوشل میڈیا پر شیئر کرنے سے پہلے تحقیق کریں",
      explanationEn: "The Prophet ﷺ warned: 'It is sufficient falsehood for a person to relay everything they hear' (Sahih Muslim 5). Always ensure a reliable scholar or recognized source book verified the citation.",
      explanationUrdu: "رسول اللہ ﷺ نے فرمایا: 'انسان کے جھوٹا ہونے کے لیے یہی کافی ہے کہ وہ جو کچھ سنے (بغیر تصدیق کے) آگے بیان کر دے' (صحیح مسلم ۵)۔"
    },
    {
      ruleEn: "Differentiate between Hadith and scholarly sayings",
      ruleUrdu: "حدیث اور اقوالِ علماء میں فرق سمجھیں",
      explanationEn: "Many popular proverbs or pious reflections of scholars are mistakenly attributed to the Prophet ﷺ. Only words historically validated to him can be cited as Hadith.",
      explanationUrdu: "بہت سے صوفیاء یا علماء کے اقوال یا عربی محاورات کو لوگ غلطی سے حدیث سمجھ لیتے ہیں۔ جب تک نسبت ثابت نہ ہو اسے حدیث نہ کہیں۔"
    },
    {
      ruleEn: "Understand contexts and reasons for revelation (Asbab al-Wurud)",
      ruleUrdu: "حدیث کا پس منظر اور سببِ ورود جانیں",
      explanationEn: "A single Hadith should not be read in total isolation. Jurists synthesize all related traditions and the overarching goals of the Quran before deriving a binding rule.",
      explanationUrdu: "کسی ایک روایت کو بغیر پس منظر کے دیکھ کر حتمی فتویٰ جاری نہیں کرنا چاہیے، بلکہ تمام متعلقہ احادیث اور آیاتِ قرآنیہ کا مجموعی جائزہ ضروری ہے۔"
    },
    {
      ruleEn: "Respect recognized differences among classical schools",
      ruleUrdu: "فقہی مذاہب کے علمی طریقہ کار کا احترام کریں",
      explanationEn: "Differences in legal rulings between Hanafi, Maliki, Shafi'i, and Hanbali schools often stem from how each school prioritizes various sound Hadith methodologies. Such diversity is an academic heritage.",
      explanationUrdu: "ائمہ اربعہ کے مابین فروعی اختلافات احادیث کی ترجیح اور فہم کے اصولوں پر مبنی ہیں، یہ باہمی نفرت کا سبب نہیں بلکہ علمی وسعت کا مظہر ہے۔"
    }
  ],
  faqs: [
    {
      questionEn: "What is the difference between Hadith Qudsi and regular Hadith Nabawi?",
      questionUrdu: "حدیث قدسی اور حدیث نبوی میں کیا فرق ہے؟",
      answerEn: "In Hadith Qudsi, the meaning is directly revealed by Allah Almighty, but expressed in the words of the Prophet Muhammad ﷺ. Unlike the Quran, its recitation is not used inside Salah, and it is not universally mass-transmitted (Mutawatir). In regular Hadith Nabawi, both the wording and personal expression originate from the Prophet ﷺ under divine guidance.",
      answerUrdu: "حدیث قدسی میں مفہوم و معنی اللہ تعالیٰ کی طرف سے الہام ہوتا ہے اور الفاظ نبی کریم ﷺ کے ہوتے ہیں۔ اس کی تلاوت نماز میں نہیں ہوتی۔ جبکہ حدیث نبوی میں الفاظ اور تعبیر دونوں رسول اللہ ﷺ کے ہوتے ہیں۔",
      reference: "Mabahith fi 'Ulum al-Hadith (Dr. Subhi al-Salih)"
    },
    {
      questionEn: "Is every Hadith in Sahih al-Bukhari and Sahih Muslim 100% authentic?",
      questionUrdu: "کیا صحیح بخاری اور صحیح مسلم کی تمام احادیث قطعی طور پر صحیح ہیں؟",
      answerEn: "Yes, the overarching consensus (Ijma) of Ahl al-Sunnah across centuries is that the interconnected, continuous traditions recorded in Sahih al-Bukhari and Sahih Muslim represent the highest pinnacle of historical authenticity and reliable Sunnah.",
      answerUrdu: "جی ہاں، صدیوں سے امتِ مسلمہ اور جلیل القدر ائمہ حدیث کا اجماع ہے کہ صحیحین (بخاری و مسلم) کی متصل اسناد والی احادیث صحت کے بلند ترین درجے پر فائز ہیں۔",
      reference: "Muqaddimah Ibn al-Salah"
    },
    {
      questionEn: "Can I act upon a weak (Da'if) Hadith?",
      questionUrdu: "کیا ضعیف حدیث پر عمل کیا جا سکتا ہے؟",
      answerEn: "Scholars like Imam al-Nawawi and Ibn Hajar clarified that weak hadiths cannot establish lawful (Halal) or prohibited (Haram) rulings, nor matters of Aqeedah. However, a mildly weak Hadith may be quoted for virtuous encouragement (Fada'il al-A'mal) provided it does not contradict an established Sahih principle.",
      answerUrdu: "امام نووی اور حافظ ابن حجرؒ کے مطابق ضعیف حدیث سے حلال و حرام یا عقیدہ ثابت نہیں ہوتا، البتہ اگر ضعف شدید نہ ہو تو نیک اعمال کی ترغیب (فضائلِ اعمال) میں اسے بیان کیا جا سکتا ہے۔",
      reference: "Al-Adhkar by Imam an-Nawawi"
    },
    {
      questionEn: "Why do Hadith collections date from 150-250 years after the Prophet ﷺ?",
      questionUrdu: "احادیثِ مبارکہ نبی کریم ﷺ کے بعد ڈیڑھ دو سو سال بعد کیوں لکھی گئیں؟",
      answerEn: "This is a common misconception. Hadith was recorded in written notebooks (Suhuf) during the Prophet's ﷺ lifetime by companions like 'Abdullah ibn 'Amr ibn al-'As (al-Sahifah al-Sadiqah) and Abu Hurairah. The 3rd-century AH compilations were comprehensive formal encyclopedias compiling, indexing, and scientifically cross-verifying these pre-existing written notes and oral transmissions.",
      answerUrdu: "یہ ایک عام غلط فہمی ہے۔ احادیث رسول اللہ ﷺ کے مبارک دور ہی میں صحابہ کرام (مثلاً صحیفہ صادقہ از حضرت عبداللہ بن عمرو بن عاصؓ) نے لکھنا شروع کر دی تھیں۔ تیسری صدی ہجری میں ان بکھرے ہوئے صحیفوں کی باقاعدہ جانچ، ابواب بندی اور انسائیکلوپیڈیا کی شکل میں تدوین کی گئی۔",
      reference: "Dirasat fi al-Hadith al-Nabawi (Dr. Muhammad Mustafa Azami)"
    }
  ],
  relatedLinks: [
    { titleEn: "Daily Authentic Hadith", titleUrdu: "روزانہ کی صحیح حدیث", tab: "daily-hadith" },
    { titleEn: "Islamic Quiz on Sunnah & Seerah", titleUrdu: "سیرت و سنت کوئز", tab: "islamic-quiz" },
    { titleEn: "Daily Quran Verse", titleUrdu: "روزانہ کی قرآنی آیت", tab: "daily-quran-verse" },
    { titleEn: "Islamic Questions & Answers", titleUrdu: "مستند اسلامی سوال جواب", tab: "islamic-questions-answers" }
  ]
};

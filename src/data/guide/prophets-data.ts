export interface QuranVerseCitation {
  arabic: string;
  transEn: string;
  transUrdu: string;
  ref: string;
}

export interface ProphetStory {
  id: string;
  number: number;
  nameEn: string;
  nameUrdu: string;
  titleEn: string;
  titleUrdu: string;
  arabicHonorific: string;
  isUlulAzm?: boolean;
  quranMentionsCount: string;
  keyQuranVerses: QuranVerseCitation[];
  coreNarrativeEn: string;
  coreNarrativeUrdu: string;
  keyLessonsEn: string[];
  keyLessonsUrdu: string[];
  authenticSources: string;
  dedicatedGuideUrl?: string;
}

export interface ProphetFaq {
  qEn: string;
  qUrdu: string;
  aEn: string;
  aUrdu: string;
  ref: string;
}

export const PROPHETS_DATA: ProphetStory[] = [
  {
    id: "adam",
    number: 1,
    nameEn: "1. Prophet Adam (عَلَيْهِ ٱلسَّلَامُ) — The First Human & Prophet",
    nameUrdu: "۱. حضرت آدم علیہ السلام — پہلے انسان اور پہلے پیغمبر",
    titleEn: "Creation, Free Will, Sincere Repentance (Tawbah), and Divine Mercy",
    titleUrdu: "تخلیقِ انسانی، آزمائش، سچی توبہ اور رحمتِ الٰہی",
    arabicHonorific: "أَبُو الْبَشَرِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 25 times in the Holy Quran",
    keyQuranVerses: [
      {
        arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
        transEn: "And [mention, O Muhammad], when your Lord said to the angels, 'Indeed, I will make upon the earth a successive authority (Khalifah).'",
        transUrdu: "اور یاد کیجیے جب آپ کے رب نے فرشتوں سے فرمایا: 'میں زمین میں ایک خلیفہ (نائب) بنانے والا ہوں۔'",
        ref: "Surah Al-Baqarah 2:30"
      },
      {
        arabic: "قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        transEn: "They said, 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.'",
        transUrdu: "دونوں نے عرض کی: 'اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو نے ہمیں نہ بخشا اور ہم پر رحم نہ فرمایا تو ہم یقیناً خسارہ پانے والوں میں سے ہو جائیں گے۔'",
        ref: "Surah Al-A'raf 7:23"
      }
    ],
    coreNarrativeEn: "Allah created Adam from clay, breathed into him the soul He created, taught him the names of all things, and commanded the angels to prostrate in honor of Allah's creation. Iblis (Satan) refused out of arrogance and pride ('I am better than him; You created me from fire and created him from clay'). Placed in Paradise with Hawwa (Eve), they were permitted everything except one forbidden tree. Deceived by Satan's false oath, they ate from it. Unlike Satan who persisted in pride and rebellion, Adam and Hawwa immediately took accountability, turned in heartfelt repentance with words Allah inspired them with, and Allah mercifully accepted their repentance.",
    coreNarrativeUrdu: "اللہ تعالیٰ نے آدم علیہ السلام کو مٹی سے پیدا فرمایا، اپنی طرف سے روح پھونکی، تمام اشیاء کے اسماء سکھائے اور فرشتوں کو تعظیم و اکرام کا سجدہ کرنے کا حکم دیا۔ ابلیس نے تکبر کرتے ہوئے حکم ماننے سے انکار کیا ('میں اس سے بہتر ہوں، تو نے مجھے آگ سے اور اسے مٹی سے پیدا کیا')۔ جنت میں حضرت حوا کے ساتھ سکونت فرمائی اور صرف ایک ممنوعہ درخت کے قریب جانے سے روکا گیا۔ ابلیس کے بہکاوے میں آ کر لغزش ہوئی، لیکن ابلیس کی سرکشی کے برعکس حضرت آدم و حوا نے فوری اعترافِ گناہ کیا اور رب کی سکھائی ہوئی کلمات سے سچی توبہ کی، جسے اللہ تعالیٰ نے شرفِ قبولیت بخشا۔",
    keyLessonsEn: [
      "Knowledge and intellectual capacity are divine trusts that honor humanity above creation.",
      "Arrogance (Kibr) and prejudice ('I am better than him') were the root causes of Iblis's downfall.",
      "Human fallibility is met with Allah's infinite forgiveness when accompanied by sincere, humble repentance (Tawbah).",
      "Satan's perennial strategy is deceit through whisperings, false promises, and appealing to ego."
    ],
    keyLessonsUrdu: [
      "علم اور فہم وہ اعزاز ہے جس کی بنا پر انسان کو دیگر مخلوقات پر فضیلت دی گئی۔",
      "تکبر اور نسل پرستی ('میں اس سے بہتر ہوں') ابلیس کے راندہ درگاہ ہونے کا بنیادی سبب بنے۔",
      "غلطی کے بعد ہٹ دھرمی کے بجائے فوری سچی توبہ اور ندامت مؤمن کی اصل پہچان ہے۔",
      "شیطان کا مستقل حربہ جھوٹے دلاسے، وسوسے اور انسان کی انا کو ہوا دینا ہے۔"
    ],
    authenticSources: "Surah Al-Baqarah (2:30–39), Surah Al-A'raf (7:11–25), Surah Ta-Ha (20:115–124), Sahih al-Bukhari 3326"
  },
  {
    id: "idris",
    number: 2,
    nameEn: "2. Prophet Idris / Enoch (عَلَيْهِ ٱلسَّلَامُ) — Man of Truth & Elevated Station",
    nameUrdu: "۲. حضرت ادریس علیہ السلام — صادق و صابر پیغمبر اور بلند مقام",
    titleEn: "Devotion, Truthfulness, Scholarly Wisdom, and Divine Exaltation",
    titleUrdu: "صداقت، صبر، فکری بصیرت اور بارگاہِ الٰہی میں بلند رتبہ",
    arabicHonorific: "الصِّدِّيقُ النَّبِيُّ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned twice explicitly in the Quran (Surah Maryam & Al-Anbiya)",
    keyQuranVerses: [
      {
        arabic: "وَاذْكُرْ فِي الْكِتَابِ إِدْرِيسَ ۚ إِنَّهُ كَانَ صِدِّيقًا نَّبِيًّا ۝ وَرَفَعْنَاهُ مَكَانًا عَلِيًّا",
        transEn: "And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station.",
        transUrdu: "اور کتاب میں ادریس (علیہ السلام) کا ذکر کیجیے۔ بے شک وہ بڑے سچے نبی تھے۔ اور ہم نے انہیں بلند مقام پر اٹھایا۔",
        ref: "Surah Maryam 19:56–57"
      },
      {
        arabic: "وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ ۝ وَأَدْخَلْنَاهُمْ فِي رَحْمَتِنَا ۖ إِنَّهُم مِّنَ الصَّالِحِينَ",
        transEn: "And [mention] Ishmael and Idris and Dhu'l-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.",
        transUrdu: "اور اسماعیل اور ادریس اور ذوالکفل (کا تذکرہ فرمائیے)؛ یہ سب صبر کرنے والے تھے۔ اور ہم نے انہیں اپنی رحمت میں داخل فرمایا، بے شک وہ نیکوکاروں میں سے تھے۔",
        ref: "Surah Al-Anbiya 21:85–86"
      }
    ],
    coreNarrativeEn: "Prophet Idris (AS) is praised in the Quran as 'Siddiqan Nabiyya' (a man of truth and a prophet) whom Allah raised to a high station. According to authentic Islamic scholarship, he was among the earliest prophets after Adam, calling people back to monotheism as early human communities began to stray. He is traditionally recognized in classical scholarship as having been granted profound wisdom, discipline, and being among the first to utilize writing instruments to convey knowledge. In the authentic Hadith of Al-Isra wal-Mi'raj, Prophet Muhammad ﷺ met Prophet Idris in the fourth heaven, where Idris greeted him with warm prayers as a righteous brother and prophet.",
    coreNarrativeUrdu: "قرآن مجید میں حضرت ادریس علیہ السلام کی تعریف 'صِدِّيقاً نَّبِيّاً' (نہایت سچے نبی) کے طور پر فرمائی گئی ہے جنہیں باری تعالیٰ نے بلند مقام عطا فرمایا۔ اہلِ علم کے مطابق آپ انبیائے کرام کے ابتدائی سلسلے سے تعلق رکھتے ہیں جنہوں نے انسانوں کو توحید اور نیکی کی تلقین فرمائی۔ اسلامی روایات کے مطابق آپ کو غیر معمولی حکمت و دانائی اور علمِ کتابت سے نوازا گیا تھا۔ شبِ معراج کے سفر میں رسول اللہ ﷺ کی ملاقات چوتھے آسمان پر حضرت ادریس علیہ السلام سے ہوئی جہاں آپ نے خیر مقدمی دعاؤں سے نوازا۔",
    keyLessonsEn: [
      "Steadfast adherence to absolute truth (Sidq) is the primary foundation of prophetic character.",
      "Seeking knowledge, disciplined reflection, and utilizing learning tools are ancient acts of piety.",
      "Allah elevates those who remain patiently humble in His service to high ranks in both worlds.",
      "Prophetic brotherhood transcends eras through common devotion to monotheism and righteous guidance."
    ],
    keyLessonsUrdu: [
      "سچائی (صدق) پر ثابت قدمی انبیاء اور مؤمنین کی بنیادی ترین صفت ہے۔",
      "علم، تحقیق اور فہم و فراست کا حصول عبادت اور شکر گزاری کا مظہر ہے۔",
      "جو اللہ کی رضا کے لیے عاجزی اور صبر اختیار کرتا ہے، اللہ اسے دنیا و آخرت میں بلندی عطا فرماتا ہے۔",
      "تمام انبیائے کرام کا رشتہ توحید اور اخلاص کے تحت ایک ہی مبارک سلسلے کی کڑی ہے۔"
    ],
    authenticSources: "Surah Maryam (19:56–57), Surah Al-Anbiya (21:85–86), Sahih Muslim 162 (Hadith al-Mi'raj), Tafsir Ibn Kathir"
  },
  {
    id: "nuh",
    number: 3,
    nameEn: "3. Prophet Nuh / Noah (عَلَيْهِ ٱلسَّلَامُ) — The Steadfast Caller & The Ark",
    nameUrdu: "۳. حضرت نوح علیہ السلام — صبر و استقامت کے علمبردار اور کشتی کا واقعہ",
    titleEn: "950 Years of Relentless Da'wah, Unwavering Tawheed, and Accountability",
    titleUrdu: "۹۵۰ سالہ دعوتِ توحید، صبرِ جمیل اور اعمال پر مبنی نجات",
    arabicHonorific: "شَيْخُ الْمُرْسَلِينَ عَلَيْهِ السَّلَامُ",
    isUlulAzm: true,
    quranMentionsCount: "Mentioned 43 times in the Quran, with a complete Surah bearing his name",
    keyQuranVerses: [
      {
        arabic: "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا ۝ فَلَمْ يَزِدْهُمْ دُعَائِي إِلَّا فِرَارًا",
        transEn: "He said, 'My Lord, indeed I invited my people night and day. But my invitation increased them not except in flight.'",
        transUrdu: "عرض کی: 'اے میرے رب! میں نے اپنی قوم کو رات اور دن دعوت دی۔ مگر میری پکار نے ان کے فرار ہی میں اضافہ کیا۔'",
        ref: "Surah Nuh 71:5–6"
      },
      {
        arabic: "وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ",
        transEn: "And construct the ship under Our observation and Our inspiration, and do not address Me concerning those who have wronged; indeed, they are to be drowned.",
        transUrdu: "اور ہماری نگرانی میں اور ہماری وحی کے مطابق کشتی تیار کیجیے، اور ظالموں کے بارے میں مجھ سے کوئی بات نہ کیجیے؛ وہ یقیناً غرق کیے جائیں گے۔'",
        ref: "Surah Hud 11:37"
      }
    ],
    coreNarrativeEn: "When humanity first deviated into idolatry by erecting statues to deceased righteous men (Wadd, Suwa', Yaghuth, Ya'uq, and Nasr), Allah sent Prophet Nuh (AS) as the first Messenger. For 950 years, Nuh called his people night and day, publicly and privately, pleading with them to seek Allah's forgiveness for rain, wealth, and children. The elite mocked him as a mere mortal followed only by the poor and weak. Commanded by Allah, Nuh built a massive Ark on dry land amidst widespread ridicule. When the deluge gushed from the heavens and earth, only the believers and pairs of animals aboard were saved. Even Nuh's rebellious son refused to board, claiming a mountain would protect him, proving that lineage without righteous faith cannot grant salvation.",
    coreNarrativeUrdu: "جب انسانیت نے پہلی بار بت پرستی کی راہ اپنائی اور نیک بزرگوں (ود، سواع، یغوث، یعوق اور نسر) کے مجسمے بنا کر ان کی عبادت شروع کی، تو اللہ تعالیٰ نے نوح علیہ السلام کو مبعوث فرمایا۔ آپ نے ۹۵۰ سال رات دن، تنہائی اور اجتماع میں لوگوں کو توحید کی دعوت دی اور استغفار کی برکات سنائیں۔ سردارانِ قوم نے تمسخر اڑایا اور غریب ایمان لانے والوں کی تحقیر کی۔ اللہ کے حکم سے نوح علیہ السلام نے خشکی پر دیوہیکل کشتی تیار فرمائی۔ جب زمین و آسمان سے طوفان کا پانی امڈ آیا تو کشتی والے محفوظ رہے، جبکہ نوح علیہ السلام کا نافرمان بیٹا بھی ایمان نہ لانے کی وجہ سے غرق ہوا؛ جس نے ثابت کیا کہ خاندانی نسبت ایمان کے بغیر نجات نہیں دلا سکتی۔",
    keyLessonsEn: [
      "Success in the sight of Allah is measured by unwavering sincerity and effort, not the sheer number of followers.",
      "No family connection—even being the child of a Prophet—can substitute for personal faith and obedience to Allah.",
      "Idolatry historically began through excessive veneration and visual depiction of pious people.",
      "Patience (Sabr) in da'wah requires lifelong dedication in the face of ridicule and cynicism."
    ],
    keyLessonsUrdu: [
      "اللہ کے ہاں کامیابی پیروکاروں کی تعداد میں نہیں بلکہ اخلاص اور مسلسل جدوجہد میں ہے۔",
      "کسی نبی کی اولاد ہونا بھی ذاتی ایمان اور عملِ صالح کے بغیر عذابِ الٰہی سے نہیں بچا سکتا۔",
      "بت پرستی کی تاریخی ابتداء بزرگوں کی حد سے بڑھی ہوئی تعظیم اور ان کی تصاویر و مجسمے بنانے سے ہوئی تھی۔",
      "دعوتِ دین میں تمسخر اور مخالفت کے باوجود طویل مدتی صبر اور عزم ناگزیر ہے۔"
    ],
    authenticSources: "Surah Nuh (71:1–28), Surah Hud (11:25–49), Surah Al-Ankabut (29:14), Sahih al-Bukhari 4920"
  },
  {
    id: "hud",
    number: 4,
    nameEn: "4. Prophet Hud (عَلَيْهِ ٱلسَّلَامُ) — Messenger to the People of 'Ad",
    nameUrdu: "۴. حضرت ہود علیہ السلام — قومِ عاد کی طرف مبعوث عرب پیغمبر",
    titleEn: "Confronting Materialistic Arrogance, Wealth Delusions, and Worldly Tyranny",
    titleUrdu: "مادہ پرستی اور تکبر کے خلاف دعوتِ توحید اور قومِ عاد کا انجام",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 7 times in the Quran, with Surah Hud named after him",
    keyQuranVerses: [
      {
        arabic: "وَإِلَىٰ عَادٍ أَخَاهُمْ هُودًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ أَفَلَا تَتَّقُونَ",
        transEn: "And to 'Ad [We sent] their brother Hud. He said, 'O my people, worship Allah; you have no deity other than Him. Then will you not fear Him?'",
        transUrdu: "اور قومِ عاد کی طرف ان کے بھائی ہود (علیہ السلام) کو بھیجا۔ انہوں نے فرمایا: 'اے میری قوم! اللہ کی بندگی کرو، اس کے سوا تمہارا کوئی معبود نہیں۔ تو کیا تم ڈرتے نہیں؟'",
        ref: "Surah Al-A'raf 7:65"
      },
      {
        arabic: "أَتَبْنُونَ بِكُلِّ رِيعٍ آيَةً تَعْبَثُونَ ۝ وَتَتَّخِذُونَ مَصَانِعَ لَعَلَّكُمْ تَخْلُدُونَ ۝ وَإِذَا بَطَشْتُم بَطَشْتُمْ جَبَّارِينَ",
        transEn: "Do you construct on every elevation a sign, amusing yourselves, and take for yourselves palaces and fortresses that you might abide eternally? And when you strike, you strike as tyrants.",
        transUrdu: "کیا تم ہر اونچے مقام پر بے مقصد یادگاریں بناتے ہو؟ اور ایسے مضبوط محل بناتے ہو گویا تمہیں ہمیشہ رہنا ہے؟ اور جب کسی پر ہاتھ ڈالتے ہو تو ظالمانہ گرفت کرتے ہو؟",
        ref: "Surah Ash-Shu'ara 26:128–130"
      }
    ],
    coreNarrativeEn: "Prophet Hud was sent to the mighty civilization of 'Ad who inhabited Al-Ahqaf (in southern Arabia). Blessed with colossal physical stature, lush gardens, and towering architectural monuments, 'Ad grew exceedingly arrogant, boasting: 'Who is greater than us in strength?' (Surah Fussilat 41:15). They worshipped idols and oppressed weaker neighbors. Prophet Hud reminded them that all blessings come from Allah alone and warned them against tyrannical injustice. The chieftains accused him of foolishness and madness. When they defiantly challenged him to bring forth divine punishment, Allah withheld rain and then unleashed a furious, freezing gale that blew relentlessly for seven nights and eight days, tearing down their monuments and destroying the oppressors, while Hud and the believers were safeguarded.",
    coreNarrativeUrdu: "حضرت ہود علیہ السلام قدیم عرب قومِ عاد (احقاف کے علاقے) کی طرف بھیجے گئے۔ قومِ عاد قد و قامت، بے پناہ قوت، باغات اور بلند و بالا محلات کی مالک تھی، لیکن ان نعمتوں نے انہیں شدید تکبر میں مبتلا کر دیا۔ انہوں نے کہا: 'ہم سے زیادہ طاقتور کون ہے؟' اور بتوں کی پوجا و کمزوروں پر ظلم شروع کر دیا۔ حضرت ہود نے انہیں یاد دلایا کہ یہ تمام تر طاقت اللہ کی عطا کردہ ہے، اس لیے شرک چھوڑ کر شکر گزاری اور انصاف اختیار کرو۔ قوم نے تکبر کرتے ہوئے عذاب کا مطالبہ کیا۔ چنانچہ اللہ تعالیٰ نے ان پر شدید سرد اور طوفانی آندھی مسلط فرمائی جو سات راتیں اور آٹھ دن مسلسل چلتی رہی، جس نے ان کے غرور کو خاک میں ملا دیا جبکہ ہود علیہ السلام اور اہلِ ایمان محفوظ رہے۔",
    keyLessonsEn: [
      "Physical strength, wealth, and architectural achievements are tests of stewardship, not licenses for arrogance.",
      "Oppression (Zulm) and boasting against the weak inevitably bring divine accountability.",
      "Gratitude and seeking forgiveness (Istighfar) increase sustenance and true strength.",
      "Truth does not rely on worldly force; Hud stood alone against a superpower with complete reliance on Allah."
    ],
    keyLessonsUrdu: [
      "جسمانی طاقت، مال و دولت اور بلند عمارتیں انسان کی آزمائش ہیں، تکبر کا جواز نہیں۔",
      "کمزوروں پر ظلم اور مادی طاقت پر گھمنڈ بالآخر قوموں کی بربادی کا پیش خیمہ بنتا ہے۔",
      "استغفار اور شکر گزاری سے انسان کو حقیقی برکت اور باطنی و ظاہری قوت نصیب ہوتی ہے۔",
      "حق کی دعوت کے لیے اکیلا فرد بھی اللہ کے بھروسے پر پوری متکبر قوم کے سامنے ڈٹ سکتا ہے۔"
    ],
    authenticSources: "Surah Al-A'raf (7:65–72), Surah Hud (11:50–60), Surah Ash-Shu'ara (26:123–140), Surah Al-Ahqaf (46:21–26), Surah Fussilat (41:15–16)"
  },
  {
    id: "salih",
    number: 5,
    nameEn: "5. Prophet Salih (عَلَيْهِ ٱلسَّلَامُ) — Sent to Thamud & The Miracle of the She-Camel",
    nameUrdu: "۵. حضرت صالح علیہ السلام — قومِ ثمود اور معجزاتی اونٹنی کا واقعہ",
    titleEn: "Reverence for Divine Signs, Honoring Covenants, and Consequences of Transgression",
    titleUrdu: "نشانیوں کی حرمت، بدعہدی کی ممانعت اور سرکش قوم کا انجام",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 9 times in the Holy Quran",
    keyQuranVerses: [
      {
        arabic: "وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَالِحًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ قَدْ جَاءَتْكُم بَيِّنَةٌ مِّن رَّبِّكُمْ ۖ هَٰذِهِ نَاقَةُ اللَّهِ لَكُمْ آيَةً",
        transEn: "And to Thamud [We sent] their brother Salih. He said, 'O my people, worship Allah; you have no deity other than Him. There has come to you clear evidence from your Lord. This is the she-camel of Allah [sent] to you as a sign.'",
        transUrdu: "اور ثمود کی طرف ان کے بھائی صالح (علیہ السلام) کو بھیجا۔ فرمایا: 'اے میری قوم! اللہ کی بندگی کرو، اس کے سوا تمہارا کوئی معبود نہیں۔ تمہارے پاس تمہارے رب کی واضح نشانی آ چکی ہے۔ یہ اللہ کی اونٹنی تمہارے لیے ایک نشانی ہے۔'",
        ref: "Surah Al-A'raf 7:73"
      },
      {
        arabic: "فَعَقَرُوهَا فَقَالَ تَمَتَّعُوا فِي دَارِكُمْ ثَلَاثَةَ أَيَّامٍ ۖ ذَٰلِكَ وَعْدٌ غَيْرُ مَكْذُوبٍ",
        transEn: "But they hamstrung her. So he said, 'Enjoy yourselves in your homes for three days. That is a promise that will not be denied.'",
        transUrdu: "مگر انہوں نے اس کی کوچیں کاٹ ڈالیں (قتل کر دیا)۔ تو صالح نے فرمایا: 'اپنے گھروں میں تین دن مزید فائدہ اٹھا لو؛ یہ ایسا وعدہ ہے جو جھوٹا نہ ہوگا۔'",
        ref: "Surah Hud 11:65"
      }
    ],
    coreNarrativeEn: "Prophet Salih was sent to the people of Thamud in the rocky region of Al-Hijr (Mada'in Salih). Renowned for master craftsmanship, they carved magnificent dwellings directly out of sheer rock mountains. Despite their security and luxury, they worshipped idols and spread corruption. They demanded a tangible miracle: a living she-camel to emerge from solid rock. By Allah's command, a miraculous She-Camel (Naqatullah) appeared. Salih warned them to let her graze freely and observe a water-sharing rotation: one day for the camel and one day for the townspeople. However, a gang of nine corrupt leaders plotted rebellion and brutally hamstrung and slaughtered the camel in open defiance. Salih warned them that divine retribution would strike within three days. On the morning of the fourth day, a terrifying blast (Sayhah) and seismic quake seized them, leaving them lifeless in their homes, while Salih and the believers were rescued.",
    coreNarrativeUrdu: "حضرت صالح علیہ السلام قومِ ثمود کی طرف بھیجے گئے جو الحجر کے علاقے میں سکونت پذیر تھی۔ یہ قوم چٹانوں اور پہاڑوں کو تراش کر شاندار اور پائیدار مکانات بنانے میں کمال مہارت رکھتی تھی۔ مادی خوشحالی کے باوصف وہ شرک اور اخلاقی پستی میں مبتلا تھے۔ انہوں نے مطالبہ کیا کہ پہاڑی چٹان سے ایک زندہ اونٹنی برآمد کی جائے تو وہ ایمان لائیں گے۔ اللہ تعالیٰ نے معجزاتی طور پر اونٹنی ظاہر فرمائی اور صالح علیہ السلام نے خبردار کیا کہ اسے آزادانہ چرنے دیا جائے اور کنویں کے پانی کی باری مقرر کی جائے (ایک دن اونٹنی کے لیے اور ایک دن بستی والوں کے لیے)۔ مگر قوم کے نو بدبخت سرداروں نے سرکشی کی اور اونٹنی کو قتل کر دیا۔ صالح علیہ السلام نے تین دن کی مہلت کا اعلان فرمایا۔ چوتھے دن ایک ہولناک چنگھاڑ اور زلزلے نے پوری قوم کو تہس نہس کر دیا، جبکہ صالح علیہ السلام اور مؤمنین محفوظ رہے۔",
    keyLessonsEn: [
      "Demanding miracles out of cynical arrogance increases moral liability and accelerates judgment when signs are rejected.",
      "Public resources, water rights, and environmental covenants must be treated with equity and reverence.",
      "The corruption of a small group of defiant leaders destroys an entire society if the public remains complicit in their wrongdoing.",
      "No fortress or mountain-carved palace can offer protection against divine decree."
    ],
    keyLessonsUrdu: [
      "ہٹ دھرمی کے تحت معجزات کا مطالبہ کرنا اور پھر ان کی ناقدری کرنا تباہی کا سامان بناتا ہے۔",
      "پانی اور عوامی وسائل کی منصفانہ تقسیم ایک لازمی معاشرتی اور دینی اصول ہے۔",
      "چند شرپسند سرداروں کے گناہوں پر اگر پورا معاشرہ خاموش تماشائی بنا رہے تو عذاب سب کو اپنی لپیٹ میں لے سکتا ہے۔",
      "پہاڑوں میں تراشے ہوئے مضبوط محلات بھی عذابِ الٰہی کے سامنے ریت کا ڈھیر ثابت ہوتے ہیں۔"
    ],
    authenticSources: "Surah Al-A'raf (7:73–79), Surah Hud (11:61–68), Surah Ash-Shu'ara (26:141–159), Surah Al-Qamar (54:23–31), Sahih al-Bukhari 3378"
  },
  {
    id: "ibrahim",
    number: 6,
    nameEn: "6. Prophet Ibrahim (عَلَيْهِ ٱلسَّلَامُ) — The Intimate Friend of Allah (Khalilullah)",
    nameUrdu: "۶. حضرت ابراہیم علیہ السلام — خلیل اللہ اور خلوصِ توحید کے امام",
    titleEn: "Champion of Pure Monotheism, Sublime Sacrifice, and Universal Imamah",
    titleUrdu: "بت شکنی، غیر متزلزل توحید، قربانی اور امامتِ عالم",
    arabicHonorific: "خَلِيلُ الرَّحْمَٰنِ عَلَيْهِ السَّلَامُ",
    isUlulAzm: true,
    quranMentionsCount: "Mentioned 69 times in the Quran; Surah Ibrahim bears his name",
    keyQuranVerses: [
      {
        arabic: "إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا ۖ وَمَا أَنَا مِنَ الْمُشْرِكِينَ",
        transEn: "Indeed, I have turned my face toward He who created the heavens and the earth, inclining toward truth, and I am not of those who associate partners with Allah.",
        transUrdu: "بے شک میں نے یکسو ہو کر اپنا رخ اس ذات کی طرف کر لیا جس نے آسمانوں اور زمین کو پیدا فرمایا، اور میں شرک کرنے والوں میں سے نہیں ہوں۔",
        ref: "Surah Al-An'am 6:79"
      },
      {
        arabic: "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        transEn: "And [mention] when Abraham was raising the foundations of the House and [with him] Ishmael, [saying], 'Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.'",
        transUrdu: "اور جب ابراہیم اور اسماعیل بیت اللہ کی بنیادیں اٹھا رہے تھے (تو دعا کر رہے تھے کہ) 'اے ہمارے رب! ہم سے یہ خدمت قبول فرما، بے شک تو ہی خوب سننے والا اور جاننے والا ہے۔'",
        ref: "Surah Al-Baqarah 2:127"
      }
    ],
    coreNarrativeEn: "Prophet Ibrahim (AS) is the patriarch of the monotheistic Abrahamic prophetic line. Confronting his father Azar and the Mesopotamian community who worshipped idols and celestial bodies, he used flawless rational arguments to demonstrate the absurdity of idolatry. When thrown into a colossal blazing furnace by King Nimrod, Allah decreed: 'O fire, be coolness and safety upon Ibrahim' (Surah Al-Anbiya 21:69). He migrated for the sake of Allah, was blessed in his old age with Ismail and Ishaq, and was tested with leaving infant Ismail and Hajar in the uncultivated valley of Makkah. In a further profound test, he submitted willingly to sacrifice his beloved son Ismail, upon which Allah ransomed him with an immense sacrifice. Together with Ismail, he raised the Ka'bah and instituted the eternal rites of Hajj, with Allah declaring him an Imam (leader) for humanity.",
    coreNarrativeUrdu: "حضرت ابراہیم علیہ السلام توحیدِ خالص کے عظیم علمبردار اور انبیاء کے جدِّ امجد ہیں۔ آپ نے اپنے والد آزر اور نمرود کی مشرک قوم کے سامنے توحید کے عقلی اور قطعی دلائل پیش کیے۔ جب نمرود نے آپ کو دہکتی ہوئی آگ کے الاؤ میں پھینکا تو اللہ تعالیٰ کا فرمان جاری ہوا: 'اے آگ! ابراہیم پر ٹھنڈی اور سلامتی والی بن جا'۔ آپ نے اللہ کی خاطر ہجرت کی، بڑھاپے میں حضرت اسماعیل اور حضرت اسحاق کی ولادت ہوئی۔ اللہ کے حکم پر حضرت ہاجرہ اور شیرخوار اسماعیل کو مکہ کی وادیِ غیر ذی زرع میں آباد کیا۔ خواب میں بیٹے کی قربانی کا حکم ملا تو باپ اور بیٹے دونوں نے سرِ تسلیم خم کر دیا، جس پر اللہ نے جنت سے دنبے کا فدیہ بھیجا۔ پھر دونوں نے مل کر کعبۃ اللہ کی تعمیر فرمائی اور مناسکِ حج کی بنیاد رکھی۔",
    keyLessonsEn: [
      "Tawheed demands total intellectual integrity and rejection of blind cultural imitation.",
      "True faith is proven through willingness to submit one's deepest worldly attachments to Allah's command.",
      "Complete reliance on Allah (Tawakkul) turns life's fiery trials into serenity and victory.",
      "Humility in worship: even after building the Ka'bah, Ibrahim prayed: 'Our Lord, accept this from us.'"
    ],
    keyLessonsUrdu: [
      "توحیدِ باری تعالیٰ فکری بصیرت کا تقاضا کرتی ہے اور آباؤ اجداد کی اندھی تقلید کی نفی کرتی ہے۔",
      "ایمان کی معراج یہ ہے کہ انسان اپنی محبوب ترین چیز بھی رضائے الٰہی کے لیے قربان کرنے پر راضی ہو۔",
      "اللہ پر سچا توکل آگ کے انگاروں کو بھی گلزار اور سلامتی میں تبدیل کر دیتا ہے۔",
      "عظیم سے عظیم تر نیکی کی انجام دہی کے بعد بھی عاجزی کے ساتھ اللہ سے قبولیت کی دعا مانگنی چاہیے۔"
    ],
    authenticSources: "Surah Al-Baqarah (2:124–132), Surah Al-An'am (6:74–83), Surah Al-Anbiya (21:51–71), Surah As-Saffat (37:83–113), Sahih al-Bukhari 3348"
  },
  {
    id: "lut",
    number: 7,
    nameEn: "7. Prophet Lut / Lot (عَلَيْهِ ٱلسَّلَامُ) — Caller to Moral Purity & Witness to Divine Justice",
    nameUrdu: "۷. حضرت لوط علیہ السلام — عفت و حیا کے پاسبان اور برائی کے خلاف علمِ حق",
    titleEn: "Defending Natural Fitrah, Denouncing Indecency, and Sanctity of the Home",
    titleUrdu: "فطرتِ سلیمہ کی حفاظت، بے حیائی کی مذمت اور الٰہی انصاف",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 27 times across various Surahs of the Quran",
    keyQuranVerses: [
      {
        arabic: "إِذْ قَالَ لَهُمْ أَخُوهُمْ لُوطٌ أَلَا تَتَّقُونَ ۝ إِنِّي لَكُمْ رَسُولٌ أَمِينٌ ۝ فَاتَّقُوا اللَّهَ وَأَطِيعُونِ",
        transEn: "When their brother Lot said to them, 'Will you not fear Allah? Indeed, I am to you a trustworthy messenger. So fear Allah and obey me.'",
        transUrdu: "جب ان کے بھائی لوط (علیہ السلام) نے ان سے فرمایا: 'کیا تم ڈرتے نہیں؟ بے شک میں تمہارے لیے ایک امانت دار رسول ہوں۔ پس اللہ سے ڈرو اور میری اطاعت کرو۔'",
        ref: "Surah Ash-Shu'ara 26:161–163"
      },
      {
        arabic: "فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِّن سِجِّيلٍ مَّنضُودٍ",
        transEn: "So when Our command came, We made the highest part [of the city] its lowest and rained upon them stones of hard clay, layer upon layer.",
        transUrdu: "پھر جب ہمارا حکم آپہنچا تو ہم نے اس بستی کے اوپر کے حصے کو نیچے کا حصہ بنا دیا اور اس پر پکی ہوئی مٹی کے پتھر تہہ در تہہ برسائے۔",
        ref: "Surah Hud 11:82"
      }
    ],
    coreNarrativeEn: "Prophet Lut (AS) was the nephew and contemporary of Prophet Ibrahim (AS). He migrated with Ibrahim and was commissioned by Allah to guide the towns of Sodom and Gomorrah near the Dead Sea. The inhabitants committed unprecedented public obscenities, practiced highway robbery, and openly violated moral boundaries by seeking men instead of women, corrupting human Fitrah (natural disposition). Prophet Lut pleaded with them tirelessly to fear Allah, honor family sanctity, and abandon their vile practices. Instead of heeding his admonition, they threatened to exile him, saying: 'Expel them from your city; indeed, they are people who keep themselves pure' (Surah Al-A'raf 7:82). Noble angels arrived in human form to inform Lut of the imminent decree. Lut was instructed to depart before dawn with his righteous family without looking back. His wife, who secretly abetted the transgressors, remained behind. The corrupt towns were overturned and destroyed by marked stones of baked clay, standing as an enduring historical lesson.",
    coreNarrativeUrdu: "حضرت لوط علیہ السلام حضرت ابراہیم علیہ السلام کے بھتیجے اور ان کے ساتھ ہجرت کرنے والے برگزیدہ پیغمبر تھے۔ اللہ تعالیٰ نے آپ کو سدوم اور عمورہ کی بستیوں (بحیرہ مردار کے علاقے) کی طرف مبعوث فرمایا۔ وہاں کے لوگ انسانی تاریخ میں پہلی بار کھلی بے حیائی، رہزنی اور ہم جنس پرستی کی قبیح لعنت میں مبتلا تھے جنہوں نے فطرتِ انسانی کو مسخ کر دیا تھا۔ حضرت لوط نے رات دن انہیں حیا، تقویٰ اور پاکیزگی کی دعوت دی۔ قوم نے توبہ کرنے کے بجائے آپ کو بستی سے نکالنے کی دھمکی دی اور طعنہ دیا کہ 'یہ لوگ بڑے پاکباز بنتے ہیں'۔ فرشتے خوبصورت نوجوانوں کی شکل میں تشریف لائے اور لوط علیہ السلام کو مطلع کیا کہ صبح ہوتے ہی عذاب آئے گا۔ آپ کو اپنے اہل خانہ سمیت رات کے پچھلے پہر نکل جانے کا حکم ملا۔ آپ کی بیوی جو باطن میں کافروں کی ہمدرد تھی، پیچھے رہ گئی اور بستی کو الٹ کر کنکر کے پتھر برسا کر نیست و نابود کر دیا گیا۔",
    keyLessonsEn: [
      "Moral corruption and public indecency unravel the social and spiritual fabric of civilization.",
      "Mocking purity and calling decency a fault is a symptom of extreme spiritual inversion.",
      "A believer must champion moral truth courageously even when swimming against prevailing societal currents.",
      "Spousal or familial proximity to a Prophet provides no salvation if the individual betrays faith."
    ],
    keyLessonsUrdu: [
      "بے حیائی اور اخلاقی حدود کی پامالی کسی بھی معاشرے اور تمدن کو اندر سے کھوکھلا کر دیتی ہے۔",
      "پاکدامنی کا تمسخر اڑانا اور نیکی کو عیب سمجھنا دلوں کی سیاہی اور فکری زوال کی علامت ہے۔",
      "معاشرتی دباؤ اور بے راہ روی کے طوفان کے باوجود حق اور حیا پر استقامت مؤمن کا فرض ہے۔",
      "کسی نبی کی زوجہ یا رشتہ دار ہونا بھی ذاتی ایمان اور پاکیزہ کردار کے بغیر نجات کا ذریعہ نہیں بن سکتا۔"
    ],
    authenticSources: "Surah Al-A'raf (7:80–84), Surah Hud (11:77–83), Surah Al-Hijr (15:57–77), Surah Ash-Shu'ara (26:160–175), Surah Al-Ankabut (29:28–35)"
  },
  {
    id: "ismail",
    number: 8,
    nameEn: "8. Prophet Ismail / Ishmael (عَلَيْهِ ٱلسَّلَامُ) — The Patient Son (Dhabiullah) & Co-Builder of Ka'bah",
    nameUrdu: "۸. حضرت اسماعیل علیہ السلام — ذبیح اللہ، تسلیم و رضا کے پیکر اور معمارِ کعبہ",
    titleEn: "Fulfilling Pledges, Absolute Trust in Divine Decree, and the Legacy of Makkah",
    titleUrdu: "ایفائے عہد، حکمِ الٰہی پر تسلیم و رضا اور تعمیرِ بیت اللہ",
    arabicHonorific: "ذَبِيحُ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 12 times in the Quran, honored for truthfulness to promises",
    keyQuranVerses: [
      {
        arabic: "وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَّبِيًّا ۝ وَكَانَ يَأْمُرُ أَهْلَهُ بِالصَّلَاةِ وَالزَّكَاةِ وَكَانَ عِندَ رَبِّهِ مَرْضِيًّا",
        transEn: "And mention in the Book, Ishmael. Indeed, he was true to his promise, and he was a messenger and a prophet. And he used to enjoin on his people prayer and zakah and was to his Lord pleasing.",
        transUrdu: "اور کتاب میں اسماعیل (علیہ السلام) کا ذکر کیجیے۔ بے شک وہ وعدے کے سچے تھے اور وہ رسول اور نبی تھے۔ اور وہ اپنے گھر والوں کو نماز اور زکوٰۃ کا حکم دیتے تھے اور اپنے رب کے ہاں پسندیدہ تھے۔",
        ref: "Surah Maryam 19:54–55"
      },
      {
        arabic: "فَلَمَّا بَلَغَ مَعَهُ السَّعْيَ قَالَ يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ ۚ قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ",
        transEn: "And when he reached with him [the age of] exertion, he said, 'O my son, indeed I have seen in a dream that I [must] sacrifice you, so see what you think.' He said, 'O my father, do as you are commanded. You will find me, if Allah wills, of the steadfast.'",
        transUrdu: "پھر جب وہ اس کے ساتھ دوڑ دھوپ کی عمر کو پہنچا تو ابراہیم نے فرمایا: 'اے میرے بیٹے! میں خواب میں دیکھتا ہوں کہ تمہیں ذبح کر رہا ہوں، تو دیکھ تیری کیا رائے ہے؟' عرض کی: 'اے میرے والد! وہی کیجیے جس کا آپ کو حکم دیا جا رہا ہے، آپ انشاء اللہ مجھے صبر کرنے والوں میں پائیں گے۔'",
        ref: "Surah As-Saffat 37:102"
      }
    ],
    coreNarrativeEn: "Prophet Ismail was the firstborn son of Prophet Ibrahim through Lady Hajar. As an infant, he and his mother were left in the barren, uncultivated desert of Makkah according to divine instruction. When their provisions depleted and Hajar ran anxiously between As-Safa and Al-Marwah seeking water, Allah caused the blessed miraculous well of Zamzam to spring beneath Ismail's heels. Growing into a noble young man, Ismail was informed by his father of the divine vision commanding his sacrifice. Without a moment's hesitation, Ismail exemplified absolute submission, urging his father to fulfill Allah's command. Allah accepted their profound submission, replaced the sacrifice with a magnificent ram from Paradise, and memorialized this event in the annual Eid al-Adha sacrifice. Later, Ismail joined Ibrahim in raising the foundations of the Ka'bah and inviting mankind to Hajj, becoming the ancestor of the Adnani Arabs and Prophet Muhammad ﷺ.",
    coreNarrativeUrdu: "حضرت اسماعیل علیہ السلام حضرت ابراہیم علیہ السلام اور حضرت ہاجرہ کے فرزندِ ارجمند تھے۔ شیرخوارگی کے عالم میں حکمِ الٰہی کے تحت آپ کو مکہ کی بے آب و گیاہ وادی میں بسایا گیا۔ جب پانی ختم ہو گیا اور حضرت ہاجرہ نے صفا و مروہ کے درمیان اضطراب میں دوڑ لگائی تو معصوم اسماعیل کے قدموں کے نیچے سے زمزم کا مبارک چشمہ جاری ہوا۔ جب آپ دوڑ دھوپ کی عمر کو پہنچے تو والد ماجد نے خواب سنایا۔ اسماعیل علیہ السلام نے کمالِ اطاعت سے فرمایا: 'اے ابا جان! وہی کیجیے جس کا حکم ملا ہے، آپ مجھے صابر پائیں گے'۔ اللہ نے اس عظیم تسلیم و رضا کو قبول فرما کر جنت سے دنبے کا فدیہ اتارا جس کی یاد میں مسلمان ہر سال قربانی کرتے ہیں۔ آپ نے اپنے والد کے ساتھ مل کر بیت اللہ کی تعمیر فرمائی اور آپ ہی کی نسل سے خاتم النبیین حضرت محمد ﷺ مبعوث ہوئے۔",
    keyLessonsEn: [
      "Absolute obedience to Allah's decree purifies the soul and turns severe sacrifice into enduring honor.",
      "Keeping promises (Sidq al-Wa'd) and family leadership in prayer and charity are pillars of prophetic legacy.",
      "Maternal faith and sacrifice (symbolized by Hajar's Sa'i) are eternally enshrined in the rituals of Islam.",
      "Selfless teamwork between generations in building spiritual sanctuaries earns perpetual rewards."
    ],
    keyLessonsUrdu: [
      "حکمِ الٰہی کے سامنے سرِ تسلیم خم کر دینا انسان کو دنیا و آخرت کی لازوال عزت بخشتا ہے۔",
      "وعدے کا پکا ہونا اور اپنے اہل و عیال کو نماز و زکوٰۃ کی تلقین کرنا مؤمن کی اولین ذمہ داری ہے۔",
      "ایک باہمت ماں (حضرت ہاجرہ) کی قربانی اور توکل کو اللہ نے دینِ اسلام کے دائمی شعائر میں شامل فرما دیا۔",
      "نیک مقاصد اور مساجد کی خدمت میں نئی اور پرانی نسل کا باہمی تعاون صدقۂ جاریہ ہے۔"
    ],
    authenticSources: "Surah As-Saffat (37:101–109), Surah Maryam (19:54–55), Surah Al-Baqarah (2:125–129), Sahih al-Bukhari 3364"
  },
  {
    id: "ishaq",
    number: 9,
    nameEn: "9. Prophet Ishaq / Isaac (عَلَيْهِ ٱلسَّلَامُ) — Forefather of the Israelite Prophets",
    nameUrdu: "۹. حضرت اسحاق علیہ السلام — انبیائے بنی اسرائیل کے جد اور صاحبِ بصیرت پیغمبر",
    titleEn: "Good Tidings of Righteous Offspring, Devotion, and Steadfast Wisdom",
    titleUrdu: "بشارتِ الٰہی، عدل و انصاف اور نسلِ صالح کی تربیت",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 17 times in the Quran alongside other illustrious prophets",
    keyQuranVerses: [
      {
        arabic: "وَبَشَّرْنَاهُ بِإِسْحَاقَ نَبِيًّا مِّنَ الصَّالِحِينَ ۝ وَبَارَكْنَا عَلَيْهِ وَعَلَىٰ إِسْحَاقَ ۚ وَمِن ذُرِّيَّتِهِمَا مُحْسِنٌ وَظَالِمٌ لِّنَفْسِهِ مُبِينٌ",
        transEn: "And We gave him good tidings of Isaac, a prophet from among the righteous. And We blessed him and Isaac. But among their descendants is the doer of good and the clearly unjust to himself.",
        transUrdu: "اور ہم نے ابراہیم کو اسحاق کی بشارت دی جو نیکوکاروں میں سے ایک نبی تھے۔ اور ہم نے ابراہیم پر اور اسحاق پر برکتیں نازل فرمائیں، اور ان دونوں کی اولاد میں سے نیکوکار بھی ہیں اور اپنی جان پر کھلا ظلم کرنے والے بھی۔",
        ref: "Surah As-Saffat 37:112–113"
      },
      {
        arabic: "وَاذْكُرْ عِبَادَنَا إِبْرَاهِيمَ وَإِسْحَاقَ وَيَعْقُوبَ أُولِي الْأَيْدِي وَالْأَبْصَارِ",
        transEn: "And remember Our servants, Abraham, Isaac and Jacob, those of strength and vision.",
        transUrdu: "اور ہمارے بندوں ابراہیم، اسحاق اور یعقوب کو یاد کیجیے، جو بڑی قوت (عمل) اور گہری بصیرت والے تھے۔",
        ref: "Surah Sad 38:45"
      }
    ],
    coreNarrativeEn: "Prophet Ishaq (AS) was born to Sarah and Prophet Ibrahim (AS) in their elderly years as a divine miracle and glad tiding delivered by angelic visitors. The Quran emphasizes his station as a righteous prophet endowed with knowledge, wisdom, spiritual resolve, and moral discernment. Ishaq lived in Canaan, carrying forward the monotheistic teachings of his father Ibrahim, preaching justice, and maintaining the sanctuary of prayer. He married and was blessed with twin sons, including Prophet Ya'qub (Jacob / Israel). Through Ishaq and Ya'qub flowed the extensive line of Israelite prophets, including Yusuf, Musa, Dawud, Sulayman, and Isa (peace be upon them all). The Quran praises Ishaq as possessing both 'Al-Aydi' (strength in righteous deeds) and 'Al-Absar' (penetrating spiritual vision).",
    coreNarrativeUrdu: "حضرت اسحاق علیہ السلام حضرت سارہ اور حضرت ابراہیم علیہ السلام کے ہاں بڑھاپے کے دور میں فرشتوں کی دی ہوئی خوشخبری کے نتیجے میں پیدا ہوئے۔ قرآن مجید نے آپ کو 'نَبِيّاً مِّنَ الصَّالِحِينَ' (نیکوکار نبی) اور 'اولوالايدي والابصار' (قوتِ عمل اور بصیرت کے حامل) فرما کر خراجِ تحسین پیش کیا۔ آپ نے کنعان کے خطے میں اپنے والدِ گرامی کی توحیدی دعوت کو آگے بڑھایا، عدل قائم کیا اور لوگوں کو اللہ کی شریعت کی تعلیم دی۔ آپ کے صاحبزادے حضرت یعقوب علیہ السلام (اسرائیل) ہوئے جن کے ذریعے انبیائے بنی اسرائیل کا عظیم سلسلہ چلا۔ قرآن کریم نے یہ حقیقت بھی واضح فرمائی کہ کسی جلیل القدر نبی کی اولاد میں برکت کے باوجود وہی شخص کامیاب ہوگا جو ذاتی طور پر نیکوکار ہو، نہ کہ اپنی جان پر ظلم کرنے والا۔",
    keyLessonsEn: [
      "Allah's promises of blessing and provision arrive in His perfect timing, even when circumstances seem medically or physically impossible.",
      "Spiritual greatness is paired with actionable piety ('Al-Aydi') and deep moral clarity ('Al-Absar').",
      "Lineage offers no unconditional guarantee; every generation is held accountable for its own righteousness.",
      "The continuity of prophetic wisdom across family generations requires deliberate moral and spiritual nurturing."
    ],
    keyLessonsUrdu: [
      "اللہ تعالیٰ کے فضل اور رحمت کی کوئی حد نہیں؛ بظاہر ناممکن نظر آنے والے حالات میں بھی اللہ اولاد اور برکت عطا فرماتا ہے۔",
      "دین داری صرف نظریات کا نام نہیں بلکہ عمل کی طاقت اور باطنی بصیرت کا حسین امتزاج ہے۔",
      "خاندانی شرافت انسان کے ذاتی اعمال کا بدل نہیں ہو سکتی؛ ہر فرد اپنے اعمال کا خود جوابدہ ہے۔",
      "نسلوں میں دین اور اخلاق کی بقا کے لیے والدین کا باعمل نمونہ اور تربیت بنیادی کردار ادا کرتی ہے۔"
    ],
    authenticSources: "Surah Hud (11:71–73), Surah As-Saffat (37:112–113), Surah Sad (38:45–47), Surah Maryam (19:49–50)"
  },
  {
    id: "yaqub",
    number: 10,
    nameEn: "10. Prophet Ya'qub / Jacob (عَلَيْهِ ٱلسَّلَامُ) — The Embodiment of Beautiful Patience (Sabrun Jameel)",
    nameUrdu: "۱۰. حضرت یعقوب علیہ السلام — صبرِ جمیل کے پیکر اور اولاد کو وصیتِ توحید",
    titleEn: "Grief Without Bitterness, Unshakeable Hope in Allah, and Fatherly Legacy",
    titleUrdu: "صبرِ جمیل، رحمتِ الٰہی سے کبھی ناامید نہ ہونا اور وصیتِ ایمان",
    arabicHonorific: "إِسْرَائِيلُ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 16 times in the Quran, also referred to as Isra'il",
    keyQuranVerses: [
      {
        arabic: "قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ وَأَعْلَمُ مِنَ اللَّهِ مَا لَا تَعْلَمُونَ",
        transEn: "He said, 'I only complain of my suffering and my grief to Allah, and I know from Allah that which you do not know.'",
        transUrdu: "فرمایا: 'میں تو اپنی پریشانی اور اپنے غم کی فریاد صرف اللہ ہی کے حضور کرتا ہوں، اور میں اللہ کی طرف سے وہ باتیں جانتا ہوں جو تم نہیں جانتے۔'",
        ref: "Surah Yusuf 12:86"
      },
      {
        arabic: "أَمْ كُنتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِن بَعْدِي قَالُوا نَعْبُدُ إِلَٰهَكَ وَإِلَٰهَ آبَائِكَ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ إِلَٰهًا وَاحِدًا وَنَحْنُ لَهُ مُسْلِمُونَ",
        transEn: "Or were you witnesses when death approached Jacob, when he said to his sons, 'What will you worship after me?' They said, 'We will worship your God and the God of your fathers, Abraham and Ishmael and Isaac — one God. And we are Muslims [in submission] to Him.'",
        transUrdu: "کیا تم اس وقت موجود تھے جب یعقوب کی وفات کا وقت آیا؟ جب انہوں نے اپنے بیٹوں سے فرمایا: 'تم میرے بعد کس کی عبادت کرو گے؟' انہوں نے عرض کی: 'ہم آپ کے معبود اور آپ کے آباؤ اجداد ابراہیم، اسماعیل اور اسحاق کے معبود کی عبادت کریں گے جو یکتا معبود ہے اور ہم اسی کے فرمانبردار ہیں'۔",
        ref: "Surah Al-Baqarah 2:133"
      }
    ],
    coreNarrativeEn: "Prophet Ya'qub (also titled Isra'il, meaning 'Servant of Allah') was the son of Prophet Ishaq and grandson of Prophet Ibrahim. He had twelve sons who became the ancestors of the Twelve Tribes of Israel. When his beloved son Yusuf was taken away by envious brothers who brought back a bloodstained shirt claiming a wolf ate him, Ya'qub refused to give way to vengeful despair, declaring: 'Sabrun Jameel' (Beautiful patience, and Allah is the one sought for help). He wept until his sight faded from sorrow, yet he consistently rebuked despair, commanding his sons never to despair of the mercy of Allah. Decades later, his faith was rewarded when Yusuf was revealed as governor of Egypt and the family was joyfully reunited, with Ya'qub's eyesight restored by Yusuf's shirt. On his deathbed, Ya'qub gathered all his sons to extract their solemn covenant to adhere exclusively to the monotheism of Ibrahim, Ismail, and Ishaq.",
    coreNarrativeUrdu: "حضرت یعقوب علیہ السلام (جن کا لقب اسرائیل تھا) حضرت اسحاق کے فرزند اور حضرت ابراہیم کے پوتے تھے۔ آپ کے بارہ فرزند تھے جن سے بنی اسرائیل کے بارہ قبیلے وجود میں آئے۔ جب حسد کی بنا پر ان کے بیٹوں نے معصوم یوسف کو کنویں میں پھینک دیا اور خون آلود قمیص لا کر کہا کہ بھیڑیا کھا گیا ہے، تو یعقوب علیہ السلام نے غصے اور بے صبری کے بجائے 'فَصَبْرٌ جَمِيلٌ' (پس صبر ہی بہتر ہے) فرما کر معاملہ اللہ کے سپرد کر دیا۔ مسلسل غم سے آپ کی بینائی چلی گئی، لیکن آپ نے کبھی شکوہ نہیں کیا اور فرمایا کہ میں اپنا دکھ صرف اللہ کے سامنے رکھتا ہوں اور اللہ کی رحمت سے ناامید ہونا کافروں کا شیوہ ہے۔ دہائیوں بعد اللہ نے ان کا صبر رنگ لایا، یوسف علیہ السلام مصر کے فرمانروا بنے، بینائی لوٹ آئی اور سارا خاندان سجدۂ شکر میں جھک گیا۔ وفات کے وقت آپ نے تمام بیٹوں سے توحید پر قائم رہنے کا عہد لیا۔",
    keyLessonsEn: [
      "Grief and sorrow are natural human emotions; 'Sabrun Jameel' means mourning without uttering words of discontent or ingratitude toward Allah.",
      "Directing complaints exclusively to Allah protects the believer from bitterness and reliance on creation.",
      "Despairing of Allah's mercy ('Rawh Allah') is prohibited; relief (Faraj) arrives when reliance is absolute.",
      "The paramount parental concern on one's deathbed is the preservation of faith and creed in one's children."
    ],
    keyLessonsUrdu: [
      "دکھ اور آنسو فطری انسانی جذبات ہیں؛ 'صبرِ جمیل' کا مطلب یہ ہے کہ انسان زبان سے ناشکری یا شکوے کا کوئی لفظ نہ نکالے۔",
      "اپنے دکھ اور تکلیف کا شکوہ صرف اپنے خالق کے سامنے کرنا انسان کو مخلوق کی محتاجی اور مایوسی سے بچاتا ہے۔",
      "اللہ کی رحمت سے ناامید ہونا مؤمن کے شایانِ شان نہیں؛ تنگی کے بعد کشادگی کا آنا یقینی ہے۔",
      "والدین کی سب سے بڑی اور آخری فکر یہ ہونی چاہیے کہ ان کی اولاد مرتے دم تک توحید اور نماز پر قائم رہے۔"
    ],
    authenticSources: "Surah Yusuf (12:1–101), Surah Al-Baqarah (2:132–133), Surah Ali 'Imran (3:93), Tafsir Ibn Kathir"
  },
  {
    id: "yusuf",
    number: 11,
    nameEn: "11. Prophet Yusuf / Joseph (عَلَيْهِ ٱلسَّلَامُ) — The Beautiful Soul & The Best of Stories",
    nameUrdu: "۱۱. حضرت یوسف علیہ السلام — حُسنِ سیرت و صورت اور احسن القصص کے ہیرو",
    titleEn: "Triumph Over Betrayal, Moral Purity Under Temptation, and Magnanimous Forgiveness",
    titleUrdu: "آزمائشوں میں پاکدامنی، تدبیر و بصیرت اور عفو و درگزر کی معراج",
    arabicHonorific: "الصِّدِّيقُ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 27 times, with an entire 111-verse Surah dedicated to his life",
    keyQuranVerses: [
      {
        arabic: "قَالَ مَعَاذَ اللَّهِ ۖ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ ۖ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ",
        transEn: "He said, '[I seek] the refuge of Allah. Indeed, he is my master, who has made good my residence. Indeed, wrongdoers will not succeed.'",
        transUrdu: "انہوں نے فرمایا: 'اللہ کی پناہ! وہ میرا پروردگار (یا محسن آقا) ہے جس نے مجھے اچھا ٹھکانہ دیا، بے شک ظالم کبھی فلاح نہیں پاتے۔'",
        ref: "Surah Yusuf 12:23"
      },
      {
        arabic: "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ",
        transEn: "He said, 'No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful.'",
        transUrdu: "انہوں نے فرمایا: 'آج کے دن تم پر کوئی ملامت نہیں، اللہ تمہیں معاف فرمائے اور وہ سب رحم کرنے والوں سے بڑھ کر رحم فرمانے والا ہے۔'",
        ref: "Surah Yusuf 12:92"
      }
    ],
    coreNarrativeEn: "Prophet Yusuf (AS), described by Prophet Muhammad ﷺ as 'The noble, son of the noble, son of the noble, son of the noble: Yusuf, son of Ya'qub, son of Ishaq, son of Ibrahim' (Sahih al-Bukhari 3353). Cast into a dark well by jealous brothers, rescued by a caravan, and sold as a servant in Egypt to the Aziz. When the wife of the Aziz attempted to seduce him behind locked doors, Yusuf sought Allah's protection and fled, choosing imprisonment over moral degradation. In prison, he interpreted the dreams of inmates and called them to monotheism. Years later, he interpreted Pharaoh's dream foreseeing seven years of abundant harvests followed by seven years of catastrophic drought. Vindicated of all false accusations, Yusuf was appointed treasurer and custodian of Egypt's granaries. Through meticulous economic planning, he saved the entire region from starvation. When his brothers arrived in desperation for grain, rather than seeking revenge, he revealed his identity and pardoned them completely.",
    coreNarrativeUrdu: "حضرت یوسف علیہ السلام کو رسول اللہ ﷺ نے 'الکریم بن الکریم بن الکریم بن الکریم' (معزز، معزز کے بیٹے، معزز کے پوتے، معزز کے پڑپوتے) کا شاندار لقب عطا فرمایا۔ سوتیلے بھائیوں نے حسد کی بنا پر گہرے کنویں میں پھینک دیا، قافلے نے نکال کر مصر کے بازار میں اونے پونے داموں عزیزِ مصر کے ہاتھ بیچ دیا۔ جوانی میں جب عزیز کی بیوی نے بند دروازوں میں گناہ کی دعوت دی تو یوسف علیہ السلام نے 'مَعَاذَ اللَّهِ' کہہ کر پاکدامنی کی حفاظت کی اور گناہ کے مقابلے میں قید خانے کو ترجیح دی۔ جیل میں توحید کی دعوت دی اور قیدیوں کے خوابوں کی سچی تعبیر بتائی۔ جب بادشاہ نے سات فربہ اور سات لاغر گایوں کا خواب دیکھا تو یوسف علیہ السلام نے زراعت اور غلے کی بچت کا ۱۴ سالہ معاشی منصوبہ پیش کیا۔ بے گناہ ثابت ہونے پر آپ کو مصر کا وزیرِ خزانہ بنایا گیا اور آپ نے حسنِ تدبیر سے پورے خطے کو قحط سے بچایا۔ جب وہی ظالم بھائی اناج کے لیے سامنے آئے تو آپ نے انتقام لینے کے بجائے فرمایا: 'آج تم پر کوئی گرفت نہیں، اللہ تمہیں معاف کرے'۔",
    keyLessonsEn: [
      "Moral integrity and fear of Allah (Taqwa) in private are rewarded with divine honor in public.",
      "Trials change forms: Yusuf was tested by physical peril in the well, sexual temptation in the palace, and isolation in prison, passing every test with patience.",
      "Competence, economic honesty, and organizational planning are essential prophetic traits for societal governance.",
      "True greatness lies in the capacity to pardon completely when one possesses the absolute power to retaliate."
    ],
    keyLessonsUrdu: [
      "تنہائی میں پاکدامنی اور خوفِ خدا انسان کو دنیا و آخرت میں عزت و سرفرازی عطا کرتا ہے۔",
      "آزمائشیں بدلتی رہتی ہیں: کنویں کی تنہائی، محل کی شہوانی آزمائش اور قید خانے کی صعوبت؛ ہر موڑ پر صبر ہی کامیابی کی کنجی ہے۔",
      "دیانت داری، معاشی فراست اور دانشمندانہ منصوبہ بندی ایک اچھے مسلمان اور حکمران کا شعار ہے۔",
      "انتقام لینے کی مکمل قدرت رکھنے کے باوجود معاف کر دینا اور احسان کا معاملہ کرنا اخلاق کی معراج ہے۔"
    ],
    authenticSources: "Surah Yusuf (12:1–111), Sahih al-Bukhari 3353, Sahih Muslim 162"
  },
  {
    id: "ayyub",
    number: 12,
    nameEn: "12. Prophet Ayyub / Job (عَلَيْهِ ٱلسَّلَامُ) — The Paragon of Patience and Gratitude in Adversity",
    nameUrdu: "۱۲. حضرت ایوب علیہ السلام — صبر و شکر کے بے مثال نمونہ اور شفائے ربانی",
    titleEn: "Unshaken Devotion Through Chronic Illness, Loss of Wealth, and Healing Supplication",
    titleUrdu: "شدید بیماری اور آزمائش میں صبرِ کامل، زبان پر ذکرِ الٰہی اور قبولیتِ دعا",
    arabicHonorific: "نَبِيُّ اللَّهِ الصَّابِرُ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 4 times in the Quran, universally hailed as the standard of Sabr",
    keyQuranVerses: [
      {
        arabic: "وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ ۝ فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَابِدِينَ",
        transEn: "And [mention] Job, when he called to his Lord, 'Indeed, adversity has touched me, and You are the Most Merciful of the merciful.' So We responded to him and removed what afflicted him of adversity. And We gave him [back] his family and the like thereof with them as mercy from Us and a reminder for the worshippers.",
        transUrdu: "اور ایوب (علیہ السلام کا ذکر کیجیے) جب انہوں نے اپنے رب کو پکارا کہ 'مجھے تکلیف پہنچی ہے اور تو سب رحم کرنے والوں سے بڑھ کر رحم فرمانے والا ہے'۔ تو ہم نے ان کی دعا قبول فرمائی اور ان کی تکلیف دور کر دی، اور ہم نے ان کے گھر والے اور ان کے ساتھ اتنے ہی اور اپنی رحمت سے عطا فرمائے اور عبادت گزاروں کے لیے نصیحت بنا دیا۔",
        ref: "Surah Al-Anbiya 21:83–84"
      },
      {
        arabic: "إِنَّا وَجَدْنَاهُ صَابِرًا ۚ نِّعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ",
        transEn: "Indeed, We found him patient, an excellent servant. Indeed, he was one repeatedly turning back [to Allah].",
        transUrdu: "بے شک ہم نے انہیں صابر پایا؛ کیا ہی اچھے بندے تھے، یقیناً وہ بار بار (اللہ کی طرف) رجوع کرنے والے تھے۔",
        ref: "Surah Sad 38:44"
      }
    ],
    coreNarrativeEn: "Prophet Ayyub (AS) was initially blessed by Allah with immense wealth, vast lands, livestock, multiple children, and vibrant physical health. Allah tested him by removing these blessings one by one: his wealth perished, his children passed away, and a severe, agonizing physical illness struck his body for many long years. All former acquaintances abandoned him except his faithful, loving wife who served him patiently. Throughout this grueling ordeal, Ayyub never uttered a word of despair, complaint, or anger against Allah; his tongue remained constantly moistened with dhikr and praise. When he finally supplicated, he phrased it with breathtaking modesty: 'Adversity has touched me, and You are the Most Merciful of the merciful.' Allah commanded him to strike the ground with his foot. A cool miraculous spring surged forth; washing and drinking from it instantly cured his internal and external ailments. Allah restored his youth, doubled his family, showered golden locusts upon him, and honored him in the Quran as 'Ni'mal 'Abd' (An excellent servant).",
    coreNarrativeUrdu: "حضرت ایوب علیہ السلام کو اللہ تعالیٰ نے ابتدا میں فراخ رزق، مال و مویشی، وسیع باغات، صحت مند اولاد اور شاندار تندرستی عطا فرمائی تھی۔ پھر اللہ تعالیٰ نے آزمائش ڈالی: دولت رخصت ہو گئی، اولاد یکے بعد دیگرے وفات پا گئی، اور ایک طویل، تکلیف دہ بیماری نے آپ کو گھیر لیا۔ زمانے کے تمام لوگ چھوڑ گئے سوائے آپ کی وفادار اور صابرہ زوجہ محترمہ کے جنہوں نے مسلسل خدمت کی۔ ان تمام سالوں میں ایوب علیہ السلام نے کبھی حرفِ شکایت زبان پر نہ لایا، بلکہ ان کا دل اور زبان ہر لمحہ حمد و شکر میں مصروف رہے۔ جب التجا کی تو انتہائی باادب انداز میں فرمایا: 'مجھے تکلیف پہنچی ہے اور تو ارحم الراحمین ہے'۔ اللہ نے حکم دیا کہ اپنا پاؤں زمین پر ماریں۔ زمین سے ٹھنڈے اور شفا بخش پانی کا چشمہ ابل پڑا جس سے نہاتے اور پیتے ہی باطنی و ظاہری تمام بیماریاں کافور ہو گئیں۔ اللہ نے آپ کی صحت بحال فرمائی، دگنی دولت اور اولاد عطا فرمائی اور قرآن مجید میں فرمایا: 'ہم نے انہیں صابر پایا، کیا ہی بہترین بندے تھے جو رجوع کرنے والے تھے'۔",
    keyLessonsEn: [
      "Physical suffering or material loss is not evidence of Allah's anger; it is often a crucible through which prophetic ranks are elevated.",
      "True Sabr is accompanied by gratitude, remembering decades of prior ease when undergoing periods of difficulty.",
      "The etiquette of Du'a during hardship: describe one's helplessness with reverence and praise Allah's mercy without demanding.",
      "Loyalty and compassion in marriage shine brightest during seasons of poverty and illness."
    ],
    keyLessonsUrdu: [
      "بیماری یا مالی نقصان لازمی طور پر عذاب نہیں ہوتا بلکہ اللہ کے مقرب بندوں کے درجات کی بلندی کا ذریعہ ہوتا ہے۔",
      "صبر کا تقاضا یہ ہے کہ انسان برسوں کی صحت اور نعمتوں کو یاد رکھے اور چند سال کی تکلیف پر ناشکری نہ کرے۔",
      "دعا کے آداب: مصیبت کے وقت اللہ کی بارگاہ میں اپنے عجز کا اعتراف ادب کے ساتھ کرنا اور رحمت کی امید رکھنا۔",
      "غربت اور شدید بیماری کے وقت شریکِ حیات کی وفاداری اور خدمت گزاری دنیا کا سب سے انمول سرمایہ ہے۔"
    ],
    authenticSources: "Surah Al-Anbiya (21:83–84), Surah Sad (38:41–44), Sahih al-Bukhari 279, 3391"
  },
  {
    id: "shuayb",
    number: 13,
    nameEn: "13. Prophet Shu'ayb / Jethro (عَلَيْهِ ٱلسَّلَامُ) — Champion of Economic Justice & The Orator of Prophets",
    nameUrdu: "۱۳. حضرت شعیب علیہ السلام — خطیب الانبیاء اور معاشی عدل و انصاف کے علمبردار",
    titleEn: "Honest Weighing, Ending Commercial Fraud, and Economic Ethics in Religion",
    titleUrdu: "ناپ تول میں کمی کی ممانعت، کاروباری دیانت اور اصلاحِ معاشرہ",
    arabicHonorific: "خَطِيبُ الْأَنبِيَاءِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 11 times in the Quran; sent to Madyan and Ashab al-Aykah",
    keyQuranVerses: [
      {
        arabic: "وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَٰهٍ غَيْرُهُ ۖ وَلَا تَنقُصُوا الْمِكْيَالَ وَالْمِيزَانَ ۚ إِنِّي أَرَاكُم بِخَيْرٍ وَإِنِّي أَخَافُ عَلَيْكُمْ عَذَابَ يَوْمٍ مُّحِيطٍ",
        transEn: "And to Madyan [We sent] their brother Shu'ayb. He said, 'O my people, worship Allah; you have no deity other than Him. And do not decrease from the measure and the scale. Indeed, I see you in prosperity, but indeed, I fear for you the punishment of an all-encompassing Day.'",
        transUrdu: "اور مدین کی طرف ان کے بھائی شعیب کو بھیجا۔ انہوں نے فرمایا: 'اے میری قوم! اللہ کی عبادت کرو، اس کے سوا تمہارا کوئی معبود نہیں۔ اور ناپ اور تول میں کمی نہ کرو۔ بے شک میں تمہیں خوشحال دیکھ رہا ہوں، اور مجھے تم پر ایک گھیر لینے والے دن کے عذاب کا خوف ہے۔'",
        ref: "Surah Hud 11:84"
      },
      {
        arabic: "قَالُوا يَا شُعَيْبُ أَصَلَاتُكَ تَأْمُرُكَ أَن نَّتْرُكَ مَا يَعْبُدُ آبَاؤُنَا أَوْ أَن نَّفْعَلَ فِي أَمْوَالِنَا مَا نَشَاءُ ۖ إِنَّكَ لَأَنتَ الْحَلِيمُ الرَّشِيدُ",
        transEn: "They said, 'O Shu'ayb, does your prayer command you that we should leave what our fathers worship or not do with our wealth what we please? Indeed, you are the forbearing, the discerning!'",
        transUrdu: "انہوں نے کہا: 'اے شعیب! کیا تمہاری نماز تمہیں یہ سکھاتی ہے کہ ہم ان معبودوں کو چھوڑ دیں جنہیں ہمارے باپ دادا پوجتے تھے، یا یہ کہ ہم اپنے مال میں اپنی مرضی کے مطابق تصرف نہ کریں؟ بے شک تم ہی تو بڑے بردبار اور سمجھدار ہو!'",
        ref: "Surah Hud 11:87"
      }
    ],
    coreNarrativeEn: "Prophet Shu'ayb (AS) is traditionally referred to by scholars as 'Khatib al-Anbiya' (The Orator of the Prophets) because of his eloquent speech, deep arguments, and warm compassionate da'wah. He was sent to the commercial hub of Madyan and the people of Al-Aykah (the lush forest dwellers near the Red Sea). Alongside polytheism, their society was plagued by severe commercial corruption: tampering with weights and balances, cheating customers, highway robbery, and justifying dishonesty under the pretext of economic freedom. Shu'ayb reasoned with them that worship is indivisible from honest marketplace ethics: 'That which remains with you from Allah [of lawful profit] is better for you, if you are believers' (Surah Hud 11:86). The proud merchants mocked his prayers, asking whether religion had any right to dictate how they manage their money. When they threatened to stone him, Allah seized them with a deafening earthquake, a day of shadow and fire (Yawm az-Zullah), and a seismic blast that annihilated their towns, while Shu'ayb and the believers were saved.",
    coreNarrativeUrdu: "حضرت شعیب علیہ السلام کو ان کی فصاحت و بلاغت اور دلنشین استدلال کی وجہ سے 'خطیب الانبیاء' کہا جاتا ہے۔ آپ اہل مدین اور اصحابِ ایکہ کی طرف بھیجے گئے جو تجارتی شاہراہ پر آباد تھے۔ وہ شرک کے ساتھ ساتھ ناپ تول میں ڈنڈی مارنے، ملاوٹ کرنے، خریداروں کے حقوق غصب کرنے اور راستوں میں راہزنی کرنے کے عادی تھے۔ حضرت شعیب نے سمجھایا کہ دین صرف عبادت گاہ تک محدود نہیں بلکہ بازار اور معیشت بھی اللہ کے احکام کے پابند ہیں۔ حلال کا تھوڑا نفع حرام کے انبار سے ہزار درجہ بہتر ہے۔ تاجروں نے مذاق اڑاتے ہوئے کہا: 'کیا تمہاری نماز تمہیں یہ سکھاتی ہے کہ ہم اپنے پیسوں کے ساتھ جو چاہیں نہ کریں؟' جب قوم نے دھمکیاں دیں اور سرکشی کی انتہا کر دی، تو اللہ تعالیٰ نے زلزلے، کڑک اور بادل کے عذاب (یوم الظلہ) سے پوری قوم کو ہلاک کر دیا، جبکہ شعیب علیہ السلام اور اہلِ ایمان محفوظ رہے۔",
    keyLessonsEn: [
      "Islam does not separate spiritual worship (Salah) from ethical business practices, honest contracts, and consumer rights.",
      "Cheating in weights, hoarding, deception in sales, and exploitative profits corrupt societal trust and invite divine wrath.",
      "Lawful earnings (Halal), even if modest, possess divine barakah far exceeding unjust accumulated wealth.",
      "Preaching must combine clarity, respectful persuasion, and unwavering courage in condemning systemic corruption."
    ],
    keyLessonsUrdu: [
      "اسلام میں نماز اور عبادت کا تعلق مارکیٹ، لین دین اور تجارتی دیانت داری سے اٹوٹ ہے۔",
      "ناپ تول میں کمی کرنا، اشیاء کے عیب چھپانا اور دھوکے سے منافع کمانا برکت کو ختم کرتا ہے اور معاشرے میں بے اعتمادی پھیلاتا ہے۔",
      "حلال کی تھوڑی کمائی بھی اللہ کی برکت سے مالا مال ہوتی ہے، جبکہ حرام کے انبار تباہی لاتے ہیں۔",
      "اصلاحِ معاشرہ کے لیے دلائل کی فصاحت کے ساتھ ساتھ برائی کے خلاف جرات مندانہ موقف ضروری ہے۔"
    ],
    authenticSources: "Surah Al-A'raf (7:85–93), Surah Hud (11:84–95), Surah Ash-Shu'ara (26:176–191), Surah Al-Ankabut (29:36–37)"
  },
  {
    id: "musa",
    number: 14,
    nameEn: "14. Prophet Musa / Moses (عَلَيْهِ ٱلسَّلَامُ) — The One Spoken to by Allah (Kalimullah)",
    nameUrdu: "۱۴. حضرت موسیٰ علیہ السلام — کلیم اللہ، فرعون کے مقابل حق کا علم اور تورات کے امین",
    titleEn: "Liberation from Tyranny, Courage Before Oppression, and Lawgiving at Sinai",
    titleUrdu: "فرعونیت کا خاتمہ، بنی اسرائیل کی آزادی اور کوہِ طور پر کلامِ الٰہی",
    arabicHonorific: "كَلِيمُ اللَّهِ عَلَيْهِ السَّلَامُ",
    isUlulAzm: true,
    quranMentionsCount: "The most frequently mentioned prophet: 136 times across 34 Surahs",
    keyQuranVerses: [
      {
        arabic: "إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي",
        transEn: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.",
        transUrdu: "بے شک میں ہی اللہ ہوں، میرے سوا کوئی معبود نہیں، پس میری ہی بندگی کرو اور میری یاد کے لیے نماز قائم کرو۔",
        ref: "Surah Ta-Ha 20:14"
      },
      {
        arabic: "قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ ۝ فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ",
        transEn: "[Moses] said, 'No! Indeed, with me is my Lord; He will guide me.' Then We inspired to Moses, 'Strike with your staff the sea,' and it parted, and each portion was like a great towering mountain.",
        transUrdu: "موسیٰ نے فرمایا: 'ہرگز نہیں! بے شک میرے ساتھ میرا رب ہے، وہ ضرور میری رہنمائی فرمائے گا۔' پھر ہم نے موسیٰ کی طرف وحی بھیجی کہ اپنے عصا سے سمندر پر مارو، پس وہ پھٹ گیا اور ہر ٹکڑا ایک عظیم الشان پہاڑ کی طرح ہو گیا۔",
        ref: "Surah Ash-Shu'ara 26:62–63"
      }
    ],
    coreNarrativeEn: "Prophet Musa (AS) was born under Pharaoh's brutal decree murdering newborn Israelite males. Placed by his inspired mother in a basket on the Nile, he was drawn out and raised inside Pharaoh's own palace. As a young man, he fled to Madyan after unintentionally killing an Egyptian while defending an oppressed Israelite. There, he worked for ten years before returning toward Egypt with his family. At Mount Tur, Allah spoke to Musa directly, commissioning him as a Messenger alongside his brother Harun. Armed with divine miracles—his staff turning into a serpent and his hand shining brilliantly white—Musa fearlessly confronted Pharaoh, demanding the liberation of Bani Israel. Pharaoh's court magicians, witnessing the undeniable authenticity of Musa's miracles, prostrated in submission to Allah despite Pharaoh's threats of execution. Musa led the Exodus; trapped between the Red Sea and Pharaoh's pursuing army, Musa proclaimed rock-solid faith: 'Indeed, with me is my Lord; He will guide me.' The sea parted into twelve dry avenues. Musa led the believers across, while Pharaoh and his soldiers were drowned. Musa then ascended Mount Sinai for forty days to receive the inscribed Tablets of the Tawrat.",
    coreNarrativeUrdu: "حضرت موسیٰ علیہ السلام کی پیدائش فرعون کے اس ظالمانہ دور میں ہوئی جب بنی اسرائیل کے نوزائیدہ بیٹوں کو قتل کیا جاتا تھا۔ ان کی والدہ نے حکمِ الٰہی سے انہیں صندوق میں رکھ کر دریائے نیل میں بہا دیا، جہاں سے خود فرعون کے محل والوں نے اٹھا کر پرورش کی۔ جوانی میں ایک مظلوم اسرائیلی کی مدد کے دوران مصری کی غیر ارادی ہلاکت پر مدین ہجرت فرمائی اور دس سال بکریاں چرائیں۔ واپسی پر وادیِ طویٰ میں کوہِ طور پر اللہ تعالیٰ نے بلاواسطہ کلام فرمایا اور نبوت عطا فرمائی۔ اپنے فصیح اللسان بھائی حضرت ہارون کے ہمراہ فرعون کے دربار میں پہنچ کر توحید کی دعوت دی اور عصا کے اژدہا بننے اور یدِ بیضا کے روشن معجزات دکھائے۔ دربار کے جادوگر حق دیکھ کر فوراً سجدے میں گر پڑے۔ جب فرعون کے ظلم سے نجات کے لیے بنی اسرائیل کو لے کر نکلے اور آگے سمندر اور پیچھے فرعونی لشکر تھا، تو موسیٰ علیہ السلام نے فرمایا: 'میرا رب میرے ساتھ ہے، وہ مجھے راستہ دکھائے گا'۔ سمندر بارہ راستوں میں پھٹ گیا، اہلِ ایمان سلامت گزر گئے اور فرعون اپنے لشکر سمیت غرق ہو گیا۔ بعد ازاں کوہِ طور پر چالیس راتوں کی مناجات کے بعد آپ کو تورات کی تختیاں عطا ہوئیں۔",
    keyLessonsEn: [
      "Tyranny may seem all-powerful, but Allah nurtures the instrument of its downfall right inside the tyrant's palace.",
      "Courage before corrupt worldly power is a duty of faith; Musa and Harun spoke truth to the world's fiercest dictator.",
      "Tawakkul in extreme crisis: when all physical exits seem blocked, unwavering faith in Allah parts the impassable sea.",
      "Leadership of a complaining community requires extraordinary emotional fortitude, patience, and constant return to prayer."
    ],
    keyLessonsUrdu: [
      "ظالم کتنا ہی طاقتور کیوں نہ ہو، اللہ اس کی بربادی کا انتظام خود اسی کے گھر میں کر دیتا ہے۔",
      "جابر حکمران کے سامنے کلمۂ حق کہنا سب سے بڑا جہاد ہے؛ موسیٰ اور ہارون نے بے خوف ہو کر دعوت پیش کی۔",
      "بحران کے عروج پر جب سارے راستے بند نظر آئیں تو سچا توکل سمندر کو بھی راستے میں بدل دیتا ہے۔",
      "ایک سرکش اور شکوہ کناں قوم کی قیادت کے لیے ہمالیہ جیسا صبر، استقامت اور بارگاہِ الٰہی میں تضرع ضروری ہے۔"
    ],
    authenticSources: "Surah Al-Baqarah (2:49–61), Surah Al-A'raf (7:103–162), Surah Ta-Ha (20:9–98), Surah Al-Qasas (28:3–44), Surah Ash-Shu'ara (26:10–68)"
  },
  {
    id: "harun",
    number: 15,
    nameEn: "15. Prophet Harun / Aaron (عَلَيْهِ ٱلسَّلَامُ) — The Eloquent Brother and Ministerial Ally",
    nameUrdu: "۱۵. حضرت ہارون علیہ السلام — فصیح اللسان پیغمبر، موسیٰ کے دستِ راست اور معاونِ خاص",
    titleEn: "Supportive Brotherhood, Eloquence, Restraint, and Preserving Unity",
    titleUrdu: "اخوت، فصاحتِ بیان، فتنوں سے بچاؤ اور امت کے اتحاد کی حفاظت",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 20 times in the Quran, granted prophethood through Musa's prayer",
    keyQuranVerses: [
      {
        arabic: "وَاجْعَل لِّي وَزِيرًا مِّنْ أَهْلِي ۝ هَارُونَ أَخِي ۝ اشْدُدْ بِهِ أَزْرِي ۝ وَأَشْرِكْهُ فِي أَمْرِي",
        transEn: "And appoint for me a minister from my family — Aaron, my brother. Increase through him my strength. And let him share my task.",
        transUrdu: "اور میرے گھر والوں میں سے میرا ایک نائب مقرر فرما دیجیے — میرے بھائی ہارون کو۔ ان کے ذریعے میری کمر مضبوط فرما، اور انہیں میرے کام میں شریک کر لے۔",
        ref: "Surah Ta-Ha 20:29–32"
      },
      {
        arabic: "قَالَ يَا ابْنَ أُمَّ لَا تَأْخُذْ بِلِحْيَتِي وَلَا بِرَأْسِي ۖ إِنِّي خَشِيتُ أَن تَقُولَ فَرَّقْتَ بَيْنَ بَنِي إِسْرَائِيلَ وَلَمْ تَرْقُبْ قَوْلِي",
        transEn: "[Aaron] said, 'O son of my mother, do not seize [me] by my beard or by my head. Indeed, I feared that you would say, 'You caused division among the Children of Israel and did not observe my word.''",
        transUrdu: "ہارون نے کہا: 'اے میری ماں کے بیٹے! میری داڑھی اور میرے سر کے بال نہ پکڑو۔ مجھے اندیشہ ہوا کہ آپ فرمائیں گے کہ تم نے بنی اسرائیل کے درمیان پھوٹ ڈال دی اور میری بات کا لحاظ نہ رکھا۔'",
        ref: "Surah Ta-Ha 20:94"
      }
    ],
    coreNarrativeEn: "Prophet Harun (AS) was the elder brother of Prophet Musa (AS), blessed with exceptional eloquence, gentleness, and dignified diplomacy. When Musa was commissioned at Mount Tur, he supplicated Allah to grant him Harun as a co-prophet and ministerial partner to strengthen his mission before Pharaoh. Allah granted this petition as a profound mercy. Harun stood side-by-side with Musa throughout the intense confrontations in Pharaoh's court, during the plagues, and through the Exodus. When Musa ascended Mount Sinai for forty days to commune with Allah, he appointed Harun as caretaker of the community. In Musa's absence, a hypocrite named As-Samiri misled the people into casting an idolized golden calf. Harun vehemently protested and warned them: 'O my people, you are only being tested by it, and indeed your Lord is the Most Merciful, so follow me and obey my command' (Surah Ta-Ha 20:90). When Musa returned in grief and fury, Harun calmly explained the delicate balance he maintained to prevent civil war and fratricide among the tribes until Musa's return.",
    coreNarrativeUrdu: "حضرت ہارون علیہ السلام حضرت موسیٰ علیہ السلام کے بڑے بھائی تھے جنہیں اللہ نے بے پناہ فصاحت، متانت، شیریں بیانی اور نرم مزاجی سے نوازا تھا۔ کوہِ طور پر جب موسیٰ علیہ السلام کو نبوت ملی تو انہوں نے دعا فرمائی کہ فرعون جیسے جابر کے سامنے حق کی تبلیغ کے لیے ان کے بھائی ہارون کو ان کا وزیر اور شریکِ کار بنایا جائے۔ اللہ تعالیٰ نے یہ دعا قبول فرما کر ہارون علیہ السلام کو بھی نبوت سے سرفراز فرمایا۔ آپ نے فرعون کے دربار اور ہجرت کے سفر میں موسیٰ علیہ السلام کا بھرپور ساتھ دیا۔ جب موسیٰ علیہ السلام چالیس دن کے لیے کوہِ طور پر گئے تو ہارون علیہ السلام کو اپنا جانشین بنایا۔ اس دوران سامری نے سونے کا بچھڑا بنا کر بنی اسرائیل کو گمراہ کرنا چاہا۔ ہارون علیہ السلام نے ڈٹ کر مخالفت کی اور توحید کی تاکید کی۔ جب موسیٰ علیہ السلام واپس آئے اور غصے میں بھائی کو سر اور داڑھی سے پکڑا، تو ہارون علیہ السلام نے نرمی سے سمجھایا کہ انہوں نے خانہ جنگی اور پھوٹ سے بچنے کے لیے دانشمندی اور ضبط کا مظاہرہ کیا۔ موسیٰ علیہ السلام نے ان کی صفائی کو تسلیم کر کے اپنے اور اپنے بھائی کے لیے مغفرت کی دعا فرمائی۔",
    keyLessonsEn: [
      "True leadership recognizes its limitations and welcomes trusted, competent partners in service to the truth.",
      "Eloquence and gentle persuasion are vital diplomatic assets when addressing hostile or hardened audiences.",
      "Preserving communal unity and preventing civil discord requires deep tactical wisdom during times of crisis.",
      "Fraternal love: Musa's highest gift to his brother was praying for his prophethood and honoring his dignity."
    ],
    keyLessonsUrdu: [
      "مخلص قائد اپنی کمزوریوں کو پہچان کر مخلص اور باصلاحیت معاونین کو آگے بڑھانے میں عار محسوس نہیں کرتا۔",
      "شیریں بیانی اور نرم اندازِ گفتگو سخت گیر اور مخالف ماحول میں دعوت کا اثر دگنا کر دیتے ہیں۔",
      "بحران کے وقت قوم کو انتشار، پھوٹ اور خانہ جنگی سے بچانا گہری حکمت و بصیرت کا متقاضی ہے۔",
      "بھائی چارے کی معراج: موسیٰ علیہ السلام نے اپنے بھائی کے حق میں جو دعا مانگی وہ دنیا کی سب سے بڑی سفارش (نبوت کا حصول) ثابت ہوئی۔"
    ],
    authenticSources: "Surah Ta-Ha (20:29–36, 85–98), Surah Al-A'raf (7:142–151), Surah Maryam (19:53), Surah Al-Qasas (28:34–35)"
  },
  {
    id: "dhul-kifl",
    number: 16,
    nameEn: "16. Prophet Dhu'l-Kifl / Ezekiel (عَلَيْهِ ٱلسَّلَامُ) — The Steadfast Fulfiller of Pledges",
    nameUrdu: "۱۶. حضرت ذو الکفل علیہ السلام — ایفائے عہد کے پابند اور صابر و عادل پیغمبر",
    titleEn: "Integrity, Fulfilling Solemn Covenants, and Unshaken Moral Endurance",
    titleUrdu: "عہد کی پاسداری، عدل و انصاف اور شب و روز کی پابندی",
    arabicHonorific: "ذُو الْكِفْلِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned twice in the Quran, honored among the elite patient and righteous",
    keyQuranVerses: [
      {
        arabic: "وَإِسْمَاعِيلَ وَإِدْرِيسَ وَذَا الْكِفْلِ ۖ كُلٌّ مِّنَ الصَّابِرِينَ ۝ وَأَدْخَلْنَاهُمْ فِي رَحْمَتِنَا ۖ إِنَّهُم مِّنَ الصَّالِحِينَ",
        transEn: "And [mention] Ishmael and Idris and Dhu'l-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous.",
        transUrdu: "اور اسماعیل اور ادریس اور ذوالکفل (کا تذکرہ فرمائیے)؛ یہ سب صبر کرنے والے تھے۔ اور ہم نے انہیں اپنی رحمت میں داخل فرمایا، بے شک وہ نیکوکاروں میں سے تھے۔",
        ref: "Surah Al-Anbiya 21:85–86"
      },
      {
        arabic: "وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِّنَ الْأَخْيَارِ",
        transEn: "And remember Ishmael, Elisha and Dhu'l-Kifl, and all are among the outstandingly good.",
        transUrdu: "اور یاد کیجیے اسماعیل، الیسع اور ذوالکفل کو، اور یہ سب بہترین لوگوں میں سے تھے۔",
        ref: "Surah Sad 38:48"
      }
    ],
    coreNarrativeEn: "Prophet Dhu'l-Kifl (AS) is explicitly mentioned in the Holy Quran alongside illustrious prophets such as Ismail, Idris, and Al-Yasa, and is celebrated as being of 'Al-Sabireen' (the steadfastly patient) and 'Al-Akhyar' (the chosen, outstandingly good). The title 'Dhu'l-Kifl' in Arabic signifies 'the one who took upon himself a solemn pledge (Kifl) and fulfilled it with absolute integrity.' Classical Quranic commentators (including Ibn Kathir, At-Tabari, and Al-Qurtubi) record that he accepted the leadership of his community upon three rigorous conditions: that he would judge among the people with perfect justice, fast continuously during the days, spend the nights in prayer, and never lose his temper in anger. Despite countless provocations, he fulfilled this solemn covenant without failing a single day, earning Allah's everlasting praise and entry into His special mercy.",
    coreNarrativeUrdu: "حضرت ذو الکفل علیہ السلام کا تذکرہ قرآن کریم میں حضرت اسماعیل، حضرت ادریس اور حضرت الیسع علیہم السلام کے ساتھ وارد ہوا ہے اور آپ کو 'الصابرین' (صبر کرنے والے) اور 'الاخیار' (بہترین برگزیدہ ہستیاں) کے لقب سے نوازا گیا۔ عربی زبان میں 'ذو الکفل' کا معنی ہے: 'وہ ہستی جس نے کسی ذمہ داری یا عہد کی ضمانت (کفل) لی اور اسے کمالِ دیانت داری سے نبھایا'۔ مفسرینِ کرام (جیسے ابن کثیر اور طبری) بیان کرتے ہیں کہ آپ نے قیادت کی ذمہ داری اس عہد پر قبول فرمائی تھی کہ دن کو روزہ رکھیں گے، راتوں کو قیام فرمائیں گے، مخلوق کے درمیان عدل و انصاف سے فیصلے کریں گے اور کبھی غصے میں نہیں آئیں گے۔ تمام تر رکاوٹوں اور اشتعال انگیزی کے باوجود آپ نے اس عہد کو تاحیات وفا کیا اور اللہ کی بارگاہ سے خصوصی رحمت کے حقدار ٹھہرے۔",
    keyLessonsEn: [
      "Keeping promises and fulfilling professional and moral covenants is a hallmark of prophetic greatness.",
      "Restraining anger (Kazm al-Ghaydh) when in positions of authority is among the highest virtues in Islam.",
      "Combining public governance and fair adjudication with private nocturnal worship protects the soul from hypocrisy.",
      "Patience (Sabr) is an active, daily discipline that requires unwavering self-control."
    ],
    keyLessonsUrdu: [
      "عہد کی پاسداری اور اپنی ذمہ داریوں کو امانت داری کے ساتھ پورا کرنا مؤمن کا بنیادی فریضہ ہے۔",
      "اختیار اور طاقت کے باوجود غصے کو قابو میں رکھنا اور ہر حال میں عدل پر قائم رہنا حقیقی بہادری ہے۔",
      "عوامی خدمت اور منصفانہ فیصلوں کے ساتھ ساتھ رات کی تنہائیوں میں اللہ کے حضور جھکنا اخلاص کو قائم رکھتا ہے۔",
      "صبر محض خاموشی کا نام نہیں بلکہ روزمرہ کے فرائض کو ثابت قدمی سے سرانجام دینے کی مسلسل جدوجہد ہے۔"
    ],
    authenticSources: "Surah Al-Anbiya (21:85–86), Surah Sad (38:48), Tafsir Ibn Kathir, Tafsir al-Tabari"
  },
  {
    id: "dawud",
    number: 17,
    nameEn: "17. Prophet Dawud / David (عَلَيْهِ ٱلسَّلَامُ) — The Just King, Reciter of Zabur & Slayer of Jalut",
    nameUrdu: "۱۷. حضرت داؤد علیہ السلام — خلیفۃ الارض، زبور کے راوی، عادل بادشاہ اور جالوت کو شکست دینے والے",
    titleEn: "Righteous Governance, Manual Labor, Melodious Glorification, and Sincere Inabat",
    titleUrdu: "عادلانہ حکمرانی، دستکاری سے حلال کمائی، تسبیح و مناجات اور خشوعِ قلبی",
    arabicHonorific: "نَبِيُّ اللَّهِ وَخَلِيفَتُهُ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 16 times in the Quran, granted the Zabur (Psalms)",
    keyQuranVerses: [
      {
        arabic: "يَا دَاوُودُ إِنَّا جَعَلْنَاكَ خَلِيفَةً فِي الْأَرْضِ فَاحْكُم بَيْنَ النَّاسِ بِالْحَقِّ وَلَا تَتَّبِعِ الْهَوَىٰ فَيُضِلَّكَ عَن سَبِيلِ اللَّهِ",
        transEn: "[We said], 'O David, indeed We have made you a successor upon the earth, so judge between the people in truth and do not follow [your own] desire, as it will lead you astray from the way of Allah.'",
        transUrdu: "اے داؤد! ہم نے تمہیں زمین میں خلیفہ بنایا ہے، پس تم لوگوں کے درمیان حق کے ساتھ فیصلے کرو اور خواہشِ نفس کی پیروی نہ کرنا کہ وہ تمہیں اللہ کی راہ سے بھٹکا دے گی۔",
        ref: "Surah Sad 38:26"
      },
      {
        arabic: "فَهَزَمُوهُم بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ",
        transEn: "So they defeated them by permission of Allah, and David killed Goliath, and Allah gave him the kingship and wisdom and taught him from that which He willed.",
        transUrdu: "پس انہوں نے اللہ کے حکم سے ان کو شکست دی، اور داؤد نے جالوت کو قتل کر دیا اور اللہ نے ان کو بادشاہت اور حکمت عطا فرمائی اور جو چاہا سکھایا۔",
        ref: "Surah Al-Baqarah 2:251"
      }
    ],
    coreNarrativeEn: "Prophet Dawud (AS) began as a faithful young shepherd in King Talut's (Saul's) army. Confronting the terrifying giant Jalut (Goliath) whom others feared to face, Dawud advanced with profound reliance on Allah and slew Jalut with a single sling-stone, turning the battle. Allah granted Dawud kingship, prophetic revelation, and deep judicial wisdom. He was gifted the Zabur (Psalms), and when he recited Allah's praises with his exquisite voice, birds gathered and mountains joined in glorification. Allah softened iron in his hands, allowing him to weave protective interlocking chainmail. Despite possessing the royal treasury, Dawud refused to live off public wealth, eating only from the earnings of his own manual craftsmanship. Prophet Muhammad ﷺ praised him warmly: 'The dearest prayer to Allah is the prayer of Dawud; he slept half the night, stood for a third, and slept for a sixth; and he fasted alternate days' (Sahih al-Bukhari 1131). When presented with a subtle judicial parable, he recognized his own need for vigilance, prostrating in humble repentance.",
    coreNarrativeUrdu: "حضرت داؤد علیہ السلام کی شجاعت کا آغاز طالوت کے لشکر میں ایک باایمان نوجوان کے طور پر ہوا۔ جب ظالم اور دیوہیکل جالوت کے سامنے سب خوفزدہ تھے، تو داؤد علیہ السلام نے اللہ کے بھروسے پر ایک ہی گوپھن کے پتھر سے جالوت کا خاتمہ کر دیا۔ اللہ تعالیٰ نے آپ کو نبوت، بادشاہت اور حکمت عطا فرمائی اور آپ پر زبور نازل فرمائی۔ جب آپ خشوع کے ساتھ زبور کی تلاوت فرماتے تو پرندے ہوا میں ٹھہر جاتے اور پہاڑ آپ کے ساتھ تسبیح پڑھتے تھے۔ اللہ تعالیٰ نے آپ کے ہاتھوں کے لیے لوہے کو موم کی طرح نرم فرما دیا، جس سے آپ زرہیں تیار کرتے تھے۔ بادشاہ ہونے کے باوجود آپ شاہی خزانے سے ایک پیسہ نہ لیتے بلکہ اپنے ہاتھ کی کمائی سے روزی حاصل کرتے تھے۔ رسول اللہ ﷺ نے فرمایا کہ اللہ کے نزدیک سب سے پسندیدہ نماز اور روزہ داؤد علیہ السلام کا تھا؛ آپ ایک دن روزہ رکھتے اور ایک دن چھوڑتے، اور رات کا درمیانی حصہ عبادت میں گزارتے تھے۔",
    keyLessonsEn: [
      "Faith and courage overcome overwhelming physical odds; worldly size cannot resist divine support.",
      "Earning one's livelihood through manual work is a noble prophetic Sunnah, regardless of status.",
      "Power and leadership must be anchored strictly in justice and emotional detachment from personal desires.",
      "The ideal spiritual routine balances devotion, health, family rights, and constant repentance (Inabat)."
    ],
    keyLessonsUrdu: [
      "ایمان اور شجاعت کے سامنے بظاہر ناقابلِ تسخیر طاقتیں بھی ریت کی دیوار ثابت ہوتی ہیں۔",
      "اپنے ہاتھ کی محنت سے حلال رزق کمانا انبیاء کی سنت اور عزت کا سرچشمہ ہے، خواہ انسان کسی بھی منصب پر ہو۔",
      "اقتدار اور عدل کی کرسی پر بیٹھ کر ذاتی خواہشات سے بالاتر ہو کر خالص حق کے مطابق فیصلے کرنا لازمی ہے۔",
      "عبادت میں اعتدال: جسم کے حقوق، نیند اور شب بیداری کے درمیان توازن داؤد علیہ السلام کا طریقہ تھا۔"
    ],
    authenticSources: "Surah Al-Baqarah (2:251), Surah Sad (38:17–26), Surah Saba (34:10–11), Surah Al-Anbiya (21:78–80), Sahih al-Bukhari 1131, 2072"
  },
  {
    id: "sulayman",
    number: 18,
    nameEn: "18. Prophet Sulayman / Solomon (عَلَيْهِ ٱلسَّلَامُ) — The Wise King Blessed with Unmatched Dominion",
    nameUrdu: "۱۸. حضرت سلیمان علیہ السلام — بے مثال سلطنت کے مالک، دانا پیغمبر اور شکر گزار بادشاہ",
    titleEn: "Vast Kingdom, Understanding Animal Speech, and Supreme Gratitude",
    titleUrdu: "ہواؤں اور جنات پر حکمرانی، جانوروں کی بولی کی فہم اور شکر گزاری کی معراج",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 17 times in the Quran, honored for wisdom and gratitude",
    keyQuranVerses: [
      {
        arabic: "فَتَبَسَّمَ ضَاحِكًا مِّن قَوْلِهَا وَقَالَ رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
        transEn: "So [Solomon] smiled, amused at her speech, and said, 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents and to do righteous deeds that please You. And admit me by Your mercy into [the ranks of] Your righteous servants.'",
        transUrdu: "پس سلیمان اس کی بات سن کر مسکرا دیئے اور عرض کی: 'اے میرے رب! مجھے توفیق دے کہ میں تیری اس نعمت کا شکر ادا کروں جو تو نے مجھ پر اور میرے والدین پر فرمائی ہے، اور ایسے نیک عمل کروں جن سے تو راضی ہو جائے، اور مجھے اپنی رحمت سے اپنے نیک بندوں میں داخل فرما۔'",
        ref: "Surah An-Naml 27:19"
      },
      {
        arabic: "وَوَهَبْنَا لِدَاوُودَ سُلَيْمَانَ ۚ نِعْمَ الْعَبْدُ ۖ إِنَّهُ أَوَّابٌ",
        transEn: "And to David We gave Solomon. An excellent servant, indeed he was one repeatedly turning back [to Allah].",
        transUrdu: "اور ہم نے داؤد کو سلیمان عطا فرمائے، کیا ہی بہترین بندے تھے! بے شک وہ کثرت سے رجوع کرنے والے تھے۔",
        ref: "Surah Sad 38:30"
      }
    ],
    coreNarrativeEn: "Prophet Sulayman (AS) inherited the kingdom and prophetic wisdom of his father Dawud. Allah bestowed upon him a unique dominion never granted to anyone before or since: command over the wind blowing at his bidding, subservience of the jinn who constructed sanctuaries, molten copper flowing like water, and the ability to comprehend the languages of birds and animals. When marching with his majestic army of humans, jinn, and birds, he overheard a tiny ant warning its community to enter their burrows lest Sulayman's army crush them inadvertently. Sulayman smiled with heartfelt emotion and immediately fell into humble prayer, begging Allah for the ability to remain grateful. Informed by the hoopoe bird (Hudhud) of the kingdom of Sheba in Yemen whose Queen Bilqis worshipped the sun, Sulayman sent a diplomatic letter opening with: 'In the name of Allah, the Entirely Merciful, the Especially Merciful' inviting them to submit to monotheism. Astonished by Sulayman's piety, wisdom, and miraculous court, Bilqis repented of sun-worship and embraced Islam. Sulayman completed the monumental renovation of Bayt al-Maqdis and passed away while leaning upon his staff, demonstrating that even unseen jinn have no knowledge of the future or unseen realms.",
    coreNarrativeUrdu: "حضرت سلیمان علیہ السلام کو اللہ تعالیٰ نے اپنے والد حضرت داؤد کے بعد ایسی بے مثال سلطنت اور دانائی عطا فرمائی جس کی کوئی دوسری مثال نہیں ملتی۔ تیز ہوائیں آپ کے حکم پر چلتی تھیں، جنات آپ کے زیرِ فرمان تعمیرات کرتے تھے، پگھلے ہوئے تانبے کے چشمے بہائے گئے، اور پرندوں اور جانوروں کی بولیاں سکھائی گئیں۔ ایک مرتبہ جب آپ انسانوں، جنوں اور پرندوں کے عظیم لشکر کے ساتھ وادیِ نمل سے گزر رہے تھے تو ایک چیونٹی نے اپنی ساتھیوں کو پکارا کہ بلوں میں گھس جاؤ کہیں سلیمان کا لشکر تمہیں روند نہ ڈالے۔ سلیمان علیہ السلام یہ سن کر مسکرا پڑے اور فوری عاجزانہ دعا مانگی کہ 'اے رب! مجھے اپنی نعمتوں پر شکر گزاری کی توفیق دے'۔ ہدہد پرندے کے ذریعے جب یمن کی ملکہ بلقیس کی قوم کے سورج پوجنے کا علم ہوا تو سلیمان علیہ السلام نے بسم اللہ الرحمن الرحیم سے مزین خط بھیجا۔ ملکہ بلقیس آپ کے دربار اور توحیدی نظام سے متاثر ہو کر دائرۂ اسلام میں داخل ہو گئیں۔ آپ نے بیت المقدس کی شاندار تجدید فرمائی اور عصا کے سہارے کھڑے کھڑے وفات پائی جس سے ثابت ہوا کہ جنات بھی غیب کا علم نہیں رکھتے۔",
    keyLessonsEn: [
      "Immense wealth and authority must be met with greater humility and conscious gratitude (Shukr).",
      "Empathy extends to all living creatures; a mighty king paused his grand army to listen to and protect an ant.",
      "True power lies in deploying diplomacy and the message of Tawheed rather than waging gratuitous war.",
      "The Unseen (Ghayb) belongs solely to Allah; neither jinn nor humans possess supernatural omniscience."
    ],
    keyLessonsUrdu: [
      "جتنی بڑی دولت اور طاقت ہو، انسان کو اسی قدر زیادہ عاجزی اور شکر گزاری کا مظاہرہ کرنا چاہیے۔",
      "رحم دلی صرف انسانوں کے لیے نہیں بلکہ تمام جانداروں کے لیے ہے؛ ایک عظیم الشان بادشاہ نے چیونٹی کی حفاظت کو بھی اہمیت دی۔",
      "طاقت کا اصل مقصد فتوحات نہیں بلکہ حکمت، سفارت اور توحید کی اشاعت ہونا چاہیے۔",
      "علمِ غیب صرف اور صرف اللہ تعالیٰ کے پاس ہے؛ جنات اور مخلوقات اس سے بالکل بے خبر ہیں۔"
    ],
    authenticSources: "Surah An-Naml (27:15–44), Surah Sad (38:30–40), Surah Saba (34:12–14), Surah Al-Anbiya (21:78–82)"
  },
  {
    id: "ilyas",
    number: 19,
    nameEn: "19. Prophet Ilyas / Elijah (عَلَيْهِ ٱلسَّلَامُ) — The Dauntless Caller Who Denounced Baal",
    nameUrdu: "۱۹. حضرت الیاس علیہ السلام — بعل کی بت پرستی کے خلاف توحید کے بے باک داعی",
    titleEn: "Courageous Da'wah, Denouncing Pagan Idolatry, and Enduring Legacy",
    titleUrdu: "شرک کی تردید، حق پر استقامت اور ذکرِ جمیل",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned twice in the Quran, honored with divine peace upon his name",
    keyQuranVerses: [
      {
        arabic: "وَإِنَّ إِلْيَاسَ لَمِنَ الْمُرْسَلِينَ ۝ إِذْ قَالَ لِقَوْمِهِ أَلَا تَتَّقُونَ ۝ أَتَدْعُونَ بَعْلًا وَتَذَرُونَ أَحْسَنَ الْخَالِقِينَ ۝ اللَّهَ رَبَّكُمْ وَرَبَّ آبَائِكُمُ الْأَوَّلِينَ",
        transEn: "And indeed, Elias was from among the messengers, when he said to his people, 'Will you not fear Allah? Do you call upon Ba'l and leave the best of creators — Allah, your Lord and the Lord of your first forefathers?'",
        transUrdu: "اور بے شک الیاس بھی رسولوں میں سے تھے۔ جب انہوں نے اپنی قوم سے فرمایا: 'کیا تم ڈرتے نہیں؟ کیا تم بعل (بت) کو پکارتے ہو اور سب سے بہترین پیدا فرمانے والے کو چھوڑ دیتے ہو؟ اللہ کو، جو تمہارا بھی رب ہے اور تمہارے پہلے آباؤ اجداد کا بھی رب ہے؟'",
        ref: "Surah As-Saffat 37:123–126"
      },
      {
        arabic: "سَلَامٌ عَلَىٰ إِلْ يَاسِينَ ۝ إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ ۝ إِنَّهُ مِنْ عِبَادِنَا الْمُؤْمِنِينَ",
        transEn: "Peace be upon Elias. Indeed, We thus reward the doers of good. Indeed, he was of Our believing servants.",
        transUrdu: "سلام ہو الیاس پر۔ بے شک ہم نیکوکاروں کو اسی طرح جزا دیتے ہیں۔ یقیناً وہ ہمارے باایمان بندوں میں سے تھے۔",
        ref: "Surah As-Saffat 37:130–132"
      }
    ],
    coreNarrativeEn: "Prophet Ilyas (AS) was sent to the people of Baalbek in the Levant (modern-day Lebanon/Syria region) during an era when the Israelites had forsaken the Shari'ah of the Tawrat and embraced pagan Phoenician idolatry, worshipping a golden idol named 'Baal'. Prophet Ilyas stood up fearlessly against the reigning tyrant and the corrupted elite, presenting clear, rational arguments: 'Do you call upon Baal and abandon the best of Creators?' They rejected his sincere counsel, slandered him, and attempted to kill him. Ilyas endured severe hardship, living in hiding while continuing his da'wah. He prayed to Allah, who withheld rain from the land until the famine humbled the people into recognizing the powerlessness of their false gods. Ilyas re-established monotheism, appointed Al-Yasa as his successor, and was praised eternally by Allah in the Quran: 'Peace be upon Elias; indeed, We thus reward the doers of good.'",
    coreNarrativeUrdu: "حضرت الیاس علیہ السلام کو وادئ بعلبک (موجودہ شام و لبنان کا خطہ) میں مبعوث فرمایا گیا جہاں بنی اسرائیل نے تورات کے احکام بھلا کر 'بعل' نامی سونے کے بت کی پرستش شروع کر دی تھی۔ حضرت الیاس نے بادشاہ اور متکبر سرداروں کے سامنے ڈٹ کر سوال اٹھایا: 'کیا تم ایک بے جان بت کو پکارتے ہو اور سب سے بہترین خالق کو چھوڑ دیتے ہو جو تمہارا اور تمہارے آباؤ اجداد کا حقیقی پروردگار ہے؟' قوم نے آپ کی تکذیب کی اور جان کے درپے ہو گئے۔ الیاس علیہ السلام نے شدید مصائب جھیلے اور پہاڑوں میں پناہ گزین رہ کر بھی توحید کی شمع جلائے رکھی۔ اللہ کے حکم سے بارش رکی اور شدید قحط نے قوم کو عاجز کر دیا جس کے بعد انہوں نے بتوں کی بے بسی دیکھی۔ آپ نے قوم کی اصلاح فرمائی اور حضرت الیسع علیہ السلام کو اپنا رفیق و جانشین بنایا۔ قرآن مجید نے آپ پر سلامتی کا پروانہ نازل فرمایا۔",
    keyLessonsEn: [
      "Calling out popular societal superstitions and idolatry requires fearless spiritual fortitude.",
      "Lifeless idols and modern materialistic gods can never provide sustenance, rain, or salvation.",
      "Perseverance through loneliness in da'wah is honored by Allah with eternal praise in revelation.",
      "Mentoring righteous successors ensures the continuity of sacred guidance across generations."
    ],
    keyLessonsUrdu: [
      "معاشرے میں رائج باطل رسم و رواج اور شرک کے خلاف آواز اٹھانا سچے ایمانی جذبے کا امتحان ہے۔",
      "بے جان مورتیاں یا دنیاوی سہارے انسان کو حقیقی نفع یا نقصان نہیں پہنچا سکتے۔",
      "حق کی راہ میں تنہائی اور مشکلات کا سامنا کرنے والے کے لیے اللہ کا سلام اور ابدی اجر ہے۔",
      "نئی نسل میں باصلاحیت شاگردوں کی تربیت کرنا دعوت کے تسلسل کے لیے ناگزیر ہے۔"
    ],
    authenticSources: "Surah As-Saffat (37:123–132), Surah Al-An'am (6:85), Tafsir Ibn Kathir"
  },
  {
    id: "al-yasa",
    number: 20,
    nameEn: "20. Prophet Al-Yasa / Elisha (عَلَيْهِ ٱلسَّلَامُ) — The Righteous Guide Ranked Among the Chosen",
    nameUrdu: "۲۰. حضرت الیسع علیہ السلام — برگزیدہ پیغمبر، جانشینِ الیاس اور اخیار میں شامل ہستی",
    titleEn: "Loyal Successorship, Steadfast Leadership, and Unyielding Virtue",
    titleUrdu: "حق کی جانشینی، امانتِ نبوت کی حفاظت اور کمالِ نیکی",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned twice in the Quran, ranked explicitly among 'Al-Akhyar' (the chosen best)",
    keyQuranVerses: [
      {
        arabic: "وَاذْكُرْ إِسْمَاعِيلَ وَالْيَسَعَ وَذَا الْكِفْلِ ۖ وَكُلٌّ مِّنَ الْأَخْيَارِ",
        transEn: "And remember Ishmael, Elisha and Dhu'l-Kifl, and all are among the outstandingly good.",
        transUrdu: "اور یاد کیجیے اسماعیل، الیسع اور ذوالکفل کو، اور یہ سب بہترین لوگوں میں سے تھے۔",
        ref: "Surah Sad 38:48"
      },
      {
        arabic: "وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا ۚ وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ",
        transEn: "And Ishmael and Elisha and Jonah and Lot — and all [of them] We preferred over the worlds.",
        transUrdu: "اور اسماعیل، الیسع، یونس اور لوط کو (بھی ہدایت دی)؛ اور ہم نے ان سب کو تمام جہانوں پر فضیلت بخشی۔",
        ref: "Surah Al-An'am 6:86"
      }
    ],
    coreNarrativeEn: "Prophet Al-Yasa (AS) was the faithful companion, disciple, and successor of Prophet Ilyas (AS). When Ilyas fled the persecution of the king of Baalbek, he was taken in by Al-Yasa's righteous family. Al-Yasa learned from Ilyas, accompanied him through trials, and was granted prophethood by Allah to guide Bani Israel after Ilyas. Al-Yasa upheld the Tawrat and the commandments of Allah with remarkable integrity, teaching the people scripture, judging with justice, and reminding them of the covenants of monotheism. The Quran explicitly elevates his status by naming him among 'Al-Akhyar' (the outstandingly good and chosen) and declares that Allah preferred him over the worlds along with noble messengers, proving that steadfast consistency in righteousness without vanity is deeply beloved to Allah.",
    coreNarrativeUrdu: "حضرت الیسع علیہ السلام حضرت الیاس علیہ السلام کے شاگرد، رفیق اور جانشین تھے۔ جب الیاس علیہ السلام پر سخت حالات آئے تو الیسع علیہ السلام نے ان کا ساتھ دیا اور علم و حکمت حاصل کی۔ الیاس علیہ السلام کے بعد اللہ تعالیٰ نے آپ کو منصبِ نبوت پر سرفراز فرمایا۔ آپ نے بنی اسرائیل کے درمیان تورات کے احکام کو نافذ کیا، عدل قائم فرمایا اور بگڑتی ہوئی قوم کو فتنوں سے بچایا۔ قرآنِ مجید میں آپ کا ذکر خصوصی طور پر 'الأَخْيَار' (بہترین، چنے ہوئے بندے) کے مبارک لقب سے کیا گیا ہے اور تمام جہانوں پر فضیلت پانے والی ہستیوں میں شمار فرمایا گیا ہے۔ یہ اس بات کا ثبوت ہے کہ بغیر کسی دکھاوے کے خاموشی اور استقامت کے ساتھ شریعت کی خدمت کرنے والے اللہ کے ہاں عظیم مرتبے پر فائز ہوتے ہیں۔",
    keyLessonsEn: [
      "Successorship in religious leadership requires humility, learning under mentors, and unwavering integrity.",
      "Quiet, steadfast dedication to truth without seeking fame earns the highest divine praise ('Al-Akhyar').",
      "Preserving institutional morality after great reformers depart is as critical as the original reform itself.",
      "Divine favor is granted based on purity of heart and tireless adherence to Allah's commandments."
    ],
    keyLessonsUrdu: [
      "دین کی خدمت میں اسلاف اور اساتذہ کی رفاقت، شاگردی اور عاجزی کامیابی کی بنیاد ہے۔",
      "شہرت اور نام و نمود کی طلب کے بغیر خاموشی سے دین پر پہرہ دینا انسان کو 'الاخیار' کے درجے پر پہنچاتا ہے۔",
      "بڑے مصلحین کے بعد ان کے مشن اور شریعت کے اصولوں کو زندہ رکھنا اتنا ہی اہم ہے جتنا کہ اصلاح کی بنیاد رکھنا۔",
      "اللہ کا قرب اور فضیلت دل کے اخلاص اور مسلسل عملِ صالح سے حاصل ہوتی ہے۔"
    ],
    authenticSources: "Surah Al-An'am (6:86), Surah Sad (38:48), Tafsir Ibn Kathir, Tafsir al-Qurtubi"
  },
  {
    id: "yunus",
    number: 21,
    nameEn: "21. Prophet Yunus / Jonah (عَلَيْهِ ٱلسَّلَامُ) — Dhun-Nun & The Supplication of Darkness",
    nameUrdu: "۲۱. حضرت یونس علیہ السلام — ذو النون، مچھلی والے اور اندھیروں میں دعا کی قبولیت",
    titleEn: "Premature Departure, The Whale's Belly, and The Supreme Du'a of Tawbah",
    titleUrdu: "عجلت کی لغزش، مچھلی کا پیٹ اور دعائے کرب و استغفار",
    arabicHonorific: "ذُو النُّونِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 4 times in the Quran, with Surah Yunus bearing his name",
    keyQuranVerses: [
      {
        arabic: "وَذَا النُّونِ إِذ ذَّهَبَ مُغَاضِبًا فَظَنَّ أَن لَّن نَّقْدِرَ عَلَيْهِ فَنَادَىٰ فِي الظُّلُمَاتِ أَن لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ۝ فَاسْتَجَبْنَا لَهُ وَنَجَّيْنَاهُ مِنَ الْغَمِّ ۚ وَكَذَٰلِكَ نُنجِي الْمُؤْمِنِينَ",
        transEn: "And [mention] the man of the fish, when he went off in anger and thought that We would not decree [anything] upon him. And he called out within the darknesses, 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.' So We responded to him and saved him from the distress. And thus do We save the believers.",
        transUrdu: "اور مچھلی والے (یونس کا ذکر کیجیے) جب وہ غصے میں چل دیے اور خیال کیا کہ ہم ان پر تنگی نہ کریں گے۔ پھر انہوں نے اندھیروں میں پکارا: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا'۔ تو ہم نے ان کی دعا قبول فرمائی اور انہیں غم سے نجات دی، اور اسی طرح ہم مؤمنوں کو نجات دیتے ہیں۔",
        ref: "Surah Al-Anbiya 21:87–88"
      },
      {
        arabic: "فَلَوْلَا كَانَتْ قَرْيَةٌ آمَنَتْ فَنَفَعَهَا إِيمَانُهَا إِلَّا قَوْمَ يُونُسَ لَمَّا آمَنُوا كَشَفْنَا عَنْهُمْ عَذَابَ الْخِزْيِ فِي الْحَيَاةِ الدُّنْيَا وَمَتَّعْنَاهُمْ إِلَىٰ حِينٍ",
        transEn: "Then has there not been a single city that believed so its faith benefited it except the people of Jonah? When they believed, We removed from them the punishment of disgrace in worldly life and gave them enjoyment for a time.",
        transUrdu: "پھر کوئی ایسی بستی کیوں نہ ہوئی جو عذاب دیکھ کر ایمان لاتی اور اس کا ایمان اسے نفع دیتا، سوائے یونس کی قوم کے؟ جب وہ ایمان لائے تو ہم نے دنیا کی زندگی میں ان سے رسوائی کا عذاب ہٹا دیا اور انہیں ایک مدت تک فائدہ اٹھانے دیا۔",
        ref: "Surah Yunus 10:98"
      }
    ],
    coreNarrativeEn: "Prophet Yunus (AS), titled 'Dhun-Nun' (The Companion of the Whale), was sent to the ancient city of Nineveh (near Mosul, Iraq) with a population of over 100,000. For years, he called them to monotheism, but they persisted in idolatry. Frustrated by their arrogance, Yunus warned them of impending punishment and departed the city without awaiting explicit divine permission. He boarded a crowded ship, which was suddenly engulfed by a terrifying storm. To lighten the vessel, lots were cast; Yunus's name was drawn three times, and he jumped into the raging sea. By Allah's decree, a massive whale swallowed him without crushing his bones or flesh. Trapped in the three layers of darkness—the darkness of the night, the deep sea, and the belly of the whale—Yunus recognized his haste and called out with the eternal supplication: 'La ilaha illa Anta, Subhanaka inni kuntu minaz-zalimeen.' Allah accepted his heartfelt repentance, commanded the whale to cast him safely upon a barren shore, and caused a gourd plant (Yaqteen) to shade and heal him. Returning to Nineveh, he found a miraculous sight: his entire population had sincerely repented and embraced faith, becoming the only nation in prophetic history to avert promised destruction through timely collective repentance.",
    coreNarrativeUrdu: "حضرت یونس علیہ السلام کو نینویٰ (موجودہ موصل، عراق) کی بستی کی طرف بھیجا گیا جس کی آبادی ایک لاکھ سے زائد تھی۔ طویل تبلیغ کے باوجود قوم ایمان نہ لائی تو یونس علیہ السلام غصے کی حالت میں اللہ کے واضح اذن کے بغیر بستی چھوڑ کر نکل پڑے۔ ایک کشتی میں سوار ہوئے جو طوفان میں پھنس گئی۔ قرعہ اندازی میں تین بار آپ کا نام نکلا اور آپ نے خود کو سمندر کے حوالے کیا۔ اللہ کے حکم سے ایک دیوہیکل مچھلی نے آپ کو نگل لیا لیکن جسم کو کوئی گزند نہ پہنچایا۔ تین تاریکیوں (رات کی تاریکی، سمندر کی گہرائی اور مچھلی کے پیٹ کی تاریکی) میں یونس علیہ السلام نے اپنی عجلت پر ندامت کا اظہار کرتے ہوئے وہ عظیم الشان دعا مانگی: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ'۔ اللہ نے توبہ قبول فرمائی اور مچھلی نے ساحل پر اگل دیا۔ وہاں کدو کی بیل نے سایہ اور شفا دی، اور جب آپ واپس بستی پہنچے تو دیکھا کہ پوری قوم عذاب کی علامات دیکھ کر خلوصِ دل سے توبہ کر کے ایمان لا چکی تھی۔",
    keyLessonsEn: [
      "Never leave a duty or assignment of da'wah without explicit divine guidance or patience.",
      "The supplication of Yunus combines Tawheed, glorification of Allah (Tasbih), and sincere admission of fault, making it the ultimate prayer for distress.",
      "Collective sincere repentance can avert impending societal calamity by Allah's infinite mercy.",
      "Prophet Muhammad ﷺ instructed: 'No Muslim supplicates with the prayer of Dhun-Nun except that Allah answers him' (Jami` at-Tirmidhi 3505)."
    ],
    keyLessonsUrdu: [
      "دینی یا اخلاقی فریضے سے اکتا کر بلا اجازت اور بغیر صبر کے میدان چھوڑنا اللہ کو پسند نہیں۔",
      "دعائے یونس توحید، تسبیح اور اعترافِ گناہ کا ایسا جامع مرقع ہے جو ہر قسم کی مصیبت اور تنگی سے نجات کا تیر بہدف نسخہ ہے۔",
      "پوری قوم اگر اجتماعی طور پر سچے دل سے استغفار کرے تو اللہ تعالیٰ ٹلنے والا عذاب بھی ہٹا دیتا ہے۔",
      "رسول اللہ ﷺ نے فرمایا کہ جو مسلمان بھی پریشانی میں دعائے ذوالنون مانگے گا، اللہ اس کی دعا ضرور قبول فرمائے گا۔"
    ],
    authenticSources: "Surah Al-Anbiya (21:87–88), Surah Yunus (10:98), Surah As-Saffat (37:139–148), Surah Al-Qalam (68:48–50), Jami` at-Tirmidhi 3505"
  },
  {
    id: "zakariyya",
    number: 22,
    nameEn: "22. Prophet Zakariyya / Zechariah (عَلَيْهِ ٱلسَّلَامُ) — The Pious Guardian and Supplicant for Righteous Heirs",
    nameUrdu: "۲۲. حضرت زکریا علیہ السلام — مریم کے کفیل، محراب کے عبادت گزار اور وارثِ دین کی دعا",
    titleEn: "Fervent Secret Supplication, Guardian of Maryam, and Miraculous Conception in Old Age",
    titleUrdu: "خفیہ التجا، حضرت مریم کی نگہداشت اور بڑھاپے میں بشارتِ فرزند",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 7 times in the Quran, honored for piety and selfless devotion",
    keyQuranVerses: [
      {
        arabic: "إِذْ نَادَىٰ رَبَّهُ نِدَاءً خَفِيًّا ۝ قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا ۝ وَإِنِّي خِفْتُ الْمَوَالِيَ مِن وَرَائِي وَكَانَتِ امْرَأَتِي عَاقِرًا فَهَبْ لِي مِن لَّدُنكَ وَلِيًّا ۝ يَرِثُنِي وَيَرِثُ مِنْ آلِ يَعْقُوبَ ۖ وَاجْعَلْهُ رَبِّ رَضِيًّا",
        transEn: "When he called to his Lord a private supplication. He said, 'My Lord, indeed my bones have weakened, and my head has flared with white hair, and never have I been in my supplication to You, my Lord, unblessed. And indeed, I fear the successors after me, and my wife has been barren, so grant me from Yourself an heir who will inherit me and inherit from the family of Jacob. And make him, my Lord, pleasing.'",
        transUrdu: "جب انہوں نے اپنے رب کو چپکے چپکے پکارا۔ عرض کی: 'اے میرے رب! میری ہڈیاں کمزور ہو چکی ہیں اور سر بڑھاپے کی سفیدی سے چمک اٹھا ہے، اور میں کبھی تجھ سے مانگ کر محروم نہیں رہا۔ اور مجھے اپنے بعد رشتہ داروں کی طرف سے اندیشہ ہے اور میری بیوی بانجھ ہے، پس تو مجھے اپنے پاس سے ایک وارث عطا فرما جو میرا بھی وارث بنے اور آلِ یعقوب کی میراث کا بھی وارث ہو، اور اے میرے رب! اسے پسندیدہ انسان بنا'۔",
        ref: "Surah Maryam 19:3–6"
      },
      {
        arabic: "فَاسْتَجَبْنَا لَهُ وَوَهَبْنَا لَهُ يَحْيَىٰ وَأَصْلَحْنَا لَهُ زَوْجَهُ ۚ إِنَّهُمْ كَانُوا يُسَارِعُونَ فِي الْخَيْرَاتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا لَنَا خَاشِعِينَ",
        transEn: "So We responded to him, and We gave to him John, and amended for him his wife. Indeed, they used to hasten to good deeds and supplicate Us in hope and fear, and they were humbly submissive to Us.",
        transUrdu: "تو ہم نے ان کی دعا قبول فرمائی اور انہیں یحییٰ عطا کیے اور ان کے لیے ان کی بیوی کو درست کر دیا۔ بے شک یہ لوگ نیکیوں میں جلدی کرتے تھے اور ہمیں امید اور خوف کے ساتھ پکارتے تھے، اور ہمارے آگے عاجزی کرنے والے تھے۔",
        ref: "Surah Al-Anbiya 21:90"
      }
    ],
    coreNarrativeEn: "Prophet Zakariyya (AS) was a venerable priest and prophet of Bani Israel serving in Bayt al-Maqdis (Jerusalem). He was entrusted with the guardianship of Maryam (mother of Isa), building a dedicated private sanctuary (Mihrab) for her worship. Whenever Zakariyya entered her chamber, he found miraculous fresh fruits out of season. When he asked where they came from, she replied: 'It is from Allah; indeed, Allah provides for whom He wills without measure' (Surah Ali 'Imran 3:37). Inspired by this boundless divine bounty, Zakariyya—despite his frail bones, grey hair, and barren wife—turned to Allah in a private, whisper-soft supplication ('Nida'an Khafiyya'). He sought not worldly wealth, but a righteous prophetic heir who would inherit the legacy of Tawheed from the family of Ya'qub. While standing in prayer in the sanctuary, angels called out to him announcing the birth of a noble son named Yahya. Stunned by the miracle, Allah reminded him: 'Thus [it will be]; your Lord says: It is easy for Me, for I created you before, while you were nothing' (Surah Maryam 19:9).",
    coreNarrativeUrdu: "حضرت زکریا علیہ السلام بنی اسرائیل کے ایک برگزیدہ بزرگ پیغمبر تھے جو بیت المقدس میں امامت و عبادت کے فرائض انجام دیتے تھے۔ آپ کو حضرت مریم (والدۂ عیسیٰ) کی کفالت کا شرف حاصل ہوا جن کے لیے محراب میں خصوصی عبادت گاہ بنائی گئی تھی۔ جب بھی زکریا علیہ السلام وہاں تشریف لے جاتے تو حضرت مریم کے پاس بے موسم کے تازہ پھل موجود پاتے۔ پوچھنے پر انہوں نے عرض کی: 'یہ اللہ کے پاس سے ہے، وہ جسے چاہتا ہے بے حساب رزق دیتا ہے'۔ اس مشاہدے سے متاثر ہو کر زکریا علیہ السلام کے دل میں امید کی کرن جاگی۔ اپنے کمزور جسم، سفید بالوں اور بانجھ بیوی کے باوجود انہوں نے تنہائی میں چپکے سے دعا مانگی کہ 'اے اللہ! مجھے ایک ایسا پاکیزہ وارث عطا فرما جو علم و نبوت کا وارث بنے'۔ ابھی آپ محراب میں نماز پڑھ ہی رہے تھے کہ فرشتوں نے صدا دی کہ اللہ آپ کو حضرت یحییٰ کی ولادت کی خوشخبری دیتا ہے۔ اللہ نے فرمایا کہ یہ میرے لیے نہایت آسان ہے جیسا کہ میں نے پہلے تمہیں عدم سے وجود بخشا۔",
    keyLessonsEn: [
      "No obstacle—neither extreme old age nor physical barrenness—can hinder Allah's creative power.",
      "The etiquette of Du'a: whispering privately ('Nida'an Khafiyya') with profound sincerity enhances intimacy with Allah.",
      "A parent's primary motivation for offspring should be the continuation of faith, spiritual inheritance, and service to society.",
      "Witnessing Allah's favors upon others should inspire us to make ambitious, righteous prayers for ourselves."
    ],
    keyLessonsUrdu: [
      "بڑھاپا یا کوئی ظاہری رکاوٹ اللہ کی قدرتِ تخلیق کے سامنے کوئی حیثیت نہیں رکھتی۔",
      "دعا کے آداب: خشوع اور رازداری کے ساتھ دل سے مانگی گئی دھیمی آواز کی دعا اللہ کے ہاں بے حد مقبول ہوتی ہے۔",
      "اولاد کی طلب میں بنیادی نیت یہ ہونی چاہیے کہ وہ دین، اخلاق اور معاشرے کی خدمت میں نیکی کا تسلسل بنے۔",
      "دوسروں پر اللہ کی رحمت دیکھ کر حسد کرنے کے بجائے انسان کو خود اپنے لیے اللہ سے بلند مقاصد کی دعا مانگنی چاہیے۔"
    ],
    authenticSources: "Surah Maryam (19:1–15), Surah Ali 'Imran (3:37–41), Surah Al-Anbiya (21:89–90)"
  },
  {
    id: "yahya",
    number: 23,
    nameEn: "23. Prophet Yahya / John the Baptist (عَلَيْهِ ٱلسَّلَامُ) — Chaste, Compassionate and Courageous Herald",
    nameUrdu: "۲۳. حضرت یحییٰ علیہ السلام — سید و حصور، زہد و تقویٰ کے امام اور حق کے علمبردار",
    titleEn: "Prophetic Asceticism, Tenderness of Heart, and Fearless Moral Witness",
    titleUrdu: "بچپن سے حکمت و فہم، نفسانی پاکیزگی اور حق کی خاطر جرات مندی",
    arabicHonorific: "نَبِيُّ اللَّهِ عَلَيْهِ السَّلَامُ",
    quranMentionsCount: "Mentioned 5 times in the Quran, uniquely named by Allah Himself",
    keyQuranVerses: [
      {
        arabic: "يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا ۝ وَحَنَانًا مِّن لَّدُنَّا وَزَكَاةً ۖ وَكَانَ تَقِيًّا ۝ وَبَرًّا بِوَالِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا",
        transEn: "[Allah said], 'O John, take the Scripture with determination.' And We gave him judgement while still a youth, and affection from Us and purity, and he was devout and dutiful to his parents, and he was not a disobedient tyrant.",
        transUrdu: "اے یحییٰ! کتاب کو مضبوطی سے تھام لو۔ اور ہم نے انہیں بچپن ہی میں حکمت و فہم عطا فرمائی، اور اپنی طرف سے شفقت اور پاکیزگی بخشی، اور وہ بڑے پرہیزگار تھے اور اپنے والدین کے ساتھ حسنِ سلوک کرنے والے تھے اور سرکش و نافرمان نہ تھے۔",
        ref: "Surah Maryam 19:12–14"
      },
      {
        arabic: "وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا",
        transEn: "And peace be upon him the day he was born and the day he dies and the day he is raised alive.",
        transUrdu: "اور سلامتی ہو ان پر جس دن وہ پیدا ہوئے، اور جس دن وہ وفات پائیں گے، اور جس دن وہ زندہ کر کے اٹھائے جائیں گے۔",
        ref: "Surah Maryam 19:15"
      }
    ],
    coreNarrativeEn: "Prophet Yahya (AS) was the miraculous son granted to Prophet Zakariyya in answer to his prayer, named 'Yahya' by Allah Himself—a name never bestowed upon anyone before him (Surah Maryam 19:7). From his earliest childhood, Yahya was endowed with profound legal understanding, ascetic detachment from worldly pleasures, and an extraordinarily tender heart ('Hananan min Ladunna'). He wept frequently out of awe for Allah, lived a life of rigorous chastity ('Hasur'), and was deeply dutiful to his elderly parents, never behaving with arrogance. Commissioned as a prophet, he confirmed the word of Allah and paved the way for his cousin, Prophet Isa (AS). Yahya fearlessly enjoined righteousness and prohibited the unlawful, publicly denouncing the illicit, incestuous marriage of King Herod. For his uncompromising moral stance, he was unjustly imprisoned and martyred, standing as an eternal symbol of uncorrupted prophetic truth.",
    coreNarrativeUrdu: "حضرت یحییٰ علیہ السلام حضرت زکریا علیہ السلام کے برگزیدہ فرزند تھے جن کا نام خود اللہ تعالیٰ نے 'یحییٰ' رکھا اور فرمایا کہ اس سے قبل ہم نے کسی کو یہ نام نہیں دیا۔ آپ کو بچپن ہی میں گہری حکمت، دانائی اور کتاب کا فہم عطا کیا گیا۔ قرآن مجید نے آپ کو خصوصی شفقت (حنان)، پاکیزگی (زکاۃ)، تقویٰ اور والدین کے ساتھ کمال حسنِ سلوک کا پیکر قرار دیا۔ آپ نے پوری زندگی زہد اور عفت کے ساتھ گزاری اور اپنے خالق کے خوف سے آبدیدہ رہتے تھے۔ آپ نے اپنے خالہ زاد بھائی حضرت عیسیٰ علیہ السلام کی تصدیق فرمائی اور لوگوں کو توبہ اور پاکیزگی کی دعوت دی۔ اس وقت کے ظالم حکمران ہیرودیس کی غیر شرعی شادی پر کھلے عام تنقید فرمائی اور شریعت پر سمجھوتہ کرنے سے انکار کیا۔ اس جرات کے صلے میں آپ کو قید کیا گیا اور بالآخر شہید کر دیا گیا۔ اللہ تعالیٰ نے آپ پر پیدائش، وفات اور قیامت کے دن سلامتی کا مژدہ سنایا۔",
    keyLessonsEn: [
      "Spiritual maturity and understanding (Hukm) can be granted by Allah even in early youth.",
      "True greatness combines deep compassion ('Hanan') with uncompromising moral firmness against corruption.",
      "Filial devotion: honoring one's parents is inseparable from prophetic righteousness.",
      "The truth must be spoken even when it confronts the vanity of tyrannical rulers."
    ],
    keyLessonsUrdu: [
      "فہم، دانائی اور دین کی سمجھ عمر کی محتاج نہیں؛ اللہ بچپن میں بھی کمالِ حکمت عطا فرما سکتا ہے۔",
      "مؤمن کے دل میں مخلوق کے لیے نرمی و شفقت بھی ہونی چاہیے اور باطل کے خلاف غیر لچکدار جرات بھی۔",
      "والدین کے ساتھ حسنِ سلوک اور ادب نبوت اور تقویٰ کا لازمی جزو ہے۔",
      "ظالم بادشاہ کے سامنے بھی شریعت کا سچا حکم بیان کرنے سے پیچھے نہ ہٹنا شہادت کا اعلیٰ رتبہ ہے۔"
    ],
    authenticSources: "Surah Maryam (19:7–15), Surah Ali 'Imran (3:38–41), Surah Al-An'am (6:85), Sahih Muslim 2373"
  },
  {
    id: "isa",
    number: 24,
    nameEn: "24. Prophet Isa / Jesus (عَلَيْهِ ٱلسَّلَامُ) — The Messiah, Born of Virgin Maryam, Word from Allah",
    nameUrdu: "۲۴. حضرت عیسیٰ علیہ السلام — مسیح، ابنِ مریم، کلمۃ اللہ اور روح منہ",
    titleEn: "Miraculous Birth, Life-Giving Miracles by Allah's Leave, and Ascension",
    titleUrdu: "ولادتِ معجزاتی، اذنِ الٰہی سے مردوں کو زندہ کرنا اور رفعِ آسمانی",
    arabicHonorific: "الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ عَلَيْهِ السَّلَامُ",
    isUlulAzm: true,
    quranMentionsCount: "Mentioned 25 times by name, 23 times as 'Son of Maryam', and titled Al-Masih",
    keyQuranVerses: [
      {
        arabic: "إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ ۖ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ",
        transEn: "Indeed, the example of Jesus to Allah is like that of Adam. He created him from dust; then He said to him, 'Be,' and he was.",
        transUrdu: "بے شک اللہ کے نزدیک عیسیٰ کی مثال آدم کی سی ہے، اسے مٹی سے بنایا پھر فرمایا: 'ہو جا' تو وہ ہو گیا۔",
        ref: "Surah Ali 'Imran 3:59"
      },
      {
        arabic: "وَقَوْلِهِمْ إِنَّا قَتَلْنَا الْمَسِيحَ عِيسَى ابْنَ مَرْيَمَ رَسُولَ اللَّهِ وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ",
        transEn: "And [for] their saying, 'Indeed, we have killed the Messiah, Jesus, the son of Mary, the messenger of Allah.' And they did not kill him, nor did they crucify him; but [another] was made to resemble him to them.",
        transUrdu: "اور ان کے اس کہنے پر کہ ہم نے اللہ کے رسول مسیح عیسیٰ ابن مریم کو قتل کر دیا، حالانکہ نہ انہوں نے اسے قتل کیا اور نہ سولی دی بلکہ ان کے لیے مشتبہ کر دیا گیا۔",
        ref: "Surah An-Nisa 4:157"
      }
    ],
    coreNarrativeEn: "Prophet Isa (AS) is the Messiah (Al-Masih) born miraculously without a human father to the chaste Virgin Maryam (AS). Angel Jibreel appeared to Maryam to breathe the spirit created by Allah, causing her to conceive by Allah's command 'Kun' (Be). When people falsely accused her, infant Isa spoke from the cradle: 'Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet' (Surah Maryam 19:30). Granted the Injil (Gospel), Isa confirmed the Tawrat, softened rigid interpretations, and performed stunning miracles strictly 'Bi-idhnillah' (by Allah's leave): fashioning birds from clay and breathing life into them, healing the blind and leper, and raising the dead. Emphasizing inner spiritual purity, he prophesied the final Messenger named Ahmad (Muhammad ﷺ). When enemies plotted his execution, Allah saved him, making another resemble him, and raised Isa bodily to heaven. He will return before the Day of Judgment as a just leader of the Ummah, confirming the final message of Islam.",
    coreNarrativeUrdu: "حضرت عیسیٰ علیہ السلام اللہ کے برگزیدہ رسول اور کلمۃ اللہ ہیں جو بغیر باپ کے کنواری اور پاکدامن حضرت مریم کے بطن سے اللہ کے کلمہ 'کُن' سے پیدا ہوئے۔ جب لوگوں نے مریم پر تہمت لگائی تو نوزائیدہ عیسیٰ نے گود میں کلام فرمایا: 'بے شک میں اللہ کا بندہ ہوں، اس نے مجھے کتاب عطا کی اور نبی بنایا'۔ آپ کو انجیل عطا فرمائی گئی اور آپ نے خالصتاً 'اللہ کے اذن' سے عظیم معجزات دکھائے: مٹی کے پرندے بنا کر اڑانا، پیدائشی اندھوں اور کوڑھیوں کو شفا دینا اور مردوں کو زندہ کرنا۔ آپ نے باطنی طہارت اور زہد پر زور دیا اور خاتم النبیین حضرت محمد ﷺ کی آمد کی بشارت دی۔ جب دشمنوں نے قتل کی سازش کی تو اللہ تعالیٰ نے آپ کو زندہ آسمان پر اٹھا لیا اور ایک دوسرے شخص کو ان کا ہم شکل بنا دیا۔ قربِ قیامت آپ کا نزول ہوگا اور آپ دینِ اسلام کے عادل حاکم کے طور پر تشریف لائیں گے۔",
    keyLessonsEn: [
      "Jesus was a noble mortal prophet and servant of Allah, not divine and not the literal son of God.",
      "Miracles are performed solely 'by Allah's leave' (Bi-idhnillah) to validate prophetic truth, never independently.",
      "Asceticism, compassion for the destitute, humility, and purifying heart intentions are foundational virtues.",
      "The divine rescue of Isa refutes historical falsehoods and confirms Allah's ultimate protection for His messengers."
    ],
    keyLessonsUrdu: [
      "حضرت عیسیٰ علیہ السلام اللہ کے معزز بندے اور رسول ہیں، نہ وہ خدا ہیں اور نہ خدا کے بیٹے؛ الوہیت صرف اللہ کے لیے ہے۔",
      "معجزات خالصتاً 'اللہ کے اذن' سے ظاہر ہوتے ہیں تاکہ نبوت کی سچائی ثابت ہو، کوئی انسان بذاتِ خود مختار نہیں۔",
      "زہد، مساکین پر شفقت، نفسانی پاکیزگی اور باطنی تقویٰ مسیح علیہ السلام کی مبارک تعلیمات کا نچوڑ ہیں۔",
      "عیسیٰ علیہ السلام کا رفعِ آسمانی اس بات کا قطعی ثبوت ہے کہ اللہ اپنے برگزیدہ رسولوں کو دشمنوں کی سازشوں سے بچاتا ہے۔"
    ],
    authenticSources: "Surah Maryam (19:16–36), Surah Ali 'Imran (3:45–59), Surah An-Nisa (4:157–159), Surah Al-Ma'idah (5:110–120), Sahih al-Bukhari 3448"
  },
  {
    id: "muhammad",
    number: 25,
    nameEn: "25. Prophet Muhammad (صَلَّىٰ ٱللَّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ) — The Seal of the Prophets & Universal Mercy",
    nameUrdu: "۲۵. خاتم النبیین حضرت محمد مصطفیٰ ﷺ — رحمۃ للعالمین اور رسولِ آخر الزماں",
    titleEn: "The Final Revelation, Universal Message to Mankind, and Sublime Moral Character",
    titleUrdu: "نبوت کا اختتام، عالمگیر رسالت، اسوۂ حسنہ اور دینِ کامل کی تکمیل",
    arabicHonorific: "خَاتَمُ النَّبِيِّينَ وَسَيِّدُ الْمُرْسَلِينَ ﷺ",
    isUlulAzm: true,
    quranMentionsCount: "Mentioned 4 times as 'Muhammad', once as 'Ahmad', and addressed throughout the entire Quran",
    dedicatedGuideUrl: "/seerah-of-prophet-muhammad",
    keyQuranVerses: [
      {
        arabic: "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا",
        transEn: "Muhammad is not the father of [any] one of your men, but [he is] the Messenger of Allah and the Seal of the Prophets. And ever is Allah, of all things, Knowing.",
        transUrdu: "محمد (ﷺ) تمہارے مَردوں میں سے کسی کے باپ نہیں ہیں لیکن وہ اللہ کے رسول ہیں اور خاتم النبیین (تمام نبیوں کے سلسلے کو ختم فرمانے والے) ہیں، اور اللہ ہر چیز کا خوب جاننے والا ہے۔",
        ref: "Surah Al-Ahzab 33:40"
      },
      {
        arabic: "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ",
        transEn: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
        transUrdu: "اور ہم نے آپ کو نہیں بھیجا مگر تمام جہانوں کے لیے رحمت بنا کر۔",
        ref: "Surah Al-Anbiya 21:107"
      },
      {
        arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
        transEn: "And indeed, you are of a great moral character.",
        transUrdu: "اور بے شک آپ اخلاق کے اعلیٰ ترین مرتبے پر فائز ہیں۔",
        ref: "Surah Al-Qalam 68:4"
      }
    ],
    coreNarrativeEn: "Prophet Muhammad ﷺ is the final Messenger and the Seal of the Prophets (Khatam an-Nabiyyin) sent to all humanity and jinn. Born in Makkah in 570 CE, orphaned at a young age, he was known throughout Arabia as Al-Sadiq (The Truthful) and Al-Amin (The Trustworthy). At age 40, in the Cave of Hira, the first revelation of the Holy Quran descended upon him through Angel Jibreel ('Iqra!'). For 13 years in Makkah, he patiently preached pure Tawheed in the face of brutal persecution, economic boycotts, and personal attacks. Following the miraculous Night Journey and Ascension (Al-Isra wal-Mi'raj), he made the historic Hijrah to Madinah, establishing a just, multi-religious society based on the Constitution of Madinah. Over 23 years, the Quran was revealed in full, culminating in the triumphant, bloodless liberation of Makkah where he pardoned his former oppressors: 'Go, for you are free.' In the Farewell Pilgrimage, he delivered his historic sermon establishing human equality regardless of race or ethnicity. His life is the living embodiment of the Quran (Khuluquhul Quran), sealing all previous prophetic messages.",
    coreNarrativeUrdu: "حضرت محمد مصطفیٰ ﷺ اللہ تعالیٰ کے آخری رسول اور خاتم النبیین ہیں جنہیں قیامت تک آنے والے تمام انسانوں اور جنوں کے لیے مبعوث فرمایا گیا۔ آپ ۵۷۰ء میں مکہ مکرمہ میں پیدا ہوئے، بچپن ہی میں یتیم ہوئے اور جوانی میں 'الصادق' اور 'الامین' کے مبارک القاب سے جانے گئے۔ چالیس سال کی عمر میں غارِ حرا میں حضرت جبرائیل کے ذریعے پہلی وحی (اقْرَأْ) نازل ہوئی۔ مکہ کے ۱۳ سالہ دور میں مشرکین کے بدترین مظالم اور مقاطعہ کے باوجود عزم و صبر کے ساتھ توحید کی دعوت دی گئی۔ سفرِ معراج میں پانچ وقت کی نماز کا تحفہ ملا، پھر حکمِ الٰہی سے مدینہ منورہ ہجرت فرمائی اور تاریخ کی پہلی اسلامی اور عدل پر مبنی فلاحی ریاست کی بنیاد رکھی۔ ۲۳ سال کے عرصے میں قرآنِ کریم کی تکمیل ہوئی۔ فتحِ مکہ کے موقع پر خون کا ایک قطرہ بہائے بغیر اپنے جانی دشمنوں کو 'اذْهَبُوا فَأَنْتُمُ الطُّلَقَاءُ' (جاؤ تم سب آزاد ہو) کہہ کر معاف فرما دیا۔ خطبۂ حجۃ الوداع میں رنگ، نسل اور زبان کے امتیازات مٹا کر انسانی مساوات کا منشور عطا فرمایا۔ آپ کی مبارک حیات قرآن کا عملی پیکر ہے۔",
    keyLessonsEn: [
      "Khatam an-Nabiyyin: Prophethood is permanently sealed and completed; no new prophet or revelation will follow.",
      "The Prophet's sublime character (Khuluq 'Azim) is the universal, timeless model (Uswah Hasanah) for personal and public life.",
      "Universal human equality: piety and moral character are the sole measures of human worth before Allah.",
      "Patience in adversity, forgiveness at victory, and constant mercy toward creation reflect true faith."
    ],
    keyLessonsUrdu: [
      "عقیدۂ ختمِ نبوت: رسالت اور نبوت کا مبارک سلسلہ حضرت محمد ﷺ پر ہمیشہ کے لیے مکمل ہو چکا ہے، اب کوئی نیا نبی نہیں آئے گا۔",
      "آپ کا اسوۂ حسنہ زندگی کے ہر شعبے (اخلاق، سیاست، معاشرت، تجارت اور خاندان) میں تاقیامت مشعلِ راہ ہے۔",
      "اسلام میں رنگ و نسل یا حسب و نسب کی کوئی برتری نہیں، عزت کی بنیاد صرف اور صرف تقویٰ اور کردار ہے۔",
      "تکلیف پر صبر اور غلبے کے وقت معافی و رحمت ہی دینِ حق کا اصل جوہر ہے۔"
    ],
    authenticSources: "Surah Al-Ahzab (33:40), Surah Al-Anbiya (21:107), Surah Al-Fath (48:28–29), Surah Al-Qalam (68:4), Sahih al-Bukhari 1, Sahih Muslim 2286"
  }
];

export const PROPHET_FAQS: ProphetFaq[] = [
  {
    qEn: "How many Prophets were sent by Allah in total, and how many are named in the Quran?",
    qUrdu: "اللہ تعالیٰ نے کل کتنے انبیاء و رسل مبعوث فرمائے، اور قرآن میں کتنے نام آئے ہیں؟",
    aEn: "The Quran mentions exactly 25 Prophets and Messengers by name. Regarding the total number sent throughout human history, a widely narrated Hadith in Musnad Ahmad (22288) and Sahih Ibn Hibban records that Prophet Muhammad ﷺ stated there were 124,000 Prophets, among whom 313 (or 315) were Messengers (Rusul). Classical Islamic scholars explain that Muslims are obligated to believe in all Prophets sent by Allah, both those whose names were revealed in the Quran and those whose names were not (Surah Ghafir 40:78).",
    aUrdu: "قرآن مجید میں بالکل ۲۵ جلیل القدر انبیاء و رسل کے اسماء گرامی صراحتاً مذکور ہیں۔ کل تعداد کے بارے میں مسند احمد (۲۲۲۸۸) اور صحیح ابن حبان میں ایک روایت ہے کہ حضور نبی کریم ﷺ نے ارشاد فرمایا کہ ایک لاکھ چوبیس ہزار انبیاء مبعوث ہوئے جن میں سے ۳۱۳ (یا ۳۱۵) رسول تھے۔ اہلِ علم فرماتے ہیں کہ ہر مسلمان پر فرض ہے کہ وہ ان تمام انبیاء پر اجمالی ایمان رکھے جن کے نام قرآن میں آئے یا نہیں آئے (سورۃ غافر ۴۰:۷۸)۔",
    ref: "Surah Ghafir 40:78; Musnad Ahmad 22288"
  },
  {
    qEn: "What is the difference between a Prophet (Nabi) and a Messenger (Rasul)?",
    qUrdu: "نبی اور رسول کے درمیان کیا فرق ہے؟",
    aEn: "According to mainstream Islamic scholarship (including Ibn Taymiyyah, Ibn Kathir, and modern scholars): A Messenger (Rasul) is commissioned with a new legal code (Shari'ah) or a newly revealed Scripture to a people who predominantly disbelieve or reject the truth. A Prophet (Nabi) is commissioned to preach, revive, and confirm the existing Shari'ah of an earlier Messenger. Thus, every Rasul is a Nabi, but not every Nabi is a Rasul. The highest ranking among them are the five 'Ulul Azm' (Possessors of Great Resolve): Nuh, Ibrahim, Musa, Isa, and Muhammad ﷺ.",
    aUrdu: "جمہور علمائے اسلام کی تحقیق کے مطابق: 'رسول' وہ ہوتا ہے جسے نئی شریعت یا نئی کتاب دی جائے اور وہ عمومی طور پر ایسی قوم کی طرف بھیجا جائے جو منکر یا سرکش ہو۔ 'نبی' وہ برگزیدہ ہستی ہے جسے اللہ وحی عطا فرمائے اور وہ پہلے سے موجود شریعت کی تجدید و نفاذ کا کام کرے (جیسے بنی اسرائیل کے انبیاء تورات کے احکام نافذ کرتے تھے)۔ پس ہر رسول نبی ہوتا ہے، لیکن ہر نبی رسول نہیں ہوتا۔ ان میں سب سے اعلیٰ مقام 'اولوا العزم' انبیاء (نوح، ابراہیم، موسیٰ، عیسیٰ اور محمد ﷺ) کا ہے۔",
    ref: "Surah Al-Ahzab 33:7; Majmu' al-Fatawa 10/290"
  },
  {
    qEn: "Who are the 'Ulul 'Azm (Possessors of Great Resolve) among the Messengers?",
    qUrdu: "اولوا العزم من الرسل کون سے پانچ جلیل القدر پیغمبر ہیں؟",
    aEn: "The Ulul 'Azm are the five greatest arch-prophets who endured the heaviest trials with supreme patience, steadfastness, and resolve in the service of Allah: Nuh, Ibrahim, Musa, Isa, and Muhammad ﷺ. They are specifically singled out in Surah Al-Ahqaf (46:35) and Surah Al-Ahzab (33:7).",
    aUrdu: "اولوا العزم من الرسل وہ پانچ عظیم ترین پیغمبر ہیں جنہوں نے دینِ حق کی راہ میں سب سے زیادہ مصائب کا سامنا کیا اور بے مثال عزم و استقامت کا مظاہرہ فرمایا: حضرت نوح، حضرت ابراہیم، حضرت موسیٰ، حضرت عیسیٰ اور خاتم النبیین حضرت محمد مصطفیٰ ﷺ۔ ان کا خصوصی تذکرہ سورۃ الاحقاف (۴۶:۳۵) اور سورۃ الاحزاب (۳۳:۷) میں آیا ہے۔",
    ref: "Surah Al-Ahqaf 46:35; Surah Al-Ahzab 33:7"
  },
  {
    qEn: "Are popular folklore stories (Isra'iliyyat) accepted as factual Islamic history?",
    qUrdu: "کیا عوام میں مشہور اسرائیلی روایات اور داستانیں مستند سمجھی جاتی ہیں؟",
    aEn: "No. Islamic scholarship follows a strict rule laid down by Prophet Muhammad ﷺ in Sahih al-Bukhari (4485): 'Do not believe the people of the Scripture and do not disbelieve them; say: We believe in Allah and what was revealed to us.' Stories not explicitly attested in the Quran or authentic Sahih Hadith cannot be taught as dogma or factual creed. Exaggerated folklore (such as mythic physical descriptions of giants or distorted biblical fables) are strictly discarded by authentic scholars.",
    aUrdu: "ہرگز نہیں۔ سیرت اور قصص الانبیاء میں اسلامی اصول بالکل واضح ہے جیسا کہ صحیح بخاری (۴۴۸۵) میں رسول اللہ ﷺ نے فرمایا: 'اہلِ کتاب کی روایات کی نہ بلا تحقیق تصدیق کرو اور نہ بلاوجہ تکذیب؛ کہو کہ ہم اللہ اور جو کچھ نازل ہوا اس پر ایمان لائے'۔ جو واقعہ قرآن اور صحیح حدیث سے ثابت نہ ہو اسے اسلامی عقیدہ یا یقینی تاریخی حقیقت نہیں بنایا جا سکتا۔ مافوق الفطرت لوک کہانیاں اور بے بنیاد اسرائیلی قصے دین کا حصہ نہیں۔",
    ref: "Sahih al-Bukhari 4485; Muqaddimah Ibn Kathir"
  },
  {
    qEn: "Did all 25 Prophets preach the exact same core message?",
    qUrdu: "کیا تمام ۲۵ انبیاء علیہم السلام کا بنیادی پیغام ایک ہی تھا؟",
    aEn: "Yes. Every single Prophet from Adam to Muhammad ﷺ preached the identical core creed: Tawheed (the absolute Oneness of Allah and abandonment of polytheism), accountability in the Akhirah (Hereafter), and moral righteousness. Allah states in Surah Al-Anbiya (21:25): 'And We sent not before you any messenger except that We revealed to him that, There is no deity except Me, so worship Me.' Only the specific legal rulings (such as the number of prayers or dietary regulations) varied across different eras to suit human societal progression.",
    aUrdu: "جی ہاں! حضرت آدم علیہ السلام سے لے کر حضرت محمد ﷺ تک تمام انبیاء کا بنیادی عقیدہ بالکل ایک تھا: یعنی 'توحید' (صرف ایک اللہ کی عبادت اور شرک کی نفی)، آخرت کی جوابدہی اور اعلیٰ اخلاق۔ قرآن میں ارشاد ہے: 'اور ہم نے آپ سے پہلے کوئی رسول نہیں بھیجا مگر اس کی طرف یہی وحی کی کہ میرے سوا کوئی معبود نہیں، پس میری ہی عبادت کرو' (الانبییاء ۲۱:۲۵)۔ صرف شریعت کے جزوی فروعی احکام (جیسے نماز کے اوقات یا حلال و حرام کی بعض جزئیات) مختلف ادوار میں انسانی مصلحت کے تحت تبدیل ہوئے۔",
    ref: "Surah Al-Anbiya 21:25; Sahih al-Bukhari 3443"
  }
];

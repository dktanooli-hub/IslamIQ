export interface FaithArticleItem {
  number: number;
  nameArabic: string;
  nameTransliteration: string;
  nameEn: string;
  nameUrdu: string;
  meaningEn: string;
  meaningUrdu: string;
  quranAyahArabic: string;
  quranAyahUrdu: string;
  quranAyahEn: string;
  quranRef: string;
  hadithTextEn: string;
  hadithTextUrdu: string;
  hadithRef: string;
  keyBeliefsEn: string[];
  keyBeliefsUrdu: string[];
  spiritualImpactEn: string;
  spiritualImpactUrdu: string;
}

export interface FaithGuideFaq {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  reference?: string;
}

export interface FaithGuideData {
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
  foundationalQuranArabic: string;
  foundationalQuranUrdu: string;
  foundationalQuranEn: string;
  foundationalQuranRef: string;
  hadithJibreelArabic: string;
  hadithJibreelUrdu: string;
  hadithJibreelEn: string;
  hadithJibreelRef: string;
  articles: FaithArticleItem[];
  commonMisconceptions: Array<{
    misconceptionEn: string;
    misconceptionUrdu: string;
    realityEn: string;
    realityUrdu: string;
    reference?: string;
  }>;
  faqs: FaithGuideFaq[];
  internalLinks: Array<{
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
    path: string;
    tabId: string;
  }>;
}

export const SIX_ARTICLES_OF_FAITH_DATA: FaithGuideData = {
  seoTitleEn: "6 Articles of Faith in Islam (Arkan al-Iman) Explained | IslamIQ",
  seoTitleUrdu: "اسلام کے چھ بنیادی ارکانِ ایمان کی مکمل وضاحت | اسلام آئی کیو",
  seoDescEn: "In-depth guide to the 6 Articles of Faith (Iman) in Islam: Belief in Allah, Angels, Books, Prophets, Day of Judgment, and Divine Decree (Qadr) with Quranic and Hadith proofs.",
  seoDescUrdu: "اسلام کے ۶ بنیادی ارکانِ ایمان: اللہ تعالیٰ، فرشتے، آسمانی کتابیں، انبیاء کرام، یومِ آخرت اور تقدیر پر ایمان کی مستند قرآنی و نبوی دلائل کے ساتھ تفصیلی رہنمائی۔",
  canonicalPath: "/six-articles-of-faith",
  heroBadgeEn: "Foundations of Creed (Aqeedah)",
  heroBadgeUrdu: "ایمانیات و عقائدِ اسلام",
  h1En: "The 6 Articles of Faith in Islam (Arkan al-Iman)",
  h1Urdu: "اسلام کے چھ ارکانِ ایمان (عقائدِ اسلامیہ کی جامع تشریح)",
  introEn: "In Islamic theology, 'Iman' (faith) is the firm, unwavering conviction of the heart that finds expression in speech and righteous action. While the 5 Pillars of Islam govern outer actions of worship, the 6 Articles of Faith (Arkan al-Iman) constitute the spiritual and intellectual cornerstone of every Muslim's internal belief system. Grounded in the Quran and the renowned Hadith of Jibreel (Gabriel), these six tenets shape our worldview, purpose, and relationship with our Creator.",
  introUrdu: "اسلامی عقائد میں 'ایمان' دل کے پختہ یقین، زبان کے اقرار اور اعضاء کے نیک اعمال کا نام ہے۔ جہاں اسلام کے پانچ ارکان ظاہری عبادات سے متعلق ہیں، وہیں ایمان کے چھ بنیادی ارکان انسان کے باطنی اور فکری عقیدے کی بنیاد ہیں۔ قرآنِ کریم اور مشہورِ زمانہ 'حدیثِ جبریل' میں ان چھ بنیادی ستونوں کو تفصیل کے ساتھ واضح فرمایا گیا ہے جو انسان کی زندگی، مقصد اور آخرت کی کامیابی کا تعین کرتے ہیں۔",
  foundationalQuranArabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ",
  foundationalQuranUrdu: "رسول اس پر ایمان لائے جو ان کے رب کی طرف سے ان پر نازل ہوا اور مؤمنین بھی۔ سب اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر اور اس کے رسولوں پر ایمان لائے، (اور کہتے ہیں کہ) ہم اس کے رسولوں میں سے کسی کے درمیان تفریق نہیں کرتے۔",
  foundationalQuranEn: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], 'We make no distinction between any of His messengers.'",
  foundationalQuranRef: "Surah Al-Baqarah (2:285)",
  hadithJibreelArabic: "قَالَ: فَأَخْبِرْنِي عَنِ الإِيمَانِ، قَالَ: «أَنْ تُؤْمِنَ بِاللَّهِ، وَمَلائِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ»",
  hadithJibreelUrdu: "حضرت جبریل علیہ السلام نے عرض کیا: مجھے ایمان کے بارے میں بتائیے؟ آپ ﷺ نے فرمایا: 'تم اللہ پر، اس کے فرشتوں پر، اس کی کتابوں پر، اس کے رسولوں پر، یومِ آخرت پر اور تقدیر کے اچھے اور برے ہونے پر ایمان رکھو۔'",
  hadithJibreelEn: "Jibreel said: 'Inform me about Iman (Faith).' The Prophet ﷺ replied: 'That you affirm your faith in Allah, His angels, His books, His messengers, and the Last Day, and that you believe in the Divine Decree (Qadr), both its good and its apparent evil.'",
  hadithJibreelRef: "Sahih Muslim 8",
  articles: [
    {
      number: 1,
      nameArabic: "الإِيمَانُ بِاللَّهِ",
      nameTransliteration: "Al-Imanu billah",
      nameEn: "1. Belief in Allah (Tawheed)",
      nameUrdu: "۱۔ اللہ تعالیٰ کی ذات و صفات پر ایمان (توحید)",
      meaningEn: "Firm belief in Allah's singular existence, absolute Lordship (Rububiyyah), exclusive right to all worship (Uluhiyyah), and His perfect, uncreated Names and Attributes (Asma wa Sifat) without likening Him to creation.",
      meaningUrdu: "اللہ تعالیٰ کے وجود، اس کی ربوبیت، اس کی عبادت میں یکتائی اور اس کے تمام اسمائے حسنیٰ و کامل صفات پر بغیر کسی تمثیل و تاویل کے پختہ یقین رکھنا۔",
      quranAyahArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      quranAyahUrdu: "کہہ دیجیے کہ وہ اللہ ایک ہے، اللہ بے نیاز ہے، نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے، اور کوئی اس کے برابر کا نہیں ہے۔",
      quranAyahEn: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'",
      quranRef: "Surah Al-Ikhlas (112:1-4)",
      hadithTextEn: "The Prophet ﷺ said: 'Whoever dies knowing that there is no god worthy of worship except Allah will enter Paradise.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے فرمایا: 'جو شخص اس حال میں فوت ہوا کہ وہ یقین رکھتا تھا کہ اللہ کے سوا کوئی سچا معبود نہیں، وہ جنت میں داخل ہوگا۔'",
      hadithRef: "Sahih Muslim 26",
      keyBeliefsEn: [
        "Tawheed ar-Rububiyyah: Acknowledging Allah as the sole Creator, Sustainer, and Sovereign of all creation.",
        "Tawheed al-Uluhiyyah: Directing every act of devotion—prayer, dua, sacrifice, vows—solely to Allah.",
        "Tawheed al-Asma wa-Sifat: Affirming Allah's attributes exactly as revealed in the Quran and authentic Sunnah without denying them (Ta'teel) or comparing them to creatures (Tamtheel).",
        "Rejection of Shirk: Avoiding any association of partners with Allah in His person, power, or worship."
      ],
      keyBeliefsUrdu: [
        "توحیدِ ربوبیت: اللہ تعالیٰ کو تمام کائنات کا اکیلا خالق، مالک، رازق اور مدبر ماننا۔",
        "توحیدِ الوہیت: ہر قسم کی عبادت—نماز، دعا، نذر، نیاز اور توکل—صرف اور صرف اللہ ہی کے لیے مخصوص کرنا۔",
        "توحیدِ اسماء و صفات: اللہ تعالیٰ کے تمام خوبصورت ناموں اور صفات پر جیسا کہ قرآن و سنت میں آیا ہے ایمان لانا۔",
        "شرک سے مکمل اجتناب: اللہ کی ذات، صفات یا حقوقِ بندگی میں کسی مخلوق کو شریک نہ ٹھہرانا۔"
      ],
      spiritualImpactEn: "Instills genuine spiritual freedom, freeing the believer from worshipping created beings and replacing anxiety with unwavering reliance (Tawakkul) on the Supreme Creator.",
      spiritualImpactUrdu: "دل کو مخلوق کے خوف اور غلامی سے آزاد کر کے صرف ایک خالق کی بندگی اور سچے توکل کی دولت بخشتا ہے۔"
    },
    {
      number: 2,
      nameArabic: "الإِيمَانُ بِالْمَلَائِكَةِ",
      nameTransliteration: "Al-Imanu bil-Mala'ikah",
      nameEn: "2. Belief in the Angels (Mala'ikah)",
      nameUrdu: "۲۔ فرشتوں پر ایمان (ملائکہ)",
      meaningEn: "Belief in the noble beings created by Allah from pure light (Nur). They possess intellect and obedience without free will to sin, executing Allah's cosmic and spiritual decrees unceasingly.",
      meaningUrdu: "اللہ تعالیٰ کی اس نوری مخلوق پر ایمان رکھنا جو گناہوں سے پاک ہے، اللہ کے احکامات کی کبھی نافرمانی نہیں کرتی اور کائنات کے انتظامی امور انجام دیتی ہے۔",
      quranAyahArabic: "لَّا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ",
      quranAyahUrdu: "وہ اللہ کے کسی حکم کی نافرمانی نہیں کرتے اور وہی کرتے ہیں جس کا انہیں حکم دیا جاتا ہے۔",
      quranAyahEn: "They do not disobey Allah in what He commands them but do what they are commanded.",
      quranRef: "Surah At-Tahrim (66:6)",
      hadithTextEn: "The Prophet ﷺ said: 'The Angels were created from light, the Jinn were created from a smokeless flame of fire, and Adam was created from that which has been described to you.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے فرمایا: 'فرشتے نور سے پیدا کیے گئے، جنات آگ کے شعلے سے پیدا کیے گئے اور آدم علیہ السلام کو اس مٹی سے پیدا کیا گیا جو تمہیں بتائی گئی ہے۔'",
      hadithRef: "Sahih Muslim 2996",
      keyBeliefsEn: [
        "Jibreel (Gabriel): Entrusted with conveying divine revelation (Wahy) to all Prophets.",
        "Mika'eel (Michael): Appointed over rainfall, nourishment, and vegetation.",
        "Israfeel: Appointed to blow the Trumpet (Soor) marking the Day of Resurrection.",
        "Malak al-Mawt (Angel of Death): Entrusted with taking the souls when their appointed lifespan ends.",
        "Kiraman Katibin (Noble Scribes): Recording every deed, word, and intention of human beings."
      ],
      keyBeliefsUrdu: [
        "حضرت جبریل علیہ السلام: تمام انبیاء کرام تک وحیِ الٰہی پہنچانے کے نگران۔",
        "حضرت میکائیل علیہ السلام: بارش، رزق اور نباتات کے نظام پر مامور۔",
        "حضرت اسرافیل علیہ السلام: قیامت کے دن صور پھونکنے کے ذمہ دار۔",
        "ملک الموت (عزرائیل علیہ السلام): مقررہ وقت پر ارواح قبض کرنے والے فرشتے۔",
        "کراماً کاتبین: انسان کے ہر قول و فعل اور نیکی و بدی کو لکھنے والے معزز فرشتے۔"
      ],
      spiritualImpactEn: "Generates high self-awareness and moral accountability, knowing that two noble scribes accompany you and record every deed in real time.",
      spiritualImpactUrdu: "انسان کے اندر تقویٰ اور نیکی کا جذبہ بیدار کرتا ہے کہ اس کا کوئی بھی بول یا عمل فرشتوں کے قلم سے پوشیدہ نہیں۔"
    },
    {
      number: 3,
      nameArabic: "الإِيمَانُ بِالْكُتُبِ السَّمَاوِيَّةِ",
      nameTransliteration: "Al-Imanu bil-Kutub",
      nameEn: "3. Belief in the Divine Scriptures",
      nameUrdu: "۳۔ آسمانی کتابوں اور صحیفوں پر ایمان",
      meaningEn: "Affirming that Allah revealed authentic scriptures to His messengers as divine guidance and light for humanity in their original pristine texts, with the Quran being the final, incorruptible revelation for all times.",
      meaningUrdu: "اس بات پر ایمان رکھنا کہ اللہ تعالیٰ نے انسانوں کی رہنمائی کے لیے اپنے رسولوں پر کتابیں اور صحیفے نازل فرمائے، اور قرآنِ مجید اللہ کی آخری اور ہمیشہ محفوظ رہنے والی کتاب ہے۔",
      quranAyahArabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
      quranAyahUrdu: "بے شک ہم نے ہی اس ذکر (قرآن) کو نازل فرمایا اور یقیناً ہم ہی اس کی حفاظت کرنے والے ہیں۔",
      quranAyahEn: "Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian.",
      quranRef: "Surah Al-Hijr (15:9)",
      hadithTextEn: "The Prophet ﷺ said: 'The best among you are those who learn the Quran and teach it to others.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے فرمایا: 'تم میں سے بہترین شخص وہ ہے جو قرآن سیکھے اور اسے دوسروں کو سکھائے۔'",
      hadithRef: "Sahih al-Bukhari 5027",
      keyBeliefsEn: [
        "Suhuf (Scrolls): Revealed to Prophet Ibrahim (Abraham) and Musa (Moses).",
        "Tawrat (Torah): The authentic divine revelation given to Prophet Musa (Moses).",
        "Zabur (Psalms): Revealed to Prophet Dawud (David).",
        "Injeel (Gospel): The original divine revelation revealed to Prophet Isa (Jesus), peace be upon him.",
        "The Holy Quran: The final, comprehensive Word of Allah revealed to Prophet Muhammad ﷺ, preserved letter-for-letter without distortion until the end of time."
      ],
      keyBeliefsUrdu: [
        "صحیفے: حضرت ابراہیم اور حضرت موسیٰ علیہم السلام پر نازل ہونے والے اسمانی پیغامات۔",
        "تورات: حضرت موسیٰ علیہ السلام پر نازل کردہ اصل آسمانی کتاب۔",
        "زبور: حضرت داؤد علیہ السلام پر نازل کی گئی کتاب۔",
        "انجیل: حضرت عیسیٰ علیہ السلام پر نازل شدہ اصل الہامی کتاب۔",
        "قرآنِ مجید: اللہ تعالیٰ کا آخری، معجزاتی اور کامل کلام جو حضرت محمد ﷺ پر نازل ہوا اور تحریف سے ہمیشہ محفوظ ہے۔"
      ],
      spiritualImpactEn: "Connects the believer directly with divine wisdom, providing a comprehensive, infallible manual for personal morals, family ethics, law, and spirituality.",
      spiritualImpactUrdu: "انسان کو انسانی قیاس آرائیوں سے نکال کر ربانی علم و حکمت اور حتمی ہدایت سے روشناس کراتا ہے۔"
    },
    {
      number: 4,
      nameArabic: "الإِيمَانُ بِالرُّسُلِ وَالأَنْبِيَاءِ",
      nameTransliteration: "Al-Imanu bir-Rusul",
      nameEn: "4. Belief in the Prophets and Messengers",
      nameUrdu: "۴۔ اللہ کے انبیاء اور رسولوں پر ایمان",
      meaningEn: "Believing that Allah chose upright, truthful human beings as Prophets (Nabiyy) and Messengers (Rasul) to deliver divine guidance, culminating in Prophet Muhammad ﷺ as the Seal of the Prophets (Khatam an-Nabiyyin).",
      meaningUrdu: "اللہ تعالیٰ کے منتخب کردہ برگزیدہ اور معصوم انسانوں پر ایمان لانا جنہوں نے انسانیت تک توحید کا پیغام پہنچایا، اور یہ کہ حضرت محمد ﷺ اللہ کے آخری نبی اور خاتم النبیین ہیں۔",
      quranAyahArabic: "مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ ۗ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ عَلِيمًا",
      quranAyahUrdu: "محمد ﷺ تمہارے مَردوں میں سے کسی کے باپ نہیں ہیں، بلکہ وہ اللہ کے رسول اور خاتم النبیین (آخری نبی) ہیں، اور اللہ ہر چیز کا علم رکھنے والا ہے۔",
      quranAyahEn: "Muhammad is not the father of [any] one of your men, but [he is] the Messenger of Allah and last of the prophets. And ever is Allah, of all things, Knowing.",
      quranRef: "Surah Al-Ahzab (33:40)",
      hadithTextEn: "The Prophet ﷺ said: 'My likeness and that of the prophets before me is like that of a man who built a beautiful house, except for the place of one brick in a corner. People admired it and said, 'Why is this brick not put in its place?' I am that brick, and I am the Seal of the Prophets.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے فرمایا: 'میری اور مجھ سے پہلے انبیاء کی مثال ایسی ہے جیسے کسی شخص نے ایک خوبصورت عمارت بنائی مگر کونے میں ایک اینٹ کی جگہ چھوڑ دی، لوگ اسے دیکھ کر تعجب کرتے۔ پس میں ہی وہ آخری اینٹ ہوں اور میں ہی خاتم النبیین ہوں۔'",
      hadithRef: "Sahih al-Bukhari 3535, Sahih Muslim 2286",
      keyBeliefsEn: [
        "Universal Monotheism: All Prophets, from Adam to Muhammad (peace be upon them all), taught one core religion: worshipping Allah alone without partners.",
        "Infallibility in Message: Prophets were completely protected from lying, betrayal, or distortion in conveying revelation (Ismah).",
        "Honoring All Prophets: Muslims honor and love all 25 prophets mentioned by name in the Quran without disbelieving in any of them.",
        "Finality of Prophethood: Affirming that no new prophet or revelation will ever come after Prophet Muhammad ﷺ until the Day of Judgment."
      ],
      keyBeliefsUrdu: [
        "ایک ہی بنیادی دین: تمام انبیاء کرام (آدم علیہ السلام سے لے کر حضرت محمد ﷺ تک) کی بنیادی دعوت صرف ایک اللہ کی توحید تھی۔",
        "عصمتِ انبیاء: انبیاء کرام گناہوں اور پیغام پہنچانے میں ہر قسم کی خیانت یا غلطی سے پاک ہوتے ہیں۔",
        "تمام انبیاء کا احترام: مسلمان قرآن میں مذکور تمام انبیاء پر یکساں ایمان رکھتے ہیں اور ان میں تفریق نہیں کرتے۔",
        "عقیدہ ختمِ نبوت: حضرت محمد ﷺ پر نبوت و رسالت کا سلسلہ مکمل ہو چکا، آپ کے بعد قیامت تک کوئی نیا نبی نہیں آ سکتا۔"
      ],
      spiritualImpactEn: "Provides practical, tangible role models of patience, justice, mercy, and devotion in real human life rather than abstract philosophies.",
      spiritualImpactUrdu: "انسان کو خیالی فلسفوں کے بجائے صبر، شجاعت، رحمت اور اخلاقِ حسنہ کے عملی اور کامل نمونے عطا کرتا ہے۔"
    },
    {
      number: 5,
      nameArabic: "الإِيمَانُ بِالْيَوْمِ الآخِرِ",
      nameTransliteration: "Al-Imanu bil-Yawmil-Akhir",
      nameEn: "5. Belief in the Day of Judgment (Hereafter)",
      nameUrdu: "۵۔ یومِ آخرت (قیامت اور حساب و کتاب) پر ایمان",
      meaningEn: "Certainty that worldly life is a temporary test that terminates at death, followed by the realm of the grave (Barzakh), the bodily resurrection, cosmic accounting (Hisab), the Scales (Meezan), the Bridge (Sirat), and eternal abode in Paradise (Jannah) or Hellfire (Jahannam).",
      meaningUrdu: "اس بات پر غیر متزلزل یقین کہ یہ دنیا امتحان کی جگہ ہے، موت کے بعد برزخ، قیامت کا دن، دوبارہ جی اٹھنا، نامہ اعمال کا تلنا، پل صراط اور بالآخر جنت یا جہنم کا ابدی ٹھکانہ برحق ہے۔",
      quranAyahArabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
      quranAyahUrdu: "پس جو شخص ذرہ برابر نیکی کرے گا وہ اسے دیکھ لے گا، اور جو شخص ذرہ برابر برائی کرے گا وہ بھی اسے دیکھ لے گا۔",
      quranAyahEn: "So whoever does an atom's weight of good will see it, and whoever does an atom's weight of evil will see it.",
      quranRef: "Surah Az-Zalzalah (99:7-8)",
      hadithTextEn: "The Prophet ﷺ said: 'A wise person is one who holds himself accountable and works for what comes after death, while a foolish person follows his desires and wishes vainly upon Allah.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے فرمایا: 'دانا وہ ہے جو اپنا محاسبہ کرے اور موت کے بعد کی زندگی کے لیے عمل کرے، اور عاجز و نادان وہ ہے جو نفس کی خواہشات کے پیچھے چلے اور اللہ سے جھوٹی امیدیں باندھے۔'",
      hadithRef: "Sunan at-Tirmidhi 2459 (Hasan)",
      keyBeliefsEn: [
        "Al-Qabr (The Grave): The initial stage of the Hereafter where questioning by Munkar and Nakir takes place.",
        "Al-Ba'th (Resurrection): Allah will reconstitute every body and restore life when the Trumpet sounds.",
        "Al-Hisab & Al-Meezan: Absolute justice where deeds are weighed on cosmic Scales without the slightest injustice.",
        "As-Sirat: The razor-thin bridge suspended over Hell leading to the gates of Paradise.",
        "Jannah & Jahannam: Eternal destinations of bliss for righteous believers and divine retribution for unrepentant disbelievers."
      ],
      keyBeliefsUrdu: [
        "عالمِ برزخ: قبر کا مرحلہ جہاں منکر و نکیر کے سوالات اور قبر کی راحت یا عذاب کا سامنا ہوتا ہے۔",
        "بعث بعد الموت: قیامت کے دن صور پھونکے جانے پر تمام انسانوں کا دوبارہ زندہ کیا جانا۔",
        "حساب و کتاب اور میزان: اعمال کا قطعی انصاف کے ساتھ ترازو میں تولا جانا۔",
        "پل صراط: جہنم کے اوپر قائم باریک اور تیز راستہ جس سے تمام انسانوں کو گزرنا ہوگا۔",
        "جنت اور جہنم: اہلِ ایمان اور نیکوکاروں کے لیے ابدی نعمتیں اور سرکشوں کے لیے سزا کا مقام۔"
      ],
      spiritualImpactEn: "Instills ultimate moral purpose and resilience against worldly injustice, knowing that no good deed is wasted and complete divine justice is guaranteed.",
      spiritualImpactUrdu: "دنیا کے مصائب پر صبر اور انسان کے ہر پوشیدہ و ظاہر عمل میں خدا ترسی اور عدل و انصاف کی روح پھونکتا ہے۔"
    },
    {
      number: 6,
      nameArabic: "الإِيمَانُ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ",
      nameTransliteration: "Al-Imanu bil-Qadr",
      nameEn: "6. Belief in Divine Decree (Al-Qadr)",
      nameUrdu: "۶۔ تقدیر کے اچھے اور برے ہونے پر ایمان (القضاء والقدر)",
      meaningEn: "Believing that Allah possesses timeless knowledge of everything, has written all decrees in the Preserved Tablet (Al-Lawh al-Mahfooz), wills everything that occurs, and creates all existence, while granting humans genuine choice and moral accountability.",
      meaningUrdu: "اللہ تعالیٰ کے ازلی علم، لوحِ محفوظ میں ہر بات کے درج ہونے، اللہ کی مشیتِ عامہ اور اس کے خالقِ کائنات ہونے پر ایمان لانا، جبکہ انسان کو ارادہ اور کسبِ عمل کا اختیار دیا گیا ہے۔",
      quranAyahArabic: "إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ",
      quranAyahUrdu: "بے شک ہم نے ہر چیز کو ایک مقررہ اندازے (تقدیر) کے ساتھ پیدا فرمایا ہے۔",
      quranAyahEn: "Indeed, all things We created with predestination.",
      quranRef: "Surah Al-Qamar (54:49)",
      hadithTextEn: "The Prophet ﷺ taught Ibn Abbas: 'Know that what has passed you by was not meant to strike you, and what has struck you was not meant to pass you by.'",
      hadithTextUrdu: "رسول اللہ ﷺ نے حضرت ابن عباس رضی اللہ عنہما سے فرمایا: 'یاد رکھو کہ جو تکلیف تمہیں پہنچی وہ تم سے ٹلنے والی نہیں تھی، اور جو چیز تم سے ٹل گئی وہ تمہیں پہنچنے والی نہیں تھی۔'",
      hadithRef: "Jami` at-Tirmidhi 2516 (Sahih)",
      keyBeliefsEn: [
        "1. Al-Ilm (Divine Knowledge): Allah knows all past, present, and future events in absolute perfection.",
        "2. Al-Kitabah (The Inscription): Allah ordered the Pen to record everything that will exist until the Last Hour in Al-Lawh al-Mahfooz 50,000 years before creation.",
        "3. Al-Mashee'ah (The Will): Whatever Allah wills happens, and whatever He does not will can never occur.",
        "4. Al-Khalq (The Creation): Allah is the sole Creator of all entities, actions, and their outcomes.",
        "Human Free Will: Believing in Qadr does not negate human responsibility; we choose our intentions and actions through our granted moral volition."
      ],
      keyBeliefsUrdu: [
        "۱۔ العلم: اللہ تعالیٰ کا تمام ماضی، حال اور مستقبل کا ازلی اور مکمل علم۔",
        "۲۔ الکتابۃ: کائنات کی تخلیق سے پچاس ہزار سال قبل لوحِ محفوظ میں قلم کے ذریعے ہر چیز کا لکھا جانا۔",
        "۳۔ المشیئۃ: کائنات میں وہی ہوتا ہے جو اللہ چاہتا ہے، اور جو وہ نہ چاہے کبھی نہیں ہو سکتا۔",
        "۴۔ الخلق: اللہ تعالیٰ ہی ہر مخلوق اور ہر سبب و اثر کا پیدا فرمانے والا ہے۔",
        "انسان کا اختیار: تقدیر کا عقیدہ انسانی محنت اور ارادے کو ختم نہیں کرتا بلکہ انسان اپنے ارادے کے مطابق ثواب و عذاب کا مستحق ہوتا ہے۔"
      ],
      spiritualImpactEn: "Provides unshakable peace of mind and resilience; eliminates despair during hardship and protects from arrogance during success.",
      spiritualImpactUrdu: "دل کو بے جا پریشانی اور حسد سے بچاتا ہے؛ مصیبت پر صبر اور نعمت پر عاجزی و شکر گزاری پیدا کرتا ہے۔"
    }
  ],
  commonMisconceptions: [
    {
      misconceptionEn: "Belief in Qadr means humans have no free will and our actions are robotic.",
      misconceptionUrdu: "یہ سمجھنا کہ تقدیر کا مطلب انسان کا مجبورِ محض ہونا ہے اور اعمال میں اس کا کوئی دخل نہیں۔",
      realityEn: "Orthodox Islamic scholarship clarifies that Allah knows our choices before we make them, but He does not compel us against our will. We possess real moral volition and are judged on our intentions and efforts.",
      realityUrdu: "اہلِ سنت کا عقیدہ ہے کہ اللہ کو ہمارے ارادے کا پہلے سے علم ہے مگر وہ ہمیں مجبور نہیں کرتا۔ انسان کو ارادے اور عمل کی آزادی دی گئی ہے جس پر اس کا حساب ہوگا۔",
      reference: "Surah Al-Insan (76:3), Sharh Aqeedah at-Tahawiyyah"
    },
    {
      misconceptionEn: "Muslims worship Prophet Muhammad ﷺ or place him above all divine judgment.",
      misconceptionUrdu: "یہ خیال کرنا کہ مسلمان حضرت محمد ﷺ کی عبادت کرتے ہیں۔",
      realityEn: "Muslims strictly revere Prophet Muhammad ﷺ as a human messenger and servant of Allah ('Abduhu wa Rasuluh). Worship is reserved exclusively for Allah alone.",
      realityUrdu: "مسلمان حضرت محمد ﷺ کو اللہ کا برگزیدہ بندہ اور آخری رسول مانتے ہیں، ہر قسم کی عبادت صرف ایک اللہ کا حق ہے۔",
      reference: "Sahih al-Bukhari 3445"
    },
    {
      misconceptionEn: "Believing in the previous scriptures means we follow them today alongside the Quran.",
      misconceptionUrdu: "یہ گمان کہ سابقہ کتب پر ایمان کا مطلب موجودہ دور میں ان پر عمل کرنا ہے۔",
      realityEn: "Muslims affirm that the original Torah and Gospel were divine, but their modern surviving texts experienced human alterations. The Quran superseded and abrogated previous dispensations as the final universal revelation.",
      realityUrdu: "ہم سابقہ کتب کے اصل الہامی ہونے پر ایمان رکھتے ہیں مگر ان میں انسانی تحریف ہو چکی ہے، اور قرآنِ کریم نے پچھلی تمام شریعتوں کو منسوخ کر دیا ہے۔",
      reference: "Surah Al-Ma'idah (5:48)"
    }
  ],
  faqs: [
    {
      questionEn: "What is the difference between the 5 Pillars of Islam and the 6 Articles of Faith?",
      questionUrdu: "اسلام کے ۵ ارکان اور ۶ ارکانِ ایمان میں بنیادی کیا فرق ہے؟",
      answerEn: "The 5 Pillars of Islam (Shahadah, Salah, Zakat, Sawm, Hajj) represent the outward physical and financial actions of worship. The 6 Articles of Faith (Iman) represent the inward convictions of the heart and mind. In the Hadith of Jibreel, the Prophet ﷺ explained Islam as outward submission and Iman as inner belief.",
      answerUrdu: "اسلام کے ۵ ارکان ظاہری عبادات (کلمہ، نماز، زکوٰۃ، روزہ اور حج) ہیں، جبکہ ایمان کے ۶ ارکان دل کے باطنی اور فکری عقائد ہیں۔ حدیثِ جبریل میں نبی کریم ﷺ نے ان دونوں کے درمیان تفریق واضح فرمائی ہے۔",
      reference: "Sahih Muslim 8"
    },
    {
      questionEn: "Can someone be a Muslim if they reject one of the six articles of faith?",
      questionUrdu: "کیا ان چھ ارکان میں سے کسی ایک کا انکار کرنے والا مسلمان رہ سکتا ہے؟",
      answerEn: "No. By consensus of orthodox Muslim scholars (Ijma), denying any of the six foundational articles of faith removes a person from the fold of Islam, because each pillar is established by definitive Quranic verses and continuous authentic Sunnah.",
      answerUrdu: "نہیں! تمام جید علمائے امت کے متفقہ فیصلے کے مطابق ان چھ بنیادی عقائد میں سے کسی ایک کا بھی انکار کرنا دائرہ اسلام سے خارج کر دیتا ہے کیونکہ یہ قطعی دلائل سے ثابت ہیں۔",
      reference: "Surah An-Nisa (4:136)"
    },
    {
      questionEn: "Does Dua (supplication) change the Divine Decree (Qadr)?",
      questionUrdu: "کیا دعا سے تقدیر بدل سکتی ہے؟",
      answerEn: "Prophet Muhammad ﷺ taught: 'Nothing averts the decree except supplication' (Sunan at-Tirmidhi 2139). Scholars explain this applies to the conditional decree (Al-Qadr al-Mu'allaq) known to angels, where Allah already knew timelessly that the servant would supplicate and granted protection through that very dua.",
      answerUrdu: "نبی کریم ﷺ نے فرمایا: 'دعا کے سوا کوئی چیز تقدیر کے فیصلے کو نہیں ٹال سکتی'۔ علمائے کرام فرماتے ہیں کہ یہ تقدیرِ معلق میں ہوتا ہے اور اللہ کے علم میں پہلے سے تھا کہ بندہ دعا کرے گا اور اس کی دعا سے مصیبت ٹل جائے گی۔",
      reference: "Sunan at-Tirmidhi 2139 (Hasan)"
    },
    {
      questionEn: "How many Prophets were sent to humanity?",
      questionUrdu: "انسانیت کی طرف کل کتنے انبیاء کرام مبعوث کیے گئے؟",
      answerEn: "A well-known narration in Musnad Ahmad (22288) mentions approximately 124,000 prophets, among whom 313 or 315 were messengers. The Quran specifically mentions 25 prophets by name, whom every Muslim must acknowledge.",
      answerUrdu: "مسند احمد کی ایک روایت کے مطابق تقریباً ایک لاکھ چوبیس ہزار انبیاء کرام تشریف لائے جن میں سے ۳۱۳ یا ۳۱۵ رسول تھے۔ قرآنِ مجید میں نام بنام ۲۵ انبیاء کا ذکر آیا ہے۔",
      reference: "Musnad Ahmad 22288, Surah Ghafir (40:78)"
    }
  ],
  internalLinks: [
    {
      titleEn: "The 5 Pillars of Islam Guide",
      titleUrdu: "اسلام کے ۵ بنیادی ارکان",
      descEn: "Explore the outward pillars of worship that translate faith into action.",
      descUrdu: "شہادت، نماز، زکوٰۃ، روزہ اور حج کے تفصیلی احکام۔",
      path: "/5-pillars-of-islam",
      tabId: "5-pillars-of-islam"
    },
    {
      titleEn: "Salah for Beginners Guide",
      titleUrdu: "نوآموزوں کے لیے نماز کی رہنمائی",
      descEn: "Step-by-step introduction to daily prayer for new learners.",
      descUrdu: "ابتدائی سیکھنے والوں کے لیے آسان انداز میں نماز کی تفاصیل۔",
      path: "/salah-for-beginners",
      tabId: "salah-for-beginners"
    },
    {
      titleEn: "Interactive Islamic Quiz",
      titleUrdu: "اسلامی کوئز کھیلیں",
      descEn: "Test and solidify your knowledge of Islamic creed and history.",
      descUrdu: "عقائد، فقہ اور تاریخِ اسلام پر اپنے علم کی آزمائش کریں۔",
      path: "/islamic-quiz",
      tabId: "islamic-quiz"
    },
    {
      titleEn: "Islamic General Knowledge Hub",
      titleUrdu: "اسلامی معلوماتِ عامہ",
      descEn: "Comprehensive questions and verified historical facts.",
      descUrdu: "قرآن، سیرت النبیﷺ اور صحابہ کرام کے بارے میں معلوماتی مضامین۔",
      path: "/islamic-general-knowledge",
      tabId: "islamic-general-knowledge"
    }
  ]
};

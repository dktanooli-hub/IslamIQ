export interface BeginnerSalahStep {
  stepNumber: number;
  postureEn: string;
  postureUrdu: string;
  whatToDoEn: string;
  whatToDoUrdu: string;
  arabicText?: string;
  transliteration?: string;
  meaningEn?: string;
  meaningUrdu?: string;
  beginnerTipEn: string;
  beginnerTipUrdu: string;
}

export interface BeginnerPrayerTableItem {
  prayerNameEn: string;
  prayerNameUrdu: string;
  totalFardRakats: number;
  timeWindowEn: string;
  timeWindowUrdu: string;
  sunnahMuakkadahEn: string;
  sunnahMuakkadahUrdu: string;
}

export interface SalahBeginnerGuideData {
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
  comfortHadithArabic: string;
  comfortHadithUrdu: string;
  comfortHadithEn: string;
  comfortHadithRef: string;
  essentialChecklist: Array<{
    itemEn: string;
    itemUrdu: string;
    whyImportantEn: string;
    whyImportantUrdu: string;
  }>;
  unitsExplainedEn: string;
  unitsExplainedUrdu: string;
  steps: BeginnerSalahStep[];
  prayersTable: BeginnerPrayerTableItem[];
  commonBeginnerWorries: Array<{
    worryEn: string;
    worryUrdu: string;
    reassuranceEn: string;
    reassuranceUrdu: string;
    hadithProof?: string;
  }>;
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

export const SALAH_FOR_BEGINNERS_DATA: SalahBeginnerGuideData = {
  seoTitleEn: "Salah for Beginners: Complete Step-by-Step Namaz Guide | IslamIQ",
  seoTitleUrdu: "ابتدائی سیکھنے والوں کے لیے نماز کا آسان طریقہ | اسلام آئی کیو",
  seoDescEn: "Gentle, comprehensive beginner's guide to Islamic prayer (Salah / Namaz). Learn exact postures, simple phonetic transliterations, translations, rakat counts, and overcome common beginner anxieties.",
  seoDescUrdu: "نماز شروع کرنے والوں اور نو مسلم حضرات کے لیے آسان ترین رہنمائی۔ ارکانِ نماز، عربی تلفظ، ترجمہ، رکعتوں کا چارٹ اور ابتدائی غلطیوں سے بچنے کے آسان طریقے مستند احادیث کی روشنی میں۔",
  canonicalPath: "/salah-for-beginners",
  heroBadgeEn: "Beginner's Gentle Guide",
  heroBadgeUrdu: "ابتدائی سیکھنے والوں کے لیے",
  h1En: "Salah for Beginners: A Step-by-Step Gentle Guide to Namaz",
  h1Urdu: "نوآموزوں کے لیے نماز سیکھنے کا آسان مسنون طریقہ",
  introEn: "Starting your journey with Salah (the daily Islamic prayer) is one of the most rewarding milestones in a believer's life. If you are a new Muslim (revert) or returning to prayer after time away, it is normal to feel overwhelmed by Arabic words or precise physical postures. Islam is a religion of ease and gradual progress. Allah rewards your sincere intention and exertion at every step.",
  introUrdu: "نماز کا آغاز ہر مسلمان کی زندگی کا سب سے پرسکون اور بابرکت موڑ ہے۔ اگر آپ نو مسلم ہیں یا نئے سرے سے نماز سیکھ رہے ہیں، تو عربی تلفظ یا حرکات کی درستگی پر پریشان نہ ہوں۔ دینِ اسلام میں آسانی اور درجہ بدرجہ سیکھنے کی ترغیب ہے۔ اللہ تعالیٰ آپ کی مخلص نیت اور ہر کوشش پر اجر عطا فرماتا ہے۔",
  comfortHadithArabic: "«إِنَّ الدِّينَ يُسْرٌ، وَلَنْ يُشَادَّ الدِّينَ أَحَدٌ إِلَّا غَلَبَهُ، فَسَدِّدُوا وَقَارِبُوا وَأَبْشِرُوا»",
  comfortHadithUrdu: "رسول اللہ ﷺ نے فرمایا: 'بے شک دین آسان ہے، اور جو شخص دین میں شدت پیدا کرے گا دین اس پر غالب آ جائے گا۔ پس اعتدال اختیار کرو، قریب رہو اور خوشخبری سنو۔'",
  comfortHadithEn: "The Prophet Muhammad ﷺ said: 'Indeed, the religion is easy. No one overburdens himself in religion except that it overwhelms him. So follow the middle course, do the best you can, and rejoice with good news.'",
  comfortHadithRef: "Sahih al-Bukhari 39",
  essentialChecklist: [
    {
      itemEn: "1. Ritual Purity (Wudu)",
      itemUrdu: "۱۔ وضو اور طہارت",
      whyImportantEn: "Perform the basic ablution before standing for prayer. Without purity of body and clothes, prayer cannot begin.",
      whyImportantUrdu: "نماز سے قبل جسم، کپڑوں اور جگہ کی پاکیزگی اور مسنون وضو کرنا لازمی شرط ہے۔"
    },
    {
      itemEn: "2. Covering the Awrah (Modest Attire)",
      itemUrdu: "۲۔ ستر ڈھانپنا (لباس کی شرائط)",
      whyImportantEn: "Men must cover at least from navel to knee (preferably shoulders as well). Women cover the entire body except face and hands.",
      whyImportantUrdu: "مَرد کے لیے ناف سے گھٹنے تک (بہتر ہے کندھے بھی ڈھکے ہوں)، جبکہ عورت کے لیے چہرے اور ہتھیلیوں کے سوا پورا جسم باوقار طریقے سے ڈھانپنا ضروری ہے۔"
    },
    {
      itemEn: "3. Facing the Qiblah (Direction of Makkah)",
      itemUrdu: "۳۔ قبلہ رخ ہونا (خانہ کعبہ کی سمت)",
      whyImportantEn: "Align your body toward the Kaaba in Makkah. Use our in-app interactive Qibla Finder if you are unsure of the direction.",
      whyImportantUrdu: "نماز میں خانہ کعبہ کی طرف منہ کرنا ضروری ہے۔ رہنمائی کے لیے ہمارے قبلہ فائنڈر ٹول سے مدد حاصل کی جا سکتی ہے۔"
    },
    {
      itemEn: "4. Correct Prayer Time",
      itemUrdu: "۴۔ نماز کا وقت ہونا",
      whyImportantEn: "Each prayer must be performed inside its designated time window (Fajr, Dhuhr, Asr, Maghrib, Isha).",
      whyImportantUrdu: "ہر نماز کو اس کے شرعی وقت کے اندر ادا کرنا لازمی ہے۔"
    }
  ],
  unitsExplainedEn: "A single unit of prayer is called a 'Rakat' (plural: Rak'at). Every complete prayer consists of either 2, 3, or 4 Rak'at. Think of a Rakat as a cycle: you stand, bow (Ruku), stand again, prostrate twice (Sujud), and sit. Once you master 1 Rakat, you can perform any prayer!",
  unitsExplainedUrdu: "نماز کی اکائی کو 'رکعت' کہا جاتا ہے۔ ہر نماز ۲، ۳ یا ۴ رکعتوں پر مشتمل ہوتی ہے۔ ایک رکعت ایک مکمل چکر کی مانند ہے: آپ کھڑے ہوتے ہیں، رکوع کرتے ہیں، دوبارہ کھڑے ہوتے ہیں، دو سجدے کرتے ہیں اور بیٹھتے ہیں۔ جب آپ ایک رکعت کا طریقہ سیکھ لیتے ہیں تو آپ تمام نمازیں بآسانی ادا کر سکتے ہیں!",
  steps: [
    {
      stepNumber: 1,
      postureEn: "Niyyah (Intention) & Takbir al-Ihram",
      postureUrdu: "نیت اور تکبیرِ تحریمہ",
      whatToDoEn: "Stand quietly facing the Qiblah. Form the intention in your heart for the specific prayer. Raise both hands to shoulder or earlobe level and say 'Allahu Akbar'.",
      whatToDoUrdu: "قبلہ رخ باادب کھڑے ہو جائیں۔ دل میں مخصوص نماز کی نیت کریں۔ دونوں ہاتھ کندھوں یا کانوں کی لو تک اٹھائیں اور 'اللہ اکبر' کہیں۔",
      arabicText: "اللهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      meaningEn: "Allah is the Greatest.",
      meaningUrdu: "اللہ سب سے بڑا ہے۔",
      beginnerTipEn: "You do not need to vocalize a complex Arabic formula for Niyyah; the conscious awareness of your heart is sufficient.",
      beginnerTipUrdu: "زبان سے لمبی نیت کے الفاظ بولنا لازمی نہیں، دل میں یہ ارادہ کافی ہے کہ میں فلاں وقت کی نماز ادا کر رہا ہوں۔"
    },
    {
      stepNumber: 2,
      postureEn: "Qiyam: The Standing Posture & Recitation",
      postureUrdu: "قیام: ہاتھ باندھنا اور تلاوت",
      whatToDoEn: "Place your right hand over your left forearm upon your chest or below your navel. Look at the place of prostration. Recite the opening dua (optional for beginners), followed by Surah Al-Fatiha, which is mandatory.",
      whatToDoUrdu: "دائیں ہاتھ کو بائیں پر سینے یا ناف کے نیچے باندھ لیں۔ نگاہیں سجدے کی جگہ پر رکھیں۔ سورۃ الفاتحہ پڑھنا ہر رکعت میں فرض ہے۔",
      arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      transliteration: "Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil-'aalameen. Ar-Rahmanir-Raheem. Maliki Yawmid-Deen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas-Siraatal-Mustaqeem. Siraatal-ladheena an'amta 'alayhim, ghayril-maghdoobi 'alayhim wa lad-daalleen. (Ameen)",
      meaningEn: "In the Name of Allah, the Most Compassionate, the Most Merciful. All praise is due to Allah, Lord of all worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense. You alone we worship and You alone we ask for help. Guide us to the straight path. The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.",
      meaningUrdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ نہایت مہربان، بہت رحم فرمانے والا ہے۔ روزِ جزا کا مالک ہے۔ ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔ ہمیں سیدھے راستے پر چلا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب کیا گیا اور نہ گمراہوں کا۔ (آمین)",
      beginnerTipEn: "If you have not yet memorized Surah Al-Fatiha, you may read it from a sheet of paper placed in front of you, or recite basic Dhikr: 'SubhanAllah, Alhamdulillah, La ilaha illallah, Allahu Akbar'.",
      beginnerTipUrdu: "اگر ابھی تک سورۃ الفاتحہ یاد نہیں ہوئی تو سامنے کاغذ رکھ کر دیکھ کر پڑھ سکتے ہیں یا 'سبحان اللہ، الحمد للہ، لا الہ الا اللہ، اللہ اکبر' تسبیح پڑھ لیں۔"
    },
    {
      stepNumber: 3,
      postureEn: "Ruku: The Bowing Posture",
      postureUrdu: "رکوع: جھکنا اور اللہ کی تسبیح",
      whatToDoEn: "Say 'Allahu Akbar' and bend your back at a 90-degree angle, placing your palms on your knees. Keep your back flat and gaze between your feet. Praise Allah 3 times.",
      whatToDoUrdu: "اللہ اکبر کہتے ہوئے جھک جائیں، دونوں ہاتھ گھٹنوں پر رکھیں، کمر سیدھی رکھیں اور تین مرتبہ تسبیح پڑھیں۔",
      arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      transliteration: "Subhana Rabbiyal-'Azeem (3 times)",
      meaningEn: "Glory be to my Lord, the Magnificent.",
      meaningUrdu: "پاک ہے میرا پروردگار جو بڑی عظمت والا ہے۔ (۳ بار)",
      beginnerTipEn: "Do not rush this posture; pause long enough so every joint rests peacefully before rising.",
      beginnerTipUrdu: "رکوع میں جلدی نہ کریں، اتنی دیر ٹھہریں کہ تمام اعضاء پرسکون ہو جائیں۔"
    },
    {
      stepNumber: 4,
      postureEn: "Qawmah: Rising from Bowing",
      postureUrdu: "قومہ: رکوع سے سیدھا کھڑا ہونا",
      whatToDoEn: "Stand up straight from bowing while raising your hands or letting them rest at your sides. Say the praises of Allah.",
      whatToDoUrdu: "رکوع سے سیدھے کھڑے ہوں اور اللہ تعالیٰ کی حمد و ثناء بیان کریں۔",
      arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا وَلَكَ الْحَمْدُ",
      transliteration: "Sami'Allahu liman hamidah. Rabbana wa lakal-hamd.",
      meaningEn: "Allah hears the one who praises Him. Our Lord, and to You belongs all praise.",
      meaningUrdu: "اللہ نے اس کی سن لی جس نے اس کی تعریف کی۔ اے ہمارے رب! تیرے ہی لیے تمام تعریفیں ہیں۔",
      beginnerTipEn: "Stand fully upright for at least a few seconds before going down into Sujud.",
      beginnerTipUrdu: "سجدے میں جانے سے پہلے چند سیکنڈ سیدھے اطمینان سے کھڑے ہوں۔"
    },
    {
      stepNumber: 5,
      postureEn: "Sujud: The Prostration",
      postureUrdu: "سجدہ: عاجزی اور قربِ الٰہی",
      whatToDoEn: "Say 'Allahu Akbar' and drop to prostration. Seven body parts must touch the ground: forehead and nose together, both palms, both knees, and the toes of both feet.",
      whatToDoUrdu: "اللہ اکبر کہتے ہوئے سجدے میں جائیں۔ سات اعضاء زمین پر لگیں: پیشانی اور ناک، دونوں ہتھیلیاں، دونوں گھٹنے، اور دونوں پاؤں کی انگلیاں۔",
      arabicText: "سُبْحَانَ رَبِّيَ الأَعْلَى",
      transliteration: "Subhana Rabbiyal-A'la (3 times)",
      meaningEn: "Glory be to my Lord, the Most High.",
      meaningUrdu: "پاک ہے میرا پروردگار جو سب سے بلند تر ہے۔ (۳ بار)",
      beginnerTipEn: "This is the closest a human can ever be to Allah. Feel free to make personal sincere prayers in your heart during Sujud.",
      beginnerTipUrdu: "سجدے کی حالت میں انسان اپنے رب کے سب سے زیادہ قریب ہوتا ہے، اس وقت دل کی گہرائیوں سے دعا مانگیں۔"
    },
    {
      stepNumber: 6,
      postureEn: "Jalsah: Sitting Between Two Prostrations",
      postureUrdu: "جلسہ: دو سجدوں کے درمیان بیٹھنا",
      whatToDoEn: "Rise from prostration saying 'Allahu Akbar' and sit peacefully on your folded left foot with right foot upright. Make the brief supplication for forgiveness.",
      whatToDoUrdu: "اللہ اکبر کہہ کر سیدھے بیٹھ جائیں اور دونوں سجدوں کے درمیان بخشش کی دعا کریں۔",
      arabicText: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
      transliteration: "Rabbigh-fir lee, Rabbigh-fir lee",
      meaningEn: "My Lord, forgive me. My Lord, forgive me.",
      meaningUrdu: "اے میرے رب! مجھے بخش دے، اے میرے رب! مجھے بخش دے۔",
      beginnerTipEn: "Never combine two prostrations like a pecking bird; the sitting pause in between is an essential pillar.",
      beginnerTipUrdu: "دونوں سجدوں کے درمیان اطمینان سے بیٹھنا واجب ہے، جلدی جلدی سجدے نہ کریں۔"
    },
    {
      stepNumber: 7,
      postureEn: "Tashahhud (At-Tahiyyat) & Durood",
      postureUrdu: "قعدہ: تشہد اور درود شریف پڑھنا",
      whatToDoEn: "In the final sitting of the prayer, sit upright and recite the Tashahhud testimony and Salawat upon Prophet Muhammad ﷺ.",
      whatToDoUrdu: "آخری رکعت کے اختتام پر بیٹھ کر تشہد (التحیات) اور درودِ ابراہیمی پڑھیں۔",
      arabicText: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu 'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-saliheen. Ash-hadu alla ilaha illallah, wa ash-hadu anna Muhammadan 'abduhu wa rasooluh.",
      meaningEn: "All greetings, prayers and good things belong to Allah. Peace be upon you, O Prophet, and Allah's mercy and blessings. Peace be upon us and upon Allah's righteous servants. I testify that none is worthy of worship except Allah, and I testify that Muhammad is His servant and messenger.",
      meaningUrdu: "تمام زبانی، بدنی اور مالی عبادتیں اللہ کے لیے ہیں۔ سلام ہو آپ پر اے نبی اور اللہ کی رحمت اور اس کی برکتیں۔ سلامتی ہو ہم پر اور اللہ کے تمام نیک بندوں پر۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور گواہی دیتا ہوں کہ محمد ﷺ اللہ کے بندے اور رسول ہیں۔",
      beginnerTipEn: "Raise your right index finger slightly when reciting 'Ash-hadu alla ilaha illallah' to affirm the Oneness of God.",
      beginnerTipUrdu: "کلمہ شہادت پڑھتے وقت شہادت کی انگلی اٹھا کر توحید کا اقرار کریں۔"
    },
    {
      stepNumber: 8,
      postureEn: "Tasleem: The Concluding Salutations",
      postureUrdu: "سلام پھیرنا: نماز کا اختتام",
      whatToDoEn: "Turn your face to the right shoulder and say the Salam. Then turn your face to the left shoulder and repeat it. Your prayer is now complete!",
      whatToDoUrdu: "اپنا چہرہ دائیں کندھے کی طرف موڑ کر سلام کہیں، پھر بائیں کندھے کی طرف موڑ کر سلام کہیں۔ نماز مکمل ہو گئی۔",
      arabicText: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
      transliteration: "As-salamu 'alaykum wa rahmatullah",
      meaningEn: "May the peace and mercy of Allah be upon you.",
      meaningUrdu: "تم پر سلامتی اور اللہ کی رحمت ہو۔",
      beginnerTipEn: "Greet the angels and fellow believers on your right and left with a calm, gentle tone.",
      beginnerTipUrdu: "دائیں اور بائیں جانب فرشتوں اور نمازیوں کو سلامتی کی دعا کے ساتھ نماز ختم کریں۔"
    }
  ],
  prayersTable: [
    {
      prayerNameEn: "Fajr (Dawn)",
      prayerNameUrdu: "فجر (صبحِ صادق)",
      totalFardRakats: 2,
      timeWindowEn: "From true dawn until right before sunrise",
      timeWindowUrdu: "صبحِ صادق سے لے کر طلوعِ آفتاب تک",
      sunnahMuakkadahEn: "2 Rak'at before Fard (strongly emphasized)",
      sunnahMuakkadahUrdu: "۲ رکعت سنتِ مؤکدہ فرض سے پہلے"
    },
    {
      prayerNameEn: "Dhuhr (Midday)",
      prayerNameUrdu: "ظہر (دوپہر)",
      totalFardRakats: 4,
      timeWindowEn: "From sun passing its zenith until shadow equals object length",
      timeWindowUrdu: "زوالِ آفتاب سے لے کر عصر کے وقت تک",
      sunnahMuakkadahEn: "4 Rak'at before Fard, 2 Rak'at after",
      sunnahMuakkadahUrdu: "۴ رکعت فرض سے پہلے اور ۲ رکعت بعد میں"
    },
    {
      prayerNameEn: "Asr (Late Afternoon)",
      prayerNameUrdu: "عصر (سہ پہر)",
      totalFardRakats: 4,
      timeWindowEn: "From end of Dhuhr until right before sunset",
      timeWindowUrdu: "ظہر کے وقت کے اختتام سے غروبِ آفتاب تک",
      sunnahMuakkadahEn: "None (4 Ghayr-Muakkadah recommended before)",
      sunnahMuakkadahUrdu: "سنتِ مؤکدہ نہیں (۴ غیر مؤکدہ مستحب ہیں)"
    },
    {
      prayerNameEn: "Maghrib (Sunset)",
      prayerNameUrdu: "مغرب (غروبِ آفتاب)",
      totalFardRakats: 3,
      timeWindowEn: "From immediate sunset until twilight twilight fades",
      timeWindowUrdu: "سورج ڈوبنے سے شفق غائب ہونے تک",
      sunnahMuakkadahEn: "2 Rak'at after Fard",
      sunnahMuakkadahUrdu: "۲ رکعت سنتِ مؤکدہ فرض کے بعد"
    },
    {
      prayerNameEn: "Isha (Night)",
      prayerNameUrdu: "عشاء (رات)",
      totalFardRakats: 4,
      timeWindowEn: "From darkness falling until the middle of the night",
      timeWindowUrdu: "شفق کی سرخی غائب ہونے سے آدھی رات تک",
      sunnahMuakkadahEn: "2 Rak'at after Fard + Witr (1 or 3 Rak'at)",
      sunnahMuakkadahUrdu: "۲ رکعت سنتِ مؤکدہ فرض کے بعد اور وتر"
    }
  ],
  commonBeginnerWorries: [
    {
      worryEn: "I can't pronounce Arabic properly and I feel embarrassed.",
      worryUrdu: "مجھے عربی الفاظ کا درست تلفظ ادا کرنے میں مشکل ہوتی ہے۔",
      reassuranceEn: "The Prophet Muhammad ﷺ explicitly stated: 'The one who recites the Quran with difficulty and stutters will have a double reward' (Bukhari 4937). Allah judges your effort and heart, not native fluency.",
      reassuranceUrdu: "نبی کریم ﷺ نے فرمایا کہ جو شخص اٹک اٹک کر قرآن پڑھتا ہے اور اسے دشواری ہوتی ہے اسے دوہرا اجر ملتا ہے۔ اللہ آپ کی کوشش کو دیکھتا ہے۔",
      hadithProof: "Sahih al-Bukhari 4937"
    },
    {
      worryEn: "I lost count of how many Rak'at I have prayed.",
      worryUrdu: "میں بھول گیا کہ میں نے کتنی رکعتیں پڑھ لی ہیں۔",
      reassuranceEn: "This happens to seasoned scholars too! The Sunnah rule is: build upon what you are certain of (the lower number). If you are torn between 2 or 3, assume 2, finish the prayer, and perform 2 prostrations of forgetfulness (Sujud as-Sahw) before or after Salam.",
      reassuranceUrdu: "اگر شک ہو جائے کہ ۲ پڑھی ہیں یا ۳، تو کم پر یقین رکھیں یعنی ۲ سمجھیں، نماز پوری کریں اور آخر میں سجدہ سہو کر لیں۔",
      hadithProof: "Sahih Muslim 571"
    },
    {
      worryEn: "Can a beginner focus only on the mandatory (Fard) prayers first?",
      worryUrdu: "کیا نوآموز شروع میں صرف فرض نمازوں پر اکتفا کر سکتا ہے؟",
      reassuranceEn: "Yes! A Bedouin once came to the Prophet ﷺ asking what prayers were required. The Prophet replied: 'Five prayers during the day and night.' The man said: 'I will not do more or less than this.' The Prophet remarked: 'He will succeed if he is truthful.'",
      reassuranceUrdu: "جی ہاں! ایک صحابی نے عرض کیا کہ مجھ پر کیا فرض ہے؟ آپ ﷺ نے فرمایا: دن رات میں پانچ نمازیں۔ انہوں نے کہا میں اس پر کمی بیشی نہیں کروں گا۔ آپ نے فرمایا: وہ کامیاب ہو گیا اگر سچا ہے۔",
      hadithProof: "Sahih al-Bukhari 1891"
    }
  ],
  faqs: [
    {
      questionEn: "Can I pray while holding a phone or prayer booklet?",
      questionUrdu: "کیا میں ہاتھ میں موبائل یا نماز کی کتاب لے کر نماز پڑھ سکتا ہوں؟",
      answerEn: "Yes. Major contemporary jurists agree that a beginner or new revert who has not yet memorized Surah Al-Fatiha or the Tashahhud may hold a card, book, or open phone to read until they commit it to memory.",
      answerUrdu: "جی ہاں! جید علمائے کرام کے مطابق ابتدائی سیکھنے والے اور نو مسلم جب تک زبانی یاد نہ کر لیں، کاغذ یا فون سے دیکھ کر نماز ادا کر سکتے ہیں۔",
      reference: "Permanent Committee of Islamic Research (Fatawa al-Lajnah 6/397)"
    },
    {
      questionEn: "What if I miss a prayer due to sleep or genuine forgetfulness?",
      questionUrdu: "اگر نیند یا بھول کی وجہ سے نماز چھوٹ جائے تو کیا کریں؟",
      answerEn: "The Prophet ﷺ said: 'Whoever forgets a prayer or sleeps through it, its expiation is to pray it as soon as he remembers it' (Sahih Muslim 684). Do not despair; immediately perform Wudu and make it up (Qada).",
      answerUrdu: "رسول اللہ ﷺ نے فرمایا: 'جو نماز پڑھنا بھول جائے یا سوتا رہ جائے تو اس کا کفارہ یہ ہے کہ جب یاد آئے فوراً اسے ادا کر لے۔'",
      reference: "Sahih Muslim 684"
    },
    {
      questionEn: "Do I have to pray in a mosque or can I pray at home?",
      questionUrdu: "کیا ہمیشہ مسجد میں نماز پڑھنا ضروری ہے یا گھر میں بھی پڑھ سکتے ہیں؟",
      answerEn: "While praying in congregation at the mosque brings 27 times greater reward for men, the Prophet ﷺ said: 'The entire earth has been made a place of prayer and pure for me' (Sahih al-Bukhari 335). Beginners can pray anywhere clean.",
      answerUrdu: "مَردوں کے لیے مسجد میں باجماعت نماز کا ۲۷ گنا ثواب ہے، لیکن پوری زمین نماز کے لیے پاک بنائی گئی ہے۔ آپ گھر یا کسی بھی پاک جگہ پر نماز ادا کر سکتے ہیں۔",
      reference: "Sahih al-Bukhari 335"
    }
  ],
  internalLinks: [
    {
      titleEn: "Step-by-Step Salah Guide (Advanced)",
      titleUrdu: "نماز کا مکمل تفصیلی طریقہ",
      descEn: "Full breakdown with scholarly proofs, recitations, and all Sunnahs.",
      descUrdu: "تمام مسنون دعائیں، احادیث کے حوالہ جات اور فقہی تفصیلات۔",
      path: "/how-to-perform-salah",
      tabId: "how-to-perform-salah"
    },
    {
      titleEn: "How to Perform Wudu (Ablution)",
      titleUrdu: "وضو کا مکمل مسنون طریقہ",
      descEn: "Learn the essential purification before stepping into prayer.",
      descUrdu: "وضو کے ۴ فرائض اور مسنون طریقہ تصویر اور ترجمہ کے ساتھ۔",
      path: "/how-to-perform-wudu",
      tabId: "how-to-perform-wudu"
    },
    {
      titleEn: "Interactive Qibla Direction Finder",
      titleUrdu: "قبلہ رخ معلوم کریں",
      descEn: "Find the exact direction of the Kaaba from your current location.",
      descUrdu: "خانہ کعبہ کی سمت درست معلوم کرنے کے لیے ڈیجیٹل کمپاس۔",
      path: "/qibla",
      tabId: "qibla"
    },
    {
      titleEn: "Daily Salah Habit Tracker",
      titleUrdu: "روزانہ نماز ٹریکر",
      descEn: "Track your 5 daily prayers and build a consistent streak.",
      descUrdu: "اپنی پانچوں نمازوں کو ٹریک کریں اور استقامت پیدا کریں۔",
      path: "/tracker",
      tabId: "tracker"
    }
  ]
};

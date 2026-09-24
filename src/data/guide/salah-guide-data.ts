export interface GuideStep {
  stepNumber: number;
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  arabic?: string;
  transliteration?: string;
  meaningEn?: string;
  meaningUrdu?: string;
  reference?: string;
  scholarlyNoteEn?: string;
  scholarlyNoteUrdu?: string;
}

export interface GuidePrerequisite {
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  reference?: string;
}

export interface GuideCommonMistake {
  mistakeEn: string;
  mistakeUrdu: string;
  correctionEn: string;
  correctionUrdu: string;
  hadithReference?: string;
}

export interface GuideFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  reference?: string;
}

export interface SalahGuideData {
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
  keyHadithArabic: string;
  keyHadithEn: string;
  keyHadithUrdu: string;
  keyHadithRef: string;
  prerequisites: GuidePrerequisite[];
  steps: GuideStep[];
  prayersSummary: {
    nameEn: string;
    nameUrdu: string;
    totalRakats: number;
    breakdownEn: string;
    breakdownUrdu: string;
    timeEn: string;
    timeUrdu: string;
  }[];
  commonMistakes: GuideCommonMistake[];
  faqs: GuideFAQ[];
  internalLinks: {
    tabId: string;
    path: string;
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
  }[];
}

export const SALAH_GUIDE_DATA: SalahGuideData = {
  seoTitleEn: 'How to Perform Salah (Namaz) Step by Step Guide | IslamIQ',
  seoTitleUrdu: 'نماز کا مکمل طریقہ • فرائض، ارکان، اوقات اور دعائیں | IslamIQ',
  seoDescEn: 'Learn how to perform Salah step by step with authentic Hadith references. Complete guide covering prayer prerequisites, postures, recitations, common mistakes, and FAQs.',
  seoDescUrdu: 'نماز کا مسنون طریقہ، تکبیر سے سلام تک مکمل رہنمائی، شرائطِ نماز، ارکان، فرائض، رکعتوں کی تفصیل اور احادیثِ مبارکہ کے مستند حوالہ جات۔',
  canonicalPath: '/how-to-perform-salah',
  heroBadgeEn: 'The Second Pillar of Islam • عمود الدين',
  heroBadgeUrdu: 'دین کا ستون • اسلام کا دوسرا رکن',
  h1En: 'How to Perform Salah (Namaz) — Complete Step-by-Step Prayer Guide',
  h1Urdu: 'نماز پڑھنے کا مکمل مسنون طریقہ — مرحلہ وار تصویری و وضاحتی گائیڈ',
  introEn: 'Salah (daily ritual prayer) is the cornerstone of a Muslim\'s spiritual life, connecting the servant directly with the Creator five times every day. The Prophet Muhammad ﷺ taught: "Pray as you have seen me praying" (Sahih al-Bukhari 6008). This comprehensive guide walks you through every posture, recitation, prerequisite, and essential ruling with authentic references.',
  introUrdu: 'نماز ہر مسلمان پر فرض اور دین کا بنیادی ستون ہے جو بندے کا اپنے رب سے روزانہ پانچ بار براہِ راست تعلق قائم کرتی ہے۔ رسول اللہ ﷺ نے ارشاد فرمایا: "نماز اس طرح پڑھو جس طرح تم نے مجھے پڑھتے دیکھا ہے" (صحیح بخاری: 6008)۔ یہ جامع گائیڈ نماز کی شرائط، ارکان، قیام، رکوع، سجدہ اور مسنون دعاؤں کو مستند حوالوں کے ساتھ واضح کرتی ہے۔',
  keyHadithArabic: 'صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي',
  keyHadithEn: 'The Messenger of Allah ﷺ said: "Pray as you have seen me praying." (Sahih al-Bukhari 6008)',
  keyHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "اس طرح نماز پڑھو جس طرح تم نے مجھے نماز پڑھتے دیکھا ہے۔" (صحیح بخاری: 6008)',
  keyHadithRef: 'Sahih al-Bukhari 6008, 631',
  prerequisites: [
    {
      titleEn: '1. Ritual Purity (Taharah & Wudu)',
      titleUrdu: '۱. طہارت اور وضو کی درستگی',
      descEn: 'One must be free of major impurities (requiring Ghusl) and minor impurities (requiring Wudu). The Prophet ﷺ said: "Allah does not accept prayer without purification" (Sahih Muslim 224).',
      descUrdu: 'بدن، لباس اور جگہ کا ناپاکی سے پاک ہونا اور نماز کے لیے باوضو ہونا لازمی شرط ہے۔ رسول اللہ ﷺ نے فرمایا: "اللہ تعالیٰ بغیر پاکیزگی کے نماز قبول نہیں فرماتا" (صحیح مسلم: 224)۔',
      reference: 'Sahih Muslim 224'
    },
    {
      titleEn: '2. Cleanliness of Body, Clothing & Location',
      titleUrdu: '۲. بدن، لباس اور جگہ کی پاکیزگی',
      descEn: 'The clothes worn and the ground or mat prayed upon must be free of Najasa (physical impurities).',
      descUrdu: 'نمازی کے جسم، پہنے ہوئے لباس اور سجدہ گاہ کا نجاستِ حقیقیہ سے پاک و صاف ہونا ضروری ہے۔',
      reference: 'Surah Al-Muddaththir 74:4'
    },
    {
      titleEn: '3. Covering the Awrah (Modest Clothing)',
      titleUrdu: '۳. ستر کا چھپانا (سترِ عورت)',
      descEn: 'For men: at minimum from the navel to the knees, with shoulders covered during prayer. For women: the entire body must be covered except the face and hands.',
      descUrdu: 'مرد کے لیے کم از کم ناف سے لے کر گھٹنوں تک اور کندھوں کا ڈھانپنا، اور خواتین کے لیے چہرے اور ہتھیلیوں کے علاوہ پورے بدن کا شائستہ لباس سے ڈھانپنا ضروری ہے۔',
      reference: 'Sahih al-Bukhari 359, Abu Dawud 640'
    },
    {
      titleEn: '4. Facing the Qiblah (Makkah)',
      titleUrdu: '۴. قبلہ رو ہونا (خانہ کعبہ کا رخ)',
      descEn: 'Facing the direction of the Holy Kaaba in Makkah. Allah commands: "Turn your face toward al-Masjid al-Haram" (Surah Al-Baqarah 2:144).',
      descUrdu: 'نماز کے لیے مکہ مکرمہ میں واقع خانہ کعبہ کی سمت رخ کرنا فرض ہے۔ ارشادِ باری تعالیٰ ہے: "پس اپنا رخ مسجدِ حرام کی طرف پھیر لیجیے" (سورۃ البقرہ: 144)۔',
      reference: 'Surah Al-Baqarah 2:144'
    },
    {
      titleEn: '5. Entry of the Prescribed Time (Waqt)',
      titleUrdu: '۵. وقت کا داخل ہونا',
      descEn: 'Each of the five daily prayers has a specifically appointed time window determined by the sun\'s position (Surah An-Nisa 4:103).',
      descUrdu: 'ہر نماز اپنے مقررہ وقت پر ادا کی جاتی ہے۔ قرآنِ کریم کا فرمان ہے: "بے شک نماز مومنوں پر مقررہ اوقات میں فرض ہے" (سورۃ النساء: 103)۔',
      reference: 'Surah An-Nisa 4:103'
    },
    {
      titleEn: '6. Sincere Intention in the Heart (Niyyah)',
      titleUrdu: '۶. دل میں نیت کا ہونا',
      descEn: 'Determining in your heart the specific prayer you are performing (e.g. today\'s Dhuhr fard). Vocalizing the intention aloud is not a requirement of the Sunnah.',
      descUrdu: 'دل سے ارادہ کرنا کہ میں اللہ کی رضا کے لیے فلاں وقت کی نماز ادا کر رہا ہوں۔ زبان سے الفاظ ادا کرنا شرط نہیں بلکہ دل کا ارادہ ہی اصل نیت ہے۔',
      reference: 'Sahih al-Bukhari 1'
    }
  ],
  steps: [
    {
      stepNumber: 1,
      titleEn: 'Takbirat al-Ihram (Commencement)',
      titleUrdu: 'تکبیرِ تحریمہ (اللہ اکبر کہہ کر نماز شروع کرنا)',
      descEn: 'Stand upright facing the Qiblah. Raise both hands to the level of your shoulders or earlobes and say "Allahu Akbar". This opens the prayer and renders everyday acts forbidden.',
      descUrdu: 'قبلہ کی جانب باادب کھڑے ہو کر دونوں ہاتھ کندھوں یا کانوں کی لو تک اٹھائیں اور "اللَّهُ أَكْبَرُ" کہیں۔ اس تکبیر سے نماز شروع ہو جاتی ہے۔',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      meaningEn: 'Allah is the Greatest',
      meaningUrdu: 'اللہ سب سے بڑا ہے',
      reference: 'Sahih al-Bukhari 735, Sahih Muslim 390'
    },
    {
      stepNumber: 2,
      titleEn: 'Qiyam (Standing) & Reciting the Opening Supplication',
      titleUrdu: 'قیام اور دعائے استفتاح (ثناء)',
      descEn: 'Fold your right hand over your left arm or wrist upon your chest or above/below the navel (both positions are recognized across classical jurisprudence). Recite the opening supplication (Thana) silently.',
      descUrdu: 'دائیں ہاتھ کو بائیں پر باندھ کر باادب کھڑے ہوں اور خاموشی سے ثناء (دعائے استفتاح) پڑھیں۔ فقہاء کے مابین سینے یا ناف کے قریب ہاتھ باندھنے میں وسعت پائی جاتی ہے۔',
      arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
      transliteration: 'Subhanak-Allahumma wa bihamdika, wa tabarakasmuka, wa ta\'ala jadduka, wa la ilaha ghayruk',
      meaningEn: 'Glory be to You, O Allah, and all praise. Blessed is Your name, exalted is Your majesty, and there is no deity worthy of worship besides You.',
      meaningUrdu: 'پاک ہے تو اے اللہ اپنی تعریف کے ساتھ، اور تیرا نام برکت والا ہے، اور تیری شان بہت بلند ہے، اور تیرے سوا کوئی معبود نہیں۔',
      reference: 'Sunan Abi Dawud 775, Jami at-Tirmidhi 242 (Sahih)'
    },
    {
      stepNumber: 3,
      titleEn: 'Reciting Surah Al-Fatihah (Obligatory Pillar)',
      titleUrdu: 'سورۃ الفاتحہ کی تلاوت (نماز کا لازمی رکن)',
      descEn: 'Seek refuge with Allah from Shaytan, recite Bismillah, and recite Surah Al-Fatihah calmly. The Prophet ﷺ said: "There is no prayer for the one who does not recite the Opening of the Book" (Sahih al-Bukhari 756).',
      descUrdu: 'تعوذ اور تسمیہ کے بعد ہر رکعت میں سورۃ الفاتحہ کی تلاوت فرمائیں۔ رسول اللہ ﷺ نے فرمایا: "اس شخص کی کوئی نماز نہیں جس نے سورۃ الفاتحہ نہیں پڑھی" (صحیح بخاری: 756)۔',
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      transliteration: 'Bismillahir-Rahmanir-Raheem. Alhamdu lillahi Rabbil-\'alameen...',
      meaningEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds...',
      meaningUrdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔ سب تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے...',
      reference: 'Sahih al-Bukhari 756, Sahih Muslim 394'
    },
    {
      stepNumber: 4,
      titleEn: 'Recitation of an Additional Surah / Ayahs',
      titleUrdu: 'قرآن مجید کی کوئی سورت یا آیات ملانا',
      descEn: 'In the first two Rakats of obligatory prayers (and all Rakats of Sunnah and Nafl prayers), recite another portion of the Quran, such as Surah Al-Ikhlas, Surah Al-Falaq, or Surah An-Nas.',
      descUrdu: 'فرائض کی پہلی دو رکعتوں اور سنن و نوافل کی تمام رکعتوں میں سورۃ الفاتحہ کے بعد قرآن کریم کی کوئی بھی سورت (جیسے سورۃ الاخلاص، الفلق، یا الناس) ملائیں۔',
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      transliteration: 'Qul Huwallahu Ahad. Allahus-Samad. Lam yalid wa lam yoolad. Wa lam yakul-lahu kufuwan ahad.',
      meaningEn: 'Say: He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.',
      meaningUrdu: 'کہہ دیجیے کہ وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔ اور نہ کوئی اس کا ہمسر ہے۔',
      reference: 'Sahih al-Bukhari 776'
    },
    {
      stepNumber: 5,
      titleEn: 'Ruku (Bowing with Stillness & Tranquility)',
      titleUrdu: 'رکوع (اطمینان و سکون کے ساتھ جھکنا)',
      descEn: 'Say "Allahu Akbar" and bow down, placing your hands firmly on your knees with fingers spread. Keep your back straight, head level with your back, and recite the tasbeeh at least 3 times calmly.',
      descUrdu: '"اللہ اکبر" کہتے ہوئے رکوع میں جائیں، دونوں ہاتھ گھٹنوں پر جما لیں، پیٹھ بالکل سیدھی رکھیں اور کم از کم 3 مرتبہ عاجزی کے ساتھ تسبیح پڑھیں۔',
      arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Subhana Rabbiyal-\'Azeem',
      meaningEn: 'Glory be to my Lord, the Magnificent (recited at least 3 times)',
      meaningUrdu: 'پاک ہے میرا رب جو بڑی عظمت والا ہے (کم از کم 3 بار)',
      reference: 'Sahih Muslim 772, Sunan Abi Dawud 869'
    },
    {
      stepNumber: 6,
      titleEn: 'Qawmah (Rising from Bowing to Standing Upright)',
      titleUrdu: 'قومہ (رکوع سے سیدھا کھڑا ہونا اور تحمید کہنا)',
      descEn: 'Rise back to a completely upright standing position while saying "Sami Allahu liman hamidah". Once fully upright, say "Rabbana wa lakal-hamd".',
      descUrdu: 'رکوع سے سیدھے کھڑے ہوتے ہوئے تسمیع "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ" کہیں، اور سیدھے کھڑے ہو کر اطمینان سے تحمید "رَبَّنَا وَلَكَ الْحَمْدُ" پڑھیں۔',
      arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ',
      transliteration: 'Sami\' Allahu liman hamidah • Rabbana wa lakal-hamd',
      meaningEn: 'Allah hears whoever praises Him • Our Lord, to You belongs all praise.',
      meaningUrdu: 'اللہ نے سن لی اس کی بات جس نے اس کی تعریف کی • اے ہمارے رب! تیرے ہی لیے تمام تعریفیں ہیں۔',
      reference: 'Sahih al-Bukhari 789, Sahih Muslim 404'
    },
    {
      stepNumber: 7,
      titleEn: 'Sujud (Prostration on the Seven Limbs)',
      titleUrdu: 'سجدہ (سات اعضاء پر عاجزانہ سجدہ کرنا)',
      descEn: 'Say "Allahu Akbar" and prostrate on the ground. The Prophet ﷺ emphasized prostrating upon 7 bones: forehead & nose, both palms, both knees, and the toes of both feet turned toward the Qiblah.',
      descUrdu: '"اللہ اکبر" کہتے ہوئے سجدے میں جائیں۔ نبی کریم ﷺ کے ارشاد کے مطابق 7 اعضاء زمین پر ٹکنے چاہئیں: پیشانی بمع ناک، دونوں ہتھیلیاں، دونوں گھٹنے، اور دونوں پاؤں کی انگلیاں قبلہ رخ۔',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
      transliteration: 'Subhana Rabbiyal-A\'la',
      meaningEn: 'Glory be to my Lord, the Most High (recited at least 3 times)',
      meaningUrdu: 'پاک ہے میرا رب جو سب سے بلند و بالا ہے (کم از کم 3 بار)',
      reference: 'Sahih al-Bukhari 812, Sahih Muslim 490'
    },
    {
      stepNumber: 8,
      titleEn: 'Jalsah (Sitting between the Two Prostrations)',
      titleUrdu: 'جلسہ (دونوں سجدوں کے درمیان پرسکون بیٹھنا)',
      descEn: 'Say "Allahu Akbar" and rise from Sujud into a calm sitting posture on your left foot with the right foot upright. Remain seated until all bones return to rest, reciting the supplication for forgiveness.',
      descUrdu: '"اللہ اکبر" کہہ کر سجدے سے اٹھیں اور اطمینان سے بائیں پاؤں پر بیٹھ کر دائیں پاؤں کو کھڑا رکھیں۔ دونوں سجدوں کے درمیان مغفرت کی مسنون دعا پڑھیں۔',
      arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
      transliteration: 'Rabbigh-fir lee, Rabbigh-fir lee',
      meaningEn: 'O my Lord, forgive me; O my Lord, forgive me.',
      meaningUrdu: 'اے میرے رب! مجھے بخش دے، اے میرے رب! مجھے بخش دے۔',
      reference: 'Sunan Abi Dawud 874, Sunan Ibn Majah 897 (Sahih)'
    },
    {
      stepNumber: 9,
      titleEn: 'Second Sujud & Rising for the Next Rakat',
      titleUrdu: 'دوسرا سجدہ اور اگلی رکعت کے لیے اٹھنا',
      descEn: 'Say "Allahu Akbar" and perform the second prostration identical to the first. After completing it, say "Allahu Akbar" and rise to standing for the second Rakat.',
      descUrdu: '"اللہ اکبر" کہہ کر پہلا سجدے کی طرح دوسرا سجدہ مکمل کریں، پھر "اللہ اکبر" کہتے ہوئے دوسری رکعت کے لیے سیدھے کھڑے ہو جائیں۔',
      reference: 'Sahih al-Bukhari 789'
    },
    {
      stepNumber: 10,
      titleEn: 'Tashahhud (Sitting for Witness and Salutations)',
      titleUrdu: 'قعدہ اور التحیات (تشہد)',
      descEn: 'After the 2nd Rakat (and final Rakat of 3 or 4-Rakat prayers), sit calmly with hands on your thighs. Raise your right index finger when affirming the Oneness of Allah during the testimony.',
      descUrdu: 'دوسری رکعت (اور آخری رکعت) کے بعد قعدہ میں پرسکون بیٹھ کر التحیات پڑھیں۔ "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ" پر دائیں ہاتھ کی شہادت کی انگلی سے توحید کا اشارہ کریں۔',
      arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu \'alayna wa \'ala \'ibadillahis-saliheen. Ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan \'abduhu wa rasooluh.',
      meaningEn: 'All compliments, prayers and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I testify that there is no god but Allah, and I testify that Muhammad is His slave and Messenger.',
      meaningUrdu: 'تمام زبانی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔ اے نبی! آپ پر سلامتی ہو اور اللہ کی رحمت اور اس کی برکتیں نازل ہوں۔ ہم پر اور اللہ کے نیک بندوں پر سلامتی ہو۔ میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں اور محمد ﷺ اس کے بندے اور رسول ہیں۔',
      reference: 'Sahih al-Bukhari 831, Sahih Muslim 402'
    },
    {
      stepNumber: 11,
      titleEn: 'Durood Ibrahim & Supplication in Final Sitting',
      titleUrdu: 'درودِ ابراہیمی اور مسنون دعا (آخری قعدہ)',
      descEn: 'In the final sitting before ending the prayer, send blessings upon the Prophet ﷺ via Durood Ibrahim, followed by asking Allah for protection and goodness in this life and the Hereafter.',
      descUrdu: 'آخری قعدہ میں تشہد کے بعد نبی کریم ﷺ پر درودِ ابراہیمی بھیجیں اور اس کے بعد قرآن و سنت کی جامع دعا مانگیں۔',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
      transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad, kama sallayta \'ala Ibraheema wa \'ala ali Ibraheem, innaka Hameedum-Majeed...',
      meaningEn: 'O Allah, bestow peace upon Muhammad and upon the family of Muhammad, as You bestowed peace upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy, Majestic...',
      meaningUrdu: 'اے اللہ! رحمت نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم علیہ السلام اور ان کی آل پر، بے شک تو قابلِ تعریف اور بڑی شان والا ہے...',
      reference: 'Sahih al-Bukhari 3370, Sahih Muslim 405'
    },
    {
      stepNumber: 12,
      titleEn: 'Tasleem (Concluding the Prayer with Peace)',
      titleUrdu: 'سلام پھیرنا (نماز کا اختتام)',
      descEn: 'Turn your face to the right, looking over your right shoulder and saying "As-salamu \'alaykum wa rahmatullah". Then turn your face to the left and repeat the same greeting. The prayer is now complete.',
      descUrdu: 'اپنے چہرے کو دائیں کندھے کی طرف پھیرتے ہوئے "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ" کہیں، پھر بائیں کندھے کی طرف رخ کر کے یہی کلمات دہرائیں۔ اس کے ساتھ ہی نماز مکمل ہو جاتی ہے۔',
      arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
      transliteration: 'As-salamu \'alaykum wa rahmatullah',
      meaningEn: 'May the peace and mercy of Allah be upon you',
      meaningUrdu: 'تم پر اللہ کی سلامتی اور اس کی رحمت نازل ہو',
      reference: 'Sahih Muslim 582, Sunan Abi Dawud 996'
    }
  ],
  prayersSummary: [
    {
      nameEn: 'Fajr (Dawn Prayer)',
      nameUrdu: 'نمازِ فجر',
      totalRakats: 4,
      breakdownEn: '2 Sunnah Mu\'akkadah (strongly emphasized) + 2 Fard (obligatory)',
      breakdownUrdu: '۲ رکعت سنتِ مؤکدہ + ۲ رکعت فرض',
      timeEn: 'From true dawn (Subh Sadiq) until sunrise',
      timeUrdu: 'صبحِ صادق سے طلوعِ آفتاب تک'
    },
    {
      nameEn: 'Dhuhr (Noon Prayer)',
      nameUrdu: 'نمازِ ظہر',
      totalRakats: 12,
      breakdownEn: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl',
      breakdownUrdu: '۴ رکعت سنت + ۴ رکعت فرض + ۲ رکعت سنت + ۲ رکعت نفل',
      timeEn: 'From zenith (sun passing mid-sky) until object shadow equals its length',
      timeUrdu: 'زوالِ آفتاب کے بعد سے عصر کے وقت تک'
    },
    {
      nameEn: 'Asr (Afternoon Prayer)',
      nameUrdu: 'نمازِ عصر',
      totalRakats: 8,
      breakdownEn: '4 Sunnah Ghayr Mu\'akkadah + 4 Fard (obligatory)',
      breakdownUrdu: '۴ رکعت سنتِ غیر مؤکدہ + ۴ رکعت فرض',
      timeEn: 'From mid-afternoon until the sun begins to yellow before sunset',
      timeUrdu: 'ظہر کا وقت ختم ہونے سے غروبِ آفتاب تک'
    },
    {
      nameEn: 'Maghrib (Sunset Prayer)',
      nameUrdu: 'نمازِ مغرب',
      totalRakats: 7,
      breakdownEn: '3 Fard (obligatory) + 2 Sunnah + 2 Nafl',
      breakdownUrdu: '۳ رکعت فرض + ۲ رکعت سنت + ۲ رکعت نفل',
      timeEn: 'Immediately after sunset until red twilight disappears from the horizon',
      timeUrdu: 'غروبِ آفتاب سے شفق کی سرخی غائب ہونے تک'
    },
    {
      nameEn: 'Isha (Night Prayer)',
      nameUrdu: 'نمازِ عشاء',
      totalRakats: 17,
      breakdownEn: '4 Sunnah + 4 Fard + 2 Sunnah + 2 Nafl + 3 Witr + 2 Nafl',
      breakdownUrdu: '۴ سنت + ۴ فرض + ۲ سنت + ۲ نفل + ۳ وتر واجب + ۲ نفل',
      timeEn: 'From disappearance of twilight until the middle of the night (or dawn)',
      timeUrdu: 'شفق کے غائب ہونے سے لے کر نصف شب (یا فجر) تک'
    }
  ],
  commonMistakes: [
    {
      mistakeEn: 'Rushing and lack of physical tranquility (Tuma\'neenah)',
      mistakeUrdu: 'جلدی جلدی نماز پڑھنا اور رکوع و سجدے میں سکون و ٹھہراؤ نہ رکھنا',
      correctionEn: 'Every posture requires Tuma\'neenah, pausing until all joints rest in place. The Prophet ﷺ told a man who hurried: "Go back and pray, for you have not prayed" (Sahih al-Bukhari 793).',
      correctionUrdu: 'ہر رکن میں اعتدال اور اطمینان شرط ہے۔ نبی ﷺ نے جلدی جلدی نماز پڑھنے والے کو فرمایا: "لوٹ جا اور دوبارہ نماز پڑھ، کیونکہ تو نے نماز نہیں پڑھی" (صحیح بخاری: 793)۔',
      hadithReference: 'Sahih al-Bukhari 793'
    },
    {
      mistakeEn: 'Looking up to the sky or glancing around during prayer',
      mistakeUrdu: 'نماز کے دوران آسمان کی طرف یا ادھر ادھر نظریں گھمانا',
      correctionEn: 'Keep your gaze focused on the place of prostration while standing to maintain Khushu. The Prophet ﷺ strongly warned against looking up toward the heavens during prayer (Sahih al-Bukhari 750).',
      correctionUrdu: 'قیام کی حالت میں نظریں سجدہ گاہ پر جمی ہونی چاہئیں۔ رسول اللہ ﷺ نے نماز میں آسمان کی طرف نظر اٹھانے سے سختی سے منع فرمایا (صحیح بخاری: 750)۔',
      hadithReference: 'Sahih al-Bukhari 750'
    },
    {
      mistakeEn: 'Moving ahead of the Imam in congregational prayer',
      mistakeUrdu: 'باجماعت نماز میں امام سے پہلے رکوع یا سجدے میں چلے جانا',
      correctionEn: 'Follow the Imam only after he finishes uttering the Takbir. Moving before the Imam invalidates the harmony of congregation (Sahih Muslim 426).',
      correctionUrdu: 'امام کے تکبیر مکمل کرنے کے بعد حرکت کریں۔ امام سے سبقت لے جانا شدید ناپسندیدہ اور ممانعت کے زمرے میں ہے (صحیح مسلم: 426)۔',
      hadithReference: 'Sahih Muslim 426'
    },
    {
      mistakeEn: 'Not resting all 7 bones firmly on the ground during Sujud',
      mistakeUrdu: 'سجدے میں ناک اور پاؤں کی انگلیاں زمین سے اٹھائے رکھنا',
      correctionEn: 'Both forehead and nose, both palms, both knees, and the toes of both feet must contact the ground firmly (Sahih al-Bukhari 812).',
      correctionUrdu: 'پیشانی اور ناک، دونوں ہاتھ، دونوں گھٹنے، اور پاؤں کی انگلیاں زمین پر جمنا لازمی ہے۔ صرف پیشانی لگا کر ناک اٹھائے رکھنا غلط ہے (صحیح بخاری: 812)۔',
      hadithReference: 'Sahih al-Bukhari 812'
    }
  ],
  faqs: [
    {
      questionEn: 'What should I do if I forget a step or doubt the number of Rakats?',
      questionUrdu: 'اگر نماز میں رکعتوں کی تعداد میں شک ہو جائے تو کیا کرنا چاہیے؟',
      answerEn: 'Build upon what you are certain of (the lesser number) and perform Sujud as-Sahw (two prostrations of forgetfulness) at the end before or after the Tasleem as taught by the Prophet ﷺ (Sahih Muslim 571).',
      answerUrdu: 'یقین پر بنیاد رکھیں (یعنی کم والی تعداد کو مان لیں) اور نماز کے آخر میں سجدہ سہو ادا کریں۔ رسول اللہ ﷺ نے شکوک کے ازالے کے لیے سجدہ سہو کی رہنمائی فرمائی ہے (صحیح مسلم: 571)۔',
      reference: 'Sahih Muslim 571'
    },
    {
      questionEn: 'Are there differences between how men and women pray?',
      questionUrdu: 'کیا مرد اور عورت کے نماز کے طریقے میں کوئی فرق ہے؟',
      answerEn: 'The core pillars, recitations, and obligations of prayer are identical. Recognized differences exist in jurisprudence regarding posture modesty (women keeping elbows closer to the sides during prostration and sitting modestly) and dress requirements (covering the entire body except face and hands). Classical scholars respect both broad convergence and jurisprudential nuances.',
      answerUrdu: 'نماز کے بنیادی ارکان، فرائض اور اذکار مرد اور عورت دونوں کے لیے یکساں ہیں۔ فقہاء کے نزدیک عورتوں کے لیے سجدے اور قعدے میں مزید سمٹ کر بیٹھنا اور حیا کے تقاضوں کے تحت مکمل ستر کا خیال رکھنا مستحب بیان کیا گیا ہے۔',
      reference: 'Sunan al-Bayhaqi 2/222, Fiqh al-Islami'
    },
    {
      questionEn: 'Where should hands be placed during standing (Qiyam)?',
      questionUrdu: 'قیام میں ہاتھ کہاں باندھنے چاہئیں؟',
      answerEn: 'Different valid views exist among the recognized schools of thought: placing right hand over left upon the chest (recommended by Shafii and Hanbali scholars and many Hadith scholars based on Sahih narrations), placing them below the navel (recommended in Hanafi jurisprudence), or leaving them at the sides (found in the Maliki tradition). All of these positions are respected within Ahl al-Sunnah.',
      answerUrdu: 'اہلِ سنت کے چاروں ائمہ کے نزدیک دائیں ہاتھ کو بائیں ہاتھ پر رکھنا مسنون ہے۔ سینے پر باندھنا (شافعی و حنبلی موقف)، ناف کے نیچے باندھنا (حنفی موقف)، اور ہاتھ کھلے رکھنا (مالکی مسلک میں مشہور) سبھی معتبر فقہی آراء ہیں اور ان میں باہمی احترام ضروری ہے۔',
      reference: 'Sahih Ibn Khuzaymah 479, Musannaf Ibn Abi Shaybah 3959'
    },
    {
      questionEn: 'What invalidates the prayer (Mubtilat as-Salah)?',
      questionUrdu: 'نماز کن چیزوں سے ٹوٹ جاتی ہے؟',
      answerEn: 'Salah is invalidated by: breaking Wudu (passing wind, discharge), speaking intentional worldly words, laughing aloud, excessive deliberate physical movement unrelated to prayer, eating or drinking, exposing the Awrah intentionally, and turning away from the Qiblah without valid excuse.',
      answerUrdu: 'نماز کو باطل کرنے والی چیزیں: وضو کا ٹوٹ جانا، جان بوجھ کر بولنا، قہقہہ لگا کر ہنسنا، نماز کے علاوہ کثیر حرکات کرنا، کھانا پینا، ستر کا کھل جانا، اور بلا عذر قبلہ سے رخ پھیر لینا۔',
      reference: 'Sahih al-Bukhari 1227, Sahih Muslim 537'
    }
  ],
  internalLinks: [
    {
      tabId: 'how-to-perform-wudu',
      path: '/how-to-perform-wudu',
      titleEn: 'How to Perform Wudu (Ablution)',
      titleUrdu: 'وضو کا مسنون طریقہ',
      descEn: 'Step-by-step ablution guide according to the Quran & Sunnah.',
      descUrdu: 'نماز سے قبل کامل طہارت اور وضو کا مرحلہ وار طریقہ۔'
    },
    {
      tabId: '5-pillars-of-islam',
      path: '/5-pillars-of-islam',
      titleEn: '5 Pillars of Islam Explained',
      titleUrdu: 'اسلام کے پانچ بنیادی ارکان',
      descEn: 'Understand the essential foundations of faith and practice.',
      descUrdu: 'شہادت، نماز، زکوٰۃ، روزہ اور حج کی جامع تشریح۔'
    },
    {
      tabId: 'qibla',
      path: '/qibla',
      titleEn: 'Interactive Qibla Finder',
      titleUrdu: 'قبلہ رخ معلوم کریں',
      descEn: 'Locate the exact direction of the Kaaba from your location.',
      descUrdu: 'اپنے مقام سے خانہ کعبہ کی درست سمت معلوم کریں۔'
    },
    {
      tabId: 'salah',
      path: '/salah',
      titleEn: 'Daily Salah Tracker',
      titleUrdu: 'روزانہ کا نماز ٹریکر',
      descEn: 'Track your 5 daily prayers and build consistent habits.',
      descUrdu: 'اپنے پانچوں وقت کی نمازوں کا ریکارڈ اور تسلسل برقرار رکھیں۔'
    }
  ]
};

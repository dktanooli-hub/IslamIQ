export interface PillarItem {
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
  keyDetailsEn: string[];
  keyDetailsUrdu: string[];
  spiritualImpactEn: string;
  spiritualImpactUrdu: string;
}

export interface FivePillarsGuideData {
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
  foundationalHadithArabic: string;
  foundationalHadithUrdu: string;
  foundationalHadithEn: string;
  foundationalHadithRef: string;
  pillarsVsImanExplanationEn: string;
  pillarsVsImanExplanationUrdu: string;
  pillars: PillarItem[];
  commonMisconceptions: {
    misconceptionEn: string;
    misconceptionUrdu: string;
    realityEn: string;
    realityUrdu: string;
    reference?: string;
  }[];
  faqs: {
    questionEn: string;
    questionUrdu: string;
    answerEn: string;
    answerUrdu: string;
    reference?: string;
  }[];
  internalLinks: {
    tabId: string;
    path: string;
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
  }[];
}

export const FIVE_PILLARS_GUIDE_DATA: FivePillarsGuideData = {
  seoTitleEn: 'The 5 Pillars of Islam Explained with Authentic References | IslamIQ',
  seoTitleUrdu: 'اسلام کے ۵ ارکان کی مفصل وضاحت • قرآن و سنت کی روشنی میں | IslamIQ',
  seoDescEn: 'Comprehensive guide to the Five Pillars of Islam (Arkan al-Islam): Shahadah, Salah, Zakat, Sawm, and Hajj. Detailed Quranic proofs, Hadith evidence, wisdom, and FAQs.',
  seoDescUrdu: 'اسلام کے پانچ بنیادی ستون: کلمہ شہادت، نماز، زکوٰۃ، روزہ اور حج۔ قرآنی آیات، احادیثِ صحیحہ، شرائط، حکمتیں اور فکری و روحانی اثرات کی جامع رہنمائی۔',
  canonicalPath: '/5-pillars-of-islam',
  heroBadgeEn: 'Foundations of Islamic Practice • أركان الإسلام',
  heroBadgeUrdu: 'دینِ اسلام کی بنیادی عمارت • ارکانِ اسلام',
  h1En: 'The 5 Pillars of Islam — Complete Educational Guide with Quran & Hadith',
  h1Urdu: 'اسلام کے پانچ بنیادی ارکان — قرآن و سنت کی مستند روشنی میں مفصل رہنمائی',
  introEn: 'The Five Pillars of Islam (Arkan al-Islam) represent the fundamental acts of worship and moral commitment required of every Muslim. They are the scaffolding upon which a believer builds a life of submission, integrity, and consciousness of God. Understanding each pillar empowers believers to worship with deep knowledge and brings clarity to those seeking authentic Islamic knowledge.',
  introUrdu: 'اسلام کے پانچ ارکان وہ لازمی ایمانی اور عملی ستون ہیں جن پر مسلمان کی پوری زندگی استوار ہوتی ہے۔ یہ ارکان انسان کی عقل، قلب، جسم اور مال کو اللہ تعالیٰ کی بندگی میں منظم کرتے ہیں۔ رسول اللہ ﷺ نے اسلام کو ایک عالیشان عمارت سے تشبیہ دی جس کی چھت اور دیواریں ان پانچ مضبوط ستونوں پر قائم ہیں۔',
  foundationalHadithArabic: 'بُنِيَ الإِسْلامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لا إِلَهَ إِلا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ',
  foundationalHadithUrdu: 'رسول اللہ ﷺ نے فرمایا: "اسلام کی بنیاد پانچ چیزوں پر رکھی گئی ہے: اس بات کی گواہی دینا کہ اللہ کے سوا کوئی معبود نہیں اور محمد ﷺ اللہ کے رسول ہیں، نماز قائم کرنا، زکوٰۃ ادا کرنا، حج کرنا، اور رمضان کے روزے رکھنا۔" (صحیح بخاری: 8، صحیح مسلم: 16)',
  foundationalHadithEn: 'The Messenger of Allah ﷺ said: "Islam is built upon five: testifying that there is no god but Allah and that Muhammad is the Messenger of Allah, establishing the prayer, paying Zakat, performing Hajj, and fasting during Ramadan." (Sahih al-Bukhari 8, Sahih Muslim 16)',
  foundationalHadithRef: 'Sahih al-Bukhari 8, Sahih Muslim 16 (Narrated by Abdullah ibn Umar RA)',
  pillarsVsImanExplanationEn: 'It is essential to distinguish between the 5 Pillars of Islam (the outward, observable actions of devotion) and the 6 Articles of Iman (the inner convictions of faith: belief in Allah, His Angels, His Revealed Scriptures, His Messengers, the Last Day, and Divine Destiny / Qadar). Together, they form complete submission: faith in the heart manifested through righteous deeds.',
  pillarsVsImanExplanationUrdu: 'یہ نکتہ سمجھنا ضروری ہے کہ ارکانِ اسلام ظاہری اعمال اور عبادات ہیں (نماز، روزہ، زکوٰۃ، حج، اقرارِ زبان)، جبکہ ارکانِ ایمان باطنی اور قلبی یقین ہیں (اللہ، اس کے فرشتوں، آسمانی کتابوں، رسولوں، آخرت اور تقدیر پر ایمان)۔ جب دل کا ایمان ظاہر میں اطاعت بن کر نکلتا ہے تو انسان کامل مسلمان بنتا ہے۔',
  pillars: [
    {
      number: 1,
      nameArabic: 'الشَّهَادَةُ',
      nameTransliteration: 'Ash-Shahadah',
      nameEn: 'Shahadah (Declaration of Faith)',
      nameUrdu: 'کلمہ شہادت (توحید و رسالت کا اقرار)',
      meaningEn: 'Bearing witness with conviction that none has the right to be worshipped except Allah alone, and that Muhammad ﷺ is His final Messenger.',
      meaningUrdu: 'اس بات کا دلی یقین اور زبانی اقرار کہ اللہ کے سوا کوئی معبودِ برحق نہیں اور حضرت محمد ﷺ اللہ کے بندے اور آخری رسول ہیں۔',
      quranAyahArabic: 'فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاسْتَغْفِرْ لِذَنبِكَ',
      quranAyahUrdu: 'پس جان لیجیے کہ یقیناً اللہ کے سوا کوئی سچا معبود نہیں، اور اپنے گناہوں کی بخشش مانگیے۔ (سورۃ محمد: 19)',
      quranAyahEn: 'So know that there is no deity except Allah and ask forgiveness for your sin. (Surah Muhammad 47:19)',
      quranRef: 'Surah Muhammad 47:19',
      hadithTextEn: 'The Prophet ﷺ said: "Whoever says \'La ilaha illallah\' sincerely from his heart will enter Paradise." (Sahih al-Bukhari 99)',
      hadithTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "جس نے سچے دل سے اخلاص کے ساتھ لا الہ الا اللہ کہا وہ جنت میں داخل ہوگا۔" (صحیح بخاری: 99)',
      hadithRef: 'Sahih al-Bukhari 99, 128',
      keyDetailsEn: [
        'Negation (Nafy): "La ilaha" removes worship from false gods, idols, ego, and created entities.',
        'Affirmation (Ithbat): "Illallah" affirms all worship, hope, and reliance belong solely to Allah.',
        'Acceptance of Sunnah: "Muhammadur Rasulullah" binds the believer to accept the Prophet ﷺ as the role model and final lawgiver.',
        'Conditions: Requires knowledge (Ilm), certainty (Yaqeen), sincerity (Ikhlas), love (Mahabbah), submission (Inqiyad), and acceptance (Qubool).'
      ],
      keyDetailsUrdu: [
        'نفی: "لا الہ" کے ذریعے تمام جھوٹے معبودوں، بتوں اور نفسانی خواہشات کی بندگی کا انکار۔',
        'اثبات: "الا اللہ" کے ذریعے تمام عبادات، دعاؤں اور امیدوں کا صرف خدائے واحد کے لیے مختص ہونا۔',
        'رسالت کا اقرار: محمد ﷺ کے لائے ہوئے دین کو برحق جاننا اور آپ کی سنت کی پیروی کو لازم پکڑنا۔',
        'شرائطِ کلمہ: علم، یقین، اخلاص، صدق، محبت، اطاعت اور قبولیت۔'
      ],
      spiritualImpactEn: 'Liberates the human soul from subservience to creation, anxiety of mortals, and superstition, instilling unmatched dignity and purposeful focus.',
      spiritualImpactUrdu: 'انسان کو دنیا کے خوف، اندھی تقلید اور شرک سے آزاد کر کے صرف ایک پروردگار کے سامنے جھکنے کا وقار اور دلی اطمینان بخشتا ہے۔'
    },
    {
      number: 2,
      nameArabic: 'الصَّلَاةُ',
      nameTransliteration: 'As-Salah',
      nameEn: 'Salah (The 5 Daily Prayers)',
      nameUrdu: 'نماز (روزانہ پانچ وقت کی فرض نماز)',
      meaningEn: 'Performing the prescribed ritual prayers five times daily at their appointed times facing the Holy Kaaba in Makkah.',
      meaningUrdu: 'روزانہ مقررہ اوقات پر پاک صاف ہو کر خانہ کعبہ کی سمت رخ کر کے نماز ادا کرنا۔',
      quranAyahArabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
      quranAyahUrdu: 'بے شک نماز اہل ایمان پر مقررہ اوقات میں فرض کی گئی ہے۔ (سورۃ النساء: 103)',
      quranAyahEn: 'Indeed, prayer has been decreed upon the believers a decree of specified times. (Surah An-Nisa 4:103)',
      quranRef: 'Surah An-Nisa 4:103',
      hadithTextEn: 'The Prophet ﷺ said: "The first deed for which a person will be held accountable on the Day of Judgment is his prayer." (Jami at-Tirmidhi 413, Sahih)',
      hadithTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "قیامت کے دن بندے کے اعمال میں سب سے پہلے نماز کا حساب لیا جائے گا۔" (جامع ترمذی: 413)',
      hadithRef: 'Jami at-Tirmidhi 413, Sunan an-Nasa\'i 465',
      keyDetailsEn: [
        'Five Times: Fajr (Dawn), Dhuhr (Midday), Asr (Afternoon), Maghrib (Sunset), and Isha (Night).',
        'Spiritual Recharge: Pauses the relentless race of material life to reconnect with eternity.',
        'Eradication of Sins: Likened by the Prophet ﷺ to a pure river flowing outside one\'s door in which one bathes five times a day (Bukhari 528).',
        'Social Unity: Congregational prayer in the Masjid fosters brotherhood, humility, and equality regardless of wealth or race.'
      ],
      keyDetailsUrdu: [
        'پانچ اوقات: فجر، ظہر، عصر، مغرب اور عشاء کی باقاعدہ ادائیگی۔',
        'گناہوں کی معافی: رسول اللہ ﷺ نے فرمایا جیسے کسی کے دروازے پر نہر ہو اور وہ روز ۵ بار نہائے تو کوئی میل نہیں رہتا، اسی طرح نماز گناہوں کو دھو دیتی ہے۔',
        'فحاشی سے بچاؤ: قرآن فرماتا ہے کہ یقیناً نماز بے حیائی اور برائی سے روکتی ہے۔',
        'مساوات و یکجہتی: امیر و غریب، شاہ و گدا کا ایک صف میں کندھے سے کندھا ملا کر کھڑے ہونا۔'
      ],
      spiritualImpactEn: 'Cultivates mindfulness (Taqwa), shields against immorality (Surah Al-Ankabut 29:45), and grants direct, intimate communication with Allah.',
      spiritualImpactUrdu: 'بندے کو برائیوں اور سرکشی سے محفوظ رکھتی ہے اور روزمرہ کی مصروفیات میں اللہ کی یاد اور سکون کا سامان فراہم کرتی ہے۔'
    },
    {
      number: 3,
      nameArabic: 'الزَّكَاةُ',
      nameTransliteration: 'Az-Zakat',
      nameEn: 'Zakat (Obligatory Almsgiving)',
      nameUrdu: 'زکوٰۃ (مال کی فرض طہارت و صدقہ)',
      meaningEn: 'Purifying wealth by distributing a specific annual portion (normally 2.5% of surplus eligible wealth above the Nisab) to designated deserving categories.',
      meaningUrdu: 'نصاب کو پہنچنے والے مال و دولت پر سال گزرنے کے بعد مخصوص شرح (ڈھائی فیصد) مستحقین کو ادا کرنا۔',
      quranAyahArabic: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
      quranAyahUrdu: 'ان کے اموال میں سے صدقہ (زکوٰۃ) لیجیے جس کے ذریعے آپ انہیں پاک اور بابرکت فرمائیں۔ (سورۃ التوبہ: 103)',
      quranAyahEn: 'Take from their wealth a charity by which you purify them and cause them increase. (Surah At-Tawbah 9:103)',
      quranRef: 'Surah At-Tawbah 9:103',
      hadithTextEn: 'The Prophet ﷺ said to Mu\'adh (RA): "Teach them that Allah has enjoined upon them charity to be taken from their rich and given to their poor." (Sahih al-Bukhari 1395)',
      hadithTextUrdu: 'رسول اللہ ﷺ نے حضرت معاذ بن جبل (رض) کو فرمایا: "انہیں بتاؤ کہ اللہ نے ان پر زکوٰۃ فرض کی ہے جو ان کے مالداروں سے لی جائے گی اور ان کے غریبوں کو لوٹائی جائے گی۔" (صحیح بخاری: 1395)',
      hadithRef: 'Sahih al-Bukhari 1395, Sahih Muslim 19',
      keyDetailsEn: [
        'Rate & Nisab: 2.5% on qualifying wealth (cash, gold, silver, business merchandise) held for a full lunar year above the threshold of Nisab (equivalent to 85 grams of gold or 595 grams of silver).',
        'Not a Tax, but Worship: Zakat is a spiritual purification (Tazkiyah) acknowledging that all provision belongs fundamentally to Allah.',
        'Recipients: Strictly delineated in Surah At-Tawbah (9:60): the poor (Fuqara), the destitute (Masakeen), administrators of Zakat, those whose hearts are reconciled, freeing captives, those in debt, in the cause of Allah, and the stranded traveler.',
        'Economic Impact: Prevents hoarding, circulates capital, and eradicates destitution without crushing entrepreneurship.'
      ],
      keyDetailsUrdu: [
        'شرح اور نصاب: بچت، سونا، چاندی اور مالِ تجارت پر سال گزرنے کے بعد ۲.۵ فیصد (ڈھائی فیصد) زکوٰۃ فرض ہوتی ہے۔',
        'مال کی پاکیزگی: زکوٰۃ ادا کرنے سے مال میں برکت پیدا ہوتی ہے اور بخل و لالچ کی بیماری ختم ہوتی ہے۔',
        'مستحقین کے ۸ مصارف: قرآن مجید کی سورۃ التوبہ (آیت ۶۰) میں واضح کیے گئے ہیں: فقراء، مساکین، عاملین، مقروضین، مسافر، فی سبیل اللہ وغیرہ۔',
        'معاشی عدل: دولت کے ارتکاز کو روک کر معاشرے کے کمزور طبقات کو تحفظ فراہم کرتی ہے۔'
      ],
      spiritualImpactEn: 'Cleanses the human heart from greed and miserliness, creating empathetic communities where wealth circulates rather than stagnates.',
      spiritualImpactUrdu: 'دل کو حرص و طمع سے پاک کرتی ہے، بھائی چارہ مضبوط کرتی ہے اور محتاجوں کے چہروں پر خوشی لاتی ہے۔'
    },
    {
      number: 4,
      nameArabic: 'الصَّوْمُ',
      nameTransliteration: 'As-Sawm',
      nameEn: 'Sawm (Fasting the Month of Ramadan)',
      nameUrdu: 'روزہ (رمضان المبارک کے فرض روزے)',
      meaningEn: 'Abstaining from food, drink, sexual relations, and sinful conduct from true dawn (Fajr) until sunset (Maghrib) during the 9th Islamic month of Ramadan.',
      meaningUrdu: 'رمضان کے مبارک مہینے میں طلوعِ فجر سے غروبِ آفتاب تک کھانے پینے اور تمام ممنوعہ کاموں سے اللہ کی خاطر رکنا۔',
      quranAyahArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      quranAyahUrdu: 'اے ایمان والو! تم پر روزے فرض کیے گئے جیسے تم سے پہلے لوگوں پر فرض کیے گئے تھے تاکہ تم تقویٰ اختیار کرو۔ (سورۃ البقرہ: 183)',
      quranAyahEn: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous. (Surah Al-Baqarah 2:183)',
      quranRef: 'Surah Al-Baqarah 2:183',
      hadithTextEn: 'The Prophet ﷺ said: "Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven." (Sahih al-Bukhari 38)',
      hadithTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "جس نے ایمان اور ثواب کی نیت کے ساتھ رمضان کے روزے رکھے، اس کے پچھلے تمام گناہ معاف کر دیے جاتے ہیں۔" (صحیح بخاری: 38)',
      hadithRef: 'Sahih al-Bukhari 38, Sahih Muslim 760',
      keyDetailsEn: [
        'Target Goal: Attainment of Taqwa (God-consciousness and moral restraint).',
        'Spiritual Dimension: The Prophet ﷺ taught: "Whoever does not give up false speech and evil deeds, Allah is in no need of his giving up food and water" (Sahih al-Bukhari 1903).',
        'Concessions: The ill, travelers, pregnant or nursing women, and the elderly unable to fast are granted divine exemptions to make up missed days later or pay Fidyah.',
        'Month of the Quran: Commemorates the commencement of Quranic revelation and hosts Laylat al-Qadr (the Night of Decree), which is better than a thousand months.'
      ],
      keyDetailsUrdu: [
        'اصل مقصد: تقویٰ اور پرہیزگاری پیدا کرنا اور نفس کی سرکشی پر قابو پانا۔',
        'اخلاقی تقاضا: رسول اللہ ﷺ نے فرمایا کہ جو جھوٹ بولنا اور برے اعمال نہ چھوڑے، اللہ کو اس کے بھوکا پیاسا رہنے کی کوئی ضرورت نہیں۔',
        'شریعت کی آسانیاں: بیمار، مسافر، حاملہ اور دودھ پلانے والی خواتین کے لیے رخصت ہے کہ وہ بعد میں قضا کریں یا فدیہ دیں۔',
        'نزولِ قرآن کا مہینہ: اس مہینے میں لیلۃ القدر ہے جو ہزار مہینوں کی عبادت سے افضل ہے۔'
      ],
      spiritualImpactEn: 'Develops willpower, empathetic solidarity with the hungry, mastery over physical appetites, and deep appreciation for daily blessings.',
      spiritualImpactUrdu: 'انسان میں صبر، ضبطِ نفس اور غریبوں کی بھوک و پیاس کا عملی احساس بیدار کرتا ہے اور دل کو نرم کرتا ہے۔'
    },
    {
      number: 5,
      nameArabic: 'الحَجُّ',
      nameTransliteration: 'Al-Hajj',
      nameEn: 'Hajj (The Pilgrimage to Makkah)',
      nameUrdu: 'حج (بیت اللہ شریف کا مقدس سفر)',
      meaningEn: 'Making the pilgrimage to the Holy House of Allah in Makkah and performing prescribed rites during the 12th Islamic month of Dhul-Hijjah at least once in a lifetime for those physically and financially able.',
      meaningUrdu: 'استطاعت رکھنے والے ہر مسلمان پر زندگی میں ایک بار ذوالحجہ کے مہینے میں مکہ مکرمہ جا کر حج کے مناسک ادا کرنا۔',
      quranAyahArabic: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
      quranAyahUrdu: 'اور لوگوں پر اللہ کا یہ حق ہے کہ جو اس کے گھر تک پہنچنے کی استطاعت رکھے وہ اس کا حج کرے۔ (سورۃ آل عمران: 97)',
      quranAyahEn: 'And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way. (Surah Ali \'Imran 3:97)',
      quranRef: 'Surah Ali \'Imran 3:97',
      hadithTextEn: 'The Prophet ﷺ said: "Whoever performs Hajj and does not commit obscenity or evil deeds will return as pure as the day his mother gave birth to him." (Sahih al-Bukhari 1521)',
      hadithTextUrdu: 'رسول اللہ ﷺ نے فرمایا: "جس نے حج کیا اور کوئی بے حیائی یا نافرمانی نہ کی، وہ ایسے لوٹے گا جیسے اس کی ماں نے اسے آج ہی جنا ہو۔" (صحیح بخاری: 1521)',
      hadithRef: 'Sahih al-Bukhari 1521, Sahih Muslim 1350',
      keyDetailsEn: [
        'Condition of Istita\'ah: Obligatory once in a lifetime only for those who possess financial means (provision and safe transit) and physical capability.',
        'Core Rites: Ihram (sacred state and simple unstitched white cloth for men symbolizing human equality), Tawaf around the Kaaba, Sa\'i between Safa and Marwah, and the climactic Day of Arafah ("Hajj is Arafah" - Tirmidhi 889).',
        'Global Brotherhood: Millions of believers from every nationality, skin tone, language, and social station stand together in absolute unity and humility before Allah.',
        'Spiritual Rebirth: A sincere, accepted Hajj (Hajj Mabrur) erases lifetime sins and redirects a person toward lifelong righteousness.'
      ],
      keyDetailsUrdu: [
        'استطاعت کی شرط: مالی اور بدنی طاقت رکھنے والے عاقل و بالغ مسلمان پر زندگی میں صرف ایک مرتبہ فرض ہے۔',
        'بنیادی مناسک: احرام باندھنا (سفید چادریں جو سب کو برابر کر دیتی ہیں)، طوافِ کعبہ، سعی، اور سب سے بڑا رکن میدانِ عرفات میں وقوف۔',
        'عالمگیر اخوت: رنگ، نسل، زبان اور مرتبے کے فرق مٹا کر تمام مسلمانوں کا ایک ہی لباس اور ایک ہی صدا "لبیک اللھم لبیک" کے ساتھ جمع ہونا۔',
        'نئی زندگی کا آغاز: حجِ مبرور تمام پچھلے گناہوں کو مٹا دیتا ہے اور انسان گناہوں سے ایسے پاک ہو جاتا ہے جیسے نومولود بچہ۔'
      ],
      spiritualImpactEn: 'A profound rehearsal for the Day of Resurrection, stripping away worldly illusions and grounding the soul in absolute humility before the Lord of the Universe.',
      spiritualImpactUrdu: 'دنیا کی آسائشوں کو ترک کر کے میدانِ حشر کا منظر یاد دلاتا ہے اور انسان میں عاجزی و انا کی فنا پیدا کرتا ہے۔'
    }
  ],
  commonMisconceptions: [
    {
      misconceptionEn: 'Believing Zakat is voluntary charity that anyone can donate whenever they want.',
      misconceptionUrdu: 'یہ سمجھنا کہ زکوٰۃ محض ایک عام نفلی خیرات ہے جو کبھی بھی کسی کو بھی دی جا سکتی ہے۔',
      realityEn: 'Zakat is a mandatory religious tax on surplus wealth with strict thresholds (Nisab) and explicitly defined recipients in Surah At-Tawbah 9:60. General voluntary giving is known as Sadaqah.',
      realityUrdu: 'زکوٰۃ ایک قطعی فرض ہے جس کا مخصوص نصاب، حساب اور قرآنی مصارف ہیں۔ اپنی مرضی سے کسی کو بھی کچھ دینا عام نفلی صدقہ کہلاتا ہے، زکوٰۃ نہیں۔',
      reference: 'Surah At-Tawbah 9:60'
    },
    {
      misconceptionEn: 'Thinking Hajj can be perpetually delayed until old age.',
      misconceptionUrdu: 'یہ خیال کرنا کہ حج صرف بڑھاپے میں ہی کرنا چاہیے۔',
      realityEn: 'Once a Muslim possesses the physical and financial ability, scholars emphasize that Hajj should be performed without unnecessary delay, as life and circumstances are uncertain (Sunan Ibn Majah 2883).',
      realityUrdu: 'جیسے ہی مالی اور جسمانی استطاعت میسر آئے، بلا تاخیر فرض حج ادا کرنا چاہیے کیونکہ زندگی اور صحت کا کوئی بھروسا نہیں ہے۔',
      reference: 'Sunan Ibn Majah 2883 (Sahih)'
    },
    {
      misconceptionEn: 'Assuming saying the Shahadah once without understanding its meaning or obligations is sufficient.',
      misconceptionUrdu: 'یہ سمجھنا کہ مفہوم سمجھے بغیر اور عمل کی نیت کے بغیر صرف الفاظ بول دینا ہی کافی ہے۔',
      realityEn: 'Shahadah requires conscious knowledge (Ilm), sincere conviction (Yaqeen), and living according to its requirements through regular prayer and righteous character.',
      realityUrdu: 'کلمہ شہادت زبانی اقرار کے ساتھ دل کی تصدیق اور عملاً اللہ کی اطاعت کا نام ہے۔ مفہوم اور تقاضوں کو سمجھنا لازمی ہے۔',
      reference: 'Sahih al-Bukhari 128'
    }
  ],
  faqs: [
    {
      questionEn: 'Can someone be a Muslim if they neglect one of the 5 pillars?',
      questionUrdu: 'اگر کوئی ان پانچ ارکان میں سے کسی ایک کو چھوڑ دے تو اس کا کیا حکم ہے؟',
      answerEn: 'Denying the obligation of any of the five pillars (e.g. claiming Salah or Zakat is not an obligation) takes a person outside the fold of Islam by scholarly consensus. Failing to perform them out of laziness while acknowledging their obligation is a grave major sin (Fisq) requiring immediate sincere Tawbah (repentance). Salah holds particular gravity as the foundational pillar.',
      answerUrdu: 'کسی بھی رکن کی فرضیت کا انکار کرنا کفر ہے اور انسان کو دائرہ اسلام سے خارج کر دیتا ہے۔ البتہ فرض ماننے کے باوجود سستی سے کوتاہی کرنا کبیرہ گناہ ہے جس سے سچی توبہ اور فوری اصلاح لازم ہے۔',
      reference: 'Al-Majmoo\' Imam Nawawi, Sahih Muslim 82'
    },
    {
      questionEn: 'What is the difference between Islam, Iman, and Ihsan?',
      questionUrdu: 'اسلام، ایمان اور احسان میں کیا فرق ہے؟',
      answerEn: 'In the famous Hadith of Jibreel (Sahih Muslim 8), the Prophet ﷺ defined three ascending tiers of religion: Islam is outward submission (the 5 Pillars); Iman is inward belief (the 6 Articles of Faith); and Ihsan is spiritual excellence: "To worship Allah as though you see Him, and if you do not see Him, [knowing] that He truly sees you."',
      answerUrdu: 'مشہور حدیثِ جبرائیل (صحیح مسلم: 8) میں دین کے تین درجات بتائے گئے ہیں: اسلام ظاہری ارکان (پانچ ستون) ہیں، ایمان قلبی عقائد ہیں، اور احسان یہ ہے کہ "تم اللہ کی عبادت ایسے کرو گویا تم اسے دیکھ رہے ہو، اور اگر تم اسے نہ دیکھ سکو تو وہ تمہیں دیکھ رہا ہے۔"',
      reference: 'Sahih Muslim 8'
    },
    {
      questionEn: 'How is Zakat calculated on mixed modern assets (savings, stocks, gold)?',
      questionUrdu: 'جدید دور میں بینک بیلنس، سونا اور شیئرز پر زکوٰۃ کیسے نکالیں؟',
      answerEn: 'Total your qualifying liquid assets (cash in bank, cash at hand, gold & silver at market value, tradable shares/inventory) at the end of your lunar Zakat year. Deduct immediate short-term liabilities (bills, immediate debts). If the net amount exceeds the Nisab threshold (595g silver or 85g gold), pay 2.5% of that net total.',
      answerUrdu: 'اپنے زکوٰۃ کے سال کے اختتام پر نقد رقم، بینک بیلنس، سونا، چاندی اور مالِ تجارت کی موجودہ مارکیٹ ویلیو جمع کریں۔ فوری واجب الادا قرضے منفی کریں۔ اگر رقم چاندی یا سونے کے نصاب سے زیادہ ہو تو کل کا ڈھائی فیصد (2.5%) بطور زکوٰۃ نکالیں۔',
      reference: 'AAOIFI Shariah Standards, Fiqh az-Zakat'
    },
    {
      questionEn: 'What if someone is physically unable to fast during Ramadan or perform Hajj?',
      questionUrdu: 'اگر کوئی بیماری یا کمزوری کی وجہ سے روزہ یا حج نہ کر سکے تو کیا حکم ہے؟',
      answerEn: 'Islam is built upon divine mercy. Those with temporary illnesses make up missed fasts after recovery. Those with chronic, incurable conditions feed a poor person for every day missed (Fidyah). Hajj is only obligatory for those with capability (Istita\'ah); those who permanently lack physical or financial capability are entirely excused from the obligation without sin.',
      answerUrdu: 'دینِ اسلام میں کوئی تنگی نہیں ہے۔ وقتی بیمار بعد میں روزے کی قضا کرے۔ لاعلاج مریض یا انتہائی بوڑھا ہر روزے کے بدلے مسکین کو کھانا (فدیہ) کھلائے۔ اور حج صرف استطاعت والوں پر فرض ہے، استطاعت نہ ہونے پر کوئی گناہ نہیں۔',
      reference: 'Surah Al-Baqarah 2:184, Surah Ali \'Imran 3:97'
    }
  ],
  internalLinks: [
    {
      tabId: 'how-to-perform-salah',
      path: '/how-to-perform-salah',
      titleEn: 'Step-by-Step Salah Guide',
      titleUrdu: 'نماز کا مکمل طریقہ',
      descEn: 'Learn how to perform the second pillar with accuracy and devotion.',
      descUrdu: 'دوسرے اہم ترین رکن نماز کے تمام ارکان و احکام سیکھیں۔'
    },
    {
      tabId: 'how-to-perform-wudu',
      path: '/how-to-perform-wudu',
      titleEn: 'How to Perform Wudu',
      titleUrdu: 'وضو کا مسنون طریقہ',
      descEn: 'Master the ritual purification prerequisite for Salah.',
      descUrdu: 'نماز کی قبولیت کے لیے جسمانی اور روحانی طہارت کی تفصیل۔'
    },
    {
      tabId: 'islamic-general-knowledge',
      path: '/islamic-general-knowledge',
      titleEn: 'Islamic General Knowledge Hub',
      titleUrdu: 'اسلامی معلومات و عقائد',
      descEn: 'Explore the 6 Articles of Iman, the Prophets, and Seerah.',
      descUrdu: 'ایمانیات، انبیاء کرام اور اسلامی تاریخ کی مستند معلومات۔'
    },
    {
      tabId: 'islamic-quiz',
      path: '/islamic-quiz',
      titleEn: 'Test Your Islamic Knowledge',
      titleUrdu: 'اسلامی کوئز کھیلیں',
      descEn: 'Engage with authentic multiple-choice questions on the 5 Pillars.',
      descUrdu: 'اسلام کے بنیادی ارکان اور احکام پر اپنے علم کی جانچ کریں۔'
    }
  ]
};

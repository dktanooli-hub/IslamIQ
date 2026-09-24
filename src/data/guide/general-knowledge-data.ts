export interface GKSectionItem {
  id: string;
  badgeEn: string;
  badgeUrdu: string;
  titleEn: string;
  titleUrdu: string;
  overviewEn: string;
  overviewUrdu: string;
  quranAyahArabic?: string;
  quranAyahUrdu?: string;
  quranAyahEn?: string;
  quranRef?: string;
  hadithArabic?: string;
  hadithUrdu?: string;
  hadithEn?: string;
  hadithRef?: string;
  facts: Array<{
    labelEn: string;
    labelUrdu: string;
    detailEn: string;
    detailUrdu: string;
    scholarlyNoteEn?: string;
    scholarlyNoteUrdu?: string;
    reference?: string;
  }>;
}

export interface IslamicGeneralKnowledgeGuideData {
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
  coreHadithArabic: string;
  coreHadithUrdu: string;
  coreHadithEn: string;
  coreHadithRef: string;
  sections: GKSectionItem[];
  timelineMilestones: Array<{
    year: string;
    eventEn: string;
    eventUrdu: string;
    significanceEn: string;
    significanceUrdu: string;
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

export const ISLAMIC_GENERAL_KNOWLEDGE_DATA: IslamicGeneralKnowledgeGuideData = {
  seoTitleEn: "Islamic General Knowledge: Pillars, Prophets, Quran & History | IslamIQ",
  seoTitleUrdu: "اسلامی جنرل نالج: ارکان، انبیاء، قرآن اور تاریخ کی مستند معلومات | اسلام آئی کیو",
  seoDescEn: "Comprehensive, authentic Islamic general knowledge guide covering the Five Pillars, Articles of Faith, Prophets in the Quran, Quranic statistics, and Islamic historical milestones with references.",
  seoDescUrdu: "جامع اور مستند اسلامی جنرل نالج: ارکانِ اسلام، ارکانِ ایمان، قرآنی انبیاء کرام، قرآنِ مجید کے حقائق و اعداد و شمار، اور اسلامی تاریخ کے اہم سنگ میل مع حوالہ جات۔",
  canonicalPath: "/islamic-general-knowledge",
  heroBadgeEn: "Comprehensive Educational Compendium • معلومات عامہ اسلامیہ",
  heroBadgeUrdu: "جامع اسلامی انسائیکلوپیڈیا • معلومات عامہ اسلامیہ",
  h1En: "Islamic General Knowledge: The Complete Educational Reference Guide",
  h1Urdu: "اسلامی جنرل نالج: ضروری دینی معلومات اور حقائق کا مستند رہنما",
  introEn: "Islamic General Knowledge encompasses the foundational principles of creed (Aqeedah), obligatory worship (Ibadah), the noble biographies of the Prophets, statistical and structural details of the Holy Quran, and pivotal milestones in Islamic civilization. Gaining this knowledge is not merely academic; it nurtures conviction, deepens love for Allah and His Messenger ﷺ, and equips every Muslim with authentic understanding.",
  introUrdu: "اسلامی جنرل نالج عقائد، عبادات، انبیائے کرام کی پاکیزہ سیرت، قرآنِ حکیم کے اعداد و حقائق، اور اسلامی تاریخ کے اہم ابواب پر مشتمل ہے۔ یہ بنیادی فہم حاصل کرنا محض معلومات کا ذخیرہ نہیں بلکہ ایمان میں پختگی، اللہ اور اس کے رسول ﷺ سے سچی محبت، اور ایک صاحبِ بصیرت مسلمان بننے کی بنیاد ہے۔",
  coreHadithArabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
  coreHadithUrdu: "علمِ دین حاصل کرنا ہر مسلمان (مرد و عورت) پر فرض ہے۔",
  coreHadithEn: "Seeking knowledge is an obligation upon every Muslim.",
  coreHadithRef: "Sunan Ibn Majah, Hadith 224 (Classed as Sahih by Al-Albani)",
  sections: [
    {
      id: "pillars-and-faith",
      badgeEn: "Core Foundations",
      badgeUrdu: "بنیادی ستون",
      titleEn: "The 5 Pillars of Islam & 6 Articles of Faith",
      titleUrdu: "اسلام کے ۵ ارکان اور ایمان کے ۶ ستون",
      overviewEn: "Islam is built upon outward actions of physical and financial submission (the 5 Pillars), anchored firmly by inner convictions of the heart (the 6 Articles of Faith). The famous Hadith Jibreel (Gabriel) establishes this distinction.",
      overviewUrdu: "اسلام ظاہری جسمانی و مالی اعمال (۵ ارکانِ اسلام) پر قائم ہے، جن کی جڑیں باطنی قلبی یقین (۶ ارکانِ ایمان) میں پیوست ہیں۔ حدیثِ جبرائیل علیہ السلام نے اس فرق اور تعلق کو خوب واضح فرمایا ہے۔",
      quranAyahArabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ",
      quranAyahUrdu: "رسول اس پر ایمان لائے جو ان کے رب کی طرف سے نازل ہوا اور مومنین بھی۔ سب اللہ، اس کے فرشتوں، اس کی کتابوں اور اس کے رسولوں پر ایمان لائے۔",
      quranAyahEn: "The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers.",
      quranRef: "Surah Al-Baqarah (2:285)",
      facts: [
        {
          labelEn: "Pillar 1: Shahadah (Declaration of Faith)",
          labelUrdu: "پہلا رکن: کلمہ شہادت",
          detailEn: "Testifying 'Ash-hadu alla ilaha illallah, wa ash-hadu anna Muhammadan rasulullah' (There is no deity worthy of worship except Allah, and Muhammad is His servant and Messenger). It is the gateway into Islam.",
          detailUrdu: "اس بات کی گواہی دینا کہ اللہ کے سوا کوئی سچا معبود نہیں اور حضرت محمد ﷺ اللہ کے بندے اور رسول ہیں۔ یہ اسلام میں داخلے کی بنیاد ہے۔",
          reference: "Sahih al-Bukhari 8"
        },
        {
          labelEn: "Pillar 2: Salah (Daily Prayers)",
          labelUrdu: "دوسرا رکن: پانچ وقت کی نماز",
          detailEn: "The 5 obligatory prayers daily (Fajr, Dhuhr, Asr, Maghrib, Isha). Salah was gifted directly to the Prophet ﷺ during Al-Isra wal-Miraj (the Night Journey & Ascension).",
          detailUrdu: "روزانہ پانچ وقت کی فرض نمازیں (فجر، ظہر، عصر، مغرب، عشاء)۔ نماز کا تحفہ واقعہ معراج کے مبارک موقع پر براہِ راست امت کو عطا ہوا۔",
          reference: "Sahih al-Bukhari 349, Sahih Muslim 162"
        },
        {
          labelEn: "Pillar 3: Zakat (Obligatory Charity)",
          labelUrdu: "تیسرا رکن: زکوٰۃ",
          detailEn: "An annual 2.5% wealth purification levied on eligible surplus assets exceeding the Nisab threshold held for a full lunar year (Hawl), distributed to 8 specific categories mentioned in Surah At-Tawbah (9:60).",
          detailUrdu: "صاحبِ نصاب مسلمان کے فاضل مال پر سال گزرنے کے بعد 2.5 فیصد کی ادائیگی، جو قرآن میں بیان کردہ ۸ مصارف (سورۃ التوبہ: ۶۰) میں تقسیم کی جاتی ہے۔",
          reference: "Quran (9:60)"
        },
        {
          labelEn: "Pillar 4: Sawm (Ramadan Fasting)",
          labelUrdu: "چوتھا رکن: صوم (رمضان کے روزے)",
          detailEn: "Abstaining from food, drink, and intimate marital relations from true dawn (Fajr) until sunset (Maghrib) with the intention of pleasing Allah during the 9th lunar month of Ramadan.",
          detailUrdu: "ماہِ رمضان میں طلوعِ فجر سے لے کر غروبِ آفتاب تک کھانے پینے اور تمام مفطرات سے رضائے الٰہی کی نیت سے رکے رہنا۔",
          reference: "Surah Al-Baqarah (2:183)"
        },
        {
          labelEn: "Pillar 5: Hajj (Pilgrimage to Makkah)",
          labelUrdu: "پانچواں رکن: حج بیت اللہ",
          detailEn: "The spiritual pilgrimage to Makkah performed in the Islamic month of Dhul Hijjah (8th-12th/13th) once in a lifetime for those who possess the physical and financial ability (Istita'ah).",
          detailUrdu: "ماہِ ذوالحجہ میں مکہ مکرمہ کی زیارت اور ارکانِ حج کی ادائیگی، جو زندگی میں ایک بار ہر صاحبِ استطاعت پر فرض ہے۔",
          reference: "Surah Ali 'Imran (3:97)"
        },
        {
          labelEn: "The 6 Articles of Faith (Arkan al-Iman)",
          labelUrdu: "ایمان کے چھ بنیادی ارکان",
          detailEn: "Belief in: 1) Allah and His Absolute Oneness (Tawheed), 2) His Angels, 3) His Revealed Books, 4) His Messengers, 5) The Day of Judgment (Akhirah), and 6) Divine Decree (Al-Qadr, both pleasant and trying).",
          detailUrdu: "ایمان لانا: ۱) اللہ کی توحید پر، ۲) اس کے معصوم فرشتوں پر، ۳) آسمانی کتابوں پر، ۴) تمام انبیاء و رسل پر، ۵) قیامت کے دن پر، اور ۶) تقدیر کے اچھے اور برے ہونے پر۔",
          reference: "Sahih Muslim 8 (Hadith Jibreel)"
        }
      ]
    },
    {
      id: "quran-facts",
      badgeEn: "Divine Scripture",
      badgeUrdu: "قرآنِ کریم",
      titleEn: "Structure, Surahs & Milestones of the Holy Quran",
      titleUrdu: "قرآنِ مجید کی ساخت، سورتیں اور اہم تاریخی حقائق",
      overviewEn: "The Holy Quran is the uncreated, literal Word of Allah revealed to Prophet Muhammad ﷺ through Angel Jibreel over approximately 23 years (610 CE – 632 CE). It has been preserved verbatim in letter, pronunciation, and meaning across centuries.",
      overviewUrdu: "قرآنِ مجید اللہ تعالیٰ کا برحق، غیر مخلوق کلام ہے جو حضرت جبرائیل علیہ السلام کے ذریعے تقریباً ۲۳ سال کے عرصے میں نبی کریم ﷺ پر نازل ہوا۔ اس کی حفاظت کا ذمہ خود باری تعالیٰ نے لیا ہے۔",
      quranAyahArabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
      quranAyahUrdu: "بے شک ہم نے ہی اس ذکر (قرآن) کو نازل کیا اور ہم ہی یقیناً اس کی حفاظت کرنے والے ہیں۔",
      quranAyahEn: "Indeed, it is We who sent down the Qur'an and indeed, We will be its guardian.",
      quranRef: "Surah Al-Hijr (15:9)",
      facts: [
        {
          labelEn: "Total Surahs and Divisions",
          labelUrdu: "کل سورتیں، پارے اور رکوع",
          detailEn: "The Quran contains 114 Surahs, 30 Juz (Ajza/Paras), 7 Manzils (for weekly recitation), and approximately 6,236 Ayahs (depending on scholarly Ayah-numbering conventions such as the Kufic tradition).",
          detailUrdu: "قرآن پاک میں ۱۱۴ سورتیں، ۳۰ پارے، ۷ منزلیں اور کوفی گنتی کے مطابق ۶،۲۳۶ آیاتِ مبارکہ ہیں۔",
          scholarlyNoteEn: "Note on Ayah counts: Scholars of Qira'at count Ayahs between 6,204 and 6,236. This difference arises solely from where certain pauses or Bismillahs are numbered as verses, not from any variation in the underlying text.",
          scholarlyNoteUrdu: "وضاحت: قراء کرام کے مابین آیات کی تعداد میں جزوی فرق (۶،۲۰۴ تا ۶،۲۳۶) محض آیات کے اختتام اور وقف کی گنتی کی بنیاد پر ہے، اصل قرآنی الفاظ و متن میں کوئی فرق نہیں ہے۔"
        },
        {
          labelEn: "Longest and Shortest Surahs",
          labelUrdu: "طویل ترین اور مختصر ترین سورت",
          detailEn: "Longest: Surah Al-Baqarah (286 Ayahs, containing Ayat al-Kursi 2:255 and the verse of debt 2:282, which is the longest single Ayah). Shortest: Surah Al-Kawthar (3 Ayahs, 10 words).",
          detailUrdu: "سب سے طویل سورۃ: سورۃ البقرہ (۲۸۶ آیات، جس میں آیت الکرسی اور قرآنی کی سب سے لمبی آیت یعنی آیتِ مداینہ شامل ہے)۔ سب سے مختصر سورۃ: سورۃ الکوثر (۳ آیات)۔",
          reference: "Sahih al-Bukhari 4987"
        },
        {
          labelEn: "First and Last Revelations",
          labelUrdu: "پہلی اور آخری وحی",
          detailEn: "First revelation: Surah Al-Alaq (96:1-5) revealed in the Cave of Hira in Ramadan 610 CE. The final verses revealed according to strong scholarly consensus include Surah Al-Baqarah (2:281).",
          detailUrdu: "پہلی وحی: غارِ حرا میں سورۃ العلق کی پہلی ۵ آیات (اقْرَأْ بِاسْمِ رَبِّكَ)۔ کبار صحابہ اور علماء کے نزدیک آخری نازل ہونے والی آیات میں سورۃ البقرہ کی آیت ۲۸۱ شامل ہے۔",
          reference: "Sahih al-Bukhari 3, 4987"
        },
        {
          labelEn: "Makki vs. Madani Surahs",
          labelUrdu: "مکی اور مدنی سورتوں کا فرق",
          detailEn: "86 Surahs are Makki (revealed before the Hijrah to Madinah, emphasizing Tawheed, Day of Judgment, and spiritual steadfastness). 28 Surahs are Madani (revealed after Hijrah, detailing legal codes, social justice, family law, and governance).",
          detailUrdu: "۸۶ سورتیں مکی ہیں (جو ہجرتِ مدینہ سے قبل نازل ہوئیں اور ان میں توحید، آخرت اور صبر پر زور ہے)۔ ۲۸ سورتیں مدنی ہیں (جو ہجرت کے بعد اتریں اور ان میں احکام، قوانین اور معاشرتی نظام بیان ہوا)۔"
        },
        {
          labelEn: "Surahs with Unique Characteristics",
          labelUrdu: "خصوصی سورتیں اور بسم اللہ کے احکام",
          detailEn: "Surah At-Tawbah (Surah Bara'ah) has no Bismillah at its start because it is a stern declaration of disavowal towards treaty-breakers, while Surah An-Naml has Bismillah mentioned twice (at the start and inside Ayah 27:30 in Sulaiman's letter).",
          detailUrdu: "سورۃ التوبہ کے آغاز میں بسم اللہ نہیں لکھی جاتی کیونکہ یہ مشرکین کے عہد شکنی پر اعلانِ برأت ہے، جبکہ سورۃ النمل میں دو بار بسم اللہ آئی ہے (ایک شروع میں اور ایک حضرت سلیمان علیہ السلام کے خط میں آیت ۳۰ پر)۔"
        },
        {
          labelEn: "Heart & Crown of the Quran",
          labelUrdu: "قرآن کا دل اور زینت",
          detailEn: "Surah Yasin is celebrated as 'the Heart of the Quran' (Qalb al-Quran), Surah Ar-Rahman is known as the 'Bride of the Quran' (Aroos al-Quran), and Surah Al-Ikhlas is equal to one-third of the Quran in reward and creedal weight.",
          detailUrdu: "سورۃ یٰسین کو قرآن کا دل کہا جاتا ہے، سورۃ الرحمن کو عروس القرآن (قرآن کی دلہن) سے موسوم کیا جاتا ہے، اور سورۃ الاخلاص کا اجر و معنوی وزن ایک تہائی قرآن کے برابر ہے۔",
          reference: "Sahih al-Bukhari 5015 (Surah Ikhlas)"
        }
      ]
    },
    {
      id: "prophets-in-islam",
      badgeEn: "Chains of Guidance",
      badgeUrdu: "سلسلہ نبوت و رسالت",
      titleEn: "The Noble Prophets (Anbiya) in the Quran",
      titleUrdu: "قرآنِ مجید میں مذکور برگزیدہ انبیائے کرام",
      overviewEn: "Islam teaches that Allah sent approximately 124,000 prophets across human history to guide every nation. Exactly 25 Prophets and Messengers are named explicitly in the text of the Holy Quran, beginning with Adam (AS) and culminating with Muhammad ﷺ.",
      overviewUrdu: "اسلامی تعلیمات کے مطابق انسانی تاریخ میں اللہ تعالیٰ نے کم و بیش ایک لاکھ چوبیس ہزار پیغمبر مبعوث فرمائے۔ ان میں سے ۲۵ برگزیدہ پیغمبروں کے اسماء گرامی قرآنِ مجید میں صراحتاً وارد ہوئے ہیں، جن کا آغاز حضرت آدم علیہ السلام سے اور تکمیل حضرت محمد ﷺ پر ہوئی۔",
      quranAyahArabic: "وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًا لَّمْ نَقْصُصْهُمْ عَلَيْكَ ۚ وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا",
      quranAyahUrdu: "اور ایسے رسول جن کا ذکر ہم نے پہلے آپ سے کیا، اور ایسے رسول جن کا ذکر ہم نے آپ سے نہیں کیا۔ اور اللہ نے موسیٰ سے براہِ راست کلام فرمایا۔",
      quranAyahEn: "And [We sent] messengers about whom We have related [their stories] to you before and messengers about whom We have not related to you. And Allah spoke to Moses with [direct] speech.",
      quranRef: "Surah An-Nisa (4:164)",
      facts: [
        {
          labelEn: "The 25 Prophets Named in the Quran",
          labelUrdu: "قرآن میں مذکور ۲۵ انبیائے کرام",
          detailEn: "Adam, Idris (Enoch), Nuh (Noah), Hud, Salih, Ibrahim (Abraham), Lut (Lot), Ismail (Ishmael), Ishaq (Isaac), Ya'qub (Jacob), Yusuf (Joseph), Ayyub (Job), Shu'ayb, Musa (Moses), Harun (Aaron), Dhul-Kifl (Ezekiel), Dawud (David), Sulaiman (Solomon), Ilyas (Elijah), Al-Yasa (Elisha), Yunus (Jonah), Zakariyya (Zechariah), Yahya (John), Isa (Jesus), and Muhammad (peace be upon them all).",
          detailUrdu: "آدم، ادریس، نوح، ہود، صالح، ابراہیم، لوط، اسماعیل، اسحاق، یعقوب، یوسف، ایوب، شعیب، موسیٰ، ہارون، ذو الکفل، داؤد، سلیمان، الیاس، الیسع، یونس، زکریا، یحییٰ، عیسیٰ، اور حضرت محمد مصطفیٰ ﷺ۔",
          reference: "Surah Al-An'am (6:83-86)"
        },
        {
          labelEn: "Ulul 'Azm (The Five Resolute Arch-Prophets)",
          labelUrdu: "اولوا العزم من الرسل (پانچ عظیم پیغمبر)",
          detailEn: "The five Messengers possessing the highest determination and enduring the greatest trials: Nuh, Ibrahim, Musa, Isa, and Muhammad (peace and blessings be upon them).",
          detailUrdu: "انتہائی صبر اور اولوا العزمی کے حامل ۵ جلیل القدر پیغمبر: حضرت نوح، حضرت ابراہیم، حضرت موسیٰ، حضرت عیسیٰ اور خاتم النبیین حضرت محمد مصطفیٰ ﷺ۔",
          reference: "Surah Al-Ahqaf (46:35), Surah Al-Ahzab (33:7)"
        },
        {
          labelEn: "Arab Prophets Among the 25",
          labelUrdu: "عرب انبیائے کرام",
          detailEn: "According to authentic traditions, four of the 25 named prophets were from the ancient Arab peoples: Hud (sent to 'Ad), Salih (sent to Thamud), Shu'ayb (sent to Madyan), and Muhammad ﷺ (sent to all humanity).",
          detailUrdu: "روایات کے مطابق ۲۵ میں سے ۴ پیغمبر عرب قوموں میں مبعوث ہوئے: حضرت ہود (قوم عاد کی طرف)، حضرت صالح (قوم ثمود کی طرف)، حضرت شعیب (اہلِ مدین کی طرف)، اور حضرت محمد ﷺ (تمام انسانیت کی طرف)۔",
          reference: "Sahih Ibn Hibban 361"
        },
        {
          labelEn: "Prophet Musa (Moses) Mention Frequency",
          labelUrdu: "قرآن میں کثرت سے مذکور پیغمبر",
          detailEn: "Prophet Musa (AS) is the most frequently mentioned Prophet in the Quran, appearing by name over 136 times across 34 Surahs, providing believers profound lessons on patience, confronting tyranny, and divine aid.",
          detailUrdu: "قرآنِ کریم میں سب سے زیادہ مرتبہ حضرت موسیٰ علیہ السلام کا تذکرہ مبارک آیا ہے (۱۳۶ سے زائد مرتبہ، ۳۴ مختلف سورتوں میں) تاکہ امت کو فرعونیت کے خلاف حق کی فتح اور صبر کے اسباق ملیں۔"
        }
      ]
    },
    {
      id: "islamic-calendar-and-places",
      badgeEn: "Sacred Geography & Time",
      badgeUrdu: "مقدس مقامات اور اسلامی تقویم",
      titleEn: "Islamic Lunar Months & The Three Sacred Mosques",
      titleUrdu: "اسلامی قمری مہینے اور تین مقدس ترین مساجد",
      overviewEn: "The Islamic calendar (Hijri) is strictly lunar, instituted by Caliph Umar ibn al-Khattab (RA) starting from the migration (Hijrah) in 622 CE. Islam also reserves supreme sanctity for three specific places of worship on Earth.",
      overviewUrdu: "اسلامی ہجری تقویم چاند کی رویت پر مبنی ہے جس کا باقاعدہ آغاز خلیفہ دوم حضرت عمر فاروق رضی اللہ عنہ کے دور میں ہجرتِ نبوی (۶۲۲ء) سے ہوا۔ نیز روئے زمین پر تین مساجد کو خصوصی شرف و تقدس حاصل ہے۔",
      quranAyahArabic: "إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ مِنْهَا أَرْبَعَةٌ حُرُمٌ",
      quranAyahUrdu: "بے شک مہینوں کی گنتی اللہ کے نزدیک اللہ کی کتاب میں بارہ مہینے ہے، جس دن سے اس نے آسمانوں اور زمین کو پیدا کیا، ان میں سے چار حرمت والے ہیں۔",
      quranAyahEn: "Indeed, the number of months with Allah is twelve [lunar] months in the register of Allah [from] the day He created the heavens and the earth; of these, four are sacred.",
      quranRef: "Surah At-Tawbah (9:36)",
      facts: [
        {
          labelEn: "The 12 Hijri Months in Order",
          labelUrdu: "۱۲ اسلامی مہینوں کے نام بالترتیب",
          detailEn: "1. Muharram, 2. Safar, 3. Rabi al-Awwal, 4. Rabi al-Thani, 5. Jumada al-Ula, 6. Jumada al-Thaniyah, 7. Rajab, 8. Sha'ban, 9. Ramadan, 10. Shawwal, 11. Dhul Qi'dah, 12. Dhul Hijjah.",
          detailUrdu: "۱. محرم الحرام، ۲. صفر المظفر، ۳. ربیع الاول، ۴. ربیع الثانی، ۵. جمادی الاولیٰ، ۶. جمادی الثانیہ، ۷. رجب المرجب، ۸. شعبان المعظم، ۹. رمضان المبارک، ۱۰. شوال المکرم، ۱۱. ذوالقعدہ، ۱۲. ذوالحجہ۔"
        },
        {
          labelEn: "The 4 Sacred Months (Al-Ashhur Al-Hurum)",
          labelUrdu: "چار حرمت والے مہینے",
          detailEn: "Three consecutive months: Dhul Qi'dah, Dhul Hijjah, and Muharram; and one individual month: Rajab. In these months, warfare was prohibited in ancient Arabia, and good deeds bring amplified rewards while sins carry greater gravity.",
          detailUrdu: "تین متواتر مہینے: ذوالقعدہ، ذوالحجہ، اور محرم؛ اور ایک الگ مہینہ: رجب۔ ان مہینوں میں ظلم و گناہ کی شناعت اور نیک اعمال کا ثواب بڑھ جاتا ہے۔",
          reference: "Sahih al-Bukhari 3197"
        },
        {
          labelEn: "The 3 Most Sacred Mosques on Earth",
          labelUrdu: "زمین کی تین مقدس ترین مساجد",
          detailEn: "1) Al-Masjid al-Haram in Makkah (contains the Holy Ka'bah; 1 prayer equals 100,000 elsewhere). 2) Al-Masjid an-Nabawi in Madinah (Prophet's Mosque; 1 prayer equals 1,000 elsewhere). 3) Al-Masjid al-Aqsa in Al-Quds/Jerusalem (first Qibla; 1 prayer equals 250 or 500 elsewhere according to authentic narrations).",
          detailUrdu: "۱) مسجد الحرام (مکہ مکرمہ: ایک نماز کا ثواب ایک لاکھ نماز کے برابر)۔ ۲) مسجد نبوی شریف (مدینہ منورہ: ایک نماز کا ثواب ایک ہزار نماز کے برابر)۔ ۳) مسجد اقصیٰ (بیت المقدس: مسلمانوں کا قبلہ اول)۔",
          reference: "Sahih al-Bukhari 1189, Musnad Ahmad 14068"
        }
      ]
    },
    {
      id: "righteous-caliphs",
      badgeEn: "The Golden Era",
      badgeUrdu: "خلافتِ راشدہ",
      titleEn: "The Four Rightly Guided Caliphs (Khulafa ar-Rashidun)",
      titleUrdu: "خلفائے راشدین رضی اللہ عنہم اجمعین",
      overviewEn: "Following the passing of Prophet Muhammad ﷺ in 11 AH (632 CE), the leadership of the Muslim Ummah was entrusted to four outstanding companions known for their wisdom, justice, humility, and strict adherence to the prophetic sunnah.",
      overviewUrdu: "نبی کریم ﷺ کے وصال مبارک کے بعد امتِ مسلمہ کی قیادت چار جلیل القدر صحابہ نے سنبھالی جنہوں نے عدل، تقویٰ، اور شوریٰ کے الٰہی اصولوں پر مبنی نظام قائم کیا۔",
      hadithArabic: "عَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الْمَهْدِيِّينَ الرَّاشِدِينَ",
      hadithUrdu: "تم پر میری سنت اور ہدایت یافتہ خلفائے راشدین کا طریقہ لازم ہے۔",
      hadithEn: "You must adhere to my Sunnah and the way of the rightly guided, righteous caliphs.",
      hadithRef: "Sunan Abi Dawud 4607 (Sahih)",
      facts: [
        {
          labelEn: "1. Abu Bakr As-Siddiq (RA) (11-13 AH / 632-634 CE)",
          labelUrdu: "۱. حضرت ابوبکر صدیق رضی اللہ عنہ",
          detailEn: "The closest companion, first adult male to accept Islam, leader in the cave of Thawr, and unifier of Arabia after the Riddah (apostasy) wars. He initiated the compilation of the Quran into a single codex (Mushaf).",
          detailUrdu: "یارِ غار، مردوں میں سب سے پہلے اسلام قبول کرنے والے، اور فتنہ ارتداد کا خاتمہ کر کے قرآن مجید کو ایک مصحف میں یکجا کرنے کی تدوین کا آغاز کرنے والے۔"
        },
        {
          labelEn: "2. Umar ibn al-Khattab (RA) (13-23 AH / 634-644 CE)",
          labelUrdu: "۲. حضرت عمر فاروق رضی اللہ عنہ",
          detailEn: "Known as Al-Farooq (the one who distinguishes truth from falsehood). Under his leadership, the Islamic state expanded across Persia, Syria, and Egypt; he introduced the Hijri calendar, public treasury (Bayt al-Mal), and regular postal and judicial institutions.",
          detailUrdu: "الفاروق، عدل و انصاف کے پیکر۔ ان کے عہد میں قیصر و کسریٰ کی سلطنتیں زیر ہوئیں، ہجری تقویم، بیت المال، باقاعدہ عدالتی نظام اور فلاحی ریاست کا قیام عمل میں آیا۔"
        },
        {
          labelEn: "3. Uthman ibn Affan (RA) (23-35 AH / 644-656 CE)",
          labelUrdu: "۳. حضرت عثمان غنی رضی اللہ عنہ",
          detailEn: "Known as Dhun-Nurayn (possessor of the two lights, having married two daughters of the Prophet ﷺ). He financed major community wells and expeditions, and standardized the official written text of the Holy Quran sent to all provincial capitals.",
          detailUrdu: "ذو النورین، حیا و سخاوت کے پیکر۔ آپ نے امت کو قراءت کے اختلافات سے بچانے کے لیے مصحفِ عثمانی کو معیاری شکل میں تمام اسلامی ریاستوں میں پھیلایا۔"
        },
        {
          labelEn: "4. Ali ibn Abi Talib (RA) (35-40 AH / 656-661 CE)",
          labelUrdu: "۴. حضرت علی المرتضیٰ رضی اللہ عنہ",
          detailEn: "Cousin and son-in-law of the Prophet ﷺ, known as Asadullah (Lion of Allah) and the gate to the city of prophetic knowledge. Renowned for supreme eloquence, judicial mastery, and unmatched bravery.",
          detailUrdu: "اسد اللہ، باب مدینۃ العلم، نبی کریم ﷺ کے چچازاد بھائی اور داماد۔ علم، فصاحت، شجاعت اور عدالتی فیصلوں کے بے مثال امام۔"
        }
      ]
    }
  ],
  timelineMilestones: [
    {
      year: "570 CE",
      eventEn: "Year of the Elephant (Am al-Fil)",
      eventUrdu: "عام الفیل (ہاتھی کا سال)",
      significanceEn: "Abrahah's elephant army attempted to demolish the Ka'bah and was miraculously destroyed by swarms of birds (Ababil). Prophet Muhammad ﷺ was born in Makkah in this year.",
      significanceUrdu: "ابرحہ کے لشکر نے کعبہ پر حملہ کیا اور ابابیلوں کے ذریعے تباہ ہوا۔ اسی مبارک سال میں نبی اکرم ﷺ کی ولادت باسعادت ہوئی۔"
    },
    {
      year: "610 CE",
      eventEn: "First Divine Revelation at Cave Hira",
      eventUrdu: "پہلی وحی کا نزول (غارِ حرا)",
      significanceEn: "At age 40, Prophet Muhammad ﷺ received the first verses of Surah Al-Alaq from Angel Jibreel, marking the commencement of the final Prophethood.",
      significanceUrdu: "چالیس سال کی عمر میں حضرت جبرائیل علیہ السلام نے غارِ حرا میں پہلی وحی نازل کی، اور نبوت کا باقاعدہ آغاز ہوا۔"
    },
    {
      year: "622 CE",
      eventEn: "The Great Hijrah to Madinah (Year 1 AH)",
      eventUrdu: "ہجرتِ مدینہ منورہ (سال اول ہجری)",
      significanceEn: "The migration of the Prophet ﷺ and Muslims from persecuted Makkah to Yathrib (renamed Al-Madinah Al-Munawwarah), establishing the first Islamic fraternal society and marking Year 1 of the Islamic Calendar.",
      significanceUrdu: "مکہ سے مدینہ منورہ کی طرف ہجرت، جس سے مواخات اور اسلامی ریاست کی بنیاد رکھی گئی، اور اسلامی ہجری کیلنڈر کا آغاز ہوا۔"
    },
    {
      year: "624 CE (2 AH)",
      eventEn: "Battle of Badr & Change of Qibla",
      eventUrdu: "غزوہ بدر اور تحویلِ قبلہ",
      significanceEn: "The decisive victory of 313 ill-equipped Muslims over a 1,000-strong pagan army, establishing the moral and strategic authority of Islam in Arabia.",
      significanceUrdu: "حق و باطل کا پہلا معرکہ جس میں ۳۱۳ نہتے مسلمانوں نے ایک ہزار کے لشکر پر فتح پائی۔ اسی سال تحویلِ قبلہ کا حکم بھی آیا۔"
    },
    {
      year: "630 CE (8 AH)",
      eventEn: "The Peaceful Conquest of Makkah (Fath Makkah)",
      eventUrdu: "فتح مکہ (۸ ہجری)",
      significanceEn: "The Prophet ﷺ entered his beloved birthplace with 10,000 companions with zero bloodshed, cleansed the Holy Ka'bah of all 360 idols, and proclaimed general amnesty: 'Go, for you are free.'",
      significanceUrdu: "نبی کریم ﷺ بغیر خون خرابے کے مکہ میں فاتحانہ داخل ہوئے، کعبہ کو ۳۶۰ بتوں سے پاک کیا اور اپنے جانی دشمنوں کے لیے عام معافی کا اعلان فرمایا۔"
    },
    {
      year: "632 CE (10 AH)",
      eventEn: "Farewell Pilgrimage (Hajjat al-Wada)",
      eventUrdu: "حجۃ الوداع (۱۰ ہجری)",
      significanceEn: "The Prophet ﷺ delivered the historic Farewell Sermon on Mount Arafat, declaring universal human equality, women's rights, and the sanctity of human life, honor, and property.",
      significanceUrdu: "عرفات کے میدان میں خطبہ حجۃ الوداع، جس میں نسلی و لسانی برتری کی نفی اور انسانی و نسوانی حقوق کا عالمگیر منشور عطا فرمایا گیا۔"
    }
  ],
  faqs: [
    {
      questionEn: "How many prophets are explicitly mentioned by name in the Quran?",
      questionUrdu: "قرآن پاک میں نام کے ساتھ کتنے انبیاء کرام کا ذکر آیا ہے؟",
      answerEn: "Exactly 25 prophets are explicitly mentioned by name in the Holy Quran. The total number of prophets sent across human history is traditionally reported as 124,000 in a narration recorded by Imam Ahmad and Ibn Hibban, though only Allah knows the exact number.",
      answerUrdu: "قرآنِ کریم میں نام کے ساتھ ۲۵ انبیائے کرام کا ذکر آیا ہے۔ جبکہ تاریخِ انسانی میں کل انبیاء کی تعداد ایک لاکھ چوبیس ہزار بتائی گئی ہے، لیکن حتمی علم صرف اللہ تعالیٰ کے پاس ہے۔",
      reference: "Surah Al-An'am (6:83-86), Musnad Ahmad 22288"
    },
    {
      questionEn: "Why is Surah At-Tawbah the only Surah without Bismillah at the beginning?",
      questionUrdu: "سورۃ التوبہ کے شروع میں بسم اللہ کیوں نہیں ہے؟",
      answerEn: "Scholars, citing Abdullah ibn Abbas (RA) and Ali ibn Abi Talib (RA), explain that 'Bismillah ar-Rahman ar-Rahim' is an invocation of peace, safety, and mercy, whereas Surah At-Tawbah was revealed as an ultimatum and disavowal of treachery against pagan treaty-breakers. Furthermore, companions noted that its themes connected closely with the preceding Surah Al-Anfal.",
      answerUrdu: "حضرت علی اور ابن عباس رضی اللہ عنہما کے مطابق 'بسم اللہ' امن، رحمت اور سلامتی کا پیغام ہے، جبکہ سورۃ التوبہ مشرکین کی عہد شکنی پر تلوار اور اعلانِ براءت کے ساتھ نازل ہوئی، اس لیے اس کے آغاز میں بسم اللہ نہیں لکھی گئی۔",
      reference: "Jami' at-Tirmidhi 3086"
    },
    {
      questionEn: "What is the difference between a Nabi (Prophet) and a Rasul (Messenger)?",
      questionUrdu: "نبی اور رسول میں کیا فرق ہے؟",
      answerEn: "A Rasul (Messenger) is a prophet sent with a new divine book, sacred shariah (legal code), and directed toward a people that rejected or had no previous scripture. A Nabi (Prophet) is a divinely guided chosen servant who confirms and teaches an existing scripture and law (such as the numerous prophets of Israel who taught the Torah). Every Rasul is a Nabi, but not every Nabi is a Rasul.",
      answerUrdu: "رسول وہ ہوتا ہے جسے نئی شریعت یا آسمانی کتاب دے کر کسی قوم کی طرف بھیجا جائے، جبکہ نبی اللہ کا برگزیدہ پیغمبر ہوتا ہے جو پچھلی شریعت اور کتاب کی تبلیغ و تجدید کرتا ہے (جیسے بنی اسرائیل کے کثیر انبیاء جو تورات کے احکام نافذ کرتے تھے)۔ پس ہر رسول نبی ہوتا ہے لیکن ہر نبی رسول نہیں ہوتا۔",
      reference: "Tafsir Ibn Kathir (Surah Maryam 19:51)"
    },
    {
      questionEn: "What are the four sacred months in the Islamic calendar and why are they sacred?",
      questionUrdu: "چار حرمت والے مہینے کون سے ہیں اور ان کی کیا فضیلت ہے؟",
      answerEn: "The four sacred months are Dhul Qi'dah, Dhul Hijjah, Muharram, and Rajab (Surah At-Tawbah 9:36). They are designated 'sacred' because fighting was prohibited to allow safe pilgrimage and trade, and both good deeds and transgressions carry intensified weight in the sight of Allah during these months.",
      answerUrdu: "چار حرمت والے مہینے ذوالقعدہ، ذوالحجہ، محرم اور رجب ہیں۔ ان میں جنگ و جدل کی ممانعت تھی تاکہ حج اور تجارت کا سفر محفوظ رہے، اور ان ایام میں نیک اعمال کا اجر اور گناہوں کی پکڑ بڑھ جاتی ہے۔",
      reference: "Sahih al-Bukhari 3197"
    },
    {
      questionEn: "Who compiled the Holy Quran into book form?",
      questionUrdu: "قرآنِ پاک کو کتابی شکل میں کس نے جمع کروایا؟",
      answerEn: "During the caliphate of Abu Bakr (RA), following the Battle of Yamama where many Huffadh (memorizers) were martyred, Umar (RA) suggested compiling the Quran into one volume. Zayd ibn Thabit (RA) headed this meticulous project. Later, Caliph Uthman (RA) unified the Muslim world upon one standardized dialect and script (the Uthmani Mushaf), sending verified copies across the Islamic territories.",
      answerUrdu: "حضرت ابوبکر صدیق رضی اللہ عنہ کے دور میں جنگِ یمامہ میں حفاظ کی شہادت کے بعد حضرت عمر کے مشورے پر حضرت زید بن ثابت کی سربراہی میں قرآنِ مجید کو یکجا کیا گیا۔ بعد ازاں حضرت عثمان غنی رضی اللہ عنہ نے اس کی نقلیں تیار کروا کر تمام اسلامی دنیا میں بھیجیں۔",
      reference: "Sahih al-Bukhari 4986, 4987"
    }
  ],
  internalLinks: [
    {
      titleEn: "5 Pillars of Islam Detailed Guide",
      titleUrdu: "اسلام کے ۵ بنیادی ارکان کی مفصل رہنمائی",
      descEn: "Explore the complete spiritual and practical details of Shahadah, Salah, Zakat, Sawm, and Hajj.",
      descUrdu: "کلمہ شہادت، نماز، زکوٰۃ، روزہ اور حج کے شرعی احکام اور فضائل۔",
      path: "/5-pillars-of-islam",
      tabId: "5-pillars-of-islam"
    },
    {
      titleEn: "6 Articles of Faith in Islam",
      titleUrdu: "اسلام کے ۶ ارکانِ ایمان",
      descEn: "In-depth guide on core Islamic creed (Aqeedah): Tawheed, Angels, Books, Prophets, Akhirah, and Qadr.",
      descUrdu: "عقیدہ توحید، ملائکہ، کتب، رسالت، آخرت اور تقدیر پر کامل ایمان۔",
      path: "/six-articles-of-faith",
      tabId: "six-articles-of-faith"
    },
    {
      titleEn: "Test Your Knowledge in Islamic Quiz",
      titleUrdu: "اسلامی کوئز میں اپنی معلومات آزمائیں",
      descEn: "Practice with hundreds of authentic, gamified general knowledge questions across various difficulties.",
      descUrdu: "سینکڑوں مستند سوالات کے ذریعے اپنی اسلامی معلومات میں اضافہ کیجیے۔",
      path: "/islamic-quiz",
      tabId: "islamic-quiz"
    },
    {
      titleEn: "Daily Hadith with Authenticity Notes",
      titleUrdu: "روزانہ کی مستند حدیث و تشریح",
      descEn: "Read verified prophetic traditions from Sahih al-Bukhari and Muslim with practical daily lessons.",
      descUrdu: "بخاری و مسلم کی احادیث سے روزانہ کا سبق اور مستند فہم۔",
      path: "/daily-hadith",
      tabId: "daily-hadith"
    }
  ]
};

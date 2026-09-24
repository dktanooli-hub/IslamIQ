export interface RamadanFastingRule {
  titleEn: string;
  titleUrdu: string;
  category: 'essential' | 'sunnah' | 'nullifier' | 'exemption';
  descriptionEn: string;
  descriptionUrdu: string;
  evidence: string;
}

export interface RamadanDuaItem {
  occasionEn: string;
  occasionUrdu: string;
  arabic: string;
  transliteration: string;
  translationEn: string;
  translationUrdu: string;
  reference: string;
}

export interface RamadanFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  scholarlyNote?: string;
  reference: string;
}

export interface RamadanGuideData {
  h1En: string;
  h1Urdu: string;
  introEn: string;
  introUrdu: string;
  spiritualWisdomEn: string;
  spiritualWisdomUrdu: string;
  fastingPillarsEn: string;
  fastingPillarsUrdu: string;
  suhoorIftarGuideEn: string;
  suhoorIftarGuideUrdu: string;
  duas: RamadanDuaItem[];
  practicalRules: RamadanFastingRule[];
  lastTenNightsEn: string;
  lastTenNightsUrdu: string;
  zakatAlFitrEn: string;
  zakatAlFitrUrdu: string;
  faqs: RamadanFAQ[];
  relatedLinks: { titleEn: string; titleUrdu: string; tab: string }[];
}

export const RAMADAN_GUIDE_DATA: RamadanGuideData = {
  h1En: "Ramadan Guide: Fasting Rules, Suhoor, Iftar, Worship & Zakat al-Fitr",
  h1Urdu: "رمضان المبارک گائیڈ: روزے کے مسائل، سحری و افطار، عبادات اور صدقۃ الفطر",
  introEn: "Ramadan is the ninth month of the Islamic lunar calendar, designated by Allah Almighty as a blessed period of compulsory fasting (Sawm), intense Quranic recitation, spiritual purification (Taqwa), and generous charity. As one of the Five Pillars of Islam, fasting during Ramadan is obligatory upon every sane, mature, healthy Muslim who is not on an arduous journey. This comprehensive guide outlines the rules of fasting, recommended Sunnah practices from dawn to dusk, rulings for contemporary medical situations, the virtues of Laylat al-Qadr, and the rules of Zakat al-Fitr.",
  introUrdu: "رمضان المبارک اسلامی سال کا نواں اور برکتوں والا مہینہ ہے جس میں روزہ رکھنا اسلام کا تیسرا بنیادی رکن ہے۔ یہ مہینہ تقویٰ، نزولِ قرآن، صبر اور غریب پروری کا موسمِ بہار ہے۔ یہ جامع گائیڈ روزے کے فرائض، سحر و افطار کی مسنون دعائیں، روزمرہ مسائل، آخری عشرہ، شبِ قدر اور صدقۃ الفطر کے احکام مستند دلائل کے ساتھ بیان کرتی ہے۔",
  spiritualWisdomEn: "Allah Almighty states in Surah Al-Baqarah (2:183): 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous (attain Taqwa).' Fasting trains the soul in self-restraint, breaks the hold of physical desires, fosters heartfelt empathy for the hungry, and purifies intention solely for the pleasure of the Creator.",
  spiritualWisdomUrdu: "اللہ تعالیٰ کا فرمان ہے: 'اے ایمان والو! تم پر روزے فرض کیے گئے جیسے تم سے پہلے لوگوں پر فرض کیے گئے تھے تاکہ تم تقویٰ اختیار کرو' (سورۃ البقرہ: ۱۸۳)۔ روزہ انسان میں ضبطِ نفس، ایثار، بھوکوں کے احساس اور اخلاص کی صفت پیدا کرتا ہے۔",
  fastingPillarsEn: "Islamic fasting (Sawm) rests upon two fundamental pillars (Arkan): 1) The Intention (Niyyah) formed in the heart sincerely for Allah before True Dawn (Fajr), and 2) Complete Abstinence (Imsak) from eating, drinking, smoking, and marital relations from the moment the dawn begins until the sun completely dips below the horizon at Maghrib.",
  fastingPillarsUrdu: "روزے کے دو بنیادی ارکان ہیں: ۱) نیت (دل کا پختہ ارادہ کہ خالص اللہ کی رضا کے لیے روزہ رکھا جا رہا ہے) جو طلوعِ فجر سے قبل ہو، اور ۲) امساک (فجر سے لے کر غروبِ آفتاب تک کھانے پینے اور ازدواجی تعلقات سے مکمل پرہیز)۔",
  suhoorIftarGuideEn: "The Sunnah emphasizes eating Suhoor (pre-dawn meal) even if only with a sip of water or a date. The Prophet ﷺ said: 'Take Suhoor, for indeed there is blessing (Barakah) in Suhoor' (Sahih al-Bukhari 1923). Delaying Suhoor until shortly before Fajr and hastening to break the fast immediately when the sunset call to prayer begins are both strong Sunnah practices.",
  suhoorIftarGuideUrdu: "سحری کھانا مسنون اور باعثِ برکت ہے۔ نبی کریم ﷺ نے فرمایا: 'سحری کھایا کرو کیونکہ سحری میں برکت ہے' (صحیح بخاری: ۱۹۲۳)۔ سحری کو فجر کے قریب تک مؤخر کرنا اور مغرب کی اذان ہوتے ہی افطار میں جلدی کرنا مسنون طریقہ ہے۔",
  duas: [
    {
      occasionEn: "At the Time of Breaking the Fast (Iftar) - Most Authentic",
      occasionUrdu: "افطار کے وقت کی مستند مسنون دعا",
      arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
      transliteration: "Dhahaba adh-dhama'u wabtallat al-'urooq wa thabata al-ajru in sha' Allah.",
      translationEn: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
      translationUrdu: "پیاس بجھ گئی، رگیں تر ہو گئیں اور اللہ نے چاہا تو اجر ثابت ہو گیا۔",
      reference: "Sunan Abi Dawud 2357 (Graded Hasan by al-Albani & classical scholars)"
    },
    {
      occasionEn: "General Supplication when Breaking Fast",
      occasionUrdu: "افطار کے وقت معروف دعائے مغفرت",
      arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      transliteration: "Allahumma inni laka sumtu wa 'ala rizqika aftart.",
      translationEn: "O Allah, for You I have fasted, and with Your provision I have broken my fast.",
      translationUrdu: "اے اللہ! میں نے تیرے ہی لیے روزہ رکھا اور تیرے ہی دیے ہوئے رزق سے افطار کیا۔",
      reference: "Sunan Abi Dawud 2358 (Transmitted with sound meaning)"
    },
    {
      occasionEn: "Dua for Laylat al-Qadr (Night of Decree)",
      occasionUrdu: "شبِ قدر کی خصوصی دعا جو ام المومنین عائشہؓ کو سکھائی گئی",
      arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
      transliteration: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni.",
      translationEn: "O Allah, You are Most Forgiving, and You love forgiveness; so pardon me.",
      translationUrdu: "اے اللہ! تو بہت معاف کرنے والا ہے اور معافی کو پسند فرماتا ہے، پس مجھے معاف فرما دے۔",
      reference: "Jami' al-Tirmidhi 3513 (Graded Sahih)"
    }
  ],
  practicalRules: [
    {
      titleEn: "What Invalidates the Fast (Mufattirat)",
      titleUrdu: "روزہ توڑنے والے امور",
      category: "nullifier",
      descriptionEn: "Deliberate eating or drinking, sexual intercourse, intentional vomiting, and the onset of menses (Hayd) or post-natal bleeding (Nifas).",
      descriptionUrdu: "جان بوجھ کر کچھ کھانا پینا، ہمبستری، خود جان بوجھ کر قے کرنا، اور عورتوں کے لیے حیض و نفاس کا شروع ہونا۔",
      evidence: "Quran 2:187; Sahih al-Bukhari 1936"
    },
    {
      titleEn: "Eating or Drinking Forgetfully",
      titleUrdu: "بھول کر کھا پی لینا",
      category: "essential",
      descriptionEn: "If someone forgets they are fasting and consumes food or drink, their fast remains 100% valid. They must immediately spit out anything in the mouth upon remembering.",
      descriptionUrdu: "اگر کوئی بھول کر کھا پی لے تو اس کا روزہ نہیں ٹوٹتا۔ یاد آتے ہی فوراً رک جائے اور کلی کر لے۔ نبی ﷺ نے فرمایا کہ اللہ نے اسے کھلایا اور پلایا۔",
      evidence: "Sahih al-Bukhari 1933; Sahih Muslim 1155"
    },
    {
      titleEn: "Eye Drops, Ear Drops & Modern Inhalers",
      titleUrdu: "آنکھ کان کے قطرے اور انہیلر کا استعمال",
      category: "exemption",
      descriptionEn: "Eye drops and ear drops (without a ruptured eardrum) do not break the fast according to the dominant contemporary scholarly councils (such as the International Islamic Fiqh Academy). For asthma inhalers, the majority view permits dry emergency relief as it goes to the lungs, not the stomach; however, taking it when not critical or making up the day if able is recommended by cautious jurists.",
      descriptionUrdu: "آنکھ کے قطرے سے روزہ نہیں ٹوٹتا۔ دمہ کے مریض کے لیے انہیلر کے استعمال پر جدید فقہی اکیڈمیوں کے مطابق عذر کی بنا پر رخصت ہے، البتہ بعد میں قضاء ممکن ہو تو احتیاط بہتر ہے۔",
      evidence: "Majma' al-Fiqh al-Islami (Resolution 93)"
    },
    {
      titleEn: "Valid Exemptions from Fasting",
      titleUrdu: "روزہ نہ رکھنے کے شرعی عذرات",
      category: "exemption",
      descriptionEn: "1) Acute illness where fasting causes bodily harm, 2) Arduous travel (Safar), 3) Pregnancy and nursing if there is medical fear for mother or infant, and 4) Chronic, irreversible illness or extreme old age (compensated with daily Fidyah: feeding one poor person per day).",
      descriptionUrdu: "مریض، مسافر، حاملہ یا دودھ پلانے والی خاتون (جسے نقصان کا اندیشہ ہو)، اور ایسا دائمی بیمار یا انتہائی ضعیف شخص جو روزہ رکھنے کی سکت نہیں رکھتا (وہ ہر روزے کے بدلے فدیہ دے گا)۔",
      evidence: "Quran 2:184-185"
    }
  ],
  lastTenNightsEn: "The final ten nights of Ramadan contain Laylat al-Qadr (the Night of Decree), described in Surah Al-Qadr as 'better than a thousand months' (over 83 years of continuous worship). The Prophet ﷺ exerted immense effort in worship, awoke his family, and practiced I'tikaf (spiritual seclusion in the mosque) during these nights, searching particularly on odd nights (21st, 23rd, 25th, 27th, and 29th).",
  lastTenNightsUrdu: "رمضان المبارک کا آخری عشرہ جہنم سے خلاصی کا ہے جس میں شبِ قدر پوشیدہ ہے جو ہزار مہینوں (۸۳ سال سے زیادہ) کی عبادت سے افضل ہے۔ نبی کریم ﷺ اس عشرے میں کمر کس لیتے، راتوں کو جاگتے، اہل و عیال کو جگاتے اور مسجد میں اعتکاف فرماتے تھے۔ خاص طور پر طاق راتوں (۲۱، ۲۳، ۲۵، ۲۷، ۲۹) میں عبادت کا خصوصی اہتمام مسنون ہے۔",
  zakatAlFitrEn: "Zakat al-Fitr (also known as Sadaqat al-Fitr) is an obligatory charity incumbent upon every Muslim—young or old, male or female—who possesses food beyond their daily needs on the morning of Eid. It purifies the fasting person from minor shortcomings and provides festive food for the impoverished so they need not beg on Eid day. It equals one Sa' (approximately 2.5 to 3 kg) of staple food (wheat, barley, dates, or rice) and must be disbursed before the Eid prayer begins.",
  zakatAlFitrUrdu: "صدقۃ الفطر ہر اس مسلمان پر واجب ہے جس کے پاس عید کے دن اپنی بنیادی ضرورت سے زائد سامان یا مال موجود ہو۔ یہ روزے دار کو لغو اور بے ہودہ باتوں سے پاک کرتا ہے اور مساکین کے لیے طعام کا بندوبست کرتا ہے۔ اس کی مقدار ایک صاع (تقریباً ڈھائی سے تین کلوگرام گندم، کھجور یا چاول وغیرہ) یا اس کی نقدی قیمت ہے، اور اسے عید کی نماز سے پہلے ادا کرنا ضروری ہے۔",
  faqs: [
    {
      questionEn: "Does using toothpaste or brushing teeth break the fast?",
      questionUrdu: "کیا ٹوتھ پیسٹ یا برش کرنے سے روزہ ٹوٹ جاتا ہے؟",
      answerEn: "Using a toothbrush and toothpaste does not break the fast as long as none of the paste or water is swallowed into the throat. However, because toothpaste has a strong taste that can easily slip down, using Miswak (wooden tooth-stick) during the day and brushing with paste before Suhoor or after Iftar is safer and preferred.",
      answerUrdu: "ٹوتھ پیسٹ سے دانت صاف کرنے سے روزہ نہیں ٹوٹتا بشرطیکہ کوئی ذرہ یا جھاگ حلق کے نیچے نہ اترے۔ تاہم حلق میں اترنے کے اندیشے کے پیشِ نظر دن کے وقت مسواک کرنا زیادہ محفوظ اور مسنون ہے۔",
      reference: "Permanent Committee for Scholarly Research and Ifta (Fatwa 4961)"
    },
    {
      questionEn: "Does taking an injection (intravenous or intramuscular) break the fast?",
      questionUrdu: "کیا ٹیکہ (انجکشن) لگوانے سے روزہ ٹوٹ جاتا ہے؟",
      answerEn: "Medical injections administered into muscles or veins for pain relief, antibiotics, or insulin do not break the fast because they do not enter through the natural digestive tract and do not substitute for food and drink. However, nutritional IV drips that provide vitamins and glucose as food substitutes do invalidate the fast according to the majority of scholars.",
      answerUrdu: "علاج کی غرض سے لگوائے جانے والے ٹیکے (گوشت یا رگ میں، جیسے انسولین یا اینٹی بائیوٹک) سے روزہ نہیں ٹوٹتا کیونکہ یہ غذا کا بدل نہیں ہیں۔ البتہ گلوکوز اور ڈرپ جو غذا کی جگہ لے لے، اس سے روزہ ٹوٹ جاتا ہے۔",
      reference: "Majma' al-Fiqh al-Islami (Resolution 93)"
    },
    {
      questionEn: "Can a pregnant or breastfeeding woman delay fasting?",
      questionUrdu: "کیا حاملہ یا دودھ پلانے والی ماں روزہ موخر کر سکتی ہے؟",
      answerEn: "Yes. If a pregnant or nursing mother reasonably fears for her health or the health and nutrition of her baby, she is permitted not to fast. Classical scholars differ on compensation: all agree she must make up (Qada) the days later when able; some jurists also recommend feeding a needy person (Fidyah) if the fear was exclusively for the baby.",
      answerUrdu: "جی ہاں، اگر حاملہ یا دودھ پلانے والی ماں کو اپنی یا بچے کی صحت اور دودھ کی کمی کا معتبر طبی اندیشہ ہو تو وہ روزہ چھوڑ سکتی ہے اور بعد میں سہولت کے دنوں میں قضاء کرے گی۔",
      reference: "Sunan an-Nasa'i 2274; Al-Majmu' by Imam an-Nawawi"
    },
    {
      questionEn: "What is Taraweeh and how many Rakats should be prayed?",
      questionUrdu: "نمازِ تراویح کی کیا فضیلت ہے اور یہ کتنی رکعات ہے؟",
      answerEn: "Taraweeh is an emphasized Sunnah (Sunnah Mu'akkadah) night prayer performed in congregation after Isha during Ramadan. The Prophet ﷺ encouraged it, saying: 'Whoever prays at night in Ramadan out of faith and seeking reward, his previous sins will be forgiven' (Sahih al-Bukhari 37). Historically, praying either 8 or 20 Rakats has broad support among recognized Sunni scholars and companions, and one should pray with tranquility and humility rather than disputing over numbers.",
      answerUrdu: "تراویح رمضان کی راتوں کی مسنون نماز ہے۔ نبی کریم ﷺ نے فرمایا: 'جس نے رمضان کی راتوں میں ایمان اور ثواب کی نیت سے قیام کیا اس کے پچھلے گناہ معاف کر دیے جاتے ہیں' (صحیح بخاری: ۳۷)۔ امت میں ۸ اور ۲۰ رکعت دونوں پر جید ائمہ کا عمل رہا ہے، باہمی جھگڑے کے بجائے خشوع اور قرآن کی تلاوت پر توجہ دینی چاہیے۔",
      reference: "Sahih al-Bukhari 37 & 2010"
    }
  ],
  relatedLinks: [
    { titleEn: "Daily Islamic Supplications (Dua)", titleUrdu: "روزانہ کی مسنون دعائیں", tab: "daily-dua" },
    { titleEn: "Quran Learning & Tajweed Guide", titleUrdu: "قرآن سیکھنے کی گائیڈ", tab: "quran-learning-guide" },
    { titleEn: "How to Perform Salah", titleUrdu: "نماز کا طریقہ", tab: "how-to-perform-salah" },
    { titleEn: "Zakat Basics & Calculations", titleUrdu: "زکوٰۃ کے بنیادی احکام", tab: "zakat-basics" }
  ]
};

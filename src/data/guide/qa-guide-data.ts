export interface QAEntryItem {
  id: string;
  categoryEn: string;
  categoryUrdu: string;
  questionEn: string;
  questionUrdu: string;
  answerShortEn: string;
  answerShortUrdu: string;
  detailedExplanationEn: string;
  detailedExplanationUrdu: string;
  primaryProofArabic?: string;
  primaryProofUrdu?: string;
  primaryProofEn?: string;
  primaryProofRef: string;
  scholarlyViewsEn?: string;
  scholarlyViewsUrdu?: string;
  practicalTakeawayEn: string;
  practicalTakeawayUrdu: string;
}

export interface IslamicQAGuideData {
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
  foundationalAyahArabic: string;
  foundationalAyahUrdu: string;
  foundationalAyahEn: string;
  foundationalAyahRef: string;
  categories: Array<{ id: string; nameEn: string; nameUrdu: string }>;
  questions: QAEntryItem[];
  scholarlyDifferencesGuidelineEn: string;
  scholarlyDifferencesGuidelineUrdu: string;
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

export const ISLAMIC_QA_GUIDE_DATA: IslamicQAGuideData = {
  seoTitleEn: "Islamic Questions & Answers: Authentic Rulings & Evidence | IslamIQ",
  seoTitleUrdu: "اسلامی سوال و جواب: مستند قرآنی و نبوی دلائل کے ساتھ رہنمائی | اسلام آئی کیو",
  seoDescEn: "Comprehensive and authentic Islamic questions and answers on Aqeedah, Salah, Fasting, Zakat, Halal living, and modern ethics with verified Quran and Hadith evidence.",
  seoDescUrdu: "اسلامی سوال و جواب کا مستند مجموعہ: عقائد، نماز، روزہ، زکوٰۃ، حلال و حرام اور فقہی مسائل کی قرآن و سنت کے دلائل اور مذاہبِ اربعہ کے معتبر فہم کے ساتھ وضاحت۔",
  canonicalPath: "/islamic-questions-answers",
  heroBadgeEn: "Authentic Inquiries & Verified Answers • الفتاوى والأسئلة الشرعية",
  heroBadgeUrdu: "مستند دینی سوالات و جوابات • الفتاوى والأسئلة الشرعية",
  h1En: "Islamic Questions & Answers: Authentic Evidence from Quran & Sunnah",
  h1Urdu: "اسلامی سوال و جواب: قرآن و سنت کی مستند روشنی میں شرعی رہنمائی",
  introEn: "Seeking authentic answers to religious questions is an integral practice in Islam. The Quran commands believers to inquire from the people of knowledge when in doubt. This guide brings together frequently asked questions across creed (Aqeedah), ritual worship (Ibadah), financial transactions (Mu'amalat), and contemporary life, rooted firmly in classical scholarly consensus and transparently noting recognized scholarly differences.",
  introUrdu: "دینی مسائل اور شرعی سوالات کے مستند جوابات تلاش کرنا ہر مسلمان کی ضرورت ہے۔ قرآنِ کریم نے اہل علم سے رجوع کرنے کا واضح حکم دیا ہے۔ اس رہنمائی میں عقائد، نماز، روزہ، زکوٰۃ، اور روزمرہ اخلاقیات سے متعلق عام اور ضروری سوالات کے جوابات قرآنی آیات، صحیح احادیث اور معتبر فقہی آراء کے ساتھ پیش کیے گئے ہیں۔",
  foundationalAyahArabic: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
  foundationalAyahUrdu: "پس تم اہل علم سے پوچھ لو اگر تم خود نہیں جانتے۔",
  foundationalAyahEn: "So ask the people of the message if you do not know.",
  foundationalAyahRef: "Surah An-Nahl (16:43) & Surah Al-Anbiya (21:7)",
  scholarlyDifferencesGuidelineEn: "Scholarly Ethics: In secondary matters of jurisprudence (Furu' al-Fiqh) where reputable jurists of the four established schools (Hanafi, Maliki, Shafi'i, Hanbali) held varying interpretations based on authentic linguistic and textual proofs, Islam respects legitimate divergence (Ikhtilaf Rahmah). We present these differences with objectivity and respect.",
  scholarlyDifferencesGuidelineUrdu: "فقہی آداب: دین کی بنیادی تعلیمات اور قطعیات میں تمام امت متفق ہے، جبکہ فروعی و اجتہادی مسائل میں ائمہ اربعہ (احناف، مالکیہ، شوافع، حنابلہ) کا معتبر اختلاف رائے رحمت اور وسعت کا باعث ہے۔ یہاں ایسے مسائل میں باہمی احترام کے ساتھ دونوں آراء کو واضح کیا گیا ہے۔",
  categories: [
    { id: "all", nameEn: "All Inquiries", nameUrdu: "تمام سوالات" },
    { id: "aqeedah", nameEn: "Creed (Aqeedah)", nameUrdu: "عقائد و ایمانیات" },
    { id: "salah", nameEn: "Prayer (Salah)", nameUrdu: "نماز و طہارت" },
    { id: "fasting", nameEn: "Fasting & Ramadan", nameUrdu: "روزہ و رمضان" },
    { id: "zakat", nameEn: "Zakat & Charity", nameUrdu: "زکوٰۃ و صدقات" },
    { id: "daily-life", nameEn: "Ethics & Halal Living", nameUrdu: "اخلاقیات و حلال معاشرت" }
  ],
  questions: [
    {
      id: "qa-1",
      categoryEn: "aqeedah",
      categoryUrdu: "عقائد و ایمانیات",
      questionEn: "What is Shirk and why is it considered the gravest sin in Islam?",
      questionUrdu: "شرک کیا ہے اور یہ اسلام میں سب سے بڑا گناہ کیوں قرار دیا گیا ہے؟",
      answerShortEn: "Shirk is associating partners, rivals, or equals with Allah in His divine essence, attributes, or exclusive right to worship. It is the only sin Allah does not forgive if one dies upon it without repentance.",
      answerShortUrdu: "شرک اللہ تعالیٰ کی ذات، صفات یا مخصوص حقوقِ عبادت میں کسی کو شریک یا برابر ٹھہرانا ہے۔ یہ وہ واحد گناہ ہے جسے توبہ کے بغیر مرنے کی صورت میں اللہ ہرگز معاف نہیں فرمائے گا۔",
      detailedExplanationEn: "Tawheed (the pure Oneness of God) is the very foundation of Islam. Shirk undermines this foundation by directing acts of ultimate submission—such as supplication (Dua), sacrifice, or ultimate fear and hope—to created beings. Shirk is divided into Major Shirk (Shirk Akbar, which nullifies one's Islam) and Minor Shirk (Shirk Asghar, such as showing off in worship, known as Riya).",
      detailedExplanationUrdu: "توحیدِ باری تعالیٰ اسلام کی اساس ہے۔ شرک اس بنیاد کو مسمار کر دیتا ہے جب دعا، ذبیحہ، یا غیب کا علم غیر اللہ کی طرف منسوب کیا جائے۔ شرک کی دو بڑی اقسام ہیں: شرکِ اکبر (جو دائرہ اسلام سے خارج کر دیتا ہے) اور شرکِ اصغر (جیسے ریاکاری یعنی دکھاوے کے لیے عبادت کرنا)۔",
      primaryProofArabic: "إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ",
      primaryProofUrdu: "بے شک اللہ اس بات کو نہیں بخشتا کہ اس کے ساتھ کسی کو شریک ٹھہرایا جائے، اور اس کے علاوہ جس گناہ کو چاہے بخش دیتا ہے۔",
      primaryProofEn: "Indeed, Allah does not forgive association with Him, but He forgives what is less than that for whom He wills.",
      primaryProofRef: "Surah An-Nisa (4:48)",
      practicalTakeawayEn: "Constantly direct all supplications (Dua), vows, and hearts solely to Allah, and protect good deeds from seeking people's praise.",
      practicalTakeawayUrdu: "اپنی دعائیں، امیدیں اور دلی وابستگی صرف اللہ سے رکھیں اور عبادات کو دکھاوے سے بچائیں۔"
    },
    {
      id: "qa-2",
      categoryEn: "salah",
      categoryUrdu: "نماز و طہارت",
      questionEn: "What should one do if they forget a rakat or doubt the number of rakats prayed?",
      questionUrdu: "اگر نماز میں رکعتوں کی تعداد میں شک ہو جائے یا کوئی رکعت بھول جائے تو کیا کرنا چاہیے؟",
      answerShortEn: "Build upon certainty (the lower number), complete the prayer, and perform Sujud as-Sahw (the prostration of forgetfulness) before or after the final Salam.",
      answerShortUrdu: "یقین (یعنی کم تر تعداد) پر بنیاد رکھیں، نماز مکمل کریں اور آخر میں سجدہ سہو ادا کریں۔",
      detailedExplanationEn: "Prophet Muhammad ﷺ instructed that if a worshipper doubts whether they have prayed three or four rakats, they should cast aside doubt and assume the lesser number (three), complete the remaining rakat, and then perform two prostrations of forgetfulness (Sujud as-Sahw).",
      detailedExplanationUrdu: "رسول اللہ ﷺ نے واضح تعلیم دی کہ جب نمازی کو ۳ یا ۴ رکعت میں شک ہو جائے تو شک کو چھوڑ کر کم یعنی ۳ پر یقین کرے، ایک رکعت مزید پڑھے اور نماز کے اختتام پر سجدہ سہو ادا کرے۔",
      primaryProofArabic: "إِذَا شَكَّ أَحَدُكُمْ فِي صَلاَتِهِ فَلَمْ يَدْرِ كَمْ صَلَّى ثَلاَثًا أَمْ أَرْبَعًا فَلْيَطْرَحِ الشَّكَّ وَلْيَبْنِ عَلَى مَا اسْتَيْقَنَ ثُمَّ يَسْجُدُ سَجْدَتَيْنِ قَبْلَ أَنْ يُسَلِّمَ",
      primaryProofUrdu: "جب تم میں سے کسی کو نماز میں شک ہو اور نہ معلوم ہو کہ تین پڑھی ہیں یا چار، تو شک کو دور کرے اور یقین پر بنا رکھے، پھر سلام پھیرنے سے پہلے دو سجدے کرے۔",
      primaryProofEn: "If one of you has doubt in his prayer and does not know whether he prayed three or four, let him cast aside doubt and build upon what is certain, then perform two prostrations before the Salam.",
      primaryProofRef: "Sahih Muslim 571",
      scholarlyViewsEn: "Scholarly note: In the Hanafi school, if a person experiences frequent chronic doubts (waswas), they follow their strongest predominant suspicion (Ghalabat ar-Ra'y); if it is a rare occurrence, they build upon the lesser count. In the Shafi'i and Hanbali schools, one always builds strictly upon the lesser number.",
      scholarlyViewsUrdu: "فقہی وضاحت: احناف کے نزدیک اگر شک شاذ و نادر ہو تو کم پر بنا رکھی جائے گی، اور اگر شک کی عادت ہو تو جس طرف دل کا رجحان زیادہ ہو اس پر عمل ہوگا۔ شوافع اور حنابلہ کے ہاں ہمیشہ کم تر تعداد پر ہی بنا رکھی جاتی ہے۔",
      practicalTakeawayEn: "Do not let Satanic whispers (waswasah) disrupt your prayer; follow the simple sunnah rule of certainty and perform Sujud as-Sahw.",
      practicalTakeawayUrdu: "وسوسوں سے پریشان ہوئے بغیر سنت نبوی پر عمل کرتے ہوئے سجدہ سہو کر لیں۔"
    },
    {
      id: "qa-3",
      categoryEn: "salah",
      categoryUrdu: "نماز و طہارت",
      questionEn: "Does bleeding from an injury or nosebleed invalidate Wudu?",
      questionUrdu: "کیا زخم سے خون بہنے یا نکسیر پھوٹنے سے وضو ٹوٹ جاتا ہے؟",
      answerShortEn: "There is a well-known scholarly difference: according to the Hanafi school, flowing blood invalidates wudu; according to the Shafi'i and Maliki schools, bleeding does not break wudu.",
      answerShortUrdu: "اس میں ائمہ کا معتبر فقہی اختلاف ہے: احناف کے نزدیک خون بہہ جانے سے وضو ٹوٹ جاتا ہے، جبکہ شوافع اور مالکیہ کے نزدیک خون نکلنے سے وضو نہیں ٹوٹتا۔",
      detailedExplanationEn: "Scholars of the Hanafi and Hanbali schools hold that blood flowing from the body breaks wudu based on reports regarding ablution for flowing blood. Conversely, Imam ash-Shafi'i and Imam Malik held that only substances exiting from the private passages (two paths) nullify wudu, citing reports that the Sahabah prayed while their wounds were bleeding during battles (such as Abbad ibn Bishr when shot by arrows).",
      detailedExplanationUrdu: "فقہ حنفی اور فقہ حنبلی میں اگر خون زخم سے نکل کر اپنی جگہ سے بہہ جائے تو وضو ٹوٹ جاتا ہے۔ فقہ شافعی اور مالکی کے نزدیک وضو صرف سبیلین (پیشاب پاخانہ کے راستوں) سے خارج ہونے والی چیزوں سے ٹوٹتا ہے، کیونکہ صحابہ کرام نے جنگوں میں زخموں سے خون بہنے کے باوجود نمازیں پڑھیں۔",
      primaryProofArabic: "كَمَا صَلَّى عَبَّادُ بْنُ بِشْرٍ وَهُوَ يَنْزِفُ دَمًا حِينَ رُمِيَ بِسَهْمٍ",
      primaryProofUrdu: "جیسے حضرت عباد بن بشر رضی اللہ عنہ نے تیر لگنے اور خون بہنے کے دوران اپنی نماز جاری رکھی۔",
      primaryProofEn: "As reported that Abbad ibn Bishr continued praying while bleeding heavily after being shot with arrows during night watch.",
      primaryProofRef: "Sunan Abi Dawud 198 (Classed Hasan by Al-Albani)",
      scholarlyViewsEn: "Both views have credible proofs from classical texts. To be cautious and remove doubt, renewing wudu when substantial blood flows is universally praised as best by all scholars.",
      scholarlyViewsUrdu: "دونوں آراء کے پاس مستند دلائل موجود ہیں۔ شک سے بچنے کے لیے اگر ممکن ہو تو خون بہنے پر نیا وضو کر لینا تمام ائمہ کے نزدیک زیادہ پسندیدہ اور احتیاط پر مبنی ہے۔",
      practicalTakeawayEn: "Clean the wound and stop bleeding. If following Hanafi fiqh, renew your wudu; if following Shafi'i/Maliki fiqh, clean the impurity from clothes and pray.",
      practicalTakeawayUrdu: "زخم کو صاف کر کے پٹی باندھ لیں، اور احتیاط کے طور پر نیا وضو کر کے نماز ادا فرمائیں۔"
    },
    {
      id: "qa-4",
      categoryEn: "fasting",
      categoryUrdu: "روزہ و رمضان",
      questionEn: "Does using an asthma inhaler or eye drops break the fast?",
      questionUrdu: "کیا دمہ کا انہیلر یا آنکھ میں ڈراپس ڈالنے سے روزہ ٹوٹ جاتا ہے؟",
      answerShortEn: "Eye drops and ear drops do not invalidate the fast according to the majority of modern scholars. For asthma inhalers, the vast majority of international fiqh academies rule that it does not break the fast.",
      answerShortUrdu: "جدید فقہی اکیڈمیوں کی غالب اکثریت کے مطابق آنکھ کے قطرے اور دمہ کا انہیلر روزے کو فاسد نہیں کرتے کیونکہ یہ نہ تو کھانا پینا ہیں اور نہ معدے میں غذا کا کام کرتے ہیں۔",
      detailedExplanationEn: "The International Islamic Fiqh Academy (Majma al-Fiqh al-Islami, Resolution 93) concluded that modern medical treatments like asthma inhalers, oxygen, eye drops, ear drops, injections (non-nutritive), and blood tests do not break the fast. The spray reaches the lungs and respiratory tract, not the stomach, and is taken for medical survival rather than nourishment.",
      detailedExplanationUrdu: "بین الاقوامی اسلامی فقہ اکیڈمی (جدہ) کی قرارداد کے مطابق دمہ کا انہیلر سانس کی نالیوں کو کھولنے کے لیے پھیپھڑوں میں جاتا ہے، نہ کہ معدے میں۔ یہ غذا نہیں بلکہ علاج اور مجبوری ہے، لہٰذا روزہ نہیں ٹوٹتا۔ البتہ بعض احتیاط پسند علماء قضاء کا مشورہ دیتے ہیں اگر بعد میں ممکن ہو۔",
      primaryProofArabic: "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ",
      primaryProofUrdu: "اللہ تمہارے ساتھ آسانی کا ارادہ فرماتا ہے اور تمہارے ساتھ تنگی کا ارادہ نہیں فرماتا۔",
      primaryProofEn: "Allah intends for you ease and does not intend for you hardship.",
      primaryProofRef: "Surah Al-Baqarah (2:185)",
      scholarlyViewsEn: "A minority of scholars prefer that if an asthmatic patient can delay their inhaler until Maghrib safely, they should do so, but if needed medically, they must take it without hesitation or feeling sinful.",
      scholarlyViewsUrdu: "اگر کوئی مریض بغیر کسی خطرے کے افطار تک تاخیر کر سکتا ہو تو بہتر ہے، لیکن سانس رکنے یا تکلیف کی صورت میں فوری انہیلر استعمال کرنا بلا جھجھک جائز ہے۔",
      practicalTakeawayEn: "Patients with acute respiratory difficulties should prioritize health and follow the official scholarly consensus permitting inhaler use during fasting.",
      practicalTakeawayUrdu: "طبی ضرورت کے تحت بغیر کسی تذبذب کے انہیلر استعمال کریں؛ دین میں سختی اور جان کو خطرے میں ڈالنے کی ممانعت ہے۔"
    },
    {
      id: "qa-5",
      categoryEn: "zakat",
      categoryUrdu: "زکوٰۃ و صدقات",
      questionEn: "Can Zakat be given to close relatives such as parents, children, or siblings?",
      questionUrdu: "کیا زکوٰۃ قریبی رشتہ داروں جیسے والدین، اولاد، یا بہن بھائیوں کو دی جا سکتی ہے؟",
      answerShortEn: "Zakat CANNOT be given to parents, grandparents, children, or spouse (those one is obligated to financially maintain). However, giving Zakat to eligible needy siblings, aunts, uncles, and cousins is not only permissible but doubly rewarded.",
      answerShortUrdu: "زکوٰۃ اپنے والدین، دادا دادی، اولاد، پوتے پوتیوں اور شریکِ حیات کو نہیں دی جا سکتی۔ البتہ غریب بہن، بھائی، چچا، پھوپھی، خالہ، ماموں وغیرہ کو زکوٰۃ دینا نہ صرف جائز ہے بلکہ دہرے ثواب کا باعث ہے۔",
      detailedExplanationEn: "The primary principle in Islamic jurisprudence is that any relative whose financial maintenance (Nafaqah) is legally mandatory upon you cannot receive your Zakat, because paying them Zakat would be indirectly protecting your own wealth. But for horizontal relatives (brothers, sisters, cousins) who are genuinely poor and eligible, the Prophet ﷺ explicitly stated that charity given to them holds two rewards: the reward of charity and the reward of upholding kinship (Silat ar-Rahim).",
      detailedExplanationUrdu: "جن رشتہ داروں کی کفالت شرعاً انسان کے اپنے ذمے واجب ہے (جیسے والدین اور نابالغ یا محتاج اولاد) انہیں زکوٰۃ دینا جائز نہیں۔ لیکن وہ محتاج رشتہ دار جن کا نفقہ آپ پر لازم نہیں (جیسے ضرورت مند بھائی، بہن، کزنز)، انہیں زکوٰۃ دینے پر صدقے اور صلہ رحمی دونوں کا دہرا اجر ملتا ہے۔",
      primaryProofArabic: "الصَّدَقَةُ عَلَى الْمِسْكِينِ صَدَقَةٌ وَهِيَ عَلَى ذِي الرَّحِمِ ثِنْتَانِ: صَدَقَةٌ وَصِلَةٌ",
      primaryProofUrdu: "مسکین کو صدقہ دینا ایک صدقہ ہے، اور رشتہ دار کو دینا دو چیزیں ہیں: صدقہ بھی اور صلہ رحمی بھی۔",
      primaryProofEn: "Charity given to a poor person is charity, but that given to a relative has two [rewards]: charity and upholding ties of kinship.",
      primaryProofRef: "Jami' at-Tirmidhi 658 (Sahih)",
      practicalTakeawayEn: "When calculating Zakat, prioritize your needy siblings or cousins before sending it to distant charitable organizations, discreetly preserving their dignity.",
      practicalTakeawayUrdu: "اپنی زکوٰۃ نکالتے وقت سب سے پہلے اپنے قریبی ضرورت مند بہن بھائیوں اور رشتہ داروں کا جائزہ لیں اور عزتِ نفس کا خیال رکھتے ہوئے ان کی مدد کریں۔"
    },
    {
      id: "qa-6",
      categoryEn: "daily-life",
      categoryUrdu: "اخلاقیات و حلال معاشرت",
      questionEn: "What is Riba (Interest/Usury) and why is it strictly forbidden in Islam?",
      questionUrdu: "سود (ربوا) کیا ہے اور اسلام میں اس کی اتنی سخت ممانعت کیوں ہے؟",
      answerShortEn: "Riba is any stipulated unjustified surplus in an exchange or loan. It is severely forbidden because it exploits human vulnerability, extracts unearned wealth, discourages real productivity, and leads to societal injustice.",
      answerShortUrdu: "قرض کے لین دین میں اصل رقم پر طے شدہ غیر منصفانہ اضافہ 'سود' ہے۔ یہ اس لیے حرام ہے کیونکہ یہ غریب کا استحصال کرتا ہے، بغیر محنت کے دولت نچوڑتا ہے اور معاشی ظلم کو جنم دیتا ہے۔",
      detailedExplanationEn: "Islam established economic justice where risk and return must be equitable. In a conventional interest-bearing loan, the creditor is guaranteed profit regardless of whether the debtor prospers or suffers bankruptcy. Allah described trade as permissible and interest as categorically forbidden, warning of spiritual bankruptcy and societal decay.",
      detailedExplanationUrdu: "اسلام نے معاشی عدل کا ایسا نظام قائم کیا ہے جس میں نفع و نقصان میں شراکت ہو۔ سودی نظام میں مقروض کی تباہی کے باوجود قرض خواہ کا نفع محفوظ رہتا ہے۔ قرآن نے تجارت کو حلال اور سود کو قطعی حرام قرار دیتے ہوئے اسے اللہ اور رسول کے خلاف جنگ کے مترادف قرار دیا ہے۔",
      primaryProofArabic: "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
      primaryProofUrdu: "اور اللہ نے تجارت کو حلال فرمایا ہے اور سود کو حرام ٹھہرایا ہے۔",
      primaryProofEn: "Allah has permitted trade and has forbidden interest.",
      primaryProofRef: "Surah Al-Baqarah (2:275)",
      practicalTakeawayEn: "Seek Islamic banking alternatives, avoid interest-yielding debt, and promote interest-free virtuous loans (Qard Hasan) in the community.",
      practicalTakeawayUrdu: "سودی لین دین اور بلاوجہ سودی قرضوں سے بچیں، اور اسلامی مالیاتی و باہمی امدادی طریقوں کو اپنائیں۔"
    }
  ],
  faqs: [
    {
      questionEn: "Can a Muslim ask about the wisdom (Hikmah) behind divine commandments?",
      questionUrdu: "کیا مسلمان شرعی احکام کی حکمت دریافت کر سکتا ہے؟",
      answerEn: "Yes, seeking to understand the wisdom behind commands is commendable and strengthens faith, provided one's submission does not depend upon finding that wisdom. Our primary obedience is to Allah's command (Sami'na wa Ata'na), and discovering the scientific, medical, or societal benefits is an added blessing.",
      answerUrdu: "جی ہاں! شرعی احکام کی حکمت و مصلحت تلاش کرنا جائز اور ایمان کو تقویت دینے والا ہے، بشرطیکہ اطاعت اس حکمت پر موقوف نہ ہو۔ مومن کا بنیادی شیوہ 'ہم نے سنا اور اطاعت کی' ہے، اور حکمت مل جانا نور علیٰ نور ہے۔",
      reference: "Surah Al-Baqarah (2:260 - Story of Ibrahim asking how Allah gives life)"
    },
    {
      questionEn: "How does one distinguish authentic hadith from fabricated hadith in daily reading?",
      questionUrdu: "روزمرہ مطالعہ میں مستند حدیث اور من گھڑت روایات میں کیسے تمیز کی جائے؟",
      answerEn: "Always verify the primary citation source. Authentic hadiths are recorded in rigorous collections such as Sahih al-Bukhari and Sahih Muslim, followed by the Four Sunan (Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah) with verification gradings by recognized Hadith masters. Avoid sharing unreferenced quotes circulated on social media without scholarly verification.",
      answerUrdu: "ہمیشہ اصل کتاب اور حدیث نمبر کی تصدیق کریں۔ صحیح بخاری اور صحیح مسلم کی روایات بلاشبہ معتبر ہیں، جبکہ سنن اربعہ کی روایات کے ساتھ محدثین کے حکم کی تصدیق کریں۔ سوشل میڈیا پر بغیر حوالے کے چلنے والی باتوں کو کبھی آگے نہ پھیلائیں۔",
      reference: "Sahih Muslim, Introduction (Muqaddimah)"
    },
    {
      questionEn: "What is the rule when scholars have differing opinions on an issue?",
      questionUrdu: "جب کسی مسئلے پر علماء کی مختلف آراء ہوں تو عام مسلمان کو کیا کرنا چاہیے؟",
      answerEn: "A non-specialist (Aammi) should follow the verdict of a trustworthy, qualified, God-fearing local scholar or Islamic authority whose knowledge and piety they trust. One should not search for loopholes by cherry-picking the easiest opinions from various schools just to follow personal desires (Talfeeq al-Hawa).",
      answerUrdu: "عام مسلمان کے لیے ضروری ہے کہ وہ اپنے بااعتماد، متقی اور مستند مقامی اہل علم کے فتوے پر عمل کرے۔ محض نفسانی خواہش کی تسکین کے لیے مختلف مکاتب فکر سے آسانیاں تلاش کر کے جوڑ توڑ کرنے سے بچنا چاہیے۔",
      reference: "Surah An-Nahl (16:43)"
    }
  ],
  internalLinks: [
    {
      titleEn: "Explore the Islamic Quiz Hub",
      titleUrdu: "اسلامی سوالات کے کوئز میں حصہ لیں",
      descEn: "Test and solidify your understanding of essential fiqh, prophets, and daily Islamic facts.",
      descUrdu: "فقہی، تاریخی اور ایمانی معلومات کا آن لائن انٹرایکٹو امتحان لیں۔",
      path: "/islamic-quiz",
      tabId: "islamic-quiz"
    },
    {
      titleEn: "Step-by-Step Salah Guide",
      titleUrdu: "نماز کا مکمل مسنون طریقہ",
      descEn: "Learn exact physical postures, recitations, and corrections with authentic hadith proofs.",
      descUrdu: "تکبیر تحریمہ سے سلام تک نماز کا مکمل اور مستند طریقہ مع حوالہ جات۔",
      path: "/how-to-perform-salah",
      tabId: "how-to-perform-salah"
    },
    {
      titleEn: "Daily Dua with Urdu & English Meanings",
      titleUrdu: "روزانہ کی مسنون دعائیں مع ترجمہ",
      descEn: "Access verified supplications from Hisnul Muslim for morning, evening, and daily activities.",
      descUrdu: "حصن المسلم سے ماخوذ صبح و شام اور روزمرہ کی مستند دعائیں سنیں اور یاد کریں۔",
      path: "/daily-dua",
      tabId: "daily-dua"
    }
  ]
};

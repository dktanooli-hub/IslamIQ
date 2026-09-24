export interface ZakatRecipientCategory {
  arabicTerm: string;
  titleEn: string;
  titleUrdu: string;
  descriptionEn: string;
  descriptionUrdu: string;
}

export interface ZakatAssetItem {
  assetEn: string;
  assetUrdu: string;
  nisabRate: string;
  rateEn: string;
  rateUrdu: string;
  detailsEn: string;
  detailsUrdu: string;
}

export interface ZakatFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  scholarlyNote?: string;
  reference: string;
}

export interface ZakatBasicsGuideData {
  h1En: string;
  h1Urdu: string;
  introEn: string;
  introUrdu: string;
  definitionEn: string;
  definitionUrdu: string;
  nisabExplainedEn: string;
  nisabExplainedUrdu: string;
  hawlRuleEn: string;
  hawlRuleUrdu: string;
  assets: ZakatAssetItem[];
  recipientsVerse: { arabic: string; reference: string };
  eightRecipients: ZakatRecipientCategory[];
  ineligibleRecipientsEn: string;
  ineligibleRecipientsUrdu: string;
  calculationStepsEn: string[];
  calculationStepsUrdu: string[];
  faqs: ZakatFAQ[];
  relatedLinks: { titleEn: string; titleUrdu: string; tab: string }[];
}

export const ZAKAT_BASICS_DATA: ZakatBasicsGuideData = {
  h1En: "Zakat Basics: Nisab Thresholds, Calculation Rules & Eligible Recipients",
  h1Urdu: "زکوٰۃ کے بنیادی احکام: نصاب، طریقہ حساب اور مستحقینِ زکوٰۃ کی رہنمائی",
  introEn: "Zakat (obligatory almsgiving) is the third pillar of Islam and a cornerstone of social justice. Derived from the Arabic root meaning 'purification' and 'growth', Zakat purifies an individual's wealth and protects society by redistributing financial resources to those in genuine need. This comprehensive guide breaks down the concept of Nisab, the one-lunar-year condition (Hawl), which assets are zakatable, how to calculate liabilities and net worth, and who qualifies to receive Zakat according to Surah At-Tawbah (9:60).",
  introUrdu: "زکوٰۃ دینِ اسلام کا تیسرا بنیادی ستون اور معاشی عدل کا ضامن ہے۔ لغت میں اس کے معنی پاکیزگی اور بڑھوتری کے ہیں۔ زکوٰۃ ادا کرنے سے انسان کا مال پاک ہوتا ہے اور معاشرے کے غریب طبقات کی کفالت ہوتی ہے۔ یہ معلوماتی گائیڈ نصابِ زکوٰۃ، سال گزرنے کی شرط (حولانِ حول)، قابلِ زکوٰۃ اموال، حساب کا آسان طریقہ اور مستحقین (مصارفِ زکوٰۃ) کی تفصیلات پیش کرتی ہے۔",
  definitionEn: "In Islamic jurisprudence, Zakat is a mandatory religious levy imposed on specific types of surplus wealth held by a qualifying Muslim for a complete lunar year, payable at a rate of 2.5% (one-fortieth) to designated categories of recipients specified in the Quran.",
  definitionUrdu: "شریعتِ اسلامیہ میں زکوٰۃ ایک مخصوص مالی حق ہے جو اللہ تعالیٰ نے صاحبِ نصاب مسلمانوں کے مخصوص اموال پر سال پورا ہونے پر فقراء و مساکین کے لیے ڈھائی فیصد (2.5%) کی شرح سے فرض کیا ہے۔",
  nisabExplainedEn: "Nisab is the minimum threshold of net surplus wealth a Muslim must own before becoming obligated to pay Zakat. If a person's net wealth is below Nisab, they are exempt from paying and may even be eligible to receive assistance. Historically, the Prophet ﷺ designated two commodities for Nisab: Gold (20 Mithqals / Dinars ≈ 85 grams / 7.5 tolas) and Silver (200 Dirhams ≈ 595 grams / 52.5 tolas). Today, because silver is priced lower, many scholars recommend using the Silver standard for liquid cash and mixed savings so that more impoverished families receive relief; others advise using the Gold standard for pure gold owners. When calculating, always verify current spot bullion prices with local reputable authorities.",
  nisabExplainedUrdu: "نصاب مال کی وہ کم از کم مقدار ہے جس پر پہنچنے کے بعد زکوٰۃ فرض ہوتی ہے۔ نبی کریم ﷺ نے نصاب کے دو پیمانے مقرر فرمائے: ۱) سونا (۲۰ دینار یعنی تقریباً ۸۵ گرام یا ساڑھے سات تولے)، اور ۲) چاندی (۲۰۰ درہم یعنی تقریباً ۵۹۵ گرام یا ساڑھے باون تولے)۔ موجودہ دور میں نقد رقم اور تجارتی مال کے لیے اکثر فقہاء چاندی کی قیمت کا نصاب لاگو کرتے ہیں تاکہ غریبوں کو زیادہ نفع پہنچے۔ سونے چاندی کی موجودہ مارکیٹ ریٹ دیکھ کر نصاب کا تعین کیا جاتا ہے۔",
  hawlRuleEn: "The Hawl is the passage of one full lunar year (approximately 354 days) while maintaining wealth at or above the Nisab threshold. The Prophet ﷺ said: 'There is no Zakat upon wealth until a year has passed over it' (Sunan Abi Dawud 1573; Sunan Ibn Majah 1792). Short-term fluctuations during the year do not reset the clock according to majority jurists as long as the threshold is met at the beginning and end of the annual cycle.",
  hawlRuleUrdu: "حولانِ حول سے مراد نصاب کے مال پر ایک مکمل قمری سال (تقریباً ۳۵۴ دن) کا گزر جانا ہے۔ نبی کریم ﷺ نے فرمایا: 'کسی مال پر زکوٰۃ نہیں جب تک کہ اس پر سال نہ گزر جائے' (سنن ابی داؤد: ۱۵۷۳)۔ سال مکمل ہونے پر جتنا نقد، سونا یا تجارتی مال موجود ہو اس پر ۲.۵ فیصد زکوٰۃ واجب ہوگی۔",
  assets: [
    {
      assetEn: "Liquid Cash, Bank Deposits & Savings",
      assetUrdu: "نقد رقم اور بینک ڈپازٹس",
      nisabRate: "Silver standard (595g silver value)",
      rateEn: "2.5% on full surplus balance",
      rateUrdu: "کل بچت اور نقدی پر ۲.۵ فیصد",
      detailsEn: "Includes physical cash, checking and savings accounts, prize bonds, certificates of deposit, and foreign currency held for savings.",
      detailsUrdu: "گھر میں موجود نقد رقم، بینک کرنٹ یا سیونگ اکاؤنٹ، پرائز بانڈز اور غیر ملکی کرنسی سب اس میں شامل ہیں۔"
    },
    {
      assetEn: "Gold & Silver Jewelry or Bullion",
      assetUrdu: "سونا، چاندی اور زیورات",
      nisabRate: "Gold: 85g / Silver: 595g",
      rateEn: "2.5% based on weight & market value",
      rateUrdu: "مارکیٹ ویلیو پر ۲.۵ فیصد",
      detailsEn: "All gold/silver bars, coins, and investment assets are subject to Zakat. Regarding personal jewelry in regular use, the Hanafi school holds it strictly zakatable, while the majority (Maliki, Shafi'i, Hanbali) view modest personal jewelry as exempt. To ensure peace of mind, calculating Zakat on all fine metals is prudent.",
      detailsUrdu: "سونے چاندی کے بسکٹ اور سکے بالاتفاق قابلِ زکوٰۃ ہیں۔ ذاتی زیورات کے بارے میں احناف کے ہاں زکوٰۃ فرض ہے جبکہ دیگر ائمہ کے نزدیک اگر وہ عام استعمال میں ہوں تو معاف ہیں۔ احتیاط اسی میں ہے کہ زیورات کی زکوٰۃ ادا کی جائے۔"
    },
    {
      assetEn: "Business Merchandise & Trade Goods ('Urud al-Tijarah)",
      assetUrdu: "تجارتی مال اور دکان کا سامان",
      nisabRate: "Value equals silver Nisab",
      rateEn: "2.5% on current wholesale inventory value",
      rateUrdu: "تھوک فروخت قیمت پر ۲.۵ فیصد",
      detailsEn: "Any inventory, stock in trade, or real estate bought with the explicit intention to resell for profit. Fixed assets (such as store shelving, delivery vans, computers, and factory machinery) are completely exempt from Zakat.",
      detailsUrdu: "ہر وہ چیز جو نفع کمانے کی نیت سے خرید کر رکھی گئی ہو (جیسے دکان کا مالِ تجارت، اسٹاک یا برائے فروخت پلاٹ)۔ دکان کا فرنیچر، گاڑیاں اور فیکٹری کی مشینیں زکوٰۃ سے مستثنیٰ ہیں۔"
    },
    {
      assetEn: "Shares, Mutual Funds & Investments",
      assetUrdu: "شیئرز، اسٹاک مارکیٹ اور انویسٹمنٹ",
      nisabRate: "Value equals silver Nisab",
      rateEn: "2.5% (on liquid/trade portion)",
      rateUrdu: "قابلِ زکوٰۃ اثاثوں پر ۲.۵ فیصد",
      detailsEn: "If holding shares for day-trading, Zakat is 2.5% of full market value. If holding for long-term dividend income, Zakat is 2.5% on the company's underlying zakatable assets (cash + inventory), which financial councils often estimate between 20%–30% of total market capitalization if exact balance sheets are unavailable.",
      detailsUrdu: "اگر شیئرز قلیل مدتی منافع کے لیے ہوں تو پوری مارکیٹ ویلیو پر، اور اگر سالانہ ڈیویڈنڈ کے لیے ہوں تو کمپنی کے کیش اور انوینٹری کے تناسب سے زکوٰۃ ادا کی جاتی ہے۔"
    }
  ],
  recipientsVerse: {
    arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
    reference: "Surah At-Tawbah (9:60)"
  },
  eightRecipients: [
    {
      arabicTerm: "الفقراء (Al-Fuqara')",
      titleEn: "The Destitute (Extremely Poor)",
      titleUrdu: "فقراء (بے بس غریب)",
      descriptionEn: "Individuals who have virtually no wealth, income, or material possessions to sustain basic survival.",
      descriptionUrdu: "وہ لوگ جن کے پاس ضروریاتِ زندگی پوری کرنے کے لیے نہ کوئی مال ہو اور نہ کوئی کفیل۔"
    },
    {
      arabicTerm: "المساكين (Al-Masakin)",
      titleEn: "The Working Poor (Needy)",
      titleUrdu: "مساکین (مستحق و ضرورت مند)",
      descriptionEn: "People who have modest earnings or employment, but their total income falls short of covering essential living costs (food, housing, medicine).",
      descriptionUrdu: "وہ لوگ جن کی آمدنی ان کے بنیادی اخراجات (کھانے، کرایہ، علاج) کے لیے ناکافی ہو لیکن وہ مانگنے سے پرہیز کرتے ہیں۔"
    },
    {
      arabicTerm: "العاملين عليها (Al-'Amilina 'Alayha)",
      titleEn: "Zakat Administrators / Collectors",
      titleUrdu: "عاملین (زکوٰۃ وصول و تقسیم کرنے والا عملہ)",
      descriptionEn: "Appointed administrators tasked with collecting, auditing, guarding, and distributing institutional Zakat funds.",
      descriptionUrdu: "وہ اہلکار جنہیں شرعی حکومت یا مستند ادارہ زکوٰۃ جمع اور تقسیم کرنے کی ذمہ داری سونپے۔"
    },
    {
      arabicTerm: "المؤلفة قلوبهم (Al-Mu'allafati Qulubuhum)",
      titleEn: "Those Whose Hearts are Reconciled",
      titleUrdu: "تالیفِ قلب (نئے مسلمان یا دل جوئی)",
      descriptionEn: "New Muslims facing financial hardship or social ostracization after embracing Islam, to strengthen their community integration.",
      descriptionUrdu: "نومسلم حضرات جنہیں اسلام قبول کرنے کی وجہ سے معاشی بائیکاٹ یا تنگی کا سامنا ہو۔"
    },
    {
      arabicTerm: "في الرقاب (Fi al-Riqab)",
      titleEn: "Freeing Captives / Bondage",
      titleUrdu: "گردنیں چھڑانا (غلامی اور قید سے نجات)",
      descriptionEn: "Liberating human beings from chattel slavery, human trafficking, or unpayable bonded debt labor.",
      descriptionUrdu: "قیدیوں اور جبری مشقت یا غلامی میں جکڑے مظلوم انسانوں کو رہائی دلانا۔"
    },
    {
      arabicTerm: "الغارمين (Al-Gharimin)",
      titleEn: "The Overburdened Debtors",
      titleUrdu: "غارمین (قرض تلے دبے مجبور افراد)",
      descriptionEn: "People overwhelmed by legitimate debts incurred for basic survival, medical crises, or community reconciliation, with no means to settle them.",
      descriptionUrdu: "وہ مقروض جنہوں نے جائز ضرورت (علاج، بچوں کی کفالت) کے لیے قرض لیا اور اب ادائیگی سے بالکل عاجز ہیں۔"
    },
    {
      arabicTerm: "في سبيل الله (Fi Sabilillah)",
      titleEn: "In the Cause of Allah",
      titleUrdu: "فی سبیل اللہ (دین کی نصرت و اشاعت)",
      descriptionEn: "Defending the Muslim community, spreading authentic Islamic knowledge, Da'wah initiatives, and righteous institutional endeavors.",
      descriptionUrdu: "دین کی حفاظت، جہاد فی سبیل اللہ، اور اسلامی تعلیمات کی اشاعت کے لیے وقف مجاہدین و طلبہ۔"
    },
    {
      arabicTerm: "ابن السبيل (Ibn al-Sabil)",
      titleEn: "The Stranded Wayfarer (Traveler)",
      titleUrdu: "ابن السبیل (مسافر جو بے یار و مددگار ہو)",
      descriptionEn: "A legitimate traveler who has run out of funds or lost their belongings away from home, provided with enough assistance to safely reach their destination.",
      descriptionUrdu: "وہ مسافر جو سفر کے دوران رقم ختم ہو جانے یا چوری ہو جانے کی وجہ سے پھنس گیا ہو، خواہ وہ اپنے وطن میں امیر ہی کیوں نہ ہو۔"
    }
  ],
  ineligibleRecipientsEn: "Zakat cannot be given to: 1) One's direct ascendants (parents, grandparents) or direct descendants (children, grandchildren), because supporting them is an inherent personal duty; 2) One's spouse; 3) The wealthy who exceed the Nisab limit; 4) The family of Prophet Muhammad ﷺ (Banu Hashim); and 5) General public infrastructure (e.g., building roads or bridges) where personal ownership (Tamleek) cannot be transferred to a needy individual.",
  ineligibleRecipientsUrdu: "زکوٰۃ کن لوگوں کو نہیں دی جا سکتی: ۱) اصول و فروع یعنی والدین، دادا، دادی، اور اپنی اولاد، پوتے، نواسے (کیونکہ ان کی کفالت ذاتی ذمہ داری ہے)، ۲) میاں بیوی کا ایک دوسرے کو زکوٰۃ دینا، ۳) مالدار صاحبِ نصاب، ۴) آلِ نبیﷺ (سادات کرام جن کے لیے صدقہ ممنوع ہے)، اور ۵) سڑک، پل یا عمارت بنانے میں جہاں کسی مستحق کو مالک نہ بنایا جا سکے۔",
  calculationStepsEn: [
    "Step 1: Calculate Total Zakatable Assets (Cash in hand + bank balances + current market value of gold & silver + business trade inventory + recoverable loans).",
    "Step 2: Deduct Immediate Debts & Liabilities (Deduct unpaid bills, immediate debts due this month, and pending business trade payables). Long-term mortgages or multi-year loans are generally not deducted entirely; only the upcoming installment is deducted.",
    "Step 3: Determine Net Wealth (Zakatable Assets minus Immediate Liabilities).",
    "Step 4: Compare Net Wealth against Current Silver Nisab (approx 595 grams of silver). If Net Wealth is equal to or greater, multiply your Net Wealth by 0.025 (2.5%) to find your obligatory Zakat dues."
  ],
  calculationStepsUrdu: [
    "پہلا مرحلہ: تمام قابلِ زکوٰۃ اثاثے جمع کریں (نقد کیش + بینک بیلنس + سونے چاندی کی قیمت + دکان کا مالِ تجارت + وہ قرض جو واپس ملنا یقینی ہو)۔",
    "دوسرا مرحلہ: فوری واجب الادا قرضے اور بل منہا کریں (صرف اس ماہ یا سال واجب الادا اقساط، طویل مدتی ہاؤس لون کے تمام سال یکمشت منہا نہیں کیے جاتے)۔",
    "تیسرا مرحلہ: خالص مال معلوم کریں (قابلِ زکوٰۃ اثاثے منفی فوری قرضے)۔",
    "چوتھا مرحلہ: اس رقم کا موازنہ چاندی کے نصاب سے کریں۔ اگر رقم نصاب کے برابر یا زیادہ ہو تو کل رقم کو 2.5 فیصد (یعنی ۴۰ سے تقسیم) کر کے زکوٰۃ ادا کریں۔"
  ],
  faqs: [
    {
      questionEn: "Can I give Zakat to my needy brother, sister, aunt, or uncle?",
      questionUrdu: "کیا میں اپنے ضرورت مند بھائی، بہن، چچا یا خالہ کو زکوٰۃ دے سکتا ہوں؟",
      answerEn: "Yes, and in fact, it is highly encouraged! The Prophet ﷺ said: 'Giving charity to the poor is charity, but giving it to a relative is both charity and upholding family ties (Silat al-Rahim)' (Jami' al-Tirmidhi 658). As long as the relative is not your direct parent or child, and meets the criteria of being poor (below Nisab), giving them Zakat carries a double reward.",
      answerUrdu: "جی ہاں! بلکہ قریبی رشتہ داروں (بھائی، بہن، چچا، پھوپھی، ماموں، خالہ) کو زکوٰۃ دینا دہرے ثواب کا حامل ہے—ایک زکوٰۃ کی ادائیگی اور دوسرا صلہ رحمی کا۔ بس شرط یہ ہے کہ وہ صاحبِ نصاب نہ ہوں۔",
      reference: "Jami' al-Tirmidhi 658; Sunan an-Nasa'i 2582"
    },
    {
      questionEn: "Can Zakat be paid in installments throughout the year?",
      questionUrdu: "کیا زکوٰۃ سال بھر قسطوں میں ادا کی جا سکتی ہے؟",
      answerEn: "Yes. Many scholars permit paying Zakat in advance before your annual Hawl date arrives (e.g., donating monthly towards needy families), provided you reconcile the final exact math when your lunar year cycle is reached. However, delaying payment past the due date without a valid necessity is disliked or sinful.",
      answerUrdu: "جی ہاں، سال مکمل ہونے سے قبل پیشگی طور پر ماہانہ بنیادوں پر زکوٰۃ ادا کی جا سکتی ہے، اور سال کے اختتام پر حتمی حساب کر کے کمی بیشی برابر کر لی جائے۔ البتہ بلاوجہ تاخیر کرنا جائز نہیں۔",
      reference: "Al-Majmu' Sharh al-Muhadhdhab (Imam an-Nawawi)"
    },
    {
      questionEn: "Do I have to pay Zakat on personal home, car, or furniture?",
      questionUrdu: "کیا ذاتی مکان، ذاتی گاڑی اور گھریلو سامان پر زکوٰۃ ہے؟",
      answerEn: "No. Islam strictly exempts basic necessities of life (Hawa'ij Asliyyah). The Prophet ﷺ said: 'There is no charity upon a Muslim for his slave or his horse' (Sahih al-Bukhari 1463). Your primary residential home, family car, furniture, kitchen appliances, and professional work tools are 100% exempt regardless of their valuation.",
      answerUrdu: "بالکل نہیں! اسلام میں بنیادی ضروریاتِ زندگی (حوائجِ اصلیہ) پر کوئی زکوٰۃ نہیں ہے۔ آپ کا ذاتی رہائشی مکان، روزمرہ گاڑی، فرنیچر اور روزگار کے اوزار زکوٰۃ سے مکمل مستثنیٰ ہیں خواہ ان کی قیمت کتنی ہی زیادہ ہو۔",
      reference: "Sahih al-Bukhari 1463; Sahih Muslim 982"
    },
    {
      questionEn: "What is the difference between Zakat and Sadaqah?",
      questionUrdu: "زکوٰۃ اور عام صدقہ میں کیا فرق ہے؟",
      answerEn: "Zakat is obligatory (Fard), calculated on specific assets at a fixed percentage (2.5%), subject to Nisab and one lunar year, and restricted to the 8 Quranic categories of recipients. Sadaqah, by contrast, is voluntary charity that can be given at any time, in any amount, to any needy human being, Muslim or non-Muslim, without restriction.",
      answerUrdu: "زکوٰۃ ایک قطعی فرض ہے جس کا نصاب، وقت (ایک سال) اور شرح (ڈھائی فیصد) متعین ہے اور اس کے مصارف قرآن نے مخصوص کیے ہیں۔ جبکہ صدقہ عام نفل خیرات ہے جو انسان جب چاہے، جتنا چاہے اور جس کو چاہے نیکی کی نیت سے دے سکتا ہے۔",
      reference: "Bidayat al-Mujtahid by Ibn Rushd"
    }
  ],
  relatedLinks: [
    { titleEn: "5 Pillars of Islam Guide", titleUrdu: "اسلام کے ۵ بنیادی ارکان", tab: "5-pillars-of-islam" },
    { titleEn: "Ramadan & Fasting Guide", titleUrdu: "رمضان المبارک گائیڈ", tab: "ramadan-guide" },
    { titleEn: "Islamic Questions & Answers", titleUrdu: "اسلامی سوال و جواب", tab: "islamic-questions-answers" },
    { titleEn: "Islamic General Knowledge", titleUrdu: "اسلامی جنرل نالج", tab: "islamic-general-knowledge" }
  ]
};

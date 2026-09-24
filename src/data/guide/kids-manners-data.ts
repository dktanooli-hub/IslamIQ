export interface KidMannerCategory {
  titleEn: string;
  titleUrdu: string;
  categoryIconName: string;
  manners: Array<{
    titleEn: string;
    titleUrdu: string;
    whatKidsShouldDoEn: string;
    whatKidsShouldDoUrdu: string;
    sunnahPhraseArabic?: string;
    sunnahPhraseTransliteration?: string;
    sunnahPhraseUrdu?: string;
    sunnahPhraseEn?: string;
    propheticHadithQuoteEn: string;
    propheticHadithQuoteUrdu: string;
    hadithRef: string;
    kidFriendlyTipEn: string;
    kidFriendlyTipUrdu: string;
  }>;
}

export interface IslamicMannersKidsGuideData {
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
  heroHadithArabic: string;
  heroHadithUrdu: string;
  heroHadithEn: string;
  heroHadithRef: string;
  categories: KidMannerCategory[];
  dailyMannersChallenge: Array<{
    dayNumber: number;
    challengeTitleEn: string;
    challengeTitleUrdu: string;
    descriptionEn: string;
    descriptionUrdu: string;
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

export const ISLAMIC_MANNERS_FOR_KIDS_DATA: IslamicMannersKidsGuideData = {
  seoTitleEn: "Islamic Manners for Kids (Adab & Akhlaq Guide) | IslamIQ",
  seoTitleUrdu: "بچوں کے لیے اسلامی آداب اور اخلاقیات کی رہنما گائیڈ | اسلام آئی کیو",
  seoDescEn: "Engaging, practical guide teaching Islamic manners (Adab & Akhlaq) to kids and parents. Learn eating etiquette, greetings, honoring parents, kindness to friends, and Sunnah phrases.",
  seoDescUrdu: "بچوں اور والدین کے لیے اسلامی آداب و اخلاقیات: کھانے پینے کے آداب، سلام کرنا، والدین کا احترام، سچائی اور صفائی کے نبوی طریقے مستند احادیث کے ساتھ۔",
  canonicalPath: "/islamic-manners-for-kids",
  heroBadgeEn: "Family & Kids Education",
  heroBadgeUrdu: "بچوں کی اسلامی تربیت",
  h1En: "Islamic Manners for Kids: The Complete Guide to Adab & Good Character",
  h1Urdu: "بچوں کے لیے اسلامی آداب اور اخلاقِ حسنہ (پیارے نبی ﷺ کی پیاری سنتیں)",
  introEn: "In Islam, having beautiful character (Husn al-Khuluq) and polite manners (Adab) is among the most treasured qualities in the sight of Allah. Prophet Muhammad ﷺ was sent to perfect noble character. Teaching these gentle, loving habits early helps children grow up empathetic, respectful, confident, and beloved by both people and Allah.",
  introUrdu: "دینِ اسلام میں حسنِ اخلاق اور باادب زندگی اللہ تعالیٰ کے ہاں سب سے زیادہ پسندیدہ خوبی ہے۔ پیارے نبی حضرت محمد ﷺ کو بہترین اخلاق کی تکمیل کے لیے مبعوث فرمایا گیا۔ بچپن ہی سے پیار اور محبت کے ساتھ اسلامی آداب سکھانا بچوں کو ہمدرد، بااعتماد اور ہر دلعزیز انسان بناتا ہے۔",
  heroHadithArabic: "«إِنَّمَا بُعِثْتُ لِأُتَمِّمَ صَالِحَ الْأَخْلَاقِ»",
  heroHadithUrdu: "رسول اللہ ﷺ نے ارشاد فرمایا: 'بے شک مجھے اس لیے بھیجا گیا ہے تاکہ میں بہترین اخلاق کو مکمل کر دوں۔'",
  heroHadithEn: "The Messenger of Allah ﷺ said: 'I have only been sent to perfect good character.'",
  heroHadithRef: "Musnad Ahmad 8952, Al-Adab al-Mufrad 273 (Sahih)",
  categories: [
    {
      titleEn: "1. Table & Eating Manners (Adab al-Ta'am)",
      titleUrdu: "۱۔ کھانے پینے کے مسنون آداب",
      categoryIconName: "Utensils",
      manners: [
        {
          titleEn: "Say Bismillah and Eat with the Right Hand",
          titleUrdu: "بسم اللہ پڑھنا اور دائیں ہاتھ سے کھانا",
          whatKidsShouldDoEn: "Wash hands before meals, sit down humbly, say 'Bismillah' before the first bite, eat with the right hand, and eat from what is directly in front of you.",
          whatKidsShouldDoUrdu: "کھانے سے پہلے ہاتھ دھوئیں، بیٹھ کر کھائیں، شروع میں 'بسم اللہ' کہیں، دائیں ہاتھ سے کھائیں اور اپنے سامنے سے لقمہ اٹھائیں۔",
          sunnahPhraseArabic: "بِسْمِ اللَّهِ",
          sunnahPhraseTransliteration: "Bismillah",
          sunnahPhraseUrdu: "اللہ کے نام سے شروع",
          sunnahPhraseEn: "In the name of Allah",
          propheticHadithQuoteEn: "Prophet Muhammad ﷺ gently told the young boy Umar ibn Abi Salamah: 'O young boy, mention the Name of Allah, eat with your right hand, and eat from what is nearest to you.'",
          propheticHadithQuoteUrdu: "نبی کریم ﷺ نے حضرت عمر بن ابی سلمہ رضی اللہ عنہ سے شفقت سے فرمایا: 'اے بچے! اللہ کا نام لو، اپنے دائیں ہاتھ سے کھاؤ، اور جو تمہارے سامنے ہے اس میں سے کھاؤ۔'",
          hadithRef: "Sahih al-Bukhari 5376, Sahih Muslim 2022",
          kidFriendlyTipEn: "If you ever forget to say Bismillah at the beginning, don't worry! Just say: 'Bismillahi awwalahu wa akhirahu' (In the name of Allah at its beginning and its end).",
          kidFriendlyTipUrdu: "اگر شروع میں بسم اللہ پڑھنا بھول جائیں تو یاد آنے پر پڑھیں: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ'۔"
        },
        {
          titleEn: "Do Not Waste Food and Praise Allah Afterwards",
          titleUrdu: "کھانا ضائع نہ کرنا اور شکر ادا کرنا",
          whatKidsShouldDoEn: "Take only what you can finish on your plate, never criticize food you dislike (just leave it respectfully), and say Alhamdulillah when done.",
          whatKidsShouldDoUrdu: "پلیٹ میں اتنا ہی کھانا لیں جتنا ختم کر سکیں، کھانے میں عیب نہ نکالیں، اور کھانے کے بعد الحمد للہ کہیں۔",
          sunnahPhraseArabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
          sunnahPhraseTransliteration: "Alhamdu lillahilladhi at'amana wa saqana wa ja'alana muslimeen",
          sunnahPhraseUrdu: "سب تعریفیں اللہ کے لیے ہیں جس نے ہمیں کھلایا، پلایا اور مسلمان بنایا",
          sunnahPhraseEn: "All praise is due to Allah who gave us food and drink and made us Muslims",
          propheticHadithQuoteEn: "Abu Hurairah reported: 'The Prophet ﷺ never found fault with any food. If he liked it, he ate it; if he disliked it, he simply left it.'",
          propheticHadithQuoteUrdu: "حضرت ابوہریرہ رضی اللہ عنہ بیان کرتے ہیں: 'رسول اللہ ﷺ نے کبھی کسی کھانے میں عیب نہیں نکالا۔ پسند فرماتے تو کھا لیتے، ورنہ چھوڑ دیتے۔'",
          hadithRef: "Sahih al-Bukhari 5409",
          kidFriendlyTipEn: "Every single rice grain has a blessing! Finishing your plate shows thankfulness to the farmers and to Allah.",
          kidFriendlyTipUrdu: "کھانے کا ہر دانہ اللہ کی نعمت ہے، پلیٹ صاف کر کے کھانا سنت اور برکت کا ذریعہ ہے۔"
        }
      ]
    },
    {
      titleEn: "2. Greeting & Speech Manners (Adab al-Kalam)",
      titleUrdu: "۲۔ سلام اور بات چیت کے خوبصورت آداب",
      categoryIconName: "MessageCircle",
      manners: [
        {
          titleEn: "Spreading the Greeting of Peace (Salam)",
          titleUrdu: "سب کو مسکرا کر سلام کرنا",
          whatKidsShouldDoEn: "Greet family, teachers, friends, and elders with a warm smile saying 'As-salamu alaykum wa rahmatullah'. The younger person should initiate the greeting to the elder.",
          whatKidsShouldDoUrdu: "گھر والوں، اساتذہ، دوستوں اور بڑوں کو مسکراہٹ کے ساتھ 'السلام علیکم ورحمۃ اللہ' کہیں۔ چھوٹا بڑے کو سلام میں پہل کرے۔",
          sunnahPhraseArabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
          sunnahPhraseTransliteration: "As-salamu 'alaykum wa rahmatullahi wa barakatuh",
          sunnahPhraseUrdu: "تم پر اللہ کی سلامتی، رحمت اور برکتیں ہوں",
          sunnahPhraseEn: "Peace, mercy and blessings of Allah be upon you",
          propheticHadithQuoteEn: "The Prophet ﷺ said: 'You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something that will make you love one another? Spread peace (Salam) among yourselves.'",
          propheticHadithQuoteUrdu: "نبی کریم ﷺ نے فرمایا: 'تم اس وقت تک جنت میں داخل نہیں ہو سکتے جب تک ایمان نہ لاؤ، اور اس وقت تک مومن نہیں بن سکتے جب تک ایک دوسرے سے محبت نہ کرو۔ کیا میں تمہیں وہ بات نہ بتاؤں جس سے تم میں محبت پیدا ہو؟ آپس میں سلام کو عام کرو۔'",
          hadithRef: "Sahih Muslim 54",
          kidFriendlyTipEn: "Smiling when you say Salam is a free act of charity (Sadaqah) that brightens everyone's day!",
          kidFriendlyTipUrdu: "مسکرا کر سلام کہنا صدقہ ہے جو دوسروں کے چہروں پر بھی خوشی بکھیر دیتا ہے۔"
        },
        {
          titleEn: "Speaking Truth and Guarding the Tongue",
          titleUrdu: "ہمیشہ سچ بولنا اور گالی گلوچ سے بچنا",
          whatKidsShouldDoEn: "Always speak the truth even when afraid of getting in trouble. Avoid name-calling, teasing, yelling, or using bad language.",
          whatKidsShouldDoUrdu: "ہمیشہ سچ بولیں خواہ غلطی ہی کیوں نہ ہو گئی ہو۔ جھوٹ، برے القاب، گالی اور چیخ کر بات کرنے سے بچیں۔",
          sunnahPhraseArabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
          sunnahPhraseTransliteration: "Man kana yu'minu billahi wal-yawmil-akhiri fal-yaqul khayran aw li-yasmut",
          sunnahPhraseUrdu: "جو اللہ اور آخرت پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے",
          sunnahPhraseEn: "Whoever believes in Allah and the Last Day should speak good or remain silent",
          propheticHadithQuoteEn: "The Prophet ﷺ said: 'Truthfulness leads to righteousness, and righteousness leads to Paradise... and beware of lying, for lying leads to wickedness, and wickedness leads to the Fire.'",
          propheticHadithQuoteUrdu: "رسول اللہ ﷺ نے فرمایا: 'سچائی نیکی کی طرف لے جاتی ہے اور نیکی جنت کی طرف، اور جھوٹ سے بچو کیونکہ جھوٹ گناہ کی طرف لے جاتا ہے اور گناہ جہنم کی طرف۔'",
          hadithRef: "Sahih al-Bukhari 6094",
          kidFriendlyTipEn: "Think of your words like toothpaste: once they come out of the tube, you can't put them back in! Speak only sweet, helpful words.",
          kidFriendlyTipUrdu: "الفاظ منہ سے نکلنے کے بعد واپس نہیں آتے، اس لیے بولنے سے پہلے سوچیں کہ یہ بات اچھی ہے یا نہیں۔"
        }
      ]
    },
    {
      titleEn: "3. Manners Towards Parents & Elders (Birr al-Walidayn)",
      titleUrdu: "۳۔ والدین اور اساتذہ کا ادب و احترام",
      categoryIconName: "HeartHandshake",
      manners: [
        {
          titleEn: "Loving Kindness to Parents (No 'Uff')",
          titleUrdu: "والدین کے سامنے اف نہ کہنا اور فرمانبرداری",
          whatKidsShouldDoEn: "Listen attentively when mom and dad speak, say 'JazakAllahu Khayran' when they cook or help you, help tidy your room without complaining, and make dua for them.",
          whatKidsShouldDoUrdu: "والدین کی بات دھیان سے سنیں، ان کے کاموں پر شکریہ ادا کریں، اپنے کھلونے خود سمیٹیں اور روزانہ ان کے لیے دعا کریں۔",
          sunnahPhraseArabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
          sunnahPhraseTransliteration: "Rabbir-hamhuma kama rabbayani sagheera",
          sunnahPhraseUrdu: "اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا",
          sunnahPhraseEn: "My Lord, have mercy upon them as they brought me up when I was small",
          propheticHadithQuoteEn: "A man asked the Prophet ﷺ: 'Who is most deserving of my good companionship?' The Prophet replied: 'Your mother.' The man asked: 'Then who?' He said: 'Your mother.' The man asked: 'Then who?' He said: 'Your mother.' The man asked: 'Then who?' He said: 'Then your father.'",
          propheticHadithQuoteUrdu: "ایک شخص نے عرض کیا: یا رسول اللہ! میرے حسنِ سلوک کا سب سے زیادہ حقدار کون ہے؟ آپ ﷺ نے فرمایا: 'تمہاری ماں'۔ انہوں نے پوچھا پھر کون؟ فرمایا: 'تمہاری ماں'۔ پھر پوچھا: پھر کون؟ فرمایا: 'تمہاری ماں'۔ چوتھی بار فرمایا: 'پھر تمہارا باپ'۔",
          hadithRef: "Sahih al-Bukhari 5971, Sahih Muslim 2548",
          kidFriendlyTipEn: "Give your parents a surprise hug every single morning and say: 'I love you for the sake of Allah!'",
          kidFriendlyTipUrdu: "روزانہ صبح والدین کو پیار سے گلے لگائیں اور ان کی دعائیں لیں۔"
        },
        {
          titleEn: "Respecting Teachers and Honoring Elders",
          titleUrdu: "اساتذہ کی تعظیم اور چھوٹوں پر شفقت",
          whatKidsShouldDoEn: "Do not interrupt when elders are talking, give your seat to an older person, raise your hand politely in class, and treat younger siblings with mercy.",
          whatKidsShouldDoUrdu: "بڑوں کی بات نہ کاٹیں، بزرگوں کے لیے جگہ چھوڑیں، کلاس میں ادب سے سوال پوچھیں اور چھوٹے بہن بھائیوں پر شفقت کریں۔",
          sunnahPhraseArabic: "لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيَعْرِفْ شَرَفَ كَبِيرِنَا",
          sunnahPhraseTransliteration: "Laysa minna man lam yarham sagheerana wa ya'rif sharafa kabeerina",
          sunnahPhraseUrdu: "وہ ہم میں سے نہیں جو ہمارے چھوٹوں پر رحم نہ کرے اور ہمارے بڑوں کی عزت نہ پہچانے",
          sunnahPhraseEn: "He is not one of us who does not have mercy on our young and honor our elders",
          propheticHadithQuoteEn: "Prophet Muhammad ﷺ taught: 'He is not one of us who does not show mercy to our little ones and respect our elders.'",
          propheticHadithQuoteUrdu: "نبی کریم ﷺ نے ارشاد فرمایا: 'وہ شخص ہم میں سے نہیں جو ہمارے چھوٹوں پر رحم نہ کرے اور ہمارے بڑوں کا حق و ادب نہ پہچانے۔'",
          hadithRef: "Sunan Abi Dawud 4943, Jami` at-Tirmidhi 1919 (Sahih)",
          kidFriendlyTipEn: "When an older guest enters the room, stand up to greet them and offer them the most comfortable chair.",
          kidFriendlyTipUrdu: "جب کوئی بڑا یا مہمان کمرے میں آئے تو کھڑے ہو کر استقبال کریں اور انہیں بیٹھنے کی جگہ پیش کریں۔"
        }
      ]
    },
    {
      titleEn: "4. Cleanliness & Sneezing Etiquette (Taharah & Tashmeet)",
      titleUrdu: "۴۔ صفائی، چھینکنے اور بیت الخلاء کے آداب",
      categoryIconName: "Sparkles",
      manners: [
        {
          titleEn: "The Golden Rule of Sneezing and Yawning",
          titleUrdu: "چھینکنے اور جمائی کے آداب",
          whatKidsShouldDoEn: "Cover your mouth and nose with your elbow or tissue when sneezing, lower your voice, say 'Alhamdulillah'. The listener replies 'YarhamukAllah', and the sneezer concludes with 'Yahdeekumullah'. When yawning, cover your mouth with the back of your left hand.",
          whatKidsShouldDoUrdu: "چھینک آئے تو منہ کہنی یا ٹشو سے ڈھانپیں، آواز نیچی رکھیں اور 'الحمد للہ' کہیں۔ سننے والا 'یرحمک اللہ' کہے اور چھینکنے والا جواباً 'یہدیکم اللہ' کہے۔ جمائی آئے تو منہ پر ہاتھ رکھیں۔",
          sunnahPhraseArabic: "الْحَمْدُ لِلَّهِ ۝ يَرْحَمُكَ اللَّهُ ۝ يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
          sunnahPhraseTransliteration: "Alhamdulillah ➔ YarhamukAllah ➔ Yahdeekumullah wa yuslihu balakum",
          sunnahPhraseUrdu: "الحمد للہ ➔ یرحمک اللہ ➔ یہدیکم اللہ ویصلح بالکم",
          sunnahPhraseEn: "All praise to Allah ➔ May Allah have mercy on you ➔ May Allah guide you and set right your state",
          propheticHadithQuoteEn: "The Prophet ﷺ said: 'When one of you sneezes, let him say 'Alhamdulillah', and his brother should say 'YarhamukAllah'. Then the sneezer should reply 'Yahdeekumullah wa yuslihu balakum.''",
          propheticHadithQuoteUrdu: "رسول اللہ ﷺ نے فرمایا: 'جب تم میں سے کسی کو چھینک آئے تو وہ الحمد للہ کہے، اس کا بھائی یرحمک اللہ کہے، پھر چھینکنے والا کہے: یہدیکم اللہ ویصلح بالکم۔'",
          hadithRef: "Sahih al-Bukhari 6224",
          kidFriendlyTipEn: "Sneezing is a blessing that refreshes the brain! Responding to someone's sneeze is one of the 5 rights of a Muslim.",
          kidFriendlyTipUrdu: "کسی چھینکنے والے کو دعا دینا مسلمانوں کا ایک دوسرے پر حق ہے۔"
        },
        {
          titleEn: "Cleanliness is Half of Faith (Taharah)",
          titleUrdu: "طہارت نصف ایمان ہے",
          whatKidsShouldDoEn: "Keep your body, clothes, room, and study desk clean. Brush teeth (Miswak/toothbrush), throw litter in the bin, and never leave toys scattered.",
          whatKidsShouldDoUrdu: "اپنے جسم، لباس اور پڑھائی کے کمرے کو صاف ستھرا رکھیں۔ مسواک یا برش باقاعدگی سے کریں اور کوڑا دان کا استعمال کریں۔",
          sunnahPhraseArabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
          sunnahPhraseTransliteration: "At-tahooru shatrul-iman",
          sunnahPhraseUrdu: "پاکیزگی اور صفائی آدھا ایمان ہے",
          sunnahPhraseEn: "Cleanliness is half of faith",
          propheticHadithQuoteEn: "The Messenger of Allah ﷺ said: 'Cleanliness is half of faith.'",
          propheticHadithQuoteUrdu: "رسول اللہ ﷺ نے فرمایا: 'صفائی اور طہارت نصف ایمان ہے۔'",
          hadithRef: "Sahih Muslim 223",
          kidFriendlyTipEn: "Picking up a sharp stone, toy, or trash from the floor is an act of charity that earns rewards in Jannah!",
          kidFriendlyTipUrdu: "راستے سے تکلیف دہ چیز، پتھر یا کچرا ہٹانا بھی صدقہ اور ثواب کا کام ہے۔"
        }
      ]
    }
  ],
  dailyMannersChallenge: [
    {
      dayNumber: 1,
      challengeTitleEn: "Day 1: The Bismillah Champion",
      challengeTitleUrdu: "پہلا دن: بسم اللہ چیمپیئن",
      descriptionEn: "Say Bismillah before every single drink of water and bite of food today using your right hand.",
      descriptionUrdu: "آج کے دن ہر کھانے پینے کی چیز شروع کرنے سے پہلے بسم اللہ پڑھیں اور دائیں ہاتھ کا استعمال کریں۔"
    },
    {
      dayNumber: 2,
      challengeTitleEn: "Day 2: The Smiling Salam Mission",
      challengeTitleUrdu: "دوسرا دن: مسکرا کر سلام مشن",
      descriptionEn: "Be the first person in your house to greet everyone with 'As-salamu alaykum wa rahmatullah' with a big smile.",
      descriptionUrdu: "آج گھر میں ہر فرد کو مسکرا کر سلام کرنے میں خود پہل کریں۔"
    },
    {
      dayNumber: 3,
      challengeTitleEn: "Day 3: Secret Kindness for Parents",
      challengeTitleUrdu: "تیسرا دن: والدین کے لیے خفیہ نیکی",
      descriptionEn: "Clean your room or put away shoes without being asked, and make dua for your parents after prayer.",
      descriptionUrdu: "بغیر کہے اپنے جوتے اور کمرہ صاف کریں اور نماز کے بعد والدین کے لیے پیاری سی دعا کریں۔"
    },
    {
      dayNumber: 4,
      challengeTitleEn: "Day 4: Sneezing & Polite Words",
      challengeTitleUrdu: "چوتھا دن: چھینک اور میٹھے بول",
      descriptionEn: "Use 'JazakAllahu Khayran' instead of plain thanks, and say 'YarhamukAllah' when someone sneezes.",
      descriptionUrdu: "شکریہ کے بجائے 'جزاک اللہ خیراً' کہیں اور کسی کے چھینکنے پر 'یرحمک اللہ' کہیں۔"
    },
    {
      dayNumber: 5,
      challengeTitleEn: "Day 5: The Truthfulness Hero",
      challengeTitleUrdu: "پانچواں دن: سچائی کا ہیرو",
      descriptionEn: "Speak only what is 100% true, compliment a friend or sibling, and avoid complaining all day.",
      descriptionUrdu: "پورا دن صرف سچ بولیں، کسی کی تعریف کریں اور شکایت کرنے سے پرہیز کریں۔"
    }
  ],
  faqs: [
    {
      questionEn: "At what age should children start learning Islamic manners?",
      questionUrdu: "بچوں کو کس عمر میں اسلامی آداب سکھانے چاہئیں؟",
      answerEn: "From toddlerhood (ages 2-3), children naturally mimic parents. Simple phrases like Bismillah, Alhamdulillah, Salam, and using the right hand can be taught as soon as a child begins eating and speaking. Formal instruction on prayers begins at age 7.",
      answerUrdu: "دو سے تین سال کی عمر سے ہی بچے والدین کو دیکھ کر سیکھتے ہیں۔ بسم اللہ، الحمد للہ اور سلام جیسے کلمات اسی عمر سے سکھائے جانے چاہئیں جبکہ نماز کی باقاعدہ تلقین ۷ سال کی عمر سے فرمائی گئی ہے۔",
      reference: "Sunan Abi Dawud 495"
    },
    {
      questionEn: "What should parents do when a child speaks disrespectfully?",
      questionUrdu: "اگر بچہ غصے میں بدتمیزی کرے تو والدین کو کیا کرنا چاہیے؟",
      answerEn: "The Sunnah approach of Prophet Muhammad ﷺ was gentle patience. He never struck a servant or child. First, remain calm and do not react with anger. Lower your voice, take the child aside, validate their feeling, and explain that in Islam we express disagreement with respectful words.",
      answerUrdu: "نبی کریم ﷺ نے کبھی کسی بچے یا خادم پر ہاتھ نہیں اٹھایا۔ والدین کو چاہیے کہ خود پرسکون رہیں، چیخنے کے بجائے بچے کو پیار سے الگ لے جا کر سمجھائیں کہ اچھے مسلمان اپنی بات ادب سے کہتے ہیں۔",
      reference: "Sahih Muslim 2328"
    },
    {
      questionEn: "Why is eating with the right hand so important in Islam?",
      questionUrdu: "اسلام میں دائیں ہاتھ سے کھانے کی اتنی تاکید کیوں ہے؟",
      answerEn: "Prophet Muhammad ﷺ taught that the right side is reserved for honorable, pure, and clean activities (eating, drinking, giving gifts, greeting), while the left hand is designated for cleaning impurities. This cultivates spiritual mindfulness and cleanliness.",
      answerUrdu: "نبی کریم ﷺ نے دائیں ہاتھ کو اچھے اور پاک کاموں (کھانے پینے، سلام کرنے اور چیزیں دینے) کے لیے مخصوص فرمایا، جبکہ بایاں ہاتھ نجاست صاف کرنے کے لیے ہے تاکہ جسمانی اور باطنی طہارت برقرار رہے۔",
      reference: "Sahih Muslim 2020"
    }
  ],
  internalLinks: [
    {
      titleEn: "Kids Islamic Quiz",
      titleUrdu: "بچوں کا اسلامی کوئز",
      descEn: "Play interactive questions on Prophets, Quran stories, and good morals.",
      descUrdu: "انبیاء کرام، قرآنی کہانیاں اور اخلاقیات پر دلچسپ سوالات۔",
      path: "/kids-islamic-quiz",
      tabId: "kids-islamic-quiz"
    },
    {
      titleEn: "Salah for Beginners Guide",
      titleUrdu: "نوآموزوں کے لیے نماز",
      descEn: "Easy guide helping youngsters and beginners learn how to pray.",
      descUrdu: "بچوں اور نئے سیکھنے والوں کے لیے نماز کا مرحلہ وار طریقہ۔",
      path: "/salah-for-beginners",
      tabId: "salah-for-beginners"
    },
    {
      titleEn: "Daily Islamic Dua Hub",
      titleUrdu: "روزانہ کی مسنون دعائیں",
      descEn: "Learn essential morning, evening, mealtime, and sleeping supplications.",
      descUrdu: "سونے، جاگنے، کھانے اور گھر سے نکلنے کی آسان دعائیں۔",
      path: "/daily-dua",
      tabId: "daily-dua"
    },
    {
      titleEn: "The 5 Pillars of Islam Explained",
      titleUrdu: "اسلام کے ۵ بنیادی ارکان",
      descEn: "A complete introduction to the core foundations of Islam.",
      descUrdu: "ارکانِ اسلام کی تفصیلی اور مستند وضاحت۔",
      path: "/5-pillars-of-islam",
      tabId: "5-pillars-of-islam"
    }
  ]
};

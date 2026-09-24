export interface WuduStep {
  stepNumber: number;
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  isFard: boolean;
  arabic?: string;
  transliteration?: string;
  meaningEn?: string;
  meaningUrdu?: string;
  reference?: string;
}

export interface WuduGuideData {
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
  quranAyahArabic: string;
  quranAyahUrdu: string;
  quranAyahEn: string;
  quranRef: string;
  fardSummary: {
    number: number;
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
  }[];
  steps: WuduStep[];
  nullifiers: {
    titleEn: string;
    titleUrdu: string;
    descEn: string;
    descUrdu: string;
  }[];
  commonMistakes: {
    mistakeEn: string;
    mistakeUrdu: string;
    correctionEn: string;
    correctionUrdu: string;
    reference?: string;
  }[];
  postWuduDua: {
    arabic: string;
    transliteration: string;
    translationUrdu: string;
    translationEn: string;
    virtueUrdu: string;
    virtueEn: string;
    reference: string;
  };
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

export const WUDU_GUIDE_DATA: WuduGuideData = {
  seoTitleEn: 'How to Perform Wudu (Ablution) Step by Step Guide | IslamIQ',
  seoTitleUrdu: 'وضو کا مکمل مسنون طریقہ • فرائض، سنن، دعائیں اور احکام | IslamIQ',
  seoDescEn: 'Complete step-by-step guide on how to perform Wudu (Islamic ablution). Learn the 4 obligatory Fard acts, full Sunnah method, nullifiers, post-wudu dua, and authentic references.',
  seoDescUrdu: 'وضو کا آسان اور مکمل طریقہ، وضو کے 4 فرائض، مسنون طریقہ کار، وضو کو توڑنے والی چیزیں، وضو کے بعد کی مسنون دعا اور قرآن و سنت کے مستند حوالہ جات۔',
  canonicalPath: '/how-to-perform-wudu',
  heroBadgeEn: 'Spiritual & Physical Purification • الطهارة شطر الإيمان',
  heroBadgeUrdu: 'طہارت اور پاکیزگی • نصف ایمان',
  h1En: 'How to Perform Wudu (Ablution) — Complete Step-by-Step Guide',
  h1Urdu: 'وضو کا مکمل مسنون طریقہ — قرآن و سنت کی روشنی میں مرحلہ وار گائیڈ',
  introEn: 'Wudu (ablution) is the ritual purification obligatory before performing Salah, touching the Mushaf of the Quran, or circumambulating the Kaaba (Tawaf). Beyond physical cleanliness, Wudu washes away sins and brings profound inner serenity. The Prophet Muhammad ﷺ declared: "Purity is half of faith" (Sahih Muslim 223). This guide outlines the 4 Quranic obligations, the full Sunnah method, common pitfalls, and authentic supplications.',
  introUrdu: 'وضو نماز، تلاوتِ قرآن اور طوافِ کعبہ کے لیے بنیادی شرط اور روحانی و جسمانی پاکیزگی کا عظیم ذریعہ ہے۔ رسول اللہ ﷺ نے فرمایا: "پاکیزگی نصف ایمان ہے" (صحیح مسلم: 223)۔ جب بندہ وضو کرتا ہے تو اس کے اعضاء کے گناہ پانی کے قطروں کے ساتھ جھڑ جاتے ہیں۔ یہ مفصل گائیڈ وضو کے ۴ قرآنی فرائض، مسنون اعمال، توڑنے والی چیزوں اور دعاؤں پر مشتمل ہے۔',
  quranAyahArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
  quranAyahUrdu: 'اے ایمان والو! جب تم نماز کے لیے کھڑے ہونے کا ارادہ کرو تو اپنے چہرے دھو لو اور اپنے ہاتھ کہنیوں تک دھو لو اور اپنے سروں کا مسح کرو اور اپنے پاؤں ٹخنوں تک دھو لو۔ (سورۃ المائدہ: 6)',
  quranAyahEn: 'O you who have believed, when you rise to [perform] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles. (Surah Al-Ma\'idah 5:6)',
  quranRef: 'Surah Al-Ma\'idah 5:6',
  fardSummary: [
    {
      number: 1,
      titleEn: 'Washing the entire face',
      titleUrdu: 'پورے چہرے کو دھونا',
      descEn: 'From hairline of the forehead down to the chin, and from earlobe to earlobe.',
      descUrdu: 'پریشانی کے بالوں سے ٹھوڑی کے نیچے تک اور ایک کان کی لو سے دوسرے کان کی لو تک۔'
    },
    {
      number: 2,
      titleEn: 'Washing both arms up to and including elbows',
      titleUrdu: 'دونوں ہاتھوں کو کہنیوں سمیت دھونا',
      descEn: 'Ensuring water reaches from fingertips all the way over the elbow joints.',
      descUrdu: 'انگلیوں کے پوروں سے لے کر دونوں کہنیوں سمیت اچھی طرح دھونا۔'
    },
    {
      number: 3,
      titleEn: 'Wiping over the head (Masah)',
      titleUrdu: 'سر کا مسح کرنا',
      descEn: 'Wiping the wet hand over the head (scholars concur that at least one quarter, or the entire head per Sunnah, is included).',
      descUrdu: 'گیلے ہاتھوں سے سر کا مسح کرنا (سنت کے مطابق پورے سر کا، اور فقہ کے مطابق کم از کم چوتھائی سر کا)۔'
    },
    {
      number: 4,
      titleEn: 'Washing both feet up to and including ankles',
      titleUrdu: 'دونوں پاؤں کو ٹخنوں سمیت دھونا',
      descEn: 'Washing both feet thoroughly including heels, soles, and between the toes.',
      descUrdu: 'دونوں پاؤں کو انگلیوں، تلووں اور ایڑیوں سمیت دونوں ٹخنوں تک دھونا۔'
    }
  ],
  steps: [
    {
      stepNumber: 1,
      titleEn: 'Intention (Niyyah) & Saying Bismillah',
      titleUrdu: 'دل میں نیت کرنا اور بسم اللہ کہنا',
      descEn: 'Make the intention in your heart to perform Wudu for the pleasure of Allah and to purify yourself for prayer. Say "Bismillah" (In the name of Allah).',
      descUrdu: 'دل میں اللہ کی رضا اور نماز کی پاکیزگی کے لیے وضو کی نیت کریں اور "بِسْمِ اللَّهِ" پڑھ کر آغاز کریں۔',
      isFard: false,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliteration: 'Bismillahir-Rahmanir-Raheem',
      meaningEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      meaningUrdu: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔',
      reference: 'Sunan Abi Dawud 101, Jami at-Tirmidhi 25'
    },
    {
      stepNumber: 2,
      titleEn: 'Washing Both Hands up to the Wrists (3 Times)',
      titleUrdu: 'دونوں ہاتھوں کو کلائیوں تک ۳ بار دھونا',
      descEn: 'Wash both hands up to the wrists three times, rubbing between fingers and ensuring water covers every part of the palms and wrists.',
      descUrdu: 'دونوں ہاتھوں کو کلائیوں تک ۳ مرتبہ اچھی طرح دھوئیں اور انگلیوں کا خلال کریں۔',
      isFard: false,
      reference: 'Sahih al-Bukhari 159, Sahih Muslim 226'
    },
    {
      stepNumber: 3,
      titleEn: 'Rinsing the Mouth (Madmadah) 3 Times',
      titleUrdu: 'کلی کرنا (مضمضہ) ۳ بار',
      descEn: 'Take water with your right hand into your mouth, swirl it around thoroughly to cleanse teeth and gums, and spit it out. Repeat three times. Using a Miswak is highly rewarded.',
      descUrdu: 'دائیں ہاتھ کے چلو سے منہ میں پانی ڈال کر اچھی طرح کلی کریں اور دانتوں کی صفائی کریں۔ یہ عمل ۳ بار دہرائیں۔ مسواک کرنا عظیم سنت ہے۔',
      isFard: false,
      reference: 'Sahih al-Bukhari 164, Sahih Muslim 226'
    },
    {
      stepNumber: 4,
      titleEn: 'Inhaling Water into the Nostrils & Snuffing Out (Istinshaq) 3 Times',
      titleUrdu: 'ناک میں پانی ڈالنا اور جھاڑنا (استنشاق) ۳ بار',
      descEn: 'Gently sniff water into your nostrils using your right hand, then blow it out gently using your left hand. Repeat three times.',
      descUrdu: 'دائیں ہاتھ سے ناک کے نرم حصے تک پانی پہنچائیں اور بائیں ہاتھ سے ناک کو صاف کریں۔ ۳ مرتبہ یہ عمل دہرائیں۔',
      isFard: false,
      reference: 'Sahih al-Bukhari 164, Sahih Muslim 226'
    },
    {
      stepNumber: 5,
      titleEn: 'Washing the Entire Face (3 Times) — [Fard]',
      titleUrdu: 'پورے چہرے کو ۳ بار دھونا — [فرض]',
      descEn: 'Wash the entire face three times from the normal hairline down to below the chin, and from ear to ear. Water must reach the skin and through the beard (running wet fingers through a thick beard is Sunnah).',
      descUrdu: 'پیشانی کے بالوں سے ٹھوڑی کے نیچے تک اور ایک کان سے دوسرے کان تک چہرے کو ۳ بار دھوئیں اور داڑھی کا خلال کریں۔ یہ وضو کا پہلا قرآنی فرض ہے۔',
      isFard: true,
      reference: 'Surah Al-Ma\'idah 5:6, Sahih al-Bukhari 140'
    },
    {
      stepNumber: 6,
      titleEn: 'Washing Forearms up to & Including the Elbows (3 Times) — [Fard]',
      titleUrdu: 'ہاتھوں کو کہنیوں سمیت ۳ بار دھونا — [فرض]',
      descEn: 'Wash the right arm from fingertips past the elbow three times, ensuring the elbow joint is fully saturated. Then wash the left arm in the exact same manner.',
      descUrdu: 'پہلے دائیں ہاتھ کو انگلیوں کے سروں سے کہنی سمیت ۳ بار دھوئیں، پھر اسی طرح بائیں ہاتھ کو کہنی سمیت ۳ بار دھوئیں۔ یہ دوسرا قرآنی فرض ہے۔',
      isFard: true,
      reference: 'Surah Al-Ma\'idah 5:6, Sahih Muslim 226'
    },
    {
      stepNumber: 7,
      titleEn: 'Wiping over the Head & Cleaning the Ears (Masah) — [Fard]',
      titleUrdu: 'سر اور کانوں کا مسح کرنا — [فرض]',
      descEn: 'Moisten your hands with fresh water. Starting from the front of your head, pass your wet palms back to the nape of the neck, then bring them back to where you started. With wet index fingers, wipe the inside curves of your ears, and use your thumbs to wipe behind your ears.',
      descUrdu: 'ہاتھ گیلے کر کے پیشانی سے گردن کی طرف اور واپس آگے کی طرف مسح کریں۔ پھر شہادت کی انگلیوں سے کانوں کے اندر اور انگوٹھوں سے کانوں کے پیچھے کا مسح کریں۔ یہ تیسرا فرض ہے۔',
      isFard: true,
      reference: 'Sahih al-Bukhari 185, Sahih Muslim 235'
    },
    {
      stepNumber: 8,
      titleEn: 'Washing Both Feet up to & Including the Ankles (3 Times) — [Fard]',
      titleUrdu: 'دونوں پاؤں کو ٹخنوں سمیت ۳ بار دھونا — [فرض]',
      descEn: 'Wash your right foot up to and including the ankle joint three times, running your pinky finger between the toes to ensure no dry spots remain. Repeat for the left foot, paying special attention to the Achilles tendons and heels.',
      descUrdu: 'پہلے دائیں پاؤں کو انگلیوں کے خلال سمیت ٹخنوں تک ۳ بار دھوئیں، پھر بائیں پاؤں کو اسی طرح دھوئیں اور ایڑیوں پر خاص دھیان دیں۔ یہ چوتھا قرآنی فرض ہے۔',
      isFard: true,
      reference: 'Surah Al-Ma\'idah 5:6, Sahih al-Bukhari 165'
    }
  ],
  postWuduDua: {
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Ashhadu alla ilaha illallahu wahdahu la shareeka lah, wa ashhadu anna Muhammadan \'abduhu wa rasooluh. Allahummaj-\'alnee minat-tawwabeena waj-\'alnee minal-mutatahhireen.',
    translationUrdu: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے بہت توبہ کرنے والوں میں شامل فرما اور مجھے خوب پاکیزگی اختیار کرنے والوں میں بنا۔',
    translationEn: 'I bear witness that there is no deity worthy of worship except Allah alone, without partner, and I bear witness that Muhammad is His servant and Messenger. O Allah, make me among those who constantly repent and make me among those who purify themselves.',
    virtueUrdu: 'رسول اللہ ﷺ نے فرمایا: جس شخص نے کامل وضو کیا اور پھر یہ دعا پڑھی، اس کے لیے جنت کے آٹھوں دروازے کھول دیے جاتے ہیں، جس سے چاہے داخل ہو جائے۔',
    virtueEn: 'The Prophet ﷺ said: "Whoever performs Wudu thoroughly and then says this supplication, the eight gates of Paradise will be opened for him to enter by whichever of them he wishes." (Sahih Muslim 234, Jami at-Tirmidhi 55)',
    reference: 'Sahih Muslim 234, Jami at-Tirmidhi 55'
  },
  nullifiers: [
    {
      titleEn: '1. Natural Excretions',
      titleUrdu: '۱. قدرتی تقاضوں کی حاجت (پیشاب، پاخانہ، ریح کا خارج ہونا)',
      descEn: 'Discharge of urine, stool, gas (passing wind), or other bodily fluids from the private areas definitively breaks Wudu.',
      descUrdu: 'پیشاب، پاخانہ یا ریح خارج ہونے سے وضو باطل ہو جاتا ہے۔'
    },
    {
      titleEn: '2. Deep Sleep with Loss of Awareness',
      titleUrdu: '۲. گہری نیند جس میں ہوش و حواس باقی نہ رہیں',
      descEn: 'Deep sleep where one loses consciousness of their bodily state nullifies Wudu. Light drowsiness while sitting firmly does not.',
      descUrdu: 'ایسی گہری نیند جس میں خود پر قابو نہ رہے وضو توڑ دیتی ہے۔ جبکہ ٹیک لگائے بغیر پرسکون بیٹھے اونگھ آنے سے وضو نہیں ٹوٹتا۔'
    },
    {
      titleEn: '3. Loss of Consciousness, Fainting or Intoxication',
      titleUrdu: '۳. بے ہوشی، غشی یا عقل پر پردہ پڑ جانا',
      descEn: 'Any loss of intellect through anesthesia, fainting, unconsciousness, or medication.',
      descUrdu: 'بے ہوشی یا شدید غنودگی جس میں عقل زائل ہو جائے وضو کو توڑ دیتی ہے۔'
    },
    {
      titleEn: '4. Direct Touching of Private Parts (Scholarly Views)',
      titleUrdu: '۴. شرمگاہ کو بلا حائل چھونا (فقہی آراء)',
      descEn: 'Touching the private parts with the palm without a barrier invalidates Wudu according to the majority of scholars (Hadith: Busrah bint Safwan, Tirmidhi 82); the Hanafi school regards it as non-nullifying based on the narration of Talq ibn Ali (Tirmidhi 85). Taking precaution by renewing Wudu is widely recommended.',
      descUrdu: 'بغیر کسی کپڑے کے حائل شرمگاہ کو چھونے پر جمہور فقہاء کے نزدیک وضو ٹوٹ جاتا ہے جبکہ حنفی فقہ میں نہیں ٹوٹتا۔ احتیاطاً نیا وضو کرنا افضل ہے۔'
    }
  ],
  commonMistakes: [
    {
      mistakeEn: 'Wasting water excessively (Israf)',
      mistakeUrdu: 'پانی کا بے دریغ ضیاع اور اسراف کرنا',
      correctionEn: 'The Prophet ﷺ performed Wudu with a single Mudd (roughly 600ml - two cupped hands of water) and forbade wasting water even at a flowing river (Sunan Ibn Majah 425). Keep the tap low.',
      correctionUrdu: 'رسول اللہ ﷺ صرف ایک مد (تقریباً ۶۰۰ ملی لیٹر) پانی سے پورا وضو فرماتے تھے۔ نل کو تیز چلائے رکھنے سے گریز کریں۔',
      reference: 'Sahih al-Bukhari 201, Sunan Ibn Majah 425'
    },
    {
      mistakeEn: 'Leaving dry spots on the heels or between toes',
      mistakeUrdu: 'ایڑیوں یا انگلیوں کے درمیان سوکھا پن رہ جانا',
      correctionEn: 'The Prophet ﷺ saw people with unwashed heels and called out: "Woe to the heels from the Hellfire!" (Sahih al-Bukhari 165). Ensure water thoroughly touches every millimeter.',
      correctionUrdu: 'رسول اللہ ﷺ نے ایڑیوں کو خشک چھوڑنے والوں کو تنبیہ فرمائی: "ایڑیوں کے لیے آگ کا عذاب ہے!" (صحیح بخاری: 165)۔',
      reference: 'Sahih al-Bukhari 165'
    },
    {
      mistakeEn: 'Giving in to obsessive whispers and doubts (Waswas)',
      mistakeUrdu: 'وسوسوں اور بے جا شک کی وجہ سے بار بار وضو دہرانا',
      correctionEn: 'Certainty is not overcome by doubt. Unless you distinctly hear a sound or detect an odor, your Wudu remains intact (Sahih Muslim 362). Do not repeat unnecessarily.',
      correctionUrdu: 'یقین شک سے زائل نہیں ہوتا۔ جب تک آواز نہ سنیں یا بو محسوس نہ کریں وضو باقی ہے۔ وسوسوں کے پیچھے نہ پڑیں (صحیح مسلم: 362)۔',
      reference: 'Sahih Muslim 362'
    }
  ],
  faqs: [
    {
      questionEn: 'Can I wipe over regular socks instead of washing my feet?',
      questionUrdu: 'کیا عام جرابوں پر مسح کیا جا سکتا ہے؟',
      answerEn: 'The Sunnah allows wiping over leather socks (Khuffayn) or thick, opaque, water-resistant socks that stay upright on the leg and cover the ankles. Wiping is valid for 1 day and night for a resident and 3 days and nights for a traveler, provided they were put on while in a complete state of Wudu (Sahih Muslim 276). Thin, transparent cotton socks that allow water to seep through immediately require washing the feet per the majority of jurists.',
      answerUrdu: 'چرمی موزوں (خفین) یا ایسی موٹی جرابوں پر مسح مسنون ہے جو ٹخنوں کو چھپاتی ہوں اور پھسلتی نہ ہوں۔ رہائشی کے لیے ایک دن رات اور مسافر کے لیے ۳ دن رات کی رخصت ہے۔ باریک جالی دار جرابوں پر مسح جائز نہیں بلکہ پاؤں دھونا لازم ہے۔',
      reference: 'Sahih Muslim 276, Sunan Abi Dawud 157'
    },
    {
      questionEn: 'Does bleeding invalidate Wudu?',
      questionUrdu: 'کیا جسم سے خون نکلنے سے وضو ٹوٹ جاتا ہے؟',
      answerEn: 'In the Hanafi school, flowing blood from a wound invalidates Wudu. In the Shafi\'i, Maliki, and Hanbali schools, bleeding itself does not break Wudu unless it emerges from the two private passages, as Sahabah continued praying while wounded. Renewing Wudu after significant bleeding is prudent.',
      answerUrdu: 'حنفی فقہ کے مطابق اگر خون اپنی جگہ سے بہہ نکلے تو وضو ٹوٹ جاتا ہے، جبکہ جمہور فقہاء (شافعی، مالکی، حنبلی) کے نزدیک صرف خون بہنے سے وضو نہیں ٹوٹتا کیونکہ صحابہ کرام زخمی حالت میں بھی نماز پڑھتے رہے۔ دونوں آراء معتبر ہیں۔',
      reference: 'Sahih al-Bukhari (Ta\'liq Bab al-Wudu), Al-Fiqh al-Islami'
    },
    {
      questionEn: 'Is talking during Wudu forbidden?',
      questionUrdu: 'کیا وضو کے دوران باتیں کرنا منع ہے؟',
      answerEn: 'Talking during Wudu is not haram, but silence and mindfulness (focusing on spiritual purification and Dhikr) are recommended to maintain serenity and reverence.',
      answerUrdu: 'وضو کے دوران بات کرنا حرام نہیں ہے، لیکن بلا ضرورت باتوں سے بچنا اور طہارت و اللہ کے دھیان میں رہنا مستحب اور افضل ہے۔',
      reference: 'Fiqh as-Sunnah'
    },
    {
      questionEn: 'What is Tayammum and when can it replace Wudu?',
      questionUrdu: 'تیمم کیا ہے اور وضو کی جگہ کب کیا جاتا ہے؟',
      answerEn: 'Tayammum (dry ablution with clean earth) is a divine concession when water is genuinely unavailable or when using water causes severe medical harm. It consists of striking clean earth with both palms, wiping the face, and wiping the forearms (Surah An-Nisa 4:43).',
      answerUrdu: 'تیمم پاک مٹی سے حاصل کی جانے والی طہارت ہے۔ جب پانی نہ ملے یا بیماری کی وجہ سے پانی کا استعمال جان یا صحت کے لیے نقصان دہ ہو، تو تیمم وضو کا بدل بن جاتا ہے (سورۃ النساء: 43)۔',
      reference: 'Surah An-Nisa 4:43, Sahih al-Bukhari 338'
    }
  ],
  internalLinks: [
    {
      tabId: 'how-to-perform-salah',
      path: '/how-to-perform-salah',
      titleEn: 'How to Perform Salah (Namaz)',
      titleUrdu: 'نماز پڑھنے کا مکمل طریقہ',
      descEn: 'Apply your purity by performing the 5 daily prayers correctly.',
      descUrdu: 'تکبیر سے سلام تک نماز کا مسنون اور مستند طریقہ سیکھیں۔'
    },
    {
      tabId: 'daily-dua',
      path: '/daily-dua',
      titleEn: 'Daily Islamic Duas & Adhkar',
      titleUrdu: 'روزانہ کی مسنون دعائیں',
      descEn: 'Authentic morning, evening, and routine supplications.',
      descUrdu: 'صبح، شام اور روزمرہ کی مستند دعائیں اور اذکار۔'
    },
    {
      tabId: '5-pillars-of-islam',
      path: '/5-pillars-of-islam',
      titleEn: 'The 5 Pillars of Islam',
      titleUrdu: 'اسلام کے پانچ ستون',
      descEn: 'Learn how purification underpins Salah and the core pillars.',
      descUrdu: 'اسلام کے بنیادی ایمانی و عملی ارکان کی مکمل تفہیم۔'
    },
    {
      tabId: 'islamic-questions-answers',
      path: '/islamic-questions-answers',
      titleEn: 'Islamic Q&A Knowledgebase',
      titleUrdu: 'اسلامی سوال و جواب',
      descEn: 'Browse authentic rulings on Taharah, Salah, and everyday worship.',
      descUrdu: 'طہارت، نماز اور روزمرہ احکام پر تفصیلی سوالات و جوابات۔'
    }
  ]
};

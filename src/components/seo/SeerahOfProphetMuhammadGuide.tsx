import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Heart,
  BookOpen,
  Sparkles,
  Compass,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Share2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const SeerahOfProphetMuhammadGuide: React.FC = () => {
  const { contentLang, setActiveTab, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isUrdu
          ? 'سیرت النبی ﷺ: ولادتِ باسعادت سے حجۃ الوداع تک مکمل رہنمائی'
          : 'Seerah of Prophet Muhammad ﷺ: Complete Life, Milestones & Lessons | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const milestones = [
    {
      periodEn: "Early Life & Character Before Prophethood",
      periodUrdu: "اعلانِ نبوت سے قبل کی مبارک زندگی اور بلند کردار",
      yearsEn: "570 – 610 CE (Aam al-Feel to Age 40)",
      yearsUrdu: "۵۷۰ء تا ۶۱۰ء (عام الفیل تا چالیس سالگی)",
      descEn: "Born in Makkah as an orphan from the noble Banu Hashim clan of Quraysh. His father Abdullah passed away before his birth, and his mother Aminah died when he was six. Raised by his grandfather Abdul Muttalib and later his uncle Abu Talib. Known throughout Makkah as Al-Sadiq (The Truthful) and Al-Amin (The Trustworthy). Participated in Hilf al-Fudul (League of the Virtuous to protect the oppressed) and resolved the tribal dispute of placing the Black Stone (Hajar al-Aswad) with wisdom.",
      descUrdu: "عام الفیل (۵۷۰ء) میں مکہ مکرمہ کے معزز قبیلہ قریش کی شاخ بنو ہاشم میں ولادت ہوئی۔ ولادت سے قبل والد ماجد حضرت عبد اللہ اور چھ سال کی عمر میں والدہ محترمہ حضرت آمنہ کا انتقال ہوا۔ پرورش دادا حضرت عبد المطلب اور پھر چچا ابو طالب نے کی۔ جوانی ہی میں صداقت اور امانت داری کی وجہ سے 'الصادق' اور 'الامین' کا لقب پایا۔ مظلوموں کی مدد کے لیے 'حلف الفضول' میں شرکت فرمائی اور کعبہ میں حجرِ اسود کی تنصیب کا جھگڑا کمالِ حکمت سے حل فرمایا۔",
      keyProof: "Sahih al-Bukhari 3815; Ar-Raheeq Al-Makhtum"
    },
    {
      periodEn: "The Beginning of Revelation (Cave Hira)",
      periodUrdu: "نزولِ وحی کا آغاز اور غارِ حرا کا واقعہ",
      yearsEn: "610 CE (Ramadan / Laylat al-Qadr)",
      yearsUrdu: "۶۱۰ء (ماہِ رمضان / لیلۃ القدر)",
      descEn: "At age 40, while meditating in Cave Hira, Angel Jibril (Gabriel) appeared with the first divine command: 'Iqra!' (Read!). The opening five verses of Surah Al-Alaq were revealed. Trembling with awe, he returned to his beloved wife Khadijah bint Khuwaylid (RA), who comforted him with the historic words: 'Allah will never disgrace you, for you maintain family ties, help the destitute, host guests, and stand by those afflicted by hardship.' Scholar Waraqah ibn Nawfal affirmed his divine mission.",
      descUrdu: "چالیس سال کی عمر میں غارِ حرا میں گوشہ نشینی کے دوران جبرائیلِ امین علیہ السلام پہلی وحی لے کر حاضر ہوئے: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ' (سورۃ العلق: ۱-۵)۔ لرزتے ہوئے گھر تشریف لائے تو حضرت خدیجہ رضی اللہ عنہا نے تسلی دیتے ہوئے تاریخی الفاظ فرمائے: 'اللہ آپ کو کبھی رسوا نہیں کرے گا؛ آپ صلہ رحمی کرتے ہیں، بے سہاروں کا بوجھ اٹھاتے ہیں، مہمان نوازی کرتے ہیں اور حق کی مدد کرتے ہیں'۔ ورقہ بن نوفل نے تصدیق کی کہ یہ وہی ناموس (فرشتہ) ہے جو موسیٰ علیہ السلام پر اترا تھا۔",
      keyProof: "Sahih al-Bukhari 3; Sahih Muslim 160"
    },
    {
      periodEn: "Makkan Da'wah & Trials of the Early Believers",
      periodUrdu: "دعوتِ مکہ، علانیہ تبلیغ اور ابتدائی مسلمانوں پر مظالم",
      yearsEn: "610 – 622 CE",
      yearsUrdu: "۶۱۰ء تا ۶۲۲ء",
      descEn: "Started with private preaching to closest companions (Khadijah, Abu Bakr, Ali, Zayd ibn Harithah RA), then public proclamation on Mount Safa upon divine command (Surah Al-Hijr 15:94). Faced fierce persecution, ridicule, and torture from Quraysh chieftains. Companions like Bilal ibn Rabah, Sumayyah, and Yasir bore immense torture for Tawheed. Two migrations to Abyssinia (Habasha) took place under the just Christian King Negus (Najashi). Quraysh enforced a brutal 3-year social and economic boycott in Shi'b Abi Talib.",
      descUrdu: "پہلے تین سال خفیہ دعوت، پھر کوہِ صفا پر علانیہ حق کی پکار (سورۃ الحجر: ۹۴)۔ قریش کے سرداروں نے مخالفت، طعن و تشنیع اور مظالم کی انتہا کر دی۔ حضرت بلال، حضرت سمیہ اور آلِ یاسر رضی اللہ عنہم نے توحید کی خاطر بے پناہ صعوبتیں برداشت کیں۔ مسلمانوں نے عادل بادشاہ نجاشی کے پاس حبشہ کی طرف دو ہجرتیں کیں۔ شعبِ ابی طالب میں تین سال تک بنو ہاشم کا ظالمانہ معاشی و سماجی بائیکاٹ کیا گیا۔",
      keyProof: "Surah Al-Hijr 15:94; Sahih al-Bukhari 4770"
    },
    {
      periodEn: "The Year of Sorrow, Ta'if & Al-Isra wal-Mi'raj",
      periodUrdu: "عام الحزن (غم کا سال)، سفرِ طائف اور واقعہ معراج",
      yearsEn: "619 – 620 CE (10th Year of Prophethood)",
      yearsUrdu: "۶۱۹ء تا ۶۲۰ء (نبوت کا دسواں سال)",
      descEn: "In the 10th year of Prophethood, both his protective uncle Abu Talib and beloved wife Khadijah (RA) passed away. Journeyed to Ta'if to seek support, but their leaders incited street thugs who stoned him until his blessed shoes were filled with blood. Despite immense agony, he refused the Angel of Mountains' offer to crush the town, praying instead: 'Perhaps Allah will bring forth from their descendants those who worship Allah alone.' Soon after, Allah comforted him with the miraculous Night Journey from Makkah to Jerusalem (Al-Isra) and ascension through the heavens (Al-Mi'raj), where the 5 daily prayers were gifted.",
      descUrdu: "نبوت کے دسویں سال مشفق چچا ابو طالب اور غمگسار رفیقہ حیات حضرت خدیجہ رضی اللہ عنہا کا انتقال ہوا (عام الحزن)۔ دعوتِ حق کے لیے طائف کا سفر فرمایا تو اوباشوں نے پتھراؤ کر کے لہولہان کر دیا۔ پہاڑوں کے فرشتے نے بستی کو الٹنے کی اجازت مانگی تو رحمتِ عالم ﷺ نے دعا فرمائی: 'مجھے امید ہے کہ اللہ ان کی پشتوں سے ایسی نسل پیدا کرے گا جو صرف اللہ کی عبادت کرے گی'۔ اسی غم کے بعد اللہ نے معراج کا معجزہ اور پانچ وقت کی نماز کا تحفہ عطا فرمایا۔",
      keyProof: "Surah Al-Isra 17:1; Sahih al-Bukhari 3231"
    },
    {
      periodEn: "The Pledges of 'Aqabah & The Great Hijrah",
      periodUrdu: "بیعتِ عقبہ اور تاریخ ساز ہجرتِ مدینہ",
      yearsEn: "620 – 622 CE",
      yearsUrdu: "۶۲۰ء تا ۶۲۲ء",
      descEn: "Pilgrims from Yathrib (later Madinah) embraced Islam during Hajj seasons, leading to the First and Second Pledges of 'Aqabah. When Quraysh plotted his assassination at Dar al-Nadwah, Allah commanded the Hijrah. Leaving Ali (RA) in his bed to return entrusted belongings to the very people plotting his death, the Prophet ﷺ and Abu Bakr (RA) slipped away into Cave Thawr. Reached Quba and then Madinah, where he was welcomed with joy and established the foundations of the first Islamic commonwealth.",
      descUrdu: "یثرب (مدینہ منورہ) کے وفود نے حج کے موقع پر اسلام قبول کیا اور بیعتِ عقبہ اولیٰ و ثانیہ ہوئی۔ قریش نے دار الندوہ میں قتل کی سازش کی تو اللہ کے حکم سے ہجرت فرمائی۔ امانتیں واپس لوٹانے کے لیے حضرت علی رضی اللہ عنہ کو اپنے بستر پر لٹایا اور حضرت ابوبکر صدیق رضی اللہ عنہ کے ساتھ غارِ ثور تشریف لے گئے۔ قبا پہنچ کر مسجدِ قبا اور پھر مدینہ منورہ میں تشریف آوری ہوئی جہاں اسلامی ریاست کی بنیاد رکھی گئی۔",
      keyProof: "Surah At-Tawbah 9:40; Sahih al-Bukhari 3905"
    },
    {
      periodEn: "Madinan Era: Brotherhood, Statehood & Major Defensive Battles",
      periodUrdu: "مدنی دور: مواخات، میثاقِ مدینہ اور حق و باطل کے معرکے",
      yearsEn: "622 – 628 CE (1 – 6 AH)",
      yearsUrdu: "۶۲۲ء تا ۶۲۸ء (۱ تا ۶ ہجری)",
      descEn: "In Madinah, he established the Prophet's Mosque (Al-Masjid an-Nabawi), bonded the emigrants (Muhajirun) and helpers (Ansar) in unprecedented brotherhood (Muwakhat), and authored the Constitution of Madinah guaranteeing religious freedom and civil mutual defense. Defended the nascent community against existential attacks at Badr (2 AH - 313 Muslims defeating 1,000 Quraysh soldiers), Uhud (3 AH - lessons of obedience), and the Battle of the Trench/Khandaq (5 AH - digging the trench recommended by Salman al-Farsi RA).",
      descUrdu: "مسجدِ نبوی کی تعمیر، مہاجرین اور انصار کے درمیان تاریخی مواخات، اور میثاقِ مدینہ کی تشکیل جس نے تمام شہریوں کے حقوق محفوظ کیے۔ قریش کے جارحانہ حملوں کے خلاف دفاعی غزوات: غزوۂ بدر (۲ ہجری - ۳۱۳ نہتے مجاہدین کی ۱۰۰۰ کے لشکر پر فتح)، غزوۂ احد (۳ ہجری - رسول کے حکم پر ثابت قدمی کا درس)، اور غزوۂ خندق (۵ ہجری - حضرت سلمان فارسی کے مشورے پر خندق کی کھدائی اور احزاب کا محاصرہ)۔",
      keyProof: "Surah Ali 'Imran 3:123; Surah Al-Ahzab 33:9-25"
    },
    {
      periodEn: "The Treaty of Hudaybiyyah & The Universal Call",
      periodUrdu: "صلحِ حدیبیہ اور عالمی سطح پر دعوتِ اسلام کے خطوط",
      yearsEn: "628 CE (6 AH)",
      yearsUrdu: "۶۲۸ء (۶ ہجری)",
      descEn: "Marching peacefully with 1,400 companions for Umrah, they were halted at Hudaybiyyah. The Prophet ﷺ demonstrated peerless diplomatic vision by signing a 10-year non-aggression pact with Quraysh, despite terms initially appearing unfavorable to companions. Allah declared it a manifest victory ('Fathan Mubeena'). The ensuing peace enabled exponential conversion across Arabia. Emissaries carried invitations to Islam to emperors and kings including Heraclius of Byzantium, Chosroes of Persia, and the Negus of Abyssinia.",
      descUrdu: "۱۴۰۰ صحابہ کے ہمراہ عمرہ کے ارادے سے روانہ ہوئے لیکن قریش نے حدیبیہ کے مقام پر روک دیا۔ رسول اللہ ﷺ نے دوراندیشی کے ساتھ صلح فرمائی جسے قرآن نے 'فتح مبین' قرار دیا (سورۃ الفتح: ۱)۔ امن کے ماحول میں اسلام اتنی تیزی سے پھیلا جتنا پچھلے ۱۵ سال میں نہ پھیلا تھا۔ قیصرِ روم (ہرقل)، شاہِ ایران (خسرو پرویز)، شاہِ حبشہ اور شاہِ مصر کو اسلام کی دعوت کے خطوط روانہ فرمائے۔",
      keyProof: "Surah Al-Fath 48:1-29; Sahih al-Bukhari 2731"
    },
    {
      periodEn: "Conquest of Makkah & General Amnesty",
      periodUrdu: "فتحِ مکہ: کعبۃ اللہ کی تطہیر اور عام معافی کا بے مثال اعلان",
      yearsEn: "630 CE (8 AH)",
      yearsUrdu: "۶۳۰ء (۸ ہجری)",
      descEn: "When Quraysh violated the Treaty of Hudaybiyyah by attacking Muslim allies (Banu Khuza'ah), the Prophet ﷺ marched with 10,000 companions, entering Makkah almost bloodlessly with head bowed so low in humility upon his camel that his beard touched the saddle. Destroyed all 360 idols inside and around the Ka'bah while reciting: 'Truth has come and falsehood has vanished' (17:81). Addressing the defeated Quraysh who had tortured him for 20 years, he asked: 'What do you think I will do with you?' They replied: 'A noble brother and son of a noble brother.' He proclaimed: 'Go, for you are free! No blame upon you today' (echoing Prophet Yusuf AS).",
      descUrdu: "قریش کی عہد شکنی کے بعد ۱۰ ہزار قدسیوں کے ساتھ مکہ مکرمہ میں فاتحانہ داخلہ۔ اونٹنی پر سرِ اقدس عاجزی سے اس قدر جھکا تھا کہ داڑھی مبارک کجاوے کو چھو رہی تھی۔ کعبہ کے اندر اور اردگرد موجود ۳۶۰ بتوں کو پاش پاش فرمایا اور تلاوت فرمائی: 'جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ'۔ سامنے وہ دشمن کھڑے تھے جنہوں نے ۲۰ سال تک قتل، بائیکاٹ اور تذلیل کی تھی؛ آپ ﷺ نے فرمایا: 'آج تم پر کوئی گرفت نہیں، جاؤ تم سب آزاد ہو!'۔",
      keyProof: "Surah Al-Isra 17:81; Sunan al-Bayhaqi 18055; Sahih al-Bukhari 4287"
    },
    {
      periodEn: "The Farewell Hajj & Completion of Divine Religion",
      periodUrdu: "حجۃ الوداع، تاریخ ساز خطبہ اور دینِ اسلام کی تکمیل",
      yearsEn: "632 CE (10 AH)",
      yearsUrdu: "۶۳۲ء (۱۰ ہجری)",
      descEn: "Performed his only pilgrimage with over 100,000 companions. On the plains of Arafah, delivered the historic Farewell Sermon (Khutbah Hajjat al-Wada') establishing universal human equality: 'An Arab has no superiority over a non-Arab, nor a non-Arab over an Arab; a white has no superiority over a black, nor a black over a white, except by piety (Taqwa).' Abolished usury/interest and blood vengeance, mandated honoring women's rights, and sanctified human life and property. On that day, Allah revealed: 'Today I have perfected for you your religion...' (Surah Al-Ma'idah 5:3).",
      descUrdu: "ایک لاکھ سے زائد صحابہ کے ساتھ واحد حج ادا فرمایا۔ میدانِ عرفات میں جبلِ رحمت کے پاس وہ ابدی خطبہ دیا جس نے انسانی حقوق کا منشور قائم کر دیا: 'کسی عربی کو عجمی پر اور کسی عجمی کو عربی پر، کسی گورے کو کالے پر اور کسی کالے کو گورے پر کوئی فضیلت نہیں مگر تقویٰ کی بنیاد پر'۔ سود اور جاہلیت کے خونی بدلے ختم کیے، خواتین کے حقوق کی حفاظت کی تاکید فرمائی اور جان و مال کی حرمت قائم کی۔ وحی نازل ہوئی: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ' (المائدۃ: ۳)۔",
      keyProof: "Musnad Ahmad 23489; Sahih Muslim 1218; Surah Al-Ma'idah 5:3"
    },
    {
      periodEn: "Passing Away to the Highest Companion (Al-Rafeeq Al-A'la)",
      periodUrdu: "وفاتِ حسرت آیات اور رفیقِ اعلیٰ کی بارگاہ میں واپسی",
      yearsEn: "632 CE (12 Rabi al-Awwal, 11 AH)",
      yearsUrdu: "۶۳۲ء (۱۲ ربیع الاول، ۱۱ ہجری)",
      descEn: "In his final days in Madinah, he led prayers until illness intensified, appointing Abu Bakr (RA) to lead the congregation. Emphasized two matters repeatedly until his last breath: steadfastness in prayer (As-Salah) and taking care of the vulnerable and workers. Passed away in the lap of his beloved wife Aisha (RA), whispering his last words: 'Allahumma ar-Rafeeq al-A'la' (O Allah, with the Highest Companionship). Buried in the apartment of Aisha (RA), where his sacred resting place remains today inside Al-Masjid an-Nabawi.",
      descUrdu: "مدینہ منورہ میں بیماری کی شدت کے دوران نماز کی امامت کے لیے حضرت ابوبکر صدیق رضی اللہ عنہ کو آگے فرمایا۔ آخری لمحات میں بار بار دو باتوں کی وصیت فرمائی: 'نماز، نماز! اور اپنے ماتحتوں و کمزوروں کا خیال رکھنا'۔ ام المؤمنین حضرت عائشہ رضی اللہ عنہا کی گود میں سرِ مبارک تھا اور زبانِ اقدس پر آخری کلمات جاری ہوئے: 'اللَّهُمَّ الرَّفِيقَ الأَعْلَى' (اے اللہ! سب سے بلند رفاقت)۔ مدینہ منورہ میں سیدہ عائشہ کے حجرہ مبارکہ میں تدفین ہوئی۔",
      keyProof: "Sahih al-Bukhari 4437; Sahih Muslim 2444"
    }
  ];

  const seerahFaqs = [
    {
      qEn: "Why is studying the Seerah essential for every Muslim today?",
      qUrdu: "آج کے دور میں ہر مسلمان کے لیے سیرت النبی ﷺ کا مطالعہ کیوں ضروری ہے؟",
      aEn: "Studying the Seerah provides the living, practical blueprint of how the Quran was implemented in character, law, family life, leadership, and emotional resilience. Allah states in Surah Al-Ahzab (33:21): 'There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day.' It builds deep personal love for the Prophet ﷺ, equips Muslims to face hardship with patience (Sabr), and teaches balanced wisdom in interactions with society.",
      aUrdu: "سیرتِ نبوی قرآنِ مجید کی عملی، جیتی جاگتی تفسیر ہے۔ اللہ تعالیٰ کا فرمان ہے: 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ' (الاحزاب: ۲۱)۔ سیرت کا مطالعہ دل میں رسول اللہ ﷺ کی سچی محبت پیدا کرتا ہے، مشکلات میں صبر و استقامت سکھاتا ہے، اور گھریلو زندگی سے لے کر معاشرتی و عدالتی معاملات تک توازن و دانائی عطا کرتا ہے۔",
      ref: "Surah Al-Ahzab 33:21; Sharh Shamail at-Tirmidhi"
    },
    {
      qEn: "How did the Prophet ﷺ balance mercy with firmness in leadership?",
      qUrdu: "رسول اللہ ﷺ نے قیادت میں رحمت و شفقت اور عدل و اصول پسندی کے درمیان کیسا توازن قائم فرمایا؟",
      aEn: "The Prophet ﷺ never took revenge for personal insult, physical assault, or private slight; he forgave the people of Ta'if, the Quraysh at Makkah, and Abdullah ibn Ubayy. However, when divine rights, universal justice, and the protection of the innocent were compromised, he stood unshakably firm upon the law of Allah, famously stating: 'By Allah, even if Fatimah the daughter of Muhammad were to steal, I would execute the prescribed penalty upon her' (Sahih al-Bukhari 3475).",
      aUrdu: "رسول اللہ ﷺ نے کبھی اپنی ذات پر ہونے والے ظلم یا بدسلوکی کا بدلہ نہیں لیا؛ طائف والوں، فتح مکہ پر قریش اور منافقین تک کو معاف فرمایا۔ لیکن جب اللہ کی حدود اور انصاف کا معاملہ آیا تو اصول پر ذرہ برابر سمجھوتہ نہ فرمایا، جیسا کہ فرمایا: 'اللہ کی قسم! اگر محمد کی بیٹی فاطمہ بھی چوری کرتی تو میں اس کا ہاتھ بھی کاٹ دیتا' (صحیح بخاری: ۳۴۷۵)۔",
      ref: "Sahih al-Bukhari 3475; Sahih Muslim 1688"
    },
    {
      qEn: "What are the most reliable classical sources for studying the Seerah?",
      qUrdu: "سیرتِ نبوی کے مطالعے کے لیے سب سے مستند اور معتبر مآخذ کون سے ہیں؟",
      aEn: "The primary and most rigorous source is the Sahih Hadith literature (Sahih al-Bukhari, Sahih Muslim, and the Sunan works) where events were preserved with verified chains of narration (Isnad). In dedicated Seerah literature, foundational classical works include Sirat Ibn Ishaq (edited by Ibn Hisham), Zad al-Ma'ad by Ibn al-Qayyim, and Al-Bidayah wan-Nihayah by Ibn Kathir. In modern literature, 'Ar-Raheeq Al-Makhtum' (The Sealed Nectar) by Sheikh Safiur Rahman Mubarakpuri is internationally recognized for its rigorous adherence to authenticated reports.",
      aUrdu: "سیرت کا سب سے اولین اور محتاط ترین ماخذ کتبِ احادیث (صحیح بخاری، صحیح مسلم اور سننِ اربعہ) ہیں جن میں واقعات مکمل اسناد کے ساتھ محفوظ ہیں۔ خاص کتبِ سیرت میں سيرة ابن ہشام، زاد المعاد (علامہ ابن قیم) اور البدایہ والنہایہ (حافظ ابن کثیر) معتبر ہیں۔ معاصر کتب میں علامہ صفی الرحمن مبارکپوری کی 'الرحیق المختوم' مستند ترین کتاب مانی جاتی ہے۔",
      ref: "Muqaddimah Sirat Ibn Hisham; Ar-Raheeq Al-Makhtum"
    }
  ];

  const seoTitle = isUrdu
    ? "سیرت النبی ﷺ • ولادت، بعثت، ہجرت، غزوات اور اسوہ حسنہ | IslamIQ"
    : "Seerah of Prophet Muhammad ﷺ: Complete Life, Timeline & Lessons | IslamIQ";

  const seoDescription = isUrdu
    ? "حضرت محمد رسول اللہ ﷺ کی ولادتِ باسعادت، آغازِ وحی، دعوتِ مکہ، ہجرتِ مدینہ، غزوات، فتحِ مکہ اور خطبہ حجۃ الوداع کی جامع اور مستند تاریخ مع حوالہ جات۔"
    : "Comprehensive authentic educational guide on the life (Seerah) of Prophet Muhammad ﷺ. Explore birth, revelation in Cave Hira, Makkan persecution, Hijrah, Madinan statehood, Treaty of Hudaybiyyah, Conquest of Makkah, and Farewell Sermon.";

  const faqsForSchema = seerahFaqs.map(f => ({
    question: isUrdu ? f.qUrdu : f.qEn,
    answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
  }));

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn text-slate-800">
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath="/seerah-of-prophet-muhammad"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'ہوم' : 'Home', url: '/' },
          { name: isUrdu ? 'اسلامی معلومات' : 'Islamic Knowledge', url: '/islamic-general-knowledge' },
          { name: isUrdu ? 'سیرت النبی ﷺ' : 'Seerah of Prophet Muhammad ﷺ', url: '/seerah-of-prophet-muhammad' }
        ]}
        faqs={faqsForSchema}
        article={{
          headline: isUrdu ? 'سیرت النبی ﷺ: ولادت، بعثت، ہجرت اور سیرتِ طیبہ کے اسباق' : 'Seerah of Prophet Muhammad ﷺ: Comprehensive Biography, Historical Milestones and Moral Lessons',
          description: seoDescription,
          datePublished: '2026-10-02',
          dateModified: '2026-10-02',
        }}
      />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-4 border border-emerald-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold border border-emerald-400/30">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{isUrdu ? 'رحمۃ للعالمین ﷺ کی حیاتِ طیبہ' : 'Mercy to the Worlds ﷺ'}</span>
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Share Seerah guide"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white leading-tight">
          {isUrdu ? 'سیرت النبی ﷺ: تاریخ، اسباق اور اسوہ حسنہ' : 'Seerah of Prophet Muhammad ﷺ: Complete Biography & Lessons'}
        </h1>

        <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-3xl">
          {isUrdu
            ? 'سید الانبیاء والمرسلین، خاتم النبیین حضرت محمد مصطفیٰ ﷺ کی ولادتِ باسعادت، اعلانِ نبوت، مکہ مکرمہ کی آزمائشیں، ہجرتِ مدینہ، عسکری و سفارتی حکمتِ عملی، فتحِ مکہ اور خطبہ حجۃ الوداع کا مستند اور تحقیقی مطالعہ۔'
            : 'Explore the verified historical journey of the Final Messenger of Allah, Prophet Muhammad ﷺ. From his trustworthy youth in Makkah and the first revelation in Cave Hira to the historic Hijrah, defensive battles, universal amnesty at the Conquest of Makkah, and the timeless Farewell Pilgrimage.'}
        </p>

        {/* Foundational Quran Ayah Banner */}
        <div className="bg-emerald-900/60 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 mt-4 space-y-2">
          <div className="text-emerald-300 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isUrdu ? 'رحمتِ عالم ﷺ کا قرآنی تعارف' : 'Divine Quranic Testimonial'}</span>
          </div>
          <p className="text-right text-lg sm:text-xl font-arabic text-amber-200 leading-relaxed font-semibold" dir="rtl">
            «وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ»
          </p>
          <p className="text-xs sm:text-sm text-emerald-100">
            {isUrdu
              ? 'اور ہم نے آپ کو تمام جہانوں کے لیے سراپا رحمت بنا کر ہی بھیجا ہے۔'
              : 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.'}
          </p>
          <span className="inline-block text-[11px] text-emerald-300/80 font-mono">
            Surah Al-Anbiya (21:107) • سورۃ الانبیاء: ۱۰۷
          </span>
        </div>
      </header>

      {/* Educational Scope Notice */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'سیرت کا منہج اور مستند ذرائع' : 'Methodology & Authentic Sources'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {isUrdu
            ? 'اسلام آئی کیو کا یہ سیرت گائیڈ صحیح بخاری، صحیح مسلم، مسند احمد، اور محققین سیرت (جیسے ابن ہشام اور علامہ صفی الرحمن مبارکپوری کی الرحیق المختوم) کے مستند اور متفقہ بیانات پر مبنی ہے۔ اس میں تاریخی مبالغہ آرائیوں اور بے سند روایات سے گریز کرتے ہوئے خالص حقائق اور اخلاقی رہنمائی پر توجہ مرکوز کی گئی ہے۔'
            : 'This educational Seerah guide is formulated strictly upon verified narrations from the Six Canonical Hadith collections and classical historical works (Sirat Ibn Hisham, Zad al-Ma\'ad, and Mubarakpuri\'s Ar-Raheeq Al-Makhtum). It distinguishes established historical consensus from folklore, offering students and families a crystal-clear understanding of the Prophet\'s character, diplomatic acumen, and compassionate leadership.'}
        </p>
      </section>

      {/* Chronological Milestones of Seerah */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? 'سیرتِ نبوی کے اہم تاریخی ادوار اور واقعات' : 'Chronological Milestones of the Prophetic Mission'}</span>
        </h2>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    {isUrdu ? m.periodUrdu : m.periodEn}
                  </h3>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full border border-emerald-200/60">
                  {isUrdu ? m.yearsUrdu : m.yearsEn}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isUrdu ? m.descUrdu : m.descEn}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-emerald-800">
                  {isUrdu ? 'مستند حوالہ: ' : 'Primary Source: '} {m.keyProof}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Noble Character & Manners (Shama'il) */}
      <section className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'اخلاقِ نبوی کا نمونہ' : 'Prophetic Character (Akhlaq)'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            {isUrdu ? 'رسول اللہ ﷺ کا حسنِ اخلاق اور روزمرہ معاملات' : 'The Sublime Manners and Compassion of Prophet Muhammad ﷺ'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            {isUrdu
              ? 'ام المؤمنین حضرت عائشہ رضی اللہ عنہا سے پوچھا گیا کہ رسول اللہ ﷺ کا اخلاق کیسا تھا؟ تو آپ نے فرمایا: "آپ کا اخلاق قرآن تھا" (صحیح مسلم: ۷۴۶)۔'
              : 'When Lady Aisha (RA) was asked about the character of the Messenger of Allah ﷺ, she famously replied: "His character was the Quran" (Sahih Muslim 746).'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
            <h4 className="font-bold text-sm text-amber-300">
              {isUrdu ? 'شفقت اور بچوں و اہل خانہ سے حسن سلوک' : 'Gentleness with Family and Children'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {isUrdu
                ? 'کبھی کسی خادم یا بچے کو جھڑکا نہیں۔ حضرت انس رضی اللہ عنہ نے ۱۰ سال خدمت کی اور فرمایا کہ آپ ﷺ نے کبھی اف تک نہ فرمایا۔'
                : 'Anas ibn Malik (RA) served the Prophet ﷺ for 10 years and testified that he never once rebuked him or said "Uff" (Sahih al-Bukhari 6038).'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
            <h4 className="font-bold text-sm text-teal-300">
              {isUrdu ? 'سادگی اور بے مثال عاجزی' : 'Unmatched Humility and Simplicity'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {isUrdu
                ? 'کھجور کے پتوں کی چٹائی پر سوتے تھے جس کے نشانات جسمِ اطہر پر پڑ جاتے تھے۔ اپنے کپڑے اور جوتے خود مرمت فرماتے تھے۔'
                : 'Slept on a simple reed mat that left marks on his side, mended his own clothes and shoes, and sat among companions without distinction.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
            <h4 className="font-bold text-sm text-emerald-300">
              {isUrdu ? 'معافی اور درگزر کی انتہا' : 'Supreme Forgiveness Over Revenge'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {isUrdu
                ? 'اپنے چچا حضرت حمزہ کے قاتل وحشی اور ہندہ تک کو توبہ پر معاف فرمایا۔ فتح مکہ پر جانی دشمنوں کو آزاد کر دیا۔'
                : 'Pardoned Wahshi and Hind upon their repentance despite their slaying of his beloved uncle Hamzah (RA), and forgave all Quraysh chieflings.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
            <h4 className="font-bold text-sm text-rose-300">
              {isUrdu ? 'انصاف اور مساوات کا قیام' : 'Champion of Justice & Human Equality'}
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {isUrdu
                ? 'رنگ، نسل اور زبان کے امتیاز کو ہمیشہ کے لیے مٹا دیا اور حضرت بلال حبشی رضی اللہ عنہ کو مؤذنِ رسول کا بلند مقام عطا کیا۔'
                : 'Dismantled tribal racism and social elitism, elevating companions like Bilal the Abyssinian and Salman the Persian to core leadership.'}
            </p>
          </div>
        </div>
      </section>

      {/* Crawlable Internal Links to Related Islamic Learning */}
      <section className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'متعلقہ اسلامی رہنمائی' : 'Explore Complementary Guides'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            {isUrdu ? 'سیرت النبی ﷺ اور اسلامی تعلیمات کے دیگر ابواب' : 'Deepen Your Knowledge of the Sunnah & Prophetic Traditions'}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {isUrdu
              ? 'حدیث مبارکہ کے اصول، روزانہ کی احادیث، اسلامی اخلاق اور نماز کا طریقہ مطالعہ فرمائیں۔'
              : 'Continue your learning journey with our verified guides on Hadith verification, daily Sunnah supplications, and prayer.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="/hadith-learning-guide"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('hadith-learning-guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-amber-300 font-bold block mb-1">
                {isUrdu ? 'اصولِ حدیث' : 'Hadith Sciences'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'حدیث سیکھنے کی جامع گائیڈ' : 'Hadith Learning Guide'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'علم الاسناد، راویوں کی جانچ اور صحاح ستہ کی تدوین۔' : 'Chain of narrators (Isnad), authenticity grades, and Kutub al-Sittah.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-200 underline mt-3">
              {isUrdu ? 'گائیڈ پڑھیں ←' : 'Read Guide →'}
            </span>
          </a>

          <a
            href="/daily-hadith"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('daily-hadith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-emerald-300 font-bold block mb-1">
                {isUrdu ? 'روزانہ کی حدیث' : 'Daily Sunnah'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'روزانہ کی صحیح حدیث ہب' : 'Daily Hadith Hub'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'صحیح بخاری و مسلم سے روزمرہ زندگی کے عملی اسباق۔' : 'Read authentic daily Sahih hadiths with practical life applications.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-200 underline mt-3">
              {isUrdu ? 'احادیث دیکھیں ←' : 'Explore Hadiths →'}
            </span>
          </a>

          <a
            href="/islamic-general-knowledge"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('islamic-general-knowledge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left flex flex-col justify-between group"
          >
            <div>
              <span className="text-xs text-teal-300 font-bold block mb-1">
                {isUrdu ? 'عمومی معلومات' : 'General Knowledge'}
              </span>
              <h4 className="font-bold text-sm text-white">
                {isUrdu ? 'اسلامی تاریخ و معلومات' : 'Islamic General Knowledge'}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {isUrdu ? 'انبیاء کرام، سیرت طیبہ اور اسلامی تاریخ کے حقائق۔' : 'Quranic statistics, timeline of the Prophets, and early Caliphate.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-teal-200 underline mt-3">
              {isUrdu ? 'معلومات پڑھیں ←' : 'Read Facts →'}
            </span>
          </a>
        </div>
      </section>

      {/* Useful Seerah FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{isUrdu ? 'سیرت النبی ﷺ کے متعلق اہم سوال و جواب' : 'Frequently Asked Questions on the Seerah'}</span>
        </div>

        <div className="space-y-3">
          {seerahFaqs.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 transition-colors"
                >
                  <span>{isUrdu ? faq.qUrdu : faq.qEn}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="p-4 bg-white border-t border-slate-100 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p>{isUrdu ? faq.aUrdu : faq.aEn}</p>
                    <span className="text-[11px] text-emerald-700 font-semibold block pt-1">
                      {isUrdu ? 'مستند حوالہ: ' : 'Reference: '} {faq.ref}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <RelatedIslamicLearning currentTab="seerah-of-prophet-muhammad" />
    </article>
  );
};

export default SeerahOfProphetMuhammadGuide;

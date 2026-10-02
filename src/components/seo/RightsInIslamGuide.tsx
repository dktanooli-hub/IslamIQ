import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Heart,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Share2,
  Home,
  Briefcase,
  Smile,
  HandHeart,
  Scale,
  Sparkles,
  Award
} from 'lucide-react';

export const RightsInIslamGuide: React.FC = () => {
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
          ? 'اسلام میں حقوق العباد: والدین، اولاد، پڑوسی، شریکِ حیات اور مزدوروں کے حقوق'
          : 'Rights in Islam (Huqooq-ul-Ibad): Parents, Spouses, Neighbors & Workers | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const rightsCategories = [
    {
      id: "parents",
      icon: Heart,
      titleEn: "1. Rights of Parents (Birr al-Walidayn)",
      titleUrdu: "۱. والدین کے حقوق (بر الوالدین)",
      arabicHeading: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
      summaryEn: "Honoring parents is placed immediately next to monotheism (Tawheed) in the Quran. It includes gentle speech (no 'Uff'), financial support in their old age, emotional care, humble obedience in righteousness, and sincere prayers for their forgiveness in life and after death.",
      summaryUrdu: "قرآن کریم نے توحید کے فوراً بعد والدین کے ساتھ حسنِ سلوک کا حکم دیا۔ ان کے سامنے 'اف' تک نہ کہنا، بڑھاپے میں مالی و جذباتی سہارا بننا، ان کے آگے عاجزی کے بازو جھکانا اور زندگی کے بعد بھی ان کے لیے بخشش کی دعائیں کرنا اولاد پر لازم ہے۔",
      quranRef: "Surah Al-Isra 17:23–24",
      hadithRef: "Sahih al-Bukhari 5971 (Three times mother, then father); Sahih Muslim 2548",
      practicalExamplesEn: [
        "Never raise your voice, interrupt impatiently, or show annoyance when an elderly parent repeats stories.",
        "Proactively cover medical, nutritional, and living expenses before they have to ask.",
        "Continue honoring their memory after death by maintaining ties with their friends and giving ongoing charity (Sadaqah Jariyah) in their name."
      ],
      practicalExamplesUrdu: [
        "بڑھاپے میں ان کے سامنے کبھی آواز بلند نہ کرنا، بات نہ کاٹنا اور بات دہرانے پر بیزاری کا اظہار نہ کرنا۔",
        "ان کی ادویات، خوراک اور ضروریات کا خرچ ان کے مانگنے سے پہلے خود بخود وقار کے ساتھ ادا کرنا۔",
        "ان کی وفات کے بعد ان کے دوستوں اور رشتہ داروں سے تعلق جوڑے رکھنا اور ان کے نام پر صدقۂ جاریہ کا اہتمام کرنا۔"
      ]
    },
    {
      id: "children",
      icon: Smile,
      titleEn: "2. Rights of Children (Huqooq al-Awlad)",
      titleUrdu: "۲. اولاد اور بچوں کے حقوق",
      arabicHeading: "وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ",
      summaryEn: "Children possess sacred rights from before birth: selection of a pious spouse, a dignified good name, breastfeeding, physical protection, affectionate upbringing, sound Islamic education, moral manners (Adab), and absolute fairness between sons and daughters.",
      summaryUrdu: "بچوں کے حقوق ولادت سے پہلے ہی شروع ہو جاتے ہیں: نیک والدہ/والد کا انتخاب، خوبصورت بامعنی نام، رضاعت، تحفظ، شفقت بھری تربیت، اسلامی تعلیم، اخلاق اور بیٹوں اور بیٹیوں کے درمیان مکمل مساوات اور عدل۔",
      quranRef: "Surah At-Tahrim 66:6; Surah Al-Baqarah 2:233",
      hadithRef: "Sahih al-Bukhari 2587 (Be just among your children); Sunan Abi Dawud 4941",
      practicalExamplesEn: [
        "Distribute gifts, affection, attention, and inheritance strictly equally without favoring sons over daughters.",
        "Protect them from abusive language and toxic environments, teaching them through loving guidance rather than humiliation.",
        "Ensure they learn the Quran, understand Salah, and embody honesty from an early age."
      ],
      practicalExamplesUrdu: [
        "تحائف، محبت، توجہ اور ترکے میں بیٹوں اور بیٹیوں کے درمیان بغیر کسی تعصب کے مکمل عدل و برابری برتنا۔",
        "بچوں کو لعن طعن اور تذلیل سے بچانا، ان کی عزتِ نفس کا خیال رکھنا اور محبت و حکمت سے تربیت کرنا۔",
        "بچپن ہی سے نماز کی عادت، قرآن فہمی، سچائی اور حلال و حرام کی تمیز سکھانا۔"
      ]
    },
    {
      id: "spouses",
      icon: Home,
      titleEn: "3. Mutual Rights of Spouses (Huqooq az-Zawjayn)",
      titleUrdu: "۳. میاں بیوی کے باہمی ازدواجی حقوق",
      arabicHeading: "وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ",
      summaryEn: "Marriage in Islam is built upon mutual tranquility (Sakinah), love (Mawaddah), and mercy (Rahmah). The wife has the right to a dignified dower (Mahr), complete financial maintenance (Nafaqah), physical protection, emotional gentleness, and autonomy over her wealth. The husband has the right to respect, cooperative leadership of the home, preservation of privacy, and mutual loyalty.",
      summaryUrdu: "اسلام میں شادی کا مقصد سکون، محبت اور رحمت ہے۔ بیوی کا حق ہے کہ اسے مہر دیا جائے، نان و نفقہ (رہائش، خوراک، لباس) باعزت فراہم کیا جائے، حسنِ سلوک کیا جائے اور اس کی ذاتی ملکیت میں مداخلت نہ کی جائے۔ شوہر کا حق ہے کہ اس کا احترام کیا جائے، گھر کی نگہبانی کی جائے، خاندانی رازوں کی حفاظت کی جائے اور باہمی وفاداری نبھائی جائے۔",
      quranRef: "Surah An-Nisa 4:19; Surah Ar-Rum 30:21",
      hadithRef: "Jami' at-Tirmidhi 1162 ('The best of you are those who are best to their wives'); Sahih Muslim 1436",
      practicalExamplesEn: [
        "Husbands must consult wives in household matters and assist in home chores following the Sunnah of the Prophet ﷺ.",
        "Wives and husbands must guard confidential bedroom secrets and private marital disagreements from outside exposure.",
        "Never use physical intimidation, emotional abuse, or derogatory slurs in any marital conflict."
      ],
      practicalExamplesUrdu: [
        "شوہر گھر کے معاملات میں اہلیہ سے مشورہ کرے اور نبی کریم ﷺ کی سنت کے مطابق گھریلو کام کاج میں ہاتھ بٹائے۔",
        "میاں بیوی اپنے باہمی راز، کمزوریاں اور نجی جھگڑے خاندان یا سوشل میڈیا پر کبھی افشا نہ کریں۔",
        "کسی بھی نزاع یا غصے کی حالت میں گالی گلوچ، جسمانی تشدد یا طعنہ زنی سے مکمل پرہیز کرنا۔"
      ]
    },
    {
      id: "neighbors",
      icon: Users,
      titleEn: "4. Rights of Neighbors (Huqooq al-Jiran)",
      titleUrdu: "۴. پڑوسیوں کے حقوق (حقوق الجوار)",
      arabicHeading: "مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ",
      summaryEn: "The Prophet ﷺ emphasized neighbors so persistently that he thought Angel Jibril would grant them inheritance rights. Neighbors—whether Muslim or non-Muslim, relative or stranger—have the right to safety from harm, assistance during illness or poverty, respect for privacy, and shared meals.",
      summaryUrdu: "حضور نبی کریم ﷺ نے ارشاد فرمایا کہ جبرائیل علیہ السلام مجھے پڑوسی کے حقوق کی اتنی تاکید کرتے رہے کہ مجھے گمان ہوا کہ وہ اسے وراثت میں حصہ دار بنا دیں گے۔ پڑوسی خواہ مسلمان ہو یا غیر مسلم، رشتہ دار ہو یا اجنبی، اس کی جان، مال اور آبرو کو تکلیف سے محفوظ رکھنا اور اس کی مدد کرنا فرض ہے۔",
      quranRef: "Surah An-Nisa 4:36",
      hadithRef: "Sahih al-Bukhari 6014; Sahih Muslim 47 ('He is not a believer whose neighbor is not safe from his harm')",
      practicalExamplesEn: [
        "Keep noise levels low during late night hours and avoid blocking common driveways or sidewalks.",
        "Share home-cooked food or fruits, especially when knowing a neighboring household faces financial hardship.",
        "Visit them when they are sick and defend their reputation when absent."
      ],
      practicalExamplesUrdu: [
        "رات کے اوقات میں شور شرابا نہ کرنا اور گاڑی یا سامان سے پڑوسی کا راستہ یا گیٹ بند نہ کرنا۔",
        "گھر میں کھانا یا پھل پکائیں تو پڑوسی کا حصہ نکالنا، بالخصوص جب معلوم ہو کہ وہ تنگدستی کا شکار ہیں۔",
        "بیماری میں مزاج پرسی کرنا، خوشی غمی میں شریک ہونا اور ان کی عدم موجودگی میں ان کی آبرو کی حفاظت کرنا۔"
      ]
    },
    {
      id: "relatives",
      icon: HandHeart,
      titleEn: "5. Rights of Relatives & Kinship Ties (Silat ar-Rahim)",
      titleUrdu: "۵. قریبی رشتہ داروں کے حقوق اور صلہ رحمی",
      arabicHeading: "وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ",
      summaryEn: "Maintaining family ties (Silat ar-Rahim) extends lifespan and blesses livelihood, whereas severing kinship ties (Qat' ar-Rahim) is a major sin explicitly condemned in the Quran. The true keeper of ties is not someone who merely reciprocates, but one who restores relations with relatives who have cut them off.",
      summaryUrdu: "صلہ رحمی (خونی رشتوں سے نیکی اور تعلق جوڑنا) رزق میں برکت اور عمر میں اضافے کا سبب ہے، جبکہ قطع رحمی (رشتہ داری توڑنا) کبیرہ گناہ ہے۔ حقیقی صلہ رحمی صرف ادلے کا بدلہ نہیں، بلکہ کمال یہ ہے کہ جو رشتہ دار آپ سے تعلق توڑے آپ اس سے بھی جڑیں۔",
      quranRef: "Surah Muhammad 47:22–23; Surah An-Nisa 4:1",
      hadithRef: "Sahih al-Bukhari 5986; Sahih al-Bukhari 5991 ('The one who maintains ties is not the one who retaliates, but the one who restores severed ties')",
      practicalExamplesEn: [
        "Regularly call grandparents, aunts, uncles, and cousins across city or international borders to check on their well-being.",
        "Prioritize giving Zakat and voluntary charity (Sadaqah) to impoverished relatives first, which carries double the reward.",
        "Overlook past petty family inheritance disputes and take the first step toward reconciliation for the sake of Allah."
      ],
      practicalExamplesUrdu: [
        "دادا دادی، نانا نانی، خالہ، پھوپھی، چچا اور کزنز کو باقاعدگی سے فون کر کے خیریت دریافت کرنا۔",
        "زکوٰۃ اور صدقات میں سب سے پہلے غریب قریبی رشتہ داروں کو ترجیح دینا جس پر دوگنا اجر ملتا ہے۔",
        "خاندانی رنجشوں یا جائیداد کے تنازعات میں پہل کر کے اللہ کی رضا کے لیے معاف کرنا اور صلح کا ہاتھ بڑھانا۔"
      ]
    },
    {
      id: "orphans",
      icon: Award,
      titleEn: "6. Rights of Orphans & the Vulnerable (Huqooq al-Yatama)",
      titleUrdu: "۶. یتیموں اور بے سہاروں کے حقوق",
      arabicHeading: "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ",
      summaryEn: "The Prophet ﷺ guaranteed that anyone who sponsors an orphan will be as close to him in Paradise as the index and middle fingers. The Quran strictly prohibits devouring an orphan's wealth or oppressing them in any manner.",
      summaryUrdu: "رسول اللہ ﷺ نے انگشتِ شہادت اور درمیانی انگلی کو ملا کر فرمایا کہ میں اور یتیم کی کفالت کرنے والا جنت میں اس طرح ساتھ ہوں گے۔ قرآن کریم نے یتیم کا مال ناجائز کھانے کو اپنے پیٹ میں آگ بھرنے سے تعبیر کیا ہے۔",
      quranRef: "Surah An-Nisa 4:10; Surah Ad-Duha 93:9",
      hadithRef: "Sahih al-Bukhari 5304 ('I and the caretaker of an orphan will be together like this in Jannah')",
      practicalExamplesEn: [
        "Sponsor an orphan's education, food, and clothing through verified charitable institutions.",
        "Safeguard an orphan's inheritance intact until they reach mature judgment without skimming personal fees.",
        "Treat them with gentle affection: stroke their head, speak tenderly, and never remind them of their helplessness."
      ],
      practicalExamplesUrdu: [
        "یتیم بچوں کی تعلیم، لباس اور خوراک کی کفالت کے لیے ماہانہ وظیفہ مقرر کرنا۔",
        "یتیم کا ترکہ اور مال سنبھال کر رکھنا اور بالغ ہونے پر پائی پائی ان کے حوالے کرنا، ذاتی مفاد کے لیے استعمال نہ کرنا۔",
        "ان پر شفقت کا ہاتھ رکھنا، پیار سے بات کرنا اور معاشرے میں ان کی عزتِ نفس کو کبھی مجروح نہ ہونے دینا۔"
      ]
    },
    {
      id: "workers",
      icon: Briefcase,
      titleEn: "7. Rights of Workers & Employees (Huqooq al-Ujara)",
      titleUrdu: "۷. مزدوروں اور ملازمین کے حقوق",
      arabicHeading: "أَعْطُوا الأَجِيرَ أَجْرَهُ قَبْلَ أَنْ يَجِفَّ عَرَقُهُ",
      summaryEn: "Islam established worker protections centuries before modern labor laws: immediate payment of wages before their sweat dries, reasonable work hours without exhausting burdens, physical safety, prompt medical aid, and treating domestic helpers as dignified human brothers and sisters.",
      summaryUrdu: "اسلام نے جدید لیبر قوانین سے چودہ سو سال قبل مزدور کے بنیادی حقوق طے کیے: پسینہ خشک ہونے سے پہلے پوری اجرت کی ادائیگی، طاقت سے زیادہ بوجھ نہ ڈالنا، کام کی محفوظ شرائط، اور ملازمین کو اپنے جیسا کھانا کھلانا اور پہنانا۔",
      quranRef: "Surah Al-Qasas 28:26 ('The best one you can hire is the strong and trustworthy')",
      hadithRef: "Sunan Ibn Majah 2443; Sahih al-Bukhari 2545 ('Your servants are your brethren whom Allah has placed under your authority')",
      practicalExamplesEn: [
        "Disburse employees' and domestic staff's full wages strictly on the agreed date without unlawful delay or arbitrary deductions.",
        "If heavy labor is required (e.g. lifting, construction), assist them physically or hire additional support.",
        "Never subject domestic workers to verbal humiliation, long unpaid overtime, or inferior separate leftovers."
      ],
      practicalExamplesUrdu: [
        "گھریلو ملازمین، ڈرائیور اور دفتری عملے کی مکمل تنخواہ طے شدہ تاریخ پر بغیر کسی حیل و حجت کے ادا کرنا۔",
        "اگر کام بہت بھاری ہو تو ان کا ہاتھ بٹانا یا اضافی مددگار فراہم کرنا، طاقت سے زیادہ مشقت نہ لینا۔",
        "گھریلو ملازم کو اپنا بچا کھچا باسی کھانا دینے کے بجائے وہی کھانا کھلانا جو خود کھاتے ہیں اور باوقار برتاؤ کرنا۔"
      ]
    },
    {
      id: "trust",
      icon: Scale,
      titleEn: "8. Honesty, Financial Trust & Public Ethics (Amanah & Sidq)",
      titleUrdu: "۸. دیانت، امانت داری اور لین دین میں سچائی",
      arabicHeading: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا",
      summaryEn: "Amanah (trustworthiness) is a fundamental pillar of faith. Betraying promises, deceiving buyers with hidden defects, hoarding goods to inflate prices, or taking bribes instantly robs a person's earnings of Barakah (divine blessing) and exposes them to divine wrath on the Day of Judgment.",
      summaryUrdu: "امانت داری اور سچائی ایمان کا ستون ہیں۔ وعدہ خلافی کرنا، عیب دار مال چھپا کر بیچنا، ذخیرہ اندوزی کر کے مصنوعی مہنگائی پیدا کرنا یا رشوت لینا انسان کی کمائی سے برکت چھین لیتا ہے اور قیامت کے دن سخت رسوائی کا سبب ہے۔",
      quranRef: "Surah An-Nisa 4:58; Surah Al-Mutaffifin 83:1–3",
      hadithRef: "Jami' at-Tirmidhi 1209 ('The truthful, trustworthy merchant is with the Prophets, the truthful, and the martyrs'); Sahih Muslim 102",
      practicalExamplesEn: [
        "Explicitly disclose any hidden defect or past damage when selling a vehicle, phone, or real estate property.",
        "Deliver work hours and professional deliverables faithfully without claiming pay for unattended working shifts.",
        "Repay borrowed personal debts swiftly at the promised deadline without evading or ghosting creditors."
      ],
      practicalExamplesUrdu: [
        "گاڑی، موبائل یا جائیداد فروخت کرتے وقت اس کا ہر نقص اور خرابی گاہک کے سامنے واضح کرنا۔",
        "دفتر یا کاروبار میں طے شدہ ڈیوٹی کے اوقات مکمل ایمانداری سے پورے کرنا اور غیر حاضری کی غلط حاضری نہ لگانا۔",
        "کسی سے ادھار رقم لی ہو تو مقررہ وقت پر فورا لوٹانا اور فون بند کر کے یا بہانے بنا کر قرض خواہ کو پریشان نہ کرنا۔"
      ]
    }
  ];

  const commonFaqs = [
    {
      qEn: "What is the primary difference between Huqooq-ullah and Huqooq-ul-Ibad?",
      qUrdu: "حقوق اللہ اور حقوق العباد میں کیا بنیادی فرق ہے؟",
      aEn: "Huqooq-ullah (Rights of Allah) refer to divine obligations such as Tawheed, five daily prayers, fasting Ramadan, and paying Zakat. Allah, out of His infinite mercy, may forgive shortcomings in His rights if a servant repents or through His divine grace. In contrast, Huqooq-ul-Ibad (Rights of Fellow Humans) encompass personal honor, wealth, debts, and fair treatment. Scholarly consensus confirms that Allah does not forgive violated rights of people on the Day of Judgment unless the wronged individual explicitly forgives or is fully compensated through transferred good deeds (Hasanat), as narrated in the famous 'Bankrupt Person' (Muflis) Hadith in Sahih Muslim (2581).",
      aUrdu: "حقوق اللہ سے مراد اللہ تعالیٰ کے وہ حقوق ہیں جو بندگی سے متعلق ہیں جیسے توحید، نماز، روزہ، زکوٰۃ وغیرہ۔ اللہ تعالیٰ اگر چاہے تو توبہ یا اپنی رحمتِ خاص سے اپنے حقوق معاف فرما سکتا ہے۔ اس کے برعکس حقوق العباد کا تعلق بندوں کے حقوق (جان، مال، آبرو، قرض اور انصاف) سے ہے۔ شریعت کا متفقہ اصول ہے کہ جب تک مظلوم خود معاف نہ کرے، اللہ تعالیٰ قیامت کے دن ظالم کو معاف نہیں فرمائے گا بلکہ ظالم کی نیکیاں مظلوم کو دے دی جائیں گی جیسا کہ صحیح مسلم (۲۵۸۱) کی حدیثِ مفلس میں صراحت ہے۔",
      ref: "Sahih Muslim 2581 (The Muflis Hadith); Al-Majmu' an-Nawawi"
    },
    {
      qEn: "Can a child disobey parents if they command something sinful or harmful?",
      qUrdu: "اگر والدین کسی گناہ یا شرعی طور پر نقصان دہ بات کا حکم دیں تو کیا ان کی نافرمانی کی جا سکتی ہے؟",
      aEn: "Yes, obedience to parents is conditioned upon righteousness. The Prophet ﷺ stated in Sahih al-Bukhari (7257): 'There is no obedience to any creation in disobedience to the Creator.' If parents order a person to commit Shirk, abandon obligatory prayers, harm others, or break a clear divine command, they must not be obeyed in that specific matter. However, the Quran (Surah Luqman 31:15) mandates that the child must still treat them with utmost gentleness, respectful demeanor, and financial kindness in worldly affairs.",
      aUrdu: "جی ہاں! والدین کی اطاعت صرف شریعت کے دائرے میں فرض ہے۔ صحیح بخاری (۷۲۵۷) میں رسول اللہ ﷺ کا دو ٹوک ارشاد ہے: 'خالق کی نافرمانی میں کسی مخلوق کی اطاعت جائز نہیں'۔ اگر والدین شرک کرنے، نماز چھوڑنے یا کسی پر ظلم کرنے کا حکم دیں تو اس بات میں ان کی بات نہیں مانی جائے گی۔ تاہم قرآن مجید (سورۃ لقمان ۳۱:۱۵) نے تاکید فرمائی کہ اس کے باوجود دنیا کے معاملات میں ان کے ساتھ انتہائی ادب، نرمی اور حسنِ سلوک کا برتاؤ جاری رکھا جائے۔",
      ref: "Surah Luqman 31:15; Sahih al-Bukhari 7257"
    },
    {
      qEn: "Does an employer have the right to withhold an employee's passport or delay salary?",
      qUrdu: "کیا آجر (مالک) کو ملازم کا پاسپورٹ ضبط کرنے یا تنخواہ روکنے کا حق ہے؟",
      aEn: "No. Withholding a worker's personal identity documents, freedom of movement, or delaying their agreed earned wages constitutes grave oppression (Zulm). Prophet Muhammad ﷺ declared in Sahih al-Bukhari (2227) that Allah Almighty said: 'I will be the adversary of three persons on the Day of Resurrection: ... one who employs a worker and receives fully the work done by him, but does not pay him his wages.' Islam guarantees workers full human dignity and financial justice.",
      aUrdu: "ہرگز نہیں۔ کسی بھی مزدور کا پاسپورٹ، شناختی دستاویزات یا نقل و حرکت کی آزادی سلب کرنا اور اس کی جائز تنخواہ میں تاخیر کرنا صریح ظلم ہے۔ صحیح بخاری (۲۲۲۷) میں حدیثِ قدسی ہے کہ اللہ تعالیٰ نے فرمایا: 'قیامت کے دن میں تین آدمیوں کا مدعی (دشمن) ہوں گا... ایک وہ جس نے کسی مزدور کو کام پر رکھا، اس سے پورا کام لیا لیکن اس کی اجرت ادا نہیں کی'۔ اسلام ملازمین کے مکمل وقار اور بروقت معاوضے کا ضامن ہے۔",
      ref: "Sahih al-Bukhari 2227; Sunan Ibn Majah 2443"
    },
    {
      qEn: "How does one seek forgiveness if the wronged person has already passed away or cannot be traced?",
      qUrdu: "اگر کسی شخص کا حق مارا گیا ہو اور وہ وفات پا چکا ہو یا لاپتہ ہو تو اب توبہ کا کیا طریقہ ہے؟",
      aEn: "If the violation involved financial rights (e.g. stolen money or unpaid debt), the repentant person must deliver that exact amount to the deceased person's heirs (estate). If the heirs cannot be found after honest investigation, the money should be given away in charity (Sadaqah) entirely on behalf of the wronged individual. If the violation involved emotional slander, backbiting, or physical injury, the person must perform sincere Tawbah to Allah, make abundant Istighfar (supplication for forgiveness) for the victim by name, and speak well of them in the same gatherings where they were previously defamed.",
      aUrdu: "اگر معاملہ مالی حق (جیسے چوری شدہ رقم یا غصب شدہ قرض) کا ہے تو توبہ کی شرط یہ ہے کہ وہ رقم اس شخص کے شرعی ورثاء کو پہنچائی جائے۔ اگر شدید کوشش کے باوجود ورثاء کا کوئی سراغ نہ ملے تو وہ تمام رقم اس حق دار کی نیت سے صدقہ کر دی جائے۔ اور اگر معاملہ غیبت، تہمت یا دل آزاری کا تھا تو اللہ سے سچی توبہ کے ساتھ ساتھ اس مظلوم کے لیے کثرت سے دعائے مغفرت کی جائے اور جن محفلوں میں اس کی برائی کی تھی وہاں اس کی اچھائی بیان کی جائے۔",
      ref: "Fatawa al-Lajnah ad-Da'imah 24/365; Sharh Sahih Muslim an-Nawawi"
    }
  ];

  return (
    <article className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      <SeoHead
        title={
          isUrdu
            ? 'اسلام میں حقوق العباد: والدین، شریکِ حیات، پڑوسی اور مزدوروں کے حقوق | IslamIQ'
            : 'Rights in Islam (Huqooq-ul-Ibad): Parents, Spouses, Neighbors & Workers | IslamIQ'
        }
        description={
          isUrdu
            ? 'اسلام میں حقوق العباد کی جامع علمی گائیڈ: والدین، اولاد، میاں بیوی، رشتہ داروں، یتیموں، پڑوسیوں اور مزدوروں کے شرعی حقوق مع مستند قرآنی و نبوی دلائل۔'
            : 'Comprehensive educational guide to human rights in Islam (Huqooq-ul-Ibad). Discover rights of parents, children, spouses, neighbors, orphans, and workers with authentic references.'
        }
        canonicalPath="/rights-in-islam"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'صفحہ اول' : 'Home', url: '/' },
          { name: isUrdu ? 'حقوق العباد' : 'Rights in Islam', url: '/rights-in-islam' }
        ]}
        faqs={commonFaqs.map(f => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
        }))}
        article={{
          headline: isUrdu
            ? 'اسلام میں حقوق العباد: معاشرتی انصاف اور باہمی حقوق'
            : 'Rights in Islam: Comprehensive Guide to Huqooq-ul-Ibad',
          description: isUrdu
            ? 'اسلام میں حقوق العباد کی جامع علمی گائیڈ: والدین، اولاد، میاں بیوی، رشتہ داروں، یتیموں، پڑوسیوں اور مزدوروں کے شرعی حقوق مع مستند قرآنی و نبوی دلائل۔'
            : 'Comprehensive educational guide to human rights in Islam (Huqooq-ul-Ibad). Discover rights of parents, children, spouses, neighbors, orphans, and workers with authentic references.'
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('home');
          }}
          className="hover:text-emerald-700 transition-colors"
        >
          {isUrdu ? 'صفحہ اول' : 'Home'}
        </a>
        <span>/</span>
        <a
          href="/islamic-questions-answers"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('islamic-questions-answers');
          }}
          className="hover:text-emerald-700 transition-colors"
        >
          {isUrdu ? 'اسلامی رہنمائی' : 'Islamic Guides'}
        </a>
        <span>/</span>
        <span className="text-emerald-800 font-semibold">
          {isUrdu ? 'حقوق العباد' : 'Rights in Islam'}
        </span>
      </nav>

      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/20 text-teal-200 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'اسلامی اخلاقیات و باہمی حقوق' : 'Islamic Ethics & Social Obligations'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {isUrdu
              ? 'اسلام میں حقوق العباد: معاشرتی انصاف اور باہمی حقوق کی مکمل گائیڈ'
              : 'Rights in Islam (Huqooq-ul-Ibad): Complete Social Justice & Ethical Guide'}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            {isUrdu
              ? 'دینِ اسلام صرف عبادات کا نام نہیں بلکہ بندوں کے باہمی حقوق (حقوق العباد) کی نگہداشت ایمان کی اصل کسوٹی ہے۔ جانیے والدین، شریکِ حیات، اولاد، پڑوسی، رشتہ داروں اور مزدوروں کے حقوق قرآن و سنت کی روشنی میں۔'
              : 'Islam balances devotion to the Creator with uncompromising justice toward humanity. Discover the foundational obligations (Huqooq-ul-Ibad) governing family, neighbors, employees, orphans, and commercial contracts.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium backdrop-blur-sm transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{isUrdu ? 'شیئر کریں' : 'Share Guide'}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-teal-200 bg-teal-950/40 px-3 py-1.5 rounded-xl border border-teal-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isUrdu ? 'مستند قرآنی آیات اور صحیح احادیث پر مبنی' : 'Verified Quran & Sahih Hadith Evidence'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Foundational Principle Box */}
      <section className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-emerald-950 leading-relaxed">
          <p className="font-bold text-emerald-900">
            {isUrdu ? 'بنیادی اسلامی اصول: حقوق اللہ بمقابلہ حقوق العباد' : 'Foundational Principle: Rights of Allah vs. Rights of People:'}
          </p>
          <p>
            {isUrdu
              ? 'شریعتِ مطہرہ کا متفقہ فیصلہ ہے کہ اللہ تعالیٰ اپنی رحمت سے نماز یا روزے کی کوتاہی تو معاف فرما سکتا ہے، لیکن بندے کا حق (مال، عزت، ناحق تکلیف) اس وقت تک معاف نہیں ہوگا جب تک خود صاحبِ حق معاف نہ کرے۔'
              : 'Classical scholars emphasize that while Allah may graciously forgive shortcomings in personal worship, human rights violations will not be forgiven on the Day of Judgment until the wronged person is fully redressed or forgives voluntarily.'}
          </p>
        </div>
      </section>

      {/* Categories of Rights */}
      <div className="space-y-6">
        {rightsCategories.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <section
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-sm space-y-5 hover:border-emerald-400/60 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                      {isUrdu ? 'واجب اسلامی حق' : 'Obligatory Islamic Right'}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isUrdu ? cat.titleUrdu : cat.titleEn}
                  </h2>
                </div>
              </div>

              {/* Quranic Arabic Inscription */}
              <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 text-center">
                <p className="font-serif text-base sm:text-lg text-emerald-950 font-bold leading-loose">
                  {cat.arabicHeading}
                </p>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isUrdu ? cat.summaryUrdu : cat.summaryEn}
              </p>

              {/* Textual Citations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/70 text-emerald-900 space-y-0.5">
                  <span className="font-bold text-[10px] text-emerald-700 uppercase tracking-wide block">
                    {isUrdu ? 'قرآنی حوالہ:' : 'Quranic Reference:'}
                  </span>
                  <span>{cat.quranRef}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-slate-800 space-y-0.5">
                  <span className="font-bold text-[10px] text-slate-500 uppercase tracking-wide block">
                    {isUrdu ? 'حدیث نبوی حوالہ:' : 'Hadith Reference:'}
                  </span>
                  <span>{cat.hadithRef}</span>
                </div>
              </div>

              {/* Practical Everyday Implementation */}
              <div className="space-y-2.5 pt-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isUrdu ? 'روزمرہ زندگی میں عملی اطلاق کی مثالیں:' : 'Everyday Practical Implementation:'}</span>
                </h3>
                <ul className="grid grid-cols-1 gap-2">
                  {(isUrdu ? cat.practicalExamplesUrdu : cat.practicalExamplesEn).map((ex, exIdx) => (
                    <li
                      key={exIdx}
                      className="flex items-start gap-2.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200/50 text-xs text-slate-700 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* Scholarly FAQ Accordion */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isUrdu ? 'حقوق العباد کے متعلق عام پوچھے جانے والے سوالات (FAQ)' : 'Frequently Asked Scholarly Questions on Rights'}
          </h2>
        </div>

        <div className="space-y-3">
          {commonFaqs.map((faq, index) => {
            const isExpanded = expandedFaqIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 bg-slate-50/60 hover:bg-slate-100/80 flex items-center justify-between gap-3 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {isUrdu ? faq.qUrdu : faq.qEn}
                  </span>
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

      {/* Internal Navigation to Related Guides */}
      <section className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-emerald-200">
          <Heart className="w-5 h-5" />
          <span>{isUrdu ? 'مزید متعلقہ اسلامی اخلاقیاتی رہنمائی' : 'Explore Related Ethical & Practical Guides'}</span>
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          {isUrdu
            ? 'بچوں کے آداب، زکوٰۃ کے معاشرتی اثرات اور سیرتِ نبوی کے عملی اسباق جاننے کے لیے درج ذیل گائیڈز ملاحظہ فرمائیں:'
            : 'Continue discovering how Islamic principles transform families, economies, and personal ethics:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <a
            href="/islamic-manners-for-kids"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('islamic-manners-for-kids');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'بچوں کے اسلامی آداب' : 'Islamic Manners for Kids'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'والدین کا احترام، سچائی اور سلام کے آداب' : 'Etiquette, honoring parents & kindness'}
            </span>
          </a>
          <a
            href="/zakat-basics"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('zakat-basics');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'زکوٰۃ کے بنیادی احکام' : 'Zakat Basics & Recipients'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'غریبوں، یتیموں اور محتاجوں کا حق' : 'Nisab, Hawl & 8 Quranic categories'}
            </span>
          </a>
          <a
            href="/seerah-of-prophet-muhammad"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('seerah-of-prophet-muhammad');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'سیرت النبی ﷺ گائیڈ' : 'Seerah of Prophet Muhammad ﷺ'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'رحمۃ للعالمین کے اخلاق اور اسباق' : 'Prophetic compassion, justice & manners'}
            </span>
          </a>
        </div>
      </section>

      <RelatedIslamicLearning currentTab="rights-in-islam" />
    </article>
  );
};

export default RightsInIslamGuide;

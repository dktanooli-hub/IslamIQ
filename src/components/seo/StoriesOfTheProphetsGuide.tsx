import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeoHead } from './SeoHead';
import { RelatedIslamicLearning } from './RelatedIslamicLearning';
import {
  Compass,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  HelpCircle,
  Share2,
  Heart,
  Award,
  Layers,
  Scroll
} from 'lucide-react';

export const StoriesOfTheProphetsGuide: React.FC = () => {
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
          ? 'قصص الانبیاء: قرآن کریم کے مستند تاریخی واقعات اور بصیرت انگیز اسباق'
          : 'Stories of the Prophets: Authentic Quranic Accounts & Lessons | IslamIQ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(isUrdu ? 'لنک کاپی ہو گیا!' : 'Link copied to clipboard!');
    }
  };

  const prophets = [
    {
      nameEn: "1. Prophet Adam (عَلَيْهِ ٱلسَّلَامُ) — The First Human & Prophet",
      nameUrdu: "۱. حضرت آدم علیہ السلام — پہلے انسان اور پہلے پیغمبر",
      titleEn: "Creation, Free Will, Sincere Repentance (Tawbah), and Divine Mercy",
      titleUrdu: "تخلیقِ انسانی، آزمائش، سچی توبہ اور رحمتِ الٰہی",
      arabicHonorific: "أَبُو الْبَشَرِ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً",
          transEn: "And [mention, O Muhammad], when your Lord said to the angels, 'Indeed, I will make upon the earth a successive authority (Khalifah).'",
          transUrdu: "اور یاد کیجیے جب آپ کے رب نے فرشتوں سے فرمایا: 'میں زمین میں ایک خلیفہ (نائب) بنانے والا ہوں۔'",
          ref: "Surah Al-Baqarah 2:30"
        },
        {
          arabic: "قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
          transEn: "They said, 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.'",
          transUrdu: "دونوں نے عرض کی: 'اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو نے ہمیں نہ بخشا اور ہم پر رحم نہ فرمایا تو ہم یقیناً خسارہ پانے والوں میں سے ہو جائیں گے۔'",
          ref: "Surah Al-A'raf 7:23"
        }
      ],
      coreNarrativeEn: "Allah created Adam from clay, breathed into him the soul He created, taught him the names of all things, and commanded the angels to prostrate in honor of Allah's creation. Iblis (Satan) refused out of arrogance and pride ('I am better than him; You created me from fire and created him from clay'). Placed in Paradise with Hawwa (Eve), they were permitted everything except one forbidden tree. Deceived by Satan's false oath, they ate from it. Unlike Satan who persisted in pride and rebellion, Adam and Hawwa immediately took accountability, turned in heartfelt repentance with words Allah inspired them with, and Allah mercifully accepted their repentance.",
      coreNarrativeUrdu: "اللہ تعالیٰ نے آدم علیہ السلام کو مٹی سے پیدا فرمایا، اپنی طرف سے روح پھونکی، تمام اشیاء کے اسماء سکھائے اور فرشتوں کو تعظیم و اکرام کا سجدہ کرنے کا حکم دیا۔ ابلیس نے تکبر کرتے ہوئے حکم ماننے سے انکار کیا ('میں اس سے بہتر ہوں، تو نے مجھے آگ سے اور اسے مٹی سے پیدا کیا')۔ جنت میں حضرت حوا کے ساتھ سکونت فرمائی اور صرف ایک ممنوعہ درخت کے قریب جانے سے روکا گیا۔ ابلیس کے بہکاوے میں آ کر لغزش ہوئی، لیکن ابلیس کی سرکشی کے برعکس حضرت آدم و حوا نے فوری اعترافِ گناہ کیا اور رب کی سکھائی ہوئی کلمات سے سچی توبہ کی، جسے اللہ تعالیٰ نے شرفِ قبولیت بخشا۔",
      keyLessonsEn: [
        "Knowledge and intellectual capacity are divine trusts that honor humanity above creation.",
        "Arrogance (Kibr) and prejudice ('I am better than him') were the root causes of Iblis's downfall.",
        "Human fallibility is met with Allah's infinite forgiveness when accompanied by sincere, humble repentance (Tawbah).",
        "Satan's perennial strategy is deceit through whisperings, false promises, and appealing to ego."
      ],
      keyLessonsUrdu: [
        "علم اور فہم وہ اعزاز ہے جس کی بنا پر انسان کو دیگر مخلوقات پر فضیلت دی گئی۔",
        "تکبر اور نسل پرستی ('میں اس سے بہتر ہوں') ابلیس کے راندہ درگاہ ہونے کا بنیادی سبب بنے۔",
        "غلطی کے بعد ہٹ دھرمی کے بجائے فوری سچی توبہ اور ندامت مؤمن کی اصل پہچان ہے۔",
        "شیطان کا مستقل حربہ جھوٹے دلاسے، وسوسے اور انسان کی انا کو ہوا دینا ہے۔"
      ],
      authenticSources: "Surah Al-Baqarah (2:30–39), Surah Al-A'raf (7:11–25), Sahih al-Bukhari 3326"
    },
    {
      nameEn: "2. Prophet Nuh (عَلَيْهِ ٱلسَّلَامُ) — The Steadfast Caller & The Ark",
      nameUrdu: "۲. حضرت نوح علیہ السلام — صبر و استقامت کے علمبردار اور کشتی کا واقعہ",
      titleEn: "950 Years of Relentless Da'wah, Unwavering Tawheed, and Accountability",
      titleUrdu: "۹۵۰ سالہ دعوتِ توحید، صبرِ جمیل اور اعمال پر مبنی نجات",
      arabicHonorific: "شَيْخُ الْمُرْسَلِينَ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "قَالَ رَبِّ إِنِّي دَعَوْتُ قَوْمِي لَيْلًا وَنَهَارًا ۝ فَلَمْ يَزِدْهُمْ دُعَائِي إِلَّا فِرَارًا",
          transEn: "He said, 'My Lord, indeed I invited my people night and day. But my invitation increased them not except in flight.'",
          transUrdu: "عرض کی: 'اے میرے رب! میں نے اپنی قوم کو رات اور دن دعوت دی۔ مگر میری پکار نے ان کے فرار ہی میں اضافہ کیا۔'",
          ref: "Surah Nuh 71:5–6"
        },
        {
          arabic: "وَاصْنَعِ الْفُلْكَ بِأَعْيُنِنَا وَوَحْيِنَا وَلَا تُخَاطِبْنِي فِي الَّذِينَ ظَلَمُوا ۚ إِنَّهُم مُّغْرَقُونَ",
          transEn: "And construct the ship under Our observation and Our inspiration, and do not address Me concerning those who have wronged; indeed, they are to be drowned.",
          transUrdu: "اور ہماری نگرانی میں اور ہماری وحی کے مطابق کشتی تیار کیجیے، اور ظالموں کے بارے میں مجھ سے کوئی بات نہ کیجیے؛ وہ یقیناً غرق کیے جائیں گے۔'",
          ref: "Surah Hud 11:37"
        }
      ],
      coreNarrativeEn: "When humanity first deviated into idolatry by erecting statues to deceased righteous men (Wadd, Suwa', Yaghuth, Ya'uq, and Nasr), Allah sent Prophet Nuh (AS). For 950 years, Nuh called his people night and day, publicly and privately, pleading with them to seek Allah's forgiveness for rain, wealth, and children. The elite mocked him as a mere mortal followed only by the poor and weak. Commanded by Allah, Nuh built a massive Ark on dry land amidst widespread ridicule. When the deluge gushed from the heavens and earth, only the believers and pairs of animals aboard were saved. Even Nuh's rebellious son refused to board, claiming a mountain would protect him, proving that lineage without righteous faith cannot grant salvation.",
      coreNarrativeUrdu: "جب انسانیت نے پہلی بار بت پرستی کی راہ اپنائی اور نیک بزرگوں (ود، سواع، یغوث، یعوق اور نسر) کے مجسمے بنا کر ان کی عبادت شروع کی، تو اللہ تعالیٰ نے نوح علیہ السلام کو مبعوث فرمایا۔ آپ نے ۹۵۰ سال رات دن، تنہائی اور اجتماع میں لوگوں کو توحید کی دعوت دی اور استغفار کی برکات سنائیں۔ سردارانِ قوم نے تمسخر اڑایا اور غریب ایمان لانے والوں کی تحقیر کی۔ اللہ کے حکم سے نوح علیہ السلام نے خشکی پر دیوہیکل کشتی تیار فرمائی۔ جب زمین و آسمان سے طوفان کا پانی امڈ آیا تو کشتی والے محفوظ رہے، جبکہ نوح علیہ السلام کا نافرمان بیٹا بھی ایمان نہ لانے کی وجہ سے غرق ہوا؛ جس نے ثابت کیا کہ خاندانی نسبت ایمان کے بغیر نجات نہیں دلا سکتی۔",
      keyLessonsEn: [
        "Success in the sight of Allah is measured by unwavering sincerity and effort, not the sheer number of followers.",
        "No family connection—even being the child of a Prophet—can substitute for personal faith and obedience to Allah.",
        "Idolatry historically began through excessive veneration and visual depiction of pious people.",
        "Patience (Sabr) in da'wah requires lifelong dedication in the face of ridicule and cynicism."
      ],
      keyLessonsUrdu: [
        "اللہ کے ہاں کامیابی پیروکاروں کی تعداد میں نہیں بلکہ اخلاص اور مسلسل جدوجہد میں ہے۔",
        "کسی نبی کی اولاد ہونا بھی ذاتی ایمان اور عملِ صالح کے بغیر عذابِ الٰہی سے نہیں بچا سکتا۔",
        "بت پرستی کی تاریخی ابتداء بزرگوں کی حد سے بڑھی ہوئی تعظیم اور ان کی تصاویر و مجسمے بنانے سے ہوئی تھی۔",
        "دعوتِ دین میں تمسخر اور مخالفت کے باوجود طویل مدتی صبر اور عزم ناگزیر ہے۔"
      ],
      authenticSources: "Surah Nuh (71:1–28), Surah Hud (11:25–49), Sahih al-Bukhari 4920"
    },
    {
      nameEn: "3. Prophet Ibrahim (عَلَيْهِ ٱلسَّلَامُ) — The Intimate Friend of Allah (Khalilullah)",
      nameUrdu: "۳. حضرت ابراہیم علیہ السلام — خلیل اللہ اور خلوصِ توحید کے امام",
      titleEn: "Pure Monotheism (Hanifiyyah), Supreme Sacrifices, and the Foundations of the Ka'bah",
      titleUrdu: "توحیدِ خالص، آگ اور قربانی کی عظیم آزمائشیں اور تعمیرِ کعبہ",
      arabicHonorific: "خَلِيلُ الرَّحْمَٰنِ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ",
          transEn: "Indeed, Abraham was a comprehensive leader (Ummah), devoutly obedient to Allah, inclining toward truth, and he was not of those who associate partners with Allah.",
          transUrdu: "بلاشبہ ابراہیم (تن تنہا) ایک پوری امت تھے، اللہ کے لیے یکسو اطاعت گزار، باطل سے کنارہ کش، اور وہ ہرگز مشرکوں میں سے نہ تھے۔",
          ref: "Surah An-Nahl 16:120"
        },
        {
          arabic: "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
          transEn: "And [mention] when Abraham was raising the foundations of the House and Ishmael, [saying], 'Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.'",
          transUrdu: "اور یاد کیجیے جب ابراہیم اور اسماعیل بیت اللہ کی بنیادیں اٹھا رہے تھے (اور دعا کر رہے تھے): 'اے ہمارے رب! ہم سے قبول فرما، بیشک تو ہی خوب سننے والا، خوب جاننے والا ہے۔'",
          ref: "Surah Al-Baqarah 2:127"
        }
      ],
      coreNarrativeEn: "Prophet Ibrahim challenged his idol-worshipping father Azar and society through rational deduction, observing that celestial bodies (stars, moon, sun) set and perish, whereas the Creator endures eternally. When he smashed the temple idols to expose their impotence, tyrant King Nimrod threw him into a blazing furnace, but Allah commanded: 'O fire, be coolness and peace upon Abraham.' Later, commanded to leave his wife Hajar and infant Ismail in the barren valley of Makkah, Hajar's trusting stride gave rise to the miracle of Zamzam. In a divine dream test of supreme surrender, Ibrahim was commanded to sacrifice his son Ismail; both submitted willingly, and Allah ransomed him with a great ram sacrifice. Together, Ibrahim and Ismail rebuilt the Holy Ka'bah as the universal sanctuary of Tawheed.",
      coreNarrativeUrdu: "حضرت ابراہیم علیہ السلام نے اپنے باپ آزر اور بت پرست معاشرے کے سامنے عقلی دلائل رکھے، اور ستاروں، چاند اور سورج کے غروب ہونے سے استدلال کر کے ثابت کیا کہ جو فانی ہے وہ معبود نہیں ہو سکتا۔ جب آپ نے بت خانے کے بت توڑ کر ان کی بے بسی عیاں کی تو نمرود نے آپ کو دہکتی ہوئی آگ میں پھینکا، مگر اللہ نے حکم دیا: 'اے آگ! ابراہیم پر ٹھنڈی اور سلامتی والی بن جا'۔ اس کے بعد اپنی اہلیہ حضرت ہاجرہ اور شیرخوار اسماعیل کو وادیِ مکہ میں چھوڑنے کا حکم ملا جہاں حضرت ہاجرہ کے توکل سے چشمۂ زمزم جاری ہوا۔ خواب میں بیٹے اسماعیل کی قربانی کا حکم ملا تو باپ اور بیٹے دونوں نے سرِ تسلیم خم کر دیا، جس پر اللہ نے جنت سے مینڈھے کا فدیہ بھیجا۔ پھر دونوں باپ بیٹے نے مل کر کعبۃ اللہ کی بنیادیں ازسرِ نو اٹھائیں۔",
      keyLessonsEn: [
        "True faith (Tawheed) demands courage to stand for truth even when one stands completely alone against society.",
        "Unconditional trust in Allah (Tawakkul) combined with action is rewarded with miracles beyond human comprehension.",
        "The rites of Hajj (Tawaf, Sa'i, Mina, Rami, Qurbani) are living re-enactments of the Abrahamic legacy.",
        "After performing the greatest deeds (building the Ka'bah), the righteous humbly beg Allah for acceptance ('Rabbana taqabbal minna')."
      ],
      keyLessonsUrdu: [
        "سچی توحید یہ ہے کہ انسان حق پر قائم رہنے کے لیے پوری دنیا کے مقابلے میں تنہا کھڑا ہونے کا حوصلہ رکھے۔",
        "اللہ تعالیٰ پر کامل بھروسہ (توکل) اور خلوصِ نیت ناممکن حالات میں بھی راہیں کھول دیتا ہے۔",
        "حج کے تمام تر مناسک (طواف، سعی، رمی، قربانی) حضرت ابراہیم اور ان کے اہل خانہ کے اخلاص کی لازوال یادگار ہیں۔",
        "عظیم ترین نیکی (تعمیرِ کعبہ) کے بعد بھی غرور کے بجائے عاجزی سے قبولیت کی التجا کرنا مؤمن کا شعار ہے۔"
      ],
      authenticSources: "Surah Al-An'am (6:74–83), Surah Al-Anbiya (21:51–71), Surah As-Saffat (37:99–111), Sahih al-Bukhari 3364"
    },
    {
      nameEn: "4. Prophet Yusuf (عَلَيْهِ ٱلسَّلَامُ) — The Paragon of Moral Purity & Patience",
      nameUrdu: "۴. حضرت یوسف علیہ السلام — حسنِ سیرت، عفت اور صبرِ جمیل کی مثال",
      titleEn: "Overcoming Betrayal, Resisting Seduction, Prison Dignity, and Forgiving Enemies",
      titleUrdu: "بھائیوں کی حسد، آزمائشِ عفت، قید خانے کا صبر اور دشمنوں کے لیے عام معافی",
      arabicHonorific: "الصِّدِّيقُ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "قَالَ مَعَاذَ اللَّهِ ۖ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ ۖ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ",
          transEn: "He said, '[I seek] refuge in Allah! Indeed, my master has made good my residence. Indeed, the wrongdoers will not succeed.'",
          transUrdu: "فرمایا: 'اللہ کی پناہ! بلاشبہ وہ میرا رب (اور پرورش کرنے والا) ہے جس نے میرا ٹھکانہ اچھا بنایا، بیشک ظالم کبھی فلاح نہیں پاتے۔'",
          ref: "Surah Yusuf 12:23"
        },
        {
          arabic: "قَالَ لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ الرَّاحِمِينَ",
          transEn: "He said, 'No blame will there be upon you today. Allah will forgive you; and He is the most merciful of the merciful.'",
          transUrdu: "فرمایا: 'آج تم پر کوئی ملامت نہیں، اللہ تمہیں معاف فرمائے، اور وہ سب رحم کرنے والوں سے بڑھ کر رحم فرمانے والا ہے۔'",
          ref: "Surah Yusuf 12:92"
        }
      ],
      coreNarrativeEn: "Described in the Quran as 'the most beautiful of stories' (Ahsan al-Qasas), Prophet Yusuf experienced a sequence of deep trials. Envied by his ten half-brothers, he was cast into a dark well, sold into slavery in Egypt, and raised in the house of the Aziz. When the Aziz's wife attempted to seduce him behind locked doors, Yusuf fled toward the door, preferring honor before God. Falsely accused, he chose prison over disobedience: 'My Lord, prison is more desirable to me than that to which they invite me.' In prison, he actively preached Tawheed and interpreted dreams. Eventually exonerated when the King had a dream of seven lean cows eating seven fat cows, Yusuf proposed an agricultural preservation plan that saved millions from starvation. When his remorseful brothers came seeking grain, Yusuf forgave them completely without vengeance.",
      coreNarrativeUrdu: "قرآن کریم نے سورۃ یوسف کو 'احسن القصص' (سب سے خوبصورت قصہ) قرار دیا۔ یوسف علیہ السلام کو بھائیوں کے حسد کی وجہ سے اندھے کنویں میں پھینکا گیا، قافلے نے بطور غلام بیچا اور مصر کے عزیز کے محل میں پرورش پائی۔ عزیز کی بیوی نے بدکاری پر اکسایا تو یوسف علیہ السلام نے تقویٰ کی بے مثال مثال قائم کی اور فرمایا: 'معاذ اللہ!'۔ بے گناہ ہونے کے باوجود جیل کی صعوبتیں گوارا کیں اور فرمایا: 'اے میرے رب! مجھے گناہ کے مقابلے میں قید زیادہ پسند ہے'۔ قید خانے میں بھی توحید کی تبلیغ جاری رکھی۔ بادشاہ کے خواب کی تعبیر دے کر مصر کو قحط سالی سے بچانے کی اقتصادی منصوبہ بندی کی۔ جب وہی ظالم بھائی محتاج بن کر سامنے آئے تو آپ نے بدلہ لینے کے بجائے فرمایا: 'آج تم پر کوئی ملامت نہیں'۔",
      keyLessonsEn: [
        "Jealousy destroys families and corrupts the heart; parents must treat children equitably.",
        "Guarding one's chastity (Iffah) and fleeing tempting environments leads to divine protection and ultimate elevation.",
        "A believer utilizes professional competence, integrity, and strategic planning to serve society in times of crisis.",
        "Forgiveness when one has full power to take revenge is the hallmark of prophetic character."
      ],
      keyLessonsUrdu: [
        "حسد خاندانی رشتوں کو تار تار کر دیتا ہے؛ والدین کو بچوں کے درمیان مساوات اور عدل کا خاص خیال رکھنا چاہیے۔",
        "گناہ کے مواقع سے دور بھاگنا اور پاکدامنی پر ڈٹ جانا انسان کو دنیا اور آخرت میں بلندی عطا کرتا ہے۔",
        "اہلیت، دیانت اور مستقبل کی منصوبہ بندی وہ خوبیاں ہیں جن کے ذریعے انسان قوم کی بے مثال خدمت کر سکتا ہے۔",
        "بدلہ لینے کی پوری قدرت کے باوجود معاف کر دینا سیرتِ انبیاء کا سب سے شاندار وصف ہے۔"
      ],
      authenticSources: "Surah Yusuf (12:1–111), Sahih al-Bukhari 3374"
    },
    {
      nameEn: "5. Prophet Musa (عَلَيْهِ ٱلسَّلَامُ) — The One Addressed by Allah (Kalimullah)",
      nameUrdu: "۵. حضرت موسیٰ علیہ السلام — کلیم اللہ، فرعون کے خلاف حق کا علمبردار",
      titleEn: "Courage Against Tyranny, The Parting of the Sea, and the Torah at Mount Tur",
      titleUrdu: "فرعون کے استبداد کا مقابلہ، معجزۂ عصا، سمندر کا پھٹنا اور کوہِ طور پر ہم کلامی",
      arabicHonorific: "كَلِيمُ اللَّهِ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "قَالَ كَلَّا ۖ إِنَّ مَعِيَ رَبِّي سَيَهْدِينِ",
          transEn: "[Moses] said, 'No! Indeed, with me is my Lord; He will guide me.'",
          transUrdu: "فرمایا: 'ہرگز نہیں! بیشک میرے ساتھ میرا رب ہے، وہ مجھے ضرور راستہ دکھائے گا۔'",
          ref: "Surah Ash-Shu'ara 26:62"
        },
        {
          arabic: "اذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُ طَغَىٰ ۝ فَقُولَا لَهُ قَوْلًا لَّيِّنًا لَّعَلَّهُ يَتَذَكَّرُ أَوْ يَخْشَىٰ",
          transEn: "Go, both of you, to Pharaoh. Indeed, he has transgressed. And speak to him with gentle speech that perhaps he may be reminded or fear [Allah].",
          transUrdu: "تم دونوں فرعون کے پاس جاؤ، بلاشبہ وہ سرکش ہو چکا ہے۔ پھر اس سے نرمی سے بات کرو، شاید وہ نصیحت قبول کرے یا ڈر جائے۔",
          ref: "Surah Ta-Ha 20:43–44"
        }
      ],
      coreNarrativeEn: "Prophet Musa is the most frequently mentioned Prophet in the Quran (over 130 times). Born when Pharaoh slaughtered Hebrew male infants, Musa's mother placed him in a basket on the River Nile in complete trust in Allah; Pharaoh's palace raised him. After accidentally killing an oppressor in defense of a fellow Israelite, Musa fled to Madyan, married the daughter of a righteous man, and served ten years. At Mount Tur, Allah spoke directly to Musa and granted him miracles (the staff turning into a serpent, his hand shining white). Along with his brother Harun (Aaron), he stood fearlessly before Pharaoh, demanding freedom for Bani Israel. When Pharaoh pursued them to the Red Sea, trapped between the army and water, Musa uttered his famous declaration of faith: 'Kalla! Inna ma'iya Rabbi sayahdeen.' Allah split the sea, drowned Pharaoh, and later revealed the Ten Commandments/Torah at Mount Sinai.",
      coreNarrativeUrdu: "قرآن کریم میں سب سے زیادہ (۱۳۰ سے زائد مرتبہ) موسیٰ علیہ السلام کا تذکرہ آیا ہے۔ جب فرعون بنی اسرائیل کے بیٹوں کو قتل کروا رہا تھا، تو والدہ نے الہامِ الٰہی سے بچے کو صندوق میں رکھ کر دریائے نیل کی موجوں کے حوالے کر دیا؛ فرعون کے محل ہی میں پرورش پائی۔ مصر سے ہجرت کر کے مدین پہنچے، دس سال بکریاں چرائیں اور نکاح فرمایا۔ واپسی پر کوہِ طور پر اللہ نے شرفِ تکلم بخشا اور عصا و یدِ بیضا کے معجزات عطا کیے۔ بھائی ہارون علیہ السلام کے ساتھ فرعون کے دربار میں جا کر کلمۂ حق کہا اور بنی اسرائیل کی رہائی کا مطالبہ کیا۔ بحیرہ قلزم پر جب آگے سمندر اور پیچھے فرعونی لشکر تھا تو ساتھیوں کے خوف کے وقت پکار اٹھے: 'ہرگز نہیں! بیشک میرا رب میرے ساتھ ہے وہ راہ دکھائے گا'۔ سمندر دو لخت ہوا، فرعون غرق ہوا اور کوہِ طور پر تورات عطا ہوئی۔",
      keyLessonsEn: [
        "Even when addressing brutal despots, the initial prophetic method is 'gentle speech' (Qawlan Layyinan) to leave no excuse.",
        "Faith manifests highest when worldly escape seems physically impossible (facing the sea with enemies behind).",
        "Allah's plans prevail silently: Pharaoh raised the child destined to overthrow his tyrannical empire inside his own palace.",
        "Standing up against social oppression and defending the marginalized is integral to religious calling."
      ],
      keyLessonsUrdu: [
        "انتہائی ظالم اور سرکش حاکم کے سامنے بھی دعوت کا آغاز 'قولِ لین' (نرم گفتگو) سے کرنا نبوی طریقہ ہے۔",
        "حقیقی ایمان کا کمال تب ظاہر ہوتا ہے جب بظاہر بچنے کے تمام اسباب ختم ہو جائیں (آگے سمندر، پیچھے دشمن لشکر)۔",
        "اللہ کی تدبیر بے مثل ہے؛ جس بچے کے خوف سے فرعون نے ہزاروں بچے قتل کروائے، اسی کو اپنے ہی محل میں کھلایا پلایا۔",
        "مظلوموں کی داد رسی اور استبداد کے خلاف سینہ سپر ہونا نبوت کے بنیادی فرائض میں شامل ہے۔"
      ],
      authenticSources: "Surah Al-Qasas (28:1–44), Surah Ta-Ha (20:9–98), Surah Ash-Shu'ara (26:10–68), Sahih Muslim 2375"
    },
    {
      nameEn: "6. Prophet Isa (عَلَيْهِ ٱلسَّلَامُ) — The Word & Spirit from Allah, The Messiah",
      nameUrdu: "۶. حضرت عیسیٰ علیہ السلام — مسیح بن مریم، کلمۃ اللہ اور روح منہ",
      titleEn: "Miraculous Birth from Maryam, Healing by Allah's Leave, Ascension, and Return",
      titleUrdu: "حضرت مریم کی عفت، بغیر باپ کے معجزانہ ولادت، اعجازِ مسیحا اور آسمان پر اٹھایا جانا",
      arabicHonorific: "الْمَسِيحُ عَلَيْهِ السَّلَامُ",
      keyQuranVerses: [
        {
          arabic: "إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ ۖ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ",
          transEn: "Indeed, the example of Jesus to Allah is like that of Adam. He created him from dust; then He said to him, 'Be,' and he was.",
          transUrdu: "بلاشبہ اللہ کے نزدیک عیسیٰ کی مثال آدم جیسی ہے، جسے مٹی سے بنایا پھر فرمایا 'ہو جا' تو وہ ہو گیا۔",
          ref: "Surah Ali 'Imran 3:59"
        },
        {
          arabic: "وَقَوْلِهِمْ إِنَّا قَتَلْنَا الْمَسِيحَ عِيسَى ابْنَ مَرْيَمَ رَسُولَ اللَّهِ وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَٰكِن شُبِّهَ لَهُمْ",
          transEn: "And [for] their saying, 'Indeed, we have killed the Messiah, Jesus, the son of Mary, the messenger of Allah.' And they did not kill him, nor did they crucify him; but [another] was made to resemble him to them.",
          transUrdu: "اور ان کے اس قول پر کہ: 'ہم نے اللہ کے رسول مسیح عیسیٰ بن مریم کو قتل کر دیا'، حالانکہ نہ انہوں نے اسے قتل کیا اور نہ سولی دی بلکہ معاملہ ان کے لیے مشتبہ کر دیا گیا۔",
          ref: "Surah An-Nisa 4:157"
        }
      ],
      coreNarrativeEn: "Prophet Isa was born miraculously without a human father to the purest woman of all creation, Maryam (Mary). Speaking as an infant in the cradle, he declared: 'Indeed, I am the servant of Allah. He has given me the Scripture and made me a Prophet.' Endowed with the Injeel (Gospel), Isa performed extraordinary miracles solely by Allah's permission (Bi-idhnillah): fashioning birds from clay, curing the congenital blind and lepers, and resurrecting the dead. Despite reviving the true spiritual intent of the Torah and calling exclusively to the worship of the One Creator, hostile leaders plotted his crucifixion. The Quran decisively clarifies that Isa was neither killed nor crucified; rather, Allah raised him bodily to the heavens. Authentic Hadiths in Sahih al-Bukhari and Sahih Muslim report that Prophet Isa will descend before the Day of Judgment to defeat the Dajjal, establish justice, and pray according to the Shari'ah of Prophet Muhammad ﷺ.",
      coreNarrativeUrdu: "حضرت عیسیٰ علیہ السلام کی ولادتِ باسعادت تمام جہانوں کی پاکیزہ ترین خاتون حضرت مریم علیہا السلام کی گود میں بغیر باپ کے معجزانہ طور پر ہوئی۔ گہوارے میں شیرخوارگی کی حالت میں کلام فرمایا: 'میں اللہ کا بندہ ہوں، اس نے مجھے کتاب عطا فرمائی اور نبی بنایا'۔ انجیلِ مقدس دی گئی اور اللہ کے اذن سے مٹی کا پرندہ بنانا، مادر زاد اندھوں اور کوڑھیوں کو شفا دینا اور مردوں کو زندہ کرنے جیسے محیر العقول معجزات دکھائے۔ توحید کی خالص دعوت دی اور فرمایا: 'اللہ ہی میرا اور تمہارا رب ہے پس اسی کی بندگی کرو'۔ دشمنوں نے قتل کی سازش کی لیکن قرآن نے دو ٹوک اعلان کیا کہ نہ انہیں قتل کیا گیا اور نہ سولی دی گئی بلکہ اللہ نے انہیں اپنی طرف زندہ اٹھا لیا۔ صحیحین کی متواتر احادیث کے مطابق قربِ قیامت میں آپ کا نزول ہوگا، دجال کا خاتمہ کریں گے اور عدل و انصاف قائم فرمائیں گے۔",
      keyLessonsEn: [
        "Allah creates however He wills: Adam with neither father nor mother, Hawwa from a male without female, Isa from a female without male, and all others from both.",
        "Isa was a noble human messenger and servant of Allah, not divine and not the literal son of God.",
        "Miracles are performed solely 'by Allah's leave' (Bi-idhnillah) to substantiate prophetic truth, never independently.",
        "Asceticism, empathy for the poor, humility, and inner purity are foundational prophetic virtues."
      ],
      keyLessonsUrdu: [
        "اللہ تعالیٰ کی قدرتِ کاملہ کے مظاہر: آدم کو بغیر ماں باپ کے، حوا کو بغیر ماں کے، عیسیٰ کو بغیر باپ کے اور باقی نسلِ انسانی کو ماں باپ کے ملاپ سے پیدا فرمایا۔",
        "حضرت عیسیٰ علیہ السلام اللہ کے برگزیدہ رسول اور بندے ہیں، نہ وہ خدا ہیں اور نہ خدا کے بیٹے؛ الوہیت صرف اللہ کے لیے ہے۔",
        "تمام معجزات خالصتاً 'اللہ کے اذن' سے رونما ہوتے ہیں تاکہ نبوت کی سچائی ثابت ہو، کوئی انسان خود مختار نہیں۔",
        "زہد، مساکین پر شفقت، نفسانی پاکیزگی اور باطنی تقویٰ مسیح علیہ السلام کی مبارک تعلیمات کا نچوڑ ہیں۔"
      ],
      authenticSources: "Surah Maryam (19:16–36), Surah Ali 'Imran (3:45–59), Surah An-Nisa (4:157–159), Sahih al-Bukhari 3448"
    }
  ];

  const commonFaqs = [
    {
      qEn: "How many Prophets were sent by Allah in total?",
      qUrdu: "اللہ تعالیٰ نے کل کتنے انبیاء و رسل مبعوث فرمائے؟",
      aEn: "The Quran mentions 25 Prophets by name. Regarding the total number, a widely narrated Hadith in Musnad Ahmad (22288) and Sahih Ibn Hibban records that Prophet Muhammad ﷺ stated there were 124,000 Prophets, among whom 313 (or 315) were Messengers (Rusul). Classical scholars note that while this number is popular in Islamic tradition, Muslims believe firmly in all Prophets sent by Allah, both those whose names are known and those whose names are unmentioned (Surah Ghafir 40:78).",
      aUrdu: "قرآن مجید میں ۲۵ جلیل القدر انبیاء کے نام صراحتاً مذکور ہیں۔ کل تعداد کے بارے میں مسند احمد (۲۲۲۸۸) اور صحیح ابن حبان میں ایک روایت ہے کہ حضور نبی کریم ﷺ نے ارشاد فرمایا کہ ایک لاکھ چوبیس ہزار انبیاء مبعوث ہوئے جن میں سے ۳۱۳ (یا ۳۱۵) رسول تھے۔ اہلِ علم فرماتے ہیں کہ ہر مسلمان پر فرض ہے کہ وہ ان تمام انبیاء پر اجمالی ایمان رکھے جن کے نام قرآن میں آئے یا نہیں آئے (سورۃ غافر ۴۰:۷۸)۔",
      ref: "Surah Ghafir 40:78; Musnad Ahmad 22288"
    },
    {
      qEn: "What is the difference between a Prophet (Nabi) and a Messenger (Rasul)?",
      qUrdu: "نبی اور رسول کے درمیان کیا فرق ہے؟",
      aEn: "According to mainstream Islamic scholarship (including Ibn Taymiyyah, Ibn Kathir, and modern scholars): A Messenger (Rasul) is sent with a new legal code (Shari'ah) or a newly revealed Scripture to a people who predominantly disbelieve or reject the truth. A Prophet (Nabi) is commissioned to preach, revive, and confirm the previous Shari'ah of an earlier Messenger. Thus, every Rasul is a Nabi, but not every Nabi is a Rasul. The highest ranking among them are the five 'Ulul Azm' (Possessors of Great Resolve): Nuh, Ibrahim, Musa, Isa, and Muhammad ﷺ.",
      aUrdu: "جمہور علمائے اسلام کی تحقیق کے مطابق: 'رسول' وہ ہوتا ہے جسے نئی شریعت یا نئی کتاب دی جائے اور وہ عمومی طور پر ایسی قوم کی طرف بھیجا جائے جو منکر یا سرکش ہو۔ 'نبی' وہ برگزیدہ ہستی ہے جسے اللہ وحی عطا فرمائے اور وہ پہلے سے موجود شریعت کی تجدید و نفاذ کا کام کرے (جیسے بنی اسرائیل کے انبیاء تورات کے احکام نافذ کرتے تھے)۔ پس ہر رسول نبی ہوتا ہے، لیکن ہر نبی رسول نہیں ہوتا۔ ان میں سب سے اعلیٰ مقام 'اولوا العزم' انبیاء (نوح، ابراہیم، موسیٰ، عیسیٰ اور محمد ﷺ) کا ہے۔",
      ref: "Surah Al-Ahzab 33:7; Majmu' al-Fatawa 10/290"
    },
    {
      qEn: "Are popular folklore stories (Isra'iliyyat) accepted as factual Islamic history?",
      qUrdu: "کیا عوام میں مشہور اسرائیلی روایات اور داستانیں مستند سمجھی جاتی ہیں؟",
      aEn: "No. Islamic scholarship follows a strict rule laid down by Prophet Muhammad ﷺ in Sahih al-Bukhari (4485): 'Do not believe the people of the Scripture and do not disbelieve them; say: We believe in Allah and what was revealed to us.' Stories not explicitly attested in the Quran or authentic Sahih Hadith cannot be taught as dogma or factual creed. Exaggerated folklore (such as mythic physical descriptions of giants or distorted biblical fables) are strictly discarded by authentic scholars.",
      aUrdu: "ہرگز نہیں۔ سیرت اور قصص الانبیاء میں اسلامی اصول بالکل واضح ہے جیسا کہ صحیح بخاری (۴۴۸۵) میں رسول اللہ ﷺ نے فرمایا: 'اہلِ کتاب کی روایات کی نہ بلا تحقیق تصدیق کرو اور نہ بلاوجہ تکذیب؛ کہو کہ ہم اللہ اور جو کچھ نازل ہوا اس پر ایمان لائے'۔ جو واقعہ قرآن اور صحیح حدیث سے ثابت نہ ہو اسے اسلامی عقیدہ یا یقینی تاریخی حقیقت نہیں بنایا جا سکتا۔ مافوق الفطرت لوک کہانیاں اور بے بنیاد اسرائیلی قصے دین کا حصہ نہیں۔",
      ref: "Sahih al-Bukhari 4485; Muqaddimah Ibn Kathir"
    },
    {
      qEn: "Did all Prophets preach the exact same core message?",
      qUrdu: "کیا تمام انبیاء علیہم السلام کا بنیادی پیغام ایک ہی تھا؟",
      aEn: "Yes. Every single Prophet from Adam to Muhammad ﷺ preached the identical core creed: Tawheed (the absolute Oneness of Allah and abandonment of polytheism), accountability in the Akhirah (Hereafter), and moral righteousness. Allah states in Surah Al-Anbiya (21:25): 'And We sent not before you any messenger except that We revealed to him that, There is no deity except Me, so worship Me.' Only the specific legal rulings (such as the number of prayers or dietary regulations) varied across different eras to suit human societal progression.",
      aUrdu: "جی ہاں! حضرت آدم علیہ السلام سے لے کر حضرت محمد ﷺ تک تمام انبیاء کا بنیادی عقیدہ بالکل ایک تھا: یعنی 'توحید' (صرف ایک اللہ کی عبادت اور شرک کی نفی)، آخرت کی جوابدہی اور اعلیٰ اخلاق۔ قرآن میں ارشاد ہے: 'اور ہم نے آپ سے پہلے کوئی رسول نہیں بھیجا مگر اس کی طرف یہی وحی کی کہ میرے سوا کوئی معبود نہیں، پس میری ہی عبادت کرو' (الانبییاء ۲۱:۲۵)۔ صرف شریعت کے جزوی فروعی احکام (جیسے نماز کے اوقات یا حلال و حرام کی بعض جزئیات) مختلف ادوار میں انسانی مصلحت کے تحت تبدیل ہوئے۔",
      ref: "Surah Al-Anbiya 21:25; Sahih al-Bukhari 3443"
    }
  ];

  return (
    <article className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      <SeoHead
        title={
          isUrdu
            ? 'قصص الانبیاء: قرآن مجید کے مستند واقعات اور اسباق | IslamIQ'
            : 'Stories of the Prophets: Authentic Quranic Accounts & Lessons | IslamIQ'
        }
        description={
          isUrdu
            ? 'حضرت آدم، نوح، ابراہیم، یوسف، موسیٰ اور عیسیٰ علیہم السلام کے مستند قرآنی واقعات، تاریخی حقائق اور عملی اسباق مع مستند دلائل۔'
            : 'Explore authentic Quranic stories of Prophets Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (AS). Verified lessons, core narratives, and reliable references.'
        }
        canonicalPath="/stories-of-the-prophets"
        isUrdu={isUrdu}
        breadcrumbs={[
          { name: isUrdu ? 'صفحہ اول' : 'Home', url: '/' },
          { name: isUrdu ? 'قصص الانبیاء' : 'Stories of the Prophets', url: '/stories-of-the-prophets' }
        ]}
        faqs={commonFaqs.map(f => ({
          question: isUrdu ? f.qUrdu : f.qEn,
          answer: isUrdu ? `${f.aUrdu} (حوالہ: ${f.ref})` : `${f.aEn} (Reference: ${f.ref})`
        }))}
        article={{
          headline: isUrdu
            ? 'قصص الانبیاء: قرآن مجید کے مستند واقعات اور اسباق'
            : 'Stories of the Prophets: Authentic Quranic Accounts & Lessons',
          description: isUrdu
            ? 'حضرت آدم، نوح، ابراہیم، یوسف، موسیٰ اور عیسیٰ علیہم السلام کے مستند قرآنی واقعات، تاریخی حقائق اور عملی اسباق مع مستند دلائل۔'
            : 'Explore authentic Quranic stories of Prophets Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (AS). Verified lessons, core narratives, and reliable references.'
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
          {isUrdu ? 'قصص الانبیاء' : 'Stories of the Prophets'}
        </span>
      </nav>

      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900 via-emerald-950 to-slate-900 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
            <Scroll className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مستند قرآنی تاریخ و عبرت' : 'Authentic Quranic History & Reflections'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {isUrdu
              ? 'قصص الانبیاء علیہم السلام: قرآن کریم کے مستند واقعات اور اسباق'
              : 'Stories of the Prophets: Authentic Quranic Accounts & Timeless Lessons'}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            {isUrdu
              ? 'قرآن کریم قصص الانبیاء کو افسانوں کے بجائے حق، اخلاقی رہنمائی اور فکری بیداری کے لیے بیان فرماتا ہے۔ پڑھیے منتخب برگزیدہ انبیاء کرام کے مستند حالات اور زندگی بدل دینے والے اسباق۔'
              : 'The Quran narrates prophetic histories not as speculative legends, but as divine guideposts of resilience, ethical purity, and monotheism. Discover authentic Quran-based accounts of six pivotal Prophets.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium backdrop-blur-sm transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{isUrdu ? 'شیئر کریں' : 'Share Guide'}</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-amber-200 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isUrdu ? 'خالص قرآنی نصوص اور صحیح احادیث پر مبنی' : '100% Based on Quran & Sahih Hadith'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Methodology Note */}
      <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed">
          <p className="font-bold text-amber-900">
            {isUrdu ? 'اسلامک ریسرچ اور طریقہ کار (Methodology):' : 'Editorial Standard & Authenticity:'}
          </p>
          <p>
            {isUrdu
              ? 'یہ مقالہ من گھڑت اسرائیلی داستانوں یا نامعلوم روایات سے پاک ہے۔ تمام تفصیلات قرآن مجید کی آیاتِ بینات اور کتبِ حدیث (صحیح بخاری، صحیح مسلم وغیرہ) کی مستند تخریج کے ساتھ پیش کی گئی ہیں۔'
              : 'This educational guide adheres strictly to Quranic verses and verified Hadith literature. Distorted biblical folklore, fabricated mythologies, and unverified Isra\'iliyyat are intentionally omitted.'}
          </p>
        </div>
      </section>

      {/* Prophet Deep Dives */}
      <div className="space-y-8">
        {prophets.map((p, idx) => (
          <section
            key={idx}
            className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 hover:border-amber-400/60 transition-all"
          >
            {/* Header */}
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-700 tracking-wide uppercase bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  {p.arabicHonorific}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {isUrdu ? 'حوالہ کتب: ' : 'Sources: '} {p.authenticSources}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {isUrdu ? p.nameUrdu : p.nameEn}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                {isUrdu ? p.titleUrdu : p.titleEn}
              </p>
            </div>

            {/* Quran Citations */}
            <div className="grid grid-cols-1 gap-3.5">
              {p.keyQuranVerses.map((verse, vIdx) => (
                <div
                  key={vIdx}
                  className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 space-y-2.5 text-left"
                >
                  <p className="text-right font-serif text-lg sm:text-xl text-emerald-950 font-bold leading-loose tracking-wide">
                    {verse.arabic}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{isUrdu ? verse.transUrdu : verse.transEn}"
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/40 text-[11px] text-emerald-800 font-bold">
                    <span>{verse.ref}</span>
                    <span className="text-slate-400">Quranic Foundation</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Narrative */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>{isUrdu ? 'مستند قرآنی خلاصۂ واقعہ' : 'Quranic Event Overview'}</span>
              </h3>
              <p>{isUrdu ? p.coreNarrativeUrdu : p.coreNarrativeEn}</p>
            </div>

            {/* Key Lessons */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>{isUrdu ? 'ہماری روزمرہ زندگی کے لیے اہم اسباق (Practical Lessons):' : 'Key Takeaways for Daily Life:'}</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isUrdu ? p.keyLessonsUrdu : p.keyLessonsEn).map((lesson, lIdx) => (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* Authentic FAQ Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <HelpCircle className="w-5 h-5 text-emerald-700" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            {isUrdu ? 'عام پوچھے جانے والے علمی سوالات (FAQ)' : 'Frequently Asked Scholarly Questions'}
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
          <Compass className="w-5 h-5" />
          <span>{isUrdu ? 'مزید متعلقہ اسلامی مطالعہ' : 'Continue Your Islamic Study'}</span>
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
          {isUrdu
            ? 'سیرت النبی ﷺ کے مبارک سفر اور اسلامی عقائد کے دیگر بنیادی ستونوں کے مطالعے کے لیے درج ذیل گائیڈز ملاحظہ فرمائیں:'
            : 'Deepen your knowledge of prophetic history and foundational creed with our other comprehensive study guides:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
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
              {isUrdu ? 'ولادت تا حجۃ الوداع مکمل تاریخ' : 'Complete life, milestones & lessons'}
            </span>
          </a>
          <a
            href="/six-articles-of-faith"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('six-articles-of-faith');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'اسلام کے ۶ ارکانِ ایمان' : '6 Articles of Faith (Iman)'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'انبیاء، کتب، ملائکہ پر ایمان' : 'Belief in Prophets, Books & Qadr'}
            </span>
          </a>
          <a
            href="/5-pillars-of-islam"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('5-pillars-of-islam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all text-left block"
          >
            <span className="text-xs font-bold block text-white">
              {isUrdu ? 'اسلام کے ۵ بنیادی ارکان' : '5 Pillars of Islam Explained'}
            </span>
            <span className="text-[11px] text-emerald-200 line-clamp-1 mt-0.5">
              {isUrdu ? 'توحید، نماز، زکوٰۃ، روزہ، حج' : 'Shahadah, Salah, Zakat, Sawm, Hajj'}
            </span>
          </a>
        </div>
      </section>

      <RelatedIslamicLearning currentTab="stories-of-the-prophets" />
    </article>
  );
};

export default StoriesOfTheProphetsGuide;

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SpeechEngine, sounds } from '../../utils/audio';
import { Volume2, VolumeX, ArrowLeft, Star, Lock, CheckCircle2, RotateCcw, Award, Sparkles, ChevronRight, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NamazStep {
  titleUrdu: string;
  titleEn: string;
  arabic: string;
  meaningUrdu: string;
  meaningEn: string;
  hintUrdu?: string;
}

interface NamazLevel {
  id: number;
  nameUrdu: string;
  nameEn: string;
  icon: string;
  descriptionUrdu: string;
  descriptionEn: string;
  steps: NamazStep[];
}

export const NAMAZ_LEVELS: NamazLevel[] = [
  {
    id: 1,
    nameUrdu: 'نماز کی شروعات (Namaz Basics)',
    nameEn: 'Namaz Basics',
    icon: '🤲',
    descriptionUrdu: 'تکبیرِ تحریمہ، ثناء، تعوذ اور تسمیہ سیکھیں',
    descriptionEn: 'Learn Takbeer, Sana, Ta\'awwudh, and Tasmiyah',
    steps: [
      {
        titleUrdu: '۱. تکبیرِ تحریمہ (شروع کرنے کی تکبیر)',
        titleEn: '1. Takbeer Tahreemah',
        arabic: 'اللَّهُ أَكْبَرُ',
        meaningUrdu: 'اللہ سب سے بڑا ہے۔',
        meaningEn: 'Allah is the Greatest.',
        hintUrdu: 'دونوں ہاتھ کانوں تک اٹھا کر تکبیر کہیں اور سینے / ناف کے پاس باندھ لیں۔'
      },
      {
        titleUrdu: '۲. ثناء (نماز کا آغاز)',
        titleEn: '2. Sana (Opening Supplication)',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ',
        meaningUrdu: 'اے اللہ! تو پاک ہے اور اپنی تعریفوں کے ساتھ ہے، اور تیرا نام برکت والا ہے، اور تیری شان بہت بلند ہے، اور تیرے سوا کوئی معبود نہیں۔',
        meaningEn: 'Glory be to You, O Allah, and all praise is due to You. Blessed is Your Name and exalted is Your Majesty, and there is no deity besides You.',
        hintUrdu: 'تکبیر کے فوراً بعد ثناء پڑھی جاتی ہے۔'
      },
      {
        titleUrdu: '۳. تعوّذ (شیطان سے پناہ)',
        titleEn: '3. Ta\'awwudh',
        arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        meaningUrdu: 'میں مردود شیطان سے اللہ کی پناہ مانگتا ہوں۔',
        meaningEn: 'I seek refuge in Allah from Satan the accursed.',
        hintUrdu: 'قرآن پڑھنے سے پہلے پناہ مانگیں۔'
      },
      {
        titleUrdu: '۴. تسمیہ (اللہ کا مبارک نام)',
        titleEn: '4. Tasmiyah',
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        meaningUrdu: 'اللہ کے نام سے جو نہایت مہربان، بہت رحم فرمانے والا ہے۔',
        meaningEn: 'In the Name of Allah, the Entirely Merciful, the Especially Merciful.',
        hintUrdu: 'سورۃ الفاتحہ سے پہلے بسم اللہ پڑھیں۔'
      }
    ]
  },
  {
    id: 2,
    nameUrdu: 'سورۃ الفاتحہ (Surah Al-Fatihah)',
    nameEn: 'Surah Al-Fatihah',
    icon: '📖',
    descriptionUrdu: 'نماز کی ہر رکعت میں پڑھی جانے والی سب سے اہم سورت',
    descriptionEn: 'The opening Surah recited in every unit of prayer',
    steps: [
      {
        titleUrdu: 'آیت ۱ و ۲',
        titleEn: 'Ayah 1 & 2',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ',
        meaningUrdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ نہایت مہربان بہت رحم کرنے والا ہے۔',
        meaningEn: 'All praise belongs to Allah, Lord of all the worlds. The Entirely Merciful, the Especially Merciful.'
      },
      {
        titleUrdu: 'آیت ۳ و ۴',
        titleEn: 'Ayah 3 & 4',
        arabic: 'مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        meaningUrdu: 'روزِ جزا کا مالک ہے۔ ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔',
        meaningEn: 'Master of the Day of Judgment. You alone we worship and from You alone we ask for help.'
      },
      {
        titleUrdu: 'آیت ۵ و ۶ و ۷',
        titleEn: 'Ayah 5, 6 & 7',
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ • صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ • آمِينَ',
        meaningUrdu: 'ہمیں سیدھے راستے پر چلا۔ ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، جن پر نہ غضب ہوا اور نہ وہ گمراہ ہوئے۔ آمین۔',
        meaningEn: 'Guide us to the straight path. The path of those upon whom You bestowed favor, not of those who evoked Your anger, nor of those who are astray. Ameen.'
      }
    ]
  },
  {
    id: 3,
    nameUrdu: 'رکوع (Ruku)',
    nameEn: 'Ruku (Bowing)',
    icon: '🙇',
    descriptionUrdu: 'اللہ کے سامنے عاجزی سے جھکنا اور تسبیح پڑھنا',
    descriptionEn: 'Bowing before Allah and glorifying His Majesty',
    steps: [
      {
        titleUrdu: 'رکوع میں جانا',
        titleEn: 'Transitioning to Ruku',
        arabic: 'اللَّهُ أَكْبَرُ',
        meaningUrdu: 'اللہ سب سے بڑا ہے۔',
        meaningEn: 'Allah is the Greatest.',
        hintUrdu: 'تکبیر کہتے ہوئے دونوں ہاتھوں سے گھٹنوں کو مضبوطی سے پکڑیں اور پیٹھ سیدھی رکھیں۔'
      },
      {
        titleUrdu: 'رکوع کی تسبیح (کم از کم ۳ بار)',
        titleEn: 'Tasbih in Ruku (3 times)',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        meaningUrdu: 'پاک ہے میرا رب جو بہت عظمت والا ہے۔ (۳ بار)',
        meaningEn: 'Glory be to my Lord, the Magnificent. (3 times)'
      }
    ]
  },
  {
    id: 4,
    nameUrdu: 'قومہ (Qawmah)',
    nameEn: 'Qawmah (Standing after Ruku)',
    icon: '🧍',
    descriptionUrdu: 'رکوع کے بعد سیدھے کھڑے ہو کر اللہ کی حمد بیان کرنا',
    descriptionEn: 'Standing straight after bowing with praise for Allah',
    steps: [
      {
        titleUrdu: 'تسمیع (کھڑے ہوتے وقت)',
        titleEn: 'Tasmee\' (Rising from Ruku)',
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
        meaningUrdu: 'اللہ نے اس کی سن لی جس نے اس کی تعریف کی۔',
        meaningEn: 'Allah hears whoever praises Him.',
        hintUrdu: 'رکوع سے سر اٹھاتے وقت یہ کہیں۔'
      },
      {
        titleUrdu: 'تحمید (سیدھے کھڑے ہو کر)',
        titleEn: 'Tahmeed (While Standing)',
        arabic: 'رَبَّنَا لَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
        meaningUrdu: 'اے ہمارے رب! تیرے ہی لیے تمام تعریفیں ہیں، بہت زیادہ، پاکیزہ اور برکت والی تعریف۔',
        meaningEn: 'Our Lord, to You belongs all praise, abundant, beautiful, and blessed.'
      }
    ]
  },
  {
    id: 5,
    nameUrdu: 'سجدہ (Sajdah)',
    nameEn: 'Sajdah (Prostration)',
    icon: '🛐',
    descriptionUrdu: 'بندہ سجدے کی حالت میں اللہ کے سب سے زیادہ قریب ہوتا ہے',
    descriptionEn: 'The closest a servant comes to Allah is in Sajdah',
    steps: [
      {
        titleUrdu: 'سجدے میں جانا',
        titleEn: 'Transitioning to Sajdah',
        arabic: 'اللَّهُ أَكْبَرُ',
        meaningUrdu: 'اللہ سب سے بڑا ہے۔',
        meaningEn: 'Allah is the Greatest.',
        hintUrdu: 'تکبیر کہتے ہوئے پیشانی، ناک، دونوں ہاتھ، دونوں گھٹنے اور پاؤں زمین پر رکھیں۔'
      },
      {
        titleUrdu: 'سجدے کی تسبیح (کم از کم ۳ بار)',
        titleEn: 'Tasbih in Sajdah (3 times)',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        meaningUrdu: 'پاک ہے میرا رب جو سب سے بلند و بالا ہے۔ (۳ بار)',
        meaningEn: 'Glory be to my Lord, the Most High. (3 times)'
      }
    ]
  },
  {
    id: 6,
    nameUrdu: 'جلسہ (Jalsa)',
    nameEn: 'Jalsa (Sitting between Sajdahs)',
    icon: '🧘',
    descriptionUrdu: 'دو سجدوں کے درمیان پرسکون بیٹھنا اور مغفرت مانگنا',
    descriptionEn: 'Calm sitting between two prostrations and asking forgiveness',
    steps: [
      {
        titleUrdu: 'سجدے سے اٹھنا',
        titleEn: 'Rising from Sajdah',
        arabic: 'اللَّهُ أَكْبَرُ',
        meaningUrdu: 'اللہ سب سے بڑا ہے۔',
        meaningEn: 'Allah is the Greatest.'
      },
      {
        titleUrdu: 'دو سجدوں کے درمیان کی دعا',
        titleEn: 'Dua between Prostrations',
        arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَعَافِنِي، وَارْزُقْنِي',
        meaningUrdu: 'اے میرے رب! مجھے بخش دے، اے میرے رب مجھے بخش دے، اور مجھ پر رحم فرما، مجھے عافیت دے اور مجھے رزق عطا فرما۔',
        meaningEn: 'O my Lord, forgive me; O my Lord, forgive me; have mercy upon me, grant me health, and provide for me.'
      }
    ]
  },
  {
    id: 7,
    nameUrdu: 'تشہد (Tashahhud)',
    nameEn: 'Tashahhud (At-Tahiyyat)',
    icon: '📜',
    descriptionUrdu: 'قعدہ میں بیٹھ کر التحیات اور کلمہ شہادت پڑھنا',
    descriptionEn: 'Sitting and reciting the testimony of faith',
    steps: [
      {
        titleUrdu: 'حصہ اول: التحیات',
        titleEn: 'Part 1: At-Tahiyyat',
        arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
        meaningUrdu: 'تمام قولی، بدنی اور مالی عبادتیں اللہ ہی کے لیے ہیں۔',
        meaningEn: 'All verbal, physical, and financial acts of worship belong to Allah.'
      },
      {
        titleUrdu: 'حصہ دوم: نبی ﷺ پر سلام',
        titleEn: 'Part 2: Salam upon the Prophet',
        arabic: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ',
        meaningUrdu: 'اے نبی! آپ پر سلامتی ہو اور اللہ کی رحمت اور اس کی برکتیں ہوں۔ ہم پر اور اللہ کے تمام نیک بندوں پر سلامتی ہو۔',
        meaningEn: 'Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon all righteous servants of Allah.'
      },
      {
        titleUrdu: 'حصہ سوم: کلمہ شہادت',
        titleEn: 'Part 3: Shahadah',
        arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        meaningUrdu: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔',
        meaningEn: 'I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.'
      }
    ]
  },
  {
    id: 8,
    nameUrdu: 'درود اور دعا (Durood & Dua)',
    nameEn: 'Durood & Dua',
    icon: '🌹',
    descriptionUrdu: 'درودِ ابراہیمی اور سلام سے پہلے کی مسنون دعا',
    descriptionEn: 'Salutations upon Prophet Muhammad and concluding Dua',
    steps: [
      {
        titleUrdu: 'درودِ ابراہیمی (حصہ اول)',
        titleEn: 'Durood Ibrahim (Part 1)',
        arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        meaningUrdu: 'اے اللہ! حضرت محمد ﷺ اور ان کی آل پر رحمت نازل فرما جیسا کہ تو نے حضرت ابراہیم اور ان کی آل پر نازل فرمائی، بے شک تو تعریف کیا گیا بڑی شان والا ہے۔',
        meaningEn: 'O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy, Majestic.'
      },
      {
        titleUrdu: 'درودِ ابراہیمی (حصہ دوم)',
        titleEn: 'Durood Ibrahim (Part 2)',
        arabic: 'اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        meaningUrdu: 'اے اللہ! حضرت محمد ﷺ اور ان کی آل میں برکت عطا فرما جیسا کہ تو نے حضرت ابراہیم اور ان کی آل میں برکت فرمائی، بے شک تو تعریف کیا گیا بڑی شان والا ہے۔',
        meaningEn: 'O Allah, send grace upon Muhammad and upon the family of Muhammad, as You sent grace upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy, Majestic.'
      },
      {
        titleUrdu: 'سلام سے پہلے کی جامع دعا',
        titleEn: 'Comprehensive Dua',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        meaningUrdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔',
        meaningEn: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.'
      }
    ]
  },
  {
    id: 9,
    nameUrdu: 'سلام پھیرنا (Salam)',
    nameEn: 'Salam (Conclusion)',
    icon: '🕊️',
    descriptionUrdu: 'دائیں اور بائیں طرف سلام پھیر کر نماز مکمل کرنا',
    descriptionEn: 'Turning right and left to conclude the prayer with peace',
    steps: [
      {
        titleUrdu: 'دائیں طرف سلام پھیرنا',
        titleEn: 'Salam to the Right',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        meaningUrdu: 'تم پر اللہ کی سلامتی ہو اور اس کی رحمت۔',
        meaningEn: 'May the peace and mercy of Allah be upon you.',
        hintUrdu: 'اپنا چہرہ دائیں کندھے کی طرف موڑیں اور سلام کہیں۔'
      },
      {
        titleUrdu: 'بائیں طرف سلام پھیرنا',
        titleEn: 'Salam to the Left',
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        meaningUrdu: 'تم پر اللہ کی سلامتی ہو اور اس کی رحمت۔',
        meaningEn: 'May the peace and mercy of Allah be upon you.',
        hintUrdu: 'پھر اپنا چہرہ بائیں کندھے کی طرف موڑیں اور سلام کہیں۔'
      }
    ]
  },
  {
    id: 10,
    nameUrdu: 'مکمل نماز کی مشق (Complete Salah Practice)',
    nameEn: 'Complete Salah Practice',
    icon: '🏆',
    descriptionUrdu: 'تکبیر سے لے کر سلام تک پوری نماز کی دہرائی اور مکمل مشق',
    descriptionEn: 'Full sequential walk-through of the complete Salah from start to finish',
    steps: [
      {
        titleUrdu: 'مرحلہ ۱: قیام و تکبیر',
        titleEn: 'Step 1: Takbeer & Standing',
        arabic: 'اللَّهُ أَكْبَرُ • سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ',
        meaningUrdu: 'سیدھے کھڑے ہو کر نیت کریں، تکبیر تحریمہ کہیں اور ثناء پڑھیں۔',
        meaningEn: 'Stand upright with sincere intention, raise hands for Takbeer, and recite Sana.'
      },
      {
        titleUrdu: 'مرحلہ ۲: سورۃ الفاتحہ',
        titleEn: 'Step 2: Surah Al-Fatihah',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ • الرَّحْمَٰنِ الرَّحِيمِ • مَالِكِ يَوْمِ الدِّينِ • إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        meaningUrdu: 'سورۃ الفاتحہ اور قرآن کی کوئی آسان سورت پڑھیں۔',
        meaningEn: 'Recite Surah Al-Fatihah followed by any short Surah.'
      },
      {
        titleUrdu: 'مرحلہ ۳: رکوع و قومہ',
        titleEn: 'Step 3: Ruku & Standing',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ • سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ',
        meaningUrdu: 'رکوع میں ۳ بار تسبیح پڑھیں اور پھر قومہ میں سیدھے کھڑے ہوں۔',
        meaningEn: 'Bow in Ruku reciting praise 3 times, then rise saying Sami\'allahu liman hamidah.'
      },
      {
        titleUrdu: 'مرحلہ ۴: دو سجدے اور جلسہ',
        titleEn: 'Step 4: Two Sujud & Jalsa',
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى (×۳) • رَبِّ اغْفِرْ لِي • سُبْحَانَ رَبِّيَ الْأَعْلَى (×۳)',
        meaningUrdu: 'دو سجدے کریں اور درمیان میں جلسہ کریں۔',
        meaningEn: 'Perform two prostrations with sincere praise, sitting briefly between them.'
      },
      {
        titleUrdu: 'مرحلہ ۵: تشہد، درود اور سلام',
        titleEn: 'Step 5: Tashahhud, Durood & Salam',
        arabic: 'التَّحِيَّاتُ لِلَّهِ • اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ • السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        meaningUrdu: 'التحیات، درود ابراہیمی اور دعا پڑھ کر دائیں اور بائیں سلام پھیریں۔ ماشاءاللہ نماز مکمل ہوئی!',
        meaningEn: 'Recite Tashahhud, Durood Ibrahim, Dua, and make Tasleem right and left. Masha\'Allah Salah is complete!'
      }
    ]
  }
];

interface KidsNamazLearningProps {
  onBackToKidsMenu: () => void;
}

export const KidsNamazLearning: React.FC<KidsNamazLearningProps> = ({ onBackToKidsMenu }) => {
  const { contentLang, addXP, showToast } = useApp();
  const isUrdu = contentLang === 'urdu';

  // Load completed levels from localStorage
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('islamiq_kids_namaz_completed_levels');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [practiceCount, setPracticeCount] = useState<number>(0);
  const [isSpeakingArabic, setIsSpeakingArabic] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const activeLevel = NAMAZ_LEVELS.find(l => l.id === activeLevelId) || NAMAZ_LEVELS[0];
  const currentStep = activeLevel.steps[currentStepIndex] || activeLevel.steps[0];

  // Save completed levels
  const markLevelComplete = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      const updated = [...completedLevels, levelId];
      setCompletedLevels(updated);
      try {
        localStorage.setItem('islamiq_kids_namaz_completed_levels', JSON.stringify(updated));
      } catch {}
    }

    sounds.playComplete();
    sounds.playKidsCheerful();
    addXP(30);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    setShowCelebration(true);
  };

  // Check if a level is unlocked: Level 1 is always unlocked.
  // Next levels unlock if previous level is in completedLevels.
  const isLevelUnlocked = (levelId: number): boolean => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  const handleSelectLevel = (levelId: number) => {
    if (!isLevelUnlocked(levelId)) {
      sounds.playIncorrect();
      showToast(isUrdu ? '🔒 پہلے پچھلا مرحلہ مکمل کریں!' : '🔒 Complete previous level first!');
      return;
    }
    sounds.buttonClick();
    SpeechEngine.stop();
    setIsSpeakingArabic(false);
    setActiveLevelId(levelId);
    setCurrentStepIndex(0);
    setPracticeCount(0);
  };

  const handlePlayArabic = () => {
    if (isSpeakingArabic) {
      SpeechEngine.stop();
      setIsSpeakingArabic(false);
      return;
    }

    sounds.buttonClick();
    setIsSpeakingArabic(true);
    // Explicitly use native ar-SA / Arabic voice
    SpeechEngine.speakArabic(
      currentStep.arabic,
      () => setIsSpeakingArabic(true),
      () => setIsSpeakingArabic(false)
    );
  };

  const handlePracticeTap = () => {
    sounds.playTasbihBead();
    const newCount = practiceCount + 1;
    setPracticeCount(newCount);

    if (newCount === 3) {
      sounds.playCorrect();
      showToast(isUrdu ? 'ماشاءاللہ! آپ نے ۳ بار دہرایا! ⭐' : 'Masha\'Allah! 3 repetitions! ⭐');
    }
  };

  const handleNextStep = () => {
    SpeechEngine.stop();
    setIsSpeakingArabic(false);
    sounds.buttonClick();

    if (currentStepIndex < activeLevel.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setPracticeCount(0);
    } else {
      markLevelComplete(activeLevelId);
    }
  };

  const handlePrevStep = () => {
    SpeechEngine.stop();
    setIsSpeakingArabic(false);
    sounds.buttonClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setPracticeCount(0);
    }
  };

  const handleNextLevel = () => {
    setShowCelebration(false);
    if (activeLevelId < NAMAZ_LEVELS.length) {
      setActiveLevelId(activeLevelId + 1);
      setCurrentStepIndex(0);
      setPracticeCount(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 text-white p-4 sm:p-5 rounded-3xl shadow-lg border-2 border-emerald-400">
        <button
          onClick={() => {
            SpeechEngine.stop();
            onBackToKidsMenu();
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-black transition-all active:scale-95 shadow-sm border border-white/30"
          title={isUrdu ? 'واپس کڈز مینو' : 'Back to Kids Menu'}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? '← واپس (Back)' : '← Back'}</span>
        </button>

        <div className="text-center">
          <h2 className="text-base sm:text-xl font-black flex items-center justify-center gap-2">
            <span>🕌</span>
            <span>{isUrdu ? 'پیارے بچو! نماز سیکھیں' : 'Kids Namaz Learning'}</span>
          </h2>
          <p className="text-[11px] sm:text-xs text-emerald-100 font-medium">
            {isUrdu ? 'مرحلہ وار طریقہ، صحیح تلفظ اور تسبیحات' : 'Step-by-step prayer with authentic Arabic pronunciation'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-400 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-950" />
          <span>{completedLevels.length}/10</span>
        </div>
      </div>

      {/* 10 Locked Levels Progress Track (Horizontal Scrollable) */}
      <div className="bg-white p-3.5 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-900 px-1">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isUrdu ? 'نماز کے ۱۰ آسان مراحل' : '10 Step-by-Step Prayer Levels'}</span>
          </span>
          <span className="text-[11px] text-amber-700">
            {completedLevels.length === 10
              ? (isUrdu ? 'ماشاءاللہ! تمام مراحل مکمل!' : 'All levels complete!')
              : (isUrdu ? 'مرحلہ مکمل کریں اور اگلا کھولیں!' : 'Complete level to unlock next!')}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {NAMAZ_LEVELS.map(level => {
            const isCompleted = completedLevels.includes(level.id);
            const isCurrent = level.id === activeLevelId;
            const isUnlocked = isLevelUnlocked(level.id);

            return (
              <button
                key={level.id}
                onClick={() => handleSelectLevel(level.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold transition-all transform active:scale-95 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 scale-105'
                    : isCompleted
                    ? 'bg-amber-100 text-amber-950 border border-amber-300 hover:bg-amber-200'
                    : isUnlocked
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-50 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <span>{level.icon}</span>
                <span>{level.id}. {isUrdu ? level.nameUrdu.split(' ')[0] : level.nameEn.split(' ')[0]}</span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                ) : !isUnlocked ? (
                  <Lock className="w-3 h-3 text-slate-400" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Learning Card */}
      <div className="bg-gradient-to-b from-white to-amber-50/40 rounded-3xl p-5 sm:p-7 border-3 border-teal-300 shadow-md space-y-6 relative overflow-hidden">
        {/* Level Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-100 text-teal-900 text-xs font-black mb-1">
              <span>{activeLevel.icon}</span>
              <span>{isUrdu ? `مرحلہ ${activeLevel.id}` : `Level ${activeLevel.id}`}: {isUrdu ? activeLevel.nameUrdu : activeLevel.nameEn}</span>
            </div>
            <p className="text-xs text-teal-800/80 font-medium">
              {isUrdu ? activeLevel.descriptionUrdu : activeLevel.descriptionEn}
            </p>
          </div>

          <div className="text-xs font-black text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
            {isUrdu ? `حصہ ${currentStepIndex + 1} از ${activeLevel.steps.length}` : `Step ${currentStepIndex + 1} of ${activeLevel.steps.length}`}
          </div>
        </div>

        {/* Step Title */}
        <div className="text-center space-y-1">
          <h3 className="text-base sm:text-lg font-black text-teal-950">
            {isUrdu ? currentStep.titleUrdu : currentStep.titleEn}
          </h3>
          {currentStep.hintUrdu && (
            <p className="text-xs text-amber-800 font-semibold bg-amber-100/70 inline-block px-3 py-1 rounded-full">
              💡 {currentStep.hintUrdu}
            </p>
          )}
        </div>

        {/* Big Prominent Arabic Box */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm text-center relative group">
          <div className="arabic-text text-2xl sm:text-4xl md:text-5xl font-bold text-emerald-950 leading-relaxed sm:leading-loose tracking-wide py-2 select-text">
            {currentStep.arabic}
          </div>

          {/* Big Arabic Speaker Button */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePlayArabic}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                isSpeakingArabic
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
              title="Listen to native Arabic pronunciation"
            >
              <Volume2 className={`w-5 h-5 ${isSpeakingArabic ? 'animate-bounce' : ''}`} />
              <span>{isSpeakingArabic ? (isUrdu ? 'سن رہے ہیں...' : 'Listening...') : (isUrdu ? 'تلفظ سنیں (Speaker 🔊)' : 'Listen in Arabic (ar-SA)')}</span>
            </button>

            {/* Repeat Practice Button */}
            <button
              onClick={handlePracticeTap}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              title="Practice saying this step"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isUrdu ? 'دہرائیں (مشق کریں)' : 'Practice Repeat'}</span>
              <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-xs">
                {practiceCount}
              </span>
            </button>
          </div>
        </div>

        {/* Meaning Box */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs space-y-1 text-center">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            {isUrdu ? 'آسان اردو ترجمہ و مفہوم:' : 'Simple Meaning:'}
          </div>
          <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed urdu-text">
            {currentStep.meaningUrdu}
          </p>
          <p className="text-xs text-slate-500">
            {currentStep.meaningEn}
          </p>
        </div>

        {/* Navigation & Action Footer */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-amber-200">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
          >
            <span>← {isUrdu ? 'پچھلا' : 'Previous'}</span>
          </button>

          <div className="flex items-center gap-1.5">
            {activeLevel.steps.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-7 bg-emerald-600'
                    : idx < currentStepIndex
                    ? 'bg-emerald-300'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextStep}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            {currentStepIndex < activeLevel.steps.length - 1 ? (
              <span>{isUrdu ? 'اگلا حصہ →' : 'Next Step →'}</span>
            ) : (
              <span>{isUrdu ? 'مرحلہ مکمل کریں ⭐' : 'Complete Level ⭐'}</span>
            )}
          </button>
        </div>
      </div>

      {/* Level Completion Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center border-4 border-amber-400 shadow-2xl space-y-4 animate-kids-pop">
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-4xl shadow-inner">
              ⭐
            </div>

            <div>
              <h3 className="text-xl font-black text-amber-950">
                {isUrdu ? 'ماشاءاللہ! بہت خوب!' : 'Masha\'Allah! Wonderful!'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 font-bold mt-1">
                {isUrdu ? `آپ نے "${activeLevel.nameUrdu}" مکمل کر لیا!` : `You completed "${activeLevel.nameEn}"!`}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {isUrdu ? 'اگلا مرحلہ کھول دیا گیا ہے!' : 'Next level is now unlocked!'}
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-black text-amber-900 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span>+30 XP حاصل ہوئے! 🌟</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowCelebration(false)}
                className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                {isUrdu ? 'دوبارہ دیکھیں' : 'Review'}
              </button>

              {activeLevelId < NAMAZ_LEVELS.length && (
                <button
                  onClick={handleNextLevel}
                  className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md"
                >
                  {isUrdu ? 'اگلا مرحلہ کھیلیں →' : 'Next Level →'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Return to Kids Menu Bottom Button */}
      <div className="flex justify-center pt-2 pb-8">
        <button
          onClick={() => {
            SpeechEngine.stop();
            onBackToKidsMenu();
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-emerald-50 text-emerald-800 font-black text-xs sm:text-sm border-2 border-emerald-300 shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? '← واپس کڈز مینو (Back to Kids Menu)' : '← Back to Kids Menu'}</span>
        </button>
      </div>
    </div>
  );
};

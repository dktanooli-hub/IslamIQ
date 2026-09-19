import { QuranVerse, HadithItem, DuaItem, IslamicReminder, QuizQuestion, VerifiedQA, DhikrType, Badge } from '../types';

export const VERIFIED_QURAN_VERSES: QuranVerse[] = [
  {
    id: 'verse-1',
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translationUrdu: 'پس یقیناً مشکل کے ساتھ آسانی ہے، بے شک مشکل کے ساتھ آسانی ہے۔',
    translationEn: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    surahNameArabic: 'الشرح',
    surahNameEn: 'Ash-Sharh',
    surahNumber: 94,
    ayahNumber: 5,
    theme: 'Hope & Patience (امید و صبر)'
  },
  {
    id: 'verse-2',
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    translationUrdu: 'اللہ کسی جان پر اس کی طاقت سے بڑھ کر بوجھ نہیں ڈالتا۔',
    translationEn: 'Allah does not burden a soul beyond that it can bear.',
    surahNameArabic: 'البقرة',
    surahNameEn: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 286,
    theme: 'Relief & Mercy (رحمت و آسانی)'
  },
  {
    id: 'verse-3',
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    translationUrdu: 'سنو! اللہ کے ذکر ہی سے دلوں کو سکون ملتا ہے۔',
    translationEn: 'Unquestionably, by the remembrance of Allah hearts are assured.',
    surahNameArabic: 'الرعد',
    surahNameEn: 'Ar-Ra\'d',
    surahNumber: 13,
    ayahNumber: 28,
    theme: 'Peace of Heart (دل کا اطمینان)'
  },
  {
    id: 'verse-4',
    arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    translationUrdu: 'اور جب میرے بندے آپ سے میرے بارے میں پوچھیں تو میں قریب ہوں؛ جب کوئی پکارنے والا مجھے پکارتا ہے تو میں اس کی دعا قبول کرتا ہوں۔',
    translationEn: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the caller when he calls upon Me.',
    surahNameArabic: 'البقرة',
    surahNameEn: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 186,
    theme: 'Closeness to Allah (اللہ کا قرب)'
  },
  {
    id: 'verse-5',
    arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translationUrdu: 'اگر تم شکر ادا کرو گے تو میں تمہیں ضرور زیادہ دوں گا۔',
    translationEn: 'If you are grateful, I will surely increase you [in favor].',
    surahNameArabic: 'إبراهيم',
    surahNameEn: 'Ibrahim',
    surahNumber: 14,
    ayahNumber: 7,
    theme: 'Gratitude (شکر گزاری)'
  },
  {
    id: 'verse-6',
    arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا • وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
    translationUrdu: 'اور جو کوئی اللہ سے ڈرے گا، اللہ اس کے لیے نکلنے کی راہ بنا دے گا، اور اسے ایسی جگہ سے رزق دے گا جہاں سے اس کا گمان بھی نہ ہوگا۔',
    translationEn: 'And whoever fears Allah - He will make for him a way out and will provide for him from where he does not expect.',
    surahNameArabic: 'الطلاق',
    surahNameEn: 'At-Talaq',
    surahNumber: 65,
    ayahNumber: 2,
    theme: 'Taqwa & Provision (تقویٰ و رزق)'
  },
  {
    id: 'verse-7',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    translationUrdu: 'پس تم مجھے یاد رکھو، میں تمہیں یاد رکھوں گا، اور میرا شکر ادا کرو اور میری ناشکری نہ کرو۔',
    translationEn: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    surahNameArabic: 'البقرة',
    surahNameEn: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 152,
    theme: 'Remembrance & Gratitude (ذکر و شکر)'
  }
];

export const VERIFIED_HADITHS: HadithItem[] = [
  {
    id: 'hadith-1',
    arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    textUrdu: 'اعمال کا دارومدار نیتوں پر ہے، اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔',
    textEn: 'Actions are judged by intentions, and every person will get that which they intended.',
    narrator: 'Umar ibn al-Khattab (RA)',
    source: 'Sahih al-Bukhari',
    hadithNumber: '1',
    grade: 'Sahih',
    lessonUrdu: 'ہر نیک کام شروع کرنے سے پہلے خلوص نیت پیدا کریں۔',
    lessonEn: 'Purify your intention before embarking on every good deed.'
  },
  {
    id: 'hadith-2',
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    textUrdu: 'تم میں سب سے بہترین وہ ہے جو قرآن سیکھے اور اسے دوسروں کو سکھائے۔',
    textEn: 'The best among you are those who learn the Quran and teach it.',
    narrator: 'Uthman ibn Affan (RA)',
    source: 'Sahih al-Bukhari',
    hadithNumber: '5027',
    grade: 'Sahih',
    lessonUrdu: 'قرآن مجید کی تلاوت اور اس کی فہم کو روزانہ اپنی زندگی کا حصہ بنائیں۔',
    lessonEn: 'Make learning and sharing the Quran a daily lifelong habit.'
  },
  {
    id: 'hadith-3',
    arabic: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    textUrdu: 'طہارت اور پاکیزگی آدھا ایمان ہے۔',
    textEn: 'Cleanliness and purity is half of faith.',
    narrator: 'Abu Malik al-Ash\'ari (RA)',
    source: 'Sahih Muslim',
    hadithNumber: '223',
    grade: 'Sahih',
    lessonUrdu: 'جسم، لباس اور روح دونوں کی صفائی کا خاص اہتمام کریں۔',
    lessonEn: 'Emphasize physical cleanliness and spiritual purification.'
  },
  {
    id: 'hadith-4',
    arabic: 'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ',
    textUrdu: 'بے شک اللہ تعالیٰ نرمی کرنے والا ہے اور تمام معاملات میں نرمی کو پسند فرماتا ہے۔',
    textEn: 'Indeed, Allah is gentle and loves gentleness in all matters.',
    narrator: 'Aisha (RA)',
    source: 'Sahih al-Bukhari',
    hadithNumber: '6927',
    grade: 'Sahih',
    lessonUrdu: 'اہل خانہ اور معاشرے کے لوگوں کے ساتھ ہمیشہ نرم لہجے میں بات کریں۔',
    lessonEn: 'Approach family and community interactions with kindness and forbearance.'
  },
  {
    id: 'hadith-5',
    arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    textUrdu: 'اپنے بھائی کے سامنے مسکرانا تمہارے لیے صدقہ ہے۔',
    textEn: 'Your smiling in the face of your brother is charity for you.',
    narrator: 'Abu Dharr (RA)',
    source: 'Jami at-Tirmidhi',
    hadithNumber: '1956',
    grade: 'Sahih',
    lessonUrdu: 'خوش اخلاقی اور مسکراہٹ چھوٹا مگر بہت وزنی نیکی کا عمل ہے۔',
    lessonEn: 'A warm smile brings peace and counts as an authentic act of charity.'
  },
  {
    id: 'hadith-6',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    textUrdu: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے بھی وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    textEn: 'None of you truly believes until he loves for his brother what he loves for himself.',
    narrator: 'Anas ibn Malik (RA)',
    source: 'Sahih al-Bukhari',
    hadithNumber: '13',
    grade: 'Sahih',
    lessonUrdu: 'مومن کا دل کینہ اور حسد سے پاک ہوتا ہے، وہ دوسروں کے لیے بھی وہی خیر چاہتا ہے جو اپنے لیے چاہتا ہے۔',
    lessonEn: 'A hallmark of true faith is wishing well for others and eliminating malice and jealousy.'
  }
];

export const VERIFIED_DUAS: DuaItem[] = [
  {
    id: 'dua-1',
    titleEn: 'Dua for Beneficial Knowledge',
    titleUrdu: 'نفع بخش علم کی دعا',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'a, wa rizqan tayyiba, wa \'amalan mutaqabbala',
    translationUrdu: 'اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ روزی اور قبول ہونے والے عمل کا سوال کرتا ہوں۔',
    translationEn: 'O Allah, I ask You for beneficial knowledge, good (halal) provision, and accepted deeds.',
    reference: 'Sunan Ibn Majah 925 (Sahih)',
    occasionUrdu: 'فجر کی نماز کے بعد پڑھنا مسنون ہے۔',
    occasionEn: 'Sunnah to recite after Fajr prayer.'
  },
  {
    id: 'dua-2',
    titleEn: 'Dua for Parents',
    titleUrdu: 'والدین کے لیے رحمت کی دعا',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi-rhamhuma kama rabbayani sagheera',
    translationUrdu: 'اے میرے رب! ان دونوں پر رحم فرما جیسا کہ انہوں نے مجھے بچپن میں پالا۔',
    translationEn: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    reference: 'Surah Al-Isra 17:24',
    occasionUrdu: 'والدین کی زندگی میں اور ان کے بعد ہر وقت دعا کی جا سکتی ہے۔',
    occasionEn: 'Recommended supplication at all times for one\'s parents.'
  },
  {
    id: 'dua-3',
    titleEn: 'Dua for Anxiety & Relief (Dua of Prophet Yunus)',
    titleUrdu: 'پریشانی و غم سے نجات کی دعا (دعائے یونس)',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu minaz-zalimeen',
    translationUrdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    translationEn: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya 21:87 / Tirmidhi 3505',
    occasionUrdu: 'مشکلات، امتحان اور غم کے لمحات میں بار بار پڑھیں۔',
    occasionEn: 'Recite when seeking relief from distress, anxiety, or adversity.'
  },
  {
    id: 'dua-4',
    titleEn: 'Dua Before Sleeping',
    titleUrdu: 'سوتے وقت کی مسنون دعا',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    transliteration: 'Allahumma bismika amootu wa-ahya',
    translationUrdu: 'اے اللہ! میں تیرے ہی نام کے ساتھ مرتا ہوں اور جیتا ہوں۔',
    translationEn: 'O Allah, in Your Name I die and I live.',
    reference: 'Sahih al-Bukhari 6312',
    occasionUrdu: 'رات کو بستر پر جانے سے پہلے پڑھیں۔',
    occasionEn: 'Recited upon lying down to sleep.'
  },
  {
    id: 'dua-5',
    titleEn: 'Dua Upon Waking Up',
    titleUrdu: 'بیدار ہونے کی مسنون دعا',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhee ahyana ba\'da ma amatana wa-ilayhin-nushoor',
    translationUrdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف لوٹنا ہے۔',
    translationEn: 'All praise is due to Allah Who gave us life after having given us death, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6314',
    occasionUrdu: 'صبح آنکھ کھلتے ہی شکرانے کے طور پر پڑھیں۔',
    occasionEn: 'Recited immediately upon awakening in the morning.'
  },
  {
    id: 'dua-6',
    titleEn: 'Comprehensive Dua for Good in This Life and the Hereafter',
    titleUrdu: 'دنیا و آخرت کی بھلائی کی جامع دعا',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
    translationUrdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں آگ کے عذاب سے بچا۔',
    translationEn: 'Our Lord, give us in this world that which is good and in the Hereafter that which is good, and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah 2:201 / Sahih al-Bukhari 4522',
    occasionUrdu: 'ہر نماز کے بعد، طواف میں اور ہر دعا کے آخر میں پڑھنا مسنون اور نہایت بابرکت ہے۔',
    occasionEn: 'Sunnah to recite frequently during daily prayers, Tawaf, and at the conclusion of supplications.'
  }
];

export const ISLAMIC_REMINDERS: IslamicReminder[] = [
  {
    id: 'rem-1',
    titleEn: 'Consistency in Small Deeds',
    titleUrdu: 'چھوٹے اعمال میں مداومت',
    bodyEn: 'The Prophet ﷺ said: "The most beloved deeds to Allah are those that are consistent, even if they are small." (Bukhari & Muslim). Do not underestimate five minutes of Quran recitation, a small coin in charity, or a sincere prayer.',
    bodyUrdu: 'رسول اللہ ﷺ نے فرمایا: "اللہ کو سب سے زیادہ پسندیدہ عمل وہ ہے جو مستقل کیا جائے، اگرچہ وہ تھوڑا ہی کیوں نہ ہو۔" روزانہ چند منٹ قرآن کی تلاوت یا ایک چھوٹی سی نیکی بھی عظیم اجر کا باعث بنتی ہے۔',
    category: 'Spiritual Growth',
    practicalTipUrdu: 'آج کسی ایک مسنون دعا کو اپنے معمول کا مستقل حصہ بنائیں۔',
    practicalTipEn: 'Commit to one small sunnah practice and repeat it daily.'
  },
  {
    id: 'rem-2',
    titleEn: 'Guard Your Tongue & Heart',
    titleUrdu: 'زبان اور دل کی حفاظت',
    bodyEn: 'A believer uses their speech to build, comfort, and remember Allah. If you find nothing beneficial to say, observing silence is an act of high wisdom and protection.',
    bodyUrdu: 'مومن اپنی زبان سے دوسروں کو خیر پہنچاتا ہے اور اللہ کا ذکر کرتا ہے۔ جب بات کرنے کے لیے کوئی اچھی بات نہ ہو تو خاموشی اختیار کرنا دانائی اور سلامتی ہے۔',
    category: 'Manners & Ethics',
    practicalTipUrdu: 'آج غیبت یا شکایت سے بچیں اور اس کی جگہ "الحمد لله" کہیں',
    practicalTipEn: 'Replace negative chatter or complaints today with "Alhamdulillah".'
  },
  {
    id: 'rem-3',
    titleEn: 'The Power of Istighfar',
    titleUrdu: 'استغفار کی برکتیں',
    bodyEn: 'Seeking forgiveness washes away anxieties, opens doors to unexpected provision, and brings serenity to a burdened soul. Recite Astaghfirullah consciously.',
    bodyUrdu: 'کثرت سے استغفار غموں کو دور کرتا ہے، رزق کے بند دروازے کھولتا ہے اور دل کو گناہوں کے زنگ سے پاک کر دیتا ہے۔',
    category: 'Daily Dhikr',
    practicalTipUrdu: 'آج تسبیح کاؤنٹر کے ذریعے کم از کم 70 یا 100 بار استغفار پڑھیں۔',
    practicalTipEn: 'Use the Tasbih counter to recite Astaghfirullah 70 or 100 times today.'
  },
  {
    id: 'rem-4',
    titleEn: 'The Weight of Good Character',
    titleUrdu: 'حسنِ اخلاق کا عظیم وزن',
    bodyEn: 'The Prophet ﷺ said: "Nothing is heavier on the scale of a believer on the Day of Resurrection than good character." (Jami at-Tirmidhi 2002, Sahih). Sincere kindness, patience, and honesty turn everyday habits into rewarded acts of worship.',
    bodyUrdu: 'رسول اللہ ﷺ نے فرمایا: "قیامت کے دن مومن کے میزان میں اچھے اخلاق سے زیادہ وزنی کوئی چیز نہیں ہوگی۔" (جامع ترمذی: 2002، صحیح)۔ نرم گفتگو، دیانت داری اور وسعتِ ظرفی مومن کا حقیقی زیور ہیں۔',
    category: 'Manners & Ethics',
    practicalTipUrdu: 'آج اپنے گھر والوں اور ملنے والوں کے ساتھ خاص مسکراہٹ اور نرم لہجے میں بات کریں۔',
    practicalTipEn: 'Intentionally practice active patience, a warm smile, and polite speech throughout the day.'
  }
];

export const DHIKR_LIST: DhikrType[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaningEn: 'Glory be to Allah (Free from all imperfections)',
    meaningUrdu: 'اللہ پاک ہے ہر عیب اور نقص سے',
    recommendedCount: 33,
    benefitUrdu: 'میزان میں وزنی ہے اور گناہوں کی بخشش کا ذریعہ ہے۔',
    benefitEn: 'Heavy on the scale of good deeds and removes sins.'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    meaningEn: 'All praise and gratitude belong to Allah',
    meaningUrdu: 'تمام تعریفیں اور شکر اللہ ہی کے لیے ہیں',
    recommendedCount: 33,
    benefitUrdu: 'میزان کو نیکیوں سے بھر دیتا ہے اور نعمتوں میں اضافہ کرتا ہے۔',
    benefitEn: 'Fills the scale with rewards and brings increase in blessing.'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaningEn: 'Allah is the Greatest',
    meaningUrdu: 'اللہ سب سے بڑا ہے',
    recommendedCount: 34,
    benefitUrdu: 'ہر نماز کے بعد تسبیح فاطمہ کا حصہ ہے اور دل کو تقویت دیتا ہے۔',
    benefitEn: 'Part of the post-prayer Tasbih Fatimah, strengthening the believer.'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    meaningEn: 'I seek forgiveness from Allah',
    meaningUrdu: 'میں اللہ سے بخشش طلب کرتا ہوں',
    recommendedCount: 100,
    benefitUrdu: 'غم و پریشانی دور کرتا ہے اور کشادہ رزق کا سبب بنتا ہے۔',
    benefitEn: 'Removes grief, eases difficulties, and invites forgiveness.'
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    meaningEn: 'There is no god worthy of worship except Allah',
    meaningUrdu: 'اللہ کے سوا کوئی عبادت کے لائق نہیں',
    recommendedCount: 100,
    benefitUrdu: 'افضل ترین ذکر ہے اور ایمان کی بنیاد ہے۔',
    benefitEn: 'The most virtuous remembrance and the key to Paradise.'
  },
  {
    id: 'durood',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ',
    transliteration: 'Allahumma Salli \'Ala Muhammad wa \'Ala Aali Muhammad',
    meaningEn: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    meaningUrdu: 'اے اللہ! رحمتیں نازل فرما محمد ﷺ پر اور ان کی آل پر',
    recommendedCount: 33,
    benefitUrdu: 'ایک بار درود بھیجنے پر اللہ کی دس رحمتیں نازل ہوتی ہیں۔',
    benefitEn: 'One blessing draws ten mercies from Allah and elevates rank.'
  },
  {
    id: 'tamjid',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'SubhanAllahi wa bihamdihi, SubhanAllahil-Azeem',
    meaningEn: 'Glory be to Allah and His praise, Glory be to Allah the Tremendous',
    meaningUrdu: 'اللہ اپنی تعریف کے ساتھ پاک ہے، عظمت والا اللہ پاک ہے',
    recommendedCount: 100,
    benefitUrdu: 'زبان پر ہلکے، میزان میں بھاری اور رحمن کو محبوب ترین کلمات۔',
    benefitEn: 'Light on the tongue, heavy in the scales, beloved to the Most Merciful.'
  },
  {
    id: 'custom-dhikr',
    arabic: 'ذِكْرٌ مُخَصَّصٌ',
    transliteration: 'Custom Dhikr',
    meaningEn: 'Personalized Dhikr or Salawat',
    meaningUrdu: 'اپنی پسند کا ذکر یا درود شریف',
    recommendedCount: 33,
    benefitUrdu: 'ہر وہ ذکر جو اخلاص سے کیا جائے اللہ کے ہاں مقبول ہے۔',
    benefitEn: 'Any sincere remembrance of Allah brings peace and divine reward.',
    isCustom: true
  }
];

export const VERIFIED_QUESTIONS: QuizQuestion[] = [
  // --- KIDS QUESTIONS (forKids = true, 4 clear options, cheerful, simple concepts) ---
  {
    id: 'kids-1',
    questionUrdu: 'اسلام کے کتنے بنیادی ارکان (Pillars) ہیں؟',
    questionEn: 'How many fundamental pillars are there in Islam?',
    optionsUrdu: ['3 ارکان', '4 ارکان', '5 ارکان', '6 ارکان'],
    optionsEn: ['3 Pillars', '4 Pillars', '5 Pillars', '6 Pillars'],
    correctIndex: 2,
    explanationUrdu: 'اسلام کے 5 بنیادی ارکان ہیں: شہادت (توحید و رسالت)، نماز، روزہ، زکوٰۃ، اور حج۔',
    explanationEn: 'Islam has 5 pillars: Shahadah (Faith), Salah (Prayer), Sawm (Fasting), Zakat (Charity), and Hajj (Pilgrimage).',
    category: 'Pillars',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اپنے ایک ہاتھ کی انگلیوں جتنی تعداد یاد کریں!',
    kidsHintEn: 'Count the fingers on one hand!'
  },
  {
    id: 'kids-2',
    questionUrdu: 'مسلمان دن اور رات میں کتنی فرض نمازیں ادا کرتے ہیں؟',
    questionEn: 'How many obligatory daily prayers do Muslims perform each day?',
    optionsUrdu: ['3 نمازیں', '4 نمازیں', '5 نمازیں', '7 نمازیں'],
    optionsEn: ['3 Prayers', '4 Prayers', '5 Prayers', '7 Prayers'],
    correctIndex: 2,
    explanationUrdu: 'ہم ہر روز 5 وقت کی فرض نمازیں پڑھتے ہیں: فجر، ظہر، عصر، مغرب، اور عشاء۔',
    explanationEn: 'We pray 5 obligatory prayers daily: Fajr, Dhuhr, Asr, Maghrib, and Isha.',
    category: 'Pillars',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'فجر، ظہر، عصر، مغرب، عشاء!',
    kidsHintEn: 'Fajr, Dhuhr, Asr, Maghrib, Isha!'
  },
  {
    id: 'kids-3',
    questionUrdu: 'قرآن مجید کی پہلی سورت کون سی ہے؟',
    questionEn: 'Which is the very first Surah of the Holy Quran?',
    optionsUrdu: ['سورۃ الاخلاص', 'سورۃ الفاتحہ', 'سورۃ الناس', 'سورۃ البقرہ'],
    optionsEn: ['Surah Al-Ikhlas', 'Surah Al-Fatihah', 'Surah An-Nas', 'Surah Al-Baqarah'],
    correctIndex: 1,
    explanationUrdu: 'سورۃ الفاتحہ قرآن کی پہلی سورت ہے، جس کا مطلب "آغاز کرنے والی" ہے۔ ہم اسے ہر نماز کی ہر رکعت میں پڑھتے ہیں۔',
    explanationEn: 'Surah Al-Fatihah is the opening chapter of the Quran, recited in every unit of our prayer.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'ہم اسے ہر نماز میں "الحمد للہ رب العالمین" سے شروع کرتے ہیں۔',
    kidsHintEn: 'It starts with "Alhamdulillahi Rabbil \'Alameen"!'
  },
  {
    id: 'kids-4',
    questionUrdu: 'کھانا کھانے سے پہلے ہمیں کیا کہنا چاہیے؟',
    questionEn: 'What should a Muslim say before eating food?',
    optionsUrdu: ['بسم اللہ', 'الحمد للہ', 'سبحان اللہ', 'اللہ اکبر'],
    optionsEn: ['Bismillah', 'Alhamdulillah', 'SubhanAllah', 'Allahu Akbar'],
    correctIndex: 0,
    explanationUrdu: 'کوئی بھی اچھا کام یا کھانا کھانے سے پہلے "بسم اللہ" (اللہ کے نام سے) کہنا سنت ہے۔',
    explanationEn: 'Saying "Bismillah" (In the Name of Allah) blesses our food and actions.',
    category: 'Manners',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اللہ کا مبارک نام لے کر کھانا شروع کریں۔',
    kidsHintEn: 'Start with the blessed Name of Allah!'
  },
  {
    id: 'kids-5',
    questionUrdu: 'سب سے پہلے نبی اور انسان کون تھے جنہیں اللہ نے پیدا فرمایا؟',
    questionEn: 'Who was the very first Prophet and human created by Allah?',
    optionsUrdu: ['حضرت نوح علیہ السلام', 'حضرت ابراہیم علیہ السلام', 'حضرت آدم علیہ السلام', 'حضرت موسیٰ علیہ السلام'],
    optionsEn: ['Prophet Nuh (AS)', 'Prophet Ibrahim (AS)', 'Prophet Adam (AS)', 'Prophet Musa (AS)'],
    correctIndex: 2,
    explanationUrdu: 'اللہ تعالیٰ نے سب سے پہلے حضرت آدم علیہ السلام کو پیدا فرمایا اور وہ پہلے نبی ہیں۔',
    explanationEn: 'Allah created Prophet Adam (AS) as the first human and the first Prophet.',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'ساری انسانیت ان کی اولاد ہے۔',
    kidsHintEn: 'He is the father of all humanity.'
  },
  {
    id: 'kids-6',
    questionUrdu: 'جب ہمیں چھینک آئے تو ہمیں کیا کہنا چاہیے؟',
    questionEn: 'What do we say after sneezing?',
    optionsUrdu: ['استغفر اللہ', 'الحمد للہ', 'ماشاء اللہ', 'جزاک اللہ'],
    optionsEn: ['Astaghfirullah', 'Alhamdulillah', 'MashaAllah', 'JazakAllah'],
    correctIndex: 1,
    explanationUrdu: 'چھینک آنے کے بعد "الحمد للہ" (تمام تعریفیں اللہ کے لیے ہیں) کہنا مسنون ہے۔',
    explanationEn: 'It is a Sunnah to praise Allah by saying "Alhamdulillah" after sneezing.',
    category: 'Manners',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اللہ کی نعمت اور صحت پر شکر ادا کریں۔',
    kidsHintEn: 'Thank Allah for health and comfort!'
  },
  {
    id: 'kids-7',
    questionUrdu: 'قرآن مجید کس مبارک مہینے میں نازل ہونا شروع ہوا؟',
    questionEn: 'In which holy month did the revelation of the Quran begin?',
    optionsUrdu: ['محرم', 'رجب', 'رمضان المبارک', 'شوال'],
    optionsEn: ['Muharram', 'Rajab', 'Ramadan', 'Shawwal'],
    correctIndex: 2,
    explanationUrdu: 'قرآن مجید رمضان کے بابرکت مہینے میں لیلۃ القدر کی رات نازل ہونا شروع ہوا۔',
    explanationEn: 'The Quran began to be revealed in the blessed month of Ramadan on Laylat al-Qadr.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'جس مہینے میں ہم روزے رکھتے ہیں!',
    kidsHintEn: 'The month in which we fast!'
  },

  // --- ADULT BEGINNER QUESTIONS ---
  {
    id: 'adult-beg-1',
    questionUrdu: 'قرآن مجید کی سب سے لمبی سورت کون سی ہے؟',
    questionEn: 'Which is the longest Surah in the Holy Quran?',
    optionsUrdu: ['سورۃ آل عمران', 'سورۃ البقرہ', 'سورۃ النساء', 'سورۃ المائدہ'],
    optionsEn: ['Surah Al-Imran', 'Surah Al-Baqarah', 'Surah An-Nisa', 'Surah Al-Ma\'idah'],
    correctIndex: 1,
    explanationUrdu: 'سورۃ البقرہ قرآن کریم کی سب سے لمبی سورت ہے جس کی 286 آیات ہیں۔',
    explanationEn: 'Surah Al-Baqarah is the longest Surah of the Quran containing 286 verses.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-2',
    questionUrdu: 'نماز جنازہ میں کتنی تکبیرات ہوتی ہیں؟',
    questionEn: 'How many Takbeers are recited in the Janazah (Funeral) prayer?',
    optionsUrdu: ['3 تکبیرات', '4 تکبیرات', '5 تکبیرات', '6 تکبیرات'],
    optionsEn: ['3 Takbeers', '4 Takbeers', '5 Takbeers', '6 Takbeers'],
    correctIndex: 1,
    explanationUrdu: 'نماز جنازہ میں چار تکبیرات ہوتی ہیں، جس میں سورت فاتحہ/ثناء، درود ابراہیمی، اور میت کے لیے دعائیں پڑھی جاتی ہیں۔',
    explanationEn: 'Salat al-Janazah consists of four Takbeers with supplications and Salawat.',
    category: 'Salah',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-3',
    questionUrdu: 'رسول اللہ ﷺ پر سب سے پہلی وحی غار حرا میں کس سورت کی ابتدائی آیات نازل ہوئیں؟',
    questionEn: 'Which Surah\'s opening verses were the first revelation to Prophet Muhammad ﷺ in Cave Hira?',
    optionsUrdu: ['سورۃ المدثر', 'سورۃ العلق', 'سورۃ الفاتحہ', 'سورۃ الضحیٰ'],
    optionsEn: ['Surah Al-Muddathir', 'Surah Al-Alaq', 'Surah Al-Fatihah', 'Surah Ad-Duha'],
    correctIndex: 1,
    explanationUrdu: 'غار حرا میں سب سے پہلی وحی سورۃ العلق کی ابتدائی 5 آیات تھیں ("اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ")۔',
    explanationEn: 'The first revelation comprised the first 5 verses of Surah Al-Alaq, beginning with "Iqra" (Read).',
    category: 'Seerah',
    difficulty: 'beginner',
    forKids: false
  },

  // --- ADULT INTERMEDIATE QUESTIONS ---
  {
    id: 'adult-int-1',
    questionUrdu: 'قرآن مجید کی کس سورت میں بسم اللہ دو مرتبہ آئی ہے؟',
    questionEn: 'In which Surah of the Quran does "Bismillah" appear twice?',
    optionsUrdu: ['سورۃ النمل', 'سورۃ التوبہ', 'سورۃ یٰس', 'سورۃ الرحمن'],
    optionsEn: ['Surah An-Naml', 'Surah At-Tawbah', 'Surah Ya-Sin', 'Surah Ar-Rahman'],
    correctIndex: 0,
    explanationUrdu: 'سورۃ النمل میں ایک آغاز میں اور دوسری آیت نمبر 30 میں حضرت سلیمان علیہ السلام کے خط کے ذکر میں بسم اللہ آئی ہے۔',
    explanationEn: 'Surah An-Naml contains Bismillah at the beginning and also in verse 30 regarding Prophet Sulaiman\'s letter.',
    category: 'Quran',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-int-2',
    questionUrdu: 'صلح حدیبیہ کس ہجری سال میں واقع ہوئی؟',
    questionEn: 'In which Hijri year did the Treaty of Hudaybiyyah take place?',
    optionsUrdu: ['5 ہجری', '6 ہجری', '7 ہجری', '8 ہجری'],
    optionsEn: ['5th Hijri', '6th Hijri', '7th Hijri', '8th Hijri'],
    correctIndex: 1,
    explanationUrdu: 'صلح حدیبیہ ذوالقعدہ 6 ہجری میں واقع ہوئی، جسے قرآن مجید نے "فتح مبین" (کھلی فتح) قرار دیا۔',
    explanationEn: 'The Treaty of Hudaybiyyah took place in the 6th year of Hijrah and was described as a clear victory (Fathun Mubeen).',
    category: 'Seerah',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-int-3',
    questionUrdu: 'زکوٰۃ کا نصاب چاندی میں کتنا مقرر ہے؟',
    questionEn: 'What is the Nisab threshold for Zakat in silver?',
    optionsUrdu: ['52.5 تولہ (تقریباً 612 گرام)', '7.5 تولہ (تقریباً 87 گرام)', '40 تولہ', '100 تولہ'],
    optionsEn: ['52.5 Tolas (approx 612 grams)', '7.5 Tolas (approx 87 grams)', '40 Tolas', '100 Tolas'],
    correctIndex: 0,
    explanationUrdu: 'چاندی کا نصاب 200 درہم یعنی 52.5 تولہ (تقریباً 612 گرام) ہے، جبکہ سونے کا نصاب 7.5 تولہ ہے۔',
    explanationEn: 'The silver Nisab is 200 Dirhams (~52.5 tolas or ~612 grams of silver). Gold Nisab is 20 dinars (~7.5 tolas / 87.48g).',
    category: 'Pillars',
    difficulty: 'intermediate',
    forKids: false
  },

  // --- ADULT ADVANCED QUESTIONS ---
  {
    id: 'adult-adv-1',
    questionUrdu: 'کون سے صحابیِ رسول ﷺ کو "حبر الامۃ" اور "ترجمان القرآن" کا لقب ملا؟',
    questionEn: 'Which companion of the Prophet ﷺ held the title "Habr al-Ummah" (Scholar of the Nation) and "Interpreter of the Quran"?',
    optionsUrdu: ['حضرت عبداللہ بن مسعود (رض)', 'حضرت عبداللہ بن عباس (رض)', 'حضرت علی بن ابی طالب (رض)', 'حضرت زید بن ثابت (رض)'],
    optionsEn: ['Abdullah ibn Mas\'ud (RA)', 'Abdullah ibn Abbas (RA)', 'Ali ibn Abi Talib (RA)', 'Zayd ibn Thabit (RA)'],
    correctIndex: 1,
    explanationUrdu: 'حضرت عبداللہ بن عباس رضی اللہ عنہما کے لیے نبی کریم ﷺ نے دعا فرمائی تھی: "اے اللہ! اسے دین کی سمجھ اور قرآن کی تاویل کا علم عطا فرما"۔',
    explanationEn: 'Abdullah ibn Abbas (RA) received the Prophet\'s special dua for understanding of the Deen and Quranic exegesis.',
    category: 'Seerah',
    difficulty: 'advanced',
    forKids: false
  },
  {
    id: 'adult-adv-2',
    questionUrdu: 'قرآن مجید میں حضرت موسیٰ علیہ السلام کے بعد کس نبی کا ذکر سب سے زیادہ بار آیا ہے؟',
    questionEn: 'After Prophet Musa (AS), which Prophet is mentioned most frequently by name in the Quran?',
    optionsUrdu: ['حضرت ابراہیم علیہ السلام', 'حضرت عیسیٰ علیہ السلام', 'حضرت نوح علیہ السلام', 'حضرت یوسف علیہ السلام'],
    optionsEn: ['Prophet Ibrahim (AS)', 'Prophet Isa (AS)', 'Prophet Nuh (AS)', 'Prophet Yusuf (AS)'],
    correctIndex: 0,
    explanationUrdu: 'حضرت ابراہیم علیہ السلام کا نام مبارک قرآن کریم میں 69 بار آیا ہے، جو کہ حضرت موسیٰ علیہ السلام (136 بار) کے بعد سب سے زیادہ ہے۔',
    explanationEn: 'Prophet Ibrahim (AS) is mentioned 69 times in the Quran, second only to Prophet Musa (AS) who is mentioned 136 times.',
    category: 'Prophets',
    difficulty: 'advanced',
    forKids: false
  },
  {
    id: 'adult-adv-3',
    questionUrdu: 'حدیث کی مشہور چھ مستند کتابوں کو کیا کہا جاتا ہے؟',
    questionEn: 'What is the term used for the six major canonical collections of Hadith in Sunni Islam?',
    optionsUrdu: ['صحاح اربعہ', 'صحاح ستہ (الکتب الستہ)', 'موطآت', 'مساند'],
    optionsEn: ['Sihah Arba\'ah', 'Sihah Sittah (Al-Kutub As-Sittah)', 'Muwatta\'at', 'Masanid'],
    correctIndex: 1,
    explanationUrdu: 'صحاح ستہ میں صحیح بخاری، صحیح مسلم، سنن ابی داؤد، جامع ترمذی، سنن نسائی، اور سنن ابن ماجہ شامل ہیں۔',
    explanationEn: 'Al-Kutub As-Sittah comprises Sahih Bukhari, Sahih Muslim, Sunan Abi Dawood, Jami at-Tirmidhi, Sunan an-Nasa\'i, and Sunan Ibn Majah.',
    category: 'Quran',
    difficulty: 'advanced',
    forKids: false
  },
  // Additional Kids Questions for rich non-repeating quizzes
  {
    id: 'kids-8',
    questionUrdu: 'سب سے پہلے انسان اور نبی کون تھے؟',
    questionEn: 'Who was the first human being and first Prophet created by Allah?',
    optionsUrdu: ['حضرت نوح (ع)', 'حضرت آدم (ع)', 'حضرت ابراہیم (ع)', 'حضرت یونس (ع)'],
    optionsEn: ['Prophet Nuh (AS)', 'Prophet Adam (AS)', 'Prophet Ibrahim (AS)', 'Prophet Yunus (AS)'],
    correctIndex: 1,
    explanationUrdu: 'اللہ تعالیٰ نے سب سے پہلے حضرت آدم علیہ السلام کو مٹی سے پیدا فرمایا اور ان کو نبوت عطا کی۔',
    explanationEn: 'Allah created Prophet Adam (AS) as the first human and the first Prophet.',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'ہم سب ان کی اولاد ہیں!',
    kidsHintEn: 'All human beings are his descendants!'
  },
  {
    id: 'kids-9',
    questionUrdu: 'مسلمان ایک دوسرے کو ملتے وقت کیا سلام کہتے ہیں؟',
    questionEn: 'How do Muslims greet each other when they meet?',
    optionsUrdu: ['گڈ مارننگ', 'السلام علیکم', 'شب بخیر', 'خوش آمدید'],
    optionsEn: ['Good morning', 'As-salamu Alaykum', 'Good evening', 'Welcome'],
    correctIndex: 1,
    explanationUrdu: 'اسلامی سلام "السلام علیکم ورحمۃ اللہ" ہے، جس کا مطلب ہے تم پر سلامتی اور اللہ کی رحمت ہو۔',
    explanationEn: 'The Islamic greeting "As-salamu Alaykum" means "Peace be upon you".',
    category: 'Manners',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'سلامتی کی پیاری دعا!',
    kidsHintEn: 'A beautiful prayer for peace!'
  },
  {
    id: 'kids-10',
    questionUrdu: 'کعبۃ اللہ کس مقدس شہر میں واقع ہے؟',
    questionEn: 'In which holy city is the Kaaba located?',
    optionsUrdu: ['مدینہ منورہ', 'مکہ مکرمہ', 'یروشلم (قدس)', 'قاہرہ'],
    optionsEn: ['Madinah', 'Makkah', 'Jerusalem', 'Cairo'],
    correctIndex: 1,
    explanationUrdu: 'بیت اللہ (کعبہ شریف) مکہ مکرمہ میں مسجد الحرام کے درمیان واقع ہے۔',
    explanationEn: 'The holy Kaaba is located in Makkah inside the Sacred Mosque (Al-Masjid Al-Haram).',
    category: 'Pillars',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'جہاں حجاج کرام حج کرنے جاتے ہیں!',
    kidsHintEn: 'Where pilgrims travel to perform Hajj!'
  },
  {
    id: 'kids-11',
    questionUrdu: 'صبح کے وقت ادا کی جانے والی نماز کا کیا نام ہے؟',
    questionEn: 'What is the name of the morning prayer performed before sunrise?',
    optionsUrdu: ['ظہر', 'عصر', 'فجر', 'عشاء'],
    optionsEn: ['Dhuhr', 'Asr', 'Fajr', 'Isha'],
    correctIndex: 2,
    explanationUrdu: 'صبح صادق کے وقت فجر کی 2 رکعت فرض نماز ادا کی جاتی ہے۔',
    explanationEn: 'Fajr is the dawn prayer, consisting of two obligatory units.',
    category: 'Salah',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'صبح سویرے کی نماز!',
    kidsHintEn: 'The early dawn prayer!'
  },
  {
    id: 'kids-12',
    questionUrdu: 'وہ کون سے نبی تھے جن کو اللہ تعالیٰ نے بڑی مچھلی کے پیٹ میں محفوظ رکھا؟',
    questionEn: 'Which Prophet was preserved inside the belly of a large fish/whale?',
    optionsUrdu: ['حضرت یونس (ع)', 'حضرت یوسف (ع)', 'حضرت ایوب (ع)', 'حضرت داؤد (ع)'],
    optionsEn: ['Prophet Yunus (AS)', 'Prophet Yusuf (AS)', 'Prophet Ayyub (AS)', 'Prophet Dawood (AS)'],
    correctIndex: 0,
    explanationUrdu: 'حضرت یونس علیہ السلام مچھلی کے پیٹ میں رہے اور انہوں نے "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ" پڑھا۔',
    explanationEn: 'Prophet Yunus (AS) called upon Allah from inside the whale and was delivered safely.',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'انہوں نے مچھلی کے پیٹ میں مشہور دعا پڑھی!',
    kidsHintEn: 'He called to Allah with the famous supplication!'
  },
  {
    id: 'kids-13',
    questionUrdu: 'علم میں اضافے کے لیے قرآن مجید کی کون سی دعا پڑھی جاتی ہے؟',
    questionEn: 'Which Quranic dua is recited to ask Allah for an increase in knowledge?',
    optionsUrdu: ['رَبِّ زِدْنِي عِلْمًا', 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', 'رَبِّ اشْرَحْ لِي صَدْرِي', 'حَسْبُنَا اللَّهُ'],
    optionsEn: ['Rabbi Zidni \'Ilma', 'Rabbana Atina fid-Dunya Hasanah', 'Rabbish-rah li Sadri', 'HasbunAllah'],
    correctIndex: 0,
    explanationUrdu: 'سورۃ طہٰ کی آیت 114 میں اللہ تعالیٰ نے فرمایا: "وَقُل رَّبِّ زِدْنِي عِلْمًا" (اور کہو اے میرے رب میرے علم میں اضافہ فرما)۔',
    explanationEn: '"Rabbi Zidni \'Ilma" means "O my Lord, increase me in knowledge" (Surah Ta-Ha 20:114).',
    category: 'Duas',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    kidsHintEn: 'O my Lord! Increase me in knowledge.'
  },
  {
    id: 'kids-14',
    questionUrdu: 'اللہ کے گھر کعبہ کو کس عظیم نبی اور ان کے بیٹے نے مل کر تعمیر کیا؟',
    questionEn: 'Which Prophet and his son rebuilt the holy Kaaba by Allah\'s command?',
    optionsUrdu: ['حضرت ابراہیم اور اسماعیل (ع)', 'حضرت یعقوب اور یوسف (ع)', 'حضرت داؤد اور سلیمان (ع)', 'حضرت زکریا اور یحییٰ (ع)'],
    optionsEn: ['Prophet Ibrahim & Ismail (AS)', 'Prophet Ya\'qub & Yusuf (AS)', 'Prophet Dawood & Sulaiman (AS)', 'Prophet Zakariya & Yahya (AS)'],
    correctIndex: 0,
    explanationUrdu: 'حضرت ابراہیم علیہ السلام اور ان کے فرزند حضرت اسماعیل علیہ السلام نے کعبہ کی بنیادیں بلند کیں۔',
    explanationEn: 'Prophet Ibrahim (AS) and his son Prophet Ismail (AS) raised the foundations of the Kaaba.',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'قربانی کی یاد والے پیارے نبی اور ان کے فرزند!',
    kidsHintEn: 'The father and son of the historic sacrifice!'
  },
  {
    id: 'kids-15',
    questionUrdu: 'مسلمان نماز پڑھتے وقت کس رخ (قبلہ) کی طرف منہ کرتے ہیں؟',
    questionEn: 'Towards which direction (Qiblah) do all Muslims face during prayer?',
    optionsUrdu: ['سورج کی طرف', 'کعبہ شریف کی طرف', 'چاند کی طرف', 'پہاڑوں کی طرف'],
    optionsEn: ['Towards the sun', 'Towards the Holy Kaaba', 'Towards the moon', 'Towards mountains'],
    correctIndex: 1,
    explanationUrdu: 'تمام مسلمان مکہ مکرمہ میں واقع کعبۃ اللہ (قبلہ) کی طرف منہ کر کے نماز ادا کرتے ہیں۔',
    explanationEn: 'Muslims everywhere face the Holy Kaaba in Makkah, unifying all worshippers in one direction.',
    category: 'Salah',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'مکہ مکرمہ کا مقدس گھر!',
    kidsHintEn: 'The sacred House in Makkah!'
  },
  {
    id: 'kids-16',
    questionUrdu: 'رات کو سوتے وقت دائیں کروٹ لیٹ کر کون سی دعا پڑھتے ہیں؟',
    questionEn: 'Which dua do we recite before sleeping at night on our right side?',
    optionsUrdu: ['اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا', 'الحمد للہ الذی اطعمنا', 'سبحان الذی سخر لنا', 'ربنا آتنا فی الدنیا'],
    optionsEn: ['Allahumma Bismika Amutu wa Ahya', 'Alhamdulillahilladhi At\'amana', 'Subhanalladhi Sakh-khara Lana', 'Rabbana Atina fid-Dunya'],
    correctIndex: 0,
    explanationUrdu: 'سونے کی مسنون دعا ہے: "اے اللہ! میں تیرے نام کے ساتھ ہی مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں"۔',
    explanationEn: 'The Sunnah bedtime supplication means: "O Allah, in Your name I die (sleep) and live (wake).',
    category: 'Duas',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اے اللہ! تیرے نام سے سوتا اور جاگتا ہوں۔',
    kidsHintEn: 'In Your name, O Allah, I sleep and wake.'
  },

  // Additional Adult Beginner Questions
  {
    id: 'adult-beg-4',
    questionUrdu: 'قرآن مجید میں کل کتنی سورتیں اور پارے ہیں؟',
    questionEn: 'How many Surahs and Juz (Paras) are there in the Holy Quran?',
    optionsUrdu: ['114 سورتیں اور 30 پارے', '110 سورتیں اور 28 پارے', '120 سورتیں اور 30 پارے', '114 سورتیں اور 40 پارے'],
    optionsEn: ['114 Surahs and 30 Juz', '110 Surahs and 28 Juz', '120 Surahs and 30 Juz', '114 Surahs and 40 Juz'],
    correctIndex: 0,
    explanationUrdu: 'قرآن مجید میں 114 سورتیں، 30 پارے (اجزاء) اور 6,236 آیات ہیں۔',
    explanationEn: 'The Holy Quran consists of 114 Surahs, 30 Juz, and 6,236 verses.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-5',
    questionUrdu: 'مسلمانوں کے پہلے خلیفہ راشد کون تھے؟',
    questionEn: 'Who was the first Rightly Guided Caliph (Khalifah) of Islam?',
    optionsUrdu: ['حضرت عمر فاروق (رض)', 'حضرت ابوبکر صدیق (رض)', 'حضرت عثمان غنی (رض)', 'حضرت علی المرتضیٰ (رض)'],
    optionsEn: ['Umar ibn al-Khattab (RA)', 'Abu Bakr as-Siddiq (RA)', 'Uthman ibn Affan (RA)', 'Ali ibn Abi Talib (RA)'],
    correctIndex: 1,
    explanationUrdu: 'نبی کریم ﷺ کے وصال کے بعد مسلمانوں نے بالاتفاق حضرت ابوبکر صدیق رضی اللہ عنہ کو پہلا خلیفہ منتخب کیا۔',
    explanationEn: 'Abu Bakr as-Siddiq (RA) was chosen as the first Caliph following the passing of the Prophet ﷺ.',
    category: 'Seerah',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-6',
    questionUrdu: 'نماز میں رکوع سے اٹھتے وقت مقتدی یا منفرد کیا کلمہ کہتے ہیں؟',
    questionEn: 'What does the worshipper say when rising from Ruku into the standing position (I\'tidal)?',
    optionsUrdu: ['سبحان ربی الاعلیٰ', 'رَبَّنَا لَكَ الْحَمْدُ', 'استغفر اللہ', 'اللہ اکبر'],
    optionsEn: ['Subhana Rabbiyal A\'la', 'Rabbana Lakal Hamd', 'Astaghfirullah', 'Allahu Akbar'],
    correctIndex: 1,
    explanationUrdu: 'امام "سمع اللہ لمن حمدہ" کہتا ہے اور مقتدی جواب میں "رَبَّنَا وَلَكَ الْحَمْدُ" کہتے ہیں۔',
    explanationEn: 'The worshipper replies with "Rabbana wa Lakal Hamd" (Our Lord, to You belongs all praise).',
    category: 'Salah',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-7',
    questionUrdu: 'رمضان المبارک کے روزے کس ہجری سال میں فرض ہوئے؟',
    questionEn: 'In which year after Hijrah did fasting during the month of Ramadan become obligatory?',
    optionsUrdu: ['1 ہجری', '2 ہجری', '3 ہجری', '5 ہجری'],
    optionsEn: ['1st Hijri', '2nd Hijri', '3rd Hijri', '5th Hijri'],
    correctIndex: 1,
    explanationUrdu: 'رمضان کے روزے شعبان 2 ہجری میں سورۃ البقرہ کی آیت 183 کے ذریعے فرض قرار دیے گئے۔',
    explanationEn: 'Fasting in Ramadan was made obligatory in Sha\'ban of the 2nd year of Hijrah (Surah Al-Baqarah 2:183).',
    category: 'Pillars',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-beg-8',
    questionUrdu: 'قرآن مجید کی سب سے عظیم آیت کون سی ہے؟',
    questionEn: 'Which verse of the Quran is declared by the Prophet ﷺ as the greatest verse?',
    optionsUrdu: ['آیت الکرسی (البقرہ: 255)', 'آمن الرسول (البقرہ: 285)', 'آخری آیات سورۃ الحشر', 'آیت الدّین'],
    optionsEn: ['Ayat al-Kursi (2:255)', 'Amanar-Rasul (2:285)', 'End of Surah Al-Hashr', 'Ayat ad-Dayn'],
    correctIndex: 0,
    explanationUrdu: 'صحیح مسلم کی روایت کے مطابق آیت الکرسی (سورۃ البقرہ آیت 255) کتاب اللہ کی سب سے عظیم آیت ہے۔',
    explanationEn: 'Prophet Muhammad ﷺ affirmed that Ayat al-Kursi is the greatest verse in the book of Allah.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: false
  },

  // Additional Adult Intermediate Questions
  {
    id: 'adult-int-4',
    questionUrdu: 'غزوہ بدر کس ہجری سال اور کس اسلامی مہینے میں پیش آیا؟',
    questionEn: 'In which Hijri year and Islamic month did the Battle of Badr take place?',
    optionsUrdu: ['2 ہجری، 17 رمضان المبارک', '3 ہجری، شوال', '5 ہجری، ذوالقعدہ', '8 ہجری، رمضان'],
    optionsEn: ['2nd Hijri, 17th Ramadan', '3rd Hijri, Shawwal', '5th Hijri, Dhul Qi\'dah', '8th Hijri, Ramadan'],
    correctIndex: 0,
    explanationUrdu: 'غزوہ بدر 17 رمضان المبارک 2 ہجری کو پیش آیا، جسے قرآن مجید میں "یوم الفرقان" کہا گیا ہے۔',
    explanationEn: 'The Battle of Badr took place on 17 Ramadan, 2 AH, designated in the Quran as Yawm al-Furqan.',
    category: 'Seerah',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-int-5',
    questionUrdu: 'قرآن مجید کی کس سورت کے آغاز میں "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" نہیں لکھی جاتی؟',
    questionEn: 'Which Surah of the Holy Quran does not begin with Bismillah?',
    optionsUrdu: ['سورۃ الانفال', 'سورۃ التوبہ (البراءۃ)', 'سورۃ یونس', 'سورۃ ہود'],
    optionsEn: ['Surah Al-Anfal', 'Surah At-Tawbah (Bara\'ah)', 'Surah Yunus', 'Surah Hud'],
    correctIndex: 1,
    explanationUrdu: 'سورۃ التوبہ کے شروع میں بسم اللہ نہیں ہے، کیونکہ یہ کفار و مشرکین سے برأت اور اعلانِ جنگ کے موضوع پر نازل ہوئی تھی۔',
    explanationEn: 'Surah At-Tawbah does not commence with Bismillah as it declared disavowal towards treaty-violating polytheists.',
    category: 'Quran',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-int-6',
    questionUrdu: 'حج کے فرائض (ارکانِ حج) کتنے ہیں جن کے بغیر حج ادا نہیں ہوتا؟',
    questionEn: 'How many fundamental pillars (Arkan) of Hajj must be completed for Hajj to be valid?',
    optionsUrdu: ['2 ارکان', '3 ارکان', '4 ارکان (احرام، وقوفِ عرفہ، طوافِ زیارت، سعی)', '7 ارکان'],
    optionsEn: ['2 Pillars', '3 Pillars', '4 Pillars (Ihram, Wuquf Arafah, Tawaf Ifadah, Sa\'i)', '7 Pillars'],
    correctIndex: 2,
    explanationUrdu: 'جمہور فقہاء کے نزدیک حج کے چار بنیادی ارکان ہیں: احرام باندھنا، 9 ذوالحجہ کو وقوفِ عرفہ، طوافِ زیارت، اور صفا و مروہ کے درمیان سعی۔',
    explanationEn: 'The primary Arkan of Hajj are: Ihram, standing at Arafah (Wuquf), Tawaf al-Ifadah, and Sa\'i between Safa and Marwah.',
    category: 'Pillars',
    difficulty: 'intermediate',
    forKids: false
  },

  // Additional Adult Advanced Questions
  {
    id: 'adult-adv-4',
    questionUrdu: 'علمِ حدیث میں ایسی حدیث جس کی سند رسول اللہ ﷺ تک بغیر کسی انقطاع کے پہنچے، کیا کہلاتی ہے؟',
    questionEn: 'In Hadith terminology, what is a tradition called whose chain of transmission connects directly to the Prophet ﷺ without interruption?',
    optionsUrdu: ['حدیثِ مرفوع متصل', 'حدیثِ موقوف', 'حدیثِ مقطوع', 'حدیثِ مرسل'],
    optionsEn: ['Hadith Marfu\' Muttasil', 'Hadith Mawquf', 'Hadith Maqtu\'', 'Hadith Mursal'],
    correctIndex: 0,
    explanationUrdu: 'جو حدیث رسول اللہ ﷺ کی طرف منسوب ہو وہ "مرفوع" کہلاتی ہے اور اگر اس کی سند اول تا آخر متصل ہو تو اسے "مرفوع متصل" کہتے ہیں۔',
    explanationEn: 'A narration attributed to the Prophet ﷺ with an unbroken chain from narrator to narrator is termed Marfu\' Muttasil.',
    category: 'Quran',
    difficulty: 'advanced',
    forKids: false
  },
  {
    id: 'adult-adv-5',
    questionUrdu: 'قرآن کریم کو کتابی شکل میں جمع کرنے کے لیے حضرت ابوبکر صدیق (رض) نے کس جلیل القدر صحابی کو کمیٹی کا سربراہ مقرر فرمایا؟',
    questionEn: 'Which esteemed companion did Caliph Abu Bakr (RA) appoint to lead the compilation of the Quran into a single Mushaf?',
    optionsUrdu: ['حضرت زید بن ثابت (رض)', 'حضرت معاذ بن جبل (رض)', 'حضرت ابی بن کعب (رض)', 'حضرت عثمان بن عفان (رض)'],
    optionsEn: ['Zayd ibn Thabit (RA)', 'Mu\'adh ibn Jabal (RA)', 'Ubayy ibn Ka\'b (RA)', 'Uthman ibn Affan (RA)'],
    correctIndex: 0,
    explanationUrdu: 'حضرت زید بن ثابت رضی اللہ عنہ کاتبِ وحی تھے اور انہوں نے صحابہ کے پاس موجود تحریروں اور حفاظ کے سینوں سے انتہائی تحقیق کے ساتھ قرآن کو یکجا کیا۔',
    explanationEn: 'Zayd ibn Thabit (RA), chief scribe of revelation, was appointed by Abu Bakr (RA) to meticulously collect the Quranic texts.',
    category: 'Quran',
    difficulty: 'advanced',
    forKids: false
  },
  {
    id: 'islamic-q-1',
    questionUrdu: 'تہجد (نمازِ شب) کی سب سے افضل ترین اور قبولیت کی خاص گھڑی کون سی ہے؟',
    questionEn: 'According to authentic Sunnah, which time is most virtuous and blessed for Tahajjud (Night Prayer)?',
    optionsUrdu: [
      'نماز عشاء کے فوراً بعد',
      'رات کا آخری تہائی حصہ (سو کر بیدار ہونے کے بعد)',
      'صرف نماز مغرب کے بعد',
      'فجر کی اذان کے بعد'
    ],
    optionsEn: [
      'Immediately following the Isha prayer',
      'The last third of the night (after sleeping and waking)',
      'Only immediately after Maghrib',
      'After the Fajr call to prayer'
    ],
    correctIndex: 1,
    explanationUrdu: 'رسول اللہ ﷺ نے فرمایا کہ رات کے آخری تہائی حصے میں اللہ تعالیٰ آسمانِ دنیا پر نزولِ رحمت فرماتا ہے اور دعائیں قبول فرماتا ہے۔ (صحیح بخاری: 1145، سورۃ الاسراء: 79)۔',
    explanationEn: 'The Prophet ﷺ stated that Allah descends to the lowest heaven in the final third of the night to answer those who supplicate (Sahih al-Bukhari 1145, Surah Al-Isra 17:79).',
    category: 'Salah',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-gen-1',
    questionUrdu: 'رسول اللہ ﷺ کی اس مبارک اونٹنی کا کیا نام تھا جس پر سوار ہو کر آپ ﷺ نے مدینہ منورہ ہجرت فرمائی؟',
    questionEn: 'What was the name of Prophet Muhammad\'s ﷺ she-camel upon which he rode into Madinah during Hijrah?',
    optionsUrdu: ['القصواء', 'الشهباء', 'العضباء', 'البورق'],
    optionsEn: ['Al-Qaswa', 'Ash-Shahba', 'Al-Adhba', 'Al-Buraq'],
    correctIndex: 0,
    explanationUrdu: 'ہجرتِ مدینہ کے وقت آپ ﷺ کی اونٹنی "القصواء" تھی جس نے مدینہ منورہ میں حضرت ابو ایوب انصاری (رض) کے مکان کے سامنے پڑاؤ ڈالا۔ (صحیح بخاری: 3906)۔',
    explanationEn: 'The Prophet\'s ﷺ blessed she-camel was named Al-Qaswa, which halted at the dwelling of Abu Ayyub al-Ansari (RA) (Sahih al-Bukhari 3906).',
    category: 'Seerah',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-gen-2',
    questionUrdu: 'قرآن مجید کے تیسویں اور آخری پارے کو عموماً کس نام سے پکارا جاتا ہے؟',
    questionEn: 'What is the 30th and final Juz (part) of the Holy Quran commonly called?',
    optionsUrdu: ['تبارک الذی پارہ', 'عمّ پارہ (Juz Amma)', 'سبحان الذی پارہ', 'قد سمع اللہ پارہ'],
    optionsEn: ['Juz Tabarak', 'Juz Amma (عمّ پارہ)', 'Juz Subhanalladhi', 'Juz Qad Sami\'a'],
    correctIndex: 1,
    explanationUrdu: 'تیسویں پارے کا آغاز سورۃ النبأ کی ابتدائی آیت "عَمَّ يَتَسَاءَلُونَ" سے ہوتا ہے، اس لیے اسے "عمّ پارہ" کہا جاتا ہے۔ (قرآن: سورۃ النبأ 78:1)۔',
    explanationEn: 'The 30th Juz begins with the opening ayah of Surah An-Naba ("\'Amma yatasa\'aloon"), thus traditionally named Juz Amma (Quran 78:1).',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-gen-3',
    questionUrdu: 'اللہ تعالیٰ کے 99 اسمائے حسنیٰ کو یاد کرنے، سمجھنے اور ان کے تقاضوں پر عمل کرنے والے کے لیے نبی ﷺ نے کیا انعام بیان فرمایا؟',
    questionEn: 'What divine reward did Prophet Muhammad ﷺ promise for whoever learns, understands, and acts upon the 99 Names of Allah?',
    optionsUrdu: ['دنیاوی مال و دولت', 'جنت میں داخلہ', 'طویل عمر کی ضمانت', 'بادشاہت'],
    optionsEn: ['Worldly riches', 'Entrance into Paradise (Jannah)', 'Guaranteed long lifespan', 'Earthly kingdom'],
    correctIndex: 1,
    explanationUrdu: 'رسول اللہ ﷺ نے فرمایا: "اللہ تعالیٰ کے ننانوے نام ہیں، جو شخص ان کا احصاء کرے گا (یاد کرے گا اور عمل کرے گا) وہ جنت میں داخل ہوگا۔" (صحیح بخاری: 2736، صحیح مسلم: 2677)۔',
    explanationEn: 'The Prophet ﷺ said: "Allah has ninety-nine names; whoever enumerates and lives by them will enter Paradise." (Sahih al-Bukhari 2736, Sahih Muslim 2677).',
    category: 'Aqeedah',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'adult-gen-4',
    questionUrdu: 'کس پیغمبر کے لیے اللہ تعالیٰ کے حکم سے دہکتی ہوئی آگ ٹھنڈی اور سراسر سلامتی والی بن گئی تھی؟',
    questionEn: 'For which noble Prophet did Allah command the scorching fire to become cool and peaceful?',
    optionsUrdu: ['حضرت ابراہیم علیہ السلام', 'حضرت موسیٰ علیہ السلام', 'حضرت یوسف علیہ السلام', 'حضرت عیسیٰ علیہ السلام'],
    optionsEn: ['Prophet Ibrahim (AS)', 'Prophet Musa (AS)', 'Prophet Yusuf (AS)', 'Prophet Isa (AS)'],
    correctIndex: 0,
    explanationUrdu: 'قرآن مجید میں اللہ کا ارشاد ہے: "ہم نے فرمایا: اے آگ! ابراہیم پر ٹھنڈی اور سلامتی والی ہو جا۔" (سورۃ الانبیاء: 69)۔',
    explanationEn: 'Allah declared in the Quran: "O fire, be coolness and safety upon Ibrahim." (Surah Al-Anbiya 21:69).',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: false
  },
  {
    id: 'adult-gen-5',
    questionUrdu: 'اسلام میں جھوٹی گواہی دینے (شہادتِ زور) کی کیا شرعی حیثیت اور وعید ہے؟',
    questionEn: 'In Islamic law and ethics, what is the severity of giving false testimony (Shahadat az-Zoor)?',
    optionsUrdu: ['ایک عام لغزش', 'کبائر گناہوں میں سے بدترین گناہ', 'مکروہِ تنزیہی', 'مباح'],
    optionsEn: ['A minor slip', 'One of the gravest major sins (Kaba\'ir)', 'Mildly discouraged', 'Permissible'],
    correctIndex: 1,
    explanationUrdu: 'رسول اللہ ﷺ نے شرک اور والدین کی نافرمانی کے بعد جھوٹ بولنے اور جھوٹی گواہی کو سب سے بڑا کبیرہ گناہ قرار دیا ہے۔ (صحیح بخاری: 2654، صحیح مسلم: 87)۔',
    explanationEn: 'The Prophet ﷺ warned that false witness is among the greatest destructive sins alongside Shirk and disobedience to parents (Sahih al-Bukhari 2654, Sahih Muslim 87).',
    category: 'Manners',
    difficulty: 'intermediate',
    forKids: false
  },
  {
    id: 'kids-17',
    questionUrdu: 'ہمارے پیارے نبی حضرت محمد ﷺ کے والد محترم کا کیا نام تھا؟',
    questionEn: 'What was the name of our beloved Prophet Muhammad\'s ﷺ father?',
    optionsUrdu: ['حضرت عبداللہ', 'حضرت ابو طالب', 'حضرت عباس', 'حضرت حمزہ'],
    optionsEn: ['Abdullah', 'Abu Talib', 'Abbas', 'Hamzah'],
    correctIndex: 0,
    explanationUrdu: 'ہمارے پیارے نبی ﷺ کے والد محترم کا نام حضرت عبداللہ اور والدہ کا نام بی بی آمنہ تھا۔',
    explanationEn: 'Our beloved Prophet\'s father was Abdullah, and his mother was Aminah.',
    category: 'Prophets',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'اللہ کے بندے کے معنی والا پیارا نام!',
    kidsHintEn: 'A name meaning "Servant of Allah"!'
  },
  {
    id: 'kids-18',
    questionUrdu: 'مسجد میں داخل ہوتے وقت ہمیں پہلے کون سا پاؤں آگے رکھنا چاہیے؟',
    questionEn: 'Which foot should we step forward with first when entering the Masjid?',
    optionsUrdu: ['دایاں پاؤں (Right foot)', 'بایاں پاؤں (Left foot)', 'دونوں پاؤں ایک ساتھ', 'کوئی بھی پاؤں'],
    optionsEn: ['Right foot', 'Left foot', 'Both feet together', 'Any foot'],
    correctIndex: 0,
    explanationUrdu: 'مسجد میں داخل ہوتے وقت دایاں پاؤں پہلے رکھنا اور مسنون دعا پڑھنا پیارے نبی ﷺ کی سنت ہے۔',
    explanationEn: 'It is Sunnah to step into the Masjid with your right foot and recite the entering dua.',
    category: 'Manners',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'ہر اچھے کام کا آغاز دائیں جانب سے!',
    kidsHintEn: 'Always start blessed places with the right side!'
  },
  {
    id: 'kids-19',
    questionUrdu: 'کلمہ طیبہ "لَا إِلٰهَ إِلَّا اللّٰهُ" کا کیا مطلب ہے؟',
    questionEn: 'What is the meaning of the first part of the Kalimah "La ilaha illallah"?',
    optionsUrdu: [
      'اللہ کے سوا کوئی عبادت کے لائق نہیں',
      'اللہ بہت مہربان ہے',
      'ہم سب اچھے بچے ہیں',
      'زمین اور آسمان خوبصورت ہیں'
    ],
    optionsEn: [
      'There is no deity worthy of worship except Allah',
      'Allah is very kind',
      'We are good children',
      'The earth and sky are beautiful'
    ],
    correctIndex: 0,
    explanationUrdu: 'اس کلمے کا مطلب ہے کہ اللہ ہی ہمارا اکیلا خالق و مالک ہے اور صرف اسی کی عبادت کرنی چاہیے۔',
    explanationEn: 'This means that Allah alone created us and only He deserves our worship.',
    category: 'Pillars',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'توحید کا بنیادی مطلب یاد کریں!',
    kidsHintEn: 'Remember the oneness of Allah!'
  },
  {
    id: 'kids-20',
    questionUrdu: 'قرآن مجید کی سب سے چھوٹی سورت کون سی ہے جس میں 3 مبارک آیات ہیں؟',
    questionEn: 'Which is the shortest Surah in the Holy Quran, containing 3 blessed verses?',
    optionsUrdu: ['سورۃ الکوثر', 'سورۃ الفلق', 'سورۃ الاخلاص', 'سورۃ الناس'],
    optionsEn: ['Surah Al-Kawthar', 'Surah Al-Falaq', 'Surah Al-Ikhlas', 'Surah An-Nas'],
    correctIndex: 0,
    explanationUrdu: 'سورۃ الکوثر قرآن پاک کی سب سے چھوٹی سورت ہے جو "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ" سے شروع ہوتی ہے۔',
    explanationEn: 'Surah Al-Kawthar is the shortest Surah in the Quran, containing 3 verses.',
    category: 'Quran',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ سے شروع ہوتی ہے!',
    kidsHintEn: 'It starts with "Inna A\'taynakal Kawthar"!'
  },
  {
    id: 'kids-21',
    questionUrdu: 'پانی پیتے وقت پیارے نبی حضرت محمد ﷺ کا کیا مبارک طریقہ تھا؟',
    questionEn: 'What is the Sunnah way taught by Prophet Muhammad ﷺ for drinking water?',
    optionsUrdu: [
      'بیٹھ کر، دائیں ہاتھ سے، بسم اللہ پڑھ کر اور 3 گھونٹ میں',
      'کھڑے ہو کر جلدی سے ایک ہی سانس میں',
      'بائیں ہاتھ سے پینا',
      'چلتے چلتے پینا'
    ],
    optionsEn: [
      'Sitting down, with the right hand, saying Bismillah, in 3 sips',
      'Standing up and gulping in one breath',
      'Using the left hand',
      'Drinking while running'
    ],
    correctIndex: 0,
    explanationUrdu: 'پیارے نبی ﷺ نے سکھایا کہ بیٹھ کر، دائیں ہاتھ سے اور تین سانسوں میں آرام سے پانی پینا چاہیے۔',
    explanationEn: 'Our Prophet ﷺ taught us to sit down, use our right hand, and sip calmly in three breaths.',
    category: 'Manners',
    difficulty: 'beginner',
    forKids: true,
    kidsHintUrdu: 'بیٹھ کر، دائیں ہاتھ سے اور 3 گھونٹ میں!',
    kidsHintEn: 'Sitting down with the right hand and taking 3 calm sips!'
  }
];

export const VERIFIED_QA_DATABASE: VerifiedQA[] = [
  {
    id: 'qa-1',
    questionUrdu: 'توحید کی بنیادی اقسام کیا ہیں؟',
    questionEn: 'What are the main categories of Tawhid (Islamic Monotheism)?',
    answerUrdu: 'علمائے کرام نے قرآن و سنت کی روشنی میں توحید کو تین بنیادی اقسام میں بیان کیا ہے: 1. توحید الربوبیت (یہ یقین کہ اللہ ہی کائنات کا اکیلا خالق، مالک اور منتظم ہے)۔ 2. توحید الالوہیت (یہ یقین کہ صرف اللہ ہی عبادت، دعا، نذر و نیاز اور سجدے کے لائق ہے)۔ 3. توحید الاسماء والصفات (اللہ کے تمام خوبصورت ناموں اور اعلیٰ صفات پر بغیر کسی تحریف یا تشبیہ کے ایمان لانا)۔',
    answerEn: 'Scholars classify Tawhid into three distinct categories based on Quranic texts: 1. Tawhid ar-Rububiyyah (Oneness of Lordship: Allah alone is the Creator, Provider, and Sustainer). 2. Tawhid al-Uluhiyyah (Oneness of Worship: All acts of worship, prayer, sacrifice, and hope belong exclusively to Allah). 3. Tawhid al-Asma was-Sifat (Oneness of Allah\'s Divine Names and Attributes without distortion, denial, or comparison to creation).',
    category: 'Aqeedah',
    reference: 'Surah Maryam 19:65, Surah Ash-Shura 42:11',
    tags: ['Tawhid', 'Aqeedah', 'Faith', 'توحید', 'ایمان']
  },
  {
    id: 'qa-2',
    questionUrdu: 'وضو کے فرائض کتنے اور کون سے ہیں؟',
    questionEn: 'What are the four obligatory steps (Faraid) of Wudu?',
    answerUrdu: 'قرآن مجید کی سورۃ المائدہ آیت 6 کے مطابق وضو کے چار فرائض ہیں: 1. پیشانی کے بالوں سے ٹھوڑی کے نیچے تک اور ایک کان کی لو سے دوسرے کان کی لو تک پورا چہرہ دھونا۔ 2. دونوں ہاتھوں کو کہنیوں سمیت دھونا۔ 3. چوتھائی سر کا مسح کرنا۔ 4. دونوں پاؤں کو ٹخنوں سمیت دھونا۔',
    answerEn: 'According to Surah Al-Ma\'idah (5:6), there are four fundamental obligatory acts (Faraid) of Wudu: 1. Washing the face from the hairline to below the chin and from earlobe to earlobe. 2. Washing both arms including the elbows. 3. Wiping over the head (Masah). 4. Washing both feet up to and including the ankles.',
    category: 'Salah',
    reference: 'Surah Al-Ma\'idah 5:6',
    tags: ['Wudu', 'Cleanliness', 'Purity', 'وضو', 'طہارت', 'نماز']
  },
  {
    id: 'qa-3',
    questionUrdu: 'نماز قصر کب اور کن حالات میں ادا کی جاتی ہے؟',
    questionEn: 'When and under what conditions is Qasr (shortened prayer) performed?',
    answerUrdu: 'جب کوئی مسلمان شرعی مسافت (تقریباً 77-78 کلومیٹر یا 48 میل) کے سفر کی نیت سے اپنے شہر کی حدود سے باہر نکلے اور جہاں وہ 15 دن سے کم قیام کا ارادہ رکھتا ہو، تو وہ 4 رکعت والی فرض نمازوں (ظہر، عصر، عشاء) کو قصر کر کے 2 رکعت پڑھے گا۔ فجر اور مغرب میں قصر نہیں ہوتی۔ یہ اللہ کی طرف سے بندوں کے لیے رخصت اور رحمت ہے۔',
    answerEn: 'When a Muslim travels the Shar\'i distance (approximately 77-80 km or 48+ miles) outside their city limits intending to stay less than 15 days, they shorten four-unit obligatory prayers (Dhuhr, Asr, and Isha) to two units. Fajr and Maghrib are never shortened. This is a divine concession and mercy from Allah.',
    category: 'Salah',
    reference: 'Surah An-Nisa 4:101, Sahih Muslim 686',
    tags: ['Qasr', 'Travel', 'Prayer', 'قصر', 'مسافر']
  },
  {
    id: 'qa-4',
    questionUrdu: 'صدقہ فطر (فطرانہ) کس پر واجب ہے اور کب ادا کرنا چاہیے؟',
    questionEn: 'Upon whom is Sadaqatul Fitr obligatory and when should it be paid?',
    answerUrdu: 'صدقہ فطر ہر اس صاحبِ استطاعت مسلمان پر واجب ہے جس کے پاس عید کے دن بنیادی ضروریات سے زائد نصاب کے برابر مال موجود ہو۔ ہر سربراہ اپنے اور اپنے زیر کفالت چھوٹے بچوں کی طرف سے بھی ادا کرے گا۔ اس کی ادائیگی کا بہترین وقت عید الفطر کی نماز سے پہلے ہے، تاکہ مساکین اور ضرورت مند بھی عید کی خوشیوں میں شریک ہو سکیں۔',
    answerEn: 'Sadaqatul Fitr is obligatory upon every capable Muslim who possesses wealth beyond basic needs on Eid day, paid for oneself and dependent children. It is preferably discharged before the Eid prayer so that underprivileged families may celebrate Eid with dignity.',
    category: 'Fasting',
    reference: 'Sahih al-Bukhari 1503, Sahih Muslim 984',
    tags: ['Zakat', 'Fitr', 'Ramadan', 'Eid', 'فطرانہ', 'صدقہ']
  },
  {
    id: 'qa-5',
    questionUrdu: 'والدین کے ساتھ حسن سلوک (بر الوالدین) کی اسلام میں کیا اہمیت ہے؟',
    questionEn: 'What is the significance of Birr al-Walidayn (kindness to parents) in Islam?',
    answerUrdu: 'قرآن مجید میں اللہ تعالیٰ نے توحید کے فوراً بعد والدین کے ساتھ حسن سلوک کا حکم فرمایا ہے ("اور تمہارے رب نے فیصلہ فرما دیا کہ تم اس کے سوا کسی کی بندگی نہ کرو اور والدین کے ساتھ بھلائی کرو")۔ والدین کے سامنے "اُف" تک کہنا بھی منع ہے۔ ماں کے قدموں تلے جنت ہے اور باپ کی رضا میں اللہ کی رضا ہے۔',
    answerEn: 'In multiple Quranic verses, Allah commands devotion to parents immediately after monotheism (Surah Al-Isra 17:23). Showing disrespect even by sighing ("Uff") is forbidden. Treating parents with compassion, dignity, and gentle service is one of the highest pathways to Jannah in Islam.',
    category: 'Family',
    reference: 'Surah Al-Isra 17:23-24, Sahih al-Bukhari 5971',
    tags: ['Parents', 'Family', 'Manners', 'والدین', 'اخلاق']
  },
  {
    id: 'qa-6',
    questionUrdu: 'سجدہ سہو کا کیا طریقہ ہے اور یہ کن اسباب سے واجب ہوتا ہے؟',
    questionEn: 'What is the method and purpose of Sujud as-Sahw (prostration of forgetfulness)?',
    answerUrdu: 'نماز میں بھول چوک کی تلافی کے لیے سجدہ سہو کیا جاتا ہے، مثلاً کسی واجب کو بھول کر چھوڑ دینا یا تاخیر کرنا۔ طریقہ: آخری قعدہ میں التحیات کے بعد دائیں طرف سلام پھیریں، پھر تکبیر کہتے ہوئے دو سجدے کریں، دوبارہ تشہد، درود شریف اور دعا پڑھ کر دونوں طرف سلام پھیر دیں۔',
    answerEn: 'Sujud as-Sahw compensates for unintentional deficiencies, delays, or additions of obligatory (Wajib) elements during prayer. In the final sitting after Tashahhud, make Tasleem to the right, perform two prostrations with Takbeer, sit back, complete Tashahhud, Durood, and dua, and make final Tasleem to both sides.',
    category: 'Salah',
    reference: 'Sahih al-Bukhari 1226, Sahih Muslim 572',
    tags: ['Sujud Sahw', 'Salah', 'Prayer', 'سجدہ سہو']
  },
  {
    id: 'qa-7',
    questionUrdu: 'نمازِ تہجد (قیام اللیل) کی کیا فضیلت، وقت اور مسنون طریقہ ہے؟',
    questionEn: 'What is the virtue, time, and recommended method of Tahajjud (Night Prayer)?',
    answerUrdu: 'تہجد فرض نمازوں کے بعد تمام نفل نمازوں میں سب سے افضل نماز ہے۔ اس کا مستحب وقت رات کا آخری تہائی حصہ ہے جب انسان کچھ دیر سو کر بیدار ہو۔ طریقہ: کم از کم 2 رکعت اور عام طور پر 8 یا 12 رکعت دو دو کر کے ادا کی جاتی ہے اور آخر میں وتر پڑھے جاتے ہیں۔ قرآن مجید میں اللہ نے اس کی پابندی کرنے والوں کے لیے مقامِ محمود اور عظیم اجر کا وعدہ فرمایا ہے۔',
    answerEn: 'Tahajjud is the most virtuous voluntary prayer after the obligatory prayers. Its best time is the final third of the night after waking from sleep. Method: Prayed in sets of two Rak\'ahs (minimum 2, commonly 8), concluding with Witr. Allah promises a station of praise and honor (Maqam Mahmood) for those who observe it diligently.',
    category: 'Salah',
    reference: 'Surah Al-Isra 17:79, Sahih al-Bukhari 1145, Sahih Muslim 758',
    tags: ['Tahajjud', 'Qiyam al-Layl', 'Salah', 'تہجد', 'نماز']
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-first-step',
    title: 'First Step',
    titleUrdu: 'پہلا قدم',
    description: 'Completed your first Islamic Quiz session in IslamIQ',
    descriptionUrdu: 'پہلا کوئز کامیابی سے مکمل کیا',
    icon: 'Sparkles',
    unlocked: true,
    category: 'quiz'
  },
  {
    id: 'b-salah-guardian',
    title: 'Prayer Guardian',
    titleUrdu: 'محافظ نماز',
    description: 'Logged all 5 obligatory daily prayers for a full day',
    descriptionUrdu: 'ایک دن کی تمام 5 نمازیں وقت پر ادا کیں',
    icon: 'Flame',
    unlocked: false,
    category: 'prayer'
  },
  {
    id: 'b-tasbih-master',
    title: 'Tasbih Devotee',
    titleUrdu: 'ذاکر و شاغل',
    description: 'Completed 100+ counts of Dhikr with reflection',
    descriptionUrdu: '100 سے زیادہ بار اللہ کا ذکر تسبیح پر مکمل کیا',
    icon: 'HeartHandshake',
    unlocked: false,
    category: 'tasbih'
  },
  {
    id: 'b-streak-3',
    title: 'Consistent Seeker',
    titleUrdu: 'مستقل مزاج طالب',
    description: 'Maintained a 3-day active learning streak',
    descriptionUrdu: 'مسلسل 3 دن تک روزانہ سیکھنے کی عادت قائم رکھی',
    icon: 'Trophy',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'b-quiz-champion',
    title: 'Knowledge Star',
    titleUrdu: 'ستارہ علم',
    description: 'Scored 100% on any Advanced or Kids Quiz',
    descriptionUrdu: 'کسی بھی کوئز میں مکمل 100 فیصد نمبر حاصل کیے',
    icon: 'Award',
    unlocked: false,
    category: 'quiz'
  }
];

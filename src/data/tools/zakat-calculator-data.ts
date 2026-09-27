/**
 * IslamIQ — Zakat Calculator Educational Data & Metadata
 */

export interface ZakatCalculatorFAQ {
  questionEn: string;
  questionUrdu: string;
  answerEn: string;
  answerUrdu: string;
  reference?: string;
}

export interface ZakatCalculatorData {
  h1En: string;
  h1Urdu: string;
  subtitleEn: string;
  subtitleUrdu: string;
  nisabExplanationEn: string;
  nisabExplanationUrdu: string;
  hawlExplanationEn: string;
  hawlExplanationUrdu: string;
  scholarlyDisclaimerEn: string;
  scholarlyDisclaimerUrdu: string;
  faqs: ZakatCalculatorFAQ[];
}

export const ZAKAT_CALCULATOR_DATA: ZakatCalculatorData = {
  h1En: 'Zakat Calculator (Nisab, Cash, Gold, Silver & Trade Assets)',
  h1Urdu: 'زکوٰۃ کیلکولیٹر • نصاب، نقد رقم، سونا، چاندی اور کاروباری مال کا حساب',
  subtitleEn: 'Calculate your obligatory 2.5% Zakat easily with customizable gold/silver prices, Nisab threshold detection, liability deductions, and instant breakdown.',
  subtitleUrdu: 'سونے چاندی کی موجودہ قیمت، نصاب کی جانچ، نقد رقم اور تجارتی سامان پر ڈھائی فیصد (2.5%) زکوٰۃ کا آسان اور شرعی طریقہ حساب۔',
  nisabExplanationEn: 'Nisab is the minimum threshold of surplus wealth a Muslim must possess for one lunar year before Zakat becomes obligatory. The Prophet Muhammad ﷺ established two benchmarks: Gold (20 Dinars / Mithqals ≈ 85 grams / 7.5 tolas) and Silver (200 Dirhams ≈ 595 grams / 52.5 tolas). Today, because silver is priced lower, many contemporary jurists and Islamic councils recommend adopting the Silver Nisab for cash, savings, and mixed liquid assets so that more impoverished individuals qualify for assistance. If you possess solely pure gold, the Gold standard is applied.',
  nisabExplanationUrdu: 'نصاب مال کی وہ کم از کم حد ہے جس پر سال گزرنے کے بعد زکوٰۃ فرض ہوتی ہے۔ رسول اللہ ﷺ نے دو پیمانے مقرر فرمائے: ۱) سونا (۲۰ دینار یعنی ۸۵ گرام / ساڑھے سات تولے) اور ۲) چاندی (۲۰۰ درہم یعنی ۵۹۵ گرام / ساڑھے باون تولے)۔ موجودہ دور میں اکثر علماء اور فقہی کونسلز نقد رقم اور تجارتی مال کے لیے چاندی کا نصاب اختیار کرنے کا مشورہ دیتے ہیں تاکہ غریبوں کو زیادہ نفع پہنچے۔ اگر کسی کے پاس صرف سونا ہو تو سونے کا نصاب لاگو ہوتا ہے۔',
  hawlExplanationEn: 'Hawl (حولانِ حول) is the condition of holding wealth equal to or exceeding the Nisab threshold for one full lunar year (approximately 354 days). The Prophet ﷺ said: "There is no Zakat upon wealth until a full year has passed over it" (Sunan Abi Dawud 1573, Sunan Ibn Majah 1792). Short-term fluctuations within the year do not reset the Hawl according to the majority of jurists, provided the threshold is met at the beginning and the end of the Zakat year.',
  hawlExplanationUrdu: 'حولانِ حول سے مراد نصاب کے مال پر ایک مکمل قمری سال (۳۵۴ دن) کا گزر جانا ہے۔ نبی کریم ﷺ نے فرمایا: "کسی مال پر اس وقت تک زکوٰۃ نہیں جب تک کہ اس پر سال نہ گزر جائے" (سنن ابی داؤد: ۱۵۷۳)۔ جمہور فقہاء کے نزدیک اگر سال کے شروع اور آخر میں مال نصاب کے برابر یا زائد ہو تو سال کے دوران کے معمولی اتار چڑھاؤ سے حساب نہیں ٹوٹتا۔',
  scholarlyDisclaimerEn: 'Notice & Scholarly Disclaimer: This calculator provides an educational baseline based on standard fiqh principles (2.5% on net surplus wealth). Real-life financial portfolios involving long-term mortgages, retirement pensions, 401(k)/provident funds, rental property depreciation, and corporate equities contain nuanced rulings with scholarly differences across Islamic schools of jurisprudence. For definitive rulings tailored to your specific financial situation, please consult a qualified Islamic scholar or local Mufti.',
  scholarlyDisclaimerUrdu: 'شرعی وضاحتی بیان: یہ کیلکولیٹر عمومی فقہی اصولوں (خالص قابلِ زکوٰۃ بچت پر ۲.۵ فیصد) پر مبنی معلوماتی رہنمائی فراہم کرتا ہے۔ طویل مدتی قرضوں، پراویڈنٹ فنڈ، پنشن، کرائے کی جائیداد اور کمپنی کے شیئرز سے متعلق جزئیات میں فقہاء کے درمیان مختلف آراء پائی جاتی ہیں۔ اپنے ذاتی اور پیچیدہ مالی معاملات میں حتمی شرعی رہنمائی کے لیے کسی مستند مفتی یا جید عالمِ دین سے رجوع فرمائیں۔',
  faqs: [
    {
      questionEn: 'How is the Nisab threshold calculated?',
      questionUrdu: 'زکوٰۃ کا نصاب کیسے معلوم کیا جاتا ہے؟',
      answerEn: 'Nisab is determined by multiplying the standard weight of gold (85 grams) or silver (595 grams) by the current local market price per gram. For example, if silver is $1.00 per gram, the Silver Nisab is $595. If gold is $80 per gram, the Gold Nisab is $6,800. Net zakatable wealth exceeding this threshold is subject to 2.5% Zakat.',
      answerUrdu: 'سونے یا چاندی کے مقررہ وزن (۸۵ گرام سونا یا ۵۹۵ گرام چاندی) کو مارکیٹ میں فی گرام کی موجودہ قیمت سے ضرب دے کر نصاب کی مالی مالیت معلوم کی جاتی ہے۔ اگر کسی کے پاس اس مالیت کے برابر یا زائد قابلِ زکوٰۃ مال موجود ہو تو اس پر زکوٰۃ واجب ہوتی ہے۔'
    },
    {
      questionEn: 'Can I deduct long-term home mortgages or car loans?',
      questionUrdu: 'کیا مکان یا گاڑی کا طویل مدتی قرض زکوٰۃ سے منہا کیا جا سکتا ہے؟',
      answerEn: 'According to the majority of contemporary Islamic jurisprudence councils (including the OIC Islamic Fiqh Academy and AAOIFI), long-term debts due over 10 to 30 years cannot be deducted in their entirety from liquid wealth. Only the immediate debt installments due right now or within the current month/year can be deducted.',
      answerUrdu: 'عصرِ حاضر کی اکثر فقہی اکیڈمیز اور علماء کے مطابق ۲۰ یا ۳۰ سال کے طویل مدتی قرضوں کو یکمشت منہا نہیں کیا جا سکتا، بلکہ صرف موجودہ مہینے یا سال کی فوری واجب الادا قسط کو ہی منہا کیا جاتا ہے۔'
    },
    {
      questionEn: 'Is Zakat due on personal use items like clothes, car, or home?',
      questionUrdu: 'کیا ذاتی استعمال کے مکان، گاڑی، فرنیچر یا کپڑوں پر زکوٰۃ ہے؟',
      answerEn: 'No. Primary personal necessities (Hajah Asliyyah) including the house you live in, personal transportation (car), household furniture, personal clothing, and tools used for one\'s profession are completely exempt from Zakat, regardless of their market value (Ref: Sahih al-Bukhari 1463).',
      answerUrdu: 'ہرگز نہیں۔ انسان کی بنیادی ضروریاتِ زندگی (حاجتِ اصلیہ) مثلاً رہائشی مکان، ذاتی سواری، گھریلو سامان، کپڑے اور پیشے کے اوزار پر زکوٰۃ فرض نہیں ہے، چاہے ان کی قیمت کتنی ہی زیادہ کیوں نہ ہو (صحیح بخاری: ۱۴۶۳)۔'
    },
    {
      questionEn: 'Who is eligible to receive Zakat?',
      questionUrdu: 'زکوٰۃ کن لوگوں کو دی جا سکتی ہے (مصارفِ زکوٰۃ کیا ہیں)؟',
      answerEn: 'Allah specifies 8 categories of eligible Zakat recipients in Surah At-Tawbah (9:60): 1) The poor (Fuqara), 2) The needy (Masakin), 3) Zakat administrators, 4) Those whose hearts are to be reconciled, 5) Freeing captives/slaves, 6) Those overwhelmed by debt (Gharimin), 7) In the cause of Allah (Fi Sabilillah), and 8) The stranded traveler (Ibn as-Sabil). Zakat cannot be given to immediate ascendants (parents, grandparents) or descendants (children, grandchildren), or to one\'s spouse.',
      answerUrdu: 'قرآن مجید کی سورۃ التوبہ (آیت: ۶۰) میں زکوٰۃ کے ۸ مصارف بیان کیے گئے ہیں: فقراء، مساکین، عاملینِ زکوٰۃ، مؤلفۃ القلوب، گردنیں چھڑانے کے لیے، مقروض لوگ، فی سبیل اللہ، اور مسافر۔ زکوٰۃ اپنے والدین، دادا دادی، اولاد، پوتے پوتیوں اور شریکِ حیات (بیوی/شوہر) کو نہیں دی جا سکتی۔'
    }
  ]
};

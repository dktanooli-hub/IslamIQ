import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { BookOpen, HelpCircle, CheckSquare, Sparkles, Compass, Heart, Droplets, ArrowRight, ArrowLeft } from 'lucide-react';

interface RelatedLearningItem {
  id: AppTab;
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  icon: React.ElementType;
}

interface RelatedIslamicLearningProps {
  currentTab: AppTab;
}

export const RelatedIslamicLearning: React.FC<RelatedIslamicLearningProps> = ({ currentTab }) => {
  const { setActiveTab, contentLang } = useApp();
  const isUrdu = contentLang === 'urdu';

  const items: RelatedLearningItem[] = [
    {
      id: 'islamic-quiz',
      titleEn: 'Islamic Quiz',
      titleUrdu: 'اسلامی کوئز',
      descEn: 'Test your Islamic knowledge with authentic multiple choice questions.',
      descUrdu: 'مستند سوال و جواب کے ساتھ اپنے اسلامی علم کی جانچ کریں۔',
      icon: HelpCircle,
    },
    {
      id: 'kids-islamic-quiz',
      titleEn: 'Kids Islamic Quiz',
      titleUrdu: 'بچوں کے اسلامی سوالات',
      descEn: 'Engaging, friendly questions tailored for young Muslim learners.',
      descUrdu: 'بچوں کے لیے آسان اور دلچسپ اسلامی سوالات اور کہانیاں۔',
      icon: Sparkles,
    },
    {
      id: 'islamic-questions-answers',
      titleEn: 'Islamic Questions & Answers',
      titleUrdu: 'اسلامی سوال جواب',
      descEn: 'Browse categorized Q&A on Aqeedah, Salah, Quran, and Hadith.',
      descUrdu: 'عقائد، نماز، قرآن اور اخلاق پر مستند سوالات و جوابات۔',
      icon: BookOpen,
    },
    {
      id: 'daily-quran-verse',
      titleEn: 'Daily Quran Verse',
      titleUrdu: 'روزانہ کی قرآنی آیت',
      descEn: 'Read and reflect upon authentic Quranic verses with translations.',
      descUrdu: 'روزانہ قرآنی آیات کا مطالعہ، عربی متن اور اردو ترجمہ۔',
      icon: BookOpen,
    },
    {
      id: 'daily-hadith',
      titleEn: 'Daily Hadith',
      titleUrdu: 'روزانہ کی حدیث مبارکہ',
      descEn: 'Authentic Sahih hadiths with narration and practical takeaways.',
      descUrdu: 'صحیح بخاری و مسلم سے احادیث مبارکہ اور عملی اسباق۔',
      icon: Heart,
    },
    {
      id: 'daily-dua',
      titleEn: 'Daily Dua & Adhkar',
      titleUrdu: 'روزانہ کی مسنون دعائیں',
      descEn: 'Essential morning, evening, and routine duas with authentic references.',
      descUrdu: 'صبح و شام اور روزمرہ کی مسنون دعائیں اور ترجمہ۔',
      icon: Sparkles,
    },
    {
      id: 'salah-learning',
      titleEn: 'Salah Learning & Prayer Habit',
      titleUrdu: 'نماز سیکھیں اور پابندی کریں',
      descEn: 'Learn the steps of prayer, timings, and build a lasting habit.',
      descUrdu: 'نماز کے طریقے، شرائط، فرائض اور پابندی کا ٹریکر۔',
      icon: CheckSquare,
    },
    {
      id: 'islamic-general-knowledge',
      titleEn: 'Islamic General Knowledge',
      titleUrdu: 'اسلامی جنرل نالج',
      descEn: 'Key facts on Islamic history, the Prophets, Seerah, and Sahabah.',
      descUrdu: 'اسلامی تاریخ، انبیاء کرام علیہم السلام، سیرت النبیﷺ اور صحابہ کرام۔',
      icon: Compass,
    },
    {
      id: 'how-to-perform-salah',
      titleEn: 'How to Perform Salah (Namaz)',
      titleUrdu: 'نماز کا مکمل طریقہ',
      descEn: 'Step-by-step prayer guide with recitations and authentic Hadith.',
      descUrdu: 'تکبیر سے سلام تک نماز کا مکمل طریقہ اور مسنون دعائیں۔',
      icon: CheckSquare,
    },
    {
      id: 'how-to-perform-wudu',
      titleEn: 'How to Perform Wudu',
      titleUrdu: 'وضو کا مسنون طریقہ',
      descEn: 'Learn the 4 Quranic obligations, full Sunnah method, and nullifiers.',
      descUrdu: 'وضو کے ۴ فرائض، سنتیں، دعائیں اور توڑنے والی چیزیں۔',
      icon: Droplets,
    },
    {
      id: '5-pillars-of-islam',
      titleEn: '5 Pillars of Islam Explained',
      titleUrdu: 'اسلام کے ۵ بنیادی ارکان',
      descEn: 'Foundations of Islamic belief and practice with Quran and Hadith proofs.',
      descUrdu: 'کلمہ شہادت، نماز، زکوٰۃ، روزہ اور حج کی جامع قرآنی وضاحت۔',
      icon: Compass,
    },
  ];

  // Filter out the current active tab to show 3-4 other related links
  const related = items.filter((item) => item.id !== currentTab).slice(0, 4);

  return (
    <section className="mt-10 pt-6 border-t border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>{isUrdu ? 'متعلقہ اسلامی سیکھنے کے عنوانات (Related Learning)' : 'Related Islamic Learning'}</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {related.map((item) => {
          const IconComp = item.icon;
          return (
            <a
              key={item.id}
              href={`/${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all text-left group"
            >
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <IconComp className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                    {isUrdu ? item.titleUrdu : item.titleEn}
                  </h4>
                  {isUrdu ? (
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {isUrdu ? item.descUrdu : item.descEn}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};

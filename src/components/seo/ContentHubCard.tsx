import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import { HelpCircle, Sparkles, BookOpen, CheckSquare, Heart, Compass, ArrowRight, ArrowLeft } from 'lucide-react';

export const ContentHubCard: React.FC = () => {
  const { setActiveTab, contentLang } = useApp();
  const isUrdu = contentLang === 'urdu';

  const hubLinks: { id: AppTab; titleUrdu: string; titleEn: string; descUrdu: string; descEn: string; icon: React.ElementType }[] = [
    {
      id: 'islamic-quiz',
      titleUrdu: 'اسلامی کوئز سوالات',
      titleEn: 'Islamic Quiz Hub',
      descUrdu: 'مستند سوال و جواب، ارکان و سیرت',
      descEn: 'Authentic MCQs with references',
      icon: HelpCircle,
    },
    {
      id: 'kids-islamic-quiz',
      titleUrdu: 'بچوں کے اسلامی سوالات',
      titleEn: 'Kids Islamic Quiz',
      descUrdu: 'آسان سوالات اور اشارے',
      descEn: 'Fun quizzes tailored for kids',
      icon: Sparkles,
    },
    {
      id: 'islamic-questions-answers',
      titleUrdu: 'اسلامی سوال جواب',
      titleEn: 'Islamic Q&A Library',
      descUrdu: 'عقائد و نماز کے تفصیلی جوابات',
      descEn: 'Verified answers on daily deen',
      icon: BookOpen,
    },
    {
      id: 'daily-quran-verse',
      titleUrdu: 'روزانہ کی قرآنی آیت',
      titleEn: 'Daily Quran Verse',
      descUrdu: 'عربی متن، ترجمہ و تفسیر',
      descEn: 'Ayah of the day with translation',
      icon: BookOpen,
    },
    {
      id: 'daily-hadith',
      titleUrdu: 'روزانہ کی حدیث مبارکہ',
      titleEn: 'Daily Hadith',
      descUrdu: 'صحیح احادیث اور عملی اسباق',
      descEn: 'Sahih hadith with daily lessons',
      icon: Heart,
    },
    {
      id: 'daily-dua',
      titleUrdu: 'روزانہ کی مسنون دعائیں',
      titleEn: 'Daily Masnoon Dua',
      descUrdu: 'صبح و شام کی دعائیں بمعہ حوالہ',
      descEn: 'Authentic daily supplications',
      icon: Sparkles,
    },
    {
      id: 'salah-learning',
      titleUrdu: 'نماز سیکھیں اور اوقات',
      titleEn: 'Namaz & Salah Guide',
      descUrdu: '5 وقت کی نماز کے ارکان و رکعتیں',
      descEn: 'Steps, rakats and timings',
      icon: CheckSquare,
    },
    {
      id: 'islamic-general-knowledge',
      titleUrdu: 'اسلامی جنرل نالج',
      titleEn: 'Islamic Knowledge',
      descUrdu: 'انبیاء، ارکان اور اسلامی تاریخ',
      descEn: 'Pillars, Prophets & Quran facts',
      icon: Compass,
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
            <BookOpen className="w-3 h-3" />
            <span>{isUrdu ? 'اسلامی نالج ہب' : 'Islamic Content Hub'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black font-serif tracking-tight text-white mt-1">
            {isUrdu ? 'مستند اسلامی سیکھنے کے رہنما عنوانات' : 'Explore Islamic Learning Guides'}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {hubLinks.map((item) => {
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
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left flex flex-col justify-between group active:scale-95 min-h-[90px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <IconComp className="w-4 h-4" />
                </div>
                {isUrdu ? (
                  <ArrowLeft className="w-3 h-3 text-emerald-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <ArrowRight className="w-3 h-3 text-emerald-300 opacity-60 group-hover:opacity-100 transition-opacity" />
                )}
              </div>

              <div className="mt-2">
                <h3 className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                  {isUrdu ? item.titleUrdu : item.titleEn}
                </h3>
                <p className="text-[10px] text-emerald-200/70 line-clamp-1 mt-0.5">
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

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppTab } from '../../types';
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  CheckSquare,
  Heart,
  Compass,
  ArrowRight,
  ArrowLeft,
  Award,
  ShieldCheck,
  Droplets,
  Moon,
  Calculator,
  Calendar,
  Share2,
  Scale,
  Layers,
  LayoutGrid
} from 'lucide-react';

type HubCategoryKey = 'all' | 'learn' | 'guides' | 'tools' | 'other';

interface HubItem {
  id: AppTab;
  category: 'learn' | 'guides' | 'tools' | 'other';
  titleUrdu: string;
  titleEn: string;
  descUrdu: string;
  descEn: string;
  icon: React.ElementType;
  badge?: string;
  badgeUrdu?: string;
}

export const ContentHubCard: React.FC = () => {
  const { setActiveTab, contentLang, setIsMoreOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<HubCategoryKey>('all');
  const isUrdu = contentLang === 'urdu';

  const hubItems: HubItem[] = [
    // LEARN
    {
      id: '5-pillars-of-islam',
      category: 'learn',
      titleUrdu: 'اسلام کے ۵ ارکان',
      titleEn: '5 Pillars of Islam',
      descUrdu: 'شہادتین، نماز، زکوٰۃ، روزہ اور حج',
      descEn: 'Shahadah, Salah, Zakat, Sawm & Hajj',
      icon: Award,
      badge: 'Core',
      badgeUrdu: 'بنیادی',
    },
    {
      id: 'six-articles-of-faith',
      category: 'learn',
      titleUrdu: 'ایمان کے ۶ ارکان',
      titleEn: '6 Articles of Faith',
      descUrdu: 'اللہ، فرشتے، کتب اور آخرت پر ایمان',
      descEn: 'Belief in Allah, Angels, Books & Qadr',
      icon: ShieldCheck,
      badge: 'Aqeedah',
      badgeUrdu: 'عقائد',
    },
    {
      id: 'seerah-of-prophet-muhammad',
      category: 'learn',
      titleUrdu: 'سیرت النبی ﷺ',
      titleEn: 'Seerah of Prophet ﷺ',
      descUrdu: 'ولادت سے وفات تک مکمل مبارک زندگی',
      descEn: 'Biography, milestones & character',
      icon: Sparkles,
    },
    {
      id: 'stories-of-the-prophets',
      category: 'learn',
      titleUrdu: 'قصص الانبیاء',
      titleEn: 'Stories of Prophets',
      descUrdu: 'انبیاء کرام کے مستند قرآنی واقعات',
      descEn: 'Authentic Quranic stories of Prophets',
      icon: Compass,
    },
    {
      id: 'hajj-umrah-guide',
      category: 'learn',
      titleUrdu: 'حج و عمرہ گائیڈ',
      titleEn: 'Hajj & Umrah Guide',
      descUrdu: 'احرام، طواف، سعی اور ارکانِ حج',
      descEn: 'Step-by-step pilgrimage rituals',
      icon: Compass,
    },
    {
      id: 'rights-in-islam',
      category: 'learn',
      titleUrdu: 'حقوق العباد',
      titleEn: 'Rights in Islam',
      descUrdu: 'والدین، اولاد، شریک حیات کے حقوق',
      descEn: 'Rights of parents, family & neighbors',
      icon: Scale,
    },
    {
      id: 'islamic-manners-for-kids',
      category: 'learn',
      titleUrdu: 'بچوں کے آداب',
      titleEn: 'Manners for Kids',
      descUrdu: 'کھانے پینے اور بات چیت کے آداب',
      descEn: 'Daily Islamic manners & adab',
      icon: Heart,
    },

    // GUIDES
    {
      id: 'how-to-perform-salah',
      category: 'guides',
      titleUrdu: 'نماز کا مسنون طریقہ',
      titleEn: 'How to Pray (Salah)',
      descUrdu: 'تکبیر سے سلام تک مکمل طریقہ',
      descEn: 'Step-by-step prayer with recitations',
      icon: CheckSquare,
      badge: 'Essential',
      badgeUrdu: 'اہم',
    },
    {
      id: 'how-to-perform-wudu',
      category: 'guides',
      titleUrdu: 'وضو کا مسنون طریقہ',
      titleEn: 'How to do Wudu',
      descUrdu: 'وضو کے فرائض، سنتیں اور آداب',
      descEn: '4 obligations, Sunnahs & nullifiers',
      icon: Droplets,
    },
    {
      id: 'ghusl-taharah-guide',
      category: 'guides',
      titleUrdu: 'غسل اور طہارت',
      titleEn: 'Ghusl & Taharah',
      descUrdu: 'غسل کے فرائض اور طہارت کے احکام',
      descEn: 'Purification bath obligations & Sunnah',
      icon: Droplets,
    },
    {
      id: 'tayammum-guide',
      category: 'guides',
      titleUrdu: 'تیمم کا طریقہ',
      titleEn: 'Tayammum Guide',
      descUrdu: 'پانی نہ ہونے کی صورت میں طہارت',
      descEn: 'Dry ablution with clean earth',
      icon: Droplets,
    },
    {
      id: 'salah-for-beginners',
      category: 'guides',
      titleUrdu: 'ابتدائی نماز گائیڈ',
      titleEn: 'Salah for Beginners',
      descUrdu: 'نئے نمازیوں کے لیے آسان رہنمائی',
      descEn: 'Gentle starter guide with transliteration',
      icon: HelpCircle,
    },
    {
      id: 'quran-learning-guide',
      category: 'guides',
      titleUrdu: 'قرآن سیکھنے کی گائیڈ',
      titleEn: 'Quran Learning Guide',
      descUrdu: 'تجوید کے اصول، مخارج اور تلاوت',
      descEn: 'Tajweed rules, pronunciation & routine',
      icon: BookOpen,
    },
    {
      id: 'hadith-learning-guide',
      category: 'guides',
      titleUrdu: 'حدیث سیکھنے کی گائیڈ',
      titleEn: 'Hadith Learning Guide',
      descUrdu: 'صحاح ستہ اور اصولِ حدیث',
      descEn: 'Kutub al-Sittah & Hadith grading',
      icon: ShieldCheck,
    },
    {
      id: 'ramadan-guide',
      category: 'guides',
      titleUrdu: 'رمضان المبارک گائیڈ',
      titleEn: 'Ramadan Guide',
      descUrdu: 'روزے کے مسائل، سحر و افطار',
      descEn: 'Fasting rules, Laylat al-Qadr & Zakat',
      icon: Moon,
    },

    // TOOLS
    {
      id: 'tasbih',
      category: 'tools',
      titleUrdu: 'ڈیجیٹل تسبیح',
      titleEn: 'Tasbih Counter',
      descUrdu: 'روزمرہ اذکار اور تسبیح کاؤنٹر',
      descEn: 'Digital bead counter with sound & dhikr',
      icon: Sparkles,
    },
    {
      id: 'qibla',
      category: 'tools',
      titleUrdu: 'قبلہ رخ کمپاس',
      titleEn: 'Qibla Direction',
      descUrdu: 'کعبہ شریف کی درست سمت معلوم کریں',
      descEn: 'Live GPS Kaaba compass',
      icon: Compass,
    },
    {
      id: 'zakat-calculator',
      category: 'tools',
      titleUrdu: 'زکوٰۃ کیلکولیٹر',
      titleEn: 'Zakat Calculator',
      descUrdu: 'سونے، چاندی اور نقدی پر زکوٰۃ',
      descEn: 'Calculate 2.5% obligation accurately',
      icon: Calculator,
      badge: 'Tool',
      badgeUrdu: 'ٹول',
    },
    {
      id: 'islamic-calendar',
      category: 'tools',
      titleUrdu: 'اسلامی کیلنڈر',
      titleEn: 'Islamic Calendar',
      descUrdu: 'ہجری و عیسوی تاریخ اور اہم ایام',
      descEn: 'Hijri & Gregorian date synchronization',
      icon: Calendar,
    },
    {
      id: 'status',
      category: 'tools',
      titleUrdu: 'اسٹیٹس میکر',
      titleEn: 'Status Creator',
      descUrdu: 'آیات و احادیث کے خوبصورت کارڈز',
      descEn: 'Design Islamic cards with references',
      icon: Share2,
    },

    // OTHER
    {
      id: 'islamic-questions-answers',
      category: 'other',
      titleUrdu: 'اسلامی سوال و جواب',
      titleEn: 'Islamic Q&A',
      descUrdu: 'عقائد و عبادات کے مستند جوابات',
      descEn: 'Verified answers on daily deen',
      icon: HelpCircle,
      badge: '50+ Q&A',
      badgeUrdu: '۵۰+ سوالات',
    },
    {
      id: 'islamic-general-knowledge',
      category: 'other',
      titleUrdu: 'اسلامی معلومات',
      titleEn: 'General Knowledge',
      descUrdu: 'انبیاء، ارکان اور قرآنی حقائق',
      descEn: 'Pillars, Prophets & Quran facts',
      icon: BookOpen,
    },
    {
      id: 'daily-quran-verse',
      category: 'other',
      titleUrdu: 'روزانہ کی قرآنی آیت',
      titleEn: 'Daily Quran Verse',
      descUrdu: 'عربی متن، ترجمہ و تفسیر',
      descEn: 'Ayah of the day with translation',
      icon: BookOpen,
    },
    {
      id: 'daily-hadith',
      category: 'other',
      titleUrdu: 'روزانہ کی حدیث مبارکہ',
      titleEn: 'Daily Hadith',
      descUrdu: 'صحیح احادیث اور عملی اسباق',
      descEn: 'Sahih hadith with daily lessons',
      icon: Heart,
    },
    {
      id: 'daily-dua',
      category: 'other',
      titleUrdu: 'روزانہ کی مسنون دعا',
      titleEn: 'Daily Masnoon Dua',
      descUrdu: 'صبح و شام کی دعائیں بمعہ حوالہ',
      descEn: 'Authentic daily supplications',
      icon: Sparkles,
    },
  ];

  const categories = [
    { key: 'all' as HubCategoryKey, labelEn: 'All Guides', labelUrdu: 'تمام عنوانات' },
    { key: 'learn' as HubCategoryKey, labelEn: 'Learn & Faith', labelUrdu: 'بنیادی عقائد' },
    { key: 'guides' as HubCategoryKey, labelEn: 'Worship Guides', labelUrdu: 'نماز و طہارت' },
    { key: 'tools' as HubCategoryKey, labelEn: 'Tools', labelUrdu: 'اسلامی ٹولز' },
    { key: 'other' as HubCategoryKey, labelEn: 'Q&A & Wisdom', labelUrdu: 'سوالات و روزمرہ' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? hubItems.slice(0, 8)
    : hubItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-4 border border-emerald-800/60">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
            <BookOpen className="w-3.5 h-3.5 text-goldAccent" />
            <span>{isUrdu ? 'اسلامی ڈائریکٹری و گائیڈز' : 'Islamic Educational Directory'}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
            {isUrdu ? 'مستند اسلامی عنوانات اور عملی ٹولز' : 'Explore Islamic Guides & Daily Tools'}
          </h2>
          <p className="text-xs text-emerald-200/80 mt-0.5">
            {isUrdu ? 'نماز، طہارت، ارکانِ اسلام، قرآنی علوم، تسبیح اور زکوٰۃ' : 'Verified step-by-step guides, worship instructions & interactive utilities'}
          </p>
        </div>

        {/* Quick button to open full More Menu Directory */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-goldAccent/20 hover:bg-goldAccent/30 text-goldAccent border border-goldAccent/40 text-xs font-bold transition-all self-start sm:self-auto active:scale-95"
          title="Open Full Directory"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'مکمل فہرست کھولیں (More ▾)' : 'View Full Directory (More ▾)'}</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 shadow-xs scale-102 font-extrabold'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white'
              }`}
            >
              {isUrdu ? cat.labelUrdu : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Grid of Crawlable Hub Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
        {filteredItems.map((item) => {
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
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-left flex flex-col justify-between group active:scale-95 min-h-[96px]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <IconComp className="w-4 h-4" />
                </div>
                {item.badge ? (
                  <span className="text-[9px] font-bold bg-goldAccent/20 text-goldAccent px-1.5 py-0.5 rounded-md border border-goldAccent/30">
                    {isUrdu ? (item.badgeUrdu || item.badge) : item.badge}
                  </span>
                ) : isUrdu ? (
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

      {/* Bottom Footer Callout */}
      {selectedCategory === 'all' && (
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/80">
          <span>{isUrdu ? 'تمام ۲۶ مستند گائیڈز اور ٹولز دریافت کریں' : 'Showing top 8 topics • 26 total guides & tools available'}</span>
          <button
            onClick={() => setIsMoreOpen(true)}
            className="text-goldAccent hover:underline font-bold text-xs"
          >
            {isUrdu ? 'سب دیکھیں ←' : 'Browse All Topics →'}
          </button>
        </div>
      )}
    </section>
  );
};

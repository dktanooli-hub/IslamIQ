import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import {
  X,
  Search,
  BookOpen,
  Sparkles,
  Compass,
  CheckSquare,
  Heart,
  Droplets,
  Moon,
  Coins,
  Calculator,
  Calendar,
  Share2,
  HelpCircle,
  Award,
  ShieldCheck,
  Scale,
  Layers,
  ChevronRight,
  Flame
} from 'lucide-react';

interface MenuItem {
  id: AppTab;
  path: string;
  titleEn: string;
  titleUrdu: string;
  descEn: string;
  descUrdu: string;
  icon: React.ElementType;
  badge?: string;
  badgeUrdu?: string;
}

interface MenuCategory {
  key: 'learn' | 'guides' | 'tools' | 'other';
  titleEn: string;
  titleUrdu: string;
  icon: React.ElementType;
  color: string;
  items: MenuItem[];
}

export const MoreMenuModal: React.FC = () => {
  const { isMoreOpen, setIsMoreOpen, activeTab, setActiveTab, contentLang, userMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const isUrdu = contentLang === 'urdu';
  const isKids = userMode === 'kids';

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMoreOpen(false);
      }
    };
    if (isMoreOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMoreOpen, setIsMoreOpen]);

  // Reset search query when menu opens
  useEffect(() => {
    if (isMoreOpen) {
      setSearchQuery('');
    }
  }, [isMoreOpen]);

  const categories: MenuCategory[] = useMemo(() => [
    {
      key: 'learn',
      titleEn: 'Learn',
      titleUrdu: 'بنیادی تعلیمات',
      icon: BookOpen,
      color: 'emerald',
      items: [
        {
          id: '5-pillars-of-islam',
          path: '/5-pillars-of-islam',
          titleEn: '5 Pillars of Islam',
          titleUrdu: 'اسلام کے ۵ ارکان',
          descEn: 'Shahadah, Salah, Zakat, Sawm, and Hajj',
          descUrdu: 'شہادتین، نماز، زکوٰۃ، روزہ اور حج',
          icon: Award,
          badge: 'Essential',
          badgeUrdu: 'بنیادی'
        },
        {
          id: 'six-articles-of-faith',
          path: '/six-articles-of-faith',
          titleEn: 'Six Articles of Faith',
          titleUrdu: 'ایمان کے ۶ ارکان',
          descEn: 'Belief in Allah, Angels, Books, Messengers, Day of Judgment & Qadr',
          descUrdu: 'اللہ، فرشتے، کتب، رسل، یومِ آخرت اور تقدیر',
          icon: ShieldCheck,
          badge: 'Aqeedah',
          badgeUrdu: 'عقائد'
        },
        {
          id: 'seerah-of-prophet-muhammad',
          path: '/seerah-of-prophet-muhammad',
          titleEn: 'Seerah of Prophet Muhammad ﷺ',
          titleUrdu: 'سیرت النبی ﷺ',
          descEn: 'Prophetic biography, milestones, and character',
          descUrdu: 'ولادت سے وفات تک مکمل مبارک زندگی اور اسباق',
          icon: Sparkles
        },
        {
          id: 'stories-of-the-prophets',
          path: '/stories-of-the-prophets',
          titleEn: 'Stories of the Prophets',
          titleUrdu: 'قصص الانبیاء',
          descEn: 'Authentic Quranic accounts: Adam, Nuh, Ibrahim, Yusuf, Musa, Isa (AS)',
          descUrdu: 'انبیاء کرام علیہم السلام کے مستند قرآنی واقعات',
          icon: Compass
        },
        {
          id: 'hajj-umrah-guide',
          path: '/hajj-umrah-guide',
          titleEn: 'Hajj & Umrah Guide',
          titleUrdu: 'حج و عمرہ گائیڈ',
          descEn: 'Ihram, Tawaf, Sa\'i, Arafat, and pilgrimage rituals',
          descUrdu: 'احرام، طواف، سعی اور ارکانِ حج کی مکمل رہنمائی',
          icon: Compass
        },
        {
          id: 'ghusl-taharah-guide',
          path: '/ghusl-taharah-guide',
          titleEn: 'Ghusl & Taharah',
          titleUrdu: 'غسل اور طہارت',
          descEn: 'Major ritual bath obligations, Sunnah, and purification',
          descUrdu: 'غسل کے فرائض، مسنون طریقہ اور طہارت کے احکام',
          icon: Droplets
        },
        {
          id: 'tayammum-guide',
          path: '/tayammum-guide',
          titleEn: 'Tayammum (Dry Ablution)',
          titleUrdu: 'تیمم کا طریقہ',
          descEn: 'Purification with clean earth when water is unavailable',
          descUrdu: 'پانی نہ ہونے کی صورت میں پاک مٹی سے طہارت',
          icon: Droplets
        },
        {
          id: 'rights-in-islam',
          path: '/rights-in-islam',
          titleEn: 'Rights in Islam (Huqooq-ul-Ibad)',
          titleUrdu: 'اسلام میں حقوق العباد',
          descEn: 'Rights of parents, spouses, children, neighbors & workers',
          descUrdu: 'والدین، اولاد، شریکِ حیات اور پڑوسیوں کے حقوق',
          icon: Scale
        },
        {
          id: 'islamic-manners-for-kids',
          path: '/islamic-manners-for-kids',
          titleEn: 'Islamic Manners for Kids',
          titleUrdu: 'بچوں کے اسلامی آداب',
          descEn: 'Daily Adab, eating etiquette, greetings, and kindness',
          descUrdu: 'بچوں کے اخلاق، کھانے پینے اور بات چیت کے آداب',
          icon: Heart,
          badge: 'Kids',
          badgeUrdu: 'بچوں کے لیے'
        }
      ]
    },
    {
      key: 'guides',
      titleEn: 'Guides',
      titleUrdu: 'رہنما گائیڈز',
      icon: Layers,
      color: 'teal',
      items: [
        {
          id: 'how-to-perform-salah',
          path: '/how-to-perform-salah',
          titleEn: 'How to Perform Salah',
          titleUrdu: 'نماز کا مسنون طریقہ',
          descEn: 'Complete step-by-step prayer guide with recitations',
          descUrdu: 'تکبیر سے سلام تک نماز کا مکمل طریقہ اور مسنون دعائیں',
          icon: CheckSquare,
          badge: 'Core',
          badgeUrdu: 'اہم'
        },
        {
          id: 'how-to-perform-wudu',
          path: '/how-to-perform-wudu',
          titleEn: 'How to Perform Wudu',
          titleUrdu: 'وضو کا مسنون طریقہ',
          descEn: '4 Quranic obligations, Sunnah method, and nullifiers',
          descUrdu: 'وضو کے ۴ فرائض، سنتیں اور وضو توڑنے والی چیزیں',
          icon: Droplets
        },
        {
          id: 'salah-for-beginners',
          path: '/salah-for-beginners',
          titleEn: 'Salah for Beginners',
          titleUrdu: 'ابتدائی نماز گائیڈ',
          descEn: 'Phonetic transliterations, rakat charts, and gentle advice',
          descUrdu: 'نئے نمازیوں کے لیے آسان صوتی تلفظ اور رکعتوں کی چارٹ',
          icon: HelpCircle
        },
        {
          id: 'quran-learning-guide',
          path: '/quran-learning-guide',
          titleEn: 'Quran Learning Guide',
          titleUrdu: 'قرآن سیکھنے کی گائیڈ',
          descEn: 'Tajweed rules, pronunciation, and daily reading routine',
          descUrdu: 'تجوید کے اصول، مخارج اور تلاوت کے آداب',
          icon: BookOpen
        },
        {
          id: 'hadith-learning-guide',
          path: '/hadith-learning-guide',
          titleEn: 'Hadith Learning Guide',
          titleUrdu: 'حدیث سیکھنے کی گائیڈ',
          descEn: 'Kutub al-Sittah, Sahih/Hasan grading, and Hadith sciences',
          descUrdu: 'صحاح ستہ کا تعارف اور اصولِ حدیث',
          icon: ShieldCheck
        },
        {
          id: 'ramadan-guide',
          path: '/ramadan-guide',
          titleEn: 'Ramadan Guide',
          titleUrdu: 'رمضان المبارک گائیڈ',
          descEn: 'Fasting rules, Suhoor, Iftar, Laylat al-Qadr & Zakat al-Fitr',
          descUrdu: 'روزے کے مسائل، سحر و افطار اور صدقۃ الفطر',
          icon: Moon
        }
      ]
    },
    {
      key: 'tools',
      titleEn: 'Tools',
      titleUrdu: 'اسلامی ٹولز',
      icon: Sparkles,
      color: 'amber',
      items: [
        {
          id: 'tasbih',
          path: '/tasbih',
          titleEn: 'Tasbih Counter',
          titleUrdu: 'ڈیجیٹل تسبیح کاؤنٹر',
          descEn: 'Digital bead counter with sound, vibration & daily dhikr',
          descUrdu: 'آواز اور وائبریشن کے ساتھ روزمرہ اذکار و تسبیح',
          icon: Sparkles
        },
        {
          id: 'qibla',
          path: '/qibla',
          titleEn: 'Qibla Direction',
          titleUrdu: 'قبلہ رخ کمپاس',
          descEn: 'Real-time Kaaba compass using device sensors and GPS',
          descUrdu: 'خانہ کعبہ کی درست سمت معلوم کرنے کا کمپاس',
          icon: Compass,
          badge: 'Compass',
          badgeUrdu: 'کمپاس'
        },
        {
          id: 'zakat-calculator',
          path: '/zakat-calculator',
          titleEn: 'Zakat Calculator',
          titleUrdu: 'زکوٰۃ کیلکولیٹر',
          descEn: 'Calculate 2.5% obligation on cash, gold, silver & trade assets',
          descUrdu: 'سونے، چاندی اور نقدی پر زکوٰۃ معلوم کرنے کا ٹول',
          icon: Calculator,
          badge: 'Calculator',
          badgeUrdu: 'حساب'
        },
        {
          id: 'islamic-calendar',
          path: '/islamic-calendar',
          titleEn: 'Islamic Calendar',
          titleUrdu: 'اسلامی ہجری کیلنڈر',
          descEn: 'Hijri & Gregorian date synchronization and Islamic milestones',
          descUrdu: 'ہجری و عیسوی تاریخ، سنت روزے اور اہم اسلامی ایام',
          icon: Calendar
        },
        {
          id: 'status',
          path: '/status',
          titleEn: 'Islamic Status Creator',
          titleUrdu: 'اسلامی اسٹیٹس میکر',
          descEn: 'Design and share beautiful Islamic cards with references',
          descUrdu: 'آیات و احادیث پر مبنی خوبصورت کارڈز تیار کریں',
          icon: Share2
        }
      ]
    },
    {
      key: 'other',
      titleEn: 'Other',
      titleUrdu: 'دیگر موضوعات',
      icon: HelpCircle,
      color: 'indigo',
      items: [
        {
          id: 'islamic-questions-answers',
          path: '/islamic-questions-answers',
          titleEn: 'Islamic Questions & Answers',
          titleUrdu: 'اسلامی سوال و جواب',
          descEn: 'Verified rulings on Aqeedah, Salah, Fasting and daily deen',
          descUrdu: 'عقائد، عبادات اور روزمرہ مسائل کے مستند جوابات',
          icon: HelpCircle,
          badge: '50+ Q&A',
          badgeUrdu: '۵۰+ سوالات'
        },
        {
          id: 'islamic-general-knowledge',
          path: '/islamic-general-knowledge',
          titleEn: 'Islamic General Knowledge',
          titleUrdu: 'اسلامی جنرل نالج',
          descEn: 'Prophets, Quran statistics, and Islamic historical milestones',
          descUrdu: 'قرآنی حقائق، انبیاء اور اسلامی تاریخ کا جامع خزانہ',
          icon: BookOpen
        },
        {
          id: 'daily-quran-verse',
          path: '/daily-quran-verse',
          titleEn: 'Daily Quran Verse',
          titleUrdu: 'روزانہ کی قرآنی آیت',
          descEn: 'Arabic calligraphy, translations, reflections & full archive',
          descUrdu: 'روزانہ قرآنی آیات کا مطالعہ، عربی متن اور اردو ترجمہ',
          icon: BookOpen
        },
        {
          id: 'daily-hadith',
          path: '/daily-hadith',
          titleEn: 'Daily Hadith',
          titleUrdu: 'روزانہ کی صحیح حدیث',
          descEn: 'Sahih Bukhari & Muslim narrations with practical takeaways',
          descUrdu: 'صحیح بخاری و مسلم سے منتخب احادیث اور عملی اسباق',
          icon: Heart
        },
        {
          id: 'daily-dua',
          path: '/daily-dua',
          titleEn: 'Daily Dua',
          titleUrdu: 'روزانہ کی مسنون دعا',
          descEn: 'Morning, evening, and routine supplications from Sunnah',
          descUrdu: 'صبح و شام اور روزمرہ کی مسنون دعائیں اور حوالہ جات',
          icon: Sparkles
        },
        {
          id: 'zakat-basics',
          path: '/zakat-basics',
          titleEn: 'Zakat Basics',
          titleUrdu: 'زکوٰۃ کے بنیادی احکام',
          descEn: 'Nisab thresholds, Hawl requirement, and 8 Quranic recipients',
          descUrdu: 'زکوٰۃ کا نصاب، سال گزرنے کی شرط اور مصارف',
          icon: Coins
        }
      ]
    }
  ], []);

  // Filter items based on user search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase().trim();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.titleEn.toLowerCase().includes(q) ||
            item.titleUrdu.toLowerCase().includes(q) ||
            item.descEn.toLowerCase().includes(q) ||
            item.descUrdu.toLowerCase().includes(q) ||
            item.path.toLowerCase().includes(q)
        )
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery]);

  if (!isMoreOpen) return null;

  const handleNavigate = (tab: AppTab) => {
    setActiveTab(tab);
    setIsMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="more-menu-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsMoreOpen(false)}
    >
      <div
        className="w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 sm:px-7 py-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-goldAccent font-black font-serif text-lg">
              IQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="more-menu-title" className="text-base sm:text-lg font-black tracking-tight">
                  {isUrdu ? 'تمام اسلامی عنوانات و ٹولز' : 'All Topics, Guides & Tools'}
                </h2>
                <span className="text-[10px] bg-goldAccent/20 text-goldAccent border border-goldAccent/30 font-bold px-2 py-0.5 rounded-full">
                  IslamIQ Directory
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                {isUrdu ? 'قرآن، سنت، نماز، زکوٰۃ، کوئز اور روزمرہ ٹولز' : 'Categorized educational guides, daily worship & interactive utilities'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMoreOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar inside More Menu */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'کوئی بھی عنوان تلاش کریں (مثلاً: نماز، وضو، زکوٰۃ، کوئز، سیرت)...' : 'Search any topic (e.g. Salah, Wudu, Zakat, Calendar, Seerah)...'}
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-xs"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Menu Content: 4 Columns on desktop, clean categorized list on mobile */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold">
                {isUrdu ? 'کوئی عنوان نہیں ملا۔' : 'No topics found matching your query.'}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                {isUrdu ? 'تلاش ختم کریں' : 'Clear search'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category) => {
                const CatIcon = category.icon;
                return (
                  <div key={category.key} className="space-y-3">
                    {/* Category Header */}
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-emerald-700/80">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <CatIcon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 font-sans">
                        {isUrdu ? category.titleUrdu : category.titleEn}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold ml-auto">
                        ({category.items.length})
                      </span>
                    </div>

                    {/* Category Item List */}
                    <div className="space-y-1.5">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        const isCurrentActive = activeTab === item.id;
                        return (
                          <a
                            key={item.id}
                            href={item.path}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigate(item.id);
                            }}
                            className={`group flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl transition-all text-left min-h-[48px] ${
                              isCurrentActive
                                ? 'bg-emerald-700 text-white shadow-sm font-bold'
                                : 'hover:bg-emerald-50/80 text-slate-800 hover:text-emerald-950 border border-transparent hover:border-emerald-200/60'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                              isCurrentActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 text-emerald-800 group-hover:bg-emerald-600 group-hover:text-white'
                            }`}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold truncate">
                                  {isUrdu ? item.titleUrdu : item.titleEn}
                                </span>
                                {item.badge && !isCurrentActive && (
                                  <span className="text-[9px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded shrink-0">
                                    {isUrdu ? (item.badgeUrdu || item.badge) : item.badge}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[10px] line-clamp-1 mt-0.5 ${
                                isCurrentActive ? 'text-emerald-100' : 'text-slate-500 group-hover:text-slate-700'
                              }`}>
                                {isUrdu ? item.descUrdu : item.descEn}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with quick mode & legal links */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <span>IslamIQ • Learn • Quiz • Grow</span>
            <span>•</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('about');
              }}
              className="text-slate-600 hover:text-emerald-700 underline font-medium"
            >
              {isUrdu ? 'ہمارے متعلق' : 'About'}
            </a>
            <span>•</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('contact');
              }}
              className="text-slate-600 hover:text-emerald-700 underline font-medium"
            >
              {isUrdu ? 'رابطہ' : 'Contact'}
            </a>
          </div>

          <button
            onClick={() => setIsMoreOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors shadow-xs ml-auto"
          >
            {isUrdu ? 'بند کریں' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

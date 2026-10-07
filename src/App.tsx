import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { DailyFeed } from './components/DailyFeed';
import { QuizSection } from './components/QuizSection';
import { SalahTracker } from './components/SalahTracker';
import { TasbihCounter } from './components/TasbihCounter';
import { KnowledgeSearch } from './components/KnowledgeSearch';
import { StatusCreator } from './components/StatusCreator';
import { Navigation } from './components/Navigation';
import { ProfileModal } from './components/ProfileModal';
import { AdminPanel } from './components/AdminPanel';
import { KidsHome } from './components/kids/KidsHome';
import { KidsNamazLearning } from './components/kids/KidsNamazLearning';
import { KidsTasbihLearning } from './components/kids/KidsTasbihLearning';
import { QiblaFinder } from './components/QiblaFinder';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { DisclaimerPage } from './components/pages/DisclaimerPage';
import { IslamicQuizHub } from './components/seo/IslamicQuizHub';
import { KidsIslamicQuizHub } from './components/seo/KidsIslamicQuizHub';
import { IslamicQAHub } from './components/seo/IslamicQAHub';
import { DailyQuranVerseHub } from './components/seo/DailyQuranVerseHub';
import { DailyHadithHub } from './components/seo/DailyHadithHub';
import { DailyDuaHub } from './components/seo/DailyDuaHub';
import { SalahLearningHub } from './components/seo/SalahLearningHub';
import { Footer } from './components/Footer';
import { MoreMenuModal } from './components/MoreMenuModal';
import { ShareIslamIQModal } from './components/ShareIslamIQModal';
import { AppTab } from './types';
import { trackPageView } from './utils/analytics';

// Lazy-loaded AdSense Educational Guides
const HowToPerformSalahGuide = React.lazy(() => import('./components/seo/HowToPerformSalahGuide'));
const HowToPerformWuduGuide = React.lazy(() => import('./components/seo/HowToPerformWuduGuide'));
const FivePillarsOfIslamGuide = React.lazy(() => import('./components/seo/FivePillarsOfIslamGuide'));
const SixArticlesOfFaithGuide = React.lazy(() => import('./components/seo/SixArticlesOfFaithGuide'));
const SalahForBeginnersGuide = React.lazy(() => import('./components/seo/SalahForBeginnersGuide'));
const IslamicMannersForKidsGuide = React.lazy(() => import('./components/seo/IslamicMannersForKidsGuide'));
const IslamicGeneralKnowledgeGuide = React.lazy(() => import('./components/seo/IslamicGeneralKnowledgeGuide'));
const QuranLearningGuide = React.lazy(() => import('./components/seo/QuranLearningGuide'));
const HadithLearningGuide = React.lazy(() => import('./components/seo/HadithLearningGuide'));
const RamadanGuide = React.lazy(() => import('./components/seo/RamadanGuide'));
const ZakatBasicsGuide = React.lazy(() => import('./components/seo/ZakatBasicsGuide'));
const ZakatCalculator = React.lazy(() => import('./components/tools/ZakatCalculator'));
const IslamicCalendar = React.lazy(() => import('./components/tools/IslamicCalendar'));
const SeerahOfProphetMuhammadGuide = React.lazy(() => import('./components/seo/SeerahOfProphetMuhammadGuide'));
const GhuslTaharahGuide = React.lazy(() => import('./components/seo/GhuslTaharahGuide'));
const TayammumGuide = React.lazy(() => import('./components/seo/TayammumGuide'));
const HajjUmrahGuide = React.lazy(() => import('./components/seo/HajjUmrahGuide'));
const StoriesOfTheProphetsGuide = React.lazy(() => import('./components/seo/StoriesOfTheProphetsGuide'));
const RightsInIslamGuide = React.lazy(() => import('./components/seo/RightsInIslamGuide'));

export const App: React.FC = () => {
  const { activeTab, setActiveTab, userMode, setUserMode, toastMessage, contentLang, setIsShareOpen } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync URL clean path for SEO & direct linking on mount/popstate
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\//, '').toLowerCase();

        const validCleanTabs: AppTab[] = [
          'about', 'contact', 'privacy-policy', 'terms', 'disclaimer',
          'islamic-quiz', 'kids-islamic-quiz', 'islamic-questions-answers',
          'daily-quran-verse', 'daily-hadith', 'daily-dua', 'salah-learning',
          'islamic-general-knowledge', 'how-to-perform-salah', 'how-to-perform-wudu',
          '5-pillars-of-islam', 'six-articles-of-faith', 'salah-for-beginners',
          'islamic-manners-for-kids', 'quran-learning-guide', 'hadith-learning-guide',
          'ramadan-guide', 'zakat-basics', 'zakat-calculator', 'islamic-calendar',
          'seerah-of-prophet-muhammad', 'ghusl-taharah-guide', 'tayammum-guide',
          'hajj-umrah-guide', 'stories-of-the-prophets', 'rights-in-islam'
        ];

        if (validCleanTabs.includes(path as AppTab)) {
          setActiveTab(path as AppTab);
        } else if (path === 'kids-namaz') {
          setActiveTab('kids-namaz');
        } else if (path === 'kids-tasbih') {
          setActiveTab('kids-tasbih');
        } else if (path === 'salah') {
          setActiveTab('salah');
        } else if (path === 'quiz') {
          setActiveTab('quiz');
        } else if (path === 'qibla') {
          setActiveTab('qibla');
        } else if (path === 'tasbih') {
          setActiveTab('tasbih');
        } else if (path === 'search') {
          setActiveTab('search');
        } else if (path === 'status') {
          setActiveTab('status');
        } else if (path === 'share') {
          setActiveTab('home');
          setIsShareOpen(true);
        } else if (path === '' || path === 'home') {
          setActiveTab('home');
        }
      } catch {
        setActiveTab('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title & clean URL whenever active tab changes
  useEffect(() => {
    const cleanRoutesMeta: Record<string, { title: string; path: string; desc: string }> = {
      about: {
        title: 'About Us • IslamIQ — Learn • Quiz • Grow',
        path: '/about',
        desc: 'Learn about IslamIQ, an educational platform dedicated to authentic Islamic learning, quizzes, and daily tools for kids and adults.'
      },
      contact: {
        title: 'Contact Us • IslamIQ — Official Support & Feedback',
        path: '/contact',
        desc: 'Contact IslamIQ at learnislamiq@gmail.com for feedback, technical inquiries, content corrections, and feature suggestions.'
      },
      'privacy-policy': {
        title: 'Privacy Policy • IslamIQ — Offline-First & Data Protection',
        path: '/privacy-policy',
        desc: 'Review the official IslamIQ privacy policy covering local device storage, guest mode, kids privacy, and Google AdSense/AdMob compliance.'
      },
      terms: {
        title: 'Terms & Conditions • IslamIQ — Educational Use Agreement',
        path: '/terms',
        desc: 'Read the official terms and conditions for using IslamIQ website and application services.'
      },
      disclaimer: {
        title: 'Disclaimer • IslamIQ — Islamic Educational Notice',
        path: '/disclaimer',
        desc: 'Official Islamic educational disclaimer: IslamIQ is an educational platform and not a replacement for a qualified Islamic scholar or Mufti.'
      },
      'islamic-quiz': {
        title: 'Islamic Quiz Online • Questions & Answers | IslamIQ',
        path: '/islamic-quiz',
        desc: 'Test your Islamic knowledge with authentic multiple choice quiz questions on Quran, Pillars of Islam, Prophets, Salah, and Seerah with verified references.'
      },
      'kids-islamic-quiz': {
        title: 'Islamic Quiz for Kids • Fun Islamic Questions | IslamIQ',
        path: '/kids-islamic-quiz',
        desc: 'Fun, engaging and educational Islamic quiz for Muslim children. Learn about Allah, Prophet Muhammad (PBUH), 5 Pillars of Islam, and good manners.'
      },
      'islamic-questions-answers': {
        title: 'Islamic Questions & Answers: Authentic Rulings & Evidence | IslamIQ',
        path: '/islamic-questions-answers',
        desc: 'Comprehensive and authentic Islamic questions and answers on Aqeedah, Salah, Fasting, Zakat, Halal living, and modern ethics with verified Quran and Hadith evidence.'
      },
      'daily-quran-verse': {
        title: 'Daily Quran Verse with Translation & Meaning | IslamIQ',
        path: '/daily-quran-verse',
        desc: 'Read inspiring Daily Quran Verses with Arabic text, authentic Urdu and English translations, Surah and Ayah numbers, and thematic reflections.'
      },
      'daily-hadith': {
        title: 'Daily Hadith • Authentic Sahih Hadith with Lessons | IslamIQ',
        path: '/daily-hadith',
        desc: 'Daily authentic Hadiths from Sahih al-Bukhari and Sahih Muslim. Learn practical daily lessons, authentic narrators, and Islamic teachings.'
      },
      'daily-dua': {
        title: 'Daily Dua with Meaning & Reference • Masnoon Duas | IslamIQ',
        path: '/daily-dua',
        desc: 'Essential daily Islamic supplications (Duas) with Arabic text, transliteration, authentic Urdu & English translations, and references.'
      },
      'salah-learning': {
        title: 'Namaz & Salah Learning • How to Pray, Rakats & Timings | IslamIQ',
        path: '/salah-learning',
        desc: 'Comprehensive Islamic guide to learning Namaz (Salah). Discover prayer methods, rakats for all 5 daily prayers, prerequisites, and tracker.'
      },
      'islamic-general-knowledge': {
        title: 'Islamic General Knowledge: Pillars, Prophets, Quran & History | IslamIQ',
        path: '/islamic-general-knowledge',
        desc: 'Comprehensive, authentic Islamic general knowledge guide covering the Five Pillars, Articles of Faith, Prophets in the Quran, Quranic statistics, and Islamic historical milestones with references.'
      },
      'how-to-perform-salah': {
        title: 'How to Perform Salah (Namaz) Step by Step Guide | IslamIQ',
        path: '/how-to-perform-salah',
        desc: 'Learn how to perform Salah step by step with authentic Hadith references. Complete guide covering prayer prerequisites, postures, recitations, common mistakes, and FAQs.'
      },
      'how-to-perform-wudu': {
        title: 'How to Perform Wudu (Ablution) Step by Step Guide | IslamIQ',
        path: '/how-to-perform-wudu',
        desc: 'Complete step-by-step guide on how to perform Wudu (Islamic ablution). Learn the 4 obligatory Fard acts, full Sunnah method, nullifiers, post-wudu dua, and authentic references.'
      },
      '5-pillars-of-islam': {
        title: 'The 5 Pillars of Islam Explained with Authentic References | IslamIQ',
        path: '/5-pillars-of-islam',
        desc: 'Comprehensive guide to the Five Pillars of Islam (Arkan al-Islam): Shahadah, Salah, Zakat, Sawm, and Hajj. Detailed Quranic proofs, Hadith evidence, wisdom, and FAQs.'
      },
      'six-articles-of-faith': {
        title: '6 Articles of Faith in Islam (Arkan al-Iman) Explained | IslamIQ',
        path: '/six-articles-of-faith',
        desc: 'In-depth guide to the 6 Articles of Faith (Iman) in Islam: Belief in Allah, Angels, Books, Prophets, Day of Judgment, and Divine Decree (Qadr) with Quranic and Hadith proofs.'
      },
      'salah-for-beginners': {
        title: 'Salah for Beginners: Complete Step-by-Step Namaz Guide | IslamIQ',
        path: '/salah-for-beginners',
        desc: 'Gentle, comprehensive beginner guide to Islamic prayer (Salah / Namaz). Learn exact postures, simple phonetic transliterations, translations, rakat counts, and overcome common beginner anxieties.'
      },
      'islamic-manners-for-kids': {
        title: 'Islamic Manners for Kids (Adab & Akhlaq Guide) | IslamIQ',
        path: '/islamic-manners-for-kids',
        desc: 'Engaging, practical guide teaching Islamic manners (Adab & Akhlaq) to kids and parents. Learn eating etiquette, greetings, honoring parents, kindness to friends, and Sunnah phrases.'
      },
      'quran-learning-guide': {
        title: 'Quran Learning Guide: Tajweed, Reading & Daily Routine | IslamIQ',
        path: '/quran-learning-guide',
        desc: 'Step-by-step Quran learning guide for beginners and intermediate students. Master Noorani Qaida, essential Tajweed rules, correct pronunciation, and daily Quran routine.'
      },
      'hadith-learning-guide': {
        title: 'Hadith Learning Guide: Traditions, Authenticity & Books | IslamIQ',
        path: '/hadith-learning-guide',
        desc: 'Comprehensive Hadith guide explaining Isnad and Matn, Sahih/Hasan/Da\'if classifications, Kutub al-Sittah compilers, and authenticity verification principles.'
      },
      'ramadan-guide': {
        title: 'Ramadan Guide: Fasting Rules, Suhoor, Iftar & Worship | IslamIQ',
        path: '/ramadan-guide',
        desc: 'Complete Ramadan educational guide covering Sawm essentials, pre-dawn Suhoor, Iftar duas, medical exemptions (inhalers/drops), Laylat al-Qadr, and Zakat al-Fitr.'
      },
      'zakat-basics': {
        title: 'Zakat Basics: Nisab, Calculation & Eligible Recipients | IslamIQ',
        path: '/zakat-basics',
        desc: 'Essential guide to the 3rd Pillar of Islam (Zakat). Learn gold and silver Nisab thresholds, 2.5% rate on cash/investments, Hawl rule, and 8 Quranic recipient categories.'
      },
      'zakat-calculator': {
        title: 'Zakat Calculator: Nisab, Cash, Gold & Trade Assets | IslamIQ',
        path: '/zakat-calculator',
        desc: 'Calculate your obligatory 2.5% Zakat easily with customizable gold and silver prices, Nisab threshold detection, liability deductions, and instant breakdown.'
      },
      'islamic-calendar': {
        title: 'Islamic Calendar: Hijri Date Today & Monthly Calendar | IslamIQ',
        path: '/islamic-calendar',
        desc: 'Accurate Hijri lunar calendar with Gregorian synchronization, moon sighting adjustments, Sunnah fasting days, and major Islamic milestones.'
      },
      'seerah-of-prophet-muhammad': {
        title: 'Seerah of Prophet Muhammad ﷺ: Complete Life, Milestones & Lessons | IslamIQ',
        path: '/seerah-of-prophet-muhammad',
        desc: 'Comprehensive Seerah guide covering the life of Prophet Muhammad ﷺ from birth, Prophethood, Makkan persecution, Hijrah, Madinah, to the Farewell Hajj with authentic sources.'
      },
      'ghusl-taharah-guide': {
        title: 'Complete Ghusl & Taharah Guide: Step-by-Step, Faraid & Sunnah | IslamIQ',
        path: '/ghusl-taharah-guide',
        desc: 'Complete step-by-step guide to Islamic Ghusl (ritual bath) and Taharah. Learn the 3 obligatory acts, Sunnah method, reasons for obligation, and common mistakes.'
      },
      'tayammum-guide': {
        title: 'Tayammum Guide: Dry Ablution in Islam, Method & Rules | IslamIQ',
        path: '/tayammum-guide',
        desc: 'Learn how to perform Tayammum (dry ablution) step by step with clean earth. Understand when it is permitted, conditions, nullifiers, and Quranic evidence.'
      },
      'hajj-umrah-guide': {
        title: 'Hajj & Umrah Complete Guide: Step-by-Step Rites, Rules & Duas | IslamIQ',
        path: '/hajj-umrah-guide',
        desc: 'Comprehensive Hajj and Umrah pilgrimage guide. Master Ihram, Miqat, Tawaf, Sa\'i, Mina, Arafat, Muzdalifah, and authentic duas with reliable references.'
      },
      'stories-of-the-prophets': {
        title: 'Stories of the Prophets: Authentic Quranic Accounts & Lessons | IslamIQ',
        path: '/stories-of-the-prophets',
        desc: 'Authentic educational guide to the Stories of the Prophets in the Quran: Adam, Nuh, Ibrahim, Yusuf, Musa, and Isa (AS) with reliable lessons and references.'
      },
      'rights-in-islam': {
        title: 'Rights in Islam (Huqooq-ul-Ibad): Parents, Spouses, Neighbors & Workers | IslamIQ',
        path: '/rights-in-islam',
        desc: 'Comprehensive guide to social rights in Islam (Huqooq-ul-Ibad). Discover rights of parents, children, spouses, neighbors, relatives, orphans, and workers with Quran and Hadith evidence.'
      }
    };

    if (cleanRoutesMeta[activeTab]) {
      document.title = cleanRoutesMeta[activeTab].title;
      if (window.location.pathname !== cleanRoutesMeta[activeTab].path) {
        window.history.pushState({ tab: activeTab }, '', cleanRoutesMeta[activeTab].path);
      }
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', cleanRoutesMeta[activeTab].desc);
      }
    } else if (activeTab === 'kids-namaz') {
      document.title = 'Kids Namaz Learning • نماز سیکھیں | IslamIQ';
    } else if (activeTab === 'kids-tasbih') {
      document.title = 'Kids Tasbih Learning • تسبیح سیکھیں | IslamIQ';
    } else if (activeTab === 'salah') {
      document.title = 'Salah Tracker • Daily Namaz Tracker & Timings | IslamIQ';
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', 'Track your five daily obligatory prayers, view weekly streaks, and build consistent Salah habits with IslamIQ Salah Tracker.');
      }
    } else if (activeTab === 'quiz') {
      document.title = 'Islamic Quiz • Test Your Knowledge | IslamIQ';
    } else if (activeTab === 'tasbih') {
      document.title = 'Tasbih Counter • Digital Dhikr | IslamIQ';
    } else if (activeTab === 'qibla') {
      document.title = 'Qibla Direction • Kaaba Compass | IslamIQ';
    } else if (activeTab === 'search') {
      document.title = 'Islamic Q&A Search • Knowledge Finder | IslamIQ';
    } else if (activeTab === 'status') {
      document.title = 'Islamic Status Creator • Cards & Quotes | IslamIQ';
    } else {
      document.title = 'IslamIQ • Learn • Quiz • Grow';
    }

    // Always keep canonical link accurate across all SPA routes and remove duplicates
    const allCanonicals = document.querySelectorAll('link[rel="canonical"]');
    let linkCanonical = allCanonicals[0] as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    for (let i = 1; i < allCanonicals.length; i++) {
      allCanonicals[i].remove();
    }
    const currentCanonicalUrl = cleanRoutesMeta[activeTab]
      ? `https://learnislamiq.com${cleanRoutesMeta[activeTab].path}`
      : 'https://learnislamiq.com/';
    linkCanonical.setAttribute('href', currentCanonicalUrl);

    // Clean URL pathname if navigating away from a clean route
    if (!cleanRoutesMeta[activeTab] && window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }

    // Track SPA navigation in Google Analytics 4
    const pagePath = cleanRoutesMeta[activeTab] ? cleanRoutesMeta[activeTab].path : (activeTab === 'home' ? '/' : `/${activeTab}`);
    trackPageView(pagePath, document.title);
  }, [activeTab]);

  // Status Creator text passing
  const [statusInitialText, setStatusInitialText] = useState<string | undefined>(undefined);
  const [statusInitialRef, setStatusInitialRef] = useState<string | undefined>(undefined);

  const handleNavigateToStatus = (text: string, ref: string) => {
    setStatusInitialText(text);
    setStatusInitialRef(ref);
    setActiveTab('status');
  };

  const isKids = userMode === 'kids';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isKids ? 'bg-[#FDFBF7] text-teal-950' : 'bg-[#F8FAF9] text-slate-900'
    }`}>
      {/* Top Header */}
      <Header
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-5 pb-20 md:pb-10">
        {activeTab === 'quiz' ? (
          <QuizSection />
        ) : activeTab === 'kids-namaz' ? (
          <KidsNamazLearning onBackToKidsMenu={() => setActiveTab('home')} />
        ) : activeTab === 'kids-tasbih' ? (
          <KidsTasbihLearning onBackToKidsMenu={() => setActiveTab('home')} />
        ) : activeTab === 'salah' ? (
          <SalahTracker />
        ) : activeTab === 'qibla' ? (
          <QiblaFinder onBack={() => setActiveTab('home')} />
        ) : activeTab === 'tasbih' ? (
          <TasbihCounter />
        ) : activeTab === 'search' ? (
          <KnowledgeSearch />
        ) : activeTab === 'status' ? (
          <StatusCreator
            initialText={statusInitialText}
            initialRef={statusInitialRef}
          />
        ) : activeTab === 'about' ? (
          <AboutPage />
        ) : activeTab === 'contact' ? (
          <ContactPage />
        ) : activeTab === 'privacy-policy' ? (
          <PrivacyPolicyPage />
        ) : activeTab === 'terms' ? (
          <TermsPage />
        ) : activeTab === 'disclaimer' ? (
          <DisclaimerPage />
        ) : activeTab === 'islamic-quiz' ? (
          <IslamicQuizHub />
        ) : activeTab === 'kids-islamic-quiz' ? (
          <KidsIslamicQuizHub />
        ) : activeTab === 'daily-quran-verse' ? (
          <DailyQuranVerseHub />
        ) : activeTab === 'daily-hadith' ? (
          <DailyHadithHub />
        ) : activeTab === 'daily-dua' ? (
          <DailyDuaHub />
        ) : activeTab === 'salah-learning' ? (
          <SalahLearningHub />
        ) : activeTab === 'islamic-general-knowledge' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <IslamicGeneralKnowledgeGuide />
          </React.Suspense>
        ) : activeTab === 'islamic-questions-answers' ? (
          <IslamicQAHub />
        ) : activeTab === 'quran-learning-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <QuranLearningGuide />
          </React.Suspense>
        ) : activeTab === 'how-to-perform-salah' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <HowToPerformSalahGuide />
          </React.Suspense>
        ) : activeTab === 'how-to-perform-wudu' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <HowToPerformWuduGuide />
          </React.Suspense>
        ) : activeTab === '5-pillars-of-islam' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <FivePillarsOfIslamGuide />
          </React.Suspense>
        ) : activeTab === 'six-articles-of-faith' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SixArticlesOfFaithGuide />
          </React.Suspense>
        ) : activeTab === 'salah-for-beginners' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SalahForBeginnersGuide />
          </React.Suspense>
        ) : activeTab === 'islamic-manners-for-kids' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <IslamicMannersForKidsGuide />
          </React.Suspense>
        ) : activeTab === 'hadith-learning-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <HadithLearningGuide />
          </React.Suspense>
        ) : activeTab === 'ramadan-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <RamadanGuide />
          </React.Suspense>
        ) : activeTab === 'zakat-basics' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <ZakatBasicsGuide />
          </React.Suspense>
        ) : activeTab === 'zakat-calculator' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <ZakatCalculator />
          </React.Suspense>
        ) : activeTab === 'islamic-calendar' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <IslamicCalendar />
          </React.Suspense>
        ) : activeTab === 'seerah-of-prophet-muhammad' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <SeerahOfProphetMuhammadGuide />
          </React.Suspense>
        ) : activeTab === 'ghusl-taharah-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <GhuslTaharahGuide />
          </React.Suspense>
        ) : activeTab === 'tayammum-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <TayammumGuide />
          </React.Suspense>
        ) : activeTab === 'hajj-umrah-guide' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <HajjUmrahGuide />
          </React.Suspense>
        ) : activeTab === 'stories-of-the-prophets' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <StoriesOfTheProphetsGuide />
          </React.Suspense>
        ) : activeTab === 'rights-in-islam' ? (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-12">
              <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <RightsInIslamGuide />
          </React.Suspense>
        ) : (
          isKids ? (
            <KidsHome onSelectActivity={(tab) => {
              if (tab === 'kids-namaz') {
                setActiveTab('kids-namaz');
              } else if (tab === 'kids-tasbih') {
                setActiveTab('kids-tasbih');
              } else {
                setActiveTab(tab);
              }
            }} />
          ) : (
            <DailyFeed onNavigateToStatusWithText={handleNavigateToStatus} />
          )
        )}
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <Navigation />

      {/* Categorized More Menu Directory Modal */}
      <MoreMenuModal />

      {/* Share IslamIQ Sadaqah Jariyah Modal */}
      <ShareIslamIQModal />

      {/* User Profile / Sync Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Built-in Secure Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={() => setIsAdminOpen(false)} />
      )}

      {/* In-App Toast Message */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold border border-white/20 flex items-center gap-2">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

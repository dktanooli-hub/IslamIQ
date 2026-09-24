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
import { IslamicGeneralKnowledgeHub } from './components/seo/IslamicGeneralKnowledgeHub';
import { Footer } from './components/Footer';
import { AppTab } from './types';
import { trackPageView } from './utils/analytics';

// Lazy-loaded AdSense Educational Guides
const HowToPerformSalahGuide = React.lazy(() => import('./components/seo/HowToPerformSalahGuide'));
const HowToPerformWuduGuide = React.lazy(() => import('./components/seo/HowToPerformWuduGuide'));
const FivePillarsOfIslamGuide = React.lazy(() => import('./components/seo/FivePillarsOfIslamGuide'));
const SixArticlesOfFaithGuide = React.lazy(() => import('./components/seo/SixArticlesOfFaithGuide'));
const SalahForBeginnersGuide = React.lazy(() => import('./components/seo/SalahForBeginnersGuide'));
const IslamicMannersForKidsGuide = React.lazy(() => import('./components/seo/IslamicMannersForKidsGuide'));

export const App: React.FC = () => {
  const { activeTab, setActiveTab, userMode, toastMessage } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync URL hash / clean path for SEO & direct linking (/islamic-quiz, /about, etc.)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const validCleanTabs: AppTab[] = [
        'about',
        'contact',
        'privacy-policy',
        'terms',
        'disclaimer',
        'islamic-quiz',
        'kids-islamic-quiz',
        'islamic-questions-answers',
        'daily-quran-verse',
        'daily-hadith',
        'daily-dua',
        'salah-learning',
        'islamic-general-knowledge',
        'how-to-perform-salah',
        'how-to-perform-wudu',
        '5-pillars-of-islam',
        'six-articles-of-faith',
        'salah-for-beginners',
        'islamic-manners-for-kids'
      ];
      if (validCleanTabs.includes(path as AppTab)) {
        setActiveTab(path as AppTab);
      } else if (path === '' || path === 'home') {
        setActiveTab('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setActiveTab]);

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
        title: 'Islamic Questions & Answers with Authentic References | IslamIQ',
        path: '/islamic-questions-answers',
        desc: 'Authentic Islamic questions and answers on Aqeedah, Salah, Fasting, Quran, and daily manners. Supported by verified references.'
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
        title: 'Islamic General Knowledge • Pillars, Prophets & Quran Facts | IslamIQ',
        path: '/islamic-general-knowledge',
        desc: 'Comprehensive Islamic general knowledge guide covering the 5 Pillars of Islam, 6 Pillars of Faith, Prophets in the Quran, and Islamic history.'
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
    } else {
      document.title = 'IslamIQ • Learn • Quiz • Grow';
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', 'IslamIQ is an Islamic learning and educational platform designed for Kids and Adults featuring Islamic Quiz, Salah Tracker, Tasbih Counter, Qibla Direction, and Daily Quran & Hadith.');
      }
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-5 pb-16 sm:pb-20">
        {activeTab === 'home' && (
          isKids ? (
            <KidsHome onSelectActivity={(tab) => setActiveTab(tab)} />
          ) : (
            <DailyFeed onNavigateToStatusWithText={handleNavigateToStatus} />
          )
        )}
        {activeTab === 'quiz' && <QuizSection />}
        {activeTab === 'salah' && <SalahTracker />}
        {activeTab === 'qibla' && <QiblaFinder onBack={() => setActiveTab('home')} />}
        {activeTab === 'tasbih' && <TasbihCounter />}
        {activeTab === 'search' && <KnowledgeSearch />}
        {activeTab === 'status' && (
          <StatusCreator
            initialText={statusInitialText}
            initialRef={statusInitialRef}
          />
        )}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'contact' && <ContactPage />}
        {activeTab === 'privacy-policy' && <PrivacyPolicyPage />}
        {activeTab === 'terms' && <TermsPage />}
        {activeTab === 'disclaimer' && <DisclaimerPage />}

        {/* SEO-friendly Islamic Content Hub Pages */}
        {activeTab === 'islamic-quiz' && <IslamicQuizHub />}
        {activeTab === 'kids-islamic-quiz' && <KidsIslamicQuizHub />}
        {activeTab === 'islamic-questions-answers' && <IslamicQAHub />}
        {activeTab === 'daily-quran-verse' && <DailyQuranVerseHub />}
        {activeTab === 'daily-hadith' && <DailyHadithHub />}
        {activeTab === 'daily-dua' && <DailyDuaHub />}
        {activeTab === 'salah-learning' && <SalahLearningHub />}
        {activeTab === 'islamic-general-knowledge' && <IslamicGeneralKnowledgeHub />}

        {/* AdSense Educational Guides */}
        <React.Suspense fallback={
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          {activeTab === 'how-to-perform-salah' && <HowToPerformSalahGuide />}
          {activeTab === 'how-to-perform-wudu' && <HowToPerformWuduGuide />}
          {activeTab === '5-pillars-of-islam' && <FivePillarsOfIslamGuide />}
          {activeTab === 'six-articles-of-faith' && <SixArticlesOfFaithGuide />}
          {activeTab === 'salah-for-beginners' && <SalahForBeginnersGuide />}
          {activeTab === 'islamic-manners-for-kids' && <IslamicMannersForKidsGuide />}
        </React.Suspense>
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Bottom Navigation */}
      <Navigation />

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

      {/* Toast Notification */}
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

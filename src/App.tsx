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
import { Footer } from './components/Footer';
import { AppTab } from './types';

export const App: React.FC = () => {
  const { activeTab, setActiveTab, userMode, toastMessage } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync URL hash / clean path for SEO & direct linking (/about, /contact, /privacy-policy, /terms, /disclaimer)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const validLegalTabs: AppTab[] = ['about', 'contact', 'privacy-policy', 'terms', 'disclaimer'];
      if (validLegalTabs.includes(path as AppTab)) {
        setActiveTab(path as AppTab);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setActiveTab]);

  // Update document title & clean URL whenever active tab changes
  useEffect(() => {
    const legalMeta: Record<string, { title: string; path: string; desc: string }> = {
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
      }
    };

    if (legalMeta[activeTab]) {
      document.title = legalMeta[activeTab].title;
      if (window.location.pathname !== legalMeta[activeTab].path) {
        window.history.pushState({ tab: activeTab }, '', legalMeta[activeTab].path);
      }
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) {
        metaTag.setAttribute('content', legalMeta[activeTab].desc);
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

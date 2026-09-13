import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const { activeTab, setActiveTab, userMode, toastMessage } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-5 pb-24 sm:pb-28">
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
      </main>

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

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { SearchModal } from './components/SearchModal';

import { HomeView } from './components/HomeView';
import { PlacementQuizModal } from './components/PlacementQuizModal';
import { QuizResultsView } from './components/QuizResultsView';
import { StagePlayer } from './components/StagePlayer';
import { CommunityView } from './components/CommunityView';
import { AIGeneratorStudio } from './components/AIGeneratorStudio';
import { EquipmentGuide } from './components/EquipmentGuide';
import { SoftwareGuide } from './components/SoftwareGuide';
import { CreatorLibrary } from './components/CreatorLibrary';
import { IncomeCalculator } from './components/IncomeCalculator';
import { LegalCenter } from './components/LegalCenter';
import { StoreView } from './components/StoreView';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';

const MainContent: React.FC = () => {
  const { currentView } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 border-t-8 border-[#1A2B48] font-sans selection:bg-[#C5A059] selection:text-white transition-colors">
      
      {/* Top Navbar */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main View Router */}
      <main className="flex-1 pb-24 xl:pb-12">
        {currentView === 'home' && <HomeView onOpenAuth={() => setAuthModalOpen(true)} />}
        {currentView === 'quiz' && <PlacementQuizModal />}
        {currentView === 'quiz-results' && <QuizResultsView />}
        {currentView === 'stages' && <StagePlayer />}
        {currentView === 'community' && <CommunityView />}
        {currentView === 'ai-studio' && <AIGeneratorStudio />}
        {currentView === 'equipment' && <EquipmentGuide />}
        {currentView === 'creators' && <CreatorLibrary />}
        {currentView === 'income' && <IncomeCalculator />}
        {currentView === 'legal' && <LegalCenter />}
        {currentView === 'store' && <StoreView />}
        {currentView === 'dashboard' && <UserDashboard />}
        {currentView === 'admin' && <AdminPanel />}
      </main>

      {/* Mobile Floating Bottom Navigation */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Global Interactive Search Modal */}
      <SearchModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

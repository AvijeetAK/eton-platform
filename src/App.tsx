import React, { useState, useEffect } from 'react';
import { StageId, DiscoveredBusiness, PipelineDeal } from './types';
import { PIPELINE_DEALS } from './data/telecomData';
import { LeftSidebar } from './components/LeftSidebar';
import { TopCommandBar } from './components/TopCommandBar';
import { CatalogStage } from './components/stages/CatalogStage';
import { DiscoveryStage } from './components/stages/DiscoveryStage';
import { OutreachStage } from './components/stages/OutreachStage';
import { PipelineStage } from './components/stages/PipelineStage';

export function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('catalog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pushedLead, setPushedLead] = useState<DiscoveredBusiness | null>(null);
  const [deals, setDeals] = useState<PipelineDeal[]>(PIPELINE_DEALS);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePushToOutreach = (business: DiscoveredBusiness) => {
    setPushedLead(business);
  };

  const handleLogDealToPipeline = (newDeal: PipelineDeal) => {
    setDeals((prev) => [newDeal, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#2C3531] text-[#D1E8E2] relative flex flex-col font-sans selection:bg-[#116466] selection:text-[#FFCB9A] overflow-hidden">
      {/* Ambient Radial Glowing Orbs for Glass Refraction Depth */}
      <div
        className="ambient-orb-teal w-[600px] h-[600px] -top-40 -left-20 animate-pulse-slow"
      />
      <div
        className="ambient-orb-peach w-[500px] h-[500px] top-1/3 right-[-100px] animate-float-slow"
      />
      <div
        className="ambient-orb-teal w-[700px] h-[700px] -bottom-60 left-1/4"
      />

      {/* Main Layout Container */}
      <div className="flex flex-1 relative z-10 min-h-screen">
        {/* Left Glassmorphic Navigation Sidebar */}
        <LeftSidebar
          currentStage={currentStage}
          onSelectStage={(stage) => setCurrentStage(stage)}
        />

        {/* Right Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Top Glassmorphic Command Bar */}
          <TopCommandBar
            currentStage={currentStage}
            onSelectStage={(stage) => setCurrentStage(stage)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
          />

          {/* Main Stage View Area */}
          <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
            {currentStage === 'catalog' && (
              <CatalogStage searchQuery={searchQuery} />
            )}
            {currentStage === 'discovery' && (
              <DiscoveryStage
                searchQuery={searchQuery}
                onPushToOutreach={handlePushToOutreach}
                onSelectStage={(st) => setCurrentStage(st)}
              />
            )}
            {currentStage === 'outreach' && (
              <OutreachStage
                searchQuery={searchQuery}
                pushedLead={pushedLead}
                onLogDealToPipeline={handleLogDealToPipeline}
                onSelectStage={(st) => setCurrentStage(st)}
              />
            )}
            {currentStage === 'pipeline' && (
              <PipelineStage
                searchQuery={searchQuery}
                dealsList={deals}
                onUpdateDeals={(updated) => setDeals(updated)}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;


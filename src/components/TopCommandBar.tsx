import React from 'react';
import { StageId } from '../types';
import {
  Search,
  Activity,
  Command,
  Download,
  Filter,
  Layers,
  Radio,
  Send,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Badge } from './GlassCard';

interface TopCommandBarProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  currentStage,
  onSelectStage,
  searchQuery,
  onSearchChange,
}) => {
  const stageButtons: { id: StageId; label: string; icon: React.ElementType }[] = [
    { id: 'catalog', label: '1. Catalog & RAG', icon: Layers },
    { id: 'discovery', label: '2. Regional ISP', icon: Radio },
    { id: 'outreach', label: '3. AI Outreach', icon: Send },
    { id: 'pipeline', label: '4. Voice & Pipeline', icon: BarChart3 },
  ];

  return (
    <header className="h-16 border-b border-[#D1E8E2]/15 px-6 flex items-center justify-between backdrop-blur-2xl bg-[#2C3531]/75 sticky top-0 z-30">
      {/* Search Input with Sci-Fi Command Indicator */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#D9B08C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search enterprise accounts, fiber lit addresses, or AT&T catalog SKUs..."
            className="w-full glass-input rounded-lg pl-10 pr-20 py-2 text-xs text-[#D1E8E2] placeholder-[#D1E8E2]/40"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#116466]/40 px-1.5 py-0.5 rounded border border-[#D1E8E2]/20 text-[10px] font-mono text-[#D9B08C]">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Stage Switcher Pills */}
      <div className="hidden xl:flex items-center gap-1.5 bg-[#2C3531] p-1 rounded-lg border border-[#D1E8E2]/15">
        {stageButtons.map((btn) => {
          const isActive = currentStage === btn.id;
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              onClick={() => onSelectStage(btn.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200
                ${
                  isActive
                    ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A]/50 shadow-[0_0_12px_rgba(255,203,154,0.25)]'
                    : 'text-[#D1E8E2]/70 hover:text-[#D1E8E2] hover:bg-[#116466]/20'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Sync Telemetry & Quick Action */}
      <div className="flex items-center gap-3">
        {/* Latency & Carrier Live Sync Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D1E8E2]/15 bg-[#116466]/20 text-[11px] font-mono">
          <Activity className="w-3.5 h-3.5 text-[#FFCB9A] animate-pulse" />
          <span className="text-[#D1E8E2]/90">AT&T Backbone:</span>
          <span className="text-[#FFCB9A] font-bold">14ms</span>
          <span className="text-[#D9B08C] text-[10px]">• Synced</span>
        </div>

        <button
          onClick={() => {
            alert('Exporting executive AT&T Enterprise battlecard packet...');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFCB9A] text-[#2C3531] text-xs font-bold hover:bg-[#FFCB9A]/90 transition-all shadow-[0_0_15px_rgba(255,203,154,0.3)] active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Brief</span>
        </button>
      </div>
    </header>
  );
};


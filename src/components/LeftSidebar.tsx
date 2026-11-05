import React from 'react';
import { StageId } from '../types';
import {
  Layers,
  Radio,
  Send,
  BarChart3,
  Cpu,
  Wifi,
  Sparkles,
  ShieldCheck,
  Zap,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { GlassCard, Badge } from './GlassCard';

interface LeftSidebarProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  collapsed?: boolean;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentStage,
  onSelectStage,
}) => {
  const stages: {
    id: StageId;
    num: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    badgeText: string;
  }[] = [
    {
      id: 'catalog',
      num: '01',
      title: 'Service Catalog & RAG',
      subtitle: 'AT&T Enterprise & Battlecards',
      icon: Layers,
      badgeText: '18 SKUs'
    },
    {
      id: 'discovery',
      num: '02',
      title: 'Regional Discovery & ISP',
      subtitle: 'Fiber Lit vs Legacy Copper',
      icon: Radio,
      badgeText: 'Live Matrix'
    },
    {
      id: 'outreach',
      num: '03',
      title: 'Contact Extraction & AI',
      subtitle: 'Verified IT Decision Makers',
      icon: Send,
      badgeText: '3 Accounts'
    },
    {
      id: 'pipeline',
      num: '04',
      title: 'Pipeline, Ads & Voice AI',
      subtitle: 'B2B Geofence & Call Sim',
      icon: BarChart3,
      badgeText: '$2.4M Active'
    }
  ];

  return (
    <aside className="w-80 flex-shrink-0 min-h-screen flex flex-col p-4 border-r border-[#D1E8E2]/15 relative z-20 backdrop-blur-2xl bg-[#2C3531]/75">
      {/* Brand Crest */}
      <div className="mb-6 p-4 rounded-xl border border-[#D1E8E2]/15 bg-gradient-to-br from-[#2C3531] to-[#116466]/30 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FFCB9A]/15 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg border border-[#FFCB9A] bg-[#116466] flex items-center justify-center shadow-[0_0_15px_rgba(255,203,154,0.3)]">
              {/* ETON Crest Icon */}
              <div className="relative flex items-center justify-center">
                <Wifi className="w-5 h-5 text-[#FFCB9A] animate-pulse" />
                <Sparkles className="w-2.5 h-2.5 text-[#D1E8E2] absolute -top-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-xl text-[#FFCB9A]">ETON</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#FFCB9A]/20 text-[#FFCB9A] border border-[#FFCB9A]/40 font-bold">
                  v2.6 PRO
                </span>
              </div>
              <p className="text-[11px] font-mono tracking-tight text-[#D9B08C]">
                AT&T Telecom Intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#D1E8E2]/10 mt-1">
          <div className="flex items-center gap-1 text-[11px] text-[#D1E8E2]">
            <span className="w-2 h-2 rounded-full bg-[#FFCB9A] animate-ping inline-block" />
            <span className="font-medium">Direct Carrier Node</span>
          </div>
          <span className="text-[10px] font-mono text-[#D9B08C] bg-[#2C3531] px-2 py-0.5 rounded border border-[#D9B08C]/30">
            SOUTHEAST GRID
          </span>
        </div>
      </div>

      {/* Active Account Manager Profile Badge */}
      <GlassCard className="p-3.5 mb-6" showReticles={true}>
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-lg border border-[#FFCB9A]/60 bg-[#116466]/40 flex items-center justify-center text-[#FFCB9A] flex-shrink-0 shadow-inner">
            <UserCheck className="w-5 h-5 text-[#FFCB9A]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#D1E8E2] truncate">Jessica Lin</h4>
              <span className="w-2 h-2 rounded-full bg-[#FFCB9A]" title="Active Station" />
            </div>
            <p className="text-xs text-[#D9B08C] font-medium truncate">Senior Enterprise AM</p>
            <p className="text-[10px] text-[#D1E8E2]/70 font-mono mt-0.5">Quota: 142% • Q4 Lead Pool</p>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#D1E8E2]/10 flex items-center justify-between text-[11px]">
          <span className="text-[#D9B08C] font-mono">Territory: GA / NC / FL</span>
          <Badge variant="peach" className="text-[9px] py-0.5 px-2">
            Top Carrier Rep
          </Badge>
        </div>
      </GlassCard>

      {/* Navigation Stages Section */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D9B08C] font-bold">
            Intelligence Workflow
          </span>
          <span className="text-[10px] font-mono text-[#D1E8E2]/50">4 Stages</span>
        </div>

        {stages.map((stage) => {
          const isActive = currentStage === stage.id;
          const Icon = stage.icon;
          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={`
                w-full text-left p-3 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? 'glass-panel-active translate-x-1'
                    : 'glass-panel hover:translate-x-1'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[#FFCB9A] text-[#2C3531] shadow-[0_0_12px_rgba(255,203,154,0.5)]'
                        : 'bg-[#116466]/40 text-[#D1E8E2] group-hover:text-[#FFCB9A] group-hover:bg-[#116466]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold truncate ${
                        isActive ? 'text-[#FFCB9A]' : 'text-[#D1E8E2] group-hover:text-[#FFCB9A]'
                      }`}
                    >
                      {stage.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#D9B08C] opacity-80">
                      {stage.num}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D1E8E2]/70 truncate mt-0.5">
                    {stage.subtitle}
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-[#FFCB9A] translate-x-0.5' : 'text-[#D1E8E2]/30 group-hover:text-[#FFCB9A]'
                  }`}
                />
              </div>

              {/* Status pill inside tab */}
              <div className="mt-2 pl-12 flex items-center gap-2">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#116466]/50 text-[#D1E8E2] border border-[#D1E8E2]/15">
                  {stage.badgeText}
                </span>
                {isActive && (
                  <span className="flex items-center gap-1 text-[9px] font-mono text-[#FFCB9A]">
                    <Zap className="w-2.5 h-2.5" /> Stage Active
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* System Telemetry Status (Bottom Anchor) */}
      <div className="mt-auto pt-4 border-t border-[#D1E8E2]/15 space-y-2">
        <div className="flex items-center justify-between text-[11px] px-1">
          <span className="text-[#D9B08C] font-mono flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#116466]" /> System Telemetry
          </span>
          <span className="text-[10px] font-mono text-[#FFCB9A] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFCB9A] animate-pulse" />
            ONLINE
          </span>
        </div>

        <div className="bg-[#2C3531]/80 rounded-lg p-2.5 border border-[#D1E8E2]/10 space-y-1.5 text-[10px] font-mono">
          <div className="flex justify-between items-center text-[#D1E8E2]/80">
            <span>AT&T RAG Knowledge</span>
            <span className="text-[#FFCB9A] font-semibold">100% Vector Synced</span>
          </div>
          <div className="w-full bg-[#116466]/30 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#FFCB9A] h-full w-full rounded-full" />
          </div>

          <div className="flex justify-between items-center text-[#D1E8E2]/80 pt-1">
            <span>FCC & Carrier GIS Mesh</span>
            <span className="text-[#D9B08C] font-semibold">99.8% Precision</span>
          </div>
          <div className="w-full bg-[#116466]/30 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#D9B08C] h-full w-[99.8%] rounded-full" />
          </div>

          <div className="flex justify-between items-center text-[#D1E8E2]/70 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#116466]" /> Telephony Voice AI
            </span>
            <span className="text-[#D1E8E2] text-[9px] bg-[#116466]/60 px-1.5 py-0.2 rounded">
              Ready
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};


import React, { useState } from 'react';
import { PipelineDeal } from '../types';
import { GlassCard, Badge } from './GlassCard';
import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Building2,
  DollarSign,
  Activity,
  Calendar,
  FileText,
  Sliders,
  Send,
  X,
  Phone,
  Server,
  TrendingUp,
  Cpu,
  Lock
} from 'lucide-react';

interface HumanInTheLoopModalProps {
  deal: PipelineDeal;
  onClose: () => void;
  onTakeoverComplete: (updatedDeal: PipelineDeal) => void;
}

export const HumanInTheLoopModal: React.FC<HumanInTheLoopModalProps> = ({
  deal,
  onClose,
  onTakeoverComplete
}) => {
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [customSla, setCustomSla] = useState<string>('99.999% SLA (4-Hour MTTR Guarantee)');
  const [managerNotes, setManagerNotes] = useState<string>(
    'Client requested executive review of symmetrical upload SLA terms. Fiber terminal confirmed lit in telco demarc. Approved 10% discretionary margin to displace incumbent coax.'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Calculated discounted MRC & TCV
  const discountedMrr = Math.round(deal.mrr * (1 - discountPercent / 100));
  const discountedTcv = Math.round(deal.tcv * (1 - discountPercent / 100));

  const handleTakeover = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      const updatedDeal: PipelineDeal = {
        ...deal,
        stage: 'Ready for Account Manager',
        mrr: discountedMrr,
        tcv: discountedTcv,
        probability: 95,
        aiSentimentTag: `Human AM Takeover: MSA Generated with ${discountPercent}% Discretionary Discount`,
        sentimentCategory: 'ready',
        lastActivity: 'Just now • Account Manager Took Over Contract'
      };

      setTimeout(() => {
        onTakeoverComplete(updatedDeal);
        onClose();
      }, 1200);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3531]/80 backdrop-blur-xl animate-fadeIn">
      <GlassCard className="max-w-4xl w-full p-6 relative max-h-[90vh] flex flex-col" showReticles={true}>
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#D1E8E2]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#116466] border border-[#FFCB9A]/60 flex items-center justify-center text-[#FFCB9A] shadow-[0_0_15px_rgba(255,203,154,0.3)]">
              <UserCheck className="w-5 h-5 text-[#FFCB9A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#D1E8E2] uppercase tracking-wider">
                  Human-in-the-Loop Enterprise Escalation
                </h3>
                <Badge variant="peach" className="text-[9px]">
                  High-Ticket Review
                </Badge>
              </div>
              <p className="text-xs font-mono text-[#D9B08C] mt-0.5">
                Target: <strong className="text-[#FFCB9A]">{deal.company}</strong> • Assigned AM: <strong>{deal.assignedAM}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#D1E8E2]/70 hover:text-[#FFCB9A] text-xs font-mono px-2.5 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#FFCB9A] transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Modal Body: Two-Column Dossier & Takeover Form */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          {/* Top Alert Banner */}
          <div className="p-3.5 rounded-xl bg-[#116466]/25 border border-[#FFCB9A]/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#D1E8E2]">
              <ShieldAlert className="w-4 h-4 text-[#FFCB9A]" />
              <span>
                AI Telemetry triggered high-ticket escalation: Contract value exceeds $100K TCV threshold with active C-suite buying intent.
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#FFCB9A]">
              TCV: ${deal.tcv.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Full AI Intelligence Dossier */}
            <div className="lg:col-span-6 space-y-3.5 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold block">
                1. Comprehensive AI Account Dossier
              </span>

              {/* Account Identity & Contact Card */}
              <div className="p-3 rounded-xl bg-[#2C3531]/90 border border-[#D1E8E2]/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D9B08C] uppercase">Stakeholder Profile</span>
                  <Badge variant="teal" className="text-[9px]">Verified Decision Maker</Badge>
                </div>
                <div className="font-bold text-sm text-[#D1E8E2]">{deal.contactName}</div>
                <div className="text-[11px] font-mono text-[#D9B08C]">{deal.contactRole} • {deal.company}</div>
                <div className="pt-2 border-t border-[#D1E8E2]/10 flex items-center justify-between text-[11px] font-mono text-[#D1E8E2]/70">
                  <span>AT&T Grid: Lit Building Terminal</span>
                  <span className="text-[#FFCB9A]">Demarc Verified</span>
                </div>
              </div>

              {/* Incumbent ISP Analysis Card */}
              <div className="p-3 rounded-xl bg-[#2C3531]/90 border border-[#D1E8E2]/15 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                  Incumbent Carrier Telemetry (ASN & FCC Corroborated)
                </span>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#D1E8E2]">Spectrum / Comcast Coax</span>
                  <span className="text-[10px] font-mono text-[#FFCB9A]">35M Upload Ceiling</span>
                </div>
                <p className="text-[11px] text-[#D1E8E2]/75 leading-relaxed">
                  Asymmetric shared coaxial infrastructure throttles backup video streams and cloud ERP database syncing during business hours.
                </p>
              </div>

              {/* AI Voice Call Transcript Excerpt */}
              <div className="p-3 rounded-xl bg-[#116466]/20 border border-[#116466]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#FFCB9A] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#FFCB9A]" /> Voice Call Qualification Excerpt
                  </span>
                  <span className="text-[9px] font-mono text-[#D9B08C]">60s Telephony AI</span>
                </div>
                <div className="text-[11px] font-sans text-[#D1E8E2]/90 italic leading-relaxed p-2 rounded bg-[#2C3531]/70 border border-[#D1E8E2]/10">
                  "{deal.contactName}: We are pre-cleared for budget if AT&T can guarantee unshared gigabit symmetrical fiber with a 4-hour MTTR contract remedy."
                </div>
              </div>
            </div>

            {/* Right Column: Negotiation & Takeover Controls */}
            <div className="lg:col-span-6 space-y-3.5 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold block">
                2. Contract Terms & Human Takeover
              </span>

              {/* Financial Terms & Discount Adjustment */}
              <div className="p-4 rounded-xl bg-[#2C3531]/90 border border-[#FFCB9A]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#D9B08C]">
                    Service Bill of Materials (BOM)
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FFCB9A]">
                    {deal.services.join(' • ')}
                  </span>
                </div>

                {/* Pricing Breakdown with Discount */}
                <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-[#2C3531] border border-[#D1E8E2]/15 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#D1E8E2]/50 block">Negotiated MRC:</span>
                    <span className="text-sm font-black text-[#FFCB9A]">${discountedMrr.toLocaleString()}/mo</span>
                    <span className="text-[9px] text-[#D9B08C] block">(Base: ${deal.mrr.toLocaleString()})</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#D1E8E2]/50 block">36-Month TCV:</span>
                    <span className="text-sm font-black text-[#D1E8E2]">${discountedTcv.toLocaleString()}</span>
                    <span className="text-[9px] text-[#FFCB9A] block">Win Probability: 95%</span>
                  </div>
                </div>

                {/* AM Discretionary Discount Slider */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#D9B08C]">AM Discretionary Discount:</span>
                    <span className="text-[#FFCB9A] font-bold">{discountPercent}% Margin Relief</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                    className="w-full accent-[#FFCB9A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#D1E8E2]/40 mt-0.5">
                    <span>0% (Standard)</span>
                    <span>10% (Competitive)</span>
                    <span>25% (Max Authority)</span>
                  </div>
                </div>

                {/* Custom SLA Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Contractual SLA Rider:
                  </label>
                  <select
                    value={customSla}
                    onChange={(e) => setCustomSla(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs text-[#D1E8E2] bg-[#2C3531]"
                  >
                    <option value="99.999% SLA (4-Hour MTTR Guarantee)">
                      99.999% SLA (4-Hour MTTR Guarantee with Automated Bill Credits)
                    </option>
                    <option value="99.99% Dual-Path Active-Active SLA">
                      99.99% Dual-Path Active-Active SLA with 5G Wireless Failover
                    </option>
                    <option value="Defense-Grade Zero-Trust SOC SLA">
                      Defense-Grade Zero-Trust SOC SLA with Alien Labs DDoS Shield
                    </option>
                  </select>
                </div>

                {/* Manager Notes */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Account Manager Executive Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={managerNotes}
                    onChange={(e) => setManagerNotes(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs text-[#D1E8E2] font-sans leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer & Takeover Trigger */}
        <div className="pt-4 border-t border-[#D1E8E2]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[10px] font-mono text-[#D9B08C]">
            Authorized by Senior Enterprise Account Manager • Jessica Lin
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#D9B08C] text-xs font-mono text-[#D1E8E2]/80 hover:text-[#D1E8E2] transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleTakeover}
              disabled={isSubmitting || showSuccess}
              className={`
                px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2
                ${
                  showSuccess
                    ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A]'
                    : 'bg-[#FFCB9A] text-[#2C3531] hover:bg-[#FFCB9A]/90 hover:scale-[1.02] shadow-[0_0_15px_rgba(255,203,154,0.35)] active:scale-95'
                }
              `}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'Generating Master Service Agreement...'
                  : showSuccess
                  ? 'Contract Takeover Approved!'
                  : 'Take Over Final Contract Negotiation & Generate MSA'}
              </span>
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};


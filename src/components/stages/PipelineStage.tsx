import React, { useState, useEffect } from 'react';
import { PIPELINE_DEALS, INBOUND_AD_LEADS } from '../../data/telecomData';
import { PipelineDeal, InboundAdLead, KanbanStage } from '../../types';
import { GlassCard, Badge } from '../GlassCard';
import { HumanInTheLoopModal } from '../HumanInTheLoopModal';
import {
  BarChart3,
  Mic,
  MicOff,
  DollarSign,
  TrendingUp,
  Target,
  Globe,
  Radio,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  PhoneForwarded,
  Activity,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Plus,
  Send,
  Building2,
  Mail,
  Zap,
  Check,
  ChevronRight,
  ShieldCheck,
  Search,
  Sliders,
  X,
  UserCheck
} from 'lucide-react';

interface PipelineStageProps {
  searchQuery?: string;
  dealsList?: PipelineDeal[];
  onUpdateDeals?: (deals: PipelineDeal[]) => void;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({
  searchQuery = '',
  dealsList,
  onUpdateDeals
}) => {
  // Module 1: Kanban Deals State
  const [deals, setDeals] = useState<PipelineDeal[]>(dealsList || PIPELINE_DEALS);
  const [escalatedDeal, setEscalatedDeal] = useState<PipelineDeal | null>(null);

  useEffect(() => {
    if (dealsList) {
      setDeals(dealsList);
    }
  }, [dealsList]);

  // Module 2: Inbound Ads Feed State & Modal
  const [adLeads, setAdLeads] = useState<InboundAdLead[]>(INBOUND_AD_LEADS);
  const [showAdModal, setShowAdModal] = useState<boolean>(false);
  const [adPlatform, setAdPlatform] = useState<'Google Search Ads' | 'Meta B2B Sponsored'>('Google Search Ads');
  const [simName, setSimName] = useState<string>('Jordan Lee');
  const [simEmail, setSimEmail] = useState<string>('jlee@austinbiologics.com');
  const [simCompany, setSimCompany] = useState<string>('Austin Biologics Inc');
  const [simSubRegion, setSimSubRegion] = useState<string>('Austin Silicon Hills');
  const [simNeed, setSimNeed] = useState<string>('Need 2 Gbps symmetrical dedicated fiber to replace Spectrum coax and support multi-site PACS imaging.');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Module 3: AI Phone Call Center State
  const [selectedCallLead, setSelectedCallLead] = useState<{
    name: string;
    company: string;
    phone: string;
    need: string;
  }>({
    name: 'David K. Hoffman',
    company: 'Atlanta FinTech Solutions',
    phone: '(404) 555-0812',
    need: '1 Gbps symmetrical dedicated internet to eliminate video conference lag'
  });

  const [callActive, setCallActive] = useState<boolean>(true);
  const [callSeconds, setCallSeconds] = useState<number>(14);
  const [simStep, setSimStep] = useState<number>(2);
  const [meetingBooked, setMeetingBooked] = useState<boolean>(false);

  const kanbanColumns: { id: KanbanStage; title: string; countBadge: string }[] = [
    { id: 'Outreach Sent', title: '1. Outreach Sent', countBadge: 'Awaiting Reply' },
    { id: 'AI Sentiment: Positive Reply', title: '2. AI Sentiment: Positive Reply', countBadge: 'High Intent' },
    { id: 'Qualification In Progress', title: '3. Qualification In Progress', countBadge: 'AI Phone Call' },
    { id: 'Ready for Account Manager', title: '4. Ready for Account Manager', countBadge: 'Calendar Booked' }
  ];

  // Pipeline calculations
  const totalTCV = deals.reduce((acc, d) => acc + d.tcv, 0);
  const totalMRR = deals.reduce((acc, d) => acc + d.mrr, 0);
  const weightedPipeline = deals.reduce((acc, d) => acc + (d.tcv * d.probability) / 100, 0);

  // 60-Second Call simulation dialogue steps
  const callDialogue = [
    {
      speaker: 'AI Voice Agent (Jessica Lin Clone)',
      text: `"Hello David, this is Jessica Lin with AT&T Enterprise Calling. I noticed your team just submitted an inquiry regarding fiber upgrades for Atlanta FinTech Solutions."`
    },
    {
      speaker: 'David K. Hoffman (VP of Infrastructure)',
      text: `"Hi Jessica. Yes, we currently have Spectrum Business coax. Our download is around 900M, but our upload is choked at 35M, which keeps crashing our morning Zoom board meetings and AWS database syncs."`
    },
    {
      speaker: 'AI Voice Agent (Real-Time Objection & SLA Engine)',
      text: `"Exactly David. That 35 Mbps upload bottleneck on shared coaxial lines is a common pain point in Atlanta Midtown. Our AT&T Dedicated Internet provides true unshared 1,000 Mbps symmetrical fiber both ways, backed by a 99.999% SLA and a contractual 4-hour MTTR."`
    },
    {
      speaker: 'David K. Hoffman (VP of Infrastructure)',
      text: `"That is exactly what we need. We are pre-cleared for budget. Can we get an executive proposal and pricing schedule review?"`
    },
    {
      speaker: 'AI Voice Agent (Automated Calendar Slot Offer)',
      text: `"I can lock that in right now on Jessica Lin's executive calendar. Does Thursday at 2:00 PM EST work for a 15-minute screen share with our principal fiber architect?"`
    },
    {
      speaker: 'David K. Hoffman (VP of Infrastructure)',
      text: `"Thursday at 2:00 PM works perfectly. Send the invite to dhoffman@atlanta-fintech.com."`
    },
    {
      speaker: 'AI Voice Agent (Closing & Instant Dispatch)',
      text: `"Calendar invite confirmed and dispatched to your inbox, along with the zero-dollar fiber construction waiver. Looking forward to Thursday David. Have a great day!"`
    }
  ];

  // Call timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (callActive && callSeconds < 60) {
      timer = setInterval(() => {
        setCallSeconds((prev) => {
          if (prev >= 59) {
            setCallActive(false);
            setMeetingBooked(true);
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callActive, callSeconds]);

  // Dialogue steps progression
  useEffect(() => {
    let stepTimer: ReturnType<typeof setTimeout>;
    if (callActive && simStep < callDialogue.length - 1) {
      stepTimer = setTimeout(() => {
        setSimStep((prev) => {
          const next = prev + 1;
          if (next >= callDialogue.length - 2) {
            setMeetingBooked(true);
          }
          return next;
        });
      }, 4500);
    }
    return () => clearTimeout(stepTimer);
  }, [callActive, simStep]);

  // Fast-Forward / Complete call
  const handleFastForwardCall = () => {
    setCallSeconds(60);
    setSimStep(callDialogue.length - 1);
    setCallActive(false);
    setMeetingBooked(true);
  };

  // Restart Call
  const handleRestartCall = () => {
    setCallSeconds(0);
    setSimStep(0);
    setCallActive(true);
    setMeetingBooked(false);
  };

  // Move deal to next or previous Kanban stage
  const handleMoveStage = (dealId: string, direction: 'forward' | 'backward') => {
    const stageOrder: KanbanStage[] = [
      'Outreach Sent',
      'AI Sentiment: Positive Reply',
      'Qualification In Progress',
      'Ready for Account Manager'
    ];

    setDeals((prev) =>
      prev.map((d) => {
        if (d.id === dealId) {
          const currentIndex = stageOrder.indexOf(d.stage);
          const nextIndex =
            direction === 'forward'
              ? Math.min(stageOrder.length - 1, currentIndex + 1)
              : Math.max(0, currentIndex - 1);
          return {
            ...d,
            stage: stageOrder[nextIndex],
            lastActivity: 'Just now • Stage Transition'
          };
        }
        return d;
      })
    );
  };

  // Simulate Ad Click & Inbound Form Fill
  const handleSimulateAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);

    setTimeout(() => {
      const newAdLead: InboundAdLead = {
        id: `ad-${Date.now()}`,
        platform: adPlatform,
        campaignName:
          adPlatform === 'Google Search Ads'
            ? 'AT&T Fiber vs Spectrum B2B - High Intent Search'
            : 'Meta B2B Sponsored - Stop Upload Throttling',
        prospectName: simName,
        workEmail: simEmail,
        company: simCompany,
        subRegion: simSubRegion,
        businessNeed: simNeed,
        adHeadline:
          adPlatform === 'Google Search Ads'
            ? 'Dedicated Gigabit Symmetrical Fiber: 99.999% SLA'
            : 'Is Spectrum Capping Your Business Upload at 35M?',
        timestamp: 'Just now',
        estimatedMrc: '$2,400/mo',
        qualificationStatus: 'Calling...'
      };

      // Inbound ad list injection
      setAdLeads((prev) => [newAdLead, ...prev]);

      // Kanban pipeline injection under 'Qualification In Progress'
      const newKanbanDeal: PipelineDeal = {
        id: `deal-sim-${Date.now()}`,
        company: simCompany,
        stage: 'Qualification In Progress',
        services: ['AT&T Dedicated Internet 1 Gbps', '5G Enterprise Backup'],
        mrr: 2400,
        tcv: 86400,
        probability: 70,
        closeDate: 'Dec 10, 2026',
        health: 'Accelerating',
        aiSentimentTag: 'Inbound Paid Ad Form: Requested Dedicated Fiber SLA Pricing',
        sentimentCategory: 'positive',
        lastActivity: 'Just now • Ad Lead Captured',
        contactName: simName,
        contactRole: 'VP of Tech',
        assignedAM: 'Jessica Lin'
      };

      setDeals((prev) => [newKanbanDeal, ...prev]);

      // Connect AI voice caller to new lead
      setSelectedCallLead({
        name: simName,
        company: simCompany,
        phone: '+1 (512) 555-0914',
        need: simNeed
      });
      handleRestartCall();

      setIsSimulating(false);
      setShowAdModal(false);
    }, 1000);
  };

  const getSentimentTagStyle = (category: string) => {
    switch (category) {
      case 'positive':
        return 'bg-[#FFCB9A]/15 text-[#FFCB9A] border-[#FFCB9A]/40';
      case 'urgent':
        return 'bg-[#D9B08C]/20 text-[#D9B08C] border-[#D9B08C]/50';
      case 'ready':
        return 'bg-[#116466]/40 text-[#D1E8E2] border-[#FFCB9A]/60 font-bold';
      default:
        return 'bg-[#2C3531] text-[#D1E8E2]/80 border-[#D1E8E2]/20';
    }
  };

  const formatSeconds = (sec: number) => {
    const s = sec % 60;
    return `00:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-xl border border-[#D1E8E2]/15 bg-gradient-to-r from-[#2C3531] via-[#116466]/30 to-[#2C3531]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="peach">Stage 04</Badge>
            <span className="text-xs font-mono text-[#D9B08C]">Revenue Engine & Phone Operations</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#D1E8E2] tracking-wide">
            Sales Pipeline, Web Leads & AI Phone Assistant
          </h2>
          <p className="text-xs text-[#D1E8E2]/70 mt-1 max-w-2xl">
            Track sentiment-driven deal velocity through the automated Kanban board, monitor live inbound leads from
            Meta & Google campaigns, and orchestrate autonomous AI Voice qualification calls with automated calendar bookings.
          </p>
        </div>

        {/* Global Pipeline Telemetry Chips */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#2C3531]/80 border border-[#D1E8E2]/15 text-right">
            <span className="text-[10px] font-mono text-[#D9B08C] uppercase block">Active Pipeline (TCV)</span>
            <span className="text-lg font-mono font-black text-[#FFCB9A]">
              ${(totalTCV / 1000).toFixed(0)}K
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#2C3531]/80 border border-[#D1E8E2]/15 text-right">
            <span className="text-[10px] font-mono text-[#D9B08C] uppercase block">Monthly Recurring (MRR)</span>
            <span className="text-lg font-mono font-black text-[#D1E8E2]">
              ${(totalMRR / 1000).toFixed(1)}K/mo
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#116466]/30 border border-[#FFCB9A]/40 text-right">
            <span className="text-[10px] font-mono text-[#FFCB9A] uppercase block">Weighted Pipeline</span>
            <span className="text-lg font-mono font-black text-[#FFCB9A]">
              ${(weightedPipeline / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>

      {/* 1. Sentiment-Driven Kanban Pipeline Module */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#FFCB9A]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D1E8E2]">
              Sentiment-Driven Kanban Pipeline ({deals.length} Active Opportunities)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const highTicket = deals.find((d) => d.tcv >= 150000) || deals[0];
                setEscalatedDeal(highTicket);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#116466]/40 border border-[#FFCB9A]/50 text-[#FFCB9A] text-[10px] font-mono font-bold hover:bg-[#116466] transition-all flex items-center gap-1 shadow-sm active:scale-95"
            >
              <UserCheck className="w-3 h-3 text-[#FFCB9A]" />
              <span>Executive Deal Review</span>
            </button>
            <span className="text-[11px] font-mono text-[#D9B08C]">
              Rep: <strong className="text-[#FFCB9A]">Jessica Lin</strong> (142%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {kanbanColumns.map((col) => {
            const columnDeals = deals.filter((d) => d.stage === col.id);
            const columnMrr = columnDeals.reduce((sum, d) => sum + d.mrr, 0);

            return (
              <GlassCard key={col.id} className="p-3.5 flex flex-col min-h-[480px]" showReticles={true}>
                {/* Column Header */}
                <div className="pb-2.5 mb-2.5 border-b border-[#D1E8E2]/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-[#D1E8E2] uppercase tracking-wide">
                      {col.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#D9B08C]">{col.countBadge}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-black text-[#FFCB9A]">
                      ${(columnMrr / 1000).toFixed(1)}K/mo
                    </span>
                    <span className="text-[9px] font-mono text-[#D1E8E2]/50 block">
                      {columnDeals.length} Deals
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[460px] pr-0.5">
                  {columnDeals.length === 0 ? (
                    <div className="p-4 rounded-lg bg-[#2C3531]/40 border border-dashed border-[#D1E8E2]/15 text-center text-[10px] font-mono text-[#D1E8E2]/40">
                      No deals in this stage
                    </div>
                  ) : (
                    columnDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-3 rounded-xl bg-[#2C3531]/95 border border-[#D1E8E2]/15 hover:border-[#FFCB9A]/60 transition-all shadow-md group"
                      >
                        {/* Company & Header */}
                        <div className="flex items-start justify-between gap-1 mb-1.5">
                          <h5 className="text-xs font-extrabold text-[#D1E8E2] group-hover:text-[#FFCB9A] transition-colors leading-tight">
                            {deal.company}
                          </h5>
                          <span className="text-[9px] font-mono font-bold text-[#FFCB9A]">
                            {deal.probability}%
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="text-[10px] font-mono text-[#D9B08C] mb-2">
                          {deal.contactName} ({deal.contactRole})
                        </div>

                        {/* AI Sentiment Tag */}
                        <div
                          className={`p-1.5 rounded-lg border text-[10px] font-mono leading-tight mb-2.5 ${getSentimentTagStyle(
                            deal.sentimentCategory
                          )}`}
                        >
                          <span className="font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#FFCB9A]" />
                            {deal.aiSentimentTag}
                          </span>
                        </div>

                        {/* Services List */}
                        <div className="text-[10px] font-mono text-[#D1E8E2]/75 truncate mb-2">
                          {deal.services.join(' • ')}
                        </div>

                        {/* Financials & Interactive Stage Arrows */}
                        <div className="pt-2 border-t border-[#D1E8E2]/10 flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="text-[10px] text-[#D1E8E2]/50">MRR: </span>
                            <span className="font-bold text-[#FFCB9A]">${deal.mrr.toLocaleString()}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEscalatedDeal(deal)}
                              className="px-1.5 py-0.5 rounded bg-[#116466]/40 border border-[#D9B08C]/40 text-[#FFCB9A] hover:bg-[#116466] text-[9px] flex items-center gap-1 transition-all"
                              title="Executive Deal Review"
                            >
                              <UserCheck className="w-2.5 h-2.5" />
                              <span>Escalate</span>
                            </button>
                            {col.id !== 'Outreach Sent' && (
                              <button
                                onClick={() => handleMoveStage(deal.id, 'backward')}
                                className="p-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#D9B08C] text-[#D1E8E2]/70 hover:text-[#D1E8E2]"
                                title="Move to previous stage"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                            )}
                            {col.id !== 'Ready for Account Manager' && (
                              <button
                                onClick={() => handleMoveStage(deal.id, 'forward')}
                                className="p-1 rounded bg-[#116466] border border-[#FFCB9A]/50 text-[#FFCB9A] hover:bg-[#FFCB9A] hover:text-[#2C3531] transition-all"
                                title="Advance to next stage"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Lower Dual Module Section: Ads Lead Capture + AI Voice Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2. Meta & Google Ads Lead Capture Simulator Module */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-5 flex flex-col justify-between h-[640px]" showReticles={true}>
            <div>
              {/* Module Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D1E8E2]/15">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center text-[#FFCB9A]">
                    <Target className="w-4 h-4 text-[#FFCB9A]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#D1E8E2] uppercase tracking-wider flex items-center gap-1.5">
                      Meta & Google Ads Lead Capture
                      <span className="w-2 h-2 rounded-full bg-[#FFCB9A] inline-block animate-pulse" />
                    </h3>
                    <p className="text-[10px] font-mono text-[#D9B08C]">
                      Real-Time Campaign Geofencing • Atlanta, Austin & DFW
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAdModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#FFCB9A] text-[#2C3531] text-xs font-bold hover:bg-[#FFCB9A]/90 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,203,154,0.3)] active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate Web Lead Submission</span>
                </button>
              </div>

              {/* Campaign Telemetry Stats */}
              <div className="grid grid-cols-4 gap-2 p-2.5 rounded-lg bg-[#2C3531]/80 border border-[#D1E8E2]/10 mb-3 text-[10px] font-mono">
                <div>
                  <span className="text-[#D1E8E2]/50 block">Impressions:</span>
                  <span className="font-bold text-[#D1E8E2]">64,200</span>
                </div>
                <div>
                  <span className="text-[#D1E8E2]/50 block">Clicks:</span>
                  <span className="font-bold text-[#FFCB9A]">2,840</span>
                </div>
                <div>
                  <span className="text-[#D1E8E2]/50 block">CTR:</span>
                  <span className="font-bold text-[#D9B08C]">3.8%</span>
                </div>
                <div>
                  <span className="text-[#D1E8E2]/50 block">Avg CPA:</span>
                  <span className="font-bold text-[#FFCB9A]">$18.40</span>
                </div>
              </div>

              {/* Live Inbound Leads Feed */}
              <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
                <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                  Live Inbound Feed ({adLeads.length} Captured Leads):
                </span>

                {adLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 rounded-xl bg-[#2C3531]/90 border border-[#D1E8E2]/15 hover:border-[#FFCB9A]/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${
                              lead.platform === 'Google Search Ads'
                                ? 'bg-[#116466]/40 text-[#FFCB9A] border border-[#FFCB9A]/40'
                                : 'bg-[#2C3531] text-[#D9B08C] border border-[#D9B08C]/40'
                            }`}
                          >
                            {lead.platform}
                          </span>
                          <span className="text-[9px] font-mono text-[#D1E8E2]/50">{lead.timestamp}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#D1E8E2]">{lead.company}</h4>
                        <p className="text-[10px] font-mono text-[#D9B08C]">
                          {lead.prospectName} • {lead.subRegion}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[#FFCB9A]">
                          {lead.estimatedMrc}
                        </span>
                        <Badge
                          variant={lead.qualificationStatus === 'Calling...' ? 'peach' : 'teal'}
                          className="text-[9px] block mt-1"
                        >
                          {lead.qualificationStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-2 p-2 rounded bg-[#116466]/20 border border-[#116466]/50 text-[11px] text-[#D1E8E2] leading-tight font-sans">
                      "{lead.businessNeed}"
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#D1E8E2]/10 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#D1E8E2]/50 truncate max-w-[240px]">
                        Ad: {lead.adHeadline}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCallLead({
                            name: lead.prospectName,
                            company: lead.company,
                            phone: '+1 (404) 555-8910',
                            need: lead.businessNeed
                          });
                          handleRestartCall();
                        }}
                        className="text-[#FFCB9A] hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>Trigger AI Call</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inbound Ads Footnote */}
            <div className="pt-2 border-t border-[#D1E8E2]/15 text-[10px] font-mono text-[#D9B08C] flex items-center justify-between">
              <span>Geo-Targeted to High-Density B2B Tech Corridors</span>
              <span>100% Leads Injected to Pipeline</span>
            </div>
          </GlassCard>
        </div>

        {/* 3. AI Outbound Voice & Mail Center Module */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-5 flex flex-col justify-between h-[640px]" showReticles={true}>
            <div>
              {/* Telephony Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D1E8E2]/15">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center text-[#FFCB9A]">
                    <Mic className="w-4 h-4 text-[#FFCB9A]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#D1E8E2] uppercase tracking-wider flex items-center gap-1.5">
                      AI Outbound Voice & Telephony Node
                      <span className="w-2 h-2 rounded-full bg-[#FFCB9A] inline-block animate-pulse" />
                    </h3>
                    <p className="text-[10px] font-mono text-[#D9B08C]">
                      Target: {selectedCallLead.name} ({selectedCallLead.company})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FFCB9A] px-2 py-1 rounded bg-[#2C3531] border border-[#FFCB9A]/30">
                    {formatSeconds(callSeconds)} / 01:00
                  </span>
                  <button
                    onClick={() => setCallActive(!callActive)}
                    className="p-1.5 rounded-lg bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#FFCB9A] text-[#D1E8E2]"
                    title={callActive ? 'Pause Call' : 'Resume Call'}
                  >
                    {callActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleFastForwardCall}
                    className="p-1.5 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 text-[#FFCB9A] hover:bg-[#FFCB9A] hover:text-[#2C3531] text-[10px] font-mono font-bold"
                    title="Fast forward to end of call"
                  >
                    Fast-Forward
                  </button>
                </div>
              </div>

              {/* Dynamic Waveform Visualizer in #FFCB9A & #116466 */}
              <div className="p-3.5 rounded-xl bg-[#2C3531]/95 border border-[#D1E8E2]/15 mb-3">
                <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
                  <span className="text-[#D9B08C] uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#FFCB9A]" /> Full Duplex Audio Stream (Jessica Lin Voice Clone)
                  </span>
                  <span className="text-[#FFCB9A]">
                    {callActive ? 'Transmitting 24kHz Telephony Audio...' : 'Call Concluded (60s Qualification)'}
                  </span>
                </div>

                <div className="h-14 flex items-center justify-center gap-1.5 px-3 bg-[#116466]/20 rounded-lg border border-[#116466]/50">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const heightPercent = callActive
                      ? Math.min(
                          100,
                          Math.max(15, ((Math.sin(i * 0.65 + callSeconds * 3.5) + 1) / 2) * 95)
                        )
                      : 12;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-150 ${
                          callActive ? 'bg-[#FFCB9A]' : 'bg-[#D1E8E2]/25'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Automated "Meeting Booked on Account Manager Calendar" Badge */}
              {meetingBooked && (
                <div className="p-3.5 rounded-xl bg-[#116466]/40 border-2 border-[#FFCB9A] mb-3 shadow-[0_0_20px_rgba(255,203,154,0.3)] animate-fadeIn">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#FFCB9A]/30">
                    <span className="text-xs font-mono font-black text-[#FFCB9A] flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-4 h-4 text-[#FFCB9A]" /> Meeting Booked on Account Manager Calendar
                    </span>
                    <Badge variant="peach" className="text-[9px]">
                      Confirmed
                    </Badge>
                  </div>
                  <div className="text-xs font-sans text-[#D1E8E2] space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#D9B08C]" />
                      <span className="font-semibold text-[#FFCB9A]">
                        Thursday, Nov 12 at 2:00 PM EST with Jessica Lin
                      </span>
                    </div>
                    <p className="text-[11px] text-[#D1E8E2]/80">
                      Agenda: 15-Minute AT&T Dedicated Fiber 1Gbps Feasibility Review & MSA Pricing Waiver for {selectedCallLead.company}.
                    </p>
                  </div>
                </div>
              )}

              {/* Live Call Transcript Preview */}
              <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1">
                <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                  Live Conversational Telemetry:
                </span>

                {callDialogue.slice(0, simStep + 1).map((step, idx) => {
                  const isAgent = step.speaker.includes('Agent');
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs leading-relaxed transition-all ${
                        isAgent
                          ? 'bg-[#116466]/30 border-[#116466]/80 text-[#D1E8E2]'
                          : 'bg-[#2C3531] border-[#D9B08C]/40 text-[#D1E8E2]/90'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] font-mono font-bold ${
                            isAgent ? 'text-[#FFCB9A]' : 'text-[#D9B08C]'
                          }`}
                        >
                          {step.speaker}
                        </span>
                        <span className="text-[9px] font-mono text-[#D1E8E2]/40">
                          {isAgent ? 'Voice Synthesizer (180ms)' : 'Prospect (Mobile PSTN)'}
                        </span>
                      </div>
                      <p className="font-sans text-[11px]">{step.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#D1E8E2]/15 flex items-center justify-between text-xs font-mono">
              <span className="text-[#D9B08C]">AI Node: 99.8% Speech Accuracy</span>
              <button
                onClick={handleRestartCall}
                className="text-[#FFCB9A] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart 60s Call Simulation</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Interactive Modal: Simulate Ad Click & Inbound Form Fill */}
      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3531]/80 backdrop-blur-xl animate-fadeIn">
          <GlassCard className="max-w-lg w-full p-6 relative" showReticles={true}>
            <div className="flex items-center justify-between pb-3 border-b border-[#D1E8E2]/15">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FFCB9A]" />
                <div>
                  <h3 className="text-sm font-bold text-[#D1E8E2] uppercase">
                    Simulate Paid Ad Click & Lead Form
                  </h3>
                  <p className="text-[10px] font-mono text-[#D9B08C]">
                    Tests regional Google / Meta ad capture & pipeline injection
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAdModal(false)}
                className="text-[#D1E8E2]/70 hover:text-[#FFCB9A] text-xs font-mono px-2 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20"
              >
                ✕ Close
              </button>
            </div>

            {/* Quick Test Presets */}
            <div className="py-3 border-b border-[#D1E8E2]/10 space-y-1.5">
              <span className="text-[10px] font-mono text-[#D9B08C] uppercase block">
                Quick-Fill Test Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAdPlatform('Google Search Ads');
                    setSimName('Jordan Lee');
                    setSimEmail('jlee@austinbiologics.com');
                    setSimCompany('Austin Biologics Inc');
                    setSimSubRegion('Austin Silicon Hills');
                    setSimNeed('Need 2 Gbps dedicated fiber to replace Spectrum coax upload throttling.');
                  }}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#FFCB9A] text-[#D1E8E2]"
                >
                  ⚡ Austin BioTech (2G Fiber)
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAdPlatform('Meta B2B Sponsored');
                    setSimName('Elena Rostova');
                    setSimEmail('erostova@peachtree-legal.com');
                    setSimCompany('Peachtree Legal Partners');
                    setSimSubRegion('Atlanta Midtown Telecom Hub');
                    setSimNeed('Urgent copper T1 sunset replacement with Business Fiber and Teams Voice.');
                  }}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#FFCB9A] text-[#D1E8E2]"
                >
                  ⚡ Atlanta Legal (Copper Sunset)
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSimulateAdSubmit} className="py-3 space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                  Ad Platform:
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAdPlatform('Google Search Ads')}
                    className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-semibold ${
                      adPlatform === 'Google Search Ads'
                        ? 'bg-[#FFCB9A] text-[#2C3531]'
                        : 'bg-[#2C3531] text-[#D1E8E2] border border-[#D1E8E2]/15'
                    }`}
                  >
                    Google Search Ads
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdPlatform('Meta B2B Sponsored')}
                    className={`flex-1 py-1.5 rounded-lg font-mono text-xs font-semibold ${
                      adPlatform === 'Meta B2B Sponsored'
                        ? 'bg-[#FFCB9A] text-[#2C3531]'
                        : 'bg-[#2C3531] text-[#D1E8E2] border border-[#D1E8E2]/15'
                    }`}
                  >
                    Meta B2B Sponsored
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Prospect Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={simName}
                    onChange={(e) => setSimName(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Work Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={simEmail}
                    onChange={(e) => setSimEmail(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Company:
                  </label>
                  <input
                    type="text"
                    required
                    value={simCompany}
                    onChange={(e) => setSimCompany(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                    Sub-Region:
                  </label>
                  <input
                    type="text"
                    required
                    value={simSubRegion}
                    onChange={(e) => setSimSubRegion(e.target.value)}
                    className="w-full glass-input rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                  Business Need & Telecom Inquiry:
                </label>
                <textarea
                  rows={2}
                  required
                  value={simNeed}
                  onChange={(e) => setSimNeed(e.target.value)}
                  className="w-full glass-input rounded-lg p-2 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D9B08C]">
                  Triggers Instant AI Voice Outbound Call
                </span>
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg bg-[#FFCB9A] text-[#2C3531] text-xs font-bold hover:bg-[#FFCB9A]/90 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,203,154,0.3)] disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSimulating ? 'Injecting Lead...' : 'Submit & Inject Lead'}</span>
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Human-in-the-Loop Escalation Modal */}
      {escalatedDeal && (
        <HumanInTheLoopModal
          deal={escalatedDeal}
          onClose={() => setEscalatedDeal(null)}
          onTakeoverComplete={(updatedDeal) => {
            const updated = deals.map((d) => (d.id === updatedDeal.id ? updatedDeal : d));
            setDeals(updated);
            if (onUpdateDeals) {
              onUpdateDeals(updated);
            }
          }}
        />
      )}
    </div>
  );
};

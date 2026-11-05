import React, { useState, useEffect, useRef } from 'react';
import { ATNT_CORE_SERVICES, VECTOR_PDF_DOCS, INITIAL_RAG_CONVERSATION } from '../../data/telecomData';
import { CatalogProduct, RAGMessage, VectorPdfDoc } from '../../types';
import { GlassCard, Badge } from '../GlassCard';
import {
  Layers,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Copy,
  Terminal,
  Cpu,
  RefreshCw,
  Globe,
  FileText,
  Send,
  Sliders,
  ChevronRight,
  Database,
  ExternalLink,
  BookOpen,
  Wifi,
  PhoneCall,
  Lock,
  Radio,
  Maximize2,
  Minimize2,
  Info
} from 'lucide-react';

export const CatalogStage: React.FC<{ searchQuery?: string }> = ({ searchQuery = '' }) => {
  // Services & Category State
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(ATNT_CORE_SERVICES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Live Portal Sync State
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStep, setSyncStep] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Today at 16:02:18 EST');
  const [syncStatusText, setSyncStatusText] = useState<string>('Portal Monitor: 4 AT&T Portals Monitored (att.com/business, Partner Portal, Rate Guides)');

  // RAG Assistant State
  const [ragMessages, setRagMessages] = useState<RAGMessage[]>(INITIAL_RAG_CONVERSATION);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSplitScreenExpanded, setIsSplitScreenExpanded] = useState<boolean>(false);
  const [showPdfDrawer, setShowPdfDrawer] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<VectorPdfDoc | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Connectivity',
    'Broadband',
    'SD-WAN & Security',
    '5G & Mobility',
    'Voice & Collaboration',
    'Cybersecurity'
  ];

  const quickPromptChips = [
    {
      title: 'Why Switch from Cable?',
      prompt: 'Why should a 300-worker manufacturing plant switch from shared cable to dedicated fiber?',
      scenario: '300-Employee Discrete Manufacturing Hub (Automated Robotics & ERP)',
      recommendedCodes: ['ATT-ADI-100G', 'ATT-SDWAN-SASE'],
      mrc: '$1,950 – $3,400/mo',
      citationDoc: 'ATT_ADI_Master_Service_Agreement_2026.pdf',
      citationPage: 14,
      analysis: 'For high-throughput industrial plants with active ERP telemetry and computer-vision robotics, AT&T Dedicated Internet (ADI) provides guaranteed symmetrical unshared throughput. Coupling ADI with Managed SD-WAN (SASE) delivers dynamic QoS prioritizing shop-floor PLC packets over guest traffic, backed by active 5G backup circuits.'
    },
    {
      title: 'Hospital 99.999% Reliability',
      prompt: 'What guarantees does AT&T provide for hospitals requiring 99.999% uptime?',
      scenario: 'Regional Trauma Hospital & Multi-Campus Telemedicine PACS Imaging',
      recommendedCodes: ['ATT-ADI-100G', 'ATT-SEC-USM'],
      mrc: '$2,800 – $5,200/mo',
      citationDoc: 'ATT_ADI_Master_Service_Agreement_2026.pdf',
      citationPage: 22,
      analysis: 'Trauma healthcare networks demand 99.999% availability (maximum allowable downtime of 5.26 minutes per calendar year). AT&T ADI contracts provide a strict 4-Hour Mean Time to Restore (MTTR) with automated financial billing credits if latency exceeds 35ms or packet loss surpasses 0.1% across Tier-1 nodes.'
    },
    {
      title: 'Copper T1 Sunset Migration',
      prompt: 'What is the copper T1 sunset cutover path to Business Fiber?',
      scenario: 'Enterprise Legacy Voice PBX & T1 Data Replacement (FCC Section 214 Sunset)',
      recommendedCodes: ['ATT-BF-5GIG', 'ATT-CV-WEBEX'],
      mrc: '$280 – $780/mo (Replaces $1,400+ T1 Surcharges)',
      citationDoc: 'ATT_Business_Fiber_Rate_Card_v4.pdf',
      citationPage: 6,
      analysis: 'FCC Section 214 regulatory filings allow carriers to discontinue copper T1 circuits, triggering tariff increases up to 340%. The recommended migration path ports legacy lines to AT&T Business Fiber (up to 5 Gbps symmetrical) paired with AT&T Cloud Voice Webex SIP trunking, slashing MRC by 60% with zero downtime.'
    },
    {
      title: '12 Retail Branches 5G Failover',
      prompt: 'Quote 5G Enterprise Mobility failover for 12 retail branches',
      scenario: '12-Site Regional Retail Chain (Point-of-Sale & Inventory Cloud Sync)',
      recommendedCodes: ['ATT-5G-FWA', 'ATT-BF-5GIG'],
      mrc: '$1,440/mo ($120/site/mo pooled)',
      citationDoc: 'ATT_5G_Fixed_Wireless_Tariff_Schedule_7.pdf',
      citationPage: 9,
      analysis: 'For distributed retail branches, AT&T 5G Enterprise Fixed Wireless (FWA) acts as an automatic secondary failover circuit. In the event of roadside trenching or fiber cuts, POS credit transactions switch to 5G+ mid-band in under 3 seconds with static IP retention, keeping cash registers operational.'
    }
  ];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ragMessages, isGenerating]);

  // Handle Check Live AT&T Portals
  const handleTriggerSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStep(1);

    const steps = [
      { text: 'Connecting to AT&T Enterprise Business Gateway & Partner API...', delay: 700 },
      { text: 'Scraping Tariff Schedule 12 & ADI Symmetrical Tier cards...', delay: 800 },
      { text: 'Re-indexing 6 Service PDFs & Updating HNSW Vector Embeddings...', delay: 800 },
      { text: 'Live Sync Complete: 6 Core Services Verified (0 Drift Detected)', delay: 600 }
    ];

    let current = 0;
    const runNext = () => {
      if (current < steps.length) {
        setSyncStatusText(steps[current].text);
        setSyncStep(current + 1);
        current++;
        setTimeout(runNext, steps[current - 1].delay);
      } else {
        setIsSyncing(false);
        const now = new Date();
        const formatted = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} EST`;
        setLastSyncTime(formatted);
      }
    };

    runNext();
  };

  // Filter products by category and search
  const filteredProducts = ATNT_CORE_SERVICES.filter((prod) => {
    const matchesCategory = activeCategory === 'All' || prod.category === activeCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle RAG prompt execution
  const executeRAGQuery = (queryText: string) => {
    if (!queryText.trim() || isGenerating) return;

    const userMsg: RAGMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryText
    };

    setRagMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    // Find matched chip or build contextual response
    const matchedChip = quickPromptChips.find((c) =>
      queryText.toLowerCase().includes(c.title.toLowerCase()) ||
      c.prompt.toLowerCase().includes(queryText.toLowerCase()) ||
      queryText.toLowerCase().includes('manufacturing') && c.prompt.includes('manufacturing') ||
      queryText.toLowerCase().includes('hospital') && c.prompt.includes('hospital') ||
      queryText.toLowerCase().includes('copper') && c.prompt.includes('copper') ||
      queryText.toLowerCase().includes('retail') && c.prompt.includes('retail')
    );

    setTimeout(() => {
      let assistantMsg: RAGMessage;

      if (matchedChip) {
        const recServices = ATNT_CORE_SERVICES.filter((s) =>
          matchedChip.recommendedCodes.includes(s.code)
        );

        assistantMsg = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Here is the structured solution recommendation based on **${matchedChip.citationDoc}**:`,
          citations: [
            {
              source: matchedChip.citationDoc,
              page: matchedChip.citationPage,
              relevance: '99.2% Vector Similarity (Cosine Metric: 0.96)',
              excerpt: matchedChip.analysis
            }
          ],
          structuredRecommendation: {
            clientScenario: matchedChip.scenario,
            architectureType: 'Dual-Path Resilient Enterprise Mesh (Tier-1 Core + Active SASE)',
            recommendedServices: recServices.map((s) => ({
              name: s.name,
              code: s.code,
              priceTier: s.monthlyEstimate,
              role: s.speedTiers
            })),
            estimatedTotalMrc: matchedChip.mrc,
            roiSummary: 'Zero construction build fee for on-net facilities; 99.999% SLA eliminates unbudgeted downtime losses.'
          }
        };
      } else {
        // Contextual response based on active or selected service
        assistantMsg = {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Analyzing enterprise requirements against AT&T Service Catalog & Tariff Guides for: **"${queryText}"**`,
          citations: [
            {
              source: selectedProduct.vectorPdfSource.fileName,
              page: selectedProduct.vectorPdfSource.page,
              relevance: selectedProduct.vectorPdfSource.matchScore,
              excerpt: `${selectedProduct.name} delivers ${selectedProduct.speedTiers} with ${selectedProduct.sla}. ${selectedProduct.competitiveEdge}`
            }
          ],
          structuredRecommendation: {
            clientScenario: `Tailored Inquiry for ${selectedProduct.name}`,
            architectureType: 'Enterprise Dedicated Backbone Integration',
            recommendedServices: [
              {
                name: selectedProduct.name,
                code: selectedProduct.code,
                priceTier: selectedProduct.monthlyEstimate,
                role: selectedProduct.speedTiers
              }
            ],
            estimatedTotalMrc: selectedProduct.monthlyEstimate,
            roiSummary: `${selectedProduct.competitiveEdge} Full coverage across ${selectedProduct.regionalCoverage.join(', ')}.`
          }
        };
      }

      setRagMessages((prev) => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 850);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'Connectivity':
        return Zap;
      case 'Broadband':
        return Wifi;
      case 'SD-WAN & Security':
        return Shield;
      case '5G & Mobility':
        return Radio;
      case 'Voice & Collaboration':
        return PhoneCall;
      case 'Cybersecurity':
        return Lock;
      default:
        return Layers;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Automated Catalog Sync Header */}
      <GlassCard className="p-4" showReticles={true}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Scraper Status & Monitoring Pulse */}
          <div className="flex items-start sm:items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-[#116466]/40 border border-[#FFCB9A]/50 flex items-center justify-center text-[#FFCB9A] shadow-[0_0_15px_rgba(255,203,154,0.2)]">
                <Globe className={`w-5 h-5 ${isSyncing ? 'animate-spin text-[#FFCB9A]' : 'text-[#D1E8E2]'}`} />
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFCB9A] absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#FFCB9A] flex items-center gap-1.5">
                  Official Portal Monitor:
                  <span className="text-[#D1E8E2] font-semibold">Active & Synced</span>
                </h3>
                <Badge variant="mint" className="text-[9px] py-0.5">
                  4 Official Portals
                </Badge>
              </div>
              <p className="text-[11px] font-mono text-[#D1E8E2]/75 mt-0.5">
                {syncStatusText}
              </p>
            </div>
          </div>

          {/* Sync Timestamp & Trigger Button */}
          <div className="flex items-center gap-3 self-end lg:self-center">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C]">Last Portal Sync</span>
              <p className="text-xs font-mono font-bold text-[#D1E8E2]">{lastSyncTime}</p>
            </div>

            <button
              onClick={handleTriggerSync}
              disabled={isSyncing}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2
                ${
                  isSyncing
                    ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A]/60 shadow-[0_0_15px_rgba(255,203,154,0.3)] cursor-wait'
                    : 'bg-[#FFCB9A] text-[#2C3531] hover:bg-[#FFCB9A]/90 hover:scale-[1.02] shadow-[0_0_18px_rgba(255,203,154,0.35)] active:scale-95'
                }
              `}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? `Checking Portals [${syncStep}/4]...` : 'Check Live AT&T Portals'}</span>
            </button>
          </div>
        </div>

        {/* Sync Progress Bar when active */}
        {isSyncing && (
          <div className="mt-3 pt-3 border-t border-[#D1E8E2]/10">
            <div className="w-full bg-[#116466]/40 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FFCB9A] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(syncStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}
      </GlassCard>

      {/* Category Filter Pills & Vector DB Specs Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200
                ${
                  activeCategory === cat
                    ? 'bg-[#FFCB9A] text-[#2C3531] shadow-[0_0_12px_rgba(255,203,154,0.3)]'
                    : 'bg-[#2C3531]/90 text-[#D1E8E2]/70 hover:text-[#D1E8E2] border border-[#D1E8E2]/15 hover:border-[#D9B08C]/40'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPdfDrawer(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#116466]/30 border border-[#D9B08C]/40 text-xs font-mono text-[#D9B08C] hover:text-[#FFCB9A] hover:border-[#FFCB9A] transition-all"
          >
            <Database className="w-3.5 h-3.5 text-[#FFCB9A]" />
            <span>AT&T Business Rate Cards (6 PDFs)</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Service Grid & Split-Screen RAG Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2. Interactive AT&T Enterprise Service Grid */}
        <div
          className={`
            transition-all duration-300 space-y-4
            ${isSplitScreenExpanded ? 'lg:col-span-4' : 'lg:col-span-6 xl:col-span-7'}
          `}
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D9B08C] font-bold">
              Core AT&T Business Plans ({filteredProducts.length})
            </span>
            <span className="text-[11px] font-mono text-[#D1E8E2]/60">Click plan card to ask Copilot</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((service) => {
              const isSelected = selectedProduct.id === service.id;
              const IconComp = getServiceIcon(service.category);

              return (
                <GlassCard
                  key={service.id}
                  active={isSelected}
                  onClick={() => setSelectedProduct(service)}
                  className="p-4 cursor-pointer flex flex-col justify-between group transition-all duration-300"
                >
                  <div>
                    {/* Header: Service Code + Category */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`
                            w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                            ${isSelected ? 'bg-[#FFCB9A] text-[#2C3531]' : 'bg-[#116466]/40 text-[#FFCB9A]'}
                          `}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-mono text-[#D9B08C] bg-[#116466]/30 px-1.5 py-0.5 rounded border border-[#D1E8E2]/15">
                          {service.code}
                        </span>
                      </div>
                      <Badge variant={isSelected ? 'peach' : 'teal'} className="text-[9px]">
                        {service.category}
                      </Badge>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-sm font-black text-[#D1E8E2] group-hover:text-[#FFCB9A] transition-colors line-clamp-1">
                      {service.name}
                    </h3>

                    {/* Speed Tiers */}
                    <div className="mt-2.5 space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                          Speed Tiers:
                        </span>
                        <p className="font-semibold text-[#D1E8E2] truncate">{service.speedTiers}</p>
                      </div>

                      {/* SLA Uptime */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                          SLA Uptime:
                        </span>
                        <p className="text-[11px] text-[#D1E8E2]/85 line-clamp-1">{service.sla}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Range in #FFCB9A & Coverage Tags in #D9B08C */}
                  <div className="mt-3 pt-3 border-t border-[#D1E8E2]/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D9B08C] uppercase">
                        Monthly Investment:
                      </span>
                      <span className="text-xs font-mono font-black text-[#FFCB9A]">
                        {service.monthlyEstimate}
                      </span>
                    </div>

                    {/* Regional Coverage Tags */}
                    <div>
                      <span className="text-[10px] font-mono text-[#D9B08C] uppercase block mb-1">
                        Regional Coverage:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.regionalCoverage.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#2C3531] text-[#D9B08C] border border-[#D9B08C]/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          executeRAGQuery(`Explain technical architecture and battlecard for ${service.name}`);
                        }}
                        className="text-[10px] font-mono text-[#FFCB9A] hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Ask Proposal Copilot</span>
                      </button>

                      <span className="text-[10px] font-mono text-[#D1E8E2]/50">
                        {service.vectorPdfSource.matchScore.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* 3. Internal AT&T Sales & Proposal Copilot Panel */}
        <div
          className={`
            transition-all duration-300
            ${isSplitScreenExpanded ? 'lg:col-span-8' : 'lg:col-span-6 xl:col-span-5'}
          `}
        >
          <GlassCard className="p-5 flex flex-col h-[740px]" showReticles={true}>
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D1E8E2]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[#FFCB9A]" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#D1E8E2] uppercase tracking-wider flex items-center gap-1.5">
                    AT&T Sales & Proposal Copilot
                    <span className="w-2 h-2 rounded-full bg-[#FFCB9A] inline-block animate-pulse" />
                  </h3>
                  <p className="text-[10px] font-mono text-[#D9B08C]">
                    6 Official AT&T Rate Cards Indexed • Verified Contract Citations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSplitScreenExpanded(!isSplitScreenExpanded)}
                  className="p-1.5 rounded-lg bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#FFCB9A] text-[#D1E8E2]/70 hover:text-[#FFCB9A] transition-colors"
                  title={isSplitScreenExpanded ? 'Standard Split Screen' : 'Expand Split Screen'}
                >
                  {isSplitScreenExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Quick-Prompt Chips Carousel */}
            <div className="py-2.5 border-b border-[#D1E8E2]/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                Common Client Questions:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {quickPromptChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeRAGQuery(chip.prompt)}
                    disabled={isGenerating}
                    className="flex-shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#2C3531] hover:bg-[#116466]/40 border border-[#D1E8E2]/20 hover:border-[#FFCB9A] text-[#D1E8E2] hover:text-[#FFCB9A] transition-all disabled:opacity-50"
                  >
                    ⚡ {chip.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
              {ragMessages.map((msg) => {
                const isAssistant = msg.sender === 'assistant';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`
                        max-w-[95%] rounded-xl p-3.5 text-xs leading-relaxed transition-all
                        ${
                          isAssistant
                            ? 'bg-[#2C3531]/95 border border-[#116466]/80 text-[#D1E8E2] shadow-lg'
                            : 'bg-[#116466]/70 border border-[#FFCB9A]/50 text-[#FFCB9A] font-medium'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3 pb-1 mb-1.5 border-b border-[#D1E8E2]/10">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#D9B08C]">
                          {isAssistant ? 'AT&T Sales & Proposal Copilot' : 'Jessica Lin (AM)'}
                        </span>
                        <span className="text-[9px] font-mono text-[#D1E8E2]/50">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className="whitespace-pre-line font-sans">{msg.text}</div>

                      {/* Structured Recommendation Card */}
                      {msg.structuredRecommendation && (
                        <div className="mt-3 p-3 rounded-lg bg-[#2C3531] border border-[#FFCB9A]/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-[#FFCB9A] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#FFCB9A]" /> Proposed Plan
                            </span>
                            <span className="text-[10px] font-mono font-bold text-[#FFCB9A]">
                              {msg.structuredRecommendation.estimatedTotalMrc}
                            </span>
                          </div>

                          <div className="text-[11px] text-[#D1E8E2]/90">
                            <span className="font-semibold text-[#D9B08C]">Target Scenario: </span>
                            {msg.structuredRecommendation.clientScenario}
                          </div>

                          {/* Recommended Services Table */}
                          <div className="space-y-1 pt-1 border-t border-[#D1E8E2]/10">
                            {msg.structuredRecommendation.recommendedServices.map((srv, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between text-[10px] font-mono p-1 rounded bg-[#116466]/20"
                              >
                                <span className="text-[#D1E8E2] font-semibold">{srv.name}</span>
                                <span className="text-[#FFCB9A]">{srv.priceTier}</span>
                              </div>
                            ))}
                          </div>

                          <div className="text-[10px] text-[#D1E8E2]/75 italic pt-1">
                            ROI: {msg.structuredRecommendation.roiSummary}
                          </div>
                        </div>
                      )}

                      {/* Formal PDF Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-[#D1E8E2]/15 space-y-1">
                          <span className="text-[9px] font-mono uppercase text-[#D9B08C] block">
                            Official Contract Citations (Page Verified):
                          </span>
                          {msg.citations.map((cite, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-2 rounded bg-[#116466]/25 border border-[#D9B08C]/30 text-[10px] font-mono"
                            >
                              <div className="flex items-center justify-between text-[#FFCB9A]">
                                <span className="flex items-center gap-1 font-bold">
                                  <FileText className="w-3 h-3 text-[#D9B08C]" />
                                  [Ref: {cite.source}, Page {cite.page}]
                                </span>
                                <span className="text-[#D9B08C] text-[9px]">{cite.relevance}</span>
                              </div>
                              <p className="text-[#D1E8E2]/80 mt-1 font-sans text-[11px]">
                                "{cite.excerpt}"
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Triggers for assistant message */}
                      {isAssistant && msg.structuredRecommendation && (
                        <div className="mt-3 pt-2 border-t border-[#D1E8E2]/10 flex items-center justify-between text-[10px] font-mono">
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${msg.text}\n\nScenario: ${msg.structuredRecommendation?.clientScenario}\nRecommended Services: ${msg.structuredRecommendation?.recommendedServices.map((s) => s.name).join(', ')}\nEstimated MRC: ${msg.structuredRecommendation?.estimatedTotalMrc}`,
                                msg.id
                              )
                            }
                            className="flex items-center gap-1 text-[#D9B08C] hover:text-[#FFCB9A]"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedId === msg.id ? 'Copied Brief!' : 'Copy Brief'}</span>
                          </button>

                          <button
                            onClick={() =>
                              alert(
                                `Inserted ${msg.structuredRecommendation?.recommendedServices.length} items into Jessica Lin's Account Proposal Draft!`
                              )
                            }
                            className="flex items-center gap-1 text-[#FFCB9A] hover:underline font-bold"
                          >
                            <span>Add to Client Proposal</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isGenerating && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#2C3531]/80 border border-[#116466] text-xs text-[#FFCB9A] font-mono animate-pulse">
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Consulting AT&T Rate Cards & Generating Client Proposal...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-[#D1E8E2]/15">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeRAGQuery(inputQuery);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Copilot: e.g. Compare Dedicated Fiber vs SD-WAN for 300 employees..."
                  className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-xs text-[#D1E8E2] placeholder-[#D1E8E2]/40"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isGenerating}
                  className="px-4 py-2.5 rounded-xl bg-[#FFCB9A] text-[#2C3531] text-xs font-bold hover:bg-[#FFCB9A]/90 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(255,203,154,0.25)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ask Copilot</span>
                </button>
              </form>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Vector PDF Library Drawer / Modal */}
      {showPdfDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3531]/80 backdrop-blur-xl animate-fadeIn">
          <GlassCard className="max-w-2xl w-full p-6 relative max-h-[85vh] flex flex-col" showReticles={true}>
            <div className="flex items-center justify-between pb-3 border-b border-[#D1E8E2]/15">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#FFCB9A]" />
                <div>
                  <h3 className="text-sm font-bold text-[#D1E8E2] uppercase">
                    AT&T Enterprise Vector PDF Knowledge Store
                  </h3>
                  <p className="text-[11px] font-mono text-[#D9B08C]">
                    Indexed Source Files for Semantic Retrieval & Ground-Truth Verification
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPdfDrawer(false)}
                className="text-[#D1E8E2]/70 hover:text-[#FFCB9A] text-xs font-mono px-2 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20"
              >
                ✕ Close
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 pr-1">
              {VECTOR_PDF_DOCS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl bg-[#2C3531]/80 border border-[#D1E8E2]/15 hover:border-[#FFCB9A]/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="teal" className="text-[9px]">
                          {doc.category}
                        </Badge>
                        <span className="text-[10px] font-mono text-[#D9B08C]">{doc.size}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#D1E8E2]">{doc.title}</h4>
                      <p className="text-[10px] font-mono text-[#FFCB9A] mt-0.5">{doc.fileName}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowPdfDrawer(false);
                        executeRAGQuery(`Extract key SLA terms from ${doc.fileName}`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#FFCB9A] text-[#2C3531] text-[10px] font-bold hover:bg-[#FFCB9A]/90 transition-all flex items-center gap-1"
                    >
                      <span>Query File</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#D1E8E2]/10 flex items-center justify-between text-[10px] font-mono text-[#D1E8E2]/60">
                    <span>{doc.pages} Pages Indexed</span>
                    <span>Updated: {doc.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#D1E8E2]/15 flex items-center justify-between text-[11px] font-mono text-[#D9B08C]">
              <span>Vector Engine: text-embedding-004 (1536-dim)</span>
              <span>Ground-Truth Verification: 100% Synced</span>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

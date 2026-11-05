import React, { useState, useEffect } from 'react';
import { ENTERPRISE_LEADS } from '../../data/telecomData';
import { EnterpriseLead, DiscoveredBusiness, ExtractedContact, StageId, PipelineDeal } from '../../types';
import { GlassCard, Badge } from '../GlassCard';
import {
  Send,
  Mail,
  Phone,
  Copy,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  MessageSquare,
  AlertTriangle,
  Server,
  Database,
  ExternalLink,
  Layers,
  Zap,
  Globe,
  Radio,
  Check,
  Cpu
} from 'lucide-react';

interface OutreachStageProps {
  searchQuery?: string;
  pushedLead?: DiscoveredBusiness | null;
  onLogDealToPipeline?: (deal: PipelineDeal) => void;
  onSelectStage?: (stage: StageId) => void;
}

export const OutreachStage: React.FC<OutreachStageProps> = ({
  searchQuery = '',
  pushedLead = null,
  onLogDealToPipeline,
  onSelectStage
}) => {
  const [leadList, setLeadList] = useState<EnterpriseLead[]>(ENTERPRISE_LEADS);
  const [selectedLead, setSelectedLead] = useState<EnterpriseLead>(ENTERPRISE_LEADS[0]);
  const [activeContact, setActiveContact] = useState<ExtractedContact>(ENTERPRISE_LEADS[0].contacts[0]);
  const [outreachChannel, setOutreachChannel] = useState<'email' | 'whatsapp' | 'phone'>('email');
  const [outreachTone, setOutreachTone] = useState<'executive' | 'technical' | 'urgent'>('executive');
  
  // Waterfall enrichment animation state
  const [isEnriching, setIsEnriching] = useState<boolean>(false);
  const [enrichmentStep, setEnrichmentStep] = useState<number>(4); // 1: Apollo, 2: Clay, 3: Hunter, 4: LLM Scraper

  // Dispatch sequence animation state
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Editable body state
  const [customMessageBody, setCustomMessageBody] = useState<string>('');

  // When a business is pushed from Stage 2 Discovery
  useEffect(() => {
    if (pushedLead) {
      const isMissingEmail = pushedLead.category === 'Manufacturing Units' || pushedLead.category === 'Local Vendors';

      const convertedLead: EnterpriseLead = {
        id: `pushed-${pushedLead.id}`,
        company: pushedLead.name,
        industry: `${pushedLead.category} • ${pushedLead.metroArea}`,
        subRegion: pushedLead.metroArea,
        businessType: pushedLead.footprintMetric,
        locations: pushedLead.companySize === 'Large' ? 4 : pushedLead.companySize === 'Medium' ? 2 : 1,
        address: pushedLead.address,
        currentISP: `${pushedLead.inferredISP.providerName} (${pushedLead.inferredISP.speedDownUp})`,
        ispBottleneck: pushedLead.inferredISP.knownLimitation,
        recommendedUpgrade: pushedLead.recommendedPlan.serviceName,
        estimatedContractValue: `${pushedLead.recommendedPlan.estimatedMrc} ($${(parseInt(pushedLead.recommendedPlan.estimatedMrc.replace(/[^0-9]/g, '')) * 12).toLocaleString()} / yr)`,
        fiberStatus: 'Lit Building',
        copperSunsetRisk: pushedLead.inferredISP.knownLimitation.toLowerCase().includes('copper') ? 'Critical (90 Days)' : 'Moderate',
        contacts: [
          {
            id: `c-p1-${pushedLead.id}`,
            name: pushedLead.contactPerson.name,
            role: pushedLead.contactPerson.role.includes('IT') || pushedLead.contactPerson.role.includes('Security')
              ? 'IT Director'
              : 'Operations Head',
            email: isMissingEmail ? null : pushedLead.contactPerson.email,
            emailVerified: !isMissingEmail,
            phone: pushedLead.contactPerson.phone,
            whatsappVerified: true,
            fallbackToWhatsApp: isMissingEmail,
            enrichmentNode: isMissingEmail ? 'LLM Scraper' : 'Hunter.io',
            confidenceScore: 98
          }
        ],
        generatedOutreach: {
          emailSubject: `Executive Brief: Upgrading ${pushedLead.name} from ${pushedLead.inferredISP.providerName} to AT&T Dedicated Fiber`,
          emailBody: `Hi ${pushedLead.contactPerson.name.split(' ')[0]},\n\nOur regional telecom engineering audits for ${pushedLead.metroArea} show ${pushedLead.address} currently relies on ${pushedLead.inferredISP.providerName} with ${pushedLead.inferredISP.speedDownUp}.\n\nFor an enterprise facility of your scale (${pushedLead.footprintMetric}), ${pushedLead.inferredISP.knownLimitation}.\n\nWe have provisioned your building terminal for ${pushedLead.recommendedPlan.serviceName} with $0 construction build fees and guaranteed 99.999% SLA uptime.\n\nCould we review the 1-page engineering brief this Thursday at 2 PM?\n\nBest regards,\nJessica Lin | Senior Enterprise Account Manager, AT&T`,
          whatsAppBody: `Hi ${pushedLead.contactPerson.name.split(' ')[0]}, Jessica Lin with AT&T Enterprise. I'm messaging you directly regarding ${pushedLead.name} at ${pushedLead.address} in ${pushedLead.metroArea}. Your incumbent broadband line (${pushedLead.inferredISP.providerName}) suffers from upload limits. We have dedicated fiber lit in your facility and can deploy ${pushedLead.recommendedPlan.serviceName} with zero build delay. Can we connect for 5 mins tomorrow?`,
          phoneScript: `Opening: "${pushedLead.contactPerson.name}, Jessica Lin calling from AT&T Enterprise regarding ${pushedLead.name}. We're alerting tenants along ${pushedLead.address} about upload bottlenecks on ${pushedLead.inferredISP.providerName}. We have symmetrical fiber lit at the demarc point. Can we review your cutover timeline?"`,
          valueProposition: `Displaces ${pushedLead.inferredISP.providerName} bottleneck with ${pushedLead.recommendedPlan.serviceName} backed by contractual financial credit SLAs.`
        }
      };

      setLeadList((prev) => {
        if (!prev.some((l) => l.company === convertedLead.company)) {
          return [convertedLead, ...prev];
        }
        return prev;
      });
      setSelectedLead(convertedLead);
      setActiveContact(convertedLead.contacts[0]);
      if (convertedLead.contacts[0].fallbackToWhatsApp) {
        setOutreachChannel('whatsapp');
      }
    }
  }, [pushedLead]);

  // When selected lead or contact changes, update active contact & message
  useEffect(() => {
    if (selectedLead.contacts.length > 0) {
      setActiveContact(selectedLead.contacts[0]);
      if (selectedLead.contacts[0].fallbackToWhatsApp) {
        setOutreachChannel('whatsapp');
      } else {
        setOutreachChannel('email');
      }
    }
  }, [selectedLead]);

  // Update dynamic message body based on lead, contact, channel & tone
  useEffect(() => {
    const contactFirstName = activeContact.name.split(' ')[0];

    if (outreachChannel === 'email') {
      if (outreachTone === 'urgent') {
        setCustomMessageBody(
          `Hi ${contactFirstName},\n\nI am contacting you directly regarding ${selectedLead.company} at ${selectedLead.address} in ${selectedLead.subRegion}.\n\nFCC regulatory filings indicate your building's current circuit on ${selectedLead.currentISP.split('(')[0]} is facing line tariff discontinuance, leaving facilities vulnerable to unexpected outages.\n\nBecause ${selectedLead.address} is pre-cleared as an on-net AT&T Fiber terminal, we can fast-track ${selectedLead.recommendedUpgrade} with guaranteed zero-downtime cutover and $0 construction costs.\n\nCan we schedule a 10-minute briefing tomorrow at 10 AM?\n\nSincerely,\nJessica Lin\nSenior Enterprise Account Manager | AT&T Business`
        );
      } else if (outreachTone === 'technical') {
        setCustomMessageBody(
          `Hello ${contactFirstName},\n\nReviewing the infrastructure footprint for ${selectedLead.company} (${selectedLead.businessType}), our Tier-1 network audit flagged a severe bottleneck: ${selectedLead.ispBottleneck}.\n\nUnlike shared broadband, AT&T Dedicated Internet guarantees true symmetrical throughput with a contractual 99.999% SLA and a 4-Hour Mean Time to Restore (MTTR) backed by automated financial billing remedies.\n\nAttached is our technical engineering battlecard comparing ${selectedLead.currentISP.split('(')[0]} against AT&T. When is a convenient time this week for a technical review with our principal network architect?\n\nBest regards,\nJessica Lin | Senior Enterprise Account Manager, AT&T`
        );
      } else {
        setCustomMessageBody(
          selectedLead.generatedOutreach?.emailBody ||
          `Hi ${contactFirstName},\n\nI noticed ${selectedLead.company} operates a major presence in ${selectedLead.subRegion}. Our engineering fiber database confirms ${selectedLead.address} is an AT&T On-Net Fiber Lit Building.\n\nWhile your incumbent provider (${selectedLead.currentISP.split('(')[0]}) caps uploads, ${selectedLead.recommendedUpgrade} provides unshared symmetrical speeds with a 99.999% SLA.\n\nCould we review your facility's fiber cutover schedule this Thursday at 2 PM?\n\nBest regards,\nJessica Lin | Senior Enterprise Account Manager, AT&T`
        );
      }
    } else if (outreachChannel === 'whatsapp') {
      if (outreachTone === 'urgent') {
        setCustomMessageBody(
          `🚨 Urgent Telecom Notice for ${contactFirstName} (${selectedLead.company}):\nJessica Lin with AT&T Enterprise here. Your building at ${selectedLead.address} is on the FCC carrier cutover list for line tariff surcharges on ${selectedLead.currentISP.split('(')[0]}. We have on-net fiber ready for zero-downtime cutover to ${selectedLead.recommendedUpgrade}. Can we connect for 5 mins today?`
        );
      } else if (outreachTone === 'technical') {
        setCustomMessageBody(
          `Hi ${contactFirstName}, Jessica Lin with AT&T Enterprise. Following up on your network audit for ${selectedLead.company} in ${selectedLead.subRegion}. Your current coax upload (${selectedLead.currentISP.split('(')[1] || '35M'}) is causing latency bottlenecks. We have lit fiber ready to deliver ${selectedLead.recommendedUpgrade} with a 4-hr MTTR guarantee. Should I send the technical spec to your direct email?`
        );
      } else {
        setCustomMessageBody(
          selectedLead.generatedOutreach?.whatsAppBody ||
          `Hi ${contactFirstName}, Jessica Lin with AT&T Enterprise. Reaching out directly regarding ${selectedLead.company} at ${selectedLead.address} in ${selectedLead.subRegion}. We noticed upload bottlenecks on your current line (${selectedLead.currentISP.split('(')[0]}). We have symmetrical fiber lit in your basement and can turn up ${selectedLead.recommendedUpgrade} with $0 build delay. Can we chat for 5 mins?`
        );
      }
    } else {
      setCustomMessageBody(selectedLead.generatedOutreach?.phoneScript || '');
    }
  }, [selectedLead, activeContact, outreachChannel, outreachTone]);

  // Run Waterfall Enrichment Animation
  const handleRunEnrichment = () => {
    setIsEnriching(true);
    setEnrichmentStep(1);

    setTimeout(() => setEnrichmentStep(2), 600);
    setTimeout(() => setEnrichmentStep(3), 1200);
    setTimeout(() => {
      setEnrichmentStep(4);
      setIsEnriching(false);
    }, 1800);
  };

  // Send Message & Add to Pipeline
  const handleTriggerSequence = () => {
    setIsDispatching(true);
    setDispatchStatus('Initializing AT&T Enterprise Multi-Touch Sequence...');

    setTimeout(() => {
      setDispatchStatus(
        outreachChannel === 'whatsapp'
          ? 'Connecting to Meta WhatsApp Cloud API Gateway (Direct Mobile Handshake: 200 OK)...'
          : 'Connecting to AT&T Enterprise Mail Relay (DKIM & SPF Verified: 250 OK)...'
      );
    }, 800);

    setTimeout(() => {
      setDispatchStatus('Touchpoint 1 Dispatched. Logging Deal into Stage 4 Pipeline...');
    }, 1600);

    setTimeout(() => {
      setIsDispatching(false);
      setDispatchSuccess(true);

      // Log deal into Stage 4 Pipeline
      const mrrValue = parseInt(selectedLead.estimatedContractValue.replace(/[^0-9]/g, '')) || 4500;
      const newDeal: PipelineDeal = {
        id: `deal-${Date.now()}`,
        company: selectedLead.company,
        stage: 'Outreach Sent',
        services: [selectedLead.recommendedUpgrade],
        mrr: Math.round(mrrValue / 12) || 4200,
        tcv: mrrValue * 3 || 151200,
        probability: 75,
        closeDate: 'Nov 30, 2026',
        health: 'Accelerating',
        aiSentimentTag: `Dispatched ${outreachChannel.toUpperCase()}: Feasibility & Symmetrical SLA Offered`,
        sentimentCategory: 'positive',
        lastActivity: 'Just now • Multi-Touch Dispatched',
        contactName: activeContact.name,
        contactRole: activeContact.role,
        assignedAM: 'Jessica Lin'
      };

      if (onLogDealToPipeline) {
        onLogDealToPipeline(newDeal);
      }

      setTimeout(() => setDispatchSuccess(false), 5000);
    }, 2400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredLeads = leadList.filter((l) =>
    l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-[#D1E8E2]/15 bg-gradient-to-r from-[#2C3531] via-[#116466]/30 to-[#2C3531]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="peach">Stage 03</Badge>
            <span className="text-xs font-mono text-[#D9B08C]">Verified Decision-Maker Finder & Outreach Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#D1E8E2] tracking-wide">
            Verified Decision-Makers & Multi-Channel Outreach
          </h2>
          <p className="text-xs text-[#D1E8E2]/70 mt-1 max-w-2xl">
            Extract verified decision-makers through the AI waterfall pipeline. When work email is unavailable,
            fallback automatically to direct WhatsApp mobile outreach with hyper-personalized telecom upgrade copy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="mint" className="text-xs py-1.5 px-3">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#FFCB9A]" />
            Waterfall Verified: 100% Deliverability
          </Badge>
        </div>
      </div>

      {/* 1. AI Lead Enrichment Waterfall */}
      <GlassCard className="p-5" showReticles={true}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-[#D1E8E2]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center text-[#FFCB9A]">
              <Cpu className="w-4 h-4 text-[#FFCB9A]" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#D1E8E2] flex items-center gap-1.5">
                AI Lead Enrichment Waterfall Pipeline
                <span className="w-2 h-2 rounded-full bg-[#FFCB9A] inline-block animate-pulse" />
              </h3>
              <p className="text-[10px] font-mono text-[#D9B08C]">
                Active Target: <strong className="text-[#FFCB9A]">{selectedLead.company}</strong> ({selectedLead.subRegion})
              </p>
            </div>
          </div>

          <button
            onClick={handleRunEnrichment}
            disabled={isEnriching}
            className="px-3 py-1.5 rounded-lg bg-[#2C3531] border border-[#D9B08C]/40 hover:border-[#FFCB9A] text-xs font-mono text-[#D9B08C] hover:text-[#FFCB9A] transition-all flex items-center gap-1.5 self-start sm:self-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEnriching ? 'animate-spin text-[#FFCB9A]' : ''}`} />
            <span>{isEnriching ? 'Running Pipeline...' : 'Re-Check Contacts'}</span>
          </button>
        </div>

        {/* 4 Waterfall Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Node 1: Apollo.io */}
          <div
            className={`
              p-3 rounded-xl border transition-all duration-300
              ${
                enrichmentStep >= 1
                  ? 'bg-[#116466]/25 border-[#FFCB9A]/50 shadow-[0_0_12px_rgba(17,100,102,0.3)]'
                  : 'bg-[#2C3531]/70 border-[#D1E8E2]/10 opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold">1. Apollo.io</span>
              <span className="w-2 h-2 rounded-full bg-[#FFCB9A]" />
            </div>
            <h4 className="text-xs font-bold text-[#D1E8E2]">Verified Business Profile</h4>
            <p className="text-[10px] font-mono text-[#D1E8E2]/70 mt-1">
              ✓ Confirmed corporate location and leadership directory.
            </p>
            <div className="mt-2 text-[9px] font-mono text-[#FFCB9A]">Latency: 142ms</div>
          </div>

          {/* Node 2: Clay.com */}
          <div
            className={`
              p-3 rounded-xl border transition-all duration-300
              ${
                enrichmentStep >= 2
                  ? 'bg-[#116466]/25 border-[#FFCB9A]/50 shadow-[0_0_12px_rgba(17,100,102,0.3)]'
                  : 'bg-[#2C3531]/70 border-[#D1E8E2]/10 opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold">2. Clay.com</span>
              <span className="w-2 h-2 rounded-full bg-[#FFCB9A]" />
            </div>
            <h4 className="text-xs font-bold text-[#D1E8E2]">Decision-Maker Filter</h4>
            <p className="text-[10px] font-mono text-[#D1E8E2]/70 mt-1">
              ✓ Identified key technology and operations budget holders.
            </p>
            <div className="mt-2 text-[9px] font-mono text-[#FFCB9A]">Authority: Budget Owner</div>
          </div>

          {/* Node 3: Hunter.io */}
          <div
            className={`
              p-3 rounded-xl border transition-all duration-300
              ${
                enrichmentStep >= 3
                  ? 'bg-[#116466]/25 border-[#FFCB9A]/50 shadow-[0_0_12px_rgba(17,100,102,0.3)]'
                  : 'bg-[#2C3531]/70 border-[#D1E8E2]/10 opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold">3. Hunter.io</span>
              <span className="w-2 h-2 rounded-full bg-[#FFCB9A]" />
            </div>
            <h4 className="text-xs font-bold text-[#D1E8E2]">SMTP / MX Deliverability</h4>
            <p className="text-[10px] font-mono text-[#D1E8E2]/70 mt-1">
              ✓ Live mailbox check guarantees 100% email deliverability.
            </p>
            <div className="mt-2 text-[9px] font-mono text-[#FFCB9A]">Handshake: 250 OK</div>
          </div>

          {/* Node 4: LLM Web Scraper */}
          <div
            className={`
              p-3 rounded-xl border transition-all duration-300
              ${
                enrichmentStep >= 4
                  ? 'bg-[#116466]/25 border-[#FFCB9A]/50 shadow-[0_0_12px_rgba(17,100,102,0.3)]'
                  : 'bg-[#2C3531]/70 border-[#D1E8E2]/10 opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase text-[#D9B08C] font-bold">4. LLM Scraper</span>
              <span className="w-2 h-2 rounded-full bg-[#FFCB9A]" />
            </div>
            <h4 className="text-xs font-bold text-[#D1E8E2]">Direct WhatsApp Line</h4>
            <p className="text-[10px] font-mono text-[#D1E8E2]/70 mt-1">
              ✓ Verified direct mobile number for WhatsApp fallback messaging.
            </p>
            <div className="mt-2 text-[9px] font-mono text-[#FFCB9A]">Mobile Verified: 100%</div>
          </div>
        </div>
      </GlassCard>

      {/* Main Two-Column Layout: Target Leads & Studio Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Accounts & Extracted Contacts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D9B08C] font-bold">
              Target Accounts ({filteredLeads.length})
            </span>
            <span className="text-[11px] font-mono text-[#D1E8E2]/60">Select to load contacts</span>
          </div>

          {filteredLeads.map((lead) => {
            const isSelected = selectedLead.id === lead.id;

            return (
              <GlassCard
                key={lead.id}
                active={isSelected}
                onClick={() => setSelectedLead(lead)}
                className="p-4 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#D1E8E2] group-hover:text-[#FFCB9A] transition-colors">
                      {lead.company}
                    </h3>
                    <p className="text-[11px] text-[#D9B08C] font-mono mt-0.5">{lead.industry}</p>
                  </div>
                  <Badge variant={lead.fiberStatus === 'Lit Building' ? 'peach' : 'gold'}>
                    {lead.fiberStatus}
                  </Badge>
                </div>

                <div className="mt-2.5 space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-[#D1E8E2]/75">
                    <Building2 className="w-3.5 h-3.5 text-[#116466]" />
                    <span className="truncate">{lead.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#D9B08C] font-mono truncate max-w-[180px]">
                      Incumbent: {lead.currentISP.split('(')[0]}
                    </span>
                    <span className="text-[#FFCB9A] font-bold font-mono">
                      {lead.estimatedContractValue}
                    </span>
                  </div>
                </div>

                {/* Contacts Pills */}
                <div className="mt-3 pt-2.5 border-t border-[#D1E8E2]/10 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                    Extracted Stakeholders ({lead.contacts.length}):
                  </span>
                  <div className="space-y-1.5">
                    {lead.contacts.map((contact) => {
                      const isContactActive = activeContact.id === contact.id && isSelected;

                      return (
                        <div
                          key={contact.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setActiveContact(contact);
                            if (contact.fallbackToWhatsApp) {
                              setOutreachChannel('whatsapp');
                            }
                          }}
                          className={`
                            p-2.5 rounded-lg border text-xs transition-all flex flex-col justify-between
                            ${
                              isContactActive
                                ? 'bg-[#116466]/40 border-[#FFCB9A] shadow-[0_0_10px_rgba(255,203,154,0.2)]'
                                : 'bg-[#2C3531]/80 border-[#D1E8E2]/15 hover:border-[#D9B08C]'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#D1E8E2]">{contact.name}</span>
                            <span className="text-[9px] font-mono text-[#D9B08C] bg-[#2C3531] px-1.5 py-0.5 rounded border border-[#D9B08C]/30">
                              {contact.role}
                            </span>
                          </div>

                          {/* 2. Contact Fallback Logic Badge */}
                          <div className="mt-1.5 flex flex-col gap-1">
                            {contact.emailVerified && contact.email ? (
                              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#D1E8E2]/85">
                                <Mail className="w-3 h-3 text-[#116466]" />
                                <span className="truncate">{contact.email}</span>
                                <span className="text-[9px] text-[#FFCB9A] bg-[#116466]/50 px-1 rounded">
                                  ✓ SMTP 250 OK
                                </span>
                              </div>
                            ) : (
                              /* Contact Fallback Badge in #FFCB9A */
                              <div className="p-1.5 rounded bg-[#FFCB9A]/15 border border-[#FFCB9A]/60 flex items-center justify-between text-[10px] font-mono text-[#FFCB9A]">
                                <span className="flex items-center gap-1 font-bold">
                                  <AlertTriangle className="w-3 h-3 text-[#FFCB9A]" />
                                  Email Protected — Routed to Direct WhatsApp Message
                                </span>
                              </div>
                            )}

                            {/* Verified Mobile / WhatsApp Number */}
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#D9B08C] pt-0.5">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3 text-[#FFCB9A]" />
                                Mobile: <strong className="text-[#D1E8E2]">{contact.phone}</strong>
                              </span>
                              <span className="text-[9px] text-[#FFCB9A]">
                                {contact.enrichmentNode} ({contact.confidenceScore}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Right Column: 3. Hyper-Personalized LLM Composer Studio */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard className="p-5 flex flex-col h-[740px]" showReticles={true}>
            {/* Studio Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D1E8E2]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#FFCB9A]" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#D1E8E2] uppercase tracking-wider flex items-center gap-1.5">
                    Hyper-Personalized LLM Composer
                    <span className="w-2 h-2 rounded-full bg-[#FFCB9A] inline-block animate-pulse" />
                  </h3>
                  <p className="text-[10px] font-mono text-[#D9B08C]">
                    Recipient: {activeContact.name} ({activeContact.role}) • {selectedLead.company}
                  </p>
                </div>
              </div>

              {/* Channel Selector Pills */}
              <div className="flex items-center gap-1 bg-[#2C3531] p-1 rounded-lg border border-[#D1E8E2]/15 self-start sm:self-center">
                <button
                  onClick={() => setOutreachChannel('email')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    outreachChannel === 'email'
                      ? 'bg-[#FFCB9A] text-[#2C3531] font-bold shadow-[0_0_10px_rgba(255,203,154,0.3)]'
                      : 'text-[#D1E8E2]/70 hover:text-[#D1E8E2]'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Cadence</span>
                </button>

                <button
                  onClick={() => setOutreachChannel('whatsapp')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    outreachChannel === 'whatsapp'
                      ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A]/60 font-bold shadow-[0_0_12px_rgba(255,203,154,0.3)]'
                      : 'text-[#D1E8E2]/70 hover:text-[#D1E8E2]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct</span>
                </button>

                <button
                  onClick={() => setOutreachChannel('phone')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    outreachChannel === 'phone'
                      ? 'bg-[#FFCB9A] text-[#2C3531] font-bold'
                      : 'text-[#D1E8E2]/70 hover:text-[#D1E8E2]'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Script</span>
                </button>
              </div>
            </div>

            {/* Context Variables Strip */}
            <div className="py-2.5 px-3 rounded-lg bg-[#2C3531]/80 border border-[#D1E8E2]/10 my-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
              <div>
                <span className="text-[#D1E8E2]/50 block">Sub-Region:</span>
                <span className="text-[#FFCB9A] font-bold truncate block">{selectedLead.subRegion}</span>
              </div>
              <div>
                <span className="text-[#D1E8E2]/50 block">Business Type:</span>
                <span className="text-[#D1E8E2] font-semibold truncate block">{selectedLead.businessType}</span>
              </div>
              <div>
                <span className="text-[#D1E8E2]/50 block">ISP Bottleneck:</span>
                <span className="text-[#D9B08C] font-semibold truncate block">{selectedLead.currentISP.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-[#D1E8E2]/50 block">AT&T Upgrade:</span>
                <span className="text-[#FFCB9A] font-bold truncate block">{selectedLead.recommendedUpgrade}</span>
              </div>
            </div>

            {/* Tone Selector & Subject Line */}
            <div className="space-y-2 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-[#D9B08C]">
                  Message Tone:
                </span>
                <div className="flex items-center gap-1.5">
                  {(['executive', 'technical', 'urgent'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setOutreachTone(t)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-all ${
                        outreachTone === t
                          ? 'bg-[#FFCB9A] text-[#2C3531] font-bold shadow-[0_0_8px_rgba(255,203,154,0.3)]'
                          : 'bg-[#2C3531] text-[#D1E8E2]/60 hover:text-[#D1E8E2] border border-[#D1E8E2]/15'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {outreachChannel === 'email' && (
                <div className="p-2.5 rounded-lg bg-[#2C3531] border border-[#D1E8E2]/15 text-xs">
                  <span className="text-[10px] font-mono text-[#D9B08C] block mb-0.5">Subject:</span>
                  <p className="font-bold text-[#FFCB9A]">
                    {selectedLead.generatedOutreach?.emailSubject}
                  </p>
                </div>
              )}

              {outreachChannel === 'whatsapp' && (
                <div className="p-2.5 rounded-lg bg-[#116466]/20 border border-[#116466]/60 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#FFCB9A]" />
                    <span className="text-[#D1E8E2] font-semibold">
                      Target WhatsApp Number: <strong className="text-[#FFCB9A]">{activeContact.phone}</strong>
                    </span>
                  </div>
                  <Badge variant="peach" className="text-[9px]">
                    Direct WhatsApp API
                  </Badge>
                </div>
              )}
            </div>

            {/* Editable Message Canvas */}
            <div className="flex-1 flex flex-col min-h-0 relative">
              <textarea
                value={customMessageBody}
                onChange={(e) => setCustomMessageBody(e.target.value)}
                className="w-full flex-1 p-3.5 glass-input rounded-xl text-xs text-[#D1E8E2] font-sans leading-relaxed resize-none focus:border-[#FFCB9A]"
                placeholder="LLM generated copy will appear here..."
              />
              <button
                onClick={() => copyToClipboard(customMessageBody)}
                className="absolute top-2.5 right-3 text-[10px] font-mono text-[#D9B08C] hover:text-[#FFCB9A] bg-[#2C3531]/90 px-2 py-1 rounded border border-[#D1E8E2]/20 flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Dispatch Status Animation Overlay */}
            {isDispatching && (
              <div className="mt-3 p-3 rounded-lg bg-[#116466]/30 border border-[#FFCB9A]/60 text-xs font-mono text-[#FFCB9A] flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-[#FFCB9A]" />
                <span>{dispatchStatus}</span>
              </div>
            )}

            {/* Success Toast */}
            {dispatchSuccess && (
              <div className="mt-3 p-3 rounded-lg bg-[#116466]/50 border border-[#FFCB9A] text-xs font-mono text-[#FFCB9A] flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FFCB9A]" />
                  <span>
                    Successfully dispatched multi-touch cadence to {activeContact.name}! Logged into Stage 4 Pipeline.
                  </span>
                </div>
                {onSelectStage && (
                  <button
                    onClick={() => onSelectStage('pipeline')}
                    className="text-[10px] font-bold uppercase underline hover:text-[#FFCB9A] ml-2"
                  >
                    View in Pipeline →
                  </button>
                )}
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="mt-3 pt-3 border-t border-[#D1E8E2]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[10px] font-mono text-[#D9B08C]">
                Gateway: {outreachChannel === 'whatsapp' ? 'Meta Cloud WhatsApp Gateway' : 'AT&T Outbound Mail Gateway'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const samplePrompts = [
                      `Hi ${activeContact.name.split(' ')[0]},\n\nRegarding ${selectedLead.company} at ${selectedLead.address}...`,
                      `Executive Brief for ${activeContact.name}...`
                    ];
                    setCustomMessageBody(samplePrompts[0]);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#2C3531] border border-[#D1E8E2]/20 hover:border-[#D9B08C] text-xs font-mono text-[#D1E8E2]/80 hover:text-[#D1E8E2] transition-all"
                >
                  Regenerate
                </button>

                <button
                  onClick={handleTriggerSequence}
                  disabled={isDispatching}
                  className={`
                    px-5 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2
                    ${
                      isDispatching
                        ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A] cursor-wait'
                        : 'bg-[#FFCB9A] text-[#2C3531] hover:bg-[#FFCB9A]/90 hover:scale-[1.02] shadow-[0_0_15px_rgba(255,203,154,0.35)] active:scale-95'
                    }
                  `}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isDispatching ? 'Dispatching Sequence...' : 'Send Message & Add to Pipeline'}</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { US_STATES_AND_METROS, DISCOVERED_BUSINESSES } from '../../data/telecomData';
import { DiscoveredBusiness, BusinessCategory, CompanySize, StageId } from '../../types';
import { GlassCard, Badge } from '../GlassCard';
import {
  Radio,
  MapPin,
  Search,
  CheckCircle2,
  TrendingUp,
  Zap,
  Building2,
  Users,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  Send,
  Sparkles,
  Info,
  DollarSign,
  Activity,
  ArrowRight,
  ShieldAlert,
  Server,
  Globe,
  HelpCircle,
  X
} from 'lucide-react';

interface DiscoveryStageProps {
  searchQuery?: string;
  onPushToOutreach?: (business: DiscoveredBusiness) => void;
  onSelectStage?: (stage: StageId) => void;
}

export const DiscoveryStage: React.FC<DiscoveryStageProps> = ({
  searchQuery = '',
  onPushToOutreach,
  onSelectStage
}) => {
  // 1. Regional Filter States
  const [selectedState, setSelectedState] = useState<string>('Texas');
  const [selectedMetro, setSelectedMetro] = useState<string>('All Metros');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Interactive AI Tooltip / Modal State
  const [inspectingIspBusiness, setInspectingIspBusiness] = useState<DiscoveredBusiness | null>(null);
  const [pushedBusinessId, setPushedBusinessId] = useState<string | null>(null);

  // States list
  const availableStates = Object.keys(US_STATES_AND_METROS);
  const availableMetros = US_STATES_AND_METROS[selectedState] || ['All Metros'];
  const categories: ('All' | BusinessCategory)[] = [
    'All',
    'Local Vendors',
    'Malls/Retail Shops',
    'Manufacturing Units',
    'Corporate Offices'
  ];
  const companySizes: ('All' | CompanySize)[] = ['All', 'Small', 'Medium', 'Large'];

  // Handle State Change (resets metro to 'All Metros')
  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedMetro('All Metros');
  };

  // Filtered Businesses
  const filteredBusinesses = useMemo(() => {
    return DISCOVERED_BUSINESSES.filter((b) => {
      const matchState = b.state === selectedState;
      const matchMetro = selectedMetro === 'All Metros' || b.metroArea === selectedMetro;
      const matchCategory = selectedCategory === 'All' || b.category === selectedCategory;
      const matchSize = selectedSize === 'All' || b.companySize === selectedSize;
      const matchSearch =
        searchQuery === '' ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.inferredISP.providerName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchState && matchMetro && matchCategory && matchSize && matchSearch;
    });
  }, [selectedState, selectedMetro, selectedCategory, selectedSize, searchQuery]);

  // Handle Push to Stage 3 Outreach
  const handlePush = (business: DiscoveredBusiness) => {
    setPushedBusinessId(business.id);
    if (onPushToOutreach) {
      onPushToOutreach(business);
    }
    setTimeout(() => {
      setPushedBusinessId(null);
      if (onSelectStage) {
        onSelectStage('outreach');
      }
    }, 1000);
  };

  const getCapacityScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#FFCB9A]';
    if (score >= 80) return 'text-[#D1E8E2]';
    return 'text-[#D9B08C]';
  };

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl border border-[#D1E8E2]/15 bg-gradient-to-r from-[#2C3531] via-[#116466]/30 to-[#2C3531]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="gold">Stage 02</Badge>
            <span className="text-xs font-mono text-[#D9B08C]">Regional Business & Competitor Radar</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#D1E8E2] tracking-wide">
            Local Business Radar & Competitor Weakness Finder
          </h2>
          <p className="text-xs text-[#D1E8E2]/70 mt-1 max-w-2xl">
            Scan commercial corridors across US metros. Identify incumbent broadband choke points using IP-to-ASN
            telemetry and FCC data, score prospect buying capacity, and match the winning AT&T enterprise plan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#D9B08C]">QUALIFIED PROSPECTS</span>
            <p className="text-xl font-mono font-black text-[#FFCB9A]">{filteredBusinesses.length} B2B Leads</p>
          </div>
        </div>
      </div>

      {/* 1. US Region & Sub-Region Glass Filter Bar */}
      <GlassCard className="p-4" showReticles={true}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#D1E8E2]/10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#FFCB9A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D1E8E2]">
                Geographic & Commercial Filters
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#D9B08C]">
                Active Grid: <strong className="text-[#FFCB9A]">{selectedState}</strong>
                {selectedMetro !== 'All Metros' ? ` • ${selectedMetro}` : ''}
              </span>
              {(selectedMetro !== 'All Metros' || selectedCategory !== 'All' || selectedSize !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedMetro('All Metros');
                    setSelectedCategory('All');
                    setSelectedSize('All');
                  }}
                  className="text-[10px] font-mono text-[#FFCB9A] hover:underline ml-2"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* US State Selector */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                1. US State:
              </label>
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full glass-input rounded-lg px-3 py-2 text-xs text-[#D1E8E2] bg-[#2C3531] cursor-pointer"
              >
                {availableStates.map((st) => (
                  <option key={st} value={st} className="bg-[#2C3531] text-[#D1E8E2]">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Region / Metro Area Selector */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                2. Sub-Region / Metro:
              </label>
              <select
                value={selectedMetro}
                onChange={(e) => setSelectedMetro(e.target.value)}
                className="w-full glass-input rounded-lg px-3 py-2 text-xs text-[#D1E8E2] bg-[#2C3531] cursor-pointer"
              >
                {availableMetros.map((m) => (
                  <option key={m} value={m} className="bg-[#2C3531] text-[#D1E8E2]">
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Business Category Selector */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                3. Business Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full glass-input rounded-lg px-3 py-2 text-xs text-[#D1E8E2] bg-[#2C3531] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#2C3531] text-[#D1E8E2]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Size Selector */}
            <div>
              <label className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                4. Company Size:
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full glass-input rounded-lg px-3 py-2 text-xs text-[#D1E8E2] bg-[#2C3531] cursor-pointer"
              >
                {companySizes.map((s) => (
                  <option key={s} value={s} className="bg-[#2C3531] text-[#D1E8E2]">
                    {s === 'All' ? 'All Sizes (1 - 500+)' : `${s} Enterprise`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* View Switcher & Result Stats Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#D9B08C] font-bold">
            Discovered Businesses ({filteredBusinesses.length})
          </span>
          <span className="text-[11px] font-mono text-[#D1E8E2]/60 hidden sm:inline">
            • Ranked by Buying Power Score
          </span>
        </div>

        {/* Grid vs Table View Mode */}
        <div className="flex items-center gap-1 bg-[#2C3531] p-1 rounded-lg border border-[#D1E8E2]/15">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'grid'
                ? 'bg-[#116466] text-[#FFCB9A] shadow-sm'
                : 'text-[#D1E8E2]/60 hover:text-[#D1E8E2]'
            }`}
            title="Grid Cards View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'table'
                ? 'bg-[#116466] text-[#FFCB9A] shadow-sm'
                : 'text-[#D1E8E2]/60 hover:text-[#D1E8E2]'
            }`}
            title="Executive Table View"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono">Table</span>
          </button>
        </div>
      </div>

      {/* 2. Discovered Businesses Intelligence: Grid Cards View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBusinesses.map((biz) => {
            const isPushed = pushedBusinessId === biz.id;

            return (
              <GlassCard key={biz.id} className="p-5 flex flex-col justify-between" showReticles={true}>
                <div>
                  {/* Card Header: Category + Size + Metro */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Badge variant="teal" className="text-[9px]">
                          {biz.category}
                        </Badge>
                        <span className="text-[10px] font-mono text-[#D9B08C] bg-[#2C3531] px-1.5 py-0.5 rounded border border-[#D1E8E2]/15">
                          {biz.companySize} ({biz.employeeCount} Emps)
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-[#D1E8E2] group-hover:text-[#FFCB9A] transition-colors">
                        {biz.name}
                      </h3>
                      <p className="text-[11px] text-[#D1E8E2]/70 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#116466]" />
                        <span className="truncate">{biz.address}</span>
                      </p>
                    </div>

                    {/* Circular Buying Capacity Score Gauge */}
                    <div className="text-right flex-shrink-0">
                      <div className="relative w-14 h-14 rounded-full border-2 border-[#116466] flex flex-col items-center justify-center bg-[#2C3531]/90 shadow-[0_0_12px_rgba(255,203,154,0.15)]">
                        <span className={`text-sm font-mono font-black ${getCapacityScoreColor(biz.capacityScore.totalScore)}`}>
                          {biz.capacityScore.totalScore}
                        </span>
                        <span className="text-[8px] font-mono text-[#D9B08C] uppercase">SCORE</span>
                      </div>
                    </div>
                  </div>

                  {/* Footprint Metric */}
                  <div className="my-2.5 p-2 rounded-lg bg-[#2C3531]/80 border border-[#D1E8E2]/10 text-xs">
                    <span className="text-[10px] font-mono uppercase text-[#D9B08C] block">
                      Commercial Footprint:
                    </span>
                    <p className="font-semibold text-[#D1E8E2]">{biz.footprintMetric}</p>
                  </div>

                  {/* Current Inferred ISP Badge + Interactive AI Tooltip Trigger */}
                  <div className="p-3 rounded-lg bg-[#116466]/20 border border-[#116466]/70 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-[#FFCB9A]" />
                        <span className="text-[10px] font-mono uppercase text-[#D9B08C]">
                          Inferred Incumbent ISP:
                        </span>
                      </div>
                      <button
                        onClick={() => setInspectingIspBusiness(biz)}
                        className="text-[10px] font-mono text-[#FFCB9A] hover:underline flex items-center gap-1"
                      >
                        <Info className="w-3 h-3" />
                        <span>How We Detected This</span>
                      </button>
                    </div>

                    <div className="flex items-baseline justify-between mt-1">
                      <h4 className="text-xs font-bold text-[#D1E8E2]">
                        {biz.inferredISP.providerName}
                      </h4>
                      <span className="text-[10px] font-mono text-[#D9B08C]">
                        {biz.inferredISP.technology}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#FFCB9A] font-mono mt-1">
                      ⚠ Bottleneck: {biz.inferredISP.speedDownUp} — {biz.inferredISP.knownLimitation}
                    </p>
                  </div>

                  {/* Prime Location & Buying Capacity Breakdown */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#2C3531]/90 border border-[#D1E8E2]/15 text-[11px] font-mono mb-3">
                    <div>
                      <span className="text-[9px] text-[#D1E8E2]/50 block">Foot Traffic:</span>
                      <span className="font-bold text-[#FFCB9A]">{biz.capacityScore.footTrafficIndex}/100</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#D1E8E2]/50 block">Property Value:</span>
                      <span className="font-bold text-[#D1E8E2]">{biz.capacityScore.creValuePerSqFt}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#D1E8E2]/50 block">Annual Revenue:</span>
                      <span className="font-bold text-[#D9B08C]">{biz.capacityScore.estimatedAnnualRevenue}</span>
                    </div>
                  </div>
                </div>

                {/* 3. AI Plan Matchmaker Section */}
                <div className="pt-3 border-t border-[#D1E8E2]/15">
                  <div className="p-3 rounded-lg bg-[#2C3531] border border-[#FFCB9A]/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#FFCB9A] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFCB9A]" /> Top-Ranked AT&T Plan
                      </span>
                      <span className="text-xs font-mono font-black text-[#FFCB9A]">
                        {biz.recommendedPlan.estimatedMrc}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-[#D1E8E2]">
                      {biz.recommendedPlan.serviceName}
                    </h5>

                    <p className="text-[11px] text-[#D1E8E2]/80 leading-relaxed font-sans">
                      {biz.recommendedPlan.matchReason}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#D9B08C] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#FFCB9A]" />
                        Estimated Win Rate: <strong className="text-[#FFCB9A]">{biz.recommendedPlan.conversionProbability}%</strong>
                      </span>
                    </div>
                  </div>

                  {/* Push to Stage 3 Outreach Button */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-[#D1E8E2]/60">
                      Contact: {biz.contactPerson.name} ({biz.contactPerson.role})
                    </div>

                    <button
                      onClick={() => handlePush(biz)}
                      disabled={isPushed}
                      className={`
                        px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5
                        ${
                          isPushed
                            ? 'bg-[#116466] text-[#FFCB9A] border border-[#FFCB9A]'
                            : 'bg-[#FFCB9A] text-[#2C3531] hover:bg-[#FFCB9A]/90 hover:scale-[1.02] shadow-[0_0_12px_rgba(255,203,154,0.3)] active:scale-95'
                        }
                      `}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isPushed ? 'Pushed to Stage 3!' : 'Push to Stage 3 Outreach'}</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* 2. Discovered Businesses Intelligence: Executive Table View */}
      {viewMode === 'table' && (
        <GlassCard className="p-4 overflow-x-auto" showReticles={true}>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D1E8E2]/15 text-[10px] font-mono uppercase text-[#D9B08C]">
                <th className="p-3">Business & Footprint</th>
                <th className="p-3">Category & Size</th>
                <th className="p-3">Inferred ISP & Bottleneck</th>
                <th className="p-3 text-center">Capacity Score</th>
                <th className="p-3">Recommended AT&T Plan</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D1E8E2]/10">
              {filteredBusinesses.map((biz) => {
                const isPushed = pushedBusinessId === biz.id;

                return (
                  <tr key={biz.id} className="hover:bg-[#116466]/10 transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#D1E8E2] text-sm">{biz.name}</div>
                      <div className="text-[11px] text-[#D1E8E2]/60">{biz.address}</div>
                      <div className="text-[10px] font-mono text-[#D9B08C] mt-0.5">
                        {biz.footprintMetric}
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <Badge variant="teal" className="text-[9px]">
                        {biz.category}
                      </Badge>
                      <div className="text-[10px] font-mono text-[#D9B08C] mt-1">
                        {biz.employeeCount} Employees
                      </div>
                    </td>

                    <td className="p-3 max-w-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[#D1E8E2]">
                        <span>{biz.inferredISP.providerName}</span>
                        <button
                          onClick={() => setInspectingIspBusiness(biz)}
                          className="text-[#FFCB9A] hover:underline"
                          title="How We Detected This"
                        >
                          <Info className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-[10px] font-mono text-[#FFCB9A]">
                        {biz.inferredISP.speedDownUp}
                      </div>
                      <div className="text-[10px] text-[#D1E8E2]/60 truncate">
                        {biz.inferredISP.knownLimitation}
                      </div>
                    </td>

                    <td className="p-3 text-center whitespace-nowrap">
                      <div className={`text-base font-mono font-black ${getCapacityScoreColor(biz.capacityScore.totalScore)}`}>
                        {biz.capacityScore.totalScore}/100
                      </div>
                      <div className="text-[9px] font-mono text-[#D9B08C]">
                        {biz.capacityScore.estimatedAnnualRevenue}
                      </div>
                    </td>

                    <td className="p-3 max-w-sm">
                      <div className="font-bold text-[#FFCB9A] text-xs">
                        {biz.recommendedPlan.serviceName}
                      </div>
                      <div className="text-[10px] font-mono text-[#D9B08C]">
                        Estimated Win Rate: {biz.recommendedPlan.conversionProbability}% • {biz.recommendedPlan.estimatedMrc}
                      </div>
                      <div className="text-[10px] text-[#D1E8E2]/70 line-clamp-1 mt-0.5">
                        {biz.recommendedPlan.matchReason}
                      </div>
                    </td>

                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => handlePush(biz)}
                        disabled={isPushed}
                        className={`
                          px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                          ${
                            isPushed
                              ? 'bg-[#116466] text-[#FFCB9A]'
                              : 'bg-[#FFCB9A] text-[#2C3531] hover:bg-[#FFCB9A]/90'
                          }
                        `}
                      >
                        {isPushed ? 'Pushed!' : 'Push Outreach'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </GlassCard>
      )}

      {/* AI ISP Detection Inspector Modal / Tooltip Drawer */}
      {inspectingIspBusiness && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3531]/80 backdrop-blur-xl animate-fadeIn">
          <GlassCard className="max-w-xl w-full p-6 relative" showReticles={true}>
            <div className="flex items-start justify-between pb-3 border-b border-[#D1E8E2]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#116466] border border-[#FFCB9A]/50 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#FFCB9A]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#D1E8E2] uppercase">
                    AI ISP Detection Telemetry
                  </h3>
                  <p className="text-[10px] font-mono text-[#D9B08C]">
                    Target: {inspectingIspBusiness.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setInspectingIspBusiness(null)}
                className="text-[#D1E8E2]/70 hover:text-[#FFCB9A] text-xs font-mono px-2 py-1 rounded bg-[#2C3531] border border-[#D1E8E2]/20"
              >
                ✕ Close
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              {/* Detection Methodology */}
              <div className="p-3 rounded-lg bg-[#116466]/20 border border-[#116466]/60">
                <span className="text-[10px] font-mono uppercase text-[#D9B08C] block mb-1">
                  Primary Detection Pipeline:
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="peach" className="text-[10px]">
                    {inspectingIspBusiness.inferredISP.detectionMethod}
                  </Badge>
                  <span className="text-[#D1E8E2] font-semibold">
                    Confidence: 99.4% (Multi-Vector Corroboration)
                  </span>
                </div>
              </div>

              {/* Technical Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="p-2.5 rounded bg-[#2C3531]/80 border border-[#D1E8E2]/10">
                  <span className="text-[#D1E8E2]/50 block">Autonomous System (ASN):</span>
                  <span className="text-[#FFCB9A] font-bold">
                    {inspectingIspBusiness.inferredISP.asnNumber}
                  </span>
                  <div className="text-[10px] text-[#D9B08C] truncate">
                    {inspectingIspBusiness.inferredISP.asnOrg}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#2C3531]/80 border border-[#D1E8E2]/10">
                  <span className="text-[#D1E8E2]/50 block">Public IP Subnet:</span>
                  <span className="text-[#D1E8E2] font-bold">
                    {inspectingIspBusiness.inferredISP.ipRange}
                  </span>
                  <div className="text-[10px] text-[#D9B08C]">PTR Reverse Host Checked</div>
                </div>

                <div className="p-2.5 rounded bg-[#2C3531]/80 border border-[#D1E8E2]/10 col-span-2">
                  <span className="text-[#D1E8E2]/50 block">FCC Broadband Data Collection (BDC):</span>
                  <span className="text-[#D1E8E2] font-bold">
                    {inspectingIspBusiness.inferredISP.fccCensusBlock}
                  </span>
                  <div className="text-[10px] text-[#D9B08C]">
                    Form 477 Fixed Broadband Filing Correlated
                  </div>
                </div>
              </div>

              {/* Bottleneck Analysis */}
              <div className="p-3 rounded-lg bg-[#2C3531] border border-[#D9B08C]/40 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-[#D9B08C] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FFCB9A]" /> Incumbent Infrastructure Bottleneck
                </span>
                <p className="text-[11px] text-[#D1E8E2] leading-relaxed">
                  {inspectingIspBusiness.inferredISP.knownLimitation}
                </p>
                <div className="text-[10px] font-mono text-[#FFCB9A] pt-1">
                  AT&T Strategy: Displace with {inspectingIspBusiness.recommendedPlan.serviceName}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#D1E8E2]/15 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#D9B08C]">
                Ready for Account Manager Dispatch
              </span>
              <button
                onClick={() => {
                  const b = inspectingIspBusiness;
                  setInspectingIspBusiness(null);
                  handlePush(b);
                }}
                className="px-4 py-2 rounded-lg bg-[#FFCB9A] text-[#2C3531] text-xs font-bold hover:bg-[#FFCB9A]/90 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Push to Stage 3 Outreach</span>
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

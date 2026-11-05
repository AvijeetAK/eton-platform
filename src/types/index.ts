export type StageId = 'catalog' | 'discovery' | 'outreach' | 'pipeline';

export interface StageInfo {
  id: StageId;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  badge?: string;
}

export interface CatalogProduct {
  id: string;
  name: string;
  code: string;
  category: 'Connectivity' | 'Broadband' | 'SD-WAN & Security' | '5G & Mobility' | 'Voice & Collaboration' | 'Cybersecurity';
  speedTiers: string;
  sla: string;
  monthlyEstimate: string; // Highlighted in #FFCB9A
  regionalCoverage: string[]; // Highlighted in #D9B08C
  description: string;
  idealFor: string[];
  competitiveEdge: string;
  tags: string[];
  vectorPdfSource: {
    fileName: string;
    page: number;
    matchScore: string;
  };
}

export interface VectorPdfDoc {
  id: string;
  title: string;
  fileName: string;
  pages: number;
  lastUpdated: string;
  category: string;
  size: string;
}

export interface RAGMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  citations?: {
    source: string;
    page: number;
    relevance: string;
    excerpt: string;
  }[];
  structuredRecommendation?: {
    clientScenario: string;
    architectureType: string;
    recommendedServices: {
      name: string;
      code: string;
      priceTier: string;
      role: string;
    }[];
    estimatedTotalMrc: string;
    roiSummary: string;
  };
}

// Stage 2 Discovery Types
export type BusinessCategory = 'Local Vendors' | 'Malls/Retail Shops' | 'Manufacturing Units' | 'Corporate Offices';
export type CompanySize = 'Small' | 'Medium' | 'Large';

export interface InferredISPInfo {
  providerName: string;
  technology: string;
  asnNumber: string;
  asnOrg: string;
  ipRange: string;
  detectionMethod: 'IP-to-ASN Lookup' | 'FCC Broadband Map BDC' | 'DNS MX / PTR Record' | 'BGP Peering Prefix';
  speedDownUp: string;
  knownLimitation: string;
  fccCensusBlock: string;
}

export interface BuyingCapacityScore {
  totalScore: number; // 0 - 100
  footTrafficIndex: number; // 0 - 100
  creValuePerSqFt: string; // e.g., $380/sq ft
  estimatedAnnualRevenue: string; // e.g., $45M ARR
  tier: 'High Priority Tier-1' | 'Prime Commercial' | 'Standard B2B';
}

export interface DiscoveredBusiness {
  id: string;
  name: string;
  state: string;
  metroArea: string;
  category: BusinessCategory;
  employeeCount: number;
  companySize: CompanySize;
  footprintMetric: string;
  address: string;
  inferredISP: InferredISPInfo;
  capacityScore: BuyingCapacityScore;
  recommendedPlan: {
    serviceName: string;
    serviceCode: string;
    estimatedMrc: string; // in #FFCB9A
    matchReason: string;
    conversionProbability: number; // e.g., 94
  };
  contactPerson: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
}

export interface ISPCompetitor {
  id: string;
  name: string;
  tech: string;
  maxSpeed: string;
  marketShare: number;
  weakness: string;
  atntCounterStrategy: string;
}

// Stage 3 Contact Extraction & Multi-Channel AI Outreach
export interface ExtractedContact {
  id: string;
  name: string;
  role: 'IT Director' | 'Operations Head' | 'Plant Manager' | 'CISO / VP of Tech' | 'Chief Information Officer' | 'General Manager';
  email: string | null;
  emailVerified: boolean;
  phone: string;
  whatsappVerified: boolean;
  fallbackToWhatsApp: boolean;
  enrichmentNode: 'Apollo.io' | 'Clay.com' | 'Hunter.io' | 'LLM Scraper';
  confidenceScore: number;
}

export interface EnterpriseLead {
  id: string;
  company: string;
  industry: string;
  subRegion: string;
  businessType: string;
  locations: number;
  address: string;
  currentISP: string;
  ispBottleneck: string;
  recommendedUpgrade: string;
  estimatedContractValue: string;
  fiberStatus: 'Lit Building' | 'Near-Net (150ft)' | 'Pending Survey';
  copperSunsetRisk: 'Critical (90 Days)' | 'High' | 'Moderate';
  contacts: ExtractedContact[];
  generatedOutreach?: {
    emailSubject: string;
    emailBody: string;
    whatsAppBody: string;
    phoneScript: string;
    valueProposition: string;
  };
}

// Stage 4: Sentiment-Driven Kanban Pipeline & Paid Ads Leads
export type KanbanStage =
  | 'Outreach Sent'
  | 'AI Sentiment: Positive Reply'
  | 'Qualification In Progress'
  | 'Ready for Account Manager';

export interface PipelineDeal {
  id: string;
  company: string;
  stage: KanbanStage;
  services: string[];
  mrr: number; // in #FFCB9A
  tcv: number; // in #D1E8E2
  probability: number;
  closeDate: string;
  health: 'Strong' | 'At Risk' | 'Accelerating';
  aiSentimentTag: string; // e.g., "Interested - Requested Fiber SLA pricing"
  sentimentCategory: 'positive' | 'urgent' | 'evaluating' | 'ready';
  lastActivity: string;
  contactName: string;
  contactRole: string;
  assignedAM: string;
}

export interface InboundAdLead {
  id: string;
  platform: 'Google Search Ads' | 'Meta B2B Sponsored';
  campaignName: string;
  prospectName: string;
  workEmail: string;
  company: string;
  subRegion: string;
  businessNeed: string;
  adHeadline: string;
  timestamp: string;
  estimatedMrc: string;
  qualificationStatus: 'Calling...' | 'Meeting Booked' | 'Queued' | 'Enriched';
}

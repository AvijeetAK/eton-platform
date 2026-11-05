import { CatalogProduct, ISPCompetitor, EnterpriseLead, PipelineDeal, VectorPdfDoc, RAGMessage, DiscoveredBusiness, InboundAdLead, KanbanStage } from '../types';

export const ATNT_CORE_SERVICES: CatalogProduct[] = [
  {
    id: 'att-adi',
    name: 'AT&T Dedicated Private Fiber (ADI)',
    code: 'ATT-ADI-100G',
    category: 'Connectivity',
    speedTiers: '100 Mbps – 100 Gbps (Equal Upload & Download)',
    sla: '99.999% Reliability Guarantee (4-Hour Emergency Repair On-Site)',
    monthlyEstimate: '$850 – $4,200/mo',
    regionalCoverage: ['Direct In-Building Fiber', 'Major Metro Centers', 'Nationwide Business Grid'],
    description: 'Our premier 100% private fiber connection. Bandwidth is never shared with neighbors, backed by 24/7 dedicated network monitoring and a contractual 4-hour repair guarantee.',
    idealFor: ['Corporate Headquarters', 'Hospitals & Medical Centers', 'Financial Firms', 'High-Volume Warehouses & Factories'],
    competitiveEdge: 'Unlike shared cable, your bandwidth is 100% dedicated to your company and legally guaranteed with bill credits if it ever drops.',
    tags: ['100% Private Fiber', 'Unshared Connection', '4-Hour Emergency Repair', 'Direct AT&T Backbone'],
    vectorPdfSource: {
      fileName: 'ATT_ADI_Master_Service_Agreement_2026.pdf',
      page: 14,
      matchScore: '99.4% Match'
    }
  },
  {
    id: 'att-business-fiber',
    name: 'AT&T Business Fast Fiber',
    code: 'ATT-BF-5GIG',
    category: 'Broadband',
    speedTiers: '100 Mbps – 5 Gbps Equal Speeds',
    sla: '99.9% Core Network Availability Guarantee',
    monthlyEstimate: '$160 – $650/mo',
    regionalCoverage: ['Connected Office Buildings', 'Suburban Commercial Parks', 'Retail Centers'],
    description: 'Affordable, business-grade fiber broadband designed for modern retail branches, dental/medical offices, and professional service firms.',
    idealFor: ['Branch Offices', 'Retail Stores & Malls', 'Law & Accounting Firms', 'Outpatient Clinics'],
    competitiveEdge: 'Delivers ultra-fast speeds up to 5,000 Mbps at a fraction of the cost of dedicated lines with rapid 14-day installation.',
    tags: ['Affordable High Speed', 'Equal Up & Down', 'Fast 14-Day Activation', 'No Data Caps'],
    vectorPdfSource: {
      fileName: 'ATT_Business_Fiber_Rate_Card_v4.pdf',
      page: 6,
      matchScore: '97.8% Match'
    }
  },
  {
    id: 'att-sdwan-sase',
    name: 'AT&T Smart Multi-Office Network & Backup',
    code: 'ATT-SDWAN-SASE',
    category: 'SD-WAN & Security',
    speedTiers: 'Dual-Path Smart Traffic Routing (Fiber + Wireless Backup)',
    sla: 'Instant Sub-Second Backup Switching Guarantee',
    monthlyEstimate: '$450 – $1,800/site/mo',
    regionalCoverage: ['Multi-Branch Networks', 'Cloud Direct Links', 'Nationwide Mesh'],
    description: 'Connects multiple stores or branch offices into one secure network. Combines primary fiber with automated 5G wireless backup so registers and card payment terminals never go offline.',
    idealFor: ['Multi-Store Retailers', 'Cloud-First Companies', 'Multi-Site Medical Clinics'],
    competitiveEdge: 'Bonds primary fiber and 5G wireless into a bulletproof connection that automatically switches if a cable is cut outside.',
    tags: ['Never Goes Down', 'Automatic Wireless Backup', 'Connects All Branches', 'Built-in Cyber Defense'],
    vectorPdfSource: {
      fileName: 'ATT_SDWAN_VeloCloud_SASE_Design_Guide.pdf',
      page: 28,
      matchScore: '98.9% Match'
    }
  },
  {
    id: 'att-5g-enterprise',
    name: 'AT&T 5G Fast Wireless & Rapid Backup',
    code: 'ATT-5G-FWA',
    category: '5G & Mobility',
    speedTiers: '5G+ Wireless (Up to 500+ Mbps Down / 80 Mbps Up)',
    sla: '99.95% Network Availability with Rapid 48-Hour Setup',
    monthlyEstimate: '$120 – $380/mo per site',
    regionalCoverage: ['Nationwide 5G+ Mid-Band', 'Metro Business Corridors', 'Secondary Commercial Grids'],
    description: 'Instantly brings high-speed business internet to any location in 48 hours without digging trenches or waiting for city permits. Ideal as primary internet or instant backup.',
    idealFor: ['Quick-Deploy Job Sites', 'New Store Openings', 'Emergency Backup Line', 'Mobile Business Offices'],
    competitiveEdge: 'Turns on in under 48 hours without waiting months for construction crews to dig through street pavements.',
    tags: ['Quick 48-Hour Setup', 'No Trench Digging', 'Automatic Backup Line', 'Nationwide 5G+'],
    vectorPdfSource: {
      fileName: 'ATT_5G_Fixed_Wireless_Tariff_Schedule_7.pdf',
      page: 9,
      matchScore: '96.5% Match'
    }
  },
  {
    id: 'att-cloud-voice',
    name: 'AT&T Business Cloud Phone & Video Calling',
    code: 'ATT-CV-WEBEX',
    category: 'Voice & Collaboration',
    speedTiers: 'HD Business Calling + Microsoft Teams & Webex Integration',
    sla: '99.99% Call Quality & Uptime Guarantee',
    monthlyEstimate: '$18 – $35/seat/mo',
    regionalCoverage: ['Nationwide Phone Grid', 'Toll-Free Numbers', 'Local Area Code Numbers'],
    description: 'Modern cloud phone system that replaces old landline phone boxes. Gives employees work phone calling on their laptops, mobile phones, and desk phones with automated voicemail-to-text.',
    idealFor: ['Customer Support Teams', 'Hybrid & Remote Offices', 'Sales & Financial Advisory Desks'],
    competitiveEdge: 'Voice traffic travels directly on AT&T dedicated phone lines, preventing echo, jitter, and dropped client calls.',
    tags: ['Microsoft Teams Calling', 'Replaces Old Landlines', 'Crystal-Clear HD Audio', 'Mobile & Laptop Calling'],
    vectorPdfSource: {
      fileName: 'ATT_Cloud_Voice_SIP_Trunking_Spec.pdf',
      page: 12,
      matchScore: '95.2% Match'
    }
  },
  {
    id: 'att-cybersecurity',
    name: 'AT&T Business Cybersecurity & Threat Shield',
    code: 'ATT-SEC-USM',
    category: 'Cybersecurity',
    speedTiers: 'Global Attack Defense & 24/7 Security Operations Team',
    sla: '24/7 Proactive Security Monitoring & Rapid Response',
    monthlyEstimate: '$350 – $2,200/mo',
    regionalCoverage: ['AT&T Global Backbone', 'Cloud Edge Defense', 'Zero-Trust Secure Access'],
    description: 'Shields your business from ransomware, phishing, and denial-of-service attacks. Powered by AT&T global threat intelligence that blocks attacks before they reach your office.',
    idealFor: ['Defense & Aerospace', 'Banks & FinTech', 'Online Retailers', 'Critical Infrastructure Providers'],
    competitiveEdge: 'Monitors more global internet traffic than any single competitor, catching cyber threats before they can reach your office firewall.',
    tags: ['24/7 Security Team', 'Ransomware Shield', 'Global Threat Radar', 'Zero-Trust Defense'],
    vectorPdfSource: {
      fileName: 'ATT_Cybersecurity_Threat_Intel_Brief.pdf',
      page: 31,
      matchScore: '98.1% Match'
    }
  }
];

export const VECTOR_PDF_DOCS: VectorPdfDoc[] = [
  {
    id: 'doc-01',
    title: 'AT&T Dedicated Private Fiber SLA & Master Service Agreement 2026',
    fileName: 'ATT_ADI_Master_Service_Agreement_2026.pdf',
    pages: 42,
    lastUpdated: 'Nov 01, 2026',
    category: 'Reliability Guarantees',
    size: '3.4 MB'
  },
  {
    id: 'doc-02',
    title: 'AT&T Business Fast Fiber Commercial Pricing Matrix v4.2',
    fileName: 'ATT_Business_Fiber_Rate_Card_v4.pdf',
    pages: 18,
    lastUpdated: 'Oct 28, 2026',
    category: 'Rate Cards',
    size: '1.8 MB'
  },
  {
    id: 'doc-03',
    title: 'AT&T Smart Multi-Office Network Architecture & Backup Guide',
    fileName: 'ATT_SDWAN_VeloCloud_SASE_Design_Guide.pdf',
    pages: 64,
    lastUpdated: 'Nov 02, 2026',
    category: 'Solution Guides',
    size: '6.2 MB'
  },
  {
    id: 'doc-04',
    title: 'AT&T 5G Fast Wireless & Rapid Deployment Rate Guide',
    fileName: 'ATT_5G_Fixed_Wireless_Tariff_Schedule_7.pdf',
    pages: 26,
    lastUpdated: 'Oct 15, 2026',
    category: 'Wireless Rates',
    size: '2.1 MB'
  },
  {
    id: 'doc-05',
    title: 'AT&T Business Cloud Phone & Hosted Calling Specification',
    fileName: 'ATT_Cloud_Voice_SIP_Trunking_Spec.pdf',
    pages: 30,
    lastUpdated: 'Sep 29, 2026',
    category: 'Business Calling',
    size: '2.7 MB'
  },
  {
    id: 'doc-06',
    title: 'AT&T Cybersecurity Global Threat Defense Architecture Brief',
    fileName: 'ATT_Cybersecurity_Threat_Intel_Brief.pdf',
    pages: 48,
    lastUpdated: 'Nov 03, 2026',
    category: 'Security Architecture',
    size: '4.9 MB'
  }
];

export const INITIAL_RAG_CONVERSATION: RAGMessage[] = [
  {
    id: 'msg-init-1',
    sender: 'assistant',
    timestamp: '16:00:10',
    text: `Welcome, Jessica. I am your **AT&T Sales & Proposal Copilot**.\n\nI have pre-indexed **6 official AT&T business rate cards, service agreements, and proposal guides**. Select any business service card above or click a common sales question below to generate clear, executive recommendations with exact contract citations.`
  }
];

// Stage 2: Geographic Hierarchy & Discovered Businesses
export const US_STATES_AND_METROS: Record<string, string[]> = {
  'Texas': ['All Metros', 'Austin Silicon Hills', 'Dallas-Fort Worth Commercial', 'Houston Industrial Hub'],
  'California': ['All Metros', 'Silicon Valley Tech Center', 'LA Commercial / Culver', 'San Diego Biotech Cluster'],
  'Ohio': ['All Metros', 'Columbus Business Corridor', 'Cleveland Medical District', 'Cincinnati Logistics Center'],
  'New York': ['All Metros', 'NYC Midtown Commercial', 'Brooklyn Tech Corridor', 'Long Island Business Park'],
  'Georgia': ['All Metros', 'Atlanta Midtown Hub', 'Perimeter Commercial Center', 'Savannah Port Logistics'],
  'Florida': ['All Metros', 'Miami Financial Corridor', 'Tampa Bay Tech Center', 'Orlando Commercial Park']
};

export const DISCOVERED_BUSINESSES: DiscoveredBusiness[] = [
  // Texas Prospects
  {
    id: 'tx-01',
    name: 'Lone Star Precision Fabrication',
    state: 'Texas',
    metroArea: 'Austin Silicon Hills',
    category: 'Manufacturing Units',
    employeeCount: 180,
    companySize: 'Medium',
    footprintMetric: '120,000 sq ft Advanced Machining Plant',
    address: '9400 Research Blvd, Austin, TX 78759',
    inferredISP: {
      providerName: 'Charter Spectrum Business',
      technology: 'Standard Shared Cable (Coax)',
      asnNumber: 'Charter AS20115',
      asnOrg: 'Charter Communications Inc',
      ipRange: '142.129.44.0/24',
      detectionMethod: 'IP-to-ASN Lookup',
      speedDownUp: '1,000 Mbps Down / 35 Mbps Up',
      knownLimitation: 'Severe 35 Mbps upload throttling freezes 3D CAD design files and robotic backups',
      fccCensusBlock: 'FCC Census Block: Cable-Only Zone (No Competitor Fiber)'
    },
    capacityScore: {
      totalScore: 94,
      footTrafficIndex: 82,
      creValuePerSqFt: '$385/sq ft',
      estimatedAnnualRevenue: '$48M ARR',
      tier: 'High Priority Tier-1'
    },
    recommendedPlan: {
      serviceName: 'AT&T Dedicated Private Fiber 1 Gbps + 5G Wireless Backup',
      serviceCode: 'ATT-ADI-100G',
      estimatedMrc: '$1,850/mo',
      matchReason: 'Replaces weak 35 Mbps cable upload with equal 1,000 Mbps private fiber in both directions, eliminating file transfer freezes.',
      conversionProbability: 95
    },
    contactPerson: {
      name: 'Travis Sterling',
      role: 'VP of Manufacturing & Operations',
      email: 'tsterling@lonestarfab.com',
      phone: '(512) 555-0144'
    }
  },
  {
    id: 'tx-02',
    name: 'Domain Northside Luxury Promenade',
    state: 'Texas',
    metroArea: 'Austin Silicon Hills',
    category: 'Malls/Retail Shops',
    employeeCount: 420,
    companySize: 'Large',
    footprintMetric: '48 Multi-Tenant Retail Suites & Food Hall',
    address: '11821 Domain Dr, Austin, TX 78758',
    inferredISP: {
      providerName: 'Charter Spectrum Enterprise',
      technology: 'Shared Cable Broadband',
      asnNumber: 'Charter AS10796',
      asnOrg: 'Charter Communications',
      ipRange: '71.42.180.0/22',
      detectionMethod: 'FCC Broadband Map BDC',
      speedDownUp: '1,200 Mbps Down / 40 Mbps Up',
      knownLimitation: 'Neighborhood cable slowdowns cause payment card delays and guest Wi-Fi drops during weekend shopping rushes',
      fccCensusBlock: 'FCC Census Block: High-Density Commercial Corridor'
    },
    capacityScore: {
      totalScore: 98,
      footTrafficIndex: 99,
      creValuePerSqFt: '$620/sq ft',
      estimatedAnnualRevenue: '$140M GMV',
      tier: 'High Priority Tier-1'
    },
    recommendedPlan: {
      serviceName: 'AT&T Smart Multi-Office Network with 5G Automatic Backup',
      serviceCode: 'ATT-SDWAN-SASE',
      estimatedMrc: '$2,400/mo',
      matchReason: 'Combines fiber with automated 5G wireless backup across 48 stores, ensuring card payment registers never go offline.',
      conversionProbability: 92
    },
    contactPerson: {
      name: 'Kendra Morales',
      role: 'Director of Property Tech & Infrastructure',
      email: 'kmorales@domainnorthside.com',
      phone: '(512) 555-8921'
    }
  },
  {
    id: 'tx-03',
    name: 'CyberShield Systems DFW',
    state: 'Texas',
    metroArea: 'Dallas-Fort Worth Commercial',
    category: 'Corporate Offices',
    employeeCount: 95,
    companySize: 'Medium',
    footprintMetric: '35,000 sq ft Corporate HQ & Security Lab',
    address: '5000 Legacy Dr, Suite 300, Plano, TX 75024',
    inferredISP: {
      providerName: 'Comcast Business Class',
      technology: 'Shared Cable Broadband',
      asnNumber: 'Comcast AS7922',
      asnOrg: 'Comcast Cable Communications',
      ipRange: '68.87.64.0/21',
      detectionMethod: 'DNS MX / PTR Record',
      speedDownUp: '800 Mbps Down / 35 Mbps Up',
      knownLimitation: 'Standard customer support has 24-48 hour repair delays instead of emergency on-site repair guarantees',
      fccCensusBlock: 'FCC Census Block: Suburban Office Campus'
    },
    capacityScore: {
      totalScore: 89,
      footTrafficIndex: 78,
      creValuePerSqFt: '$340/sq ft',
      estimatedAnnualRevenue: '$28M ARR',
      tier: 'Prime Commercial'
    },
    recommendedPlan: {
      serviceName: 'AT&T Dedicated Private Fiber 2 Gbps + Proactive Cyber Defense',
      serviceCode: 'ATT-ADI-100G',
      estimatedMrc: '$2,200/mo',
      matchReason: 'Delivers private fiber with a 4-hour emergency repair guarantee and proactive cybersecurity defense to protect client records.',
      conversionProbability: 88
    },
    contactPerson: {
      name: 'Derek Vance',
      role: 'Chief Information Security Officer (CISO)',
      email: 'dvance@cybershielddfw.com',
      phone: '(972) 555-4309'
    }
  },
  {
    id: 'tx-04',
    name: 'Trinity Regional Logistics Hub',
    state: 'Texas',
    metroArea: 'Dallas-Fort Worth Commercial',
    category: 'Local Vendors',
    employeeCount: 42,
    companySize: 'Small',
    footprintMetric: 'Single Warehouse Depot & Truck Fleet Bay',
    address: '2200 E Loop 820 S, Fort Worth, TX 76119',
    inferredISP: {
      providerName: 'Lumen Legacy Copper Lines',
      technology: 'Aging Copper Telephone Wires',
      asnNumber: 'Lumen AS209',
      asnOrg: 'CenturyLink / Lumen Technologies',
      ipRange: '205.171.3.0/24',
      detectionMethod: 'BGP Peering Prefix',
      speedDownUp: '6.0 Mbps Down / 6.0 Mbps Up',
      knownLimitation: 'Old telephone-wire copper lines are being permanently shut down by the FCC, triggering severe monthly price hikes',
      fccCensusBlock: 'FCC Census Block: Copper Retirement Zone'
    },
    capacityScore: {
      totalScore: 78,
      footTrafficIndex: 65,
      creValuePerSqFt: '$180/sq ft',
      estimatedAnnualRevenue: '$12M ARR',
      tier: 'Standard B2B'
    },
    recommendedPlan: {
      serviceName: 'AT&T Business Fast Fiber 1 Gbps Equal Speeds',
      serviceCode: 'ATT-BF-5GIG',
      estimatedMrc: '$340/mo',
      matchReason: 'Replaces dying copper lines with high-speed fiber, cutting monthly internet expenses by over 50% while speeding up warehouse logistics.',
      conversionProbability: 97
    },
    contactPerson: {
      name: 'Arturo Gomez',
      role: 'Warehouse Operations Manager',
      email: 'agomez@trinitylogistics.com',
      phone: '(817) 555-7811'
    }
  }
];

// Stage 3: Initial Outreach Leads with Verified Decision Makers
export const INITIAL_LEADS: EnterpriseLead[] = [
  {
    id: 'lead-01',
    company: 'Apex Logistics & Freight Hub',
    industry: 'Supply Chain & Warehousing',
    subRegion: 'Atlanta Midtown Hub',
    businessType: 'Regional Distribution Facility',
    locations: 4,
    address: '4400 Industrial Blvd, Atlanta, GA 30336',
    currentISP: 'Charter Spectrum Business',
    ispBottleneck: 'Shared Cable with slow 35 Mbps upload throttling',
    recommendedUpgrade: 'AT&T Dedicated Private Fiber (1 Gbps Symmetrical)',
    estimatedContractValue: '$34,800 / yr',
    fiberStatus: 'Lit Building',
    copperSunsetRisk: 'Moderate',
    contacts: [
      {
        id: 'c-01',
        name: 'Marcus Vance',
        role: 'IT Director',
        email: 'mvance@apexlogistics.com',
        emailVerified: true,
        phone: '(404) 555-0182',
        whatsappVerified: true,
        fallbackToWhatsApp: false,
        enrichmentNode: 'Hunter.io',
        confidenceScore: 99
      },
      {
        id: 'c-02',
        name: 'Elena Rostova',
        role: 'Operations Head',
        email: null,
        emailVerified: false,
        phone: '+1 (404) 555-0199',
        whatsappVerified: true,
        fallbackToWhatsApp: true,
        enrichmentNode: 'LLM Scraper',
        confidenceScore: 94
      }
    ],
    generatedOutreach: {
      emailSubject: 'Executive Brief: Upgrading internet reliability at 4400 Industrial Blvd',
      emailBody: `Hi Marcus,\n\nI noticed Apex Logistics operates 4 critical distribution hubs across Greater Atlanta. Our engineering fiber records indicate 4400 Industrial Blvd is already an AT&T Fiber Connected Building.\n\nUnlike the 35 Mbps upload bottleneck on standard shared cable, AT&T Dedicated Private Fiber provides equal 1,000 Mbps speeds in both directions with a 99.999% uptime guarantee — eliminating warehouse barcode scanner sync lags and security camera feed freezes.\n\nCould we review your facility's fiber connection schedule this Thursday at 2 PM?\n\nBest regards,\nJessica Lin | Senior Enterprise Account Manager, AT&T`,
      whatsAppBody: `Hello Elena — Jessica Lin here with AT&T Enterprise. I see you manage operations at Apex Logistics (4400 Industrial Blvd). Our local fiber network is already active in your building. We can replace your current cable upload bottlenecks with guaranteed equal 1 Gbps fiber. Would you be open to a 3-minute chat tomorrow at 11 AM?`,
      phoneScript: `Hi Marcus, this is Jessica Lin with AT&T Enterprise Solutions. I am calling regarding your logistics facility at 4400 Industrial Blvd. Our network records confirm your building is already fiber-connected. I understand you are currently using shared Spectrum cable, which limits your upload speeds to 35 Mbps. We can upgrade your entire hub to dedicated 1 Gbps fiber with a 4-hour emergency repair guarantee. Do you have 5 minutes this week to review the installation timeline?`,
      valueProposition: 'Guaranteed 99.999% private fiber eliminates warehouse barcode scanning lags and video security freezes.'
    }
  },
  {
    id: 'lead-02',
    company: 'Lone Star Precision Fabrication',
    industry: 'Industrial Manufacturing',
    subRegion: 'Austin Silicon Hills',
    businessType: 'Precision Machining Plant',
    locations: 1,
    address: '9400 Research Blvd, Austin, TX 78759',
    currentISP: 'Charter Spectrum Business',
    ispBottleneck: 'Shared Cable with slow 35 Mbps upload throttling',
    recommendedUpgrade: 'AT&T Dedicated Private Fiber (1 Gbps) + 5G Backup',
    estimatedContractValue: '$45,600 / yr',
    fiberStatus: 'Lit Building',
    copperSunsetRisk: 'Critical (90 Days)',
    contacts: [
      {
        id: 'c-03',
        name: 'Travis Sterling',
        role: 'Plant Manager',
        email: 'tsterling@lonestarfab.com',
        emailVerified: true,
        phone: '(512) 555-0144',
        whatsappVerified: true,
        fallbackToWhatsApp: false,
        enrichmentNode: 'Clay.com',
        confidenceScore: 97
      }
    ]
  },
  {
    id: 'lead-03',
    company: 'Northside Regional Medical Clinic',
    industry: 'Healthcare & Diagnostics',
    subRegion: 'Atlanta Midtown Hub',
    businessType: 'Multi-Specialty Medical Clinic',
    locations: 6,
    address: '1100 Peachtree St NE, Atlanta, GA 30309',
    currentISP: 'Comcast Business Class',
    ispBottleneck: 'Standard shared cable with no 4-hour emergency repair guarantee',
    recommendedUpgrade: 'AT&T Smart Multi-Office Network + 2 Gbps Fiber',
    estimatedContractValue: '$96,000 / yr',
    fiberStatus: 'Near-Net (150ft)',
    copperSunsetRisk: 'High',
    contacts: [
      {
        id: 'c-04',
        name: 'Dr. Rachel Sterling',
        role: 'Chief Information Officer',
        email: 'rsterling@northsidemed.org',
        emailVerified: true,
        phone: '(404) 555-8822',
        whatsappVerified: true,
        fallbackToWhatsApp: false,
        enrichmentNode: 'Apollo.io',
        confidenceScore: 98
      }
    ]
  }
];

// Stage 4: Initial Kanban Pipeline Deals
export const INITIAL_DEALS: PipelineDeal[] = [
  {
    id: 'deal-01',
    company: 'Northside Regional Medical Clinic',
    stage: 'Outreach Sent',
    services: ['AT&T Smart Multi-Office Network', '2 Gbps Fiber'],
    mrr: 8000,
    tcv: 288000,
    probability: 45,
    closeDate: 'Dec 15, 2026',
    health: 'Accelerating',
    aiSentimentTag: 'Under Review - Medical Image Sync Test Scheduled',
    sentimentCategory: 'evaluating',
    lastActivity: '12 mins ago',
    contactName: 'Dr. Rachel Sterling',
    contactRole: 'Chief Information Officer',
    assignedAM: 'Jessica Lin'
  },
  {
    id: 'deal-02',
    company: 'Apex Logistics & Freight Hub',
    stage: 'AI Sentiment: Positive Reply',
    services: ['AT&T Dedicated Private Fiber (1 Gbps)', '4x Cloud Phone Lines'],
    mrr: 4500,
    tcv: 162000,
    probability: 75,
    closeDate: 'Nov 28, 2026',
    health: 'Strong',
    aiSentimentTag: 'Interested - Requested Official Pricing & 4-Hour Repair SLA',
    sentimentCategory: 'positive',
    lastActivity: '34 mins ago',
    contactName: 'Marcus Vance',
    contactRole: 'IT Director',
    assignedAM: 'Jessica Lin'
  },
  {
    id: 'deal-03',
    company: 'Lone Star Precision Fabrication',
    stage: 'Qualification In Progress',
    services: ['AT&T Dedicated Private Fiber 1 Gbps', '5G Wireless Backup'],
    mrr: 3800,
    tcv: 136800,
    probability: 65,
    closeDate: 'Dec 05, 2026',
    health: 'Strong',
    aiSentimentTag: 'Positive - Phone Assistant Verified In-Building Fiber Connection',
    sentimentCategory: 'positive',
    lastActivity: '2 hours ago',
    contactName: 'Travis Sterling',
    contactRole: 'Plant Manager',
    assignedAM: 'Jessica Lin'
  },
  {
    id: 'deal-04',
    company: 'Vanguard Capital Advisory',
    stage: 'Ready for Account Manager',
    services: ['Dedicated Private Fiber 10G', 'Ultra-Low Latency Direct Route'],
    mrr: 6000,
    tcv: 216000,
    probability: 90,
    closeDate: 'Nov 20, 2026',
    health: 'Strong',
    aiSentimentTag: 'High Urgency - Old Copper Lines Sunsetting (Budget Approved)',
    sentimentCategory: 'urgent',
    lastActivity: '1 hour ago',
    contactName: 'Julian Sterling',
    contactRole: 'Chief Information Security Officer',
    assignedAM: 'Jessica Lin'
  },
  {
    id: 'deal-05',
    company: 'Pinnacle Aerospace Technologies',
    stage: 'Ready for Account Manager',
    services: ['Defense-Grade Private Fiber', '24/7 Security Threat Defense'],
    mrr: 12500,
    tcv: 450000,
    probability: 95,
    closeDate: 'Nov 18, 2026',
    health: 'Strong',
    aiSentimentTag: 'Contract Ready - Confidentiality Agreement Signed & Fiber Verified',
    sentimentCategory: 'ready',
    lastActivity: '45 mins ago',
    contactName: 'Col. Sarah Jenkins',
    contactRole: 'Director of Defense Technology',
    assignedAM: 'Jessica Lin'
  }
];

// Stage 4: Inbound Paid Ads Telemetry Feed
export const INITIAL_INBOUND_LEADS: InboundAdLead[] = [
  {
    id: 'ad-01',
    platform: 'Google Search Ads',
    campaignName: 'Dedicated Business Fiber - Executive Search Campaign',
    prospectName: 'David R. Hoffman',
    workEmail: 'dhoffman@atlfintech.io',
    company: 'Atlanta FinTech Solutions',
    subRegion: 'Atlanta Midtown Hub',
    businessNeed: 'Need reliable 1 Gbps private fiber to stop video meeting lag and cloud database timeouts during trading hours.',
    adHeadline: 'AT&T Dedicated Business Fiber | 99.999% Reliability Guarantee',
    timestamp: 'Just now',
    estimatedMrc: '$1,850/mo',
    qualificationStatus: 'Calling...'
  },
  {
    id: 'ad-02',
    platform: 'Meta B2B Sponsored',
    campaignName: 'Retail & Multi-Location Branch Network Campaign',
    prospectName: 'Samantha Morales',
    workEmail: 'smorales@austinbeverage.com',
    company: 'Austin Craft Beverage Co.',
    subRegion: 'Austin Silicon Hills',
    businessNeed: 'Looking for automatic 5G wireless backup across 3 taproom locations so credit card terminals never fail.',
    adHeadline: 'Never Miss a Customer Sale | Dual-Path Fiber + 5G Backup',
    timestamp: '14 mins ago',
    estimatedMrc: '$1,200/mo',
    qualificationStatus: 'Meeting Booked'
  },
  {
    id: 'ad-03',
    platform: 'Google Search Ads',
    campaignName: 'Copper Line Retirement & Replacement Solutions',
    prospectName: 'Robert Vance',
    workEmail: 'rvance@dfwlogistics.net',
    company: 'DFW Freight Depot',
    subRegion: 'Dallas-Fort Worth Commercial',
    businessNeed: 'Received notice that our old phone wires are being retired in 60 days. Need affordable fiber installed immediately.',
    adHeadline: 'Replace Aging Phone Wires | Fast 14-Day Fiber Turn-Up',
    timestamp: '42 mins ago',
    estimatedMrc: '$650/mo',
    qualificationStatus: 'Enriched'
  }
];

export const ISP_COMPETITORS: ISPCompetitor[] = [
  {
    id: 'spectrum',
    name: 'Charter Spectrum Business',
    tech: 'Standard Shared Cable (Coax)',
    maxSpeed: '1000 Mbps Down / 35 Mbps Up',
    marketShare: 38,
    weakness: 'Slow upload speeds (35 Mbps); shared neighborhood lines slow down during peak office hours.',
    atntCounterStrategy: 'Pitch AT&T Dedicated Private Fiber with equal 1,000 Mbps speeds and 4-hour emergency on-site repair guarantee.'
  },
  {
    id: 'comcast',
    name: 'Comcast Business Class Cable',
    tech: 'Shared Cable Broadband',
    maxSpeed: '1.2 Gbps Down / 35-50 Mbps Up',
    marketShare: 31,
    weakness: 'Standard support has 24-48 hour repair delays with no financial uptime guarantee.',
    atntCounterStrategy: 'Pitch AT&T Dedicated Private Fiber with 99.999% uptime guarantee and dedicated Account Manager support.'
  },
  {
    id: 'lumen-copper',
    name: 'Legacy Copper Phone Lines (Lumen / Frontier)',
    tech: 'Aging Copper Telephone Wires',
    maxSpeed: '1.5 Mbps to 25 Mbps',
    marketShare: 14,
    weakness: 'Old telephone copper lines are being permanently shut down by the FCC, triggering 300%+ rate hikes.',
    atntCounterStrategy: 'Immediate migration to AT&T Fast Fiber or 5G Wireless Backup with fast 14-day turn-up.'
  }
];

export const ENTERPRISE_LEADS: EnterpriseLead[] = INITIAL_LEADS;
export const PIPELINE_DEALS: PipelineDeal[] = INITIAL_DEALS;
export const INBOUND_AD_LEADS: InboundAdLead[] = INITIAL_INBOUND_LEADS;

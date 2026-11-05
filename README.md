# ETON — Enterprise Sales Intelligence Platform

A consultative B2B telecom sales intelligence and automated pipeline platform built for Enterprise Account Managers.

---

## Executive Overview

ETON streamlines the end-to-end B2B telecom sales lifecycle across four integrated operational stages:

1. **AT&T Business Plans & Proposal Copilot**: Real-time AT&T enterprise rate card and plan matrix (Dedicated Private Fiber, Business Fast Fiber, Smart Multi-Office Networks, 5G Wireless Backup, Cloud Phone, and Cybersecurity) with an integrated proposal engine citing official service agreements.
2. **Local Business Radar & Competitor Weakness Finder**: Geofenced business intelligence identifying incumbent competitor bottlenecks (slow cable uploads, peak-hour slowdowns, copper line phase-outs) and matching the winning AT&T business plan with estimated win probabilities.
3. **Verified Decision-Makers & Outreach Studio**: 4-step decision-maker verification (IT Directors, Operations Heads, Plant Managers) with real-time email deliverability checks and automated mobile WhatsApp fallback routing.
4. **Sales Pipeline & Phone Operations**: Real-time sales pipeline tracking active deals, incoming web leads from Google & Meta campaigns, and outbound qualification phone calls with automated calendar bookings.

---

## Design System

- **Primary Dark Background**: `#2C3531` (Deep Charcoal Slate)
- **Active Glass & Ambient Glow**: `#116466` (Rich Emerald Teal)
- **Metadata, Reticles & Accents**: `#D9B08C` (Warm Muted Gold)
- **Primary Highlights & Key CTAs**: `#FFCB9A` (Luminous Peach Gold)
- **Typography & Specular Highlights**: `#D1E8E2` (Frosted Ice Mint)

---

## Tech Stack

- **Frontend**: React 18 / TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS with custom Glassmorphism tokens
- **Icons**: Lucide Icons
- **Deployment Targets**: Vercel / Render / Netlify / Cloudflare Pages

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/AvijeetAK/eton-platform.git

# Navigate to project directory
cd eton-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:5173/`.

---

## Production Build

To compile the optimized production bundle:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready to deploy to any modern edge hosting platform.

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment to Vercel

1. Push this repository to GitHub.
2. In your [Vercel Dashboard](https://vercel.com/new), select **"Add New Project"** and import the repository.
3. Vercel automatically detects the Vite configuration (`npm run build` -> `dist`).
4. Click **"Deploy"**. The site will be live with an automatic SSL certificate in under 45 seconds.

---

## License

Proprietary & Confidential — AT&T Enterprise Solutions.

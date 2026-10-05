<div align="center">

# 🌌 Likhith Kumar Mankala — Portfolio

### *AI/ML Engineer & Full-Stack Developer*

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Visit_Portfolio-000000?style=for-the-badge)](https://next-mdx-blog.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-EmptyEch0-181717?style=for-the-badge&logo=github)](https://github.com/EmptyEch0)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-likhithmankala-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/likhithmankala)
[![Email](https://img.shields.io/badge/Email-likhithmanakala%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:likhithmanakala@gmail.com)
[![Resume](https://img.shields.io/badge/Resume-Google_Drive-4285F4?style=for-the-badge&logo=googledrive)](https://drive.google.com/file/d/1C6aulUklRXZL8GlUx2F6Wiy39h_6TPQz/view?usp=sharing)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/MDX-Powered-FCB32C?style=flat-square&logo=mdx" alt="MDX" />
  <img src="https://img.shields.io/badge/Turbopack-Enabled-0070F3?style=flat-square" alt="Turbopack" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animated-0055FF?style=flat-square&logo=framer" alt="Framer Motion" />
</p>

> *"At heart, I'm the curious kid who once took apart toys just to see how they worked. Still learning, still building, and still asking questions."*

---
</div>

## 📖 Overview

A personal digital garden and engineering portfolio built from scratch — not a template, not a clone. Every component, animation, and interaction was hand-crafted to tell the story of an engineer's journey from a small village called Peddamadi to building AI-powered production systems.

This isn't just a portfolio. It's a fully interactive experience with an **in-browser AI assistant**, a **pixel-art Spider-Man companion** that follows your cursor, **cinematic intro sequences**, **Polaroid photo galleries**, and rich long-form MDX storytelling across 30+ pages.

---

## ✨ What Makes This Portfolio Different

| Feature | Description |
|:---|:---|
| 🧠 **AI Portfolio Assistant** | A fully offline semantic search chatbot that answers questions about my background, projects, and skills — no API keys, no LLM costs. Powered by TF-IDF + cosine similarity over a curated knowledge base. |
| 🕷️ **Spider-Man Companion** | A pixel-art Spidey that follows your cursor, shoots webs on click, performs acrobatic swings on double-click, and does entrance stunts on page navigation. 632 lines of pure vanilla JS animation. |
| 🎬 **Cinematic Intro** | A split-curtain signature animation with randomized inspirational quotes shown once per session. Click to skip. |
| 📸 **Polaroid Galleries** | Retro-styled photo grids and zig-zag polaroid layouts with hover tilt effects for life stories and project showcases. |
| ← **Smart Back Navigation** | Context-aware back button that auto-hides on the homepage and uses browser history for seamless navigation. |
| 📡 **Offline Detector** | Full-screen custom offline overlay with a dismiss option — detects network state changes in real time. |
| 💬 **Floating Contact Widget** | Expandable chat drawer with sample questions, action buttons, and click-outside-to-close behavior. |
| 🎯 **Console Easter Egg** | Open DevTools → Console for a hidden greeting message. |
| 📝 **MDX Deep-Dives** | 30+ pages of rich storytelling — not bullet-point lists, but actual narratives about projects, life, and engineering philosophy. |

---

## 🚀 Featured Projects

| Project | What It Does | Tech |
|:---|:---|:---|
| **[iTantra](https://next-mdx-blog.vercel.app/projects/itantra)** | Offline multilingual voice mesh for disaster response. 99.92% bandwidth savings, 10 Indian languages, 86-byte compressed frames. | Whisper, FastSpeech2, Wi-Fi Direct, BLE Mesh |
| **[Maid](https://next-mdx-blog.vercel.app/projects/maid)** | Autonomous personal AI assistant with Obsidian-style linked notes, force-directed knowledge graph, spoken voice briefings & screen-wake. | Flutter, SQLite/drift, Sherpa-ONNX, D3 Canvas |
| **[Serea](https://next-mdx-blog.vercel.app/projects/serea)** | Unified AI document workspace with on-device LLM brain, offline RAG, question paper generator, and study guides. | Flutter, Qwen 3.5, Llama 3.2, nomic-embed |
| **[Echo](https://next-mdx-blog.vercel.app/projects/echo)** | AI communication copilot Chrome extension — generates context-aware replies in <180ms with persona memory. | Chrome MV3, NVIDIA NIM, Offline NLP |
| **[AweFill](https://next-mdx-blog.vercel.app/projects/awefill)** | Zero-LLM smart form autofill extension. Deterministic fuzzy matching, Shadow DOM drawer, 28/28 verified tests. | React 19, TypeScript, Vite, Shadow DOM |
| **[JNTU-GV Portal](https://jntugvcev.edu.in)** | Official university web platform with multi-role CMS, SWR caching, and offline RAG campus assistant. | TanStack, Vite, Drizzle ORM, PostgreSQL |
| **[ClimateChain](https://ijsrem.com/download/climatechain-a-quantum-secured-blockchain-architecture-for-immutable-environmental-monitoring)** | Quantum-secured climate monitoring. 89% drought prediction accuracy. Published in IJSREM. Top 5 Finalist. | Qiskit, Blockchain, AI, Next.js |
| **[SignBridge](/projects)** | Continuous sign language recognition with facial expression integration at 28ms/frame. Elsevier Preprint. | MediaPipe, CNN, BiLSTM-Attention, Llama 3.1 |

---

## 🏗️ Architecture

```
next-mdx-blog/
├── app/
│   ├── layout.tsx              # Root layout with sidebar, nav, dynamic components
│   ├── template.tsx            # Framer Motion page transition wrapper
│   ├── page.mdx                # Homepage
│   ├── globals.css             # Design tokens, code highlighting, typography
│   ├── components/
│   │   ├── BackButton.tsx      # Smart history-aware back navigation
│   │   ├── FloatingContactWidget.tsx  # AI chatbot drawer (semantic search)
│   │   ├── SpidermanCompanion.tsx     # Pixel-art cursor companion (632 LOC)
│   │   ├── SignatureIntro.tsx         # Cinematic split-curtain intro
│   │   ├── NavLinks.tsx               # Active-route-aware sidebar navigation
│   │   ├── OfflineDetector.tsx        # Network state overlay
│   │   ├── ProjectMonitorCarousel.tsx # Project screenshot carousel
│   │   ├── PolaroidGallery.tsx        # Retro photo grid component
│   │   ├── ZigZagPolaroid.tsx         # Alternating layout polaroids
│   │   ├── SkillsPostCredits.tsx      # Cinematic credits animation
│   │   ├── CollegePhotoGallery.tsx    # Landscape/portrait photo layouts
│   │   └── ConsoleGreeting.tsx        # DevTools console easter egg
│   ├── lib/
│   │   ├── semanticSearch.ts   # TF-IDF vectorizer + cosine similarity engine
│   │   └── knowledgeBase.ts    # Keyword-matched Q&A pairs
│   ├── data/
│   │   └── knowledgeBase.json  # 25+ indexed knowledge documents
│   ├── api/contact/route.ts    # Resend email API route
│   ├── life/page.mdx           # "Where Curiosity Began" — childhood story
│   ├── why-ai/page.mdx         # "Why I Chose AI" — career transition
│   ├── beyond-classroom/       # College life & mentors narrative
│   ├── experience/             # Professional timeline
│   ├── skills/                 # Technical skills with cinematic credits
│   ├── projects/               # Project case studies (6 deep-dives)
│   ├── blog/                   # Achievements & journey
│   └── contact/                # Contact form
├── mdx-components.tsx          # Custom MDX component registry
├── next.config.ts              # MDX, security headers, Postgres redirects
├── public/
│   ├── spiderman/              # Sprite sheet & animation assets
│   ├── projects/               # Project screenshots
│   ├── life/                   # Life story photos
│   ├── ai/                     # AI journey photos
│   ├── blog/                   # Achievement polaroids
│   ├── college/                # College photo galleries
│   └── avatar-logo.png         # Chatbot avatar
└── package.json
```

### Key Architectural Decisions

- **Server Components by default** — Layout is a Server Component; interactive widgets are lazy-loaded via `next/dynamic` to keep the initial HTML payload lean.
- **MDX for content** — All pages are `.mdx` files with custom component injection (Polaroids, carousels, photo grids) via `mdx-components.tsx`.
- **Zero-dependency AI** — The chatbot runs entirely in-browser with no external API calls. A TF-IDF vectorizer with bigram boosting and cosine similarity ranks 25+ knowledge documents, with regex intent rules for high-priority queries.
- **Conditional database** — Postgres connection is only established when `POSTGRES_URL` is configured, avoiding crashes in local dev.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|:---|:---|
| **Framework** | Next.js 16, React 19, TypeScript 5, Turbopack |
| **Styling** | Tailwind CSS 4, Framer Motion, Custom CSS |
| **Content** | MDX (GFM mode via Rust compiler) |
| **Typography** | Inter, Newsreader, Cormorant Garamond, Space Grotesk, IBM Plex Mono, Caveat |
| **Search** | Custom TF-IDF + cosine similarity engine (no external dependencies) |
| **Email** | Resend API |
| **Database** | PostgreSQL (Neon) for URL redirects (optional) |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel (auto-deploy from GitHub) |

---

## 💻 Local Development

### Prerequisites

- **Node.js** 18.17+ or 20+
- **pnpm** (recommended), npm, or yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/EmptyEch0/Likhi-Portfollio.git
cd Likhi-Portfollio

# 2. Install dependencies
pnpm install

# 3. Start the dev server (Turbopack)
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Environment Variables (Optional)

Create a `.env.local` file in the project root:

```env
# Contact form email delivery (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# URL redirects from database (Neon PostgreSQL)
POSTGRES_URL=postgresql://user:pass@host/db?sslmode=require
```

> **Note**: The portfolio runs perfectly without any environment variables. The contact form gracefully falls back to a simulated submission, and redirects are skipped when no database is configured.

### Production Build

```bash
pnpm build    # Compiles and generates 33 static pages
pnpm start    # Serves the production build locally
```

---

## 🚢 Deployment

This project is optimized for **Vercel** (one-click deploy from GitHub):

1. Push to GitHub → Import in [vercel.com](https://vercel.com) → Deploy
2. Optionally add `RESEND_API_KEY` in Vercel Environment Variables
3. Every push to `main` auto-deploys

Or deploy from the terminal:

```bash
npx vercel --prod
```

---

## 📊 Performance

- **33 statically prerendered pages** at build time
- **Turbopack** for instant HMR in development
- **Dynamic imports** for all interactive widgets (SpidermanCompanion, FloatingContactWidget, SignatureIntro, OfflineDetector) — zero impact on initial page load
- **Security headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, DNS Prefetch
- **SEO**: JSON-LD structured data, OpenGraph, Twitter Cards, robots.txt, sitemap.xml, canonical URLs

---

## 👨‍💻 About Me

I'm an **AI/ML Engineer and Full-Stack Developer** pursuing B.Tech in Information Technology at **JNTU-GV Vizianagaram**.

- 🔬 **Published Researcher** — First author of *ClimateChain* (IJSREM) and co-author on *SignBridge* (Elsevier Preprint, 94.7% word accuracy)
- 🏆 **University Student SPOC** for Smart India Hackathon (SIH 2K26) at JNTU-GV
- 🚀 **RTIH Future Founders** — Project selected for the Ratan Tata Innovation Hub program
- 🥇 **Top 5 Finalist** at AP Quantum Valley Hackathon
- 👨‍🏫 **Mentored 250+ students** across AI bootcamps at Qubitedge Global Services
- 🎯 **Tech Coordinator** for ITYukta 2K26 — leading a 12-member developer squad

---

## 📬 Get In Touch

| Channel | Link |
|:---|:---|
| **Email** | [likhithmanakala@gmail.com](mailto:likhithmanakala@gmail.com) |
| **Phone** | +91 9392995909 |
| **LinkedIn** | [linkedin.com/in/likhithmankala](https://linkedin.com/in/likhithmankala) |
| **GitHub** | [github.com/EmptyEch0](https://github.com/EmptyEch0) |
| **Resume** | [View on Google Drive](https://drive.google.com/file/d/1C6aulUklRXZL8GlUx2F6Wiy39h_6TPQz/view?usp=sharing) |

---

<div align="center">
  <sub>Crafted with curiosity, code, and a pixel-art Spider-Man 🕷️ by <strong>Mankala Likhith Kumar</strong></sub>
</div>

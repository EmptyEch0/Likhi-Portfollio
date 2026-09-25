import Fuse from 'fuse.js';

export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

export const siteKnowledge: KnowledgeItem[] = [
  {
    id: 'bio',
    category: 'About',
    title: 'Who is Likhith',
    content: "Likhith Kumar Mankala is an AI/ML Engineer and Full-Stack Developer currently studying Information Technology at JNTU-GV Vizianagaram. He builds intelligent on-device AI applications, RAG systems, multi-agent workflows, production web platforms, and browser extensions.",
    keywords: ['who', 'likhith', 'mankala', 'name', 'person', 'about', 'profile', 'bio', 'developer', 'engineer', 'introduce']
  },
  {
    id: 'birthplace',
    category: 'Background',
    title: 'Birthplace & Childhood',
    content: "Likhith was born and raised in Peddamadi, a small village near the Odisha border in Andhra Pradesh. He spent nearly fifteen years studying in Peddamadi before moving to Vizianagaram for college. His father is an RMP doctor and his mother runs a neighborhood shop.",
    keywords: ['born', 'birthplace', 'hometown', 'peddamadi', 'village', 'native', 'grew', 'childhood', 'origin', 'where']
  },
  {
    id: 'family',
    category: 'Background',
    title: 'Family',
    content: "Likhith's father is an RMP doctor serving nearby rural villages, and his mother runs a small neighborhood shop in Peddamadi. He has two supportive elder sisters.",
    keywords: ['family', 'father', 'mother', 'parents', 'dad', 'mom', 'sister', 'sisters', 'doctor', 'shop']
  },
  {
    id: 'education',
    category: 'Education',
    title: 'College & Education',
    content: "Likhith is pursuing his B.Tech in Information Technology at JNTU-GV (Jawaharlal Nehru Technological University), Vizianagaram. He started programming at age 18 with C language.",
    keywords: ['college', 'jntu', 'jntugv', 'vizianagaram', 'btech', 'degree', 'university', 'education', 'study', 'school', 'c']
  },
  {
    id: 'skills',
    category: 'Skills',
    title: 'Technical Skills',
    content: "• Languages: Python, TypeScript, JavaScript, Java, Kotlin, Dart, SQL, C.\n• AI/ML: PyTorch, TensorFlow, LangChain, OpenAI, Gemini, Ollama, Local GGUF LLMs (Qwen, Llama), RAG, Vector DBs (ChromaDB, Pinecone).\n• Web & Mobile: React, Next.js, Flutter, FastAPI, NestJS, Flask, Django, Tailwind CSS.\n• DevOps & DBs: Docker, AWS, PostgreSQL, Supabase, Redis, Drizzle ORM.",
    keywords: ['skills', 'tech stack', 'languages', 'frameworks', 'python', 'typescript', 'react', 'nextjs', 'flutter', 'pytorch', 'fastapi', 'technologies', 'tools', 'dart']
  },
  {
    id: 'itantra',
    category: 'Projects',
    title: 'iTantra — Offline Low-Bandwidth Multilingual Voice Mesh Platform',
    content: "iTantra is an ultra-low-bandwidth, zero-cloud, 100% offline multilingual voice transceiver platform for disaster response and tactical off-grid mesh networks. It compresses raw audio into an 86-byte binary payload (99.92% bandwidth savings), supports 10 Indian Scheduled Languages + English, runs on-device Edge AI (Whisper/FastSpeech2/Sherpa-ONNX), delivers <180ms same-language and <950ms cross-language audio playback, and features Priority 0 Emergency SOS with STREAM_ALARM override and a 3-Stage ACK Matrix (RECEIVED, TTS_STARTED, HEARD) in an 18.8 MB standalone APK.",
    keywords: ['itantra', 'voice mesh', 'disaster response', 'offline voice', 'stt', 'tts', 'whisper', 'sherpa onnx', 'piper', 'fastspeech2', 'ble mesh', 'wifi direct', 'p2p', 'multilingual', '10 indian languages', 'zero cloud', 'edge ai', 'ndrf', 'emergency alarm', 'stream alarm', 'ack matrix']
  },
  {
    id: 'serea',
    category: 'Projects',
    title: 'Serea — AI Document Workspace',
    content: "Serea is a cross-platform mobile and laptop application built with Flutter that unifies iLovePDF + ChatGPT + NotebookLM with an on-device local LLM brain (Qwen 3.5, Llama 3.2, nomic-embed-text). It features multi-doc vector RAG, Question Paper Generator (syllabus to exam paper with PDF/Word export), Study Book Compiler (A4 offline guides), MCQ Quizzes, Neural OCR, and PDF page organizer with 100% offline privacy.",
    keywords: ['serea', 'unipdf', 'flutter', 'pdf', 'chatgpt', 'notebooklm', 'ilovepdf', 'question paper', 'study book', 'ocr', 'on-device llm', 'offline rag']
  },
  {
    id: 'echo',
    category: 'Projects',
    title: 'Echo — AI Communication Copilot',
    content: "Echo is an AI communication copilot Chrome Extension (Manifest V3) that sits inside messaging apps (WhatsApp Web, Instagram DM, Telegram, Discord, X). It suggests 3 instant reply options in <180ms sounding authentically like you, features Ghost Mode tone switching, and uses a hybrid brain (NVIDIA NIM Llama 3.3 + offline Own Mind NLP engine) with 100% private local storage.",
    keywords: ['echo', 'copilot', 'whatsapp', 'instagram', 'chrome extension', 'smart replies', 'persona', 'tone switcher', 'ghost mode', 'nvidia nim']
  },
  {
    id: 'awefill',
    category: 'Projects',
    title: 'AweFill — Zero-LLM Form Autofill Extension',
    content: "AweFill is a privacy-first, zero-LLM Chrome Extension (React 19, TypeScript, Manifest V3) that autofills repetitive job applications and college admission forms in 1 click. Powered by a deterministic 200+ alias matching engine (Levenshtein, Jaro-Winkler) with an isolated Shadow DOM review drawer and 28/28 verified unit tests.",
    keywords: ['awefill', 'autofill', 'form', 'job application', 'zero llm', 'shadow dom', 'chrome extension', 'greenhouse', 'lever', 'workday']
  },
  {
    id: 'maid',
    category: 'Projects',
    title: 'Maid — Personal Assistant & Obsidian-Style Mindmap Planner',
    content: "Maid is an intelligent personal mobile assistant app built with Flutter and SQLite. It features Obsidian-style linked notes (//Topic, [[Topic]]), an interactive force-directed knowledge graph with spring physics, scheduled 9:00 AM Morning Plans and 8:00 PM Evening Reviews with screen-wake support (fullScreenIntent: true) to wake devices when locked/off, natural spoken voice briefings, hands-free 'Hey Maid' wake-up, and the Colombo cognitive scheduling engine.",
    keywords: ['maid', 'colombo', 'flutter', 'obsidian', 'linked notes', 'mindmap', 'knowledge graph', 'spring physics', 'daily briefing', 'voice briefing', 'hey maid', 'wake word', 'planner', 'routine', 'sqlite']
  },
  {
    id: 'jntugv',
    category: 'Projects',
    title: 'JNTU-GV Official College Website & Enterprise CMS',
    content: "Official web platform and multi-tenant Content Management System for JNTU-GV College of Engineering (jntugvcev.edu.in). Built with TanStack, Vite, Drizzle ORM, and PostgreSQL. Features multi-role admin controls, dedicated HOD domain logins, SWR caching for sub-50ms responses, an automated asset compression pipeline, and an offline database-powered RAG AI chatbot for student academic notices.",
    keywords: ['jntugv', 'jntugvcev', 'college website', 'jntu gv', 'cms', 'drizzle', 'tanstack', 'offline rag', 'hod portal', 'caching', 'official website']
  },
  {
    id: 'projects',
    category: 'Projects',
    title: 'Key Projects Overview',
    content: "1. iTantra — Offline low-bandwidth multilingual voice mesh platform for disaster response (99.92% bandwidth savings, 10 Indian languages, Edge AI).\n2. Serea — Cross-platform Flutter AI document workspace with local LLM brain (iLovePDF + ChatGPT + NotebookLM).\n3. Maid — Flutter personal assistant with Obsidian linked notes, force-directed graph, & spoken voice briefings.\n4. JNTU-GV Official Website & CMS — Institutional platform with offline RAG AI bot (jntugvcev.edu.in).\n5. Uni-LMS — AI Learning Management Platform for 250+ students (ulms.qubitedge.in).\n6. Echo — AI communication copilot Chrome extension (NVIDIA NIM + offline NLP engine).\n7. AweFill — Zero-LLM deterministic smart form autofill extension (28/28 verified tests).\n8. SignBridge — Continuous sign language recognition research (94.7% accuracy, Elsevier preprint).\n9. VLMS — Virtual Lab Management System for 10+ technical domains (FastAPI, Docker, WebGL).\n10. ClimateChain — Quantum-secured climate platform (IJSREM published paper, Top 5 Finalist).",
    keywords: ['projects', 'itantra', 'serea', 'maid', 'unipdf', 'signbridge', 'vlms', 'climatechain', 'echo', 'awefill', 'unilms', 'jntugv', 'built', 'work', 'paper', 'research', 'elsevier']
  },
  {
    id: 'achievements',
    category: 'Achievements',
    title: 'Milestones & Leadership',
    content: "• University Student SPOC: Selected by JNTU-GV administration for Smart India Hackathon (SIH 2K26).\n• RTIH Future Founders: Selected for the prestigious Ratan Tata Innovation Hub Future Founders Program.\n• Top 5 Finalist: AP Quantum Valley Internal Hackathon (ClimateChain, 20+ teams).\n• 1st Published Paper: ClimateChain in IJSREM Journal.\n• Elsevier Preprint: SignBridge Continuous Sign Language Recognition.\n• ITYukta 2K26 Tech Coordinator: Led 12-member dev squad across 6+ campus portals.",
    keywords: ['achievements', 'milestones', 'hackathons', 'sih', 'spoc', 'rtih', 'future founders', 'ratan tata', 'quantum valley', 'awards', 'leadership', 'ityukta']
  },
  {
    id: 'certifications',
    category: 'Certifications',
    title: 'Certifications & Continuous Learning',
    content: "• NPTEL Elite+Silver: DBMS & Python Programming (IIT Kharagpur / IIT Madras).\n• Scaler: Machine Learning & Deep Learning.\n• Great Learning: Data Science & AI Foundations.\n• LeetCode: 50-Day and 100-Day Problem Solving Badges.\n• LinkedIn Learning, HP LIFE & edX.",
    keywords: ['certifications', 'nptel', 'scaler', 'great learning', 'leetcode', 'badges', 'courses', 'dbms', 'python']
  },
  {
    id: 'experience',
    category: 'Experience',
    title: 'Work & Internships',
    content: "• Qubitedge Global Services — AI Full-Stack Intern (Paid): Engineered RAG platforms & LangChain agents; mentored 250+ students in AI bootcamps.\n• JNTU-GV — Full-Stack Intern (Paid): Web portal redesign & AI campus assistant.\n• UptoSkills — AI/ML Intern: TensorFlow ML models & Flask REST APIs.\n• Edunet Foundation — AI Intern: 92% e-waste classifier & EV forecasting.\n• NTS Nihon Global — Software Intern: 12+ PostgreSQL APIs for 10,000+ daily users.",
    keywords: ['experience', 'internship', 'intern', 'company', 'work', 'job', 'qubitedge', 'jntugv', 'uptoskills', 'edunet', 'nts nihon', 'youngbot']
  },
  {
    id: 'why-ai',
    category: 'AI Journey',
    title: 'Why AI',
    content: "Likhith transitioned from web development to AI after observing generative tools like v0 and Lovable. He spent a year mastering machine learning fundamentals via Scaler and expanded into LLMs, prompt engineering, vector databases, and agent workflows under Prof. Jaya Suma's mentorship.",
    keywords: ['why ai', 'chose ai', 'v0', 'lovable', 'scaler', 'machine learning', 'journey', 'jaya suma']
  },
  {
    id: 'contact',
    category: 'Contact',
    title: 'Contact & Resume',
    content: "• Email: likhithmanakala@gmail.com\n• Phone: +91 9392995909\n• Resume: Google Drive (https://drive.google.com/file/d/1C6aulUklRXZL8GlUx2F6Wiy39h_6TPQz/view)\n• GitHub: github.com/EmptyEch0\n• LinkedIn: linkedin.com/in/likhithmankala",
    keywords: ['contact', 'email', 'phone', 'reach', 'resume', 'cv', 'github', 'linkedin', 'hire', 'message']
  }
];

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  keys: [
    { name: 'keywords', weight: 0.5 },
    { name: 'title', weight: 0.3 },
    { name: 'content', weight: 0.2 }
  ]
};

const fuse = new Fuse(siteKnowledge, fuseOptions);

// Stop words filter
const stopWords = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'who', 'what', 'where', 'when', 'why', 'how', 'which', 'whom',
  'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'against',
  'name', 'person', 'guy', 'student', 'man', 'he', 'his', 'him', 'me', 'my', 'i', 'you', 'your', 'tell', 'show', 'give', 'does', 'did', 'do'
]);

export function searchSiteContent(query: string): string {
  const qClean = query.toLowerCase().trim();

  if (!qClean) {
    return "Ask me anything about Likhith's background, education, projects, skills, or experience!";
  }

  // 1. Direct Intent Recognition
  if (/\b(who|name|profile|bio|introduce|yourself|he)\b/.test(qClean) && !/\b(born|college|project|work|skills|contact)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'bio')!.content;
  }

  if (/\b(born|birth|hometown|peddamadi|native|village|where.*from|grew)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'birthplace')!.content;
  }

  if (/\b(family|father|mother|parents|dad|mom|sister)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'family')!.content;
  }

  if (/\b(jntugvcev|jntugv website|college website|cms portal|jntu cms)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'jntugv')!.content;
  }

  if (/\b(college|jntu|university|btech|degree|study|education|school)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'education')!.content;
  }

  if (/\b(itantra|voice mesh|disaster response|mesh platform|offline voice|offline stt|offline tts|86-byte|86 byte)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'itantra')!.content;
  }

  if (/\b(serea|unipdf|pdf chat|question paper|study book|flutter|ilovepdf)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'serea')!.content;
  }

  if (/\b(echo|communication copilot|whatsapp|smart replies|ghost mode)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'echo')!.content;
  }

  if (/\b(awefill|autofill|shadow dom|zero llm|form filling)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'awefill')!.content;
  }

  if (/\b(maid|colombo|obsidian|linked notes|mindmap|knowledge graph|voice briefing|hey maid|wake word|daily briefing)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'maid')!.content;
  }

  if (/\b(skills|tech|stack|languages|python|typescript|react|flutter|pytorch|fastapi|frameworks)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'skills')!.content;
  }

  if (/\b(achievements|hackathon|sih|spoc|rtih|future founders|milestones|awards)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'achievements')!.content;
  }

  if (/\b(certifications|nptel|scaler|great learning|leetcode badges)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'certifications')!.content;
  }

  if (/\b(projects|signbridge|vlms|climatechain|built|research|paper)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'projects')!.content;
  }

  if (/\b(experience|internship|intern|work|job|qubitedge|uptoskills|edunet|nts)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'experience')!.content;
  }

  if (/\b(why ai|chose ai|journey|v0|scaler)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'why-ai')!.content;
  }

  if (/\b(contact|email|phone|reach|resume|cv|linkedin|github|hire)\b/.test(qClean)) {
    return siteKnowledge.find(k => k.id === 'contact')!.content;
  }

  // 2. Filter out stop words for search
  const filteredWords = qClean
    .split(/\s+/)
    .filter(w => !stopWords.has(w) && w.length > 1)
    .join(' ');

  const searchTarget = filteredWords.length > 0 ? filteredWords : qClean;

  // 3. Fuse.js Fuzzy Search
  const results = fuse.search(searchTarget);

  if (results.length > 0) {
    return results[0].item.content;
  }

  return "I searched all portfolio pages. Try asking about Likhith's birthplace (Peddamadi), college (JNTU-GV), projects (Serea, Echo, AweFill, SignBridge), achievements (SIH SPOC, RTIH), internships (Qubitedge), or tech stack!";
}

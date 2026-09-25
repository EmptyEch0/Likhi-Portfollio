// Offline knowledge base built from portfolio website content.
// No LLM required — answers are pre-written from actual portfolio data.

export interface QAPair {
  keywords: string[];
  answer: string;
}

export const knowledgeBase: QAPair[] = [
  // === ABOUT / INTRODUCTION ===
  {
    keywords: ['who', 'about', 'introduce', 'yourself', 'tell me', 'likhith', 'you'],
    answer: "I'm Likhith Kumar Mankala, an AI engineer and software developer from Peddamadi, Andhra Pradesh. I'm currently studying Information Technology at JNTU-GV Vizianagaram. I enjoy building intelligent applications, exploring new technologies, and turning ideas into products that solve meaningful problems."
  },
  {
    keywords: ['education', 'college', 'university', 'degree', 'study', 'jntu', 'vizianagaram', 'btech'],
    answer: "I'm pursuing B.Tech in Information Technology at JNTU-GV (Jawaharlal Nehru Technological University), Vizianagaram. My college journey has been transformative — from learning C programming to building AI-powered applications and contributing to research."
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'connect', 'hire', 'message'],
    answer: "You can reach me at:\n• Email: likhithmanakala@gmail.com\n• Phone: +91 9392995909\n• GitHub: github.com/EmptyEch0\n• LinkedIn: linkedin.com/in/likhithmankala\nOr use the Contact page on this portfolio!"
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer: "You can view and download my resume from Google Drive: https://drive.google.com/file/d/1C6aulUklRXZL8GlUx2F6Wiy39h_6TPQz/view — click on my name at the top of the About page to open it directly."
  },

  // === SKILLS ===
  {
    keywords: ['skills', 'technologies', 'tech stack', 'what can you do', 'languages', 'programming'],
    answer: "My tech stack includes:\n• Languages: Python, TypeScript, JavaScript, Java, Kotlin, Dart, SQL, C\n• AI/ML: PyTorch, TensorFlow, LangChain, OpenAI, Gemini, Ollama, RAG, Embeddings\n• Web: React, Next.js, FastAPI, NestJS, Flask, Django, Tailwind CSS\n• Mobile: Flutter, React Native\n• Databases: PostgreSQL, MongoDB, Redis, Supabase, Pinecone, ChromaDB\n• DevOps: Docker, AWS, Nginx, GitHub Actions, Vercel"
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'llm', 'large language'],
    answer: "I work extensively with AI/ML:\n• LLMs & GenAI: OpenAI API, Gemini, Claude, Ollama, prompt engineering, fine-tuning, LoRA/QLoRA\n• AI Agents: LangChain, LangGraph, CrewAI, multi-agent systems\n• RAG: Retrieval-Augmented Generation, vector databases (Pinecone, ChromaDB, FAISS, pgvector)\n• Deep Learning: PyTorch, TensorFlow, CNNs, RNNs, Transformers, attention mechanisms\n• Computer Vision: OpenCV, YOLOv8, MediaPipe, DeepFace, OCR"
  },
  {
    keywords: ['web', 'frontend', 'backend', 'fullstack', 'full-stack', 'react', 'next', 'website'],
    answer: "For web development I use:\n• Frontend: React, Next.js, Tailwind CSS, Shadcn/UI, Framer Motion, Three.js\n• Backend: FastAPI, NestJS, Flask, Django, Express.js\n• Databases: PostgreSQL, MongoDB, Redis, Supabase\n• Tools: SSR, REST APIs, WebSockets, TanStack Query, Drizzle ORM, Prisma"
  },

  // === PROJECTS ===
  {
    keywords: ['project', 'built', 'build', 'work', 'portfolio', 'what have you'],
    answer: "Key projects I've built:\n• iTantra — Offline low-bandwidth multilingual voice mesh platform for disaster response (99.92% bandwidth savings, 10 Indian languages, Edge AI)\n• Maid (Persona Ecosystem) — Autonomous personal AI assistant with Obsidian-style linked notes, force-directed mindmap knowledge graph, spoken voice briefings, and fullScreenIntent screen-wake scheduling\n• Serea (formerly UniPDF) — AI-powered document workspace (RAG, local LLM, multi-doc chat)\n• JNTU-GV Official Website & CMS (jntugvcev.edu.in) — 4-developer lead with offline RAG AI bot\n• Uni-LMS — AI learning management system (web + mobile)\n• Echo — AI communication copilot Chrome extension (NVIDIA NIM + offline NLP)\n• AweFill — Zero-LLM smart form autofill extension\n• SignBridge — Sign language recognition research (94.7% accuracy, Elsevier preprint)\n• VLMS — Virtual Lab Management System for 10+ technical domains\n• ClimateChain — Quantum-secured climate platform (Top 5 finalist, paper ready to publish)\n• Qubitedge Website — Corporate website with custom CMS\n• DSNLU & ITYukta 2K26 — University website platforms"
  },
  {
    keywords: ['maid', 'persona', 'voice assistant', 'mindmap', 'knowledge graph', 'obsidian', 'briefing', 'hey maid'],
    answer: "Maid is an autonomous personal AI assistant and productivity ecosystem featuring an Obsidian-style linked notes engine (//Topic and [[Topic]] inline chips, smart autocomplete, bi-directional backlinks), an interactive force-directed mindmap knowledge graph with spring physics, scheduled 9:00 AM & 8:00 PM voice briefings with fullScreenIntent device screen-wake, continuous 'Hey Maid' wake-word detection, and an interactive voice playback briefing engine."
  },
  {
    keywords: ['itantra', 'voice mesh', 'disaster response', 'mesh platform', 'offline voice', 'stt', 'tts', '86 byte'],
    answer: "iTantra is an ultra-low-bandwidth, zero-cloud, 100% offline multilingual voice transceiver platform designed for off-grid disaster response mesh networks. Instead of streaming heavy raw audio (112KB), it converts speech to an 86-byte binary payload (99.92% bandwidth savings) over Wi-Fi Direct and BLE 5.0 mesh, translating speech across 10 Indian Scheduled Languages and English entirely on-device with <180ms same-language and <950ms cross-language playback, Priority 0 Emergency SOS STREAM_ALARM override, and a 3-Stage ACK Matrix in an 18.8 MB standalone APK."
  },
  {
    keywords: ['serea', 'unipdf', 'document', 'pdf', 'notebook'],
    answer: "Serea (formerly UniPDF) is an AI-powered document workspace I designed combining capabilities of NotebookLM, Claude, ChatGPT, Notion AI, and iLovePDF. It features multi-document RAG, semantic search, conversational editing, OCR, citation generation, AI notes, summarization, translation, and local LLM inference using Llama.cpp with quantized GGUF models achieving <1.8s retrieval latency and 75% reduced API costs."
  },
  {
    keywords: ['signbridge', 'sign language', 'research', 'paper', 'elsevier', 'publication'],
    answer: "SignBridge is my research project on Continuous Sign Language Recognition. It uses MediaPipe Holistic (1,662-dim landmarks) → CNN spatial encoder → BiLSTM-Attention temporal model → CTC decoding, achieving 94.7% word accuracy and 12.3% WER on the ISL-50 dataset. It integrates DeepFace emotion recognition and local Llama 3.1 for emotionally-nuanced sentence generation at 28ms/frame (35 FPS) real-time GPU inference. The paper is an Elsevier preprint."
  },
  {
    keywords: ['vlms', 'virtual lab', 'laboratory'],
    answer: "VLMS (Virtual Lab Management System) provides hands-on learning across 10+ technical domains including AI, ML, Cloud Computing, Cybersecurity, DBMS, Web Dev, Data Science, and Programming. Features include AI-powered tutors, interactive coding notebooks, browser-based simulations, automated labs, progress tracking, and assessment modules — scaling to 1,000+ student learning sessions."
  },
  {
    keywords: ['climate', 'quantum', 'climatechain', 'hackathon'],
    answer: "ClimateChain is a quantum-inspired climate intelligence platform integrating AI, Blockchain, and Quantum Computing for secure environmental data. It predicts drought conditions with 89% accuracy over 10,000+ climate records. The project was a Top 5 Finalist among 20+ teams at the AP Quantum Valley Internal Hackathon."
  },

  // === EXPERIENCE ===
  {
    keywords: ['experience', 'internship', 'work history', 'job', 'intern', 'company', 'companies'],
    answer: "My professional experience includes:\n• AI Full-Stack Engineer — Qubitedge Global Services (May–Jun 2026, Paid)\n• Full-Stack Developer — JNTU-GV University (May–Jun 2026, Paid)\n• AI/ML Intern — UptoSkills (Feb–May 2026)\n• AI & Data Analytics Intern — Edunet Foundation (Jun–Aug 2025)\n• Software Development Intern — NTS Nihon Global (Jul–Aug 2025)\n• Python & Web Developer — YoungBot Academy (Oct–Dec 2024)"
  },
  {
    keywords: ['qubitedge', 'current', 'latest', 'recent'],
    answer: "At Qubitedge Global Services (May–Jun 2026, Paid), I engineered production AI applications — a RAG-powered document intelligence platform, multi-agent workflow automation with LangChain, and an enterprise LLM chatbot. I also led AI bootcamps for 250+ developers covering model deployment, prompt engineering, and full-stack integration."
  },

  // === PERSONAL / INTERESTS ===
  {
    keywords: ['hobby', 'hobbies', 'interest', 'outside', 'free time', 'fun', 'cricket', 'movie', 'nolan'],
    answer: "Outside of engineering, I enjoy exploring AI, reading research papers, watching Christopher Nolan films, playing cricket, mentoring students, and constantly experimenting with new ideas. I'm a huge fan of the Marvel universe and Nolan's storytelling."
  },
  {
    keywords: ['childhood', 'village', 'peddamadi', 'hometown', 'grew up', 'family', 'background'],
    answer: "I was born in Peddamadi, a small village near the Odisha border in Andhra Pradesh. My father is an RMP doctor and my mother runs a neighborhood shop. I grew up as a curious kid who loved taking apart toys to see how they worked. Nearly 15 years of my education happened in the same village before I moved to Vizianagaram for engineering."
  },
  {
    keywords: ['why ai', 'chose ai', 'how did you', 'journey', 'career path'],
    answer: "I chose AI after seeing tools like v0 and Lovable generate websites in minutes. The question 'If AI could build websites this quickly, what would software development look like in five years?' pushed me to understand the technology behind them. I started with Scaler's ML course, progressed to LLMs through Professor Jaya Suma's guidance, and now work across RAG, agents, computer vision, and AI system design."
  },
  {
    keywords: ['mentor', 'professor', 'jaya suma', 'teacher', 'guide'],
    answer: "Professor G. Jaya Suma has been a pivotal mentor in my journey. She encouraged me to explore LLMs, research, and advanced technologies beyond the classroom. Many of my projects, internships, and research opportunities started because she believed in me."
  },
  {
    keywords: ['friend', 'pravallika', 'collaboration'],
    answer: "Pravallika was the friend who changed the direction of my engineering journey. She introduced me to web development and encouraged me to build real projects. Together we built our first Amazon clone in 13 days, which gave me the confidence to keep building. We later explored ML, AI, and modern frameworks together."
  },

  // === CERTIFICATIONS & ACHIEVEMENTS ===
  {
    keywords: ['certification', 'certificate', 'course', 'achievement', 'award'],
    answer: "My certifications and achievements include hackathon participation (AP Quantum Valley Top 5, Smart India Hackathon, Google GenAI, Samsung PRISM), various AI/ML certifications, and recognition across national and internal competitions. Check my Blog/Milestones page for the full list."
  },

  // === AVAILABILITY ===
  {
    keywords: ['available', 'open to', 'hiring', 'freelance', 'opportunity', 'looking for'],
    answer: "I'm currently open to AI/ML engineering roles, full-stack development positions, research collaborations, and freelance projects. Feel free to reach out at likhithmanakala@gmail.com or through the Contact page!"
  },

  // === FALLBACK ===
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings'],
    answer: "Hey! 👋 I'm Likhith's portfolio assistant. I can answer questions about his skills, projects, experience, education, and background. What would you like to know?"
  },
];

export function findBestAnswer(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.length < 2) {
    return "Could you ask a more specific question? I can tell you about Likhith's skills, projects, experience, education, or background.";
  }

  let bestMatch: QAPair | null = null;
  let bestScore = 0;

  for (const pair of knowledgeBase) {
    let score = 0;
    for (const keyword of pair.keywords) {
      if (q.includes(keyword.toLowerCase())) {
        // Longer keyword matches are weighted more heavily
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pair;
    }
  }

  if (bestMatch && bestScore >= 2) {
    return bestMatch.answer;
  }

  return "I'm not sure about that. Try asking about Likhith's skills, projects, experience, education, AI journey, or background — I know a lot about those!";
}

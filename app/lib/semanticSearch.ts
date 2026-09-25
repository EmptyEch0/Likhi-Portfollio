import knowledgeData from '../data/knowledgeBase.json';

export interface KnowledgeDoc {
  id: string;
  category: string;
  title: string;
  summary: string;
  text: string;
  actionUrl: string;
  actionLabel: string;
  keywords: string[];
}

export interface SearchResponse {
  answer: string;
  actionUrl?: string;
  actionLabel?: string;
  matchedTitle?: string;
}

const docs: KnowledgeDoc[] = knowledgeData;

// Term frequency & N-gram vectorizer for instant local semantic embedding
function getVector(text: string): Map<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1);

  const vec = new Map<string, number>();

  for (const w of words) {
    vec.set(w, (vec.get(w) || 0) + 1);
  }

  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]}_${words[i + 1]}`;
    vec.set(bigram, (vec.get(bigram) || 0) + 2);
  }

  return vec;
}

function cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  vecA.forEach((val, key) => {
    normA += val * val;
    if (vecB.has(key)) {
      dotProduct += val * vecB.get(key)!;
    }
  });

  vecB.forEach((val) => {
    normB += val * val;
  });

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const docEmbeddings = docs.map(doc => ({
  doc,
  vector: getVector(`${doc.title} ${doc.summary} ${doc.text} ${doc.keywords.join(' ')}`)
}));

// Varied, intelligent fallback responses
const fallbackOptions: SearchResponse[] = [
  {
    answer: "Whoa, you're quite curious! 😃 Since I'm an offline portfolio assistant trained strictly on Likhith's site data, I don't have an answer for that specific question yet. Feel free to ask about his birthplace, college, projects, internships, or reach out directly!",
    actionUrl: '/contact',
    actionLabel: 'Contact Likhith Directly'
  },
  {
    answer: "Hmm, I couldn't find details about that in Likhith's site pages. Here are topics I know inside out:\n• Peddamadi village childhood & family\n• JNTU-GV college & Amazon clone\n• Serea (Flutter AI Workspace, Local LLMs, Question Paper Generator)\n• Echo (AI Copilot Chrome Extension) & AweFill\n• SIH 2K26 Student SPOC, RTIH Future Founders & Research",
    actionUrl: '/projects',
    actionLabel: 'Explore Key Projects'
  },
  {
    answer: "Good question! That topic isn't documented in his portfolio text. Would you like to drop Likhith a quick note via email or check out his resume?",
    actionUrl: '/contact',
    actionLabel: 'Open Contact & Resume'
  },
  {
    answer: "I'm a lightweight offline RAG agent running locally in your browser. I didn't find a direct match for that query in the site index, but you can ask about his tech stack, AI research, or engineering story!",
    actionUrl: '/skills',
    actionLabel: 'View Technical Skills'
  },
  {
    answer: "I couldn't locate that specific answer in the portfolio records. You can try asking about:\n1. Where was he born?\n2. What projects has he built?\n3. What internships has he done?\n4. What is his tech stack?",
    actionUrl: '/experience',
    actionLabel: 'View Work Experience'
  }
];

let fallbackCounter = 0;

function getRandomFallback(query: string): SearchResponse {
  const index = (query.length + fallbackCounter++) % fallbackOptions.length;
  return fallbackOptions[index];
}

export function performSemanticSearch(query: string): SearchResponse {
  const qClean = query.toLowerCase().trim();

  if (!qClean) {
    return {
      answer: "Ask me anything about Likhith's background, education, projects, skills, or experience!",
      actionUrl: '/',
      actionLabel: 'View About Profile'
    };
  }

  // Direct High-Priority Intent Rules
  if (/\b(who|name|profile|bio|introduce|yourself)\b/.test(qClean) && !/\b(born|college|project|work|skills|contact)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'bio')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(born|birth|hometown|peddamadi|native|village|where.*from|grew)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'birthplace')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(toy|toys|celkon|keypad|phone|3g|internet|touchscreen|mumbai|uncle|games|game)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'early-curiosity')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(college|jntu|university|btech|degree|study|education|school|c language)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'college-jntugv')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(pravallika|amazon|jayasuma|jaya suma|professor|mentor|mohan pradeep|das|saroj|araku|puri|vizag|trips|friends)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'college-people')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(why ai|chose ai|v0|lovable|scaler)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'why-ai')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(itantra|voice mesh|disaster response|mesh platform|offline voice|offline stt|offline tts|86-byte|86 byte|sherpa|piper|fastspeech2)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-itantra')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(serea|unipdf|pdf|document workspace|notebooklm|question paper|study book|flutter)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'persona-serea')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(echo|communication copilot|whatsapp assistant|nvidia nim|smart replies|ghost mode)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'persona-echo')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(awefill|autofill|shadow dom|zero llm extension|forms|greenhouse|lever|workday)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'persona-awefill')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(maid|colombo|obsidian|linked notes|mindmap|knowledge graph|voice briefing|hey maid|wake word|daily briefing)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'persona-maid')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(jntu|jntugv|jntugvcev|college website)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-jntugv') || docs.find(doc => doc.id === 'jntugv-internship')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(unilms|uni-lms|ulms|learning management)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-unilms')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(signbridge|sign language|elsevier|bilstm|mediapipe)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-signbridge')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(vlms|virtual lab)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-vlms')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(climatechain|quantum|qiskit|drought|ijsrem)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'project-climatechain')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(hackathon|smart india|sih|spoc|rtih|future founders|quantum valley|achievements|milestones|awards|ityukta)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'milestones-achievements')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(certifications|certificate|nptel|scaler|great learning|leetcode|badges|courses)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'certifications-learning')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(qubitedge|bootcamp|lms chatbot)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'qubitedge-internship')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(uptoskills|edunet|nts nihon|youngbot|tensorflow|flask|ewaste|ev|postgresql|scrapy|pandas)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'other-internships')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(skills|tech|stack|languages|python|typescript|react|flutter|pytorch|fastapi|tools|dart)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'skills-stack')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  if (/\b(contact|email|phone|reach|resume|cv|linkedin|github|hire|message)\b/.test(qClean)) {
    const d = docs.find(doc => doc.id === 'contact-resume')!;
    return {
      answer: d.text,
      actionUrl: d.actionUrl,
      actionLabel: d.actionLabel,
      matchedTitle: d.title
    };
  }

  // Vector Cosine Similarity Search
  const queryVector = getVector(qClean);
  let bestDoc: KnowledgeDoc | null = null;
  let maxSim = 0;

  for (const { doc, vector } of docEmbeddings) {
    const sim = cosineSimilarity(queryVector, vector);
    if (sim > maxSim) {
      maxSim = sim;
      bestDoc = doc;
    }
  }

  if (bestDoc && maxSim > 0.08) {
    return {
      answer: bestDoc.text,
      actionUrl: bestDoc.actionUrl,
      actionLabel: bestDoc.actionLabel,
      matchedTitle: bestDoc.title
    };
  }

  // Varied Dynamic Fallback Response
  return getRandomFallback(qClean);
}

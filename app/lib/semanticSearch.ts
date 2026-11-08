import knowledgeData from '../data/knowledgeBase.json';
import siteData from '../data/siteIndex.json';

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
  suggestions?: string[];
}

// One heading-section of a page, generated from page.mdx by scripts/build-site-index.mjs
interface Section {
  url: string;
  page: string;
  heading: string;
  text: string;
}

const docs: KnowledgeDoc[] = knowledgeData;

// Filler words that carry no meaning for matching ("what is HIS ...", "tell ME ABOUT ...")
const STOP = new Set(
  'a an the is are was were be been am do does did has have had he his him hes of in on at to for with and or me my i you your tell about can could would please some any give show know more info detail details also this that there any all'.split(' ')
);
// Matched, but too vague to outrank a real topic word
const WEAK = new Set(['who', 'what', 'where', 'name', 'person', 'likhith', 'mankala', 'kumar', 'myself', 'profile']);
// Say nothing about *what* is asked; ignored when matching page text (already normalized/stemmed)
const GENERIC = new Set([
  ...WEAK,
  ...'how why when which whose whom kind type use used using get got make made much many thing like explain work project app application feature build built did doe really exactly attend go went join know want need say think good best'.split(' ')
]);

const MIN_SCORE = 0.3; // any hit
const STRONG_SCORE = 0.5; // a real topic word, not just "who"/"likhith"

function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3); // learning -> learn
  if (w.length > 5 && w.endsWith('ed')) return w.slice(0, -2); // mentored -> mentor
  return w;
}

// "What projects has Likhith built?" -> "what project likhith built"
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/favourite/g, 'favorite')
    .replace(/\bgpa\b/g, 'cgpa')
    .replace(/\bmovies?\b/g, 'film')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(w => w.length > 1 && !STOP.has(w))
    .map(stem)
    .join(' ');
}

const index = docs.map(doc => {
  const keys = [...new Set(doc.keywords.map(normalize).filter(Boolean))];
  const titleWords = new Set(normalize(doc.title).split(' ').filter(w => w.length > 2 && !WEAK.has(w)));
  const words = normalize(`${doc.title} ${doc.summary} ${doc.text}`).split(' ');
  return {
    doc,
    keys,
    titleWords,
    words,
    // every word this doc covers — used to tell if a question asks something beyond it
    known: new Set([...keys.flatMap(k => k.split(' ')), ...words])
  };
});

// Keywords shared by many docs (e.g. "flutter") count less than unique ones (e.g. "serea")
const df = new Map<string, number>();
index.forEach(({ keys }) => keys.forEach(k => df.set(k, (df.get(k) || 0) + 1)));

function score(entry: (typeof index)[number], q: string, qWords: Set<string>): number {
  const padded = ` ${q} `;
  let s = 0;
  for (const k of entry.keys) {
    if (padded.includes(` ${k} `)) {
      s += (WEAK.has(k) ? 0.3 : k.includes(' ') ? 1.5 : 1) / Math.sqrt(df.get(k)!);
    }
  }
  qWords.forEach(w => {
    if (entry.titleWords.has(w)) s += 0.25;
  });
  return s;
}

// Last-resort word overlap against full doc text (stopwords already removed)
function overlap(qWords: Set<string>, words: string[]): number {
  if (!qWords.size) return 0;
  const set = new Set(words);
  let hits = 0;
  qWords.forEach(w => {
    if (set.has(w)) hits++;
  });
  return hits / qWords.size;
}

// ---- Full-site search (BM25 over every page section) ----
const site = (siteData as Section[]).map(s => {
  // page title once, section heading counted double
  const heading = s.heading === s.page ? '' : `${s.heading} ${s.heading}`;
  const terms = normalize(`${s.page} ${heading} ${s.text}`).split(' ');
  const tf = new Map<string, number>();
  terms.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
  return { s, tf, len: terms.length };
});
const avgLen = site.reduce((a, x) => a + x.len, 0) / site.length;
const siteDf = new Map<string, number>();
site.forEach(x => x.tf.forEach((_, t) => siteDf.set(t, (siteDf.get(t) || 0) + 1)));

function bm25(x: (typeof site)[number], terms: string[]) {
  let s = 0;
  let hits = 0;
  for (const t of terms) {
    const f = x.tf.get(t);
    if (!f) continue;
    hits++;
    const n = siteDf.get(t)!;
    const idf = Math.log(1 + (site.length - n + 0.5) / (n + 0.5));
    s += (idf * f * 2.2) / (f + 1.2 * (0.25 + (0.75 * x.len) / avgLen));
  }
  return { s, hits };
}

const shortName = (title: string) => title.split(' — ')[0].trim();
const sentencesOf = (text: string) =>
  text.split(/(?<=[.!?])\s+|\s*[▪•]\s*/).map(t => t.trim()).filter(t => t.length > 2);

// Best section anywhere on the site (or on one page). Must contain most of the question's words,
// so "favourite food" doesn't match a page that only says "favourite".
function searchSite(terms: string[], url?: string): SearchResponse | null {
  if (!terms.length) return null;
  const need = Math.ceil(terms.length * 0.6);
  let best: { x: (typeof site)[number]; s: number } | null = null;
  for (const x of site) {
    if (url && x.s.url !== url) continue;
    const r = bm25(x, terms);
    if (r.hits >= need && (!best || r.s > best.s)) best = { x, s: r.s };
  }
  if (!best) return null;

  // Answer with the 2 most relevant sentences (in reading order), topped up to a readable length
  const sec = best.x.s;
  const qs = new Set(terms);
  const sents = sentencesOf(sec.text);
  const ranked = sents
    .map((t, i) => ({ i, n: normalize(t).split(' ').filter(w => qs.has(w)).length }))
    .filter(r => r.n)
    .sort((a, b) => b.n - a.n)
    .slice(0, 2)
    .map(r => r.i)
    .sort((a, b) => a - b);
  const picked = ranked.length ? ranked : [0];
  let answer = picked.map(i => sents[i]).join(' ');
  for (let i = picked[picked.length - 1] + 1; answer.length < 220 && i < sents.length; i++) answer += ` ${sents[i]}`;
  if (answer.length > 650) answer = `${answer.slice(0, 650).replace(/\s+\S*$/, '')}…`;

  const name = shortName(sec.page);
  return {
    answer: sec.heading !== sec.page ? `${shortName(sec.heading)}:\n${answer}` : answer,
    actionUrl: sec.url,
    actionLabel: name.length > 32 ? 'Read the full page' : `Read more on ${name}`,
    matchedTitle: `${sec.page} › ${sec.heading}`
  };
}

// "What's on this page?" — page intro + its section headings
export function describePage(pathname: string): SearchResponse {
  const secs = site.filter(x => x.s.url === pathname).map(x => x.s);
  if (!secs.length) {
    return { answer: "There isn't much text on this page for me to summarize. Try asking about Likhith's projects, experience, or skills!" };
  }
  const intro = sentencesOf(secs[0].text).slice(0, 2).join(' ');
  const headings = [...new Set(secs.map(x => x.heading).filter(h => h !== secs[0].page))].slice(0, 8);
  return {
    answer: `${intro}${headings.length ? `\n\nThis page covers:\n• ${headings.join('\n• ')}` : ''}`,
    matchedTitle: secs[0].page,
    suggestions: headings.slice(0, 2).map(h => `Tell me about ${shortName(h).replace(/^\d+\.\s*/, '')}`)
  };
}

const byCategory = (cat: string) => docs.filter(d => d.category === cat).map(d => d.id);

// Broad questions ("what projects?", "internships?") get every matching doc in the group
const LISTS = [
  {
    re: /\b(projects?|built|build|created?|portfolio|apps?|applications?|products?)\b/,
    ids: byCategory('Projects'),
    heading: "Here are Likhith's projects:",
    actionUrl: '/projects',
    actionLabel: 'Browse All Projects'
  },
  {
    re: /\b(intern(ship)?s?|experiences?|jobs?|work(ed|ing)?|compan(y|ies)|employ\w*|careers?|organi[sz]ations?)\b/,
    ids: byCategory('Experience'),
    heading: "Likhith's internships & work experience:",
    actionUrl: '/experience',
    actionLabel: 'View Work Experience'
  },
  {
    re: /\b(research|papers?|publications?|published|journals?)\b/,
    ids: ['project-signbridge', 'project-climatechain'],
    heading: "Likhith's research work:",
    actionUrl: '/projects',
    actionLabel: 'View Research Projects'
  }
];

const ask = (doc: KnowledgeDoc) => `Tell me about ${shortName(doc.title).replace(/\s*\(.*\)$/, '')}`;

function docAnswer(doc: KnowledgeDoc, related: KnowledgeDoc[] = []): SearchResponse {
  return {
    answer: doc.text,
    actionUrl: doc.actionUrl,
    actionLabel: doc.actionLabel,
    matchedTitle: doc.title,
    suggestions: related.map(ask)
  };
}

function listText(heading: string, list: KnowledgeDoc[]): string {
  // Short lists show the summary, long lists just the titles to fit the chat bubble
  const lines = list.map(d => `• ${list.length <= 3 ? d.summary : d.title}`);
  return `${heading}\n${lines.join('\n')}`;
}

// Varied, intelligent fallback responses
const fallbackOptions: SearchResponse[] = [
  {
    answer: "Whoa, you're quite curious! 😃 I answer strictly from what's written on Likhith's site, and I couldn't find that anywhere. Feel free to ask about his projects, internships, college, research — or reach out to him directly!",
    actionUrl: '/contact',
    actionLabel: 'Contact Likhith Directly'
  },
  {
    answer: "Hmm, I searched every page of the site and couldn't find that. Here are topics I know inside out:\n• Peddamadi village childhood & family\n• JNTU-GV college & Amazon clone\n• Serea, Echo, AweFill, iTantra & Maid\n• SIH 2K26 Student SPOC, RTIH Future Founders & Research",
    actionUrl: '/projects',
    actionLabel: 'Explore Key Projects'
  },
  {
    answer: "Good question! That topic isn't covered on his portfolio. Would you like to drop Likhith a quick note or check out his resume?",
    actionUrl: '/contact',
    actionLabel: 'Open Contact & Resume'
  },
  {
    answer: "I'm a lightweight search assistant running entirely in your browser over this site's pages. I didn't find a match for that — try asking about his tech stack, AI research, or engineering story!",
    actionUrl: '/skills',
    actionLabel: 'View Technical Skills'
  }
];

let fallbackCounter = 0;

function getRandomFallback(query: string): SearchResponse {
  const index = (query.length + fallbackCounter++) % fallbackOptions.length;
  return fallbackOptions[index];
}

export function performSemanticSearch(query: string, pathname = '/'): SearchResponse {
  const raw = query.toLowerCase().trim();

  if (!raw) {
    return {
      answer: "Ask me anything about Likhith's background, education, projects, skills, or experience!",
      actionUrl: '/',
      actionLabel: 'View About Profile'
    };
  }

  if (/^(hi+|hello|hey+|yo|hola|namaste|good (morning|afternoon|evening))\b[\s!.]*$/.test(raw)) {
    return {
      answer: "Hey there! 👋 Ask me about Likhith's projects, internships, skills, education, achievements, or how to contact him.",
      actionUrl: '/projects',
      actionLabel: 'Browse Key Projects'
    };
  }

  if (/^(thanks|thank you|thx|ty|ok|okay|cool|nice|great)\b/.test(raw) && raw.split(/\s+/).length <= 4) {
    return { answer: "You're welcome! 😊 Anything else you'd like to know about Likhith?" };
  }

  if (/\b(this page|current page|summari[sz]e)\b/.test(raw)) return describePage(pathname);

  const q = normalize(raw);
  const qWords = new Set(q.split(' ').filter(Boolean));
  const terms = [...qWords].filter(w => !GENERIC.has(w));
  const scored = index
    .map(entry => ({ ...entry, score: score(entry, q, qWords) }))
    .sort((a, b) => b.score - a.score);
  const best = scored[0];
  const related = scored
    .slice(1, 3)
    .filter(s => s.score >= MIN_SCORE)
    .map(s => s.doc);

  // Broad / list questions
  const fired = LISTS.filter(l => l.re.test(raw));
  const parts: string[] = [];
  let listAction: (typeof LISTS)[number] | undefined;
  for (const l of fired) {
    const inList = scored.filter(s => l.ids.includes(s.doc.id) && s.score >= MIN_SCORE);
    // "how does Echo work" -> asked about one specific thing outside this group, not a list
    if (!inList.length && best.score >= STRONG_SCORE && !l.ids.includes(best.doc.id)) continue;
    // "tell me about the Serea project" -> just that one
    if (fired.length === 1 && inList.length === 1) return docAnswer(inList[0].doc, related);
    const list = inList.length ? inList.map(s => s.doc) : docs.filter(d => l.ids.includes(d.id));
    parts.push(listText(l.heading, list));
    listAction ??= l;
  }
  if (parts.length) {
    return {
      answer: `${parts.join('\n\n')}\n\nAsk me about any of these for full details!`,
      actionUrl: listAction!.actionUrl,
      actionLabel: listAction!.actionLabel,
      suggestions: fired.length === 1 ? listAction!.ids.slice(0, 2).map(id => ask(docs.find(d => d.id === id)!)) : []
    };
  }

  // Clear topic: curated answer, unless the question asks something that answer doesn't cover
  // ("how many students did he mentor" -> the page section that actually says it)
  const extra = terms.filter(w => !best.known.has(w));
  if (best.score >= STRONG_SCORE) {
    return (extra.length && searchSite(terms)) || docAnswer(best.doc, related);
  }

  // Anything else written anywhere on the site
  const hit = searchSite(terms);
  if (hit) return hit;

  // Weak topic hit, as long as the question has no words we know nothing about ("likhith's favourite food")
  if (best.score >= MIN_SCORE && !extra.length) return docAnswer(best.doc, related);

  // Last resort: word overlap with full doc text
  const byOverlap = scored
    .map(s => ({ doc: s.doc, sim: overlap(qWords, s.words) }))
    .sort((a, b) => b.sim - a.sim)[0];
  if (byOverlap.sim >= 0.5) return docAnswer(byOverlap.doc);

  return getRandomFallback(raw);
}

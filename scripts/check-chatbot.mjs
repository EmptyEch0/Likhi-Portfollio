// Run: node scripts/check-chatbot.mjs   (Node 23.6+ for built-in TS type stripping)
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

// Node needs an import attribute for JSON; Next doesn't. Patch a temp copy.
const lib = resolve('app/lib/semanticSearch.ts');
const src = readFileSync(lib, 'utf8').replace(
  /import (\w+) from '\.\.\/data\/(\w+)\.json';/g,
  (_, name, file) => `import ${name} from '${pathToFileURL(resolve(`app/data/${file}.json`)).href}' with { type: 'json' };`
);
const tmp = join(mkdtempSync(join(tmpdir(), 'chatbot-')), 'semanticSearch.ts');
writeFileSync(tmp, src);
const { performSemanticSearch } = await import(pathToFileURL(tmp).href);

// [question, expected doc title fragment OR list heading fragment, current page?]
const cases = [
  ['Who is Likhith?', 'Who is Likhith'],
  ['Where was he born?', 'Peddamadi'],
  ['where is he from', 'Peddamadi'],
  ['which school did he go to', 'Peddamadi'],
  ['tell me about his family', 'Peddamadi'],
  ['What college did he attend?', 'JNTU-GV Vizianagaram'],
  ['Tell me about Serea', 'Serea'],
  ['Work experience?', 'internships & work experience'],
  ['what are his internships', 'internships & work experience'],
  ['projects', "Likhith's projects"],
  ['What projects has he built?', "Likhith's projects"],
  ['projects and internships', "Likhith's projects"],
  ['projects using flutter', "Likhith's projects"],
  ['tell me about the echo project', 'Echo'],
  ['how does echo work', 'Echo'],
  ['what did he do at qubitedge', 'Qubitedge Global'],
  ['qubitedge internship', 'Qubitedge Global'],
  ['jntu internship', 'Paid Full-Stack Intern'],
  ['jntu website project', 'Official College Website'],
  ['what is his phone number', 'Contact'],
  ['how can I contact him', 'Contact'],
  ['who is pravallika', 'Pravallika'],
  ['who were his hostel roommates', 'Pravallika'],
  ['what are his skills', 'Skills'],
  ['tech stack', 'Skills'],
  ['achievements', 'Hackathons'],
  ['hackathons', 'Hackathons'],
  ['certifications', 'Certifications'],
  ['research papers', 'research work'],
  ['sign language project', 'SignBridge'],
  ['why did he choose ai', 'Web Dev to AI'],
  ['first phone he used', 'Celkon'],
  ['itantra', 'iTantra'],
  ['awefill', 'AweFill'],
  ['hi', 'Hey there'],
  ['what is his favourite food', null], // must fall back, not guess
  ["what is likhith's favourite food", null],
  // answered from page text (siteIndex.json), not the curated knowledge base
  ['what is his gpa', 'Education'],
  ['how many students did he mentor', 'MENTOR'],
  ['what is SWR caching', 'JNTU-GV'],
  ['cli tricks', 'CLI Tricks'],
  ['tell me about The Problem: Why Standard AI Fails in Messaging', 'Why Standard AI Fails'],
  ['is he open to work', 'Open to Roles'],
  ['favourite movie', 'Life Outside'],
  ['summarize this page', 'Echo', '/projects/echo'],
];

let fails = 0;
for (const [q, want, path] of cases) {
  const r = performSemanticSearch(q, path);
  const got = r.matchedTitle ?? r.answer.split('\n')[0];
  const ok = want === null ? !r.matchedTitle && !/projects:|experience:/.test(r.answer) : got.includes(want);
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${q.padEnd(34)} -> ${got.slice(0, 70)}`);
}
assert.equal(fails, 0, `${fails} chatbot answers wrong`);
console.log(`\nAll ${cases.length} passed`);

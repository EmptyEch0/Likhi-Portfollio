// Builds app/data/siteIndex.json from every page.mdx so the chatbot can answer from the real site text.
// Runs automatically before `dev` and `build`. Run manually: node scripts/build-site-index.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const APP = 'app';

const decode = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');

// MDX/JSX -> plain text
const toText = (s) =>
  decode(
    s
      .replace(/<[^>]*>/g, ' ') // tags (keeps inner text)
      .replace(/\{[^{}]*\}/g, ' ') // leftover JSX expressions
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
      .replace(/[*`]/g, '')
  )
    .replace(/\s+/g, ' ')
    .trim();

const H = '\u0000'; // heading marker

const sections = [];
for (const file of readdirSync(APP, { recursive: true }).filter((f) => f.endsWith('page.mdx'))) {
  const raw = readFileSync(join(APP, file), 'utf8');
  const dir = dirname(file).replace(/\\/g, '/');
  const url = dir === '.' ? '/' : `/${dir}`;
  const title = decode(raw.match(/title:\s*'((?:[^'\\]|\\.)*)'/)?.[1] ?? url).replace(/\\'/g, "'");
  const description = decode(raw.match(/description:\s*'((?:[^'\\]|\\.)*)'/)?.[1] ?? '').replace(/\\'/g, "'");
  const page = title.split(' | ')[0].trim();

  const body = raw
    .replace(/^export const metadata[\s\S]*?\n\};?\s*$/m, '') // metadata block
    .replace(/^(import|export) .*$/gm, '')
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ') // MDX comments
    .replace(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g, (_, h) => `\n${H}${toText(h)}${H}\n`)
    .replace(/^#{1,3} (.+)$/gm, (_, h) => `\n${H}${toText(h)}${H}\n`);

  // split -> [intro, heading1, body1, heading2, body2, ...]
  const parts = body.split(new RegExp(`${H}(.*?)${H}`));
  const push = (heading, text) => {
    text = toText(text);
    if (text.length >= 40) sections.push({ url, page, heading, text });
  };
  // The meta description leads the page's first section (alone it's a tiny section that wins every search)
  if (toText(parts[0]).length < 40 && parts.length > 1) parts[2] = `${description} ${parts[0]} ${parts[2] ?? ''}`;
  else push(page, `${description} ${parts[0]}`);
  for (let i = 1; i < parts.length; i += 2) push(parts[i] || page, parts[i + 1] ?? '');
}

sections.sort((a, b) => a.url.localeCompare(b.url));
writeFileSync(join(APP, 'data', 'siteIndex.json'), JSON.stringify(sections, null, 1) + '\n');
console.log(`siteIndex: ${sections.length} sections from ${new Set(sections.map((s) => s.url)).size} pages`);

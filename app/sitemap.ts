import { promises as fs } from 'fs';
import path from 'path';

const SITE_URL = 'https://next-mdx-blog.vercel.app';

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {
  const notesDirectory = path.join(process.cwd(), 'app', 'n');
  let noteRoutes: { url: string; lastModified: string }[] = [];
  
  try {
    const slugs = await getNoteSlugs(notesDirectory);
    noteRoutes = slugs.map((slug) => ({
      url: `${SITE_URL}/n/${slug}`,
      lastModified: new Date().toISOString()
    }));
  } catch (err) {
    console.error('Error reading notes directory for sitemap:', err);
  }

  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/projects/serea',
    '/projects/echo',
    '/projects/awefill',
    '/projects/jntugvcev',
    '/serea',
    '/echo',
    '/awefill',
    '/jntugvcev',
    '/blog',
    '/experience',
    '/skills',
    '/why-ai',
    '/beyond-classroom',
    '/contact',
    '/life'
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString()
  }));

  return [...staticRoutes, ...noteRoutes];
}

import { promises as fs } from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://likhith.online';

async function getNoteSlugs(dir: string) {
  try {
    const entries = await fs.readdir(dir, {
      recursive: true,
      withFileTypes: true
    });
    return entries
      .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
      .map((entry) => {
        const parentDir = entry.parentPath || (entry as unknown as { path?: string }).path || dir;
        const relativePath = path.relative(dir, path.join(parentDir, entry.name));
        return path.dirname(relativePath);
      })
      .map((slug) => slug.replace(/\\/g, '/'))
      .filter((slug) => slug && slug !== '.');
  } catch (err) {
    console.error('Error reading notes directory for sitemap:', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notesDirectory = path.join(process.cwd(), 'app', 'n');
  let noteRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const slugs = await getNoteSlugs(notesDirectory);
    noteRoutes = slugs.map((slug) => ({
      url: `${SITE_URL}/n/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }));
  } catch (err) {
    console.error('Error reading notes directory for sitemap:', err);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/projects', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/projects/jntugvcev', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/projects/itantra', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/projects/serea', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/projects/awefill', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/projects/echo', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/projects/maid', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/experience', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: '/skills', priority: 0.85, changeFrequency: 'monthly' as const },
    { route: '/blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: '/why-ai', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/beyond-classroom', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: '/life', priority: 0.75, changeFrequency: 'monthly' as const }
  ].map((item) => ({
    url: `${SITE_URL}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority
  }));

  return [...staticRoutes, ...noteRoutes];
}

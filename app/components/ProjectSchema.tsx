// JSON-LD for a project page: the project (authored by Likhith, same @id as the Person in layout.tsx)
// plus Home › Projects › <name> breadcrumbs. In a project page.mdx: <ProjectSchema meta={metadata} os="Chrome" />
const SITE = 'https://likhith.online';

interface Props {
  meta: { title: string; description: string; alternates: { canonical: string }; keywords?: string[] };
  type?: 'SoftwareApplication' | 'WebApplication' | 'MobileApplication';
  category?: string;
  os?: string;
  image?: string;
}

export default function ProjectSchema({ meta, type = 'SoftwareApplication', category = 'DeveloperApplication', os, image }: Props) {
  const url = `${SITE}${meta.alternates.canonical}`;
  const name = meta.title.split(' — ')[0];
  const author = { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Likhith Kumar Mankala', url: SITE };
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#project`,
        name,
        alternateName: meta.title,
        description: meta.description,
        url,
        applicationCategory: category,
        ...(os && { operatingSystem: os }),
        ...(image && { image: `${SITE}${image}` }),
        ...(meta.keywords && { keywords: meta.keywords.join(', ') }),
        author,
        creator: author
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects` },
          { '@type': 'ListItem', position: 3, name, item: url }
        ]
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

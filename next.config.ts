import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import postgres from 'postgres';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    const projectRedirects = [
      { source: '/serea', destination: '/projects/serea', permanent: true },
      { source: '/echo', destination: '/projects/echo', permanent: true },
      { source: '/awefill', destination: '/projects/awefill', permanent: true },
      { source: '/jntugvcev', destination: '/projects/jntugvcev', permanent: true },
      { source: '/itantra', destination: '/projects/itantra', permanent: true },
      { source: '/maid', destination: '/projects/maid', permanent: true }
    ];

    if (!process.env.POSTGRES_URL) {
      return projectRedirects;
    }

    try {
      const sql = postgres(process.env.POSTGRES_URL, {
        ssl: 'allow'
      });

      let redirects = await sql`
        SELECT source, destination, permanent
        FROM redirects;
      `;

      return [
        ...projectRedirects,
        ...redirects.map(({ source, destination, permanent }) => ({
          source,
          destination,
          permanent: !!permanent
        }))
      ];
    } catch {
      return projectRedirects;
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  // Note: Using the Rust compiler means we cannot use
  // rehype or remark plugins. If you need them, remove
  // the `experimental.mdxRs` flag.
  experimental: {
    mdxRs: { mdxType: 'gfm' }
  }
 };

const withMDX = createMDX({});

export default withMDX(nextConfig);

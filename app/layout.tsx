import './globals.css';
import type { Metadata } from 'next';
import { Inter, Newsreader, Cormorant_Garamond, Space_Grotesk, IBM_Plex_Mono, Caveat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { NavLinks } from './components/NavLinks';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader'
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-space'
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono'
});
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-caveat'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://likhith.online'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Likhith Kumar Mankala | AI Engineer & Full-Stack Developer | JNTU GV',
    template: '%s | Likhith Kumar Mankala'
  },
  description: 'Official portfolio of Likhith Kumar Mankala (also known as Likhith Mankala / EmptyEch0) — AI Engineer and IT student at JNTU GV Vizianagaram. Specializing in LLMs, Agentic AI, RAG pipelines, FastAPI, Next.js, and Deep Learning.',
  keywords: [
    'Likhith Kumar Mankala',
    'Likhith Kumar',
    'Likhith Mankala',
    'liikhith',
    'liikhith kumar',
    'Likhith',
    'Mankala',
    'Mankala Likhith Kumar',
    'AI Engineer',
    'AI Engineer Portfolio',
    'JNTU GV',
    'JNTUGV',
    'JNTUGV-CEV',
    'JNTU-GV Vizianagaram',
    'JNTU-GV College of Engineering Vizianagaram',
    'Jawaharlal Nehru Technological University Gurajada Vizianagaram',
    'EmptyEch0',
    'LLM Engineer',
    'Agentic AI Developer',
    'RAG Engineer',
    'Full-Stack Developer India',
    'SignBridge Elsevier',
    'Serea AI',
    'Serea Document Workspace',
    'iTantra',
    'AweFill',
    'UniPDF AI'
  ],
  authors: [{ name: 'Likhith Kumar Mankala', url: 'https://github.com/EmptyEch0' }],
  creator: 'Likhith Kumar Mankala',
  publisher: 'Likhith Kumar Mankala',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://likhith.online',
    siteName: 'Likhith Kumar Mankala Portfolio',
    title: 'Likhith Kumar Mankala | AI Engineer & Full-Stack Developer | JNTU GV',
    description: 'AI Engineer & Full-Stack Developer at JNTU GV specializing in LLMs, Agentic AI, RAG pipelines, FastAPI, and Next.js.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Likhith Kumar Mankala - AI Engineer & Full-Stack Developer | JNTU GV'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Likhith Kumar Mankala | AI Engineer & Full-Stack Developer | JNTU GV',
    description: 'AI Engineer & Full-Stack Developer at JNTU GV specializing in LLMs, Agentic AI, RAG pipelines, FastAPI, and Next.js.',
    images: ['/og-image.png']
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'xrvSEZHwDI_dfCj9w_zS8OT2MwTH-lNY9UQyhPR1yWc'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

import dynamic from 'next/dynamic';
import ConsoleGreeting from './components/ConsoleGreeting';

const FloatingContactWidget = dynamic(() => import('./components/FloatingContactWidget'));
const OfflineDetector = dynamic(() => import('./components/OfflineDetector'));
const SignatureIntro = dynamic(() => import('./components/SignatureIntro'));
const SpidermanCompanion = dynamic(() => import('./components/SpidermanCompanion'));
import BackButton from './components/BackButton';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/EmptyEch0',
      icon: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/likhithmankala/',
      icon: (
        <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: 'mailto:likhithmanakala@gmail.com',
      icon: (
        <svg className="w-4 h-4 stroke-current transition-colors fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://likhith.online/#person',
        name: 'Likhith Kumar Mankala',
        givenName: 'Likhith',
        familyName: 'Mankala',
        additionalName: 'Likhith Kumar',
        alternateName: [
          'Likhith Mankala',
          'Likhith Kumar',
          'liikhith',
          'liikhith kumar',
          'Likhith',
          'Mankala',
          'Mankala Likhith Kumar',
          'EmptyEch0',
          'Likhith AI Engineer'
        ],
        url: 'https://likhith.online',
        image: 'https://likhith.online/og-image.png',
        jobTitle: 'AI Engineer & Full-Stack Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Qubitedge Global Services'
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Jawaharlal Nehru Technological University – Gurajada, Vizianagaram (JNTU-GV)',
          alternateName: [
            'JNTU GV',
            'JNTUGV',
            'JNTU-GV CEV',
            'JNTU Vizianagaram',
            'JNTU-GV College of Engineering Vizianagaram'
          ],
          url: 'https://jntugvcev.edu.in'
        },
        sameAs: [
          'https://github.com/EmptyEch0',
          'https://www.linkedin.com/in/likhithmankala/',
          'https://likhith.online'
        ],
        knowsAbout: [
          'Artificial Intelligence',
          'Large Language Models (LLMs)',
          'Agentic AI',
          'Retrieval-Augmented Generation (RAG)',
          'Full-Stack Web Development',
          'Python',
          'TypeScript',
          'FastAPI',
          'Next.js',
          'Computer Vision',
          'Deep Learning',
          'PyTorch',
          'Sign Language Recognition'
        ],
        description: 'Official portfolio of Likhith Kumar Mankala (also known as Likhith Mankala / EmptyEch0) — AI Engineer and IT student at JNTU GV Vizianagaram specializing in LLMs, Agentic AI, RAG, and production web platforms.'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://likhith.online/#website',
        url: 'https://likhith.online',
        name: 'Likhith Kumar Mankala Portfolio',
        alternateName: [
          'Likhith Portfolio',
          'Likhith Mankala AI Engineer',
          'Likhith Online'
        ],
        description: 'AI Engineer & Full-Stack Developer Portfolio - Likhith Kumar Mankala',
        author: {
          '@id': 'https://likhith.online/#person'
        }
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://likhith.online/#profilepage',
        url: 'https://likhith.online',
        name: 'Likhith Kumar Mankala Profile',
        isPartOf: {
          '@id': 'https://likhith.online/#website'
        },
        mainEntity: {
          '@id': 'https://likhith.online/#person'
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} ${caveat.variable} font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased tracking-tight bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-200 min-h-screen">
        <SignatureIntro />
        <ConsoleGreeting />
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row gap-12 items-start py-8 md:py-14">
          {/* Simple Left Sidebar */}
          <aside className="md:w-52 md:shrink-0 flex flex-col justify-between md:sticky md:top-12 md:h-[calc(100vh-6rem)]">
            <div className="space-y-6">
              <div>
                <Link href="/" className="text-lg font-semibold text-gray-900 dark:text-zinc-100 hover:opacity-80 transition-opacity font-sans">
                  Likhith Kumar
                </Link>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 leading-snug font-sans">
                  AI/ML Engineer & Full-Stack Developer
                </p>
              </div>

              <NavLinks />
            </div>

            <div className="pt-6 md:pt-0">
              <div className="flex flex-wrap md:flex-col gap-2.5 text-xs font-sans">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span className="text-zinc-400 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-100 transition-colors">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-[80ch]">
            <BackButton />
            {children}
          </main>
        </div>
        <SpidermanCompanion />
        <FloatingContactWidget />
        <OfflineDetector />
        <Analytics />
      </body>
    </html>
  );
}

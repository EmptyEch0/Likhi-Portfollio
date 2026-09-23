import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

import ProjectMonitorCarousel from './app/components/ProjectMonitorCarousel';
import SkillsPostCredits from './app/components/SkillsPostCredits';
import LifePhotoGrid from './app/components/LifePhotoGrid';
import ContactForm from './app/components/ContactForm';
import PolaroidGallery from './app/components/PolaroidGallery';
import { LandscapePhotoCard, PortraitPhotoRow } from './app/components/CollegePhotoGallery';
import ProjectImageShowcase from './app/components/ProjectImageShowcase';
import BehindTheWorkGrid from './app/components/BehindTheWorkGrid';
import ZigZagPolaroid from './app/components/ZigZagPolaroid';

const components = {
  ProjectMonitorCarousel,
  SkillsPostCredits,
  LifePhotoGrid,
  ContactForm,
  PolaroidGallery,
  LandscapePhotoCard,
  PortraitPhotoRow,
  ProjectImageShowcase,
  BehindTheWorkGrid,
  ZigZagPolaroid,
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="font-medium mt-6 mb-2 text-gray-900 dark:text-zinc-100" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    if (React.isValidElement(children) && (children.type === 'a' || (typeof children.type === 'function' && children.type.name === 'a'))) {
      return children;
    }
    const className =
      props.className || 'text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300 transition-colors';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide on homepage
  if (!pathname || pathname === '/') {
    return null;
  }

  const handleBack = () => {
    if (typeof window !== 'undefined') {
      // If there is browser history and it comes from this site, go back; otherwise go to home
      if (window.history.length > 1 && (document.referrer ? document.referrer.includes(window.location.host) : true)) {
        router.back();
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <div className="mb-4 pt-1">
      <button
        onClick={handleBack}
        type="button"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors py-1 px-2 -ml-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60 group cursor-pointer"
        aria-label="Go back to previous page"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>Back</span>
      </button>
    </div>
  );
}

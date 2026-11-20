'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

// Spider-web drawing: 8 spokes + 3 rings, centred in a 48x48 box
const SPOKES = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
const ring = (r: number) => SPOKES.map((a) => `${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`).join(' ');

/** Drops in on a web strand near the end of long pages; click to zip back up. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [zipping, setZipping] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const check = () => {
      const { scrollY, innerHeight } = window;
      const height = document.documentElement.scrollHeight;
      // only on pages long enough to need it, within the last 400px
      setShow(height > innerHeight * 1.5 && scrollY + innerHeight >= height - 400);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const toTop = () => {
    setZipping(true);
    window.dispatchEvent(new CustomEvent('spidey:say', { detail: 'thwip! going up 🕸️' }));
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence onExitComplete={() => setZipping(false)}>
      {show && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={reduceMotion ? { opacity: 0 } : { y: -160, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1, rotate: [0, 4, -3, 0] }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : zipping
                ? { y: '-100vh', transition: { duration: 0.45, ease: [0.55, 0, 0.75, 0] } } // reeled up the strand
                : { y: -160, opacity: 0, transition: { duration: 0.3 } }
          }
          transition={{
            y: { type: 'spring', stiffness: 260, damping: 13 }, // bouncy drop, like landing on a web
            opacity: { duration: 0.2 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }, // gentle sway
          }}
          style={{ transformOrigin: '50% -64px' }} // sways from the top of the strand
          className="group fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-[9989] w-12 h-12 rounded-full cursor-pointer
            bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 shadow-lg
            text-zinc-800 dark:text-zinc-100 hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
          {/* the strand it hangs from */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-zinc-400 to-transparent dark:from-zinc-500"
          />

          {/* web pattern, spins on hover */}
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="absolute inset-0 w-full h-full opacity-30 transition-transform duration-700 ease-out group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {SPOKES.map((a) => (
              <line key={a} x1="24" y1="24" x2={(24 + 22 * Math.cos(a)).toFixed(2)} y2={(24 + 22 * Math.sin(a)).toFixed(2)} />
            ))}
            {[8, 14, 20].map((r) => (
              <polygon key={r} points={ring(r)} />
            ))}
          </svg>

          {/* arrow: nudges up and turns Spidey red on hover */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="relative mx-auto w-5 h-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-[#e23636]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>

          <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-mono bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            thwip to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

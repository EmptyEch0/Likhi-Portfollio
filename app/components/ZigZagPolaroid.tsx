'use client';

import React, { useState, useRef } from 'react';

interface ZigZagPolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  align?: 'left' | 'right' | 'center' | 'none';
  rotate?: number;
  className?: string;
}

export default function ZigZagPolaroid({
  src,
  alt,
  caption,
  align = 'none',
  rotate = 2.5,
  className = '',
}: ZigZagPolaroidProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [transformStyle, setTransformStyle] = useState<string>(
    `rotate(${rotate}deg) translateY(0px)`
  );
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    const extraTilt = rotate * 0.2;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${extraTilt.toFixed(2)}deg) translateY(-8px) scale(1.05)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.2,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(`rotate(${rotate}deg) translateY(0px) scale(1)`);
    setGlarePosition({ x: 50, y: 50, opacity: 0 });
  };

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const alignmentWrapper = {
    left: 'my-8 sm:my-10 flex justify-start',
    right: 'my-8 sm:my-10 flex justify-end',
    center: 'my-8 sm:my-10 flex justify-center',
    none: 'w-full flex justify-center',
  }[align];

  return (
    <>
      <div className={`${alignmentWrapper} not-prose select-none ${className}`}>
        <div className="w-full max-w-[240px] sm:max-w-[270px]">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View photo: ${caption || alt}`}
            style={{
              transform: transformStyle,
              transition: isHovered
                ? 'transform 0.1s ease-out, box-shadow 0.25s ease-out'
                : 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s ease-out',
            }}
            className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-black/90"
          >
            {/* Polaroid frame */}
            <div className="relative overflow-hidden rounded-sm bg-[#fdfcf9] dark:bg-[#1a1a1c] p-2 pb-3.5 border border-black/10 dark:border-white/10">
              <div className="overflow-hidden rounded-xs bg-black">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-auto object-cover rounded-xs block pointer-events-none"
                  loading="lazy"
                />
              </div>

              {caption && (
                <div className="text-center text-[11px] sm:text-xs font-serif italic text-zinc-700 dark:text-zinc-300 mt-2 px-1 truncate tracking-tight">
                  {caption}
                </div>
              )}

              {/* Dynamic glossy glare */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 mix-blend-overlay"
                style={{
                  background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`,
                  opacity: glarePosition.opacity,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors z-10"
              aria-label="Close image preview"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="overflow-hidden rounded flex justify-center">
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] w-auto object-contain rounded"
              />
            </div>
            {caption && (
              <div className="text-center text-sm font-serif text-zinc-300 mt-3 italic">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

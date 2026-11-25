'use client';

import React, { useState, useEffect } from 'react';

const projects = [
  {
    id: 'serea',
    title: 'Serea — AI Workspace for Documents',
    image: '/projects/PDF.png',
    tech: 'Next.js • Llama.cpp • RAG • GGUF'
  },
  {
    id: 'uni-lms',
    title: 'Uni-LMS — AI Learning Platform',
    image: '/projects/UNI_LMS.png',
    tech: 'Next.js • Capacitor • PostgreSQL'
  },
  {
    id: 'jntu-gv',
    title: 'JNTU-GV University Web Platform',
    image: '/projects/JNTU_GV.png',
    tech: 'Next.js • Drizzle ORM • AI RAG'
  },
  {
    id: 'alp-jntugv',
    title: 'Academic Ledger Portal (ALP) — JNTU-GV',
    image: '/projects/ALP_JNTUGV.jpg',
    tech: 'TanStack Start • React 19 • PostgreSQL • jsPDF'
  },
  {
    id: 'ityukta',
    title: 'ITYukta 2K26 Tech Platform',
    image: '/projects/ITYUKTA.png',
    tech: 'TypeScript • NestJS • Next.js'
  },
  {
    id: 'dsnlu',
    title: 'DSNLU Institutional Platform',
    image: '/projects/DSNLU.png',
    tech: 'Next.js • PostgreSQL • Tailwind'
  }
];

export default function ProjectMonitorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + projects.length) % projects.length;
  };

  const prevIndex = getSlideIndex(-1);
  const nextIndex = getSlideIndex(1);

  return (
    <div 
      className="w-full max-w-5xl -mx-4 sm:-mx-8 md:-mx-16 my-12 font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. OUTER RECTANGLE CONTAINER */}
      <div className="relative w-full rounded-2xl border border-zinc-800/80 bg-[#09090b] p-4 sm:p-8 md:p-12 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        
        {/* SIDE ARROW BUTTON: LEFT (OUTSIDE MONITOR, INSIDE RECTANGLE) */}
        <button 
          onClick={handlePrev}
          aria-label="Previous Project"
          className="absolute left-3 sm:left-6 md:left-8 top-[44%] -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-zinc-950 font-bold text-xl sm:text-2xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-zinc-100 cursor-pointer"
        >
          ‹
        </button>

        {/* SIDE ARROW BUTTON: RIGHT (OUTSIDE MONITOR, INSIDE RECTANGLE) */}
        <button 
          onClick={handleNext}
          aria-label="Next Project"
          className="absolute right-3 sm:right-6 md:right-8 top-[44%] -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-zinc-950 font-bold text-xl sm:text-2xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-zinc-100 cursor-pointer"
        >
          ›
        </button>

        {/* 2. HYPER-REALISTIC APPLE STUDIO DISPLAY MONITOR HARDWARE */}
        <div className="relative w-[94%] sm:w-[88%] md:w-[85%] max-w-4xl flex flex-col items-center">
          
          {/* MONITOR DISPLAY ENCLOSURE (THIN 2PX WHITE ALUM OUTLINE) */}
          <div className="relative w-full rounded-[18px] sm:rounded-[22px] border-2 border-white/90 bg-black p-[2px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* INNER DISPLAY BEZEL */}
            <div className="relative w-full rounded-[16px] sm:rounded-[20px] bg-black p-[3px] sm:p-[5px]">
              
              {/* TOP CENTER CAMERA LENS */}
              <div className="absolute top-[3px] sm:top-[4px] inset-x-0 z-40 flex items-center justify-center pointer-events-none">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#18181b] border border-zinc-700/60 flex items-center justify-center">
                  <div className="w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-[#09090b]" />
                </div>
              </div>

              {/* DISPLAY SCREEN (FULL FIT EDGE-TO-EDGE) */}
              <div className="relative aspect-[16/10] w-full rounded-[12px] sm:rounded-[15px] bg-black overflow-hidden">
                
                {/* 3D COVERFLOW STAGE */}
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* LEFT PREVIEW SLIDE */}
                  <div 
                    onClick={handlePrev}
                    className="absolute left-0 w-[45%] h-[85%] rounded-r-xl overflow-hidden border-r border-y border-zinc-700/80 opacity-30 hover:opacity-60 transition-all duration-500 ease-out cursor-pointer z-10 hidden sm:block"
                    style={{ 
                      transform: 'perspective(1000px) rotateY(25deg) translateX(-15%) scale(0.9)',
                      boxShadow: '-10px 15px 30px rgba(0,0,0,0.9)'
                    }}
                  >
                    <img 
                      src={projects[prevIndex].image} 
                      alt={projects[prevIndex].title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
                  </div>

                  {/* ACTIVE CENTER SLIDE */}
                  <div className="relative w-full h-full z-20 transition-all duration-500 ease-out bg-black group overflow-hidden cursor-pointer">
                    <img 
                      src={projects[currentIndex].image} 
                      alt={projects[currentIndex].title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]" 
                    />
                    
                    {/* HOVER-ONLY CAPTION OVERLAY */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <h4 className="text-white font-bold text-sm sm:text-lg tracking-wide font-sans drop-shadow-md">
                        {projects[currentIndex].title}
                      </h4>
                      <p className="text-zinc-300 text-xs sm:text-sm font-mono mt-1 font-medium">
                        {projects[currentIndex].tech}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT PREVIEW SLIDE */}
                  <div 
                    onClick={handleNext}
                    className="absolute right-0 w-[45%] h-[85%] rounded-l-xl overflow-hidden border-l border-y border-zinc-700/80 opacity-30 hover:opacity-60 transition-all duration-500 ease-out cursor-pointer z-10 hidden sm:block"
                    style={{ 
                      transform: 'perspective(1000px) rotateY(-25deg) translateX(15%) scale(0.9)',
                      boxShadow: '10px 15px 30px rgba(0,0,0,0.9)'
                    }}
                  >
                    <img 
                      src={projects[nextIndex].image} 
                      alt={projects[nextIndex].title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/90 to-transparent" />
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* SLEEK PROPORTIONAL SILVER ALUMINUM STAND NECK */}
          <div className="w-16 sm:w-24 h-7 sm:h-12 bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] shadow-sm border-x border-white/50" />

          {/* SLEEK PROPORTIONAL SILVER ALUMINUM STAND BASE */}
          <div className="w-40 sm:w-56 h-2.5 sm:h-3.5 bg-gradient-to-r from-[#cbd5e1] via-[#f1f5f9] to-[#cbd5e1] rounded-t-xs rounded-b-lg shadow-[0_15px_30px_rgba(0,0,0,0.7)] border-t border-white/90 flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          </div>

        </div>

        {/* DOT INDICATORS AT BOTTOM OF OUTER RECTANGLE */}
        <div className="mt-6 flex items-center justify-center gap-2 z-20">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx 
                  ? 'w-6 sm:w-8 h-2 bg-white shadow-md' 
                  : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

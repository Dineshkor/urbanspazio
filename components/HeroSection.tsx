'use client';

import { useState, useEffect, useCallback } from 'react';
import { BRAND } from '@/lib/constants';
import { ArrowRight, ChevronLeft, ChevronRight, Ruler, Palette, CheckCircle2 } from 'lucide-react';

const HERO_PROJECTS = [
  {
    title: 'The Horizon Residence',
    philosophy: 'Modern Contemporary',
    area: '2,400 sq ft',
    scope: 'Full Home Design',
    status: 'Completed',
    image: '/images/projects/signature-kitchen-1.jpg',
  },
  {
    title: 'Japandi Living Suite',
    philosophy: 'Japandi',
    area: '1,800 sq ft',
    scope: '3BHK Redesign',
    status: 'Completed',
    image: '/images/themes/japandi.jpg',
  },
  {
    title: 'Victorian Heritage Home',
    philosophy: 'Neo Classical',
    area: '3,200 sq ft',
    scope: 'Heritage Restoration',
    status: 'Completed',
    image: '/images/themes/neoclassical.jpg',
  },
  {
    title: 'Biophilic Office Space',
    philosophy: 'Biophilic',
    area: '4,000 sq ft',
    scope: 'Commercial Fit-out',
    status: 'Completed',
    image: '/images/themes/biophilic.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % HERO_PROJECTS.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + HERO_PROJECTS.length) % HERO_PROJECTS.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = HERO_PROJECTS[current];

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[var(--color-linen)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Editorial Text (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Script accent */}
            <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass)] mb-2">
              Signature Interiors
            </span>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bodoni-italic tracking-tight text-[var(--color-charcoal)] mb-4 leading-[1]">
              Defining Spaces,
              <br />
              <span className="text-[var(--color-brass)]">Defining Lifestyles</span>
            </h1>

            {/* Gold divider */}
            <div className="divider-gold" />

            {/* Description */}
            <p className="max-w-md text-sm text-[var(--color-warm-grey)] leading-relaxed mb-8">
              A luxury interior design studio curating serene, intentional spaces in Delhi NCR. Specializing in Japandi, Neo Classical, Modern Contemporary, and Biophilic aesthetics.
            </p>

            {/* CTAs — outlined editorial style */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#consultation" className="btn-filled flex items-center gap-2">
                <span>Book Consultation</span>
                <span className="opacity-70">₹999</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href="#portfolio" className="btn-outline">
                Explore Portfolio
              </a>
            </div>

            {/* Philosophy tags */}
            <div className="flex flex-wrap items-center gap-3 mt-10">
              {['Japandi', 'Neo Classical', 'Contemporary', 'Biophilic'].map((style) => (
                <span
                  key={style}
                  className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] font-medium"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Column: Arch-Framed Project Slider (6 cols) ── */}
          <div className="lg:col-span-6 relative w-full flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[3/4] arch-frame shadow-xl">

              {/* Slides */}
              {HERO_PROJECTS.map((proj, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-600 ease-in-out ${
                    index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
              ))}

              {/* Floating Project Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                <div
                  className="bg-white/95 p-4 sm:p-5 border border-[var(--color-cream)]"
                  key={current}
                  style={{ animation: 'fadeSlideUp 0.5s ease-out' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-brass)] font-semibold mb-0.5">
                        Featured Project
                      </p>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[var(--color-charcoal)] leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href="#portfolio"
                      className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-charcoal)] font-medium border-b border-[var(--color-charcoal)] hover:text-[var(--color-brass)] hover:border-[var(--color-brass)] transition-colors pb-0.5"
                    >
                      View →
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-[var(--color-brass)]" />
                      <span className="text-[10px] text-[var(--color-charcoal)]">{project.philosophy}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-3 h-3 text-[var(--color-brass)]" />
                      <span className="text-[10px] text-[var(--color-charcoal)]">{project.area}</span>
                    </div>
                    <span className="text-[10px] text-[var(--color-warm-grey)]">{project.scope}</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">{project.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-3 z-20 w-9 h-9 bg-white/80 hover:bg-white text-[var(--color-charcoal)] flex items-center justify-center transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-3 z-20 w-9 h-9 bg-white/80 hover:bg-white text-[var(--color-charcoal)] flex items-center justify-center transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Progress Dots */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/30 px-3 py-1.5">
                <span className="text-white text-[10px] font-medium tracking-wider">
                  {String(current + 1).padStart(2, '0')}/{String(HERO_PROJECTS.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1">
                  {HERO_PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`transition-all duration-300 ${
                        i === current ? 'w-5 h-1 bg-[var(--color-brass)]' : 'w-1.5 h-1 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10 z-30">
                <div
                  className="h-full bg-[var(--color-brass)]"
                  style={{ animation: 'progressBar 5s linear infinite' }}
                  key={`progress-${current}`}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}

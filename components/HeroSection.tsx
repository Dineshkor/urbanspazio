'use client';

import { useState, useEffect, useCallback } from 'react';
import { BRAND } from '@/lib/constants';
import { ArrowDown, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Ruler, Palette, ArrowUpRight, CheckCircle2 } from 'lucide-react';

// Hero showcase projects with real specs
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

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const project = HERO_PROJECTS[current];

  return (
    <section
      id="hero"
      className="relative pt-28 pb-14 lg:pt-32 lg:pb-20 bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Asymmetric Split Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ── Left Column: Editorial Brand (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[var(--color-brass)]/30 mb-5 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-brass-dark)]" />
              <span className="font-helvetica text-xs font-semibold text-[var(--color-brass-dark)] uppercase tracking-wider">
                Signature Studio
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bodoni-italic font-bold tracking-tight text-[var(--color-charcoal)] mb-3 leading-[0.98]">
              Urban{' '}
              <span className="text-gradient-brass inline-block font-bodoni-italic italic">
                Spazio
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm font-helvetica uppercase tracking-[0.3em] text-[var(--color-brass-dark)] font-semibold mb-5">
              {BRAND.tagline}
            </p>

            {/* Description */}
            <p className="max-w-md text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-7 font-light">
              A luxury interior design studio curating serene, intentional spaces in Delhi NCR.
            </p>

            {/* Philosophy Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['Japandi', 'Neo Classical', 'Contemporary', 'Biophilic'].map((style) => (
                <span
                  key={style}
                  className="px-3 py-1.5 rounded-full text-[10px] font-helvetica font-medium uppercase tracking-wider text-[var(--color-charcoal)] bg-[#F3EFEA] border border-stone-300/60 shadow-2xs"
                >
                  {style}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#consultation"
                className="px-7 py-3.5 rounded-full text-xs font-helvetica font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-brass)' }}
              >
                <span>Book Consultation</span>
                <span className="text-[10px] font-normal opacity-90">₹999</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
              <a
                href="#portfolio"
                className="px-7 py-3.5 rounded-full text-xs font-helvetica font-semibold uppercase tracking-wider text-[var(--color-charcoal)] border border-stone-300 hover:border-[var(--color-brass)] bg-white hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs"
              >
                Explore Portfolio
              </a>
            </div>
          </div>

          {/* ── Right Column: Project Showcase Slider (6 cols) ── */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-stone-100">
              
              {/* Slides */}
              {HERO_PROJECTS.map((proj, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-600 ease-in-out ${
                    index === current
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816]/85 via-[#1a1816]/25 to-transparent" />
                </div>
              ))}

              {/* ── Floating Project Info Card ── */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10">
                <div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 shadow-xl transition-all duration-500"
                  key={current}
                  style={{ animation: 'fadeSlideUp 0.5s ease-out' }}
                >
                  {/* Project Title Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] font-helvetica uppercase tracking-widest text-[var(--color-brass-dark)] font-semibold mb-1">
                        Featured Project
                      </p>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--color-charcoal)] leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    <a
                      href="#portfolio"
                      className="w-9 h-9 rounded-full bg-[var(--color-brass)] text-white flex items-center justify-center shrink-0 hover:bg-[var(--color-brass-dark)] transition-colors shadow-md"
                      aria-label="View project"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Project Specs */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-[var(--color-brass)]" />
                      <span className="text-[11px] font-helvetica text-[var(--color-charcoal)] font-medium">
                        {project.philosophy}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ruler className="w-3 h-3 text-[var(--color-brass)]" />
                      <span className="text-[11px] font-helvetica text-[var(--color-charcoal)] font-medium">
                        {project.area}
                      </span>
                    </div>
                    <span className="text-stone-300">·</span>
                    <span className="text-[11px] font-helvetica text-[var(--color-warm-grey)]">
                      {project.scope}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-helvetica font-semibold text-emerald-600 uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Navigation Arrows ── */}
              <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20">
                <button
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[var(--color-charcoal)] flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20">
                <button
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[var(--color-charcoal)] flex items-center justify-center shadow-lg transition-all hover:scale-105"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* ── Progress Dots + Counter ── */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full">
                <span className="text-white text-[10px] font-helvetica font-semibold tracking-wider">
                  {String(current + 1).padStart(2, '0')}/{String(HERO_PROJECTS.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1">
                  {HERO_PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`transition-all duration-400 rounded-full ${
                        i === current
                          ? 'w-5 h-1.5 bg-[var(--color-brass)]'
                          : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* ── Auto-progress bar ── */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10 z-30">
                <div
                  className="h-full bg-[var(--color-brass)] rounded-r-full"
                  style={{
                    animation: 'progressBar 5s linear infinite',
                  }}
                  key={`progress-${current}`}
                />
              </div>
            </div>
          </div>

        </div>

        {/* ── Scroll Indicator ── */}
        <div className="mt-10 flex flex-col items-center gap-1.5 text-[var(--color-warm-grey)]">
          <span className="text-[9px] font-helvetica uppercase tracking-[0.35em]">
            Scroll to explore
          </span>
          <a href="#services" aria-label="Scroll to services">
            <ArrowDown className="w-4 h-4 animate-bounce text-[var(--color-brass)]" />
          </a>
        </div>
      </div>

      {/* Keyframe animations */}
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

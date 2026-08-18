'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'The Horizon Residence',
    style: 'Modern Contemporary',
    area: '2,400 sq ft',
    scope: 'Full Home',
    image: '/images/projects/signature-kitchen-1.jpg',
  },
  {
    id: 2,
    title: 'Japandi Living Suite',
    style: 'Japandi Aesthetics',
    area: '1,800 sq ft',
    scope: '3BHK Redesign',
    image: '/images/themes/japandi.jpg',
  },
  {
    id: 3,
    title: 'Victorian Heritage Villa',
    style: 'Neo Classical',
    area: '3,200 sq ft',
    scope: 'Restoration',
    image: '/images/themes/neoclassical.jpg',
  },
  {
    id: 4,
    title: 'Biophilic Studio Haven',
    style: 'Biophilic Living',
    area: '2,100 sq ft',
    scope: 'Interior & Styling',
    image: '/images/themes/biophilic.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const activeProject = FEATURED_PROJECTS[current];

  return (
    <section id="hero" className="relative bg-[var(--color-linen)] pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="editorial-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Typographic Brand & Message (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Brand Title in Upright Luxury Bodoni Moda (All-Caps URBN SPAZIO) */}
            <h1 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--color-charcoal)] uppercase tracking-[0.04em] leading-[1.02] mb-3 font-normal">
              URBN <span className="text-gold-metallic font-normal">SPAZIO</span>
            </h1>

            {/* Cursive Subheading */}
            <p className="font-script text-xl sm:text-3xl text-gold-metallic mb-4">
              defining spaces, defining lifestyles
            </p>

            {/* Thin Hairline Divider */}
            <div className="w-16 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />

            {/* Description */}
            <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-8 font-light tracking-wide">
              A luxury interior architecture studio in Delhi NCR curating serene, intentional residences through organic textures, natural light, and bespoke architectural craftsmanship.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a href="#consultation" className="btn-filled text-[11px] tracking-[0.2em] justify-center">
                <span>Book Consultation</span>
                <span className="opacity-75 font-normal">₹999</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
              <a href="#portfolio" className="btn-outline text-[11px] tracking-[0.2em] justify-center">
                Explore Portfolio
              </a>
            </div>

            {/* Design Languages Strip */}
            <div className="mt-12 pt-6 border-t border-[var(--color-charcoal)]/10 w-full flex flex-wrap items-center gap-x-5 gap-y-2 opacity-75">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-warm-grey)]">
                Aesthetics:
              </span>
              <span className="text-xs font-serif tracking-[0.15em] uppercase text-[var(--color-charcoal)]">
                Japandi · Neo Classical · Contemporary · Biophilic
              </span>
            </div>

          </div>

          {/* ── Right Column: Minimal Arch Gallery Showcase (6 cols) ── */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">

            {/* Arch Frame — pure image, no overlays */}
            <div className="relative w-full max-w-md aspect-[4/5] arch-frame overflow-hidden bg-[var(--color-cream)] shadow-[0_40px_80px_-40px_rgba(28,26,24,0.35)]">

              {/* Slides */}
              {FEATURED_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover ${index === current ? 'animate-kenburns' : ''}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

            </div>

            {/* ── Caption Row — minimal spec, outside the image ── */}
            <div className="mt-9 w-full max-w-md">
              <div className="flex items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.25em] font-semibold text-gold-metallic">
                    Client Work — 0{current + 1} / 0{FEATURED_PROJECTS.length}
                  </p>
                  <h3
                    key={activeProject.title}
                    className="font-bodoni-italic text-lg sm:text-xl text-[var(--color-charcoal)] leading-snug mt-1.5 animate-[fadeUp_0.5s_ease-out]"
                  >
                    {activeProject.title}
                  </h3>
                </div>

                {/* Minimal Prev / Next */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={prev}
                    className="w-9 h-9 grid place-items-center border border-[var(--color-charcoal)]/15 text-[var(--color-charcoal)] transition-colors hover:border-[var(--color-brass)] hover:text-[var(--color-brass-dark)]"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 grid place-items-center border border-[var(--color-charcoal)]/15 text-[var(--color-charcoal)] transition-colors hover:border-[var(--color-brass)] hover:text-[var(--color-brass-dark)]"
                    aria-label="Next project"
                  >
                    <ChevronRight size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Hairline + Meta */}
              <div className="mt-3 h-[1px] w-full bg-[var(--color-charcoal)]/10" />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] font-light">
                  <span>{activeProject.style}</span>
                  <span className="text-[var(--color-brass)]">·</span>
                  <span>{activeProject.area}</span>
                  <span className="text-[var(--color-brass)]">·</span>
                  <span>{activeProject.scope}</span>
                </div>

                {/* Silent Dots */}
                <div className="flex items-center gap-1.5">
                  {FEATURED_PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === current
                          ? 'w-6 bg-[var(--color-brass)]'
                          : 'w-1.5 bg-[var(--color-charcoal)]/20 hover:bg-[var(--color-charcoal)]/40'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

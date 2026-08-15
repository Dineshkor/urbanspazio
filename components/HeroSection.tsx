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
            
            {/* Cursive Top Accent */}
            <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass)] mb-2">
              signature interiors
            </span>

            {/* Brand Title in Bodoni Moda Italic */}
            <h1 className="font-bodoni-italic text-5xl sm:text-7xl lg:text-8xl text-[var(--color-charcoal)] tracking-tight leading-[0.96] mb-3 font-normal">
              Urban <span className="text-[var(--color-brass-dark)] italic">Spazio</span>
            </h1>

            {/* Cursive Subheading */}
            <p className="font-script text-xl sm:text-3xl text-[var(--color-brass)] mb-4">
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

          {/* ── Right Column: Minimalistic Arch-Framed Showcase (6 cols) ── */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Arch-Framed Container (Modeled after Dana Renata & Style Coached by Eve signature layout) */}
            <div className="relative w-full max-w-md aspect-[4/5] arch-frame border border-[var(--color-cream)] shadow-sm overflow-hidden bg-[var(--color-cream)]">
              
              {/* Slides */}
              {FEATURED_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Gradient Overlay for Text Visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                </div>
              ))}

              {/* Minimal Floating Glass Spec Card */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-20">
                <div className="bg-[#FAF7F2]/95 backdrop-blur-xs p-4 border border-[var(--color-cream)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[var(--color-brass-dark)] mb-0.5">
                        Client Work Showcase
                      </p>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[var(--color-charcoal)] leading-snug">
                        {activeProject.title}
                      </h3>
                    </div>
                    <a
                      href="#portfolio"
                      className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[var(--color-brass-dark)] border-b border-[var(--color-brass)] hover:text-[var(--color-charcoal)] transition-colors shrink-0 pt-1"
                    >
                      View →
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--color-warm-grey)] font-light">
                    <span>{activeProject.style}</span>
                    <span>·</span>
                    <span>{activeProject.area}</span>
                    <span>·</span>
                    <span>{activeProject.scope}</span>
                  </div>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/75 hover:bg-white text-[var(--color-charcoal)] transition-colors shadow-xs"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/75 hover:bg-white text-[var(--color-charcoal)] transition-colors shadow-xs"
                aria-label="Next project"
              >
                <ChevronRight size={16} />
              </button>

              {/* Slide Counter & Dots */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
                <span className="text-white text-[9px] font-medium tracking-wider">
                  0{current + 1} / 0{FEATURED_PROJECTS.length}
                </span>
                <div className="flex gap-1">
                  {FEATURED_PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1 transition-all rounded-full ${
                        i === current ? 'w-4 bg-[var(--color-brass)]' : 'w-1.5 bg-white/50 hover:bg-white'
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

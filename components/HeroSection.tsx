'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Static dim only for touch users and reduced-motion preference
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setSpotlight(!reduced && !coarse);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el || !spotlight) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--color-charcoal)]"
    >
      {/* ── Full-bleed photo ── */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-main.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ── Base legibility dim ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/45"
      />

      {/* ── Cursor spotlight — small bright hole follows the mouse ── */}
      {spotlight && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(160px circle at var(--mx, 50%) var(--my, 40%), transparent 0%, rgba(5,4,3,0.62) 100%)',
          }}
        />
      )}

      {/* ── Original hero content, restyled for dark photo ── */}
      <div className="editorial-shell relative z-10 w-full pt-36 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-2xl flex flex-col items-start text-left">

          {/* Brand Title in Upright Luxury Bodoni Moda (All-Caps URBN SPAZIO) */}
          <h1 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--color-paper)] uppercase tracking-[0.04em] leading-[1.02] mb-3 font-normal">
            URBN <span className="text-gold-metallic font-normal">SPAZIO</span>
          </h1>

          {/* Cursive Subheading */}
          <p className="font-script text-lg sm:text-2xl mb-4">
            <span className="text-gold-metallic">defining spaces,</span>{' '}
            <span className="text-[var(--color-paper)]">defining lifestyles</span>
          </p>

          {/* Thin Hairline Divider */}
          <div className="w-16 h-[1px] bg-[var(--color-paper)] opacity-30 my-4" />

          {/* Description */}
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-paper)]/75 leading-relaxed mb-7 font-normal tracking-wide">
            A luxury interior architecture studio in Delhi NCR curating serene, intentional residences through organic textures, natural light, and bespoke architectural craftsmanship.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#consultation"
              className="inline-flex items-center justify-center gap-[0.6rem] px-[2.25rem] py-[0.85rem] bg-[var(--color-brass)] border border-[var(--color-brass)] text-white font-helvetica text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[var(--color-brass-dark)] hover:border-[var(--color-brass-dark)] cursor-pointer"
            >
              <span>Book Consultation</span>
              <span className="opacity-75 font-normal">₹999</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>
            <a href="#portfolio" className="btn-outline-light text-[11px] tracking-[0.2em] justify-center">
              Explore Portfolio
            </a>
          </div>

          {/* Design Languages Strip */}
          <div className="mt-10 pt-6 border-t border-[var(--color-paper)]/15 w-full flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-paper)]/50">
              Aesthetics:
            </span>
            <span className="text-xs font-serif tracking-[0.15em] uppercase text-[var(--color-paper)]/85">
              Japandi · Neo Classical · Contemporary · Biophilic
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

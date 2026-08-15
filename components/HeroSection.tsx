'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative bg-[var(--color-linen)] pt-40 sm:pt-44 lg:pt-52 pb-24 lg:pb-36 overflow-hidden">
      <div className="editorial-shell flex flex-col items-center text-center">
        
        {/* ── Main Brand Title in High-Fashion Bodoni Moda Italic (NO IMAGES) ── */}
        <h1 className="font-bodoni-italic text-6xl sm:text-8xl md:text-9xl text-[var(--color-charcoal)] tracking-tight leading-[0.98] max-w-5xl mb-6 font-normal">
          Urban <span className="text-[var(--color-brass-dark)] italic">Spazio</span>
        </h1>

        {/* ── Cursive Subheading Accent ── */}
        <p className="font-script text-2xl sm:text-3xl text-[var(--color-brass)] mb-6 tracking-wide">
          defining spaces, defining lifestyles
        </p>

        {/* ── Thin Line Separator ── */}
        <div className="w-20 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-6" />

        {/* ── Pure Typographic Editorial Description ── */}
        <p className="max-w-xl text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-12 font-light tracking-wide">
          A luxury interior architecture & studio in Delhi NCR curating serene, intentional residences through natural light, proportion, bespoke craftsmanship, and timeless minimalism.
        </p>

        {/* ── Rectangular Editorial Buttons ── */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#consultation" className="btn-filled text-[11px] tracking-[0.2em]">
            <span>Book Consultation</span>
            <span className="opacity-75 font-normal">₹999</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </a>
          <a href="#services" className="btn-outline text-[11px] tracking-[0.2em]">
            Explore Services
          </a>
        </div>

        {/* ── Design Aesthetics Banner ── */}
        <div className="mt-28 pt-10 border-t border-[var(--color-charcoal)]/10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6 opacity-75">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-warm-grey)]">
            Design Languages
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-serif tracking-[0.2em] uppercase text-[var(--color-charcoal)]">
            <span>Japandi</span>
            <span>·</span>
            <span>Neo Classical</span>
            <span>·</span>
            <span>Contemporary</span>
            <span>·</span>
            <span>Biophilic</span>
          </div>
        </div>

      </div>
    </section>
  );
}

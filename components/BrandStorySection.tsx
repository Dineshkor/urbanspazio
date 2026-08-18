'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section id="story" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left Column: Arched Portrait Photo + Cursive Subcaption (5 cols - Inspired by Dana Renata) ── */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="arch-frame w-full max-w-sm aspect-[4/5] border border-[var(--color-cream)] shadow-xs relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brand-story.jpg"
                alt="Sonali Bachkheti — Founder & Lead Designer"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Cursive Subcaption under portrait */}
            <span className="font-script text-2xl text-gold-metallic mt-4">
              i&apos;m so glad you&apos;re here
            </span>
          </div>

          {/* ── Right Column: Narrative & Signature (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Cursive Accent */}
            <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
              hey there
            </span>

            {/* Serif Heading */}
            <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.08em] font-semibold mb-4">
              We are Urban Spazio.
            </h2>

            {/* Thin Line */}
            <div className="w-16 h-[1px] bg-[var(--color-charcoal)] opacity-20 mb-6" />

            {/* Narrative Body Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light mb-8 max-w-xl">
              <p>
                Urban Spazio was founded with an unwavering passion for high-end interior architecture and a deep understanding of how spaces influence human well-being.
              </p>
              <p>
                We believe that true luxury is not about excess — it is about intention, proportion, natural light, and refined material curation. Whether designing a peaceful Japandi villa or a bold Neo Classical penthouse, we curate experiences tailored to your lifestyle.
              </p>
            </div>

            {/* Stat Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--color-charcoal)]/15 w-full max-w-lg mb-8">
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-gold-metallic font-medium">100+</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] mt-1 font-medium">Projects Completed</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-gold-metallic font-medium">4</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] mt-1 font-medium">Core Aesthetics</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-gold-metallic font-medium">100%</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] mt-1 font-medium">Bespoke Design</p>
              </div>
            </div>

            {/* Action Button & Founder Signature */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-lg gap-6">
              <a href="#consultation" className="btn-outline text-[10px]">
                <span>Work With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex flex-col items-end">
                <span className="font-script text-3xl text-gold-metallic">
                  Sonali Bachkheti
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">
                  Founder & Principal Designer
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

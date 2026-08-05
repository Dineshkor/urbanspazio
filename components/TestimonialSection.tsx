'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '@/lib/site-data';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const review = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-dark)] mb-2">
            kind words
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.12em] font-semibold">
            REVIEWS
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-3" />
        </div>

        {/* ── Editorial Quote Block (Directly inspired by Dana Renata & 7th Street Socials) ── */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Main Large Serif Quote Text (8 cols) */}
          <div className="md:col-span-8 text-left flex flex-col justify-center">
            <span className="font-serif text-6xl text-[var(--color-brass)] leading-none -mb-4 select-none opacity-40">
              “
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-[var(--color-charcoal)] leading-relaxed mb-6 font-normal">
              {review.quote}
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-charcoal)]/15">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-charcoal)]">
                  {review.author}
                </p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] font-light mt-0.5">
                  {review.location} · {review.project}
                </p>
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 text-[var(--color-brass-dark)] ml-auto">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Small Offset Thumbnail Photo (4 cols - 7th Street Socials pattern) */}
          <div className="md:col-span-4 flex flex-col items-center">
            <div className="w-48 sm:w-56 aspect-[3/4] overflow-hidden border border-[var(--color-charcoal)]/20 shadow-sm relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current % 2 === 0 ? '/images/themes/japandi.jpg' : '/images/themes/neoclassical.jpg'}
                alt={review.author}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 border border-[var(--color-charcoal)]/30 hover:border-[var(--color-charcoal)] transition-colors"
                aria-label="Previous Review"
              >
                <ArrowLeft size={14} />
              </button>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-warm-grey)]">
                0{current + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                onClick={next}
                className="p-2 border border-[var(--color-charcoal)]/30 hover:border-[var(--color-charcoal)] transition-colors"
                aria-label="Next Review"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import { TESTIMONIALS } from '@/lib/site-data';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

/* ── Authentic Project Imagery matched to each client's project type ── */
const REVIEW_IMAGES = [
  '/images/projects/signature-kitchen-1.jpg', // DLF Phase 5 (Full Home Design)
  '/images/themes/contemporary.jpg',         // Vasant Vihar (Turnkey Apartment)
  '/images/themes/biophilic.jpg',            // Noida Sector 128 (Biophilic Office)
  '/images/themes/japandi.jpg',              // South Delhi (3BHK Japandi Home)
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const review = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            Kind Words
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">reviews</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-3" />
        </motion.div>

        {/* ── Editorial Monograph Block ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Main Large Serif Quote Text (8 cols) */}
          <div className="md:col-span-8 text-left flex flex-col justify-center relative min-h-[300px]">
            {/* Ambient Background Quotation Mark */}
            <span
              aria-hidden="true"
              className="font-serif text-8xl lg:text-9xl text-[var(--color-brass)] leading-none select-none opacity-20 absolute -top-8 -left-3 pointer-events-none"
            >
              “
            </span>

            <motion.div
              drag={reduce ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -100 || offset.x < -60) next();
                else if (swipe > 100 || offset.x > 60) prev();
              }}
              className="relative z-10 touch-pan-y"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    y: reduce ? 0 : direction > 0 ? 18 : -18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: reduce ? 0 : direction > 0 ? -18 : 18,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl italic text-[var(--color-charcoal)] leading-relaxed mb-8 font-normal">
                    {review.quote}
                  </blockquote>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[var(--color-charcoal)]/15">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-charcoal)]">
                        {review.author}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)] font-light mt-1">
                        {review.location} · {review.project}
                      </p>
                    </div>

                    {/* 5-Star Rating */}
                    <div
                      className="flex gap-1 text-[var(--color-brass-dark)]"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Small Offset Thumbnail Photo & Chapter Stepper (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center">
            {/* Architectural Frame with Crossfade & Lens Unpack */}
            <div className="w-52 sm:w-60 aspect-[3/4] overflow-hidden border border-[var(--color-charcoal)]/20 shadow-md relative bg-[var(--color-cream)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={REVIEW_IMAGES[current % REVIEW_IMAGES.length]}
                  alt={`${review.author}'s interior project`}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Interactive Chapter Stepper */}
            <div className="flex flex-col items-center gap-4 mt-6">
              {/* Clickable Numeric Chapter Strip */}
              <div className="flex items-center gap-3">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className="group/chapter relative py-1 px-1 cursor-pointer focus:outline-none"
                    aria-label={`Go to review ${idx + 1}`}
                  >
                    <span
                      className={`text-[10px] tracking-[0.2em] font-medium transition-colors duration-200 ${
                        current === idx
                          ? 'text-[var(--color-brass-dark)] font-semibold'
                          : 'text-[var(--color-warm-grey)] group-hover/chapter:text-[var(--color-charcoal)]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    {current === idx && (
                      <motion.div
                        layoutId="activeReviewChapter"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--color-brass)]"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="group/arrow p-2.5 border border-[var(--color-charcoal)]/30 hover:border-[var(--color-brass-dark)] hover:text-[var(--color-brass-dark)] transition-all cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ArrowLeft size={13} className="transition-transform group-hover/arrow:-translate-x-0.5" />
                </button>
                <button
                  onClick={next}
                  className="group/arrow p-2.5 border border-[var(--color-charcoal)]/30 hover:border-[var(--color-brass-dark)] hover:text-[var(--color-brass-dark)] transition-all cursor-pointer"
                  aria-label="Next Review"
                >
                  <ArrowRight size={13} className="transition-transform group-hover/arrow:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

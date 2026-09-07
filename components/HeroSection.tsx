'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [canSpotlight, setCanSpotlight] = useState(false);

  // Scroll-linked parallax background drift
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  // Fluid spring physics spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  const spotlightBackground = useMotionTemplate`radial-gradient(190px circle at ${smoothMouseX}px ${smoothMouseY}px, transparent 0%, rgba(5,4,3,0.62) 100%)`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    setCanSpotlight(!reduced && !coarse);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current || !canSpotlight) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!sectionRef.current || !canSpotlight) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.jump(e.clientX - rect.left);
    mouseY.jump(e.clientY - rect.top);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--color-charcoal)]"
    >
      {/* ── Full-bleed photo with initial Ken-Burns de-magnification & scroll parallax ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: reduce ? 0 : bgY }}
          initial={{ scale: reduce ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[120%] -top-[10%] relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-main.jpg"
            alt="Urbn Spazio Luxury Architectural Interior"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>
      </div>

      {/* ── Base legibility dim ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/60 pointer-events-none"
      />

      {/* ── Focal Vignette & Text Scrim (Prevents busy wood paneling from overshadowing the text on mobile & desktop) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent pointer-events-none"
      />

      {/* ── Soft Radial Spotlight behind the brand title on mobile ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_35%,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.2)_65%,transparent_100%)] pointer-events-none sm:hidden"
      />

      {/* ── Fluid Inertia Cursor Spotlight ── */}
      {canSpotlight && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: spotlightBackground,
          }}
        />
      )}

      {/* ── Hero content with timed typographic entrance sequence ── */}
      <div className="editorial-shell relative z-10 w-full pt-36 pb-20 lg:pt-44 lg:pb-32">
        <div className="max-w-2xl flex flex-col items-start text-left">
          {/* Brand Title in Upright Luxury Bodoni Moda */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-bodoni text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--color-paper)] uppercase tracking-[0.04em] leading-[1.02] mb-3 font-normal drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            URBN <span className="text-gold-hero font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">SPAZIO</span>
          </motion.h1>

          {/* Cursive Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-lg sm:text-2xl mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            <span className="text-gold-hero font-medium">defining spaces,</span>{' '}
            <span className="text-[var(--color-paper)]">defining lifestyles</span>
          </motion.p>

          {/* Expanding Hairline Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="w-16 h-[1px] bg-[var(--color-paper)] my-4"
          />

          {/* Studio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-paper)]/75 leading-relaxed mb-7 font-normal tracking-wide"
          >
            A luxury interior architecture studio in Delhi NCR curating serene, intentional residences through organic textures, natural light, and bespoke architectural craftsmanship.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#consultation"
              className="group/btn inline-flex items-center justify-center gap-[0.65rem] px-[2.25rem] py-[0.85rem] bg-[var(--color-brass)] border border-[var(--color-brass)] text-[#1C1A18] font-helvetica text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#D4B36D] hover:border-[#D4B36D] hover:shadow-[0_8px_25px_rgba(197,162,93,0.35)] cursor-pointer"
            >
              <span>Book Consultation</span>
              <span className="text-[#1C1A18]/80 font-medium">₹999</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-[#1C1A18] transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="btn-outline-light text-[11px] tracking-[0.2em] justify-center"
            >
              Explore Portfolio
            </a>
          </motion.div>

          {/* Design Languages Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 pt-6 border-t border-[var(--color-paper)]/15 w-full flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[var(--color-paper)]/50">
              Aesthetics:
            </span>
            <span className="text-xs font-serif tracking-[0.15em] uppercase text-[var(--color-paper)]/85">
              Japandi · Neo Classical · Contemporary · Biophilic
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Editorial Scroll Indicator (Bottom Right) ── */}
      <motion.div
        style={{ opacity: reduce ? 0 : scrollIndicatorOpacity }}
        className="absolute bottom-10 right-8 lg:right-16 hidden sm:flex flex-col items-center gap-3 pointer-events-none z-10 select-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-[var(--color-paper)]/50 [writing-mode:vertical-rl]">
          Scroll to Discover
        </span>
        <motion.div
          animate={{
            y: [0, 6, 0],
            opacity: [0.35, 0.85, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-brass)] to-transparent"
        />
      </motion.div>
    </section>
  );
}

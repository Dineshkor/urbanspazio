'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  ArrowRight,
  Award,
  Compass,
  Gem,
  Heart,
  Home,
  Palette,
  Sparkles,
} from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

/* ── Milestone Data ── */
const MILESTONES = [
  {
    step: '01',
    year: '2018',
    title: 'The Spark',
    description: 'A single vision — luxury interiors shaped around human wellbeing.',
    icon: Sparkles,
    stat: { value: '01', label: 'Vision' },
  },
  {
    step: '02',
    year: '2019',
    title: 'First Projects',
    description: 'Our debut homes across Delhi NCR set the signature.',
    icon: Home,
    stat: { value: '10+', label: 'Homes' },
  },
  {
    step: '03',
    year: '2020',
    title: 'Design Philosophy',
    description: 'Four core aesthetics — Japandi, Neo Classical, Modern Contemporary, Biophilic.',
    icon: Compass,
    stat: { value: '04', label: 'Aesthetics' },
  },
  {
    step: '04',
    year: '2021',
    title: 'Material Mastery',
    description: 'Italian marble, Japanese timber, Indian artisan craft.',
    icon: Palette,
    stat: { value: '50+', label: 'Partners' },
  },
  {
    step: '05',
    year: '2022',
    title: 'Bespoke Furniture',
    description: 'An in-house furniture line — handcrafted to the millimetre.',
    icon: Gem,
    stat: { value: '100%', label: 'Custom' },
  },
  {
    step: '06',
    year: '2023',
    title: 'Recognition',
    description: 'Featured in leading design publications.',
    icon: Award,
    stat: { value: '100+', label: 'Projects' },
  },
  {
    step: '07',
    year: '2024',
    title: 'Your Story Begins',
    description: 'Your home could be our next masterpiece.',
    icon: Heart,
    stat: { value: '∞', label: 'Possibilities' },
  },
];

/* ── Reveal Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Luxury Progress Rail — quiet hairline + brass draw, solid tip dot ── */
function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const dotTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 lg:left-8 w-px">
      {/* Base hairline */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--color-charcoal)]/10" />
      {/* Brass progress draws with scroll */}
      <motion.div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-[var(--color-brass)]"
        style={{ scaleY: progress, originY: 0 }}
      />
      {/* Solid tip dot — no glow pulse */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-brass)] border border-[var(--color-paper)]"
        style={{ top: dotTop }}
      />
    </div>
  );
}

/* ── Editorial Milestone Entry ── */
function MilestoneEntry({
  milestone,
  index,
  isLast,
  active,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  isLast: boolean;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const Icon = milestone.icon;

  return (
    <motion.article
      className={`relative grid gap-6 py-10 sm:py-12 lg:grid-cols-[200px_1fr_190px] lg:gap-12 lg:py-14 lg:items-start border-t border-[var(--color-charcoal)]/10 ${
        isLast ? 'border-b' : ''
      }`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0 } },
      }}
    >
      {/* Diamond marker on the rail — fills brass when ignited */}
      <span
        aria-hidden="true"
        className={`absolute -left-[34px] lg:-left-[54px] top-12 lg:top-16 w-3 h-3 rotate-45 border transition-colors duration-700 ${
          active
            ? 'border-[var(--color-brass)] bg-[var(--color-brass)]'
            : 'border-[var(--color-charcoal)]/20 bg-[var(--color-linen)]'
        }`}
      />

      {/* Left — year as hero */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
        }}
        className="flex lg:flex-col lg:gap-2 items-baseline lg:items-start gap-4"
      >
        <span
          className={`font-bodoni text-5xl sm:text-6xl lg:text-[4.25rem] leading-none font-normal tabular-nums transition-colors duration-700 ${
            active ? 'text-gold-metallic' : 'text-[var(--color-charcoal)]/25'
          }`}
        >
          {milestone.year}
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--color-warm-grey)]">
          {milestone.step} — Chapter
        </span>
      </motion.div>

      {/* Middle — title + narrative */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 18 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: reduce ? 0 : 0.08 },
          },
        }}
        className="max-w-xl"
      >
        <h3 className="font-bodoni text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-[var(--color-charcoal)] font-normal">
          {milestone.title}
        </h3>
        <div
          aria-hidden="true"
          className={`h-px my-4 bg-[var(--color-brass)] transition-all duration-700 ${
            active ? 'w-10 opacity-60' : 'w-6 opacity-30'
          }`}
        />
        <p className="text-sm sm:text-[15px] font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
          {milestone.description}
        </p>
      </motion.div>

      {/* Right — quiet atelier meta */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: reduce ? 0 : 0.16 },
          },
        }}
        className="flex lg:flex-col lg:items-end lg:text-right items-center gap-4 lg:gap-3"
      >
        <div
          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-700 ${
            active
              ? 'border-[var(--color-brass)]/50 bg-[var(--color-brass)]/[0.12]'
              : 'border-[var(--color-brass)]/30 bg-[var(--color-brass)]/[0.07]'
          }`}
        >
          <Icon size={15} strokeWidth={1.25} className="text-[var(--color-brass-dark)]" />
        </div>
        <div className="flex lg:flex-col lg:gap-1 items-baseline gap-2">
          <span className="font-bodoni text-xl leading-none text-[var(--color-charcoal)]/80 tabular-nums">
            {milestone.stat.value}
          </span>
          <span className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-warm-grey)] font-medium">
            {milestone.stat.label}
          </span>
        </div>
        <span
          aria-hidden="true"
          className="hidden lg:block mt-1 font-bodoni-italic text-sm text-[var(--color-charcoal)]/30"
        >
          № {milestone.step}
        </span>
      </motion.div>

      {/* Index for screen readers */}
      <span className="sr-only">
        Chapter {index + 1}: {milestone.year} — {milestone.title}
      </span>
    </motion.article>
  );
}

/* ── Main Section ── */
export default function BrandStorySection() {
  const [consultOpen, setConsultOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const reduce = useReducedMotion();

  /* Scroll-synced progress — shared by rail, dot, and row ignition */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.55'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (reduce) {
      setActiveIndex(MILESTONES.length - 1);
      return;
    }
    const parent = containerRef.current;
    if (!parent || parent.offsetHeight === 0) return;
    let idx = -1;
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      // Ignite once the dot has passed ~55% of the row
      if (v >= (el.offsetTop + el.offsetHeight * 0.55) / parent.offsetHeight) idx = i;
    });
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  return (
    <section
      id="story"
      className="py-24 lg:py-36 text-[var(--color-charcoal)] relative overflow-hidden bg-[var(--color-linen)]"
    >
      <div className="editorial-shell">
        <motion.div
          className="flex flex-col items-center text-center mb-14 lg:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.span
            className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5"
            variants={fadeUp}
          >
            Our Journey — 2018 to 2024
          </motion.span>
          <motion.h2
            className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight flex items-baseline justify-center gap-2 sm:gap-3.5"
            variants={fadeUp}
          >
            <span className="lowercase">the</span>
            <span className="relative inline-flex flex-col items-center">
              <span className="text-gold-metallic font-medium uppercase tracking-normal">
                US
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans font-medium uppercase tracking-[0.25em] text-[var(--color-brass-dark)] -mt-1 sm:-mt-1.5 opacity-90">
                Urbn Spazio
              </span>
            </span>
            <span className="lowercase">story</span>
          </motion.h2>

          <motion.div
            className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4"
            variants={fadeUp}
          />
          <motion.p
            className="max-w-xl text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light"
            variants={fadeUp}
          >
            Urbn Spazio reflects &ldquo;New Age Spaces&rdquo; designed for a modern, fast-paced world. For US, true luxury is not just visual elegance — it is how calm, welcoming, and mentally peaceful your home makes you feel.
          </motion.p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto pl-12 lg:pl-20">
          <ProgressRail progress={smoothProgress} />
          <div className="flex flex-col">
            {MILESTONES.map((milestone, index) => (
              <div
                key={milestone.step}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
              >
                <MilestoneEntry
                  milestone={milestone}
                  index={index}
                  isLast={index === MILESTONES.length - 1}
                  active={reduce ? true : index <= activeIndex}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 pt-10 border-t border-[var(--color-charcoal)]/10 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* ── Founder portrait: arch frame with inner brass keyline ── */}
          <motion.div className="group relative w-60 sm:w-72 mx-auto" variants={fadeUp}>
            <div className="relative z-10 arch-frame overflow-hidden bg-[var(--color-cream)] shadow-[0_40px_80px_-40px_rgba(28,26,24,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founder.jpg"
                alt="Sonali Bachkheti — Founder &amp; Principal Designer"
                className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Inner keyline — single quiet brass line echoing the arch shape */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-2.5 border border-[var(--color-brass)]/50 arch-frame"
              />
            </div>
          </motion.div>

          {/* ── Founder caption — centered, editorial ── */}
          <motion.div className="mt-7 flex flex-col items-center" variants={fadeUp}>
            <span className="font-bodoni-italic text-2xl sm:text-3xl text-[var(--color-charcoal)] leading-none">
              Sonali Bachkheti
            </span>
            <span className="mt-3 h-px w-10 bg-[var(--color-brass)] opacity-70" aria-hidden="true" />
            <span className="mt-2.5 text-[9px] uppercase tracking-[0.32em] text-[var(--color-warm-grey)] font-medium">
              Founder &amp; Principal Designer
            </span>
            <blockquote className="mt-6 max-w-md text-center">
              <p className="font-serif italic text-sm sm:text-base leading-relaxed text-[var(--color-charcoal)]/85">
                &ldquo;A home should not impress your guests — it should quiet your mind the moment you walk in.&rdquo;
              </p>
            </blockquote>
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              type="button"
              onClick={() => setConsultOpen(true)}
              className="btn-filled text-[10px] mt-9 cursor-pointer"
            >
              <span>Begin Your Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
      {consultOpen && <ConsultationModal onClose={() => setConsultOpen(false)} />}
    </section>
  );
}

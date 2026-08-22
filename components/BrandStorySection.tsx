'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
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
    stat: { value: 1, suffix: '', label: 'Vision' },
  },
  {
    step: '02',
    year: '2019',
    title: 'First Projects',
    description: 'Our debut homes across Delhi NCR set the signature.',
    icon: Home,
    stat: { value: 10, suffix: '+', label: 'Homes' },
  },
  {
    step: '03',
    year: '2020',
    title: 'Design Philosophy',
    description: 'Four core aesthetics — Japandi, Neo Classical, Modern Contemporary, Biophilic.',
    icon: Compass,
    stat: { value: 4, suffix: '', label: 'Aesthetics' },
  },
  {
    step: '04',
    year: '2021',
    title: 'Material Mastery',
    description: 'Italian marble, Japanese timber, Indian artisan craft.',
    icon: Palette,
    stat: { value: 50, suffix: '+', label: 'Partners' },
  },
  {
    step: '05',
    year: '2022',
    title: 'Bespoke Furniture',
    description: 'An in-house furniture line — handcrafted to the millimetre.',
    icon: Gem,
    stat: { value: 100, suffix: '%', label: 'Custom' },
  },
  {
    step: '06',
    year: '2023',
    title: 'Recognition',
    description: 'Featured in leading design publications.',
    icon: Award,
    stat: { value: 100, suffix: '+', label: 'Projects' },
  },
  {
    step: '07',
    year: '2024',
    title: 'Your Story Begins',
    description: 'Your home could be our next masterpiece.',
    icon: Heart,
    stat: { value: 0, suffix: '∞', label: 'Possibilities' },
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

/* ── Animated Counter ── */
function useCounter(target: number, start: boolean, duration = 1600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return count;
}

/* ── Timeline Line + Traveling Dot (drafting-ruler styling) ── */
function TimelineLine({ progress }: { progress: MotionValue<number> }) {
  const dotTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="absolute top-0 bottom-0 w-px left-6 lg:left-1/2 -translate-x-1/2">
      {/* Drafting ruler ticks */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[7px] opacity-10 [background:repeating-linear-gradient(to_bottom,var(--color-charcoal)_0_1px,transparent_1px_44px)]"
      />
      {/* Base rail */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--color-charcoal)]/10" />
      {/* Brass progress with soft glow */}
      <motion.div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-brass)] to-[var(--color-brass)] shadow-[0_0_12px_rgba(197,162,93,0.45)]"
        style={{ scaleY: progress, originY: 0 }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-brass)] shadow-[0_0_12px_rgba(197,162,93,0.8)]"
        style={{ top: dotTop }}
      />
    </div>
  );
}

/* ── Center Node (ignites when the scroll dot passes it) ── */
function CenterNode({
  milestone,
  index,
  ignited,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  ignited: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const Icon = milestone.icon;

  return (
    <motion.div
      ref={ref}
      className="relative z-10 flex flex-col items-center"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: index * 0.06 }}
    >
      {/* One-shot ignition pulse when the dot arrives */}
      {ignited && !reduce && (
        <span
          key="ignite"
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[var(--color-brass)] [animation:nodePulse_0.9s_ease-out_1]"
        />
      )}
      <div
        className={`group relative w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
          ignited
            ? 'border-[var(--color-brass)] bg-[var(--color-brass)] shadow-[0_0_24px_rgba(197,162,93,0.45)]'
            : 'border-[var(--color-brass)]/40 bg-transparent'
        }`}
      >
        <span
          className={`font-bodoni text-base font-medium absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-90 ${
            ignited ? 'text-[#081A2E] font-semibold' : 'text-gold-metallic-light'
          }`}
        >
          {milestone.step}
        </span>
        <Icon
          size={18}
          strokeWidth={1.5}
          className={`absolute opacity-0 scale-75 -rotate-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 ${
            ignited ? 'text-[#081A2E]' : 'text-gold-metallic-light'
          }`}
        />
      </div>
      <div className="hidden lg:block mt-2 px-2.5 py-0.5 bg-[var(--color-brass)]/10 border border-[var(--color-brass)]/20">
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-gold-metallic">
          {milestone.year}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Milestone Card ── */
function MilestoneCard({
  milestone,
  index,
  align,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  align: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const Icon = milestone.icon;
  const count = useCounter(milestone.stat.value, inView);
  const isRight = align === 'right';

  /* Ghost numeral drifts slower than the card — subtle parallax depth */
  const { scrollYProgress: cardProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(cardProgress, [0, 1], reduce ? [0, 0] : [28, -28]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Choreography — each element enters in sequence, not as one block */
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: index * 0.04 } },
  };
  const riseItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const dividerVariants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 },
    },
  };
  const statVariants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-sm text-left ${isRight ? 'lg:text-right lg:ml-auto' : ''}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {/* Ghost step numeral — quiet editorial watermark with parallax drift */}
      <motion.span
        aria-hidden="true"
        style={{ y: ghostY }}
        className={`pointer-events-none select-none absolute -top-7 font-bodoni text-8xl leading-none text-[var(--color-charcoal)]/[0.05] ${
          isRight ? 'lg:-right-3 -left-2 lg:left-auto' : '-left-2'
        }`}
      >
        {milestone.step}
      </motion.span>

      <motion.div
        className={`flex items-center gap-2.5 mb-3 ${isRight ? 'lg:justify-end' : 'justify-start'}`}
        variants={riseItem}
      >
        <div className="w-8 h-8 rounded-full bg-[var(--color-brass)]/10 border border-[var(--color-brass)]/20 flex items-center justify-center">
          <Icon size={14} strokeWidth={1.5} className="text-gold-metallic" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[var(--color-warm-grey)] lg:hidden">
          {milestone.year}
        </span>
      </motion.div>

      <motion.h3
        className="font-serif text-lg sm:text-xl uppercase tracking-[0.08em] text-[var(--color-charcoal)] font-semibold mb-1.5"
        variants={riseItem}
      >
        {milestone.title}
      </motion.h3>

      {/* Brass rule draws itself from the text edge */}
      <motion.div
        className={`h-px w-10 mb-2.5 opacity-50 bg-gradient-to-r origin-left ${
          isRight ? 'lg:origin-right lg:from-transparent lg:to-[var(--color-brass)]' : 'from-[var(--color-brass)] to-transparent'
        }`}
        variants={dividerVariants}
      />

      <motion.p
        className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-normal mb-3.5"
        variants={riseItem}
      >
        {milestone.description}
      </motion.p>

      <motion.div
        className={`inline-flex items-center gap-2.5 px-3.5 py-2 border border-[var(--color-brass)]/20 bg-[var(--color-paper)] transition-colors duration-300 hover:border-[var(--color-brass)]/50 hover:shadow-[0_4px_18px_rgba(197,162,93,0.12)] origin-left ${
          isRight ? 'lg:origin-right lg:flex-row-reverse' : ''
        }`}
        variants={statVariants}
      >
        <span className="font-bodoni text-xl text-gold-metallic font-medium leading-none tabular-nums">
          {milestone.stat.value === 0 ? '' : count}
          {milestone.stat.suffix}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">
          {milestone.stat.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Milestone Row ── */
function MilestoneRow({
  milestone,
  index,
  ignited,
  rowRef,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  ignited: boolean;
  rowRef: (el: HTMLDivElement | null) => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-[auto_1fr] lg:grid-cols-[1fr_auto_1fr] gap-x-5 sm:gap-x-7 lg:gap-12 items-center py-7 lg:py-9"
    >
      {/* Card — col 2 on mobile, alternates sides of the center line on desktop */}
      <div
        className={`row-start-1 flex min-w-0 justify-start lg:justify-end col-start-2 ${
          isEven ? 'lg:col-start-1 lg:justify-end' : 'lg:col-start-3 lg:justify-start'
        }`}
      >
        <MilestoneCard milestone={milestone} index={index} align={isEven ? 'right' : 'left'} />
      </div>

      {/* Center node — col 1 on mobile (left rail), center column on desktop */}
      <div className="row-start-1 flex justify-center col-start-1 lg:col-start-2">
        <CenterNode milestone={milestone} index={index} ignited={ignited} />
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [consultOpen, setConsultOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  /* Scroll-synced progress — shared by line, dot, and node ignition */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.65', 'end 0.5'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    const parent = containerRef.current;
    if (!parent) return;
    let idx = -1;
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      // Ignite once the dot has passed ~55% of the row
      if (v >= (el.offsetTop + el.offsetHeight * 0.55) / parent.offsetHeight) idx = i;
    });
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
  });

  const displayYear = MILESTONES[Math.max(activeIndex, 0)].year;

  return (
    <motion.section
      id="story"
      className="py-24 lg:py-36 text-[var(--color-charcoal)] relative overflow-hidden"
      initial={{ backgroundColor: '#C9BCA8' }}
      whileInView={{ backgroundColor: '#F6F2EC' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
    >
      <div className="editorial-shell">
        <motion.div
          className="flex flex-col items-center text-center mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
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

        <div ref={containerRef} className="relative">
          {/* Sticky giant year watermark — the era you're scrolling through */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
            <div className="sticky top-[32vh] flex justify-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={displayYear}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -36 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-bodoni text-[10rem] xl:text-[13rem] leading-none text-[var(--color-charcoal)]/[0.05] select-none"
                >
                  {displayYear}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <TimelineLine progress={smoothProgress} />
          <div className="flex flex-col">
            {MILESTONES.map((milestone, index) => (
              <MilestoneRow
                key={milestone.step}
                milestone={milestone}
                index={index}
                ignited={index <= activeIndex}
                rowRef={(el) => {
                  rowRefs.current[index] = el;
                }}
              />
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
                src="/images/brand-story.jpg"
                alt="Sonali Bachkheti — Founder &amp; Principal Designer"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
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
    </motion.section>
  );
}

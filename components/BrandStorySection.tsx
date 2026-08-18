'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
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

/* ── Timeline Line + Traveling Dot ── */
function TimelineLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.65', 'end 0.5'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const dotTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--color-charcoal)]/10">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-brass)] to-[var(--color-brass)]"
        style={{ scaleY, originY: 0 }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-brass)] shadow-[0_0_12px_rgba(197,162,93,0.8)]"
        style={{ top: dotTop }}
      />
    </div>
  );
}

/* ── Center Node ── */
function CenterNode({ milestone, index }: { milestone: (typeof MILESTONES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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
      <div
        className={`absolute w-14 h-14 rounded-full border border-[var(--color-brass)]/30 transition-opacity duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          animationName: inView ? 'nodePulse' : 'none',
          animationDuration: '3s',
          animationIterationCount: 'infinite',
          animationDelay: `${index * 0.4}s`,
        }}
      />
      <div className="group relative w-12 h-12 rounded-full border-2 border-[var(--color-brass)] bg-[#222F5B] flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_24px_rgba(197,162,93,0.45)]">
        <span className="font-bodoni text-base text-gold-metallic-light font-medium absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-90">
          {milestone.step}
        </span>
        <Icon
          size={18}
          strokeWidth={1.5}
          className="text-gold-metallic-light absolute opacity-0 scale-75 -rotate-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0"
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
  const Icon = milestone.icon;
  const count = useCounter(milestone.stat.value, inView);
  const isRight = align === 'right';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`w-full max-w-sm ${isRight ? 'ml-auto text-right' : 'text-left'}`}
      initial={{ opacity: 0, x: isRight ? 48 : -48, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <div className={`flex items-center gap-2.5 mb-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
        <div className="w-8 h-8 rounded-full bg-[var(--color-brass)]/10 border border-[var(--color-brass)]/20 flex items-center justify-center">
          <Icon size={14} strokeWidth={1.5} className="text-gold-metallic" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[var(--color-warm-grey)] lg:hidden">
          {milestone.year}
        </span>
      </div>

      <h3 className="font-serif text-lg sm:text-xl uppercase tracking-[0.08em] text-[var(--color-charcoal)] font-semibold mb-1.5">
        {milestone.title}
      </h3>

      <div
        className={`h-px bg-gradient-to-r mb-2.5 ${
          isRight
            ? 'from-transparent to-[var(--color-brass)]'
            : 'from-[var(--color-brass)] to-transparent'
        } w-10 opacity-50`}
      />

      <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light mb-3.5">
        {milestone.description}
      </p>

      <div
        className={`inline-flex items-center gap-2.5 px-3.5 py-2 border border-[var(--color-brass)]/20 bg-[var(--color-paper)] transition-all duration-300 hover:border-[var(--color-brass)]/50 hover:shadow-[0_4px_18px_rgba(197,162,93,0.12)] ${
          isRight ? 'flex-row-reverse' : ''
        }`}
      >
        <span className="font-bodoni text-xl text-gold-metallic font-medium leading-none tabular-nums">
          {milestone.stat.value === 0 ? '' : count}
          {milestone.stat.suffix}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">
          {milestone.stat.label}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Milestone Row ── */
function MilestoneRow({ milestone, index }: { milestone: (typeof MILESTONES)[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-8 lg:gap-12 items-center py-7 lg:py-9">
      {/* Left slot: card on even rows (right side of line), empty on odd rows */}
      <div className={`flex min-w-0 ${isEven ? 'justify-end' : ''}`}>
        {isEven && <MilestoneCard milestone={milestone} index={index} align="right" />}
      </div>

      {/* Center node */}
      <div className="flex justify-center">
        <CenterNode milestone={milestone} index={index} />
      </div>

      {/* Right slot: card on odd rows (left side of line), empty on even rows */}
      <div className={`flex min-w-0 ${isEven ? '' : 'justify-start'}`}>
        {!isEven && <MilestoneCard milestone={milestone} index={index} align="left" />}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function BrandStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="story"
      className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden"
    >
      <div className="editorial-shell">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            our journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            THE URBN SPAZIO STORY
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-lg text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            From a single vision to over 100 bespoke projects — scroll through the milestones that
            shaped our craft.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <TimelineLine containerRef={containerRef} />
          <div className="flex flex-col">
            {MILESTONES.map((milestone, index) => (
              <MilestoneRow key={milestone.step} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-[var(--color-charcoal)]/10">
          <a href="#consultation" className="btn-filled text-[10px]">
            <span>Begin Your Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <div className="flex flex-col items-center sm:items-end">
            <span className="font-script text-3xl text-gold-metallic">Sonali Bachkheti</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">
              Founder &amp; Principal Designer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import {
  ArrowRight,
  Compass,
  Gem,
  Heart,
  Home,
  Palette,
  Sparkles,
  ChevronDown,
  Quote,
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

/* ── Upward Spiral Card ── */
function SpiralUpwardCard({
  milestone,
  index,
  total,
  smoothProgress,
  isMobile,
  reduce,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  isMobile: boolean;
  reduce: boolean | null;
}) {
  const Icon = milestone.icon;
  const isEven = index % 2 === 0;
  // Alternate spiral spin: even cards arc left (-1), odd cards arc right (+1)
  const spinDirection = isEven ? -1 : 1;

  // diff = index - currentScrollIndex
  const diff = useTransform(smoothProgress, (p) => {
    const currentIdx = p * (total - 0.2);
    return index - currentIdx;
  });

  // Spirals UPWARDS when diff < 0 (user scrolls past it)
  const y = useTransform(diff, (d) => {
    if (reduce) return 0;
    if (d < 0) {
      const exit = -d;
      return Math.max(-800, -exit * (isMobile ? 420 : 600));
    }
    // Waiting beneath: rests directly in the deck beneath active card
    return Math.min(10, d * 8);
  });

  // Lateral spiral arc: ONLY active when exiting upwards
  const x = useTransform(diff, (d) => {
    if (reduce) return 0;
    if (d < 0) {
      const exit = -d;
      return Math.min(180, Math.max(-180, spinDirection * exit * (isMobile ? 60 : 100)));
    }
    // When active or waiting: perfectly centered (0), NO side displacement!
    return 0;
  });

  // Upward spiral spin rotation: ONLY active when exiting upwards
  const rotate = useTransform(diff, (d) => {
    if (reduce) return 0;
    if (d < 0) {
      const exit = -d;
      return Math.min(35, Math.max(-35, spinDirection * exit * (isMobile ? 18 : 25)));
    }
    // When active: perfectly straight (0), 100% readable!
    return 0;
  });

  // Scale: shrink slightly as it flies upwards
  const scale = useTransform(diff, (d) => {
    if (reduce) return 1;
    if (d < 0) {
      const exit = -d;
      return Math.max(0.78, 1 - exit * 0.18);
    }
    // Waiting card scale
    return Math.max(0.96, 1 - Math.min(d, 1) * 0.04);
  });

  // Opacity:
  // - Exiting cards stay solid opaque while lifting off (exit < 0.35), then dissolve
  // - Active card and immediate next card are solid (1)
  // - Cards further in queue are completely hidden (0)
  const opacity = useTransform(diff, (d) => {
    if (reduce) {
      return Math.abs(d) < 0.5 ? 1 : 0;
    }
    if (d < 0) {
      const exit = -d;
      if (exit < 0.35) return 1;
      return Math.max(0, 1 - (exit - 0.35) * 2.0);
    }
    if (d <= 1.0) return 1;
    return 0;
  });

  // Z-INDEX HIERARCHY FIX:
  // - Exiting cards fly OVER the deck (zIndex: 50), so they NEVER get sliced or covered by waiting cards!
  // - In-deck cards have strict descending order: index 0 (top) > index 1 > index 2...
  const zIndex = useTransform(diff, (d) => {
    if (d < 0) {
      return 50;
    }
    return Math.round(35 - index * 4);
  });

  return (
    <motion.article
      style={{
        opacity,
        scale,
        x,
        y,
        rotate,
        zIndex,
      }}
      className="absolute inset-0 m-auto w-full max-w-[460px] sm:max-w-[500px] h-[340px] sm:h-[360px] bg-[#FAF7F2] border border-[var(--color-brass)]/50 p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(28,26,24,0.2)] flex flex-col justify-between select-none"
    >
      {/* Header: Year + Chapter Badge + Icon */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-baseline gap-3">
            <span className="font-bodoni text-4xl sm:text-5xl text-gold-metallic font-normal tabular-nums leading-none">
              {milestone.year}
            </span>
            <span className="px-2.5 py-0.5 bg-[var(--color-brass)]/10 text-[var(--color-brass-dark)] border border-[var(--color-brass)]/30 text-[9px] uppercase tracking-[0.25em] font-semibold">
              Chapter {milestone.step}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-[var(--color-brass)]/40 bg-[var(--color-brass)]/10 flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={1.3} className="text-[var(--color-brass-dark)]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bodoni text-2xl sm:text-3xl text-[var(--color-charcoal)] font-normal mb-2 leading-tight">
          {milestone.title}
        </h3>

        <div className="h-px w-10 bg-[var(--color-brass)] opacity-50 my-3" />

        {/* Narrative Description */}
        <p className="font-helvetica text-xs sm:text-sm text-[var(--color-warm-grey)] leading-relaxed font-light">
          {milestone.description}
        </p>
      </div>

      {/* Footer: Stat Value + Chapter Watermark */}
      <div className="mt-4 pt-4 border-t border-[var(--color-charcoal)]/10 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-bodoni text-xl sm:text-2xl text-[var(--color-charcoal)] tabular-nums">
            {milestone.stat.value}
          </span>
          <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--color-warm-grey)] font-medium">
            {milestone.stat.label}
          </span>
        </div>
        <span className="font-bodoni-italic text-sm text-[var(--color-charcoal)]/40">
          № {milestone.step}
        </span>
      </div>
    </motion.article>
  );
}

/* ── Main Section ── */
export default function BrandStorySection() {
  const [consultOpen, setConsultOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* Scroll-synced progress across the pinned container (420vh scroll length) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (v) => {
    const idx = Math.min(
      MILESTONES.length - 1,
      Math.max(0, Math.round(v * (MILESTONES.length - 1)))
    );
    setActiveChapter((prev) => (prev !== idx ? idx : prev));
  });

  return (
    <section id="story" className="relative bg-[var(--color-linen)] text-[var(--color-charcoal)]">
      {/* ── Pinned Spiral Scroll Container ── */}
      <div ref={containerRef} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden py-8 sm:py-12">
          
          {/* Header & Chapter Indicator */}
          <div className="flex flex-col items-center text-center z-30 px-4 mt-2">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--color-brass-dark)] mb-2">
              Our Journey — 2018 to 2024
            </span>
            <h2 className="font-bodoni text-3xl sm:text-5xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight flex items-baseline justify-center gap-2">
              <span className="lowercase">the</span>
              <span className="text-gold-metallic font-medium uppercase tracking-normal">US</span>
              <span className="lowercase">story</span>
            </h2>
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.step}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeChapter
                      ? 'w-7 sm:w-9 h-1.5 bg-[var(--color-brass)]'
                      : i < activeChapter
                      ? 'w-2 h-1.5 bg-[var(--color-brass)]/40'
                      : 'w-2 h-1.5 bg-[var(--color-charcoal)]/15'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] font-helvetica uppercase tracking-[0.25em] text-[var(--color-warm-grey)] mt-2">
              Chapter {MILESTONES[activeChapter]?.step} of 06 · {MILESTONES[activeChapter]?.year}
            </span>
          </div>

          {/* Stage where cards exit spirally upwards one after another */}
          <div className="relative w-full max-w-lg sm:max-w-xl mx-auto px-4 h-[360px] sm:h-[390px] flex items-center justify-center my-auto">
            {MILESTONES.map((milestone, idx) => (
              <SpiralUpwardCard
                key={milestone.step}
                milestone={milestone}
                index={idx}
                total={MILESTONES.length}
                smoothProgress={smoothProgress}
                isMobile={isMobile}
                reduce={reduce}
              />
            ))}
          </div>

          {/* Scroll cue prompt */}
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[var(--color-warm-grey)] opacity-60 z-30 mb-2">
            <span>Scroll to advance journey</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </div>

        </div>
      </div>

      {/* ── Founder Section: 2-Column Luxury Editorial Spread ── */}
      <div className="editorial-shell py-24 sm:py-36">
        <div className="pt-16 sm:pt-20 border-t border-[var(--color-charcoal)]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* ── Left Column: Architectural Portrait with offset frame & hover motion ── */}
            <motion.div
              className="lg:col-span-5 relative group mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none"
              initial={{ opacity: 0, x: -28, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Architectural offset backplate frame (responds on hover) */}
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 w-full h-full arch-frame border border-[var(--color-brass)]/40 -z-10 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-[var(--color-brass)]/70"
              />

              {/* Main portrait arch container */}
              <div className="relative z-10 arch-frame overflow-hidden bg-[var(--color-cream)] shadow-[0_30px_70px_-25px_rgba(28,26,24,0.35)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/founder.jpg"
                  alt="Sonali Bachkheti — Founder &amp; Principal Designer"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Inner architectural brass keyline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 border border-[var(--color-brass)]/45 arch-frame transition-colors duration-500 group-hover:border-[var(--color-brass)]/75"
                />

                {/* Subtle studio badge overlay */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-[var(--color-paper)]/95 backdrop-blur-md border border-[var(--color-brass)]/30 px-3 py-1.5 shadow-[0_10px_25px_-5px_rgba(28,26,24,0.15)] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)] animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[var(--color-charcoal)] font-medium">
                    Urbn Spazio · Studio
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Right Column: Editorial Narrative, Quote & Philosophy ── */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
            >
              {/* Section Kicker */}
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-[var(--color-brass)] opacity-80" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)]">
                  Meet The Founder &amp; Principal Designer
                </span>
              </div>

              {/* Founder Name & Title */}
              <h2 className="font-bodoni text-3xl sm:text-4xl lg:text-5xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
                Sonali Bachkheti
              </h2>
              <span className="font-bodoni-italic text-sm sm:text-base text-[var(--color-brass-dark)] mt-1.5">
                Founder &amp; Principal Designer
              </span>

              {/* Featured Pull Quote */}
              <div className="relative mt-7 mb-5 pl-5 sm:pl-6 border-l-2 border-[var(--color-brass)] bg-[var(--color-paper)]/60 py-4 pr-5 sm:pr-6 border border-l-2 border-r-0 border-t-0 border-b-0">
                <Quote className="w-5 h-5 text-[var(--color-brass)]/50 mb-2 rotate-180" />
                <blockquote className="font-serif italic text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--color-charcoal)]/90">
                  &ldquo;A home should not impress your guests — it should quiet your mind the moment you walk in.&rdquo;
                </blockquote>
              </div>

              {/* Studio Credentials Strip */}
              <div className="mt-7 pt-6 border-t border-[var(--color-charcoal)]/10 grid grid-cols-3 gap-4 max-w-lg">
                <div className="group/stat cursor-default">
                  <span className="block font-bodoni text-2xl sm:text-3xl text-[var(--color-charcoal)] tabular-nums transition-colors duration-300 group-hover/stat:text-gold-metallic">
                    100+
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-[var(--color-warm-grey)] font-medium mt-1">
                    Homes Shaped
                  </span>
                </div>
                <div className="group/stat cursor-default">
                  <span className="block font-bodoni text-2xl sm:text-3xl text-[var(--color-charcoal)] tabular-nums transition-colors duration-300 group-hover/stat:text-gold-metallic">
                    100%
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-[var(--color-warm-grey)] font-medium mt-1">
                    Custom Artisanal
                  </span>
                </div>
                <div className="group/stat cursor-default">
                  <span className="block font-bodoni text-2xl sm:text-3xl text-[var(--color-charcoal)] transition-colors duration-300 group-hover/stat:text-gold-metallic">
                    NCR
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-[var(--color-warm-grey)] font-medium mt-1">
                    &amp; Pan-India
                  </span>
                </div>
              </div>

              {/* Consultation CTA Button */}
              <div className="mt-8 pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => setConsultOpen(true)}
                  className="btn-filled text-[10px] cursor-pointer inline-flex items-center justify-center gap-3 group w-fit"
                >
                  <span>Begin Your Story</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
                <span className="text-[10px] font-helvetica uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-light">
                  ✦ Direct consultation with principal designer
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
      {consultOpen && <ConsultationModal onClose={() => setConsultOpen(false)} />}
    </section>
  );
}

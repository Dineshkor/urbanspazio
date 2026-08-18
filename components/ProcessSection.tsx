'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, HardHat, KeyRound, MessagesSquare, Palette, PenTool } from 'lucide-react';

/* ── Process Steps (minimal copy) ── */
const STEPS = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    description: 'We listen first — lifestyle, needs, aesthetic.',
    icon: MessagesSquare,
  },
  {
    step: '02',
    title: 'Concept & Design Development',
    description: 'Bespoke concepts, layouts, and 3D renders.',
    icon: PenTool,
  },
  {
    step: '03',
    title: 'Material Selection & Costing',
    description: 'Curated finishes with transparent costing.',
    icon: Palette,
  },
  {
    step: '04',
    title: 'Execution & Project Management',
    description: 'Flawless end-to-end site execution.',
    icon: HardHat,
  },
  {
    step: '05',
    title: 'Styling & Handover',
    description: 'Art, light, and styling — keys in hand.',
    icon: KeyRound,
  },
];

/* ── Timeline Line + Traveling Dot ── */
function ProcessLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
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
function ProcessNode({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      className="relative z-10 flex justify-center"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: index * 0.06 }}
    >
      <div className="group relative w-12 h-12 rounded-full border-2 border-[var(--color-brass)] bg-[#222F5B] flex items-center justify-center transition-all duration-500 hover:shadow-[0_0_24px_rgba(197,162,93,0.45)]">
        <span className="font-bodoni text-base text-gold-metallic-light font-medium absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-90">
          {step.step}
        </span>
        <Icon
          size={18}
          strokeWidth={1.5}
          className="text-gold-metallic-light absolute opacity-0 scale-75 -rotate-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0"
        />
      </div>
    </motion.div>
  );
}

/* ── Step Card ── */
function StepCard({
  step,
  index,
  align,
}: {
  step: (typeof STEPS)[0];
  index: number;
  align: 'left' | 'right';
}) {
  const Icon = step.icon;
  const isRight = align === 'right';

  return (
    <motion.div
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
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold text-[var(--color-warm-grey)]">
          Step {step.step}
        </span>
      </div>

      <h3 className="font-serif text-lg sm:text-xl uppercase tracking-[0.08em] text-[var(--color-charcoal)] font-semibold mb-1.5">
        {step.title}
      </h3>

      <div
        className={`h-px bg-gradient-to-r mb-2.5 ${
          isRight
            ? 'from-transparent to-[var(--color-brass)]'
            : 'from-[var(--color-brass)] to-transparent'
        } w-10 opacity-50`}
      />

      <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
        {step.description}
      </p>
    </motion.div>
  );
}

/* ── Step Row ── */
function StepRow({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-8 lg:gap-12 items-center py-7 lg:py-9">
      <div className={`flex min-w-0 ${isEven ? 'justify-end' : ''}`}>
        {isEven && <StepCard step={step} index={index} align="right" />}
      </div>

      <div className="flex justify-center">
        <ProcessNode step={step} index={index} />
      </div>

      <div className={`flex min-w-0 ${isEven ? '' : 'justify-start'}`}>
        {!isEven && <StepCard step={step} index={index} align="left" />}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="process"
      className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden"
    >
      <div className="editorial-shell">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            how it works
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            FROM VISION TO REALITY
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Five steps. Your space, made real.
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <ProcessLine containerRef={containerRef} />
          <div className="flex flex-col">
            {STEPS.map((step, index) => (
              <StepRow key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#consultation" className="btn-filled text-[10px]">
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

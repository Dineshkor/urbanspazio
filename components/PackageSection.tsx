'use client';

import React, { useState, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
} from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { PACKAGE_SEGMENTS, type PackageSegment } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';

/* ── Individual Package Card with Spotlight & Pedestal Micro-Interactions ── */
function PackageCard({
  tier,
  index,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  tier: PackageSegment;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const isPopular = Boolean(tier.popular);

  // Mouse tracking for ambient radial spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 260, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 260, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    onHoverStart();
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.jump(e.clientX - rect.left);
    mouseY.jump(e.clientY - rect.top);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(380px circle at ${smoothMouseX}px ${smoothMouseY}px, ${
    isPopular
      ? 'rgba(197, 162, 93, 0.18)'
      : 'rgba(197, 162, 93, 0.12)'
  }, transparent 75%)`;

  const whatsappHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi Urbn Spazio! I am interested in the ${tier.tier} Tier (${tier.range}) package for my interior design project.`
  )}`;

  // Determine sibling soft-focus scale & opacity
  const siblingScale = reduce ? 1 : isHovered ? 1.015 : isAnyHovered ? 0.985 : 1;
  const siblingOpacity = isHovered ? 1 : isAnyHovered ? 0.62 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        scale: siblingScale,
        opacity: siblingOpacity,
      }}
      className={`relative flex flex-col justify-between transition-shadow duration-500 ${
        isPopular
          ? 'md:-translate-y-5 lg:-translate-y-6 z-10'
          : 'z-0'
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onHoverEnd}
        className={`relative p-8 sm:p-10 flex flex-col justify-between h-full border overflow-hidden transition-all duration-300 ${
          isPopular
            ? 'panel-glow text-[var(--color-paper)] border-[var(--color-brass)]/50 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)] hover:shadow-[0_30px_60px_-15px_rgba(197,162,93,0.25)] hover:border-[var(--color-brass)]'
            : 'bg-[#FAF7F2] text-[var(--color-charcoal)] border-[var(--color-charcoal)]/15 shadow-[0_16px_40px_-20px_rgba(28,26,24,0.08)] hover:shadow-[0_24px_50px_-20px_rgba(28,26,24,0.18)] hover:border-[var(--color-brass)]/60'
        }`}
      >
        {/* Ambient Radial Cursor Spotlight */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: spotlightBackground,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        {/* Top Content Area */}
        <div className="relative z-10">
          {/* Tier Title & Popular Tag */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3
              className={`text-2xl font-serif uppercase tracking-[0.08em] font-semibold ${
                isPopular ? 'text-[var(--color-paper)]' : 'text-[var(--color-charcoal)]'
              }`}
            >
              {tier.tier} Tier
            </h3>
            {isPopular && (
              <span className="px-2.5 py-0.5 bg-[var(--color-brass)] text-white text-[9px] uppercase tracking-[0.2em] font-semibold shrink-0 shadow-sm">
                Most Popular
              </span>
            )}
          </div>

          {/* Price Range */}
          <p
            className={`text-xl sm:text-2xl font-serif mb-4 font-medium tracking-tight ${
              isPopular ? 'text-gold-metallic-light' : 'text-gold-metallic'
            }`}
          >
            {tier.range}
          </p>

          {/* Description */}
          <p
            className={`text-xs font-helvetica leading-relaxed mb-6 font-normal ${
              isPopular ? 'text-[var(--color-light-grey)]' : 'text-[var(--color-warm-grey)]'
            }`}
          >
            {tier.description}
          </p>

          {/* Features List with Micro-Interaction */}
          <div
            className={`space-y-3 pt-6 border-t mb-8 ${
              isPopular ? 'border-white/10' : 'border-[var(--color-charcoal)]/12'
            }`}
          >
            {tier.includes.map((feature, i) => (
              <motion.div
                key={i}
                animate={{ x: isHovered && !reduce ? 4 : 0 }}
                transition={{ duration: 0.25, delay: i * 0.02, ease: 'easeOut' }}
                className="flex items-start gap-2.5 text-xs font-helvetica font-light"
              >
                <Check
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors duration-300 ${
                    isPopular
                      ? isHovered
                        ? 'text-[var(--color-brass-light)]'
                        : 'text-[var(--color-brass)]'
                      : isHovered
                      ? 'text-[var(--color-brass)]'
                      : 'text-[var(--color-brass-dark)]'
                  }`}
                />
                <span
                  className={
                    isPopular ? 'text-[var(--color-paper)]/90' : 'text-[var(--color-charcoal)]'
                  }
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative z-10 pt-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn w-full justify-center inline-flex items-center gap-2 py-3.5 px-6 font-helvetica text-[10px] uppercase tracking-[0.22em] font-medium transition-all duration-300 cursor-pointer ${
              isPopular
                ? 'bg-[var(--color-brass)] text-white hover:bg-[var(--color-brass-dark)] shadow-md'
                : 'border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-[var(--color-paper)]'
            }`}
          >
            <span>Inquire Tier</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function PackageSection() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section id="packages" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-20 lg:mb-24"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            Investment
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">packages</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Transparent investment tiers designed for varying project scopes and luxury requirements.
          </p>
        </motion.div>

        {/* ── 3 Investment Tier Cards (Pedestal Stagger) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {PACKAGE_SEGMENTS.map((tier, index) => (
            <PackageCard
              key={tier.id}
              tier={tier}
              index={index}
              isHovered={hoveredTier === tier.id}
              isAnyHovered={hoveredTier !== null}
              onHoverStart={() => setHoveredTier(tier.id)}
              onHoverEnd={() => setHoveredTier(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

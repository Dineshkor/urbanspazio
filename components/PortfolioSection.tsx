'use client';

import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS, type PortfolioItem } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';

/* ── Individual Portfolio Card with Aperture Reveal & 3D Magnetic Hover ── */
function PortfolioCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Magnetic Tilt motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 160, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 160, damping: 20 });

  // Floating cursor pill position values
  const pillX = useMotionValue(0);
  const pillY = useMotionValue(0);
  const smoothPillX = useSpring(pillX, { stiffness: 220, damping: 24 });
  const smoothPillY = useSpring(pillY, { stiffness: 220, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalize from -0.5 to +0.5 relative to center
    const normX = clientX / rect.width - 0.5;
    const normY = clientY / rect.height - 0.5;

    // Gentle 3D tilt (max 5.5 degrees)
    rotateX.set(-normY * 5.5);
    rotateY.set(normX * 5.5);

    // Track floating pill cursor
    pillX.set(clientX);
    pillY.set(clientY);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    setIsHovered(true);
    if (frameRef.current) {
      const rect = frameRef.current.getBoundingClientRect();
      pillX.jump(e.clientX - rect.left);
      pillY.jump(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const whatsappHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi Urbn Spazio! I loved the ${item.title} project and would like to enquire about a similar space.`
  )}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      {/* Photo Frame with Magnetic Tilt */}
      <motion.div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
        }}
        className="aspect-[4/3] overflow-hidden bg-[var(--color-cream)] relative mb-4 shadow-[0_16px_40px_-20px_rgba(28,26,24,0.15)] group-hover:shadow-[0_24px_50px_-20px_rgba(28,26,24,0.3)] transition-shadow duration-500"
      >
        {/* Architectural Curtain Reveal (Desktop only — guarantees 100% instant image visibility on mobile) */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.85,
              delay: (index % 2) * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute inset-0 bg-[var(--color-cream)] origin-top z-10 hidden md:block"
          />
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient darken veil on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#1C1A18]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        />

        {/* Floating Magnetic Compass Pill (Desktop) */}
        <motion.div
          style={{
            x: smoothPillX,
            y: smoothPillY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="pointer-events-none absolute top-0 left-0 hidden md:flex items-center gap-2 px-4 py-2 bg-[#1C1A18]/90 backdrop-blur-md border border-[var(--color-brass)]/70 text-[var(--color-brass-light)] text-[9px] uppercase tracking-[0.25em] font-medium shadow-[0_12px_30px_rgba(0,0,0,0.4)] z-20"
        >
          <span>Enquire Space</span>
          <ArrowRight className="w-3 h-3 text-[var(--color-brass)]" />
        </motion.div>
      </motion.div>

      {/* Minimal Caption Info */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div>
          <h3 className="text-xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.05em] font-medium group-hover:text-[var(--color-brass-dark)] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-[11px] font-helvetica text-[var(--color-warm-grey)] uppercase tracking-[0.15em] mt-0.5 font-normal">
            {item.location} · {item.philosophy}
          </p>
        </div>

        {/* Visible CTA hint (Touch & Fallback) */}
        <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-brass-dark)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          <span>Enquire</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
}

export default function PortfolioSection() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredItems =
    filter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            Our Recent Work
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">spaces that speak</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
        </motion.div>

        {/* ── Animated Filter Tabs ── */}
        <div className="flex justify-center gap-8 mb-16 border-b border-[var(--color-charcoal)]/15 pb-4">
          {(['all', 'residential', 'commercial'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="relative cursor-pointer text-xs font-helvetica uppercase tracking-[0.2em] pb-2 text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)] transition-colors duration-200"
            >
              <span className={filter === tab ? 'text-[var(--color-brass-dark)] font-semibold' : ''}>
                {tab === 'all' ? 'All Work' : tab}
              </span>
              {filter === tab && (
                <motion.div
                  layoutId="activePortfolioFilter"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-brass)]"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Asymmetrical Portfolio Grid with Smooth Layout Animations ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 md:[&>*:nth-child(even)]:mt-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PortfolioCard item={item} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

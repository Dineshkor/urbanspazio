'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { SERVICES } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

/* ── Service Card — static concise face, CTA appears over dimmed photo on hover ── */
function ServiceCard({
  service,
  stepNum,
  imageSrc,
  index,
}: {
  service: (typeof SERVICES)[0];
  stepNum: string;
  imageSrc: string;
  index: number;
}) {
  const href =
    service.cta.action === 'whatsapp'
      ? `https://wa.me/${BRAND.whatsapp}?text=Hi Urbn Spazio! I want to inquire about ${encodeURIComponent(service.title)}.`
      : '#contact';
  const isExternal = service.cta.action === 'whatsapp';

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.75,
        delay: (index % 2) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-[var(--color-paper)] border border-[var(--color-charcoal)]/10 flex flex-col h-full transition-shadow duration-300 motion-reduce:transition-none hover:shadow-[0_24px_60px_-30px_rgba(28,26,24,0.35)]"
    >
      {/* Static face */}
      <div className="flex flex-col text-left h-full">
        <span className="block px-5 pt-5 text-[11px] font-helvetica tracking-[0.25em] text-[var(--color-warm-grey)]">
          {stepNum}
        </span>
        <span className="block px-5 pt-3">
          <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--color-cream)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={service.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
            />
            {/* Dim on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[var(--color-charcoal)]/0 transition-colors duration-300 motion-reduce:transition-none group-hover:bg-[var(--color-charcoal)]/25"
            />
            {/* Overlay CTA — desktop hover / keyboard focus */}
            <span className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100 group-focus-within:opacity-100">
              <a
                href={href}
                target={isExternal ? '_blank' : '_self'}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="btn-outline-light text-[10px]"
              >
                <span>{service.cta.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </span>
          </span>
        </span>
        <span className="block px-5 pt-4 font-serif text-xl text-[var(--color-charcoal)] uppercase tracking-[0.08em] font-semibold">
          {service.title}
        </span>
        <span className="block px-5 pt-1 text-[10px] uppercase tracking-[0.2em] text-gold-metallic font-semibold">
          {service.subtitle}
        </span>
        <span className="block px-5 pt-3 text-xs font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
          {service.description}
        </span>
        <span className="flex flex-wrap gap-2 px-5 py-4 mt-auto">
          {service.deliverables.slice(0, 3).map((item, i) => (
            <span key={i} className="px-3 py-1 bg-[var(--color-cream)] text-[10px] font-helvetica text-[var(--color-charcoal)] tracking-wide">
              {item}
            </span>
          ))}
        </span>
        {/* Mobile fallback — no hover on touch */}
        <a
          href={href}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="sm:hidden mx-5 mb-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-brass-dark)] underline underline-offset-4"
        >
          <span>{service.cta.label}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

export default function ServicesSection() {
  const quickConsultation = SERVICES[0]; // Quick Design Consultation (₹999)
  const otherServices = SERVICES.slice(1);

  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 640);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Subtle differential drift for 2-column layout (Cards 02 & 04 vs 03 & 05)
  const col1Y = useTransform(smoothProgress, [0, 1], [25, -25]);
  const col2Y = useTransform(smoothProgress, [0, 1], [-25, 30]);

  return (
    <section id="services" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header (matches story heading: kicker + Bodoni title) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            How We Can Work Together
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">our services</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Tailored interior design engagements — from an instant 1-on-1 virtual design session to complete turnkey home execution.
          </p>
        </motion.div>

        {/* ── Featured Service 01: Quick Consultation (Warm Paper with Brass Accent) ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 bg-[var(--color-paper)] border border-[var(--color-brass)]/40 p-8 sm:p-14 relative shadow-[0_20px_50px_-25px_rgba(28,26,24,0.08)] hover:shadow-[0_24px_60px_-25px_rgba(28,26,24,0.15)] transition-shadow duration-300"
        >
          <div className="max-w-2xl">

            {/* Text Content */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-serif text-[var(--color-brass-dark)] font-light">
                  01
                </span>
                <span className="px-3 py-1 bg-[var(--color-brass)] text-white text-[10px] uppercase tracking-[0.2em] font-semibold">
                  {quickConsultation.price} · Online
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif text-[var(--color-charcoal)] uppercase tracking-wide mb-3">
                {quickConsultation.title}
              </h3>

              <p className="text-[10px] sm:text-xs font-helvetica text-gold-metallic uppercase tracking-[0.2em] mb-5 font-semibold">
                {quickConsultation.subtitle}
              </p>

              <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-8 font-light max-w-lg line-clamp-2">
                {quickConsultation.description}
              </p>

              {/* Deliverables list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full border-t border-[var(--color-charcoal)]/10 pt-6">
                {quickConsultation.deliverables.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-helvetica text-[var(--color-charcoal)] font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a href="#consultation" className="btn-filled text-[10px]">
                <span>Book Session for {quickConsultation.price}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </motion.div>

        {/* ── Core Services 02–05: staggered expandable cards with asymmetric scroll drift ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 sm:[&>*:nth-child(even)]:mt-12"
        >
          {otherServices.map((service, index) => {
            const stepNum = `0${index + 2}`;
            const isRightCol = index % 2 === 1;

            // Pick sample images for each service
            const serviceImages: Record<string, string> = {
              'advanced-consultation': '/images/themes/japandi.jpg',
              'turnkey': '/images/themes/neoclassical.jpg',
              'pmc': '/images/themes/contemporary.jpg',
              'bespoke-furniture': '/images/themes/biophilic.jpg',
            };

            const imageSrc = serviceImages[service.id] || '/images/hero-warm-premium.jpg';

            return (
              <motion.div
                key={service.id}
                style={{
                  y: isDesktop && !shouldReduceMotion ? (isRightCol ? col2Y : col1Y) : 0,
                }}
                className="h-full"
              >
                <ServiceCard
                  service={service}
                  stepNum={stepNum}
                  imageSrc={imageSrc}
                  index={index}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { SERVICES } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

/* ── Service Card — static concise face, CTA appears over dimmed photo on hover ── */
function ServiceCard({
  service,
  stepNum,
  imageSrc,
}: {
  service: (typeof SERVICES)[0];
  stepNum: string;
  imageSrc: string;
}) {
  const href =
    service.cta.action === 'whatsapp'
      ? `https://wa.me/${BRAND.whatsapp}?text=Hi Urbn Spazio! I want to inquire about ${encodeURIComponent(service.title)}.`
      : '#contact';
  const isExternal = service.cta.action === 'whatsapp';

  return (
    <article className="group bg-[var(--color-paper)] border border-[var(--color-charcoal)]/10 flex flex-col transition-shadow duration-300 motion-reduce:transition-none hover:shadow-[0_24px_60px_-30px_rgba(28,26,24,0.35)]">
      {/* Static face */}
      <div className="flex flex-col text-left">
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
        <span className="flex flex-wrap gap-2 px-5 py-4">
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
    </article>
  );
}

export default function ServicesSection() {
  const quickConsultation = SERVICES[0]; // Quick Design Consultation (₹999)
  const otherServices = SERVICES.slice(1);

  return (
    <section id="services" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header (matches story heading: kicker + Bodoni title) ── */}
        <div className="flex flex-col items-center text-center mb-20">
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
        </div>

        {/* ── Featured Service 01: Quick Consultation (Dark Charcoal Contrast Box) ── */}
        <div className="mb-24 panel-glow text-[var(--color-paper)] p-8 sm:p-14 border border-[var(--color-brass)]/25 relative">
          <div className="max-w-2xl">

            {/* Text Content */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-serif text-gold-metallic-light font-light">
                  01
                </span>
                <span className="px-3 py-1 bg-[var(--color-brass)] text-white text-[10px] uppercase tracking-[0.2em] font-semibold">
                  {quickConsultation.price} · Online
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif text-[var(--color-paper)] uppercase tracking-wide mb-3">
                {quickConsultation.title}
              </h3>

              <p className="text-xs font-helvetica text-[var(--color-brass-light)] uppercase tracking-[0.2em] mb-5">
                {quickConsultation.subtitle}
              </p>

              <p className="text-xs sm:text-sm font-helvetica text-[var(--color-light-grey)] leading-relaxed mb-8 font-light max-w-lg line-clamp-2">
                {quickConsultation.description}
              </p>

              {/* Deliverables list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full border-t border-white/10 pt-6">
                {quickConsultation.deliverables.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-helvetica text-[var(--color-light-grey)] font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a href="#consultation" className="btn-outline-light text-[10px]">
                <span>Book Session for {quickConsultation.price}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* ── Core Services 02–05: staggered expandable cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 sm:[&>*:nth-child(even)]:mt-12">
          {otherServices.map((service, index) => {
            const stepNum = `0${index + 2}`;

            // Pick sample images for each service
            const serviceImages: Record<string, string> = {
              'advanced-consultation': '/images/themes/japandi.jpg',
              'turnkey': '/images/themes/neoclassical.jpg',
              'pmc': '/images/themes/contemporary.jpg',
              'bespoke-furniture': '/images/themes/biophilic.jpg',
            };

            const imageSrc = serviceImages[service.id] || '/images/hero-warm-premium.jpg';

            return (
              <ServiceCard
                key={service.id}
                service={service}
                stepNum={stepNum}
                imageSrc={imageSrc}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

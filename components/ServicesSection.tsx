'use client';

import React from 'react';
import { SERVICES } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const quickConsultation = SERVICES[0]; // Quick Design Consultation (₹999)
  const otherServices = SERVICES.slice(1);

  return (
    <section id="services" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header (Cursive Accent + Serif Heading) ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            how we can work together
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            SERVICES
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Tailored interior design engagements — from an instant 1-on-1 virtual design session to complete turnkey home execution.
          </p>
        </div>

        {/* ── Featured Service 01: Quick Consultation (Dark Charcoal Contrast Box like Style Coached by Eve) ── */}
        <div className="mb-24 bg-[#1E1C1A] text-[var(--color-paper)] p-8 sm:p-14 border border-[var(--color-charcoal)] relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Text Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
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

              <p className="text-xs font-helvetica text-gold-metallic-light uppercase tracking-[0.2em] mb-5">
                {quickConsultation.subtitle}
              </p>

              <p className="text-xs sm:text-sm font-helvetica text-[var(--color-light-grey)] leading-relaxed mb-8 font-light max-w-lg">
                {quickConsultation.description}
              </p>

              {/* Deliverables list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full border-t border-white/10 pt-6">
                {quickConsultation.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-helvetica text-stone-300 font-light">
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

            {/* Right: Single Offset Photo (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] overflow-hidden border border-white/10 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/projects/signature-kitchen-1.jpg"
                  alt="Quick Consultation Room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── Core Services 02–05: Spacious Stacked Editorial Rows (Inspired by Audrey) ── */}
        <div className="space-y-20">
          {otherServices.map((service, index) => {
            const stepNum = `0${index + 2}`;
            const isEven = index % 2 === 1;

            // Pick sample images for each service
            const serviceImages: Record<string, string> = {
              'advanced-consultation': '/images/themes/japandi.jpg',
              'turnkey': '/images/themes/neoclassical.jpg',
              'pmc': '/images/themes/contemporary.jpg',
              'bespoke-furniture': '/images/themes/biophilic.jpg',
            };

            const imageSrc = serviceImages[service.id] || '/images/hero-warm-premium.jpg';

            return (
              <div key={service.id} className="pt-12 border-t border-[var(--color-charcoal)]/15">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Text Column (7 cols) */}
                  <div className={`lg:col-span-7 flex flex-col items-start text-left ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-4xl sm:text-5xl font-serif text-gold-metallic mb-2 font-light">
                      {stepNum}
                    </span>

                    <h3 className="text-2xl sm:text-3xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.08em] mb-2 font-semibold">
                      {service.title}
                    </h3>

                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold-metallic font-semibold mb-4">
                      {service.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-6 font-light max-w-lg">
                      {service.description}
                    </p>

                    {/* Key Deliverables pills */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.deliverables.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-[var(--color-cream)] text-[10px] font-helvetica text-[var(--color-charcoal)] tracking-wide">
                          {item}
                        </span>
                      ))}
                    </div>

                    <a
                      href={
                        service.cta.action === 'whatsapp'
                          ? `https://wa.me/${BRAND.whatsapp}?text=Hi Urban Spazio! I want to inquire about ${encodeURIComponent(service.title)}.`
                          : '#contact'
                      }
                      target={service.cta.action === 'whatsapp' ? '_blank' : '_self'}
                      rel={service.cta.action === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="btn-outline text-[10px]"
                    >
                      <span>{service.cta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Offset Photo Column (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-[var(--color-cream)] shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

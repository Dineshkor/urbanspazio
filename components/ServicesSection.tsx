'use client';

import React from 'react';
import { SERVICES } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';
import {
  Video,
  PenTool,
  Hammer,
  ClipboardCheck,
  Armchair,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Video,
  PenTool,
  Hammer,
  ClipboardCheck,
  Armchair,
};

export default function ServicesSection() {
  // Split: hero service (Quick Consultation) vs the rest
  const heroService = SERVICES[0];
  const coreServices = SERVICES.slice(1);
  const HeroIcon = iconMap[heroService.icon] || Video;

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">
          <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-brass-dark)] mb-2">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--color-charcoal)] leading-tight mb-4">
            Services Crafted Around You
          </h2>
          <p className="text-sm font-helvetica text-[var(--color-warm-grey)] max-w-lg mx-auto">
            From a quick expert session to a complete home transformation — every engagement is designed to feel effortless and personal.
          </p>
        </div>

        {/* ── HERO SERVICE: Quick Consultation — Full-Width Editorial Card ── */}
        <div className="mb-12">
          <div className="relative bg-[#1E1C1A] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Image */}
              <div className="relative aspect-[4/3] lg:aspect-auto">
                <img
                  src="/images/projects/signature-kitchen-1.jpg"
                  alt="Quick Design Consultation"
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E1C1A] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A] to-transparent lg:hidden" />
              </div>

              {/* Right: Content */}
              <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[var(--color-brass)] flex items-center justify-center">
                    <HeroIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-brass)] text-white text-sm font-bold">
                      {heroService.price}
                    </span>
                    <span className="text-[10px] font-helvetica text-white/50 uppercase tracking-widest">
                      Most Popular
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-bold mb-2 leading-snug">
                  {heroService.title}
                </h3>
                <p className="text-xs font-helvetica text-[var(--color-brass-light)] uppercase tracking-widest font-semibold mb-4">
                  {heroService.subtitle}
                </p>
                <p className="text-sm font-helvetica text-stone-300 font-light leading-relaxed mb-6 max-w-md">
                  {heroService.description}
                </p>

                {/* Deliverables — 2 column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                  {heroService.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-brass)] shrink-0" />
                      <span className="text-xs font-helvetica text-stone-400">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#consultation"
                  className="self-start px-8 py-4 rounded-full bg-[var(--color-brass)] text-white text-xs font-helvetica font-semibold uppercase tracking-wider flex items-center gap-2.5 hover:bg-[var(--color-brass-light)] transition-colors shadow-lg"
                >
                  <span>{heroService.cta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── CORE SERVICES: 2×2 Grid — Clean, Elevated Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {coreServices.map((service, index) => {
            const Icon = iconMap[service.icon] || PenTool;
            const stepNum = `0${index + 2}`;

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-[var(--color-brass)]/30 transition-all duration-300 flex flex-col"
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#F3EFEA] flex items-center justify-center group-hover:bg-[var(--color-brass)] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 text-[var(--color-brass-dark)] group-hover:text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-3xl font-serif font-bold text-stone-200 group-hover:text-[var(--color-brass)]/30 transition-colors">
                    {stepNum}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--color-charcoal)] mb-1 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[10px] font-helvetica text-[var(--color-brass-dark)] uppercase tracking-widest font-semibold mb-3">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-5 flex-grow">
                  {service.description}
                </p>

                {/* Key Deliverables — compact */}
                <div className="border-t border-stone-100 pt-4 mb-5">
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-[10px] font-helvetica text-[var(--color-charcoal)] bg-[#F3EFEA] border border-stone-200/60"
                      >
                        {item}
                      </span>
                    ))}
                    {service.deliverables.length > 3 && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-helvetica text-[var(--color-brass-dark)] bg-[#F3EFEA] border border-stone-200/60 font-semibold">
                        +{service.deliverables.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={
                    service.cta.action === 'whatsapp'
                      ? `https://wa.me/${BRAND.whatsapp}?text=Hi Urban Spazio! I want to inquire about ${encodeURIComponent(service.title)}.`
                      : '#consultation'
                  }
                  target={service.cta.action === 'whatsapp' ? '_blank' : '_self'}
                  rel={service.cta.action === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  className="self-start px-6 py-3 rounded-full text-xs font-helvetica font-semibold uppercase tracking-wider text-[var(--color-charcoal)] border border-stone-300 hover:bg-[var(--color-brass)] hover:text-white hover:border-[var(--color-brass)] transition-all flex items-center gap-2"
                >
                  <span>{service.cta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

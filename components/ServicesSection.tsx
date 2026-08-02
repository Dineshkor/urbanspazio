"use client";

import React from "react";
import { SERVICES } from "@/lib/site-data";
import { QUICK_CONSULTATION_PRICE } from "@/lib/constants";

export default function ServicesSection() {
  const quickConsultation = SERVICES.find(s => s.id === "quick-consultation");
  const otherServices = SERVICES.filter(s => s.id !== "quick-consultation");

  const images = [
    "/images/themes/japandi.jpg",
    "/images/themes/neoclassical.jpg",
    "/images/projects/signature-kitchen-1.jpg",
    "/images/projects/signature-kitchen-2.jpg"
  ];

  return (
    <section id="services" className="py-24 bg-[var(--color-linen)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="section-header mb-16">
          <span className="script-label">how we can help</span>
          <h2 className="serif-heading text-4xl md:text-5xl">Services</h2>
          <div className="divider-gold divider-gold--center"></div>
        </div>

        {quickConsultation && (
          <div className="bg-[var(--color-dark)] text-[var(--color-cream)] mb-20 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative min-h-[300px] md:min-h-[auto]">
                <img
                  src="/images/themes/contemporary.jpg"
                  alt={quickConsultation.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block bg-[var(--color-brass)] text-white text-xs uppercase tracking-widest px-3 py-1 mb-4 w-max">
                  Featured · ₹{QUICK_CONSULTATION_PRICE}
                </div>
                <h3 className="font-serif text-3xl mb-2 text-white">{quickConsultation.title}</h3>
                <p className="text-[var(--color-brass-light)] text-sm uppercase tracking-widest mb-6 font-medium">
                  {quickConsultation.subtitle}
                </p>
                <p className="text-[var(--color-cream)]/80 mb-8 font-light leading-relaxed">
                  {quickConsultation.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-10 text-sm">
                  {quickConsultation.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-brass)] mt-0.5">•</span>
                      <span className="text-[var(--color-cream)]/90">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <button className="btn-filled bg-white text-[var(--color-dark)] hover:bg-[var(--color-cream)]">
                    {quickConsultation.cta.label}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-20">
          {otherServices.map((service, index) => {
            const isEven = index % 2 !== 0; // odd/even logic for layout
            const stepNum = `0${index + 1}`;
            const image = images[index % images.length];

            return (
              <React.Fragment key={service.id}>
                {index > 0 && <div className="divider-gold divider-gold--center opacity-50"></div>}
                <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}>
                  
                  {/* Oversized Number (Mobile hidden, Desktop shows on far side) */}
                  <div className={`hidden lg:block text-8xl font-serif text-[var(--color-brass)]/20 font-bold select-none ${isEven ? 'order-last text-right' : 'order-first'}`}>
                    {stepNum}
                  </div>

                  <div className="w-full md:w-1/2 lg:w-2/5">
                    <div className="aspect-[4/5] relative w-full border border-[var(--color-cream)] p-2">
                      <img 
                        src={image} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center">
                    <span className="text-[var(--color-brass)] font-serif text-2xl lg:hidden mb-4">{stepNum}</span>
                    <h3 className="font-serif text-3xl mb-2 text-[var(--color-dark)] uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-[var(--color-brass-dark)] text-sm uppercase tracking-widest mb-6 font-medium">
                      {service.subtitle}
                    </p>
                    <p className="text-[var(--color-charcoal)]/80 mb-8 font-light leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mb-8 space-y-2">
                      {service.deliverables.slice(0, 4).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-charcoal)]/90">
                          <span className="text-[var(--color-brass)]">―</span> {item}
                        </li>
                      ))}
                    </ul>
                    <div>
                      <button className="btn-outline">
                        {service.cta.label}
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

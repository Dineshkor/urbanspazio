"use client";

import React from "react";
import { DESIGN_PHILOSOPHIES } from "@/lib/site-data";

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="py-24 bg-[var(--color-dark)] text-[var(--color-cream)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="section-header section-header--dark mb-16">
          <span className="script-label">our design language</span>
          <h2 className="serif-heading text-4xl md:text-5xl">Four Philosophies, One Vision</h2>
          <div className="divider-gold divider-gold--center"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {DESIGN_PHILOSOPHIES.map((philosophy) => (
            <div 
              key={philosophy.id}
              className="group relative flex flex-col border-t border-[var(--color-brass)] pt-4 overflow-hidden"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden mb-6">
                <img 
                  src={philosophy.image} 
                  alt={philosophy.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide mb-1 text-white">
                    {philosophy.title}
                  </h3>
                  <p className="text-[var(--color-brass-light)] text-sm uppercase tracking-widest mb-4">
                    {philosophy.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-2">
                <p className="text-[var(--color-cream)]/80 font-light leading-relaxed mb-6">
                  {philosophy.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {philosophy.characteristics.map((char, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block px-3 py-1 text-xs border border-[var(--color-cream)]/20 text-[var(--color-cream)]/90 uppercase tracking-wider"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

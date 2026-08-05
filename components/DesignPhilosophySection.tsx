'use client';

import React from 'react';
import { DESIGN_PHILOSOPHIES } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-36 bg-[#1E1C1A] text-[var(--color-paper)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-light)] mb-2">
            our design language
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-paper)] uppercase tracking-[0.1em] font-semibold">
            FOUR PHILOSOPHIES, ONE VISION
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-light-grey)] leading-relaxed font-light">
            Guided by natural light, organic materials, and intentional minimalism — crafted for contemporary Indian living.
          </p>
        </div>

        {/* ── 2x2 Uncluttered Landscape Panels Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {DESIGN_PHILOSOPHIES.map((philosophy) => (
            <div
              key={philosophy.id}
              className="group relative w-full aspect-[16/10] overflow-hidden border-t-2 border-[var(--color-brass)] bg-[#2A2725]"
            >
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={philosophy.image}
                alt={philosophy.title}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-103 group-hover:opacity-90"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content Panel */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-brass-light)] mb-1.5">
                  {philosophy.subtitle}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-[0.05em] mb-2 font-semibold">
                  {philosophy.title}
                </h3>

                {/* Compact Characteristics Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {philosophy.characteristics.slice(0, 3).map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 border border-white/20 bg-black/40 backdrop-blur-xs text-[10px] font-helvetica text-stone-200"
                    >
                      {item}
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

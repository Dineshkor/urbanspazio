"use client";

import React from "react";
import { DESIGN_PHILOSOPHIES } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="py-20 lg:py-28 section-dark relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header — compact */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-brass)] mb-3">
            Our Design Language
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--color-charcoal)] leading-tight">
            Four Philosophies, One Vision
          </h2>
          <p className="mt-3 text-sm font-helvetica text-[var(--color-warm-grey)] max-w-xl">
            Each space we curate is guided by one of our core design philosophies — crafted with natural light, organic materials, and intentional minimalism.
          </p>
        </div>

        {/* 2×2 Grid — landscape cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {DESIGN_PHILOSOPHIES.map((philosophy) => (
            <div
              key={philosophy.id}
              className="group relative w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
              style={{ borderLeft: `5px solid ${philosophy.colorAccent}` }}
            >
              {/* Background Image */}
              <img
                src={philosophy.image}
                alt={philosophy.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay — stronger, covers bottom 65% */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/5 transition-opacity duration-500" />

              {/* Content — anchored to bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 z-10" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-1.5 text-white/80"
                >
                  {philosophy.subtitle}
                </p>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3 leading-snug font-bold">
                  {philosophy.title}
                </h3>

                {/* Characteristics — always visible pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {philosophy.characteristics.slice(0, 4).map((item: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full text-[10px] font-helvetica text-white bg-white/20 border border-white/15"
                      style={{ textShadow: 'none' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* CTA — always visible */}
                <div className="flex items-center gap-2 text-white uppercase text-[10px] tracking-widest font-semibold opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explore Style</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

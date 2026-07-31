"use client";

import React from "react";
import { DESIGN_PHILOSOPHIES } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 section-dark relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-brass)] mb-3">
            Our Design Language
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--color-charcoal)] leading-tight">
            Four Philosophies, <br className="hidden md:block" /> One Vision
          </h2>
          <p className="mt-4 text-sm sm:text-base font-helvetica text-[var(--color-warm-grey)] max-w-xl">
            Each space we curate is guided by one of our core design philosophies — crafted with natural light, organic materials, and intentional minimalism.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {DESIGN_PHILOSOPHIES.map((philosophy) => (
            <div 
              key={philosophy.id}
              className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl flex flex-col justify-end p-8 md:p-12 cursor-pointer shadow-lg"
              style={{ borderLeft: `6px solid ${philosophy.colorAccent}` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={philosophy.image} 
                  alt={philosophy.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Light Warm Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#2A2725]/90 via-[#2A2725]/40 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-75" />

              {/* Content */}
              <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                <p 
                  className="text-xs uppercase tracking-[0.2em] font-semibold mb-2"
                  style={{ color: philosophy.colorAccent }}
                >
                  {philosophy.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white">
                  {philosophy.title}
                </h3>
                
                <p className="text-stone-200 text-sm mb-6 max-w-md leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light">
                  {philosophy.description}
                </p>

                {/* Characteristics (visible on hover) */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                  <ul className="overflow-hidden space-y-2 text-xs text-stone-200">
                    {philosophy.characteristics.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" 
                          style={{ backgroundColor: philosophy.colorAccent }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white uppercase text-[11px] tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <span>Explore Style</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

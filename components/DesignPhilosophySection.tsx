"use client";

import React from "react";
import { DESIGN_PHILOSOPHIES } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="py-24 lg:py-32 bg-[var(--color-espresso)] text-[var(--color-warm-white)] relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <span className="inline-block uppercase tracking-[0.15em] text-sm font-semibold text-[var(--color-brass)] mb-4">
            Our Design Language
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--color-warm-white)] leading-tight">
            Four Philosophies, <br className="hidden md:block" /> One Vision
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {DESIGN_PHILOSOPHIES.map((philosophy) => (
            <div 
              key={philosophy.id}
              className="group relative w-full aspect-[3/4] overflow-hidden rounded-2xl flex flex-col justify-end p-8 md:p-12 cursor-pointer"
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

              {/* Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A1512] via-[#1A1512]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

              {/* Content */}
              <div className="relative z-20 transform transition-transform duration-500 group-hover:-translate-y-4">
                <p 
                  className="text-sm uppercase tracking-[0.15em] font-semibold mb-3"
                  style={{ color: philosophy.colorAccent }}
                >
                  {philosophy.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-white">
                  {philosophy.title}
                </h3>
                
                <p className="text-gray-300 text-base mb-8 max-w-md leading-relaxed hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {philosophy.description}
                </p>

                {/* Characteristics (visible on hover) */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                  <ul className="overflow-hidden space-y-3 text-sm text-gray-300">
                    {philosophy.characteristics.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" 
                          style={{ backgroundColor: philosophy.colorAccent }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center gap-3 text-white uppercase text-xs tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  Explore Style <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

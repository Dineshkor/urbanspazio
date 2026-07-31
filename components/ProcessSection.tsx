import React from "react";
import { PROCESS_STEPS } from "@/lib/site-data";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[var(--color-stone)] text-[var(--color-charcoal)] relative">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block uppercase tracking-[0.15em] text-sm font-semibold text-[var(--color-brass)] mb-4">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-charcoal)] leading-tight">
            From Vision to Reality
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Brass Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-brass)]/40 -translate-x-1/2 md:translate-x-0" />

          {/* Timeline Steps */}
          <div className="space-y-16 lg:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.step} className="relative flex flex-col md:flex-row items-center w-full">
                  {/* Center Circle on Line */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-[var(--color-stone)] border-2 border-[var(--color-brass)] text-[var(--color-brass)] flex items-center justify-center font-serif text-lg font-bold z-10 -translate-x-1/2 md:translate-x-[-50%]">
                    {step.step}
                  </div>

                  {/* Desktop Layout - Alternating Cards */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}>
                    <div className="relative bg-white/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      {/* Connecting Horizontal Line (Desktop only) */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-px bg-[var(--color-brass)]/40 
                        ${isEven ? "right-[-4rem]" : "left-[-4rem]"}
                      `} />
                      
                      <h3 className="text-2xl font-serif mb-4 text-[var(--color-charcoal)]">
                        {step.title}
                      </h3>
                      <p className="text-[var(--color-warm-grey)] leading-relaxed text-base font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

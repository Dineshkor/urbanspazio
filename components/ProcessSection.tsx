'use client';

import React from 'react';
import { PROCESS_STEPS } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            how it works
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            FROM VISION TO REALITY
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            A structured, 4-step architectural journey from initial concept ideation to final white-glove handover.
          </p>
        </div>

        {/* ── Horizontal Box Grid (Modeled directly after Style Coached by Eve reference) ── */}
        <div className="border border-[var(--color-charcoal)]/30 bg-[#F6F2EC] p-8 sm:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--color-charcoal)]/15">
            {PROCESS_STEPS.map((step, index) => {
              const stepNum = `0${index + 1}`;

              return (
                <div key={step.step || index} className={`flex flex-col items-start text-left ${index > 0 ? 'pt-8 lg:pt-0 lg:pl-8' : ''}`}>
                  <span className="text-4xl sm:text-5xl font-serif text-gold-metallic font-light mb-3">
                    {stepNum}
                  </span>

                  <h3 className="text-lg sm:text-xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] mb-2 font-semibold">
                    {step.title}
                  </h3>

                  <p className="text-xs font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered CTA Action */}
        <div className="flex justify-center">
          <a href="#consultation" className="btn-filled text-[10px]">
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}

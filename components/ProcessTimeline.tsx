'use client';

import React from 'react';
import { PROCESS_STEPS } from '@/lib/portfolio-data';
import { Clock, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export default function ProcessTimeline() {
  return (
    <section className="py-20 sm:py-28 bg-[#121214] text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 mb-3 block">
            Process Transparency
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            How We Execute Your Home Suite
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Zero hidden surprises. We name every material brand, hardware tier, and lighting channel before a single board is cut.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-stone-900/60 rounded-2xl p-6 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all"></div>
              
              <div>
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    STEP {step.step}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {step.duration}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-stone-100 mb-3 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2 pt-4 border-t border-stone-800/80">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Transparency Banner */}
        <div className="mt-16 bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-stone-100">
                100% Genuine Partner Brand Hardware
              </h4>
              <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                We specify original German & Austrian fittings: <strong>Hettich</strong>, <strong>Hafele</strong>, <strong>Merino Luvih</strong>, <strong>Caesarstone</strong>, and <strong>CenturyPly BWP Marine</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 px-4 py-2 rounded-xl bg-stone-950 border border-stone-800">
              10-Year Factory Warranty
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

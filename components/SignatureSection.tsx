'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SIGNATURE_PILLARS } from '@/lib/portfolio-data';
import { Sparkles, CheckCircle2, ChevronRight, Zap, Shield, Grid, Layers } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  Layers: Layers,
  Shield: Shield,
  Grid: Grid,
};

export default function SignatureSection() {
  const [activePillar, setActivePillar] = useState(SIGNATURE_PILLARS[0]);

  return (
    <section id="signature" className="py-20 sm:py-28 bg-[#121214] border-t border-b border-stone-800/80 relative overflow-hidden">
      {/* Background ambient LED glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-3 block">
            Our Distinct Design Language
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            The Signature Look
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Most studios show ten different styles because they take any brief. We specialize in one iconic aesthetic: warm taupe high-gloss PU, solid black stone contrast, integrated 3000K lighting, and architectural fluted wood.
          </p>
        </div>

        {/* 4 Pillars Grid & Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Selector Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {SIGNATURE_PILLARS.map((pillar) => {
              const isSelected = activePillar.id === pillar.id;
              const IconComponent = iconMap[pillar.iconName as keyof typeof iconMap] || Sparkles;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(pillar)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-stone-900 border-amber-500/60 shadow-xl shadow-amber-950/20 translate-x-2'
                      : 'bg-stone-900/40 border-stone-800/60 hover:bg-stone-900/70 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-amber-400 font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/10">
                        {pillar.number}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-stone-100">
                        {pillar.title}
                      </h3>
                    </div>
                    <IconComponent
                      className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`}
                    />
                  </div>
                  <p className="mt-2 text-sm text-stone-400 font-medium">
                    {pillar.shortDesc}
                  </p>
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-semibold text-amber-400">
                      <span>Viewing Detail Breakdown</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Detail Showcase */}
          <div className="lg:col-span-7 bg-stone-900 rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Detail Text */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
                <Zap className="w-3.5 h-3.5" />
                Pillar {activePillar.number} Breakdown
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mb-3">
                {activePillar.title}
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {activePillar.description}
              </p>
            </div>

            {/* Middle Detail Photo */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-stone-800 shadow-inner group">
              <Image
                src={activePillar.detailShot}
                alt={activePillar.title}
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-3 left-4 right-4 text-xs font-mono text-amber-300 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 inline-block w-fit">
                Macro Detail Shot: Real Project Execution
              </div>
            </div>

            {/* Bottom Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activePillar.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-stone-950/60 p-3 rounded-xl border border-stone-800 text-stone-300 text-xs font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

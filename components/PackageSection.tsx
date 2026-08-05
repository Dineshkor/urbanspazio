'use client';

import React from 'react';
import { PACKAGE_SEGMENTS } from '@/lib/site-data';
import { ArrowRight, Check } from 'lucide-react';

export default function PackageSection() {
  return (
    <section id="packages" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-dark)] mb-2">
            investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            PACKAGES
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Transparent investment tiers designed for varying project scopes and luxury requirements.
          </p>
        </div>

        {/* ── 3 Investment Tier Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGE_SEGMENTS.map((tier) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`p-8 sm:p-10 flex flex-col justify-between border transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#1E1C1A] text-[var(--color-paper)] border-[#1E1C1A]'
                    : 'bg-[#F6F2EC] text-[var(--color-charcoal)] border-[var(--color-charcoal)]/20'
                }`}
              >
                <div>
                  {/* Tier Title */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-2xl font-serif uppercase tracking-[0.08em] font-semibold ${isPopular ? 'text-white' : 'text-[var(--color-charcoal)]'}`}>
                      {tier.tier} Tier
                    </h3>
                    {isPopular && (
                      <span className="px-2.5 py-0.5 bg-[var(--color-brass)] text-white text-[9px] uppercase tracking-[0.2em] font-semibold">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <p className={`text-xl sm:text-2xl font-serif mb-4 font-medium ${isPopular ? 'text-[var(--color-brass-light)]' : 'text-[var(--color-brass-dark)]'}`}>
                    {tier.range}
                  </p>

                  <p className={`text-xs font-helvetica leading-relaxed mb-6 font-light ${isPopular ? 'text-stone-300' : 'text-[var(--color-warm-grey)]'}`}>
                    {tier.description}
                  </p>

                  {/* Features list */}
                  <div className={`space-y-3 pt-6 border-t ${isPopular ? 'border-white/10' : 'border-[var(--color-charcoal)]/15'} mb-8`}>
                    {tier.includes.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-helvetica font-light">
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isPopular ? 'text-[var(--color-brass)]' : 'text-[var(--color-brass-dark)]'}`} />
                        <span className={isPopular ? 'text-stone-200' : 'text-[var(--color-charcoal)]'}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#consultation"
                  className={`w-full justify-center ${
                    isPopular
                      ? 'btn-outline-light text-[10px]'
                      : 'btn-outline text-[10px]'
                  }`}
                >
                  <span>Inquire Tier</span>
                  <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

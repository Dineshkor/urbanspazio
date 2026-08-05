'use client';

import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '@/lib/site-data';

export default function PortfolioSection() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredItems = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-24 lg:py-36 bg-[var(--color-linen)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass)] mb-2">
            our recent work
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            SPACES THAT SPEAK
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
        </div>

        {/* ── Minimal Filter Text Tabs ── */}
        <div className="flex justify-center gap-8 mb-16 border-b border-[var(--color-charcoal)]/15 pb-4">
          {(['all', 'residential', 'commercial'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-xs font-helvetica uppercase tracking-[0.2em] transition-all ${
                filter === tab
                  ? 'text-[var(--color-brass-dark)] font-semibold border-b border-[var(--color-brass)] pb-1'
                  : 'text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Spacious Portfolio Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredItems.slice(0, 4).map((item) => (
            <div key={item.id} className="group flex flex-col">
              {/* Photo Frame */}
              <div className="aspect-[4/3] overflow-hidden border border-[var(--color-cream)] bg-[var(--color-cream)] relative mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>

              {/* Minimal Caption Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.05em] font-medium">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-helvetica text-[var(--color-warm-grey)] uppercase tracking-[0.15em] mt-0.5 font-light">
                    {item.location} · {item.philosophy}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[var(--color-brass-dark)] group-hover:translate-x-1 transition-transform">
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

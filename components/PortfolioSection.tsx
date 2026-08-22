'use client';

import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';

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
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
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
              className={`cursor-pointer text-xs font-helvetica uppercase tracking-[0.2em] pb-1 border-b transition-colors duration-200 ${
                filter === tab
                  ? 'text-[var(--color-brass-dark)] font-semibold border-[var(--color-brass)]'
                  : 'text-[var(--color-warm-grey)] border-transparent hover:text-[var(--color-charcoal)]'
              }`}
            >
              {tab === 'all' ? 'All Work' : tab}
            </button>
          ))}
        </div>

        {/* ── Spacious Portfolio Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                `Hi Urbn Spazio! I loved the ${item.title} project and would like to enquire about a similar space.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col cursor-pointer"
            >
              {/* Photo Frame with hover veil */}
              <div className="aspect-[4/3] overflow-hidden bg-[var(--color-cream)] relative mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                {/* Charcoal veil + brass CTA on hover (desktop) */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#1E1C1A]/0 opacity-0 transition-all duration-500 group-hover:bg-[#1E1C1A]/55 group-hover:opacity-100">
                  <span className="px-5 py-2.5 border border-[var(--color-brass)] text-[var(--color-brass-light)] text-[10px] uppercase tracking-[0.25em] font-medium">
                    Enquire About This Space
                  </span>
                </div>
              </div>

              {/* Minimal Caption Info */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.05em] font-medium group-hover:text-[var(--color-brass-dark)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-helvetica text-[var(--color-warm-grey)] uppercase tracking-[0.15em] mt-0.5 font-normal">
                    {item.location} · {item.philosophy}
                  </p>
                </div>
                {/* Visible CTA hint — essential for touch devices where hover doesn't exist */}
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-medium text-[var(--color-brass-dark)] group-hover:translate-x-1 transition-transform">
                  Enquire →
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { PORTFOLIO_ITEMS } from '@/lib/site-data';

export default function PortfolioSection() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-20 lg:py-24 bg-[#FAF8F5] px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Compact Header */}
        <div className="mb-10 text-center">
          <span className="inline-block uppercase tracking-[0.2em] text-xs font-semibold text-[var(--color-brass-dark)] mb-2">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[var(--color-charcoal)]">
            Spaces That Speak
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {(['all', 'residential', 'commercial'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-xs font-helvetica uppercase tracking-wider font-semibold transition-all duration-300 ${
                filter === tab
                  ? 'bg-[var(--color-brass)] text-white shadow-md'
                  : 'bg-white text-[var(--color-charcoal)] border border-stone-300/60 hover:border-[var(--color-brass)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bento Grid — compact row height */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] sm:auto-rows-[220px] gap-3 sm:gap-4">
          {filteredItems.slice(0, 6).map((item, index) => {
            // Bento spanning: first item is the hero card
            const isLarge = index === 0;
            const isWide = index === 3;
            
            return (
              <div 
                key={item.id}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                  isLarge ? 'col-span-2 row-span-2' : isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-65 transition-opacity duration-400" />
                
                {/* Brass Border on Hover */}
                <div className="absolute inset-3 border border-[var(--color-brass)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-lg pointer-events-none" />

                {/* Content — compact padding */}
                <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
                  <span className="text-[var(--color-brass)] font-helvetica text-[10px] uppercase tracking-widest font-semibold mb-1 block">
                    {item.philosophy}
                  </span>
                  <h4 className="text-white font-serif text-lg sm:text-xl font-bold leading-snug mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-stone-300 font-helvetica text-xs">
                    {item.location}
                  </p>
                  
                  {/* Hover View Project */}
                  <p className="text-white font-helvetica text-[10px] tracking-wider uppercase mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 flex items-center gap-2">
                    View Project
                    <span className="w-5 h-[1px] bg-[var(--color-brass)] inline-block" />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

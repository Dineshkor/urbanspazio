'use client';

import { useState } from 'react';
import { PORTFOLIO_ITEMS } from '@/lib/site-data';

export default function PortfolioSection() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredItems = filter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[var(--color-warm-white)] px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-sm tracking-[0.2em] font-sans text-[var(--color-brass)] uppercase mb-4 font-semibold">
            Our Work
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)]">
            Spaces That Speak
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(['all', 'residential', 'commercial'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-sans uppercase tracking-wider transition-all duration-300 ${
                filter === tab
                  ? 'bg-[var(--color-brass)] text-white'
                  : 'bg-[var(--color-stone)] text-[var(--color-charcoal)] hover:bg-[#d6d0c4]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {filteredItems.slice(0, 6).map((item, index) => {
            // Creative bento spanning logic based on index
            const isLarge = index === 0;
            const isWide = index === 3;
            
            return (
              <div 
                key={item.id}
                className={`relative group overflow-hidden rounded-lg cursor-pointer ${
                  isLarge ? 'md:col-span-2 md:row-span-2' : isWide ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Brass Border on Hover */}
                <div className="absolute inset-4 border border-[var(--color-brass)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end">
                  <span className="text-[var(--color-brass)] font-sans text-xs uppercase tracking-widest mb-2 font-semibold">
                    {item.philosophy}
                  </span>
                  <h4 className="text-white font-serif text-2xl md:text-3xl mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[#E8E4DE] font-sans text-sm mb-4">
                    {item.location}
                  </p>
                  
                  {/* Hover View Project */}
                  <div className="overflow-hidden">
                    <p className="text-white font-sans text-sm tracking-wider uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-2">
                      View Project
                      <span className="w-6 h-[1px] bg-[var(--color-brass)] inline-block" />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

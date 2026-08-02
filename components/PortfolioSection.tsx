"use client";

import React, { useState } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/site-data";

type Filter = "all" | "residential" | "commercial";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section id="portfolio" className="py-24 bg-[var(--color-cream)]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="section-header mb-12">
          <span className="script-label">our recent work</span>
          <h2 className="serif-heading text-4xl md:text-5xl">Spaces That Speak</h2>
          <div className="divider-gold divider-gold--center"></div>
        </div>

        <div className="flex justify-center gap-8 mb-12">
          {(["all", "residential", "commercial"] as Filter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors pb-1 border-b ${
                activeFilter === filter
                  ? "text-[var(--color-brass-dark)] border-[var(--color-brass-dark)]"
                  : "text-[var(--color-charcoal)]/60 border-transparent hover:text-[var(--color-charcoal)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Make some items span 2 rows or columns for a bento grid effect
            let spanClasses = "";
            if (idx === 0) spanClasses = "col-span-2 row-span-2";
            else if (idx === 3) spanClasses = "row-span-2";
            else if (idx === 4) spanClasses = "col-span-2";

            return (
              <div 
                key={item.id} 
                className={`group relative overflow-hidden bg-[var(--color-dark)] ${spanClasses}`}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/30 to-transparent"></div>
                
                {/* Thin brass border on hover */}
                <div className="absolute inset-4 border border-[var(--color-brass)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-serif text-xl md:text-2xl text-white mb-1 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--color-brass)] text-xs uppercase tracking-widest">
                      {item.philosophy}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-cream)]/50"></span>
                    <span className="text-[var(--color-cream)]/70 text-xs font-light">
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-outline">View Full Portfolio</button>
        </div>
      </div>
    </section>
  );
}

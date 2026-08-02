'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/lib/site-data';

type Filter = 'all' | 'residential' | 'commercial';

const FILTERS: Filter[] = ['all', 'residential', 'commercial'];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const items = useMemo(
    () => PORTFOLIO_ITEMS.filter((item) => activeFilter === 'all' || item.category === activeFilter),
    [activeFilter],
  );

  return (
    <section id="portfolio" className="overflow-hidden bg-[var(--color-linen)] py-24 lg:py-32">
      <div className="editorial-shell">
        <header className="grid gap-6 border-t border-[var(--color-brass)] pt-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="font-script text-3xl text-[var(--color-brass)]">Selected spaces</span>
            <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">Work with a point of view.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-self-end">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`editorial-kicker border-b pb-2 transition-colors ${
                  activeFilter === filter
                    ? 'border-[var(--color-brass-dark)] text-[var(--color-brass-dark)]'
                    : 'border-transparent text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)]'
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="mt-16 grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-16">
          {items.map((item, index) => {
            const aspect = index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[3/4]';
            return (
              <article key={item.id} className={index % 3 === 1 ? 'lg:translate-y-16' : ''}>
                <div className={`editorial-image ${aspect}`}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-[var(--color-charcoal)]/20 pt-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[var(--color-charcoal)]">{item.title}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[var(--color-warm-grey)]">
                      {item.philosophy} / {item.location}
                    </p>
                  </div>
                  <a href="#contact" className="mt-0.5 text-[var(--color-brass-dark)]" aria-label={`Enquire about ${item.title}`}>
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

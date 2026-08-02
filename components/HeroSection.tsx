'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_PROJECTS = [
  {
    title: 'The Horizon Residence',
    philosophy: 'Modern Contemporary',
    area: '2,400 sq ft',
    scope: 'Full Home Design',
    image: '/images/projects/signature-kitchen-1.jpg',
  },
  {
    title: 'Japandi Living Suite',
    philosophy: 'Japandi',
    area: '1,800 sq ft',
    scope: '3BHK Redesign',
    image: '/images/themes/japandi.jpg',
  },
  {
    title: 'Victorian Heritage Home',
    philosophy: 'Neo Classical',
    area: '3,200 sq ft',
    scope: 'Heritage Restoration',
    image: '/images/themes/neoclassical.jpg',
  },
  {
    title: 'Biophilic Office Space',
    philosophy: 'Biophilic',
    area: '4,000 sq ft',
    scope: 'Commercial Fit-out',
    image: '/images/themes/biophilic.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((index) => (index + 1) % HERO_PROJECTS.length);
  }, []);

  const previous = useCallback(() => {
    setCurrent((index) => (index - 1 + HERO_PROJECTS.length) % HERO_PROJECTS.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(next, 6000);
    return () => window.clearInterval(timer);
  }, [next]);

  const project = HERO_PROJECTS[current];

  return (
    <section id="hero" className="relative overflow-hidden bg-[var(--color-linen)] pb-20 pt-28 lg:pb-28 lg:pt-36">
      <div className="editorial-shell">
        <div className="grid items-end gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="flex flex-col items-start pb-4 text-left lg:pb-14">
            <span className="font-script mb-3 text-3xl text-[var(--color-brass)]">
              Signature interiors
            </span>
            <h1 className="mb-5 max-w-xl font-bodoni-italic text-5xl leading-[0.94] text-[var(--color-charcoal)] sm:text-6xl lg:text-7xl">
              Spaces with a
              <br />
              <span className="text-[var(--color-brass-dark)]">considered point of view.</span>
            </h1>
            <div className="hairline mt-3 w-20" />
            <p className="mb-9 mt-6 max-w-md text-sm leading-7 text-[var(--color-warm-grey)]">
              A Delhi NCR interior design studio creating intentional homes and workspaces through
              material, proportion, and the details that make a space distinctly yours.
            </p>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a href="#consultation" className="btn-filled justify-center">
                Book Consultation
                <span className="opacity-70">Rs. 999</span>
                <ArrowRight className="size-3.5" />
              </a>
              <a href="#portfolio" className="btn-outline justify-center">
                Explore Portfolio
              </a>
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-x-5 gap-y-2">
              {['Japandi', 'Neo Classical', 'Contemporary', 'Biophilic'].map((style) => (
                <span key={style} className="editorial-kicker text-[var(--color-warm-grey)]">
                  {style}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex w-full justify-center">
            <div className="editorial-image relative aspect-[4/5] w-full lg:aspect-[5/6]">
              {HERO_PROJECTS.map((item, index) => (
                <div
                  key={item.title}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                  aria-hidden={index !== current}
                >
                  <img
                    src={item.image}
                    alt={index === current ? item.title : ''}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                </div>
              ))}

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                <div className="border-l-2 border-[var(--color-brass)] bg-[var(--color-paper)]/95 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="editorial-kicker mb-1 text-[var(--color-brass-dark)]">Featured project</p>
                      <h2 className="font-serif text-lg font-medium leading-snug text-[var(--color-charcoal)] sm:text-xl">
                        {project.title}
                      </h2>
                    </div>
                    <a
                      href="#portfolio"
                      className="flex size-9 shrink-0 items-center justify-center border border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] transition-colors hover:border-[var(--color-brass)] hover:text-[var(--color-brass-dark)]"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-warm-grey)]">
                    <span>{project.philosophy}</span>
                    <span>{project.area}</span>
                    <span>{project.scope}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={previous}
                className="absolute left-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/15 text-white transition-colors hover:bg-white hover:text-[var(--color-charcoal)]"
                aria-label="Previous project"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/15 text-white transition-colors hover:bg-white hover:text-[var(--color-charcoal)]"
                aria-label="Next project"
              >
                <ChevronRight className="size-4" />
              </button>

              <div className="absolute right-5 top-5 z-20 flex items-center gap-2 bg-black/25 px-3 py-2">
                <span className="text-[10px] font-medium tracking-[0.12em] text-white">
                  {String(current + 1).padStart(2, '0')}/{String(HERO_PROJECTS.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1">
                  {HERO_PROJECTS.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`h-1 transition-all ${
                        index === current ? 'w-5 bg-[var(--color-brass)]' : 'w-1.5 bg-white/55 hover:bg-white'
                      }`}
                      aria-label={`Show ${item.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function BrandStorySection() {
  return (
    <section id="story" className="py-24 bg-[var(--color-warm-white)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Image (55% = roughly 7 cols in a 12 col grid) */}
          <div className="lg:col-span-7 relative order-1 lg:order-none group">
            {/* Brass border accent offset */}
            <div className="absolute -inset-4 sm:-inset-6 border border-[var(--color-brass)]/50 translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 rounded-sm transition-transform duration-700 group-hover:translate-x-0 group-hover:translate-y-0" />
            
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/3] w-full overflow-hidden shadow-2xl rounded-sm">
              <img
                src="/images/brand-story.jpg"
                alt="Urban Spazio Interior Design Studio"
                loading="lazy"
                className="object-cover w-full h-full scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right: Narrative (45% = roughly 5 cols in a 12 col grid) */}
          <div className="lg:col-span-5 order-2 lg:order-none flex flex-col justify-center">
            <div className="inline-block mb-6">
              <span className="text-[var(--color-brass)] text-sm font-bold tracking-widest uppercase pb-1 border-b-2 border-[var(--color-brass)]">
                Our Story
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-serif text-[var(--color-charcoal)] mb-8 leading-tight">
              Designing Dreams <br /> Since Day One
            </h2>
            
            <div className="space-y-6 text-[var(--color-charcoal)]/80 text-lg leading-relaxed font-sans mb-12">
              <p>
                Urban Spazio was born from a simple belief: that Indian homes deserve world-class design that doesn&apos;t compromise on warmth or functionality. We saw a gap between purely aesthetic designs and the practical realities of daily life, and we set out to bridge it.
              </p>
              <p>
                Our journey began with a passion for understanding how spaces affect our moods, our routines, and our well-being. From navigating the complexities of civil work to sourcing the finest materials, we have built a studio that handles every detail with uncompromising dedication.
              </p>
              <p>
                Today, we are more than just interior designers. We are storytellers, crafting environments that reflect who you are and how you aspire to live. Every project is a new canvas, and our commitment to quality remains the heartbeat of everything we do.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--color-stone)]">
              <div>
                <p className="text-3xl font-serif text-[var(--color-brass)] mb-1">100+</p>
                <p className="text-sm text-[var(--color-charcoal)]/60 uppercase tracking-wide">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[var(--color-brass)] mb-1">4</p>
                <p className="text-sm text-[var(--color-charcoal)]/60 uppercase tracking-wide">Design Styles</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[var(--color-brass)] mb-1">50+</p>
                <p className="text-sm text-[var(--color-charcoal)]/60 uppercase tracking-wide">Happy Clients</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

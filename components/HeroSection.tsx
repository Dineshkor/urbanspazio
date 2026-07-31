import { BRAND } from '@/lib/constants';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* ── Top Editorial Header & Titles ── */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F3EFEA] border border-[var(--color-brass)]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-brass-dark)]" />
            <span className="font-handwriting text-xl text-[var(--color-brass-dark)] font-normal">
              Signature Studio
            </span>
          </div>

          {/* Main Title: URBAN SPAZIO */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tight text-[var(--color-charcoal)] mb-2 leading-[0.95]">
            URBAN{' '}
            <span className="text-gradient-brass inline-block">
              SPAZIO
            </span>
          </h1>

          {/* Handwriting Sub-heading */}
          <div className="font-handwriting text-3xl sm:text-5xl text-[var(--color-brass-dark)] mb-4">
            Bespoke & Minimalist Interiors
          </div>

          {/* Helvetica Light Tagline */}
          <p className="text-xs sm:text-sm font-helvetica uppercase tracking-[0.35em] text-[var(--color-charcoal)] font-normal mb-6">
            {BRAND.tagline}
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed mb-8">
            A luxury interior design studio curating serene, intentional spaces.
            Specializing in Japandi, Neo Classical, Modern Contemporary, and Biophilic aesthetics.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#consultation"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-helvetica font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90 shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--color-brass)' }}
            >
              <span>Book Consultation</span>
              <span className="text-[11px] font-normal opacity-90">₹999</span>
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-helvetica font-semibold uppercase tracking-wider text-[var(--color-charcoal)] border border-stone-300 hover:border-[var(--color-brass)] bg-white hover:bg-stone-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-xs"
            >
              Explore Portfolio
            </a>
          </div>
        </div>

        {/* ── Crisp Framed Showcase Photograph (No Blurs, No Fog) ── */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-100 aspect-[16/9] sm:aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-warm-premium.jpg"
            alt="Urban Spazio Luxury Interior Design Showcase"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
          
          {/* Subtle Bottom Vignette Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-none p-3.5 sm:px-6 rounded-2xl border border-stone-200/80 text-xs shadow-lg">
            <span className="font-helvetica font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">
              Signature Residence · Delhi NCR
            </span>
            <div className="flex items-center gap-2">
              {['Japandi', 'Neo Classical', 'Contemporary', 'Biophilic'].map((style) => (
                <span
                  key={style}
                  className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-helvetica uppercase tracking-wider text-[var(--color-warm-grey)] bg-stone-100 border border-stone-200"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-2 text-[var(--color-warm-grey)]">
          <span className="text-[9px] font-helvetica uppercase tracking-[0.35em]">
            Scroll to explore
          </span>
          <a href="#services" aria-label="Scroll to services">
            <ArrowDown className="w-4 h-4 animate-bounce text-[var(--color-brass)]" />
          </a>
        </div>

      </div>
    </section>
  );
}

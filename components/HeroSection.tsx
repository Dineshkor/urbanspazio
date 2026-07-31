import { BRAND } from '@/lib/constants';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-main.jpg"
          alt="Urban Spazio luxury interior"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        {/* Warm tint */}
        <div className="absolute inset-0 bg-[#3C2F27]/20 mix-blend-multiply" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className="block w-12 h-px"
            style={{ backgroundColor: 'var(--color-brass)' }}
          />
          <Sparkles className="w-4 h-4" style={{ color: 'var(--color-brass)' }} />
          <span
            className="block w-12 h-px"
            style={{ backgroundColor: 'var(--color-brass)' }}
          />
        </div>

        {/* Brand name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-wide text-white mb-4 leading-[0.9]">
          URBAN{' '}
          <span className="text-gradient-brass inline-block" style={{ WebkitTextFillColor: 'var(--color-brass-light)' }}>
            SPAZIO
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/80 mb-10 font-sans">
          {BRAND.tagline}
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/60 leading-relaxed mb-12 font-sans">
          Premium interior design studio specializing in Japandi, Neo Classical,
          Contemporary, and Biophilic aesthetics — for homes and workspaces that
          inspire.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#consultation"
            className="group w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--color-brass)' }}
          >
            <span>Book Consultation</span>
            <span className="text-xs font-normal opacity-70">₹999</span>
          </a>
          <a
            href="#portfolio"
            className="group w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-white border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Our Work
          </a>
        </div>

        {/* Design philosophy tags */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {['Japandi', 'Neo Classical', 'Contemporary', 'Biophilic'].map(
            (style) => (
              <span
                key={style}
                className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium text-white/50 border border-white/15"
              >
                {style}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
          Explore
        </span>
        <a href="#services" aria-label="Scroll to services">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

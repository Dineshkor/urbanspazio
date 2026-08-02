"use client";

import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Star } from "lucide-react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="bg-[var(--color-linen)] py-24 md:py-32">
      <div className="editorial-shell max-w-5xl text-center">
        <div className="border-t border-[var(--color-brass)] pt-5">
          <span className="font-script text-3xl text-[var(--color-brass)]">Kind words</span>
          <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">Lived in, loved well.</h2>
        </div>

        <div className="relative flex min-h-[300px] flex-col items-center justify-center pt-16 transition-opacity duration-500">
          <span className="absolute top-8 font-bodoni text-8xl leading-none text-[var(--color-brass)]/25 select-none">
            &ldquo;
          </span>
          
          <p className="relative z-10 mb-10 max-w-4xl font-bodoni-italic text-3xl leading-tight text-[var(--color-charcoal)] md:text-5xl">
            {current.quote}
          </p>

          <div className="flex space-x-1 mb-6 text-[var(--color-brass)]">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <div className="uppercase tracking-wider font-helvetica">
            <p className="text-sm font-bold text-[var(--color-charcoal)] mb-1">
              {current.author}
            </p>
            <p className="text-xs text-[var(--color-charcoal)] opacity-60">
              {current.project} &mdash; {current.location}
            </p>
          </div>
        </div>

        <div className="hairline mx-auto mt-12 mb-8 w-20" />

        <div className="flex justify-center space-x-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 transition-colors duration-300 ${
                idx === currentIndex ? "bg-[var(--color-brass)]" : "bg-[var(--color-charcoal)] opacity-20"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

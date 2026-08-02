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
    <section id="testimonials" className="py-24 md:py-32 bg-[var(--color-linen)]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="mb-12">
          <span className="font-script text-2xl text-[var(--color-brass)] block mb-2">kind words</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-charcoal)] uppercase tracking-wide">
            Reviews
          </h2>
        </div>

        <div className="divider-gold divider-gold--center mb-16" />

        <div className="relative min-h-[300px] flex flex-col items-center justify-center transition-opacity duration-500">
          <span className="font-serif text-[var(--color-brass)] text-8xl leading-none absolute -top-12 opacity-20 select-none">
            &ldquo;
          </span>
          
          <p className="font-serif italic text-2xl md:text-4xl text-[var(--color-charcoal)] leading-relaxed mb-12 relative z-10">
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

        <div className="divider-gold divider-gold--center mt-12 mb-8" />

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

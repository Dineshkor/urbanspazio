'use client';

import React from 'react';
import { REVIEWS } from '@/lib/portfolio-data';
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

export default function TestimonialSlider() {
  return (
    <section className="py-20 sm:py-28 bg-[#18181B] text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 mb-3 block">
            Verified Client Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            What Homeowners Say
          </h2>
          <p className="text-stone-400 text-base sm:text-lg">
            Real experiences from clients who entrusted their entire modular home suite to our single design signature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-amber-500/15 absolute top-6 right-6 pointer-events-none group-hover:text-amber-500/30 transition-colors" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-stone-200 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-stone-100 text-sm flex items-center gap-1.5">
                    {review.author}
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    {review.location}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  {review.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

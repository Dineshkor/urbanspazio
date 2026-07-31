'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/site-data';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28" style={{ backgroundColor: 'var(--color-warm-white)' }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 block"
            style={{ color: 'var(--color-brass)' }}
          >
            Questions & Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight" style={{ color: 'var(--color-charcoal)' }}>
            Frequently Asked
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: isOpen ? 'var(--color-brass)' : 'var(--color-stone)',
                  backgroundColor: isOpen ? 'white' : 'transparent',
                  boxShadow: isOpen ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className="text-sm sm:text-base font-semibold"
                    style={{ color: 'var(--color-charcoal)' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                    style={{
                      backgroundColor: isOpen ? 'var(--color-brass)' : 'var(--color-stone)',
                      color: isOpen ? 'white' : 'var(--color-warm-grey)',
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: 'var(--color-warm-grey)' }}
                    >
                      {faq.answer}
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

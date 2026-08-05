'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/site-data';
import { Plus, Minus } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-[var(--color-linen)] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell max-w-4xl">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass)] mb-2">
            common questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            FAQ
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
        </div>

        {/* ── Accordion List ── */}
        <div className="border-t border-b border-[var(--color-charcoal)]/15 divide-y divide-[var(--color-charcoal)]/15">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className={`font-serif text-lg sm:text-xl uppercase tracking-[0.05em] transition-colors ${isOpen ? 'text-[var(--color-brass-dark)] font-medium' : 'text-[var(--color-charcoal)] font-normal'}`}>
                    {faq.question}
                  </span>
                  <span className="text-[var(--color-brass-dark)] ml-4 shrink-0">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

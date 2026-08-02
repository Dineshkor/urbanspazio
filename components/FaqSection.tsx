"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site-data";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[var(--color-paper)] py-24 lg:py-32">
      <div className="editorial-shell max-w-5xl">
        
        <div className="mb-14 border-t border-[var(--color-brass)] pt-5">
          <span className="font-script text-3xl text-[var(--color-brass)]">Common questions</span>
          <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">The details, considered.</h2>
        </div>

        <div className="space-y-2 border-t border-[var(--color-brass)]/30">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-b border-[var(--color-brass)]/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="group flex w-full items-center justify-between py-6 text-left"
                >
                  <span className={`font-serif text-lg transition-colors sm:text-xl ${isOpen ? 'text-[var(--color-brass-dark)]' : 'text-[var(--color-charcoal)] group-hover:text-[var(--color-brass-dark)]'}`}>
                    {faq.question}
                  </span>
                  <span className="text-[var(--color-brass)] ml-4 flex-shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                  </span>
                </button>
                
                <div id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[var(--color-warm-grey)] font-helvetica text-sm sm:text-base leading-relaxed max-w-3xl">
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

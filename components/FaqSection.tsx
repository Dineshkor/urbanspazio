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
    <section id="faq" className="py-24 bg-[var(--color-linen)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="section-header mb-16">
          <span className="font-script text-2xl text-[var(--color-brass)] mb-2 block">
            common questions
          </span>
          <h2 className="serif-heading text-3xl sm:text-5xl mb-4">
            FAQ
          </h2>
          <div className="divider-gold divider-gold--center" />
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
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <span className={`text-lg sm:text-xl font-serif uppercase tracking-wider transition-colors ${isOpen ? 'text-[var(--color-brass-dark)]' : 'text-[var(--color-charcoal)] group-hover:text-[var(--color-brass-dark)]'}`}>
                    {faq.question}
                  </span>
                  <span className="text-[var(--color-brass)] ml-4 flex-shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                  </span>
                </button>
                
                <div 
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

'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';
import { FAQ_ITEMS } from '@/lib/site-data';
import { BRAND } from '@/lib/constants';
import { Plus, ArrowRight } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 lg:py-36 bg-[var(--color-linen)] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell max-w-4xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            Common Questions
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">faq</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
        </motion.div>

        {/* ── Accordion List (The Architectural Ledger) ── */}
        <div className="border-t border-b border-[var(--color-charcoal)]/15 divide-y divide-[var(--color-charcoal)]/15">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            const indexStr = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group/faq"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between py-6 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    {/* Architectural Index Counter */}
                    <span className="text-[11px] font-mono tracking-widest text-[var(--color-brass-dark)]/70 shrink-0 select-none">
                      {indexStr}
                    </span>

                    {/* Question Title with hover drift */}
                    <span
                      className={`font-serif text-lg sm:text-xl uppercase tracking-[0.05em] transition-all duration-300 group-hover/faq:translate-x-1.5 ${
                        isOpen
                          ? 'text-[var(--color-brass-dark)] font-medium'
                          : 'text-[var(--color-charcoal)] font-normal group-hover/faq:text-[var(--color-brass-dark)]'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Morphing Rotating Cross Icon */}
                  <motion.span
                    animate={{ rotate: isOpen && !reduce ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-4 shrink-0 p-1 transition-colors duration-300 ${
                      isOpen
                        ? 'text-[var(--color-brass-dark)]'
                        : 'text-[var(--color-charcoal)]/50 group-hover/faq:text-[var(--color-brass-dark)]'
                    }`}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>

                {/* Natural Spring Accordion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.28, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light pb-6 pl-8 sm:pl-11 pr-4 sm:pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Concierge WhatsApp Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 p-6 sm:p-8 bg-[var(--color-cream)]/50 border border-[var(--color-charcoal)]/12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <h4 className="font-serif text-lg text-[var(--color-charcoal)] font-medium">
              Have a unique spatial requirement?
            </h4>
            <p className="text-xs font-helvetica text-[var(--color-warm-grey)] mt-1 font-light">
              Speak directly with our principal design team for bespoke architectural consultations.
            </p>
          </div>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
              'Hi Urbn Spazio! I have a question about planning my interior design project.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/concierge shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-charcoal)] text-[var(--color-paper)] font-helvetica text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--color-brass-dark)] transition-colors duration-300"
          >
            <span>Ask on WhatsApp</span>
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/concierge:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import ConsultationForm from "@/components/ConsultationForm";
import { QUICK_CONSULTATION_PRICE, QUICK_CONSULTATION_DURATION } from "@/lib/constants";

export default function ConsultationSection() {
  return (
    <section id="consultation" className="panel-glow relative py-24 text-[var(--color-cream)] lg:py-32">
      <div className="editorial-shell max-w-5xl">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-light)] mb-2">
            a focused beginning
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-paper)] uppercase tracking-[0.1em] font-semibold">
            BOOK CONSULTATION
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="text-[var(--color-light-grey)] max-w-xl mx-auto text-xs sm:text-sm font-helvetica font-light">
            ₹{QUICK_CONSULTATION_PRICE} · {QUICK_CONSULTATION_DURATION} · Online Video Call Session
          </p>
        </div>

        <ConsultationForm />
      </div>
    </section>
  );
}
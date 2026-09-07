"use client";

import ConsultationForm from "@/components/ConsultationForm";
import { QUICK_CONSULTATION_PRICE, QUICK_CONSULTATION_DURATION } from "@/lib/constants";

export default function ConsultationSection() {
  return (
    <section id="consultation" className="panel-glow relative py-24 text-[var(--color-cream)] lg:py-32">
      <div className="editorial-shell max-w-5xl">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-light)] mb-5">
            A Focused Beginning
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-paper)] font-normal tracking-tight leading-tight">
            <span className="lowercase">book consultation</span>
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
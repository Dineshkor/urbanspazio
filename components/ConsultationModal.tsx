"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";

export default function ConsultationModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a Quick Design Consultation"
    >
      <div className="min-h-full flex items-center justify-center p-4 sm:p-8">
        <motion.div
          className="relative w-full max-w-2xl bg-[var(--color-paper)] border border-[var(--color-brass)]/40 shadow-2xl"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 pt-5 sm:px-8">
            <span className="font-script text-xl sm:text-2xl text-gold-metallic">book your consultation</span>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center border border-[var(--color-charcoal)]/20 text-[var(--color-warm-grey)] hover:border-[var(--color-brass)] hover:text-[var(--color-brass-dark)] transition-colors"
              aria-label="Close consultation booking"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <ConsultationForm />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
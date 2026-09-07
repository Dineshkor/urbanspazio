'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BRAND } from '@/lib/constants';
import { Mail, MessageCircle, MapPin, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-[#EAE3D9] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="editorial-shell">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.32em] font-medium text-[var(--color-brass-dark)] mb-5">
            Let&apos;s Connect
          </span>
          <h2 className="font-bodoni text-4xl sm:text-6xl lg:text-7xl text-[var(--color-charcoal)] font-normal tracking-tight leading-tight">
            <span className="lowercase">get in touch</span>
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            We work with select residential and commercial clients across Delhi NCR. Tell us about your vision.
          </p>
        </motion.div>

        {/* ── 2-Column Uncluttered Form + Info Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/20 pb-3 text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass-dark)] focus:outline-hidden rounded-none font-helvetica transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/20 pb-3 text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass-dark)] focus:outline-hidden rounded-none font-helvetica transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/20 pb-3 text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass-dark)] focus:outline-hidden rounded-none font-helvetica transition-colors"
                />
                <select
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/20 pb-3 text-xs sm:text-sm text-[var(--color-charcoal)] focus:border-[var(--color-brass-dark)] focus:outline-hidden rounded-none font-helvetica transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-[#EAE3D9] text-[var(--color-warm-grey)]">Project Type *</option>
                  <option value="Residential" className="bg-[#EAE3D9] text-[var(--color-charcoal)]">Residential</option>
                  <option value="Commercial" className="bg-[#EAE3D9] text-[var(--color-charcoal)]">Commercial</option>
                </select>
              </div>

              <textarea
                placeholder="Tell us about your project requirements..."
                rows={4}
                required
                className="w-full bg-transparent border-b border-[var(--color-charcoal)]/20 pb-3 text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass-dark)] focus:outline-hidden resize-none rounded-none font-helvetica transition-colors"
              />

              <button
                type="submit"
                className="group/btn inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-charcoal)] text-[var(--color-paper)] font-helvetica text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--color-brass-dark)] transition-colors duration-300 cursor-pointer"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Direct Studio Contact Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-6 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[var(--color-charcoal)]/15 space-y-8">
            <div>
              <h3 className="text-xl font-serif uppercase tracking-[0.1em] text-[var(--color-charcoal)] mb-6 font-medium">
                Studio Contact
              </h3>

              <div className="space-y-6 text-xs sm:text-sm font-helvetica text-[var(--color-charcoal)] font-normal">
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[var(--color-brass-dark)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] mb-0.5 font-medium">Direct Email</p>
                    <a href={`mailto:${BRAND.email}`} className="hover:text-[var(--color-brass-dark)] transition-colors">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-4 h-4 text-[var(--color-brass-dark)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] mb-0.5 font-medium">WhatsApp Studio Line</p>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Urbn%20Spazio!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-brass-dark)] transition-colors"
                    >
                      +{BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[var(--color-brass-dark)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] mb-0.5 font-medium">Service Region</p>
                    <p className="text-[var(--color-charcoal)]">Delhi NCR · New Delhi · Gurugram · Noida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-[var(--color-charcoal)]/15 flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">Follow Studio:</span>
              <a
                href={BRAND.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-charcoal)] hover:text-[var(--color-brass-dark)] transition-colors flex items-center gap-2 text-xs font-helvetica font-medium"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

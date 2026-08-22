'use client';

import React from 'react';
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
    <section id="contact" className="panel-glow py-24 lg:py-36 text-[var(--color-paper)] relative overflow-hidden">
      <div className="editorial-shell">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-light)] mb-2">
            let&apos;s connect
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-paper)] uppercase tracking-[0.1em] font-semibold">
            GET IN TOUCH
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-light-grey)] leading-relaxed font-light">
            We work with select residential and commercial clients across Delhi NCR. Tell us about your vision.
          </p>
        </div>

        {/* ── 2-Column Uncluttered Form + Info Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-xs sm:text-sm text-[var(--color-paper)] placeholder:text-[var(--color-light-grey)]/70 focus:border-[var(--color-brass)] focus:outline-hidden rounded-none font-helvetica"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-xs sm:text-sm text-[var(--color-paper)] placeholder:text-[var(--color-light-grey)]/70 focus:border-[var(--color-brass)] focus:outline-hidden rounded-none font-helvetica"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-xs sm:text-sm text-[var(--color-paper)] placeholder:text-[var(--color-light-grey)]/70 focus:border-[var(--color-brass)] focus:outline-hidden rounded-none font-helvetica"
                />
                <select
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-xs sm:text-sm text-[var(--color-light-grey)] focus:border-[var(--color-brass)] focus:outline-hidden rounded-none font-helvetica"
                >
                  <option value="" disabled className="bg-[var(--navbar-bg)]">Project Type *</option>
                  <option value="Residential" className="bg-[var(--navbar-bg)]">Residential</option>
                  <option value="Commercial" className="bg-[var(--navbar-bg)]">Commercial</option>
                </select>
              </div>

              <textarea
                placeholder="Tell us about your project requirements..."
                rows={4}
                required
                className="w-full bg-transparent border-b border-white/20 pb-3 text-xs sm:text-sm text-[var(--color-paper)] placeholder:text-[var(--color-light-grey)]/70 focus:border-[var(--color-brass)] focus:outline-hidden resize-none rounded-none font-helvetica"
              />

              <button type="submit" className="btn-outline-light text-[10px]">
                <span>Send Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Direct Studio Contact Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-6 lg:pt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 space-y-8">
            <div>
              <h3 className="text-xl font-serif uppercase tracking-[0.1em] text-[var(--color-paper)] mb-6">
                Studio Contact
              </h3>

              <div className="space-y-6 text-xs sm:text-sm font-helvetica text-[var(--color-light-grey)] font-normal">
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[var(--color-brass-light)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-light-grey)]/80 mb-0.5">Direct Email</p>
                    <a href={`mailto:${BRAND.email}`} className="hover:text-[var(--color-brass-light)] transition-colors">
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="w-4 h-4 text-[var(--color-brass-light)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-light-grey)]/80 mb-0.5">WhatsApp Studio Line</p>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Urban%20Spazio!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-brass-light)] transition-colors"
                    >
                      +{BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[var(--color-brass-light)] shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-light-grey)]/80 mb-0.5">Service Region</p>
                    <p>Delhi NCR · New Delhi · Gurugram · Noida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-light-grey)]/80">Follow Studio:</span>
              <a
                href={BRAND.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-light-grey)] hover:text-[var(--color-brass-light)] transition-colors flex items-center gap-2 text-xs font-helvetica"
              >
                <InstagramIcon size={16} />
                <span>Instagram</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

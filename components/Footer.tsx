'use client';

import React from 'react';
import { BRAND } from '@/lib/constants';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04101C] text-[var(--color-light-grey)] py-16 border-t border-[var(--color-brass)]/40">
      <div className="editorial-shell flex flex-col items-center text-center">
        
        {/* Official Transparent Monogram Logo Mark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="flex flex-col items-center group cursor-pointer"
          aria-label="Urbn Spazio Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-cropped.png"
                alt="Urbn Spazio Monogram"
            className="h-10 w-auto object-contain mb-3 bg-transparent transition-transform duration-300 group-hover:scale-105"
          />

          {/* Brand Display Title */}
          <h2 className="font-bodoni-italic text-3xl sm:text-4xl text-[var(--color-paper)] tracking-wide mb-2 font-normal">
            Urbn <span className="text-gold-metallic-light italic">Spazio</span>
          </h2>
        </a>

        <p className="text-[9px] uppercase tracking-[0.35em] text-[var(--color-light-grey)]/80 font-normal mb-6">
          {BRAND.tagline}
        </p>

        <div className="w-12 h-[1px] bg-[var(--color-brass)] opacity-40 mb-8" />

        {/* Minimal Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 text-[10px] uppercase tracking-[0.2em] font-helvetica text-[var(--color-light-grey)]/90">
          <a href="#hero" className="hover:text-[var(--color-paper)] transition-colors">Home</a>
          <a href="#services" className="hover:text-[var(--color-paper)] transition-colors">Services</a>
          <a href="#philosophy" className="hover:text-[var(--color-paper)] transition-colors">Philosophy</a>
          <a href="#portfolio" className="hover:text-[var(--color-paper)] transition-colors">Portfolio</a>
          <a href="#process" className="hover:text-[var(--color-paper)] transition-colors">Process</a>
          <a href="#story" className="hover:text-[var(--color-paper)] transition-colors">Story</a>
          <a href="#contact" className="hover:text-[var(--color-paper)] transition-colors">Contact</a>
        </div>

        {/* Copyright & Social */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-[10px] font-helvetica text-[var(--color-light-grey)]/70 tracking-wider">
          <p>© {currentYear} Urbn Spazio Interior Studio. All rights reserved.</p>
          <span className="hidden sm:inline">·</span>
          <a
            href={BRAND.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-brass-light)] transition-colors flex items-center gap-1.5"
            aria-label="Instagram"
          >
            <InstagramIcon size={14} />
            <span>@urban.spazio</span>
          </a>
        </div>

      </div>
    </footer>
  );
}

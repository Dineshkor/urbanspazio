'use client';

import React, { useState, useEffect } from 'react';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href)
    ).filter(Boolean) as Element[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = `#${entry.target.id}`;
            setActiveSection((prev) => (prev !== targetId ? targetId : prev));
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0E1A40]/95 backdrop-blur-md border-b border-[#946B2D]/40 py-4 shadow-xl'
          : 'bg-[#0E1A40] border-b border-[#946B2D]/25 py-5'
      }`}
    >
      <div className="editorial-shell flex items-center justify-between gap-4">
        {/* ── Brand Logo with Monogram & Luxury Cursive Script ── */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0 bg-transparent">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-cropped.png"
            alt="Urban Spazio Monogram"
            className="h-8 sm:h-9 w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-pinyon text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] tracking-wide leading-none pt-1 bg-transparent">
            Urban <span className="text-[#D8B97C]">Spazio</span>
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] xl:text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[#946B2D] border-b-2 border-[#946B2D] pb-1 font-semibold'
                    : 'text-[#FAF7F2]/85 hover:text-[#946B2D]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Action CTA Button in Bronze Gold (#946B2D) ── */}
        <div className="hidden lg:block shrink-0">
          <a
            href="#consultation"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#946B2D] text-[#946B2D] hover:bg-[#946B2D] hover:text-[#0E1A40] font-helvetica text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            Book Consultation
          </a>
        </div>

        {/* ── Mobile Hamburger Controls ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#FAF7F2] focus:outline-hidden"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[#946B2D]" /> : <Menu className="w-5 h-5 text-[#FAF7F2]" />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0E1A40] border-t border-[#946B2D]/35 px-6 py-8 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                  activeSection === link.href
                    ? 'text-[#946B2D]'
                    : 'text-[#FAF7F2]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#946B2D]/20">
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 bg-[#946B2D] text-[#0E1A40] font-semibold uppercase text-[10px] tracking-[0.2em]"
              >
                Book Consultation — ₹999
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

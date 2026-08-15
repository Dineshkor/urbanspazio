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
          ? 'bg-[#061E3D]/95 backdrop-blur-md border-b border-[#D8B97C]/35 py-4 shadow-xl'
          : 'bg-[#061E3D] border-b border-[#D8B97C]/20 py-5'
      }`}
    >
      <div className="editorial-shell flex items-center justify-between gap-4">
        {/* ── Brand Logo in Royal Midnight Navy + Liquid Gold ── */}
        <a href="#hero" className="flex flex-col group shrink-0">
          <span className="text-xl sm:text-2xl font-bodoni-italic tracking-wide font-normal text-[#FAF7F2]">
            Urban <span className="text-[#D8B97C] italic">Spazio</span>
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase font-light text-[#D8B97C]/70 -mt-0.5">
            Interior Design Studio
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
                    ? 'text-[#D8B97C] border-b-2 border-[#D8B97C] pb-1 font-semibold'
                    : 'text-[#FAF7F2]/85 hover:text-[#D8B97C]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Action CTA Button in Champagne Gold ── */}
        <div className="hidden lg:block shrink-0">
          <a
            href="#consultation"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#D8B97C] text-[#D8B97C] hover:bg-[#D8B97C] hover:text-[#061E3D] font-helvetica text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
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
          {mobileOpen ? <X className="w-5 h-5 text-[#D8B97C]" /> : <Menu className="w-5 h-5 text-[#FAF7F2]" />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#061E3D] border-t border-[#D8B97C]/30 px-6 py-8 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                  activeSection === link.href
                    ? 'text-[#D8B97C]'
                    : 'text-[#FAF7F2]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#D8B97C]/20">
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 bg-[#D8B97C] text-[#061E3D] font-semibold uppercase text-[10px] tracking-[0.2em]"
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

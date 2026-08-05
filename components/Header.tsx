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
          ? 'bg-[#F6F2EC]/95 backdrop-blur-xs border-b border-[#EAE3D9] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="editorial-shell flex items-center justify-between gap-4">
        {/* ── Brand Logo ── */}
        <a href="#hero" className="flex flex-col group shrink-0">
          <span className="text-lg sm:text-xl font-tan-paradiso tracking-[0.12em] font-normal uppercase text-[var(--color-charcoal)]">
            URBAN <span className="text-[var(--color-brass)]">SPAZIO</span>
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase font-light text-[var(--color-warm-grey)] -mt-0.5">
            Interior Design Studio
          </span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] xl:text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--color-brass-dark)] border-b border-[var(--color-brass)] pb-1'
                    : 'text-[var(--color-charcoal)]/80 hover:text-[var(--color-charcoal)]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Action CTA Button ── */}
        <div className="hidden lg:block shrink-0">
          <a href="#consultation" className="btn-outline text-[10px] px-4 xl:px-6">
            Book Consultation
          </a>
        </div>

        {/* ── Mobile Hamburger Controls ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--color-charcoal)] focus:outline-hidden"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F6F2EC] border-t border-[#EAE3D9] px-6 py-8">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors ${
                  activeSection === link.href
                    ? 'text-[var(--color-brass-dark)]'
                    : 'text-[var(--color-charcoal)]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#EAE3D9]">
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="btn-filled w-full justify-center text-[10px]"
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

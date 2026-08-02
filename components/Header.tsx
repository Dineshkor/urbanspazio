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
          ? 'bg-[var(--color-linen)]/97 border-b border-[var(--color-cream)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#hero" className="group">
          <span className="text-lg sm:text-xl font-bodoni-italic tracking-wide text-[var(--color-charcoal)]">
            Urban{' '}
            <span className="text-[var(--color-brass)]">Spazio</span>
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--color-brass)]'
                    : 'text-[var(--color-charcoal)] hover:text-[var(--color-brass)]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:block">
          <a href="#consultation" className="btn-outline text-[10px]">
            Book Consultation
          </a>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--color-charcoal)]"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[var(--color-linen)] border-t border-[var(--color-cream)] px-6 py-6">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 text-xs tracking-[0.12em] uppercase font-medium transition-colors ${
                  activeSection === link.href
                    ? 'text-[var(--color-brass)]'
                    : 'text-[var(--color-charcoal)]'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 btn-filled text-center text-[10px]"
            >
              Book Consultation — ₹999
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

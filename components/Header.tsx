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
          ? 'navbar-glow-scrolled backdrop-blur-md border-b border-[var(--navbar-border)] py-4 shadow-xl'
          : 'navbar-glow border-b border-[var(--navbar-border)] py-5'
      }`}
    >
      <div className="editorial-shell flex items-center justify-between gap-4">
        {/* ── Brand Logo: Monogram Only (Refreshes Page on Click) ── */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="flex items-center shrink-0 bg-transparent group cursor-pointer"
          aria-label="Urbn Spazio Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-cropped.png"
            alt="Urbn Spazio"
            className="h-9 sm:h-11 w-auto object-contain bg-transparent transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1.5 px-0.5 group inline-flex flex-col items-center justify-center whitespace-nowrap"
              >
                {/* Link Label with subtle micro-lift and color transition */}
                <span
                  className={`text-[10px] xl:text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ease-out group-hover:-translate-y-0.5 ${
                    isActive
                      ? 'text-[var(--navbar-text-accent)] font-semibold'
                      : 'text-[var(--navbar-text)]/80 font-medium group-hover:text-[var(--navbar-text-accent)]'
                  }`}
                >
                  {link.name}
                </span>

                {/* Expanding Architectural Gold Line with Soft Gradient */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                    isActive
                      ? 'scale-x-100 opacity-100 bg-gradient-to-r from-[var(--navbar-accent)]/20 via-[var(--navbar-accent)] to-[var(--navbar-accent)]/20 shadow-[0_0_8px_rgba(192,165,126,0.5)]'
                      : 'scale-x-0 opacity-0 bg-gradient-to-r from-transparent via-[var(--navbar-accent)] to-transparent group-hover:scale-x-100 group-hover:opacity-100 group-hover:shadow-[0_0_8px_rgba(192,165,126,0.4)]'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Action CTA Button in Gold Foil (#C5A25D) ── */}
        <div className="hidden lg:block shrink-0">
          <a
            href="#consultation"
            className="group relative isolate overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--navbar-accent)] text-[var(--navbar-accent)] font-helvetica text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:border-[var(--navbar-text-accent)] shadow-sm"
          >
            {/* Elegant upward gold fill on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[var(--navbar-accent)] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 -z-10"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--navbar-bg)]">
              Book Consultation
            </span>
          </a>
        </div>

        {/* ── Mobile Hamburger Controls ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[var(--navbar-text)] focus:outline-hidden"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5 text-[var(--navbar-accent)]" /> : <Menu className="w-5 h-5 text-[var(--navbar-text)]" />}
        </button>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden navbar-glow border-t border-[var(--navbar-border)]/35 px-6 py-6 shadow-2xl">
          <nav className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 py-2.5 px-3 border-l-2 flex items-center justify-between ${
                    isActive
                      ? 'text-[var(--navbar-text-accent)] border-[var(--navbar-accent)] bg-[var(--navbar-accent)]/10 font-semibold'
                      : 'text-[var(--navbar-text)]/85 border-transparent hover:text-[var(--navbar-text-accent)] hover:border-[var(--navbar-accent)]/50 hover:bg-[var(--navbar-accent)]/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--navbar-accent)] shadow-[0_0_6px_rgba(192,165,126,0.6)]" />
                  )}
                </a>
              );
            })}
            <div className="pt-4 border-t border-[var(--navbar-border)]/20">
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 bg-[var(--navbar-accent)] text-[var(--navbar-bg)] font-semibold uppercase text-[10px] tracking-[0.2em] hover:bg-[var(--navbar-bg-dark)] hover:text-[var(--navbar-text)] transition-all duration-300"
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

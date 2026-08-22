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
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] xl:text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--navbar-text-accent)] border-b-2 border-[var(--navbar-border)] pb-1 font-semibold'
                    : 'text-[var(--navbar-text)]/85 hover:text-[var(--navbar-text-accent)]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop Action CTA Button in Gold Foil (#C5A25D) ── */}
        <div className="hidden lg:block shrink-0">
          <a
            href="#consultation"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[var(--navbar-accent)] text-[var(--navbar-accent)] hover:bg-[var(--navbar-bg-dark)] hover:border-[var(--navbar-border)] font-helvetica text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            Book Consultation
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
        <div className="lg:hidden navbar-glow border-t border-[var(--navbar-border)]/35 px-6 py-8 shadow-2xl">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xs tracking-[0.2em] uppercase font-medium transition-colors hover:text-[var(--navbar-text-accent)] ${
                  activeSection === link.href
                    ? 'text-[var(--navbar-text-accent)]'
                    : 'text-[var(--navbar-text)]'
                }`}
              >
                {link.name}
              </a>
            ))}
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

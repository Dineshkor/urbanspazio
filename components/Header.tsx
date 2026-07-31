'use client';

import React, { useState, useEffect } from 'react';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import { Menu, X, MessageCircle } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver safely
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

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    'Hi Urban Spazio! I would like to inquire about your interior design services.'
  )}`;

  const isHeaderScrolled = mounted && scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isHeaderScrolled
          ? 'bg-white shadow-sm py-3 border-b border-stone-200/60'
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#hero" className="flex flex-col group">
          <span
            className="text-xl sm:text-2xl font-serif font-bold tracking-wide transition-colors duration-300"
            style={{ color: isHeaderScrolled ? 'var(--color-charcoal)' : 'white' }}
          >
            URBAN{' '}
            <span style={{ color: 'var(--color-brass)' }}>SPAZIO</span>
          </span>
          <span
            className="text-[9px] tracking-[0.35em] uppercase font-medium -mt-0.5 transition-colors duration-300"
            style={{ color: isHeaderScrolled ? 'var(--color-warm-grey)' : 'rgba(255,255,255,0.7)' }}
          >
            {BRAND.tagline}
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors duration-300"
                style={{
                  color: isActive
                    ? 'var(--color-brass)'
                    : isHeaderScrolled
                      ? 'var(--color-charcoal)'
                      : 'rgba(255,255,255,0.85)',
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-brass)' }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#consultation"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-brass)',
              color: 'white',
            }}
          >
            Book Consultation
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: isHeaderScrolled ? '#dcfce7' : 'rgba(255,255,255,0.15)',
              color: isHeaderScrolled ? '#16a34a' : 'white',
            }}
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* ── Mobile Controls ── */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-green-600 text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 transition-colors"
            style={{ color: isHeaderScrolled ? 'var(--color-charcoal)' : 'white' }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-1 shadow-lg">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color:
                    activeSection === link.href
                      ? 'var(--color-brass)'
                      : 'var(--color-charcoal)',
                  backgroundColor:
                    activeSection === link.href ? 'var(--color-stone)' : 'transparent',
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 mt-3 text-sm font-semibold uppercase tracking-wider rounded-full text-white"
              style={{ backgroundColor: 'var(--color-brass)' }}
            >
              Book Consultation — ₹999
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

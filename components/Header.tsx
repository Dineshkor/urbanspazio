'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const frame = window.requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-linen)]/95 border-b border-[var(--color-cream)] py-3 backdrop-blur-sm'
          : 'bg-[var(--color-linen)]/75 py-4 lg:bg-transparent lg:py-6'
      }`}
    >
      <div className="editorial-shell flex items-center justify-between">
        {/* ── Logo ── */}
        <a href="#hero" className="group">
          <span className="text-xl font-bodoni-italic text-[var(--color-charcoal)] sm:text-2xl">
            Urban{' '}
            <span className="text-[var(--color-brass)]">Spazio</span>
          </span>
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Primary navigation">
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
          className="p-2 text-[var(--color-charcoal)] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-cream)] bg-[var(--color-paper)] px-6 py-6 lg:hidden">
          <nav className="space-y-1" aria-label="Mobile navigation">
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

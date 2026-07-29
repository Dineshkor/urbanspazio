'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'The Signature', href: '/#signature' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services & Process', href: '/services' },
    { name: 'About Studio', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hi Urban Spazio! I am interested in discussing a modular interior project (Kitchen / Wardrobe / Media Suite)."
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121214]/90 backdrop-blur-md border-b border-amber-500/15 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#121214]/80 via-[#121214]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
            US
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-100 flex items-center gap-1.5">
              URBAN SPAZIO
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-medium">
              Signature Modular Interiors
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-800/80">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-stone-800/80 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact#estimate"
            className="text-xs uppercase tracking-wider font-semibold text-amber-300 hover:text-amber-200 px-3 py-2 border border-amber-500/30 rounded-lg hover:border-amber-400/60 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Get Estimate
          </Link>
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            WhatsApp Us
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-emerald-600 text-white"
            aria-label="WhatsApp Us"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121214] border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 mt-3 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-stone-200 hover:text-amber-400 hover:bg-stone-800/60"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/contact#estimate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold text-amber-300 border border-amber-500/40 rounded-lg bg-amber-500/10"
            >
              Calculate Project Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, Star, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const whatsappMessage = encodeURIComponent(
    "Hi Urban Spazio! I would like to schedule a studio consultation for my modular interior project."
  );

  return (
    <footer className="bg-[#0A0A0B] text-stone-300 border-t border-stone-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800/80">
          {/* Col 1: Brand Info & Trust Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-amber-900/30">
                US
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-100 flex items-center gap-1.5">
                  URBAN SPAZIO
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300 font-medium">
                  Signature Modular Interiors
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Specialist studio engineering signature modular kitchens, wardrobes, and media suites. Built with integrated 3000K LED profile lighting, high-gloss taupe PU finish, black quartz countertops, and fluted wood accents.
            </p>

            {/* Stated Plain Stats */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                <span className="font-serif font-bold text-lg text-amber-400 block">8+</span>
                <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Years Experience</span>
              </div>
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                <span className="font-serif font-bold text-lg text-amber-400 block">140+</span>
                <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Completed Homes</span>
              </div>
              <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800 text-center">
                <span className="font-serif font-bold text-lg text-amber-400 flex items-center justify-center gap-1">
                  4.9 <Star className="w-3.5 h-3.5 fill-amber-400" />
                </span>
                <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">Google Review</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/#signature" className="hover:text-amber-400 transition-colors">
                  The Signature Look
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-amber-400 transition-colors">
                  Portfolio & Home Suites
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors">
                  Services & Transparency
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Principal Designer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Studio Contact & Estimate
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Offerings */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200">
              Signature Offerings
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>Integrated LED Modular Kitchens</li>
              <li>Taupe High-Gloss Bedroom Wardrobes</li>
              <li>Fluted Wood Backlit Media Walls</li>
              <li>Black Quartz & Granite Worktops</li>
              <li>Full Room Single-Vendor Suites</li>
              <li>10-Year Factory Warranty</li>
            </ul>
          </div>

          {/* Col 4: Studio Contact & Locations */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200">
              Gurugram Studio
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Sector 54, Golf Course Road, Gurugram, Haryana 122002</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>design@urbanspazio.com</span>
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  Direct Studio WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Local Areas */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Urban Spazio Modular Studio. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>Service Areas: Gurugram</span>
            <span>•</span>
            <span>Golf Course Road</span>
            <span>•</span>
            <span>DLF Phase 1-5</span>
            <span>•</span>
            <span>Vasant Vihar</span>
            <span>•</span>
            <span>Greater Kailash</span>
            <span>•</span>
            <span>Noida</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

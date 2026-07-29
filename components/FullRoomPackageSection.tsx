'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FULL_HOME_PACKAGES } from '@/lib/portfolio-data';
import { Home, ArrowRight, ShieldCheck, Sparkles, CheckCircle } from 'lucide-react';

export default function FullRoomPackageSection() {
  const homePackage = FULL_HOME_PACKAGES[0];

  return (
    <section className="py-20 sm:py-28 bg-[#18181B] text-stone-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Home className="w-3.5 h-3.5" />
              Full Room, One Vendor
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 tracking-tight">
              One Cohesive Look Across Your Entire Home
            </h2>
          </div>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Instead of hiring separate vendors for your kitchen, wardrobe, and living media wall, we deliver your entire home set in a single coordinated design language with zero vendor friction.
          </p>
        </div>

        {/* Home Package Showcase Card */}
        <div className="bg-stone-900 rounded-3xl border border-stone-800 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-8 mb-8 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold block mb-1">
                Featured Complete Suite Case Study
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                {homePackage.name}
              </h3>
              <p className="text-stone-400 text-sm mt-1">
                {homePackage.location} • {homePackage.tagline}
              </p>
            </div>
            <Link
              href={`/portfolio?package=${homePackage.id}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
            >
              <span>Explore Complete Suite</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Matched Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homePackage.projects.map((item, idx) => (
              <div
                key={idx}
                className="group bg-stone-950/80 rounded-2xl overflow-hidden border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/30">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                      Matched Taupe & LED
                    </span>
                    <Link
                      href={`/portfolio/${item.slug}`}
                      className="text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Value Props */}
          <div className="mt-10 pt-8 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 text-xs text-stone-300 bg-stone-950/40 p-3.5 rounded-xl border border-stone-800">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Single Point of Contact for All Rooms</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300 bg-stone-950/40 p-3.5 rounded-xl border border-stone-800">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>100% Identical PU Color Code & Wood Grain</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-300 bg-stone-950/40 p-3.5 rounded-xl border border-stone-800">
              <Home className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Unified 10-Year Structural Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

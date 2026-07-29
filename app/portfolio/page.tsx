import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioGrid from '@/components/PortfolioGrid';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Portfolio | Urban Spazio Signature Modular Interiors',
  description: 'Explore modular kitchens, wardrobes, and TV media wall suites designed with integrated LED lighting, black quartz counters, and taupe high-gloss PU finish.',
};

export default function PortfolioPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; package?: string }>;
}) {
  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen font-sans">
      <Header />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#121214] border-b border-stone-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Realized Projects
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            Portfolio & Matched Home Suites
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every project showcases our signature design language: integrated warm 3000K LED lighting, high-gloss taupe cabinetry, black stone surfaces, and fluted wood accents.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGrid />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

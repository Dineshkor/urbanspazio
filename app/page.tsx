import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignatureSection from '@/components/SignatureSection';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FullRoomPackageSection from '@/components/FullRoomPackageSection';
import PortfolioGrid from '@/components/PortfolioGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import TestimonialSlider from '@/components/TestimonialSlider';
import EstimateForm from '@/components/EstimateForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import JsonLd from '@/components/JsonLd';
import { Sparkles, ArrowRight, ShieldCheck, Zap, MessageSquare, CheckCircle2, Award } from 'lucide-react';

export const metadata = {
  title: 'Urban Spazio | Signature Modular Kitchens, Wardrobes & Media Suites',
  description: 'Precision-engineered modular interiors with integrated warm 3000K LED profile lighting, glossy taupe PU finish, black quartz countertops, and fluted wood accents in Delhi NCR.',
};

export default function HomePage() {
  const heroWhatsAppMsg = encodeURIComponent(
    "Hi Urban Spazio! I am looking to design a signature modular kitchen / home package and would like to schedule a site measurement."
  );

  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen selection:bg-amber-500 selection:text-stone-950 font-sans">
      <JsonLd />
      <Header />

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Full-bleed Background Image with LED Ambient Lighting Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/signature-kitchen-1.jpg"
            alt="Urban Spazio Signature Kitchen with Integrated Warm LED Lighting"
            fill
            sizes="100vw"
            className="object-cover object-center scale-105 filter brightness-75 brightness-[0.7]"
            priority
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/60 to-[#0D0D0E]/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        {/* Hero Content Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Signature Modular Furniture Studio • Gurugram
          </div>

          {/* Positioning Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-stone-100 tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
            We Design the Light, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Not Just the Cabinet.
            </span>
          </h1>

          {/* Subheading / One-line positioning */}
          <p className="text-stone-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Specialist studio crafting cohesive modular kitchens, wardrobes, and media suites. Signature high-gloss taupe PU finish, black quartz countertops, fluted wood accents, and integrated 3000K warm LED illumination.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link
              href="/contact#estimate"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl shadow-amber-950/80 hover:scale-105 transition-all"
            >
              <span>Get Project Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/919876543210?text=${heroWhatsAppMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-stone-900/90 hover:bg-stone-800 backdrop-blur-md text-white border border-stone-700 px-7 py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>

          {/* Quick Trust Badges Below Hero */}
          <div className="mt-14 pt-8 border-t border-stone-800/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-stone-300">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Integrated LED Profiles</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Full-Room One Vendor</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Hettich & Hafele Hardware</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>10-Year Factory Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BEFORE / AFTER SLIDER MODULE (Flagship Trust Element) */}
      <section className="py-20 bg-[#121214] border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BeforeAfterSlider
            beforeImage="/images/projects/signature-kitchen-raw.jpg"
            afterImage="/images/projects/signature-kitchen-1.jpg"
            beforeLabel="Raw Construction (In-Progress)"
            afterLabel="Finished Signature Illumination"
            title="Real Transformation Proof"
            subtitle="From Raw Plaster & Concrete to Architectural Warm-LED Perfection"
            description="Drag the slider below to compare the raw site readiness state with our finished modular kitchen suite featuring black quartz counters, warm 3000K LED channels, and taupe high-gloss cabinetry."
          />
        </div>
      </section>

      {/* THE SIGNATURE MODULE */}
      <SignatureSection />

      {/* FULL ROOM, ONE VENDOR MODULE */}
      <FullRoomPackageSection />

      {/* PORTFOLIO GRID PREVIEW */}
      <section className="py-20 sm:py-28 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 mb-3 block">
              Featured Portfolio
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
              Explore Signature Projects
            </h2>
            <p className="text-stone-400 text-base">
              Filter by individual room category or view complete matched home suites.
            </p>
          </div>

          <PortfolioGrid />
        </div>
      </section>

      {/* PROCESS TRANSPARENCY */}
      <ProcessTimeline />

      {/* CLIENT REVIEWS */}
      <TestimonialSlider />

      {/* GET AN ESTIMATE TOOL */}
      <section className="py-20 sm:py-28 bg-[#18181B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

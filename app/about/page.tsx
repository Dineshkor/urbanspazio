import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Sparkles, Zap, ShieldCheck, Award, MessageSquare, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Principal Designer & Philosophy | Urban Spazio',
  description: 'Learn why Urban Spazio engineered its signature look around architectural LED lighting, warm taupe PU finish, black quartz, and fluted wood accents.',
};

export default function AboutPage() {
  const whatsappMsg = encodeURIComponent(
    "Hi Urban Spazio! I read about your design philosophy on the site and would like to connect directly with the team."
  );

  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen font-sans">
      <Header />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#121214] border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Studio Philosophy & Origin
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            Designing Light, Not Just Cabinets
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The story behind our signature look: why we stopped accepting generic briefs and focused on perfecting warm LED profile integration, high-gloss taupe lacquer, black stone contrast, and fluted wood.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: The Problem with Generic Studios */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
                The Observation
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                "Most vendors sell boxes and leave lighting to the electrician."
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                If you walk through standard modular furniture showrooms in India, you see the exact same template everywhere: catalog laminate cards, generic handles, and zero electrical planning. Homeowners end up with beautiful cabinets that cast harsh dark shadows over their countertops at night.
              </p>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                We realized that true luxury isn't just about expensive materials — it's about how light interacts with those materials. Under-cabinet warm LED strips, backlit glass displays, and cove lighting shouldn't be an afterthought added during civil work. They must be routed directly into the cabinet carcass during factory manufacturing.
              </p>
            </div>
            <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
              <Image
                src="/images/projects/signature-kitchen-3.jpg"
                alt="Under cabinet LED channel macro detail"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Section 2: Defining The Signature */}
          <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 border border-amber-500/30 space-y-6">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
              The Decision
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
              Mastering One Iconic Aesthetic Instead of Ten Generic Styles
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Most small studios claim they do "everything" — modern, rustic, industrial, traditional — because they fear losing a lead. We chose the opposite path: we defined a singular, highly refined signature look and engineered it to perfection.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                  <Zap className="w-4 h-4" />
                  3000K Warm LED Channels
                </div>
                <p className="text-xs text-stone-400">
                  Diffused warm lighting concealed in aluminum extrusions along every upper and lower cabinet run.
                </p>
              </div>
              <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-serif font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  High-Gloss Taupe PU Lacquer
                </div>
                <p className="text-xs text-stone-400">
                  Italian multi-coat PU finish that absorbs ambient warmth without reflecting harsh glares or fingerprints.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Full-Room Single Vendor Accountability */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl md:order-1">
              <Image
                src="/images/projects/signature-wardrobe-1.jpg"
                alt="Cohesive Master Wardrobe"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-4 md:order-2">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
                The Single-Vendor Promise
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                Full-Room Suite Cohesiveness
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                When you hire three different vendors for your kitchen, wardrobes, and TV media wall, your home ends up with mismatched wood tones, inconsistent handle finishes, and fragmented warranties.
              </p>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Urban Spazio handles the entire set of primary living rooms as one unified suite. You get one dedicated project manager, one factory batch run for matching materials, and one comprehensive 10-year warranty.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Connect with Principal Designer on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

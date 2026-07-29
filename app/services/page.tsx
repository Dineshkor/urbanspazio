import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcessTimeline from '@/components/ProcessTimeline';
import EstimateForm from '@/components/EstimateForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Sparkles, CheckCircle2, ArrowRight, Shield, Zap, Layers, Grid } from 'lucide-react';

export const metadata = {
  title: 'Services & Execution Process | Urban Spazio',
  description: 'Full room modular furniture execution across kitchens, wardrobes, and TV units with integrated LED lighting and high-gloss taupe PU finish.',
};

export default function ServicesPage() {
  const services = [
    {
      id: 'kitchens',
      title: 'Integrated LED Modular Kitchens',
      tagline: 'Parallel, L-Shape & U-Shape Layouts with Fluted Island Counters',
      desc: 'We design the light alongside the cabinetry. Under-cabinet aluminum profile LED strips illuminate your black quartz counters without shadow lines, paired with high-gloss taupe PU shutters and soft-close German hardware.',
      image: '/images/projects/signature-kitchen-1.jpg',
      features: [
        '3000K warm anti-glare profile LED strips',
        'Multi-coat Italian PU lacquer finish',
        'Black quartz counters with mitered waterfall edge',
        'Hettich InnoTech Atira tandem drawer boxes'
      ]
    },
    {
      id: 'wardrobes',
      title: 'Taupe High-Gloss Bedroom Wardrobes',
      tagline: 'Floor-to-Ceiling Storage with Proximity Sensor Illumination',
      desc: 'Sleek floor-to-ceiling wardrobes built with BWP marine plywood, taupe PU shutters, and fluted wood surround frames matching your living room media wall.',
      image: '/images/projects/signature-wardrobe-1.jpg',
      features: [
        'Proximity-sensor automatic LED interior bars',
        'Hafele soft-close sliding / hinged mechanisms',
        'Integrated jewelry organizers & concealed safes',
        'Fluted wood slat accent paneling'
      ]
    },
    {
      id: 'tv-units',
      title: 'Fluted Wood TV & Media Walls',
      tagline: 'Backlit Architectural Feature Walls & Floating Consoles',
      desc: 'Living room feature media walls engineered with solid wood fluted slats, perimeter LED cove lighting, and floating taupe cabinetry with zero visible wires.',
      image: '/images/projects/signature-tv-unit-1.jpg',
      features: [
        'Precision CNC fluted wood slat backdrop',
        'Perimeter warm LED cove lighting',
        'Floating console with black quartz top',
        'Concealed internal cable conduit raceways'
      ]
    },
    {
      id: 'full-home',
      title: 'Full Room Cohesive Home Suites',
      tagline: 'Kitchen + Wardrobe + TV Unit as One Coordinated Package',
      desc: 'One point of contact for all primary living spaces. Identical wood tone, matching black quartz accents, and consistent lighting warmth across your home.',
      image: '/images/projects/signature-kitchen-2.jpg',
      features: [
        'Single point of contact & unified timeline',
        '100% matched PU lacquer & fluted wood stains',
        'Zero vendor friction or blame-shifting',
        'Unified 10-year factory warranty'
      ]
    }
  ];

  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen font-sans">
      <Header />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#121214] border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Full Scope Capabilities
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            Services & Execution Process
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From single room transformations to complete cohesive home suites, every service is executed under our signature design language.
          </p>
        </div>
      </section>

      {/* 4 Service Offerings List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800 ${
                idx % 2 === 1 ? 'lg:order-2' : ''
              }`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>

              {/* Text Content */}
              <div className={`lg:col-span-6 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                    Service 0{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xs font-mono text-amber-300">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {service.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-stone-300 bg-stone-950 p-3 rounded-xl border border-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/portfolio?category=${service.id === 'kitchens' ? 'kitchen' : service.id === 'wardrobes' ? 'wardrobe' : 'tv-unit'}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
                  >
                    <span>View Completed {service.title} Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* ESTIMATE TOOL FORM */}
      <section className="py-20 bg-[#18181B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

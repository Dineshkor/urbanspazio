import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EstimateForm from '@/components/EstimateForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles, Building } from 'lucide-react';

export const metadata = {
  title: 'Contact & Studio Location | Urban Spazio',
  description: 'Visit our Gurugram studio or request a project estimate for your signature modular kitchen, wardrobe, or media suite.',
};

export default function ContactPage() {
  const whatsappMsg = encodeURIComponent(
    "Hi Urban Spazio! I would like to schedule an in-person consultation at your Gurugram studio."
  );

  return (
    <div className="bg-[#0D0D0E] text-stone-100 min-h-screen font-sans">
      <Header />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-[#121214] border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Connect With Our Studio
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100 mb-4 tracking-tight">
            Studio Location & Project Inquiry
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Visit our design studio on Golf Course Road, Gurugram or use our online estimate calculator to receive a qualified scope breakdown via WhatsApp.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Address */}
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100">
                Gurugram Studio Address
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Urban Spazio Studio, Sector 54, Golf Course Road, Gurugram, Haryana 122002
              </p>
              <p className="text-xs text-amber-400 font-mono">
                By Appointment Only • Parking Available
              </p>
            </div>

            {/* Direct WhatsApp */}
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-6 h-6 fill-emerald-400" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100">
                WhatsApp Fast Response
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Connect directly with our principal designer for quick layout feedback & site visit scheduling.
              </p>
              <div>
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hours & Phone */}
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-100">
                Hours & Direct Phone
              </h3>
              <div className="text-xs text-stone-300 space-y-1">
                <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                <p>Sun: By Prior Appointment</p>
                <p className="text-amber-400 font-mono font-bold pt-2">+91 98765 43210</p>
                <p className="text-stone-400">design@urbanspazio.com</p>
              </div>
            </div>
          </div>

          {/* ESTIMATE TOOL FORM */}
          <div className="max-w-4xl mx-auto">
            <EstimateForm />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

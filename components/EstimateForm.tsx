'use client';

import React, { useState } from 'react';
import { Sparkles, Calculator, Check, ArrowRight, ArrowLeft, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface StepData {
  rooms: string[];
  approxSize: string;
  finishTier: 'standard' | 'premium' | 'signature';
  lightingPreference: string;
  locationType: string;
  name: string;
  phone: string;
  city: string;
}

export default function EstimateForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<StepData>({
    rooms: ['Modular Kitchen'],
    approxSize: 'Medium (120 - 200 sq.ft)',
    finishTier: 'signature',
    lightingPreference: 'Full Integrated 3000K LED Strip & Cove Package',
    locationType: 'Gurugram / NCR',
    name: '',
    phone: '',
    city: 'Gurugram'
  });

  const roomOptions = [
    'Modular Kitchen',
    'Master Bedroom Wardrobe',
    'Living Room TV Media Wall',
    'Complete Cohesive Home Suite (Kitchen + Wardrobes + TV Unit)'
  ];

  const sizeOptions = [
    'Compact (Under 120 sq.ft)',
    'Medium (120 - 200 sq.ft)',
    'Large (200 - 350 sq.ft)',
    'Full Villa / Penthouse (350+ sq.ft)'
  ];

  const tierOptions = [
    {
      id: 'standard',
      title: 'Standard Tier',
      subtitle: 'Acrylic / Matte Laminate',
      desc: 'Hettich soft-close hinges, acrylic shutters, standard warm LED under-cabinet strip.'
    },
    {
      id: 'premium',
      title: 'Premium Tier',
      subtitle: 'Glossy Taupe Laminate & Quartz',
      desc: 'Hettich Tandem boxes, black quartz counter, integrated aluminum LED channels.'
    },
    {
      id: 'signature',
      title: 'Signature Tier (Recommended)',
      subtitle: 'High-Gloss PU + Fluted Wood + 3000K LED',
      desc: 'Multi-coat Italian PU lacquer, fluted wood slat accents, black quartz waterfall, Hafele Loox LED profiles.'
    }
  ];

  const toggleRoom = (room: string) => {
    if (formData.rooms.includes(room)) {
      if (formData.rooms.length > 1) {
        setFormData({ ...formData, rooms: formData.rooms.filter((r) => r !== room) });
      }
    } else {
      setFormData({ ...formData, rooms: [...formData.rooms, room] });
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi Urban Spazio! I filled out the Project Estimate Tool on your site:
- Room Scope: ${formData.rooms.join(', ')}
- Approx Size: ${formData.approxSize}
- Finish Tier: ${formData.finishTier.toUpperCase()}
- Lighting: ${formData.lightingPreference}
- Location: ${formData.city}
- Name: ${formData.name || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

Please provide a tentative consultation & budget breakdown.`;
    return encodeURIComponent(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="estimate" className="bg-[#121214] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Estimate Tool
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mb-2">
            Calculate Your Signature Scope
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm">
            Select your space parameters to receive a tailored scope & material specification via WhatsApp or Email.
          </p>
        </div>

        {/* Step Indicator */}
        {!submitted && (
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-800">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    step === s
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/20'
                      : step > s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-500'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className="text-xs font-medium text-stone-300 hidden sm:inline">
                  {s === 1 ? 'Space & Size' : s === 2 ? 'Finish Tier' : 'Lead Details'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && !submitted && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-3">
                1. Select Room(s) to Design:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roomOptions.map((room) => {
                  const selected = formData.rooms.includes(room);
                  return (
                    <button
                      type="button"
                      key={room}
                      onClick={() => toggleRoom(room)}
                      className={`p-4 rounded-xl text-left border text-xs font-semibold transition-all flex items-center justify-between ${
                        selected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span>{room}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-3">
                2. Approximate Carpet Area / Run Length:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sizeOptions.map((size) => {
                  const selected = formData.approxSize === size;
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setFormData({ ...formData, approxSize: size })}
                      className={`p-3.5 rounded-xl text-left border text-xs font-medium transition-all ${
                        selected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Continue to Finish Tier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && !submitted && (
          <div className="space-y-6">
            <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-3">
              Select Material & Lighting Finish Tier:
            </label>
            <div className="space-y-3">
              {tierOptions.map((tier) => {
                const selected = formData.finishTier === tier.id;
                return (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setFormData({ ...formData, finishTier: tier.id as any })}
                    className={`w-full p-5 rounded-2xl border text-left transition-all ${
                      selected
                        ? 'bg-amber-500/15 border-amber-500 text-stone-100 ring-2 ring-amber-500/30'
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif font-bold text-base text-stone-100 flex items-center gap-2">
                        {tier.title}
                        {tier.id === 'signature' && (
                          <span className="text-[10px] bg-amber-500 text-stone-950 font-sans font-bold px-2 py-0.5 rounded-full uppercase">
                            Signature
                          </span>
                        )}
                      </h4>
                      {selected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                    </div>
                    <p className="text-xs font-mono text-amber-400 mb-2">{tier.subtitle}</p>
                    <p className="text-xs text-stone-400 leading-relaxed">{tier.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Final Step: Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && !submitted && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-2">
                Your Full Name:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ananya Sharma"
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-2">
                  Phone / WhatsApp Number:
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold text-stone-300 tracking-wider mb-2">
                  City / Location:
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Gurugram / Delhi NCR"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Scope Summary Preview Box */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-xs space-y-1 text-stone-400 font-mono">
              <p className="text-amber-400 font-bold">Selected Scope Summary:</p>
              <p>Rooms: {formData.rooms.join(', ')}</p>
              <p>Tier: {formData.finishTier.toUpperCase()} (Taupe PU + 3000K LED + Black Stone)</p>
              <p>Size: {formData.approxSize}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-stone-400 hover:text-stone-200 text-xs font-medium flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/919876543210?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Send to WhatsApp
                </a>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        )}

        {/* SUBMITTED CONFIRMATION */}
        {submitted && (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-stone-100">
              Estimate Request Received!
            </h4>
            <p className="text-stone-300 text-sm max-w-md mx-auto">
              Thank you, {formData.name}! Our principal designer will review your space parameters ({formData.rooms.join(', ')}) and contact you within 4 hours.
            </p>
            <div className="pt-4">
              <a
                href={`https://wa.me/919876543210?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold text-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Chat Instantly on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

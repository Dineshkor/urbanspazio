"use client";

import { useState } from "react";
import { CheckCircle, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { BRAND, QUICK_CONSULTATION_PRICE, QUICK_CONSULTATION_DURATION } from "../lib/constants";

export default function ConsultationSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    spaceType: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(prev => Math.min(prev + 1, 4));
  };

  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      full: d.toISOString(),
      display: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
    };
  });

  return (
    <section id="consultation" className="py-24 section-dark relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[var(--color-brass)] text-sm font-bold tracking-widest uppercase mb-3">
            Book A Session
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-warm-white)] mb-4">
            Quick Design Consultation
          </h2>
          <p className="text-[var(--color-warm-grey)] text-lg">
            ₹{QUICK_CONSULTATION_PRICE} &middot; {QUICK_CONSULTATION_DURATION} &middot; Online
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-charcoal)] h-1 mb-12 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--color-brass)] transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Steps Container */}
        <div className="bg-[var(--color-charcoal)]/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-[var(--color-warm-grey)]/20 shadow-2xl min-h-[400px] flex flex-col justify-center">
          
          {/* STEP 1: Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name *"
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-white)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address *"
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-white)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="tel" 
                  required
                  placeholder="Phone Number *"
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-white)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <select 
                  required
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-grey)] focus:text-[var(--color-warm-white)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors [&>option]:bg-[var(--color-espresso)]"
                  value={formData.projectType}
                  onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="" disabled>Project Type *</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                <select 
                  required
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-grey)] focus:text-[var(--color-warm-white)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors [&>option]:bg-[var(--color-espresso)]"
                  value={formData.spaceType}
                  onChange={e => setFormData({ ...formData, spaceType: e.target.value })}
                >
                  <option value="" disabled>Space to Design *</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Full Home">Full Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
                <textarea 
                  required
                  placeholder="Briefly describe your requirements..."
                  rows={3}
                  className="w-full bg-transparent border-b border-[var(--color-warm-grey)]/40 text-[var(--color-warm-white)] placeholder:text-[var(--color-warm-grey)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors resize-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-[var(--color-brass)] text-white hover:bg-[var(--color-brass-dark)] transition-colors rounded-sm"
                >
                  Proceed to Payment <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[var(--color-espresso)] border border-[var(--color-brass)]/30 rounded-xl p-8 max-w-sm w-full text-center">
                <h3 className="font-serif text-2xl text-[var(--color-warm-white)] mb-2">Quick Design Consultation</h3>
                <p className="text-[var(--color-warm-grey)] mb-6 text-sm">{QUICK_CONSULTATION_DURATION} video call</p>
                <div className="text-4xl font-light text-[var(--color-brass)] mb-8">₹{QUICK_CONSULTATION_PRICE}</div>
                
                <button 
                  onClick={() => setStep(3)}
                  className="w-full py-4 text-white font-medium rounded-sm bg-gradient-to-r from-[var(--color-brass-dark)] to-[var(--color-brass-light)] hover:opacity-90 transition-opacity mb-4"
                >
                  Pay ₹{QUICK_CONSULTATION_PRICE}
                </button>
                <p className="text-xs text-[var(--color-warm-grey)]">Secure payment via Razorpay</p>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="mt-6 text-[var(--color-warm-grey)] hover:text-white text-sm"
              >
                Go Back
              </button>
            </div>
          )}

          {/* STEP 3: Pick a Time */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div>
                <h3 className="text-xl text-white mb-4">Select a Date</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {dates.map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(date.full)}
                      className={`flex-shrink-0 px-6 py-3 rounded-full border transition-all ${
                        selectedDate === date.full 
                          ? "border-[var(--color-brass)] bg-[var(--color-brass)] text-white" 
                          : "border-[var(--color-warm-grey)]/40 text-[var(--color-warm-grey)] hover:border-[var(--color-brass)]/50"
                      }`}
                    >
                      {date.display}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl text-white mb-4">Select a Time Slot</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-3 rounded border transition-all ${
                          selectedTime === time 
                            ? "border-[var(--color-brass)] bg-[var(--color-brass)]/20 text-[var(--color-brass)]" 
                            : "border-[var(--color-warm-grey)]/20 text-[var(--color-warm-white)] hover:border-[var(--color-brass)]/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 flex justify-between items-center">
                <button 
                  onClick={() => setStep(2)}
                  className="text-[var(--color-warm-grey)] hover:text-white"
                >
                  Back
                </button>
                <button 
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  className="px-8 py-3 bg-[var(--color-brass)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-brass-dark)] transition-colors rounded-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-[var(--color-sage)]/20 rounded-full flex items-center justify-center mb-6 text-[var(--color-sage)]">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-serif text-white mb-2">Booking Confirmed!</h3>
              <p className="text-[var(--color-warm-grey)] mb-8 max-w-md">
                Thank you, {formData.name || "there"}. You will receive a payment confirmation email and a video call scheduling email shortly.
              </p>
              
              <div className="bg-[var(--color-espresso)] border border-[var(--color-stone)]/10 rounded-lg p-6 w-full max-w-sm mb-8 text-left space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--color-warm-grey)]">Date</span>
                  <span className="text-white font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-[var(--color-warm-grey)]">Time</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-warm-grey)]">Amount Paid</span>
                  <span className="text-white font-medium">₹{QUICK_CONSULTATION_PRICE}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hi, I just booked a Quick Design Consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-sm hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle size={20} />
                  Continue on WhatsApp
                </a>
                <button 
                  onClick={() => {
                    setStep(1);
                    setFormData({ name: "", email: "", phone: "", projectType: "", spaceType: "", description: "" });
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className="px-6 py-3 border border-[var(--color-warm-grey)] text-white rounded-sm hover:bg-white/5 transition-colors"
                >
                  Book Another
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-[var(--color-warm-grey)]">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>Not ready for a consultation? No worries —</span>
            <span className="flex items-center gap-2">
              <a href="#contact" className="text-[var(--color-brass)] hover:underline">fill our general form</a>
              <span>or reach out via</span>
              <a 
                href={`https://wa.me/${BRAND.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#25D366] hover:opacity-80 transition-opacity"
              >
                WhatsApp
              </a>
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, MessageCircle, Download, Copy, Check, QrCode } from "lucide-react";
import { BRAND, QUICK_CONSULTATION_PRICE, QUICK_CONSULTATION_DURATION } from "@/lib/constants";

export default function ConsultationSection() {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
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

  const upiId = "8527567824@yescred";
  const payeeName = "Sonali Bachkheti";

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="consultation" className="relative bg-[var(--color-dark)] py-24 text-[var(--color-cream)] lg:py-32">
      <div className="editorial-shell max-w-5xl">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-script text-2xl sm:text-3xl text-[var(--color-brass-light)] mb-2">
            a focused beginning
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-paper)] uppercase tracking-[0.1em] font-semibold">
            BOOK CONSULTATION
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-brass)] my-4 opacity-40" />
          <p className="text-[var(--color-light-grey)] max-w-xl mx-auto text-xs sm:text-sm font-helvetica font-light">
            ₹{QUICK_CONSULTATION_PRICE} · {QUICK_CONSULTATION_DURATION} · Online Video Call Session
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center items-center mb-12 gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-8 h-8 flex items-center justify-center border ${step >= s ? 'border-[var(--color-brass)] text-[var(--color-brass)]' : 'border-white/20 text-white/50'} text-sm font-serif`}>
                {s}
              </div>
              {s < 4 && <div className={`w-8 h-px ${step > s ? 'bg-[var(--color-brass)]' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        {/* Steps Container */}
        <div className="relative z-10 flex min-h-[400px] flex-col justify-center border-y border-[var(--color-brass)]/45 bg-[var(--color-paper)] p-6 text-[var(--color-charcoal)] sm:p-10 md:p-12">
          
          {/* STEP 1: Details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name *"
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal)]/50 focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors rounded-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address *"
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal)]/50 focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors rounded-none"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="tel" 
                  required
                  placeholder="Phone Number *"
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal)]/50 focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors rounded-none"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <select 
                  required
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors rounded-none"
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
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors rounded-none"
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
                  className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal)]/50 focus:border-[var(--color-brass)] focus:outline-none pb-2 transition-colors resize-none rounded-none"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  className="btn-filled"
                >
                  Proceed to Payment <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: UPI Scanner & Payment */}
          {step === 2 && (
            <div className="flex flex-col items-center justify-center animate-in fade-in duration-500">
              <div className="bg-white border border-[var(--color-charcoal)]/10 p-6 sm:p-8 max-w-md w-full text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-brass)]/10 text-[var(--color-brass-dark)] text-xs font-medium uppercase tracking-wider mb-4 border border-[var(--color-brass)]/30">
                  <QrCode className="w-3.5 h-3.5" />
                  Scan to Pay ₹{QUICK_CONSULTATION_PRICE}
                </div>

                <h3 className="font-serif text-2xl text-[var(--color-charcoal)] mb-1 uppercase tracking-wider">
                  Consultation Fee
                </h3>
                <p className="text-[var(--color-warm-grey)] text-xs mb-5 font-helvetica">
                  Scan using Google Pay, PhonePe, Paytm, CRED or any UPI app
                </p>

                {/* QR Image Container */}
                <div className="relative bg-[var(--color-linen)] p-4 border border-[var(--color-charcoal)]/10 mb-5 flex flex-col items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/payment-qr.jpg"
                    alt="UPI Payment QR Code"
                    className="w-full max-w-[220px] h-auto object-contain border border-[var(--color-charcoal)]/10"
                  />
                  
                  {/* Download Button */}
                  <a
                    href="/images/payment-qr.jpg"
                    download="urban-spazio-upi-qr.jpg"
                    className="mt-4 text-xs font-medium text-[var(--color-brass-dark)] uppercase tracking-widest hover:text-[var(--color-charcoal)] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-3 h-3" />
                    Download QR
                  </a>
                </div>

                {/* Payee Info & Copy UPI */}
                <div className="bg-[var(--color-linen)] p-4 border border-[var(--color-charcoal)]/10 text-left space-y-3 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[var(--color-warm-grey)] uppercase tracking-wider">Account</span>
                    <span className="text-[var(--color-charcoal)] font-medium">{payeeName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-[var(--color-charcoal)]/10">
                    <span className="text-[var(--color-warm-grey)] uppercase tracking-wider">UPI ID</span>
                    <div className="flex items-center gap-2 font-mono text-[var(--color-brass-dark)] font-medium">
                      <span>{upiId}</span>
                      <button
                        onClick={copyUpi}
                        className="p-1 text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)] transition-colors"
                        title="Copy UPI ID"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* UTR Input / Confirmation */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="ENTER UTR / REF NO. (OPTIONAL)"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-transparent border-b border-[var(--color-charcoal)]/30 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-charcoal)]/50 pb-2 focus:border-[var(--color-brass)] focus:outline-none rounded-none text-center tracking-widest"
                  />

                  <button 
                    onClick={() => setStep(3)}
                    className="btn-filled w-full justify-center"
                  >
                    <span>Paid ₹{QUICK_CONSULTATION_PRICE} — Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setStep(1)}
                className="mt-6 text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)] text-xs uppercase tracking-widest transition-colors"
              >
                Go Back
              </button>
            </div>
          )}

          {/* STEP 3: Pick a Time */}
          {step === 3 && (
            <div className="animate-in fade-in duration-500 space-y-8">
              <div>
                <h3 className="text-xl text-[var(--color-charcoal)] font-serif mb-6 uppercase tracking-wider text-center">Select a Date</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
                  {dates.map((date, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(date.full)}
                      className={`flex-shrink-0 px-6 py-3 border transition-all rounded-none ${
                        selectedDate === date.full 
                          ? "border-[var(--color-brass)] bg-[var(--color-brass)] text-white" 
                          : "border-[var(--color-charcoal)]/20 text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] bg-transparent"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-widest">{date.display}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-xl text-[var(--color-charcoal)] font-serif mb-6 uppercase tracking-wider text-center">Select a Time</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-3 border transition-all rounded-none ${
                          selectedTime === time 
                            ? "border-[var(--color-charcoal)] bg-[var(--color-charcoal)] text-[var(--color-cream)]" 
                            : "border-[var(--color-charcoal)]/20 text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)] bg-transparent"
                        }`}
                      >
                        <span className="text-xs tracking-widest">{time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-8 flex justify-between items-center max-w-lg mx-auto w-full">
                <button 
                  onClick={() => setStep(2)}
                  className="text-[var(--color-warm-grey)] hover:text-[var(--color-charcoal)] text-xs uppercase tracking-widest"
                >
                  Back to Scanner
                </button>
                <button 
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  className="btn-filled disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
              <div className="mb-6 text-[var(--color-brass)]">
                <CheckCircle size={48} strokeWidth={1} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[var(--color-charcoal)] mb-3 uppercase tracking-wider">Booking Confirmed</h3>
              <p className="text-[var(--color-warm-grey)] mb-10 max-w-md text-sm font-helvetica">
                Thank you, {formData.name || "there"}. We look forward to designing your space. A confirmation email will follow shortly.
              </p>
              
              <div className="bg-[var(--color-linen)] border border-[var(--color-charcoal)]/10 p-6 w-full max-w-sm mb-10 text-left space-y-4 text-xs shadow-none">
                <div className="flex justify-between border-b border-[var(--color-charcoal)]/10 pb-3">
                  <span className="text-[var(--color-warm-grey)] uppercase tracking-widest">Date</span>
                  <span className="text-[var(--color-charcoal)] font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--color-charcoal)]/10 pb-3">
                  <span className="text-[var(--color-warm-grey)] uppercase tracking-widest">Time</span>
                  <span className="text-[var(--color-charcoal)] font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[var(--color-warm-grey)] uppercase tracking-widest">Amount Paid</span>
                  <span className="text-[var(--color-brass-dark)] font-semibold text-sm">₹{QUICK_CONSULTATION_PRICE}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md justify-center">
                <a 
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                    `Hi Urban Spazio! I have completed the ₹999 payment for Quick Design Consultation. Name: ${formData.name}, UTR: ${utrNumber || 'N/A'}, Date: ${new Date(selectedDate).toLocaleDateString()}, Time: ${selectedTime}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-filled flex-1 justify-center"
                >
                  <MessageCircle size={16} />
                  Send Proof
                </a>
                <button 
                  onClick={() => {
                    setStep(1);
                    setFormData({ name: "", email: "", phone: "", projectType: "", spaceType: "", description: "" });
                    setSelectedDate("");
                    setSelectedTime("");
                    setUtrNumber("");
                  }}
                  className="btn-outline flex-1 justify-center"
                >
                  Book Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

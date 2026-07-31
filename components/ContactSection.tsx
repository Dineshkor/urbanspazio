"use client";

import { useState } from "react";
import { MessageCircle, Mail, Camera, Users, Play, Briefcase, Send } from "lucide-react";
import { BRAND } from "../lib/constants";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[var(--color-stone)] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[var(--color-brass)] text-sm font-bold tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)] mb-4">
            Let&apos;s Create Something Beautiful
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side: Contact Form */}
          <div className="bg-[var(--color-warm-white)] p-8 md:p-10 rounded-lg shadow-lg">
            <h3 className="text-2xl font-serif text-[var(--color-charcoal)] mb-6">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-charcoal)]/80 mb-2">Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded focus:border-[var(--color-brass)] focus:ring-1 focus:ring-[var(--color-brass)] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-charcoal)]/80 mb-2">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded focus:border-[var(--color-brass)] focus:ring-1 focus:ring-[var(--color-brass)] outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-charcoal)]/80 mb-2">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded focus:border-[var(--color-brass)] focus:ring-1 focus:ring-[var(--color-brass)] outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-[var(--color-charcoal)]/80 mb-2">Project Type</label>
                  <select
                    id="project"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-transparent rounded focus:border-[var(--color-brass)] focus:ring-1 focus:ring-[var(--color-brass)] outline-none transition-all text-[var(--color-charcoal)]"
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--color-charcoal)]/80 mb-2">Message *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-transparent rounded focus:border-[var(--color-brass)] focus:ring-1 focus:ring-[var(--color-brass)] outline-none transition-all resize-none"
                  placeholder="Tell us about your space..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-brass)] text-white py-4 rounded font-medium hover:bg-[var(--color-brass-dark)] transition-colors"
              >
                <Send size={18} />
                Send Message
              </button>
              
              {isSubmitted && (
                <div className="p-4 bg-[var(--color-sage)]/20 text-[var(--color-sage)] rounded-md border border-[var(--color-sage)]/30 text-center animate-in fade-in zoom-in duration-300">
                  Thanks for reaching out! We&apos;ll get back to you shortly.
                </div>
              )}
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="bg-[var(--color-warm-white)] p-8 rounded-lg shadow-sm border-l-4 border-[#25D366] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#25D366]/10 rounded-full text-[#25D366]">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[var(--color-charcoal)] mb-2">WhatsApp</h4>
                  <p className="text-[var(--color-charcoal)]/70 mb-4 text-sm">
                    For general queries, feel free to reach out via WhatsApp. No consultation fee required.
                  </p>
                  <a 
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#25D366] font-medium hover:underline"
                  >
                    Chat with us &rarr;
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-warm-white)] p-8 rounded-lg shadow-sm border-l-4 border-[var(--color-brass)] hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--color-brass)]/10 rounded-full text-[var(--color-brass)]">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[var(--color-charcoal)] mb-2">Email Us</h4>
                  <p className="text-[var(--color-charcoal)]/70 mb-4 text-sm">
                    Prefer email? Drop us a line and our team will respond within 24 hours.
                  </p>
                  <a 
                    href={`mailto:${BRAND.email}`}
                    className="inline-flex items-center text-[var(--color-brass)] font-medium hover:underline"
                  >
                    {BRAND.email} &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h4 className="text-sm font-bold tracking-widest text-[var(--color-charcoal)] uppercase mb-6">
                Follow Our Journey
              </h4>
              <div className="flex flex-wrap gap-4">
                <a href={BRAND.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-warm-white)] rounded-full text-[var(--color-charcoal)] hover:bg-[var(--color-brass)] hover:text-white transition-colors" title="Instagram">
                  <Camera size={20} />
                </a>
                <a href={BRAND.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-warm-white)] rounded-full text-[var(--color-charcoal)] hover:bg-[var(--color-brass)] hover:text-white transition-colors" title="Facebook">
                  <Users size={20} />
                </a>
                <a href={BRAND.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-warm-white)] rounded-full text-[var(--color-charcoal)] hover:bg-[var(--color-brass)] hover:text-white transition-colors" title="YouTube">
                  <Play size={20} />
                </a>
                <a href={BRAND.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--color-warm-white)] rounded-full text-[var(--color-charcoal)] hover:bg-[var(--color-brass)] hover:text-white transition-colors" title="LinkedIn">
                  <Briefcase size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

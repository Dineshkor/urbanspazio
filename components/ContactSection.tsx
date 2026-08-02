import { BRAND } from "@/lib/constants";
import { ArrowRight, Mail, MessageCircle, MapPin } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[var(--color-dark)] text-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="section-header section-header--dark mb-16">
          <span className="font-script text-2xl text-[var(--color-brass)] mb-2 block">
            let&apos;s connect
          </span>
          <h2 className="serif-heading text-3xl sm:text-5xl mb-4">
            GET IN TOUCH
          </h2>
          <div className="divider-gold divider-gold--center" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-12">
          
          {/* Left: Form */}
          <div className="order-2 lg:order-1">
            <form className="space-y-8">
              <div>
                <input 
                  type="text" 
                  placeholder="NAME"
                  required
                  className="w-full bg-transparent border-b border-[var(--color-cream)]/30 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/50 focus:border-[var(--color-brass)] focus:outline-none py-3 transition-colors rounded-none text-xs uppercase tracking-widest font-helvetica"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="EMAIL"
                  required
                  className="w-full bg-transparent border-b border-[var(--color-cream)]/30 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/50 focus:border-[var(--color-brass)] focus:outline-none py-3 transition-colors rounded-none text-xs uppercase tracking-widest font-helvetica"
                />
              </div>
              <div>
                <textarea 
                  placeholder="MESSAGE"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-cream)]/30 text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/50 focus:border-[var(--color-brass)] focus:outline-none py-3 transition-colors resize-none rounded-none text-xs uppercase tracking-widest font-helvetica"
                ></textarea>
              </div>
              <button type="submit" className="btn-outline--light w-full justify-center mt-4">
                Send Message <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="order-1 lg:order-2 flex flex-col justify-center space-y-12">
            
            <div className="space-y-6">
              <h3 className="font-serif text-2xl uppercase tracking-widest text-[var(--color-cream)]">
                Studio
              </h3>
              <div className="space-y-4 text-sm font-helvetica text-[var(--color-cream)]/70">
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 hover:text-[var(--color-brass)] transition-colors">
                  <Mail size={18} strokeWidth={1.5} className="text-[var(--color-brass)]" />
                  <span className="tracking-wide">{BRAND.email}</span>
                </a>
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[var(--color-brass)] transition-colors">
                  <MessageCircle size={18} strokeWidth={1.5} className="text-[var(--color-brass)]" />
                  <span className="tracking-wide">{BRAND.phone}</span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin size={18} strokeWidth={1.5} className="text-[var(--color-brass)] mt-1 shrink-0" />
                  <span className="tracking-wide leading-relaxed">{BRAND.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg uppercase tracking-widest text-[var(--color-cream)] mb-6">
                Socials
              </h3>
              <div className="flex gap-6">
                <a 
                  href={BRAND.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--color-cream)]/70 hover:text-[var(--color-brass)] transition-colors"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

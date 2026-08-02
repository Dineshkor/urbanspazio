import { BRAND } from "@/lib/constants";
import { Mail } from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-cream)] pt-20 pb-10 border-t border-[var(--color-cream)]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Brand Name */}
        <h2 className="font-bodoni-italic text-4xl sm:text-5xl mb-6">
          {BRAND.name}
        </h2>
        
        <div className="divider-gold divider-gold--center mb-8" />

        {/* Small Nav Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12">
          {['Home', 'Services', 'Portfolio', 'Process', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)]/70 hover:text-[var(--color-brass)] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mb-16">
          <a 
            href={BRAND.socialLinks.instagram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--color-cream)]/50 hover:text-[var(--color-brass)] transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a 
            href={`mailto:${BRAND.email}`} 
            className="text-[var(--color-cream)]/50 hover:text-[var(--color-brass)] transition-colors"
            aria-label="Email"
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[9px] uppercase tracking-widest text-[var(--color-cream)]/40 font-helvetica">
          &copy; {currentYear} {BRAND.name}. All rights reserved. <br className="sm:hidden mt-2" /> Designed for modern living.
        </div>
        
      </div>
    </footer>
  );
}

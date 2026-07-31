import { BRAND } from '@/lib/constants';
import {
  Camera,
  Users,
  Play,
  Briefcase,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', href: BRAND.socialLinks.instagram, icon: Camera },
  { name: 'Facebook', href: BRAND.socialLinks.facebook, icon: Users },
  { name: 'YouTube', href: BRAND.socialLinks.youtube, icon: Play },
  { name: 'LinkedIn', href: BRAND.socialLinks.linkedin, icon: Briefcase },
];

const quickLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Design Philosophy', href: '#philosophy' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Our Process', href: '#process' },
  { name: 'Brand Story', href: '#story' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
    >
      {/* ── Brass accent line at top ── */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-brass), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              URBAN{' '}
              <span style={{ color: 'var(--color-brass)' }}>SPAZIO</span>
            </h3>
            <p
              className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6"
              style={{ color: 'var(--color-warm-grey)' }}
            >
              {BRAND.tagline}
            </p>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Crafting spaces that define how you live, work, and feel.
              Every project is a story — yours.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--color-brass)] hover:bg-[var(--color-brass)]/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
              style={{ color: 'var(--color-brass)' }}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-brass)' }} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Design Styles */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
              style={{ color: 'var(--color-brass)' }}
            >
              We Design In
            </h4>
            <ul className="space-y-3">
              {[
                'Japandi',
                'Neo Classical / Victorian',
                'Modern Contemporary',
                'Art Deco',
                'Biophilic',
              ].map((style) => (
                <li
                  key={style}
                  className="text-sm text-white/50"
                >
                  {style}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] font-semibold mb-6"
              style={{ color: 'var(--color-brass)' }}
            >
              Reach Out
            </h4>
            <div className="space-y-4">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brass)' }} />
                {BRAND.email}
              </a>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-brass)' }} />
                {BRAND.phone}
              </a>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--color-brass)' }} />
                <span>{BRAND.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Urban Spazio. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-red-400" /> for spaces that inspire
          </p>
        </div>
      </div>
    </footer>
  );
}

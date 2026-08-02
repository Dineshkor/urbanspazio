import { PACKAGE_SEGMENTS } from "@/lib/site-data";
import { BRAND } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function PackageSection() {
  return (
    <section id="packages" className="py-24 bg-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="section-header mb-16">
          <span className="font-script text-2xl text-[var(--color-brass)] mb-2 block">
            investment
          </span>
          <h2 className="serif-heading text-3xl sm:text-5xl mb-4">
            PACKAGES
          </h2>
          <div className="divider-gold divider-gold--center" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKAGE_SEGMENTS.map((pkg, index) => {
            const isMiddle = index === 1;
            return (
              <div 
                key={pkg.id} 
                className={`p-8 lg:p-12 border transition-all duration-300 flex flex-col ${
                  isMiddle 
                    ? 'bg-[var(--color-dark)] text-[var(--color-cream)] border-[var(--color-dark)]' 
                    : 'bg-transparent text-[var(--color-charcoal)] border-[var(--color-charcoal)]/20'
                }`}
              >
                {pkg.popular && (
                  <span className="text-[var(--color-brass)] text-[10px] uppercase tracking-[0.2em] mb-4 block font-semibold">
                    Most Popular
                  </span>
                )}
                
                <h3 className={`text-2xl font-serif uppercase tracking-widest mb-2 ${isMiddle ? 'text-[var(--color-cream)]' : 'text-[var(--color-charcoal)]'}`}>
                  {pkg.tier}
                </h3>
                
                <p className="text-[var(--color-brass)] font-helvetica text-sm uppercase tracking-wider mb-6">
                  {pkg.range}
                </p>
                
                <div className={`w-12 h-px mb-6 ${isMiddle ? 'bg-[var(--color-cream)]/20' : 'bg-[var(--color-charcoal)]/10'}`} />

                <p className={`text-sm leading-relaxed mb-8 font-helvetica ${isMiddle ? 'text-[var(--color-cream)]/70' : 'text-[var(--color-warm-grey)]'}`}>
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[var(--color-brass)] text-lg leading-none mt-0.5">•</span>
                      <span className={`text-sm font-helvetica ${isMiddle ? 'text-[var(--color-cream)]/90' : 'text-[var(--color-charcoal)]/80'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Urban Spazio! I am interested in the ${pkg.tier} package.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isMiddle ? 'btn-outline--light' : 'btn-outline'}
                >
                  Inquire Now <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

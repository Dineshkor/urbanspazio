import { PACKAGE_SEGMENTS } from '@/lib/site-data';
import { Check } from 'lucide-react';

export default function PackageSection() {
  return (
    <section id="packages" className="py-24 bg-[var(--color-stone)] px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-sm tracking-[0.2em] font-sans text-[var(--color-brass)] uppercase mb-4 font-semibold">
            Investment
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)]">
            Packages For Every Vision
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {PACKAGE_SEGMENTS.map((pkg) => {
            const isPopular = pkg.popular;

            return (
              <div 
                key={pkg.id}
                className={`relative flex flex-col bg-[var(--color-warm-white)] rounded-xl overflow-hidden ${
                  isPopular 
                    ? 'border-2 border-[var(--color-brass)] shadow-xl md:-translate-y-4 z-10' 
                    : 'border border-[#d6d0c4] shadow-md'
                }`}
              >
                {isPopular && (
                  <div className="bg-[var(--color-brass)] text-white text-center py-2 text-xs font-sans uppercase tracking-widest font-bold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8 md:p-10 flex-grow flex flex-col">
                  <h4 className="font-serif text-3xl text-[var(--color-charcoal)] mb-2">
                    {pkg.tier}
                  </h4>
                  <p className="font-sans text-[var(--color-brass)] font-semibold text-lg mb-6">
                    {pkg.range}
                  </p>
                  
                  <p className="font-sans text-[var(--color-warm-grey)] text-sm leading-relaxed mb-8 min-h-[60px]">
                    {pkg.description}
                  </p>
                  
                  <div className="w-full h-[1px] bg-[#d6d0c4] mb-8" />
                  
                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.includes.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[var(--color-brass)] shrink-0 mt-0.5" />
                        <span className="font-sans text-[var(--color-charcoal)] text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#contact"
                    className={`block w-full text-center py-4 rounded font-sans text-sm tracking-wider uppercase transition-colors duration-300 font-semibold ${
                      isPopular
                        ? 'bg-[var(--color-brass)] text-white hover:bg-[#a6864d]'
                        : 'bg-transparent border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white'
                    }`}
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

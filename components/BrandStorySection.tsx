import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function BrandStorySection() {
  return (
    <section id="story" className="bg-[var(--color-paper)] py-24 lg:py-32">
      <div className="editorial-shell grid items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-24">
        <div className="editorial-image aspect-[4/5] lg:aspect-[5/6]">
          <img src="/images/hero-warm-premium.jpg" alt="Urban Spazio studio interior" loading="lazy" />
        </div>
        <div className="max-w-xl">
          <span className="font-script text-3xl text-[var(--color-brass)]">Our point of view</span>
          <h2 className="mt-3 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">Luxury lives in the details.</h2>
          <div className="hairline mt-8 w-20" />
          <div className="mt-7 space-y-5 text-sm leading-7 text-[var(--color-warm-grey)]">
            <p>Urban Spazio brings a refined, editorial approach to modern living. We move beyond fleeting trends to create environments that are timeless and deeply personal.</p>
            <p>From the first concept to the final curated object, every element has a role in a coherent, liveable whole.</p>
          </div>
          <a href="#contact" className="btn-outline mt-9">Meet the studio <ArrowUpRight className="size-3.5" /></a>
          <p className="mt-10 font-script text-3xl text-[var(--color-charcoal)]">{BRAND.name}</p>
        </div>
      </div>
    </section>
  );
}

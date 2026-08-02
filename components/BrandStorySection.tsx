import { BRAND } from "@/lib/constants";

export default function BrandStorySection() {
  return (
    <section id="story" className="py-24 md:py-32 bg-[var(--color-linen)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <img 
                src="/images/hero-warm-premium.jpg" 
                alt="Urban Spazio Founder" 
                className="w-full h-auto arch-frame object-cover"
              />
            </div>
          </div>

          {/* Right Side: Narrative */}
          <div className="order-1 lg:order-2 flex flex-col items-start text-left">
            <span className="font-script text-2xl text-[var(--color-brass)] mb-2">nice to meet you</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-charcoal)] uppercase tracking-wide mb-6">
              Our Story
            </h2>
            <div className="w-16 h-px bg-[var(--color-brass)] mb-8" />
            
            <div className="font-helvetica text-[var(--color-charcoal)] opacity-80 leading-relaxed space-y-6 mb-10">
              <p>
                Founded on the belief that interior spaces shape our daily experiences, 
                Urban Spazio brings a refined, editorial approach to modern living. 
                We move beyond fleeting trends to create environments that are both 
                timeless and deeply personal.
              </p>
              <p>
                Our philosophy is simple: luxury is found in the details. From the initial 
                concept to the final curated object, we ensure every element serves a purpose 
                and contributes to a cohesive, harmonious whole.
              </p>
            </div>

            <div className="w-full flex justify-between items-end">
              <button className="btn-outline">
                Learn More
              </button>
              <span className="font-script text-3xl md:text-4xl text-[var(--color-charcoal)] pr-4">
                {BRAND.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

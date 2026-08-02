import { PROCESS_STEPS } from "@/lib/site-data";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[var(--color-cream)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="section-header mb-20 text-center">
          <span className="font-script text-2xl text-[var(--color-brass)] block mb-2">how it works</span>
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-charcoal)] uppercase tracking-wide">
            From Vision to Reality
          </h2>
          <div className="divider-gold divider-gold--center" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {PROCESS_STEPS.map((step, index) => (
            <div 
              key={step.step} 
              className={`flex-1 flex flex-col items-center text-center px-4 lg:px-6 ${
                index !== PROCESS_STEPS.length - 1 ? 'lg:border-r lg:border-[var(--color-brass)] lg:border-opacity-30' : ''
              }`}
            >
              <div className="font-serif text-6xl md:text-7xl font-light text-[var(--color-brass)] mb-6">
                {step.step}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-[var(--color-charcoal)] mb-4 uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="font-helvetica text-[var(--color-charcoal)] opacity-80 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

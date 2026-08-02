import { DESIGN_PHILOSOPHIES } from '@/lib/site-data';

export default function DesignPhilosophySection() {
  return (
    <section id="philosophy" className="bg-[var(--color-dark)] py-24 text-[var(--color-cream)] lg:py-32">
      <div className="editorial-shell">
        <header className="mb-16 grid gap-5 border-t border-[var(--color-brass)] pt-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <span className="font-script text-3xl text-[var(--color-brass-light)]">Our design language</span>
            <h2 className="mt-2 max-w-md font-bodoni text-5xl leading-none sm:text-6xl">Four philosophies, one vision.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[var(--color-cream)]/65 md:justify-self-end">
            Each project finds its own balance of material, light, and rhythm. These are the visual languages we return to most often.
          </p>
        </header>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {DESIGN_PHILOSOPHIES.map((philosophy, index) => (
            <article key={philosophy.id} className={index % 2 === 1 ? 'md:translate-y-16' : ''}>
              <div className="editorial-image aspect-[4/3]">
                <img src={philosophy.image} alt={philosophy.title} loading="lazy" />
              </div>
              <div className="mt-5 border-t border-white/20 pt-4">
                <span className="editorial-kicker text-[var(--color-brass-light)]">{philosophy.subtitle}</span>
                <h3 className="mt-3 font-bodoni text-4xl leading-none text-white">{philosophy.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-cream)]/70">{philosophy.description}</p>
                <p className="mt-5 text-xs leading-6 text-[var(--color-brass-light)]/85">
                  {philosophy.characteristics.slice(0, 3).join(' / ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

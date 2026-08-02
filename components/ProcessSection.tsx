import { PROCESS_STEPS } from '@/lib/site-data';

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[var(--color-paper)] py-24 lg:py-32">
      <div className="editorial-shell">
        <header className="mb-16 grid gap-5 border-t border-[var(--color-brass)] pt-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <div>
            <span className="font-script text-3xl text-[var(--color-brass)]">How it unfolds</span>
            <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">From vision to reality.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[var(--color-warm-grey)] md:justify-self-end">
            A clear, collaborative process brings every decision into focus before the final handover.
          </p>
        </header>
        <ol className="grid border-t border-[var(--color-charcoal)]/15 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <li key={step.step} className="border-b border-[var(--color-charcoal)]/15 px-0 py-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
              <span className="font-bodoni text-5xl leading-none text-[var(--color-brass)]">{step.step}</span>
              <h3 className="mt-7 font-serif text-xl font-medium text-[var(--color-charcoal)]">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-warm-grey)]">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

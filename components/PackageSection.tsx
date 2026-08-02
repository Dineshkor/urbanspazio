import { ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { PACKAGE_SEGMENTS } from '@/lib/site-data';

export default function PackageSection() {
  return (
    <section id="packages" className="bg-[var(--color-linen)] py-24 lg:py-32">
      <div className="editorial-shell">
        <header className="mb-16 grid gap-5 border-t border-[var(--color-brass)] pt-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <div>
            <span className="font-script text-3xl text-[var(--color-brass)]">Investment</span>
            <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">A scope to suit the space.</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[var(--color-warm-grey)] md:justify-self-end">
            Every project is scoped individually. These ranges provide a useful starting point for the conversation.
          </p>
        </header>
        <div className="grid border-y border-[var(--color-charcoal)]/15 md:grid-cols-3">
          {PACKAGE_SEGMENTS.map((pkg, index) => (
            <article key={pkg.id} className={`flex min-h-[31rem] flex-col px-0 py-9 md:px-8 md:first:pl-0 md:last:pr-0 ${index > 0 ? 'md:border-l md:border-[var(--color-charcoal)]/15' : ''}`}>
              <span className="editorial-kicker text-[var(--color-brass-dark)]">{pkg.popular ? 'Most requested' : `0${index + 1}`}</span>
              <h3 className="mt-6 font-bodoni text-4xl leading-none text-[var(--color-charcoal)]">{pkg.tier}</h3>
              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-[var(--color-brass-dark)]">{pkg.range}</p>
              <p className="mt-8 text-sm leading-7 text-[var(--color-warm-grey)]">{pkg.description}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {pkg.includes.map((item) => (
                  <li key={item} className="border-t border-[var(--color-charcoal)]/12 pt-3 text-xs leading-5 text-[var(--color-charcoal)]/75">{item}</li>
                ))}
              </ul>
              <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi Urban Spazio! I am interested in the ${pkg.tier} package.`)}`} target="_blank" rel="noopener noreferrer" className="btn-outline mt-10 w-fit">
                Start a conversation <ArrowUpRight className="size-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

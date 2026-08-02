'use client';

import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/site-data';
import { QUICK_CONSULTATION_PRICE } from '@/lib/constants';

const SERVICE_IMAGES = [
  '/images/themes/japandi.jpg',
  '/images/projects/signature-kitchen-1.jpg',
  '/images/themes/neoclassical.jpg',
  '/images/projects/signature-kitchen-2.jpg',
];

export default function ServicesSection() {
  const consultation = SERVICES.find((service) => service.id === 'quick-consultation');
  const services = SERVICES.filter((service) => service.id !== 'quick-consultation');

  return (
    <section id="services" className="bg-[var(--color-paper)] py-24 lg:py-32">
      <div className="editorial-shell">
        <header className="mb-16 grid gap-5 border-t border-[var(--color-brass)] pt-5 md:grid-cols-[0.7fr_1.3fr] md:items-end">
          <div>
            <span className="font-script text-3xl text-[var(--color-brass)]">How we can help</span>
            <h2 className="mt-2 font-bodoni text-5xl leading-none text-[var(--color-charcoal)] sm:text-6xl">Services</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[var(--color-warm-grey)] md:justify-self-end">
            From a focused first conversation to full execution, every engagement begins with how you
            want a space to feel and function.
          </p>
        </header>

        {consultation && (
          <article className="mb-24 grid overflow-hidden bg-[var(--color-dark)] text-[var(--color-cream)] lg:grid-cols-2">
            <div className="editorial-image min-h-80 lg:min-h-full">
              <img src="/images/themes/contemporary.jpg" alt="Contemporary interior consultation" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <span className="editorial-kicker text-[var(--color-brass-light)]">Private consultation</span>
              <h3 className="mt-5 max-w-md font-bodoni text-4xl leading-none text-white sm:text-5xl">
                {consultation.title}
              </h3>
              <p className="mt-5 text-sm uppercase tracking-[0.14em] text-[var(--color-brass-light)]">
                Rs. {QUICK_CONSULTATION_PRICE} / {consultation.duration}
              </p>
              <p className="mt-7 max-w-lg text-sm leading-7 text-[var(--color-cream)]/75">
                {consultation.description}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {consultation.deliverables.slice(0, 4).map((item) => (
                  <span key={item} className="border-t border-white/15 pt-3 text-xs leading-5 text-[var(--color-cream)]/80">
                    {item}
                  </span>
                ))}
              </div>
              <a href="#consultation" className="btn-outline--light mt-10 w-fit">
                Book the consultation <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </article>
        )}

        <div className="space-y-20 lg:space-y-28">
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            return (
              <article key={service.id} className={`grid items-center gap-9 lg:grid-cols-[0.18fr_0.82fr_1fr] lg:gap-12 ${reverse ? 'lg:[&>*:last-child]:order-2' : ''}`}>
                <span className="section-number hidden lg:block">0{index + 1}</span>
                <div className="editorial-image aspect-[4/5]">
                  <img src={SERVICE_IMAGES[index]} alt={service.title} loading="lazy" />
                </div>
                <div className="max-w-xl">
                  <span className="editorial-kicker text-[var(--color-brass-dark)]">0{index + 1} / {service.subtitle}</span>
                  <h3 className="mt-4 font-bodoni text-4xl leading-none text-[var(--color-charcoal)] sm:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-sm leading-7 text-[var(--color-warm-grey)]">{service.description}</p>
                  <ul className="mt-7 grid gap-x-7 gap-y-3 sm:grid-cols-2">
                    {service.deliverables.slice(0, 4).map((item) => (
                      <li key={item} className="border-t border-[var(--color-charcoal)]/15 pt-3 text-xs leading-5 text-[var(--color-charcoal)]/75">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={service.cta.action === 'consultation' ? '#consultation' : '#contact'} className="btn-outline mt-9">
                    {service.cta.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

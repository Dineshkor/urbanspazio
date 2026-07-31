import { TESTIMONIALS } from '@/lib/site-data';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-24 bg-[var(--color-warm-white)] px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative Quote */}
      <div className="absolute top-10 left-10 md:top-20 md:left-24 text-[20rem] font-serif text-[var(--color-brass)] opacity-10 leading-none select-none">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="text-sm tracking-[0.2em] font-sans text-[var(--color-brass)] uppercase mb-4 font-semibold">
            Client Love
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[var(--color-charcoal)] max-w-2xl">
            Words That Inspire Us
          </h3>
        </div>

        {/* Responsive Grid/Scroll */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={idx}
              className="min-w-[85vw] sm:min-w-[400px] md:min-w-0 snap-center bg-white p-8 md:p-10 rounded-lg shadow-sm border-t-[3px] border-[var(--color-brass)] flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-brass)] text-[var(--color-brass)]" />
                  ))}
                </div>
                
                <p className="font-serif italic text-lg md:text-xl text-[var(--color-charcoal)] leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="mt-auto">
                <h4 className="font-sans font-bold text-[var(--color-charcoal)] text-lg">
                  {testimonial.author}
                </h4>
                <p className="font-sans text-[var(--color-warm-grey)] text-sm mt-1">
                  {testimonial.project} &middot; {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { SERVICES } from "@/lib/site-data";
import { 
  Video, 
  PenTool, 
  Hammer, 
  ClipboardCheck, 
  Armchair, 
  ArrowRight,
  ChevronDown
} from "lucide-react";

// Map string icon names from data to actual Lucide components
const iconMap: Record<string, React.ElementType> = {
  Video,
  PenTool,
  Hammer,
  ClipboardCheck,
  Armchair,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[var(--color-warm-white)] text-[var(--color-charcoal)] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
          <span className="inline-block uppercase tracking-[0.15em] text-sm font-semibold text-[var(--color-brass)] mb-4">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[var(--color-charcoal)] leading-tight">
            Services Crafted Around You
          </h2>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || PenTool;
            const isFirst = index === 0;
            const stepNumber = `0${index + 1}`;

            // Stagger effect for standard grid (columns 2 and 3 shifted down on desktop)
            let staggerClass = "";
            if (!isFirst) {
              if (index % 3 === 1) staggerClass = "lg:mt-16";
              if (index % 3 === 2) staggerClass = "lg:mt-32";
              // On tablet (2 cols), shift even items
              if (index % 2 === 1) staggerClass += " md:mt-12 lg:mt-[inherit]"; 
            }

            return (
              <ServiceCard 
                key={service.id} 
                service={service} 
                IconComponent={IconComponent} 
                isFirst={isFirst} 
                stepNumber={stepNumber}
                className={staggerClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  service, 
  IconComponent, 
  isFirst, 
  stepNumber,
  className 
}: { 
  service: any, 
  IconComponent: any, 
  isFirst: boolean, 
  stepNumber: string,
  className: string 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group relative p-8 md:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2
        ${isFirst 
          ? "bg-[var(--color-espresso)] text-[var(--color-warm-white)] md:col-span-2 lg:col-span-1 border border-[var(--color-brass)]/20 shadow-xl" 
          : "bg-[var(--color-stone)] text-[var(--color-charcoal)] hover:shadow-xl"
        }
        ${className}
      `}
    >
      {/* Step Number Background */}
      <div className={`absolute top-4 right-6 text-7xl font-serif opacity-10 select-none pointer-events-none transition-opacity group-hover:opacity-20
        ${isFirst ? "text-[var(--color-brass)]" : "text-[var(--color-warm-grey)]"}
      `}>
        {stepNumber}
      </div>

      {/* Header & Icon */}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8
        ${isFirst ? "bg-[var(--color-brass)] text-[var(--color-espresso)]" : "bg-white text-[var(--color-brass)]"}
      `}>
        <IconComponent size={26} strokeWidth={1.5} />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif mb-2 pr-12">{service.title}</h3>
      <p className={`text-sm font-medium tracking-wide uppercase mb-6 
        ${isFirst ? "text-[var(--color-brass)]" : "text-[var(--color-sage)]"}
      `}>
        {service.subtitle}
      </p>

      {/* Description */}
      <p className={`mb-8 leading-relaxed
        ${isFirst ? "text-gray-300" : "text-[var(--color-warm-grey)]"}
      `}>
        {service.description}
      </p>

      {/* Deliverables Toggle (Mobile & Desktop) */}
      <div className="mb-8">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-2 text-sm font-medium tracking-wide transition-colors
            ${isFirst ? "text-white hover:text-[var(--color-brass)]" : "text-[var(--color-charcoal)] hover:text-[var(--color-brass)]"}
          `}
        >
          View Deliverables
          <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        
        <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}>
          <ul className={`overflow-hidden space-y-3 text-sm
            ${isFirst ? "text-gray-300" : "text-[var(--color-warm-grey)]"}
          `}>
            {service.deliverables.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brass)] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Price Badge (if first/quick consultation) */}
      {service.price && (
        <div className="mb-8">
          <span className="inline-block px-4 py-2 border border-[var(--color-brass)] text-[var(--color-brass)] rounded-full text-lg font-serif">
            {service.price}
          </span>
        </div>
      )}

      {/* CTA Button */}
      <a 
        href={service.cta.action === 'whatsapp' ? 'https://wa.me/919876543210' : '#consultation'}
        className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-full font-medium transition-all group/btn
          ${isFirst 
            ? "bg-[var(--color-brass)] text-[var(--color-espresso)] hover:bg-white" 
            : "bg-transparent border border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white"
          }
        `}
      >
        {service.cta.label}
        <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
      </a>
    </div>
  );
}

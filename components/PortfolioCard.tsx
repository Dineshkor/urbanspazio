'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/portfolio-data';
import { ArrowUpRight, Sparkles, MessageSquare, Layers, SlidersHorizontal } from 'lucide-react';

interface PortfolioCardProps {
  project: Project;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  const whatsappText = encodeURIComponent(
    `Hi Urban Spazio! I am viewing your project "${project.title}" on the portfolio site and would like to inquire about similar design & installation.`
  );

  return (
    <div className="group bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 hover:border-amber-500/40 transition-all duration-500 flex flex-col justify-between shadow-xl">
      {/* Cover Image & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80"></div>

        {/* Top Category Badge */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="bg-stone-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            {project.category.replace('-', ' ')}
          </span>
          {project.beforeAfterPair && (
            <span className="bg-emerald-950/85 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              Before/After Proof
            </span>
          )}
        </div>

        {/* Bottom Location */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-xs font-mono text-stone-300">
            {project.location} • {project.timeline}
          </span>
          <h3 className="text-xl font-serif font-bold text-stone-100 mt-0.5 group-hover:text-amber-300 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Details & Specs */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-stone-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {project.subtitle}
        </p>

        {/* Material Callouts */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.materials.slice(0, 3).map((mat, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono text-stone-300 bg-stone-950/80 px-2.5 py-1 rounded-md border border-stone-800/80"
            >
              {mat.brand}: {mat.name}
            </span>
          ))}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
          <Link
            href={`/portfolio/${project.slug}`}
            className="text-xs font-semibold text-stone-200 hover:text-amber-400 flex items-center gap-1 group/btn"
          >
            <span>View Full Specs & Gallery</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href={`https://wa.me/919876543210?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
            title="Inquire on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

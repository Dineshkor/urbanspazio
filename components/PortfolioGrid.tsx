'use client';

import React, { useState } from 'react';
import { Project, PROJECTS, FULL_HOME_PACKAGES } from '@/lib/portfolio-data';
import PortfolioCard from './PortfolioCard';
import { Grid, Layers, Sparkles, Filter } from 'lucide-react';

interface PortfolioGridProps {
  initialCategory?: string;
  initialPackage?: string;
}

export default function PortfolioGrid({ initialCategory = 'all', initialPackage }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [viewMode, setViewMode] = useState<'categories' | 'packages'>('categories');

  const categories = [
    { id: 'all', label: 'All Signature Projects' },
    { id: 'kitchen', label: 'Modular Kitchens' },
    { id: 'wardrobe', label: 'Bedroom Wardrobes' },
    { id: 'tv-unit', label: 'TV & Media Suites' },
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <div className="w-full">
      {/* Top Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id && viewMode === 'categories';
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setViewMode('categories');
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Category vs Full Home Package */}
        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 shrink-0">
          <button
            onClick={() => setViewMode('categories')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'categories'
                ? 'bg-stone-800 text-amber-300 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Category View</span>
          </button>
          <button
            onClick={() => setViewMode('packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'packages'
                ? 'bg-stone-800 text-amber-300 shadow'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Matched Home Suites</span>
          </button>
        </div>
      </div>

      {/* CATEGORY VIEW GRID */}
      {viewMode === 'categories' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800">
              <p className="text-stone-400 text-sm">No projects found in this category.</p>
            </div>
          )}
        </div>
      )}

      {/* FULL HOME PACKAGES VIEW */}
      {viewMode === 'packages' && (
        <div className="space-y-12">
          {FULL_HOME_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-stone-900 rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
                    Full Room Set Package
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-1">
                    {pkg.name}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1">
                    {pkg.location} • {pkg.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROJECTS.filter((p) => p.homePackageId === pkg.id).map((project) => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

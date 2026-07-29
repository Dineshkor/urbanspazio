'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Raw Construction',
  afterLabel = 'Finished Signature Look',
  title = 'Real Transformation Proof',
  subtitle = 'From Raw Plaster & Concrete to Architectural Warm-LED Perfection',
  description = 'Drag the slider below to compare the raw site readiness state with our finished modular kitchen suite featuring black quartz counters, warm 3000K LED channels, and taupe high-gloss cabinetry.',
  aspectRatio = 'aspect-[4/3] md:aspect-[16/10]'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Flagship Trust Signal
          </div>
          {title && (
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 mb-2 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Slider Container */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden shadow-2xl border border-stone-800 select-none group cursor-ew-resize bg-stone-950`}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* AFTER IMAGE (Base Layer - Right Side) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="Finished Signature Interior"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          {/* Label Badge Right */}
          <div className="absolute top-4 right-4 z-10 bg-[#121214]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            {afterLabel}
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped Layer - Left Side) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src={beforeImage}
            alt="Raw Construction / Unfinished Space"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          {/* Label Badge Left */}
          <div className="absolute top-4 left-4 z-10 bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700 text-stone-300 text-xs font-semibold tracking-wide shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Line & Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#121214] border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-2xl group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-stone-950/75 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-800 text-stone-300 text-xs font-medium tracking-wide flex items-center gap-2 shadow-xl opacity-90 group-hover:opacity-100 transition-opacity">
          <span>Drag left or right to compare</span>
        </div>
      </div>

      {description && (
        <p className="mt-4 text-center text-stone-400 text-xs sm:text-sm max-w-2xl mx-auto italic">
          {description}
        </p>
      )}
    </div>
  );
}

'use client';

import { ArrowRight } from 'lucide-react';
import CinematicRoom, { type CinematicChapter } from '@/components/cinematic/CinematicRoom';
import RoomScene, { type RoomBeats } from '@/components/cinematic/RoomScene';

const CHAPTERS: CinematicChapter[] = [
  { label: '01', title: 'Discovery & Consultation', phrase: 'we listen first' },
  { label: '02', title: 'Concept & Design', phrase: 'blueprints appear' },
  { label: '03', title: 'Materials & Costing', phrase: 'samples on the table' },
  { label: '04', title: 'Execution & Management', phrase: 'the room builds itself' },
  { label: '05', title: 'Styling & Handover', phrase: 'ready to live in' },
];

const BEATS: RoomBeats = {
  ember: 0,
  floor: 3,
  walls: 3,
  windows: 3,
  light: 3,
  materials: -1,
  furniture: 3,
  pendant: 3,
  artwork: 4,
  doorway: 4,
  flood: 4,
  blueprints: 1,
  samples: 2,
  styling: 4,
};

export default function ProcessSection() {
  return (
    <section id="process" className="bg-[#EAE3D9] text-[var(--color-charcoal)] relative">
      <div className="editorial-shell pt-24 lg:pt-32 pb-14">
        <div className="flex flex-col items-center text-center">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            how it works
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            FROM VISION TO REALITY
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Five steps. Your space, made real.
          </p>
        </div>
      </div>

      <CinematicRoom
        chapters={CHAPTERS}
        renderScene={(progress) => <RoomScene progress={progress} beats={BEATS} />}
      />

      <div className="editorial-shell pt-14 lg:pt-24 pb-24 lg:pb-32">
        <div className="flex justify-center">
          <a href="#consultation" className="btn-filled text-[10px]">
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

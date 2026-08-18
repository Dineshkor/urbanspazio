'use client';

import { ArrowRight } from 'lucide-react';
import CinematicRoom, { type CinematicChapter } from '@/components/cinematic/CinematicRoom';
import RoomScene, { type RoomBeats } from '@/components/cinematic/RoomScene';

const CHAPTERS: CinematicChapter[] = [
  { label: '2018', title: 'The Spark', phrase: 'a single ember' },
  { label: '2019', title: 'First Projects', phrase: 'light finds the floor' },
  { label: '2020', title: 'Design Philosophy', phrase: 'four aesthetics rise' },
  { label: '2021', title: 'Material Mastery', phrase: 'textures bloom' },
  { label: '2022', title: 'Bespoke Furniture', phrase: 'craft takes its seat' },
  { label: '2023', title: 'Recognition', phrase: 'the room is complete' },
  { label: '2024', title: 'Your Story Begins', phrase: 'the door opens' },
];

const BEATS: RoomBeats = {
  ember: 0,
  floor: 1,
  walls: 2,
  windows: 1,
  light: 2,
  materials: 3,
  furniture: 4,
  pendant: 4,
  artwork: 5,
  doorway: 6,
  flood: 5,
  blueprints: -1,
  samples: -1,
  styling: -1,
};

export default function BrandStorySection() {
  return (
    <section id="story" className="bg-[var(--color-linen)] relative">
      <div className="editorial-shell pt-24 lg:pt-32 pb-14">
        <div className="flex flex-col items-center text-center">
          <span className="font-script text-2xl sm:text-3xl text-gold-metallic mb-2">
            our journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[var(--color-charcoal)] uppercase tracking-[0.1em] font-semibold">
            THE URBN SPAZIO STORY
          </h2>
          <div className="w-12 h-[1px] bg-[var(--color-charcoal)] opacity-20 my-4" />
          <p className="max-w-md text-xs sm:text-sm font-helvetica text-[var(--color-warm-grey)] leading-relaxed font-light">
            Seven years. One room. Our story.
          </p>
        </div>
      </div>

      <CinematicRoom
        chapters={CHAPTERS}
        renderScene={(progress) => <RoomScene progress={progress} beats={BEATS} />}
      />

      <div className="editorial-shell pt-14 lg:pt-24 pb-24 lg:pb-32">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-10 border-t border-[var(--color-charcoal)]/10">
          <a href="#consultation" className="btn-filled text-[10px]">
            <span>Begin Your Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <div className="flex flex-col items-center sm:items-end">
            <span className="font-script text-3xl text-gold-metallic">
              Sonali Bachkheti
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-warm-grey)] font-medium">
              Founder &amp; Principal Designer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

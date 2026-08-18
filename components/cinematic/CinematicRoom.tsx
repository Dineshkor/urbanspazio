'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

export interface CinematicChapter {
  label: string;
  title: string;
  phrase: string;
}

interface CinematicRoomProps {
  chapters: CinematicChapter[];
  renderScene: (progress: MotionValue<number>) => ReactNode;
}

export default function CinematicRoom({ chapters, renderScene }: CinematicRoomProps) {
  const prefersReduced = useReducedMotion();

  return (
    <>
      {/* Mobile (and reduced-motion fallback): stacked chapter blocks */}
      <div className="lg:hidden">
        {chapters.map((chapter, i) => (
          <ChapterBlock
            key={chapter.label}
            chapter={chapter}
            index={i}
            animateIn={prefersReduced !== true}
            renderScene={renderScene}
          />
        ))}
      </div>

      {/* Desktop: sticky scroll-scrubbed stage */}
      <div className="hidden lg:block">
        {prefersReduced === true ? (
          <div className="editorial-shell">
            {chapters.map((chapter, i) => (
              <ChapterBlock
                key={chapter.label}
                chapter={chapter}
                index={i}
                animateIn={false}
                renderScene={renderScene}
              />
            ))}
          </div>
        ) : (
          <DesktopStage chapters={chapters} renderScene={renderScene} />
        )}
      </div>
    </>
  );
}

/* ── Desktop: sticky stage scrubbed by scroll ── */

function DesktopStage({
  chapters,
  renderScene,
}: {
  chapters: CinematicChapter[];
  renderScene: (progress: MotionValue<number>) => ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.6 });
  const sceneProgress = useTransform(progress, (v) => v * chapters.length);

  return (
    <div ref={sectionRef} style={{ height: `${chapters.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Proscenium frame */}
        <div className="absolute inset-[4vh_6vw]">
          <div className="relative h-full border border-[var(--color-brass)]/25 rounded-md overflow-hidden bg-[#1E1C1A] shadow-[0_0_90px_rgba(197,162,93,0.1)]">
            {renderScene(sceneProgress)}
            <ChapterText chapters={chapters} progress={progress} />
          </div>
        </div>
        <ChapterRail chapters={chapters} progress={progress} />
      </div>
    </div>
  );
}

/* ── Chapter text overlay (bottom-left of the frame) ── */

function ChapterText({
  chapters,
  progress,
}: {
  chapters: CinematicChapter[];
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute bottom-7 left-7 right-7 z-10 pointer-events-none">
      {chapters.map((chapter, i) => (
        <ChapterTextItem
          key={chapter.label}
          chapter={chapter}
          index={i}
          total={chapters.length}
          progress={progress}
        />
      ))}
    </div>
  );
}

function ChapterTextItem({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: CinematicChapter;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const s = index / total;
  const e = (index + 1) / total;
  const fade = Math.min(0.1, (e - s) / 3);
  const opacity = useTransform(progress, [s, s + fade, e - fade, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, s + fade], [26, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 bottom-0">
      <div className="flex items-end gap-5">
        <span className="font-bodoni text-5xl sm:text-6xl text-gold-metallic-light leading-none">
          {chapter.label}
        </span>
        <div className="pb-1">
          <h3 className="font-serif text-lg sm:text-xl uppercase tracking-[0.14em] text-[var(--color-paper)]">
            {chapter.title}
          </h3>
          <p className="font-helvetica text-xs sm:text-sm text-[var(--color-brass-light)]/90 mt-1">
            {chapter.phrase}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Right-side progress rail ── */

function ChapterRail({
  chapters,
  progress,
}: {
  chapters: CinematicChapter[];
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute right-[2.5vw] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      {chapters.map((_, i) => (
        <RailSegment
          key={i}
          progress={progress}
          start={i / chapters.length}
          end={(i + 1) / chapters.length}
        />
      ))}
    </div>
  );
}

function RailSegment({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const fill = useTransform(progress, [start, end], [0, 1]);
  const glow = useTransform(fill, (v) => (v > 0 && v < 1 ? 1 : 0));

  return (
    <div className="w-[3px] h-6 bg-white/10 relative overflow-hidden rounded-full">
      <motion.div
        className="absolute inset-0 bg-[var(--color-brass)] rounded-full"
        style={{ scaleY: fill, originY: 0 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ opacity: glow, boxShadow: '0 0 12px rgba(197,162,93,0.9)' }}
      />
    </div>
  );
}

/* ── Mobile / reduced-motion: one block per chapter ── */

function ChapterBlock({
  chapter,
  index,
  animateIn,
  renderScene,
}: {
  chapter: CinematicChapter;
  index: number;
  animateIn: boolean;
  renderScene: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const local = useMotionValue(0);
  const staticProgress = useMotionValue(index + 1);
  const localProgress = useTransform(local, (t) => index + t);

  useEffect(() => {
    if (animateIn && inView) {
      animate(local, 1, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
    }
  }, [animateIn, inView, local]);

  const progress = animateIn ? localProgress : staticProgress;

  return (
    <div ref={ref} className="py-8 lg:py-12">
      <div className="border border-[var(--color-brass)]/25 rounded-md overflow-hidden bg-[#1E1C1A] shadow-[0_0_40px_rgba(197,162,93,0.08)]">
        <div className="relative aspect-[4/3] sm:aspect-[16/9]">{renderScene(progress)}</div>
        <div className="flex items-end gap-4 px-6 py-5">
          <span className="font-bodoni text-4xl text-gold-metallic-light leading-none">
            {chapter.label}
          </span>
          <div className="pb-0.5">
            <h3 className="font-serif text-base sm:text-lg uppercase tracking-[0.14em] text-[var(--color-paper)]">
              {chapter.title}
            </h3>
            <p className="font-helvetica text-xs text-[var(--color-brass-light)]/90 mt-0.5">
              {chapter.phrase}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
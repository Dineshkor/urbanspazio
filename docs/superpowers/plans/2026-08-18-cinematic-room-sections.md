# Cinematic Room Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Brand Story and Process sections as two films of one shared cinematic room that builds itself as the visitor scrolls, with ultra-concise text.

**Architecture:** One shared `CinematicRoom` component (sticky scroll-scrubbed stage on desktop; stacked animated chapter blocks on mobile/reduced-motion) renders a parameterized SVG `RoomScene`. Each section feeds the stage a chapter list (text) and a `RoomBeats` config (which room layer reveals during which chapter). Layer progress math is unified: `layerProgress = clamp01(overallProgress - beat)`, so desktop scrub (progress 0→total) and mobile blocks (progress = index + local animation) use identical math.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind 4, TypeScript, `motion` (motion.dev, v12, imports from `motion/react`), lucide-react. Design tokens: linen `#F6F2EC`, charcoal `#1C1A18`, dark `#1E1C1A`, brass `#C5A25D`, brass-light `#E4C988`, brass-dark `#9E7B35`, warm-grey `#7A746D`, paper `#FAF7F2`. Utilities available: `.editorial-shell`, `.font-bodoni`, `.font-script`, `.font-helvetica`, `.text-gold-metallic`, `.text-gold-metallic-light`, `.btn-filled`.

> **Testing note (deviation):** This project has NO test runner (package.json scripts: dev/build/start/lint only). Adding a test framework was not part of the approved spec. Verification therefore uses: `npm run lint`, `npm run build` (Next.js type-checks TS), and explicit manual QA steps per task. Commit after each task.

> **Next.js docs:** AGENTS.md requires consulting `node_modules/next/dist/docs/` before writing code. The relevant guide is under `node_modules/next/dist/docs/01-app/` (client components / "use client"). Skim it in Task 1 — these components are all client components following the existing pattern in the repo (see current `components/BrandStorySection.tsx`).

**Spec:** `docs/superpowers/specs/2026-08-18-brand-story-cinematic-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `components/cinematic/CinematicRoom.tsx` | Create | Sticky stage + scroll scrub + spring; chapter text overlay; right rail; mobile/reduced-motion chapter blocks; exports `CinematicChapter` type |
| `components/cinematic/RoomScene.tsx` | Create | The layered SVG room; exports `RoomBeats` type; every layer is its own component driven by `useTransform(progress, p => clamp01(p - beat))` |
| `components/BrandStorySection.tsx` | Rewrite | Story chapters + beats, trimmed header, footer (CTA + founder signature) |
| `components/ProcessSection.tsx` | Rewrite | Process chapters + beats, trimmed header ("5-step"), CTA footer |
| `app/globals.css` | Modify | Remove obsolete `floatParticle` / `pulseRing` keyframes |
| `package.json` | Modify | Add `motion` dependency |

**Key gotcha (do not skip):** the old sections had `overflow-hidden` on the `<section>` (for particles). `overflow: hidden` on an ancestor breaks `position: sticky`. The new sections must NOT use `overflow-hidden` on the section or any ancestor of the sticky stage.

---

### Task 1: Add the `motion` dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install motion**

Run:
```bash
npm install motion
```

- [ ] **Step 2: Verify the install**

Run:
```bash
node -e "console.log(require('motion/package.json').version)"
```
Expected: a `12.x.x` version printed (motion v12 supports React 19).

- [ ] **Step 3: Skim the Next.js client-component docs (required by AGENTS.md)**

Open `node_modules/next/dist/docs/01-app/` and read the "use client" / client components guide. Confirm the existing `'use client'` pattern in `components/BrandStorySection.tsx` matches it.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add motion dependency"
```

---

### Task 2: Create `CinematicRoom` — the shared stage

**Files:**
- Create: `components/cinematic/CinematicRoom.tsx`

- [ ] **Step 1: Write the component**

Create `components/cinematic/CinematicRoom.tsx` with exactly this content:

```tsx
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
  // NOTE (review fix 3f219d4): scrollYProgress is normalized 0..1; the scene's
  // layer beats are chapter indices 0..total, so scale ONLY the scene progress.
  // ChapterText and ChapterRail keep consuming the normalized `progress`.
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
  const opacity = useTransform(progress, [s, s + 0.1, e - 0.1, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, s + 0.1], [26, 0]);

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
```

- [ ] **Step 2: Typecheck**

Run:
```bash
npm run build
```
Expected: build succeeds with no TypeScript errors. (If it fails on unused imports or types, fix the reported errors and re-run.)

- [ ] **Step 3: Commit**

```bash
git add components/cinematic/CinematicRoom.tsx
git commit -m "feat: add cinematic room stage component"
```

---

### Task 3: Create `RoomScene` — the layered SVG room

**Files:**
- Create: `components/cinematic/RoomScene.tsx`

- [ ] **Step 1: Write the component**

Create `components/cinematic/RoomScene.tsx` with exactly this content:

```tsx
'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';

export interface RoomBeats {
  ember: number;
  floor: number;
  walls: number;
  windows: number;
  light: number;
  materials: number;
  furniture: number;
  pendant: number;
  artwork: number;
  doorway: number;
  flood: number;
  blueprints: number;
  samples: number;
  styling: number;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/* Every layer: progress 0..total; a layer with beat b starts revealing
   when progress passes b, finishes one unit later, stays on. beat -1 = never. */
function useLayerProgress(progress: MotionValue<number>, beat: number) {
  return useTransform(progress, (p) => (beat < 0 ? 0 : clamp01(p - beat)));
}

export default function RoomScene({
  progress,
  beats,
}: {
  progress: MotionValue<number>;
  beats: RoomBeats;
}) {
  return (
    <svg
      viewBox="0 0 100 75"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
    >
      <rect width="100" height="75" fill="#1E1C1A" />
      <BackWall progress={progress} beat={beats.walls} />
      <Ember progress={progress} beat={beats.ember} />
      <Floor progress={progress} beat={beats.floor} />
      <Windows progress={progress} beat={beats.windows} />
      <LightBeams progress={progress} beat={beats.light} />
      <Blueprints progress={progress} beat={beats.blueprints} />
      <Materials progress={progress} beat={beats.materials} />
      <Samples progress={progress} beat={beats.samples} />
      <Artwork progress={progress} beat={beats.artwork} />
      <Sofa progress={progress} beat={beats.furniture} />
      <Pendant progress={progress} beat={beats.pendant} />
      <Styling progress={progress} beat={beats.styling} />
      <Doorway progress={progress} beat={beats.doorway} />
      <Flood progress={progress} beat={beats.flood} />
      <rect width="100" height="75" fill="url(#vignetteGrad)" pointerEvents="none" />

      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9E7B35" />
          <stop offset="50%" stopColor="#E8CF94" />
          <stop offset="100%" stopColor="#C5A25D" />
        </linearGradient>
        <radialGradient id="glassGrad" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C5A25D" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C5A25D" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE9DE" />
          <stop offset="100%" stopColor="#F6F2EC" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8CF94" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8CF94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="floodGrad" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#E4C988" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E4C988" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignetteGrad" cx="50%" cy="50%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Layers ── */

function BackWall({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: useTransform(lp, (v) => 0.25 + 0.75 * v) }}>
      <rect width="100" height="47" fill="#262320" />
      <motion.path
        d="M0 47 H100"
        stroke="#C5A25D"
        strokeWidth="0.3"
        fill="none"
        style={{ opacity: useTransform(lp, (v) => v * 0.2) }}
      />
    </motion.g>
  );
}

function Ember({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <circle cx="50" cy="38" r="3.5" fill="url(#glowGrad)" />
      <motion.circle
        cx="50"
        cy="38"
        r="1.4"
        fill="#E8CF94"
        animate={{ r: [1.2, 1.6, 1.2], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  );
}

function Floor({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g>
      <motion.rect y="47" width="100" height="28" fill="url(#floorGrad)" style={{ opacity: lp }} />
      <motion.path
        d="M0 47 H100"
        stroke="#C5A25D"
        strokeWidth="0.4"
        fill="none"
        style={{ pathLength: lp, opacity: useTransform(lp, (v) => 0.5 * v) }}
      />
      <motion.g style={{ opacity: useTransform(lp, (v) => v * 0.12) }}>
        <path d="M0 52 H100" stroke="#7A746D" strokeWidth="0.3" />
        <path d="M0 57 H100" stroke="#7A746D" strokeWidth="0.3" />
        <path d="M0 62 H100" stroke="#7A746D" strokeWidth="0.3" />
      </motion.g>
    </motion.g>
  );
}

function Windows({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const mullion = useTransform(lp, (v) => v * 0.6);
  return (
    <motion.g>
      <motion.path
        d="M18 34 L18 14 A6.5 6.5 0 0 1 31 14 L31 34 Z"
        fill="url(#glassGrad)"
        style={{ opacity: lp }}
      />
      <motion.path
        d="M18 34 L18 14 A6.5 6.5 0 0 1 31 14 L31 34 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.path
        d="M40 34 L40 14 A6.5 6.5 0 0 1 53 14 L53 34 Z"
        fill="url(#glassGrad)"
        style={{ opacity: lp }}
      />
      <motion.path
        d="M40 34 L40 14 A6.5 6.5 0 0 1 53 14 L53 34 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.g style={{ opacity: mullion }}>
        <path d="M24.5 14 V34" stroke="#C5A25D" strokeWidth="0.25" />
        <path d="M46.5 14 V34" stroke="#C5A25D" strokeWidth="0.25" />
      </motion.g>
    </motion.g>
  );
}

function LightBeams({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g
      style={{
        opacity: useTransform(lp, (v) => v * 0.4),
        translateY: useTransform(lp, (v) => (1 - v) * 6),
      }}
    >
      <path d="M18 34 L31 34 L38 58 L11 58 Z" fill="url(#beamGrad)" />
      <path d="M40 34 L53 34 L60 58 L33 58 Z" fill="url(#beamGrad)" />
    </motion.g>
  );
}

function Blueprints({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const outline = useTransform(lp, (v) => clamp01(v * 2));
  const lineA = useTransform(lp, (v) => clamp01(v * 2 - 0.28));
  const lineB = useTransform(lp, (v) => clamp01(v * 2 - 0.56));
  const lineC = useTransform(lp, (v) => clamp01(v * 2 - 0.84));
  const dims = useTransform(lp, (v) => clamp01(v * 2 - 1.12));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M28 52 H52 V62 H28 Z"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: outline }}
      />
      <motion.path d="M28 57 H52" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineA }} />
      <motion.path d="M34 52 V62" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineB }} />
      <motion.path d="M42 52 V62" stroke="#C5A25D" strokeWidth="0.25" style={{ pathLength: lineB }} />
      <motion.path d="M27.5 52 V47" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: lineC }} />
      <motion.path d="M52.5 52 V47" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: lineC }} />
      <motion.path d="M40 52.5 H44" stroke="#C5A25D" strokeWidth="0.2" style={{ pathLength: dims }} />
      <motion.path d="M42 52.5 V47.5" stroke="#C5A25D" strokeWidth="0.15" style={{ pathLength: dims }} />
    </motion.g>
  );
}

function Materials({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const panel = useTransform(lp, (v) => clamp01(v * 2));
  return (
    <motion.g style={{ filter: useTransform(lp, (v) => `blur(${(1 - v) * 2.5}px)`), opacity: lp }}>
      <motion.rect x="64" y="10" width="3" height="14" fill="#B9B2A6" style={{ opacity: panel }} />
      <motion.path
        d="M64.8 12 L65.6 14.5 L65 17.5 L66.2 22"
        stroke="#8B8478"
        strokeWidth="0.25"
        fill="none"
        style={{ pathLength: panel }}
      />
      <motion.rect x="68" y="10" width="3" height="14" fill="#8A6B4D" style={{ opacity: panel }} />
      <motion.path
        d="M69.5 11 V23"
        stroke="#6F5438"
        strokeWidth="0.3"
        fill="none"
        style={{ opacity: useTransform(panel, (v) => v * 0.6), pathLength: panel }}
      />
      <motion.rect x="72" y="10" width="3" height="14" fill="url(#brassGrad)" style={{ opacity: panel }} />
      <motion.rect x="76" y="10" width="3" height="14" fill="#CFC4B0" style={{ opacity: panel }} />
    </motion.g>
  );
}

function Samples({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const table = useTransform(lp, (v) => clamp01(v * 1.4));
  const swatchA = useTransform(lp, (v) => clamp01(v * 2 - 0.2));
  const swatchB = useTransform(lp, (v) => clamp01(v * 2 - 0.45));
  const swatchC = useTransform(lp, (v) => clamp01(v * 2 - 0.7));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.rect x="36" y="42" width="18" height="1.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="37.5" y="43.5" width="1" height="3.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="51.5" y="43.5" width="1" height="3.5" fill="#2E2A25" style={{ opacity: table }} />
      <motion.rect x="37" y="37.8" width="3.4" height="3.4" fill="#B9B2A6" style={{ opacity: swatchA }} />
      <motion.path
        d="M37.8 38.6 L38.7 39.6 L38.3 40.4 L39.4 41"
        stroke="#8B8478"
        strokeWidth="0.2"
        fill="none"
        style={{ pathLength: swatchA }}
      />
      <motion.rect x="41" y="37.8" width="3.4" height="3.4" fill="#8A6B4D" style={{ opacity: swatchB }} />
      <motion.rect x="45" y="37.8" width="3.4" height="3.4" fill="url(#brassGrad)" style={{ opacity: swatchC }} />
    </motion.g>
  );
}

function Artwork({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M6 8 H15 V20 H6 Z"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.rect
        x="7.2"
        y="9.2"
        width="6.6"
        height="9.6"
        fill="#3A362F"
        style={{ opacity: useTransform(lp, (v) => clamp01(v * 1.5)) }}
      />
    </motion.g>
  );
}

function Sofa({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const body = useTransform(lp, (v) => clamp01(v * 1.8));
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path
        d="M30 47 V37 H70 V47"
        stroke="#C5A25D"
        strokeWidth="0.35"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.rect x="30" y="37" width="40" height="4.2" rx="0.6" fill="#2E2A25" style={{ opacity: body }} />
      <motion.rect x="30" y="41.2" width="40" height="3.6" rx="0.6" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="30" y="38" width="3.4" height="7" rx="0.5" fill="#2E2A25" style={{ opacity: body }} />
      <motion.rect x="66.6" y="38" width="3.4" height="7" rx="0.5" fill="#2E2A25" style={{ opacity: body }} />
      <motion.path
        d="M30 44.8 H70"
        stroke="#C5A25D"
        strokeWidth="0.25"
        style={{ opacity: useTransform(body, (v) => v * 0.7) }}
      />
      <motion.rect x="31.5" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="38" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="61" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
      <motion.rect x="67.5" y="44.8" width="1" height="2.2" fill="#1C1A18" style={{ opacity: body }} />
    </motion.g>
  );
}

function Pendant({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.path d="M50 0 V9" stroke="#C5A25D" strokeWidth="0.3" style={{ pathLength: lp }} />
      <motion.path
        d="M44 9 A6 6 0 0 1 56 9 Z"
        fill="url(#brassGrad)"
        style={{ opacity: useTransform(lp, (v) => clamp01(v * 1.5)) }}
      />
      <motion.circle
        cx="50"
        cy="13"
        r="4"
        fill="url(#glowGrad)"
        style={{ opacity: useTransform(lp, (v) => v * 0.6) }}
      />
    </motion.g>
  );
}

function Styling({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  const riseA = useTransform(lp, (v) => (1 - v) * 4);
  const riseB = useTransform(lp, (v) => (1 - v) * 4);
  const riseC = useTransform(lp, (v) => (1 - v) * 4);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.g style={{ translateY: riseA }}>
        <motion.rect x="19.5" y="43.5" width="1.4" height="2" fill="#C5A25D" style={{ opacity: lp }} />
        <motion.circle cx="20.2" cy="43" r="1.7" fill="#C5A25D" style={{ opacity: lp }} />
      </motion.g>
      <motion.g style={{ translateY: riseB }}>
        <motion.rect x="45" y="43.6" width="5.5" height="3.2" rx="0.9" fill="#E4C988" style={{ opacity: lp }} />
      </motion.g>
      <motion.g style={{ translateY: riseC }}>
        <motion.rect x="74.5" y="42.8" width="3" height="3" fill="#7A746D" style={{ opacity: lp }} />
        <motion.ellipse cx="76" cy="41.8" rx="2.2" ry="1.4" fill="#7C7A52" style={{ opacity: lp }} />
      </motion.g>
    </motion.g>
  );
}

function Doorway({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return (
    <motion.g style={{ opacity: lp }}>
      <motion.circle
        cx="87"
        cy="34"
        r="16"
        fill="url(#floodGrad)"
        style={{ opacity: useTransform(lp, (v) => v * 0.9) }}
      />
      <motion.path
        d="M80 47 L80 20 A7 7 0 0 1 94 20 L94 47 Z"
        stroke="#C5A25D"
        strokeWidth="0.45"
        fill="none"
        style={{ pathLength: lp }}
      />
      <motion.path
        d="M81 47 L81 21 A6 6 0 0 1 93 21 L93 47 Z"
        fill="#262320"
        style={{
          transform: useTransform(lp, (v) => `scaleX(${1 - 0.92 * v})`),
          transformOrigin: '81px 47px',
          transformBox: 'view-box',
        }}
      />
    </motion.g>
  );
}

function Flood({ progress, beat }: { progress: MotionValue<number>; beat: number }) {
  const lp = useLayerProgress(progress, beat);
  return <motion.rect width="100" height="75" fill="url(#floodGrad)" style={{ opacity: lp }} />;
}
```

- [ ] **Step 2: Typecheck**

Run:
```bash
npm run build
```
Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add components/cinematic/RoomScene.tsx
git commit -m "feat: add layered svg room scene"
```

---

### Task 4: Rebuild `BrandStorySection`

**Files:**
- Rewrite: `components/BrandStorySection.tsx` (entire file, replaces the current 645-line implementation)

- [ ] **Step 1: Rewrite the component**

Replace the entire content of `components/BrandStorySection.tsx` with:

```tsx
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
```

Note: the section deliberately has NO `overflow-hidden` — it would break the sticky stage.

- [ ] **Step 2: Verify no other file imports the removed exports**

Run:
```bash
npx eslint components/BrandStorySection.tsx
```
Expected: no errors (the old icons/`MILESTONES`/`useCounter` etc. are fully removed with the rewrite).

- [ ] **Step 3: Typecheck**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Manual QA — story section**

Run `npm run dev` and open `http://localhost:3000`. Scroll to the story section:
- Desktop (≥1024px): sticky room fills the viewport; chapter 1 shows only the ember; floor draws at 2019; walls/windows/light at 2020; material panels at 2021; sofa + pendant at 2022; artwork + warm flood at 2023; doorway opens at 2024; text (year/title/phrase) fades in/out per chapter; the right rail fills segment by segment.
- Scrub back up: the room correctly "un-builds" (layers fade back in reverse).
- Mobile (<1024px): 7 stacked blocks, each with a mini room scene that builds once when scrolled into view, text below the scene.

- [ ] **Step 5: Commit**

```bash
git add components/BrandStorySection.tsx
git commit -m "feat: rebuild brand story as cinematic room"
```

---

### Task 5: Rebuild `ProcessSection`

**Files:**
- Rewrite: `components/ProcessSection.tsx` (entire file, replaces the current 62-line implementation)

- [ ] **Step 1: Rewrite the component**

Replace the entire content of `components/ProcessSection.tsx` with:

```tsx
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
```

Note: the header now says "Five steps" (the old copy said "4-step" while listing 5 steps). The section deliberately has NO `overflow-hidden` — it would break the sticky stage.

- [ ] **Step 2: Verify `PROCESS_STEPS` is no longer referenced by this file**

Run:
```bash
npx eslint components/ProcessSection.tsx
```
Expected: no errors. (`PROCESS_STEPS` in `lib/site-data.ts` stays — it is data, unused imports were removed.)

- [ ] **Step 3: Typecheck**

Run:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 4: Manual QA — process section**

With `npm run dev` running, scroll to the process section:
- Desktop: room starts dim with only the ember (chapter 01); gold blueprint lines draw on the floor (02); samples table with 3 swatches (03); floor/walls/windows/furniture assemble quickly (04); styling items + artwork + doorway open in golden light (05).
- Scrub back up: un-builds correctly.
- Mobile: 5 stacked blocks, each scene builds once on scroll into view.

- [ ] **Step 5: Commit**

```bash
git add components/ProcessSection.tsx
git commit -m "feat: rebuild process section as cinematic room"
```

---

### Task 6: CSS cleanup + final verification

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Confirm the keyframes are unused**

Run:
```bash
grep -rn "floatParticle\|pulseRing" app components
```
Expected: only `app/globals.css` matches (the keyframe definitions themselves).

- [ ] **Step 2: Remove the obsolete keyframes**

In `app/globals.css`, delete the entire trailing block:

```css
/* ============================================
   Milestone Timeline Animations
   ============================================ */

@keyframes floatParticle {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(0);
    opacity: 0;
  }
  15% {
    opacity: 0.4;
    transform: translateY(-10px) translateX(5px) scale(1);
  }
  50% {
    opacity: 0.25;
    transform: translateY(-30px) translateX(-8px) scale(0.8);
  }
  85% {
    opacity: 0.35;
    transform: translateY(-50px) translateX(3px) scale(0.6);
  }
}

@keyframes pulseRing {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.25);
    opacity: 0;
  }
}
```

(lines 355–387 of the current file). Keep everything above intact.

- [ ] **Step 3: Full verification**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass with no errors.

- [ ] **Step 4: Final manual QA checklist**

With `npm run dev` running, verify ALL of the following:

1. Story section, desktop ≥1024px: sticky stage, 7 chapters build the room in order, backward scrub un-builds it, chapter text transitions, right rail fills/glows, no horizontal scrollbar, no sticky-position breakage.
2. Story section, mobile 390px: 7 stacked blocks, scenes build once on scroll into view, no jank, no horizontal scrollbar.
3. Process section, desktop + mobile: same checks; process room uses blueprint/sample/styling beats.
4. Reduced motion (Windows: Settings → Accessibility → Visual effects → Animation effects off): both sections show stacked blocks with fully built rooms and no scroll-scrub stage.
5. Both sections' headers/footers render with the trimmed copy ("Seven years. One room. Our story." / "Five steps. Your space, made real."), the founder signature, and working CTA buttons.
6. `npm run build` passes (final).

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "chore: remove obsolete milestone timeline keyframes"
```
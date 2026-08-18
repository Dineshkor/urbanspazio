# Cinematic "Room That Builds Itself" — Brand Story & Process Sections

**Date:** 2026-08-18
**Components:** `components/BrandStorySection.tsx`, `components/ProcessSection.tsx`
**Status:** Approved design

## Vision

Two cinematic sections on one site, one continuous film: a luxury living room — drawn in layered SVG in the brand palette (charcoal, brass, linen) — that *builds itself* as the visitor scrolls. Scroll becomes a film the visitor controls.

- **Story section:** 7 chapters = the brand's history (2018–2024). The room builds itself over the years.
- **Process section:** 5 chapters = the client journey (Discovery → Handover). The same room passes through the client's project.

**Experience:** cinematic & immersive. **Metaphor:** a room that builds itself. **Content balance:** the room leads; text is ultra-minimal. **Imagery:** drawn with SVG/CSS (no photos). **Library:** `motion` (framer-motion) added to the project.

## Text Rule (global, both sections)

**Text must be ultra-concise.** No paragraphs. Per chapter, only:
- Year (story) / step number (process) — large Bodoni, gold
- Title — 2–4 words
- One phrase — **max 5 words**, evocative, e.g. "a single ember" / "blueprints appear" / "ready to live in"

Section header subtitles get shortened to one sentence. No stat badges, no long descriptions anywhere in these sections.

## Scene — "The Room" (shared)

A luxury living room viewed through a proscenium-style brass frame on the linen background. SVG layers, back-to-front:

1. Back wall (deep charcoal)
2. Floor plane (linen/wood tone)
3. Windows with brass frames (2)
4. Light beams (gold gradient, soft)
5. Material/texture panels (marble veining, timber grain, brass)
6. Furniture (sofa, pendant lamp)
7. Artwork frames on walls
8. Doorway at the back with brass frame

### Story chapters (7 × ~1 viewport)

| # | Year | Title | Beat in the room |
|---|------|-------|------------------|
| 1 | 2018 | The Spark | Near-void. A single ember of gold light floats in darkness |
| 2 | 2019 | First Projects | Floor plane draws itself; first window opens, soft light spills in |
| 3 | 2020 | Design Philosophy | Walls rise; second window; four material panels hint the 4 aesthetics |
| 4 | 2021 | Material Mastery | Textures bloom — marble veining, timber grain, brass trim animate on |
| 5 | 2022 | Bespoke Furniture | Sofa assembles from lines; pendant lamp lowers from ceiling |
| 6 | 2023 | Recognition | Room complete — warm golden light floods, artwork glows |
| 7 | 2024 | Your Story Begins | Brass-framed doorway opens; gold particles drift in |

### Process chapters (5 × ~1 viewport)

| # | Step | Beat in the room |
|---|------|------------------|
| 1 | 01 Discovery & Consultation | Room empty and dim; only the faint ember glow remains. A conversation begins |
| 2 | 02 Concept & Design | Gold drafting lines draw themselves across floor and walls — glowing blueprints |
| 3 | 03 Materials & Costing | Material sample panels bloom on a table — marble, timber, brass swatches |
| 4 | 04 Execution & PM | The room assembles itself quickly — floor, walls, windows, furniture, no ceremony |
| 5 | 05 Styling & Handover | Complete, warm, glowing; styled details appear; doorway opens in golden light |

## Choreography & Technology

- **Scroll mapping:** section height = chapters × 100vh. Inside, the stage is `position: sticky; top: 0; height: 100vh`.
- `useScroll({ target: sectionRef })` → raw progress 0–1; smoothed with `useSpring` for a film-like feel.
- Progress split into equal chapter segments; every room layer gets a `useTransform` over its chapter's segment, so scrubbing plays the film forward and backward.
- **Animation techniques (GPU-friendly only):**
  - `pathLength` on SVG strokes → self-drawing lines (floor, window frames, furniture, blueprints)
  - Opacity + translateY for light beams and texture blooms
  - Blur-to-sharp for materials appearing (lens feel)
  - Masks/gradients preferred over expensive SVG filters
- **Reduced motion:** no sticky stage; room renders fully built; text simply fades in.

## Architecture

One shared cinematic stage component, two scripts:

- `CinematicRoom` — the sticky stage + brass frame + layered SVG room, parameterized by a **chapter script** (which layers animate, their ranges, per-chapter text). Both sections feed it different scripts. One stage, two films, no duplicated SVG.
- `ChapterText` — year/step + title + phrase overlay, fades per segment (inside CinematicRoom)
- `ChapterRail` — thin progress rail on the right (replaces the story section's existing dot indicators)
- Section headers + footers retained from current implementations (headers with trimmed copy; story keeps founder signature + CTA, process keeps CTA)

**Data:** Story — keep 7 milestone entries from `MILESTONES` (step/year/title/icon); add a `phrase` per milestone; drop `stat` counters. Process — use `PROCESS_STEPS` (step/title); add a `phrase` per step. Fix process header copy: "4-step" → "5-step".

**Removals from current implementations:** story — `FloatingParticles`, `TravelingOrb`, `WindingPath`, `ScrollProgress` dots, `useCounter`, alternating left/right cards, mobile vertical timeline. Process — the box grid layout.

## Mobile Behavior

No pinned stage on small screens. Compact horizontal scene at the top of each chapter block — the room mini-scene re-animates per chapter triggered by IntersectionObserver (not scroll-scrub), with chapter text below. Simpler, no jank, story still reads.

## Performance & Accessibility

- Only `transform`/`opacity` animated; SVG is a single composed layer; passive scroll handlers.
- `prefers-reduced-motion`: fully-built room + simple fades; content must never be hidden behind animation completion.
- Contrast: text stays in brand palette (charcoal on linen, gold accents) — same standards as the rest of the site.

## Dependencies

- Add `motion` (framer-motion) — compatible with React 19 / Next.js 16 in this project.
- `lucide-react` icons still used (chapter icons + CTA arrows).

## Verification

- `npm run lint`
- `npm run build`
- Manual checks: desktop + mobile widths; scroll scrubbing; reduced-motion mode; content reachable without JS animation.
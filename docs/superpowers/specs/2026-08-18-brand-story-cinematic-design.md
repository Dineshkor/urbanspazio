# Cinematic "Room That Builds Itself" — Brand Story Section Redesign

**Date:** 2026-08-18
**Component:** `components/BrandStorySection.tsx`
**Status:** Approved design

## Vision

The story section becomes a cinematic experience: a luxury living room — drawn in layered SVG in the brand palette (charcoal, brass, linen) — that *builds itself* as the visitor scrolls. Scroll becomes a film the visitor controls. Each of the 7 milestones is a chapter, and the room visibly changes per chapter while minimal text (year + title + one-line phrase) overlays the scene.

**Experience:** cinematic & immersive. **Metaphor:** a room that builds itself. **Content balance:** the room leads, text is minimal. **Imagery:** drawn with SVG/CSS (no photos). **Library:** `motion` (framer-motion) added to the project.

## Scene — "The Room"

A luxury living room viewed through a proscenium-style brass frame on the linen background. Layers (drawn in SVG, in order back-to-front):

1. Back wall (deep charcoal)
2. Floor plane (linen/wood tone)
3. Windows with brass frames (2)
4. Light beams (gold gradient, soft)
5. Material/texture panels (marble veining, timber grain, brass)
6. Furniture (sofa, pendant lamp)
7. Artwork frames on walls
8. Doorway at the back with brass frame (final chapter)

### Chapters (7 × ~1 viewport of scroll)

| # | Year | Title | Beat in the room |
|---|------|-------|------------------|
| 1 | 2018 | The Spark | Near-void. A single ember of gold light floats in darkness |
| 2 | 2019 | First Projects | Floor plane draws itself; first window opens, soft light spills in |
| 3 | 2020 | Design Philosophy | Walls rise; second window; four material panels hint the 4 aesthetics |
| 4 | 2021 | Material Mastery | Textures bloom — marble veining, timber grain, brass trim animate on |
| 5 | 2022 | Bespoke Furniture | Sofa assembles from lines; pendant lamp lowers from ceiling |
| 6 | 2023 | Recognition | Room complete — warm golden light floods, artwork glows |
| 7 | 2024 | Your Story Begins | Brass-framed doorway opens at the back; gold particles drift in |

**Text treatment:** per chapter, only year (large Bodoni, gold), title, and a short one-line phrase (new copy). No stat badges inside the room. The section header ("THE URBN SPAZIO STORY") and the founder signature + CTA footer are retained from the current implementation.

## Choreography & Technology

- **Scroll mapping:** section height = 7 × 100vh. Inside, the stage is `position: sticky; top: 0; height: 100vh`.
- `useScroll({ target: sectionRef })` → raw progress 0–1; smoothed with `useSpring` for a film-like feel.
- Progress split into 7 equal segments; every room layer gets a `useTransform` over its chapter's segment, so scrubbing plays the film forward and backward.
- **Animation techniques (GPU-friendly only):**
  - `pathLength` on SVG strokes → self-drawing lines (floor, window frames, furniture)
  - Opacity + translateY for light beams and texture blooms
  - Blur-to-sharp for materials appearing (lens feel)
  - Masks/gradients preferred over expensive SVG filters
- **Reduced motion:** no sticky stage; room renders fully built; text simply fades in.

## Architecture

Components (within `BrandStorySection.tsx`, split into files only if the file becomes unwieldy):

- `StoryStage` — sticky viewport + brass frame + scroll-linked room
- `RoomScene` — layered SVG room; per-layer groups: Floor, Walls/Windows, Light, Materials, Furniture, Doorway
- `ChapterText` — year + title + phrase overlay, fades per segment
- `ChapterRail` — thin progress rail on the right (replaces existing dot indicators)
- Header + footer retained from current implementation

**Data:** keep the 7 milestone entries (step/year/title/icon) from `MILESTONES`; add a short `phrase` per milestone; drop the `stat` counters from the room (they no longer appear).

**Removals from current implementation:** `FloatingParticles`, `TravelingOrb`, `WindingPath`, `ScrollProgress` dots, `useCounter`, alternating left/right card layout, mobile vertical timeline.

## Mobile Behavior

No pinned stage on small screens. Compact horizontal scene at the top of each chapter block — the room mini-scene re-animates per chapter triggered by IntersectionObserver (not scroll-scrub), with chapter text below. Simpler, no jank, story still reads.

## Performance & Accessibility

- Only `transform`/`opacity` animated; SVG is a single composed layer; passive scroll handlers.
- `prefers-reduced-motion`: fully-built room + simple fades; content must never be hidden behind animation completion (text is always reachable).
- Contrast: text stays in brand palette (charcoal on linen, gold accents) — same standards as the rest of the site.

## Dependencies

- Add `motion` (framer-motion) — compatible with React 19 / Next.js 16 in this project.
- Remove nothing else; `lucide-react` icons still used (chapter icons + CTA arrow).

## Verification

- `npm run lint`
- `npm run build`
- Manual checks: desktop + mobile widths; scroll scrubbing; reduced-motion mode; content reachable without JS animation.
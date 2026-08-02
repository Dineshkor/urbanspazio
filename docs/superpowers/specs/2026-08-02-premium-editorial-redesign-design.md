# Premium Editorial Redesign

## Goal

Refine Urban Spazio's one-page site so it carries the reference set's quiet, premium editorial feel while remaining clearly an interior-design studio and preserving the consultation conversion path.

## Visual System

- Use warm ivory, soft stone, carbon black, and aged brass as the only structural palette.
- Treat brass as an accent for hierarchy, controls, and fine rules; do not use it as a broad decorative color.
- Retain Bodoni for display typography, Playfair for supporting editorial headings, and a restrained sans-serif for body copy and navigation.
- Use script typography only as short section annotations.
- Use larger image fields, quiet whitespace, thin borders, and considered asymmetric layouts instead of decorative cards.

## Page Experience

### Header and Hero

- Keep a slim header with a clear consultation action. It becomes an ivory, bordered bar after scrolling.
- Recompose the hero as an editorial introduction paired with one vertical project image. Keep the project metadata and slider controls quiet, while making the consultation action the primary decision.

### Services, Design Philosophies, and Portfolio

- Present services as a numbered editorial sequence with alternating image and content alignment.
- Keep the paid consultation prominent, but integrate it into the composition rather than presenting it as a generic feature card.
- Make the design-philosophy section an image-led study grid with minimal supporting content.
- Rework the portfolio into a staggered gallery of completed interiors with project metadata and an inquiry path.

### Conversion and Trust Content

- Rebalance process, packages, brand story, testimonials, FAQ, and contact into alternating light and dark editorial bands.
- Keep pricing, service details, WhatsApp access, and booking actions explicit and usable.
- Do not invent awards, credentials, clients, projects, or business claims.

## Interaction and Accessibility

- Preserve the existing single-page navigation and section anchors.
- Preserve usable hero controls, mobile navigation, FAQ accordions, and the consultation flow with keyboard access.
- Add only lightweight visual motion: image hover treatments and entrance transitions.
- Respect `prefers-reduced-motion`.
- Use stable aspect ratios and responsive spacing so headings, controls, and images do not collide or jump across desktop and mobile widths.

## Technical Approach

- Keep the existing Next.js App Router structure and section-component architecture.
- Continue using the content in `lib/site-data.ts` and `lib/constants.ts`; do not introduce a CMS or a new route model.
- Use local imagery under `public/images` and the existing `next/font` setup.
- Prefer focused Tailwind and global-design-token refinements over new visual dependencies.

## Validation

- Add or update focused interaction tests only where the repository's test tooling supports them.
- Run ESLint and a production build.
- Review the rendered homepage at desktop and mobile sizes for image cropping, readable text, accessible focus states, and visual collisions.


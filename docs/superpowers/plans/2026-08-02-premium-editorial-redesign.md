# Premium Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Urban Spazio a cohesive, premium architectural-editorial visual experience while preserving its existing services, inquiry paths, and one-page behavior.

**Architecture:** Retain the App Router page and data modules, upgrading visual tokens and the existing section components in place. Interactive client components continue to own their local state; no CMS, routes, or new network calls are introduced. Add focused component tests for existing interactive behavior before visual refactors change the markup.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/font`, lucide-react, Vitest and React Testing Library.

---

## File Structure

- Modify: `package.json` - add the test scripts and development test dependencies.
- Create: `vitest.config.ts` - configure jsdom, the `@/` alias, and test setup.
- Create: `test/setup.ts` - register DOM matchers and browser API shims used by the consultation flow.
- Create: `components/__tests__/FaqSection.test.tsx` - verify FAQ disclosure behavior.
- Create: `components/__tests__/Header.test.tsx` - verify mobile navigation behavior.
- Create: `components/__tests__/ConsultationSection.test.tsx` - verify required booking progression.
- Modify: `app/globals.css` - establish the editorial tokens, shared section rules, motion policy, and responsive typography.
- Modify: `components/Header.tsx` - refine the header layout and accessible mobile drawer.
- Modify: `components/HeroSection.tsx` - simplify the hero into an editorial project feature while retaining project controls.
- Modify: `components/ServicesSection.tsx` - create the numbered service narrative and composed consultation feature.
- Modify: `components/DesignPhilosophySection.tsx` - turn the philosophy list into an image-led material-study gallery.
- Modify: `components/PortfolioSection.tsx` - replace the bento grid with a staggered editorial project gallery while retaining filters.
- Modify: `components/ProcessSection.tsx` - use a restrained numbered timeline.
- Modify: `components/PackageSection.tsx` - reframe packages as a clear investment comparison.
- Modify: `components/BrandStorySection.tsx` - use a framed studio story composition.
- Modify: `components/TestimonialSection.tsx` - make testimonials a quiet full-width editorial quote.
- Modify: `components/FaqSection.tsx` - preserve disclosure semantics while tightening visual hierarchy.
- Modify: `components/ConsultationSection.tsx` - simplify visual framing without changing payment or booking state.
- Modify: `components/ContactSection.tsx` - make contact a direct dark editorial closing band.
- Modify: `components/Footer.tsx` - align footer controls and whitespace with the new system.

### Task 1: Establish Component Test Support

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `test/setup.ts`

- [ ] **Step 1: Write the failing FAQ interaction test**

Create `components/__tests__/FaqSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqSection from '@/components/FaqSection';

it('opens a selected answer and closes the previously open answer', async () => {
  const user = userEvent.setup();
  render(<FaqSection />);

  const firstQuestion = screen.getByRole('button', { name: /what areas do you serve/i });
  const secondQuestion = screen.getByRole('button', { name: /how does the ₹999 quick consultation work/i });

  expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  await user.click(secondQuestion);

  expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
});
```

- [ ] **Step 2: Add the minimal Vitest configuration**

Add these `package.json` entries:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "vitest": "latest"
  }
}
```

Create `vitest.config.ts`:

```ts
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname) } },
  test: { environment: 'jsdom', setupFiles: ['./test/setup.ts'] },
});
```

Create `test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Run the test to verify it fails for missing test support and disclosure semantics**

Run: `npm test -- components/__tests__/FaqSection.test.tsx`

Expected: FAIL until dependencies are installed and FAQ buttons expose `aria-expanded`.

- [ ] **Step 4: Install the declared test dependencies and update the lockfile**

Run: `npm install -D vitest @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom`

Expected: dependencies are saved in `package.json` and `package-lock.json`.

- [ ] **Step 5: Commit the test foundation**

```bash
git add package.json package-lock.json vitest.config.ts test/setup.ts components/__tests__/FaqSection.test.tsx
git commit -m "test: add component test foundation"
```

### Task 2: Make Existing Interactions Testable Before Visual Changes

**Files:**
- Modify: `components/FaqSection.tsx`
- Create: `components/__tests__/Header.test.tsx`
- Create: `components/__tests__/ConsultationSection.test.tsx`

- [ ] **Step 1: Run the FAQ test after dependencies are installed**

Run: `npm test -- components/__tests__/FaqSection.test.tsx`

Expected: FAIL because the FAQ button does not yet expose `aria-expanded`.

- [ ] **Step 2: Add disclosure semantics to FAQ buttons**

Replace the FAQ button opening tag in `components/FaqSection.tsx` with:

```tsx
<button
  type="button"
  onClick={() => toggleFaq(index)}
  aria-expanded={isOpen}
  aria-controls={`faq-answer-${index}`}
  className="w-full flex items-center justify-between py-6 text-left group"
>
```

and add `id={`faq-answer-${index}`}` to the associated answer container.

- [ ] **Step 3: Run the FAQ test to verify it passes**

Run: `npm test -- components/__tests__/FaqSection.test.tsx`

Expected: PASS.

- [ ] **Step 4: Write failing tests for mobile navigation and valid booking progression**

Create `components/__tests__/Header.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';

it('opens and closes the mobile navigation', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const toggle = screen.getByRole('button', { name: /toggle navigation/i });

  await user.click(toggle);
  expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();

  await user.click(screen.getByRole('link', { name: /services/i }));
  expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument();
});
```

Create `components/__tests__/ConsultationSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConsultationSection from '@/components/ConsultationSection';

it('advances to payment after required details are entered', async () => {
  const user = userEvent.setup();
  render(<ConsultationSection />);

  await user.type(screen.getByPlaceholderText(/your name/i), 'Aarav Shah');
  await user.type(screen.getByPlaceholderText(/email address/i), 'aarav@example.com');
  await user.type(screen.getByPlaceholderText(/phone number/i), '9876543210');
  await user.selectOptions(screen.getByRole('combobox', { name: /project type/i }), 'Residential');
  await user.selectOptions(screen.getByRole('combobox', { name: /space to design/i }), 'Living Room');
  await user.type(screen.getByPlaceholderText(/briefly describe/i), 'A living room renovation.');
  await user.click(screen.getByRole('button', { name: /proceed to payment/i }));

  expect(screen.getByRole('heading', { name: /consultation fee/i })).toBeInTheDocument();
});
```

- [ ] **Step 5: Run the new tests and make minimal accessibility fixes**

Run: `npm test -- components/__tests__/Header.test.tsx components/__tests__/ConsultationSection.test.tsx`

Expected: FAIL for the missing mobile-nav label and form control labels. Add `aria-label="Mobile navigation"` to the mobile `<nav>` and `aria-label` attributes matching the test names to the two consultation `<select>` elements, then rerun until PASS.

- [ ] **Step 6: Commit interaction coverage**

```bash
git add components/FaqSection.tsx components/Header.tsx components/ConsultationSection.tsx components/__tests__
git commit -m "test: cover site interactions"
```

### Task 3: Establish the Editorial Design Tokens and Motion Policy

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add shared design primitives without changing section markup**

Replace the root color declarations and shared utility layer with tokens that preserve the current palette and add reusable editorial rules:

```css
:root {
  --color-linen: #f5f0eb;
  --color-cream: #e9e2da;
  --color-paper: #fbf8f4;
  --color-dark: #1c1a18;
  --color-charcoal: #2b2825;
  --color-brass: #b69152;
  --color-brass-light: #d6bb88;
  --color-brass-dark: #8f6f3d;
  --color-warm-grey: #756f67;
}

.editorial-shell { max-width: 80rem; margin-inline: auto; padding-inline: clamp(1.5rem, 4vw, 4rem); }
.eyebrow { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
.hairline { height: 1px; background: color-mix(in srgb, var(--color-brass) 75%, transparent); }
.editorial-image { overflow: hidden; background: var(--color-cream); }
.editorial-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 700ms ease; }
.editorial-image:hover img { transform: scale(1.035); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; scroll-behavior: auto !important; transition-duration: 1ms !important; }
}
```

- [ ] **Step 2: Run lint after token changes**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 3: Commit global styling primitives**

```bash
git add app/globals.css
git commit -m "style: establish editorial design tokens"
```

### Task 4: Recompose Navigation and Hero

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Keep the hero behavior and use a two-column editorial composition**

In `HeroSection.tsx`, use `editorial-shell` for the outer container. Keep the current `HERO_PROJECTS`, timed transition, controls, and project image data, but change the content container to:

```tsx
<div className="grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
  <div className="pb-4 lg:pb-12">
    <span className="font-script text-3xl text-[var(--color-brass)]">Signature interiors</span>
    <h1 className="mt-4 max-w-xl font-bodoni-italic text-5xl leading-[0.94] text-[var(--color-charcoal)] sm:text-6xl lg:text-7xl">
      Spaces with a<br /><span className="text-[var(--color-brass-dark)]">considered point of view.</span>
    </h1>
    <div className="hairline mt-8 w-20" />
    <p className="mt-6 max-w-md text-sm leading-7 text-[var(--color-warm-grey)]">...</p>
  </div>
  <div className="editorial-image relative aspect-[4/5] lg:aspect-[5/6]">...</div>
</div>
```

- [ ] **Step 2: Replace control labels that include literal arrows with lucide icons**

Keep `ChevronLeft` and `ChevronRight` buttons, use `aria-label="Previous project"` and `aria-label="Next project"`, and replace the `View →` text with `<ArrowUpRight aria-hidden="true" className="size-4" />` plus an accessible `aria-label`.

- [ ] **Step 3: Tighten the header instead of adding a card treatment**

Use `editorial-shell`, reduce desktop nav gap, use `aria-expanded={mobileOpen}` on the toggle, and retain the newly tested `aria-label="Mobile navigation"` on the open mobile nav. Use a solid linen background only after scrolling and a one-pixel cream rule.

- [ ] **Step 4: Run interaction tests and lint**

Run: `npm test -- components/__tests__/Header.test.tsx && npm run lint`

Expected: both commands exit 0.

- [ ] **Step 5: Commit the navigation and hero update**

```bash
git add components/Header.tsx components/HeroSection.tsx
git commit -m "feat: refine editorial entry experience"
```

### Task 5: Rebuild the Service, Philosophy, and Portfolio Narrative

**Files:**
- Modify: `components/ServicesSection.tsx`
- Modify: `components/DesignPhilosophySection.tsx`
- Modify: `components/PortfolioSection.tsx`

- [ ] **Step 1: Replace repeated cards with editorial structures**

Keep all existing `SERVICES`, `DESIGN_PHILOSOPHIES`, and `PORTFOLIO_ITEMS` data. Use the `editorial-shell` wrapper in all three sections. For service rows, retain alternating content/image alignment and render the index as a thin, oversized, low-opacity numeral. Remove card shadows and rounded treatments.

- [ ] **Step 2: Use material-study presentation for philosophies**

For each philosophy, render one `editorial-image aspect-[4/3]`, the title, a short description, and up to three characteristics as plain comma-separated supporting text. Remove the bordered pill tags and full-card border.

- [ ] **Step 3: Use an uneven but stable portfolio grid**

Keep the existing filter state and filter buttons. Replace the bento grid with a three-column grid at desktop where the first and fourth records use `md:translate-y-16`, and all items use `aspect-[4/5]`, `aspect-square`, or `aspect-[3/4]` explicitly. Each item needs a persistent lower metadata strip containing title, philosophy, and location; do not hide essential project context behind hover.

- [ ] **Step 4: Run lint and all component tests**

Run: `npm test && npm run lint`

Expected: both commands exit 0.

- [ ] **Step 5: Commit the project storytelling sections**

```bash
git add components/ServicesSection.tsx components/DesignPhilosophySection.tsx components/PortfolioSection.tsx
git commit -m "feat: compose editorial project storytelling"
```

### Task 6: Align Trust, Pricing, and Contact Sections

**Files:**
- Modify: `components/ProcessSection.tsx`
- Modify: `components/PackageSection.tsx`
- Modify: `components/BrandStorySection.tsx`
- Modify: `components/TestimonialSection.tsx`
- Modify: `components/FaqSection.tsx`
- Modify: `components/ConsultationSection.tsx`
- Modify: `components/ContactSection.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Remove nested-card presentation throughout lower-page sections**

Keep the existing content and actions. Use dark sections only for the consultation and final contact bands. Convert packages to a contiguous three-column comparison separated by vertical hairlines. Present process steps as a horizontal numbered rule on large screens and stacked rule-separated entries on small screens.

- [ ] **Step 2: Preserve the consultation state machine**

Do not change `step`, `formData`, payment copy, date selection, or WhatsApp proof behavior. Remove decorative outer-card layers, apply the new paper surface and hairlines, and make booking controls stable in width with text that wraps safely on narrow screens.

- [ ] **Step 3: Make FAQ and testimonials quiet editorial interludes**

Keep the FAQ behavior from Task 2. Use a single divider between answers and the existing Plus/Minus icons. Keep manual testimonial dots and interval behavior; display one large quote with compact client/project metadata and no additional panel.

- [ ] **Step 4: End with a direct contact composition**

Retain current email, WhatsApp, address, and Instagram data. Use two unframed columns in the dark contact band, with hairline form inputs and an outlined submit command. Make the footer compact, using direct anchor mappings so every footer link targets a section that exists.

- [ ] **Step 5: Run tests and lint**

Run: `npm test && npm run lint`

Expected: both commands exit 0.

- [ ] **Step 6: Commit the lower-page alignment**

```bash
git add components/ProcessSection.tsx components/PackageSection.tsx components/BrandStorySection.tsx components/TestimonialSection.tsx components/FaqSection.tsx components/ConsultationSection.tsx components/ContactSection.tsx components/Footer.tsx
git commit -m "feat: align premium conversion sections"
```

### Task 7: Production Verification and Visual Review

**Files:**
- Modify only when verification identifies a concrete defect in the files above.

- [ ] **Step 1: Run the complete automated verification suite**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, lint exits 0, and the Next.js production build completes successfully.

- [ ] **Step 2: Review responsive renderings**

Run the development server with `npm run dev`, then inspect the home page at 1440px, 1024px, 768px, and 390px widths. Confirm: header/nav are usable; hero title and CTAs do not overlap; project images retain intentional crops; portfolio filter results remain laid out; form controls remain readable; dark/light bands have sufficient contrast; reduced-motion has no long animation.

- [ ] **Step 3: Fix only verified defects and rerun the full suite**

Run: `npm test && npm run lint && npm run build`

Expected: exit code 0 after each visual fix.

- [ ] **Step 4: Commit verified refinements**

```bash
git add app/globals.css components package.json package-lock.json vitest.config.ts test
git commit -m "fix: polish responsive editorial experience"
```

## Self-Review

- The plan keeps existing one-page routing, client behavior, service data, payment copy, and conversion links intact.
- Tasks 3 through 6 cover every approved visual area: entry, service, philosophy, portfolio, process, packages, story, trust, FAQ, booking, contact, and footer.
- Tasks 1 and 2 establish red-green coverage for FAQ, mobile navigation, and the first booking transition before their UI changes.
- The plan contains no placeholder implementation steps; image assets remain existing local files and no invented client claims are introduced.

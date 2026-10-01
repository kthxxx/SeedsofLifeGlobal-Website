# Seeds of Life Global homepage redesign

## Objective

Redesign the Seeds of Life Global homepage as a warm, trustworthy, human, and globally credible non-profit experience. The page should help visitors understand the organization, see credible evidence of its work, explore its programs and community story, and find a clear way to participate.

The redesign will preserve existing routes, SEO metadata, contact behavior, content provenance, and verified organizational claims. It will use only content and imagery already present in the repository, with minor restructuring for clarity.

## Approved visual direction

The homepage will use a documentary-editorial non-profit aesthetic rather than a commercial landing-page or SaaS pattern. Its character will come from real community photography, strong serif display typography, generous negative space, asymmetric composition, and restrained organic details.

The existing brand system remains authoritative:

- Forest `#173B2A` anchors navigation, primary text, and major surfaces.
- Cream `#F7F3E9` is the primary canvas.
- Moss `#58724D` supports secondary text and quiet surfaces.
- Clay `#A75434` provides editorial accents.
- Sun `#E8C957` is reserved for welcoming emphasis and primary calls to action.
- Georgia/Times remains the display stack, while Arial/Helvetica remains the utility and body stack.

The redesign will avoid glassmorphism, prominent gradients, equal-height feature cards, excessive rounding, decorative icon grids, or animation that competes with the content.

## Information architecture

The homepage will have seven chapters in this order:

1. Hero
2. Who we are
3. Impact and credibility
4. Programs
5. Community story
6. Get involved
7. Footer

This replaces the current longer sequence of overlapping purpose, ministry, audience, faith, program, and story sections. Faith remains present in the organization's mission language and brand story without becoming a repeated standalone homepage chapter.

## Hero

The hero will use an asymmetric split composition on large screens: mission content on a quiet forest or cream editorial panel and the existing community gathering photograph in a large adjacent frame. The photograph must keep the people legible and avoid the heavy full-frame overlay currently needed for white text.

Content will be drawn from the existing brand and organization copy:

- Headline: “Planting seeds. Nurturing lives.”
- Supporting copy: a concise restructuring of the existing non-profit purpose summary.
- Primary action: `/programs`, labeled “Explore our work.”
- Secondary action: `/about`, labeled “Who we are.”

On mobile, the photograph and copy will stack so the headline, supporting text, and both calls to action are visible without horizontal clipping. The header will not obscure hero content.

## Who we are

This section will give a concise explanation of Seeds of Life Global using the existing organization and mission language. It will explicitly connect education, training, community development, partnerships, livelihood, charitable work, and humanitarian support without implying that every authorized activity is currently scheduled.

The composition will use a small editorial label beside a larger statement and a limited-width body paragraph. A short set of plain-text focus phrases may organize the existing areas, but they will not be rendered as a generic icon-card grid.

## Impact and credibility

The three existing verified impact figures will remain unchanged:

- 1,000+ children directly served
- 500+ leaders trained
- 100+ communities reached

They will be displayed as large, open typographic figures separated by rules rather than contained cards. Supporting details will remain adjacent to their figures so context is not lost.

The current Community Bible Study program and Mt. Moriah construction status will appear as concise evidence notes. Existing partner names will be presented as a calm, readable partner register rather than a continuously moving marquee. No partner logos, links, endorsements, or statistics will be invented.

## Programs

All five existing program areas will remain available:

1. Children and youth development
2. Livelihood and community skills
3. Community and environment
4. Humanitarian assistance
5. Educational and social partnerships

The section will use a numbered editorial index with varied row emphasis, clear summaries, and a supporting image. It will avoid repetitive bordered cards. Each program entry will link to `/programs`, preserving the existing destination and allowing the detailed page to retain the careful distinction between corporate purpose and currently operating activities.

## Community story

The existing Mt. Moriah opening story will become the homepage's primary human-centered feature. It will use existing gallery or community photography, the verified date of December 28, 2024, and the established archived-story framing.

The feature will link to `/stories/mt-moriah-opening`. A secondary gallery link will remain available. The copy will not imply that archived aspirations are current commitments.

## Get involved

The section will provide three clear paths using existing site content:

- Volunteer
- Partner
- Support

These are invitations to contact the organization, not transactional controls. The support path must retain the existing disclosure that the website does not process payments. Calls to action will lead to `/involved` or `/contact` as appropriate.

## Navigation and footer

Desktop navigation will retain every existing route and current-page indication. The visual treatment will become quieter and more editorial while maintaining a clear Get involved action.

Mobile navigation will become a spacious overlay or full-width panel with:

- an explicit open/close control;
- visible focus treatment;
- Escape-key dismissal;
- focus moved into the menu when opened and returned to the trigger when closed;
- background scroll locking while open;
- route-change closure;
- comfortable touch targets.

The footer will retain the organization name, tagline, Philippine and United States contact details, navigation, non-profit description, and scripture reference. Social or legal links will only be added if verified destinations already exist; none will be fabricated for this redesign.

## Reusable components and implementation boundaries

The implementation will work within the existing Next.js 16, React 19, and Tailwind CSS 4 stack without adding dependencies.

Expected source changes are limited to:

- `app/page.tsx` for homepage composition and content hierarchy;
- `app/globals.css` for shared editorial tokens, organic details, responsive refinements, and motion behavior;
- `components/navbar.tsx` for the mobile navigation upgrade;
- `components/footer.tsx` for the revised footer composition;
- small focused homepage components only if they make the page easier to understand and maintain.

Existing data in `lib/data.ts` will be consumed without overwriting or reinterpreting the user's staged changes. Other page routes and their content will remain intact.

## Responsiveness

The design will be checked at narrow mobile, standard mobile, tablet, laptop, and wide desktop widths. Layouts will collapse intentionally rather than merely stacking desktop columns. Type will use responsive `clamp()`-style sizing where useful, body copy will stay near a readable 60–65 character measure, and imagery will use stable aspect ratios to prevent layout shift.

The mobile hero and calls to action receive priority. Program rows, statistics, contact information, and footer navigation must remain readable without horizontal scrolling.

## Accessibility

The existing skip link, semantic landmarks, heading hierarchy, meaningful image alternatives, current-page navigation state, and reduced-motion support will be preserved.

The redesign will additionally verify:

- WCAG-friendly foreground/background contrast;
- visible keyboard focus on every interactive element;
- 44px minimum interactive targets where practical;
- correct mobile-menu focus and scroll behavior;
- descriptive link labels;
- decorative organic elements hidden from assistive technology;
- motion disabled or simplified for `prefers-reduced-motion`;
- content remains present and usable if animation JavaScript does not run.

## Motion and performance

Motion will be limited to short opacity/transform reveals, subtle image movement, and tactile hover/press feedback. It will not control reading order or conceal content indefinitely. The continuous partner marquee will be removed from the homepage in favor of static content.

Existing local images will continue through `next/image` with accurate `sizes`, stable dimensions, and priority reserved for the hero. No new font or animation dependency will be added. Decorative effects will use lightweight CSS and will respect reduced-motion preferences.

## Verification

After implementation:

1. Run `npm run lint`.
2. Run TypeScript checking with `npx tsc --noEmit` because no dedicated typecheck script exists.
3. Run any relevant existing tests if discovered.
4. Run `npm run build`.
5. Capture and inspect the homepage at desktop and mobile widths, including the open mobile navigation.
6. Fix regressions introduced by the redesign.

## Success criteria

The redesign is complete when the homepage communicates the mission immediately, presents verified impact without inflated claims, gives the five program areas a clear editorial structure, foregrounds a real community story, offers accurate ways to participate, and remains performant and accessible across desktop and mobile while preserving all existing functionality.

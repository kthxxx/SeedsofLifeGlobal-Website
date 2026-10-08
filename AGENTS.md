# Seeds of Life Global — Codex UI Instructions

This project is the official website of Seeds of Life Global, an NGO focused on education, training, community development, charity, partnerships, and social impact.

Whenever a task involves UI, UX, layout, responsive design, typography, colors, components, accessibility, animation, or visual hierarchy, use UI Skills first.

## UI Skills workflow

Before changing frontend UI:

1. Run:

   npx ui-skills start

2. Inspect the available categories if needed:

   npx ui-skills categories

3. Select the smallest relevant skill for the task.

4. Load it with:

   npx ui-skills get <skill-name>

Prefer one skill.
Use two only when the task clearly spans two different areas.
Avoid loading more than three.

## Brand direction

The website should feel:

- warm
- trustworthy
- human
- hopeful
- community-centered
- modern
- professional
- globally credible
- approachable

Avoid:

- generic SaaS aesthetics
- overly corporate layouts
- excessive gradients
- glassmorphism everywhere
- excessive card grids
- futuristic AI styling
- cluttered layouts
- childish non-profit design
- overly decorative animations

## Visual principles

Use a calm editorial NGO style with:

- generous whitespace
- strong photography
- clear storytelling
- warm natural colors
- clear content hierarchy
- readable typography
- large human-centered headings
- subtle organic visual details
- restrained motion
- accessible contrast

Design should communicate real impact, dignity, and trust.

## UX priorities

Prioritize:

1. Understanding who Seeds of Life Global is
2. Understanding its mission and programs
3. Seeing real community impact
4. Learning how to participate or support
5. Building trust in the organization

Navigation and calls-to-action must be clear on both desktop and mobile.

## Accessibility

Follow WCAG-friendly practices:

- semantic HTML
- keyboard navigation
- visible focus states
- alt text
- sufficient contrast
- clear heading hierarchy
- accessible form labels
- reduced-motion support when appropriate

## Development rules

Before implementing:

- inspect the existing design system
- inspect reusable components
- preserve working functionality
- preserve SEO metadata
- preserve routes
- reuse components where appropriate
- avoid unnecessary dependencies

After implementation:

- run lint
- run type checking if available
- run tests if available
- run the production build
- fix errors introduced by the changes

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

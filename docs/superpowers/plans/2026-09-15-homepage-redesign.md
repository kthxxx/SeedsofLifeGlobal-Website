# Seeds of Life Global Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a concise documentary-editorial non-profit experience that preserves existing content, routes, and functionality while improving hierarchy, responsiveness, accessibility, and performance.

**Architecture:** Keep the existing Next.js App Router and Tailwind CSS 4 architecture. Compose the homepage from server-rendered semantic sections backed by `lib/data.ts`, keep interactive behavior isolated in the existing client-side `Navbar`, and use shared CSS primitives for repeated editorial treatments. Add a dependency-free verification script that checks the rendered homepage contract against a running local server.

**Tech Stack:** Next.js 16.3.3, React 19.2.3, TypeScript 5, Tailwind CSS 4.1.9, Next Image, Lucide React, Node.js built-in APIs.

**Spec:** `docs/superpowers/specs/2026-09-15-homepage-redesign-design.md`

## Global Constraints

- Preserve existing routes, SEO metadata, contact behavior, and verified organizational claims.
- Use only content and imagery already present in the repository; minor restructuring for clarity is allowed.
- Keep Forest `#173B2A`, Cream `#F7F3E9`, Moss `#58724D`, Clay `#A75434`, and Sun `#E8C957` as the authoritative palette.
- Keep Georgia/Times for display typography and Arial/Helvetica for utility and body typography.
- Do not add dependencies.
- Do not add glassmorphism, prominent gradients, equal-height feature cards, decorative icon grids, excessive rounding, or distracting motion.
- Preserve the user's existing staged changes in `lib/data.ts`; consume them without overwriting or reinterpreting them.
- Do not invent social links, legal links, donation processing, partner logos, statistics, programs, or current-activity claims.
- Maintain semantic HTML, keyboard navigation, visible focus states, meaningful alt text, sufficient contrast, and reduced-motion behavior.

## File map

- Modify `app/page.tsx`: own the seven-chapter homepage content and composition.
- Modify `app/globals.css`: own reusable editorial layout primitives, organic accents, interaction states, and reduced-motion behavior.
- Modify `components/navbar.tsx`: own desktop navigation and the accessible mobile menu state machine.
- Modify `components/footer.tsx`: own the streamlined organizational footer.
- Create `scripts/verify-homepage.mjs`: own dependency-free rendered-content and hierarchy checks.
- Do not modify `lib/data.ts`, routes outside the homepage, or the existing metadata implementation.

---

### Task 1: Add the homepage contract verifier

**Files:**
- Create: `scripts/verify-homepage.mjs`

**Interfaces:**
- Consumes: a running homepage URL from `HOMEPAGE_URL`, defaulting to `http://127.0.0.1:3000`.
- Produces: exit code `0` when required content, routes, and section order are present; nonzero exit code with a specific assertion message otherwise.

- [ ] **Step 1: Write the failing homepage contract script**

Create a dependency-free Node script with these exact contracts:

```js
import assert from "node:assert/strict"

const baseUrl = process.env.HOMEPAGE_URL ?? "http://127.0.0.1:3000"
const response = await fetch(baseUrl)
assert.equal(response.ok, true, `Homepage request failed: ${response.status}`)

const html = await response.text()
const chapters = ["home-hero", "who-we-are", "impact", "programs", "community-story", "get-involved"]
let previousIndex = -1

for (const chapter of chapters) {
  const index = html.indexOf(`id="${chapter}"`)
  assert.ok(index > previousIndex, `${chapter} is missing or out of order`)
  previousIndex = index
}

for (const text of [
  "Planting seeds.",
  "Nurturing lives.",
  "1,000+",
  "500+",
  "100+",
  "Children &amp; youth development",
  "Livelihood &amp; community skills",
  "Community &amp; environment",
  "Humanitarian assistance",
  "Educational &amp; social partnerships",
  "Mt. Moriah",
  "Volunteer",
  "Partner",
  "Support",
  "This website does not process payments",
]) assert.ok(html.includes(text), `Missing required homepage content: ${text}`)

for (const href of ["/about", "/programs", "/gallery", "/involved", "/contact", "/stories/mt-moriah-opening"]) {
  assert.ok(html.includes(`href="${href}"`), `Missing required route: ${href}`)
}

assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, "Homepage must render exactly one h1")
console.log("Homepage contract verified")
```

- [ ] **Step 2: Run the verifier against the existing homepage and confirm failure**

Run: `node scripts/verify-homepage.mjs`

Expected: FAIL because `id="home-hero"` and the new ordered chapter IDs do not exist yet.

- [ ] **Step 3: Commit the failing contract**

```bash
git add scripts/verify-homepage.mjs
git commit -m "test: define homepage redesign contract"
```

---

### Task 2: Build the seven-chapter homepage narrative

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `currentImpact`, `organization`, `organizationName`, and `programAreas` from `lib/data.ts`; `Navbar`, `Footer`, and `CTAButton`; existing images under `public/`.
- Produces: server-rendered sections with IDs `home-hero`, `who-we-are`, `impact`, `programs`, `community-story`, and `get-involved` in that order.

- [ ] **Step 1: Replace homepage imports with the exact dependencies required by the new composition**

Use this import boundary:

```tsx
import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { CTAButton } from "@/components/cta-button"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { currentImpact, organization, organizationName, programAreas } from "@/lib/data"
```

Remove `PartnerLogoLoop` and `ministryFocuses` from the homepage. Do not delete their implementations because other routes or future work may still use them.

- [ ] **Step 2: Implement the split documentary hero**

Replace the full-overlay hero with a two-part `section#home-hero`. The content side must contain the existing location eyebrow, one `h1`, the existing non-profit-purpose language, `/programs` and `/about` actions, and a downward link to `#who-we-are`. The image side must render `/hero-background.jpg` with the existing descriptive alt text and `priority`.

Use this semantic structure:

```tsx
<section id="home-hero" aria-labelledby="home-hero-title" className="home-hero">
  <div className="home-hero__content">
    <p className="eyebrow text-[#e8c957]">Seeds of Life Global Inc. · Sibonga, Cebu</p>
    <h1 id="home-hero-title" className="display-type home-hero__title">
      Planting seeds.<br />Nurturing lives.
    </h1>
    <p className="home-hero__copy">A Christian non-profit supporting learning, training, community development, livelihood, environmental care, humanitarian assistance, and partnership.</p>
    <div className="home-hero__actions">
      <CTAButton href="/programs">Explore our work</CTAButton>
      <Link href="/about" className="editorial-link text-white">Who we are <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
    </div>
  </div>
  <figure className="home-hero__image">
    <Image src="/hero-background.jpg" alt="Seeds of Life Global community gathering in a rural Cebu setting" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover object-[center_58%]" />
  </figure>
</section>
```

Add CSS grid behavior at `lg`, a stable mobile image aspect ratio, `clamp()`-based title sizing, and a subtle cream/forest organic pseudo-element that is `pointer-events: none`.

- [ ] **Step 3: Implement the concise Who we are chapter**

Add `section#who-we-are` after the hero. Use `organizationName` and `organization.purposeSummary` to explain the organization without claiming all authorized activities are current. Render the following existing areas as a typographic list separated by rules: “Education”, “Training”, “Community development”, “Partnerships”, and “Charitable work”. Link to `/about`.

Keep body text within approximately `max-w-[42rem]` and use one `h2` with balanced wrapping.

- [ ] **Step 4: Implement open-format impact and credibility**

Add `section#impact` with one intro and map `currentImpact.stats` into an unboxed definition-list-like grid. Preserve every value, label, and detail verbatim. Use tabular numbers on the values.

Below the figures, render two evidence notes from `currentImpact.program` and `currentImpact.mtMoriah`, retaining their status and description. Render `currentImpact.partners` as a static unordered list under “Working alongside” so reduced-motion users and low-power devices do not incur a perpetual animation loop.

- [ ] **Step 5: Implement the asymmetric program index**

Add `section#programs` with `/programs-background.jpg` as the supporting documentary image and map all five `programAreas` into numbered editorial rows. Each row must link to `/programs`, expose the existing number/title/summary, and use a clear hover/focus state based on color and a small `transform`, not a card shadow.

Use a desktop grid with a sticky or aligned image/intro column and a flexible program-list column. Disable sticky positioning below `lg`.

- [ ] **Step 6: Implement the Mt. Moriah community story**

Add `section#community-story` with `/Gallery/image3.jpg`, the date `<time dateTime="2024-12-28">December 28, 2024</time>`, and careful archived-story language. Link the main story action to `/stories/mt-moriah-opening` and the secondary action to `/gallery`.

The image and copy should overlap slightly only at desktop widths; mobile must remain a normal document flow.

- [ ] **Step 7: Implement the Get involved invitation**

Add `section#get-involved` with three semantic pathways: Volunteer, Partner, and Support. Use the existing descriptions from `app/involved/page.tsx`, shortened only where needed. Link each pathway to `/involved` or `/contact`.

Include this exact support disclosure: “This website does not process payments. Contact the organization for verified information about giving.”

Present the pathways as open columns or ruled rows, not bordered white cards.

- [ ] **Step 8: Add reusable editorial CSS primitives and restrained motion**

In `app/globals.css`, add focused classes for the split hero, numbered program rows, open stat typography, documentary image frames, and organic pseudo-elements. Use the existing palette variables instead of introducing duplicate colors where possible.

Add pressed feedback without changing layout:

```css
.cta-button:active,
.editorial-action:active { transform: translateY(1px); }

.impact-value {
  font-variant-numeric: tabular-nums lining-nums;
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__image img,
  .story-image img { transform: none !important; }
}
```

Ensure server-rendered content is visible before `MotionObserver` runs and remains visible when JavaScript is unavailable.

- [ ] **Step 9: Run the homepage contract and static checks**

Run: `node scripts/verify-homepage.mjs`

Expected: `Homepage contract verified`.

Run: `npm run lint`

Expected: exit code `0`.

- [ ] **Step 10: Commit the homepage narrative**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: redesign homepage narrative"
```

---

### Task 3: Upgrade the accessible mobile navigation

**Files:**
- Modify: `components/navbar.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `usePathname`, the existing `navLinks`, existing logo asset, and React state/effect/ref APIs.
- Produces: the same public `Navbar(): JSX.Element` interface and the same routes, with focus-managed mobile-menu behavior.

- [ ] **Step 1: Add refs and lifecycle behavior**

Import `useRef`, create `menuButtonRef` and `firstMobileLinkRef`, and preserve the previously focused element when the menu opens. In the open-state effect:

```tsx
const menuButtonRef = useRef<HTMLButtonElement>(null)
const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)

useEffect(() => {
  if (!isOpen) return
  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = "hidden"
  requestAnimationFrame(() => firstMobileLinkRef.current?.focus())

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false)
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  window.addEventListener("keydown", handleKeyDown)
  return () => {
    document.body.style.overflow = previousOverflow
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [isOpen])
```

Remove the old duplicate Escape listener.

- [ ] **Step 2: Close the menu on route changes and wide-screen transitions**

Add an effect keyed by `pathname` that closes the menu. Add a `matchMedia("(min-width: 64rem)")` listener that closes it if the viewport crosses into desktop navigation while open.

- [ ] **Step 3: Replace the expanding strip with a viewport-aware panel**

Keep `aria-expanded`, `aria-controls`, and the dynamic button label. Attach `ref={menuButtonRef}`. Render the mobile panel as a fixed or absolute cream surface below the header with a large numbered navigation list and a clearly separated Get involved action. Attach `ref={firstMobileLinkRef}` to the Home link.

Use `aria-label="Mobile navigation"` and ensure every navigation target is at least 44px high. Do not present the panel as a modal dialog because the navigation landmark already communicates its purpose and no unrelated interactive page content remains reachable while body scrolling is locked.

- [ ] **Step 4: Add mobile-menu transition and focus CSS**

Use opacity and transform only. Keep the opening/closing transition at or below 300ms and remove it under `prefers-reduced-motion`. Avoid backdrop blur on the full menu surface.

- [ ] **Step 5: Run lint and type checking**

Run: `npm run lint`

Expected: exit code `0`.

Run: `npx tsc --noEmit`

Expected: exit code `0`.

- [ ] **Step 6: Commit the navigation upgrade**

```bash
git add components/navbar.tsx app/globals.css
git commit -m "feat: improve mobile navigation accessibility"
```

---

### Task 4: Refine the organizational footer

**Files:**
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: `contactInfo`, `unitedStatesContactInfo`, `organizationName`, and `tagline` from `lib/data.ts`.
- Produces: the same public `Footer(): JSX.Element` interface with unchanged contact links and routes.

- [ ] **Step 1: Restructure the footer as a clearer trust block**

Retain the organization name, tagline, Get involved link, navigation, email, both telephone numbers, both addresses, non-profit statement, and John 15:5 reference. Use a large organization statement followed by a restrained two-column information area rather than a dense three-column link farm.

Keep these href contracts unchanged:

```tsx
<a href={`mailto:${contactInfo.email}`}>...</a>
<a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>...</a>
<a href={`tel:${unitedStatesContactInfo.phone}`}>...</a>
```

Do not add social or legal links because no verified destinations exist in the repository.

- [ ] **Step 2: Verify footer landmarks and interaction states**

Confirm the footer contains one labeled navigation landmark, contact anchors remain keyboard reachable, long email/address text wraps at 320px, and focus rings remain visible against the forest surface.

- [ ] **Step 3: Run lint and the homepage contract**

Run: `npm run lint`

Expected: exit code `0`.

Run: `node scripts/verify-homepage.mjs`

Expected: `Homepage contract verified`.

- [ ] **Step 4: Commit the footer refinement**

```bash
git add components/footer.tsx
git commit -m "feat: refine non-profit footer"
```

---

### Task 5: Complete responsive, accessibility, and production verification

**Files:**
- Modify if defects are found: `app/page.tsx`
- Modify if defects are found: `app/globals.css`
- Modify if defects are found: `components/navbar.tsx`
- Modify if defects are found: `components/footer.tsx`

**Interfaces:**
- Consumes: the completed homepage, navigation, footer, and verification script.
- Produces: a lint-clean, type-safe, production-buildable homepage verified visually at representative viewport sizes.

- [ ] **Step 1: Run source-level verification**

Run:

```bash
git diff --check
npm run lint
npx tsc --noEmit
node scripts/verify-homepage.mjs
```

Expected: every command exits `0`; the verifier prints `Homepage contract verified`.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js reports a successful production build with the homepage and existing routes generated or compiled without errors.

- [ ] **Step 3: Capture desktop and mobile visual evidence**

Capture the homepage at approximately `1440×1000`, `1024×768`, `768×1024`, `390×844`, and `320×700`. At each width verify:

- no horizontal overflow;
- hero headline, copy, and both actions are readable;
- the community photograph retains meaningful people-centered framing;
- statistics and program rows maintain clear reading order;
- story overlap is disabled on mobile;
- contact details wrap cleanly;
- heading scale does not create orphaned single words where avoidable.

- [ ] **Step 4: Verify keyboard and mobile-menu behavior**

Using the rendered site:

1. Tab to the skip link and confirm it becomes visible.
2. Activate it and confirm focus moves to the main content target.
3. At a mobile width, open the menu and confirm focus enters the first link.
4. Press Escape and confirm the menu closes and focus returns to the trigger.
5. Open the menu again, activate a route, and confirm the menu closes.
6. Enable reduced motion and confirm content remains visible without marquee or entrance movement.

- [ ] **Step 5: Fix only defects found by verification and rerun affected checks**

For each discovered defect, first reproduce it at the exact viewport or interaction state, make the smallest focused correction, and rerun the failed check plus `npm run lint` and `npx tsc --noEmit`.

- [ ] **Step 6: Commit verification fixes if any**

```bash
git add app/page.tsx app/globals.css components/navbar.tsx components/footer.tsx
git commit -m "fix: polish homepage responsive behavior"
```

- [ ] **Step 7: Record final evidence**

Report the exact commands run, their exit codes, the viewport sizes inspected, and any limitations. Explicitly confirm that `lib/data.ts` and the user's existing staged brand artifacts were not overwritten.

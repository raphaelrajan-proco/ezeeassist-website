# Design context

**The homepage is the reference implementation.** This file codifies it so
every other page can be built or migrated against one spec. Where this file and
the homepage disagree, the homepage is right and this file is stale — fix the
file.

Read this before building or editing any page. `AGENTS.md` points here so it
loads on every task.

---

## 0. How to use this with a page brief

Most page briefs supply **flow and copy** and little or no visual direction.
That is deliberate. The brief owns *what the section says and in what order*;
this file plus your own judgment owns *what the section looks like*.

So the build order for any page is:

1. Read the brief end to end before writing anything. Map every section to
   what it is actually doing (Section 1 below).
2. **Design the visual for each section** using §1's decision procedure. Do
   this on paper first, for the whole page, so you can see the repetition
   before you build it.
3. Run the page-level variety check (§1.4). Fix collisions before coding.
4. Build against the tokens and scales in §2–§9.
5. Verify against §10, then the checklist in §11.

If a brief specifies a visual explicitly, build what it specifies — but still
run the variety check, and say so if the specified visual repeats a form
already used two sections earlier.

---

## 1. The visual mandate

> A page of well-set text is not a designed page. Every section earns a visual
> or it earns being cut.

### 1.1 Start from what the section is *doing*

Never start from "what component do I have." Start from the section's job, then
pick the form that job implies.

| The section is doing this | Candidate forms | Never |
|---|---|---|
| Showing a **product moment** (someone asks, the system answers) | Chat/message card, notification card, brief, ticket artifact | A bulleted feature list |
| Showing an **inventory** (what it reads, what connects) | Ledger with real filenames, versions, sources | A logo wall with no descriptors |
| Showing a **report** (what the data says) | Table with colour-coded verdicts, sparkline row, stat band | A paragraph describing the report |
| Showing a **process** (how it works, step by step) | Numbered spine or pipeline, horizontal flow with a branch | Stacked prose cards numbered 01–05 |
| Showing a **comparison** (before/after, two roles, two paths) | Side-by-side pair with deliberate asymmetry, split panel | A two-column table of adjectives |
| Showing a **refusal** (what it won't do, what doesn't happen) | Struck-through "what you were asked to do", X-marked list, negative-treatment panel | A positively-worded card that hides the negative |
| Showing **scale or coverage** | One oversized figure, a radar, a grid that fills | Restating the count in body copy |
| Showing **chaos or fragmentation** | Scattered, misaligned, multi-channel fragments at real timestamps | A neatly sorted table (see 1.3) |
| Showing **governance or guarantees** | Dark band, four label/value columns | A card grid identical to the three above it |
| **Proof** | Quote card with logo, one metric, attribution, link | Three quotes when you only have one strong one |

### 1.2 Make it concrete, not decorative

The homepage's whole credibility strategy is **artifacts over abstractions**.

- Use real-looking specifics: `refund-policy-v4.pdf`, `Store #118`, `9:14am`,
  `Ticket #4471`, `v11 · current`. `9:14am` is credible where `9:00am` is not.
- Show the thing, don't describe the thing. A ticket artifact beats a card
  that says "tickets carry full context."
- If the data shape is not from a real customer, **label the card
  illustrative** in muted 12px beneath it. Never imply it is customer data.
- Never invent a metric. Unsourced numbers ship as a visible `{{TBD:key}}`
  token or not at all. See §9.

### 1.3 The contradiction check

**Does the visual argue the same thing the copy argues?**

The failure that is easiest to ship and hardest to see: a section whose copy
describes disorder while its visual is perfectly ordered. Copy that says "five
questions, five channels, and the answers drift" rendered as a tidy aligned
table makes the problem look *solved*. The visual has to feel like the thing it
describes — scattered when the point is scatter, dense when the point is
volume, asymmetric when the point is imbalance.

Run this on every section: *if I only saw the visual, what would I conclude?*
If that differs from the copy, the visual is wrong.

### 1.4 The page-level variety check

Before coding, list every section and its visual form in one column. Then:

- **No form appears more than twice per page.** Card grids are the default
  everyone reaches for and therefore the biggest offender; three card grids on
  one page reads as a template, not a page.
- **No two adjacent sections share a form.** If they must, change the surface
  (§4.1) or the density so the eye registers a boundary.
- **Two sections must never enumerate the same items.** Listing eight
  categories of system and then twelve individual systems is one idea shown
  twice. Either the second adds new information (a count, a filter, a
  different cut) or it gets cut.
- **Repetition is allowed when it is a callback.** Re-using the hero's chat
  card in a later section to re-answer the same question two ways is a
  deliberate rhyme, not repetition. Say so in a code comment.
- **Every page needs at least one artifact** — a moment where the product is
  visible doing something. A page made only of cards and chips has no evidence
  in it, and abstract pages need evidence most.
- **Vary density, not just form.** Alternate heavy sections (a full-width
  artifact) with light ones (a chip row and three hairline rules). A page where
  every section is the same weight reads flat regardless of form variety.

### 1.5 Iterate before you commit

For any section where the right visual is not obvious, sketch two or three
options and pick against these, in order: does it argue the copy's point (1.3),
is it concrete (1.2), does it collide with a neighbour (1.4), can it hold at
375px (§8).

**When to stop and ask rather than guess:** a section has no visual direction
*and* no obvious form from 1.1; the honest visual needs data or assets that do
not exist; or two readings of the brief produce materially different pages.
Ask once, in a batch, with a recommendation — not one question at a time.

---

## 2. Activating the system

Wrap the page's root element in `theme-editorial`. Every token and utility
below is scoped to `.theme-editorial ...` and does nothing without it.

```tsx
export default function Page() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">{/* sections */}</main>
      <Footer />
    </div>
  );
}
```

`Navbar` and `Footer` are shared across every route. Never restyle them for one
page.

### Two systems exist

| System | Where | What to do |
|---|---|---|
| **Editorial** (`.theme-editorial`) | `/`, `/speak-to-an-expert`, `/solutions/coaches`, `/platform/answers`, `/platform/integrations` | The standard. Build every new page here. |
| Legacy (raw Tailwind, hardcoded hex) | the remaining routes | Migrate when next touched. Do not extend. |

Legacy pages are recognisable by `text-[#0A0A0A] dark:text-[#F0F0F0]` and
`border-[#E5E7EB] dark:border-white/[0.08]` — the editorial tokens written the
long way. Migration is mostly find-and-replace to the variables below, plus the
type scale.

---

## 3. Type

### 3.1 Faces

| Role | Family | Variable | Weights loaded |
|---|---|---|---|
| Display / headings | Plus Jakarta Sans | `--font-editorial` | 400, 500, 600, 700, 800 |
| Body | Inter | `--font-inter` | 400, 500, 600, 700 |
| Mono (metadata, data) | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` | — | — |

`.theme-editorial` sets Inter as the default `font-family`, so body copy needs
no declaration. `h1`–`h6` inside the theme pick up Plus Jakarta automatically.
Onest and Inter Tight are loaded as fallbacks in the `--font-editorial` stack;
do not call them directly.

**Mono is for machine-generated facts only** — timestamps, store numbers, file
names, versions, IDs, eyebrows. Never for sentences.

### 3.2 The scale

Fluid `clamp()` for anything above body size. The third value is a ceiling you
must set so the line does not break where a break reads badly — and when you
set one, leave a comment saying at what width it was derived.

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero H1 (homepage) | `clamp(3.25rem, 2rem + 3.2vw, 5rem)` | 700 | `-0.03em` | 1.02–1.06 |
| Page H1 (sub-page) | `clamp(1.625rem, 0.55rem + 2.4vw, 2.5rem)` | 700 | `-0.03em` | 1.06 |
| Section H2 (homepage) | `clamp(2rem, 1.1rem + 1.9vw, 3rem)` | 500 | `-0.03em` | 1.05 |
| Section H2 (sub-page) | `clamp(1.5rem, 0.8rem + 1.7vw, 2.375rem)` | 700 | `-0.03em` | 1.08 |
| Section lead / large statement | `clamp(1.25rem, 0.25rem + 2vw, 2rem)` | 500–700 | `-0.02em` | 1.25–1.4 |
| Sub-lead (under a section lead) | `calc(0.6 × the lead clamp)` | 400 | normal | 1.5 |
| Closing statement in a band | `clamp(1.125rem, 0.5rem + 1.4vw, 1.625rem)` | 500–700 | `-0.02em` | 1.3 |
| Card title | `16–18px` | 600 | `-0.02em` | 1.2–1.25 |
| Body | `15–18px` | 400 | normal | 1.5–1.6 |
| Card body | `14–14.5px` | 400 | normal | 1.5 |
| Supporting / caption | `12–13.5px` | 400 | normal | 1.45–1.55 |
| Eyebrow (mono, uppercase) | `10–11px` | 600 | `0.14–0.16em` | — |
| Metadata label (mono, uppercase) | `10px` | 600 | `0.13em` | — |
| Data in tables (mono) | `12.5px` | 500–600 | normal | — |
| Illustrative / disclaimer | `12px` | 400 | normal | 1.5 |

Prefer `SectionHead` (`components/platform/shared.tsx`) or `SectionHeadline`
(`components/growth/shared.tsx`) over re-deriving the scale.

**Numerals in tables, briefs, ledgers and counters** get
`fontVariantNumeric: "tabular-nums"` so they do not jitter.

### 3.3 SVG text scales with the viewBox

Font sizes inside an SVG are in **user units**, so the rendered pixel size is
the unit value × the chart's scale. A 560-unit-wide chart rendered at 327px on
a phone renders 12-unit labels at 7px — unreadable. **Phone label sizes go up,
not down.** Set breakpoints against the chart's rendered scale, not the
viewport, and measure the result.

---

## 4. Colour

### 4.1 Section backgrounds — the four surfaces

A page is built by alternating these. Never run two identical surfaces back to
back without another separator.

| Surface | Value | Use |
|---|---|---|
| **Default** | `--ed-bg` (`#FFFFFF` / dark `#0A0A0A`) | The baseline section |
| **Alt** | `--ed-bg-alt` (`#F4F4F5` / dark `#141414`) | The alternating band that separates neighbours |
| **Dark solid** | `#0B1220` | Governance / guarantee bands. Dark in both themes |
| **Dark photographic** | `#0B2C48` + `/hero-bg.jpg` + scrim | Hero and closing CTA only. Dark in both themes. See §5 |

Rhythm for a typical sub-page: white hero → alt → white → alt → white → alt →
**dark band** → white → alt → **dark photographic CTA**. Two dark moments per
page maximum, and never adjacent.

### 4.2 Tokens

Defined on `.theme-editorial` in `app/globals.css` with a dark-mode block. Use
the variable, never the hex, so dark mode follows for free.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ed-bg` | `#FFFFFF` | `#0A0A0A` | Section background |
| `--ed-bg-alt` | `#F4F4F5` | `#141414` | Alternating band |
| `--ed-fg` | `#0A0A0A` | `#F5EDE0` | Headings and body |
| `--ed-fg-muted` | `#52525B` | `#A89B86` | Supporting copy, captions, labels |
| `--ed-border` | `#E5E7EB` | `#2A2A2A` | Card and panel borders |
| `--ed-rule` | `#E5E7EB` | `rgba(245,237,224,0.14)` | Hairline dividers inside a section |
| `--ed-card` | `#FFFFFF` | `#141414` | Card surface |
| `--ed-card-alt` | `#F4F4F5` | `#1F1F1F` | Nested / secondary card surface, table headers |
| `--ed-accent` | `#00AEEF` | `#00AEEF` | Brand blue. Marks and rules only, sparingly |
| `--ed-accent-text` | `#0077A8` | `#00AEEF` | Accent **text** and eyebrows |

Convenience classes: `ed-bg`, `ed-bg-alt`, `ed-card`, `ed-card-alt`, `ed-fg`,
`ed-fg-muted`, `ed-border`, `ed-rule`, `ed-accent`, `ed-accent-bg`,
`ed-overline`, `ed-link`.

### 4.3 Semantic colours

Used for verdicts and states in reports. Not decoration.

| Meaning | Value | Use |
|---|---|---|
| Positive / resolved | `#0077A8` (accent) | "Answered cleanly", healthy state |
| Warning | `#B45309` | "Covers 3 of 5 scenarios", drifting |
| Danger / gap | `#B42318` | "No approved content exists", refusals |
| Owner-authored | `#7C3AED` family | Franchisee-built artifacts |

**State shown by colour must also be shown by weight, shape or a label.** A
coloured dot alone fails colour-blind and greyscale reading.

### 4.4 Contrast rules that are not negotiable

- **Accent text on a light surface is `#0077A8`**, never `#00AEEF`. `#00AEEF`
  measures 2.27:1 on white and fails at every size.
- **An accent fill carrying white text is `#0077A8`-family** (4.99:1). A
  `#00AEEF` fill under white text measures 2.53:1 and fails.
- **On the hero photograph** the safe accent is `#9FE0F8`, body copy is
  `#FFFFFF` or `rgba(245,237,224,0.92)`. Dark tokens do not apply on that band.
- On the dark solid band (`#0B1220`): body `rgba(238,242,248,0.92)`, labels
  `rgba(238,242,248,0.55)`, accent `#9FE0F8`, rules `rgba(238,242,248,0.16)`.

---

## 5. Hero and photographic backgrounds

### 5.1 The composition

Three stacked layers, in this order:

```tsx
<section className="relative w-full overflow-hidden" style={{ backgroundColor: "#0B2C48" }}>
  <div className="absolute inset-0" aria-hidden="true">
    <Image src="/hero-bg.jpg" alt="" fill priority sizes="100vw"
           className="object-cover" style={{ objectPosition: "left center" }} />
    <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,32,54,0.34)" }} />
    {/* optional bottom resolve, closing bands only */}
    <div className="absolute inset-0"
         style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
  </div>
  <div className="relative …">{/* content */}</div>
</section>
```

- `#0B2C48` is the solid base behind the image, so a slow-loading image never
  flashes white.
- The scrim is always `rgba(4,32,54,α)`. Never a black scrim; it greys the blue.
- `objectPosition: "left center"` keeps the deep-blue side under the copy
  column. The photograph is near-white at the bottom right.
- `priority` on the hero image only. Never on a closing band.

### 5.2 Scrim strengths

Pick the **weakest** scrim that clears contrast on the *lightest pixel* of the
band, not its average.

| Band | Flat scrim | Notes |
|---|---|---|
| Homepage hero | `0.30` + bottom fade to `0.90` | The fade carries the logo strip at 7.2:1 |
| Sub-page hero (copy-heavy) | `0.45–0.46` | More copy over more of the frame |
| KPI / stat band | `0.42` | White numerals and cards on top |
| Closing CTA | `0.30–0.34` + resolve to `CLOSING_BASE` | Lighter, because it holds less text |

`CLOSING_BASE` (`#042036`, `components/growth/closing-band.ts`) is shared by the
closing section, the booking page and the editorial footer. Each one's bottom
fade resolves to exactly this so no seam appears. **Change one and change all
three.** It lives in a plain module because importing a constant from a
`"use client"` module gives a server component a client reference, not the
string, and the gradient silently computes to `none`.

### 5.3 Background variants

Hero background images live in **`public/hero/`**, committed to the repo.
Never reference a CDN, and never rely on an image pasted into a chat — it
cannot be committed.

Naming: `public/hero/hero-bg-<slug>.jpg`, e.g. `hero-bg-deep.jpg`,
`hero-bg-wash.jpg`. When more than one exists, register them once and have
sections choose by token rather than by path:

```ts
// lib/data/hero-backgrounds.ts
export const HERO_BG = {
  default: { src: "/hero-bg.jpg",            base: "#0B2C48", scrim: 0.34 },
  deep:    { src: "/hero/hero-bg-deep.jpg",  base: "#0A2440", scrim: 0.30 },
  wash:    { src: "/hero/hero-bg-wash.jpg",  base: "#12395B", scrim: 0.46 },
} as const;
```

Each variant carries its **own** base colour and scrim, because a lighter
photograph needs a stronger scrim to hold the same copy. Re-measure contrast
per variant; do not inherit a scrim from a different image.

---

## 6. Layout and rhythm

```tsx
<section className="w-full scroll-mt-24 ed-bg">
  <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
```

`Band` (`components/platform/shared.tsx`) and `SectionShell`
(`components/growth/shared.tsx`) render exactly this. Prefer them.

| Property | Value |
|---|---|
| Container | `max-w-7xl` (1280px) |
| Gutters | `px-6` / `md:px-12` / `lg:px-16` (24 / 48 / 64) |
| Vertical rhythm | `py-14 md:py-16 lg:py-20` (56 / 64 / 80) |
| Dark or photographic bands | `py-20 md:py-24` (80 / 96) |
| Compact band | `py-12 md:py-16` |
| Prose measure | `max-w-3xl` (768px) |
| Headline measure | `max-w-4xl` (896px), or an explicit px cap |
| Gap: section head → visual | `36–40px` (`mt-9` / `mt-10`) |
| Gap: cards in a grid | `gap-3` to `gap-5` (12–20) |
| Gap: stacked blocks in a section | `gap-6` to `gap-9` |

- `scroll-mt-24` on **any** section with an `id`, or the sticky nav covers its
  heading when linked. Verify the anchor lands the heading clear of the nav.
- Full-bleed elements (marquees, edge-to-edge strips) sit **outside** the
  `max-w-7xl` container, with a mask fading both edges.
- A section's top and bottom padding should be symmetric unless something
  visually anchors one side.

---

## 7. Components

### 7.1 Cards

| Kind | Spec |
|---|---|
| Content card | `--ed-card` background, `1px solid var(--ed-border)`, radius `14px`, padding `20–24px` |
| Product mockup | `MOCK_SURFACE` — white, 1px border, 14px radius, two-layer shadow. **Light in both themes**, because it depicts a product UI, not the page |
| Emphasised card | Accent left border `3px solid #0077A8` + `rgba(0,119,168,0.06)` tint |
| Table / artifact card | Card shell, header row on `--ed-card-alt` with a mono label, rows divided by `--ed-rule` |

No flat borderless boxes. No shadow heavier than the mockup's.

### 7.2 Buttons

| Class | Use |
|---|---|
| `ed-btn ed-btn-primary` | Primary on a light background (near-black fill) |
| `ed-btn ed-btn-secondary` | Secondary on a light background (outline) |
| `ed-btn ed-btn-secondary-dark` | Secondary on a dark or photographic band |
| `ed-btn ed-btn-arrow` + `ed-btn-arrow-badge` | The lead CTA, with its arrow badge |

- `ed-btn` base: `1rem 2rem` padding, pill radius, `--font-editorial` 500, 16px.
- `ed-btn-arrow` overrides to `0.5rem 0.5rem 0.5rem 1.5rem`, 15px, gap `0.75rem`.
- The badge is a `#0A0A0A` disc with a **white** arrow; `-sm` is 1.5rem, default
  2rem. It nudges 2px on hover and holds still under reduced motion.
- **On a photographic band the primary CTA is a white fill with near-black
  text.** A blue fill fails contrast there in both directions.
- **In-page buttons that must match height across variants get an explicit
  `min-h`**, not padding. Only one may carry a badge, and a badge is taller
  than a text line; padding alone leaves them mismatched. A real `border` also
  adds to the box — use an inset box-shadow for outlines that sit beside a
  filled sibling.
- Every primary CTA points at `/speak-to-an-expert`.
- **Never ship a button to a route that does not exist.** Create a `noindex`
  stub or point at the nearest live surface, and leave a TODO.

### 7.3 Chips and labels

| Kind | Spec |
|---|---|
| Text chip (system names, channels) | `12.5px` 500, radius 6px, `--ed-card-alt` bg, `--ed-border`, muted text |
| Accent chip | Same box, `rgba(0,119,168,0.06)` bg, `rgba(0,119,168,0.22)` border, accent text |
| Source chip (file names) | Mono `10.5px`, accent tint, accent text |
| Eyebrow | Mono `11px` 600, `0.16em`, uppercase, muted — or accent when the section is the page's centrepiece |
| Metadata | Mono `10px` 600, `0.13em`, uppercase, muted |

**Logos:** every logo is a committed local file under `public/logos/`. Never a
CDN. When assets do not exist for every item in a set, use **text chips
uniformly** rather than mixing — a partial logo set puts the systems you have
assets for in colour and the ones you care about in grey, inverting emphasis.

### 7.4 Dividers

Hairline `1px solid var(--ed-rule)` between rows inside a card, and between
list items. `2px solid var(--ed-border)` when a row is being set apart as a
conclusion.

---

## 8. Responsive

**Design for 1440 and 375 simultaneously.** Neither is a degraded version of
the other.

| Breakpoint | Tailwind | What changes |
|---|---|---|
| 375–639 | base | Single column. Full-width cards. Side-by-side pairs stack. |
| 640–767 | `sm:` | Two-column card grids |
| 768–1023 | `md:` | Wider gutters, row layouts can go horizontal |
| 1024–1279 | `lg:` | Multi-column grids, side-by-side comparisons, pinned sections |
| 1280+ | `xl:` | Container caps at 1280; only whitespace grows |

Rules:

- **Never let the page scroll horizontally.** Verify `scrollWidth === innerWidth`
  at 1440, 1280, 1205, 1024, 768 and 375.
- **Stack deliberately, don't wrap accidentally.** A row that becomes two lines
  should be an explicit `flex-col md:flex-row`, not a `flex-wrap` that breaks
  at an unpredictable width.
- **Tables stack label-above-value below `md`.** Never shrink a table until it
  is unreadable, and never force a horizontal scroll on a narrative section.
- **Hard line breaks in headlines are desktop-only** (`lg:block` on the second
  clause). Mobile wraps naturally. Check the last line is not a single orphan.
- **Long labels get a short form only where they must**, and only the offending
  one — never abbreviate a whole set because one member is long.
- Touch targets are 40px minimum.
- Test with the mobile nav open; it overlays content.

---

## 9. Motion

- One entrance per element: `initial={{ opacity: 0, y: 16–20 }}` →
  `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-60px" }}`
  for cards, `"-100px"` for section heads.
- Easing is `[0.22, 1, 0.36, 1]` everywhere. Duration 0.7–0.85s for sections,
  0.5–0.6s for cards. Stagger `delay: index * 0.07–0.09`.
- **`prefers-reduced-motion` renders the final state, never a blank one.**
  Counters server-render their final value so there is no flash of zero.
- Scroll-driven pinning and tickers are homepage-only. A sub-page does not
  need them.
- SMIL note: **Blink does not implement `<animate attributeName="points">`.**
  Animate `d` on a `<path>` instead. `begin="indefinite"` plus `beginElement()`
  from an IntersectionObserver is the supported start-on-scroll pattern.
- Marquees pause on hover and hold still under reduced motion.

---

## 10. Copy

- **No em-dashes.** Use `·`, a comma, or a full stop.
- No anaphora. No "not X, it's Y" antithesis. No filler verbs.
- Banned: empower, unlock, seamless, leverage, supercharge, revolutionise.
- Plain declarative sentences, sentence case. One aphoristic fragment per page
  at most.
- Metadata labels are mono uppercase: `STORE #118 · SHIFT LEAD · 9:14AM`.
- **Never invent a figure.** Only figures already published on this site (case
  studies, the trust strip) or a visible `{{TBD:key}}` token. Network-scale
  numbers read from `lib/data/network-scale.ts`.
- Where a brief gives exact copy, use it verbatim — **except** where it
  conflicts with a rule above. House style wins; note the deviation.

---

## 11. Accessibility

- Interactive elements are `<button>` or `<a>`, never a `div` with `onClick`.
- Icon-only controls carry `aria-label`; decorative art carries `aria-hidden`.
- SVG visuals get `role="img"` plus `<title>` and `<desc>`, wired with
  `aria-labelledby`. IDs must be unique when a visual renders twice on a page.
- State shown by colour is also shown by weight, shape or a label.
- Visible focus is never removed.
- Heading order is sequential. One `<h1>` per page.

---

## 12. Pre-ship checklist

1. Root wrapped in `theme-editorial`.
2. Page-level variety check run (§1.4) — no form more than twice, no adjacent
   repeats, no two sections enumerating the same items, at least one artifact.
3. Contradiction check run (§1.3) on every section.
4. No hardcoded `#0A0A0A` / `#F0F0F0` / `#52525B` where a token exists.
5. Accent text is `--ed-accent-text`; accent fills under white text are
   `#0077A8`.
6. Both themes checked. Reduced motion checked.
7. Widths: **1205 first** (the review viewport), then 1440, 1280, 1024, 768,
   375. No horizontal overflow at any of them.
8. `grep -rn "{{TBD:"` returns only intentional tokens, all on this page.
9. Every link resolves. Every stub created is listed in the summary.
10. `git diff --stat` shows only this page, its components, and any link
    changes the brief authorised.

---

## 13. Anti-patterns

Each of these has actually shipped and been reverted.

- A tidy sorted table for a section whose copy is about disorder.
- Two sections listing the same systems, the second adding only a count.
- Three card grids on one page, differing only in card count.
- Equalising the heights of a deliberately asymmetric comparison — the
  asymmetry was the argument.
- Normalising a set of outcomes that were varied on purpose; the variation was
  the proof it reads each case.
- A logo wall with no descriptors, where the one-liners were the differentiator.
- Reducing a fork to a single link, making a designed path look like an
  afterthought.
- Stating an unverifiable percentage the brief itself banned two paragraphs
  earlier.
- Shrinking SVG labels on mobile, where the viewBox already shrank them.
- Wiring a CTA to a route that does not exist.

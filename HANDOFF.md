# Homepage rebuild — working handoff

Living context for the `growth-revenue-thesis` homepage work. Read this
before picking the work back up in a fresh session.

> **Upkeep:** this file is revised at the end of every step, in that step's own
> commit. If a step moves a section, adds or clears a TODO, accepts a deviation,
> or turns up a new environment gotcha, it lands here before the step is
> reported as done. A stale handoff is worse than none, because it gets trusted.

## Where things stand

- **Branch:** `growth-revenue-thesis` (off `growth-narrative`). Never merge to
  `main`. Never touch `platform-narrative-pass` (reference only; open it with
  `git show platform-narrative-pass:path/to/file`).
- **Every step is tagged.** `git tag --list 'v3-*'` and `git log --oneline` are
  the fastest way to reconstruct what happened and why — commit bodies carry
  the rationale, not just the change.
- Each step tagged `v3-stepN-pre` marks the state *before* that step.

## Page structure (8 sections, in order)

| # | Section | File | Anchor |
|---|---|---|---|
| 0 | Floating nav pill (overlays the hero) | `components/Navbar.tsx` | — |
| 1 | Hero (logo band folded in, crops at fold) | `components/growth/Hero.tsx` + `TrustStrip.tsx` | — |
| 2 | The problem (bar, 3 pillars, capacity block, closing) | `components/growth/CoachsWeek.tsx` | `#the-week` |
| 3 | The reveal (convergence diagram) | `components/TheSystem.tsx` | `#the-system` |
| 4 | What it does (rotating showcase) | `components/growth/Capabilities.tsx` | `#capabilities` |
| 5 | Proof (sticky story stack) | `components/growth/CustomerProof.tsx` | `#proof` |
| 6 | Trust and control (6 tabs) | `components/growth/TrustAndControl.tsx` | `#trust` |
| 7 | FAQ | `components/growth/Objections.tsx` + `lib/data/objections.ts` | `#objections` |
| 8 | Final CTA | `components/growth/FinalCTA.tsx` | `#book` |

The showcase pills expose anchors: `#answers`, `#agents`, `#reporting`,
`#compliance`, `#ai-apps`, and the section opens the matching scene from
`location.hash`. The footer links to four of them, so renaming a pill means
renaming its id and the footer entry together.

Support modules (not sections): `artifact-panels.tsx`, `audience-duality.tsx`,
`handoff-flow.tsx`. Unwired-but-kept work lives in `components/growth/_archive/`.

**Three components are now unwired but still in the tree**, all kept rather
than deleted because removal was never asked for: `artifact-panels.tsx` (lost
its last caller when the problem section swapped its closing visual for a
connector sentence), `growth/audience-duality.tsx` (the HQ / franchisee block
that closed Trust and control), and `Connected.tsx` (the whole integrations
and channels section). The `.ed-tile-fluid` rule in globals.css is dead with
the first of them. Nothing imports any of the three.

The hero's copy stack is eyebrow, lead, sub-lead, CTA. Each line carries the
type of the **slot** it sits in, not type of its own:

| Slot | Copy | Type |
|---|---|---|
| Eyebrow (`h1`) | AI Operating System for franchisee success. | 10–16px, 700, uppercase, 0.16em, accent blue, one line always |
| Lead | Take the low-value work off your coaches. **Multiply their expertise across every location.** | 22.5–35px, 700, -0.03em, second sentence in `HERO_ACCENT` |
| Sub-lead | Repetitive questions… **Growth, not headcount.** | 11.75–18.5px, 400, cream, last sentence at 700 |

Neither the lead nor the sub-lead carries a forced line break. Both wrap
naturally, so nothing needs re-breaking when copy changes.

**Both are capped at three lines at every width**, which is what sets their
clamps. Measured ceilings for three lines:

| Viewport | Column | Lead | Sub-lead |
|---|---|---|---|
| 390 | 342 | 23.5px | 12.25px |
| 768 | 608 | 41.75px | 21.75px |
| 1024 | 425 | 29px | 15.25px |
| 1205 | 517 | 35.5px | 18.5px |
| 1440 | 539 | 37px | 19.25px |

The clamps sit ~4% under each. The sub-lead is 168 characters, so three lines
costs it **11.75px at 390** — small for body copy, and the price of the cap.
Allowing four lines there would buy 16.25px. Any copy edit to either line
means re-deriving these ceilings, since both sit right against them.

The `h1` deliberately sits on the eyebrow line, styled small, so the page's
primary statement still matches the title tag and the JSON-LD. Moving it to
the visually dominant lead is a one-line swap if that is ever preferred.

The trust line ("Trusted by 70+ brands…") sits below the visual, directly
above the logo marquee, rendered by `TrustStrip.tsx` rather than the hero. See
the flag note below for how to put it back.

**Sizing these two lines is measurement work, not arithmetic.** A width-ratio
estimate said 36px would hold the lead to two lines per sentence at 1024; real
wrapping gave three, because breaks land on words. Binary-search the actual
wrap in the browser instead.

Measured ceilings, both held to their line budget:

| Viewport | Column | Lead, 4 lines | Eyebrow, 1 line |
|---|---|---|---|
| 390 | 342 | 27.5px | 10.5px |
| 768 | 608 | 49.5px | 18.75px |
| 1024 | 425 | 34.5px | 13px |
| 1205 | 517 | 42px | 16px |
| 1440 | 539 | 43.5px | 16.75px |

**1024 binds hardest** for both, since that is where the two-column grid starts
and the copy column drops to 425px, its narrowest anywhere. Anything retuned
here has to clear 1024 first, not 390.

The eyebrow is bold uppercase at 0.16em, which is wide, so tracking is the
lever if it ever has to be larger: dropping to 0.10em buys about 1.5px.

## The floating nav pill

**Homepage only.** `Navbar.tsx` branches on `floating = pathname === "/"`. Every
other route keeps the banded header it always had, so the pill is not yet a
site-wide pattern. Rolling it out means dropping that branch, not rewriting.

How it overlays without pushing the hero down:

- The header is **sticky, not fixed**, so an announcement bar above it still
  pushes it down naturally.
- The header carries `margin-bottom: calc(-1 * var(--nav-pill-h))`, which
  cancels its own flow height. That is what lets the hero start at document
  y=0 and sit behind the pill.
- The hero pays it back with `padding-top: var(--nav-block)`.

Three variables on `.theme-editorial` hold it together, and **both the nav and
the hero read them**, which is why they live on the theme root:

| Variable | Mobile | ≥768px |
|---|---|---|
| `--nav-inset` | 16px | 24px |
| `--nav-pill-h` | 56px | 64px |
| `--nav-block` | 72px | 88px |

If you change the pill height, the hero padding follows automatically. Do not
hardcode either number anywhere else.

Mega-menu panels hang off their own trigger (`left-0 top-full`) with
`pt-[1.75rem]`, which is both the hover bridge and the clearance for the pill's
bottom edge, since the trigger is centred in a 64px bar. Closed panels are
`invisible`, not just transparent, so their links stay out of the tab order.

`.theme-editorial` sets `overflow-x: clip` rather than `hidden` on purpose:
clip does not create a scroll container, so sticky still works.

## The hero background

`public/hero-bg.jpg` (2560x1440) is a blue gradient: deep at the left, near
white at the bottom right. **The hero runs light on it.** Sampled per pixel,
the copy column sits around `#1069af`, where the old dark palette died —
`#0077A8` measured 1.15:1 and `#00AEEF` 2.27:1.

Three scrim layers, all constants at the top of `Hero.tsx`:

| Layer | Value | Why |
|---|---|---|
| flat | `rgba(4,32,54,0.30)` | unifies the frame |
| top fade | `0.15` → 0 by 35% | 390 crops to the image's lightest 19%; without it the eyebrow sat at 4.40:1 |
| bottom fade | 0 from 50% → `0.90` | the trust line and marquee sit on the brightest part of the frame |

`object-position: left` is load-bearing: it drops the near-white right edge,
which is the part light text cannot survive.

**Everything inside the hero must be positioned.** The image and scrims are an
`absolute inset-0` layer, and positioned elements paint above static ones in
the same stacking context, so any static child renders *underneath* the scrim.
This already ate the trust line once: `LogoMarquee` has its own `relative`
root so the logos survived, and only the unpositioned `<p>` above them
vanished. A DOM check will not catch this, because the element is present with
correct geometry and colour. Test with
`document.elementFromPoint(cx, cy) === el`, and note that returns false for
anything outside the viewport, so offset `<main>` first to bring it on screen.

Copy colours are `HERO_FG` white, `HERO_FG_SOFT` cream, `HERO_ACCENT`
`#9FE0F8`. The cyan is reserved for the lead's second sentence, which is
26–40px bold and therefore large text at a 3:1 bar; it does not clear 4.5:1
and must not be reused at body size.

**Measure against the worst pixel in a band, not its average.** The scrim
values are the weakest that clear every target that way. Verified at 1205 and
390: everything passes, tightest is 390 lead-cyan at 3.62:1 against a 3.0 bar.
If the image is ever swapped, re-derive all three scrim values.

`TrustStrip` carries `ed-on-dark` so `LogoMarquee`, which is shared with other
routes, picks up dark tokens without being edited. Its trust line takes an
explicit colour because the dark set resolves `--ed-accent-text` to `#00AEEF`,
which is 2.3:1 here.

**No section labels.** Every section opens directly on its `h2`. The uppercase
overlines above them ("The system", "What it does", "Proof", "Trust and
control", "Connections", "FAQ", "Ready when you are") were all removed. The
`Overline` component in `growth/shared.tsx` still exists and is still used by
`components/sections/` on other routes, so it was kept; just do not reach for
it on the homepage.

## The hero lockup and the conversation loop

**Type roles are carried by the tags.** The eyebrow is a `<p>`, the lead is the
page's single `<h1>`, and the sub-lead is a `<p>`. This was the other way round
once; if you swap the visual order again, move the tags with it.

| Slot | Size at 1205 / 1440 | Weight | Tracking |
|---|---|---|---|
| eyebrow | 15px (12px floor at 390) | 600 | `0.16em`, uppercase, `HERO_EYEBROW` |
| lead `<h1>` | 31.4 / 36px | 800 | `-0.035em` |
| sub-lead | 16.3 / 18.5px | 400 | normal |

**The `<h1>` cannot reach 40px at three lines.** The brief asked for 40–72px.
The measured three-line ceilings for the current lead copy are 23.5px at 390,
29px at 1024, 35.5px at 1205 and 37px at 1440, so the clamp tops out at 36px.
The binding constraints are the three-line cap, the 89-character lead, and the
copy column, which is capped because the product card is hard-sized at `34rem`.
Reaching 40px means one of: shorter lead copy, a four-line allowance, or a
narrower card. Do not raise the clamp without changing one of those, or the
lead wraps to four lines.

The eyebrow wraps to two lines at 390. Tracking was tested down to `0.09em`
and it still wraps, so tightening it buys nothing and only weakens the label
read. Left at `0.16em`.

**The card plays two scenes on one timeline.** `phase` runs 1–9;
`scene = phase >= 6 ? "B" : "A"`. Scene A is the asked-and-answered thread,
scene B is Monday's automated KPI digest. `AnimatePresence` keys on
`` `${cycle}-${scene}` `` so the swap crossfades. Every scene A beat is gated
on `scene === "A"`, otherwise reduced motion (which never leaves phase 1) would
render both.

**Scene B is one growing card, not three stacked blocks.** Built as three it
measured 513px in a 424px `CARD_BODY_H` and the digest header clipped off the
top of the mask. Header, figures and recommended actions now share a single
bordered block separated by hairlines, and the confirmation line is one line
of copy, which lands the whole scene at 422px. **If you add a KPI row or
lengthen the confirmation, re-measure**; there are 2px of slack.

`CARD_BODY_H` is the fold budget, not a guess. Growing it pushes the logo
marquee below 793.

## The problem section

Rebuilt from a supplied design handoff. The order is the argument and must
stay in it: claim, Today bar, the three kinds of work, the capacity block,
the corrected bar, the closing line. The bar sits *above* the pillars so it
reads as the summary and they read as its breakdown.

**Tokens live on `.ed-problem` in globals.css**, not in the component, the
same arrangement `.ed-showcase` uses.

**The handoff's accent is remapped.** It ships `#1B55E9`, a royal blue that
is not the brand's. `--pb-accent` is the *fill* under white text, so it has
to clear 4.5:1 on white: `#00AEEF` is 2.53:1 and fails, `#0077A8` is 4.99:1
and is used in both modes, since white-on-fill contrast does not care what
surrounds it. `--pb-accent-ink` is accent *text* and follows the site's usual
light/dark split (`#0077A8` / `#00AEEF`). Measured: coaching fill 5.0:1 in
both themes, dark eyebrow 7.51:1, dark closing line 7.28:1.

**The admin ramp is deliberately dark** so white would pass on tones 1–3. Do
not lighten it. The four grey segments carry no labels; the pillar swatches
below identify them, so **swatch tone and segment tone have to stay in step**.

Two places where the build departs from the prototype, both forced:

- **The report chips wrap, they do not truncate.** The handoff mandates
  keeping the existing file-type icons and also specifies a 12px chip label.
  The icon costs 18px of a chip that has ~100px of text room at 1205, and
  four filenames no longer fit on one line. The prototype fits them only
  because it omits the icons. Wrapping keeps every label readable; the grid
  rows stay aligned to each other.
- **`min-h` on the pillar heading blocks is 106px, not the handoff's 104.**
  The longest description runs to three lines from 1024 up and measures
  105.4, so a 104 floor left card 1 starting 1.4px low.

At 390 the 20 percent segment is 68px wide and cannot hold both the word and
the figure, so `Coaching` is hidden below `sm` on that bar only and the
figure centres. The 80 percent bar keeps both at every width.

The capacity figures (30/1, 120/4, 300/10) are an illustrative ratio, not
measured data. The point is that the coach count grows and owners-per-coach
does not. **Keep it on the coach's side**: nothing here mentions salary,
cost, or headcount spend.

Motion is `whileInView` throughout, matching the rest of the file. The bar
animates as one `scaleX` from `transform-origin: left` rather than per
segment, which keeps the proportions exact and never re-lays-out the flex row.

## The System: convergence diagram

Built from a supplied design handoff. Section runs on the handoff's dark
tokens (`#05070D` bg, `#0B101C` panels) regardless of site theme.

**The canvas is a fixed 1180x620 that gets scaled**, not a fluid layout. The
wire paths and the pulse `offset-path` values are absolute coordinates in that
space, so they cannot be made responsive without redrawing every curve. A
`ResizeObserver` measures the container and sets `transform: scale(w/1180)`;
the wrapper's height is `620 * scale`. Below `lg` the scale would make 11.5px
text illegible, so `StackedDiagram` renders instead.

Two deliberate departures from the spec, both flagged at the time:
- **The accent is `#00AEEF`, not the spec's `#4373FF`.** The handoff says to
  map its variables onto existing token names, and a second blue next to the
  brand blue read as a mistake.
- **The integration tiles are wordmarks, not brand SVGs.**
  `/public/logos/integrations/` does not exist. Names come from
  `lib/data/integrations.ts` so they are at least real. Swap for `<Image>`
  when the assets land.

The five outputs match section 4's five pills one to one again, which was the
original intent: Answers / Agents / Reporting Hub / Compliance Hub /
Applications Hub.

## Capability showcase (section 4)

Also built from a supplied handoff. The old sticky-rail, scroll-driven module
layout is gone; this is a rail of five pills beside a photo stage that
auto-advances every 6.5s. Hovering the block pauses it, clicking a pill jumps
and resets the timer, and `prefers-reduced-motion` stops the auto-advance
while leaving the pills clickable.

Tokens live in `.ed-showcase` in globals.css. **`--sc-accent-ink` is not
decoration**: it is the darker accent used anywhere white text or an icon sits
on an accent fill, because `#00AEEF` under white is 2.5:1. It resolves to
`#0077A8` in light and `#00AEEF` in dark.

**The photos are Unsplash hotlinks.** The handoff names them as stand-ins and
subject matter as the spec. That means production currently depends on the
Unsplash CDN for five images. Swap for owned photography before launch.

Pill ids double as deep-link anchors and the component reads
`location.hash` on mount to open the matching scene. The footer's Platform
column points at four of them; `Workflows → /#workflows` became
`Agents → /#agents` when the labels changed.

**Three headlines are pinned to a line count**, and each clamp is fitted to
measured wrap points rather than picked. Re-derive if the copy changes:

| Headline | Cap | Ceiling at 390 / 768 / 1024+ | Rendered |
|---|---|---|---|
| "EZee Assist is the operating system." | 1 line | 21.1 / 41.5 / 55.3px | 20 / 40 / 53px |
| "EZee flips the 4/5 days to growth, by automating the rest." | 2 lines, one per span | 23 / 45.2 / 51.6px | 22 / 43 / 49px |
| "To reclaim coaching, all the work needs to flow through one unified system." | 2 lines | 19 / 38 / 43px | 18 / 30 / 30px |

The one-line cap is what drives the system headline down to 20px at 390. It is
small for a section heading, and the price of holding one line on a 342px
column.

## The closing band

`FinalCTA` and the editorial footer are one continuous blue band. The CTA
carries the hero's background image and scrims; its bottom fade resolves to
**solid `CLOSING_BASE` (`#042036`)**, which the footer sets as its background.
`CLOSING_BASE` is exported from `FinalCTA.tsx` and imported by `Footer.tsx`
precisely so the two cannot drift; change it in one place. The footer has no
top border, and `ed-on-dark` pins the dark token set so its light-mode text
stays legible on the band. It also ships only the white logo, since the band
is dark in both themes.

## Proof: the sticky story stack

Built from the quotes-scroll handoff. Four cards, each `position: sticky` at a
staggered top (24 / 42 / 60 / 78px, 18px apart). That stagger is the whole
effect: it leaves each covered card's coloured edge bar showing above the next
one. **Pure CSS, no listeners and no observers**, so it survives the preview
pane and reduced motion untouched. The `35vh` spacer after the last card gives
it room to pin.

Two departures from the handoff, both forced by our narrower container:

- **Columns are 240/340, not the handoff's 400/300.** The quote rail is wider
  than the handoff on purpose: a wider rail means fewer quote lines, which is
  what brings the card height down. The logo panel gives up that width.
- **The headline clamps to 20–36px, not a flat 44px.** "Human-power back to"
  is the widest of the eight lines at 10.57px per 1px of font size, and 1024
  binds hardest, where the widened rail leaves the middle column 220px.
- **Cards land at 0.73–0.80x of the handoff's 520px**, not a flat 0.7. The
  `min-h` is 364 but it is not what decides the height: the two longest
  quotes, WSI and DivaDance, set 418px on their own. Shortening those quotes
  is the only way further down.
- Cards sit 4px apart, near flush. The deck effect comes from the staggered
  sticky tops, not from the gap, so closing it costs nothing.

Assets live in `public/logos/stories/` and `public/photos/`. **The logos are
deliberately not in `public/logos/customers/`**, which is the path
`LogoMarquee` resolves against: dropping `wsi.svg` there would make one
marquee tile render as an image among twenty text-pill fallbacks.

The partner pills are a single non-wrapping row of eight. They fit without
scrolling from 1024 up (896px available, 842 needed); below that the row
scrolls sideways, because eight pills cannot fit a phone at a readable size.

## Standing rules

**Scope.** Homepage only unless a prompt grants an explicit exception. If a
component is shared with another route, stop and pass copy via props or defer.

**Copy.** No em-dashes. No anaphora. No "not X, it's Y" antithesis. No filler
verbs. Plain declarative sentences. One aphoristic closing fragment per page
maximum, and that budget is reserved for the hero.

**Numbers.** Never invent a figure. If it isn't sourced, leave a `TODO:` rather
than rendering a plausible-looking value. All network scale reads from
`lib/data/network-scale.ts` — one constant, one edit.

**Design.** Lucide icons only, no emoji. Brand blue `#00AEEF` used sparingly.
Scroll animations respect `prefers-reduced-motion` with static final states.
Counters SSR their final value (no flash of zero).

## Verification recipe

**1205×793 is the review viewport** (laptop at 100% zoom). Check it first, then
1440×900, 1280, 1024, 390. Both themes. Reduced motion.

**Measure on the built page, never estimate.** Type-fit bugs in this project
have all come from assuming a column width. The reliable loop:

```
npm run build
# restart the preview server so it serves the new build
# resize, then read getBoundingClientRect / getComputedStyle via javascript_tool
```

Line counts: `Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight))`.

Note the container caps at `max-w-7xl`, so the hero copy column stops growing at
**539px** — it is the same at 1440 and 1600. Size clamps against that, with
~5% headroom, and remember bold text is wider than medium.

Copy column widths, measured: 342 at 390, 608 at 768, **425 at 1024**, 517 at
1205, 539 from 1440 up. The sequence is not monotonic, because 1024 switches
the hero to two columns. A `vw` clamp only sees the viewport, so the tightest
fit is usually 1024 rather than the smallest screen.

## Environment gotchas (these cost hours to rediscover)

- **The preview pane suppresses `requestAnimationFrame`, scroll events, and
  IntersectionObserver callbacks when hidden.** Scroll-linked and observer-based
  behaviour cannot be verified natively. Workaround: `window.scrollTo(...)` then
  `window.dispatchEvent(new Event('scroll'))` to drive handlers manually.
- **Scrolled screenshots come back blank.** Workaround: clone the section into a
  `position:fixed` overlay at the top of the viewport, force `opacity:1` on
  descendants, and shift it with `top:-Npx` to pan.
- **The page cannot actually be scrolled in the pane.** `window.scrollTo` and
  setting `scrollingElement.scrollTop` both leave `scrollY` at 0. To photograph
  sticky chrome over a lower section, put `transform: translateY(-Npx)` on
  `<main>` instead: the header is a sibling, so the real pill composites over
  the real section.
- Framer Motion clobbers inline `transform` on `motion.*` — put static rotation
  or offsets on an inner plain `div`.
- **`LogoTile` reaches its text pill only through `onError`.** No customer SVGs
  exist yet, so every tile depends on a 404 firing. A lazy image that never
  enters the viewport never loads, never errors, and leaves a zero-width tile,
  which silently dropped whole brands from the marquee. It now loads eagerly.
  If the tile ever goes back to lazy, the fallback has to become the default
  state rather than the error state.
- **No lint script exists** in this repo. `npx tsc --noEmit` is the check;
  add `--noUnusedLocals` to catch dead imports.
- Deployment-specific Vercel URLs cannot be retrieved from this environment.
  Paste the URL from the dashboard when live verification is needed.

## Feature flags

**Off**

- `SHOW_ANNOUNCEMENT` in `components/AnnouncementBar.tsx` — announcement bar,
  off until the linked asset exists.
- `SHOW_AEO_BLOCK` in `components/Footer.tsx` — Ask ChatGPT/Claude/Perplexity
  block, a launch-gate item wanted back after publish.

**On**

- `EYEBROW_ABOVE_LOGOS` in `components/growth/Hero.tsx` (exported) — the trust
  line's position. `true` renders it centered above the logo marquee. Set it to
  `false` to restore the earlier layout, where it sat inside the hero above the
  H1. One edit flips it; nothing else needs touching.

## Open TODOs, grouped by what a human must supply

**Blocking before publish**
- `ed-btn-blue` (white label on `#00AEEF` at 15px/500) measures **2.53:1** and
  fails AA everywhere it is still used. The hero no longer uses it, but other
  sections do. Darkening the fill to `#0077A8` clears it at 4.99:1.
- Real security posture copy for the Trust and control security tab. No
  certification claim may be reintroduced without evidence — "SOC 2 Type II
  aligned" was deliberately removed as unverified.
- Decide on the SoftwareApplication `aggregateRating` in `app/page.tsx`
  (`ratingValue 4.9`, `ratingCount 60`). Nothing in the repo backs it. The
  per-location pricing `offers` block was already removed and must not return —
  pricing does not appear on the site in any form, including structured data.

**Content**
- **`Deka+` in the logo strip vs `DekaLash` everywhere else.** The customer
  logo list was renamed to Deka+ on request, but the brand is still DekaLash
  in `app/case-studies/dekalash/`, `CaseStudiesContent.tsx`,
  `FranchisingContent.tsx`, `FranchisorsContent.tsx` (a named testimonial),
  and two related-case-study lists. Decide whether the rename is site-wide.
- `Home Helpers` was added to the customer list and is not backed by anything
  else in the repo. `UPS` became `UPS Store` and `Massage Heights` became
  `Heights Wellness`; neither had other references.
- Coaching-coverage metrics (touchpoints per location per month, locations per
  coach, weeks cut from ramp). Until these exist the page argues growth and
  proves cost.
- A third named customer quote, and a replacement for the Aqua-Tots line, which
  is product praise rather than a description of changed work.
- Aqua-Tots second metric.
- Real customer logo SVGs and headshots (currently text wordmarks and initials).
- A case study whose headline metric is coverage or revenue, not tickets.

**Decisions**
- Confirm 70+/5,000+ against the deck's 60+/4,500+. `/industries/franchising`
  and `public/llms.txt` still carry older figures and were out of scope.
- A better name for the "AI Apps" module; the reveal diagram says "Apps".
- Scope for the interactive workflow generator. The secondary CTA is
  deliberately absent until it exists — do not wire it to `/demo`, which is an
  empty noindex stub.

## Known deviations from spec

- The hero lead flows as one wrapped paragraph across four lines, not the
  originally specified single-line-per-sentence version: the copy column
  physically cannot hold it. Sizes are constraint-derived.
- The problem section's payoff line is accent blue (`--ed-accent-text`), not
  raw `#00AEEF`. Brand blue on that section's light background measures about
  2.4:1, which fails at any size. The token gives 4.54:1 light and 7.28:1 dark.
- The hero lead's second sentence is raw `#00AEEF` on request, and measures
  about 2.4:1 on the hero background. It is display type at 26–40px, so it
  reads, but it does not meet WCAG AA. `--ed-accent-text` is the accessible
  swap if that ever matters more than the exact brand blue.
- The coach's-week chart draws Coaching in the same `#00AEEF` in both bars.
  The Today bar used to tint it to 55%; the contrast the chart makes is width,
  not shade, and the tint weakened it.
- The Trust and control H2 holds two lines at 768px and above; it takes three at
  390, where a two-line cap would need ~22px type.
- Section 7 keeps its full layout rather than becoming a "compact band", since
  compacting would be a visual redesign.
- The territory-coverage grid (71% / 98% / 101% tiles and the "next 4%" caption)
  was retired from the problem section: the numbers read as unexplained and the
  visual did not support the beat it sat under. It is recoverable from tag
  `v3-step12-pre` if the argument is ever restated.
- The problem section's payoff line names the layer directly ("one unified
  execution layer that connects all people, playbooks, and tools") rather than
  describing its effect on the week. It carries the "people, playbooks, and
  tools" phrasing that used to sit in a caption under `OrderedPanel`.
- The problem section's beats go three-across only from **1024**, not 768. At
  768 the three-column grid left each card 208px, which wrapped every question
  and compliance badge and overran the shared card height. Below 1024 they
  stack full width.
- The beat cards **stretch to the row** rather than taking a fixed height. A
  fixed height had to cover the worst case (1024) and so left dead space at
  every wider viewport. The grid stretches, the card is `flex-1` over a
  `CARD_MIN_H` floor, and the beat body reserves three lines (`min-h-[3.75rem]`)
  so all three cards still start on the same line. Result at 1205: cards are
  279px with 1–22px of slack, against 336px with ~59px before.
- The `4/5` figure restates the Today bar (20% coaching leaves four days in
  five). It is not a new claim, and it moves if the chart data moves.
- **`components/growth/artifact-panels.tsx` is now entirely unused.** Its two
  exports both lost their last caller: `ScatteredPanel` when report building
  was rebuilt as `REPORT_SCRAPS`, and `OrderedPanel` when the problem section
  dropped its closing visual for a connector sentence. The `.ed-tile-fluid`
  rule in globals.css is dead with it. Nothing else imports either. Kept
  rather than deleted, since it was not asked for; recoverable from any
  commit before this one.
- The problem section now ends on a connector sentence rather than a visual.
  It has to hand off to `TheSystem`, whose first line is "EZee Assist is that
  system", so it must land on a noun that "that system" can refer back to.
- The problem section's three beats are named for the hero descriptor
  (Repetitive questions / Compliance chasing / Report building) on purpose. If
  the hero descriptor changes, change these with it.
- `--ed-bg-alt` is the section alternation grey (#F4F4F5 light). It was lifted
  from #FAFAFA so the problem section separates visibly from the white hero.

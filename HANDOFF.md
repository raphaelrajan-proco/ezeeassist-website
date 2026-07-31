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

## Page structure (9 sections, in order)

| # | Section | File | Anchor |
|---|---|---|---|
| 1 | Hero (logo band folded in, crops at fold) | `components/growth/Hero.tsx` + `TrustStrip.tsx` | — |
| 2 | The problem (chart, 3 beats, one-layer payoff) | `components/growth/CoachsWeek.tsx` | `#the-week` |
| 3 | The reveal | `components/TheSystem.tsx` | `#the-system` |
| 4 | What it does (pinned scroll, 5 modules) | `components/growth/Capabilities.tsx` | `#capabilities` |
| 5 | Proof | `components/growth/CustomerProof.tsx` + `outcomes-stats.tsx` | `#proof` |
| 6 | Trust and control (6 tabs) | `components/growth/TrustAndControl.tsx` | `#trust` |
| 7 | Integrations and channels | `components/Connected.tsx` | `#connections` |
| 8 | FAQ | `components/growth/Objections.tsx` + `lib/data/objections.ts` | `#objections` |
| 9 | Final CTA | `components/growth/FinalCTA.tsx` | `#book` |

Capability modules also expose anchors: `#answers`, `#ticketing`, `#workflows`,
`#reporting`, `#ai-apps`. Nav and footer link to these — check them if you
rename a section.

Support modules (not sections): `artifact-panels.tsx`, `audience-duality.tsx`,
`handoff-flow.tsx`. Unwired-but-kept work lives in `components/growth/_archive/`.

The hero's copy stack is eyebrow, lead, sub-lead, CTA. Each line carries the
type of the **slot** it sits in, not type of its own:

| Slot | Copy | Type |
|---|---|---|
| Eyebrow (`h1`) | AI Operating System for franchisee success. | 9.7–11.25px, 600, uppercase, 0.16em, accent blue |
| Lead | Take all the low-value work off your coaches. / Amplify their tactical expertise across every location. | 23–36px, 700, -0.03em |
| Sub-lead | Repetitive questions… / EZee handles all of it… | 15.2–20px, 400, `ed-fg` |

The `h1` deliberately sits on the eyebrow line, styled small, so the page's
primary statement still matches the title tag and the JSON-LD. Moving it to
the visually dominant lead is a one-line swap if that is ever preferred.

The trust line ("Trusted by 70+ brands…") sits below the visual, directly
above the logo marquee, rendered by `TrustStrip.tsx` rather than the hero. See
the flag note below for how to put it back.

**Sizing the lead is measurement work, not arithmetic.** A width-ratio
estimate said 36px would hold two lines per sentence at 1024; real wrapping
gave three, because breaks land on words. Binary-search the actual wrap in the
browser instead. Measured ceilings for two lines per sentence: 24.5px at 390,
30px at 1024, 37px at 1205, 38.5px at 1440. **1024 binds hardest**, since that
is where the two-column grid starts and the copy column drops to 425px, its
narrowest anywhere. Anything retuned here has to clear 1024 first.

`OrderedPanel` in `artifact-panels.tsx` closes the problem section. Four
artifact tiles run left to right, an SVG spine drops from each into a shared
rail, and the rail feeds one "One execution layer" bar. Tiles size to their
grid columns via `.ed-tile-fluid` (`app/globals.css`), which overrides the
fixed widths the tiles carry for their other callers. Do not reintroduce
transform scaling here; it was what made the tiles overlap the bar.

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
- Framer Motion clobbers inline `transform` on `motion.*` — put static rotation
  or offsets on an inner plain `div`.
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
- Real security posture copy for the Trust and control security tab. No
  certification claim may be reintroduced without evidence — "SOC 2 Type II
  aligned" was deliberately removed as unverified.
- Decide on the SoftwareApplication `aggregateRating` in `app/page.tsx`
  (`ratingValue 4.9`, `ratingCount 60`). Nothing in the repo backs it. The
  per-location pricing `offers` block was already removed and must not return —
  pricing does not appear on the site in any form, including structured data.

**Content**
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

- The hero lead is a four-line lockup (two lines per sentence), not the
  originally specified single-line-per-sentence version: the copy column
  physically cannot hold it. Sizes are constraint-derived.
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
- The problem section's three beats are named for the hero descriptor
  (Repetitive questions / Compliance chasing / Report building) on purpose. If
  the hero descriptor changes, change these with it.
- `--ed-bg-alt` is the section alternation grey (#F4F4F5 light). It was lifted
  from #FAFAFA so the problem section separates visibly from the white hero.

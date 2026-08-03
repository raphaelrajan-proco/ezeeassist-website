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
| 0 | Floating nav pill (overlays the hero) | `components/Navbar.tsx` | — |
| 1 | Hero (logo band folded in, crops at fold) | `components/growth/Hero.tsx` + `TrustStrip.tsx` | — |
| 2 | The problem (bar, 3 pillars, capacity block, closing) | `components/growth/CoachsWeek.tsx` | `#the-week` |
| 3 | The reveal (operating system diagram) | `components/TheSystem.tsx` | `#the-system` |
| 4 | On demand (3-tile showcase) | `components/growth/Capabilities.tsx` | `#capabilities` |
| 5 | Always on (pinned 4-band stepper) | `components/growth/AlwaysOn.tsx` | `#always-on` |
| 6 | Proof (sticky story stack) | `components/growth/CustomerProof.tsx` | `#proof` |
| 7 | Control center (5 guarantees, static) | `components/growth/TrustAndControl.tsx` + `ControlCenterIcons.tsx` | `#trust` |
| 8 | FAQ | `components/growth/Objections.tsx` + `lib/data/objections.ts` | `#objections` |
| 9 | Final CTA | `components/growth/FinalCTA.tsx` | `#book` |

The showcase pills expose anchors: `#answers`, `#reporting`, `#ai-apps`, and
the section opens the matching scene from `location.hash`. `#agents` and
`#compliance` went away when the rail dropped from five pills to three.
**`Footer.tsx` still links `/#agents`, which is dead.** See the showcase
section below.

**Every section shares one container**: `max-w-7xl px-6 md:px-12 lg:px-16`,
which is `SectionShell`'s and the hero's. Measured content edges are 64 at
1205, 144 at 1440, 24 at 390, identical across the hero, the problem, on
demand, always on, proof, the control center and the FAQ. **The operating
system diagram is the one exception at `max-w-[1480px] px-6 md:px-10`**, kept
deliberately so the 1400-wide canvas has room. Anything new lines up with the
7xl set, not with the diagram.

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

## The operating system diagram

Rebuilt from the v2 handoff. Three HQ input cards feed a central core, eleven
wires carry two-way colour-coded pulses, and the store column grows sideways
into a field of location tiles on scroll.

**Tokens live on `.ed-os` in globals.css.** The section **runs on the
handoff's dark tokens in both themes**, by request, so it stays the dark band
it has always been on this page. There is deliberately **no `.dark .ed-os`
block**: there is nothing to switch. The handoff's light set is unused.

Two things follow from that and will break if anyone reintroduces theme
switching here:

- `CoreLogo` renders `/logo-white.svg` unconditionally. Gating it on `dark:`
  puts a black wordmark on a near-black panel in light mode.
- The flow colours are the handoff's dark values only. Its light values are
  not in the stylesheet.

**The accent is remapped** from `#4373FF` to the EZee family, the same call
`.ed-problem` and `.ed-showcase` make. `--os-accent` is a fill under white
text (the +250 tile), so it is `#0077A8` at 4.99:1; `#00AEEF` is 2.53:1 and
fails. `--os-accent-ink` is accent text on the dark panels, where `#00AEEF`
clears comfortably.

Measured on the dark surface, all above the 4.5:1 bar (the flow pills are
11.5px/600 on their own soft background, so they do not get the 3:1
large-text allowance): Answers 6.74, Actions 8.82, Agents 6.27, governed pill
7.16, `NOTHING MIGRATES` 7.51, white on +250 5.0, store labels 16.91.

### The logos, which went missing once before

**All 11 marks are local files.** Nine integration SVGs live in
`/public/logos/integrations/`, plus `/logo-black.svg` and `/logo-white.svg`
for the core. **Never reference `cdn.simpleicons.org` at runtime.** Both
wordmarks render and the theme picks one with `dark:hidden` / `hidden
dark:block`, so the core can never be an empty rectangle.

**`notion.svg` is deliberately the grey variant, not brand black.** A
near-black mark disappears on the dark chip `#141B2C`. If you swap in another
near-black brand (Square, and others), give it a light variant or it vanishes
in dark mode. Verify by loading both themes and counting marks; a missing file
still renders an `<img>` box, so check `naturalWidth > 0`, not just presence.

### Geometry

**The flow legend sits above the governed pill**, swapping the handoff's
order. Both keep the handoff's two y slots (394 and 440), exchanged. The
stacked version below 1200 follows the same order.

**The payoff line carries no rule above it and is a centred lockup**, not a
three-column grid. On a full-width grid the three lines spread to the far
edges and read as left-justified rather than as a group.

**The canvas wrapper reserves `(CANVAS_H - 66) * scale`, not the full 660**:
the drawn content ends around y=594 and the remainder is empty canvas, which
pushed the payoff line ~80px below the visual. Measured 36px above the line
and 36px below it at 1205. The canvas box overflows the wrapper harmlessly.

**The canvas is a fixed 1400x660 that gets scaled.** The wire paths and the
pulse `offset-path` values are absolute coordinates in that space, so they
cannot be made responsive without redrawing every curve. A `ResizeObserver`
sets `transform: scale(w/1400)`.

**`PATHS` is one array feeding both the SVG `d` attributes and the pulse
offset-paths.** Generating them separately lets them drift and the dots float
in empty space. `getComputedStyle` normalises `M300` to `M 300`, so compare
whitespace-normalised when verifying, not raw.

**The right column's width math has to land on exactly 400**:
`120 + 10 + (5 x 46) + (4 x 10)`. `box-sizing: border-box` on the tiles is
load-bearing; without it the 1px borders make them 48px and every row drifts.
Verified at 400.00 with rows aligned.

**The canvas renders from 1200px, not `lg`.** At 1024 the scale is 0.674,
which puts the 11.5px store labels at 7.75px. The handoff says to reflow below
~1200, so `min-[1200px]:block` on the canvas and `min-[1200px]:hidden` on the
stacked version. At 1200 the scale is 0.80.

### Pulses and the reveal

Pulses are randomised **once, in a mount effect**, not during render (which
would reshuffle every pass) and not at module scope (which would make the
server and client markup disagree). 27 pulses over 11 paths.

The reveal needs both an IntersectionObserver and a plain scroll listener,
and **the `scrollY > 80` guard is load-bearing**: without it the reveal fires
on load in tall viewports and the moment is lost. Reduced motion renders the
columns already expanded and freezes the pulses and the core glow.

To test the reveal in the preview pane, which pins `scrollY` at 0:
`Object.defineProperty(window, 'scrollY', { get: () => 500 })` then dispatch a
`scroll` event.

## On demand showcase (section 4)

Rebuilt from the v2 handoff. Three pills beside a photo stage, auto-advancing
every **9.5s** (was five pills at 6.5s). Hovering pauses, clicking a pill jumps
and resets the timer, `prefers-reduced-motion` stops the auto-advance and every
entrance while leaving the pills clickable.

Each scene proves its tile's claim rather than illustrating it. **Keep that
intent** if the copy is revisited:

- Tile 1's caption states the scoping, because scoping is invisible in a
  screenshot.
- Tile 2 closes on "no one built a dashboard", which is the actual claim.
- Tile 3 is two panels because "built by an owner, not a developer" is the
  sentence that de-risks it.
- Store #214's closing audit appearing here at 3:45pm and again later at
  5:20pm is **deliberate continuity, not duplication**.

**Only the active scene is mounted.** That is what replays the entrance
sequence on every advance, and the sequence ordering is the design: the gap
between question and answer in scene 1 reads as the system responding, the gap
between the two panels in scene 3 is the twenty minutes.

### Things that will bite

**The section uses the site's shared container**, not the handoff's 1480.
Running wider made it reach the page edge while its neighbours did not, which
read as a break in the page rather than as a wider section. The rail gives up
width to compensate (268 rather than 300, gap 28 rather than 36), so the stage
still measures 856 at 1440 and 781 at 1205.

**The stage is fixed 580 tall from lg with a fluid width**, not a scaled 1100.
Scaling would shrink 15px body copy along with everything else; fixing the
height keeps the handoff's vertical geometry (48 / 88 / 120 insets, 270px
cards) exact where it matters. Below lg the content falls into normal flow.

**The trend SVG must scale uniformly.** It was briefly
`preserveAspectRatio="none"`, which stretched the 300x150 box to 255x158 and
thinned the 3px stroke unevenly. Same bug class as the old spine line. It now
carries a fixed 150px height.

**`.theme-editorial` sets `overflow-x: clip`, so a headline overrun is silently
cut rather than scrolling.** `scrollWidth > clientWidth` does not catch it on a
block element either. Measure the text with a `Range` against the column width.
The headline needs **27.97px of width per 1px of font size**, so the one-line
ceilings are 21.2 / 24.6 / 33.7 / 40.2 / 42.9px at 640 / 768 / 1024 / 1205 /
1280. The clamp sits 3 to 5 percent under each and tops out at the spec's 42px.
Below 640 it wraps; one line there would need 16px type.

**The eyebrow is 14px, not 10.5px**, and the handoff says explicitly not to
shrink it back. Note this reintroduces a section label after the earlier
"kill the titles" pass; it is the newer instruction.

### Anchors and the footer

Pill ids are deep-link anchors and the component reads `location.hash` on
mount. Going from five pills to three **dropped `#agents` and `#compliance`**.
`#answers`, `#reporting` and `#ai-apps` were kept on the three surviving tiles
precisely so the footer keeps resolving.

**`components/Footer.tsx` still links `/#agents`, which is now dead.** The
footer is shared with every other route, so it was left alone rather than
edited unilaterally. The fix is one line: point it at `/solution/agents`, which
exists and is what the nav already uses.

### Colours

Tokens live in `.ed-showcase`. **`--sc-accent-ink` is not decoration**: it is
the darker accent for text and for anything white sitting on an accent fill,
because `#00AEEF` under white is 2.5:1. `#0077A8` light, `#00AEEF` dark.

The handoff's `warn`, `bad` and `violet` were darkened for light mode so the
exception rows and the "live" pill clear 4.5:1 on their own soft backgrounds.
Measured light: ask titles 5.0, bad rows 5.45, warn rows 4.79, violet pill
4.99, source chips 4.67, mono labels 5.81, rail subs 5.27. Dark: 7.51 / 5.89 /
8.75 / 5.53 / 6.58 / 6.49.

**Captions carry a text-shadow, which the handoff does not specify.** The scrim
falls to 0.18-0.2 alpha at its right end and the scene 2 and 3 captions span
the full stage, so their tails land on bright photo.

**The photos are Unsplash hotlinks.** Production depends on the Unsplash CDN
for three images. Swap for owned photography before launch.

**Channel glyphs are inline SVG on `currentColor`**, not brand marks: the icon
CDN does not serve Slack or Teams. If brand assets land, commit local SVGs and
check dark mode.

## Always on (section 5)

Fifteen moments from one day in four time bands, then a counter.

**Structurally this is not the handoff's wall.** The handoff specified a
normal-flow wall with all four bands stacked and an accent thread drawn
between the two Store #331 cards. On request it was rebuilt as **one pinned
container that steps through the bands**: the header, the key and the ticker
stay put on screen and only the middle band viewport changes. The thread was
dropped with that change, since it spanned bands that are no longer visible at
the same time. The #331 pairing now survives in copy alone: the 6:50pm card
reads "The 6:00am draft".

Everything else from the handoff still holds, in particular:

**The colour is the argument, not decoration.** Neutral means the system
detected and handled it, accent means an automated play drawing on what the
network learned (exactly six cards), violet marks the single
franchisee-authored moment. Verified 8 / 6 / 1. Do not tint more.

The 3:45pm #214 closing audit is the same one the on demand section shows
being built. **Deliberate continuity across sections, not duplication.**

### How the stepping works

The section is `100vh + (n-1) * STEP_VH` tall and its child is `sticky top-0
h-screen`. **The page's own scroll position picks the active band**, so
nothing hijacks the wheel: scrolling behaves normally and the container simply
holds still while it happens. The arrow and the dots call `goTo`, which scrolls
to that band's offset, so **click and scroll drive one shared piece of state**
rather than two that can disagree. The arrow wraps from the last band back to
the first.

At 1205x793: section 2339, scroll track 1546, steps land at 0 / 515 / 1031 /
1546.

**`STEP_VH` (65) is the scroll distance per band.** Lower feels twitchy,
higher makes the section feel stuck.

### The height budget is the whole constraint

Header, band viewport, step control and ticker all share one screen once the
section pins. At 793 they measure 204 / 340 / 34 / 124 with `py-6` and
`gap-5`, summing to exactly 793 with no overflow. **Anything added here has to
come out of something else.** This is why the h2 tops out at 32px rather than
the handoff's 44, and why the counter numeral is 52px rather than 62.

**The band viewport is a fixed 340px and its grid is `content-center`.** Fixed
so the header and ticker never shift between a three-card band and the
six-card one, verified identical at every step; centred so a three-card band
sits in the middle rather than leaving a hole under one row. A fixed two-row
grid was tried first and left that hole.

**Below lg there is no pin and no stepper**: every band stacks in normal flow,
which is the old wall layout. Pinning a phone viewport is a bad trade and 15
cards do not fit one screen anyway.

### Two figures that are not real yet

- **The counter is static at 1,834** ("in the last 24 hours"), by request.
  The animated count-up died in production: its IntersectionObserver observed
  the stacked layout's element, which unmounts when the desktop pin swaps in
  on mount, so it sat at 0. The hook was removed with it. `COUNT` carries the
  TODO to wire the real number.
- **All fifteen moments are placeholder-real.** The handoff is explicit that
  invented moments read as invented to a franchisor, and that **the timestamps
  matter most**: 9:14am is credible where 9:00am is not.

### Other things that will bite

**The counter uses `setInterval`, not `requestAnimationFrame`.** rAF is paused
outright in a background tab, which strands the count part-way; an interval is
only throttled. Progress is read from the clock either way. Verified reaching
1,847 and drifting to 1,848.

**Card entrances replay by remounting the grid** (`key={band.title}`), not by
toggling a class, so the 70ms stagger reads on every step rather than only the
first.

**Verifying this in the preview pane needs care.** `goTo` calls
`window.scrollTo`, which fights the `translateY` framing trick, and the pane
pins `scrollY` at 0. Neutralise `window.scrollTo` and set the sticky child to
`position: static` before framing a screenshot, or the shot comes back blank.

### Colours

Tokens live on `.ed-wall`. Accent is remapped to the EZee family, matching the
other three sections. The accent and violet meta rows are 12px mono on their
own soft card background, so they carry 4.5:1, not the 3:1 large-text
allowance. Measured light 4.55 / 4.69, dark 5.94 / 5.60; neutral meta and card
body 5.81 light, 7.18 dark.

## Control center (section 7)

Rebuilt from a supplied handoff. The old version was a six-tab strip over a
live policy-table panel: a lot of chrome for a section whose only job is to
say "this is governed."

**All five guarantees are stated at once, and nothing is interactive.** No
`useState`, no active tab, no panel swap. Verified: zero buttons, zero
`role="tab"`, one link. **Model choice is gone**, so five items and not six.
The policy-table mock went with it; it only ever showed one tab's content.

**Container alignment was the reason the handoff called for a rebuild**, and
it is the one place the literal spec was not followed. It asks for a
hardcoded `1180px` with 40px padding, and also says to prefer an existing
container token if one exists. One does: these are `SectionShell`'s values,
which Proof directly above and the FAQ directly below both use. Measured at
1205, all three now sit at **64 to 1141**. The handoff's literal numbers would
have put this section at 27 to 1179 and jogged against both neighbours.

**The section is permanently dark by request**, on the operating system
section's `#05070D` in both themes, so `.ed-cc` has no `.dark` block. The
fifth column is titled "Security", not the handoff's "Security posture".
The original light/dark band pair is gone with the re-band.

### The icons

**`ControlCenterIcons.tsx` is inline SVG and must stay that way.** The five
glyphs are custom, built from the EZee Assist mark's own primitives: the
flat-top hexagon, the circle, the rounded capsule. They are deliberately not a
generic icon set.

**Do not substitute Lucide or Heroicons equivalents and do not redraw them.**
The file carries a note on what each one means so nobody improves one into
meaninglessness. Every path inherits `--cc-glyph`; verified no hardcoded hex
inside any of the five, and all render at 76x76 on `stroke="var(--cc-glyph)"`.

**Icons are never accent-coloured.** `--cc-glyph` is a mid-tone that reads as
ink.

### Layout and colour

`repeat(auto-fit, minmax(176px, 1fr))` collapses without a media query.
Verified 5 columns at 1205 and 1440, 4 at 1024, 3 at 768, 1 at 390, no
overflow at any width.

Accent is remapped to the EZee family. `--cc-accent` is the CTA fill under
white text so it is `#0077A8` in both modes; `--cc-accent-ink` is the
headline's second line.

Measured light: headline 16.11, accent line 4.30, sub and body 6.28, white on
CTA 5.0, glyph 5.0. Dark: 15.65 / 6.95 / 7.85 / 5.0 / 9.58.

**The accent headline line is 4.30 in light, which passes on the large-text
bar, not the 4.5 one.** It is 26px at its smallest and bold throughout, so it
stays large text. If that headline is ever set below 24px, this needs
re-deriving.

**Every column body is capped at four lines.** The column is 190px at 1205
and the body is 14.5px, so four lines allows about 101 characters. Permissions
and Human in the loop were both rewritten to fit; re-measure if any of the
five is edited.

Motion is the one touch the handoff allows: the five columns fade up with a
60ms stagger on first scroll into view, gated on reduced motion. Nothing
hovers, nothing swaps, nothing loops.

## A splice that has bitten once

`app/globals.css` holds the scoped token blocks back to back:
`.ed-showcase`, `.ed-wall`, `.ed-cc`, then the shared keyframes. A scripted
edit that spliced from `.ed-wall {` to the card-entrance comment **deleted the
whole `.ed-cc` block**, and the control center rendered white because every
`var(--cc-*)` resolved to nothing. Nothing errors when a custom property is
missing, so a build passes and only a screenshot catches it.

When replacing one of these blocks, anchor on that block's own closing brace,
not on the next comment down, and re-check the sections either side.

## Share metadata

Title, `og:title` and `twitter:title` are **"EZee Assist - Franchise AI
Operating System"** in both `app/layout.tsx` and `app/page.tsx`.

**Next replaces a page's `openGraph` object wholesale rather than merging it
with the layout's.** `siteName` and `type` are therefore repeated in
`page.tsx`; without them the homepage share card loses its site name. Verified
`og:site_name` renders as "EZee Assist" on `/`.

## The exit intent modal

`ExitIntentPopup.tsx` runs on the homepage's editorial tokens so its type and
surfaces match the hero: Jakarta headline at -0.035em, the same arrow-badge
CTA, `--ed-*` surfaces.

**It mounts from `layout.tsx`, outside the homepage's `.theme-editorial`
wrapper, so the card carries that class itself.** Without it every `--ed-*`
resolves to nothing and the modal renders unstyled.

Copy is general rather than support-focused: "the free Franchise AI Playbook".

**The form has no endpoint.** `handleSubmit` logs to the console and sets a
localStorage flag; there is a `TODO` for HubSpot Forms. Same gap as the footer
newsletter and the blog strip.

Gating is unchanged: 30s dwell plus 700px scroll, then desktop mouseleave or
a 45s mobile inactivity timer, at most once per session.

## The footer band

Directly under the tagline and above the six columns, no divider: a two-part
row modelled on Ada's footer. Left is "Request an AI summary" with the
pre-filled answer-engine links; right is "Get the latest insights" with an
email capture.

The grid is `lg:grid-cols-[1.35fr_1fr]`, not an even split: at 1fr each, the
three Ask pills wrapped to a second row. Verified all three share one row.

**The email field has no endpoint.** It is `onSubmit={e => e.preventDefault()}`,
matching the blog's subscribe strip, which is also a no-op. **Neither collects
anything.** Wire both to the real list before launch; there is a `TODO` on the
form.

## The closing band

**The closing section embeds the HubSpot meetings widget** in place of the
old Speak-to-an-expert button. The booking page is
`meetings-na2.hubspot.com/raphael-rajan/raphael-rajan-ezee-assist`, and the
container id is `book-a-time`.

The embed script (`MeetingsEmbedCode.js`) scans the DOM for
`.meetings-iframe-container` once, when it executes. It is therefore injected
in a `useEffect` on every mount and removed on unmount, **not** through
`next/script`: next/script dedupes by src and never re-runs, which leaves the
container empty whenever the page is returned to through client-side
navigation. The widget manages its own iframe height (756px measured);
`minHeight: 640` on the container stops the section collapsing while it
loads, and a `<noscript>` link to the booking page is the fallback.

Verified: iframe created at 900px wide at desktop and 342px at 390 with no
overflow, and the frame's `load` event fires. **The pane screenshots
cross-origin iframes as blank**; that is compositing, not a failure.


`FinalCTA` and the editorial footer are one continuous blue band. The CTA
carries the hero's background image and scrims; its bottom fade resolves to
**solid `CLOSING_BASE` (`#042036`)**, which the footer sets as its background.
`CLOSING_BASE` is exported from `FinalCTA.tsx` and imported by `Footer.tsx`
precisely so the two cannot drift; change it in one place. The footer has no
top border, and `ed-on-dark` pins the dark token set so its light-mode text
stays legible on the band. It also ships only the white logo, since the band
is dark in both themes.

## Proof: the sticky story stack

Revised after the deck shipped; the current rules:

- **All four cards are a fixed `lg:h-[420px]`.** The deck collapse only
  behaves if every card's pinned bottom is in DOM order, and the natural
  heights measured 380/418/418/380: the taller third card's pink logo panel
  slid out above the fourth on exit. Measured stable across 1024-1440.
- **The deck has its own wrapper div** so the cards' sticky containing block
  ends at the last card, not at the section end. The old 18vh spacer is gone
  with it.
- **The partner bar is a bottom-sticky compartment** (`sticky bottom-0`,
  `z-index: 3`, solid `--ed-bg` background): it pins to the viewport bottom
  for the length of the section and cards scroll away beneath it. Four pills
  only: IFA Supplier Forum, CFA Member, FSN Verified Member, WSI Partner.
- The headline is "Making an impact with franchise leaders." with the period,
  one line from ~640 up (18.51px of width per 1px of font size; clamp tops at
  48). It wraps on phones, where one line would need 18px type.
- **The headshots are transparent cutouts** (`/photos/*-cut.png`), produced
  from the originals with Apple's Vision subject-lift
  (`VNGenerateForegroundInstanceMaskRequest`) via a throwaway Swift CLI in the
  session scratchpad. Regenerate the same way if the source photos change; the
  originals stay in `/public/photos/`.

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
- Real security posture copy for the control center's Security posture
  column. No certification claim may be reintroduced without evidence:
  "SOC 2 Type II aligned" was deliberately removed as unverified.
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
- The control center H2 holds two lines from 768 up and takes four at 390,
  where each sentence wraps. The break between the sentences is hard.
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
- The closing line ("Reclaiming coaching time needs HQ…") carries **no
  entrance animation** by request; it is a plain `<p>`.
- **The two bars sit together**, the claim and its correction, with no card
  around them. The comparison is the point and a box between them broke it.
  Each bar's title is one uniform run rather than a bold figure plus a muted
  tail, and neither carries a lede or a caption.
- **Both bars carry three greys, one per pillar below.** A fourth, lightest tone was
  dropped and its share redistributed proportionally; `--pb-admin-4` went with
  it. Today is 31/26/23 + 20, the corrected bar is 8/7/5 + 80.
- **The pillar titles are underlined in their bar segment's tone**, not
prefixed with a swatch square. Tone and segment have to stay in step, since
that pairing is what lets the bar go unlabelled.

**The report scraps are scattered, not gridded.** Each tilts and nudges by
its index from a fixed `SCATTER` table rather than at random, so the layout
is stable across renders and identical on server and client. A tidy grid
argued the opposite of the point.

**The capacity progression is one two-thirds-width box**, carrying 1 to 4 to
10 as a single story, with the statement card in the last third. The steps
stack below `sm`: three abreast leaves each 57px at 390 and "franchisees"
alone needs 79. The invariant is stated once beneath the row, not repeated
under each step where three identical labels read as a glitch.

**The coaching segment's padding lives on an inner row, not on the flex item
  itself.** `flex-basis: 0%` cannot shrink a box below its own padding, so
  padding on the item sits *on top of* its share: the Today bar's coaching
  segment drew 22.6% while its label read 20%. The greys have no padding, so
  only that one was affected. Verified 31/26/23/20 and 8/7/5/80 exactly.
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

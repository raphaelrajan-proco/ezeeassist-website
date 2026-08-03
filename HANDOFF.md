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
| 5 | Always on (pinned split screen, scrolling day) | `components/growth/AlwaysOn.tsx` | `#always-on` |
| 6 | Impact stats (short KPI band) | `components/growth/ImpactStats.tsx` | `#impact` |
| 7 | Control center (5 guarantees, static) | `components/growth/TrustAndControl.tsx` + `ControlCenterIcons.tsx` | `#trust` |
| 8 | Proof (sticky story stack, pinned headline) | `components/growth/CustomerProof.tsx` | `#proof` |
| 9 | FAQ | `components/growth/Objections.tsx` + `lib/data/objections.ts` | `#objections` |
| 10 | Final CTA (button only, calendar moved to `/speak-to-an-expert`) | `components/growth/FinalCTA.tsx` | `#book` |

The showcase pills expose anchors: `#answers`, `#reporting`, `#ai-apps`, and
the section opens the matching scene from `location.hash`. `#agents` and
`#compliance` went away when the rail dropped from five pills to three.
The footer and the navbar now share one link set (the nav's five
buckets), so the old dead `/#agents` link is gone.

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

The trust line ("Trusted by leading franchise and multi-location brands.",
reworded from the 70+/5,000+ figures by request; `NETWORK_SCALE` still
feeds the metadata) sits below the visual, directly
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

**The menu is five buckets** (Platform, Solutions, Industries, Resources,
Company), restructured by request around the agent suite. The footer mirrors
the same five link arrays (exported per bucket in `Footer.tsx`); the
editorial footer adds Trust, and Compare was dropped. TODOs live on the data:
Coaching Agent points at `/platform/insights` and Compliance Agent at
`/#capabilities` until dedicated pages exist, every industry vertical points
at the `/industries` hub, and Pricing points at `/speak-to-an-expert`
because no pricing page exists. `GroupedPanel` renders one column per group,
so the single-group Solutions panel is 360 wide while Platform and
Industries run two columns at 720.

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
not lighten it. The four grey segments carry no labels; the pillar underlines
below identify them, so **underline tone and segment tone have to stay in
step**.

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

The capacity ratio (one coach per twenty locations, 20 to 1,000) is
illustrative, not measured data. The point is that both numbers climb and
impact per location does not. **Keep it on the coach's side**: nothing here
mentions salary, cost, or headcount spend.

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
stacked version below 1200 follows the same order. The pill is 190 wide
(was 164, where the text touched the rounded ends), left-shifted to 565 to
stay centred on the core's 660 axis.

**The payoff line sits under the lead line as one sentence**, at weight 500
against the headline's 700: it is the consequence of the headline, not a
second one. Its ink is `rgba(238,242,248,0.92)`, brightened from `--os-muted`
by request but held under the headline's pure near-white.

**The right column is eight 200px chips, one per out-wire.** Seven are static
and the eighth is a ticker: it climbs linearly from 8 to 99 over 9s
(about ten stores a second) the moment the canvas is 35% visible. An
opening hold was tried and read as the counter being stuck, and the
original accelerating cubic sat still too long. **It replays on
re-entry** like the coaching chart: fully leaving the section re-arms
it via a [0, 0.35] threshold pair and an away latch,
then **lands on the phrase "100s of locations" rather than a figure** (a
specific number there would be a claim; the point is only that it keeps
going, and the phrase is what carries the count past two digits). The chip
matches the other panels rather than inverting to a white fill; it stands
out through a soft accent glow (`--os-accent-soft2` border plus a blue box
shadow) and bold 14.5px ink, 1.25x the named chips' 11.5. The end label was
shortened from "100s of locations more" because "more" wrapped it to two
lines at the larger type. `setInterval`, not rAF, which is paused outright
in a background tab and would strand the count.

**The systems card names types, not vendors**, with the brand names rotating
in a marquee beneath. The card's title and its NOTHING MIGRATES tag stack
vertically; sharing a row squeezed the title onto two lines. The track holds two identical copies and shifts by
exactly half, which is what makes the loop seamless. The integration SVGs
under `/public/logos/integrations/` are no longer referenced by this page.

**The flows are one blue family** (`#5CC8F5` / `#00AEEF` / `#2E8FC0`), not
blue / amber / violet, and **the pulse dots are white on every wire** at
7 to 11s. Measured on the legend: 8.54 / 6.74 / 4.62.

**The canvas wrapper reserves `(CANVAS_H - 66) * scale`, not the full 660**:
the drawn content ends around y=594 and the remainder is empty canvas, which
pushed the payoff line ~80px below the visual. Measured 36px above the line
and 36px below it at 1205. The canvas box overflows the wrapper harmlessly.

**The canvas is a fixed 1210x660 that gets scaled.** It was 1400 while the
right side held the scroll-revealed tile field; with that gone the block only
needs its chips, and the narrower canvas is what lets this section sit in the
site's shared `max-w-7xl` container without scaling the type into
illegibility. Scale is 0.952 at 1440, against 0.823 had the canvas stayed
1400. **The section no longer runs wider than its neighbours**: all seven
measure 144 to 1296 at 1440. The wire paths and the
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

**The rotation is gated on an IntersectionObserver, not on mount.** It arms
the first time the section is 30% visible, then runs `go(0)`, so every viewer
starts on "Ask for anything" rather than arriving mid-cycle on tab 3. One arm
only; scrolling away and back does not reset. **The progress bar is gated on
the same `armed` flag** and carries it in its key: gated on `active` alone it
filled against a stopped timer and landed part-way through the real first
dwell.

**Dwell is per tab.** Tabs 1 and 2 hold 7s. Tab 3 holds 21s, because it
rotates three app examples at 7s each inside itself, and its bar fills over
the whole 21. Entering any tab resets the app index to 0.

**Tab 3 rotates three industry examples** (spa closing audit, swim school
make-up booker, senior care hiring pipeline), each with its own photo, scrim
and choreography, keyed on the app id so every example replays the entrance
sequence. Three dots top-right show position, tab 3 only. **The first example
is the same 3:45pm Store #214 moment that appears on the always-on wall**;
that continuity is deliberate, so do not renumber it.

**Tabs 1 and 2 carry approved production copy.** The rotation handoff is
explicit that only tab 3 changes: do not rewrite their labels, subs, scenes,
the headline or the eyebrow from any prototype.

Rebuilt from the v2 handoff. Three pills beside a photo stage, auto-advancing
per the dwell above. **The hover pause lives on the stage alone, not the
rail**, and the resume effect continues from the current tab rather than
resetting to 0: pausing from the rail kept the rotation frozen while the
pointer parked there, and the reset-to-0 on unpause made pill clicks feel
dead. A click clears the pause and restarts the rotation at that pill.
`prefers-reduced-motion` stops the auto-advance and every entrance while
leaving the pills clickable.

**The rotation never runs off-screen, and a full exit resets it.** The
observer watches thresholds [0, 0.3]: 30% visible arms it (fresh entries
start on tab 0 and replay), fully gone disarms and resets the refs. This
also fixed the reported "it always starts on the second tab": a
`#reporting` hash deep link used to arm the rotation at page load, so by
the time the user scrolled down it was mid-cycle on some other tab, and
the arm-once behaviour meant a back-navigation kept stale state. Deep
links are now recorded in a ref and applied on the FIRST entry only;
later re-entries start at 0. It was never a caching problem.

**The build-tab dots are buttons** (10px, active solid white, inactive
40% white, `aria-label="Show example N"`): a click jumps to that app
example via `go(2, i)` and the timed rotation carries on from it, next
advance a full interval later. Every `go()` bumps a `cycle` nonce that
keys the progress bar, so the bar restarts in lockstep with the timers
even when the tab itself does not change.

**The three owner-built tools render as white-label device mocks** (the
app-mocks handoff): the closing audit on a teal iPad POS, the make-up
booker as an aqua parent-facing phone (296px fixed, coral CTA), the
hiring pipeline as a navy desktop web app in a browser window. The
fictional palettes are deliberately NOT the site's and the usual accent
remap does not apply inside the frames; the web mock stays light in both
themes. Mocks render at natural size, no transform scaling. Each app
carries its own lg top inset (`APPS[n].box`: 82/44/96) because the
devices are different heights. One deviation: the pipeline table headers
run 9px at .07em, not the handoff's 9.5/.12em, because CERTIFICATIONS
collided with STAGE in our ~370px column against its ~490.

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

**The dead `/#agents` footer link is gone**: the footer now mirrors the
navbar's buckets (see the nav section). The showcase's live anchors stay
`#answers`, `#reporting`, `#ai-apps`.

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

Twenty-six moments from one day in four time bands, then a counter.

**Structurally this is a pinned full-width scroller** on a white band:
the header runs horizontally across the top in the on-demand section's
format (mono eyebrow, the headline in the on-demand clamp but EZee blue,
thesis line under it), the key chip sits full width beneath it, and the
compartment spans the section with **four tiles across per band** (the
split-screen left column retired on request).** The band titles are dividers INSIDE the scroller
(title + rule, the same `BandHeading` the stacked mobile layout uses); at
rest the next divider peeks through the bottom fade, which is the cue that
there is more to scroll. The key sits alone just above the scroller
(`pb-2`) on its own grey chip (`rgba(var(--wl-band-ink), 0.1)`, rounded,
full width to match the scroller under it) so it does not float loose on
the white band; its swatches
are filled rounded squares, not the cards' corner shape, because at key
size a solid fill reads faster. The grid clears the nav pill by only
4px, and the right column is top-aligned, not centred: centring pushed
the whole compartment down on tall viewports and read as a hole above
the key. **The counter block (1,834) was removed entirely on request**;
when the last band is spent the section simply hands off to the impact
band. **The pin holds until the last divider reaches the top of the
scroller**: the range is the larger of the stack overflow and the
translate that rests "On a longer clock" just under the top fade,
because on tall viewports the natural overflow released the pin while
that band was still mid-screen and the key scrolled away early.
**The pinned box is content-fitted, not 100vh** (`stickyH` = nav pad +
key + scroller + padding, measured): a full-screen sticky left its
unused bottom as a dead white band between this section and the next on
tall viewports; a fitted box ends where the compartment ends and the
impact band shows beneath it instead.

The old accent thread between the two Store #331 cards survives in copy
alone: the 6:50pm card reads "The 6:00am draft".

**The thesis is EZee blue, one continuous wrapped line** ("Coaching
amplified across every location. At the hours it matters most."),
running horizontally in the on-demand headline clamp
(`clamp(1.25rem, 3.18vw, 2.625rem)`), wrapping naturally. Coloured with
`--wl-accent` so the light band gets the darker pass-rated value
(#0071A0, 4.7:1 on the band) and dark gets the brand hue. The paragraph
under it is 19px, 1.25x its launch size. Both changes apply to the
stacked mobile header too.

**Each band sits on a plate that deepens through the day**: the
component composes `rgba(var(--wl-band-ink), 0.05 + i * 0.02)` per band
(the ink triplet is per theme in globals.css), `rounded-2xl p-3.5`,
right column only. Darkened from the 0.025 base when the band went
white. Cards inside a plate sit at `gap-3`.

**The meta rows carry committed integration logos, not glyphs**: cards
that logically draw on a system show 1-2 marks (15px, right-aligned in
the meta row) from `/public/logos/integrations`; detection-only moments
carry none. Never reference a logo CDN. The old inline glyph set is
gone.

**Tones are corner marks, not fills**, by request: every card is the
same white panel and a `CornerMark` (top-left L, 3px, radius-matched)
states the category in grey, accent, or violet, with the meta row
repeating the colour. The legend draws the same corner shape at 11px,
which is what makes the mark decodable. Do not reintroduce tinted card
backgrounds; that was explicitly removed.

**The bottom exit is deliberately tighter than the top entry**:
`PAD_BOTTOM` (28) against `PAD` (48), the pinned grid ends at `pb-3`,
and the counter wrapper has no top padding. The symmetric version
stacked the deep exit fade, the grid padding, and the counter's own
margin into a dead zone between the last band and the counter.

**The colour follows what each card's text says the system did**,
reclassified on request from the old network-reading: neutral means the
payoff is a flag, alert, reminder, or hold (the system watched and told a
human), accent means the payoff is finished work (drafted, assembled,
answered, started, sent, filed), violet marks the single
franchisee-authored moments (three: the closing audit during the day,
plus a P&L digest and a winter prep checklist on the longer clock, which
replaced the royalty and business-review cards). Rebalanced on request to
11 / 12 / 3. Surfaced network intel counts as detected, not automated:
the system found something and reported it, even when what it found came
from other locations. The legend's middle entry reads "Automated play,
work done for you".

The 3:45pm #214 closing audit is the same one the on demand section shows
being built. **Deliberate continuity across sections, not duplication.**

### How the scroller works

The track wrapper is `100vh + range` tall, where **`range` is the measured
stack overflow** (`DEFAULT_RANGE` 1400 is only the SSR fallback). The sticky
child pins for that distance and the page's scroll maps **one to one** onto
the stack's translate: a notch of page scroll moves the cards a notch, so
nothing hijacks the wheel. At 1205x793: stack 1939, viewport 598, range 1341.

**The scroller's height is a measured pixel value, never a percentage.**
The first build sized it `flex-1` inside an auto-sized grid row. Chrome
resolved that chain; Safari treated the percentages as auto, the viewport
grew to the full stack height, `range` collapsed to 1 and the section
rendered as one long unpinned wall, which the user caught from a full-page
screenshot (the tell: "During the day" active without any scrolling, and no
fades). `measure()` now sums the resolved fixed costs above the scroller
(grid `paddingTop`, tag-row height, bottom padding) and sets the height
inline, capped at 720 so the container stays roughly one band plus the peek
even on very tall viewports and in full-page captures, which expand 100vh.
The grid row is also pinned with `grid-template-rows: minmax(0, 1fr)`.
Verified at 1205x793 (598, range 1341) and at 1205x2200 (capped 720, range
1219, Overnight active at rest). Do not reintroduce a percentage height
anywhere in this chain.

**The transform is written straight to the DOM in a rAF, not through React
state.** Re-rendering a 26-card tree at scroll rate is the failure mode this
avoids; only the active tag index goes through `setState`, and only when it
changes.

**The rects already carry the translate.** Band offsets are computed as
`band.top - stack.top` (both shifted equally, so the difference is static),
and the active-tag probe compares band tops against the viewport rect. The
first build added the translate on top of rect reads and the tag never
flipped; do not reintroduce that.

The tag row is the step control: clicking a tag scrolls the page to where
that band rests just under the top fade, same shared state as scrolling.
Smooth scroll, `auto` under reduced motion. The old dots and wrap-around
arrow went away with the stepper.

**`PAD` (48) is both the stack's vertical padding and the fade depth**, so a
band resting at either extreme sits clear of the fade and everything beyond
it dims. Change one and change the other.

**The pinned grid's top padding is `calc(var(--nav-block) + 10px)`.** The
floating nav pill overlays the top of a pinned screen; with plain `py-6` the
tag row sat behind it. Same lesson as the proof deck's pinned headline.

**Below lg there is no pin and no split**: every band stacks in normal flow
with per-band headings (the stacked layout has no fixed tag row to say where
you are), the key in the header, and the counter at the end.

### Figures that are not real yet

- **The counter is static at 1,834**, by request. `COUNT` carries the TODO to
  wire the real number. Its takeaway line reads "None of these outcomes
  needed a coach to be awake", updated from "None needed" on request.
- **All twenty-six moments are placeholder-real.** The handoff is explicit
  that invented moments read as invented to a franchisor, and that **the
  timestamps matter most**: 9:14am is credible where 9:00am is not. The
  eleven added in the split-screen pass (cooler drift, register recon,
  expiring certs, overnight Q&A triage, short delivery, huddle brief, local
  campaign, refund edge case, lease window, royalty reports, business
  reviews) follow the same rule.

### Verifying this needs a real browser

The preview pane pins `scrollY` at 0, which makes a scroll-driven section
unobservable there. The working loop is headless Chrome over CDP
(`wall.mjs` in the session scratchpad): drive `window.scrollTo` through
`Runtime.evaluate`, screenshot per position. The `translateY`-on-`<main>`
framing trick does not work here either, since the section reads
`window.scrollY` directly.

### Colours

Tokens live on `.ed-wall`. Accent is remapped to the EZee family, matching the
other three sections. The accent and violet meta rows are 12px mono on their
own soft card background, so they carry 4.5:1, not the 3:1 large-text
allowance. Measured light 4.55 / 4.69, dark 5.94 / 5.60; neutral meta and card
body 5.81 light, 7.18 dark.

## Impact stats (section 6)

Four KPI cards under one centred two-line lead ("Boost your coaching
with proven AI" / "that scales your system's growth.", forced block
breaks, "proven AI" in the hero's #9FE0F8 accent, white on the hero's
hazy blue:
the band carries the hero photograph with a rgba(4,32,54,.42) scrim,
dark in both themes, so it stands out between the white wall and the
control center), deliberately half a section. Rebuilt from a supplied handoff: **the bars
are one brand-blue ramp** (`--imp-s1..s4`; the handoff's #1B55E9 royals
remapped to the EZee family, light to deep in light mode, inverted deep
to bright in dark so the brightest step sits on the biggest number),
each bar **fused to its card** (9px, radiused left, card loses its left
border and radius). Cards rise in staggered 90ms, bars draw down
scaleY, numerals count 0 to final over 1.2s+100ms/card via rAF
`textContent` with `toLocaleString` (5,000 keeps its comma mid-count).
Reveal gates on an IntersectionObserver at 0.35 plus a 2.5s failsafe so
the stats can never stay invisible; reduced motion renders the final
state. The handoff's theme toggle is a preview affordance, not shipped.
**Every figure is published elsewhere on this site**: 67% (WSI), 94%
(DekaLash), 650+ (DivaDance), the locations line (hero trust strip). Do
not invent a figure here.

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

## The closing band and the booking page

**The homepage closes on the Speak-to-an-expert button again; the HubSpot
calendar lives on `/speak-to-an-expert`** (`app/speak-to-an-expert/page.tsx`),
which repeats the "Bring us one franchise workflow" headline over the same
hero background. **Every Speak-to-an-expert button routes there**: the navbar
(desktop and mobile sheet), the hero, and the closing section. `/contact`
still exists with the form; nothing links to it from those CTAs any more.
**The navbar is shared by every route, so its CTA now lands on the booking
page site-wide**, per the prompt that created the page.

The widget itself is `components/MeetingsEmbed.tsx`. The booking URL is
`meetings-na2.hubspot.com/raphael-rajan/raphael-rajan-ezee-assist`, and the
container id is `book-a-time`. The embed script (`MeetingsEmbedCode.js`)
scans the DOM for `.meetings-iframe-container` once, when it executes. It is
therefore injected in a `useEffect` on every mount and removed on unmount,
**not** through `next/script`: next/script dedupes by src and never re-runs,
which leaves the container empty whenever the page is returned to through
client-side navigation. The widget manages its own iframe height (756px
measured); `minHeight: 640` on the container stops the page collapsing while
it loads, and a `<noscript>` link to the booking page is the fallback.

Verified: iframe created at 900px wide at desktop and 342px at 390 with no
overflow. **The pane screenshots cross-origin iframes as blank**; that is
compositing, not a failure.

`FinalCTA`, the booking page and the editorial footer are one continuous
blue band. The CTA carries the hero's background image and scrims; its
bottom fade resolves to **solid `CLOSING_BASE` (`#042036`)**, which the
footer sets as its background. `CLOSING_BASE` lives in
`components/growth/closing-band.ts`, a plain module, **not** in
`FinalCTA.tsx`: the booking page is a server component, and importing a
constant from a `"use client"` module hands a server component a client
reference instead of the string, which silently computes the gradient to
none. `Footer.tsx` picks the editorial footer for the routes in its
`EDITORIAL_FOOTER` set (`/` and `/speak-to-an-expert`); any other route gets
the light footer, which would meet the fade as a hard seam. The footer has no
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
- **The headline pins above the deck from lg up** (`sticky`, `top:
  var(--nav-block)`, `z-index: 4`, solid `--ed-bg`): cards ride up and
  disappear under it, and it unpins with the last card, exactly as the
  partner bar arrives, because it shares the deck wrapper as its containing
  block. Every card's sticky top is `calc(var(--pf-offset) + stagger)`;
  `--pf-offset` is defined in `globals.css` as nav-block plus `--pf-head`,
  the headline block's measured height, which the component publishes from a
  ResizeObserver because the type is fluid. **Below lg the pin is off and
  `--pf-offset` is 0**: single-column cards run ~790px, taller than a phone
  viewport, so pinning the headline too would leave less than half a card
  visible between the two pinned compartments.
- On viewports shorter than ~790px the last pinned card's bottom passes
  under the partner bar while pinned (54px at 720). That is transient and
  resolves at rest when the card unpins. **Do not shrink the cards to avoid
  it**: a height clamp was tried and permanently clipped the WSI and
  DivaDance attributions, which is worse than a passing occlusion.
- **The deck exits as one unit.** With a flat card list the shared sticky
  containing block released the deepest card first and the green card slid
  over the others' bars on the way out. The cards are now NESTED, each
  wrapper extending its card's containing block with a spacer (real
  content, not padding: the sticky constraint rectangle is the content
  box, and a padding version stopped the cards pinning at all) that a
  negative margin cancels from the flow. The step is cardH + gap - stagger
  = 422 per level at lg (spacers 422/844/1266); verified gaps hold
  [18,18,18] through the whole exit. Re-derive if card height, gap, or
  stagger change; below lg there is no correction.
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
- **The pillar titles carry an underline only** in their bar segment's tone.
A 12px swatch dot sat beside it for a while and was removed by request; the
underline alone now ties title to segment. Tone and segment have to stay in
step, since that pairing is what lets the bar go unlabelled.

**Bars are 48px tall and the detail cards run 342px.** The Questions card sets
the row: it is the tallest of the three, so its chip metrics (py-[7px],
gap-2, 12.5px question) are what the row height follows. `DetailCard` gives
its body `flex-1` so the footer sits at the bottom and the spare height is
absorbed inside the content rather than pooling as white space under it; each
card measures 1px of slack.

**The report scraps are scattered, not gridded.** Each tilts and nudges by
its index from a fixed `SCATTER` table rather than at random, so the layout
is stable across renders and identical on server and client. A tidy grid
argued the opposite of the point.

**The capacity block is a two-scenario animated chart**, rebuilt from
the two-line handoff. Grey is Today (one coach per 20 locations, 50 by
the end, the impact line dead flat); blue is What it should be (one per
40, 25 by the end, rising linearly at exactly 10 degrees, about 100px
over the run). Both draw concurrently; hollow markers drop per hire (50
grey + 25 blue); only the grey Coaches number flashes. Grey renders
first so blue sits on top where they converge. The dash-swatch scenario
labels replace a legend; a hairline splits the two stat rows. Do not
steepen the blue line or let the grey one move vertically. The run is
imperative against refs (rAF sets the SVG line's `x2`, the head's `cx`,
and appends markers via `createElementNS`), so nothing re-renders at
animation rate. The stat row and SVG are `aria-hidden`; an sr-only
sentence carries the meaning. Stat 3 reads "A small fraction of one
coach". The heading's line break is desktop-only, or the second line
orphans on phones.

**It replays on re-entry**: crossing 40% visibility starts a fresh run
from the left, but only after the block has fully left the viewport
since the last one (`threshold: [0, 0.4]` and an `away` latch), so
partial scrolls cannot retrigger it mid-read. Reduced motion still
paints the completed state once. Kept against the two-line handoff, all
prior explicit rules: the 5600ms draw (1.25x its 7000), the replay (it
says run once), "A small fraction of one coach" (it says "A fraction"),
the compact type scale, and the arrowed y-axis. Geometry: viewBox
600x190, baseline y=142, x-axis at 176, y-axis 24 to 176, both axes
arrowed.

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

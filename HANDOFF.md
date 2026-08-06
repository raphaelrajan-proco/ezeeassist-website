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

**The logo marquee's roster order is deliberate** (customer-logos.ts):
five openers pulled from the back of the roster, then the featured run
from position six (UPS Store, Sport Clips, Fastest Labs, Aqua-Tots,
DivaDance, Deka+, Horse Power, Oasis Senior Advisors, EverLine, CEFA,
QC Kinetix), then the rest. Oasis Senior Advisors and QC Kinetix have
no SVGs yet and render as text pills until the files land.

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

**The mobile/desktop switch is `nav:` (1120px), not `md:`.** The custom
breakpoint is declared in `globals.css`. The desktop row does not
physically fit until ~1100: at 768 the CTA's right edge measured 916px
in a 768px viewport, 148px past it and unclickable, with "Company"
clipped mid-chevron; at 1024 the row fitted but the CTA wrapped to two
lines at 56px against a 40px design. 1100 was the first clean width, and
1120 is that plus headroom. `xl` (1280) was rejected because 1205 is the
review viewport and must show the desktop row.

Five classes carry the switch — the links `ul`, the CTA group, the
hamburger, and both mobile sheets. **The pill's own cosmetics stay on
`md:`** (`px-4 md:px-6`, `md:rounded-full`, logo `h-10 md:h-12`) and
that is load-bearing: the sheet positions off `--nav-inset`, which also
steps at 768, so pill and sheet come out the same width through the
whole 768–1119 range. At 1119 both measure 1071px. Move the cosmetics to
`nav:` and they stop matching. The trade is that 1100–1119 now shows the
sheet where the desktop row did fit; that is the cost of the headroom.

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

**The time bars are 48px tall and run the full row** to the margin.
They stopped at 70% while the deleted uncapped bar existed, to mark the
line that bar blew through; with the bar gone there was nothing left for
a short bar to point at, so they were restored to 100% on request. (The
70% was always horizontal, not vertical; a 34px thickness misread was
reverted at the time.) Their header rows span the bar, so the 9.5px
eyebrows sit at each bar's right end, which is now the margin. The row
wraps below md, where the eyebrow drops under a long title. After the
three pillars the section runs a second beat: a lead in the section
lead's own size ("Even with the time freed up, one coach's expertise
only reaches so far.", two lines are fine), then **the coverage
hexagon**, then a 21/22px regular-weight muted caption that closes the
beat and the section, split after "limits coverage," from md up: the
hours cap is what limits coverage and grows headcount.

### The coverage hexagons

Replaced the uncapped third bar ("What it could be" · "The same coach,
multiplied"), which is gone along with its dashed 70% threshold and
mask fade. Recover from tag `coverage-hexagon-pre` if ever wanted back.

**Two six-axis radars side by side**, each on a 560px canvas: the grey
`Today` shape on the left and the blue `What it could be` shape on the
right. They stack below `lg`, where a half-width chart renders its
labels too small to read. Axes clockwise from top: just-in-time
guidance, tailored training, individual onboarding, local market
insight, performance reviews, situational coaching.

Each chart is **named above it, not captioned below it**, flush with the
left edge of its own column at 15px semibold (`HexLabel`). The earlier
version put the name under the chart over a full-width rule; both the
rule and the below-placement went on request. There is no rule now: the
gap between the two columns already separates them, and a rule under a
chart that has just ended reads as a section break rather than a label.
A 16px gap holds the name off its chart and `mt-4` on the grid holds the
pair off the lead line above.

**The second chart is an explicit override of the handoff, not a gap in
it.** That file forbids one in three separate places: "Do not add a
second hexagon, a comparison shape, an 'after' state, or a target
overlay", the same line again under Do Not, and "No 'what it should
be'" under the caption spec. It was added on direct request afterwards.
If you re-read the MD looking for it, it is not there and never was.

The blue shape sits at 97% on every axis, not 100%, so the outer ring
stays visible just outside it and reads as a frame the blue fills rather
than a ring the blue replaces. **It does not morph.** The grey shape's
whole argument is that attention redistributes without growing; a blue
shape that also fluctuated would argue the opposite. It gets one
entrance, scaling from the centre when the pair scrolls into view, and
then holds. **Positions 5
and 6 are the growth-driving pair and must stay adjacent** so they
contract together when the shape spikes elsewhere; do not reorder.

Three constraints carry the argument, and breaking any inverts it:
constant area across all twelve states (it redistributes, it never
shrinks, because a shrinking shape reads as a coach getting worse); no
axis ever reaches the ring, capped at 85%; two or three axes elevated
at once, never one and never all six. The shipped values are verified
against all three — constant area to within 0.01%, peak exactly 85%.

**Two things in the handoff were wrong and were corrected:**

1. *Its own values broke two of its own rules.* They peaked at 90% on
   "local market insight" and swung 62% in area. The shipped values are
   those renormalised to constant area with the peak clamped to 85%,
   so every state keeps its dominant axis and its character.
2. *`<animate attributeName="points">` does not work.* Blink does not
   implement SMIL animation of `points` at all: a raw hand-written SVG
   doing exactly that sits frozen in Chrome 150, no error, document
   timeline running normally. The shape is therefore a `<path>` with
   `attributeName="d"`, which Blink does support, including
   `begin="indefinite"` plus `beginElement()`. Same geometry, same
   timing, still SMIL. **If you ever port this back to a polygon, it
   will silently stop animating in Chrome.**

The `viewBox` is `0 64 560 272`, not the specified `0 0 560 400`. The
drawing only spans y 72..327, so the original canvas carried ~75px of
dead space top and bottom and swallowed the 24px the handoff also asked
for between the heading and the chart. Cropping moves nothing: centre,
radius, rings and every label coordinate are exactly as specified.

Timing is deliberately irregular (`keyTimes` 0;0.09;0.16;0.27;…). Evenly
spaced values read as mechanical; do not tidy them. Animation begins on
scroll into view via IntersectionObserver at 0.35, not on load.
`prefers-reduced-motion` renders the first state with no `<animate>`
element emitted at all.

Axis labels are sized in SVG user units, so the rendered pixel size is
the unit value times the chart's own scale, and that scale changes with
the stack/side-by-side switch. Three rules cover it: **17 units under
480px, 14 up to 1279, 12 from 1280**, where both charts sit at a full
560. Everything lands between roughly 10.5px and 14px rendered. Note the
phone value goes *up*, not down: at 12 units a 375px screen would render
these at 7px. 17 is the ceiling there and not a round number, because at
18 the right-hand "Individual onboarding" reaches x=563 and clips the
560-wide canvas.

`Custom performance review` was shortened to **`Performance reviews`**
on both charts by request. That retired the mobile long/short label
swap: the shorter string fits at every size, so there is one `<text>`
per axis again.

**The As-locations-scale chart card was deleted entirely** on request
(the two-scenario animated chart and all its constants). Recover from
tag `could-be-bar-pre` if it is ever wanted back.

**Headless screenshot caveat**: the scaleX(0) initial state makes the
bars zero-area, and headless Chrome's IntersectionObserver never
intersects a zero-area element, so `whileInView` looks broken in CDP
captures. Real browsers fire it; verify by forcing `transform: none`
in the probe, not by "fixing" the component.

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

Sixteen moments from one day in four time bands, four tiles each,
then two closing CTAs.

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

**Every band holds exactly four tiles, so each is a single row** of the
`grid-cols-4` plate. Trimmed to four on request: Overnight dropped the
walk-in cooler, closing photos and registers cards; Before the doors
dropped the delivery card; During the day dropped the promo question,
competitor, offer-approved and refund-edge cards; On a longer clock
dropped lease renewal and audit docs. **"New hire starts today" moved up
from Before the doors into Overnight, and its timestamp moved with it,
7:00am to 4:30am** — the bands are a chronology, and a 7:00am card
sitting in Overnight read as a bug next to a band that opens at 5:45am.

The `thread` field on `Card` is gone. It was declared and set on two
cards but never read by any renderer, and removing the 6:50pm
"Offer approved by owner" card left its partner dangling. The 6:00am
Store #331 card no longer has a payoff card on this wall.

**Two CTAs close the compartment**, bottom right, after the last band:
"See more workflows" (no fill, `--wl-accent` text and a 1.5px inset
shadow) and "Generate your own" (filled `#0077A8`, white text). Both are
sized to the nav's "Speak to an expert" (`text-sm`, 40px tall).
"Generate your own" carries an arrow badge too, **inverted against the
nav's**: a white disc with a near-black arrow. It shipped near-black
first, matching the nav, and was flipped on request. The inversion is
applied inline on that one element rather than by editing
`.ed-btn-arrow-badge`, which the nav and both hero CTAs share and which
must stay near-black. Four details are load-bearing:
- The fill is `#0077A8` and not the nav's `#00AEEF`, which was the
  requested "slightly darker" differentiation and is also the only one
  of the two that may carry white text (2.53:1 vs 4.99:1). Fixed in
  both themes, since white-on-fill does not care what surrounds it.
- The outline uses an **inset box-shadow, not a border**. A real border
  adds 3px to the box and left that button 2px taller than the one
  beside it.
- Height is pinned with `min-h-[40px]` rather than left to `py`, because
  only one of the two carries the 24px badge. On padding alone that
  button ends up 4px taller than its neighbour.
- `ed-btn-arrow` on the filled link buys only the badge's hover nudge.
  The padding rule that class also drives is `.ed-btn.ed-btn-arrow`, and
  this is not an `.ed-btn`, so it does not apply.

They sit in the pinned grid *below* the scroller, not inside it, so the
fade mask cannot dim them and they are clickable throughout the pin.
**The grid's `paddingBottom` now matches its `paddingTop`**
(`calc(var(--nav-block) + 4px)`, measured 92px top / 93px bottom) so the
gap under the buttons equals the gap above the "Always on" label, as
requested. `measure()` reads both paddings and the CTA row's height, and
the ResizeObserver watches the CTA row, because the buttons wrap at
narrow desktop widths and that changes the pinned box's height. If you
change one padding in the markup, the height follows on its own.

TODO: "Generate your own" points at `/speak-to-an-expert` until the
workflow generator ships at `/workflow-generator`. Repoint it then.

**The thesis is EZee blue and holds ONE line at desktop widths**
("Coaching amplified across every location. At the hours it matters
most.", `clamp(1.25rem, 0.25rem + 2vw, 2rem)`; the 71-char string
measures ~0.494px per char per 1px of font, ceilings 25.5 / 30.7 /
32.8 at 1024 / 1205 / capped-1152, re-derive if the copy changes). The
supporting line is exactly 0.6x of it via `calc()` (0.8 of the 0.75 it
was, on request), regular weight:
"Nobody pulled any of this. Each play orchestrated by a coach once, and
some plays built directly from what the rest of your network already
learned." The key sits `mt-2` below it and `pb-1.5` above the
compartment, with `PAD` trimmed to 40. Coloured with
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

**That same wholesale replacement silently dropped `og:image` on ten
routes.** Every platform and solutions page declared its own `openGraph`
with a title, description and url but no `images`, which does not inherit
the layout's image, it removes it. Those pages shared with no card at all.
Every page-level `openGraph` and `twitter` block now carries
`images: ["/og-image.png"]` explicitly. **If you add a page-level
`openGraph`, add the image with it.**

`public/og-image.png` is generated, not hand-drawn: a 1200x630 card built
by compositing `public/logo-white.svg` onto the indigo band, so the mark is
the real vector rather than a screenshot. It did not exist at all before,
so every share card on the site pointed at a 404. The Organization JSON-LD
had the same problem pointing at `/logo.svg`; it reads `/logo-black.svg`
now, which is a file that exists.

### Titles must not name the brand

`app/layout.tsx` sets `title.template` to `"%s | EZee Assist"`. Twenty-eight
routes carried titles like `"Answers — EZee Assist"`, which rendered as
**"Answers — EZee Assist | EZee Assist"**. All of them are the bare page
name now. The em-dashes went with them, which the house copy rules forbid
anyway.

### Metadata state at launch

Verified on the built site across 31 rendered routes: title, description,
canonical, `og:image` and `twitter:image` all present, no double-branding,
no em-dashes. All 35 sitemap URLs return 200 with no redirects.

- `/changelog` was a single `"use client"` file, so it could not export
  metadata and shipped with only the root defaults. Split into a server
  `page.tsx` plus `ChangelogContent.tsx`. **A client page needs this split
  to own its metadata**; there is no other way.
- `/solutions/coaches` and `/solution` were missing from the sitemap while
  being linked from the nav, footer and body. A linked, indexable page
  absent from the sitemap is the easy one to miss because nothing on the
  page looks wrong.
- `/platform`, `/platform/ai-agent` and `/platform/insights` are
  unreachable (`next.config.ts` 308s each away) but still declared
  self-referential canonicals naming the URL that redirects. They point at
  their destinations now. **Delete those three files or drop the
  redirects; leaving both is what produced the wrong canonical.**
- `/demo` and `/platform/integrations/directory` remain `noindex, follow`
  by meta tag, with no path exclusion in `robots.ts`. That is correct: a
  `Disallow` would stop the crawler ever reading the `noindex`.
- The sitemap's `lastModified` is one hand-bumped constant. **Do not
  replace it with `new Date()`** — it evaluates at build time and would
  claim all 35 URLs changed on every deploy, which teaches crawlers to
  ignore the field.

## The exit intent modal

**Hidden for the MVP launch behind `SHOW_EXIT_INTENT` in the component.**
Everything below still describes it and stays true when the flag flips.

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

## The footer

**One footer, every route.** `components/Footer.tsx` is now a three-line
re-export of `FooterEditorial`; editing that component changes every page,
which is the point. It used to branch on `usePathname()` against an
`EDITORIAL_FOOTER` route set: the homepage and the booking page got the dark
editorial footer and every sub-page got a light banded one. Editing either
meant remembering the other existed, and the two had drifted. The light
variant, its `BANDED_GRID`/`bandedColumns` maps and the now-dead
`footerLinks` and `Globe`/`Share2` imports are deleted, 523 lines down to
338. **Do not reintroduce a per-route footer.** If a route needs something
different, it belongs behind a prop or a flag on the one component.

**The X/Twitter and Facebook rows are gone**, on request. LinkedIn and
YouTube remain. They were deleted rather than flagged because there is no
stated intent to bring them back; re-add the two `<a>` entries beside the
LinkedIn one if that changes.

### Three bands, and no link grid

Rebuilt from a supplied handoff. The footer is identity and contact, then
the AI summary row, then legal.

**The four-column link grid is deleted and must not come back.** PLATFORM
/ SOLUTIONS / RESOURCES / TRUST held 17 links, every destination was
already in the primary nav, and it was most of the footer's height. Trust
Center survived into the legal row because it is the one item from that
grid people open a footer to find. `editorialFooterColumns`, the column
maps and the email capture went with it.

- **The footer is dark in both site themes**, so its colours are local
  constants rather than `--ed-*` tokens. Reading the theme tokens would
  flip it to a light surface in dark mode.
- **The logo is `public/logo-white.svg`, the real lockup.** Two wrong
  ways to get a white lockup, both previously shipped here: hand-setting
  the wordmark in Plus Jakarta Sans with a coloured "Zee" span, and
  `filter: invert()` on the black lockup, which flattens the blue petals
  to white and destroys the mark. It renders at 60px, larger than the
  handoff's 34-38 on request; the SVG scales, so that is one number.
- **The AEO pills keep their real vendor marks.** The handoff allows
  text-only pills OR real marks as committed files, specifically to stop
  anyone drawing approximations of third-party trademarks. The files in
  `public/logos/aeo/` are the real thing, so the marks stay.
- The copyright year is generated. A hardcoded one is the classic footer
  bug and nobody notices until January.

Measured after the rebuild: 361px tall at 1440, byte-identical across ten
routes checked, no horizontal overflow at 1440/1280/1024/768/375.

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
  `z-index: 6`, solid `--ed-bg` background): it pins to the viewport bottom
  for the length of the section and cards scroll away beneath it. Four pills
  only: IFA Supplier Forum, CFA Member, FSN Verified Member, WSI Partner.
- **The stack rides OVER the headline on the way out.** The three z-indexes
  are the whole mechanic: headline 4, cards 5, partner bar 6. The deck
  releases the moment the fourth card lands, and the headline stays pinned
  for another 518px, so those 518px are the stack climbing up across the
  lead line. It used to be the reverse — cards at auto, headline at 4 — and
  the deck vanished behind the line instead. **The order matters more than
  the numbers: never give a card z-index above the partner bar's**, or the
  deck covers the compartment it is supposed to disappear beneath. All four
  cards share one z, so DOM order still decides the 18px staircase among
  them. Measured at 1205x793: cards settle at viewport tops 181/199/217/235,
  and an `elementFromPoint` over the headline band 300px later lands inside
  a card.
- **The headline pins above the deck from lg up** (`sticky`, `top:
  var(--nav-block)`, `z-index: 4`, solid `--ed-bg`). It needs the solid
  background so the stack passes across it rather than through it, and it
  unpins with the last card, exactly as the partner bar arrives, because it
  shares the deck wrapper as its containing block. Every card's sticky top
  is `calc(var(--pf-offset) + stagger)`;
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

## Workflow Generator (in progress)

A lead-gen tool: four steps (contact, tech stack, scale, focus), then an
Anthropic-generated shortlist of workflows selected from a curated library,
persisted to Postgres and HubSpot and emailed via Resend. One self-contained
component, two routes (`/workflow-generator` with site chrome,
`/embed/workflow-generator` bare and iframeable), `?source=` flows through to
HubSpot. Model: `claude-sonnet-5`. The model selects and tailors from
`lib/workflow-library.json` only — it never invents workflows.

**Built so far (step 1 of 8):**
- Deps: `@anthropic-ai/sdk`, `zod` (v4 — use `z.email()`), `resend`,
  `@vercel/postgres`. No PDF library: the emailed one-pager is a static PDF
  the owner supplies. No in-memory rate limiter: rate limiting counts recent
  rows per IP in Postgres, because in-memory state does not survive Vercel
  serverless invocations.
- `lib/workflow-generator/db.ts` — lazy `CREATE TABLE IF NOT EXISTS
  workflow_submissions` (UUID id via `gen_random_uuid()`, consent boolean,
  ip, status partial/complete/error, jsonb payload columns) plus an
  `(ip, created_at)` index and `countRecentGenerationsByIp` for the future
  generate route.
- `lib/workflow-generator/hubspot.ts` — fetch-based CRM v3 upsert (PATCH by
  email idProperty, POST on 404). Free-mail domains are accepted but flagged
  via `wfg_free_email`. Missing token degrades to a warn log; HubSpot failure
  never fails the request — Postgres is the system of record.
- `app/api/workflow-generator/lead/route.ts` — fires on step-1 continue to
  capture partials. Requires `consent: true` (z.literal). Friendly error
  strings only, details go to server logs.
- `scripts/setup-hubspot.mjs` — one-time creation of the `wfg_*` contact
  properties. Re-runnable; 409 means exists.
- `.env.example` — server-side block: `ANTHROPIC_API_KEY`,
  `HUBSPOT_ACCESS_TOKEN`, `RESEND_API_KEY`, `POSTGRES_URL`,
  `INTERNAL_NOTIFY_EMAIL`.

**Order corrections from the owner (binding):** the workflow-library Excel
arrives before tech-stack.json or the department list is drafted — the Excel
defines both vocabularies, and `lib/data/integrations.ts` must NOT be used as
the category schema (it was built for a visual). Run the tech-stack ↔
tool-type alignment check up front and surface mismatches before building
steps 2 and 4. Resend sends from a subdomain (e.g. `send.ezeeassist.com`).
`frame-ancestors *` on the embed route for now. Structured-output API
(`messages.parse` / `zodOutputFormat`) must be verified against current SDK
docs before the generate route is designed around it; fallback is
prompt-for-JSON + `zod.parse` with one retry.

**Consent note:** no existing form on the site carries consent language (the
contact form has none), so a standard line linking to `/privacy` was drafted
for the step-2 UI and needs owner review.

**Still needed from the owner:** HubSpot private app token, Vercel Postgres
attached to the project, the workflow-library Excel, `lib/ezee-context.md`
content, Anthropic key, Resend key + verified subdomain, the static one-pager
PDF, and copy decisions (scale subtitles, CTA text).

## Design standards (DESIGN.md)

`DESIGN.md` at the repo root codifies the homepage's system so every other page
can be built or migrated against it, and `AGENTS.md` points at it so it loads
automatically. It covers the `.theme-editorial` wrapper, the token table with
its dark-mode column, the contrast rules (accent text `#0077A8`, accent fills
under white text `#0077A8`, hero-photograph accent `#9FE0F8`), the type scale,
the section shell and vertical rhythm, `MOCK_SURFACE`, the button classes,
motion constants, copy rules, and a pre-ship checklist.

**The finding that prompted it:** only `/`, `/speak-to-an-expert`, and now
`/solutions/coaches` use the editorial system. The other ~31 routes still use
the legacy styling (hardcoded `#0A0A0A` / `#F0F0F0` / `#E5E7EB` Tailwind
classes, which are the editorial tokens written the long way). Migrate a
legacy page when it is next touched; do not extend the legacy style.

### The semantic palette is central, and a new page class must join it

`--ok`, `--warn`, `--bad`, `--purple` and the `--chip-bg`/`--chip-bd` pair are
defined once in `globals.css`, on one rule listing **every** `.ed-*` page
class. **Add a new page class to that selector list when you create it.**

Two pages were built without them and their artifacts silently lost colour:
on Apps the daily-audit check circles and the New-hire D3 chip rendered as
blank gaps, because `var(--purple)` and `var(--ok)` resolved to nothing. An
undefined custom property fails quietly — no console warning, no fallback,
just a transparent fill — which is why this is one shared rule rather than a
copy per page. The reported symptom was "gaps in the visuals", and the cause
was three selectors away from the component. The washes stay per page below
it: each tunes them to its own hero hue.

### Never an "E" lettermark tile

`components/sections/FlowerMark.tsx` renders the EZee flower for
product-console headers. **A lettermark "E" tile is not a substitute** — that
was an explicit instruction on the Coaches, Ticketing and Answers handoffs,
and it was violated three times before the component existed. If a console
mock needs a product avatar, import `FlowerMark`; do not draw a letter in a
rounded square.

### The hero customer strip is on every platform and solutions page

`HeroLogoStrip` sits directly under the hero on all ten. It is one component
over one `customerLogos` list, so a change to the list changes every page,
which is what was asked for. **Do not fork it per page.**

The roster is 47 real marks, committed under `public/logos/brands/` and
driven by `lib/data/customer-logos.ts`. Three rules govern it:

1. **Every mark sits on a white chip, in both themes.** The component
   renders on three surfaces: the homepage's scrimmed hero photograph,
   `ed-bg` white, and `ed-bg` near-black in dark mode. Most marks are dark
   ink on transparent, so on two of those three they vanish without a
   chip. Four files are JPGs on white and would show as white rectangles.
   The chip is one mechanism for both, plus it gives 47 mismatched marks a
   common frame. Do not make it conditional.
2. **Marks are sized by area, not by a flat height.** Aspect ratios run
   1.00 to 7.59. At one fixed height the widest wordmark takes 228px and a
   square mark takes 30, so the square ones read as stamps. `LogoTile`
   holds `h * sqrt(ar)` near constant, clamped 22-40px. Each entry carries
   its file's measured `ar`; **re-measure it when a file changes**, since
   nothing validates it at runtime.
3. **Missing brands stay in the roster as grey text pills.** UPS Store,
   Heights Wellness Retreat and Home Helpers have no file. Their `src`
   points at a path that does not exist and `onError` renders the pill.
   Drop a file at the named path and the pill becomes a logo, with no code
   change and no reordering.

`components/sections/TrustBar.tsx` on the legacy franchising route renders
the same `LogoTile`, so the roster stays genuinely single-source.

### The type floor is enforced in CSS, and it applies to inline styles

`--ed-type-floor: 12px` in `globals.css` is not advisory. Two selector
blocks clamp anything smaller: one matches Tailwind arbitrary classes
(`text-[8.5px]` and friends), the other matches inline `font-size` by
attribute substring **with `!important`**, which is the only thing that
outranks a style attribute.

**Both lists must stay in step.** 8px and 8.5px were in the class block but
not the inline block, so an inline `font-size: 8.5px` sailed under a floor
that the equivalent class could not. The Apps digest mock was written
straight from a handoff specifying 8.5px labels and shipped them at 8.5px.
Fixed, but the shape of the bug will recur if a value is added to one list
only.

The practical consequence for handoffs: **a handoff that specifies 8.5px,
9.5px or 10.5px type cannot be implemented as written.** Author at 12px so
the source says what ships, ease off the tracking to pay for the width, and
note the deviation. Do not write the smaller number and assume it renders.

## /solutions/leadership

Rebuilt from a supplied design handoff. Nine sections: hero with the
network console, visibility, leverage, the owner flywheel, governance,
the approval kit, the quote, related, closing.

Deleted deliberately: the "keep the systems you chose" no-migration
section (**we do not talk against other vendors on this page**), the
`{{TBD:leadership-proof-*}}` quote block, the "Illustrative. Figures show
the shape of the view" disclaimers, and every section eyebrow.

**Voice rule, every line:** never call the product "it", "this", or "this
one". Name it, EZee Assist or EZee.

**Deviation, on request:** the handoff specifies an evergreen gradient
hero (`#1B4638`, accent `#9FE8C8`) and says not to normalise it. The
existing hazy photographic hero is kept, as on Answers, Workflows,
Compliance, Control Center and Coaches. The on-band accent is `#9FE0F8`.
Evergreen survives as `--ever` for the Operations icon tile.

**The flywheel is a loop, not four columns.** Four nodes, three
connectors that draw left to right, and a return line whose dot travels
right to left under the label "Growth funds the support that produced
it". The loop closing is the argument. At narrow widths the connectors
drop but the return label stays, because the label is what carries it.

**The approval kit's cards stay grey with colourful icon tiles.** Tinting
the whole cards was tried and rejected as too colourful; do not
reintroduce it.

Two loops: the 18s network console and the 12s flywheel. Both resolve to
their finished state under reduced motion, verified: KPIs at opacity 1,
feed rows visible, and every connector at `transform: none`, which is
scaleX(1), fully drawn.

The console's dot grid is decorative and `aria-hidden`; every number it
stands for also appears as text above it. Two amber dots flip to green
mid-loop, which is the "narrowing" claim shown rather than asserted.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1 and six h2s, zero
em-dashes, no banned words, no `{{TBD}}` tokens, and no `#00AEEF` used as
text.

## /solutions/coaches

Rebuilt from a supplied design handoff. Nine sections: hero with the
Monday brief, what reaches you first, the week, the play, EZee clears the
way, the quote, the FAQ, related, closing.

Deleted deliberately: the before/after toggle table, the
`{{TBD:touchpoints/*}}` stat wall, every section eyebrow, and the
duplicated brief artifact. **The brief appears once, in the hero.**

**Voice rule, every line on this page:** never call the product "it" or
"this". Name it, EZee Assist or EZee. Applied throughout; keep it for
anything added.

**No lettermark "E" tile anywhere here.** Product console headers carry
the EZee flower mark, committed at `public/logos/ezee-flower-black.png`
and byte-identical to the supplied file. That was explicit in the
handoff.

**Deviation, on request:** the handoff specifies a wine gradient hero
(`#4E1B26`, accent `#F2A9B8`) and says not to use the homepage haze. The
existing hazy photographic hero is kept instead, as on Answers,
Workflows, Compliance and Control Center. The on-band accent is
`#9FE0F8`, what the other photographic bands use; wine's rose accent
reads wrong on blue haze. Wine survives as `--wine` for the brief's
ranking badges.

### The week is a state machine, not a keyframe

Its five day columns are click-seekable, so it is React state with a six
second auto-advance that a click resets. Verified on the built page:
Monday initial, click Friday jumps forward, click Tuesday jumps back,
and the timer resumes to Wednesday. The columns are real buttons with
`aria-pressed`, and the narrative panel is `aria-live`.

**Only the active day's panel is rendered.** The prototype stacked all
five under motion-off because panels 2 to 5 relied on keyframes for
their hidden state; rendering one avoids that class of bug entirely.

Three columns at phone width, five from `md`. Five at 375 leaves each
~60px, which cannot hold "Brief ready · 7:00" at the 12px type floor;
three still reads Monday to Friday in order.

The calendar's `--wine-tint` / `--wine-bd` are **blue** despite the
names: they drive the active-day highlight, which is EZee blue, not the
page's wine.

Three loops otherwise: the 16s hero brief, the 18s play typing, and the
icon micro-loops. All resolve to their finished state under reduced
motion, verified.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1, six h2s and one h3,
zero em-dashes, no banned words, no `{{TBD}}` tokens, and no `#00AEEF`
used as text.

## /platform/answers

Rebuilt from a supplied design handoff. Ten sections: hero, problem, ask
anywhere, scoping, sources, insights, handoff, quote, related, closing.

**The framing changed and the old one must not come back.** The page used
to argue "the same question arriving from different channels." The real
problem is that self-serve is impossible: the answer is scattered across
ten systems, some stale, some conflicting, much of it locked in video and
call recordings, so people text their coach. Every section serves that
now.

Deleted deliberately: the five-step "how it works" strip, the standalone
channels section (merged into Ask anywhere), the governance strip under
the quote (those points live on Control Center), the trailing "Same
question, same source" paragraph in Scoping, and **every mono eyebrow
above a section heading**. The H2 leads each section.

**Deviation from the handoff, on request.** The handoff specifies a
cobalt gradient hero (`#0A2F6B`, accent `#8FB8FF`). The photographic teal
hero is kept instead: this hero belongs to the platform variant set in
`lib/data/platform-heroes.ts`, and pulling it onto a gradient would break
that set. The on-band accent stays `#9FE0F8`, because cobalt's `#8FB8FF`
reads wrong on teal. The closing band follows the hero, as on every other
platform page.

**Page tokens are scoped to `.ed-answers`**, not the root, the same
arrangement `.ed-problem` and `.ed-showcase` use. `--ok`, `--warn`,
`--bad` and `--purple` are names generic enough to collide with anything
added later, and `--wash`/`--wash2` are one page's panel treatment. All
eight carry light and dark values.

The hero artifact is a **phone chat mock**, which replaced the flat
answer card in a later handoff. Its ink is fixed hex, not tokens: it is a
white phone on a dark band and stays light in both themes. Nothing in it
is a real control, so the "input" is a styled span rather than an
`<input>`, keeping it out of the tab order.

**Its type is the site's 12px floor, not the prototype's.** The handoff
draws the meta lines and source chips at 8.5 to 10.5px, below the floor
the regression guard enforces, and that text is still read. Everything
sits at 12px or above and the shell grew from 310px to 330px to absorb
it; the proportions are otherwise the handoff's.

Two channel tiles were renamed in the same pass: Yammer to **Intranet**
and Chrome Extension to **Chrome**. Icons and tile styling unchanged.

Icons live in `components/platform/answers/icons.tsx`, copied from the
prototype verbatim. All decorative, all `currentColor` at stroke 1.8, so
a caller sets the hue. The nine channel tiles are data, not nine
hand-written blocks. Do not substitute an icon font or vendor logos.

**Two layout fixes the prototype's 1240px min-width hid:**
- The three Related titles are `nowrap` by design and must never wrap.
  The longest needs 284px. At three columns that is only clear from
  1200px up, so the grid is `min-[1200px]:grid-cols-3` and one column
  below, which is what the handoff's 3/1 note asks for. At 375 the card
  drops to `px-4`, which buys the 9px `px-6` left it short.
- The insight rows were `lg:grid-cols-[auto_1fr_auto]`. The verdicts run
  to 310px and are `auto`, so the topic was what gave way: at 1024 it
  collapsed to 48px over four lines. Three columns now start at `xl`, the
  verdict drops to its own row below that, and it is capped at 260px so
  the topic keeps one line at every width. Each row is its own grid, so
  the columns do not align across rows; that matches the prototype.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, one h1 and seven h2s, zero em-dashes, no banned
words, hero card `transform: none`, the portrait loads from
`public/photos/jeffrey-grant.jpeg` (byte-identical to the supplied file),
and no `#00AEEF` used as text on a light surface. The remaining
scrollWidth reports at 375 are `truncate` elements clipping by design.

## Platform hero variants

Six recolours of the homepage hero photograph, one hue per sub-page, so
eight platform pages in a row stop reading as one page. Same grain and
composition as the original, converted to JPEG at the same 2560x1440 as
the existing set (0.97 to 1.12 MB each, 6.3 MB total). The supplied PNGs
were 8 MB apiece and were not committed.

**To revert: set `VARIANT_HEROES = false` in `lib/data/platform-heroes.ts`.**
That one flag puts every page back on the blue and the scrim it shipped
with. `PREVIOUS` in that file records the old assignment per page, so the
revert is exact rather than approximate, and the images stay in the repo
unused rather than needing to be re-added.

Assignment, chosen so no two pages adjacent in the nav share a colour:

    On demand    Answers          teal
                 Reporting        indigo
                 Apps             sunset   (once)
    Always on    Workflows        forest
                 Compliance       teal
    Foundation   Ticketing        mauve    (once)
                 Integrations     sand
                 Control Center   indigo

`sunset` and `mauve` appear once each on request. `teal` and `indigo`
carry two pages each.

**The 0.45 sub-page scrim does not cover any of these.** They are much
lighter than the blues. Measured the same way the registry documents,
lightest pixel of the copy column, minimum alpha for white body copy at
4.5:1: teal 0.415, mauve 0.40, sand 0.44, indigo 0.49, forest 0.51,
sunset 0.535. The method reproduces the original's documented 0.29 on
hero-bg.jpg exactly, which is what says it matches how those numbers were
derived.

**The scrim is not always navy.** `rgba(4,32,54)` is itself a hue: over a
cool image it reinforces what is there, but over a warm one it is near
the complement and cancels to grey. At sunset's required alpha the navy
scrim left rgb(114,120,107), saturation 0.11. So sunset and mauve carry
`scrimTint`, each their own mean colour deepened to the navy's luminance,
and the four cool variants keep the navy. See the table on
`HeroBackground.scrimTint`.

**The closing band takes a further +0.04** (`CLOSING_CROP_OFFSET`). It is
shorter than the hero, so `object-cover` scales the same image up and
crops to a brighter slice. Measured on the built pages, Apps sat at 4.49
and Ticketing at 4.13 before the offset.

Verified on all eight built pages, hero and closing band, sampling the
lightest pixel inside the H1 and H2 boxes and compositing every scrim
layer in order: 4.79 to 5.88 on the heroes, 4.55 to 5.32 on the closing
bands. All clear 4.5:1 for white body copy.

**Sunset does not look yellow in place.** At the 0.58 it needs, it reads
warm olive rather than the pale yellow haze the source file is. It is
distinct and warm, which was the point, but if it is not wanted the fix
is one line in `ASSIGNED`.

Out of scope and unchanged: the homepage, Trust Center, Why EZee, Case
Studies and Leadership. The three gradient-hero pages carry their own
specified blues and must not be added to this map.

## /case-studies and /case-studies/[slug]

Rebuilt from a supplied design handoff. **The three per-story pages are
gone**, replaced by one templated route. The URLs are unchanged, so no
redirect was needed; only the files behind them moved. Deleted:
`app/case-studies/{wsi,dekalash,divadance}/page.tsx` and
`components/sections/CaseStudyDetail.tsx`.

Everything that varies lives in `lib/data/case-studies.ts`, read by both
the landing cards and the detail route, so a story is never described two
different ways. **A new story is a record plus a committed logo**, not a
new route and not a new component.

**The hero blue is ocean, `HERO_GRADIENT.ocean`, `#083A54`.** Trust
Center is `#0B2C48`, Why EZee is azure `#0C4A8C`. Each sub-page carries
its own; do not normalise them.

**Logos are committed files at `public/logos/stories/`** and were already
byte-identical to the handoff's, so nothing was copied. Never a CDN,
never a text wordmark, never a redrawn mark. **The brand panels stay
light in both themes** because all three marks are dark-on-light artwork
and invert into mud; that is why the panel stats use fixed `#0A0A0A` /
`#52525B` rather than tokens. The three marks have very different aspect
ratios, so `logoH` carries a separate height for the card, the rail and
the More-stories chip.

**Three fields are optional, and the omissions are deliberate.** A case
study is the last place to invent a fact:
- `quote` — DivaDance has no approved quote, so its prose starts at the
  challenge with no empty card.
- `channels` — only WSI's delivery channels were documented.
- the Year row in `meta` — only WSI's engagement year is known.
If those facts arrive, add them to the record and the UI picks them up.

**The WSI quote was wrong on the old page.** It carried John Evans of
EverLine Coatings under a WSI headline. It is now Jeffrey Grant, Systems
Manager, WSI World, per the handoff README. Note the handoff's own detail
HTML says "Jeffrey Small" in one place; the README corrects it to Grant
and the README wins.

**Deka Lash and DivaDance prose is carried forward** from the pages this
route replaces, at the user's instruction, not drafted fresh. Em-dashes
were resolved to commas and periods, and one sentence was rewritten to
drop the banned word "seamless". Their H1s recombine approved facts only
(Deka Lash's "400 locations" is from its approved kicker).

Two mechanisms went into globals:
- `.ed-story-card` — hover lifts border and shadow only, never a
  translate. Three stacked cards that shift on hover read as a jitter.
- `.ed-quote-card` — the accent-tint pull-quote, with its own dark
  values, so it reads as a quotation rather than another section.

The landing page ends on the quote strip, so **the quote carries the
resolve to CLOSING_BASE itself**. There is no CTA band after it and one
must not be added, or the resolve will seam into the wrong thing.

The hero is deliberately minimal: no eyebrow above the H1 and no stat
strip. Both were removed as repetitive against the cards below.

Verified on the built pages at 1440/1280/1205/1024/768/375 in both
themes, all four routes: no horizontal overflow, no text under 12px, one
`h1` each, all buttons nowrap, every logo loading from its committed
file, zero em-dashes and zero banned words.

## /why-ezeeassist

Rebuilt from a supplied design handoff. Eight sections, each a different
form, in this order: azure hero + constellation, white split narrative,
alt hairline quadrant, white trio, alt comparison table, dark investor
strip, white value rows, azure close. Surfaces measured at 1205:
`#0C4A8C` / white / `#F4F4F5` / white / `#F4F4F5` / `#0B1220` / white /
`#0C4A8C`. No form repeats adjacently.

**The hero blue is deliberately not the homepage's, and normalising it is
the one thing this handoff explicitly forbids.** It ships as
`HERO_GRADIENT.azure` in `lib/data/hero-backgrounds.ts`, a second registry
next to `HERO_BG` for heroes built from gradients rather than photographs.
It carries its own `base` (`#0C4A8C`), its own `hero` and `closing`
gradient stacks, its own `accent` (`#9FD9FF`) and its own body colour, so
nothing is inherited from the photographic variants. `hero` and `closing`
differ only in the direction of the linear pass and the position of the
radial, which makes the two bands read as a pair rather than a repeat.
**Each sub-page is supposed to have its own hero blue.** If a future page
looks like it should reuse `default`, check the brief first.

**Three CSS mechanisms were added to globals for this page** and are
reusable:
- `.ed-tint` / `.ed-tint-fg` — a card whose colour is data. The component
  passes a light triple and a dark triple as `--t-bg/-bd/-fg` and
  `--t-bg-d/-bd-d/-fg-d`, and the theme picks. Used by the four "tools
  that failed" cards, which borrow the DESIGN.md semantic families
  decoratively. They are deliberately not blue, so the failed tools read
  apart from the EZee sections.
- `.ed-mark-warn` — `#B45309` light, `#FBBF24` dark. The `◐` mark is
  unreadable at `#B45309` on `#0A0A0A`.
- `.ed-quad` — the four-decisions cross. Borders, padding and the
  two-column rule all live in the class so the stacked case degrades to
  one rule per row, which is what one column actually means. Measured at
  1205: cells 1 and 3 carry `border-right`, cells 3 and 4 carry
  `border-top`. Do not put the rules back on the cells inline; `Reveal`
  wraps each one and the border would land on the wrong element.

**The five value icons and the hero constellation are copied verbatim from
the prototype**, coordinates and stroke widths included. Icon 2's hexagon
is smaller than the others by design. The loops
(`ed-v-pulse/tilt/bob/dot/chev`) are named for the prototype's
`vPulse`/`vTilt`/`vBob`/`vDot`/`vChev` and all freeze under
`prefers-reduced-motion`.

**Copy is final and carried verbatim.** The investor is **10VC**, not 10x,
which the previous version of this page had wrong. Zero em-dashes,
verified on the built page.

The comparison table is deliberately a third answers, a third workflows, a
third control and apps, so it argues breadth. Marks differ in shape as
well as colour (`●` / `◐` / `–`) and each carries an `sr-only` label; 18
were counted on the built page. Below `md` it stacks label-above-value
rather than scrolling.

The closing CTA is bottom-aligned against the copy block, not centred
(`self-stretch` beating the grid's `items-center`, then `lg:items-end`).
Measured delta at 1205: 0px.

The investor band carries a hairline top and bottom. They are invisible
against the fill in light mode and are the only thing keeping the band
readable as a band in dark mode, where `#0B1220` sits a hair off the
page's own `#0A0A0A`.

**Known, not introduced here:** the arrow-badge CTA is 48px tall and the
secondary beside it is 58px, because `ed-btn-arrow` overrides the base
`ed-btn` box and the secondary does not. This pairing is on the homepage
and all thirteen sub-pages, so it was left alone rather than made
inconsistent on one page.

## /platform/integrations

Rebuilt from a supplied design handoff (the second revision, which
replaced the directory treatment). Seven sections: hero with the connect
artifact and the marquee, nothing migrates, the directory, write back,
access, related, closing.

Deleted deliberately: every section eyebrow, the per-system READ/WRITE
badge matrix (it asserted vendor capabilities nobody can verify), the
separate "how connection works" step strip, and every `{{TBD:*}}` block.
Read and write are stated once, generically, in Write back and Access.

**The directory is a card grid on the alt surface.** Two earlier
treatments were replaced and neither should come back: the clickable
eight-row console with its fake search pill, and the oversized `250+`
numeral on a dark band. Each card's description block is a fixed 43px,
which is what keeps the hairline under it level across a row;
descriptions are written to fit two lines and must not run to three.

**The hero is steel**, `HERO_GRADIENT.steel`, and this page left the
photographic variant map to take it, as Reporting did for indigo and
Ticketing for plum. Steel is the most neutral band in the family on
purpose: the page is about other people's systems, so the hero should
not compete with forty wordmarks scrolling under it.

Three loops, all under `data-anim`, all freezing to their finished state:
the 15s connect sequence, the 42s marquee, the 18s write-back. **Step 2's
`HELD FOR OWNER` is the point of the write-back section**, not pacing,
and must not be cut.

### Vendor logos are the one thing this page does not have

The handoff draws the directory chips with real vendor marks, and the
prototype gets them from **Google's favicon service**. That is not
shippable and the handoff says so itself: rate-limited, unversioned, and
it sometimes returns a generic globe. The house rule is firmer, a logo is
a committed local file or it is not shown.

Sourcing forty official marks is not a code change. Each has to come from
that vendor's own brand or press page, and each carries trademark terms,
most requiring the mark unmodified and forbidding any implication of
partnership. That is a legal review.

So **every chip carries its name only**, which is how vendor names are
already treated everywhere else on the site. `domain` is kept on every
chip in `components/platform/integrations/data.ts` for exactly this job:
it is the download list. When the files land in
`public/logos/vendors/<slug>.svg`, swap the chip body for a 15px
`next/image` with an empty `alt` (the name is already the label) and
nothing else changes. Verified on the built page: **zero external
images**.

`INTEGRATION_STRIP` in `lib/data/integrations.ts` is the single list
behind both this hero's marquee and the Reporting "Reads live from"
strip, so the two stay the same object.

The four "nothing migrates" cards step through one blue, light to deep.
Their light and dark values arrive inline as `--nb`/`--nf` and
`--nbd`/`--nfd` because **blue4's `#16375C` is unreadable on the dark
card** and has to lift to `#BFDBFE`. Two separate values on purpose; do
not collapse them.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1 and five h2s, zero
em-dashes, no banned words, none of the old console artefacts present, no
`#00AEEF` as text, and all three loops resolving to their finished state
under `prefers-reduced-motion`.

## /platform/control-center

Rebuilt from a supplied design handoff. Eleven sections, delivering a
promise the homepage makes: ungoverned AI is a brand risk, and this is
the system that removes it.

**The page's real job is being forwarded**, so it is built to read like a
document rather than a brochure. Three readers use it: the ops champion
who needs material to hand to colleagues, the IT and security reviewer
who needs enough specificity to say yes, and Legal, Finance and Marketing
who each need one question answered fast.

### Decisions the handoff left open

**The hero and closing bands stay the existing hazy indigo variant**, on
request, rather than the handoff's charcoal gradient. The handoff itself
offers this: it calls charcoal "a deliberate departure" and names the
closing band as the one to switch back for continuity. The Capability
band keeps its charcoal, since that is a mid-page surface.

**The three `/trust-center` links point at `/security`.** Verified on the
built page: zero `/trust-center` links remain.

**The four `{{TBD:control-center-proof-*}}` tokens are replaced** with
the published WSI material. The handoff also suggested "67% ticket
reduction in **30 days**"; nothing in the repo supports that timeframe,
so the metric ships as published, "67% fewer repetitive questions". An IT
or security voice would be the higher-value quote here if one is ever
sourced.

The prototype's `showUsagePanel` and `showRelated` authoring toggles are
not carried across. The usage-against-limits panel the brief describes is
not built; reinstate it as a second panel beside the log, visibly
different from the chronological one, if cost becomes a live objection.

### The matrix, and what must survive an edit

**Three states, never two.** The approval state is what makes it read as
an operating network rather than a lockdown. It is the single most
important decision in the section.

**Never reorder the rows.** Search is at the top because it is
uncontentious; publish network-wide is at the bottom because it is what
HQ actually worries about. Reading down, the reader moves from obviously
fine to exactly my concern, and finds it closed. That descent is the
structure, and the last row carries the emphasis treatment because it
answers the biggest objection on the site.

**State is never colour alone.** Fill, half-fill and ring differ in
shape, and all 123 markers carry an `aria-label` of Allowed, Requires
approval, or Not permitted. Verified on the built page.

**No role is ever dropped.** The handoff asked for the five columns to
survive tablet width, but at 768 each role column is ~70px and
"Leadership" needs ~90 at the 12px type floor. The table form therefore
starts at `lg`, and below it every capability becomes one card with the
five states as a compact labelled row. Nothing is dropped and nothing
scrolls sideways.

The grid classes are written out literally, twice. A computed
`` md:${GRID} `` produces a class Tailwind never generates; this already
cost a rebuild on the Ticketing console.

### Other constraints carried in comments

- **Section 2's tone.** Nothing in the left panel may imply the
  franchisor lacks IT capability or failed at governance. AI adoption
  happened in a dozen places at once, which is an architectural
  condition. A page that reads as an accusation will not get forwarded.
- **Section 3 has no capability language.** What a person can *do*
  belongs entirely to section 4. And "Locations stay independent" must
  not be softened into something that reads as a configurable setting.
- **Section 5 must not become a card grid.** Section 6 follows and is
  data dense; the numbered spine is what keeps them distinct.
- **The log keeps its human actions and its odd minutes.** Entries 3 and
  5 involve named people approving and publishing, which is what makes
  the record usable in a dispute. 9:14 is credible where 9:00 is not.
- **Do not name a model vendor** in section 7. The claim is
  swappability and a vendor list dates fast.
- **The hero's last policy row stays OFF.** A surface where every toggle
  is on reads as marketing.

Anchors `#capability`, `#sandbox` and `#record` all resolve; verified on
the built page.

Verified at 1440/1280/1205/1024/768/375 in both themes: no horizontal
overflow, no text under 12px, one h1 and nine h2s, zero em-dashes, no
banned words, no `{{TBD}}` tokens, and no `#00AEEF` used as text.

## /platform/ticketing

Rebuilt from a supplied design handoff. The old page had nine thin
sections; this has five plus related and closing, built around one
full-width animated console that does most of the work.

Deleted deliberately: every section eyebrow, the separate intake section,
the "It arrives owned" detail cards (folded into the console drawer), the
department SLA table, the before/after block, and the whole "The helpdesk
was only ever half of it" displacement section.

**The hero is plum**, `HERO_GRADIENT.plum`, and this page left the
photographic variant map to take it (as Reporting did for indigo). It is
the warmest band in the family and needs to be: the centrepiece is a long
dark console, so the hero is what says which page you are on.

Two loops: the 12s hero thread and the 22s console lifecycle. The hero
order is the argument, ask then offer then **consent** then logged; the
consent step is the point and must not be cut. The console's four status
badges are stacked in one slot and crossfade, sized to ONGOING so the row
never reflows. Base styles are the finished state in both, so reduced
motion leaves the whole thread and the closed ticket.

The hero uses **bare bubbles, no device frame**. Answers and Apps both
use a phone shell; this page deliberately does not repeat it.

### Three Tailwind traps this page hit, in order

**1. Computed class names do not exist.** The table row grid was built as
`ROW.replace("grid-cols-", "md:grid-cols-")`. Tailwind only generates
what it can literally see, so the class was never emitted, the table fell
back to one column and rows went from ~86px to ~265px tall. It rendered
without error and looked plausible in a thumbnail. Both grids are written
out in full now, twice, on purpose.

**2. `min-[1440px]:` sorts before the named breakpoints.** With
`md:grid-cols-[…]` and `min-[1440px]:grid-cols-[…]` on one element, both
matched at 1560 and **md won**, so the drawer never moved beside the
table.

**3. A px-valued custom breakpoint sorts before the rem-valued defaults.**
Replacing the arbitrary variant with `--breakpoint-wide: 1440px` did not
fix it: Tailwind emits px breakpoints ahead of its own rem ones, so it
still landed before `sm`/`md`/`lg` and still lost. **In rem (`90rem`) it
sorts where its width says it should.** `--breakpoint-nav` is still px
and works only because nothing it sets collides with a named breakpoint.

The lesson for all three: a breakpoint bug here is silent. Verify by
reading `grid-template-columns` off the built page at each width, not by
looking at it.

### The console's measurements

Row grid is `92px minmax(240px,1fr) 92px 122px 84px`. An earlier build
used `118px minmax(0,1fr) 116px 150px 96px` inside a 186/1fr/344 outer
grid at 1240px: the REQUEST column collapsed to 38px, titles wrapped one
word per line, and the category pills overflowed into LOCATION.

Measured after the fix: request cells 400px at 1440 up to 520px at 1560
with the drawer beside, 465px at 1205 with it below, and rows a flat 86px
throughout. The five columns need ~686px, which is not there at `md`
once the 158px rail is subtracted, so **`lg` is the floor** for both the
rail and the table grid; below it each ticket is a stacked card.

The queue deliberately has no Legal queue and no breached row, and
Coaches and Operations carry the largest volumes: the section argues that
the load is operational, not a support desk.

The four takeaway titles are nowrap and the longest needs 207px, which is
2px short at four columns at 1024, so the 4-up starts at `xl`.

Verified on the built page at 1560/1440/1280/1205/1024/768/375 in both
themes: the document never scrolls horizontally, no text under 12px, one
h1, five h2s and four h3s, zero em-dashes, no banned words, none of the
deleted sections or eyebrows present, no `#00AEEF` as text, the console
stepping row → classify → categorise → assign → drawer → context →
resolve → rule with the badges crossfading, and both loops resolving to
their finished state under `prefers-reduced-motion`. The one remaining
scrollWidth report is the drawer's own `translateX(24px)` entry state,
clipped by the console's `overflow-hidden`.

## /platform/compliance

Rebuilt from a supplied design handoff. Seven sections plus a closing
band: hero, the gap, scope, continuity, the chase, closing it, evidence.

The page makes one argument: a network's compliance state can be known
continuously rather than sampled at audits, gaps can be chased to close
without a person sending reminders, and every close leaves verifiable
evidence.

### Three open questions the handoff asked to be settled

**The hero.** Kept as the existing hazy teal variant, on request. The
handoff asked for a variant with its own base and scrim and said the
committed image should be the teal one, which is what
`platformHero("compliance")` already resolves to, so the two agree.

**The dark band is `#0B1220`**, not the prototype's teal-leaning
`#0C2633`. The handoff flagged the conflict and asked which was
canonical; `#0B1220` is what every other dark solid on this site uses.

**A closing CTA band is appended.** The handoff's reference stopped
before one and asked for confirmation. DESIGN.md puts a dark photographic
CTA at the end of every sub-page and every sibling has one.

### Two copy lines were replaced, not shipped

The handoff's own copy notes flag both as the "not X, it's Y"
construction the house style bans, and supply the replacements used:

- §7 H2: "Not a checkbox. The document, the photo, and who submitted it."
  became **"The document, the photo, and who submitted it."**
- §7 column: "Verified, not just received" became **"Read and matched,
  not filed"**.

Raise both with the copy owner if the originals were wanted.

### Load-bearing details

**Every figure on this page is illustrative** and two visible
"Illustrative" footers say so, on the hero card and the chat mock. Both
must ship. They are deliberately **not** read from
`lib/data/network-scale.ts`: that file holds confirmed network figures
and putting demo numbers in it would corrupt its contract.

**The escalation ladder's stepped indent is the argument.** Each reminder
moves further out (0 → 1 → 2 → 3) and the resolved row returns to the
start, which is the close. `.ed-chase-row` compresses the step from 32px
to 10px below `sm` rather than dropping it, so the shape survives a phone
without a horizontal scroll.

**The continuity diagram's two treatments must stay different.** A dashed
track with three dots against an unbroken bar is the whole argument; do
not normalise them to match.

**Scope reads, Closing it writes.** Both sections touch integrations and
are deliberately split. Do not let either drift into enumerating the
other's systems.

The Evidence table's `Chain` row and the Day 24 row in The chase describe
the same close from two angles. That is a deliberate callback, not
duplication; both stay.

Seven Scope cards on a four-up grid leaves the last row short by one.
Intentional, and it matches the reference.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1 and seven h2s, zero
em-dashes, no banned words, both Illustrative labels present, no
`{{TBD}}` tokens, and no `#00AEEF` used as text.

## /platform/workflows

Rebuilt from a supplied design handoff. Six sections: hero with the
animated demo, the industry library, authoring, triggers, over time, and
the closing band. The handoff also specs a navbar and a footer; those
are the prototype standing in for this repo's shared ones and are not
rebuilt.

The page argues one idea end to end: a coach writes a judgment call down
once, in plain language, and it then runs at every location the coach
covers, reading each location's own numbers before it acts.

**Deviation, on request: the hazy forest hero is kept.** The handoff
specifies its own deep-green band (`#1F3630`) with a photo that was
never chosen. Workflows stays on `platformHero("workflows")`, which also
settles the handoff's open item about the hero and CTA photos since both
bands now use a committed image. The on-band accent stays `#8CC5DC`, the
handoff's, which sits correctly on forest. Workflows is one of the five
pages still in the photographic variant map.

**The hero demo is the only animated thing on the page.** Do not add a
second loop: the demo carries the argument and a competing animation
would dilute it.

### The demo's three load-bearing behaviours

**The fill is seeded, not random.** Each play has its own seed
(`20260805` / `41220931` / `77310457`) so the scatter is identical on
every load. Random order would make the same page look different to two
people looking at it together, and the scatter is the point: it must not
read as a left-to-right sweep, which would imply the locations are
processed in sequence.

**It starts on visibility, once.** An IntersectionObserver at 0.35, so
the animation is not already over when the section is reached, and never
replays on scroll.

**Reduced motion jumps straight to `done`.** No typing, no fill.
Verified: 210 of 210 tiles settled and the closing line at opacity 1
immediately.

Measured on the built page: typing runs 170 characters at 16ms, the fill
completes by ~5.4s, and all 210 tiles resolve. **210 tiles against a
count of 214 is correct**, not an off-by-four: the four callout stores
are drawn out of the field.

### Two places the handoff's layout does not survive a phone

- **The industry grid.** The handoff says the 3x3 stays at every width
  "by design". At 375 the panel leaves each of three cards about 62px of
  content and the category label alone needs ~78px at the 12px type
  floor, so it overflowed. It is three across from `sm` and two below.
- **The demo callout row.** Four callouts at 375 are ~70px each and
  their store numbers and reasons do not fit. `.ed-demo-row` drops to two
  columns below 480px, and the connector row above follows the same rule
  so every marker stays over its own card.

Content is data: `components/platform/workflows/data.ts` carries all 54
industry plays, the three demo plays, the six triggers and the four
timeline rows, generated from the handoff's `content/*.json`. The six
industry photographs are committed under `public/photos/industries/`,
converted from the supplied PNGs to JPEG at 202 to 381KB each.

**Every count on this page is illustrative**, which is why Over time
carries a visible "Counts are illustrative." line. That line stays until
real figures replace them.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1 and five h2s, zero
em-dashes, none of the handoff's banned words, no `#00AEEF` used as text,
and the demo resolving to its finished state under reduced motion.

## /platform/apps

Rebuilt from a supplied design handoff. Seven sections: hero, the wish
list, the build timeline, six shipped apps, network authorship, related,
closing.

**The framing is possibility, not neglect.** Earlier drafts argued "these
tools never get funded." That is gone and must not come back. The wish
list is a build queue, apps ship the week they are described, owners
build and HQ publishes network-wide. In particular **do not revert the
five SHIPPED pills to OPEN**: a cleared queue is the argument of that
section in miniature.

### The 3:45/4:05 section is a timeline beside the app it produced

Rebuilt from a second handoff. It was five equal columns of cards over a
horizontal hairline, which read as a flat process diagram and never showed
the app that went live at 4:05, the only thing the section actually
claims. Now a two-column split: a vertical timeline on the left, and
`DigestApp.tsx` on the right.

- **The rail stays vertical at every width.** The connector is what makes
  five steps read as one sequence.
- **The LIVE step carries four signals and all four are load-bearing**:
  accent dot, accent border over the `--wash` fill, the pulsing `ap-glow`,
  and bold full-contrast text. Colour alone does not survive monochrome or
  colour-blind viewing.
- **`DigestApp` is a fixed light palette in both themes**, same rule as the
  hero build mock and the swim-school phone. Its teal is deliberately NOT
  the site accent: the section's point is that a brand describes a tool and
  gets its own tool, so the screen must read as a white-labeled spa brand.
  The header name stays generic; naming a real customer would turn the mock
  into a claim about them.

Deleted deliberately: the "Opened on a phone, between customers" section
(its content is now carried by the authorship band's phone mock), the
`{{TBD:apps-proof-*}}` quote block, the governance strip, every section
eyebrow, and the closing line "Good ideas travel...".

**The hero is a photo variant, not a gradient**, unlike every other
sub-page. It is `HERO_BG.sunset` with a **gradient scrim** rather than a
flat one, which is new: `HeroBackground.scrimGradient` carries a hero and
a closing pass, and `platformHero()` returns them as `scrimCss` /
`closingCss` when present. The reason is measured. A flat alpha darkens
the whole frame equally, and at the 0.58 this image needs for white body
copy it read olive-grey, saturation 0.11. The handoff's gradient sits
heavy over the copy column (.74) and light where the artwork is (.44), so
the gold survives. This is the fix for the "sunset looks olive" note
raised when the variants landed.

**Two loops, and the base styles are the finished state in both.** The
16s hero build sequence (`ap-*` keyframes) and the 14s swim booking flow
run from `[data-hero-anim]` and `[data-book-anim]`, and the keyframes
impose the hidden start rather than the end. That is what makes the
reduced-motion rule one line: killing the animations leaves the complete
artifact instead of an empty frame. The hero order is the product
argument, prompt then generating then app then iteration then live; keep
it. The LIVE card on the timeline carries its own 3.2s glow.

### The minifier eats name-less animation shorthands

`animation: 16s linear infinite both` with no `animation-name` was
rewritten to **`animation:none`** in the production CSS, which silently
killed both loops and left only their final states. It looked correct in
a screenshot, which is how it nearly shipped. The base rules are longhand
now (`animation-duration`, `-timing-function`, `-iteration-count`,
`-fill-mode`) and must not be folded back into a shorthand. Shorthands
that *do* name their animation, like `.ap-blink`, survive fine.

Verify a loop by sampling opacity over time, not by one screenshot:
measured at ~1s / 3.5s / 7s / 11s the stages come in prompt, then
generating and card, then the checklist rows, then the follow-up, the
grown fourth row and the LIVE pill.

The LIVE pill overhangs the hero card by 8px by design. Measured
clearance to the viewport edge is 56px at 1205 and 16px at 375, so it
never clips.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1 and five h2s, zero
em-dashes, no banned words, no scarcity copy, five SHIPPED and one THIS
WEEK, no `#00AEEF` used as text, and both loops resolving to their
finished state under `prefers-reduced-motion`.

## The hero customer strip

`components/sections/HeroLogoStrip.tsx` wraps the shared `LogoMarquee`
for the three rebuilt platform pages (Answers, Reporting, Apps). One
component rather than three copies of the same padding, so the gap under
every hero stays identical: measured at **48px above the logos and 48px
below**, a 130px strip. That is deliberately shorter than a normal band.
It is a strip riding under the hero, not a section of its own, and at
full section padding it pushed the first heading well below the fold.

`IntegrationMarquee` is the same idea for the systems EZee reads from,
used on Reporting under a left-justified "Reads live from".

**Both scroll names, not logos.** Only four of the fifty integration
SVGs `lib/data/integrations.ts` declares are actually committed, and
`LogoMarquee` falls back to text pills for the customer logos for the
same reason. The rule is that a logo is a committed local file or it is
not shown, and mixing four real marks with forty-six text chips reads as
broken rather than deliberate. The platform page's own scroller already
does the same. If the files land, `IntegrationMarquee` is the one place
to swap.

Both inherit `ed-logo-marquee`, so both already pause on hover and freeze
under `prefers-reduced-motion`.

## /platform/reporting

Rebuilt from a supplied design handoff, replacing the twelve-section
version this entry used to describe. Ten sections now: hero, what it
costs now, inputs, ask anything, across systems, always on, scoping,
alongside your BI, related, closing.

### Across the stack is a hub diagram

Rebuilt from a second handoff. It was four coloured progress bars, a
full-width multi-colour "ALL FOUR" bar and a 23-of-300 count, and it needed
a caption to stop the wide bar and the small count reading as a
contradiction. That is the tell that a visual is arguing against itself.

`StackHub.tsx` now shows eight source systems flowing into the EZee
lockup and three products flowing out, both directions animated.

- **The stage is a fixed 1096x510 coordinate space.** The SVG viewBox and
  the absolutely positioned HTML are 1:1, which is the only reason the
  wires meet the chips exactly. **Never nudge an individual position to fit
  a width**: every wire endpoint is hard-coded to a chip or card centre.
  The whole stage scales as one unit down to ~900px and hands over to a
  stacked static version below that.
- In the stacked version the chips and cards go **fluid**. Their in-stage
  widths are a hard 186/224 to meet wire endpoints, and carrying those into
  a 375 viewport pushed four elements off-screen.
- Two hues carry direction: periwinkle in, green out. Two of the eight
  inbound dots run reversed so a couple of lines read as two-way.
- **The chip logos are self-hosted or nothing.** The prototype pointed at
  Google's favicon service; that is rate limited, unversioned, and returns
  a generic globe often enough to be a liability on a page naming
  customers' systems. Only QuickBooks and Mailchimp have committed marks;
  the other six render a neutral grey plate at the same 15px box so chip
  width and wire alignment stay exact.
- `NETWORK_SIZE`, `STACK_ROWS` and `STACK_JOIN` are deleted. Each was an
  unsourced claim about a 300-location network. **Do not resurrect them as
  decoration**; they need a source first.

**Trimmed after the rebuild, on request:** the "Alongside your BI" split
section and the scoping section's closing "How scoping is set in the
Control Center." line are both gone. The Control Center is still reached
from Related. The old "opportunity between two systems" 2x2 was replaced
by a single wide panel: the argument moved from pairwise overlap to one
question reading the whole stack. Its vantage tag is load-bearing, HQ
over 300 locations, which is why **every row counts locations rather
than records**, and the ALL FOUR bar is full width because it represents
the whole network being read, not a fifth filter. Narrowing it to match
the count made the section argue shrinkage; do not. Bar widths are the
count as a share of `NETWORK_SIZE`, so a changed count means a
recomputed width, and the intersection must stay smaller than the
tightest single filter.

**This page moved off the photographic hero set onto a gradient.** The
handoff specifies indigo `#242A5E`, now `HERO_GRADIENT.indigo` with its
own base, gradients, accent and bottom resolve. Reporting was carrying
`hero-bg-indigo.jpg` from the platform variant map and was removed from
it. `lib/data/platform-heroes.ts` records how to put it back: re-add
`reporting: "indigo"` and point the hero at `platformHero("reporting")`.

`HeroGradient` gained an optional **`resolve`**. Only `/` and
`/speak-to-an-expert` carry the dark editorial footer, so on a sub-page
the closing band's bottom colour is the end of the band rather than a
seam-matcher. It should stay in the variant's own family: indigo
resolving to the teal-navy `CLOSING_BASE` reads as a hue shift at the
fold, so it resolves to `#0A1030` instead. Azure and ocean omit the field
and still take `CLOSING_BASE`.

Deleted deliberately, do not reintroduce: every mono eyebrow above a
section heading (the hero keeps its one), the
`SOURCED / LIVE / LOGGED / EXPORTABLE` governance strip, and the
`{{TBD:reporting-proof-*}}` placeholder quote. Four copy lines were
retired for breaking the house rules: "The report isn't faster. It
doesn't get built.", "You stop checking. It tells you.", "Not a viewer
seat on a report someone built for them.", and "It reads your BI too.
Nothing gets replaced."

**The zigzag haze format appears once, in Always on.** Its whole value is
that it is not the page's default layout. Three rows alternate at `lg`;
below that every row stacks copy above panel, including the two whose
panel sits left at desktop. The product cards inside the hazes **stay
white with dark ink in both themes**: they are screenshots of a
light-themed product, and only the haze gradients swap.

**Page palettes were refactored when this page landed.** The semantic
four (`--ok`/`--warn`/`--bad`/`--purple`) and the chip pair are now
shared between `.ed-answers` and `.ed-reporting`, because they mean the
same thing on both. The washes are not shared: each page tunes them to
its own hero hue, so Answers reads blue-grey and Reporting violet-grey.
Reporting adds `--track` (the unfilled part of every bar, which has to
read as absent rather than as another value) and the three hazes.

**The scoping rows' accent rule is a mobile substitute, not a desktop
feature.** At `md` and up the stepped indent (0/44/88/132px) carries the
nesting and the left border drops back to a hairline. Below `md` the
indents go and a 3px tinted rule takes over, so the hierarchy never rests
on indent alone on a phone. The rule is written as
`.theme-editorial .ed-scope-row` because the `.ed-border` utility also
sets `border-color` and out-specifies a bare class.

Icons are a table, not JSX: `data.ts` stores each as the prototype's
space-separated subpath string and `Glyph` splits it back apart.
`LiveQueryBar.tsx` and `OverlapChart.tsx` were deleted with the old page.

Verified on the built page at 1440/1280/1205/1024/768/375 in both themes:
no horizontal overflow, no text under 12px, one h1, eight h2s and three
h3s, zero em-dashes, no banned words, none of the four retired lines
present, scoping indents measured at 0/44/88/132, no `#00AEEF` used as
text, and the hero caret freezes solid under `prefers-reduced-motion`.

## Platform pages (branch `platform-pages`)

**Nav Platform regroups by when the work happens**, not by what the
software is called: On Demand (Answers, Reporting, Apps), Always On
(Workflows, Automations), Foundation (Integrations, Control Center,
Trust Center). Footer mirrors the same order. Keep the two in step.
"Reporting and BI" was renamed to "Reporting" when that page shipped.

**The whole `/platform` tree was redirected into `/solution`**, so those
pages were unreachable. Two are real again: `/platform/ai-agent` now
301s to `/platform/answers`, and `/solution/integrations` points forward
to `/platform/integrations` rather than the reverse. Its dead page and
the old `IntegrationsContent.tsx` are deleted. **Before adding a
`/platform` nav item, check `next.config.ts` — anything still listed
there is redirected away and its page will never render.**

Stubs, all `noindex`, all using `components/platform/ComingSoon.tsx`:
`/platform/reporting`, `/platform/automations`,
`/platform/integrations/directory`. Apps and Control Center point at
`/#capabilities` and `/#trust`, the same fallback the old Compliance
Agent item used. Delete a stub route when its real page lands.

`components/platform/shared.tsx` is the props-driven layer both pages
run on: `Band`, `SectionHead`, `Eyebrow`, `Meta`, `Reveal`, `TextChip`,
`SourceChip`, `GovernanceBand`, `CARD`. The homepage's own sections are
content-hardcoded singletons and cannot be reused; this is what carries
their look forward.

### /platform/answers

Twelve sections. Two rules are load-bearing and easy to undo:

1. **No accuracy percentage anywhere.** Unverifiable, and it invites a
   demo built to disprove it. The brief's own §6 row carried "96%
   first-pass"; it is dropped, also because that figure is published
   nowhere on this site. The only percentages on the page are 94% and
   67%, both from the case studies they link to.
2. **Ticketing is linked four times** (step 04, the won't-do list, the
   handoff, Related). One link makes not-answering read as a footnote
   rather than a designed path.

§4 is the page: same question, same 9:14am timestamp, the district
manager's card visibly longer with a third source chip. **Never
equalise the heights or normalise the chip counts** — the asymmetry is
the argument. §5 is a source ledger rather than the specified pair of
bullet lists: the brief's category lines verbatim, each hanging a real
artifact, its system and its version, so "every answer names its
document" is visible instead of asserted. §7's two after-hours
timestamps stay out of business hours.

### /platform/integrations

Ten sections. **Every system name is a text chip, not a logo.** Only
nine integration SVGs are committed and none are the franchise-native
systems the page leads with, so mixing would put generic SaaS in colour
and FranConnect, ServiceTitan, Mindbody, Zenoti and ServiceMinder in
grey, inverting the page's whole emphasis. Never reference a CDN.
**Order is fixed in §3 and §5 — franchise-native first. Do not
alphabetise.**

**Three changes after the build, all from the DESIGN.md §1.4 variety
check.** §5 was a grid of twelve system names; §3 already lists roughly
fifty by category, so the second wall added only a number. It is now
the count as one figure, moved above Permissions so the arc runs
inventory, scale, then control. §6 was a pair of link cards two screens
from Related's three; the directory card folded into the count section
and what is left is the custom/API statement alone. Permissions became
the page's one artifact: one question, three role columns, sees and
doesn't. Everything else here is cards and chips, and a page arguing
that connections inherit real permissions has to show a response rather
than describe one. It is deliberately a matrix and not the Answers
page's chat cards; the two pages should not look like the same page.

**The count degrades on purpose.** `COUNT` at the top of the file
carries the `{{TBD:}}` token and `COUNT_PENDING` switches the display
treatment off while it does, because a placeholder set at 112px wraps
over four lines and swallows the section. Replace `COUNT` with the real
figure and the display size turns itself on.

§2 shows each refusal as the migration step a competitor asks for,
struck through, above what happens instead; the argument is a refusal,
which needs the thing refused on screen. The hero carries a slow
marquee and §5 a static grid so the two logo moments differ in form.
The marquee pauses on hover and holds still under reduced motion.

Three `{{TBD:...}}` tokens: `integration-count` twice (§5 eyebrow and
the "showing 12 of" line) and `custom-integration-timeline` in §6.
Marketing owns the count, engineering the timeline.

## Standing rules

**Branches.** `rebuild` is the trunk and holds everything: the homepage, the
sub-pages, the design system, the mobile pass. It is a single linear chain off
`main` with no merge commits. **The other branch names are not parallel work** —
`design-editorial-pass`, `platform-narrative-pass`, `solutions-coaches`,
`coverage-hexagon`, `platform-pages`, `growth-*` are all ancestors of `rebuild`,
bookmarks left along the same line, functionally tags. Nothing needs merging
back from them. Read them freely (`git show <branch>:<path>`), but never commit
while checked out on one: that forks the line and creates the parallel-branch
situation that does not currently exist. Launch is one PR, `rebuild` → `main`.
(`rebuild` was called `mobile-pass` until the name stopped describing what it
held; same commits, renamed 2026-08-04.)

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

### The screenshot harness and the regression guard

`npm run shots` builds nothing — run `npm run build` first — then serves
the production build itself and photographs the homepage at 390, 430,
768, 1024, 1205 and 1440: one full page plus one per section, into the
gitignored `screenshots/`. Alongside the images it writes `audit.json`
and `audit.md`.

**It also exits non-zero on three hard rules**, so a regression cannot
land quietly: no `main section` wider than the viewport, no interactive
target under 24px, no text under 12px. The 24 is the WCAG 2.2 AA floor,
deliberately not the 44px iOS guideline the advisory check uses — plenty
of legitimate controls sit under 44 and nothing should sit under 24. SVG
text is exempt from the type rule because its font-size is in viewBox
user units. `SHOTS_NO_FAIL=1` captures images without the exit.

`KNOWN` at the bottom of the script allowlists issues already triaged,
so the guard starts green and reddens only on something new. **There is
one entry** — `#the-system` overflowing at 390 and 430 — and it must be
deleted when that section is re-rendered. An allowlist that outlives its
fix turns the guard back into decoration. Known entries still print on
every run.

`scripts/overflow-sweep.mjs` is the exploratory companion and is
deliberately not wired to a npm script: it only works after you flip
`.theme-editorial { overflow-x: clip }` to `visible` and rebuild. That
flip is the point. **`overflow-x: clip` does not prevent overflow, it
hides it** — an element 500px wide in a 390px viewport reports a correct
bounding rect and silently drops its right-hand content, so a plain
"does the document scroll sideways" check reports clean. This is what
made the first audit's overflow row read "none, but that reading is
misleading". Findings and the current leak table live in
`MOBILE-AUDIT.md`.

### The type floor

`--ed-type-floor: 12px` and `--ed-type-floor-eyebrow: 13px` on
`.theme-editorial`, enforced by one block in `globals.css`. **There is
no type token system underneath it** — every small size on this site is
a Tailwind arbitrary utility or a React inline `fontSize`, so the floor
is enforced over those declarations rather than by changing a scale.
Read the comment above the block before touching it; the two traps are
that inline styles need `!important` (nothing else outranks a style
attribute) and that the style attribute is not serialised consistently,
so both `font-size:11.5px` and `font-size: 11.5px` have to be listed.

Consequence to expect: the hero eyebrow and the TrustStrip line were
both below the floor at every width, so their clamps no longer govern
and both are flat. The eyebrow wraps to two lines below ~430.

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
- `SHOW_HUBSPOT_CHAT` in `components/HubSpotChat.tsx` — the HubSpot chat
  widget. Paused for the MVP launch, wanted back within days. **It gates
  `hs-script-loader`, which is HubSpot's whole tracking tag**, so while it is
  off HubSpot's own pageview and contact tracking is off too. GA, Clarity and
  Snitcher are separate and unaffected, as are HubSpot forms, the meetings
  embed and the lead endpoint. To keep HubSpot analytics with the widget
  hidden, load the script and suppress the widget in HubSpot's chat settings
  rather than using this flag.
- `SHOW_EXIT_INTENT` in `components/ExitIntentPopup.tsx` — the "Before you go"
  modal. Hidden for the MVP launch, wanted back within days. Gated inside the
  component rather than unmounted in `layout.tsx`, so its dwell gate (30s),
  scroll gate (700px), session keys, copy and styling all survive and the
  listeners are never attached while it is off.
- `SHOW_GENERATE` in `components/growth/AlwaysOn.tsx` — the "Generate your own"
  button. Hidden until the workflow generator ships, and wanted back the week
  of 2026-08-10. A flag rather than a deletion, so unhiding is one word and the
  button's styling, inverted badge and TODO all survive. With it off, "See more
  workflows" is alone in a `justify-end` row, which is where it was asked to
  sit; flipping the flag puts the pair back.

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


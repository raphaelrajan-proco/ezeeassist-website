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

## /solutions/coaches (branch `solutions-coaches`)

The field-coaches page, built from a two-file handoff. Twelve sections: hero,
your week, what changes, a week with it, the Monday brief, build a play once,
what stays yours, coverage metrics, proof, FAQ, related, closing CTA.

**Route naming.** Plural `/solutions/`. `/solution` (singular) is a legacy SEO
alias that renders `PlatformContent`, so the two do not collide.

**Two new components, both under `components/solutions/coaches/`:**
- `CoachBrief.tsx` — the Monday brief, the page's centrepiece. One data set,
  two variants: `compact` (hero: header plus the three Tier 1 rows) and `full`
  (three tiers plus the separate "since you last spoke" block). The three tiers
  are distinguished by **edge weight, marker glyph, and label**, never by colour
  alone, so the ranking survives greyscale. Capped at `max-w-5xl` in the full
  variant: past ~1024px the right-aligned note drifts too far from its row.
  Rows stack deliberately below `md` rather than wrapping.
- `PlayGrid.tsx` — the sentence on the left, four locations on the right. The
  **variation between the four outcomes is the argument**; each row ends on a
  different result rendered in accent. Never normalise them into one shape.

**Reuse.** The homepage's section components (`CoachsWeek`, `Objections`,
`FinalCTA`, `CustomerProof`, `ImpactStats`) are content-hardcoded singletons
with no props, so they cannot be reused without refactoring them, which would
put the homepage at risk and is out of scope. This page reuses the shared layer
instead: `SectionShell`, `SectionHeadline`, `MOCK_SURFACE` from
`components/growth/shared.tsx`, `CLOSING_BASE` from `closing-band.ts`, and the
`ed-*` classes. The FAQ accordion markup is duplicated rather than imported
because `Objections` reads its content from `lib/data/objections`.

**Hero.** The brief sits *beneath* the copy, not beside it. A side-by-side
split starves the H1: at 1205 it forces the headline below 30px. Beneath, the
H1 holds 39px at 1205 and 40px at 1440 across two lines, with the hard break
applied from `lg` up only.

**Deviations from the handoff, all deliberate:**
- Em-dashes in two copy lines (Tuesday's card, FAQ answer 2) became full stops.
  House style forbids em-dashes and the user's standing rules outrank a handoff.
- Related cards point at `/industries/franchising/franchisors` and
  `/industries/franchising/multi-unit-franchisees`, which exist, rather than
  creating `/solutions/hq` and `/solutions/franchisees` stubs. Real pages beat
  "coming soon" stubs.
- `/platform/insights` **308-redirects to `/solution`** — there is no Coaching
  Agent page. The handoff authorised linking there with a flag, and the nav
  already does the same, so it stays consistent. A real Coaching Agent page
  would fix both at once.
- The metadata title keeps its em-dash separator (`Franchise Field Coaches —
  EZee Assist`) to match every other title on the site.

**Ten `{{TBD:...}}` tokens render visibly on this page** and only on this page:
eight in the coverage band (four values, four sources) and two on the proof card
(network size, second metric). They are placeholders by design. Replacing one
requires a source, not a plausible-looking number.

**Verified:** type-check and build pass; no horizontal overflow at 1440, 1280,
1205, 1024, 768, or 390; H1 holds two lines from 768 up and wraps to four with
no orphan at 390; the brief stays readable at 390 by stacking rows; both themes
check out, with the tier markers and the row-four accent border carrying the
emphasis on dark where the 5% tint nearly vanishes; the hero CTA scrolls to
`#brief` and lands it at 96px, clear of the sticky nav.

**Dark-mode testing note:** `next-themes` runs with `attribute="class"` and
`enableSystem={false}`, so emulating `prefers-color-scheme` does nothing. Set
`localStorage.theme = 'dark'` and reload instead.

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

## /platform/control-center

Ten sections, replacing the ComingSoon stub Reporting created.

**The split with Trust Center is the most important rule on this page.**
Control Center is *what HQ configures* — policies, permissions, approval
gates, the activity log, model choice. `/security` is *what EZee
guarantees* — SOC 2, encryption, subprocessors, DPA, incident response,
residency. **No certification, encryption or subprocessor content belongs
here**, one pointer only. Verified on the built page: SOC, ISO,
subprocessor, encryption and GDPR are all zero hits, and "Trust Center"
appears once.

**The argument is consolidation, not deficiency, and the tone rule is
load-bearing.** Nothing may imply the franchisor lacks IT capability,
control, or failed at governance. Fragmentation is an architectural
condition. §2's rows are neutral and only the HQ row is tinted, and even
that names the situation rather than blaming anyone. **This page's whole
job is being forwarded**, and a page that reads as an accusation does not
get forwarded.

**Governance is a reason to buy, not reassurance.** It reads as
capability, not as a compliance appendix.

One new component, `RoleAnswers` (§4). **Four responses, not two** — the
climb from one store to 214 locations is what makes the model legible.
**The HQ answer keeps the analytical insight the others do not get** (the
top-decile add-on script): scoping governs analysis, not just data
access. **The third point must not be softened** — an owner's numbers
being contractually theirs is what a franchisee-facing rollout depends
on, and if it reads as a configurable setting the claim fails.

- **§1's policy surface is five ON and one OFF**, and the OFF one is
  model training on their content. All-ON reads as marketing; one switch
  off reads as a real settings screen. Do not "fix" it.
- **§3 is a settings surface, not a capability list**, with filled/hollow
  markers and screen-reader labels so it reads in greyscale. Deliberately
  not interactive.
- **§5's log includes named humans** (Maria S. approving, Priya N.
  publishing). A log of only system actions does not demonstrate the trail
  a dispute would need. The closing line is aimed at legal.
- **No model vendor is named.** The list dates fast and the claim is
  swappability.
- **§7 leads with IT and Security** (where enterprise deals stall) and
  **keeps the Franchisees row** — including the governed party signals the
  rollout survives contact with owners.

Inbound links: seven pointed at the homepage's `#trust` anchor and were
retargeted, href-only, no copy touched — nav, footer, Answers (related
card + governance band), Integrations (related card + access link), and
Coaches' PlayGrid. Zero `/#trust` links remain.

`{{TBD:}}` tokens, four, all §8.

**Five claims flagged for confirmation:** every §3 policy row being
genuinely configurable (the most checkable section on the page, and a row
that cannot be toggled is expensive in a demo); per-brand and per-region
policy (multi-brand buyers ask first); §4's four-role scoping including
HQ's analytical insight; log retention being customer-configurable; and
model swapping genuinely requiring no reconfiguration of policies,
permissions, plays or logs.

## /platform/ticketing

Ten sections replacing the legacy page. **This is not franchisee support,
it is the whole HQ request system.** A franchisee raises a ticket by
asking, in whatever channel they already use, and it is classified, given
the location's context, and routed to whichever of nine departments owns
it. The pain removed is that today they have to know the franchisor's org
chart before they can ask for help.

**Three copy rules, all verified on the built page:**

1. **No competitor is named anywhere** (Zendesk, Freshdesk, Zoho,
   Intercom, HubSpot all zero). §7 says "a helpdesk" and lets the reader
   supply the name; naming one invites a rebuttal we do not control and
   dates the page.
2. **It never claims to replace external customer support.** §7 concedes
   it, and the concession is what makes the internal claim credible.
3. **No form, portal or category picker appears anywhere.** The entire
   intake claim is that none of those exist.

No section leads with agent productivity, which is where every helpdesk
vendor's page leads.

One new component, `DepartmentMap`: one intake point fanning to nine
departments with **twenty-seven example requests**. Those examples are
the section — nine labels prove nothing, and a franchisee reading
"partner terms · lease review · trademark use" recognises their own week.
Do not abbreviate to one each.

- **§6's three panels use three different devices** — a table, a ranked
  list, a two-column prescription. All three as tables makes it one long
  report. **Panel 3 is the differentiated one and is visually dominant**:
  nobody else turns a support queue into a content roadmap.
- **§6 panel 1 is never performance management.** The Legal line reframes
  the outlier as a capacity finding, which is safer and more often true.
  Do not cut it.
- **§5 keeps the precedent row** ("two similar partner promos approved in
  the last year") and **shows the SLA breach**. A perfect board is less
  credible than one with a problem on it.
- **§1's two-department routing stays.** Marketing *and* a legal check
  shows classification doing real work rather than keyword-matching.
- **§6's payoff keeps "2 raised because the terms were unusual."** Not
  every request disappears.

§6's performance table **stacks below `sm` rather than scrolling**: it
needs 560px, 375 gives it 327, and forcing the scroll grew the document
to 565px. DESIGN.md §8 prefers stacking on a narrative section anyway.

Routing: this route was **unreachable** before now, the same shadowing
that hid `/platform/workflows` — `next.config.ts` 308'd it to
`/solution/ticketing`. Reversed, and the legacy twin now points forward.
`app/solution/ticketing` is deleted; it was a second mount of the same
content.

Nav and footer: the brief said to update a Ticketing descriptor. **Neither
entry existed**, so both are adds, into Foundation.

`{{TBD:}}` tokens, four, all §8.

**Five claims flagged:** the nine departments and twenty-seven examples
matching what customers actually send; multi-department routing with one
named owner; §5's precedent attachment; §6 panel 3's prevention estimate
(if the product surfaces recurrence but not the estimate, drop the
PREVENTS column rather than approximating it); and §6 panel 1's per
department first-response, time-to-close and SLA tracking.

## /platform/compliance

Ten sections, replacing the ComingSoon stub the Workflows page created.

**Compliance is a crowded claim.** Every franchisor already owns an audit
app or a compliance module, so this page cannot win on "we check
compliance". It wins on two things and every section serves one:

1. **Compliance is a state, not a snapshot.** An audit tells you what was
   true that day; between audits nobody knows. §1, §4 and §6 carry this.
2. **The chase, not the check.** Every tool checks, almost none chase,
   and the chase is what consumes a coach's week. §2 and §5 carry it.

**Vocabulary discipline, and it is checkable.** The page is present-tense
and state-based: open, current, at risk, not current, holding, closes,
state. Audit language is retrospective and pass/fail, so "passed",
"failed", "audit score" and "compliance rate" never appear as the page's
own framing — measured on the built page, all four are zero. "Audit"
appears eight times, every one either describing a customer's existing
process (LAST AUDIT / NEXT AUDIT, "an audit tells you what was true on
the day of the audit", "audit packs" as a documentation example) or §6's
auditor reading exported evidence. **It never claims to replace an
existing compliance module.**

Band sequence, part of the spec: dark, light, light, light, dark, light,
light, light, light, dark. Light sections alternate `ed-bg`/`ed-bg-alt`,
and no two adjacent share a device.

Three new components:

- **`NetworkState`** (§1). `LIVE` in the header carries the state claim
  and gets accent treatment. **The three tiers are readable without
  colour**: each has a distinct marker shape (filled, half, hollow), its
  own type weight (500/600/700, verified on the built page) and its count
  at its own size. Colour is the third signal, not the only one.
- **`ContinuityTimeline`** (§4). **The shaded gaps are the argument** —
  three checks in a year, everything between them hatched. Do not shorten
  them for visual balance. **They are labelled `unknown`, not "risk" or
  "exposure"**: risk implies someone assessed it. No chase mechanics in
  this section; that is §5.
- **`ChaseLadder`** (§5). The escalation is an actual ladder: measured on
  the built page the day labels sit at 89 → 111 → 133 → 155 px and then
  **back to 89** for Day 24, which resolves rather than continuing the
  climb. Below `sm` the indent is dropped and the climb is carried by
  weight alone, because rungs on a phone eat the text column.

Things that must survive a copy pass:

- **§5's five stages must not compress to three.** "Still outstanding"
  repeating across three escalations is what makes it feel like four
  weeks of someone's job.
- **Day 7's detail stays** — *sent to the channel they actually use*. It
  is why the second reminder works where the email did not.
- **"Nobody on your team sent a single message" is the payoff** and has
  the heaviest treatment in the section.
- **The growth line appears once and is not elaborated.** One sentence.
- **The Workflows link is one line.** This page does not explain plays.
- **§6's `CHAIN` row stays**: it shows the trail includes the chase
  itself, which matters if a franchisor has to demonstrate they enforced
  a standard. **§6's `EXPIRES` second clause** connects back to §4.
- **§3's `READ FROM` line is that section's differentiator.** A checklist
  app makes someone confirm what the LMS already knows. Do not drop it.
- **§7 is two columns and one line.** Control Center carries governance
  depth; do not grow it into a permissions matrix.

§3's cells are hairline-topped rather than carded on purpose: cards
already carry §7, §8 and §9, and DESIGN.md §1.4 caps a form at two
appearances per page.

`{{TBD:}}` tokens, four, all §8: `compliance-proof-brand`, `-metric`,
`-quote`, `-attribution`. **Time-to-close or completion rate is the right
shape** — it proves the chase, not the check. Not a deflection metric.

**Three claims flagged for confirmation before launch:**

1. **§6 "Verified, not just received"** — that the product reads a
   certificate and matches its expiry against a requirement rather than
   accepting an upload. This is the most technically checkable claim on
   the page.
2. **§3's `READ FROM` column** — which categories are genuinely read from
   connected systems versus captured directly.
3. **§5's escalation ladder** — that owner → coach → HQ with settable day
   thresholds is configurable as shown.

Nav and footer: **Compliance was added, not repointed.** The brief said
it pointed at `/#capabilities`; there was no Compliance item at all,
because the Workflows work deliberately kept the stub out of the nav.
Always On is now Workflows and Compliance.

## /platform/workflows

Ten sections. **Vocabulary is the first thing to get right here.** The
route and the nav item stay "Workflows" because that is what a
franchisor searches for. The page's own word is **play**. One line after
the hero does the handoff, and after it the body copy says play
consistently: "Most tools call these workflows. A coach calls them
plays, and that difference is the point." Do not alternate, do not write
"workflow (play)". Measured on the built page: `workflow` appears once
in the body, in that line. The other four hits are the
`{{TBD:workflows-proof-*}}` token names and go when real proof lands.
`play` appears 17 times.

**What the page has to prove: a play is not a broadcast.** The same play
reaches forty locations and behaves differently at each because it reads
each location's numbers first. §5 is where that is proven and it carries
the strongest treatment on the page.

**The divergence is the argument, in two places.** §1's four chips and
§5's four rows each show one act, one decline, one adapt, one escalate.
Make them uniform and the product becomes mass email. **§5's rows 2 and
4 must not be cut for length** — a play that declines because a region
set its own threshold, and one that escalates rather than acting because
the owner is six weeks in, are what prove judgment rather than logic.

Band sequence, part of the spec: dark, light, light, light, dark, light,
light, light, light, dark. Light sections alternate `ed-bg`/`ed-bg-alt`,
and no two adjacent share a device: prose, split panels, trigger grid,
divergence rows, two-column comparison, accumulation timeline.

**No builder UI anywhere.** No canvas, no node graph, no if-then blocks,
no drag handles, not even as decoration. §3's right panel is a summary
of what the system understood, **not an editor**: no fields, no toggles,
no edit affordances. The `canvas` / `node` / `if-then` strings that do
appear are all denials in the brief's own copy.

Details that carry an argument:

- **§4 lists Schedule first and then dismisses it.** Every tool a
  franchisor has already evaluated is schedule-based, so leading with it
  and demoting it in the closing line is the positioning move. **Drift
  carries the accent** because it is the differentiated trigger: a
  threshold needs someone to know what to watch, drift does not.
- **No per-location examples in §4.** That is §5, and putting one there
  collapses the section the page rests on.
- **§3's AUTHOR row stays.** A play having a named author is what makes
  a coach willing to write a second one.
- **§6 is two columns and one line.** Control Center carries governance
  depth; this page is capability. Do not grow it into a permissions
  matrix.
- **§7's counts are illustrative** and labelled as such.

### Routing changed here, and it mattered

`/platform/workflows` was **unreachable** before this: `next.config.ts`
308'd it to `/solution/agents` while a real page sat behind it, so the
nav, the footer and the Reporting and Apps Related cards all landed on
the legacy Agents page. That redirect is gone.

- `/platform/automations` now 301s here; its route and its ComingSoon
  stub are deleted, and §4's trigger grid is what absorbed it.
- `/solution/agents` was a second mount of the same legacy
  `WorkflowsContent` and went with it. It and `/solution/workflows` now
  both point forward at `/platform/workflows` rather than at each other.
- **The sitemap was listing four redirected URLs** (`/platform`,
  `/platform/ai-agent`, `/platform/ticketing`, `/platform/insights`)
  plus `/solution/agents`, and was missing every page built since. It
  now lists only routes that render. Check `next.config.ts` before
  adding another.

Nav: Automations is gone, so **Always On is a one-item group**. The
brief allows adding Compliance "if it exists" — it does not, and the
stub created here for §9's card is a ComingSoon page. A stub in the nav
is what the Automations entry was already doing wrong.

Stub created: `/platform/compliance`, `noindex`, deliberately not in the
nav.

`{{TBD:}}` tokens, four, all §8: `workflows-proof-brand`, `-metric`,
`-quote`, `-attribution`. **This page needs an outcome, not an
efficiency stat** — a play count proves activity, a play count plus what
changed proves the growth claim. Not a deflection metric; that argues
for Answers.

**TODO: the §10 CTA subline promises two things on a sales call** —
writing the play live, and showing what it would have done at four of
the prospect's own locations. Confirm both are deliverable or soften it
before launch.

## /platform/apps

Nine sections. **This page is capability, not governance.** An earlier
draft of its brief led with permissions tables and a wall of "no app
can", which read as a page apologising for itself. Governance is stated
exactly twice, one line each: step 4 of §3 ("Already inside the rules
you set. Nothing to configure.") and the 13px line beneath that
timeline. There is deliberately no permissions section, no can/can't
table, no publishing-rights matrix, no guardrails band. **If the page
looks like it is missing a governance section, that is the design.**
Measured on the built page: "permission" appears once, "approval" once,
"guardrail" not at all.

Band sequence, part of the spec: dark, light, light, light, light, dark,
light, light, dark. The four light sections alternate `ed-bg` and
`ed-bg-alt` so neighbours still separate (DESIGN.md §4.1), and no two
adjacent sections share a device: request log, timeline, gallery grid,
three bare facts.

**No builder UI anywhere**, including as decoration. No nodes, no
canvas, no drag handles. A sentence typed in plain language is the whole
claim; a reader who infers an interface to learn has read the opposite.
That is why `DescribePanel`'s left side is a bare bordered box.

Details that carry an argument and must not be tidied:

- **§2's dates are the artifact.** A request from March 2023 still
  marked Open is the point. Do not convert them to relative labels.
- **§3's timestamps are irregular** — 3:45, 3:47, 3:52, 3:58, 4:05.
  Even five-minute intervals read as a diagram rather than as twenty
  real minutes.
- **§4's scopes vary on purpose** (214 locations, All locations, 68,
  140, Northern region, West territory). Normalising them would argue
  these are features rather than things a particular brand needed.
- **§6's return arc is the section.** Four stages in a row is a
  pipeline, and a pipeline happens once. Stage 2 must stay: HQ is
  publishing something with two weeks of evidence. "Store #214 is still
  the author" must stay: it is what makes an operator build a second
  one. The closing line's order is fixed, upside before control;
  reversed it reads as risk management.

The closing-audit sentence in §1, the twenty minutes in §3 and Store
#214 in §6 are one story, and the same one the homepage's on-demand
section already tells at 3:45pm. **Deliberate callback, not repetition**
(DESIGN.md §1.4). Do not renumber the store or reword the ask in one
place only.

`{{TBD:}}` tokens, four, all §7: `apps-proof-brand`, `-metric`,
`-quote`, `-attribution`. **Do not substitute a deflection or support
metric** — those argue for the Answers page.

**TODO: the §9 CTA subline promises a live build on a sales call**
("We'll build it on the call"). The brief flagged it for confirmation
that it is deliverable. If it is not, it needs a softer replacement
before launch.

**The homepage tile link is not what the brief assumed.** Item 3 said to
repoint the third on-demand tile's link at `/platform/apps`. Those tiles
are `role="tab"` buttons that swap the stage and have never had a link,
so there was nothing to repoint; a "How apps get built" link was added
beneath the rail, shown only on that tab. The tile's own copy is
untouched, and that is the only homepage change in this work.

## /platform/reporting

Twelve sections, built from the reporting brief. Two things are
load-bearing and must survive a copy pass.

**The band sequence is the spec, not styling:** dark, dark, light, light,
dark, light, light, light, light, light, light, dark. The other Platform
pages run white card grid into white card grid and read as monotonous;
this one alternates deliberately. **§3, §6 and §7 use no cards at all** —
a spectrum bar and plain text, a timeline spine, and four nested
containers. Convert any of them to a card grid and the rhythm is gone.
Verified on the built page in that exact order.

**No two adjacent sections share a layout device.** §4 is one card
holding four sub-cards, not four cards, because its header says "one
dataset" and four separate cards would argue four datasets.

Three deliberate deviations, all noted at the top of `ReportingContent.tsx`:

1. **The hero is photographic on `HERO_BG.haze2`**, not the flat gradient
   the brief describes. Requested directly. Scrim is `SCRIM.heroSubPage`
   (0.45), not the variant's own 0.36: that baseline was measured for
   white body copy alone and this band also carries a mono query bar and
   a 10.5px caption.
2. **§9 is light.** The brief contradicts itself — its rhythm table and
   its verify step both say LIGHT, its section body says reuse the
   governance band, which is dark. The rhythm table wins because the
   brief names it as the spec twice. The four-column label/value *form*
   is kept per DESIGN.md §1.1; only the surface changed, so
   `GovernanceBand` is untouched.
3. **Three dark moments where DESIGN.md §4.1 allows two**, and the first
   two adjacent. That is the brief's rhythm. §2 carries no photograph and
   no second scrim, so the opening reads as one extended dark region
   rather than two bands.

**`OverlapChart`'s widths are the argument and must not be normalised.**
Most locations have capacity, most have a lapsed list, only a few have
both. The "Both" bar arriving visibly shorter than the two above it is
the whole section. Measured on the built page: 107 vs 243/180, 73 vs
222/152, 59 vs 201/163, 28 vs 146/125. Card 4 is amber because it is the
one diagnostic question among three opportunities.

**`LiveQueryBar` holds the previous answer while the next question
types.** The brief's beat is "clear, next state", which read literally
leaves a 168px box empty for ~2.5s of every ~5.5s cycle — half the loop
showing nothing, which reads as broken. The outgoing render stays at 34%
opacity instead. First paint is state 1 complete, which also gives the
reduced-motion case for free: with the effect disabled, what is on
screen is already the static state the brief asks for.

The three renders are a discriminated union, not one chart with a data
prop, **because the shapes must differ** — bars, then a line, then
exception rows. Three bar charts would prove nothing.

`{{TBD:}}` tokens, four, all in §10 and all needing a real customer:
`reporting-proof-brand`, `-metric`, `-quote`, `-attribution`. **Do not
substitute a deflection metric** — deflection is a support number and
argues for the Answers page. The brand token deliberately does not use
`<Meta>`, which force-uppercases and would render the token as
`{{TBD:REPORTING-PROOF-BRAND}}`.

Stub created: `/platform/control-center`, `noindex`, `ComingSoon`. §7,
§9 and the related block all link to it. **The nav still points Control
Center at `/#trust`** — the brief authorised the stub but forbade
restructuring the nav, so the two disagree on purpose. Repoint the nav
when that page is real.

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


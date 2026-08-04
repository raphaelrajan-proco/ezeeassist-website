# Homepage mobile and tablet audit

> **Status.** The foundation pass has landed: nav breakpoint, type floor,
> tap targets and the regression guard. See "Foundation pass" at the
> bottom for what moved, what the overflow sweep found, and what is
> still open. The section-by-section verdicts below are unchanged and
> none of the sections have been re-rendered yet.

Captured with `npm run shots` against the production build at 390, 430, 768,
1024, 1205 and 1440. Raw data in `screenshots/audit.json`, images in
`screenshots/<width>/`. Both are gitignored; re-run the harness to reproduce.

Verdict vocabulary: **Reflow** = CSS-level layout change, same markup.
**Re-render** = a different composition below a breakpoint. **Reduce** = ship
less at small widths. **Replace** = the visual itself is wrong for a phone.

---

## The three reported issues

**1. Nav CTA clipping and wrapping between ~768 and ~1150 — CONFIRMED, and
worse than reported.**

The desktop nav switches on at `md:` (768px) but does not fit until roughly
1100px. Measured right edge and height of the header "Speak to an expert":

| Width | CTA height | CTA right edge | Past viewport | Clickable |
|---|---|---|---|---|
| 768 | 76px | 916px | yes, by 148px | **no** |
| 900 | 76px | 916px | yes, by 16px | yes |
| 1024 | 56px | 975px | no | yes |
| 1100 | 40px | 1051px | no | yes |
| 1205 | 40px | 1156px | no | yes |

At 768 the primary conversion CTA is off-screen and cannot be clicked, and
"Company" is visibly clipped mid-chevron. From 900 to 1099 the button is
present but wrapping to three or four lines at 56–76px tall against a 40px
design. The whole tablet range is affected.

**2. Scroll-driven animations not running on phone widths — SPLIT.**

*Making an Impact: refuted.* At 390 the bars draw and the counters hold their
final values. The section renders correctly; its problem is sizing, not motion.

*Always On: confirmed in effect, but it is a deliberate fallback, not a
failure.* `useIsDesktop` gates the pinned scroller to `lg` and above. Below
that the section renders every card in one column: 16 cards, 2,836px tall
against 1,536px at 1205. Nothing is broken and nothing is missing, but the
argument the section exists to make — a day unfolding while nobody watches —
is gone, replaced by a long undifferentiated list.

**3. On Demand tab strip overflowing right with no scroll affordance —
CONFIRMED.**

The rail is `flex-row lg:flex-col overflow-x-auto`, so it does scroll. At 390
its three tabs total 1,703px in a 342px box. Tab one is cut mid-sentence at
"Cited from your approved s…", tabs two and three are entirely off-screen, and
there is no fade, arrow, dot or peek to suggest more exists. At 768 two of
three are off-screen. These are full description cards, not compact tabs, so
even with an affordance a user would be swiping blind through 560px cards.

---

## Cross-cutting flags

**Horizontal overflow — none, but that reading is misleading.** No width
produces a horizontal scrollbar. `.theme-editorial` sets `overflow-x: clip`,
so content wider than the viewport is silently cut instead. Two places lose
content that way:

- `#the-system` at 390: the section container reports 500px of content in a
  390px box, and the subhead 476px of content in a 342px box. Same pattern at
  768.
- `#capabilities`: the tab strip, above.

The hero logo marquee and the OS integration marquee also exceed the viewport,
by 6,045px and 2,018px, but those are masked marquees behaving as designed.

**Tap targets under 44px — 16 at 390, 20 at 768, 22 at 1205.** The 44px figure
is the iOS guideline; WCAG 2.2 AA is 24px, and several of these fail that too.

| Element | Size | Where |
|---|---|---|
| Mobile menu button | 38×38 | Nav |
| "Ask ChatGPT" / "Ask Claude" / "Ask Perplexity" | 34px tall | Footer |
| Close button | 34×34 | Footer |
| `sales@ezeeassist.com` | 28px tall | Footer |
| Phone number, social links | 24px tall | Footer |
| Privacy Policy / Terms / Accessibility | **20px tall** | Footer |
| "See more workflows" / "Generate your own" | 40px tall | Always On |

**Author-set fixed widths ≥200px — 9, every one in `#the-system`:** 1210, 380,
300 ×3, 256, 210, 208 ×2. These are why that section cannot simply reflow.

**SVGs missing a viewBox — none. Refuted.** Every SVG on the page scales.

**Text under 14px — 177 nodes at 390, of which 113 are under 12px.** By
section: `#the-system` 52 (9–11.5px), `#the-week` 43 (9.5–13px), `#always-on`
33 (11.5–13.5px), `#proof` 16, `#capabilities` 9, `#trust` 5, chrome 10.
Smallest offenders: the hero eyebrow at **8.4px**, "NOTHING MIGRATES" at 9px,
the coach's-week eyebrows at 9.5px, the trust strip at 9.7px, footer column
headings at 10px. Much of this is deliberate mono metadata, but 8.4–10px is
below what holds up on a phone in daylight.

---

## Section by section

| Section | What breaks at 390 | What breaks at 768 | Verdict | Why |
|---|---|---|---|---|
| **Nav** | Menu button 38×38, under both the 44px and 24px bars | Desktop nav switches on with no room: "Company" clipped, CTA off-screen at 916px in a 768 viewport and not clickable | **Reflow** | The content and the markup are right; the breakpoint is wrong. Hold the mobile sheet until the desktop row actually fits, around `xl`, or drop a bucket between 768 and 1100. No new composition needed. |
| **01 Hero** | Eyebrow renders at 8.4px, the smallest text on the page | Mock stacks under the copy but keeps its desktop frame height, leaving a tall empty region above the conversation, which is bottom-anchored | **Reduce** | Two-column → one-column already works. The frame is sized for a 46%-width column and should shorten, and the eyebrow should step up, below `lg`. |
| **02 Coach's week** | 43 nodes under 14px, eyebrows at 9.5px | Holds | **Reflow** | Bars, hexagons and pillars all reflow correctly; the hexagon labels were already sized against rendered scale. Type only. |
| **03 The system** | 500px of content in a 390px box and 476px in a 342px subhead, both silently clipped. Nine fixed widths up to 1210px. 52 nodes under 14px, some at 9px | Same clipping | **Re-render** | This is fixed-geometry diagram, not a layout that squeezes. A 1210px internal composition cannot be reflowed by CSS; the phone needs its own arrangement of the same argument. |
| **04 On demand** | Tab rail 1,703px in 342px: one tab cut mid-sentence, two off-screen, no affordance | Two of three off-screen | **Replace** | A horizontal rail of 560px description cards is the wrong control for a thumb. An affordance alone still leaves the user swiping blind. Needs a phone-native selector. |
| **05 Always on** | Pinned scroller gated off; 16 cards in a 2,836px stack with no narrative device. CTAs 40px | Same | **Re-render** | The fallback keeps every card and loses the point. A phone version has to carry "a day unfolding" some other way rather than printing the whole list. |
| **06 Making an impact** | Animations run correctly. Four cards at `min-h-[195px]` with `justify-between` leave large dead gaps; headline strands "proven AI" on its own line | 2-up grid holds | **Reduce** | Layout and motion are both fine. The min-height and the two-span headline are desktop-derived and should relax below `sm`. |
| **07 Trust and control** | 5 nodes at 11.5px | Holds | **Reflow** | Type only. |
| **08 Proof** | Sticky deck correctly falls back to a static stack. Four decorative haze layers overflow by 43px and are clipped. 16 nodes under 14px | Haze overflows by 85px | **Reflow** | The fallback is sound. Clamp the decorative absolutes to their card and lift the smallest type. |
| **09 Objections** | Nothing found. Accordion rows clear 44px | Holds | **Pass** | No change needed. |
| **10 Final CTA** | Nothing found | Holds | **Pass** | No change needed. |
| **Footer** | Six link groups between 20px and 28px tall; three "Ask …" chips at 34px; a 34×34 close button | Same | **Reflow** | Padding and line-height only. The 20px legal links fail even the 24px AA floor. |

---

## Suggested order

1. **Nav.** It is the only finding that costs conversions outright, and it
   affects every page on the site, not just the homepage. — **done**
2. **On demand** and **The system**, the two that lose content.
3. **Always on**, the largest piece of work and the one that needs a design
   decision before code.
4. **Footer tap targets** and the page-wide type floor, both mechanical.
   — **done**
5. **Impact**, **proof**, **hero**, cosmetic.

---

# Foundation pass

One commit. No section re-renders. Nav and type tokens are site-wide by
nature; everything else is homepage-scoped.

## 1. Nav breakpoint

A custom Tailwind breakpoint, `--breakpoint-nav: 1120px`, now drives the
mobile-sheet / desktop-row switch. It sorts between `lg` and `xl`, so
both keep their meanings. `xl` was rejected because 1205 is the review
viewport and must show the desktop nav. Only the five structural classes
moved; the pill's own padding, radius and logo height stay on `md:`,
which is what keeps the pill and the sheet the same width through the
new range.

| Width | Before | After |
|---|---|---|
| 768 | desktop row, CTA right edge 916px in a 768px viewport (**+148 past, unclickable**), "Company" clipped mid-chevron, CTA 76px tall | sheet, burger 44×44 |
| 900 | desktop row, CTA 916px (**+16 past**), 76px tall | sheet, burger 44×44 |
| 1024 | desktop row fits but CTA wraps to two lines, 56px against a 40px design | sheet, burger 44×44 |
| 1100 | desktop row, CTA 1051px, 40px — first clean width | sheet, burger 44×44 |
| 1119 | desktop row, 40px | sheet, burger 44×44 |
| 1120 | desktop row, 40px | desktop row, CTA 1071px, 40px |
| 1205 | desktop row, CTA 1156px, 40px | unchanged |
| 1440 | desktop row, CTA 1295px, 40px | unchanged |

Note 1100–1119 traded a working desktop row for the sheet. That is the
cost of the 20px of headroom in the 1120 figure; the row's first clean
width is 1100 with zero slack.

## 2. Type floor

**There was no type token to change.** Every small size on the site is
either a Tailwind arbitrary utility (`text-[10px]`, 161 occurrences
across 30 files) or a React inline `fontSize` (47 declarations across 14
files). The 177 figure in the original audit was an undercount: a
stricter walk finds **289 sub-14px nodes at 390**, though only ~200
distinct source declarations — the rendered count is dominated by
`.map()`, with 100 of them coming from a single `fontSize: 10` in
TheSystem.

So the floor is enforced in one place, `app/globals.css`, over the
declarations that already exist. Two tokens:
`--ed-type-floor: 12px` and `--ed-type-floor-eyebrow: 13px`.

| Mechanism | Covers | Nodes fixed at 390 | Nodes fixed at 1205 |
|---|---|---|---|
| Utility override, plain specificity (0,2,0 vs Tailwind's 0,1,0), 8 sizes from `text-[8px]` to `text-[11.5px]` | 161 source occurrences, 30 files | 26 | 27 |
| Inline attribute match + `!important`, 6 values from `9px` to `11.5px`, both spellings | 47 source declarations, 14 files | 195 | 195 |
| `max(var(--ed-type-floor-eyebrow), …)` at the call site | Hero eyebrow | 1 (8.4px → 13px) | 1 (10.5px → 13px) |
| `max(var(--ed-type-floor), …)` at the call site | Hero sub-lead, TrustStrip line, Hero trusted-by line | 3 | 1 |
| **Total** | | **225** | **224** |

The 1205 column is smaller only because the hero sub-lead's clamp has
already grown past 12px by then; the floor binds it below ~406px.

Measured after: **0 nodes under 12px at 390, 1205 or 1440.**

Three details worth knowing before touching this:

- **Utilities are beaten by specificity, inline styles need
  `!important`.** Nothing outranks a style attribute. The match includes
  the `px` unit so `font-size:11px` cannot catch `font-size:11.5px`.
- **Both spellings of each value are listed.** The style attribute is
  not serialised consistently: Always On's pinned scroller emits
  `font-size: 11.5px` with a space where every other call site emits it
  without. Matching only the unspaced form left 16 nodes at 11.5px above
  `lg` — caught on the verification pass, not the first write.
- **SVG is excluded.** Font sizes inside a viewBox are user units, not
  pixels; clamping them resizes artwork rather than text.

The utility override is safe only because no sub-12px utility on the
site has a responsive step-up — the sole responsive size variant under
14px is `md:text-[13.5px]`, already above the floor. Adding
`text-[10px] md:text-[14px]` later would silently lose the `md:` step.

**Visible consequences, both intended:** the hero eyebrow's clamp tops
out at 10.5px, under the 13px floor, so it is now a flat 13px at every
width and wraps to two lines below ~430. The TrustStrip line does the
same at 12px. Both were previously the smallest text on the page (8.4px
and 9.7px at 390).

## 3. Tap targets

Padding and line-height only; no type changed.

| Element | Before | After |
|---|---|---|
| Nav menu button | 38×38 | 44×44 |
| Footer "Ask ChatGPT / Claude / Perplexity" | 34px tall | 44px |
| Footer subscribe button | 34×34 | 44×44 |
| Footer column links (30 of them) | 17px tall | 24px |
| Footer legal links | 20px tall | 24px |
| Phone, social links | 24px | unchanged, already at the floor |

Measured after: **0 interactive targets under 24px** at 390 or 1205.
Still under 44px and deliberately left alone: nav dropdown triggers
(36px), the theme toggle (36px), the two Always On CTAs (40px), the
header CTA (40px). All clear the 24px AA floor.

## 4. Overflow sweep

Run with `.theme-editorial { overflow-x: visible }`, all six widths,
then reverted to `clip`. Tool kept at `scripts/overflow-sweep.mjs`.

Two classes of false positive were removed first: `sr-only` paragraphs,
which are 1×1 clipped boxes whose `scrollWidth` is the whole paragraph
(this is what the original audit's "`#the-system` reports 500px" line
partly measured — the 500px figure is real, but the first sweep found it
for the wrong reason), and anything under a CSS mask.

| Section | Element | 390 | 430 | 768 | 1024 | 1205 | 1440 |
|---|---|---|---|---|---|---|---|
| `#capabilities` | tab rail, own scroll | +1361 | +1321 | +1031 | — | — | — |
| `#capabilities` | tab card 1 past right edge | +293 | +253 | — | — | — | — |
| `#capabilities` | tab card 2 | +851 | +811 | +497 | — | — | — |
| `#capabilities` | tab card 3 | +1337 | +1297 | +983 | — | — | — |
| `#capabilities` | showcase panel | — | — | — | +50 | — | — |
| `#the-system` | section content vs viewport | +110 | +70 | — | — | — | — |
| `#the-system` | subhead in its column | +134 | +94 | — | — | — | — |
| `#proof` | deck card grid, both edges | ±43 | ±51 | ±85 | — | — | — |
| `#proof` | inner card grid ×4 | +68 | +76 | +134 | +48 | +48 | +48 |
| nav | closed mega-menu panels | — | — | — | — | — | +40…+626 |

Reading it:

- **`#capabilities` is the biggest leak by an order of magnitude** and
  the only one where content is unreachable rather than just cropped.
  Confirms the Replace verdict.
- **`#the-system` is a real leak**, 500px of content in a 390px box,
  gone by 768. Confirms Re-render.
- **`#proof`'s ±43/51/85 is decorative** — the deck grid is centred and
  overhangs both edges symmetrically, which is the haze the original
  audit flagged. Cheap to clamp.
- **`#proof`'s inner +48 persists at every width including 1440**, so it
  is not a mobile issue at all. It sits inside a
  `rounded-2xl overflow-hidden` ancestor, so it is clipped by its own
  card rather than by the theme, and is the one finding here that is new
  rather than a confirmation.
- **The nav panels are why `overflow-x: clip` exists.** They are closed
  mega-menus measured in place. Not a leak.

Everything else on the page is clean at all six widths.

## 5. Regression guard

`npm run shots` now exits non-zero on three hard rules, on top of the
advisory findings it already reported:

- no `main section` whose `scrollWidth` exceeds the viewport
- no interactive target under 24px in either dimension
- no rendered text under 12px

The tap-target rule is 24, not the 44 used by the advisory check: 44 is
the iOS guideline and plenty of legitimate controls sit under it, 24 is
the WCAG 2.2 AA floor and nothing should. The known masked marquees are
excluded by class; SVG text is exempt from the type rule.

Verified in both directions: exit 0 on the current tree, exit 1 with a
seeded failure. `SHOTS_NO_FAIL=1` captures images without the exit.

**One allowlist entry**, in `KNOWN` at the bottom of `scripts/shots.mjs`:
`section#the-system` overflow at 390 and 430, already triaged as
Re-render and deliberately untouched by this pass. It is still printed
on every run. **Delete the entry when that section lands** — an
allowlist that outlives its fix turns the guard back into decoration.

## Still open

- On demand (Replace), The system (Re-render), Always on (Re-render) —
  the three that need design decisions.
- `#proof`'s +48 inner grid at every width, and its decorative
  ±43/51/85 haze overhang.
- Hero mock frame height at 768, Impact `min-h-[195px]` at 390.

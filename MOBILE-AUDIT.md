# Homepage mobile and tablet audit

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
   affects every page on the site, not just the homepage.
2. **On demand** and **The system**, the two that lose content.
3. **Always on**, the largest piece of work and the one that needs a design
   decision before code.
4. **Footer tap targets** and the page-wide type floor, both mechanical.
5. **Impact**, **proof**, **hero**, cosmetic.

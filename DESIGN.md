# Design standards

The homepage is the reference implementation. Every new or rebuilt page follows
this document. Where a rule and the homepage disagree, the homepage is right and
this file is stale — fix the file.

## Status: two design systems exist

| System | Where it is used | What to do |
|---|---|---|
| **Editorial** (`.theme-editorial`) | `/`, `/speak-to-an-expert`, `/solutions/coaches` | The standard. Build every new page here. |
| Legacy (raw Tailwind, hardcoded `#00AEEF` / `#0A0A0A` / `#F0F0F0`) | the other ~31 routes | Migrate when a page is next touched. Do not extend. |

Legacy pages are recognisable by hardcoded hex classes like
`text-[#0A0A0A] dark:text-[#F0F0F0]` and `border-[#E5E7EB] dark:border-white/[0.08]`.
Those are the editorial tokens written the long way; the migration is mostly a
find-and-replace to the variables below, plus the type scale.

## Turning the system on

Wrap the page's root element in `theme-editorial`. Nothing inside the class works
without it: every utility below is scoped to `.theme-editorial ...` so it cannot
leak onto legacy pages.

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

`Navbar` and `Footer` are shared across both systems. Do not restyle them for one
page.

## Tokens

Defined in `app/globals.css` under `.theme-editorial` with a dark-mode block. Use
the variable, never the hex, so dark mode follows for free.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ed-bg` | `#FFFFFF` | `#0A0A0A` | Default section background |
| `--ed-bg-alt` | `#F4F4F5` | `#141414` | Alternating band, to separate adjacent sections |
| `--ed-fg` | `#0A0A0A` | `#F5EDE0` | Headings and body |
| `--ed-fg-muted` | `#52525B` | `#A89B86` | Supporting copy, captions, labels |
| `--ed-border` | `#E5E7EB` | `#2A2A2A` | Card and panel borders |
| `--ed-rule` | `#E5E7EB` | `rgba(245,237,224,0.14)` | Hairline dividers inside a section |
| `--ed-card` | `#FFFFFF` | `#141414` | Card surface |
| `--ed-card-alt` | `#F4F4F5` | `#1F1F1F` | Nested or secondary card surface |
| `--ed-accent` | `#00AEEF` | `#00AEEF` | Brand blue. Marks and rules only, sparingly |
| `--ed-accent-text` | `#0077A8` | `#00AEEF` | Accent text and eyebrows. **Never `--ed-accent` for text on white** |

Convenience classes: `ed-bg`, `ed-bg-alt`, `ed-card`, `ed-card-alt`, `ed-fg`,
`ed-fg-muted`, `ed-border`, `ed-rule`, `ed-accent`, `ed-accent-bg`, `ed-overline`,
`ed-link`.

### Contrast rules that are not negotiable

- **Accent text on a white or light surface is `#0077A8`**, not `#00AEEF`.
  `#00AEEF` measures 2.27:1 on white and fails at every size.
- **An accent fill carrying white text is `#0077A8`-family** (4.99:1). A
  `#00AEEF` fill under white text measures 2.07:1 and fails.
- **On the hero photograph** (`/hero-bg.jpg` plus scrim) the safe accent is
  `#9FE0F8` and body copy is `#FFFFFF` or `rgba(245,237,224,0.92)`. The dark
  tokens do not apply there; that band is dark in both themes.

## Type

Headings use `var(--font-editorial)` (Plus Jakarta Sans). Body uses Inter, which
`.theme-editorial` sets as the default `font-family`, so body copy needs no
declaration. `h1`–`h6` inside the theme pick up the editorial face automatically.

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Page H1 | `clamp(1.75rem, 0.5rem + 4.2vw, 3.5rem)` | 700 | `-0.03em` | 1.05 |
| Section H2 | `clamp(2rem, 1.1rem + 1.9vw, 3rem)` | 500 | `-0.03em` | 1.05 |
| Section lead-in / large statement | `clamp(1.25rem, 0.25rem + 2vw, 2rem)` | 500 | `-0.02em` | 1.25 |
| Card title | `1.125rem`–`1.25rem` | 500 | `-0.02em` | 1.25 |
| Body | `1rem`–`1.125rem` | 400 | normal | 1.6 |
| Supporting / caption | `0.875rem`–`0.9375rem` | 400 | normal | 1.55 |
| Eyebrow | `0.75rem` | 500 | `0.2em`, uppercase | — |
| Mono data (IDs, figures) | `0.75rem`–`0.875rem` | 500 | `-0.01em` | — |

Fluid `clamp()` is the norm for anything above body size. Set the ceiling so the
line does not break where a break would read badly, and say so in a comment.

Numerals in tables, briefs, and counters use `fontVariantNumeric: "tabular-nums"`
so they do not jitter.

Use `SectionHeadline` from `components/growth/shared.tsx` for H2s rather than
re-deriving the scale.

## Layout and rhythm

```tsx
<section className="w-full scroll-mt-24 ed-bg">
  <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
```

`SectionShell` in `shared.tsx` renders exactly this and takes `alt` and `id`.
Prefer it.

- Container: `max-w-7xl`, gutters `px-6 / md:px-12 / lg:px-16`.
- Vertical rhythm: `py-14 / md:py-16 / lg:py-20`. Dark or photographic bands run
  longer, `py-20 / md:py-24`.
- Measure: prose caps at `max-w-3xl`; headlines at `max-w-4xl`.
- Alternate `ed-bg` and `ed-bg-alt` between neighbouring sections so the page
  reads as bands. Two `ed-bg` sections in a row need another separator.
- `scroll-mt-24` on any section with an `id`, or the sticky nav covers its
  heading when linked.

## Cards and product mockups

Every product mockup uses `MOCK_SURFACE` from `shared.tsx`: white, 1px border,
14px radius, two-layer shadow. Mockups are light in both themes, because they
depict a product UI rather than the page.

Content cards use `ed-card` with `1px solid var(--ed-border)` and a 12–16px
radius. No flat borderless boxes, no drop shadows heavier than the mockup's.

## Buttons

| Class | Use |
|---|---|
| `ed-btn ed-btn-primary` | Primary action on a light background |
| `ed-btn ed-btn-secondary` | Secondary on a light background |
| `ed-btn ed-btn-secondary-dark` | Secondary on a dark or photographic band |
| `ed-btn ed-btn-arrow` + `ed-btn-arrow-badge` | The lead CTA, with its arrow badge |

On the hero photograph the primary CTA is a **white fill with near-black text**.
A blue fill fails contrast there in both directions.

Every primary CTA points at `/speak-to-an-expert`.

## Motion

- One entrance per element: `initial={{ opacity: 0, y: 20 }}` →
  `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`.
- Easing is `[0.22, 1, 0.36, 1]` everywhere. Duration 0.7–0.85s for sections,
  0.5–0.6s for cards, `delay: index * 0.09` for staggered grids.
- `prefers-reduced-motion` renders the **final state**, never a blank one. Counters
  server-render their final value so there is no flash of zero.
- Scroll-driven effects (pinning, tickers) are homepage-only. A sub-page does not
  need them.

## Icons and imagery

Lucide only, no emoji, `strokeWidth` 1.75–2.25. Every logo is a committed local
file under `public/logos/`; never reference a CDN. Photographs go through
`next/image` with an explicit `sizes`.

## Copy

- No em-dashes. Use `·`, commas, or a full stop.
- No anaphora, no "not X, it's Y" antithesis, no filler verbs.
- Plain declarative sentences. One aphoristic fragment per page at most.
- Never invent a figure. Anything unsourced ships as a visible `{{TBD:key}}`
  token or a `TODO:` comment, not a plausible-looking number.
- Network-scale figures read from `lib/data/network-scale.ts`.

## Accessibility

- Interactive elements are `<button>` or `<a>`, never a `div` with `onClick`.
- Icon-only controls carry `aria-label`; decorative art carries `aria-hidden`.
- State shown by colour is also shown by weight, shape, or a label.
- Visible focus is never removed.

## Checklist before shipping a page

1. Root wrapped in `theme-editorial`.
2. No hardcoded `#0A0A0A` / `#F0F0F0` / `#52525B` where a token exists.
3. Accent text is `--ed-accent-text`; accent fills under white text are `#0077A8`.
4. Both themes checked. Reduced motion checked.
5. Widths: 1205 (the review viewport) first, then 1440, 1280, 1024, 390.
6. `grep -rn "{{TBD:"` returns only intentional tokens.
7. No dead links.

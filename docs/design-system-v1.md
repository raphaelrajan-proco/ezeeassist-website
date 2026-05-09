# Design System v1 — Bright SaaS (pre-editorial pass)

This document is the **rollback reference** for the design system that was live on
`main` before the `design-editorial-pass` branch began. To return to it instantly:

```
git checkout design-v1-bright-saas    # snapshot tag
# or
git checkout main                     # production main is left untouched
```

---

## Color palette

### Brand tokens (defined in `app/globals.css` `@theme inline`)

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-blue` | `#00AEEF` | Primary brand color — CTA, accents, links |
| `--color-brand-navy` | `#0A0A0A` | Near-black foreground in light mode |
| `--color-brand-white` | `#FFFFFF` | Pure white surfaces |
| `--color-brand-grey` | `#F7F8FA` | Light section background |
| `--color-brand-border` | `#E5E7EB` | Default border color |

### Light mode

- Body background: `#FFFFFF`
- Body text: `#0A0A0A`
- Section alt background: `#F7F8FA`
- Card background: `#FFFFFF`
- Card border: `#E5E7EB`
- Muted text: `text-gray-600` (`#4B5563`) / `text-gray-500` (`#6B7280`)
- Faint text: `text-gray-400` (`#9CA3AF`)

### Dark mode

- Body background: `#0B0F19`
- Body text: `#F0F0F0`
- Section alt background: `#111827` / `#161616`
- Card background: `#161616` / `#0D0D0D`
- Card border: `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.12)`
- Muted text: `text-gray-400` / `text-gray-500`

### Section gradient utilities

- `.bg-hero-gradient` — soft blue-tinted radial in light, deep navy in dark
- `.bg-how-it-works-gradient` — `#F7F8FA → #FFFFFF` (light) / `#111827 → #0B0F19` (dark)
- `.bg-final-cta-gradient` — white → blue tint (light) / navy gradient (dark)
- `.bg-gated-popup-gradient` — gated/CTA background

### Accent colors used in cards (categorical)

| Usage | Hex | Background tint |
|---|---|---|
| Knowledge / primary blue | `#00AEEF` | `rgba(0,174,239,0.08)` |
| Communication / purple | `#7C3AED` | `rgba(124,58,237,0.08)` |
| File storage / green | `#059669` | `rgba(5,150,105,0.08)` |
| Collaboration / amber | `#D97706` | `rgba(217,119,6,0.08)` |
| Learning / pink | `#DB2777` | `rgba(219,39,119,0.08)` |
| CRM / blue | `#2563EB` | `rgba(37,99,235,0.08)` |
| Automation / red | `#DC2626` | `rgba(220,38,38,0.08)` |
| Other / grey | `#6B7280` | `rgba(107,114,128,0.08)` |

---

## Typography

### Font families (loaded via `next/font/google` in `app/layout.tsx`)

- **Body / `--font-inter`** — Inter, weights 400/500/600/700
- **Display / `--font-jakarta`** — Plus Jakarta Sans, weights 400/500/600/700/800

`h1`–`h6` use Plus Jakarta Sans by default via `globals.css`.

### Typography scale (current — pre-editorial)

| Level | Sizes | Weight | Letter spacing |
|---|---|---|---|
| Hero h1 | `text-5xl sm:text-6xl lg:text-7xl` | `font-extrabold` (800) | `-0.02em` |
| Section h2 | `text-4xl sm:text-5xl` | `font-extrabold` (800) | `-0.02em` |
| Section h2 (alt) | `text-3xl sm:text-4xl` | `font-bold` (700) | `-0.02em` |
| Card h3 | `text-xl` / `text-2xl` | `font-bold` (700) | `-0.01em` |
| Sub-card h3 | `text-base` / `text-lg` | `font-bold` (700) | — |
| Overlines | `text-xs` uppercase | `font-semibold` (600) | `tracking-widest` (`0.1em`) |
| Body | `text-base` / `text-lg` / `text-xl` | `font-normal` (400) | normal |
| Small body | `text-sm` | `font-normal` (400) | `leading-6` |
| Caption | `text-xs` | `font-medium` (500) | normal |

### Hero subhead

`mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl` — centered.

---

## Buttons (`components/ui/Button.tsx`)

Pill shape (`rounded-full`), bold weight (`font-semibold`), with focus ring at `#00AEEF`.

### Sizes

| Size | Padding | Font |
|---|---|---|
| `sm` | `px-5 py-2` | `text-sm` |
| `md` | `px-7 py-3` | `text-base` |
| `lg` | `px-9 py-3.5` | `text-base` |

### Variants

- **primary**: `bg-[#00AEEF] text-white` with shadow on hover (blue glow `0 8px 25px rgba(0,174,239,0.30)`), darkens on hover/active
- **secondary**: `border-2 border-[#00AEEF] text-[#00AEEF] bg-transparent` with subtle blue tint on hover

Both have `active:scale-[0.98]` micro-interaction.

---

## Cards

### Style A — Standard feature card (default)

- Background: `bg-white dark:bg-[#161616]`
- Border: `border border-[#E5E7EB] dark:border-white/[0.08]`
- Radius: `rounded-2xl` (16px) — defined as `--radius-card`
- Padding: `p-5` to `p-7`
- Shadow: `shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.04)]` (light), heavier in dark
- Hover: `.card-hover-blue` — `translateY(-4px)` + blue glow shadow + blue border tint

### Style B — Lifted card (Platform pillars)

- Same base as Style A
- `.card-hover-lift` — `translateY(-8px)` + heavier blue glow + 0.40 border tint

### Style C — Outline / quote card

- Border: `border-2 border-[#00AEEF]/20`
- Background: `bg-[#F7F8FA] dark:bg-[#111111]`
- Used for operator-quote workflow cards

---

## Animations / micro-interactions

| Class | Effect |
|---|---|
| `.animate-mesh` | 12s slow-breathing gradient drift (hero background) |
| `.animate-bob-{0..5}` | Float-bob 3–4s (channel pills — REMOVED in current state) |
| `.animate-pulse-ring` | 2.2s expanding ring pulse (timeline steps) |
| `.animate-flow-dot` | 2.5s dot moving along `offset-path` |
| `.animate-marquee` | 40s linear marquee (logo bar) |
| `.animate-sparkle` | 0.6s scale + brightness pop (savings calc) |
| `.bg-noise` | Faint SVG fractal-noise grain overlay (2.5% opacity) |
| `.bg-dot-grid` | 26px radial dot grid at 18% blue |

### Framer Motion patterns

- Hero stagger: `fadeUp` variants with `delay: i * 0.12`, duration 0.6, easeOut
- Section reveal: `whileInView` with `viewport={{ once: true, margin: "-60px" }}`, duration 0.5–0.55
- Card stagger: `delay: i * 0.04` to `i * 0.1`

---

## Layout / spacing

### Container

- `max-w-7xl mx-auto px-6 lg:px-8` (most sections)
- `max-w-4xl` or `max-w-5xl` for hero / video container
- `max-w-3xl` for centered text-heavy sections

### Section vertical rhythm

- Hero: `py-28 lg:py-40`
- Standard sections: `py-24 lg:py-28`
- Compact: `py-16` / `py-20`

### Header padding inside cards

- Most cards: `p-5` to `p-7`
- Pillar/feature cards: `p-7` to `p-10`

---

## Critical components / unique treatments

### Hero (`components/sections/HeroSection.tsx`)

- Centered layout (`text-center`)
- Animated mesh gradient background (`.animate-mesh`)
- Two-color headline using `<span className="block">`: line 1 black/white, line 2 blue
- 7 channel pills (SMS, Email, Slack, Teams, Google Chat, Chrome Extension, Web Portal) — currently static
- Trust line: "Trusted by 60+ brands across 4,000+ locations"

### Stats section

- 4 stats: 60+ brands, 4,000+ locations, 10,000+ users, 70%+ deflection
- `react-countup` with `enableScrollSpy scrollSpyOnce`
- Numbers in blue `text-[#00AEEF]`

### Answers → Actions → Automations

- Three-stage cards with connecting arrows
- Staged color scheme: `#00AEEF → #0077A8 → #004F70`
- All marked "Available now"

### Comparison table (`ComparisonSection`)

- Card-wrapped table with EZee column highlighted in blue tint

### VideoPlaceholder

- 16:9 click-to-play facade for YouTube ID `yjarSt_H4fg`
- Pulsing ring around white play button on dark gradient background

### Logo treatments (placeholder state)

- Customer logos: `/public/logos/customers/` (placeholders; `lib/data/customer-logos.ts`)
- Integrations: `/public/logos/integrations/` (placeholders; rendering as initials)
- Team headshots: `/public/headshots/` (placeholders)

---

## What the editorial pass changes (high-level diff target)

| Aspect | v1 (current) | v2 (editorial) |
|---|---|---|
| Light bg | Pure white `#FFFFFF` | Warm cream `#F5EDE0` |
| Dark bg | Navy `#0B0F19` | Deep black `#0A0A0A` |
| Dark text | White `#F0F0F0` | Cream `#F5EDE0` |
| Display font | Plus Jakarta Sans | Onest (with Inter Tight fallback) |
| Headline weight | 800 (extrabold) | 500 (medium) |
| Headline size | `text-5xl → text-7xl` | `text-6xl → text-9xl` |
| Tracking | `-0.02em` | `-0.04em` |
| Hero alignment | Centered | Left-aligned |
| Cards | Bordered + shadowed | Flat, no border, no shadow |
| Card radius | `rounded-2xl` (16px) | `rounded-3xl` (24px) |
| Buttons | Blue primary + blue outline | Inverted black/cream + outlined; blue used sparingly |
| Animations | Many (mesh, bob, pulse, flow) | Minimal — just typography reveals |
| Background grain | Subtle noise + dot grids | Removed |
| Channel pills | Floating pills | Inline text line |

The full editorial token set lives in `app/globals.css` under the `.theme-editorial` class.
The default tokens are preserved in `:root` so the old design is still reachable.

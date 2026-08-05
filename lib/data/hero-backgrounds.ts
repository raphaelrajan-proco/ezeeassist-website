/**
 * Hero and closing-band background variants.
 *
 * Sections pick a variant by token rather than by path, so a swap is one edit
 * here instead of a hunt through every band that uses it.
 *
 * Each variant carries its **own** base colour and scrim. A lighter photograph
 * needs a stronger scrim to hold the same copy, so a variant must never
 * inherit another's numbers. Re-measure contrast per image against the
 * lightest pixel under the copy column, not the frame's average.
 *
 *   base   Solid colour painted behind the image, so a slow load never
 *          flashes white. Sample it from the image's darkest region.
 *   scrim  Alpha of the flat rgba(4,32,54,α) overlay. Use the weakest value
 *          that clears contrast: cream body copy needs 4.5:1, large display
 *          text 3:1.
 *
 * Files live in public/hero/ and are committed. Never a CDN.
 * See DESIGN.md §5 for the layer composition and the per-band scrim table.
 */

export type HeroBackground = {
  src: string;
  /** Solid fallback painted under the image. */
  base: string;
  /** Flat scrim alpha, applied as rgba(4,32,54,α). */
  scrim: number;
};

/* All four are the same hazy blue treatment and are photometrically almost
   identical: sampled across the copy column (x 0-48%, y 22-72%) their lightest
   pixels land within 0.01 of each other, so they are interchangeable and none
   needs a materially different scrim. The differences are in where the light
   wash falls at the bottom right, which sits outside the copy column.

   Measured minimum scrim for white body copy at 4.5:1, and the value set here
   (the minimum rounded up, with a little headroom):

     hero-bg.jpg     min 0.29   ->  0.34
     hero-bg-2.jpg   min 0.32   ->  0.36
     hero-bg-3.jpg   min 0.30   ->  0.34
     hero-bg-4.jpg   min 0.31   ->  0.35

   The homepage hero ships 0.30 flat against a measured 0.29, which is what
   confirms this sampling matches how the original value was derived. */
export const HERO_BG = {
  /* The original. Used by the homepage hero, the impact band, both closing
     CTAs and the booking page. */
  default: { src: "/hero-bg.jpg",         base: "#0B2C48", scrim: 0.34 },
  haze2:   { src: "/hero/hero-bg-2.jpg",  base: "#0B2C48", scrim: 0.36 },
  haze3:   { src: "/hero/hero-bg-3.jpg",  base: "#0B2C48", scrim: 0.34 },
  haze4:   { src: "/hero/hero-bg-4.jpg",  base: "#0B2C48", scrim: 0.35 },
} as const satisfies Record<string, HeroBackground>;

export type HeroBackgroundKey = keyof typeof HERO_BG;

/* ── Gradient hero bands ───────────────────────────────────
   Not every hero is a photograph. **Each sub-page gets its own hero blue
   so a visitor sees a visible change page to page**, and normalising them
   back to the homepage's hazy blue defeats the point of having them.
   These carry their own base, their own gradient stack and their own
   on-band accent, so nothing is inherited from HERO_BG above.

   `hero` and `closing` differ only in the direction of the linear pass
   and the position of the radial, so the two bands on one page read as a
   pair rather than a repeat. `closing` is always laid under the
   CLOSING_BASE resolve, which is what seams it into the footer. */
export type HeroGradient = {
  /** Solid painted behind the gradients. */
  base: string;
  hero: string;
  closing: string;
  /** Accent for text and marks on this band. */
  accent: string;
  /** Body copy on this band. */
  body: string;
};

export const HERO_GRADIENT = {
  /** Why EZee Assist. Lighter and bluer than the teal-navy photographic
      bands, so the page announces itself as a different room. */
  azure: {
    base: "#0C4A8C",
    hero:
      "radial-gradient(1000px 500px at 50% 135%, rgba(159,217,255,0.26), transparent 62%)," +
      "linear-gradient(160deg, #082E5C 0%, #0C4A8C 55%, #1166A8 100%)",
    closing:
      "radial-gradient(900px 460px at 20% 130%, rgba(159,217,255,0.20), transparent 60%)," +
      "linear-gradient(285deg, #082E5C 0%, #0C4A8C 55%, #1166A8 100%)",
    accent: "#9FD9FF",
    body: "rgba(240,247,255,0.92)",
  },
  /** Case studies, landing and every story detail. Greener and deeper
      than azure, so the stories read as their own section of the site
      rather than a continuation of Why EZee. The radial sits right of
      centre on the hero because the landing hero's artwork lives there. */
  ocean: {
    base: "#083A54",
    hero:
      "radial-gradient(1000px 520px at 78% 130%, rgba(127,224,255,0.22), transparent 62%)," +
      "linear-gradient(160deg, #062E44 0%, #0A4A6E 58%, #0E6D96 100%)",
    closing:
      "radial-gradient(900px 460px at 22% 130%, rgba(127,224,255,0.18), transparent 60%)," +
      "linear-gradient(285deg, #062E44 0%, #0A4A6E 58%, #0E6D96 100%)",
    accent: "#7FE0FF",
    body: "rgba(238,249,255,0.92)",
  },
} as const satisfies Record<string, HeroGradient>;

/* The scrim a band needs depends on how much copy sits on it, not only on the
   image. These are the measured values from the homepage; start from the
   closest one and re-check rather than guessing.

     homepage hero        0.30 flat + a bottom fade to 0.90
     sub-page hero        0.45  (more copy over more of the frame)
     KPI / stat band      0.42
     closing CTA          0.30 to 0.34, then resolve to CLOSING_BASE      */
export const SCRIM = {
  heroHome: 0.3,
  heroSubPage: 0.45,
  statBand: 0.42,
  closing: 0.34,
} as const;

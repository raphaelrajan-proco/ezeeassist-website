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

export const HERO_BG = {
  /* The original, and the only one in the repo today. Used by the homepage
     hero, the impact band, both closing CTAs and the booking page. */
  default: { src: "/hero-bg.jpg", base: "#0B2C48", scrim: 0.34 },
} as const satisfies Record<string, HeroBackground>;

export type HeroBackgroundKey = keyof typeof HERO_BG;

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

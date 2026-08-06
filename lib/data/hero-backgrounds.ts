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
  /** Flat scrim alpha, applied as rgba(4,32,54,α) unless `scrimTint` says
      otherwise. */
  scrim: number;
  /**
   * Scrim colour, when the default navy is wrong for this image.
   *
   * The navy `rgba(4,32,54)` is itself a hue. Over a cool image it
   * reinforces what is already there, but over a **warm** one it is close
   * to the complement, so at the alpha these lighter variants need it
   * cancels the hue and leaves grey. Measured on the lightest pixel of
   * the copy column, at each variant's own required alpha:
   *
   *     variant   navy result        sat   tinted result      sat
   *     teal      rgb( 55,128,139)  0.60   rgb( 58,129,131)  0.56
   *     indigo    rgb(107,117,157)  0.32   rgb(119,114,151)  0.25
   *     forest    rgb( 81,127,118)  0.36   rgb( 89,127,102)  0.30
   *     sand      rgb(122,113,152)  0.26   rgb(135,109,144)  0.24
   *     sunset    rgb(114,120,107)  0.11   rgb(129,118,89)   0.31
   *     mauve     rgb(137,109,140)  0.22   rgb(150,105,131)  0.30
   *
   * So the four cool variants keep the navy, and only sunset and mauve
   * carry a tint. Each tint is that variant's own mean colour deepened to
   * the navy's luminance, so it darkens by exactly as much.
   */
  scrimTint?: string;
  /**
   * A full gradient scrim, when a flat one is wrong for the image.
   *
   * A flat alpha darkens every part of the frame equally, which on a
   * strongly-lit photograph means the bright corner still fights the copy
   * while the dark corner goes to mud. A gradient can sit heavy over the
   * copy column and light where the artwork is, so more of the image's
   * own colour survives. Sunset needed this: at the flat 0.58 it takes to
   * clear white body copy it read olive-grey rather than gold.
   *
   * `hero` and `closing` mirror each other's direction, as the gradient
   * variants do. When set, these replace the flat scrim entirely.
   */
  scrimGradient?: { hero: string; closing: string };
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

  /* ── Recoloured variants ────────────────────────────────
     Six recolours of the original, same grain and composition, supplied
     so a sub-page hero can carry its own hue while staying visibly part
     of one family. They exist to break the blue monotony across the
     platform section; assignment lives in `lib/data/platform-heroes.ts`.

     **These are materially lighter than the blues above** and the 0.45
     sub-page scrim does not cover them. Measured the same way: lightest
     pixel of the copy column (x 0-48%, y 22-72%), minimum alpha for white
     body copy at 4.5:1, then rounded up with a little headroom.

       variant   lightest px        min    set
       teal      rgb( 92,196,199)   0.415  0.46
       mauve     rgb(225,161,198)   0.40   0.45
       sand      rgb(215,176,229)   0.44   0.52
       indigo    rgb(205,198,255)   0.49   0.54
       forest    rgb(161,226,184)   0.51   0.56
       sunset    rgb(241,221,168)   0.535  0.58

     For reference the method reproduces the original's documented 0.29 on
     hero-bg.jpg exactly, which is what says it matches how these numbers
     were derived in the first place.

     `base` is sampled from each image's own darkest region, so a slow
     load never flashes the wrong colour. */
  teal:    { src: "/hero/hero-bg-teal.jpg",   base: "#0A3A40", scrim: 0.46 },
  indigo:  { src: "/hero/hero-bg-indigo.jpg", base: "#1F1C2C", scrim: 0.54 },
  forest:  { src: "/hero/hero-bg-forest.jpg", base: "#162119", scrim: 0.56 },
  sand:    { src: "/hero/hero-bg-sand.jpg",   base: "#251B28", scrim: 0.52 },
  /* Apps. The dark-olive gradient keeps the gold alive where the flat
     scrim flattened it; `base` follows the handoff's own fallback. */
  sunset: {
    src: "/hero/hero-bg-sunset.jpg", base: "#5C5530", scrim: 0.58, scrimTint: "33,30,21",
    scrimGradient: {
      hero:    "linear-gradient(160deg, rgba(43,40,14,.74) 0%, rgba(62,56,22,.56) 55%, rgba(80,70,26,.44) 100%)",
      closing: "linear-gradient(285deg, rgba(43,40,14,.74) 0%, rgba(62,56,22,.56) 55%, rgba(80,70,26,.44) 100%)",
    },
  },
  mauve:   { src: "/hero/hero-bg-mauve.jpg",  base: "#2B1923", scrim: 0.45, scrimTint: "43,25,35" },
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
  /**
   * Colour the closing band resolves to at its bottom edge.
   *
   * Only `/` and `/speak-to-an-expert` carry the dark editorial footer,
   * so on a sub-page this is the bottom of the band rather than a colour
   * that has to match what follows. It should stay inside the variant's
   * own hue family: dropping an indigo band onto the teal-navy
   * CLOSING_BASE reads as a hue shift right at the fold.
   *
   * Omit to use CLOSING_BASE.
   */
  resolve?: string;
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
  /** Reporting. Violet-leaning and the darkest of the three, which suits
      a page whose hero artwork is a console rather than a diagram: the
      white card has to sit forward of the band. */
  indigo: {
    base: "#242A5E",
    hero:
      "radial-gradient(1000px 520px at 76% 128%, rgba(169,182,255,0.26), transparent 62%)," +
      "linear-gradient(158deg, #15183C 0%, #242A5E 55%, #3D4A9E 100%)",
    closing:
      "radial-gradient(900px 460px at 24% 128%, rgba(169,182,255,0.22), transparent 60%)," +
      "linear-gradient(285deg, #15183C 0%, #242A5E 55%, #3D4A9E 100%)",
    accent: "#A9B6FF",
    body: "rgba(238,241,255,0.92)",
    resolve: "#0A1030",
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

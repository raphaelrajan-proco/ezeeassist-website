import { HERO_BG, SCRIM, type HeroBackgroundKey } from "@/lib/data/hero-backgrounds";

/**
 * Which hero background each platform sub-page carries.
 *
 * ─────────────────────────────────────────────────────────────
 *  TO REVERT: set VARIANT_HEROES to false.
 * ─────────────────────────────────────────────────────────────
 *
 * That one flag puts every page back on the blue it shipped with, at the
 * scrim it shipped with. Nothing else needs touching, no page component
 * changes, and the variant images stay in the repo unused rather than
 * having to be re-added.
 *
 * The point of the variants is to break the blue monotony across the
 * platform section: eight pages in a row on the same hazy blue read as
 * one page. They are recolours of the same photograph, so the section
 * still holds together.
 *
 * `sunset` and `mauve` appear **once each**, deliberately. They are the
 * two loudest and read as an event rather than a family member when
 * repeated. `teal` and `indigo` carry two pages each, and no two pages
 * adjacent in the nav share a colour.
 *
 * Nav order and assignment:
 *
 *   On demand    Answers          teal
 *                Reporting        indigo
 *                Apps             sunset   (once)
 *   Always on    Workflows        forest
 *                Compliance       teal
 *   Foundation   Ticketing        mauve    (once)
 *                Integrations     sand
 *                Control Center   indigo
 *
 * The gradient-hero pages are **not** in here and must not be added.
 * Trust Center, Why EZee and Case Studies carry their own specified
 * blues from their own handoffs, and those are not photographic.
 */

export const VARIANT_HEROES = true;

export type PlatformPage =
  | "answers"
  | "reporting"
  | "apps"
  | "workflows"
  | "compliance"
  | "ticketing"
  | "integrations"
  | "control-center";

const ASSIGNED: Record<PlatformPage, HeroBackgroundKey> = {
  answers: "teal",
  reporting: "indigo",
  apps: "sunset",
  workflows: "forest",
  compliance: "teal",
  ticketing: "mauve",
  integrations: "sand",
  "control-center": "indigo",
};

/** What each page carried before the variants, so the flag is a true
    revert rather than an approximation. */
const PREVIOUS: Record<PlatformPage, HeroBackgroundKey> = {
  answers: "haze3",
  reporting: "haze2",
  apps: "haze2",
  workflows: "haze2",
  compliance: "haze2",
  ticketing: "haze2",
  integrations: "haze4",
  "control-center": "haze2",
};

export type ResolvedHero = {
  src: string;
  base: string;
  /** Ready to drop into a style: `rgba(${scrimRgba})`. */
  scrimRgba: string;
  /** The same image also backs each page's closing band. */
  closingRgba: string;
};

/**
 * The hero and closing band a platform page should paint.
 *
 * The blues all shipped at the flat sub-page scrim (0.45 hero, 0.34
 * closing) rather than their own registry values, because those
 * baselines were measured for white body copy alone and these bands also
 * carry mono captions at 10.5px.
 *
 * The variants carry their own measured scrim on **both** bands. 0.45
 * does not cover any of them, and 0.34 is not close: the closing band
 * holds a white H2 and body copy over the same photograph, so it needs
 * the same floor.
 *
 * The closing band then takes a further **+0.04**. It is shorter than
 * the hero, so `object-cover` scales the same image up and crops to a
 * brighter slice of it. Measured on the built pages at the band's own
 * height, the two that sat under 4.5:1 for white body copy were Apps at
 * 4.49 and Ticketing at 4.13; +0.04 carries both over. The bottom
 * resolve to CLOSING_BASE darkens only the lower edge, below where the
 * H2 sits, so it cannot be counted on for this.
 */
const CLOSING_CROP_OFFSET = 0.04;

export function platformHero(page: PlatformPage): ResolvedHero {
  const key = VARIANT_HEROES ? ASSIGNED[page] : PREVIOUS[page];
  const v = HERO_BG[key];
  const tint = "scrimTint" in v ? (v.scrimTint as string) : "4,32,54";
  return {
    src: v.src,
    base: v.base,
    scrimRgba: `${tint},${VARIANT_HEROES ? v.scrim : SCRIM.heroSubPage}`,
    closingRgba: `${tint},${
      VARIANT_HEROES ? +(v.scrim + CLOSING_CROP_OFFSET).toFixed(2) : SCRIM.closing
    }`,
  };
}

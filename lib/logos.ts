/**
 * The trusted-by logo roster. Single source of truth for both placements:
 * the home hero overlay and the below-hero strip on every other page.
 *
 * **Adding a logo is one line here plus one file.** Drop the source in
 * `public/logos/_source/`, run `node scripts/process-logos.mjs`, and copy
 * the generated row in. The script writes the transparent, trimmed asset,
 * the on-dark variant when the mark needs one, and the intrinsic size.
 *
 * ── The fields, and why each exists ────────────────────────
 * `src` / `fallback` — webp with a png fallback, both 2x, both with real
 * alpha. Nothing here carries a baked white box; the processor flood
 * fills it out. Blend modes are not used anywhere and must not be: they
 * hide a bad asset instead of fixing it.
 *
 * `srcOnDark` — a light variant, present on 44 of 50. It is NOT a
 * silhouette: the processor works in HSL and raises only lightness, so
 * hue and saturation survive and a maroon wordmark stays maroon. It
 * exists because most of this roster is a coloured icon beside a dark
 * wordmark, and on the hero navy that wordmark, which carries the brand
 * NAME, disappears.
 *
 * `width` / `height` — intrinsic CSS pixels (half the 2x file), so the
 * row reserves its space and nothing shifts on load.
 *
 * `scale` — optical nudge, default 1. Every asset is exported at one cap
 * height, which alone makes a square badge read far smaller than a long
 * wordmark at the same row height. The default holds `h * sqrt(ar)` near
 * constant so they carry similar visual weight; override it per logo by
 * hand when one still looks off.
 *
 * `set` — omitted means "shown in both placements". Both currently show
 * the same roster, so nothing sets it; it is here so a divergence never
 * needs a second manifest.
 */
export type LogoSet = "hero" | "page";

export type Logo = {
  name: string;
  /** Accessible name. Only the first rendered copy uses it. */
  alt: string;
  src: string;
  fallback?: string;
  srcOnDark?: string;
  fallbackOnDark?: string;
  width: number;
  height: number;
  scale?: number;
  set?: LogoSet;
};

/* Order is the marquee's opening sequence, requested: it launches on a
   handful of brands from the back of the roster, the featured run lands
   from position six with UPS Store first, and the rest follow. */
export const logos: Logo[] = [
  { name: "Bumble Bee Blinds", alt: "Bumble Bee Blinds", src: "/logos/brands/bumble-bee-blinds.webp", fallback: "/logos/brands/bumble-bee-blinds.png", srcOnDark: "/logos/brands/bumble-bee-blinds-on-dark.webp", fallbackOnDark: "/logos/brands/bumble-bee-blinds-on-dark.png", width: 300, height: 128, scale: 1.17 },
  { name: "Wisdom Senior Care", alt: "Wisdom Senior Care", src: "/logos/brands/wisdom-senior-care.webp", fallback: "/logos/brands/wisdom-senior-care.png", srcOnDark: "/logos/brands/wisdom-senior-care-on-dark.webp", fallbackOnDark: "/logos/brands/wisdom-senior-care-on-dark.png", width: 351, height: 128, scale: 1.08 },
  { name: "The DRIPBaR", alt: "The DRIPBaR", src: "/logos/brands/the-dripbar.webp", fallback: "/logos/brands/the-dripbar.png", srcOnDark: "/logos/brands/the-dripbar-on-dark.webp", fallbackOnDark: "/logos/brands/the-dripbar-on-dark.png", width: 161, height: 128, scale: 1.45 },
  { name: "New Creations", alt: "New Creations", src: "/logos/brands/new-creations.webp", fallback: "/logos/brands/new-creations.png", srcOnDark: "/logos/brands/new-creations-on-dark.webp", fallbackOnDark: "/logos/brands/new-creations-on-dark.png", width: 1067, height: 128, scale: 0.72 },
  { name: "Athletic Republic", alt: "Athletic Republic", src: "/logos/brands/athletic-republic.webp", fallback: "/logos/brands/athletic-republic.png", srcOnDark: "/logos/brands/athletic-republic-on-dark.webp", fallbackOnDark: "/logos/brands/athletic-republic-on-dark.png", width: 121, height: 128, scale: 1.45 },
  { name: "UPS Store", alt: "The UPS Store", src: "/logos/brands/ups-store.webp", fallback: "/logos/brands/ups-store.png", srcOnDark: "/logos/brands/ups-store-on-dark.webp", fallbackOnDark: "/logos/brands/ups-store-on-dark.png", width: 763, height: 128, scale: 0.73 },
  { name: "Sport Clips", alt: "Sport Clips", src: "/logos/brands/sport-clips.webp", fallback: "/logos/brands/sport-clips.png", srcOnDark: "/logos/brands/sport-clips-on-dark.webp", fallbackOnDark: "/logos/brands/sport-clips-on-dark.png", width: 526, height: 128, scale: 0.88 },
  { name: "Fastest Labs", alt: "Fastest Labs", src: "/logos/brands/fastest-labs.webp", fallback: "/logos/brands/fastest-labs.png", srcOnDark: "/logos/brands/fastest-labs-on-dark.webp", fallbackOnDark: "/logos/brands/fastest-labs-on-dark.png", width: 395, height: 128 },
  { name: "Aqua-Tots", alt: "Aqua-Tots Swim School", src: "/logos/brands/aqua-tots.webp", fallback: "/logos/brands/aqua-tots.png", srcOnDark: "/logos/brands/aqua-tots-on-dark.webp", fallbackOnDark: "/logos/brands/aqua-tots-on-dark.png", width: 538, height: 128, scale: 0.87 },
  { name: "DivaDance", alt: "DivaDance", src: "/logos/brands/divadance.webp", fallback: "/logos/brands/divadance.png", srcOnDark: "/logos/brands/divadance-on-dark.webp", fallbackOnDark: "/logos/brands/divadance-on-dark.png", width: 223, height: 128, scale: 1.36 },
  { name: "Deka Lash", alt: "Deka Lash", src: "/logos/brands/deka-lash.webp", fallback: "/logos/brands/deka-lash.png", srcOnDark: "/logos/brands/deka-lash-on-dark.webp", fallbackOnDark: "/logos/brands/deka-lash-on-dark.png", width: 208, height: 128, scale: 1.41 },
  { name: "HorsePower Brands", alt: "HorsePower Brands", src: "/logos/brands/horsepower-brands.webp", fallback: "/logos/brands/horsepower-brands.png", width: 324, height: 128, scale: 1.12 },
  { name: "Oasis Senior Advisors", alt: "Oasis Senior Advisors", src: "/logos/brands/oasis-senior-advisors.webp", fallback: "/logos/brands/oasis-senior-advisors.png", srcOnDark: "/logos/brands/oasis-senior-advisors-on-dark.webp", fallbackOnDark: "/logos/brands/oasis-senior-advisors-on-dark.png", width: 191, height: 128, scale: 1.45 },
  { name: "EverLine", alt: "EverLine Coatings and Services", src: "/logos/brands/everline.webp", fallback: "/logos/brands/everline.png", srcOnDark: "/logos/brands/everline-on-dark.webp", fallbackOnDark: "/logos/brands/everline-on-dark.png", width: 137, height: 128, scale: 1.45 },
  { name: "CEFA Early Learning", alt: "CEFA Early Learning", src: "/logos/brands/cefa-early-learning.webp", fallback: "/logos/brands/cefa-early-learning.png", srcOnDark: "/logos/brands/cefa-early-learning-on-dark.webp", fallbackOnDark: "/logos/brands/cefa-early-learning-on-dark.png", width: 302, height: 128, scale: 1.16 },
  { name: "QC Kinetix", alt: "QC Kinetix", src: "/logos/brands/qc-kinetix.webp", fallback: "/logos/brands/qc-kinetix.png", width: 605, height: 128, scale: 0.82 },
  { name: "WSI", alt: "WSI", src: "/logos/brands/wsi.svg", width: 190, height: 64 },
  { name: "Real Property Management", alt: "Real Property Management", src: "/logos/brands/real-property-management.webp", fallback: "/logos/brands/real-property-management.png", srcOnDark: "/logos/brands/real-property-management-on-dark.webp", fallbackOnDark: "/logos/brands/real-property-management-on-dark.png", width: 375, height: 128, scale: 1.05 },
  { name: "Spray-Net", alt: "Spray-Net", src: "/logos/brands/spray-net.webp", fallback: "/logos/brands/spray-net.png", srcOnDark: "/logos/brands/spray-net-on-dark.webp", fallbackOnDark: "/logos/brands/spray-net-on-dark.png", width: 511, height: 128, scale: 0.90 },
  { name: "Modern PurAir", alt: "Modern PurAir", src: "/logos/brands/modern-purair.webp", fallback: "/logos/brands/modern-purair.png", srcOnDark: "/logos/brands/modern-purair-on-dark.webp", fallbackOnDark: "/logos/brands/modern-purair-on-dark.png", width: 431, height: 128, scale: 0.98 },
  { name: "Zoom Drain", alt: "Zoom Drain", src: "/logos/brands/zoom-drain.webp", fallback: "/logos/brands/zoom-drain.png", srcOnDark: "/logos/brands/zoom-drain-on-dark.webp", fallbackOnDark: "/logos/brands/zoom-drain-on-dark.png", width: 332, height: 128, scale: 1.11 },
  { name: "Heights Wellness", alt: "Heights Wellness Retreat", src: "/logos/brands/heights-wellness-retreat.webp", fallback: "/logos/brands/heights-wellness-retreat.png", srcOnDark: "/logos/brands/heights-wellness-retreat-on-dark.webp", fallbackOnDark: "/logos/brands/heights-wellness-retreat-on-dark.png", width: 663, height: 128, scale: 0.79 },
  { name: "Home Helpers", alt: "Home Helpers Home Care", src: "/logos/brands/home-helpers.webp", fallback: "/logos/brands/home-helpers.png", srcOnDark: "/logos/brands/home-helpers-on-dark.webp", fallbackOnDark: "/logos/brands/home-helpers-on-dark.png", width: 439, height: 128, scale: 0.97 },
  { name: "Art of Drawers", alt: "Art of Drawers", src: "/logos/brands/art-of-drawers.webp", fallback: "/logos/brands/art-of-drawers.png", srcOnDark: "/logos/brands/art-of-drawers-on-dark.webp", fallbackOnDark: "/logos/brands/art-of-drawers-on-dark.png", width: 634, height: 128, scale: 0.80 },
  { name: "Blingle", alt: "Blingle", src: "/logos/brands/blingle.webp", fallback: "/logos/brands/blingle.png", width: 375, height: 128, scale: 1.05 },
  { name: "Cabinet IQ", alt: "Cabinet IQ", src: "/logos/brands/cabinet-iq.webp", fallback: "/logos/brands/cabinet-iq.png", srcOnDark: "/logos/brands/cabinet-iq-on-dark.webp", fallbackOnDark: "/logos/brands/cabinet-iq-on-dark.png", width: 270, height: 128, scale: 1.23 },
  { name: "Corporate Cleaning Group", alt: "Corporate Cleaning Group", src: "/logos/brands/corporate-cleaning-group.webp", fallback: "/logos/brands/corporate-cleaning-group.png", srcOnDark: "/logos/brands/corporate-cleaning-group-on-dark.webp", fallbackOnDark: "/logos/brands/corporate-cleaning-group-on-dark.png", width: 529, height: 128, scale: 0.88 },
  { name: "Egg Bred", alt: "Egg Bred", src: "/logos/brands/egg-bred.webp", fallback: "/logos/brands/egg-bred.png", srcOnDark: "/logos/brands/egg-bred-on-dark.webp", fallbackOnDark: "/logos/brands/egg-bred-on-dark.png", width: 398, height: 128 },
  { name: "Fresh Burger", alt: "Fresh Burger", src: "/logos/brands/fresh-burger.webp", fallback: "/logos/brands/fresh-burger.png", width: 237, height: 128, scale: 1.32 },
  { name: "Garage Floors 4 Less", alt: "Garage Floors 4 Less", src: "/logos/brands/garage-floors-4-less.webp", fallback: "/logos/brands/garage-floors-4-less.png", srcOnDark: "/logos/brands/garage-floors-4-less-on-dark.webp", fallbackOnDark: "/logos/brands/garage-floors-4-less-on-dark.png", width: 164, height: 128, scale: 1.45 },
  { name: "Gatsby Glass", alt: "Gatsby Glass", src: "/logos/brands/gatsby-glass.webp", fallback: "/logos/brands/gatsby-glass.png", width: 877, height: 128, scale: 0.72 },
  { name: "GoPainting", alt: "GoPainting", src: "/logos/brands/gopainting.webp", fallback: "/logos/brands/gopainting.png", srcOnDark: "/logos/brands/gopainting-on-dark.webp", fallbackOnDark: "/logos/brands/gopainting-on-dark.png", width: 474, height: 128, scale: 0.93 },
  { name: "Gotcha Covered", alt: "Gotcha Covered", src: "/logos/brands/gotcha-covered.webp", fallback: "/logos/brands/gotcha-covered.png", srcOnDark: "/logos/brands/gotcha-covered-on-dark.webp", fallbackOnDark: "/logos/brands/gotcha-covered-on-dark.png", width: 337, height: 128, scale: 1.10 },
  { name: "GradePower Learning", alt: "GradePower Learning", src: "/logos/brands/gradepower-learning.webp", fallback: "/logos/brands/gradepower-learning.png", srcOnDark: "/logos/brands/gradepower-learning-on-dark.webp", fallbackOnDark: "/logos/brands/gradepower-learning-on-dark.png", width: 291, height: 128, scale: 1.19 },
  { name: "Groovy Hues", alt: "Groovy Hues", src: "/logos/brands/groovy-hues.webp", fallback: "/logos/brands/groovy-hues.png", srcOnDark: "/logos/brands/groovy-hues-on-dark.webp", fallbackOnDark: "/logos/brands/groovy-hues-on-dark.png", width: 239, height: 128, scale: 1.31 },
  { name: "Heroes Lawn Care", alt: "Heroes Lawn Care", src: "/logos/brands/heroes-lawn-care.webp", fallback: "/logos/brands/heroes-lawn-care.png", srcOnDark: "/logos/brands/heroes-lawn-care-on-dark.webp", fallbackOnDark: "/logos/brands/heroes-lawn-care-on-dark.png", width: 263, height: 128, scale: 1.25 },
  { name: "Home Clean Heroes", alt: "Home Clean Heroes", src: "/logos/brands/home-clean-heroes.webp", fallback: "/logos/brands/home-clean-heroes.png", srcOnDark: "/logos/brands/home-clean-heroes-on-dark.webp", fallbackOnDark: "/logos/brands/home-clean-heroes-on-dark.png", width: 243, height: 128, scale: 1.30 },
  { name: "Home Run Franchises", alt: "Home Run Franchises", src: "/logos/brands/home-run-franchises.webp", fallback: "/logos/brands/home-run-franchises.png", srcOnDark: "/logos/brands/home-run-franchises-on-dark.webp", fallbackOnDark: "/logos/brands/home-run-franchises-on-dark.png", width: 509, height: 128, scale: 0.90 },
  { name: "iFOAM", alt: "iFOAM", src: "/logos/brands/ifoam.webp", fallback: "/logos/brands/ifoam.png", srcOnDark: "/logos/brands/ifoam-on-dark.webp", fallbackOnDark: "/logos/brands/ifoam-on-dark.png", width: 397, height: 128 },
  { name: "Massage Heights", alt: "Massage Heights", src: "/logos/brands/massage-heights.webp", fallback: "/logos/brands/massage-heights.png", srcOnDark: "/logos/brands/massage-heights-on-dark.webp", fallbackOnDark: "/logos/brands/massage-heights-on-dark.png", width: 235, height: 128, scale: 1.32 },
  { name: "MAX Strength Fitness", alt: "MAX Strength Fitness", src: "/logos/brands/max-strength-fitness.webp", fallback: "/logos/brands/max-strength-fitness.png", srcOnDark: "/logos/brands/max-strength-fitness-on-dark.webp", fallbackOnDark: "/logos/brands/max-strength-fitness-on-dark.png", width: 306, height: 128, scale: 1.16 },
  { name: "Mighty Dog Roofing", alt: "Mighty Dog Roofing", src: "/logos/brands/mighty-dog-roofing.webp", fallback: "/logos/brands/mighty-dog-roofing.png", srcOnDark: "/logos/brands/mighty-dog-roofing-on-dark.webp", fallbackOnDark: "/logos/brands/mighty-dog-roofing-on-dark.png", width: 256, height: 128, scale: 1.26 },
  { name: "Nani's Gelato", alt: "Nani's Gelato", src: "/logos/brands/nanis-gelato.webp", fallback: "/logos/brands/nanis-gelato.png", srcOnDark: "/logos/brands/nanis-gelato-on-dark.webp", fallbackOnDark: "/logos/brands/nanis-gelato-on-dark.png", width: 193, height: 128, scale: 1.45 },
  { name: "NEXTAFF", alt: "NEXTAFF", src: "/logos/brands/nextaff.webp", fallback: "/logos/brands/nextaff.png", srcOnDark: "/logos/brands/nextaff-on-dark.webp", fallbackOnDark: "/logos/brands/nextaff-on-dark.png", width: 602, height: 128, scale: 0.83 },
  { name: "Oxford Learning", alt: "Oxford Learning", src: "/logos/brands/oxford-learning.webp", fallback: "/logos/brands/oxford-learning.png", srcOnDark: "/logos/brands/oxford-learning-on-dark.webp", fallbackOnDark: "/logos/brands/oxford-learning-on-dark.png", width: 345, height: 128, scale: 1.09 },
  { name: "PMI", alt: "PMI", src: "/logos/brands/pmi.webp", fallback: "/logos/brands/pmi.png", srcOnDark: "/logos/brands/pmi-on-dark.webp", fallbackOnDark: "/logos/brands/pmi-on-dark.png", width: 339, height: 128, scale: 1.10 },
  { name: "Stand Strong Fencing", alt: "Stand Strong Fencing", src: "/logos/brands/stand-strong-fencing.webp", fallback: "/logos/brands/stand-strong-fencing.png", srcOnDark: "/logos/brands/stand-strong-fencing-on-dark.webp", fallbackOnDark: "/logos/brands/stand-strong-fencing-on-dark.png", width: 290, height: 128, scale: 1.19 },
  { name: "STOR-X", alt: "STOR-X", src: "/logos/brands/stor-x.webp", fallback: "/logos/brands/stor-x.png", srcOnDark: "/logos/brands/stor-x-on-dark.webp", fallbackOnDark: "/logos/brands/stor-x-on-dark.png", width: 621, height: 128, scale: 0.81 },
  { name: "Up Closets", alt: "Up Closets", src: "/logos/brands/up-closets.webp", fallback: "/logos/brands/up-closets.png", srcOnDark: "/logos/brands/up-closets-on-dark.webp", fallbackOnDark: "/logos/brands/up-closets-on-dark.png", width: 329, height: 128, scale: 1.12 },
  { name: "Fuzz Wax Bar", alt: "Fuzz Wax Bar", src: "/logos/brands/waxbar-fuzz.webp", fallback: "/logos/brands/waxbar-fuzz.png", srcOnDark: "/logos/brands/waxbar-fuzz-on-dark.webp", fallbackOnDark: "/logos/brands/waxbar-fuzz-on-dark.png", width: 267, height: 128, scale: 1.24 },];

/** The roster for a placement. Entries with no `set` appear in both. */
export function logosFor(set: LogoSet): Logo[] {
  return logos.filter((l) => !l.set || l.set === set);
}

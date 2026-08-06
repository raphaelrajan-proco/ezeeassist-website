/**
 * Single source of truth for the customer logo marquee.
 *
 * Every page that shows customer logos reads this list through
 * `LogoMarquee`, so one edit here changes the homepage hero strip and the
 * strip under all ten platform and solutions heroes at once. That is the
 * point: do not fork the list per page.
 *
 * **Files live in `public/logos/brands/`, committed, never hotlinked.**
 * 47 came from the IFA 2026 slide as PNG/JPG, plus UPS Store, Heights
 * Wellness Retreat and Home Helpers supplied separately. Aspect ratios run
 * 1.25 for The DRIPBaR to 8.45 for New Creations.
 *
 * **Every file is cropped to its ink box, and a new one has to be cropped
 * before it is added.** `ar` is the FILE's ratio, so transparent or white
 * margin inside the file counts as part of the mark and shrinks the ink
 * that actually renders. Max Strength Fitness shipped 2048x2048 at 30% ink
 * and came out a third the size of its neighbours; nine others were between
 * 48% and 63%. Nothing catches this: the file loads, the ratio is honest,
 * and the mark is just small.
 *
 * **`ar` is the file's measured width/height**, and `LogoTile` sizes each
 * mark from it. A single fixed height across that range does not work: at
 * 30px tall a 7.59 wordmark gets 228px of width and a square mark gets 30,
 * so the square ones shrink to illegible stamps beside them. The tile
 * normalises roughly by area instead, giving square marks more height and
 * long wordmarks less. Setting a fixed WIDTH is the other failure mode: it
 * squashes the wordmarks.
 *
 * **Re-measure `ar` when a file changes, and delete `.next/cache/images`.**
 * The optimizer caches by request path, so replacing a file at the same
 * path serves the OLD bitmap until that cache is cleared. Both halves have
 * bitten: a stale `ar` renders the right image at the wrong size, and a
 * warm image cache renders the wrong image entirely, at the size the right
 * one would have been. It is derived data and there is
 * no runtime check that it still matches the bitmap; a stale value just
 * renders the mark at the wrong size, with nothing to flag it. This has
 * already happened once: a replacement `deka-lash.png` went from 5.63 to
 * a square 1.00 and the mark rendered at less than half the height it
 * should have until the value was re-read. Values below were read from the
 * committed files.
 *
 * **Every brand now has a file.** `LogoTile` still falls back to a grey
 * text pill through `onError`, which is what carries a new entry whose art
 * has not landed yet: add the row, point `src` at the intended path, and
 * the pill holds the slot without shifting the order.
 *
 * **Removed on request: Garage Floors 4 Less, Massage Heights, Deka Lash.**
 * The files stay in `public/logos/brands/` so any of the three can come
 * back as a one-line addition; only the roster changed.
 *
 * Order is the marquee's opening sequence, requested: it launches on a
 * handful of brands from the back of the roster, the featured run lands
 * from position six (UPS Store first), and the rest follow in the slide's
 * alphabetical order. Display names are spelled the way each brand writes
 * them (WSI, DivaDance, iFOAM, The DRIPBaR, NEXTAFF, QC Kinetix, STOR-X).
 */

export interface CustomerLogo {
  name: string;
  src: string;
  alt: string;
  /** Measured width/height of the file. Absent when no file exists yet,
      in which case the entry renders as a text pill and never needs one. */
  ar?: number;
}

export const customerLogos: CustomerLogo[] = [
  // ── Openers, pulled from the back of the roster ──────────────
  { name: "Bumble Bee Blinds", src: "/logos/brands/bumble-bee-blinds.png", alt: "Bumble Bee Blinds", ar: 2.34 },
  { name: "Wisdom Senior Care", src: "/logos/brands/wisdom-senior-care.png", alt: "Wisdom Senior Care", ar: 2.74 },
  { name: "The DRIPBaR", src: "/logos/brands/the-dripbar.png", alt: "The DRIPBaR", ar: 1.25 },
  { name: "New Creations", src: "/logos/brands/new-creations.png", alt: "New Creations", ar: 8.45 },
  { name: "Athletic Republic", src: "/logos/brands/athletic-republic.jpg", alt: "Athletic Republic", ar: 6.58 },

  // ── Featured run, order requested ────────────────────────────
  { name: "UPS Store", src: "/logos/brands/ups-store.png", alt: "The UPS Store", ar: 5.96 },
  { name: "Sport Clips", src: "/logos/brands/sport-clips.jpg", alt: "Sport Clips", ar: 4.12 },
  { name: "Fastest Labs", src: "/logos/brands/fastest-labs.png", alt: "Fastest Labs", ar: 3.08 },
  { name: "Aqua-Tots", src: "/logos/brands/aqua-tots.png", alt: "Aqua-Tots Swim School", ar: 4.2 },
  { name: "DivaDance", src: "/logos/brands/divadance.jpg", alt: "DivaDance", ar: 2.92 },
  { name: "HorsePower Brands", src: "/logos/brands/horsepower-brands.png", alt: "HorsePower Brands", ar: 2.53 },
  { name: "Oasis Senior Advisors", src: "/logos/brands/oasis-senior-advisors.png", alt: "Oasis Senior Advisors", ar: 1.49 },
  { name: "EverLine", src: "/logos/brands/everline.png", alt: "EverLine Coatings and Services", ar: 2.62 },
  { name: "CEFA Early Learning", src: "/logos/brands/cefa-early-learning.png", alt: "CEFA Early Learning", ar: 2.33 },
  { name: "QC Kinetix", src: "/logos/brands/qc-kinetix.png", alt: "QC Kinetix", ar: 4.73 },
  { name: "WSI", src: "/logos/brands/wsi.png", alt: "WSI", ar: 2.39 },
  { name: "Real Property Management", src: "/logos/brands/real-property-management.png", alt: "Real Property Management", ar: 2.93 },
  { name: "Spray-Net", src: "/logos/brands/spray-net.png", alt: "Spray-Net", ar: 3.99 },
  { name: "Modern PurAir", src: "/logos/brands/modern-purair.png", alt: "Modern PurAir", ar: 3.69 },
  { name: "Zoom Drain", src: "/logos/brands/zoom-drain.png", alt: "Zoom Drain", ar: 2.59 },
  { name: "Heights Wellness", src: "/logos/brands/heights-wellness-retreat.png", alt: "Heights Wellness Retreat", ar: 5.18 },
  { name: "Home Helpers", src: "/logos/brands/home-helpers.png", alt: "Home Helpers Home Care", ar: 3.43 },

  // ── The rest of the roster ───────────────────────────────────
  { name: "Art of Drawers", src: "/logos/brands/art-of-drawers.png", alt: "Art of Drawers", ar: 4.95 },
  { name: "Blingle", src: "/logos/brands/blingle.png", alt: "Blingle", ar: 2.93 },
  { name: "Cabinet IQ", src: "/logos/brands/cabinet-iq.png", alt: "Cabinet IQ", ar: 2.11 },
  { name: "Corporate Cleaning Group", src: "/logos/brands/corporate-cleaning-group.jpg", alt: "Corporate Cleaning Group", ar: 4.13 },
  { name: "Egg Bred", src: "/logos/brands/egg-bred.png", alt: "Egg Bred", ar: 3.11 },
  { name: "Fresh Burger", src: "/logos/brands/fresh-burger.jpg", alt: "Fresh Burger", ar: 1.86 },
  { name: "Gatsby Glass", src: "/logos/brands/gatsby-glass.png", alt: "Gatsby Glass", ar: 6.85 },
  { name: "GoPainting", src: "/logos/brands/gopainting.png", alt: "GoPainting", ar: 3.7 },
  { name: "Gotcha Covered", src: "/logos/brands/gotcha-covered.png", alt: "Gotcha Covered", ar: 2.63 },
  { name: "GradePower Learning", src: "/logos/brands/gradepower-learning.png", alt: "GradePower Learning", ar: 2.28 },
  { name: "Groovy Hues", src: "/logos/brands/groovy-hues.png", alt: "Groovy Hues", ar: 1.87 },
  { name: "Heroes Lawn Care", src: "/logos/brands/heroes-lawn-care.png", alt: "Heroes Lawn Care", ar: 2.06 },
  { name: "Home Clean Heroes", src: "/logos/brands/home-clean-heroes.png", alt: "Home Clean Heroes", ar: 1.9 },
  { name: "Home Run Franchises", src: "/logos/brands/home-run-franchises.png", alt: "Home Run Franchises", ar: 3.97 },
  { name: "iFOAM", src: "/logos/brands/ifoam.png", alt: "iFOAM", ar: 3.1 },
  { name: "MAX Strength Fitness", src: "/logos/brands/max-strength-fitness.png", alt: "MAX Strength Fitness", ar: 2.39 },
  { name: "Mighty Dog Roofing", src: "/logos/brands/mighty-dog-roofing.png", alt: "Mighty Dog Roofing", ar: 1.99 },
  { name: "Nani's Gelato", src: "/logos/brands/nanis-gelato.png", alt: "Nani's Gelato", ar: 1.5 },
  { name: "NEXTAFF", src: "/logos/brands/nextaff.png", alt: "NEXTAFF", ar: 4.71 },
  { name: "Oxford Learning", src: "/logos/brands/oxford-learning.png", alt: "Oxford Learning", ar: 2.7 },
  { name: "PMI", src: "/logos/brands/pmi.png", alt: "PMI", ar: 2.65 },
  { name: "Stand Strong Fencing", src: "/logos/brands/stand-strong-fencing.png", alt: "Stand Strong Fencing", ar: 2.27 },
  { name: "STOR-X", src: "/logos/brands/stor-x.png", alt: "STOR-X", ar: 4.85 },
  { name: "Up Closets", src: "/logos/brands/up-closets.png", alt: "Up Closets", ar: 2.56 },
  { name: "Fuzz Wax Bar", src: "/logos/brands/waxbar-fuzz.jpg", alt: "Fuzz Wax Bar", ar: 2.1 },
];

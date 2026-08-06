"use client";

/** The hero's trust line.
 *
 *  **This used to carry the logo marquee too, and no longer does.** The
 *  marquee moved out to `HeroLogoStrip`, the shared component every
 *  sub-page hero uses, so the homepage and Answers now render the exact
 *  same strip from the exact same file. What stays here is the line, and
 *  it stays *inside* the hero, on the blue.
 *
 *  `relative` is load-bearing: the hero's background image and scrims are
 *  an absolutely-positioned layer, and positioned elements paint above
 *  static ones in the same stacking context. Without it this renders
 *  underneath the scrim.
 *
 *  The colour is explicit rather than `--ed-accent-text`, which resolves
 *  to #00AEEF on dark and measures 2.3:1 against this background.
 */
export default function GrowthTrustStrip({ showTrustLine = false }: { showTrustLine?: boolean }) {
  if (!showTrustLine) return null;
  return (
    <div className="relative w-full pt-4 pb-9 md:pt-6 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <p
          className="text-center uppercase"
          style={{
            /* Measured 9.7px at 390 and 10.7px at 1205, both under the
               type floor. The clamp tops out at 11.25px, so the floor
               governs at every width and this is a flat 12px. */
            fontSize: "max(var(--ed-type-floor, 12px), clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem))",
            fontWeight: 600,
            letterSpacing: "0.16em",
            color: "#9FE0F8",
          }}
        >
          Trusted by leading franchise and multi-location brands.
        </p>
      </div>
    </div>
  );
}

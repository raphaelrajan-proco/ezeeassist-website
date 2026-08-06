"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";

/** The shared logo marquee, rendered inside the hero section so the
 *  band crops at the fold.
 *
 *  The hero runs on a scrimmed photograph, so this band is transparent
 *  rather than ed-bg, and ed-on-dark pins the dark token set for
 *  LogoMarquee, which is shared with other routes and cannot be styled
 *  from here. The trust line takes an explicit colour because the dark
 *  set resolves --ed-accent-text to #00AEEF, which measures 2.3:1 on
 *  this background. */
export default function GrowthTrustStrip({ showTrustLine = false }: { showTrustLine?: boolean }) {
  return (
    /* relative is load-bearing: the hero's background image and scrims are
       an absolutely-positioned layer, and positioned elements paint above
       static ones in the same stacking context. Without it this whole
       strip renders underneath the scrim. */
    <div className="ed-on-dark relative w-full pt-4 md:pt-6">
      {showTrustLine && (
        <p
          className="mx-auto mb-4 max-w-7xl px-6 text-center uppercase md:px-12 lg:px-16"
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
      )}

      {/* One pure white band, edge to edge.

          The chips used to be individually visible on the dark hero, so
          the strip read as fifty white boxes with the hero showing through
          the gaps between them. Making the whole band white removes the
          gaps entirely: the chips become invisible against it and the
          marks read as sitting on one white strip.

          **White, not a page token.** Half these files ship an opaque
          white background, so any other colour puts a box back around
          them.

          Full-bleed by the site's own convention: this sits outside the
          `mx-auto max-w-7xl` wrapper the eyebrow uses, rather than behind
          a viewport-unit breakout, which `.theme-editorial`'s
          `overflow-x: clip` would clip anyway. */}
      <div className="ed-logo-band w-full py-3">
        <LogoMarquee />
      </div>
    </div>
  );
}

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
    <div className="ed-on-dark relative w-full pt-4 pb-10 md:pt-6 md:pb-14">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {showTrustLine && (
          <p
            className="mb-4 text-center uppercase"
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

        {/* A white strip INSIDE the container, not full-bleed.

            It sits within the page margins so the hero blue shows down
            both sides, and the wrapper's bottom padding leaves blue
            below it too. **Do not make this edge to edge and do not mask
            its edges**: both have been tried, and the point of the strip
            is that it reads as a band laid on the hero, which needs the
            hero visible around it.

            White because half these files ship an opaque white
            background; on any other colour each mark shows as a box. The
            chips inside carry no border, so on white they disappear and
            the marks read as floating. */}
        <div className="ed-logo-band w-full py-3.5">
          <LogoMarquee />
        </div>
      </div>
    </div>
  );
}

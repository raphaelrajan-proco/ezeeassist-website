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
    /* relative is load-bearing: the hero's background image and scrims are an
       absolutely-positioned layer, and positioned elements paint above static
       ones in the same stacking context. Without it this whole strip renders
       underneath the scrim. LogoMarquee has its own relative root, which is
       why the logos survived and only the trust line disappeared. */
    <div className="ed-on-dark relative w-full">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-4 pb-8 md:pt-6 md:pb-10">
        {showTrustLine && (
          <p
            className="uppercase text-center mb-4"
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
        {/* The marquee alone takes the light band, not the whole strip:
            the trust line above is #9FE0F8 on the scrimmed photograph and
            would be invisible on a light surface. Rounded, so a light
            block inside a dark hero reads as a deliberate logo bar rather
            than as a hole. See `.ed-logo-band` in globals.css for why the
            band exists at all. */}
        <div className="ed-logo-band overflow-hidden rounded-2xl px-2 py-1.5">
          <LogoMarquee />
        </div>
      </div>
    </div>
  );
}

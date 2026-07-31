"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

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
              fontSize: "clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem)",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "#9FE0F8",
            }}
          >
            Trusted by {NETWORK_SCALE.brands} brands across {NETWORK_SCALE.locations} locations
          </p>
        )}
        <LogoMarquee />
      </div>
    </div>
  );
}

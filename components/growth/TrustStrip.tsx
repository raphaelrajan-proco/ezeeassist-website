"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

/** The shared logo marquee, rendered inside the hero section so the
 *  band crops at the fold. */
export default function GrowthTrustStrip({ showTrustLine = false }: { showTrustLine?: boolean }) {
  return (
    <div className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-4 pb-8 md:pt-6 md:pb-10">
        {showTrustLine && (
          <p
            className="uppercase text-center mb-4"
            style={{
              fontSize: "clamp(0.609rem, 0.525rem + 0.19vw, 0.703rem)",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "var(--ed-accent-text)",
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

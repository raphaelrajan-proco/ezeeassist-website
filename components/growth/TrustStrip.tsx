"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

/** Coverage qualifier above the shared marquee. Rendered inside the
 *  hero section so the band crops at the fold. */
export default function GrowthTrustStrip() {
  return (
    <div className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-0 pb-10 md:pb-12">
        <p
          className="ed-fg-muted text-center text-sm md:text-base mb-4 tracking-wide"
          style={{ fontWeight: 500 }}
        >
          Running at {NETWORK_SCALE.locations} locations, for {NETWORK_SCALE.users} operators.
        </p>
        <LogoMarquee />
      </div>
    </div>
  );
}

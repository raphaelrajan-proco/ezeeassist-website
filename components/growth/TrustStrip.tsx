"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";

/** The shared logo marquee, rendered inside the hero section so the
 *  band crops at the fold. */
export default function GrowthTrustStrip() {
  return (
    <div className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-0 pb-10 md:pb-12">
        <LogoMarquee />
      </div>
    </div>
  );
}

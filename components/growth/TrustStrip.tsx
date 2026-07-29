"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";

/** Compact trust strip: the shared logo marquee, unqualified. */
export default function GrowthTrustStrip() {
  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-6 pb-10 md:pt-8 md:pb-12">
        <LogoMarquee />
      </div>
    </section>
  );
}

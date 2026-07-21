"use client";

import LogoMarquee from "@/components/sections/LogoMarquee";

/** Compact trust strip: stats label above the shared logo marquee. */
export default function GrowthTrustStrip() {
  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-6 pb-10 md:pt-8 md:pb-12">
        <p
          className="ed-fg-muted text-center text-sm md:text-base mb-6 tracking-wide"
          style={{ fontWeight: 500 }}
        >
          60+ brands. 4,500+ locations. 10,000+ users.
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

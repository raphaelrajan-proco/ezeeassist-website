"use client";

import LogoMarquee from "./LogoMarquee";

/**
 * Compact trust strip directly below the hero. Same marquee as the Proof
 * section; appearing twice on the page is intentional.
 */
export default function LogoStrip() {
  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-8 md:py-10">
        <p
          className="ed-fg-muted text-xs mb-6"
          style={{
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Trusted by leading franchise and multi-location brands
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

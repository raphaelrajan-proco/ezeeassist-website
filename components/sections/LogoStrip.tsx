"use client";

import LogoMarquee from "./LogoMarquee";

/**
 * Hero closing beat: the trust stats line + customer logo marquee,
 * merged into one moment that sits tight under the hero.
 */
export default function LogoStrip() {
  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-6 pb-10 md:pt-8 md:pb-12">
        <p
          className="ed-fg-muted text-center text-sm md:text-base mb-6 tracking-wide"
          style={{ fontWeight: 500 }}
        >
          60+ brands. 4,500+ locations. 250+ integrations. One platform.
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}

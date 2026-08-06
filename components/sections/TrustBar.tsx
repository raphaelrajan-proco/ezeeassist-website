"use client";

import { customerLogos } from "@/lib/data/customer-logos";
import { LogoTile } from "@/components/sections/LogoMarquee";

/**
 * The trust bar on the legacy `/industries/franchising` route.
 *
 * It renders `LogoTile`, the same tile the editorial marquee uses, so the
 * roster stays genuinely single-source: one edit to `customer-logos.ts`
 * changes this, the homepage hero strip and all ten sub-page strips
 * together. It used to draw its own text cards, so real logos landing
 * everywhere else would have left this page alone showing 47 grey names.
 *
 * The section chrome below is still legacy styling (hardcoded hex rather
 * than `.theme-editorial` tokens) because the route is. Migrate the whole
 * page rather than half of it.
 */
export default function TrustBar() {
  // Duplicate so the scroll loops seamlessly without visible gaps
  const track = [...customerLogos, ...customerLogos];

  return (
    <section className="w-full bg-[#F7F8FA] dark:bg-[#111111] py-14 overflow-hidden">
      {/* Label */}
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
        Trusted by leading brands
      </p>

      {/* Marquee wrapper — masks edges with a fade */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* 47 logos x 2. The duration matches the editorial marquee's 140s
            for the same roster, so the two read at the same speed. */}
        <div className="flex gap-5 w-max" style={{ animation: "marquee 140s linear infinite" }}>
          {track.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="flex-shrink-0">
              <LogoTile logo={logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

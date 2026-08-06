"use client";

import Image from "next/image";
import { useState } from "react";
import { customerLogos, type CustomerLogo } from "@/lib/data/customer-logos";

/**
 * Shared auto-scrolling customer logo marquee.
 * Seamless loop (duplicated set), edge fade masks, pauses on hover.
 *
 * **Every logo sits on a white chip, in both themes.** That is one
 * mechanism answering the three problems the logo handoff flagged, and it
 * is why the chip is not conditional:
 *
 *  1. This same component renders on three different surfaces — the
 *     homepage's scrimmed hero photograph, `ed-bg` white on sub-pages, and
 *     `ed-bg` near-black in dark mode. Most of these marks are dark ink on
 *     transparent, so on two of those three they would disappear.
 *  2. Four files are JPGs on white (Sport Clips, Corporate Cleaning Group,
 *     Fuzz Wax Bar, Fresh Burger). Without a chip they render as white
 *     rectangles wherever the band is not white.
 *  3. It gives 47 marks of wildly different aspect ratio a common frame,
 *     so the row reads as a roster rather than as jumble.
 */

/**
 * Height for a mark of aspect ratio `ar`, normalised roughly by area.
 *
 * The handoff asks for one fixed height in the 28-34 band. That reads
 * badly across this roster: aspect ratios run 1.00 to 7.59, so at a flat
 * 30px New Creations gets 228px of width and Athletic Republic gets 30,
 * and the square marks shrink to stamps beside the wordmarks. Holding
 * `h * sqrt(ar)` near constant instead keeps the marks at a similar
 * apparent SIZE, which is what the eye compares.
 *
 * `REF_AR` is the roster's typical wordmark ratio, and a mark at exactly
 * that ratio gets exactly `REF_H`. The clamp stops the two extremes from
 * running away: nothing is shorter than 22px or taller than 40px, so the
 * chip height is stable and the row never jitters.
 */
const REF_AR = 3.2;
const REF_H = 34;
const MIN_H = 22;
const MAX_H = 40;
/** Chip inner height, sized to the tallest mark plus breathing room. */
const CHIP_H = MAX_H + 20;

function logoHeight(ar: number | undefined) {
  if (!ar) return REF_H;
  return Math.round(Math.min(MAX_H, Math.max(MIN_H, REF_H * Math.sqrt(REF_AR / ar))));
}

export function LogoTile({ logo }: { logo: CustomerLogo }) {
  const [failed, setFailed] = useState(false);

  /* Three brands have no file yet. The grey pill is the requested interim
     state for them, kept in the roster so the ordering does not shift when
     the files land. */
  if (failed) {
    return (
      <span
        className="inline-flex items-center rounded-full px-4 py-1.5 text-sm whitespace-nowrap"
        style={{
          backgroundColor: "var(--ed-bg-alt)",
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-fg-muted)",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
        title={logo.alt}
      >
        {logo.name}
      </span>
    );
  }

  const h = logoHeight(logo.ar);

  return (
    <span
      className="inline-flex items-center justify-center rounded-lg px-4"
      style={{
        height: CHIP_H,
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(10,20,36,0.08)",
      }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={240}
        height={h}
        className="w-auto object-contain"
        style={{ height: h, maxWidth: 150 }}
        /* The text pill is reached only through onError, and a lazy image
           that never enters the viewport never loads, never errors, and
           leaves a zero-width tile. In a marquee most tiles start
           off-screen, so whole brands were silently dropping out of the
           strip. Eager loading makes the fallback deterministic. */
        loading="eager"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export default function LogoMarquee() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="ed-logo-marquee flex w-max items-center gap-5">
        {[...customerLogos, ...customerLogos].map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex-shrink-0">
            <LogoTile logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

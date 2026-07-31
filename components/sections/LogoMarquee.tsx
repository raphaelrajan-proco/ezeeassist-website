"use client";

import Image from "next/image";
import { useState } from "react";
import { customerLogos, type CustomerLogo } from "@/lib/data/customer-logos";

/**
 * Shared auto-scrolling customer logo marquee.
 * Seamless loop (duplicated set), edge fade masks, pauses on hover.
 * Each tile is a next/image pointing at /logos/customers/[brand].svg with
 * a quiet text-pill fallback until the real SVG lands.
 */

export function LogoTile({ logo }: { logo: CustomerLogo }) {
  const [failed, setFailed] = useState(false);

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

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={160}
      height={48}
      className="max-h-12 w-auto object-contain"
      style={{ opacity: 0.7 }}
      /* The text pill is reached only through onError, and a lazy image that
         never enters the viewport never loads, never errors, and leaves a
         zero-width tile. In a marquee most tiles start off-screen, so whole
         brands were silently dropping out of the strip. Eager loading makes
         the fallback deterministic. */
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}

export default function LogoMarquee() {
  const logos = customerLogos.filter((l) => !l.name.startsWith("Customer "));

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
      <div className="ed-logo-marquee flex w-max items-center gap-10">
        {[...logos, ...logos].map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex-shrink-0">
            <LogoTile logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

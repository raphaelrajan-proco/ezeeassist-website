"use client";

import Image from "next/image";
import { useState } from "react";
import { customerLogos, type CustomerLogo } from "@/lib/data/customer-logos";

/**
 * Shared auto-scrolling customer logo marquee.
 * Seamless loop (duplicated set), edge fade masks, pauses on hover.
 *
 * **Every slot is the same fixed box and the background is transparent.**
 * The marks float on the band rather than sitting on white chips. Each
 * logo is `object-contain` inside the box, so a 7.59:1 wordmark and a 1:1
 * square occupy the same footprint and none renders smaller than another.
 *
 * ── Why the chip is gone, and what replaced the job it did ──
 * The white chip used to solve three things at once. Two of them still
 * need solving without it:
 *
 *  1. **Dark-ink marks on dark bands.** On the homepage's scrimmed hero
 *     photograph and on `ed-bg` in dark mode, most of these marks are
 *     near-invisible. Marks with transparent art take a white-silhouette
 *     filter there, the usual answer for a logo wall on a dark band.
 *     Brand colour is lost on those two surfaces by design; the
 *     alternative is marks nobody can see.
 *  2. **Half the roster has opaque art**, 26 of 50 including four JPGs.
 *     A silhouette filter turns those into solid white rectangles, so
 *     they get a light plate on dark surfaces instead. On light surfaces
 *     neither treatment is needed: a white background is invisible on
 *     white, which is why the strip looks right there and only there.
 *
 *     **That plate is a stopgap for missing art.** Replacing a file with
 *     a transparent PNG and clearing its `opaque` flag removes it, and
 *     doing that for all 26 is what makes dark mode look intentional.
 *
 * The third job, giving mismatched marks a common frame, is now done by
 * the fixed box.
 */

/**
 * Every slot is exactly this box. Equal boxes were the point.
 *
 * **The box being equal is not enough on its own.** Aspect ratios run
 * 1.00 to 7.59, so plain `object-contain` inside a fixed box gives a
 * square mark 40x40 and a wide wordmark 152x20: the wide one covers four
 * times the area and the square ones read as shrunken. The mark is
 * therefore sized by AREA within the box, holding `h * sqrt(ar)` near
 * constant, then clamped so nothing escapes the slot.
 *
 * `REF_AR` is the roster's typical wordmark ratio, and a mark at exactly
 * that ratio gets exactly `REF_H`.
 */
const BOX_W = 168;
const BOX_H = 64;
/** Inset so marks never touch the next slot. */
const PAD = 8;

const REF_AR = 3.2;
const REF_H = 34;
const MIN_H = 18;
const MAX_H = BOX_H - PAD * 2;

function markHeight(ar: number | undefined) {
  if (!ar) return REF_H;
  return Math.round(Math.min(MAX_H, Math.max(MIN_H, REF_H * Math.sqrt(REF_AR / ar))));
}

export function LogoTile({ logo }: { logo: CustomerLogo }) {
  const [failed, setFailed] = useState(false);

  /* The pill is reached only through onError. It carries an entry whose
     art has not landed yet, holding its slot so the order never shifts. */
  if (failed) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full px-4 text-sm"
        style={{
          width: BOX_W,
          height: BOX_H,
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-fg-muted)",
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          textAlign: "center",
          lineHeight: 1.2,
        }}
        title={logo.alt}
      >
        {logo.name}
      </span>
    );
  }

  const h = markHeight(logo.ar);

  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: BOX_W, height: BOX_H, padding: PAD }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={Math.round(h * (logo.ar ?? 3))}
        height={h}
        className={logo.opaque ? "ed-logo-mark ed-logo-mark-opaque" : "ed-logo-mark"}
        /* Height drives the size; `maxWidth` is the backstop for the one
           mark wide enough to outrun the slot at its area-matched height,
           where object-contain shrinks it the rest of the way. */
        style={{ height: h, width: "auto", maxWidth: "100%", objectFit: "contain" }}
        /* A lazy image that never enters the viewport never loads, never
           errors, and leaves a zero-width tile, which silently dropped
           whole brands from the strip. Eager makes the fallback
           deterministic. */
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
      <div className="ed-logo-marquee flex w-max items-center gap-6">
        {[...customerLogos, ...customerLogos].map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex-shrink-0">
            <LogoTile logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}

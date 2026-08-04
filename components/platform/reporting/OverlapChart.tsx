"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * The three-bar overlap chart that carries §5.
 *
 * **The bar widths are the argument and must not be normalised.** Most
 * locations have open capacity. Most have a lapsed client list. Only a few
 * have both, and the "Both" bar arriving visibly shorter than the two above
 * it is the entire point of the section. Widening it for visual balance
 * would invert the claim, so the widths come in as literal percentages and
 * nothing here scales them.
 *
 * Colour separates source from intersection: the two source rows are a
 * translucent accent, the "Both" row is full strength in both label and
 * bar, with its count beside it. The count is also bold and monospace, so
 * the emphasis survives greyscale.
 *
 * Sits on a dark band, so it uses the on-dark palette from DESIGN.md §4.4.
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const TRACK = "rgba(238,242,248,0.09)";
const SOURCE_BAR = "rgba(159,224,248,0.34)";

export type OverlapRow = { label: string; width: number };

export default function OverlapChart({
  a,
  b,
  both,
  count,
  tone = "accent",
  title,
}: {
  a: OverlapRow;
  b: OverlapRow;
  both: OverlapRow;
  count: number;
  /** `warn` marks the one diagnostic question among three opportunities. */
  tone?: "accent" | "warn";
  /** Accessible name for the chart, since the bars carry the meaning. */
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [grown, setGrown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setGrown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setGrown(true);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    /* Never leave the bars at zero if the observer never fires. */
    const failsafe = setTimeout(() => setGrown(true), 2000);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  /* Warm amber rather than #B45309, which does not clear contrast on this
     band. Both are the "warning" role; only the surface differs. */
  const strong = tone === "warn" ? "#F5B26B" : ACCENT;

  const rows: { row: OverlapRow; strong: boolean; delay: number }[] = [
    { row: a, strong: false, delay: 0 },
    { row: b, strong: false, delay: 0.12 },
    { row: both, strong: true, delay: 0.24 },
  ];

  return (
    <div ref={ref} role="img" aria-label={title}>
      {rows.map(({ row, strong: isStrong, delay }) => (
        <div key={row.label} className="mb-2 flex items-center gap-3 last:mb-0">
          <span
            className="flex-none truncate"
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: isStrong ? 700 : 500,
              color: isStrong ? strong : ON_DARK_DIM,
              width: 82,
            }}
          >
            {row.label}
          </span>

          <span className="h-[9px] flex-1 overflow-hidden rounded-full" style={{ backgroundColor: TRACK }}>
            <span
              className="block h-full rounded-full"
              style={{
                width: grown ? `${row.width}%` : "0%",
                backgroundColor: isStrong ? strong : SOURCE_BAR,
                transition: reduced ? "none" : `width .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
              }}
            />
          </span>

          {/* Only the intersection carries a count; the two sources would
              just be noise beside it. */}
          <span
            className="flex-none text-right"
            style={{
              fontFamily: MONO,
              fontSize: 12.5,
              fontWeight: 700,
              width: 26,
              color: isStrong ? strong : "transparent",
              fontVariantNumeric: "tabular-nums",
            }}
            aria-hidden={!isStrong}
          >
            {isStrong ? count : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export { ON_DARK, ON_DARK_DIM, ACCENT as ON_DARK_ACCENT };

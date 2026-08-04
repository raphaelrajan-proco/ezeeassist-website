"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Check } from "lucide-react";
import { MONO } from "@/components/platform/shared";

/**
 * The hero's two-panel split: a sentence on the left, the tool it produced
 * on the right.
 *
 * **The left panel must not look like a builder.** No nodes, no canvas, no
 * dropdowns, no drag handles, not even as decoration. The whole claim of
 * this page is that you type a sentence; a reader who infers there is an
 * interface to learn has read the opposite. That is why this is a bare
 * bordered box with monospace text and a caret, and nothing else.
 *
 * The request text is deliberately the same closing-audit sentence the
 * homepage's on-demand section already puts at Store #214, 3:45pm. It is
 * a callback, not a repeat: §3's timeline runs the same twenty minutes and
 * §6 publishes the same tool. Do not renumber the store or reword the ask.
 *
 * Sits on the hero photograph, so colours are the on-photograph palette
 * from DESIGN.md §4.4 rather than the page tokens.
 */

const ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";
const ON_IMAGE_DIM = "rgba(245,237,224,0.55)";
const RULE = "rgba(245,237,224,0.16)";

const REQUEST =
  "Build a daily closing audit. Photo checklist per station, auto-score it, flag anything that fails to the coach.";

const STATIONS: { name: string; done: boolean }[] = [
  { name: "Front desk", done: true },
  { name: "Treatment rooms", done: true },
  { name: "Retail floor", done: true },
  { name: "Back of house", done: false },
];

const TYPE_MS = 40;

export default function DescribePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setStarted(true); }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    /* Never leave the panel blank if the observer never fires. */
    const failsafe = setTimeout(() => setStarted(true), 1800);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  useEffect(() => {
    if (reduced || !started || typed >= REQUEST.length) return;
    const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [reduced, started, typed]);

  const done = reduced || typed >= REQUEST.length;
  const text = reduced ? REQUEST : REQUEST.slice(0, typed);

  return (
    <div ref={ref} className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
      {/* Left: the sentence. */}
      <div
        className="flex min-h-[188px] flex-col rounded-[14px] p-5"
        style={{
          backgroundColor: "rgba(4,26,44,0.55)",
          border: `1px solid ${RULE}`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <span
          className="uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ON_IMAGE_DIM }}
        >
          What you type
        </span>
        <p
          className="mt-3.5 flex-1"
          style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.6, color: "#FFFFFF" }}
        >
          &ldquo;{text}{done && <>&rdquo;</>}
          {!reduced && (
            <span
              aria-hidden="true"
              className="ed-caret ml-0.5 inline-block"
              style={{ width: 7, height: "1.05em", backgroundColor: ACCENT, verticalAlign: "-0.18em" }}
            />
          )}
        </p>
      </div>

      {/* The claim, between the two panels. */}
      <div className="flex items-center justify-center py-1 lg:px-6">
        <span
          className="whitespace-nowrap uppercase"
          style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.13em", fontWeight: 600, color: ACCENT }}
        >
          20 minutes · no developer
        </span>
      </div>

      {/* Right: the tool that came out. Appears once the sentence is
          finished, because the order is the argument. */}
      <div
        className="flex min-h-[188px] flex-col overflow-hidden rounded-[14px]"
        style={{
          backgroundColor: "rgba(4,26,44,0.55)",
          border: `1px solid ${RULE}`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: done ? 1 : 0,
          transform: done ? "none" : "translateY(8px)",
          transition: reduced ? "none" : "opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div className="flex items-baseline justify-between gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${RULE}` }}>
          <span className="text-[14px]" style={{ color: "#FFFFFF", fontWeight: 600 }}>
            Daily closing audit
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: ACCENT, whiteSpace: "nowrap" }}>
            LIVE AT 214<span className="hidden sm:inline"> LOCATIONS</span>
          </span>
        </div>
        <div className="flex flex-col px-4 py-1">
          {STATIONS.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center gap-2.5 py-[9px]"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${RULE}` }}
            >
              {/* State is shape as well as colour: a filled tick against an
                  open ring, not two coloured dots. */}
              {s.done ? (
                <span
                  aria-hidden="true"
                  className="flex h-[15px] w-[15px] flex-none items-center justify-center rounded-full"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Check className="h-[9px] w-[9px]" strokeWidth={3.5} style={{ color: "#062334" }} />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="h-[15px] w-[15px] flex-none rounded-full"
                  style={{ border: `1.5px solid ${ON_IMAGE_DIM}` }}
                />
              )}
              <span className="flex-1 text-[13.5px]" style={{ color: s.done ? ON_IMAGE : ON_IMAGE_DIM }}>
                {s.name}
              </span>
              {!s.done && (
                <Camera className="h-3.5 w-3.5 flex-none" strokeWidth={1.75} style={{ color: ON_IMAGE_DIM }} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <span className="sr-only">
          Three of four stations complete. Back of house is outstanding and awaiting a photo.
        </span>
      </div>
    </div>
  );
}

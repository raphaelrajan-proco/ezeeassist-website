"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §4's department map: one intake point fanning out to nine departments.
 *
 * **The twenty-seven example requests are the section.** Nine department
 * labels prove nothing — a franchisee reading "Legal" learns nothing, and
 * a franchisee reading "partner terms · lease review · trademark use"
 * recognises their own week. Do not abbreviate to one example each for
 * visual tidiness.
 *
 * **The fan originates from a single point.** The visual claim is one
 * intake, nine destinations, so the entry node and its stem are drawn
 * rather than implied. Below `lg` the fan becomes a vertical stack per the
 * brief: a nine-way fan scaled to a phone is unreadable, and the argument
 * is worth more than the drawing.
 *
 * Sits on a dark band, so colours are the on-dark palette from
 * DESIGN.md §4.4.
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const RULE = "rgba(238,242,248,0.16)";

const DEPARTMENTS: { name: string; examples: string[] }[] = [
  { name: "Operations",            examples: ["Equipment down", "Supplier issue", "Staffing crisis"] },
  { name: "Marketing",             examples: ["Local promo", "Asset request", "Campaign approval"] },
  { name: "IT",                    examples: ["POS access", "System outage", "New user setup"] },
  { name: "Legal",                 examples: ["Partner terms", "Lease review", "Trademark use"] },
  { name: "Finance",               examples: ["Royalty query", "Invoice dispute", "P&L discrepancy"] },
  { name: "Real Estate",           examples: ["Lease renewal", "Site relocation", "Territory question"] },
  { name: "Training",              examples: ["Certification", "Course reset", "New hire access"] },
  { name: "Franchise Development", examples: ["Resale enquiry", "Additional unit", "Territory expansion"] },
  { name: "Supply Chain",          examples: ["Order issue", "Backorder", "Vendor pricing"] },
];

const STAGGER = 80;

export default function DepartmentMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setShown(true); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setShown(true), 2400);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  return (
    <div ref={ref}>
      {/* The single intake point. */}
      <div className="flex flex-col items-center">
        <span
          className="inline-flex items-center rounded-full px-4 py-2 uppercase"
          style={{
            fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700,
            color: ACCENT, backgroundColor: "rgba(159,224,248,0.10)",
            border: `1px solid rgba(159,224,248,0.34)`,
          }}
        >
          A franchisee asks
        </span>
        {/* The stem, then the spread. Drawn rather than implied, because
            "one intake, nine destinations" is the claim. */}
        <span aria-hidden="true" className="h-7 w-px" style={{ backgroundColor: RULE }} />
        <span aria-hidden="true" className="hidden h-px w-full lg:block" style={{ backgroundColor: RULE }} />
      </div>

      <div className="mt-0 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DEPARTMENTS.map((d, i) => (
          <div key={d.name} className="flex flex-col items-center">
            {/* Drop line from the spread rule into each card. */}
            <span aria-hidden="true" className="hidden h-5 w-px lg:block" style={{ backgroundColor: RULE }} />
            <div
              className="w-full flex-1 rounded-[12px] p-4 md:p-5"
              style={{
                backgroundColor: "rgba(238,242,248,0.04)",
                border: `1px solid ${RULE}`,
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(10px)",
                transition: reduced
                  ? "none"
                  : `opacity .45s ease ${(i * STAGGER) / 1000}s, transform .45s cubic-bezier(.22,1,.36,1) ${(i * STAGGER) / 1000}s`,
              }}
            >
              <p className="text-[15px]" style={{ color: "#FFFFFF", fontWeight: 600, letterSpacing: "-0.01em" }}>
                {d.name}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {d.examples.map((e) => (
                  <li key={e} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[8px] h-[3px] w-[3px] flex-none rounded-full" style={{ backgroundColor: ON_DARK_DIM }} />
                    <span className="text-[13px] leading-snug" style={{ color: ON_DARK }}>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

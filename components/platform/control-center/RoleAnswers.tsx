"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §4: one question, four roles, four different answers. The section that
 * carries the page.
 *
 * **Four responses, not two.** The escalation from one store to 214
 * locations is what makes the permission model legible; two roles reads as
 * a feature, four reads as a system. Do not reduce for length.
 *
 * **The HQ response carries an analytical insight the others do not get**
 * — the top-decile add-on script. That is the point: scoping governs
 * analysis, not just data access. Strip it and HQ looks like the same
 * answer with a bigger number.
 *
 * Sits on a dark band, so colours are the on-dark palette (DESIGN.md §4.4).
 */

const ACCENT = "#9FE0F8";
const ON_DARK = "rgba(238,242,248,0.92)";
const ON_DARK_DIM = "rgba(238,242,248,0.55)";
const RULE = "rgba(238,242,248,0.16)";

/* Scope widens down the list, and the bar widths say so before the copy
   does: one store, two, twelve, then the network. */
const ROLES: { role: string; scope: number; answer: string }[] = [
  {
    role: "Shift lead · Store #118", scope: 8,
    answer: "Your store: 22%, up 3 points. Target is 25%.",
  },
  {
    role: "Owner · Store #118", scope: 18,
    answer: "Your two locations: 22% and 19%. Target 25%. Attach is your largest gap to plan this quarter.",
  },
  {
    role: "Field coach · West", scope: 46,
    answer: "Your twelve locations, ranked. #052 leads at 31%, #402 trails at 14%. Territory average 23% against a network average of 26%.",
  },
  {
    role: "HQ · Network", scope: 100,
    answer: "All 214 locations. Network 26%, up 1 point. West is the weakest territory. Top decile runs a 30-second add-on script that the bottom quartile does not.",
  },
];

const STAGGER = 150;

export default function RoleAnswers() {
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
      { threshold: 0.2 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setShown(true), 2200);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  return (
    <div ref={ref}>
      {ROLES.map((r, i) => (
        <div
          key={r.role}
          className="py-6 first:pt-0"
          style={{
            borderTop: i === 0 ? "none" : `1px solid ${RULE}`,
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(10px)",
            transition: reduced
              ? "none"
              : `opacity .5s ease ${(i * STAGGER) / 1000}s, transform .5s cubic-bezier(.22,1,.36,1) ${(i * STAGGER) / 1000}s`,
          }}
        >
          <div className="lg:flex lg:gap-8">
            <div className="lg:w-[210px] lg:flex-none">
              <span
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", fontWeight: 700, color: ACCENT }}
              >
                {r.role}
              </span>
              {/* The widening scope, shown before it is read. */}
              <span aria-hidden="true" className="mt-2.5 block h-[4px] w-full max-w-[168px] overflow-hidden rounded-full" style={{ backgroundColor: "rgba(238,242,248,0.09)" }}>
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: shown ? `${r.scope}%` : "0%",
                    backgroundColor: ACCENT,
                    transition: reduced ? "none" : `width .6s cubic-bezier(.22,1,.36,1) ${(i * STAGGER) / 1000 + 0.15}s`,
                  }}
                />
              </span>
            </div>
            <p className="mt-3 min-w-0 flex-1 text-[15px] leading-relaxed lg:mt-0" style={{ color: i === ROLES.length - 1 ? "#FFFFFF" : ON_DARK }}>
              {r.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ON_DARK_DIM };

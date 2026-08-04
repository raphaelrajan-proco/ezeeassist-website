"use client";

import { useEffect, useRef, useState } from "react";
import { MONO } from "@/components/platform/shared";

/**
 * §4: the same Jan-to-Dec span checked two ways.
 *
 * **The shaded gaps are the argument.** Periodic checking leaves most of
 * the year unmeasured, so the top rule reads as mostly hatched and only
 * three dots are solid. Do not shorten the gaps for visual balance — if
 * the top line looks mostly known, the section says nothing.
 *
 * **The shaded regions are labelled `unknown`, not "risk" or "exposure".**
 * Unknown is the accurate word and the harder one: risk implies someone
 * has assessed it.
 *
 * No chase mechanics here. That is §5, and an escalation example in this
 * section collapses the distinction between continuity and closure.
 */

const ACCENT = "#0077A8";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* Q1, Q3 and a year-end pass: three checks, nine months unmeasured. */
const CHECKS = [4, 54, 96];

export default function ContinuityTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setDrawn(true); } },
      { threshold: 0.35 },
    );
    io.observe(el);
    const failsafe = setTimeout(() => setDrawn(true), 2000);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  return (
    <div ref={ref}>
      {/* Month scale, shared by both rules. */}
      <div className="mb-3 flex" aria-hidden="true">
        {MONTHS.map((m) => (
          <span
            key={m}
            className="flex-1 text-center"
            style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.06em", color: "var(--ed-fg-muted)" }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* ── Periodic ── */}
      <Row label="Periodic">
        <div className="relative h-[26px]">
          {/* Hatching runs the whole span: everything between the checks
              is unmeasured, which is nearly all of it. */}
          <div
            className="absolute inset-x-0 top-[9px] h-[8px] rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--ed-border) 0 4px, transparent 4px 9px)",
              backgroundColor: "var(--ed-card-alt)",
            }}
          />
          {CHECKS.map((pct) => (
            <span
              key={pct}
              className="absolute top-[6px] h-[14px] w-[14px] rounded-full"
              style={{
                left: `calc(${pct}% - 7px)`,
                backgroundColor: "var(--ed-fg)",
                border: "3px solid var(--ed-bg)",
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-[12px]" style={{ color: "var(--ed-fg-muted)" }}>
          <span style={{ fontFamily: MONO, letterSpacing: "0.08em" }}>unknown</span> between checks
        </p>
      </Row>

      {/* ── Continuous ── */}
      <Row label="Continuous">
        <div className="relative h-[26px]">
          <div className="absolute inset-x-0 top-[9px] h-[8px] rounded-full" style={{ backgroundColor: "var(--ed-card-alt)" }} />
          <div
            className="absolute left-0 top-[9px] h-[8px] rounded-full"
            style={{
              width: drawn ? "100%" : "0%",
              backgroundColor: ACCENT,
              transition: reduced ? "none" : "width 1.1s cubic-bezier(.22,1,.36,1) .1s",
            }}
          />
        </div>
        <p className="mt-2 text-[12px]" style={{ color: "var(--ed-fg-muted)" }}>
          Every location, against every standard, all year
        </p>
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p
        className="mb-2.5 uppercase"
        style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", fontWeight: 700, color: "var(--ed-fg-muted)" }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

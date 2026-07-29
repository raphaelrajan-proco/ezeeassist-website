"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Check, HelpCircle, CircleCheckBig } from "lucide-react";
import {
  Overline, SectionHeadline, SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED,
} from "./shared";

/**
 * Section 10: what happens when the AI should not answer.
 *
 * Geometry: one horizontal spine. Query splits at a single branch
 * point into a thick blue Resolved path and a neutral Uncertain path
 * through the ticket card. Both converge into Closed. One deliberate
 * return arc runs beneath the whole diagram back to the start.
 * All connectors are rounded-orthogonal; nodes align within their
 * branch rows.
 */
// TODO: Replace with real product screen recording

function Node({
  icon: Icon,
  label,
  accent = false,
}: {
  icon: typeof MessageSquare;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl px-4 py-3 whitespace-nowrap"
      style={{
        backgroundColor: accent ? "rgba(0,174,239,0.08)" : "var(--ed-card)",
        border: `1px solid ${accent ? "rgba(0,174,239,0.35)" : "var(--ed-rule)"}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.07)",
      }}
    >
      <Icon
        aria-hidden="true"
        className="w-4 h-4 flex-shrink-0"
        strokeWidth={1.75}
        style={{ color: accent ? "#00AEEF" : "var(--ed-fg-muted)" }}
      />
      <span className="ed-fg text-sm" style={{ fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
}

function CitedPill() {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[11px]"
      style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "#0077A8", fontWeight: 600 }}
    >
      Cited
    </span>
  );
}

function TicketCard() {
  return (
    <div className="rounded-xl p-3.5 w-[240px]" style={MOCK_SURFACE}>
      <p className="text-[12px] mb-2" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
        #18642 · Routed to Operations
      </p>
      <ul className="space-y-1">
        {["Full conversation attached", "Sources checked listed", "Store #214 · West region"].map((r) => (
          <li key={r} className="text-[11px]" style={{ color: MOCK_MUTED, lineHeight: 1.4 }}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReturnLabel() {
  return (
    <span
      className="rounded-full px-3.5 py-1.5 text-[11.5px] whitespace-nowrap"
      style={{
        backgroundColor: "rgba(0,174,239,0.08)",
        border: "1px solid rgba(0,174,239,0.35)",
        color: "#0077A8",
        fontWeight: 600,
      }}
    >
      Resolution becomes approved content
    </span>
  );
}

/* ── Desktop diagram ───────────────────────────────────── */
/* Percent coordinate system shared by the SVG (viewBox 0-100) and the
   absolutely positioned HTML nodes, so connectors and nodes cannot
   drift apart. Diagram rows: upper branch y=16, spine y=50,
   lower branch y=78, return arc y=94. */

const STROKE_BLUE = "#00AEEF";

function DesktopFlow({ inView }: { inView: boolean }) {
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  });

  return (
    <div className="relative hidden lg:block" style={{ height: "400px" }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Upper branch: Query → Resolved → converge */}
        <motion.path
          d="M 12 50 H 16 Q 19 50 19 46 V 20 Q 19 16 23 16 H 32"
          fill="none" stroke={STROKE_BLUE} strokeWidth="2.4"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(0.15)}
        />
        <motion.path
          d="M 47 16 H 82 Q 85 16 85 20 V 46 Q 85 50 87 50"
          fill="none" stroke={STROKE_BLUE} strokeWidth="2.4"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(0.45)}
        />

        {/* Lower branch: Query → Uncertain → ticket → converge */}
        <motion.path
          d="M 12 50 H 16 Q 19 50 19 54 V 74 Q 19 78 23 78 H 26"
          fill="none" stroke="var(--ed-fg-muted)" strokeOpacity="0.7" strokeWidth="1.3"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(0.35)}
        />
        <motion.path
          d="M 36 78 H 46"
          fill="none" stroke="var(--ed-fg-muted)" strokeOpacity="0.7" strokeWidth="1.3"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(0.6)}
        />
        <motion.path
          d="M 68 78 H 82 Q 85 78 85 74 V 54 Q 85 50 87 50"
          fill="none" stroke="var(--ed-fg-muted)" strokeOpacity="0.7" strokeWidth="1.3"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(0.75)}
        />

        {/* Return arc: one deliberate curve, Closed back to the start */}
        <motion.path
          d="M 93 57 V 88 Q 93 94 87 94 H 13 Q 7 94 7 88 V 58"
          fill="none" stroke={STROKE_BLUE} strokeOpacity="0.5" strokeWidth="1.4"
          strokeDasharray="4 4" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          {...draw(1.05)}
        />
        <motion.polyline
          points="5,62 7,57 9,62"
          fill="none" stroke={STROKE_BLUE} strokeOpacity="0.5" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.7 }}
        />
      </svg>

      {/* Nodes, positioned on the same percent grid */}
      <div className="absolute" style={{ left: "1%", top: "50%", transform: "translateY(-50%)" }}>
        <Node icon={MessageSquare} label="Query" />
      </div>

      <motion.div
        className="absolute flex items-center gap-2"
        style={{ left: "33%", top: "16%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Node icon={Check} label="Resolved" accent />
        <CitedPill />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: "27%", top: "78%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Node icon={HelpCircle} label="Uncertain" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: "47%", top: "78%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <TicketCard />
      </motion.div>

      <div className="absolute" style={{ left: "88%", top: "50%", transform: "translateY(-50%)" }}>
        <Node icon={CircleCheckBig} label="Closed" />
      </div>

      {/* Return-arc label pill, centered on the arc */}
      <motion.div
        className="absolute left-1/2"
        style={{ top: "94%", transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        <ReturnLabel />
      </motion.div>
    </div>
  );
}

/* ── Mobile: same order, stacked ───────────────────────── */

function MobileFlow() {
  return (
    <div className="lg:hidden space-y-4">
      <Node icon={MessageSquare} label="Query" />
      <div className="pl-4 space-y-3" style={{ borderLeft: "2px solid var(--ed-rule)" }}>
        <div className="flex items-center gap-2 flex-wrap">
          <Node icon={Check} label="Resolved" accent />
          <CitedPill />
        </div>
        <Node icon={HelpCircle} label="Uncertain, routed to the right human" />
        <TicketCard />
      </div>
      <Node icon={CircleCheckBig} label="Closed" />
      <div className="flex justify-center pt-1">
        <ReturnLabel />
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function TheHandoff() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionShell id="handoff">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>The handoff</Overline>
        <SectionHeadline>What happens when it should not answer.</SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          Confidence is scored on every query. Below the threshold, nothing is
          guessed. The question becomes a ticket carrying the full
          conversation, the sources checked, and the location context, routed
          to the person who owns that area.
        </p>
      </motion.div>

      <div ref={ref}>
        <p className="sr-only">
          Flow diagram: a query either resolves with citations, or is marked
          uncertain and routed to the right human as a ticket with the full
          conversation, the sources checked, and the location context. Both
          paths converge on closed, and the resolution returns to the system
          as approved content.
        </p>
        <DesktopFlow inView={inView} />
        <MobileFlow />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="ed-fg mt-12 text-xl md:text-2xl tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
      >
        The same question does not escalate twice.
      </motion.p>
    </SectionShell>
  );
}

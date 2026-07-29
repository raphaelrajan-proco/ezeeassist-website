"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
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
  nowrap = true,
}: {
  icon: typeof MessageSquare;
  label: string;
  accent?: boolean;
  nowrap?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-4 py-3 ${nowrap ? "whitespace-nowrap" : ""}`}
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
      style={{
        backgroundColor: "color-mix(in srgb, #00AEEF 12%, var(--ed-bg-alt))",
        color: "var(--ed-accent-text)",
        fontWeight: 600,
      }}
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
        backgroundColor: "color-mix(in srgb, #00AEEF 8%, var(--ed-bg-alt))",
        border: "1px solid rgba(0,174,239,0.35)",
        color: "var(--ed-accent-text)",
        fontWeight: 600,
      }}
    >
      Resolution becomes approved content
    </span>
  );
}

/* ── Desktop diagram ───────────────────────────────────── */
/* One fixed 800x330 pixel canvas. The SVG and the absolutely
   positioned nodes share the same pixel coordinates, and every node
   has a fixed width, so each path lands exactly on a node edge at
   every viewport. Rows: upper branch y=72, spine y=160, lower
   branch y=240, return arc y=318. */

const STROKE_BLUE = "#00AEEF";
const NEUTRAL = "var(--ed-fg-muted)";

/* Node boxes (px): [left, width, centerY]. Heights are 42px. */
const QUERY = { x: 0, w: 100, cy: 160 };
const RESOLVED = { x: 300, w: 130, cy: 72 };
const UNCERTAIN = { x: 220, w: 110, cy: 240 };
const TICKET = { x: 360, w: 240, cy: 240, h: 92 };
const CLOSED = { x: 690, w: 110, cy: 160 };

function Arrow({ points, color, opacity = 1, delay, inView, reduceMotion }: {
  points: string; color: string; opacity?: number; delay: number; inView: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.polygon
      points={points}
      style={{ fill: color, fillOpacity: opacity }}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={inView ? { opacity: 1 } : reduceMotion ? {} : { opacity: 0 }}
      transition={{ duration: 0.25, delay }}
    />
  );
}

function DesktopFlow({ inView }: { inView: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const draw = (delay: number, duration = 0.55) => (reduceMotion
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: inView ? { pathLength: 1 } : { pathLength: 0 },
        transition: { duration, ease: "easeOut" as const, delay },
      });

  return (
    <div className="relative hidden lg:block mx-auto" style={{ width: "800px", height: "330px" }}>
      <svg width="800" height="330" viewBox="0 0 800 330" className="absolute inset-0" aria-hidden="true">
        {/* Lower branch first so the shared stem reads blue on top. */}
        {/* Query → Uncertain */}
        <motion.path
          d="M 100 160 H 138 Q 150 160 150 172 V 228 Q 150 240 162 240 H 211"
          fill="none" stroke={NEUTRAL} strokeOpacity="0.65" strokeWidth="1.5"
          strokeLinecap="round" {...draw(0.35)}
        />
        <Arrow points="211,235 220,240 211,245" color={NEUTRAL} opacity={0.65}
          delay={0.9} inView={inView} reduceMotion={reduceMotion} />
        {/* Uncertain → ticket */}
        <motion.path
          d="M 330 240 H 351"
          fill="none" stroke={NEUTRAL} strokeOpacity="0.65" strokeWidth="1.5"
          strokeLinecap="round" {...draw(0.95, 0.25)}
        />
        <Arrow points="351,235 360,240 351,245" color={NEUTRAL} opacity={0.65}
          delay={1.2} inView={inView} reduceMotion={reduceMotion} />
        {/* Ticket → Closed */}
        <motion.path
          d="M 600 240 H 626 Q 638 240 638 228 V 190 Q 638 178 650 178 H 681"
          fill="none" stroke={NEUTRAL} strokeOpacity="0.65" strokeWidth="1.5"
          strokeLinecap="round" {...draw(1.25)}
        />
        <Arrow points="681,173 690,178 681,183" color={NEUTRAL} opacity={0.65}
          delay={1.8} inView={inView} reduceMotion={reduceMotion} />

        {/* Upper branch: Query → Resolved */}
        <motion.path
          d="M 100 160 H 138 Q 150 160 150 148 V 84 Q 150 72 162 72 H 291"
          fill="none" stroke={STROKE_BLUE} strokeWidth="2.5"
          strokeLinecap="round" {...draw(0.15)}
        />
        <Arrow points="291,66 300,72 291,78" color={STROKE_BLUE} delay={0.7} inView={inView} reduceMotion={reduceMotion} />
        {/* Resolved → Closed */}
        <motion.path
          d="M 430 72 H 626 Q 638 72 638 84 V 130 Q 638 142 650 142 H 681"
          fill="none" stroke={STROKE_BLUE} strokeWidth="2.5"
          strokeLinecap="round" {...draw(0.75)}
        />
        <Arrow points="681,136 690,142 681,148" color={STROKE_BLUE} delay={1.3} inView={inView} reduceMotion={reduceMotion} />

        {/* Return arc: one continuous curve, Closed back into Query. */}
        <motion.path
          d="M 745 181 V 300 Q 745 318 727 318 H 73 Q 55 318 55 300 V 190"
          fill="none" stroke={STROKE_BLUE} strokeOpacity="0.45" strokeWidth="1.5"
          strokeLinecap="round" {...draw(1.5, 0.8)}
        />
        <Arrow points="50,190 55,181 60,190" color={STROKE_BLUE} opacity={0.45}
          delay={2.3} inView={inView} reduceMotion={reduceMotion} />
      </svg>

      {/* Nodes on the same pixel grid; fixed widths meet the paths. */}
      <div className="absolute" style={{ left: QUERY.x, top: QUERY.cy, transform: "translateY(-50%)", width: QUERY.w }}>
        <Node icon={MessageSquare} label="Query" />
      </div>

      <motion.div
        className="absolute flex items-center gap-2"
        style={{ left: RESOLVED.x, top: RESOLVED.cy, transform: "translateY(-50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <div style={{ width: RESOLVED.w }}>
          <Node icon={Check} label="Resolved" accent />
        </div>
        <CitedPill />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: UNCERTAIN.x, top: UNCERTAIN.cy, transform: "translateY(-50%)", width: UNCERTAIN.w }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Node icon={HelpCircle} label="Uncertain" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{ left: TICKET.x, top: TICKET.cy, transform: "translateY(-50%)", width: TICKET.w }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.05 }}
      >
        <TicketCard />
      </motion.div>

      <div className="absolute" style={{ left: CLOSED.x, top: CLOSED.cy, transform: "translateY(-50%)", width: CLOSED.w }}>
        <Node icon={CircleCheckBig} label="Closed" />
      </div>

      {/* Return-arc label pill, centered on the arc */}
      <motion.div
        className="absolute"
        style={{ left: 400, top: 318, transform: "translate(-50%, -50%)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 2.1 }}
      >
        <ReturnLabel />
      </motion.div>
    </div>
  );
}

/* ── Mobile: same order stacked; the return arc becomes a
      vertical connector on the left edge. ────────────────── */

function MobileFlow() {
  return (
    <div className="lg:hidden relative pl-7">
      {/* Return connector: Closed back up to Query along the left edge */}
      <svg
        className="absolute left-0 top-0 h-full w-4"
        viewBox="0 0 16 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 8 96 V 6"
          fill="none" stroke={STROKE_BLUE} strokeOpacity="0.45" strokeWidth="1.5"
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: "3px", top: "8px", width: 0, height: 0,
          borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
          borderBottom: `7px solid ${STROKE_BLUE}`, opacity: 0.55,
        }}
      />
      <div className="space-y-4">
        <Node icon={MessageSquare} label="Query" />
        <div className="pl-4 space-y-3" style={{ borderLeft: "2px solid var(--ed-rule)" }}>
          <div className="flex items-center gap-2 flex-wrap">
            <Node icon={Check} label="Resolved" accent />
            <CitedPill />
          </div>
          <Node icon={HelpCircle} label="Uncertain, routed to the right human" nowrap={false} />
          <TicketCard />
        </div>
        <Node icon={CircleCheckBig} label="Closed" />
        <div className="flex justify-center pt-1">
          <ReturnLabel />
        </div>
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

      <div
        ref={ref}
        className="mx-auto max-w-4xl rounded-3xl px-6 md:px-8 py-6"
        style={{ backgroundColor: "var(--ed-bg-alt)", border: "1px solid var(--ed-rule)" }}
      >
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

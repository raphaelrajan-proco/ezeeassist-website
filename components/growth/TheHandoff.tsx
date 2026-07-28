"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Check, HelpCircle, UserRound, CircleCheckBig } from "lucide-react";
import {
  Overline, SectionHeadline, SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * Section 10: what happens when the AI should not answer. The return
 * arc from Closed back to Query is what makes this a system rather
 * than a help desk, so it is load-bearing.
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

function TicketCard() {
  return (
    <div className="rounded-xl p-3.5 w-full max-w-[230px]" style={MOCK_SURFACE}>
      <p className="text-[10px] mb-2" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
        #18642 · Routed to Operations
      </p>
      <ul className="space-y-1">
        {["Full conversation attached", "Sources checked listed", "Store #214 · West region"].map((r) => (
          <li key={r} className="text-[9.5px]" style={{ color: MOCK_MUTED, lineHeight: 1.4 }}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
          uncertain and routed to the right human with the full conversation,
          the sources checked, and the location context. Both paths end
          closed, and the resolution returns to the system as approved
          content.
        </p>

        {/* Desktop flow */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6">
            {/* Query */}
            <Node icon={MessageSquare} label="Query" />

            {/* Branches */}
            <div className="relative">
              <svg
                viewBox="0 0 100 120"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "190px" }}
                aria-hidden="true"
              >
                {/* Resolved branch, thick blue */}
                <motion.path
                  d="M 0 60 C 22 60, 26 22, 50 22 L 100 22"
                  fill="none"
                  stroke="#00AEEF"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                />
                {/* Uncertain branch, thin muted */}
                <motion.path
                  d="M 0 60 C 22 60, 26 98, 50 98 L 100 98"
                  fill="none"
                  stroke="var(--ed-fg-muted)"
                  strokeOpacity="0.55"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                />
              </svg>

              {/* Branch labels */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute left-[42%] -translate-x-1/2"
                style={{ top: "2px" }}
              >
                <div className="flex items-center gap-2">
                  <Node icon={Check} label="Resolved" accent />
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "#0077A8", fontWeight: 600 }}
                  >
                    Cited
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="absolute left-[40%] -translate-x-1/2"
                style={{ top: "128px" }}
              >
                <div className="flex items-center gap-3">
                  <Node icon={HelpCircle} label="Uncertain" />
                  <UserRound aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} style={{ color: "var(--ed-fg-muted)" }} />
                  <TicketCard />
                </div>
              </motion.div>
            </div>

            {/* Closed */}
            <Node icon={CircleCheckBig} label="Closed" />
          </div>

          {/* Return arc: Closed back to Query */}
          <div className="relative" style={{ marginTop: "-8px" }}>
            <svg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="w-full"
              style={{ height: "76px" }}
              aria-hidden="true"
            >
              <motion.path
                d="M 97 0 C 97 30, 70 36, 50 36 C 30 36, 3 30, 3 0"
                fill="none"
                stroke="#00AEEF"
                strokeOpacity="0.5"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.1, ease: "easeOut", delay: 1.2 }}
              />
              <motion.polyline
                points="7,10 3,1 -1,10"
                fill="none"
                stroke="#00AEEF"
                strokeOpacity="0.5"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 2.1 }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 2.0 }}
              className="absolute left-1/2 -translate-x-1/2 text-xs"
              style={{ bottom: "8px", color: "#0077A8", fontWeight: 600 }}
            >
              Resolution becomes approved content
            </motion.p>
          </div>
        </div>

        {/* Mobile flow */}
        <div className="lg:hidden space-y-4">
          <Node icon={MessageSquare} label="Query" />
          <div className="pl-4 space-y-3" style={{ borderLeft: "2px solid var(--ed-rule)" }}>
            <div className="flex items-center gap-2 flex-wrap">
              <Node icon={Check} label="Resolved" accent />
              <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "#0077A8", fontWeight: 600 }}>
                Cited
              </span>
            </div>
            <Node icon={HelpCircle} label="Uncertain, routed to the right human" />
            <TicketCard />
          </div>
          <Node icon={CircleCheckBig} label="Closed" />
          <div
            className="rounded-xl px-4 py-2.5 text-center"
            style={{ backgroundColor: "rgba(0,174,239,0.07)", border: "1px dashed rgba(0,174,239,0.45)" }}
          >
            <span className="text-xs" style={{ color: "#0077A8", fontWeight: 600 }}>
              Resolution becomes approved content
            </span>
          </div>
        </div>
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

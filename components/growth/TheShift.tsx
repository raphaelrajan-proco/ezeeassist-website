"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * The Shift, two beats. The opening is a market observation, never a
 * diagnosis of the reader. The resolution contrasts scattered tools
 * against one connected layer.
 */
// TODO: Replace with real product screen recording

/* ── Left panel: deliberately irregular ────────────────── */

type Marker = { x: number; y: number; w: number; rot: number; label?: string };

/** Hand-placed at odd positions and angles. A tidy grid here would
 *  contradict the message, so none of these align to anything. */
const SCATTERED: Marker[] = [
  { x: 6,  y: 12, w: 46, rot: -7,  label: "franchisee's own GPT" },
  { x: 62, y: 5,  w: 30, rot: 4 },
  { x: 38, y: 26, w: 24, rot: -3 },
  { x: 74, y: 30, w: 22, rot: 9,   label: "coach's spreadsheet macro" },
  { x: 12, y: 44, w: 28, rot: 6 },
  { x: 45, y: 52, w: 40, rot: -5,  label: "HQ's prompt doc" },
  { x: 8,  y: 68, w: 20, rot: -11 },
  { x: 68, y: 62, w: 26, rot: 2 },
  { x: 30, y: 78, w: 34, rot: 8,   label: "someone's Zapier flow" },
  { x: 78, y: 84, w: 18, rot: -6 },
];

function ScatteredPanel({ inView }: { inView: boolean }) {
  return (
    <div>
      <p className="ed-fg-muted text-xs uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 600 }}>
        Today
      </p>
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          height: "300px",
        }}
      >
        <p className="sr-only">
          Ten disconnected AI tools scattered across a franchise network with
          no connections between them, including a franchisee&apos;s own GPT,
          a coach&apos;s spreadsheet macro, HQ&apos;s prompt doc, and an
          individual Zapier flow.
        </p>
        {SCATTERED.map((m, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 + i * 0.06 }}
            className="absolute rounded-md"
            style={{
              left: `${m.x}%`,
              top: `${m.y}%`,
              width: `${m.w}%`,
              height: "22px",
              transform: `rotate(${m.rot}deg)`,
              backgroundColor: "var(--ed-bg-alt)",
              border: "1px solid var(--ed-rule)",
            }}
          >
            {m.label && (
              <span
                className="absolute whitespace-nowrap text-[9.5px]"
                style={{
                  left: "4px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--ed-fg-muted)",
                  fontWeight: 500,
                }}
              >
                {m.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Right panel: the same markers, ordered ────────────── */

const ORDERED_LABELS = [
  "franchisee's own GPT",
  "coach's spreadsheet macro",
  "HQ's prompt doc",
  "someone's Zapier flow",
];

function OrderedPanel({ inView }: { inView: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#00AEEF", fontWeight: 600 }}>
        With a system
      </p>
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col justify-center px-6"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          height: "300px",
        }}
      >
        <p className="sr-only">
          The same tools, now aligned and connected into a single EZee
          execution layer.
        </p>

        {/* Aligned markers */}
        <div className="grid grid-cols-4 gap-2.5 mb-0" aria-hidden="true">
          {ORDERED_LABELS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: -8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.08 }}
              className="rounded-md px-2 py-2 text-center"
              style={{ backgroundColor: "var(--ed-bg-alt)", border: "1px solid var(--ed-rule)" }}
            >
              <span className="block text-[9px] leading-tight" style={{ color: "var(--ed-fg-muted)", fontWeight: 500 }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Connecting lines down into the layer */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height: "40px" }} aria-hidden="true">
          {[12.5, 37.5, 62.5, 87.5].map((x, i) => (
            <motion.line
              key={x}
              x1={x} y1={0} x2={x} y2={100}
              stroke="#00AEEF"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 + i * 0.06 }}
            />
          ))}
        </svg>

        {/* The layer */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.9 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="rounded-lg py-3 text-center"
          style={{
            backgroundColor: "rgba(0,174,239,0.10)",
            border: "1px solid rgba(0,174,239,0.40)",
          }}
        >
          <span
            className="text-[12px]"
            style={{ color: "#0077A8", fontFamily: "var(--font-editorial)", fontWeight: 600 }}
          >
            EZee execution layer
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function TheShift() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionShell>
      {/* Beat one: the observation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-16 md:mb-20"
      >
        <Overline>What changed</Overline>
        <SectionHeadline>
          Everyone is building something. Nobody has a system.
        </SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          Your franchisees are independent owners, and they have already
          started using AI on their own. Different tools, different prompts,
          different data, none of it visible to you. Your brand is on every
          output and you have no admin panel.
        </p>
      </motion.div>

      {/* Beat two: the resolution */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <ScatteredPanel inView={inView} />
        <OrderedPanel inView={inView} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="ed-fg-muted mt-10 max-w-3xl text-base md:text-lg leading-relaxed"
      >
        Nothing gets replaced. Your documents, your systems, and your data
        stay exactly where they are. The playbook stops describing what to do
        and starts doing it.
      </motion.p>
    </SectionShell>
  );
}

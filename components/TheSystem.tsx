"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Users, BookOpen, Plug, MessageSquare, LifeBuoy, RefreshCw, BarChart3,
  LayoutGrid, type LucideIcon,
} from "lucide-react";
import { customerLogos } from "@/lib/data/customer-logos";

/**
 * The reveal. Sits between The Shift (nobody has a system) and the
 * capability bento (what it does). Architecture-level only: three
 * inputs converge on one layer, four outputs come from it. Feature
 * language belongs to section 07, not here.
 */

const DARK_BG = "#0A0A0A";
const DARK_CARD = "#141414";
const DARK_RULE = "#2A2A2A";
const FG = "#F5F5F5";
const MUTED = "#A1A1AA";
const BLUE = "#00AEEF";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Diagram data ──────────────────────────────────────── */

const INPUTS: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: Users,    label: "Your people",    detail: "HQ, coaches, franchisees, location staff" },
  { icon: BookOpen, label: "Your playbooks", detail: "SOPs, brand standards, training, policy" },
  { icon: Plug,     label: "Your systems",   detail: "POS, scheduling, CRM, accounting" },
];

/* Labels match the five capability modules one to one, so the eye
   carries them straight into the next section. */
const OUTPUTS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: "Answers" },
  { icon: LifeBuoy,      label: "Tickets" },
  { icon: RefreshCw,     label: "Workflows" },
  { icon: BarChart3,     label: "Reporting" },
  { icon: LayoutGrid,    label: "Apps" },
];

/* ── Diagram pieces ────────────────────────────────────── */

function InputCard({ icon: Icon, label, detail }: (typeof INPUTS)[number]) {
  return (
    <div className="rounded-2xl px-4 py-3.5" style={{ backgroundColor: DARK_CARD, border: `1px solid ${DARK_RULE}` }}>
      <div className="flex items-center gap-2.5">
        <Icon aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} style={{ color: BLUE }} />
        <p className="text-[15px]" style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
          {label}
        </p>
      </div>
      <p className="mt-1 text-[12.5px] leading-snug" style={{ color: MUTED }}>
        {detail}
      </p>
    </div>
  );
}

function OutputCard({ icon: Icon, label }: (typeof OUTPUTS)[number]) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ backgroundColor: DARK_CARD, border: `1px solid ${DARK_RULE}` }}>
      <Icon aria-hidden="true" className="w-5 h-5 flex-shrink-0" strokeWidth={1.75} style={{ color: BLUE }} />
      <p className="text-[15px]" style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
        {label}
      </p>
    </div>
  );
}

function EzeeNode() {
  return (
    <div
      className="rounded-2xl px-8 py-7 text-center"
      style={{
        backgroundColor: "#10151A",
        border: "1px solid rgba(0,174,239,0.55)",
        boxShadow: "0 0 0 1px rgba(0,174,239,0.12), 0 0 56px rgba(0,174,239,0.18)",
      }}
    >
      <p className="text-2xl whitespace-nowrap" style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 600 }}>
        EZee <span style={{ color: BLUE }}>Assist</span>
      </p>
      <p className="mt-1.5 text-[12px]" style={{ color: MUTED }}>
        The execution layer
      </p>
    </div>
  );
}

/**
 * One connector path plus its travelling pulse. `pathLength={1}`
 * normalizes the geometry so the dash math is identical for every
 * path shape. The pulse runs once: offset 1.3 → 0.15 carries the
 * 0.15-long dash onto the path at its start and off its far end,
 * with the dash fully outside the path at both rest states.
 */
function PulsePath({
  d, run, delay, reduceMotion,
}: {
  d: string; run: boolean; delay: number; reduceMotion: boolean;
}) {
  return (
    <>
      <path d={d} fill="none" stroke={BLUE} strokeOpacity="0.35" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {!reduceMotion && (
        <motion.path
          d={d}
          fill="none"
          stroke={BLUE}
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray="0.15 1"
          initial={{ strokeDashoffset: 1.3 }}
          animate={run ? { strokeDashoffset: 0.15 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay }}
        />
      )}
    </>
  );
}

/** Curves for the desktop connectors, viewBox 0 0 100 100, stretched. */
const IN_PATHS = [
  "M0,17 C45,17 55,50 100,50",
  "M0,50 C45,50 55,50 100,50",
  "M0,83 C45,83 55,50 100,50",
];
const OUT_PATHS = [
  "M0,50 C45,50 55,10 100,10",
  "M0,50 C45,50 55,30 100,30",
  "M0,50 C45,50 55,50 100,50",
  "M0,50 C45,50 55,70 100,70",
  "M0,50 C45,50 55,90 100,90",
];

/* ── Section ───────────────────────────────────────────── */

export default function TheSystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="the-system" className="w-full scroll-mt-24" style={{ backgroundColor: DARK_BG }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[34fr_62fr] gap-10 lg:gap-12 items-center">
          {/* Copy and credibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <p className="text-sm uppercase tracking-[0.2em] mb-6" style={{ color: BLUE, fontWeight: 500 }}>
              The system
            </p>
            <h2
              className="leading-[1.05] tracking-[-0.03em]"
              style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500, fontSize: "clamp(2rem, 1.1rem + 1.9vw, 3rem)" }}
            >
              EZee Assist is that system.
            </h2>
            <p className="mt-5 text-lg md:text-xl leading-snug" style={{ color: MUTED }}>
              Your people, your playbooks, and your systems on one layer.
            </p>

            {/* Credibility strip */}
            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${DARK_RULE}` }}>
              <p className="text-sm" style={{ color: FG, fontWeight: 500 }}>
                250+ native integrations · 8 channels · nothing migrates
              </p>
              {/* TODO: swap for real customer logo SVGs once they land. */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5" aria-hidden="true">
                {customerLogos.slice(0, 6).map((l) => (
                  <span key={l.name} className="text-[13px] whitespace-nowrap" style={{ color: MUTED, fontWeight: 500 }}>
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Architecture diagram */}
          <div ref={ref}>
            <p className="sr-only">
              Architecture diagram. Three inputs feed one layer: your people
              (HQ, coaches, franchisees, location staff), your playbooks
              (SOPs, brand standards, training, policy), and your systems
              (POS, scheduling, CRM, accounting). They converge on EZee
              Assist, the execution layer. Five outputs come from it:
              answers, tickets, workflows, reporting, and apps.
            </p>

            {/* Desktop: three inputs, connectors, node, connectors, five outputs */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="hidden lg:grid grid-cols-[1fr_3.5rem_auto_3.5rem_1fr] items-stretch"
            >
              <div className="flex flex-col justify-between gap-3">
                {INPUTS.map((c) => <InputCard key={c.label} {...c} />)}
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                {IN_PATHS.map((d) => (
                  <PulsePath key={d} d={d} run={inView} delay={0} reduceMotion={reduceMotion} />
                ))}
              </svg>
              <div className="flex items-center">
                <EzeeNode />
              </div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                {OUT_PATHS.map((d) => (
                  <PulsePath key={d} d={d} run={inView} delay={0.6} reduceMotion={reduceMotion} />
                ))}
              </svg>
              <div className="flex flex-col justify-between gap-2">
                {OUTPUTS.map((c) => <OutputCard key={c.label} {...c} />)}
              </div>
            </motion.div>

            {/* Below lg: stacked with vertical connectors */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="lg:hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {INPUTS.map((c) => <InputCard key={c.label} {...c} />)}
              </div>
              <div className="flex justify-center">
                <svg viewBox="0 0 10 100" preserveAspectRatio="none" className="h-10 w-2.5">
                  <PulsePath d="M5,0 L5,100" run={inView} delay={0} reduceMotion={reduceMotion} />
                </svg>
              </div>
              <div className="flex justify-center">
                <EzeeNode />
              </div>
              <div className="flex justify-center">
                <svg viewBox="0 0 10 100" preserveAspectRatio="none" className="h-10 w-2.5">
                  <PulsePath d="M5,0 L5,100" run={inView} delay={0.6} reduceMotion={reduceMotion} />
                </svg>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OUTPUTS.map((c) => <OutputCard key={c.label} {...c} />)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

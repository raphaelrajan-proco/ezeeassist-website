"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Users, BookOpen, Plug, MessageSquare, RefreshCw, ShieldCheck, BarChart3,
  type LucideIcon,
} from "lucide-react";
import { AnimatedValue } from "@/components/growth/shared";
import { NETWORK_SCALE, networkScaleNumber } from "@/lib/data/network-scale";

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
  { icon: Plug,     label: "Your systems",   detail: "250+ integrations across POS, scheduling, CRM, accounting" },
];

const OUTPUTS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare, label: "Answers on every channel" },
  { icon: RefreshCw,     label: "Work that runs itself" },
  { icon: ShieldCheck,   label: "Compliance that holds" },
  { icon: BarChart3,     label: "Visibility for leadership" },
];

const STATS: { end: number; suffix?: string; label: string }[] = [
  { end: 250,  suffix: "+", label: "Integrations" },
  { end: 8,               label: "Channels covered" },
  { end: networkScaleNumber(NETWORK_SCALE.locations), suffix: "+", label: "Locations live" },
  { end: 1,               label: "Platform for all of it" },
];

/* ── Diagram pieces ────────────────────────────────────── */

function InputCard({ icon: Icon, label, detail }: (typeof INPUTS)[number]) {
  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: DARK_CARD, border: `1px solid ${DARK_RULE}` }}>
      <Icon aria-hidden="true" className="w-5 h-5 mb-3" strokeWidth={1.75} style={{ color: BLUE }} />
      <p className="text-base mb-1" style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
        {label}
      </p>
      <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
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
  "M0,50 C45,50 55,13 100,13",
  "M0,50 C45,50 55,38 100,38",
  "M0,50 C45,50 55,62 100,62",
  "M0,50 C45,50 55,87 100,87",
];

/* ── Section ───────────────────────────────────────────── */

export default function TheSystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="the-system" className="w-full scroll-mt-24" style={{ backgroundColor: DARK_BG }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-28 lg:py-36">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-3xl mb-16 md:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: BLUE, fontWeight: 500 }}>
            The system
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em]"
            style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500 }}
          >
            EZee Assist is that system.
          </h2>
          <p className="mt-6 text-lg md:text-xl leading-relaxed" style={{ color: MUTED }}>
            One layer connecting the people who run your network, the
            playbooks they work from, and the tools they already use.
          </p>
          <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
            HQ publishes the standard once. Coaches see what is happening
            across every location. Franchisees get answers and act on them
            without waiting.
          </p>
        </motion.div>

        {/* Diagram */}
        <div ref={ref}>
          <p className="sr-only">
            Architecture diagram. Three inputs feed one layer: your people
            (HQ, coaches, franchisees, location staff), your playbooks
            (SOPs, brand standards, training, policy), and your systems
            (250 plus integrations across POS, scheduling, CRM, and
            accounting). They converge on EZee Assist, the execution
            layer. Four outputs come from it: answers on every channel,
            work that runs itself, compliance that holds, and visibility
            for leadership.
          </p>

          {/* Desktop: three inputs, connectors, node, connectors, four outputs */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="hidden lg:grid grid-cols-[1fr_5rem_auto_5rem_1fr] items-stretch"
          >
            <div className="flex flex-col justify-between gap-4">
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
            <div className="flex flex-col justify-between gap-3">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OUTPUTS.map((c) => <OutputCard key={c.label} {...c} />)}
            </div>
          </motion.div>
        </div>

        {/* Stat band */}
        <div className="mt-16 md:mt-20 pt-10" style={{ borderTop: `1px solid #1F1F1F` }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              >
                <p
                  className="text-4xl md:text-5xl tracking-[-0.03em]"
                  style={{ color: FG, fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1 }}
                >
                  <AnimatedValue end={s.end} suffix={s.suffix ?? ""} inView={inView} />
                </p>
                <p className="mt-2.5 text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTED, fontWeight: 600 }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BookOpen, TrendingUp, Cable, ChevronDown, type LucideIcon } from "lucide-react";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * What Powers It: three source streams (knowledge, performance data,
 * systems) converge into the EZee AI node, which branches into four
 * outputs. The convergence is the core differentiation.
 */
// TODO: Replace with real product screen recording

type Stream = {
  icon: LucideIcon;
  title: string;
  caption: string;
  pills: string[];
};

const STREAMS: Stream[] = [
  {
    icon: BookOpen,
    title: "Your knowledge",
    caption: "What good looks like.",
    pills: ["Operating manual", "Brand standards", "Training video", "Historical tickets"],
  },
  {
    icon: TrendingUp,
    title: "Your performance data",
    caption: "What is actually happening.",
    pills: ["Sales vs target", "Reviews and ratings", "Labor and scheduling", "Retention", "Compliance status"],
  },
  {
    icon: Cable,
    title: "Your systems",
    caption: "Where the work gets done.",
    pills: ["POS", "CRM", "ERP", "LMS", "Accounting", "Comms"],
  },
];

const OUTPUTS = ["Answers", "Coaching briefs", "Automated work", "Performance signals"];

/** Three-into-one connector band. Paths span the band height only, so
 *  they meet the column bottoms (y=0) and the node top (y=100) cleanly. */
function ConvergeBand({ visible, pulse }: { visible: boolean; pulse: boolean }) {
  const xs = [16.6, 50, 83.4];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: "72px" }}
      aria-hidden="true"
    >
      {xs.map((x, i) => {
        const d = `M ${x} 0 C ${x} 45, 50 55, 50 100`;
        return (
          <g key={x}>
            <motion.path
              d={d}
              fill="none"
              stroke="var(--ed-accent)"
              strokeOpacity="0.4"
              strokeWidth="1.2"
              strokeDasharray="3 4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 + i * 0.2 }}
            />
            <motion.circle
              cx={x} cy={0} r="1.5" fill="var(--ed-accent)"
              initial={{ opacity: 0 }} animate={visible ? { opacity: 0.6 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.2 }}
            />
            {pulse && visible && (
              <circle r="1.6" fill="#00AEEF">
                <animateMotion dur="3.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
      <motion.circle
        cx={50} cy={100} r="2" fill="var(--ed-accent)"
        initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.9 }}
      />
    </svg>
  );
}

/** One-into-four connector band from the node down to the output chips. */
function BranchBand({ visible }: { visible: boolean }) {
  const xs = [12.5, 37.5, 62.5, 87.5];
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: "56px" }}
      aria-hidden="true"
    >
      {xs.map((x, i) => {
        const d = `M 50 0 C 50 45, ${x} 55, ${x} 100`;
        return (
          <motion.path
            key={x}
            d={d}
            fill="none"
            stroke="var(--ed-accent)"
            strokeOpacity="0.35"
            strokeWidth="1.1"
            strokeDasharray="3 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 + i * 0.1 }}
          />
        );
      })}
    </svg>
  );
}

function StreamColumn({ stream, index, inView }: { stream: Stream; index: number; inView: boolean }) {
  const Icon = stream.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className="rounded-2xl p-5 ed-card"
      style={{ border: "1px solid var(--ed-rule)" }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(0,174,239,0.10)" }}>
          <Icon aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
        </span>
        <p className="ed-fg text-sm" style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}>
          {stream.title}
        </p>
      </div>
      <p className="ed-fg-muted text-xs mb-4">{stream.caption}</p>
      <div className="flex flex-wrap gap-1.5">
        {stream.pills.map((p) => (
          <span
            key={p}
            className="rounded-full px-2.5 py-1 text-[11px]"
            style={{ backgroundColor: "var(--ed-bg-alt)", border: "1px solid var(--ed-rule)", color: "var(--ed-fg)", fontWeight: 500 }}
          >
            {p}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function EzeeNode() {
  return (
    <div
      className="ed-cta-pulse rounded-2xl px-7 py-4 text-center"
      style={{ backgroundColor: "#0A0A0A", border: "1px solid rgba(0,174,239,0.55)", boxShadow: "0 0 0 6px rgba(0,174,239,0.08)" }}
    >
      <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: "#00AEEF", fontWeight: 600 }}>
        The Engine
      </p>
      <p className="text-xl" style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
        EZee AI
      </p>
    </div>
  );
}

function OutputChip({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-4 py-2 text-xs text-center"
      style={{ backgroundColor: "rgba(0,174,239,0.10)", border: "1px solid rgba(0,174,239,0.30)", color: "#0077A8", fontFamily: "var(--font-editorial)", fontWeight: 600 }}
    >
      {label}
    </span>
  );
}

export default function WhatPowersIt() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const diagRef = useRef(null);
  const diagInView = useInView(diagRef, { once: true, margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const show = reduceMotion ? true : diagInView;

  return (
    <SectionShell id="what-powers-it">
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mb-14 md:mb-16"
      >
        <Overline>What Powers It</Overline>
        <SectionHeadline>
          Knowledge, performance data, and systems. Working together, not
          separately.
        </SectionHeadline>
        <p className="ed-fg-muted mt-8 text-base md:text-lg leading-relaxed">
          Most AI reads your documents. Coaching requires all three.
        </p>
      </motion.div>

      <div ref={diagRef}>
        {/* ── Desktop convergence ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 gap-5 items-start">
            {STREAMS.map((s, i) => (
              <StreamColumn key={s.title} stream={s} index={i} inView={diagInView} />
            ))}
          </div>

          <ConvergeBand visible={show} pulse={!reduceMotion} />

          <div className="flex justify-center">
            <EzeeNode />
          </div>

          <BranchBand visible={show} />

          <div className="grid grid-cols-4 gap-3">
            {OUTPUTS.map((o, i) => (
              <motion.div
                key={o}
                initial={{ opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 + i * 0.1 }}
                className="flex"
              >
                <div className="flex-1"><OutputChip label={o} /></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: stacked with chevrons ── */}
        <div className="md:hidden">
          <div className="space-y-4">
            {STREAMS.map((s, i) => (
              <StreamColumn key={s.title} stream={s} index={i} inView={diagInView} />
            ))}
          </div>
          <div className="flex justify-center py-3">
            <ChevronDown aria-hidden="true" className="w-5 h-5" style={{ color: "#00AEEF" }} />
          </div>
          <div className="flex justify-center">
            <EzeeNode />
          </div>
          <div className="flex justify-center py-3">
            <ChevronDown aria-hidden="true" className="w-5 h-5" style={{ color: "#00AEEF" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {OUTPUTS.map((o) => (
              <OutputChip key={o} label={o} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

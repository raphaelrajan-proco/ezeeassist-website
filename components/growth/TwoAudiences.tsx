"use client";

import { motion } from "framer-motion";
import {
  Overline, SectionHeadline, SectionShell, GradientFrame,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * Two audiences, one system. HQ builds it, franchisees build on it.
 * The creation right in the right column is the differentiated claim.
 */
// TODO: Replace with real product screen recording

/* ── HQ mockup: policy toggles ─────────────────────────── */

const POLICIES = [
  { label: "Approve actions before execution", on: true },
  { label: "Role-based content access",        on: true },
  { label: "Location-level permissions",       on: true },
  { label: "Franchisee-built tools",           on: false },
];

function HqMockup() {
  return (
    <GradientFrame>
      <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
        <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <span className="text-[13px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>Policies</span>
          <span className="text-[12px] rounded-full px-2 py-1" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: "#15803D", fontWeight: 700 }}>
            Published to 42 locations
          </span>
        </div>
        <div className="p-2.5 space-y-1.5">
          {POLICIES.map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-between gap-3 rounded-lg px-3.5 py-3"
              style={{ backgroundColor: "rgba(10,10,10,0.025)", border: `1px solid ${MOCK_HAIRLINE}` }}
            >
              <span className="text-[14px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>{p.label}</span>
              <span
                aria-hidden="true"
                className="flex items-center h-5 w-9 rounded-full flex-shrink-0 px-0.5"
                style={{ backgroundColor: p.on ? "#00AEEF" : "rgba(10,10,10,0.14)", justifyContent: p.on ? "flex-end" : "flex-start" }}
              >
                <span className="block h-4 w-4 rounded-full bg-white" />
              </span>
              <span className="sr-only">{p.on ? "enabled" : "disabled"}</span>
            </div>
          ))}
        </div>
      </div>
    </GradientFrame>
  );
}

/* ── Franchisee mockup: prompt box + saved tools ───────── */

function FranchiseeMockup() {
  return (
    <GradientFrame>
      <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
        <div className="px-3 py-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <span className="text-[13px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>Store #214</span>
        </div>
        <div className="p-2.5">
          {/* Prompt box */}
          <div
            className="rounded-lg px-2.5 py-2 mb-2.5"
            style={{ backgroundColor: "rgba(10,10,10,0.03)", border: `1px solid ${MOCK_HAIRLINE}` }}
          >
            <span className="text-[14px]" style={{ color: MOCK_MUTED }}>Ask, run, or build something</span>
          </div>

          <p className="text-[11px] uppercase tracking-[0.12em] mb-1.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
            Saved tools
          </p>
          <div className="space-y-1.5">
            {[
              { name: "My weekly staffing view", by: "built by Store #214", mine: true },
              { name: "Closing audit", by: "published by HQ", mine: false },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-lg px-3.5 py-3"
                style={{
                  backgroundColor: t.mine ? "rgba(0,174,239,0.07)" : "rgba(10,10,10,0.025)",
                  border: `1px solid ${t.mine ? "rgba(0,174,239,0.25)" : MOCK_HAIRLINE}`,
                }}
              >
                <p className="text-[14px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>{t.name}</p>
                <p className="text-[12.5px] mt-1" style={{ color: t.mine ? "#0077A8" : MOCK_MUTED, fontWeight: t.mine ? 700 : 500 }}>
                  {t.by}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GradientFrame>
  );
}

/* ── Column ────────────────────────────────────────────── */

function AudienceColumn({
  title,
  verbs,
  lines,
  mockup,
  delay,
}: {
  title: string;
  verbs: string[];
  lines: string[];
  mockup: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className="rounded-3xl p-7 md:p-8 flex flex-col"
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <h3
        className="ed-fg text-xl md:text-2xl tracking-[-0.02em] mb-4"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
      >
        {title}
      </h3>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {verbs.map((v) => (
          <span
            key={v}
            className="rounded-full px-3 py-1 text-xs"
            style={{
              backgroundColor: "rgba(0,174,239,0.08)",
              border: "1px solid rgba(0,174,239,0.25)",
              color: "#0077A8",
              fontWeight: 600,
            }}
          >
            {v}
          </span>
        ))}
      </div>

      <ul className="space-y-3">
        {lines.map((l) => (
          <li key={l} className="ed-fg-muted text-base leading-relaxed">
            {l}
          </li>
        ))}
      </ul>

      <div className="flex-1">{mockup}</div>
    </motion.div>
  );
}

export default function TwoAudiences() {
  return (
    <SectionShell id="two-audiences">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>Adoption</Overline>
        <SectionHeadline>HQ builds it. Franchisees build on it.</SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AudienceColumn
          title="HQ and coaches"
          verbs={["Build", "Govern", "Monitor"]}
          lines={[
            "Publish the playbooks and standards every location works from.",
            "Set who can see what, and what runs without a human.",
            "Watch adoption, gaps, and outcomes across the network.",
          ]}
          mockup={<HqMockup />}
          delay={0}
        />
        <AudienceColumn
          title="Franchisees and their teams"
          verbs={["Ask", "Run", "Build"]}
          lines={[
            "Get answers in the channel they already use, at the hour they actually work.",
            "Trigger approved workflows without waiting on HQ.",
            "Build their own reports and tools inside the guardrails HQ set.",
          ]}
          mockup={<FranchiseeMockup />}
          delay={0.12}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="ed-fg mt-10 text-center text-xl md:text-2xl tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
      >
        Same platform. Same guardrails. Different doors.
      </motion.p>
    </SectionShell>
  );
}

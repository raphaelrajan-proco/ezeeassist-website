"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

/**
 * Trust and control. Dark regardless of theme. One tabbed control
 * centre covering policies, permissions, the human-in-the-loop
 * settings, the activity log, security posture, and model choice.
 * The HQ / franchisee duality closes the section.
 *
 * Boundary: capability module 02 shows ticketing as a capability, the
 * ticket itself routed to a human with context. This section's
 * human-in-the-loop tab shows ticketing as governance, the threshold
 * and the gates that decide when that happens. Neither renders the
 * other's artifact.
 */

const FG = "#F5EDE0";
const MUTED = "#A89B86";
const CARD = "#141414";
const RULE = "#2A2A2A";
const BLUE = "#00AEEF";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Shared panel chrome ───────────────────────────────── */

function Panel({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: CARD, border: `1px solid ${RULE}`, boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.35)" }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTED, fontWeight: 600 }}>
          {title}
        </span>
        {meta && <span className="text-[11px]" style={{ color: MUTED }}>{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function Row({ children, last = false }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-2.5"
      style={last ? undefined : { borderBottom: "1px solid #1D1D1D" }}
    >
      {children}
    </div>
  );
}

function Pill({ tone, children }: { tone: "auto" | "gate" | "neutral"; children: React.ReactNode }) {
  const styles = {
    auto:    { backgroundColor: "rgba(22,163,74,0.14)", color: "#4ADE80" },
    gate:    { backgroundColor: "rgba(0,174,239,0.14)", color: BLUE },
    neutral: { backgroundColor: "rgba(245,237,224,0.08)", color: MUTED },
  }[tone];
  return (
    <span className="rounded-full px-2.5 py-0.5 text-[11px] whitespace-nowrap flex-shrink-0" style={{ ...styles, fontWeight: 700 }}>
      {children}
    </span>
  );
}

/* ── 1 Policies ────────────────────────────────────────── */

const POLICIES = [
  { action: "Answer from approved sources",     mode: "auto" as const },
  { action: "Open a compliance task",           mode: "auto" as const },
  { action: "Run a scheduled workflow",         mode: "auto" as const },
  { action: "Send an offer to a client list",   mode: "gate" as const },
  { action: "Reply publicly to a review",       mode: "gate" as const },
];

function PoliciesPanel() {
  return (
    <Panel title="Policy set" meta="Applies to every location">
      {POLICIES.map((p, i) => (
        <Row key={p.action} last={i === POLICIES.length - 1}>
          <span className="text-[13.5px] min-w-0" style={{ color: FG }}>{p.action}</span>
          <Pill tone={p.mode}>{p.mode === "auto" ? "Runs on its own" : "Waits for approval"}</Pill>
        </Row>
      ))}
    </Panel>
  );
}

/* ── 2 Permissions ─────────────────────────────────────── */

const CAPS = ["Ask", "Run", "Build", "Publish"];
const ROLES: { role: string; grants: boolean[] }[] = [
  { role: "HQ",          grants: [true, true, true, true] },
  { role: "Coach",       grants: [true, true, true, false] },
  { role: "Franchisee",  grants: [true, true, true, false] },
  { role: "Location staff", grants: [true, false, false, false] },
];

function PermissionsPanel() {
  return (
    <Panel title="Permission model" meta="Scoped by location and region">
      <div className="px-4 py-2.5" style={{ borderBottom: "1px solid #1D1D1D" }}>
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-2">
          <span />
          {CAPS.map((c) => (
            <span key={c} className="text-[11px] text-center" style={{ color: MUTED, fontWeight: 600 }}>{c}</span>
          ))}
        </div>
      </div>
      {ROLES.map((r, i) => (
        <div
          key={r.role}
          className="px-4 py-2.5"
          style={i === ROLES.length - 1 ? undefined : { borderBottom: "1px solid #1D1D1D" }}
        >
          <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] gap-2 items-center">
            <span className="text-[13px] truncate" style={{ color: FG }}>{r.role}</span>
            {r.grants.map((g, gi) => (
              <span key={gi} className="flex justify-center">
                {g
                  ? <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} style={{ color: BLUE }} />
                  : <Minus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.5} style={{ color: "#3F3F46" }} />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Panel>
  );
}

/* ── 3 Human in the loop ───────────────────────────────── */
/* Governance only: where the line sits and what needs a signature.
   The ticket artifact itself belongs to capability module 02. */

const GATES = [
  "Anything that spends money",
  "Anything a customer will see",
  "Anything outside the approved playbook",
];

function HumanLoopPanel() {
  return (
    <Panel title="Confidence and gates" meta="Set by HQ">
      <div className="px-4 py-4" style={{ borderBottom: "1px solid #1D1D1D" }}>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[13px]" style={{ color: FG }}>Answer threshold</span>
          <span className="text-[13px]" style={{ color: BLUE, fontWeight: 700 }}>85%</span>
        </div>
        <div className="relative h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(245,237,224,0.10)" }} aria-hidden="true">
          <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: "85%", backgroundColor: BLUE }} />
          <span className="absolute -top-1 h-3.5 w-3.5 rounded-full" style={{ left: "calc(85% - 7px)", backgroundColor: BLUE, border: "2px solid #141414" }} />
        </div>
        <p className="mt-2.5 text-[12px]" style={{ color: MUTED }}>
          Below the threshold it does not answer. The question goes to a
          person instead.
        </p>
      </div>
      <div className="px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.14em] mb-2" style={{ color: MUTED, fontWeight: 700 }}>
          Always needs a signature
        </p>
        <ul className="space-y-1.5">
          {GATES.map((g) => (
            <li key={g} className="flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: BLUE }} />
              <span className="text-[13px]" style={{ color: FG }}>{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

/* ── 4 Activity log ────────────────────────────────────── */
// TODO: Replace with real product screen recording

const LOG = [
  { t: "09:41", body: "Store #214 · answer served · cited SUMMER-PROMO-GUIDE.PDF", hl: true },
  { t: "09:42", body: "workflow run · nightly compliance sweep", hl: false },
  { t: "09:44", body: "app deployed · closing audit · 214 locations", hl: false },
  { t: "09:47", body: "approval requested · reactivation offer · Store #331", hl: false },
];

function ActivityLogPanel() {
  return (
    <Panel title="Activity log" meta="Live">
      {LOG.map((row, i) => (
        <motion.div
          key={row.t}
          initial={false}
          whileInView={row.hl ? { backgroundColor: ["rgba(0,174,239,0)", "rgba(0,174,239,0.12)", "rgba(0,174,239,0)"] } : {}}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, times: [0, 0.35, 1], delay: 0.5 }}
          className="flex items-baseline gap-3 px-4 py-2.5"
          style={i === LOG.length - 1 ? undefined : { borderBottom: "1px solid #1D1D1D" }}
        >
          <span className="text-[12px] font-mono flex-shrink-0" style={{ color: MUTED }}>{row.t}</span>
          <span className="text-[13px] font-mono truncate" style={{ color: FG }}>{row.body}</span>
        </motion.div>
      ))}
    </Panel>
  );
}

/* ── 5 Security posture ────────────────────────────────── */
// TODO: blocking before publish. Supply real security posture, either "SOC 2 Type II audit in progress, report expected [date]" or an honest alternative, plus the pentest firm if we name one.

const POSTURE = [
  "SSO and SAML",
  "Encrypted in transit and at rest",
  "Dedicated infrastructure per customer",
  "Never used to train a third-party model",
];

function SecurityPanel() {
  return (
    <Panel title="Security posture" meta="Per customer">
      <div className="px-4 py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {POSTURE.map((p) => (
          <div
            key={p}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
            style={{ backgroundColor: "rgba(245,237,224,0.03)", border: `1px solid ${RULE}` }}
          >
            <Check aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={3} style={{ color: BLUE }} />
            <span className="text-[13px]" style={{ color: FG }}>{p}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ── 6 Model choice ────────────────────────────────────── */

const MODELS = [
  { name: "Claude", active: true },
  { name: "GPT", active: false },
  { name: "Gemini", active: false },
  { name: "Llama", active: false },
];

function ModelPanel() {
  return (
    <Panel title="Model choice" meta="Swap without rebuilding">
      <div className="px-4 py-3.5">
        <div className="flex flex-wrap gap-2 mb-3">
          {MODELS.map((m) => (
            <span
              key={m.name}
              className="rounded-full px-3 py-1.5 text-[12.5px]"
              style={
                m.active
                  ? { backgroundColor: "rgba(0,174,239,0.14)", border: `1px solid rgba(0,174,239,0.45)`, color: BLUE, fontWeight: 700 }
                  : { backgroundColor: "rgba(245,237,224,0.04)", border: `1px solid ${RULE}`, color: MUTED, fontWeight: 500 }
              }
            >
              {m.name}
              {m.active && " · in use"}
            </span>
          ))}
        </div>
        <p className="text-[12.5px]" style={{ color: MUTED }}>
          Model-agnostic by design. Your workflows, permissions, and
          sources stay exactly as they are when the model underneath
          changes.
        </p>
      </div>
    </Panel>
  );
}

/* ── Tabs ──────────────────────────────────────────────── */

const TABS = [
  {
    id: "policies",
    label: "Policies",
    body: "Define what runs without a human and what waits for approval. Set it once at HQ, applied at every location.",
    panel: <PoliciesPanel />,
  },
  {
    id: "permissions",
    label: "Permissions",
    body: "Granular by capability. This role builds workflows, that role only runs them. Scoped by location and by region.",
    panel: <PermissionsPanel />,
  },
  {
    id: "human",
    label: "Human in the loop",
    body: "Confidence is scored on every question, and you set the line it has to clear. Some actions need a signature no matter how confident it is.",
    panel: <HumanLoopPanel />,
  },
  {
    id: "log",
    label: "Activity log",
    body: "Questions asked, actions taken, workflows run, apps deployed. AI activity that used to be invisible to HQ shows up in the log.",
    panel: <ActivityLogPanel />,
  },
  {
    id: "security",
    label: "Security posture",
    body: "Your content stays yours. Each customer runs on their own infrastructure, and nothing is handed to a third-party model to learn from.",
    panel: <SecurityPanel />,
  },
  {
    id: "model",
    label: "Model choice",
    body: "No lock-in to one vendor's roadmap. Swap the underlying model without rebuilding a single workflow.",
    panel: <ModelPanel />,
  },
] as const;

/* ── Section ───────────────────────────────────────────── */

export default function TrustAndControl() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("policies");
  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <section id="trust" className="relative w-full overflow-hidden scroll-mt-24" style={{ backgroundColor: "#0A0A0A" }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(245,237,224,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="mb-8 md:mb-10"
        >
          {/* Hard two-line cap: the clamp maximum is set so this headline
              never reaches a third line at any width. */}
          <h2
            className="leading-[1.05] tracking-[-0.03em] max-w-4xl"
            style={{
              color: FG,
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              fontSize: "clamp(1.875rem, 1.1rem + 1.6vw, 2.625rem)",
              textWrap: "balance",
            }}
          >
            Ungoverned AI is brand risk. This is the layer that removes it.
          </h2>
        </motion.div>

        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Control centre">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className="rounded-full px-4 py-2 text-sm transition-colors"
              style={{
                backgroundColor: tab === t.id ? "rgba(0,174,239,0.12)" : CARD,
                border: `1px solid ${tab === t.id ? "rgba(0,174,239,0.45)" : RULE}`,
                color: tab === t.id ? BLUE : MUTED,
                fontWeight: 500,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div role="tabpanel" className="grid grid-cols-1 lg:grid-cols-[36fr_58fr] gap-8 lg:gap-12 items-center">
          <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
            {activeTab.body}
          </p>
          <div>{activeTab.panel}</div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="/security"
            className="text-sm"
            style={{
              color: FG,
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1px",
            }}
          >
            See the full trust page
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

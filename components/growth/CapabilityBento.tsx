"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, AlertTriangle, Hash, Users, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import {
  Overline, SectionHeadline, SectionShell, GradientFrame,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * Five capability tiles. Tiles 01 and 02 are large (3 of 6 columns),
 * 03 to 05 are 2 columns each. Each visual is product-fidelity UI
 * inside a soft gradient frame.
 */

function Tile({
  span,
  number,
  name,
  statement,
  outcome,
  children,
}: {
  span: string;
  number: string;
  name: string;
  statement: string;
  outcome: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl p-7 md:p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(0,0,0,0.04),0_18px_44px_rgba(0,0,0,0.10)] ${span}`}
      style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
    >
      <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: "var(--ed-accent-text)", fontWeight: 500 }}>
        {number} · {name}
      </p>
      <h3
        className="ed-fg text-xl md:text-2xl tracking-[-0.02em] mb-3"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.2 }}
      >
        {statement}
      </h3>
      <p className="ed-fg-muted text-sm md:text-base leading-relaxed" style={{ fontStyle: "italic" }}>
        &ldquo;{outcome}&rdquo;
      </p>
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}

/* ── 01 Unified answers ────────────────────────────────── */
// TODO: Replace with real product screen recording

function UnifiedAnswersVisual() {
  const CHANNELS = [MessageSquare, Hash, Users];
  return (
    <GradientFrame>
      <div className="relative w-full" style={{ minHeight: "340px" }}>
        {/* Behind: Slack + Teams frames */}
        <div
          className="absolute right-0 top-0 w-[240px] rounded-xl overflow-hidden"
          style={{ ...MOCK_SURFACE, opacity: 0.75, transform: "rotate(2.5deg)" }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
            <Hash className="w-3 h-3" strokeWidth={2} style={{ color: "#611F69" }} />
            <span className="text-[11.5px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>franchise-support</span>
          </div>
          <div className="px-2.5 py-2">
            <span className="text-[11.5px]" style={{ color: MOCK_MUTED }}>Same answer in Slack.</span>
          </div>
        </div>
        <div
          className="absolute left-0 top-6 w-[210px] rounded-xl overflow-hidden"
          style={{ ...MOCK_SURFACE, opacity: 0.62, transform: "rotate(-3deg)" }}
          aria-hidden="true"
        >
          <div className="h-1.5" style={{ backgroundColor: "#6264A7" }} />
          <div className="px-2.5 py-2">
            <span className="text-[11.5px]" style={{ color: MOCK_MUTED }}>Same answer in Teams.</span>
          </div>
        </div>

        {/* Front: SMS thread */}
        <div className="relative mx-auto pt-20 w-[360px]">
          <div className="rounded-2xl overflow-hidden" style={MOCK_SURFACE}>
            <div className="flex items-center justify-center py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
              <span className="text-[12px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>EZee Assist</span>
            </div>
            <div className="px-3 py-3 space-y-2">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md px-3 py-1.5" style={{ backgroundColor: "#00AEEF" }}>
                <p className="text-[13.5px]" style={{ color: "#FFFFFF", lineHeight: 1.35 }}>
                  What is the closing checklist for the spa?
                </p>
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-bl-md px-3 py-2" style={{ backgroundColor: "rgba(10,10,10,0.05)" }}>
                <p className="text-[13.5px] mb-1.5" style={{ color: MOCK_TEXT, lineHeight: 1.35 }}>
                  Six stations, sanitized and logged. Full list below.
                </p>
                <div className="flex flex-wrap gap-1">
                  {["SANITATION-SOP.PDF", "STORE-214-ADDENDUM.PDF"].map((f) => (
                    <span key={f} className="rounded-full px-1.5 py-0.5 text-[10px]" style={{ backgroundColor: "rgba(0,174,239,0.10)", color: "#0077A8", fontWeight: 600 }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Channel row */}
          <div className="mt-3 flex justify-center gap-1.5">
            {CHANNELS.map((Icon, i) => (
              <span
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: i === 0 ? "#00AEEF" : "rgba(10,10,10,0.05)",
                  border: `1px solid ${i === 0 ? "#00AEEF" : "rgba(10,10,10,0.08)"}`,
                }}
              >
                <Icon aria-hidden="true" className="w-3 h-3" strokeWidth={1.75} style={{ color: i === 0 ? "#FFFFFF" : MOCK_MUTED }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </GradientFrame>
  );
}

/* ── 02 Compliance at scale ────────────────────────────── */
// TODO: Replace with real product screen recording

const COMPLIANCE_ROWS = [
  { store: "Store #052", cells: [true, true, true, true],  note: null },
  { store: "Store #087", cells: [true, true, true, true],  note: null },
  { store: "Store #118", cells: [true, false, true, true], note: "2 modules outstanding" },
  { store: "Store #214", cells: [true, true, true, true],  note: null },
  { store: "Store #331", cells: [false, true, true, true], note: "Expires in 14 days" },
  { store: "Store #402", cells: [true, true, true, true],  note: null },
];

function ComplianceVisual() {
  const COLS = ["Insurance", "Training", "Certs", "Brand audit"];
  return (
    <GradientFrame>
      <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
        <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <span className="text-[13px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
            42 of 42 locations checked
          </span>
          <span className="text-[11.5px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>Nightly</span>
        </div>

        {/* Column heads */}
        <div className="grid grid-cols-[110px_repeat(4,1fr)] gap-1 px-3 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
          <span />
          {COLS.map((c) => (
            <span key={c} className="text-[10px] uppercase tracking-[0.08em] text-center" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
              {c}
            </span>
          ))}
        </div>

        {COMPLIANCE_ROWS.map((r) => (
          <div key={r.store} className="px-3 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
            <div className="grid grid-cols-[110px_repeat(4,1fr)] gap-1 items-center">
              <span className="text-[13px] font-mono" style={{ color: MOCK_TEXT }}>{r.store}</span>
              {r.cells.map((ok, i) => (
                <span key={i} className="flex justify-center">
                  {ok ? (
                    <Check aria-hidden="true" className="w-3 h-3" strokeWidth={3} style={{ color: "#15803D" }} />
                  ) : (
                    <AlertTriangle aria-hidden="true" className="w-3 h-3" strokeWidth={2.5} style={{ color: "#D97706" }} />
                  )}
                </span>
              ))}
            </div>
            {r.note && (
              <p className="text-[11px] mt-0.5" style={{ color: "#B45309", fontWeight: 600 }}>
                {r.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </GradientFrame>
  );
}

/* ── 03 Workflows ──────────────────────────────────────── */
// TODO: Replace with real product screen recording

const WF_STEPS = [
  "Detect next week's bookings below target",
  "Pull lapsed clients in the local area",
  "Draft the reactivation offer from the approved playbook",
  "Send to the owner for approval",
];

function WorkflowVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setLit(WF_STEPS.length - 1); return; }
    let t: ReturnType<typeof setTimeout>;
    if (lit < WF_STEPS.length - 1) t = setTimeout(() => setLit((v) => v + 1), 550);
    else t = setTimeout(() => setLit(-1), 3000);
    return () => clearTimeout(t);
  }, [inView, reduceMotion, lit]);

  return (
    <GradientFrame>
      <div ref={ref} className="rounded-xl p-3.5 w-full" style={MOCK_SURFACE}>
        <p className="text-[12px] mb-2.5" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
          Off-peak recovery · Every location
        </p>
        <div className="space-y-1.5">
          {WF_STEPS.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors duration-500"
              style={{
                backgroundColor: i <= lit ? "rgba(0,174,239,0.08)" : "rgba(10,10,10,0.025)",
                border: `1px solid ${i <= lit ? "rgba(0,174,239,0.28)" : MOCK_HAIRLINE}`,
              }}
            >
              <span className="text-[11.5px] flex-shrink-0" style={{ color: i <= lit ? "#0077A8" : MOCK_MUTED, fontWeight: 700 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>{s}</p>
            </div>
          ))}
        </div>
        <p className="text-[11.5px] mt-2.5" style={{ color: MOCK_MUTED, fontWeight: 500 }}>
          <span style={{ color: "#15803D" }}>●</span> Ran 4 minutes ago
        </p>
      </div>
    </GradientFrame>
  );
}

/* ── 04 Reporting ──────────────────────────────────────── */
// TODO: Replace with real product screen recording

const GAPS = [
  { store: "Store #331", note: "Bookings 12% under target", up: false, flagged: true },
  { store: "Store #118", note: "Attach rate down 6%",       up: false, flagged: true },
  { store: "Store #052", note: "Reviews up 11%",            up: true,  flagged: false },
  { store: "Store #402", note: "Rebooking down 4%",         up: false, flagged: true },
];

function ReportingVisual() {
  return (
    <GradientFrame>
      <div className="rounded-xl p-3.5 w-full" style={MOCK_SURFACE}>
        <p className="text-[12px] mb-3" style={{ color: MOCK_MUTED, fontWeight: 600, letterSpacing: "0.06em" }}>
          Gaps this week · West territory
        </p>
        <div className="space-y-1">
          {GAPS.map((r, i) => (
            <div key={r.store} className="flex items-center justify-between gap-2 py-1.5" style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCK_HAIRLINE}` }}>
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-[13px] font-mono flex-shrink-0" style={{ color: MOCK_TEXT }}>{r.store}</span>
                <span
                  className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] min-w-0"
                  style={{
                    backgroundColor: r.up ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.10)",
                    color: r.up ? "#15803D" : "#B91C1C",
                    fontWeight: 700,
                  }}
                >
                  {r.up
                    ? <TrendingUp aria-hidden="true" className="w-2.5 h-2.5 flex-shrink-0" strokeWidth={2.5} />
                    : <TrendingDown aria-hidden="true" className="w-2.5 h-2.5 flex-shrink-0" strokeWidth={2.5} />}
                  <span className="truncate">{r.note}</span>
                </span>
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10.5px] flex-shrink-0"
                style={
                  r.flagged
                    ? { backgroundColor: "rgba(10,10,10,0.05)", border: `1px solid ${MOCK_HAIRLINE}`, color: MOCK_MUTED, fontWeight: 600 }
                    : { color: MOCK_MUTED, fontWeight: 500 }
                }
              >
                {r.flagged ? "Flagged to coach" : "No action"}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11.5px] mt-2.5" style={{ color: MOCK_MUTED }}>
          Surfaced Monday, not at quarter close.
        </p>
      </div>
    </GradientFrame>
  );
}

/* ── 05 AI apps and pages ──────────────────────────────── */
// TODO: Replace with real product screen recording

const APP_PROMPT =
  "Build a daily closing audit: photo checklist per station, auto-score, flag fails to the coach";

function AiAppsVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setChars(APP_PROMPT.length); setPhase(2); return; }
    let t: ReturnType<typeof setTimeout>;
    if (phase === 0) {
      if (chars < APP_PROMPT.length) t = setTimeout(() => setChars((c) => c + 1), 28);
      else t = setTimeout(() => setPhase(1), 500);
    } else if (phase === 1) {
      t = setTimeout(() => setPhase(2), 900);
    } else if (phase === 2) {
      t = setTimeout(() => setPhase(3), 3200);
    } else {
      t = setTimeout(() => { setChars(0); setPhase(0); }, 300);
    }
    return () => clearTimeout(t);
  }, [inView, reduceMotion, phase, chars]);

  const typed = reduceMotion ? APP_PROMPT : APP_PROMPT.slice(0, chars);
  const showPlan = phase >= 1;
  const showApp = phase >= 2;

  return (
    <GradientFrame>
      <div ref={ref} className="w-full" style={{ minHeight: "340px" }}>
        {/* Prompt */}
        <div className="rounded-xl px-3 py-2.5 mb-2" style={MOCK_SURFACE}>
          <p className="text-[13px]" style={{ color: MOCK_TEXT, fontStyle: "italic", lineHeight: 1.4, minHeight: "42px" }}>
            &ldquo;{typed}
            {!reduceMotion && phase === 0 && (
              <span aria-hidden="true" style={{ color: "#00AEEF", fontStyle: "normal", animation: "ed-cursor-blink 0.9s step-start infinite" }}>|</span>
            )}
            {(reduceMotion || chars >= APP_PROMPT.length) && "”"}
          </p>
        </div>

        {/* Plan */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={showPlan ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-xl px-3 py-2.5 mb-2"
          style={MOCK_SURFACE}
        >
          <p className="text-[11.5px] mb-1.5" style={{ color: MOCK_MUTED, fontWeight: 600 }}>Plan ready · 4 steps · 2 integrations</p>
          <button type="button" className="w-full rounded-lg py-1.5 text-[13px]" style={{ backgroundColor: "#00AEEF", color: "#FFFFFF", fontWeight: 600 }}>
            Approve and deploy
          </button>
        </motion.div>

        {/* Deployed app */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={showApp ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-xl overflow-hidden"
          style={MOCK_SURFACE}
        >
          <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
            <span className="text-[11.5px] font-mono" style={{ color: MOCK_MUTED }}>audit.brand.ezee.app</span>
            <span className="text-[10.5px] rounded-full px-1.5 py-0.5" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: "#15803D", fontWeight: 700 }}>
              Live · 214 locations
            </span>
          </div>
          <div className="px-3 py-2 space-y-1">
            {[{ t: "Stations sanitized", ok: true }, { t: "Retail wall restocked", ok: false }].map((r) => (
              <div key={r.t} className="flex items-center justify-between rounded px-2 py-1" style={{ backgroundColor: r.ok ? "rgba(22,163,74,0.07)" : "rgba(217,119,6,0.08)" }}>
                <span className="text-[12px]" style={{ color: MOCK_TEXT }}>{r.t}</span>
                <span className="text-[10.5px]" style={{ color: r.ok ? "#15803D" : "#B45309", fontWeight: 700 }}>
                  {r.ok ? "Pass" : "Flag"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </GradientFrame>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function CapabilityBento() {
  return (
    <SectionShell alt id="capabilities">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>What it does</Overline>
        <SectionHeadline>
          Five things your playbook can now do on its own.
        </SectionHeadline>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
        <Tile
          span="lg:col-span-3"
          number="01"
          name="Unified answers"
          statement="One place operators ask, on the channel they already use."
          outcome="Repetitive questions stop reaching my inbox."
        >
          <UnifiedAnswersVisual />
        </Tile>

        <Tile
          span="lg:col-span-3"
          number="02"
          name="Compliance at scale"
          statement="Every location checked continuously against the standard you set."
          outcome="I stop chasing, and the standard holds."
        >
          <ComplianceVisual />
        </Tile>

        <Tile
          span="lg:col-span-2"
          number="03"
          name="Workflows"
          statement="Recurring work runs on a schedule or a trigger."
          outcome="The work that drives revenue runs itself."
        >
          <WorkflowVisual />
        </Tile>

        <Tile
          span="lg:col-span-2"
          number="04"
          name="Reporting"
          statement="Live performance across the network, without a request queue."
          outcome="Gaps surface before the quarter closes."
        >
          <ReportingVisual />
        </Tile>

        <Tile
          span="lg:col-span-2"
          number="05"
          name="AI apps and pages"
          statement="Describe the tool your network needs. It ships to every location."
          outcome="Franchisees build their own."
        >
          <AiAppsVisual />
        </Tile>
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/solution" className="ed-btn ed-btn-secondary">
          See the platform
        </Link>
      </div>
    </SectionShell>
  );
}

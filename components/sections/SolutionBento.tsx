"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Shield, Lock, KeyRound, Server, EyeOff, Ban, Fingerprint, ScrollText,
  MessageSquare, Hash, Users, CheckCircle2, ChevronDown, Check,
  type LucideIcon,
} from "lucide-react";

/**
 * The Solution bento grid: six cells mapping the platform. Each cell is
 * an overview that scroll-links to its deep-dive section further down
 * the homepage. Lives inside the always-dark Pivot section, so cells
 * use the dark treatment (#141414, hairline border).
 *
 * Layout: Cell 1 full width, Cells 2-3 half width, Cells 4-6 thirds.
 * Mobile: all six stack vertically.
 */

/* ─── Shared cell primitives ───────────────────────────── */

const CELL_STYLE: React.CSSProperties = {
  backgroundColor: "#141414",
  border: "1px solid #2A2A2A",
};

function CellOverline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-[0.2em] mb-4"
      style={{ color: "#00AEEF", fontWeight: 500 }}
    >
      {children}
    </p>
  );
}

function CellHeadline({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-2xl md:text-3xl tracking-[-0.02em] mb-4"
      style={{
        color: "#F5EDE0",
        fontFamily: "var(--font-editorial)",
        fontWeight: 500,
        lineHeight: 1.15,
      }}
    >
      {children}
    </h3>
  );
}

function CellBody({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base md:text-lg leading-relaxed"
      style={{ color: "#A89B86", fontWeight: 400 }}
    >
      {children}
    </p>
  );
}

function CellLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-block mt-6 text-sm transition-opacity hover:opacity-70"
      style={{
        color: "#F5EDE0",
        fontWeight: 500,
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationThickness: "1px",
      }}
    >
      {children}
    </Link>
  );
}

function Cell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-3xl p-8 md:p-10 transition-colors duration-300 hover:bg-[#181818] ${className}`}
      style={CELL_STYLE}
    >
      {children}
    </motion.div>
  );
}

/* ─── Security badges (shared with the Governance strip) ── */

export const SECURITY_BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: Shield,      label: "SOC 2 Type II aligned" },
  { icon: Lock,        label: "TLS 1.2/1.3 in transit" },
  { icon: KeyRound,    label: "AES 256-bit at rest" },
  { icon: Server,      label: "Dedicated AWS per customer" },
  { icon: EyeOff,      label: "PII redaction" },
  { icon: Ban,         label: "No third-party model training" },
  { icon: Fingerprint, label: "SSO + SAML" },
  { icon: ScrollText,  label: "Full audit trail" },
];

export function SecurityBadge({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs"
      style={{
        backgroundColor: "rgba(245,237,224,0.04)",
        border: "1px solid #2A2A2A",
        color: "#F5EDE0",
        fontWeight: 500,
      }}
    >
      <Icon aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
      {label}
    </span>
  );
}

/* ─── Cell 1 visual: the resolve-or-escalate flow ──────── */
// TODO: Replace with real product screen recording

const QUESTIONS = [
  { icon: MessageSquare, channel: "SMS",   text: "What's the spa sanitation checklist for tonight's close?" },
  { icon: Hash,          channel: "Slack", text: "How do I process a membership freeze in Mindbody?" },
  { icon: Users,         channel: "Teams", text: "Our POS isn't syncing at Store 214." },
];

/** Sequence phases: 0 idle · 1 bubbles+lines · 2 upper branch · 3 lower branch · 4 convergence · then hold + loop */
function useFlowSequence(inView: boolean, reduceMotion: boolean) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setPhase(4);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 0) timer = setTimeout(() => setPhase(1), 300);
    else if (phase === 1) timer = setTimeout(() => setPhase(2), 1100);
    else if (phase === 2) timer = setTimeout(() => setPhase(3), 900);
    else if (phase === 3) timer = setTimeout(() => setPhase(4), 900);
    else timer = setTimeout(() => setPhase(0), 4000); // hold, then loop
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, phase]);

  return phase;
}

function QuestionBubble({
  q,
  i,
  visible,
}: {
  q: (typeof QUESTIONS)[number];
  i: number;
  visible: boolean;
}) {
  const Icon = q.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.2 }}
      className="flex items-start gap-2.5 rounded-2xl px-4 py-3"
      style={{
        backgroundColor: "rgba(245,237,224,0.04)",
        border: "1px solid #2A2A2A",
      }}
    >
      <Icon aria-hidden="true" className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
      <p className="text-[12.5px]" style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", lineHeight: 1.4 }}>
        &ldquo;{q.text}&rdquo;
      </p>
    </motion.div>
  );
}

function AgentNode() {
  return (
    <div
      className="ed-cta-pulse rounded-2xl px-5 py-4 text-center flex-shrink-0"
      style={{
        backgroundColor: "#0A0A0A",
        border: "1px solid rgba(0,174,239,0.55)",
        boxShadow: "0 0 0 5px rgba(0,174,239,0.08)",
      }}
    >
      <p className="text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: "#00AEEF", fontWeight: 600 }}>
        The Hub
      </p>
      <p className="text-base whitespace-nowrap" style={{ color: "#F5EDE0", fontFamily: "var(--font-editorial)", fontWeight: 500 }}>
        EZee AI Agent
      </p>
    </div>
  );
}

function ResolvedCard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl px-4 py-3"
      style={{
        backgroundColor: "rgba(0,174,239,0.08)",
        border: "1px solid rgba(0,174,239,0.35)",
      }}
    >
      <p className="flex items-center gap-2 text-sm mb-2" style={{ color: "#F5EDE0", fontWeight: 500 }}>
        <CheckCircle2 aria-hidden="true" className="w-4 h-4" strokeWidth={1.75} style={{ color: "#00AEEF" }} />
        Resolved instantly
      </p>
      <div className="flex flex-wrap gap-1.5">
        {["SANITATION-SOP.PDF", "STORE-214-VENDORS.PDF"].map((f) => (
          <span
            key={f}
            className="rounded-full px-2 py-0.5 text-[9px]"
            style={{
              backgroundColor: "rgba(0,174,239,0.12)",
              color: "#00AEEF",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            {f}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function TicketCard({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl px-4 py-3"
      style={{
        backgroundColor: "rgba(245,237,224,0.04)",
        border: "1px solid #2A2A2A",
      }}
    >
      <p className="text-sm mb-2" style={{ color: "#F5EDE0", fontWeight: 500 }}>
        #18642 · POS sync failure
      </p>
      <ul className="space-y-1">
        {[
          "Full conversation attached",
          "AI attempted answer included",
          "Routed to Operations · Sarah K.",
        ].map((row) => (
          <li key={row} className="text-[11px]" style={{ color: "#A89B86", lineHeight: 1.4 }}>
            {row}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ClosedNode({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl px-4 py-3 text-center"
      style={{
        backgroundColor: "rgba(245,237,224,0.05)",
        border: "1px solid #2A2A2A",
      }}
    >
      <p className="text-xs whitespace-nowrap" style={{ color: "#F5EDE0", fontWeight: 500 }}>
        Closed. Logged. Learned.
      </p>
    </motion.div>
  );
}

/** Dotted connector lines between the question column and the agent node. */
function InboundLines({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      className="h-full w-8 lg:w-10 flex-shrink-0"
      aria-hidden="true"
    >
      {[16, 50, 84].map((y, i) => (
        <motion.path
          key={y}
          d={`M 0 ${y} C 20 ${y}, 24 50, 40 50`}
          fill="none"
          stroke="rgba(0,174,239,0.4)"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 + i * 0.2 }}
        />
      ))}
    </svg>
  );
}

/** Two outbound branches: thick blue (resolved) and thin grey (escalated). */
function BranchLines({
  upper,
  lower,
}: {
  upper: boolean;
  lower: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 100"
      preserveAspectRatio="none"
      className="h-full w-10 lg:w-14 flex-shrink-0"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <motion.path
        d="M 0 50 C 25 50, 30 22, 60 22"
        fill="none"
        stroke="#00AEEF"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={upper ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.path
        d="M 0 50 C 25 50, 30 78, 60 78"
        fill="none"
        stroke="#A89B86"
        strokeWidth="1.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={lower ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Branch labels */}
      <motion.text
        x="26" y="14" fontSize="8" fontWeight="600" fill="#00AEEF"
        initial={{ opacity: 0 }}
        animate={upper ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        70%+
      </motion.text>
      <motion.text
        x="20" y="94" fontSize="7" fontWeight="600" fill="#A89B86"
        initial={{ opacity: 0 }}
        animate={lower ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Escalated
      </motion.text>
    </svg>
  );
}

/** Convergence lines from both outcome cards into the closed node. */
function ConvergeLines({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 40 100"
      preserveAspectRatio="none"
      className="h-full w-8 lg:w-10 flex-shrink-0"
      aria-hidden="true"
    >
      {[22, 78].map((y) => (
        <motion.path
          key={y}
          d={`M 0 ${y} C 20 ${y}, 24 50, 40 50`}
          fill="none"
          stroke="rgba(245,237,224,0.35)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function CoreFlowVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const phase = useFlowSequence(inView, Boolean(reduceMotion));

  const bubbles = phase >= 1;
  const upper = phase >= 2;
  const lower = phase >= 3;
  const converge = phase >= 4;

  return (
    <div ref={ref} className="mt-10">
      <p className="sr-only">
        Diagram: questions from SMS, Slack, and Teams flow into the EZee
        AI agent. Over 70 percent are resolved instantly with cited
        sources; the rest become fully contextualized tickets routed to
        the right person. Both paths end closed, logged, and learned.
      </p>

      {/* ── Desktop flow ── */}
      <div className="hidden lg:flex items-stretch gap-0">
        {/* Questions */}
        <div className="flex flex-col justify-between gap-3 w-[300px] flex-shrink-0">
          {QUESTIONS.map((q, i) => (
            <QuestionBubble key={q.channel} q={q} i={i} visible={bubbles} />
          ))}
        </div>

        <InboundLines visible={bubbles} />

        {/* Agent node */}
        <div className="flex items-center">
          <AgentNode />
        </div>

        <BranchLines upper={upper} lower={lower} />

        {/* Outcomes */}
        <div className="flex flex-col justify-between gap-3 w-[300px] flex-shrink-0 py-1">
          <ResolvedCard visible={upper} />
          <TicketCard visible={lower} />
        </div>

        <ConvergeLines visible={converge} />

        {/* Convergence */}
        <div className="flex items-center">
          <ClosedNode visible={converge} />
        </div>
      </div>

      {/* ── Mobile flow: vertical with chevrons ── */}
      <div className="lg:hidden">
        <div className="flex flex-col gap-3">
          {QUESTIONS.map((q, i) => (
            <QuestionBubble key={q.channel} q={q} i={i} visible={bubbles} />
          ))}
        </div>
        <div className="flex justify-center py-2">
          <ChevronDown aria-hidden="true" className="w-4 h-4" style={{ color: "#00AEEF" }} />
        </div>
        <AgentNode />
        <div className="flex justify-center py-2">
          <ChevronDown aria-hidden="true" className="w-4 h-4" style={{ color: "#00AEEF" }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ResolvedCard visible={upper} />
          <TicketCard visible={lower} />
        </div>
        <div className="flex justify-center py-2">
          <ChevronDown aria-hidden="true" className="w-4 h-4" style={{ color: "#A89B86" }} />
        </div>
        <ClosedNode visible={converge} />
      </div>
    </div>
  );
}

/* ─── Cell 1: The Core ─────────────────────────────────── */

const CORE_STATS = [
  "70%+ resolved by AI",
  "Under 30s average response",
  "100% of questions captured",
];

function CoreCell() {
  return (
    <Cell className="col-span-1 lg:col-span-6">
      <CellOverline>The Core</CellOverline>
      <CellHeadline>
        The AI support agent{" "}
        <span style={{ color: "#00AEEF" }}>is your ticketing system.</span>
      </CellHeadline>
      <div className="max-w-3xl">
        <CellBody>
          Not a chatbot bolted onto a helpdesk. Every question from every
          location lands in one queue. The AI resolves what it can,
          grounded in your brand&apos;s knowledge and citing its sources.
          What it cannot resolve becomes a ticket carrying the full
          conversation, the attempted answer, and the documents it
          checked. Routed to the right person, first time.
        </CellBody>
      </div>

      {/* Stat strip */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
        {CORE_STATS.map((s, i) => (
          <span key={s} className="flex items-center gap-6">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:block h-4 w-px"
                style={{ backgroundColor: "#2A2A2A" }}
              />
            )}
            <span className="text-sm" style={{ color: "#F5EDE0", fontWeight: 500 }}>
              {s}
            </span>
          </span>
        ))}
      </div>

      <CoreFlowVisual />
    </Cell>
  );
}

/* ─── Cell 2 visual: drifting integration pill cloud ───── */
// TODO: Replace with real product screen recording

const CLOUD_TOOLS: { name: string; color: string }[] = [
  { name: "Salesforce",   color: "#00A1E0" },
  { name: "HubSpot",      color: "#FF7A59" },
  { name: "Slack",        color: "#611F69" },
  { name: "Teams",        color: "#6264A7" },
  { name: "QuickBooks",   color: "#2CA01C" },
  { name: "Xero",         color: "#13B5EA" },
  { name: "Mindbody",     color: "#F9423A" },
  { name: "ServiceTitan", color: "#F05A28" },
  { name: "FranConnect",  color: "#0072CE" },
  { name: "SharePoint",   color: "#036C70" },
  { name: "Google Drive", color: "#FBBC04" },
  { name: "YouTube",      color: "#FF0000" },
  { name: "Square",       color: "#8C8C8C" },
  { name: "Toast",        color: "#FF4C00" },
  { name: "Trainual",     color: "#7A3BFF" },
  { name: "Canva",        color: "#8B3DFF" },
];

function PillCloudVisual() {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {CLOUD_TOOLS.map((t, i) => (
        <motion.span
          key={t.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
          className="inline-block"
        >
          <span
            className="ed-bob inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
            style={{
              backgroundColor: "rgba(245,237,224,0.04)",
              border: "1px solid #2A2A2A",
              color: "#F5EDE0",
              fontWeight: 500,
              // Organic drift: independent durations and offset starts
              animationDuration: `${4 + (i % 7) * 0.45}s`,
              animationDelay: `${-((i * 0.9) % 5)}s`,
            }}
          >
            <span
              aria-hidden="true"
              className="block h-[7px] w-[7px] rounded-full flex-shrink-0"
              style={{ backgroundColor: t.color }}
            />
            {t.name}
          </span>
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut", delay: CLOUD_TOOLS.length * 0.04 }}
        className="inline-block"
      >
        <span
          className="ed-bob inline-flex items-center rounded-full px-3 py-1.5 text-[11px]"
          style={{
            backgroundColor: "rgba(0,174,239,0.10)",
            border: "1px solid rgba(0,174,239,0.35)",
            color: "#00AEEF",
            fontWeight: 600,
            animationDuration: "5.5s",
            animationDelay: "-2s",
          }}
        >
          +225 more
        </span>
      </motion.span>
    </div>
  );
}

/* ─── Cell 3 visual: sequencing workflow card ──────────── */
// TODO: Replace with real product screen recording

const WORKFLOW_STEPS = [
  "Pull sales vs. target from BI",
  "Rank locations needing attention",
  "Draft a prioritized action plan",
  "Email each coach. Mondays, 8am.",
];

function WorkflowVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  // Index of the currently lit step; -1 = none, steps light cumulatively
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setLit(WORKFLOW_STEPS.length - 1);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    if (lit < WORKFLOW_STEPS.length - 1) {
      timer = setTimeout(() => setLit((v) => v + 1), lit < 0 ? 500 : 500);
    } else {
      timer = setTimeout(() => setLit(-1), 3000); // hold, then loop
    }
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, lit]);

  return (
    <div ref={ref} className="mt-8">
      <div
        className="rounded-2xl p-4"
        style={{
          backgroundColor: "rgba(245,237,224,0.03)",
          border: "1px solid #2A2A2A",
        }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-3"
          style={{ color: "#00AEEF", fontWeight: 600 }}
        >
          ▸ Weekly KPI Review · Every location
        </p>
        <div className="space-y-1.5">
          {WORKFLOW_STEPS.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors duration-500"
              style={{
                backgroundColor:
                  i <= lit ? "rgba(0,174,239,0.08)" : "rgba(245,237,224,0.02)",
                border: `1px solid ${i <= lit ? "rgba(0,174,239,0.30)" : "#2A2A2A"}`,
              }}
            >
              <span
                className="text-[10px] flex-shrink-0 transition-colors duration-500"
                style={{
                  color: i <= lit ? "#00AEEF" : "#A89B86",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[12.5px]"
                style={{
                  color: "#F5EDE0",
                  fontFamily: "var(--font-editorial)",
                  lineHeight: 1.35,
                }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[11px]" style={{ color: "#A89B86", fontWeight: 500 }}>
        <span aria-hidden="true" style={{ color: "#16A34A" }}>● </span>
        Ran 4 minutes ago · 214 locations
      </p>
    </div>
  );
}

/* ─── Cell 2: Connected ────────────────────────────────── */

function ConnectedCell() {
  return (
    <Cell className="col-span-1 lg:col-span-3">
      <CellOverline>Connected</CellOverline>
      <CellHeadline>Wired into the systems you already run on.</CellHeadline>
      <CellBody>
        250+ native integrations across drives, CRMs, POS, ERP, LMS,
        marketing, accounting, and comms. No data migration. Your content
        stays where it lives and stays current.
      </CellBody>
      <PillCloudVisual />
      <CellLink href="#integrations">See all integrations ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 3: Autonomous ───────────────────────────────── */

function AutonomousCell() {
  return (
    <Cell className="col-span-1 lg:col-span-3">
      <CellOverline>Autonomous</CellOverline>
      <CellHeadline>Agents that take action across your stack.</CellHeadline>
      <CellBody>
        Describe a workflow in plain language. EZee runs it on a schedule
        or a trigger, across the tools your network already uses. Weekly
        KPI reviews. Review responses. Lead follow-up. Compliance sweeps.
      </CellBody>
      <WorkflowVisual />
      <CellLink href="#agents">See what agents run ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 4 visual: permissions matrix ────────────────── */
// TODO: Replace with real product screen recording

const MATRIX_ROLES = ["HQ Admin", "Coach", "Franchisee", "Staff"];
const MATRIX_ROWS: { capability: string; grants: boolean[] }[] = [
  { capability: "View brand SOPs",                  grants: [true, true, true, true] },
  { capability: "See network analytics",            grants: [true, true, false, false] },
  { capability: "Trigger actions in connected tools", grants: [true, true, true, false] },
  { capability: "Approve agent workflows",          grants: [true, false, false, false] },
];

function PermissionsMatrixVisual() {
  return (
    <div className="mt-8 overflow-x-auto">
      <div className="min-w-[380px]">
        {/* Role header row */}
        <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-1.5 mb-1.5">
          <span />
          {MATRIX_ROLES.map((r) => (
            <span
              key={r}
              className="text-[9px] uppercase tracking-[0.12em] text-center"
              style={{ color: "#A89B86", fontWeight: 600 }}
            >
              {r}
            </span>
          ))}
        </div>
        {MATRIX_ROWS.map((row, ri) => (
          <motion.div
            key={row.capability}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: ri * 0.15 }}
            className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-1.5 mb-1.5 items-center"
          >
            <span
              className="text-[11px] pr-1"
              style={{ color: "#F5EDE0", fontWeight: 500, lineHeight: 1.3 }}
            >
              {row.capability}
            </span>
            {row.grants.map((granted, ci) => (
              <span
                key={ci}
                className="flex items-center justify-center rounded-lg py-1.5"
                style={{
                  backgroundColor: granted
                    ? "rgba(0,174,239,0.08)"
                    : "rgba(245,237,224,0.02)",
                  border: `1px solid ${granted ? "rgba(0,174,239,0.25)" : "#2A2A2A"}`,
                }}
              >
                {granted ? (
                  <Check aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2.25} style={{ color: "#00AEEF" }} />
                ) : (
                  <span aria-hidden="true" className="text-[11px]" style={{ color: "#6B6358" }}>–</span>
                )}
                <span className="sr-only">{granted ? "allowed" : "not allowed"}</span>
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Cell 5 visual: streaming activity log ────────────── */
// TODO: Replace with real product screen recording

const LOG_ROWS = [
  { time: "14:02", kind: "Answer",     detail: "Store #214 · 2 sources cited" },
  { time: "14:07", kind: "Action",     detail: "Lead created in ServiceTitan" },
  { time: "14:11", kind: "Agent",      detail: "Weekly KPI Review completed" },
  { time: "14:15", kind: "Escalation", detail: "Ticket #18642 → Operations" },
];

function ActivityLogVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const t = setInterval(() => setHead((h) => (h + 1) % LOG_ROWS.length), 2000);
    return () => clearInterval(t);
  }, [inView, reduceMotion]);

  // Newest row first, rotating through the fixture list
  const visible = Array.from({ length: 4 }, (_, i) => LOG_ROWS[(head - i + LOG_ROWS.length * 2) % LOG_ROWS.length]);

  return (
    <div ref={ref} className="mt-8">
      <div
        className="rounded-2xl p-4"
        style={{
          backgroundColor: "rgba(245,237,224,0.03)",
          border: "1px solid #2A2A2A",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "#00AEEF", fontWeight: 600 }}
          >
            Activity log · Live
          </p>
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{
                backgroundColor: "#16A34A",
                animation: "ed-cursor-blink 1.6s ease-in-out infinite",
              }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "#16A34A" }} />
          </span>
        </div>

        <div className="space-y-1.5 overflow-hidden" style={{ minHeight: "116px" }}>
          {visible.map((row, i) => (
            <motion.div
              key={`${row.time}-${head}-${i}`}
              initial={i === 0 && !reduceMotion ? { opacity: 0, y: -10 } : false}
              animate={{ opacity: 1 - i * 0.18, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-baseline gap-2 rounded-lg px-2.5 py-1.5"
              style={{
                backgroundColor: "rgba(245,237,224,0.03)",
              }}
            >
              <span className="text-[10px] font-mono flex-shrink-0" style={{ color: "#A89B86" }}>
                {row.time}
              </span>
              <span
                className="text-[10px] flex-shrink-0"
                style={{ color: "#00AEEF", fontWeight: 600, letterSpacing: "0.06em" }}
              >
                {row.kind}
              </span>
              <span className="text-[11px] truncate" style={{ color: "#F5EDE0" }}>
                {row.detail}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Sparkline */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <svg viewBox="0 0 120 28" className="h-6 flex-1" aria-hidden="true" preserveAspectRatio="none">
            <motion.polyline
              points="0,24 18,21 36,22 54,17 72,14 90,10 108,7 120,4"
              fill="none"
              stroke="#00AEEF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <span className="text-[11px] flex-shrink-0" style={{ color: "#16A34A", fontWeight: 600 }}>
            ▲ 23%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Cell 6 visual: security badge grid ───────────────── */
// TODO: Replace with real product screen recording

function SecurityBadgeGrid() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {SECURITY_BADGES.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
        >
          <SecurityBadge icon={b.icon} label={b.label} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Cell 4: Access ───────────────────────────────────── */

function AccessCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Access</CellOverline>
      <CellHeadline>HQ, coaches, franchisees, staff. One platform, four views.</CellHeadline>
      <CellBody>
        Access is scoped by role and by location. Franchisors see the
        whole network. Coaches work their territory. Franchisees manage
        their locations. Staff access what their job requires. Configure
        once, apply across the network.
      </CellBody>
      <PermissionsMatrixVisual />
      <CellLink href="#governance">See governance ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 5: Visibility ───────────────────────────────── */

function VisibilityCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Visibility</CellOverline>
      <CellHeadline>See what the AI did, when, and why.</CellHeadline>
      <CellBody>
        Answers given, actions taken, agents triggered, apps deployed.
        All in one admin log with sources, timestamps, and outcomes. Your
        CISO asks what is running. You answer in a minute.
      </CellBody>
      <ActivityLogVisual />
      <CellLink href="#governance">See governance ↓</CellLink>
    </Cell>
  );
}

/* ─── Cell 6: Secure ───────────────────────────────────── */

function SecureCell() {
  return (
    <Cell className="col-span-1 lg:col-span-2">
      <CellOverline>Secure</CellOverline>
      <CellHeadline>Security built into the foundation.</CellHeadline>
      <CellBody>
        Dedicated AWS infrastructure for each customer. TLS 1.2/1.3 in
        transit, AES 256-bit at rest. PII redaction before indexing. Your
        data never trains a third-party model.
      </CellBody>
      <SecurityBadgeGrid />
      <CellLink href="/security">See security →</CellLink>
    </Cell>
  );
}

/* ─── The grid ─────────────────────────────────────────── */

export default function SolutionBento() {
  return (
    <div className="mt-16 grid grid-cols-1 lg:grid-cols-6 gap-4 md:gap-5">
      <CoreCell />
      <ConnectedCell />
      <AutonomousCell />
      <AccessCell />
      <VisibilityCell />
      <SecureCell />
    </div>
  );
}

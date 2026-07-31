"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Check, Globe, Hash, Mail, MessageCircle, MessageSquare, MessagesSquare,
  Smartphone, TrendingDown, TrendingUp, Users, type LucideIcon,
} from "lucide-react";
import {
  Overline, SectionShell,
  MOCK_SURFACE, MOCK_TEXT, MOCK_MUTED, MOCK_HAIRLINE,
} from "./shared";

/**
 * What it does. Sticky left rail, scrolling right column, one module
 * per scroll beat. Module names match the reveal diagram's five
 * outputs one to one. Below lg the rail unpins and the modules stack
 * in the same order.
 */
// TODO: Replace every module visual with real product screen recordings.

const BLUE = "#00AEEF";
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── 01 Answers ────────────────────────────────────────── */

const CHANNELS: { icon: LucideIcon; label: string }[] = [
  { icon: MessageSquare,  label: "SMS" },
  { icon: MessageCircle,  label: "WhatsApp" },
  { icon: Hash,           label: "Slack" },
  { icon: Users,          label: "Teams" },
  { icon: MessagesSquare, label: "Google Chat" },
  { icon: Mail,           label: "Email" },
  { icon: Globe,          label: "Web portal" },
  { icon: Smartphone,     label: "Mobile app" },
];

/** Compact channel row, 40px tall, living inside module 01. */
function ChannelRow() {
  return (
    <div
      className="flex items-center gap-1.5 overflow-hidden rounded-lg px-2"
      style={{ height: "40px", backgroundColor: "rgba(10,10,10,0.03)", border: `1px solid ${MOCK_HAIRLINE}` }}
    >
      {CHANNELS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          title={label}
          className="flex h-6 w-6 items-center justify-center rounded-md flex-shrink-0"
          style={{ backgroundColor: "#FFFFFF", border: `1px solid ${MOCK_HAIRLINE}` }}
        >
          <Icon aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} style={{ color: BLUE }} />
        </span>
      ))}
      <span className="ml-auto pr-1 text-[11px] whitespace-nowrap" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
        Every channel
      </span>
    </div>
  );
}

function AnswersVisual() {
  return (
    <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span className="text-[12.5px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          Store #118 · Slack
        </span>
        <span className="text-[11px]" style={{ color: "#15803D", fontWeight: 600 }}>● 24/7</span>
      </div>

      <div className="px-4 py-4 space-y-3">
        <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm px-3.5 py-2" style={{ backgroundColor: BLUE }}>
          <p className="text-[13.5px]" style={{ color: "#FFFFFF", lineHeight: 1.35 }}>
            Can I run the summer promo discount alongside the loyalty offer?
          </p>
        </div>

        <div className="max-w-[92%] rounded-xl rounded-bl-sm px-3.5 py-2.5" style={{ backgroundColor: "rgba(0,174,239,0.07)" }}>
          <p className="text-[13.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.4 }}>
            No. Promotions cannot stack with loyalty redemptions. Apply the
            higher of the two and note it at close.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["SUMMER-PROMO-GUIDE.PDF", "LOYALTY-POLICY.PDF"].map((src) => (
              <span
                key={src}
                className="rounded-full px-2 py-0.5 text-[10px]"
                style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "#0077A8", fontWeight: 700 }}
              >
                {src}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[11.5px]" style={{ color: MOCK_MUTED }}>
          Answered from your playbooks, training manual, and operations manual.
        </p>
      </div>

      <div className="px-4 pb-4">
        <ChannelRow />
      </div>
    </div>
  );
}

/* ── 02 Ticketing ──────────────────────────────────────── */

const TICKET_CONTEXT = [
  "Full conversation attached",
  "Sources checked listed",
  "Store #214 · West region · Owner",
];

function TicketingVisual() {
  return (
    <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span className="text-[12.5px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          Ticket #18642
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10.5px]"
          style={{ backgroundColor: "rgba(217,119,6,0.12)", color: "#B45309", fontWeight: 700 }}
        >
          Needs a human
        </span>
      </div>

      <div className="px-4 py-4">
        <p className="text-[13.5px] mb-1" style={{ color: MOCK_TEXT, fontWeight: 500, lineHeight: 1.35 }}>
          Landlord is disputing our signage clause. What do I do?
        </p>
        <p className="text-[11.5px] mb-3.5" style={{ color: MOCK_MUTED }}>
          Confidence below threshold. Not answered.
        </p>

        <div className="rounded-lg px-3 py-2.5" style={{ backgroundColor: "rgba(10,10,10,0.03)", border: `1px solid ${MOCK_HAIRLINE}` }}>
          <p className="text-[10.5px] uppercase tracking-[0.14em] mb-2" style={{ color: MOCK_MUTED, fontWeight: 700 }}>
            Routed to Real Estate · Sarah K.
          </p>
          <ul className="space-y-1">
            {TICKET_CONTEXT.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <Check aria-hidden="true" className="h-3 w-3 flex-shrink-0" strokeWidth={3} style={{ color: "#15803D" }} />
                <span className="text-[12px]" style={{ color: MOCK_TEXT }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[11.5px] mt-2.5" style={{ color: MOCK_MUTED }}>
          The human starts with the full history, not a blank ticket.
        </p>
      </div>
    </div>
  );
}

/* ── 03 Workflows ──────────────────────────────────────── */

const SWEEP_STEPS = [
  "Pull last night's closing photos from every location",
  "Score each against the brand standard",
  "Open a task for any station that failed",
  "Notify the owner and the coach for that territory",
  "File the pass rate against this week's compliance record",
];

function WorkflowsVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setLit(SWEEP_STEPS.length - 1); return; }
    let t: ReturnType<typeof setTimeout>;
    if (lit < SWEEP_STEPS.length - 1) t = setTimeout(() => setLit((v) => v + 1), 700);
    else t = setTimeout(() => setLit(-1), 3200);
    return () => clearTimeout(t);
  }, [inView, reduceMotion, lit]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span className="text-[12.5px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          Nightly compliance sweep
        </span>
        <span className="text-[11px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
          Runs 02:00 · every location
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="space-y-1.5">
          {SWEEP_STEPS.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors duration-500"
              style={{
                backgroundColor: i <= lit ? "rgba(0,174,239,0.08)" : "rgba(10,10,10,0.025)",
                border: `1px solid ${i <= lit ? "rgba(0,174,239,0.28)" : MOCK_HAIRLINE}`,
              }}
            >
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full flex-shrink-0"
                style={{ backgroundColor: i <= lit ? "rgba(22,163,74,0.14)" : "transparent" }}
              >
                {i <= lit
                  ? <Check aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={3} style={{ color: "#15803D" }} />
                  : <span className="text-[10px]" style={{ color: MOCK_MUTED, fontWeight: 700 }}>{i + 1}</span>}
              </span>
              <p className="text-[13px]" style={{ color: MOCK_TEXT, lineHeight: 1.3 }}>{s}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: "rgba(10,10,10,0.03)" }}>
          <span className="text-[11.5px]" style={{ color: MOCK_MUTED, fontWeight: 500 }}>
            <span style={{ color: "#15803D" }}>●</span> Last run 02:04 · 214 locations · 9 tasks opened
          </span>
          <span className="text-[11px]" style={{ color: "#0077A8", fontWeight: 700 }}>
            No one touched it
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 04 Reporting ──────────────────────────────────────── */

const GAPS = [
  { store: "Store #331", note: "Bookings 12% under target", up: false, flagged: true },
  { store: "Store #118", note: "Attach rate down 6%",       up: false, flagged: true },
  { store: "Store #052", note: "Reviews up 11%",            up: true,  flagged: false },
  { store: "Store #402", note: "Rebooking down 4%",         up: false, flagged: true },
];

/** Twelve-week trend, drawn from a fixed series so it never shifts. */
const TREND = [46, 48, 45, 50, 53, 51, 56, 54, 59, 57, 62, 66];

function ReportingVisual() {
  const max = Math.max(...TREND);
  return (
    <div className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <span className="text-[12.5px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
          West territory · this week
        </span>
        <span className="text-[11px]" style={{ color: MOCK_MUTED, fontWeight: 600 }}>
          Auto-refreshed 06:00
        </span>
      </div>

      <div className="px-4 pt-3.5 pb-2" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10.5px] uppercase tracking-[0.14em] mb-1" style={{ color: MOCK_MUTED, fontWeight: 700 }}>
              Bookings vs target
            </p>
            <p className="text-2xl" style={{ color: MOCK_TEXT, fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1 }}>
              66%
            </p>
          </div>
          <div className="flex items-end gap-[3px] h-10" aria-hidden="true">
            {TREND.map((v, i) => (
              <span
                key={i}
                className="w-[6px] rounded-sm"
                style={{
                  height: `${(v / max) * 100}%`,
                  backgroundColor: i === TREND.length - 1 ? BLUE : "rgba(10,10,10,0.13)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-[10.5px] uppercase tracking-[0.14em] mb-2" style={{ color: MOCK_MUTED, fontWeight: 700 }}>
          Gaps this week
        </p>
        <div className="space-y-1">
          {GAPS.map((r, i) => (
            <div
              key={r.store}
              className="flex items-center justify-between gap-2 py-1.5"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${MOCK_HAIRLINE}` }}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="text-[12.5px] font-mono flex-shrink-0" style={{ color: MOCK_TEXT }}>{r.store}</span>
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
          No BI licence, no analyst queue, no quarter-end wait.
        </p>
      </div>
    </div>
  );
}

/* ── 05 AI Apps ────────────────────────────────────────── */

const APP_PROMPT =
  "Build a daily closing audit: photo checklist per station, auto-score, flag fails to the coach";

const APP_STATIONS = ["Front desk", "Treatment rooms", "Retail floor", "Back of house"];

function AiAppsVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [built, setBuilt] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setBuilt(true); return; }
    const t = setTimeout(() => setBuilt(true), 900);
    return () => clearTimeout(t);
  }, [inView, reduceMotion]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden w-full" style={MOCK_SURFACE}>
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${MOCK_HAIRLINE}` }}>
        <p className="text-[10.5px] uppercase tracking-[0.14em] mb-1.5" style={{ color: MOCK_MUTED, fontWeight: 700 }}>
          Built by Store #214
        </p>
        <div className="rounded-lg px-3 py-2" style={{ backgroundColor: "rgba(10,10,10,0.04)", border: `1px solid ${MOCK_HAIRLINE}` }}>
          <p className="text-[12.5px]" style={{ color: MOCK_TEXT, lineHeight: 1.35 }}>
            {APP_PROMPT}
          </p>
        </div>
      </div>

      <motion.div
        className="px-4 py-4"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={built ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[13px]" style={{ color: MOCK_TEXT, fontWeight: 600 }}>
            Daily closing audit
          </p>
          <span
            className="rounded-full px-2 py-0.5 text-[10px]"
            style={{ backgroundColor: "rgba(0,174,239,0.12)", color: "#0077A8", fontWeight: 700 }}
          >
            Live at 1 location
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {APP_STATIONS.map((s) => (
            <div
              key={s}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2"
              style={{ backgroundColor: "rgba(10,10,10,0.025)", border: `1px solid ${MOCK_HAIRLINE}` }}
            >
              <span className="block h-3.5 w-3.5 rounded-[3px] flex-shrink-0" style={{ border: `1.5px solid ${MOCK_MUTED}` }} />
              <span className="text-[12px] truncate" style={{ color: MOCK_TEXT }}>{s}</span>
            </div>
          ))}
        </div>
        <p className="text-[11.5px] mt-2.5" style={{ color: MOCK_MUTED }}>
          Published to their team inside the guardrails HQ set.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Modules ───────────────────────────────────────────── */

const MODULES = [
  {
    id: "answers",
    name: "Answers",
    body: "A 24/7 agent answering franchisee questions, trained on every playbook, SaaS training manual, and operations manual.",
    visual: <AnswersVisual />,
    minH: 520,
  },
  {
    id: "ticketing",
    name: "Ticketing",
    body: "When the answer needs a person, it routes to the right human with the full context already attached.",
    visual: <TicketingVisual />,
    minH: 520,
  },
  {
    id: "workflows",
    name: "Workflows",
    body: "Describe the work once and it runs on a schedule or a trigger, across every location, without anyone opening a laptop.",
    visual: <WorkflowsVisual />,
    minH: 700,
  },
  {
    id: "reporting",
    name: "Reporting",
    body: "The reporting layer your BI stack was supposed to be. Live numbers, gaps surfaced the week they happen, no analyst in between.",
    visual: <ReportingVisual />,
    minH: 620,
  },
  {
    id: "ai-apps",
    name: "AI Apps",
    body: "Build custom apps for franchisee operations. Anyone describes the tool they need and it ships inside your guardrails.",
    visual: <AiAppsVisual />,
    minH: 560,
  },
];

/* ── Section ───────────────────────────────────────────── */

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Nearest-to-centre wins. A scroll listener rather than an
    // IntersectionObserver so the active beat is a pure function of
    // position, with no dependency on observer delivery timing.
    const pick = () => {
      const nodes = moduleRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!nodes.length) return;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      nodes.forEach((n, i) => {
        const r = n.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive((prev) => (prev === best ? prev : best));
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return (
    <SectionShell alt id="capabilities">
      <div className="grid grid-cols-1 lg:grid-cols-[34fr_60fr] gap-10 lg:gap-16 items-start">
        {/* Sticky rail */}
        <div className="lg:sticky lg:top-24">
          <Overline>What it does</Overline>
          <h2
            className="ed-fg leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, fontSize: "clamp(2rem, 1.1rem + 1.9vw, 3rem)" }}
          >
            Five things EZee runs at every location.
          </h2>

          <ol className="mt-8 hidden lg:block" aria-hidden="true">
            {MODULES.map((m, i) => (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  className="flex items-baseline gap-3 py-2 transition-colors"
                  style={{ color: i === active ? "var(--ed-fg)" : "var(--ed-fg-muted)" }}
                >
                  <span className="text-sm tabular-nums" style={{ fontWeight: 600, opacity: i === active ? 1 : 0.6 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg" style={{ fontFamily: "var(--font-editorial)", fontWeight: i === active ? 600 : 400 }}>
                    {m.name}
                  </span>
                  {i === active && (
                    <motion.span
                      layoutId="cap-active"
                      className="ml-1 block h-1.5 w-1.5 rounded-full self-center"
                      style={{ backgroundColor: BLUE }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Scrolling modules */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              id={m.id}
              ref={(el) => {
                moduleRefs.current[i] = el;
              }}
              className="scroll-mt-28 flex flex-col justify-center"
              style={{ minHeight: `${m.minH}px` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-sm tabular-nums" style={{ color: "var(--ed-accent-text)", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="ed-fg text-2xl md:text-3xl tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
                  >
                    {m.name}
                  </h3>
                </div>
                <p className="ed-fg-muted text-base md:text-lg leading-relaxed max-w-xl mb-6">
                  {m.body}
                </p>
                <div className="ed-gradient-frame rounded-3xl p-5 md:p-6">
                  {m.visual}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Section CTA */}
      <div className="mt-14 md:mt-16 flex flex-col sm:flex-row gap-4">
        <Link href="/contact" className="ed-btn ed-btn-blue">
          Speak to an expert
        </Link>
        <Link href="/platform" className="ed-btn ed-btn-secondary">
          See the platform
        </Link>
      </div>
    </SectionShell>
  );
}

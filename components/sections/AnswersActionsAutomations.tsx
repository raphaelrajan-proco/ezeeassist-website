"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Four pillars — Answers · Actions · Agents · Apps.
 *
 * Each pillar gets a massive editorial title in blue, an example mockup
 * card sourced from the deck, two-to-three faded "more examples" lines,
 * and an indicator footer. Mockup alternates left/right on desktop.
 * Anchors: #answers #actions #agents #apps
 */

/* ─── Shared editorial primitives ──────────────────────── */

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] mb-3"
      style={{
        color: "#1B5A6E",
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function MoreExamples({
  items,
  indicator,
}: {
  items: string[];
  indicator: string;
}) {
  return (
    <div className="mt-10">
      <Overline>More examples</Overline>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="ed-fg-muted text-base md:text-lg"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.45,
              opacity: 0.7,
            }}
          >
            &ldquo;{it}&rdquo;
          </li>
        ))}
      </ul>
      <p
        className="ed-accent text-xs mt-6"
        style={{
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {indicator}
      </p>
    </div>
  );
}

/* ─── Mockup: Answers ──────────────────────────────────── */

function AnswersMockup() {
  return (
    <div className="rounded-3xl p-6 md:p-7" style={{ backgroundColor: "#F5EDE0" }}>
      <Overline>● Live answer</Overline>

      {/* User question */}
      <div className="flex justify-end mb-3">
        <div
          className="max-w-[85%] rounded-2xl px-4 py-3"
          style={{
            backgroundColor: "#00AEEF",
            color: "#FFFFFF",
            borderBottomRightRadius: "0.5rem",
          }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.45 }}
          >
            Where do I find the new BOGO promo flyer?
          </p>
        </div>
      </div>

      {/* EZee answer */}
      <div className="flex justify-start mb-4">
        <div
          className="max-w-[90%] rounded-2xl px-4 py-3"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#0A0A0A",
            border: "1px solid rgba(10,10,10,0.08)",
            borderBottomLeftRadius: "0.5rem",
          }}
        >
          <p
            className="text-sm mb-3"
            style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.45 }}
          >
            Here it is. With start date, terms, and your local contact.
          </p>
          <div className="flex flex-wrap gap-2">
            {["BOGO-FLYER.PDF", "TERMS.PDF"].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px]"
                style={{
                  backgroundColor: "rgba(0,174,239,0.10)",
                  color: "#00AEEF",
                  fontWeight: 500,
                }}
              >
                <span>📎</span>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p
        className="text-[10px]"
        style={{
          color: "#1B5A6E",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        ● Answered in 5s
      </p>
    </div>
  );
}

/* ─── Mockup: Actions ──────────────────────────────────── */

function ActionsMockup() {
  const steps = [
    { n: "01", label: "CRM",   text: "Lead created in ServiceTitan" },
    { n: "02", label: "Tag",   text: "HVAC replacement" },
    { n: "03", label: "Route", text: "Sales team notified" },
  ];
  return (
    <div className="rounded-3xl p-6 md:p-7" style={{ backgroundColor: "#F5EDE0" }}>
      <Overline>▸ Hello EZee…</Overline>
      <p
        className="text-base md:text-lg mb-5"
        style={{
          color: "#0A0A0A",
          fontFamily: "var(--font-editorial)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.4,
        }}
      >
        &ldquo;Add this website inquiry to ServiceTitan, tag HVAC
        replacement, assign to Sales.&rdquo;
      </p>
      <p
        className="text-[10px] mb-4"
        style={{
          color: "#1B5A6E",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        ↓ 3 steps · Executed in one turn
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-xl px-3 py-3"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(10,10,10,0.08)",
            }}
          >
            <p
              className="text-[10px] mb-1"
              style={{
                color: "#1B5A6E",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {s.n} · {s.label}
            </p>
            <p
              className="text-[12px]"
              style={{ color: "#0A0A0A", lineHeight: 1.35 }}
            >
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Agents ───────────────────────────────────── */

function AgentsMockup() {
  const rows = [
    { n: "01", text: "Pull sales vs. target from BI" },
    { n: "02", text: "Rank locations needing attention" },
    { n: "03", text: "Draft a prioritized action plan" },
    { n: "04", text: "Email each coach. Mondays, 8am.", highlight: true },
  ];
  return (
    <div className="rounded-3xl p-6 md:p-7" style={{ backgroundColor: "#F5EDE0" }}>
      <Overline>▸ Weekly KPI review · every location</Overline>
      <div className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <div
            key={r.n}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={
              r.highlight
                ? {
                    backgroundColor: "#00AEEF",
                    color: "#FFFFFF",
                  }
                : {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(10,10,10,0.08)",
                    color: "#0A0A0A",
                  }
            }
          >
            <span
              className="text-[11px]"
              style={{
                fontWeight: 600,
                letterSpacing: "0.12em",
                opacity: r.highlight ? 0.85 : 0.55,
              }}
            >
              {r.n}
            </span>
            <p
              className="text-[13px] md:text-sm flex-1"
              style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.4 }}
            >
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mockup: Apps ─────────────────────────────────────── */

function AppsMockup() {
  return (
    <div className="rounded-3xl p-6 md:p-7" style={{ backgroundColor: "#F5EDE0" }}>
      <Overline>▸ Closing Audit · Built from one prompt</Overline>

      {/* Prompt box */}
      <div
        className="rounded-xl px-4 py-3 mb-5"
        style={{
          backgroundColor: "rgba(10,10,10,0.04)",
          border: "1px solid rgba(10,10,10,0.08)",
        }}
      >
        <p
          className="text-sm"
          style={{
            color: "#0A0A0A",
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            lineHeight: 1.4,
          }}
        >
          &ldquo;Build a daily closing-audit app: a photo checklist per
          station, auto-score each one, and flag any fails to the
          coach.&rdquo;
        </p>
      </div>

      {/* Browser/app frame */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(10,10,10,0.08)",
        }}
      >
        {/* URL bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 text-[10px]"
          style={{
            backgroundColor: "rgba(10,10,10,0.04)",
            borderBottom: "1px solid rgba(10,10,10,0.08)",
            color: "#6B6358",
            fontWeight: 500,
          }}
        >
          <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#DC2626" }} />
          <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#D97706" }} />
          <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#16A34A" }} />
          <span className="ml-2 truncate">audit.brand.ezee.app</span>
        </div>

        {/* App content */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-xs"
              style={{
                color: "#1B5A6E",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Closing Audit · Store #214
            </p>
            <span
              className="text-[10px] rounded-full px-2 py-0.5"
              style={{
                backgroundColor: "rgba(0,174,239,0.10)",
                color: "#00AEEF",
                fontWeight: 600,
              }}
            >
              4 / 6 done
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {[
              { ok: true,  text: "Stations sanitized", tag: "Pass" },
              { ok: true,  text: "Tools disinfected",  tag: "Pass" },
              { ok: false, text: "Retail wall restocked", tag: "Flag → Coach" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{
                  backgroundColor: r.ok ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
                }}
              >
                <p
                  className="text-[12px]"
                  style={{ color: "#0A0A0A", fontFamily: "var(--font-editorial)" }}
                >
                  <span style={{ marginRight: "0.4rem", fontWeight: 600 }}>
                    {r.ok ? "✓" : "!"}
                  </span>
                  {r.text}
                </p>
                <span
                  className="text-[10px]"
                  style={{
                    color: r.ok ? "#16A34A" : "#DC2626",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {r.tag}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="w-full rounded-lg py-2.5 text-sm"
            style={{
              backgroundColor: "#00AEEF",
              color: "#FFFFFF",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Submit audit
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Pillar config ────────────────────────────────────── */

type Pillar = {
  id: string;
  index: string;
  label: string;
  description: React.ReactNode;
  mockup: React.ReactNode;
  moreExamples: string[];
  indicator: string;
};

const pillars: Pillar[] = [
  {
    id: "answers",
    index: "01",
    label: "Answers",
    description: (
      <>
        Operators ask. EZee finds the right answer across every system
        you&apos;ve connected. Answers in seconds.
      </>
    ),
    mockup: <AnswersMockup />,
    moreExamples: [
      "What's the spa sanitation checklist for tonight's close?",
      "How do I process a membership freeze in Mindbody?",
      "What were my location's top complaints last month?",
    ],
    indicator: "+ Thousands more, every week",
  },
  {
    id: "actions",
    index: "02",
    label: "Actions",
    description: (
      <>
        Ask EZee to{" "}
        <span
          style={{
            borderBottom: "2px solid currentColor",
            paddingBottom: "0.05em",
          }}
        >
          do
        </span>{" "}
        the work. Across CRM, ERP, scheduling — anything connected.
      </>
    ),
    mockup: <ActionsMockup />,
    moreExamples: [
      "Freeze this member's billing in Mindbody through March.",
      "Reschedule tomorrow's 9am install and notify the customer.",
    ],
    indicator: "+ Any action in any connected system",
  },
  {
    id: "agents",
    index: "03",
    label: "Agents",
    description: (
      <>
        Multi-step agentic workflows, built using natural language, that
        run autonomously on triggers, across HQ and Zees.
      </>
    ),
    mockup: <AgentsMockup />,
    moreExamples: [
      "REVIEW GUARDIAN — Reply to new Google reviews. Escalate 1-stars to the coach.",
      "LEAD RESCUE — Follow up any lead untouched for 48 hours. Rebook it.",
    ],
    indicator: "+ Any workflow you can describe",
  },
  {
    id: "apps",
    index: "04",
    label: "Apps",
    description: (
      <>
        Brands describe the app they need. EZee enables building the
        interface, wiring the data, and shipping it securely across HQ
        and every location.
      </>
    ),
    mockup: <AppsMockup />,
    moreExamples: [
      "ONBOARDING PORTAL — New-franchisee doc collection + e-sign, tracked end to end.",
      "INVENTORY REORDER — Par levels per location, one-tap reorder to the vendor.",
    ],
    indicator: "+ Any app your brand can describe",
  },
];

/* ─── Single pillar ────────────────────────────────────── */

function PillarBlock({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reverse = index % 2 === 1;

  const Text = (
    <div className="lg:col-span-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="ed-fg-muted text-sm mb-4"
        style={{
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Pillar {pillar.index}
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="ed-accent text-7xl md:text-8xl lg:text-[8rem] mb-8"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
        }}
      >
        {pillar.label}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        className="ed-fg text-xl md:text-2xl max-w-xl"
        style={{ lineHeight: 1.45, fontWeight: 400 }}
      >
        {pillar.description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
      >
        <MoreExamples
          items={pillar.moreExamples}
          indicator={pillar.indicator}
        />
      </motion.div>
    </div>
  );

  const Mockup = (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="lg:col-span-6"
    >
      {pillar.mockup}
    </motion.div>
  );

  return (
    <section
      id={pillar.id}
      ref={ref}
      className="scroll-mt-24 py-20 md:py-28"
      style={
        index < pillars.length - 1
          ? {
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "var(--ed-rule)",
            }
          : {}
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {reverse ? (
          <>
            {Mockup}
            {Text}
          </>
        ) : (
          <>
            {Text}
            {Mockup}
          </>
        )}
      </div>
    </section>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function FourPillarsSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-20 md:mb-24"
        >
          <p className="ed-overline mb-8">Capabilities</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Four capabilities. One platform.{" "}
            <span className="ed-accent">
              Every AI idea your brand has, now shippable.
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="ed-fg-muted mt-10 text-xl md:text-2xl max-w-3xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            From instant answers to fully built mini-apps — every
            capability lives inside one platform, connected to your stack.
          </motion.p>
        </motion.div>

        {pillars.map((p, i) => (
          <PillarBlock key={p.id} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
}

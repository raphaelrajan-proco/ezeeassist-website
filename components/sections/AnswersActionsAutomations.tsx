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
  items: React.ReactNode[];
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

/* ─── Mockup: Onboarding Portal (Apps pillar) ──────────── */

function OnboardingPortalMockup() {
  const rows = [
    { ok: true,  text: "Franchise agreement signed",       tag: "Done" },
    { ok: true,  text: "Insurance certificate uploaded",   tag: "Done" },
    { ok: true,  text: "Training modules assigned",        tag: "Done" },
    { ok: false, text: "Bank details pending",             tag: "Reminder sent" },
  ];
  return (
    <div className="rounded-3xl p-6 md:p-7" style={{ backgroundColor: "#F5EDE0" }}>
      <Overline>▸ Onboarding Portal · Built from one prompt</Overline>

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
          &ldquo;Build a new-franchisee onboarding portal: doc collection,
          e-signature, progress tracked end to end.&rdquo;
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
          <span className="ml-2 truncate">onboard.brand.ezee.app</span>
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
              Franchisee Onboarding · Store #087
            </p>
            <span
              className="text-[10px] rounded-full px-2 py-0.5"
              style={{
                backgroundColor: "rgba(0,174,239,0.10)",
                color: "#00AEEF",
                fontWeight: 600,
              }}
            >
              5 / 8 complete
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {rows.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{
                  backgroundColor: r.ok ? "rgba(22,163,74,0.08)" : "rgba(217,119,6,0.08)",
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
                    color: r.ok ? "#16A34A" : "#D97706",
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
            View full checklist
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Apps (Closing Audit — used by BuildExperience) ── */

export function AppsMockup() {
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

/* ─── Ticketing mini mockup (human-in-the-loop) ────────── */

function TicketMiniMockup() {
  const tickets = [
    { id: "#18642", text: "Where do I find the latest brand assets?", tag: "AI Resolved", color: "#16A34A" },
    { id: "#18640", text: "Update a member's billing details",        tag: "Escalated",   color: "#D97706" },
    { id: "#18637", text: "POS isn't syncing at my location",          tag: "Open",        color: "#1B5A6E" },
  ];
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-[10px]"
          style={{
            color: "#1B5A6E",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          My Tickets (16)
        </p>
        <span
          className="text-[10px] rounded-full px-2 py-0.5"
          style={{
            backgroundColor: "rgba(0,174,239,0.10)",
            color: "#00AEEF",
            fontWeight: 600,
          }}
        >
          ● Open (8)
        </span>
      </div>
      <div className="space-y-2">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5"
            style={{
              backgroundColor: "var(--ed-bg-alt)",
              border: "1px solid var(--ed-rule)",
            }}
          >
            <div className="flex items-start gap-2 min-w-0">
              <span
                className="ed-fg-muted text-[10px] mt-0.5"
                style={{ fontWeight: 600, letterSpacing: "0.08em" }}
              >
                {t.id}
              </span>
              <p
                className="ed-fg text-[12px] truncate"
                style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.4 }}
              >
                {t.text}
              </p>
            </div>
            <span
              className="text-[9px] flex-shrink-0"
              style={{
                color: t.color,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {t.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Expansion pillar config (built on Answers) ───────── */

type Pillar = {
  id: string;
  label: string;
  description: React.ReactNode;
  mockup: React.ReactNode;
  moreExamples: React.ReactNode[];
  indicator: string;
};

const expansionPillars: Pillar[] = [
  {
    id: "actions",
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
        the work. Across CRM, ERP, scheduling. Anything connected.
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
    label: "Agents",
    description: (
      <>
        Multi-step agentic workflows, built using natural language, that
        run autonomously on triggers, across HQ and Zees.
      </>
    ),
    mockup: <AgentsMockup />,
    moreExamples: [
      <>
        <strong>Review guardian:</strong> Reply to new Google reviews.
        Escalate 1-stars to the coach.
      </>,
      <>
        <strong>Lead rescue:</strong> Follow up any lead untouched for 48
        hours. Rebook it.
      </>,
    ],
    indicator: "+ Any workflow you can describe",
  },
  {
    id: "apps",
    label: "Apps",
    description: (
      <>
        Brands describe the app they need. EZee enables building the
        interface, wiring the data, and shipping it securely across HQ
        and every location.
      </>
    ),
    mockup: <OnboardingPortalMockup />,
    moreExamples: [
      <>
        <strong>Daily sales logger:</strong> Quick mobile entry for cash
        transactions with auto-reconciliation.
      </>,
      <>
        <strong>Inventory reorder:</strong> Par levels per location, one-tap
        reorder to the vendor.
      </>,
    ],
    indicator: "+ Any app your brand can describe",
  },
];

/* ─── Part A: the Answers foundation block ─────────────── */

function AnswersFoundation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const proofStats = [
    "70%+ support deflected",
    "67% ticket reduction in 30 days (WSI)",
    "94% AI deflection (DekaLash)",
  ];

  return (
    <section id="answers" ref={ref} className="scroll-mt-24 py-16 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Text */}
        <div className="lg:col-span-6">
          <motion.h3
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="ed-accent text-7xl md:text-8xl lg:text-[8rem] mb-8"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
            }}
          >
            Answers.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="ed-fg text-xl md:text-2xl max-w-xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            Operators ask. EZee finds the right answer across the systems
            you&apos;ve connected. Brand-specific, cited, in seconds. This
            is where every brand starts: support and ticketing, transformed
            in the first 10 weeks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <MoreExamples
              items={[
                "What's the spa sanitation checklist for tonight's close?",
                "How do I process a membership freeze in Mindbody?",
                "What were my location's top complaints last month?",
              ]}
              indicator="+ Thousands more, every week"
            />
          </motion.div>
        </div>

        {/* Mockups: chat + ticketing sub-block */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <AnswersMockup />
          </motion.div>

          {/* Human-guaranteed ticketing sub-block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            className="mt-8"
          >
            <p
              className="ed-fg text-lg md:text-xl mb-2"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              And when AI shouldn&apos;t answer alone: human guaranteed.
            </p>
            <p
              className="ed-fg-muted text-sm md:text-base mb-5"
              style={{ lineHeight: 1.5 }}
            >
              Unresolved questions become tickets automatically.
              Categorized, prioritized, routed to the right person with
              full context.
            </p>
            <TicketMiniMockup />
          </motion.div>
        </div>
      </div>

      {/* Proof strip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
        className="mt-14 pt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
        style={{ borderTop: "1px solid var(--ed-rule)" }}
      >
        {proofStats.map((s) => (
          <p key={s} className="ed-fg text-sm md:text-base" style={{ fontWeight: 500 }}>
            <span className="ed-accent" aria-hidden="true">● </span>
            {s}
          </p>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Part B: compact expansion pillar ─────────────────── */

function ExpansionPillar({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reverse = index % 2 === 0; // Actions starts mockup-left for rhythm after Answers

  // DOM order is always heading → mockup → examples so mobile stacks
  // read correctly; desktop alternation is done purely with grid
  // order/column utilities.
  const TextTop = (
    <div
      className={`lg:col-span-6 order-1 ${
        reverse ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="ed-accent text-5xl md:text-6xl mb-6"
        style={{
          fontFamily: "var(--font-editorial)",
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
        }}
      >
        {pillar.label}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        className="ed-fg text-lg md:text-xl max-w-xl"
        style={{ lineHeight: 1.45, fontWeight: 400 }}
      >
        {pillar.description}
      </motion.p>
    </div>
  );

  const Mockup = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className={`lg:col-span-6 lg:row-span-2 self-center order-2 ${
        reverse ? "lg:order-1" : "lg:order-2"
      }`}
    >
      {pillar.mockup}
    </motion.div>
  );

  const Examples = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
      className={`lg:col-span-6 order-3 ${
        reverse ? "lg:col-start-7" : "lg:col-start-1"
      }`}
    >
      <MoreExamples items={pillar.moreExamples} indicator={pillar.indicator} />
    </motion.div>
  );

  return (
    <section
      id={pillar.id}
      ref={ref}
      className="scroll-mt-24 py-14 md:py-20"
      style={
        index < expansionPillars.length - 1
          ? {
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              borderColor: "var(--ed-rule)",
            }
          : {}
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-14 lg:gap-y-6 items-center">
        {TextTop}
        {Mockup}
        {Examples}
      </div>
    </section>
  );
}

/* ─── Section ──────────────────────────────────────────── */

export default function FourPillarsSection() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-100px" });
  const bridgeRef = useRef(null);
  const bridgeInView = useInView(bridgeRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">

        {/* Part A heading: the Foundation */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 22 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-10 md:mb-14"
        >
          <p className="ed-overline mb-8">The Foundation</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            It starts with <span className="ed-accent">Answers.</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="ed-fg-muted mt-8 text-xl md:text-2xl max-w-3xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            Transform support and ticketing. Build on the same foundation
            for all agentic work.
          </motion.p>
        </motion.div>

        <AnswersFoundation />

        {/* Transition: the foundation statement */}
        <motion.div
          ref={bridgeRef}
          initial={{ opacity: 0, y: 18 }}
          animate={bridgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="py-16 md:py-24"
          style={{
            borderTop: "1px solid var(--ed-rule)",
            borderBottom: "1px solid var(--ed-rule)",
          }}
        >
          <p
            className="ed-fg text-3xl md:text-4xl lg:text-5xl max-w-5xl"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Once EZee is answering across your stack, it already has the
            context, the connections, and the permissions.{" "}
            <span className="ed-accent">
              That foundation is what everything else is built on.
            </span>
          </p>
          <p
            className="ed-fg-muted mt-8 text-lg md:text-xl max-w-3xl"
            style={{ lineHeight: 1.5, fontWeight: 400 }}
          >
            Unlock Actions, Agents, and Apps. Same platform. Same
            governance. No new deployment.
          </p>
        </motion.div>

        {/* Part B: the expansion pillars */}
        {expansionPillars.map((p, i) => (
          <ExpansionPillar key={p.id} pillar={p} index={i} />
        ))}
      </div>
    </section>
  );
}

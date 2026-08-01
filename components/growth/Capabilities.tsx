"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "./shared";

/**
 * What it does, built from the auto-rotating showcase design handoff.
 * A rail of five capability pills beside a photo stage. The stage
 * advances every 6.5s, the active pill carries a progress bar, and
 * clicking a pill jumps to its scene and resets the timer.
 *
 * Colours come from `.ed-showcase` in globals.css so the section keeps
 * the handoff palette while still following the site's dark mode.
 */

const DWELL = 6500;

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const JAKARTA = "var(--font-editorial)";

/* Photos are Unsplash stand-ins named by the handoff. Subject matter is
   the spec; swap for brand photography when it exists.
   TODO: replace with owned imagery before launch. */
const PHOTO = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

type Scene = {
  id: string;
  label: string;
  sub: string;
  photo: string;
  alt: string;
  cta: string;
  href: string;
};

/* ids double as deep-link anchors; the footer points at four of them. */
const SCENES: Scene[] = [
  {
    id: "answers", label: "Answers", sub: "Cited, 24/7, every channel",
    photo: PHOTO("photo-1560066984-138dadb4c035"), alt: "Salon front desk",
    cta: "Answers in every channel", href: "/solution",
  },
  {
    id: "agents", label: "Agents", sub: "Multi-step work, human-gated",
    photo: PHOTO("photo-1556910103-1c02745aae4d"), alt: "Restaurant back of house",
    cta: "Describe it once, it runs everywhere", href: "/solution/agents",
  },
  {
    id: "reporting", label: "Reporting and BI Hub", sub: "Live numbers, no queue",
    photo: PHOTO("photo-1551288049-bebda4e38f71"), alt: "Performance dashboard on a laptop",
    cta: "Live numbers, no analyst queue", href: "/solution",
  },
  {
    id: "compliance", label: "Compliance Hub", sub: "Checked nightly, everywhere",
    photo: PHOTO("photo-1454165804606-c3d57bc86b40"), alt: "Standards review with a checklist",
    cta: "Your standard, holding everywhere", href: "/#trust",
  },
  {
    id: "ai-apps", label: "Applications Hub", sub: "Built inside your guardrails",
    photo: PHOTO("photo-1556742049-0cfed4f6a45d"), alt: "Tablet in use at the counter",
    cta: "Anyone builds, HQ governs", href: "/solution",
  },
];

/* ── Card primitives ───────────────────────────────────── */

const cardStyle: React.CSSProperties = {
  background: "var(--sc-panel)",
  border: "1px solid var(--sc-border)",
  borderRadius: 18,
  boxShadow: "var(--sc-shadow)",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const rowStyle: React.CSSProperties = {
  display: "flex", justifyContent: "space-between", gap: 10, fontSize: 12.5,
  background: "var(--sc-panel-2)", border: "1px solid var(--sc-border)",
  borderRadius: 9, padding: "9px 12px", color: "var(--sc-text)",
};

function Mono({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "ok" }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: ".12em", color: tone === "ok" ? "var(--sc-ok)" : "var(--sc-muted)", whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: JAKARTA, fontSize: 14, fontWeight: 700, color: "var(--sc-text)" }}>{children}</span>;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: ".06em", padding: "4px 8px", borderRadius: 5, background: "var(--sc-chip)", border: "1px solid var(--sc-border)", color: "var(--sc-muted)" }}>
      {children}
    </span>
  );
}

/* ── The five scene cards ──────────────────────────────── */

function AnswersCard() {
  return (
    <div style={{ ...cardStyle, width: 380 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Mono>STORE #118 · SLACK</Mono>
        <Mono tone="ok">● 24/7</Mono>
      </div>
      <div style={{ alignSelf: "flex-end", background: "var(--sc-accent-ink)", color: "#fff", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", fontSize: 13, lineHeight: 1.5, maxWidth: 280 }}>
        Can I run the summer promo alongside the loyalty offer?
      </div>
      <div style={{ background: "var(--sc-panel-2)", border: "1px solid var(--sc-border)", padding: "12px 14px", borderRadius: "4px 14px 14px 14px", fontSize: 13, lineHeight: 1.55, color: "var(--sc-text)" }}>
        No. Promotions don&apos;t stack with loyalty redemptions. Apply the higher of the two and note it at close.
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Chip>SUMMER-PROMO-GUIDE.PDF</Chip>
        <Chip>LOYALTY-POLICY.PDF</Chip>
      </div>
    </div>
  );
}

function AgentsCard() {
  const steps = [
    "Pull last night's closing photos, every location",
    "Score each against the brand standard",
    "Open tasks · notify the owner and coach",
  ];
  return (
    <div style={{ ...cardStyle, width: 400 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <CardTitle>Nightly compliance sweep</CardTitle>
        <Mono>AGENT · RUNS 02:00</Mono>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12.5, color: "var(--sc-text)" }}>
            <span style={{ width: 18, height: 18, flex: "none", borderRadius: "50%", background: "var(--sc-accent-soft2)", color: "var(--sc-accent-ink)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--sc-border)", paddingTop: 12, fontSize: 12, color: "var(--sc-muted)" }}>
        <span style={{ color: "var(--sc-ok)" }}>●</span> Last run 02:04 · 214 locations · 9 tasks opened · no one touched it
      </div>
    </div>
  );
}

function ReportingCard() {
  const rows = [
    { store: "Store #331", note: "bookings 12% under", action: "Flagged to coach", accent: true },
    { store: "Store #118", note: "attach rate down 6%", action: "Flagged to coach", accent: true },
    { store: "Store #052", note: "reviews up 11%", action: "No action", accent: false },
  ];
  return (
    <div style={{ ...cardStyle, width: 400, gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <CardTitle>West territory · this week</CardTitle>
        <Mono>REFRESHED 06:00</Mono>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: JAKARTA, fontSize: 40, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1, color: "var(--sc-text)" }}>66%</span>
        <span style={{ fontSize: 12, color: "var(--sc-muted)" }}>bookings vs target</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r) => (
          <div key={r.store} style={rowStyle}>
            <span><b>{r.store}</b> · {r.note}</span>
            <span style={{ color: r.accent ? "var(--sc-accent-ink)" : "var(--sc-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>{r.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceCard() {
  const rows = [
    { store: "Store #331", note: "insurance expires in 14 days", action: "Task opened", tone: "accent" },
    { store: "Store #118", note: "2 modules outstanding", action: "Owner notified", tone: "accent" },
    { store: "Store #214", note: "all current", action: "✓ Pass", tone: "ok" },
  ];
  return (
    <div style={{ ...cardStyle, width: 400 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <CardTitle>Compliance · West territory</CardTitle>
        <Mono>CHECKED NIGHTLY</Mono>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map((r) => (
          <div key={r.store} style={rowStyle}>
            <span><b>{r.store}</b> · {r.note}</span>
            <span style={{ color: r.tone === "ok" ? "var(--sc-ok)" : "var(--sc-accent-ink)", fontWeight: 600, whiteSpace: "nowrap" }}>{r.action}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--sc-muted)" }}>
        Certifications and audits tracked nightly. No chasing.
      </div>
    </div>
  );
}

function AppsCard() {
  const tiles = ["Front desk", "Treatment rooms", "Retail floor", "Back of house"];
  return (
    <div style={{ width: 390, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ alignSelf: "flex-end", background: "var(--sc-accent-ink)", color: "#fff", padding: "12px 16px", borderRadius: "16px 16px 4px 16px", fontSize: 12.5, lineHeight: 1.5, maxWidth: 330, boxShadow: "var(--sc-shadow)" }}>
        Build a daily closing audit: photo checklist per station, auto-score, flag fails to the coach
      </div>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <CardTitle>Daily closing audit</CardTitle>
          <Mono tone="ok">● LIVE AT 1 LOCATION</Mono>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {tiles.map((t) => (
            <span key={t} style={{ fontSize: 12, padding: "9px 12px", borderRadius: 9, background: "var(--sc-panel-2)", border: "1px solid var(--sc-border)", color: "var(--sc-text)" }}>
              ✓ {t}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--sc-muted)" }}>
          Published to their team, inside the guardrails HQ set.
        </div>
      </div>
    </div>
  );
}

/* Card placement per scene, alternating sides for rhythm. */
const CARDS: { node: React.ReactNode; pos: React.CSSProperties }[] = [
  { node: <AnswersCard />,    pos: { top: 64, right: 64 } },
  { node: <AgentsCard />,     pos: { top: 70, right: 70 } },
  { node: <ReportingCard />,  pos: { top: 70, left: 80 } },
  { node: <ComplianceCard />, pos: { top: 80, right: 70 } },
  { node: <AppsCard />,       pos: { top: 60, right: 70 } },
];

/* ── Section ───────────────────────────────────────────── */

export default function Capabilities() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setTab((t) => (t + 1) % SCENES.length), DWELL);
  }, [stopTimer]);

  useEffect(() => {
    if (paused) stopTimer();
    else startTimer();
    return stopTimer;
  }, [paused, startTimer, stopTimer]);

  /* Deep links land on their scene: the footer points at four of these. */
  useEffect(() => {
    const i = SCENES.findIndex((s) => `#${s.id}` === window.location.hash);
    if (i >= 0) setTab(i);
  }, []);

  const select = (i: number) => {
    setTab(i);
    startTimer();
  };

  return (
    <SectionShell alt id="capabilities">
      <div className="ed-showcase">
        <h2
          className="ed-fg leading-[1.05] tracking-[-0.03em] mb-10 md:mb-12 max-w-3xl"
          /* Two lines, one per span. The first line is the longer of the
             two and sets the ceiling: 23px at 390, 45.2 at 768, 51.6 from
             1024 up, against a column of 342 / 672 / 768. */
          style={{ fontFamily: JAKARTA, fontWeight: 500, fontSize: "clamp(1.375rem, 0.02rem + 5.56vw, 3.0625rem)" }}
        >
          <span className="block" style={{ color: "#00AEEF" }}>EZee flips the 4/5 days to growth,</span>
          <span className="block">by automating the rest.</span>
        </h2>

        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-9 lg:items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Rail */}
          <div
            className="flex flex-row lg:flex-col gap-3 lg:w-[250px] lg:flex-none lg:justify-center overflow-x-auto lg:overflow-visible"
            role="tablist"
            aria-label="Capabilities"
          >
            {SCENES.map((s, i) => {
              const active = i === tab;
              return (
                <button
                  key={s.id}
                  id={s.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`scene-${s.id}`}
                  onClick={() => select(i)}
                  className="relative overflow-hidden text-left flex-none lg:flex-auto scroll-mt-28"
                  style={{
                    padding: "14px 18px", borderRadius: 14, boxSizing: "border-box",
                    minWidth: 190,
                    background: active ? "var(--sc-panel)" : "var(--sc-chip)",
                    border: `1.5px solid ${active ? "var(--sc-accent)" : "var(--sc-border)"}`,
                    boxShadow: active ? "var(--sc-shadow)" : "none",
                    transition: "background .3s, border-color .3s",
                  }}
                >
                  <div style={{ fontFamily: JAKARTA, fontSize: 14.5, fontWeight: 700, color: "var(--sc-text)" }}>{s.label}</div>
                  <div style={{ fontSize: 11.5, color: "var(--sc-muted)", marginTop: 2 }}>{s.sub}</div>
                  {active && (
                    /* key restarts the fill on every tab change */
                    <span
                      key={`${tab}-${paused}`}
                      className="ed-sc-bar"
                      style={{
                        position: "absolute", left: 0, bottom: 0, height: 2.5,
                        background: "var(--sc-accent)",
                        animation: paused ? undefined : `ed-sc-tab-fill ${DWELL}ms linear forwards`,
                        width: paused ? "100%" : undefined,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Stage */}
          <div
            className="relative flex-1 rounded-3xl overflow-hidden"
            style={{ aspectRatio: "1100 / 560", border: "1px solid var(--sc-border)", background: "var(--sc-stage)" }}
          >
            {SCENES.map((s, i) => {
              const active = i === tab;
              return (
                <div
                  key={s.id}
                  id={`scene-${s.id}`}
                  role="tabpanel"
                  aria-label={s.label}
                  aria-hidden={!active}
                  className="absolute inset-0"
                  style={{ opacity: active ? 1 : 0, transition: "opacity .8s ease", pointerEvents: active ? undefined : "none" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.photo}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(5,7,13,.3), rgba(5,7,13,.06))" }} />

                  {/* Floating product card. Hidden below md, where the stage
                      is too narrow to hold a 400px card. */}
                  <div className="hidden md:block absolute" style={CARDS[i].pos}>
                    {CARDS[i].node}
                  </div>

                  {/* The longest labels run to 312px, which overruns a 342px
                      stage at 390. Below md the pill tightens its insets,
                      type and padding, and the label truncates rather than
                      clipping against the stage edge. */}
                  <Link
                    href={s.href}
                    className="absolute flex items-center gap-2 md:gap-3 bottom-3 right-3 md:bottom-7 md:right-7 p-1.5 md:p-2.5 max-w-[calc(100%-1.5rem)] md:max-w-[calc(100%-3.5rem)]"
                    style={{
                      background: "var(--sc-panel)", border: "1px solid var(--sc-border)",
                      borderRadius: 999, boxShadow: "var(--sc-shadow)",
                    }}
                  >
                    <span
                      className="truncate pl-2.5 md:pl-4 text-[12px] md:text-[14px]"
                      style={{ fontFamily: JAKARTA, fontWeight: 600, color: "var(--sc-text)" }}
                    >
                      {s.cta}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-7 w-7 md:h-[34px] md:w-[34px]"
                      style={{ borderRadius: "50%", background: "var(--sc-accent-ink)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}
                    >
                      <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" strokeWidth={2.25} />
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

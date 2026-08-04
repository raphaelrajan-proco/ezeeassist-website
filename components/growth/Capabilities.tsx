"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * On demand, built from the showcase design handoff. A rail of three
 * capability pills beside a photo stage that auto-advances per the
 * dwell constants below; the third tab's owner-built tools render as
 * white-label product mocks from the app-mocks handoff.
 * Each scene is a demo that proves its tile's claim rather than
 * illustrating it, which is why the dwell is longer than the five-tile
 * version it replaces.
 *
 * Only the active scene is mounted. That is what makes the entrance
 * sequence replay on every advance, and the sequence ordering is the
 * design: on scene 1 the gap between question and answer reads as the
 * system responding, on scene 3 the gap between panels is the twenty
 * minutes.
 *
 * Colours come from `.ed-showcase` in globals.css.
 */

/* Tabs 1 and 2 hold 7s. Tab 3 holds 21s because it rotates three app
   examples at 7s each inside itself, and its progress bar fills over the
   whole 21 rather than per example. */
const DWELL = 7_000;
const APP_DWELL = 7_000;
const APPS_COUNT = 3;
const TAB_DWELL = (i: number) => (i === 2 ? APP_DWELL * APPS_COUNT : DWELL);

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const JAKARTA = "var(--font-editorial)";

/* Photos are Unsplash stand-ins named by the handoff. Subject matter is
   the spec; swap for brand photography when it exists.
   TODO: replace with owned imagery before launch. */
const PHOTO = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

/* ids double as deep-link anchors. The footer points at /#answers,
   /#reporting and /#ai-apps, so these three names are load-bearing
   outside this file. See HANDOFF for the fourth, /#agents, which lost
   its tile when the rail went from five to three. */
const TABS = [
  {
    id: "answers",
    label: "Ask for anything",
    sub: "One question, any channel. Cited from your approved sources, scoped to that person’s role and location.",
    photo: PHOTO("photo-1560066984-138dadb4c035"),
    alt: "Front desk at a location",
    scrim: "linear-gradient(105deg, rgba(5,7,13,.62), rgba(5,7,13,.18))",
  },
  {
    id: "reporting",
    label: "See the data how you want",
    sub: "The same numbers, rendered however you ask. No analyst, no queue, no dashboard.",
    photo: PHOTO("photo-1551288049-bebda4e38f71"),
    alt: "Performance numbers on a laptop",
    scrim: "linear-gradient(105deg, rgba(5,7,13,.66), rgba(5,7,13,.2))",
  },
  {
    id: "ai-apps",
    label: "Build the tool that is missing",
    sub: "Describe a tool your network needs. It ships inside the guardrails HQ set.",
    photo: PHOTO("photo-1556742049-0cfed4f6a45d"),
    alt: "Tablet in use at the counter",
    scrim: "linear-gradient(105deg, rgba(5,7,13,.64), rgba(5,7,13,.2))",
  },
];

const EASE_OUT = "cubic-bezier(.2,.8,.2,1)";

/** Entrance helper. `anim` names the keyframe, `d` is the delay in seconds. */
const enter = (anim: string, d: number, dur = 0.55): React.CSSProperties => ({
  animation: `${anim} ${dur}s ${anim === "ed-sc-scene-in" ? "ease" : EASE_OUT} both ${d}s`,
});

const card: React.CSSProperties = {
  background: "var(--sc-panel)",
  border: "1px solid var(--sc-border)",
  borderRadius: 18,
  boxShadow: "var(--sc-shadow)",
  boxSizing: "border-box",
};

const monoLabel: React.CSSProperties = {
  fontFamily: MONO, fontSize: 11, letterSpacing: ".06em", color: "var(--sc-muted)",
};

/* Captions sit on the photo, not on a panel, so they take a fixed light
   ink rather than a theme token. The scrim is dark in both themes.
   The shadow is the one addition to the handoff here: the scrim runs to
   0.18-0.2 alpha at the right end, and the captions in scenes 2 and 3
   span the full stage, so their tails land on bright photo. */
const caption: React.CSSProperties = {
  fontSize: 13.5, lineHeight: 1.5, color: "#E6ECF7",
  textShadow: "0 1px 3px rgba(5,7,13,.75), 0 0 12px rgba(5,7,13,.5)",
};

/* ── Channel glyphs ────────────────────────────────────────
   Inline, `currentColor`, no external requests. The icon CDN does not
   serve Slack or Teams marks, which is why these are generic glyphs
   rather than brand marks. Swap for committed local SVGs if brand
   assets land; never reference a CDN from production. */

/* The Slack hash glyph was dropped: without the brand mark it read as a
   command key rather than a channel. Four channels plus the ++ pill. */
const CHANNELS: { name: string; path: React.ReactNode }[] = [
  {
    name: "SMS",
    path: <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" /><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12.5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    name: "Teams",
    path: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9.5" r="2.2" /><path d="M15.4 15.2A4.4 4.4 0 0 1 21 19" /></>,
  },
  {
    name: "Email",
    path: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3.8 7.2 12 13l8.2-5.8" /></>,
  },
  {
    name: "WhatsApp",
    path: <><path d="M21 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.5-5A8.4 8.4 0 1 1 21 11.6z" /><path d="M9.2 9.1c.3 2.6 2.3 4.6 4.9 5l1.1-1.4 1.6.9-.5 1.6a5.6 5.6 0 0 1-6.2-2 5.6 5.6 0 0 1-1.6-4l1.6-.6z" /></>,
  },
];

const pillCircle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: "50%", flex: "none",
  background: "var(--sc-panel)", border: "1px solid var(--sc-border)",
  display: "flex", alignItems: "center", justifyContent: "center",
};

function ChannelRow() {
  return (
    <div className="ed-sc-anim flex flex-wrap items-center gap-2.5" style={enter("ed-sc-rise", 0.05, 0.5)}>
      {CHANNELS.map((c) => (
        <span key={c.name} aria-label={c.name} title={c.name} role="img" style={{ ...pillCircle, color: "var(--sc-text)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {c.path}
          </svg>
        </span>
      ))}
      <span
        aria-hidden="true"
        style={{ ...pillCircle, fontFamily: JAKARTA, fontSize: 13, fontWeight: 600, letterSpacing: ".1em", color: "var(--sc-muted)" }}
      >
        ++
      </span>
    </div>
  );
}

/* ── Scene 1: Answers ──────────────────────────────────── */

function SceneAnswers() {
  return (
    <>
      <ChannelRow />

      <div className="ed-sc-anim flex flex-col gap-3.5 p-5" style={{ ...card, ...enter("ed-sc-rise", 0.18) }}>
        <div style={monoLabel}>STORE #118 · SHIFT LEAD · 9:14AM</div>
        <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.45, color: "var(--sc-text)" }}>
          Can I run the summer promo alongside the loyalty offer?
        </div>
        <div style={{ height: 1, background: "var(--sc-border)" }} />
        {/* The delay here is deliberate. It reads as the system answering. */}
        <div className="ed-sc-anim" style={{ fontSize: 15, lineHeight: 1.55, color: "var(--sc-text)", ...enter("ed-sc-rise", 0.5, 0.5) }}>
          No. Promotions don&apos;t stack with loyalty redemptions. Apply the
          higher of the two and note it at close.
        </div>
        <div className="ed-sc-anim flex flex-wrap items-center gap-2" style={enter("ed-sc-rise", 0.78, 0.5)}>
          {["summer-promo-guide.pdf", "loyalty-policy.pdf"].map((f) => (
            <span
              key={f}
              style={{
                fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 6,
                background: "var(--sc-accent-soft)", color: "var(--sc-accent-ink)",
              }}
            >
              {f}
            </span>
          ))}
          <span style={{ fontSize: 12, color: "var(--sc-muted)" }}>answered in 6s</span>
        </div>
      </div>

      <div className="ed-sc-anim" style={{ ...caption, ...enter("ed-sc-scene-in", 1, 0.5) }}>
        A district manager asking the same question sees margin impact too. A
        shift lead doesn&apos;t.
      </div>
    </>
  );
}

/* ── Scene 2: See the data how you want ────────────────── */

const RANK_ROWS = [
  { store: "#052", pct: 96, delay: 0.4, muted: false },
  { store: "#214", pct: 88, delay: 0.5, muted: false },
  { store: "#331", pct: 66, delay: 0.6, muted: false },
  { store: "#118", pct: 50, delay: 0.7, muted: false },
  { store: "#402", pct: 24, delay: 0.8, muted: true },
];

const BEHIND_ROWS = [
  { store: "#402", delta: "−18%", tone: "bad" as const, delay: 0.55 },
  { store: "#118", delta: "−11%", tone: "bad" as const, delay: 0.68 },
  { store: "#331", delta: "−4%", tone: "warn" as const, delay: 0.81 },
];

function AskTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--sc-accent-ink)", lineHeight: 1.4 }}>
      {children}
    </div>
  );
}

function SceneData() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-[18px]">
        <div className="ed-sc-anim flex flex-col gap-4 p-5 lg:h-[270px]" style={{ ...card, ...enter("ed-sc-rise", 0.08) }}>
          <AskTitle>&ldquo;Rank my territory by attach rate&rdquo;</AskTitle>
          <div className="flex flex-col gap-[11px]">
            {RANK_ROWS.map((r) => (
              <div key={r.store} className="flex items-center gap-3">
                <span style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--sc-muted)", width: 42, flex: "none" }}>
                  {r.store}
                </span>
                <span style={{ height: 11, width: "100%", background: "var(--sc-track)", borderRadius: 6, overflow: "hidden" }}>
                  <span
                    className="ed-sc-anim block h-full"
                    style={{
                      width: `${r.pct}%`, borderRadius: 6, transformOrigin: "left",
                      background: r.muted ? "var(--sc-muted)" : "var(--sc-accent)",
                      ...enter("ed-sc-grow", r.delay, 0.7),
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ed-sc-anim flex flex-col gap-4 p-5 lg:h-[270px]" style={{ ...card, ...enter("ed-sc-rise", 0.2) }}>
          <AskTitle>&ldquo;Show that as a trend instead&rdquo;</AskTitle>
          {/* Uniform scaling only. `preserveAspectRatio="none"` stretched
              the 300x150 box to 255x158 here, which scales x and y by
              different factors and thins the 3px stroke unevenly. */}
          <svg viewBox="0 0 300 150" className="w-full" style={{ height: 150 }} aria-hidden="true">
            <path
              d="M10 134 C 70 132 120 128 170 126 C 220 124 260 120 288 116"
              fill="none" stroke="var(--sc-muted)" strokeWidth="2" strokeDasharray="5 7" opacity=".55"
            />
            <path
              className="ed-sc-draw"
              d="M10 118 C 60 112 78 104 112 106 C 150 108 186 74 220 62 C 250 52 268 40 288 30"
              fill="none" stroke="var(--sc-accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="420"
              style={{ animation: "ed-sc-draw 1.1s ease both .45s" }}
            />
            <circle className="ed-sc-anim" cx="288" cy="30" r="6" fill="var(--sc-accent)" style={enter("ed-sc-scene-in", 1.5, 0.4)} />
          </svg>
          <div className="flex justify-between" style={{ fontSize: 12, color: "var(--sc-muted)" }}>
            <span>wk 40</span><span>wk 45</span>
          </div>
        </div>

        <div className="ed-sc-anim flex flex-col gap-4 p-5 lg:h-[270px]" style={{ ...card, ...enter("ed-sc-rise", 0.32) }}>
          <AskTitle>&ldquo;Just the ones behind plan, weekly&rdquo;</AskTitle>
          <div className="flex flex-col gap-2.5">
            {BEHIND_ROWS.map((r) => (
              <div
                key={r.store}
                className="ed-sc-anim flex items-center justify-between"
                style={{
                  padding: "11px 14px", borderRadius: 10,
                  background: r.tone === "bad" ? "var(--sc-bad-soft)" : "var(--sc-warn-soft)",
                  ...enter("ed-sc-slide", r.delay, 0.5),
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, color: `var(--sc-${r.tone})` }}>
                  {r.store}
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: `var(--sc-${r.tone})` }}>{r.delta}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--sc-muted)" }}>3 of 12 locations</div>
        </div>
      </div>

      <div className="ed-sc-anim" style={{ ...caption, ...enter("ed-sc-scene-in", 1.05, 0.5) }}>
        Same underlying numbers. Three questions, three renderings, no one
        built a dashboard.
      </div>
    </>
  );
}

/* ── Scene 3: Build the tool that is missing ─────────────
   Three industry examples on one layout, rotating inside the tab. The
   first is the same 3:45pm Store #214 moment that appears on the
   always-on wall; that continuity is deliberate, so do not renumber it. */

type AppExample = {
  id: string;
  photo: string;
  alt: string;
  scrim: string;
  meta: string;
  request: string;
  live: string;
  caption: string;
  /* lg-only top inset inside the 580px stage, from the mocks handoff:
     the three devices are different heights, so each scene starts at
     its own line. */
  box: string;
};

const APP_SCRIM = "linear-gradient(105deg, rgba(5,7,13,.64), rgba(5,7,13,.2))";

const APPS: AppExample[] = [
  {
    id: "closing-audit",
    photo: PHOTO("photo-1556742049-0cfed4f6a45d"),
    alt: "Tablet in use at the counter",
    scrim: APP_SCRIM,
    meta: "STORE #214 · OWNER · 3:45PM",
    request: "\u201cBuild a daily closing audit. Photo checklist per station, auto-score it, flag fails to my coach.\u201d",
    live: "live · 20 min later",
    caption: "Built by an owner, not a developer. HQ reviewed it and published it to all 214 locations the same evening.",
    box: "lg:top-[82px]",
  },
  {
    id: "lesson-booker",
    photo: PHOTO("photo-1530549387789-4c1017266635"),
    alt: "Swim school pool lanes",
    scrim: APP_SCRIM,
    meta: "SCHOOL #036 · OWNER · 11:20AM",
    request: "\u201cBuild a make-up lesson booker. Parents pick an open slot, cap four per class, notify the instructor.\u201d",
    live: "live · 25 min later",
    caption: "Built between classes. Parents book themselves in, the instructor just sees the roster.",
    box: "lg:top-[44px]",
  },
  {
    id: "hiring-pipeline",
    photo: PHOTO("photo-1576765608535-5f04d1e3f289"),
    alt: "Caregiver with a senior client",
    scrim: APP_SCRIM,
    meta: "BRANCH #052 · OWNER · 2:10PM",
    request: "\u201cBuild a caregiver application tracker. Flag missing certifications and chase references, so I only see interview-ready applicants.\u201d",
    live: "live · 20 min later",
    caption: "The system chases the paperwork. The owner just interviews.",
    box: "lg:top-[96px]",
  },
];

/* ── The three white-label mocks ───────────────────────────
   Rebuilt from the app-mocks handoff: each owner-built tool renders as a
   realistic product on real hardware, in a fictional brand palette that
   is deliberately NOT the site's. The mismatch is the point: an owner
   built their own branded tool, so the usual accent-remap convention
   does not apply inside these frames. No real company names; a glyph
   plus a functional title instead. The web app mock stays light in both
   themes, because it is a third-party product, not site chrome. Sizes
   are the handoff's, rendered at natural size with no transform scaling,
   which is what keeps the type crisp. */

/** The violet chip that floats over every device's top-right corner.
    Theme-independent by design. */
function LivePill({ label, right }: { label: string; right: number }) {
  return (
    <span
      style={{
        position: "absolute", top: -13, right, zIndex: 2,
        fontSize: 11.5, fontWeight: 700, padding: "5px 12px", borderRadius: 999,
        background: "#0B101C", border: "1px solid rgba(167,139,250,.5)", color: "#A78BFA",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/* Mock 1: the closing audit on an iPad at the POS. Teal brand, warm
   cream screen. */
function AuditRow({ label, count, delay }: { label: string; count: string; delay: number }) {
  return (
    <div
      className="ed-sc-anim flex items-center justify-between"
      style={{
        background: "#FFFFFF", border: "1px solid #ECE7DD", borderRadius: 13,
        padding: "12px 14px", ...enter("ed-sc-slide", delay, 0.4),
      }}
    >
      <span className="flex items-center gap-[11px]" style={{ fontSize: 14, fontWeight: 600 }}>
        <span
          aria-hidden="true"
          className="flex items-center justify-center"
          style={{ width: 20, height: 20, borderRadius: 7, background: "#0E8074", color: "#fff", fontSize: 11 }}
        >
          ✓
        </span>
        {label}
      </span>
      <span style={{ fontSize: 12, color: "#8A8272" }}>{count}</span>
    </div>
  );
}

function TabletMock({ live }: { live: string }) {
  return (
    <div className="relative" style={enter("ed-sc-rise", 0.55)}>
      <LivePill label={live} right={16} />
      <div style={{ background: "#15181F", borderRadius: 28, padding: 13, boxShadow: "var(--sc-shadow)" }}>
        <div style={{ background: "#FBF9F5", borderRadius: 17, overflow: "hidden", color: "#26221B" }}>
          <div
            className="flex items-center justify-between"
            style={{ background: "linear-gradient(135deg, #0E8074, #0A6B60)", color: "#fff", padding: "15px 20px" }}
          >
            <span className="flex items-center gap-[11px]">
              <span
                className="flex items-center justify-center"
                style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(255,255,255,.18)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4c1.8 2.4 1.8 5.6 0 8-1.8-2.4-1.8-5.6 0-8z" />
                  <path d="M6.5 8.5c2.6.6 4.6 2.8 5.5 5.5-2.9.4-5.7-1-7-3.5z" />
                  <path d="M17.5 8.5c-2.6.6-4.6 2.8-5.5 5.5 2.9.4 5.7-1 7-3.5z" />
                  <path d="M5.5 16.5c1.9 2.4 4 3.5 6.5 3.5s4.6-1.1 6.5-3.5" />
                </svg>
              </span>
              <span style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>
                Closing Audit
              </span>
            </span>
            <span style={{ fontSize: 12, opacity: 0.85 }}>Store #214 · Tonight</span>
          </div>
          <div
            className="ed-sc-anim flex items-center justify-between"
            style={{ padding: "16px 20px 8px", ...enter("ed-sc-rise", 0.85, 0.4) }}
          >
            <span style={{ fontSize: 13, color: "#8A8272" }}>Auto-score</span>
            <span className="flex items-baseline gap-1.5">
              <span style={{ fontFamily: JAKARTA, fontSize: 27, fontWeight: 800, letterSpacing: "-0.03em", color: "#0E8074" }}>92</span>
              <span style={{ fontSize: 12, color: "#8A8272" }}>/ 100</span>
            </span>
          </div>
          <div className="flex flex-col gap-[9px]" style={{ padding: "10px 20px 16px" }}>
            <AuditRow label="Front desk" count="4 photos" delay={0.95} />
            <AuditRow label="Treatment rooms" count="6 photos" delay={1.05} />
            <AuditRow label="Retail floor" count="3 photos" delay={1.15} />
            {/* The exception row: amber, unchecked, the reason the tool exists. */}
            <div
              className="ed-sc-anim flex items-center justify-between"
              style={{
                background: "#FBF4E2", border: "1px solid #EBDCB2", borderRadius: 13,
                padding: "12px 14px", ...enter("ed-sc-slide", 1.25, 0.4),
              }}
            >
              <span className="flex items-center gap-[11px]" style={{ fontSize: 14, fontWeight: 600, color: "#8A6A1F" }}>
                <span aria-hidden="true" style={{ width: 20, height: 20, borderRadius: 7, border: "1.5px solid #C9A94F", boxSizing: "border-box" }} />
                Back of house
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#8A6A1F" }}>2 photos needed</span>
            </div>
            <div style={{ fontSize: 12, color: "#8A8272", paddingTop: 3 }}>Fails flag to your coach automatically</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mock 2: the make-up lesson booker as a parent-facing phone app. Aqua
   brand, coral CTA. Fixed 296 wide so it reads as a real phone. */
function SlotRow({ left, right, state, delay }: { left: string; right: string; state: "full" | "selected" | "open"; delay: number }) {
  const base: React.CSSProperties = {
    borderRadius: 14, padding: "12px 15px", fontSize: 13.5,
    ...enter("ed-sc-slide", delay, 0.4),
  };
  const styles: Record<string, React.CSSProperties> = {
    full: { ...base, border: "1px solid #D5E8F2", background: "#fff", color: "#8FA9B8" },
    selected: {
      ...base, border: "1.5px solid #0E7FC1", background: "#0E7FC1", color: "#fff",
      fontWeight: 600, boxShadow: "0 6px 16px -8px rgba(14,127,193,.55)",
    },
    open: { ...base, border: "1px solid #D5E8F2", background: "#fff" },
  };
  return (
    <div className="ed-sc-anim flex items-center justify-between" style={styles[state]}>
      <span>{left}</span>
      <span style={{ fontSize: 10.5, fontWeight: 700, ...(state === "selected" ? { opacity: 0.9 } : state === "open" ? { color: "#5D7A8C" } : {}) }}>
        {right}
      </span>
    </div>
  );
}

function PhoneMock({ live }: { live: string }) {
  return (
    <div className="relative flex justify-center" style={enter("ed-sc-rise", 0.55)}>
      <LivePill label={live} right={44} />
      <div style={{ width: 296, background: "#10141C", borderRadius: 44, padding: 11, boxShadow: "var(--sc-shadow)" }}>
        <div className="flex flex-col overflow-hidden" style={{ background: "#F4FAFD", borderRadius: 34, color: "#0A3550" }}>
          <div className="flex items-center justify-between" style={{ padding: "11px 22px 2px", fontSize: 11, fontWeight: 600 }}>
            <span>9:41</span>
            <span aria-hidden="true" style={{ width: 15, height: 8, border: "1px solid #0A3550", borderRadius: 2.5, opacity: 0.7 }} />
          </div>
          <div className="flex items-center gap-2.5" style={{ padding: "12px 20px 4px" }}>
            <span className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg, #0E7FC1, #0A649B)" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 9c3-3.5 6-3.5 9 0s6 3.5 9 0" />
                <path d="M3 15.5c3-3.5 6-3.5 9 0s6 3.5 9 0" />
              </svg>
            </span>
            <span style={{ fontFamily: JAKARTA, fontSize: 14, fontWeight: 700 }}>Make-up Lessons</span>
          </div>
          <div style={{ padding: "10px 20px 2px" }}>
            <div style={{ fontFamily: JAKARTA, fontSize: 17.5, fontWeight: 700, letterSpacing: "-0.015em" }}>
              Emma&rsquo;s make-up lesson
            </div>
            <div style={{ fontSize: 12, color: "#5D7A8C", marginTop: 3 }}>Level 3 · missed Tue, Apr 14</div>
          </div>
          <div className="flex flex-col gap-2" style={{ padding: "12px 16px 4px" }}>
            <SlotRow left="Tue 4:00pm" right="FULL" state="full" delay={0.85} />
            <SlotRow left="Thu 5:30pm" right="FULL" state="full" delay={0.95} />
            <SlotRow left="Sat 9:00am" right="3 SPOTS" state="selected" delay={1.05} />
            <SlotRow left="Sat 10:30am" right="2 SPOTS" state="open" delay={1.15} />
          </div>
          <div
            className="ed-sc-anim text-center"
            style={{
              margin: "12px 16px 7px", background: "#FF6B4A", color: "#fff", borderRadius: 999,
              padding: "13px 0", fontFamily: JAKARTA, fontSize: 13.5, fontWeight: 700,
              boxShadow: "0 8px 18px -8px rgba(255,107,74,.6)", ...enter("ed-sc-rise", 1.3, 0.4),
            }}
          >
            Book Sat 9:00am
          </div>
          <div className="ed-sc-anim text-center" style={{ fontSize: 11, color: "#5D7A8C", paddingBottom: 7, ...enter("ed-sc-rise", 1.45, 0.4) }}>
            Coach Kim sees the updated roster
          </div>
          <div aria-hidden="true" style={{ width: 76, height: 5, borderRadius: 999, background: "#0A3550", opacity: 0.2, margin: "2px auto 9px" }} />
        </div>
      </div>
    </div>
  );
}

/* Mock 3: the hiring pipeline as a desktop web app in a browser window.
   Navy brand, sage logo. Always light, whatever the site theme. */
const PIPE_GRID: React.CSSProperties = { display: "grid", gridTemplateColumns: "1.3fr 1fr .95fr", alignItems: "center", columnGap: 8 };

function PipeRow({ name, certs, certsColor, stage, stageBg, stageColor, delay }: {
  name: string; certs: string; certsColor: string; stage: string; stageBg: string; stageColor: string; delay: number;
}) {
  return (
    <div className="ed-sc-anim" style={{ ...PIPE_GRID, padding: "11px 18px", borderTop: "1px solid #EDF0F4", fontSize: 13, ...enter("ed-sc-slide", delay, 0.4) }}>
      <span style={{ fontWeight: 600 }}>{name}</span>
      <span style={{ color: certsColor, fontSize: 11.5 }}>{certs}</span>
      <span>
        <span style={{ background: stageBg, color: stageColor, fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
          {stage}
        </span>
      </span>
    </div>
  );
}

function BrowserMock({ live }: { live: string }) {
  return (
    <div className="relative" style={enter("ed-sc-rise", 0.55)}>
      <LivePill label={live} right={16} />
      <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "var(--sc-shadow)", border: "1px solid rgba(12,20,36,.12)", color: "#1E2733" }}>
        <div className="flex items-center gap-3" style={{ background: "#EEF1F5", padding: "10px 16px" }}>
          <span className="flex gap-1.5" aria-hidden="true">
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F6635A" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5BD4F" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#62C554" }} />
          </span>
          <span className="flex-1" style={{ background: "#fff", borderRadius: 8, padding: "5px 12px", fontFamily: MONO, fontSize: 11.5, color: "#5A6472" }}>
            app.careteam.io/hiring
          </span>
        </div>
        <div className="flex items-center justify-between" style={{ background: "linear-gradient(135deg, #233C5B, #1B2F49)", color: "#fff", padding: "13px 18px" }}>
          <span className="flex items-center gap-2.5">
            <span className="flex items-center justify-center" style={{ width: 26, height: 26, borderRadius: 8, background: "#7FB069" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#17301B" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 11l8-7 8 7v9H4z" />
                <path d="M12 16.5c-1.8-1.2-2.8-2.3-2.8-3.4 0-.9.7-1.6 1.5-1.6.5 0 1 .3 1.3.8.3-.5.8-.8 1.3-.8.8 0 1.5.7 1.5 1.6 0 1.1-1 2.2-2.8 3.4z" fill="#17301B" stroke="none" />
              </svg>
            </span>
            <span style={{ fontFamily: JAKARTA, fontSize: 14, fontWeight: 700 }}>Hiring Pipeline</span>
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,.16)", padding: "5px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
            4 interview-ready
          </span>
        </div>
        <div className="flex flex-wrap" style={{ padding: "10px 18px", gap: 16, fontSize: 12, color: "#5A6472", borderBottom: "1px solid #EDF0F4" }}>
          <span><b style={{ color: "#1E2733" }}>12</b> applicants</span>
          <span>Auto-chase references: on</span>
          <span>Certs checked nightly</span>
        </div>
        {/* Tracking tighter than the handoff's .12em: our column is
            ~370px against its ~490, and CERTIFICATIONS collided with
            STAGE at the wider setting. */}
        <div style={{ ...PIPE_GRID, padding: "8px 18px", fontFamily: MONO, fontSize: 9, letterSpacing: ".07em", color: "#8A93A3" }}>
          <span>APPLICANT</span><span>CERTIFICATIONS</span><span>STAGE</span>
        </div>
        <PipeRow name="M. Alvarez" certs="All current" certsColor="#3E7A4E" stage="Interview-ready" stageBg="#E4F2E6" stageColor="#3E7A4E" delay={0.85} />
        <PipeRow name="J. Chen" certs="All current" certsColor="#3E7A4E" stage="Interview-ready" stageBg="#E4F2E6" stageColor="#3E7A4E" delay={0.97} />
        <PipeRow name="R. Patel" certs="CPR expired · renewal sent" certsColor="#9A6B15" stage="On hold" stageBg="#FBF0D8" stageColor="#9A6B15" delay={1.09} />
        <PipeRow name="D. Brooks" certs="All current" certsColor="#5A6472" stage="References pending" stageBg="#EDF0F4" stageColor="#5A6472" delay={1.21} />
      </div>
    </div>
  );
}

const APP_MOCKS: Record<string, (live: string) => React.ReactNode> = {
  "closing-audit": (live) => <TabletMock live={live} />,
  "lesson-booker": (live) => <PhoneMock live={live} />,
  "hiring-pipeline": (live) => <BrowserMock live={live} />,
};

function SceneApps({ app }: { app: AppExample }) {
  return (
    <>
      {/* Centred, not stretched: the devices are different heights and
          the request card floats beside the middle of each. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div className="ed-sc-anim flex flex-col gap-3.5 p-5 lg:p-6" style={{ ...card, ...enter("ed-sc-rise", 0.08) }}>
          <div style={monoLabel}>{app.meta}</div>
          <div style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "var(--sc-text)" }}>
            {app.request}
          </div>
        </div>

        {/* The delay against the panel above is the twenty minutes. */}
        {APP_MOCKS[app.id](app.live)}
      </div>

      <div className="ed-sc-anim" style={{ ...caption, ...enter("ed-sc-scene-in", 1.35, 0.5) }}>
        {app.caption}
      </div>
    </>
  );
}

/* Content insets per scene, from the handoff. Scene 1 is a 600px column
   at the top left; scene 2 spans the stage. Scene 3's inset is per app
   (each device is a different height) and comes from APPS[n].box. Only
   applied from lg, where the stage is its full 580px tall. */
const SCENE_BOX = [
  "lg:left-12 lg:top-12 lg:w-[600px]",
  "lg:left-12 lg:right-12 lg:top-[88px]",
  "lg:left-12 lg:right-12",
];

/* ── Section ───────────────────────────────────────────── */

export default function Capabilities() {
  const [tab, setTab] = useState(0);
  const [app, setApp] = useState(0);
  const [paused, setPaused] = useState(false);
  /* The rotation never runs off-screen. It arms when the section is 30%
     visible and DISARMS when it fully leaves, resetting to the first
     tab, so every fresh entry starts on "Ask for anything" and replays.
     Running while off-screen was the old "it always starts on the
     second tab" bug: a hash deep link (or the arm-once behaviour plus a
     back navigation) started timers before the section was ever seen,
     so the user scrolled in mid-cycle. Nothing starts until visible. */
  const [armed, setArmed] = useState(false);
  /* Nonce bumped by every go(): keys the progress bar so it restarts in
     lockstep with the timers, including dot jumps within tab 3. */
  const [cycle, setCycle] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  /* Where the rotation is, readable without being a dependency: the
     resume effect continues from here rather than resetting to 0. */
  const tabRef = useRef(0);
  const appRef = useRef(0);
  /* A hash deep link applies once, on the FIRST entry only; later
     re-entries restart at tab 0 like everyone else's. */
  const deepLinkRef = useRef<number | null>(null);

  const stopTimers = useCallback(() => {
    if (tabTimer.current) clearTimeout(tabTimer.current);
    if (appTimer.current) clearInterval(appTimer.current);
    tabTimer.current = null;
    appTimer.current = null;
  }, []);

  /** Enter a tab (optionally at a given app example) and schedule on. */
  const go = useCallback((i: number, startApp = 0) => {
    stopTimers();
    tabRef.current = i;
    appRef.current = startApp;
    setTab(i);
    setApp(startApp);
    setCycle((c) => c + 1);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (i === 2) {
      appTimer.current = setInterval(() => {
        setApp((a) => {
          const n = (a + 1) % APPS_COUNT;
          appRef.current = n;
          return n;
        });
      }, APP_DWELL);
    }
    tabTimer.current = setTimeout(() => go((i + 1) % TABS.length), TAB_DWELL(i));
  }, [stopTimers]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setArmed(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio >= 0.3) {
          if (deepLinkRef.current !== null) {
            tabRef.current = deepLinkRef.current;
            appRef.current = 0;
            deepLinkRef.current = null;
          }
          setArmed(true);
        } else if (!e.isIntersecting) {
          /* Fully gone: stop and reset, so the next entry replays from
             the first tab. */
          tabRef.current = 0;
          appRef.current = 0;
          setArmed(false);
        }
      });
    }, { threshold: [0, 0.3] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!armed || paused) { stopTimers(); return; }
    /* Resume from wherever the rotation is, not from 0: resetting on
       every unpause was what made a click on a pill feel dead. Fresh
       entries still start at 0 because the observer resets the refs on
       a full exit. */
    go(tabRef.current, tabRef.current === 2 ? appRef.current : 0);
    return stopTimers;
    /* `go` is stable and re-running this on every tab change would restart
       the cycle forever, so the tab state is deliberately not a dep. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, paused]);

  /* Deep links land on their scene when the section is reached: the
     footer points at three of these. Recorded, not acted on, so timers
     never run before the section is visible. */
  useEffect(() => {
    const i = TABS.findIndex((t) => `#${t.id}` === window.location.hash);
    if (i >= 0) deepLinkRef.current = i;
  }, []);

  /* A click restarts the rotation at that tab, running. Clearing the
     pause matters: the pointer is necessarily over the section when it
     clicks, and a rotation that stays frozen until the mouse leaves
     reads as broken. */
  const select = (i: number) => { setPaused(false); go(i); };

  /* A dot click jumps to that app example and restarts the per-app
     timer from it; rotation keeps running, next advance a full
     interval later. */
  const selectApp = (i: number) => { setPaused(false); go(2, i); };

  const activeTab = TABS[tab];
  const activeApp = APPS[app];

  return (
    /* Container matches the hero and the problem section (SectionShell's
       values) rather than the handoff's 1480. Running wider made this
       section reach the page edge while its neighbours did not, which
       read as a break in the page rather than as a wider section. The
       stage gives up width for it; the rail is narrowed to compensate. */
    <section ref={sectionRef} id="capabilities" className="ed-showcase w-full scroll-mt-24" style={{ backgroundColor: "var(--sc-bg)" }}>
      <div className="ed-showcase mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20 flex flex-col gap-8 lg:gap-10">
        <div className="flex flex-col gap-3">
          <div
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--sc-muted)" }}
          >
            On demand
          </div>
          <h2
            className="whitespace-normal sm:whitespace-nowrap"
            style={{
              fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.1,
              color: "var(--sc-text)",
              /* One line from 640 up, which is what the handoff asks for,
                 topping out at its 42px. The string needs 27.97px of width
                 per 1px of font size, so the one-line ceilings are 21.2 /
                 24.6 / 33.7 / 40.2 / 42.9px at 640 / 768 / 1024 / 1205 /
                 1280. This sits 3 to 5 percent under each.
                 `.theme-editorial` sets `overflow-x: clip`, so an overrun
                 here is silently cut rather than scrolling: re-derive
                 these if the headline copy ever changes.
                 Below 640 it wraps; one line there would need 16px type. */
              fontSize: "clamp(1.25rem, 3.18vw, 2.625rem)",
            }}
          >
            Ask for anything. See it how you like. Build what&apos;s missing.
          </h2>
        </div>

        {/* The hover pause lives on the stage alone, not this wrapper:
            pausing from the rail too is what made pill clicks feel dead,
            since the pointer parked there kept the rotation frozen. */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-7 lg:items-stretch">
          {/* Rail */}
          <div className="lg:w-[268px] lg:flex-none flex flex-col lg:justify-center gap-3.5">
            <div className="flex flex-row lg:flex-col gap-3.5 overflow-x-auto lg:overflow-visible" role="tablist" aria-label="On demand">
              {TABS.map((t, i) => {
                const active = i === tab;
                return (
                  <button
                    key={t.id}
                    id={t.id}
                    role="tab"
                    aria-selected={active}
                    aria-controls="on-demand-stage"
                    onClick={() => select(i)}
                    className="relative overflow-hidden text-left flex-none lg:flex-auto scroll-mt-28 min-w-[240px] lg:min-w-0"
                    style={{
                      padding: "18px 20px", borderRadius: 16, boxSizing: "border-box",
                      background: active ? "var(--sc-panel)" : "var(--sc-chip)",
                      border: `1.5px solid ${active ? "var(--sc-accent-ink)" : "var(--sc-border)"}`,
                      boxShadow: active ? "var(--sc-shadow)" : "none",
                      transition: "background .3s, border-color .3s",
                    }}
                  >
                    <div style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--sc-text)" }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--sc-muted)", marginTop: 4 }}>
                      {t.sub}
                    </div>
                    {active && (
                      /* The fill is gated on `armed`, not just `active`:
                         before the section scrolls into view no timer is
                         running, and a bar filling against a stopped timer
                         would land part-way through the real first dwell.
                         `armed` is in the key so it restarts on entry. */
                      <span
                        key={`${tab}-${paused}-${armed}-${cycle}`}
                        className="ed-sc-bar"
                        style={{
                          position: "absolute", left: 0, bottom: 0, height: 3,
                          background: "var(--sc-accent-ink)",
                          animation: armed && !paused ? `ed-sc-tab-fill ${TAB_DWELL(i)}ms linear forwards` : undefined,
                          width: paused ? "100%" : 0,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            {/* The Apps brief asked for "the third tile's link" to be
                repointed at /platform/apps. The tiles are `role="tab"`
                buttons that swap the stage; none of them has ever had a
                link, so there was nothing to repoint and this was added
                instead. It shows only on that tab, so the other two scenes
                are unchanged, and the tile's own copy is untouched. The
                "+++" holds the slot the rest of the time. */}
            {tab === 2 ? (
              <Link
                href="/platform/apps"
                className="group hidden lg:inline-flex items-center justify-end gap-1.5 pr-2 text-right"
                style={{ fontFamily: JAKARTA, fontSize: 13.5, fontWeight: 600, color: "var(--sc-accent-ink)" }}
              >
                How apps get built
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
              </Link>
            ) : (
              /* Signals "and more" without listing more. */
              <div
                aria-hidden="true"
                className="hidden lg:block text-right pr-2"
                style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 600, letterSpacing: ".22em", color: "var(--sc-muted)", opacity: 0.75 }}
              >
                +++
              </div>
            )}
          </div>

          {/* Stage. Fixed 580 tall from lg so the handoff's vertical
              geometry (48 / 88 / 120 insets, 270px cards) is exact; the
              width is fluid rather than a scaled 1100, which keeps the
              type at its real size instead of shrinking it. */}
          <div
            id="on-demand-stage"
            role="tabpanel"
            aria-label={activeTab.label}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative flex-1 min-w-0 rounded-3xl overflow-hidden lg:h-[580px]"
            style={{ border: "1px solid var(--sc-border)", background: "var(--sc-stage)" }}
          >
            {/* Position dots for the app rotation, tab 3 only. Buttons,
                per the mocks handoff: a click jumps to that example and
                the timed rotation carries on from it. */}
            {tab === 2 && (
              <div className="absolute right-6 top-6 z-[3] flex gap-2">
                {APPS.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    aria-label={`Show example ${i + 1}`}
                    aria-pressed={i === app}
                    onClick={() => selectApp(i)}
                    style={{
                      width: 10, height: 10, borderRadius: "50%", padding: 0,
                      border: "none", cursor: "pointer",
                      background: i === app ? "#FFFFFF" : "rgba(255,255,255,.4)",
                      transition: "background .3s",
                    }}
                  />
                ))}
              </div>
            )}

            {/* The key remounts the scene, which is what replays the
                sequence. On tab 3 it keys on the app too, so every example
                re-runs the same choreography. */}
            <div
              key={tab === 2 ? `apps-${activeApp.id}` : activeTab.id}
              className="ed-sc-anim relative w-full h-full"
              style={enter("ed-sc-scene-in", 0, 0.5)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tab === 2 ? activeApp.photo : activeTab.photo}
                alt={tab === 2 ? activeApp.alt : activeTab.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: tab === 2 ? activeApp.scrim : activeTab.scrim }} />

              <div className={`relative lg:absolute p-5 sm:p-8 lg:p-0 flex flex-col gap-4 lg:gap-[18px] ${SCENE_BOX[tab]} ${tab === 2 ? activeApp.box : ""}`}>
                {tab === 0 && <SceneAnswers />}
                {tab === 1 && <SceneData />}
                {tab === 2 && <SceneApps app={activeApp} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * On demand, built from the showcase design handoff. A rail of three
 * capability pills beside a photo stage that auto-advances every 9.5s.
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

/* Tabs 1 and 2 hold 11s. Tab 3 holds 30s because it rotates three app
   examples at 10s each inside itself, and its progress bar fills over the
   whole 30 rather than per example. */
const DWELL = 11_000;
const APP_DWELL = 10_000;
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

type AppRow = { label: string; tone: "done" | "warn" | "open" };
type AppExample = {
  id: string;
  photo: string;
  alt: string;
  scrim: string;
  meta: string;
  request: string;
  toolName: string;
  live: string;
  rows: AppRow[];
  caption: string;
};

const APP_SCRIM = "linear-gradient(105deg, rgba(5,7,13,.64), rgba(5,7,13,.2))";

const APPS: AppExample[] = [
  {
    id: "closing-audit",
    photo: PHOTO("photo-1556742049-0cfed4f6a45d"),
    alt: "Tablet in use at the counter",
    scrim: APP_SCRIM,
    meta: "STORE #214 · OWNER · 3:45PM",
    request: "“Build a daily closing audit. Photo checklist per station, auto-score it, flag fails to my coach.”",
    toolName: "Daily closing audit",
    live: "live · 20 min later",
    rows: [
      { label: "Front desk", tone: "done" },
      { label: "Treatment rooms", tone: "done" },
      { label: "Retail floor", tone: "done" },
      { label: "Back of house", tone: "open" },
    ],
    caption: "Built by an owner, not a developer. HQ reviewed it and published it to all 214 locations the same evening.",
  },
  {
    id: "lesson-booker",
    photo: PHOTO("photo-1530549387789-4c1017266635"),
    alt: "Swim school pool lanes",
    scrim: APP_SCRIM,
    meta: "SCHOOL #036 · OWNER · 11:20AM",
    request: "“Build a make-up lesson booker. Parents pick an open slot, cap four per class, notify the instructor.”",
    toolName: "Make-up lesson booker",
    live: "live · 25 min later",
    rows: [
      { label: "Tue 4:00pm · Level 2 · full", tone: "done" },
      { label: "Thu 5:30pm · Level 2 · full", tone: "done" },
      { label: "Sat 9:00am · Level 3 · 3 spots", tone: "open" },
      { label: "Sat 10:30am · Level 1 · 2 spots", tone: "open" },
    ],
    caption: "Built between classes. Parents book themselves in, the instructor just sees the roster.",
  },
  {
    id: "hiring-pipeline",
    photo: PHOTO("photo-1576765608535-5f04d1e3f289"),
    alt: "Caregiver with a senior client",
    scrim: APP_SCRIM,
    meta: "BRANCH #052 · OWNER · 2:10PM",
    request: "“Build a caregiver application tracker. Flag missing certifications and chase references, so I only see interview-ready applicants.”",
    toolName: "Caregiver hiring pipeline",
    live: "live · 20 min later",
    rows: [
      { label: "M. Alvarez · interview-ready", tone: "done" },
      { label: "J. Chen · interview-ready", tone: "done" },
      { label: "R. Patel · CPR cert expired", tone: "warn" },
      { label: "D. Brooks · references pending", tone: "open" },
    ],
    caption: "The system chases the paperwork. The owner just interviews.",
  },
];

const ROW_DELAYS = [0.8, 0.92, 1.04, 1.16];

function SceneApps({ app }: { app: AppExample }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <div className="ed-sc-anim flex flex-col gap-3.5 p-5 lg:p-6" style={{ ...card, ...enter("ed-sc-rise", 0.08) }}>
          <div style={monoLabel}>{app.meta}</div>
          <div style={{ fontSize: 16.5, lineHeight: 1.5, fontWeight: 500, color: "var(--sc-text)" }}>
            {app.request}
          </div>
        </div>

        {/* The delay against the panel above is the twenty minutes. */}
        <div
          className="ed-sc-anim flex flex-col gap-3.5 p-5 lg:p-6"
          style={{ ...card, border: "1px solid var(--sc-accent-soft2)", ...enter("ed-sc-rise", 0.55) }}
        >
          <div className="flex items-center justify-between gap-3">
            <span style={{ fontFamily: JAKARTA, fontSize: 16, fontWeight: 700, color: "var(--sc-text)" }}>
              {app.toolName}
            </span>
            <span
              style={{
                fontSize: 11.5, fontWeight: 700, padding: "5px 10px", borderRadius: 999,
                background: "var(--sc-violet-soft)", color: "var(--sc-violet)", whiteSpace: "nowrap",
              }}
            >
              {app.live}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {app.rows.map((r, i) => (
              <div
                key={r.label}
                className="ed-sc-anim flex items-center gap-2.5"
                style={{
                  fontSize: 14,
                  color: r.tone === "warn" ? "var(--sc-warn)"
                    : r.tone === "done" ? "var(--sc-text)" : "var(--sc-muted)",
                  fontWeight: r.tone === "warn" ? 600 : 400,
                  ...enter("ed-sc-slide", ROW_DELAYS[i] ?? 1.16, 0.45),
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontWeight: 700,
                    color: r.tone === "done" ? "var(--sc-ok)"
                      : r.tone === "warn" ? "var(--sc-warn)" : "inherit",
                  }}
                >
                  {r.tone === "done" ? "✓" : r.tone === "warn" ? "!" : "◻"}
                </span>
                {r.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ed-sc-anim" style={{ ...caption, ...enter("ed-sc-scene-in", 1.35, 0.5) }}>
        {app.caption}
      </div>
    </>
  );
}

/* Content insets per scene, from the handoff. Scene 1 is a 600px column
   at the top left; the other two span the stage. Only applied from lg,
   where the stage is its full 580px tall. */
const SCENE_BOX = [
  "lg:left-12 lg:top-12 lg:w-[600px]",
  "lg:left-12 lg:right-12 lg:top-[88px]",
  "lg:left-12 lg:right-12 lg:top-[120px]",
];

/* ── Section ───────────────────────────────────────────── */

export default function Capabilities() {
  const [tab, setTab] = useState(0);
  const [app, setApp] = useState(0);
  const [paused, setPaused] = useState(false);
  /* The rotation does not start on mount. It arms the first time the
     section scrolls into view, so nobody arrives mid-cycle on tab 3;
     everyone starts on "Ask for anything". One arm is enough, scrolling
     away and back does not reset it. */
  const [armed, setArmed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimers = useCallback(() => {
    if (tabTimer.current) clearTimeout(tabTimer.current);
    if (appTimer.current) clearInterval(appTimer.current);
    tabTimer.current = null;
    appTimer.current = null;
  }, []);

  /** Enter a tab: reset its app rotation and schedule the next tab. */
  const go = useCallback((i: number) => {
    stopTimers();
    setTab(i);
    setApp(0);
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (i === 2) {
      appTimer.current = setInterval(() => setApp((a) => (a + 1) % APPS_COUNT), APP_DWELL);
    }
    tabTimer.current = setTimeout(() => go((i + 1) % TABS.length), TAB_DWELL(i));
  }, [stopTimers]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) { setArmed(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { io.disconnect(); setArmed(true); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!armed || paused) { stopTimers(); return; }
    go(0);
    return stopTimers;
    /* `go` is stable and re-running this on every tab change would restart
       the cycle from 0 forever, so the tab is deliberately not a dep. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, paused]);

  /* Deep links land on their scene: the footer points at three of these. */
  useEffect(() => {
    const i = TABS.findIndex((t) => `#${t.id}` === window.location.hash);
    if (i >= 0) { setArmed(true); go(i); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (i: number) => go(i);

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

        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-7 lg:items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
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
                        key={`${tab}-${paused}-${armed}`}
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
            {/* Signals "and more" without listing more. */}
            <div
              aria-hidden="true"
              className="hidden lg:block text-right pr-2"
              style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 600, letterSpacing: ".22em", color: "var(--sc-muted)", opacity: 0.75 }}
            >
              +++
            </div>
          </div>

          {/* Stage. Fixed 580 tall from lg so the handoff's vertical
              geometry (48 / 88 / 120 insets, 270px cards) is exact; the
              width is fluid rather than a scaled 1100, which keeps the
              type at its real size instead of shrinking it. */}
          <div
            id="on-demand-stage"
            role="tabpanel"
            aria-label={activeTab.label}
            className="relative flex-1 min-w-0 rounded-3xl overflow-hidden lg:h-[580px]"
            style={{ border: "1px solid var(--sc-border)", background: "var(--sc-stage)" }}
          >
            {/* Position dots for the app rotation, tab 3 only. */}
            {tab === 2 && (
              <div className="absolute right-6 top-6 z-[3] flex gap-2" aria-hidden="true">
                {APPS.map((a, i) => (
                  <span
                    key={a.id}
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
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

              <div className={`relative lg:absolute p-5 sm:p-8 lg:p-0 flex flex-col gap-4 lg:gap-[18px] ${SCENE_BOX[tab]}`}>
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

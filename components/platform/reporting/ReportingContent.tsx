"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "./Glyph";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import IntegrationMarquee from "@/components/sections/IntegrationMarquee";
import FlowerMark from "@/components/sections/FlowerMark";
import StackHub from "./StackHub";
import { INK, INPUTS, RELATED, SCOPES, TILE, type Tone } from "./data";

/**
 * /platform/reporting
 *
 * Rebuilt from the supplied design handoff, then trimmed: hero, the
 * customer strip, what it costs now, inputs, ask anything, across the
 * stack, always on, scoping, related, closing.
 *
 * The "Alongside your BI" split and the scoping section's closing
 * "How scoping is set in the Control Center." line were both removed on
 * request. The Control Center is still reached from Related.
 *
 * **This page moved off the photographic hero set onto a gradient.** The
 * handoff specifies indigo `#242A5E`, registered as `HERO_GRADIENT.indigo`
 * with its own base, gradients, accent and bottom resolve. Reporting was
 * carrying the photographic `hero-bg-indigo.jpg` from the platform
 * variant map and was removed from it; `lib/data/platform-heroes.ts`
 * records how to put it back.
 *
 * Deleted deliberately, do not reintroduce: every mono eyebrow above a
 * section heading (only the hero keeps one), the
 * `SOURCED / LIVE / LOGGED / EXPORTABLE` governance strip, and the
 * `{{TBD:reporting-proof-*}}` placeholder quote block. Several copy lines
 * were rewritten away from the old page because they broke the house
 * rules; the antithesis pair "The report isn't faster. It doesn't get
 * built." and its three siblings are gone for good.
 *
 * **The zigzag haze format appears once, in Always on.** Its whole value
 * is that it is not the page's default layout. Do not extend it to
 * another section here or copy it onto a sibling page without a reason.
 *
 * The page runs a larger type scale than the old one: section subs are
 * 18px (were 15.5), alternating-row bodies 16.5px, and nothing in body
 * copy sits below 13.5px.
 */

const IN = HERO_GRADIENT.indigo;

const H2 = {
  fontFamily: JAKARTA,
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.6rem + 2vw, 2.375rem)",
  textWrap: "pretty" as const,
};

const H3 = {
  fontFamily: JAKARTA,
  fontWeight: 700,
  fontSize: "clamp(1.25rem, 0.8rem + 1.1vw, 1.75rem)",
  textWrap: "pretty" as const,
};

const MONO_META = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", color: "var(--ed-fg-muted)",
};

/* Ink on the product cards inside the haze panels, and on the hero
   console. Both are screenshots of a light-themed product sitting on a
   coloured band, so they stay white with dark ink in both themes. */
const CARD_INK = "#0A0A0A";
const CARD_INK_MUTED = "#52525B";
const CARD_RULE = "#E5E7EB";

/* ── §2 ── */
const FILES: { name: string; tone?: Tone }[] = [
  { name: "week-42-v7.xlsx" },
  { name: "rollup-FINAL.xlsx" },
  { name: "FW: which version?", tone: "warn" },
  { name: "regional-rollup.xlsx" },
  { name: "labour-hours-v4.xlsx" },
  { name: "RE: RE: numbers", tone: "bad" },
  { name: "P&L-chart.png" },
  { name: "q3-numbers-v3.xlsx" },
  { name: "attach-by-store.csv", tone: "purple" },
  { name: "deck-v2-final.pptx" },
  { name: "rollup-v11.xlsx" },
  { name: "sending mine over", tone: "purple" },
];

const MORNING: { at: string; what: string; last?: boolean }[] = [
  { at: "7:40am", what: "Pull six weeks of bookings" },
  { at: "7:55am", what: "Pull labour against target" },
  { at: "8:10am", what: "Attach rate versus territory" },
  { at: "8:25am", what: "Check open compliance items" },
  { at: "8:40am", what: "Build the deck" },
  { at: "9:00am", what: "Call starts", last: true },
];

/* ── §4 ── */
const RANKED: { id: string; pct: number; tone: Tone }[] = [
  { id: "#118", pct: 34, tone: "accent" },
  { id: "#052", pct: 31, tone: "accent" },
  { id: "#204", pct: 28, tone: "accent" },
  { id: "#331", pct: 19, tone: "warn" },
  { id: "#087", pct: 14, tone: "bad" },
];

const EXCEPTIONS = [
  { store: "Store #331", measure: "bookings",    delta: "−18%" },
  { store: "Store #087", measure: "rebook rate", delta: "−12%" },
  { store: "Store #219", measure: "attach rate", delta: "−8%" },
];

/* ── §6 ── */
const BRIEF_ROWS = [
  { id: "#331", what: "62% booked",  delta: "−18%" },
  { id: "#087", what: "rebook drift", delta: "−12%" },
  { id: "#219", what: "attach rate", delta: "−8%" },
];

function Bar({ pct, colour, track = true }: { pct: number; colour: string; track?: boolean }) {
  return (
    <span
      className="relative block h-1.5 flex-1 overflow-hidden rounded-full"
      style={{ background: track ? "var(--track)" : "transparent" }}
      aria-hidden="true"
    >
      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: colour }} />
    </span>
  );
}

/** A tinted square holding one glyph. */
function Tile({ tone, d, size = 34, icon = 17 }: { tone: Tone; d: string; size?: number; icon?: number }) {
  const [bg, fg] = TILE[tone];
  return (
    <span
      className="flex flex-none items-center justify-center rounded-[10px]"
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      <Glyph d={d} size={icon} />
    </span>
  );
}

/** The white product card that sits inside a haze panel. */
function HazePanel({ haze, children, tight = false }: { haze: string; children: React.ReactNode; tight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-md px-6 py-8 sm:px-11 sm:py-12 ${tight ? "sm:px-[68px]" : ""}`}
      style={{ background: `var(${haze})` }}
    >
      <div
        className="w-full rounded-[10px]"
        style={{ background: "#FFFFFF", boxShadow: "0 22px 54px -24px rgba(20,16,48,.5)", maxWidth: tight ? 300 : undefined }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ReportingContent() {
  return (
    <div className="ed-reporting">
      {/* ── 1. Hero ─────────────────────────────────────────
          Indigo, its own blue. See HERO_GRADIENT.indigo. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: IN.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: IN.hero }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="ed-hero-pad relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.05fr_.95fr] lg:gap-15"
        >
          <div className="flex flex-col items-start gap-5">
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", fontWeight: 600, color: IN.accent }}>
              Reporting
            </p>
            <h1
              className="leading-[1.1] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                fontSize: "clamp(1.75rem, 0.6rem + 2.65vw, 2.9375rem)",
              }}
            >
              Ask for any number your network has,{" "}
              <span style={{ color: IN.accent }}>and get it back the way the question needs it.</span>
            </h1>
            <p className="max-w-[500px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: IN.body }}>
              Plain language in, a ranked list or a trend or a filtered exception out. Read live from
              the systems your locations already run on, not from a dashboard someone built three
              years ago.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="/speak-to-an-expert"
                className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap"
                style={{ backgroundColor: "#FFFFFF", color: CARD_INK }}
              >
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#ask" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">
                See what it can answer
              </a>
            </div>
          </div>

          {/* Reporting console. Sits straight, and its ink is fixed dark:
              a white card on a dark band in both themes. */}
          <div
            className="overflow-hidden rounded-[18px]"
            style={{ background: "#FFFFFF", boxShadow: "0 30px 70px -30px rgba(8,10,32,.75)" }}
          >
            <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${CARD_RULE}` }}>
              <span className="flex gap-1.5" aria-hidden="true">
                {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full" style={{ background: "#D4D4D8" }} />)}
              </span>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: CARD_INK_MUTED }}>
                EZEE ASSIST · REPORTING
              </span>
              <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "#0D7C58" }}>
                <span aria-hidden="true">●</span> LIVE FROM MINDBODY
              </span>
            </div>

            <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ background: "#F8FAFC" }}>
              <span aria-hidden="true" style={{ fontFamily: MONO, fontSize: 13, color: CARD_INK_MUTED }}>&gt;</span>
              <span className="text-[14px] font-medium" style={{ color: CARD_INK }}>
                Which locations are behind plan this week?
              </span>
              <span className="ed-caret inline-block h-4 w-[2px] flex-none" style={{ background: CARD_INK }} aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-2.5 px-5 py-4">
              {[
                { id: "Store #331", pct: 82, delta: "−18%", ink: "#B42318" },
                { id: "Store #087", pct: 64, delta: "−12%", ink: "#B45309" },
                { id: "Store #219", pct: 46, delta: "−8%",  ink: "#B45309" },
              ].map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="w-[74px] flex-none text-[12.5px]" style={{ color: CARD_INK_MUTED }}>{r.id}</span>
                  <span className="relative block h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "#E7E9EF" }} aria-hidden="true">
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${r.pct}%`, background: r.ink }} />
                  </span>
                  <span className="w-11 flex-none text-right" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: r.ink }}>{r.delta}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 px-5 py-3" style={{ borderTop: `1px solid ${CARD_RULE}` }}>
              <span className="text-[13px]" style={{ color: CARD_INK_MUTED }}>
                <b style={{ color: CARD_INK }}>3 of 12 locations</b> behind plan. Bookings drive all three.
              </span>
              <span className="flex-none" style={{ fontFamily: MONO, fontSize: 12, color: "#A1A1AA" }}>1.4s</span>
            </div>
          </div>
        </motion.div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. What it costs now ────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Reporting is somebody&rsquo;s Monday morning.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              At HQ, twelve versions of the same spreadsheet are circulating and nobody is certain
              which one is current. In the field, a coach spends the two hours before a call
              assembling numbers by hand, so the call opens as a recap of a week that already
              happened.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-7" style={{ background: "var(--wash)" }}>
                <span className="ed-fg text-[15px] font-semibold">At HQ, this week&rsquo;s numbers</span>
                <div className="flex flex-wrap gap-2">
                  {FILES.map((f) => (
                    <span
                      key={f.name}
                      className="rounded-md"
                      style={{
                        fontFamily: MONO, fontSize: 12, padding: "6px 10px",
                        background: f.tone ? TILE[f.tone][0] : "var(--ed-card)",
                        border: `1px solid ${f.tone ? TILE[f.tone][0] : "var(--ed-border)"}`,
                        color: f.tone ? INK[f.tone] : "var(--ed-fg-muted)",
                      }}
                    >
                      {f.name}
                    </span>
                  ))}
                </div>
                <p className="ed-rule ed-fg-muted mt-auto border-t pt-3.5 text-[13.5px] leading-[1.55]">
                  Twelve files, four people, one number that should have one answer.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="ed-card ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-7">
                <span className="ed-fg text-[15px] font-semibold">One coach, the morning of one call</span>
                <div className="flex flex-col">
                  {MORNING.map((m, i) => (
                    <div key={m.at} className={`flex items-baseline gap-4 py-2.5 ${i === 0 ? "" : "ed-rule border-t"}`}>
                      <span
                        className="w-[62px] flex-none"
                        style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: m.last ? 700 : 400, color: m.last ? "var(--bad)" : "var(--ed-fg-muted)" }}
                      >
                        {m.at}
                      </span>
                      <span className={`text-[14px] ${m.last ? "font-semibold" : ""}`} style={{ color: m.last ? "var(--bad)" : "var(--ed-fg)" }}>
                        {m.what}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="ed-rule ed-fg-muted mt-auto border-t pt-3.5 text-[13.5px] leading-[1.55]">
                  Eighty minutes of preparation, thirty locations, every month. None of it was coaching.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. Inputs ───────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              It reads what your systems already hold, at the source.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              There is no warehouse to load and no model to build first. When a question needs a
              number, it goes and gets the current one from the system of record.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {INPUTS.map((t, i) => (
              <Reveal key={t.title} delay={(i % 4) * 0.05}>
                <div className="ed-card ed-border flex h-full flex-col gap-3 rounded-[14px] border p-5">
                  <Tile tone={t.tone} d={t.d} />
                  <span className="ed-fg tracking-[-0.015em]" style={{ fontFamily: JAKARTA, fontSize: 16.5, fontWeight: 700 }}>
                    {t.title}
                  </span>
                  <span className="ed-fg-muted text-[14px] leading-[1.5]">{t.body}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* A scroller rather than six chips: the claim is breadth, and
              six names read as a shortlist. Real vendor marks beside the
              names, from the shared IntegrationMarquee, so this and the
              Answers strip stay one object. */}
          <Reveal delay={0.1}>
            <div className="ed-card ed-border flex flex-col gap-3 overflow-hidden rounded-[14px] border py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5">
                <span className="ed-fg-muted flex-none text-[13.5px] font-semibold">Reads live from</span>
                <span className="ed-fg-muted text-[13.5px]">
                  250+ integrations.{" "}
                  <Link href="/platform/integrations" className="ed-accent-text underline-offset-2 hover:underline">
                    See what connects
                  </Link>
                </span>
              </div>
              <IntegrationMarquee />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Ask anything ─────────────────────────────────
          The page's strongest claim. All four renderings must stay
          visually distinct; do not normalise them into four bar charts. */}
      <section id="ask" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              One dataset, rendered however the question needs it.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Four questions about the same twelve locations and the same six weeks. Nobody specified
              a chart type, and nobody built a dashboard first.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* 1. Ranked bars */}
            <Reveal>
              <div className="ed-card ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Tile tone="accent" d="M4 6h13 M4 12h9 M4 18h5" size={28} icon={15} />
                  <span className="ed-fg text-[15px] font-medium">&ldquo;Rank my territory by attach rate&rdquo;</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {RANKED.map((r) => (
                    <div key={r.id} className="flex items-center gap-3">
                      <span className="ed-fg-muted w-10 flex-none text-[12.5px]">{r.id}</span>
                      <Bar pct={r.pct * 2.6} colour={INK[r.tone]} />
                      <span className="ed-fg w-10 flex-none text-right" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700 }}>{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* 2. Trend line */}
            <Reveal delay={0.06}>
              <div className="ed-card ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Tile tone="purple" d="M4 17l5-6 4 3 6-8" size={28} icon={15} />
                  <span className="ed-fg text-[15px] font-medium">&ldquo;Show me that as a trend instead&rdquo;</span>
                </div>
                <svg viewBox="0 0 320 96" className="h-24 w-full" aria-hidden="true">
                  {[24, 52, 80].map((y) => (
                    <path key={y} d={`M4 ${y} H316`} stroke="var(--ed-rule)" strokeWidth="1" fill="none" />
                  ))}
                  <path
                    d="M4 74 L 68 66 L 132 70 L 196 48 L 260 34 L 316 18"
                    fill="none" stroke="var(--purple)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <circle cx="316" cy="18" r="3.5" fill="var(--purple)" />
                </svg>
                <div className="ed-rule flex items-center justify-between gap-3 border-t pt-3">
                  <span className="ed-fg-muted text-[13.5px]">Six weeks, territory average</span>
                  <span className="flex-none" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--purple)" }}>median 23%</span>
                </div>
              </div>
            </Reveal>

            {/* 3. Filtered exceptions */}
            <Reveal delay={0.12}>
              <div className="ed-card ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Tile tone="bad" d="M4 5h16l-6 7v7l-4-2v-5z" size={28} icon={15} />
                  <span className="ed-fg text-[15px] font-medium">&ldquo;Just the ones behind plan&rdquo;</span>
                </div>
                <div className="flex flex-col gap-2">
                  {EXCEPTIONS.map((e) => (
                    <div
                      key={e.store}
                      className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5"
                      style={{ background: TILE.bad[0] }}
                    >
                      <span className="ed-fg flex-none text-[13.5px] font-semibold">{e.store}</span>
                      <span className="ed-fg-muted text-[13px]">{e.measure}</span>
                      <span className="ml-auto flex-none" style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: "var(--bad)" }}>{e.delta}</span>
                    </div>
                  ))}
                </div>
                <p className="ed-fg-muted mt-auto text-[13.5px]">Nine locations at or above plan are left out.</p>
              </div>
            </Reveal>

            {/* 4. Scheduled digest */}
            <Reveal delay={0.18}>
              <div className="ed-card ed-border flex h-full flex-col gap-4 rounded-2xl border p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Tile tone="ok" d="M8 3v4 M16 3v4 M4 6h16v14H4z M9 13l2.5 2.5L16 11" size={28} icon={15} />
                  <span className="ed-fg text-[15px] font-medium">&ldquo;Send me this every Monday at 7&rdquo;</span>
                </div>
                <div className="ed-card-alt ed-border flex flex-col gap-2 rounded-xl border p-4">
                  <span style={MONO_META}>TEAMS · MON 7:00AM</span>
                  <span className="ed-fg text-[14px] font-semibold">West territory, week 43</span>
                  <span className="ed-fg-muted text-[13.5px] leading-[1.55]">
                    3 of 12 behind plan. #331 needs the reactivation play. Full cut attached.
                  </span>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full"
                    style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", padding: "5px 12px", background: TILE.ok[0], color: "var(--ok)" }}
                  >
                    SCHEDULED
                  </span>
                  <span className="ed-fg-muted text-[13.5px]">Any cadence, any channel, no report to maintain.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Across the stack ─────────────────────────────
          A hub diagram: eight source systems flow in, three products flow
          out. It replaced four coloured progress bars plus a full-width
          multi-colour "ALL FOUR" bar and a 23-of-300 count. That version
          needed a caption to stop the wide bar and the small count reading
          as a contradiction, which is the tell that the visual was
          arguing against itself. A diagram of the join does not need one,
          so the illustrative disclaimer is gone with it. */}
      <section className="w-full" style={{ background: "#0B1220" }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-9 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[840px] flex-col gap-3.5">
            <h2 className="leading-[1.12] tracking-[-0.03em]" style={{ ...H2, color: "#EEF2F8" }}>
              The opportunity sits across your whole stack.{" "}
              {/* EZee blue, not the band's periwinkle `IN.accent`, by
                  request. #00AEEF clears AA on this #0B1220 band, which is
                  why the brand hue can be used directly here rather than
                  the darker #0077A8 the light bands need. */}
              <span style={{ color: "#00AEEF" }}>EZee Assist pulls it together.</span>
            </h2>
            <p className="text-[18px] leading-[1.7]" style={{ color: "rgba(238,242,248,.72)" }}>
              Your POS knows what sold. Your scheduler knows what is empty. The CRM holds who has
              not been back. EZee Assist reads all of it together and returns the insight, the
              report, and the dashboard, with nobody assembling anything.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <StackHub />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex max-w-[840px] flex-col gap-3 pt-6" style={{ borderTop: "1px solid rgba(238,242,248,.14)" }}>
              <p className="text-[17px] leading-[1.65]" style={{ color: "rgba(238,242,248,.9)" }}>
                Each system answers its own slice. The insight lives in the join, and in a BI tool
                that join is a modeling request that takes a quarter. Here it is a sentence.
              </p>
              <Link
                href="/platform/integrations"
                className="inline-flex w-fit items-center gap-2 text-[14px] font-semibold"
                style={{ color: IN.accent }}
              >
                The connections this rests on
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Always on ────────────────────────────────────
          The zigzag haze format, used once on this page. Rows alternate
          at lg; below that every row stacks copy above panel, including
          the two whose panel sits left at desktop. */}
      <section className="ed-bg w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex flex-col gap-3.5">
            {/* nowrap only where it fits; it wraps below lg by design. */}
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em] lg:whitespace-nowrap" style={H2}>
              The numbers come to you before you think to ask.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              A dashboard waits to be opened, and most weeks nobody opens it. Set the thresholds that
              matter and the report arrives on your clock, in the channel you already have open.
            </p>
          </Reveal>

          {/* Row 1 — copy left, panel right */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-3">
                <h3 className="ed-fg leading-[1.15] tracking-[-0.025em]" style={H3}>
                  Monday&rsquo;s brief is written before you start
                </h3>
                <p className="ed-fg-muted text-[16.5px] leading-[1.65]">
                  Twelve locations ranked by need, at four in the morning. Nobody requested it and
                  nobody assembled it.
                </p>
              </div>
              <HazePanel haze="--haze-b">
                <div className="flex flex-col gap-2.5 p-5">
                  <div className="flex items-center gap-2.5">
                    <FlowerMark size={20} />
                    <span className="text-[13px] font-semibold" style={{ color: CARD_INK }}>EZee Assist</span>
                    <span className="ml-auto flex-none" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: CARD_INK_MUTED }}>
                      TEAMS · 4:00AM
                    </span>
                  </div>
                  <span className="text-[13.5px] font-semibold" style={{ color: CARD_INK }}>
                    West territory, week 43. Ranked by need.
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {BRIEF_ROWS.map((r) => (
                      <div key={r.id} className="flex items-center gap-3 rounded-md px-2.5 py-1.5" style={{ background: "rgba(180,35,24,.06)" }}>
                        <span className="w-10 flex-none" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: CARD_INK }}>{r.id}</span>
                        <span className="text-[12.5px]" style={{ color: CARD_INK_MUTED }}>{r.what}</span>
                        <span className="ml-auto flex-none" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#B42318" }}>{r.delta}</span>
                      </div>
                    ))}
                  </div>
                  <span className="pt-1 text-[12px]" style={{ color: CARD_INK_MUTED }}>
                    Nine locations at or above plan. Full cut attached.
                  </span>
                </div>
              </HazePanel>
            </div>
          </Reveal>

          {/* Row 2 — panel left at lg, copy first when stacked */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-3 lg:order-2">
                <h3 className="ed-fg leading-[1.15] tracking-[-0.025em]" style={H3}>
                  A threshold breaks and you hear about it that morning
                </h3>
                <p className="ed-fg-muted text-[16.5px] leading-[1.65]">
                  Set the line that matters and the message finds you the morning something crosses
                  it, rather than at month end in a dashboard nobody opened.
                </p>
              </div>
              <div className="lg:order-1">
                <HazePanel haze="--haze-a" tight>
                  <div className="flex flex-col gap-3 p-4" style={{ borderRadius: 24 }}>
                    <div className="flex items-center justify-between" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: CARD_INK_MUTED }}>
                      <span>6:12</span>
                      <span>TUE</span>
                    </div>
                    <div className="flex flex-col gap-2 rounded-2xl px-3.5 py-3" style={{ background: "#F1F1F3" }}>
                      <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: CARD_INK_MUTED }}>EZEE ASSIST · SMS</span>
                      <span className="text-[13px] leading-[1.55]" style={{ color: CARD_INK }}>
                        Store #331 dropped below 70% booked overnight. 340 lapsed clients match the
                        reactivation profile.
                      </span>
                      <span className="text-[12.5px] font-semibold" style={{ color: "#0077A8" }}>Show me the list</span>
                    </div>
                  </div>
                </HazePanel>
              </div>
            </div>
          </Reveal>

          {/* Row 3 — copy left, panel right */}
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-3">
                <h3 className="ed-fg leading-[1.15] tracking-[-0.025em]" style={H3}>
                  It flags the drift nobody set an alert for
                </h3>
                <p className="ed-fg-muted text-[16.5px] leading-[1.65]">
                  Store #087&rsquo;s rebook rate has slid three weeks running. No threshold existed
                  for it, which is exactly why it went unnoticed.
                </p>
                <Link href="/platform/workflows" className="ed-accent-text inline-flex w-fit items-center gap-2 text-[14px] font-semibold">
                  How a workflow turns that into an action
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                </Link>
              </div>
              <HazePanel haze="--haze-c">
                <div className="flex flex-col gap-2.5 p-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex flex-none" style={{ color: "#7C3AED" }}>
                      <Glyph d="M9 4L7.5 20 M16.5 4L15 20 M4 9h17 M3 15h17" size={13} />
                    </span>
                    <span className="text-[13px] font-semibold" style={{ color: CARD_INK }}>#west-territory</span>
                    <span className="ml-auto flex-none" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.1em", color: CARD_INK_MUTED }}>
                      THU 9:04AM
                    </span>
                  </div>
                  <span className="text-[13px] leading-[1.55]" style={{ color: CARD_INK }}>
                    Store #087&rsquo;s rebook rate has drifted down for three consecutive weeks.
                  </span>
                  <svg viewBox="0 0 300 76" className="h-[76px] w-full" aria-hidden="true">
                    <path
                      d="M4 22 L 78 26 L 152 41 L 226 52 L 296 64"
                      fill="none" stroke="#B42318" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    />
                    <circle cx="296" cy="64" r="3.5" fill="#B42318" />
                  </svg>
                  <span className="text-[12px]" style={{ color: CARD_INK_MUTED }}>Nobody set an alert for this one.</span>
                </div>
              </HazePanel>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Scoping ────────────────────────────────────
          The stepped indent carries the nesting at md and up. Below that
          it is a left accent rule instead, so the hierarchy never rests
          on indent alone. */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[820px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Now, franchisees can generate reports too, and see only what&rsquo;s relevant to
              their locations.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Every level gets the same capability, bounded by what they are entitled to see. Nobody
              sees another owner&rsquo;s numbers, enforced by the permissions your systems already
              hold.
            </p>
          </Reveal>

          <div className="flex flex-col gap-3">
            {SCOPES.map((s, i) => (
              <Reveal key={s.role} delay={i * 0.06}>
                <div
                  className="ed-scope-row ed-card ed-border flex flex-col gap-2.5 rounded-[14px] border p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
                  style={{
                    "--indent": `${s.indent}px`,
                    /* The accent rule is the indent's stand-in below md,
                       not a desktop feature; .ed-scope-row drops it once
                       the stepping is doing the work. */
                    "--rule": INK[s.tone],
                    background: i === 0 ? "var(--wash)" : undefined,
                  } as React.CSSProperties}
                >
                  <span className="flex flex-none items-center gap-3.5 sm:w-[190px]">
                    <Tile tone={s.tone} d={s.d} size={40} icon={19} />
                    <span className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 18, fontWeight: 700 }}>
                      {s.role}
                    </span>
                  </span>
                  <span className="ed-fg-muted text-[15px] leading-[1.55]">{s.body}</span>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. Related ────────────────────────────────────
          Titles are nowrap by design; three up only where the longest
          fits on one line. */}
      <section className="ed-bg w-full">
        {/* Needs its own top padding. It used to inherit a gap from the
            BI section above it, and when that section was deleted the
            cards butted straight against the alt band's edge. */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 pb-14 pt-14 md:pb-16 md:pt-16 min-[1200px]:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              <Link href={r.href} className="ed-border ed-story-card flex h-full flex-col gap-2 rounded-2xl border px-4 py-5 sm:px-6">
                <span className="ed-accent-text uppercase" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>
                  {r.kicker}
                </span>
                <span className="ed-fg whitespace-nowrap text-[14.5px] font-semibold leading-[1.45]">{r.title}</span>
                <ArrowRight className="ed-accent-text h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 9. Closing ────────────────────────────────────
          Same indigo family, mirrored, resolving to the variant's own
          bottom colour rather than the teal-navy CLOSING_BASE. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: IN.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: IN.closing }} />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: `linear-gradient(to bottom, rgba(10,16,48,0) 45%, ${IN.resolve} 100%)` }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              className="leading-[1.12] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)",
              }}
            >
              Send us the report your team{" "}
              <span style={{ color: IN.accent }}>rebuilds every week.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: IN.body }}>
              We&rsquo;ll show you the same numbers with nobody assembling them, and three questions
              you were never able to ask.
            </p>
          </div>
          <div className="flex items-start justify-start self-stretch lg:items-end lg:justify-end">
            <Link
              href="/speak-to-an-expert"
              className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap"
              style={{ backgroundColor: "#FFFFFF", color: CARD_INK }}
            >
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

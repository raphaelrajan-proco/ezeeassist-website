"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import FlowerMark from "@/components/sections/FlowerMark";
import { CHANNELS, CONTEXT, QUEUE, QUEUES, TONES, type Tone } from "./data";

/**
 * The ticketing console, and the page's centrepiece.
 *
 * A 22-second loop follows #4471 from arrival to closed: it lands, gets
 * classified, gets an owner, the drawer slides in with context that was
 * already gathered, the SLA fills, and it closes as a published rule.
 * Base styles are the closed end-state, so reduced motion shows the
 * whole finished ticket.
 *
 * **The four status badges are stacked in one slot and crossfade.** Do
 * not animate a single element's text: the badges differ in colour and
 * width, and swapping text in place makes the row jump.
 *
 * ── Column widths are load-bearing ──────────────────────────
 * The table row is `92px minmax(240px,1fr) 92px 122px 84px`. An earlier
 * build used `118px minmax(0,1fr) 116px 150px 96px` inside a
 * 186/1fr/344 outer grid at 1240px: the REQUEST column collapsed to
 * 38px, titles wrapped one word per line, and the category pills
 * overflowed into LOCATION. The `minmax(240px,…)` floor plus the
 * trimmed fixed columns are the fix. If you change any of them,
 * re-measure: request cells should stay at or above 240px.
 *
 * Below 1440 the drawer moves under the table so the table keeps the
 * full middle span, and below md the rail goes and each ticket becomes a
 * stacked card. Everything is fixed hex: a product screenshot on a dark
 * band, light in both themes.
 */

const INK = "#0A0A0A";
const MUTED = "#52525B";
const RULE = "#EEF0F4";
const PLUM = "#8E3F7C";

const BADGES: { label: string; cls: string; tone: Tone }[] = [
  { label: "NEW",     cls: "tk-b-new",     tone: "warn" },
  { label: "ROUTED",  cls: "tk-b-routed",  tone: "accent" },
  { label: "ONGOING", cls: "tk-b-ongoing", tone: "ok" },
  { label: "CLOSED",  cls: "tk-b-closed",  tone: "muted" },
];

function Pill({ label, tone }: { label: string; tone: Tone }) {
  const [bg, fg] = TONES[tone];
  return (
    <span
      className="whitespace-nowrap rounded"
      style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 7px", background: bg, color: fg }}
    >
      {label}
    </span>
  );
}

function Avatar({ initials, tone = "muted" }: { initials: string; tone?: Tone }) {
  const [bg, fg] = TONES[tone];
  return (
    <span
      className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full"
      style={{ background: bg, color: fg, fontFamily: MONO, fontSize: 12, fontWeight: 700 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

/* Written out literally, twice, on purpose. Tailwind only generates
   classes it can see in the source, so a computed
   `ROW.replace("grid-cols-","md:grid-cols-")` produces a class that
   never exists: the table silently fell back to one column and rows
   went from ~65px to ~265px tall. Never build these from a string. */
const HEAD_ROW = "grid-cols-[92px_minmax(240px,1fr)_92px_122px_84px]";
const BODY_ROW = "lg:grid-cols-[92px_minmax(240px,1fr)_92px_122px_84px]";

function Sla({ pct, label, tone, animate = false }: { pct: number; label: string; tone: Tone; animate?: boolean }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="block h-1 w-full overflow-hidden rounded-full" style={{ background: "#E7E9EF" }} aria-hidden="true">
        <span
          className={`block h-full rounded-full ${animate ? "tk-c tk-sla" : ""}`}
          style={{ width: `${pct}%`, background: TONES[tone][1] }}
        />
      </span>
      <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>{label}</span>
    </span>
  );
}

export default function Console() {
  return (
    <div
      data-anim
      className="overflow-hidden rounded-2xl"
      style={{ background: "#FFFFFF", boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)" }}
      aria-hidden="true"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 sm:px-5" style={{ background: "#F8FAFC", borderBottom: `1px solid ${RULE}` }}>
        <FlowerMark size={20} />
        <span className="text-[13px] font-semibold" style={{ color: INK }}>EZee Assist</span>
        <span className="hidden sm:inline" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", color: MUTED }}>TICKETING</span>
        <span className="ml-auto flex items-center gap-4">
          {["Filter", "Sort", "Columns", "Export"].map((a) => (
            <span key={a} className="hidden text-[12.5px] lg:inline" style={{ color: MUTED }}>{a}</span>
          ))}
          <Avatar initials="PN" tone="plum" />
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[158px_minmax(0,1fr)] wide:grid-cols-[158px_minmax(0,1fr)_300px]">
        {/* Left rail */}
        <div className="hidden flex-col gap-1 p-3 lg:flex" style={{ background: "#FBFCFE", borderRight: `1px solid ${RULE}` }}>
          <span className="px-2 pb-1.5" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: MUTED }}>QUEUES</span>
          {QUEUES.map((q) => (
            <span
              key={q.label}
              className="flex items-center justify-between rounded-md px-2 py-1.5"
              style={q.selected ? { background: "#FFFFFF", border: `1px solid ${PLUM}` } : undefined}
            >
              <span className="text-[12.5px]" style={{ color: q.selected ? INK : MUTED, fontWeight: q.selected ? 600 : 400 }}>{q.label}</span>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: q.selected ? PLUM : MUTED }}>{q.count}</span>
            </span>
          ))}
          <span className="px-2 pb-1.5 pt-4" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: MUTED }}>CHANNELS IN</span>
          {CHANNELS.map((c) => (
            <span key={c.label} className="flex items-center gap-2 px-2 py-1">
              <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: c.dot }} />
              <span className="text-[12.5px]" style={{ color: MUTED }}>{c.label}</span>
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="min-w-0">
          <div
            className={`hidden gap-3.5 px-5 py-2.5 lg:grid ${HEAD_ROW}`}
            style={{ borderBottom: `1px solid ${RULE}`, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: MUTED }}
          >
            <span>TICKET</span><span>REQUEST</span><span>LOCATION</span><span>OWNER</span><span>SLA</span>
          </div>

          {/* #4471, the one the loop follows. */}
          <div
            className={`tk-c tk-row grid grid-cols-1 gap-2 px-4 py-3.5 lg:gap-3.5 lg:px-5 ${BODY_ROW}`}
            style={{ background: "rgba(142,63,124,.06)", borderBottom: `1px solid ${RULE}` }}
          >
            <span className="flex items-center gap-2 lg:flex-col lg:items-start lg:gap-1.5">
              <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: INK }}>#4471</span>
              {/* Stacked, crossfading. One slot, four badges. */}
              {/* One slot, four stacked badges. Sized to ONGOING, the
                     widest, so the row never reflows as they crossfade. */}
              <span className="relative inline-block h-[19px] w-[76px]">
                {BADGES.map((b) => (
                  <span key={b.label} className={`tk-c ${b.cls} absolute left-0 top-0`}>
                    <Pill label={b.label} tone={b.tone} />
                  </span>
                ))}
              </span>
            </span>

            <span className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[13.5px] leading-[1.4]" style={{ color: INK }}>
                Approval to run a joint promotion with a neighbouring gym
              </span>
              <span className="relative block h-[19px]">
                <span className="tk-c tk-classify absolute left-0 top-0 flex items-center gap-1.5">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => <span key={i} className="tk-dot h-1 w-1 rounded-full" style={{ background: PLUM }} />)}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: PLUM }}>CLASSIFYING</span>
                </span>
                <span className="tk-c tk-cat absolute left-0 top-0 flex flex-wrap gap-1.5">
                  <Pill label="PARTNER PROMO" tone="plum" />
                  <Pill label="LEGAL REVIEW" tone="purple" />
                </span>
              </span>
            </span>

            <span className="flex flex-col gap-0.5">
              <span className="text-[12.5px] font-semibold" style={{ color: INK }}>#214</span>
              <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>West territory</span>
            </span>

            <span className="tk-c tk-assign flex items-center gap-1.5">
              <Avatar initials="PN" tone="plum" />
              <Avatar initials="DL" tone="accent" />
              <span className="text-[12.5px]" style={{ color: MUTED }}>Marketing</span>
            </span>

            <Sla pct={46} label="2 business days" tone="plum" animate />
          </div>

          {/* The standing queue. Lifts from .55 once #4471 closes. */}
          {QUEUE.map((t) => (
            <div
              key={t.id}
              className={`tk-c tk-queue grid grid-cols-1 gap-2 px-4 py-3.5 lg:gap-3.5 lg:px-5 ${BODY_ROW}`}
              style={{ borderBottom: `1px solid ${RULE}` }}
            >
              <span className="flex items-center gap-2 lg:flex-col lg:items-start lg:gap-1.5">
                <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: INK }}>{t.id}</span>
                <Pill label={t.status} tone={t.tone} />
              </span>
              <span className="flex min-w-0 flex-col gap-1.5">
                <span className="text-[13.5px] leading-[1.4]" style={{ color: INK }}>{t.request}</span>
                <span className="flex"><Pill label={t.category} tone={t.catTone} /></span>
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[12.5px] font-semibold" style={{ color: INK }}>{t.store}</span>
                <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>{t.territory}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Avatar initials={t.initials} />
                <span className="text-[12.5px]" style={{ color: MUTED }}>{t.owner}</span>
              </span>
              <Sla pct={t.slaPct} label={t.sla} tone={t.slaTone} />
            </div>
          ))}
        </div>

        {/* Drawer. Under the table below 1440 so the table keeps the
            middle span at the widths the columns were measured for. */}
        <div
          className="tk-c tk-drawer flex flex-col gap-3.5 p-5 lg:col-span-2 wide:col-span-1"
          style={{ background: "#FBFCFE", borderTop: `1px solid ${RULE}` }}
        >
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: PLUM }}>#4471 · RAISED 10:04AM</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>Store #214</span>
          </span>
          <span style={{ fontFamily: JAKARTA, fontSize: 15, fontWeight: 700, color: INK, lineHeight: 1.35 }}>
            Joint promotion with a neighbouring gym
          </span>

          <div className="flex flex-col gap-2 rounded-xl p-3.5" style={{ background: "#FFFFFF", border: `1px solid ${RULE}` }}>
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: MUTED }}>
              GATHERED BEFORE ANYONE OPENED IT
            </span>
            {CONTEXT.map((c, i) => (
              <span key={c} className={`tk-c tk-ctx${i + 1} flex items-start gap-2 text-[12.5px] leading-[1.45]`} style={{ color: INK }}>
                <span className="flex-none" style={{ color: "#0D7C58" }}>✓</span>
                {c}
              </span>
            ))}
          </div>

          <div className="tk-c tk-resolve flex flex-col gap-2 rounded-xl p-3.5" style={{ background: "#FFFFFF", border: `1px solid ${RULE}` }}>
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "#0D7C58" }}>RESOLVED IN 4 HOURS</span>
            <span className="text-[12.5px] leading-[1.5]" style={{ color: INK }}>
              Priya approved with the standard partner terms. Legal cleared the entity question in
              the same thread.
            </span>
            <span
              className="tk-c tk-rule flex gap-2 rounded-lg p-2.5 text-[12.5px] leading-[1.45]"
              style={{ background: "rgba(0,119,168,.07)", color: "#0077A8" }}
            >
              <Glyph d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2.2 2.2L15 10" size={14} />
              Published as a standing rule. Prevents about 9 tickets a month.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

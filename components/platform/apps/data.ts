/**
 * Apps page data.
 *
 * The wish list, the build timeline, the six shipped apps and the four
 * authorship steps are all arrays, so a row is one line rather than a
 * hand-written block. Icon paths use the same space-separated encoding
 * `Glyph` splits apart on the Reporting page.
 */

export type Tone = "accent" | "purple" | "ok" | "warn" | "bad" | "muted";

export const TILE: Record<Tone, [string, string]> = {
  accent: ["rgba(0,119,168,.1)", "var(--ed-accent-text)"],
  purple: ["rgba(124,58,237,.1)", "var(--purple)"],
  ok:     ["rgba(13,124,88,.1)", "var(--ok)"],
  warn:   ["rgba(180,83,9,.1)", "var(--warn)"],
  bad:    ["rgba(180,35,24,.09)", "var(--bad)"],
  muted:  ["var(--ed-card-alt)", "var(--ed-fg-muted)"],
};

export const INK: Record<Tone, string> = {
  accent: "var(--ed-accent-text)",
  purple: "var(--purple)",
  ok:     "var(--ok)",
  warn:   "var(--warn)",
  bad:    "var(--bad)",
  muted:  "var(--ed-fg-muted)",
};

/* ── §2 ─────────────────────────────────────────────────────
   Five SHIPPED and one THIS WEEK. **Do not revert these to OPEN**: a
   cleared queue is the whole argument of the section. */
export const WISHLIST: { date: string; title: string; tag: string; now?: boolean }[] = [
  { date: "Mar 2024", title: "Closing checklist with photo verification",       tag: "OPS · CHECKLIST" },
  { date: "Jun 2024", title: "P&L digest managers can actually read",           tag: "HQ · DIGEST" },
  { date: "Feb 2025", title: "Shift swap board for part-timers",                tag: "FRANCHISEE · APP" },
  { date: "Sep 2025", title: "Quote sanity-check against brand pricing",        tag: "FBC · GUARDRAIL" },
  { date: "Jan 2026", title: "New-hire first-week tracker",                     tag: "FIELD COACH · TRACKER" },
  { date: "Jul 2026", title: "Local promo calendar with brand-approved assets", tag: "MARKETING · DASHBOARD", now: true },
];

/* ── §3 One app, twenty minutes, five stages. ── */
/* Six steps, and **the sixth is the point**. Shipping at 4:05 is the
   mechanic; nine managers using it fifteen minutes later is the business
   outcome. An earlier version ended at 4:05 and the section read as a
   build demo. `live` marks the payoff card, not the deployment step. */
export const TIMELINE: { label: string; body: string; d: string; live?: boolean }[] = [
  { label: "3:45PM · DESCRIBED", d: "M4 5h16v11H9l-5 4z M9 10h6", body: "“Build a daily digest for spa managers. Match today’s appointments to members due for an upsell.”" },
  { label: "3:47PM · GENERATED", d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z", body: "A working tool with the day’s appointments, membership status, and talking points already wired" },
  { label: "3:52PM · ADJUSTED",  d: "M4 20l4-1 10-10-3-3L5 16z M14 6l3 3", body: "“Only guests with three or more visits”, requested in chat and applied in seconds" },
  { label: "3:58PM · SCOPED",    d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2.2 2.2L15 10", body: "Already inside the rules you set, nothing to configure" },
  { label: "4:05PM · LIVE",      d: "M4 11v3l12 4V7L4 11z M16 8.5a5 5 0 010 7 M8 15v4h3", body: "Running at every location you chose, with nothing left to configure" },
  { label: "4:20PM · IN USE",    d: "M9 8a3 3 0 100-6 3 3 0 000 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M17 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M16.5 20c0-2.6 1.6-4.6 3.8-4.6", body: "Nine managers across the network already have it open, working today’s guests", live: true },
];

/* ── §4 ── */
export const APPS: { id: string; title: string; body: string; where: string; tone: Tone; d: string }[] = [
  { id: "closing", tone: "ok",     where: "214 LOCATIONS",  title: "Daily closing audit",     body: "Photo checklist per station, auto-scored, failures routed to the coach", d: "M9 4h6v3H9z M5 7h14v14H5z M9 13l2.2 2.2L15 11" },
  { id: "newhire", tone: "purple", where: "ALL LOCATIONS",  title: "New-hire first week",     body: "Day-by-day sequence, tracked, escalates if it stalls",                  d: "M4 6h16v14H4z M8 3v4 M16 3v4 M4 11h16" },
  { id: "quote",   tone: "warn",   where: "68 LOCATIONS",   title: "Quote sanity-check",      body: "Flags a quote outside brand pricing before it goes out",                d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M12 8v4 M12 15.5v.5" },
  { id: "pl",      tone: "accent", where: "140 LOCATIONS",  title: "P&L digest for managers", body: "Monthly numbers in plain language, emailed to store managers",          d: "M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h3" },
  { id: "swap",    tone: "accent", where: "142 LOCATIONS",  title: "Shift swap board",        body: "Staff post a shift, an approved cover picks it up, the schedule updates", d: "M4 9h13l-3-3 M20 15H7l3 3" },
  { id: "huddle",  tone: "ok",     where: "WEST TERRITORY", title: "Morning huddle card",     body: "Yesterday’s numbers and today’s bookings, one screen",         d: "M4 6h16v12H4z M4 10h16 M8 14h5" },
];

/* ── §5 ── */
export const STEPS: { label: string; body: string; published?: boolean }[] = [
  { label: "BUILT",     body: "School #036 builds a make-up lesson booker for its own parents, between classes" },
  { label: "PROVEN",    body: "In three weeks its make-up bookings double, and missed lessons stop turning into refunds" },
  { label: "REVIEWED",  body: "You see it, check what it reaches and what it can touch, adjust the wording" },
  { label: "PUBLISHED", body: "Live at every school the same week. School #036 is still the author.", published: true },
];

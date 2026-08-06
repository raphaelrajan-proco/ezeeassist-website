/**
 * Field Coaches page content.
 *
 * **Voice rule, applies to every line here:** never refer to the product
 * as "it" or "this". Name it, EZee Assist or EZee. Already applied
 * throughout; keep it for anything added.
 */

export type Tone = "accent" | "ok" | "warn" | "bad" | "purple" | "muted";

export const TONE: Record<Tone, [string, string]> = {
  accent: ["var(--chip-bg)",        "var(--ed-accent-text)"],
  ok:     ["rgba(13,124,88,.1)",    "var(--ok)"],
  warn:   ["rgba(180,83,9,.11)",    "var(--warn)"],
  bad:    ["rgba(180,35,24,.1)",    "var(--bad)"],
  purple: ["rgba(124,58,237,.1)",   "var(--purple)"],
  muted:  ["rgba(82,82,91,.09)",    "var(--ed-fg-muted)"],
};

/* ── §1 Hero brief ── */
export const TICKETS: { rank: string; store: string; headline: string; note: string; detail: string }[] = [
  { rank: "Ranked 1", store: "#402", headline: "Ramp behind cohort, week 6",  note: "first coaching call", detail: "What the fastest 10 openings did in week 6, attached" },
  { rank: "Ranked 2", store: "#331", headline: "Bookings 62% vs 80% target",  note: "third soft week",     detail: "Reactivation draft ready, 340 lapsed clients" },
  { rank: "Ranked 3", store: "#519", headline: "Labour 14% over standard",    note: "two weeks running",   detail: "Schedule variance by daypart, ready to open with" },
];

export const SINCE: [string, string][] = [
  ["#331", "owner approved and sent the reactivation offer Friday"],
  ["#214", "built a closing audit, now running network-wide"],
  ["#087", "refund escalation resolved, policy cited"],
];

/* ── §2 What reaches you first ──────────────────────────────
   Each icon carries its own small loop, so the four read as four
   different pressures rather than one grid of glyphs. */
export const TAXES: { title: string; body: string; tone: Tone; d: string; anim: string }[] = [
  { title: "The same five questions", tone: "accent", anim: "ico-pulse", d: "M4 5h16v11H9l-5 4z M9 9h6 M9 12h3",
    body: "Five locations, five channels, one morning. You answer each of them personally." },
  { title: "The chase",               tone: "warn",   anim: "ico-tick",  d: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8v4l3 2",
    body: "Insurance, training, audit docs, P&L. Each on its own clock, each needing a nudge." },
  { title: "The prep tax",            tone: "purple", anim: "ico-rise",  d: "M5 20V10 M10 20V4 M15 20v-8 M20 20V7",
    body: "Two hours pulling numbers from four systems before a one-hour call." },
  { title: "The triage",              tone: "bad",    anim: "ico-pulse-late", d: "M8 3v4 M16 3v4 M4 7h16v13H4z M4 11h16",
    body: "Thirty locations, one calendar. Whoever is loudest gets the hour." },
];

/* ── §3 The week ────────────────────────────────────────────
   Monday to Friday, one day every six seconds. The primary chips step
   through progressive blues, Monday lightest to Friday full EZee blue
   with a glow, so the week reads as building rather than repeating. */
export const DAYS: {
  day: string; chip: string; chipBg: string; chipInk: string; glow?: boolean; sub: string;
  tag: string; headline: string; body: string;
}[] = [
  { day: "Mon", chip: "Brief ready · 7:00", chipBg: "#DDF2FC", chipInk: "#0077A8", sub: "12 ranked by need",
    tag: "Monday · 7:00am", headline: "The brief is waiting.",
    body: "Twelve locations ranked by need, what changed since you last spoke, and what to open with on each call." },
  { day: "Tue", chip: "#402 ramp flag", chipBg: "#B9E6F9", chipInk: "#065D86", sub: "Cohort data attached",
    tag: "Tuesday", headline: "Surfaced before you asked.",
    body: "Store #402's ramp is behind cohort, with what the fastest ten openings did in week six attached." },
  { day: "Wed", chip: "Call · #331", chipBg: "#7ED3F4", chipInk: "#053F5C", sub: "Hour on why",
    tag: "Wednesday", headline: "The hour goes to why, not what.",
    body: "Your call with #331. You already know bookings are soft, the draft is ready, and the owner has seen it." },
  { day: "Thu", chip: "Play built · 4:10", chipBg: "#2EB7E9", chipInk: "#FFFFFF", sub: "Plain language",
    tag: "Thursday", headline: "You build the play once.",
    body: "Below 70% booked: check campaigns, pull lapsed clients, draft the offer, hold it for approval. Described in one message." },
  { day: "Fri", chip: "Ran at 214 · 6am", chipBg: "#00AEEF", chipInk: "#FFFFFF", glow: true, sub: "9 held for approval",
    tag: "Friday · 6:00am", headline: "Your play ran while you slept.",
    body: "214 locations checked overnight. Nine drafts waiting for owner approval, and you didn't touch any of it." },
];

/* ── §4 The play ── */
export const PLAY_CHUNKS = [
  "“When next week drops below 70% booked,",
  " check what campaigns are running and pull the lapsed client list.",
  " Draft the reactivation offer,",
  " hold it for the owner to approve,",
  " and tell me it went out.”",
];

export const PLAYS: { store: string; state: string; context: string; action: string; tone: Tone }[] = [
  { store: "#331", state: "62% booked", context: "Draft ready, owner approved Friday",         action: "Sent",      tone: "ok" },
  { store: "#052", state: "58% booked", context: "Seasonal threshold set by HQ",                action: "No action", tone: "muted" },
  { store: "#118", state: "66% booked", context: "Promo already running, suggested extending it", action: "Suggested", tone: "accent" },
  { store: "#402", state: "51% booked", context: "New owner, week six",                         action: "To you",    tone: "warn" },
];

/* ── §5 ── */
export const HANDLES = [
  "The repeated question",
  "The deadline chase",
  "Pulling and formatting the numbers",
  "Running the play at every location",
  "Drafting what goes out",
];

export const DECIDES = [
  "Which of the three problems to fix first",
  "Whether a number is noise or the start of something",
  "How to say it to an owner who's defensive",
  "What the play should be",
  "Whether it goes out",
];

/* ── §7 FAQ ─────────────────────────────────────────────────
   Q3's answer is final copy and opens exactly as written: coaches hold
   the pivotal role, as creators and curators. */
export const FAQS: [string, string][] = [
  ["Will I still know what's happening at my locations?",
   "More than now. Every question asked, every play that ran, and every escalation is visible in your brief, ranked and traced to its source. What disappears is the answering, not the awareness."],
  ["What if it tells an owner the wrong thing?",
   "EZee Assist answers only from your brand's approved material, cites the source on every answer, and below the confidence threshold opens a ticket for a person instead of guessing. Anything outbound waits for a human."],
  ["Do I have to build these plays myself?",
   "Plays come from everywhere. You can build them, HQ publishes the network-wide ones, top franchisees contribute what is proving out at their own locations, and EZee proposes plays on its own by watching what works across the network. Coaches hold the pivotal role: as creators and curators, your experience, observations, and intuition decide what gets built and what stays."],
];

export const RELATED = [
  { kicker: "Franchisor / HQ", title: "What your leadership sees",   href: "/solutions/leadership" },
  { kicker: "Franchisees",     title: "What your owners get",        href: "/platform/answers" },
  { kicker: "Reporting",       title: "How the brief is assembled",  href: "/platform/reporting" },
];

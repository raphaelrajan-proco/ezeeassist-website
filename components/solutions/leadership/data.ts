/**
 * HQ Leadership page content.
 *
 * **Voice rule, every line:** never call the product "it", "this", or
 * "this one". Name it, EZee Assist or EZee. Applied throughout.
 */

export type Tone = "accent" | "ok" | "warn" | "bad" | "purple" | "ever" | "muted";

export const TONE: Record<Tone, [string, string]> = {
  accent: ["var(--chip-bg)",      "var(--ed-accent-text)"],
  ok:     ["rgba(13,124,88,.1)",  "var(--ok)"],
  warn:   ["rgba(180,83,9,.11)",  "var(--warn)"],
  bad:    ["rgba(180,35,24,.1)",  "var(--bad)"],
  purple: ["rgba(124,58,237,.1)", "var(--purple)"],
  ever:   ["rgba(30,107,79,.11)", "var(--ever)"],
  muted:  ["rgba(82,82,91,.09)",  "var(--ed-fg-muted)"],
};

/* ── §1 Hero console feed ── */
export const FEED: [string, string][] = [
  ["6:50PM", "#331 owner approved the reactivation offer, 340 lapsed clients"],
  ["5:20PM", "#214's closing audit published network-wide by HQ"],
  ["4:00AM", "West brief assembled, 12 locations ranked by need"],
  ["NOW",    "Compliance completion 94%, from 71% last quarter"],
];

/* ── §3 Leverage ── */
export const PLAYS: { store: string; state: string; context: string; action: string; tone: Tone }[] = [
  { store: "#331", state: "62% booked, third soft week",      context: "Reactivation draft, 340 lapsed clients",  action: "Owner approved", tone: "ok" },
  { store: "#052", state: "58% booked, seasonal",             context: "Below the regional threshold HQ set",     action: "No action",      tone: "muted" },
  { store: "#118", state: "66% booked, promo running",        context: "Suggested extending it instead",          action: "Suggested",      tone: "accent" },
  { store: "#402", state: "51% booked, new owner week six",   context: "Escalated with full context",             action: "To the coach",   tone: "warn" },
];

/* ── §4 Owner flywheel ──────────────────────────────────────
   Four nodes and a return line. The loop closing is the argument: growth
   funds the support that produced it. Do not render this as four text
   columns; the connectors and the return are the point. */
export const STAGES: { name: string; line: string; tone: Tone; d: string }[] = [
  { name: "Supported",  tone: "accent", line: "Answers in seconds, advice on their numbers", d: "M4 5h16v11H9l-5 4z" },
  { name: "Performing", tone: "ok",     line: "Ramp shortens and the gap closes",            d: "M4 17l5-5 4 3 7-8 M15 7h5v5" },
  { name: "Validating", tone: "warn",   line: "Their validation call sells for you",         d: "M12 3l2.7 5.7 6.2.9-4.5 4.3 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3 9.6l6.2-.9z" },
  { name: "Expanding",  tone: "purple", line: "Renewals, second units, referrals",           d: "M12 20V7 M6 13l6-6 6 6" },
];

/* ── §5 Governance ── */
export const GOV: [string, string][] = [
  ["One policy",           "What AI can say, draft, and touch, set once at HQ and enforced at every location, on every channel."],
  ["One permission model", "Role and location decide what anyone can see or run, inherited from the systems you already administer."],
  ["One log",              "Who asked, what they saw, which sources were used, and who approved what went out. Every output, auditable."],
];

/* ── §6 Approval kit ────────────────────────────────────────
   Light grey cards with colourful icon tiles. Do NOT tint the whole
   cards; that was tried and rejected as too colourful. */
export const ASKERS: { who: string; q: string; link: string; href: string; tone: Tone; d: string }[] = [
  { who: "IT and Security", tone: "accent", link: "Trust Center",       href: "/security",
    q: "Where does our data sit, who processes it, is it used for training?",
    d: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4" },
  { who: "Legal", tone: "warn", link: "Control Center", href: "/platform/control-center",
    q: "What's logged, what's retained, and does this sit inside our franchise agreement?",
    d: "M12 3v18 M7 21h10 M4 7h16 M6 7l-2.5 6a3.2 3.2 0 005 0z M18 7l-2.5 6a3.2 3.2 0 005 0z" },
  { who: "Finance", tone: "ok", link: "Speak to an expert", href: "/speak-to-an-expert",
    q: "What's the cost model, and what does it avoid?",
    d: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v10 M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.4 0-2.5.8-2.5 1.9 0 1.2 1 1.6 2.5 2 1.5.3 2.5.9 2.5 2.1 0 1.1-1.1 2-2.5 2-1.1 0-2-.5-2.5-1.5" },
  { who: "Operations", tone: "ever", link: "Ticketing", href: "/platform/ticketing",
    q: "What lands in our queue on day one, and who owns it?",
    d: "M12 9a3 3 0 100 6 3 3 0 000-6z M12 2v3 M12 19v3 M4.9 4.9L7 7 M17 17l2.1 2.1 M2 12h3 M19 12h3 M4.9 19.1L7 17 M17 7l2.1-2.1" },
  { who: "Coaches", tone: "purple", link: "Field coaches", href: "/solutions/coaches",
    q: "What does my week look like with plays running?",
    d: "M12 4a3.5 3.5 0 100 7 3.5 3.5 0 000-7z M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" },
  { who: "Marketing", tone: "bad", link: "Control Center", href: "/platform/control-center",
    q: "Does anything generated stay on brand, and who approves what goes out?",
    d: "M3 11v3l12 4V7L3 11z M15 8.5a5 5 0 010 7 M7 15v4h3" },
  { who: "Franchise development", tone: "accent", link: "Case studies", href: "/case-studies",
    q: "Does this improve validation and ramp? What do owners say?",
    d: "M4 19l6-6 4 3 6-8 M15 8h5v5" },
  { who: "Training", tone: "warn", link: "Integrations", href: "/platform/integrations",
    q: "Is this replacing our LMS? No.",
    d: "M4 5a2 2 0 012-2h14v16H6a2 2 0 00-2 2z M4 5v16 M9 7h7" },
];

export const RELATED = [
  { kicker: "Field coaches", title: "What your team's week becomes", href: "/solutions/coaches" },
  { kicker: "Franchisees",   title: "What your owners get",          href: "/platform/answers" },
  { kicker: "Platform",      title: "How it's put together",         href: "/platform/control-center" },
];

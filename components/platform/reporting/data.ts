/**
 * Reporting page data.
 *
 * The tiles, crossings and bar sets are arrays rather than hand-written
 * blocks, so a row is added by editing one line. Icon paths are the
 * prototype's, verbatim: each is a space-separated list of subpaths that
 * `Glyph` splits back apart.
 *
 * Every hue below is a token name, never a literal, so the dark theme
 * swaps them without this file knowing.
 */

export type Tone = "accent" | "purple" | "ok" | "warn" | "bad";

/** Fill and ink for a tinted icon tile. */
export const TILE: Record<Tone, [string, string]> = {
  accent: ["rgba(0,119,168,.1)", "var(--ed-accent-text)"],
  purple: ["rgba(124,58,237,.1)", "var(--purple)"],
  ok:     ["rgba(13,124,88,.1)", "var(--ok)"],
  warn:   ["rgba(180,83,9,.1)", "var(--warn)"],
  bad:    ["rgba(180,35,24,.09)", "var(--bad)"],
};

export const INK: Record<Tone, string> = {
  accent: "var(--ed-accent-text)",
  purple: "var(--purple)",
  ok:     "var(--ok)",
  warn:   "var(--warn)",
  bad:    "var(--bad)",
};

/* ── §3 Inputs ──────────────────────────────────────────────
   Hues rotate so the grid is not a blue wall. */
export const INPUTS: { title: string; body: string; tone: Tone; d: string }[] = [
  { title: "Sales and transactions",    body: "Tickets, services, discounts, refunds",    tone: "accent", d: "M4 7h16v13H4z M4 7l2-3h12l2 3 M9 12h6" },
  { title: "Bookings and capacity",     body: "Appointments, utilization, open slots",    tone: "purple", d: "M4 6h16v14H4z M8 3v4 M16 3v4 M4 11h16" },
  { title: "Labour",                    body: "Hours, cost against revenue, variance",    tone: "ok",     d: "M12 8v4l3 2 M12 3a9 9 0 100 18 9 9 0 000-18z" },
  { title: "Customers",                 body: "Retention, lapse, frequency, lifetime value", tone: "warn", d: "M12 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7 M5 21c0-4 3-7 7-7s7 3 7 7" },
  { title: "Financials",                body: "P&L lines, invoices, payments, royalties", tone: "ok",     d: "M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h3" },
  { title: "Compliance and training",   body: "Certification, completion, open items",    tone: "bad",    d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2.2 2.2L15 10" },
  { title: "Onboarding",                body: "Ramp progress against cohort",             tone: "purple", d: "M4 18l5-6 4 3 6-8 M4 21h17" },
  { title: "Support",                   body: "Questions asked, tickets, content gaps",   tone: "accent", d: "M4 5h16v11H9l-5 4z M9 10h6" },
];

export const LIVE_SOURCES = ["Mindbody", "ServiceTitan", "Toast", "QuickBooks", "ADP", "Salesforce"];

/* ── §5 Across the stack ────────────────────────────────────
   One question reading four systems at once. The vantage is HQ over a
   300-location network, which is why **every row counts locations, not
   records**. Restating a row as a network total ("9,400 lapsed clients")
   is not decision-grade for HQ and breaks the funnel.

   `fill` is the count as a share of the 300-location network, so a
   changed count means a recomputed width. The set must stay internally
   consistent: each filter narrows, and the intersection has to stay
   smaller than the tightest single filter. */
export const NETWORK_SIZE = 300;

export const STACK_ROWS: { label: string; tint: string; count: number; value: string }[] = [
  { label: "SCHEDULING", tint: "#5BA8D8", count: 184, value: "184 locations with open capacity" },
  { label: "CRM",        tint: "#A78BFA", count: 121, value: "121 locations with 200+ lapsed clients" },
  { label: "MARKETING",  tint: "#FBBF24", count: 61,  value: "61 locations with no campaign live" },
  { label: "POS",        tint: "#34D399", count: 38,  value: "38 locations pacing behind plan" },
];

/** What survives the join. Smaller than the tightest single filter. */
export const STACK_JOIN = 23;

/* ── §7 Scoping ─────────────────────────────────────────────
   The indent is what carries the nesting at desktop. Below md it is
   replaced by a left accent rule, and the role label stays bold, so the
   hierarchy is never indent alone. */
export const SCOPES: { role: string; body: string; tone: Tone; indent: number; d: string }[] = [
  { role: "HQ",            tone: "accent", indent: 0,   body: "The whole network. Every location, every cut, every period.",   d: "M4 11l8-6 8 6 M6 10v9h12v-9" },
  { role: "Field coach",   tone: "purple", indent: 44,  body: "Their territory. Twelve locations, compared against each other.", d: "M12 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7 M5 21c0-4 3-7 7-7s7 3 7 7" },
  { role: "Franchisee",    tone: "ok",     indent: 88,  body: "Their locations. P&L, bookings, labour, their own team.",       d: "M4 6h16v14H4z M8 3v4 M16 3v4 M4 11h16" },
  { role: "Store manager", tone: "warn",   indent: 132, body: "Their store. Today, this week, measured against target.",       d: "M4 7h16v13H4z M4 7l2-3h12l2 3 M9 12h6" },
];

export const RELATED = [
  { kicker: "Integrations",   title: "Where the numbers come from",           href: "/platform/integrations" },
  { kicker: "Workflows",      title: "When an answer should trigger an action", href: "/platform/workflows" },
  { kicker: "Control Center", title: "How scoping is set",                    href: "/platform/control-center" },
];

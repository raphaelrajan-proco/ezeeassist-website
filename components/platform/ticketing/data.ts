/**
 * Ticketing page data.
 *
 * The queue, the nine departments and the recurring requests are arrays,
 * so a row is one line. Icon paths use the space-separated subpath
 * encoding `Glyph` splits apart.
 *
 * Note what the queue deliberately does **not** contain: there is no
 * Legal queue and no breached row. Coaches and Operations carry the
 * largest volumes because that is what the section is arguing, that the
 * load is operational rather than a support desk.
 */

export type Tone = "accent" | "plum" | "purple" | "ok" | "warn" | "bad" | "muted";

/** [tint, ink] for every tone. Fixed hex, because most of these sit on
    the console's own light surface rather than on a page token. */
export const TONES: Record<Tone, [string, string]> = {
  accent: ["rgba(0,119,168,.1)",  "#0077A8"],
  plum:   ["rgba(142,63,124,.1)", "#8E3F7C"],
  purple: ["rgba(124,58,237,.1)", "#7C3AED"],
  ok:     ["rgba(13,124,88,.11)", "#0D7C58"],
  warn:   ["rgba(180,83,9,.11)",  "#B45309"],
  bad:    ["rgba(180,35,24,.1)",  "#B42318"],
  muted:  ["#EEF0F4",             "#52525B"],
};

export type Ticket = {
  id: string; status: string; tone: Tone;
  request: string; category: string; catTone: Tone;
  store: string; territory: string;
  initials: string; owner: string;
  sla: string; slaPct: number; slaTone: Tone;
};

export const QUEUE: Ticket[] = [
  { id: "#4470", status: "ONGOING", tone: "ok",    request: "POS will not take the new discount code",       category: "SYSTEM ACCESS",   catTone: "accent", store: "#118", territory: "East territory",  initials: "RK", owner: "IT",            sla: "4 hours left", slaPct: 68,  slaTone: "ok" },
  { id: "#4468", status: "ONGOING", tone: "ok",    request: "Equipment down, need the approved service vendor", category: "EQUIPMENT",    catTone: "warn",   store: "#263", territory: "North territory", initials: "MO", owner: "Operations",    sla: "6 hours left", slaPct: 58,  slaTone: "ok" },
  { id: "#4465", status: "ONGOING", tone: "ok",    request: "Royalty invoice does not match my P&L",         category: "ROYALTY",         catTone: "purple", store: "#052", territory: "West territory",  initials: "AB", owner: "Finance",       sla: "1 day left",   slaPct: 44,  slaTone: "ok" },
  { id: "#4462", status: "ONGOING", tone: "ok",    request: "New hire needs training access before Monday",  category: "ACCESS",          catTone: "ok",     store: "#402", territory: "West territory",  initials: "JC", owner: "Training",      sla: "2 days left",  slaPct: 26,  slaTone: "ok" },
  { id: "#4459", status: "CLOSED",  tone: "muted", request: "Approval to sponsor a local minor hockey team", category: "LOCAL MARKETING", catTone: "plum",   store: "#331", territory: "West territory",  initials: "PN", owner: "Marketing",     sla: "closed in 6h", slaPct: 100, slaTone: "muted" },
  { id: "#4455", status: "CLOSED",  tone: "muted", request: "Second unit enquiry for the Riverside area",    category: "RESALE",          catTone: "accent", store: "#087", territory: "East territory",  initials: "SV", owner: "Franchise Dev", sla: "closed in 2d", slaPct: 100, slaTone: "muted" },
];

export const QUEUES: { label: string; count: number; selected?: boolean }[] = [
  { label: "All open",    count: 64, selected: true },
  { label: "Coaches",     count: 21 },
  { label: "Operations",  count: 18 },
  { label: "Marketing",   count: 11 },
  { label: "IT",          count: 6 },
  { label: "Finance",     count: 4 },
  { label: "Real Estate", count: 3 },
];

export const CHANNELS: { label: string; dot: string }[] = [
  { label: "Teams", dot: "#8E3F7C" },
  { label: "Slack", dot: "#7C3AED" },
  { label: "SMS",   dot: "#0D7C58" },
  { label: "Email", dot: "#B45309" },
];

export const CONTEXT = [
  "Store #214 · West territory · Dana R. is the coach",
  "Local marketing spend YTD and remaining budget",
  "Two similar partner promos approved in the last year",
  "The brand's co-promotion policy, current version",
];

export const TAKEAWAYS: { title: string; body: string; accent?: boolean }[] = [
  { title: "Raised",              body: "By asking, in Teams, Slack, or SMS" },
  { title: "Triaged automatically", body: "Machine learning reads what it actually is" },
  { title: "Owned",               body: "By the right team, on a visible clock" },
  { title: "Closed and trained",  body: "The resolution answers the next one", accent: true },
];

/* ── §4 Routing ─────────────────────────────────────────────
   Every card is filled with its own tint, not just the icon: nine
   neutral cards would argue that the departments are interchangeable,
   which is the opposite of the point. */
export const DEPARTMENTS: { name: string; examples: string; tone: Tone; d: string }[] = [
  { name: "Operations",            tone: "accent", examples: "Equipment down, supplier issue, staffing crisis",     d: "M4 20V9l8-5 8 5v11z M10 20v-6h4v6" },
  { name: "Marketing",             tone: "plum",   examples: "Local promo, asset request, campaign approval",       d: "M4 10v4l12 4V6L4 10z M16 8.5a5 5 0 010 7 M6 14v4h3" },
  { name: "IT",                    tone: "purple", examples: "POS access, system outage, new user setup",           d: "M3 5h18v11H3z M8 20h8 M12 16v4" },
  { name: "Legal",                 tone: "warn",   examples: "Partner terms, lease review, trademark use",          d: "M12 4v16 M5 8h14 M5 8l-2 6h4z M19 8l-2 6h4z" },
  { name: "Finance",               tone: "ok",     examples: "Royalty query, invoice dispute, P&L discrepancy",     d: "M6 3h12v18H6z M9 8h6 M9 12h6 M9 16h3" },
  { name: "Real Estate",           tone: "accent", examples: "Lease renewal, site relocation, territory question",  d: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z M12 10.5h.01" },
  { name: "Training",              tone: "purple", examples: "Certification, course reset, new hire access",        d: "M3 8l9-4 9 4-9 4z M7 11v5c0 1.5 2.2 2.5 5 2.5s5-1 5-2.5v-5" },
  { name: "Franchise Development", tone: "plum",   examples: "Resale enquiry, additional unit, territory expansion", d: "M4 18l5-6 4 3 6-8 M4 21h17" },
  { name: "Supply Chain",          tone: "warn",   examples: "Order issue, backorder, vendor pricing",              d: "M3 8l9-4 9 4v8l-9 4-9-4z M3 8l9 4 9-4 M12 12v8" },
];

/* ── §5 ── */
export const RECURRING = [
  { topic: "Partner promo approvals",   count: "9×", avg: "avg 6.2 days to close" },
  { topic: "Refund tenure exceptions",  count: "7×", avg: "avg 1.1 days" },
  { topic: "POS discount code failures", count: "6×", avg: "avg 4 hours" },
  { topic: "Lease renewal questions",   count: "5×", avg: "avg 8.8 days" },
];

export const RULES = [
  { rule: "A standing rule on partner promotions",      saving: "−9 a month" },
  { rule: "A refund policy that covers tenure",         saving: "−7 a month" },
  { rule: "POS discount troubleshooting steps",         saving: "−6 a month" },
  { rule: "Lease renewal FAQ with your standard terms", saving: "−5 a month" },
];

/* ── §2 ── */
export const TRAIL = [
  "Emailed marketing@, no reply for three days",
  "Asked the coach instead",
  "Coach forwarded it to Marketing",
  "Marketing said Legal needed to see it",
  "Legal asked which entity signs",
];

export const INBOXES: { alias: string; note: string; bad?: boolean }[] = [
  { alias: "marketing@",      note: "a shared inbox" },
  { alias: "it@",             note: "a shared inbox" },
  { alias: "legal@",          note: "one person's inbox" },
  { alias: "realestate@",     note: "a shared inbox" },
  { alias: "coach's mobile",  note: "no record", bad: true },
  { alias: "the portal form", note: "nobody uses it" },
];

export const RELATED = [
  { kicker: "Answers",        title: "What never becomes a ticket",  href: "/platform/answers" },
  { kicker: "Reporting",      title: "Ask about the queue itself",   href: "/platform/reporting" },
  { kicker: "Control Center", title: "Who owns what, and the rules", href: "/platform/control-center" },
];

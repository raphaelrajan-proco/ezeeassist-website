/**
 * Control Center page content.
 *
 * The page's job is being forwarded, so it reads like a document rather
 * than a brochure. Three readers use it: the ops champion who needs
 * material to hand to colleagues, the IT and security reviewer who needs
 * enough specificity to say yes, and Legal, Finance and Marketing who
 * each need one question answered fast.
 */

/* ── §1 Hero policy surface ─────────────────────────────────
   **Do not "fix" the last row to ON.** A surface where every toggle is
   on reads as marketing. One switch off, and it being the one about
   training on their data, reads as a real settings screen. */
export const POLICY: { label: string; on: boolean }[] = [
  { label: "Answers from approved sources only",    on: true },
  { label: "Cite the source on every answer",       on: true },
  { label: "Scope by role and location",            on: true },
  { label: "Customer-facing sends require approval", on: true },
  { label: "Franchisee-built tools require HQ review", on: true },
  { label: "Model training on your content",        on: false },
];

/* ── §2 One system ──────────────────────────────────────────
   Tone constraint: nothing in the left panel may imply the franchisor
   lacks IT capability or failed at governance. They have a competent IT
   team; AI adoption happened in a dozen places at once, which is an
   architectural condition. Every row names a situation rather than
   assigning blame. A page that reads as an accusation will not get
   forwarded. */
export const SEPARATE: { who: string; what: string; warn?: boolean }[] = [
  { who: "Franchisees", what: "Their own tools, their own prompts, their own data" },
  { who: "Coaches",     what: "Whatever helps, chosen individually" },
  { who: "Marketing",   what: "One assistant" },
  { who: "IT",          what: "A different one" },
  { who: "Support",     what: "Something built into the helpdesk" },
  { who: "HQ",          what: "A policy document nobody can enforce", warn: true },
];

/** These five preview sections 3, 4 and 6. Keep the order. */
export const UNIFIED: [string, string][] = [
  ["One policy set",      "Written once, applied everywhere"],
  ["One access model",    "Down to the person, at every location"],
  ["One capability model", "What the AI may do, per role"],
  ["One activity record", "Every question, action, approval, and cost"],
  ["One place to change", "Move something, and every location follows"],
];

/* ── §3 Data access ─────────────────────────────────────────
   Four responses, not two: the escalation from one store to 214 is what
   makes the model legible. The rule under each label grows down the
   list, which is the visual half of the same argument. Keep the HQ row's
   analytical insight, the top-decile script: it shows access controls
   analysis, not just data. */
export const RESPONSES: { role: string; rule: number; text: string }[] = [
  { role: "Shift lead · Store #118", rule: 28,  text: "Your store: 22%, up 3 points. Target is 25%." },
  { role: "Owner · Store #118",      rule: 52,  text: "Your two locations: 22% and 19%. Target 25%. Attach is your largest gap to plan this quarter." },
  { role: "Field coach · West",      rule: 78,  text: "Your twelve locations, ranked. #052 leads at 31%, #402 trails at 14%. Territory average 23% against a network average of 26%." },
  { role: "HQ · Leadership",         rule: 104, text: "All 214 locations. Network 26%, up 1 point. West is the weakest territory. Top decile runs a 30-second add-on script that the bottom quartile does not." },
];

export const ACCESS_POINTS = [
  { title: "Inherited, not rebuilt", body: "You don't re-model your org here. It reads what your systems already enforce and layers your rules on top." },
  { title: "Enforced per response",  body: "Scoping applies to every answer, report, and action, not once at sign-in." },
  /* Do not soften this into something that reads as a configurable
     setting; a franchisee-facing rollout depends on it. */
  { title: "Locations stay independent", body: "Every location's numbers are sensitive and contractually theirs. That boundary is structural." },
];

/* ── §4 Capability, the centrepiece ─────────────────────────
   **Three states, never two.** The approval state is what makes this
   read as an operating network rather than a lockdown.
   **Never reorder the rows.** Search sits at the top because it is
   uncontentious; publish network-wide sits at the bottom because it is
   what HQ actually worries about. A reader travelling down the matrix
   moves from obviously fine to exactly my concern, and finds it closed.
   That descent is the structure. */
export type Cell = "yes" | "approval" | "no";

export const ROLES = ["Staff", "Owner", "Coach", "HQ", "Leadership"];

export const MATRIX: { band: string; rows: { label: string; cells: Cell[]; emphasis?: boolean }[] }[] = [
  {
    band: "Search and retrieve",
    rows: [
      { label: "Search approved content",              cells: ["yes", "yes", "yes", "yes", "yes"] },
      { label: "Search their own threads and tickets", cells: ["yes", "yes", "yes", "yes", "yes"] },
      { label: "Search across the network's tickets",  cells: ["no", "no", "yes", "yes", "yes"] },
    ],
  },
  {
    band: "Analyze",
    rows: [
      { label: "Attach a file for analysis",           cells: ["no", "yes", "yes", "yes", "yes"] },
      { label: "Analyze a table or dataset",           cells: ["no", "yes", "yes", "yes", "yes"] },
      { label: "Generate a document, CSV, or export",  cells: ["no", "yes", "yes", "yes", "yes"] },
    ],
  },
  {
    band: "Create and push",
    rows: [
      { label: "Generate marketing copy",              cells: ["no", "approval", "yes", "yes", "yes"] },
      { label: "Create a record or a new unit",        cells: ["no", "no", "approval", "yes", "yes"] },
      { label: "Send an announcement",                 cells: ["no", "no", "approval", "approval", "yes"] },
    ],
  },
  {
    band: "Build and publish",
    rows: [
      { label: "Build a tool for their own location",  cells: ["no", "yes", "yes", "yes", "yes"] },
      { label: "Generate training for themselves",     cells: ["no", "yes", "yes", "yes", "yes"] },
      /* The last row carries emphasis because it answers the biggest
         objection on the site. */
      { label: "Publish a tool or training network-wide", cells: ["no", "no", "no", "approval", "yes"], emphasis: true },
    ],
  },
];

/* ── §5 Safe rollout ────────────────────────────────────────
   This must not become a card grid. Section 6 follows and is data
   dense; the numbered sequence is what keeps them distinct. */
export const ROLLOUT: [string, string, string][] = [
  ["01", "Bounded",     "Anything built can only reach data that the location is already entitled to see."],
  ["02", "Isolated",    "No other location is affected by anything they build, test, or get wrong."],
  ["03", "Inspectable", "You can see exactly what it reads, what it writes, who it notifies, and what it sends."],
  ["04", "Verified",    "Nothing publishes beyond its own location without HQ approving it."],
];

/* ── §6 The record ──────────────────────────────────────────
   Keep the human actions: entries 3 and 5 involve named people
   approving and publishing, and that is what makes the record usable in
   a dispute. The odd minutes are deliberate; 9:14 is credible where
   9:00 is not. */
export const LOG: { time: string; actor: string; topic: string; detail: string; hold?: boolean }[] = [
  { time: "09:14", actor: "Store #118 · shift lead · asked",  topic: "Promo stacking rules",   detail: "Answered from summer-promo-guide.pdf, loyalty-policy.pdf" },
  { time: "10:05", actor: "Store #214 · owner · analyzed",    topic: "Q3 labour vs revenue",   detail: "File attached · table analysis returned" },
  { time: "11:40", actor: "Store #263 · system · drafted",    topic: "Review response",        detail: "Held for owner approval · approved 11:52 by Maria S.", hold: true },
  { time: "14:20", actor: "Store #087 · system · escalated",  topic: "Refund outside policy",  detail: "Ticket #4471 · routed to Dana R. · replied 34m" },
  { time: "16:02", actor: "HQ · Priya N. · published",        topic: "Partner promo rule",     detail: "Applied to 214 locations" },
];

/* ── §7 Model choice ────────────────────────────────────────
   Do not name a model vendor. The claim is swappability; a vendor list
   dates fast. The third point is the important one: model-agnostic only
   reassures if governance survives the swap. */
export const MODEL_POINTS = [
  { title: "Chosen per task",        body: "Different models are better at different things. You're not locked to one for everything." },
  { title: "Swapped without rebuilding", body: "Nothing you've configured, published, or authored changes when the underlying model does." },
  { title: "Constrained the same way",  body: "Whichever model runs, your policies, rules, capability permissions, and other controls apply identically." },
];

/* ── §8 Review-ready ────────────────────────────────────────
   IT and Security stays first: security review stalls more enterprise
   deals than pricing does. The franchisee row stays too; including the
   people being governed among the stakeholders signals the rollout is
   designed to survive contact with owners. One line per row, this is a
   routing table rather than seven arguments. */
export const ROUTING: { fn: string; q: string; to: string; href: string }[] = [
  { fn: "IT and Security", q: "Where does our data sit, who processes it, is it used for training?", to: "Trust Center",     href: "/security" },
  { fn: "Legal",           q: "What's logged, how long is it retained, does this sit inside our franchise agreement?", to: "The record, above", href: "#record" },
  { fn: "Compliance",      q: "Can we produce an audit trail if a location disputes something?",     to: "The record, above", href: "#record" },
  { fn: "Finance",         q: "What does it cost, and can it run away from us?",                     to: "The record, above", href: "#record" },
  { fn: "Operations",      q: "What runs without a person, and can we change that line?",            to: "Capability, above", href: "#capability" },
  { fn: "Marketing",       q: "Can a franchisee generate copy in our name, and who approves it?",    to: "Capability, above", href: "#capability" },
  { fn: "Your franchisees", q: "What can HQ see about my business, and what can I build?",           to: "Sandbox, above",    href: "#sandbox" },
];

/* ── §9 Proof ───────────────────────────────────────────────
   The prototype ships four visible {{TBD}} tokens. These are the real,
   already-published WSI figures from lib/data/case-studies.ts. The
   handoff also suggested "in 30 days"; that is not supported anywhere in
   the repo, so the metric stays as published. An IT or security voice
   would be the higher-value quote for this page if one is ever
   sourced. */
export const PROOF = {
  brand: "WSI · Global franchise network",
  metric: "67% fewer repetitive questions",
  quote:
    "EZee Assist is much more than just a chatbot. It truly made universal search possible at WSI, levelling the playing field for our franchisees across geographies and languages.",
  attribution: "Jeffrey Grant · Systems Manager, WSI World",
};

/* ── §10 Related ── */
export const RELATED = [
  { kicker: "Trust Center", title: "How your data is handled, stored, and protected",          href: "/security" },
  { kicker: "Apps",         title: "What your owners can build, and what happens before it spreads", href: "/platform/apps" },
  { kicker: "Workflows",    title: "Where the approval line applies in practice",              href: "/platform/workflows" },
];

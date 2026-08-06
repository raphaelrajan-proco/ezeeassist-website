/**
 * Workflows page content.
 *
 * The 54 industry plays, the three hero demo plays, the six triggers and
 * the four timeline rows, all as data. Copy is final and carried
 * verbatim from the handoff's `content/*.json`.
 *
 * **The counts here are illustrative, not customer data.** The Over time
 * section carries a visible "Counts are illustrative." line for exactly
 * that reason and it stays until real figures replace these.
 */

export const CATEGORY_COLOR: Record<string, string> = {
  Revenue: "#0077A8",
  Marketing: "#7C3AED",
  Compliance: "#B45309",
  Operations: "#4B7A52",
};

export type Play = { category: string; name: string; detail: string };

/** Nine plays each, and always nine: the panel grid is a fixed 3x3. */
export const VERTICALS: { id: string; name: string; photo: string; plays: Play[] }[] = [
  {
    id: "health", name: "Health & Wellness", photo: "/photos/industries/health.jpg",
    plays: [
      { category: "Revenue", name: "Soft week recovery", detail: "Bookings below 70% → lapsed client list pulled, reactivation offer drafted" },
      { category: "Revenue", name: "Membership at risk", detail: "Active member, no visit in 30 days → check-in drafted for the front desk" },
      { category: "Revenue", name: "Retail attach gap", detail: "Retail per visit below territory median → the script the top quartile uses" },
      { category: "Marketing", name: "Review response", detail: "Rating below three stars → response drafted, held for the owner" },
      { category: "Marketing", name: "Class fill push", detail: "Class under half booked 48h out → local promo drafted from brand assets" },
      { category: "Compliance", name: "Practitioner licence", detail: "Credential expiring in 30 days → renewal chased, escalated at 21" },
      { category: "Compliance", name: "Sanitation log", detail: "Nightly close → photo check per station, scored, failures routed" },
      { category: "Operations", name: "No-show pattern", detail: "No-show rate above standard two weeks → deposit policy prompted" },
      { category: "Operations", name: "Rebook drift", detail: "Rebook rate declining three weeks, no alert set → surfaced to the coach" },
    ],
  },
  {
    id: "home", name: "Home Services", photo: "/photos/industries/home.jpg",
    plays: [
      { category: "Revenue", name: "Quote follow-up gap", detail: "Quote out five days, no reply → follow-up drafted with the range that wins" },
      { category: "Revenue", name: "Seasonal rebook", detail: "Eleven months since last service → rebook outreach at the right week" },
      { category: "Revenue", name: "Ticket below territory", detail: "Average job value trailing peers → upsell script from the top quartile" },
      { category: "Marketing", name: "Neighbourhood sweep", detail: "Job completed → adjacent-address list assembled for the crew" },
      { category: "Marketing", name: "Review timing", detail: "Job closed and paid → review request sent at the hour that converts" },
      { category: "Compliance", name: "Licence & insurance", detail: "Expiry 30 days out → notified, chased weekly, escalated at 21" },
      { category: "Compliance", name: "Technician certification", detail: "Credential lapsing → training assigned, coach and owner notified" },
      { category: "Operations", name: "First-time fix", detail: "Callbacks above threshold → diagnostic review scheduled with the tech" },
      { category: "Operations", name: "Same-day capacity", detail: "Open slots tomorrow → dispatch list built from the waitlist" },
    ],
  },
  {
    id: "senior", name: "Senior Care", photo: "/photos/industries/senior.jpg",
    plays: [
      { category: "Revenue", name: "Enquiry follow-up", detail: "Enquiry with no contact in 24 hours → escalated to the owner" },
      { category: "Revenue", name: "Care hours below plan", detail: "Authorised hours trending down → family check-in prompted" },
      { category: "Revenue", name: "Referral source quiet", detail: "Hospital or facility partner silent 60 days → outreach drafted" },
      { category: "Marketing", name: "Family review request", detail: "Thirty days into service → review request to the decision-maker" },
      { category: "Marketing", name: "Community event follow-up", detail: "Event attended → nurture sequence started for every attendee" },
      { category: "Compliance", name: "Caregiver certification", detail: "Credential expiring → training assigned, state requirement checked" },
      { category: "Compliance", name: "Care plan notes", detail: "Visit logged without documentation in 48 hours → flagged" },
      { category: "Operations", name: "Shift uncovered", detail: "Caregiver no-show → backup list surfaced within the hour" },
      { category: "Operations", name: "Turnover watch", detail: "Caregiver hours dropping three weeks → retention conversation prompted" },
    ],
  },
  {
    id: "child", name: "Child-care & Education", photo: "/photos/industries/child.jpg",
    plays: [
      { category: "Revenue", name: "Enrolment gap", detail: "Capacity below target for next term → waitlist outreach drafted" },
      { category: "Revenue", name: "Term renewal", detail: "Term ending in three weeks → re-enrolment sequence to every parent" },
      { category: "Revenue", name: "Sibling opportunity", detail: "One child enrolled, sibling in age range → offer drafted" },
      { category: "Marketing", name: "Parent review request", detail: "Milestone achieved → review request timed to the parent" },
      { category: "Marketing", name: "Open house fill", detail: "Event under-subscribed a week out → local campaign drafted" },
      { category: "Compliance", name: "Ratio breach", detail: "Staff-to-child ratio below requirement → flagged immediately" },
      { category: "Compliance", name: "Staff certification", detail: "First aid or credential expiring → training assigned and chased" },
      { category: "Operations", name: "Attendance drop", detail: "Child absent three or more sessions → parent check-in prompted" },
      { category: "Operations", name: "Waitlist ageing", detail: "Enquiry older than fourteen days → re-contact drafted" },
    ],
  },
  {
    id: "qsr", name: "QSR / F&B", photo: "/photos/industries/qsr.jpg",
    plays: [
      { category: "Revenue", name: "Daypart soft spot", detail: "Lunch below the four-week average → combo offer drafted" },
      { category: "Revenue", name: "Attach rate gap", detail: "Side attach below the median → the top quartile’s suggest-sell line" },
      { category: "Revenue", name: "Third-party margin", detail: "Delivery up, net per order down → pricing review prompted" },
      { category: "Marketing", name: "LSM window", detail: "Event within three miles → local offer and staffing note drafted" },
      { category: "Marketing", name: "Review response", detail: "Rating below three stars → response drafted for the GM" },
      { category: "Compliance", name: "Temperature log", detail: "Holding log missed at close → photo evidence requested" },
      { category: "Compliance", name: "Food handler cards", detail: "Card expiring in 30 days → training assigned and chased" },
      { category: "Operations", name: "Drive-thru times", detail: "Service past standard three days → shift breakdown to the GM" },
      { category: "Operations", name: "Waste creep", detail: "Food cost above plan two weeks → prep chart rebuilt" },
    ],
  },
  {
    id: "business", name: "Business Services", photo: "/photos/industries/business.jpg",
    plays: [
      { category: "Revenue", name: "Proposal follow-up", detail: "Proposal out seven days, no reply → follow-up with the win-rate range" },
      { category: "Revenue", name: "Account dormant", detail: "No activity in 90 days → re-engagement drafted for the owner" },
      { category: "Revenue", name: "Service mix gap", detail: "Single-service client → cross-sell prompt built from peer data" },
      { category: "Marketing", name: "Listing drift", detail: "Local listing or ranking slipping → correction task raised" },
      { category: "Marketing", name: "Referral partner quiet", detail: "Partner with no referrals in 60 days → outreach drafted" },
      { category: "Compliance", name: "Certification currency", detail: "Professional credential expiring → renewal chased to close" },
      { category: "Compliance", name: "Insurance renewal", detail: "Thirty days out → notified, chased, evidence captured on file" },
      { category: "Operations", name: "Turnaround slipping", detail: "Service SLA trending past standard → flagged to the owner" },
      { category: "Operations", name: "Onboarding stall", detail: "New client not activated in fourteen days → escalated" },
    ],
  },
];

/* ── The hero demo ──────────────────────────────────────────
   `seed` makes the tile fill deterministic per play, so the scatter is
   the same on every load rather than random noise. `field` is the tile
   distribution and `counts` is what the row above it reads; they differ
   by one or two because the callout stores are drawn out of the field. */
export type DemoPlay = {
  id: string; name: string; seed: number; sentence: string;
  counts: [string, string][];
  field: { acted: number; adapted: number; escalated: number; none: number };
  callouts: { store: string; state: string; kind: "acted" | "adapted" | "escalated" | "none"; why: string }[];
  closing: string;
};

export const DEMO_PLAYS: DemoPlay[] = [
  {
    id: "soft", name: "Soft week recovery", seed: 20260805,
    sentence:
      "\"When next week drops below 70% booked, check what campaigns are running and pull the lapsed client list. Draft the reactivation offer. Hold it for the owner to approve.\"",
    counts: [["214", "Locations"], ["47", "Actioned"], ["31", "Adapted"], ["6", "Escalated"], ["130", "No action"]],
    field: { acted: 46, adapted: 30, escalated: 5, none: 129 },
    callouts: [
      { store: "#331", state: "Actioned", kind: "acted", why: "62% booked. Draft ready for 340 lapsed clients." },
      { store: "#118", state: "Adapted", kind: "adapted", why: "Promo already live. Suggested extending it." },
      { store: "#402", state: "Escalated", kind: "escalated", why: "New owner, week six. Too early to automate." },
      { store: "#052", state: "No action", kind: "none", why: "Seasonal dip. Below this region's threshold." },
    ],
    closing:
      "A hundred and thirty locations got nothing, because they didn't need anything.",
  },
  {
    id: "sweep", name: "Nightly compliance sweep", seed: 41220931,
    sentence:
      "\"Every night, check the closing tasks, the temperature logs, and the certificates at every location. File what passes. Tell me what fails, with the evidence attached.\"",
    counts: [["214", "Locations"], ["198", "Actioned"], ["9", "Adapted"], ["7", "Escalated"], ["0", "No action"]],
    field: { acted: 197, adapted: 8, escalated: 6, none: 0 },
    callouts: [
      { store: "#331", state: "Actioned", kind: "acted", why: "14 checks passed. Log filed at 2:14am." },
      { store: "#118", state: "Adapted", kind: "adapted", why: "Temperature log offline. Retried and cleared at 4am." },
      { store: "#402", state: "Escalated", kind: "escalated", why: "Fire inspection certificate expired in March." },
    ],
    closing:
      "Seven locations failed a check overnight. The other 207 filed a clean log before 3am.",
  },
  {
    id: "hire", name: "New hire onboarding", seed: 77310457,
    sentence:
      "\"When a new hire is added to the schedule, send the manager the day one sequence, confirm the background check came back clear, and follow up with the owner on day three.\"",
    counts: [["214", "Locations"], ["4", "Actioned"], ["0", "Adapted"], ["1", "Escalated"], ["209", "No action"]],
    field: { acted: 3, adapted: 0, escalated: 0, none: 208 },
    callouts: [
      { store: "#144", state: "Actioned", kind: "acted", why: "Hire starts Monday. Day one sequence sent to the manager." },
      { store: "#402", state: "Escalated", kind: "escalated", why: "Background check still open on day one." },
      { store: "#052", state: "No action", kind: "none", why: "Nobody was hired here this week." },
    ],
    closing:
      "Five locations hired someone this week. The play left the other 209 alone.",
  },
];

export const STATE_COLOR = {
  acted:     "#8CC5DC",
  adapted:   "rgba(255,255,255,0.72)",
  escalated: "#E6A86E",
  none:      "rgba(255,255,255,0.10)",
  undecided: "rgba(255,255,255,0.055)",
} as const;

/* ── §5 Triggers ────────────────────────────────────────────
   Drift is singled out because it is the one nobody catches by hand,
   which is the argument of the section. */
export const TRIGGERS: { name: string; desc: string; example: string; drift?: boolean }[] = [
  { name: "Schedule",         desc: "A fixed clock you set",                        example: "Nightly compliance sweep, every location, 2am" },
  { name: "Threshold",        desc: "A number crosses a line",                      example: "Bookings for next week fall below 70%" },
  { name: "Date approaching", desc: "Something expires or comes due",               example: "Insurance lapses in 14 days" },
  { name: "Event",            desc: "Something happens in a connected system",      example: "A new hire is added to the schedule" },
  { name: "Inbound",          desc: "Someone asks or submits something",            example: "An owner requests an out-of-policy refund" },
  { name: "Drift",            desc: "A number moves quietly over time",             example: "Rebook rate declines three weeks running", drift: true },
];

/* ── §6 Over time ── */
export const TIMELINE: { month: string; count: string; width: number; headline: string; body: string; last?: boolean }[] = [
  { month: "Month 1",  count: "4",   width: 12,  headline: "HQ publishes the first four",
    body: "Compliance sweep, soft week recovery, insurance renewal, day-one onboarding." },
  { month: "Month 3",  count: "19",  width: 30,  headline: "Coaches add territory-specific ones",
    body: "The plays a coach used to run by hand on a Monday morning." },
  { month: "Month 6",  count: "47",  width: 58,  headline: "Owners submit their own, HQ publishes the best",
    body: "A play written in one market runs in 200 locations by the end of the month." },
  { month: "Month 12", count: "90+", width: 100, headline: "Most recurring work runs without anyone starting it",
    body: "Coaches spend their weeks on the four locations that need a person.", last: true },
];

/* ── §4 Authoring ── */
export const BUILD_ROWS: [string, string][] = [
  ["Trigger",  "Bookings for next week below 70%"],
  ["Reads",    "Scheduling · active campaigns · lapsed client list"],
  ["Drafts",   "Reactivation offer, brand template"],
  ["Approval", "Owner, before send"],
  ["Notifies", "Territory coach on send"],
  ["Scope",    "All locations · adjustable per region"],
  ["Author",   "Dana R., field coach"],
];

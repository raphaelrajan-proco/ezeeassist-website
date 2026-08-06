/**
 * Compliance page content.
 *
 * **Every figure on this page is illustrative**, which is why the hero
 * card and the chat mock both carry a visible "Illustrative" footer.
 * They are not read from `lib/data/network-scale.ts`: that file holds
 * confirmed network figures and putting a demo number in it would
 * corrupt its contract. 214, 187/19/8, store #263 and the region ledger
 * are all scene-setting, and the labels say so.
 */

export type Tone = "accent" | "purple" | "ok" | "warn" | "bad";

/* ── §1 Hero card ── */
export const NETWORK_STATE: { label: string; sub: string; figure: string; marker: "full" | "half" | "ring"; hue: string }[] = [
  { label: "Holding",     sub: "All current",                                figure: "187", marker: "full", hue: "#9FE0F8" },
  { label: "At risk",     sub: "Due within 30 days · owners notified",       figure: "19",  marker: "half", hue: "#F0B357" },
  { label: "Not current", sub: "Chased 4 days · 2 escalated to HQ",          figure: "8",   marker: "ring", hue: "#F08A7A" },
];

export const REGIONS: [string, string, string][] = [
  ["West",    "42 loc", "3 at risk"],
  ["Central", "58 loc", "7 at risk · 2 not current"],
  ["East",    "61 loc", "5 at risk"],
  ["South",   "53 loc", "4 at risk · 6 not current"],
];

/* ── §2 The gap ── */
export const BLIND_WINDOW = [
  "a certification lapsed at #263",
  "two locations missed a training deadline",
  "one insurance policy expired and renewed late",
];

export const WEEK: [string, string][] = [
  ["Mon", "Emailed 7 locations about outstanding P&L"],
  ["Tue", "Called 3 that hadn't replied"],
  ["Wed", "Chased insurance certificates from 4"],
  ["Thu", "Followed up on training completions"],
  ["Fri", "Started again with the ones from Monday"],
];

/* ── §3 Scope ───────────────────────────────────────────────
   Seven categories, so the four-up grid's last row is short by one.
   That is intentional and matches the reference. The colours are the
   semantic set used here as category identity, so keep the assignment
   stable if the set is reused. */
/* `check` is one real check the system runs for that category, added so
   each card shows the work rather than only naming the category. Keep
   them specific and phrased as an action: "Check if the annual liquor
   licence is current" says more than "monitors licences". */
export const SCOPE: { title: string; body: string; check: string; source: string; hue: string; d: string }[] = [
  { title: "Licensing and insurance", check: "Check the annual liquor licence is current and flag it 60 days out", hue: "#0077A8", source: "Read from · Document store, expiry dates",
    body: "Business licence, liability cover, bonding, vehicle insurance",
    d: "M3 5h18v14H3z M3 9h18" },
  { title: "Certification", check: "Confirm every practitioner on the schedule holds a live certification", hue: "#7C3AED", source: "Read from · LMS, HR, certification bodies",
    body: "Staff credentials, practitioner licences, food safety, background checks",
    d: "M12 3a9 9 0 100 18 9 9 0 000-18z M8.5 12l2.4 2.4L15.5 9.8" },
  { title: "Training", check: "Find new hires past week two who have not completed food safety", hue: "#0F856F", source: "Read from · LMS",
    body: "Required modules, refreshers, new-hire completion",
    d: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5.2l3.4 2" },
  { title: "Documentation", check: "Chase the P&L submission that has not landed for the closed month", hue: "#B45309", source: "Read from · Accounting, document store",
    body: "P&L submission, audit packs, incident reports, signed acknowledgements",
    d: "M7 3h7l4 4v14H7z M14 3v4h4 M10 12h6 M10 16h4" },
  { title: "Operational standards", check: "Ask for closing photos from any station that skipped last night", hue: "#0077A8", source: "Read from · Direct capture",
    body: "Opening and closing procedures, cleanliness, presentation, photo evidence",
    d: "M4 17l5-6 4 3 6-8 M4 21h17" },
  { title: "Brand standards", check: "Scan local franchisee websites and listings for off-brand pricing or signage", hue: "#7C3AED", source: "Read from · Direct capture, marketing systems",
    body: "Signage, uniform, menu, pricing, local marketing",
    d: "M12 3l8 9-8 9-8-9z" },
  { title: "Regulatory", check: "Verify staff-to-child ratios against the roster for every site in the state", hue: "#B42318", source: "Read from · Varies by industry",
    body: "Ratios, inspections, jurisdiction-specific requirements",
    d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" },
];

/* ── §5 The chase ───────────────────────────────────────────
   The stepped indent is the escalation, and the return to the first
   indent on the resolved row is the close. Preserve both. */
export const LADDER: { day: string; title: string; detail: string; indent: number; resolved?: boolean }[] = [
  { day: "Day 0",  indent: 0,  title: "Expires in 30 days", detail: "Owner notified · renewal contact attached · task opened" },
  { day: "Day 7",  indent: 1,  title: "Still outstanding",  detail: "Second reminder · sent to the channel they actually use" },
  { day: "Day 14", indent: 2,  title: "Still outstanding",  detail: "Territory coach notified · added to their Monday brief" },
  { day: "Day 21", indent: 3,  title: "Still outstanding",  detail: "Escalated to HQ · flagged in the network state" },
  { day: "Day 24", indent: 0,  title: "Renewed",            detail: "Certificate captured, dated, filed, and verified against the policy requirement", resolved: true },
];

/* ── §6 Closing it ── */
export const WRITE_BACK = [
  "Document store · cert-liability-2026.pdf, tagged #263",
  "Renewal date · advanced to Mar 14, 2027",
  "Open task · closed, 24 days",
];

/* Five blocks, and the last two were prose in the section lead until they
   moved here. As paragraphs they crowded the head; in this list they are
   the same claims at the same length as their siblings, beside the
   visual that demonstrates them. Keep new entries to one sentence. */
export const WRITE_BLOCKS = [
  { title: "Writes back to the system of record",
    body: "Documents, dates, completions, and acknowledgements land in the system that owns them, in the format that system expects." },
  { title: "Scoped by you",
    body: "You choose which fields and which systems accept a write. Everything outside that set stays read-only." },
  { title: "Logged and attributable",
    body: "Every write records who asked, what changed, and which requirement it satisfied." },
  { title: "Easy enough that it actually happens",
    body: "A renewal filed in the thread someone is already in is a renewal that gets filed, so the record stays true between audits." },
  { title: "Everything is logged",
    body: "The document, the photo, who submitted it and when, held against the location it belongs to." },
];

/* ── §7 Evidence ────────────────────────────────────────────
   The `Chain` row and the Day 24 row in §5 describe the same close from
   two angles. That is a deliberate callback, not duplication. */
/* EVIDENCE and EVIDENCE_COLS are deleted with the section they drove.

   That section showed a filed document, a photo and a submitter under
   the heading "The document, the photo, and who submitted it." It was
   one claim stretched into a band, and the claim now lives as an
   "Everything is logged" bullet in Closing it, beside the mechanism it
   is actually about. Do not rebuild the band; extend the bullet. */

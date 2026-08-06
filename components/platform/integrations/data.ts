/**
 * Integrations page data.
 *
 * ── Vendor logos ────────────────────────────────────────────
 * **The chips carry names, not marks, and that is deliberate.**
 *
 * The prototype pulls each logo from Google's favicon service. The
 * handoff itself says not to ship those URLs (rate-limited, unversioned,
 * and they sometimes return a generic globe), and the house rule is
 * firmer still: a logo is a committed local file or it is not shown.
 * Nothing here may reference a CDN.
 *
 * Sourcing forty official vendor marks is not a code change. Each has to
 * come from that vendor's own brand or press page and each carries
 * trademark terms, most of which require the mark unmodified and forbid
 * implying a partnership. That is a legal review, not a build step.
 *
 * `domain` below is kept for exactly that job: it is the download list.
 * When the files land in `public/logos/vendors/<slug>.svg`, swap the
 * chip body for a 15px `next/image` with an empty `alt` (the visible
 * name is already the label) and nothing else on the page changes.
 */

export type Chip = { name: string; domain: string };

export const DIRECTORY: { name: string; desc: string; chips: Chip[] }[] = [
  {
    name: "ERP & FMS",
    desc: "The franchise systems your network runs on.",
    chips: [
      { name: "FranConnect", domain: "franconnect.com" },
      { name: "ServiceTitan", domain: "servicetitan.com" },
      { name: "Mindbody", domain: "mindbodyonline.com" },
      { name: "Zenoti", domain: "zenoti.com" },
      { name: "ServiceMinder", domain: "serviceminder.io" },
      { name: "Thryv", domain: "thryv.com" },
    ],
  },
  {
    name: "Drives & storage",
    desc: "Every document your brand has written, wherever it lives.",
    chips: [
      { name: "SharePoint", domain: "sharepoint.com" },
      { name: "Google Drive", domain: "drive.google.com" },
      { name: "Dropbox", domain: "dropbox.com" },
      { name: "Box", domain: "box.com" },
      { name: "OneDrive", domain: "onedrive.live.com" },
      { name: "Notion", domain: "notion.so" },
      { name: "Amazon S3", domain: "aws.amazon.com" },
    ],
  },
  {
    name: "LMS & training",
    desc: "Courses, certifications, and brand standards.",
    chips: [
      { name: "TalentLMS", domain: "talentlms.com" },
      { name: "Docebo", domain: "docebo.com" },
      { name: "Trainual", domain: "trainual.com" },
      { name: "Scribe", domain: "scribehow.com" },
      { name: "Frontify", domain: "frontify.com" },
      { name: "LearningZen", domain: "learningzen.com" },
    ],
  },
  {
    name: "POS & transactions",
    desc: "What sold, when, and at what ticket.",
    chips: [
      { name: "Toast", domain: "toasttab.com" },
      { name: "Square", domain: "squareup.com" },
      { name: "Lightspeed", domain: "lightspeedhq.com" },
      { name: "TouchBistro", domain: "touchbistro.com" },
      { name: "Clover", domain: "clover.com" },
    ],
  },
  {
    name: "Accounting",
    desc: "P&L, invoices, payments, and royalties.",
    chips: [
      { name: "QuickBooks", domain: "quickbooks.intuit.com" },
      { name: "Xero", domain: "xero.com" },
      { name: "Stripe", domain: "stripe.com" },
      { name: "Qvinci", domain: "qvinci.com" },
      { name: "ProfitKeeper", domain: "profitkeeper.com" },
    ],
  },
  {
    name: "CRM",
    desc: "Who your locations talk to, and what happens next.",
    chips: [
      { name: "Salesforce", domain: "salesforce.com" },
      { name: "HubSpot", domain: "hubspot.com" },
      { name: "Zoho", domain: "zoho.com" },
      { name: "HighLevel", domain: "gohighlevel.com" },
      { name: "Airtable", domain: "airtable.com" },
      { name: "Monday", domain: "monday.com" },
    ],
  },
  {
    name: "Video & comms",
    desc: "The channels your teams already meet and talk in.",
    chips: [
      { name: "Microsoft Teams", domain: "microsoft.com" },
      { name: "Slack", domain: "slack.com" },
      { name: "Zoom", domain: "zoom.us" },
      { name: "Google Meet", domain: "meet.google.com" },
      { name: "Loom", domain: "loom.com" },
      { name: "Vimeo", domain: "vimeo.com" },
      { name: "YouTube", domain: "youtube.com" },
    ],
  },
  {
    name: "Marketing",
    desc: "Campaigns and brand assets, drafted on brand.",
    chips: [
      { name: "Mailchimp", domain: "mailchimp.com" },
      { name: "ActiveCampaign", domain: "activecampaign.com" },
      { name: "Constant Contact", domain: "constantcontact.com" },
      { name: "Canva", domain: "canva.com" },
      { name: "MediaValet", domain: "mediavalet.com" },
    ],
  },
];

/* ── §2 ─────────────────────────────────────────────────────
   Four steps of one blue family, light to deep, left to right. The
   dark-mode foreground is a separate value on purpose: blue4's #16375C
   is unreadable on the dark card, so it lifts to #BFDBFE. Do not
   collapse the two into one. */
export const NOTS: { title: string; body: string; tone: string; d: string }[] = [
  { tone: "blue1", title: "No content migration", d: "M7 3h7l4 4v14H7z M14 3v4h4 M10 13h5 M10 16h3",
    body: "Your SOPs stay in Drive, SharePoint, or your LMS. It reads them in place, at the version live today." },
  { tone: "blue2", title: "No data warehouse", d: "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7",
    body: "Performance data is read at the source when a question needs it. Nothing is copied and nothing goes stale." },
  { tone: "blue3", title: "No cleanup first", d: "M4 20l6-6 M9 8l7 7 4-4-7-7z M4 20h5",
    body: "You do not reorganise your documentation before anything works. It reads what you have and tells you where the gaps are." },
  { tone: "blue4", title: "No consolidation", d: "M5 5h5v5H5z M14 5h5v5h-5z M5 14h5v5H5z M14 14h5v5h-5z",
    body: "Keep the POS your operators like, the LMS your training team built, and the CRM your development team runs on." },
];

/** [lightBg, lightFg, darkBg, darkFg] */
export const BLUES: Record<string, [string, string, string, string]> = {
  blue1: ["rgba(0,174,239,.09)", "#0089C4", "rgba(0,174,239,.14)", "#38BDF8"],
  blue2: ["rgba(0,119,168,.09)", "#0077A8", "rgba(56,189,248,.13)", "#38BDF8"],
  blue3: ["rgba(47,92,128,.11)", "#2F5C80", "rgba(143,184,216,.13)", "#8FB8D8"],
  blue4: ["rgba(19,50,86,.1)",   "#16375C", "rgba(191,219,254,.13)", "#BFDBFE"],
};

/** Shared with the Reporting strip; see lib/data/integrations.ts. */
export { INTEGRATION_STRIP as MARQUEE } from "@/lib/data/integrations";

/* ── §5 ── */
export const ROLES: { role: string; unit: string; tone: string; sees: string; doesnt: string; lead?: boolean }[] = [
  { role: "Shift lead",       unit: "Store #118",    tone: "ok",     sees: "Their own location's schedule and the policy behind it", doesnt: "Margin, labour cost, or any other location" },
  { role: "Owner",            unit: "Store #118",    tone: "purple", sees: "Everything above, plus their P&L and their team's hours", doesnt: "Any other location's numbers" },
  { role: "District manager", unit: "West territory", tone: "accent", sees: "All twelve locations in their territory, compared",      doesnt: "Territories they don't manage", lead: true },
];

export const NOTES = [
  { title: "Inherited, not rebuilt",  body: "It reads what your systems already enforce" },
  { title: "Read-only by default",    body: "Write access is granted per system, never assumed" },
  { title: "Logged with the answer",  body: "Who asked, what they could see, which sources were used" },
  { title: "Revocable",               body: "Disconnect any system at any time, since nothing was copied" },
];

export const RELATED = [
  { kicker: "Answers",        title: "What it does with your knowledge", href: "/platform/answers" },
  { kicker: "Reporting",      title: "What it does with your data",      href: "/platform/reporting" },
  { kicker: "Control Center", title: "How access is set",                href: "/platform/control-center" },
];

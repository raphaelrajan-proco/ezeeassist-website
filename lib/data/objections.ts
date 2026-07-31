// Section 14 content. Single source of truth for both the visible
// accordion and the FAQPage JSON-LD, so the schema always matches
// what renders.

export interface Objection {
  q: string;
  a: string;
  /** Optional trailing link rendered under the answer. */
  link?: { label: string; href: string };
}

// TODO: Build the dedicated comparison pages before linking them. The ops-platform
// question currently points at /why-ezeeassist, the closest existing page, rather
// than an empty /compare.

export const objections: Objection[] = [
  {
    q: "Why not just use ChatGPT or Copilot?",
    a: "General AI tools do not know your playbooks, your brand standards, or which location is asking. They cannot read your performance data or act inside your systems, and nothing they do is recorded. Most franchise teams are already using them without any of that context, and that is the gap EZee closes.",
  },
  {
    q: "We already have a franchise operations platform. Where does EZee fit?",
    a: "EZee runs above it. FranConnect, Naranga, ServiceTitan and the rest hold your records. EZee reads them, acts on them, and gives your operators one place to ask a question and get work done. Nothing migrates.",
    link: { label: "See the full comparison", href: "/why-ezeeassist" },
  },
  {
    q: "Will franchisees actually use it?",
    a: "They reach it in the channels they already work in, at the hours they actually work. They can also build their own reports and tools inside the guardrails HQ sets. Owners tend to adopt a tool they can shape for their own location.",
    link: { label: "See adoption evidence", href: "#proof" },
  },
  {
    q: "How long does implementation take?",
    a: "About ten weeks. Six weeks to connect your systems and define escalation logic, two weeks for your HQ team to go live, and two weeks to onboard locations. Support continues after launch, including building new workflows with you.",
  },
  {
    q: "What happens when EZee does not know the answer?",
    a: "Confidence is scored on every question. Below the threshold it does not guess. The question becomes a ticket carrying the full conversation, the sources it checked, and the location context, routed to the person who owns that area.",
  },
  {
    q: "Is our data used to train AI models?",
    a: "No. Each customer runs on dedicated infrastructure, data is encrypted in transit and at rest, and your content is never used to train a third-party model. EZee is model-agnostic, so you can change the underlying model without rebuilding your workflows.",
  },
  {
    q: "How is it priced?",
    a: "Per location, per month, with volume discounts as your network grows. Every rollout includes unlimited users at each location, corporate access, guided onboarding, and integration setup. We will walk through the numbers on a call.",
  },
];

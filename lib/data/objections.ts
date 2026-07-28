// Section 14 content. Single source of truth for both the visible
// accordion and the FAQPage JSON-LD, so the schema always matches
// what renders.

export interface Objection {
  q: string;
  a: string;
  /** Optional trailing link rendered under the answer. */
  link?: { label: string; href: string };
}

// TODO: Build the dedicated comparison pages before linking them. Objection 2 currently
// points at /why-ezeeassist, the closest existing page, rather than an empty /compare.

export const objections: Objection[] = [
  {
    q: "Why not just use ChatGPT?",
    a: "You already tried that. It does not know your playbooks, your permissions, or which location is asking, and nothing it did was logged. That is how the sprawl started in the first place.",
  },
  {
    q: "We already have a franchise ops platform.",
    a: "This runs above it. FranConnect, Naranga, and the rest hold your records. EZee reads them, acts on them, and puts an interface in front of them that your operators actually use. Nothing gets replaced.",
    link: { label: "See the full comparison", href: "/why-ezeeassist" },
  },
  {
    q: "Will franchisees actually use it?",
    a: "They reach it in the channels they already use, at the hours they actually work, and they can build their own tools inside your guardrails. People use systems they can build in.",
    link: { label: "See adoption evidence", href: "#proof" },
  },
];

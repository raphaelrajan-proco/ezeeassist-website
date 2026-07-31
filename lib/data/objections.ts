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
    a: "A general chatbot does not know your playbooks, your permissions, or which location is asking, and it keeps no record of what it answers. Operators using it on their own is where the sprawl on this page comes from.",
  },
  {
    q: "We already have a franchise ops platform.",
    a: "EZee runs as a layer on top of your ops platform. FranConnect, Naranga, and the rest continue to hold your records. EZee reads them, acts on them, and gives your operators an interface they will open every day. Your existing systems all stay in place.",
    link: { label: "See the full comparison", href: "/why-ezeeassist" },
  },
  {
    q: "Will franchisees actually use it?",
    a: "They reach it in the channels they already use, at the hours they actually work, and they can build their own tools inside your guardrails. Being able to build their own tools keeps them using it.",
    link: { label: "See adoption evidence", href: "#proof" },
  },
];

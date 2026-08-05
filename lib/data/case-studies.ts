/**
 * Case study registry.
 *
 * One record per story, feeding both the landing cards and the templated
 * detail route at `/case-studies/[slug]`. Adding a story is an entry here
 * plus a committed logo file; no new route, no new component.
 *
 * **Logos are committed files, never a CDN and never a redrawn wordmark.**
 * They live in `public/logos/stories/` and are the artwork supplied with
 * the design handoff, byte for byte. A missing logo is a blocker, not
 * something to improvise around.
 *
 * The brand panels stay light in **both** themes, because all three marks
 * are dark-on-light artwork and invert into mud. That is why `ink` and
 * `inkMuted` below are fixed hex rather than tokens: they sit on the
 * panel, not on the page.
 *
 * Copy is approved. WSI's is the handoff's, verbatim. Deka Lash's and
 * DivaDance's is carried forward from the pages this route replaces, with
 * em-dashes resolved to commas and periods per the house copy rule.
 *
 * **Numbers are never invented here.** Where a fact was not supplied, the
 * field is simply absent and the UI omits the row: DivaDance has no
 * approved quote, neither it nor Deka Lash has a confirmed engagement
 * year, and only WSI's channels were documented. See HANDOFF.md.
 */

export type ResultRow = { label: string; value: string };
export type MetaRow = { label: string; value: string };

export type CaseStudy = {
  slug: string;
  /** Brand name as written in prose. */
  brand: string;
  logo: { src: string; alt: string };
  /** Panel tint. Light in both themes; the logos are dark-on-light. */
  panel: string;
  /** Logo height in px on the landing card, the detail rail, and the
      "More stories" chip. The three marks have very different aspect
      ratios, so one height cannot serve all of them. */
  logoH: { card: number; rail: number; chip: number };

  /* ── Landing card ── */
  kicker: string;
  headline: string;
  summary: string;
  cardStats: [ResultRow, ResultRow];

  /* ── Detail hero ── */
  pill: string;
  /** Split so the closing clause can take the accent colour. */
  h1: { lead: string; accent: string };
  keyResults: [ResultRow, ResultRow, ResultRow];

  /* ── Detail body ── */
  meta: MetaRow[];
  quote?: { text: string; name: string; role: string };
  challenge: string[];
  solution: string[];
  /** Only WSI's delivery channels were documented. Omitted elsewhere
      rather than guessed. */
  channels?: string[];
  results: string;
  resultStats: [ResultRow, ResultRow, ResultRow];

  /** SEO. */
  title: string;
  description: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "wsi",
    brand: "WSI",
    logo: { src: "/logos/stories/wsi.svg", alt: "WSI" },
    panel: "#EAF2FB",
    logoH: { card: 54, rail: 58, chip: 22 },

    kicker: "Questions piled up overnight, in every time zone",
    headline: "67% fewer repetitive questions",
    summary:
      "A global network of digital marketing consultants, spread across countries and time zones. Every morning started with a backlog of questions that already had documented answers. The knowledge existed; it just was not reachable at the hour anyone needed it.",
    cardStats: [
      { value: "Global", label: "network served" },
      { value: "24/7", label: "across time zones" },
    ],

    pill: "Global support scale",
    h1: {
      lead: "How the world's largest network of digital marketing consultants took 67% of repetitive questions off its human team,",
      accent: "across every language and time zone it operates in.",
    },
    keyResults: [
      { label: "Reduction in repetitive questions", value: "67%" },
      { label: "Franchise network served", value: "Global" },
      { label: "Support across time zones", value: "24/7" },
    ],

    meta: [
      { label: "Client", value: "WSI Global" },
      { label: "Network", value: "Digital marketing consultants" },
      { label: "Year", value: "2024" },
      { label: "Focus", value: "Global support scale" },
    ],
    quote: {
      text: "EZee Assist is much more than just a chatbot. It truly made universal search possible at WSI, levelling the playing field for our franchisees across geographies and languages. With a hands-on and effective implementation process, the EZee team have enabled strong adoption from the system, making the virtual AI agent a game-changer.",
      name: "Jeffrey Grant",
      role: "Systems Manager, WSI World",
    },
    challenge: [
      "WSI operates a global franchise network of digital marketing consultants spanning multiple countries and time zones. Their support team was fielding hundreds of repetitive operational questions from franchisees, about tools, processes, client management, and brand guidelines. With franchisees in different time zones, questions would pile up overnight and create a backlog every morning.",
      "The support team was spending the majority of their time on questions that had clear, documented answers, leaving little bandwidth for strategic support.",
    ],
    solution: [
      "WSI centralized their entire knowledge base, including operating manuals, training materials, marketing playbooks, and SOPs, into a single governed engine. Franchisees across the globe could now ask questions in natural language through their preferred channels and get instant, accurate answers sourced directly from WSI's brand-approved documentation.",
      "For questions without a confident answer, smart ticketing routed them to the right support team member with full context. Nothing disappeared into a queue.",
    ],
    channels: ["SMS + WhatsApp", "Email", "Web app", "WordPress embed"],
    results:
      "Within months of deployment, WSI saw a 67% reduction in repetitive support questions reaching their human team. Franchisees in every time zone now had 24/7 access to accurate brand knowledge, with no waiting for the support team to come online. The team was freed to focus on coaching, relationship building, and strategic initiatives instead of answering the same questions repeatedly.",
    resultStats: [
      { value: "67%", label: "fewer repetitive questions reaching the team" },
      { value: "24/7", label: "answers in every time zone, no morning backlog" },
      { value: "One", label: "knowledge base across every language and market" },
    ],

    title: "WSI: 67% fewer repetitive questions",
    description:
      "How WSI, the world's largest network of digital marketing consultants, took 67% of repetitive questions off its human team with EZee Assist.",
  },

  {
    slug: "dekalash",
    brand: "Deka Lash",
    logo: { src: "/logos/stories/dekalash.png", alt: "Deka Lash" },
    panel: "#FBEDF2",
    logoH: { card: 38, rail: 42, chip: 22 },

    kicker: "A technology cutover across 400 locations",
    headline: "93% resolved without a person",
    summary:
      "A cutover is the worst possible week to be short-staffed on support, because every location has the same question at the same time. Franchisees started telling each other to use it, which is the adoption number nobody plans for.",
    cardStats: [
      { value: "430+", label: "questions deflected" },
      { value: "< 30s", label: "average response" },
    ],

    pill: "Cutover support",
    h1: {
      lead: "How Deka Lash carried 400 locations through a technology cutover with",
      accent: "93% of franchisee questions resolved without a person.",
    },
    keyResults: [
      { label: "Resolved without a person", value: "93%" },
      { label: "Questions deflected", value: "430+" },
      { label: "Average response time", value: "< 30s" },
    ],

    meta: [
      { label: "Client", value: "Deka Lash" },
      { label: "Network", value: "Beauty studios, North America" },
      { label: "Focus", value: "Cutover support" },
    ],
    quote: {
      text: "AI is now an expectation in franchisee support. With EZee Assist, our owners get accurate, brand-specific answers 24/7, not generic internet advice, while our team focuses on bigger initiatives.",
      name: "Troy McCullen",
      role: "Vice President of Operations, Deka Lash",
    },
    challenge: [
      "Deka Lash is a rapidly growing beauty franchise with locations across North America. Their franchisees regularly had operational questions about scheduling, procedures, vendor contacts, marketing materials, and brand standards.",
      "The support team, while dedicated, was overwhelmed by the volume of repetitive inquiries. Leadership recognized that AI was becoming an expectation in franchisee support rather than a nice-to-have.",
    ],
    solution: [
      "Deka Lash implemented EZee Assist, internally named Alpha, as their franchisees' first line of support. The platform ingested Deka Lash's complete operational knowledge base and made it instantly accessible through the channels franchisees already used.",
      "The rollout went quickly, because using it required no change in behaviour. That mattered most during the cutover week, when every location had the same question at the same time.",
    ],
    results:
      "EZee Assist reached a 93% resolution rate, meaning the vast majority of franchisee questions were answered instantly without any human involvement. Over 430 questions were deflected from the support team. Franchisees embraced the technology so quickly that they began telling each other to use Alpha, which is peer adoption with no marketing push behind it.",
    resultStats: [
      { value: "93%", label: "of questions resolved without a person" },
      { value: "430+", label: "questions deflected from the support team" },
      { value: "< 30s", label: "average response time" },
    ],

    title: "Deka Lash: 93% resolved without a person",
    description:
      "How Deka Lash carried 400 locations through a technology cutover with 93% of franchisee questions resolved without a person.",
  },

  {
    slug: "divadance",
    brand: "DivaDance",
    logo: { src: "/logos/stories/divadance.png", alt: "DivaDance" },
    panel: "#FDEFF5",
    logoH: { card: 84, rail: 76, chip: 46 },

    kicker: "A small team, and a network that asks at nine at night",
    headline: "2,600+ queries answered in six months",
    summary:
      "Scheduling, marketing, music licensing, event coordination. A passionate network asks a lot of questions, and a small team answering them one at a time is a ceiling on how fast the brand can grow.",
    cardStats: [
      { value: "650+", label: "hours returned" },
      { value: "6 months", label: "to get there" },
    ],

    pill: "Real-time support",
    h1: {
      lead: "How DivaDance answered 2,600+ franchisee questions in six months and",
      accent: "returned 650+ hours to a small support team.",
    },
    keyResults: [
      { label: "Queries answered", value: "2,600+" },
      { label: "Support hours returned", value: "650+" },
      { label: "Time to get there", value: "6 months" },
    ],

    meta: [
      { label: "Client", value: "DivaDance" },
      { label: "Network", value: "Dance studios" },
      { label: "Focus", value: "Real-time support" },
    ],
    challenge: [
      "DivaDance is a high-energy dance franchise with a passionate community of franchisees. As the brand scaled, the operational support burden grew with it.",
      "Franchisees needed fast answers on class scheduling, marketing, music licensing, event coordination, and day-to-day studio operations. The small but mighty support team could not keep up with the volume, and every hour spent on repetitive questions was an hour not spent growing the brand.",
    ],
    solution: [
      "DivaDance deployed EZee Assist, internally branded CoCo, to provide instant support to their entire franchise network. The platform was connected to DivaDance's full knowledge ecosystem and made available through franchisees' preferred communication channels.",
      "The goal was simple: let the system handle the routine so the team can focus on the extraordinary.",
    ],
    results:
      "In the first six months, EZee Assist answered over 2,600 franchisee queries, saving an estimated 650+ hours of support team time. Franchisees got faster answers and the support team got breathing room. Leadership gained visibility into what the network was actually asking about, which surfaced content gaps and operational patterns they never had access to before.",
    resultStats: [
      { value: "2,600+", label: "franchisee queries answered in six months" },
      { value: "650+", label: "hours of support time returned to the team" },
      { value: "6 months", label: "to reach both of those numbers" },
    ],

    title: "DivaDance: 2,600+ queries answered in six months",
    description:
      "How DivaDance answered 2,600+ franchisee queries in six months and returned 650+ hours to a small support team with EZee Assist.",
  },
];

export const bySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);

/** The other stories, in registry order. Used by "More stories". */
export const siblings = (slug: string) => CASE_STUDIES.filter((c) => c.slug !== slug);

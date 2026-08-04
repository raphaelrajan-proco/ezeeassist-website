import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ezeeassist.com";

// Using a fixed recent date for static pages; swap for actual last-edited
// dates once Sanity CMS is connected and can supply real timestamps.
const NOW = new Date("2026-04-18");

type Route = {
  url: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

const routes: Route[] = [
  // ── Tier 1: Homepage ──────────────────────────────────────
  { url: "/",                                               priority: 1.0,  changeFrequency: "weekly"  },

  // ── Tier 2: Core product & high-intent pages ──────────────
  /* Only routes that actually render belong here. `/platform`,
     `/platform/ai-agent`, `/platform/ticketing` and `/platform/insights`
     were listed while next.config.ts redirected all four away, and
     `/solution/agents` was a second mount of the legacy workflows content
     that no longer exists. Every URL below is a real page; check
     next.config.ts before adding another. */
  { url: "/platform/answers",                               priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/reporting",                             priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/apps",                                  priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/workflows",                             priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/compliance",                            priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/ticketing",                             priority: 0.85, changeFrequency: "monthly" },
  { url: "/platform/integrations",                          priority: 0.85, changeFrequency: "monthly" },

  // ── Tier 2: Industries ────────────────────────────────────
  { url: "/industries",                                     priority: 0.9,  changeFrequency: "monthly" },
  { url: "/industries/franchising",                         priority: 0.9,  changeFrequency: "monthly" },
  { url: "/industries/franchising/franchisors",             priority: 0.85, changeFrequency: "monthly" },
  { url: "/industries/franchising/multi-unit-franchisees",  priority: 0.80, changeFrequency: "monthly" },
  { url: "/industries/multi-location",                      priority: 0.80, changeFrequency: "monthly" },
  { url: "/industries/universities",                        priority: 0.75, changeFrequency: "monthly" },

  // ── Tier 2: Case studies ──────────────────────────────────
  { url: "/case-studies",                                   priority: 0.85, changeFrequency: "monthly" },
  { url: "/case-studies/wsi",                               priority: 0.80, changeFrequency: "monthly" },
  { url: "/case-studies/dekalash",                          priority: 0.80, changeFrequency: "monthly" },
  { url: "/case-studies/divadance",                         priority: 0.80, changeFrequency: "monthly" },

  // ── Tier 2: High-intent conversion pages ─────────────────
  { url: "/speak-to-an-expert",                             priority: 0.90, changeFrequency: "monthly" },
  { url: "/contact",                                        priority: 0.90, changeFrequency: "monthly" },
  { url: "/roi-calculator",                                 priority: 0.80, changeFrequency: "monthly" },
  { url: "/why-ezeeassist",                                 priority: 0.80, changeFrequency: "monthly" },

  // ── Tier 3: Blog ──────────────────────────────────────────
  { url: "/blog",                                           priority: 0.80, changeFrequency: "weekly"  },
  { url: "/blog/how-franchise-brands-cut-support-tickets-by-67-percent",      priority: 0.70, changeFrequency: "monthly" },
  { url: "/blog/why-generic-ai-fails-franchise-networks",                      priority: 0.70, changeFrequency: "monthly" },
  { url: "/blog/onboarding-new-franchisees-without-burning-out-your-team",    priority: 0.70, changeFrequency: "monthly" },

  // ── Tier 3: Company pages ─────────────────────────────────
  { url: "/about",                                          priority: 0.70, changeFrequency: "monthly" },
  { url: "/security",                                       priority: 0.75, changeFrequency: "monthly" },
  { url: "/careers",                                        priority: 0.65, changeFrequency: "weekly"  },
  { url: "/changelog",                                      priority: 0.55, changeFrequency: "weekly"  },

  // ── Tier 4: Legal & utility pages ─────────────────────────
  { url: "/privacy",                                        priority: 0.30, changeFrequency: "yearly"  },
  { url: "/accessibility",                                  priority: 0.30, changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: NOW,
    changeFrequency,
    priority,
  }));
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ezeeassist.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    // Core
    { url: "/",                                           priority: 1.0,  changeFrequency: "weekly"  as const },
    { url: "/platform",                                   priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/platform/ai-agent",                          priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/platform/ticketing",                         priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/platform/insights",                          priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/platform/workflows",                         priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/platform/integrations",                      priority: 0.85, changeFrequency: "monthly" as const },
    // Industries
    { url: "/industries",                                 priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/industries/franchising",                     priority: 0.9,  changeFrequency: "monthly" as const },
    { url: "/industries/franchising/franchisors",         priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/industries/franchising/multi-unit-franchisees", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries/multi-location",                  priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/industries/universities",                    priority: 0.75, changeFrequency: "monthly" as const },
    // Case studies
    { url: "/case-studies",                               priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/case-studies/wsi",                           priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/case-studies/dekalash",                      priority: 0.8,  changeFrequency: "monthly" as const },
    { url: "/case-studies/divadance",                     priority: 0.8,  changeFrequency: "monthly" as const },
    // Blog
    { url: "/blog",                                       priority: 0.8,  changeFrequency: "weekly"  as const },
    { url: "/blog/how-franchise-brands-cut-support-tickets-by-67-percent", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog/why-generic-ai-fails-franchise-networks",               priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog/onboarding-new-franchisees-without-burning-out-your-team", priority: 0.7, changeFrequency: "monthly" as const },
    // Company
    { url: "/about",                                      priority: 0.7,  changeFrequency: "monthly" as const },
    { url: "/security",                                   priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/careers",                                    priority: 0.65, changeFrequency: "weekly"  as const },
    { url: "/contact",                                    priority: 0.8,  changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

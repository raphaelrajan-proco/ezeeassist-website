import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General crawlers
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      // AI answer engine crawlers — explicitly allowed for AEO
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai",    allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "cohere-ai",       allow: "/" },
      { userAgent: "FacebookBot",     allow: "/" },
    ],
    sitemap: "https://www.ezeeassist.com/sitemap.xml",
    host: "https://www.ezeeassist.com",
  };
}

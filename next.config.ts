import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Consistent URL canonicalization — no trailing slashes
  trailingSlash: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  async redirects() {
    return [
      /* The /platform tree was retired wholesale into /solution. Routes
         coming back as real pages have their redirects removed and the
         legacy /solution twins now point at them instead. Everything
         still pointing into /solution is a page that has not been
         rebuilt yet; do not add a /platform nav item without checking
         whether it is redirected away from here.

         `/platform/workflows` was in this list until the Workflows page
         shipped, which meant a real page sat unreachable behind a 308 to
         /solution/agents while the nav, the footer and two other
         Platform pages linked to it. If you add a redirect for a path
         that has a page, that page stops existing. */
      { source: "/platform",               destination: "/solution",               permanent: true },
      { source: "/platform/ai-agent",      destination: "/platform/answers",       permanent: true },
      { source: "/platform/insights",      destination: "/solution",               permanent: true },
      { source: "/solution/integrations",  destination: "/platform/integrations",  permanent: true },
      { source: "/solution/ticketing",     destination: "/platform/ticketing",     permanent: true },
      { source: "/platform/automations",   destination: "/platform/workflows",     permanent: true },
      /* The HQ team page became /solutions/leadership. */
      { source: "/industries/franchising/franchisors", destination: "/solutions/leadership", permanent: true },
      /* /solution/agents was a second mount of the legacy workflows
         content and went with it. Both legacy twins now point forward at
         the rebuilt page rather than at each other. */
      { source: "/solution/agents",        destination: "/platform/workflows",     permanent: true },
      { source: "/solution/workflows",     destination: "/platform/workflows",     permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Clickjacking protection
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer sent on same-origin + origin-only on cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Allow browser DNS prefetching for performance
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Permissions policy — lock down sensitive APIs
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

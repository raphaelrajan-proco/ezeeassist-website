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
      /* The /platform tree was retired wholesale into /solution. Two of
         those routes are coming back as real pages, so their redirects
         are gone and the legacy /solution twins now point at them
         instead. Everything still pointing into /solution is a page
         that has not been rebuilt yet; do not add a /platform nav item
         without checking whether it is redirected away from here. */
      { source: "/platform",               destination: "/solution",               permanent: true },
      { source: "/platform/ai-agent",      destination: "/platform/answers",       permanent: true },
      { source: "/platform/insights",      destination: "/solution",               permanent: true },
      { source: "/solution/integrations",  destination: "/platform/integrations",  permanent: true },
      { source: "/platform/ticketing",     destination: "/solution/ticketing",     permanent: true },
      { source: "/platform/workflows",     destination: "/solution/agents",        permanent: true },
      { source: "/solution/workflows",     destination: "/solution/agents",        permanent: true },
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

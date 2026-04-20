import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Consistent URL canonicalization — no trailing slashes
  trailingSlash: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
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

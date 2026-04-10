"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasConsentedToCookies, onConsentChange } from "@/lib/cookie-consent";

// Get from: analytics.google.com → Admin → Data Streams → Measurement ID (format: G-XXXXXXXXXX)
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check immediately on mount
    if (hasConsentedToCookies()) setConsented(true);
    // Re-check whenever consent changes
    const cleanup = onConsentChange(() => {
      if (hasConsentedToCookies()) setConsented(true);
    });
    return cleanup;
  }, []);

  if (!GA_ID || !consented) return null;

  return (
    <>
      <Script
        id="ga-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `,
        }}
      />
    </>
  );
}

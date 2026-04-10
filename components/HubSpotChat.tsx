"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasConsentedToCookies, onConsentChange } from "@/lib/cookie-consent";

// Get from: HubSpot → Settings → Tracking & Analytics → Tracking Code
const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

export default function HubSpotChat() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasConsentedToCookies()) setConsented(true);
    const cleanup = onConsentChange(() => {
      if (hasConsentedToCookies()) setConsented(true);
    });
    return cleanup;
  }, []);

  if (!PORTAL_ID || !consented) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${PORTAL_ID}.js`}
      strategy="lazyOnload"
    />
  );
}

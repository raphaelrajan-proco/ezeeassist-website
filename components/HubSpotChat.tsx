"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasConsentedToCookies, onConsentChange } from "@/lib/cookie-consent";

// Get from: HubSpot → Settings → Tracking & Analytics → Tracking Code
const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

/* ── Flip to true to bring the HubSpot chat widget back ───────
   Paused for the MVP launch and wanted back within days, so this is a flag
   rather than an unmount in AnalyticsProvider: the cookie-consent wiring
   below is the part worth keeping intact, and it is easy to get wrong on
   the way back in. With this off the tracking script never loads, so no
   HubSpot cookie is set and the widget cannot appear.

   One caveat worth knowing before launch: `hs-script-loader` is HubSpot's
   whole tracking tag, not a chat-only bundle, so turning it off also stops
   HubSpot's own pageview and contact tracking. Google Analytics, Clarity
   and Snitcher are separate components and unaffected, as are HubSpot
   forms, the meetings embed on /speak-to-an-expert, and the
   workflow-generator lead endpoint. If HubSpot analytics is wanted while
   the widget stays hidden, the fix is to load this script and suppress the
   widget through HubSpot's own chat settings instead of this flag. */
const SHOW_HUBSPOT_CHAT = false;

export default function HubSpotChat() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasConsentedToCookies()) setConsented(true);
    const cleanup = onConsentChange(() => {
      if (hasConsentedToCookies()) setConsented(true);
    });
    return cleanup;
  }, []);

  if (!SHOW_HUBSPOT_CHAT || !PORTAL_ID || !consented) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${PORTAL_ID}.js`}
      strategy="lazyOnload"
    />
  );
}

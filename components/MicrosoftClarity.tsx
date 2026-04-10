"use client";

import { useEffect, useState } from "react";
import { hasConsentedToCookies, onConsentChange } from "@/lib/cookie-consent";

// Get from: clarity.microsoft.com → Settings → Overview → Project ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function MicrosoftClarity() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasConsentedToCookies()) setConsented(true);
    const cleanup = onConsentChange(() => {
      if (hasConsentedToCookies()) setConsented(true);
    });
    return cleanup;
  }, []);

  useEffect(() => {
    if (!CLARITY_ID || !consented) return;
    // Inject Clarity script dynamically after consent
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");
    `;
    document.head.appendChild(script);
  }, [consented]);

  return null;
}

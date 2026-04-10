"use client";

import { useEffect, useState } from "react";
import { hasConsentedToCookies, onConsentChange } from "@/lib/cookie-consent";

// Get from: Snitcher dashboard → Settings → Tracking Code
const SNITCHER_ID = process.env.NEXT_PUBLIC_SNITCHER_TRACKING_ID;

export default function SnitcherTracking() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (hasConsentedToCookies()) setConsented(true);
    const cleanup = onConsentChange(() => {
      if (hasConsentedToCookies()) setConsented(true);
    });
    return cleanup;
  }, []);

  useEffect(() => {
    if (!SNITCHER_ID || !consented) return;
    // Inject Snitcher script dynamically after consent
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      !(function (s, n, i, t, c, h) {
        s.SnitchObject = i;
        s[i] || (s[i] = function () {
          (s[i].q = s[i].q || []).push(arguments);
        });
        s[i].l = +new Date();
        c = n.createElement(t);
        h = n.getElementsByTagName(t)[0];
        c.src = "//snid.snitcher.com/" + "${SNITCHER_ID}" + ".js";
        h.parentNode.insertBefore(c, h);
      })(window, document, "snid", "script");
      snid("verify", "${SNITCHER_ID}");
    `;
    document.head.appendChild(script);
  }, [consented]);

  return null;
}

"use client";

import Router from "next/router";
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

  const visitRatio = 0.5;
  const visitObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio < visitRatio) {
          continue;
        }

        const element = entry.target;
        if (element.hasAttribute('data-visit')) {
          continue;
        }

        element.setAttribute('data-visit', entry.time);

        const eventInfo = {
          url: document.URL,
        };
        for (const attr of element.attributes) {
          if (attr.name === 'id') eventInfo['id'] = attr.value;

          if (!attr.name.startsWith('data-')) continue;
          eventInfo[attr.name.replace(/^data-/, '')] = attr.value;
        }

        console.log(entry, entry.intersectionRatio, eventInfo);
        const eventName = (
          eventInfo['id']
            ? ('Viewed ' + eventInfo['id'])
            : 'Element Viewed'
        );
        Snitcher?.track(eventName, eventInfo);
      }
    },
    {
      threshold: visitRatio,
    }
  );

  useEffect(() => {
    "use strict";
    Router.events.on("routeChangeComplete", (path) => {
      console.log(`Route change complete.`);
      setTimeout(() => {
        for (const section of document.getElementsByTagName("section")) {
          visitObserver.observe(section)
        }
      }, 0);
    });

    return () => {
      Router.events.off('routeChangeComplete', 0);
    }
  }, [Router])

  return null;
}

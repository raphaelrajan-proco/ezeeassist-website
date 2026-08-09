// components/SnitcherTracker.tsx
'use client';

import Script from 'next/script';

export function SnitcherTracker() {
  return (
    <Script
      id="snitcher-tracker"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src="https://"+e.cdn+"/releases/latest/radar.min.js";var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({
            "apiEndpoint": "radar.snitcher.com",
            "cdn": "cdn.snitcher.com",
            "namespace": "Snitcher",
            "profileId": "8433867",
            "waitForConsent": true,
          });
        `,
      }}
    />
  );
}

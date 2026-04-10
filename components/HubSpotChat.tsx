"use client";

import Script from "next/script";

// To find your HubSpot Portal ID:
// Go to HubSpot → Settings → Tracking & Analytics → Tracking Code
// The portal ID is the number in the script src URL
const PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? "YOUR_HUBSPOT_PORTAL_ID";
// TODO: Replace YOUR_HUBSPOT_PORTAL_ID with actual HubSpot portal ID
// Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID in .env.local and Vercel env variables

export default function HubSpotChat() {
  if (!process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`//js.hs-scripts.com/${PORTAL_ID}.js`}
      strategy="lazyOnload"
    />
  );
}

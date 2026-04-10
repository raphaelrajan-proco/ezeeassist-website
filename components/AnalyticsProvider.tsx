"use client";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import SnitcherTracking from "@/components/SnitcherTracking";
import HubSpotChat from "@/components/HubSpotChat";

/**
 * Centralised analytics wrapper.
 * All scripts are consent-gated — nothing fires until the user clicks "Accept"
 * in the cookie consent banner.
 *
 * To activate each service, add the corresponding env variable in Vercel:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID      → Google Analytics 4
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID     → Microsoft Clarity (heatmaps + recordings)
 *   NEXT_PUBLIC_SNITCHER_TRACKING_ID   → Snitcher (visitor deanonymization)
 *   NEXT_PUBLIC_HUBSPOT_PORTAL_ID      → HubSpot chat widget
 */
export default function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <SnitcherTracking />
      <HubSpotChat />
    </>
  );
}

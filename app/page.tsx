import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GrowthHero from "@/components/growth/Hero";
import GrowthTrustStrip from "@/components/growth/TrustStrip";
import CoachsWeek from "@/components/growth/CoachsWeek";
import TheShift from "@/components/growth/TheShift";
import CapabilityBento from "@/components/growth/CapabilityBento";
import TwoAudiences from "@/components/growth/TwoAudiences";

export const metadata: Metadata = {
  title: "EZee Assist — Turn Your Franchise Playbooks Into an AI Team",
  description:
    "Scale coaching and support across every location without adding headcount. EZee connects your knowledge, performance data, and systems to drive franchisee growth. 60+ brands, 4,500+ locations.",
  alternates: { canonical: "/" },
  keywords: [
    "franchise coaching AI",
    "franchise growth platform",
    "multi-location AI coaching",
    "franchise playbook automation",
    "franchisee performance AI",
    "franchise support automation",
  ],
};

// ── Canonical positioning definition (AEO / schema) ──
const GROWTH_DEFINITION =
  "EZee Assist is the execution layer for franchise networks. It connects a brand's knowledge (SOPs, playbooks, training, brand standards), performance data (sales vs target, reviews, labor, retention, compliance), and systems (POS, CRM, ERP, LMS, accounting) so operators get instant answers grounded in approved sources, field coaches walk into every conversation already prepared, compliance is checked continuously across locations, and recurring work runs on a schedule or a trigger. HQ publishes the standards and sets what runs without a human. Franchisees ask, run approved workflows, and build their own tools inside those guardrails. Available across SMS, WhatsApp, Slack, Teams, Google Chat, email, web, and mobile. Used by 60+ franchise brands across 4,500+ locations.";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EZee Assist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: GROWTH_DEFINITION,
  offers: {
    "@type": "Offer",
    price: "60",
    priceCurrency: "USD",
    description: "Per location, per month.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "60",
  },
};

export default function Home() {
  return (
    <div className="theme-editorial">
      <JsonLd data={softwareSchema} />
      {/* 02 */} <AnnouncementBar />
      {/* 01 */} <Navbar />
      {/* AEO: machine-readable positioning definition — do not remove */}
      <p className="sr-only">{GROWTH_DEFINITION}</p>
      <main className="flex flex-1 flex-col">
        {/* 03 */} <GrowthHero />
        {/* 04 */} <GrowthTrustStrip />
        {/* 05 */} <CoachsWeek />
        {/* 06 */} <TheShift />
        {/* 07 */} <CapabilityBento />
        {/* 08 */} <TwoAudiences />
      </main>
      <Footer />
    </div>
  );
}

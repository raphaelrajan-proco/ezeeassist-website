import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GrowthHero from "@/components/growth/Hero";
import GrowthTrustStrip from "@/components/growth/TrustStrip";
import TheGap from "@/components/growth/TheGap";

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
  "EZee Assist turns a franchise brand's playbooks, performance data, and systems into an AI team that scales coaching and support across every location without adding headcount. It connects your knowledge (SOPs, training, brand standards), your performance data (sales vs target, reviews, labor, retention, compliance), and your systems (POS, CRM, ERP, LMS, accounting) so operators get instant brand-specific answers, field coaches walk into every conversation already prepared with live performance signals, and recurring work runs itself. Available across SMS, WhatsApp, Slack, Teams, Google Chat, email, web, and mobile. Used by 60+ franchise brands across 4,500+ locations.";

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
      <Navbar />
      {/* AEO: machine-readable positioning definition — do not remove */}
      <p className="sr-only">{GROWTH_DEFINITION}</p>
      <main className="flex flex-1 flex-col">
        {/* 1 */} <GrowthHero />
        {/* 2 */} <GrowthTrustStrip />
        {/* 3 */} <TheGap />
      </main>
      <Footer />
    </div>
  );
}

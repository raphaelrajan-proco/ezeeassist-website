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
import ControlPlane from "@/components/growth/ControlPlane";
import TheHandoff from "@/components/growth/TheHandoff";
import OutcomesBand from "@/components/growth/OutcomesBand";
import CustomerProof from "@/components/growth/CustomerProof";
import Integrations from "@/components/growth/Integrations";
import Objections from "@/components/growth/Objections";
import Resources from "@/components/growth/Resources";
import FinalCTA from "@/components/growth/FinalCTA";
import { objections } from "@/lib/data/objections";

export const metadata: Metadata = {
  title: "EZee Assist — The Execution Layer for Franchise Networks",
  description:
    "Your playbooks, running at every location. EZee connects your knowledge, performance data, and systems so coaches guide better and mechanical work runs itself. 60+ brands, 4,500+ locations.",
  alternates: { canonical: "/" },
  keywords: [
    "franchise execution layer",
    "franchise AI platform",
    "multi-location AI coaching",
    "franchise compliance automation",
    "franchisee support AI",
    "franchise ops governance",
  ],
  openGraph: {
    title: "EZee Assist — The Execution Layer for Franchise Networks",
    description:
      "Your playbooks, running at every location. Coaches guide better, mechanical work runs itself, and locations execute against the standard you set.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist, the execution layer for franchise networks",
      },
    ],
  },
  twitter: {
    title: "EZee Assist — The Execution Layer for Franchise Networks",
    description:
      "Your playbooks, running at every location. Coaches guide better, mechanical work runs itself, and locations execute against the standard you set.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist, the execution layer for franchise networks",
      },
    ],
  },
};

// ── Canonical positioning definition (AEO / schema) ──
const GROWTH_DEFINITION =
  "EZee Assist is the execution layer for franchise networks. It connects a brand's knowledge (SOPs, playbooks, training, brand standards), performance data (sales vs target, reviews, labor, retention, compliance), and systems (POS, CRM, ERP, LMS, accounting) so operators get answers grounded in approved sources, field coaches walk into every conversation already prepared, locations are checked continuously against the standard, and recurring work runs on a schedule or a trigger. A control plane sets one policy set, one activity log, and one permission model across the network, so HQ decides what runs without a human. Franchisees ask, run approved workflows, and build their own tools inside those guardrails. When confidence is low the question becomes a ticket carrying the full conversation, the sources checked, and the location context. Available across SMS, WhatsApp, Slack, Teams, Google Chat, email, web, and mobile. Used by 60+ franchise brands across 4,500+ locations.";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EZee Assist",
  url: "https://www.ezeeassist.com",
  logo: "https://www.ezeeassist.com/logo.svg",
  description:
    "The execution layer for franchise networks. EZee Assist connects a brand's knowledge, performance data, and systems so coaches guide better and mechanical work runs itself across every location.",
  sameAs: [
    "https://www.linkedin.com/company/ez-assist",
    "https://twitter.com/ezeeassist",
    "https://www.facebook.com/ezeeassist",
  ],
};

// Built from the same array section 14 renders, so exactly one FAQPage
// schema exists and it always matches the visible accordion.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: objections.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <div className="theme-editorial">
      <JsonLd data={softwareSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
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
        {/* 09 */} <ControlPlane />
        {/* 10 */} <TheHandoff />
        {/* 11 */} <OutcomesBand />
        {/* 12 */} <CustomerProof />
        {/* 13 */} <Integrations />
        {/* 14 */} <Objections />
        {/* 15 */} <Resources />
        {/* 16 */} <FinalCTA />
      </main>
      {/* 17 */}
      <Footer />
    </div>
  );
}

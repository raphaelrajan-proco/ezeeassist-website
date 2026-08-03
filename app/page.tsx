import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GrowthHero from "@/components/growth/Hero";
import CoachsWeek from "@/components/growth/CoachsWeek";
import TheSystem from "@/components/TheSystem";
import Capabilities from "@/components/growth/Capabilities";
import AlwaysOn from "@/components/growth/AlwaysOn";
import ImpactStats from "@/components/growth/ImpactStats";
import CustomerProof from "@/components/growth/CustomerProof";
import TrustAndControl from "@/components/growth/TrustAndControl";
import Objections from "@/components/growth/Objections";
import FinalCTA from "@/components/growth/FinalCTA";
import { objections } from "@/lib/data/objections";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

export const metadata: Metadata = {
  title: "EZee Assist - Franchise AI Operating System",
  description: `Take the low-value work off your coaches and amplify their expertise across every location. Trusted by ${NETWORK_SCALE.brands} franchise brands across ${NETWORK_SCALE.locations} locations.`,
  alternates: { canonical: "/" },
  openGraph: {
    /* Next replaces the layout's openGraph object wholesale rather than
       merging it, so siteName and type have to be repeated here or the
       share card loses them. */
    type: "website",
    siteName: "EZee Assist",
    title: "EZee Assist - Franchise AI Operating System",
    description:
      "Your playbooks, running at every location. Coaching stops being rationed, and the bottom of your network moves like the top.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist - Franchise AI Operating System",
      },
    ],
  },
  twitter: {
    title: "EZee Assist - Franchise AI Operating System",
    description:
      "Your playbooks, running at every location. Coaching stops being rationed, and the bottom of your network moves like the top.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist - Franchise AI Operating System",
      },
    ],
  },
};

// ── Canonical positioning definition (AEO / schema) ──
const GROWTH_DEFINITION =
  `EZee Assist is the execution layer for franchise networks. It connects a brand's knowledge (SOPs, playbooks, training, brand standards), performance data (sales vs target, reviews, labor, retention, compliance), and systems (POS, CRM, ERP, LMS, accounting) so every location receives the coaching attention that field teams have historically been able to give only their highest-priority locations. A control plane sets one policy set, one activity log, and one permission model across the network, so HQ decides what runs without a human. Franchisees ask, run approved workflows, and build their own tools inside those guardrails. When confidence is low the question becomes a ticket carrying the full conversation, the sources checked, and the location context. Available across SMS, WhatsApp, Slack, Teams, Google Chat, email, web, and mobile. Used by ${NETWORK_SCALE.brands} franchise brands across ${NETWORK_SCALE.locations} locations.`;

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EZee Assist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: GROWTH_DEFINITION,
  // Pricing does not appear on the website in any form, including
  // structured data. Do not reintroduce an offers block here.
  // TODO: aggregateRating below is pending human review. If it is not
  // backed by real collected reviews, remove the whole block.
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
        {/* 1 */} <GrowthHero />
        {/* 2 */} <CoachsWeek />
        {/* 3 */} <TheSystem />
        {/* 4 */} <Capabilities />
        {/* 5 */} <AlwaysOn />
        {/* 6 */} <ImpactStats />
        {/* 7 */} <TrustAndControl />
        {/* 8 */} <CustomerProof />
        {/* 9 */} <Objections />
        {/* 10 */} <FinalCTA />
      </main>
      {/* 16 */}
      <Footer />
    </div>
  );
}

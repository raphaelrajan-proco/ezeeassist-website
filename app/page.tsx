import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import HeroSection from "@/components/sections/HeroSection";
import LogoStrip from "@/components/sections/LogoStrip";
import VideoPlaceholder from "@/components/sections/VideoPlaceholder";
import RealitySection from "@/components/sections/RealitySection";
import PivotSection from "@/components/sections/PivotSection";
import UseCaseMatrix from "@/components/sections/UseCaseMatrix";
import ConnectiveTissueSection from "@/components/sections/ConnectiveTissueSection";
import GovernanceSection from "@/components/sections/GovernanceSection";
import FourPillarsSection from "@/components/sections/AnswersActionsAutomations";
import BuildExperienceSection from "@/components/sections/BuildExperienceSection";
import ProofSection from "@/components/sections/ProofSection";
import ImplementationSection from "@/components/sections/ImplementationSection";
import FAQSection from "@/components/sections/FAQSection";
import { faqs } from "@/lib/data/faqs";
import ClosingCTASection from "@/components/sections/ClosingCTASection";

export const metadata: Metadata = {
  title: "The AI Platform for Franchise & Multi-Location Brands | EZee Assist",
  description:
    "The AI platform franchise and multi-location brands build on. AI answers, actions, agents, and apps. Connected, governed, and scaled from HQ to every location.",
  alternates: { canonical: "/" },
  keywords: [
    "AI platform for franchising",
    "franchise AI orchestration platform",
    "multi-location AI platform",
    "AI governance franchise",
    "franchise operations AI",
    "agentic workflows franchise",
    "AI answers actions agents apps",
  ],
  openGraph: {
    title: "The AI Platform for Franchise & Multi-Location Brands | EZee Assist",
    description:
      "AI answers, actions, agents, and apps. Connected, governed, and scaled from HQ to every location.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist, the AI Platform for Franchise & Multi-Location Brands",
      },
    ],
  },
  twitter: {
    title: "The AI Platform for Franchise & Multi-Location Brands | EZee Assist",
    description:
      "AI answers, actions, agents, and apps. Connected, governed, and scaled from HQ to every location.",
    images: [
      {
        url: "/og-image.png",
        alt: "EZee Assist, the AI Platform for Franchise & Multi-Location Brands",
      },
    ],
  },
};

// ── Canonical positioning definition (AEO / llms.txt / schema) ──
const PLATFORM_DEFINITION =
  "EZee Assist is the AI platform franchise and multi-location brands build on. It centralizes every AI use case: Answers (instant responses sourced from your entire stack), Actions (executing tasks across CRM, ERP, scheduling, anywhere), Agents (autonomous multi-step workflows triggered on schedule or signal), and Apps (custom apps built from a single natural-language prompt). Connected to 250+ native integrations, governed by role and location, and deployed across SMS, WhatsApp, Slack, Teams, Google Chat, Email, Web Portal, and Mobile App. Purpose-built for franchise and multi-location operations, from HQ to coaches to franchisees to location staff. Used by 60+ brands across 4,500+ locations.";

// ── SoftwareApplication JSON-LD ─────────────────────────────
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EZee Assist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description: PLATFORM_DEFINITION,
  offers: {
    "@type": "Offer",
    price: "60",
    priceCurrency: "USD",
    description: "Per location, per month. Includes Answers, Actions, Agents, and Apps.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "60",
  },
};

// ── Organization JSON-LD ────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EZee Assist",
  description:
    "The AI platform franchise and multi-location brands build on. Every answer, action, agent, and app, connected, governed, and scaled across the network.",
  url: "https://ezeeassist.com",
  logo: "https://ezeeassist.com/logo.png",
};

// ── FAQ JSON-LD ─────────────────────────────────────────────
// Built from the same array the visible FAQ accordion renders, so the
// schema always matches the on-page content exactly.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
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
      {/* Navbar reads pathname and switches to editorial styling on `/` */}
      <Navbar />
      {/* AEO: machine-readable platform definition — do not remove */}
      <p className="sr-only">{PLATFORM_DEFINITION}</p>
      <main className="flex flex-1 flex-col">
        {/* 1 */} <HeroSection />
        {/* 1a */} <LogoStrip />
        {/* 1b */} <VideoPlaceholder />
        {/* 2 */} <RealitySection />
        {/* 3 */} <PivotSection />
        {/* 4 */} <UseCaseMatrix />
        {/* 5 */} <ConnectiveTissueSection />
        {/* 6 */} <FourPillarsSection />
        {/* 6b */} <BuildExperienceSection />
        {/* 7 */} <GovernanceSection />
        {/* 8 */} <ProofSection />
        {/* 9 */} <ImplementationSection />
        {/* 9b */} <FAQSection />
        {/* 10 */} <ClosingCTASection />
      </main>
      <Footer />
    </div>
  );
}

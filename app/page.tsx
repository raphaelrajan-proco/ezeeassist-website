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
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EZee Assist?",
      acceptedAnswer: { "@type": "Answer", text: PLATFORM_DEFINITION },
    },
    {
      "@type": "Question",
      name: "How long does EZee Assist implementation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Full rollout takes about 10 weeks: 6 weeks for integration and planning, 2 weeks for corporate launch, 2 weeks for location onboarding, then ongoing support. Every rollout includes full white-labelling to your brand, multi-lingual capabilities, and forward-deployed engineering.",
      },
    },
    {
      "@type": "Question",
      name: "What channels do operators use to access EZee Assist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Operators interact with EZee through SMS, WhatsApp, Slack, Microsoft Teams, Google Chat, Email, a Web Portal, and a Mobile App, deployed everywhere your teams already work.",
      },
    },
    {
      "@type": "Question",
      name: "How is EZee Assist governed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every AI action across your network is logged, permissioned, and role-aware. Franchisors decide what HQ sees, coaches see their territory, franchisees see their locations, and staff see what they need. You configure which actions run autonomously and which require human approval.",
      },
    },
    {
      "@type": "Question",
      name: "How is EZee Assist different from ChatGPT or a generic AI chatbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic AI answers from the open internet with no access to your systems. EZee is a platform connected to your entire stack, governed by your rules, and purpose-built for franchise and multi-location operations. Every answer is brand-specific, every action happens inside your tech stack, and every workflow and app is built for your network.",
      },
    },
    {
      "@type": "Question",
      name: "What does EZee Assist pricing look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our base platform is $60 per location per month. This includes Answers, Actions, Agents, and Apps; the ticketing portal with unlimited seats; unlimited users at every location; all platform integration fees; guided onboarding and training; and a monthly system-level credits allowance. Volume discounts kick in beyond 75 locations. Additional usage is available on demand.",
      },
    },
  ],
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
        {/* 10 */} <ClosingCTASection />
      </main>
      <Footer />
    </div>
  );
}

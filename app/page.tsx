import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import HeroSection from "@/components/sections/HeroSection";
import VideoPlaceholder from "@/components/sections/VideoPlaceholder";
import TrustBar from "@/components/sections/TrustBar";
import WhatIsSection from "@/components/sections/WhatIsSection";
import ProblemSection from "@/components/sections/ProblemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import CaseStudyCarousel from "@/components/sections/CaseStudyCarousel";
import ComparisonSection from "@/components/sections/ComparisonSection";
import OnboardingTimeline from "@/components/sections/OnboardingTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PressSection from "@/components/sections/PressSection";
import FAQSection from "@/components/sections/FAQSection";
import PartnersSection from "@/components/sections/PartnersSection";
import SecuritySection from "@/components/sections/SecuritySection";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  keywords: [
    "franchise support",
    "AI franchise support",
    "franchisee support platform",
    "franchise knowledge base",
    "24/7 franchise support",
    "franchise operations AI",
    "multi-location support software",
  ],
};

// ── FAQ JSON-LD ─────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does EZee Assist implementation take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most customers go live in under 7 days. We connect to your existing knowledge systems — Google Drive, SharePoint, YouTube, Dropbox, and more — with no migration required. Your franchisees can start asking questions on day one.",
      },
    },
    {
      "@type": "Question",
      name: "What channels do franchisees use to ask questions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Franchisees can ask questions through SMS/text, email, Slack, Microsoft Teams, WhatsApp, or our web portal. They use whichever channel they already prefer — no new tools to learn.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data used to train AI models?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. Your data is never shared with or used by third parties for any software or language model training. All data is encrypted, isolated in dedicated AWS infrastructure, and fully under your control.",
      },
    },
    {
      "@type": "Question",
      name: "How is EZee Assist different from ChatGPT or a generic AI chatbot?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generic AI tools answer from the open internet. EZee Assist answers exclusively from your brand's own knowledge base — operating manuals, SOPs, training videos, and communications. Every answer is brand-specific, accurate, and citable.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when the AI can't answer a question?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It automatically creates a support ticket with the full conversation context and routes it to the right person on your team. No question falls through the cracks.",
      },
    },
    {
      "@type": "Question",
      name: "How many franchise locations can EZee Assist support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no limit. We support franchise networks from 10 locations to 1,000+. The platform scales with your network — adding a new location takes minutes, not weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What does EZee Assist pricing look like?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing is based on your network size and usage. We offer flexible plans for growing brands and enterprise pricing for large networks. Book a demo for options that fit your budget.",
      },
    },
    {
      "@type": "Question",
      name: "Is EZee Assist secure and compliant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We follow enterprise-grade security practices aligned with SOC 2 Type II controls. All data is encrypted with TLS 1.2/1.3 in transit and AES 256-bit at rest. Each customer's data is isolated in dedicated AWS EC2 instances.",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <VideoPlaceholder />
        <TrustBar />
        {/* AEO: machine-readable definition block — do not remove */}
        <WhatIsSection />
        <ProblemSection />
        <HowItWorksSection />
        <StatsSection />
        <CaseStudyCarousel />
        <ComparisonSection />
        <OnboardingTimeline />
        <TestimonialsSection />
        <PressSection />
        <FAQSection />
        <PartnersSection />
        <SecuritySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

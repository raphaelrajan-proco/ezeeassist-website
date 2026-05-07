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
import AnswersActionsAutomations from "@/components/sections/AnswersActionsAutomations";
import OnboardingTimeline from "@/components/sections/OnboardingTimeline";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PressSection from "@/components/sections/PressSection";
import FAQSection from "@/components/sections/FAQSection";
import PartnersSection from "@/components/sections/PartnersSection";
import SecuritySection from "@/components/sections/SecuritySection";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "EZee Assist — AI Support Agent for Multi-Location Execution",
  description:
    "Automatically resolve support questions, coach operators, and ensure brand compliance at scale. 250+ integrations. 60+ brands. 4,000+ locations.",
  alternates: { canonical: "/" },
  keywords: [
    "AI support agent multi-location",
    "franchise AI platform",
    "multi-location execution",
    "franchise support software",
    "AI coaching compliance",
    "franchise operations AI",
    "agentic workflows franchise",
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
        text: "Most customers go live in under 7 days. We connect to your existing systems and tech stack — 250+ integrations — with no migration required.",
      },
    },
    {
      "@type": "Question",
      name: "What channels do operators use to access EZee Assist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Operators interact with EZee through SMS, email, Slack, Microsoft Teams, WhatsApp, or our web portal — whichever channel they already use.",
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
        text: "Generic AI answers from the open internet. EZee answers exclusively from your brand's knowledge base, your systems, and your data. Every answer is brand-specific. Every action happens inside your tech stack. Every workflow is built for your operations.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when AI can't answer a question?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It automatically creates a support ticket with the full conversation context and routes it to the right person on your team. No question falls through the cracks.",
      },
    },
    {
      "@type": "Question",
      name: "How many locations can EZee Assist support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We support networks from 10 to 4,000+ locations today. The platform scales with your network.",
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
      name: "What kind of workflows can EZee Assist automate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anything you can describe. Examples: weekly KPI reports pulled from QuickBooks and Mindbody, proactive compliance flags for expired insurance or missing financials, automated staffing optimization based on demand and bookings, onboarding checklists for new locations, and much more. You describe the workflow, EZee builds and executes it.",
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
        <AnswersActionsAutomations />
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

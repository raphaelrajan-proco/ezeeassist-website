import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PlatformContent from "@/app/platform/PlatformContent";

export const metadata: Metadata = {
  title: "Solution — EZee Assist",
  description:
    "One AI agent. Your entire tech stack. Support, coaching, compliance workflows — built conversationally, executed at scale. 250+ integrations.",
  alternates: { canonical: "/solution" },
  keywords: [
    "AI support agent",
    "multi-location execution platform",
    "franchise AI platform",
    "agentic workflows",
    "250 integrations",
    "franchise support software",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EZee Assist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web-based",
  description:
    "AI support agent for multi-location execution. Connects to 250+ integrations — drives, CRMs, POS, LMS, marketing, accounting — and delivers support, coaching, and compliance workflows at scale.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Contact for pricing — custom plans based on network size",
  },
  featureList: [
    "AI-powered instant answers from brand knowledge base",
    "250+ integrations across drives, CRMs, POS, LMS, marketing, accounting",
    "Multi-channel delivery (SMS, email, Slack, Teams, WhatsApp, web)",
    "Agentic workflow builder — conversational automation at scale",
    "Intelligent ticketing with auto-categorization and routing",
    "Support, coaching, and compliance in one AI agent",
    "Role-based access control for franchisors, operators, and staff",
    "Enterprise-grade security with SOC 2 alignment",
  ],
  screenshot: "https://www.ezeeassist.com/screenshots/solution-overview.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "60",
    bestRating: "5",
  },
};

export default function SolutionPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <PlatformContent />
      </main>
      <Footer />
    </>
  );
}

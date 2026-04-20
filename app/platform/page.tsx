import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import PlatformContent from "./PlatformContent";

export const metadata: Metadata = {
  title: "Platform Overview",
  description:
    "Explore the EZee Assist platform: AI-powered knowledge delivery, omnichannel support, intelligent escalation, and deep analytics — built for franchise and multi-location brands.",
  alternates: { canonical: "/platform" },
  keywords: [
    "franchise support platform",
    "AI knowledge engine",
    "franchise ticketing system",
    "franchise analytics",
    "franchise AI platform",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EZee Assist",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web-based",
  description:
    "AI-powered operational support platform that gives franchise and multi-location brands instant answers from their own knowledge base — 24/7, through SMS, email, Slack, Teams, and web.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Contact for pricing — custom plans based on network size",
  },
  featureList: [
    "AI-powered instant answers from brand knowledge base",
    "Multi-channel delivery (SMS, email, Slack, Teams, WhatsApp, web)",
    "Intelligent ticketing with auto-categorization and routing",
    "Knowledge gap analysis and content insights dashboard",
    "Zero-migration integration with Google Drive, SharePoint, Dropbox, YouTube",
    "Role-based access control for franchisors, franchisees, and staff",
    "24/7 availability across all time zones",
    "Enterprise-grade security with SOC 2 alignment",
  ],
  screenshot: "https://www.ezeeassist.com/screenshots/platform-overview.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "50",
    bestRating: "5",
  },
};

export default function PlatformPage() {
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

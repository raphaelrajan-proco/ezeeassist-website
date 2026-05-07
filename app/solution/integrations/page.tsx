import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntegrationsContent from "@/app/platform/integrations/IntegrationsContent";

export const metadata: Metadata = {
  title: "250+ Integrations — EZee Assist",
  description:
    "Connects to drives, CRMs, POS, LMS, marketing, accounting, and more. No migration required. Your content and data stay where they live.",
  alternates: { canonical: "/solution/integrations" },
  keywords: [
    "franchise integrations",
    "AI integrations",
    "CRM integration",
    "POS integration",
    "LMS integration",
    "franchise tech stack",
  ],
};

export default function SolutionIntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <IntegrationsContent />
      </main>
      <Footer />
    </>
  );
}

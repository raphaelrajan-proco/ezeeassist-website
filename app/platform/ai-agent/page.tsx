import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAgentContent from "./AIAgentContent";

export const metadata: Metadata = {
  title: "AI Agent: Instant Franchisee Support",
  description:
    "EZee Assist's AI Agent delivers instant, brand-accurate answers to any franchisee question — 24/7, through SMS, email, Slack, Teams, WhatsApp, and web.",
  /* Unreachable: 308s to /platform/answers. */
  alternates: { canonical: "/platform/answers" },
  keywords: [
    "franchise AI agent",
    "franchisee support AI",
    "AI knowledge base franchise",
    "24/7 franchise support",
    "RAG franchise support",
  ],
};

export default function AIAgentPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <AIAgentContent />
      </main>
      <Footer />
    </>
  );
}

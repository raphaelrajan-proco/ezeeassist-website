import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIAgentContent from "./AIAgentContent";

export const metadata: Metadata = {
  title: "AI Agent — EZee Assist Platform",
  description:
    "EZee Assist's AI Agent delivers instant, brand-accurate answers to any franchisee question — 24/7, through the channels they already use.",
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

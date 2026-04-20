import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InsightsContent from "./InsightsContent";

export const metadata: Metadata = {
  title: "Knowledge & Insights — EZee Assist Platform",
  description:
    "Real-time visibility into every question across your franchise network — what's being asked, where content gaps exist, and how your knowledge base is performing.",
  alternates: { canonical: "/platform/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <InsightsContent />
      </main>
      <Footer />
    </>
  );
}

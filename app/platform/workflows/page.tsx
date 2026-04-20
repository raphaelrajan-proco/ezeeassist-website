import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowsContent from "./WorkflowsContent";

export const metadata: Metadata = {
  title: "Workflow Builder — EZee Assist Platform",
  description:
    "Go beyond answers. EZee Assist's Agentic Workflow Builder lets you create multi-step operational workflows powered by AI — coming soon.",
  alternates: { canonical: "/platform/workflows" },
};

export default function WorkflowsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <WorkflowsContent />
      </main>
      <Footer />
    </>
  );
}

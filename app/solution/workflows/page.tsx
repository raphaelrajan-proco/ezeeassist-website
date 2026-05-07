import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkflowsContent from "@/app/platform/workflows/WorkflowsContent";

export const metadata: Metadata = {
  title: "Agentic Workflows — EZee Assist",
  description:
    "AI-powered workflows you describe in plain language. KPI reports, compliance monitoring, staffing optimization, onboarding automation, and more — executed at scale.",
  alternates: { canonical: "/solution/workflows" },
  keywords: [
    "agentic workflows franchise",
    "AI automation multi-location",
    "franchise workflow builder",
    "automated compliance monitoring",
    "franchise KPI reports",
  ],
};

export default function SolutionWorkflowsPage() {
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

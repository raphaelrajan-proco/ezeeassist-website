import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import WorkflowsContent from "@/components/platform/workflows/WorkflowsContent";

/* Replaces the legacy "Workflow Builder" page, which was also unreachable:
   next.config.ts 308'd this path to /solution/agents until now. The route
   name stays `workflows` because that is what franchisors search for; the
   page's own vocabulary is "plays". og/twitter are written out rather than
   inherited, since the homepage's are stale. */
const TITLE = "Workflows";
const DESCRIPTION =
  "Coach it once. It runs at every location, in that location's context. Not a broadcast, not a reminder: a coach's judgment, encoded and running everywhere.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/platform/workflows" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/platform/workflows", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

export default function WorkflowsPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <WorkflowsContent />
      </main>
      <Footer />
    </div>
  );
}

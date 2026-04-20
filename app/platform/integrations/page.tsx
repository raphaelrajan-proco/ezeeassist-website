import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntegrationsContent from "./IntegrationsContent";

export const metadata: Metadata = {
  title: "Integrations — EZee Assist Platform",
  description:
    "EZee Assist connects to Google Drive, SharePoint, Slack, Teams, Dropbox, YouTube, and more. No migration required — your content stays where it is.",
  alternates: { canonical: "/platform/integrations" },
};

export default function IntegrationsPage() {
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

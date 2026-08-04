import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/platform/ComingSoon";

/* Stub. Four CTAs on /platform/integrations point here, so it exists to
   keep them from being dead links. Replace with the real searchable
   directory; do not let this rank in the meantime. */
export const metadata: Metadata = {
  title: "Integration directory — EZee Assist",
  description: "Every system EZee Assist connects to, by category.",
  alternates: { canonical: "/platform/integrations/directory" },
  robots: { index: false, follow: true },
};

export default function DirectoryPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Directory"
          title="The full integration directory is on its way."
          body="Every system we connect to, by category, with what it reads and what it can write back. Until it ships, tell us what your locations run and we'll confirm it directly."
        />
      </main>
      <Footer />
    </div>
  );
}

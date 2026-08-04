import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import CaseStudiesContent from "./CaseStudiesContent";

export const metadata = {
  title: "Case Studies — EZee Assist",
  description:
    "How leading franchise brands reduce support volume and improve franchisee satisfaction with EZee Assist.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <div className="theme-editorial">
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CaseStudiesContent />
      </main>
      <Footer />
    </div>
  );
}

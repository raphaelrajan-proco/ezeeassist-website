import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudiesContent from "./CaseStudiesContent";

export const metadata = {
  title: "Case Studies — EZee Assist",
  description:
    "How leading franchise brands reduce support volume and improve franchisee satisfaction with EZee Assist.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CaseStudiesContent />
      </main>
      <Footer />
    </>
  );
}

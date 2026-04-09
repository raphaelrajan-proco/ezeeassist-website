import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyDetail from "@/components/sections/CaseStudyDetail";

export const metadata: Metadata = {
  title: "430+ Questions Deflected, 93% AI Resolution: DekaLash — EZee Assist",
  description: "How DekaLash achieved a 93% AI resolution rate and deflected 430+ support questions using EZee Assist.",
};

const data = {
  brand: "DekaLash",
  companyFull: "Deka Lash",
  tag: "Cutover success",
  accent: "#C2185B",
  bg: "bg-[#F9E8F0]",
  headline: "430+ Questions Deflected, 93% AI Resolution: Deka Lash's Technology Launch and Cutover Success",
  results: [
    { value: "93%",   label: "AI resolution rate" },
    { value: "430+",  label: "Questions deflected from support team" },
    { value: "< 30s", label: "Average response time" },
  ],
  challenge: "Deka Lash is a rapidly growing beauty franchise with locations across North America. Their franchisees regularly had operational questions about scheduling, procedures, vendor contacts, marketing materials, and brand standards. The support team — while dedicated — was overwhelmed by the volume of repetitive inquiries. Leadership recognized that AI was becoming an expectation in franchisee support, not a nice-to-have.",
  solution: "Deka Lash implemented EZee Assist (internally named 'Alpha') as their franchisees' first line of support. The platform ingested Deka Lash's complete operational knowledge base and made it instantly accessible through the channels franchisees already used. The rollout was seamless — franchisees adopted the tool quickly because it required no behavior change.",
  results_text: "EZee Assist achieved a 93% AI resolution rate — meaning the vast majority of franchisee questions were answered instantly without any human involvement. Over 430 questions were deflected from the support team. Franchisees embraced the technology so quickly that they began telling each other to 'Use Alpha!' — organic peer adoption with zero marketing push.",
  quote: "AI is now an expectation in franchisee support. With EZee Assist, our owners get accurate, brand-specific answers 24/7 — not generic internet advice — while our team focuses on bigger initiatives.",
  quoteName: "Troy McCullen",
  quoteTitle: "Vice President of Operations",
  quoteCompany: "DekaLash",
  quoteInitials: "TM",
  related: [
    { brand: "WSI", slug: "/case-studies/wsi", stat: "67% support reduction", bg: "bg-[#00AEEF]/[0.08]", accent: "#00AEEF" },
    { brand: "DivaDance", slug: "/case-studies/divadance", stat: "2,600+ queries answered", bg: "bg-[#F0E8F9]", accent: "#7B1FA2" },
  ],
};

export default function DekaLashPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CaseStudyDetail {...data} />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyDetail from "@/components/sections/CaseStudyDetail";

export const metadata: Metadata = {
  title: "2,600+ Queries Answered, 650+ Hours Saved: DivaDance — EZee Assist",
  description: "How DivaDance answered 2,600+ franchisee queries and saved 650+ hours of support time in just 6 months with EZee Assist.",
};

const data = {
  brand: "DivaDance",
  companyFull: "DivaDance",
  tag: "Real-time support",
  accent: "#7B1FA2",
  bg: "bg-[#F0E8F9]",
  headline: "How DivaDance Transformed Franchisee Support: 2,600+ Queries Answered, 650+ Hours Saved",
  results: [
    { value: "2,600+",   label: "Queries answered by AI" },
    { value: "650+",     label: "Hours of support time saved" },
    { value: "6 months", label: "Time to achieve results" },
  ],
  challenge: "DivaDance is a high-energy dance franchise with a passionate community of franchisees. As the brand scaled, the operational support burden grew with it. Franchisees needed fast answers on class scheduling, marketing, music licensing, event coordination, and day-to-day studio operations. The small but mighty support team couldn't keep up with the volume — and every hour spent on repetitive questions was an hour not spent growing the brand.",
  solution: "DivaDance deployed EZee Assist (internally branded 'CoCo') to provide instant AI-powered support to their entire franchise network. The platform was connected to DivaDance's full knowledge ecosystem and made available through franchisees' preferred communication channels. The goal was simple: let AI handle the routine so the team can focus on the extraordinary.",
  results_text: "In just the first six months, EZee Assist answered over 2,600 franchisee queries — saving an estimated 650+ hours of support team time. Franchisees got faster answers, the support team got breathing room, and leadership gained visibility into what the network was actually asking about — surfacing content gaps and operational patterns they never had access to before.",
  quote: null,
  quoteName: null,
  quoteTitle: null,
  quoteCompany: null,
  quoteInitials: null,
  related: [
    { brand: "WSI", slug: "/case-studies/wsi", stat: "67% support reduction", bg: "bg-[#00AEEF]/[0.08]", accent: "#00AEEF" },
    { brand: "DekaLash", slug: "/case-studies/dekalash", stat: "93% AI resolution rate", bg: "bg-[#F9E8F0]", accent: "#C2185B" },
  ],
};

export default function DivaDancePage() {
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

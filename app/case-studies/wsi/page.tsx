import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudyDetail from "@/components/sections/CaseStudyDetail";

export const metadata: Metadata = {
  title: "Breaking Down Global Barriers: WSI's 67% Support Reduction — EZee Assist",
  description: "How WSI, the world's largest digital marketing franchise, reduced support questions by 67% with EZee Assist.",
};

const data = {
  brand: "WSI",
  companyFull: "World's Largest Network of Digital Marketing Consultants",
  tag: "Global support scale",
  accent: "#00AEEF",
  bg: "bg-[#00AEEF]/[0.08]",
  headline: "Breaking Down Global Barriers: WSI's 67% Support Reduction Success",
  results: [
    { value: "67%",    label: "Reduction in support questions" },
    { value: "Global", label: "Franchise network served" },
    { value: "24/7",   label: "Support across time zones" },
  ],
  challenge: "WSI operates a global franchise network of digital marketing consultants spanning multiple countries and time zones. Their support team was fielding hundreds of repetitive operational questions from franchisees — about tools, processes, client management, and brand guidelines. With franchisees in different time zones, questions would pile up overnight and create a backlog every morning. The support team was spending the majority of their time on questions that had clear, documented answers — leaving little bandwidth for strategic support.",
  solution: "WSI deployed EZee Assist to centralize their entire knowledge base — including operating manuals, training materials, marketing playbooks, and SOPs — into a single AI-powered support engine. Franchisees across the globe could now ask questions in natural language through their preferred channels and get instant, accurate answers sourced directly from WSI's brand-approved documentation. For questions the AI couldn't answer confidently, smart ticketing routed them to the right support team member with full context.",
  results_text: "Within months of deployment, WSI saw a 67% reduction in repetitive support questions reaching their human team. Franchisees in every time zone now had 24/7 access to accurate brand knowledge — no more waiting for the support team to come online. FBCs were freed to focus on coaching, relationship building, and strategic initiatives instead of answering the same questions repeatedly.",
  quote: "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. Our franchisees have embraced this technology and we are looking forward to expanding its use in the future.",
  quoteName: "John Evans",
  quoteTitle: "Founder & CEO",
  quoteCompany: "EverLine Coatings & Services",
  quoteInitials: "JE",
  related: [
    { brand: "DekaLash", slug: "/case-studies/dekalash", stat: "93% AI resolution rate", bg: "bg-[#F9E8F0]", accent: "#C2185B" },
    { brand: "DivaDance", slug: "/case-studies/divadance", stat: "2,600+ queries answered", bg: "bg-[#F0E8F9]", accent: "#7B1FA2" },
  ],
};

export default function WSIPage() {
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

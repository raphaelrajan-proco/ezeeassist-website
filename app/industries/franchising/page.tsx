import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranchisingContent from "./FranchisingContent";

export const metadata: Metadata = {
  title: "AI for Franchise Execution — EZee Assist",
  description: "Support, coaching, and compliance automation for franchise brands. 60+ brands, 4,000+ locations. Automate support, coach operators, and ensure brand compliance at scale.",
  alternates: { canonical: "/industries/franchising" },
  keywords: ["AI for franchising", "franchise execution platform", "franchisor support tools", "franchise coaching compliance", "franchise AI agent"],
};

export default function FranchisingPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><FranchisingContent /></main><Footer /></>);
}

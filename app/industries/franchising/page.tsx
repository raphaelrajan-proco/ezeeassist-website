import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranchisingContent from "./FranchisingContent";

export const metadata: Metadata = {
  title: "Franchise Brands — EZee Assist",
  description: "EZee Assist helps franchise systems reduce support volume by 67%, give franchisees instant answers 24/7, and scale without scaling headcount.",
  alternates: { canonical: "/industries/franchising" },
  keywords: ["AI for franchising", "franchise support software", "franchisor support tools", "franchisee self-service"],
};

export default function FranchisingPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><FranchisingContent /></main><Footer /></>);
}

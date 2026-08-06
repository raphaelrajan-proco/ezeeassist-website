import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustriesContent from "./IndustriesContent";

export const metadata: Metadata = {
  title: "Industries",
  description: "Purpose-built AI support for franchise brands, multi-location businesses, and universities. Instant answers from your own knowledge base, 24/7.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><IndustriesContent /></main><Footer /></>);
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiLocationContent from "./MultiLocationContent";

export const metadata: Metadata = {
  title: "Multi-Location Businesses — EZee Assist",
  description: "Centralized knowledge, consistent operations, every location. EZee Assist helps multi-location businesses standardize operations and give every team member instant access to company knowledge.",
  alternates: { canonical: "/industries/multi-location" },
};

export default function MultiLocationPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><MultiLocationContent /></main><Footer /></>);
}

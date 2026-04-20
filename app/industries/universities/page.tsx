import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversitiesContent from "./UniversitiesContent";

export const metadata: Metadata = {
  title: "Universities & Campus Systems — EZee Assist",
  description: "Instant answers for every department, campus, and team. EZee Assist centralizes university knowledge and makes it searchable and instantly answerable.",
  alternates: { canonical: "/industries/universities" },
};

export default function UniversitiesPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><UniversitiesContent /></main><Footer /></>);
}

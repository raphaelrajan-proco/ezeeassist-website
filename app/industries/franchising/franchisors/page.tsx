import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranchisorsContent from "./FranchisorsContent";

export const metadata: Metadata = {
  title: "For Franchisors — EZee Assist",
  description: "Scale franchise support without scaling your team. EZee Assist gives franchisors 24/7 AI-powered support that reduces ticket volume and frees FBCs for strategic work.",
};

export default function FranchisorsPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><FranchisorsContent /></main><Footer /></>);
}

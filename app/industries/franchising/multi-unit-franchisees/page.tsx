import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiUnitContent from "./MultiUnitContent";

export const metadata: Metadata = {
  title: "For Multi-Unit Franchisees — EZee Assist",
  description: "Run every location with confidence. EZee Assist gives your staff instant access to brand knowledge, reduces manager burden, and keeps every location consistent.",
};

export default function MultiUnitPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><MultiUnitContent /></main><Footer /></>);
}

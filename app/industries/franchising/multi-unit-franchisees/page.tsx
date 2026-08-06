import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiUnitContent from "./MultiUnitContent";

export const metadata: Metadata = {
  title: "For Multi-Unit Franchisees",
  description: "Run every location with confidence. EZee Assist gives your staff instant access to brand knowledge, reduces manager burden, and keeps every location consistent.",
  alternates: { canonical: "/industries/franchising/multi-unit-franchisees" },
};

export default function MultiUnitPage() {
  return (<><Navbar /><main className="flex flex-1 flex-col"><MultiUnitContent /></main><Footer /></>);
}

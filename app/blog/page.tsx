import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on franchise operations, AI-powered support, and scaling multi-location brands from the team at EZee Assist.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}

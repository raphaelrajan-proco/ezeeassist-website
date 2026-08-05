import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { CASE_STUDIES, bySlug, siblings } from "@/lib/data/case-studies";
import CaseStudyContent from "./CaseStudyContent";

/**
 * One templated route for every story, replacing the three per-story
 * pages that used to live at these same URLs. The paths are unchanged
 * (`/case-studies/wsi`, `/dekalash`, `/divadance`), so nothing needs a
 * redirect; only the files behind them moved.
 */

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = bySlug(slug);
  if (!study) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    articleSection: "Case Study",
    headline: `${study.h1.lead} ${study.h1.accent}`,
    description: study.description,
    publisher: { "@type": "Organization", name: "EZee Assist" },
    about: { "@type": "Organization", name: study.brand },
  };

  return (
    <div className="theme-editorial">
      <JsonLd data={schema} />
      <AnnouncementBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <CaseStudyContent study={study} more={siblings(study.slug)} />
      </main>
      <Footer />
    </div>
  );
}

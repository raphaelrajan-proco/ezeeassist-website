import type { Metadata } from "next";
import ChangelogContent from "./ChangelogContent";

/* The page was a single `"use client"` file, which cannot export
   `metadata`, so this route shipped with only the root layout's default
   title and description and no canonical. Splitting the client body out
   is the only way to give a client page its own metadata. */
export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What shipped in EZee Assist, by month. Releases across answers, workflows, reporting, and the Control Center.",
  alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
  return <ChangelogContent />;
}

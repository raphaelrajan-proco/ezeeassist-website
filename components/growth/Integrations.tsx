"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Overline, SectionHeadline, SectionShell } from "./shared";

/**
 * Section 13: named systems, grouped by category, franchise-native
 * first. Tiles are <Image> with a grey text-pill fallback so real
 * SVGs drop in later without a code change.
 */

type Tool = { name: string; slug: string };

const GROUPS: { heading: string; tools: Tool[] }[] = [
  {
    heading: "Franchise management",
    tools: [
      { name: "FranConnect",  slug: "franconnect" },
      { name: "Naranga",      slug: "naranga" },
      { name: "ClientTether", slug: "clienttether" },
    ],
  },
  {
    heading: "Field service and scheduling",
    tools: [
      { name: "ServiceTitan", slug: "servicetitan" },
      { name: "Mindbody",     slug: "mindbody" },
      { name: "Zenoti",       slug: "zenoti" },
      { name: "Thryv",        slug: "thryv" },
    ],
  },
  {
    heading: "POS",
    tools: [
      { name: "Toast",       slug: "toast" },
      { name: "Square",      slug: "square" },
      { name: "Lightspeed",  slug: "lightspeed" },
      { name: "TouchBistro", slug: "touchbistro" },
    ],
  },
  {
    heading: "Accounting",
    tools: [
      { name: "QuickBooks",   slug: "quickbooks" },
      { name: "Xero",         slug: "xero" },
      { name: "Stripe",       slug: "stripe" },
      { name: "ProfitKeeper", slug: "profitkeeper" },
    ],
  },
  {
    heading: "Learning",
    tools: [
      { name: "Trainual",  slug: "trainual" },
      { name: "Docebo",    slug: "docebo" },
      { name: "LearnUpon", slug: "learnupon" },
    ],
  },
  {
    heading: "Content and comms",
    tools: [
      { name: "SharePoint",   slug: "sharepoint" },
      { name: "Google Drive", slug: "google-drive" },
      { name: "Slack",        slug: "slack" },
      { name: "Teams",        slug: "teams" },
      { name: "YouTube",      slug: "youtube" },
    ],
  },
];

function ToolTile({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm whitespace-nowrap"
        style={{
          backgroundColor: "var(--ed-bg-alt)",
          border: "1px solid var(--ed-rule)",
          color: "var(--ed-fg-muted)",
          fontWeight: 500,
        }}
      >
        {tool.name}
      </span>
    );
  }

  return (
    <Image
      src={`/logos/integrations/${tool.slug}.svg`}
      alt={tool.name}
      width={120}
      height={32}
      className="max-h-8 w-auto object-contain"
      style={{ opacity: 0.75 }}
      onError={() => setFailed(true)}
    />
  );
}

export default function Integrations() {
  return (
    <SectionShell alt id="integrations">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>Integrations</Overline>
        <SectionHeadline>It connects to what you already run.</SectionHeadline>
        <p className="ed-fg-muted mt-6 text-base md:text-lg leading-relaxed">
          250+ native integrations. No migration, and your content stays where
          it lives.
        </p>
      </motion.div>

      <div className="space-y-10">
        {GROUPS.map((g, gi) => (
          <motion.div
            key={g.heading}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: "easeOut", delay: gi * 0.06 }}
          >
            <p
              className="ed-fg-muted text-[10px] uppercase tracking-[0.2em] mb-4"
              style={{ fontWeight: 600 }}
            >
              {g.heading}
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {g.tools.map((t) => (
                <ToolTile key={t.slug} tool={t} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="ed-fg-muted mt-12 text-sm">
        Plus content in any format, wherever it already lives.
      </p>
    </SectionShell>
  );
}

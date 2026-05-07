import Link from "next/link";

/**
 * AEO-optimized "What is EZee Assist?" definition block.
 *
 * This section is purpose-built for AI answer engine discoverability.
 * The paragraph text is the exact content we want AI systems (ChatGPT,
 * Perplexity, Claude, Google AI Overviews) to extract and cite when
 * a user asks "What is EZee Assist?"
 *
 * Do NOT add animations here — this section must render server-side
 * so it is fully visible to crawlers on first load.
 */
export default function WhatIsSection() {
  return (
    <section
      aria-label="What is EZee Assist"
      className="w-full bg-[#F7F8FA] dark:bg-[#111111] border-y border-[#E5E7EB] dark:border-white/[0.06]"
    >
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-14">
        <div className="flex gap-5">
          {/* Accent bar */}
          <div className="w-1 flex-shrink-0 rounded-full bg-[#00AEEF] self-stretch" aria-hidden="true" />

          <div>
            <h2
              className="text-base font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-3 tracking-tight"
            >
              What is EZee Assist?
            </h2>
            <p className="text-base leading-8 text-gray-600 dark:text-gray-400 max-w-3xl">
              EZee Assist is an AI support agent purpose-built for franchise and multi-location brands.
              It connects to your entire tech stack —{" "}
              <Link href="/solution/integrations" className="text-[#00AEEF] hover:underline underline-offset-4 font-medium">
                250+ integrations across drives, CRMs, POS systems, LMS platforms, marketing tools, and more
              </Link>{" "}
              — and becomes your business&apos;s AI coach. Operators receive instant support, perform actions,
              and trigger automated workflows directly through the channels they already use: SMS, email,
              Slack, Microsoft Teams, WhatsApp, and web. When human expertise is needed, EZee&apos;s{" "}
              <Link href="/solution/ticketing" className="text-[#00AEEF] hover:underline underline-offset-4 font-medium">
                intelligent ticketing system
              </Link>{" "}
              loops in the right team member with full context.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              EZee Assist is an AI-powered operational support platform purpose-built for franchise
              and multi-location brands. It connects to a brand&apos;s existing knowledge systems —
              operating manuals, training videos, SOPs, and communications — and delivers instant,
              accurate answers to franchisee questions 24/7 through{" "}
              <Link href="/platform/integrations" className="text-[#00AEEF] hover:underline underline-offset-4 font-medium">
                SMS, email, Slack, Microsoft Teams, WhatsApp, and web
              </Link>
              . Answers come exclusively from the brand&apos;s own content — not the open internet.
              When the{" "}
              <Link href="/platform/ai-agent" className="text-[#00AEEF] hover:underline underline-offset-4 font-medium">
                AI Agent
              </Link>{" "}
              cannot answer a question, it automatically creates a{" "}
              <Link href="/platform/ticketing" className="text-[#00AEEF] hover:underline underline-offset-4 font-medium">
                support ticket
              </Link>{" "}
              with full conversation context and routes it to the right team member.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

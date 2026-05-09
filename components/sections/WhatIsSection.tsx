import Link from "next/link";

/**
 * AEO-optimized "What is EZee Assist?" definition block — editorial pull-quote treatment.
 *
 * The paragraph text is the exact content we want AI systems (ChatGPT,
 * Perplexity, Claude, Google AI Overviews) to extract and cite when
 * a user asks "What is EZee Assist?"
 *
 * Server-rendered (no animations) so it is fully visible to crawlers.
 */
export default function WhatIsSection() {
  return (
    <section
      aria-label="What is EZee Assist"
      className="w-full ed-bg-alt"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-16 py-32 md:py-40">
        <p className="ed-overline mb-10">What is EZee Assist?</p>

        <h2
          className="ed-fg text-4xl md:text-5xl lg:text-6xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
          }}
        >
          The AI operating system for franchise and multi-location businesses.
        </h2>

        <p
          className="ed-fg-muted mt-12 text-xl md:text-2xl max-w-4xl"
          style={{ lineHeight: 1.5, fontWeight: 400 }}
        >
          EZee Assist is an AI support agent purpose-built for franchise and
          multi-location brands. It connects to your entire tech stack —{" "}
          <Link
            href="/solution/integrations"
            className="ed-link"
          >
            250+ integrations across drives, CRMs, POS, LMS, and marketing tools
          </Link>{" "}
          — and becomes your business&apos;s AI coach. Operators receive instant
          support, perform actions, and trigger automated workflows directly
          through the channels they already use: SMS, email, Slack, Microsoft
          Teams, WhatsApp, and web. When human expertise is needed, EZee&apos;s{" "}
          <Link
            href="/solution/ticketing"
            className="ed-link"
          >
            intelligent ticketing system
          </Link>{" "}
          loops in the right team member with full context.
        </p>
      </div>
    </section>
  );
}

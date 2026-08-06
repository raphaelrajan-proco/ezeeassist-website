"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO: Move changelog entries to Sanity CMS for easy editing
const entries = [
  {
    date: "April 2026",
    tag: "Coming Soon",
    tagColor: "bg-[#00AEEF]/10 text-[#00AEEF]",
    title: "Agentic Workflow Builder",
    body: "Automate multi-step franchise operations with AI agents. From onboarding checklists to vendor coordination — coming to all customers later this year.",
  },
  {
    date: "March 2026",
    tag: "New Feature",
    tagColor: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    title: "Enhanced Content Gap Analysis",
    body: "The insights dashboard now surfaces the top questions your knowledge base can't answer — with recommendations for new content to create.",
  },
  {
    date: "February 2026",
    tag: "Integration",
    tagColor: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    title: "WhatsApp Channel Support",
    body: "Franchisees can now ask questions and receive answers via WhatsApp, joining SMS, email, Slack, Teams, and web as supported channels.",
  },
  {
    date: "January 2026",
    tag: "Improvement",
    tagColor: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    title: "Faster Response Times",
    body: "Average AI response time reduced to under 20 seconds across all channels, down from 30 seconds.",
  },
  {
    date: "December 2025",
    tag: "New Feature",
    tagColor: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    title: "Smart Ticketing with Auto-Categorization",
    body: "Unanswered questions now automatically become categorized, prioritized tickets routed to the right support team member.",
  },
  {
    date: "November 2025",
    tag: "Integration",
    tagColor: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    title: "Microsoft Teams Integration",
    body: "Franchisees can now access EZee Assist directly within Microsoft Teams, alongside Slack, SMS, and email.",
  },
];

export default function ChangelogContent() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative w-full border-b border-[#E5E7EB] dark:border-white/[0.06] bg-hero-gradient">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Product</p>
              <h1
                className="text-4xl font-extrabold text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                What&apos;s new at EZee Assist
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Product updates, new features, and improvements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full bg-white dark:bg-[#0D0D0D]">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E5E7EB] dark:bg-white/[0.08]" />

              <div className="flex flex-col gap-10">
                {entries.map(({ date, tag, tagColor, title, body }, i) => (
                  <motion.div
                    key={title}
                    className="relative pl-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.07 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#00AEEF] bg-white dark:bg-[#0D0D0D] transition-all duration-300" />

                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{date}</span>
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagColor}`}>
                        {tag}
                      </span>
                    </div>
                    <h2
                      className="text-lg font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {title}
                    </h2>
                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

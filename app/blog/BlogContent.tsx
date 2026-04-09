"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";

/* ─── Placeholder posts (replace with Sanity data once connected) ── */

const PLACEHOLDER_POSTS = [
  {
    _id: "1",
    slug: { current: "how-franchise-brands-cut-support-tickets-by-67-percent" },
    title: "How Franchise Brands Cut Support Tickets by 67% with AI",
    author: "Raphael Rajan",
    publishedAt: "2026-03-18T00:00:00Z",
    excerpt:
      "When your franchisees are asking the same questions 50 times a day, the problem isn't your team — it's your infrastructure. Here's how leading brands fixed it.",
    category: "franchise-operations",
    readTime: "6 min read",
  },
  {
    _id: "2",
    slug: { current: "why-generic-ai-fails-franchise-networks" },
    title: "Why Generic AI Fails Franchise Networks (And What Actually Works)",
    author: "Shray Mehra",
    publishedAt: "2026-03-04T00:00:00Z",
    excerpt:
      "ChatGPT doesn't know your vendor approval policy. It doesn't know your regional SOPs or your brand's escalation rules. Here's why that gap matters.",
    category: "ai-technology",
    readTime: "8 min read",
  },
  {
    _id: "3",
    slug: { current: "onboarding-new-franchisees-without-burning-out-your-team" },
    title: "Onboarding New Franchisees Without Burning Out Your Team",
    author: "Gabe Cadamuro",
    publishedAt: "2026-02-19T00:00:00Z",
    excerpt:
      "The first 90 days are when franchisees need the most support — and when your team is stretched thinnest. Here's a smarter way to handle it.",
    category: "franchise-operations",
    readTime: "5 min read",
  },
];

const CATEGORIES = [
  { label: "All",                  value: "all" },
  { label: "Franchise Operations", value: "franchise-operations" },
  { label: "AI & Technology",      value: "ai-technology" },
  { label: "Customer Success",     value: "customer-success" },
  { label: "Product Updates",      value: "product-updates" },
  { label: "Company News",         value: "company-news" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "franchise-operations": "Franchise Operations",
  "ai-technology":        "AI & Technology",
  "customer-success":     "Customer Success",
  "product-updates":      "Product Updates",
  "company-news":         "Company News",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.48, ease: "easeOut" as const, delay },
});

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? PLACEHOLDER_POSTS
      : PLACEHOLDER_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/3 -translate-y-1/4"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,174,239,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <motion.div className="max-w-2xl" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              The EZee Assist Blog
            </p>
            <h1
              className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] sm:text-6xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Insights for{" "}
              <span className="text-[#00AEEF]">franchise leaders.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Practical advice on scaling operations, adopting AI, and supporting
              your franchisee network — from the team building EZee Assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Category filter + posts ──────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          {/* Category tabs */}
          <motion.div
            {...fadeUp(0)}
            className="mb-12 flex flex-wrap gap-2"
          >
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                  activeCategory === value
                    ? "bg-[#00AEEF] text-white shadow-sm"
                    : "border border-[#E5E7EB] bg-[#F7F8FA] text-gray-600 hover:border-[#00AEEF]/40 hover:text-[#00AEEF]"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Post grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article
                  key={post._id}
                  {...fadeUp(i * 0.08)}
                  className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_16px_rgba(0,0,0,0.05)]"
                >
                  {/* Image placeholder */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#F7F8FA]">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,174,239,0.07) 0%, transparent 70%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
                        Cover image
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-[#00AEEF] border border-[#00AEEF]/20">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2
                      className="text-lg font-bold leading-snug text-[#0A0A0A] mb-3 group-hover:text-[#00AEEF] transition-colors duration-150"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {post.title}
                    </h2>

                    <p className="text-sm leading-6 text-gray-600 flex-1 mb-5">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                      <span className="text-xs text-gray-400">
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#00AEEF] hover:gap-2.5 transition-all duration-150"
                      >
                        Read more
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              {...fadeUp(0)}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F8FA]">
                <ArrowRight size={20} className="text-gray-300" />
              </div>
              <p className="text-base font-semibold text-gray-400">
                No posts in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-3 text-sm text-[#00AEEF] font-semibold hover:underline"
              >
                View all posts →
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Subscribe strip ───────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-8">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-2xl font-bold text-[#0A0A0A] mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              Get new posts in your inbox.
            </h2>
            <p className="text-gray-600 mb-8">
              Practical insights for franchise operators, delivered monthly. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto"
            >
              <input
                type="email"
                placeholder="you@yourfranchise.com"
                className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0A0A0A] placeholder-gray-400 outline-none focus:border-[#00AEEF] focus:ring-2 focus:ring-[#00AEEF]/20 transition-all"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#00AEEF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0095CC] active:bg-[#0085BB] transition-colors duration-150"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

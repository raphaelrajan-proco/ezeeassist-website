"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

/* ─── Types ─────────────────────────────────────────────── */

interface BodyBlock {
  type: "h2" | "h3" | "p";
  text: string;
}

interface Post {
  slug: string;
  title: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  category: string;
  readTime: string;
  body: BodyBlock[];
}

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
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.48, ease: "easeOut" as const, delay },
});

/* ─── Not found ─────────────────────────────────────────── */

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-40 text-center px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
        Post Not Found
      </p>
      <h1
        className="text-4xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        We couldn&apos;t find that post.
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        It may have been moved, deleted, or the link might be incorrect.
      </p>
      <Link href="/blog">
        <Button>Back to Blog</Button>
      </Link>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────── */

export default function BlogPostContent({ post }: { post: Post | null }) {
  if (!post) return <NotFound />;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-hero-gradient"
      >
        <div
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,174,239,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl px-6 pt-12 pb-16 lg:px-8 lg:pt-16 lg:pb-20">
          {/* Back link */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-[#00AEEF] transition-colors duration-150"
            >
              <ArrowLeft size={15} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category */}
          <motion.div {...fadeUp(0.05)} className="mb-5">
            <span className="inline-flex items-center rounded-full bg-[#00AEEF]/10 px-3 py-1 text-xs font-semibold text-[#00AEEF]">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-bold leading-[1.15] text-[#0A0A0A] dark:text-[#F0F0F0] sm:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            {...fadeUp(0.15)}
            className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-400"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00AEEF]/10 text-[10px] font-bold text-[#00AEEF]">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </div>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gray-400" />
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Cover image placeholder ──────────────────────── */}
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="relative h-64 w-full overflow-hidden rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] sm:h-80"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,174,239,0.07) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-600">
              Cover image
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Article body ─────────────────────────────────── */}
      <article className="mx-auto w-full max-w-3xl px-6 py-12 lg:px-8 lg:py-16">
        {post.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-12 mb-4 text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] first:mt-0"
                style={{ letterSpacing: "-0.02em" }}
              >
                {block.text}
              </motion.h2>
            );
          }
          if (block.type === "h3") {
            return (
              <motion.h3
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-8 mb-3 text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0]"
                style={{ letterSpacing: "-0.01em" }}
              >
                {block.text}
              </motion.h3>
            );
          }
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mb-5 text-base leading-8 text-gray-700 dark:text-gray-400"
            >
              {block.text}
            </motion.p>
          );
        })}
      </article>

      {/* ── Author card ───────────────────────────────────── */}
      <div className="mx-auto w-full max-w-3xl px-6 pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48, ease: "easeOut" }}
          className="flex items-center gap-5 rounded-2xl border border-[#E5E7EB] dark:border-white/[0.08] bg-[#F7F8FA] dark:bg-[#111111] p-6"
        >
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#00AEEF]/10 text-base font-bold text-[#00AEEF]">
            {post.author.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-bold text-[#0A0A0A] dark:text-[#F0F0F0]">{post.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">EZee Assist Team</p>
          </div>
        </motion.div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden border-t border-[#E5E7EB] dark:border-white/[0.06] bg-how-it-works-gradient"
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, ease: "easeOut" }}
          >
            <h2
              className="text-3xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to see this in your network?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Book a 30-minute demo and we&apos;ll show you exactly how EZee Assist
              works with your team, your content, and your franchisees.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="secondary">
                  More Articles
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

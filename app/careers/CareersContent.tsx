"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const roles = [
  {
    title: "Machine Learning Engineer",
    description:
      "Come build community, explore your passions and do your best work at EZee Assist. You'll work on the AI engine at the core of our product — training, fine-tuning, and deploying models that power real-time franchise support at scale.",
    tags: ["Remote", "Full time"],
    email: "careers@ezeeassist.com",
  },
  {
    title: "Integrations Engineer",
    description:
      "Come build community, explore your passions and do your best work at EZee Assist. You'll design and maintain the connectors that link EZee Assist to Google Drive, SharePoint, Slack, Teams, and dozens more platforms our clients rely on.",
    tags: ["Remote", "Full time"],
    email: "careers@ezeeassist.com",
  },
];

const perks = [
  { emoji: "🌍", label: "Fully remote" },
  { emoji: "🚀", label: "High-growth startup" },
  { emoji: "🤝", label: "Collaborative culture" },
  { emoji: "🧠", label: "Hard problems to solve" },
  { emoji: "📈", label: "Competitive compensation" },
  { emoji: "🎯", label: "Real ownership & impact" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

export default function CareersContent() {
  const heroRef   = useRef(null);
  const heroInView  = useInView(heroRef,   { once: true });
  const jobsRef   = useRef(null);
  const jobsInView  = useInView(jobsRef,   { once: true, margin: "-60px" });
  const perksRef  = useRef(null);
  const perksInView = useInView(perksRef,  { once: true, margin: "-60px" });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden border-b border-[#E5E7EB]"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,174,239,0.07) 0%, transparent 60%)" }}
        />
        <div ref={heroRef} className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">Careers</p>
              <h1
                className="text-5xl font-bold tracking-tight text-[#0A0A0A] sm:text-6xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                Join our{" "}
                <span className="text-[#00AEEF]">team</span> at EZee Assist
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
                We are always on the lookout for talented engineers to join our
                team. If you feel you&apos;d be a good fit for any of the roles
                below, please reach out.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mt-8"
            >
              <a href="#openings">
                <Button size="lg">
                  Browse job openings
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why EZee Assist ──────────────────────────────── */}
      <section className="w-full bg-[#F7F8FA]">
        <div ref={perksRef} className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={perksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8 text-center"
          >
            Why EZee Assist
          </motion.p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {perks.map(({ emoji, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={perksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
                className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-semibold text-gray-600">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Job Listings ─────────────────────────────────── */}
      <section id="openings" className="w-full bg-white">
        <div ref={jobsRef} className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={jobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">Open Roles</p>
            <h2
              className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Current <span className="text-[#00AEEF]">openings</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {roles.map(({ title, description, tags, email }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={jobsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.12 }}
                className="card-hover flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AEEF]/10 mb-5">
                  <Sparkles size={18} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <h3
                  className="text-xl font-bold text-[#0A0A0A] mb-3"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-gray-500"
                    >
                      {tag === "Remote" ? <MapPin size={10} /> : <Clock size={10} />}
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-7 text-gray-600 flex-1 mb-6">{description}</p>
                <a href={`mailto:${email}?subject=Application: ${title}`}>
                  <Button size="md" className="w-full">Apply now</Button>
                </a>
              </motion.div>
            ))}
          </div>

          {/* General application nudge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={jobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
            className="mt-10 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <p className="text-sm font-bold text-[#0A0A0A]">Don&apos;t see a role that fits?</p>
              <p className="text-sm text-gray-600 mt-0.5">
                We&apos;re always open to hearing from talented people. Send us your resume anyway.
              </p>
            </div>
            <a
              href="mailto:careers@ezeeassist.com"
              className="flex-shrink-0 text-sm font-semibold text-[#00AEEF] hover:underline underline-offset-4 whitespace-nowrap"
            >
              careers@ezeeassist.com →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

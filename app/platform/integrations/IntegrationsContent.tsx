"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  FolderOpen,
  Database,
  HardDrive,
  Video,
  Globe,
  Mail,
  Hash,
  FileText,
  BookOpen,
  Layers,
  MessageCircle,
  Smartphone,
  Phone,
  ArrowRight,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const, delay },
});

const knowledgeSources = [
  { icon: FolderOpen, name: "Google Drive",     desc: "Documents, spreadsheets, and slides" },
  { icon: Database,   name: "SharePoint",        desc: "Enterprise document management" },
  { icon: HardDrive,  name: "Dropbox",           desc: "Cloud file storage" },
  { icon: Video,      name: "YouTube",           desc: "Training and instructional videos" },
  { icon: Globe,      name: "WordPress",         desc: "Published knowledge base articles" },
  { icon: Mail,       name: "Outlook",           desc: "Email communications and announcements" },
  { icon: Globe,      name: "Microsoft Teams",   desc: "Team communications and channels" },
  { icon: Hash,       name: "Slack",             desc: "Workspace messages and channels" },
  { icon: BookOpen,   name: "Confluence",        desc: "Wiki and documentation" },
  { icon: FileText,   name: "Notion",            desc: "Workspace documents and databases" },
  { icon: Layers,     name: "Box",               desc: "Enterprise cloud storage" },
  { icon: HardDrive,  name: "OneDrive",          desc: "Personal and shared files" },
];

const channels = [
  { icon: Smartphone,    name: "SMS / Text Message",  desc: "The most-used channel across franchise networks" },
  { icon: Mail,          name: "Email",                desc: "Support via any email client, no setup required" },
  { icon: Hash,          name: "Slack",                desc: "Ask questions directly inside your Slack workspace" },
  { icon: MessageCircle, name: "Microsoft Teams",      desc: "Native integration with your Teams environment" },
  { icon: Phone,         name: "WhatsApp",             desc: "Mobile-first support for on-the-go operators" },
  { icon: Globe,         name: "Web Portal",           desc: "Embeddable chat widget for your franchise intranet" },
];

export default function IntegrationsContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(0,174,239,0.08) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-36">
          <motion.div className="max-w-3xl" {...fadeUp(0)}>
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
              <Link href="/platform" className="hover:text-[#00AEEF] transition-colors">Platform</Link>
              <span>/</span>
              <span className="font-semibold text-[#00AEEF]">Integrations</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-4">
              Integrations
            </p>
            <h1
              className="text-5xl font-bold leading-[1.1] text-[#0A0A0A] sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Connects to your entire{" "}
              <span className="text-[#00AEEF]">knowledge ecosystem.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              EZee Assist plugs into the tools and platforms your franchise already
              uses. No migration. No manual uploads. Your content stays where it
              is — we learn from it directly.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">Book a Demo</Button>
              </Link>
              <Link href="/platform">
                <Button size="lg" variant="secondary">
                  Explore the Platform
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Knowledge sources grid ────────────────────────── */}
      <section
        className="w-full"
        style={{ background: "linear-gradient(to bottom, #F7F8FA 0%, #ffffff 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="mb-12" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Knowledge Sources
            </p>
            <h2
              className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Where your knowledge lives,{" "}
              <span className="text-[#00AEEF]">we connect.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 max-w-xl">
              EZee Assist reads directly from your existing repositories. Add a
              connection in minutes — no migration, no re-uploading, no change to
              your workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {knowledgeSources.map(({ icon: Icon, name, desc }, i) => (
              <motion.div
                key={name}
                {...fadeUp(i * 0.05)}
                className="card-hover flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_4px_12px_rgba(0,0,0,0.04)]"
              >
                {/* Icon tile */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                  <Icon size={22} className="text-gray-500" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0A0A0A] mb-1">{name}</p>
                  <p className="text-xs leading-5 text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Delivery channels ────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <motion.div className="mb-12" {...fadeUp(0)}>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Delivery Channels
            </p>
            <h2
              className="text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Franchisees access answers through{" "}
              <span className="text-[#00AEEF]">channels they already use.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 max-w-xl">
              No new apps. No new logins. No behavior change required from your
              network — they just ask questions the way they naturally would.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ icon: Icon, name, desc }, i) => (
              <motion.div
                key={name}
                {...fadeUp(i * 0.07)}
                className="card-hover group relative overflow-hidden flex items-start gap-5 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-7"
              >
                <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#00AEEF]/60 via-[#00AEEF] to-[#00AEEF]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#00AEEF]/10">
                  <Icon size={20} className="text-[#00AEEF]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="mb-1 text-base font-bold text-[#0A0A0A]">{name}</p>
                  <p className="text-sm leading-6 text-gray-600">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Don't see your tool ───────────────────────────── */}
      <section className="w-full bg-[#F7F8FA] border-y border-[#E5E7EB]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3
                className="text-2xl font-bold text-[#0A0A0A] mb-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                Don&apos;t see your tool?
              </h3>
              <p className="text-base text-gray-600 max-w-lg">
                We&apos;re adding new integrations regularly. If your team uses a tool
                that isn&apos;t listed, let us know — we&apos;ll prioritize it.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <Button variant="secondary">
                Request an Integration
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(180deg, #ffffff 0%, #F0F9FF 100%)" }}
      >
        <div className="bg-dot-grid pointer-events-none absolute inset-0" style={{ opacity: 0.3 }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: 700, height: 400, background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(0,174,239,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center lg:px-8 lg:py-32">
          <motion.div {...fadeUp(0)}>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] sm:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              See how EZee Assist connects{" "}
              <span className="text-[#00AEEF]">to your stack.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Book a demo and we&apos;ll walk through exactly how we&apos;d connect to your
              existing tools and have you live in under a week.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contact"><Button size="lg">Book a Demo</Button></Link>
              <Link href="/platform"><Button size="lg" variant="secondary">Explore the Platform <ArrowRight size={16} className="ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

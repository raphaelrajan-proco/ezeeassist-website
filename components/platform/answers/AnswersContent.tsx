"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CLOSING_BASE } from "@/components/growth/closing-band";
import { platformHero } from "@/lib/data/platform-heroes";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import {
  AlertIcon, ChatIcon, ChevronDown, DocIcon, GlobeIcon, GridIcon, MailIcon,
  MegaphoneIcon, MicIcon, MobileIcon, PeopleIcon, PersonIcon, PlayIcon,
  SearchIcon, SlackIcon, SmsIcon,
} from "./icons";

/**
 * /platform/answers
 *
 * Rebuilt from the supplied design handoff.
 *
 * **The framing changed and the old one must not come back.** The page
 * used to argue "the same question arriving from different channels."
 * The real problem is that self-serve is impossible: the answer is
 * scattered across ten systems, some stale, some conflicting, much of it
 * locked in video and call recordings, so people text their coach.
 * Every section now serves that.
 *
 * Deleted deliberately, do not reintroduce: the five-step "how it works"
 * strip, the standalone channels section (merged into Ask anywhere), the
 * governance strip under the quote (those points live on Control
 * Center), the trailing "Same question, same source" paragraph in
 * Scoping, and **every mono eyebrow above a section heading**. The H2
 * leads each section now.
 *
 * ── Deviation from the handoff, on request ──────────────────
 * The handoff specifies a cobalt gradient hero (`#0A2F6B`, accent
 * `#8FB8FF`). **The photographic teal hero is kept instead**, per direct
 * instruction: this hero belongs to the platform-section variant set
 * assigned in `lib/data/platform-heroes.ts`, and pulling it onto a
 * gradient would break that set. The on-band accent stays `#9FE0F8`
 * rather than the handoff's `#8FB8FF`, because cobalt's accent reads
 * wrong on teal. The closing band follows the hero, as on every other
 * platform page.
 *
 * Everything else is the handoff: section order, copy verbatim, the
 * artifacts, and the `--wash`/`--ok`/`--warn`/`--bad`/`--purple` tokens,
 * which are scoped to `.ed-answers` in globals rather than the root.
 */

const HERO = platformHero("answers");
const ON_DARK_ACCENT = "#9FE0F8";
const ON_IMAGE = "rgba(245,237,224,0.92)";

const H2 = {
  fontFamily: JAKARTA,
  fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.6rem + 2vw, 2.375rem)",
  textWrap: "pretty" as const,
};

const MONO_LABEL = {
  fontFamily: MONO,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.13em",
  color: "var(--ed-fg-muted)",
};

/* ── §2 The six results ─────────────────────────────────────
   Each tile takes a different hue so the list reads as mixed material
   rather than one blue block. Status is a word as well as a colour. */
const RESULTS: {
  Icon: (p: { size?: number }) => React.JSX.Element;
  tile: string; hue: string; title: string; meta: string; status: string; statusHue?: string;
}[] = [
  { Icon: DocIcon,   tile: "rgba(0,119,168,.09)",  hue: "var(--ed-accent-text)", title: "refund-policy-v4.pdf",          meta: "SharePoint · uploaded 2024",           status: "V4" },
  { Icon: DocIcon,   tile: "rgba(180,35,24,.09)",  hue: "var(--bad)",            title: "refund-policy-v2.pdf",          meta: "Email attachment · still circulating", status: "CONFLICTS",    statusHue: "var(--bad)" },
  { Icon: MailIcon,  tile: "rgba(180,83,9,.1)",    hue: "var(--warn)",           title: "“Policy update” newsletter",    meta: "Email · March 12",                     status: "UNREAD",       statusHue: "var(--warn)" },
  { Icon: PlayIcon,  tile: "rgba(124,58,237,.09)", hue: "var(--purple)",         title: "Refunds walkthrough, 14:20",    meta: "Training video",                       status: "UNSEARCHABLE" },
  { Icon: MicIcon,   tile: "rgba(13,124,88,.09)",  hue: "var(--ok)",             title: "The exception, discussed once", meta: "Call recording",                       status: "UNSEARCHABLE" },
  { Icon: GlobeIcon, tile: "rgba(82,82,91,.09)",   hue: "var(--ed-fg-muted)",    title: "Intranet page",                 meta: "Last edited 2023",                     status: "STALE",        statusHue: "var(--warn)" },
];

/* ── §3 Channels ────────────────────────────────────────────
   Data, not nine hand-written blocks. The hue rotates so the grid reads
   as a set rather than a column of identical chips. */
const CHANNELS: { label: string; Icon: (p: { size?: number }) => React.JSX.Element; hue: string }[] = [
  { label: "SMS",              Icon: SmsIcon,       hue: "var(--ed-accent-text)" },
  { label: "Email",            Icon: MailIcon,      hue: "var(--warn)" },
  { label: "Slack",            Icon: SlackIcon,     hue: "var(--purple)" },
  { label: "MS Teams",         Icon: PeopleIcon,    hue: "var(--ed-accent-text)" },
  { label: "Google Chat",      Icon: ChatIcon,      hue: "var(--ok)" },
  { label: "Web App",          Icon: GlobeIcon,     hue: "var(--ed-accent-text)" },
  { label: "Mobile",           Icon: MobileIcon,    hue: "var(--purple)" },
  { label: "Chrome Extension", Icon: GridIcon,      hue: "var(--warn)" },
  { label: "Yammer",           Icon: MegaphoneIcon, hue: "var(--ok)" },
];

/* ── §5 Sources ── */
const LEDGER: { label: string; artifact: string; state: string }[] = [
  { label: "SOPs, playbooks, and brand standards",         artifact: "brand-standards-2026.pdf", state: "SharePoint · V11 · CURRENT" },
  { label: "Training material and certification content",  artifact: "new-hire-week-one.docx",   state: "Trainual · V7 · CURRENT" },
  { label: "Videos, call recordings, and newsletters",     artifact: "refunds-walkthrough.mp4",  state: "Transcribed · SEARCHABLE" },
  { label: "Approved FAQs and past resolved tickets",      artifact: "ticket #4471",             state: "Resolved · APPROVED BY HQ" },
  { label: "Connected systems, where permitted",           artifact: "Toast · QuickBooks",       state: "Read-only · AT THE SOURCE" },
];

const WONT_DO: { text: string; link?: { label: string; href: string } }[] = [
  { text: "Answer from general internet knowledge" },
  { text: "Guess when your material doesn’t cover it: ", link: { label: "it opens a ticket instead", href: "#handoff" } },
  { text: "Surface a document a person’s role doesn’t permit" },
  { text: "Serve a superseded version of a policy" },
  { text: "Use your content to train a model" },
];

/* ── §6 Insights ────────────────────────────────────────────
   Every verdict is phrased as an action, not a diagnosis. That is the
   whole point of the section. */
const INSIGHTS: { freq: string; topic: string; verdict: string; hue: string }[] = [
  { freq: "Asked 340×", topic: "Refund edge cases",    verdict: "Add the two scenarios the policy skips",            hue: "var(--warn)" },
  { freq: "Asked 210×", topic: "New-hire first week",  verdict: "Refresh, material is two versions old",             hue: "var(--bad)" },
  { freq: "Asked 190×", topic: "Promo stacking rules", verdict: "Answering cleanly, leave it as is",                 hue: "var(--ok)" },
  { freq: "Asked 84×",  topic: "Lease renewal terms",  verdict: "Opportunity: no content exists yet, write it once", hue: "var(--ed-accent-text)" },
];

/* ── §7 Handoff ── */
const QUEUE: { id: string; title: string; state: string; dot: string; selected?: boolean }[] = [
  { id: "#4469", title: "POS printer offline", state: "Open · 41m",     dot: "var(--warn)" },
  { id: "#4471", title: "Refund exception",    state: "Resolved · 34m", dot: "var(--ok)", selected: true },
  { id: "#4472", title: "Payroll cutoff date", state: "Open · 12m",     dot: "var(--warn)" },
];

const HANDOFF_CARDS = [
  { title: "Nothing is re-explained", body: "The person picking it up doesn’t ask the location to start over." },
  { title: "Routed, not queued",      body: "By topic, territory, and load, not into a shared inbox." },
  { title: "It doesn’t happen twice", body: "The resolution becomes approved content. The next person gets an answer." },
];

/* ── §9 Related ─────────────────────────────────────────────
   All three titles are nowrap by design and must render on one line.
   Shorten a label rather than letting one wrap. */
const RELATED = [
  { kicker: "Ticketing",      title: "When a question needs a person",      href: "/platform/ticketing" },
  { kicker: "Reporting",      title: "When the question is about numbers",  href: "/platform/reporting" },
  { kicker: "Control Center", title: "How scoping and permissions are set", href: "/platform/control-center" },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md"
      style={{
        fontFamily: MONO, fontSize: 12, padding: "5px 10px",
        background: "var(--chip-bg)", border: "1px solid var(--chip-bd)", color: "var(--ed-accent-text)",
      }}
    >
      {children}
    </span>
  );
}

function AnswerCard({
  question, answer, chips,
}: { question: string; answer: React.ReactNode; chips: string[] }) {
  return (
    <div className="ed-card ed-border flex flex-col gap-2.5 rounded-xl border px-4 py-4 sm:px-[18px]">
      <p className="ed-fg text-[15px] font-semibold leading-[1.5]">{question}</p>
      <div className="ed-rule ed-fg-muted border-t pt-2.5 text-[14px] leading-[1.6]">{answer}</div>
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((c) => <Chip key={c}>{c}</Chip>)}
        <span className="ed-fg-muted ml-auto text-[12px]">6s</span>
      </div>
    </div>
  );
}

export default function AnswersContent() {
  return (
    <div className="ed-answers">
      {/* ── 1. Hero ───────────────────────────────────────
          Photographic teal, kept on request rather than the handoff's
          cobalt gradient: this hero belongs to the platform variant set. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.scrimRgba})` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-16"
        >
          <div className="flex flex-col items-start gap-5">
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", fontWeight: 600, color: ON_DARK_ACCENT }}>
              Answers
            </p>
            <h1
              className="leading-[1.1] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                fontSize: "clamp(1.75rem, 0.6rem + 2.7vw, 3rem)",
              }}
            >
              Every question answered from your own material.{" "}
              <span style={{ color: ON_DARK_ACCENT }}>Scoped to the person asking.</span>
            </h1>
            <p className="max-w-[480px] text-base md:text-[16.5px] leading-[1.6]" style={{ color: ON_IMAGE }}>
              Your franchisees ask in the app they&rsquo;re already in. The answer comes back in
              seconds, from the document your brand approved, with the source attached.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="/speak-to-an-expert"
                className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap"
                style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
              >
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true">
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              </Link>
              <a href="#scoping" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">
                See how scoping works
              </a>
            </div>
          </div>

          {/* The card sits straight. It previously had a 0.6deg tilt; that
              was removed and must not come back. Ink is fixed dark: it is
              a white card on a dark band in both themes. */}
          <div
            className="flex flex-col gap-3 rounded-[18px] p-6"
            style={{ backgroundColor: "#FFFFFF", boxShadow: "0 30px 70px -30px rgba(3,16,40,.7)" }}
          >
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.13em", color: "#52525B" }}>
              STORE #118 · SHIFT LEAD · 9:14AM
            </span>
            <p className="text-[14.5px] font-semibold leading-[1.5]" style={{ color: "#0A0A0A" }}>
              Can I run the summer promo alongside the loyalty offer?
            </p>
            <p className="pt-3 text-[13.5px] leading-[1.6]" style={{ borderTop: "1px solid #E5E7EB", color: "#3F3F46" }}>
              No. Promotions don&rsquo;t stack with loyalty redemptions. Apply the higher of the two
              and note it at close.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {["summer-promo-guide.pdf", "loyalty-policy.pdf"].map((c) => (
                  <span
                    key={c}
                    className="rounded-md"
                    style={{
                      fontFamily: MONO, fontSize: 12, padding: "5px 10px",
                      background: "rgba(0,119,168,.06)", border: "1px solid rgba(0,119,168,.22)", color: "#0077A8",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <span className="whitespace-nowrap" style={{ fontSize: 12, color: "#A1A1AA" }}>answered in 6s</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Problem ────────────────────────────────────
          The sequence search bar → results → connector → text message is
          the argument of the section. Keep the order and the connector. */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2}>
              Self-serve doesn&rsquo;t work when it looks like this.
            </h2>
            <p className="ed-fg-muted text-[16.5px] leading-[1.7]">
              The refund policy is a PDF on SharePoint. The update that changed it went out in a
              newsletter. The walkthrough lives in a training video, the exception came up on a call
              recording, and two versions of the checklist disagree.
            </p>
            <p className="ed-fg-muted text-[16.5px] leading-[1.7]">
              So franchisees do the reasonable thing: they text their coach.{" "}
              <b className="ed-fg">The coach becomes the search engine for their locations</b>, and
              the answer drifts a little every time it&rsquo;s retold.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border flex flex-col rounded-3xl border p-4 sm:p-7" style={{ background: "var(--wash)" }}>
              <div
                className="ed-card ed-border flex items-center gap-3 rounded-full border px-5 py-3"
                style={{ boxShadow: "0 10px 26px -18px rgba(12,20,36,.4)" }}
              >
                <span className="ed-fg-muted flex flex-none"><SearchIcon /></span>
                <span className="ed-fg min-w-0 truncate text-[15px] font-medium">what&rsquo;s our refund window?</span>
                <span className="ml-auto flex-none" style={{ ...MONO_LABEL, letterSpacing: "0.1em" }}>6 RESULTS</span>
              </div>

              <div className="ed-card ed-border mt-3.5 overflow-hidden rounded-2xl border">
                {RESULTS.map((r, i) => (
                  <div
                    key={r.title}
                    className={`flex items-center gap-3 px-3.5 py-3 sm:gap-3.5 sm:px-5 ${i === RESULTS.length - 1 ? "" : "ed-rule border-b"}`}
                  >
                    <span
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-[9px]"
                      style={{ background: r.tile, color: r.hue }}
                    >
                      <r.Icon />
                    </span>
                    <span className="flex min-w-0 flex-col gap-px">
                      <span className="ed-fg truncate text-[14.5px] font-semibold">{r.title}</span>
                      <span className="ed-fg-muted truncate text-[12px]">{r.meta}</span>
                    </span>
                    <span
                      className="ml-auto flex-none"
                      style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: r.statusHue ?? "var(--ed-fg-muted)" }}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center self-center pb-1 pt-1.5" aria-hidden="true">
                <span className="inline-block h-6 w-px" style={{ borderLeft: "1.5px dashed var(--ed-fg-muted)" }} />
                <span className="ed-fg-muted flex"><ChevronDown /></span>
              </div>

              <div className="flex justify-end">
                <p
                  className="max-w-[340px] px-4 py-3 text-[14px]"
                  style={{ background: "var(--ed-fg)", color: "var(--ed-bg)", borderRadius: "14px 14px 4px 14px" }}
                >
                  9:41pm, to the coach: &ldquo;what&rsquo;s our refund window again?&rdquo;
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Ask anywhere ───────────────────────────────
          The old "how it works" strip and the separate channels section,
          merged. Neither returns on its own. */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2}>
              Send a message from whatever is already open.
            </h2>
            <p className="ed-fg-muted text-[16.5px] leading-[1.7]">
              The answer comes back in seconds, in plain language, with the links and resources
              behind it. When your material doesn&rsquo;t cover the question, it goes to the{" "}
              <a href="#handoff" className="ed-accent-text underline-offset-2 hover:underline">exact right person</a>{" "}
              with the conversation attached.
            </p>

            <div className="mt-1.5 grid grid-cols-2 gap-2.5 lg:grid-cols-3">
              {CHANNELS.map((c) => (
                <span key={c.label} className="ed-card ed-border flex items-center gap-2.5 rounded-[10px] border px-3.5 py-2.5">
                  <span className="flex flex-none" style={{ color: c.hue }}><c.Icon /></span>
                  <span className="ed-fg text-[13px] font-semibold">{c.label}</span>
                </span>
              ))}
            </div>
            <span className="ed-fg-muted text-[12.5px]">
              And wherever your network talks next. Channels are added, not rebuilt.
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-border flex flex-col gap-3.5 rounded-3xl border p-4 sm:p-7" style={{ background: "var(--wash2)" }}>
              <div className="flex justify-end">
                <div className="flex max-w-[360px] flex-col items-end gap-1.5">
                  <span style={{ ...MONO_LABEL, letterSpacing: "0.12em" }}>1:40PM · MS TEAMS</span>
                  <p
                    className="px-4 py-3 text-[14px] leading-[1.5]"
                    style={{ background: "var(--ed-fg)", color: "var(--ed-bg)", borderRadius: "14px 14px 4px 14px" }}
                  >
                    Can I comp a service for a complaint without approval?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span
                  className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px]"
                  style={{ background: "var(--ed-accent-text)", color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 800, fontSize: 14 }}
                  aria-hidden="true"
                >
                  E
                </span>
                <div
                  className="ed-card ed-border flex max-w-[420px] flex-col gap-2.5 border px-4 py-3.5"
                  style={{ borderRadius: "4px 14px 14px 14px" }}
                >
                  <span className="ed-fg text-[14px] leading-[1.6]">
                    Yes, up to $50, once per customer per quarter. Log it under service recovery at close.
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Chip>service-recovery-policy.pdf</Chip>
                    <Chip>comp-limits · §2</Chip>
                    <span className="ed-fg-muted ml-auto text-[12px]">6s</span>
                  </div>
                </div>
              </div>

              <div className="ed-border flex items-center gap-3 border-t border-dashed pt-3.5">
                <span
                  className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px]"
                  style={{ background: "rgba(180,83,9,.12)", color: "var(--warn)" }}
                >
                  <AlertIcon />
                </span>
                <span className="ed-fg-muted text-[13px] leading-[1.55]">
                  No approved answer for a question? It becomes a{" "}
                  <a href="#handoff" className="ed-accent-text underline-offset-2 hover:underline">ticket for the right person</a>,
                  with the full thread attached. Nothing is re-explained.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. Scoping ────────────────────────────────────
          The trailing "Same question, same source" paragraph that used to
          close this section is deleted. */}
      <section id="scoping" className="ed-bg w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-9 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[760px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Access controlled to each role, each unit, each person.
            </h2>
            <p className="ed-fg-muted text-[16px] leading-[1.6]">
              Role and location decide what comes back. Nobody sees a number they shouldn&rsquo;t.
            </p>
          </Reveal>

          {/* The district manager stays second: the argument is that the
              same question returns more to a wider scope. */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="ed-border flex h-full flex-col gap-3.5 rounded-2xl border p-5 sm:p-6" style={{ background: "var(--wash2)" }}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full"
                    style={{ background: "rgba(13,124,88,.12)", color: "var(--ok)" }}
                  >
                    <PersonIcon />
                  </span>
                  <span className="flex flex-col">
                    <span className="ed-fg text-[14.5px]" style={{ fontFamily: JAKARTA, fontWeight: 700 }}>Shift lead</span>
                    <span className="ed-fg-muted text-[12px]">Store #118 · 9:14am</span>
                  </span>
                </div>
                <AnswerCard
                  question="Can I run the summer promo alongside the loyalty offer?"
                  answer={<>No. Promotions don&rsquo;t stack with loyalty redemptions. Apply the higher of the two and note it at close.</>}
                  chips={["summer-promo-guide.pdf", "loyalty-policy.pdf"]}
                />
                <span className="ed-fg-muted text-[13px] leading-[1.5]">
                  Gets the rule. No margin data, no other locations.
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                className="flex h-full flex-col gap-3.5 rounded-2xl p-5 sm:p-6"
                style={{ background: "var(--wash)", border: "1.5px solid var(--chip-bd)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full"
                    style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-bd)", color: "var(--ed-accent-text)" }}
                  >
                    <PeopleIcon />
                  </span>
                  <span className="flex flex-col">
                    <span className="ed-fg text-[14.5px]" style={{ fontFamily: JAKARTA, fontWeight: 700 }}>District manager</span>
                    <span className="ed-fg-muted text-[12px]">West territory · 12 locations · 9:14am</span>
                  </span>
                </div>
                <AnswerCard
                  question="Can I run the summer promo alongside the loyalty offer?"
                  answer={
                    <>
                      No, they don&rsquo;t stack. Apply the higher of the two.
                      <br /><br />
                      Across your 12 locations, stacking would cost about 4 points of margin on
                      affected tickets. Three stores have applied it in error this month.
                    </>
                  }
                  chips={["summer-promo-guide.pdf", "margin-by-location"]}
                />
                <span className="ed-fg-muted text-[13px] leading-[1.5]">
                  Same question, same second. Gets the rule and what it&rsquo;s costing.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Sources ────────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[800px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Only your trusted and approved sources, across your tech stack, your data, and beyond.
            </h2>
            <p className="ed-fg-muted text-[16px] leading-[1.6]">
              Any format, wherever it already lives. Nothing migrates, and every answer names the
              document it came from.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="ed-border flex flex-col gap-5 rounded-3xl border p-4 sm:p-7" style={{ background: "var(--wash)" }}>
              {/* Below md the three columns stack per row rather than
                  scrolling; the filename and state stay with their label. */}
              <div className="ed-card ed-border overflow-hidden rounded-2xl border">
                <div className="ed-card-alt hidden grid-cols-[1.2fr_1fr_auto] gap-4 px-5 py-3 md:grid" style={MONO_LABEL}>
                  <span>READS FROM</span>
                  <span />
                  <span>IN PLACE · NOTHING COPIED</span>
                </div>
                {LEDGER.map((r) => (
                  <div
                    key={r.label}
                    className="ed-rule grid grid-cols-1 items-center gap-1 border-t px-4 py-3 sm:px-5 md:grid-cols-[1.2fr_1fr_auto] md:gap-4"
                  >
                    <span className="ed-fg text-[14.5px] font-medium">{r.label}</span>
                    <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12 }}>{r.artifact}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "var(--ed-accent-text)" }}>{r.state}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
                <div className="md:col-span-2" style={MONO_LABEL}>WON&rsquo;T DO</div>
                {WONT_DO.map((w) => (
                  <div key={w.text} className="ed-rule ed-fg-muted flex items-baseline gap-2.5 border-t pt-2.5 text-[13.5px]">
                    <span aria-hidden="true" style={{ color: "var(--bad)", fontWeight: 700 }}>✕</span>
                    <span>
                      {w.text}
                      {w.link && (
                        <a href={w.link.href} className="ed-accent-text underline-offset-2 hover:underline">{w.link.label}</a>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Insights ───────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2}>
              Every question comes back to you as a recommendation.
            </h2>
            <p className="ed-fg-muted text-[16.5px] leading-[1.7]">
              You see what your network is asking, what your content answered well, and where the
              next opportunity is: the scenario your policy skips, the page that&rsquo;s a version
              behind, the topic nobody has written yet.
            </p>
            <p className="ed-fg-muted text-[16.5px] leading-[1.7]">
              Most brands find out about a gap when a location gets it wrong. This report shows it
              while it&rsquo;s still a fix, not an incident.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ed-card ed-border overflow-hidden rounded-2xl border">
              <div className="ed-card-alt px-5 py-3.5" style={MONO_LABEL}>
                THIS MONTH · 214 LOCATIONS · WHAT TO DO NEXT
              </div>
              {INSIGHTS.map((r) => (
                /* Three columns only from xl. The verdicts run to 310px and
                   are sized `auto`, so below that the topic is what gives
                   way: at 1024 it collapsed to 48px over four lines.
                   Under xl the verdict drops to its own row instead. */
                <div
                  key={r.topic}
                  className="ed-rule grid grid-cols-1 items-center gap-x-[18px] gap-y-1.5 border-t px-4 py-4 sm:grid-cols-[auto_1fr] sm:px-5 xl:grid-cols-[auto_1fr_auto]"
                >
                  <span className="ed-fg-muted" style={{ fontFamily: MONO, fontSize: 12 }}>{r.freq}</span>
                  <span className="ed-fg text-[15px] font-semibold">{r.topic}</span>
                  {/* The square is decorative. The verdict itself carries
                      the meaning, so colour never does the work alone. */}
                  <span
                    className="text-[13px] font-semibold sm:col-span-2 sm:col-start-2 xl:col-span-1 xl:col-start-3 xl:max-w-[260px]"
                    style={{ color: r.hue }}
                  >
                    <span aria-hidden="true">■</span> {r.verdict}
                  </span>
                </div>
              ))}
              <div className="ed-rule ed-fg-muted border-t px-5 py-3 text-[12px]">
                Illustrative. Figures show the shape of the report, not a customer&rsquo;s data.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Handoff ────────────────────────────────────
          The queue rail plus its selected row is what makes this read as
          a product rather than a spec table. It hides below md, where the
          detail pane takes the full width. */}
      <section id="handoff" className="ed-bg-alt w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[780px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              When your material doesn&rsquo;t cover it, a person does.
            </h2>
            <p className="ed-fg-muted text-[16px] leading-[1.6]">
              Below the confidence threshold you set, the question becomes a ticket in the built-in
              ticketing platform, routed to the right person with the conversation, the sources
              checked, and the location&rsquo;s context already attached.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="ed-card ed-border overflow-hidden rounded-2xl border"
              style={{ boxShadow: "0 24px 54px -34px rgba(12,20,36,.4)" }}
            >
              <div className="ed-card-alt ed-rule flex items-center gap-3 border-b px-4 py-3 sm:px-5">
                <span className="flex gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--ed-border)" }} />
                  ))}
                </span>
                <span className="hidden sm:inline" style={{ ...MONO_LABEL, letterSpacing: "0.12em" }}>
                  EZEE ASSIST · TICKETING
                </span>
                <span className="ml-auto flex items-center gap-2.5">
                  <span className="ed-border ed-fg-muted hidden rounded-full border px-3.5 py-1.5 text-[12px] sm:inline">Search tickets</span>
                  <span
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-bd)", color: "var(--ed-accent-text)" }}
                    aria-hidden="true"
                  >
                    DR
                  </span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
                <div className="ed-card-alt ed-rule hidden flex-col gap-1.5 border-r p-3 md:flex">
                  <span className="px-2.5 pb-1.5" style={MONO_LABEL}>QUEUE · WEST TERRITORY</span>
                  {QUEUE.map((t) => (
                    <span
                      key={t.id}
                      className={`flex flex-col gap-1 rounded-[9px] px-3 py-2.5 ${t.selected ? "ed-card border" : ""}`}
                      style={t.selected ? { borderColor: "var(--chip-bd)" } : undefined}
                    >
                      <span className={`flex items-center gap-2 text-[12.5px] font-semibold ${t.selected ? "ed-fg" : "ed-fg-muted"}`}>
                        <span className="h-[7px] w-[7px] flex-none rounded-full" style={{ background: t.dot }} aria-hidden="true" />
                        {t.id} · {t.title}
                      </span>
                      <span className="ed-fg-muted pl-[15px] text-[12px]">{t.state}</span>
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4 p-5 sm:p-6 lg:px-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="ed-fg tracking-[-0.015em]" style={{ fontFamily: JAKARTA, fontSize: 17, fontWeight: 700 }}>
                      Refund outside the 14-day window
                    </span>
                    <span
                      className="rounded-full"
                      style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", background: "rgba(13,124,88,.12)", color: "var(--ok)", padding: "5px 12px" }}
                    >
                      RESOLVED · 34 MIN
                    </span>
                    <span className="ed-fg-muted text-[12px] lg:ml-auto lg:whitespace-nowrap">
                      Store #087 · Opened 2:14pm · Routed to Dana R.
                    </span>
                  </div>

                  <div className="ed-border overflow-hidden rounded-xl border">
                    {[
                      { k: "QUESTION",       v: <>Customer wants a refund outside the 14-day window. They&rsquo;re a 6-year member. What are my options?</> },
                      { k: "WHY IT STOPPED", v: <>Confidence below threshold. Policy covers the window, not the tenure exception.</> },
                      { k: "ATTACHED",       v: <>Full conversation, including the two follow-ups<br />Sources checked: refund-policy-v4.pdf, membership-terms.pdf<br />Store #087, 6-year member, $2,400 lifetime value<br />Owner&rsquo;s approval limit and this month&rsquo;s exception count</> },
                    ].map((row, i) => (
                      <div
                        key={row.k}
                        className={`grid grid-cols-1 gap-1 px-4 py-3 sm:px-5 md:grid-cols-[130px_1fr] md:gap-[18px] ${i === 0 ? "" : "ed-rule border-t"}`}
                      >
                        <span className="pt-0.5" style={{ ...MONO_LABEL, letterSpacing: "0.12em" }}>{row.k}</span>
                        <span className="ed-fg text-[13.5px] leading-[1.7]">{row.v}</span>
                      </div>
                    ))}
                    <div
                      className="ed-rule grid grid-cols-1 gap-1 border-t px-4 py-3 sm:px-5 md:grid-cols-[130px_1fr] md:gap-[18px]"
                      style={{ background: "var(--chip-bg)" }}
                    >
                      <span className="pt-0.5" style={{ ...MONO_LABEL, letterSpacing: "0.12em", color: "var(--ed-accent-text)" }}>AFTER</span>
                      <span className="ed-fg text-[13.5px] leading-[1.55]">
                        Resolution approved by HQ and added to the policy.{" "}
                        <b>Asked 11 more times since. Answered in 6 seconds each time.</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
            {HANDOFF_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="ed-card ed-border flex h-full flex-col gap-1.5 rounded-xl border px-5 py-4">
                  <span className="ed-fg text-[14px] font-semibold">{c.title}</span>
                  <span className="ed-fg-muted text-[13px] leading-[1.5]">{c.body}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Quote ──────────────────────────────────────
          The four-column governance strip that used to sit under this is
          deleted; those points live on the Control Center page. */}
      <section className="w-full" style={{ backgroundColor: "#0B1220" }}>
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className="m-0 mx-auto flex max-w-7xl flex-col gap-9 px-6 md:px-12 lg:px-16 py-16 md:py-20"
        >
          <blockquote
            className="m-0 max-w-[900px] leading-[1.4] tracking-[-0.02em]"
            style={{
              fontFamily: JAKARTA, fontWeight: 600, color: "#EEF2F8", textWrap: "pretty",
              fontSize: "clamp(1.25rem, 0.7rem + 1.4vw, 1.75rem)",
            }}
          >
            &ldquo;EZee Assist is much more than just a chatbot. It truly made universal search
            possible at WSI, levelling the playing field for our franchisees across geographies and
            languages.&rdquo;
          </blockquote>
          <figcaption
            className="flex flex-col items-start justify-between gap-6 pt-6 sm:flex-row sm:items-center"
            style={{ borderTop: "1px solid rgba(238,242,248,.14)" }}
          >
            <span className="flex items-center gap-4">
              <Image
                src="/photos/jeffrey-grant.jpeg"
                alt=""
                width={52}
                height={52}
                className="h-[52px] w-[52px] flex-none rounded-full object-cover"
              />
              <span className="flex flex-col gap-0.5">
                <span style={{ fontSize: 15, fontWeight: 600, color: "#EEF2F8" }}>Jeffrey Grant</span>
                <span style={{ fontSize: 13, color: "rgba(238,242,248,.65)" }}>Systems Manager, WSI World</span>
              </span>
            </span>
            <Link
              href="/case-studies/wsi"
              className="inline-flex flex-none items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3"
              style={{ background: "#FFFFFF", color: "#0A0A0A", fontFamily: JAKARTA, fontSize: 14, fontWeight: 600 }}
            >
              Read the case study
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </figcaption>
        </motion.figure>
      </section>

      {/* ── 9. Related ──────────────────────────────────── */}
      <section className="ed-bg w-full">
        {/* Three up only from 1200px. The titles are nowrap by design, and
            the longest needs 284px: at three columns that is only clear
            from 1200 up, and `lg` (1024) would cut it. Below that it is
            one column, which is what the handoff's 3/1 note asks for. */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 py-14 md:py-16 min-[1200px]:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              {/* px-4 below sm buys the 9px the longest title needs at
                  375, where px-6 leaves it 7px short. */}
              <Link href={r.href} className="ed-border ed-story-card flex h-full flex-col gap-2 rounded-2xl border px-4 py-5 sm:px-6">
                <span className="ed-accent-text uppercase" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>
                  {r.kicker}
                </span>
                <span className="ed-fg whitespace-nowrap text-[14.5px] font-semibold leading-[1.45]">{r.title}</span>
                <ArrowRight className="ed-accent-text h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 10. Closing ───────────────────────────────────
          Follows the hero's family, as on every platform page, and
          resolves to CLOSING_BASE so it seams into the footer. */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: HERO.base }}>
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "left center" }} />
          <div className="absolute inset-0" style={{ backgroundColor: `rgba(${HERO.closingRgba})` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(4,32,54,0) 45%, ${CLOSING_BASE} 100%)` }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:grid-cols-[1.2fr_.8fr] lg:gap-16"
        >
          <div className="flex flex-col gap-4">
            <h2
              className="leading-[1.12] tracking-[-0.03em]"
              style={{
                color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty",
                fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)",
              }}
            >
              Send us the five questions{" "}
              <span style={{ color: ON_DARK_ACCENT }}>you answer most.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ON_IMAGE }}>
              We&rsquo;ll show you what comes back, from your own material, scoped the way your
              network is.
            </p>
          </div>
          <div className="flex items-start justify-start self-stretch lg:items-end lg:justify-end">
            <Link
              href="/speak-to-an-expert"
              className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap"
              style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}
            >
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

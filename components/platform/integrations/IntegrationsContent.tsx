"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { HERO_GRADIENT } from "@/lib/data/hero-backgrounds";
import { EASE, JAKARTA, MONO, Reveal } from "@/components/platform/shared";
import { Glyph } from "@/components/platform/reporting/Glyph";
import { ConnectCard, WriteBackCard } from "./artifacts";
import HeroLogoStrip from "@/components/sections/HeroLogoStrip";
import { vendorLogo } from "@/lib/data/integration-logos";
import { INTEGRATION_STRIP as MARQUEE } from "@/lib/data/integrations";
import { BLUES, DIRECTORY, NOTES, NOTS, RELATED, ROLES } from "./data";

/**
 * /platform/integrations
 *
 * Rebuilt from the supplied design handoff. Seven sections: hero with
 * the connect artifact and the marquee, nothing migrates, the directory,
 * write back, access, related, closing.
 *
 * Deleted deliberately: every section eyebrow, the per-system READ/WRITE
 * badge matrix (it asserted vendor capabilities we cannot verify), the
 * separate "how connection works" step strip, and every `{{TBD:*}}`
 * block. Read and write are stated once, generically, in Write back and
 * Access.
 *
 * **The directory is a card grid, not a console.** Two earlier
 * treatments were replaced: the clickable eight-row rail with its fake
 * search pill, and the oversized `250+` numeral on a dark band. Do not
 * resurrect either.
 *
 * **The hero is steel**, `HERO_GRADIENT.steel`, and this page left the
 * photographic variant map to take it. Steel is the most neutral band in
 * the family on purpose: the page is about other people's systems, so
 * the hero should not compete with forty wordmarks scrolling under it.
 *
 * Three loops, all under `data-anim` and all freezing to their finished
 * state under `prefers-reduced-motion`: the 15s connect sequence, the
 * 42s marquee, and the 18s write-back sequence.
 */

const ST = HERO_GRADIENT.steel;

const H2 = {
  fontFamily: JAKARTA, fontWeight: 700,
  fontSize: "clamp(1.5rem, 0.6rem + 2vw, 2.375rem)",
  textWrap: "pretty" as const,
};

const H2_SMALL = { ...H2, fontSize: "clamp(1.375rem, 0.7rem + 1.5vw, 2.125rem)" };

const MONO_LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.12em", color: "var(--ed-fg-muted)",
};

const ROLE_TONE: Record<string, [string, string]> = {
  ok:     ["rgba(13,124,88,.11)", "var(--ok)"],
  purple: ["rgba(124,58,237,.1)", "var(--purple)"],
  accent: ["var(--chip-bg)",      "var(--ed-accent-text)"],
};

export default function IntegrationsContent() {
  return (
    <div className="ed-integrations">
      {/* ── 1. Hero ───────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: ST.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: ST.hero }} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 pt-20 pb-14 md:pt-24 md:pb-16 lg:grid-cols-[1.04fr_.96fr] lg:gap-14"
        >
          <div className="flex flex-col items-start gap-5">
            <p className="uppercase" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.16em", fontWeight: 600, color: ST.accent }}>
              Integrations
            </p>
            <h1
              className="leading-[1.1] tracking-[-0.03em]"
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty", fontSize: "clamp(1.75rem, 0.6rem + 2.65vw, 2.9375rem)" }}
            >
              Connect what you already run.{" "}
              <span style={{ color: ST.accent }}>Nothing migrates.</span>
            </h1>
            <p className="max-w-[470px] text-base md:text-[17.5px] leading-[1.6]" style={{ color: ST.body }}>
              Your knowledge, your performance data, and the channels your locations work in, read at
              the source with the permissions they already have. It reads, and where you allow it, it
              writes back.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
                Speak to an expert
                <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
              </Link>
              <a href="#directory" className="ed-btn ed-btn-secondary-dark inline-flex flex-none whitespace-nowrap">Browse what connects</a>
            </div>
          </div>

          <ConnectCard />
        </motion.div>

        {/* The marquee rides inside the band, edge to edge. Names, not
            marks: see data.ts for why the chips carry no logos. */}
        <div
          data-anim
          className="relative overflow-hidden pb-9"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
          aria-hidden="true"
        >
          <div className="ig-marq flex w-max gap-2.5">
            {[0, 1].map((copy) =>
              MARQUEE.map((m) => (
                <span
                  key={`${copy}-${m}`}
                  className="flex-none whitespace-nowrap rounded-lg"
                  style={{
                    fontSize: 12.5, fontWeight: 600, padding: "8px 14px",
                    color: "rgba(240,248,253,.9)", background: "rgba(255,255,255,.09)",
                    border: "1px solid rgba(255,255,255,.18)",
                  }}
                >
                  {m}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      <HeroLogoStrip />

      {/* ── 2. Nothing migrates ───────────────────────────
          Four cards stepping through one blue, light to deep. */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2_SMALL}>
              Your content stays where it is. So do your systems.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              You have been asked to choose between the best tools and one system that sees
              everything. <b className="ed-fg">The document you fix on Tuesday is the answer your
              network gets on Wednesday</b>, with no migration, no sync job, and no cleanup project
              first.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {NOTS.map((n, i) => {
              const [lb, lf, db, df] = BLUES[n.tone];
              return (
                <Reveal key={n.title} delay={(i % 2) * 0.06}>
                  <div className="ed-nots-card flex h-full flex-col gap-3 rounded-2xl p-6" style={{ "--nb": lb, "--nf": lf, "--nbd": db, "--nfd": df } as React.CSSProperties}>
                    <span className="ed-nots-tile flex h-9 w-9 flex-none items-center justify-center rounded-[10px]">
                      <Glyph d={n.d} size={18} />
                    </span>
                    <span className="ed-nots-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 17.5, fontWeight: 700 }}>
                      {n.title}
                    </span>
                    <span className="ed-fg-muted text-[14.5px] leading-[1.55]">{n.body}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. The directory ──────────────────────────────
          A card grid on the alt surface. Not a console, not a dark band. */}
      <section id="directory" className="ed-bg-alt w-full scroll-mt-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[860px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              Knowledge, data, channels, and the systems{" "}
              <span className="ed-accent-text">where the work gets done.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Eight categories, 250+ systems, connected at the source. Proprietary platforms and
              internal databases connect through the API, typically inside two weeks.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIRECTORY.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) * 0.05}>
                <div className="ed-card ed-border flex h-full flex-col rounded-2xl border p-6">
                  <span className="ed-fg tracking-[-0.02em]" style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 700 }}>
                    {c.name}
                  </span>
                  {/* Fixed two-line block, so the hairline below sits
                      level across every card in a row. Descriptions are
                      written to fit two lines; never let one run to three. */}
                  <span className="ed-fg-muted mt-1.5 text-[13.5px] leading-[1.6]" style={{ minHeight: 43 }}>
                    {c.desc}
                  </span>
                  <span className="ed-rule my-3.5 block border-t" aria-hidden="true" />
                  <span className="flex flex-wrap items-center gap-2">
                    {c.chips.map((chip) => {
                      /* The mark is committed under public/logos/integrations,
                         never hotlinked. `vendorLogo` returns null for the
                         four that resolved to a parent brand rather than the
                         product, and those keep the plate: three chips
                         showing one Microsoft logo reads as a bug, and a
                         wrong mark is worse than none. Either way the chip
                         carries a 15px box, so the row does not reflow when
                         a real mark lands. */
                      const v = vendorLogo(chip.domain);
                      return (
                        <span
                          key={chip.name}
                          className="ed-border ed-fg flex flex-none items-center gap-2 whitespace-nowrap rounded-lg border"
                          style={{ fontSize: 13, fontWeight: 500, padding: "7px 11px" }}
                        >
                          {v ? (
                            <Image
                              src={v.src}
                              alt=""
                              width={15}
                              height={15}
                              className="flex-none rounded-[3px] object-contain"
                              style={{ width: 15, height: 15 }}
                            />
                          ) : (
                            <span
                              className="ed-border flex-none rounded-[3px] border"
                              style={{ width: 15, height: 15, background: "var(--ed-card-alt)" }}
                              aria-hidden="true"
                            />
                          )}
                          {chip.name}
                        </span>
                      );
                    })}
                    <span className="ed-fg-muted flex-none text-[13px]">+ more</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Write back ─────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:grid-cols-[.86fr_1.14fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4">
            <h2 className="ed-fg leading-[1.14] tracking-[-0.03em]" style={H2_SMALL}>
              Reading is what most platforms mean by integration.{" "}
              <span className="ed-accent-text">EZee Assist acts.</span>
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              A draft written back to your marketing tool, a ticket opened in your service desk, a
              task assigned in your scheduler. Every write waits for the approval you set, and lands
              in the system your team already works in.
            </p>
            <Link href="/platform/control-center" className="ed-accent-text inline-flex w-fit items-center gap-2 text-[14px] font-semibold">
              How approvals are set
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}><WriteBackCard /></Reveal>
        </div>
      </section>

      {/* ── 5. Access ─────────────────────────────────────── */}
      <section className="ed-bg-alt w-full">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <Reveal className="flex max-w-[860px] flex-col gap-3.5">
            <h2 className="ed-fg leading-[1.12] tracking-[-0.03em]" style={H2}>
              It cannot show someone what their own system would not.
            </h2>
            <p className="ed-fg-muted text-[18px] leading-[1.7]">
              Connections inherit the permissions already set in the systems they read from, plus the
              role and location rules you set here. One question, asked by three people at the same
              minute.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="ed-border flex flex-col gap-5 rounded-[20px] border p-5 sm:p-7" style={{ background: "var(--wash)" }}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span style={MONO_LABEL}>ONE CONNECTION · 11:20AM</span>
                <span className="ed-fg text-[14px] font-semibold">
                  &ldquo;How did last week close against target?&rdquo;
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {ROLES.map((r) => {
                  const [bg, fg] = ROLE_TONE[r.tone];
                  return (
                    <div
                      key={r.role}
                      className="ed-card flex flex-col gap-3 rounded-2xl p-5"
                      style={{ border: r.lead ? "1.5px solid var(--chip-bd)" : "1px solid var(--ed-border)" }}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full" style={{ background: bg, color: fg }}>
                          <Glyph d="M12 8a3.5 3.5 0 100-7 3.5 3.5 0 000 7 M5 21c0-4 3-7 7-7s7 3 7 7" size={14} />
                        </span>
                        <span className="flex flex-col">
                          <span className="ed-fg text-[14px] font-semibold">{r.role}</span>
                          <span className="ed-fg-muted text-[12px]">{r.unit}</span>
                        </span>
                      </span>
                      <span className="ed-rule flex flex-col gap-1 border-t pt-3">
                        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--ok)" }}>SEES</span>
                        <span className="ed-fg text-[13.5px] leading-[1.5]">{r.sees}</span>
                      </span>
                      <span className="flex flex-col gap-1">
                        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: "var(--bad)" }}>DOESN&rsquo;T</span>
                        <span className="ed-fg-muted text-[13.5px] leading-[1.5]">{r.doesnt}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="ed-rule grid grid-cols-1 gap-5 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
                {NOTES.map((n) => (
                  <span key={n.title} className="flex flex-col gap-1">
                    <span className="ed-fg text-[13.5px] font-semibold">{n.title}</span>
                    <span className="ed-fg-muted text-[13px] leading-[1.5]">{n.body}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="ed-fg-muted text-[15px]">
              <Link href="/security" className="ed-accent-text underline-offset-2 hover:underline">Read the Trust Center</Link>{" "}
              for how permissions, retention, and model training are handled.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Related ────────────────────────────────────── */}
      <section className="ed-bg w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 md:px-12 lg:px-16 py-14 md:py-16 min-[1200px]:grid-cols-3">
          {RELATED.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.06}>
              <Link href={r.href} className="ed-border ed-story-card flex h-full flex-col gap-2 rounded-2xl border px-4 py-5 sm:px-6">
                <span className="ed-accent-text uppercase" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em" }}>{r.kicker}</span>
                <span className="ed-fg whitespace-nowrap text-[14.5px] font-semibold leading-[1.45]">{r.title}</span>
                <ArrowRight className="ed-accent-text h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 7. Closing ────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: ST.base }}>
        <div className="absolute inset-0" aria-hidden="true" style={{ background: ST.closing }} />
        <div className="absolute inset-0" aria-hidden="true" style={{ background: `linear-gradient(to bottom, rgba(12,24,36,0) 45%, ${ST.resolve} 100%)` }} />

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
              style={{ color: "#FFFFFF", fontFamily: JAKARTA, fontWeight: 700, textWrap: "pretty", fontSize: "clamp(1.5rem, 0.5rem + 2.7vw, 2.625rem)" }}
            >
              Send us your stack.{" "}
              <span style={{ color: ST.accent }}>We&rsquo;ll tell you what connects.</span>
            </h2>
            <p className="max-w-[480px] text-base leading-[1.6]" style={{ color: ST.body }}>
              List what your locations run and we&rsquo;ll show you exactly what it reads, what it
              can write back, and what that changes in the first week.
            </p>
          </div>
          <div className="flex items-start justify-start self-stretch lg:items-end lg:justify-end">
            <Link href="/speak-to-an-expert" className="ed-btn ed-btn-arrow inline-flex flex-none whitespace-nowrap" style={{ backgroundColor: "#FFFFFF", color: "#0A0A0A" }}>
              Speak to an expert
              <span className="ed-btn-arrow-badge" aria-hidden="true"><ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} /></span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

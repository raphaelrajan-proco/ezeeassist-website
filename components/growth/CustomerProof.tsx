"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Overline, SectionHeadline, SectionShell, MockAvatar } from "./shared";
import { NETWORK_SCALE } from "@/lib/data/network-scale";

/**
 * Section 12: named brands, named people, measured change. Ada's
 * full-bleed customer block for the lead card, two supporting cards
 * at smaller scale. Exactly two metrics per card.
 */

// TODO: Source the DekaLash quote about franchisees telling each other to use it. That is
// adoption evidence and it rebuts section 08 better than anything we could write.
// Placeholder in use until sourced.
//
// TODO: Source stories for Workflows, AI apps, and Compliance. Current proof covers Answers
// and Ticketing only, which under-evidences three of the five capabilities in section 07.

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="text-2xl md:text-3xl tracking-[-0.03em]"
        style={{ color: "#00AEEF", fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1 }}
      >
        {value}
      </p>
      <p className="ed-fg-muted mt-2 text-sm leading-snug">{label}</p>
    </div>
  );
}

/** Stand-in for the customer image until real photography lands. */
function BrandPlate({ name, tall = false }: { name: string; tall?: boolean }) {
  return (
    <div
      className="ed-gradient-frame rounded-2xl flex items-center justify-center"
      style={{ minHeight: tall ? "220px" : "140px" }}
      aria-hidden="true"
    >
      {/* TODO: Replace with real customer photography. */}
      <span
        className="ed-fg text-2xl md:text-3xl tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, opacity: 0.45 }}
      >
        {name}
      </span>
    </div>
  );
}

export default function CustomerProof() {
  return (
    <SectionShell id="proof">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mb-14 md:mb-16"
      >
        <Overline>Proof</Overline>
        <SectionHeadline>
          {NETWORK_SCALE.brands} brands. {NETWORK_SCALE.locations} locations.
          All running on EZee.
        </SectionHeadline>
      </motion.div>

      {/* Lead card: DekaLash */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl p-8 md:p-10"
        style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p
              className="ed-fg text-lg tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}
            >
              DekaLash
            </p>
            <h3
              className="ed-fg text-2xl md:text-3xl tracking-[-0.02em] mb-8"
              style={{ fontFamily: "var(--font-editorial)", fontWeight: 500, lineHeight: 1.2 }}
            >
              A platform migration that did not flood the support inbox.
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <Metric value="94%" label="AI deflection during Mindbody migration" />
              <Metric value="430+" label="Questions resolved without HQ" />
            </div>

            <blockquote
              className="ed-fg-muted text-base md:text-lg leading-relaxed mb-5"
              style={{ fontStyle: "italic" }}
            >
              &ldquo;AI is now an expectation in franchisee support. Our owners
              get accurate, brand-specific answers around the clock while our
              team focuses on bigger initiatives.&rdquo;
            </blockquote>
            <div className="flex items-center gap-2.5">
              <MockAvatar initials="TM" color="#0072CE" />
              <p className="ed-fg-muted text-sm">
                <span className="ed-fg" style={{ fontWeight: 500 }}>Troy McCullen</span>
                , VP Operations, DekaLash
              </p>
            </div>

            <Link
              href="/case-studies/dekalash"
              className="ed-link inline-block mt-7 text-sm"
              style={{ fontWeight: 500 }}
            >
              Read the case study
            </Link>
          </div>

          <BrandPlate name="DekaLash" tall />
        </div>
      </motion.div>

      {/* Supporting cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* WSI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-7 md:p-8"
          style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
        >
          <p className="ed-fg text-base tracking-[-0.02em] mb-5" style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}>
            WSI
          </p>
          <BrandPlate name="WSI" />
          <div className="grid grid-cols-2 gap-5 mt-6">
            <Metric value="67%" label="Ticket reduction in the first 30 days" />
            <Metric value="500+" label="Locations across 80 countries" />
          </div>
          <Link href="/case-studies/wsi" className="ed-link inline-block mt-6 text-sm" style={{ fontWeight: 500 }}>
            Read the case study
          </Link>
        </motion.div>

        {/* Aqua-Tots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="rounded-3xl p-7 md:p-8"
          style={{ backgroundColor: "var(--ed-card)", border: "1px solid var(--ed-rule)" }}
        >
          <p className="ed-fg text-base tracking-[-0.02em] mb-5" style={{ fontFamily: "var(--font-editorial)", fontWeight: 600 }}>
            Aqua-Tots
          </p>
          <BrandPlate name="Aqua-Tots" />
          {/* TODO: source Aqua-Tots second metric. Card returns to the
              two-metric grid the moment it exists. */}
          <div className="mt-6">
            <Metric value="160" label="Locations live" />
          </div>

          {/* TODO: replace with a quote describing an operational change, not product praise. Current line is praise-only per our own quote standard. */}
          <blockquote className="ed-fg-muted text-base leading-relaxed mt-6 mb-4" style={{ fontStyle: "italic" }}>
            &ldquo;EZee Assist has transformed our business.&rdquo;
          </blockquote>
          <div className="flex items-center gap-2.5">
            <MockAvatar initials="PP" color="#15803D" />
            <p className="ed-fg-muted text-sm">
              <span className="ed-fg" style={{ fontWeight: 500 }}>Paul Preston</span>
              , CEO, Aqua-Tots Swim School
            </p>
          </div>
        </motion.div>
      </div>

      {/* Partner strip */}
      {/* TODO: real partner badge images to replace text pills before publish. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 md:mt-20"
      >
        <p
          className="ed-fg-muted text-[11px] uppercase tracking-[0.2em] mb-6"
          style={{ fontWeight: 600 }}
        >
          Trusted across the franchise community
        </p>
        <div className="flex flex-wrap gap-3">
          {["IFA Supplier Forum", "CFA Member", "FSN Verified Member", "WSI Partner"].map((p) => (
            <span
              key={p}
              className="rounded-full px-5 py-2.5 text-sm"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
                color: "var(--ed-fg)",
                fontWeight: 500,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}

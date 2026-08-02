"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconPolicies, IconPermissions, IconHumanLoop, IconActivityLog, IconSecurity,
} from "./ControlCenterIcons";

/**
 * Control center, rebuilt from a supplied design handoff. The old version
 * was a six-tab strip over a live policy-table panel: a lot of chrome for
 * a section whose only job is to say "this is governed."
 *
 * This states all five guarantees at once on one calm band, with no
 * interaction. **Nothing here is a tab, a button or a link except the
 * CTA.** Model choice is deliberately gone; five items, not six.
 *
 * Tokens live on `.ed-cc` in globals.css. The glyphs live in
 * `ControlCenterIcons.tsx` and must stay inline SVG.
 */

const JAKARTA = "var(--font-editorial)";
const EASE = [0.22, 1, 0.36, 1] as const;

const GUARANTEES = [
  {
    Icon: IconPolicies,
    title: "Policies",
    body: "Define what runs on its own and what waits for a human. Written once at HQ, applied everywhere.",
  },
  {
    Icon: IconPermissions,
    title: "Permissions",
    body: "Everyone sees exactly what their role and location allow. The same question gets different answers.",
  },
  {
    Icon: IconHumanLoop,
    title: "Human in the loop",
    body: "Anything reaching a client, a channel, or your books stops at an approver. Nothing sends itself.",
  },
  {
    Icon: IconActivityLog,
    title: "Activity log",
    body: "Every question, answer, action, and approval is recorded with its sources, searchable and exportable.",
  },
  {
    Icon: IconSecurity,
    title: "Security",
    body: "SSO, encryption in transit and at rest, regional data handling, and no training on your data. Ever.",
  },
];

export default function TrustAndControl() {
  return (
    /* The band is full bleed; the wrapper is centred inside it.
       The handoff asks for a hardcoded 1180 with 40px padding so the
       columns align with everything around them, and says to prefer an
       existing container token if one exists. It does: these are
       `SectionShell`'s values, which is what Proof directly above and
       the FAQ directly below both use. Measured, they put content at
       64 to 1141 at 1205; the handoff's literal numbers would have put
       this section at 27 to 1179 and jogged against both neighbours. */
    <section
      id="trust"
      className="ed-cc w-full scroll-mt-24"
      style={{ backgroundColor: "var(--cc-band)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 md:pb-24 flex flex-col items-center">
        <h2
          className="text-center max-w-[800px]"
          style={{
            fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08,
            textWrap: "pretty", color: "var(--cc-text)",
            /* Tops out at the spec's 48px. The break between the two
               sentences is hard, so each holds its own line. */
            fontSize: "clamp(1.625rem, 0.66rem + 3.1vw, 3rem)",
          }}
        >
          Ungoverned AI is a brand risk.
          <br />
          <span style={{ color: "var(--cc-accent-ink)" }}>
            EZee is the system that removes it.
          </span>
        </h2>

        <p
          className="text-center max-w-[640px] mt-5 text-[15.5px] md:text-[17px]"
          style={{ lineHeight: 1.6, color: "var(--cc-muted)" }}
        >
          Set once at HQ. Enforced at every location, every channel, every day.
        </p>

        {/* auto-fit collapses 5 to 3 to 2 to 1 with no media query. The
            columns are top-aligned and carry no card, border or
            background of their own. */}
        <div
          className="w-full pt-14 md:pt-[76px] grid gap-y-9 gap-x-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(176px, 1fr))" }}
        >
          {GUARANTEES.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              className="flex flex-col gap-[22px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.42, ease: EASE, delay: i * 0.06 }}
            >
              <Icon />
              <h3
                style={{
                  fontFamily: JAKARTA, fontSize: 19, fontWeight: 700,
                  letterSpacing: "-0.018em", lineHeight: 1.25, color: "var(--cc-text)",
                }}
              >
                {title}
              </h3>
              <p className="text-[14.5px]" style={{ lineHeight: 1.6, color: "var(--cc-muted)" }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/security"
          className="mt-14 md:mt-[76px] inline-flex items-center gap-3.5 rounded-full transition-opacity hover:opacity-90"
          style={{
            padding: "12px 12px 12px 26px",
            background: "var(--cc-accent)",
            color: "#FFFFFF",
            fontFamily: JAKARTA, fontSize: 15.5, fontWeight: 600,
          }}
        >
          See the full trust page
          <span
            aria-hidden="true"
            className="flex items-center justify-center rounded-full"
            style={{ width: 34, height: 34, background: "rgba(255,255,255,.2)", fontSize: 16, flex: "none" }}
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

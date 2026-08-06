"use client";

import { motion } from "framer-motion";
import { EASE, JAKARTA, MONO } from "@/components/platform/shared";
import { MATRIX, ROLES, type Cell } from "./data";

/**
 * The role by capability matrix, the page's centrepiece.
 *
 * The differentiator it carries: every AI product controls what a person
 * can *see*; almost none control what the AI is allowed to *do* on their
 * behalf. Data permissions are table stakes. Capability permissions are
 * not.
 *
 * Four things must survive any edit:
 *
 * **Three states, never two.** The approval state is what makes this
 * read as an operating network rather than a lockdown. It is the single
 * most important decision in the section.
 *
 * **Never reorder the rows.** Search is at the top because it is
 * uncontentious; publish network-wide is at the bottom because it is
 * what HQ actually worries about. Reading down, the reader moves from
 * obviously fine to exactly my concern, and finds it closed.
 *
 * **State is never carried by colour alone.** Fill, half-fill and ring
 * differ in shape and each carries a label, so the matrix survives
 * greyscale and a printed screenshot.
 *
 * **All five roles stay at every width.** Below `lg` it becomes one card
 * per capability with the five states as a compact labelled row, rather
 * than dropping a role or forcing a horizontal scroll on a twelve-row
 * table. The handoff asked for the five columns to survive tablet width
 * too, but at 768 each role column is ~70px and "Leadership" needs ~90
 * at the 12px type floor, so the table form starts at `lg` and the
 * stacked form covers tablet. No role is dropped either way.
 */

const SKY = "#9FE0F8";
const AMBER = "#F0B429";
const RULE = "rgba(245,245,247,0.14)";

const LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.1em", textTransform: "uppercase" as const,
};

const STATE_LABEL: Record<Cell, string> = {
  yes: "Allowed",
  approval: "Requires approval",
  no: "Not permitted",
};

function Marker({ state }: { state: Cell }) {
  const style =
    state === "yes"        ? { background: SKY }
    : state === "approval" ? { background: `linear-gradient(90deg, ${AMBER} 50%, rgba(240,180,41,0.12) 50%)`, boxShadow: `inset 0 0 0 1px ${AMBER}` }
    : { boxShadow: "inset 0 0 0 1px rgba(245,245,247,0.3)" };
  return (
    <span
      className="inline-block h-[11px] w-[11px] flex-none rounded-full"
      style={style}
      role="img"
      aria-label={STATE_LABEL[state]}
    />
  );
}

/* Written out in full, twice. Tailwind only generates classes it can
   literally see, so a computed `md:${GRID}` produces a class that never
   exists. This has bitten the Ticketing console already. */
const HEAD_GRID = "lg:grid-cols-[minmax(0,1.9fr)_repeat(5,minmax(46px,0.42fr))]";
const ROW_GRID  = "lg:grid-cols-[minmax(0,1.9fr)_repeat(5,minmax(46px,0.42fr))]";

export default function Matrix() {
  return (
    <div
      className="overflow-hidden rounded-[14px]"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${RULE}` }}
    >
      <div className={`hidden gap-2 px-5 py-3 lg:grid ${HEAD_GRID}`} style={{ background: "rgba(0,0,0,0.28)", ...LABEL, color: "rgba(245,245,247,0.6)" }}>
        <span>Capability</span>
        {ROLES.map((r) => <span key={r} className="text-center">{r}</span>)}
      </div>

      {MATRIX.map((band, bi) => (
        <motion.div
          key={band.band}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE, delay: bi * 0.15 }}
        >
          <div className="px-5 py-2.5" style={{ background: "rgba(255,255,255,0.045)", borderTop: `1px solid ${RULE}`, ...LABEL, color: SKY }}>
            {band.band}
          </div>

          {band.rows.map((row) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 items-center gap-x-2 gap-y-2.5 px-5 py-3 ${ROW_GRID}`}
              style={
                row.emphasis
                  ? { background: "rgba(159,224,248,0.07)", boxShadow: "inset 3px 0 0 #9FE0F8", paddingTop: 15, paddingBottom: 15 }
                  : undefined
              }
            >
              <span
                className="text-[14px] leading-[1.4]"
                style={{ color: row.emphasis ? "#FFFFFF" : "rgba(245,245,247,0.92)", fontWeight: row.emphasis ? 600 : 400 }}
              >
                {row.label}
              </span>

              {/* Desktop: one marker per role column. */}
              {row.cells.map((c, i) => (
                <span key={ROLES[i]} className="hidden justify-center lg:flex">
                  <Marker state={c} />
                </span>
              ))}

              {/* Below md the five states become a compact labelled row,
                  so no role is dropped and nothing scrolls sideways. */}
              <span className="flex flex-wrap gap-x-4 gap-y-1.5 lg:hidden">
                {row.cells.map((c, i) => (
                  <span key={ROLES[i]} className="flex items-center gap-1.5">
                    <Marker state={c} />
                    <span style={{ ...LABEL, letterSpacing: "0.08em", color: "rgba(245,245,247,0.5)" }}>{ROLES[i]}</span>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </motion.div>
      ))}

      <div
        className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-3"
        style={{ background: "rgba(0,0,0,0.28)", borderTop: `1px solid ${RULE}` }}
      >
        {(["yes", "approval", "no"] as Cell[]).map((s) => (
          <span key={s} className="flex items-center gap-2">
            <Marker state={s} />
            <span style={{ ...LABEL, letterSpacing: "0.08em", color: "rgba(245,245,247,0.6)" }}>{STATE_LABEL[s]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export { JAKARTA };

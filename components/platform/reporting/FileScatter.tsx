import { MONO } from "@/components/platform/shared";

/**
 * The HQ file scatter: fourteen documents fly in from off-panel and
 * collapse into one master spreadsheet.
 *
 * It replaces a flat cloud of filename chips and the line "Twelve files,
 * four people, one number that should have one answer." **That line is
 * deleted and does not come back**: the animation makes the point, and
 * the caption was the artifact explaining itself.
 *
 * ── The two things that are easy to get wrong ──────────────
 * 1. **Every delay is negative.** That is what puts each file mid-flight
 *    on first paint, so the frenzy is already happening rather than
 *    starting politely when the section scrolls in. The durations are
 *    deliberately mismatched so the swarm never syncs into a pulse. Do
 *    not round either to a common value.
 * 2. **`translate(-50%,-50%)` must appear in every keyframe.** It is what
 *    centres each item on the convergence point; drop it from one frame
 *    and the items jump sideways mid-flight.
 *
 * Reduced motion is handled in globals.css and needs its own override,
 * not just `animation: none`: `rp-file-fly` starts at `opacity: 0`, so
 * killing the animation alone empties the panel. See the note there.
 */

type Kind = "xlsx" | "csv" | "png" | "pptx" | "pdf" | "email";

/** Colour, tint, and badge per file type. Mixed types are the point: a
    reader should register spreadsheets, a deck, a chart and loose email
    threads, not fourteen copies of one icon. */
const TYPE: Record<Kind, { color: string; tint: string; badge?: string }> = {
  xlsx:  { color: "var(--ok)",              tint: "rgba(13,124,88,.13)",  badge: "XLS" },
  csv:   { color: "var(--purple)",          tint: "rgba(124,58,237,.13)", badge: "CSV" },
  png:   { color: "var(--ed-accent-text)",  tint: "rgba(0,119,168,.12)",  badge: "PNG" },
  pptx:  { color: "var(--warn)",            tint: "rgba(180,83,9,.13)",   badge: "PPT" },
  pdf:   { color: "var(--bad)",             tint: "rgba(180,35,24,.11)",  badge: "PDF" },
  email: { color: "var(--warn)",            tint: "rgba(180,83,9,.13)" },
};

/* Filenames are approved copy, verbatim. The three messy ones carry the
   argument that half of this is email rather than files. `small` marks
   the six dropped below md, where the panel is too narrow for fourteen. */
const ITEMS: {
  name: string; kind: Kind; dx: number; dy: number; r: number; dur: number; delay: number; small?: boolean;
}[] = [
  { name: "week-42-v7",         kind: "xlsx",  dx: -286, dy: -236, r: -13, dur: 7.4, delay: 0,    small: true },
  { name: "RE: RE: numbers",    kind: "email", dx:  272, dy: -246, r:  11, dur: 8.1, delay: -1.2, small: true },
  { name: "rollup-FINAL",       kind: "xlsx",  dx: -336, dy: -132, r:   8, dur: 6.9, delay: -2.4, small: true },
  { name: "attach-by-store",    kind: "csv",   dx:  322, dy: -140, r:  -9, dur: 7.7, delay: -3.5, small: true },
  { name: "P&L-chart",          kind: "png",   dx: -208, dy: -272, r:  14, dur: 8.4, delay: -4.6, small: true },
  { name: "deck-v2-final",      kind: "pptx",  dx:  198, dy: -276, r: -12, dur: 7.1, delay: -5.4, small: true },
  { name: "FW: which version?", kind: "email", dx: -352, dy:  -48, r:  -7, dur: 8.8, delay: -0.7, small: true },
  { name: "labour-hours-v4",    kind: "xlsx",  dx:  346, dy:  -56, r:  10, dur: 6.6, delay: -1.9, small: true },
  { name: "q3-numbers-v3",      kind: "xlsx",  dx: -142, dy: -288, r: -15, dur: 7.9, delay: -3.1 },
  { name: "regional-rollup",    kind: "xlsx",  dx:  134, dy: -292, r:   9, dur: 8.6, delay: -4.2 },
  { name: "store-audit",        kind: "pdf",   dx: -256, dy: -182, r:  12, dur: 7.2, delay: -5.9 },
  { name: "sending mine over",  kind: "email", dx:  248, dy: -196, r: -10, dur: 8.3, delay: -6.7 },
  { name: "rollup-v11",         kind: "xlsx",  dx:  -86, dy: -250, r:   6, dur: 6.8, delay: -2.8 },
  { name: "bookings-export",    kind: "csv",   dx:   74, dy: -256, r:  -8, dur: 7.6, delay: -4.9 },
];

/** A real page shape with a folded corner, not a rounded rectangle. */
function DocGlyph({ kind }: { kind: Kind }) {
  const t = TYPE[kind];
  return (
    <svg width={46} height={58} viewBox="0 0 46 58" fill="none" aria-hidden="true">
      <path d="M1 5a4 4 0 014-4h22l18 18v34a4 4 0 01-4 4H5a4 4 0 01-4-4z" fill="var(--ed-card)" stroke="var(--ed-border)" strokeWidth={1.4} />
      <path d="M27 1l18 18H31a4 4 0 01-4-4z" fill={t.tint} stroke="var(--ed-border)" strokeWidth={1.4} />
      <path d="M9 22h16" stroke="var(--ed-border)" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M9 26h11" stroke="var(--ed-border)" strokeWidth={1.6} strokeLinecap="round" />
      <rect x={8} y={30} width={30} height={16} rx={3} fill={t.tint} />
      <text x={23} y={41.5} textAnchor="middle" style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, fill: t.color }}>
        {t.badge}
      </text>
    </svg>
  );
}

function MailGlyph() {
  const t = TYPE.email;
  return (
    <svg width={46} height={56} viewBox="0 0 46 56" fill="none" aria-hidden="true">
      <rect x={1} y={9} width={44} height={34} rx={4} fill="var(--ed-card)" stroke="var(--ed-border)" strokeWidth={1.4} />
      <rect x={1} y={9} width={44} height={8} rx={4} fill={t.tint} />
      <path d="M3 13l20 15 20-15" stroke={t.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function FileScatter() {
  return (
    /* `overflow: hidden` is load-bearing: it is what makes the files look
       like they come from off-panel rather than materialising inside it.
       The negative margin lets them pass under the card's padding first. */
    <div data-anim="true" className="rp-scatter relative -mx-2 overflow-hidden" style={{ height: 312 }}>
      {ITEMS.map((it) => (
        <span
          key={it.name}
          className={`rp-file absolute flex flex-col items-center gap-[5px] ${it.small ? "" : "hidden md:flex"}`}
          style={{
            left: "50%",
            top: 206,
            width: 104,
            filter: "drop-shadow(0 10px 18px rgba(12,20,36,.16))",
            ["--dx" as string]: `${it.dx}px`,
            ["--dy" as string]: `${it.dy}px`,
            ["--r" as string]: `${it.r}deg`,
            animationDuration: `${it.dur}s`,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.kind === "email" ? <MailGlyph /> : <DocGlyph kind={it.kind} />}
          <span
            className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-center"
            style={{ fontFamily: MONO, fontSize: 10, lineHeight: 1.25, color: "var(--ed-fg-muted)", maxWidth: 104 }}
          >
            {it.name}
          </span>
        </span>
      ))}

      {/* The master document. z-2 so files pass BEHIND it, and they shrink
          as they arrive so it is never buried. */}
      <div
        className="absolute flex flex-col gap-[9px] rounded-xl"
        style={{
          left: "50%", bottom: 4, transform: "translateX(-50%)", zIndex: 2, width: 186,
          background: "var(--ed-card)", border: "1.5px solid var(--ed-border)",
          padding: "14px 16px", boxShadow: "0 16px 34px -20px rgba(12,20,36,.55)",
        }}
      >
        <span className="flex items-center gap-2">
          <span
            className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-md"
            style={{ background: "rgba(180,83,9,.12)", color: "var(--warn)" }}
            aria-hidden="true"
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <rect x={3} y={4} width={18} height={16} rx={2} />
              <path d="M3 9h18 M9 9v11" />
            </svg>
          </span>
          <span className="ed-fg" style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700 }}>the-real-one.xlsx</span>
        </span>
        <span className="flex flex-col gap-1.5" aria-hidden="true">
          {["100%", "74%", "88%"].map((w) => (
            <span key={w} className="block" style={{ height: 5, width: w, borderRadius: 99, background: "var(--track)" }} />
          ))}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "var(--warn)" }}>
          EDITED BY 4 PEOPLE
        </span>
      </div>
    </div>
  );
}

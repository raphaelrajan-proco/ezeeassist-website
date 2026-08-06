"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { JAKARTA, MONO } from "@/components/platform/shared";
import { vendorLogo } from "@/lib/data/integration-logos";

/**
 * The "opportunity across your whole stack" hub diagram.
 *
 * Eight source systems on the left flow into the EZee Assist lockup in the
 * middle, and three products flow out on the right. It replaces four
 * coloured progress bars plus a full-width multi-colour bar and a
 * 23-of-300 count, which needed a caption to stop the bar and the count
 * reading as a contradiction. A diagram that shows the join does not.
 *
 * **The stage is a fixed 1096x510 coordinate system and does not
 * reflow.** The SVG viewBox and the absolutely positioned HTML are 1:1 at
 * that size, which is the only reason the wires meet the chips exactly.
 * Do not nudge individual positions to fit a width: every wire endpoint is
 * hard-coded to a chip or card centre. Below `lg` there is not enough room
 * to scale it and stay legible, so a stacked static version renders
 * instead, with no wires and no dots.
 *
 * Two hues carry the direction of travel: periwinkle in, green out. Data
 * in, product out. Two of the eight inbound dots run in reverse so a
 * couple of lines read as two-way rather than everything marching inward.
 *
 * Wholly decorative. The SVG, every dot and every icon are `aria-hidden`;
 * chip logos take `alt=""` because the visible name labels them, and the
 * hub lockup keeps its name. Nothing here is focusable.
 */

const STAGE_W = 1096;
const STAGE_H = 510;
/** The handoff's stated floor: the diagram holds together down to ~900. */
const MIN_STAGE_W = 900;

const ACCENT = "#A9B6FF";
const OUT = "#8FE3C0";
const PAPER = "#EEF2F8";

/**
 * `domain` is the key into `VENDOR_LOGOS`, so these chips and the
 * Integrations directory resolve their marks from one place.
 *
 * **Every chip here resolves to a real mark.** Two did not: SharePoint's
 * file was the generic four-square Microsoft logo until a product mark
 * replaced it, and ADP had no entry in `VENDOR_LOGOS` at all, so its chip
 * silently drew the neutral plate. ADP is now Dropbox, which has a mark
 * and is as plausible a system for this diagram.
 *
 * The plate still exists for anything that resolves to null, and is the
 * same 15px box as a real mark so the chip keeps its exact width and the
 * wires keep meeting it.
 *
 * Never point these at a favicon service at runtime. The prototype did,
 * and it is rate limited, unversioned, and returns a generic globe often
 * enough to be a liability on a page that names customers' systems. The
 * files are fetched once and committed.
 */
const CHIPS: { name: string; domain: string; cy: number }[] = [
  { name: "Mindbody", domain: "mindbodyonline.com", cy: 45 },
  { name: "Toast", domain: "toasttab.com", cy: 105 },
  { name: "QuickBooks", domain: "quickbooks.intuit.com", cy: 165 },
  { name: "Salesforce", domain: "salesforce.com", cy: 225 },
  { name: "SharePoint", domain: "sharepoint.com", cy: 285 },
  { name: "Slack", domain: "slack.com", cy: 345 },
  { name: "Dropbox", domain: "dropbox.com", cy: 405 },
  { name: "Mailchimp", domain: "mailchimp.com", cy: 465 },
];

/** Inbound wire for a chip centred at `cy`, ending at the hub's left edge. */
const inPath = (cy: number) => `M200 ${cy} C 330 ${cy}, 396 250, 452 250`;

/** Outbound wires from the hub's right edge to each card centre. */
const OUT_PATHS = [
  "M648 250 C 726 250, 770 120, 872 120",
  "M648 250 C 726 250, 770 250, 872 250",
  "M648 250 C 726 250, 770 380, 872 380",
];

/* Out of phase by design: a shared delay would march all eight dots in
   lockstep and read as one pulse rather than continuous flow. */
const IN_DELAYS = [0, -0.55, -1.1, -1.65, -2.2, -2.75, -3.3, -3.85];
const OUT_DELAYS = [0, -1.2, -2.4];
/** QuickBooks and Slack, so a couple of lines read as two-way. */
const REVERSED = new Set([2, 5]);

const CARDS: { title: string; body: string; d: string; cy: number }[] = [
  { title: "Insights", body: "Opportunities surfaced, ranked by value", cy: 120, d: "M4 12.5l5 5L20 6.5" },
  { title: "Reports", body: "Any cut, on any cadence, written for the reader", cy: 250, d: "M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6" },
  { title: "Dashboards", body: "Live views, scoped to every role", cy: 380, d: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z" },
];

function Icon({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** The 15px logo box, real mark or neutral plate. Same size either way. */
function ChipLogo({ domain }: { domain: string }) {
  const logo = vendorLogo(domain)?.src;
  if (!logo) {
    return (
      <span
        className="flex-none rounded-[3px]"
        style={{ width: 15, height: 15, background: "#D8DDE5", border: "1px solid #C3CAD4" }}
        aria-hidden="true"
      />
    );
  }
  return <Image src={logo} alt="" width={15} height={15} className="flex-none rounded-[3px] object-contain" style={{ width: 15, height: 15 }} />;
}

/**
 * `fluid` is for the stacked fallback only. Inside the stage the width is
 * a hard 186 because the wires end at that edge; outside it there is no
 * wire to meet and a fixed 186 blows two columns past a 375 viewport.
 */
function Chip({ name, domain, fluid = false }: { name: string; domain: string; fluid?: boolean }) {
  return (
    <span
      className="flex min-w-0 items-center gap-2 rounded-[10px]"
      style={{ width: fluid ? "100%" : 186, height: 38, padding: "0 13px", background: "#FFFFFF", color: "#0A0A0A", fontSize: 12.5, fontWeight: 600 }}
    >
      <ChipLogo domain={domain} />
      <span className="truncate">{name}</span>
    </span>
  );
}

function Hub() {
  return (
    <span
      className="rh-hub flex items-center justify-center rounded-[18px]"
      style={{ width: 196, height: 88, padding: "0 20px", background: "#FFFFFF" }}
    >
      {/* The full horizontal lockup, not the flower alone and not the
          flower over hand-set type. The white plate is what lets a
          black-and-blue logo read on this band. */}
      <Image src="/logo-black.svg" alt="EZee Assist" width={156} height={40} style={{ width: "100%", height: "auto" }} />
    </span>
  );
}

function Card({ title, body, d, fluid = false }: { title: string; body: string; d: string; fluid?: boolean }) {
  return (
    <span
      className="flex flex-col gap-[5px] rounded-[14px]"
      style={{ width: fluid ? "100%" : 224, padding: "16px 18px", background: "rgba(169,182,255,.07)", border: "1px solid rgba(169,182,255,.35)" }}
    >
      <span className="flex items-center gap-2">
        <Icon d={d} />
        <h3 style={{ fontFamily: JAKARTA, fontSize: 16.5, fontWeight: 700, color: PAPER }}>{title}</h3>
      </span>
      <span className="text-[12.5px] leading-[1.5]" style={{ color: "rgba(238,242,248,.65)" }}>{body}</span>
    </span>
  );
}

const FOOTER = "250+ CONNECTIONS · READ AND WRITTEN AT THE SOURCE · NOTHING MIGRATES";

export default function StackHub() {
  const wrap = useRef<HTMLDivElement>(null);
  /** null until measured, so the stage never flashes at the wrong size. */
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const read = () => {
      const w = el.clientWidth;
      setScale(w >= MIN_STAGE_W ? Math.min(1, w / STAGE_W) : 0);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stacked = scale === 0;

  return (
    <div ref={wrap} className="w-full">
      {/* Stacked fallback. Rendered when the stage cannot fit at a legible
          scale, and on the server, so there is markup either way. */}
      {(stacked || scale === null) && (
        <div className={`flex flex-col items-center gap-7 ${scale === null ? "lg:hidden" : ""}`}>
          <div className="grid w-full max-w-[420px] grid-cols-2 gap-2.5">
            {CHIPS.map((c) => (
              <Chip key={c.name} name={c.name} domain={c.domain} fluid />
            ))}
          </div>
          <Hub />
          <div className="flex w-full max-w-[420px] flex-col gap-3">
            {CARDS.map((c) => (
              <Card key={c.title} title={c.title} body={c.body} d={c.d} fluid />
            ))}
          </div>
          <span className="max-w-full text-center leading-[1.6]" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "rgba(238,242,248,.45)", overflowWrap: "anywhere" }}>
            {FOOTER}
          </span>
        </div>
      )}

      {/* The stage. `height` is the scaled height so the section reserves
          the right space; the inner box keeps its true 1096x510 and is
          scaled from the top centre. */}
      {!stacked && scale !== null && (
        <div className="mx-auto" style={{ width: "100%", height: STAGE_H * scale + 18 }}>
          <div
            data-anim="true"
            className="relative mx-auto"
            style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: "top center" }}
          >
            <svg
              className="absolute inset-0"
              width={STAGE_W}
              height={STAGE_H}
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              fill="none"
              aria-hidden="true"
            >
              {CHIPS.map((c) => (
                <path key={c.cy} d={inPath(c.cy)} stroke="rgba(169,182,255,.28)" strokeWidth={1.5} fill="none" />
              ))}
              {OUT_PATHS.map((d) => (
                <path key={d} d={d} stroke="rgba(169,182,255,.28)" strokeWidth={1.5} fill="none" />
              ))}
            </svg>

            {/* Travelling dots. `offsetPath` must carry the SAME `d` as its
                wire or the dot drifts off the line. */}
            {CHIPS.map((c, i) => (
              <span
                key={`in-${c.cy}`}
                className="rh-dot absolute left-0 top-0 rounded-full"
                style={{
                  width: 6, height: 6, background: ACCENT,
                  offsetPath: `path('${inPath(c.cy)}')`,
                  animationName: "rh-travel",
                  animationDuration: "4.2s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${IN_DELAYS[i]}s`,
                  animationDirection: REVERSED.has(i) ? "reverse" : "normal",
                }}
                aria-hidden="true"
              />
            ))}
            {OUT_PATHS.map((d, i) => (
              <span
                key={`out-${i}`}
                className="rh-dot absolute left-0 top-0 rounded-full"
                style={{
                  width: 6, height: 6, background: OUT,
                  offsetPath: `path('${d}')`,
                  animationName: "rh-travel",
                  animationDuration: "3.6s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDelay: `${OUT_DELAYS[i]}s`,
                }}
                aria-hidden="true"
              />
            ))}

            {CHIPS.map((c) => (
              <span key={c.name} className="absolute" style={{ left: 0, top: c.cy - 19 }}>
                <Chip name={c.name} domain={c.domain} />
              </span>
            ))}

            <span className="absolute" style={{ left: 452, top: 206 }}>
              <Hub />
            </span>

            {CARDS.map((c) => (
              <span key={c.title} className="absolute" style={{ right: 0, top: c.cy - 44 }}>
                <Card title={c.title} body={c.body} d={c.d} />
              </span>
            ))}

            <span
              className="absolute inset-x-0 text-center"
              style={{ bottom: -8, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", color: "rgba(238,242,248,.45)" }}
            >
              {FOOTER}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * The always-on wall. Twenty-six moments from one day across the network
 * in four time bands. From lg up the section pins as a split screen: the
 * thesis holds still on the left while the page's own scroll drives the
 * card column on the right, one to one, like a page inside the page. The
 * band titles are dividers inside the scroller, the key sits fixed just
 * above it, and a fade at the column's top and bottom lets the incoming
 * divider show through dimmed, which is the cue that there is more to
 * scroll. Card tones are corner marks, not fills. When the last band is
 * spent the section simply hands off; the old counter block is gone.
 *
 * Tokens live on `.ed-wall` in globals.css, not here.
 */

const MONO = "var(--wl-mono)";
const JAKARTA = "var(--font-editorial)";

/* ── Stack logos ───────────────────────────────────────────
   Small integration marks in each card's meta row, replacing the old
   glyph set: the point is that the moments run on the systems the
   network already uses. Only cards that logically draw on a system
   carry logos; detection-only moments (a cooler alert, a competitor
   opening) carry none. Every file is committed under
   /public/logos/integrations; never reference a CDN from production. */

const STACK_LOGO: Record<string, string> = {
  stripe:      "/logos/integrations/stripe.svg",
  quickbooks:  "/logos/integrations/quickbooks.svg",
  xero:        "/logos/integrations/xero.svg",
  hubspot:     "/logos/integrations/hubspot.svg",
  mailchimp:   "/logos/integrations/mailchimp.svg",
  notion:      "/logos/integrations/notion.svg",
  airtable:    "/logos/integrations/airtable.svg",
  googledrive: "/logos/integrations/googledrive.svg",
  dropbox:     "/logos/integrations/dropbox.svg",
};

function StackLogos({ names }: { names?: string[] }) {
  if (!names?.length) return null;
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true" style={{ flex: "none" }}>
      {names.map((n) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={n} src={STACK_LOGO[n]} alt="" width={15} height={15} style={{ display: "block" }} />
      ))}
    </span>
  );
}

/* ── The twenty-six moments ────────────────────────────────
   TODO: replace with real log moments before launch. The handoff is
   explicit that invented moments read as invented to a franchisor, and
   that the timestamps matter most: 9:14am is credible where 9:00am is
   not. Keep the four bands and the mix of trigger types, swap the
   specifics.

   `tone` is assigned from what each card's own text says the system DID,
   rebalanced on request to roughly even detected and automated:
     neutral  the payoff is a flag, alert, hold, or surfaced intel: the
              system watched and told a human (alert sent, flagged for
              the owner, held for owner, "here is what the network did")
     accent   the payoff is finished work: something was drafted,
              assembled, answered, started, merged, or sent
     violet   franchisee-authored: an owner built it (three on the wall,
              one during the day and two on the longer clock)
   The split is 11 / 12 / 3. Surfacing network intel counts as detected,
   not automated: the system found something and reported it, even when
   what it found came from other locations. */

type Tone = "neutral" | "accent" | "violet";
type Card = { meta: string; title: string; body: string; tone: Tone; stack?: string[] };

const BANDS: { title: string; note?: string; cards: Card[] }[] = [
  {
    title: "Overnight",
    note: "while nobody is awake",
    cards: [
      { meta: "3:15am · all locations", title: "Expiring certifications pulled", body: "Six due in 30 days, reminders queued", stack: ["airtable"], tone: "neutral" },
      { meta: "3:40am · Store #519",    title: "Inventory hit critical",  body: "Reorder drafted at approved pricing", stack: ["quickbooks"], tone: "accent" },
      { meta: "4:00am · West territory", title: "Coach brief assembled",  body: "12 locations, ranked by need", stack: ["hubspot"], tone: "accent" },
      /* Moved up from "Before the doors open" by request. Its timestamp
         moved with it: the bands are a chronology, and a 7:00am card
         sitting in Overnight read as a bug next to a band that opens at
         5:45am. The prep genuinely runs before anyone arrives. */
      { meta: "4:30am · Store #402",    title: "New hire starts today",   body: "Day-one sequence started", tone: "accent" },
    ],
  },
  {
    title: "Before the doors open",
    cards: [
      { meta: "5:45am · all locations", title: "Overnight questions cleared", body: "14 answered from the manual, 2 held for HQ", stack: ["notion"], tone: "accent" },
      { meta: "6:00am · Store #331", title: "Soft week detected",    body: "62% booked · reactivation draft ready", stack: ["hubspot", "mailchimp"], tone: "neutral" },
      { meta: "6:30am · Store #052", title: "Attach rate slipping",  body: "Top-quartile locations run a 30 second add-on script. Here it is.", stack: ["stripe"], tone: "neutral" },
      { meta: "7:40am · Store #144", title: "Morning huddle brief ready", body: "Yesterday's numbers and today's bookings, one card", stack: ["googledrive"], tone: "accent" },
    ],
  },
  {
    title: "During the day",
    cards: [
      { meta: "10:05am · Store #214", title: "Started a national retail proposal", body: "4 locations have quoted this. Range, terms, and win rate attached.", stack: ["googledrive", "hubspot"], tone: "accent" },
      { meta: "11:40am · Store #263", title: "One-star review posted",           body: "Response drafted, held for owner", tone: "neutral" },
      { meta: "1:20pm · Store #052",  title: "Local campaign assembled",         body: "Hours and offer merged into the brand template", stack: ["mailchimp"], tone: "accent" },
      /* The same closing audit the on demand section shows being built.
         Deliberate continuity across sections, not duplication. */
      { meta: "3:45pm · Store #214",  title: "An owner built a closing audit",   body: "Photo checklist per station. Live in twenty minutes, no developer.", tone: "violet" },
    ],
  },
  {
    title: "On a longer clock",
    cards: [
      { meta: "14 days out · Store #263",  title: "Insurance lapsing", body: "Owner notified, task opened", tone: "neutral" },
      { meta: "Week 6 · Store #402",       title: "Ramp behind cohort", body: "What the fastest 10 openings did in week 6, in order", tone: "accent" },
      { meta: "First Monday · Store #144", title: "An owner built a P&L digest", body: "Emailed to their managers, numbers filled in", stack: ["quickbooks"], tone: "violet" },
      { meta: "Every October · Store #519", title: "An owner built a winter prep checklist", body: "Site-by-site steps, scheduled each fall", tone: "violet" },
    ],
  },
];

/* The tone is carried by a corner mark, not a fill, by request: every
   card shares the same white surface and only the top-left corner border
   states the category. The meta row repeats the colour as a secondary
   cue. The legend draws the same corner shape, which is what makes the
   mark decodable. */
const TONE: Record<Tone, { corner: string; meta: string; dim?: boolean }> = {
  neutral: { corner: "var(--wl-muted)",  meta: "var(--wl-muted)", dim: true },
  accent:  { corner: "var(--wl-accent)", meta: "var(--wl-accent)" },
  violet:  { corner: "var(--wl-violet)", meta: "var(--wl-violet)" },
};

/** The top-left corner border that states a card's tone. Shared with the
    legend so the key shows the exact mark the cards wear. */
function CornerMark({ tone, size = 22 }: { tone: Tone; size?: number }) {
  const t = TONE[tone];
  const stroke = size < 16 ? 2.5 : 3;
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute", top: -1, left: -1, width: size, height: size,
        borderTop: `${stroke}px solid ${t.corner}`, borderLeft: `${stroke}px solid ${t.corner}`,
        borderTopLeftRadius: Math.min(14, Math.round(size * 0.55)),
        opacity: t.dim ? 0.55 : 1, pointerEvents: "none",
      }}
    />
  );
}

/* ── Scroll plumbing ───────────────────────────────────────
   The section pins for the length of its scroll track and the page's own
   scroll maps one to one onto the card column's translate, so nothing
   hijacks the wheel: a notch of page scroll moves the cards a notch. The
   transform is written straight to the DOM in a rAF, not through state,
   so the 26-card tree does not re-render sixty times a second; only the
   active tag index goes through React.

   PAD is the stack's own vertical padding and the depth of the fade mask
   at each end of the viewport: at either extreme the resting band sits
   clear of the fade, and anything beyond it shows through dimmed. */
/* Trimmed from 48 when the key moved tight against the compartment. */
const PAD = 40;
/* Shallower at the bottom, so the last band does not sit in a deep dead
   zone before the section hands off. */
const PAD_BOTTOM = 28;
const FADE = `linear-gradient(to bottom, transparent 0px, black ${PAD}px, black calc(100% - ${PAD_BOTTOM}px), transparent 100%)`;
/* Server-render fallback for the track height; replaced by the measured
   stack overflow on mount. */
const DEFAULT_RANGE = 1400;

/** Pinning and the split layout are desktop only. Below lg the bands stack. */
function useIsDesktop() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

/* ── Pieces ────────────────────────────────────────────── */

function MomentCard({ card }: { card: Card }) {
  const t = TONE[card.tone];
  return (
    <div
      className="relative flex flex-col gap-[7px] p-4"
      style={{
        background: "var(--wl-panel)",
        border: "1px solid var(--wl-border)",
        borderRadius: 14,
        boxShadow: "var(--wl-shadow)",
      }}
    >
      <CornerMark tone={card.tone} />
      {/* Meta row: the moment's timestamp, with the systems it draws on
          as small committed logo marks. justify-between parks the logos
          on the right so they read as provenance, not decoration. */}
      <div className="flex items-center justify-between gap-2" style={{ color: t.meta }}>
        <span style={{ fontFamily: MONO, fontSize: 11.5 }}>{card.meta}</span>
        <StackLogos names={card.stack} />
      </div>
      <div style={{ fontFamily: JAKARTA, fontSize: 16, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--wl-text)" }}>
        {card.title}
      </div>
      <div className="text-[13.5px]" style={{ lineHeight: 1.45, color: "var(--wl-muted)" }}>
        {card.body}
      </div>
    </div>
  );
}

/** The divider that names each time band, inside the scroller itself:
    the incoming band's title peeking through the bottom fade is the cue
    that there is more to scroll. */
/* ── Closing CTAs ──────────────────────────────────────────
   Two buttons at the bottom right of the compartment, after the last
   band. Sized to the nav's "Speak to an expert" (Button size="sm":
   px-5 py-2, text-sm, semibold, pill), so the three read as one family.

   The filled one is #0077A8, a step darker than the nav's #00AEEF as
   asked. That is also the only value of the two that may legally carry
   white text: #00AEEF under white measures 2.53:1 and fails, #0077A8 is
   4.99:1. It stays fixed in both themes, since white-on-fill contrast
   does not care what surrounds it. See DESIGN.md.

   TODO: "Generate your own" points at /speak-to-an-expert until the
   workflow generator ships at /workflow-generator, then repoint it.
   Shipping a button to a route that does not exist yet costs more than
   shipping one that lands somewhere useful. */

const CTA_BASE =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AEEF]";

function BandCtas({ innerRef, className = "" }: {
  innerRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  return (
    <div ref={innerRef} className={`flex flex-wrap items-center justify-end gap-3 ${className}`}>
      <Link
        href="/platform/workflows"
        className={`${CTA_BASE} hover:opacity-80`}
        style={{
          /* Inset shadow rather than a border: a real border adds 3px to
             the box and left this button 2px taller than the filled one
             beside it and than the nav button both are sized to. */
          boxShadow: "inset 0 0 0 1.5px var(--wl-accent)",
          color: "var(--wl-accent)",
          backgroundColor: "transparent",
        }}
      >
        See more workflows
      </Link>
      <Link
        href="/speak-to-an-expert"
        className={`${CTA_BASE} hover:brightness-110`}
        style={{ backgroundColor: "#0077A8", color: "#FFFFFF" }}
      >
        Generate your own
      </Link>
    </div>
  );
}

function BandHeading({ band }: { band: (typeof BANDS)[number] }) {
  return (
    <div className="flex items-center gap-4 pb-[18px]">
      <span style={{ fontFamily: JAKARTA, fontSize: 19, fontWeight: 700, letterSpacing: "-0.018em", color: "var(--wl-text)" }}>
        {band.title}
      </span>
      {band.note && (
        <span className="text-[13.5px] hidden sm:inline" style={{ color: "var(--wl-muted)" }}>{band.note}</span>
      )}
      <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--wl-rule)" }} />
    </div>
  );
}

/** The key, on its own grey chip so it does not float loose on the
    white band. Full width, matching the scroller under it, by request.
    Its swatches are filled rounded squares rather than the cards'
    corner shape: at key size a solid fill reads faster than a hairline
    corner. */
function Legend() {
  return (
    <div
      className="flex w-full flex-wrap items-center gap-x-[18px] gap-y-1.5 rounded-xl px-4 py-2.5"
      style={{
        background: "rgba(var(--wl-band-ink), 0.1)",
        border: "1px solid rgba(var(--wl-band-ink), 0.06)",
      }}
    >
      {[
        { tone: "neutral" as Tone, label: "Detected and flagged for you" },
        { tone: "accent" as Tone,  label: "Automated play, work done for you" },
        { tone: "violet" as Tone,  label: "Built by an owner" },
      ].map((l) => (
        <span key={l.label} className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--wl-muted)" }}>
          <span
            aria-hidden="true"
            className="block flex-none"
            style={{
              width: 10, height: 10, borderRadius: 3,
              background: TONE[l.tone].corner,
              opacity: TONE[l.tone].dim ? 0.65 : 1,
            }}
          />
          {l.label}
        </span>
      ))}
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */

export default function AlwaysOn() {
  const isDesktop = useIsDesktop();

  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headRowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [range, setRange] = useState(DEFAULT_RANGE);
  /* The scroller's height in px, set explicitly rather than derived from
     the flex/grid chain. The first build sized it `flex-1` inside an
     auto-sized grid row: Chrome resolved the percentage chain, Safari
     treated it as auto, the viewport grew to the full stack height,
     `range` collapsed to 1 and the section never pinned. It rendered as
     one long static wall. A measured pixel height cannot be lost to that
     ambiguity. The cap keeps the container to roughly one band plus the
     peek even on very tall viewports and in full-page captures, which
     expand 100vh. */
  const [vpH, setVpH] = useState(560);
  /* The pinned box's own height: its content, not 100vh. On viewports
     taller than the content, a full-screen sticky left its unused
     bottom as a dead white band between this section and the next; a
     content-fitted box ends where the compartment ends, so the next
     section shows beneath it instead. */
  const [stickyH, setStickyH] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;
    const track = trackRef.current, grid = gridRef.current, headRow = headRowRef.current,
      viewport = viewportRef.current, stack = stackRef.current;
    if (!track || !grid || !headRow || !viewport || !stack) return;

    let raf = 0;
    /* The pin holds until the LAST divider reaches the top of the
       scroller, not merely until the stack bottom meets the viewport
       bottom: on tall viewports the final band fit with its title only
       part-way up, so the key and the whole compartment scrolled away
       while "On a longer clock" was still mid-screen. The range is the
       larger of the natural overflow and the translate that rests the
       last band's title just under the top fade. */
    const rangeRef = { current: 1 };
    const read = () => {
      raf = 0;
      const top = track.getBoundingClientRect().top + window.scrollY;
      const y = Math.max(0, Math.min(rangeRef.current, window.scrollY - top));
      stack.style.transform = `translate3d(0, ${-y}px, 0)`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(read); };
    const measure = () => {
      /* Every fixed cost above the scroller, in resolved pixels: the
         grid's own top padding (nav clearance), the key with its
         padding, and the grid's bottom padding. None of these depend on
         the scroller's height, so there is no feedback loop. */
      const padTop = parseFloat(getComputedStyle(grid).paddingTop) || 92;
      /* Matched to padTop in the markup, so the gap below the buttons
         equals the gap above the "Always on" label. Read rather than
         hardcoded, so the two cannot drift apart. */
      const padBottom = parseFloat(getComputedStyle(grid).paddingBottom) || padTop;
      const headH = headRow.getBoundingClientRect().height;
      const ctaH = ctaRowRef.current?.getBoundingClientRect().height ?? 0;
      const vh = Math.round(
        Math.min(720, Math.max(320, window.innerHeight - padTop - headH - ctaH - padBottom)),
      );
      const bands = bandRefs.current.filter(Boolean) as HTMLDivElement[];
      const last = bands[bands.length - 1];
      /* Both rects carry the same translate, so this is static. */
      const lastTop = last
        ? Math.round(last.getBoundingClientRect().top - stack.getBoundingClientRect().top)
        : 0;
      const r = Math.max(1, stack.scrollHeight - vh, lastTop - PAD);
      rangeRef.current = r;
      setVpH(vh);
      setStickyH(Math.round(padTop + headH + vh + ctaH + padBottom));
      setRange(r);
      schedule();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stack);
    ro.observe(headRow);
    /* The buttons wrap to a second line on narrow desktop widths, which
       changes the pinned box's height. */
    if (ctaRowRef.current) ro.observe(ctaRowRef.current);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
      stack.style.transform = "";
    };
  }, [isDesktop]);

  /* ── Below lg: no pin, every band stacked ── */
  if (!isDesktop) {
    return (
      <section id="always-on" className="ed-wall w-full scroll-mt-24" style={{ backgroundColor: "var(--wl-bg)" }}>
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 flex flex-col gap-9">
          <div className="flex flex-col gap-3 max-w-[900px]">
            <div
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--wl-muted)" }}
            >
              Always on
            </div>
            <h2
              style={{
                fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.1,
                /* EZee blue, via the token so the light band gets the
                   darker pass-rated value and dark gets the brand hue. */
                color: "var(--wl-accent)",
                fontSize: "clamp(1.25rem, 0.25rem + 2vw, 2rem)",
              }}
            >
              Coaching amplified across every location. At the hours it matters most.
            </h2>
            <p className="max-w-[780px]" style={{ lineHeight: 1.5, color: "var(--wl-muted)", fontWeight: 400, fontSize: "calc(0.75 * clamp(1.25rem, 0.25rem + 2vw, 2rem))" }}>
              Nobody pulled any of this. Each play orchestrated by a coach once, and
              some plays built directly from what the rest of your network already learned.
            </p>
            <Legend />
          </div>
          {BANDS.map((b) => (
            <div key={b.title}>
              <BandHeading band={b} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {b.cards.map((c) => <MomentCard key={c.title} card={c} />)}
              </div>
            </div>
          ))}
          {/* The section's py-16 already makes the bottom margin match
              the top, so nothing extra is needed here. */}
          <BandCtas />
        </div>
      </section>
    );
  }

  /* ── lg and up: pinned split screen ──
     Left holds the thesis, right scrolls the day. The track wrapper's
     extra height is exactly the stack's overflow, so page scroll and
     card scroll run one to one. The band titles are dividers inside the
     scroller: at rest the next one peeks through the bottom fade, which
     is the cue that there is more. */
  return (
    <section id="always-on" className="ed-wall w-full scroll-mt-24" style={{ backgroundColor: "var(--wl-bg)" }}>
      <div
        ref={trackRef}
        className="relative"
        style={{ height: stickyH ? stickyH + range : `calc(100vh + ${range}px)` }}
      >
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: stickyH || "100vh" }}
        >
          <div
            ref={gridRef}
            className="mx-auto flex h-full max-w-7xl flex-col px-6 md:px-12 lg:px-16"
            style={{
              /* Just clear of the floating nav pill, no more: extra
                 padding here read as a hole at the top. */
              paddingTop: "calc(var(--nav-block) + 4px)",
              /* Matched to the top by request, so the gap under the
                 buttons equals the gap above the "Always on" label.
                 The measure() below reads both, so changing one here
                 keeps the pinned box the right height on its own. */
              paddingBottom: "calc(var(--nav-block) + 4px)",
            }}
          >
            {/* Header across the whole section, the on-demand format:
                mono eyebrow over a full-width headline, the headline in
                EZee blue as before, then the thesis line. Everything
                above the viewport is measured as one block. */}
            <div ref={headRowRef} className="flex flex-col gap-3 pb-1.5">
              <div
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, letterSpacing: ".18em", color: "var(--wl-muted)" }}
              >
                Always on
              </div>
              <h2
                style={{
                  fontFamily: JAKARTA, fontWeight: 700, letterSpacing: "-0.028em", lineHeight: 1.1,
                  /* EZee blue, via the token so the light band gets the
                     darker pass-rated value and dark gets the brand hue. */
                  color: "var(--wl-accent)",
                  /* One line at ordinary desktop widths: the 71-char
                     string measures ~0.494px per char per 1px of font,
                     so the one-line ceilings are 25.5 at 1024, 30.7 at
                     1205 and 32.8 in the capped 1152 container. This
                     sits under each; re-derive if the copy changes. */
                  fontSize: "clamp(1.25rem, 0.25rem + 2vw, 2rem)",
                }}
              >
                Coaching amplified across every location. At the hours it matters most.
              </h2>
              {/* 0.75x the lead line, regular weight, by request. */}
              <p style={{ lineHeight: 1.5, color: "var(--wl-muted)", fontWeight: 400, fontSize: "calc(0.75 * clamp(1.25rem, 0.25rem + 2vw, 2rem))" }}>
                Nobody pulled any of this. Each play orchestrated by a coach once, and
                some plays built directly from what the rest of your network already learned.
              </p>
              {/* Breathing room above the key, and the key hugging the
                  compartment below it, by request. */}
              <div className="mt-2">
                <Legend />
              </div>
            </div>

            {/* The scroller, full width. The mask dims whatever crosses
                the top or bottom PAD, which is the faded glimpse of the
                next band. The height is the measured pixel value, never
                a percentage: see the note on vpH. */}
            <div
              ref={viewportRef}
              className="relative overflow-hidden"
              style={{ height: vpH, flex: "none", WebkitMaskImage: FADE, maskImage: FADE }}
            >
              <div
                ref={stackRef}
                className="flex flex-col gap-7"
                style={{ padding: `${PAD}px 0 ${PAD_BOTTOM}px`, willChange: "transform" }}
              >
                {BANDS.map((b, bi) => (
                  /* Divider then plate: the title inside the scroller
                     is what names each time frame, and the plates
                     still deepen through the day. Four tiles across,
                     now that the compartment spans the section. */
                  <div key={b.title} ref={(el) => { bandRefs.current[bi] = el; }}>
                    <BandHeading band={b} />
                    <div
                      className="grid grid-cols-4 gap-3 rounded-2xl p-3.5"
                      style={{ background: `rgba(var(--wl-band-ink), ${(0.05 + bi * 0.02).toFixed(3)})` }}
                    >
                      {b.cards.map((c) => <MomentCard key={c.title} card={c} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* After the last band, pinned to the bottom right of the
                compartment rather than riding inside the scroller,
                where the fade mask would dim them and they would only
                be clickable at the very end of the scroll. */}
            <BandCtas innerRef={ctaRowRef} className="pt-5" />
          </div>
        </div>
      </div>

    </section>
  );
}

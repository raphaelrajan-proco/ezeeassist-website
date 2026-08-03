"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "./shared";

/**
 * Proof, built from the quotes-scroll design handoff. Four customer
 * story cards stack on scroll: each is sticky at a staggered top offset,
 * so the next card rides up over the previous one and leaves its
 * coloured edge bar showing, like a deck.
 *
 * The mechanic is pure CSS sticky. No scroll listeners, no observers,
 * and it degrades to a plain stack under reduced motion by itself.
 *
 * Below lg the three-column grid would crush, so the card switches to a
 * single column: logo panel, headline, stat and CTA, then the quote.
 */

const JAKARTA = "var(--font-editorial)";

type Story = {
  brand: string;
  edge: string;
  haze: { c1: string; c2: string; c3: string; base: string };
  logo: string;
  logoAlt: string;
  logoW: number;
  logoRounded?: boolean;
  headline: [string, string];
  statLead: string;
  statRest: string;
  cta: string;
  href: string;
  quote: string;
  photo: string;
  name: string;
  role: string;
  /* Staggered sticky offsets are what leave each covered card's edge
     bar peeking above the next one. 18px apart, per the handoff. */
  top: number;
};

const STORIES: Story[] = [
  {
    brand: "DekaLash",
    edge: "oklch(0.55 0.16 350)",
    haze: { c1: "oklch(0.8 0.16 345)", c2: "oklch(0.7 0.19 345)", c3: "oklch(0.97 0.02 345)", base: "oklch(0.92 0.05 345)" },
    logo: "/logos/stories/dekalash.png", logoAlt: "DekaLash", logoW: 250,
    headline: ["Answers owners trust,", "around the clock"],
    statLead: "94%", statRest: "AI deflection on the Mindbody migration",
    cta: "View DekaLash's case study", href: "/case-studies/dekalash",
    quote: "AI is now an expectation in franchisee support. Our owners get accurate, brand-specific answers 24/7, not generic internet advice, while our team focuses on bigger initiatives. It's become part of daily operations, with franchisees telling each other, 'Use Alpha!'",
    photo: "/photos/troy-mccullen-cut.png", name: "Troy McCullen", role: "Vice President of Operations, DekaLash",
    top: 24,
  },
  {
    brand: "WSI",
    edge: "#00AEEF",
    haze: { c1: "oklch(0.72 0.12 250)", c2: "oklch(0.62 0.15 255)", c3: "oklch(0.95 0.03 240)", base: "oklch(0.91 0.05 250)" },
    logo: "/logos/stories/wsi.svg", logoAlt: "WSI", logoW: 190,
    headline: ["One search across", "every geography"],
    statLead: "67%", statRest: "ticket reduction in 30 days",
    cta: "View WSI's case study", href: "/case-studies/wsi",
    quote: "EZee Assist is much more than just a chatbot. It truly made universal search possible at WSI, levelling the playing field for our franchisees across geographies and languages. With a hands-on and effective implementation process, the EZee team have enabled strong adoption from the system, making the virtual AI agent a game-changer.",
    photo: "/photos/jeffrey-grant-cut.png", name: "Jeffrey Grant", role: "Systems Manager, WSI World",
    top: 42,
  },
  {
    brand: "DivaDance",
    edge: "oklch(0.5 0.16 300)",
    haze: { c1: "oklch(0.82 0.14 355)", c2: "oklch(0.72 0.17 340)", c3: "oklch(0.96 0.03 350)", base: "oklch(0.93 0.04 350)" },
    logo: "/logos/stories/divadance.png", logoAlt: "DivaDance", logoW: 150,
    headline: ["Human-power back to", "coaching and growth"],
    statLead: "650+", statRest: "support hours saved in six months",
    cta: "View DivaDance's case study", href: "/case-studies/divadance",
    quote: "Since we implemented EZee Assist, my owners not only get faster answers to their questions and a shorter path to the resources we have for them, but my human-power has been reallocated to coaching, relationship building, and innovation. The impact of that has led to increased owner retention, more topline revenue, and happier employees at my HQ!",
    photo: "/photos/jami-stigliano-cut.png", name: "Jami Stigliano", role: "Founder & CEO, DivaDance",
    top: 60,
  },
  {
    brand: "EverLine",
    edge: "oklch(0.55 0.13 145)",
    haze: { c1: "oklch(0.75 0.14 160)", c2: "oklch(0.88 0.15 100)", c3: "oklch(0.96 0.02 150)", base: "oklch(0.93 0.04 150)" },
    /* The source PNG has a solid white square background, hence the radius. */
    logo: "/logos/stories/everline.png", logoAlt: "EverLine Coatings and Services", logoW: 180, logoRounded: true,
    headline: ["A partner franchisees", "actually embrace"],
    statLead: "Expanding", statRest: "use across the network",
    cta: "View EverLine's story", href: "/case-studies",
    quote: "EZee Assist's solution and desire to solve problems has made them a key partner for EverLine. I am proud to say that our franchisees have embraced this technology and we are looking forward to expanding its use in the future.",
    photo: "/photos/john-evans-cut.png", name: "John Evans", role: "Founder & CEO, EverLine Coatings & Services",
    top: 78,
  },
];

const PARTNERS = [
  "IFA Supplier Forum",
  "CFA Member",
  "FSN Verified Member",
  "WSI Partner",
];

function StoryCard({ s }: { s: Story }) {
  return (
    /* Almost flush: 4px between cards rather than 48. The deck effect comes
       from the staggered sticky tops, not from the gap. --pf-offset clears
       the pinned headline above, which the cards run underneath, and is
       zero below lg where the headline does not pin. */
    <div className="sticky mb-1" style={{ top: `calc(var(--pf-offset) + ${s.top}px)` }}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          boxShadow: "0 24px 60px -28px rgba(12,20,36,.25)",
        }}
      >
        <div style={{ height: 14, background: s.edge }} aria-hidden="true" />

        {/* The quote rail is wider than the handoff's 230-300 so the quote
            runs fewer lines, which is what lets the card come down to 364px.
            The logo panel gives up the width. Two steps, because at 1024 a
            360px rail would leave the middle column too narrow to hold a
            headline line.

            The height stays fixed on short viewports even though the
            pinned headline above plus the partner bar below need 790px to
            show a whole card: shrinking the card instead was tried and
            clipped the WSI and DivaDance attributions, a permanent cut.
            Sliding under the bar is transient and resolves at rest. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(180px,240px)_minmax(0,1fr)_minmax(280px,340px)] lg:h-[420px]">
          {/* Logo panel, hazy brand tint */}
          <div className="relative overflow-hidden flex items-center justify-center p-10 min-h-[200px]">
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                inset: "-20%",
                background: `radial-gradient(circle at 28% 22%, ${s.haze.c1}, transparent 55%), radial-gradient(circle at 72% 78%, ${s.haze.c2}, transparent 60%), radial-gradient(circle at 62% 12%, ${s.haze.c3}, transparent 55%), ${s.haze.base}`,
                filter: "blur(34px)",
              }}
            />
            <Image
              src={s.logo}
              alt={s.logoAlt}
              width={s.logoW}
              height={Math.round(s.logoW * 0.4)}
              unoptimized
              className="relative h-auto"
              style={{ width: s.logoW, maxWidth: "100%", borderRadius: s.logoRounded ? 20 : undefined }}
            />
          </div>

          {/* Headline, stat and CTA */}
          <div className="flex flex-col justify-between gap-6 px-8 py-8 lg:px-10 lg:pt-9 lg:pb-7">
            <h3
              className="ed-fg"
              style={{
                fontFamily: JAKARTA,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
                /* One line per span. "Human-power back to" is the widest of
                   the eight lines at 10.57px per 1px of font size, and the
                   widened quote rail takes width off the middle column, so
                   the ceiling is now 20.8px at 1024, 37.9 at 1205 and 45 at
                   1440. 1024 binds. */
                fontSize: "clamp(1.25rem, -1.2125rem + 3.85vw, 2.25rem)",
              }}
            >
              <span className="block">{s.headline[0]}</span>
              <em className="block not-italic" style={{ fontWeight: 600 }}>{s.headline[1]}</em>
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <p className="ed-fg text-base lg:text-[19px]">
                <b>{s.statLead}</b> {s.statRest}
              </p>
              <Link
                href={s.href}
                className="inline-flex items-center gap-3 rounded-full"
                style={{
                  background: s.edge, color: "#fff",
                  padding: "12px 12px 12px 22px",
                  fontFamily: JAKARTA, fontSize: 14, fontWeight: 600,
                }}
              >
                {s.cta}
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center flex-none"
                  style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,.2)" }}
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>
            </div>
          </div>

          {/* Quote rail */}
          <figure
            className="flex flex-col gap-4 px-8 py-8 lg:px-7 lg:py-7 lg:border-l border-t lg:border-t-0"
            style={{ borderColor: "var(--ed-rule)" }}
          >
            <Image
              src={s.photo}
              alt={s.name}
              width={64}
              height={64}
              className="flex-none"
              style={{ width: 64, height: 64, objectFit: "contain", objectPosition: "left bottom" }}
            />
            <blockquote className="ed-fg text-[13.5px]" style={{ lineHeight: 1.6 }}>
              {s.quote}
            </blockquote>
            <figcaption className="mt-auto pt-4" style={{ borderTop: "1px solid var(--ed-rule)" }}>
              <cite className="not-italic">
                <span className="ed-fg block text-[13.5px]" style={{ fontWeight: 700 }}>{s.name}</span>
                <span className="ed-fg-muted block text-[12.5px]">{s.role}</span>
              </cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default function CustomerProof() {
  /* The headline pins above the deck from lg up, so every card's sticky
     top has to clear it. The height is measured rather than assumed: the
     type is fluid, so the block runs from 71px at 390 to 70px at 1440,
     and the padding steps at two breakpoints in between. It is published
     as --pf-head, which globals.css folds into --pf-offset. */
  const headRef = useRef<HTMLDivElement>(null);
  const [headH, setHeadH] = useState(0);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const read = () => setHeadH(el.getBoundingClientRect().height);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <SectionShell id="proof">
      {/* Headline and deck share a wrapper, which is what bounds both
          sticky ranges. The cards' containing block still ends at the last
          card: when it ran to the section end, the extra runway pushed the
          cards past each other on exit and the taller third card's pink
          logo panel emerged above the fourth. The headline unpins at the
          same edge, so it leaves exactly as the partner bar arrives. */}
      <div
        className="ed-proof-deck"
        style={{ ["--pf-head" as string]: `${headH}px` }}
      >
        <div
          ref={headRef}
          className="static lg:sticky pb-12 md:pb-14 lg:pb-5"
          style={{
            /* Below the floating nav pill, which is sticky too. Painted
               above the cards so they disappear under it rather than
               through it, and above the partner bar's 3. */
            top: "var(--nav-block)",
            zIndex: 4,
            backgroundColor: "var(--ed-bg)",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="ed-fg leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: JAKARTA,
              fontWeight: 700,
              /* One line at every width; clamp fitted to the measured wrap
                 point rather than a width ratio. */
              fontSize: "clamp(1.375rem, 0.02rem + 4.4vw, 3rem)",
            }}
          >
            Making an impact with franchise leaders.
          </motion.h2>
        </div>

        {STORIES.map((s) => (
          <StoryCard key={s.brand} s={s} />
        ))}
      </div>

      {/* Partner memberships: a compartment pinned to the viewport bottom
          for the length of the section, with a solid background so cards
          scrolling beneath it disappear under it rather than covering it.
          TODO: real partner badge images to replace text pills before publish. */}
      <div
        className="sticky bottom-0 mt-10 pt-5 pb-2"
        style={{ zIndex: 3, backgroundColor: "var(--ed-bg)" }}
      >
        <p
          className="ed-fg-muted text-sm uppercase tracking-[0.2em] mb-4"
          style={{ fontWeight: 600 }}
        >
          Collaborating with trusted partners
        </p>
        <div className="flex flex-wrap gap-2">
          {PARTNERS.map((p) => (
            <span
              key={p}
              className="rounded-full whitespace-nowrap flex-none"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
                color: "var(--ed-fg)",
                fontWeight: 500,
                padding: "0.5rem 0.875rem",
                fontSize: "0.8125rem",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

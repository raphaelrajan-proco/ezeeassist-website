"use client";

import Image from "next/image";
import Link from "next/link";

import type { StoryCard } from "@/lib/data/case-studies";
import { JAKARTA, Reveal } from "@/components/platform/shared";

/**
 * A story's logo at a given height. Marks whose supplied artwork has a
 * white background (`logoTile`) sit on a white tile, in both themes,
 * rather than being recoloured or knocked out.
 */
export function StoryLogo({ story, h, className = "" }: { story: StoryCard; h: number; className?: string }) {
  const img = (
    <Image
      src={story.logo.src}
      alt={story.logo.alt}
      width={Math.round(h * 4.2)}
      height={h}
      className={`w-auto object-contain ${story.logoTile ? "" : className}`}
      style={{ height: h }}
    />
  );
  if (!story.logoTile) return img;
  return (
    <span
      className={`inline-flex items-center rounded-[8px] ${className}`}
      style={{ backgroundColor: "#FFFFFF", padding: `${Math.round(h * 0.32)}px ${Math.round(h * 0.45)}px` }}
    >
      {img}
    </span>
  );
}

/**
 * "More stories", shared by the templated story pages and the bespoke
 * DKI page. Three siblings per page: a single column below lg, three
 * across from lg, where each card stacks its chip above the text so the
 * headline keeps a readable measure.
 */
export default function MoreStories({ more }: { more: StoryCard[] }) {
  return (
    <section className="ed-bg-alt w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:px-12 lg:px-16 py-14 md:py-16">
        <h2
          className="ed-fg tracking-[-0.025em]"
          style={{ fontFamily: JAKARTA, fontSize: 28, fontWeight: 700 }}
        >
          More stories
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {more.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.08}>
              <Link
                href={`/case-studies/${m.slug}`}
                className="ed-card ed-border ed-story-card flex h-full items-center gap-6 rounded-2xl border px-7 py-6 lg:flex-col lg:items-start lg:gap-5"
              >
                <span
                  className="flex h-16 w-[110px] flex-none items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: m.panel }}
                >
                  <StoryLogo story={m} h={m.logoH.chip} />
                </span>
                <span className="flex flex-col gap-1">
                  <span
                    className="ed-fg tracking-[-0.015em]"
                    style={{ fontFamily: JAKARTA, fontSize: 16.5, fontWeight: 700 }}
                  >
                    {m.headline}
                  </span>
                  <span className="ed-fg-muted text-[13px]">{m.kicker}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

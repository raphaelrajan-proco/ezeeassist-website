"use client";

import Image from "next/image";
import { useState } from "react";
import { MONO } from "@/components/platform/shared";
import { CATEGORY_COLOR, VERTICALS } from "./data";

/**
 * The tabbed industry library.
 *
 * Six verticals, nine plays each, laid over that vertical's photograph.
 * The grid is a fixed 3x3 at every width by design: the panel shrinks
 * with the viewport and the cards shrink with it, which keeps the
 * "nine of these, per vertical" reading intact rather than reflowing
 * into a list.
 *
 * The generous horizontal padding on the panel is deliberate too. It is
 * what lets the photograph read around the grid instead of being a
 * texture nobody sees.
 *
 * All six photos are committed under `public/photos/industries/`.
 */

const MONO_LABEL = {
  fontFamily: MONO, fontSize: 12, fontWeight: 600,
  letterSpacing: "0.13em", textTransform: "uppercase" as const,
};

export default function IndustryPlays() {
  const [sel, setSel] = useState(0);
  const v = VERTICALS[sel];

  return (
    <div className="mt-10 flex flex-col items-start gap-5 lg:flex-row lg:gap-8">
      <div className="flex w-full flex-row flex-wrap gap-2 lg:w-[200px] lg:flex-none lg:flex-col">
        {VERTICALS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={i === sel}
            className="rounded-full text-[13.5px] transition-colors duration-[180ms] lg:text-left"
            style={{
              padding: "10px 16px",
              background: i === sel ? "#0A0A0A" : "var(--ed-card)",
              color: i === sel ? "#FFFFFF" : "var(--ed-fg-muted)",
              border: `1px solid ${i === sel ? "#0A0A0A" : "var(--ed-border)"}`,
              fontWeight: i === sel ? 600 : 500,
            }}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="relative w-full min-w-0 overflow-hidden rounded-2xl lg:flex-1" style={{ background: "#EDEAF0" }}>
        <Image
          src={v.photo}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: "linear-gradient(180deg, rgba(24,17,28,0.40) 0%, rgba(24,17,28,0.22) 100%)" }}
        />
        <div
          /* Three across from sm, which is where the handoff wants it
             and where it fits. At 375 the panel leaves each of three
             cards about 62px of content and the category label alone
             needs ~78px at the 12px type floor, so it drops to two. */
          className="relative grid grid-cols-2 gap-3 sm:grid-cols-3"
          style={{ padding: "clamp(20px, 6%, 68px) clamp(16px, 8%, 96px)" }}
        >
          {v.plays.map((p) => (
            <div
              key={p.name}
              className="min-w-0 rounded-[10px] px-2.5 py-2.5 sm:px-4 sm:py-3.5"
              style={{
                background: "#FFFFFF", border: "1px solid #E5E7EB",
                boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 8px 20px rgba(10,10,10,0.12)",
              }}
            >
              <span className="flex items-center gap-[7px]">
                <span
                  className="h-[9px] w-[9px] flex-none rounded-[2px]"
                  style={{ background: CATEGORY_COLOR[p.category] }}
                  aria-hidden="true"
                />
                <span style={{ ...MONO_LABEL, color: CATEGORY_COLOR[p.category] }}>{p.category}</span>
              </span>
              <span
                className="mt-2 block break-words text-[14.5px] font-semibold leading-[1.25] tracking-[-0.01em]"
                style={{ color: "#0A0A0A" }}
              >
                {p.name}
              </span>
              <span className="mt-1.5 block break-words text-[12.5px] leading-[1.45]" style={{ color: "#52525B" }}>
                {p.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

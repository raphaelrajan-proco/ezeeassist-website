"use client";

import { integrations } from "@/lib/data/integrations";
import { MONO } from "@/components/platform/shared";

/**
 * Continuously scrolling strip of the systems EZee reads from.
 *
 * **Names, not logos.** Only four of the fifty integration SVGs
 * `lib/data/integrations.ts` declares are actually committed, and the
 * house rule is that a logo is a committed local file or it is not shown.
 * Mixing four real marks with forty-six text chips would read as broken
 * rather than deliberate, so every entry is a chip. The platform page's
 * own scroller already does the same. If the missing files ever land,
 * this is the one place to swap.
 *
 * The set is duplicated so the loop is seamless, and the whole strip is
 * `aria-hidden`: it is decoration over a list that already exists in full
 * on the Integrations page, which the caller links to.
 */
export default function IntegrationMarquee() {
  const names = integrations.map((i) => i.name);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="ed-logo-marquee flex w-max items-center gap-2.5">
        {[...names, ...names].map((n, i) => (
          <span
            key={`${n}-${i}`}
            className="flex-shrink-0 whitespace-nowrap rounded-md"
            style={{
              fontFamily: MONO, fontSize: 12, padding: "6px 12px",
              background: "var(--chip-bg)", border: "1px solid var(--chip-bd)", color: "var(--ed-accent-text)",
            }}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

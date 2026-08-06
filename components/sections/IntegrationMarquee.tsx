"use client";

import { INTEGRATION_STRIP } from "@/lib/data/integrations";

/**
 * The integrations strip, shared with the Integrations page hero.
 *
 * Same names, same `.ig-strip` scroll, same chip proportions, so the two
 * read as one object rather than two takes on it. The only difference is
 * the chip surface: the Integrations hero sits on a dark photograph and
 * uses cream-on-transparent, this one sits on a light card, so it takes
 * the light tokens. Everything else is deliberately identical.
 *
 * Decorative: the full list lives on the Integrations page, which the
 * caller links to, so the strip is `aria-hidden`.
 */
export default function IntegrationMarquee() {
  return (
    <div
      className="ig-strip relative flex gap-2.5 overflow-hidden py-1"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="ig-strip-run flex flex-none gap-2.5">
          {INTEGRATION_STRIP.map((s) => (
            <span
              key={`${copy}-${s}`}
              className="ed-card-alt ed-border ed-fg-muted inline-flex flex-none items-center rounded-md border px-2.5 py-1"
              style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.3 }}
            >
              {s}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

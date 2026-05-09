"use client";

import { customerLogos } from "@/lib/data/customer-logos";

/**
 * Editorial trust bar — quieter than v1.
 * No card containers. Logo names rendered as text in muted cream/foreground,
 * marqueeing slowly across an alt-cream band. Used only inside `.theme-editorial`.
 */
export default function TrustBarEditorial() {
  const track = [...customerLogos, ...customerLogos];

  return (
    <section className="w-full ed-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <p className="ed-overline mb-10" style={{ color: "var(--ed-fg-muted)" }}>
          Trusted by leading brands
        </p>

        <div
          className="relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="flex gap-12 w-max"
            style={{ animation: "marquee 60s linear infinite" }}
          >
            {track.map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className="ed-fg whitespace-nowrap text-2xl md:text-3xl flex-shrink-0"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  opacity: 0.55,
                }}
                title={logo.alt}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

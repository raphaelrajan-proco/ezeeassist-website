"use client";

import { useEffect, useRef, useState } from "react";
import { Overline, SectionHeadline } from "./shared";

/**
 * What it does. Architecture only: a sticky left rail and a scrolling
 * right column, one module per beat, five slots. Below lg the rail
 * unpins and the modules stack vertically.
 *
 * TODO: step 8 designs these modules. Headings are placeholders and
 * every module body is an empty frame on purpose. The previous bento
 * lives in components/growth/_archive/CapabilityBento.tsx and its
 * five tiles are the intended source content.
 */

const MODULES = [
  { id: "module-01", heading: "Module 01" },
  { id: "module-02", heading: "Module 02" },
  { id: "module-03", heading: "Module 03" },
  { id: "module-04", heading: "Module 04" },
  { id: "module-05", heading: "Module 05" },
];

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = moduleRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = nodes.indexOf(entry.target as HTMLDivElement);
            if (i !== -1) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section id="capabilities" className="w-full ed-bg-alt scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[38fr_56fr] gap-10 lg:gap-16 items-start">
          {/* Sticky rail */}
          <div className="lg:sticky lg:top-28">
            <Overline>What it does</Overline>
            <SectionHeadline>Five things your playbook can now do on its own.</SectionHeadline>

            <ol className="mt-8 hidden lg:block" aria-hidden="true">
              {MODULES.map((m, i) => (
                <li
                  key={m.id}
                  className="py-2 text-base transition-colors"
                  style={{
                    color: i === active ? "var(--ed-fg)" : "var(--ed-fg-muted)",
                    fontWeight: i === active ? 600 : 400,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} · {m.heading}
                </li>
              ))}
            </ol>
          </div>

          {/* Scrolling modules */}
          <div className="flex flex-col gap-6 lg:gap-10">
            {MODULES.map((m, i) => (
              <div
                key={m.id}
                id={m.id}
                ref={(el) => {
                  moduleRefs.current[i] = el;
                }}
                className="rounded-3xl p-6 md:p-8"
                style={{
                  backgroundColor: "var(--ed-card)",
                  border: "1px solid var(--ed-rule)",
                  minHeight: "320px",
                }}
              >
                <p
                  className="text-sm uppercase tracking-[0.2em] mb-3"
                  style={{ color: "var(--ed-fg-muted)", fontWeight: 600 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="ed-fg text-2xl md:text-3xl tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-editorial)", fontWeight: 500 }}
                >
                  {m.heading}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

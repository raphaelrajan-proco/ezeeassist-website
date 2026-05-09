"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Editorial hub-and-spoke integrations diagram.
 *
 * EZee Assist sits at the centre on a deep-black canvas; eight cream
 * surrounding tiles represent the major integration categories. Dotted
 * SVG lines connect each tile to the centre and animate themselves on
 * scroll-in (drawing from outer node toward the centre — suggesting
 * data flowing in).
 *
 * Mirrors slide 5 of the deck (Unified Intelligence Layer).
 */

type Node = {
  label: string;
  /** Position as percentage of the canvas, x = horizontal, y = vertical. */
  x: number;
  y: number;
};

const NODES: Node[] = [
  { label: "CRM",          x: 14,  y: 18 },
  { label: "Drives",       x: 50,  y: 8  },
  { label: "ERP / FMS",    x: 86,  y: 18 },
  { label: "POS",          x: 92,  y: 50 },
  { label: "LMS",          x: 86,  y: 82 },
  { label: "Marketing",    x: 50,  y: 92 },
  { label: "Accounting",   x: 14,  y: 82 },
  { label: "Video / Comms",x: 8,   y: 50 },
];

// Centre coordinates (also percentage)
const CX = 50;
const CY = 50;

export default function IntegrationsHub() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="w-full" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 md:py-40">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <p
            className="mb-8 text-xs"
            style={{
              color: "#00AEEF",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Unified Intelligence Layer
          </p>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: "#F5EDE0",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            One agent.{" "}
            <span style={{ color: "#00AEEF" }}>Every system you run on.</span>
          </h2>
          <p
            className="mt-8 max-w-2xl text-lg md:text-xl"
            style={{ color: "#A89B86", lineHeight: 1.5 }}
          >
            EZee sits in the middle of your stack — drives, CRMs, POS, LMS,
            marketing tools, accounting — and routes intelligence to and from
            every node so your operators get one place to ask, act, and
            automate.
          </p>
        </motion.div>

        {/* Diagram */}
        <div
          ref={ref}
          className="relative mx-auto"
          style={{
            maxWidth: "920px",
            aspectRatio: "1.4 / 1",
          }}
        >
          {/* SVG line layer */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {NODES.map((n, i) => {
              const dx = n.x - CX;
              const dy = n.y - CY;
              const len = Math.hypot(dx, dy);
              return (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke="rgba(0,174,239,0.45)"
                  strokeWidth="0.18"
                  strokeDasharray="0.8 1.2"
                  strokeLinecap="round"
                  className="ed-hub-line"
                  data-visible={inView}
                  style={
                    {
                      ["--dash-len" as string]: `${len * 2}`,
                      animationDelay: `${0.25 + i * 0.07}s`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </svg>

          {/* Outer nodes */}
          {NODES.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5 + i * 0.07,
              }}
              className="absolute rounded-2xl px-5 py-3 whitespace-nowrap"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: "#F5EDE0",
                color: "#0A0A0A",
                fontFamily: "var(--font-editorial)",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "-0.01em",
                boxShadow:
                  "0 6px 24px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,237,224,0.08)",
              }}
            >
              {n.label}
            </motion.div>
          ))}

          {/* Centre node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.95,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="absolute rounded-3xl flex items-center justify-center px-8 py-7 text-center"
            style={{
              left: `${CX}%`,
              top: `${CY}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "#00AEEF",
              color: "#FFFFFF",
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              minWidth: "200px",
              boxShadow:
                "0 10px 40px rgba(0,174,239,0.45), 0 0 0 8px rgba(0,174,239,0.12)",
            }}
          >
            <div>
              <p
                className="text-xs mb-1"
                style={{
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                The Hub
              </p>
              <p
                className="text-2xl md:text-3xl"
                style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
              >
                EZee Assist
              </p>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="text-center mt-12 text-sm"
          style={{
            color: "#A89B86",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          250+ integrations · No migration · Your content stays where it lives
        </motion.p>
      </div>
    </section>
  );
}

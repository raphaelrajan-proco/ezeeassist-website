"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AppsMockup } from "./AnswersActionsAutomations";

/**
 * How Building Works: describe → approve → deployed.
 *
 * Beat 1 types the request out character by character, Beat 2 (plan
 * card) lands ~600ms after typing completes, Beat 3 (live app mockup)
 * ~600ms after that. Holds 4s, then the sequence resets and loops.
 * Triggered once on scroll-in; with prefers-reduced-motion everything
 * renders statically.
 */

const PROMPT =
  "Build a daily closing-audit app: photo checklist per station, auto-score each one, flag fails to the coach.";

const TYPE_MS = 40;
const BEAT_GAP_MS = 600;
const HOLD_MS = 4000;

type Phase = "typing" | "plan" | "live" | "hold";

function BeatLabel({ n, text }: { n: string; text: string }) {
  return (
    <p
      className="ed-fg-muted text-xs mb-4"
      style={{
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}
    >
      {n} · {text}
    </p>
  );
}

function ConnectorArrow({ visible }: { visible: boolean }) {
  return (
    <div
      className="hidden lg:flex items-center justify-center flex-shrink-0 self-center"
      style={{ width: "48px" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 24" className="w-12 h-6" style={{ overflow: "visible" }}>
        <motion.line
          x1="2"
          y1="12"
          x2="38"
          y2="12"
          stroke="var(--ed-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.polyline
          points="32,5 41,12 32,19"
          fill="none"
          stroke="var(--ed-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
      </svg>
    </div>
  );
}

export default function BuildExperienceSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-140px" });
  const reduceMotion = useReducedMotion();

  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Orchestration. Static when reduced motion is preferred.
  useEffect(() => {
    if (!inView || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (chars < PROMPT.length) {
        timer = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
      } else {
        timer = setTimeout(() => setPhase("plan"), BEAT_GAP_MS);
      }
    } else if (phase === "plan") {
      timer = setTimeout(() => setPhase("live"), BEAT_GAP_MS + 400);
    } else if (phase === "live") {
      timer = setTimeout(() => setPhase("hold"), HOLD_MS);
    } else {
      // reset and loop
      timer = setTimeout(() => {
        setChars(0);
        setPhase("typing");
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [inView, reduceMotion, phase, chars]);

  const showAll = Boolean(reduceMotion);
  const typedText = showAll ? PROMPT : PROMPT.slice(0, chars);
  const typingDone = showAll || chars >= PROMPT.length;
  const showPlan = showAll || phase === "plan" || phase === "live" || phase === "hold";
  const showLive = showAll || phase === "live" || phase === "hold";

  return (
    <section ref={sectionRef} className="w-full ed-bg-alt">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-16 md:mb-20"
        >
          <p className="ed-overline mb-8">How Building Works</p>
          <h2
            className="ed-fg text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 500,
            }}
          >
            Describe it. Approve it.{" "}
            <span className="ed-accent">It&apos;s live.</span>
          </h2>
          <p
            className="ed-fg-muted mt-8 text-xl md:text-2xl max-w-3xl"
            style={{ lineHeight: 1.45, fontWeight: 400 }}
          >
            No developers. No six-month rollout. Your ops team describes
            what they need in plain language, reviews the plan, and ships
            it to the network.
          </p>
        </motion.div>

        {/* Three-beat strip */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-stretch">

          {/* Beat 1: You describe it */}
          <div className="flex-1 min-w-0">
            <BeatLabel n="01" text="You describe it" />
            <div
              className="rounded-2xl p-5 h-full"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
              }}
            >
              <p
                className="text-[10px] mb-3"
                style={{
                  color: "#1B5A6E",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                ▸ Hello EZee…
              </p>
              <p
                className="ed-fg text-base md:text-lg"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  lineHeight: 1.45,
                  minHeight: "7.5rem",
                }}
              >
                &ldquo;{typedText}
                {!showAll && (
                  <span
                    aria-hidden="true"
                    className="ed-accent"
                    style={{
                      animation: "ed-cursor-blink 0.9s step-start infinite",
                      fontStyle: "normal",
                      fontWeight: 400,
                    }}
                  >
                    |
                  </span>
                )}
                {typingDone && "”"}
              </p>
            </div>
          </div>

          <ConnectorArrow visible={showPlan} />

          {/* Beat 2: EZee maps it out */}
          <div className="flex-1 min-w-0">
            <BeatLabel n="02" text="EZee maps it out" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showPlan ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-5"
              style={{
                backgroundColor: "var(--ed-card)",
                border: "1px solid var(--ed-rule)",
              }}
            >
              <p
                className="text-[10px] mb-4"
                style={{
                  color: "#1B5A6E",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                ▸ Plan ready
              </p>
              <div className="space-y-2 mb-4">
                {[
                  "4 steps mapped",
                  "2 integrations wired: Drive · Slack",
                  "Roles: Staff submit · Coach reviews",
                ].map((row) => (
                  <div
                    key={row}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                    style={{
                      backgroundColor: "var(--ed-bg-alt)",
                      border: "1px solid var(--ed-rule)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="ed-accent text-xs"
                      style={{ fontWeight: 700 }}
                    >
                      ✓
                    </span>
                    <p
                      className="ed-fg text-[13px]"
                      style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.35 }}
                    >
                      {row}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full rounded-full py-2.5 text-sm"
                style={{
                  backgroundColor: "var(--ed-accent)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 500,
                }}
              >
                Approve &amp; deploy
              </button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={showPlan ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="ed-fg-muted mt-3 text-xs"
              style={{ fontWeight: 500 }}
            >
              A human approves before anything ships.
            </motion.p>
          </div>

          <ConnectorArrow visible={showLive} />

          {/* Beat 3: live at every location */}
          <div className="flex-1 min-w-0">
            <BeatLabel n="03" text="It's live at every location" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showLive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <AppsMockup />
              <span
                className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px]"
                style={{
                  backgroundColor: "#0A0A0A",
                  color: "#F5EDE0",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: "#16A34A" }}>●</span> Live · 214 locations
              </span>
            </motion.div>
          </div>
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="ed-fg mt-16 md:mt-20 text-2xl md:text-3xl tracking-tight max-w-4xl"
          style={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 500,
          }}
        >
          The same flow builds an action, an agent, or a full app.{" "}
          <span className="ed-accent">One platform, one pattern.</span>
        </motion.p>
      </div>
    </section>
  );
}

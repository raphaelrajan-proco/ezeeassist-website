"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Editorial phone mockup — looping conversation between an operator and EZee.
 * Cream phone shape against the cream/black hero background; the contrast
 * comes from the subtle border + shadow rather than a hard edge.
 *
 * The conversation loops through 4 messages, then resets after a pause.
 * Animations use slow ease-out timing to match the editorial cadence.
 */

type Msg = {
  from: "user" | "ezee";
  text: string;
  meta?: string;
};

const SCRIPT: Msg[] = [
  { from: "user", text: "What are the brand guidelines for signage?" },
  {
    from: "ezee",
    text:
      "Per the 2025 brand guide: minimum 4ft from the building edge, primary blue (#00AEEF) backplate, sans-serif logotype only.",
    meta: "Cited: Brand Guide v3 — pg. 14",
  },
  { from: "user", text: "Submit my insurance certificate to head office." },
  {
    from: "ezee",
    text: "Logged on the CRM and notified your franchise business coach.",
    meta: "Action complete · 2:14 pm",
  },
];

export default function HeroPhoneMockup() {
  // Index of the latest message that's been "received" (0..SCRIPT.length-1)
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setShown((prev) => {
        const next = prev + 1;
        if (next >= SCRIPT.length) {
          // Pause at end of conversation, then reset
          timer = setTimeout(() => !cancelled && setShown(0), 3500);
          return prev;
        }
        // Faster cadence for user messages, slower for AI responses
        const wait = SCRIPT[next].from === "user" ? 1700 : 2400;
        timer = setTimeout(tick, wait);
        return next;
      });
    };

    timer = setTimeout(tick, 1200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: "360px", width: "100%" }}
    >
      {/* Phone outer shell */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden"
        style={{
          backgroundColor: "var(--ed-card)",
          border: "1px solid var(--ed-rule)",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.25), 0 8px 24px -8px rgba(0,0,0,0.15)",
          aspectRatio: "9 / 17",
        }}
      >
        {/* Top status bar */}
        <div
          className="flex items-center justify-between px-6 pt-4 pb-3"
          style={{ borderBottom: "1px solid var(--ed-rule)" }}
        >
          <span
            className="text-[10px]"
            style={{
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ed-fg-muted)",
            }}
          >
            EZee Assist
          </span>
          <span
            className="flex h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#00AEEF" }}
          />
        </div>

        {/* Conversation area */}
        <div className="flex flex-col gap-3 px-5 py-5 overflow-hidden h-[calc(100%-49px)]">
          <AnimatePresence initial={false}>
            {SCRIPT.slice(0, shown + 1).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[88%] rounded-2xl px-4 py-3"
                  style={
                    msg.from === "user"
                      ? {
                          backgroundColor: "#00AEEF",
                          color: "#FFFFFF",
                          borderBottomRightRadius: "0.5rem",
                        }
                      : {
                          backgroundColor: "var(--ed-bg-alt)",
                          color: "var(--ed-fg)",
                          borderBottomLeftRadius: "0.5rem",
                          border: "1px solid var(--ed-rule)",
                        }
                  }
                >
                  <p
                    className="text-[13px]"
                    style={{
                      lineHeight: 1.45,
                      fontFamily: "var(--font-editorial)",
                      fontWeight: 400,
                    }}
                  >
                    {msg.text}
                  </p>
                  {msg.meta && (
                    <p
                      className="mt-2 text-[10px]"
                      style={{
                        color: "var(--ed-fg-muted)",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {msg.meta}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator — only when waiting for next AI reply */}
          {shown < SCRIPT.length - 1 &&
            SCRIPT[shown + 1]?.from === "ezee" && (
              <motion.div
                key={`typing-${shown}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex justify-start"
              >
                <div
                  className="rounded-2xl px-4 py-3 flex gap-1"
                  style={{
                    backgroundColor: "var(--ed-bg-alt)",
                    border: "1px solid var(--ed-rule)",
                    borderBottomLeftRadius: "0.5rem",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "var(--ed-fg-muted)" }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
        </div>
      </div>

      {/* Footnote caption — editorial */}
      <p
        className="mt-6 text-xs text-center"
        style={{
          color: "var(--ed-fg-muted)",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Live on every channel your team uses
      </p>
    </div>
  );
}

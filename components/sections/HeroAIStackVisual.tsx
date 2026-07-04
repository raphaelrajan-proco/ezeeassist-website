"use client";

import { motion } from "framer-motion";

/**
 * Hero visual — the "scattered AI → consolidated on EZee" metaphor.
 *
 * Three overlapping cards drift gently:
 *   back   — a faded ChatGPT window with a franchise prompt
 *   middle — a semi-transparent Claude window with a different prompt
 *   front  — a sharp EZee Assist card: same operator, but connected to
 *            their real systems (Mindbody + QuickBooks data in the reply)
 */

function GenericAICard({
  name,
  prompt,
  reply,
}: {
  name: string;
  prompt: string;
  reply: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden w-[300px] md:w-[330px]"
      style={{
        backgroundColor: "var(--ed-card)",
        border: "1px solid var(--ed-rule)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--ed-rule)" }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--ed-fg-muted)", opacity: 0.5 }}
        />
        <span
          className="text-[10px]"
          style={{
            color: "var(--ed-fg-muted)",
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {name}
        </span>
      </div>
      <div className="px-4 py-3.5 space-y-2.5">
        <p
          className="text-[12px]"
          style={{
            color: "var(--ed-fg)",
            fontFamily: "var(--font-editorial)",
            lineHeight: 1.4,
          }}
        >
          {prompt}
        </p>
        <p
          className="text-[11px]"
          style={{
            color: "var(--ed-fg-muted)",
            lineHeight: 1.4,
          }}
        >
          {reply}
        </p>
      </div>
    </div>
  );
}

export default function HeroAIStackVisual() {
  return (
    <div
      className="relative mx-auto"
      style={{ maxWidth: "440px", width: "100%", height: "460px" }}
      aria-label="Scattered AI tools consolidating into EZee Assist"
    >
      {/* Back card — ChatGPT, faded */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ opacity: 0.38, zIndex: 1 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.38, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <GenericAICard
            name="ChatGPT"
            prompt="How should a franchise handle a customer refund dispute?"
            reply="Generally, franchises should consult their operations manual… (generic advice, no access to yours)"
          />
        </motion.div>
      </motion.div>

      {/* Middle card — Claude, semi-transparent */}
      <motion.div
        className="absolute top-[110px] right-0"
        style={{ opacity: 0.6, zIndex: 2 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.85 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: -2 }}
        >
          <GenericAICard
            name="Claude"
            prompt="Draft a coaching plan for an underperforming location."
            reply="Here's a general framework… (no idea which location, no data, no context)"
          />
        </motion.div>
      </motion.div>

      {/* Front card — EZee, sharp, connected */}
      <motion.div
        className="absolute bottom-0 left-4 md:left-0"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: -4 }}
        >
          <div
            className="rounded-2xl overflow-hidden w-[320px] md:w-[360px]"
            style={{
              backgroundColor: "var(--ed-card)",
              border: "1px solid rgba(0,174,239,0.45)",
              boxShadow: "0 24px 70px -18px rgba(0,0,0,0.35), 0 0 0 4px rgba(0,174,239,0.08)",
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: "1px solid var(--ed-rule)" }}
            >
              <span
                className="text-[10px]"
                style={{
                  color: "#00AEEF",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                EZee Assist
              </span>
              <span
                className="text-[9px] rounded-full px-2 py-0.5"
                style={{
                  backgroundColor: "rgba(0,174,239,0.10)",
                  color: "#00AEEF",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ● Connected to your stack
              </span>
            </div>
            <div className="px-4 py-3.5">
              <p
                className="text-[12.5px] mb-3"
                style={{
                  color: "var(--ed-fg)",
                  fontFamily: "var(--font-editorial)",
                  lineHeight: 1.4,
                }}
              >
                Draft a coaching plan for Store #214.
              </p>
              <div
                className="rounded-xl px-3.5 py-3 mb-2.5"
                style={{
                  backgroundColor: "var(--ed-bg-alt)",
                  border: "1px solid var(--ed-rule)",
                }}
              >
                <p
                  className="text-[11.5px] mb-2"
                  style={{ color: "var(--ed-fg)", lineHeight: 1.45 }}
                >
                  Store #214 is 12% under target. Bookings dipped after the
                  March schedule change; refunds up 8%. Here&apos;s a
                  3-point plan for this week&apos;s coaching call.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Mindbody · bookings", "QuickBooks · P&L"].map((s) => (
                    <span
                      key={s}
                      className="text-[9px] rounded-full px-2 py-0.5"
                      style={{
                        backgroundColor: "rgba(0,174,239,0.10)",
                        color: "#00AEEF",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <p
                className="text-[9px]"
                style={{
                  color: "var(--ed-fg-muted)",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                Sourced from your systems · Governed by your rules
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

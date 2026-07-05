"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Play } from "lucide-react";

const VIDEO_ID = "yjarSt_H4fg";

export default function VideoPlaceholder() {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="w-full ed-bg">
      <div className="mx-auto max-w-4xl px-6 md:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* 16:9 container */}
          <div
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ paddingBottom: "56.25%" }}
          >
            {playing ? (
              /* ── Live YouTube iframe ── */
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="EZee Assist — Product Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              /* ── Click-to-play facade ── */
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, #0A0A0A 0%, #0f172a 60%, #1a1a2e 100%)",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setPlaying(true)}
                role="button"
                aria-label="Play EZee Assist product tour"
              >
                {/* Subtle grid overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />

                {/* Blue glow behind button */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(0,174,239,0.15) 0%, transparent 70%)",
                  }}
                />

                {/* Pulsing ring + play button */}
                <div className="relative z-10">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#00AEEF]/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    animate={
                      hovered
                        ? { scale: 1.1, boxShadow: "0 4px 40px rgba(0,174,239,0.55)" }
                        : { scale: 1,   boxShadow: "0 4px 32px rgba(0,174,239,0.35)" }
                    }
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white"
                  >
                    <Play
                      size={28}
                      className="text-[#00AEEF] translate-x-0.5"
                      fill="#00AEEF"
                      strokeWidth={0}
                    />
                  </motion.div>
                </div>

                {/* Label */}
                <p className="relative z-10 text-sm font-semibold text-white/70 tracking-wide">
                  See EZee Assist in action
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

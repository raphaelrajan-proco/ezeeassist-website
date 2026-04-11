"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TODO: Replace placeholder with one of:
//   YouTube/Vimeo:  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ... />
//   Loom:           <iframe src="https://www.loom.com/embed/YOUR_VIDEO_ID" ... />
//   Self-hosted:    <video src="/videos/demo.mp4" controls className="absolute inset-0 w-full h-full" />
// ─────────────────────────────────────────────────────────────

export default function VideoPlaceholder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full bg-white dark:bg-[#0D0D0D]">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* 16:9 container */}
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_20px_60px_rgba(0,0,0,0.14)] cursor-pointer"
            style={{
              paddingBottom: "56.25%",
              background: "linear-gradient(135deg, #0A0A0A 0%, #0f172a 60%, #1a1a2e 100%)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
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

            {/* Centered play UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              {/* Pulsing ring */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#00AEEF]/20"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  animate={hovered ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_4px_32px_rgba(0,174,239,0.35)]"
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
              <p className="text-sm font-semibold text-white/70 tracking-wide">
                Watch the 2-minute product tour
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

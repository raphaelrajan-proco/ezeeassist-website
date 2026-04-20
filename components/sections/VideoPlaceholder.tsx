"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TODO: Replace placeholder with one of:
//   YouTube/Vimeo:  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ... />
//   Loom:           <iframe src="https://www.loom.com/embed/YOUR_VIDEO_ID" ... />
//   Self-hosted:    <video src="/videos/demo.mp4" controls className="absolute inset-0 w-full h-full" />
// ─────────────────────────────────────────────────────────────

export default function VideoPlaceholder() {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="w-full bg-white dark:bg-[#0D0D0D]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
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
              onClick={() => setModalOpen(true)}
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
                <p className="text-sm font-semibold text-white/70 tracking-wide">
                  Watch the 2-minute product tour
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{ opacity: 0, scale: 0.94, y: 16  }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#161616] p-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Play icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20">
                <Play size={24} className="text-[#00AEEF] translate-x-0.5" fill="#00AEEF" strokeWidth={0} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: "-0.01em" }}>
                Video coming soon
              </h3>
              <p className="text-sm leading-6 text-gray-400">
                Our product tour is in production. In the meantime,{" "}
                <a href="/contact" className="text-[#00AEEF] hover:underline font-medium">
                  book a live demo
                </a>{" "}
                and we&apos;ll walk you through everything personally.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

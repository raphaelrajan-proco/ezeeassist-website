"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function VideoPlaceholder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* 16:9 container */}
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.07)] cursor-pointer"
            style={{ paddingBottom: "56.25%" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Subtle radial glow behind the button */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,174,239,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Centered play UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              {/* Play button */}
              <motion.div
                animate={hovered ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] ring-1 ring-[#E5E7EB]"
              >
                <Play
                  size={28}
                  className="text-[#00AEEF] translate-x-0.5"
                  fill="#00AEEF"
                  strokeWidth={0}
                />
              </motion.div>

              {/* Label */}
              <p className="text-sm font-semibold text-gray-500 tracking-wide">
                See EZee Assist in action
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

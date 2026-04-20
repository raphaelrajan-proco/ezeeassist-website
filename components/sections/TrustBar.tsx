"use client";

import { customerLogos } from "@/lib/data/customer-logos";

// TODO: Once SVG files land in /public/logos/customers/, replace the <span> text
// inside each card with:
//   import Image from "next/image";
//   <Image src={logo.src} alt={logo.alt} width={120} height={40} className="object-contain" />
// and remove the min-w and text classes from the card.

export default function TrustBar() {
  // Duplicate so the scroll loops seamlessly without visible gaps
  const track = [...customerLogos, ...customerLogos];

  return (
    <section className="w-full bg-[#F7F8FA] dark:bg-[#111111] py-14 overflow-hidden">
      {/* Label */}
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
        Trusted by franchise brands across North America
      </p>

      {/* Marquee wrapper — masks edges with a fade */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* 59 logos × 2 ≈ 118 items — speed bumped from 40s → 60s to stay smooth */}
        <div className="flex gap-6 w-max" style={{ animation: "marquee 60s linear infinite" }}>
          {track.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center rounded-lg bg-white dark:bg-[#161616] border border-[#E5E7EB] dark:border-white/[0.08] px-7 py-3 min-w-[160px] h-[52px] shadow-sm flex-shrink-0"
              title={logo.alt}
            >
              {/* Text fallback — replace with <Image> once SVG files exist */}
              <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

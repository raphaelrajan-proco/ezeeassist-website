"use client";

const logos = [
  "EverLine",
  "DekaLash",
  "WSI",
  "Aqua-Tots",
  "DivaDance",
  "New Creations",
  "Fresh Burger",
  "Real Property Management",
  "BeaverTails",
  "Spray-Net",
];

export default function TrustBar() {
  // Duplicate the list so the scroll loops seamlessly
  const track = [...logos, ...logos];

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
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="flex gap-6 w-max animate-marquee">
          {track.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg bg-white dark:bg-[#161616] border border-[#E5E7EB] dark:border-white/[0.08] px-7 py-3 min-w-[160px] h-[52px] shadow-sm flex-shrink-0"
            >
              <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

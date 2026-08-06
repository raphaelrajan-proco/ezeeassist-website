"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";

/**
 * The 14-second swim-school booking loop.
 *
 * A parent taps a slot, taps Book, and the app confirms: the slot goes
 * selected, the remaining count drops from 3 to 2, and the footer swaps
 * to the confirmation. It is the "reaches the customer directly on a
 * phone" claim, shown rather than asserted.
 *
 * Like the hero loop, **base styles are the booked end-state** and the
 * keyframes rewind it, so reduced motion leaves a finished screen.
 *
 * Fixed light palette in both themes: it is a phone mock, and a phone
 * does not have a dark mode that follows this site's.
 */

const INK = "#0A0A0A";
const INK_MUTED = "#52525B";
const SEL = "#17557E";

const SLOTS = [
  { when: "Tue 4:00pm", state: "FULL" as const },
  { when: "Thu 5:30pm", state: "FULL" as const },
  { when: "Sat 9:00am", state: "PICK" as const },
  { when: "Sat 10:30am", state: "2 SPOTS" as const },
];

export default function BookingApp() {
  return (
    <div
      data-book-anim
      className="flex items-center justify-center rounded-[20px] px-6 py-8 sm:px-10 sm:py-12"
      style={{ background: "linear-gradient(165deg,#0E3A66,#17557E 55%,#1B6E93)" }}
      aria-hidden="true"
    >
      <div className="flex w-full max-w-[280px] flex-col gap-3">
        <div className="flex flex-col gap-3 rounded-[26px] p-4" style={{ background: "#FFFFFF" }}>
          <div className="flex items-center justify-between" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: INK }}>
            <span>9:41</span>
            <span style={{ color: INK_MUTED }}>▮▮▮</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg" style={{ background: "#E4F1F8" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={SEL} strokeWidth="1.9" strokeLinecap="round">
                <path d="M3 15c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 4.8-.6" />
                <path d="M3 9.5c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 4.8-.6" />
              </svg>
            </span>
            <span style={{ fontFamily: JAKARTA, fontSize: 14.5, fontWeight: 700, color: INK }}>Make-up Lessons</span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[13.5px] font-semibold" style={{ color: INK }}>Emma&rsquo;s make-up lesson</span>
            <span className="text-[12px]" style={{ color: INK_MUTED }}>Level 3 · missed Tue, Apr 14</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {SLOTS.map((s) => {
              const pick = s.state === "PICK";
              return (
                <div
                  key={s.when}
                  className={`relative flex items-center justify-between rounded-xl px-3 py-2.5 ${pick ? "ap-b ap-slot" : ""}`}
                  style={{
                    background: pick ? SEL : "#FFFFFF",
                    border: `1px solid ${pick ? SEL : "#E5E7EB"}`,
                  }}
                >
                  <span
                    className={`text-[13px] ${pick ? "ap-b ap-slot-txt" : ""}`}
                    style={{ color: pick ? "#FFFFFF" : INK, fontWeight: pick ? 600 : 500 }}
                  >
                    {s.when}
                  </span>
                  {pick ? (
                    <span className="relative flex-none">
                      {/* Stacked counts crossfade, so the row never reflows. */}
                      <span className="ap-b ap-spots3 absolute right-0 whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#B7E3F5" }}>
                        3 SPOTS
                      </span>
                      <span className="ap-b ap-spots2 ap-slot-meta whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "#B7E3F5" }}>
                        2 SPOTS
                      </span>
                    </span>
                  ) : (
                    <span className="flex-none" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: s.state === "FULL" ? "#A1A1AA" : INK_MUTED }}>
                      {s.state}
                    </span>
                  )}
                  {pick && (
                    <span
                      className="ap-b ap-tap1 pointer-events-none absolute left-1/2 top-1/2 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: "rgba(255,255,255,.9)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="ap-b ap-press relative">
            <span
              className="ap-b ap-bookbtn absolute inset-0 flex items-center justify-center rounded-xl text-[13.5px] font-semibold"
              style={{ background: "#F5764E", color: "#FFFFFF" }}
            >
              Book Sat 9:00am
            </span>
            <span
              className="ap-b ap-booked flex items-center justify-center rounded-xl py-2.5 text-[13.5px] font-semibold"
              style={{ background: "#0F8A6D", color: "#FFFFFF" }}
            >
              ✓ Booked · Sat 9:00am
            </span>
            <span
              className="ap-b ap-tap2 pointer-events-none absolute left-1/2 top-1/2 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "rgba(255,255,255,.9)" }}
            />
          </div>

          <div className="relative h-4">
            <span className="ap-b ap-foot-a absolute inset-0 text-[11.5px]" style={{ color: INK_MUTED }}>
              Coach Kim sees the updated roster
            </span>
            <span className="ap-b ap-foot-b absolute inset-0 text-[11.5px]" style={{ color: INK_MUTED }}>
              Confirmation texted to Emma&rsquo;s parents
            </span>
          </div>
        </div>

        <p className="text-[12px] leading-[1.5]" style={{ color: "rgba(238,242,248,.75)" }}>
          School #036&rsquo;s make-up booker. Parents book themselves in, the instructor just sees
          the roster.
        </p>
      </div>
    </div>
  );
}

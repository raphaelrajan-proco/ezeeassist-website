"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";
import FlowerMark from "@/components/sections/FlowerMark";

/**
 * The hero's 12-second chat thread.
 *
 * **Bare bubbles, no device frame.** Answers and Apps both use a phone
 * shell; this page deliberately does not repeat it, so the two speakers
 * are told apart by colour and side alone.
 *
 * The order is the argument and must not be resequenced: ask, offer to
 * raise, **consent**, then logged and confirmed. The consent step is the
 * point. Nothing gets raised on someone's behalf without them saying yes.
 *
 * Fixed hex throughout: chat on a dark band, light in both themes. Base
 * styles are the finished thread, so reduced motion shows all of it.
 */

const FRANCHISEE_BG = "#120A14";
const FRANCHISEE_FG = "#FDF4FB";
const EZEE_BG = "#0077A8";

function Ask({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <p
      className={`tk-h ${className} max-w-[330px] self-start px-4 py-3 text-[13.5px] leading-[1.55]`}
      style={{ background: FRANCHISEE_BG, color: FRANCHISEE_FG, borderRadius: "16px 16px 16px 5px" }}
    >
      {children}
    </p>
  );
}

export default function HeroThread() {
  return (
    <div data-anim className="flex flex-col items-stretch gap-3" aria-hidden="true">
      <span className="tk-h tk-ask self-start" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(253,244,251,.6)" }}>
        STORE #214 · OWNER · 10:04AM
      </span>

      <Ask className="tk-ask">
        I want to run a joint promo with the gym next door. Can someone at HQ approve it?
      </Ask>

      {/* Typing, then the reply. Both sit in the same column so the
          thread does not jump when one replaces the other. */}
      <span
        className="tk-h tk-dots flex w-fit items-center gap-1.5 self-end px-4 py-3.5"
        style={{ background: EZEE_BG, borderRadius: "16px 16px 5px 16px" }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="tk-dot h-1.5 w-1.5 rounded-full" style={{ background: "#BFE6F7" }} />
        ))}
      </span>

      <span className="tk-h tk-reply flex items-center gap-2 self-end">
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(253,244,251,.6)" }}>
          EZEE ASSIST
        </span>
        <FlowerMark size={18} />
      </span>

      <p
        className="tk-h tk-reply max-w-[350px] self-end px-4 py-3 text-[13.5px] leading-[1.55]"
        style={{ background: EZEE_BG, color: "#FFFFFF", borderRadius: "16px 16px 5px 16px" }}
      >
        Partner promos need a person. Marketing owns the approval and Legal checks the terms. Want
        me to raise it for you?
      </p>

      <Ask className="tk-ack">Yes please.</Ask>

      <div
        className="tk-h tk-logged flex max-w-[350px] flex-col gap-2.5 self-end px-4 py-3"
        style={{ background: EZEE_BG, color: "#FFFFFF", borderRadius: "16px 16px 5px 16px" }}
      >
        <span className="text-[13.5px] leading-[1.55]">
          Raised as <b>#4471</b>. Marketing has it, Legal is notified, and your location, spend to
          date, and the co-promotion policy are already attached.
        </span>
        <span className="tk-h tk-tag flex flex-wrap gap-1.5">
          {["MARKETING · OWNER", "LEGAL · REVIEW", "SLA 2 DAYS"].map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-md"
              style={{
                fontFamily: MONO, fontSize: 12, fontWeight: 600, padding: "4px 9px",
                background: "rgba(255,255,255,.16)", color: "#FFFFFF",
              }}
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      <span className="tk-h tk-logged self-end text-right" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(253,244,251,.5)" }}>
        TRACKED UNTIL IT CLOSES
      </span>
    </div>
  );
}

"use client";

import { JAKARTA, MONO } from "@/components/platform/shared";

/**
 * The two animated artifacts on the Integrations page.
 *
 * Both are white product cards on their own surfaces with fixed dark
 * ink, and in both the base styles are the finished state so reduced
 * motion leaves a complete card rather than an empty one.
 */

const INK = "#0A0A0A";
const MUTED = "#52525B";
const RULE = "#EEF0F4";
const ACCENT = "#0077A8";

/** ── Hero: connect a system, then read from it. 15s. ── */
export function ConnectCard() {
  const scopes = [
    { label: "Appointments and capacity", mode: "READ", cls: "ig-scope1" },
    { label: "Client visit history", mode: "READ", cls: "ig-scope2" },
    { label: "Create a booking, held for approval", mode: "WRITE", cls: "ig-scope3" },
  ];
  return (
    <div
      data-anim
      className="overflow-hidden rounded-[18px]"
      style={{ background: "#FFFFFF", boxShadow: "0 34px 80px -30px rgba(6,18,32,.8)" }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5 px-5 py-3" style={{ background: "#F8FAFC", borderBottom: `1px solid ${RULE}` }}>
        <span
          className="flex h-5 w-5 flex-none items-center justify-center rounded-md"
          style={{ background: ACCENT, color: "#FFFFFF", fontFamily: JAKARTA, fontSize: 12, fontWeight: 800 }}
        >
          E
        </span>
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: MUTED }}>
          CONNECTIONS · ADD A SYSTEM
        </span>
        {/* CONNECTING and CONNECTED share one slot and crossfade. */}
        <span className="relative ml-auto block h-4 w-[128px]">
          <span className="ig-k ig-wait absolute right-0 top-0 whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: MUTED }}>
            ● CONNECTING
          </span>
          <span className="ig-k ig-live absolute right-0 top-0 whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: "#0D7C58" }}>
            ● CONNECTED
          </span>
        </span>
      </div>

      <div className="ig-k ig-req flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span
          className="flex h-8 w-8 flex-none items-center justify-center rounded-lg"
          style={{ background: "rgba(0,119,168,.1)", color: ACCENT, fontFamily: JAKARTA, fontSize: 14, fontWeight: 800 }}
        >
          M
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[14px] font-semibold" style={{ color: INK }}>Mindbody</span>
          <span className="text-[12.5px]" style={{ color: MUTED }}>Scheduling · 214 locations</span>
        </span>
        <span
          className="ml-auto flex-none rounded"
          style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: "3px 8px", background: "#EEF0F4", color: MUTED }}
        >
          OAUTH
        </span>
      </div>

      <div className="px-5 py-2.5" style={{ background: "#FBFCFE", borderBottom: `1px solid ${RULE}` }}>
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: MUTED }}>SCOPES YOU GRANT</span>
      </div>

      {scopes.map((s) => (
        <div key={s.label} className={`ig-k ${s.cls} flex items-center gap-2.5 px-5 py-2.5`} style={{ borderBottom: `1px solid ${RULE}` }}>
          <span className="flex-none" style={{ color: "#0D7C58" }}>✓</span>
          <span className="text-[13px]" style={{ color: INK }}>{s.label}</span>
          <span
            className="ml-auto flex-none"
            style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: s.mode === "WRITE" ? "#B45309" : MUTED }}
          >
            {s.mode}
          </span>
        </div>
      ))}

      <div className="ig-k ig-sync flex flex-col gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${RULE}` }}>
        <span className="flex items-baseline justify-between gap-3">
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: ACCENT }}>READING AT THE SOURCE</span>
          <span className="flex-none text-[12px]" style={{ color: MUTED }}>no copy stored</span>
        </span>
        <span className="block h-1 w-full overflow-hidden rounded-full" style={{ background: "#E7E9EF" }}>
          <span className="ig-k ig-read block h-full rounded-full" style={{ width: "100%", background: ACCENT }} />
        </span>
      </div>

      <div className="flex flex-col gap-2 px-5 py-4">
        <span className="ig-k ig-ask text-[13.5px] font-semibold" style={{ color: INK }}>
          &ldquo;How booked is next week?&rdquo;
        </span>
        <span className="ig-k ig-ans text-[13px] leading-[1.55]" style={{ color: MUTED }}>
          62% booked. Read from Mindbody one second ago.
        </span>
      </div>
    </div>
  );
}

/** ── §4: one soft week, four systems, one held for approval. 18s. ── */
export function WriteBackCard() {
  const steps = [
    { tile: "M", tone: ["rgba(0,119,168,.1)", ACCENT],       cls: "ig-w1", title: "Reads next week's capacity from Mindbody",   meta: "62% booked, 340 clients lapsed past 90 days",       mode: "READ" },
    { tile: "C", tone: ["rgba(124,58,237,.1)", "#7C3AED"],   cls: "ig-w2", title: "Drafts the reactivation offer in Mailchimp",  meta: "Brand-approved template, 340 recipients, unsent",   mode: "WRITE", hold: true },
    { tile: "T", tone: ["rgba(13,124,88,.11)", "#0D7C58"],   cls: "ig-w3", title: "Opens the follow-up task in Microsoft Teams", meta: "Assigned to Dana R., the coach for West territory", mode: "WRITE" },
    { tile: "Q", tone: ["rgba(47,92,128,.11)", "#2F5C80"],   cls: "ig-w4", title: "Logs the approved spend against QuickBooks",  meta: "Local marketing budget, with the owner's approval attached", mode: "WRITE" },
  ];
  return (
    <div
      data-anim
      className="ed-card ed-border overflow-hidden rounded-2xl border"
      style={{ boxShadow: "0 24px 54px -34px rgba(12,20,36,.4)" }}
      aria-hidden="true"
    >
      <div className="ed-card-alt ed-rule flex items-baseline justify-between gap-3 border-b px-5 py-3">
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "var(--ed-fg-muted)" }}>
          ONE SOFT WEEK AT STORE #331
        </span>
        <span className="flex-none" style={{ fontFamily: MONO, fontSize: 12, color: "var(--ed-fg-muted)" }}>4 SYSTEMS TOUCHED</span>
      </div>

      {steps.map((s) => (
        <div key={s.tile} className={`ig-w ${s.cls} ed-rule flex items-start gap-3 border-b px-5 py-3.5`}>
          <span
            className="flex h-7 w-7 flex-none items-center justify-center rounded-lg"
            style={{ background: s.tone[0], color: s.tone[1], fontFamily: JAKARTA, fontSize: 13, fontWeight: 800 }}
          >
            {s.tile}
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="ed-fg text-[13.5px] font-semibold leading-[1.4]">{s.title}</span>
            <span className="ed-fg-muted text-[12.5px]">{s.meta}</span>
          </span>
          <span className="ml-auto flex flex-none flex-col items-end gap-1">
            <span
              className="rounded"
              style={{
                fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: "3px 8px",
                background: s.mode === "WRITE" ? "rgba(180,83,9,.11)" : "var(--ed-card-alt)",
                color: s.mode === "WRITE" ? "var(--warn)" : "var(--ed-fg-muted)",
              }}
            >
              {s.mode}
            </span>
            {/* The hold is the point of the section. Do not drop it. */}
            {s.hold && (
              <span className="ig-w ig-hold whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "var(--warn)" }}>
                HELD FOR OWNER
              </span>
            )}
          </span>
        </div>
      ))}

      <div className="p-4">
        <div
          className="ig-w ig-done flex items-start gap-2.5 rounded-xl px-4 py-3"
          style={{ background: "var(--chip-bg)", border: "1px solid var(--chip-bd)" }}
        >
          <span
            className="flex h-5 w-5 flex-none items-center justify-center rounded"
            style={{ background: "var(--ed-accent-text)", color: "#FFFFFF" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5L20 6.5" />
            </svg>
          </span>
          <span className="ed-fg text-[13px] leading-[1.55]">
            Owner approved at 6:50pm. Every write landed in the system that owns it, with a record of
            who allowed it.
          </span>
        </div>
      </div>
    </div>
  );
}

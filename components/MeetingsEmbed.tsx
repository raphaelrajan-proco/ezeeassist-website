"use client";

import { useEffect } from "react";

/**
 * The HubSpot meetings widget, shared by the booking page and anywhere
 * else a calendar is dropped in.
 *
 * The embed script scans the DOM for `.meetings-iframe-container` when it
 * executes, so it is injected in an effect on every mount rather than
 * through `next/script`: next/script dedupes by src and never re-runs,
 * which leaves the container empty whenever the page is returned to
 * through client-side navigation. The cleanup removes the tag so the next
 * mount injects and re-runs it.
 */

export const MEETING_URL =
  "https://meetings-na2.hubspot.com/raphael-rajan/raphael-rajan-ezee-assist";
const MEETINGS_SCRIPT =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

export default function MeetingsEmbed({
  className = "",
  onDark = false,
}: {
  className?: string;
  /** Tints the loading shell for a dark background. */
  onDark?: boolean;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = MEETINGS_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <div
      id="book-a-time"
      className={`w-full rounded-2xl overflow-hidden ${className}`}
      style={{
        /* The widget manages its own height (~756px desktop) via the
           script; the min height stops the page collapsing while it
           loads, and the fallback link covers the script being blocked. */
        minHeight: 640,
        backgroundColor: onDark ? "rgba(255,255,255,0.04)" : "rgba(12,20,36,0.03)",
      }}
    >
      <div
        className="meetings-iframe-container w-full"
        data-src={`${MEETING_URL}?embed=true`}
      />
      <noscript>
        <a
          href={MEETING_URL}
          style={{ color: onDark ? "#FFFFFF" : "#0077A8", textDecoration: "underline" }}
        >
          Book a time
        </a>
      </noscript>
    </div>
  );
}

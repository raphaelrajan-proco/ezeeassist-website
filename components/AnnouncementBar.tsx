"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// TODO: Wire to real resource when published. Never load-bearing.
const ANNOUNCEMENT = {
  text: "New: the 2026 Franchise AI Readiness Report",
  linkLabel: "Read it",
  href: "/resources",
  /** Bump this key to re-show the bar after changing the message. */
  storageKey: "ezee-announcement-2026-readiness",
};

/**
 * Launch gate. The bar is built and kept, but stays hidden until the
 * linked asset exists. Flip SHOW_ANNOUNCEMENT to true to restore it.
 *
 * Thin dismissible bar above the nav. Single item, no rotation.
 * Dismissal persists in localStorage. Renders nothing until the
 * client has checked storage so a dismissed bar never flashes in.
 */
const SHOW_ANNOUNCEMENT = false;

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!SHOW_ANNOUNCEMENT) return;
    try {
      if (window.localStorage.getItem(ANNOUNCEMENT.storageKey) !== "dismissed") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(ANNOUNCEMENT.storageKey, "dismissed");
    } catch {
      /* storage unavailable, dismissal is session-only */
    }
  }

  return (
    <div
      className="relative w-full"
      style={{
        backgroundColor: "var(--ed-bg-alt)",
        borderBottom: "1px solid var(--ed-rule)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-center gap-3 py-2.5 pr-8">
          <p className="ed-fg text-[13px] text-center" style={{ fontWeight: 500 }}>
            {ANNOUNCEMENT.text}{" "}
            <Link
              href={ANNOUNCEMENT.href}
              className="whitespace-nowrap"
              style={{
                color: "#00AEEF",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                textDecorationThickness: "1px",
              }}
            >
              {ANNOUNCEMENT.linkLabel}
            </Link>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full transition-opacity hover:opacity-60"
      >
        <X aria-hidden="true" className="w-3.5 h-3.5" strokeWidth={2} style={{ color: "var(--ed-fg-muted)" }} />
      </button>
    </div>
  );
}

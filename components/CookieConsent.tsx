"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { dispatchConsentEvent } from "@/lib/cookie-consent";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    dispatchConsentEvent();
    setVisible(false);
    Snitcher.giveCookieConsent();
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    dispatchConsentEvent();
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          /* Pinned bottom-left and sized to its content so it never spans
             the viewport or covers centred section content. */
          className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 sm:max-w-[420px]"
        >
          <div className="flex items-center gap-3 rounded-full border border-[#E5E7EB] dark:border-white/[0.08] bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md px-4 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <p className="text-[12.5px] leading-tight text-gray-600 dark:text-gray-400 min-w-0 flex-1">
              We use cookies.{" "}
              <Link
                href="/privacy"
                className="text-[#0077A8] dark:text-[#00AEEF] underline-offset-2 hover:underline"
                style={{ fontWeight: 600 }}
              >
                Privacy
              </Link>
            </p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="rounded-full px-2.5 py-1 text-[12px] text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-800 dark:hover:text-gray-200"
                style={{ fontWeight: 600 }}
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="rounded-full bg-[#00AEEF] px-3.5 py-1 text-[12px] text-white transition-opacity hover:opacity-90"
                style={{ fontWeight: 600 }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

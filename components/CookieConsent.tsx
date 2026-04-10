"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
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
          className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className="w-full max-w-4xl rounded-2xl border border-[#E5E7EB] bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-6 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-gray-600">
                We use cookies to improve your experience and analyze site traffic.{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#00AEEF] underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700 sm:w-auto w-full"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-lg bg-[#00AEEF] px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto w-full"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

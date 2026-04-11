"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

// TODO: Wire form submission to HubSpot Forms API or custom endpoint

const DISMISSED_KEY = "exit-intent-dismissed";
const SUBMITTED_KEY = "gated-content-submitted";

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#1A1A1A] px-4 py-2.5 text-sm text-[#0A0A0A] dark:text-[#F0F0F0] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/20 transition-all";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or submitted gated form
    if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(SUBMITTED_KEY)) return;

    // Desktop: exit intent on mouse moving toward top of window
    let triggered = false;
    function handleMouseLeave(e: MouseEvent) {
      if (triggered) return;
      if (e.clientY <= 8) { triggered = true; setShow(true); }
    }

    // Mobile: 45s inactivity timer
    let inactivityTimer: ReturnType<typeof setTimeout>;
    function resetTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => { if (!triggered) { triggered = true; setShow(true); } }, 45_000);
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      resetTimer();
      window.addEventListener("scroll", resetTimer, { passive: true });
      window.addEventListener("touchstart", resetTimer, { passive: true });
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  function handleDismiss() {
    localStorage.setItem(DISMISSED_KEY, "true");
    setShow(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Exit intent form submission:", data);
    // TODO: Wire to HubSpot Forms API
    localStorage.setItem(SUBMITTED_KEY, "true");
    setSubmitted(true);
    setTimeout(() => setShow(false), 2500);
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="ei-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Modal — slides down from top */}
          <motion.div
            key="ei-modal"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed left-0 right-0 top-0 z-[101] flex justify-center px-4 pt-6"
          >
            <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-[#161616] shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] dark:border-white/[0.08] bg-white dark:bg-[#1A1A1A] text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>

              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-4">
                    <p className="text-xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2">On its way! 📬</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Check your email for the download link.</p>
                  </div>
                ) : (
                  <>
                    {/* Blue accent bar */}
                    <div className="w-10 h-1 bg-[#00AEEF] rounded mb-5" />
                    <h2
                      className="text-2xl font-bold text-[#0A0A0A] dark:text-[#F0F0F0] mb-2"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Before you go...
                    </h2>
                    <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 mb-6">
                      Get our free Franchise AI Support Playbook — the same strategies used by brands like WSI, DekaLash, and DivaDance.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] mb-1">Work Email *</label>
                        <input name="email" type="email" required placeholder="jane@yourfranchise.com" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0A0A] dark:text-[#F0F0F0] mb-1">Company Name *</label>
                        <input name="company" type="text" required placeholder="Franchise Brand Inc." className={inputClass} />
                      </div>
                      <Button size="md" className="w-full mt-1" type="submit">
                        Send Me the Playbook
                      </Button>
                    </form>
                    <button
                      onClick={handleDismiss}
                      className="mt-4 w-full text-center text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      No thanks, I&apos;ll figure it out myself
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

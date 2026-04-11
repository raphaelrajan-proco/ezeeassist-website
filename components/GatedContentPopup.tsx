"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

// TODO: Wire form submission to HubSpot Forms API or custom endpoint

const STORAGE_KEY = "gated-content-submitted";

const locationOptions = ["Select number of locations", "1–10", "11–50", "51–100", "100–500", "500+"];

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0A0A0A] placeholder:text-gray-400 focus:border-[#00AEEF] focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/20 transition-all";

interface GatedContentPopupProps {
  /** Control visibility from parent */
  show: boolean;
  onClose: () => void;
}

export default function GatedContentPopup({ show, onClose }: GatedContentPopupProps) {
  const [submitted, setSubmitted] = useState(false);

  // Don't show if already submitted
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      onClose();
    }
  }, [onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Gated content form submission:", data);
    // TODO: Wire to HubSpot Forms API
    localStorage.setItem(STORAGE_KEY, "true");
    setSubmitted(true);
  }

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    onClose();
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left — offer */}
                <div
                  className="flex flex-col justify-center p-8 md:p-10"
                  style={{ background: "linear-gradient(135deg, #F0F9FF 0%, #ffffff 100%)" }}
                >
                  {/* Report cover placeholder */}
                  <div className="flex items-center justify-center w-full aspect-[3/4] max-w-[200px] mx-auto rounded-xl border border-[#E5E7EB] bg-gradient-to-br from-[#00AEEF]/10 to-[#00AEEF]/5 shadow-md mb-6">
                    <div className="text-center px-4">
                      <div className="w-8 h-1 bg-[#00AEEF] rounded mb-3 mx-auto" />
                      <p className="text-xs font-bold text-[#0A0A0A] leading-tight">
                        2026 Franchise AI Support Playbook
                      </p>
                      <p className="text-[10px] text-gray-500 mt-2">EZee Assist</p>
                    </div>
                  </div>
                  <h2
                    className="text-xl font-bold text-[#0A0A0A] mb-3"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Download the 2026 Franchise AI Support Playbook
                  </h2>
                  <p className="text-sm leading-6 text-gray-600">
                    How leading franchise brands are using AI to reduce support costs, improve franchisee satisfaction, and scale operations — based on real data from EZee Assist customers.
                  </p>
                </div>

                {/* Right — form */}
                <div className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-[#E5E7EB]">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00AEEF]/10">
                        <span className="text-2xl">📬</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0A0A0A]">You&apos;re all set!</h3>
                      <p className="text-sm text-gray-600">
                        Thanks! Check your email for the download link.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">First Name *</label>
                          <input name="firstName" type="text" required placeholder="Jane" className={inputClass} />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">Last Name *</label>
                          <input name="lastName" type="text" required placeholder="Smith" className={inputClass} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">Work Email *</label>
                        <input name="email" type="email" required placeholder="jane@yourfranchise.com" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">Company *</label>
                        <input name="company" type="text" required placeholder="Franchise Brand Inc." className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">Number of Locations</label>
                        <select name="locations" className={inputClass}>
                          {locationOptions.map((o) => (
                            <option key={o} value={o === locationOptions[0] ? "" : o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <Button size="md" className="w-full mt-1" type="submit">
                        Get the Playbook
                      </Button>
                      <p className="text-center text-xs text-gray-400">
                        We respect your privacy. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Trigger hook: scroll 60% + 30s on homepage ──────────────
export function useGatedPopupTrigger() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) || localStorage.getItem("demo-booked")) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let timerFired = false;
    let scrollFired = false;

    function tryShow() {
      if (timerFired && scrollFired && !localStorage.getItem(STORAGE_KEY)) setShow(true);
    }

    timeoutId = setTimeout(() => { timerFired = true; tryShow(); }, 30_000);

    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.6) { scrollFired = true; tryShow(); window.removeEventListener("scroll", onScroll); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => { clearTimeout(timeoutId); window.removeEventListener("scroll", onScroll); };
  }, []);

  return { show, setShow };
}

// ── Trigger hook: 20s on case studies pages ─────────────────
export function useCaseStudyPopupTrigger() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) || localStorage.getItem("demo-booked")) return;
    const id = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
    }, 20_000);
    return () => clearTimeout(id);
  }, []);

  return { show, setShow };
}

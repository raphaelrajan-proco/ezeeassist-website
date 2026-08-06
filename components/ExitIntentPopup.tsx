"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

// TODO: Wire form submission to HubSpot Forms API or custom endpoint

/* ── Flip to true to bring the "Before you go" modal back ─────
   Hidden for the MVP launch and wanted back within days, so this is a flag
   rather than an unmount in layout.tsx: the component keeps its dwell and
   scroll gates, its session keys, its copy and its styling, and one word
   turns it on. Gating here rather than at the mount point also means the
   listeners are never attached while it is off. */
const SHOW_EXIT_INTENT = false;

const DISMISSED_KEY = "exit-intent-dismissed";
const SUBMITTED_KEY = "gated-content-submitted";
/** Session-scoped so the modal can fire at most once per visit. */
const SHOWN_THIS_SESSION_KEY = "exit-intent-shown-session";

/** No modal inside the first 30 seconds of the visit. */
const MIN_DWELL_MS = 30_000;
/** No modal until the visitor has scrolled past the hero. */
const MIN_SCROLL_PX = 700;

/* The modal runs on the homepage's editorial tokens rather than the old
   v1 greys, so its type and surfaces match the hero. It mounts from
   `layout.tsx`, outside the homepage's `.theme-editorial` wrapper, so the
   card carries that class itself or every `--ed-*` resolves to nothing. */
const JAKARTA = "var(--font-editorial)";

const inputClass =
  "w-full rounded-xl px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#0077A8]";
const inputStyle: React.CSSProperties = {
  background: "var(--ed-bg)",
  border: "1px solid var(--ed-border)",
  color: "var(--ed-fg)",
};
const labelStyle: React.CSSProperties = {
  fontFamily: JAKARTA, fontSize: 13, fontWeight: 600, color: "var(--ed-fg)",
};

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!SHOW_EXIT_INTENT) return;
    // Don't show if already dismissed, already submitted, or already
    // shown once in this session.
    if (
      localStorage.getItem(DISMISSED_KEY) ||
      localStorage.getItem(SUBMITTED_KEY) ||
      sessionStorage.getItem(SHOWN_THIS_SESSION_KEY)
    ) {
      return;
    }

    const mountedAt = Date.now();
    let scrolledPastHero = window.scrollY >= MIN_SCROLL_PX;
    let triggered = false;

    function trackScroll() {
      if (window.scrollY >= MIN_SCROLL_PX) scrolledPastHero = true;
    }
    window.addEventListener("scroll", trackScroll, { passive: true });

    /** Both gates must pass: dwell time and scroll depth. */
    function mayShow() {
      return (
        !triggered &&
        Date.now() - mountedAt >= MIN_DWELL_MS &&
        scrolledPastHero
      );
    }

    function fire() {
      triggered = true;
      sessionStorage.setItem(SHOWN_THIS_SESSION_KEY, "true");
      setShow(true);
    }

    // Desktop: exit intent on mouse moving toward top of window
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 8 && mayShow()) fire();
    }

    // Mobile: inactivity timer, still subject to both gates
    let inactivityTimer: ReturnType<typeof setTimeout>;
    function resetTimer() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => { if (mayShow()) fire(); }, 45_000);
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
      window.removeEventListener("scroll", trackScroll);
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
            <div
              className="theme-editorial relative w-full max-w-lg rounded-3xl overflow-hidden"
              style={{
                background: "var(--ed-card)",
                border: "1px solid var(--ed-border)",
                boxShadow: "0 32px 90px -30px rgba(4,32,54,0.45)",
              }}
            >
              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                style={{ border: "1px solid var(--ed-border)", background: "var(--ed-bg)", color: "var(--ed-fg-muted)" }}
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="p-8 md:p-10">
                {submitted ? (
                  <div className="py-6">
                    <p
                      className="mb-2"
                      style={{ fontFamily: JAKARTA, fontWeight: 700, fontSize: 24, letterSpacing: "-0.03em", color: "var(--ed-fg)" }}
                    >
                      On its way.
                    </p>
                    <p className="text-[15px]" style={{ color: "var(--ed-fg-muted)", lineHeight: 1.6 }}>
                      Check your email for the download link.
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="mb-6"
                      style={{ width: 44, height: 4, borderRadius: 999, background: "var(--ed-accent-text)" }}
                    />
                    <h2
                      className="mb-3"
                      style={{
                        fontFamily: JAKARTA, fontWeight: 700,
                        fontSize: "clamp(1.5rem, 1.2rem + 1.2vw, 2rem)",
                        letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--ed-fg)",
                      }}
                    >
                      Before you go.
                    </h2>
                    <p className="text-[15px] mb-7" style={{ color: "var(--ed-fg-muted)", lineHeight: 1.6 }}>
                      Get the free Franchise AI Playbook, the same plays run by
                      brands like WSI, Aqua-Tots, HorsePower Brands, Deka+ and
                      more.
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="ei-email" style={labelStyle}>Work email</label>
                        <input id="ei-email" name="email" type="email" required placeholder="jane@yourfranchise.com" className={inputClass} style={inputStyle} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="ei-company" style={labelStyle}>Company name</label>
                        <input id="ei-company" name="company" type="text" required placeholder="Franchise Brand Inc." className={inputClass} style={inputStyle} />
                      </div>
                      {/* Same shape as the hero CTA. */}
                      {/* Label centred, arrow pinned to the right edge. The
                          spacer mirrors the badge so the label stays
                          optically centred rather than pushed left by it.
                          `justifyContent` is inline because
                          `.theme-editorial .ed-btn` sets `center` at a
                          higher specificity than Tailwind's utility. */}
                      <button
                        type="submit"
                        className="ed-btn ed-btn-arrow mt-1 w-full"
                        style={{
                          backgroundColor: "var(--ed-accent-text)",
                          color: "#FFFFFF",
                          justifyContent: "space-between",
                        }}
                      >
                        <span aria-hidden="true" className="h-8 w-8 flex-none" />
                        Send me the playbook
                        <span className="ed-btn-arrow-badge" aria-hidden="true">
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </span>
                      </button>
                    </form>
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

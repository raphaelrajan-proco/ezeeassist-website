"use client";

import { useEffect, useState } from "react";

/**
 * True below 768px, the one breakpoint the mobile homepage pass uses.
 *
 * **Returns `false` on the first render, always.** Server and client must
 * agree on the initial HTML or React throws a hydration mismatch, and the
 * server has no viewport. So the desktop tree renders first and the mobile
 * tree swaps in after mount, which is the same pattern `AlwaysOn`'s
 * `useIsDesktop` already uses on this page.
 *
 * That swap is why this hook is a last resort: **prefer `max-md:` classes
 * or a `@media (max-width: 767.98px)` block**, which need no JS, cost no
 * hydration pass, and cannot flash. Reach for the hook only where mobile
 * needs genuinely different DOM rather than different styling.
 */
export function useIsMobile() {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return is;
}

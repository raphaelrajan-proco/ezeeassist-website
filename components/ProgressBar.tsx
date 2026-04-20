"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress once
NProgress.configure({ showSpinner: false, trickleSpeed: 200 });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop  = () => NProgress.done();

    document.addEventListener("click", (e) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      // Only trigger for same-origin internal links
      if (href.startsWith("/") || href.startsWith(window.location.origin)) {
        handleStart();
      }
    });

    window.addEventListener("popstate", handleStop);

    return () => {
      window.removeEventListener("popstate", handleStop);
    };
  }, []);

  return null;
}

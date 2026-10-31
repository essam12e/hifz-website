"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Re-measure every ScrollTrigger once web fonts and images are in (they can change text height). */
export function RefreshOnLoad() {
  useEffect(() => {
    let alive = true;
    const refresh = () => alive && ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => {
      alive = false;
      window.removeEventListener("load", refresh);
    };
  }, []);
  return null;
}

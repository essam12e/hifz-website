"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // Mobile URL-bar show/hide must not re-layout every pinned scene.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** true when the static layout is used (set before paint in layout.tsx). */
export function isLite(): boolean {
  return typeof document === "undefined" || document.documentElement.dataset.motion !== "full";
}

export const MQ = {
  desktop: "(min-width: 900px)",
  mobile: "(max-width: 899px)",
} as const;

export { gsap, ScrollTrigger, useGSAP };

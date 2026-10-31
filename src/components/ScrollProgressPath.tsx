"use client";
import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { progressPath } from "@/animations/progressPath";

export function ScrollProgressPath() {
  const wrap = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const svg = wrap.current?.querySelector("svg");
      if (!svg) return;
      return progressPath(svg, wrap.current!.querySelector("[data-path-label]"));
    },
    { scope: wrap },
  );
  return (
    <div ref={wrap} className="journey-path" aria-hidden="true">
      <svg viewBox="0 0 60 1000" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="jp-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--jp-a)" />
            <stop offset="1" stopColor="var(--jp-b)" />
          </linearGradient>
          <radialGradient id="jp-glow">
            <stop offset="0" stopColor="var(--jp-dot)" stopOpacity=".55" />
            <stop offset="1" stopColor="var(--jp-dot)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path data-track="" className="jp-track" d="M30 0 L30 1000" />
        <path data-line="" className="jp-line" d="M30 0 L30 1000" />
        <g data-marks="" className="jp-marks" />
        <g data-dot="">
          <circle r="16" fill="url(#jp-glow)" />
          <rect x="-5.5" y="-5.5" width="11" height="11" rx="1.5" transform="rotate(45)" className="jp-dot" />
        </g>
      </svg>
      <span className="jp-label" data-path-label="" />
    </div>
  );
}

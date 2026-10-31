"use client";
import { useRef } from "react";
import { gsap, useGSAP, isLite, MQ } from "@/lib/gsap";
import { continuity, revealBlocks } from "@/animations/sections";
import { screen, type ScreenId } from "@/content/screens";
import { CinematicPhone } from "./CinematicPhone";

const items: { id: ScreenId; title: string; body: string }[] = [
  { id: "50-quran-home", title: "آية اليوم", body: "" },
  { id: "10-stats", title: "التقدم", body: "" },
  { id: "09-log", title: "سجل الأخطاء", body: "" },
];

/** V3 «daily» composition: copy on one side, the real screens as a deck on the other. */
export function ContinuitySection() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (isLite() || !root.current) return;
      const el = root.current;
      revealBlocks(el, "[data-reveal]");
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => continuity(el, false));
      mm.add(MQ.mobile, () => continuity(el, true));
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} id="continuity" className="continuity" data-section="الاستمرارية">
      <div className="continuity-copy">
        <span className="kicker" data-reveal="">الاستمرارية</span>
        <h2 data-reveal="">كل يوم، خطوة.</h2>
        <p data-reveal="">آية اليوم، وتقدمك، وسجل أخطائك. من تسميعك أنت.</p>
        <p className="fine-print" data-reveal="">الأرقام في اللقطات بيانات تجريبية.</p>
      </div>
      <div className="deck" data-fan-row="">
        {items.map((it) => (
          <div className="deck-item" data-fan="" key={it.id}>
            <CinematicPhone shots={[screen(it.id)]} dataPhone={false} />
          </div>
        ))}
      </div>
    </section>
  );
}

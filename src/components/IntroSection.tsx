"use client";
import { useRef } from "react";
import { useGSAP, isLite } from "@/lib/gsap";
import { revealBlocks } from "@/animations/sections";

export function IntroSection() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { if (!isLite() && root.current) revealBlocks(root.current); }, { scope: root });
  return (
    <section ref={root} id="story" className="intro" data-section="الرحلة">
      <span className="kicker" data-reveal="">رحلة الحفظ</span>
      <h2 data-reveal="">
        اقرأ، وسمِّع، وراجع.
        <br />
        من الشاشة نفسها.
      </h2>
      <p data-reveal="">انزل بهدوء؛ كل مشهد يعرض شاشة حقيقية من التطبيق.</p>
    </section>
  );
}

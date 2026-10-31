"use client";
import { useRef } from "react";
import { useGSAP, isLite } from "@/lib/gsap";
import { interlude } from "@/animations/sections";
import verse from "@/content/verse.json";
import { Logo } from "./Logo";

/** The ayah text is read from the app's quran.json at build time (scripts/prepare_assets.py). */
export function VerseInterlude() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { if (!isLite() && root.current) interlude(root.current); }, { scope: root });
  const n = verse.number.toLocaleString("ar-EG");
  return (
    <section ref={root} className="interlude on-dark" data-section="آية" data-tone="dark" aria-label="آية">
      <div className="interlude-watermark" data-watermark="" aria-hidden="true">
        <Logo variant="white" height={420} />
      </div>
      <div className="interlude-rings" data-layer="back" aria-hidden="true" />
      <div className="interlude-inner" data-layer="front">
        <span className="kicker">المصحف · التسميع · الاستماع · الأذكار</span>
        <blockquote className="ayah" lang="ar">
          <span className="ayah-text">﴿{verse.text}﴾</span>
          <cite>
            سورة {verse.surah} · {n}
          </cite>
        </blockquote>
        <p>والآن، من القرآن إلى الأذكار.</p>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, useGSAP, isLite, MQ } from "@/lib/gsap";
import { heroIntro, heroScroll } from "@/animations/hero";
import { crop, screen } from "@/content/screens";
import { CinematicPhone } from "./CinematicPhone";
import { Logo } from "./Logo";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isLite() || !root.current) return;
      const el = root.current;
      heroIntro(el);
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => heroScroll(el, false));
      mm.add(MQ.mobile, () => heroScroll(el, true));
      return () => mm.revert();
    },
    { scope: root },
  );

  const start = crop("home-start");
  const review = crop("home-review");

  return (
    <section ref={root} id="top" className="hero on-dark" data-section="البداية" data-tone="dark">
      <div className="hero-rings" aria-hidden="true" data-rings="" />
      <div className="hero-copy">
        <div data-intro="">
          <Logo variant="white" height={86} className="hero-logo" priority />
        </div>
        <p className="kicker" data-intro="">
          تطبيق أندرويد للقرآن الكريم والأذكار
        </p>
        <h1 data-intro="">
          رفيقك في حفظ
          <br />
          القرآن الكريم.
        </h1>
        <p className="hero-lead" data-intro="">
          مصحف بصفحات مصحف المدينة، وتسميع يُخفي الآيات ويكشف الكلمة بعد قراءتها، ومراجعة مجدولة، وحصن المسلم كاملًا.
        </p>
        <div className="hero-actions" data-intro="">
          <a className="btn btn-light" href="#recitation">
            شاهد كيف يعمل
          </a>
          <a className="btn btn-ghost" href="#download">
            التحميل
          </a>
        </div>
      </div>

      <div className="hero-art" data-art="">
        <div className="hero-halo" aria-hidden="true" />
        <div className="hero-phone-wrap" data-hero-phone="">
          <CinematicPhone shots={[screen("50-quran-home")]} priority dataPhone={false} />
        </div>
        <div className="hero-card hero-card-a" data-hero-card="" aria-hidden="true">
          <img src={start.src} width={start.w} height={start.h} alt="" decoding="async" />
        </div>
        <div className="hero-card hero-card-b" data-hero-card="" aria-hidden="true">
          <img src={review.src} width={review.w} height={review.h} alt="" decoding="async" />
        </div>
      </div>

      <a className="scroll-cue" href="#story" data-intro="">
        <ArrowDown size={16} strokeWidth={1.6} aria-hidden="true" />
        انزل لتشاهد التطبيق
      </a>
    </section>
  );
}

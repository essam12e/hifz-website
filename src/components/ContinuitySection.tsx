"use client";
import { useRef } from "react";
import { gsap, useGSAP, isLite, MQ } from "@/lib/gsap";
import { continuity, revealBlocks } from "@/animations/sections";
import { screen, type ScreenId } from "@/content/screens";
import { CinematicPhone } from "./CinematicPhone";

const items: { id: ScreenId; title: string; body: string }[] = [
  { id: "08-review", title: "مراجعة اليوم", body: "كل صفحة محفوظة مجدولة بخوارزمية FSRS، ويُقيَّم حفظها بعدد أخطائك فيها." },
  { id: "50-quran-home", title: "آية اليوم", body: "آية جديدة كل يوم على الشاشة الرئيسية، تفتحها في المصحف أو تستمع إليها." },
  { id: "10-stats", title: "التقدم", body: "صفحاتك المحفوظة، وأضعف الآيات، وخريطة للمصحف تبيّن قوة الحفظ." },
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
        <h2 data-reveal="">مراجعة تحفظ ما حفظت.</h2>
        <p data-reveal="">يقترح التطبيق ما تراجعه اليوم وما تحفظه بعده، ويعرض تقدمك من سجلّ تسميعك.</p>
        <ol className="continuity-list">
          {items.map((it) => (
            <li key={it.id} data-reveal="">
              <strong>{it.title}</strong>
              <span>{it.body}</span>
            </li>
          ))}
        </ol>
        <p className="fine-print" data-reveal="">الأرقام الظاهرة في هذه اللقطات بيانات تجريبية من بيئة اختبار التطبيق.</p>
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

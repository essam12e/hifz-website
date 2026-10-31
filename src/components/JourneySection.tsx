"use client";
import { useRef } from "react";
import { BookMarked, BookOpen, CircleDot, Download, Headphones, ListChecks, Lock, Mic, Smartphone, Sun } from "lucide-react";
import { gsap, useGSAP, isLite, MQ } from "@/lib/gsap";
import { buildJourney } from "@/animations/journey";
import { STEPS } from "@/animations/choreography";
import { chapters, type LayerIcon } from "@/content/journey";
import { crop, screen } from "@/content/screens";
import { CinematicPhone } from "./CinematicPhone";

const ar = (n: number) => n.toLocaleString("ar-EG", { minimumIntegerDigits: 2, useGrouping: false });
const ICONS: Record<LayerIcon, typeof Mic> = {
  mic: Mic, lock: Lock, list: ListChecks, book: BookOpen, headphones: Headphones,
  download: Download, sun: Sun, bookmark: BookMarked, circle: CircleDot,
};

const flat = chapters.flatMap((ch, c) => ch.steps.map((s, k) => ({ ...s, c, k, chapter: ch })));
const chapterOfStep = flat.map((s) => s.c);

function Copy({ s, index }: { s: (typeof flat)[number]; index?: number }) {
  const where = screen(s.screens[0]).where;
  return (
    <div className="copy" data-copy={index}>
      <span className="step-no">
        الفصل {ar(s.c + 1)} / {ar(chapters.length)} · {s.chapter.label}
      </span>
      <h3>{s.title}</h3>
      <p>{s.body}</p>
      <div className="chips">
        {s.chips.map((c) => (
          <span className="chip" key={c}>
            {c}
          </span>
        ))}
      </div>
      {where && (
        <span className="where">
          <Smartphone size={15} strokeWidth={1.6} aria-hidden="true" />
          {where}
        </span>
      )}
    </div>
  );
}

/** Content lives in content/journey.ts, numbers in animations/choreography.ts, the timeline in animations/journey.ts. */
export function JourneySection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isLite() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        buildJourney(root.current!, { chapterOfStep }, false);
      });
      mm.add(MQ.mobile, () => {
        buildJourney(root.current!, { chapterOfStep }, true);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const shots = flat.flatMap((s, i) => s.screens.map((id) => ({ ...screen(id), step: i })));

  return (
    <section ref={root} id="journey" className="journey" aria-label="جولة في تطبيق حِفظ" data-section="التسميع" data-chapters={JSON.stringify(chapters.map((c) => c.label))}>
      {/* anchors for the header links: where each chapter starts in the document */}
      {chapters.map((ch) => (
        <span key={ch.id} id={ch.id} className="chapter-anchor" data-anchor={ch.id} aria-hidden="true" />
      ))}

      <div className="journey-stage" data-stage="">
        <div className="copy-stack" aria-live="polite">
          {flat.map((s, i) => (
            <Copy s={s} index={i} key={s.id} />
          ))}
        </div>

        <div className="scene" data-scene="">
          <div className="scene-rings" aria-hidden="true" />
          {[0, 1, 2].map((k) => (
            <div className={`layer layer-${k}`} data-layer={k} key={k} aria-hidden="true">
              <div className="layer-drift">
                <div className="layer-card">
                  {chapters.map((ch, c) => {
                    const L = ch.layers[k];
                    const Icon = ICONS[L.icon];
                    return (
                      <div className="layer-variant" data-variant={c} key={ch.id}>
                        <Icon size={28} strokeWidth={1.5} />
                        <strong>{L.title}</strong>
                        <small>{L.sub}</small>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
          <CinematicPhone shots={shots} priority />
          {flat.flatMap((s, i) =>
            (s.cards ?? []).map((id) => {
              const c = crop(id);
              const round = STEPS[i]?.cards?.[id]?.d.round;
              return (
                <div className={`ui-card ${round ? "round" : ""}`} data-card={id} data-step={i} key={id} aria-hidden="true">
                  <img src={c.src} width={c.w} height={c.h} alt="" loading="lazy" decoding="async" />
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* static version: reduced motion / weak devices — same information, no pinning */}
      <div className="journey-lite">
        {flat.map((s) => (
          <article className="lite-step" key={s.id}>
            <Copy s={s} />
            <div className="lite-shots">
              {s.screens.map((id) => (
                <CinematicPhone key={id} shots={[screen(id)]} dataPhone={false} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

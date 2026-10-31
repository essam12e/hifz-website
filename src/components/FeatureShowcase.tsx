"use client";
import { useRef } from "react";
import { Smartphone } from "lucide-react";
import { gsap, useGSAP, isLite, MQ } from "@/lib/gsap";
import { buildShowcase } from "@/animations/showcase";
import type { SceneMotion } from "@/animations/choreography";
import type { Showcase } from "@/content/showcases";
import { crop, screen } from "@/content/screens";
import { CinematicPhone } from "./CinematicPhone";

const AR_DIGITS = (n: number) => n.toLocaleString("ar-EG");

/**
 * Generic pinned showcase: content comes from content/showcases.ts, motion from
 * animations/choreography.ts, the timeline from animations/showcase.ts.
 */
export function FeatureShowcase({
  data,
  motion,
  heading,
  tone = "light",
}: {
  data: Showcase;
  motion: SceneMotion;
  heading: string;
  tone?: "light" | "tint";
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isLite() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        buildShowcase(root.current!, motion, false);
      });
      mm.add(MQ.mobile, () => {
        buildShowcase(root.current!, motion, true);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const steps = data.steps;
  const shots = steps.flatMap((s, i) => s.screens.map((id) => ({ ...screen(id), step: i })));

  return (
    <section
      ref={root}
      id={data.id}
      className={`showcase ${tone === "tint" ? "showcase-tint" : ""}`}
      aria-label={heading}
      data-section={data.label}
    >
      <h2 className="sr-only">{heading}</h2>

      {/* cinematic version */}
      <div className="showcase-stage" data-stage="">
        <div className="copy-stack">
          {steps.map((s, i) => (
            <div className="copy" data-copy={i} key={s.id}>
              <span className="step-no">
                {data.label} · {AR_DIGITS(i + 1)} من {AR_DIGITS(steps.length)}
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
            </div>
          ))}
        </div>

        <div className="scene" data-scene="">
          {steps.map((s, i) => (
            <div className="float-chip where-chip" data-where={i} key={s.id} aria-hidden="true">
              <Smartphone size={18} strokeWidth={1.6} />
              <span>{screen(s.screens[s.screens.length - 1]).where}</span>
            </div>
          ))}
          <CinematicPhone shots={shots} />
          {steps.flatMap((s, i) =>
            (s.cards ?? []).map((id) => {
              const c = crop(id);
              const round = motion.steps[i]?.cards?.[id]?.d.round;
              return (
                <div className={`ui-card ${round ? "round" : ""}`} data-card={id} data-step={i} key={id} aria-hidden="true">
                  <img src={c.src} width={c.w} height={c.h} alt="" loading="lazy" decoding="async" />
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* static version: reduced motion / weak devices */}
      <div className="showcase-lite">
        {steps.map((s, i) => (
          <article className="lite-step" key={s.id}>
            <div className="copy">
              <span className="step-no">
                {data.label} · {AR_DIGITS(i + 1)} من {AR_DIGITS(steps.length)}
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
            </div>
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

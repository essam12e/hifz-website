import type { Img } from "@/content/screens";

type Shot = Img & { step?: number };

/** CSS 3D phone. Screens are stacked; GSAP decides which one is visible. */
export function CinematicPhone({
  shots,
  className = "",
  priority = false,
  dataPhone = true,
}: {
  shots: Shot[];
  className?: string;
  priority?: boolean;
  dataPhone?: boolean;
}) {
  return (
    <div className={`phone ${className}`} data-phone={dataPhone ? "" : undefined}>
      <div className="phone-screen">
        {shots.map((s, i) => (
          <img
            key={s.src + i}
            src={s.src}
            width={s.w}
            height={s.h}
            alt={s.alt}
            data-shot=""
            data-step={s.step}
            loading={priority && i === 0 ? "eager" : "lazy"}
            fetchPriority={priority && i === 0 ? "high" : undefined}
            decoding="async"
            draggable={false}
          />
        ))}
        <span className="phone-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

import { gsap } from "@/lib/gsap";
import type { Cam, CardPose, SceneMotion } from "./choreography";

/**
 * Pinned product showcase.
 * One scrubbed timeline per section: the stage is pinned, and scrolling moves
 * the phone camera, swaps the real screens, swaps the copy (whole blocks, never
 * single Arabic letters) and sends pieces of the screen out of the phone and
 * back in. Scrolling up plays exactly the same timeline backwards.
 *
 * DOM contract (see FeatureShowcase.tsx):
 *   [data-stage]  [data-scene]  [data-phone]
 *   [data-copy=i] [data-where=i]
 *   [data-shot][data-step=i]  (in order)
 *   [data-card=id][data-step=i]
 */
export function buildShowcase(root: HTMLElement, motion: SceneMotion, mobile: boolean) {
  const q = gsap.utils.selector(root);
  const stage = q("[data-stage]")[0] as HTMLElement;
  const scene = q("[data-scene]")[0] as HTMLElement;
  const phone = q("[data-phone]")[0] as HTMLElement;
  const copies = q("[data-copy]");
  const wheres = q("[data-where]");
  const shots = gsap.utils.toArray<HTMLElement>(phone.querySelectorAll("[data-shot]"));
  const W = () => scene.clientWidth;
  const H = () => scene.clientHeight;

  const cam = (c: Cam) => ({
    x: () => (c.x ?? 0) * W(),
    y: () => (c.y ?? 0) * H(),
    rotationY: c.ry ?? 0,
    rotationX: c.rx ?? 0,
    rotation: c.rz ?? 0,
    scale: c.s ?? 1,
  });
  const stepCam = (i: number) => {
    const s = motion.steps[i];
    return mobile ? { ...s.cam, ...(s.camMobile ?? {}) } : s.cam;
  };
  const shotsOf = (i: number) => shots.filter((el) => el.dataset.step === String(i));

  gsap.set([...copies, ...wheres], { autoAlpha: 0 });
  gsap.set([copies[0], wheres[0]].filter(Boolean), { autoAlpha: 1 });
  gsap.set(shots, { autoAlpha: 0 });
  gsap.set(shotsOf(0)[0], { autoAlpha: 1 });
  gsap.set(phone, { ...cam(mobile ? motion.entryMobile : motion.entry), transformOrigin: "50% 50%" });

  // card geometry depends on the viewport: computed lazily, refreshed on resize
  const cardEls = q("[data-card]");
  const pose = (el: HTMLElement): CardPose => {
    const step = motion.steps[Number(el.dataset.step)];
    const p = step.cards?.[el.dataset.card ?? ""];
    return (mobile ? p?.m : p?.d) ?? { x: 0, y: 0, w: 300 };
  };
  const cardWidth = (el: HTMLElement) => {
    const p = pose(el);
    return mobile ? Math.round(p.w * W()) : Math.min(p.w, W() * 0.92);
  };
  gsap.set(cardEls, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    z: 0,
    scale: 0.35,
    autoAlpha: 0,
    width: (_: number, el: HTMLElement) => cardWidth(el),
  });

  const weights = motion.steps.map((s) => s.weight ?? 1);
  const total = weights.reduce((a, b) => a + b, 0);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * (total * (mobile ? 0.85 : 0.95) + 0.5)),
      pin: stage,
      scrub: mobile ? 0.6 : 0.9,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: () => gsap.set(cardEls, { width: (_: number, el: HTMLElement) => cardWidth(el) }),
    },
  });

  // entry: the phone settles into its first pose as the pin starts
  tl.to(phone, { ...cam(stepCam(0)), duration: 0.5, ease: "power2.out" }, 0);

  let t = 0.5;
  motion.steps.forEach((step, i) => {
    const start = i === 0 ? 0.5 : t;
    if (i > 0) {
      const prev = i - 1;
      tl.to([copies[prev], wheres[prev]].filter(Boolean), { autoAlpha: 0, y: -22, duration: 0.2, ease: "power1.in" }, start);
      tl.fromTo(
        [copies[i], wheres[i]].filter(Boolean),
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out", immediateRender: false },
        start + 0.18,
      );
      tl.to(phone, { ...cam(stepCam(i)), duration: 0.45, ease: "power2.inOut" }, start);
      tl.to(shotsOf(prev), { autoAlpha: 0, duration: 0.22 }, start + 0.12);
      tl.fromTo(
        shotsOf(i)[0],
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 0.26, ease: "power2.out", immediateRender: false },
        start + 0.12,
      );
    }
    const len = weights[i] - (i === 0 ? 0.5 : 0);
    const own = shotsOf(i);
    if (own[1]) {
      tl.fromTo(
        own[1],
        { autoAlpha: 0, xPercent: -8 },
        { autoAlpha: 1, xPercent: 0, duration: 0.25, ease: "power2.out", immediateRender: false },
        start + len * 0.55,
      );
    }
    const cards = cardEls.filter((el) => el.dataset.step === String(i));
    if (cards.length) {
      const out = start + Math.max(0.3, len * 0.22);
      tl.to(
        cards,
        {
          x: (_: number, el: HTMLElement) => pose(el).x * W(),
          y: (_: number, el: HTMLElement) => pose(el).y * H(),
          z: 90,
          rotation: (_: number, el: HTMLElement) => pose(el).r ?? 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.32,
          ease: "power3.out",
          stagger: 0.06,
        },
        out,
      );
      if (wheres[i]) tl.to(wheres[i], { autoAlpha: 0, duration: 0.15 }, out);
      if (wheres[i]) tl.to(wheres[i], { autoAlpha: 1, duration: 0.15 }, start + len * 0.9);
      // reassemble: the pieces go back into the screen they came from
      tl.to(
        cards,
        { x: 0, y: 0, z: 0, rotation: 0, scale: 0.35, autoAlpha: 0, duration: 0.24, ease: "power2.in", stagger: 0.04 },
        start + len * 0.82,
      );
    }
    t = (i === 0 ? 0 : t) + weights[i];
  });
  tl.to({}, { duration: 0.4 });
  return tl;
}

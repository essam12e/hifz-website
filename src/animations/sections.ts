import { gsap } from "@/lib/gsap";

/** Text blocks rise into place, tied to scroll (reverses on the way up). */
export function revealBlocks(root: HTMLElement, selector = "[data-reveal]") {
  const els = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(selector));
  return gsap.fromTo(
    els,
    { autoAlpha: 0, y: 40 },
    {
      autoAlpha: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: { trigger: root, start: "top 80%", end: "top 35%", scrub: 0.6 },
    },
  );
}

/** Dark interlude: watermark logo turns slowly, the ayah block settles, layers at different speeds. */
export function interlude(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
  });
  tl.fromTo(q("[data-watermark]"), { yPercent: 18, scale: 0.9 }, { yPercent: -18, scale: 1.08 }, 0)
    .fromTo(q("[data-layer='back']"), { yPercent: 30 }, { yPercent: -30 }, 0)
    .fromTo(q("[data-layer='front']"), { y: 80 }, { y: -40 }, 0);
  return tl;
}

/** Continuity: three real screens arrive scattered in depth and settle into a deck (scrubbed). */
export function continuity(root: HTMLElement, mobile: boolean) {
  const q = gsap.utils.selector(root);
  const cards = q("[data-fan]");
  if (mobile) {
    cards.forEach((el) =>
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 70, rotationX: 14 },
        { autoAlpha: 1, y: 0, rotationX: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: 0.6 } },
      ),
    );
    return;
  }
  // RTL: the first card sits on the right
  gsap.fromTo(
    cards,
    {
      x: (i: number) => [280, 0, -280][i] ?? 0,
      z: (i: number) => [-340, 140, -340][i] ?? 0,
      rotationY: (i: number) => [-42, 0, 42][i] ?? 0,
      rotation: (i: number) => [8, 0, -8][i] ?? 0,
      y: (i: number) => [160, 80, 160][i] ?? 0,
      autoAlpha: 0.15,
    },
    {
      x: 0,
      z: (i: number) => [-70, 0, -70][i] ?? 0,
      rotationY: (i: number) => [-16, 0, 16][i] ?? 0,
      rotation: (i: number) => [3, 0, -3][i] ?? 0,
      y: (i: number) => [26, 0, 26][i] ?? 0,
      autoAlpha: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: q("[data-fan-row]")[0], start: "top 95%", end: "center 55%", scrub: 0.8 },
    },
  );
  // parallax: the side screens drift slower than the middle one
  gsap.to(cards, {
    yPercent: (i: number) => [-5, -12, -5][i] ?? 0,
    ease: "none",
    scrollTrigger: { trigger: root, start: "center center", end: "bottom top", scrub: 1 },
  });
}

export function downloadScene(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: { trigger: root, start: "top 75%", end: "top 20%", scrub: 0.6 },
  });
  tl.fromTo(q("[data-dl-logo]"), { autoAlpha: 0, scale: 0.86, y: 30 }, { autoAlpha: 1, scale: 1, y: 0 }, 0)
    .fromTo(q("[data-dl-block]"), { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.15)
    .fromTo(q("[data-dl-ring]"), { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1 }, 0);
  return tl;
}

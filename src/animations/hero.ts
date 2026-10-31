import { gsap } from "@/lib/gsap";

/** Load-in: logo, then the copy as whole blocks, then the phone and its two cards. */
export function heroIntro(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.fromTo(q("[data-intro]"), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, 0.1)
    .fromTo(
      q("[data-hero-phone]"),
      { autoAlpha: 0, y: 120, rotationY: -40, rotation: -16 },
      { autoAlpha: 1, y: 0, rotationY: -18, rotation: -7, duration: 1.6 },
      0.25,
    )
    // the two cards come out of the phone's screen
    .fromTo(
      q("[data-hero-card]"),
      { autoAlpha: 0, x: (i: number) => (i ? 90 : -90), y: (i: number) => (i ? -60 : 80), scale: 0.5 },
      { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 1.2, stagger: 0.15 },
      0.95,
    )
    .fromTo(q("[data-rings]"), { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 2 }, 0);
  // the halo breathes and turns, as in V3
  gsap.to(q(".hero-halo"), { scale: 1.18, rotation: 90, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
  // slow idle drift of the cards (transform only)
  q("[data-hero-card]").forEach((el, i) => {
    gsap.to(el, { yPercent: i ? 9 : -9, rotation: i ? -2 : 2, duration: 3.4 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 });
  });
  return tl;
}

/** Leaving the hero: the phone turns and sinks, the copy lifts away (scrubbed). */
export function heroScroll(root: HTMLElement, mobile: boolean) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
  });
  tl.to(q(".hero-copy"), { yPercent: mobile ? -10 : -18, autoAlpha: 0.2 }, 0)
    .to(q("[data-art]"), { y: mobile ? 60 : 140, rotationY: mobile ? 8 : 18, rotationX: 8, scale: 0.9 }, 0)
    .to(q("[data-rings]"), { scale: 1.25, rotation: 25 }, 0);
  return tl;
}

import { gsap } from "@/lib/gsap";
import { ENTRY, MOBILE_ROT, MOBILE_X, STEPS, SWING, type Cam, type CardPose } from "./choreography";

/**
 * The journey: one pinned stage, one phone, three chapters (as in Cinematic V3).
 * A single scrubbed timeline drives everything, so scrolling up replays the
 * exact same frames backwards:
 *   - phone camera: x / y / z depth, rotation around X, Y and Z, scale
 *   - the real screens inside the phone
 *   - the copy (whole blocks, never single Arabic letters)
 *   - three floating tiles that drift for the whole journey and flip to new
 *     content at each chapter
 *   - exploded UI: the phone steps back, pieces of its real screen come out,
 *     spread around it at different depths and speeds, then go back in.
 *
 * DOM contract (JourneySection.tsx): [data-stage] [data-scene] [data-phone]
 * [data-copy=i] [data-shot][data-step=i] [data-card][data-step=i]
 * [data-layer=k] > .layer-drift > .layer-card > [data-variant=c]
 */
export type JourneyMap = { chapterOfStep: number[] };

export function buildJourney(root: HTMLElement, map: JourneyMap, mobile: boolean) {
  const q = gsap.utils.selector(root);
  const stage = q("[data-stage]")[0] as HTMLElement;
  const scene = q("[data-scene]")[0] as HTMLElement;
  const phone = q("[data-phone]")[0] as HTMLElement;
  const copies = q("[data-copy]") as HTMLElement[];
  const shots = gsap.utils.toArray<HTMLElement>(phone.querySelectorAll("[data-shot]"));
  const cardEls = q("[data-card]") as HTMLElement[];
  const layers = q("[data-layer]") as HTMLElement[];
  const drifts = layers.map((l) => l.querySelector(".layer-drift") as HTMLElement);
  const tiles = layers.map((l) => l.querySelector(".layer-card") as HTMLElement);
  const variants = (c: number) => tiles.map((t) => t.querySelector(`[data-variant="${c}"]`) as HTMLElement);
  const W = () => scene.clientWidth;
  const H = () => scene.clientHeight;
  const rot = mobile ? MOBILE_ROT : 1;

  const cam = (c: Cam) => ({
    x: () => (c.x ?? 0) * (mobile ? MOBILE_X : 1) * W(),
    y: () => (c.y ?? 0) * H(),
    z: (c.z ?? 0) * (mobile ? 0.6 : 1),
    rotationY: (c.ry ?? 0) * rot,
    rotationX: (c.rx ?? 0) * rot,
    rotation: (c.rz ?? 0) * rot,
    scale: c.s ?? 1,
  });
  const shotsOf = (i: number) => shots.filter((el) => el.dataset.step === String(i));
  const pose = (el: HTMLElement): CardPose => {
    const p = STEPS[Number(el.dataset.step)]?.cards?.[el.dataset.card ?? ""];
    return (mobile ? p?.m : p?.d) ?? { x: 0, y: 0, z: 0, w: 300 };
  };
  const cardWidth = (el: HTMLElement) => (mobile ? Math.round(pose(el).w * W()) : Math.min(pose(el).w, W() * 0.9));

  // ---- initial state (also what a refresh in the middle of the page rebuilds from)
  gsap.set(copies, { autoAlpha: 0 });
  gsap.set(copies[0], { autoAlpha: 1 });
  gsap.set(shots, { autoAlpha: 0 });
  gsap.set(shotsOf(0)[0], { autoAlpha: 1 });
  gsap.set(phone, { ...cam(ENTRY), transformOrigin: "50% 50%", force3D: true });
  gsap.set(cardEls, {
    xPercent: -50, yPercent: -50, x: 0, y: 0, z: 0, scale: 0.3, autoAlpha: 0,
    width: (_: number, el: HTMLElement) => cardWidth(el),
  });
  for (let c = 1; c < 3; c++) gsap.set(variants(c), { autoAlpha: 0 });
  gsap.set(variants(0), { autoAlpha: 1 });

  // ---- the three tiles fly in while the journey scrolls into view (V3 entry)
  const tileFrom = [
    { x: -210, y: -100, rotation: -26 },
    { x: 220, y: 160, rotation: 28 },
    { x: 0, y: 180, rotation: 0 },
  ];
  const tileRest = [-8, 9, -3];
  layers.forEach((el, k) => {
    gsap.fromTo(
      el,
      { ...tileFrom[k], autoAlpha: 0 },
      {
        x: 0, y: 0, rotation: tileRest[k], autoAlpha: 1, ease: "power2.out",
        scrollTrigger: { trigger: root, start: k === 2 ? "top 60%" : "top 85%", end: "top top", scrub: 1 },
      },
    );
  });

  // ---- the pinned journey
  const weights = STEPS.map((s) => s.weight ?? 1);
  const chapterGap = 0.8; // extra scroll for each chapter change
  const chapterChanges = map.chapterOfStep.filter((c, i) => i > 0 && c !== map.chapterOfStep[i - 1]).length;
  const total = 0.5 + weights.reduce((a, b) => a + b, 0) + chapterChanges * chapterGap + 0.4;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      id: "journey",
      trigger: root,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * total * (mobile ? 0.8 : 0.9)),
      pin: stage,
      scrub: mobile ? 0.8 : 1.1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: () => gsap.set(cardEls, { width: (_: number, el: HTMLElement) => cardWidth(el) }),
      onRefresh: (self) => placeAnchors(self.end - self.start),
    },
  });
  // header links (#recitation, #quran, #adhkar) land where each chapter starts
  function placeAnchors(distance: number) {
    const m: { f: number; c: number; a: number }[] = JSON.parse(root.dataset.marks ?? "[]");
    q("[data-anchor]").forEach((a, c) => {
      const f = m.find((x) => x.c === c)?.a ?? 0;
      (a as HTMLElement).style.top = `${Math.round(f * distance)}px`;
    });
  }

  // tiles drift slowly for the whole journey (different directions = depth)
  const driftTo = [
    { x: -35, y: -45, rotation: -5 },
    { x: 35, y: 50, rotation: 6 },
    { x: -20, y: 22, rotation: 3 },
  ];
  drifts.forEach((d, k) => tl.to(d, { ...driftTo[k], duration: total, ease: "none" }, 0));

  tl.to(phone, { ...cam(STEPS[0].cam), duration: 0.5, ease: "power2.out" }, 0);

  const marks: { f: number; c: number; a?: number }[] = [{ f: 0, c: 0 }];
  let t = 0.5;
  STEPS.forEach((step, i) => {
    const prev = i - 1;
    const newChapter = i > 0 && map.chapterOfStep[i] !== map.chapterOfStep[prev];
    if (i > 0) {
      let start = t;
      if (newChapter) {
        const c = map.chapterOfStep[i];
        marks.push({ f: t, c, a: t + chapterGap + 0.45 }); // a = where the new chapter's copy is fully in
        // the camera swings away, the tiles flip to the new chapter, the camera comes back
        tl.to(phone, { ...cam(SWING[c - 1]), duration: chapterGap * 0.5, ease: "power2.inOut" }, t);
        tl.to(tiles, { rotationY: 90, duration: chapterGap * 0.3, ease: "power1.in", stagger: 0.05 }, t + 0.05);
        tl.to(variants(c - 1), { autoAlpha: 0, duration: 0.01 }, t + chapterGap * 0.36);
        tl.to(variants(c), { autoAlpha: 1, duration: 0.01 }, t + chapterGap * 0.36);
        tl.fromTo(
          tiles,
          { rotationY: -90 },
          { rotationY: 0, duration: chapterGap * 0.35, ease: "power2.out", stagger: 0.05, immediateRender: false },
          t + chapterGap * 0.38,
        );
        start = t + chapterGap * 0.45;
        t += chapterGap;
      }
      tl.to(copies[prev], { autoAlpha: 0, y: -24, duration: 0.2, ease: "power1.in" }, start);
      tl.fromTo(copies[i], { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: "power2.out", immediateRender: false }, start + 0.18);
      tl.to(phone, { ...cam(step.cam), duration: 0.5, ease: "power2.inOut" }, newChapter ? t - chapterGap * 0.5 + 0.1 : start);
      // the new screen settles on top of the old one, then the old one is released (no muddy double image)
      tl.fromTo(shotsOf(i)[0], { autoAlpha: 0, scale: 1.06, yPercent: 2 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.24, ease: "power2.out", immediateRender: false }, start + 0.12);
      tl.to(shotsOf(prev), { autoAlpha: 0, duration: 0.02 }, start + 0.37);
    }
    const s0 = i === 0 ? 0.5 : t;
    const len = weights[i];
    const own = shotsOf(i);
    const cards = cardEls.filter((el) => el.dataset.step === String(i));

    if (cards.length) {
      const out = s0 + 0.25;
      const back = s0 + len * 0.74;
      // the tiles step aside so the pieces have room
      tl.to(tiles, { scale: 0.82, autoAlpha: 0.25, duration: 0.25 }, s0 + 0.1);
      tl.to(cards, {
        x: (_: number, el: HTMLElement) => pose(el).x * W(),
        y: (_: number, el: HTMLElement) => pose(el).y * H(),
        z: (_: number, el: HTMLElement) => pose(el).z,
        rotation: (_: number, el: HTMLElement) => pose(el).r ?? 0,
        scale: 1, autoAlpha: 1, duration: 0.34, ease: "power3.out", stagger: 0.07,
      }, out);
      // hold: each piece drifts by its own amount (parallax) while the camera turns gently
      const hold = back - (out + 0.34 + 0.07 * cards.length);
      if (hold > 0.05) {
        tl.to(cards, { y: (_: number, el: HTMLElement) => pose(el).y * H() + (pose(el).drift ?? 0), duration: hold }, out + 0.34 + 0.07 * cards.length);
        tl.fromTo(phone, { rotationY: ((step.cam.ry ?? 0) - 5) * rot }, { rotationY: ((step.cam.ry ?? 0) + 5) * rot, duration: hold, immediateRender: false }, out + 0.34);
      }
      // regroup: the pieces go back into the screen they came from
      tl.to(cards, { x: 0, y: 0, z: 0, rotation: 0, scale: 0.3, autoAlpha: 0, duration: 0.26, ease: "power2.in", stagger: { each: 0.04, from: "end" } }, back);
      tl.to(tiles, { scale: 1, autoAlpha: 1, duration: 0.25 }, back + 0.2);
      if (own[1]) tl.fromTo(own[1], { autoAlpha: 0, xPercent: -8 }, { autoAlpha: 1, xPercent: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, back + 0.24);
    } else if (own[1]) {
      tl.fromTo(own[1], { autoAlpha: 0, xPercent: -8 }, { autoAlpha: 1, xPercent: 0, duration: 0.25, ease: "power2.out", immediateRender: false }, s0 + len * 0.5);
    }
    t = (i === 0 ? 0.5 : t) + len;
  });
  tl.to({}, { duration: 0.4 });

  // chapter starts as fractions of the pin, read by the journey line
  const d = tl.duration();
  root.dataset.marks = JSON.stringify(marks.map((m) => ({ f: m.f / d, c: m.c, a: (m.a ?? m.f) / d })));
  return tl;
}

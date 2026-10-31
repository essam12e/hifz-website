import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * The journey line. Its shape is rebuilt from the real position of every
 * [data-section]: each section gets its own stretch of the line (straight for
 * calm sections, waves for the pinned scenes), and a diamond — the logo's dot —
 * marks where a section begins. The drawn part and the glowing dot follow the
 * real scroll progress, smoothed, and run backwards when scrolling up.
 */
const VB_H = 1000;
const CX = 30;
const SHAPES: Record<string, { amp: number; waves: number }> = {
  البداية: { amp: 0, waves: 0 },
  الرحلة: { amp: 6, waves: 1 },
  التسميع: { amp: 16, waves: 3 },
  "المصحف والتلاوة": { amp: 12, waves: 2 },
  آية: { amp: 0, waves: 0 },
  الأذكار: { amp: 14, waves: 3 },
  الاستمرارية: { amp: 8, waves: 1 },
  التحميل: { amp: 0, waves: 0 },
};

export function progressPath(svg: SVGSVGElement, label: HTMLElement | null) {
  const track = svg.querySelector<SVGPathElement>("[data-track]")!;
  const line = svg.querySelector<SVGPathElement>("[data-line]")!;
  const dot = svg.querySelector<SVGGElement>("[data-dot]")!;
  const marks = svg.querySelector<SVGGElement>("[data-marks]")!;
  let lut: number[] = []; // y (0..VB_H, step 2) -> length along path
  let total = 1;
  let names: { f: number; name: string }[] = [];

  function rebuild() {
    const max = Math.max(1, ScrollTrigger.maxScroll(window));
    const secs = gsap.utils.toArray<HTMLElement>("[data-section]");
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const starts: { f: number; name: string }[] = [];
    secs.forEach((s) => {
      const top = s.getBoundingClientRect().top + window.scrollY;
      const pin = s.dataset.marks ? ScrollTrigger.getById("journey") : null;
      if (pin && s.dataset.chapters) {
        // inside the pinned journey, each chapter gets its own stretch of line
        const names: string[] = JSON.parse(s.dataset.chapters);
        const marks: { f: number; c: number }[] = JSON.parse(s.dataset.marks ?? "[]");
        marks.forEach((m) => starts.push({ f: clamp((pin.start + m.f * (pin.end - pin.start)) / max), name: names[m.c] ?? "" }));
        return;
      }
      starts.push({ f: clamp(top / max), name: s.dataset.section ?? "" });
    });
    starts.sort((a, b) => a.f - b.f);
    names = starts;
    const pts: string[] = [`M${CX} 0`];
    starts.forEach((s, i) => {
      const y0 = s.f * VB_H;
      const y1 = (starts[i + 1]?.f ?? 1) * VB_H;
      const base = SHAPES[s.name] ?? { amp: 6, waves: 1 };
      // phones: a simpler, straight line at the screen edge
      const shape = window.innerWidth < 900 ? { amp: 0, waves: 0 } : base;
      const n = Math.max(2, Math.round((y1 - y0) / 4));
      for (let k = 1; k <= n; k++) {
        const t = k / n;
        const x = CX + shape.amp * Math.sin(t * Math.PI * shape.waves);
        pts.push(`L${x.toFixed(2)} ${(y0 + (y1 - y0) * t).toFixed(2)}`);
      }
    });
    const d = pts.join(" ");
    track.setAttribute("d", d);
    line.setAttribute("d", d);
    total = line.getTotalLength();
    line.style.strokeDasharray = `${total}`;
    // y -> length lookup (y is monotone along the path)
    lut = [];
    let len = 0;
    for (let y = 0; y <= VB_H; y += 2) {
      while (len < total && line.getPointAtLength(len).y < y) len += 1.5;
      lut.push(Math.min(len, total));
    }
    marks.innerHTML = starts
      .slice(1)
      .map((s) => `<rect x="${CX - 4}" y="${s.f * VB_H - 4}" width="8" height="8" rx="1.2" transform="rotate(45 ${CX} ${s.f * VB_H})"/>`)
      .join("");
    render(state.p);
  }

  const state = { p: 0 };
  function render(p: number) {
    const i = Math.min(lut.length - 1, Math.max(0, Math.round((p * VB_H) / 2)));
    const len = lut[i] ?? 0;
    line.style.strokeDashoffset = `${total - len}`;
    const pt = line.getPointAtLength(len);
    dot.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
    if (label) {
      let cur = names[0]?.name ?? "";
      for (const n of names) if (p + 0.002 >= n.f) cur = n.name;
      if (label.textContent !== cur) label.textContent = cur;
      label.style.transform = `translateY(${(pt.y / VB_H) * svg.clientHeight}px)`;
    }
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const to = gsap.quickTo(state, "p", { duration: reduce ? 0 : 0.7, ease: "power3.out", onUpdate: () => render(state.p) });

  const st = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => to(self.progress),
  });
  // after every refresh (pins measured, resize, fonts loaded) re-shape the line
  const onRefresh = () => {
    rebuild();
    state.p = st.progress;
    render(state.p);
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  // light / dark ink depending on the section under the line
  const tones = gsap.utils.toArray<HTMLElement>("[data-tone='dark']").map((el) =>
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 45%",
      toggleClass: { targets: svg.parentElement!, className: "on-dark-path" },
    }),
  );

  rebuild();
  return () => {
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    st.kill();
    tones.forEach((t) => t.kill());
  };
}

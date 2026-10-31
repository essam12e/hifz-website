/**
 * Camera and layout numbers for the pinned scenes — kept apart from the copy.
 * x / y are fractions of the scene box measured from its centre (so they scale
 * with the viewport); rotations in degrees; w = card width in px (desktop) or
 * as a fraction of the scene width (mobile).
 */
export type Cam = { x?: number; y?: number; ry?: number; rx?: number; rz?: number; s?: number };
export type CardPose = { x: number; y: number; w: number; r?: number; round?: boolean };
export type StepMotion = { cam: Cam; camMobile?: Cam; weight?: number; cards?: Record<string, { d: CardPose; m: CardPose }> };
export type SceneMotion = { entry: Cam; entryMobile: Cam; steps: StepMotion[] };

export const recitationMotion: SceneMotion = {
  entry: { x: 0.28, y: 0.06, ry: -38, rz: 11, s: 0.76 },
  entryMobile: { x: 0.3, y: 0.08, ry: -30, rz: 9, s: 0.8 },
  steps: [
    { cam: { ry: -16, rx: 6 }, camMobile: { ry: -10, rx: 4 } },
    { cam: { x: 0.04, y: -0.01, ry: 15, rx: 4, rz: -3 }, camMobile: { ry: 10, rx: 3, rz: -2 } },
    {
      // the "exploded" step: the phone steps back, its parts come forward
      cam: { ry: 0, rx: 0, s: 0.84 },
      camMobile: { s: 0.86 },
      weight: 1.9,
      cards: {
        "recite-revealed": { d: { x: -0.16, y: -0.34, w: 430, r: -2 }, m: { x: 0, y: -0.37, w: 0.88 } },
        "recite-hidden-row": { d: { x: 0.2, y: -0.12, w: 420, r: 2 }, m: { x: 0, y: -0.16, w: 0.9 } },
        "recite-feedback": { d: { x: -0.15, y: 0.18, w: 430, r: -1 }, m: { x: 0, y: 0.17, w: 0.88 } },
        "recite-mic": { d: { x: 0.27, y: 0.34, w: 112, round: true }, m: { x: 0, y: 0.38, w: 0.22, round: true } },
      },
    },
    { cam: { x: -0.03, ry: -12, rx: 5, rz: 3 }, camMobile: { ry: -8, rx: 3, rz: 2 } },
  ],
};

export const quranMotion: SceneMotion = {
  entry: { x: -0.24, y: 0.05, ry: 34, rz: -9, s: 0.78 },
  entryMobile: { x: -0.3, y: 0.08, ry: 28, rz: -8, s: 0.8 },
  steps: [
    { cam: { ry: 12, rx: 4 }, camMobile: { ry: 8, rx: 3 } },
    { cam: { x: 0.05, ry: -18, rx: 6, rz: 2, s: 0.97 }, camMobile: { ry: -10, rx: 3, rz: 1 } },
    {
      cam: { x: -0.02, ry: 6, rx: 2, rz: -2, s: 0.88 },
      camMobile: { s: 0.9 },
      weight: 1.8,
      cards: {
        "listen-ayah": { d: { x: -0.1, y: -0.3, w: 470, r: -2 }, m: { x: 0, y: -0.3, w: 0.88 } },
        "listen-player": { d: { x: 0.12, y: 0.33, w: 430, r: 2 }, m: { x: 0, y: 0.33, w: 0.88 } },
      },
    },
    { cam: { ry: -10, rx: 4 }, camMobile: { ry: -7, rx: 3 } },
  ],
};

export const adhkarMotion: SceneMotion = {
  entry: { x: 0.22, y: 0.1, ry: -32, rz: 7, s: 0.78 },
  entryMobile: { x: 0.26, y: 0.1, ry: -26, rz: 6, s: 0.8 },
  steps: [
    { cam: { ry: -11, rx: 5 }, camMobile: { ry: -8, rx: 3 }, weight: 1.3 },
    {
      cam: { x: 0.03, ry: 13, rx: 3, rz: -2, s: 0.94 },
      camMobile: { ry: 8, s: 0.94 },
      weight: 1.6,
      cards: {
        "adhkar-complete": { d: { x: -0.14, y: 0.3, w: 430, r: -2 }, m: { x: 0, y: 0.33, w: 0.88 } },
      },
    },
    { cam: { x: -0.03, ry: -15, rx: 5, rz: 2 }, camMobile: { ry: -9, rx: 3, rz: 1 }, weight: 1.3 },
    // closing shot of the scene: the camera pushes in on the tasbih screen
    { cam: { x: 0, y: 0.02, ry: 0, rx: 0, rz: 0, s: 1.06 }, camMobile: { s: 1.04 }, weight: 1.4 },
  ],
};

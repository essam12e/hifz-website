/**
 * Camera and layout numbers for the journey — kept apart from the copy.
 * x / y: fractions of the scene box from its centre; z: px of depth (negative
 * = further away); rotations in degrees. Card w: px on desktop, fraction of
 * the scene width on mobile. On phones the rotations are softened by
 * MOBILE_ROT and the sideways moves by MOBILE_X.
 */
export type Cam = { x?: number; y?: number; z?: number; ry?: number; rx?: number; rz?: number; s?: number };
export type CardPose = { x: number; y: number; z: number; w: number; r?: number; drift?: number; round?: boolean };
export type StepMotion = { cam: Cam; weight?: number; cards?: Record<string, { d: CardPose; m: CardPose }> };

export const MOBILE_ROT = 0.5;
export const MOBILE_X = 0.35;

/** The phone before the journey is pinned: far, turned, off to the side (V3 entry). */
export const ENTRY: Cam = { x: 0.3, y: 0.04, z: -260, ry: -38, rx: 4, rz: 13, s: 0.82 };

/** The pose the phone swings through between two chapters. */
export const SWING: Cam[] = [
  { x: -0.06, y: -0.04, z: -320, ry: 34, rx: 8, rz: -6, s: 0.9 }, // recitation -> quran
  { x: 0.06, y: 0.05, z: -320, ry: -36, rx: 6, rz: 6, s: 0.9 }, // quran -> adhkar
];

/** Steps in journey order (3 + 3 + 4). */
export const STEPS: StepMotion[] = [
  // التسميع
  { cam: { ry: -15, rx: 6 } },
  { cam: { x: 0.03, y: -0.03, ry: 18, rx: 4, rz: -6 } },
  {
    cam: { z: -170, ry: -4, rx: 2, s: 0.94 },
    weight: 2.1,
    cards: {
      "recite-revealed": { d: { x: -0.17, y: -0.34, z: 90, w: 430, r: -2, drift: -26 }, m: { x: 0, y: -0.36, z: 60, w: 0.9, drift: -10 } },
      "recite-hidden-row": { d: { x: 0.21, y: -0.12, z: 170, w: 400, r: 2, drift: 34 }, m: { x: 0, y: -0.15, z: 90, w: 0.86, drift: 8 } },
      "recite-feedback": { d: { x: -0.16, y: 0.19, z: 130, w: 430, r: -1, drift: -14 }, m: { x: 0, y: 0.17, z: 70, w: 0.9, drift: -8 } },
      "recite-mic": { d: { x: 0.25, y: 0.34, z: 210, w: 112, drift: 40, round: true }, m: { x: 0.28, y: 0.36, z: 110, w: 0.2, drift: 10, round: true } },
    },
  },
  // المصحف والتلاوة
  { cam: { ry: 14, rx: 5, rz: -2 } },
  { cam: { x: 0.04, y: -0.02, ry: -20, rx: 6, rz: 5 } },
  {
    cam: { z: -150, ry: 6, rx: 2, s: 0.94 },
    weight: 1.9,
    cards: {
      "listen-ayah": { d: { x: -0.12, y: -0.31, z: 120, w: 470, r: -2, drift: -30 }, m: { x: 0, y: -0.31, z: 70, w: 0.92, drift: -10 } },
      "listen-player": { d: { x: 0.14, y: 0.34, z: 170, w: 420, r: 2, drift: 30 }, m: { x: 0, y: 0.34, z: 90, w: 0.9, drift: 10 } },
    },
  },
  // الأذكار
  { cam: { ry: -16, rx: 6, rz: 3 }, weight: 1.2 },
  {
    cam: { z: -120, ry: 10, rx: 3, rz: -2, s: 0.96 },
    weight: 1.6,
    cards: {
      "adhkar-complete": { d: { x: -0.15, y: 0.3, z: 160, w: 420, r: -2, drift: -24 }, m: { x: 0, y: 0.33, z: 90, w: 0.9, drift: -8 } },
    },
  },
  { cam: { x: -0.03, ry: -18, rx: 5, rz: 4 } },
  // closing shot: the camera pushes in on the tasbih screen
  { cam: { y: 0.02, z: 90, ry: 0, rx: 0, rz: 0, s: 1 }, weight: 1.3 },
];

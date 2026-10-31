/**
 * Camera numbers for the journey, taken from Cinematic V3's phone timeline:
 *   from {x:180, rotateY:-35, rotateZ:13, scale:.75}
 *   →    {x:0,   rotateY:-15, rotateZ:0,  scale:1}      (state 1)
 *   →    {rotateY:18,  rotateZ:-6, y:-30}               (state 2)
 *   →    {rotateY:-20, rotateZ:5,  y:25}                (state 3)
 *   →    {rotateY:0,   rotateZ:0,  y:0}                 (state 4, centred)
 * with the phone's resting rotateX(6deg) from V3's CSS.
 * x / y: fractions of the scene box from its centre (V3's 180px / 30px at a
 * 600px scene); z: px of depth; rotations in degrees. Card w: px on desktop,
 * fraction of the scene width on mobile. On phones the rotations are softened
 * by MOBILE_ROT and the sideways moves by MOBILE_X.
 */
export type Cam = { x?: number; y?: number; z?: number; ry?: number; rx?: number; rz?: number; s?: number };
export type CardPose = { x: number; y: number; z: number; w: number; r?: number; drift?: number; round?: boolean };
export type StepMotion = { cam: Cam; weight?: number; cards?: Record<string, { d: CardPose; m: CardPose }> };

export const MOBILE_ROT = 0.7;
export const MOBILE_X = 0.45;

/** V3 entry pose. */
export const ENTRY: Cam = { x: 0.3, ry: -35, rx: 6, rz: 13, s: 0.75 };

/** One state per chapter (V3 keyframes). */
export const STEPS: StepMotion[] = [
  // 01 التسميع — V3 state 1, then the phone steps back and three real pieces come out
  {
    cam: { ry: -15, rx: 6 },
    weight: 1.5,
    cards: {
      "recite-revealed": { d: { x: -0.2, y: -0.3, z: 120, w: 420, r: -3, drift: -28 }, m: { x: 0, y: -0.36, z: 60, w: 0.88, drift: -10 } },
      "recite-feedback": { d: { x: 0.2, y: 0.22, z: 170, w: 400, r: 2, drift: 30 }, m: { x: 0, y: 0.2, z: 90, w: 0.88, drift: 10 } },
      "recite-mic": { d: { x: -0.27, y: 0.3, z: 230, w: 104, drift: -40, round: true }, m: { x: -0.3, y: 0.38, z: 110, w: 0.2, drift: -12, round: true } },
    },
  },
  // 02 المصحف والاستماع — V3 state 2
  {
    cam: { y: -0.05, ry: 18, rx: 6, rz: -6 },
    weight: 1.3,
    cards: {
      "listen-ayah": { d: { x: 0.18, y: -0.3, z: 140, w: 440, r: 2, drift: -26 }, m: { x: 0, y: -0.33, z: 70, w: 0.9, drift: -10 } },
      "listen-player": { d: { x: -0.17, y: 0.32, z: 190, w: 400, r: -2, drift: 28 }, m: { x: 0, y: 0.35, z: 90, w: 0.9, drift: 10 } },
    },
  },
  // 03 الأذكار — V3 state 3
  {
    cam: { y: 0.04, ry: -20, rx: 6, rz: 5 },
    weight: 1.1,
    cards: {
      "adhkar-complete": { d: { x: 0.19, y: 0.28, z: 170, w: 400, r: 2, drift: -24 }, m: { x: 0, y: 0.33, z: 90, w: 0.9, drift: -8 } },
    },
  },
  // 04 المراجعة اليومية — V3 final: the phone comes back to the centre
  { cam: { ry: 0, rx: 0, rz: 0, s: 1 }, weight: 0.9 },
];

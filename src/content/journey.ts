import type { CropId, ScreenId } from "./screens";

/**
 * Cinematic V4: one pinned journey with four states, exactly like V3's
 * «الفصل ٠١ / ٠٤». One feature per state: a 2–4 word title, one short line,
 * one real screen. Every sentence describes behaviour that exists in the app.
 * No accuracy claims for voice recognition (not yet measured on real recitation).
 */
export type LayerIcon = "mic" | "lock" | "list" | "book" | "headphones" | "download" | "sun" | "bookmark" | "circle" | "calendar" | "chart";
export type Layer = { icon: LayerIcon; title: string; sub: string };

export type Step = {
  id: string;
  title: string; // "\n" = line break on wide screens
  body: string;
  chips: string[];
  screens: ScreenId[];
  cards?: CropId[]; // pieces of the real screen that come out of the phone (2–3 at most)
};

export type Chapter = {
  id: string; // anchor for the header links
  label: string;
  layers: [Layer, Layer, Layer]; // the three floating tiles around the phone
  steps: Step[];
};

export const chapters: Chapter[] = [
  {
    id: "recitation",
    label: "التسميع",
    layers: [
      { icon: "mic", title: "بصوتك", sub: "أو بزر «التالي»" },
      { icon: "lock", title: "على جهازك", sub: "لا يُرسَل صوتك" },
      { icon: "list", title: "سجل الأخطاء", sub: "بنوعها وموضعها" },
    ],
    steps: [
      {
        id: "recite",
        title: "سمّع،\nوالآيات مخفية.",
        body: "تظهر الكلمة حين تقرؤها، ويتوقف الكشف عند الخطأ ويُحفظ في سجلّك.",
        chips: [],
        screens: ["07-recite-wrong-word"],
        cards: ["recite-revealed", "recite-feedback", "recite-mic"],
      },
    ],
  },
  {
    id: "quran",
    label: "المصحف والاستماع",
    layers: [
      { icon: "book", title: "٦٠٤ صفحات", sub: "مصحف المدينة" },
      { icon: "headphones", title: "ثلاثة قرّاء", sub: "تظليل الآية" },
      { icon: "download", title: "دون اتصال", sub: "بعد التنزيل" },
    ],
    steps: [
      {
        id: "listen",
        title: "مصحف تسمعه\nوتتابعه.",
        body: "٦٠٤ صفحات برواية حفص، وثلاثة قرّاء تُظلَّل معهم الآية الجارية.",
        chips: [],
        screens: ["54-listen-follow-p2"],
        cards: ["listen-ayah", "listen-player"],
      },
    ],
  },
  {
    id: "adhkar",
    label: "الأذكار",
    layers: [
      { icon: "sun", title: "الصباح والمساء", sub: "وبعد الصلاة" },
      { icon: "bookmark", title: "حصن المسلم", sub: "١٣٢ بابًا" },
      { icon: "circle", title: "المسبحة", sub: "هدف اختياري" },
    ],
    steps: [
      {
        id: "dhikr",
        title: "أذكارك\nوحصن المسلم.",
        body: "أذكار الصباح والمساء وحصن المسلم كاملًا، بعدّاد يقف عند العدد الوارد.",
        chips: [],
        screens: ["22-reader-complete"],
        cards: ["adhkar-complete"],
      },
    ],
  },
  {
    id: "review",
    label: "المراجعة اليومية",
    layers: [
      { icon: "calendar", title: "مراجعة اليوم", sub: "مجدولة لك" },
      { icon: "chart", title: "تقدمك", sub: "من سجل تسميعك" },
      { icon: "bookmark", title: "آية اليوم", sub: "على الرئيسية" },
    ],
    steps: [
      {
        id: "daily",
        title: "مراجعة\nكل يوم.",
        body: "يجدول التطبيق ما تراجعه اليوم، ليبقى ما حفظته ثابتًا.",
        chips: [],
        screens: ["08-review"],
      },
    ],
  },
];

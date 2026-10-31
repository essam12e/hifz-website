import type { CropId, ScreenId } from "./screens";

/**
 * One continuous journey (as in Cinematic V3): three chapters, the same phone
 * throughout. Every sentence describes behaviour that exists in the app.
 * No accuracy claims for voice recognition (not yet measured on real recitation).
 */
export type LayerIcon = "mic" | "lock" | "list" | "book" | "headphones" | "download" | "sun" | "bookmark" | "circle";
export type Layer = { icon: LayerIcon; title: string; sub: string };

export type Step = {
  id: string;
  title: string; // "\n" = line break on wide screens
  body: string;
  chips: string[];
  screens: ScreenId[]; // the second one replaces the first later in the step
  cards?: CropId[]; // pieces of the real screen that come out of the phone
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
      { icon: "mic", title: "بالصوت", sub: "أو يدويًا بزر «التالي»" },
      { icon: "lock", title: "على جهازك", sub: "لا يُرسَل صوتك" },
      { icon: "list", title: "سجل الأخطاء", sub: "حذف · إبدال · نسيان" },
    ],
    steps: [
      {
        id: "setup",
        title: "اختر ما\nستسمّعه.",
        body: "حدّد السورة ونطاق الآيات، أو اطلب آية عشوائية من محفوظك.",
        chips: ["سورة ونطاق آيات", "آية من محفوظك", "أول كلمة تلميحًا"],
        screens: ["06-recite-setup"],
      },
      {
        id: "hidden",
        title: "الآيات مخفية\nحتى تقرأها.",
        body: "تظهر الكلمة بعد أن يطابق ما سُمع نصَّها، والنقر على كلمة مخفية يكشفها ويُسجَّل «نظرة».",
        chips: ["بالميكروفون", "أو يدويًا", "وضع الإخفاء في المصحف"],
        screens: ["04-hidden-unclear"],
      },
      {
        id: "mistake",
        title: "عند الخطأ\nيتوقف الكشف.",
        body: "يظهر موضع الكلمة المحذوفة أو المُبدلة بالأحمر دون كشفها، ويُحفظ الخطأ في سجلّك بنوعه وموضعه.",
        chips: ["حذف", "إبدال", "«ليس خطأ»"],
        screens: ["07-recite-wrong-word", "09-log"],
        cards: ["recite-revealed", "recite-hidden-row", "recite-feedback", "recite-mic"],
      },
    ],
  },
  {
    id: "quran",
    label: "المصحف والتلاوة",
    layers: [
      { icon: "book", title: "٦٠٤ صفحات", sub: "بترقيم مصحف المدينة" },
      { icon: "headphones", title: "ثلاثة قرّاء", sub: "تظليل الآية الجارية" },
      { icon: "download", title: "دون اتصال", sub: "بعد تنزيل السورة" },
    ],
    steps: [
      {
        id: "mushaf",
        title: "المصحف\nكما تعرفه.",
        body: "٦٠٤ صفحات بترقيم مصحف المدينة، بالرسم العثماني برواية حفص، مع بحث بالنص أو برقم الآية.",
        chips: ["رواية حفص", "بحث بالنص", "برقم الآية"],
        screens: ["01-mushaf-p1"],
      },
      {
        id: "index",
        title: "السور والأجزاء\nوالأحزاب.",
        body: "١١٤ سورة و٣٠ جزءًا و٦٠ حزبًا. اختر أيًّا منها فيفتح المصحف على الآية نفسها.",
        chips: ["١١٤ سورة", "٣٠ جزءًا", "٦٠ حزبًا"],
        screens: ["51-index-surahs", "52-index-hizb"],
      },
      {
        id: "listen",
        title: "استمع،\nوتابع الآية.",
        body: "اختر أحد ثلاثة قرّاء، فتُظلَّل الآية التي تُتلى الآن وتتقلّب الصفحة معها. ونزّل السور للاستماع دون اتصال.",
        chips: ["مشاري العفاسي", "محمود خليل الحصري", "محمد صديق المنشاوي"],
        screens: ["54-listen-follow-p2", "60-downloads"],
        cards: ["listen-ayah", "listen-player"],
      },
    ],
  },
  {
    id: "adhkar",
    label: "الأذكار",
    layers: [
      { icon: "sun", title: "الصباح والمساء", sub: "والنوم والاستيقاظ" },
      { icon: "bookmark", title: "حصن المسلم", sub: "١٣٢ بابًا · ٢٦٧ ذكرًا" },
      { icon: "circle", title: "المسبحة", sub: "هدف شخصي اختياري" },
    ],
    steps: [
      {
        id: "home",
        title: "الأذكار\nفي قسمها.",
        body: "من الشاشة الرئيسية ادخل «الأذكار»: الصباح والمساء، والنوم، والاستيقاظ، وبعد الصلاة، والمفضلة.",
        chips: ["بعد الصلاة", "المفضلة", "بحث"],
        screens: ["00-home", "20-adhkar-home"],
      },
      {
        id: "counter",
        title: "عدّاد\nمع كل ذكر.",
        body: "ضغطة لكل تكرار، لا تتجاوز العدد الوارد في المصدر، مع اهتزاز خفيف عند الاكتمال.",
        chips: ["تراجع وتصفير", "متابعة الجلسة"],
        screens: ["21-reader-first", "22-reader-complete"],
        cards: ["adhkar-complete"],
      },
      {
        id: "hisn",
        title: "حصن المسلم\nكاملًا.",
        body: "١٣٢ بابًا و٢٦٧ ذكرًا، مع بحث في الأبواب والنصوص لا يتأثر بالتشكيل.",
        chips: ["١٣٢ بابًا", "٢٦٧ ذكرًا"],
        screens: ["28-hisn-index", "26-search"],
      },
      {
        id: "tasbih",
        title: "والمسبحة.",
        body: "مساحة ضغط واسعة، وهدف شخصي اختياري، وحفظ تلقائي للعدد.",
        chips: ["حفظ تلقائي", "اهتزاز اختياري"],
        screens: ["29-tasbih"],
      },
    ],
  },
];

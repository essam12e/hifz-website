import manifest from "../../public/app-screens/manifest.json";

/**
 * Every image on the site is a screen rendered from the app's own Jetpack
 * Compose code (UiScreenshotTest / ListenFlowTest, Robolectric), or a crop cut
 * from one of those screens. Nothing is drawn or generated.
 * `test` names the screenshot the app's test suite writes.
 */
type Meta = { alt: string; where: string };

const meta: Record<string, Meta> = {
  "00-home": { alt: "الشاشة الرئيسية لتطبيق حفظ: قسم القرآن الكريم وقسم الأذكار", where: "الشاشة الرئيسية" },
  "50-quran-home": { alt: "الصفحة الرئيسية لقسم القرآن: بدء التسميع ومراجعة اليوم وآية اليوم", where: "القرآن الكريم ← الرئيسية" },
  "06-recite-setup": { alt: "شاشة إعداد التسميع: اختيار السورة ونطاق الآيات", where: "القرآن الكريم ← التسميع" },
  "04-hidden-unclear": { alt: "وضع الإخفاء في المصحف وقد ظهرت الآيات المقروءة", where: "المصحف ← إخفاء" },
  "07-recite-wrong-word": { alt: "التسميع متوقف عند كلمة غير صحيحة مع بطاقة توضح ما سُمع", where: "القرآن الكريم ← التسميع" },
  "09-log": { alt: "سجل الأخطاء مع نوع كل خطأ وموضعه", where: "التقدم ← سجل الأخطاء" },
  "01-mushaf-p1": { alt: "صفحة سورة الفاتحة في المصحف", where: "القرآن الكريم ← المصحف" },
  "51-index-surahs": { alt: "فهرس المصحف: قائمة السور", where: "الرئيسية ← الفهرس ← السور" },
  "52-index-hizb": { alt: "فهرس المصحف: قائمة الأحزاب", where: "الرئيسية ← الفهرس ← الأحزاب" },
  "54-listen-follow-p2": { alt: "الاستماع مع تظليل الآية الجارية في سورة البقرة", where: "المصحف ← استماع" },
  "58-player-sheet": { alt: "الاستماع إلى سورة الإخلاص بصوت مشاري العفاسي مع تظليل الآية", where: "المصحف ← استماع" },
  "60-downloads": { alt: "شاشة تنزيل التلاوات واختيار القارئ", where: "الرئيسية ← تنزيل التلاوات" },
  "20-adhkar-home": { alt: "صفحة الأذكار: الصباح والمساء والنوم والاستيقاظ وحصن المسلم والمسبحة والمفضلة", where: "الشاشة الرئيسية ← الأذكار" },
  "21-reader-first": { alt: "قارئ أذكار الصباح والمساء مع العداد", where: "الأذكار ← أذكار الصباح" },
  "22-reader-complete": { alt: "ذكر مكتمل العدد: اكتمل ٣ من ٣", where: "الأذكار ← أذكار الصباح" },
  "28-hisn-index": { alt: "فهرس أبواب حصن المسلم", where: "الأذكار ← حصن المسلم كاملًا" },
  "29-tasbih": { alt: "المسبحة بمساحة ضغط واسعة", where: "الأذكار ← المسبحة" },
  "26-search": { alt: "البحث في الأذكار", where: "الأذكار ← البحث" },
  "08-review": { alt: "شاشة المراجعة: مراجعة اليوم والحفظ الجديد", where: "القرآن الكريم ← المراجعة" },
  "10-stats": { alt: "شاشة التقدم: الإحصاءات وأضعف الآيات وخريطة المصحف", where: "القرآن الكريم ← التقدم" },
};

const cropAlt: Record<string, string> = {
  "recite-feedback": "بطاقة من شاشة التسميع: الكلمة غير صحيحة، أعد من موضع التوقف",
  "recite-mic": "زر الميكروفون في شاشة التسميع",
  "recite-hidden-row": "سطر من الكلمات المخفية وموضع الخطأ بالأحمر",
  "recite-revealed": "الكلمات التي ظهرت بعد قراءتها",
  "home-start": "بطاقة بدء التسميع من الصفحة الرئيسية",
  "home-review": "بطاقة مراجعة اليوم من الصفحة الرئيسية",
  "listen-player": "المشغّل المصغّر أثناء الاستماع",
  "listen-ayah": "الآية الجارية مظللة أثناء الاستماع",
  "adhkar-complete": "بطاقة اكتمال عدد الذكر",
};

export type ScreenId = keyof typeof manifest.screens;
export type CropId = keyof typeof manifest.crops;

export type Img = { src: string; w: number; h: number; alt: string; source: string; where?: string };

export function screen(id: ScreenId): Img {
  const m = manifest.screens[id];
  return { src: `/app-screens/${id}.webp`, w: m.w, h: m.h, alt: meta[id]?.alt ?? "", source: m.source, where: meta[id]?.where };
}

export function crop(id: CropId): Img {
  const m = manifest.crops[id];
  return { src: `/app-screens/crops/${id}.webp`, w: m.w, h: m.h, alt: cropAlt[id] ?? "", source: m.source };
}

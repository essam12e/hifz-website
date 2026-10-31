import type { CropId, ScreenId } from "./screens";

/**
 * Copy for the pinned showcases. Every sentence describes behaviour that exists
 * in the app's code (see README «المزايا المعروضة» for the file that implements it).
 * No accuracy claims for voice recognition: it is not yet measured on real recitation.
 */
export type Step = {
  id: string;
  title: string; // "\n" = line break
  body: string;
  chips: string[];
  screens: ScreenId[]; // 1 or 2; the second replaces the first half-way through the step
  cards?: CropId[]; // pieces of the real screen that come out of the phone
};

export type Showcase = { id: string; label: string; steps: Step[] };

export const recitation: Showcase = {
  id: "recitation",
  label: "التسميع",
  steps: [
    {
      id: "setup",
      title: "اختر ما ستسمّعه.",
      body: "حدّد السورة ونطاق الآيات، أو اطلب آية عشوائية من محفوظك. ويمكنك إظهار أول كلمة من كل آية تلميحًا.",
      chips: ["سورة ونطاق آيات", "آية عشوائية من محفوظك", "أول كلمة تلميحًا"],
      screens: ["06-recite-setup"],
    },
    {
      id: "hidden",
      title: "الآيات مخفية\nحتى تقرأها.",
      body: "تظهر الكلمة بعد أن يطابق ما سُمع نصَّها، والنقر على كلمة مخفية يكشفها ويُسجَّل «نظرة».",
      chips: ["بالميكروفون", "أو يدويًا بزر «التالي»", "التعرّف داخل جهازك"],
      screens: ["04-hidden-unclear"],
    },
    {
      id: "mistake",
      title: "عند الخطأ\nيتوقف الكشف.",
      body: "إذا حُذفت كلمة أو أُبدلت يظهر موضعها بالأحمر دون كشف نصها، ولا يُكشف ما بعدها حتى تعيد القراءة صحيحة.",
      chips: ["حذف", "إبدال", "نسيان"],
      screens: ["07-recite-wrong-word"],
      cards: ["recite-revealed", "recite-hidden-row", "recite-feedback", "recite-mic"],
    },
    {
      id: "log",
      title: "وكل خطأ\nفي سجلّك.",
      body: "يُحفظ الخطأ بنوعه وموضعه وما سُمع، ويمكنك وسمه «ليس خطأ» إن لم يكن كذلك.",
      chips: ["نوع الخطأ", "موضعه", "«ليس خطأ»"],
      screens: ["09-log"],
    },
  ],
};

export const quran: Showcase = {
  id: "quran",
  label: "المصحف والتلاوة",
  steps: [
    {
      id: "mushaf",
      title: "المصحف\nكما تعرفه.",
      body: "٦٠٤ صفحات بترقيم مصحف المدينة، بالرسم العثماني برواية حفص، مع بحث بالنص أو برقم الآية.",
      chips: ["٦٠٤ صفحات", "رواية حفص", "بحث برقم الآية"],
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
      body: "اختر أحد ثلاثة قرّاء، فتُظلَّل الآية التي تُتلى الآن وتتقلّب الصفحة معها.",
      chips: ["مشاري العفاسي", "محمود خليل الحصري", "محمد صديق المنشاوي"],
      screens: ["54-listen-follow-p2", "58-player-sheet"],
      cards: ["listen-ayah", "listen-player"],
    },
    {
      id: "downloads",
      title: "نزّل التلاوات.",
      body: "نزّل السور التي تريدها لكل قارئ، واستمع إليها بعد ذلك دون اتصال.",
      chips: ["سورة سورة", "لكل قارئ", "دون اتصال"],
      screens: ["60-downloads"],
    },
  ],
};

export const adhkar: Showcase = {
  id: "adhkar",
  label: "الأذكار",
  steps: [
    {
      id: "home",
      title: "الأذكار\nفي قسمها.",
      body: "من الشاشة الرئيسية ادخل «الأذكار»: الصباح والمساء، والنوم، والاستيقاظ، وبعد الصلاة، والمفضلة.",
      chips: ["الصباح والمساء", "النوم والاستيقاظ", "بعد الصلاة"],
      screens: ["00-home", "20-adhkar-home"],
    },
    {
      id: "counter",
      title: "عدّاد\nمع كل ذكر.",
      body: "ضغطة لكل تكرار، لا تتجاوز العدد الوارد في المصدر، مع اهتزاز خفيف عند الاكتمال.",
      chips: ["لا يتجاوز العدد", "تراجع وتصفير", "متابعة الجلسة"],
      screens: ["21-reader-first", "22-reader-complete"],
      cards: ["adhkar-complete"],
    },
    {
      id: "hisn",
      title: "حصن المسلم\nكاملًا.",
      body: "١٣٢ بابًا و٢٦٧ ذكرًا، مع بحث في الأبواب والنصوص لا يتأثر بالتشكيل.",
      chips: ["١٣٢ بابًا", "٢٦٧ ذكرًا", "المفضلة"],
      screens: ["28-hisn-index", "26-search"],
    },
    {
      id: "tasbih",
      title: "والمسبحة.",
      body: "مساحة ضغط واسعة، وهدف شخصي اختياري، وحفظ تلقائي للعدد.",
      chips: ["هدف اختياري", "حفظ تلقائي", "اهتزاز اختياري"],
      screens: ["29-tasbih"],
    },
  ],
};

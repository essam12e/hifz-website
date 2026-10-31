# موقع حِفظ

موقع تعريفي سينمائي لتطبيق حِفظ، مبني على فكرة النموذج المرجعي `hifz-cinematic-v3.html` (هاتف ثلاثي الأبعاد، ومشاهد مثبتة أثناء التمرير، وبطاقات تخرج من الهاتف ثم تعود إليه)، مع لقطات حقيقية من التطبيق وهويته وخطه.

## التشغيل
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # بناء إنتاجي ثابت في out/
```
المتطلبات: Node.js 20 أو أحدث.

لمعاينة الحالة المبسطة (بلا حركات مثبتة)، أضف `?motion=lite` إلى الرابط. تُفعَّل تلقائيًا عند تفعيل «تقليل الحركة» في الجهاز، أو وضع توفير البيانات، أو على الأجهزة الضعيفة جدًا.

## تفعيل زر التحميل
روابط تحميل ملف APK في `src/config/site.ts` (`apkModern` و`apkLegacy`). وعند نزول التطبيق في Google Play ضع رابطه في `googlePlayUrl`، فيحل زر المتجر محل التنويه.

## النشر على Vercel
المستودع `essam12e/hifz-website` مربوط بمشروع Vercel باسم `hifz-website`. كل دفع إلى الفرع `main` يُنشر تلقائيًا، ولا يحتاج المشروع متغيرات بيئة.

وبدون مستودع: `npx vercel` من داخل المجلد. ولأن المشروع يُصدَّر ملفات ثابتة، يمكن أيضًا رفع مجلد `out/` إلى أي استضافة ثابتة.

## البنية
```
src/
  app/            layout.tsx (اختيار وضع الحركة قبل الرسم) · page.tsx · globals.css
  styles/         tokens.css  ← ألوان التطبيق والخطوط والمسافات
  config/site.ts  ← رابط Google Play
  content/        screens.ts (اللقطات ومكانها في التطبيق) · journey.ts (فصول الرحلة ونصوصها) · verse.json
  animations/     journey.ts (الرحلة المثبتة) · hero.ts · progressPath.ts · sections.ts · choreography.ts
  components/     Header · HeroSection · IntroSection · JourneySection (رحلة واحدة: التسميع ثم المصحف ثم الأذكار)
                  CinematicPhone · VerseInterlude · ContinuitySection · DownloadSection · Footer · ScrollProgressPath
scripts/prepare_assets.py  ← ينسخ اللقطات والشعار والخط من التطبيق (للقراءة فقط)
public/           app-screens/ · brand/ · fonts/
```
النصوص في `content/`، وأرقام الحركة في `animations/choreography.ts`، والجداول الزمنية في `animations/`. المكونات لا تحوي منطق تحريك.

## الأصول ومصدرها
- **اللقطات**: من مجلد `hifz-android/screenshots/`. يولّدها اختبار التطبيق `UiScreenshotTest` و`ListenFlowTest` برسم واجهات Compose الحقيقية (Robolectric). حُوّلت إلى WebP بعرض 720 دون أي تعديل. المقاطع الصغيرة قُصّت من اللقطات نفسها. الإحداثيات في السكربت.
- **الشعار**: `logo_mark.png` و`logo_white.png` كما هما في `app/src/main/res/drawable-nodpi`.
- **الخط**: The Year of The Camel بوزنيه الموجودين فقط (ExtraBold 800 وExtraLight 200)، وهو نفس الملف المرفوع. حُوّل إلى WOFF2 مع حذف المحارف غير العربية واللاتينية، دون مساس بشكل الحروف.
- **نص الآية**: سورة القمر ١٧، يُقرأ آليًا من `quran.json` في التطبيق. الخط Amiri Quran الخاص بالتطبيق، مقتطعًا على حروف الآية فقط.

لتحديث الأصول بعد تغيّر التطبيق:
```bash
HIFZ_SHOTS=/path/to/screenshots HIFZ_SRC=/path/to/extracted-android-source npm run assets
```

import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

/* Privacy policy for the «حِفظ» Android app (package app.hifz.quran).
   Google Play requires a public URL for it: https://hifz-website.vercel.app/privacy
   Keep it in line with the app's manifest: RECORD_AUDIO (on-device recitation only),
   INTERNET (recitation audio files only), Android backup of hifz.json. */

export const metadata: Metadata = {
  title: "سياسة الخصوصية — حِفظ",
  description: "سياسة الخصوصية لتطبيق حِفظ للقرآن الكريم والأذكار.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "4 نوفمبر 2026";
const WHATSAPP = "https://wa.me/966531098278";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "باختصار",
    body: (
      <ul>
        <li>لا يطلب التطبيق إنشاء حساب، ولا يجمع أي بيانات شخصية، ولا يرسل بياناتك إلينا أو إلى أي جهة.</li>
        <li>صوتك أثناء التسميع يُعالَج داخل جهازك فقط، ولا يُحفظ ولا يُرسل.</li>
        <li>لا إعلانات في التطبيق، ولا أدوات تحليل أو تتبّع.</li>
      </ul>
    ),
  },
  {
    title: "الميكروفون",
    body: (
      <p>
        يطلب التطبيق إذن الميكروفون عند استعمالك ميزة التسميع بالصوت فقط. يحوّل نموذج تعرّف على الكلام مدمج في
        التطبيق صوتك إلى نص داخل الجهاز لمقارنته بالآيات، ثم يُهمَل الصوت فورًا. لا يُسجَّل الصوت في ملف، ولا يغادر
        جهازك، ويعمل التسميع دون اتصال بالإنترنت. يمكنك رفض الإذن أو سحبه من إعدادات الجهاز، وتبقى بقية الميزات تعمل.
      </p>
    ),
  },
  {
    title: "البيانات المحفوظة على جهازك",
    body: (
      <>
        <p>
          يحفظ التطبيق على جهازك فقط: تقدّم الحفظ والمراجعة، وسجل الأخطاء، وجلسات الأذكار والمسبحة، والمفضلة،
          والإعدادات، وملفات التلاوة التي تختار تنزيلها. لا نطّلع على شيء منها.
        </p>
        <ul>
          <li>يمكنك تصدير بياناتك إلى ملف واستيرادها متى شئت، والملف يبقى حيث تحفظه أنت.</li>
          <li>
            إن كان النسخ الاحتياطي من Google مفعّلًا في جهازك، يُنسخ ملف تقدّمك ضمن نسخة جهازك الاحتياطية في حسابك
            على Google، وتديره Google وفق إعداداتك، ولا نصل إليه.
          </li>
          <li>تُحذف كل البيانات بحذف التطبيق أو بمسح بياناته من إعدادات الجهاز.</li>
        </ul>
      </>
    ),
  },
  {
    title: "الإنترنت",
    body: (
      <p>
        يستعمل التطبيق الإنترنت لغرض واحد: تشغيل ملفات التلاوة أو تنزيلها عند اختيارك الاستماع. يطلب التطبيق ملف
        الآية من خادم ملفات تلاوة خارجي، ولا يرسل معه أي بيانات عنك. وكأي طلب عبر الإنترنت، يرى ذلك الخادم عنوان
        الشبكة (IP) الخاص بجهازك. الاتصال مشفّر (HTTPS).
      </p>
    ),
  },
  {
    title: "الأطفال",
    body: <p>التطبيق مناسب لجميع الأعمار، ولا يجمع بيانات من أي مستخدم، صغيرًا كان أو كبيرًا.</p>,
  },
  {
    title: "التغييرات على هذه السياسة",
    body: <p>إن تغيّر شيء مما سبق في إصدار قادم، نحدّث هذه الصفحة وتاريخها قبل نشر الإصدار.</p>,
  },
  {
    title: "التواصل",
    body: (
      <p>
        لأي سؤال عن الخصوصية تواصل معنا عبر واتساب:{" "}
        <a href={WHATSAPP} dir="ltr" className="inline-block whitespace-nowrap">
          +966 53 109 8278
        </a>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink" style={{ fontFamily: "var(--font-ui)" }}>
      <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
        <a href="/" aria-label="الصفحة الرئيسية" className="inline-block">
          <Logo height={52} />
        </a>
        <h1 className="mt-10 text-3xl font-extrabold text-petrol-700 sm:text-4xl">سياسة الخصوصية</h1>
        <p className="mt-3 text-muted" style={{ fontWeight: 200 }}>
          تطبيق «حِفظ» للقرآن الكريم والأذكار · آخر تحديث: {UPDATED}
        </p>
        {sections.map((s) => (
          <section key={s.title} className="privacy-section mt-10">
            <h2 className="text-xl font-extrabold text-petrol-600">{s.title}</h2>
            <div className="mt-3 space-y-3 text-lg leading-loose" style={{ fontWeight: 200 }}>
              {s.body}
            </div>
          </section>
        ))}
        <p className="mt-14 border-t border-petrol-100 pt-6 text-muted" style={{ fontWeight: 200 }}>
          هذا التطبيق صدقة جارية لأبي وأمي.
        </p>
      </div>
    </main>
  );
}

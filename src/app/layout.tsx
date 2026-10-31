import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "حِفظ — تطبيق للقرآن الكريم والأذكار",
  description:
    "حِفظ تطبيق أندرويد للقرآن الكريم والأذكار: مصحف بصفحات مصحف المدينة، وتسميع يُخفي الآيات ويكشف الكلمة بعد قراءتها، ومراجعة مجدولة، وحصن المسلم كاملًا.",
  icons: { icon: "/brand/ic-fg-logo.png" },
  openGraph: {
    title: "حِفظ — تطبيق للقرآن الكريم والأذكار",
    description: "مصحف، وتسميع، ومراجعة، واستماع، وأذكار حصن المسلم.",
    locale: "ar",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#044348",
  width: "device-width",
  initialScale: 1,
};

/* Decides the motion mode before first paint:
   full  = pinned GSAP scenes
   lite  = static layout (reduced motion, data saver, or a very weak device) */
const motionScript = `(function(){try{var d=document.documentElement,n=navigator,lite=matchMedia('(prefers-reduced-motion: reduce)').matches||(n.connection&&n.connection.saveData)||(n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=2)||/[?&]motion=lite/.test(location.search);d.dataset.motion=lite?'lite':'full'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-motion="lite" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link rel="preload" href="/fonts/TheYearofTheCamel-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/TheYearofTheCamel-ExtraLight.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}

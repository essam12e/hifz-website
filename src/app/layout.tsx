import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://hifz-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "حِفظ — تطبيق للقرآن الكريم والأذكار",
  description:
    "حِفظ تطبيق أندرويد للقرآن الكريم والأذكار: مصحف بصفحات مصحف المدينة، وتسميع يُخفي الآيات ويكشف الكلمة بعد قراءتها، ومراجعة مجدولة، وحصن المسلم كاملًا.",
  icons: {
    icon: [{ url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "حِفظ — تطبيق للقرآن الكريم والأذكار",
    description: "مصحف، وتسميع، ومراجعة، واستماع، وأذكار حصن المسلم.",
    url: SITE_URL,
    siteName: "حِفظ",
    locale: "ar",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "شعار حِفظ" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
const motionScript = `(function(){try{var d=document.documentElement,n=navigator,q=location.search,lite=/[?&]motion=lite/.test(q)||(!/[?&]motion=full/.test(q)&&(matchMedia('(prefers-reduced-motion: reduce)').matches||(n.connection&&n.connection.saveData)));d.dataset.motion=lite?'lite':'full'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" data-motion="lite" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <link rel="preload" href="/fonts/TheYearofTheCamel-ExtraBold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/TheYearofTheCamel-ExtraLight.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

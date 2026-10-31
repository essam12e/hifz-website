/**
 * Single place to switch the download button on.
 *
 * While `googlePlayUrl` is null the button renders as a disabled «قريبًا» state
 * with no link at all. When the app is published, paste the real Play Store URL,
 * e.g. "https://play.google.com/store/apps/details?id=app.hifz.quran", and rebuild.
 */
export const siteConfig = {
  name: "حِفظ",
  googlePlayUrl: null as string | null,
  minAndroid: "Android 8.0",
} as const;

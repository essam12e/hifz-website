/**
 * Download links shown in the download section.
 *
 * `apkModern` / `apkLegacy`: direct APK downloads (MediaFire) supplied by essam.
 * `googlePlayUrl`: when the app is live on Google Play, paste its URL here
 * (e.g. "https://play.google.com/store/apps/details?id=app.hifz.quran") and the
 * Play notice under the buttons is replaced by a Google Play button.
 */
export const siteConfig = {
  name: "حِفظ",
  apkModern: "https://www.mediafire.com/file/3w8cnkqfxsxbp8j/%D8%AD%D9%81%D8%B8+%D9%84%D9%84%D8%A7%D8%AC%D9%87%D8%B2%D9%87+%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%D9%87.apk/file",
  apkLegacy: "https://www.mediafire.com/file/84rfi569ee61vyn/%D8%AD%D9%81%D8%B8+%D9%84%D9%84%D8%A7%D8%AC%D9%87%D8%B2%D9%87+%D8%A7%D9%84%D8%B6%D8%B9%D9%8A%D9%81%D8%A9.apk/file",
  googlePlayUrl: null as string | null,
  minAndroid: "Android 8.0",
} as const;

"""Copy the real assets of the Hifz Android app into the website.

Reads (never writes) the app's files:
  HIFZ_SHOTS : folder with the PNG screens rendered from the app's own Compose code
  HIFZ_SRC   : the extracted Android source (logos, fonts, quran.json)

Writes WebP screens, WebP crops (cut from the same screens, pixel-for-pixel, no
retouching), the logo files and WOFF2 fonts into public/. Re-run after the app
changes: `npm run assets`.
"""
import json, os, shutil, subprocess, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOTS = os.environ.get("HIFZ_SHOTS", "/mnt/project-files/hifz-android/screenshots")
SRC = os.environ.get("HIFZ_SRC", "/tmp/claude-0/src")
OUT = os.path.join(ROOT, "public")

SCREENS = [
    "00-home", "50-quran-home", "06-recite-setup", "04-hidden-unclear",
    "07-recite-wrong-word", "09-log",
    "01-mushaf-p1", "51-index-surahs", "52-index-hizb", "54-listen-follow-p2",
    "58-player-sheet", "60-downloads", "20-adhkar-home", "21-reader-first",
    "22-reader-complete", "28-hisn-index", "29-tasbih", "26-search",
    "08-review", "10-stats",
]

# name: (screen, (left, top, right, bottom)) in original 1233x2673 pixels
CROPS = {
    "recite-feedback": ("07-recite-wrong-word", (29, 1872, 1204, 2146)),
    "recite-mic": ("07-recite-wrong-word", (505, 2195, 730, 2415)),
    "recite-hidden-row": ("07-recite-wrong-word", (60, 850, 1210, 975)),
    "recite-revealed": ("07-recite-wrong-word", (40, 640, 1210, 830)),
    "home-start": ("50-quran-home", (630, 238, 1188, 553)),
    "home-review": ("50-quran-home", (46, 238, 604, 553)),
    "listen-player": ("54-listen-follow-p2", (20, 2280, 1213, 2445)),
    "listen-ayah": ("58-player-sheet", (20, 590, 1213, 985)),
    "adhkar-complete": ("22-reader-complete", (46, 1982, 1188, 2302)),
}


def webp(img, path, width, q=84):
    if img.width > width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img.save(path, "WEBP", quality=q, method=6)
    return img.size


def main():
    sdir = os.path.join(OUT, "app-screens")
    shutil.rmtree(sdir, ignore_errors=True)
    cdir = os.path.join(sdir, "crops")
    os.makedirs(cdir, exist_ok=True)
    manifest = {"screens": {}, "crops": {}}
    for name in SCREENS:
        im = Image.open(os.path.join(SHOTS, name + ".png")).convert("RGB")
        size = webp(im, os.path.join(sdir, name + ".webp"), 720)
        manifest["screens"][name] = {"w": size[0], "h": size[1], "source": f"screenshots/{name}.png"}
    for name, (screen, box) in CROPS.items():
        im = Image.open(os.path.join(SHOTS, screen + ".png")).convert("RGB").crop(box)
        size = webp(im, os.path.join(cdir, name + ".webp"), 760, q=88)
        manifest["crops"][name] = {"w": size[0], "h": size[1], "source": f"screenshots/{screen}.png", "box": box}
    with open(os.path.join(sdir, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=1)

    # Official logo files exactly as shipped in the app (no redraw, no resize of the PNG).
    bdir = os.path.join(OUT, "brand")
    os.makedirs(bdir, exist_ok=True)
    nodpi = os.path.join(SRC, "app/src/main/res/drawable-nodpi")
    for f in ["logo_mark.png", "logo_white.png", "ic_fg_logo.png"]:
        shutil.copyfile(os.path.join(nodpi, f), os.path.join(bdir, f.replace("_", "-")))

    # Fonts: the uploaded/app UI font converted to WOFF2 (same outlines), and the
    # app's Quran font subset to the one ayah the site shows.
    fdir = os.path.join(OUT, "fonts")
    os.makedirs(fdir, exist_ok=True)
    fsrc = os.path.join(SRC, "app/src/main/res/font")
    for src, dst in [("camel_extrabold.otf", "TheYearofTheCamel-ExtraBold.woff2"),
                     ("camel_extralight.otf", "TheYearofTheCamel-ExtraLight.woff2")]:
        # Same outlines; only unused code points (Cyrillic, symbols...) are dropped.
        subprocess.run([sys.executable, "-m", "fontTools.subset", os.path.join(fsrc, src),
                        "--unicodes=U+0020-007E,U+00A0-00FF,U+0600-06FF,U+0750-077F,U+08A0-08FF,"
                        "U+FB50-FDFF,U+FE70-FEFF,U+200C-200F,U+2010-2027,U+2066-2069",
                        "--layout-features=*", "--flavor=woff2", "--output-file=" + os.path.join(fdir, dst)], check=True)

    quran = json.load(open(os.path.join(SRC, "app/src/main/assets/quran.json"), encoding="utf-8"))
    s = quran["surahs"][53]  # سورة القمر
    ayah = quran["ayahs"][s["start"] + 16]  # الآية 17
    verse = {"text": ayah, "surah": s["name"], "number": 17,
             "source": "app/src/main/assets/quran.json (KFGQPC QPC Hafs)"}
    os.makedirs(os.path.join(ROOT, "src/content"), exist_ok=True)
    with open(os.path.join(ROOT, "src/content/verse.json"), "w", encoding="utf-8") as f:
        json.dump(verse, f, ensure_ascii=False, indent=1)
    subprocess.run([sys.executable, "-m", "fontTools.subset", os.path.join(fsrc, "amiri_quran.ttf"),
                    "--text=" + ayah + "﴿﴾١٧٠١٢٣٤٥٦٧٨٩", "--layout-features=*", "--flavor=woff2",
                    "--output-file=" + os.path.join(fdir, "AmiriQuran-subset.woff2")], check=True)
    print("ok", len(SCREENS), "screens", len(CROPS), "crops")


if __name__ == "__main__":
    main()

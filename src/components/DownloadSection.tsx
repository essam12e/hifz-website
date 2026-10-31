"use client";
import { useRef } from "react";
import { Download } from "lucide-react";
import { useGSAP, isLite } from "@/lib/gsap";
import { downloadScene } from "@/animations/sections";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function DownloadSection() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => { if (!isLite() && root.current) downloadScene(root.current); }, { scope: root });
  const url = siteConfig.googlePlayUrl;

  return (
    <section ref={root} id="download" className="download on-dark" data-section="التحميل" data-tone="dark">
      <div className="download-ring" data-dl-ring="" aria-hidden="true" />
      <div className="download-inner">
        <div data-dl-logo="">
          <Logo variant="white" height={120} className="download-logo" />
        </div>
        <h2 data-dl-block="">جرّب حِفظ على هاتفك.</h2>
        <p data-dl-block="">المصحف والتسميع والمراجعة والأذكار، في تطبيق واحد لأجهزة أندرويد.</p>
        <div className="download-cta" data-dl-block="">
          <div className="download-buttons">
            <a className="btn btn-light btn-xl" href={siteConfig.apkModern} target="_blank" rel="noopener noreferrer">
              <Download size={20} strokeWidth={1.8} aria-hidden="true" />
              التحميل للأجهزة الحديثة
            </a>
            <a className="btn btn-ghost btn-xl" href={siteConfig.apkLegacy} target="_blank" rel="noopener noreferrer">
              <Download size={20} strokeWidth={1.8} aria-hidden="true" />
              التحميل للأجهزة القديمة
            </a>
          </div>
          <p className="download-hint">
            اختر «الأجهزة الحديثة» أولًا. وإن لم يُثبَّت على جهازك، فاختر «الأجهزة القديمة».
          </p>
          {url ? (
            <a className="btn btn-ghost" href={url} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
          ) : (
            <p id="play-note" className="play-note">
              سيتم إتاحة تطبيق حِفظ على متجر Google Play خلال الأيام القادمة بإذن الله.
            </p>
          )}
        </div>
        <p className="requirements" data-dl-block="">
          يعمل على {siteConfig.minAndroid} فأحدث.
        </p>
      </div>
    </section>
  );
}

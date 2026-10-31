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
          {url ? (
            <a className="btn btn-light btn-xl" href={url} target="_blank" rel="noopener noreferrer">
              <Download size={20} strokeWidth={1.8} aria-hidden="true" />
              تحميل التطبيق
            </a>
          ) : (
            <>
              <button className="btn btn-light btn-xl is-soon" type="button" disabled aria-describedby="play-note">
                <Download size={20} strokeWidth={1.8} aria-hidden="true" />
                تحميل التطبيق
                <span className="soon-badge">قريبًا</span>
              </button>
              <p id="play-note" className="play-note">
                سيتم إتاحة تطبيق حِفظ على متجر Google Play خلال الأيام القادمة بإذن الله.
              </p>
            </>
          )}
        </div>
        <p className="requirements" data-dl-block="">
          يعمل على {siteConfig.minAndroid} فأحدث.
        </p>
      </div>
    </section>
  );
}

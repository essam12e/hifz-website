import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { JourneySection } from "@/components/JourneySection";
import { VerseInterlude } from "@/components/VerseInterlude";
import { ContinuitySection } from "@/components/ContinuitySection";
import { DownloadSection } from "@/components/DownloadSection";
import { Footer } from "@/components/Footer";
import { ScrollProgressPath } from "@/components/ScrollProgressPath";
import { RefreshOnLoad } from "@/components/RefreshOnLoad";

export default function Page() {
  return (
    <>
      <a href="#recitation" className="skip-link">
        انتقل إلى المحتوى
      </a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <ScrollProgressPath />
      <main>
        <HeroSection />
        <IntroSection />
        <JourneySection />
        <VerseInterlude />
        <ContinuitySection />
        <DownloadSection />
      </main>
      <Footer />
      <RefreshOnLoad />
      <noscript>
        <style>{`[data-intro],[data-hero-phone],[data-hero-card]{opacity:1!important}`}</style>
      </noscript>
    </>
  );
}

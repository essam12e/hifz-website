import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { RecitationSection, QuranSection, AdhkarSection } from "@/components/Showcases";
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
      <Header />
      <ScrollProgressPath />
      <main>
        <HeroSection />
        <IntroSection />
        <RecitationSection />
        <QuranSection />
        <VerseInterlude />
        <AdhkarSection />
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

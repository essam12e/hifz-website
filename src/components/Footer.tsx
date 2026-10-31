import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer" data-tone="dark">
      <Logo variant="white" height={44} />
      <p>هذا التطبيق صدقة جارية لأبي وأمي.</p>
      <nav aria-label="روابط سريعة">
        <a href="#recitation">التسميع</a>
        <a href="#quran">المصحف</a>
        <a href="#adhkar">الأذكار</a>
        <a href="#top">إلى الأعلى</a>
      </nav>
    </footer>
  );
}

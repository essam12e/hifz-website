import { Logo } from "./Logo";

const links = [
  { href: "#recitation", label: "التسميع" },
  { href: "#quran", label: "المصحف" },
  { href: "#adhkar", label: "الأذكار" },
];

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" aria-label="حِفظ — إلى الأعلى" className="site-logo">
        <Logo variant="white" height={40} priority />
      </a>
      <nav aria-label="أقسام الموقع">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
        <a href="#download" className="nav-cta">
          التحميل
        </a>
      </nav>
    </header>
  );
}

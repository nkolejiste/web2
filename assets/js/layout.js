/**
 * Společné layout komponenty webu.
 *
 * Princip navigace:
 * - rozcestník nemá horní menu,
 * - Železárny mají vlastní uzavřenou navigaci,
 * - Rafinerie má vlastní uzavřenou navigaci,
 * - odkazy mezi areály jsou pouze na hlavním rozcestníku.
 *
 * Běžný obsah stránek upravuj přímo v HTML. Tohle je místo pouze pro
 * položky menu, logo/brand a společnou patičku.
 */

const SECTION_CONFIG = {
  zelezarny: {
    brandLabel: "ŽELEZÁRNY",
    brandPath: "zelezarny/",
    navItems: [
      { path: "zelezarny/", label: "Železárny", page: "zelezarny-home" },
      { path: "zelezarny/stavba.html", label: "Stavba", page: "zelezarny-stavba" },
      { path: "zelezarny/provoz.html", label: "Provoz", page: "zelezarny-provoz" },
      { path: "zelezarny/lokomotivy.html", label: "Lokomotivy", page: "zelezarny-lokomotivy" },
      { path: "zelezarny/vozy.html", label: "Vozy", page: "zelezarny-vozy" },
    ],
  },
  rafinerie: {
    brandLabel: "RAFINERIE",
    brandPath: "rafinerie/",
    navItems: [
      { path: "rafinerie/", label: "Rafinerie", page: "rafinerie-home" },
    ],
  },
};

function buildUrl(root, path) {
  return `${root}${path}`;
}

export function renderHeader({ activePage, section, root }) {
  const config = SECTION_CONFIG[section];
  if (!config) return "";

  const navLinks = config.navItems
    .map(item => {
      const activeClass = item.page === activePage ? ' class="active" aria-current="page"' : "";
      return `<a${activeClass} href="${buildUrl(root, item.path)}">${item.label}</a>`;
    })
    .join("\n        ");

  return `
    <a class="brand" href="${buildUrl(root, config.brandPath)}" aria-label="${config.brandLabel} – úvodní stránka">
      <span class="brand-mark"></span>
      <span>${config.brandLabel}</span>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Otevřít menu" aria-expanded="false" aria-controls="mainNav">
      <span></span><span></span>
    </button>

    <nav class="main-nav" id="mainNav" aria-label="Navigace areálu">
      ${navLinks}
    </nav>
  `;
}

export function renderFooter(root, section) {
  if (section === "zelezarny") {
    return `
      <div class="container footer-grid">
        <div>
          <div class="brand footer-brand">
            <span class="brand-mark"></span>
            <span>ŽELEZÁRNY</span>
          </div>
          <p>Samostatný průmyslový modul modelového kolejiště v měřítku N 1:160.</p>
        </div>

        <div class="footer-nav">
          <a href="${buildUrl(root, "zelezarny/")}">Úvod</a>
          <a href="${buildUrl(root, "zelezarny/stavba.html")}">Stavba</a>
          <a href="${buildUrl(root, "zelezarny/provoz.html")}">Provoz</a>
          <a href="${buildUrl(root, "zelezarny/lokomotivy.html")}">Lokomotivy</a>
          <a href="${buildUrl(root, "zelezarny/vozy.html")}">Vozy</a>
          <a href="https://n-kolejiste.cz/">Hlavní web ↗</a>
        </div>

        <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
      </div>
    `;
  }

  if (section === "rafinerie") {
    return `
      <div class="container footer-grid">
        <div>
          <div class="brand footer-brand">
            <span class="brand-mark"></span>
            <span>RAFINERIE</span>
          </div>
          <p>Samostatný průmyslový modul modelového kolejiště v měřítku N 1:160.</p>
        </div>

        <div class="footer-nav">
          <a href="${buildUrl(root, "rafinerie/")}">Úvod</a>
          <a href="https://n-kolejiste.cz/">Hlavní web ↗</a>
        </div>

        <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
      </div>
    `;
  }

  // Rozcestník: schválně bez odkazů na jednotlivé areály v patičce.
  return `
    <div class="container footer-grid">
      <div>
        <div class="brand footer-brand">
          <span class="brand-mark"></span>
          <span>MODULOVÉ KOLEJIŠTĚ</span>
        </div>
        <p>Průmyslové moduly modelového kolejiště v měřítku N 1:160.</p>
      </div>

      <div class="footer-nav">
        <a href="https://n-kolejiste.cz/">Hlavní web ↗</a>
      </div>

      <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
    </div>
  `;
}

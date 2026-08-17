const NAV_ITEMS = [
  { href: "index.html", label: "Rozcestník", page: "home" },
  { href: "zelezarny.html", label: "Železárny", page: "zelezarny" },
  { href: "rafinerie.html", label: "Rafinerie", page: "rafinerie" },
];

export function renderHeader(activePage) {
  const navLinks = NAV_ITEMS.map(
    item => `<a${item.page === activePage ? ' class="active"' : ''} href="${item.href}">${item.label}</a>`
  ).join("\n        ");

  return `
    <a class="brand" href="index.html" aria-label="Modulové kolejiště – úvod">
      <span class="brand-mark"></span>
      <span>MODULOVÉ KOLEJIŠTĚ</span>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Otevřít menu" aria-expanded="false">
      <span></span><span></span>
    </button>

    <nav class="main-nav" id="mainNav" aria-label="Hlavní navigace">
      ${navLinks}
    </nav>
  `;
}

export function renderFooter() {
  return `
    <div class="container footer-grid">
      <div>
        <div class="brand footer-brand"><span class="brand-mark"></span><span>MODULOVÉ KOLEJIŠTĚ</span></div>
        <p>Průmyslové moduly modelového kolejiště v měřítku N 1:160.</p>
      </div>
      <div class="footer-nav">
        <a href="zelezarny.html">Železárny</a>
        <a href="rafinerie.html">Rafinerie</a>
        <a href="https://n-kolejiste.cz/">Hlavní web ↗</a>
      </div>
      <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
    </div>
  `;
}

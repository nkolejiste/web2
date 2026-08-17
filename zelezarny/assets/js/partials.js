const NAV_ITEMS = [
  { href: "index.html", label: "Úvod", page: "home" },
  { href: "projekt.html", label: "Projekt", page: "project" },
  { href: "stavba.html", label: "Stavba", page: "stavba" },
  { href: "lokomotivy.html", label: "Lokomotivy", page: "locomotives" },
];

export function renderHeader(activePage) {
  const navLinks = NAV_ITEMS.map(
    item => `<a${item.page === activePage ? ' class="active"' : ""} href="${item.href}">${item.label}</a>`
  ).join("\n        ");

  return `
    <a class="brand" href="index.html" aria-label="Železárny – úvod">
      <span class="brand-mark"></span>
      <span>ŽELEZÁRNY</span>
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
        <div class="brand footer-brand"><span class="brand-mark"></span><span>ŽELEZÁRNY</span></div>
        <p>Digitální prezentace modulového kolejiště Železáren.</p>
      </div>
      <div class="footer-nav">
        <a href="projekt.html">Projekt</a>
        <a href="lokomotivy.html">Lokomotivy</a>
      </div>
      <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
    </div>
  `;
}

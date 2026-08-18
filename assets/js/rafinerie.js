/** Hlavička a patička samostatné části Rafinerie. */
function renderHeader(root) {
  return `
    <a class="brand" href="${root}rafinerie/" aria-label="Rafinerie – úvodní stránka">
      <span class="brand-mark"></span>
      <span>RAFINERIE</span>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Otevřít menu" aria-expanded="false" aria-controls="mainNav">
      <span></span><span></span>
    </button>

    <nav class="main-nav" id="mainNav" aria-label="Navigace areálu">
      <a class="active" aria-current="page" href="${root}rafinerie/">Rafinerie</a>
    </nav>
  `;
}

function renderFooter() {
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
        <a href="https://n-kolejiste.cz/">Hlavní web ↗</a>
      </div>

      <p class="copyright">© <span data-current-year></span> N kolejiště. Všechna práva vyhrazena.</p>
    </div>
  `;
}

/* =========================================================
   LAYOUT ↑
   ---------------------------------------------------------
   KLASICKÝ JS / CHOVÁNÍ STRÁNKY ↓
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body.dataset.root || "../";
  const headerRoot = document.getElementById("siteHeader");
  const footerRoot = document.getElementById("siteFooter");

  if (headerRoot) headerRoot.innerHTML = renderHeader(root);
  if (footerRoot) footerRoot.innerHTML = renderFooter();

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const updateHeader = () => headerRoot?.classList.toggle("scrolled", window.scrollY > 24);
  const closeMenu = () => {
    mainNav?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = mainNav?.classList.toggle("open") ?? false;
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
  }

  document.querySelectorAll("[data-current-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});

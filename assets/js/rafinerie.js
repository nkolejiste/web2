/* =========================================================
   SPOLEČNÝ LAYOUT RAFINERIE
   Hlavička/menu jsou připravené společně pro budoucí stránky.
   Odkaz „Hlavní web ↗“ zůstává přímo v HTML patičce.
========================================================= */

function renderRafinerieHeader() {
  const headerMount = document.getElementById("siteHeaderMount");
  if (!headerMount) return;

  headerMount.outerHTML = `
  <header class="site-header" id="siteHeader">
    <a class="brand" href="index.html" aria-label="Rafinerie – úvodní stránka">
      <span class="brand-mark"></span>
      <span>RAFINERIE</span>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Otevřít menu" aria-expanded="false" aria-controls="mainNav">
      <span></span><span></span>
    </button>

    <nav class="main-nav" id="mainNav" aria-label="Navigace areálu">
      <a class="active" aria-current="page" href="index.html">Rafinerie</a>
    </nav>
  </header>`;
}


/* =========================================================
   KLASICKÝ JS / ANIMACE A INTERAKTIVITA RAFINERIE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderRafinerieHeader();

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  // Změna vzhledu hlavičky po odscrollování
  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobilní menu
  const closeMenu = () => {
    mainNav?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const open = mainNav?.classList.toggle("open") ?? false;
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Animace prvků při scrollování
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
});

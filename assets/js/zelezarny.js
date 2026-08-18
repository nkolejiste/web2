const NAV_ITEMS = [
  { href: "index.html", label: "Úvod", page: "home" },
  { href: "projekt.html", label: "Projekt", page: "project" },
  { href: "stavba.html", label: "Stavba", page: "stavba" },
];

function renderHeader(activePage) {
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

function renderFooter() {
  return `
    <div class="container footer-grid">
      <div>
        <div class="brand footer-brand"><span class="brand-mark"></span><span>ŽELEZÁRNY</span></div>
        <p>Digitální prezentace modulového kolejiště Železáren.</p>
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
  const activePage = document.body.dataset.page;

  const headerRoot = document.getElementById("siteHeader");
  if (headerRoot) headerRoot.innerHTML = renderHeader(activePage);

  const footerRoot = document.getElementById("siteFooter");
  if (footerRoot) footerRoot.innerHTML = renderFooter();

  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.classList.remove("active");
      menuToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Zvětšování fotek (Lightbox)
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  if (lightboxModal && lightboxImg) {
    // Najde všechny fotky v kapitolách a přidá jim funkci po kliknutí
    document.querySelectorAll(".chapter-media img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxModal.classList.add("active");
      });
    });

    // Zavření po kliknutí na křížek
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightboxModal.classList.remove("active");
      });
    }

    // Zavření po kliknutí kamkoliv do černého pozadí
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("active");
      }
    });
  }
});

/* =========================================================
   SPOLEČNÝ LAYOUT ŽELEZÁREN
   Hlavička, menu a patička jsou zde jen jednou pro všechny
   stránky: index.html, projekt.html a stavba.html.
========================================================= */

function getCurrentPage() {
  const file = window.location.pathname.split("/").pop();
  return file || "index.html";
}

function renderZelezarnyLayout() {
  const currentPage = getCurrentPage();
  const headerMount = document.getElementById("siteHeaderMount");
  const footerMount = document.getElementById("siteFooterMount");

  const menuItems = [
    { href: "index.html", label: "Úvod" },
    { href: "projekt.html", label: "Projekt" },
    { href: "stavba.html", label: "Stavba" }
  ];

  if (headerMount) {
    const links = menuItems.map(item => {
      const active = currentPage === item.href;
      return `<a${active ? ' class="active" aria-current="page"' : ''} href="${item.href}">${item.label}</a>`;
    }).join("\n      ");

    headerMount.outerHTML = `
  <header class="site-header" id="siteHeader">
    <a class="brand" href="index.html" aria-label="Železárny – úvod">
      <span class="brand-mark"></span>
      <span>ŽELEZÁRNY</span>
    </a>

    <button class="menu-toggle" id="menuToggle" aria-label="Otevřít menu" aria-expanded="false" aria-controls="mainNav">
      <span></span><span></span>
    </button>

    <nav class="main-nav" id="mainNav" aria-label="Hlavní navigace">
      ${links}
    </nav>
  </header>`;
  }

  if (footerMount) {
    footerMount.outerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <div class="brand footer-brand">
          <span class="brand-mark"></span>
          <span>ŽELEZÁRNY</span>
        </div>
        <p>Digitální prezentace modulového kolejiště Železáren.</p>
      </div>
      <p class="copyright">© 2026 N kolejiště. Všechna práva vyhrazena.</p>
    </div>
  </footer>`;
  }
}


/* =========================================================
   KLASICKÝ JS / ANIMACE A INTERAKTIVITA ŽELEZÁREN
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderZelezarnyLayout();

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

  // Zvětšování fotek (lightbox)
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  if (lightboxModal && lightboxImg) {
    document.querySelectorAll(".chapter-media img").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Detailní fotka";
        lightboxModal.classList.add("active");
      });
    });

    closeBtn?.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
    });

    lightboxModal.addEventListener("click", event => {
      if (event.target === lightboxModal) {
        lightboxModal.classList.remove("active");
      }
    });

    window.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        lightboxModal.classList.remove("active");
      }
    });
  }
});

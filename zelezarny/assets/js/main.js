import { renderHeader, renderFooter } from "./partials.js";
import { locomotives } from "./data.js";

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

  const homeGrid = document.getElementById("homeLocoGrid");
  if (homeGrid) {
    homeGrid.innerHTML = locomotives.slice(0, 3).map(loco => `
      <a class="home-loco-card reveal" href="lokomotivy.html#${loco.id}">
        <img src="${loco.image}" alt="${loco.title}" width="2121" height="1414" loading="lazy">
        <div class="home-loco-content">
          <span>${loco.typeLabel.toUpperCase()}</span>
          <h3>${loco.name}</h3>
        </div>
      </a>
    `).join("");

    homeGrid.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  }

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
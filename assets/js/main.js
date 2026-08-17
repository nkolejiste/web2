import { renderHeader, renderFooter } from "./layout.js";

document.addEventListener("DOMContentLoaded", () => {
  const { page: activePage, section = "main", root = "./" } = document.body.dataset;

  const headerRoot = document.getElementById("siteHeader");
  const footerRoot = document.getElementById("siteFooter");

  if (headerRoot) {
    headerRoot.innerHTML = renderHeader({ activePage, section, root });
  }

  if (footerRoot) {
    footerRoot.innerHTML = renderFooter(root, section);
  }

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  const updateHeader = () => {
    headerRoot?.classList.toggle("scrolled", window.scrollY > 24);
  };

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

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach(element => element.classList.add("visible"));
  }

  document.querySelectorAll("[data-current-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
});

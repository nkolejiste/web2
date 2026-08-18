/** Patička hlavního rozcestníku. */
function renderFooter() {
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

/* =========================================================
   LAYOUT ↑
   ---------------------------------------------------------
   KLASICKÝ JS / CHOVÁNÍ STRÁNKY ↓
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const footerRoot = document.getElementById("siteFooter");
  if (footerRoot) footerRoot.innerHTML = renderFooter();

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

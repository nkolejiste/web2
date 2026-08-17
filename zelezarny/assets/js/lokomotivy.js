import { locomotives } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("locomotiveList");
  const count = document.getElementById("locoCount");
  const buttons = document.querySelectorAll(".filter-button");
  const dialog = document.getElementById("locoDialog");
  const dialogContent = document.getElementById("dialogContent");
  const closeButton = document.getElementById("dialogClose");

  const render = (filter = "all") => {
    const filtered = locomotives.filter(loco => filter === "all" || loco.type === filter);
    count.textContent = filtered.length;

    list.innerHTML = filtered.map(loco => `
      <article class="loco-row reveal" id="${loco.id}">
        <div class="loco-media">
          <img src="${loco.image}" alt="${loco.title}" width="2121" height="1414" loading="lazy">
        </div>
        <div class="loco-copy">
          <p class="loco-type">${loco.typeLabel}</p>
          <h2>${loco.name}</h2>
          <p>${loco.shortDescription}</p>
          <button class="detail-button" data-detail="${loco.id}">Prohlédnout detail ↗</button>
        </div>
      </article>
    `).join("");

    requestAnimationFrame(() => {
      list.querySelectorAll(".reveal").forEach((element, index) => {
        setTimeout(() => element.classList.add("visible"), index * 100);
      });
    });

    list.querySelectorAll("[data-detail]").forEach(button => {
      button.addEventListener("click", () => openDetail(button.dataset.detail));
    });
  };

  const openDetail = id => {
    const loco = locomotives.find(item => item.id === id);
    if (!loco) return;

    const stats = Object.entries(loco.stats).map(([label, value]) => `
      <div class="dialog-stat">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("");

    dialogContent.innerHTML = `
      <div class="dialog-hero">
        <img src="${loco.image}" alt="${loco.title}" width="2121" height="1414">
        <div class="dialog-title">
          <p>${loco.typeLabel.toUpperCase()}</p>
          <h2>${loco.name}</h2>
        </div>
      </div>
      <div class="dialog-body">
        <div class="dialog-stats">${stats}</div>
        <p class="eyebrow">PŘÍBĚH STROJE</p>
        <p class="dialog-description">${loco.description}</p>
      </div>
    `;

    dialog.showModal();
  };

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      render(button.dataset.filter);
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });

  render();

  const hash = window.location.hash.replace("#", "");
  if (hash) {
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 250);
  }
});
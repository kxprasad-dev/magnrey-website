async function includePartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const res = await fetch(url);
  target.innerHTML = await res.text();
}

function markActiveNavLink() {
  const current = document.body.dataset.page;
  if (!current) return;
  document.querySelectorAll(`.nav-list a[data-nav="${current}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });
}

function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  if (!toggle || !navList) return;
  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

async function initLayout() {
  await Promise.all([
    includePartial("site-header", "partials/header.html"),
    includePartial("site-footer", "partials/footer.html"),
  ]);
  markActiveNavLink();
  setupNavToggle();
  setFooterYear();
}

document.addEventListener("DOMContentLoaded", initLayout);

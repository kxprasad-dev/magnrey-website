async function includePartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const res = await fetch(url);
  target.innerHTML = await res.text();
}

function markActiveNavLink() {
  const current = document.body.dataset.page;
  if (!current) return;
  document.querySelectorAll(`.nav__links a[data-nav="${current}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
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
  setFooterYear();
}

document.addEventListener("DOMContentLoaded", initLayout);

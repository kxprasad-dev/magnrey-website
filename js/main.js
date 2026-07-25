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

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(1 + eased * (target - 1));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setupCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
}

async function initLayout() {
  await Promise.all([
    includePartial("site-header", "partials/header.html"),
    includePartial("site-footer", "partials/footer.html"),
  ]);
  markActiveNavLink();
  setFooterYear();
  setupCounters();
}

document.addEventListener("DOMContentLoaded", initLayout);

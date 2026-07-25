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
  if (current.startsWith("services-")) {
    document.querySelector('.nav__links a[data-nav="services"]')?.setAttribute("aria-current", "true");
  }
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav__links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function closeDropdown(item) {
  item.classList.remove("is-open");
  item.querySelector(".nav__dropdown-toggle")?.setAttribute("aria-expanded", "false");
}

function setupDropdowns() {
  const dropdowns = document.querySelectorAll(".nav__item--dropdown");
  if (!dropdowns.length) return;

  dropdowns.forEach((item) => {
    const toggleBtn = item.querySelector(".nav__dropdown-toggle");
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = item.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((item) => {
      if (item.classList.contains("is-open") && !item.contains(event.target)) {
        closeDropdown(item);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    dropdowns.forEach(closeDropdown);
    const links = document.querySelector(".nav__links.is-open");
    if (links) {
      links.classList.remove("is-open");
      const toggle = document.querySelector(".nav-toggle");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
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
    includePartial("site-header", "/partials/header.html"),
    includePartial("site-footer", "/partials/footer.html"),
  ]);
  markActiveNavLink();
  setFooterYear();
  setupNavToggle();
  setupDropdowns();
  setupCounters();
}

document.addEventListener("DOMContentLoaded", initLayout);

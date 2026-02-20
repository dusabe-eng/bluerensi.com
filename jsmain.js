// ============================
// ROUTER (works with .route + data-route)
// ============================
function showRoute(routeId) {
  const routes = document.querySelectorAll(".route");
  routes.forEach(r => r.classList.remove("route-active"));

  const target = document.getElementById(routeId);
  if (target) target.classList.add("route-active");

  // active nav link highlight
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.dataset.route === routeId);
  });

  // close mobile menu if open
  const menu = document.querySelector(".menu");
  if (menu) menu.classList.remove("open");

  // scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRouteFromHash() {
  const hash = (window.location.hash || "#home").replace("#", "");
  return hash || "home";
}

// handle clicks on any link with data-route
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;

  const routeId = link.dataset.route;
  if (!routeId) return;

  e.preventDefault();
  window.location.hash = `#${routeId}`;
  showRoute(routeId);
});

// on load
window.addEventListener("DOMContentLoaded", () => {
  // menu toggle
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
  }

  // initial route
  showRoute(getRouteFromHash());

  // services filter
  initServiceFilter();

  // contact form demo
  initContactForm();

  // mv2 (mission/about/vision click animation)
  initMV2();
});

// handle manual hash change (back/forward)
window.addEventListener("hashchange", () => {
  showRoute(getRouteFromHash());
});

// ============================
// SERVICES FILTER
// ============================
function initServiceFilter() {
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".service-item");

  if (!chips.length || !items.length) return;

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const f = btn.dataset.filter;

      items.forEach(item => {
        const cat = item.dataset.cat;
        const show = (f === "all" || f === cat);
        item.style.display = show ? "" : "none";
      });
    });
  });
}

// ============================
// CONTACT FORM DEMO
// ============================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("sentMsg");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.hidden = false;
    setTimeout(() => (msg.hidden = true), 2500);
    form.reset();
  });
}

// ============================
// MISSION / ABOUT / VISION INTERACTION
// - Clicking changes colors (CSS) + moves (CSS transform)
// ============================
function initMV2() {
  const cards = document.querySelectorAll(".mv2-card");
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
  });
}

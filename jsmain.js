// ================== NAV TOGGLE (MOBILE) ==================
const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

// ================== ROUTING (HASH PAGES) ==================
function setActiveRoute(routeId) {
  // show/hide routes
  document.querySelectorAll(".route").forEach(r => r.classList.remove("route-active"));
  const target = document.getElementById(routeId);
  if (target) target.classList.add("route-active");

  // active menu link
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  document.querySelectorAll(`[data-route="${routeId}"]`).forEach(a => a.classList.add("active"));

  // close menu on mobile
  if (menu) menu.classList.remove("open");

  // scroll top for page routes (keeps home scrolling natural)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRouteFromHash() {
  const h = (window.location.hash || "#home").replace("#", "").trim();
  return h || "home";
}

// Click handling (prevent weird behaviour)
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;

  const route = link.getAttribute("data-route");
  if (!route) return;

  e.preventDefault();
  window.location.hash = `#${route}`;
});

// React on hash change
window.addEventListener("hashchange", () => {
  setActiveRoute(getRouteFromHash());
});

// Start
document.addEventListener("DOMContentLoaded", () => {
  setActiveRoute(getRouteFromHash());

  // ================== SERVICES FILTER ==================
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".service-item");

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const f = chip.getAttribute("data-filter");
      items.forEach(it => {
        const cat = it.getAttribute("data-cat");
        it.style.display = (f === "all" || f === cat) ? "" : "none";
      });
    });
  });

  // ================== CONTACT DEMO ==================
  const form = document.getElementById("contactForm");
  const sent = document.getElementById("sentMsg");
  if (form && sent) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      sent.hidden = false;
      form.reset();
      setTimeout(() => (sent.hidden = true), 2500);
    });
  }
});

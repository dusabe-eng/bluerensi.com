(() => {
  const routes = Array.from(document.querySelectorAll(".route"));
  const navLinks = Array.from(document.querySelectorAll("[data-route]"));
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");

  function showRoute(routeId) {
    routes.forEach(r => r.classList.toggle("route-active", r.id === routeId));

    navLinks.forEach(a => {
      const isActive = a.getAttribute("data-route") === routeId;
      if (a.classList.contains("nav-link")) a.classList.toggle("active", isActive);
    });

    // Close mobile menu after navigation
    if (menu) menu.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function routeFromHash() {
    const id = (location.hash || "#home").replace("#", "");
    const exists = routes.some(r => r.id === id);
    showRoute(exists ? id : "home");
  }

  // Navigation clicks
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("data-route");
      if (!id) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      routeFromHash();
    });
  });

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Contact form demo
  const form = document.getElementById("contactForm");
  const sentMsg = document.getElementById("sentMsg");
  if (form && sentMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sentMsg.hidden = false;
      setTimeout(() => (sentMsg.hidden = true), 2500);
      form.reset();
    });
  }

  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", routeFromHash);

  // Initial load
  routeFromHash();
})();

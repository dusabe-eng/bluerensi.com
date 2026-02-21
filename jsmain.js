(() => {
  const routes = Array.from(document.querySelectorAll(".route"));
  const navLinks = Array.from(document.querySelectorAll("[data-route]"));
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");

  function showRoute(routeId) {
    routes.forEach(r => r.classList.toggle("route-active", r.id === routeId));

    navLinks.forEach(a => {
      const isActive = a.getAttribute("data-route") === routeId;
      a.classList.toggle("active", isActive);
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

  // Handle clicks (prevents weird behavior)
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("data-route");
      if (!id) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      routeFromHash();
    });
  });

  // Mobile menu
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", routeFromHash);

  // Initial load
  routeFromHash();
})();

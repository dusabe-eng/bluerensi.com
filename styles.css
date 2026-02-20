document.addEventListener("DOMContentLoaded", () => {
  const routes = ["home", "services", "projects", "about", "careers", "contact"];

  const menu = document.getElementById("menu");
  const navToggle = document.getElementById("navToggle");

  function normalizeHash() {
    // Supports: #/home, #home, empty hash -> home
    let h = window.location.hash || "#/home";
    h = h.replace("#/", "").replace("#", "").trim();
    if (!routes.includes(h)) h = "home";
    return h;
  }

  function setActiveRoute(route) {
    routes.forEach(r => {
      const el = document.getElementById(`route-${r}`);
      if (!el) return;
      el.classList.toggle("route-active", r === route);
    });

    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === route);
    });

    // close mobile menu
    menu?.classList.remove("open");

    // go top
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  // mobile menu
  navToggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // click routing
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-route]");
    if (!link) return;

    const route = link.dataset.route;
    if (!routes.includes(route)) return;

    // update hash
    window.location.hash = `#/${route}`;
  });

  // hash change
  window.addEventListener("hashchange", () => {
    setActiveRoute(normalizeHash());
  });

  // init route
  setActiveRoute(normalizeHash());
});

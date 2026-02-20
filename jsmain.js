(function () {
  const routes = ["home", "services", "projects", "about", "careers", "contact"];

  const menu = document.getElementById("menu");
  const navToggle = document.getElementById("navToggle");

  function setActiveRoute(route) {
    // 1) Show only one route
    routes.forEach(r => {
      const el = document.getElementById(`route-${r}`);
      if (!el) return;
      el.classList.toggle("route-active", r === route);
    });

    // 2) Update nav active
    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === route);
    });

    // 3) Close mobile menu
    menu?.classList.remove("open");

    // 4) Always go top (NO scrolling to sections)
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function getRouteFromHash() {
    // hash like "#/services"
    const h = window.location.hash || "#/home";
    const route = h.replace("#/", "").trim();
    return routes.includes(route) ? route : "home";
  }

  // Handle navigation clicks (no section scroll)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-route]");
    if (!link) return;

    // allow hash update but control route display ourselves
    const route = link.dataset.route;
    if (!route) return;

    // keep hash consistent
    if (window.location.hash !== `#/${route}`) {
      window.location.hash = `#/${route}`;
    } else {
      setActiveRoute(route);
    }
  });

  // Mobile menu toggle
  navToggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // Listen hash changes
  window.addEventListener("hashchange", () => {
    setActiveRoute(getRouteFromHash());
  });

  // Contact form demo
  const form = document.getElementById("contactForm");
  const sentMsg = document.getElementById("sentMsg");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sentMsg) sentMsg.hidden = false;
    setTimeout(() => { if (sentMsg) sentMsg.hidden = true; }, 2500);
    form.reset();
  });

  // init
  setActiveRoute(getRouteFromHash());
})();

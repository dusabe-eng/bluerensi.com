(() => {
  const routes = Array.from(document.querySelectorAll(".route"));
  const navLinks = Array.from(document.querySelectorAll("[data-route]"));
  const menu = document.querySelector(".menu");
  const navToggle = document.querySelector(".nav-toggle");

  // Mobile menu toggle
  if (navToggle && menu) {
    navToggle.addEventListener("click", () => menu.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      const clickedInside = menu.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInside) menu.classList.remove("open");
    });
  }

  function setActiveRoute(routeId) {
    routes.forEach((r) => r.classList.remove("route-active"));
    const target = document.getElementById(routeId);
    if (target) target.classList.add("route-active");

    navLinks.forEach((a) => a.classList.remove("active"));
    navLinks
      .filter((a) => (a.getAttribute("data-route") || "") === routeId)
      .forEach((a) => a.classList.add("active"));

    // Close mobile menu after navigation
    if (menu) menu.classList.remove("open");

    // Scroll to top when changing route
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function routeFromHash() {
    const hash = (window.location.hash || "#home").replace("#", "");
    const routeId = hash || "home";
    // If hash points to route ids (home/services/projects/about/careers/contact)
    const known = ["home", "services", "projects", "about", "careers", "contact"];
    if (known.includes(routeId)) setActiveRoute(routeId);
  }

  // Handle clicks on any data-route links
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-route]");
    if (!a) return;

    const routeId = a.getAttribute("data-route");
    if (!routeId) return;

    // Only handle our SPA routes
    const known = ["home", "services", "projects", "about", "careers", "contact"];
    if (!known.includes(routeId)) return;

    e.preventDefault();
    window.location.hash = `#${routeId}`;
    setActiveRoute(routeId);
  });

  // Hash change
  window.addEventListener("hashchange", routeFromHash);

  // Init
  routeFromHash();

  // ===== Services filter chips =====
  const chips = Array.from(document.querySelectorAll(".chip"));
  const serviceItems = Array.from(document.querySelectorAll(".service-item"));

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.dataset.filter;
      serviceItems.forEach((item) => {
        const cat = item.dataset.cat;
        const show = filter === "all" || cat === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // ===== Contact form demo =====
  const contactForm = document.getElementById("contactForm");
  const sentMsg = document.getElementById("sentMsg");
  if (contactForm && sentMsg) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sentMsg.hidden = false;
      setTimeout(() => (sentMsg.hidden = true), 2500);
      contactForm.reset();
    });
  }

  // ===== MV2 click/active logic =====
  const mvCards = Array.from(document.querySelectorAll(".mv2-card"));
  const setActiveMV = (key) => {
    mvCards.forEach((c) => c.classList.remove("is-active"));
    const target = mvCards.find((c) => c.dataset.mv === key);
    if (target) target.classList.add("is-active");
  };

  mvCards.forEach((card) => {
    card.addEventListener("click", () => setActiveMV(card.dataset.mv));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveMV(card.dataset.mv);
      }
    });
  });
})();

(() => {
  const routes = Array.from(document.querySelectorAll(".route"));
  const navLinks = Array.from(document.querySelectorAll("[data-route]"));
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("open"));
    // Close menu when clicking a link
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) menu.classList.remove("open");
    });
  }

  function setActiveLink(routeId) {
    navLinks.forEach(a => {
      const isActive = a.getAttribute("data-route") === routeId;
      a.classList.toggle("active", isActive);
    });
  }

  function showRoute(routeId) {
    const exists = routes.some(r => r.id === routeId);
    const finalId = exists ? routeId : "home";

    routes.forEach(r => r.classList.toggle("route-active", r.id === finalId));
    setActiveLink(finalId);
  }

  // Hash routing
  function onHashChange() {
    const hash = (location.hash || "#home").replace("#", "");
    showRoute(hash);
  }
  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  // Services filters
  const chips = Array.from(document.querySelectorAll(".chip[data-filter]"));
  const serviceItems = Array.from(document.querySelectorAll(".service-item[data-cat]"));

  function applyFilter(filter) {
    serviceItems.forEach(item => {
      const cat = item.getAttribute("data-cat");
      const show = (filter === "all" || filter === cat);
      item.style.display = show ? "" : "none";
    });
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.dataset.filter);
    });
  });

  // Contact form demo submit
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
})();

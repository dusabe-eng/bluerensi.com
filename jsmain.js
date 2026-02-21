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

    if (menu) menu.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function routeFromHash() {
    const id = (location.hash || "#home").replace("#", "");
    const exists = routes.some(r => r.id === id);
    showRoute(exists ? id : "home");
  }

  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("data-route");
      if (!id) return;
      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      routeFromHash();
    });
  });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Contact form demo message
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

  // ✅ Partners auto slider (moving + dots + pause on hover)
  const stage = document.getElementById("partnersStage");
  if (stage) {
    const slides = Array.from(stage.querySelectorAll(".partner-slide"));
    const dots = Array.from(stage.querySelectorAll(".dot"));
    let index = 0;
    let timer = null;
    let paused = false;

    const setActive = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === index));
      dots.forEach((d, k) => d.classList.toggle("is-on", k === index));
    };

    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!paused) setActive(index + 1);
      }, 2800);
    };

    // dot clicks
    dots.forEach((d, k) => {
      d.addEventListener("click", () => {
        setActive(k);
      });
    });

    // pause on hover
    stage.addEventListener("mouseenter", () => { paused = true; });
    stage.addEventListener("mouseleave", () => { paused = false; });

    setActive(0);
    start();
  }

  window.addEventListener("popstate", routeFromHash);
  window.addEventListener("hashchange", routeFromHash);

  routeFromHash();
})();

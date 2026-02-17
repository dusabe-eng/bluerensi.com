// jsmain.js (clean - no duplicates)

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Mobile menu toggle ----------
  const menu = $(".menu");
  const toggle = $(".nav-toggle");

  toggle?.addEventListener("click", () => menu?.classList.toggle("open"));

  // Close menu when clicking any nav link (mobile)
  $$(".menu .nav-link").forEach(a => {
    a.addEventListener("click", () => menu?.classList.remove("open"));
  });

  // ---------- Routing ----------
  const routes = $$(".route");

  function showRoute(name) {
    // show the route
    routes.forEach(r => r.classList.toggle("route-active", r.id === name));

    // active nav style
    $$(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === name);
    });

    // close mobile menu
    menu?.classList.remove("open");

    // scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // AFTER route becomes visible, init services features (if services is opened)
    if (name === "services") {
      initServiceFilters();
      initServiceAccordion();
    }
  }

  // click routing for any [data-route]
  $$("[data-route]").forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.route;
      if (!name) return;
      e.preventDefault();
      history.pushState({ route: name }, "", `#${name}`);
      showRoute(name);
    });
  });

  // back/forward
  window.addEventListener("popstate", () => {
    const hash = (location.hash || "#home").replace("#", "").trim();
    showRoute(document.getElementById(hash) ? hash : "home");
  });

  // initial route
  const start = (location.hash || "#home").replace("#", "").trim();
  showRoute(document.getElementById(start) ? start : "home");

  // ---------- Services: Filter chips ----------
  function initServiceFilters() {
    const chips = $$(".chip");
    const items = $$(".service-item");
    if (!chips.length || !items.length) return;

    // prevent double-binding if user opens services multiple times
    chips.forEach(btn => {
      if (btn.dataset.bound === "1") return;
      btn.dataset.bound = "1";

      btn.addEventListener("click", () => {
        chips.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const f = btn.dataset.filter || "all";
        items.forEach(it => {
          const cat = it.dataset.cat || "";
          it.style.display = (f === "all" || f === cat) ? "" : "none";
        });
      });
    });
  }

  // ---------- Services: Accordion (only one open) ----------
  function initServiceAccordion() {
    const detailsList = $$(".service-details");
    if (!detailsList.length) return;

    detailsList.forEach(d => {
      if (d.dataset.bound === "1") return;
      d.dataset.bound = "1";

      d.addEventListener("toggle", () => {
        if (!d.open) return;
        detailsList.forEach(other => {
          if (other !== d) other.open = false;
        });
      });
    });
  }

  // ---------- Contact form demo ----------
  const form = $("#contactForm");
  const msg = $("#sentMsg");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (msg) msg.hidden = false;
    form.reset();
    setTimeout(() => { if (msg) msg.hidden = true; }, 2500);
  });
});

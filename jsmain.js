document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll("[data-route]");
  const routes = document.querySelectorAll(".route");

  // mobile menu
  toggle?.addEventListener("click", () => menu.classList.toggle("open"));

  function showRoute(name){
    // show only one "page"
    routes.forEach(r => r.classList.toggle("route-active", r.id === name));

    // active link styling
    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === name);
    });

    // close mobile menu
    menu.classList.remove("open");

    // scroll top after changing
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // click routing
  navLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.route;
      if (!name) return;

      e.preventDefault();
      history.pushState({ route: name }, "", `#${name}`);
      showRoute(name);
    });
  });

  // browser back/forward support
  window.addEventListener("popstate", () => {
    const hash = (location.hash || "#home").replace("#", "");
    showRoute(hash);
  });

  // initial route
  const start = (location.hash || "#home").replace("#", "");
  showRoute(start);

  // contact demo
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("sentMsg");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.hidden = false;
    form.reset();
    setTimeout(() => (msg.hidden = true), 2500);
  });
});

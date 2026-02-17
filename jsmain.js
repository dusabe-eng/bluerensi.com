document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  const routeLinks = document.querySelectorAll("[data-route]");
  const routes = document.querySelectorAll(".route");

  toggle?.addEventListener("click", () => menu.classList.toggle("open"));

  function showRoute(name){
    routes.forEach(r => r.classList.toggle("route-active", r.id === name));
    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === name);
    });
    menu.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  routeLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.route;
      if (!name) return;
      e.preventDefault();
      history.pushState({ route: name }, "", `#${name}`);
      showRoute(name);
    });
  });

  window.addEventListener("popstate", () => {
    const hash = (location.hash || "#home").replace("#", "");
    showRoute(hash);
  });

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

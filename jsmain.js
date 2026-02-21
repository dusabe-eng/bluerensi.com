(() => {
  const navLinks = Array.from(document.querySelectorAll(".nav-link, .nav-cta, [data-route]"));
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");

  // Mobile menu toggle
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle nav clicks
  navLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("data-route") || (a.getAttribute("href") || "").replace("#", "");
      if (!id) return;

      // for normal links not targeting sections, ignore
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      scrollToId(id);

      // close mobile menu
      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active link highlight while scrolling
  const sections = ["home", "services", "projects", "about", "careers", "contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    document.querySelectorAll(".nav-link").forEach(l => {
      l.classList.toggle("active", l.getAttribute("data-route") === id);
    });
  };

  const onScroll = () => {
    const y = window.scrollY + 160; // offset for header
    let current = "home";

    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec.id;
    }
    setActive(current);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // On load: if hash exists, scroll to it
  window.addEventListener("load", () => {
    const id = (location.hash || "#home").replace("#", "");
    setTimeout(() => scrollToId(id), 50);
    onScroll();
  });

  window.addEventListener("popstate", () => {
    const id = (location.hash || "#home").replace("#", "");
    scrollToId(id);
  });

  // Contact form demo message (optional)
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

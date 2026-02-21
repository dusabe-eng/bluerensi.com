(() => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".menu");

  // Mobile menu
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu after clicking a link (mobile)
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active link highlight (based on scroll position)
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = ["home","services","projects","about","careers","contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    links.forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === `#${id}`);
    });
  }

  const obs = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(en => en.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible?.target?.id) setActive(visible.target.id);
  }, { root: null, threshold: [0.2, 0.35, 0.5, 0.7] });

  sections.forEach(sec => obs.observe(sec));

  // If page opens with a hash
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
})();

(function () {
  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close menu on link click (mobile)
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // MV cards active click
  document.querySelectorAll(".mv2-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".mv2-card").forEach((c) => c.classList.remove("is-active"));
      card.classList.add("is-active");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Smooth scroll + active menu highlight
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function setActiveById(id) {
    links.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === "#" + id);
    });
  }

  // highlight while scrolling
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((x) => x.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && visible.target && visible.target.id) {
        setActiveById(visible.target.id);
      }
    },
    { root: null, threshold: [0.35, 0.5, 0.65] }
  );

  sections.forEach((sec) => io.observe(sec));

  // If user loads with a hash, scroll to it (after layout settles)
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  }
})();

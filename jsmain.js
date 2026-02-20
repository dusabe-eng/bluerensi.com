(function () {
  const menu = document.getElementById("menu");
  const navToggle = document.getElementById("navToggle");
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const header = document.getElementById("siteHeader");

  // Mobile menu toggle
  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Close menu on link click (mobile)
  links.forEach((a) => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        navToggle && navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Active link highlighting while scrolling
  const sectionIds = ["home", "services", "projects", "about", "careers", "contact"];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActiveById(id) {
    links.forEach((a) => {
      const isActive = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", isActive);
    });
  }

  const obs = new IntersectionObserver(
    (entries) => {
      // pick the most visible entry
      let best = null;
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
      if (best) setActiveById(best.target.id);
    },
    {
      root: null,
      threshold: [0.25, 0.4, 0.55, 0.7],
      // account for fixed topbar+header
      rootMargin: "-120px 0px -60% 0px",
    }
  );

  sections.forEach((s) => obs.observe(s));

  // If the page loads with a hash, scroll correctly (fixed header safe)
  function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.addEventListener("load", () => {
    // default active = home
    setActiveById("home");
    // hash scroll
    scrollToHash();
  });

  window.addEventListener("hashchange", scrollToHash);

  // Fake contact form success (no backend)
  const form = document.getElementById("contactForm");
  const sentMsg = document.getElementById("sentMsg");
  if (form && sentMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sentMsg.hidden = false;
      form.reset();
      setTimeout(() => (sentMsg.hidden = true), 3500);
    });
  }
})();

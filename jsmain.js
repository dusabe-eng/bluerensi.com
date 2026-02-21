(() => {
  const headerOffset = 120;

  // Mobile menu
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", menu.classList.contains("open") ? "true" : "false");
    });
  }

  // Smooth scroll
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Click nav + buttons with data-route
  const clickable = Array.from(document.querySelectorAll(".nav-link, a[data-route], .btn[data-route]"));
  clickable.forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("data-route") || (link.getAttribute("href") || "").replace("#", "");
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", `#${id}`);
      scrollToSection(id);

      if (menu) menu.classList.remove("open");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active nav while scrolling
  const sectionIds = ["home","services","projects","about","careers","contact"];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function setActiveNav(id) {
    document.querySelectorAll(".nav-link").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("data-route") === id);
    });
  }

  function onScroll() {
    const y = window.scrollY + headerOffset + 30;
    let current = "home";
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec.id;
    }
    setActiveNav(current);
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  window.addEventListener("load", () => {
    const id = (location.hash || "#home").replace("#", "");
    if (document.getElementById(id)) setTimeout(() => scrollToSection(id), 50);
    onScroll();
  });

  window.addEventListener("popstate", () => {
    const id = (location.hash || "#home").replace("#", "");
    scrollToSection(id);
  });

  // Services filter
  const chips = Array.from(document.querySelectorAll(".chip"));
  const items = Array.from(document.querySelectorAll(".service-item"));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      items.forEach(it => {
        const cat = it.dataset.cat;
        it.style.display = (f === "all" || cat === f) ? "" : "none";
      });
    });
  });

  // Contact form demo
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

  // Partners slider
  const shell = document.getElementById("bpShell");
  if (shell) {
    const slides = Array.from(shell.querySelectorAll(".bp-slide"));
    const dots = Array.from(shell.querySelectorAll(".bp-dot"));
    const prev = shell.querySelector(".bp-prev");
    const next = shell.querySelector(".bp-next");

    let i = 0;
    let timer = null;
    let paused = false;
    let dir = "left";

    const clearEnter = (s) => s.classList.remove("enter-left","enter-right");

    const show = (idx) => {
      i = (idx + slides.length) % slides.length;

      slides.forEach((s, k) => {
        s.classList.remove("is-active");
        clearEnter(s);
        if (k === i) {
          dir = dir === "left" ? "right" : "left";
          s.classList.add(dir === "left" ? "enter-left" : "enter-right");
          void s.offsetWidth;
          s.classList.add("is-active");
        }
      });

      dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
    };

    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!paused) show(i + 1);
      }, 3000);
    };

    next?.addEventListener("click", () => show(i + 1));
    prev?.addEventListener("click", () => show(i - 1));
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));

    shell.addEventListener("mouseenter", () => paused = true);
    shell.addEventListener("mouseleave", () => paused = false);

    slides[0]?.classList.add("is-active");
    start();
  }
})();

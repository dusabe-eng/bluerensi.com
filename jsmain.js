(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // --------- Mobile menu ----------
  const menu = $(".menu");
  const toggle = $(".nav-toggle");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close menu on link click (mobile)
    $$(".menu a").forEach(a => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --------- Route switching (hash router) ----------
  const routes = $$(".route");
  const navLinks = $$("[data-route]");

  function setActiveRoute(routeId) {
    const id = routeId || "home";

    routes.forEach(r => r.classList.remove("route-active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("route-active");
    else $("#home")?.classList.add("route-active");

    // active pill in nav
    $$(".nav-link").forEach(a => a.classList.remove("active"));
    $$(".nav-link").forEach(a => {
      if (a.getAttribute("data-route") === id) a.classList.add("active");
    });

    // scroll to top when switching pages (except home)
    if (id !== "home") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getHashRoute() {
    const h = (location.hash || "#home").replace("#", "").trim();
    return h || "home";
  }

  window.addEventListener("hashchange", () => setActiveRoute(getHashRoute()));
  window.addEventListener("load", () => setActiveRoute(getHashRoute()));

  // also handle clicks on elements with data-route (buttons)
  navLinks.forEach(el => {
    el.addEventListener("click", (e) => {
      const route = el.getAttribute("data-route");
      if (!route) return;
      // allow normal anchor change, but ensure our handler runs
      // (no preventDefault needed)
    });
  });

  // --------- MV2 click active ----------
  const mvCards = $$(".mv2-card");
  if (mvCards.length) {
    mvCards.forEach(card => {
      card.addEventListener("click", () => {
        mvCards.forEach(c => c.classList.remove("is-active"));
        card.classList.add("is-active");
      });
    });
  }

  // --------- Services filter ----------
  const chips = $$(".chip");
  const serviceItems = $$(".service-item");

  function applyFilter(filter) {
    chips.forEach(c => c.classList.toggle("active", c.dataset.filter === filter));
    serviceItems.forEach(it => {
      const cat = it.dataset.cat;
      const show = filter === "all" || cat === filter;
      it.style.display = show ? "" : "none";
    });
  }

  if (chips.length && serviceItems.length) {
    chips.forEach(chip => {
      chip.addEventListener("click", () => applyFilter(chip.dataset.filter || "all"));
    });
  }

  // --------- Partners slider (autoplay + dots + buttons + swipe) ----------
  const track = $(".partners-track");
  const viewport = $(".partners-viewport");
  const prevBtn = $(".pprev");
  const nextBtn = $(".pnext");
  const dotsWrap = $(".pdots");

  if (track && viewport && dotsWrap) {
    const slides = $$(".partner-card", track);
    let index = 0;
    let timer = null;
    const AUTOPLAY_MS = 4500;

    // build dots
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "pdot" + (i === 0 ? " active" : "");
      b.type = "button";
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(b);
    });

    const dots = $$(".pdot", dotsWrap);

    function update() {
      track.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    function goTo(i, userAction = false) {
      index = (i + slides.length) % slides.length;
      update();
      if (userAction) restartAutoplay();
    }

    function next(userAction = false) { goTo(index + 1, userAction); }
    function prev(userAction = false) { goTo(index - 1, userAction); }

    prevBtn?.addEventListener("click", () => prev(true));
    nextBtn?.addEventListener("click", () => next(true));

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(() => next(false), AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // pause on hover/focus (desktop)
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);
    viewport.addEventListener("focusin", stopAutoplay);
    viewport.addEventListener("focusout", startAutoplay);

    // swipe (mobile)
    let startX = 0;
    let dx = 0;
    let touching = false;

    viewport.addEventListener("touchstart", (e) => {
      touching = true;
      startX = e.touches[0].clientX;
      dx = 0;
      stopAutoplay();
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (!touching) return;
      dx = e.touches[0].clientX - startX;
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      touching = false;
      if (Math.abs(dx) > 40) {
        dx < 0 ? next(true) : prev(true);
      } else {
        startAutoplay();
      }
    });

    // start
    update();
    startAutoplay();
  }

  // --------- Contact form demo ----------
  const form = $("#contactForm");
  const sentMsg = $("#sentMsg");
  if (form && sentMsg) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      sentMsg.hidden = false;
      setTimeout(() => (sentMsg.hidden = true), 2500);
      form.reset();
    });
  }
})();

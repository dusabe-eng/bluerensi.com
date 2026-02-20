/* =========================
   NAV ROUTER + MENU
========================= */
const routes = Array.from(document.querySelectorAll(".route"));
const navLinks = Array.from(document.querySelectorAll("[data-route]"));
const menu = document.querySelector(".menu");
const navToggle = document.querySelector(".nav-toggle");

function setActiveRoute(routeId) {
  routes.forEach(r => r.classList.toggle("route-active", r.id === routeId));
  navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("data-route") === routeId));
  if (menu) menu.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRouteFromHash() {
  const hash = (window.location.hash || "#home").replace("#", "");
  const exists = routes.some(r => r.id === hash);
  return exists ? hash : "home";
}

window.addEventListener("hashchange", () => {
  setActiveRoute(getRouteFromHash());
});

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const routeId = link.getAttribute("data-route");
    if (!routeId) return;
    e.preventDefault();
    window.location.hash = routeId;
  });
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

/* init */
setActiveRoute(getRouteFromHash());

/* =========================
   SERVICES FILTER
========================= */
const chips = Array.from(document.querySelectorAll(".chip"));
const serviceItems = Array.from(document.querySelectorAll(".service-item"));

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;
    serviceItems.forEach(item => {
      const cat = item.dataset.cat;
      item.style.display = (filter === "all" || filter === cat) ? "" : "none";
    });
  });
});

/* =========================
   CONTACT FORM DEMO
========================= */
const contactForm = document.getElementById("contactForm");
const sentMsg = document.getElementById("sentMsg");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sentMsg) {
      sentMsg.hidden = false;
      setTimeout(() => (sentMsg.hidden = true), 2500);
    }
    contactForm.reset();
  });
}

/* =========================
   MV2 (Mission/About/Vision)
   - hover mission/vision changes center
   - click keeps active + moves
========================= */
const mvRow = document.getElementById("mv2Row");
const mvCards = Array.from(document.querySelectorAll(".mv2-card"));

function clearMvHover() {
  if (!mvRow) return;
  mvRow.classList.remove("hover-mission", "hover-vision");
}

mvCards.forEach(card => {
  const key = card.dataset.mv;

  // Hover behavior
  card.addEventListener("mouseenter", () => {
    clearMvHover();
    if (!mvRow) return;
    if (key === "mission") mvRow.classList.add("hover-mission");
    if (key === "vision") mvRow.classList.add("hover-vision");
  });

  card.addEventListener("mouseleave", () => {
    clearMvHover();
  });

  // Click behavior (active)
  card.addEventListener("click", () => {
    mvCards.forEach(c => c.classList.remove("is-active"));
    card.classList.add("is-active");
  });

  // Keyboard (Enter)
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") card.click();
  });
});

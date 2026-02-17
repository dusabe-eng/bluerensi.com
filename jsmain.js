/* ===============================
   BLUERENSI - Single Page Router
   Shows ONE section at a time
   =============================== */

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("open");
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function getSectionIds() {
  // All sections you want to route between
  return Array.from(document.querySelectorAll(".page-section"))
    .map((s) => s.id)
    .filter(Boolean);
}

function setActiveLink(id) {
  document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="#${id}"]`);
  if (active) active.classList.add("active");
}

function showOnlySection(id) {
  const sections = document.querySelectorAll(".page-section");
  const validIds = new Set(getSectionIds());

  // Fallback to home if invalid
  const targetId = validIds.has(id) ? id : "home";

  sections.forEach((sec) => {
    sec.hidden = sec.id !== targetId;
  });

  setActiveLink(targetId);

  // Close menu (mobile)
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");

  // Always start at top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function route() {
  const hash = window.location.hash || "#home";
  const id = hash.replace("#", "").trim() || "home";
  showOnlySection(id);
}

function enableAccordion(selector) {
  const all = document.querySelectorAll(selector);
  if (!all.length) return;

  all.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      all.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

function interceptSameHashClicks() {
  // If user clicks the same link again (#contact while already on #contact),
  // hashchange won't fire. This forces routing anyway.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const id = href.replace("#", "").trim() || "home";

    // If link points to a section, handle it
    if (document.getElementById(id)) {
      e.preventDefault();
      if (window.location.hash !== href) {
        window.location.hash = href; // triggers hashchange -> route
      } else {
        // same hash; force route
        showOnlySection(id);
      }
    }
  });
}

window.addEventListener("hashchange", route);

window.addEventListener("DOMContentLoaded", () => {
  setYear();

  // Ensure initial view is correct
  route();

  // Services accordion (only one open at a time)
  enableAccordion("details.service-item");

  // Optional: projects/team accordion if you want only one open
  // enableAccordion("details.project-item");
  // enableAccordion("details.team-item");

  // Fix same-hash click behavior
  interceptSameHashClicks();
});

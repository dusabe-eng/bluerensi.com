/* ===============================
   BLUERENSI - One Section Router
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

function getValidSectionIds() {
  return new Set(
    Array.from(document.querySelectorAll(".page-section"))
      .map((s) => s.id)
      .filter(Boolean)
  );
}

function setActiveLink(id) {
  document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="#${id}"]`);
  if (active) active.classList.add("active");
}

function showOnlySection(id) {
  const sections = document.querySelectorAll(".page-section");
  const valid = getValidSectionIds();

  const targetId = valid.has(id) ? id : "home";

  sections.forEach((sec) => {
    sec.hidden = sec.id !== targetId;
  });

  setActiveLink(targetId);

  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");

  window.scrollTo({ top: 0, behavior: "auto" });
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
  // If user clicks the same link again, hashchange may not fire.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const href = a.getAttribute("href");
    if (!href || href === "#") return;

    const id = href.replace("#", "").trim() || "home";
    if (!document.getElementById(id)) return;

    e.preventDefault();

    if (window.location.hash !== href) {
      window.location.hash = href; // triggers route via hashchange
    } else {
      showOnlySection(id); // same hash, force it
    }
  });
}

window.addEventListener("hashchange", route);

window.addEventListener("DOMContentLoaded", () => {
  setYear();

  // Default hash
  if (!window.location.hash) window.location.hash = "#home";

  route();

  // Only one service open at a time
  enableAccordion("details.service-item");

  interceptSameHashClicks();
});

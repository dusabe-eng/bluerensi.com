// =========================
// Footer year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================
// Mobile menu
// =========================
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("open");
}

// =========================
// TAB NAVIGATION (show only ONE section)
// =========================
const sections = Array.from(document.querySelectorAll(".page-section"));
const menuLinks = Array.from(document.querySelectorAll('#menu a[href^="#"]'));

function setActiveLink(hash) {
  menuLinks.forEach((a) => a.classList.remove("active"));
  const active = menuLinks.find((a) => a.getAttribute("href") === hash);
  if (active) active.classList.add("active");
}

function showSectionByHash(hash) {
  if (!hash || hash === "#") hash = "#home";

  const rawId = hash.replace("#", "");
  const showId = rawId === "about-team" ? "about" : rawId;

  // if the section doesn't exist, fallback to home
  const exists = sections.some((s) => s.id === showId);
  const finalId = exists ? showId : "home";

  sections.forEach((sec) => {
    sec.hidden = sec.id !== finalId;
  });

  setActiveLink(rawId === "about-team" ? "#about" : `#${finalId}`);

  // close mobile menu
  document.getElementById("menu")?.classList.remove("open");

  // go top when switching "pages"
  window.scrollTo({ top: 0, behavior: "auto" });

  // special case: jump to about-team inside About
  if (rawId === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// Click handling (IMPORTANT)
function onNavClick(e) {
  const a = e.currentTarget;
  const hash = a.getAttribute("href");
  if (!hash || !hash.startsWith("#")) return;

  e.preventDefault(); // prevent browser trying to scroll to a hidden section
  history.pushState(null, "", hash);
  showSectionByHash(hash);
}

// Attach click events to top menu links
menuLinks.forEach((a) => a.addEventListener("click", onNavClick));

// Also attach to footer links + brand + button (optional but nice)
document
  .querySelectorAll('.footer-links a[href^="#"], a.brand[href^="#"], a.btn[href^="#"]')
  .forEach((a) => a.addEventListener("click", onNavClick));

// Back/Forward button support
window.addEventListener("popstate", () => showSectionByHash(location.hash));

// Initial load (supports direct /#services)
document.addEventListener("DOMContentLoaded", () => showSectionByHash(location.hash));

// =========================
// Services reveal on scroll
// =========================
(function initServicesReveal() {
  const cards = document.querySelectorAll("#services .card");
  if (!cards.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach((card) => io.observe(card));
})();

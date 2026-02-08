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
const navLinks = Array.from(document.querySelectorAll("#menu .nav-link"));

function setActiveLink(hash) {
  navLinks.forEach((a) => a.classList.remove("active"));
  const active = navLinks.find((a) => a.getAttribute("href") === hash);
  if (active) active.classList.add("active");
}

function showSectionByHash(hash) {
  if (!hash || hash === "#") hash = "#home";
  const id = hash.replace("#", "");

  // Special case: if URL is #about-team, show About page first
  const showId = id === "about-team" ? "about" : id;

  // If section doesn't exist, fallback to home
  const exists = sections.some((s) => s.id === showId);
  const finalId = exists ? showId : "home";

  sections.forEach((sec) => {
    sec.hidden = sec.id !== finalId;
  });

  setActiveLink(finalId === "home" ? "#home" : `#${finalId}`);

  // Close mobile menu
  document.getElementById("menu")?.classList.remove("open");

  // Go top when switching "pages"
  window.scrollTo({ top: 0, behavior: "auto" });

  // If #about-team, scroll inside About section after showing it
  if (id === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }
}

// Run on load + when hash changes
window.addEventListener("hashchange", () => showSectionByHash(location.hash));
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

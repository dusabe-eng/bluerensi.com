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

// Close menu when clicking a link (mobile UX)
document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("menu")?.classList.remove("open");
  });
});

// =========================
// TAB NAVIGATION (show only ONE section)
// =========================
const sections = Array.from(document.querySelectorAll(".page-section"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setActiveLink(hash) {
  navLinks.forEach((a) => a.classList.remove("active"));
  const active = navLinks.find((a) => a.getAttribute("href") === hash);
  if (active) active.classList.add("active");
}

function showSectionByHash(hash) {
  if (!hash || hash === "#") hash = "#home";
  const id = hash.replace("#", "");

  // If URL is #about-team, show About page first
  const showId = id === "about-team" ? "about" : id;

  // Show only the selected section
  sections.forEach((sec) => {
    sec.hidden = sec.id !== showId;
  });

  // Active menu highlight
  setActiveLink(id === "about-team" ? "#about" : hash);

  // Close mobile menu
  document.getElementById("menu")?.classList.remove("open");

  // Go to top when switching main tabs
  window.scrollTo({ top: 0, behavior: "auto" });

  // If user requested #about-team, scroll into it inside About page
  if (id === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }
}

window.addEventListener("hashchange", () => showSectionByHash(location.hash));
document.addEventListener("DOMContentLoaded", () => showSectionByHash(location.hash));

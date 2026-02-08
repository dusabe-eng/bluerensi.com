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

// IMPORTANT: your links do NOT have ".nav-link" class
// so we select links that should switch pages:
const tabLinks = Array.from(
  document.querySelectorAll('#menu a[href^="#"], .footer-links a[href^="#"], a.brand[href^="#"], a.btn[href^="#"]')
);

function setActiveLink(hash) {
  // highlight only the top menu links (not footer)
  const menuLinks = Array.from(document.querySelectorAll('#menu a[href^="#"]'));
  menuLinks.forEach((a) => a.classList.remove("active"));

  const active = menuLinks.find((a) => a.getAttribute("href") === hash);
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

  // Jump to top when switching tabs
  window.scrollTo({ top: 0, behavior: "auto" });

  // If user requested #about-team, scroll to it inside About page
  if (id === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// When user clicks links, let hash change happen then render correct section
tabLinks.forEach((a) => {
  a.addEventListener("click", () => {
    // hashchange event will handle it
  });
});

// Handle back/forward + direct URL load like /#contact
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

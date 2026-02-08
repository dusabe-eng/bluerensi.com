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

  // if URL is #about-team, show About page first
  const showId = id === "about-team" ? "about" : id;

  sections.forEach((sec) => {
    sec.hidden = sec.id !== showId;
  });

  setActiveLink(id === "about-team" ? "#about" : hash);

  // close mobile menu
  document.getElementById("menu")?.classList.remove("open");

  // go to top for tab changes
  window.scrollTo({ top: 0, behavior: "auto" });

  // if about-team, scroll inside About page after it becomes visible
  if (id === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

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

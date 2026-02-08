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
// TAB NAVIGATION (HOME ONLY shows hero)
// =========================
const sections = Array.from(document.querySelectorAll(".page-section"));
const navLinks = Array.from(document.querySelectorAll(".nav-link"));

function setActiveLink(hash) {
  navLinks.forEach((a) => a.classList.remove("active"));
  const active = navLinks.find((a) => a.getAttribute("href") === hash);
  if (active) active.classList.add("active");
}

function showSectionByHash(hash) {
  // default
  if (!hash || hash === "#") hash = "#home";

  // If user goes to #about-team, we must show About page first
  let targetSectionId = hash.replace("#", "");
  let sectionToShow = targetSectionId;

  if (targetSectionId === "about-team") {
    sectionToShow = "about";
  }

  // Show only one page-section
  sections.forEach((sec) => {
    const isActive = sec.id === sectionToShow;
    sec.hidden = !isActive;
  });

  // Update active tab (Home/Services/About/Contact)
  // #about-team should highlight About
  const activeHash = targetSectionId === "about-team" ? "#about" : hash;
  setActiveLink(activeHash);

  // Scroll to top of the page section
  window.scrollTo({ top: 0, behavior: "smooth" });

  // If #about-team, after showing About, scroll to team section inside it
  if (targetSectionId === "about-team") {
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  // Close mobile menu
  document.getElementById("menu")?.classList.remove("open");
}

// Run on first load + back/forward navigation
window.addEventListener("hashchange", () => showSectionByHash(location.hash));
document.addEventListener("DOMContentLoaded", () => showSectionByHash(location.hash));

// =========================
// Services reveal on scroll (works when Services page is opened)
// =========================
function initServicesReveal() {
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
}
initServicesReveal();

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
window.toggleMenu = toggleMenu;

// Close menu when clicking a link (mobile UX)
document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("menu")?.classList.remove("open");
  });
});

// =========================
// SPA-style section switching
// =========================
const SECTION_IDS = ["home", "services", "about", "contact"];

function setActiveNav(targetId) {
  document.querySelectorAll('.menu a[href^="#"]').forEach((a) => {
    const id = a.getAttribute("href").replace("#", "");
    a.classList.toggle("active", id === targetId);
  });
}

function showSection(targetId) {
  const id = SECTION_IDS.includes(targetId) ? targetId : "home";

  // Hide all main sections
  document.querySelectorAll(".page-section").forEach((sec) => {
    sec.classList.remove("active");
    sec.hidden = true;
  });

  // Show target section
  const target = document.getElementById(id);
  if (target) {
    target.hidden = false;
    target.classList.add("active");
  }

  // Update nav state + URL hash
  setActiveNav(id);
  history.replaceState(null, "", `#${id}`);

  // Close mobile menu
  document.getElementById("menu")?.classList.remove("open");

  // Always go to top (since we are "switching pages")
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  // Trigger services reveal animation when Services opens
  if (id === "services") {
    const cards = document.querySelectorAll("#services .card");
    cards.forEach((c, i) => {
      c.classList.remove("in-view");
      setTimeout(() => c.classList.add("in-view"), 60 + i * 60);
    });
  }
}

// Intercept clicks on ANY link that points to #home/#services/#about/#contact
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href").slice(1);

  // If it targets our main sections, switch instead of scrolling
  if (SECTION_IDS.includes(targetId)) {
    e.preventDefault();
    showSection(targetId);
  }

  // If it targets #about-team, we switch to About page (team is inside About)
  if (targetId === "about-team") {
    e.preventDefault();
    showSection("about");
    // optional: open team area by scrolling inside About
    const team = document.getElementById("about-team");
    team?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

// On first load: open section from URL hash if valid
window.addEventListener("DOMContentLoaded", () => {
  const hash = (location.hash || "#home").replace("#", "");
  showSection(hash);
});

// =========================
// ESC closes menu
// =========================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("menu")?.classList.remove("open");
  }
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".page-section");
  sections.forEach(sec => {
    if (sec.id === sectionId) {
      sec.hidden = false;
      sec.classList.add("is-active");
    } else {
      sec.hidden = true;
      sec.classList.remove("is-active");
    }
  });

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-section") === sectionId);
  });

  // Close mobile menu after click
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
}

function getSectionFromHash() {
  const hash = (window.location.hash || "#home").replace("#", "");
  const exists = document.getElementById(hash);
  return exists ? hash : "home";
}

// Handle clicks (nav + buttons with data-section)
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("data-section") || link.getAttribute("href").replace("#", "");
  if (!document.getElementById(targetId)) return;

  e.preventDefault();
  history.pushState(null, "", `#${targetId}`);
  showSection(targetId);
});

// Back/forward + manual hash changes
window.addEventListener("hashchange", () => {
  showSection(getSectionFromHash());
});

// Init
document.addEventListener("DOMContentLoaded", () => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Show correct section on load (supports direct link like /#services)
  showSection(getSectionFromHash());
});

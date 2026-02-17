function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("open");
}

function showSectionFromHash() {
  const hash = window.location.hash || "#home";
  const id = hash.replace("#", "");

  // Hide all sections
  document.querySelectorAll(".page-section").forEach((s) => (s.hidden = true));

  // Show target (fallback to home)
  const target = document.getElementById(id) || document.getElementById("home");
  if (target) target.hidden = false;

  // Active nav link
  document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="#${id}"]`);
  if (active) active.classList.add("active");

  // Close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");

  // Optional: jump to top so you don't land in a blank scroll area
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// Run on load + on hash change
window.addEventListener("hashchange", showSectionFromHash);
window.addEventListener("DOMContentLoaded", () => {
  setYear();
  showSectionFromHash();

  // ===== Services dropdown (accordion) =====
  const serviceDetails = document.querySelectorAll("details.service-item");
  serviceDetails.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        serviceDetails.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
});

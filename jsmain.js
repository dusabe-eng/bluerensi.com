function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("open");
}

function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

function setActiveLink(hash) {
  document.querySelectorAll(".nav-link").forEach((a) => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="${hash}"]`);
  if (active) active.classList.add("active");
}

function scrollToHash() {
  const hash = window.location.hash || "#home";
  const id = hash.replace("#", "");
  const target = document.getElementById(id);

  // Close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");

  setActiveLink(hash);

  // Smooth scroll to section
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

window.addEventListener("hashchange", scrollToHash);

window.addEventListener("DOMContentLoaded", () => {
  setYear();
  scrollToHash();

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

// Mobile menu
function toggleMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;
  menu.classList.toggle("open");
}

// Simple SPA navigation: show only the section in the hash
function showSectionFromHash(){
  const hash = window.location.hash || "#home";
  const sections = document.querySelectorAll(".page-section");
  sections.forEach(s => s.hidden = true);

  const target = document.querySelector(hash);
  if(target) target.hidden = false;

  // Active link highlight
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="${hash}"]`);
  if(active) active.classList.add("active");

  // Close menu on mobile after click
  const menu = document.getElementById("menu");
  if(menu) menu.classList.remove("open");
}

// Year
function setYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
}

// Run
window.addEventListener("hashchange", showSectionFromHash);
window.addEventListener("DOMContentLoaded", () => {
  setYear();
  showSectionFromHash();
});

function toggleMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;
  menu.classList.toggle("open");
}

function showSectionFromHash(){
  const hash = window.location.hash || "#home";
  document.querySelectorAll(".page-section").forEach(s => s.hidden = true);

  const target = document.querySelector(hash);
  if(target) target.hidden = false;

  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="${hash}"]`);
  if(active) active.classList.add("active");

  const menu = document.getElementById("menu");
  if(menu) menu.classList.remove("open");
}

function setYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
}

window.addEventListener("hashchange", showSectionFromHash);
window.addEventListener("DOMContentLoaded", () => {
  setYear();
  showSectionFromHash();
});

// ===== Services dropdown (accordion) =====
document.addEventListener("DOMContentLoaded", () => {
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

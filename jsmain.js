function toggleMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;
  menu.classList.toggle("open");
}

function setYear(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
}

function showSectionFromHash(){
  const hash = window.location.hash || "#home";

  // hide all "pages"
  document.querySelectorAll(".page-section").forEach(s => s.hidden = true);

  // show selected
  const target = document.querySelector(hash) || document.querySelector("#home");
  if(target) target.hidden = false;

  // set active menu item
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  const active = document.querySelector(`.nav-link[href="${hash}"]`);
  if(active) active.classList.add("active");

  // close mobile menu
  const menu = document.getElementById("menu");
  if(menu) menu.classList.remove("open");

  // jump to top (prevents "mixed" view)
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

window.addEventListener("hashchange", showSectionFromHash);

window.addEventListener("DOMContentLoaded", () => {
  setYear();
  showSectionFromHash();

  // Services accordion: only one open at a time
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

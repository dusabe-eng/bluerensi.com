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

// Count-up animation (runs when stats section appears)
function initCounters(){
  const stats = document.querySelector(".stats-moving");
  const nums = document.querySelectorAll(".count");
  if(!stats || nums.length === 0) return;

  let done = false;

  const animate = (el) => {
    const target = Number(el.dataset.target || 0);
    const plus = el.dataset.plus === "1";
    const duration = 1200;
    const start = performance.now();

    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const val = Math.floor(p * target);
      el.textContent = val + (plus ? "+" : "");
      if(p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver((entries) => {
    if(done) return;
    if(entries[0].isIntersecting){
      done = true;
      nums.forEach(animate);
      obs.disconnect();
    }
  }, { threshold: 0.35 });

  obs.observe(stats);
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
  initCounters();
});

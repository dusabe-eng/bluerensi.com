/* =========================================================
   BLUERENSI — JS
   - Mobile menu toggle
   - Active nav link on scroll
   - Smooth close menu on click
   - Contact form: shows message (no backend)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  toggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // Close menu when clicking a link (mobile)
  links.forEach(a => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });

  // Active section highlight
  const sectionIds = ["home","services","projects","about","contact"];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = () => {
    let current = "home";
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 130 && rect.bottom >= 130) {
        current = sec.id;
        break;
      }
    }
    links.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // Contact form fake submit
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (note) note.hidden = false;
    form.reset();
    setTimeout(() => { if (note) note.hidden = true; }, 3000);
  });
});

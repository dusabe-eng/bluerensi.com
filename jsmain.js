// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const menu = document.getElementById("menu");

if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // close menu after clicking a link (mobile)
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Active nav link on scroll
const links = Array.from(document.querySelectorAll(".nav-link"));
const sections = links
  .map(l => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);

function setActiveLink() {
  const scrollY = window.scrollY + 140; // offset for topbar+nav
  let current = sections[0];

  for (const sec of sections) {
    if (sec.offsetTop <= scrollY) current = sec;
  }

  links.forEach(l => l.classList.remove("active"));
  const active = links.find(l => l.getAttribute("href") === `#${current.id}`);
  if (active) active.classList.add("active");
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

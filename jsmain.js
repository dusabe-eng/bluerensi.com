function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
}

function showOnly(id) {
  const sections = ["home", "services", "about", "contact"];

  sections.forEach(secId => {
    const el = document.getElementById(secId);
    if (!el) return;

    if (secId === id) {
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  });

  // update active nav link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });

  // close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
}

function currentIdFromHash() {
  const id = (window.location.hash || "#home").slice(1);
  const allowed = ["home", "services", "about", "contact"];
  return allowed.includes(id) ? id : "home";
}

document.addEventListener("DOMContentLoaded", () => {
  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // show correct section on load
  showOnly(currentIdFromHash());
});

// when clicking links
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href").slice(1);
  const allowed = ["home", "services", "about", "contact"];
  if (!allowed.includes(id)) return;

  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  showOnly(id);
});

// back/forward buttons
window.addEventListener("hashchange", () => {
  showOnly(currentIdFromHash());
});

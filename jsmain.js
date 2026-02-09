function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
}

function showOnly(id) {
  const allowed = ["home", "services", "about", "contact"];

  allowed.forEach(secId => {
    const el = document.getElementById(secId);
    if (!el) return;
    el.hidden = secId !== id;
  });

  // Active nav link
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  });

  // close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
}

function getIdFromHash() {
  const id = (window.location.hash || "#home").slice(1);
  const allowed = ["home", "services", "about", "contact"];
  return allowed.includes(id) ? id : "home";
}

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  showOnly(getIdFromHash());
});

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href").slice(1);
  const allowed = ["home", "services", "about", "contact"];

  // allow footer #about-team to scroll inside About
  if (id === "about-team") {
    showOnly("about");
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return;
  }

  if (!allowed.includes(id)) return;

  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  showOnly(id);
});

window.addEventListener("hashchange", () => {
  showOnly(getIdFromHash());
});

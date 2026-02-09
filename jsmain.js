function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
}

function showOnly(id) {
  const ids = ["home", "services", "about", "contact"];

  ids.forEach(secId => {
    const el = document.getElementById(secId);
    if (!el) return;
    el.hidden = secId !== id;
  });

  // active nav link (based on href)
  document.querySelectorAll(".nav-link").forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${id}`);
  });

  // close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
}

function getIdFromHash() {
  const id = (window.location.hash || "#home").slice(1);
  return document.getElementById(id) ? id : "home";
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

  // special case: footer link inside About section
  if (id === "about-team") {
    e.preventDefault();
    history.pushState(null, "", "#about");
    showOnly("about");
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return;
  }

  if (!document.getElementById(id)) return;

  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  showOnly(id);
});

window.addEventListener("hashchange", () => {
  showOnly(getIdFromHash());
});

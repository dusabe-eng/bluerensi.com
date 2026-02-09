function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
}

function showOnly(sectionId) {
  // Hide all page sections, show only the requested one
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.hidden = sec.id !== sectionId;
  });

  // Update active state using href (NOT data-section)
  document.querySelectorAll(".nav-link").forEach(a => {
    const href = a.getAttribute("href") || "";
    a.classList.toggle("active", href === `#${sectionId}`);
  });

  // Close mobile menu
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
}

function getIdFromHash() {
  const id = (window.location.hash || "#home").slice(1);
  const el = document.getElementById(id);
  return el ? id : "home";
}

document.addEventListener("DOMContentLoaded", () => {
  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // On load: show correct section based on hash
  showOnly(getIdFromHash());
});

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href").slice(1);
  if (!document.getElementById(id)) return;

  // Special case: footer link to #about-team
  if (id === "about-team") {
    e.preventDefault();
    history.pushState(null, "", "#about");
    showOnly("about");
    setTimeout(() => {
      document.getElementById("about-team")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return;
  }

  e.preventDefault();
  history.pushState(null, "", `#${id}`);
  showOnly(id);
});

window.addEventListener("hashchange", () => {
  showOnly(getIdFromHash());
});

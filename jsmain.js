function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

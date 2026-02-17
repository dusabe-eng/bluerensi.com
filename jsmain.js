document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-link");

  // Mobile menu
  toggle?.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // Close menu on click
  links.forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

  // Active link highlight
  const ids = ["home","services","projects","about","contact"];
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);

  function setActive(){
    let current = "home";
    for (const sec of sections){
      const r = sec.getBoundingClientRect();
      if (r.top <= 140 && r.bottom >= 140) { current = sec.id; break; }
    }
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  }

  window.addEventListener("scroll", setActive, {passive:true});
  setActive();

  // Contact demo
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("sentMsg");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.hidden = false;
    form.reset();
    setTimeout(() => msg.hidden = true, 2500);
  });
});

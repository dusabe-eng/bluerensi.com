document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const toggle = document.querySelector(".nav-toggle");
  const routeLinks = document.querySelectorAll("[data-route]");
  const routes = document.querySelectorAll(".route");

  toggle?.addEventListener("click", () => menu.classList.toggle("open"));

  function showRoute(name){
    routes.forEach(r => r.classList.toggle("route-active", r.id === name));
    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.dataset.route === name);
    });
    menu.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  routeLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const name = a.dataset.route;
      if (!name) return;
      e.preventDefault();
      history.pushState({ route: name }, "", `#${name}`);
      showRoute(name);
    });
  });

  window.addEventListener("popstate", () => {
    const hash = (location.hash || "#home").replace("#", "");
    showRoute(hash);
  });

  const start = (location.hash || "#home").replace("#", "");
  showRoute(start);

  // contact demo
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("sentMsg");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.hidden = false;
    form.reset();
    setTimeout(() => (msg.hidden = true), 2500);
  });
});
/* jsmain.js */

// ---------- Helpers ----------
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

// ---------- Mobile menu toggle ----------
const navToggle = $('.nav-toggle');
const menu = $('.menu');

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // close menu when clicking a link (mobile)
  $all('.menu .nav-link').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ---------- Routing (show one .route at a time) ----------
const routes = $all('.route');
const navLinks = $all('[data-route]');

function setActiveRoute(routeId) {
  // show/hide routes
  routes.forEach(r => r.classList.remove('route-active'));
  const target = document.getElementById(routeId);
  if (target) target.classList.add('route-active');

  // set active menu link style
  $all('.nav-link').forEach(l => l.classList.remove('active'));
  $all(`.nav-link[data-route="${routeId}"]`).forEach(l => l.classList.add('active'));

  // update hash
  if (location.hash !== `#${routeId}`) {
    history.replaceState(null, '', `#${routeId}`);
  }

  // scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleHashRoute() {
  const hash = (location.hash || '#home').replace('#', '').trim();
  const exists = document.getElementById(hash);
  setActiveRoute(exists ? hash : 'home');
}

// click routing
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const routeId = link.getAttribute('data-route');
    if (!routeId) return;
    e.preventDefault();
    setActiveRoute(routeId);
  });
});

// initial route + hash changes
window.addEventListener('load', handleHashRoute);
window.addEventListener('hashchange', handleHashRoute);

// ---------- Services: Filter chips (selection) ----------
function initServiceFilters() {
  const chips = $all('.chip');
  const items = $all('.service-item');

  if (!chips.length || !items.length) return;

  chips.forEach(btn => {
    btn.addEventListener('click', () => {
      chips.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const f = btn.dataset.filter || 'all';

      items.forEach(it => {
        const cat = it.dataset.cat || '';
        it.style.display = (f === 'all' || f === cat) ? '' : 'none';
      });
    });
  });
}

// ---------- Services: Accordion (only one open) ----------
function initServiceAccordion() {
  const detailsList = $all('.service-details');
  if (!detailsList.length) return;

  detailsList.forEach(d => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      detailsList.forEach(other => {
        if (other !== d) other.open = false;
      });
    });
  });
}

// run these once
window.addEventListener('load', () => {
  initServiceFilters();
  initServiceAccordion();
});

// ---------- Contact form demo ----------
const contactForm = $('#contactForm');
const sentMsg = $('#sentMsg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (sentMsg) sentMsg.hidden = false;
    contactForm.reset();
    setTimeout(() => { if (sentMsg) sentMsg.hidden = true; }, 2500);
  });
}

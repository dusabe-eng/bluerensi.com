// =========================
// Footer year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================
// Mobile menu
// =========================
function toggleMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;
  menu.classList.toggle("open");
}

// Close menu when clicking a link (mobile UX)
document.querySelectorAll("#menu a").forEach((a) => {
  a.addEventListener("click", () => {
    document.getElementById("menu")?.classList.remove("open");
  });
});

// Close mobile menu if clicking outside (very important UX)
document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const toggle = document.querySelector(".nav-toggle");
  if (!menu || !toggle) return;

  const clickedInsideMenu = menu.contains(e.target);
  const clickedToggle = toggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    menu.classList.remove("open");
  }
});

// =========================
// Services reveal on scroll
// =========================
(function initServicesReveal() {
  const cards = document.querySelectorAll("#services .card");
  if (!cards.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach((card) => io.observe(card));
})();

// =========================
// Simple site search (improved)
// =========================
const data = [
  { title: "Civil & Structural", keywords: "civil structural infrastructure design site assessment feasibility construction supervision", target: "#services" },
  { title: "Hydrology & Hydraulics", keywords: "hydrology hydraulics flood risk drainage river modelling idf frequency", target: "#services" },
  { title: "Environmental & Climate", keywords: "environmental climate impact resilience monitoring reporting", target: "#services" },
  { title: "Water Supply & WASH", keywords: "water supply wash system design operation maintenance", target: "#services" },
  { title: "Modelling & GIS", keywords: "modelling gis spatial mapping dashboards visualization catchment", target: "#services" },
  { title: "Advisory & Review", keywords: "advisory review technical reviews project advisory training capacity building", target: "#services" },
  { title: "About Us", keywords: "about company experience sectors", target: "#about" },
  { title: "Our Team", keywords: "team managing director technical director operations director", target: "#about-team" },
  { title: "Contact", keywords: "contact email phone consultation", target: "#contact" },
];

const input = document.getElementById("siteSearch");
const resultsBox = document.getElementById("searchResults");

function closeResults() {
  if (!resultsBox) return;
  resultsBox.hidden = true;
  resultsBox.innerHTML = "";
}

function renderResults(items) {
  if (!resultsBox) return;

  if (!items.length) {
    resultsBox.innerHTML = `<span class="search-item">No results found</span>`;
    resultsBox.hidden = false;
    return;
  }

  resultsBox.innerHTML = items
    .map(
      (i) => `
      <a class="search-item" href="${i.target}">
        ${i.title}
        <span class="search-muted">${i.preview}</span>
      </a>
    `
    )
    .join("");

  resultsBox.hidden = false;

  // Close dropdown when clicking a result
  resultsBox.querySelectorAll("a.search-item").forEach((a) => {
    a.addEventListener("click", () => closeResults());
  });
}

// Basic scoring
function scoreItem(queryWords, item) {
  const hay = (item.title + " " + item.keywords).toLowerCase();
  let score = 0;

  queryWords.forEach((w) => {
    if (!w) return;
    if (item.title.toLowerCase().includes(w)) score += 4;
    if (hay.includes(w)) score += 2;
  });

  const phrase = queryWords.join(" ").trim();
  if (phrase && hay.includes(phrase)) score += 3;

  return score;
}

input?.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  if (!q) {
    closeResults();
    return;
  }

  const queryWords = q.split(/\s+/).filter(Boolean);

  const matches = data
    .map((item) => {
      const s = scoreItem(queryWords, item);
      if (s <= 0) return null;

      const preview = item.keywords.split(" ").slice(0, 7).join(" ") + "...";
      return { ...item, score: s, preview };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  renderResults(matches);
});

// Close when clicking outside (search)
document.addEventListener("click", (e) => {
  if (!resultsBox || !input) return;
  if (!resultsBox.contains(e.target) && e.target !== input) closeResults();
});

// Close on ESC + close menu on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeResults();
    document.getElementById("menu")?.classList.remove("open");
  }
});

// IMPORTANT:
// Do NOT block anchor navigation.
// This script ONLY adds a small fix: if your browser is weird with fixed headers,
// we nudge scrolling after clicking a link.

(function () {
  const topbarH = 34;
  const navH = 66;
  const offset = topbarH + navH + 18;

  function scrollToHash(hash) {
    if (!hash || hash === "#") return;
    const el = document.querySelector(hash);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // If user opens /#services directly
  window.addEventListener("load", () => {
    if (location.hash) scrollToHash(location.hash);
  });

  // Click links
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const hash = a.getAttribute("href");
    if (!hash || hash === "#") return;

    e.preventDefault();
    history.pushState(null, "", hash);
    scrollToHash(hash);
  });
})();

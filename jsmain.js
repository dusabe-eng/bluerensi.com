const routes = document.querySelectorAll(".route");
const links = document.querySelectorAll("[data-route]");

function showRoute(id){
  routes.forEach(r=>{
    r.style.display = r.id === id ? "block" : "none";
  });
}

window.addEventListener("hashchange", ()=>{
  showRoute(location.hash.replace("#","") || "home");
});

showRoute(location.hash.replace("#","") || "home");
